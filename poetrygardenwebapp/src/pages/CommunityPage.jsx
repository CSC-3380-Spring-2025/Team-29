import React from "react";
import PoemPage from "../components/PoemPage";
import '../styles/communitypage.css';


import Poetrygardenlogo from '../images/Poetrygardenlogo.png';

const CommunityPage = () => {
  const filterPoems = (poems) => poems; // No filtering, show all poems
  return <div className="community-page">
    <PoemPage title="Community Garden" filterPoems={filterPoems} />;
        </div>
};

export default CommunityPage;