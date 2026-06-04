import { atomWithStorage } from "jotai/utils";

export const executiveViewAtom = atomWithStorage<boolean>(
  "executive-view",
  false
);
