import { Circle, Img, makeScene2D, Path, Rect } from "@motion-canvas/2d";
import { all, chain, createRef, waitFor } from "@motion-canvas/core";
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
} from "mcas";
import svg from "mcas/lib/assets/world map/world.svg";

export default makeScene2D(function* (view) {
  view.fill(colors.bggreen);

  const browser = createRef<Browser>();

  const watching = yield getYoutubeVideoDescription(
    "https://www.youtube.com/watch?v=6qFsg9fA2ko",
  );

  const random = yield getRandomVideos(10);

  view.add(
    <Browser>
      <Youtube
        scale={1000 / 1920}
        watching={watching}
        suggested={random}
        likes="2.7K"
        liked
      >
        <Rect
          width="100%"
          ratio={16 / 9}
          fill={mkGradient("right", "red", "orange")}
        />
      </Youtube>
    </Browser>,
  );

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
