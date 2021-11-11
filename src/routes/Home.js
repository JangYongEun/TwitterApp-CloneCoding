import { dbService } from "fbase";
import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import Tweet from "components/Tweet";
import TweetFactory from "components/TweetFactory";

const Home = ({ userObj }) => {
    console.log(userObj);
    const [tweets, setTweets] = useState([]);


    useEffect(() => {
        dbService.collection("tweets")
        .orderBy("createdAt","desc")
        .onSnapshot((snapshot) => {
            const newArray = snapshot.docs.map((document) => ({
                id: document.id,
                ...document.data(),
            }));
            setTweets(newArray);
        });
    }, []);

    return (
        <div className="container">
       <TweetFactory userObj={userObj} />
       <div style={{marginTop : 30}}>
            {tweets.map((tweet) => (
               <Tweet 
               key={tweet.id} 
               tweetObj ={tweet}
               isOwner={tweet.creatorId === userObj.uid}
               />
            ))}
        </div>
        </div>
    )

}

export default Home;