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
  TranscriptAtom,
  subtitlesProps,
  mkSubtitles,
  highFill,
} from "mcas";
import * as colors from "mcas/colors";

// Let's say, Nestlé taking control of the California river systems in central and northwest california they obtained the river rights back in the 1890s after about a 10 year drought when water is looking more and more scarce in that area of the world people are having less and less reliable water access, so that initial right in the 1890s being used as license to continue to take water from people who need it to live, who is the aggressor in that siuation?
// I just own a well and everybody else around me, they need water to live, and there's no other sources of water around, and I don't want to give them any of my water, is it just for them to steal water from me? My answer would be no, and I can kind of illustrate this with an easier example to see why it would be wrong to steal the water: imagine I had a disease where I will die in a week if I do not have sex with a woman, and no woman wants to have sex with me, would I be allowed to force them to have sex with me? Obviously not, but why is it any different in the case of: a bunch of people having wells and none of them want to give me their water?

export default makeScene2D(function* (view) {
  yield* mkSubtitles(
    view,
    [
      <Txt {...subtitlesProps}>Let's say, Nestlé taking control</Txt>,
      <Txt {...subtitlesProps}>of the California river systems</Txt>,
      <Txt {...subtitlesProps}>in central and northwest California,</Txt>,
      <Txt {...subtitlesProps}>they obtained the river rights</Txt>,
      <Txt {...subtitlesProps}>back in the 1890s,</Txt>,
      <Txt {...subtitlesProps}>after about a 10-year drought when</Txt>,
      <Txt {...subtitlesProps}>water is looking </Txt>,
      <Txt {...subtitlesProps}>more and more scarce</Txt>,
      <Txt {...subtitlesProps}>in that area of the world,</Txt>,
      <Txt {...subtitlesProps}>people are having less and less</Txt>,
      <Txt {...subtitlesProps}>reliable water access, so</Txt>,
      <Txt {...subtitlesProps}>that initial right in the 1890s</Txt>,
      <Txt {...subtitlesProps}>being used as license to</Txt>,
      <Txt {...subtitlesProps}>continue to take water from people</Txt>,
      <Txt {...subtitlesProps}>who need it to live,</Txt>,
      <Txt {...subtitlesProps}>who is the aggressor</Txt>,
      <Txt {...subtitlesProps}>in that situation?</Txt>,
      [
        highFill(colors.emerald500),
        <Txt {...subtitlesProps}>I just own a well and</Txt>,
      ],
      <Txt {...subtitlesProps}>everybody else around me,</Txt>,
      <Txt {...subtitlesProps}>they need water to live,</Txt>,
      <Txt {...subtitlesProps}>and there's no other sources</Txt>,
      <Txt {...subtitlesProps}>of water around, and</Txt>,
      <Txt {...subtitlesProps}>I don't want to give them</Txt>,
      <Txt {...subtitlesProps}>any of my water, </Txt>,
      <Txt {...subtitlesProps}>is it just for them to</Txt>,
      <Txt {...subtitlesProps}>steal water from me?</Txt>,
      <Txt {...subtitlesProps}>My answer would be no, and</Txt>,
      <Txt {...subtitlesProps}>I can kind of illustrate this</Txt>,
      <Txt {...subtitlesProps}>with an easier example to see</Txt>,
      <Txt {...subtitlesProps}>why it would be</Txt>,
      <Txt {...subtitlesProps}>wrong to steal the water:</Txt>,
      <Txt {...subtitlesProps}>imagine I had a disease where</Txt>,
      <Txt {...subtitlesProps}>I will die in a week if I do</Txt>,
      <Txt {...subtitlesProps}>not have s*x with a woman,</Txt>,
      <Txt {...subtitlesProps}>and no woman wants to have</Txt>,
      <Txt {...subtitlesProps}>s*x with me, would I be</Txt>,
      <Txt {...subtitlesProps}>allowed to force them to</Txt>,
      <Txt {...subtitlesProps}>have s*x with me?</Txt>,
      <Txt {...subtitlesProps}>Obviously not, but why is it</Txt>,
      <Txt {...subtitlesProps}>any different in the case of:</Txt>,
      <Txt {...subtitlesProps}>a bunch of people having wells</Txt>,
      <Txt {...subtitlesProps}>and none of them want to give</Txt>,
      <Txt {...subtitlesProps}>me their water?</Txt>,
    ] as TranscriptAtom[],
    {},
    { fill: colors.amber500 },
  );
});
