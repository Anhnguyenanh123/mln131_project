import type { ExhibitData, RoomQuiz } from "@/types/museum";

export const museumData: ExhibitData[] = [
  // 🏛 PHÒNG 1: SỰ HÌNH THÀNH NỀN DÂN CHỦ XHCN Ở VIỆT NAM
  {
    id: "room1-exhibit1",
    title: "Khởi nguồn sau 1945",
    position: { x: 300, y: 300 },
    roomNumber: 1,
    content: `Sau Cách mạng Tháng Tám 1945, chế độ dân chủ nhân dân được xác lập – đặt nền móng đầu tiên cho dân chủ xã hội chủ nghĩa ở Việt Nam.`,
  },
  {
    id: "room1-exhibit2",
    title: "Giai đoạn 1976",
    position: { x: 300, y: 600 },
    roomNumber: 1,
    content: `Năm 1976, đất nước thống nhất và mang tên **Cộng hòa Xã hội Chủ Nghĩa Việt Nam**.  
Khái niệm “dân chủ XHCN” chưa phổ biến, mà thường dùng “chế độ làm chủ tập thể” gắn với “chuyên chính vô sản”.`,
  },
  {
    id: "room1-exhibit3",
    title: "Nhận thức ban đầu",
    position: { x: 300, y: 900 },
    roomNumber: 1,
    content: `Trong giai đoạn đầu, mối quan hệ giữa dân chủ xã hội chủ nghĩa và nhà nước pháp quyền chưa được xác định rõ ràng; nhiều lĩnh vực như dân sinh, dân trí, dân quyền chưa được đặt đúng vị trí.`,
  },
  {
    id: "room1-exhibit4",
    title: "Thực tiễn hạn chế",
    position: { x: 700, y: 600 },
    roomNumber: 1,
    content: `Dân chủ còn mang tính lý luận, thiếu cơ chế cụ thể để thực thi trong thời kỳ quá độ; các điều kiện kinh tế – xã hội – pháp lý còn chưa hoàn thiện.`,
  },

  // 🏛 PHÒNG 2: BƯỚC NGOẶT ĐỔI MỚI 1986
  {
    id: "room2-exhibit1",
    title: "Đại hội VI của Đảng (1986)",
    position: { x: 1300, y: 300 },
    roomNumber: 2,
    content: `Đại hội VI (1986) đề ra **đường lối đổi mới toàn diện**, nhấn mạnh dân chủ là **động lực phát triển** của đất nước.`,
  },
  {
    id: "room2-exhibit2",
    title: "Tư tưởng 'Lấy dân làm gốc'",
    position: { x: 1300, y: 600 },
    roomNumber: 2,
    content: `Đảng khẳng định: *“Cách mạng là sự nghiệp của quần chúng”*; chỉ khi nhân dân được làm chủ thật sự, mới tạo được phong trào cách mạng mạnh mẽ.`,
  },
  {
    id: "room2-exhibit3",
    title: "Vai trò của dân chủ trong đổi mới",
    position: { x: 1300, y: 900 },
    roomNumber: 2,
    content: `Dân chủ được coi là **nguồn sức mạnh nội sinh**, là nền tảng để đổi mới hệ thống chính trị, kinh tế, văn hóa, xã hội.`,
  },
  {
    id: "room2-exhibit4",
    title: "Thành tựu sau hơn 30 năm",
    position: { x: 1700, y: 600 },
    roomNumber: 2,
    content: `Nhận thức về dân chủ ngày càng hoàn thiện, được thể chế hóa trong các văn kiện Đảng; dân chủ trở thành **mục tiêu, bản chất và động lực của CNXH Việt Nam.**`,
  },

  // ⚖️ PHÒNG 3: BẢN CHẤT CỦA DÂN CHỦ XHCN Ở VIỆT NAM
  {
    id: "room3-exhibit1",
    title: "Quan điểm Hồ Chí Minh",
    position: { x: 2300, y: 300 },
    roomNumber: 3,
    content: `"Nước ta là nước dân chủ. Bao nhiêu lợi ích đều vì dân, bao nhiêu quyền hạn đều là của dân."  
→ Khẳng định quyền lực tối cao thuộc về nhân dân.`,
  },
  {
    id: "room3-exhibit2",
    title: "Nội dung bản chất",
    position: { x: 2300, y: 600 },
    roomNumber: 3,
    content: `- **Mục tiêu:** Dân giàu, nước mạnh, công bằng, văn minh.  
- **Bản chất:** Quyền lực thuộc về nhân dân.  
- **Động lực:** Phát huy sức mạnh toàn dân.  
- **Pháp luật:** Dân chủ phải gắn kỷ cương, luật pháp.`,
  },
  {
    id: "room3-exhibit3",
    title: "Cơ sở thực hiện",
    position: { x: 2300, y: 900 },
    roomNumber: 3,
    content: `Dựa vào Nhà nước XHCN và sự tham gia tích cực của nhân dân; mọi quyền lực đều bắt nguồn từ dân và do dân ủy quyền.`,
  },
  {
    id: "room3-exhibit4",
    title: "Hình thức thực hiện dân chủ",
    position: { x: 2700, y: 600 },
    roomNumber: 3,
    content: `**Dân chủ gián tiếp:** Thông qua Quốc hội, HĐND, các cơ quan đại diện.  
**Dân chủ trực tiếp:** Nhân dân bàn bạc, giám sát, kiểm tra.  
Phương châm: *“Dân biết, dân bàn, dân làm, dân kiểm tra.”*`,
  },
];

export const roomQuizzes: RoomQuiz[] = [
  {
    roomNumber: 1,
    questions: [
      {
        question: "Sau thống nhất đất nước, tên nước chính thức là gì?",
        options: [
          "Việt Nam Dân chủ Cộng hòa",
          "Cộng hòa xã hội chủ nghĩa Việt Nam",
          "Liên bang Việt Nam",
          "Cộng hòa Việt Nam",
        ],
        correctAnswer: 1,
      },
      {
        question: "Đại hội nào khởi xướng Đổi mới, nhấn mạnh phát huy dân chủ?",
        options: ["Đại hội V", "Đại hội VI (1986)", "Đại hội VII", "Đại hội VIII"],
        correctAnswer: 1,
      },
      {
        question: "Dân chủ muốn bền vững cần gắn với điều gì?",
        options: [
          "Tập quán địa phương",
          "Kỷ luật, kỷ cương & pháp luật (thể chế hóa)",
          "Phong tục truyền thống",
          "Tình cảm xã hội",
        ],
        correctAnswer: 1,
      },
    ],
  },
  {
    roomNumber: 2,
    questions: [
      {
        question: "Dân chủ xã hội chủ nghĩa ở Việt Nam có bản chất là gì?",
        options: [
          "Dân chủ do cá nhân lãnh đạo",
          "Dân chủ dựa trên quyền lực của Đảng",
          "Dân chủ do nhân dân làm chủ, quyền lực thuộc về nhân dân",
          "Dân chủ dựa vào giai cấp tư sản",
        ],
        correctAnswer: 2,
      },
      {
        question: "Dân chủ gián tiếp được thực hiện thông qua cơ quan nào?",
        options: ["Chính phủ", "Quốc hội và Hội đồng nhân dân", "Các tổ chức xã hội", "Cơ quan hành pháp"],
        correctAnswer: 1,
      },
      {
        question:
          'Cơ chế "Đảng lãnh đạo – Nhà nước quản lý – Nhân dân làm chủ" thể hiện điều gì?',
        options: [
          "Cơ cấu tổ chức nhà nước",
          "Nguyên tắc phân quyền",
          "Cơ chế vận hành của nền dân chủ xã hội chủ nghĩa",
          "Mối quan hệ giữa ba quyền lập pháp, hành pháp, tư pháp",
        ],
        correctAnswer: 2,
      },
    ],
  },
  {
    roomNumber: 3,
    questions: [
      {
        question: '"Thượng tôn pháp luật" trong Nhà nước pháp quyền nghĩa là gì?',
        options: [
          "Luật phục tùng cơ quan hành pháp",
          "Pháp luật giữ vị trí tối thượng trong điều chỉnh quan hệ xã hội",
          "Địa phương tự quyết theo lệ làng",
          "Đảng quyết định thay pháp luật",
        ],
        correctAnswer: 1,
      },
      {
        question: "Ở Việt Nam, quyền lực nhà nước được tổ chức như thế nào?",
        options: [
          "Phân lập cứng ba quyền, không phối hợp",
          "Thống nhất quyền lực, có phân công – phối hợp – kiểm soát giữa lập pháp, hành pháp, tư pháp",
          "Tập trung tuyệt đối vào hành pháp",
          "Ủy quyền cho tư nhân",
        ],
        correctAnswer: 1,
      },
      {
        question: "Phương châm giám sát xã hội do nhân dân thực hiện là:",
        options: [
          "Dân hỏi – Đảng trả lời",
          "Dân góp – dân kiến nghị",
          '"Dân biết, dân bàn, dân làm, dân kiểm tra."',
          "Dân phản ánh qua mạng xã hội",
        ],
        correctAnswer: 2,
      },
    ],
  },
];
