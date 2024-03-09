import React, { useEffect, useMemo } from "react";
import { RacketContext } from "../App";
import { useContext } from "react";
import "./suggestedRackets.css";

const EyeSvg = ({ selected }) => (
    <svg
        stroke={selected ? "white" : "grey"}
        className="userFav-svg"
        viewBox="0 0 80 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M71.0144 39.9996C69.8841 37.582 68.4643 35.2823 66.7672 33.1542C60.271 25.0082 50.4189 20.2637 39.9998 20.2637C29.5807 20.2637 19.7286 25.0082 13.2324 33.1542C11.5348 35.2828 10.1148 37.5832 8.98438 40.0014"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M71.0144 39.9995C69.884 42.4177 68.4639 44.7181 66.7664 46.8467C60.2702 54.9927 50.4181 59.7372 39.9989 59.7372C29.5798 59.7372 19.7277 54.9927 13.2315 46.8467C11.5344 44.7186 10.1146 42.4189 8.98438 40.0013"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
        <path
            d="M35.3092 49.7415C38.2736 51.1691 41.7268 51.1691 44.6912 49.7415C47.6556 48.3139 49.8086 45.6142 50.5408 42.4064C51.2729 39.1987 50.5045 35.8321 48.4531 33.2597C46.4016 30.6872 43.2904 29.189 40.0002 29.189C36.71 29.189 33.5988 30.6872 31.5473 33.2597C29.4959 35.8321 28.7275 39.1987 29.4596 42.4064C30.1918 45.6142 32.3448 48.3139 35.3092 49.7415Z"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

function SuggestedRackets() {
    const [state, dispatch] = useContext(RacketContext);

    const filterRackets = () => {
        const filter = Object.values(state.racketList).filter((el, index) => {
            let filterItem = true;
            if (
                !(
                    el.cost >= state.filterValues.cost.min &&
                    el.cost <= state.filterValues.cost.max
                )
            ) {
                filterItem = false;
            }
            if (
                !(
                    el.stiff >= state.filterValues.stiff.min &&
                    el.stiff <= state.filterValues.stiff.max
                )
            ) {
                filterItem = false;
            }
            if (
                !(
                    el.balance >= state.filterValues.balance.min &&
                    el.balance <= state.filterValues.balance.max
                )
            ) {
                filterItem = false;
            }
            if (
                !(
                    el.difficulty >= state.filterValues.difficulty.min &&
                    el.difficulty <= state.filterValues.difficulty.max
                )
            ) {
                filterItem = false;
            }
            if (state.filterValues.bestSelling) {
                if (!el.bestSelling) {
                    filterItem = false;
                }
            }
            if (
                state.filterValues.currentlySelected &&
                !state.selectedRackets.objects.includes(el._id)
            ) {
                filterItem = false;
            }
            if (state.filterValues.brandSelected) {
                if (
                    !state.filterValues.brandSelected.includes(
                        el.brand.toLowerCase()
                    )
                ) {
                    filterItem = false;
                }
            }
            if (filterItem) {
                return el;
            }
        });
        return filter;
    };

    const suggestedRackets = useMemo(() => {
        const filteredRackets = filterRackets();

        if (
            !state.userStats.flex ||
            !state.userStats.balance ||
            !Array.isArray(filteredRackets)
        ) {
            return [];
        }

        const racketArray = filteredRackets.map((racket, i) => {
            let sumDifference = 0;
            sumDifference += Math.abs(state.userStats.flex - racket.stiff);
            sumDifference += Math.abs(state.userStats.balance - racket.balance);
            return { ...racket, differenceScore: sumDifference };
        });
        const sortedRackets = racketArray.sort((a, b) => {
            return a.differenceScore - b.differenceScore;
        });
        const selectedSort = sortedRackets.slice(0, 10);
        return selectedSort;
    }, [state.userStats, state.racketList, state.filterValues]);

    const viewToggle = useMemo(() => {
        let array = [];
        if (state.selectedRackets.objects) {
            state.selectedRackets.objects.forEach((element) => {
                if (suggestedRackets.includes(element._id)) {
                    array.push(true);
                } else {
                    array.push(false);
                }
            });
        }
        return array;
    }, [state.selectedRackets.objects]);

    useEffect(() => {
        console.log(state.userStats);
    }, [state.userStats]);

    const viewRacket = (id) => {
        if (!state.selectedRackets.objects.includes(id)) {
            dispatch({
                type: "selectRacket",
                payload: { condition: false, objects: id },
            });
        } else {
            dispatch({
                type: "deleteId",
                payload: { deleteId: id, deletedFrom: "card" },
            });
        }
    };

    return (
        <section
            style={{
                display: "grid",
                gridTemplateRows: suggestedRackets.length > 0 ? "1fr" : "0fr",
                transition: "grid-template-rows 1s ease-in-out",
            }}
            className="suggestedContainer"
        >
            <section>
                <div>
                    <h2>Suggested Rackets</h2>
                    {suggestedRackets &&
                        suggestedRackets.map((item, i) => {
                            return (
                                <div
                                    onClick={() => viewRacket(item._id)}
                                    className="suggestedItem"
                                    key={item.label}
                                >
                                    <div
                                        className="userFav-svg-ctn"
                                        title="View Racket Details"
                                    >
                                        <EyeSvg
                                            selected={state.selectedRackets.objects.includes(
                                                item._id
                                            )}
                                        />
                                    </div>
                                    <div className="suggestedName">
                                        <span>{item.name}</span>
                                        &nbsp;&nbsp;{item.label}
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </section>
        </section>
    );
}

export default SuggestedRackets;
