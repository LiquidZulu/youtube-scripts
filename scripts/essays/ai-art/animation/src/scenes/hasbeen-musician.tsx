import { makeScene2D, Img, ImgProps } from "@motion-canvas/2d";
import { waitFor, createRef, all, chain } from "@motion-canvas/core";

import articlesSrc from "../assets/hasbeen-musician";

import { popin, popout } from "../util";
import { withRef } from "../types";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const articles = [
    { x: -100, y: -200 },
    { x: -300, y: -50 },
    { x: 200, y: -100 },
    { x: 0, y: 0 },
    { x: -200, y: 170 },
    { x: 170, y: 150 },
  ].map(
    (article, i) =>
      ({
        ...article,
        scale: 0,
        src: articlesSrc[i],
        width: 600,
        ref: createRef<Img>(),
      } as withRef<ImgProps, Img>)
  );

  view.add(<>{...articles.map((article) => <Img {...article} />)}</>);

  yield* all(
    ...articles.map(({ ref }, i) => chain(waitFor(0.1 * i), popin(ref)))
  );

  yield* waitFor(10);

  yield* all(
    ...articles.map(({ ref }, i) => chain(waitFor(0.1 * i), popout(ref)))
  );
});
