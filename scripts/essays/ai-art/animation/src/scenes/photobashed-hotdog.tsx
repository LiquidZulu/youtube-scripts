import { makeScene2D, Img, Ray } from "@motion-canvas/2d";
import {
  waitFor,
  createRef,
  chain,
  all,
  createSignal,
} from "@motion-canvas/core";
import bun from "../assets/photobashed-hotdog/photobashed-hotdog-bun.png";
import sauce from "../assets/photobashed-hotdog/photobashed-hotdog-sauce.png";
import sausageOrigin from "../assets/photobashed-hotdog/photobashed-hotdog-sausage-origin.png";
import sausage from "../assets/photobashed-hotdog/photobashed-hotdog-sausage.png";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0xffffff);
  const refs = {
    bun: [createRef<Img>(), createRef<Img>()],
    sausage: [createRef<Img>(), createRef<Img>()],
    sauce: [createRef<Img>(), createRef<Img>()],
    bunRay: createRef<Ray>(),
    sausageRay: createRef<Ray>(),
    sauceRay: createRef<Ray>(),
  };

  const rayCoordinates = {
    bun: {
      from: { x: -400, y: -250 },
      to: { x: -200, y: -90 },
    },
    sausage: {
      from: { x: 0, y: 250 },
      to: { x: 0, y: 120 },
    },
    sauce: {
      from: { x: 450, y: -300 },
      to: { x: 200, y: -90 },
    },
  };

  const opacity = createSignal<number>(0);

  view.add(
    <>
      <Img
        opacity={opacity}
        ref={refs.bun[0]}
        src={bun}
        scale={1 / 3}
        x={-(1920 / 3)}
        y={-(1080 / 3)}
      />
      <Ray
        opacity={0}
        endArrow
        ref={refs.bunRay}
        stroke={"black"}
        fromX={rayCoordinates.bun.from.x}
        fromY={rayCoordinates.bun.from.y}
        toX={rayCoordinates.bun.to.x}
        toY={rayCoordinates.bun.to.y}
        lineWidth={5}
      />
      <Img
        opacity={opacity}
        ref={refs.bun[1]}
        src={bun}
        scale={1 / 3}
        x={-(1920 / 3)}
        y={-(1080 / 3)}
      />
      <Img
        opacity={opacity}
        ref={refs.sausage[0]}
        src={sausageOrigin}
        scale={1 / 3}
        y={1080 / 3}
      />
      <Ray
        opacity={0}
        endArrow
        ref={refs.sausageRay}
        stroke={"black"}
        fromX={rayCoordinates.sausage.from.x}
        fromY={rayCoordinates.sausage.from.y}
        toX={rayCoordinates.sausage.to.x}
        toY={rayCoordinates.sausage.to.y}
        lineWidth={5}
      />
      <Img
        opacity={opacity}
        ref={refs.sausage[1]}
        src={sausage}
        scale={1 / 3}
        y={1080 / 3}
      />
      <Img
        opacity={opacity}
        ref={refs.sauce[0]}
        src={sauce}
        scale={1 / 3}
        x={1920 / 3}
        y={-(1080 / 3)}
      />
      <Ray
        opacity={0}
        endArrow
        ref={refs.sauceRay}
        stroke={"black"}
        fromX={rayCoordinates.sauce.from.x}
        fromY={rayCoordinates.sauce.from.y}
        toX={rayCoordinates.sauce.to.x}
        toY={rayCoordinates.sauce.to.y}
        lineWidth={5}
      />
      <Img
        opacity={opacity}
        ref={refs.sauce[1]}
        src={sauce}
        scale={1 / 3}
        x={1920 / 3}
        y={-(1080 / 3)}
      />
    </>
  );
  yield* chain(
    waitFor(1),
    opacity(1, 1),
    waitFor(1),
    all(
      chain(
        waitFor(0.1),
        all(
          refs.bun[1]().x(0, 1),
          refs.bun[1]().y(0, 1),
          all(
            refs.bunRay().start(0).end(0).start(1, 1.2),
            refs.bunRay().opacity(1, 1.2)
          ),
          chain(
            waitFor(0.1),
            all(
              refs.sauce[1]().x(0, 1),
              refs.sauce[1]().y(0, 1),
              all(
                refs.sauceRay().start(0).end(0).start(1, 1.2),
                refs.sauceRay().opacity(1, 1.2)
              ),
              chain(
                waitFor(0.1),
                all(
                  refs.sausage[1]().x(0, 1),
                  refs.sausage[1]().y(60, 1),
                  refs.sausageRay().start(0).end(0).start(1, 1.2),
                  refs.sausageRay().opacity(1, 1.2)
                )
              )
            )
          )
        )
      )
    ),
    waitFor(5)
  );
});
