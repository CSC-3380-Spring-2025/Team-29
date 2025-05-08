import React from "react";
import { useNavigate } from "react-router-dom";
import Poetrygardenlogo from '../images/Poetrygardenhomepage.png';
import Flower1 from '../images/Flower1.jpg'; // Example flower image
import Flower2 from '../images/Flower2.jpg'; // Example flower image
import Flower3 from '../images/Flower3.jpg'; // Example flower image

import '../styles/homepage.css';
function HomePage() {
    const navigate = useNavigate();
    return (React.createElement("div", null,
        React.createElement("div", { style: { textAlign: "center", marginTop: "100px" } },
            React.createElement("img", { src: Poetrygardenlogo, alt: "Logo" }),
            React.createElement("h1", null, " "),
            React.createElement("button", { className: "btn btn-primary", onClick: () => navigate("/signin") },
                React.createElement("span", { className: "btn-txt" }, "Get started"))),
        React.createElement("div", { className: "why-section" },
            React.createElement("h2", null, "Why Use Poetry Garden?"),
            React.createElement("p", null, "Plant your words, let them grow. Poetry Garden is a welcoming space to publish your poems and share your voice. Whether you're new to poetry or a lifelong writer, our platform helps your work bloom in a beautiful, supportive setting. Connect, create, and grow together. Join a community of poets who read, respond, and inspire. Here, your words don\u2019t just live \u2014 they thrive. \uD83C\uDF3F"),
            React.createElement("div", { className: "flower-gallery" },
                React.createElement("img", { src: Flower1, alt: "Flower 1", className: "flower-image" }),
                React.createElement("img", { src: Flower2, alt: "Flower 2", className: "flower-image" }),
                React.createElement("img", { src: Flower3, alt: "Flower 3", className: "flower-image" })),
            React.createElement("div", { className: "user-reviews" },
                React.createElement("h2", null, "User Reviews"),
                React.createElement("div", { className: "review" },
                    React.createElement("p", null,
                        React.createElement("strong", null, "John John:"),
                        " \"Poetry Garden has been an amazing platform for me to share my poems and connect with other poets. Highly recommend!\""),
                    React.createElement("div", { className: "stars" }, "\u2605\u2605\u2605\u2605\u2605")),
                React.createElement("div", { className: "review" },
                    React.createElement("p", null,
                        React.createElement("strong", null, "Barry Allen:"),
                        " \"I love the supportive community and the beautiful design of the website. It inspires me to write more!\""),
                    React.createElement("div", { className: "stars" }, "\u2605\u2605\u2605\u2605\u2606")),
                React.createElement("div", { className: "review" },
                    React.createElement("p", null,
                        React.createElement("strong", null, "Jane Wonder:"),
                        " \"A wonderful place to let your creativity bloom. The flower gallery is such a nice touch!\""),
                    React.createElement("div", { className: "stars" }, "\u2605\u2605\u2605\u2605\u2605"))))));
}
export default HomePage;
