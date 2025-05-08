import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import PoemPage from "../components/PoemPage";
import '../styles/communitypage.css';
const CommunityPage = () => {
    const filterPoems = (poems) => poems; // No filtering, show all poems
    return _jsxs("div", { className: "community-page", children: [_jsx(PoemPage, { title: "Community Garden", filterPoems: filterPoems }), ";"] });
};
export default CommunityPage;
