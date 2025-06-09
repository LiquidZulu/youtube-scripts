import {
  makeScene2D,
  Rect,
  Ray,
  Img,
  Circle,
  Bezier,
  Spline,
} from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
  Vector2,
  Reference,
  linear,
  easeInCubic,
  easeOutCubic,
  spring,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  flashAround,
  ShakeSpring,
} from "mcas";
import * as colors from "mcas/colors";
import chassis from "../assets/iphone-back.png";
import motherboard from "../assets/motherboard.png";
import wallpaper from "../assets/wallpaper.webp";

export default makeScene2D(function* (view) {
  view.fill(colors.rose999);

  const back = createRef<Img>();
  const mobo = createRef<Img>();
  const screen = createRef<Rect>();

  view.add(
    <Img
      ref={back}
      src={chassis}
      position={[-200, 0]}
      width={361}
      height={758}
    />,
  );

  view.add(<Img ref={mobo} src={motherboard} width={361} height={758} />);

  view.add(
    <Rect
      ref={screen}
      position={[200, 0]}
      width={361}
      height={750}
      fill="black"
      radius={70}
    >
      <Img
        src={wallpaper}
        width={361}
        height={750}
        radius={70}
        stroke="black"
        lineWidth={8}
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
    back().position([-250, 0], 1),
    screen().position([250, 0], 1),
    back().scale(0.4, 1),
    mobo().scale(0.4, 1),
    screen().scale(0.4, 1),
  );

  yield* waitUntil("annotate 0");

  const order = [
    createRefArray<Txt>(),
    createRefArray<Txt>(),
    createRefArray<Txt>(),
  ];
  const rays = [
    createRefArray<Ray>(),
    createRefArray<Ray>(),
    createRefArray<Ray>(),
  ];

  view.add(
    <Rect
      alignItems="center"
      position={[624, -250]}
      layout
      gap={128}
      direction="column"
    >
      <Rect gap={64}>
        <Txt ref={order[2]} fontSize={30} fontFamily="cubano" fill="white">
          silica crystals
        </Txt>
        <Txt ref={order[2]} fontSize={30} fontFamily="cubano" fill="white">
          potassium
        </Txt>
      </Rect>
      <Txt ref={order[1]} fontSize={30} fontFamily="cubano" fill="white">
        gorilla glass
      </Txt>
      <Txt ref={order[0]} fontSize={30} fontFamily="cubano" fill="white">
        glass screen
      </Txt>
    </Rect>,
  );

  view.add(
    <Rect
      alignItems="center"
      position={[-624, -250]}
      layout
      gap={128}
      direction="column"
    >
      <Rect gap={64}>
        <Txt ref={order[2]} fontSize={30} fontFamily="cubano" fill="white">
          raw titanium
        </Txt>
        <Txt ref={order[2]} fontSize={30} fontFamily="cubano" fill="white">
          diode material
        </Txt>
      </Rect>
      <Txt ref={order[1]} fontSize={30} fontFamily="cubano" fill="white">
        anodised titanium
      </Txt>
      <Txt ref={order[0]} fontSize={30} fontFamily="cubano" fill="white">
        metal body
      </Txt>
    </Rect>,
  );

  const bottomGap = 64;
  const microchipLine = createRef<Rect>();

  view.add(
    <Rect
      layout
      gap={bottomGap}
      direction="column"
      alignItems="center"
      position={[0, 380]}
    >
      <Txt ref={order[0]} fontSize={30} fontFamily="cubano" fill="white">
        circuit board
      </Txt>
      <Rect gap={64}>
        <Rect alignItems="center" gap={bottomGap} direction="column">
          <Txt ref={order[1]} fontSize={30} fontFamily="cubano" fill="white">
            laminate insulator
          </Txt>
          <Rect gap={64}>
            <Txt ref={order[2]} fontSize={30} fontFamily="cubano" fill="white">
              resin
            </Txt>
            <Txt ref={order[2]} fontSize={30} fontFamily="cubano" fill="white">
              cloth
            </Txt>
          </Rect>
        </Rect>
        <Rect alignItems="center" gap={bottomGap} direction="column">
          <Txt ref={order[1]} fontSize={30} fontFamily="cubano" fill="white">
            copper traces
          </Txt>
          <Txt ref={order[2]} fontSize={30} fontFamily="cubano" fill="white">
            raw copper
          </Txt>
        </Rect>
        <Rect alignItems="center" gap={bottomGap} direction="column">
          <Txt ref={order[1]} fontSize={30} fontFamily="cubano" fill="white">
            glue
          </Txt>
          <Rect gap={64}>
            <Txt ref={order[2]} fontSize={30} fontFamily="cubano" fill="white">
              PVA
            </Txt>
            <Txt ref={order[2]} fontSize={30} fontFamily="cubano" fill="white">
              solvent
            </Txt>
          </Rect>
        </Rect>
        <Rect
          ref={microchipLine}
          alignItems="center"
          gap={bottomGap}
          direction="column"
        >
          <Txt ref={order[1]} fontSize={30} fontFamily="cubano" fill="white">
            microchips
          </Txt>
          <Txt ref={order[2]} fontSize={30} fontFamily="cubano" fill="white">
            silicon wafers
          </Txt>
        </Rect>
        <Rect alignItems="center" gap={bottomGap} direction="column">
          <Txt ref={order[1]} fontSize={30} fontFamily="cubano" fill="white">
            I/O components
          </Txt>
          <Rect gap={64}>
            <Txt ref={order[2]} fontSize={30} fontFamily="cubano" fill="white">
              camera
            </Txt>
            <Txt ref={order[2]} fontSize={30} fontFamily="cubano" fill="white">
              buttons
            </Txt>
            <Txt ref={order[2]} fontSize={30} fontFamily="cubano" fill="white">
              sensors
            </Txt>
          </Rect>
        </Rect>
      </Rect>
    </Rect>,
  );

  const mkRay = (
    from: Vector2 | [number, number],
    to: Vector2 | [number, number],
    ref: Reference<Ray>,
  ) =>
    view.add(
      <Ray
        ref={ref}
        lineWidth={8}
        from={from}
        to={to}
        stroke="white"
        endArrow
        arrowSize={12}
      />,
    );

  const curvedRay = (
    from: [number, number],
    to: [number, number],
    ref: Reference<Ray>,
  ) =>
    view.add(
      <Spline
        ref={ref as any as Reference<Spline>}
        lineWidth={8}
        stroke="white"
        endArrow
        arrowSize={12}
        points={[from, [(from[0] * 7) / 10, to[1]], to]}
      />,
    );

  mkRay([0, 245], [0, 175], rays[0]); // circuit
  mkRay([486, -70], [361, -21], rays[0]); // glass screen
  mkRay([-500, -70], [-350, -21], rays[0]); // metal body

  mkRay([-624, -210], [-624, -118], rays[1]); // anodised
  mkRay([-748, -367], [-688, -300], rays[2]); // titanium
  mkRay([-510, -367], [-560, -300], rays[2]); // diode

  mkRay([624, -210], [624, -118], rays[1]); // gorilla glass
  mkRay([530, -370], [573, -288], rays[2]); // silica
  mkRay([749, -370], [691, -288], rays[2]); // potassium

  curvedRay([607, 342], [118, 277], rays[1]); // io
  mkRay([785, 455], [724, 415], rays[2]); // sensors
  mkRay([605, 455], [605, 415], rays[2]); // buttons
  mkRay([460, 455], [509, 415], rays[2]); // camera

  mkRay([169, 342], [116, 310], rays[1]); // microchips
  mkRay([192, 455], [192, 415], rays[2]); // silicon wafers

  mkRay([-97, 342], [-64, 313], rays[1]); // glue
  mkRay([-49, 455], [-67, 415], rays[2]); // solvent
  mkRay([-167, 455], [-138, 415], rays[2]); // pva

  mkRay([-253, 369], [-116, 303], rays[1]); // copper traces
  mkRay([-388, 455], [-388, 415], rays[2]); // raw copper

  curvedRay([-705, 342], [-121, 272], rays[1]); // laminate insulator
  mkRay([-633, 455], [-671, 415], rays[2]); // cloth
  mkRay([-780, 455], [-745, 415], rays[2]); // resin

  for (let o of order) {
    for (let t of o) {
      t.opacity(0);
    }
  }
  for (let ro of rays) {
    for (let ray of ro) {
      ray.end(0);
    }
  }

  function* annotate(n: number) {
    yield* all(
      ...order[n].map((x, i) =>
        chain(
          waitFor(0.1 * i),
          fadein(() => x),
        ),
      ),
      ...rays[n].map((x, i) => chain(waitFor(0.2 * i), x.end(1, 1))),
    );
  }

  // First, the phone has various components;
  // these components, along with the labour
  // needed to assemble them are called factors
  // of production. But of course, these factors
  // also don't come from nowhere. They require
  // their own factors, and those factors require
  // factors, and so on.

  yield* annotate(0);
  yield* waitUntil("indicate components");
  yield* all(
    ...order[0].map((x, i) =>
      chain(
        waitFor(i * 0.2),
        flashAround(() => x),
      ),
    ),
  );
  yield* waitUntil("indicate labour");
  yield* all(
    ...rays[0].map((ray) =>
      all(
        chain(
          all(ray.lineWidth(10, 0.5), ray.arrowSize(14, 0.5)),
          all(ray.lineWidth(8, 0.5), ray.arrowSize(12, 0.5)),
        ),
        chain(
          ray.stroke(colors.amber500, 1 / 2, easeInCubic),
          ray.stroke(colors.lime500, 1 / 2, linear),
          ray.stroke("white", 1 / 2, easeOutCubic),
        ),
      ),
    ),
  );

  yield* waitUntil("FOP");

  const fop = createRef<Txt>();

  view.add(
    <Txt
      ref={fop}
      position={[0, -350]}
      fill="white"
      fontSize={90}
      fontFamily="oswald"
      textAlign="center"
    >
      FACTORS OF{"\n"}PRODUCTION
    </Txt>,
  );

  yield* fadein(fop);

  yield* waitUntil("annotate 1");
  yield* annotate(1);
  yield* waitUntil("annotate 2");
  yield* annotate(2);

  // You can see how quickly this is getting
  // out of hand, but let's dig even deeper.
  // These chains of inputs being progressively
  // transformed and combined into different goods
  // are called lines of production. Consider
  // just the process used to create the microchips
  // to get an idea of the seemingly impossible
  // intricacy involved.

  yield* waitUntil("chains of inputs");

  enum ChainItem {
    txt,
    ray,
    img,
  }

  const chains: [
    Array<[ChainItem, Txt | Ray | Spline | Img]>,
    Array<[ChainItem, Txt | Ray | Spline | Img]>,
    Array<[ChainItem, Txt | Ray | Spline | Img]>,
  ] = [
    [
      [ChainItem.txt, order[2][2]], // "raw titanium"
      [ChainItem.ray, rays[2][0]], // -> raw titanium
      [ChainItem.txt, order[2][3]], // "diode material"
      [ChainItem.ray, rays[2][1]], // -> diode material
      [ChainItem.txt, order[1][1]], // "anodised titanium"
      [ChainItem.ray, rays[1][0]], // -> anodised titanium
      [ChainItem.txt, order[0][1]], // "metal body"
      [ChainItem.ray, rays[0][2]], // -> metal body
      [ChainItem.img, back()],
    ],
    [
      [ChainItem.txt, order[2][0]], // "silica crystals"
      [ChainItem.ray, rays[2][2]], // -> silica crystals
      [ChainItem.txt, order[2][1]], // "potassium"
      [ChainItem.ray, rays[2][3]], // -> potassium
      [ChainItem.txt, order[1][0]], // "gorilla glass"
      [ChainItem.ray, rays[1][1]], // -> gorilla glass
      [ChainItem.txt, order[0][0]], // "glass screen"
      [ChainItem.ray, rays[0][1]], // -> glass screen
      [ChainItem.img, screen()],
    ],
    [
      [ChainItem.txt, order[2][12]], // "sensors"
      [ChainItem.ray, rays[2][4]], // -> sensors
      [ChainItem.txt, order[2][11]], // "buttons"
      [ChainItem.ray, rays[2][5]], // -> buttons
      [ChainItem.txt, order[1][6]], // "io"
      [ChainItem.ray, rays[1][2]], // -> io
      [ChainItem.txt, order[2][10]], // "camera"
      [ChainItem.ray, rays[2][6]], // -> camera
      [ChainItem.txt, order[0][2]], // "circuit board"
      [ChainItem.ray, rays[0][0]], // -> circuit board
      [ChainItem.img, mobo()],
      [ChainItem.txt, order[2][9]], // "wafers"
      [ChainItem.ray, rays[2][7]], // -> wafers
      [ChainItem.txt, order[1][5]], // "microchips"
      [ChainItem.ray, rays[1][3]], // -> microchips
      [ChainItem.txt, order[2][8]], // "solvent"
      [ChainItem.ray, rays[2][8]], // -> solvent
      [ChainItem.txt, order[2][7]], // "pva"
      [ChainItem.ray, rays[2][9]], // -> pva
      [ChainItem.txt, order[1][4]], // "glue"
      [ChainItem.ray, rays[1][4]], // -> glue
      [ChainItem.txt, order[2][6]], // "raw copper"
      [ChainItem.ray, rays[2][10]], // -> raw copper
      [ChainItem.txt, order[1][3]], // "copper traces"
      [ChainItem.ray, rays[1][5]], // -> copper traces
      [ChainItem.txt, order[2][5]], // "cloth"
      [ChainItem.ray, rays[2][11]], // -> cloth
      [ChainItem.txt, order[2][4]], // "resin"
      [ChainItem.ray, rays[2][12]], // -> resin
      [ChainItem.txt, order[1][2]], // "laminate insulator"
      [ChainItem.ray, rays[1][6]], // -> laminate insulator
    ],
  ];

  yield* all(
    fadeout(fop),
    ...chains.map((ch, i) =>
      chain(
        waitFor(0.2 * i),
        all(
          ...ch.map(([type, item], j) =>
            chain(
              waitFor(0.02 * j),
              (() => {
                switch (type) {
                  case ChainItem.txt:
                    return all(
                      chain(item.glow(0).glow(1, 0.75), item.glow(0, 0.75)),
                      chain(
                        item.fill(colors.amber500, 1 / 2, easeInCubic),
                        item.fill(colors.violet500, 1 / 2, linear),
                        item.fill("white", 1 / 2, easeOutCubic),
                      ),
                    );
                  case ChainItem.ray:
                    return chain(
                      item.stroke(colors.amber500, 1 / 2, easeInCubic),
                      item.stroke(colors.violet500, 1 / 2, linear),
                      item.stroke("white", 1 / 2, easeOutCubic),
                    );
                  case ChainItem.img:
                    return all(
                      chain(
                        item.shadowBlur(50, 0.4),
                        waitFor(1.2),
                        item.shadowBlur(0, 0.4),
                      ),
                      chain(
                        item.shadowColor(colors.amber500, 1, easeInCubic),
                        item.shadowColor(colors.violet500, 1, linear),
                      ),
                    );
                }
              })(),
            ),
          ),
        ),
      ),
    ),
  );

  yield* waitUntil("lines of production");

  const lop = createRef<Txt>();

  view.add(
    <Txt
      ref={lop}
      textAlign="center"
      fontFamily="oswald"
      fill="white"
      fontSize={90}
      position={[0, -350]}
    >
      LINES OF{"\n"}PRODUCTION
    </Txt>,
  );

  yield* fadein(lop);

  yield* waitUntil("just microchips");

  yield* all(
    lop().opacity(0.05, 1),
    ...chains.map((chain) =>
      all(
        ...chain
          .filter(
            ([_, item]: [any, Ray | Spline | Txt | Img]) =>
              item !== order[1][5] &&
              item !== order[2][9] &&
              item !== rays[2][7] &&
              item !== back() &&
              item !== screen() &&
              item !== mobo(),
          )
          .map(([_, item]) => item.opacity(0.05, 1)),
      ),
    ),
    ...[order[1][5], order[2][9]].map((x) => x.glow(1, 1)),
    flashAround(microchipLine),
  );

  yield* waitUntil("end");

  yield* all(
    lop().opacity(0, 1),
    ...chains.map((ch) => all(...ch.map(([_, item]) => item.opacity(0, 1)))),
    back().scale(0.2, 1),
    back().opacity(0, 1),
    screen().scale(0.2, 1),
    screen().opacity(0, 1),
    mobo().opacity(1, 1),
    mobo().scale(1, 1),
    mobo().shadowColor("black").shadowBlur(80, 1),
    view.fill(colors.fuchsia999, 1),
  );
});
