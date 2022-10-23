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

Passing Props to Paper (checkbox) working...

localStorage

Backend Server

1.

Deploy to Heroku

1. create Procfile
2.
