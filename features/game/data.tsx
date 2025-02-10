import {
  createSituation,
  NAVIGATION_TARGET,
} from "@/features/game/lib/situationUtils";
import { Item } from "./types/inventory";
import { Situation } from "./types/situation";

export type ItemNames = "MazeRouteMemory" | "Time Furoshiki" | "Key";
export const ITEMS = {
  MazeRouteMemory: { name: "MazeRouteMemory", show: false, stackable: false },
  "Time Furoshiki": { name: "Time Furoshiki", show: true, stackable: false },
  Key: { name: "Key", show: true, stackable: false },
} as const satisfies Record<ItemNames, Item<ItemNames>>;

export type SituationNames =
  | "Start"
  | "ConductorRobot"
  | "TimeCapsule"
  | "Monomosu"
  | "ListenToWall"
  | "Crossroad"
  | "MemorizationBread"
  | "Maze"
  | "Key"
  | "Door"
  | "PLACEHOLDER";
export const SITUATIONS = {
  Start: createSituation(
    "You woke up. \nThere are two paths, and the right one is . \nWhich path will you take?",
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
          "You fall into a time tunnel, and is sent back to an ancient era... And a dinasour ate you!",
      },
    ]
  ),
  ConductorRobot: createSituation(
    "You advance, and you see a huge robot sitting in front of you. It is making loud noises, and seems to be angry... \nWhat will you do?",
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
    ]
  ),
  TimeCapsule: createSituation(
    "You find a time capsule inside the robot. What will you do with it?",
    [
      {
        type: "end",
        description: "Let's see what's inside it...",
        navigate: NAVIGATION_TARGET.FAILURE,
        message: "There was a skeleton!",
      },
      {
        type: "next",
        description: "Better not touch",
        navigate: "Monomosu",
      },
    ]
  ),
  Monomosu: createSituation(
    "You found a misterious flask on the ground. What will you do?",
    [
      {
        type: "next",
        description: "Spray it",
        navigate: "ListenToWall",
      },
      {
        type: "next",
        description: "Go back",
        navigate: "Crossroad",
      },
    ]
  ),
  ListenToWall: createSituation(
    'The wall started talking! \n"Go left and you will find a piece of bread..."\n Will you trust it?',
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
    ]
  ),
  MemorizationBread: createSituation("You found a bread! Will you eat it?", [
    {
      type: "next",
      description: "Why not?",
      addItems: ["MazeRouteMemory"],
      navigate: "Crossroad",
    },
    {
      type: "next",
      description: "Too dangerous",
      navigate: "Crossroad",
    },
  ]),
  Crossroad: createSituation(
    "You came to a crossroad. Which path will you take?",
    [
      {
        type: "end",
        description: "Left",
        navigate: NAVIGATION_TARGET.FAILURE,
        message: "You fell into a pitfall!",
      },
      {
        type: "next",
        description: "Middle",
        navigate: "PLACEHOLDER",
      },
      {
        type: "next",
        description: "Right",
        navigate: "PLACEHOLDER",
      },
    ]
  ),
  PLACEHOLDER: createSituation("THIS IS A PLACEHOLDER", [
    {
      type: "next",
      description: "Exit",
      navigate: "Start",
      requiredItems: ["Key"],
    }
  ]),
  Maze: createSituation(
    "A narrow path appeared before you. Will you proceed?",
    [
      {
        type: "next",
        description: "Go!",
        requiredItems: ["MazeRouteMemory"],
        navigate: "Key",
      },
      {
        type: "next",
        description: "There should be another path",
        navigate: -1,
      },
    ]
  ),
  Key: createSituation("There is a rusty key on the ground...", [
    {
      type: "next",
      description: "What is it for...?",
      requiredItems: ["Time Furoshiki"],
      addItems: ["Key"],
      navigate: "Door",
    },
    {
      type: "next",
      description: "It's not important",
      navigate: "Maze",
    },
  ]),
  Door: createSituation("There is a shiny door in front of you", [
    {
      type: "end",
      description: "A way out...?",
      navigate: NAVIGATION_TARGET.SUCCESS,
      requiredItems: ["Key"],
      message: "Congratulations, you made it out!",
    },
    {
      type: "next",
      description: "This is a trap",
      navigate: "Maze",
    },
  ]),
} as const satisfies Record<SituationNames, Situation>;
