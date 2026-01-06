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

import vid from "../assets/point-of-contention.mp4";

export default makeScene2D(function* (view) {
  view.fill(0);

  const browser = createRef<Browser>();

  const watching = yield getYoutubeVideoDescription(
    "https://www.youtube.com/watch?v=YqIaiQ-aK_s",
  );

  const random = yield getRandomVideos(12);
  const radius = createSignal(0);

  view.add(
    <Browser
      hyperlink="https://www.youtube.com/watch?v=YqIaiQ-aK_s"
      scrollOffset={1200}
      ref={browser}
      width={view.width}
      height={view.height}
      scale={1.495}
      position={[555, 235]}
    >
      <Youtube
        constantScale={2}
        width={view.width}
        watching={watching}
        suggested={random}
        likes="10K"
        videoRadius={radius}
      >
        <Video width="100%" src={vid} play />
      </Youtube>
    </Browser>,
  );

  yield* all(browser().scale(1, 1), browser().position(0, 1), radius(20, 1));

  const indicate = createRef<Rect>();
  view.add(
    <Rect ref={indicate} width={1050} height={90} position={[-505, 625]} />,
  );

  yield* after(
    "indicate",
    flashAround(
      indicate,
      undefined,
      undefined,
      { modLineWidth: () => 5, color: "red" },
      { shadowBlur: 20, shadowColor: "red" },
    ),
  );

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
