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
import rothbardImg from "../assets/rothbard.png";
import { Browser } from "mcas/lib";

export default makeScene2D(function* (view) {
  view.fill(colors.bg);

  // I would like to give some indication here as to why it is that Rothbard is basically never cited as an Objectivist, if he is indeed one. Unfortunately, because of the Randians refusal to re-publish works without explicit permission, many of the sources on some of the things I will state here point to ancient websites that have since lost the relevant documents, so I can go only on things that I have heard other people saying. If any Randians get pissy about this, they are free to present the relevant information in a form that has not been lost from the internet.

  const rothbard = createRef<Img>();
  view.add(
    <Img
      ref={rothbard}
      src={rothbardImg}
      shadowBlur={50}
      shadowColor="000000aa"
      shadowOffsetY={25}
    />,
  );
  yield* popin(rothbard);

  yield* waitUntil("404");

  const browser = createRef<Browser>();

  view.add(
    <Browser
      position={[0, 1080]}
      ref={browser}
      hyperlink="https://example.com/rand-said-foo-bar-baz"
    >
      <Rect layout height={800 - 60} alignItems="center">
        <Txt fontFamily="oswald" fontSize={300} fill="black">
          404
        </Txt>
      </Rect>
    </Browser>,
  );

  yield* all(rothbard().position([0, -1080], 1), browser().position([0, 0], 1));

  // I think that one of the major reasons why Rothbard is never called an Objectivist is one of the many disputes he had with Rand---namely that he neglected to cite Ayn Rand and her associates as sources. His reasoning is supposedly that he did not want a novellist to appear in the bibliography of any academic work. In Rand's place, Rothbard would cite Aristotle and St. Thomas Aquinas as sources for things such as the law of causality, or natural rights. I conjecture that this is the reason why you frequently find Rothbard being called a neo-Thomist, or neo-Aristotelian rather than an Objectivist. That is, the various dramas that went on between two people more than half a century ago have since impacted the movements they founded, such that modern anarcho-capitalists refuse to align with Ayn Rand "because that's what Rothbard did" and vice versa for Randians often refusing to even consider whether further developments in legal philosophy can be made.

  yield* waitUntil("browser gone");
  yield* popout(browser);
  yield* waitUntil("blank");

  // When its all said and done, I think it is frankly ludicrous that people who live decades after everyone involved in the various beefs have long since passed would still hold onto these grudges to the extent that they shut down their mind at any mention of debate. Yes, whether Rothbard plagiarised from Rand might be relevant to a moral evaluation of Rothbard-the-man; but it is not relevant to any evaluation of anarcho-capitalism the legal theory. And, yes, whether Ayn Rand was a meany-pie to people who disagreed with her might be relevant to a moral evaluation of Ayn Rand-the-person; but it is not relevant to any evaluation of Objectivism the philosophy.

  // It certainly isnt /every/ Objectivist or /every/ anarcho-capitalist who operates in this way, but it is enough that it is worth calling out here: drop the beefs of dead people---they are utterly irrelevant.
});
