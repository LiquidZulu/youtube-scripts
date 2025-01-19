import { makeScene2D, Rect, Ray, Img, Layout } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  Color,
  Vector2,
} from "@motion-canvas/core";
import { colors, McasTxt as Txt, popin, popout } from "mcas";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

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
          fill={cols.white.darken(4)}
          stroke={cols.white}
          lineWidth={12}
          gap={42}
        >
          <Txt fontFamily="cubano" fill={cols.white} ref={refs.metaphysics.txt}>
            METAPHYSICS
          </Txt>
          <Rect
            ref={refs.ontology.rect}
            height="100%"
            padding={42}
            justifyContent="center"
            alignItems="center"
            fill={cols.white.darken(4.5)}
            stroke={"#aaaaaa"}
            lineWidth={12}
          >
            <Txt fontFamily="cubano" fill="#aaaaaa" ref={refs.ontology.txt}>
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
          fill={cols.cyan.darken(4)}
          stroke={cols.cyan}
          lineWidth={12}
          gap={42}
        >
          <Txt fontFamily="cubano" fill={cols.cyan} ref={refs.epistemology.txt}>
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
      stroke="#aaaaaa"
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
      stroke="white"
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
      stroke="#aaaaaa"
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
      stroke="white"
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
      stroke={cols.cyan}
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
      stroke={cols.cyan}
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

  yield* waitFor(10);

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
