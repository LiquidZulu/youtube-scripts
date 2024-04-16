import { makeScene2D, Img, ImgProps } from "@motion-canvas/2d";
import {
  waitFor,
  chain,
  all,
  createRef,
  ThreadGenerator,
} from "@motion-canvas/core";

import { popin, popout } from "../util";

import hotdogBun from "../assets/hotdog-spaceship/hotdog-bun.png";
import hotdogKetchup from "../assets/hotdog-spaceship/hotdog-ketchup.png";
import hotdogMustard from "../assets/hotdog-spaceship/hotdog-mustard.png";
import hotdogSausage from "../assets/hotdog-spaceship/hotdog-sausage.png";

import spaceshipBody from "../assets/hotdog-spaceship/spaceship-body.png";
import spaceshipFins from "../assets/hotdog-spaceship/spaceship-fins.png";
import spaceshipNosecone from "../assets/hotdog-spaceship/spaceship-nosecone.png";
import spaceshipRocket from "../assets/hotdog-spaceship/spaceship-rocket.png";
import spaceshipWindow from "../assets/hotdog-spaceship/spaceship-window.png";

export default makeScene2D(function* (view) {
  view.fill(0x202228);

  const refs = {
    hotdog: [
      createRef<Img>(),
      createRef<Img>(),
      createRef<Img>(),
      createRef<Img>(),
    ],
    spaceship: [
      createRef<Img>(),
      createRef<Img>(),
      createRef<Img>(),
      createRef<Img>(),
      createRef<Img>(),
    ],
  };

  const imgOpts: ImgProps = {
    height: 300,
  };

  view.add(
    <>
      <Img
        {...imgOpts}
        ref={refs.hotdog[0]}
        src={hotdogBun}
        scale={1 / 3}
        x={-(1920 / 4)}
      />
      <Img
        {...imgOpts}
        ref={refs.hotdog[1]}
        src={hotdogKetchup}
        x={-(1920 / 4)}
      />
      <Img
        {...imgOpts}
        ref={refs.hotdog[2]}
        src={hotdogMustard}
        x={-(1920 / 4)}
      />
      <Img
        {...imgOpts}
        ref={refs.hotdog[3]}
        src={hotdogSausage}
        x={-(1920 / 4)}
      />
    </>
  );
  view.add(
    <>
      <Img
        {...imgOpts}
        ref={refs.spaceship[1]}
        src={spaceshipBody}
        x={1920 / 4}
      />
      <Img
        {...imgOpts}
        ref={refs.spaceship[2]}
        src={spaceshipFins}
        x={1920 / 4}
      />
      <Img
        {...imgOpts}
        ref={refs.spaceship[0]}
        src={spaceshipNosecone}
        x={1920 / 4}
      />
      <Img
        {...imgOpts}
        ref={refs.spaceship[3]}
        src={spaceshipRocket}
        x={1920 / 4}
      />
      <Img
        {...imgOpts}
        ref={refs.spaceship[4]}
        src={spaceshipWindow}
        x={1920 / 4}
      />
    </>
  );

  for (let hRef of refs.hotdog) {
    hRef().scale(0);
  }

  for (let sRef of refs.spaceship) {
    sRef().scale(0);
  }

  yield* all(
    all(...refs.hotdog.map((x) => popin(x))),
    chain(waitFor(0.2), all(...refs.spaceship.map((x) => popin(x))))
  );

  let animations: { [key: string]: ThreadGenerator[] } = {
    hotdog: [],
    spaceship: [],
  };

  for (let i = 0; i < refs.hotdog.length; ++i) {
    animations.hotdog.push(
      refs.hotdog[i]().y(-(1080 / 2) + (1080 / refs.hotdog.length) * i + 150, 1)
    );
  }

  for (let i = 0; i < refs.spaceship.length; ++i) {
    animations.spaceship.push(
      refs.spaceship[i]().y(
        -(1080 / 2) + (1080 / refs.spaceship.length) * i + 170,
        1
      )
    );
  }

  yield* chain(
    waitFor(0.2),
    all(
      all(...animations.hotdog),
      chain(waitFor(0.2), all(...animations.spaceship))
    )
  );

  yield* waitFor(5);

  yield* all(
    all(...refs.hotdog.map((x, i) => chain(waitFor(0.1 * i), popout(x)))),
    chain(
      waitFor(0.2),
      all(...refs.spaceship.map((x, i) => chain(waitFor(0.1 * i), popout(x))))
    )
  );
});
