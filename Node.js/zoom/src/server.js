import express from "express";

const app = express();
//app 만들기

app.set('view engine', "pug");
app.set("views", __dirname + "/views");
//나중에 pug 페이지들을 렌더하기 위해 pug 설정을 해줘야 한다.
//views 디렉토리를 입력

//우리가 사용할 유일한 route 만들기
//home으로 기면 request, response를 받고 res.render를 할 거다.
//우리가 만든 home을 렌더하는 것.
app.get("/", (req, res) => res.render("home"));

// console.log("hello");
const handleListen = () => console.log(`Listening on http://localhost:3000`);
app.listen(3000, handleListen);
//app은 console.log("hello")를 실행하고 포트 3000을 listen해 줄 것이다.

//express로 할 일은 views를 설정해주고 render해주는 것.
//이제 페이지를 render하고 있고(localhost:3000하면 it works!가 뜬다.) 
//이제 home에 script를 추가해주면 된다.
//나머지는 websocket에서 실시간으로 일어날 것이다.

