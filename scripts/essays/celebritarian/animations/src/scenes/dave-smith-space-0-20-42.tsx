import { makeScene2D, Rect, Ray, Img } from "@motion-canvas/2d";
import {
  all,
  chain,
  waitFor,
  createRef,
  createRefArray,
  createSignal,
  useDuration,
} from "@motion-canvas/core";
import {
  McasTxt as Txt,
  popin,
  popout,
  fadein,
  fadeout,
  generateTxt,
  TRichText,
  c,
  g,
} from "mcas";
import * as colors from "mcas/colors";
import { mkQuote } from "./dave-smith-space";

import img from "../assets/twitter/angela.jpg";
import data from "../data/space-2042.wav.json";

// c("[...]", "#666")

export default mkQuote(
  data,
  img,
  "@RealAngelaMc",
  "20:42",
  [
    [
      g(
        "I think the goalposts have shifted considerably in the cabinet conversation. I want to remind everyone that Trump never promised an entirely libertarian administration, those of you pointing and screeching about every single pick. Like it's not correct. I have repeatedly said we will only get one, only one cabinet position and positions underneath that.",
        "white",
      ),
    ],
    [
      g(
        "No one promised you a better GOP either. I said we will get one and we will have to keep fighting for more every election cycle. And I also said that if Trump only keeps one promise, if he only frees Ross, it will still be a win and the most progress we have ever made at the federal level.",
        "white",
      ),
    ],
    [
      g(
        "Now I will say that Robert F. Kennedy Jr. joined the party as a lifetime member. ",
        "white",
      ),
      c("[...] ", "#666"),
      g(
        "He joined as a lifetime member. Kennedy is our guy, like it or not. He's putting our people into the administration. The man joined the party. He sought our nomination. He didn't get it. And after that, he joined as a lifetime member. After he lost our nomination.",
        "white",
      ),
    ],
    [
      g(
        `He's gone to bat for me and for all of us with the incoming administration, I'm going to bat for him right now. And he had leverage, by the way, because he dropped out and endorsed Donald Trump. That's why he and his team are at Mar-a-Lago right now, going to bat for libertarians against the bad actors in the Senate and AIPAC and all the other people who are pressuring to try to push us out.`,
        "white",
      ),
    ],
    [
      g(
        `And I am so grateful for him for the work that he's doing and the ground he's forging for us. And this is one of the reasons also that I have so aggressively defended the LNC's decision to engage in a joint fundraising agreement with him, which we are still doing.`,
        "white",
      ),
    ],
    [
      g(
        `I have, by the way, already done reference calls for some of the libertarians who have applied to be in the administration and filled out many applications and referrals myself. That is happening, and a lot of those picks are up to Kennedy himself.`,
        "white",
      ),
    ],
    [
      g(
        `Go ahead and scream. Go ahead and scream that Kennedy isn't the one true libertarian. It's not good enough that he displayed moral courage during a national crisis where our two most recent LP presidential candidates were wearing masks and talking about social distancing, outdoor-only events, taking the Fauci-owchie, you are all possessed.`,
        "white",
      ),
    ],
    [
      g(`And I want to say, I'm speaking to my critics right now `, "white"),
      c("[...]", "#666"),
      g(
        `. You suffer from ideological paralysis. You are possessed by a very unproductive demon, shackled down in paralysis and unable to move because you can't find the purely libertarian path forward.`,
        "white",
      ),
    ],
    [g(`That's not how politics works.`, "white")],
    [
      g(
        `Who here has ever tried to get a job in the administration? Who here helped me vet candidates for a cabinet position? Who made calls and gave me names? Only a few of you. Thank you to those of you who did.`,
        "white",
      ),
    ],
    [
      g(
        `Do not complain about the cabinet position if you do not help us try to achieve it. At least don't complain about the work that I've done. If you sat on the sidelines and sulked, don't complain. I don't want to hear it.`,
        "white",
      ),
    ],
  ] as TRichText[],
  160,
);
