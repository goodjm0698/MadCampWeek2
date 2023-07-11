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

const http = require("http").Server(app);
const cors = require("cors");
app.use(cors());

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "<http://localhost:3000>",
  },
});

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("createRoom", (name) => {
		socket.join(name);
		//chatRooms.unshift({ id: generateID(), name, messages: [] }); // db로 연결
		socket.emit("roomsList", chatRooms);
	});

	socket.on("findRoom", (id) => {
		let result = chatRooms.filter((room) => room.id == id); // db query
		socket.emit("foundRoom", result[0].messages);
	});

  socket.on("newMessage", (data) => {
		// const { room_id, message, user, timestamp } = data;
		// let result = chatRooms.filter((room) => room.id == room_id); // db query
		// const newMessage = {
		// 	id: room_id,
		// 	text: message,
		// 	user,
		// 	time: `${timestamp.hour}:${timestamp.mins}`,
		// };
		console.log("New Message", data);
		//socket.to(result[0].name).emit("roomMessage", newMessage);
		//result[0].messages.push(newMessage);

	  //socket.emit("roomsList", chatRooms);
		//socket.emit("foundRoom", result[0].messages);
	});

  socket.on('disconnect', () => {
    socket.disconnect();
    console.log('🔥: A user disconnected');
  });
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

let chatRooms = [
  {
    id: "1",
    name: "Novu Hangouts",
    messages: [
      {
        id: "1a",
        text: "Hello guys, welcome!",
        time: "07:50",
        user: "Tomer",
      },
      {
        id: "1b",
        text: "Hi Tomer, thank you! 😇",
        time: "08:50",
        user: "David",
      },
    ],
  },
  {
    id: "2",
    name: "Hacksquad Team 1",
    messages: [
      {
        id: "2a",
        text: "Guys, who's awake? 🙏🏽",
        time: "12:50",
        user: "Team Leader",
      },
      {
        id: "2b",
        text: "What's up? 🧑🏻‍💻",
        time: "03:50",
        user: "Victoria",
      },
    ],
  },
];

const db = mysql.createConnection({
  host: "127.0.0.1",
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
      //console.log("Just got the res", results);
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
  const sql1 = "SELECT * FROM users WHERE username = ? and PW = ?";
  db.query(sql1, [id, password], (err, data) => {
    if (!err) {
      if (data.length < 1) {
        console.log("error");
        res.json({ success: false });
      } else {
        const UID = data[0].UID;
        res.json({ success: true, UID: UID });
      }
    } else {
      res.send(err);
      console.error("Failed to insert todo into MySQL:", err);
    }
  });
});

app.post("/signin", (req, res) => {
  const username = req.body.id;
  const password = req.body.password;
  const sex = req.body.sex;
  const selectedOption = req.body.selectedOption;
  console.log(username, password, sex, selectedOption);
  const sql = "select count(*) as result from users where username = ?;";
  db.query(sql, [username], (err, data) => {
    if (!err) {
      if (data[0].result >= 1) {
        console.log("collison");
      } else {
        db.query(
          "INSERT INTO users (username, PW) VALUES (?, ?);",
          [username, password],
          (err, res) => {
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

app.get("/profilelist", (req, res) => {
  db.query(
    "SELECT users.*, GROUP_CONCAT(usertags.tag) AS tags\
    FROM users\
    LEFT JOIN usertags ON users.UID = usertags.UID\
    GROUP BY users.UID",
    (err, results) => {
      if (err) {
        console.error("Failed to fetch profiles from MySQL:", err);
        res.status(500).json({ error: "Failed to fetch profiles" });
        return;
      }
      res.json(results);
    }
  );
});

app.get("/profile", (req, res) => {
  const UID = 1;
  db.query(
    "SELECT users.*, GROUP_CONCAT(usertags.tag) AS tags \
    FROM users \
    LEFT JOIN usertags ON users.UID = usertags.UID \
    WHERE users.UID = ? \
    GROUP BY users.UID",
    [UID],
    (err, results) => {
      if (err) {
        console.error("Failed to fetch your profiles from MySQL:", err);
        res.status(500).json({ error: "Failed to fetch your profile" });
        return;
      }
      // console.log(results);
      // console.log(results[0].tags.split(','));
      res.json(results[0]);
    }
  );
});

app.get("/api", (req, res) => {
  res.json(chatRooms);
});

const port = 3000;
http.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
