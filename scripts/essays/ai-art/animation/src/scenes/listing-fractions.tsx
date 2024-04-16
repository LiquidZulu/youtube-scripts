import {
  makeScene2D,
  Rect,
  Layout,
  Latex,
  LatexProps,
} from "@motion-canvas/2d";
import {
  createRef,
  Reference,
  ThreadGenerator,
  waitFor,
  chain,
  all,
  createSignal,
  SignalValue,
  Vector2Signal,
  PossibleVector2,
} from "@motion-canvas/core";

import { withRef } from "../types";
import { popinSize, popoutSize } from "../util";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const mkFrac = (
    numerator: number,
    denomenator: number
  ): withRef<LatexProps, Latex> =>
    ({
      ref: createRef<Latex>(),
      height: 300,
      tex: `{\\ \\color{white} \\frac{${numerator}}{${denomenator}}\\ }`,
    } as withRef<LatexProps, Latex>);
  const rect = createRef<Rect>();
  let fracs: Array<withRef<LatexProps, Latex>> = [];

  view.add(<Rect alignItems="center" ref={rect} layout />);

  rect().position(
    createSignal(() => [
      -(rect().width() / 2) + 1920 / 2,
      0,
    ]) as unknown as SignalValue<PossibleVector2<number>>
  );

  let fracsYield = {
    popinSize: [] as ThreadGenerator[],
    popoutSize: [] as ThreadGenerator[],
  };

  for (let i = 2; i <= 200; ++i) {
    const frac = mkFrac(1, i);
    fracs.push(frac);
    rect().add(<Latex {...frac} />);
    const size = frac.ref().size();
    frac.ref().size([0, 0]);

    [popinSize, popoutSize].forEach((x) => {
      fracsYield[x.name as "popinSize" | "popoutSize"].push(
        chain(waitFor(0.1 * (i - 1)), x(frac.ref, size))
      );
    });
  }

  yield* all(...fracsYield.popinSize);

  yield* waitFor(5);
});
