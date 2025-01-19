import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
  delay,
  loopUntil,
  loopFor,
  Reference,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { ArrowList, SquigglyBorder } from "mcas/lib";
import crusoeImg from "../assets/crusoe/crusoe.png";
import whitehouseImg from "../assets/whitehouse.jpg";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const p = createRef<Txt>();
  const i = createRef<Ray>();
  const c = createRef<Txt>();
  const full = createRef<Rect>();

  view.add(
    <Rect ref={full} layout alignItems="center" gap={32}>
      <Txt opacity={0} ref={p} fill={colors.zinc50} fontSize={60}>
        Men are naturally brutish
      </Txt>
      <Ray
        end={0}
        ref={i}
        toX={150}
        lineWidth={8}
        endArrow
        stroke={colors.zinc50}
        arrowSize={16}
      />
      <Txt opacity={0} ref={c} fill={colors.zinc50} fontSize={60}>
        we need collective security.
      </Txt>
    </Rect>,
  );

  yield* all(
    fadein(p),
    chain(waitFor(0.2), i().end(1, 1)),
    chain(waitFor(0.4), fadein(c)),
  );

  yield* waitUntil("absurd");

  yield* all(i().stroke(colors.red500, 1), c().fill(colors.red500, 1));

  yield* waitUntil("examine premise");

  yield* all(
    p().glow(0).glow(0.5, 1),
    i().opacity(0.2, 1),
    c().opacity(0.2, 1),
  );

  yield* waitUntil("show list");

  // First, man has free will[fn:30] and can as such choose either peaceful productivity or brutish anti-productivity. It is in the world where the philosophy of the day is that of evasion that a correspondent brutishness and statism arise; if the philosophy of the day were one of thought and objectivity, then men would understand that production is the proper way to live. So contrary to the claim at hand, it is not that a state is required to civilise naturally brutish men; rather it is that when men choose brutality they form states to engage in it.

  const list = createRef<ArrowList>();

  view.add(
    <ArrowList ref={list} position={[0, 100]}>
      <Txt textWrap maxWidth={1200}>
        Man has free will and can as such choose either peaceful productivity or
        brutish anti-productivity.
      </Txt>
      <Txt textWrap maxWidth={1200}>
        If the philosophy of the day is that of evasion, then a correspondent
        brutishness and satism arise.
      </Txt>

      <Txt textWrap maxWidth={1200}>
        If the philosophy of the day were one of thought and objectivity, then
        men would understand that production is the proper way to live.
      </Txt>

      <Txt textWrap maxWidth={1200}>
        It is not that a state is required to civilise naturally brutish men;
        rather it is that when men choose brutality they form states to engage
        in it.
      </Txt>
    </ArrowList>,
  );

  yield* all(full().position([0, -400], 1));

  const mkNext = (arrowList?: Reference<ArrowList>) =>
    function* next(title: string) {
      yield* waitUntil(title);
      yield* (arrowList ?? list)().next();
    };

  let next = mkNext();

  yield* next("man has free will");
  yield* next("if potd is evasion");
  yield* next("if potd is thought");
  yield* next("state not required to civilise brutes");

  yield* waitUntil("out");

  yield* all(
    fadeout(full),
    ...list().items.map((item, i) => delay(0.1 * (i + 1), list().hide(item))),
  );

  // Furthermore, the entire purpose of protecting rights in the first place is to allow for the flourishing of mankind. The reason why Crusoe would want to be free of conflict is so that he can be productive. Thus shifting the infringement of rights onto an institutionalised (protected) anti-productive class is an anathema to the very problem that had to be solved in the first place, as such an institution would tend to maximise the price of protection (i.e. taxes) whilst minimising the quality.

  const squiggly = createRef<SquigglyBorder>();
  const crusoe = createRef<Img>();
  const whitehouse = createRef<Rect>();
  const cont = createRef<Rect>();
  const title = createRef<Txt>();

  view.add(
    <Rect
      ref={cont}
      layout
      gap={128}
      position={[576, 0]}
      direction="column"
      alignItems="center"
    >
      <Txt
        ref={title}
        opacity={0}
        marginBottom={-272}
        textWrap
        width={1700}
        fill="white"
        fontSize={60}
        textAlign="center"
      >
        The state tends to maximise the price of protection (taxes) whilst
        minimising the quality.
      </Txt>
      <Rect gap={128}>
        <Img ref={crusoe} height={600} src={crusoeImg} />
        <Rect
          ref={whitehouse}
          width={1024}
          opacity={0}
          shadowBlur={50}
          shadowColor="000000aa"
          shadowOffsetY={25}
        >
          <SquigglyBorder ref={squiggly}>
            <Img height={600} src={whitehouseImg} />
          </SquigglyBorder>
        </Rect>
      </Rect>
    </Rect>,
  );

  yield* fadein(crusoe);
  yield* waitUntil("anti-productive class");
  yield* all(
    cont().position(0, 1),
    delay(0.65, fadein(whitehouse)),
    chain(
      waitUntil("state maximise price"),
      all(delay(0.4, fadein(title)), title().margin(0, 1)),
    ),
    chain(
      loopUntil("squiggly out", () => squiggly().wiggle()),
      all(
        loopFor(1.1, () => squiggly().wiggle()),
        all(fadeout(crusoe), delay(0.2, fadeout(whitehouse))),
      ),
    ),
  );

  // Quite simply, given that the principle of government requires that it be a judicial monopoly with the power to tax, any notion of limiting it's power and safeguarding individual life and property is illusory; necessarily the state tends towards greater expropriation and less protection, because the sovereign is motivated by self-interest (albeit irrational) and the disutility of labour just as anyone else. Why allocate more resources towards protecting citizens than the minimum required to keep them in line and preserve their property for your own future expropriation? On Hobbes, the sovereign would /have/ to do this because he is supposed to be a brute.

  const llist = createRef<ArrowList>();

  view.add(
    <ArrowList ref={llist} position={[0, 120]}>
      <Txt textWrap maxWidth={1600}>
        Given that the principle of government requires that it be a judicial
        monopoly with the power to tax, any notion of limiting it's power and
        safeguarding individual life and property is illusory.
      </Txt>
      <Txt textWrap maxWidth={1600}>
        Necessarily the state tends towards greater expropriation and less
        protection.
      </Txt>
      <Txt textWrap maxWidth={1600}>
        The sovereign is motivated by self-interest and the disutility of labour
        just as anyone else.
      </Txt>
      <Txt textWrap maxWidth={1600}>
        ∴ he tends to minimise the resources dedicated towards protecting
        citizens.
      </Txt>
    </ArrowList>,
  );

  yield* llist().next("principle of government");
  yield* llist().next("state tends towards expropriation");
  yield* llist().next("sovereign self-interest");
  yield* llist().next("tends to minimise resources");

  yield* waitUntil("end");

  yield* all(
    fadeout(title),
    ...llist().items.map((item, i) => delay(0.1 * (i + 1), llist().hide(item))),
  );
});
