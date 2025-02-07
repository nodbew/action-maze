import { Item } from "./types/inventory";
import { createSituation, NAVIGATION_TARGET } from "@/features/game/lib/situationUtils";
import { Situation } from "./types/situation";

export type ItemNames = "MazeRouteMemory";
export const ITEMS = {
  MazeRouteMemory: { name: "MazeRouteMemory", show: false, stackable: false },
} as const satisfies Record<ItemNames, Item<ItemNames>>;

export type SituationNames = "Start" | "Ending" | "ConductorRobot" | "TimeCapsule" | "Monomosu" | "ListenToWall" | "Crossroad";
export const SITUATIONS = {
  Start: createSituation("You woke up. You see a light in the right path. Which path will you take?", [
    {
      type: "next",
      description: "Right",
      navigate: "ConductorRobot"
    },
    {
      type: "end",
      description: "Left",
      navigate: NAVIGATION_TARGET.FAILURE,
      message: "You fell into a time tunnel, and sent back to an ancient era... And a dinasour ate you!"
    }
  ]),
  ConductorRobot: createSituation("You advance, and you see a huge robot sitting in front of you. It is making loud noises, and seems to be angry... What will you do?", [
    {
      type: "next",
      description: "DESTROY IT!",
      navigate: "TimeCapsule",
    },
    {
      type: "next",
      description: "ignore and advance",
      navigate: "Monomosu"
    }
  ]),
  TimeCapsule: createSituation("You find a time capsule inside the robot. What will you do with it?", [
    {
      type: "end",
      description: "Let's see what's inside it...",
      navigate: NAVIGATION_TARGET.FAILURE,
      message: "There was a skeleton!"
    },
    {
      type: "next",
      description: "Better not touch",
      navigate: "Monomosu",
    }
  ]),
  Monomosu: createSituation("You found a misterious flask on the ground. What will you do?", [
    {
      type: "next",
      description: "Spray it",
      navigate: "ListenToWall",
    },
    {
      type: "next",
      description: "Go back",
      navigate: "Crossroad"
    }
  ]),
  Crossroad: createSituation("You came to a crossroad. Whic path will you take?", [
    {
      type: "end",
      description: "Left",
      navigate: NAVIGATION_TARGET.FAILURE,
      message: "You fell into a pitfall!"
    },
    {
      type: "next",
      description: "Middle",
      navigate: ""
    },
    {
      type: "next",
      description: "Right",
      navigate: ""
    }
  ]),
  ListenToWall: createSituation("The wall started talking! \n\"Go left and you will find a piece of bread...\"\n Will you trust it?", [
    {
      type: "next",
      description: "Follow it",
      addItems: ["MazeRouteMemory"],
      navigate: "Crossroad"
    },
    {
      type:"next",
      description: "It must be a trap",
      navigate: "Crossroad"
    }
  ]),
  Ending: createSituation(
    "You advance, and you find three paths. which one will you take?",
    [
      {
        type: "next",
        description: "Left",
        requiredItems: ["タケコプター"],
        navigate: "Start",
      },
      {
        type: "end",
        description: "Middle",
        message: "Well done!",
        navigate: NAVIGATION_TARGET.SUCCESS,
      },
      {
        type: "end",
        description: "Right",
        message: "Oops... You fell into a trap!",
        navigate: NAVIGATION_TARGET.FAILURE,
      },
    ]
  ),
} as const satisfies Record<SituationNames, Situation>;
