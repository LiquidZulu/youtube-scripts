import { makeScene2D, Rect, Ray, Img, Camera, Node } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  useDuration,
  linear,
  waitUntil,
  SmoothSpring,
  spring,
  delay,
  easeInBounce,
  easeInElastic,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";

import forestImg from "../assets/crusoe/forest.png";
import forestTreeImg from "../assets/crusoe/forest-tree.png";
import stickImg from "../assets/crusoe/stick.png";
import crusoeImg from "../assets/crusoe/crusoe.png";
import spearImg from "../assets/crusoe/spear.png";
import beachImg from "../assets/crusoe/beach.png";
import fridayImg from "../assets/crusoe/friday.png";
import fireImg from "../assets/crusoe/bonfire.png";
import elderImg from "../assets/crusoe/village-elder.png";
import apophisImg from "../assets/crusoe/apophis.png";

import { ArrowList, flashAround, shake } from "mcas/lib";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  /*
       As an example, say Robinson Crusoe is on the desert island and finds a stick poking out of a tree. He expects that this stick would allow him to begin spearfishing, so he fashions a point onto the end and then runs off to the ocean to give it a go. At this point another man, Friday, sees this stick and thinks that it would be great to stoke his fire; so he runs up to Crusoe and attempts to wrestle it off of him.

     */

  const bg = createRef<Rect>();
  const crusoe = createRef<Img>();
  const stick = createRef<Img>();

  view.add(
    <Rect ref={bg}>
      <Img width={1920} src={forestImg} />
      <Img
        ref={stick}
        src={stickImg}
        rotation={80}
        width={400}
        position={[300, 133]}
      />
      <Img width={1920} src={forestTreeImg} />
    </Rect>,
  );

  const spear = createRef<Img>();

  view.add(
    <Rect position={[-1920 / 2 - 300, 100]} ref={crusoe}>
      <Img src={crusoeImg} width={500} />
      <Img
        opacity={0}
        ref={spear}
        src={spearImg}
        rotation={60}
        height={500}
        position={[150, -80]}
      />
    </Rect>,
  );

  yield* bg().opacity(0).opacity(1, 1);

  yield* crusoe().position([-200, 100], useDuration("crusoe walks in"));

  yield* waitUntil("makes spear");

  yield* chain(
    all(crusoe().rotation(20, 0.4), crusoe().position([0, 100], 0.4)),
    all(
      crusoe().rotation(0, 0.4),
      stick().opacity(0, 0.4),
      spear().opacity(1, 0.4),
    ),
  );

  yield* waitUntil("goes to ocean");

  const beach = createRef<Img>();
  const fire = createRef<Img>();
  const friday = createRef<Img>();
  const camera = createRef<Camera>();
  const crusoePseud = createRef<Rect>();

  view.add(
    <Camera ref={camera} position={[0, 0]} zoom={0.001}>
      <Rect width={1920} height={1080} clip>
        <Img opacity={1} ref={beach} src={beachImg} height={1080} />
        <Img
          opacity={1}
          ref={fire}
          src={fireImg}
          width={200}
          position={[92, 100]}
        />
        <Img
          opacity={1}
          ref={friday}
          src={fridayImg}
          width={200}
          position={[-100, -50]}
        />
        <Rect position={[500, 100]} ref={crusoePseud} opacity={0}>
          <Img src={crusoeImg} width={500} />
          <Img
            ref={spear}
            src={spearImg}
            rotation={60}
            height={500}
            position={[150, -80]}
          />
        </Rect>
      </Rect>
    </Camera>,
  );

  yield* all(
    crusoe().position([1920 / 2 + 300, 100], 1),
    spring(SmoothSpring, 0.001, 1, 0.01, (value) => {
      camera().zoom(value);
    }),
  );

  crusoe().position([-1920 / 2 - 300, 100]);
  crusoe().zIndex(1);

  yield* crusoe().position([500, 100], 1);

  yield* waitUntil("friday zoom");

  crusoe().remove();
  crusoePseud().opacity(1);

  yield* all(camera().centerOn(friday().position(), 1), camera().zoom(2, 1));

  yield* waitUntil("friday run");

  yield* all(
    camera().centerOn([0, 0], 1),
    camera().zoom(1, 1),
    friday().width(400, 1),
    friday().position([30, 100], 1),
  );

  /*

       If these men were so inclined to attempt to justify their respective conduct pertaining to the stick, let's think about what they might say. Crusoe could argue that it is his stick because he found it first and was already using it before Friday came over and tried to take it from him. Friday then says that this is irrelevant, because he wants the stick and so is justified in taking it from Crusoe. Or perhaps Friday appeals to a villiage elder who said that Friday is the stick-keeper for the whole island, and so that is why he is justified. You can think of any number of different authorities that Friday might appeal to, whether it be himself, that villiage elder, or even some sort of deity that bestowed this power unto him---but the point is that Friday is justifying his conduct by reference to the sayso of an authority. This means that Friday is a legal authoritarian, with Crusoe being the legal anarchist.

     */

  yield* waitUntil("indicate crusoe");

  const crusoeIndicate = createRef<Rect>();
  const fridayIndicate = createRef<Rect>();

  view.add(
    <Rect
      ref={crusoeIndicate}
      width={550}
      height={1050}
      position={crusoePseud().position}
    />,
  );

  view.add(
    <Rect
      ref={fridayIndicate}
      width={350}
      height={800}
      position={friday().position}
    />,
  );

  yield* all(
    flashAround(crusoeIndicate),
    shake((value) => {
      crusoePseud().scale(1 + value);
    }, 0.005),
  );

  yield* waitUntil("indicate friday");

  yield* all(
    flashAround(fridayIndicate),
    shake((value) => {
      friday().scale(1 + value);
    }, 0.005),
  );

  yield* waitUntil("friday wants it!");

  const reasons = createRef<Rect>();
  const reasonsTitle = createRef<Txt>();
  const wantIt = createRef<Txt>();
  const elder = createRef<Img>();
  const deity = createRef<Img>();

  view.add(
    <Rect
      ref={reasons}
      layout
      direction="column"
      position={[-560, 0]}
      alignItems="center"
      gap={64}
      fill={colors.zinc900}
      padding={50}
      paddingLeft={80}
      paddingRight={80}
      lineWidth={4}
      stroke={colors.emerald500}
      shadowBlur={50}
      shadowColor={colors.emerald500}
    >
      <Txt
        ref={reasonsTitle}
        marginBottom={-32}
        fontFamily="oswald"
        fill={colors.zinc400}
      >
        FRIDAY'S REASONS:
      </Txt>
      <Txt
        ref={wantIt}
        fill="white"
        stroke="black"
        fontSize={80}
        fontFamily="cubano"
        text={String.raw` `}
      />
      <Img
        scale={0}
        marginTop={() => -293 - reasons().gap().y}
        ref={elder}
        src={elderImg}
        width={300}
      />
      <Img
        scale={0}
        marginTop={() => -329 - reasons().gap().y}
        ref={deity}
        src={apophisImg}
        width={300}
      />
    </Rect>,
  );

  yield* all(wantIt().text(`"I want it!"`, 1), fadein(reasons));

  yield* waitUntil("elder");

  yield* all(delay(0.5, popin(elder)), elder().margin(0, 1));

  yield* waitUntil("indicate himself");

  yield* all(
    shake((value) => {
      friday().scale(1 + value);
    }, 0.005),
    flashAround(fridayIndicate),
  );

  yield* waitUntil("indicate elder");

  yield* flashAround(elder);

  yield* waitUntil("deity");

  yield* all(delay(0.5, popin(deity)), deity().margin(0, 1));

  yield* waitUntil("justified because authority");

  const reasonsIndicate = createRef<Rect>();

  view.add(
    <Rect
      position={[-560, 0]}
      width={reasons().width}
      height={reasons().height}
      scale={reasons().scale}
      ref={reasonsIndicate}
    />,
  );

  yield* all(
    reasons().shadowBlur(200, 0.25).to(100, 0.25),
    reasons().shadowColor(colors.rose500, 0.5),
    reasons().stroke(colors.rose500, 0.5),
    reasons().scale(1.05, 0.25).to(1, 0.25),
    flashAround(reasonsIndicate),
  );

  yield* waitUntil("legal authoritarian");

  yield* all(
    shake((value) => {
      friday().scale(1 + value);
    }, 0.005),
    flashAround(fridayIndicate),
  );

  yield* waitUntil("legal anarchist");

  yield* all(
    shake((value) => {
      crusoePseud().scale(1 + value);
    }, 0.005),
    flashAround(crusoeIndicate),
  );

  /*

       It is worth noting on this point that legal anarchism doesn't mean that there are no laws, Crusoe is not asserting that anything goes, rather he is asserting that the law does not come from some authority figure's arbitrary decrees, that it is objective, that it is inherent in nature. Accordingly, anarchism is called a theory of natural law.

     */

  yield* waitUntil("beach away");

  bg().opacity(0);

  yield* all(
    camera().zoom(1.1, 0.5).to(0.0002, 1),
    reasons().position([-1500, 0], 1),
  );

  const anarchismNeNoLaws = createRef<Txt>();

  view.add(
    <Txt
      ref={anarchismNeNoLaws}
      fill="white"
      fontFamily="oswald"
      fontSize={70}
    />,
  );

  yield* anarchismNeNoLaws().text("Legal Anarchism ≠ No Laws", 1);

  yield* waitUntil("arbitrary decrees");

  const list = createRef<ArrowList>();

  view.add(
    <ArrowList ref={list}>
      <Txt>
        The law does not come from some{"\n"}authority figure's arbitrary
        decrees.
      </Txt>
      <Txt>Law is objective/natural.</Txt>
    </ArrowList>,
  );

  yield* all(
    delay(0.5, list().next()),
    anarchismNeNoLaws().text("Legal Anarchism", 1),
    anarchismNeNoLaws().position([0, -300], 1),
  );

  yield* waitUntil("law is natural");

  yield* list().next();

  /*

       Now, which man strikes you as being the more peaceful individual? Surely it is Crusoe. Crusoe was minding his business and then Friday physically attacked him and attempted to deprive him of his means of bettering his own life. This is an important observation: anarchism is peaceful, it is the non-anarchists who bring about chaos.
     */

  yield* waitUntil("which man more peaceful?");

  yield* all(
    anarchismNeNoLaws().text("", 1),
    ...list().items.map((item, i) => delay((i + 1) * 0.2, list().hide(item))),
    delay(
      1.2,
      spring(SmoothSpring, 0.001, 1, 0.001, (value) => {
        camera().zoom(value);
      }),
    ),
  );

  yield* waitUntil("indicate crusoe as peaceful");

  yield* all(
    shake((value) => {
      crusoePseud().scale(1 + value);
    }, 0.005),
    flashAround(crusoeIndicate),
  );

  yield* waitUntil("anarchism = peaceful");

  const anarchismPeaceful = createRef<ArrowList>();

  view.add(
    <ArrowList position={[0, 320]} ref={anarchismPeaceful}>
      <Txt>Anarchism is peaceful.</Txt>
      <Txt>Statism is chaotic.</Txt>
    </ArrowList>,
  );

  yield* all(
    delay(
      0.1,
      all(
        ...anarchismPeaceful()
          .items.reverse()
          .map((item, i) => delay(0.15 * i, anarchismPeaceful().show(item))),
      ),
    ),
    camera().zoom(0.5, 1),
    camera().position([0, 300], 1),
  );

  yield* waitUntil("end");

  yield* all(
    camera().position([0, 1700], 1),
    ...anarchismPeaceful().items.map((item, i) =>
      delay(0.15 * i, anarchismPeaceful().hide(item)),
    ),
  );
});
