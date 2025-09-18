import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

app.get('/todos', (req, res) => {
    res.send('A list of todo items');
});

app.post('/todos', (req, res) => {
    res.send('Create a new todo item');
});

app.put('/todos/:id', (req, res) => {
    const { id } = req.params;
    res.send('Update the todo item with id ${id}');
});

app.delete('/todos/:id', (req, res) => {
    const { id } = req.params;
    res.send('Delete the todo item with id ${id}');
});

app.get('/todos/:id', (req, res) => {
    const { id } = req.params;
    res.send('Get the todo item with id ${id}');
});

app.listen(PORT, () => {
    console.log('The server is listening on port ${PORT}.')
});