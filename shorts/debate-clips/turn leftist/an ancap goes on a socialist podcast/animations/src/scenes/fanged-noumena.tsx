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
      <Txt {...subtitlesProps}>let's see, they sent me</Txt>,
      <Txt {...subtitlesProps}>this this page on</Txt>,
      <Txt {...subtitlesProps}>rational wiki called the</Txt>,
      <Txt {...subtitlesProps}>neo reactionary movement</Txt>,
      <Txt {...subtitlesProps}>and it was the first</Txt>,
      <Txt {...subtitlesProps}>I've heard of it so I</Txt>,
      <Txt {...subtitlesProps}>don't know have you ever</Txt>,
      <Txt {...subtitlesProps}>heard of this is this</Txt>,
      <Txt {...subtitlesProps}>something that you're</Txt>,
      <Txt {...subtitlesProps}>familiar with do you</Txt>,
      <Txt {...subtitlesProps}>know about Mencius Moldbug---</Txt>,
      [
        highFill(colors.emerald500),
        <Txt {...subtitlesProps}>I've heard of it.</Txt>,
      ],
      [
        highFill(colors.amber500),
        <Txt {...subtitlesProps}>What do you make of them?</Txt>,
      ],
      [
        highFill(colors.emerald500),
        <Txt {...subtitlesProps}>um I think they're just</Txt>,
      ],
      <Txt {...subtitlesProps}>uh you know a bunch of</Txt>,
      <Txt {...subtitlesProps}>voodoo hoodoo bullshit</Txt>,
      <Txt {...subtitlesProps}>going on like I think</Txt>,
      <Txt {...subtitlesProps}>they are um absolute</Txt>,
      <Txt {...subtitlesProps}>nonsense mongers they</Txt>,
      <Txt {...subtitlesProps}>speak only in</Txt>,
      <Txt {...subtitlesProps}>philosophese, they're</Txt>,
      <Txt {...subtitlesProps}>just an absolute they're</Txt>,
      <Txt {...subtitlesProps}>an absolute joke of a</Txt>,
      <Txt {...subtitlesProps}>community</Txt>,
      [highFill(colors.amber500), <Txt {...subtitlesProps}>Why? Do you</Txt>],
      <Txt {...subtitlesProps}>think they're never</Txt>,
      <Txt {...subtitlesProps}>going to see any of</Txt>,
      <Txt {...subtitlesProps}>their stuff realized in</Txt>,
      <Txt {...subtitlesProps}>material reality in</Txt>,
      <Txt {...subtitlesProps}>their life times?</Txt>,
      [
        highFill(colors.emerald500),
        <Txt {...subtitlesProps}>I don't even know</Txt>,
      ],
      <Txt {...subtitlesProps}>what they're saying</Txt>,
      <Txt {...subtitlesProps}>and I don't think</Txt>,
      <Txt {...subtitlesProps}>they know what they're</Txt>,
      <Txt {...subtitlesProps}>saying like I can I can</Txt>,
      <Txt {...subtitlesProps}>probably find like a</Txt>,
      <Txt {...subtitlesProps}>screenshot I took on</Txt>,
      <Txt {...subtitlesProps}>twitter this this is</Txt>,
      <Txt {...subtitlesProps}>
        from <Txt.i>Fanged Noumena</Txt.i> like
      </Txt>,
      <Txt {...subtitlesProps}>that is those are actual</Txt>,
      <Txt {...subtitlesProps}>
        pages in <Txt.i>Fanged Noumena</Txt.i>
      </Txt>,
      [highFill(colors.amber500), <Txt {...subtitlesProps}>oh my god,</Txt>],
      <Txt {...subtitlesProps}>this is nonsense</Txt>,
      <Txt {...subtitlesProps}>hold on...</Txt>,
      [
        highFill(colors.emerald500),
        <Txt {...subtitlesProps}>Look at that!</Txt>,
      ],
    ] as TranscriptAtom[],
    {},
    { fill: colors.amber500 },
  );
});
