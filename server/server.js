// const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
// const cors = require("cors");

// const { createServer } = require("http");
// const { Server } = require("socket.io");

// const app = express();
// const httpServer = createServer(app);
// const io = new Server(httpServer, {cors:({
//   origin: "*", // 출처 허용 옵션
//   // credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
//   // optionsSuccessStatus: 200, // 응답 상태 200으로 설정
// })});

// io.on('connection', (socket) => {
//   console.log(`⚡: ${socket.id} user just connected!`);

//   socket.on('disconnect', () => {
//     socket.disconnect()
//     console.log('🔥: A user disconnected');
//   });
// });
// app.use(bodyParser.json());

// app.use(
//   cors({
//     origin: "*", // 출처 허용 옵션
//     credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
//     optionsSuccessStatus: 200, // 응답 상태 200으로 설정
//   })
// );

const express = require("express");
const app = express();
const PORT = 4000;

const http = require("http").Server(app);
const cors = require("cors");
app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "<http://localhost:3000>",
  },
});
socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected");
  });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api", (req, res) => {
  res.json({
    message: "Hello world",
  });
});

const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "0000",
  database: "madmarket",
});

db.connect((err) => {
  if (err) {
    console.error("Failed to connect to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// 유저가 프로젝트 탭에 들어오면, 프로젝트 리스트를 display해야 함

app.get("/projects", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); // 필요한건가?
  db.query(
    "SELECT projects.*, users.username AS username, GROUP_CONCAT(projtags.tag) AS tags\
  FROM projects\
  LEFT JOIN projtags ON projects.PID = projtags.PID\
  LEFT JOIN users ON projects.UID = users.UID\
  GROUP BY projects.PID",
    (err, results) => {
      if (err) {
        console.error("Failed to fetch projs from MySQL:", err);
        res.status(500).json({ error: "Failed to fetch projs" });
        return;
      }
      res.json(results);
      console.log("Just got the res", results);
    }
  );
});

app.post("/projects", (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(440).json({ error: "Text field is required" });
    return;
  }
  db.query(
    "INSERT INTO projects (CreatorID, project_info) VALUES (1,?)",
    [text],
    (err, result) => {
      if (err) {
        console.error("Failed to insert todo into MySQL:", err);
        res.status(500).json({ error: "Failed to add todo" });
        return;
      }
      res.json({ id: result.insertId, text });
    }
  );
});

app.post("/login", (req, res) => {
  const id = req.body.id;
  const password = req.body.password;
  const sql1 =
    "SELECT COUNT(*) AS result FROM users WHERE username = ? and PW = ?";
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
http.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
