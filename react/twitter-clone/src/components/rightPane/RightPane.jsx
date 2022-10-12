import React from 'react-router-dom';
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
            </div>
            <div>Timeline</div>
            </div>
        </div>
        //이 내용을 화면에서 보기 위해서는 app.js에서 import와 route를 해줘야 한다.
    );
};

export default RightPane;