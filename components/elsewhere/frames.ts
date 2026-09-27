import type { PlateSettle } from "@/components/elsewhere/StoryPlate";

export type TextSide = "left" | "right";

export type FrameLayout = {
  settle: PlateSettle;
  figureClassName: string;
  mediaClassName: string;
  captionClassName: string;
  objectPosition: string;
  /** Narrative text sits on this side to counter the photograph's visual weight. */
  textSide: TextSide;
};

const stage =
  "grid h-full grid-cols-1 grid-rows-[minmax(0,1fr)_auto] items-end gap-3 lg:grid-cols-12 lg:grid-rows-1 lg:items-center lg:gap-x-gutter-desktop";

function frame(
  settle: PlateSettle,
  mediaClassName: string,
  captionClassName: string,
  textSide: TextSide,
  objectPosition = "center center",
): FrameLayout {
  return {
    settle,
    figureClassName: stage,
    mediaClassName,
    captionClassName,
    objectPosition,
    textSide,
  };
}

/** Photograph sizes stay as approved. `textSide` records which side the narrative uses. */
const rootsFrames: readonly FrameLayout[] = [
  {
    settle: "portrait",
    figureClassName:
      "grid h-full grid-cols-1 grid-rows-[minmax(0,1fr)_auto] items-end gap-3 lg:grid-cols-12 lg:grid-rows-1 lg:items-center lg:gap-x-gutter-desktop",
    mediaClassName:
      "h-full max-h-full w-auto max-w-[72%] justify-self-start sm:max-h-none sm:max-w-[50%] lg:col-span-4 lg:h-[96%] lg:max-w-none lg:w-auto",
    captionClassName: "max-w-sm lg:col-span-5 lg:col-start-6 lg:max-w-none lg:self-stretch",
    objectPosition: "left bottom",
    textSide: "right",
  },
  {
    settle: "shift",
    figureClassName:
      "grid h-full grid-cols-1 grid-rows-[minmax(0,1fr)_auto] items-end gap-3 lg:grid-cols-12 lg:grid-rows-1 lg:items-center lg:gap-x-gutter-desktop",
    mediaClassName:
      "h-full max-h-full w-full justify-self-end sm:max-h-none lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:h-[92%] lg:w-auto lg:justify-self-stretch",
    captionClassName:
      "max-w-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:max-w-none lg:self-stretch",
    objectPosition: "right center",
    textSide: "left",
  },
  {
    settle: "widen",
    figureClassName:
      "grid h-full grid-cols-1 grid-rows-[minmax(0,1fr)_auto] items-end gap-3 lg:grid-cols-12 lg:grid-rows-1 lg:items-center lg:gap-x-gutter-desktop",
    mediaClassName:
      "h-full max-h-full w-full sm:max-h-none lg:col-span-8 lg:col-start-5 lg:row-start-1 lg:h-full lg:w-auto",
    captionClassName:
      "max-w-md lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:max-w-none lg:self-stretch",
    objectPosition: "left center",
    textSide: "left",
  },
  {
    settle: "close",
    figureClassName:
      "grid h-full grid-cols-1 grid-rows-[minmax(0,1fr)_auto] items-end gap-3 lg:grid-cols-12 lg:grid-rows-1 lg:items-end lg:gap-x-gutter-desktop",
    mediaClassName:
      "h-full max-h-full w-full sm:max-h-none lg:col-span-9 lg:col-start-4 lg:row-start-1 lg:h-[96%] lg:w-auto",
    captionClassName:
      "max-w-sm lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:max-w-none lg:self-stretch",
    objectPosition: "left center",
    textSide: "left",
  },
];

const ordinaryDaysFrames: readonly FrameLayout[] = [
  frame(
    "shift",
    "h-full max-h-full w-full justify-self-end sm:max-h-none lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:h-[88%] lg:w-auto lg:justify-self-end",
    "max-w-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:max-w-none lg:self-stretch",
    "left",
    "center 62%",
  ),
  frame(
    "widen",
    "h-full max-h-full w-full justify-self-end sm:max-h-none lg:col-span-8 lg:col-start-5 lg:row-start-1 lg:h-full lg:w-auto",
    "max-w-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:max-w-none lg:self-stretch",
    "left",
    "left center",
  ),
  frame(
    "shift",
    "h-full max-h-full w-full justify-self-start sm:max-h-none lg:col-span-7 lg:h-[90%] lg:w-auto",
    "max-w-sm lg:col-span-4 lg:col-start-8 lg:max-w-none lg:self-stretch",
    "right",
    "left center",
  ),
  frame(
    "widen",
    "h-full max-h-full w-full sm:max-h-none lg:col-span-8 lg:h-full lg:w-auto",
    "max-w-md lg:col-span-4 lg:col-start-9 lg:max-w-none lg:self-stretch",
    "right",
    "left center",
  ),
  frame(
    "close",
    "h-full max-h-full w-full justify-self-end sm:max-h-none lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:h-[90%] lg:w-auto",
    "max-w-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:max-w-none lg:self-stretch",
    "left",
    "66% center",
  ),
  frame(
    "portrait",
    "h-full max-h-full w-full justify-self-start sm:max-h-none lg:col-span-7 lg:h-[86%] lg:w-auto",
    "max-w-sm lg:col-span-4 lg:col-start-8 lg:max-w-none lg:self-stretch",
    "right",
    "center center",
  ),
];

const newGroundFrames: readonly FrameLayout[] = [
  frame(
    "shift",
    "h-full max-h-full w-full sm:max-h-none lg:col-span-7 lg:h-[86%] lg:w-auto",
    "max-w-sm lg:col-span-4 lg:col-start-8 lg:max-w-none lg:self-stretch",
    "right",
  ),
  frame(
    "widen",
    "h-full max-h-full w-full sm:max-h-none lg:col-span-8 lg:h-full lg:w-auto",
    "max-w-md lg:col-span-4 lg:col-start-9 lg:max-w-none lg:self-stretch",
    "right",
    "center 42%",
  ),
  frame(
    "portrait",
    "h-full max-h-full w-full justify-self-start sm:max-h-none lg:col-span-7 lg:h-[92%] lg:w-auto",
    "max-w-sm lg:col-span-4 lg:col-start-8 lg:row-start-1 lg:max-w-none lg:self-stretch",
    "right",
    "center 40%",
  ),
  frame(
    "shift",
    "h-full max-h-full w-full justify-self-end sm:max-h-none lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:h-[90%] lg:w-auto",
    "max-w-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:max-w-none lg:self-stretch",
    "left",
    "center 30%",
  ),
  frame(
    "shift",
    "h-full max-h-full w-full sm:max-h-none lg:col-span-7 lg:h-[90%] lg:w-auto",
    "max-w-sm lg:col-span-4 lg:col-start-8 lg:max-w-none lg:self-stretch",
    "right",
    "center 70%",
  ),
  frame(
    "close",
    "h-full max-h-full w-full sm:max-h-none lg:col-span-9 lg:h-full lg:w-auto",
    "max-w-sm lg:col-span-3 lg:col-start-10 lg:max-w-none lg:self-stretch",
    "right",
    "left center",
  ),
];

const beyondFrames: readonly FrameLayout[] = [
  frame(
    "portrait",
    "h-full max-h-full w-auto max-w-[70%] justify-self-end sm:max-h-none sm:max-w-[48%] lg:col-span-4 lg:col-start-8 lg:row-start-1 lg:h-full lg:max-w-none lg:w-auto lg:justify-self-end",
    "max-w-sm lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:max-w-none lg:self-stretch",
    "left",
    "right center",
  ),
  frame(
    "widen",
    "h-full max-h-full w-full justify-self-start sm:max-h-none lg:col-span-8 lg:h-full lg:w-auto",
    "max-w-sm lg:col-span-4 lg:col-start-9 lg:row-start-1 lg:max-w-none lg:self-stretch",
    "right",
    "center center",
  ),
  frame(
    "portrait",
    "h-full max-h-full w-auto max-w-[74%] justify-self-start sm:max-h-none sm:max-w-[52%] lg:col-span-5 lg:h-full lg:max-w-none lg:w-auto",
    "max-w-sm lg:col-span-5 lg:col-start-7 lg:max-w-none lg:self-stretch",
    "right",
    "center center",
  ),
  frame(
    "shift",
    "h-full max-h-full w-full sm:max-h-none lg:col-span-8 lg:h-[92%] lg:w-auto",
    "max-w-md lg:col-span-4 lg:col-start-9 lg:max-w-none lg:self-stretch",
    "right",
    "center 55%",
  ),
  frame(
    "close",
    "h-full max-h-full w-full sm:max-h-none lg:col-span-8 lg:h-full lg:w-auto",
    "max-w-sm lg:col-span-4 lg:col-start-9 lg:max-w-none lg:self-stretch",
    "right",
    "42% center",
  ),
];

const atHomeFrames: readonly FrameLayout[] = [
  frame(
    "portrait",
    "h-full max-h-full w-auto max-w-[58%] justify-self-start sm:max-h-none sm:max-w-[42%] lg:col-span-3 lg:h-full lg:max-w-none lg:w-auto",
    "max-w-sm lg:col-span-5 lg:col-start-5 lg:max-w-none lg:self-stretch",
    "right",
    "center center",
  ),
  frame(
    "shift",
    "h-full max-h-full w-full justify-self-end sm:max-h-none lg:col-span-7 lg:col-start-6 lg:row-start-1 lg:h-[86%] lg:w-auto",
    "max-w-sm lg:col-span-4 lg:col-start-1 lg:row-start-1 lg:max-w-none lg:self-stretch",
    "left",
    "center center",
  ),
  frame(
    "portrait",
    "h-full max-h-full w-auto max-w-[70%] justify-self-end sm:max-h-none sm:max-w-[46%] lg:col-span-4 lg:col-start-8 lg:row-start-1 lg:h-full lg:max-w-none lg:w-auto",
    "max-w-sm lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:max-w-none lg:self-stretch",
    "left",
    "center center",
  ),
];

const collectionFrames: Record<string, readonly FrameLayout[]> = {
  roots: rootsFrames,
  "ordinary-days": ordinaryDaysFrames,
  "new-ground": newGroundFrames,
  beyond: beyondFrames,
  "at-home": atHomeFrames,
};

export function framesFor(id: string) {
  const frames = collectionFrames[id];
  if (!frames) throw new Error(`Elsewhere frames not found for ${id}`);
  return frames;
}
