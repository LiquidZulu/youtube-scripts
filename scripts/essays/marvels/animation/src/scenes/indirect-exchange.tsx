import {
  makeScene2D,
  Rect,
  Ray,
  Img,
  ImgProps,
  RayProps,
  Node,
  Circle,
  Spline,
} from "@motion-canvas/2d";
import {
  all,
  chain,
  delay,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  Reference,
  waitUntil,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  flashAround,
} from "mcas";
import * as colors from "mcas/colors";
import miis from "../assets/miis";
import carrot from "../assets/carrot.png";
import coin from "../assets/coin.png";
import firewood from "../assets/firewood.png";
import salt from "../assets/salt.png";
import tractor from "../assets/tractor.png";
import pear from "../assets/pear.png";
import thoughtBubble from "../assets/thought-bubble.png";
import objects from "../assets/random-objects";
import chassis from "../assets/iphone-back.png";
import motherboard from "../assets/motherboard.png";
import wallpaper from "../assets/wallpaper.webp";

export default makeScene2D(function* (view) {
  view.fill(colors.teal950);

  const indirectExchange = createRef<Node>();
  view.add(<Node ref={indirectExchange} />);

  type TTrade = {
    from: ImgProps;
    to: ImgProps;
    with: [ImgProps, ImgProps];
    rays: [RayProps, RayProps];
    ref?: Reference<Rect>;
  };

  const mkTrade = (f: string, t: string, w: [string, string]): TTrade => ({
    from: { src: f, ref: createRef<Img>() },
    to: { src: t, ref: createRef<Img>() },
    with: w.map((good) => ({ src: good, ref: createRef<Img>() })) as any as [
      ImgProps,
      ImgProps,
    ],
    rays: [{ ref: createRef<Ray>() }, { ref: createRef<Ray>() }],
    ref: createRef<Rect>(),
  });

  const trades: TTrade[] = [
    mkTrade(miis[0], miis[2], [coin, tractor]),
    mkTrade(miis[0], miis[1], [carrot, pear]),
    mkTrade(miis[0], miis[2], [carrot, tractor]),
    mkTrade(miis[0], miis[2], [salt, tractor]),
    mkTrade(miis[0], miis[3], [carrot, salt]),
    mkTrade(miis[0], miis[4], [carrot, firewood]),
    mkTrade(miis[0], miis[5], [objects[1], objects[0]]),
    mkTrade(miis[0], miis[6], [objects[2], objects[1]]),
    mkTrade(miis[0], miis[7], [objects[3], objects[2]]),
    mkTrade(miis[0], miis[8], [carrot, objects[3]]),
  ];

  const trade = (opts: TTrade) => (
    <Rect layout alignItems="center" gap={64} ref={opts.ref}>
      <Img {...opts.from} height={290} />
      <Rect
        direction="column"
        gap={32}
        alignItems="center"
        justifyContent="center"
      >
        <Img {...opts.with[0]} maxHeight={64} maxWidth={64} />
        <Rect direction="column" gap={64}>
          <Ray
            {...opts.rays[0]}
            lineWidth={18}
            toX={180}
            stroke="white"
            endArrow
          />
          <Ray
            {...opts.rays[1]}
            lineWidth={18}
            toX={-180}
            stroke="white"
            endArrow
          />
        </Rect>
        <Img {...opts.with[1]} maxHeight={64} maxWidth={64} />
      </Rect>
      <Img {...opts.to} height={290} />
    </Rect>
  );

  const indirectExchangeTitle = createRef<Txt>();
  const indirect = createRef<Rect>();

  indirectExchange().add(
    <Rect ref={indirect} layout direction="column" gap={64} alignItems="center">
      <Txt
        ref={indirectExchangeTitle}
        fontFamily="Oswald"
        fill="white"
        fontSize={80}
      >
        INDIRECT EXCHANGE
      </Txt>
      {trade(trades[0])}
    </Rect>,
  );

  function hideTrade(t: TTrade, d?: number) {
    if (!d) {
      t.from.ref().scale(0);
      t.to.ref().scale(0);
      for (let { ref } of t.rays) {
        ref().end(0);
      }
      for (let { ref } of t.with) {
        ref().scale(0);
      }
    }

    return all(
      t.from.ref().scale(0, d ?? 1),
      t.to.ref().scale(0, d ?? 1),
      ...t.rays.map(({ ref }) => ref().start(1, d ?? 1)),
      ...t.with.map(({ ref }) => ref().scale(0, d ?? 1)),
    );
  }

  hideTrade(trades[0]);

  yield* all(
    indirectExchangeTitle().scale(0).scale(1, 1),
    chain(
      waitFor(0.2),
      all(
        trades[0].from.ref().scale(1, 1),
        chain(waitFor(0.1), trades[0].to.ref().scale(1, 1)),
        chain(
          waitFor(0.2),
          all(
            trades[0].rays[0].ref().end(1, 1),
            trades[0].with[0].ref().scale(1, 1),
            chain(
              waitFor(0.1),
              all(
                trades[0].rays[1].ref().end(1, 1),
                trades[0].with[1].ref().scale(1, 1),
              ),
            ),
          ),
        ),
      ),
    ),
  );

  yield* waitUntil("divide");

  const divider = createRef<Ray>();

  view.add(
    <Ray
      end={0}
      ref={divider}
      fromY={-1080 / 2}
      toY={1080 / 2}
      lineWidth={16}
      stroke="white"
    />,
  );

  yield* all(
    indirect().position([1920 / 4, 0], 1),
    chain(waitFor(0.3), divider().end(1, 1)),
  );

  yield* waitUntil("barter");

  const barter = createRef<Node>();
  const barterTitle = createRef<Txt>();
  const barterCont = createRef<Rect>();
  const thoughts = createRefArray<Img>();
  const thoughtObjects = createRefArray<Rect>();
  const thoughtCont = createRef<Rect>();

  view.add(<Node ref={barter} />);

  barter().add(
    <Rect
      position={[-1920 / 4, 183]}
      ref={barterCont}
      layout
      direction="column"
      gap={64}
      alignItems="center"
      justifyContent="center"
      alignContent="center"
    >
      <Txt ref={barterTitle} fontFamily="Oswald" fill="white" fontSize={80}>
        BARTER
      </Txt>
      <Rect ref={thoughtCont} maxHeight={0} gap={160} marginBottom={-50}>
        <Img ref={thoughts} width={300} height={300} src={thoughtBubble}>
          <Rect
            ref={thoughtObjects}
            width={240}
            height={120}
            layout={false}
            position={[-4, -11]}
          />
        </Img>
        <Img ref={thoughts} width={300} height={300} src={thoughtBubble}>
          <Rect
            ref={thoughtObjects}
            width={240}
            height={120}
            layout={false}
            position={[-4, -11]}
          />
        </Img>
      </Rect>
      {trade(trades[1])}
    </Rect>,
  );

  hideTrade(trades[1]);
  for (let thought of thoughts) {
    thought.opacity(0);
  }
  thoughtObjects[0].add(<Img src={pear} width={80} />);
  thoughtObjects[1].add(<Img src={carrot} width={80} />);

  yield* fadein(() => barterTitle().opacity(0));

  yield* waitUntil("carrots for pears");

  yield* all(
    indirect().position([1920, 0], 1),
    divider().position([1920 * (3 / 4), 0], 1),
    barterCont().position([0, 0], 1),
    thoughtCont().maxHeight(500, 1),
    chain(
      waitUntil("John"),
      all(
        trades[1].from.ref().scale(1, 1),
        thoughts[0].opacity(1, 1),
        thoughts[0].scale(0).scale(1, 1),
      ),
    ),
    chain(
      waitUntil("Sally"),
      all(
        trades[1].to.ref().scale(1, 1),
        thoughts[1].opacity(1, 1),
        thoughts[1].scale(0).scale(1, 1),
      ),
    ),
  );

  yield* waitUntil("John gives carrots");

  yield* all(
    thoughts[0].opacity(0, 1),
    thoughts[1].opacity(0, 1),
    trades[1].rays[0].ref().end(1, 1),
    trades[1].with[0].ref().scale(1, 1),
    chain(
      waitUntil("Sally gives pears"),
      all(
        trades[1].rays[1].ref().end(1, 1),
        trades[1].with[1].ref().scale(1, 1),
      ),
    ),
  );

  yield* waitUntil("double coincidence of wants");

  yield* barterTitle().text("DOUBLE COINCIDENCE OF WANTS", 1);

  yield* waitUntil("preferences");

  thoughtObjects[0].removeChildren();
  thoughtObjects[1].removeChildren();

  const johnGt = createRef<Txt>();

  thoughtObjects[0].opacity(1).scale(1);

  thoughtObjects[0].add(
    <Rect
      layout
      gap={32}
      justifyContent="center"
      alignContent="center"
      alignItems="center"
    >
      <Img src={pear} width={80} />
      <Txt ref={johnGt} text="&gt;" fontFamily="Oswald" fill="black" />
      <Img src={carrot} width={80} />
    </Rect>,
  );
  thoughtObjects[1].add(
    <Rect
      layout
      gap={32}
      justifyContent="center"
      alignContent="center"
      alignItems="center"
    >
      <Img src={carrot} width={80} height={80} />
      <Txt text="&gt;" fontFamily="Oswald" fill="black" />
      <Img src={pear} width={80} height={80} />
    </Rect>,
  );

  yield* all(thoughts[0].opacity(1, 1), thoughts[1].opacity(1, 1));

  yield* waitUntil("John reverse preference");

  yield* chain(
    johnGt().rotation(-180, 1),
    all(
      trades[1].rays[0].ref().opacity(0.2, 1),
      trades[1].with[0].ref().opacity(0.2, 1),
    ),
  );

  yield* waitUntil("tractor for carrots");

  barter().add(trade(trades[2]));
  trades[2].ref().position([-7.4, 237]);
  hideTrade(trades[2]);
  trades[2].from.ref().scale(1);
  trades[1].from.ref().opacity(0);

  yield* all(
    trades[1].to.ref().scale(0, 1),
    ...trades[1].rays.map(({ ref }) => ref().start(1, 1)),
    ...trades[1].with.map(({ ref }) => ref().scale(0, 1)),
    barterTitle().text("BARTER", 1),
    thoughts[1].scale(0, 1),
    thoughtObjects[0].opacity(0, 1),
  );

  thoughtObjects[0].removeChildren();
  yield* waitUntil("John thinks tractor");
  thoughtObjects[0].add(<Img src={tractor} width={80} />);
  yield* thoughtObjects[0].opacity(1, 1);

  yield* waitUntil("Doug appears");

  yield* trades[2].to.ref().scale(1).opacity(0).opacity(1, 1);

  yield* waitUntil("attempted trade");

  thoughts[1].scale(1);
  thoughts[1].opacity(0);
  thoughtObjects[1].removeChildren();

  yield* all(
    thoughts[0].opacity(0, 1),
    ...trades[2].rays.map(({ ref }) => ref().end(1, 1)),
    ...trades[2].with.map(({ ref }) => ref().scale(1, 1)),
  );

  yield* waitUntil("Doug refuses");

  yield* all(
    trades[2].rays[1].ref().opacity(0.2, 1),
    trades[2].with[1].ref().opacity(0.2, 1),
  );

  yield* waitUntil("Doug preference");

  // {"x":209.89999389648438,"y":80}

  thoughtObjects[1].add(
    <Rect layout alignItems="center" gap={16}>
      <Img src={carrot} width={80} />
      <Txt text="&gt;" fill="black" fontFamily="Oswald" />
      <Img src={tractor} width={80} />
    </Rect>,
  );

  const crossedOutThought = createRefArray<Ray>();

  thoughtObjects[1].add(
    <Ray
      end={0}
      ref={crossedOutThought}
      lineWidth={6}
      from={[-thoughtObjects[1].width() / 2, -thoughtObjects[1].height() / 2]}
      to={[thoughtObjects[1].width() / 2, thoughtObjects[1].height() / 2]}
      stroke="red"
    />,
  );
  thoughtObjects[1].add(
    <Ray
      end={0}
      ref={crossedOutThought}
      lineWidth={6}
      from={[-thoughtObjects[1].width() / 2, thoughtObjects[1].height() / 2]}
      to={[thoughtObjects[1].width() / 2, -thoughtObjects[1].height() / 2]}
      stroke="red"
    />,
  );

  yield* thoughts[1].opacity(1, 1);

  yield* waitUntil("Doug doesn't prefer that");

  yield* all(
    ...crossedOutThought.map((ray, i) =>
      chain(waitFor(0.2 * i), ray.end(1, 1)),
    ),
  );

  // The way to solve this problem is with /indirect/ exchange.
  // John might know that he can trade his carrots for salt,
  // and that Doug would be willing to trade salt for the tractor.
  // Of course, it might be the case that he /also/ can't directly
  // trade carrots for salt, so he has to first trade the carrots
  // for firewood which he can then use to exchange for salt; and
  // maybe he can't trade carrots for firewood, and so on. Very quickly
  // we could end up in a situation where John must perform dozens of
  // individual trades with different people in town involving products
  // that he knows little about just to get the tractor that he needs.

  yield* waitUntil("carrots for salt");

  yield* all(
    thoughts[1].opacity(0, 1),
    barterTitle().opacity(0, 1),
    trades[2].with[0].ref().opacity(0, 1),
  );

  const manyTrades = createRef<Rect>();

  barter().add(
    <Rect
      ref={manyTrades}
      gap={64}
      position={[-1.5, -825]}
      layout
      direction="column-reverse"
    >
      {trade(trades[3])}
      {trade(trades[4])}
      {trade(trades[5])}
      {trade(trades[6])}
      {trade(trades[7])}
      {trade(trades[8])}
      {trade(trades[9])}
    </Rect>,
  );

  trades[3].ref().opacity(0);
  hideTrade(trades[4]);
  hideTrade(trades[5]);

  yield* all(
    trades[2].with[0].ref().src(salt).opacity(1, 1),
    trades[2].rays[1].ref().opacity(1, 1),
    trades[2].with[1].ref().opacity(1, 1),
    trades[4].from.ref().scale(1, 1),
    trades[4].to.ref().scale(1, 1),
    ...trades[4].rays.map(({ ref }) => ref().end(1, 1)),
    ...trades[4].with.map(({ ref }) => ref().scale(1, 1)),
  );

  trades[2].ref().opacity(0);
  trades[3].ref().opacity(1);

  yield* waitUntil("cant trade carrots for salt");

  yield* trades[4].with[0].ref().opacity(0, 1);
  trades[4].with[0].ref().src(firewood);
  yield* all(
    trades[4].with[0].ref().opacity(1, 1),
    trades[5].from.ref().scale(1, 1),
    trades[5].to.ref().scale(1, 1),
    ...trades[5].rays.map(({ ref }) => ref().end(1, 1)),
    ...trades[5].with.map(({ ref }) => ref().scale(1, 1)),
    manyTrades().position([-1.5, -710], 1),
  );

  yield* waitUntil("many trades");

  yield* trades[5].with[0].ref().opacity(0, 1);
  trades[5].with[0].ref().src(objects[0]);
  yield* trades[5].with[0].ref().opacity(1, 1);

  yield* manyTrades().position([-1.5, 900], 3);

  // These intermediary products that John has no
  // intention of directly using are called media of
  // exchange---they are goods that are acquired for
  // the purpose of trading them with other people.

  const moe = createRef<Txt>();

  barter().add(
    <Txt
      ref={moe}
      opacity={0}
      fontFamily="Oswald"
      fill="white"
      fontSize={80}
      position={[0, -433]}
    >
      MEDIA OF EXCHANGE
    </Txt>,
  );

  yield* waitUntil("media of exchange");

  yield* all(
    ...[
      trades[9].with[1].ref,
      trades[8].with[0].ref,
      trades[8].with[1].ref,
      trades[7].with[0].ref,
    ].map((ref, i) => chain(waitFor(0.1 * i), flashAround(ref))),
  );
  yield* fadein(moe);

  yield* waitUntil("many media of exchange");

  yield* all(
    moe().opacity(0, 1),
    manyTrades().position([0, 0], 1),
    manyTrades().scale(0.4, 1),
  );

  // You can see the problem we face when we have a
  // great many media of exchange, like in the basic
  // barter system. It becomes near impossible for
  // John to predict how many individual exchanges he
  // will have to make, and how much he will have to
  // exchange in each step. This is where money comes in.

  yield* waitUntil("how many exchanges?");

  const pseudoTrades = createRef<Rect>();

  barter().add(<Rect ref={pseudoTrades} width={300} height={1000} />);

  yield* flashAround(pseudoTrades);

  // As our barter system evolves, eventually people
  // will start holding onto more goods that are in high
  // demand because they know that those goods are more
  // able to be exchanged down the line. The end state of
  // such a system would involve a good which is desired
  // by every person in the market, a universal medium of
  // exchange: money.

  yield* waitUntil("money");

  divider().position([0, 0]);
  divider().end(0);
  indirectExchangeTitle().maxHeight(0);
  indirectExchangeTitle().margin([-64, 0, 0, 0]);
  indirectExchangeTitle().opacity(0);

  yield* all(
    manyTrades().position([-1920 / 4, 0], 1),
    delay(0.3, divider().end(1, 1)),
    indirect().position([1920 / 4, 0], 1),
  );

  yield* waitUntil("trades out");

  yield* all(
    ...trades.map((trade, i) => delay(i * 0.05, hideTrade(trade, 1))),
    divider().start(1, 1),
  );
  barter().remove();
  indirectExchange().remove();
  divider().remove();

  const lineOfProduction = createRef<Node>();

  view.add(<Node ref={lineOfProduction} />);

  const back = createRef<Img>();
  const mobo = createRef<Img>();
  const screen = createRef<Rect>();

  lineOfProduction().add(
    <Img
      ref={back}
      src={chassis}
      position={[-250, 0]}
      width={361}
      height={758}
      scale={0}
    />,
  );

  lineOfProduction().add(
    <Img scale={0} ref={mobo} src={motherboard} width={361} height={758} />,
  );

  lineOfProduction().add(
    <Rect
      scale={0}
      ref={screen}
      position={[250, 0]}
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

  lineOfProduction().add(
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

  lineOfProduction().add(
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

  lineOfProduction().add(
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
    lineOfProduction().add(
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
    lineOfProduction().add(
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

  yield* waitUntil("lines of production");

  yield* all(
    back().scale(0.4, 1),
    delay(0.1, mobo().scale(0.4, 1)),
    delay(0.2, screen().scale(0.4, 1)),
    ...[1, 2, 3].map((x, i) => delay(0.1 * x, annotate(i))),
  );

  yield* waitUntil("profit");

  const profitRect = createRef<Rect>();
  const dollarSign = createRefArray<Txt>();

  lineOfProduction().add(
    <Rect
      zIndex={-1}
      layout
      alignItems="center"
      alignContent="center"
      justifyContent="center"
      ref={profitRect}
      wrap="wrap"
      width={1920}
    />,
  );

  for (let i = 0; i < 1539; ++i) {
    profitRect().add(
      <Txt
        ref={dollarSign}
        opacity={0}
        fontFamily="Oswald"
        fill={colors.green500}
      >
        $
      </Txt>,
    );
  }

  yield* all(
    ...dollarSign.map((t, i) =>
      delay((0.001 / 4) * i, chain(t.opacity(0.2, 1), t.opacity(0, 1))),
    ),
  );

  profitRect().remove();

  yield* waitUntil("incentive");

  const incentiveTitle = createRef<Txt>();

  view.add(
    <Txt
      ref={incentiveTitle}
      fontFamily="Oswald"
      fill="white"
      fontSize={80}
      position={[0, -300]}
    >
      INCENTIVE
    </Txt>,
  );

  yield* fadein(incentiveTitle);

  // These incentives have a powerful effect: there
  // are perhaps many thousands of different ways to
  // perform the single step of impregnating the glass
  // screen with potassium to increase its durability.
  // The company that makes the glass routinely experiments
  // with different chemical processes---they arrived
  // at the one they use currently by subtracting the
  // cost of the process from the expected return. This
  // is called economic calculation.

  const ionExchange = createRef<Rect>();

  lineOfProduction().add(
    <Rect ref={ionExchange} width={480} height={230} position={[625, -337]} />,
  );

  yield* waitUntil("ion exchange");

  yield* flashAround(ionExchange);

  yield* waitUntil("remove lop");

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

  const profitEq = createRef<Txt>();

  lineOfProduction().add(
    <Txt
      opacity={0}
      ref={profitEq}
      fontFamily="Oswald"
      fill="white"
      fontSize={120}
    >
      <Txt fill={colors.green200}>PROFIT</Txt> ={" "}
      <Txt fill={colors.cyan200}>RETURN</Txt> -{" "}
      <Txt fill={colors.red200}>COST</Txt>
    </Txt>,
  );

  yield* all(
    ...chains.map((ch, i) =>
      all(
        ...ch.map(([type, item]) => {
          switch (type) {
            case ChainItem.txt:
              return delay(
                0.1 * i,
                fadeout(() => item),
              );
            case ChainItem.ray:
              return delay(0.1 * i, item.start(1, 1));
            case ChainItem.img:
              return delay(0.1 * i, item.opacity(0, 1));
          }
        }),
      ),
    ),
  );

  yield* profitEq().opacity(1, 1);

  yield* waitUntil("economic calculation");

  yield* incentiveTitle().text("ECONOMIC CALCULATION:", 1);

  yield* waitUntil("maximise profit");

  const maxi = createRef<Ray>();

  view.add(
    <Ray
      ref={maxi}
      end={0}
      toY={-54}
      fromY={54}
      lineWidth={16}
      stroke={colors.green500}
      position={[-585, 0]}
      endArrow
    />,
  );

  yield* maxi().end(1, 1);

  yield* waitUntil("end");

  yield* maxi().start(1, 1);
});
