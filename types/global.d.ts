import { ExhibitData } from "./museum";

export {};

declare global {
  interface Window {
    handleExhibitInteract?: (exhibit: ExhibitData) => void;
  }
}
