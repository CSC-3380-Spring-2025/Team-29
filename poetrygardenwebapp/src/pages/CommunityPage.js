import React from "react";
import PoemPage from "../components/PoemPage";
import '../styles/communitypage.css';
const CommunityPage = () => {
    const filterPoems = (poems) => poems; // No filtering, show all poems
    return React.createElement("div", { className: "community-page" },
        React.createElement(PoemPage, { title: "Community Garden", filterPoems: filterPoems }),
        ";");
};
export default CommunityPage;
