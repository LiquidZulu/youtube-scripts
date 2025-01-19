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
import quotes from "../assets/TIK.org-quotes";
import rand from "../assets/cards/ayn-rand.jpg";
import { ArrowList, Quote } from "mcas/lib";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const quote = createRef<Quote>();

  view.add(
    <Quote
      ref={quote}
      card={rand}
      quoteText={quotes[10] as any}
      citationText={quotes[10].citation}
    />,
  );

  yield* all(quote().show(), quote().scrollText("quote"));
  yield* all(quote().hide(), quote().opacity(0, 0.5));

  yield* waitUntil("possible cut");

  // Legal positivism is one specific theory about what the law is, namely it is the thesis that the existence and content of law depends upon social facts, and not on its merits.[fn:26] In other words, the legal positivist claims that law is "posited," i.e. decreed by some authority, rather than discovered by jurists. This leaves us with a gross false alternative: arbitrary law declared by politicians vs arbitrary law declared by bandits; agression vs agression; might vs might. It is the dictum of every great villain in the history of philosophy: heads I win, tails you lose.

  const list = createRef<ArrowList>();
  const positivism = createRef<Txt>();
  const cont = createRef<Rect>();

  view.add(
    <Rect ref={cont} layout direction="column" alignItems="center" gap={64}>
      <Txt ref={positivism} fill="white" fontFamily="oswald" fontSize={80}>
        LEGAL POSITIVISM
      </Txt>
      <ArrowList ref={list}>
        <Txt textWrap maxWidth={1200}>
          The existence and content of law depends upon social facts and not on
          its merits.
        </Txt>
        <Txt textWrap maxWidth={1200}>
          Law is "posited"—decreed by some authority rather than discovered by
          jurists.
        </Txt>
        <Txt textWrap maxWidth={1200}>
          False alternative: arbitrary law declared by politicians vs arbitrary
          law declared by bandits.
        </Txt>
      </ArrowList>
    </Rect>,
  );

  yield* fadein(positivism);

  yield* waitUntil("thesis");
  yield* list().next();

  yield* waitUntil("posited");
  yield* list().next();

  yield* waitUntil("false alternative");
  yield* list().next();

  yield* waitUntil("out");

  yield* all(
    ...list().items.map((item, i) => delay(0.2 * (i + 1), list().hide(item))),
    fadeout(positivism),
  );

  yield* waitUntil("blank");
});
