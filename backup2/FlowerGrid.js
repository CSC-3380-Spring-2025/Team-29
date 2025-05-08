import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const FlowerGrid = ({ poems, getFlowerImage, handleFlowerClick, filterByUser }) => {
    const filteredPoems = filterByUser
        ? poems.filter((poem) => poem.published && poem.userEmail === filterByUser)
        : poems;
    return (_jsx("div", { className: "poem-flower-grid", children: filteredPoems.map((poem) => (_jsxs("div", { className: "flower-wrapper", children: [_jsx("img", { src: getFlowerImage(poem.placeholder), alt: poem.theme, className: "flower-icon", onClick: () => handleFlowerClick(poem) }), _jsx("span", { className: "tooltip", children: poem.title })] }, poem.id))) }));
};
export default FlowerGrid;
