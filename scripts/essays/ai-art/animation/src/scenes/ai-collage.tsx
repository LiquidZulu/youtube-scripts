import { makeScene2D, Img, Ray, Txt, Rect, TxtProps } from "@motion-canvas/2d";
import {
  waitFor,
  createSignal,
  createRef,
  all,
  chain,
} from "@motion-canvas/core";

import images from "../assets/ai-collage";
import result from "../assets/ai-collage/result.png";

import { popin, popout } from "../util";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const txtOpts: TxtProps = {
    fontFamily: "Cubano",
    fill: "white",
    fontSize: 90,
  };

  const title = createRef<Rect>();
  const not = createRef<Txt>();
  const underline = createRef<Ray>();
  const imagesRefs = images.map((x) => createRef<Img>());
  const imagesPseudo = createRef<Rect>();
  const arrow = createRef<Ray>();
  const resultRef = createRef<Img>();

  view.add(
    <Rect>
      {images.map((x, i) => (
        <Img width={500} ref={imagesRefs[i]} src={x} />
      ))}
    </Rect>
  );

  view.add(
    <Rect gap={64} alignItems="center" direction="column" layout>
      <Rect ref={title} layout>
        <Txt {...txtOpts} text="this is&nbsp;" />
        <Rect direction="column" layout>
          <Txt ref={not} {...txtOpts} text="not" />
          <Ray
            ref={underline}
            fromX={0}
            toX={not().width()} // for some reason it is getting pissy about circular dependencies here, so it computes the width rather than having it be a signal
            lineWidth={8}
            stroke="white"
          />
        </Rect>
        <Txt {...txtOpts} text="&nbsp;how ai works." />
      </Rect>
      <Rect gap={128} alignItems="center" layout>
        <Rect ref={imagesPseudo} size={imagesRefs[0]().size} />
        <Ray ref={arrow} lineWidth={16} stroke="white" toX={300} endArrow />
        <Img ref={resultRef} width={500} src={result} />
      </Rect>
    </Rect>
  );

  for (let image of imagesRefs) {
    image().absolutePosition(imagesPseudo().absolutePosition());
    image().scale(0);
  }

  title().scale(0);
  underline().end(0);
  arrow().end(0);
  resultRef().scale(0);

  yield* all(
    popin(title),
    chain(waitFor(0.6), underline().end(1, 1)),
    chain(
      waitFor(0.8),
      all(
        all(...imagesRefs.map((x, i) => chain(waitFor(i * 0.1), popin(x)))),
        chain(waitFor(0.2), popin(resultRef)),
        chain(waitFor(0.4), arrow().end(1, 1))
      )
    )
  );

  yield* waitFor(10);

  yield* all(
    popout(title),
    chain(
      waitFor(0.4),
      all(
        all(...imagesRefs.map((x, i) => chain(waitFor(i * 0.1), popout(x)))),
        chain(waitFor(0.2), popout(resultRef)),
        chain(waitFor(0.4), arrow().start(1, 1))
      )
    )
  );
});
