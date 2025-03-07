// GET, POST, PUT, DELETE, PATCH

const express = require('express');

const uuid = require('uuid');
const app = express();

// app.use - represent the incoming HTTP request that consists of data like parameters, query strings, and also the request body
// automatically parse incoming request bodies as JSON. When a request is made to the server with a JSON payload, this middleware will parse it and make the parsed data available in req.body

app.use(express.json());

// process.env.PORT ||
const PORT = 5000;

const todos = [
    {
        id: 1,
        name: "Finish API build",
        completed: "false"
    },
    {
        id: 2,
        name: "Apply to jobs",
        completed: "false"
    },
    {
        id: 3,
        name: "Find my own place",
        completed: "true"
    },
]

// app.Patch - used to update specific fields of a resource, unlike PUT, which replaces the entire resource.


// app.get - route HTTP GET requests to the specified path, associating them with designated callback functions.

app.get('/', (req, res) => {
    res.json({
        msg: "Todo List Home Page"
    })
})

app.get('/todos', (req, res) => {
    res.json(todos)
})

// req.params.id - used in Express.js to access route parameters from a URL. 
// It retrieves the value of the id parameter when defined in a route.
// Use Case:
// This is useful for retrieving dynamic values from URLs, such as:

// Fetching a specific user's details (/users/:id)
// Editing a specific post (/posts/:postId/edit)
// Deleting an item (/products/:productId/delete)

app.get('/todos/:id', (req, res) => {
    let todo = todos.filter((todo) => todo.id == req.params.id )
    res.json({ msg: `Todo ${req.params.id}`, data: todo })
})

// app.post - sending some data along with the request to the HTTP server.

app.post('/todos', (req, res) => {
    todos.push({ id: uuid.v4(), ...req.body })
    res.json({ msg: "Add Todo", data: todos })
})

// app.put - used to send data to a server to create/update a resource.

app.put('/todos/:id', (req, res) => {
    let todo = todos.find((todo) => todo.id == req.params.id)
    if(todo) {
        todo.name = req.body.name
        todo.completed = req.body.completed
        res.json({ msg: "Edit/Update Todo", data: todos })
    }
    else{
        res.json({ msg: "Todo not found" })
    }
})

// app.delete - handle HTTP DELETE requests to a specified path.

// app.delete('/todos/:id', (req, res) => {
//     let index = todos.findIndex((todo) => todo.id == req.params.id)
//     todos.splice(index, 1);
//     res.json({ msg: "Delete Todo", data: todos })
// })
app.delete("/todos/:id", (req, res) => {
    let index = todos.findIndex((todo) => todo.id == req.params.id);
    todos.splice(index, 1);
    res.json(todos);
  });

app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})
