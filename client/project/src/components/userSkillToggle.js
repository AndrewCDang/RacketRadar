import React from "react";
import { useEffect, useContext, useMemo, useRef, useState } from "react";
import { RacketContext } from "../App";

const UserSkillToggle = () => {
    const btnRef = useRef();
    const filterRef = useRef();

    const [widthToggle, setWidthToggle] = useState();
    const [widthFilterToggle, setWidthFilterToggle] = useState();

    const [state, dispatch] = useContext(RacketContext);

    const userSet = useMemo(() => {
        if (state.userStats.flex !== "") {
            return true;
        } else {
            return false;
        }
    }, [state.userStats]);

    const userToggle = useMemo(() => {
        if (state.userRacket.userRacket == true) {
            return true;
        } else {
            return false;
        }
    }, [state.userRacket]);

    const filterToggle = useMemo(() => {
        if (state.filterSelection.filterMenu == true) {
            return true;
        } else {
            return false;
        }
    }, [state.filterSelection]);

    useEffect(() => {
        setWidthToggle(btnRef.current.offsetWidth);
    }, [userToggle]);

    useEffect(() => {
        setWidthFilterToggle(filterRef.current.offsetWidth);
    }, [filterToggle]);

    const toggleFilter = () => {
        dispatch({ type: "filterSelection", payload: { filterMenu: true } });
        if (state.userRacket.userRacket) {
            dispatch({ type: "userRacket", payload: { userRacket: false } });
        }
    };

    const toggleUserPref = () => {
        dispatch({ type: "userRacket", payload: { userRacket: true } });
        if (state.filterSelection.filterMenu) {
            dispatch({
                type: "filterSelection",
                payload: { filterMenu: false },
            });
        }
    };

    return (
        <article className="toggle-btns-container">
            <div style={{ zIndex: 5 }} className="ust-container">
                <div
                    className="graphToggle-btn"
                    onClick={() =>
                        !userToggle
                            ? toggleUserPref()
                            : dispatch({
                                  type: "userRacket",
                                  payload: { userRacket: false },
                              })
                    }
                    style={{
                        border: "1px solid white",
                        borderRadius: "12px",
                        width: `${
                            !userToggle
                                ? widthToggle + 32 + 48
                                : widthToggle + 32
                        }px`,
                        transition: "width 0.3s ease",
                        overflow: "hidden",
                        padding: "8px 0px",
                        display: "flex",
                        placeSelf: "center",
                    }}
                >
                    {!userToggle ? (
                        <svg
                            className="user-dot-svg-toggle"
                            width="40"
                            height="40"
                            viewBox="0 0 70 70"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M68 40C68 55.464 55.464 68 40 68C24.536 68 12 55.464 12 40C12 24.536 24.536 12 40 12C55.464 12 68 24.536 68 40Z"
                                stroke="#C2CCDE"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                className="svg-fill"
                                d="M58.3013 61.192C53.3935 65.4341 46.9966 68 40.0004 68C33.0041 68 26.6071 65.434 21.6992 61.1918C23.0685 58.9261 25.1923 57.1319 27.8006 56.1934C35.6862 53.3561 44.3142 53.3561 52.1998 56.1934C54.8082 57.1319 56.9321 58.9262 58.3013 61.192Z"
                                stroke="#C2CCDE"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                className="svg-fill"
                                d="M44.9581 46.1552C48.0026 44.6538 50.2028 41.8537 50.9413 38.5404L51.0113 38.2265C51.7558 34.8862 50.9692 31.388 48.8665 28.688L48.7564 28.5466C46.6536 25.8465 43.4227 24.2676 40.0004 24.2676C36.5781 24.2676 33.3472 25.8465 31.2445 28.5466L31.1344 28.688C29.0316 31.388 28.245 34.8862 28.9895 38.2265L29.0595 38.5404C29.798 41.8537 31.9982 44.6538 35.0427 46.1552C38.1682 47.6964 41.8327 47.6964 44.9581 46.1552Z"
                                stroke="#C2CCDE"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    ) : null}
                    <div
                        ref={btnRef}
                        className={`ust-btn ${
                            userToggle ? "ust-expanded" : ""
                        }`}
                    >
                        {!userToggle
                            ? ` ${userSet ? "Edit Rackets" : "Suggest Rackets"}`
                            : "Close"}
                    </div>
                </div>
                <div className="ust-subText">
                    {!userToggle ? (
                        "Set user racket skills/preferences"
                    ) : (
                        <>&nbsp;</>
                    )}
                </div>
            </div>
            <div style={{ zIndex: 5 }} className="ust-container">
                <div
                    className="graphToggle-btn"
                    onClick={() =>
                        !filterToggle
                            ? toggleFilter()
                            : dispatch({
                                  type: "filterSelection",
                                  payload: { filterMenu: false },
                              })
                    }
                    style={{
                        border: "1px solid white",
                        borderRadius: "12px",
                        width: `${
                            !filterToggle
                                ? widthFilterToggle + 32 + 40
                                : widthFilterToggle + 32
                        }px`,
                        transition: "width 0.3s ease",
                        overflow: "hidden",
                        padding: "8px 0px",
                        display: "flex",
                        placeSelf: "center",
                    }}
                >
                    {!filterToggle ? (
                        <svg
                            className="user-filter-svg-toggle"
                            width="40"
                            height="40"
                            viewBox="-5.5 0 32 32"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <title>filter</title>
                            <path d="M8.48 25.72c-0.16 0-0.32-0.040-0.44-0.12-0.24-0.16-0.4-0.44-0.4-0.72v-8.72l-7.48-8.48c-0.2-0.24-0.28-0.6-0.12-0.88s0.44-0.48 0.76-0.48h19.8c0.32 0 0.64 0.2 0.76 0.48 0.12 0.32 0.080 0.64-0.12 0.92l-7.8 8.8v6.32c0 0.32-0.2 0.6-0.48 0.76l-4.080 2c-0.080 0.080-0.24 0.12-0.4 0.12zM2.64 7.96l6.48 7.32c0.12 0.16 0.2 0.36 0.2 0.56v7.64l2.4-1.2v-6.080c0-0.2 0.080-0.4 0.2-0.56l6.8-7.68c0.040 0-16.080 0-16.080 0z"></path>
                        </svg>
                    ) : null}
                    <div
                        ref={filterRef}
                        className={`ust-btn ${
                            filterToggle ? "ust-expanded" : ""
                        }`}
                    >
                        {!filterToggle ? "Filter Rackets" : "Close"}
                    </div>
                </div>
                <div className="ust-subText">
                    {!filterToggle ? (
                        "Filter via price, difficulty, and more  "
                    ) : (
                        <>&nbsp;</>
                    )}
                </div>
            </div>
        </article>
    );
};

export default UserSkillToggle;
