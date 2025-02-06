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
import { ArrowList, commaSeparators } from "mcas/lib";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  /*
       Thus, anarcho-capitalism holds the non-aggression principle as the fundamental starting point for all legal analysis---where aggression means the initiation of conflict. So for the case of the stick, we no longer have to imagine what sort of justification Friday might bring, we can simply see that he is the one who has initiated the conflict, and thus his action is not justified.

     ** TIKhistory on the Definition of Anarchism
     *** TIK's Definitions as Package Deals
       It will be shown later on why any claim contrary to the non-aggression principle must devolve into legal authoritarianism and why legal authoritarianism is false.
     */

  const title = createRef<Txt>();
  const list = createRef<ArrowList>();
  const timestamp = createSignal<number>(10000);

  view.add(
    <Rect layout direction="column" alignItems="center" gap={120}>
      <Txt ref={title} fill="white" fontFamily="oswald" fontSize={80}>
        The Non-Aggression Principle <Txt fill={colors.zinc600}>(NAP)</Txt>
      </Txt>
      <ArrowList ref={list}>
        <Txt>
          "Aggression" is the initiation of <Txt.i>conflict</Txt.i>.
        </Txt>
        <Txt>Friday initiated the conflict, so he is the criminal.</Txt>
        <Txt>
          <Txt
            fontFamily="mononoki"
            fill={colors.sky500}
            glow
            text={createSignal(() =>
              commaSeparators(timestamp().toFixed(0), ":", 2),
            )}
          />{" "}
          Any claim contrary to the NAP must{"\n"}devolve into legal
          authoritarianism.
        </Txt>
      </ArrowList>
    </Rect>,
  );

  console.log(timestamp());

  yield* fadein(title);

  yield* waitUntil("aggression def");
  yield* list().next();

  yield* waitUntil("Friday aggressor");
  yield* list().next();

  yield* waitUntil("~NAP = legal authoritarianism");
  yield* all(list().next(), timestamp(12604, 1));

  console.log(timestamp());

  yield* waitUntil("end");

  yield* all(
    fadeout(title),
    delay(
      0.2,
      all(...list().items.map((item, i) => delay(0.2 * i, list().hide(item)))),
    ),
  );

  yield* waitUntil("blank");
});
