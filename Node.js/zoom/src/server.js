import http from "http";
import WebSocket from "ws";
import express from "express";

const app = express();
//app 만들기

app.set('view engine', "pug");
//Pug로 view engine을 설정하고 
app.set("views", __dirname + "/views");
//Express에 template이 어디 있는지 지정해주고
//여기에 view engine을 Pug로 설정하고, views 디렉토리가 설정되고
//나중에 pug 페이지들을 렌더하기 위해 pug 설정을 해줘야 한다.
//views 디렉토리를 입력

app.use("/public", express.static(__dirname + "/public"));
//public url을 생성해서 유저에게 파일을 공유해주고
//유저가 /public으로 가게되면 __dirname + "/public" 폴더를 보여주게 할 거다.
//public 폴더를 유저에게 공개해준다.
//유저는 /public으로 이동할 시 public 폴더 내용을 볼 수 있다.
//localhost:3000/public/js/app.js하면 아직 컨텐츠는 없지만 "cannot get/" 메시지는 없다.
//그 말인즉, /public/js에 있는 app.js에 hello라고 입력하게 되면 hello라고 뜬다.


//우리가 사용할 유일한 route 만들기
//home으로 기면 request, response를 받고 res.render를 할 거다.
//우리가 만든 home을 렌더하는 것.
app.get("/", (req, res) => res.render("home"));
//home.pug를 render해주는 route handler를 만들었다.
//우리 홈페이지로 이동 시 사용될 템플릿을 렌더해주는 것이다.
//유저가 홈(/)으로 GET request를 보내면 template으로 반응한다.
//http가 어떻게 생겼냐면
//url을 선언하고, 유저가 url로 가면, req와 res를 받고, response를 보낸다.
app.get("/*", (req, res) => res.redirect("/"));
//유저가 어떤 페이지로 GET request를 보내도 redirect로 반응하도록 해뒀다.
//app.get을 입력하고 여기서 유저가 어떤 url로 이동하던지 홈으로 돌려보내면 된다. 
//왜냐하면 다른 url을 사용하지 않을 거니까. 다른 url은 전혀 사용하지 않고 홈만 사용할 것이다.
//주소창에 아무거나 입력해도(localhost:3000/dfdfdfd) 홈(localhost:3000)으로 돌려보내지게 된다.

const handleListen = () => console.log(`Listening on http://localhost:3000`);
//express는 http를 다루지만, 이젠 ws를 다룰거다. 여기에 2개를 합칠거다.
//express로 같은 서버에 ws 기능을 설치할 거다.

const server = http.createServer(app);
//express.js를 이용해서 http 서버를 만들었다. 
//여기서 서버를 만들건데, crateServer를 하려면 requestListener 경로가 있어야 한다.
//이게 우리의 application이 되는 것이다.
//express application으로부터 서버를 만들어보자.
//서버에 접근할 수 있게 되었기 때문에 준비는 다 끝났다.
//즉, 이제 이 서버에서 websocket을 만들 수 있다는 것이다.
//app.listen 하기 전인데, 아직 서버에 access(접근)하지 못했었는데 이제 서버에 접근할 수 있다.
//이제 ws를 import해보자.

const wss = new WebSocket.Server({server});
//이제 새로운 websocket 서버를 만들어 볼 거다.
//그리고 여기서 server를 전달해줄 수 있다.
//() 안에 server를 굳이 넣지 않아도 된다. 필수는 아니다.
//서버를 전달(pass)해줄 거다.
//http 서버 위에 webSocket 서버를 만들었다.

const sockets = [];
//array
//fake database를 만들어 줄 거다.
//누군가 우리 서버에 연결하면, 그 connection을 이 sockets에 넣을 거다.
//socket이 2개가 생긴다. //const sockets = [1,2];
//이렇게 하면 받은 메시지를 다른 모든 socket에 전달해 줄 수 있다.
//brave가 연결되면 brave의 socket을 가져와서 [brave] 여기에 넣어 줄거다.
//그리고 firefox가 연결되면 그 socket을 넣어 줄거다. //[brave, firefox]
//이제 아래 wss.on에서 brave에서 메시지를 받으면,
//받은 메시지를 sockets에 있는 모든 곳에 전달해 줄 수 있다.
//firefox에서 메시지를 받았을 때, 나는 firefox와 brave 모두에게 메시지를 전달해주는 거다.
//추후에 이 function은 바꿀 거다. 나 스스로한테 메시지를 보낼 필요가 없어서.


// function handleConnection(socket){
//     console.log(socket);
// }
// wss.on("connection", handleConnection);


//만약 익명함수를 쓰고 싶지 않다면, 따로 빼서 onSocketClose function을 만들면 된다.
//function onSocketMessage는 message를 받을 것이다.
//socket 코드는 짧아지고, 대신 분리된 function이 생긴다.
// function onSocketClose(){
//     console.log("Disconnected from Browser ❌");
// }

// function onSocketMessage(message){
//     console.log(message.toString('UTF8'));
// }

wss.on("connection", (socket) => {
    sockets.push(socket);
    //누군가 우리 서버에 연결하면, 그 connection을 이 socket에 넣을 거다.
    //firefox가 연결될 때, firefox를 위 array에 넣어준다는 것.
    //그리고 brave가 연결될 때는 brave를 array에 넣어 줄거다. //그럼 socket 2개가 생기는 것.
    console.log("Connected to Browser ✔");
    //브라우저가 연결되면, 무언가를 console.log하고

    //만약 익명함수를 쓰고 싶지 않다면, 따로 빼서 onSocketClose function을 만들면 된다.
    //socket.on("close", onSocketClose);

    socket.on("close", () => {
        console.log("Disconnected from Browser ❌");
    });
    //브라우저가 꺼졌을 때를 위한 listener를 등록했다.
    //() => {console.log("Disconnected from Browser ❌");}는 이름없는 function이다.(익명함수)
    //socket이 connection을 종료시키면 예를 들어, 브라우저의 탭을 닫거나, 컴퓨터가 잠자기 모드에 들어가면

    //socket.on("message", onSocketMessage);

    socket.on("message", (message) => {
        const parsed = JSON.parse(message.toString('UTF8'));
        //JSON.stringity는 JavaScript object를 string으로 바꿔준다.
        //그리고 JSON.parse는 string을 JavaScript object로 바꿔준다.
        //console.log(parsed, message.toString('UTF8'));
        //{ type: 'new_message', payload: 'aaaa' }는 자바스크립트 object
        //{"type":"new_message","payload":"aaaa"}는 string
        if(parsed.type === "new_message"){
        sockets.forEach((aSocket) => aSocket.send(parsed.payload));
        } else if(parsed.type === "nickname"){
            console.log(parsed.payload);
        }
        //새 메시지를 확인하고 모두에게 보낼 것이다. 나는 parsed.payload를 보낼 것이다.
        //메시지를 입력하면 화면에 메시지가 보인다. 하지만 닉네임은 입력해도 화면에 보이지 않는다.
        //이는 이제 서버에서 어떤 메시지를 받고 있는지 구분하고 있다는 것을 말한다.
        //이제 메시지는 type(메시지 종류)과 payload(메시지에 담겨있는 중요한 정보) 두 가지를 가지고 있다.

        //socket.send(message.toString('utf8')); //socket이 메시지를 보냈다.
        //기본적으로 user로부터 메시지를 받아서 다시 돌려주고 있다. 즉, 혼자 대화하는 것.
        //백엔으로부터 엄청 빠르게 메시지를 받은 것을 개발자 도구 콘솔창에서 확인할 수 있다.
        //방금 내가 적은 것을 받은 거다. hi라고 하면 새 메시지로 hi를 받는다.
        //메시지를 보낸 socket에 다시 메시지를 보내는 대신,
    });
});
//여기 aSocket은 socket과 다른 것. 
//각 브라우저를 aSocket으로 표시하고 메시지를 보낸다는 의미.
//이제 연결된 모든 socket들에 접근할 수 있다.
//메시지를 보낼 때, 모두에게 보내고 있다.
//내 메시지가 백엔에 전달이 되면, 백엔드는 다른 모두에게 전송을 해주게 된다.
//지금 2가지 type의 메시지가 있다.
//지금부터는 그냥 text를 보내는 대신 JSON을 보낼거다.
//여기 이 메시지는 string이다. 
//이 string을 자바스크립트 object로 만들어야 type을 확인할 수 있다.(JSON.parse() 사용)

server.listen(3000, handleListen);
//이제 할 것은, server.listen 할 수 있다. port는 아무거나.
//이제 handListen을 사용할 수 있다.

