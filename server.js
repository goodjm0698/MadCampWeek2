const http = require("http");
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

app.get("/todos", (req, res) => {
  db.query("SELECT * FROM todos", (err, results) => {
    if (err) {
      console.error("Failed to fetch todos from MySQL:", err);
      res.status(500).json({ error: "Failed to fetch todos" });
      return;
    }
    res.json(results);
  });
});

app.post("/todos", (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(400).json({ error: "Text field is required" });
    return;
  }
  db.query("INSERT INTO todos (text) VALUES (?)", [text], (err, result) => {
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
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
