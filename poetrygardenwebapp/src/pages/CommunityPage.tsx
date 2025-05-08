import React from "react";
import PoemPage from "../components/PoemPage.tsx";
import '../styles/communitypage.css';


import Poetrygardenlogo from '../images/Poetrygardenlogo.png';

const CommunityPage = () => {
  const filterPoems = (poems: any[]) => poems; // No filtering, show all poems
  return <div className="community-page">
    <PoemPage title="Community Garden" filterPoems={filterPoems} />;
        </div>
};

export default CommunityPage;