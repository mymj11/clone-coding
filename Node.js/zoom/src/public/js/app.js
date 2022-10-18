//브라우저에서는, 여기 이 백엔에 연결했고?
//프엔에서 백엔으로 연결을 만들어주고

const socket = new WebSocket(`ws://${window.location.host}`);
//새로고침할 때 이게 작동한다. 그러면 모든 addEventListener가 설정이 될 것이다.
//이제 서버로 접속할 수 있고, 폰으로도 가능하다.
//WebSocket은 브라우저와 서버 사이의 연결이다.
//프엔도 socket을 가지고 있다.
//여기 프엔에서 백엔으로 메시지를 보낼 수 있다. 그리고 백엔으로부터 메시지를 받을 수 있다.
//app.js의 socket은 서버로의 연결을 뜻한다.

//프엔에서도 socket을 만들었다.
//그리고 3개의 event에 대해 listen하고 있다.
//하나는 open이고, connection이 open되면 Connected to Server ✔를 볼 수 있다.
//또 하나는 메시지를 받을 때마다 내용을 출력하는 message다.
//나머지 하나는 close다.

//익명함수를 쓰지 싫다면,
// function handleOpen(){
//     console.log("Connected to Server ✔");
// }
// socket.addEventListener("open", handleOpen);

socket.addEventListener("open", () => {
    console.log("Connected to Server ✔");
});
//connection이 open일 때 사용하는 listener를 등록했고
//server.js에서 메시지를 보냈으니 app.js에서 메시지를 받아야 한다.
//일단 open이라는 event를 써보자.
//socket이 open이 되었다면, 서버에 연결되었다고 로그를 출력하자.
//추가한 체크 이모지는 socket이 connection을 open했을 때 발생할 것이다.
//서버랑 연결이 되면 방금 받은 메시지가 나타난다. 이게 바로 MessageEvent다.
//서버와 연결되었을 때 발생.

socket.addEventListener("message", (message) => {
    //console.log("Just got this: ", message.data, "from the server");
    console.log("New message: ", message.data);
});
//서버로부터? 메시지를 받았을 때 사용하는 listener를 등록했고
//2단계, 이번에는 socket에 message 이벤트를 추가해보자.
//이렇게 해서 메시지를 받아보자.
//그리고 '이 메시지를 서버로부터 받아왔습니다.'라고 출력해보자.
//개발자 도구 콘솔에서 Just got this: hello!!! from the server라는 메시지가 뜬다.
//연결이 alive 상태다. 터미널을 보면 server를 보면 브라우저와 연결돼었다는 것을 알 수 있다.
//서버로부터 메시지를 받을 때 발생.

//이제 서버를 꺼버리자.(kill) (터미널에서 ctrl + c)
//구글 크롬이나 brave 브라우저 중 아무거나 확인해보면 개발자 모드 콘솔을 보면
//Connected from Server ❌가 뜨는 것을 확인할 수 있다.
//이로써 살아있는 연결을 확인할 수 있다.

socket.addEventListener("close", () => {
    console.log("Disconnected from Server ❌");
});
//서버가 오프라인이 됐을 때 사용하는 listener도 등록했다.
//socket에 close 이벤트를 추가해보자.
//서버와 연결이 끊어졌다고 써보자.
//서버로부터 연결이 끊어졌을 때 발생.

setTimeout(() => {
    socket.send("hello from the browser!");
}, 10000);
//이제 프엔에서 백엔으로 메시지를 보내보자.
//즉시 실행되길 원하지 않기 때문에 timeout을 사용하자.
//메시지를 보내기까지 10초를 기다리자.
//socket.을 쓰고 send라는 메서드를 사용하자.
//이제 server.js에 socket.on()을 쓰고 message 이벤트를 등록할 거다.
//그럼 이제 브라우저에서 보낸 hello를, server.js로 가서 백엔에서 받을 수 있는지 확인해보자.
//터미널에서 브라우저가 연결되었다는 메시지가 뜨고 10초 후 hello from the browser!를 확인할 수 있다.


// btn.addEventListener("click", fn);
//click이라는 이벤트를 만들고 callback을 적으면 된다.
//click을 했을 때 작동할 function을 넣으면 된다.
//이게 websocket이랑 비슷하다.
//webSocket도 event가 있고, event가 발동될 때 사용할 function을 만들면 된다.
//click 대신 submit도 될 수 있다.

// function fn(event){

// }
//event가 안에 있는 것을 안다.
//JS는 event의 정보랑 같이 function을 호출할거다.
//어떤 일이 발생했는 지에 관한 정보도 말이다. 브라우저도 마찬가지다.

//form.addEventListener("submit", fn);
//프엔에서 form이 있다고 하자.
//submit event를 listen한다고 하자.
//JS는 function을 가지고 function을 호출하고, 정보를 줄 거다.

//이런 것처럼 webSocket에서도 비슷하다.
//webSocket은 listen할 특정한 event 명이 있다.
//ws에서도, 추가적인 정보를 받을 function이 존재한다.
//프엔에서 ws는 이렇게 생겼다.

//const socket = new WebSocket("http://localhost:3000");
//개발자 도구에서 콘솔을 켜보면 아직 작동하지 않는다. 그 이유는 다른 protocol이기 때문이다.
//http가 아니라 ws(WebSocket)거나 wss(WebSocket Secure)이어야 한다.

//const socket = new WebSocket("ws://localhost:3000");
//ws로 바꾸면 작동하겠지만 localhost:3000이라고 하기 싫으니까
//왜냐하면 모바일로 보면, 내 폰은 localhost:3000이 존재하지 않기 떄문이다.
//우리가 어디에 있는지에 대한 정보를 주자.
//같은 url이라는 것을 안다. 이건 그냥 다른 protocol일 뿐이다.
//브라우저 스스로가 이것을 가져오게 해야겠다.
//JS에서 옵션이 있다. location //가장 최고는 location.host
//개발자 도구 검사 콘솔에서 window.location.host를 치면 localhost:3000 즉, 우리가 어디에 있는지 알려준다.



//html 파일은 home.pug
//html 파일에서 form을 만들어 줄거다.
//아주 큰 버튼이 메시지를 전송하게 만들어보자.
//우리가 보게될 메시지 리스트도 만들 것이다.

