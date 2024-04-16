import { makeScene2D, Rect, Txt, Ray, TxtProps } from "@motion-canvas/2d";
import {
  all,
  chain,
  createRef,
  createRefArray,
  waitFor,
} from "@motion-canvas/core";
import { popin, popout, popoutSize } from "../util";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const txt = createRefArray<Txt>();
  const ray = createRefArray<Ray>();
  const txtConf: TxtProps = {
    fontFamily: "cubano",
    fill: "white",
    fontSize: 50,
    scale: 0,
  };

  view.add(
    <Rect alignItems="center" gap={64} layout direction="column">
      <Txt ref={txt} {...txtConf}>
        The work put into art matters qua art
      </Txt>
      <Rect gap={256}>
        <Ray
          end={0}
          ref={ray}
          toY={300}
          toX={-100}
          lineWidth={22}
          arrowSize={30}
          endArrow
          stroke="white"
        />
        <Ray
          end={0}
          ref={ray}
          toY={300}
          toX={100}
          lineWidth={22}
          arrowSize={30}
          endArrow
          stroke="white"
        />
      </Rect>
      <Rect gap={64}>
        <Txt ref={txt} {...txtConf}>
          the labour theory of art
        </Txt>
        <Txt ref={txt} {...txtConf}>
          the journey theory of art
        </Txt>
      </Rect>
    </Rect>
  );

  yield* all(
    ...txt.map((x, i) =>
      chain(
        waitFor(0.2 * i),
        popin(() => x)
      )
    ),
    ...ray.map((x, i) => chain(waitFor(0.1 * i), x.end(1, 1)))
  );

  yield* waitFor(3);

  const strikethrough = createRef<Ray>();
  view.add(
    <Ray
      end={0}
      ref={strikethrough}
      lineWidth={() => 4 * txt[0].scale().x}
      stroke="red"
      fromX={() => (-txt[0].width() / 2) * txt[0].scale().x}
      toX={() => (txt[0].width() / 2) * txt[0].scale().x}
      y={txt[0].position().y}
    />
  );

  yield* strikethrough().end(1, 1);

  yield* waitFor(3);
  yield* all(
    ...txt.map((x, i) =>
      chain(
        waitFor(0.2 * i),
        popout(() => x)
      )
    ),
    ...ray.map((x, i) => chain(waitFor(0.1 * i), x.start(1, 1)))
  );
});
