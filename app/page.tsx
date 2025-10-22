"use client";

import { useState, useCallback } from "react";
import MuseumScene from "@/components/museum-scene";
import InfoModal from "@/components/info-modal";
import InstructionModal from "@/components/instruction-modal";
import Minimap from "@/components/minimap";
import type { ExhibitData } from "@/types/museum";

export default function MuseumPage() {
  const [selectedExhibit, setSelectedExhibit] = useState<ExhibitData | null>(
    null
  );
  const [visitedExhibits, setVisitedExhibits] = useState<Set<string>>(
    new Set()
  );
  const [showInstructions, setShowInstructions] = useState(true);

  const handleExhibitView = useCallback((exhibit: ExhibitData) => {
    setSelectedExhibit(exhibit);
    setVisitedExhibits((prev) => new Set([...prev, exhibit.id]));
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedExhibit(null);
  }, []);

  const handleCloseInstructions = useCallback(() => {
    setShowInstructions(false);
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

      {!showInstructions && <Minimap visitedExhibits={visitedExhibits} />}

      {visitedExhibits.size > 0 && (
        <div className="fixed bottom-4 right-4 bg-[#16213e] border border-[#0f3460] rounded-lg px-4 py-2 text-[#e8e8e8]">
          <p className="text-sm">
            Đã tham quan: {visitedExhibits.size}/3 khu trưng bày
          </p>
        </div>
      )}
    </div>
  );
}
