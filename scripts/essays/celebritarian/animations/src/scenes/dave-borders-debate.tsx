import {
  Camera,
  Circle,
  Img,
  makeScene2D,
  Path,
  Rect,
  Video,
} from "@motion-canvas/2d";
import {
  all,
  chain,
  createRef,
  createSignal,
  useRandom,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import {
  Browser,
  colors,
  getYoutubeVideoDescription,
  getRandomVideos,
  London,
  mkGradient,
  SuggestedVideo,
  McasTxt as Txt,
  Washington,
  Website,
  WorldMap,
  YoutubeComment,
  YoutubeCommentSection,
  YoutubeSuggested,
  popout,
  Youtube,
  flash,
  after,
  flashAround,
} from "mcas";
import svg from "mcas/lib/assets/world map/world.svg";

import vid from "../assets/dave-borders-debate.mp4";

export default makeScene2D(function* (view) {
  view.fill(0);

  const browser = createRef<Browser>();

  const url = "https://www.youtube.com/watch?v=6xWiSBnwIQM";

  const watching = yield getYoutubeVideoDescription(url);

  const random = yield getRandomVideos(18);
  const radius = createSignal(0);

  view.add(
    <Browser
      hyperlink={url}
      scrollOffset={1390}
      ref={browser}
      width={view.width}
      height={view.height}
      scale={1.495}
      position={[555, 240]}
    >
      <Youtube
        constantScale={2}
        width={view.width}
        watching={watching}
        suggested={random}
        likes="4.6K"
        videoRadius={radius}
      >
        <Video width="100%" src={vid} play />
      </Youtube>
    </Browser>,
  );
  //view.add(<Video src={vid} opacity={0.5} />);

  yield* all(browser().scale(1, 1), browser().position(0, 1), radius(20, 1));

  yield* waitUntil("end");

  /* view.add(
   *   <Browser ref={browser} scroll={0}>
   *     <Website
   *       scale={1000 / 1920}
   *       width={1920}
   *       site="youtube/watch"
   *       watching={watching}
   *       likes="2.7K"
   *       liked
   *     >
   *       <Rect
   *         width="100%"
   *         ratio={16 / 9}
   *         fill={mkGradient("right", "red", "orange")}
   *       />
   *       <YoutubeSuggested videos={random} />
   *       <YoutubeCommentSection>
   *         <YoutubeComment />
   *         <YoutubeComment />
   *         <YoutubeComment />
   *         <YoutubeComment />
   *         <YoutubeComment />
   *       </YoutubeCommentSection>
   *     </Website>
   *   </Browser>,
   * ); */
});
