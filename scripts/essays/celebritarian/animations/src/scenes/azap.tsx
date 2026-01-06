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
  after,
  flash,
} from "mcas";
import * as colors from "mcas/colors";
import page from "../assets/azap.png";

export default makeScene2D(function* (view) {
  const initialPos = 5362;
  const pos = createSignal(view.height());

  view.add(
    <Rect
      position={() => [0, initialPos + pos()]}
      layout
      justifyContent="center"
      width={view.width}
      fill="black"
    >
      <Img src={page} width="80%" />
    </Rect>,
  );

  yield* pos(0, 1);
  yield* after("MIC", pos(-5700, 1));

  const indications = createRefArray<Rect>();

  view.add(
    <Rect ref={indications} width="80%" height={500} position={[0, -80]} />,
  );

  yield* after(
    "indicate MIC",
    flash(() => indications[indications.length - 1], "red"),
  );

  view.add(
    <Rect
      ref={indications}
      fill="red"
      opacity={0}
      width={1380}
      height={100}
      position={[-165, -235]}
    />,
  );

  yield* after(
    "dismantle the MIC",
    flash(() => indications[indications.length - 1], "red"),
  );

  view.add(
    <Rect
      ref={indications}
      fill="red"
      opacity={0}
      width={1180}
      height={100}
      position={[-100, -135]}
    />,
  );

  yield* after(
    "ICE",
    flash(() => indications[indications.length - 1], "red"),
  );

  view.add(
    <Rect
      ref={indications}
      fill="red"
      opacity={0}
      width={500}
      height={100}
      position={[750, -135]}
    />,
  );

  yield* after(
    "DOT",
    flash(() => indications[indications.length - 1], "red"),
  );

  yield* after("Pro-Free Speech and Anti-Censorship", pos(-6200, 1));

  view.add(
    <Rect ref={indications} width="80%" height={600} position={[0, -20]} />,
  );

  yield* after(
    "indicate freeze peach",
    flash(() => indications[indications.length - 1], "red"),
  );

  yield* after("borders", pos(-8700, 1));

  view.add(
    <Rect ref={indications} width="80%" height={460} position={[0, -35]} />,
  );

  yield* after(
    "indicate borders",
    flash(() => indications[indications.length - 1], "red"),
  );

  view.add(
    <Rect
      ref={indications}
      fill="red"
      opacity={0}
      width={540}
      height={100}
      position={[-430, 10]}
    />,
  );

  view.add(
    <Rect
      ref={indications}
      fill="red"
      opacity={0}
      width={410}
      height={100}
      position={[-1008, 10]}
    />,
  );

  yield* after(
    "foreign interests",
    flash(() => indications[indications.length - 2], "red"),
    after(
      "exploitation",
      flash(() => indications[indications.length - 1], "red"),
    ),
  );

  yield* after("tariffs", pos(-9200, 1));

  view.add(
    <Rect ref={indications} width="80%" height={380} position={[0, -75]} />,
  );

  yield* after(
    "indicate tariffs",
    flash(() => indications[indications.length - 1], "red"),
  );

  yield* waitUntil("end");
});
