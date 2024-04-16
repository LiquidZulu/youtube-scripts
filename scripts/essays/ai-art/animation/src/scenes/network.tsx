import {
  Node,
  makeScene2D,
  Img,
  Ray,
  RayProps,
  Rect,
  Circle,
  NodeProps,
} from "@motion-canvas/2d";
import {
  Reference,
  createRef,
  createSignal,
  waitFor,
  chain,
  all,
  SignalValue,
  PossibleColor,
} from "@motion-canvas/core";
import { Latex } from "@motion-canvas/2d/lib/components";

import {
  PlopSpring,
  SmoothSpring,
  spring,
} from "@motion-canvas/core/lib/tweening";

import { popin, popout } from "../util";
import { Network } from "../components";

import computerNoScreen from "../assets/network/computer-no-screen.png";
import computer from "../assets/network/computer.png";
import logoArtstation from "../assets/network/logo-artstation.png";
import logoMine from "../assets/network/logo-circle.png";
import logoGetty from "../assets/network/logo-getty.png";
import logoVerge from "../assets/network/logo-verge.png";
import logoYoutube from "../assets/network/logo-youtube.png";
import rutkowski from "../assets/network/rutkowski.png";
import footballers from "../assets/network/footballers.png";
import bloodborne from "../assets/network/bloodborne.jpg";
import karlaImg from "../assets/network/karla.png";
import server from "../assets/network/server.png";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const iterations = [
    {
      server: {
        tower: createRef<Img>(),
        logo: createRef<Img>(),
      },
      computer: {
        back: createRef<Img>(),
        front: createRef<Img>(),
      },
      ray: createRef<Ray>(),
      art: {
        static: createRef<Img>(),
        moving: createRef<Img>(),
        duration: 2,
      },
    },
    {
      server: {
        getty: createRef<Circle>(),
        youtube: createRef<Circle>(),
        verge: createRef<Circle>(),
      },
      computer: {
        mine: createRef<Circle>(),
        readers: createRef<Circle>(),
        viewer: createRef<Circle>(),
      },
      rays: {
        getty_mine: createRef<Ray>(),
        mine_youtube: createRef<Ray>(),
        youtube_viewer: createRef<Ray>(),
        getty_verge: createRef<Ray>(),
        verge_readers: createRef<Ray>(),
      },
      art: {
        mine: createRef<Img>(),
        viewer: createRef<Img>(),
        moving: createRef<Img>(),
      },
    },
  ];

  view.add(
    <Rect gap={32} alignItems="center" direction="column" layout>
      <Img ref={iterations[0].server.tower} height={200} src={server} />
      <Ray ref={iterations[0].ray} stroke={0xa0a0a0} lineWidth={8} toY={300} />
      <Img ref={iterations[0].computer.back} height={200} src={computer} />
    </Rect>
  );

  view.add(
    <Img
      scale={createSignal(() => iterations[0].computer.back().scale())}
      ref={iterations[0].art.static}
      src={rutkowski}
      width={128}
      x={createSignal(() => iterations[0].computer.back().x() - 12)}
      y={createSignal(() => iterations[0].computer.back().y() - 26)}
    />
  );

  view.add(
    <Img
      scale={createSignal(() => iterations[0].computer.back().scale())}
      height={200}
      ref={iterations[0].computer.front}
      src={computerNoScreen}
      position={createSignal(() => iterations[0].computer.back().position())}
    />
  );

  view.add(
    <Img
      width={iterations[0].server.tower().width() * (60 / 100)}
      x={
        iterations[0].server.tower().position().x -
        iterations[0].server.tower().width() * (50 / 100)
      }
      y={
        iterations[0].server.tower().position().y +
        iterations[0].server.tower().height() * (50 / 100)
      }
      ref={iterations[0].server.logo}
      src={logoArtstation}
    />
  );

  view.add(
    <Img
      zIndex={0}
      ref={iterations[0].art.moving}
      src={rutkowski}
      width={128}
    />
  );

  iterations[0].art.static().opacity(0);
  iterations[0].art.moving().position(iterations[0].server.tower().position());
  iterations[0].art.moving().scale(0);
  iterations[0].computer.back().scale(0);
  iterations[0].server.logo().scale(0);
  iterations[0].computer.front().opacity(0);
  iterations[0].ray().end(0);

  yield* all(
    popin(iterations[0].server.tower),
    chain(waitFor(0.2), popin(iterations[0].computer.back)),
    chain(waitFor(0.4), popin(iterations[0].server.logo)),
    chain(waitFor(0.2), iterations[0].ray().end(1, 1))
  );

  iterations[0].computer.front().opacity(1);

  yield* waitFor(1);

  yield* popin(iterations[0].art.moving);

  yield* iterations[0].art
    .moving()
    .position(
      iterations[0].computer.back().position(),
      iterations[0].art.duration
    );

  yield* popout(iterations[0].art.moving);
  yield* iterations[0].art.static().opacity(1, 1);

  yield* waitFor(5);

  yield* all(
    popout(iterations[0].computer.back),
    chain(waitFor(0.2), iterations[0].ray().start(1, 1)),
    chain(waitFor(0.2), popout(iterations[0].server.logo)),
    chain(waitFor(0.4), popout(iterations[0].server.tower))
  );

  yield* waitFor(1);

  const networkStyle = {
    fill: 0x202228,
  };

  view.add(
    <Network
      repelForce={createSignal(400)}
      seed="qqyp;uwl"
      vertices={{
        getty: {
          ref: iterations[1].server.getty,
          contents: (
            <Circle
              fill={networkStyle.fill}
              ref={iterations[1].server.getty}
              width={220}
              height={220}
              alignItems="center"
              direction="column"
              layout
            >
              <Rect layout={false}>
                <Img marginLeft={20} height={200} src={server} />
                <Img x={-50} y={80} width={80} height={80} src={logoGetty} />
              </Rect>
            </Circle>
          ),
          links: [
            ["mine", iterations[1].rays.getty_mine],
            ["verge", iterations[1].rays.getty_verge],
          ],
        },
        youtube: {
          ref: iterations[1].server.youtube,
          contents: (
            <Circle
              fill={networkStyle.fill}
              ref={iterations[1].server.youtube}
              width={220}
              height={220}
              layout
            >
              <Rect x={-10} layout={false}>
                <Img height={200} src={server} />
                <Img x={-50} y={80} width={80} height={80} src={logoYoutube} />
              </Rect>
            </Circle>
          ),
          links: [["viewer", iterations[1].rays.youtube_viewer]],
        },
        verge: {
          ref: iterations[1].server.verge,
          contents: (
            <Circle
              fill={networkStyle.fill}
              ref={iterations[1].server.verge}
              width={220}
              height={250}
              alignItems="center"
              direction="column"
              layout
            >
              <Rect y={-20} x={10} layout={false}>
                <Img height={200} src={server} />
                <Img x={-50} y={80} width={80} height={80} src={logoVerge} />
              </Rect>
            </Circle>
          ),
          links: [["readers", iterations[1].rays.verge_readers]],
        },
        mine: {
          ref: iterations[1].computer.mine,
          contents: (
            <Circle
              fill={networkStyle.fill}
              ref={iterations[1].computer.mine}
              width={250}
              height={250}
              alignItems="center"
              direction="column"
              layout
            >
              <Rect y={-30} layout={false}>
                <Img height={200} src={computer} />
                <Img
                  ref={iterations[1].art.mine}
                  x={-18}
                  y={-28}
                  src={footballers}
                  width={128}
                />
                <Img height={200} src={computerNoScreen} />
                <Img x={-70} y={80} width={80} height={80} src={logoMine} />
              </Rect>
            </Circle>
          ),
          links: [["youtube", iterations[1].rays.mine_youtube]],
        },
        viewer: {
          ref: iterations[1].computer.viewer,
          contents: (
            <Circle
              fill={networkStyle.fill}
              ref={iterations[1].computer.viewer}
              width={250}
              height={250}
              alignItems="center"
              direction="column"
              layout
            >
              <Rect y={-30} layout={false}>
                <Img height={200} src={computer} />
                <Img
                  ref={iterations[1].art.viewer}
                  x={-18}
                  y={-28}
                  src={footballers}
                  width={128}
                />
                <Img height={200} src={computerNoScreen} />
              </Rect>
            </Circle>
          ),
        },
        readers: {
          ref: iterations[1].computer.readers,
          contents: (
            <Circle
              fill={networkStyle.fill}
              ref={iterations[1].computer.readers}
              width={270}
              height={270}
              alignItems="center"
              direction="column"
              layout
            >
              <Img marginTop={30} width={100} src={computer} />
              <Rect layout>
                <Img width={100} src={computer} />
                <Img width={100} src={computer} />
              </Rect>
            </Circle>
          ),
        },
      }}
    />
  );

  view.add(
    <Img ref={iterations[1].art.moving} src={footballers} width={128} />
  );

  for (let server of Object.values(iterations[1].server)) {
    server().scale(0);
  }

  for (let computer of Object.values(iterations[1].computer)) {
    computer().scale(0);
  }

  for (let ray of Object.values(iterations[1].rays)) {
    ray().end(0);
  }

  for (let art of Object.values(iterations[1].art) as Reference<Img>[]) {
    art().opacity(0);
  }

  yield* all(
    popin(iterations[1].server.getty),
    iterations[1].rays.getty_mine().end(1, 1),
    chain(waitFor(0.2), popin(iterations[1].computer.mine))
  );

  iterations[1].art.moving().position(iterations[1].server.getty().position());
  iterations[1].art.moving().opacity(1);
  iterations[1].art.moving().scale(0);

  yield* popin(iterations[1].art.moving);
  yield* iterations[1].art
    .moving()
    .position(iterations[1].computer.mine().position(), 1);
  yield* popout(iterations[1].art.moving);
  yield* iterations[1].art.mine().opacity(1, 1);

  yield* all(
    popin(iterations[1].server.youtube),
    chain(waitFor(0.1), popin(iterations[1].computer.viewer)),
    iterations[1].rays.mine_youtube().end(1, 0.5),
    chain(waitFor(0.2), iterations[1].rays.youtube_viewer().end(1, 0.5))
  );

  yield* popin(iterations[1].art.moving);
  yield* chain(
    iterations[1].art
      .moving()
      .position(iterations[1].server.youtube().position(), 0.5),
    iterations[1].art
      .moving()
      .position(iterations[1].computer.viewer().position(), 0.5)
  );
  yield* popout(iterations[1].art.moving);
  yield* iterations[1].art.viewer().opacity(1, 1);

  iterations[1].art.moving().position(iterations[1].server.getty().position());

  yield* all(
    iterations[1].rays.getty_verge().end(1, 1),
    popin(iterations[1].server.verge)
  );

  yield* popin(iterations[1].art.moving);
  yield* iterations[1].art
    .moving()
    .position(iterations[1].server.verge().position(), 1);
  yield* popout(iterations[1].art.moving);

  yield* all(
    iterations[1].rays.verge_readers().end(1, 1),
    popin(iterations[1].computer.readers)
  );

  yield* popin(iterations[1].art.moving);
  yield* iterations[1].art
    .moving()
    .position(iterations[1].computer.readers().position(), 1);
  yield* popout(iterations[1].art.moving);

  yield* all(
    popout(iterations[1].server.getty),
    iterations[1].rays.getty_mine().start(1, 1),
    iterations[1].rays.getty_verge().start(1, 1),
    chain(
      waitFor((2 / 3) * 0.4),
      all(
        popout(iterations[1].server.verge),
        iterations[1].rays.verge_readers().start(1, 1)
      )
    ),
    chain(
      waitFor(0.4),
      all(
        popout(iterations[1].computer.mine),
        iterations[1].rays.mine_youtube().start(1, 1)
      )
    ),
    chain(waitFor((2 / 3) * 0.8), popout(iterations[1].computer.readers)),
    chain(
      waitFor(0.8),
      all(
        popout(iterations[1].server.youtube),
        iterations[1].rays.youtube_viewer().start(1, 1)
      )
    ),
    chain(waitFor(1.2), popout(iterations[1].computer.viewer))
  );

  yield* waitFor(1);

  const karla = {
    computers: new Array(5).fill(null).map((x) => createRef<Img>()),
    picture: createRef<Img>(),
    server: createRef<Img>(),
    rays: {
      server: createRef<Ray>(),
      computers: new Array(5).fill(null).map((x) => createRef<Ray>()),
    },
    latex: createRef<Latex>(),
    bloodborne: [
      createRef<Img>(),
      createRef<Img>(),
      createRef<Img>(),
      createRef<Img>(),
      createRef<Img>(),
      createRef<Img>(),
      createRef<Img>(),
    ],
  };

  view.add(
    <Img
      ref={karla.picture}
      width={400}
      src={karlaImg}
      stroke={0x202228}
      lineWidth={64}
    />
  );
  karla.picture().scale(0);

  view.add(<Img ref={karla.server} width={200} x={-620} src={server} />);
  karla.server().scale(0);

  view.add(
    <Rect
      fill={0x202228}
      lineWidth={16}
      stroke={0x202228}
      x={620}
      gap={16}
      direction="column"
      layout
    >
      {karla.computers.map((x) => (
        <Img scale={0} ref={x} src={computer} width={180} />
      ))}
      <Latex
        scale={0}
        height={150}
        ref={karla.latex}
        tex="{\color{#a0a0a0}\vdots}"
      />
    </Rect>
  );

  view.add(
    <Ray
      ref={karla.rays.server}
      stroke={0xa0a0a0}
      lineWidth={8}
      fromX={createSignal(() => karla.server().right().x + 32)}
      toX={createSignal(() => karla.picture().position().x)}
    />
  );

  for (let i = 0; i < karla.computers.length; ++i) {
    view.add(
      <Ray
        ref={karla.rays.computers[i]}
        stroke={0xa0a0a0}
        lineWidth={8}
        from={karla.picture().position}
        to={createSignal(() => {
          const { x, y } = karla.computers[i]().position();
          return { x: x + 620, y: y };
        })}
      />
    );
  }

  karla.rays.server().moveToBottom();
  karla.rays.server().end(0);

  for (let i = 0; i < karla.rays.computers.length; ++i) {
    karla.rays.computers[i]().moveToBottom();
    karla.rays.computers[i]().end(0);
  }

  yield* all(
    popin(karla.server),
    karla.rays.server().end(1, 1),
    chain(waitFor(0.2), all(popin(karla.picture))),
    chain(
      waitFor(0.4),
      all(
        ...karla.computers.map((x, i) =>
          chain(waitFor(0.05 * (i + 1)), popin(x))
        )
      )
    ),
    all(
      ...karla.rays.computers.map((x, i) =>
        chain(waitFor(0.05 * i + 1), x().end(1, 1))
      )
    ),
    chain(waitFor(0.6), popin(karla.latex))
  );

  view.add(<Img ref={karla.bloodborne[0]} src={bloodborne} width={100} />);

  karla.bloodborne[0]().position(
    (() => {
      const { x, y } = karla.server().position();
      return { x: x - 48, y: y + 64 };
    })()
  );
  karla.bloodborne[0]().scale(0);

  yield* popin(karla.bloodborne[0]);

  view.add(<Img ref={karla.bloodborne[1]} src={bloodborne} width={100} />);
  karla.bloodborne[1]().position(karla.bloodborne[0]().position());

  yield* all(
    karla.bloodborne[1]().opacity(0).opacity(1, 0.5),
    karla.bloodborne[1]().position(
      [
        karla.bloodborne[1]().position().x + 500,
        karla.bloodborne[1]().position().y,
      ],
      1
    )
  );

  let toYield = [];

  for (let i = 0; i < karla.computers.length; ++i) {
    view.add(
      <Img ref={karla.bloodborne[i + 2]} src={bloodborne} width={100} />
    );
    karla.bloodborne[i + 2]().position(karla.bloodborne[1]().position());

    toYield.push(
      chain(
        waitFor(0.1 * i),
        all(
          karla.bloodborne[i + 2]().opacity(0).opacity(1, 1),
          karla.bloodborne[i + 2]().position(
            (() => {
              const { x, y } = karla.computers[i]().position();
              return { x: x + 620, y: y };
            })(),
            1
          )
        ),
        popout(karla.bloodborne[i + 2])
      )
    );
  }

  yield* all(...toYield);
  yield* waitFor(1);

  yield* all(
    popout(karla.latex),
    ...karla.computers.map((x, i) => chain(waitFor(0.1 * (i + 1)), popout(x))),
    ...karla.rays.computers.map((x, i) =>
      chain(waitFor(0.1 * (i + 1)), x().start(1, 1))
    ),
    chain(waitFor(0.6), popout(karla.bloodborne[1])),
    chain(
      waitFor(0.7),
      all(popout(karla.picture), karla.rays.server().start(1, 1))
    ),
    chain(waitFor(0.8), popout(karla.bloodborne[0])),
    chain(waitFor(0.9), popout(karla.server))
  );
});
