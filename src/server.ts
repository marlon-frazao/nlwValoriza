import express from 'express';

const app = express();

app.get("/test", (request, response) => {
    return response.send("Olá NLW");
});

app.post("/test", (request, response) => {
    return response.send("Olá NLW método post");
});

// http://localhost:3000
app.listen(3000, () => console.log("Server is running"));
