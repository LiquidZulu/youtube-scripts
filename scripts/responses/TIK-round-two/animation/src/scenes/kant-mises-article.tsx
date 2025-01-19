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
import article from "../assets/mises-kant-article.png";
import { Browser } from "mcas/lib";
import manThinkingImage from "../assets/man thinking.png";

// First, I completely reject the claim made by the article that any so-called "a priori reasoning" forms "the most robust epistemological foundation" for economics, or even praxeology. And I further reject that praxeology is even close to being a sensible science on Kant's philosophy. This is because praxeology is just a certain science built on top of the understanding that humans have free will. Following the naming schema used for "praxeology," I propose that any science of free will falls under the banner "epilology,"[fn:16] namely epilology includes the sciences praxeology and thymology---with thymology studying particular instances of man-made facts, and praxeology studying general statements on the man-made as such.

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  const browser = createRef<Browser>();
  const content = createRef<Rect>();

  view.add(
    <Browser
      ref={browser}
      hyperlink="https://mises.org/power-market/immanuel-kants-300th-birthday-kants-epistemology-and-its-influence-ludwig-von-misess-praxeology"
    >
      <Img ref={content} width={1000} src={article} />
    </Browser>,
  );

  yield* all(popin(browser), browser().scroll(1, 1));

  const highlightRays = createRefArray<Ray>();

  content().add(
    <Ray
      position={[0, content().height() / 2 - 466]}
      end={0}
      ref={highlightRays}
      lineWidth={20}
      from={[70, 2]}
      to={[196, 2]}
      stroke={colors.sky500}
      opacity={0.2}
    />,
  );

  content().add(
    <Ray
      position={[0, content().height() / 2 - 466]}
      end={0}
      ref={highlightRays}
      lineWidth={20}
      from={[-302, 2]}
      to={[5, 2]}
      stroke={colors.sky500}
      opacity={0.2}
    />,
  );

  yield* waitUntil("a priori reasoning");

  yield* highlightRays[0].end(1, 1);

  yield* waitUntil("most robust");

  yield* highlightRays[1].end(1, 1);

  yield* waitUntil("praxeology doesnt work on kant");

  yield* browser().scroll(0.7, 1);

  const secondHightlightRays = createRefArray<Ray>();

  content().add(
    <Ray
      ref={secondHightlightRays}
      position={[0, 475]}
      lineWidth={20}
      from={[274, 0]}
      to={[398, 0]}
      stroke={colors.sky500}
      opacity={0.2}
    />,
  );
  content().add(
    <Ray
      ref={secondHightlightRays}
      position={[0, 503]}
      lineWidth={20}
      from={[-460, 0]}
      to={[195, 0]}
      stroke={colors.sky500}
      opacity={0.2}
    />,
  );
  content().add(
    <Ray
      ref={secondHightlightRays}
      position={[0, 532]}
      lineWidth={20}
      from={[-427, 0]}
      to={[398, 0]}
      stroke={colors.sky500}
      opacity={0.2}
    />,
  );
  content().add(
    <Ray
      ref={secondHightlightRays}
      position={[0, 561]}
      lineWidth={20}
      from={[-460, 0]}
      to={[-84, 0]}
      stroke={colors.sky500}
      opacity={0.2}
    />,
  );

  const highlight = createSignal(0);

  for (let i = 0; i < secondHightlightRays.length; ++i) {
    secondHightlightRays[i].end(
      createSignal(() => highlight() * secondHightlightRays.length - i),
    );
  }

  yield* highlight(1, 1);

  yield* waitUntil("browser gone");

  yield* popout(browser);

  const manThinking = createRef<Img>();

  view.add(<Img ref={manThinking} src={manThinkingImage} />);

  yield* popin(manThinking);

  yield* waitUntil("man gone");

  yield* popout(manThinking);
});
