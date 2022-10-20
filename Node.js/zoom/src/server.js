












































































//chat(socket.io)

// import http from "http";
// import {Server} from "socket.io";
//     //import SocketIO from "socket.io";
//     // import WebSocket from "ws";
// import {instrument} from "@socket.io/admin-ui";
// import express from "express";
//     //import { emit } from "process";

// const app = express();
//     //app 만들기

// app.set('view engine', "pug");
//     //Pug로 view engine을 설정하고

// app.set("views", __dirname + "/views");
//     //Express에 template이 어디 있는지 지정해주고
//     //여기에 view engine을 Pug로 설정하고, views 디렉토리가 설정되고
//     //나중에 pug 페이지들을 렌더하기 위해 pug 설정을 해줘야 한다.

// app.use("/public", express.static(__dirname + "/public"));
//     //public url을 생성해서 유저에게 파일을 공유해주고
//     //유저가 /public으로 가게되면 () 폴더를 보여주게 할 거다. public 폴더를 유저에게 공개해준다.

//     //우리가 사용할 유일한 route 만들기
//     //home으로 가면 request, response를 받고 res.render를 할 거다. //우리가 만든 home을 렌더하는 것.
// app.get("/", (_, res) => res.render("home"));
//     //app.get("/", (req, res) => res.render("home"));
//     //home.pug를 render해주는 route handler를 만들었다. //우리 홈페이지로 이동 시 사용될 템플릿을 렌더해주는 것이다.
//     //유저가 홈(/)으로 GET request를 보내면 template으로 반응한다.
//     //http가 어떻게 생겼냐면 url을 선언하고, 유저가 url로 가면, req와 res를 받고, response를 보낸다.

// app.get("/*", (_, res) => res.redirect("/"));
//     //app.get("/", (req, res) => res.render("home"));
//     //유저가 어떤 페이지로 GET request를 보내도 redirect로 반응하도록 해뒀다.
//     //app.get을 입력하고 여기서 유저가 어떤 url로 이동하던지 홈으로 돌려보내면 된다. 
//     //왜냐하면 다른 url을 사용하지 않을 거니까. 다른 url은 전혀 사용하지 않고 홈만 사용할 것이다.
//     //주소창에 아무거나 입력해도(localhost:3000/dfdfdfd) 홈(localhost:3000)으로 돌려보내지게 된다.

// const httpServer = http.createServer(app);
//     //express.js를 이용해서 http 서버를 만들었다. 
//     //여기서 서버를 만들건데, crateServer를 하려면 requestListener 경로가 있어야 한다. 이게 우리의 application이 되는 것이다.
//     //express application으로부터 서버를 만들어보자. 이 서버에서 websocket을 만들 수 있다는 것이다.
//     //app.listen 하기 전인데, 아직 서버에 access(접근)하지 못했었는데 이제 서버에 접근할 수 있다.

//     //const wsServer = SocketIO(httpServer);
//     //const io = SocketIO(server);
//     //server를 보내주는 io 서버를 만들자.(wsServer라고해도 됨)

//     //socket.io server를 만들어주자.
//     //url에서 localhost:3000에 엑세스할 거니까.
//     //온라인 데모가 작동하는데 필요한 환경설정.
//     //연결이 안 된다ㅠㅠ
// const wsServer = new Server(httpServer, {
//     cors: {
//         origin: ["http://admin.socket.io"],
//         credentials: true,
//     },
// });

// instrument(wsServer, {
//     auth: false
// });

// function publicRooms(){
//     const {
//         sockets: {
//             adapter: {sids, rooms},
//         },
//     } = wsServer;
//         //socket안으로 들어가서 adapter를 갖고
//         //sids와 rooms를 wsServer안에서 가져오자. 
//     const publicRooms = [];
//         //public rooms list를 만들자.
//     rooms.forEach((_, key) => {
//         if(sids.get(key) === undefined){
//             publicRooms.push(key);
//         }
//             //이게 undefined와 같다면
//             //value는 신경쓰지 않는다. key가 중요하다.
//     });
//     return publicRooms;
// }
//     //public rooms을 주는 function을 생성해주자.
//     //wsServer.sockets.adapter로부터 sids와 rooms를 가져와서 브라우저에서 실행했던 거랑 같은 코드를 실행시켰다.

// function countRoom(roomName){
//     return wsServer.sockets.adapter.rooms.get(roomName)?.size;
//         //roomName을 가져오고 이게 set인 걸 아니까 size를 해주자.
//         //우리 방이 얼마나 큰지 계산하는 것.
// }
//         //welcome event를 보낼 때 countRoom의 결과값도 같이 보낸다.

// wsServer.on("connection", (socket) => {
//         //wsServer.socketsJoin("announcement");
//         //예를 들어, 모든 socket을 어떤 방에 들어가게끔 하고 싶다면 wsServer를 쓰고,
//         //socket이 연결되었을 때 모든 socket이 announcement 방에 입장하게 만드는 것.
//     socket["nickname"] = "Anon";
//     socket.onAny((event) => {
//             //console.log(wsServer.sockets.adapter);
//         console.log(`Socket Event: ${event}`);
//     });
//     socket.on("enter_room", (roomName, done) => {
//         socket.join(roomName);
//             //roomName으로 방에 참가하자.
//         done();
//             //프엔의 function showRoom을 서버에서 실행시키자.
//         socket.to(roomName).emit("welcome", socket.nickname, countRoom(roomName));
//             //이거는 메시지를 하나의 socket에만 보내고
//             //참가했다는 것을 나를 제외한 방에 있는 모든 사람들에게 알려주자.
//             //event를 emit해주자. event의 이름은 마음대로.
//             //welcome event를 나를 제외한 roomName에 있는 모든 사람들에게 emit한 것이다.
//             //socket.nickname을 추가함으로써 "welcome"은 우리에게 무언가를 줄거다.
//         wsServer.sockets.emit("room _change", publicRooms());
//             //모두에게 room이 변경됐다고 알려준다.
//             //이거는 메시지를 모든 socket에 보내준다.
//             //room_change라는 event를 보내자.
//             //연결된 모든 socket에게 내가 방에 입장할 때, 누군가가 방에 입장할 때 
//             //어플리케이션 안에 있는 모든 방에 공지를 내보내자.
//             //event의 payload는 publicRooms 함수의 결과로 해주자. 서버 안에 있는 모든 방의 array를 준다.
//     });

//         //새로운 방이 생기면 생겼다고 콘솔창에 ["방이름"] 뜬다.
//         //누군가 입장했습니다.

//     socket.on("disconnecting", () => {
//         socket.rooms.forEach((room) => 
//         socket.to(room).emit("bye", socket.nickname, countRoom(room)-1)
//         );
//     });
//         //클라이언트가 종료 메시지를 모두에게 보낸 다음에 
//         //중복되는 요소가 없는 array같은 set이어서 iterable(반복) 가능. 그래서 forEach를 쓸 수 있다.
//         //rooms에 forEach를 써서 종료 event를 보낼 거다. //여기서 참여하고 있는 방 이름과 id를 볼 수 있다.
//         //event인 disconnectiong은 disconnect와 다르다. 아직 서버가 끊긴 건 아니다. 
//         //서버 끊기 전 이 방 안에 있는 모두에게 마지막 인사 메시지를 보낼 수 있다 //"bye" event를 emit해주면 된다.
//         //퇴장하는 room을 알려주자. 방을 퇴장하기 직전이다. 그래서 아직 room 이름에 접근할 수 있다. 
//         //아직 방을 떠나지 않았기 때문에 우리도 포함되서 계산될거다. 그래서 -1을 해주자.
//     socket.on("disconnect", () => {
//         wsServer.sockets.emit("room_change", publicRooms());
//     });
//     socket.on("new_message", (msg, room, done) => {
//         socket.to(room).emit("new_message", `${socket.nickname}: ${msg}`);
//             //누군가 message를 보내면 이렇게 message를 보내는 대신 socket.nickname과 msg를 넣어줄 수 있다.
//         done();
//             //callback을 사용. 이건 기본적으로 백엔드에서 코드를 시작할 수 있게 해준다.
//             //하지만 이 코드는 프엔에서 실행된다.
//     });
//     socket.on("nickname", (nickname) => (socket["nickname"] = nickname));
//         //nickname을 받고 nickname을 socket에 더해줄거다.
//         //nickname event가 발생하면 nickname을 가져와서 socket에 저장하자.

//         //방을 나간 사람 이름을 보낼 수 있다.
// });
//         //message와 done function을 받을 거다.
//         //message를 보내고 있는 것은 맞지만 어디로 보내는지는 모른다.
//         //그래서 argument를 하나 더 보내줘야 한다. 여기에 있는 방 이름.
//         //payload는 내가 방금 받은 메시지가 될 것이다. //그게 완료되면 done function을 호출할 거다.
//         //room이 프엔에서 받은 argument 중 input의 value다.
//         //이 done() 코드는 백엔드에서 실행하지 않는다. done을 호출했을 때 프엔에서 코드를 실행시킬 거다.

// const handleListen = () => console.log(`Listening on http://localhost:3000`);
// httpServer.listen(3000, handleListen);

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
