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
import quotes from "../assets/TIK.org-quotes";
import rothbard from "../assets/cards/murray-rothbard.webp";
import { Quote } from "mcas/lib";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const quote = createRef<Quote>();

  view.add(
    <Quote
      ref={quote}
      card={rothbard}
      quoteText={quotes[9] as any}
      citationText={quotes[9].citation}
    />,
  );

  yield* all(quote().show(), quote().scrollText("quote"));
  yield* all(quote().hide(), quote().opacity(0, 0.5));
});
