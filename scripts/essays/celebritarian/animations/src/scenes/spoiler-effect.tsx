import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  sequence,
  Vector2,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  after,
  flash,
  flashAround,
} from "mcas";
import * as colors from "mcas/colors";

export default makeScene2D(function* (view) {
  view.fill(0);

  const voteTotals = {
    "Democratic Party": createSignal(49),
    "Republican Party": createSignal(51),
    "Libertarian Party": createSignal(0),
  };
  const max = Math.max(...Object.values(voteTotals).map((x) => x()));
  const colours = [colors.sky500, "red", "yellow"];
  const titles = createRefArray<Txt>();
  const rays = createRefArray<Ray>();
  const end = createSignal(0);
  const conts = createRefArray<Rect>();

  view.add(
    <Rect layout gap={128}>
      {...Object.entries(voteTotals).map(([name, total], i) => (
        <Rect direction="column" alignItems="center" gap={64} ref={conts}>
          <Ray
            ref={rays}
            toY={-1000}
            lineWidth={200}
            stroke={colours[i]}
            end={() => (total() / max) * end()}
          />
          <Txt
            writeOn={() => end() * titles.length - i}
            ref={titles}
            fontSize={60}
            textAlign="center"
            textWrap
            width={600}
            text={name}
            fontFamily="cubano"
            fill={colours[i]}
          />
        </Rect>
      ))}
    </Rect>,
  );

  view.add(
    <>
      {Object.entries(voteTotals).map(([_, total], i) => (
        <Txt
          position={() => {
            const ray = rays[i];
            const rayEnd = ray.end();
            const point = ray.getPointAtPercentage(rayEnd).position;
            return new Vector2(
              ray.absolutePosition().x - view.width() / 2,
              point.y + 380,
            );
          }}
          fontSize={60}
          textAlign="center"
          text={() => `${Math.round((total() / max) * end() * max)}%`}
          fontFamily="cubano"
          fill={colours[i]}
        />
      ))}
    </>,
  );

  yield* end(1, 1);

  yield* after(
    "indicate republicans",
    flashAround(() => conts[1], undefined, undefined, {
      modLineWidth: () => 10,
      modHeight: () => 150,
      modPos: () => new Vector2(0, -45),
      color: colours[1],
    }),
  );

  yield* after(
    "indicate dems",
    flashAround(() => conts[0], undefined, undefined, {
      modLineWidth: () => 10,
      modHeight: () => 150,
      modPos: () => new Vector2(0, -45),
      color: colours[0],
    }),
  );

  yield* after(
    "lp runs",
    voteTotals["Democratic Party"](50, 1),
    voteTotals["Republican Party"](47, 1),
    voteTotals["Libertarian Party"](3, 1),
  );

  yield* after(
    "indicate LP",
    flashAround(() => conts[2], undefined, undefined, {
      modLineWidth: () => 10,
      modHeight: () => -800,
      modPos: () => new Vector2(0, 430),
      color: colours[2],
    }),
  );

  yield* waitFor(10);
});
