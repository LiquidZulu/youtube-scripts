import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  sequence,
  waitUntil,
  easeInOutBack,
  delay,
} from "@motion-canvas/core";
import { McasTxt as Txt, popin, popout, fadein, fadeout } from "mcas";
import * as colors from "mcas/colors";
import { ArrowList, Browser, Quote } from "mcas/lib";
import course from "../assets/course.png";
import randImg from "../assets/rand.png";
import randCard from "../assets/cards/ayn-rand.jpg";
import quotes from "../assets/TIK.org-quotes";

export default makeScene2D(function* (view) {
  view.fill("#030014");

  const theories = createRefArray<Txt>();
  const theoryConts = createRefArray<Rect>();
  const tCont = createRef<Rect>();

  view.add(
    <Rect layout direction="column" ref={tCont}>
      {[
        "The law of the jungle;",
        "mixed law;",
        "the non-aggression principle.",
      ].map((x, i) => (
        <Rect opacity={0} ref={theoryConts} gap={16}>
          <Txt fontSize={56} fill={colors.zinc500} text={`${i + 1}.`} />
          <Txt ref={theories} fontSize={56} fill="white" text={x} />
        </Rect>
      ))}
    </Rect>,
  );

  yield* sequence(0.1, ...theoryConts.map((x) => fadein(() => x)));

  yield* waitUntil("two false");
  yield* all(theories[0].opacity(0.2, 1), theories[1].opacity(0.2, 1));
  yield* waitUntil("left with NAP");
  yield* all(
    theories[2].fill(colors.purple500, 1),
    theories[2].glow(0).glow(1, 1),
  );

  const browser = createRef<Browser>();

  view.add(
    <Browser
      position={[0, 1080]}
      ref={browser}
      hyperlink="https://liquidzulu.github.io/libertarian-ethics"
    >
      <Img src={course} width={1000} />
    </Browser>,
  );

  yield* waitUntil("browser in");
  yield* all(
    tCont().position([0, -1080], 1),
    browser().position(0, 1),
    browser().scroll(0.6, 3),
  );

  // So, we have it that there are three possible solutions to the correct problem-statement of law, two of them are false, leaving us only with the non-aggression principle as the correct answer. Refer to my course on how the rest of the legal theory is derived from the NAP,[fn:71] and any Randroids in the audience who find themselves screaming about rationalism because I used deductive reasoning can feel free to sob away all they want---but if I can pierce the veil of tears for a moment, I would ask them to articulate exactly what about my preceding reasoning is incorrect, rather than just screaming about how Peikoff one time said something that sort of sounds like what they want to say.

  yield* waitUntil("objections");
  yield* popout(browser);

  const title = createRef<Txt>();
  view.add(
    <Txt
      ref={title}
      fontSize={60}
      fontFamily="oswald"
      fill={colors.purple500}
      glow
    />,
  );

  yield* title().text("randian objections against anarchism".toUpperCase(), 1);

  // Regardless, I can now move onto some of the objections that the Randians have raised against anarchism. Do note that this is one area where the writing is laughably sparse, and for good reason---namely, they lack any solid theoretical objections so prefer to give a very light treatment to the topic and never with an anarcho-Objectivist there to provide counter-arguments.

  yield* waitUntil("rand definition");

  const rand = createRef<Rect>();

  view.add(
    <Rect ref={rand} position={[0, 1080]}>
      <Img src={randImg} width={800} position={[600, 150]} />
    </Rect>,
  );

  const quote = createRef<Rect>();

  view.add(
    <Rect ref={quote} opacity={0}>
      <Rect
        position={[-200, 0]}
        layout
        direction="column"
        alignItems="center"
        gap={32}
      >
        <Txt
          fontFamily="oswald"
          fill={colors.purple500}
          glow
          maxWidth={800}
          textWrap
        >
          "A government is an institution that holds the exclusive power to{" "}
          <Txt.i>enforce</Txt.i> certain rules of social conduct in a given
          geographical area."
        </Txt>
        <Txt fill={colors.purple900} fontSize={30} textWrap width={700}>
          Ayn Rand, "The Nature of Government," in ead.,{" "}
          <Txt.i>The Virtue of Selfishness</Txt.i>
        </Txt>
      </Rect>
    </Rect>,
  );

  yield* all(
    title().position([0, -400], 1),
    rand().position(0, 1, easeInOutBack),
  );

  yield* waitUntil("quote text");

  yield* fadein(quote);

  // Rand defines government as "an institution that holds the exclusive power to enforce certain rules of social conduct in a given geographical area,"[fn:72] and on this definition, anarchism is supposed to represent a floating abstraction---i.e. an abstraction with no concrete referent:

  yield* waitUntil("quote-0");

  const quote1 = createRef<Quote>();

  view.add(
    <Quote
      ref={quote1}
      card={randCard}
      quoteText={quotes[20] as any}
      citationText={quotes[20].citation}
    />,
  );

  yield* all(
    delay(0.4, all(quote1().show(), quote1().scrollText("quote-0 scroll"))),
    title().position([0, -700], 1),
    quote().position([-1920, 0], 1),
    rand().position([1920, 0], 1),
  );
  yield* all(quote1().hide(), quote1().opacity(0, 0.5));

  const falsePremisesCont = createRef<Rect>();
  const list = createRef<ArrowList>();

  view.add(
    <Rect
      ref={falsePremisesCont}
      layout
      gap={64}
      alignItems="center"
      direction="column-reverse"
    >
      <ArrowList ref={list}>
        <Txt textWrap maxWidth={1400}>
          <Txt.b fontFamily="oswald" fill={colors.red500} glow>
            FALSE
          </Txt.b>
          : without a monopoly on rights enforcement all that is left is brute
          violence and gang warfare.
        </Txt>
        <Txt textWrap maxWidth={1400}>
          Competing insurance firms tend to do a far better job at enforcing
          rights than any monopolist could hope to.
        </Txt>
        <Txt textWrap maxWidth={1400}>
          <Txt.b fontFamily="oswald" fill={colors.red500} glow>
            FALSE
          </Txt.b>
          : anarchy means no objective laws or arbitration.
        </Txt>
        <Txt textWrap maxWidth={1400}>
          The snuck premise is that you need some monopolist to "make the law
          objective"---but law is <Txt.i>discovered</Txt.i> not{" "}
          <Txt.i>produced</Txt.i>.
        </Txt>
        <Txt textWrap maxWidth={1400}>
          Competing arbitration firms can all appeal to reality to discover
          objective legal principles.
        </Txt>
      </ArrowList>
    </Rect>,
  );

  title().text("");
  title().opacity(1);
  title().position([0, -455]);
  title().parent(view);

  yield* all(
    title().text("randian false premises:".toUpperCase(), 1),
    list().next(),
  );

  yield* list().next("competing insurance");
  yield* list().next("second false premise");
  yield* list().next("snuck premise");
  yield* list().next("competing arbitration firms");
  yield* list().hideAll("out", fadeout(title));

  // First, there is the false premise that without a monopoly on rights enforcement all that is left is brute violence and gang warfare. As I have explained earlier, competing insurance firms tend to do a far better job at enforcing rights than any monopolist could hope to. Second, there is the false premise that anarchy means no objective laws or arbitration. This is a point that is frequently repeated by the Randians, and never substantiated. It is the premise that you need some monopolist to "make the law objective"---but law is /discovered/ not /produced/. Competing arbitration firms can all appeal to reality to discover what the objective legal principles are which they can then apply to some specific case. Honest disagreements can be resolved without having a monopoly on dispute resolution.

  const quote2 = createRef<Quote>();

  view.add(
    <Quote
      ref={quote2}
      card={randCard}
      quoteText={quotes[21] as any}
      citationText={quotes[21].citation}
    />,
  );

  yield* all(quote2().show(), quote2().scrollText("quote-1 scroll"));
  yield* all(quote2().hide(), quote2().opacity(0, 0.5));

  // Indeed, if government means "an institution that holds the exclusive power to enforce certain rules of social conduct in a given geographical area," then we have successfully defined away any "competing governments" anarchism. But this does not begin to address the anarcho-capitalist case. If government must mean a monopolist, then competition in rights enforcement does not entail competing governments. Competition in this arena means that you can pay whomever you like to enforce your rights---nothing else. Rand continues with a hypothetical scenario that is supposed to demonstrate the absurdity of competition in rights enforcement:

  const llist = createRef<ArrowList>();

  view.add(
    <ArrowList ref={llist}>
      <Txt maxWidth={1400} textWrap>
        If government means "an institution that holds the{" "}
        <Txt.i>exclusive</Txt.i> power to enforce certain rules of social
        conduct in a given geographical area," then we have successfully defined
        away any "competing governments" anarchism.
      </Txt>
      <Txt maxWidth={1400} textWrap>
        This does not begin to address the{" "}
        <Txt fill={colors.yellow500} glow>
          anarcho-capitalist
        </Txt>{" "}
        case.
      </Txt>
      <Txt maxWidth={1400} textWrap>
        If government must mean a monopolist, then competition in rights
        enforcement does not entail competing governments.
      </Txt>
      <Txt maxWidth={1400} textWrap>
        Competition in rights enforcement means that you can pay whomever you
        like to enforce your rights---nothing else.
      </Txt>
    </ArrowList>,
  );

  yield* llist().next();
  yield* llist().next("doesnt address ancap");
  yield* llist().next("if government means a monopolist");
  yield* llist().next("what competition means");
  yield* llist().hideAll("oout");

  const quote3 = createRef<Quote>();

  view.add(
    <Quote
      ref={quote3}
      card={randCard}
      quoteText={quotes[22] as any}
      citationText={quotes[22].citation}
    />,
  );

  yield* all(quote3().show(), quote3().scrollText("quote-2 scroll"));
  yield* all(quote3().hide(), quote3().opacity(0, 0.5));

  // How utterly absurd! I might as well dream up my own fantasy to dispute this theory: what if instead of Government A and B, we had just the one government; Mr. Smith and Mr. Jones each have their own friends in the government. Then Smith tells his government friends that Jones stole his wallet, and of course this must obviously lead to the great war of the wallets! Millions die in the great and bloody war for power until one side prevails and genocides those who assert the incorrect view on whether the wallet was stolen or not.

  // What Rand forgets in her random hypothesizing, is that hypothetical scenarios are not tools to discover philosophy. They have many brilliant uses in checking that one is consistent or in trying to apply philosophical principles to cleanly defined scenarios---but they cannot do anything beyond this. What would /actually/ happen in such a scenario, is that neither /firm/ wants to go to random war, so they would investigate who the aggressor is and seek damages from him. It is the state which is capable of externalising any costs of great wars onto vast arrays of victims---not private firms.
});
