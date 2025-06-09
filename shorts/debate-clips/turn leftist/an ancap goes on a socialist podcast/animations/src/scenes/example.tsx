import { Circle, makeScene2D, Rect, Txt } from "@motion-canvas/2d";
import { createRef, createSignal, waitFor } from "@motion-canvas/core";

export default makeScene2D(function* (view) {
  // Create your animations here

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
