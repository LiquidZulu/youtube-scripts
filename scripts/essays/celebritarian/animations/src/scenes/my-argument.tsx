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

import vid from "../assets/Anarcho-Capitalism： Responding to the Critics [W-NQWJn-AHw].mp4";

export default makeScene2D(function* (view) {
  view.fill(0);

  const browser = createRef<Browser>();

  const watching = yield getYoutubeVideoDescription(
    "https://www.youtube.com/watch?v=W-NQWJn-AHw",
  );

  const random = yield getRandomVideos(20);

  view.add(
    <Browser
      hyperlink="https://www.youtube.com/watch?v=W-NQWJn-AHw"
      scrollOffset={1540}
      ref={browser}
      width={view.width}
      height={view.height}
    >
      <Youtube
        constantScale={2}
        width={view.width}
        watching={watching}
        suggested={random}
        likes="1.5K"
        liked
      >
        <Video width="100%" src={vid} play />
      </Youtube>
    </Browser>,
  );

  yield* waitFor(10);
});
