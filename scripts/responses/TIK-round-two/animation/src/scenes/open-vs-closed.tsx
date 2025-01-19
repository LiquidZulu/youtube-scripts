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
import { ArrowList, flashAround } from "mcas/lib";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const title = createRef<Txt>();
  const open = createRef<Txt>();
  const closed = createRef<Txt>();

  view.add(
    <Txt ref={title} fontSize={80} fontFamily="Oswald" fill="white">
      <Txt ref={open}>Open</Txt> vs <Txt ref={closed}>Closed</Txt>
    </Txt>,
  );

  yield* fadein(title);

  yield* waitUntil("title up");

  yield* title().position([0, -300], 1);

  yield* waitUntil("indicate closed");
  yield* all(flashAround(closed));

  // If Objectivism is a closed system, that is, if it is just whatever beliefs in philosophy that Ayn Rand held, then it can never develop or shift from the moment of her death. In this case, the preceding analysis of Rand's politics /is/ the Objectivist politics. If, on the other hand, Objectivism is an open system, then "Ayn Rand said so" cannot stand as an argument for the preceding analysis being the /Objectivist/ politics.

  const list = createRef<ArrowList>();

  view.add(
    <ArrowList ref={list} position={[0, 50]}>
      <Txt textWrap maxWidth={1400}>
        <Txt.b fill={colors.red500} fontFamily="oswald">
          CLOSED
        </Txt.b>
        : <Txt fill={colors.purple500}>Objectivism</Txt> is just whatever
        beliefs in philosophy that Ayn Rand held---it can never develop or shift
        from the moment of her death. \therefore the preceding analysis of
        Rand's politics <Txt.i>is</Txt.i> the{" "}
        <Txt fill={colors.purple500}>Objectivist</Txt> politics.
      </Txt>
      <Txt textWrap maxWidth={1400}>
        <Txt.b fill={colors.green500} fontFamily="oswald">
          OPEN
        </Txt.b>
        : "Ayn Rand said so" cannot stand as an argument for the preceding
        analysis being the <Txt.i fill={colors.purple500}>Objectivist</Txt.i>{" "}
        politics.
      </Txt>
    </ArrowList>,
  );

  yield* list().next("show closed");

  yield* waitUntil("indicate open");
  yield* flashAround(open);
  yield* list().next("show open");

  yield* waitUntil("end");

  yield* all(fadeout(title), delay(0.1, list().hideAll()));
});
