import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  Browser,
  after,
} from "mcas";
import * as colors from "mcas/colors";
import article from "../assets/isaiahs-job.png";

export default makeScene2D(function* (view) {
  const b = createRef<Browser>();
  view.add(
    <Browser
      ref={b}
      hyperlink="https://mises.org/mises-daily/isaiahs-job"
      scrollOffset={9000}
      scrollbarHeight={200}
      scrollbarWidth={20}
      width={view.width}
      height={view.height}
    >
      <Img src={article} width={view.width} />
    </Browser>,
  );

  b().mkHighlight(
    100, //
    [[1570, -3730], 120],
    [[-1800, -3615], 3550],
    [[-1800, -3500], 1620],
  );

  b().mkHighlight(
    100, //
    [[-1480, -3072], 140],
    [[-970, -3072], 2720],
    [[-1800, -2958], 3420],
    [[-1800, -2845], 3480],
    [[-1800, -2730], 3560],
    [[-1800, -2620], 100],
  );

  yield* after(
    "god told prophet",
    b().scroll(0.115, 1),
    after("h0", b().highlight(1, 1)),
  );

  yield* after(
    "dont get the point",
    b().scroll(0.127, 1),
    after("h1", b().highlight(2, 1)),
  );

  yield* waitUntil("end");
});
