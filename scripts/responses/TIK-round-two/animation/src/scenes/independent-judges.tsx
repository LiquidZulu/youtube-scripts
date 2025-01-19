import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
  delay,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { ArrowList } from "mcas/lib";

// The more independent judges are in applying their judgement to some case, the better off we are. On the one hand, the capitalist judge is at the very least /trying/ to do justice in some specific case he has before him, and on the other, the monopoly judiciary must necessarily tend towards a systematic perversion of justice by the fact that it is a monopoly. Law is not subjective or intrinsic, it cannot be decreed from on high by the standard of "he's the guy with the biggest gavel." Objective legal principles can be applied /only/ when rational men are able to use their rational judgement to do justice without the razor of Damocles that is an arbiter of last resort constantly undercutting them.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const title = createRef<Txt>();
  const list = createRef<ArrowList>();

  view.add(
    <Rect layout direction="column" alignItems="center" gap={64}>
      <Txt ref={title} fill="white" fontFamily="oswald">
        INDEPENDENT JUDGES {`>`} "ARBITER OF LAST RESORT"
      </Txt>
      <ArrowList ref={list}>
        <Txt textWrap maxWidth={1400}>
          The more independent judges are in applying their judgement to some
          case, the better off we are.
        </Txt>
        <Txt textWrap maxWidth={1400}>
          The capitalist judge is at the very least <Txt.i>trying</Txt.i> to do
          justice in some specific case.
        </Txt>
        <Txt textWrap maxWidth={1400}>
          The monopoly judiciary must necessarily tend towards a systematic
          perversion of justice by the fact that it is a monopoly.
        </Txt>
        <Txt textWrap maxWidth={1400}>
          Law is not subjective or intrinsic, and cannot be decreed from on
          high.
        </Txt>
        <Txt textWrap maxWidth={1400}>
          Objective legal principles can be applied <Txt.i>only</Txt.i> when
          rational men are able to use their independent judgement to do
          justice.
        </Txt>
      </ArrowList>
    </Rect>,
  );

  yield* all(fadein(title), list().next());

  yield* list().next("capitalist judge trying to do justice");
  yield* list().next("monopoly judiciary -> perversion of justice");
  yield* list().next("law not subjective or intrinsic");
  yield* list().next("objective legal principles");

  yield* waitUntil("end");

  yield* all(fadeout(title), delay(0.1, list().hideAll()));
});
