import ReactPlayer from 'react-player';
import Meta from '../components/Meta';
import HomePageID from '../components/AddHomeId';

export default function Home() {
  return (
    <>
      <Meta />
      <HomePageID />
      <h1>
        Start Finding
        <br />
        Local Coffee Shops Today!
      </h1>
      <div className="over" />
      <ReactPlayer url="../production ID_4820352.mp4" playing loop muted />
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
