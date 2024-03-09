import React from "react";
import Landing from "./landing";
import Card from "./card";
import Sticky from "./stickyBtn";
import CardBackground from "./cardBackground";
import Settings from "./settings";
import UserData from "./userData";
import UserSkillToggle from "./userSkillToggle";
import SuggestedRackets from "./suggestedRackets";

const HomePage = () => {
    return (
        <>
            <Landing />
            <UserSkillToggle />
            <CardBackground />
            <Settings />
            <SuggestedRackets />
            <Sticky />
            <Card />
            <UserData />
        </>
    );
};

export default HomePage;
