import React from 'react-router-dom';
import {Timeline} from "react-twitter-widgets";
//구글에 react twiiter widegets을 검색하고 들어가서 npm 설치코드 복사해서 터미널에서 설치하고
//옆 화면에 코드를 복사해서 해당 div 안에 넣어주고 import해주기
//그럼 해당 화면에 트위터 화면이 가져와진다.
import { search } from './icons';
//icons.js에 아이콘 주소를 입력 export하고 불러오면 된다.
import './RightPane.scss';
//가져오기

const RightPane = () => {
    return(
        <div className="right-pane">
            <div className="container">
            <div className="Search">
                <span>{search}</span>
                {/* 아이콘을 화면에 보이게 하려면 위의 import icon을 활성화 시키려면
                 import에서 끝내는 것이 아니라 {해당 아이콘 이름}까지 입력해줘야 한다. */}
                <input type="text" placeholder="Search Twitter" className="stxt" />
                {/* <div className="search_autocomplelte">
                    <span>Try searching for people, topics, or keywords.</span>
                </div> */}
            </div>
            <div className="timeline">
                <Timeline
                    dataSource={{
                    sourceType: 'profile',
                    screenName: 'TwitterDev'
                    // screenName: 'reactjs'
                }}
                options={{
                height: '1200',//길게 늘어나서 밑에 트윗까지 보인다.
                }}
                />
            </div>
            </div>
        </div>
        //이 내용을 화면에서 보기 위해서는 app.js에서 import와 route를 해줘야 한다.
    );
};

export default RightPane;