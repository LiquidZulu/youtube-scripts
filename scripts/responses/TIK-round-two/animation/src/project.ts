import { FullSceneDescription, makeProject } from "@motion-canvas/core";
import { ValueDispatcher } from "@motion-canvas/core/lib/events";
import { quoteScenes } from "./scenes/quotes";
import makeFootnote from "mcas/lib/scenes/footnote";

import audio from "./audio.mp3";

import example from "./scenes/example?scene";
import hierarchyOfPhilosophy from "./scenes/hierarchy-of-philosophy?scene";
import reasonsPeopleArentAnarchists from "./scenes/reasons-people-arent-anarchists?scene";
import substitutingResultForDefinition from "./scenes/substituting-result-for-definition?scene";
import definitionAnarchism from "./scenes/definition-anarchism?scene";
import legalAnarchismNeNoLaws from "./scenes/legal-anarchism-ne-no-laws?scene";
import ancapSubsetAnarchism from "./scenes/ancap-subset-anarchism?scene";
import stickScarce from "./scenes/stick-scarce?scene";
import tikDefAnarchism from "./scenes/tik-def-anarchism?scene";
import publicPrivatePackageDeals from "./scenes/public-private-package-deals?scene";
import bignessVsSmallness from "./scenes/bigness-vs-smallness?scene";
import tikPrivateFalseAlternative from "./scenes/tik-private-false-alternative?scene";
import collectiveReal from "./scenes/collective-real?scene";
import abstraction from "./scenes/abstraction?scene";
import materialism from "./scenes/materialism?scene";
import sensualistSenseImpressions from "./scenes/sensualist-sense-impressions?scene";
import primarySecondaryQualityDistinction from "./scenes/primary-secondary-quality-distinction?scene";
import stateMonopolyUseForce from "./scenes/state-monopoly-use-force?scene";
import wrongToDefineStateCoercive from "./scenes/wrong-to-define-state-coercive?scene";
import epilology from "./scenes/epilology?scene";
import falseVsTrueAlternatives from "./scenes/false-vs-true-alternatives?scene";
import determinismSelfDefeat from "./scenes/determinism-self-defeat?scene";
import anarchismIffCapitalism from "./scenes/anarchism-iff-capitalism?scene";
import collectiveMythArgument from "./scenes/collective-myth-argument?scene";
import rightsProtectingViolatorOfRights from "./scenes/rights-protecting-violator-of-rights?scene";
import warfareBetweenStates from "./scenes/warfare-between-states?scene";
import menNaturallyBrutish from "./scenes/men-naturally-brutish?scene";
import dealWithRisk from "./scenes/deal-with-risk?scene";
import objectivismGenusDifferentia from "./scenes/objectivism-genus-differentia?scene";
import objectivismPhilosophyPoe from "./scenes/objectivism-philosophy-poe?scene";
import murderology from "./scenes/murderology?scene";
import packagedBranchDefinitions from "./scenes/packaged-branch-definitions?scene";
import threeAnswersToLaw from "./scenes/three-answers-to-law?scene";
import merePossessor from "./scenes/mere-possessor?scene";
import ownershipNePossession from "./scenes/ownership-ne-possession?scene";
import rightsScepticism from "./scenes/rights-scepticism?scene";
import mixedLawSystems from "./scenes/mixed-law-systems?scene";
import intro from "./scenes/intro?scene";
import { colors, mkBlankScene } from "mcas/lib";
import crusoeVsFriday from "./scenes/crusoe-vs-friday?scene";
import napStatement from "./scenes/nap-statement?scene";
import anarchismAsPublicVsPrivate from "./scenes/anarchism-as-public-vs-private?scene";
import historicalAssociationVsPrivateSociety from "./scenes/historical-association-vs-private-society?scene";
import rothbardianArgumentNaturalMonopoly from "./scenes/rothbardian-argument-natural-monopoly?scene";
import untanglingThePackage from "./scenes/untangling-the-package?scene";
import nominalismHop from "./scenes/nominalism-hop?scene";
import hobbesSecondRate from "./scenes/hobbes-second-rate?scene";
import sensualismExplaination from "./scenes/sensualism-explaination?scene";
import nominalism from "./scenes/nominalism?scene";
import peikoff0 from "./scenes/peikoff-0?scene";
import assertingDefinitionCorrect from "./scenes/asserting-definition-correct?scene";
import fundamentalPrincipleDefinition from "./scenes/fundamental-principle-definition?scene";
import substitutingResultForDefinitionSocialism from "./scenes/substituting-result-for-definition-socialism?scene";
import kantMisesArticle from "./scenes/kant-mises-article?scene";
import peikoff1 from "./scenes/peikoff-1?scene";
import rothbard0 from "./scenes/rothbard-0?scene";
import rothbardNotCalledObjectivist from "./scenes/rothbard-not-called-objectivist?scene";
import rothbard1 from "./scenes/rothbard-1?scene";
import jungleEthics from "./scenes/jungle-ethics?scene";
import legalPositivismFrozenAbstraction from "./scenes/legal-positivism-frozen-abstraction?scene";
import hobbesianAngel from "./scenes/hobbesian-angel?scene";
import { mkSong } from "./scenes/music";
import insuranceIncentives from "./scenes/insurance-incentives?scene";
import independentJudges from "./scenes/independent-judges?scene";
import defendAgainstStateAggression from "./scenes/defend-against-state-aggression?scene";
import howCanTheStateWin from "./scenes/how-can-the-state-win?scene";
import whyNoPrivateDefense from "./scenes/why-no-private-defense?scene";
import integrationObjectivismAncap from "./scenes/integration-objectivism-ancap?scene";
import spectralEvidence from "./scenes/spectral-evidence?scene";
import ancapYieldsObism from "./scenes/ancap-yields-obism?scene";
import initiationForceMoralEvil from "./scenes/initiation-force-moral-evil?scene";
import moralSociety from "./scenes/moral-society?scene";
import randDefinitionRight from "./scenes/rand-definition-right?scene";
import openVsClosed from "./scenes/open-vs-closed?scene";
import myOpenObjectivism from "./scenes/my-open-objectivism?scene";
import objectivismOnDefinitions from "./scenes/objectivism-on-definitions?scene";
import applyingMyDefinition from "./scenes/applying-my-definition?scene";
import myDefinitionCorrect from "./scenes/my-definition-correct?scene";
import definitionOfAPhilosophy from "./scenes/definition-of-a-philosophy?scene";
import aristotleNotConsistent from "./scenes/aristotle-not-consistent?scene";
import analogisingDarwinAndRand from "./scenes/analogising-darwin-and-rand?scene";
import aynRandAsClosedObjectivist from "./scenes/ayn-rand-as-closed-objectivist?scene";
import politicsInvalidField from "./scenes/politics-invalid-field?scene";
import argumentationEthics from "./scenes/argumentation-ethics?scene";
import lifeboatScenario from "./scenes/lifeboat-scenario?scene";
import deathAsTheStandard from "./scenes/death-as-the-standard?scene";
import contextOfEthics from "./scenes/context-of-ethics?scene";
import obismVsAnarchism from "./scenes/obism-vs-anarchism?scene";
import peikoffVsAnarchism from "./scenes/peikoff-vs-anarchism?scene";

const songs = [
  ["White Town", "Your Woman"],
  ["LEMMiNO", "Aloft"],
  ["LEMMiNO", "Blackout"],
  ["LEMMiNO", "Biosignature"],
  ["glue70", "Fake Idea ☠☣"],
  ["glue70", "Beta Rays"],
  ["Lifeformed & Vidboy", "Forest Spirit Friends"],
  ["Lifeformed", "1024"],
  ["Lifeformed", "Cobalt Blue"],
  ["Lifeformed", "Azure Blue"],
  ["Lifeformed", "Chloroplast Skin"],
  ["Patricia Taxxon", "Liftoff"],
  ["Fimnur", "Journey Home"],
  ["Casiopea", "Swear (スウェアー)"],
  ["Casiopea", "Midnight Rendezvous (ミッドナイト・ランデブー)"],
  ["Kevin Day", "The Mind Is Like Water"],
  ["Breakfast at Tiffany's OST", "Moon River"],
  ["Daft Punk", "Veridis Quo"],
  ["Yppah", "It's Not The Same"],
  ["Sam Black PF", "Nuclear Caveman"],
  ["Sam Black PF", ".Ruam"],
  ["Sam Black PF", "DEMONS"],
  ["Sam Black PF", "Attacking The State"],
  ["Sam Black PF", "Future"],
  ["Sam Black PF", "Nah"],
  ["Carlos Viola", "Y Yo Fuego Te Daré"],
  ["Carlos Viola", "La Marcha del Retorcido"],
  ["Carlos Viola", "Entre Bordados"],
  ["Carlos Viola", "Dame Tu Tormento"],
  ["Carlos Viola", "Entre Bordados"],
  ["Cho Young-Wuk", "In A Lonely Place"],
  ["Cho Young-Wuk", "The Old Boy"],
  ["Cho Young-Wuk", "Dressed To Kill"],
]
  .map(([author, title]) => ({
    author,
    title,
    scene: mkSong(author, title),
  }))
  .map(({ author, title, scene }) => {
    const description = scene as FullSceneDescription;
    description.name = `songs/${author} - ${title}`;
    description.onReplaced = new ValueDispatcher<FullSceneDescription>(
      description.config as any,
    );
    return description;
  });

export default makeProject({
  audio: audio,
  scenes: [
    peikoffVsAnarchism,
    //// start.mp4
    // intro,
    // substitutingResultForDefinition,
    // definitionAnarchism,
    // crusoeVsFriday,
    // ancapSubsetAnarchism,
    // stickScarce,
    // napStatement,
    // anarchismAsPublicVsPrivate,
    ////
    //// tiks-definitions-as-package-deals.mp4
    // publicPrivatePackageDeals,
    // historicalAssociationVsPrivateSociety,
    // rothbardianArgumentNaturalMonopoly,
    // bignessVsSmallness,
    // tikPrivateFalseAlternative,
    // collectiveReal,
    // abstraction,
    // untanglingThePackage,
    ////
    //// nominalist-origin-materialism.mp4
    // nominalismHop,
    // hobbesSecondRate,
    // materialism,
    ////
    //// nominalist-origin-rest.mp4
    // sensualismExplaination,
    // nominalism,
    // peikoff0,
    // assertingDefinitionCorrect,
    // fundamentalPrincipleDefinition,
    ////
    //// rothbardian-definition-identifies-essential.mp4
    // stateMonopolyUseForce,
    // wrongToDefineStateCoercive,
    // substitutingResultForDefinitionSocialism,
    ////
    //// praxeology-as-mystic.mp4
    // kantMisesArticle,
    // epilology,
    // falseVsTrueAlternatives,
    // determinismSelfDefeat,
    // peikoff1,
    // rothbard0,
    // rothbardNotCalledObjectivist,
    // rothbard1,
    ////
    //// conflation-jungle-ethics-anarchism.mp4
    // jungleEthics,
    // anarchismIffCapitalism,
    // legalPositivismFrozenAbstraction,
    ////
    //// the-myth-of-collective-security.mp4
    // collectiveMythArgument,
    // rightsProtectingViolatorOfRights,
    // warfareBetweenStates,
    // menNaturallyBrutish,
    // hobbesianAngel,
    ////
    //// independent-judges.mp4
    // independentJudges,
    // defendAgainstStateAggression,
    // howCanTheStateWin,
    ////
    //// value vs force.mp4
    // ancapYieldsObism,
    // initiationForceMoralEvil,
    ////
    //// open-objectivism-mid.mp4
    // myOpenObjectivism,
    // objectivismOnDefinitions,
    // objectivismGenusDifferentia,
    // applyingMyDefinition,
    ////
    //// law-vs-politics.mp4
    // politicsInvalidField,
    // murderology,
    // packagedBranchDefinitions,
    ////
    //// law-of-jungle.mp4
    // merePossessor,
    // ownershipNePossession,
    // rightsScepticism,
    ////
    //// misc
    //sensualistSenseImpressions,
    //primarySecondaryQualityDistinction,
    //dealWithRisk,
    //insuranceIncentives,
    //whyNoPrivateDefense,
    //integrationObjectivismAncap,
    //spectralEvidence,
    //moralSociety,
    //randDefinitionRight,
    //openVsClosed,
    //myDefinitionCorrect,
    //definitionOfAPhilosophy,
    //aristotleNotConsistent,
    //analogisingDarwinAndRand,
    //aynRandAsClosedObjectivist,
    //objectivismPhilosophyPoe,
    //threeAnswersToLaw,
    //mixedLawSystems,
    //argumentationEthics,
    //lifeboatScenario,
    //deathAsTheStandard,
    //contextOfEthics,
    //obismVsAnarchism,
    ////
    //example,
    //...quoteScenes,
    //...footnotesScenes,
    //...songs,
  ],
});

// const footnotesScenes = new Array(999)
//   .fill(0)
//   .map((_, i) => i + 1)
//   .filter((x) => x > 91)
//   .map((footnoteNumber) => ({
//     footnoteNumber,
//     scene: makeFootnote(footnoteNumber),
//   }))
//   .map(({ scene, footnoteNumber }) => {
//     const description = scene as FullSceneDescription;
//     description.name = `footnotes/footnote-${footnoteNumber}`;
//     description.onReplaced = new ValueDispatcher<FullSceneDescription>(
//       description.config as any,
//     );
//     return description;
//   });
