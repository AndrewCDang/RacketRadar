import React, { useEffect, useContext, useState, useRef } from "react";
import { RacketContext } from "../App";

const StickySearch = ({
    searchBarRef,
    NONE,
    searchRef,
    handleSearch,
    racketsRef,
    searchValue,
}) => {
    const [state, dispatch] = useContext(RacketContext);
    const displayMenu = state.menuSelection.searchMenu
        ? { display: "block" }
        : { display: "none" };

    const [racketList, setRacketList] = useState();
    const inputRef = useRef();

    useEffect(() => {
        if (state.menuSelection.searchMenu) {
            searchRef.current.childNodes[0].focus();
        }
    }, [state]);

    //Searches if search value contains characters inside innertext of racket divs
    useEffect(() => {
        const racketResults = racketsRef.current.childNodes;
        const searchTerm = searchValue.toLowerCase();

        const searchWords = searchTerm.split(" ");
        const searchWord = searchWords.filter((word) => word !== "");

        const itemsLength = racketResults.length;
        let hiddenLength = 0;
        racketResults.forEach((element) => {
            const searchItem = element.innerText.toLowerCase();
            if (searchItem.indexOf(searchTerm) != -1) {
                element.style.display = "block";
            } else {
                element.style.display = "none";
                hiddenLength++;
            }

            const totalMatches = searchWord.length;
            let match = 0;
            searchWord.forEach((el) => {
                if (searchItem.indexOf(el) !== -1) {
                    match++;
                }
            });
            if (match == totalMatches) {
                element.style.display = "block";
            }
        });

        racketResults.forEach((result) => {});

        if (hiddenLength == itemsLength) {
            searchRef.current.style.borderRadius = "16px";
            searchBarRef.current.style.borderRadius = "16px";
        } else {
            searchRef.current.style.borderRadius = "16px 16px 0px 0px";
            searchBarRef.current.style.borderRadius = "16px 16px 8px 16px";
        }
    }, [searchValue]);

    const showAll = () => {
        racketsRef.current.childNodes.forEach((result) => {
            result.style.display = "block";
        });
    };

    const [searchSelected, setSearchSelected] = useState([]);

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

    useEffect(() => {
        if (state.racketList.length > 0) {
            const searchItems = state.racketList.map((el, index) => {
                return (
                    <div
                        key={index}
                        style={
                            searchSelected[index]
                                ? { order: -state.racketList.length + index }
                                : null
                        }
                        onClick={() => viewRacket(el._id)}
                    >
                        <span
                            key={index}
                            className={
                                searchSelected[index] ? "racket-item" : null
                            }
                        >
                            <strong>
                                {el.brand.toUpperCase()}&nbsp;
                                {el.name.toUpperCase()}
                            </strong>{" "}
                            &nbsp;&nbsp;&nbsp;{el.label}
                        </span>
                    </div>
                );
            });
            setRacketList(searchItems);
        }
    }, [state.racketList, searchSelected]);

    useEffect(() => {
        console.log();
        if (state.selectedRackets.objects.length > 0) {
            let matchedIndexes = [];

            const racketList = state.racketList;
            racketList.forEach(() => {
                matchedIndexes.push(false);
            });

            const indexNumbers = [];
            state.selectedRackets.objects.forEach((el) => {
                racketList.forEach((racket, index) => {
                    if (racket._id.indexOf(el) != -1) {
                        indexNumbers.push(index);
                    }
                });
            });

            indexNumbers.forEach((num) => {
                matchedIndexes[num] = true;
            });
            setSearchSelected(matchedIndexes);
        } else if (
            state.selectedRackets.objects.length == 0 &&
            state.racketList.length > 0
        ) {
            let matchedIndexes = [];

            const racketList = state.racketList;
            racketList.forEach(() => {
                matchedIndexes.push(false);
            });
            setSearchSelected(matchedIndexes);
        }
    }, [state.selectedRackets.objects, state.racketList]);

    // //
    useEffect(() => {
        if (state.selectedRackets.length > 0) {
            console.log(state.selectedRackets);
        }
    }, [state.selectedRackets]);

    return (
        <aside
            ref={searchBarRef}
            style={displayMenu}
            className="sticky-interact-1"
        >
            <section ref={searchRef} className="search-menu">
                <input
                    ref={inputRef}
                    onChange={handleSearch}
                    className="searchBar"
                    id="searchInput"
                    placeholder="RacketName"
                ></input>
                <div
                    className="close-btn"
                    onClick={(e) => {
                        dispatch({
                            type: "menuSelection",
                            payload: {
                                searchMenu: false,
                                filterMenu: false,
                                addMenu: false,
                            },
                        });
                        inputRef.current.value = "";
                        showAll();
                    }}
                >
                    <svg
                        fill="#000000"
                        className="close"
                        width="26px"
                        height="26px"
                        viewBox="-8.5 0 32 32"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <title>close</title>
                        <path d="M8.48 16l5.84-5.84c0.32-0.32 0.32-0.84 0-1.2-0.32-0.32-0.84-0.32-1.2 0l-5.84 5.84-5.84-5.84c-0.32-0.32-0.84-0.32-1.2 0-0.32 0.32-0.32 0.84 0 1.2l5.84 5.84-5.84 5.84c-0.32 0.32-0.32 0.84 0 1.2 0.16 0.16 0.4 0.24 0.6 0.24s0.44-0.080 0.6-0.24l5.84-5.84 5.84 5.84c0.16 0.16 0.36 0.24 0.6 0.24 0.2 0 0.44-0.080 0.6-0.24 0.32-0.32 0.32-0.84 0-1.2l-5.84-5.84z"></path>
                    </svg>
                </div>
            </section>
            <section ref={racketsRef} className="search-bar">
                {racketList}
            </section>
        </aside>
    );
};

export default StickySearch;
