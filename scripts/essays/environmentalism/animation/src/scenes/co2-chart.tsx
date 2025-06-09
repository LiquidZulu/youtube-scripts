import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  Vector2,
  linear,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout, Chart } from "mcas";
import * as colors from "mcas/colors";
import { data } from "../assets/co2";

export default makeScene2D(function* (view) {
  view.fill(colors.bgorange);
  console.log(data);

  const months = new Map(
    [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ].map((v, i) => [i + 1, v]),
  );

  const chart = createRef<Chart>();

  const progress = createSignal(0);

  view.add(
    <Chart
      axisProps={{
        opacity: 0,
      }}
      lineProps={{
        lineWidth: 8,
        stroke: colors.orange500,
        shadowColor: colors.orange500,
        end: progress,
      }}
      ref={chart}
      width={1920}
      height={1080}
      type="line"
      axisLabels={["CO2 in atmosphere", "year"]}
      d={data
        .filter((_, i) => i % 1 == 0)
        .map(({ year, month, deseasonalized }) => [
          `${months.get(+month)}, ${year}`,
          +deseasonalized,
        ])}
    />,
  );

  view.add(
    <Txt.b
      position={createSignal(() => {
        const { x, y } = chart()
          .dataline()
          .getPointAtPercentage(progress()).position;
        return new Vector2(x + 130, y - 50);
      })}
      fontSize={70}
      glow
      fill={colors.orange500}
      fontFamily="mononoki"
      text={createSignal(
        () => data[Math.round(progress() * data.length)].deseasonalized,
      )}
    />,
  );

  yield* progress(1, 10, linear);
});
