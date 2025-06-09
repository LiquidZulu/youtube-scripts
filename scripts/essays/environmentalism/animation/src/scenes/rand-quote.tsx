import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { Quote } from "mcas/lib";
import quotes from "../assets/quotes";
import rand from "../assets/cards/ayn-rand.jpg";

export default makeScene2D(function* (view) {
  const quote = createRef<Quote>();

  console.log(quotes[4]);

  view.add(
    <Quote
      ref={quote}
      card={rand}
      quoteText={quotes[5] as any}
      citationText={quotes[5].citation}
    />,
  );

  yield* all(quote().show(), quote().scrollText("quote"));

  yield* all(quote().hide(), quote().opacity(0, 0.5));
});
