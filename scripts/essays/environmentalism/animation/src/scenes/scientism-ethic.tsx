import { makeScene2D, Rect, Ray, Img, Video, Node } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  sequence,
  delay,
  waitUntil,
  spawn,
  easeInCubic,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { after, Browser, Chart, flash, SquigglyBorder } from "mcas/lib";
import plant from "../assets/plant.png";
import { data } from "../assets/co2";
import wapo from "../assets/wapo.png";
import iphone from "../assets/marvels.mp4";
import randVid from "../assets/rand.mp4";

export default makeScene2D(function* (view) {
  view.fill(colors.bgpurple);

  const months = new Map(
    [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ].map((v, i) => [i + 1, v]),
  );

  const levels = [
    "An increase in CO₂ is bad, and;",
    "the correct way to deal with this problem is to regress our society.",
  ];

  const title = createRef<Txt>();
  const nums = createRefArray<Txt>();
  const txts = createRefArray<Txt>();
  const rects = createRefArray<Rect>();
  const cont = createRef<Rect>();

  view.add(
    <Rect ref={cont} gap={64} layout direction="column" alignItems="center">
      <Txt
        ref={title}
        glow
        fill={colors.purple500}
        fontSize={70}
        fontFamily="oswald"
      />
      <Rect direction="column" alignItems="start">
        {...levels.map((x, i) => (
          <Rect
            paddingLeft={10}
            paddingRight={10}
            ref={rects}
            gap={32}
            alignItems="center"
          >
            <Txt
              ref={nums}
              scale={0}
              fill={colors.zinc400}
              text={`${i + 1}.`}
            />
            <Txt ref={txts} opacity={0} text={x} />
          </Rect>
        ))}
      </Rect>
    </Rect>,
  );

  yield* after(
    "in",
    title().text("THE ENVIRONMENTAL-PRIMITIVIST ETHIC:", 1),
    sequence(0.2, ...nums.map((num) => popin(() => num))),
  );

  yield* all(
    ...txts.map((txt, i) => after(`show part ${i}`, txt.opacity(1, 1))),
  );

  const p = createRef<Img>();

  view.add(
    <Img
      scale={0}
      ref={p}
      src={plant}
      height={600}
      position={[0, 190]}
      shadowColor="black"
      shadowBlur={40}
      shadowOffset={[8, 16]}
    />,
  );

  yield* after(
    "first point",
    flash(() => rects[0]),
    rects[1].opacity(0.5, 1),
    delay(0.8, cont().position([0, -300], 1)),
    after("plant", popin(p)),
  );

  const chart = createRef<Chart>();

  view.add(
    <Chart
      ref={chart}
      position={[400, 190]}
      width={750}
      height={500}
      type="line"
      axisLabels={["CO2 in atmosphere", "year"]}
      d={data
        .filter((_, i) => i % 12 == 0)
        .map(({ year, month, deseasonalized }) => [
          `${months.get(+month)}, ${year}`,
          +deseasonalized,
        ])}
    />,
  );

  chart().axes.forEach((axis) => axis.end(0));
  chart().dataline().end(0);

  yield* after(
    "increase",
    p().position([-400, 190], 1),
    after(
      "show chart",
      ...chart().axes.map((axis) => axis.end(1, 1)),
      delay(0.2, chart().dataline().end(1, 1)),
    ),
  );

  yield* after(
    "hide chart",
    ...chart().axes.map((axis) => axis.start(1, 1)),
    delay(0.2, chart().dataline().start(1, 1)),
    delay(0.2, popout(p)),
  );
  chart().remove();

  // Such an ethic has two levels to it: (1) that an increase in CO_2 is bad, and (2) that the correct way to deal with this problem is to regress our society. On the first point, CO_2 is plant food, we need to eat plants to live and to feed our livestock---thus, it is not immediately obvious why an increase in CO_2 would be a bad thing. The claim is made that CO_2 increases the severity of natural disasters---but what is the standard of severity? Certainly not human death:

  const quoteCont = createRef<Rect>();
  const quote = createRef<Txt>();
  const citation = createRef<Txt>();

  view.add(
    <Rect
      ref={quoteCont}
      position={[0, 150]}
      layout
      direction="column"
      gap={32}
    >
      <Txt
        ref={quote}
        fontFamily="oswald"
        fontSize={60}
        justify
        maxWidth={1600}
        fill={colors.purple500}
      >
        "Climate-related disaster deaths have plummeted by 98 percent over the
        last century, as CO₂ levels have risen from 280 ppm (parts per million)
        to 420 ppm (parts per million) and temperatures have risen by 1°C."
      </Txt>
      <Txt ref={citation} fontFamily="San Francisco Display">
        --- Alex Epstein, <Txt.i>Fossil Future</Txt.i>
      </Txt>
    </Rect>,
  );

  let children = [];

  for (let child of quote().children()[0].children()) {
    children.push(child);
    child.opacity(0);
  }

  citation().opacity(0);

  yield* after(
    "show quote",
    sequence(0.01, ...children.map((child) => fadein(() => child))),
    delay(0.2, citation().opacity(1, 1)),
  );

  // Climate-related disaster deaths have plummeted by 98 percent over the last century, as CO<sub>2</sub> levels have risen from 280 ppm (parts per million) to 420 ppm (parts per million) and temperatures have risen by 1°C.[fn:26]

  yield* after(
    "quote out",
    sequence(0.2, fadeout(quote), citation().opacity(0, 1)),
  );

  yield* after(
    "indicate claim 2",
    rects[1].opacity(1, 1).to(0.5, 1),
    rects[0].opacity(0.5, 1).to(1, 1),
    flash(() => rects[1]),
  );

  const ipcc = createRefArray<Txt>();
  const ipccCont = createRef<Rect>();

  view.add(
    <Rect ref={ipccCont} position={[0, 190]} layout direction="column" gap={32}>
      <Txt ref={ipcc} textWrap maxWidth={1600}>
        "There is low confidence that human influence has affected trends in
        meteorological droughts in most regions;"
      </Txt>
      <Txt ref={ipcc} textWrap maxWidth={1600}>
        "there is low confidence in most reported long-term [...] trends in
        [hurricane] frequency- or intensity-based metrics;"
      </Txt>
      <Txt ref={ipcc} textWrap maxWidth={1600}>
        "there is low confidence in the human influence on the changes in
        [floods] on the global scale. Confidence is in general low in
        attributing changes in the probability or magnitude of flood events to
        human influence."
      </Txt>
      <Txt
        ref={ipcc}
        fontFamily="San Francisco Display"
        textWrap
        maxWidth={1600}
      >
        --- Intergovernmental Panel on Climate Change,{" "}
        <Txt.i>AR6 Climate Change 2021: The Physical Science Basis</Txt.i>{" "}
        (Cambridge: Cambridge University Press, 2021)
      </Txt>
    </Rect>,
  );

  for (const t of ipcc) {
    t.opacity(0);
  }

  yield* after("ipcc", sequence(0.1, ...ipcc.map((t) => fadein(() => t))));
  yield* after(
    "first ipcc",
    flash(() => ipcc[0]),
    ipcc[1].opacity(0.2, 1),
    ipcc[2].opacity(0.2, 1),
  );
  yield* after("second ipcc", ipcc[0].opacity(0.2, 1), ipcc[1].opacity(1, 1));
  yield* after("third ipcc", ipcc[1].opacity(0.2, 1), ipcc[2].opacity(1, 1));
  yield* after("ipcc done", ipcc[0].opacity(1, 1), ipcc[1].opacity(1, 1));
  // But perhaps the disasters are getting worse at a rate slower than humans are better able to deal with them (this would still make the claim that we should be less productive questionable). The IPCC contradicts this claim: "there is low confidence that human influence has affected trends in meteorological droughts in most regions;" "there is low confidence in most reported long-term [...] trends in [hurricane] frequency- or intensity-based metrics;" and "there is low confidence in the human influence on the changes in [floods] on the global scale. Confidence is in general low in attributing changes in the probability or magnitude of flood events to human influence."[fn:27]

  const browser = createRef<Browser>();
  const page = createRef<Img>();

  view.add(
    <Browser
      ref={browser}
      position={[1920, 190]}
      height={600}
      hyperlink="https://www.washingtonpost.com/climate-environment/interactive/2023/hot-cold-extreme-temperature-deaths/"
    >
      <Img ref={page} position={[0, 3128]} width={1000} src={wapo} />
    </Browser>,
  );
  yield* after(
    "browser in",
    browser().position([0, 190], 1),
    ipccCont().position([-1920, 190], 1),
  );

  browser().mkHighlight(60, [[120, 645], 325], [[-360, 645 + 60], 720]);

  yield* after(
    "browser scroll0",
    browser().scroll(0.022, 1),
    after("browser h0", browser().highlight(1, 1)),
  );

  browser().mkHighlight(30, [[-44, 4589], 470], [[-450, 4589 + 44], 145]);

  yield* after(
    "browser scroll1",
    browser().scroll(0.36, 1),
    after("browser h1", browser().highlight(2, 1)),
  );

  browser().mkHighlight(
    30,
    [[-55, 7735], 410],
    [[-450, 7735 + 44], 890],
    [[-450, 7735 + 44 * 2], 792],
    [[-450, 7990], 146],
    [[54, 7990 + 44 * 2], 364],
    [[-450, 7990 + 44 * 3], 182],
    //
  );

  yield* after(
    "browser scroll2",
    browser().scroll(0.6415, 1),
    after("browser h2", browser().highlight(3, 1)),
  );

  // Further, I can accept that it is true that the reported 1°C of warming has been caused by an increase in CO_2 within the atmosphere---but why is warm worse than cold? /The Washington Post/ reports that "for every death linked to heat, nine are tied to cold" and that "on every continent, cold deaths surpassed heat deaths."[fn:28] The author also makes sure to lament that it is wealthy countries who have the highest concentration of cold deaths (i.e. Europe) and how this is "unfair," pointing to the difficulty of purchasing air conditioning in the hot, developing world.[fn:29] This, of course, ignores that air conditioning is powered by electricity and that vastly expanding fossil fuel production would allow for more air conditioning.

  yield* after(
    "second level",
    flash(() => rects[1]),
    rects[1].opacity(1, 1),
    rects[0].opacity(0.5, 1),
  );

  yield* waitUntil("vid in");

  const marvels = createRef<Video>();
  const marvelsCont = createRef<Rect>();
  const squig = createRef<SquigglyBorder>();

  view.add(
    <Rect
      ref={marvelsCont}
      layout
      direction="column"
      position={[1920, 190]}
      alignItems="center"
    >
      <Video
        play
        ref={marvels}
        src={iphone}
        height={590}
        shadowBlur={50}
        shadowColor="black"
        shadowOffsetY={25}
      />
      <SquigglyBorder
        ref={squig}
        position={[0, -30]}
        stroke={colors.purple500}
        shadowColor={colors.purple500}
        shadowBlur={40}
      >
        <Rect height={590} width={1049} />
      </SquigglyBorder>
      <Txt
        fontSize={30}
        fill={colors.zinc400}
        fontFamily="San Francisco Display"
      >
        LiquidZulu, <Txt.i>The "Impossible" Economics of the iPhone</Txt.i>
      </Txt>
    </Rect>,
  );
  marvels().video().volume = 0;

  let wiggle = true;

  yield spawn(function* () {
    while (wiggle) {
      yield* squig().wiggle();
    }
  });

  yield* all(
    browser().position([-1920, 190], 1),
    marvelsCont().position([0, 190], 1),
  );

  // This brings us to the second level of the above ethic: why is the correct way to deal with any problems which CO_2 might bring to regress to a pre-industrial society? Prima facie, this stance is simply ignorant of the fact that any issue man faces can be destroyed by innovation. We were able to send men to the Moon with less computation than exists on the device you are watching this video on---there is no limit to the power that one wields when left unhampered by the anti-industrialists. Of course, these environmentalists are not simply ignorant of this fact--they are joined in their ranks by some of the greatest scientific minds of the modern age--rather, their motive is not the success of man, but his destruction.

  yield* waitUntil("rand in");

  const wipe = createRef<Rect>();
  const rand = createRef<Rect>();
  view.add(
    <Node cache>
      <Rect
        fill="white"
        ref={wipe}
        width={Math.sqrt(1920 ** 2 + 1080 ** 2) * 2}
        position={[1920 / 2, 1080 / 2]}
        rotation={-30}
      />
      <Rect
        ref={rand}
        compositeOperation="source-in"
        width={1920}
        height={1080}
        fill="black"
      >
        <Video height="100%" src={randVid} loop play />
      </Rect>
    </Node>,
  );

  yield* wipe().height(wipe().width(), 1);

  wiggle = false;

  const shortQuote = createRef<Txt>();
  const quoteRect = createRef<Rect>();
  view.add(
    <Rect
      ref={quoteRect}
      size={{ x: 1480, y: 188 }}
      fill="black"
      padding={40}
      position={[0, 446 + 188]}
    >
      <Txt
        position={[-700, 0]}
        ref={shortQuote}
        glow
        fill={colors.purple500}
        fontFamily="oswald"
        fontSize={30}
        maxWidth={1400}
        textAlign="center"
      />
    </Rect>,
  );

  yield* after(
    "shortquote in",
    quoteRect().position([0, 446], 1),
    delay(
      0.4,
      all(
        shortQuote().position(0, 1),
        shortQuote().text(
          `"The uncontested absurdities of today are the accepted slogans of tomorrow. They come to be accepted by degrees, by precedent,\n by implication, by erosion, by default, by dint of constant pressure on one side and constant retreat on the other—until one day\n when they are suddenly declared to be the country's official ideology."`,
          1,
        ),
      ),
    ),
  );
  yield* after("end", quoteRect().position([0, 446 + 188], 0.5, easeInCubic));
  yield* waitFor(5);

  // The altruism underpinning these anti-industrial sentiments has been left completely unopposed by any serious counter-ideology for far too long and has as such been able to win by default. As Rand notes: "The uncontested absurdities of today are the accepted slogans of tomorrow. They come to be accepted by degrees, by precedent, by implication, by erosion, by default, by dint of constant pressure on one side and constant retreat on the other---until one day when they are suddenly declared to be the country's official ideology."[fn:30]
});
