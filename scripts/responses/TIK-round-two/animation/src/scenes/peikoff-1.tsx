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
import { ArrowList, Quote } from "mcas/lib";
import quotes from "../assets/TIK.org-quotes";
import peikoff from "../assets/cards/leonard-peikoff.webp";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const quote = createRef<Quote>();

  view.add(
    <Quote
      ref={quote}
      card={peikoff}
      quoteText={quotes[6] as any}
      citationText={quotes[6].citation}
    />,
  );

  yield* all(quote().show(), quote().scrollText("quote"));

  yield* all(quote().hide(), quote().opacity(0, 0.5));

  // So, the Austrians are correct to embrace a methodological dualism and reject the application of the methods used to study particles and chemicals to the study of man---but not because the study of man is non-empirical. Rather, when one studies human action, he must take into account the fact of free will.

  // This integration between Objectivism and anarcho-capitalism is not idiosyncratic either. Murray Rothbard himself was an Objectivist[fn:20] +and the link between him and Rand deserves to be re-instated on TIK's chart+.[fn:21] As he explains:

  const list = createRef<ArrowList>();

  view.add(
    <ArrowList ref={list}>
      <Txt textWrap maxWidth={1400}>
        Austrians are correct to embrace methodological dualism.
      </Txt>
      <Txt textWrap maxWidth={1400}>
        The methods used to study particles and chemicals are not applicable to
        the study of man.
      </Txt>
      <Txt textWrap maxWidth={1400}>
        This is not because the study of man is non-empirical.
      </Txt>
      <Txt textWrap maxWidth={1400}>
        In studying man, one must take into account the fact of free will.
      </Txt>
      <Txt textWrap maxWidth={1400}>
        The integration between Objectivism and anarcho-capitalism is not
        idiosyncratic.
      </Txt>
    </ArrowList>,
  );

  yield* list().next();

  yield* waitUntil("methods for particles");
  yield* list().next();

  yield* waitUntil("not because non-empirical");
  yield* list().next();

  yield* waitUntil("must account for free will");
  yield* list().next();

  yield* waitUntil("not idiosyncratic");
  yield* list().next();

  yield* waitUntil("end");
  yield* all(
    ...list().items.map((item, i) => delay(i * 0.1, list().hide(item))),
  );
});
