import React, { useEffect, useRef, useState } from "react";
import { useContext } from "react";
import { RacketContext } from "../App";
import StickyFilter from "./stickyFilter";
import UserPref from "./userPref";
import UserFav from "./userFav";

function Settings() {
    const [state, dispatch] = useContext(RacketContext);

    // Filter States
    const [filterValues, setFilterValues] = useState();
    const filterRef = useRef();
    const NONE = { display: "none" };
    const inputMin = useRef({ ref1: null, ref2: null, ref3: null, ref4: null });
    const inputMax = useRef({ ref1: null, ref2: null, ref3: null, ref4: null });
    const rangeFill = useRef({
        ref1: null,
        ref2: null,
        ref3: null,
        ref4: null,
    });
    const rangeMin = useRef({ ref1: null, ref2: null, ref3: null, ref4: null });
    const rangeMax = useRef({ ref1: null, ref2: null, ref3: null, ref4: null });
    const bestSellingCheck = useRef();
    const currentlySelected = useRef();

    return (
        <section style={{ zIndex: 11 }} className="settings-container">
            <StickyFilter
                filterRef={filterRef}
                NONE={NONE}
                inputMin={inputMin}
                inputMax={inputMax}
                rangeFill={rangeFill}
                rangeMin={rangeMin}
                rangeMax={rangeMax}
                bestSellingCheck={bestSellingCheck}
                currentlySelected={currentlySelected}
                setFilterValues={setFilterValues}
            />
            {/* < UserFav /> */}
            <UserPref />
        </section>
    );
}

export default Settings;
