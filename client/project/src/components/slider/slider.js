import React, { useState } from "react";
import "./slider.css";
import { motion, useDragControls, useAnimate } from "framer-motion";
import { useRef, useEffect } from "react";

function Slider({ id, labels, handler, selectedBtn }) {
    const controls = useDragControls();
    const parentRef = useRef(null);
    const dragRef = useRef(null);
    const [startX, setStartX] = useState(0);
    const [scope, animate] = useAnimate();
    const isDraggingRef = useRef(false);
    const [isDragging, setIsDragging] = useState(false);

    const dragHandler = () => {
        isDraggingRef.current = true;
        setIsDragging(true);
    };

    const dragEndHandler = () => {
        if (isDraggingRef.current && dragRef.current) {
            isDraggingRef.current = false;
            const computedStyle = window.getComputedStyle(dragRef.current);
            const transformValue = computedStyle.getPropertyValue("transform");
            const matrixValues = transformValue.match(/-?[\d\.]+/g);
            const xValue = matrixValues[4];
            const conatinerWidth = parentRef.current.offsetWidth;
            const dragPosition = xValue / conatinerWidth;
            sliderBtn(Math.round(dragPosition * 4));
            setIsDragging(false);
        }
    };

    useEffect(() => {
        if (dragRef.current) {
            dragRef.current.addEventListener("mousedown", dragHandler);
            dragRef.current.addEventListener("touchstart", dragHandler);

            window.addEventListener("mouseup", dragEndHandler);
            window.addEventListener("touchend", dragEndHandler);

            return () => {
                if (dragRef.current) {
                    dragRef.current.removeEventListener(
                        "mousedown",
                        dragHandler
                    );
                    dragRef.current.removeEventListener(
                        "touchstart",
                        dragHandler
                    );

                    window.removeEventListener("mouseup", dragEndHandler);
                    window.removeEventListener("touchend", dragEndHandler);
                }
            };
        }
    }, [dragRef]);

    useEffect(() => {
        if (dragRef.current && parentRef.current) {
            const conatinerWidth = parentRef.current.offsetWidth;
            const x = 0.35 * conatinerWidth - 0.35 * 24;
            setStartX(x);
        }
    }, [dragRef, parentRef]);

    const sliderBtn = (index) => {
        const conatinerWidthInterval = parentRef.current.offsetWidth / 4;
        const endX = index * conatinerWidthInterval - (index / 4) * 24;
        animate(`#${id}`, { x: endX });
        handler(index);
    };

    return (
        <div className="slider-content" ref={scope}>
            <div ref={parentRef} className="slider-container">
                <motion.div
                    ref={dragRef}
                    id={id}
                    drag="x"
                    dragControls={controls}
                    className="slider-dragger"
                    dragConstraints={parentRef}
                    dragElastic={0}
                    whileDrag={{ scale: 1.4 }}
                    style={{ x: startX, z: selectedBtn[2] === null ? -1 : 0 }}
                    animate={{
                        opacity: selectedBtn[2] === null ? 0 : 1,
                    }}
                    dragMomentum={false}
                    dragListener={isDragging ? false : true}
                ></motion.div>
                <div className="slider-itemsContainer">
                    {Array(5)
                        .fill(0)
                        .map((_, i) => {
                            return (
                                <>
                                    <div
                                        onClick={() => sliderBtn(i)}
                                        className="slider-items"
                                        key={i}
                                    >
                                        <aside
                                            className={`${
                                                i === 2 ? "slider-balanced" : ""
                                            } ${
                                                selectedBtn[i] === true
                                                    ? "slider-false"
                                                    : ""
                                            }`}
                                        >
                                            <div>
                                                <div>{labels[i][0]}</div>
                                            </div>
                                            <div
                                                style={{
                                                    display: !labels[i][1]
                                                        ? "none"
                                                        : "",
                                                }}
                                            >
                                                <div>{labels[i][1]}</div>
                                            </div>
                                        </aside>
                                    </div>
                                    {i != 4 && (
                                        <div className="slider-itemLine"></div>
                                    )}
                                </>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}

export default Slider;
