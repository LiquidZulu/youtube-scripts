import { makeScene2D, Rect, Ray, Img, ImgProps } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  Vector2,
  Reference,
  delay,
  sequence,
  spring,
  SmoothSpring,
  linear,
  loopUntil,
  loopFor,
  loop,
  SimpleSignal,
  SimpleVector2Signal,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout, a } from "mcas";
import * as colors from "mcas/colors";
import bg from "../assets/1984/bg.png";
import bigbrother from "../assets/1984/big-brother.png";
import silhouette from "../assets/1984/big-brother-silhouette.png";
import sheeple1 from "../assets/1984/sheeple-1.png";
import sheeple2 from "../assets/1984/sheeple-2.png";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const silhouettePos = new Vector2(0, 250);
  const bbpos = new Vector2(0, 140);

  const sil = createRef<Img>();
  const bb = createRef<Img>();

  view.add(<Img src={bg} />);
  view.add(
    <Img
      ref={sil}
      src={silhouette}
      position={silhouettePos}
      scale={1}
      opacity={0}
    />,
  );
  view.add(<Img ref={bb} src={bigbrother} position={bbpos} />);

  const sheeple = a(3).map(
    (_) =>
      [createRef<Img>(), createRef<Img>()] as [Reference<Img>, Reference<Img>],
  );

  const sheepleProps: (variant?: boolean) => ImgProps = (v) => ({
    shadowBlur: 50,
    shadowColor: "00000090",
    src: !!v ? sheeple1 : sheeple2,
  });

  const sheepleBottom = 350;
  const sheepleWidth = 2932 - 50;
  let tRowY: number[] = [];

  type Position = {
    x: SimpleSignal<number>;
    y: SimpleSignal<number>;
  };

  let rowPositions: [Position, Position][] = [];

  const unwrapPosition = ({ x, y }: Position) =>
    createSignal(() => new Vector2(x(), y()));

  for (let i = 0; i < sheeple.length; ++i) {
    const even = i % 2 == 0;
    const y = sheepleBottom - (sheeple.length - (i + 1)) * 20;
    tRowY.push(y);
    rowPositions.push([
      {
        x: createSignal(sheepleWidth * (+!even - 0.5) * 2),
        y: createSignal(y),
      },
      {
        x: createSignal(0),
        y: createSignal(900),
      },
    ]);

    view.add(
      <Img
        ref={sheeple[i][0]}
        {...sheepleProps(!even)}
        position={unwrapPosition(rowPositions[i][0])}
      />,
    );
    view.add(
      <Img
        ref={sheeple[i][1]}
        {...sheepleProps(!even)}
        position={unwrapPosition(rowPositions[i][1])}
      />,
    );
  }

  function* walk(row: [Position, Position]) {
    const direction = (+(row[0].x() < 0) - 0.5) * 2;

    yield* all(
      row[0].x(0, 10, linear),
      row[1].x(direction * sheepleWidth, 10, linear),
    );

    row[0].x(-direction * sheepleWidth);
    row[1].x(0);
  }

  yield* all(
    loopFor(10 * 5, () => all(...rowPositions.map((sheep) => walk(sheep)))),
    popin(bb),
    delay(
      0.3,
      all(
        sil().position([0, 120]).position(silhouettePos, 0.5),
        sil().opacity(0.5, 0.5),
        sil().scale(1.2, 0.5),
      ),
    ),
    sequence(
      0.1,
      ...rowPositions.map(([_, sheep], i) =>
        spring(SmoothSpring, 900, tRowY[i], 1, (y) => {
          sheep.y(y);
        }),
      ),
    ),
  );
});
