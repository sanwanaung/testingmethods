const http = require("http");
const fs = require("fs");
const port = 80;

let users = [
  { name: "san wan aung", email: "sanwanaung400042@gmail.com", age: 20 },
  {
    name: "Rose's Fav Boi",
    email: "rosefavboi@gmail.com",
    age: 22,
  },
  { name: "zaw mun aung", email: "zawmunaung@gmail.com", age: 21 },
  {
    name: "msquareprogramming",
    email: "msquareprogramming@gmail.com",
    age: 30,
  },
];

const server = http.createServer((request, response) => {
  const method = request.method;
  const route = request.url;
  const isRootUrl = route === "/";

  if (isRootUrl) {
    fs.readFile("index.html", (err, data) => {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(data);
      return response.end();
    });
  } else if (route === "/style.css") {
    fs.readFile("style.css", (err, data) => {
      response.writeHead(200, { "Content-Type": "text/css" });
      response.write(data);
      return response.end();
    });
  } else if (route === "/script.js") {
    fs.readFile("script.js", (err, data) => {
      response.writeHead(200, { "Content-Type": "text/javascript" });
      response.write(data);
      return response.end();
    });
  } else if (route === "/users") {
    if (method === "GET") {
      response.writeHead(200, { "Content-Type": "application/json" });
      response.write(JSON.stringify(users));
      return response.end();
    } else if (method === "POST") {
      let newData = "";
      request.on("data", (chunk) => {
        newData += chunk;
      });
      request.on("end", () => {
        const changeObj = JSON.parse(newData);
        users.push(changeObj);
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSON.stringify(users));
        return response.end();
      });
    } else if (method === "DELETE") {
      let newData = "";
      let filterUsers;
      request.on("data", (chunk) => {
        newData += chunk;
      });
      request.on("end", () => {
        const changeObj = JSON.parse(newData);
        const checkEmail = changeObj.email;
        filterUsers = users.filter((user) => {
          return user.email !== checkEmail;
        });
        users = filterUsers;
        response.writeHead(200, { "Content-Type": "application/json" });
        response.write(JSON.stringify(users));
        return response.end();
      });
    } else if (method === "PUT") {
      let newData = "";
      request.on("data", (chunk) => {
        newData += chunk;
      });
      request.on("end", () => {
        const changeObj = JSON.parse(newData);
        const checkEmail = changeObj.email;
        const checkUserEmail = users.find((elem) => elem.email === checkEmail);
        if (checkUserEmail) {
          checkUserEmail.name = changeObj.name;
          checkUserEmail.age = changeObj.age;
          response.writeHead(200, { "Content-Type": "application/json" });
          response.write(JSON.stringify(users));
          response.end();
        }
      });
    }
  } else {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.write("Not Home Url");
    response.end();
  }
});

server.listen(port, () => {
  console.log(`Server Started: Listenning on port ${port}`);
});
