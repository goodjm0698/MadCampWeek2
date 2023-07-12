const bodyParser = require("body-parser");
const mysql = require("mysql");

const express = require("express");
const app = express();

const http = require("http").Server(app);
const cors = require("cors");
//app.use(cors());
// app.use(
//   cors({
//     origin: "*", // 출처 허용 옵션
//     credentials: true, // 응답 헤더에 Access-Control-Allow-Credentials 추가
//     optionsSuccessStatus: 200, // 응답 상태 200으로 설정
//   })
// );
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "<http://localhost:3000>",
  },
});

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

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on("createRoom", () => {
    socket.join(socket.UID);
    //chatRooms.unshift({ id: generateID(), name, messages: [] }); // db로 연결
    db.query(
      "INSERT INTO chatroom (created_at) VALUES (CURRENT_TIMESTAMP)",
      (err, result) => {
        if (err) {
          console.error("Failed to insert chatroom into MySQL:", err);
          return;
        }
      }
    );
    socket.emit("roomsList", chatRooms);
  });

  socket.on("findRoom", (id) => {
    socket.join(id);
    //let result = chatRooms.filter((room) => room.id == id); // db query
    db.query(
      "SELECT DISTINCT chatroom.id AS chatroom_id, chatmessage.created_at AS chatmessage_created_at, chatmessage.id AS chat_id, chatmessage.content AS chat_content, users.username AS sender_username\
      FROM chatroom\
      JOIN chatmessage ON chatroom.id = chatmessage.chatroom_id\
      JOIN users ON chatmessage.sender_id = users.UID\
      ORDER BY chatmessage_created_at",
      (err, results) => {
        if (err) {
          console.error("Failed to fetch projs from MySQL:", err);
          return;
        }
        const formattedData = [];

        // chatroom_id로 그룹화하여 새로운 배열 형태로 변환
        const groupedData = {};
        results.forEach((row) => {
          const {
            chatroom_id,
            chatmessage_created_at,
            chat_id,
            chat_content,
            sender_username,
          } = row;

          if (!groupedData[chatroom_id]) {
            // chatroom_id에 대한 항목이 없으면 새로 생성
            groupedData[chatroom_id] = {
              id: chatroom_id.toString(),
              messages: [],
            };
          }

          // messages 배열에 새로운 메시지 항목 추가
          groupedData[chatroom_id].messages.push({
            id: chat_id.toString(),
            text: chat_content,
            time: chatmessage_created_at.toString(), // 예시에서는 문자열로 변환했으나, 실제로는 날짜 형식으로 변환해야 할 수도 있습니다.
            user: sender_username,
          });
        });

        // 변환된 데이터를 formattedData에 추가
        for (const chatroom_id in groupedData) {
          const chatroom = groupedData[chatroom_id];
          formattedData.push(chatroom);
        }

        const filteredData = formattedData.filter(
          (item) => item.id === id.toString()
        );
        //console.log(filteredData);
        socket.emit("foundRoom", filteredData[0].messages);

        //console.log("Just got the res", results);
      }
    );
  });

  socket.on("newMessage", (data) => { // db에 넣고, db에서 모든 메세지를 뽑음, 그리고 user가 들어가 있는 모든 방을 roomlist함.
    const { room_id, message, user, _ } = data;
    let timestamp;
    //let result = chatRooms.filter((room) => room.id == room_id); // db query
    // console.log("New Message", data);
    //socket.to(room_id).emit("roomMessage", newMessage);
    db.query(
      "INSERT INTO chatmessage (content, sender_id, chatroom_id, created_at)\
      VALUES (?, ?, ?, CURRENT_TIMESTAMP)",
      [message, user, room_id],
      (err, results) => {
        if (err) {
          console.error("Failed to insert message into MySQL:", err);
          return;
        }        
      }
    );
    db.query(
      "SELECT created_at FROM chatmessage ORDER BY created_at DESC LIMIT 1",
      (err, res) => {
        if (err) {
          console.error("Failed to fetch message timestamp:", err);
          return;
        }
        console.log(res);
        const timestam = res[0].created_at;
        timestamp = timestam;
        console.log(timestamp);
        // 추가 처리
      }
    );    
    //JOIN chatroom_user ON chatroom.id = chatroom_user.chatroom_id\

    db.query(
      "SELECT DISTINCT chatroom.id AS chatroom_id, chatmessage.created_at AS chatmessage_created_at, chatmessage.id AS chat_id, chatmessage.content AS chat_content, users.username AS sender_username\
      FROM chatroom\
      JOIN chatmessage ON chatroom.id = chatmessage.chatroom_id\
      JOIN users ON chatmessage.sender_id = users.UID\
      ORDER BY chatmessage_created_at",
      (err, results) => {
        if (err) {
          console.error("Failed to insert message into MySQL:", err);
          return;
        } else {
          const formattedData = [];

          // chatroom_id로 그룹화하여 새로운 배열 형태로 변환
          const groupedData = {};
          results.forEach((row) => {
            const {
              chatroom_id,
              chatmessage_created_at,
              chat_id,
              chat_content,
              sender_username,
            } = row;

            if (!groupedData[chatroom_id]) {
              // chatroom_id에 대한 항목이 없으면 새로 생성
              groupedData[chatroom_id] = {
                id: chatroom_id.toString(),
                messages: [],
              };
            }

            // messages 배열에 새로운 메시지 항목 추가
            groupedData[chatroom_id].messages.push({
              id: chat_id.toString(),
              text: chat_content,
              time: chatmessage_created_at.toString(), // 예시에서는 문자열로 변환했으나, 실제로는 날짜 형식으로 변환해야 할 수도 있습니다.
              user: sender_username,
            });
          });

          // 변환된 데이터를 formattedData에 추가
          for (const chatroom_id in groupedData) {
            const chatroom = groupedData[chatroom_id];
            formattedData.push(chatroom);
          }

          let rooms;
          db.query(
            "SELECT DISTINCT chatroom_id FROM chatroom_user WHERE user_id = ?",
            [user],
            (err, results) => {
              if (err) {
                console.log(err);
                return;
              }
              //console.log(results);
              rooms = results.map((row) => row.chatroom_id);
              //console.log(rooms);
              const formattedData2 = formattedData.filter((item) =>
                rooms.includes(parseInt(item.id))
              );
              //console.log(formattedData2);
              socket.emit("roomsList", formattedData2);
            }
          );

          socket.to(room_id).emit("roomMessage", { room_id, message, user, timestamp });
          
          // const formattedData2 = formattedData.filter((item) => rooms.includes(item.id));
          // socket.emit("roomsList", formattedData2);
          const filteredData = formattedData.filter(
            (item) => item.id === room_id.toString()
          );
          //console.log(filteredData);
          socket.emit("foundRoom", filteredData[0].messages);
        }
      }
    );
    //result[0].messages.push(newMessage);
  });

  socket.on("needroomsList", (uid) => {
    db.query(
      "SELECT DISTINCT chatroom.id AS chatroom_id, chatmessage.created_at AS chatmessage_created_at, chatmessage.id AS chat_id, chatmessage.content AS chat_content, users.username AS sender_username\
      FROM chatroom\
      JOIN chatmessage ON chatroom.id = chatmessage.chatroom_id\
      JOIN users ON chatmessage.sender_id = users.UID\
      WHERE chatroom.id IN (\
        SELECT chatroom_id FROM chatroom_user WHERE user_id = ?\
      )\
      ORDER BY chatmessage_created_at",
      [uid],
      (err, results) => {
        if (err) {
          console.error("Failed to insert message into MySQL:", err);
          return;
        } else {
          const formattedData = [];

          // chatroom_id로 그룹화하여 새로운 배열 형태로 변환
          const groupedData = {};
          results.forEach((row) => {
            const {
              chatroom_id,
              chatmessage_created_at,
              chat_id,
              chat_content,
              sender_username,
            } = row;

            if (!groupedData[chatroom_id]) {
              // chatroom_id에 대한 항목이 없으면 새로 생성
              groupedData[chatroom_id] = {
                id: chatroom_id.toString(),
                messages: [],
              };
            }

            // messages 배열에 새로운 메시지 항목 추가
            groupedData[chatroom_id].messages.push({
              id: chat_id.toString(),
              text: chat_content,
              time: chatmessage_created_at.toString(), // 예시에서는 문자열로 변환했으나, 실제로는 날짜 형식으로 변환해야 할 수도 있습니다.
              user: sender_username,
            });
          });

          // 변환된 데이터를 formattedData에 추가
          for (const chatroom_id in groupedData) {
            const chatroom = groupedData[chatroom_id];
            formattedData.push(chatroom);
          }

          //console.log(formattedData);
          socket.emit("roomsList", formattedData);
        }
      }
    );
  });

  socket.on("disconnect", () => {
    socket.disconnect();
    console.log("🔥: A user disconnected");
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

// 유저가 프로젝트 탭에 들어오면, 프로젝트 리스트를 display해야 함

app.get("/projects", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); // 필요한건가?
  db.query(
    "SELECT projects.*, users.username AS username,users.name AS name, GROUP_CONCAT(projtags.tag) AS tags\
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
        res.json({ success: true, UID: UID, username: data[0].username });
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
  const name = req.body.name;
  const age = req.body.age;
  const school = req.body.school;
  const selectedValue = req.body.selectedValue;
  const selectedTags = req.body.selectedTags;
  console.log(
    username,
    password,
    sex,
    age,
    name,
    school,
    selectedValue,
    selectedTags
  );
  const tags = Object.entries(selectedTags)
    .filter(([key, value]) => value)
    .map(([key, value]) => key);
  console.log(tags);

  const sql = "select count(*) as result from users where username = ?;";
  db.query(sql, [username], (err, data) => {
    if (!err) {
      if (data[0].result >= 1) {
        console.log("collison");
      } else {
        db.query(
          "INSERT INTO users (username, PW,name,gender,age,school,class) VALUES (?, ?,?,?,?,?,?);",
          [username, password, name, sex, age, school, selectedValue],
          (err, res) => {
            if (err) {
              console.error("Failed to insert todo into MySQL:", err);
              res.status(500).json({ error: "Failed to add todo" });
              return;
            } else {
              console.log(tags);
              db.query(
                "select UID from users where username = ?;",
                [username],
                (error, data) => {
                  if (!error) {
                    console.log(data[0].UID);
                    const tagsSql = tags.map(
                      (tag) =>
                        `INSERT INTO usertags (UID, tag) VALUES ('${data[0].UID}', '${tag}')`
                    );
                    console.log(tagsSql);
                    tagsSql.forEach((query) => {
                      db.query(query, (err, result, fields) => {
                        if (!err) {
                          console.log(result);
                        }
                      });
                    });
                  }
                }
              );
            }
          }
        );
      }
    }
  });
});

app.post("/profileedit", (req, res) => {
  const UID = req.body.UID;
  const gender = req.body.gender;
  const name = req.body.name;
  const age = req.body.age;
  const school = req.body.school;
  const classNum = req.body.classNum;
  const selectedTags = req.body.selectedTags;
  console.log(UID, gender, age, name, school, classNum, selectedTags);
  const tags = Object.entries(selectedTags)
    .filter(([key, value]) => value)
    .map(([key, value]) => key);
  db.query(
    "update users set gender = ?, age=?, school=?, class = ? where name = ?;",
    [gender, age, school, classNum, name],
    (err, res) => {
      if (err) {
        console.error("Failed to update user into MySQL:", err);
        res.status(500).json({ error: "Failed to add todo" });
        return;
      } else {
        db.query("delete from usertags where UID = ?;", [UID], (err, res) => {
          if (!err) {
            const tagsSql = tags.map(
              (tag) =>
                `INSERT INTO usertags (UID, tag) VALUES ('${UID}', '${tag}')`
            );
            console.log(tagsSql);
            tagsSql.forEach((query) => {
              db.query(query, (err, result, fields) => {
                if (!err) {
                }
              });
            });
          }
        });
        console.log(tags);
      }
    }
  );
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
  const { UID } = req.query;
  db.query(
    "SELECT users.*, GROUP_CONCAT(usertags.tag) AS tags \
    FROM users \
    LEFT JOIN usertags ON users.UID = usertags.UID \
    WHERE users.UID = ? \
    GROUP BY users.UID;",
    [UID],
    (err, results) => {
      if (err) {
        console.error("Failed to fetch your profiles from MySQL:", err);
        res.status(500).json({ error: "Failed to fetch your profile" });
        return;
      }
      // console.log(results);
      // console.log(results[0].tags.split(','));
      res.json(results);
      console.log(results);
    }
  );
});

app.get("/api", (req, res) => {
  db.query(
    "SELECT DISTINCT chatroom.id AS chatroom_id, chatmessage.created_at AS chatmessage_created_at, chatmessage.id AS chat_id, chatmessage.content AS chat_content, users.username AS sender_username\
    FROM chatroom\
    JOIN chatmessage ON chatroom.id = chatmessage.chatroom_id\
    JOIN users ON chatmessage.sender_id = users.UID\
    WHERE chatroom.id IN (\
      SELECT chatroom_id FROM chatroom_user WHERE user_id = 3\
    )\
    ORDER BY chatmessage_created_at",
    (err, results) => {
      if (err) {
        console.error("Failed to insert message into MySQL:", err);
        return;
      } else {
        const formattedData = [];

        // chatroom_id로 그룹화하여 새로운 배열 형태로 변환
        const groupedData = {};
        results.forEach((row) => {
          const {
            chatroom_id,
            chatmessage_created_at,
            chat_id,
            chat_content,
            sender_username,
          } = row;

          if (!groupedData[chatroom_id]) {
            // chatroom_id에 대한 항목이 없으면 새로 생성
            groupedData[chatroom_id] = {
              id: chatroom_id.toString(),
              messages: [],
            };
          }

          // messages 배열에 새로운 메시지 항목 추가
          groupedData[chatroom_id].messages.push({
            id: chat_id.toString(),
            text: chat_content,
            time: chatmessage_created_at.toString(), // 예시에서는 문자열로 변환했으나, 실제로는 날짜 형식으로 변환해야 할 수도 있습니다.
            user: sender_username,
          });
        });

        // 변환된 데이터를 formattedData에 추가
        for (const chatroom_id in groupedData) {
          const chatroom = groupedData[chatroom_id];
          formattedData.push(chatroom);
        }

        console.log(formattedData);
        res.json(formattedData);
      }
    }
  );
});

const port = 3000;
http.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
