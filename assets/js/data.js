/**
 * DELTA TRAVEL - CƠ SỞ DỮ LIỆU FRONTEND (DATA.JS)
 * -------------------------------------------------------------
 * File này lưu trữ danh mục Tour du lịch, chi tiết lịch trình từng ngày,
 * bảng giá, dịch vụ bao gồm/không bao gồm, chính sách và mã ưu đãi voucher.
 * Thiết kế chuẩn cấu trúc Object/Array để sinh viên dễ hiểu và thao tác.
 */

// Danh sách các Tour du lịch nổi bật của Delta Travel
const TOURS_DATA = [
  {
    id: "DL-HL01",
    title: "Tour Du Thuyền 5 Sao Vịnh Hạ Long - Vịnh Lan Hạ",
    slug: "ha-long-lan-ha-cruise",
    region: "north", // north: Miền Bắc, central: Miền Trung, south: Miền Nam
    regionName: "Miền Bắc",
    image: "assets/images/halong.png",
    duration: "3N2Đ",
    daysCount: 3,
    departure: "Hà Nội (Xe Limousine đón tận nơi)",
    transport: "Du thuyền 5* + Limousine VIP",
    originalPrice: 4890000,
    price: 3890000,
    rating: 4.9,
    reviewsCount: 184,
    badge: "Flash Sale -20%",
    isFlashSale: true,
    availableSeats: 8,
    highlights: [
      "Trải nghiệm du thuyền 5 sao đẳng cấp quốc tế trên vịnh Lan Hạ",
      "Chèo thuyền Kayak xuyên qua hang động bí ẩn, tắm biển bãi Ba Trái Đào",
      "Tiệc trà hoàng hôn Sunset Party và tiệc Buffet hải sản tươi sống",
      "Khám phá làng chài cổ Việt Hải & Đảo Cát Bà thơ mộng"
    ],
    itinerary: [
      {
        day: 1,
        title: "Hà Nội - Vịnh Hạ Long - Check-in Du Thuyền 5 Sao - Vịnh Lan Hạ",
        morning: "08:00 Xe Limousine đón quý khách tại khu vực Phố Cổ Hà Nội, khởi hành đi Tuần Châu qua cao tốc Hải Phòng hiện đại.",
        afternoon: "12:00 Quý khách làm thủ tục lên du thuyền 5 sao, thưởng thức Welcome Drink và nhận phòng ban công hướng vịnh. Thưởng thức bữa trưa hải sản tươi sống khi tàu tiến vào vịnh Lan Hạ.",
        evening: "15:30 Trải nghiệm chèo thuyền Kayak tại khu vực Ba Trái Đào. 17:30 Tham gia tiệc hoàng hôn Sunset Party trên Sundeck. 19:00 Dùng bữa tối lãng mạn phong cách hoàng gia, sau đó câu mực đêm cùng thủy thủ đoàn."
      },
      {
        day: 2,
        title: "Làng Cổ Việt Hải - Vườn Quốc Gia Cát Bà - Trải Nghiệm Văn Hóa",
        morning: "06:30 Tập Thái Cực Quyền (Tai Chi) ngắm bình minh trên vịnh. Dùng điểm tâm sáng nhẹ nhàng. 08:30 Cano đưa đoàn khám phá Làng Việt Hải nép mình giữa thung lũng đá vôi.",
        afternoon: "12:00 Trải nghiệm đạp xe xuyên rừng nguyên sinh Cát Bà, mát-xa chân bằng cá tự nhiên. Thưởng thức bữa trưa đậm đà phong vị bản địa tại nhà hàng sinh thái.",
        evening: "16:00 Tự do tắm biển, thư giãn tại bể sục Jacuzzi bốn mùa trên du thuyền. 19:00 Bữa tiệc nướng BBQ hải sản cao cấp và giao lưu âm nhạc Acoustic trên boong tàu."
      },
      {
        day: 3,
        title: "Hang Sáng Tối - Bữa Trưa Buffet - Tuần Châu - Hà Nội",
        morning: "06:30 Chào ngày mới với lớp yoga đón ánh nắng mai. Dùng bữa sáng buffet tự chọn thịnh soạn. 07:45 Khám phá Hang Sáng Tối bằng thuyền nan do cư dân địa phương chèo.",
        afternoon: "09:30 Về du thuyền hoàn tất thủ tục trả phòng. Thưởng thức bữa trưa sớm trong khi tàu nhẹ nhàng cập bến cảng Tuần Châu. 12:30 Xe đón đoàn về lại thủ đô Hà Nội.",
        evening: "15:30 Đến Hà Nội, trả khách tại điểm hẹn. Hướng dẫn viên Delta Travel chia tay và hẹn gặp lại quý khách trong những hành trình tiếp theo!"
      }
    ],
    inclusions: [
      "Xe đưa đón Limousine khứ hồi Hà Nội - Hạ Long máy lạnh cao cấp",
      "Phòng nghỉ hạng sang 5 sao trên du thuyền (có ban công riêng)",
      "05 bữa ăn chính theo tiêu chuẩn hải sản cao cấp + 02 bữa sáng buffet",
      "Thuyền nan, thuyền kayak tham quan hang động theo lịch trình",
      "Vé tham quan tất cả các thắng cảnh trong chương trình",
      "Hướng dẫn viên song ngữ Việt - Anh nhiệt huyết, chu đáo",
      "Bảo hiểm du lịch trọn gói mức bồi thường 100.000.000đ/vụ"
    ],
    exclusions: [
      "Thuế VAT 8% (nếu quý khách có nhu cầu xuất hóa đơn đỏ)",
      "Chi phí phòng đơn riêng (nếu đi 1 mình có phụ thu)",
      "Đồ uống gọi thêm trong các bữa ăn (rượu vang, cocktail, bia lon...)",
      "Tiền tip (tiền bồi dưỡng) cho tài xế và thủy thủ đoàn (tùy tâm)"
    ]
  },
  {
    id: "DL-DN02",
    title: "Thiên Đường Miền Trung: Đà Nẵng - Cầu Vàng - Phố Cổ Hội An",
    slug: "da-nang-hoi-an-ba-na",
    region: "central",
    regionName: "Miền Trung",
    image: "assets/images/danang.png",
    duration: "4N3Đ",
    daysCount: 4,
    departure: "TP. Hồ Chí Minh / Hà Nội (Vé máy bay)",
    transport: "Máy bay khứ hồi + Xe du lịch đời mới",
    originalPrice: 5490000,
    price: 4490000,
    rating: 4.95,
    reviewsCount: 260,
    badge: "Bán chạy nhất",
    isFlashSale: true,
    availableSeats: 5,
    highlights: [
      "Check-in kỳ quan Cầu Vàng Bàn Tay Khổng Lồ tại đỉnh Bà Nà Hills",
      "Thả hoa đăng lung linh và dạo bước phố cổ Hội An về đêm",
      "Thưởng ngoạn Rừng Dừa Bảy Mẫu chèo thuyền thúng xoay điệu nghệ",
      "Khách sạn 4 sao sát biển Mỹ Khê - bãi biển đẹp nhất hành tinh"
    ],
    itinerary: [
      {
        day: 1,
        title: "Đón sân bay - Bán đảo Sơn Trà - Ngắm Cầu Rồng phun lửa",
        morning: "Xe và HDV Delta Travel đón quý khách tại Sân bay Quốc tế Đà Nẵng, xe đưa đoàn về nhận phòng khách sạn 4 sao sát biển Mỹ Khê.",
        afternoon: "14:30 Khởi hành đi Bán Đảo Sơn Trà viếng Chùa Linh Ứng Bãi Bụt - nơi có tượng Phật Bà Quan Âm cao 67m ngắm toàn cảnh vịnh Đà Nẵng.",
        evening: "18:00 Thưởng thức bữa tối đặc sản bánh tráng cuốn thịt heo hai đầu da và mỳ Quảng. Tối dạo xem Cầu Rồng phun lửa và phun nước rực rỡ."
      },
      {
        day: 2,
        title: "Quần thể Du Lịch Bà Nà Hills - Cầu Vàng Trên Mây - Fantasy Park",
        morning: "07:30 Khởi hành lên khu du lịch Bà Nà Hills. Trải nghiệm tuyến cáp treo đạt 4 kỷ lục Guinness thế giới. Dạo bước ngắm mây ngàn tại Cầu Vàng Bàn Tay Khổng Lồ.",
        afternoon: "12:00 Thưởng thức bữa trưa đại tiệc Buffet hơn 100 món quốc tế tại Làng Pháp. Vui chơi không giới hạn tại công viên Fantasy Park.",
        evening: "16:30 Xuống cáp treo, xe đưa đoàn về khách sạn nghỉ ngơi, tự do tắm biển Mỹ Khê cát trắng mịn màng. Dùng cơm tối hải sản ven bờ biển."
      },
      {
        day: 3,
        title: "Rừng Dừa Bảy Mẫu - Khám Phá Di Sản Phố Cổ Hội An",
        morning: "08:00 Tham quan Ngũ Hành Sơn huyền bí, khám phá Động Huyền Không và làng đá mỹ nghệ Non Nước.",
        afternoon: "11:30 Thưởng thức bữa trưa. Đến Rừng Dừa Bảy Mẫu Cẩm Thanh, trải nghiệm đi thuyền thúng múa nước điêu luyện của các nghệ nhân sông nước.",
        evening: "16:30 Tiến vào Phố Cổ Hội An: Chùa Cầu, Nhà Cổ Phùng Hưng, Hội Quán Phúc Kiến. Ăn tối cao lầu Hội An, thả đèn hoa đăng trên dòng sông Hoài thơ mộng."
      },
      {
        day: 4,
        title: "Chợ Hàn Đặc Sản - Tạm Biệt Thành Phố Đáng Sống",
        morning: "08:00 Ăn sáng buffet tại khách sạn. Đoàn tự do tắm hồ bơi vô cực hoặc ghé Chợ Hàn mua sắm đặc sản: chả bò Đà Nẵng, mực một nắng, tré miền Trung.",
        afternoon: "11:30 Trả phòng khách sạn. Xe đưa quý khách ra Sân bay Đà Nẵng làm thủ tục bay về lại điểm xuất phát.",
        evening: "Về đến điểm xuất phát, kết thúc chương trình du lịch miền Trung ngập tràn kỷ niệm cùng Delta Travel!"
      }
    ],
    inclusions: [
      "Vé máy bay khứ hồi (đã bao gồm 20kg hành lý ký gửi + 7kg xách tay)",
      "Khách sạn 4 sao cao cấp trung tâm/sát biển (2 khách/phòng)",
      "Vé cáp treo Bà Nà Hills & vé tham quan trọn gói các điểm",
      "Thuyền thúng Rừng Dừa Bảy Mẫu & đèn hoa đăng sông Hoài",
      "Các bữa ăn chính tiêu chuẩn 180.000đ/suất + 1 bữa Buffet Bà Nà 350.000đ/suất",
      "Bảo hiểm du lịch nội địa trách nhiệm cao 120.000.000đ"
    ],
    exclusions: [
      "Bảo tàng sáp tại Bà Nà Hills (tùy chọn)",
      "Chi tiêu cá nhân ngoài chương trình (giặt là, minibar...)",
      "Phụ thu phòng đơn cho khách đi 1 mình",
      "Thuế GTGT 8%"
    ]
  },
  {
    id: "DL-PQ03",
    title: "Đảo Ngọc Phú Quốc - Cáp Treo Hòn Thơm - Grand World Không Ngủ",
    slug: "phu-quoc-hon-thom-grand-world",
    region: "south",
    regionName: "Miền Nam",
    image: "assets/images/phuquoc.png",
    duration: "3N2Đ",
    daysCount: 3,
    departure: "TP. Hồ Chí Minh / Hà Nội (Vé máy bay)",
    transport: "Vé máy bay + Cano vượt biển + Xe VIP",
    originalPrice: 5990000,
    price: 4690000,
    rating: 4.88,
    reviewsCount: 312,
    badge: "Ưu đãi Vàng",
    isFlashSale: true,
    availableSeats: 12,
    highlights: [
      "Trải nghiệm tuyến cáp treo vượt biển dài nhất thế giới sang Hòn Thơm",
      "Cano cao tốc lặn ngắm rạn san hô tự nhiên tại quần đảo An Thới",
      "Chiêm ngưỡng Show diễn thực cảnh 'Sắc Màu Venice' triệu đô tại Grand World",
      "Nghỉ dưỡng Resort 5 sao có bãi biển riêng và hồ bơi vô cực"
    ],
    itinerary: [
      {
        day: 1,
        title: "Đón Sân Bay Phú Quốc - Grand World - Show Sắc Màu Venice",
        morning: "Máy bay hạ cánh sân bay Phú Quốc, xe VIP đón đoàn về nhận phòng tại Resort 5 sao mặt biển. Quý khách nghỉ ngơi và tắm biển riêng.",
        afternoon: "14:30 Đến Grand World 'Thành phố không ngủ': Check-in dòng sông Venice thơ mộng, Công viên nghệ thuật đương đại Urban Park, Nhà Tre Bamboo Legend kỳ vĩ.",
        evening: "18:30 Dùng bữa tối ẩm thực hải sản Phú Quốc. 21:00 Thưởng thức siêu show thực cảnh mặt nước hoành tráng 'Sắc Màu Venice' với âm thanh, ánh sáng và nhạc nước đỉnh cao."
      },
      {
        day: 2,
        title: "Cano Vượt Biển Khám Phá 4 Đảo - Cáp Treo Vượt Biển Hòn Thơm",
        morning: "08:00 Lên cano cao tốc lướt sóng ra quần đảo An Thới: Hòn Mây Rút Trong, Hòn Gầm Ghì. Lặn ngắm san hô bằng ống thở và kính lặn chuyên dụng (chụp ảnh ván SUP miễn phí).",
        afternoon: "12:00 Thưởng thức bữa trưa hải sản tươi sống trên đảo. Trải nghiệm cáp treo vượt biển Hòn Thơm chiêm ngưỡng toàn cảnh biển đảo ngọc từ trên cao.",
        evening: "17:30 Ngắm hoàng hôn trứ danh tại Sunset Sanato với các tác phẩm điêu khắc voi bay nghệ thuật. Dùng bữa tối và tự do dạo Chợ đêm Phú Quốc."
      },
      {
        day: 3,
        title: "Vườn Tiêu Suối Đá - Nhà Thùng Nước Mắm - Tạm Biệt Đảo Ngọc",
        morning: "08:00 Dùng bữa sáng buffet tại resort. Ghé thăm Lò sản xuất rượu sim rừng, Nhà thùng nước mắm truyền thống Phú Quốc và trang trại nuôi cấy ngọc trai.",
        afternoon: "11:30 Làm thủ tục trả phòng resort. Xe đưa đoàn ra Sân bay Phú Quốc làm thủ tục đáp chuyến bay về lại điểm xuất phát.",
        evening: "Đoàn về đến nhà an toàn, kết thúc kỳ nghỉ dưỡng đảo ngọc tuyệt vời cùng Delta Travel!"
      }
    ],
    inclusions: [
      "Vé máy bay khứ hồi (hãng Vietnam Airlines hoặc Vietjet Air)",
      "02 đêm nghỉ tại Resort 5 sao mặt biển sang trọng",
      "Vé cáp treo vượt biển Hòn Thơm 2 chiều & công viên nước Aquatopia",
      "Cano cao tốc tham quan 4 đảo + Kính lặn, áo phao, chụp ảnh flycam SUP",
      "Tất cả các bữa ăn trong chương trình theo tiêu chuẩn cao cấp",
      "Bảo hiểm du lịch mức 100.000.000đ"
    ],
    exclusions: [
      "Dịch vụ đi bộ dưới đáy biển Seawalker (chi phí tự túc)",
      "Chi tiêu cá nhân ngoài thực đơn chương trình",
      "Phòng đơn nếu quý khách đi một mình"
    ]
  },
  {
    id: "DL-DL04",
    title: "Thành Phố Ngàn Hoa: Đà Lạt - Hồ Tuyền Lâm - Săn Mây Cầu Đất",
    slug: "da-lat-tuyen-lam-cau-dat",
    region: "central",
    regionName: "Tây Nguyên",
    image: "assets/images/dalat.png",
    duration: "3N2Đ",
    daysCount: 3,
    departure: "TP. Hồ Chí Minh / Hà Nội",
    transport: "Xe Limousine phòng nằm cao cấp",
    originalPrice: 3200000,
    price: 2590000,
    rating: 4.9,
    reviewsCount: 195,
    badge: "Hot Deal",
    isFlashSale: false,
    availableSeats: 15,
    highlights: [
      "Trải nghiệm săn mây bồng bềnh và ngắm bình minh trên Đồi Chè Cầu Đất",
      "Check-in Hồ Tuyền Lâm thơ mộng & Thiền Viện Trúc Lâm thanh tịnh",
      "Khám phá Thung lũng hoa cẩm tú cầu rực rỡ và Vườn hoa hồng cổ",
      "Thưởng thức tiệc nướng BBQ thịt rừng giữa không khí se lạnh Đà Lạt"
    ],
    itinerary: [
      {
        day: 1,
        title: "Khởi Hành Đến Đà Lạt - Thác Datanla - Hồ Tuyền Lâm",
        morning: "Xe Limousine phòng nằm đón quý khách tại điểm hẹn, vượt đèo Bảo Lộc thơ mộng lên xứ sở sương mù Đà Lạt. Đến nơi nhận phòng khách sạn phong cách cổ điển Pháp.",
        afternoon: "14:00 Tham quan Thác Datanla, trải nghiệm hệ thống máng trượt xuyên rừng thông dài nhất Đông Nam Á. Tiếp tục đến Hồ Tuyền Lâm và viếng Thiền Viện Trúc Lâm.",
        evening: "18:00 Thưởng thức bữa tối Lẩu Gà Lá É tao nhã trứ danh. Buổi tối tự do thưởng thức sữa đậu nành nóng hổi và bánh tráng nướng chợ đêm Đà Lạt."
      },
      {
        day: 2,
        title: "Săn Biển Mây Cầu Đất - Nông Trại Cún Puppy Farm - Vườn Cẩm Tú Cầu",
        morning: "05:00 Xe đưa đoàn đi Đồi Chè Cầu Đất đón bình minh và săn biển mây bay bồng bềnh kỳ ảo. Check-in tuabin quạt gió khổng lồ.",
        afternoon: "11:30 Dùng bữa trưa buffet rau không giới hạn Leguda. Chiều ghé thăm Puppy Farm chơi cùng gần 100 chú cún đáng yêu, hái dâu tây sinh thái tại vườn.",
        evening: "18:30 Tiệc nướng BBQ ngoài trời với rượu vang Đà Lạt, ngắm thành phố lên đèn lấp lánh tựa bầu trời sao."
      },
      {
        day: 3,
        title: "Ga Đà Lạt - Quảng Trường Lâm Viên - Chợ Mua Sắm Đặc Sản",
        morning: "08:00 Tham quan Ga Xe Lửa Cổ Đà Lạt với kiến trúc Đông Dương độc đáo. Check-in Nụ hoa Atiso và Bông hoa Dã Quỳ tại Quảng Trường Lâm Viên.",
        afternoon: "11:30 Trả phòng khách sạn. Quý khách tự do mua sắm mứt hoa quả sấy dẻo, trà atiso, rau củ quả tươi sạch. Xe khởi hành về lại TP. Hồ Chí Minh.",
        evening: "20:00 Về đến điểm xuất phát, chia tay và hẹn gặp lại quý khách trên các nẻo đường tiếp theo."
      }
    ],
    inclusions: [
      "Xe Limousine phòng nằm đôi/đơn êm ái hiện đại khứ hồi",
      "Khách sạn 3 - 4 sao ngay trung tâm chợ Đà Lạt",
      "Vé vào cổng tất cả các điểm tham quan theo hành trình",
      "Ăn uống trọn gói các bữa theo chương trình (có lẩu gà lá é, buffet rau)",
      "Hướng dẫn viên chuyên nghiệp, hài hước, hỗ trợ chụp ảnh nghệ thuật"
    ],
    exclusions: [
      "Vé máng trượt Datanla (tùy chọn)",
      "Chi phí hái dâu tây mua mang về",
      "Phụ thu phòng đơn riêng",
      "VAT 8%"
    ]
  },
  {
    id: "DL-SP05",
    title: "Sa Pa Mờ Sương - Chinh Phục Đỉnh Fansipan - Bản Cát Cát",
    slug: "sapa-fansipan-cat-cat",
    region: "north",
    regionName: "Miền Bắc",
    image: "assets/images/sapa.png",
    duration: "3N2Đ",
    daysCount: 3,
    departure: "Hà Nội (Xe Cabin Tình Yêu)",
    transport: "Xe Cabin cao cấp + Tàu hỏa Mường Hoa",
    originalPrice: 3990000,
    price: 3190000,
    rating: 4.92,
    reviewsCount: 178,
    badge: "Yêu thích",
    isFlashSale: false,
    availableSeats: 10,
    highlights: [
      "Chạm tay vào cột mốc 3.143m trên Đỉnh Fansipan - Nóc nhà Đông Dương",
      "Đi tàu hỏa leo núi Mường Hoa băng qua thung lũng lúa chín vàng óng",
      "Hóa thân thành chàng trai cô gái dân tộc tại Bản Cát Cát xinh đẹp",
      "Thưởng thức Thắng Cố, Cá Hồi Sa Pa và lẩu nấm ôn đới bổ dưỡng"
    ],
    itinerary: [
      {
        day: 1,
        title: "Hà Nội - Sa Pa Núi Rừng Tây Bắc - Bản Làng Cát Cát",
        morning: "06:30 Xe cabin cao cấp đón quý khách tại Hà Nội, băng qua đường cao tốc Nội Bài - Lào Cai ngắm núi non trập trùng. Trưa đến thị xã Sa Pa, nhận phòng khách sạn.",
        afternoon: "14:00 Đi bộ tham quan Bản Cát Cát - nơi sinh sống của đồng bào người Mông. Chiêm ngưỡng guồng nước khổng lồ, thác Tiên Sa và những nếp nhà gỗ mộc mạc.",
        evening: "18:30 Ăn tối với lẩu cá tầm Sa Pa tươi ngon. Tối dạo Nhà Thờ Đá Sa Pa, giao lưu phiên Chợ Tình nét văn hóa đặc trưng cuối tuần."
      },
      {
        day: 2,
        title: "Chinh Phục Đỉnh Fansipan 3.143m - Đèo Ô Quy Hồ - Cổng Trời",
        morning: "07:30 Trải nghiệm tàu hỏa leo núi Mường Hoa sang Sun World Fansipan Legend. Lên tuyến cáp treo 3 dây hiện đại, leo 600 bậc đá chạm mốc Nóc Nhà Đông Dương.",
        afternoon: "12:00 Dùng bữa trưa buffet tại nhà hàng Fansipan. Chiều xe đưa đoàn chinh phục một trong 'Tứ đại đỉnh đèo' Ô Quy Hồ ngắm biển mây lúc hoàng hôn tuyệt đẹp.",
        evening: "19:00 Dùng bữa tối đặc sản lợn bản nướng than hồng, nhâm nhi rượu táo mèo ấm cúng."
      },
      {
        day: 3,
        title: "Check-in Núi Hàm Rồng - Tạm Biệt Sa Pa Về Hà Nội",
        morning: "08:00 Đi bộ khám phá khu du lịch Núi Hàm Rồng: Vườn Lan, Cổng Trời 1, Cổng Trời 2, Sân Mây ngắm toàn cảnh thị xã Sa Pa chìm trong sương mù.",
        afternoon: "11:30 Trả phòng, mua sắm đặc sản măng khô, nấm hương rừng, thịt trâu gác bếp. 13:30 Lên xe về lại Hà Nội.",
        evening: "19:30 Về đến trung tâm Hà Nội, kết thúc chuyến du xuân Sa Pa giàu cảm xúc cùng Delta Travel!"
      }
    ],
    inclusions: [
      "Xe cabin cao cấp khứ hồi Hà Nội - Sa Pa giường nằm êm ái",
      "Khách sạn 3-4 sao trung tâm view núi Fansipan hùng vĩ",
      "Tất cả các vé tham quan: Bản Cát Cát, Tàu Mường Hoa, Hàm Rồng",
      "Các bữa ăn chính tiêu chuẩn đặc sản vùng cao",
      "Hướng dẫn viên bản địa am hiểu văn hóa và phong tục tập quán"
    ],
    exclusions: [
      "Vé cáp treo Fansipan (quý khách đăng ký bổ sung theo nhu cầu)",
      "Trang phục dân tộc thuê chụp ảnh (50.000đ/bộ)",
      "Thuế VAT 8%"
    ]
  },
  {
    id: "DL-MT06",
    title: "Sông Nước Miền Tây: Cần Thơ - Chợ Nổi Cái Răng - Rừng Tràm Trà Sư",
    slug: "mien-tay-cai-rang-tra-su",
    region: "south",
    regionName: "Miền Tây",
    image: "assets/images/mientay.png",
    duration: "2N1Đ",
    daysCount: 2,
    departure: "TP. Hồ Chí Minh",
    transport: "Xe du lịch máy lạnh + Xuồng ba lá",
    originalPrice: 2190000,
    price: 1690000,
    rating: 4.85,
    reviewsCount: 142,
    badge: "Giá siêu tốt",
    isFlashSale: false,
    availableSeats: 18,
    highlights: [
      "Trải nghiệm nét sinh hoạt độc đáo tại Chợ Nổi Cái Răng lớn nhất miền Tây",
      "Ngồi xuồng ba lá lướt nhẹ trên thảm bèo xanh mướt Rừng Tràm Trà Sư",
      "Thưởng thức trái cây miệt vườn tươi rói và lắng nghe Đờn ca tài tử Nam Bộ",
      "Ăn trưa cá lóc nướng trui, lẩu mắm cá linh bông điên điển đậm đà"
    ],
    itinerary: [
      {
        day: 1,
        title: "TP. Hồ Chí Minh - Mỹ Tho - Bến Tre - Tây Đô Cần Thơ",
        morning: "07:00 Xe đón khách tại TP.HCM khởi hành đi Tiền Giang. Đến Mỹ Tho, lên thuyền dạo sông Tiền, ngắm cù lao Long - Lân - Quy - Phụng.",
        afternoon: "12:00 Ăn trưa đặc sản cá tai tượng chiên xù cuốn bánh tráng. Đi xuồng chèo len lỏi rạch dừa nước, uống trà mật ong hoa nhãn, nghe đờn ca tài tử. Di chuyển về Cần Thơ.",
        evening: "18:30 Lên Du Thuyền Cần Thơ ăn tối ngắm cầu Cần Thơ lung linh về đêm. Tự do dạo bến Ninh Kiều và Cầu Tình Yêu."
      },
      {
        day: 2,
        title: "Chợ Nổi Cái Răng - Rừng Tràm Trà Sư - Về Lại TP.HCM",
        morning: "05:30 Sáng sớm lên thuyền tham quan Chợ Nổi Cái Răng. Thưởng thức tô hủ tiếu nóng hổi và ly cà phê sữa đá đậm chất sông nước ngay trên ghe bồng bềnh.",
        afternoon: "09:30 Khởi hành đi Rừng Tràm Trà Sư (An Giang). Lên xuồng ba lá lướt trên thảm bèo cám xanh rờn, ngắm các loài chim quý hiếm. Dùng cơm trưa dân dã đồng quê.",
        evening: "14:30 Khởi hành về lại TP.HCM, trên đường dừng chân mua đặc sản nem Lai Vung, bánh pía Sóc Trăng. 19:30 Về đến nơi, hẹn gặp lại quý khách!"
      }
    ],
    inclusions: [
      "Xe du lịch đời mới máy lạnh suốt hành trình",
      "Khách sạn 4 sao trung tâm TP Cần Thơ gần Bến Ninh Kiều",
      "Thuyền máy, xuồng chèo tham quan chợ nổi và rừng tràm",
      "Tất cả các bữa ăn theo thực đơn đặc sản Tây Nam Bộ",
      "Bảo hiểm du lịch trách nhiệm mức 80.000.000đ"
    ],
    exclusions: [
      "Các dịch vụ giải trí cá nhân phát sinh",
      "Tiền bồi dưỡng tài xế và hướng dẫn viên",
      "Hóa đơn VAT 8%"
    ]
  }
];

// Danh sách các mã giảm giá (Voucher) áp dụng cho thanh toán tour
const VOUCHERS_DATA = [
  {
    code: "DELTA10",
    description: "Giảm ngay 10% tổng hóa đơn (Tối đa 1.000.000đ)",
    discountType: "percent",
    discountValue: 10,
    maxDiscount: 1000000,
    minOrderValue: 2000000
  },
  {
    code: "HE2026",
    description: "Mã mùa hè: Giảm trực tiếp 500.000đ cho đơn từ 3.000.000đ",
    discountType: "fixed",
    discountValue: 500000,
    minOrderValue: 3000000
  },
  {
    code: "VIPTOUR",
    description: "Ưu đãi khách hàng VIP: Giảm 15% tổng tiền (Tối đa 1.500.000đ)",
    discountType: "percent",
    discountValue: 15,
    maxDiscount: 1500000,
    minOrderValue: 5000000
  },
  {
    code: "BANMOI",
    description: "Chào bạn mới: Giảm 200.000đ cho mọi đơn đặt tour",
    discountType: "fixed",
    discountValue: 200000,
    minOrderValue: 1500000
  }
];

// Bảng giá dịch vụ gia tăng tùy chọn khi đặt tour
const ADDON_SERVICES = {
  singleRoom: {
    name: "Phụ thu phòng đơn riêng tư",
    price: 500000,
    unit: "phòng"
  },
  airportShuttle: {
    name: "Đưa đón sân bay VIP 2 chiều",
    price: 300000,
    unit: "chuyến"
  },
  premiumInsurance: {
    name: "Bảo hiểm du lịch cao cấp (mức 200tr)",
    price: 150000,
    unit: "khách"
  }
};

// Điểm đến nổi bật hiển thị ở mục Điểm Đến Hấp Dẫn
const DESTINATIONS_DATA = [
  { name: "Vịnh Hạ Long", count: "18+ Tours", image: "assets/images/halong.png", region: "north" },
  { name: "Đà Nẵng - Hội An", count: "25+ Tours", image: "assets/images/danang.png", region: "central" },
  { name: "Phú Quốc Đảo Ngọc", count: "15+ Tours", image: "assets/images/phuquoc.png", region: "south" },
  { name: "Đà Lạt Mộng Mơ", count: "20+ Tours", image: "assets/images/dalat.png", region: "central" },
  { name: "Sa Pa Sương Mù", count: "12+ Tours", image: "assets/images/sapa.png", region: "north" },
  { name: "Sông Nước Miền Tây", count: "14+ Tours", image: "assets/images/mientay.png", region: "south" }
];
