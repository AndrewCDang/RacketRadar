import React, {
    useContext,
    useRef,
    useEffect,
    useState,
    useLayoutEffect,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

import { RacketContext } from "../App";
import CardProfiles from "./cardProfiles";
function Card() {
    const [state, dispatch] = useContext(RacketContext);

    const [selRacketArray, setSelRacketArray] = useState([]);
    const [selectedCards, setSelectedCards] = useState([]);
    const [cardToggle, setCardToggle] = useState([]);
    const [cardStyle, setcardStyle] = useState([]);
    const [opacityState, setOpacityState] = useState([]);
    const [cardTextHeight, setCardTextHeight] = useState([0]);

    const linearRefs = useRef([]);
    const imgRefs = useRef([]);
    const textRefs = useRef([]);
    const contentRef = useRef([]);
    const invsRef = useRef([]);

    // Importing Rackets
    useLayoutEffect(() => {
        if (state.selectedRackets.condition == false) {
            if (state.selectedRackets.objects.length > 0) {
                const racketList = state.racketList;
                const selectedArray = [];

                const importSelected = state.selectedRackets.objects.filter(
                    (el) => {
                        return el !== undefined;
                    }
                );

                importSelected.forEach((el) => {
                    const object = racketList.find((obj) => obj._id == el);
                    selectedArray.unshift(object);
                });
                setSelRacketArray(selectedArray);
            }
            // setToggleAnimation(false)

            if (state.selectedRackets.objects.length > 0) {
                setTimeout(() => {
                    let opArray = [];
                    state.selectedRackets.objects.forEach(() => {
                        opArray.push(true);
                    });
                    setOpacityState(opArray);
                }, 50);
            }
        } else if (state.selectedRackets.condition == true) {
            const racketList = state.racketList;
            const selectedArray = [];

            const importSelected = state.selectedRackets.objects;

            importSelected.forEach((el) => {
                const object = racketList.find((obj) => obj._id == el);
                selectedArray.push(object);
            });
            setSelRacketArray(selectedArray);
        }
    }, [state.selectedRackets.objects]);

    // 2.CardToggle is an array of true/false objects, designating if the image of the card should be expanded.
    // CardStyle dynamically translates the content down, making the image fully visible

    const setExpand = () => {
        // resetTranslations()
        let tempRacketArray = [];
        selRacketArray.map((el) => {
            tempRacketArray.push(false);
        });
        setCardToggle(tempRacketArray);

        let tempStyleArray = [];
        selRacketArray.map((el) => {
            tempStyleArray.push("");
        });
        setcardStyle([tempStyleArray]);
    };

    // 3.Card Component Template
    const setCards = () => {
        const selectArray = selRacketArray.map((el, index) => {
            const imgUrl = `${process.env.PUBLIC_URL}/images/${el.name.replace(
                /\s+/g,
                ""
            )}.png`;

            let tag1;
            if (el.balance >= 40 && el.balance <= 60) {
                tag1 = "Balanced";
            } else if (el.balance > 60) {
                tag1 = "Head Heavy";
            } else if (el.balance < 40) {
                tag1 = "Head Light";
            }

            let tag2;
            if (el.stiff > 40 && el.stiff <= 60) {
                tag2 = "Medium Flex";
            } else if (el.stiff >= 60) {
                tag2 = "High Stiff";
            } else if (el.stiff <= 40) {
                tag2 = "Low Flex";
            }

            let tag3;
            if (el.difficulty > 65 && el.difficulty <= 75) {
                tag3 = "Intermediate";
            } else if (el.difficulty > 75) {
                tag3 = "Advanced";
            } else if (el.difficulty < 40) {
                tag3 = "Beginner";
            } else if (el.difficulty >= 40 && el.difficulty <= 65) {
                tag3 = "Novice";
            }

            const flexChart = { strokeDashoffset: `-${100 - el.stiff}` };
            const balanceChart = { strokeDashoffset: `-${100 - el.balance}` };
            const difficultyChart = {
                strokeDashoffset: `-${100 - el.difficulty}`,
            };
            return {
                id: el.name,
                card: (
                    <CardProfiles
                        key={index}
                        el={el}
                        dispatchDelete={dispatchDelete}
                        index={index}
                        invsRef={invsRef}
                        contentRef={contentRef}
                        imgRefs={imgRefs}
                        cardToggle={cardToggle}
                        tag1={tag1}
                        tag2={tag2}
                        tag3={tag3}
                        flexChart={flexChart}
                        balanceChart={balanceChart}
                        difficultyChart={difficultyChart}
                        linearRefs={linearRefs}
                        setCardToggle={setCardToggle}
                        cardStyle={cardStyle}
                        setcardStyle={setcardStyle}
                        textRefs={textRefs}
                        dispatch={dispatch}
                        state={state}
                        cardTextHeight={cardTextHeight}
                        setCardTextHeight={setCardTextHeight}
                        imgUrl={imgUrl}
                    />
                ),
            };
        });

        setSelectedCards(selectArray);
    };

    useLayoutEffect(() => {
        if (selRacketArray) {
            setExpand();
        }
    }, [selRacketArray]);

    useEffect(() => {
        if (
            state.selectedRackets.objects.length == 1 &&
            state.selectedRackets.condition == false &&
            !state.scrolledFirstItem
        ) {
            setTimeout(function () {
                invsRef.current[0].scrollIntoView({
                    behavior: "smooth",
                    block: "end",
                });
                dispatch({ type: "scrolledFirstItem" });
            }, 150);
        }
    }, [state.selectedRackets]);

    useLayoutEffect(() => {
        if (selRacketArray) {
            setCards();
        }
    }, [
        selRacketArray,
        cardToggle,
        opacityState,
        state.favRackets,
        state.wishRackets,
        cardTextHeight,
    ]);

    // Deleting Items

    const dispatchDelete = (delInd) => {
        setTimeout(() => {
            setTimeout(() => {
                const spliceArray = Array.from(selRacketArray);
                spliceArray.splice(delInd, 1);
                let idArray = spliceArray.map((el) => {
                    return el._id;
                });
                setTimeout(() => {
                    const cardTextHeightNew = cardTextHeight;
                    cardTextHeightNew.splice(delInd, 1);
                    setCardTextHeight(cardTextHeightNew);
                    dispatch({
                        type: "selectRacket",
                        payload: { condition: true, objects: idArray },
                    });
                }, 0);
            }, 0);
        }, 0);
    };

    return (
        <>
            <article className="card-racket">
                <div className="card-container">
                    <div style={{ order: 103 }} className="card-invs"></div>
                    <div style={{ order: 102 }} className="card-invs"></div>
                    <div
                        ref={(el) => (invsRef.current[0] = el)}
                        className="invis-card"
                        style={{
                            order: 101,
                        }}
                    ></div>
                    <AnimatePresence>
                        {selectedCards &&
                            selectedCards.map((item) => {
                                return (
                                    <motion.div
                                        animate={{ opacity: 1, scale: 1 }}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{
                                            ease: "easeInOut",
                                            duration: 0.3,
                                        }}
                                        layout
                                        key={item.id}
                                    >
                                        {item.card};
                                    </motion.div>
                                );
                            })}
                    </AnimatePresence>
                </div>
            </article>
        </>
    );
}

export default Card;
