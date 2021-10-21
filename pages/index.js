import Meta from "../components/Meta";
import { useState } from 'react';
import HomePageID from "../components/AddHomeId";
import ReactPlayer from 'react-player';

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <div id="home">
      <Meta />
      <HomePageID />
      <h1>Start Finding Local Coffee Shops Today!</h1>
      <ReactPlayer url="https://css-tricks-post-videos.s3.us-east-1.amazonaws.com/blurry-trees.mov" playing={ isPlaying } />
      {/* <div class="video">
        <video src="https://css-tricks-post-videos.s3.us-east-1.amazonaws.com/blurry-trees.mov" autoplay loop playsinline muted></video>
      </div> */}
    </div>
  );
}


