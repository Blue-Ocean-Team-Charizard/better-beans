import Meta from "../components/Meta";
import { useState } from 'react';
import HomePageID from "../components/AddHomeId";
import ReactPlayer from 'react-player';

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <>
      <Meta />
      <HomePageID />
      <h1>Start Finding <br />Local Coffee Shops Today!</h1>
      <div className="over"></div>
      <ReactPlayer url="../production ID_4820352.mp4" playing="true" loop="true" />
      {/* <ReactPlayer url="../production ID_4820350.mp4" playing="true" loop="true" /> */}
      {/* <ReactPlayer url="../production ID_4820349.mp4" playing="true" loop="true" /> */}
      {/* <ReactPlayer url="../production ID_4815783.mp4" playing="true" loop="true" /> */}
      {/* <ReactPlayer url="../production ID_4498416.mp4" playing="true" loop="true" /> */}
      {/* <ReactPlayer url="../pexels-mike-m-9063027.mp4" playing="true" loop="true" /> */}
      {/* <ReactPlayer url="../pexels-anthony-shkraba-7174275.mp4" playing="true" loop="true" /> */}
      {/* <ReactPlayer url="../pexels-nicola-barts-7930831.mp4" playing="true" loop="true" /> */}
    </>
  );
}
