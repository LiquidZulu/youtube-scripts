import { makeScene2D, Img } from "@motion-canvas/2d";
import { createRef, waitFor } from "@motion-canvas/core";

import tweets from "../assets/ai-theft-tweets";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const tweet = createRef<Img>();
  const wait = 0.4;

  // width=780
  view.add(<Img ref={tweet} src={tweets[0]} height={980} />);

  for (let t = 1; t < tweets.length; ++t) {
    yield* waitFor(wait);
    tweet().src(tweets[t]);
  }

  yield* waitFor(wait);
});
