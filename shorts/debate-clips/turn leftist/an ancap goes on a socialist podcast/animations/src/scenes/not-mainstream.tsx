import { makeScene2D, Rect, Ray, Img, Video } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  mkSubtitles,
  TranscriptAtom,
  subtitlesProps,
  highFill,
} from "mcas";
import * as colors from "mcas/colors";
import video from "/home/liquidzulu/Documents/youtube-scripts/shorts/debate-clips/turn leftist/an ancap goes on a socialist podcast/animations/src/assets/video.mp4";

export default makeScene2D(function* (view) {
  //view.add(<Video zIndex={-999} src={video} play />);

  yield* mkSubtitles(
    view,
    [
      <Txt {...subtitlesProps}>You also are</Txt>,
      <Txt {...subtitlesProps}>mischaracterizing</Txt>,
      <Txt {...subtitlesProps}>environmentalism and</Txt>,
      <Txt {...subtitlesProps}>painting all</Txt>,
      <Txt {...subtitlesProps}>environmentalists as an</Txt>,
      <Txt {...subtitlesProps}>anti-human anti</Txt>,
      <Txt {...subtitlesProps}>-property, which is a</Txt>,
      <Txt {...subtitlesProps}>really gross</Txt>,
      <Txt {...subtitlesProps}>oversimplification. You</Txt>,
      <Txt {...subtitlesProps}>also inject Ayn Rand</Txt>,
      <Txt {...subtitlesProps}>philosophy---</Txt>,
      [
        highFill(colors.emerald500),
        <Txt {...subtitlesProps}>I demonstrate it</Txt>,
      ],
      <Txt {...subtitlesProps}>in the article.</Txt>,
      [highFill(colors.amber500), <Txt {...subtitlesProps}>---is not</Txt>],
      <Txt {...subtitlesProps}>widely accepted in</Txt>,
      <Txt {...subtitlesProps}>academic circles.</Txt>,
      [highFill(colors.emerald500), <Txt {...subtitlesProps}>Oh, no!</Txt>],
      <Txt {...subtitlesProps}>Whatever will I do!?</Txt>,
      <Txt {...subtitlesProps}>It's not widely accepted!</Txt>,
      [
        highFill(colors.amber500),
        <Txt {...subtitlesProps}>Well, I'm just</Txt>,
      ],
      <Txt {...subtitlesProps}>letting you know that</Txt>,
      <Txt {...subtitlesProps}>you're on the fringe here.</Txt>,
      [highFill(colors.emerald500), <Txt {...subtitlesProps}>Oh, no!</Txt>],
      <Txt {...subtitlesProps}>I'm on the fringe!</Txt>,
      <Txt {...subtitlesProps}>I never realized this.</Txt>,
      <Txt {...subtitlesProps}>You're the first person</Txt>,
      <Txt {...subtitlesProps}>to tell me this stuff.</Txt>,
      <Txt {...subtitlesProps}>Did you know that? I've</Txt>,
      <Txt {...subtitlesProps}>actually never heard</Txt>,
      <Txt {...subtitlesProps}>these things before. I'm</Txt>,
      <Txt {...subtitlesProps}>so distraught. I guess</Txt>,
      <Txt {...subtitlesProps}>I'm going to be a</Txt>,
      <Txt {...subtitlesProps}>communist now. What do</Txt>,
      <Txt {...subtitlesProps}>you think is going to</Txt>,
      <Txt {...subtitlesProps}>happen?</Txt>,
    ] as TranscriptAtom[],
    {},
    { fill: colors.amber500 },
  );
});
