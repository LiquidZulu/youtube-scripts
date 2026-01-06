import {
  makeScene2D,
  Rect,
  Ray,
  Img,
  Camera,
  Line,
  Spline,
} from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  PossibleVector2,
  sequence,
  waitUntil,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  fixCamera,
  after,
} from "mcas";
import * as colors from "mcas/colors";

export default makeScene2D(function* (view) {
  view.fill(0);

  const camera = createRef<Camera>();

  // Generate points for the sine wave
  const points: PossibleVector2[] = [];
  const numPoints = 20;
  const startXRad = 0;
  const endXRad = 2 * Math.PI;
  const step = (endXRad - startXRad) / numPoints;
  const scaleX = 2500 / (endXRad - startXRad);
  const amplitude = 800;
  const shiftX = -2500 / 2;

  for (let i = 0; i <= numPoints; i++) {
    const xRad = startXRad + i * step;
    const x = xRad * scaleX;
    const y = amplitude * Math.sin(xRad);
    points.push([x + shiftX, -y]);
  }

  const axesEnd = createSignal(0);
  const sinEnd = createSignal(0);

  const boom = createRef<Spline>();
  const bust = createRef<Spline>();
  const annotations = createRefArray<Txt>();
  const title = createRef<Txt>();

  view.add(
    <Camera ref={camera}>
      <Spline
        ref={boom}
        closed
        points={points.slice(0, numPoints / 2 + 1)}
        fill="red"
        lineWidth={0}
        opacity={0}
        smoothness={0}
      />
      <Spline
        ref={bust}
        closed
        points={points.slice(numPoints / 2, numPoints + 1)}
        fill="red"
        lineWidth={0}
        opacity={0}
        smoothness={0}
      />
      <Spline end={sinEnd} points={points} stroke={"red"} lineWidth={36} />
      <Line
        end={axesEnd}
        points={[
          [0 + shiftX, 0],
          [2600 + shiftX, 0],
        ]}
        stroke={"white"}
        lineWidth={30}
        endArrow
        arrowSize={40}
      />
      <Line
        end={() => 0.5 + axesEnd() / 2}
        start={() => 0.5 - axesEnd() / 2}
        points={[
          [0 + shiftX, -(amplitude + 100)],
          [0 + shiftX, amplitude + 100],
        ]}
        stroke={"white"}
        lineWidth={30}
        endArrow
        startArrow
        arrowSize={40}
      />

      <Rect
        layout
        direction="column"
        position={[shiftX / 2, 320]}
        alignItems="center"
        maxWidth={-shiftX - 100}
        gap={64}
      >
        <Txt
          ref={annotations}
          writeOn={0}
          fontSize={80}
          glow
          fill="white"
          fontFamily="ProggyClean CE Nerd Font"
        >
          boom caused by a white lie.
        </Txt>
        <Txt
          ref={annotations}
          writeOn={0}
          fontSize={80}
          glow
          fill="white"
          fontFamily="ProggyClean CE Nerd Font"
          textWrap
          textAlign="center"
        >
          generating "fiat" goodies eventually reaches a breaking point.
        </Txt>
      </Rect>

      <Rect
        layout
        direction="column"
        position={[-shiftX / 2, -300]}
        alignItems="center"
        maxWidth={-shiftX - 100}
        gap={64}
      >
        <Txt
          ref={annotations}
          writeOn={0}
          fontSize={80}
          glow
          fill="white"
          fontFamily="ProggyClean CE Nerd Font"
          textWrap
          textAlign="center"
        >
          either double-down and simply ignore reality again, or acknowledge the
          error of your ways and rebuild.
        </Txt>
      </Rect>
      <Txt
        ref={title}
        writeOn={0}
        fontFamily="oswald"
        fontSize={250}
        fill="red"
        glow
        uppercase
        position={[0, -1300]}
      >
        the cycle of evasion
      </Txt>
    </Camera>,
  );
  fixCamera(view, camera);

  yield* sequence(0.3, axesEnd(1, 1), sinEnd(1, 1));
  yield* after(
    "boom",
    camera().position([shiftX / 2, 0], 1),
    camera().zoom(1.2, 1),
    boom().opacity(0.3, 1),
    after("white lie", annotations[0].writeOn(1, 1)),
  );
  yield* after("fiat goodies", annotations[1].writeOn(1, 1));
  yield* after(
    "highlight bust",
    bust().opacity(0.3, 1),
    boom().opacity(0, 1),
    camera().position([-shiftX / 2, 0], 1),
    after("two choices", annotations[2].writeOn(1, 1)),
  );

  yield* after(
    "reset camera",
    camera().zoom(0.7, 1),
    camera().position([0, -300], 1),
    bust().opacity(0, 1),
  );

  yield* after("title", title().writeOn(1, 0.6));

  yield* waitUntil("end");
});
