import React from 'react';
import TweetBox from '../TweetBox/TweetBox';
import './Home.scss';

const Home = () => {
    return(
        <div className="home">
            <div className="header">
                <h2>Home</h2>
            </div>
            <TweetBox />
        </div>
    );
}

export default Home;