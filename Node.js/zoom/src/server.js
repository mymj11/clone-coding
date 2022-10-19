import http from "http";
import SocketIO from "socket.io";
// import WebSocket from "ws";
import express from "express";
import { emit } from "process";

const app = express();
//app 만들기

app.set('view engine', "pug");
//Pug로 view engine을 설정하고

app.set("views", __dirname + "/views");
//Express에 template이 어디 있는지 지정해주고
//여기에 view engine을 Pug로 설정하고, views 디렉토리가 설정되고
//나중에 pug 페이지들을 렌더하기 위해 pug 설정을 해줘야 한다.

app.use("/public", express.static(__dirname + "/public"));
//public url을 생성해서 유저에게 파일을 공유해주고
//유저가 /public으로 가게되면 () 폴더를 보여주게 할 거다. public 폴더를 유저에게 공개해준다.

//우리가 사용할 유일한 route 만들기
//home으로 가면 request, response를 받고 res.render를 할 거다. //우리가 만든 home을 렌더하는 것.
app.get("/", (req, res) => res.render("home"));
//home.pug를 render해주는 route handler를 만들었다. //우리 홈페이지로 이동 시 사용될 템플릿을 렌더해주는 것이다.
//유저가 홈(/)으로 GET request를 보내면 template으로 반응한다.
//http가 어떻게 생겼냐면 url을 선언하고, 유저가 url로 가면, req와 res를 받고, response를 보낸다.

app.get("/*", (req, res) => res.redirect("/"));
//유저가 어떤 페이지로 GET request를 보내도 redirect로 반응하도록 해뒀다.
//app.get을 입력하고 여기서 유저가 어떤 url로 이동하던지 홈으로 돌려보내면 된다. 
//왜냐하면 다른 url을 사용하지 않을 거니까. 다른 url은 전혀 사용하지 않고 홈만 사용할 것이다.
//주소창에 아무거나 입력해도(localhost:3000/dfdfdfd) 홈(localhost:3000)으로 돌려보내지게 된다.

const httpServer = http.createServer(app);
//express.js를 이용해서 http 서버를 만들었다. 
//여기서 서버를 만들건데, crateServer를 하려면 requestListener 경로가 있어야 한다. 이게 우리의 application이 되는 것이다.
//express application으로부터 서버를 만들어보자. 이 서버에서 websocket을 만들 수 있다는 것이다.
//app.listen 하기 전인데, 아직 서버에 access(접근)하지 못했었는데 이제 서버에 접근할 수 있다.

const wsServer = SocketIO(httpServer);
//const io = SocketIO(server);
//server를 보내주는 io 서버를 만들자.(wsServer라고해도 됨)

wsServer.on("connection", (socket) => {
    socket.onAny((event) => {
        console.log(`Socket Event:${event}`);
    });
    socket.on("enter_room", (roomName, done) => {
        socket.join(roomName);
        //roomName으로 방에 참가하자.
        done();
        //프엔의 function showRoom을 서버에서 실행시키자.
        socket.to(roomName).emit("welcome");
        //참가했다는 것을 나를 제외한 방에 있는 모든 사람들에게 알려주자.
        //event를 emit해주자. event의 이름은 마음대로.
        //welcome event를 나를 제외한 roomName에 있는 모든 사람들에게 emit한 것이다.
    });
});
//방에 참가하면 done() function을 호출한다.
//done()은 프엔에 있는 showRoom()을 실행한다.
//그러면 event를 방금 참가한 방 안에 있는 모든 사람들에게 emit해주는 거다.
//프엔에서 이 event를 반응하도록 만들자.(socket.on())


        // setTimeout(() => {
        //     done("hello from the backend");
        // }, 15000);
    //15초 후에 백엔드는 done function을 argument와 같이 call할거다.
    //백엔드는 두 개의 argument를 받는다.(input.value, backendDone)
    //한 개는 방 이름이고, 다른 하나는 우리가 call할 function이다.(끝났을 때 call하니까. 콜백은 서버로부터 실행되는 함수)
    //done function을 call했을 때 백엔드가 이 코드를 실행시키는 것이 아니다. 프엔에서의 function을 실행시킨 것이다.

    // socket.on("enter_room", (msg, done) => {
    //     console.log(msg);
    //     setTimeout(() => {
    //         done();
    //     }, 10000);
    //});

//받는 socket이 있다. //백엔드에서 connection을 받을 준비 끝.
//msg를 받을 수 있다. 여기서 msg는 프엔에서 보내는 argument 중 JSON object이다.
//2번째로는 프엔에서 보내는 done이라는 이름을 가진 function을 받는다.
//서버에서 done이라는 function을 호출하는 것, 서버가 이 function을 실행시키면 이 funtion은 프엔에서 실행될 것이다.
//서버는 백엔에서 function을 호출하지만, function은 프엔에서 실행되는 것이다.
//프엔에서 object를 보내고 백엔에서 console.log하면 object를 받을 수 있다.

const handleListen = () => console.log(`Listening on http://localhost:3000`);
httpServer.listen(3000, handleListen);






//websocket code (vs socket.io code)

// const wss = new WebSocket.Server({server});
//     //서버를 전달(pass)해줄 거다.
//     //새로운 websocket을 만들 때 HTTP를 위에 쌓아올리면서 만들었다.

// const sockets = []; //array
//     //누군가 우리 서버에 연결하면, 그 connection을 이 sockets에 넣을 거다.
//     //brave와 firefox가 각각 연결되면 그 socket을 넣어 줄거다. //[brave, firefox] //socket이 2개가 생긴다.
//     //이제 아래 wss.on에서 brave에서 메시지를 받으면, 받은 메시지를 sockets에 있는 모든 곳에 전달해 줄 수 있다.
//     //firefox에서 메시지를 받았을 때, 나는 firefox와 brave 모두에게 메시지를 전달해주는 거다.

//     // function handleConnection(socket){
//     //     console.log(socket);
//     // }
//     // wss.on("connection", handleConnection);

//     //만약 익명함수를 쓰고 싶지 않다면, 따로 빼서 onSocketClose function을 만들면 된다.
//     //function onSocketMessage는 message를 받을 것이다.
//     // function onSocketClose(){
//     //     console.log("Disconnected from Browser ❌");
//     // }

//     // function onSocketMessage(message){
//     //     console.log(message.toString('UTF8'));
//     // }

// wss.on("connection", (socket) => {
//     sockets.push(socket);
//         //socket이 연결될 때 //누군가 우리 서버에 연결하면, 그 connection을 이 socket에 넣을 거다.
//         //firefox와 brave가 연결될 때는 각각 array에 넣어 줄거다. //그럼 socket 2개가 생기는 것.
//     socket["nickname"] = "Anon";
//         //각 socket에 anon이라는 nickname을 정해줬다. //닉네임이 없는 경우다. 익명이라는 닉네임이니까.
//         //익명이기 때문에 brave와 firefox에서 모두 실행되었다. 
//     console.log("Connected to Browser ✔");
//         //브라우저가 연결되면, 무언가를 console.log하고

//     socket.on("close", () => {
//         console.log("Disconnected from Browser ❌");
//     });
//         //브라우저가 꺼졌을 때를 위한 listener를 등록했다. close를 listen 해준다.
//         //() => {console.log("");}는 이름없는 function이다.(익명함수)

//     socket.on("message", (msg) => {
//         const message = JSON.parse(msg.toString('UTF8'));
//             //브라우저에서 보낸 메시지가 여기로 도착한다. 그 메시지를 처리하고, type을 확인한다.
//             //JSON.stringity는 JavaScript object를 string으로 바꿔준다. 그리고 JSON.parse는 string을 JavaScript object로 바꿔준다.
//         switch (message.type){
//             case "new_message":
//             //socket이 new_message type 메시지를 보내면 //parsed.type이 new_message와 같다면, 아래 코드를 실행시킨다.
//                 sockets.forEach((aSocket) => aSocket.send(`${socket.nickname}: ${message.payload}`));
//                     //다른 모두에게 그 익명의 socket이 보낸 메시지를 전달할 것이다.
//                     //메시지가 socket에서 전송되고 메시지의 type이 new_message이면 nickname property를 socket object에 저장하고 있다.
//             case "nickname":
//                     //이 payload 즉 nickname을 socket 안에 넣어줘야 한다. socket이 누군지 알고싶으니까.
//                 socket["nickname"] = message.payload;
//                     //여기서 우리가 새롭게 알게된 property는 바로 socket 안에 정보를 저장할 수 있다는 사실이다. 그냥 데이터를 주면된다. 넣고 싶은 걸 넣어주면 된다.
//                     //socket에 새로운 item을 추가하자. socket은 기본적으로 객체니까.
//                 console.log(message.payload);
//                     //내가 nickname type message를 받으면, 받은 nickname을 socket에 넣어준다.
//         }
//                     //if else를 반복하는 것 대신, 테스트하고 싶은 것에 switch를 써주면 된다.
//     });
// });
                    // if(parsed.type === "new_message"){
                    // sockets.forEach((aSocket) => aSocket.send(parsed.payload));
                    // } else if(parsed.type === "nickname"){
                    //     console.log(parsed.payload);
                    // }

// const handleListen = () => console.log(`Listening on http://localhost:3000`);
//     //express는 http를 다루지만, 이젠 ws를 다룰거다. 여기에 2개를 합칠거다.
//     //express로 같은 서버에 ws 기능을 설치할 거다.
// server.listen(3000, handleListen);
//     //이제 할 것은, server.listen 할 수 있다. port는 아무거나.  
//     //이제 handListen을 사용할 수 있다.
