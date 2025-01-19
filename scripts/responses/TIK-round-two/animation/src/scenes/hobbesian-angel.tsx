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
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { ArrowList, Browser } from "mcas/lib";
import wiki from "../assets/ecp-wiki.png";
import foundingFathersImg from "../assets/founding-fathers.jpg";
import commieImg from "../assets/commie.png";

// Furthermore, even if the sovereign is, contrary to the Hobbesian premise, an angel who wants to try his best to provide the correct level of protection, it is simply not possible for him to do this. He is faced with the unanswerable question of how much security must be rationally allocated and in what form(s) it should be produced. Should he give every citizen a handgun? Should he post armed guards on every street corner? Should he have a police patrol every 10 miles? He cannot answer, because the economic calculation problem stands in his way. I have already explained the ECP in this video,[fn:31] so I will not repeat the explanation here. You can read the full deductive argument on my wiki if you do not wish to watch the video.[fn:32]

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const title = createRef<Txt>();
  const list = createRef<ArrowList>();

  view.add(
    <Rect layout direction="column" gap={64}>
      <Txt
        ref={title}
        fill="white"
        textWrap
        width={1600}
        textAlign="center"
        fontSize={60}
      >
        Even if the sovereign is an angel, he cannot deliberately provide the
        correct level of protection.
      </Txt>
      <ArrowList ref={list}>
        <Txt>How much security should be allocated?</Txt>
        <Txt>In what form(s) should it be produced?</Txt>
        <Txt>Should every citizen get a handgun?</Txt>
        <Txt>Should armed guards be posted on every street corner?</Txt>
        <Txt>Should there be a police patrol every 10 miles?</Txt>
      </ArrowList>
    </Rect>,
  );

  yield* fadein(title);

  yield* list().next("how much allocated");
  yield* list().next("in what forms");
  yield* list().next("hangun 4 every 1");
  yield* list().next("armed guards");
  yield* list().next("police patrols");

  yield* waitUntil("list out");

  yield* all(
    fadeout(title),
    ...list().items.map((item, i) => delay(0.1 * (i + 1), list().hide(item))),
  );

  yield* waitUntil("wiki");

  const browser = createRef<Browser>();

  view.add(
    <Browser
      ref={browser}
      scroll={0.06}
      hyperlink="https://liquidzulu.github.io/brain/note/the-economic-calculation-problem/"
    >
      <Img src={wiki} />
    </Browser>,
  );

  yield* popin(browser);

  yield* waitUntil("browser out");

  yield* popout(browser);

  // Regardless, in the statist society there will also exist a tendency toward a deterioration in the quality of justice, because if one can only appeal to the government for justice and protection, justice and protection will invariably be perverted in favour of the government. Even the constitutions and supreme courts that are supposed to limit this may be interpreted and administered solely by the government---the very agents who are supposed to be limited are the ones who determine what the limit is. "Accordingly, the definition of property and protection will continually be altered and the range of jurisdiction expanded to the government's advantage."[fn:33]

  const deter = createRef<Txt>();
  view.add(<Txt ref={deter} fill="white" textAlign="center" />);

  yield* deter().text(
    "In the statist society there will also exist a tendency toward\na deterioration in the quality of justice.",
    1,
  );

  yield* waitUntil("deter out");

  yield* fadeout(deter);

  yield* waitUntil("blank");

  const lists = createRefArray<ArrowList>();
  const capitalist = createRef<Img>();
  const commie = createRef<Img>();
  const capTitle = createRef<Txt>();
  const comTitle = createRef<Txt>();
  const ray = createRef<Ray>();

  view.add(
    <Rect layout>
      <Rect
        direction="column"
        width={1920 / 2}
        height={1080}
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Txt
          opacity={0}
          ref={capTitle}
          fill="white"
          fontFamily="oswald"
          fontSize={60}
        >
          CAPITALISTS
        </Txt>
        <Img
          opacity={0}
          ref={capitalist}
          src={foundingFathersImg}
          height={250}
        />
        <Rect height={500} alignItems="center">
          <ArrowList ref={lists}>
            <Txt textWrap maxWidth={700}>
              Hobbes is correct.
            </Txt>
            <Txt textWrap maxWidth={700}>
              ∴ the only way to protect private property is to collectivise the
              invasions thereof.
            </Txt>
          </ArrowList>
        </Rect>
      </Rect>
      <Ray
        ref={ray}
        end={0}
        lineWidth={20}
        stroke="white"
        fromY={-1080 / 2}
        toY={1080 / 2}
      />
      <Rect
        direction="column"
        width={1920 / 2}
        height={1080}
        alignItems="center"
        justifyContent="space-evenly"
      >
        <Txt
          opacity={0}
          ref={comTitle}
          fill="white"
          fontFamily="oswald"
          fontSize={60}
        >
          COMMUNISTS
        </Txt>
        <Img opacity={0} ref={commie} src={commieImg} height={250} />
        <Rect height={500} alignItems="center">
          <ArrowList ref={lists}>
            <Txt textWrap maxWidth={600}>
              Hobbes is correct.
            </Txt>
            <Txt textWrap maxWidth={600}>
              ∴ anarchism is an anti-capitalist, anti-property stance.
            </Txt>
          </ArrowList>
        </Rect>
      </Rect>
    </Rect>,
  );

  // It is in the near universal acceptance of the myth of collective security that we find another odious false alternative. On the one hand, the so-called capitalists accept Hobbes' premises, then conclude that the only way to protect private property is to collectivise the invasions thereof; and on the other hand, the communists will accept the same premises, and claim the banner of anarchism as an anti-capitalist, anti-property stance. We are left yet again with the alternative of collectivism vs collectivism.

  yield* ray().end(1, 1);

  yield* waitUntil("capitalists");

  yield* all(
    fadein(capTitle),
    delay(
      0.1,
      all(
        fadein(capitalist),
        ...lists[0].items.map((item, i) =>
          delay(0.1 * (i + 1), lists[0].show(item)),
        ),
      ),
    ),
  );

  yield* waitUntil("commies");

  yield* all(
    fadein(comTitle),
    delay(
      0.1,
      all(
        fadein(commie),
        ...lists[1].items.map((item, i) =>
          delay(0.1 * (i + 1), lists[1].show(item)),
        ),
      ),
    ),
  );

  yield* waitUntil("both collectivists");

  yield* all(
    capTitle().text("COLLECTIVISM", 1),
    delay(0.2, comTitle().text("COLLECTIVISM", 1)),
  );

  yield* waitUntil("end");

  yield* all(
    ray().start(1, 1),
    fadeout(capTitle),
    delay(
      0.1,
      all(
        fadeout(comTitle),
        fadeout(capitalist),
        delay(0.1, fadeout(commie)),
        ...lists.map((l, i) =>
          delay(
            0.1 * i,
            all(...l.items.map((item, j) => delay(0.1 * j, l.hide(item)))),
          ),
        ),
      ),
    ),
  );
});
