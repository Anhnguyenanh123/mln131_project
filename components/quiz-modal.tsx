"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import type { QuizQuestion } from "@/types/museum";

interface QuizModalProps {
  isOpen: boolean;
  roomNumber: number;
  questions: QuizQuestion[];
  onPass: () => void;
  onClose: () => void;
}

export default function QuizModal({
  isOpen,
  roomNumber,
  questions,
  onPass,
  onClose,
}: QuizModalProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setCurrentQuestion(0);
      setSelectedAnswer(null);
      setShowResult(false);
      setCorrectCount(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleAnswer = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === questions[currentQuestion].correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setCorrectCount((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      if (correctCount === questions.length) {
        onPass();
      } else {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setCorrectCount(0);
      }
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-[#16213e] border-2 border-[#0f3460] rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-[#16213e] border-b border-[#0f3460] p-6 flex justify-between items-center">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-[#e8e8e8]">
              Câu hỏi Phòng {roomNumber}
            </h2>
            <p className="text-sm text-[#94a3b8] mt-1">
              Trả lời đúng tất cả câu hỏi để mở khóa phòng tiếp theo
            </p>
            <div className="mt-3 bg-[#1a1a2e] rounded-full h-2 overflow-hidden">
              <div
                className="bg-[#4ade80] h-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <button
            onClick={onClose}
            className="ml-4 p-2 hover:bg-[#0f3460] rounded-lg transition-colors text-[#94a3b8] hover:text-[#e8e8e8]"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <p className="text-sm text-[#94a3b8] mb-2">
              Câu {currentQuestion + 1} / {questions.length}
            </p>
            <h3 className="text-xl font-semibold text-[#e8e8e8] mb-4">
              {questions[currentQuestion].question}
            </h3>

            <div className="space-y-3">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => !showResult && setSelectedAnswer(index)}
                  disabled={showResult}
                  className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                    showResult
                      ? index === questions[currentQuestion].correctAnswer
                        ? "border-green-500 bg-green-500/10 text-green-400"
                        : index === selectedAnswer
                        ? "border-red-500 bg-red-500/10 text-red-400"
                        : "border-[#0f3460] bg-[#1a1a2e] text-[#94a3b8]"
                      : selectedAnswer === index
                      ? "border-[#4ade80] bg-[#4ade80]/10 text-[#e8e8e8]"
                      : "border-[#0f3460] bg-[#1a1a2e] text-[#e8e8e8] hover:border-[#4ade80]/50"
                  }`}
                >
                  <span className="font-medium">
                    {String.fromCharCode(65 + index)}.
                  </span>{" "}
                  {option}
                </button>
              ))}
            </div>
          </div>

          {showResult && (
            <div
              className={`p-4 rounded-lg mb-4 ${
                isCorrect
                  ? "bg-green-500/10 border border-green-500/30"
                  : "bg-red-500/10 border border-red-500/30"
              }`}
            >
              <p
                className={`font-semibold ${
                  isCorrect ? "text-green-400" : "text-red-400"
                }`}
              >
                {isCorrect ? "✓ Chính xác!" : "✗ Chưa đúng"}
              </p>
              <p className="text-sm text-[#94a3b8] mt-1">
                {isCorrect
                  ? "Bạn đã trả lời đúng câu hỏi này."
                  : `Đáp án đúng là: ${String.fromCharCode(
                      65 + questions[currentQuestion].correctAnswer
                    )}`}
              </p>
            </div>
          )}

          <div className="flex justify-between items-center">
            <p className="text-sm text-[#94a3b8]">
              Đã trả lời đúng: {correctCount}/{questions.length}
            </p>
            {!showResult ? (
              <button
                onClick={handleAnswer}
                disabled={selectedAnswer === null}
                className="px-6 py-3 bg-[#4ade80] text-[#1a1a2e] font-semibold rounded-lg hover:bg-[#22c55e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Xác nhận
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-[#4ade80] text-[#1a1a2e] font-semibold rounded-lg hover:bg-[#22c55e] transition-colors"
              >
                {currentQuestion < questions.length - 1
                  ? "Câu tiếp theo"
                  : "Hoàn thành"}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
