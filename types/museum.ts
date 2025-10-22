export interface ExhibitData {
  id: string;
  title: string;
  position: { x: number; y: number };
  content: string;
  examples?: string[];
  image?: string;
}
