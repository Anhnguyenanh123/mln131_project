import type { ExhibitData } from "@/types/museum";

export const museumData: ExhibitData[] = [
  // Room 1: Socialist Democracy in Vietnam
  {
    id: "room1-1",
    title: "1.1. Khái niệm và bản chất dân chủ XHCN",
    position: { x: 300, y: 400 },
    image: "/vietnamese-democracy-people-voting-national-assemb.jpg",
    content: `🌟 Khái niệm và bản chất

Dân chủ xã hội chủ nghĩa (XHCN) là nền dân chủ của nhân dân, do nhân dân và vì nhân dân, được thực hiện dưới sự lãnh đạo của Đảng Cộng sản Việt Nam.

Nó khác với dân chủ tư sản ở chỗ: dân chủ tư sản chủ yếu phục vụ cho giai cấp tư sản, còn dân chủ XHCN hướng tới lợi ích của đa số nhân dân lao động, bảo đảm quyền làm chủ thực sự cho nhân dân.

Bản chất của dân chủ XHCN là gắn liền giữa quyền lực Nhà nước và quyền lực Nhân dân, thể hiện trên ba lĩnh vực:

• Chính trị: Nhân dân tham gia vào quản lý nhà nước, xã hội, thông qua bầu cử, ứng cử, giám sát.
• Kinh tế: Nhân dân làm chủ các tư liệu sản xuất chủ yếu, tham gia phân phối công bằng.
• Văn hoá - xã hội: Nhân dân được tự do sáng tạo, phát triển toàn diện con người.`,
    examples: [
      'Hiến pháp 2013, Điều 2: "Nhà nước Cộng hòa xã hội chủ nghĩa Việt Nam là Nhà nước pháp quyền xã hội chủ nghĩa của Nhân dân, do Nhân dân, vì Nhân dân."',
      "Các kỳ bầu cử Quốc hội, HĐND các cấp (2021–2026) thể hiện quyền làm chủ của nhân dân với tỷ lệ cử tri đi bầu trên 99%.",
    ],
  },
  {
    id: "room1-2",
    title: "1.2. Hình thức thực hiện dân chủ",
    position: { x: 300, y: 800 },
    // Text-only exhibit
    content: `🌟 Hình thức thực hiện dân chủ

Dân chủ XHCN được thực hiện qua hai hình thức:

• Dân chủ trực tiếp: Nhân dân tham gia bàn bạc, quyết định trực tiếp tại cơ sở (ví dụ: góp ý dự thảo luật, quy hoạch địa phương, ngân sách).

• Dân chủ đại diện: Thông qua Quốc hội, Hội đồng nhân dân, các cơ quan dân cử — đại diện cho ý chí, nguyện vọng của nhân dân.`,
    examples: [
      'Luật Thực hiện dân chủ ở cơ sở (2022): quy định rõ quyền "dân biết, dân bàn, dân làm, dân kiểm tra".',
      "Mô hình chính quyền điện tử, chính quyền số đang giúp mở rộng dân chủ trực tuyến (ví dụ: Cổng thông tin góp ý dự thảo văn bản pháp luật của Chính phủ).",
    ],
  },
  {
    id: "room1-3",
    title: "1.3. Ý nghĩa và vai trò",
    position: { x: 700, y: 600 },
    // Text-only exhibit
    content: `🌟 Ý nghĩa và vai trò

• Là nền tảng chính trị – xã hội của chế độ XHCN.
• Thúc đẩy phát triển con người, xã hội công bằng, dân chủ, văn minh.
• Là điều kiện để củng cố niềm tin của nhân dân với Đảng và Nhà nước.`,
    examples: [
      'Nghị quyết Đại hội XIII của Đảng (2021): "Phát huy dân chủ XHCN, bảo đảm tất cả quyền lực Nhà nước thuộc về Nhân dân."',
    ],
  },

  // Room 2: Socialist Rule of Law State
  {
    id: "room2-1",
    title: "2.1. Khái niệm và đặc trưng",
    position: { x: 1300, y: 400 },
    image: "/vietnam-government-building-justice-law-constituti.jpg",
    content: `🌟 Khái niệm và đặc trưng

Nhà nước pháp quyền XHCN là nhà nước quản lý xã hội bằng pháp luật, trong đó pháp luật thể hiện ý chí, lợi ích của nhân dân, được Đảng lãnh đạo, nhân dân làm chủ, Nhà nước quản lý.

Đặc trưng:
• Tổ chức và hoạt động dựa trên Hiến pháp và pháp luật.
• Quyền lực Nhà nước thống nhất, có phân công, phối hợp, kiểm soát giữa lập pháp – hành pháp – tư pháp.
• Tôn trọng, bảo vệ quyền con người, quyền công dân.
• Dưới sự lãnh đạo của Đảng Cộng sản Việt Nam.`,
    examples: [
      'Hiến pháp 2013, Điều 8: "Nhà nước quản lý xã hội bằng Hiến pháp và pháp luật, thực hiện nguyên tắc mọi cơ quan, tổ chức, cá nhân đều bình đẳng trước pháp luật."',
      "Cải cách tư pháp (2005–nay): tăng tính độc lập, chuyên nghiệp trong hoạt động của tòa án, viện kiểm sát.",
    ],
  },
  {
    id: "room2-2",
    title: "2.2. Mối quan hệ Đảng - Nhà nước - Nhân dân",
    position: { x: 1300, y: 800 },
    // Text-only exhibit
    content: `🌟 Mối quan hệ giữa Đảng, Nhà nước và Nhân dân

Đảng lãnh đạo, Nhà nước quản lý, Nhân dân làm chủ — ba yếu tố gắn bó hữu cơ, bảo đảm quyền lực Nhà nước không bị lạm dụng.

Đảng không làm thay Nhà nước mà lãnh đạo thông qua đường lối, chính sách, công tác cán bộ.`,
    examples: [
      'Nghị quyết Trung ương 6 khóa X (2008): "Xây dựng Nhà nước pháp quyền XHCN là nhiệm vụ trọng tâm của đổi mới hệ thống chính trị."',
      'Đề án "Tiếp tục xây dựng và hoàn thiện Nhà nước pháp quyền XHCN Việt Nam đến năm 2030, định hướng 2045" (Ban hành 2022).',
    ],
  },
  {
    id: "room2-3",
    title: "2.3. Vai trò pháp luật trong quản lý xã hội",
    position: { x: 1700, y: 600 },
    image: "/vietnam-law-justice-scales-legal-system.jpg",
    content: `🌟 Vai trò của pháp luật trong quản lý xã hội

• Pháp luật là phương tiện bảo vệ quyền con người, ngăn ngừa vi phạm, và đảm bảo công bằng xã hội.
• Thúc đẩy minh bạch, trách nhiệm giải trình, tạo môi trường thuận lợi cho phát triển kinh tế – xã hội.`,
    examples: [
      'Các chiến dịch phòng, chống tham nhũng ("đốt lò") được thực hiện theo pháp luật, thể hiện tính nghiêm minh và không có vùng cấm.',
      "Hệ thống pháp luật ngày càng được số hóa, giúp nhân dân dễ tiếp cận và giám sát.",
    ],
  },

  // Room 3: Development and Building
  {
    id: "room3-1",
    title: "3.1. Thành tựu đạt được",
    position: { x: 2300, y: 400 },
    image: "/vietnam-development-modern-city-progress-future.jpg",
    content: `🌟 Thành tựu

• Quyền làm chủ của nhân dân ngày càng được mở rộng.
• Pháp luật được hoàn thiện đồng bộ, nhiều lĩnh vực được số hóa (chính phủ điện tử, dịch vụ công trực tuyến).
• Bộ máy Nhà nước tinh gọn, hiệu quả hơn.`,
    examples: [
      "Đến năm 2025, hơn 80% thủ tục hành chính cấp bộ đã thực hiện trực tuyến qua Cổng Dịch vụ công Quốc gia.",
      "Việt Nam xếp hạng 86/194 về chỉ số Chính phủ điện tử (UN 2022).",
    ],
  },
  {
    id: "room3-2",
    title: "3.2. Hạn chế và thách thức",
    position: { x: 2300, y: 800 },
    // Text-only exhibit
    content: `🌟 Hạn chế, thách thức

• Một bộ phận cán bộ chưa thật sự "của dân, do dân, vì dân".
• Tình trạng tham nhũng, lãng phí, quan liêu vẫn còn.
• Cần tiếp tục hoàn thiện cơ chế kiểm soát quyền lực.`,
    examples: [
      "Báo cáo Chính phủ (2024): vẫn còn hơn 200 vụ án tham nhũng, kinh tế lớn được điều tra, xử lý.",
      "Một số quy định pháp luật còn chồng chéo, gây khó cho người dân và doanh nghiệp.",
    ],
  },
  {
    id: "room3-3",
    title: "3.3. Phương hướng và giải pháp",
    position: { x: 2700, y: 600 },
    // Text-only exhibit
    content: `🌟 Phương hướng, giải pháp

• Tiếp tục xây dựng Nhà nước pháp quyền XHCN vững mạnh, bảo đảm "mọi quyền lực Nhà nước thuộc về Nhân dân".
• Đẩy mạnh cải cách hành chính, tư pháp, ứng dụng công nghệ số.
• Phát huy dân chủ đi đôi với kỷ cương, pháp luật.
• Tăng cường giáo dục ý thức pháp luật, đạo đức công vụ.`,
    examples: [
      "Nghị quyết Đại hội XIII: xác định mục tiêu đến năm 2030, hoàn thiện cơ bản Nhà nước pháp quyền XHCN Việt Nam, hướng tới năm 2045 trở thành quốc gia phát triển, pháp quyền, dân chủ, văn minh.",
    ],
  },

  // Summary Room
  {
    id: "summary",
    title: "Tổng kết",
    position: { x: 3200, y: 600 },
    image: "/vietnam-flag-unity-future-vision.jpg",
    content: `🧭 Tổng kết

Dân chủ XHCN là nền tảng để nhân dân thực sự làm chủ đất nước.

Nhà nước pháp quyền XHCN là công cụ hiện thực hóa quyền làm chủ đó bằng Hiến pháp và pháp luật.

Hai yếu tố này tương tác và bổ sung cho nhau, tạo nên sức mạnh của chế độ XHCN Việt Nam trong thời kỳ đổi mới, hội nhập và phát triển.`,
    examples: [
      "Việt Nam đang trên con đường xây dựng một xã hội dân chủ, công bằng, văn minh, hướng tới mục tiêu trở thành quốc gia phát triển vào năm 2045.",
    ],
  },
];
