import { makeScene2D, Rect, Ray, Img, Path, Circle } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  PossibleColor,
  ThreadGenerator,
  Reference,
  delay,
  waitUntil,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout, a } from "mcas";
import * as colors from "mcas/colors";
import head from "../assets/human-head";
import man from "../assets/man";
import anvil from "../assets/anvil";
import { ArrowList, flashAround } from "mcas/lib";

// This brings us squarely to nominalism: that concepts are merely linguistic conventions, collective names arbitrarily imposed by men on roughly resembling particulars on the standard of subjective human convenience. That there are no /real/ universals, particulars are the only things that exist. That man /creates/ classes of objects, rather than discovering them.

// This nominalist-sensualist position, which has been grafted onto empiricism since the renaissance, yields disastrous consequences on philosophy. There can be no meaningful definitions on this view, a definition is supposed to be a statement of the essence of some class; but if classification is subjective and arbitrary, so too must definitions be. Definitions can no longer be stated to be true or false, just convenient or inconvenient---and there can be no objective standard of convenience! This then means that there can be no general principles. If one says that man is mortal, or socialism is slavery; he is counting upon the definitions of those terms. But those definitions are now said to be arbitrary, and so the general statements are also arbitrary and so falls away general objective principles. Every dispute over principles thus falls into the well of being a merely semantic disagreement over how we are going to use words, rather than an actual dispute over what is true or false.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const nominalism = createRef<Txt>();
  view.add(
    <Txt fontFamily="Oswald" fill="white" ref={nominalism} fontSize={80}>
      NOMINALISM
    </Txt>,
  );

  yield* fadein(nominalism);

  // {"x":76.4000015258789,"y":91.0923080444336}

  type Tile = {
    color: PossibleColor;
    animation: () => ThreadGenerator;
    reverse: () => ThreadGenerator;
    title: Reference<Txt>;
    cont: Reference<Rect>;
  };

  const lingHead = createRef<Path>();
  const lingCircs = createRefArray<Circle>();

  const manPath = createRef<Path>();
  const manSquare = createRef<Rect>();
  const manCirc = createRef<Circle>();

  const anvilPath = createRef<Path>();

  const tiles: { [key: string]: Tile } = {
    linguisticConvention: {
      color: colors.rose500,
      animation: () =>
        all(
          lingHead().opacity(1, 1),
          ...lingCircs
            .slice()
            .reverse()
            .map((circ, i) =>
              delay(
                0.1 * i,
                all(
                  circ.opacity(1, 1),
                  circ.scale(0.4).scale(1, 1),
                  circ.start(0.45).start(0.3, 1),
                  circ.end(0.45).end(0.6, 1),
                ),
              ),
            ),
        ),
      reverse: () =>
        all(
          delay(0.3, lingHead().opacity(0, 1)),
          ...lingCircs.map((circ, i) =>
            delay(
              0.1 * i,
              all(
                circ.opacity(0, 1),
                circ.scale(0.4, 1),
                circ.start(0.45, 1),
                circ.end(0.45, 1),
              ),
            ),
          ),
        ),
      title: createRef<Txt>(),
      cont: createRef<Rect>(),
    },
    universals: {
      color: colors.indigo500,
      title: createRef<Txt>(),
      cont: createRef<Rect>(),
      animation: () =>
        all(
          manPath().opacity(1, 1),
          manCirc().end(1, 1),
          manSquare().end(1, 1),
        ),
      reverse: () =>
        all(
          manPath().opacity(0, 1),
          manCirc().start(1, 1),
          manSquare().start(1, 1),
        ),
    },
    createClasses: {
      color: colors.lime500,
      title: createRef<Txt>(),
      cont: createRef<Rect>(),
      animation: () => all(anvilPath().opacity(1, 1)),
      reverse: () => all(anvilPath().opacity(0, 1)),
    },
  };

  function* showTile(tile: Tile) {
    yield* all(fadein(tile.title), tile.cont().end(1, 1), tile.animation());
  }

  function* hideTile(tile: Tile) {
    yield* all(fadeout(tile.title), tile.cont().start(1, 1), tile.reverse());
  }

  view.add(
    <Rect layout height={600} gap={128} position={[0, 100]}>
      <Rect
        ref={tiles.universals.cont}
        lineWidth={12}
        stroke={tiles.universals.color}
        padding={50}
        width={400}
        height="100%"
        alignItems="center"
        justifyContent="center"
        direction="column"
        gap={200}
        end={0}
      >
        <Txt
          ref={tiles.universals.title}
          textAlign="center"
          fill={tiles.universals.color}
          glow
          fontFamily="oswald"
          opacity={0}
        >
          NO <Txt.i>REAL</Txt.i>
          {"\n"}UNIVERSALS
        </Txt>
        <Rect
          height={200}
          marginTop={-100}
          alignItems="center"
          justifyContent="center"
        >
          <Path
            opacity={0}
            ref={manPath}
            position={[-159, -150]}
            scale={0.6}
            layout={false}
            fill={tiles.universals.color}
            data={man[1]}
          />
          <Rect
            end={0}
            ref={manSquare}
            layout={false}
            stroke={tiles.universals.color}
            width={205}
            ratio={1}
            lineWidth={6}
            position={[0, 30]}
          />
          <Circle
            end={0}
            ref={manCirc}
            layout={false}
            stroke={tiles.universals.color}
            width={252}
            ratio={1}
            lineWidth={6}
            position={[0, 8]}
          />
        </Rect>
      </Rect>
      <Rect
        ref={tiles.linguisticConvention.cont}
        end={0}
        lineWidth={12}
        stroke={tiles.linguisticConvention.color}
        padding={50}
        width={400}
        height="100%"
        alignItems="center"
        justifyContent="center"
        direction="column"
        gap={200}
      >
        <Txt
          ref={tiles.linguisticConvention.title}
          opacity={0}
          textAlign="center"
          fill={tiles.linguisticConvention.color}
          glow
          fontFamily="oswald"
        >
          LINGUISTIC{"\n"}CONVENTIONS
        </Txt>
        <Rect
          height={200}
          marginTop={-100}
          alignItems="center"
          justifyContent="center"
        >
          <Path
            opacity={0}
            ref={lingHead}
            data={head}
            fill={tiles.linguisticConvention.color}
            scale={2}
            marginLeft={-50}
            marginTop={-100}
          />
          {a(3).map((_, i) => (
            <Circle
              opacity={0}
              ref={lingCircs}
              layout={false}
              width={40 + 40 * i}
              ratio={1}
              position={[-39, 32]}
              stroke={tiles.linguisticConvention.color}
              lineWidth={4}
              end={0.6}
              start={0.3}
            />
          ))}
        </Rect>
      </Rect>
      <Rect
        end={0}
        ref={tiles.createClasses.cont}
        lineWidth={12}
        stroke={tiles.createClasses.color}
        padding={50}
        width={400}
        height="100%"
        alignItems="center"
        justifyContent="center"
        direction="column"
        gap={200}
      >
        <Txt
          opacity={0}
          ref={tiles.createClasses.title}
          textAlign="center"
          fill={tiles.createClasses.color}
          glow
          fontFamily="oswald"
        >
          MAN <Txt.i>CREATES</Txt.i>
          {"\n"}UNIVERSALS
        </Txt>
        <Rect
          height={200}
          marginTop={-100}
          alignItems="center"
          justifyContent="center"
        >
          <Path
            opacity={0}
            ref={anvilPath}
            position={[-126, -120]}
            layout={false}
            data={anvil}
            fill={tiles.createClasses.color}
            scale={8}
          />
        </Rect>
      </Rect>
    </Rect>,
  );

  yield* waitUntil("show things");

  yield* all(
    nominalism().position([0, -400], 1),
    nominalism().text("NOMINALISM ON CONCEPTS:", 1),
  );

  yield* showTile(tiles.linguisticConvention);

  yield* waitUntil("no universals");

  yield* showTile(tiles.universals);

  yield* waitUntil("creates universals");

  yield* showTile(tiles.createClasses);

  yield* waitUntil("no definitions");

  yield* all(
    fadeout(nominalism),
    delay(0.1, hideTile(tiles.universals)),
    delay(0.2, hideTile(tiles.linguisticConvention)),
    delay(0.3, hideTile(tiles.createClasses)),
  );

  // There can be no meaningful definitions on this view, a definition is supposed to be a statement of the essence of some class; but if classification is subjective and arbitrary, so too must definitions be. Definitions can no longer be stated to be true or false, just convenient or inconvenient---and there can be no objective standard of convenience! This then means that there can be no general principles. If one says that man is mortal, or socialism is slavery; he is counting upon the definitions of those terms. But those definitions are now said to be arbitrary, and so the general statements are also arbitrary and so falls away general objective principles. Every dispute over principles thus falls into the well of being a merely semantic disagreement over how we are going to use words, rather than an actual dispute over what is true or false.

  const list = createRef<ArrowList>();
  const title = createRefArray<Txt>();
  const impliesArrow = createRef<Ray>();

  view.add(
    <Rect layout direction="column" alignItems="center" gap={128}>
      <Rect alignItems="center" gap={32}>
        <Txt ref={title} fill="white">
          Nominalism-Sensualism
        </Txt>
        <Ray
          end={0}
          ref={impliesArrow}
          lineWidth={8}
          stroke="white"
          endArrow
          toX={100}
          arrowSize={12}
        />
        <Txt ref={title} fill="white">
          no meaningful definitions:
        </Txt>
      </Rect>
      <ArrowList ref={list}>
        <Txt textWrap maxWidth={1200}>
          A definition is the statement of the essence of some class; but
          classification is subjective and arbitrary.
        </Txt>
        <Txt textWrap maxWidth={1200}>
          ∴ definitions cannot be true or false.
        </Txt>
        <Txt textWrap maxWidth={1200}>
          ∴ there can be no general principles.
        </Txt>
        <Txt textWrap maxWidth={1200}>
          Every dispute over principles is a mere semantic disagreement over how
          we are going to use words.
        </Txt>
      </ArrowList>
    </Rect>,
  );

  yield* all(
    all(
      fadein(() => title[0]),
      delay(0.2, impliesArrow().end(1, 1)),
      delay(
        0.4,
        fadein(() => title[1]),
      ),
    ),
    list().next(),
  );

  yield* waitUntil("definitions not true or false");
  yield* list().next();

  yield* waitUntil("no general principles");
  yield* list().next();

  yield* waitUntil("general principles arbitrary");
  yield* flashAround(() => list().items[0]);

  yield* waitUntil("mere semantic disagreement");
  yield* list().next();

  yield* waitUntil("end");
  yield* all(
    all(
      fadeout(() => title[0]),
      delay(0.2, impliesArrow().start(1, 1)),
      delay(
        0.4,
        fadeout(() => title[1]),
      ),
    ),
    delay(
      0.2,
      all(...list().items.map((item, i) => delay(0.05 * i, list().hide(item)))),
    ),
  );
});
