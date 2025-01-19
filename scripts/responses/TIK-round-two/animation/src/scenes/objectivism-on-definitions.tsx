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
import { fadeinup } from "mcas/lib";
import { Quote } from "mcas/lib";
import quotes from "../assets/TIK.org-quotes";
import peikoff from "../assets/cards/leonard-peikoff.webp";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  // Regardless, to justify the claim that Objectivism means the philosophy of the primacy of existence, let me consult the standard Objectivist account of definition; namely, that a definition is a statement that identifies the nature of a concept's units:

  const title = createRef<Txt>();
  view.add(
    <Txt
      fill="white"
      ref={title}
      width={1400}
      fontSize={80}
      textWrap
      textAlign="center"
    >
      Objectivism as the Philosophy of the Primacy of Existence
    </Txt>,
  );

  yield* fadein(title);

  yield* waitUntil("definition meaning");

  const def = createRef<Txt>();

  view.add(
    <Rect position={[0, 100]}>
      <Txt ref={def} fill="white" opacity={0}>
        Definition: a statement that identifies the nature of a concept's units.
      </Txt>
    </Rect>,
  );

  yield* all(title().position([0, -100], 1), fadeinup(def));

  yield* waitUntil("out");
  yield* all(fadeout(title), delay(0.1, fadeout(def)));

  const quote = createRef<Quote>();

  view.add(
    <Quote
      ref={quote}
      card={peikoff}
      quoteText={quotes[15] as any}
      citationText={quotes[15].citation}
    />,
  );

  yield* all(quote().show(), quote().scrollText("quote"));

  yield* all(quote().hide(), quote().opacity(0, 0.5));
});
