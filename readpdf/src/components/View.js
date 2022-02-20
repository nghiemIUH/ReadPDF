import React from "react";
import { useEffect, useRef, useState } from "react";
import WebViewer from "@pdftron/webviewer";
import axios from "axios";

import "./View.css";

function View() {
    const viewer = useRef(null);

    const [state, setState] = useState({
        pos: [0, 0],
        show: false,
        text: "",
    });

    const showPopup = (data) => {
        const vi = document.getElementById("vi");
        vi.innerHTML = data;
        vi.style.display = "block";
        vi.style.position = "absolute";
        vi.style.left = state.pos[0] + 10 + "px";
        vi.style.top = state.pos[1] + "px";
    };

    const translate = async () => {
        await axios(
            {
                method: "GET",
                url: "https://api.deepcode.tk",
                params: {
                    text: state.text,
                },
            },
            showPopup(". . .")
        ).then((response) => {
            showPopup(response.data["result"]);
        });
    };

    useEffect(() => {
        WebViewer(
            {
                path: "/webviewer/lib",
                initialDoc: "tutorial.pdf",
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
        const vi = document.getElementById("vi");
        if (state.show) {
            translate();
        } else {
            vi.style.display = "none";
        }
    }, [state.show]);

    return (
        <div className="MyComponent">
            <div
                id="vi"
                style={{ display: "none", backgroundColor: "#fff" }}
            ></div>
            <div
                className="webviewer"
                ref={viewer}
                style={{ height: "100vh" }}
            ></div>
        </div>
    );
}

export default View;
