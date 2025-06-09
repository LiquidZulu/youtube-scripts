import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
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
  subtitlesProps,
  TranscriptAtom,
  highFill,
} from "mcas";
import * as colors from "mcas/colors";

// Both of you consider private property to be something that ostensively would be infinite---you can have as much private property as you can acquire?
// Yeah.
// OK, and how does that interface with the idea that resources are finite?
// Well it's /implied/ by the fact that resources are finite, it's the fact that we have finite resources -- that we have scarce means -- this implies that there can indeed be conflicts, and the fact that there can indeed be conflicts means that we need an area of philosophy called law, where we deal with: OK, how exactly do we resolve these conflicts? Do we give precedence to the initiatior of this conflict or the non-initiator of this conflict? 'Cause they can't both win by definition of what a conflict is: it's contradictory action---only one can win, 'cause their actions are mutually exclusive, so it's like if, you know, Crusoe and Friday, they have a stick here, and Crusoe wants to use it for spearfishing, and Friday wants to use it to stoke his fire, they can't both do that at the same time, one of them has to win out, Anarcho-Capitalists are saying that the person who didn't initiate the conflict should win out,

export default makeScene2D(function* (view) {
  yield* mkSubtitles(
    view,
    [
      <Txt {...subtitlesProps}>Both of you consider</Txt>,
      <Txt {...subtitlesProps}>private property to be</Txt>,
      <Txt {...subtitlesProps}>something that ostensively</Txt>,
      <Txt {...subtitlesProps}>would be infinite---</Txt>,
      <Txt {...subtitlesProps}>you can have as much</Txt>,
      <Txt {...subtitlesProps}>private property</Txt>,
      <Txt {...subtitlesProps}>as you can acquire?</Txt>,
      [highFill(colors.emerald500), <Txt {...subtitlesProps}>Yeah.</Txt>],
      [
        highFill(colors.amber500),
        <Txt {...subtitlesProps}>OK, and how does that interface</Txt>,
      ],
      <Txt {...subtitlesProps}>with the idea that</Txt>,
      <Txt {...subtitlesProps}>resources are finite?</Txt>,
      [
        highFill(colors.emerald500),
        <Txt {...subtitlesProps}>
          Well it's <Txt.i>implied</Txt.i> by the fact
        </Txt>,
      ],
      <Txt {...subtitlesProps}>that resources are finite,</Txt>,
      <Txt {...subtitlesProps}>it's the fact that we</Txt>,
      <Txt {...subtitlesProps}>have finite resources--</Txt>,
      <Txt {...subtitlesProps}>that we have scarce means--</Txt>,
      <Txt {...subtitlesProps}>this implies that there</Txt>,
      <Txt {...subtitlesProps}>can indeed be conflicts,</Txt>,
      <Txt {...subtitlesProps}>and the fact that there</Txt>,
      <Txt {...subtitlesProps}>can indeed be conflicts means</Txt>,
      <Txt {...subtitlesProps}>that we need an area of philosophy</Txt>,
      <Txt {...subtitlesProps}>called law, where we deal with:</Txt>,
      <Txt {...subtitlesProps}>OK, how exactly do we</Txt>,
      <Txt {...subtitlesProps}>resolve these conflicts?</Txt>,
      <Txt {...subtitlesProps}>Do we give precedence to</Txt>,
      <Txt {...subtitlesProps}>the initiator of this conflict</Txt>,
      <Txt {...subtitlesProps}>or the non-initiator of this conflict?</Txt>,
      <Txt {...subtitlesProps}>{"'Cause"} they can't both win</Txt>,
      <Txt {...subtitlesProps}>by definition of what a conflict is:</Txt>,
      <Txt {...subtitlesProps}>it's contradictory action---</Txt>,
      <Txt {...subtitlesProps}>only one can win, 'cause</Txt>,
      <Txt {...subtitlesProps}>their actions are mutually exclusive,</Txt>,
      <Txt {...subtitlesProps}>so it's like if, you know,</Txt>,
      <Txt {...subtitlesProps}>Crusoe and Friday,</Txt>,
      <Txt {...subtitlesProps}>they have a stick here,</Txt>,
      <Txt {...subtitlesProps}>and Crusoe wants</Txt>,
      <Txt {...subtitlesProps}>to use it for spearfishing,</Txt>,
      <Txt {...subtitlesProps}>Friday wants</Txt>,
      <Txt {...subtitlesProps}>to use it to stoke his fire,</Txt>,
      <Txt {...subtitlesProps}>they can't both do that</Txt>,
      <Txt {...subtitlesProps}>at the same time,</Txt>,
      <Txt {...subtitlesProps}>one of them has to win out,</Txt>,
      <Txt {...subtitlesProps}>Anarcho-Capitalists are saying that</Txt>,
      <Txt {...subtitlesProps}>the person who didn't initiate</Txt>,
      <Txt {...subtitlesProps}>the conflict should win out,</Txt>,
    ] as TranscriptAtom[],
    {},
    { fill: colors.amber500 },
  );
});
