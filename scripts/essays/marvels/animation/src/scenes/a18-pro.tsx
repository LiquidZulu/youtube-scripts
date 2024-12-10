import {
  makeScene2D,
  Rect,
  Ray,
  Img,
  Circle,
  Node,
  Line,
  Video,
  VideoProps,
} from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
  spring,
  useRandom,
  loopUntil,
  loopFor,
  linear,
  loopUntil,
  easeInCubic,
  Reference,
  PossibleVector2,
  loop,
  SmoothSpring,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  ShakeSpring,
  vectorSum,
  getLocalPos,
  flashAround,
  SquigglyBorder,
  i,
  generateTxt,
  TRichText,
} from "mcas";
import * as colors from "mcas/colors";
import motherboard from "../assets/motherboard.png";
import appleImg from "../assets/apple.png";
import brainImg from "../assets/brain.png";
import cpuImg from "../assets/cpu.jpg";
import thumbnail from "../assets/thumb.png";
import moonImg from "../assets/moon.png";
import sunImg from "../assets/sun.png";
import tsmc from "../assets/tsmc-plant.png";
import waferImg from "../assets/wafer.png";
import handleImg from "../assets/handle.png";
import {
  waferProcess,
  waferPostProcess,
  metrology,
  full,
} from "../assets/semiconductor-construction";
import glassVid from "../assets/b-roll/glass.mp4";
import microfabVid from "../assets/b-roll/microfab.mp4";
import shippingVid from "../assets/b-roll/shipping.mp4";
import jobsVid from "../assets/b-roll/steve-jobs.mp4";
import religionImgs from "../assets/religions";
import earthImg from "../assets/earth.svg";
import _ from "lodash";
import wallpaper from "../assets/wallpaper.webp";

export default makeScene2D(function* (view) {
  view.fill(colors.fuchsia999);
  const random = useRandom();

  const mobo = createRef<Img>();
  const a18 = createRef<Rect>();

  view.add(
    <Img
      ref={mobo}
      src={motherboard}
      width={361}
      height={758}
      shadowColor="black"
      shadowBlur={80}
    />,
  );

  view.add(
    <Rect
      alignItems="center"
      justifyContent="center"
      layout
      direction="column"
      ref={a18}
      opacity={0}
      width={420}
      height={420}
      fill={colors.zinc950}
      radius={8}
      shadowBlur={50}
      shadowColor={colors.fuchsia500}
    >
      <Rect gap={12} justifyContent="end">
        <Img src={appleImg} width={90} height={90} />
        <Txt
          fontWeight={600}
          fontSize={105}
          marginTop={-10}
          fill="white"
          fontFamily="San Francisco Display"
        >
          A18
        </Txt>
      </Rect>
      <Txt
        marginTop={-15}
        fontSize={60}
        fontWeight={700}
        fill="white"
        fontFamily="San Francisco Display"
      >
        PRO
      </Txt>
    </Rect>,
  );

  const microchips = createRefArray<Rect>();

  view.add(
    <Rect>
      <Rect ref={microchips} width={30} height={30} position={[-38, -330]} />
      <Rect ref={microchips} width={36} height={36} position={[1, -335]} />
      <Rect ref={microchips} width={24} height={12} position={[33, -347]} />
      <Rect ref={microchips} width={35} height={17} position={[69, -349]} />
      <Rect ref={microchips} width={35} height={54} position={[121, -305]} />
      <Rect ref={microchips} width={35} height={50} position={[121, -249]} />
      <Rect ref={microchips} width={19} height={28} position={[65, -163]} />
      <Rect ref={microchips} width={19} height={21} position={[92, -163]} />
      <Rect ref={microchips} width={18} height={29} position={[91, -134]} />
      <Rect ref={microchips} width={18} height={34} position={[91, -98]} />
      <Rect ref={microchips} width={36} height={18} position={[123, -160]} />
      <Rect ref={microchips} width={18} height={21} position={[143, -85]} />
      <Rect ref={microchips} width={16} height={16} position={[141, -64]} />
      <Rect ref={microchips} width={26} height={128} position={[71, -5]} />
      <Rect ref={microchips} width={26} height={36} position={[104, -52]} />
      <Rect ref={microchips} width={28} height={43} position={[103, 36]} />
      <Rect ref={microchips} width={20} height={32} position={[111, 100]} />
      <Rect ref={microchips} width={28} height={54} position={[136, 87]} />
      <Rect ref={microchips} width={80} height={80} position={[76, 320]} />
      <Rect ref={microchips} width={54} height={30} position={[-1, 346]} />
      <Rect ref={microchips} width={70} height={68} position={[-87, 314]} />
    </Rect>,
  );

  yield* waitUntil("microchips");

  yield* all(
    ...microchips.map((x, i) =>
      chain(
        waitFor(0.03 * i),
        flashAround(() => x),
      ),
    ),
  );

  yield* waitUntil("spin");
  yield* all(
    mobo().rotation(360 * 3, 1),
    mobo().opacity(0, 1),
    mobo().scale(0, 1),
    a18().rotation(360 * 3, 1),
    a18().opacity(1, 1),
    a18().scale(0).scale(1, 1),
  );

  // The iPhone 16 Pro contains dozens
  // of individual microchips with separate
  // functions that require their own particular
  // considerations in construction, the most
  // important is called the A18 Pro; it is the
  // brain of the phone. This one microchip contains
  // more than 20 billion[fn:3] nanoscopic transistors
  // capable of performing trillions[fn:4] of computations
  // every second and it is crammed into a space about
  // the size of your thumbnail.[fn:5]

  yield* waitUntil("brain");
  const brain = createRef<Img>();

  view.add(
    <Img
      ref={brain}
      shadowColor="#21FFAA"
      shadowBlur={20}
      zIndex={-1}
      src={brainImg}
      height={900}
    />,
  );

  yield* chain(
    all(
      brain().scale(0).scale(1, 1),
      chain(
        waitFor(0.48),
        spring(ShakeSpring(0.005), 1, 1, 0.001, (v) => {
          a18().scale(v);
        }),
      ),
    ),
    waitUntil("transistors"),
  );

  const mini = createRef<Circle>();
  const maxi = createRef<Circle>();
  const zoomRays = createRefArray<Ray>();

  view.add(
    <Circle
      ref={maxi}
      zIndex={2}
      position={[546, -244]}
      width={512}
      height={512}
      clip
      lineWidth={16}
      stroke="red"
    >
      <Img src={cpuImg} />
    </Circle>,
  );

  view.add(
    <Ray
      ref={zoomRays}
      lineWidth={4}
      stroke="red"
      from={[164, -142]}
      to={[482, -357]}
    />,
  );
  view.add(
    <Ray
      ref={zoomRays}
      lineWidth={4}
      stroke="red"
      from={[164, -142]}
      to={[546, -114]}
    />,
  );

  view.add(
    <Circle
      ref={mini}
      zIndex={2}
      position={[164, -142]}
      width={512}
      height={512}
      clip
      lineWidth={16}
      stroke="red"
    >
      <Img src={cpuImg} />
    </Circle>,
  );

  yield* all(
    brain().opacity(0, 1),
    mini().scale(0).scale(0.01, 1),
    maxi().scale(0).scale(0.5, 1),
    ...zoomRays.map((ray) => ray.end(0).end(1, 1)),
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

  yield* waitUntil("computations");

  yield* all(code().opacity(0.5, 1), loopUntil("computations done", doCode));

  yield* all(
    loopFor(1, doCode),
    code().opacity(0, 1),
    mini().scale(0, 1),
    maxi().scale(0, 1),
    ...zoomRays.map((ray) => ray.end(0, 1)),
  );
  code().remove();

  yield* waitUntil("thumbnail");

  const thumb = createRef<Img>();

  view.add(
    <Img
      ref={thumb}
      src={thumbnail}
      height={2000}
      position={[900, 1000]}
      rotation={-30}
      shadowBlur={100}
      shadowColor="black"
    />,
  );

  yield* all(
    thumb().position([500, -200], 1),
    thumb().rotation(0, 1),
    a18().scale(0.5, 1),
    a18().position([-145, 69], 1),
  );

  yield* waitUntil("work day and night");

  // If you could work day and night, making
  // one of these transistors every second
  // with atomic accuracy and no mistakes,
  // it would take you over 600 years to
  // finish just one of these processing units.

  const newBg = createRef<Circle>();
  let currentSunCycle = 0;

  const sunsAndMoons = 6;
  const sunCycle = createSignal(0);
  const sunOpacity = createSignal(0);
  const dayNight = createSignal(
    () => (Math.sin(sunsAndMoons * sunCycle() * (1 * Math.PI) + 2) + 1) / 2,
  );

  view.add(
    <Rect
      ref={newBg}
      zIndex={-1}
      fill={view.fill}
      opacity={createSignal(() => 1 - dayNight())}
      width={1920}
      height={1080}
    />,
  );

  const sunMoon = createRef<Circle>();

  view.add(
    <Circle ref={sunMoon} width={5000} height={5000} position={[0, 2500]} />,
  );

  for (let i = 0; i < sunsAndMoons; ++i) {
    view.add(
      <Img
        opacity={sunOpacity}
        shadowBlur={100}
        shadowColor={i % 2 == 0 ? "#FBC21A" : "#FCD63D"}
        src={i % 2 == 0 ? sunImg : moonImg}
        width={100}
        position={createSignal(() =>
          vectorSum(
            sunMoon().getPointAtPercentage((i / sunsAndMoons + sunCycle()) % 1)
              .position,
            sunMoon().position(),
          ),
        )}
      />,
    );
  }

  function* doSun() {
    yield* all(sunCycle((++currentSunCycle) ** 1.1 / 400, 0.01, linear));
  }

  const years = createRef<Txt>();

  view.add(
    <Txt
      ref={years}
      fill="white"
      fontFamily="Oswald"
      fontSize={120}
      fontWeight={900}
      lineWidth={3}
      stroke="black"
      position={[0, -280]}
    />,
  );

  yield* all(
    thumb().rotation(20, 1),
    thumb().position([1500, -200], 1),
    a18().scale(0, 1),
    chain(waitFor(0.4), all(sunOpacity(1, 1), newBg().fill(colors.sky300, 1))),
    chain(waitUntil("600 years"), years().text("600 YEARS", 1)),
    loopUntil("day night end", doSun),
  );

  yield* all(
    loopFor(1, doSun),
    sunOpacity(0, 1),
    newBg().opacity(0, 1),
    a18().zIndex(2).position([0, 150]).scale(1, 1),
  );

  yield* waitUntil("fabrication plant");

  const circBg = createRef<Circle>();
  const plant = createRef<Img>();
  const wafer = createRef<Rect>();
  const waferNumber = createRef<Txt>();
  const waferRay = createRef<Ray>();
  const waferCount = createSignal(0);

  view.add(
    <Circle ref={circBg} fill={colors.red400} position={a18().position()} />,
  );

  view.add(<Img scale={0} ref={plant} src={tsmc} width={1024} />);

  yield* all(
    years().text("", 1),
    popout(a18),
    chain(waitFor(0.5), popin(plant)),
    circBg().width(2500, 1),
    circBg().height(2500, 1),
  );

  view.fill(circBg().fill());
  circBg().remove();

  // A semiconductor fabrication plant can
  // produce 10s of thousands of wafers per
  // month, each containing about 500 individual
  // A18 chips.

  view.add(
    <Ray
      ref={waferRay}
      lineWidth={16}
      stroke="white"
      toX={200}
      endArrow
      position={[520, 64]}
    />,
  );
  view.add(
    <Rect ref={wafer} alignItems="center" position={[600, 64]}>
      <Img src={waferImg} width={200} />
      <Txt
        ref={waferNumber}
        fill="white"
        fontFamily="oswald"
        fontWeight={900}
        text={createSignal(
          () =>
            waferCount()
              .toFixed(0)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "+",
        )}
        lineWidth={2}
      />
    </Rect>,
  );

  yield* all(
    plant().position([-300, 0], 1),
    plant().width(1000, 1),
    waferRay().end(0).end(1, 1),
    waferRay().position([250, 64], 1),
    popin(wafer),
    waferCount(10000, 1),
  );

  yield* waitUntil("wafer zoom");

  const lens = createRef<Circle>();
  const magnifyingGlass = createRef<Rect>();

  view.add(
    <Rect ref={magnifyingGlass}>
      <Circle
        ref={lens}
        width={325}
        height={325}
        position={[-3, -306]}
        lineWidth={8}
        stroke="black"
      />
      <Img height={512} src={handleImg} position={[0, 100]} />
    </Rect>,
  );

  const bigWafer = createRef<Img>();

  view.add(
    <Node cache>
      <Circle
        fill="black"
        width={lens().width}
        height={lens().height}
        position={createSignal(() => getLocalPos(lens().absolutePosition()))}
      />
      <Img
        ref={bigWafer}
        src={waferImg}
        scale={0.4}
        position={[600, 261]}
        compositeOperation="source-in"
      />
    </Node>,
  );

  yield* all(
    magnifyingGlass().rotation(-70).rotation(-130, 1),
    magnifyingGlass().position([815, -890]).position([890, -180], 1),
  );

  yield* waitUntil("manufacturing chip");

  // Over the course of a few months, each wafer travels
  // between dozens of machines, performing hundreds of
  // separate processes to construct a grid of chips.
  // These chips must then be cut, tested, packaged, and
  // shipped to their final destination. And of course,
  // each fabrication machine is itself based on a highly
  // complex knowledge and requires many thousands of
  // different steps in its construction.

  yield* all(
    popout(plant),
    waferRay().start(1, 1),
    magnifyingGlass().rotation(-70, 1),
    magnifyingGlass().position([815, -890], 0.5),
    popout(wafer),
    popout(bigWafer, bigWafer().scale().x),
    bigWafer().position(wafer().position, 0.2),
    view.fill(colors.emerald500, 1),
  );

  const rayCosmetics = {
    primary: createSignal(colors.violet500),
    secondary: "white",
    radius: 10,
    width: 1728,
  };
  const waferProductionRect = createRef<Rect>();
  let waferLines: [
    Array<{
      wafer: Reference<Img>;
      machine?: Reference<Img>;
    }>,
    Array<{
      wafer: Reference<Img>;
      machine: Reference<Img>;
    }>,
  ] = [[], []];
  const waferTesting = {
    wafer: createRef<Img>(),
    machine: createRef<Img>(),
  };
  const waferRays = [createRefArray<Line>(), createRefArray<Line>()];
  const repeatProcess = createRef<Txt>();

  view.add(<Rect position={[0, 170]} ref={waferProductionRect} />);

  //view.add(<Img src={full} width={1920} scale={0.9} position={[0, -120]} />);

  waferProductionRect().add(
    <Txt
      opacity={0}
      ref={repeatProcess}
      fill={rayCosmetics.secondary}
      fontSize={28}
      position={[300, -330]}
      fontFamily="sans"
    >
      Repeat process for additional layers
    </Txt>,
  );

  const mkWaferRay = (from: [number, number], m?: number) =>
    waferProductionRect().add(
      <Ray
        ref={waferRays[m ? 1 : 0]}
        lineWidth={22}
        endArrow
        arrowSize={20}
        stroke={rayCosmetics.primary}
        from={createSignal(() => [from[0], from[1]])}
        to={createSignal(() => [from[0] + 45 * (m ?? 1), from[1]])}
      />,
    );

  mkWaferRay([-701, -163]);
  mkWaferRay([-511, -163]);
  mkWaferRay([-317, -163]);
  mkWaferRay([-123, -163]);
  mkWaferRay([69, -163]);
  mkWaferRay([265, -163]);
  mkWaferRay([457, -163]);
  mkWaferRay([651, -163]);

  // second
  mkWaferRay([517, 197], -1);
  mkWaferRay([304, 197], -1);
  mkWaferRay([90, 197], -1);
  mkWaferRay([-122, 197], -1);

  waferProductionRect().add(
    <Line
      radius={rayCosmetics.radius}
      ref={waferRays[0]}
      points={[
        [577, -346 + 120],
        [577, -485 + 120],
        [-577, -485 + 120],
        [-577, -346 + 120],
      ]}
      lineWidth={4}
      endArrow
      arrowSize={8}
      stroke={rayCosmetics.secondary}
    />,
  );

  waferProductionRect().add(
    <Line
      radius={rayCosmetics.radius}
      ref={waferRays[0]}
      points={[
        [-500, -236 + 120],
        [-500, -100 + 120],
        [-98, -100 + 120],
      ]}
      lineWidth={4}
      endArrow
      arrowSize={8}
      stroke={rayCosmetics.secondary}
    />,
  );

  waferProductionRect().add(
    <Line
      radius={rayCosmetics.radius}
      ref={waferRays[0]}
      points={[
        [483, -236 + 120],
        [483, -100 + 120],
        [80, -100 + 120],
      ]}
      lineWidth={4}
      endArrow
      arrowSize={8}
      stroke={rayCosmetics.secondary}
    />,
  );

  waferProductionRect().add(
    <Line
      radius={rayCosmetics.radius}
      ref={waferRays[0]}
      points={[
        [-297, -236 + 120],
        [-297, -100 + 120],
      ]}
      lineWidth={4}
      stroke={rayCosmetics.secondary}
    />,
  );

  waferProductionRect().add(
    <Line
      radius={rayCosmetics.radius}
      ref={waferRays[0]}
      points={[
        [280, -236 + 120],
        [280, -100 + 120],
      ]}
      lineWidth={4}
      stroke={rayCosmetics.secondary}
    />,
  );

  waferProductionRect().add(
    <Line
      radius={rayCosmetics.radius}
      ref={waferRays[0]}
      points={[
        [-122, -236 + 120],
        [-122, -100 + 120],
      ]}
      lineWidth={4}
      stroke={rayCosmetics.secondary}
    />,
  );

  waferProductionRect().add(
    <Line
      radius={rayCosmetics.radius}
      ref={waferRays[0]}
      points={[
        [104, -236 + 120],
        [104, -100 + 120],
      ]}
      lineWidth={4}
      stroke={rayCosmetics.secondary}
    />,
  );

  waferProductionRect().add(
    <Line
      radius={rayCosmetics.radius}
      ref={waferRays[1]}
      points={[
        [778, -166 + 120],
        [778, 82 + 120],
        [690, 82 + 120],
      ]}
      endArrow
      arrowSize={8}
      lineWidth={4}
      stroke={rayCosmetics.secondary}
    />,
  );

  for (let [icon, machine] of waferProcess) {
    if (machine) {
      const waferRef = createRef<Img>();
      const machineRef = createRef<Img>();
      waferLines[0].push({
        wafer: waferRef,
        machine: machineRef,
      });
      waferProductionRect().add(
        <Img
          opacity={0}
          ref={waferRef}
          width={rayCosmetics.width}
          src={icon}
        />,
      );
      waferProductionRect().add(
        <Img
          opacity={0}
          ref={machineRef}
          width={rayCosmetics.width}
          src={machine}
        />,
      );
    } else {
      const waferRef = createRef<Img>();
      waferLines[0].push({
        wafer: waferRef,
      });
      waferProductionRect().add(
        <Img
          opacity={0}
          ref={waferRef}
          width={rayCosmetics.width}
          src={icon}
        />,
      );
    }
  }

  for (let [icon, machine] of waferPostProcess) {
    if (machine) {
      const waferRef = createRef<Img>();
      const machineRef = createRef<Img>();
      waferLines[1].push({
        wafer: waferRef,
        machine: machineRef,
      });
      waferProductionRect().add(
        <Img
          opacity={0}
          ref={waferRef}
          width={rayCosmetics.width}
          src={icon}
        />,
      );
      waferProductionRect().add(
        <Img
          opacity={0}
          ref={machineRef}
          width={rayCosmetics.width}
          src={machine}
        />,
      );
    } else {
      const waferRef = createRef<Img>();
      waferLines[1].push({
        wafer: waferRef,
      });
      waferProductionRect().add(
        <Img
          opacity={0}
          ref={waferRef}
          width={rayCosmetics.width}
          src={icon}
        />,
      );
    }
  }

  waferProductionRect().add(
    <Img
      opacity={0}
      ref={waferTesting.wafer}
      width={160}
      src={metrology[0]}
      radius={160}
      position={[-9, 18]}
      shadowBlur={4}
      shadowOffset={[0, 12]}
      shadowColor="#000000ca"
    />,
  );

  waferProductionRect().add(
    <Img
      opacity={0}
      ref={waferTesting.machine}
      width={rayCosmetics.width}
      src={metrology[1]}
    />,
  );

  for (let ray of waferRays[0]) {
    ray.end(0);
  }
  for (let ray of waferRays[1]) {
    ray.end(0);
  }

  yield* all(
    chain(waitFor(0.5), repeatProcess().opacity(1, 1)),
    chain(
      waitFor(0.1 * waferRays.length + 1),
      all(
        waferTesting.wafer().opacity(1, 1),
        chain(waitFor(0.1), waferTesting.machine().opacity(1, 1)),
      ),
    ),
    ...waferRays[0].map((ray, i) => chain(waitFor(0.1 * i), ray.end(1, 1))),
    ...waferLines[0].map(({ wafer, machine }, i) =>
      chain(
        waitFor(0.1 * i),
        machine
          ? all(
              wafer().opacity(1, 1),
              chain(waitFor(0.1), machine().opacity(1, 1)),
            )
          : wafer().opacity(1, 1),
      ),
    ),
  );

  yield* waitUntil("manufacturing part dos");

  yield* all(
    waferProductionRect().position([0, -10], 1),
    ...waferRays[1].map((ray, i) => chain(waitFor(0.1 * i), ray.end(1, 1))),
    ...waferLines[1].map(({ wafer, machine }, i) =>
      chain(
        waitFor(0.1 * i),
        machine
          ? all(
              wafer().opacity(1, 1),
              chain(waitFor(0.1), machine().opacity(1, 1)),
            )
          : wafer().opacity(1, 1),
      ),
    ),
  );

  const machineIndications = createRefArray<Rect>();

  view.add(
    <Rect
      ref={machineIndications}
      position={[-569, -32]}
      width={53}
      height={64}
    />,
  );

  view.add(
    <Rect
      ref={machineIndications}
      position={[-398, -36]}
      width={53}
      height={82}
    />,
  );

  view.add(
    <Rect
      ref={machineIndications}
      position={[-203, -39]}
      width={89}
      height={76}
    />,
  );

  view.add(
    <Rect
      ref={machineIndications}
      position={[-203, -39]}
      width={89}
      height={76}
    />,
  );

  view.add(
    <Rect
      ref={machineIndications}
      position={[-114, 59]}
      width={48}
      height={54}
    />,
  );

  view.add(
    <Rect
      ref={machineIndications}
      position={[74, -78]}
      width={48}
      height={54}
    />,
  );

  view.add(
    <Rect
      ref={machineIndications}
      position={[192, -36]}
      width={48}
      height={82}
    />,
  );

  view.add(
    <Rect
      ref={machineIndications}
      position={[391, -36]}
      width={64}
      height={68}
    />,
  );

  view.add(
    <Rect
      ref={machineIndications}
      position={[575, -45]}
      width={64}
      height={76}
    />,
  );

  view.add(
    <Rect
      ref={machineIndications}
      position={[608, 330]}
      width={48}
      height={70}
    />,
  );

  view.add(
    <Rect
      ref={machineIndications}
      position={[398, 331]}
      width={48}
      height={82}
    />,
  );

  view.add(
    <Rect
      ref={machineIndications}
      position={[176, 332]}
      width={86}
      height={82}
    />,
  );

  view.add(
    <Rect
      ref={machineIndications}
      position={[-30, 332]}
      width={64}
      height={64}
    />,
  );

  view.add(
    <Rect
      ref={machineIndications}
      position={[-241, 330]}
      width={64}
      height={64}
    />,
  );

  yield* waitUntil("indicate machines");

  yield* all(
    ...machineIndications.map((machine, i) =>
      chain(
        waitFor(0.05 * i),
        flashAround(() => machine),
      ),
    ),
  );

  yield* waitUntil("millions upon millions of individuals");

  const vidGrid = {
    hGap: 230,
    vGap: 128,
    ref: createRef<Rect>(),
  };

  const vids: Array<
    {
      props: VideoProps & { src: string; ref: Reference<Video> };
      border: Reference<SquigglyBorder>;
      rect: Reference<Rect>;
      citation: TRichText[];
    }[]
  > = [
    [
      {
        props: {
          src: microfabVid,
          ref: createRef<Video>(),
        },
        border: createRef<SquigglyBorder>(),
        rect: createRef<Rect>(),
        citation: [
          "Intel, ",
          i(
            "The Most Sophisticated Manufacturing Process In The World Inside The Fab",
          ),
        ],
      },
      {
        props: {
          src: glassVid,
          ref: createRef<Video>(),
        },
        border: createRef<SquigglyBorder>(),
        rect: createRef<Rect>(),
        citation: ["Veritasium, ", i("The Most Important Material Ever Made")],
      },
    ],
    [
      {
        props: {
          src: shippingVid,
          ref: createRef<Video>(),
        },
        border: createRef<SquigglyBorder>(),
        rect: createRef<Rect>(),
        citation: [
          "Toby Smith, ",
          i("The Gunhilde Maersk - 4K Time Lapse by Toby Smith"),
        ],
      },
      {
        props: {
          src: jobsVid,
          ref: createRef<Video>(),
        },
        border: createRef<SquigglyBorder>(),
        rect: createRef<Rect>(),
        citation: [
          "John Schroter, ",
          i("Steve Jobs introduces iPhone in 2007"),
        ],
      },
    ],
  ];

  view.add(
    <Rect
      layout
      direction="column"
      gap={vidGrid.vGap}
      ref={vidGrid.ref}
      position={[0, 1080]}
    >
      {...vids.map((row) => (
        <Rect gap={vidGrid.hGap}>
          {...row.map(({ props, citation, rect, border }) => (
            <Rect alignItems="center" direction="column" gap={28} ref={rect}>
              <Rect
                width={1920 * (1 / 3)}
                height={1080 * (1 / 3)}
                shadowOffsetY={15}
                shadowColor="black"
                shadowBlur={25}
              >
                <SquigglyBorder ref={border}>
                  <Video {...props} width={1920 * (1 / 3)} />
                </SquigglyBorder>
              </Rect>
              <Rect gap={6}>
                {generateTxt(citation, { fontSize: 18, fill: colors.zinc800 })}
              </Rect>
            </Rect>
          ))}
        </Rect>
      ))}
    </Rect>,
  );

  const squigGrid = createRef<Rect>();

  view.add(
    <Rect
      layout
      direction="column"
      ref={squigGrid}
      gap={vidGrid.vGap}
      position={vidGrid.ref().position}
    />,
  );

  yield* all(
    view.fill(colors.rose300, 2),
    chain(waitFor(0.5), repeatProcess().opacity(0, 1)),
    chain(
      waitFor(0.1 * waferRays.length + 1),
      all(
        waferTesting.wafer().opacity(0, 1),
        chain(waitFor(0.1), waferTesting.machine().opacity(0, 1)),
      ),
    ),
    ...waferRays[0]
      .reverse()
      .map((ray, i) => chain(waitFor(0.1 * i), ray.start(1, 1))),
    ...waferLines[0].map(({ wafer, machine }, i) =>
      chain(
        waitFor(0.1 * i),
        machine
          ? all(
              wafer().opacity(0, 1),
              chain(waitFor(0.1), machine().opacity(0, 1)),
            )
          : wafer().opacity(0, 1),
      ),
    ),
    chain(
      waitFor((waferLines[0].length + 1) * 0.1),
      all(
        ...waferLines[1].map(({ wafer, machine }, i) =>
          chain(
            waitFor(0.1 * i),
            machine
              ? all(
                  wafer().opacity(0, 1),
                  chain(waitFor(0.1), machine().opacity(0, 1)),
                )
              : wafer().opacity(0, 1),
          ),
        ),

        ...waferRays[1]
          .reverse()
          .map((ray, i) => chain(waitFor(0.1 * i), ray.start(1, 1))),
      ),
    ),
  );
  waferProductionRect().remove();

  for (let row of vids) {
    for (let { props } of row) {
      props.ref().play();
    }
  }

  yield* all(
    loopUntil("religions", () =>
      all(...vids.flat().map(({ border }) => border().wiggle(0.1))),
    ),
    spring(SmoothSpring, 1080, 0, (value) => {
      vidGrid.ref().position([0, value]);
    }),
  );

  // who do not share a belief system, culture,
  // or even a language were able to do it without
  // so much as getting together and coming up with
  // a specific plan of action.
  //
  // belief system: bring in religion icons
  // culture: those icons go into a circle around a globe
  // language: a bunch of greetings in different languages

  const religionsCont = createRef<Rect>();
  const religionsOriginal = createRefArray<Img>();
  const religionsOriginalCont = createRef<Rect>();
  view.add(<Node ref={religionsCont} />);

  religionsCont().add(
    <Rect
      layout
      width={1920 * 0.7}
      wrap="wrap"
      justifyContent="center"
      gap={128}
      ref={religionsOriginalCont}
    >
      {...religionImgs.map((religion) => (
        <Img src={religion} ref={religionsOriginal} scale={0} />
      ))}
    </Rect>,
  );

  yield* all(
    vidGrid.ref().scale(20, 1),
    chain(
      waitFor(0.3),
      all(
        ...religionsOriginal.map((religion, i) =>
          chain(
            waitFor(0.1 * i),
            popin(() => religion),
          ),
        ),
      ),
    ),
  );

  const orbit = createRef<Circle>();
  const earth = createRef<Img>();
  const rotation = createSignal(0);

  religionsCont().add(<Circle ref={orbit} width={800} height={800} />);

  religionsCont().add(
    <Img
      shadowBlur={50}
      shadowColor="#000000aa"
      shadowOffsetY={40}
      ref={earth}
      src={earthImg}
      width={600}
      height={600}
      scale={0}
    />,
  );

  const religionsNew = createRefArray<Img>();

  for (let religion of religionsOriginal) {
    religionsCont().add(
      <Img
        src={religion.src}
        ref={religionsNew}
        position={getLocalPos(religion.absolutePosition())}
      />,
    );
  }
  religionsOriginalCont().remove();

  function* doOrbit() {
    yield* rotation(rotation() + 0.01, 0.1, linear);
  }

  yield* all(
    loopUntil("language", doOrbit),
    ...religionsNew.map((religion, i, { length }) =>
      chain(
        waitFor(i * 0.01),
        all(
          religion.position(
            createSignal(
              () =>
                orbit().getPointAtPercentage(
                  (i / length + 0.75 + rotation()) % 1,
                ).position,
            ),
            1,
          ),
          religion.scale(0.5, 1),
        ),
      ),
    ),
    earth().scale(1, 1),
  );

  const greetings: Array<string[]> = _.chunk(
    [
      "Hello",
      "¿Qué tal?",
      "Salut",
      "Hallo",
      "Ciao",
      "Olá",
      "Selam",
      "Hej",
      "Привет",
      "Cześć",
    ],
    5,
  );

  const greets = createRefArray<Txt>();

  religionsCont().add(
    <Rect layout gap={1100}>
      {...greetings.map((column) => (
        <Rect alignItems="center" direction="column" gap={90}>
          {...column.map((greeting) => (
            <Txt
              scale={0}
              ref={greets}
              fill="white"
              fontSize={80}
              text={greeting}
            />
          ))}
        </Rect>
      ))}
    </Rect>,
  );

  yield* all(
    loopUntil("iphone", doOrbit),
    ...greets.map((greet, i) =>
      chain(
        waitFor(0.05 * i),
        popin(() => greet),
      ),
    ),
  );

  // No one person enumerated and organised the
  // countless steps required to construct a single
  // iPhone, nor even a single one of the components
  // used in its construction. And nobody could do
  // this; not with all the time and resources in the
  // world at their disposal. So how was it done?

  const iphone = createRef<Rect>();
  const shadow = createRef<Rect>();

  view.add(
    <Rect
      zIndex={-1}
      ref={shadow}
      width={361}
      height={750}
      radius={70}
      shadowBlur={20}
      shadowColor="#000000aa"
      shadowOffsetY={15}
      fill="black"
    />,
  );

  mobo().opacity(1).scale(1).shadowBlur(0);

  view.add(
    <Rect
      scale={0}
      stroke="black"
      lineWidth={8}
      ref={iphone}
      width={361}
      height={750}
      radius={70}
    >
      <Img
        ref={iphone}
        src={wallpaper}
        width={361}
        height={750}
        radius={70}
        stroke="black"
      />
      <Rect
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

  yield* all(
    loopFor(1, doOrbit),
    earth().scale(0, 1),
    orbit().width(0, 1),
    orbit().height(0, 1),
    ...religionsNew.map((x) => x.scale(0, 1)),
    ...greets.map((greet, i) =>
      chain(
        waitFor(0.05 * i),
        popout(() => greet),
      ),
    ),
    popin(iphone),
    popin(mobo),
    popin(shadow),
    view.fill(colors.teal950, 1),
  );
  religionsCont().remove();

  yield* waitUntil("components");

  yield* all(
    mobo().position([-50, 0], 1),
    iphone().position([50, 0], 1),
    shadow().width(361 + 100, 1),
  );

  yield* waitUntil("time");

  const clock = createRef<Rect>();
  const innerCircle = createRef<Rect>();
  const nDivisions = 60;
  const divisions = createRefArray<Rect>();

  view.add(
    <Rect ref={clock} zIndex={-1}>
      <Circle width={1000} height={1000} lineWidth={20} stroke="white" />
      <Circle ref={innerCircle} width={930} height={930} />
    </Rect>,
  );

  for (let i = 0; i < nDivisions; ++i) {
    const width = i % 5 == 0 ? 10 : 4;
    const height = i % 5 == 0 ? 20 : 10;
    clock().add(
      <Rect ref={divisions} width={width} height={height} fill="white" />,
    );
  }

  for (let i = 0; i < nDivisions; ++i) {
    const percentage = i / nDivisions;
    divisions[i].position(
      innerCircle().getPointAtPercentage(percentage).position,
    );
    divisions[i].rotation(
      innerCircle().getPointAtPercentage(percentage).tangent.degrees,
    );
  }

  const hour = createRef<Ray>();
  const minute = createRef<Ray>();
  const second = createRef<Ray>();

  const time = createSignal(0);

  const times = {
    hour: createSignal(() => ((2 / 12 + time() / 12) % 1) * 360),
    minute: createSignal(() => ((10 / 12 + time() * 60) % 1) * 360),
    second: createSignal(() => ((27 / 60 + time() * 60 ** 2) % 1) * 360),
  };

  clock().add(
    <Rect ref={hour} height={800}>
      <Ray toY={-360} lineWidth={15} stroke="white" rotation={times.hour} />
    </Rect>,
  );

  clock().add(
    <Rect ref={minute} height={800}>
      <Ray toY={-380} lineWidth={10} stroke="white" rotation={times.minute} />
    </Rect>,
  );

  clock().add(
    <Rect ref={second} height={800}>
      <Ray toY={-400} lineWidth={5} stroke="white" rotation={times.second} />
    </Rect>,
  );

  function* doTime() {
    yield* time(time() + 0.00005, 0.1, linear);
  }

  yield* all(
    iphone().scale(0.6, 1),
    mobo().scale(0.6, 1),
    shadow().scale(0.6, 1),
    popin(() => clock().scale(0)),
    loopUntil("end", doTime),
  );

  yield* all(
    loopFor(1, doTime),
    clock().scale(0, 1),
    shadow().scale(0, 1),
    mobo().scale(0, 1),
    iphone().scale(20, 2),
    mobo().opacity(0, 1),
    chain(waitFor(0.4), iphone().opacity(0, 1)),
    iphone().rotation(360, 2),
  );
});
