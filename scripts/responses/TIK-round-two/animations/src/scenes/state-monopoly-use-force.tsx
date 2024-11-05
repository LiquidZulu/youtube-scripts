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
import { ArrowList } from "mcas/lib";

// It is my view that Murray Rothbard correctly
// identified what it is that people mean when
// they say "state," namely a monopoly on the
// use of force. They then combine this with
// legal positivism which almost everyone adopts,
// and thus conclude that the state is also a
// monopoly on the justification of the use of
// force. Such that aggression done by the state
// or by the state's order is justified, whereas
// other aggression is not.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const title = createRef<Txt>();
  const state = createRef<Txt>();
  const mono = createRef<Txt>();

  view.add(
    <Txt ref={title} fontSize={70} fill={colors.zinc50}>
      <Txt ref={state}>The state:</Txt>{" "}
      <Txt ref={mono}>a monopoly on the use of force.</Txt>
    </Txt>,
  );

  yield* fadein(title);
  yield* waitFor(1);

  const arrow = createRef<ArrowList>();

  view.add(
    <ArrowList ref={arrow} position={[0, 100]}>
      <Txt>
        Legal positivism: the state is a monopoly on the{"\n"}
        <Txt.i>justification</Txt.i> of the use of force.
      </Txt>
      <Txt>
        Aggression done by the state or by the state's order{"\n"}is justified,
        but other aggression is not.
      </Txt>
    </ArrowList>,
  );

  yield* all(
    title().position([0, -200], 1),
    state().opacity(0.5, 1),
    mono().glow(0).glow(1, 1),
    mono().fill(colors.red500, 1),
    chain(waitFor(0.2), arrow().next()),
  );

  yield* waitFor(3);

  yield* arrow().next();

  yield* waitFor(3);

  yield* all(
    arrow().hide(arrow().items[1]),
    chain(waitFor(0.2), arrow().hide(arrow().items[0])),
    chain(waitFor(0.6), fadeout(title)),
  );
});
