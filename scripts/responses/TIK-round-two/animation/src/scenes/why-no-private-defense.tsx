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

// So, if free market defensive services are so superior to the statist offerings, why have they not arrived? The answer, in short, is that the philosophy of the day does not allow for it. I will be making a detailed video on the philosophy of history that will more-fully explain this point in the future--and in fact the original version of this script contained such an explanation--but for now I must remain brief in giving an explanation of Leonard Peikoff's philosophical theory of history.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const title = createRef<Txt>();
  const list = createRef<ArrowList>();

  view.add(
    <Rect layout direction="column" gap={64} alignItems="center">
      <Txt
        width={1100}
        textWrap
        ref={title}
        fill="white"
        fontSize={70}
        textAlign="center"
      >
        Why have private defense services not arrived?
      </Txt>
      <ArrowList ref={list}>
        <Txt textWrap maxWidth={1200}>
          The philosophy of the day does not allow for it.
        </Txt>
        <Txt textWrap maxWidth={1200}>
          Man has free will and as such the type of society that obtains at any
          point in history is the result of the choices made by the men who live
          in it.
        </Txt>
      </ArrowList>
    </Rect>,
  );
  yield* fadein(title);
  yield* list().next("potd doesnt allow for it");
  yield* waitUntil("title change");
  yield* title().text("Leonard Peikoff's philosophical theory of history:", 1);
  yield* list().next("man has free will");
  yield* waitUntil("list gone");
  yield* all(list().hideAll(), fadeout(title));

  // The basic premsie underlying this idea is that man has free will, and as such the type of society which obtains at any point in history must be the result of the choices made by the men who live in it. Fundamentally, the choices men make will be influenced by the philosophy they hold---if a man believes that knowledge can be gained only by appealing to the mystic divinations of temple priests or Keynesian economists then he will find himself weak and dependent. If the philosophy of the day teaches man that his only moral worth can be found in doing his duty and that this demands he not live for himself, then he will be primed to obey the orders of any tyrant who comes along.
});
