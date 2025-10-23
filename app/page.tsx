"use client";

import { useState, useCallback, useEffect } from "react";
import MuseumScene from "@/components/museum-scene";
import InfoModal from "@/components/info-modal";
import InstructionModal from "@/components/instruction-modal";
import QuizModal from "@/components/quiz-modal";
import Minimap from "@/components/minimap";
import type { ExhibitData } from "@/types/museum";
import { roomQuizzes } from "@/data/museum-data";

export default function MuseumPage() {
  const [selectedExhibit, setSelectedExhibit] = useState<ExhibitData | null>(
    null
  );
  const [visitedExhibits, setVisitedExhibits] = useState<Set<string>>(
    new Set()
  );
  const [showInstructions, setShowInstructions] = useState(true);
  const [unlockedRooms, setUnlockedRooms] = useState<Set<number>>(new Set([1]));
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuizRoom, setCurrentQuizRoom] = useState<number | null>(null);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("museum-progress");
    if (saved) {
      const data = JSON.parse(saved);
      setUnlockedRooms(new Set(data.unlockedRooms || [1]));
      setVisitedExhibits(new Set(data.visitedExhibits || []));
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem(
      "museum-progress",
      JSON.stringify({
        unlockedRooms: Array.from(unlockedRooms),
        visitedExhibits: Array.from(visitedExhibits),
      })
    );
  }, [unlockedRooms, visitedExhibits]);

  const handleExhibitView = useCallback(
    (exhibit: ExhibitData) => {
      if (!unlockedRooms.has(exhibit.roomNumber)) {
        alert(
          `Phòng ${exhibit.roomNumber} đang bị khóa. Vui lòng hoàn thành quiz của phòng trước đó.`
        );
        return;
      }
      setSelectedExhibit(exhibit);
      setVisitedExhibits((prev) => new Set([...prev, exhibit.id]));
    },
    [unlockedRooms]
  );

  const handleCloseModal = useCallback(() => {
    setSelectedExhibit(null);
  }, []);

  const handleCloseInstructions = useCallback(() => {
    setShowInstructions(false);
  }, []);

  const handleStartQuiz = useCallback((roomNumber: number) => {
    setCurrentQuizRoom(roomNumber);
    setShowQuiz(true);
  }, []);

  const handleQuizPass = useCallback(() => {
    if (currentQuizRoom !== null) {
      setUnlockedRooms((prev) => {
        const newUnlocked = new Set([...prev, currentQuizRoom + 1]);
        return newUnlocked;
      });
      setShowQuiz(false);
      setCurrentQuizRoom(null);
      alert(`Chúc mừng! Bạn đã mở khóa Phòng ${currentQuizRoom + 1}`);
    }
  }, [currentQuizRoom]);

  const handleQuizClose = useCallback(() => {
    setShowQuiz(false);
    setCurrentQuizRoom(null);
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex flex-col">
      <header className="bg-[#16213e] border-b border-[#0f3460] py-6 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#e8e8e8] tracking-tight">
          BẢO TÀNG CHỦ NGHĨA XÃ HỘI KHOA HỌC
        </h1>
        <p className="text-center text-[#94a3b8] mt-2 text-sm">
          Sử dụng phím mũi tên hoặc WASD để di chuyển • Nhấn E để xem nội dung
        </p>
      </header>

      <main className="flex-1 relative">
        <MuseumScene
          onExhibitInteract={handleExhibitView}
          visitedExhibits={visitedExhibits}
          unlockedRooms={unlockedRooms}
        />
      </main>

      <InstructionModal
        isOpen={showInstructions}
        onClose={handleCloseInstructions}
      />

      <InfoModal
        exhibit={selectedExhibit}
        isOpen={!!selectedExhibit}
        onClose={handleCloseModal}
      />

      {showQuiz && currentQuizRoom !== null && (
        <QuizModal
          isOpen={showQuiz}
          roomNumber={currentQuizRoom}
          questions={
            roomQuizzes.find((q) => q.roomNumber === currentQuizRoom)
              ?.questions || []
          }
          onPass={handleQuizPass}
          onClose={handleQuizClose}
        />
      )}

      {!showInstructions && (
        <Minimap
          visitedExhibits={visitedExhibits}
          unlockedRooms={unlockedRooms}
        />
      )}

      {!showInstructions && (
        <div className="fixed bottom-4 left-4 space-y-2">
          {Array.from(unlockedRooms)
            .filter((room) => room <= 7)
            .map((room) => (
              <button
                key={room}
                onClick={() => handleStartQuiz(room)}
                className="block w-full px-4 py-2 bg-[#16213e] border border-[#0f3460] rounded-lg text-[#e8e8e8] hover:bg-[#0f3460] transition-colors text-sm"
              >
                Quiz Phòng {room}
              </button>
            ))}
        </div>
      )}

      {visitedExhibits.size > 0 && (
        <div className="fixed bottom-4 right-4 bg-[#16213e] border border-[#0f3460] rounded-lg px-4 py-2 text-[#e8e8e8]">
          <p className="text-sm">Phòng đã mở: {unlockedRooms.size}/9</p>
          <p className="text-sm">
            Đã tham quan: {visitedExhibits.size} khu trưng bày
          </p>
        </div>
      )}
    </div>
  );
}
