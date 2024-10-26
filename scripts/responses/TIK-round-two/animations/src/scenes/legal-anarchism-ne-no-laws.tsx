import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
} from "@motion-canvas/core";
import { colors, McasTxt as Txt, popin, popout } from "mcas";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const txt = createRef<Txt>();
  const ray = createRef<Ray>();

  view.add(
    <Txt ref={txt} fontSize={70} fill={colors.zinc50}>
      legal anarchism ＝ no laws
    </Txt>,
  );

  view.add(
    <Ray
      end={0}
      ref={ray}
      lineWidth={5}
      stroke={colors.zinc50}
      from={[109, 25]}
      to={[140, -25]}
    />,
  );

  yield* popin(txt);
  yield* ray().end(1, 0.5);
  yield* waitFor(2);

  yield* all(ray().opacity(0, 1), txt().opacity(0, 1));
});
