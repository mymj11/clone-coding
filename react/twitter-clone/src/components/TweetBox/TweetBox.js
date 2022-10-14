import React from 'react';
import "./TweetBox.scss";

function TweetBox() {
    return (
        <div className="tweetBox">
            <form>
                <div className="tweetBox_input">
                    <img src="./img/blank-profile-picture.webp" />
                        <input
                            type = "text"
                            placeholder="what's happening" 
                        />
                </div>
                <div className="tweetBox_imageinput">
                    <input 
                        placeholder="optional: Enter image URL"
                    />
                </div>
                <button
                    className="tweetbutton">Tweet</button>
            </form>
        </div>
    );
}

export default TweetBox;

//react에서 뭘 프로그램 설치하면 rcfce만 입력하면 틀이 자동입력된다.
