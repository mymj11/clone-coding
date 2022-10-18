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

//app.listen(3000, handleListen);
//app은 console.log("hello")를 실행하고 포트 3000을 listen해 줄 것이다.


//위의 코드는 express 방식이다. ws를 지원하지 않는다.
//그래서 ws를 하기 위해서는 function을 추가해야 한다.
//application을 시작하는 방법을 바꿔보자.
//모든 node.js에 내장되어 있는 http package를 사용해보자.
//우선 http를 import해야 한다. 따로 설치할 필요가 없는 게, node.js에 이미 설치되어 있다.
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

//connection이 생기면 여기 socket에서 누가 연결했는지 알 수 있다.
//자바스크립트는 방금 연결된 socket을 넣어줄 것이다. 여기서는 브라우저가 방금 연결되었다.
//이제 브라우저마다 연결된 socket에서 이벤트를 listen할 수 있다.
//wss는 서버 전체를 위한 것.
wss.on("connection", (socket) => {
    //console.log(socket);
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
        // console.log(message); //이렇게 하니까 Buffer가 나와서 
        console.log(message.toString('UTF8'));
    });
    //브라우저(프엔?)가 서버(백엔?)에 메시지를 보냈을 때를 위한 listener도 등록했다.
    //특정 socket에서 메시지를 기다리고 있다. socket.on();에서 socket이 특정 socket이다.
    //그래서 이 특정 socket에 event listener를 등록했다.
    //서버에 event listener를 등록하지 않았다.
    //왜냐하면 이 event listener은 백엔과 연결한 각 브라우저를 위한 거니까.
    //socket.on message는 특정 socket에서 메시지를 받았을 때 발생.
    socket.send("hello!!!");
    //서버가 브라우저에 메시지를 보내도록 만들었다.

    //여기서 event listener를 추가해줬다. 그리고 메시지를 브라우저로 전달했다.
    //그리고 브라우저(app.js)에서는 백엔과 connection을 열어주고 있다.
    //그리고 다시, app.js에 event listener을 등록했다.

    //새로운 브라우저가 내 서버에 들어오면, 같은 코드를 실행시켜 줄 것이다.
});

server.listen(3000, handleListen);
//이제 할 것은, server.listen 할 수 있다. port는 아무거나.
//이제 handListen을 사용할 수 있다.

//내 http 서버에 access하려는 것이다.
//그래서 http 서버 위에 웹소켓 서버를 만들 수 있도록 한 거다.

//프엔에서 백엔으로 연결을 만들어주고
//백엔은 connection을 기다리면
//프엔에서 evenListener을 등록하고 다음으로 넘어가면 된다.
//매번 새로운 브라우저가 백엔으로 연결할 때
//위의 wss.on(); 코드는 백엔과 연결된 각 브라우저에 대해 작동할 것이다.
//우리는 이로써 프엔과 백엔에서 메시지 주고받기를 했다.

//우리는 두 곳에서 이벤트를 listen하고 있다. 한 곳은 백엔이고, 다른 한 곳은 프엔이다.
//백엔(server.js)에서는 websocket server를 만들었다.
//그리고 지금은 connection이라는 이벤트를 listen하고 있다.
//connection event가 발생하면 반응을 해야한다. 물론 프엔이 연결하기 위해 필수로 해야하는 것은 아니다.
//wss.on();코드가 없어도 프엔과 백엔은 연결된다. connection이 생겼으니까. 우리가 아무 반응을 하지 않고 있을 뿐.
//그래서 우리는 event를 listen해줘야 한다.(wss.on();) 
//예를들어, 이건(wss.on();) 페이지에 있는 버튼과 같다. 사람들은 버튼을 클릭할 수 있지만
//이벤트를 listen하고 있지 않은 것이다. 여기서 우리는 connection event를 listen해주는 거다.
//connection이 생기면 여기 socket에서 누가 연결했는지 알 수 있다.
//자바스크립트는 방금 연결된 socket을 넣어줄 거다. 여기서는 브라우저가 방금 연결되었다.
//이제 브라우저마다 연결된 socket에서 이벤트를 listen할 수 있다.

//이제 server.js에 socket.on()을 쓰고 message 이벤트를 등록할 거다.
//메시지를 출력해보자.

//이제 할 것은, socket에서 event를 listen하는 것이다.
//여기에 client/브라우저로부터 연결 끊김이라고 출력해보자.
//즉시 메시지를 보냈고 백엔에서는 close라는 event를 listen하고 있다.
//close를 발생시키려면 서버를 disconnect하면 된다. 서버를 꺼버리는 것.
//탭을 닫으면 백엔(서버)에서 socket의 close란 event를 발생시킨다.
//페이지를 닫아버리면 터미널에서 Disconnected from Browser ❌ 메시지를 확인할 수 있다.
//양방향적인 것이다. 브라우저의 연결이 끊기면, 서버에 event를 발생시키고
//서버가 오프라인이 되면, 브라우저한테 알려준다.
//백엔에서 프엔으로 보낸 메시지를 받는 방법.

//connection이 생겼을 때 socket으로 즉시 hello라는 메시지를 보낸 것.
//connection 안에 같은 역할을 하는 익명 함수를 만들자. 
//그래야 socket이 지금 어떤 상태인지 알기 쉽다.(위의 코드를 더 보기 좋게 만들었다. event를 다룰 때도 이렇게 하는 것이 좋다.)
//connection이 생기면 socket을 받는다는 것을 알 수 있다.(연결을 해서 socket을 알 수 있고)
//connection이라는 event
//이 뜻은 누군가가 우리와 연결했다는 거다.
//이제 브라우저에 "Welcome to chat"이라는 메시지를 보내보자.
//socket에 있는 메서드를 사용해보자.(wss 서버에 있는 메서드가 아니고)
//이 메서드는 socket으로 직접적인 연결을 제공해준다. 여기서 데이터를 보내주면 된다.
//socket으로 data를 보냈다.
//connection이 생겼는데, console에서는 아무일이 없다.
//그 이유는 우리가 메시지를 보내긴 했지만, 프엔에서 아무것도 안 해줬기 때문이다.
//이제 우리가 해야할 것은 app.js에서 메시지 받기이다. 여기서 message는 바로 event다.
//여기서는 브라우저에 연결되었다고 로그를 출력하자.

//express로 할 일은 views를 설정해주고 render해주는 것.
//이제 페이지를 render하고 있고(localhost:3000하면 it works!가 뜬다.) 
//이제 home에 script를 추가해주면 된다.
//나머지는 websocket에서 실시간으로 일어날 것이다.

//여기서(Express) 우리가 한 일은
//Pug로 view engine을 설정하고
//Express에 template이 어디 있는지 지정해주고
//public url을 생성해서 유저에게 파일을 공유해주고
//home.pug를 render해주는 route handler를 만들었다.

//나머지는 다음 섹션에서 websocket으로 다룰 거고, 지금부턴 real-time(실시간)으로 할 것이다.

//예쁜 버튼을 만들기 위해 MVP CSS 사용하자. 구글에 MVP CSS검색해서 페이지들어가면 주소가 있다.
//MVP CSS는 프로젝트에 포함시킬 수 있는 하나의 CSS 파일이다.
//이걸 포함시키면 기본적인 HTML tag들을 다 예쁘게 바꿔줄 것이다.
//추가적인 CSS를 사용하지 않고도 우리 웹페이지도 만들 수 있다.
//CSS 링크를 home.pug의  header에 추가하게 되면 그 순간 바로 보다 예쁜 웹사이트를 갖게 된다.
//버튼이 아까보다 예쁘게 바뀐다.
//작업 중에 아무런 꾸밈없이 하는 것보다 뭔가 있는 게 나으니까.
//home.pug에 header를 h1위에 만들어 주면 Noom가 중앙 정렬된다.
//이 모든 게 MVP CSS를 이용했기 때문이다.

//NodeJS 설정은
//server.js와 home.pug로 완성했다.
//그리고 app.js에서 자바스크립트가 제대로 연결되었는지 확인해보자.
//app.js에 alert를 추가했더니 hi가 적힌 알림창이 뜬다.
//이 자바스크립트는 제대로 프론트엔드로 가고 있다는 것을 알 수 있다.

//express를 사용한 일반적인 NodeJS 설정
//package.json, script 생성, 그리고 babel
//babel-node를 실행시키면 babel-node는 바로 babel.config.json을 찾을테고
//거기서 코드에 적용돼야 하는 preset을 실행시킬 거다.
//다음 섹션에서 websocket에 대해 얘기해보고 우리의 첫번째 채팅 프로토타입을 만들 것이다.

//우리가 한 건,
//첫째로 개발 환경을 구축했다.
//Nodemon를 설정하기 위해 nodemon.json을 생성했다.
//Nodemon은 우리의 프로젝트를 살펴보고 변경 사항이 있을 시 서버를 재시작해주는 프로그램이다.
//서버를 재시작하는 대신에 babel-node를 실행하게 되는데
//Babel은 우리가 작성한 코드를 일반 NodeJS 코드로 컴파일 해주는데 그 작업을 src/server.js 파일에 해준다.
//server.js 파일에서는 express를 import하고, express 어플리케이션을 구성하고 
//여기에 view engine을 Pug로 설정하고, views 디렉토리가 설정되고
//public 파일들에 대해서도 똑같은 작업을 해주고
//public 파일들(public/js/app.js)은 프론트엔드에서 구동되는 코드고 아주 중요한 부분이다.
//왜냐하면 js코드들을 다루다 보면 프엔과 백엔이 헷갈릴 수 있다.
//그래서 이름을 app.js(프엔)랑 server.js(백엔)로 구분한 것이다.
//app.use(); 줄에서 public 폴더를 유저에게 공개해 준다.
//알다시피 유저는 쉽게 서버 내 모든 폴더들을 들여다 볼 수 없다.
//그래서 유저가 볼 수 있는 폴더를 따로 지정해줘야 한다.
//지금 같은 경우에는 유저는 /public으로 이동할 시 public 폴더 내용을 볼 수 있다.
//js 폴더 안에 app.js만 있는데 추후에 css 폴더가 추가될 수도 있지만 지금은 아니다.
//app.get(); 이 줄은 우리 홈페이지로 이동 시 사용될 템플릿을 렌더해주는 것이다.
//views 폴더에 있는 home.pug를 렌더하면 끝이다.
//MVP CSS 링크를 복사해서 사용한 것은 우리가 css 작업을 하기 전 페이지가 그나마 덜 못생겨 보이게 해주는 것.
//script(src="/public/js/app.js")에는 pulic, js, app.js를? import 해준다.
//만약 catchall url을 만들고 싶다면,
//app.get을 입력하고 여기서 유저가 어떤 url로 이동하던지 홈으로 돌려보내면 된다. 왜냐하면 다른 url을 사용하지 않을 거니까.

//유저한테만 보여지는 프론트엔드에 사용되는 app.js를 저장할 때마다 nodemon이 새로 시작된다.
//하지만 이걸 원하는 건 아니다.
//난 views나 서버를 수정할 때만 nodemon이 재시작되었으면 좋겠다.
//난 nodemon이 server.js 파일을 수정하거나
//여기에 있는 모든 자바스크립트 파일들이 수정될 때만 새로고침하면 좋겠다.
//하지만 내가 프론트엔드 자바스크립트를 수정할 때는 nodemon이 새로고침하지 않았으면 좋겠다.
//그렇게 하기 위해서는 nodemon으로 가서 폴더 하나를 무시하도록 할 거다.
//nodemon.json으로 가서 "ignore"을 입력해주고 src/public 폴더와 그 안에 있는 모든 것들을 무시하도록 할 거다.
//서버를 종료시키고 다시 실행시킨 다음(npm run dev), app.js에서 hello를 저장해보면
//저장을 하더라도 nodemon이 restarting(재시작)이 되고 있지 않는다.
//[nodemon] restarting due to changes...가 되지 않는다. starting만 된다?
//하지만 server.js를 저장하면 nodemon이 재시작이 된다. restarting, starting 모두 뜬다.
//아주 간단한 NodeJS 작업

//이렇게 하면 http 서버, webSocket 서버 둘 다 돌릴 수 있다.
//꼭 이렇게 안 해도 된다. http 서버를 원하지 않을 수도 있으니까. 그럴 때는 웹소켓 서버만을 만들면 된다.
//여기서 하고 있는 것은, 같은 서버에서 http, webSocket 둘 다 작동시키는 거다.
//localhost:3000은 http 그리고 ws도 또한 작동시킬 수 있다. 2개가 같은 port에 있길 원하기 떄문에 이렇게 하는 것이다.
//이렇게 하는 이유는, 우리의 서버를 만들고(보이게 노출시키고) 그 다음 http 서버 위에 ws 서버를 만들기 위함이다.
//그러므로 localhost는 동일한 포트에서 http, ws request 두 개를 다 처리할 수 있다.
//서버는 http, ws 2개의 protocol을 이해할 수 있게 되었다.
//2개의 protocol 다 같은 port를 공유하는 것이다.
//우리의 서버는 http protocol과 ws connection(연결)을 지원한다.
//항상 이렇게 만들 필요 없고, ws 서버만 만들어도 된다.
//http 서버가 필요한 이유는 views, static files, home, redirecton을 원하기 때문이다.
//그래서 ws 서버를 만든 것이다.

//app.js에서 코드 작성 후 이제 여기서 access할 수 있다.
//여기있는 socket이 프엔과 real-time으로 소통할 수 있다.
//app.js를 보면 프엔도 socket을 가지고 있다.
//서버에서도 마찬가지로 프엔으로 메시지를 보내고 받고를 할 수 있다.
//server.js의 socket은 연결된 브라우저를 말한다.

//백엔드에서 ws가 어떻게 생겼는지 알아보자.
//브라우저에서 event란 무엇일까?
//click, submit, Wi-Fi on/off 이런 거다.
//웹소켓에도 event가 있다.
//handleConnection이라는 function을 만들고 넣어준다.
//callback으로 socket을 받는다.
//function을 받는데 connection이 이루어지면 작동한다.
//socket은 연결된 어떤 사람인 거다. 연결된 브라우저와의 contact(연락)라인이다.
//socket을 이용하면 메시지를 주고 받기를 할 수 있다.
//이 socket을 어딘가에 저장(save)해야 한다.
//최소한 console.log라고 해야한다. 그래서 socket을 넣을 수 있다.
//on method에서는 event가 발동하는 것을 기다린다.
//on method는 백엔드에 연결된 사람의 정보를 제공해준다. 그게 여기 socket에서 오는 것.
//socket은 나(서버)와 브라우저 사이의 연결이다.
//event를 listen하고, 어딘가에 handler를 만들었을 때만 위와 같이 한다.
//webSocket을 이용해서 새로운 connection을 기다리는 것이다.
//아직 아무 일도 일어나지 않는다. 아무것도 연결되어 있지 않다.
//프엔(app.js) 변경이 필요하다. 프엔에 백엔이랑 연결해달라고 해야 한다.
//아직 webSocket 연결이 발생하지 않았다.
//이게 이뤄지면, console에서 socket을 볼 수 있게 된다.
//프엔에서 백엔으로 연결하는 방법은 다음과 같은 코드를 사용하는 것이다.(app.js에 작성)
//var aWebSocket = new WebSocket(url [, protocols]);
//const socket = new WebSocket("http://localhost:3000");

//section2
//real-time(실시간)
//websocket 덕분에 실시간 chat, notification 같은 real-time을 만들 수 있다.
//HTTP와 websocket은 protocol(프로토콜)이다.
//http는 모든 서버들이 작동하는 방식이다. 예를 들어, 유저가 request를 보내면 서버가 반응(response)을 할 것이다.
//유저가 홈으로 GET request를 보내면 template으로 반응한다.
//유저가 어떤 페이지로 GET request를 보내도 redirect로 반응하도록 해뒀다.
//http에서 기억해야 할 점은 stateless라는 것. 
//즉, 백엔드가 유저를 기억하지 못한다는 점. 유저와 백엔드 사이에 아무런 연결이 없다는 것이다.
//request와 response 과정 뒤에, 백엔드는 유저를 잊어버린다.
//response를 주면 끝난다. 그저 다음 request를 기다릴 뿐이다.
//서버로 메시지를 보내고 싶은데 이미 로그인이 되어있다면 cookie만 보내면 된다.
//서버는 유저가 누군지 잊어버린다. 예를 들어, profile-page를 보고 싶다면 누구인지 알려주는 cookie를 서버에게 보내야 한다.
//그럼 서버가 일치하는 profile로 response를 준다.
//서버가 유저가 누구인지 잊어버리는데, 이렇게 잊는 것을 stateless라고 한다.
//response 후에, 서버는 잊어버린다. 서버는 오직 request를 받을 때만 답장해준다.(response를 준다.)
//브라우저가 request를 보내면, 서버가 response를 준다.
//GET request를 보내든 POST request를 보내든 request, reponse 과정이다.
//여기서 중요한 건, 이건 real-time으로 일어나지 않는다는 것이다.
//첫째, 내가 request를 보내야 되고 둘째로는 서버가 내게 아무것도 못해주기 때문이다.
//서버가 나에게 "안녕, 잘 지내니?" 이렇게는 못한다는 것이다. 서버는 갑자기 불쑥 나에게 대화를 걸 수 없다.
//서버는 request를 기다려야 되고, 그런 다음 서버는 답장을 할 수 있다.
//서버는 내가 물어봐야 답할 수 있다.
//response 과정 후, 서버는 내가 누구인지 잊고 다음 request를 받을 준비를 한다.
//이게 http protocol이다. 모든 인터넷이 이 중심으로 구축되어 있다.

//websocket에 대해 알아보자. 마찬가지로 protocol이다.
//https://nomadcoders.co로 간다고 해보자. 이건 http다.
//웹소켓을 사용해서 연결하고 싶고, 서버가 지원한다면 wss(secure web socket)하면 된다.
//http와는 전혀 다른 protocol이다.
//웹소켓 연결(connection)이 일어날 땐 마치 악수처럼 작동한다.
//브라우저가 서버로 웹소켓 request를 보내면, 서버가 받거나 거절하거나 한다.
//이런 악수가 한 번 성립되면, 연결은 성립(establish)되는 것이다.
//연결은 연결이다. 브라우저와 서버가 손을 맞잡고 있는 것처럼, 터널 같은 것이다. 브라우저랑 서버가 서로 커뮤니케이션 하는 것이다.
//연결되었기 때문에 서버는 내가 누구인지 기억할 수 있다. 원한다면 서버가 유저에게 메시지를 보낼 수 있다.
//서버는 request를 기다리지 않아도 된다. 서버가 답장할 수 있다.
//서버는 "안녕, 잘 지내?"를 어떤 때나 보낼 수 있다. request, response 과정이 필요하지 않고, 그냥 발생하는 것이다.
//예를 들어, 서버는 유저에게 3개의 메시지를 보낸다. 그리고 유저는 다시 1개의 메시지를 보낸다. 그리고 서버는 다시 2개의 메시지를 보낸다. bi-direction(양방향의) 연결이기 때문이다.
//서버는 유저에게 메시지를 보낼 수 있고, 유저도 서버에게 메시지를 보낼 수 있다.
//이 모든 것들은 connection(연결) 중 일때만 발생한다. 말그대로 연.결. 그래서 서로에게 직접 접근할 수 있다.
//서버는 어떤 때나 유저에게 메시지를 보낼 수 있다. 유저도 마찬가지로 어떤 때나 서버로 메시지를 보낼 수 있다. 
//이것이 웹소켓이다.
//브라우저와 서버 사이에 bi-directional한 연결이 있어서 서로에게 바로 갈 수 있는 길이 있다.
//나와 와이파이 사이의 연결에 대해 생각해 보자. 한 번 연결되고 나면 끊임없이 계속 와이파이에 연결되어 있다.
//이것도 마찬가지다. 브라우저와 서버 간에는 실시간으로 계속 연결이 있는 것이다.
//양방향. 쌍방. 어떤 때나 유저는 백엔드에게 메시지를 보낼 수 있다. 백엔드도 유저에게 아무 때나 메시지를 보낼 수 있다.
//request하고 response받고 이렇게만 할 수 있는게 아닌 것이다.
//http를 떠올려보면, 서버는 유저에게 메시지를 보낼 수 없었다. request를 기다리고서야 response를 줄 수 있었다.
//이런 것들이 웹소켓에서는 일어나지 않는다. 웹소켓은 한 번 연결되면, 전화 통화하는 것 같은 거다.
//이게 자바스크립트 전용은 아니지만, 구현된 게 있어서 자바스크립트에서도 사용할 수 있다.
//브라우저에는 내장된 websocket API가 있다.
//서버와 연결하기 위해 브라우저에서 웹소켓을 써볼 것이다.
//웹소켓은 어떤 프로그래밍 언어에 국한되어 있지 않는다. 그저 프로토콜이다.
//예를 들어, GO 언어로 된 백엔드가 있으면, 웹소켓을 지원한다.
//웹소켓도 마찬가지로 브라우저와 백엔드 사이에서만 발생하지 않는다. 2개의 백엔드 사이에서도 작동한다. 백엔드와 백엔드 사이에서도 가능하다. 
//real-time으로 소통하는 2개의 서버 사이에서도 작동한다.
//웹소켓에서는 한 번 연결이 성립되면, 두 방향(양방향) 연결이 생긴다.
//메시지를 보내고 받고, 또 원하는 만큼 할 수도 있고, 순서도 상관없다. request-response 같은 게 필요없다.

//http도 마찬가지로 브라우저와 백엔드, 백엔드와 백엔드 다 가능하다.
//중요한 차이점은 http는 stateless라는 것이다. 
//백엔드는 나를 기억하지 못하고, 나에게 답해줄 수만 있다. 브라우저(클라이언트)는 request만 할 수 있다.

//node.js로 websocket 서버를 만들어 보자.
//ws라는 package의 도움을 받을 것이다.
//ws는 사용하기 편하고, 아주 빠르며, 클라이언트와 서버 사이의 웹소켓 실행(implementation)에서 검증된 것이다.
//프로토콜(protocol)은 어떤 사람들이 어딘가에 있는 방에서 만나고 어떻게 일들이 진행될지를 결정한다. 어떻게 모든 것이 돌아가야 할지에 대한 규칙을 만든다.
//그 다음, 프로그래머는 이 규칙을 가지고 이 규칙을 따르는 코드를 만들어서 실행한다.
//규칙이 가장 먼저 정해져야 한다. 사람들이 방에 모여, 표준이 되는 규칙을, protocol을 만든다.
//그 다음 개발자들이 이 규칙을 코드에 녹여내는 것이다.
//그래서 node.js를 위한 웹소켓 implementation이라고 하는 것이다.
//GO lang에서도 C#, JAVA에서도  Websocket implementation을 찾을 수 있는데
//이 말은, 이건 그냥 어떤 규칙을 따르는 코드라는 뜻이다.
//웹 소켓 프로토콜을 실행하는 패키지인 거다. Node.js에서는 웹 소켓의 핵심인 패키지이다. 
//ws는 implementation일 뿐이다. 웹 소켓의 핵심 부분이다.
//예를 들어, 누군가가 채팅방에 들어올 수도 있고 나갈 수도 있다. 그리고 특정한 채팅방에 메시지를 보낼 거다.
//이런 채팅방은 ws에 포함되어 있지 않다. 채팅방은 웹 소켓 프로토콜의 일부분이 아니기 때문이다.
//채팅방은 그저 feature일 뿐이다. ws만을 가지고 채팅방을 만들고 싶으면 특유의 logic을 우리가 구현해야 한다.
//ws를 사용한 framework가 있다. framework에는 이미 채팅방 기능이 있다.
//그래서 아무것도 만들 필요가 없고 ws는 웹 소켓의 core(중점적 핵심적인)다.
//ws를 이용해서 public 채팅을 만들어 보자. ws는 완전 기초가 되는 밑바탕이다.

//npm i ws를 해주고 서버를 만들어 보자.
//ws 서버를 만들지는 않을 거다. 대신 express 서버를 놓고 함께 합칠 거다.
//왜냐하면 서로 다른 protocol이기 때문이다. 지금 express는 http를 다룬다.
//이제 ws(websocket)을 다룰거다. 다른 protocol이다.
//expresss는 http를 다루지만, 이젠 ws를 다루자.

//위의 코드는 express 방식이다. ws를 지원하지 않는다.
//그래서 ws를 하기 위해서는 function을 추가해야 한다.
//application을 시작하는 방법을 바꿔보자.
//모든 node.js에 내장되어 있는 http package를 사용해보자.

//http 서버 위에 ws 서버를 만들었다.
//이제 ws 연결로 브라우저와 메시지 주고 받기를 해보자.
//첫 번째 connection(연결)을 만들거다. ws를 사용해서 백엔드와 프엔 사이에서 말이다.
//프엔에서 브라우저가 이미 웹소켓 클라이언트에 대한 implementation을 갖고 있단 것을 알아둬야 한다.
//웹소켓을 이용해 백엔드와 연결하고 싶다면 JS가 해줄 것이다.
//나와 백엔드를 연결해주는 웹소켓이 준비되어 있다. 아무것도 설치할 필요없이 브라우저에서 지원된다.

//개발자 모드 콘솔 서버에서 브라우저로 보낸 메시지를 확인할 수 있고
//vs의 터미널에서는 브라우저에서 서버로 보낸 메시지를 확인할 수 있다.
