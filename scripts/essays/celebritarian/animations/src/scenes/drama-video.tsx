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

import vid from "../assets/How Pirate Software Almost Solo'd a Movement [L6LGvKI5KkY].mp4";

const url = "https://www.youtube.com/watch?v=L6LGvKI5KkY";

export default makeScene2D(function* (view) {
  view.fill(0);

  const browser = createRef<Browser>();

  const watching = yield getYoutubeVideoDescription(url);

  const random = yield getRandomVideos(20);

  view.add(
    <Browser
      hyperlink={url}
      scrollOffset={1540}
      ref={browser}
      width={view.width}
      height={view.height}
    >
      <Youtube
        constantScale={2}
        width={view.width}
        watching={watching}
        suggested={Object.fromEntries(Object.entries(random).toReversed())}
        likes="1.5K"
        liked
      >
        <Video width="100%" src={vid} play />
      </Youtube>
    </Browser>,
  );

  yield* waitFor(10);
});
