import { makeScene2D, Rect, Video, Txt, Latex } from "@motion-canvas/2d";
import { waitFor, createRef, Reference } from "@motion-canvas/core";

import forest from "../assets/forest.mp4";

export default makeScene2D(function* (view) {
  // Create your animations here
  view.fill(0x202228);

  const textRefs = new Array(12)
    .fill(null)
    .map((x) => new Array(3).fill(null).map((letter) => createRef<Txt>()));
  const video = createRef<Video>();

  const alphabet = "abcdefghijklmnopqrstuvwxyz";

  const randomLetter = () =>
    alphabet[Math.floor(Math.random() * alphabet.length)];

  const randomiseWords = (wordsRefs: Reference<Txt>[][]) =>
    wordsRefs.forEach((word) =>
      word.forEach((letter) => letter().text(randomLetter()))
    );

  view.add(
    <Rect direction="column" layout>
      <Rect gap={32} alignItems="center" layout>
        <Latex height={200} tex="{\color{white}\text{entropy}\bigg(}" />
        <Rect direction="column" layout>
          {(() => {
            let windows = [];
            for (let i = 0; i < textRefs.length; i += 4) {
              windows.push(textRefs.slice(i, i + 4));
            }
            return windows.map((window) => (
              <Rect gap={12}>
                {window.map((x) => (
                  <Rect>
                    {x.map((y) => (
                      <Txt
                        ref={y}
                        fill="white"
                        fontFamily="Mononoki"
                        text="a"
                      />
                    ))}
                  </Rect>
                ))}
              </Rect>
            ));
          })()}
        </Rect>
        <Latex
          height={200}
          tex="{\color{white}\bigg)\lll\text{entropy}\bigg(}"
        />
        <Video ref={video} height={200} src={forest} />
        <Latex height={200} tex="{\color{white}\bigg)}" />
      </Rect>
    </Rect>
  );

  video().play();

  for (let i = 0; i < 500; ++i) {
    randomiseWords(textRefs);
    yield* waitFor(0.05);
  }
});
