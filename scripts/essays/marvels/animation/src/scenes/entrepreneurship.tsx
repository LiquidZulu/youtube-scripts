import {
  makeScene2D,
  Rect,
  Ray,
  Img,
  Video,
  Latex,
  Line,
  Circle,
  CircleSegment,
  CubicBezier,
  QuadBezier,
  ImgProps,
  RayProps,
} from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
  delay,
  SimpleSignal,
  PossibleColor,
  Reference,
  useRandom,
  loopUntil,
  loopFor,
  linear,
  createRefArray,
  useDuration,
  spring,
  SmoothSpring,
  PlopSpring,
  Color,
  easeInCubic,
  easeInOutBack,
  easeInBack,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  flashAround,
  getLocalPos,
  ArrowList,
  shake,
  commaSeparators,
  SquigglyBorder,
} from "mcas";
import * as colors from "mcas/colors";
import computerImg from "../assets/computer.png";
import stockChart from "../assets/stock-chart.mp4";
import iphone from "../assets/iphone-back.png";
import miis from "../assets/miis";
import cross from "../assets/cross.png";
import steve from "../assets/steve-jobs.png";
import blackberry from "../assets/blackberry.png";
import articleImg from "../assets/nyt-article.png";
import mac from "../assets/mac.png";
import ipod from "../assets/ipod.png";
import nokiaLogo from "../assets/nokia-logo.png";
import blackberryLogo from "../assets/blackberry-logo.png";
import theranosLogo from "../assets/theranos-logo.png";
import blockbusterLogo from "../assets/blockbuster-logo.png";
import nokia from "../assets/nokia.png";
import modBlackberry from "../assets/modern-blackberry.png";
import modiPod from "../assets/ipod-2022.png";
import atlasImg from "../assets/atlas.png";
import writingHand from "../assets/writing-hand.png";
import manualCars from "../assets/lines-of-production/manual-cars.mp4";
import manualFood from "../assets/lines-of-production/manual-food.mp4";
import robotCars from "../assets/lines-of-production/robot-cars.mp4";
import robotFood from "../assets/lines-of-production/robot-food.mp4";
import coin from "../assets/coin.png";
import tractor from "../assets/tractor.png";

export default makeScene2D(function* (view) {
  view.fill(colors.teal950);

  const random = useRandom();

  const economicCalculation = createRef<Txt>();
  const profitEq = createRef<Txt>();
  view.add(
    <Txt
      ref={economicCalculation}
      fontSize={80}
      fill="white"
      fontFamily="oswald"
      position={[0, -300]}
    >
      ECONOMIC CALCULATION:
    </Txt>,
  );

  const ret = createRef<Txt>();
  const cost = createRef<Txt>();

  view.add(
    <Txt ref={profitEq} fontFamily="Oswald" fill="white" fontSize={120}>
      <Txt fill={colors.green200}>PROFIT</Txt> ={" "}
      <Txt ref={ret} fill={colors.cyan200}>
        RETURN
      </Txt>{" "}
      -{" "}
      <Txt ref={cost} fill={colors.red200}>
        COST
      </Txt>
    </Txt>,
  );

  // This work is not quite as mathematical as the
  // profit equation makes it seem, though. For both
  // the cost and the return there is a great deal of
  // uncertainty. You cannot ask a computer to spit
  // out whether or not there will be a silica shortage
  // 10 months down the line and plan accordingly; you
  // can't consult a mathematical theorem to determine
  // how much people will desire some new feature you are
  // implementing; in short, the specific costs and returns
  // that come about from a given product depend upon the
  // uncertain and ever-changing supply of and demand for
  // the product in question.

  yield* waitUntil("indications");

  yield* all(flashAround(cost), delay(0.4, flashAround(ret)));

  yield* waitUntil("economic calculation out");

  yield* all(
    economicCalculation().opacity(0, 1),
    delay(0.3, profitEq().opacity(0, 1)),
  );

  yield* waitUntil("computer");

  const tracker = createRef<Video>();
  const computer = createRef<Rect>();
  const equation = createRef<Latex>();
  const compPlusEq = createRef<Rect>();

  view.add(
    <Rect
      ref={compPlusEq}
      layout
      gap={128}
      alignItems="center"
      width={1920}
      justifyContent="center"
    >
      <Rect opacity={0} ref={computer} width={500} height={425}>
        <Rect layout={false} position={[0, -90]} clip height={200} width={250}>
          <Video loop ref={tracker} src={stockChart} width={380} />
        </Rect>
        <Img layout={false} width={500} src={computerImg} />
      </Rect>
      <Latex
        opacity={0}
        ref={equation}
        fill="white"
        tex={String.raw`\frac{\partial^2 u}{\partial x^2} + 2xy\frac{\partial^2 u}{\partial y^2} + u = 1`}
      />
    </Rect>,
  );

  const crossoutRays = createRefArray<Ray>();

  view.add(
    <Ray
      end={0}
      ref={crossoutRays}
      lineWidth={8}
      stroke={colors.red500}
      from={computer().topLeft}
      to={computer().bottomRight}
    />,
  );
  view.add(
    <Ray
      end={0}
      ref={crossoutRays}
      lineWidth={8}
      stroke={colors.red500}
      from={computer().bottomLeft}
      to={computer().topRight}
    />,
  );
  view.add(
    <Ray
      end={0}
      ref={crossoutRays}
      lineWidth={8}
      stroke={colors.red500}
      from={equation().topLeft}
      to={equation().bottomRight}
    />,
  );
  view.add(
    <Ray
      end={0}
      ref={crossoutRays}
      lineWidth={8}
      stroke={colors.red500}
      from={equation().bottomLeft}
      to={equation().topRight}
    />,
  );

  tracker().play();

  yield* chain(
    fadein(computer),
    all(crossoutRays[0].end(1, 1), delay(0.2, crossoutRays[1].end(1, 1))),
  );

  yield* waitUntil("equation");

  yield* chain(
    fadein(equation),
    all(crossoutRays[2].end(1, 1), delay(0.2, crossoutRays[3].end(1, 1))),
  );

  yield* waitUntil("uncertain supply and demand");

  yield* all(
    computer().size(0, 1),
    computer().scale(0, 1),
    equation().size(0, 1),
    equation().scale(0, 1),
  );

  const supply = createSignal(2381239);
  const demand = createSignal(3289298);
  const supplyDemand = createRef<Rect>();

  type TRowData = [string, SimpleSignal<number, void>, PossibleColor];
  type TRow = { data: TRowData; ray: Reference<Ray>; content: Reference<Rect> };

  const rows: TRow[] = (
    [
      ["supply", supply, colors.violet300],
      ["demand", demand, colors.lime300],
    ] as TRowData[]
  ).map(
    (data) =>
      ({ data, ray: createRef<Ray>(), content: createRef<Rect>() }) as TRow,
  );

  view.add(
    <Rect ref={supplyDemand} layout direction="column" position={[0, 100]}>
      {rows.map(({ data: [name, signal, color], ray, content }) => (
        <Rect alignItems="center" gap={64}>
          <Ray
            ref={ray}
            lineWidth={32}
            arrowSize={38}
            stroke="white"
            toX={128}
            endArrow
          />
          <Rect
            ref={content}
            alignContent="center"
            alignItems="center"
            justifyContent="center"
          >
            <Txt fontSize={120} fontFamily="mononoki" fill={color}>
              {name}
              <Txt fontFamily="sans" fill={colors.zinc500}>
                (
              </Txt>
            </Txt>
            <Img height={124} src={iphone} />
            <Txt fontSize={120} fontFamily="sans" fill={colors.zinc500}>
              ) ={" "}
              <Txt
                fontFamily="mononoki"
                text={createSignal(() => commaSeparators(signal().toFixed(0)))}
              />
            </Txt>
          </Rect>
        </Rect>
      ))}
    </Rect>,
  );

  for (let row of rows) {
    row.ray().end(0);
    row.content().opacity(0);
  }

  function* doSupplyDemand() {
    yield* all(
      supply(supply() + random.nextInt(-100, 100), 1 / 10),
      demand(demand() + random.nextInt(-100, 100), 1 / 10),
    );
  }

  yield* all(
    loopUntil("entrepreneurship", doSupplyDemand),
    profitEq().position([0, -200], 1),
    profitEq().opacity(1, 1),
    delay(
      0.3,
      all(
        ...rows.map(({ ray, content }, i) =>
          delay(0.2 * i, all(ray().end(1, 1), content().opacity(1, 1))),
        ),
      ),
    ),
  );

  // The way to deal with this uncertainty is
  // through the process of entrepreneurship.
  // The entrepreneur makes an educated guess
  // on what the future conditions of the market
  // will be, and adjusts the lines of production
  // under his control accordingly. Importantly:
  // this guessing is not random in the slightest.
  // If any entrepreneur makes a wrong guess, he
  // will be able to discover this by the fact that
  // he is making a loss, rather than a profit. With
  // sufficient accounting, he can track down which
  // areas of his business are responsible for the
  // loss and adjust accordingly.

  const entrepreneurship = createRef<Txt>();

  view.add(
    <Txt
      ref={entrepreneurship}
      fontFamily="oswald"
      fill="white"
      fontSize={120}
    ></Txt>,
  );

  yield* all(
    loopFor(1, doSupplyDemand),
    profitEq().opacity(0, 1),
    supplyDemand().opacity(0, 1),
  );

  yield* entrepreneurship().text("ENTREPRENEURSHIP", 1);

  const list = createRef<ArrowList>();

  yield* entrepreneurship().position([0, -250], 1);

  view.add(
    <ArrowList ref={list} position={[0, 100]}>
      <Txt>
        The entrepreneur makes an educated guess{"\n"}on the future conditions
        of the market.
      </Txt>
      <Txt>
        If any entrepreneur makes a wrong guess,{"\n"}he will be able to
        discover this by the fact{"\n"}that he is making a loss, rather than a
        profit.
      </Txt>
    </ArrowList>,
  );

  yield* list().next();

  yield* waitUntil("second point");

  yield* list().next();

  // Any entrepreneur who fails to respond to the
  // market properly, and remains gung-ho in his
  // wrong decisions will quickly run out of funding
  // and leave the profession. In this way, there
  // is a sort of natural selection that allows only
  // those entrepreneurs who are best at predicting
  // future market conditions to stay managing the
  // lines of production.

  yield* waitUntil("entrepreneur failing to respond to market");

  yield* all(
    view.fill(colors.indigo950, 1),
    fadeout(entrepreneurship),
    delay(
      0.2,
      all(...list().items.map((item, i) => delay(i * 0.2, list().hide(item)))),
    ),
  );

  const downLine = createRef<Line>();
  const funds = createRef<Txt>();

  view.add(
    <Line
      end={0}
      ref={downLine}
      points={[
        [-970, -545],
        [-760, -345],
        [-740, -397],
        [-608, -288],
        [-584, -334],
        [-444, -224],
        [-410, -306],
        [-249, -119],
        [-220, -199],
        [-125, -54],
        [-100, -100],
        [18, 19],
        [44, -14],
        [120, 68],
        [134, 36],
        [251, 141],
        [271, 79],
        [373, 202],
        [397, 161],
        [499, 281],
        [548, 246],
        [662, 400],
        [683, 333],
        [811, 458],
        [852, 418],
        [963, 570],
      ]}
      stroke={colors.red500}
      lineWidth={16}
      endArrow
    />,
  );

  const downLineEnd = createSignal(
    () => downLine().getPointAtPercentage(downLine().end()).position,
  );

  view.add(
    <Txt
      ref={funds}
      fontSize={70}
      fontWeight={900}
      position={createSignal(() => {
        const { x, y } = downLineEnd();
        return {
          x: x + 150,
          y: y,
        };
      })}
      fill={colors.green500}
      glow
      text={createSignal(
        () =>
          `$${((1 - (downLineEnd().y + 1080 / 2 - 100) / 1080) * 50).toFixed(
            1,
          )}k`,
      )}
    />,
  );

  yield* downLine().end(1, useDuration("losing money"), linear);

  yield* all(downLine().opacity(0, 1), funds().opacity(0, 1));

  const paths = createRefArray<Line>();
  const crosses = createRefArray<Img>();
  const mii = createRef<Img>();

  for (let path of [
    [
      [0, 336],
      [0, -23],
      [325, -23],
      [325, -338],
    ],

    [
      [0, 336],
      [0, -23],
      [325, -23],
      [325, -200],
      [-83, -200],
      [-83, -383],
    ],
    [
      [0, 336],
      [0, -23],
      [800, -23],
      [800, 370],
    ],
    [
      [0, 336],
      [0, -23],
      [800, -23],
      [800, 200],
      [300, 200],
    ],
    [
      [0, 336],
      [0, -23],
      [650, -23],
      [650, -480],
    ],
    [
      [0, 336],
      [0, 91],
      [-682, 91],
      [-682, 256],
    ],
    [
      [0, 336],
      [0, 91],
      [-550, 91],
      [-550, -444],
    ],
    [
      [0, 336],
      [0, 91],
      [-550, 91],
      [-550, -250],
      [-205, -250],
    ],
  ].reverse() as [number, number][][]) {
    view.add(
      <Line
        ref={paths}
        lineWidth={20}
        endArrow
        arrowSize={30}
        stroke="white"
        radius={20}
        points={path}
        end={0}
      />,
    );
  }

  let badPaths = [];

  for (let i = 0; i < paths.length - 1; ++i) {
    view.add(
      <Img
        ref={crosses}
        src={cross}
        position={paths[i].points()[paths[i].points().length - 1]}
        width={100}
        scale={0}
      />,
    );
    badPaths.push({
      path: paths[i],
      cross: crosses[i],
    });
  }

  view.add(<Img ref={mii} src={miis[0]} width={200} position={[0, 350]} />);

  yield* all(
    popin(mii),
    delay(
      0.3,
      all(
        ...paths.map((path, i, { length }) =>
          delay(
            0.2 * i,
            chain(
              path.end(1, 1),
              i == length - 1
                ? path.stroke(colors.green300, 1)
                : all(
                    popin(() => crosses[i]),
                    path.stroke(colors.red300, 1),
                  ),
            ),
          ),
        ),
      ),
    ),
  );

  // Steve Jobs' decision to create the iPhone is a perfect
  // example of the risk-taking involved in good entrepreneurship.
  // At the time, the BlackBerry was seemingly beyond reproach.
  // In that year, it was at a 44% market share, up from 33% just
  // a year before.[fn:7] In the midst of this, Apple spent over
  // $150 million to create the original iPhone[fn:8] and committed
  // its best people to the project:

  yield* waitUntil("steve");

  const steveRef = createRef<Img>();

  view.add(
    <Img
      shadowBlur={30}
      shadowColor="#000000aa"
      shadowOffsetY={25}
      ref={steveRef}
      src={steve}
      height={1200}
      position={[-400, 1100]}
    />,
  );

  yield* all(
    delay(
      0.4,
      spring(SmoothSpring, 1100, 11, 1, (value) => {
        steveRef().position([-400, value]);
      }),
    ),
    popout(mii),
    ...paths.map((path, i, { length }) =>
      delay(
        0.01 * i,
        all(
          path.start(1, 1),
          delay(0.5, i == length - 1 ? all() : popout(() => crosses[i])),
        ),
      ),
    ),
  );

  yield* waitUntil("blackberry");

  const blackberryRef = createRef<Img>();
  const charts = createRefArray<Circle>();
  const segments = createRefArray<Circle>();
  const years = createRefArray<Txt>();

  const chartProgress = createSignal(0);

  const mkChart = (
    year: string | number,
    percentage: number,
    color: PossibleColor,
  ) => (
    <Rect direction="column" alignItems="center" gap={16}>
      <Circle
        scale={0}
        ref={charts}
        width={250}
        height={250}
        fill={colors.zinc900}
        shadowColor="#000000aa"
        shadowBlur={50}
      />
      <Txt opacity={0} ref={years} fontFamily="Oswald" fill="white">
        {`${year}`}
      </Txt>
      <Circle
        scale={0}
        ref={segments}
        shadowBlur={70}
        shadowColor={new Color(color).alpha(0.4)}
        position={[0, -36]}
        width={250}
        height={250}
        layout={false}
        fill={color}
        startAngle={-90}
        endAngle={() => percentage * chartProgress() * 360 - 90}
        closed={true}
      />
    </Rect>
  );

  const blackberryCont = createRef<Rect>();

  view.add(
    <Rect
      ref={blackberryCont}
      position={[550, -40]}
      layout
      direction="column"
      alignItems="center"
      gap={96}
    >
      <Img
        ref={blackberryRef}
        shadowBlur={30}
        shadowColor="#000000aa"
        shadowOffsetY={25}
        src={blackberry}
        width={300}
      />
      <Rect alignItems="center" gap={64}>
        {mkChart(2006, 0.33, colors.rose500)}
        {mkChart(2007, 0.44, colors.teal500)}
      </Rect>
    </Rect>,
  );

  const abi = createRef<Txt>();

  view.add(
    <Txt
      ref={abi}
      opacity={0}
      fontSize={18}
      fill={colors.zinc500}
      position={[790, 515]}
    >
      ABI Research, North American market.
    </Txt>,
  );

  yield* popin(blackberryRef);

  yield* waitUntil("market share");

  yield* all(
    ...charts.map((chart, i) =>
      delay(
        0.2 * i,
        popin(() => chart),
      ),
    ),
    ...segments.map((segment, i) =>
      delay(
        0.2 * i,
        popin(() => segment),
      ),
    ),
    ...years.map((year, i) => delay(0.2 * i, year.opacity(1, 1))),
    abi().opacity(1, 1),
    chartProgress(1, 1),
  );

  yield* waitUntil("transition");

  const transProgress = createSignal(0);
  const greenTransision = createRef<Ray>();

  view.add(
    <Ray
      ref={greenTransision}
      zIndex={-1}
      fromY={-1080 / 2}
      toY={1080 / 2}
      lineWidth={() => transProgress() * 1920}
      stroke={colors.emerald999}
    />,
  );

  const milli = createRef<Txt>();

  view.add(
    <Txt
      ref={milli}
      glow
      fill={colors.green500}
      fontFamily="oswald"
      fontSize={100}
    />,
  );

  yield* all(
    steveRef().position([-1600, 11], 1),
    blackberryCont().position([1300, -40], 1),
    abi().opacity(0, 1),
    delay(0.3, transProgress(1, 1)),
    delay(0.5, all(fadein(milli), milli().text("$150 MILLION", 1))),
  );

  view.fill(colors.emerald999);
  greenTransision().remove();

  yield* waitUntil("best people");

  const browser = createRef<Rect>();
  const article = createRef<Img>();
  const scrollBarProgress = createSignal(0);

  view.add(
    <Rect
      ref={browser}
      shadowColor="#000000aa"
      shadowBlur={50}
      shadowOffsetY={25}
      clip
      alignItems="center"
      direction="column"
      layout
      radius={20}
      width={1000}
      height={800}
      fill={colors.zinc900}
    >
      <Rect
        alignItems="center"
        justifyContent="center"
        width={1000}
        height={80}
      >
        <Rect layout={false} position={[-1000 / 2 + 80, 0]}>
          <Rect layout gap={12}>
            {[colors.red500, colors.yellow500, colors.green500].map((color) => (
              <Circle width={20} height={20} fill={color} />
            ))}
          </Rect>
        </Rect>
        <Rect
          shadowBlur={5}
          shadowColor="black"
          radius={5}
          lineWidth={1}
          stroke="black"
          fill={colors.zinc800}
          height={40}
          width={400}
          alignItems="center"
          justifyContent="center"
          paddingLeft={10}
          paddingRight={10}
        >
          <Txt fill="white" fontSize={18}>
            https://www.nytimes.com/2013/10/06/maga...
          </Txt>
        </Rect>
      </Rect>
      <Rect clip height={800 - 80} fill="white" width={1000}>
        <Img
          ref={article}
          layout={false}
          src={articleImg}
          width={1000}
          position={[0, 10653]}
        />
        <Rect
          layout={false}
          height={80}
          radius={10}
          width={10}
          fill={colors.zinc700}
          position={() => [
            500 - 10,
            -(800 - 80) / 2 + 50 + scrollBarProgress() * 610,
          ]}
        />
      </Rect>
    </Rect>,
  );

  yield* all(
    popin(browser),
    delay(
      0.3,
      all(article().position([0, -10300], 1), scrollBarProgress(0.8, 1)),
    ),
  );

  milli().remove();

  const highlights = createRefArray<Ray>();
  const highlightProgress = createSignal(0);

  const mkHighlight = (width: number, y: number, offset?: number) => (
    <Ray
      ref={highlights}
      layout={false}
      lineWidth={35}
      opacity={0.3}
      toX={width}
      stroke={colors.yellow500}
      position={[-430 + (offset ?? 0), y]}
    />
  );

  browser().add(mkHighlight(850, -95));
  browser().add(mkHighlight(750, -52));
  browser().add(mkHighlight(850, -9));
  browser().add(mkHighlight(375, 34));
  browser().add(mkHighlight(436, 162, 418));
  browser().add(mkHighlight(560, 204));

  for (let i = 0; i < highlights.length; ++i) {
    highlights[i].end(() => {
      const progress = highlightProgress();
      const myBand = i / highlights.length;
      if (progress < myBand) return 0;

      return Math.min((progress - myBand) * highlights.length, 1);
    });
    console.log(
      Math.floor(i + 1 / highlights.length),
      i + 1,
      highlights.length,
    );
  }

  yield* highlightProgress(1, 1);

  // The decision to make the iPhone represents what
  // economists call an opportunity cost---and a massive
  // one at that. Opportunity cost refers to the value of
  // all of the opportunities that one gives up by selecting
  // a given course of action. So by spending all of the
  // engineers and money on the iPhone, Apple could not put
  // these resources to other uses. These resources can only
  // be used towards one end at any given time---the cost
  // involved is that no new Macintosh computers could be
  // developed. No new iPods could be devised. No other new
  // products were possible because all the eggs were thrown
  // into the iPhone basket. This represents a gigantic risk.
  // If Jobs had been wrong, Apple very well might have gone
  // the way of the many now-dead businesses from that era.

  yield* waitUntil("opportunity cost");

  yield* popout(browser);

  const oppCost = createRef<Txt>();

  view.add(
    <Txt ref={oppCost} fontFamily="Oswald" fill="white" fontSize={90} />,
  );

  yield* oppCost().text("OPPORTUNITY COST", 1);

  const oppCostSubtitle = createRef<Txt>();

  view.add(
    <Txt
      ref={oppCostSubtitle}
      position={[0, 100]}
      width={800}
      fill={colors.zinc400}
      alignContent="center"
      justifyContent="center"
      textAlign="center"
      textWrap
    />,
  );

  yield* waitUntil("opportunity cost refers to...");

  yield* all(
    oppCost().position([0, -100], 1),
    delay(
      0.3,
      oppCostSubtitle().text(
        "The value of all of the opportunities that one gives up by selecting a given course of action.",
        1,
      ),
    ),
  );

  yield* waitUntil("opportunity cost visualiser");

  const lines = createRefArray<CubicBezier | Ray>();
  const items = createRefArray<Img>();
  const jobs = createRef<Img>();

  view.add(
    <CubicBezier
      end={0}
      ref={lines}
      lineWidth={50}
      stroke="white"
      endArrow
      arrowSize={60}
      p0={[0, 450]}
      p1={[0, 100]}
      p2={[-500, 100]}
      p3={[-500, -300]}
    />,
  );
  view.add(
    <Ray
      end={0}
      ref={lines}
      lineWidth={50}
      stroke="white"
      endArrow
      arrowSize={60}
      fromY={450}
      toY={-300}
    />,
  );
  view.add(
    <CubicBezier
      end={0}
      ref={lines}
      lineWidth={50}
      stroke="white"
      endArrow
      arrowSize={60}
      p0={[0, 450]}
      p1={[0, 100]}
      p2={[500, 100]}
      p3={[500, -300]}
    />,
  );

  view.add(
    <Img
      scale={0}
      ref={jobs}
      src={steve}
      position={[0, 300]}
      height={400}
      shadowBlur={20}
      shadowColor="#000000aa"
      shadowOffsetY={10}
    />,
  );
  view.add(
    <Img
      scale={0}
      ref={items}
      src={mac}
      height={200}
      position={[-500, -425]}
      shadowBlur={20}
      shadowColor="#000000aa"
      shadowOffsetY={10}
    />,
  );
  view.add(
    <Img
      scale={0}
      ref={items}
      src={iphone}
      height={200}
      position={[0, -425]}
      shadowBlur={20}
      shadowColor="#000000aa"
      shadowOffsetY={10}
    />,
  );
  view.add(
    <Img
      scale={0}
      ref={items}
      src={ipod}
      height={200}
      position={[500, -425]}
      shadowBlur={20}
      shadowColor="#000000aa"
      shadowOffsetY={10}
    />,
  );

  yield* all(
    fadeout(oppCost),
    delay(0.2, fadeout(oppCostSubtitle)),
    delay(
      0.4,
      all(
        popin(jobs),
        delay(
          0.2,
          all(
            ...lines.map((line, i) =>
              delay(
                0.1 * i,
                all(
                  line.end(1, 1),
                  delay(
                    0.8,
                    popin(() => items[i]),
                  ),
                ),
              ),
            ),
          ),
        ),
      ),
    ),
  );

  // a given course of action. So by spending all of the
  // engineers and money on the iPhone, Apple could not put
  // these resources to other uses. These resources can only
  // be used towards one end at any given time---the cost
  // involved is that no new Macintosh computers could be
  // developed. No new iPods could be devised. No other new
  // products were possible because all the eggs were thrown
  // into the iPhone basket. This represents a gigantic risk.
  // If Jobs had been wrong, Apple very well might have gone
  // the way of the many now-dead businesses from that era.

  const circleIndicate = createRef<Circle>();

  view.add(
    <Circle
      ref={circleIndicate}
      zIndex={-1}
      width={0}
      height={0}
      lineWidth={30}
      stroke="white"
      position={items[1].position}
    />,
  );

  yield* waitUntil("indicate iphone");

  yield* all(
    delay(
      0.3,
      shake((val) => {
        items[1].scale(1 + val);
      }, 0.01),
    ),
    circleIndicate().width(500, 1),
    circleIndicate().height(500, 1),
    delay(0.2, circleIndicate().opacity(0, 0.5)),
  );

  yield* waitUntil("can only be used for one end");

  const endRect = createRef<Rect>();

  view.add(
    <Rect ref={endRect} width={200} height={600} position={[0, -230]} />,
  );

  yield* flashAround(endRect);

  yield* waitUntil("no macs");

  yield* all(lines[0].opacity(0.2, 1), items[0].opacity(0.2, 1));

  yield* waitUntil("no ipods");

  yield* all(lines[2].opacity(0.2, 1), items[2].opacity(0.2, 1));

  yield* waitUntil("only jobs");

  yield* all(
    ...items.map((item, i) =>
      delay(
        0.1 * i,
        popout(() => item),
      ),
    ),
    ...lines.map((line, i) => delay(0.1 * i, line.start(1, 1))),
    jobs().width(600, 1),
    jobs().height(600, 1),
    jobs().position(0, 1),
  );

  const logos = createRefArray<Img>();

  view.add(
    <Img
      scale={0}
      src={blackberryLogo}
      ref={logos}
      height={100}
      position={[-610, -314]}
    />,
  );
  view.add(
    <Img
      scale={0}
      src={blockbusterLogo}
      ref={logos}
      height={200}
      position={[610, -314]}
    />,
  );
  view.add(
    <Img
      scale={0}
      src={theranosLogo}
      ref={logos}
      height={100}
      position={[-610, 350]}
    />,
  );
  view.add(
    <Img
      scale={0}
      src={nokiaLogo}
      ref={logos}
      height={100}
      position={[610, 350]}
    />,
  );

  yield* waitUntil("dead companies");

  yield* all(
    ...logos.map((logo, i) =>
      delay(
        i * 0.1,
        popin(() => logo),
      ),
    ),
  );

  // But with great risk comes great reward---if Jobs
  // had played it safer, it could have also cost Apple
  // greatly. Perhaps we would all still be walking around
  // with BlackBerry or Nokia phones. Perhaps Apple would
  // have had to put their resources towards established
  // products, and we would end up with super-advanced iPods
  // for our music needs and a separate phone for calls and
  // emails. This would represent a worse world for everyone.

  yield* waitUntil("risk reward");

  const redTransition = createRef<Ray>();

  view.add(
    <Ray
      end={0}
      lineWidth={10}
      ref={redTransition}
      zIndex={-1}
      stroke={colors.red500}
      from={[-1920 / 2, 1080 / 2]}
      to={[1920 / 2, -1080 / 2]}
    />,
  );

  const axes = createRefArray<Ray>();
  const dataline = createRef<QuadBezier>();
  const labels = createRefArray<Txt>();
  const point = createSignal(0.9);
  const pointRef = createRef<Circle>();
  const pointRays = createRefArray<Ray>();

  view.add(
    <QuadBezier
      end={0}
      ref={dataline}
      lineWidth={10}
      p0={[-800, 400]}
      p1={[100, 400]}
      p2={[800, -500]}
      stroke="white"
    />,
  );

  view.add(
    <Circle
      ref={pointRef}
      width={0}
      height={0}
      stroke="black"
      lineWidth={5}
      position={() => dataline().getPointAtPercentage(point()).position}
    />,
  );

  view.add(
    <Ray
      end={0}
      ref={axes}
      lineWidth={12}
      stroke="black"
      toY={-500}
      fromY={406}
      endArrow
      position={[-800, 0]}
    />,
  );

  view.add(
    <Ray
      end={0}
      ref={axes}
      lineWidth={12}
      stroke="black"
      toX={800}
      fromX={-806}
      endArrow
      position={[0, 400]}
    />,
  );

  view.add(
    <Ray
      end={0}
      ref={pointRays}
      lineDash={[10, 5]}
      zIndex={-1}
      lineWidth={5}
      stroke={colors.zinc800}
      from={() => [axes[0].position().x, pointRef().position().y]}
      to={() => [
        pointRef().position().x - pointRef().width() / 2,
        pointRef().position().y,
      ]}
    />,
  );

  view.add(
    <Ray
      end={0}
      ref={pointRays}
      lineDash={[10, 5]}
      zIndex={-1}
      lineWidth={5}
      stroke={colors.zinc800}
      from={() => [pointRef().position().x, axes[1].position().y]}
      to={() => [
        pointRef().position().x,
        pointRef().position().y + pointRef().height() / 2,
      ]}
    />,
  );

  view.add(
    <Txt
      opacity={0}
      ref={labels}
      rotation={-90}
      fill="black"
      fontFamily="Oswald"
      position={[-880, -50]}
      fontSize={90}
    >
      RISK
    </Txt>,
  );

  view.add(
    <Txt
      opacity={0}
      ref={labels}
      fill="black"
      fontFamily="Oswald"
      position={[0, 470]}
      fontSize={90}
    >
      REWARD
    </Txt>,
  );

  yield* chain(
    redTransition().end(1, 1),
    all(
      redTransition().lineWidth(1900, 1),
      jobs().scale(0, 1),
      logos[1].scale(0, 1),
      logos[2].scale(0, 1),
      delay(
        0.4,
        all(
          logos[0].scale(0, 1),
          logos[3].scale(0, 1),
          ...axes.map((axis) => axis.end(1, 1)),
          dataline().end(1, 1),
          delay(
            0.5,
            all(
              ...labels.map((label) => label.opacity(1, 1)),
              all(...pointRays.map((ray) => ray.end(1, 1))),
              delay(
                0.5,
                all(pointRef().width(20, 1), pointRef().height(20, 1)),
              ),
            ),
          ),
        ),
      ),
    ),
  );

  yield* waitUntil("apple plays it safer");

  yield* point(0.4, 1);

  yield* waitUntil("blackberry and nokia");

  const phones = createRefArray<Img>();
  const phonesCont = createRef<Rect>();

  view.add(
    <Rect ref={phonesCont} layout width={1920} justifyContent="space-evenly">
      <Img
        shadowBlur={50}
        shadowColor="#000000aa"
        shadowOffsetY={25}
        scale={0}
        ref={phones}
        src={blackberry}
        height={800}
      />
      <Img
        shadowBlur={50}
        shadowColor="#000000aa"
        shadowOffsetY={25}
        scale={0}
        ref={phones}
        src={nokia}
        height={800}
      />
    </Rect>,
  );

  yield* all(
    ...axes.map((axis) => axis.start(1, 1)),
    all(...pointRays.map((ray) => ray.start(1, 1))),
    all(pointRef().width(0, 1), pointRef().height(0, 1)),
    dataline().start(1, 1),
    all(...labels.map((label) => label.opacity(0, 1))),
    delay(
      0.5,
      all(
        ...phones.map((phone, i) =>
          delay(
            0.2 * i,
            popin(() => phone),
          ),
        ),
      ),
    ),
  );

  const ipodRef = createRef<Img>();
  const bbRef = createRef<Img>();

  view.add(
    <Img
      shadowBlur={50}
      shadowColor="#000000aa"
      shadowOffsetY={25}
      ref={ipodRef}
      scale={0}
      src={modiPod}
      height={800}
    />,
  );

  yield* waitUntil("modern ipod");

  yield* all(delay(0.1, popin(ipodRef)), phonesCont().width(8000, 1));

  view.add(
    <Img
      shadowBlur={50}
      shadowColor="#000000aa"
      shadowOffsetY={25}
      ref={bbRef}
      src={modBlackberry}
      height={800}
      position={[300, 0]}
      scale={0}
    />,
  );

  yield* waitUntil("modern blackberry");

  yield* all(delay(0.5, popin(bbRef)), ipodRef().position([-300, 0], 1));

  yield* waitUntil("b-roll in");

  // <B-roll>

  // An iPhone is not just a phone with a touch screen.
  // It is your map of any foreign city, your portal to
  // order food from anywhere you desire at the touch of
  // a finger. It is a portable video camera to capture
  // your fondest memories, and a library with every book
  // you could ever hope to read. It represents such a
  // powerful and fundamental shift in the way that we live
  // our lives that having a smartphone is essentially a
  // requirement for being a member of the modern world.

  // This is just one of the uncountable gifts given to us
  // by entrepreneurs like Steve Jobs. It is not /just/ fair
  // that they be rewarded for their efforts in enriching us
  // by earning profits but also, this is a /requirement/ for
  // the enrichment to even take place.

  // </B-roll>

  view.removeChildren();
  view.fill(colors.slate950);

  yield* waitUntil("profits <-> losses");

  // It is because these entrepreneurs make profits that they
  // are able to make losses. And because these profits and
  // losses represent the actual conditions of the market, the
  // entrepreneur knows when he is making an inefficient use of
  // resources. The socialist expects to reap the same rewards
  // borne from the free choice of capitalists by preventing them
  // from choosing freely. Without profit, it is impossible for
  // the central planning bureau to /deliberately/ choose efficient
  // lines of production---they are left only with random guesswork
  // pertaining to a process that no man could hope to understand.

  const iff = createRef<Ray>();
  const pl = createRefArray<Txt>();
  const plCont = createRef<Rect>();

  view.add(
    <Rect ref={plCont} layout gap={80} alignItems="center">
      <Txt
        scale={0}
        ref={pl}
        glow
        fill={colors.green500}
        fontFamily="Oswald"
        fontSize={100}
      >
        +$$$
      </Txt>
      <Ray
        ref={iff}
        start={0.5}
        end={0.5}
        startArrow
        endArrow
        lineWidth={20}
        stroke="white"
        fromX={-100}
        toX={100}
      />
      <Txt
        scale={0}
        ref={pl}
        glow
        fill={colors.red500}
        fontFamily="Oswald"
        fontSize={100}
      >
        -$$$
      </Txt>
    </Rect>,
  );

  yield* all(
    iff().start(0, 1),
    iff().end(1, 1),
    delay(0.6, all(...pl.map((blah) => popin(() => blah)))),
  );

  yield* waitUntil("actual market conditions");

  view.add(
    <Rect ref={supplyDemand} layout direction="column" position={[0, 100]}>
      {rows.map(({ data: [name, signal, color], ray, content }) => (
        <Rect alignItems="center" gap={64}>
          <Ray
            ref={ray}
            lineWidth={32}
            arrowSize={38}
            stroke="white"
            toX={128}
            endArrow
          />
          <Rect
            ref={content}
            alignContent="center"
            alignItems="center"
            justifyContent="center"
          >
            <Txt fontSize={120} fontFamily="mononoki" fill={color}>
              {name}
              <Txt fontFamily="sans" fill={colors.zinc500}>
                (
              </Txt>
            </Txt>
            <Img height={124} src={iphone} />
            <Txt fontSize={120} fontFamily="sans" fill={colors.zinc500}>
              ) ={" "}
              <Txt
                fontFamily="mononoki"
                text={createSignal(() => commaSeparators(signal().toFixed(0)))}
              />
            </Txt>
          </Rect>
        </Rect>
      ))}
    </Rect>,
  );

  for (let row of rows) {
    row.ray().end(0);
    row.content().opacity(0);
  }

  yield* all(
    loopUntil("free choice of capitalists", doSupplyDemand),
    plCont().position([0, -200], 1),
    delay(
      0.4,
      all(
        ...rows.map(({ ray, content }, i) =>
          delay(0.2 * i, all(ray().end(1, 1), content().opacity(1, 1))),
        ),
      ),
    ),
  );

  const choicesCont = createRef<Rect>();
  view.add(<Rect ref={choicesCont} />);

  const atlas = createRef<Img>();
  const choices = createRefArray<Line>();
  const mkChoice = (points: [number, number][]) =>
    choicesCont().add(
      <Line
        end={0}
        endArrow
        stroke="white"
        lineWidth={18}
        ref={choices}
        radius={200}
        points={points}
      />,
    );

  mkChoice([
    [0, 0],
    [400, 0],
    [450, -50],
    [400, -100],
    [350, -50],
    [600, 200],
  ]);
  mkChoice([
    [0, 0],
    [400, 0],
    [450, -50],
    [400, -100],
    [350, -50],
    [500, 100],
    [700, -100],
  ]);
  mkChoice([
    [0, 0],
    [0, -500],
    [-50, -550],
    [-100, -500],
    [-50, -450],
    [300, -450],
    [320, -430],
    [300, -410],
    [280, -430],
    [300, -450],
    [400, -450],
    [700, -350],
  ]);
  mkChoice([
    [0, 0],
    [0, -500],
    [-50, -550],
    [-100, -500],
    [-50, -450],
    [300, -450],
    [320, -430],
    [300, -410],
    [280, -430],
    [300, -450],
    [400, -450],
    [490, -250],
  ]);
  mkChoice([
    [0, 0],
    [350, 280],
    [400, 320],
  ]);
  mkChoice([
    [0, 0],
    [350, 280],
    [175, 440],
  ]);
  mkChoice([
    [0, 0],
    [-300, -400],
    [-800, -400],
    [-800, -300],
    [-400, -300],
  ]);
  mkChoice([
    [0, 0],
    [-300, -400],
    [-800, -400],
    [-800, -300],
    [-600, -300],
    [-600, -100],
  ]);
  mkChoice([
    [0, 0],
    [-400, 0],
    [-500, 380],
  ]);
  mkChoice([
    [0, 0],
    [-500, 0],
    [-510, 10],
    [-500, 20],
    [-490, 10],
    [-490, -100],
  ]);
  mkChoice([
    [0, 0],
    [-280, 230],
    [-300, 180],
    [-250, 170],
    [-100, 380],
  ]);
  mkChoice([
    [0, 0],
    [-280, 230],
    [-300, 180],
    [-250, 170],
    [-170, 280],
    [-314, 371],
  ]);

  const socialismRay = createRef<Ray>();

  view.add(
    <Ray
      end={0}
      shadowBlur={50}
      shadowColor="#000000aa"
      shadowOffsetY={25}
      ref={socialismRay}
      endArrow
      stroke={colors.red500}
      lineWidth={50}
      arrowSize={60}
      from={[0, 0]}
      to={[715, -230]}
    />,
  );

  view.add(
    <Img
      scale={0}
      ref={atlas}
      shadowBlur={50}
      shadowColor="#000000aa"
      shadowOffsetY={25}
      src={atlasImg}
      height={600}
    />,
  );

  const hand = createRef<Img>();
  const handFollowPos = createSignal(() => {
    const { x, y } = socialismRay().getPointAtPercentage(
      socialismRay().end(),
    ).position;
    return [960 + x, 306 + y] as [number, number];
  });

  view.add(
    <Img src={writingHand} ref={hand} position={[1500, 1200]} rotation={-20} />,
  );

  yield* all(
    loopFor(1.4, doSupplyDemand),
    fadeout(plCont),
    delay(
      0.2,
      all(
        ...rows.map(({ ray, content }, i) =>
          delay(0.2 * i, all(ray().start(1, 1), fadeout(content))),
        ),
      ),
    ),
    delay(
      0.9,
      chain(popin(atlas), all(...choices.map((choice) => choice.end(1, 1)))),
    ),
  );

  yield* waitUntil("central planner");

  yield* all(hand().position(handFollowPos, 1), hand().rotation(0, 1));

  yield* all(
    socialismRay().end(1, 1),
    delay(
      0.2,
      all(...choices.map((choice) => choice.stroke(colors.slate900, 1))),
    ),
  );

  yield* all(hand().position([1900, 100], 1), hand().rotation(10, 1));

  // Without profit, it is impossible for the central planning bureau
  // to /deliberately/ choose efficient lines of production---they are
  // left only with random guesswork pertaining to a process that no
  // man could hope to understand.

  yield* waitUntil("central planning bureau");

  yield* all(
    ...choices.map((choice) => choice.start(1, 1)),
    socialismRay().start(1, 1),
    popout(atlas),
    delay(0.8, view.fill(colors.yellow300, 1)),
  );

  const vids = createRefArray<Video>();
  const borders = createRefArray<SquigglyBorder>();
  const vs = createRefArray<Txt>();
  const borderRects = createRefArray<Rect>();
  const questionsRect = createRef<Rect>();
  const questions = createRefArray<Txt>();

  view.add(
    <Rect
      layout
      ref={questionsRect}
      width={1920}
      height={1080}
      wrap="wrap"
      alignContent="space-evenly"
      justifyContent="space-evenly"
    />,
  );

  for (let i = 0; i < 100; ++i) {
    questionsRect().add(
      <Txt
        ref={questions}
        opacity={0}
        fontFamily="Oswald"
        fontSize={200}
        fill="white"
      >
        ?
      </Txt>,
    );
  }

  view.add(
    <Rect layout direction="column" height={1080} justifyContent="space-evenly">
      {[
        [manualCars, robotCars],
        [manualFood, robotFood],
      ].map((row) => (
        <Rect width={1920} justifyContent="space-evenly" alignItems="center">
          {row
            .map((vid) => (
              <Rect
                ref={borderRects}
                width={1920 / 3}
                height={1080 / 3}
                shadowBlur={50}
                shadowColor="#000000aa"
                shadowOffsetY={25}
              >
                <SquigglyBorder ref={borders}>
                  <Video ref={vids} height={1080 / 3} src={vid} />
                </SquigglyBorder>
              </Rect>
            ))
            .toSpliced(
              1,
              0,
              <Txt fill="black" ref={vs} fontFamily="Oswald" fontSize={90}>
                vs
              </Txt>,
            )}
        </Rect>
      ))}
    </Rect>,
  );

  for (let vid of vids) {
    vid.play();
    vid.scale(0);
  }

  for (let i = 0; i < vids.length; ++i) {
    const width = borderRects[i].width();
    const height = borderRects[i].height();
    borderRects[i].width(createSignal(() => width * vids[i].scale().x));
    borderRects[i].height(createSignal(() => height * vids[i].scale().y));
  }

  for (let txt of vs) {
    txt.scale(0);
  }

  for (let border of borders) {
    border.opacity(0);
  }

  const doWiggle = () => all(...borders.map((border) => border.wiggle(0.1)));
  const vidsVs = [vids[0], vs[0], vids[1], vids[2], vs[1], vids[3]];

  yield* all(
    loopUntil("questions", doWiggle),
    ...vidsVs.map((item, i) =>
      delay(
        0.05 * i,
        popin(() => item),
      ),
    ),
    ...borders.map((border) => border.opacity(1, 0.2)),
  );

  yield* all(
    loopUntil("because of questions", doWiggle),
    ...questions.map((question, i) =>
      delay(0.01 * i, chain(question.opacity(0.5, 1), question.opacity(0, 1))),
    ),
  );

  // It is only because of capitalism and the beauty of indirect
  // exchange that we have such marvels as iPhones and rocket ships.
  // We cannot get an effect without the cause. Let us not forget this.

  yield* all(
    loopUntil("end", doWiggle),
    ...vidsVs.map((item, i) =>
      delay(
        0.05 * i,
        popout(() => item),
      ),
    ),
    ...borders.map((border) => delay(0.8, border.opacity(0, 0.2))),
  );
});
