// About page with all our info
import React from "react";

const About = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6 text-gray-800 bg-gradient-to-br from-white to-blue-50 rounded-xl shadow-md">
      <h1 className="text-4xl font-bold text-center text-blue-800">About Poetry Garden</h1>

      {/* Combined Section */}
      <section className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">Inspiration & Origin</h2>
        <p className="text-base mb-2">
          The motivation for Poetry Garden came from our Git Master, <strong>Rivers</strong>, and his creative idea to create a space for lovers of poetry to collaborate or work solo.
        </p>
        <p className="text-base">
          The idea started during a Discord call when we needed a new project after our first was rejected — and thus, Poetry Garden was born. 😄
        </p>
      </section>

      {/* Team Overview */}
      <section className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">Who We Are & What We Do</h2>
        <ul className="list-disc list-inside space-y-1 text-base">
          <li><strong>Rivers</strong> – Senior, Software Engineering</li>
          <li><strong>Jaylen</strong> – Sophomore, Software Engineering</li>
          <li><strong>Thomas</strong> – Senior, Software Engineering</li>
          <li><strong>Julian</strong> – Junior, Cybersecurity</li>
          <li><strong>Tyler</strong> – Senior, Cybersecurity</li>
        </ul>
        <ul className="list-disc list-inside space-y-1 text-base mt-4">
          <li><strong>Thomas Lee</strong> (Comms Lead) – Led backend & team communication</li>
          <li><strong>Rivers Dupaquier</strong> (Git Master) – Interactive & visual components</li>
          <li><strong>Tyler Jackson</strong> (Design Lead) – Created visual mockups</li>
          <li><strong>Jaylen Haney</strong> (Project Manager) – Task management & frontend lead</li>
          <li><strong>Julian Rodgers</strong> (Quality Assurer) – Bug fixes & development support</li>
        </ul>
      </section>

      {/* Why & How */}
      <section className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">Why People Use It</h2>
        <p className="text-base">
          Poetry Garden provides a space for users to write poems and get feedback on their writing, phrasing, and composition.
        </p>
      </section>

      {/* Mission & Tech */}
      <section className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-2xl font-semibold text-blue-600 mb-2">Mission, Vision & Technology</h2>
        <p className="text-base"><strong>Mission:</strong> To pass the class.</p>
        <p className="text-base"><strong>Vision:</strong> To inspire creativity. They’re poets—and they don’t even know it!</p>
        <p className="text-base mt-2"><strong>Tech Used:</strong> Firebase DB, React, AI Art Generator, Wormhole</p>
      </section>
    </div>
  );
};

export default About;
