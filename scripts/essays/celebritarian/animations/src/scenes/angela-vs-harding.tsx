import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  Reference,
  SimpleSignal,
  sequence,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout, after } from "mcas";
import * as colors from "mcas/colors";
import a from "../assets/twitter/angela.jpg";
import h from "../assets/InsanityIsFree.jpg";

export default makeScene2D(function* (view) {
  view.fill(0);

  type Speaker = {
    icon: Reference<Img>;
    write: SimpleSignal<number>;
  };

  const mkSpeaker = () => ({
    icon: createRef<Img>(),
    write: createSignal(0),
  });

  const angela: Speaker = mkSpeaker();
  const harding: Speaker = mkSpeaker();

  let i = 0;

  function* speakerIn({ icon, write }: Speaker) {
    yield* after(`speaker ${i++} in`, sequence(0.3, popin(icon), write(1, 1)));
  }

  view.add(
    <Rect
      alignContent="center"
      justifyContent="center"
      alignItems="center"
      layout
      direction="column"
      width={view.width}
      gap={256}
    >
      <Rect width={view.width} gap={128} justifyContent="center">
        <Img
          ref={harding.icon}
          src={h}
          radius={999}
          size={400}
          stroke="white"
          lineWidth={20}
          shadowBlur={40}
          shadowColor="white"
          scale={0}
        />
        <Txt
          maxWidth="80%"
          fontFamily="ProggyClean CE Nerd Font"
          glow
          fontSize={80}
        >
          <Txt
            textWrap
            writeOn={() => Math.max(0, Math.min(1, harding.write() * 3))}
          >
            And I recognize that you're a political party, but you acted pretty
            much not like that when people like RFK Jr. can pay a little bit of
            money and a little bit of lip service while having the record he
            does in the like statist factions that he's been in and the actual
            things that he has participated in and still get a seat at the table
            in terms of being our guy.
          </Txt>
          {"\n\n"}
          <Txt
            textWrap
            writeOn={() => Math.max(0, Math.min(1, harding.write() * 3 - 1))}
          >
            No, he's not.
          </Txt>
          {"\n\n"}
          <Txt
            textWrap
            writeOn={() => Math.max(0, Math.min(1, harding.write() * 3 - 2))}
          >
            RFK is not my guy and he's not the guy of anybody with any actual
            principles. But you're saying he is because he gave you some money
            and because he's giving you some lip service.
          </Txt>
        </Txt>
      </Rect>
      <Rect width={view.width} gap={128} justifyContent="center">
        <Img
          ref={angela.icon}
          src={a}
          radius={999}
          size={400}
          stroke="white"
          lineWidth={20}
          shadowBlur={40}
          shadowColor="white"
          scale={0}
        />
        <Txt
          textWrap
          ref={angela.txt}
          writeOn={angela.write}
          maxWidth="80%"
          fontFamily="ProggyClean CE Nerd Font"
          glow
          fontSize={80}
        >
          He doesn't have to be your guy, but there are a lot of people who are
          super excited about having someone with moral courage to go after
          Fauci and go after the COVID regime.
        </Txt>
      </Rect>
    </Rect>,
  );

  yield* chain(speakerIn(harding), speakerIn(angela));
});
