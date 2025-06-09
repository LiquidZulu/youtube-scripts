import { makeScene2D, Rect, Ray, Img, Path, Circle } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  linear,
  waitUntil,
  useDuration,
  sequence,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  Card,
  after,
  ArrowList,
} from "mcas";
import * as colors from "mcas/colors";
import man from "../assets/man";
import glacier from "../assets/glacier.png";
import rat from "../assets/rat";
import bug from "../assets/ladybird.png";

export default makeScene2D(function* (view) {
  view.fill(colors.bggreen);

  const cont = createRef<Rect>();

  const manPath = createRef<Path>();
  const manSquare = createRef<Rect>();
  const manCirc = createRef<Circle>();
  const manCard = createRef<Card>();

  const glacierCard = createRef<Card>();

  const rodentCard = createRef<Card>();
  const ratProgress = createSignal(0);

  const bugCard = createRef<Card>();

  view.add(
    <Rect
      position={[679, 0]}
      ref={cont}
      layout
      width={1920}
      justifyContent="space-evenly"
    >
      <Card
        ref={manCard}
        animation={() =>
          all(
            manPath().opacity(1, 1),
            manCirc().end(1, 1),
            manSquare().end(1, 1),
          )
        }
        reverse={() =>
          all(
            manPath().opacity(0, 1),
            manCirc().start(1, 1),
            manSquare().start(1, 1),
          )
        }
        title="HUMANITY"
        color="21FFAA"
      >
        <Rect
          width={200}
          height={200}
          marginTop={-100}
          marginBottom={50}
          alignItems="center"
          justifyContent="center"
        >
          <Path
            opacity={0}
            ref={manPath}
            position={[-159, -150]}
            scale={0.6}
            layout={false}
            fill="21FFAA"
            data={man[1]}
          />
          <Rect
            end={0}
            ref={manSquare}
            layout={false}
            stroke="21FFAA"
            width={205}
            ratio={1}
            lineWidth={6}
            position={[0, 30]}
          />
          <Circle
            end={0}
            ref={manCirc}
            layout={false}
            stroke="21FFAA"
            width={252}
            ratio={1}
            lineWidth={6}
            position={[0, 8]}
          />
        </Rect>
      </Card>
      <Card hidden ref={glacierCard} title="GLACIERS" color={colors.sky300}>
        <Img marginTop={-100} width={250} src={glacier} />
      </Card>
      <Card hidden ref={rodentCard} title="RODENTS" color={colors.orange500}>
        <Img
          marginLeft={-80}
          marginRight={-80}
          marginTop={-120}
          width={400}
          src={() => rat[Math.round(ratProgress() * rat.length) % rat.length]}
        />
      </Card>
      <Card hidden ref={bugCard} title="BUGS" color={colors.red500}>
        <Img
          shadowColor={colors.red500}
          shadowBlur={50}
          marginTop={-120}
          width={200}
          src={bug}
        />
      </Card>
    </Rect>,
  );

  yield* manCard().show();

  yield* waitUntil("what is required");

  yield* all(
    cont().position(0, 1),
    after("glaciers", glacierCard().show()),
    after(
      "rodents",
      all(ratProgress(20, useDuration("rotate"), linear), rodentCard().show()),
    ),
    after("bugs", bugCard().show()),
    after(
      "out",
      sequence(
        0.1,
        glacierCard().hide(),
        rodentCard().hide(),
        bugCard().hide(),
      ),
    ),
  );

  // The environmentalist ignores this fact that for man to survive he must destroy nature---he spends all of his time considering what is required for the survival of glaciers, or rodents, or bugs, but he does not once consider the requirements for man's survival.

  const list = createRef<ArrowList>();

  view.add(
    <ArrowList position={[240, 0]} ref={list}>
      <Txt maxWidth={1200} textWrap>
        Man lives through production, and production means the destruction of
        nature.
      </Txt>
      <Txt maxWidth={1200} textWrap>
        The alternative premise is environmental-Marxism: on Marx, all that is
        required to run a factory is to have access to the means of production,
        and men's abilities are determined by which means of production they
        have access to.
      </Txt>
      <Txt maxWidth={1200} textWrap>
        On environmentalism: man can live as an animal, he has no specific
        nature, his nature is malleable and dependent on the circumstances he
        finds himself within.
      </Txt>
    </ArrowList>,
  );

  yield* list().next("man lives through production");
  yield* list().next("environmental marxism");
  yield* list().next("on environmentalism");
  yield* list().hideAll("list out", manCard().hide());

  // It is a zero-sum game: man lives through production, and production means the destruction of nature. The alternative premise here is nothing more than environmental-Marxism: on Marx, all that is required to run a factory is to have access to the means of production, and men's abilities are determined by which means of production they have access to. On the environmentalist side, we are told that man can live as an animal, that he has no specific nature, that his nature is malleable and dependent on the circumstances he finds himself within.

  // go to b roll

  // They tell us that greed is destroying the Earth, and that greed is therefore the root of all evil. But what is the root of greed? If greed is this desire to take from nature for the betterment of man, then the root of greed is the sustenance of mankind. The environmentalists cry that we should preserve nature, that capitalism is evil because it yields rewards for people who exploit[fn:1] it, and that instead we should grant rewards to those who "leave well enough alone"---"rewards" are here treated as if they were the arbitrary whim of the policymaker, rather than a law of nature; that if we just decide to reward leaving nature alone that we then can. But who is to pay for this? Who is to produce and provide the rewards for non-production and non-provision?

  // We are told that there is an environmental disaster---what exactly is this disastrous towards? Man, or non-man? It cannot be man, the human environment has never been better---our lives are immeasurably superior to those primitives who lived every day by hunting for their food, and shivering in cold caves at night. Rather than this, the disaster is faced not by man---but by non-man. It is non-man that the environmentalist tells us that we must sacrifice for the sake of.
});
