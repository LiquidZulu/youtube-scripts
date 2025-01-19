import {
  makeScene2D,
  Rect,
  Ray,
  Img,
  Video,
  Gradient,
  TxtProps,
  RayProps,
  Circle,
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
  loopUntil,
  loopFor,
  spawn,
  useDuration,
  linear,
  easeInCubic,
  easeInElastic,
  SignalValue,
  Color,
  waitUntil,
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
import {
  ArrowList,
  Browser,
  fadeoutleft,
  mkGradient,
  SquigglyBorder,
  Tree,
} from "mcas/lib";
import artistVid from "../assets/artist.mp4";
import oparImg from "../assets/opar.jpg";
import forum from "../assets/defining-objectivism.png";
import randImg from "../assets/rand.png";
import manImg from "../assets/man.png";
import skinImg from "../assets/skin.jpg";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const definition = createRef<Txt>();
  const genus = createRef<Txt>();
  const differentia = createRef<Txt>();
  const g = colors.emerald500;
  const d = colors.sky500;
  const cont = createRef<Rect>();
  const list = createRef<ArrowList>();

  view.add(
    <Rect
      layout
      direction="column"
      gap={64}
      ref={cont}
      alignItems="center"
      position={[0, 182]}
    >
      <Txt fontSize={60} fill="white" ref={definition}>
        Objectivism is <Txt ref={genus}>the philosophy</Txt> of{" "}
        <Txt ref={differentia}>the primacy of existence</Txt>.
      </Txt>
      <ArrowList ref={list}>
        <Txt>
          Not a frozen abstraction: I am not <Txt.i>defining</Txt.i> Objectivism
          as "true philosophy."
        </Txt>
        <Txt>
          Objectivism is true philosophy <Txt.i>on</Txt.i> my definition, but
          not <Txt.i>by</Txt.i> definition.
        </Txt>
        <Txt>
          Objectivism is true philosophy{" "}
          <Txt.i>because the primacy of existence is true</Txt.i>.
        </Txt>
      </ArrowList>
    </Rect>,
  );

  yield* fadein(definition);

  yield* waitUntil("genus");
  yield* genus().fill(g, 1);

  yield* waitUntil("differentia");
  yield* differentia().fill(d, 1);

  yield* list().next("not frozen abstraction", null, cont().position(0, 1));
  yield* list().next("true on definition");
  yield* list().next("true because poe true");

  yield* waitUntil("plato");

  // I have thus satisfied both requirements of a definition on Objectivist grounds---I have a genus (philosophy) and differentia (the explicit application of the primacy of existence). And I do not fall into the same frozen abstraction objection brought forth by Biddle, because I am not /defining/ Objectivism as "true philosophy." To be sure, Objectivism is true philosophy /on/ my definition, but not /by/ definition as it is with more primitive forms of open Objectivism---rather, Objectivism is true philosophy /because the primacy of existence is true/. So if somehow I were to be convinced that the correct approach in, say, aesthetics is to appeal to Platonic forms or something, I would consider that Platonic aesthetics to be part of true philosophy, but not part of Objectivism. The Platonic method would here be supposedly yielding truth, but it would not be adhering to the unique Objectivist innovation which is to explicitly apply the primacy of existence to /every/ philosophical issue.

  yield* all(fadeout(definition), delay(0.1, list().hideAll()));

  const artist = createRef<Rect>();
  const video = createRef<Video>();
  const squiggly = createRef<SquigglyBorder>();

  view.add(
    <Rect
      ref={artist}
      shadowBlur={50}
      shadowColor="000000aa"
      shadowOffsetY={25}
    >
      <SquigglyBorder ref={squiggly}>
        <Video src={artistVid} ref={video} width={1920 * (2 / 3)} />
      </SquigglyBorder>
    </Rect>,
  );

  video().play();

  let wiggle = true;

  yield spawn(function* () {
    while (wiggle) {
      yield* squiggly().wiggle();
    }
  });

  yield* popin(artist);
  yield* waitUntil("end");
  yield* popout(artist);

  wiggle = false;

  // This is why my definition is correct, as against the innumerable other attempts made to define the philosophy. For instance, you will hear legion Randians attempt to define it as "the philosophy of Ayn Rand." To be clear: I am not, here, referring to the fact that Peikoff's book is called /Objectivism: The Philosophy of Ayn Rand/. That's a fine book title. I am referring to the numerous people I have had legitimately approach the question "what is the definition of Objectivism?" with "it's the philosophy that Ayn Rand came up with." The essence of Objectivism simply is not that Ayn Rand discovered it. This is a non-definition, the Randian has failed to identify any essential, distinguishing, characteristic(s) of the Objectivist view as against any other view.

  const opardef = createRef<Txt>();

  view.add(
    <Txt ref={opardef} fill="white" fontSize={60}>
      "Objectivism is the philosophy of Ayn Rand."
    </Txt>,
  );

  yield* fadein(opardef);

  yield* waitUntil("opar");

  const opar = createRef<Img>();

  view.add(<Img ref={opar} src={oparImg} position={[0, 500]} opacity={0} />);

  yield* all(
    opardef().position([0, -400], 1),
    opar().position([0, 100], 1),
    delay(0.3, fadein(opar)),
  );

  yield* waitUntil("opar out");

  // I am referring to the numerous people I have had legitimately approach the question "what is the definition of Objectivism?" with "it's the philosophy that Ayn Rand came up with." The essence of Objectivism simply is not that Ayn Rand discovered it. This is a non-definition, the Randian has failed to identify any essential, distinguishing, characteristic(s) of the Objectivist view as against any other view.

  const browser = createRef<Browser>();

  view.add(
    <Browser
      hyperlink="https://forum.objectivismonline.com/index.php?/topic/571-defining-objectivism/"
      position={[800, 100]}
      ref={browser}
      opacity={0}
    >
      <Img src={forum} width={1350} position={[175, 0]} />
    </Browser>,
  );

  yield* all(
    opar().position([-800, 100], 1),
    opar().opacity(0, 1),
    browser().position([0, 100], 1),
    browser().opacity(1, 1),
    browser().scroll(0.8, useDuration("scroll")),
    chain(waitUntil("browser out"), popout(browser)),
  );

  // Suppose, for instance, that Ayn Rand were to have gone through some philosophical progression, like many other philosophers have. Perhaps the early Rand comes up with Objectivism as we all know and love, but then at a later point, completely renounces this philosophy and comes up with something entirely different. Both of these philosophies would surely be borne from Rand, and yet they are clearly different and require different names. We find that the fact that Rand came up with an idea is not the /essence/ of that idea.

  const rand = createRef<Img>();
  const ray = createRef<Ray>();
  const current = createRef<Ray>();

  view.add(
    <Img
      ref={rand}
      src={randImg}
      width={350}
      shadowBlur={50}
      shadowColor="000000aa"
      shadowOffsetY={25}
    />,
  );

  view.add(
    <Ray
      end={0}
      ref={ray}
      lineWidth={40}
      fromX={-800}
      toX={800}
      fromY={400}
      toY={400}
      stroke={
        new Gradient({
          fromX: -800,
          toX: 800,
          stops: (() => {
            const N = 10;
            let stops = [];

            for (let i = 0; i < N + 1; ++i) {
              const prog = i / N;
              stops.push({
                offset: prog,
                color: new Color(colors.green500).lerp(colors.red500, prog),
              });
            }

            return stops;
          })(),
        })
      }
    />,
  );

  const progress = createSignal(0);

  view.add(
    <Ray
      end={0}
      ref={current}
      endArrow
      stroke={() => new Color(colors.green500).lerp(colors.red500, progress())}
      fromY={300}
      toY={375}
      position={() => [progress() * 1600 - 800, 0]}
      lineWidth={18}
    />,
  );

  yield* popin(rand);

  yield* waitUntil("progression");

  yield* ray().end(1, 1);

  yield* waitUntil("early rand");

  yield* current().end(1, 1);

  yield* waitUntil("late rand");

  yield* all(progress(1, 1));

  yield* waitUntil("sin");

  const sinProgress = createSignal(0);
  progress(createSignal(() => (Math.sin(sinProgress() + Math.PI / 2) + 1) / 2));

  yield* all(
    loopUntil("stop sin", function* () {
      yield* sinProgress(sinProgress() + Math.PI, 1, linear);
    }),
    chain(
      waitUntil("progress out"),
      all(
        ray().end(0, 1),
        current().start(1, 1),
        rand().position([0, 50], 1),
        rand().width(400, 1),
      ),
    ),
  );

  // The other sort of definition that the typical Randian will reach for consists of listing off the different branches of philosophy and briefly explaining the Objectivist position on each. Again, this is not the proper way to construct a definition. Nowhere else do we define something by listing off a number of attributes that it has.

  yield* waitUntil("listing definition");

  yield* all(popout(rand), opardef().text("Definition by listing.", 1));

  yield* waitUntil("man rational animal");

  const man = createRef<Img>();
  const brain = createRef<Rect>();

  view.add(
    <Img
      ref={man}
      src={manImg}
      height={800}
      position={[0, 80]}
      shadowBlur={50}
      shadowColor="000000aa"
      shadowOffsetY={25}
    />,
  );

  view.add(<Rect ref={brain} width={130} height={70} position={[-15, -286]} />);

  const genusTxt: TxtProps = {
    fontSize: 40,
    fill: "white",
  };

  const homo = createRef<Txt>();

  const treeStruct = {
    node: new Txt({ ...genusTxt, text: "Hominoidea" }),
    children: [
      {
        node: new Txt({ ...genusTxt, text: "Hominoidae" }),
        children: [
          {
            node: new Txt({ ...genusTxt, text: "Homininae" }),
            children: [
              {
                node: new Txt({ ...genusTxt, text: "Hominini" }),
                children: [
                  {
                    node: new Txt({ ...genusTxt, text: "Homo" }),
                  },
                  {
                    node: new Txt({ ...genusTxt, text: "Pan" }),
                  },
                ],
              },
              {
                node: new Txt({ ...genusTxt, text: "Gorillini" }),
                children: [
                  {
                    node: new Txt({ ...genusTxt, text: "Gorilla" }),
                  },
                ],
              },
            ],
          },
          {
            node: new Txt({ ...genusTxt, text: "Ponginae" }),
            children: [
              {
                node: new Txt({ ...genusTxt, text: "Pongo" }),
              },
            ],
          },
        ],
      },
      {
        node: new Txt({ ...genusTxt, text: "Hylobatidae" }),
        children: [
          {
            node: new Txt({ ...genusTxt, text: "Hylobates" }),
          },
        ],
      },
    ],
  };

  const tree = createRef<Tree>();

  view.add(
    <Tree
      ref={tree}
      crush={() => (depth: number) => {
        switch (depth) {
          case 0:
            return 1.5;
          case 1:
            return 1.4;
          case 2:
            return 1.3;
          case 3:
            return 0.7;
          default:
            return 1;
        }
      }}
      tree={treeStruct}
      gap={128}
      scale={0.5}
      position={[-500, 0]}
      hidden
    />,
  );

  view.add(<Rect ref={homo} height={25} width={60} position={[-799, 144]} />);

  const arms = createSignal(0);
  const legs = createSignal(0);
  const armsandlegs = createRefArray<Rect>();

  view.add(
    <Rect layout direction="column" position={[-580, 337]}>
      <Rect opacity={0} ref={armsandlegs}>
        <Txt fontFamily="mononoki" fill="white">
          <Txt fill={colors.fuchsia200}>arms</Txt> =
        </Txt>
        <Txt
          fontFamily="mononoki"
          fill={colors.zinc400}
          text={() => " " + arms().toFixed(1)}
        />
      </Rect>
      <Rect opacity={0} ref={armsandlegs}>
        <Txt fontFamily="mononoki" fill="white">
          <Txt fill={colors.emerald200}>legs</Txt> =
        </Txt>
        <Txt
          fontFamily="mononoki"
          fill={colors.zinc400}
          text={() => " " + legs().toFixed(1)}
        />
      </Rect>
    </Rect>,
  );

  const limbrays = createRefArray<Ray>();
  const limbrayprops = () =>
    ({
      end: 0,
      ref: limbrays,
      lineWidth: 8,
      endArrow: true,
      stroke: "white",
    }) as RayProps;

  view.add(<Ray {...limbrayprops()} from={[-410, 309]} to={[-150, 30]} />);
  view.add(<Ray {...limbrayprops()} from={[-410, 309]} to={[143, 30]} />);
  view.add(<Ray {...limbrayprops()} from={[-410, 365]} to={[-90, 331]} />);
  view.add(<Ray {...limbrayprops()} from={[-410, 365]} to={[70, 441]} />);

  const ear = createRef<Rect>();
  const nose = createRef<Rect>();

  view.add(<Rect ref={ear} width={30} height={30} position={[-47, -210]} />);
  view.add(<Rect ref={nose} width={20} height={30} position={[32, -228]} />);

  const skin = createRef<Circle>();
  const skinray = createRefArray<Ray>();

  view.add(
    <Circle
      scale={0}
      ref={skin}
      position={[567, 29]}
      clip
      lineWidth={10}
      stroke="white"
      ratio={1}
      width={400}
      shadowBlur={50}
      shadowColor="000000aa"
      shadowOffsetY={25}
    >
      <Img src={skinImg} height={400} />
    </Circle>,
  );

  view.add(
    <Ray
      end={0}
      lineWidth={5}
      stroke="white"
      from={[147, -38]}
      to={[512, -166]}
      ref={skinray}
    />,
  );
  view.add(
    <Ray
      end={0}
      lineWidth={5}
      stroke="white"
      from={[147, -40]}
      to={[445, 191]}
      ref={skinray}
    />,
  );

  yield* all(popin(man), chain(waitUntil("rational"), flashAround(brain)));

  yield* waitUntil("in the genus homo");
  yield* all(
    tree().show(),
    chain(waitUntil("indicate homo"), flashAround(homo)),
    chain(
      waitUntil("arms and legs"),
      all(
        ...armsandlegs.map((rect, i) =>
          delay(
            0.1 * i,
            fadein(() => rect),
          ),
        ),
        ...limbrays.map((ray, i) => delay(0.1 * i, ray.end(1, 1))),
        arms(2, 1),
        delay(0.1, legs(2, 1)),
      ),
    ),
  );

  yield* all(
    chain(waitUntil("ears"), flashAround(ear)),
    chain(waitUntil("nose"), flashAround(nose)),
    chain(
      waitUntil("skin"),
      all(...skinray.map((ray) => ray.end(1, 1)), delay(0.3, popin(skin))),
    ),
  );

  yield* waitUntil("man out");

  yield* all(
    popout(man),
    tree().hide(),
    delay(
      0.1,
      all(
        all(
          ...armsandlegs.map((rect, i) =>
            delay(
              0.1 * i,
              fadeout(() => rect),
            ),
          ),
          ...limbrays.map((ray, i) => delay(0.1 * i, ray.start(1, 1))),
          delay(0.1, legs(2, 1)),
        ),
        delay(
          0.1,
          all(
            all(...skinray.map((ray) => ray.start(1, 1))),
            delay(0.4, fadeout(skin)),
          ),
        ),
      ),
    ),
  );

  // Man is the rational animal, not the animal that is in the genus homo with two arms and two legs, and ears and a nose, and mostly hairless skin with a certain amount of collagen and melanin and so on and so forth. Similarly, Objectivism is not /defined/ as the philosophy that says such and such on metaphysics, and this other thing on epistemology, and also heres the aesthetic theory, and the meta-ethical viewpoint etc. Objectivism is the philosophy of the primacy of existence. When we are looking for a definition of a /philosophy/, we are looking for what is distinctive to that philosophy, and thus how it approaches each of the branches. No abstraction can be properly defined by listing off each and every particular to which it applies---that is the nominalist approach to definition. So Objectivism as a philosophy which is the broader abstraction beyond each individual branch is not defined in terms of listing off what it says on each branch.

  yield* waitUntil("theend");

  yield* fadeout(opardef);
});
