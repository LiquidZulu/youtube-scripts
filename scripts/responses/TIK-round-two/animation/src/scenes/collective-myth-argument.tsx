import { makeScene2D, Rect, Ray, Img, JSX } from "@motion-canvas/2d";
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
import { ArrowList, flashAround, Quote } from "mcas/lib";
import quotes from "../assets/TIK.org-quotes";
import hoppe from "../assets/cards/hans-hermann-hoppe.jpg";

// Now that it has been established that anarchism is definitively not chaos, it is worth explaining exactly how defense services could be provided on the free market. After all, some people are criminal, and the free society would need a way to deal with them. It is a general rule of economics that a free market can more efficiently provide any good than state central planning;[fn:28] however, because of that it is not possible for me to explain the specific bureaucratic structure that would obtain on the market to provide the service of defending one's rights. Just as it wouldn't be possible to explain what the restaurant industry would look like before one had developed. Regardless, it is possible to discuss some likely or possible features that could exist.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const ppd = createRef<Txt>();
  const list = createRef<ArrowList>();
  const cont = createRef<Txt>();

  view.add(
    <Rect layout direction="column" gap={64} ref={cont} position={[0, 387]}>
      <Txt
        ref={ppd}
        fill="white"
        fontFamily="oswald"
        textAlign="center"
        fontSize={70}
      >
        THE PRIVATE PRODUCTION{"\n"}OF DEFENSE
      </Txt>
      <ArrowList ref={list}>
        <Txt textWrap maxWidth={1200}>
          Some people are criminal, and the free society would need a way to
          deal with them.
        </Txt>
        <Txt textWrap maxWidth={1200}>
          A free market can more efficiently provide any good than state central
          planning.
        </Txt>
        <Txt textWrap maxWidth={1200}>
          ∴ it is not possible to explain the specific bureaucratic structure
          that would obtain on the market to provide defense.
        </Txt>
        <Txt textWrap maxWidth={1200}>
          It is possible to discuss some likely or possible features that could
          exist.
        </Txt>
      </ArrowList>
    </Rect>,
  );

  yield* fadein(ppd);

  yield* waitUntil("some people criminal");
  yield* all(cont().position([0, 280], 1), list().next());

  yield* waitUntil("Free market more efficient");
  yield* all(cont().position([0, 180], 1), list().next());

  yield* waitUntil("not possible bureaucracy");
  yield* all(cont().position([0, 90], 1), list().next());

  yield* waitUntil("likely features");
  yield* all(cont().position(0, 1), list().next(1));

  yield* waitUntil("ppd gone");
  yield* all(
    fadeout(ppd),
    ...list().items.map((item, i) => delay(0.1 * (i + 1), list().hide(item))),
  );

  // First, I must deconstruct the myth of collective security, most prominently advanced by Thomas Hobbes. The destruction he wrought in epistemology by conflating empiricism with nominalism-sensualism can be found in the political realm also---it is accepted by legion political philosophers and economists that a only a state can provide security against invasions of one's property. The argument goes that in the state of nature men are all snarling beasts who are constantly at each others throats, doing anything in their power to invade and expropriate what has been produced by others. In other words, Hobbes has it that there would be a permanent underproduction of security---each individual, left to his own devices, would spend too little on his own defense, thus constant interpersonal warfare would result.

  const title = createRef<Txt>();
  const listItems = createRefArray<Rect>();

  view.add(
    <Txt
      opacity={0}
      ref={title}
      fontSize={60}
      fill={colors.zinc50}
      position={[0, -150]}
    >
      The Myth of Collective Security:
    </Txt>,
  );

  view.add(
    <Rect layout direction="column" position={[0, 100]}>
      {[
        "Men are brutes who must necessarily be at war with each other.",
        "Make one of those men a sovereign.",
        "???",
        "No more war! 😊",
      ].map((x, i) => (
        <Rect opacity={0} ref={listItems} gap={32}>
          <Txt fill={colors.zinc600}>{`${i + 1}.`}</Txt>
          <Txt fill={colors.zinc50}>{x}</Txt>
        </Rect>
      ))}
    </Rect>,
  );

  yield* waitUntil("myth collective security");

  yield* all(
    fadein(title),
    chain(
      waitFor(0.2),
      all(
        ...listItems.map((item, i) =>
          chain(waitFor((i + 1) * 0.2), item.opacity(1, 1)),
        ),
      ),
    ),
  );

  yield* waitUntil("out");

  yield* all(
    fadeout(title),
    ...listItems.map((item, i) =>
      chain(waitFor((i + 1) * 0.2), item.opacity(0, 1)),
    ),
  );

  const quote = createRef<Quote>();

  view.add(
    <Quote
      ref={quote}
      card={hoppe}
      quoteText={quotes[12] as any}
      citationText={quotes[12].citation}
    />,
  );

  yield* all(quote().show(), quote().scrollText("quote"));
  yield* all(quote().hide(), quote().opacity(0, 0.5));

  // On its face, even if we grant the premise that men are brutes who must necessarily be at war with each other, it is entirely unclear how exactly this is any solution to this problem at all. Surely the sovereign is just as brutish as his subjects and now has the territorial monopoly and compulsory funding to externalise the costs of his aggression onto a vast array of victims who are forced to pay for their own victimisation. It is clear that this sovereign is no protector at all---rather, he is the greatest brute of them all.

  yield* all(
    fadein(title),
    chain(
      waitFor(0.2),
      all(
        ...listItems.map((item, i) =>
          chain(waitFor((i + 1) * 0.1), item.opacity(1, 1)),
        ),
      ),
    ),
  );

  yield* flashAround(() => listItems[0]);

  yield* waitUntil("indicate sovereign");

  yield* flashAround(() => listItems[1]);

  yield* waitUntil("end");

  yield* all(
    fadeout(title),
    ...listItems.map((item, i) =>
      chain(waitFor((i + 1) * 0.1), item.opacity(0, 1)),
    ),
  );
});
