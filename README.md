Stage 1 Structuring

Extension and Shortcut

'rafce' React Arrow Function Components Export

Install React
https://reactjs.org/docs/create-a-new-react-app.html

1. switch to the working directory
2. run 'npx create-react-app frontend'
   run 'npm install react-router-dom'
3. switch to frontend folder, run 'npm start' to test the webpage
4. in src folder, remove other files except App.js, index.css and index.js
5. in public folder, open index.html and change the title tag

Install TailwindCSS
https://tailwindcss.com/docs/guides/create-react-app

6. in frontend folder, run 'npm install -D tailwindcss postcss autoprefixer'
7. run 'npx tailwindcss init -P'
8. modify tailwind.config.js file
9. modify ./src/index.css file
10. run 'npm run start'
11. modfiy App.js to see the output

Install daisyUI plugin
https://daisyui.com/docs/install/

12. run 'npm install daisyui'
13. modify tailwind.config.js file
14. (optional) To change daisyUI themes,
    visit https://daisyui.com/docs/themes/
    got fronted/public/index.html
    <html data-theme="theme name"></html>

Install react-icons
https://www.npmjs.com/package/react-icons

15. npm install react-icons

Navbar Component

16. src folder -> create components folder
    components folder -> create layout folder and paper folder
17. layout folder -> create Navbar.jsx
    App.js -> import Router, Routes and Route from react router dom
    App.js -> import Navbar
18. Navbar.jsx -> create layout and Link component

Footer Component

19. layout folder -> create Footer.jsx
    App.js -> import Footer
20. Footer.jsx -> create layout and svg icon

Creating Routes for Home and About page

21. src folder -> create pages folder
    pages folder -> create About.jsx, Home.jsx, and NotFound.jsx
22. App.js -> import About, Home, NotFound
    create Routes for Home, About, and NotFound components

PaperList Component

23. paper folder -> create PaperResults.jsx
24. paper folder -> create PaperSearch.jsx
25. Home.jsx -> import PaperResults and PaperSearch components
26. (optional) PaperResult.jsx -> create a fetch test
    and use useEffect and useState to render the component
27. paper folder -> create PaperItem.jsx
    render each paper item individually
    create a Link to /paper/:paperId
    create checkbox for each paper items
28. pages folder -> create Paper.jsx
29. App.js -> import Paper Component and
    create a route path /paper/:paperId

Spinner Component

27. layout folder -> create Spinner.jsx
28. import spinner.gif and render a spinner
29. PaperResults.jsx -> import Spinner

Setup Semanticscholar Context

30. src folder -> create context folder
    context folder -> create semanticscholar folder
31. semanticscholar folder -> create SemanticscholarContext.js
32. create Context and Provider and bring in the fetchUsers function, then return the Context as the Provider with values  
    and finally pass to its chilren components
33. App.js -> wrap the context provider
34. PaperResults.jsx -> import SemanticscholarContext.js
    remove useState and use useContext instead

Setup Reducers and Reducer Hook

35. context folder -> create SemanticsholarReducer.js
    and create a reducer with a default state
36. SemanticsholarContext.js ->
    import useReducer and semanticscholarReducer,
    create initial State object,
    create state and dispath with useReducer hook
    dispatch GET_PAPERS and the payload

Paper Search Component

37. PaperSearch.jsx -> create fieldsOfStudy array of object for checkboxs
38. create an array of checkbox states (later iterating the values)
39. create handleChange for the checkboxs and collect the values
40. create a search input and dispatch the action when submitted
41. create handleChange for the input

PaperResult and PaperItem

42. PaperResults.jsx -> import SematicscholarContext
43. create handleChange for adding paper item in the bucket
    to the checkboxs of each paper items (PaperItem)
44. map the papers array and pass down paper, index and the handle Change function

Bucket Page (Testing Stage)

45. pages folder -> create Bucket.jsx
46. import SemanticscholarContext and map the bucket array
47. App.js -> import Bucket Component and create the route
48. Navbar.js -> add Link to Bucket Component

JSON To Excel (Testing State)

49. npm install write-excel-file
50. import SemanticscholarContext context
51. create excel output structure using with the package

Alert Context

52. context folder -> create alert folder
53. alert folder -> create AlertContext.js, AlertReducere.js
54. layout folder -> create Alert.jsx

Details about a paper (Testing Stage)

55. SemanticsholarActions.js -> create getPaperDetail RestAPI
56. pages folder -> create Paper.jsx
57. Paper.jsx -> create SemanticscholarContext and useEffect
58. create getPaperDetail fetch API and dispatch to the reducer

Material UI (Slider Component) and the Slider

59. npm install @mui/material @emotion/react @emotion/styled
60. PaperSearch.jsx -> import Slider
61. create useState for dateRange and setDateRange
62. create a Slider in a dropdown menu and handleDateRangeOnChange function
63. in handleSubmit function, bring in the state of searchPapers API calls

PaperSearch: Pagination For Papers

64. PaperResults.jsx -> bring in offset, next, itemIndex and other
    query fields for pagination data
65. create two buttons and two functions
    handlePreviousPage and handleNextPage
66. each functions have their own API calls and then dispach the data to papers state

PaperSearch: Limitation For Paper items

67. create a dropdown menu and selections input
68. create limit and setLimit useState and handleLimitOnChange function
69. bring in the limit state to searchPapers call

Passing Props to Paper (checkbox) working...

70. PaperItem.jsx -> pass index props through Link Component
71. Paper.jsx -> import useLocation to bring in index state
72. create isChecked state for checkbox input
73. create handleAddOnChange for adding paper data in papers context
74. create a find method for every items which the paperId is equal
    if found in the list (bucketItems), set the paper's check box checked

Backend Server Setup

75. create Backend folder in the project root folder
76. run npm init in the project root folder
77. run npm install express in the root folder
78. in backend folder -> create server.js
79. root -> package.json file, create "type": "module" object value
80. create data folder (for creating user data)
81. create users.js and some user data
82. npm install bcryptjs
83. users.js -> import bcrypt and use it on users password

Server Routes and Nodemon Setup

84. create routes and test for bucket and bucket/:id (using dummy data)
85. npm install -D nodemon concurrently
86. add script "server": "nodemon backend/server"
87. add script "dev": "concurrently \"npm run server\" \"npm run client\""

Environment Variables

88. npm install dotenv
89. create .env file in the project root folder
90. server.js -> import dotenv and dotenv.config() creation

MongoDB and Schema Setup

91. .env -> create a variable for MongoDB URI connection string
92. create database semanticscholar

Mongooose and creating database

93. npm install mongoose
94. project root folder -> create config folder
95. config folder -> create db.js, create connectDB connection module
96. server.js -> import connectDB module and test the server

Adding Colors to the Console (optional)

97. npm install colors
98. server.js -> import color from 'colors'

Modeling data

99. create models folder
100. create bucketModel.js and userModel.js
101. userModel.js -> build Schema and pass to model method
102. bucketModel.js -> build Schema and pass to model method
103. npm install bcryptjs
104. create users.js in data folder
105. users.js -> import bcryptjs

Import Data to create initial Bucket items (Experimental)

106. Beckend Folder -> create seeder.js with data import and destroy
107. project root folder package.json -> add
     data:import and data:destroy to run backend/seeder file

Backend: Fetching Data from the Database

108. backend folder -> create routes folder
109. routes folder -> create bucketRoutes.js
110. server.js -> import bucketRoutes.js and create pipelines
     example: app.use('/api/route', Routes)
111. backend folder -> create controllers folder
112. controllers folder -> create bucketController.js and
     userControllers.js
113. npm install express-async-handler
114. in the controllers.js file, import the models and asyncHandler
115. create /api/bucket and /api/bucket/:id handlers
116. bucketRoutes.js -> create routes for GET papers, GET paper by id, DELETE papers and DELETE paper by id

Backend : Custom Error Handling (Send error as JSON format)

117. backend folder -> create middleware folder
118. middleware folder -> create errorMiddleware.js
119. errorMiddleware.js -> add 404 not found and 500 server error handlers
120. server.js -> import notFound and errorHandler from the middleware and implement app.use()

Frontend: Working with backend server \*\*\* (Experimental)

121. open package.json file -> add "proxy": "http://127.0.0.1:5000",
122. Bucket.jsx -> import getAllPapers from SemanticsholarActions
123. Bucket.jsx -> import removeAllPapers, create removeAllPapersHandler
124. PaperItem.jsx ->
125. PaperItem.jsx ->

Backend: User Authentication

117. UserModel.js -> create matchPassword method using bcrypt
118. use bcrypt salt and hash before save changed password
119.
120. create utils folder, create generateToken.js in the folder
121.

Deploy to Heroku

1. create Procfile
2.
