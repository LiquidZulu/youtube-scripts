import { makeScene2D, Rect, Ray, Img, Circle, Camera } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  delay,
  waitUntil,
  PossibleVector2,
  Reference,
  spawn,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout, a } from "mcas";
import * as colors from "mcas/colors";
import historyBookImg from "../assets/history-book.png";
import tikImg from "../assets/tik.png";
import { flashAround, SquigglyBorder } from "mcas/lib";
import tikHopTimeline from "../assets/tik-hop-timeline.png";
import hobbesImg from "../assets/hobbes.jpg";

// The theory of concepts that TIK is counting on in his use of historical definitions above all else, is called nominalism. Nominalist arguments have been maintained throughout the history of philosophy, going right back to the Ancient Greeks, but in the context of modern philosophy, the man we must look to in order to understand nominalism is Thomas Hobbes.

// Hobbes comes onto the scene during the renaissance, and was deeply influenced by the new, scientific attitude that was proliferated at the time.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const things = createRefArray<Img | Txt | Circle>();

  view.add(
    <Rect layout direction="column" alignItems="center" gap={32}>
      <Img ref={things} src={tikImg} width={400} />
      <Rect alignItems="center" gap={32}>
        <Img ref={things} src={historyBookImg} width={250} />
        <Txt
          ref={things}
          text="&gt;"
          fill="white"
          fontFamily="oswald"
          fontSize={150}
        />
        <Rect gap={12} paddingTop={12}>
          {a(3).map((_) => (
            <Circle ref={things} width={12} ratio={1} fill={colors.zinc400} />
          ))}
        </Rect>
      </Rect>
    </Rect>,
  );

  for (let thing of things) {
    thing.scale(0);
  }

  yield* all(
    ...things.map((thing, i) =>
      delay(
        0.1 * i,
        popin(() => thing),
      ),
    ),
  );

  yield* waitUntil("nominalism");

  yield* all(
    ...things.map((thing, i) =>
      delay(
        0.1 * i,
        popout(() => thing),
      ),
    ),
  );

  const nominalism = createRef<Txt>();

  view.add(
    <Txt ref={nominalism} fontFamily="oswald" fill="white" fontSize={100}>
      NOMINALISM
    </Txt>,
  );

  yield* fadein(nominalism);

  yield* waitUntil("nominalist arguments");

  const camera = createRef<Camera>();
  const viewport = createRef<Rect>();
  const border = createRef<SquigglyBorder>();

  type TPosition = {
    position: PossibleVector2;
    zoom: number;
  };

  const positions: { [key: string]: TPosition } = {
    base: {
      position: [-350, -300],
      zoom: 0.3,
    },
    ancientGreece: {
      position: [-2000, 0],
      zoom: 1.3,
    },
    hobbes: {
      position: [32, -580],
      zoom: 2.2,
    },
  };

  function gotoPosition({ position, zoom }: TPosition, duration?: number) {
    if (!duration) {
      camera().position(position);
      camera().zoom(zoom);
    } else {
      return all(
        camera().position(position, duration),
        camera().zoom(zoom, duration),
      );
    }
  }

  view.add(
    <Rect
      opacity={1}
      ref={viewport}
      width={1500}
      height={800}
      position={[0, 100]}
      clip
    >
      <Camera ref={camera}>
        <Img src={tikHopTimeline} />
      </Camera>
    </Rect>,
  );

  view.add(
    <SquigglyBorder
      ref={border}
      scale={viewport().scale}
      opacity={viewport().opacity}
      position={viewport().position}
    >
      <Rect size={viewport().size} />
    </SquigglyBorder>,
  );

  const hobbesIndicate = createRef<Rect>();

  view.add(
    <Rect ref={hobbesIndicate} width={260} height={430} position={[0, 110]} />,
  );

  let squiggle = true;

  yield spawn(function* () {
    while (squiggle) {
      yield* border().wiggle();
    }
  });

  gotoPosition(positions.base);

  yield* all(nominalism().position([0, -420], 1), delay(0.4, fadein(viewport)));

  yield* waitUntil("ancient greece");

  yield* gotoPosition(positions.ancientGreece, 1);

  yield* waitUntil("hobbes");

  yield* gotoPosition(positions.hobbes, 1);
  yield* flashAround(hobbesIndicate);

  yield* waitUntil("comes onto the scene");

  const hobbes = createRef<Img>();

  view.add(
    <Img
      ref={hobbes}
      width={190}
      position={[0, 37]}
      src={hobbesImg}
      opacity={0}
    />,
  );

  yield* all(
    hobbes().opacity(1, 0.2),
    hobbes().width(600, 1),
    hobbes().position([0, 80], 1),
    hobbes().shadowColor("#000000aa").shadowBlur(100, 1),
    hobbes().shadowOffset([0, 50], 1),
    fadeout(viewport),
    nominalism().text("RENAISSANCE", 1),
  );

  squiggle = false;

  yield* waitUntil("end");

  yield* all(nominalism().text("", 1), nominalism().position([0, -480], 1));
});
