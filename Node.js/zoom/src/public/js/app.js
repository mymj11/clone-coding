const socket = io();

const myFace = document.getElementById("myFace");
//stream은 비디오와 오디오가 결합된 것.
const muteBtn = document.getElementById("mute");
const cameraBtn = document.getElementById("camera");
const cameraSelect = document.getElementById("cameras");
//기본적으로 camerasSelect를 가져와서 맣은 option들을 만들어주기만 하면 된다.

let myStream;
//myStream을 생성해준다.
let muted = false;
//default는 false가 될 거다. 왜냐하면 처음에는 소리가 나는 상태로 시작할 거기 때문에
let cameraOff = false;

async function getCameras() {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const cameras = devices.filter((device) => device.kind === "videoinput");
      //videoinput이라는 kind를 가진 device만을 원한다.
      const currentCamera = myStream.getVideoTracks()[0];
      cameras.forEach((camera) => {
        const option = document.createElement("option");
        //새로운 option이 생성.
        option.value = camera.deviceId;
        option.innerText = camera.label;
        //그리고 이 option을 camerasSelect안에 넣어주자.
        if (currentCamera.label === camera.label){
            option.selected = true;
        }
        camerasSelect.appendChild(option);
      });
    } catch (e) {
      console.log(e);
    }
  }

  //카메라를 얻었고, 이제 각 카메라에 대한 option 만들고
  //html에는 두 개의 option이 label과 함께 있다.
  //우린 label보다 Id가 중요하다. 이 Id를 가져와서 비디오로 강제로 바꾸게 할 거다.(option value = "")
  //기본적으로 stream에 이 Id를 가진 장치를 사용하도록 말할 것이다. 이게 Id를 value에 저장해야 했던 이유다.
  //필요한 것은 장치의 Id를 가지는 것.
  //근데 난 콘솔도 안 뜨고...option이 안 보인다....ㅜㅜ
  
  //유저가 이 select를 변경했을 때 현재 선택된 Id를 가져오고 stream에서 강제로 변경할 것이다. 

async function getMedia(deviceId) {
    const initialConstrains = {
      audio: true,
      video: { facingMode: "user" },
    };
    const cameraConstraints = {
      audio: true,
      video: { deviceId: { exact: deviceId } },
    };

//async function getMedia(){
    try{
        // myStream = await navigator.mediaDevices.getUserMedia({
        //     audio: true,
        //     video: true,
        //     audio: true,
        // });
        myStream = await navigator.mediaDevices.getUserMedia(
            deviceId ? cameraConstraints : initialConstrains
          );
        myFace.srcObject = myStream;
        //stream을 myFace 안에 넣어줘야 한다. //내 캠 화면이 뜬다.
        //await getCameras();
        if (!deviceId) {
            await getCameras();
          }
        } catch(e) {
            console.log(e);
        }
    }
//getMedia라는 function을 만들자.

getMedia();

function handleMuteClick(){
    myStream
        .getAudioTracks()
        .forEach((track) => (track.enabled = !track.enabled));
        //track.enabled를 지금과 정반대로 만들어주자.
        //track.enabled에 새로운 value를 설정해주자.
        //새로운 value를 설정하고 여기에서는 현재 value를 얻고 그 반대를 반환해준다.
        //track은 enabled되었다. 이제 track.enabled은 true의 반대가 될거다.
        //현재 track.enabled이 false라면 새로운 상태는 false의 반대가 된다. 그건 바로 true.
    if(!muted){
        muteBtn.innerText = "Unmute";
        muted = true;
        //음소거가 되지 않았기 때문에 클릭을 하면 음소거 해줄거다.
        //음소거되지 않은 상태에서 버튼을 누르면 음소거가 된다.
    } else{
        muteBtn.innerText = "Mute";
        muted = false;
        //다시 Mute로 돌아가기.
    }
}
//음소거 여부를 추적할 수 있는 variable이 필요하고
function handleCameraClick(){
    myStream
        .getVideoTracks()
        .forEach((track) => (track.enabled = !track.enabled));
        //버튼을 누르니 카메라 화면이 disabled가 된다. 검은 화면으로 바뀐다.
    //console.log(myStream.getAudioTracks());
    if(cameraOff){
        cameraBtn.innerText = "Turn Camera Off";
        cameraOff = false;
        //만약 카메라가 꺼져있다면 버튼을 클릭할 때 카메라를 켜게 된다.
        //텍스트가 Turn Camera Off가 되어야 한다.
    } else {
        cameraBtn.innerText = "Turn Camera On";
        cameraOff = true;
    }
}
//카메락 켜져 있거나 꺼져 있는지 추적할 variable도 필요하다.

async function handleCameraChange(){
    await getMedia(camerasSelect.value);
}

muteBtn.addEventListener("click", handleMuteClick);
cameraBtn.addEventListener("click", handleCameraClick);
camerasSelect.addEventListener("input", handleCameraChange);











































































//chat(socket.io)

// const socket = io();
//     //io는 자동적으로 back-end socket.io와 연결해주는 function
//     //io function은 알아서 socket.io를 실행하고 있는 서버를 찾을 거다.

// const welcome = document.getElementById("welcome");
// const form = welcome.querySelector("form");
//     //home.pug의 welcome div에서 form을 가져오자.
// const room = document.getElementById("room");

// room.hidden = true;
//     //들어가기 전에 채팅방이 숨겨진다.

// let roomName;

//     //메시지를 추가해주는 function
//     //message를 받을 거고
// function addMessage(message){
//     const ul = room.querySelector("ul");
//     const li = document.createElement("li");
//         //li를 만들어주자.
//     li.innerText = message;
//         //누가 입장했는지는 모르지만 누군가 입장했다는 것을 알 수 있다.
//     ul.appendChild(li);
// }

// function handleMessageSubmit(event){
//     event.preventDefault();
//     const input = room.querySelector("#msg input");
//         //handleMessageSubmit에서 #msg form 안에 있는 input을 찾아주자. #msg form을 가져오자.
//         //input에서 value를 받고 event와 input.value를 보내준다.
//     const value = input.value;
//     socket.emit("new_message", input.value, roomName, () => {
//         addMessage(`You: ${value}`);
//             //그리고 input의 value를 사용하는 function을 생성했다.
//             //대화창에 메시지가 보이도록 하기위해서 백엔드에서 message를 받아오자.
//             //백엔드에서 프엔의 이 코드를 실행시킨다.
//     });
//         //이 함수가 실행됐을 때 input.value는 이미 없어진 거다.
//         //이걸 실행한 다음 input.value를 비워줬다.
//     input.value="";
//         //메시지를 보내면 input창은 비워지게 된다.
// }
//         //백엔드로 message를 보내고 event를 발생시키고 있다. 
//         //백엔드로 "new_message" event를 보냈다. 첫 번째 argument인 input.value와 함께.
//         //그리고 마지막 argument는 백엔드에서 시작시킬 수 있는 function을 넣었다.
//         //addMessage function을 호출하는 function을 만드는 것. //message가 전송된 뒤에 호출 될 function을 만들 수 있다.

// function handleNicknameSubmit(event){
//     event.preventDefault();
//     const input = room.querySelector("#name input");
//         //querySelector은 첫 번째에 있는 것을 가져온다. 즉 querySelector는 항상 이 input을 가져올 것이다.(home.pug를 보면 input이 첫 번째)
//         //nickname에 있는 input도 #name form에서 가져올거다.
//         //function 안에서는 각 form의 id에 기반해 input을 가져온다.
//     socket.emit("nickname", input.value);
//         //input.value를 가지고 백엔드로 보내고 백엔드에 handler를 만들어주자.
// }
//         //여기서 input에 접근할 수 없다.

// //home.pug에 2개의 form이 있기 때문에 addEventListener을 추가하는 방식을 조금 바꾸자.
// function showRoom(){
//    welcome.hidden = true;
//    room.hidden = false;
//    const h3 = room.querySelector("h3");
//    h3.innerText = `Room ${roomName}`;
//    const msgform = room.querySelector("#msg");
//     //msg form에 addEventListener을 추가하자.
//     //#msg를 통해 msgForm과 #name을 통해 nameForm을 따로 받아서 addEventListener을 추가해주자.
//    const nameform = room.querySelector("#name");
//     //name form을 찾아주자.
//    msgform.addEventListener("submit", handleMessageSubmit);
//    nameform.addEventListener("submit", handleNicknameSubmit);
//     //submit이 되면 handleNicknameSubmit를 불러줄 것이다.
// }
//     //안에서는 form#welcome을 가지고 와야한다.

//     //home.pug //메시지를 보내는 것은 방 안에 있는 form을 찾아서 
//     //addEventListener를 추가하고 new_message event를 보내면 된다.
//     //welcome을 숨기고 room을 보여준 showRoom에서 form을 찾을 거다.
//     //이제 form에다가 handleMessageSubmit을 추가하자. //생성하자.

//     // function backendDone(msg){
//     //     console.log(`The backend says: `, msg);
//     // }
//     //백엔에서 이 function에 argument를 보낼 수 있다.
//     //백엔에서 이 function을 호출할 때 "hello from the backend"를 같이 보내보자.

//     // function backendDone(){
//     //     console.log("backend done");
//     // }
//     //프엔에서 실행된 코드는 백엔드가 시킨거다. //백엔드에서 프엔의 이 코드를 실행시켰다.
//     //vs 터미널에는 input창에 입력한 방이름이 뜨고 콘솔창에는 backend done이 뜬다.
//     //백엔에서 실행시키는 코드를 프엔에서 만들 수 있다.

// function handleRoomSubmit(event){
//     event.preventDefault();
//     const input = form.querySelector("input");
//     socket.emit("enter_room", input.value, showRoom);
//     roomName = input.value;
//         //roomName은 처음에는 비어있다.
//     input.value = "";
//         //input.value는 방 이름.
// }
//     //form도 받고 handleMessageSubmit도 하고 preventDefault도 했다.
//     //"new_message" event를 보내고 있다. 이건 백엔드로 갈거다.
//     //첫 번째 argument로 input의 value를 보내고 있다.(server.js에서 room이다.)
//     //두 번째 argument는 방 제목이다. 어디로 message를 보내는지 알아야 하니까.
//     //그리고 function을 보내는데 이 function은 모든게 끝나면 호출될 것이다.

// form.addEventListener("submit", handleRoomSubmit);

// socket.on("welcome", (user, newCount) => {
//     const h3 = room.querySelector("h3");
//     h3.innerText = `Room ${roomName}(${newCount})`;
//     addMessage(`${user} arrived!`);
// });
//     //welcome event가 발생하면 addMessage() function을 호출한다.
//     //welcome은 접속한 유저가 누구인지 알려주게 만들자. () 안에 user 입력.

// socket.on("bye", (left, newCount) => {
//     const h3 = room.querySelector("h3");
//     h3.innerText = `Room ${roomName}(${newCount})`;
//         //title을 새로고침해주는 function을 만들어 주자.
//     addMessage(`${left} left ㅠㅠ`);
// });
//     //어떤 유저가 나갔는지 알려주자.
//     //welcome과 bye를 할 때 newCount를 받을 것이다.

// socket.on("new_message", addMessage);
//     //socket.on("new_message", (msg) => {addMessage(msg)});
//     //argument와 함께 function을 호출하자. 그 argument는 message다.
//     //"new_message" event를 보내고 있다.
//     //brave 브라우저가 "new_message" event를 보내고 있다고 해보자.(function handleRoomSubmit(event){})
//     //그건 서버로 향할거다.(socket.on("new_message"))
//     //그리고 서버는 또 다른 "new_message" event를 보낸다.
//     //그러면 firefox 브라우저에 그 메시지가 나타난다.
//     //상대가 보낸 메시지가 내 브라우저에도 뜨게된다.

// socket.on("room_change", (rooms) => {
//     const roomList = welcome.querySelector("ul");
//     roomList.innerHTML = "";
//         //항상 roomList 비워주기. 방 목록을 비워줘서 항상 새로운 list가 되도록 하자.
//     if(rooms.length === 0){
//         return;
//     }
//         //rooms가 없는 상태로 오면, 즉 어플리케이션에 room이 하나도 없을 때 모든 것을 비워줄 것이다.
//     rooms.forEach((room) => {
//         const li = document.createElement("li");
//             //각각의 room에 li element를 만들어주고 
//         li.innerText = room;
//         roomList.append(li);
//             //새로운 li를 roomList에 append해주면 
//     });
// });
//방에 들어가기 전 기다릴 때 열려있는 모든 방의 list를 볼 수 있다. 지금은 비어있다.
//welcome의 ul을 바아서 roomList로 만들어주자.
//socket.on("room_change", (msg) => console.log(msg));
//새로운 방이 생겼다고 알림을 받을 수 있다.

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





//html
//home.pug
// doctype html
// html(lang="en")
//     head
//         meta(charset="UTF-8")
//         meta(http-equiv="X-UA-Compatible", content="IE=edge")
//         meta(name="viewport", content="width=device-width, initial-scale=1.0")
//         title Noom
//         link(rel="stylesheet", href="https://unpkg.com/mvp.css@1.12/mvp.css")
//     body
//         header
//             h1 Noom
//         main
//             div#welcome
//                 form
//                     input(placeholder="room name", required, type="Text")
//                     button Enter Room
//                 h4 Open Rooms:
//                 ul
//             div#room
//                 h3 
//                 ul
//                 form#name
//                     input(placeholder="nickname", required, type="Text")
//                     button Save
//                 form#msg
//                     input(placeholder="message", required, type="Text")
//                     button Send
//         script(src="/socket.io/socket.io.js")
//         script(src="/public/js/app.js")
