import {
  makeScene2D,
  Rect,
  Ray,
  Img,
  Video,
  Circle,
  Shape,
  TxtProps,
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
  useDuration,
  linear,
  sequence,
  waitUntil,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  sinFactory,
  after,
  ArrowList,
  Tree,
} from "mcas";
import * as colors from "mcas/colors";
import brickWall from "../assets/brick-wall.mp4";
import mountainsImg from "../assets/mountains.jpg";
import brainImg from "../assets/brain.png";
import zombieImg from "../assets/zombie.jpg";
import meteorImg from "../assets/meteor.jpeg";
import gravestoneImg from "../assets/gravestone.jpg";
import iphoneImg from "../assets/iphone-back.png";
import moboImg from "../assets/motherboard.png";

export default makeScene2D(function* (view) {
  view.fill(colors.bggreen);

  const video = createRef<Rect>();
  const mountains = createRef<Rect>();
  const ray = createRef<Ray>();
  view.add(
    <Rect
      clip
      width={1920}
      height={1080}
      ref={video}
      lineWidth={50}
      shadowBlur={50}
      shadowColor={colors.green500}
      stroke={colors.green500}
    >
      <Video play src={brickWall} />
    </Rect>,
  );
  view.add(
    <Rect
      position={[(3 * -1920) / 4 - 25, 0]}
      clip
      width={1920 / 2}
      height={1080}
      ref={mountains}
      lineWidth={50}
      shadowBlur={50}
      shadowColor={colors.green500}
      stroke={colors.green500}
    >
      <Img height={1080} src={mountainsImg} />
    </Rect>,
  );

  view.add(
    <Ray
      position={[-1920 / 2 - 25, 0]}
      ref={ray}
      fromY={-1080 / 2}
      toY={1080 / 2}
      lineWidth={50}
      shadowBlur={50}
      shadowColor={colors.green500}
      stroke={colors.green500}
    />,
  );
  yield* all(
    video().position([1920 / 4, 0], 1),
    video().width(1920 / 2, 1),
    mountains().position([-1920 / 4, 0], 1),
    ray().position(0, 1),
  );
  yield* waitUntil("wall");
  const sinProgress = createSignal(0);
  const floatingX = createSignal(-50);
  const sin = sinFactory(20, -20, 0.1);

  const brain = createRef<Img>();

  view.add(
    <Img
      ref={brain}
      scale={0}
      src={brainImg}
      height="80%"
      shadowBlur={50}
      shadowColor="#21FFAA"
    />,
  );
  yield* all(
    after(
      "sin out",
      all(
        delay(0.4, popin(brain)),
        floatingX(1000, 1),
        mountains().shadowBlur(50, 1),
        mountains().stroke(colors.green500, 1),
        mountains().shadowColor(colors.green500, 1),
      ),
    ),
    sinProgress(50, useDuration("sin"), linear),
    video().position(
      createSignal(() => [1920 / 4 + floatingX(), sin(0)(sinProgress())]),
      1,
    ),
    video().size(1920 / 3, 1),
    video().radius(1080, 1),
    video().stroke(colors.sky500, 1),
    video().shadowColor(colors.sky500, 1),
    video().shadowBlur(100, 1),
    after(
      "virgin mountain",
      all(
        video().shadowBlur(50, 1),
        video().stroke(colors.green500, 1),
        video().shadowColor(colors.green500, 1),
        mountains().shadowBlur(100, 1),
        mountains().stroke(colors.sky500, 1),
        mountains().shadowColor(colors.sky500, 1),
      ),
    ),
    ray().lineWidth(0, 0.3),
    delay(
      0.1,
      all(
        mountains().position(
          createSignal(() => [
            -1920 / 4 - floatingX(),
            sin(0.7)(sinProgress()),
          ]),
          1,
        ),
        mountains().size(1920 / 3, 1),
        mountains().radius(1080, 1),
      ),
    ),
  );

  // What is it that separates these two forms of stone? In the case of our wall, that stone has been blasted apart, hewn into bricks, transported to the construction site, and affixed into its proper place---all by the conscious effort of man. In the case of our virgin mountainside, this has not occurred.

  // It is the motive power of man's mind, his destruction and reformation of what nature provides him with which is the fundamental difference between the natural and the unnatural. What, then, is it that the environmentalist advocates for? He advocates that the environment--that collection of dirt, and stone, and bugs--be protected from the gaze of man---that it be left untouched, undisturbed, by any conscious attempt to reform it into a shape which is more suitable for the attainment of the goals of thinking men.

  yield* waitUntil("environmentalist advocates");

  const title = createRef<Txt>();
  const list = createRef<ArrowList>();
  const cont = createRef<Rect>();

  view.add(
    <Rect
      ref={cont}
      position={[0, 358]}
      layout
      direction="column"
      gap={128}
      alignItems="center"
    >
      <Txt ref={title} fontFamily="oswald" fill="#21FFAA" glow fontSize={70} />
      <ArrowList ref={list}>
        <Txt textWrap maxWidth={1600}>
          That the environment--dirt, stone, and bugs--be protected from the
          gaze of man.
        </Txt>
        <Txt textWrap maxWidth={1600}>
          That it be left untouched by any conscious attempt to reform it into a
          shape which is more suitable for the attainment of the goals of
          thinking men.
        </Txt>
        <Txt textWrap maxWidth={1600}>
          The environmental-protectionist seeks to destroy man's success and
          happiness here on Earth, and return him to the dirt that he has pulled
          himself out of.
        </Txt>
      </ArrowList>
    </Rect>,
  );
  yield* popout(brain);
  yield* title().text(
    "what does the environmentalist advocate for?".toUpperCase(),
    1,
  );
  const pos = cont().position().y;
  yield* list().next(
    "environment be protected",
    null,
    cont().position([0, (2 * pos) / 3], 1),
  );
  yield* list().next(
    "be left untouched",
    null,
    cont().position([0, pos / 3], 1),
  );
  yield* list().next(
    "the environmental-protectionist",
    null,
    cont().position(0, 1),
  );

  yield* list().hideAll("list out", fadeout(title));

  // The environmental-protectionist seeks to destroy man's success and happiness here on Earth, and return him to the dirt that he has pulled himself out of. This is apocalyptic in the very core sense of that word---the defining mark of an apocalypse isn't that there was some zombie virus, or that a meteor hit, or even that people died; rather, the core characteristic common to all apocalypses is that there is a mass breakdown in the capital structure.

  const zombie = createRef<Circle>();
  const meteor = createRef<Circle>();
  const gravestone = createRef<Circle>();

  view.add(
    <Rect width="100%" justifyContent="space-evenly">
      <Circle
        scale={0}
        position={() => [-600, sin(0)(sinProgress())]}
        ref={zombie}
        justifyContent="center"
        clip
        size={400}
        lineWidth={30}
        stroke={colors.green500}
        shadowBlur={50}
        shadowColor={colors.green500}
      >
        <Img src={zombieImg} height="100%" />
      </Circle>
      <Circle
        scale={0}
        position={() => [0, sin(0.5)(sinProgress())]}
        ref={meteor}
        justifyContent="center"
        clip
        size={400}
        lineWidth={30}
        stroke={colors.sky500}
        shadowBlur={50}
        shadowColor={colors.sky500}
      >
        <Img src={meteorImg} height="100%" />
      </Circle>
      <Circle
        scale={0}
        position={() => [600, sin(1)(sinProgress())]}
        ref={gravestone}
        justifyContent="center"
        clip
        size={400}
        lineWidth={30}
        stroke={colors.purple500}
        shadowBlur={50}
        shadowColor={colors.purple500}
      >
        <Img src={gravestoneImg} width="100%" />
      </Circle>
    </Rect>,
  );

  sinProgress(0);

  yield* all(
    sinProgress(50, useDuration("sin progress again"), linear),
    after("zombie", popin(zombie)),
    after("meteor", popin(meteor)),
    after("grave", popin(gravestone)),
    after(
      "apocalypse out",
      sequence(
        0.1,
        zombie().scale(1, 0).to(0, 1),
        meteor().scale(1, 0).to(0, 1),
        gravestone().scale(1, 0).to(0, 1),
      ),
    ),
  );

  const mobo = createRef<Img>();
  const txt: TxtProps = {
    fontFamily: "cubano",
    fill: "white",
    fontSize: 15,
  };
  const tree = createRef<Tree>();

  view.add(
    <Tree
      ref={tree}
      hidden
      rowGap={128}
      columnGap={12}
      crush={createSignal(() => (depth: number) => {
        switch (depth) {
          case 0:
            return 1.5;
          default:
            return 1;
        }
      })}
      tree={{
        node: (
          <Rect>
            <Img ref={mobo} marginRight={-145} height={300} src={moboImg} />
            <Img height={300} src={iphoneImg} />
          </Rect>
        ) as Shape,
        children: [
          {
            node: (<Txt {...txt}>metal body</Txt>) as Shape,
            children: [
              {
                node: (<Txt {...txt}>anodised titanium</Txt>) as Shape,
                children: [
                  {
                    node: (<Txt {...txt}>raw titanium</Txt>) as Shape,
                  },
                  {
                    node: (<Txt {...txt}>diode material</Txt>) as Shape,
                  },
                ],
              },
            ],
          },
          {
            node: (<Txt {...txt}>circuit board</Txt>) as Shape,
            children: [
              {
                node: (<Txt {...txt}>laminate insulator</Txt>) as Shape,
                children: [
                  { node: (<Txt {...txt}>resin</Txt>) as Shape },
                  { node: (<Txt {...txt}>cloth</Txt>) as Shape },
                ],
              },
              {
                node: (<Txt {...txt}>copper traces</Txt>) as Shape,
                children: [{ node: (<Txt {...txt}>raw copper</Txt>) as Shape }],
              },
              {
                node: (<Txt {...txt}>glue</Txt>) as Shape,
                children: [
                  { node: (<Txt {...txt}>pva</Txt>) as Shape },
                  { node: (<Txt {...txt}>solvent</Txt>) as Shape },
                ],
              },
              {
                node: (<Txt {...txt}>microchips</Txt>) as Shape,
                children: [
                  { node: (<Txt {...txt}>silicon wafers</Txt>) as Shape },
                ],
              },
              {
                node: (<Txt {...txt}>i/o components</Txt>) as Shape,
                children: [
                  { node: (<Txt {...txt}>camera</Txt>) as Shape },
                  { node: (<Txt {...txt}>buttons</Txt>) as Shape },
                  { node: (<Txt {...txt}>sensors</Txt>) as Shape },
                ],
              },
            ],
          },
          {
            node: (<Txt {...txt}>glass screen</Txt>) as Shape,
            children: [
              {
                node: (<Txt {...txt}>gorilla glass</Txt>) as Shape,
                children: [
                  { node: (<Txt {...txt}>silica crystals</Txt>) as Shape },
                  { node: (<Txt {...txt}>potassium</Txt>) as Shape },
                ],
              },
            ],
          },
        ],
      }}
    />,
  );

  yield* all(
    tree().show(),
    mobo().margin([0, -100, 0, 0], 1),
    after("highlight tree", tree().highlight(0.05)),
  );
  yield* waitUntil("tree out");
  yield* tree().hide();

  // It is this capital structure, this collection of factors that are combined to produce further factors, eventually terminating in consumers' goods, that is the mark of civilisation. Economic growth means growth in this capital structure---it is turning away from dirty, brutal nature, towards the clean and infinite power of man.

  title().opacity(1);
  title().scale(1);
  title().text("");
  list().remove();
  cont().add(
    <ArrowList ref={list}>
      <Txt textWrap maxWidth={1600}>
        Man should live not by using his mind to alter his environment to be
        habitable for him.
      </Txt>

      <Txt textWrap maxWidth={1600}>
        He should live as a lower animal, fending for survival and adapting to
        whatever circumstances he happens to be placed in.
      </Txt>

      <Txt textWrap maxWidth={1600}>
        But just as a dog cannot live as a plant would by expecting his food to
        come to him, so too can a man not live like a dog does by adapting
        himself to his environment, rather than the other way around.
      </Txt>
    </ArrowList>,
  );

  yield* all(
    title().text("on environmentalism:".toUpperCase(), 1),
    list().next(),
  );
  yield* list().next("live as a lower animal");
  yield* list().next("dog cannot live like a plant");
  yield* list().hideAll("list out again", fadeout(title));

  // The environmentalist inversion of this is a desire that man live not by using his mind to alter his environment to be habitable for him, but rather that he live as some lower animal, fending for survival and adapting to whatever circumstances he happens to be placed in. But just as a dog cannot live as a plant would by expecting his food to come to him, so too can a man not live like a dog does, by adapting himself to his environment rather than the other way around.
});
