const messageList = document.querySelector("ul");
const nickForm = document.querySelector("#nick");
const messageForm = document.querySelector("#message");
//브라우저에서는, 여기 이 백엔에 연결했고?
//프엔에서 백엔으로 연결을 만들어주고
const socket = new WebSocket(`ws://${window.location.host}`);
//새로고침할 때 이게 작동한다. 그러면 모든 addEventListener가 설정이 될 것이다.
//이제 서버로 접속할 수 있고, 폰으로도 가능하다.
//WebSocket은 브라우저와 서버 사이의 연결이다.
//프엔도 socket을 가지고 있다.여기 프엔에서 백엔으로 메시지를 보낼 수 있다. 그리고 백엔으로부터 메시지를 받을 수 있다.
//app.js의 socket은 서버로의 연결을 뜻한다.

//프엔에서도 socket을 만들었다.
//그리고 3개의 event에 대해 listen하고 있다.
//하나는 open이고, connection이 open되면 Connected to Server ✔를 볼 수 있다.
//또 하나는 메시지를 받을 때마다 내용을 출력하는 message다.
//나머지 하나는 close다.

function makeMessage(type, payload){
    const msg = {type, payload};
    //object 만들기
    //메시지를 만들어주자.
    return JSON.stringify(msg);
    //이 object를 string으로 만들었다.
    //그리고 메시지를 string으로 바꿔서 return하자.
}
//이 함수는 type과 payload를 받을 거다.
//이제 메시지를 전송하고 싶으면, makeMessage function을 불러주면 된다.
//화면 input창에 닉네임을 입력하고 버튼을 누르면 
//백엔드가 메시지를 다시 전송해줘서 화면에 string 형태로 보여준다.

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
//일단 open이라는 event를 써보자. socket이 open이 되었다면, 서버에 연결되었다고 로그를 출력하자.
//추가한 체크 이모지는 socket이 connection을 open했을 때 발생할 것이다.
//서버랑 연결이 되면 방금 받은 메시지가 나타난다. 이게 바로 MessageEvent다.
//서버와 연결되었을 때 발생.


//예를 들어, 여기서 유저가 메시지를 전송하면
socket.addEventListener("message", (message) => {
    const li = document.createElement("li");
    //메시지를 스크린에 보여주는 function을 만들어 보자.
    //새로운 메시지를 받으면, 먼저 새로운 li를 만들 것이다.
    li.innerText = message.data;
    //다음에는 messsage.data를 li 안에 넣어 주자.
    messageList.append(li);
    //그 다음, li를 messageList 안에 넣어 주자.
    //이렇게 해주면 메시지를 화면에 보여줄 수 있다.
    //firefox에서 메시지를 보냈더니 firefox 화면과 brave 화면에 다 메시지가 보인다.
    //form을 만들어서 nickname을 정할 수 있도록 해주자.(html파일에서-home.pug)

    //console.log("Just got this: ", message.data, "from the server");
    console.log("New message: ", message.data);
});
//서버로부터? 메시지를 받았을 때 사용하는 listener를 등록했고
//2단계, 이번에는 socket에 message 이벤트를 추가해보자. 이렇게 해서 메시지를 받아보자.
//그리고 '이 메시지를 서버로부터 받아왔습니다.'라고 출력해보자.
//개발자 도구 콘솔에서 Just got this: hello!!! from the server라는 메시지가 뜬다.
//연결이 alive 상태다. 터미널을 보면 server를 보면 브라우저와 연결돼었다는 것을 알 수 있다.
//서버로부터 메시지를 받을 때 발생.

socket.addEventListener("close", () => {
    console.log("Disconnected from Server ❌");
});
//서버가 오프라인이 됐을 때 사용하는 listener도 등록했다.
//socket에 close 이벤트를 추가해보자.
//서버와 연결이 끊어졌다고 써보자.
//서버로부터 연결이 끊어졌을 때 발생.

//메시지를? 백엔드로 보낸다.
//chat으로 보내는 메시지.
function handleSubmit(event){
    event.preventDefault();
    const input = messageForm.querySelector("input");
    //여기서 input을 가지고 올 건데 const input을 쓰고 form에서 input을 찾아오자.
    socket.send(makeMessage("new_message", input.value));
    //type은 "new_message", payload는 input.value

    //socket.send(input.value);
    //2번째 단계는 input.value를 출력하는 대신 socket.send()를 사용하자.
    //프엔의 form에서 백엔으로 무언가를 보내고 있다.
    input.value = "";
    //input창에 메시지를 입력하고 send 버튼을 누르면 input창이 비워진다.
    //그리고 모든 메시지는 백엔으로 가고 있다. vs 터미널에서 확인할 수 있다.

    // console.log(input.value);
    //여기서는 메시지의 내용이 될 input.value를 출력하자.
}
//이게 event를 준다는 것을 알고 있다.
//input창에 hello를 하고 send 버튼을 눌렀더니(enter를 쳐도된다.) 콘솔창에 hello라고 뜬다.

//위와 아래의 코드를 보면
//서로 다른 form에서 전송되고 있다. 왜냐하면 form이 두 개니까.
//자바스크립트 object를 백엔드로 보내면 안 된다. 연결하고 싶은 서버가 자바스크립트 서버가 아닐 수 있으니까.
//그래서 string을 보내야 한다. 백엔드에 있는 모든 서버에 그 string을 가지고 뭘 할지 정하자.

//닉네임을 설정해줬을 때
//닉네임을 변경하고 싶을 때 백엔드로 보내고 있다.
function handleNickSubmit(event){
    event.preventDefault();
    const input = nickForm.querySelector("input");
    // socket.send(input.value);
    socket.send(makeMessage("nickname", input.value));
    //여기서 우리는 string을 보내주고 있다.
    //백엔드에서 이 string을 자바스크립트 object로 바꿔야 한다.({"type":"new_message","payload":"gg"})

    // socket.send({
    //     type:"nickname",
    //     payload:input.value,
    //     //input값을 넣자. 즉, user가 입력한 값.
    // });
    //내가 저장한 닉네임이 이 메시지로 전송된다.
    //sever.js에서 내가 받고 싶은 type과 playload 형태로 전송될 것이다.
    //지금 text를 전송하는 게 아니라, JSON object 전체를 전송하고 있다.
    //[object, object]
}
//input을 가져오는 코드와 데이터를 보내는 코드랑 같다.
//그럼 이제 백엔드로 메시지를 전송할 때마다 우리는 string을 전송해 줄거다.
//하지만 string을 보내기 전에, object를 만들고 그 object를 string으로 만들었다.


messageForm.addEventListener("submit", handleSubmit);
//event listener를 messageForm에 추가해 줄 거다.
nickForm.addEventListener("submit", handleNickSubmit);



// setTimeout(() => {
//     socket.send("hello from the browser!");
// }, 10000);
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


