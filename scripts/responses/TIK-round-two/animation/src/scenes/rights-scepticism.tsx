import { makeScene2D, Rect, Ray, Img, Video, Shape } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
  spawn,
  Color,
  Reference,
  Vector2,
  ColorSignal,
  SimpleSignal,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { ArrowList, flashAround, SquigglyBorder } from "mcas/lib";
import whatMouth from "../assets/what-mouth.mp4";
import animalBeast from "../assets/animal-beast-censored.mp4";

// the instant a man tries to defend his
// conduct by asserting that conflicts should
// not be avoided and that rights are illusory
// he necessarily asserts that conflicts should
// be avoided (when initiated against him) and
// that rights are real (when the thief is facing
// a counter-attack).

export default makeScene2D(function* (view) {
  view.fill("#030014");

  const list = createRef<ArrowList>();
  const txts = createRefArray<Txt>();

  view.add(
    <ArrowList ref={list}>
      <Txt ref={txts}>Conflicts should not be avoided!</Txt>
      <Txt ref={txts}>Rights are illusory!</Txt>
    </ArrowList>,
  );

  yield* list().next();
  yield* list().next("rights illusory");
  yield* waitUntil("conflict change");
  yield* txts[0].text(
    "Conflicts should be avoided (when initiated against me)!",
    1,
  );
  yield* waitUntil("rights change");
  yield* txts[1].text(
    "Rights are real (when the thief is facing a counter-attack)!",
    1,
  );
  yield* waitFor(1);
  yield* all(
    ...list().items.map((item, i) =>
      chain(waitFor(i * 0.2), list().hide(item)),
    ),
  );

  const video = createRef<Video>();
  const squiggly = createRefArray<SquigglyBorder>();
  const cont = createRef<Rect>();

  view.add(
    <Rect ref={cont}>
      <Video
        play
        width={1920 * (2 / 3)}
        ref={video}
        src={whatMouth}
        shadowBlur={50}
        shadowColor="000000aa"
        shadowOffsetY={25}
      />
      <SquigglyBorder
        ref={squiggly}
        stroke={colors.purple500}
        shadowBlur={20}
        shadowColor={colors.purple500}
      >
        <Shape width={1920 * (2 / 3)} height={1080 * (2 / 3)} />
      </SquigglyBorder>
    </Rect>,
  );

  let wiggle = true;

  yield spawn(function* () {
    while (wiggle) {
      yield* all(...squiggly.map((x) => x.wiggle()));
    }
  });

  yield* popin(cont);
  yield* waitUntil("animal beast");
  video().src(animalBeast);
  yield* waitUntil("vid out");
  yield* popout(cont);
  wiggle = false;

  // So this man would be left with only the option of sealing up his lips and making no defense, living as an animal-beast ruled by whatever whims he feels at the moment, with no concern for whether his conduct is rationally defensible.

  const cols = {
    red: new Color("red"),
    blue: new Color("blue"),
    green: new Color("green"),
    yellow: new Color("yellow"),
    teal: new Color("teal"),
    cyan: new Color("cyan"),
    magenta: new Color("magenta"),
    white: new Color("white"),
  };

  const refs = {
    philosophy: {
      rect: createRef<Rect>(),
      txt: createRef<Txt>(),
    },
    metaphysics: {
      rect: createRef<Rect>(),
      txt: createRef<Txt>(),
    },
    ontology: {
      rect: createRef<Rect>(),
      txt: createRef<Txt>(),
    },
    epistemology: {
      rect: createRef<Rect>(),
      txt: createRef<Txt>(),
    },
    ethics: {
      rect: createRef<Rect>(),
      txt: createRef<Txt>(),
    },
    law: {
      rect: createRef<Rect>(),
      txt: createRef<Txt>(),
    },
    aesthetics: {
      rect: createRef<Rect>(),
      txt: createRef<Txt>(),
    },
  };

  const rays = {
    metaphysics_aesthetics: createRef<Ray>(),
    ontology_aesthetics: createRef<Ray>(),
    metaphysics_epistemology: createRef<Ray>(),
    ontology_epistemology: createRef<Ray>(),
    epistemology_aesthetics: createRef<Ray>(),
    epistemology_ethics: createRef<Ray>(),
    epistemology_law: createRef<Ray>(),
    ethics_aesthetics: createRef<Ray>(),
    law_aesthetics: createRef<Ray>(),
  };

  const mcol = createSignal(cols.white);
  const ecol = createSignal(cols.cyan);

  view.add(
    <Rect
      layout
      direction="column"
      alignItems="center"
      justifyContent="center"
      gap={128}
      width="90%"
      height="90%"
      fill={cols.red.alpha(0.1)}
      stroke={cols.red}
      lineWidth={12}
      ref={refs.philosophy.rect}
    >
      <Txt fontFamily="cubano" fill={cols.red} ref={refs.philosophy.txt}>
        PHILOSOPHY
      </Txt>
      <Rect
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        width="80%"
      >
        <Rect
          ref={refs.metaphysics.rect}
          direction="column"
          padding={42}
          justifyContent="center"
          alignItems="center"
          fill={createSignal(() => mcol().darken(4))}
          stroke={mcol}
          lineWidth={12}
          gap={42}
        >
          <Txt fontFamily="cubano" fill={mcol} ref={refs.metaphysics.txt}>
            METAPHYSICS
          </Txt>
          <Rect
            ref={refs.ontology.rect}
            height="100%"
            padding={42}
            justifyContent="center"
            alignItems="center"
            fill={() => mcol().darken(4.5)}
            stroke={() => mcol().darken(2)}
            lineWidth={12}
          >
            <Txt
              fontFamily="cubano"
              fill={() => mcol().darken(2)}
              ref={refs.ontology.txt}
            >
              ONTOLOGY
            </Txt>
          </Rect>
        </Rect>
        <Rect
          ref={refs.epistemology.rect}
          height="100%"
          direction="column"
          padding={42}
          justifyContent="center"
          alignItems="center"
          fill={createSignal(() => ecol().darken(4))}
          stroke={ecol}
          lineWidth={12}
          gap={42}
        >
          <Txt fontFamily="cubano" fill={ecol} ref={refs.epistemology.txt}>
            EPISTEMOLOGY
          </Txt>
        </Rect>
        <Rect
          ref={refs.ethics.rect}
          direction="column"
          padding={42}
          justifyContent="center"
          alignItems="center"
          fill={cols.yellow.darken(4)}
          stroke={cols.yellow}
          lineWidth={12}
          gap={42}
        >
          <Txt fontFamily="cubano" fill={cols.yellow} ref={refs.ethics.txt}>
            Ethics
          </Txt>
          <Rect
            ref={refs.law.rect}
            height="100%"
            padding={42}
            justifyContent="center"
            alignItems="center"
            fill={cols.yellow.darken(4.5)}
            stroke={"goldenrod"}
            lineWidth={12}
          >
            <Txt fontFamily="cubano" fill="goldenrod" ref={refs.law.txt}>
              LAW
            </Txt>
          </Rect>
        </Rect>
      </Rect>
      <Rect
        ref={refs.aesthetics.rect}
        padding={42}
        width="80%"
        justifyContent="center"
        alignItems="center"
        fill={cols.magenta.darken(4)}
        stroke={cols.magenta}
        lineWidth={12}
      >
        <Txt fontFamily="cubano" fill={cols.magenta} ref={refs.aesthetics.txt}>
          AESTHETICS
        </Txt>
      </Rect>
    </Rect>,
  );

  const arrowSpacing = 49.8;

  const getLocalPos = (pos: Vector2, mod?: [number, number]) => {
    const { x, y } = pos;
    const [modX, modY] = mod ?? [0, 0];
    return {
      x: x - 1920 / 2 + modX,
      y: y - 1080 / 2 + modY,
    };
  };

  view.add(
    <Ray
      ref={rays.ontology_epistemology}
      lineWidth={12}
      stroke={() => mcol().darken(2)}
      endArrow
      from={getLocalPos(refs.ontology.rect().absolutePosition(), [
        refs.ontology.rect().width() / 2,
        0,
      ])}
      toY={getLocalPos(refs.ontology.rect().absolutePosition()).y}
      toX={
        getLocalPos(refs.epistemology.rect().absolutePosition(), [
          -refs.epistemology.rect().width() / 2 - 6,
          0,
        ]).x
      }
    />,
  );

  view.add(
    <Ray
      ref={rays.metaphysics_epistemology}
      lineWidth={12}
      stroke={mcol}
      endArrow
      from={getLocalPos(refs.metaphysics.rect().absolutePosition(), [
        refs.metaphysics.rect().width() / 2,
        0,
      ])}
      toY={getLocalPos(refs.metaphysics.rect().absolutePosition()).y}
      toX={
        getLocalPos(refs.epistemology.rect().absolutePosition(), [
          -refs.epistemology.rect().width() / 2 - 6,
          0,
        ]).x
      }
    />,
  );

  view.add(
    <Ray
      ref={rays.ontology_aesthetics}
      lineWidth={12}
      stroke={() => mcol().darken(2)}
      endArrow
      from={getLocalPos(refs.ontology.rect().absolutePosition(), [
        -arrowSpacing / 2,
        refs.ontology.rect().height() / 2 + 6,
      ])}
      toY={
        getLocalPos(refs.aesthetics.rect().absolutePosition(), [
          0,
          -refs.aesthetics.rect().height() / 2 - 6,
        ]).y
      }
      toX={
        getLocalPos(refs.ontology.rect().absolutePosition(), [
          -arrowSpacing / 2,
          0,
        ]).x
      }
    />,
  );

  view.add(
    <Ray
      ref={rays.metaphysics_aesthetics}
      lineWidth={12}
      stroke={mcol}
      endArrow
      from={getLocalPos(refs.metaphysics.rect().absolutePosition(), [
        arrowSpacing / 2,
        refs.metaphysics.rect().height() / 2,
      ])}
      toY={
        getLocalPos(refs.aesthetics.rect().absolutePosition(), [
          0,
          -refs.aesthetics.rect().height() / 2 - 6,
        ]).y
      }
      toX={
        getLocalPos(refs.metaphysics.rect().absolutePosition(), [
          arrowSpacing / 2,
          0,
        ]).x
      }
    />,
  );

  view.add(
    <Ray
      ref={rays.epistemology_aesthetics}
      lineWidth={12}
      stroke={ecol}
      endArrow
      from={getLocalPos(refs.epistemology.rect().absolutePosition(), [
        0,
        refs.epistemology.rect().height() / 2,
      ])}
      toY={
        getLocalPos(refs.aesthetics.rect().absolutePosition(), [
          0,
          -refs.aesthetics.rect().height() / 2 - 6,
        ]).y
      }
      toX={getLocalPos(refs.epistemology.rect().absolutePosition()).x}
    />,
  );

  view.add(
    <Ray
      ref={rays.epistemology_ethics}
      lineWidth={12}
      stroke={ecol}
      endArrow
      from={getLocalPos(refs.epistemology.rect().absolutePosition(), [
        refs.epistemology.rect().width() / 2,
        0,
      ])}
      toY={getLocalPos(refs.epistemology.rect().absolutePosition()).y}
      toX={
        getLocalPos(refs.ethics.rect().absolutePosition(), [
          -refs.ethics.rect().width() / 2 - 6,
          0,
        ]).x
      }
    />,
  );

  view.add(
    <Ray
      ref={rays.epistemology_law}
      lineWidth={12}
      stroke={cols.cyan}
      endArrow
      from={getLocalPos(refs.epistemology.rect().absolutePosition(), [
        refs.epistemology.rect().width() / 2,
        arrowSpacing,
      ])}
      toY={
        getLocalPos(refs.epistemology.rect().absolutePosition(), [
          0,
          arrowSpacing,
        ]).y
      }
      toX={
        getLocalPos(refs.law.rect().absolutePosition(), [
          -refs.law.rect().width() / 2 - 6,
          0,
        ]).x
      }
    />,
  );

  view.add(
    <Ray
      ref={rays.law_aesthetics}
      lineWidth={12}
      stroke={"goldenrod"}
      endArrow
      from={getLocalPos(refs.law.rect().absolutePosition(), [
        -arrowSpacing / 2,
        refs.law.rect().height() / 2,
      ])}
      toY={
        getLocalPos(refs.aesthetics.rect().absolutePosition(), [
          0,
          -refs.aesthetics.rect().height() / 2 - 6,
        ]).y
      }
      toX={
        getLocalPos(refs.law.rect().absolutePosition(), [-arrowSpacing / 2, 0])
          .x
      }
    />,
  );

  view.add(
    <Ray
      ref={rays.ethics_aesthetics}
      lineWidth={12}
      stroke={cols.yellow}
      endArrow
      from={getLocalPos(refs.ethics.rect().absolutePosition(), [
        arrowSpacing / 2,
        refs.ethics.rect().height() / 2,
      ])}
      toY={
        getLocalPos(refs.aesthetics.rect().absolutePosition(), [
          0,
          -refs.aesthetics.rect().height() / 2 - 6,
        ]).y
      }
      toX={
        getLocalPos(refs.ethics.rect().absolutePosition(), [
          arrowSpacing / 2,
          0,
        ]).x
      }
    />,
  );

  const d = 2;
  const w = d / 10;

  for (let { txt } of Object.values(refs)) {
    txt().scale(0);
  }

  yield* all(
    refs.philosophy
      .rect()
      .fill(new Color(refs.philosophy.rect().fill() as Color).alpha(0))
      .fill(new Color(refs.philosophy.rect().fill() as Color).alpha(0.1), d),
    refs.philosophy.rect().end(0.5).end(1, d),
    refs.philosophy.rect().start(0.5).start(0, d),
    popin(refs.philosophy.txt),
    ...Object.values(refs)
      .slice(1)
      .map((x, i) =>
        chain(
          waitFor(w * (i + 1)),
          all(
            x
              .rect()
              .fill(new Color(x.rect().fill() as Color).alpha(0))
              .fill(new Color(x.rect().fill() as Color).alpha(1), d),
            x.rect().end(0).end(1, d),
            popin(x.txt),
          ),
        ),
      ),
    ...Object.values(rays).map((x, i) =>
      chain(
        waitFor(w * (i + 1)),
        x()
          .end(0)
          .end(1, d / 2),
      ),
    ),
  );

  const flash = <T extends Shape = Shape>(
    ref: Reference<T>,
    eventName: string,
  ) => {
    return chain(
      waitUntil(eventName),
      flashAround(ref, null, 0.3, null, {
        lineWidth: 12,
        shadowColor: colors.purple500,
        shadowBlur: 20,
        stroke: colors.purple500,
      }),
    );
  };

  yield* flash(refs.metaphysics.rect, "flash metaphysics");
  yield* flash(refs.epistemology.rect, "flash epistemology");
  yield* flash(refs.ethics.rect, "flash ethics");
  yield* flash(refs.epistemology.rect, "flash epistemology again");

  // So at best the jungle-law ethic reduces into whim-worship, but recall above that ethics itself rests upon earlier conclusions in metaphysics and epistemology, so upon what metaphysical and/or epistemic premises does such an ethic rest? Fundamentally, we have the question of "how should we be dealing with conflicts, what is criminal?" and the jungle-jurist asserts: "who gives a damn? Might makes right; live by your arbitrary whims." What this means, if taken as a serious ethical proposal, is that whims are a genuine source of knowledge, i.e. this is not only a whim-ethic, but a whim-epistemology---it all boils down to "I think this is true because I feel like it is;" "I should take this spear because I feel like I should."

  yield* flash(refs.metaphysics.rect, "flash metaphysics again");

  // But of course, epistemology does not stand on it's own, it is not primary in philosophy; rather a given epistemology rests on prior metaphysical premises. So on what metaphysical premises does this whim-epistemology rest? What is really being said here is that if you simply /think/ something to be the case hard enough then it /is/ the case; that your whims, your thoughts, your consciousness is the basis of reality. That existence conforms to your consciousness, rather than the other way around. This is the fallacy of the primacy of consciousness. This view of the law of the jungle or any other whim-based theory does and must rely on the premise that consciousness--mere thoughts--have metaphysical primacy over existence.

  yield* waitUntil("hop out");

  yield* all(
    refs.philosophy
      .rect()
      .fill(new Color(refs.philosophy.rect().fill() as Color).alpha(0), d),
    refs.philosophy.rect().end(0.5, d),
    refs.philosophy.rect().start(0.5, d),
    popout(refs.philosophy.txt),
    ...Object.values(refs)
      .slice(1)
      .map((x, i) =>
        chain(
          waitFor(w * (i + 1)),
          all(
            x.rect().fill(new Color(x.rect().fill() as Color).alpha(0), d),
            x.rect().start(1, d),
            popout(x.txt),
          ),
        ),
      ),
    ...Object.values(rays).map((x, i) =>
      chain(waitFor(w * (i + 1)), x().start(1, d / 2)),
    ),
  );
});
