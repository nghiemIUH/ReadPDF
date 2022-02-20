import React from "react";
import { useEffect, useRef, useState } from "react";
import WebViewer from "@pdftron/webviewer";
import axios from "axios";

import "./View.css";

function View() {
    const viewer = useRef(null);
    const [pos, setPos] = useState([0, 0]);
    const [show, setShow] = useState(false);
    const [text, setText] = useState("");

    const showPopup = (data) => {
        const vi = document.getElementById("vi");
        vi.innerHTML = data;
        vi.style.display = "block";
        vi.style.position = "absolute";
        vi.style.left = pos[0] + "px";
        vi.style.top = pos[1] + "px";
    };

    const translate = async () => {
        await axios(
            {
                method: "GET",
                url: "http://127.0.0.1:8000",
                params: {
                    text: text,
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
                        setText(selectedText);
                    }
                }
            );
            documentViewer.addEventListener("keyDown", function (e) {
                if (e.key === "Shift") {
                    setShow((show) => !show);
                }
            });
            documentViewer.addEventListener("click", function (e) {
                setPos([e.clientX, e.clientY]);
                setShow(false);
            });
        });
    }, []);

    useEffect(() => {
        const vi = document.getElementById("vi");
        if (show) {
            translate();
        } else {
            vi.style.display = "none";
        }
    }, [show]);

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
