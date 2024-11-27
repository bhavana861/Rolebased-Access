*Role Based Access Control Application Steps
-----------------------------------------------

1.Create react project using vite.
2.Delete unwanted App.jsx,App.css,index.html,index.css files.
3.I am using react bootstrap for styling.Fot that install react bootstrap in our file by using the commands - npm install react-bootstrap bootstrap and import bootsrap in our App.jsx component - import 'bootstrap/dist/css/bootstrap.min.css';
4.Create pages folder for holding differrent pages for this application in src folder and create different component for each page in that folder.
5.Installing React Router DOM that provides tools for handling routing and navigation within  application. It's essential for building Single Page Applications (SPAs) that dynamically load different views or components without refreshing the entire page,By using the command -npm i react-router-dom.
6.Setup path for components using react-router-dom library.
7.Create a component folder inorder to hold reusable codes in different pages of react app,create component file inside it.
8.Hooks used in this project- useState(),useEffect(),useParams(),useNavigate().
    1.useState() Hook - is a function in React that allows you to add state to functional components. It returns an array with two elements:The current state value.
             A function to update that state.
        syntax-const [state, setState] = useState(initialValue);
         initialValue: The initial value of the state.
         state: The current state value.
         setState: The function used to update the state.
     2.useEffect() Hook-useEffect hook in React allows you to perform side effects (e.g., fetching data, subscriptions, or manually changing the DOM) in functional components. It runs after every render by default but can be controlled to run only when certain values change.
        syntax-useEffect(() => {
                        // side effect code
                        }, [dependencies]);
       - The first argument is a function that contains the side effect.
        -The second argument is an optional array of dependencies. If you pass an empty array ([]), the effect runs only once, after the initial render.
    3.useParams() Hook - is used to access parameters from the URL in a route (typically used in React Router). It returns an object containing key-value pairs of the dynamic parts of the URL.
        syntax-const params = useParams();
           params: An object where keys are the parameter names from the route, and values are the actual values in the URL.
    4.useNavigate() Hook - is used in React Router to programmatically navigate to a different route. It provides a function to trigger navigation.
        syntax-const navigate = useNavigate();
        navigate: A function used to redirect to a different route.

8.To make api call in react : use axios library, axios(config) method,POST,GET,PUT,DELETE request.
10.import axios in our file using the command - npm i axios
11.Create a JSon server folder to store data and create a db.json file inside that folder.
12.Create CommonAPI.js,serverURL.js,allAPI.js files in a folder service.
13.commonAPI.js-this file serves as a centralized module for making API requests. It defines a general-purpose function (commonAPI) that can be reused for all types of HTTP requests (GET, POST, PUT, DELETE, etc.).
    1.POST-Purpose: Send data to the server to create a new resource.
           Effect: Creates or submits new data.
    2.GET-Purpose: Retrieve data from the server.
          Effect: Does not change any data; just fetches information.
    3. PUT-Purpose: Update or replace an existing resource on the server.
           Effect: Replaces the entire resource with the new data.
    4. DELETE-Purpose: Remove a resource from the server.
              Effect: Deletes the specified resource.
14.serverURL.js:This file typically contains the base URL of the server or API endpoint. It allows for easy configuration of the base URL of the backend server and is often used in combination with commonAPI.js.
15.allAPI.js-This file aggregates and exports all the specific API functions for interacting with different resources (like users, roles, etc.). Each function in allAPI.js calls the commonAPI.js function and passes the necessary parameters like the HTTP method, URL, and any data to be sent in the request.

JSON server deployment using Node js
------------------------------------
1.Create a index.js inside server folder
2.Update Scripts key of package.json file with {"start":"node index.js"} and remove test key from it.
3.Create .gitignore file,to add node_modules inside it.
4.Define steps to run db.json file using json-server in index.js.
    -import json-server
    -create a server for role-based-access-control-app inorder to run our server app.
    -Create a middleware to convert json data to js
    -Create a port for executing our app.
    -We have to set up route/path db.json file.So that client cam make the request.
    -Use middleware,route inside the server.
    -Run server using the given port.
    -to execute our app we have to use:node index.js in terminal,so that we can see tat output in localhost:3000
    -Create render account using github account.