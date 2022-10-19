const socket = io();
//io는 자동적으로 back-end socket.io와 연결해주는 function
//io function은 알아서 socket.io를 실행하고 있는 서버를 찾을 거다.

const welcome = document.getElementById("welcome");
const form = welcome.querySelector("form");
//home.pug의 welcome div에서 form을 가져오자.
const room = document.getElementById("room");

room.hidden = true;
//들어가기 전에 채팅방이 숨겨진다.

let roomName;

//메시지를 추가해주는 function
//message를 받을 거고
function addMessage(message){
    const ul = room.querySelector("ul")
    const li = document.createElement("li")
    //li를 만들어주자.
    li.innerText = message;
    //누가 입장했는지는 모르지만 누군가 입장했다는 것을 알 수 있다.
    ul.appendChild(li);
}

function showRoom(){
   welcome.hidden = true;
   room.hidden = false;
   const h3 = room.querySelector("h3");
   h3.innerText = `Room ${roomName}`;
}
//안에서는 form#welcome을 가지고 와야한다.

// function backendDone(msg){
//     console.log(`The backend says: `, msg);
// }
//백엔에서 이 function에 argument를 보낼 수 있다.
//백엔에서 이 function을 호출할 때 "hello from the backend"를 같이 보내보자.

// function backendDone(){
//     console.log("backend done");
// }
//프엔에서 실행된 코드는 백엔드가 시킨거다. //백엔드에서 프엔의 이 코드를 실행시켰다.
//vs 터미널에는 input창에 입력한 방이름이 뜨고 콘솔창에는 backend done이 뜬다.
//백엔에서 실행시키는 코드를 프엔에서 만들 수 있다.

function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector("input");
    socket.emit("enter_room", input.value, showRoom);
    roomName = input.value;
    //roomName은 처음에는 비어있다.
    input.value = ""
    //input.value는 방 이름.
}

form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", () => {
    addMessage("someone joined!");
});
//welcome event가 발생하면 addMessage() function을 호출한다. 

// socket.on("welcome", () => {
//     const ul = room.querySelector("ul")
//     const li = document.createElement("li")
//     li.innerText = "Someone joined!"
//     ul.appendChild(li);
// });
//여기에 계속 메시지를 추가해 주는 것보다 메시지를 추가해주는 함수를 만드는 것이 더 좋다.

    //방 이름을 가지고 입장을 하면 showRoom이라는 function을 실행시켜 줄 것이다.
    //function showRoom을 서버에 보내고 서버에서 실행도 시켜야 한다.
    //function backendDone을 백엔드로 보내고 있다.
    //백엔드는 두 개의 argument를 받는다.(input.value, backendDone)

    // socket.emit("enter_room", {payload: input.value}, () => {
    //     console.log("server is done!");
    //});
    //enter_room이라는 event를 emit해준다. 항상 메시지를 보낼 필요없다. (room 메시지 전송)
    //어떤 event든지 전송할 수 있다.
    //2번째 argument에는 보내고 싶은 payload가 들어간다.
    //emit을 하면 argument를 보낼 수 있다. argument는 object가 될 수 있다.
    //자바스크립트 object를 전송할 수 있다. websocket처럼 object를 string으로 바꿔줄 필요가 없다.
    //sockek.emit의 3번째 argument로 function을 넣어주자. 서버에서 호출하는 function이 들어간다.
    //백엔드에서 끝났다는 사실을 알리기 위해 function을 넣고 싶으면 그 function이 가장 마지막 argument가 되어야 한다.

//event를 받고 event.preventDefault()를 쓰고 Form 안에서 input을 가져오자.































// websocket code
// const messageList = document.querySelector("ul");
// const nickForm = document.querySelector("#nick");
// const messageForm = document.querySelector("#message");
//     //프엔에서 백엔으로 연결을 만들어주고
// const socket = new WebSocket(`ws://${window.location.host}`);
//     //WebSocket은 브라우저와 서버 사이의 연결이다.
//     //프엔도 socket을 가지고 있다.여기 프엔에서 백엔으로 메시지를 보낼 수 있다. 그리고 백엔으로부터 메시지를 받을 수 있다.
//     //app.js의 socket은 서버로의 연결을 뜻한다.

// function makeMessage(type, payload){
//     const msg = {type, payload};
//         //object 만들기 //메시지를 만들어주자.
//     return JSON.stringify(msg);
//         //이 object를 string으로 만들었다. //그리고 메시지를 string으로 바꿔서 return하자.
// }
//     //이 함수는 type과 payload를 받을 거다.
//     //이제 메시지를 전송하고 싶으면, makeMessage function을 불러주면 된다.

//     //익명함수를 쓰지 싫다면,
//     // function handleOpen(){
//     //     console.log("Connected to Server ✔");
//     // }
//     // socket.addEventListener("open", handleOpen);

// socket.addEventListener("open", () => {
//     console.log("Connected to Server ✔");
// });
//     //connection이 open일 때 사용하는 listener를 등록했고
//     //server.js에서 메시지를 보냈으니 app.js에서 메시지를 받아야 한다.
//     //서버랑 연결이 되면 방금 받은 메시지가 나타난다. 이게 바로 MessageEvent다.

//     //근데 만약 프엔에서 많은 것을 보내고 싶어서 object를 보내고 싶다면
//     //백엔에서 JSON.stringity를 이용해서 message를 만들어줘야 한다.
//     //그리고 프엔에서 JSON.parse를 해주는 새로운 함수를 만들어야 한다.

//     //예를 들어, 여기서 유저가 메시지를 전송하면
//     //socket이 메시지를 받을 때 실행되는 코드 //하지만 나를 제외한 모든 사람들에게만 메시지를 보내고 싶다.
// socket.addEventListener("message", (message) => {
//     const li = document.createElement("li");
//         //메시지를 스크린에 보여주는 function을 만들어 보자. //새로운 메시지를 받으면, 먼저 새로운 li를 만들 것이다.
//     li.innerText = message.data;
//         //다음에는 messsage.data를 li 안에 넣어 주자.
//     messageList.append(li);
//         //그 다음, li를 messageList 안에 넣어 주자. //이렇게 해주면 메시지를 화면에 보여줄 수 있다.
//         //form을 만들어서 nickname을 정할 수 있도록 해주자.(html파일에서-home.pug)

//         //console.log("Just got this: ", message.data, "from the server");
//     console.log("New message: ", message.data);
// });
//     //서버로부터? 메시지를 받았을 때 사용하는 listener를 등록했고
//     //2단계, 이번에는 socket에 message 이벤트를 추가해보자. 이렇게 해서 메시지를 받아보자.
//     //서버로부터 메시지를 받을 때 발생.

// socket.addEventListener("close", () => {
//     console.log("Disconnected from Server ❌");
// });
//     //서버가 오프라인이 됐을 때 사용하는 listener도 등록했다.
//     //socket에 close 이벤트를 추가해보자. //서버로부터 연결이 끊어졌을 때 발생.

//     //메시지를? 백엔드로 보낸다.
//     //chat으로 보내는 메시지.
// function handleSubmit(event){
//     event.preventDefault();
//     const input = messageForm.querySelector("input");
//         //여기서 input을 가지고 올 건데 const input을 쓰고 form에서 input을 찾아오자.
//     socket.send(makeMessage("new_message", input.value));
//         //type은 "new_message", payload는 input.value
//     const li = document.createElement("li");
//     li.innerText = `You: ${input.value}`;
//     messageList.append(li);
//     input.value = "";
//         //input창에 메시지를 입력하고 send 버튼을 누르면 input창이 비워진다.
//         //그리고 모든 메시지는 백엔으로 가고 있다. vs 터미널에서 확인할 수 있다.
//         //메시지를 보낸 후, 값을 비워주고 있다. 그리고 그 메시지는 서버로 간다.

//         // console.log(input.value);
//         //여기서는 메시지의 내용이 될 input.value를 출력하자.
// }
//     //이게 event를 준다는 것을 알고 있다.
//     //input창에 hello를 하고 send 버튼을 눌렀더니(enter를 쳐도된다.) 콘솔창에 hello라고 뜬다.

//     //위와 아래의 코드를 보면 서로 다른 form에서 전송되고 있다. 왜냐하면 form이 두 개니까.
//     //자바스크립트 objectr를 백엔드로 보내면 안 된다. string을 보내야 한다. 연결하고 싶은 서버가 자바스크립트 서버가 아닐 수 있으니까.

//     //닉네임을 설정해줬을 때 //닉네임을 변경하고 싶을 때 백엔드로 보내고 있다.
// function handleNickSubmit(event){
//     event.preventDefault();
//     const input = nickForm.querySelector("input");
//         // socket.send(input.value);
//     socket.send(makeMessage("nickname", input.value));
//         //여기서 우리는 string을 보내주고 있다.
//         //백엔드에서 이 string을 자바스크립트 object로 바꿔야 한다.({"type":"new_message","payload":"gg"})
//     input.value = "";
//         //닉네임값을 비워주자.

//         // socket.send({
//         //     type:"nickname",
//         //     payload:input.value,
//         //     //input값을 넣자. 즉, user가 입력한 값.
//         // });
//         //내가 저장한 닉네임이 이 메시지로 전송된다.
//         //sever.js에서 내가 받고 싶은 type과 playload 형태로 전송될 것이다.
//         //지금 text를 전송하는 게 아니라, JSON object 전체를 전송하고 있다.
//         //[object, object]
// }
//     //input을 가져오는 코드와 데이터를 보내는 코드랑 같다.
//     //그럼 이제 백엔드로 메시지를 전송할 때마다 우리는 string을 전송해 줄거다.
//     //하지만 string을 보내기 전에, object를 만들고 그 object를 string으로 만들었다.

// messageForm.addEventListener("submit", handleSubmit);
//     //event listener를 messageForm에 추가해 줄 거다.
// nickForm.addEventListener("submit", handleNickSubmit);



