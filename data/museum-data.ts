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

  // ⚖️ PHÒNG 4: DÂN CHỦ TRONG THỰC TIỄN XÂY DỰNG XHCN
  {
    id: "room4-exhibit1",
    title: "Quyền làm chủ được mở rộng",
    position: { x: 3300, y: 300 },
    roomNumber: 4,
    content: `Dân chủ ngày càng được thể chế hóa, mở rộng trên mọi lĩnh vực – chính trị, kinh tế, văn hóa, xã hội.`,
  },
  {
    id: "room4-exhibit2",
    title: "Ý thức và trách nhiệm công dân",
    position: { x: 3300, y: 600 },
    roomNumber: 4,
    content: `Nhân dân ngày càng có ý thức làm chủ, tinh thần trách nhiệm với đất nước, tham gia quản lý xã hội.`,
  },
  {
    id: "room4-exhibit3",
    title: "Dân chủ và pháp luật",
    position: { x: 3300, y: 900 },
    roomNumber: 4,
    content: `Dân chủ phải gắn liền với pháp luật, kỷ cương; mọi quyền dân chủ đều được luật hóa và bảo đảm thực thi.`,
  },
  {
    id: "room4-exhibit4",
    title: "Khó khăn, thách thức hiện nay",
    position: { x: 3700, y: 600 },
    roomNumber: 4,
    content: `Kinh tế kém phát triển, hậu quả chiến tranh; tiêu cực xã hội, “diễn biến hòa bình”; dân chủ ở một số nơi còn hình thức, thiếu hiệu quả.`,
  },

  // 🏛 PHÒNG 5: NHÀ NƯỚC PHÁP QUYỀN XÃ HỘI CHỦ NGHĨA – QUAN NIỆM
  {
    id: "room5-exhibit1",
    title: "Khái niệm chung",
    position: { x: 4300, y: 300 },
    roomNumber: 5,
    content: `Nhà nước pháp quyền là mô hình **thượng tôn pháp luật**, đảm bảo tự do, bình đẳng và phúc lợi cho nhân dân.`,
  },
  {
    id: "room5-exhibit2",
    title: "Đặc điểm cơ bản",
    position: { x: 4300, y: 600 },
    roomNumber: 5,
    content: `- Có **phân công, phối hợp và kiểm soát quyền lực**.  
- Cơ quan nhà nước hoạt động minh bạch, có trách nhiệm.  
- Mọi công dân, tổ chức đều phải tuân thủ pháp luật nghiêm minh.`,
  },
  {
    id: "room5-exhibit3",
    title: "Mục tiêu hướng tới",
    position: { x: 4300, y: 900 },
    roomNumber: 5,
    content: `Nhà nước phục vụ nhân dân, đảm bảo công bằng xã hội, tôn trọng và bảo vệ quyền con người.`,
  },
  {
    id: "room5-exhibit4",
    title: "Nhận thức của Đảng",
    position: { x: 4700, y: 600 },
    roomNumber: 5,
    content: `“Xây dựng Nhà nước pháp quyền Việt Nam của dân, do dân, vì dân” – quyền lực thống nhất, có kiểm soát giữa lập pháp, hành pháp, tư pháp.`,
  },

  // ⚖️ PHÒNG 6: ĐẶC ĐIỂM NHÀ NƯỚC PHÁP QUYỀN XHCN VIỆT NAM
  {
    id: "room6-exhibit1",
    title: "Do nhân dân làm chủ",
    position: { x: 5300, y: 300 },
    roomNumber: 6,
    content: `Nhà nước của dân, do dân, vì dân – chịu sự giám sát của nhân dân.`,
  },
  {
    id: "room6-exhibit2",
    title: "Thượng tôn pháp luật",
    position: { x: 5300, y: 600 },
    roomNumber: 6,
    content: `Hoạt động dựa trên Hiến pháp và pháp luật – pháp luật giữ vị trí tối thượng trong điều chỉnh xã hội.`,
  },
  {
    id: "room6-exhibit3",
    title: "Thống nhất quyền lực, có kiểm soát",
    position: { x: 5300, y: 900 },
    roomNumber: 6,
    content: `Ba quyền lập pháp – hành pháp – tư pháp có **phân công, phối hợp và kiểm soát**.`,
  },
  {
    id: "room6-exhibit4",
    title: "Đảng lãnh đạo",
    position: { x: 5700, y: 600 },
    roomNumber: 6,
    content: `Nhà nước XHCN do Đảng Cộng sản Việt Nam lãnh đạo, bảo đảm định hướng XHCN.`,
  },
  {
    id: "room6-exhibit5",
    title: "Tôn trọng quyền con người",
    position: { x: 5700, y: 900 },
    roomNumber: 6,
    content: `Con người là trung tâm của phát triển; nhân dân có quyền bầu, bãi miễn, giám sát đại biểu.`,
  },

  // 🚀 PHÒNG 7: PHÁT HUY DÂN CHỦ HIỆN NAY
  {
    id: "room7-exhibit1",
    title: "Cơ sở kinh tế",
    position: { x: 6300, y: 300 },
    roomNumber: 7,
    content: `Hoàn thiện thể chế kinh tế thị trường định hướng XHCN; bảo hộ quyền sở hữu; cải cách hành chính; phát triển đồng bộ các yếu tố thị trường.`,
  },
  {
    id: "room7-exhibit2",
    title: "Xây dựng Đảng vững mạnh",
    position: { x: 6300, y: 600 },
    roomNumber: 7,
    content: `Đảng là điều kiện tiên quyết bảo đảm dân chủ; phải tự đổi mới, tự chỉnh đốn, thực hiện tập trung dân chủ, tự phê bình và phê bình.`,
  },
  {
    id: "room7-exhibit3",
    title: "Nhà nước pháp quyền vững mạnh",
    position: { x: 6300, y: 900 },
    roomNumber: 7,
    content: `Nhà nước phải đảm bảo quyền con người, tự do, danh dự và lợi ích hợp pháp của công dân bằng pháp luật.`,
  },
  {
    id: "room7-exhibit4",
    title: "Vai trò tổ chức chính trị – xã hội",
    position: { x: 6700, y: 600 },
    roomNumber: 7,
    content: `Đổi mới phương thức hoạt động, tăng vai trò giám sát, phản biện, bảo vệ quyền lợi nhân dân, xây dựng khối đại đoàn kết toàn dân.`,
  },
  {
    id: "room7-exhibit5",
    title: "Giám sát & phản biện xã hội",
    position: { x: 6700, y: 900 },
    roomNumber: 7,
    content: `Công khai, minh bạch, lắng nghe ý kiến nhân dân, nâng cao dân trí, văn hóa pháp luật.`,
  },

  // ⚖️ PHÒNG 8: XÂY DỰNG VÀ HOÀN THIỆN NHÀ NƯỚC PHÁP QUYỀN XHCN
  {
    id: "room8-exhibit1",
    title: "Dưới sự lãnh đạo của Đảng",
    position: { x: 7300, y: 300 },
    roomNumber: 8,
    content: `Nhà nước mang bản chất giai cấp công nhân, gắn bó chặt chẽ với dân tộc và nhân dân.`,
  },
  {
    id: "room8-exhibit2",
    title: "Cải cách thể chế",
    position: { x: 7300, y: 600 },
    roomNumber: 8,
    content: `Kiện toàn tổ chức Quốc hội, cải cách hành chính, giảm thủ tục phiền hà, nâng cao hiệu quả quản lý.`,
  },
  {
    id: "room8-exhibit3",
    title: "Xây dựng đội ngũ cán bộ, công chức",
    position: { x: 7300, y: 900 },
    roomNumber: 8,
    content: `Cán bộ phải có bản lĩnh chính trị, phẩm chất đạo đức, năng lực; có cơ chế loại bỏ người yếu kém, vi phạm.`,
  },
  {
    id: "room8-exhibit4",
    title: "Phòng chống tham nhũng, lãng phí",
    position: { x: 7700, y: 600 },
    roomNumber: 8,
    content: `Hoàn thiện thể chế, bảo vệ người tố cáo, xử lý nghiêm vi phạm; toàn Đảng, toàn dân cùng thực hành tiết kiệm.`,
  },

  // 🕊️ PHÒNG 9: Ý NGHĨA & TỔNG KẾT
  {
    id: "room9-exhibit1",
    title: "Thành tựu",
    position: { x: 8300, y: 300 },
    roomNumber: 9,
    content: `Dân chủ XHCN và Nhà nước pháp quyền XHCN là hai trụ cột của chế độ ta, bảo đảm nhân dân thật sự làm chủ.`,
  },
  {
    id: "room9-exhibit2",
    title: "Bản chất ưu việt",
    position: { x: 8300, y: 600 },
    roomNumber: 9,
    content: `Kết hợp hài hòa giữa dân chủ và kỷ cương, pháp quyền và nhân văn, phát huy sức mạnh toàn dân.`,
  },
  {
    id: "room9-exhibit3",
    title: "Ý nghĩa lịch sử",
    position: { x: 8300, y: 900 },
    roomNumber: 9,
    content: `Thể hiện con đường phát triển đúng đắn của Việt Nam: vì con người, công bằng, tự do, tiến bộ.`,
  },
  {
    id: "room9-exhibit4",
    title: "Định hướng tương lai",
    position: { x: 8700, y: 600 },
    roomNumber: 9,
    content: `Tiếp tục phát huy dân chủ, hoàn thiện nhà nước pháp quyền, xây dựng đất nước phát triển bền vững theo con đường XHCN.`,
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
        options: [
          "Đại hội V",
          "Đại hội VI (1986)",
          "Đại hội VII",
          "Đại hội VIII",
        ],
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
        options: [
          "Chính phủ",
          "Quốc hội và Hội đồng nhân dân",
          "Các tổ chức xã hội",
          "Cơ quan hành pháp",
        ],
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
        question:
          '"Thượng tôn pháp luật" trong Nhà nước pháp quyền nghĩa là gì?',
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
  {
    roomNumber: 4,
    questions: [
      {
        question:
          "Dân chủ xã hội chủ nghĩa được phát huy dựa trên nền tảng kinh tế nào?",
        options: [
          "Kinh tế tập trung bao cấp",
          "Kinh tế tự do tuyệt đối",
          "Kinh tế thị trường định hướng xã hội chủ nghĩa",
          "Kinh tế tự phát",
        ],
        correctAnswer: 2,
      },
      {
        question:
          "Đảng Cộng sản Việt Nam giữ vai trò gì trong nền dân chủ XHCN?",
        options: [
          "Lãnh đạo và định hướng chính trị",
          "Quản lý hành chính",
          "Thực thi pháp luật",
          "Kiểm soát tư pháp",
        ],
        correctAnswer: 0,
      },
      {
        question: "Cơ sở pháp lý cao nhất của Nhà nước pháp quyền là gì?",
        options: [
          "Nghị quyết Trung ương",
          "Hiến pháp",
          "Quyết định hành chính",
          "Văn bản hướng dẫn",
        ],
        correctAnswer: 1,
      },
    ],
  },

  {
    roomNumber: 5,
    questions: [
      {
        question:
          "Vì sao phòng, chống tham nhũng được xem là nhiệm vụ cấp bách và lâu dài?",
        options: [
          "Vì là vấn đề tạm thời",
          "Vì gắn với việc bảo vệ bản chất trong sạch, minh bạch của chế độ XHCN",
          "Vì chỉ liên quan tài chính công",
          "Vì thuộc ngành tư pháp",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Cơ chế nào giúp kiểm soát quyền lực hiệu quả trong Nhà nước pháp quyền?",
        options: [
          "Phân lập tuyệt đối 3 quyền",
          "Phân công – phối hợp – kiểm soát giữa lập pháp, hành pháp, tư pháp và nhân dân giám sát",
          "Tập trung vào một cơ quan duy nhất",
          "Ủy quyền cho cá nhân lãnh đạo",
        ],
        correctAnswer: 1,
      },
      {
        question: '"Không ai đứng trên pháp luật" thể hiện nguyên tắc gì?',
        options: [
          "Tập quyền",
          "Thượng tôn pháp luật",
          "Ủy quyền toàn phần",
          "Đặc quyền hành chính",
        ],
        correctAnswer: 1,
      },
    ],
  },

  {
    roomNumber: 6,
    questions: [
      {
        question: "Mục tiêu của đổi mới thể chế là gì?",
        options: [
          "Tập trung quyền lực vào hành pháp",
          "Tạo cơ chế vận hành minh bạch, phù hợp với thời đại, bảo đảm quyền làm chủ của nhân dân",
          "Giảm vai trò pháp luật",
          "Tăng thủ tục hành chính",
        ],
        correctAnswer: 1,
      },
      {
        question: "Chính phủ điện tử góp phần phát huy dân chủ bằng cách nào?",
        options: [
          "Giới hạn truy cập dữ liệu",
          "Minh bạch hóa thông tin và giúp người dân tham gia giám sát, phản ánh, đề xuất",
          "Giảm tương tác với người dân",
          "Tập trung hóa quy trình",
        ],
        correctAnswer: 1,
      },
      {
        question: "Trách nhiệm giải trình nghĩa là gì?",
        options: [
          "Báo cáo thành tích",
          "Giải thích công khai, chịu trách nhiệm trước dân về quyết định và hành động của mình",
          "Ủy quyền cho cấp dưới",
          "Công khai tài sản cá nhân",
        ],
        correctAnswer: 1,
      },
    ],
  },

  {
    roomNumber: 7,
    questions: [
      {
        question:
          "Trách nhiệm đầu tiên của công dân trong phòng, chống tham nhũng là gì?",
        options: [
          "Phát biểu ý kiến trên mạng xã hội",
          "Chấp hành nghiêm chỉnh pháp luật, không bao che hay tiếp tay cho tham nhũng",
          "Phê bình người khác",
          "Tuyên truyền không có căn cứ",
        ],
        correctAnswer: 1,
      },
      {
        question:
          "Khi phát hiện hành vi tham nhũng, công dân được phép làm gì?",
        options: [
          "Giữ im lặng để tránh rắc rối",
          "Tố cáo, phản ánh, báo tin cho cơ quan có thẩm quyền và được pháp luật bảo vệ",
          "Tự xử lý người vi phạm",
          "Đưa lên mạng xã hội",
        ],
        correctAnswer: 1,
      },
      {
        question: "Ban Thanh tra nhân dân có vai trò gì?",
        options: [
          "Giải quyết tố cáo",
          "Tiếp nhận phản ánh của nhân dân và kiến nghị cơ quan có thẩm quyền xem xét, xử lý",
          "Đại diện cho cơ quan hành pháp",
          "Chỉ đạo các cơ quan điều tra",
        ],
        correctAnswer: 1,
      },
    ],
  },
];
