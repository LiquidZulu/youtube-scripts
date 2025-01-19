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

  const main = createRef<Rect>();

  view.add(
    <Rect ref={main} layout direction="column" alignItems="center" gap={20}>
      <Txt fontSize={55} fill={colors.zinc50}>
        TIK's definition of anarchism:
      </Txt>
      <Txt fill={colors.zinc50}>an ideology that is opposed to the state</Txt>
    </Rect>,
  );

  main().opacity(0).scale(0.9);

  yield* all(main().scale(1, 1), main().opacity(1, 1));
  yield* waitFor(2);

  const reasons = {
    txt: createRefArray<Txt>(),
    ray: createRefArray<Ray>(),
  };

  view.add(
    <Rect layout direction="column" gap={42} position={[0, 100]}>
      <Rect alignItems="center" gap={32}>
        <Ray
          end={0}
          ref={reasons.ray}
          toX={50}
          lineWidth={6}
          stroke={colors.zinc50}
          endArrow
          arrowSize={12}
        />
        <Txt opacity={0} ref={reasons.txt} fill={colors.zinc50}>
          The state is any "public" hierarchy.
        </Txt>
      </Rect>
      <Rect alignItems="center" gap={32}>
        <Ray
          end={0}
          ref={reasons.ray}
          toX={50}
          lineWidth={6}
          stroke={colors.zinc50}
          endArrow
          arrowSize={12}
        />
        <Txt opacity={0} ref={reasons.txt} fill={colors.zinc50}>
          The standard for public vs private is <Txt.i>size</Txt.i>.
        </Txt>
      </Rect>
    </Rect>,
  );

  yield* all(
    main().position([0, -100], 1),
    chain(
      waitFor(0.4),
      all(
        reasons.ray[0].end(1, 0.5),
        chain(waitFor(0.2), reasons.txt[0].opacity(1, 1)),
      ),
    ),
  );

  yield* waitFor(1);

  yield* all(
    all(
      reasons.ray[1].end(1, 0.5),
      chain(waitFor(0.2), reasons.txt[1].opacity(1, 1)),
    ),
  );

  yield* waitFor(1);

  yield* all(
    popout(main),
    ...[0, 0].map((_, i) =>
      chain(
        waitFor((i + 1) * 0.2),
        all(reasons.ray[i].start(1, 0.5), reasons.txt[i].opacity(0, 1)),
      ),
    ),
  );
});
