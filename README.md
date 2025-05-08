# [Poetry Garden] : [Team 29]
# Members
Project Manager: [Jaylen Haney] ([Summrrino])\
Communications Lead: [Thomas Lee] ([luffysolosyonko])\
Git Master: [Rivers Dupaquier] ([RiversDupaquie])\
Design Lead: [Tyler Jackson] ([tylerjackson177])\
Quality Assurance Tester: [Julian Rodgers] ([jrodg32])

# About Our Software

Poetry Garden is a web app that allows the user to explore a virtual garden filled with poems. The motivation behind it was to develop a better way for poets to share their work. Each plant/flower presents the user with a poem. Users can write and upload their own poem which will then be "planted" as an interactive element within their own garden. Users will be able to upload their poem to the "Community garden" that will be seen by others. Community Competition weekly tournaments will be held to decide which poems the users of the app like the best.
## Platforms Tested on
-Windows 11

-MacOS

-Linux

-Chrome


# Important Links
Kanban Board: [https://lsu-team-proj.atlassian.net/jira/software/projects/DP/pages?atlOrigin=eyJpIjoiN2NlMGJlNDUxNWY0NDA2NjhiZTA1ZDcyYmNhNmMwY2EiLCJwIjoiaiJ9]\
Designs: [https://www.figma.com/board/dOrHYopcyYqY8OBuvUCHFu/Untitled?node-id=0-1&t=dITOnRvu8sVpQ8yC-1]\
Styles Guide(s): [https://www.w3schools.com/js/js_conventions.asp]

# How to Run Dev and Test Environment

## Dependencies
- firebase 11.6.1
- framer-motion 12.9.7
- lucide-react 0.507.0
- react 19.0.0
- react-dom 19.0.0
- react-router-dom 7.5.1
- react-scripts 5.0.1
- web-vitals 2.1.4
### Downloading Dependencies
1. Install Node.js (v18 or later)
	Node.js includes npm, which is used to manage packages.
	https://nodejs.org/en

Navigate to the project root in your terminal and run:

npm install

npm install framer-motion

npm install lucide-react

npm install react-router

This will download all packages listed in package.json, including:

React

React Router

Firebase

Framer Motion

Lucide React

TypeScript 

## Commands

Follow these steps to launch the project from the main branch and test your code:



1. Open a terminal and navigate to the root folder of the project:

cd poetry-garden

2. Install all project dependencies (only needs to be done once):

npm install

npm install framer-motion

npm install lucide-react

npm install react-router


3. Add the Firebase configuration to firebase.ts under const firebaseConfig = {}. The API keys and config object were provided via team email (contact John Luke Denny if needed).
   
4. Start the server:

npm start

5. Open your browser and go to:
   
http://localhost:3000

