import express from "express";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "../components/App";

const server = express();
server.use(express.static("dist"));

server.get("/", (req, res) => {
  const initialMarkup = ReactDOMServer.renderToString(<App />);

  res.send(`
    <html>
      <head>
        <title>Sample React App</title>
      </head>
      <body>
        <div id="mountNode">${initialMarkup}</div>
        <script src="/main.js"></script>
      </body>
    </html>
  `);
});

server.get("/api/v1/sample-data", (req, res) => {
  const items = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0, true, [
      { id: 12, code: "test1" },
      { id: 13, code: "test2" },
    ]),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3, false, [
      { id: 12, code: "test1" },
      { id: 13, code: "test2" },
    ]),
    // createData("Eclair", 262, 16.0, 24, 6.0, true),
    // createData("Cupcake", 305, 3.7, 67, 4.3, false),
    // createData("Gingerbread", 356, 16.0, 49, 3.9, true),
  ];

  res.status(200).json(items);
});

server.listen(4242, () => console.log("Server is running..."));

function createData(name, calories, fat, carbs, protein, delicious, roles) {
  return { name, calories, fat, carbs, protein, delicious, roles };
}
