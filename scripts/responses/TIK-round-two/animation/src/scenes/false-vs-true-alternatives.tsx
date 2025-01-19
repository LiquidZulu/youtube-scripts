import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { ArrowList } from "mcas/lib";

/*
   + FALSE: a priori vs a posteriori
   + FALSE: reason vs empirical
   + TRUE: conceptual vs perceptual
   + TRUE: general vs particular
 */

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const arrow = createRef<ArrowList>();

  view.add(
    <ArrowList ref={arrow}>
      <Txt>
        <Txt glow fill={colors.red500}>
          FALSE:
        </Txt>{" "}
        <Txt.i>a priori</Txt.i> vs <Txt.i>a posteriori</Txt.i>
      </Txt>
      <Txt>
        <Txt glow fill={colors.red500}>
          FALSE:
        </Txt>{" "}
        reason vs empirical
      </Txt>
      <Txt>
        <Txt glow fill={colors.green500}>
          TRUE:
        </Txt>{" "}
        conceptual vs perceptual
      </Txt>
      <Txt>
        <Txt glow fill={colors.green500}>
          TRUE:
        </Txt>{" "}
        general vs particular
      </Txt>
    </ArrowList>,
  );

  yield* arrow().next();
  yield* waitUntil("reason vs empirical");
  yield* arrow().next();
  yield* waitUntil("conceptual vs perceptual");
  yield* arrow().next();
  yield* waitUntil("general vs particular");
  yield* arrow().next();
  yield* waitUntil("things out");
  yield* all(
    ...arrow().items.map((item, i) =>
      chain(waitFor(0.2 * i), arrow().hide(item)),
    ),
  );

  // For far too long, the Austrian school has swallowed the poison pill that empiricism cannot yield general and necessary truths, so they have turned to the evil mysticism of Immanuel Kant, turning themselves away from reality to try get a better grasp of it.

  yield* waitUntil("blank");
});
