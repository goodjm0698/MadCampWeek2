const http = require("http");
const SocketIO = require("socket.io");
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");


const app = express();
app.use(bodyParser.json());

app.use(
  cors({
    origin: "*", // 출처 허용 옵션
    credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
    optionsSuccessStatus: 200, // 응답 상태 200으로 설정
  })
);

const server = http.createServer(app);
const wsServer = SocketIO(server);

wsServer.on("connection", (socket) => {
  console.log(socket);
});

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "20200291",
  database: "madmarket",
});

db.connect((err) => {
  if (err) {
    console.error("Failed to connect to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.get("/projects", (req, res) => {
  db.query("SELECT * FROM projects", (err, results) => {
    if (err) {
      console.error("Failed to fetch projs from MySQL:", err);
      res.status(500).json({ error: "Failed to fetch projs" });
      return;
    }
    res.json(results);
    console.log("Just got the res", results);
  });
});

app.post("/projects", (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(440).json({ error: "Text field is required" });
    return;
  }
  db.query("INSERT INTO projects (CreatorID, project_info) VALUES (1,?)", [text], (err, result) => {
    if (err) {
      console.error("Failed to insert todo into MySQL:", err);
      res.status(500).json({ error: "Failed to add todo" });
      return;
    }
    res.json({ id: result.insertId, text });
  });
});

app.post("/login", (req, res) => {
  const id = req.body.id;
  const password = req.body.password;
  const sql1 =
    "SELECT COUNT(*) AS result FROM users WHERE Username = ? and Password = ?";
  db.query(sql1, [id, password], (err, data) => {
    if (!err) {
      if (data[0].result < 1) {
        console.log("error");
        res.json({ success: false });
      } else {
        console.log("match");
        res.json({ success: true });
      }
    } else {
      res.send(err);
      console.error("Failed to insert todo into MySQL:", err);
    }
  });
});

app.post("/signin", (req, res) => {
  const id = req.body.id;
  const password = req.body.password;
  const sex = req.body.sex;
  const selectedOption = req.body.selectedOption;
  console.log(id, password, sex, selectedOption);
  const sql = "select count(*) as result from users where id = ?;";
  db.query(sql, [id], (err, data) => {
    if (!err) {
      if (data[0].result >= 1) {
        console.log("collison");
      } else {
        console.log(data[0].result);
        db.query(
          "INSERT INTO users VALUES(? , ?);",
          [id, password],
          (err, results) => {
            if (err) {
              console.error("Failed to insert todo into MySQL:", err);
              res.status(500).json({ error: "Failed to add todo" });
              return;
            }
          }
        );
      }
    }
  });
});

const port = 3000;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
