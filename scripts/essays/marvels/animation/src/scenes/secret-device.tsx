import { makeScene2D, Rect, Ray, Img, Circle, Node } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
  Color,
  loop,
  linear,
  loopUntil,
  SmoothSpring,
  spring,
  loopFor,
  useRandom,
  easeInOutCubic,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  shake,
  ShakeSpring,
} from "mcas";
import * as colors from "mcas/colors";
import rock from "../assets/blue-rock.png";
import pcb from "../assets/pcb.png";
import avatar from "../assets/avatar.png";
import { rocket } from "../assets/saturn-v";
import wallpaper from "../assets/wallpaper.webp";
import back from "../assets/iphone-back.png";
import motherboard from "../assets/motherboard.png";

export default makeScene2D(function* (view) {
  view.fill(colors.slate950);
  const random = useRandom();

  const money = createRef<Txt>();
  const amount = createSignal(0);
  view.add(
    <Txt
      glow
      fontFamily="Oswald"
      fontSize={80}
      fill={colors.green500}
      ref={money}
      text={createSignal(() => `$${amount().toFixed(2)}`)}
    />,
  );

  yield* all(fadein(money), amount(40, 1));
  yield* waitUntil("device comes in");

  const question = createRef<Txt>();
  const device = createRef<Rect>();
  const deviceColor = createSignal(new Color(colors.green500));
  const deviceSize = createSignal(300);
  const cols = [
    colors.green500,
    colors.emerald500,
    colors.teal500,
    colors.cyan500,
    colors.sky500,
    colors.blue500,
    colors.indigo500,
    colors.violet500,
    colors.purple500,
    colors.fuchsia500,
    colors.pink500,
    colors.rose500,
    colors.red500,
    colors.orange500,
    colors.amber500,
    colors.yellow500,
    colors.lime500,
  ].map((x) => new Color(x));
  let current = 0;

  view.add(
    <Rect
      ref={device}
      zIndex={-1}
      radius={30}
      width={deviceSize}
      height={deviceSize}
      fill={colors.zinc950}
      shadowBlur={50}
      shadowColor={deviceColor}
    >
      <Txt
        ref={question}
        fill={deviceColor}
        fontSize={190}
        fontFamily="Guildhall Condensed"
        position={[0, 20]}
      >
        ?
      </Txt>
    </Rect>,
  );

  function* doColor() {
    yield* all(
      deviceColor(cols[(++current + 1) % cols.length], 0.5, linear),
      deviceSize(deviceSize() + 5, 0.5, linear),
    );
  }

  yield* all(
    fadein(device),
    money().scale(0, 1),
    loopUntil("material science", doColor),
  );

  // A device that pushes to the very edge
  // of our understanding of material science
  // and nanotechnology.

  const r = createRef<Img>();

  view.add(<Img ref={r} src={rock} width={question().fontSize} opacity={0} />);

  yield* all(
    spring(SmoothSpring, -1, 1, 0.01, (x) => {
      device().scale(1 + (1 - Math.abs(x)));
    }),
    question().rotation(360, 1),
    question().opacity(0, 1),
    r().rotation(360, 1),
    r().opacity(1, 1),
  );

  yield* loopUntil("nanotechnology", doColor);

  const circ = createRef<Circle>();

  view.add(
    <Node cache zIndex={-2}>
      <Circle ref={circ} fill="black" />
      <Img compositeOperation="source-in" src={pcb} opacity={0.05} />
    </Node>,
  );

  yield* all(
    loopUntil("cooperation", doColor),
    circ().width(2200, 1),
    circ().height(2200, 1),
    chain(r().opacity(0, 1), question().opacity(1, 1)),
  );

  yield* all(loopFor(1, doColor), circ().opacity(0, 1));

  const people = createRefArray<Circle>();
  const rays = createRefArray<Ray>();

  const positions = [
    [-400, -250],
    [-749, -461],
    [-716, -135],
    [-789, 288],
    [-456, 79],
    [-500, 410],
    [-178, 358],
    [194, 452],
    [313, 215],
    [657, 427],
    [821, 88],
    [485, 6],
    [707, -232],
    [592, -465],
    [288, -308],
    [-80, -479],
  ] as Array<[number, number]>;

  const pairs = [
    [0, 1],
    [0, 4],
    [1, 2],
    [2, 3],
    [2, 4],
    [3, 4],
    [3, 5],
    [4, 6],
    [5, 6],
    [6, 7],
    [7, 8],
    [7, 9],
    [8, 9],
    [8, 11],
    [9, 10],
    [9, 11],
    [10, 11],
    [10, 12],
    [11, 12],
    [11, 14],
    [12, 13],
    [12, 14],
    [13, 14],
    [14, 15],
    [15, 0],
    [15, 1],
  ];

  for (let pos of positions) {
    view.add(
      <Circle
        scale={0}
        zIndex={2}
        ref={people}
        fill={view.fill}
        width={150}
        height={150}
        position={pos}
      >
        <Img src={avatar} width={120} opacity={0.1} />
      </Circle>,
    );
  }

  for (let [from, to] of pairs) {
    view.add(
      <Ray
        ref={rays}
        end={0}
        from={people[from].position}
        to={people[to].position}
        lineWidth={4}
        stroke={colors.emerald500}
        opacity={0.3}
      />,
    );
  }

  // One that can be constructed only by the
  // cooperation of hundreds of millions of
  // people and which in a single second can
  // perform over 66 times the total combined
  // number of computations of the entire 8-day
  // Apollo 11 mission.

  yield* all(
    loopUntil("computations", doColor),
    ...people.map((person, i) =>
      chain(
        waitFor(0.02 * i),
        popin(() => person),
      ),
    ),
    ...rays.map((ray, i) => chain(waitFor(0.01 * i), ray.end(1, 1))),
  );

  const code = createRef<Txt>();
  const createCode = () => {
    let txt = "";
    for (let i = 0; i < 19; ++i) {
      let row = "";
      for (let j = 0; j < 71; ++j) {
        row += random.nextInt(0, 2);
      }
      txt += `${row}\n`;
    }
    return txt;
  };
  function* doCode() {
    yield* code().text(createCode(), 0.05);
  }

  view.add(
    <Txt
      ref={code}
      zIndex={-2}
      fill={colors.green500}
      opacity={0}
      fontFamily="mononoki"
      text={createCode()}
    />,
  );

  const gt = createRef<Txt>();
  const saturn = createRef<Img>();

  view.add(
    <Txt
      scale={0}
      ref={gt}
      fontSize={200}
      fontFamily="mononoki"
      fill={deviceColor}
    >{`>`}</Txt>,
  );
  view.add(
    <Img
      scale={0}
      ref={saturn}
      src={rocket}
      position={[260, 120]}
      rotation={30}
      height={800}
    />,
  );

  yield* all(
    loopUntil("reveal", function* () {
      yield* all(loopFor(1, doCode), doColor());
    }),
    code().opacity(0.3, 3),
    chain(
      all(
        ...people.map((person, i) =>
          chain(waitFor(0.05 * i), person.scale(0, 1)),
        ),
        ...rays.map((ray, i) => chain(waitFor(0.01 * i), ray.start(1, 1))),
      ),
      all(
        device().position([-400, 0], 1),
        chain(waitFor(0.2), popin(saturn)),
        chain(waitFor(0.4), fadein(gt)),
      ),
    ),
  );

  // This device is called an iPhone.
  // It is surely a marvel of technology
  // and a testament to the enormous power
  // of mankind just as fully as the Saturn
  // V rocket. It might not seem like it,
  // but consider the innumerable steps required
  // to construct just one functioning iPhone.

  yield* loopFor(1, doCode);

  yield* all(
    loopFor(1, doCode),
    code().opacity(0, 1),
    fadeout(gt),
    popout(saturn),
    chain(
      waitFor(0.5),
      all(
        device().position([0, 0], 1, easeInOutCubic),
        device().height(750, 1),
        device().width(361, 1),
        device().radius(70, 1),
        fadeout(question),
      ),
    ),
  );

  const iphone = createRef<Img>();
  const camera = createRef<Rect>();
  const b = createRef<Img>();
  const cont = createRef<Rect>();

  view.add(
    <Img
      zIndex={-2}
      ref={b}
      src={back}
      height={device().height()}
      width={361}
    />,
  );

  view.add(
    <Rect
      ref={cont}
      width={device().width()}
      height={device().height()}
      shadowBlur={device().shadowBlur()}
      shadowColor={device().shadowColor()}
      fill={device().fill()}
      radius={device().radius()}
    >
      <Img
        opacity={0}
        ref={iphone}
        src={wallpaper}
        width={device().width()}
        height={device().height()}
        radius={device().radius()}
        stroke="black"
      />
      <Rect
        opacity={0}
        ref={camera}
        position={[0, -330]}
        width={100}
        height={30}
        radius={20}
        fill="black"
      >
        <Circle
          width={20}
          height={20}
          fill={colors.slate900}
          position={[30, 0]}
          opacity={0.5}
        />
      </Rect>
    </Rect>,
  );
  device().remove();

  yield* all(
    iphone().lineWidth(8, 1),
    iphone().opacity(1, 1),
    camera().opacity(1, 1),
    b().height(b().height() + 8, 1),
    b().position([-200, 0], 1),
  );

  yield* waitUntil("slide out");

  const c = createRef<Circle>();
  const mobo = createRef<Img>();

  view.add(<Circle zIndex={-3} ref={c} fill={colors.rose999} />);

  view.add(
    <Img
      ref={mobo}
      zIndex={-1}
      width={cont().width()}
      height={cont().height() + 8}
      position={cont().position()}
      src={motherboard}
      lineWidth={cont().lineWidth()}
      stroke={cont().stroke()}
    />,
  );

  yield* all(
    cont().shadowBlur(0, 1),
    c().width(2500, 1),
    c().height(2500, 1),
    cont().position([200, 0], 1),
  );

  const ring = createRef<Circle>();

  view.add(<Circle zIndex={-3} ref={ring} lineWidth={100} stroke="white" />);

  yield* waitUntil("marvel");

  yield* all(
    ring().width(2500, 1),
    ring().height(2500, 1),
    chain(
      waitFor(0.4),
      spring(ShakeSpring(0.001), 1, 1, 0.001, (v) => {
        cont().scale(v);
        mobo().scale(v);
        b().scale(v);
      }),
    ),
  );

  yield* waitUntil("end");
});
