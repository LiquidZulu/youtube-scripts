import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  ThreadGenerator,
  waitUntil,
  Vector2,
  PossibleColor,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  mkGradient,
  getLocalPos,
  after,
  vectorMean,
  vectorWeightedMean,
} from "mcas";
import * as colors from "mcas/colors";
import grad from "../assets/gradient.png";
import { flashAround } from "mcas/lib";

export default makeScene2D(function* (view) {
  view.add(<Img src={grad} />);

  const quote = createRef<Txt>();
  const highlight = createRef<Rect>();

  view.add(
    <Rect
      ref={highlight}
      width={100}
      height={70}
      fill={colors.emerald500}
      radius={12}
    />,
  );

  view.add(
    <Rect shadowOffsetY={2} shadowBlur={5} shadowColor="00000090">
      <Txt
        justify
        fontSize={48}
        ref={quote}
        fill="white"
        position={[0, 320]}
        width={1800}
      >
        You have stolen my dreams and my childhood with your empty words, and
        yet I'm one of the lucky ones. People are suffering, people are dying,
        entire ecosystems are collapsing, we are in the beginning of a mass
        extinction and{" "}
        <Txt.b>
          all you can talk about is money and fairytales of eternal economic
          growth.
        </Txt.b>
        How dare you!?
      </Txt>
    </Rect>,
  );

  const events = new Set();

  function mkEventName(desiredName: string): string {
    let name = desiredName;
    let split = desiredName.split("-");

    if (split.length == 1) {
      name = `${name}-0`;
      split.push("0");
    }

    if (!events.has(name)) return name;

    const [realName, n] = split;

    return mkEventName(`${realName}-${+n + 1}`);
  }

  function* goToTxt(txt: Txt, duration?: number) {
    yield* all(
      highlight().position(getLocalPos(txt.absolutePosition()), duration),
      highlight().width((txt as Txt).width() + 30, duration),
    );
  }

  highlight().position(
    getLocalPos(quote().children()[0].children()[0].absolutePosition()),
  );
  highlight().width((quote().children()[0].children()[0] as Txt).width() + 30);

  const atoms = quote().children()[0].children() as Txt[];

  for (let atom of atoms) {
    const txt = atom.text();
    let event = mkEventName(txt);
    events.add(event);

    yield* after(event, goToTxt(atom, 0.1));
  }

  yield* waitUntil("remove highlight");
  yield* highlight().opacity(0, 1);

  const money = [atoms[46]];
  const economicGrowth = [atoms[51], atoms[52]];
  const entireEcosystems = [atoms[26], atoms[27]];
  const collapsing = [atoms[29]];
  const thingsToHighlight = [
    money,
    economicGrowth,
    entireEcosystems,
    collapsing,
  ];

  const rects = createRefArray<Rect>();

  for (let thing of thingsToHighlight) {
    view.add(
      <Rect
        ref={rects}
        position={getLocalPos(
          vectorWeightedMean(
            ...thing.map(
              (x) => [x.absolutePosition(), x.width()] as [Vector2, number],
            ),
          ),
        )}
        width={thing.reduce((acc, v) => acc + v.width() + 20, 0)}
        height={70}
      />,
    );
  }

  const atomMap = {
    money: [money, rects[0], colors.amber500],
    economicGrowth: [economicGrowth, rects[1], colors.amber500],
    entireEcosystems: [entireEcosystems, rects[2], colors.green500],
    collapsing: [collapsing, rects[3], colors.green500],
  } as { [key: string]: [Txt[], Rect, PossibleColor] };

  for (let [name, [txts, rect, color]] of Object.entries(atomMap)) {
    yield* after(
      name,
      all(
        ...txts.map((x) => x.fill(color, 1)),
        flashAround(() => rect, null, null, {
          color,
          modLineWidth: createSignal(3),
        }),
      ),
    );
  }

  yield* waitUntil("finish");

  // So, the standard then is that we should abandon "money" and "economic growth," instead sacrificing these prerequisites of human flourishing in favour of the "entire ecosystems" which are "collapsing." People suffering and dying are merely smokescreens to cover up the motivation of protecting the non-human ecosystems---after all, production is required for human survival, and money is the result of men dealing with each other through trade as against predation. In other words:
});
