import { ExhibitData } from "@/types/museum";

export {};

declare global {
  interface Window {
    handleExhibitInteract?: (exhibit: ExhibitData) => void;
    currentUsername?: string;
  }
}
