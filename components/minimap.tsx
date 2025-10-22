"use client";

import { useEffect, useState } from "react";
import { museumData } from "@/data/museum-data";

interface MinimapProps {
  visitedExhibits: Set<string>;
}

export default function Minimap({ visitedExhibits }: MinimapProps) {
  const [playerPos, setPlayerPos] = useState({ x: 150, y: 600 });

  useEffect(() => {
    const handlePlayerMove = (event: CustomEvent) => {
      setPlayerPos(event.detail);
    };

    window.addEventListener("playerMove" as any, handlePlayerMove);
    return () =>
      window.removeEventListener("playerMove" as any, handlePlayerMove);
  }, []);

  const scaleX = 280 / 3800;
  const scaleY = 90 / 1200;

  return (
    <div className="fixed top-20 right-4 bg-[#16213e]/90 border-2 border-[#0f3460] rounded-lg p-3 backdrop-blur-sm">
      <h3 className="text-xs font-semibold text-[#e8e8e8] mb-2 text-center">
        Bản đồ bảo tàng
      </h3>
      <div className="relative w-[280px] h-[90px] bg-[#1a1a2e] rounded border border-[#0f3460]">
        <div className="absolute inset-1 border border-[#374151] rounded" />

        <div className="absolute left-[66px] top-2 bottom-2 w-[2px] bg-[#374151]" />
        <div className="absolute left-[132px] top-2 bottom-2 w-[2px] bg-[#374151]" />
        <div className="absolute left-[206px] top-2 bottom-2 w-[2px] bg-[#374151]" />

        {museumData.map((exhibit, index) => {
          const isVisited = visitedExhibits.has(exhibit.id);
          const colors = [
            "#3b82f6",
            "#8b5cf6",
            "#06b6d4", // Room 1
            "#ef4444",
            "#f97316",
            "#dc2626", // Room 2
            "#f59e0b",
            "#10b981",
            "#14b8a6", // Room 3
            "#6366f1", // Summary
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
                backgroundColor: colors[index],
                opacity: isVisited ? 1 : 0.5,
                boxShadow: isVisited ? `0 0 8px ${colors[index]}` : "none",
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
        <div className="text-[10px] mt-2 space-y-0.5">
          <div className="font-semibold text-[#3b82f6]">
            Phòng 1: Dân chủ XHCN (3)
          </div>
          <div className="font-semibold text-[#ef4444]">
            Phòng 2: Nhà nước pháp quyền (3)
          </div>
          <div className="font-semibold text-[#f59e0b]">
            Phòng 3: Phát huy & Xây dựng (3)
          </div>
          <div className="font-semibold text-[#6366f1]">Tổng kết (1)</div>
        </div>
      </div>
    </div>
  );
}
