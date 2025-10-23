"use client";

import { useEffect, useState } from "react";
import { museumData } from "@/data/museum-data";

interface MinimapProps {
  visitedExhibits: Set<string>;
  unlockedRooms: Set<number>;
}

export default function Minimap({
  visitedExhibits,
  unlockedRooms,
}: MinimapProps) {
  const [playerPos, setPlayerPos] = useState({ x: 150, y: 600 });

  useEffect(() => {
    const handlePlayerMove = (event: CustomEvent) => {
      setPlayerPos(event.detail);
    };

    window.addEventListener("playerMove" as any, handlePlayerMove);
    return () =>
      window.removeEventListener("playerMove" as any, handlePlayerMove);
  }, []);

  const scaleX = 360 / 9000;
  const scaleY = 90 / 1200;

  return (
    <div className="fixed top-20 right-4 bg-[#16213e]/90 border-2 border-[#0f3460] rounded-lg p-3 backdrop-blur-sm max-w-[400px]">
      <h3 className="text-xs font-semibold text-[#e8e8e8] mb-2 text-center">
        Bản đồ bảo tàng (9 phòng)
      </h3>
      <div className="relative w-[360px] h-[90px] bg-[#1a1a2e] rounded border border-[#0f3460]">
        <div className="absolute inset-1 border border-[#374151] rounded" />

        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="absolute top-2 bottom-2 w-[2px]"
            style={{
              left: `${i * 40}px`,
              backgroundColor: unlockedRooms.has(i + 1) ? "#374151" : "#7f1d1d",
            }}
          />
        ))}

        {museumData.map((exhibit) => {
          const isVisited = visitedExhibits.has(exhibit.id);
          const isLocked = !unlockedRooms.has(exhibit.roomNumber);
          const colors = [
            "#3b82f6",
            "#8b5cf6",
            "#06b6d4",
            "#3b82f6", // Room 1
            "#ef4444",
            "#f97316",
            "#dc2626", // Room 2
            "#f59e0b",
            "#10b981",
            "#14b8a6",
            "#f59e0b", // Room 3
            "#6366f1",
            "#8b5cf6",
            "#06b6d4",
            "#6366f1", // Room 4
            "#ec4899",
            "#f43f5e",
            "#db2777",
            "#ec4899", // Room 5
            "#14b8a6",
            "#06b6d4",
            "#0891b2",
            "#14b8a6", // Room 6
            "#a855f7",
            "#9333ea",
            "#7c3aed", // Room 7
            "#64748b", // Room 8
            "#475569", // Room 9
          ];

          return (
            <div
              key={exhibit.id}
              className="absolute rounded-sm transition-all"
              style={{
                left: `${exhibit.position.x * scaleX - 3}px`,
                top: `${exhibit.position.y * scaleY - 3}px`,
                width: "6px",
                height: "6px",
                backgroundColor: isLocked
                  ? "#64748b"
                  : colors[museumData.indexOf(exhibit)],
                opacity: isLocked ? 0.3 : isVisited ? 1 : 0.5,
                boxShadow:
                  isVisited && !isLocked
                    ? `0 0 8px ${colors[museumData.indexOf(exhibit)]}`
                    : "none",
              }}
            />
          );
        })}

        {/* Player position */}
        <div
          className="absolute w-2 h-2 bg-[#4ade80] rounded-full transition-all duration-100"
          style={{
            left: `${playerPos.x * scaleX - 4}px`,
            top: `${playerPos.y * scaleY - 4}px`,
            boxShadow: "0 0 8px #4ade80",
          }}
        />
      </div>

      <div className="mt-2 text-xs text-[#94a3b8] space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#4ade80] rounded-full" />
          <span>Vị trí của bạn</span>
        </div>
        <div className="text-[10px] mt-2 space-y-0.5 max-h-32 overflow-y-auto">
          <div
            className={`font-semibold ${
              unlockedRooms.has(1) ? "text-[#3b82f6]" : "text-[#64748b]"
            }`}
          >
            Phòng 1: Khởi nguồn {unlockedRooms.has(1) ? "✓" : "🔒"}
          </div>
          <div
            className={`font-semibold ${
              unlockedRooms.has(2) ? "text-[#ef4444]" : "text-[#64748b]"
            }`}
          >
            Phòng 2: Bản chất {unlockedRooms.has(2) ? "✓" : "🔒"}
          </div>
          <div
            className={`font-semibold ${
              unlockedRooms.has(3) ? "text-[#f59e0b]" : "text-[#64748b]"
            }`}
          >
            Phòng 3: Pháp quyền {unlockedRooms.has(3) ? "✓" : "🔒"}
          </div>
          <div
            className={`font-semibold ${
              unlockedRooms.has(4) ? "text-[#6366f1]" : "text-[#64748b]"
            }`}
          >
            Phòng 4: Phát huy {unlockedRooms.has(4) ? "✓" : "🔒"}
          </div>
          <div
            className={`font-semibold ${
              unlockedRooms.has(5) ? "text-[#ec4899]" : "text-[#64748b]"
            }`}
          >
            Phòng 5: Chống tham nhũng {unlockedRooms.has(5) ? "✓" : "🔒"}
          </div>
          <div
            className={`font-semibold ${
              unlockedRooms.has(6) ? "text-[#14b8a6]" : "text-[#64748b]"
            }`}
          >
            Phòng 6: Đổi mới {unlockedRooms.has(6) ? "✓" : "🔒"}
          </div>
          <div
            className={`font-semibold ${
              unlockedRooms.has(7) ? "text-[#a855f7]" : "text-[#64748b]"
            }`}
          >
            Phòng 7: Trách nhiệm {unlockedRooms.has(7) ? "✓" : "🔒"}
          </div>
          <div
            className={`font-semibold ${
              unlockedRooms.has(8) ? "text-[#64748b]" : "text-[#475569]"
            }`}
          >
            Phòng 8: Đang xây dựng {unlockedRooms.has(8) ? "✓" : "🔒"}
          </div>
          <div
            className={`font-semibold ${
              unlockedRooms.has(9) ? "text-[#475569]" : "text-[#334155]"
            }`}
          >
            Phòng 9: Đang xây dựng {unlockedRooms.has(9) ? "✓" : "🔒"}
          </div>
        </div>
      </div>
    </div>
  );
}
