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
} from "mcas";
import * as colors from "mcas/colors";
import video from "/home/liquidzulu/Documents/youtube-scripts/shorts/debate-clips/skg/animations/src/assets/video.mp4";

export default makeScene2D(function* (view) {
  // view.add(<Video zIndex={-999} src={video} play />);

  yield* mkSubtitles(view, [
    <Txt {...subtitlesProps}>you know people point to</Txt>,
    <Txt {...subtitlesProps}>standard oil um which</Txt>,
    <Txt {...subtitlesProps}>was like you know</Txt>,
    <Txt {...subtitlesProps}>supposedly one of these</Txt>,
    <Txt {...subtitlesProps}>natural monopolies</Txt>,
    <Txt {...subtitlesProps}>because you need so much</Txt>,
    <Txt {...subtitlesProps}>investment to get into</Txt>,
    <Txt {...subtitlesProps}>the oil game but what</Txt>,
    <Txt {...subtitlesProps}>they really don't tell</Txt>,
    <Txt {...subtitlesProps}>you about that story um</Txt>,
    <Txt {...subtitlesProps}>is that you know</Txt>,
    <Txt {...subtitlesProps}>standard was continually</Txt>,
    <Txt {...subtitlesProps}>lowering their prices in</Txt>,
    <Txt {...subtitlesProps}>order to stay in the</Txt>,
    <Txt {...subtitlesProps}>game because they just</Txt>,
    <Txt {...subtitlesProps}>had a more efficient</Txt>,
    <Txt {...subtitlesProps}>process than anybody</Txt>,
    <Txt {...subtitlesProps}>else and by the time the</Txt>,
    <Txt {...subtitlesProps}>trust busters got in,</Txt>,
    <Txt {...subtitlesProps}>standards peak market</Txt>,
    <Txt {...subtitlesProps}>share was about 90%</Txt>,
    <Txt {...subtitlesProps}>they'd gone down to 60%</Txt>,
    <Txt {...subtitlesProps}>by the time the trust</Txt>,
    <Txt {...subtitlesProps}>busters got involved so</Txt>,
    <Txt {...subtitlesProps}>they were already losing</Txt>,
    <Txt {...subtitlesProps}>market share to these</Txt>,
    <Txt {...subtitlesProps}>more nimble smaller</Txt>,
    <Txt {...subtitlesProps}>firms who were able to</Txt>,
    <Txt {...subtitlesProps}>just get in there you</Txt>,
    <Txt {...subtitlesProps}>know they weren't super</Txt>,
    <Txt {...subtitlesProps}>bloated because at a</Txt>,
    <Txt {...subtitlesProps}>certain point standard</Txt>,
    <Txt {...subtitlesProps}>oil if they swallowed</Txt>,
    <Txt {...subtitlesProps}>the entire market well</Txt>,
    <Txt {...subtitlesProps}>suddenly they've got</Txt>,
    <Txt {...subtitlesProps}>internal calculation</Txt>,
    <Txt {...subtitlesProps}>problems so there's dis</Txt>,
    <Txt {...subtitlesProps}>economies of scale and</Txt>,
    <Txt {...subtitlesProps}>that's why no company</Txt>,
    <Txt {...subtitlesProps}>can really stay in</Txt>,
    <Txt {...subtitlesProps}>dominant space in any</Txt>,
    <Txt {...subtitlesProps}>market forever unless</Txt>,
    <Txt {...subtitlesProps}>they have government</Txt>,
    <Txt {...subtitlesProps}>protections</Txt>,
  ] as TranscriptAtom[]);
});
