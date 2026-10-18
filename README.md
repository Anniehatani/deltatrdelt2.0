# Delta Travel 2.0

Website đặt tour du lịch và nghỉ dưỡng cao cấp tại Việt Nam.

## Giới thiệu
Delta Travel cung cấp các gói tour du lịch chất lượng cao khám phá các điểm đến hàng đầu: Hạ Long, Đà Nẵng, Phú Quốc, Sa Pa, Đà Lạt, Miền Tây,... với giao diện hiện đại, tối ưu trải nghiệm người dùng và quy trình đặt tour nhanh chóng.

## Tính năng nổi bật
1. **Giao diện & Trải nghiệm:**
   - Thiết kế hiện đại, responsive mượt mà trên Desktop, Tablet và Mobile.
   - Tìm kiếm & bộ lọc tour thông minh theo điểm đến, ngân sách và ngày khởi hành.
   - Xem chi tiết lịch trình tour từng ngày, dịch vụ bao gồm/không bao gồm.
   - Đặt tour và thanh toán nhanh chóng (hỗ trợ chuyển khoản VietQR tự động xuất vé điện tử E-Ticket).
   - Danh sách tour yêu thích (Wishlist) và tra cứu lịch sử đơn hàng.

2. **Hệ thống Tài khoản Thành viên (100% Frontend - localStorage):**
   - Đăng ký tài khoản mới với đầy đủ kiểm tra định dạng Email, Số điện thoại VN 10 số, độ dài mật khẩu và kiểm tra trùng lặp.
   - Đăng nhập an toàn bằng Email hoặc Số điện thoại.
   - Tính năng Quên mật khẩu & Đổi mật khẩu mới.
   - Quản lý hồ sơ người dùng: xem thống kê đơn hàng, ngày tham gia, cập nhật thông tin cá nhân.
   - **Tự động điền (Auto-fill)** thông tin khách hàng vào Form đặt tour khi đã đăng nhập và lưu vết đơn hàng theo tài khoản.

3. **Trợ lý Ảo Chatbot AI tích hợp Google Gemini API thật:**
   - Sử dụng `fetch()` thuần với `async/await` gửi yêu cầu trực tiếp đến Google Gemini API (model `gemini-2.5-flash`).
   - Tự động nạp toàn bộ dữ liệu tour, lịch trình chi tiết, bảng giá, voucher giảm giá và chính sách từ `data.js` vào `systemInstruction`.
   - Ghi nhớ ngữ cảnh trò chuyện (`chatHistory`).
   - Giao diện bong bóng chat nổi hiện đại, hiệu ứng 3 dấu chấm nhảy (Typing loading), gợi ý câu hỏi nhanh (Quick Replies), và hỗ trợ định dạng Rich Text.
   - Bắt lỗi thông minh và hướng dẫn cấu hình API Key khi chưa thiết lập.

## Cấu trúc thư mục & Tệp tin
```
├── assets/
│   ├── css/
│   │   ├── base.css            # Biến màu, typography, layout chung
│   │   ├── header.css          # Topbar & Navbar
│   │   ├── hero-search.css     # Hero banner & thanh tìm kiếm
│   │   ├── tour-cards.css      # Thẻ hiển thị tour & danh sách
│   │   ├── itinerary.css       # Modal lịch trình tour
│   │   ├── checkout.css        # Modal đặt tour, thanh toán QR, vé điện tử
│   │   ├── sections.css        # Các section giới thiệu, cẩm nang, đánh giá
│   │   ├── responsive.css      # Tối ưu hiển thị đa thiết bị
│   │   ├── auth.css            # Giao diện Đăng ký, Đăng nhập & Hồ sơ tài khoản
│   │   └── chatbot.css         # Giao diện Widget Chatbot AI
│   ├── images/                 # Hình ảnh tour và banner
│   └── js/
│       ├── data.js             # Cơ sở dữ liệu Tour, Điểm đến & Voucher
│       ├── main.js             # Bộ điều khiển chính (render, filter, checkout, print)
│       ├── auth.js             # Logic Đăng ký / Đăng nhập / Hồ sơ (localStorage)
│       └── chatbot.js          # Logic Chatbot AI kết nối Google Gemini API
├── .gitignore                  # Bỏ qua tệp tin rác hệ thống
├── index.html                  # Giao diện chính của website
└── README.md                   # Tài liệu hướng dẫn dự án
```

## Hướng dẫn thiết lập API Key cho Chatbot AI
Để kích hoạt tính năng trò chuyện AI thật:
1. Mở file [assets/js/chatbot.js](file:///c:/Users/LeVanAn/Downloads/web/assets/js/chatbot.js).
2. Tại dòng 1, điền Google Gemini API Key của bạn vào biến:
   ```javascript
   const AI_API_KEY = "YOUR_GEMINI_API_KEY_HERE";
   ```
3. Lưu file và mở lại trình duyệt để bắt đầu trò chuyện với Delta AI!

## Hướng dẫn chạy thử nghiệm
Chỉ cần mở file `index.html` trực tiếp trên trình duyệt hoặc sử dụng Live Server (VS Code).
- **Tài khoản dùng thử sẵn:**
  - Email: `an.levan@gmail.com`
  - Mật khẩu: `password123`
