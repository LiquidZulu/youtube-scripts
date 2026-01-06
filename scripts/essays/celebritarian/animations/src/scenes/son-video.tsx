import { Circle, Img, makeScene2D, Path, Rect, Video } from "@motion-canvas/2d";
import {
  all,
  chain,
  createRef,
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
} from "mcas";
import svg from "mcas/lib/assets/world map/world.svg";

import vid from "../assets/son-video.mp4";

export default makeScene2D(function* (view) {
  view.fill(0);

  const browser = createRef<Browser>();

  const watching = yield getYoutubeVideoDescription(
    "https://www.youtube.com/watch?v=a5L3DNF8uVw",
  );

  const random = yield getRandomVideos(12);

  view.add(
    <Browser
      hyperlink="https://www.youtube.com/watch?v=a5L3DNF8uVw"
      scrollOffset={950}
      ref={browser}
      width={view.width}
      height={view.height}
    >
      <Youtube
        constantScale={2}
        width={view.width}
        watching={watching}
        suggested={random}
        likes="338"
        liked
      >
        <Video width="100%" src={vid} play />
      </Youtube>
    </Browser>,
  );

  const ll = createRef<Rect>();

  view.add(<Rect ref={ll} width={450} height={60} position={[-1444, 627]} />);

  yield* after("ll", flash(ll));

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
