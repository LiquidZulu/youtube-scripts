import { Circle, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import {
  createRef,
  createSignal,
  waitFor,
  waitUntil,
} from "@motion-canvas/core";
import { McasTxt, mkSubtitles, subtitlesProps } from "mcas";

export default makeScene2D(function* (view) {
  // Create your animations here

  yield* mkSubtitles(view, [
    <McasTxt {...subtitlesProps}>Hello my name is</McasTxt>,
    <McasTxt {...subtitlesProps}>whatever</McasTxt>,
    <McasTxt {...subtitlesProps}>and this is a</McasTxt>,
    <McasTxt {...subtitlesProps}>test and doesn't really matter</McasTxt>,
    <McasTxt {...subtitlesProps}>and I am just seeing how it looks</McasTxt>,
  ]);

  const scale = createSignal(1);

  view.add(
    <Rect
      width={1080}
      height={1920}
      justifyContent="space-evenly"
      alignItems="center"
      layout
      direction="column"
    >
      <Rect
        width={() => 1080 * scale()}
        height={() => (1920 / 2) * scale()}
        fill="red"
        alignItems="center"
        justifyContent="center"
      >
        <Txt
          fontFamily="mononoki"
          fontSize={200}
          fill="black"
          text={() => (scale() * 100).toFixed(0) + "%"}
        />
      </Rect>
      <Rect
        width={() => 1080 * scale()}
        height={() => (1920 / 2) * scale()}
        fill="red"
        alignItems="center"
        justifyContent="center"
      >
        <Txt
          fontFamily="mononoki"
          fontSize={200}
          fill="black"
          text={() => (scale() * 100).toFixed(0) + "%"}
        />
      </Rect>
    </Rect>,
  );

  for (let i = 0; i < 99; ++i) {
    yield* scale(scale() - 0.01, 1 / 60);
  }
});
