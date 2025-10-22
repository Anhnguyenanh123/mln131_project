export interface ExhibitData {
  id: string;
  title: string;
  position: { x: number; y: number };
  content: string;
  examples?: string[];
  image?: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correctAnswer: "A" | "B" | "C" | "D";
}

export interface QuizSet {
  id: string;
  questions: QuizQuestion[];
  shuffleQuestions?: boolean;
}

export interface Interactable {
  id: string;
  title: string;
  position: { x: number; y: number };
  content: string;
  image?: string;
  examples?: string[];
}

export interface Room {
  id: string;
  name: string;
  interactables: Interactable[];
  quizSets: QuizSet[];
  portalPosition: { x: number; y: number };
  nextRoomId?: string;
}

export interface GameProgress {
  unlockedRooms: string[];
  completedQuizzes: string[];
  lastFailedSetPerRoom: Record<string, string>;
  readInteractables: string[];
  currentRoom: string;
}
