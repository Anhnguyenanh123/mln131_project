"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import type { ExhibitData } from "@/types/museum";
import Image from "next/image";

interface InfoModalProps {
  exhibit: ExhibitData | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function InfoModal({
  exhibit,
  isOpen,
  onClose,
}: InfoModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !exhibit) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-[#16213e] border border-[#0f3460] rounded-lg max-w-5xl w-full max-h-[80vh] overflow-y-auto no-scrollbar shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-[#0f3460] px-6 py-4 flex items-center justify-between border-b border-[#1a1a2e]">
          <h2 className="text-xl font-bold text-[#e8e8e8] pr-8">
            {exhibit?.title}
          </h2>
          <div className="absolute left-6 top-4 text-xs text-[#94a3b8]">
            Phòng {exhibit?.roomNumber}
          </div>
          <button
            onClick={onClose}
            className="absolute right-4 top-4 p-2 rounded-lg hover:bg-[#1a1a2e] transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5 text-[#94a3b8]" />
          </button>
        </div>

        {/* Split content: image + text */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            {/* Left: Image */}
            {exhibit?.image && (
              <div className="md:sticky md:top-16">
                <Image
                  width={800}
                  height={600}
                  src={exhibit.image}
                  alt={exhibit.title}
                  className="w-full h-64 md:h-[420px] object-cover rounded-lg border-2 border-[#0f3460]"
                />
              </div>
            )}

            {/* Right: Text */}
            <div className="prose prose-invert max-w-none">
              <div className="text-[#cbd5e1] leading-relaxed space-y-4">
                {exhibit?.content.split("\n\n").map((paragraph, index) => (
                  <p key={index} className="text-base whitespace-pre-line">
                    {paragraph}
                  </p>
                ))}
              </div>

              {exhibit?.examples && exhibit.examples.length > 0 && (
                <div className="mt-6 p-4 bg-[#0f3460] rounded-lg border border-[#1a1a2e]">
                  <h3 className="text-lg font-semibold text-[#e8e8e8] mb-3">
                    Dẫn chứng thực tiễn:
                  </h3>
                  <ul className="space-y-2 text-[#cbd5e1]">
                    {exhibit.examples.map((example, index) => (
                      <li key={index} className="flex gap-2">
                        <span className="text-[#4ade80] mt-1">•</span>
                        <span>{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-[#0f3460] px-6 py-4 border-t border-[#1a1a2e]">
          <button
            onClick={onClose}
            className="w-full bg-[#4ade80] hover:bg-[#22c55e] text-[#1a1a2e] font-semibold py-3 rounded-lg transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
}
