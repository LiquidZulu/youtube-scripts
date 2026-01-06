import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  useScene,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  ArrowList,
} from "mcas";
import * as colors from "mcas/colors";

export default makeScene2D(function* (view) {
  view.fill(colors.slate950);
  const skgblue = useScene().variables.get("skgblue", 0);

  // In short, the Stop Killing Games initiative seeks to address the problem of games publishers arbitrarily making games unplayable without any recourse for the consumer at a time of their choosing. The supporters say that games should operate like any other commodity: if I purchase some good at a store, the expectation is that I get to keep it forever, it can't be taken away from me at a later point. Or if I purchase some service, like a hair cut, there is an understanding that it wont be stopped half-way through; there is to be an understood time at which the service is done and we can move on with our days.

  const list = createRef<ArrowList>();
  const cont = createRef<Rect>();
  const title = createRef<Txt>();

  view.add(
    <Rect
      position={[0, 350]}
      ref={cont}
      layout
      direction="column"
      alignItems="center"
      gap={96}
    >
      <Txt ref={title} glow fill={skgblue} fontFamily="oswald" fontSize={60} />
      <ArrowList maxWidth={1700} ref={list}>
        <Txt>
          Address the problem of publishers making games unplayable without any
          recourse for the consumer.
        </Txt>
        <Txt>Games should operate like any other commodity.</Txt>
        <Txt>
          If I purchase some good at a store, the expectation is that I get to
          keep it forever.
        </Txt>
        <Txt>
          If I purchase a service, like a hair cut, there is an understanding
          that it won't be stopped half-way through.
        </Txt>
      </ArrowList>
    </Rect>,
  );

  yield* title().text("the goal of stop killing games:".toUpperCase(), 1);
  yield* cont().position(0, 1);

  yield* list().next("address the problem");
  yield* list().next("operate like other commodities");
  yield* list().next("purchase some good");
  yield* list().next("purchase a service");

  yield* waitFor(15);
});
