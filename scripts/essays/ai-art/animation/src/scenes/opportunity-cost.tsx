import { makeScene2D, CubicBezier, Img, Txt } from "@motion-canvas/2d";
import { waitFor, createRef, all, chain, Reference } from "@motion-canvas/core";

import * as icons from "../assets/opportunity-cost-icons";
import { popin, popout } from "../util";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const beziers = [
    createRef<CubicBezier>(),
    createRef<CubicBezier>(),
    createRef<CubicBezier>(),
    createRef<CubicBezier>(),
    createRef<CubicBezier>(),
  ];
  const images = [
    createRef<Img>(),
    createRef<Img>(),
    createRef<Img>(),
    createRef<Img>(),
    createRef<Img>(),
  ];

  const scale = {
    large: 1.4,
    small: 0.8,
  };

  view.add(
    <>
      <CubicBezier
        opacity={0}
        endArrow
        ref={beziers[0]}
        lineWidth={6}
        stroke={0xffffff}
        p0={[0, 500]}
        p1={[0, 300]}
        p2={[-700, 100]}
        p3={[-700, -100]}
        end={0}
      />
      <CubicBezier
        opacity={0}
        endArrow
        ref={beziers[1]}
        lineWidth={6}
        stroke={0xffffff}
        p0={[0, 500]}
        p1={[0, 300]}
        p2={[-350, 100]}
        p3={[-350, -100]}
        end={0}
      />
      <CubicBezier
        opacity={0}
        endArrow
        ref={beziers[2]}
        lineWidth={6}
        stroke={0xffffff}
        p0={[0, 500]}
        p1={[0, 300]}
        p2={[0, 100]}
        p3={[0, -100]}
        end={0}
      />
      <CubicBezier
        opacity={0}
        endArrow
        ref={beziers[3]}
        lineWidth={6}
        stroke={0xffffff}
        p0={[0, 500]}
        p1={[0, 300]}
        p2={[350, 100]}
        p3={[350, -100]}
        end={0}
      />
      <CubicBezier
        opacity={0}
        endArrow
        ref={beziers[4]}
        lineWidth={6}
        stroke={0xffffff}
        p0={[0, 500]}
        p1={[0, 300]}
        p2={[700, 100]}
        p3={[700, -100]}
        end={0}
      />
    </>
  );

  view.add(
    <>
      <Img opacity={0} ref={images[0]} src={icons.scholar} y={-220} x={-700} />
      <Img opacity={0} ref={images[1]} src={icons.couple} y={-220} x={-350} />
      <Img opacity={0} ref={images[2]} src={icons.artist} y={-220} />
      <Img opacity={0} ref={images[3]} src={icons.handyman} y={-220} x={350} />
      <Img opacity={0} ref={images[4]} src={icons.running} y={-220} x={700} />
    </>
  );

  let steps = [];

  for (let i = 0; i < beziers.length; ++i) {
    steps.push(
      chain(
        waitFor(0.1 * i),
        all(
          all(beziers[i]().end(1, 1), beziers[i]().opacity(1, 1)),
          chain(waitFor(0.5), images[i]().opacity(1, 1))
        )
      )
    );
  }

  // arrows go out and icons come in
  yield* chain(all(...steps), waitFor(2));

  // middle icon grows
  //yield* all(images[2]().width(190, 1), images[2]().y(-220, 1));
  yield* images[2]().scale(scale.large, 1);
  yield* waitFor(2);

  // other paths fade
  steps = [];
  for (let i = 0; i < beziers.length; ++i) {
    if (i != 2) {
      steps.push(beziers[i]().opacity(0.4, 1), images[i]().opacity(0.4, 1));
    }
  }

  yield* chain(all(...steps), waitFor(10));

  const title = createRef<Txt>();
  view.add(
    <Txt ref={title} y={-400} fontSize={70} fontFamily="cubano" fill="white">
      opportunity cost
    </Txt>
  );

  yield* popin(() => title().scale(0));
  yield* waitFor(5);

  const mod = {
    other: (img: Reference<Img>, i: number) =>
      all(
        img().scale(scale.large, 1),
        img().opacity(1, 1),
        beziers[i]().opacity(1, 1)
      ),
    main: (img: Reference<Img>, i: number) =>
      all(
        img().scale(0.8, 1),
        img().opacity(0.4, 1),
        beziers[i]().opacity(0.4, 1)
      ),
  };

  yield* all(
    ...images.map((x, i) => (i == 2 ? mod.main(x, i) : mod.other(x, i)))
  );

  yield* waitFor(1);

  yield* all(
    images[0]().scale(1, 1),
    images[1]().scale(1, 1),
    images[2]().scale(1, 1),
    images[2]().opacity(1, 1),
    beziers[2]().opacity(1, 1),
    images[3]().scale(1, 1),
    images[4]().scale(1, 1)
  );

  yield* all(
    popout(title),
    chain(
      waitFor(0.1),
      all(...images.map((x, i) => chain(waitFor(0.1 * i), popout(x))))
    ),
    chain(
      waitFor(0.2),
      all(...beziers.map((x, i) => chain(waitFor(0.1 * i), x().start(1, 1))))
    )
  );
});
