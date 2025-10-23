import type { ExhibitData, RoomQuiz } from "@/types/museum";

export const museumData: ExhibitData[] = [
  {
    id: "room1-exhibit1",
    title: "Dòng thời gian hình thành & phát triển",
    position: { x: 300, y: 300 },
    roomNumber: 1,
    image: "/room1-timeline.jpg",
    content: `**1945-1976:** Sau Cách mạng Tháng Tám 1945, nước ta xác lập chế độ dân chủ nhân dân; đến năm 1976 thống nhất đất nước, tên nước là Cộng hòa xã hội chủ nghĩa Việt Nam.

**1986 – Bước ngoặt Đổi mới:** Đại hội VI (1986) đề ra đường lối đổi mới toàn diện, nhấn mạnh phát huy dân chủ như động lực phát triển.

**Quan điểm hiện nay:** Dân chủ được xác định là đặc trưng của CNXH Việt Nam (do nhân dân làm chủ), và được đưa vào mục tiêu tổng quát "Dân giàu, nước mạnh, dân chủ, công bằng, văn minh".`,
  },
  {
    id: "room1-exhibit2",
    title: "Dân chủ: mục tiêu, bản chất, động lực",
    position: { x: 300, y: 600 },
    roomNumber: 1,
    content: `**Mục tiêu:** Dân chủ là một thành tố trong mục tiêu tổng quát của cách mạng Việt Nam.

**Bản chất:** Do nhân dân làm chủ, quyền lực thuộc về nhân dân.

**Động lực:** Dân chủ phát huy sức mạnh của nhân dân, của toàn dân tộc, tạo xung lực cho phát triển.

**Gắn với pháp luật:** Dân chủ gắn kỷ luật, kỷ cương và phải được thể chế hóa bằng pháp luật.

"NƯỚC TA LÀ NƯỚC DÂN CHỦ... Nói tóm lại quyền lực và lực lượng đều ở dân." - Hồ Chí Minh`,
  },
  {
    id: "room1-exhibit3",
    title: "Cơ chế thực hiện dân chủ",
    position: { x: 300, y: 900 },
    roomNumber: 1,
    content: `**Dân chủ gián tiếp (đại diện):** Nhân dân bầu ra Quốc hội – cơ quan quyền lực nhà nước cao nhất, nhiệm kỳ 5 năm.

**Dân chủ trực tiếp:** Nhân dân được thông tin về hoạt động của Nhà nước; được bàn bạc công việc Nhà nước và cộng đồng; được quyết định các vấn đề dân chủ ở cơ sở; kiểm tra, giám sát hoạt động cơ quan Nhà nước.`,
  },
  {
    id: "room1-exhibit4",
    title: "Liên hệ dân chủ ↔ nhà nước pháp quyền",
    position: { x: 700, y: 600 },
    roomNumber: 1,
    image: "/room1-relationship.jpg",
    content: `**Nhà nước pháp quyền:** Thượng tôn pháp luật, hướng tới phúc lợi cho mọi người, tạo điều kiện để cá nhân tự do – bình đẳng – phát huy năng lực.

**6 đặc điểm trọng tâm:**
1. Của dân – do dân – vì dân
2. Hiến pháp, pháp luật tối thượng
3. Thống nhất quyền lực kèm phân công – phối hợp – kiểm soát
4. Đảng Cộng sản Việt Nam lãnh đạo
5. Tôn trọng quyền con người
6. Tập trung dân chủ trong tổ chức bộ máy`,
  },

  {
    id: "room2-exhibit1",
    title: "Bản chất của nền dân chủ XHCN Việt Nam",
    position: { x: 1300, y: 300 },
    roomNumber: 2,
    image: "/room2-essence.jpg",
    content: `Dân chủ xã hội chủ nghĩa ở Việt Nam là nền dân chủ "do nhân dân làm chủ, quyền lực thuộc về nhân dân".

Dân chủ không chỉ là mục tiêu (dân giàu, nước mạnh, dân chủ, công bằng, văn minh), mà còn là động lực phát triển. Dân chủ gắn liền với pháp luật, kỷ luật và kỷ cương, được thể chế hóa và bảo đảm bằng Hiến pháp.

"Nước ta là nước dân chủ. Bao nhiêu lợi ích đều là vì dân, bao nhiêu quyền hạn đều là của dân... Nói tóm lại, quyền hành và lực lượng đều ở nơi dân." - Hồ Chí Minh`,
  },
  {
    id: "room2-exhibit2",
    title: "Hai hình thức dân chủ: Trực tiếp và Gián tiếp",
    position: { x: 1300, y: 600 },
    roomNumber: 2,
    content: `**Dân chủ gián tiếp (dân chủ đại diện):**
• Nhân dân ủy quyền cho các cơ quan đại diện (Quốc hội, Hội đồng nhân dân các cấp)
• Quốc hội là cơ quan quyền lực nhà nước cao nhất, hoạt động theo nhiệm kỳ 5 năm

**Dân chủ trực tiếp:**
• Nhân dân trực tiếp tham gia quản lý xã hội: bàn bạc, góp ý, giám sát, biểu quyết
• Hình thức thể hiện: "Dân biết, dân bàn, dân làm, dân kiểm tra"`,
  },
  {
    id: "room2-exhibit3",
    title: "Đảng lãnh đạo – Nhân dân làm chủ – Nhà nước quản lý",
    position: { x: 1300, y: 900 },
    roomNumber: 2,
    image: "/room2-triangle.jpg",
    content: `**Đảng lãnh đạo:** đảm bảo định hướng chính trị đúng đắn, lãnh đạo nhà nước và xã hội bằng đường lối, chủ trương.

**Nhà nước quản lý:** sử dụng pháp luật làm công cụ để điều hành xã hội, bảo đảm kỷ cương, công bằng.

**Nhân dân làm chủ:** là chủ thể quyền lực, thực hiện quyền làm chủ thông qua bầu cử, giám sát, phản biện, tham gia xây dựng chính sách.`,
  },

  {
    id: "room3-exhibit1",
    title: "Khái niệm & giá trị cốt lõi",
    position: { x: 2300, y: 300 },
    roomNumber: 3,
    image: "/room3-concept.jpg",
    content: `Nhà nước pháp quyền là mô hình nhà nước thượng tôn pháp luật, hướng tới phúc lợi cho mọi người, tạo điều kiện để cá nhân tự do, bình đẳng, phát huy năng lực.

Ở Việt Nam: "Xây dựng Nhà nước pháp quyền Việt Nam của dân, do dân, vì dân; quản lý xã hội bằng pháp luật; mọi cơ quan, tổ chức, cán bộ, công chức, công dân có nghĩa vụ chấp hành Hiến pháp và pháp luật."`,
  },
  {
    id: "room3-exhibit2",
    title: "6 đặc điểm cốt lõi",
    position: { x: 2300, y: 600 },
    roomNumber: 3,
    content: `1. **Của dân, do dân, vì dân:** Nhà nước do nhân dân lao động làm chủ
2. **Hiến pháp & pháp luật tối thượng:** Pháp luật ở vị trí tối thượng
3. **Quyền lực thống nhất + phân công – phối hợp – kiểm soát**
4. **Đảng Cộng sản Việt Nam lãnh đạo**
5. **Tôn trọng quyền con người:** Con người là chủ thể, trung tâm của phát triển
6. **Nguyên tắc tập trung dân chủ trong tổ chức bộ máy**`,
  },
  {
    id: "room3-exhibit3",
    title: "Cơ chế vận hành",
    position: { x: 2300, y: 900 },
    roomNumber: 3,
    content: `**Thượng tôn Hiến pháp & pháp luật:** Mọi cơ quan, tổ chức, cán bộ, công chức, công dân phải chấp hành.

**Phân công quyền lực:** Lập pháp – hành pháp – tư pháp phối hợp & kiểm soát lẫn nhau.

**Mối quan hệ:** Đảng định hướng chính trị → Nhà nước cụ thể hóa bằng pháp luật → Nhân dân thực hành quyền làm chủ và giám sát.`,
  },
  {
    id: "room3-exhibit4",
    title: "Liên hệ thực tiễn & yêu cầu hiện nay",
    position: { x: 2700, y: 600 },
    roomNumber: 3,
    image: "/room3-practice.jpg",
    content: `**Yêu cầu:**
• Hoàn thiện thể chế kinh tế thị trường định hướng XHCN
• Xây dựng Đảng trong sạch, vững mạnh
• Xây dựng Nhà nước pháp quyền vững mạnh
• Tôn trọng, bảo đảm quyền con người
• Đề cao trách nhiệm giải trình, minh bạch, kiểm soát quyền lực`,
  },

  {
    id: "room4-exhibit1",
    title: "Xây dựng thể chế kinh tế thị trường",
    position: { x: 3300, y: 300 },
    roomNumber: 4,
    content: `Phát huy dân chủ gắn liền với việc xây dựng thể chế kinh tế thị trường định hướng XHCN – một nền kinh tế nhiều thành phần, vận hành theo quy luật thị trường nhưng có định hướng xã hội.

**Mục tiêu:**
• Mọi chủ thể kinh tế được tự do kinh doanh hợp pháp
• Nhà nước điều tiết bằng pháp luật, chiến lược và quy hoạch
• Thúc đẩy công khai, minh bạch, trách nhiệm giải trình`,
  },
  {
    id: "room4-exhibit2",
    title: "Xây dựng Đảng trong sạch, vững mạnh",
    position: { x: 3300, y: 600 },
    roomNumber: 4,
    image: "/room4-party.jpg",
    content: `Đảng Cộng sản Việt Nam là nhân tố quyết định thành công của dân chủ xã hội chủ nghĩa.

**Cần tiếp tục:**
• Xây dựng Đảng trong sạch, vững mạnh về chính trị, tư tưởng, tổ chức và đạo đức
• Thực hiện nghiêm cơ chế tự phê bình và phê bình
• Phát huy vai trò tiên phong, gương mẫu của cán bộ, đảng viên`,
  },
  {
    id: "room4-exhibit3",
    title: "Xây dựng Nhà nước pháp quyền vững mạnh",
    position: { x: 3300, y: 900 },
    roomNumber: 4,
    content: `**Trọng tâm:**
• Hoàn thiện hệ thống pháp luật đồng bộ, công khai, minh bạch
• Cải cách thể chế và phương thức hoạt động của bộ máy nhà nước
• Xây dựng đội ngũ cán bộ, công chức có năng lực, đạo đức
• Phòng chống tham nhũng, lãng phí
• Đặt nhân dân ở vị trí trung tâm của quản lý xã hội`,
  },
  {
    id: "room4-exhibit4",
    title: "Phát huy vai trò các tổ chức chính trị – xã hội",
    position: { x: 3700, y: 600 },
    roomNumber: 4,
    image: "/room4-organizations.jpg",
    content: `Các tổ chức Mặt trận Tổ quốc, Công đoàn, Đoàn Thanh niên, Hội Liên hiệp Phụ nữ là cầu nối giữa Đảng – Nhà nước – Nhân dân.

**Vai trò:**
• Đại diện cho tiếng nói, nguyện vọng của các tầng lớp nhân dân
• Tham gia giám sát, phản biện xã hội
• Vận động nhân dân thực hiện chủ trương, chính sách`,
  },

  {
    id: "room5-exhibit1",
    title: "Nhiệm vụ cấp bách và lâu dài",
    position: { x: 4300, y: 300 },
    roomNumber: 5,
    image: "/room5-anticorruption.jpg",
    content: `Phòng, chống tham nhũng, lãng phí, thực hành tiết kiệm là nhiệm vụ cấp bách, thường xuyên và lâu dài.

**Các định hướng:**
• Hoàn thiện thể chế để ngăn ngừa tham nhũng
• Tăng cường công khai, minh bạch trong quản lý tài chính công
• Nâng cao trách nhiệm giải trình của cán bộ, công chức
• Xây dựng văn hóa liêm chính trong Đảng và toàn xã hội

"Cán bộ là cái gốc của mọi công việc." - Hồ Chí Minh`,
  },
  {
    id: "room5-exhibit2",
    title: "Kiểm soát quyền lực và trách nhiệm giải trình",
    position: { x: 4300, y: 600 },
    roomNumber: 5,
    content: `**Cơ chế kiểm soát:**
• Kiểm soát ở cả ba nhánh: lập pháp, hành pháp, tư pháp
• Giám sát của nhân dân, Mặt trận Tổ quốc và báo chí
• Mọi quyền hạn phải gắn với trách nhiệm và giải trình công khai
• Không ai, không tổ chức nào đứng trên pháp luật

Chính phủ điện tử, chuyển đổi số, dữ liệu mở đang trở thành công cụ quan trọng giúp minh bạch hóa quản trị công.`,
  },
  {
    id: "room5-exhibit3",
    title: "Xây dựng đội ngũ cán bộ liêm chính",
    position: { x: 4300, y: 900 },
    roomNumber: 5,
    content: `**Tập trung vào:**
• Nâng cao bản lĩnh chính trị, phẩm chất đạo đức
• Đào tạo – bồi dưỡng – tuyển chọn cán bộ dựa trên năng lực
• Công khai hóa tiêu chuẩn đánh giá, thi tuyển, bổ nhiệm
• Thiết lập cơ chế thưởng – phạt rõ ràng
• Xây dựng môi trường hành chính liêm chính, chuyên nghiệp`,
  },
  {
    id: "room5-exhibit4",
    title: "Bảo vệ chế độ, củng cố niềm tin",
    position: { x: 4700, y: 600 },
    roomNumber: 5,
    image: "/room5-trust.jpg",
    content: `Phòng, chống tham nhũng không chỉ là bảo vệ pháp luật, mà là bảo vệ chế độ, bảo vệ lòng tin của nhân dân.

Khi nhân dân tin tưởng vào sự công bằng và minh bạch, nền tảng chính trị – xã hội mới bền vững.

"Dân biết, dân bàn, dân làm, dân kiểm tra, dân giám sát, dân thụ hưởng" là chuẩn mực dân chủ toàn diện.`,
  },

  {
    id: "room6-exhibit1",
    title: "Đổi mới thể chế – Nền tảng cho dân chủ",
    position: { x: 5300, y: 300 },
    roomNumber: 6,
    content: `Đổi mới thể chế là quá trình cải tiến cơ cấu, phương thức và quy tắc vận hành của Nhà nước.

**Các định hướng:**
• Hoàn thiện pháp luật phù hợp với kinh tế thị trường
• Tách bạch rõ quyền lực – trách nhiệm – quyền lợi
• Cải cách hành chính toàn diện, hướng đến "chính phủ số"
• Xây dựng thể chế minh bạch, khuyến khích người dân tham gia giám sát`,
  },
  {
    id: "room6-exhibit2",
    title: "Chuyển đổi số và chính phủ điện tử",
    position: { x: 5300, y: 600 },
    roomNumber: 6,
    image: "/room6-digital.jpg",
    content: `Chuyển đổi số là bước nhảy vọt trong thực hiện dân chủ và pháp quyền.

**Lợi ích:**
• Chính phủ điện tử giúp người dân tiếp cận dịch vụ công nhanh, minh bạch
• Dữ liệu mở tăng quyền giám sát của công dân
• AI và Big Data hỗ trợ phát hiện sai phạm, phân tích chính sách

"Chuyển đổi số là nền tảng để Nhà nước phục vụ, không phải cai trị."`,
  },
  {
    id: "room6-exhibit3",
    title: "Minh bạch và trách nhiệm giải trình",
    position: { x: 5300, y: 900 },
    roomNumber: 6,
    content: `Minh bạch và trách nhiệm giải trình là hai trụ cột đảm bảo niềm tin vào Nhà nước pháp quyền.

**Yêu cầu:**
• Mọi quyết định, chính sách, chi tiêu công phải được công khai
• Cán bộ, công chức chịu trách nhiệm trước dân và pháp luật
• Công nghệ số hỗ trợ công khai hóa thông tin
• Tăng cường kiểm toán, thanh tra độc lập`,
  },
  {
    id: "room6-exhibit4",
    title: "Xây dựng nền hành chính phục vụ",
    position: { x: 5700, y: 600 },
    roomNumber: 6,
    image: "/room6-service.jpg",
    content: `Nhà nước trong kỷ nguyên mới là người phục vụ và kiến tạo môi trường phát triển.

**Trọng tâm:**
• Cải cách thủ tục hành chính: giảm giấy tờ, số hóa hồ sơ
• Phát triển đội ngũ công chức 4.0
• Lấy sự hài lòng của người dân làm thước đo hiệu quả
• Tạo hệ sinh thái đổi mới sáng tạo`,
  },

  {
    id: "room7-exhibit1",
    title: "Chấp hành pháp luật về phòng, chống tham nhũng",
    position: { x: 6300, y: 300 },
    roomNumber: 7,
    image: "/room7-law.jpg",
    content: `Công dân có trách nhiệm chấp hành nghiêm chỉnh pháp luật về phòng, chống tham nhũng.

**Nghĩa vụ:**
• Hiểu biết pháp luật, không tham gia, tiếp tay hoặc bao che
• Nói không với hối lộ, môi giới hối lộ
• Tuân thủ pháp luật để bảo vệ cá nhân và giữ gìn kỷ cương xã hội

"Pháp luật nghiêm minh là tấm khiên bảo vệ công lý – và nhân dân là người giữ tấm khiên đó."`,
  },
  {
    id: "room7-exhibit2",
    title: "Phát hiện, phản ánh và tố cáo",
    position: { x: 6300, y: 600 },
    roomNumber: 7,
    content: `Công dân có quyền và trách nhiệm phát hiện, phản ánh, tố cáo hành vi tham nhũng.

**Khi tố cáo:**
• Nêu rõ họ tên, địa chỉ, nội dung tố cáo
• Cung cấp chứng cứ rõ ràng
• Gửi đến đúng cơ quan có thẩm quyền

Người tố cáo được bảo vệ khỏi trả thù, trù dập, đồng thời được biểu dương nếu góp phần phát hiện hành vi tham nhũng.`,
  },
  {
    id: "room7-exhibit3",
    title: "Tham gia giám sát và kiến nghị",
    position: { x: 6300, y: 900 },
    roomNumber: 7,
    image: "/room7-supervision.jpg",
    content: `Công dân có nghĩa vụ hợp tác, giúp đỡ cơ quan chức năng trong phòng, chống tham nhũng.

**Cách thức:**
• Thông qua Ban Thanh tra nhân dân, Mặt trận Tổ quốc, báo chí
• Giám sát việc thực hiện pháp luật
• Phản ánh những bất cập
• Kiến nghị hoàn thiện pháp luật

"Nhân dân không đứng ngoài cuộc – mà là người đồng hành, giám sát và kiến tạo Nhà nước liêm chính."`,
  },
  {
    id: "room8-exhibit1",
    title: "Nội dung sẽ được cập nhật",
    position: { x: 7300, y: 600 },
    roomNumber: 8,
    content: `Phòng 8 đang được xây dựng nội dung. Vui lòng quay lại sau.`,
  },
  {
    id: "room9-exhibit1",
    title: "Nội dung sẽ được cập nhật",
    position: { x: 8300, y: 600 },
    roomNumber: 9,
    content: `Phòng 9 đang được xây dựng nội dung. Vui lòng quay lại sau.`,
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
