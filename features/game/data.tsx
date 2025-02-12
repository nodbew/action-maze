import {
  createSituation,
  NAVIGATION_TARGET,
} from "@/features/game/lib/situationUtils";
import { Item } from "./types/inventory";
import { Situation } from "./types/situation";

export type ItemNames = "MazeRouteMemory" | "TimeFuroshiki" | "RustyKey";
export const ITEMS = {
  MazeRouteMemory: { show: false, stackable: false },
  TimeFuroshiki: { show: true, stackable: false },
  RustyKey: { show: true, stackable: false },
} as const satisfies Record<ItemNames, Item>;

export type SituationNames =
  | "Start"
  | "ConductorRobot"
  | "TimeCapsule"
  | "Monomosu"
  | "ListenToWall"
  | "Crossroad"
  | "TimeFuroshiki"
  | "MemorizationBread"
  | "Memorization"
  | "Maze"
  | "Door"
  | "TakeCopter"
  | "Saiminki"
  | "Hypnotized"
  | "ObtainRustyKey"
  | "RainingUmbrella"
  | "Raining";
export const SITUATIONS = {
  Start: createSituation(
    "There are two paths, and the left one is foggy. \nWhich path will you take?",
    [
      {
        type: "next",
        description: "Right",
        navigate: "ConductorRobot",
      },
      {
        type: "end",
        description: "Left",
        navigate: NAVIGATION_TARGET.FAILURE,
        message:
          "You fall into a time tunnel, and are sent back to an ancient era... And a dinasour ate you!",
      },
    ]
  ),
  ConductorRobot: createSituation(
    "You advance, and you see a huge robot sitting in front of you. \nIt is making loud noises, and seems to be angry... \nWhat will you do?",
    [
      {
        type: "next",
        description: "DESTROY IT!",
        navigate: "TimeCapsule",
      },
      {
        type: "next",
        description: "ignore and advance",
        navigate: "Monomosu",
      },
      {
        type: "next",
        description: "Go back",
        navigate: -2,
      },
    ]
  ),
  TimeCapsule: createSituation(
    "You find a time capsule inside the robot. \nWhat will you do with it?",
    [
      {
        type: "end",
        description: "Let's see what's inside it...",
        navigate: NAVIGATION_TARGET.FAILURE,
        message: "There was a skeleton! You got a heart shock an died!",
      },
      {
        type: "next",
        description: "Better not touch",
        navigate: "Monomosu",
      },
      {
        type: "next",
        description: "Go back",
        navigate: -2,
      },
    ]
  ),
  Monomosu: createSituation(
    "You found a mysterious flask on the ground. \nWhat will you do?",
    [
      {
        type: "next",
        description: "Spray it",
        navigate: "ListenToWall",
      },
      {
        type: "next",
        description: "Go back",
        navigate: -2,
      },
    ]
  ),
  ListenToWall: createSituation(
    'The wall started talking! \n\t"Go left and you will find a piece of bread..."\n Will you trust it?',
    [
      {
        type: "next",
        description: "Follow it",
        navigate: "MemorizationBread",
      },
      {
        type: "next",
        description: "It must be a trap",
        navigate: "Crossroad",
      },
      {
        type: "next",
        description: "Go back",
        navigate: -2,
      },
    ]
  ),
  MemorizationBread: createSituation(
    "You found a piece of bread! \nWill you eat it?",
    [
      {
        type: "next",
        description: "Why not?",
        addItems: { MazeRouteMemory: 1 },
        navigate: "Memorization",
      },
      {
        type: "next",
        description: "Too dangerous",
        navigate: "Crossroad",
      },
      {
        type: "next",
        description: "Go back",
        navigate: -2,
      },
    ]
  ),
  Memorization: createSituation(
    "You ate the piece of bread...\nBut nothing happens!",
    [
      {
        type: "next",
        description: "Well, at least it filled my stomache",
        navigate: "Crossroad",
      },
      {
        type: "next",
        description: "Curse it!",
        navigate: "Crossroad",
      },
    ]
  ),
  Crossroad: createSituation(
    "You came to a crossroad. \nWhich path will you take?",
    [
      {
        type: "next",
        description: "Left",
        navigate: "TimeFuroshiki",
      },
      {
        type: "next",
        description: "Middle",
        navigate: "Saiminki",
      },
      {
        type: "next",
        description: "Right",
        navigate: "TakeCopter",
      },
      {
        type: "next",
        description: "Go back",
        navigate: -2,
      },
    ]
  ),
  TimeFuroshiki: createSituation(
    "There is a cloth on a rock! It has many clocks printed on it... or is it a real one?",
    [
      {
        type: "next",
        description: "Might be useful...",
        addItems: { TimeFuroshiki: 1 },
        navigate: "Crossroad",
      },
      {
        type: "end",
        description: "Are they real clocks?",
        navigate: NAVIGATION_TARGET.FAILURE,
        message: "You are sent back to an ancient era...\nAnd fell into lava!",
      },
      {
        type: "next",
        description: "Go back",
        navigate: -2,
      },
    ]
  ),
  Saiminki: createSituation("There is a machine on the ground.", [
    {
      type: "next",
      description: "It has a button...",
      navigate: "Hypnotized",
    },
    {
      type: "next",
      description: "Certainly not a safe thing to touch",
      navigate: "RainingUmbrella",
    },
    {
      type: "next",
      description: "Go back",
      navigate: -2,
    },
  ]),
  Hypnotized: createSituation(
    "The machine started to spin, and you fell asleep! When you woke up...",
    [
      {
        type: "next",
        description: "and...?",
        navigate: "ObtainRustyKey",
      },
    ]
  ),
  ObtainRustyKey: createSituation("A rusty key has appeared!", [
    {
      type: "next",
      description: "Am I fooled?",
      navigate: "Crossroad",
      addItems: { RustyKey: 1 },
    },
  ]),
  RainingUmbrella: createSituation(
    "Suddenly, an umbrella fell from the sky.\nWhat will you do?",
    [
      {
        type: "next",
        description: "Interesting. Is it still usable?",
        navigate: "Raining",
      },
      {
        type: "next",
        description: "Aw! This path is haunted!",
        navigate: "Crossroad",
      },
    ]
  ),
  Raining: createSituation("There is a storm inside the umbrella!", [
    {
      type: "next",
      description: "Damn!",
      navigate: "TakeCopter",
    },
  ]),
  TakeCopter: createSituation(
    "There is a weirdly shaped stick on the ground. \n What will you do with it?",
    [
      {
        type: "end",
        description: "Let's see it closely",
        navigate: NAVIGATION_TARGET.FAILURE,
        message: "The stick started to fly. You fell and hurt your back!",
      },
      {
        type: "next",
        description: "Better not to touch",
        navigate: "Maze",
      },
      {
        type: "next",
        description: "Go back",
        navigate: -2,
      },
    ]
  ),
  Maze: createSituation(
    "A narrow path appeared before you. \nWill you proceed?",
    [
      {
        type: "next",
        description: "Go!",
        requiredItems: { MazeRouteMemory: 1 },
        navigate: "Door",
      },
      {
        type: "next",
        description: "There should be another path",
        navigate: -2,
      },
    ]
  ),
  Door: createSituation("There is a shiny door in front of you", [
    {
      type: "end",
      description: "A way out...?",
      navigate: NAVIGATION_TARGET.SUCCESS,
      requiredItems: { RustyKey: 1, TimeFuroshiki: 1 },
      message: "Congratulations, you made it out!",
    },
    {
      type: "next",
      description: "This is a trap",
      navigate: "Maze",
    },
  ]),
} as const satisfies Record<SituationNames, Situation>;
