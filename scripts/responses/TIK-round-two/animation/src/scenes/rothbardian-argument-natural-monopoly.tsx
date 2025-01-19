import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  waitUntil,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  // TIK justified his classing of big business as "public" here using the Rothbardian argument against natural monopolisation. The argument is basically that as a firm grows in size within some particular market it has a growing internal economy that it cannot perform calculation within. If you want to understand this point fully I suggest you watch this video on the economic calculation problem[fn:8]---but I do not think understanding that is required here.
  //
  // This argument is correct as far as it goes, but it does not go as far as TIK needs it to go. The Rothbardian argument establishes only that it is impossible for a purely voluntary firm to establish a stranglehold over an entire market and achieve natural monopolisation. It does not establish that no business can ever become very large in either real or relative terms. In real terms, it is obviously possible for a firm in a society with a high level of capital development to be "big" in comparison to Crusoe on the island; and it is also possible for a firm to come to some brand new and very valuable innovation that rockets them to the top of an entirely new market for some period of time.

  yield* waitUntil("end");
});
