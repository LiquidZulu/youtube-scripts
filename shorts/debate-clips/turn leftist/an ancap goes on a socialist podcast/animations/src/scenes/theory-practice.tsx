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

  yield* mkSubtitles(view, [
    <Txt {...subtitlesProps}>Like, how am I</Txt>,
    <Txt {...subtitlesProps}>translating this into</Txt>,
    <Txt {...subtitlesProps}>reality? He's right in</Txt>,
    <Txt {...subtitlesProps}>theory, wrong in</Txt>,
    <Txt {...subtitlesProps}>practice. He just cares</Txt>,
    <Txt {...subtitlesProps}>about theory. This is</Txt>,
    <Txt {...subtitlesProps}>based on the idea that</Txt>,
    <Txt {...subtitlesProps}>there is some dichotomy,</Txt>,
    <Txt {...subtitlesProps}>some alternative between</Txt>,
    <Txt {...subtitlesProps}>theory and practice. But</Txt>,
    <Txt {...subtitlesProps}>
      theory is theory <Txt.i>about</Txt.i>
    </Txt>,
    <Txt {...subtitlesProps}>reality. I don't think</Txt>,
    <Txt {...subtitlesProps}>there is this dichotomy.</Txt>,
    [
      highFill(colors.amber500),
      <Txt {...subtitlesProps}>But why aren't the</Txt>,
    ],
    <Txt {...subtitlesProps}>why aren't the</Txt>,
    <Txt {...subtitlesProps}>anarcho-capitalist</Txt>,
    <Txt {...subtitlesProps}>communes overtaking all</Txt>,
    <Txt {...subtitlesProps}>these failing statist</Txt>,
    <Txt {...subtitlesProps}>projects? Like, when is</Txt>,
    <Txt {...subtitlesProps}>that going to come to</Txt>,
    <Txt {...subtitlesProps}>fruition for you?</Txt>,
    [
      highFill(colors.emerald500),
      <Txt {...subtitlesProps}>So the reason why that isn't</Txt>,
    ],
    <Txt {...subtitlesProps}>happening is because</Txt>,
    <Txt {...subtitlesProps}>most people are</Txt>,
    <Txt {...subtitlesProps}>horrible. They're evil.</Txt>,
    <Txt {...subtitlesProps}>They believe in wrong</Txt>,
    <Txt {...subtitlesProps}>ideas. I'm not claiming</Txt>,
    <Txt {...subtitlesProps}>that you can just have</Txt>,
    <Txt {...subtitlesProps}>the right idea---</Txt>,
    [
      highFill(colors.amber500),
      <Txt {...subtitlesProps}>So human nature doesn't</Txt>,
    ],
    <Txt {...subtitlesProps}>work with your ideology?</Txt>,
    [
      highFill(colors.emerald500),
      <Txt {...subtitlesProps}>No, no, no. I wasn't claiming</Txt>,
    ],
    <Txt {...subtitlesProps}>that. I'm claiming that</Txt>,
    <Txt {...subtitlesProps}>
      people are <Txt.i>choosing</Txt.i> to
    </Txt>,
    <Txt {...subtitlesProps}>not go along with it.</Txt>,
    <Txt {...subtitlesProps}>
      They are <Txt.i>choosing</Txt.i> to
    </Txt>,
    <Txt {...subtitlesProps}>believe in incorrect</Txt>,
    <Txt {...subtitlesProps}>things. They could</Txt>,
    <Txt {...subtitlesProps}>believe in correct</Txt>,
    <Txt {...subtitlesProps}>things, and immediately</Txt>,
    <Txt {...subtitlesProps}>the state would crumble,</Txt>,
    <Txt {...subtitlesProps}>right? But they choose</Txt>,
    <Txt {...subtitlesProps}>to believe in incorrect</Txt>,
    <Txt {...subtitlesProps}>things. They're choosing</Txt>,
    <Txt {...subtitlesProps}>to be Kantians. They're</Txt>,
    <Txt {...subtitlesProps}>choosing to be</Txt>,
    <Txt {...subtitlesProps}>Hegelians. They're</Txt>,
    <Txt {...subtitlesProps}>choosing to be Marxists.</Txt>,
    <Txt {...subtitlesProps}>They're choosing to</Txt>,
    <Txt {...subtitlesProps}>follow all these</Txt>,
    <Txt {...subtitlesProps}>incorrect ideas.</Txt>,
  ] as TranscriptAtom[]);
});
