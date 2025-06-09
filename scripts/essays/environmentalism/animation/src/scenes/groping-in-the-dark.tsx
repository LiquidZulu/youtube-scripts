import { makeScene2D, Rect, Ray, Img, Video } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
  Vector2,
  delay,
  sequence,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  windows,
  vectorSum,
  flashAround,
  after,
} from "mcas";
import * as colors from "mcas/colors";
import nef from "../assets/1984.mp4";
import telegraph from "../assets/technology/telegraph.png";
import telephone from "../assets/technology/telephone.png";
import mobile from "../assets/technology/mobile.png";
import iphone from "../assets/technology/iphone.png";

export default makeScene2D(function* (view) {
  view.fill(colors.sky200);

  const bb = createRef<Rect>();

  view.add(
    <Rect
      justifyContent="center"
      layout
      ref={bb}
      clip
      width={1920}
      height={1080}
    >
      <Video src={nef} play />
    </Rect>,
  );

  yield* waitFor(0.1);
  yield* waitUntil("tech");

  const imgs = [telegraph, telephone, mobile, iphone];
  const tech = createRefArray<Img>();
  const rays = createRefArray<Ray>();
  const techMargin = 500;

  view.add(
    <Rect
      justifyContent="space-evenly"
      height={1080}
      alignItems="center"
      layout
      direction="column"
      width={1920 / 2}
      position={[1920 / 4, 0]}
    >
      {...imgs.map((src, i) => (
        <Img
          {...(i % 2 == 0
            ? { marginLeft: techMargin }
            : { marginRight: techMargin })}
          ref={tech}
          width={300}
          shadowBlur={10}
          shadowOffset={[4, 8]}
          shadowColor="00000090"
          src={src}
          scale={1}
        />
      ))}
    </Rect>,
  );

  for (let [a, b] of windows(tech, 2)) {
    let f, t;
    const p = 40;
    const py = 50;
    const m = techMargin;

    if (a.margin().left == techMargin) {
      f = vectorSum(a.bottomLeft(), new Vector2(m - p, -py));
      t = vectorSum(b.topRight(), new Vector2(m + p, py));
    } else {
      f = vectorSum(a.bottomRight(), new Vector2(m + p, -py));
      t = vectorSum(b.topLeft(), new Vector2(m - p, py));
    }

    view.add(
      <Ray
        ref={rays}
        end={0}
        from={f}
        to={t}
        lineWidth={12}
        endArrow
        stroke="white"
      />,
    );
  }

  for (let t of tech) {
    t.scale(0);
  }

  yield* all(
    bb().width(1920 / 2, 1),
    bb().position([-1920 / 4, 0], 1),
    delay(
      0.6,
      all(
        sequence(0.3, ...tech.map((t) => popin(() => t))),
        delay(0.15, sequence(0.3, ...rays.map((ray) => ray.end(1, 1)))),
      ),
    ),
  );

  yield* waitUntil("both cases");

  const indicationWidth = 12;
  const cases = createRefArray<Rect>();

  view.add(
    <Rect
      ref={cases}
      width={1920 / 2 - indicationWidth}
      height={1080 - indicationWidth}
      position={[-1920 / 4, 0]}
    />,
  );

  view.add(
    <Rect
      ref={cases}
      width={1920 / 2 - indicationWidth}
      height={1080 - indicationWidth}
      position={[1920 / 4, 0]}
    />,
  );

  const grope = createRef<Txt>();

  view.add(
    <Rect shadowBlur={8} shadowColor="000000aa" shadowOffsetY={6}>
      <Txt
        ref={grope}
        position={[0, -480]}
        fontWeight={900}
        fontSize={120}
        fontFamily="oswald"
        fill="white"
        stroke="black"
        lineWidth={4}
      />
    </Rect>,
  );

  yield* all(
    after("groping", grope().text(`"GROPING IN THE DARK"`, 1)),
    sequence(
      0.1,
      ...cases.map((c) =>
        flashAround(() => c, 1.4, 0.4, {
          modLineWidth: createSignal(indicationWidth),
          color: colors.green500,
        }),
      ),
    ),
  );

  yield* waitFor(0.4);
  yield* fadeout(grope);
  yield* waitUntil("end");
});
