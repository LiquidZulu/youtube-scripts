import { makeScene2D, Rect, Ray, Img, Video } from "@motion-canvas/2d";
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
import redArmy from "../assets/red-army.mp4";
import { Quote } from "mcas/lib";
import quotes from "../assets/TIK.org-quotes";
import peikoff from "../assets/cards/leonard-peikoff.webp";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const bg = createRef<Video>();

  view.add(<Video ref={bg} src={redArmy} width={1920} />);

  bg().filters.blur(50);
  bg().filters.brightness(0.2);
  bg().play();

  const quote = createRef<Quote>();

  console.log(quotes[4]);

  view.add(
    <Quote
      ref={quote}
      card={peikoff}
      quoteText={quotes[4] as any}
      citationText={quotes[4].citation}
    />,
  );

  yield* all(
    bg().opacity(0).opacity(1, 2),
    quote().show(),
    quote().scrollText("quote"),
  );

  yield* all(bg().opacity(0, 1), quote().hide(), quote().opacity(0, 0.5));
});
