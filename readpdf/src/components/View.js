import React from "react";
import { useEffect, useRef, useState } from "react";
import WebViewer from "@pdftron/webviewer";
import axios from "axios";

import "./View.css";

function View() {
    const viewer = useRef(null);
    const URL = "http://127.0.0.1:8000";

    const [state, setState] = useState({
        pos: [0, 0],
        show: false,
        text: "",
    });

    const showPopup = (data) => {
        const vi = document.getElementById("vi");
        const sound = document.getElementById("sound");
        document.getElementById("result").innerHTML = data;
        vi.style.display = "block";
        vi.style.position = "absolute";
        vi.style.left = state.pos[0] + 10 + "px";
        vi.style.top = state.pos[1] + "px";
        if (data === ". . .") {
            sound.style.display = "none";
        } else {
            sound.style.display = "block";
        }
    };

    const translate = async () => {
        await axios(
            {
                method: "GET",
                url: URL + "/",
                params: {
                    text: state.text,
                },
            },
            showPopup(". . .")
        ).then((response) => {
            showPopup(response.data.result);
        });
    };

    const speak = async () => {
        await axios({
            method: "GET",
            url: URL + "/speak/",
            params: {
                text: state.text,
            },
        }).then(async (response) => {
            var audio = new Audio(URL + "/media/" + response.data.result);
            await audio.play();

            await axios({
                method: "GET",
                url: URL + "/delete/",
                params: {
                    name: response.data.result,
                },
            });
        });
    };

    useEffect(() => {
        WebViewer(
            {
                path: "/webviewer/lib",
                initialDoc: "data.pdf",
            },
            viewer.current
        ).then((instance) => {
            const { documentViewer } = instance.Core;
            const { Feature } = instance.UI;
            instance.UI.enableFeatures([Feature.FilePicker]);
            instance.UI.disableElements(["textPopup"]);

            documentViewer.addEventListener(
                "textSelected",
                (_quads, selectedText, _pageNumber) => {
                    if (selectedText.length > 0) {
                        setState((state) => {
                            return {
                                ...state,
                                show: false,
                                text: selectedText,
                            };
                        });
                    }
                }
            );

            documentViewer.addEventListener("click", function (e) {
                setState((state) => {
                    return {
                        ...state,
                        pos: [e.clientX, e.clientY],
                        show: false,
                    };
                });
            });

            documentViewer.addEventListener("keyDown", function (e) {
                if (e.key === "Shift") {
                    setState((state) => {
                        return {
                            ...state,
                            show: !state.show,
                        };
                    });
                }
            });
        });
    }, []);

    useEffect(() => {
        if (state.show) {
            translate();
        } else {
            const vi = document.getElementById("vi");
            vi.style.display = "none";
        }
    }, [state.show]);

    return (
        <div className="MyComponent">
            <div id="vi" style={{ display: "none", backgroundColor: "#fff" }}>
                <div id="result"></div>
                <img src="sound.png" id="sound" onClick={speak} />
            </div>
            <div
                className="webviewer"
                ref={viewer}
                style={{ height: "100vh" }}
            ></div>
        </div>
    );
}

export default View;
