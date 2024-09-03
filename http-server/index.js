const http = require("http");
const fs = require("fs");
const minimist = require("minimist");
const args = minimist(process.argv.slice(2));

let homeContent = "";
let projectContent = "";
let regsContent = "";

const port = parseInt(args.port);
console.log(`Parsed Port : ${port}`);
fs.readFile("./home.html", (err, home) => {
  if (err) {
    throw err;
  }
  homeContent = home;
});
fs.readFile("./project.html", (err, project) => {
  if (err) {
    throw err;
  }
  projectContent = project;
  console.log(projectContent.toString());
});
fs.readFile("./registration.html", (err, registration) => {
  if (err) {
    throw err;
  }
  regsContent = registration;
});

http
  .createServer((req, res) => {
    let url = req.url;
    res.writeHeader(200, { "Content-Type": "text/html" });
    switch (url) {
      case "/project":
        res.write(projectContent);
        res.end();
        break;
      case "/registration":
        res.write(regsContent);
        res.end();
        break;
      default:
        res.write(homeContent);
        res.end();
        break;
    }
  })
  .listen(port, () => {
    console.log("Server is started");
  });
