import React from "react";
import PoemPage from "../components/PoemPage";
import PoemLogic from "../components/PoemLogic"; // Import PoemLogic
import "../styles/mygardenpage.css";

const MyGardenPage = () => {
  const { user, poems } = PoemLogic(); // Use PoemLogic to get user and poems

  const filterPoems = (poems) =>
    poems.filter((poem) => poem.published && poem.userEmail === user?.email);

  return <PoemPage title="My Garden" filterPoems={filterPoems} />;
};

export default MyGardenPage;
