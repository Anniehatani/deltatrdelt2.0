/**
 * DELTA TRAVEL - MAIN JAVASCRIPT CONTROLLER (main.js)
 * -------------------------------------------------------------
 * File này chứa toàn bộ logic xử lý phía Client:
 * 1. Khởi tạo & nạp dữ liệu Tours, Điểm đến
 * 2. Bộ lọc tìm kiếm & sắp xếp thông minh
 * 3. Đồng hồ đếm ngược Flash Sale
 * 4. Hệ thống danh sách Yêu thích (Wishlist)
 * 5. Hiển thị Modal chi tiết Lịch trình từng ngày
 * 6. Tính toán chi phí Tour theo thời gian thực (Real-time pricing & Voucher)
 * 7. Kiểm tra hợp lệ dữ liệu (Form Validation) & Xử lý thanh toán
 * 8. Xuất Vé Điện Tử (E-Ticket) & In ấn
 * 9. Quản lý / Tra cứu / Hủy đơn đặt chỗ từ localStorage
 */

// =============================================================================
// I. TRẠNG THÁI ỨNG DỤNG TOÀN CỤC (GLOBAL STATE)
// =============================================================================
const AppState = {
  activeRegion: "all",           // Vùng miền đang lọc ('all', 'north', 'central', 'south', 'sale')
  searchKeyword: "",             // Từ khóa tìm kiếm
  selectedPriceRange: "all",     // Khoảng giá ('all', 'under3m', '3to5m', 'above5m')
  sortCriteria: "default",       // Sắp xếp ('default', 'price-asc', 'price-desc', 'rating-desc')
  currentBookingTour: null,      // Tour đang được chọn để đặt
  appliedVoucher: null,          // Voucher đang áp dụng
  bookingReference: "",          // Mã đặt chỗ tạm tính
  selectedPaymentMethod: "qr"    // Phương thức thanh toán đang chọn
};

// =============================================================================
// II. KHỞI TẠO ỨNG DỤNG KHI TẢI TRANG (DOM CONTENT LOADED)
// =============================================================================
document.addEventListener("DOMContentLoaded", () => {
  initNavbarScroll();
  initFlashSaleTimer();
  renderDestinations();
  renderTourCards();
  initFilterEvents();
  initBookingListeners();
  updateWishlistCounter();
  initFloatingButtons();
  setMinimumDepartureDate();
});

// =============================================================================
// III. HIỆU ỨNG THANH ĐIỀU HƯỚNG & NÚT CUỘN TRANG
// =============================================================================
/**
 * Lắng nghe sự kiện cuộn trang để thêm hiệu ứng nền mờ cho Navbar
 */
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar-delta");
  const backToTopBtn = document.getElementById("backToTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 60) {
      navbar?.classList.add("scrolled");
      backToTopBtn?.classList.add("show");
    } else {
      navbar?.classList.remove("scrolled");
      backToTopBtn?.classList.remove("show");
    }
  });
}

/**
 * Xử lý nút cuộn nhanh lên đầu trang (Back to Top)
 */
function initFloatingButtons() {
  const backToTopBtn = document.getElementById("backToTopBtn");
  if (backToTopBtn) {
    backToTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
}

// =============================================================================
// IV. ĐỒNG HỒ ĐẾM NGƯỢC FLASH SALE (COUNTDOWN TIMER)
// =============================================================================
/**
 * Chạy đồng hồ đếm ngược giờ Flash Sale thực tế (kết thúc cuối ngày)
 */
function initFlashSaleTimer() {
  const hoursEl = document.getElementById("countdownHours");
  const minutesEl = document.getElementById("countdownMinutes");
  const secondsEl = document.getElementById("countdownSeconds");

  if (!hoursEl || !minutesEl || !secondsEl) return;

  function updateTimer() {
    const now = new Date();
    // Đếm ngược đến 23:59:59 của ngày hôm nay
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    const diff = endOfDay - now;
    if (diff <= 0) {
      hoursEl.textContent = "00";
      minutesEl.textContent = "00";
      secondsEl.textContent = "00";
      return;
    }

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    hoursEl.textContent = String(hours).padStart(2, "0");
    minutesEl.textContent = String(minutes).padStart(2, "0");
    secondsEl.textContent = String(seconds).padStart(2, "0");
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// =============================================================================
// V. HIỂN THỊ ĐIỂM ĐẾN NỔI BẬT
// =============================================================================
/**
 * Hiển thị các khối Điểm Đến Nổi Bật từ mảng DESTINATIONS_DATA
 */
function renderDestinations() {
  const container = document.getElementById("destinationsGrid");
  if (!container) return;

  container.innerHTML = DESTINATIONS_DATA.map(dest => `
    <div class="col-lg-4 col-md-6 mb-4">
      <div class="dest-card" onclick="filterByDestination('${dest.region}', '${dest.name}')">
        <img src="${dest.image}" alt="${dest.name}" loading="lazy">
        <div class="dest-overlay">
          <h4 class="dest-name">${dest.name}</h4>
          <span class="dest-tours-count"><i class="bi bi-geo-alt-fill"></i> ${dest.count}</span>
        </div>
      </div>
    </div>
  `).join("");
}

/**
 * Lọc nhanh tour khi người dùng bấm vào một thẻ Điểm Đến
 */
function filterByDestination(region, destName) {
  AppState.activeRegion = region;
  AppState.searchKeyword = "";

  // Đồng bộ lại các nút pill bộ lọc
  document.querySelectorAll(".filter-pill").forEach(pill => {
    pill.classList.toggle("active", pill.dataset.region === region);
  });

  renderTourCards();

  // Cuộn mượt xuống khu vực danh sách tour
  const toursSection = document.getElementById("toursSection");
  if (toursSection) {
    toursSection.scrollIntoView({ behavior: "smooth" });
  }

  showToast(`Đang hiển thị các tour tại ${destName}`, "info");
}

// =============================================================================
// VI. HIỂN THỊ & LỌC DANH SÁCH TOUR DU LỊCH (TOUR CARDS)
// =============================================================================
/**
 * Hàm định dạng tiền tệ Việt Nam Đồng (VND), ví dụ: 3890000 -> 3.890.000 đ
 */
function formatVND(amount) {
  if (isNaN(amount)) return "0 đ";
  return new Intl.NumberFormat("vi-VN").format(amount) + " đ";
}

/**
 * Lọc và kết xuất danh sách tour theo bộ lọc hiện tại
 */
function renderTourCards() {
  const container = document.getElementById("toursContainer");
  const countEl = document.getElementById("tourResultCount");
  if (!container) return;

  const wishlist = getWishlist();

  // 1. Lọc theo từ khóa, vùng miền, mức giá, flash sale
  let filtered = TOURS_DATA.filter(tour => {
    // Lọc theo vùng miền hoặc Flash sale tab
    if (AppState.activeRegion === "sale") {
      if (!tour.isFlashSale) return false;
    } else if (AppState.activeRegion !== "all") {
      if (tour.region !== AppState.activeRegion) return false;
    }

    // Lọc theo từ khóa tìm kiếm
    if (AppState.searchKeyword.trim() !== "") {
      const kw = AppState.searchKeyword.toLowerCase().trim();
      const matchTitle = tour.title.toLowerCase().includes(kw);
      const matchDeparture = tour.departure.toLowerCase().includes(kw);
      const matchRegion = tour.regionName.toLowerCase().includes(kw);
      if (!matchTitle && !matchDeparture && !matchRegion) return false;
    }

    // Lọc theo khoảng giá
    if (AppState.selectedPriceRange === "under3m") {
      if (tour.price >= 3000000) return false;
    } else if (AppState.selectedPriceRange === "3to5m") {
      if (tour.price < 3000000 || tour.price > 5000000) return false;
    } else if (AppState.selectedPriceRange === "above5m") {
      if (tour.price <= 5000000) return false;
    }

    return true;
  });

  // 2. Sắp xếp theo tiêu chí
  if (AppState.sortCriteria === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (AppState.sortCriteria === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else if (AppState.sortCriteria === "rating-desc") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // 3. Hiển thị số lượng kết quả
  if (countEl) {
    countEl.textContent = `Hiển thị ${filtered.length} / ${TOURS_DATA.length} tour`;
  }

  // 4. Nếu không tìm thấy tour phù hợp
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-12 py-5 text-center">
        <div class="mb-3">
          <i class="bi bi-search text-muted" style="font-size: 3.5rem;"></i>
        </div>
        <h4 class="fw-bold text-muted">Không tìm thấy tour phù hợp</h4>
        <p class="text-muted">Vui lòng thử thay đổi từ khóa hoặc điều chỉnh lại bộ lọc tìm kiếm.</p>
        <button class="btn btn-delta-primary mt-2" onclick="resetAllFilters()">
          <i class="bi bi-arrow-clockwise"></i> Đặt lại bộ lọc
        </button>
      </div>
    `;
    return;
  }

  // 5. Kết xuất HTML thẻ tour
  container.innerHTML = filtered.map(tour => {
    const isFav = wishlist.includes(tour.id);
    return `
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="tour-card">
          <!-- Ảnh đại diện tour -->
          <div class="tour-card-thumb">
            <img src="${tour.image}" alt="${tour.title}" loading="lazy">
            <div class="tour-badge-group">
              ${tour.isFlashSale ? `<span class="badge-tour badge-tour-sale"><i class="bi bi-lightning-fill"></i> ${tour.badge}</span>` : `<span class="badge-tour badge-tour-popular">${tour.badge}</span>`}
            </div>
            <button class="btn-wishlist ${isFav ? 'active' : ''}" onclick="toggleWishlist('${tour.id}', event)" title="Thêm vào yêu thích">
              <i class="bi ${isFav ? 'bi-heart-fill' : 'bi-heart'}"></i>
            </button>
            <div class="tour-thumb-meta">
              <span class="tour-duration-tag"><i class="bi bi-clock"></i> ${tour.duration}</span>
              <span class="tour-seats-tag">Còn ${tour.availableSeats} chỗ</span>
            </div>
          </div>

          <!-- Nội dung chi tiết thẻ -->
          <div class="tour-card-body">
            <div class="tour-code-row">
              <span class="tour-code">${tour.id}</span>
              <span class="tour-region"><i class="bi bi-geo-alt"></i> ${tour.regionName}</span>
            </div>

            <h3 class="tour-title" title="${tour.title}">${tour.title}</h3>

            <!-- Thông số tóm tắt -->
            <div class="tour-specs">
              <div class="tour-spec-item" title="Khởi hành từ: ${tour.departure}">
                <i class="bi bi-geo-fill"></i>
                <span>Điểm đón: ${tour.departure}</span>
              </div>
              <div class="tour-spec-item">
                <i class="bi bi-bus-front-fill"></i>
                <span>${tour.transport}</span>
              </div>
            </div>

            <!-- Đánh giá sao -->
            <div class="tour-rating-row">
              <div class="stars-group">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-half"></i>
              </div>
              <span class="rating-score">${tour.rating}</span>
              <span class="rating-reviews">(${tour.reviewsCount} đánh giá)</span>
            </div>

            <!-- Giá tour -->
            <div class="tour-price-box">
              <div class="tour-price-original">${formatVND(tour.originalPrice)}</div>
              <div class="tour-price-current">
                ${formatVND(tour.price)}
                <span class="tour-price-unit">/ khách</span>
              </div>
            </div>

            <!-- Nút thao tác -->
            <div class="tour-card-actions">
              <button class="btn-tour-detail" onclick="openItineraryModal('${tour.id}')">
                <i class="bi bi-calendar4-week"></i> Xem lịch trình
              </button>
              <button class="btn-tour-book" onclick="openBookingModal('${tour.id}')">
                <i class="bi bi-cart-check-fill"></i> Đặt ngay
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

// =============================================================================
// VII. SỰ KIỆN BỘ LỌC TÌM KIẾM (FILTER & SEARCH EVENTS)
// =============================================================================
function initFilterEvents() {
  // 1. Các nút Tab chọn Vùng miền
  const pills = document.querySelectorAll(".filter-pill");
  pills.forEach(pill => {
    pill.addEventListener("click", () => {
      pills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      AppState.activeRegion = pill.dataset.region || "all";
      renderTourCards();
    });
  });

  // 2. Select sắp xếp
  const sortSelect = document.getElementById("tourSortSelect");
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      AppState.sortCriteria = e.target.value;
      renderTourCards();
    });
  }

  // 3. Form tìm kiếm nhanh tại Banner Hero
  const searchForm = document.getElementById("heroSearchForm");
  if (searchForm) {
    searchForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const kwInput = document.getElementById("heroKeyword");
      const regionSelect = document.getElementById("heroRegion");
      const priceSelect = document.getElementById("heroPrice");

      AppState.searchKeyword = kwInput?.value || "";
      AppState.activeRegion = regionSelect?.value || "all";
      AppState.selectedPriceRange = priceSelect?.value || "all";

      // Đồng bộ lại nút pill
      pills.forEach(p => {
        p.classList.toggle("active", p.dataset.region === AppState.activeRegion);
      });

      renderTourCards();

      // Cuộn xuống danh sách tour
      document.getElementById("toursSection")?.scrollIntoView({ behavior: "smooth" });
    });
  }
}

/**
 * Đặt lại toàn bộ bộ lọc về mặc định
 */
function resetAllFilters() {
  AppState.activeRegion = "all";
  AppState.searchKeyword = "";
  AppState.selectedPriceRange = "all";
  AppState.sortCriteria = "default";

  const kwInput = document.getElementById("heroKeyword");
  const regionSelect = document.getElementById("heroRegion");
  const priceSelect = document.getElementById("heroPrice");
  const sortSelect = document.getElementById("tourSortSelect");

  if (kwInput) kwInput.value = "";
  if (regionSelect) regionSelect.value = "all";
  if (priceSelect) priceSelect.value = "all";
  if (sortSelect) sortSelect.value = "default";

  document.querySelectorAll(".filter-pill").forEach(p => {
    p.classList.toggle("active", p.dataset.region === "all");
  });

  renderTourCards();
  showToast("Đã đặt lại bộ lọc tìm kiếm", "info");
}

// =============================================================================
// VIII. HỆ THỐNG DANH SÁCH YÊU THÍCH (WISHLIST VỚI LOCALSTORAGE)
// =============================================================================
function getWishlist() {
  try {
    return JSON.parse(localStorage.getItem("delta_wishlist")) || [];
  } catch (e) {
    return [];
  }
}

function saveWishlist(list) {
  localStorage.setItem("delta_wishlist", JSON.stringify(list));
  updateWishlistCounter();
}

function updateWishlistCounter() {
  const count = getWishlist().length;
  const counterEls = document.querySelectorAll(".wishlist-counter");
  counterEls.forEach(el => {
    el.textContent = count;
  });
}

function toggleWishlist(tourId, event) {
  if (event) event.stopPropagation();

  let list = getWishlist();
  const index = list.indexOf(tourId);

  if (index > -1) {
    list.splice(index, 1);
    showToast("Đã xóa tour khỏi danh sách yêu thích", "warning");
  } else {
    list.push(tourId);
    showToast("Đã thêm tour vào danh sách yêu thích!", "success");
  }

  saveWishlist(list);
  renderTourCards();
}

/**
 * Mở Modal xem danh sách các tour đã yêu thích
 */
function openWishlistModal() {
  const list = getWishlist();
  const modalEl = document.getElementById("wishlistModal");
  const container = document.getElementById("wishlistContainer");
  if (!modalEl || !container) return;

  const favoriteTours = TOURS_DATA.filter(t => list.includes(t.id));

  if (favoriteTours.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5">
        <i class="bi bi-heart text-muted" style="font-size: 3rem;"></i>
        <h5 class="fw-bold text-muted mt-3">Chưa có tour yêu thích nào</h5>
        <p class="text-muted small">Hãy bấm vào biểu tượng trái tim trên các thẻ tour để lưu lại những chuyến đi bạn yêu thích!</p>
      </div>
    `;
  } else {
    container.innerHTML = favoriteTours.map(t => `
      <div class="d-flex align-items-center justify-content-between p-3 mb-2 bg-light rounded-3 border">
        <div class="d-flex align-items-center gap-3">
          <img src="${t.image}" alt="${t.title}" style="width: 70px; height: 50px; object-fit: cover; border-radius: 8px;">
          <div>
            <h6 class="mb-0 fw-bold">${t.title}</h6>
            <span class="text-danger fw-bold">${formatVND(t.price)}</span> &bull; <span class="text-muted small">${t.duration}</span>
          </div>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-sm btn-delta-primary" onclick="closeModal('wishlistModal'); openBookingModal('${t.id}')">Đặt ngay</button>
          <button class="btn btn-sm btn-outline-danger" onclick="toggleWishlist('${t.id}'); openWishlistModal()"><i class="bi bi-trash"></i></button>
        </div>
      </div>
    `).join("");
  }

  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  modal.show();
}

// =============================================================================
// IX. MODAL CHI TIẾT LỊCH TRÌNH TỪNG NGÀY (ITINERARY MODAL)
// =============================================================================
/**
 * Mở modal xem toàn bộ lịch trình chi tiết từng ngày của Tour
 */
function openItineraryModal(tourId) {
  const tour = TOURS_DATA.find(t => t.id === tourId);
  if (!tour) return;

  const modalEl = document.getElementById("itineraryModal");
  if (!modalEl) return;

  // 1. Điền thông tin cơ bản
  document.getElementById("itineraryModalTitle").textContent = tour.title;
  document.getElementById("itineraryHeroImg").src = tour.image;
  document.getElementById("itineraryCode").textContent = tour.id;
  document.getElementById("itineraryDuration").textContent = tour.duration;
  document.getElementById("itineraryDeparture").textContent = tour.departure;
  document.getElementById("itineraryTransport").textContent = tour.transport;
  document.getElementById("itineraryPrice").textContent = formatVND(tour.price);

  // 2. Điền Timeline lịch trình từng ngày
  const timelineEl = document.getElementById("itineraryTimeline");
  timelineEl.innerHTML = tour.itinerary.map(day => `
    <div class="itinerary-day-card">
      <div class="itinerary-day-badge">${day.day}</div>
      <h5 class="itinerary-day-title">Ngày ${day.day}: ${day.title}</h5>

      <!-- Buổi Sáng -->
      <div class="day-period-block">
        <div class="period-icon-wrap period-morning">
          <i class="bi bi-brightness-alt-high-fill"></i>
        </div>
        <div class="period-content">
          <h6>Buổi Sáng</h6>
          <p>${day.morning}</p>
        </div>
      </div>

      <!-- Buổi Chiều -->
      <div class="day-period-block">
        <div class="period-icon-wrap period-afternoon">
          <i class="bi bi-sun-fill"></i>
        </div>
        <div class="period-content">
          <h6>Buổi Chiều</h6>
          <p>${day.afternoon}</p>
        </div>
      </div>

      <!-- Buổi Tối -->
      <div class="day-period-block">
        <div class="period-icon-wrap period-evening">
          <i class="bi bi-moon-stars-fill"></i>
        </div>
        <div class="period-content">
          <h6>Buổi Tối</h6>
          <p>${day.evening}</p>
        </div>
      </div>
    </div>
  `).join("");

  // 3. Điền Dịch vụ bao gồm & Không bao gồm
  const inclusionsEl = document.getElementById("itineraryInclusions");
  inclusionsEl.innerHTML = tour.inclusions.map(inc => `
    <li><i class="bi bi-check-circle-fill"></i> <span>${inc}</span></li>
  `).join("");

  const exclusionsEl = document.getElementById("itineraryExclusions");
  exclusionsEl.innerHTML = tour.exclusions.map(exc => `
    <li><i class="bi bi-x-circle-fill"></i> <span>${exc}</span></li>
  `).join("");

  // 4. Gắn sự kiện nút Đặt ngay trong Modal
  const bookBtn = document.getElementById("itineraryBookBtn");
  bookBtn.onclick = () => {
    bootstrap.Modal.getInstance(modalEl)?.hide();
    openBookingModal(tour.id);
  };

  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  modal.show();
}

// =============================================================================
// X. HỆ THỐNG ĐẶT LỊCH & TÍNH TIỀN THEO THỜI GIAN THỰC (BOOKING & REAL-TIME PRICING)
// =============================================================================
/**
 * Khởi tạo ngày đi tối thiểu là ngày mai
 */
function setMinimumDepartureDate() {
  const dateInput = document.getElementById("bookingDepartureDate");
  if (!dateInput) return;

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split("T")[0];
  dateInput.min = minDate;
  dateInput.value = minDate;
}

/**
 * Mở Modal Đặt tour với tour được chỉ định
 */
function openBookingModal(tourId) {
  const tour = TOURS_DATA.find(t => t.id === tourId);
  if (!tour) return;

  AppState.currentBookingTour = tour;
  AppState.appliedVoucher = null;
  AppState.selectedPaymentMethod = "qr";

  // Tạo mã đơn hàng mẫu ngẫu nhiên dạng: DELTA-XXXXX
  const randomNum = Math.floor(100000 + Math.random() * 900000);
  AppState.bookingReference = `DELTA-${randomNum}`;

  // Điền thông tin tour vào Order Summary
  document.getElementById("summaryTourTitle").textContent = tour.title;
  document.getElementById("summaryTourCode").textContent = tour.id;
  document.getElementById("summaryTourThumb").src = tour.image;
  document.getElementById("summaryTourDuration").textContent = tour.duration;

  // Đặt lại các giá trị mặc định cho form
  document.getElementById("qtyAdults").value = 1;
  document.getElementById("qtyChildren").value = 0;
  document.getElementById("qtyInfants").value = 0;

  // Bỏ chọn tất cả checkbox dịch vụ gia tăng
  document.querySelectorAll(".addon-checkbox").forEach(cb => cb.checked = false);

  // Đặt lại ô voucher
  const voucherInput = document.getElementById("voucherCodeInput");
  const voucherMsg = document.getElementById("voucherStatusMsg");
  if (voucherInput) voucherInput.value = "";
  if (voucherMsg) {
    voucherMsg.className = "voucher-status-msg";
    voucherMsg.textContent = "";
  }

  // Chuyển tab thanh toán về QR mặc định
  selectPaymentTab("qr");

  // Tính toán lại bảng tiền
  calculateOrderPricing();

  const modalEl = document.getElementById("bookingModal");
  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  modal.show();
}

/**
 * Lắng nghe tất cả sự kiện thay đổi trên Form Đặt Tour để tính tiền Real-time
 */
function initBookingListeners() {
  // Thay đổi số lượng hành khách
  ["Adults", "Children", "Infants"].forEach(type => {
    const input = document.getElementById(`qty${type}`);
    if (input) {
      input.addEventListener("change", calculateOrderPricing);
    }
  });

  // Tích chọn dịch vụ gia tăng
  document.querySelectorAll(".addon-checkbox").forEach(cb => {
    cb.addEventListener("change", (e) => {
      // Đổi class để tạo viền sáng đẹp
      const parent = e.target.closest(".addon-item");
      if (parent) parent.classList.toggle("selected", e.target.checked);
      calculateOrderPricing();
    });
  });

  // Nút áp dụng Voucher
  const applyVoucherBtn = document.getElementById("btnApplyVoucher");
  if (applyVoucherBtn) {
    applyVoucherBtn.addEventListener("click", applyVoucherCode);
  }

  // Form xác nhận hoàn tất đặt tour
  const bookingForm = document.getElementById("deltaBookingForm");
  if (bookingForm) {
    bookingForm.addEventListener("submit", handleBookingSubmission);
  }
}

/**
 * Tăng/giảm số lượng hành khách bằng nút (+)/(-)
 */
function changePassengerQty(type, delta) {
  const input = document.getElementById(`qty${type}`);
  if (!input) return;

  let current = parseInt(input.value) || 0;
  let min = (type === "Adults") ? 1 : 0; // Ít nhất phải có 1 người lớn
  let max = 20;

  current += delta;
  if (current < min) current = min;
  if (current > max) current = max;

  input.value = current;
  calculateOrderPricing();
}

/**
 * Tính toán chi tiết toàn bộ số tiền đơn hàng trong thời gian thực
 */
function calculateOrderPricing() {
  const tour = AppState.currentBookingTour;
  if (!tour) return;

  const adultQty = parseInt(document.getElementById("qtyAdults")?.value) || 1;
  const childQty = parseInt(document.getElementById("qtyChildren")?.value) || 0;
  const infantQty = parseInt(document.getElementById("qtyInfants")?.value) || 0;

  // 1. Tiền vé cơ bản
  const adultTotal = adultQty * tour.price;
  const childTotal = childQty * Math.round(tour.price * 0.75); // Trẻ em 75%
  const infantTotal = infantQty * Math.round(tour.price * 0.10); // Em bé 10% (phí bảo hiểm)

  // 2. Dịch vụ cộng thêm
  let addonTotal = 0;
  const cbSingleRoom = document.getElementById("addonSingleRoom");
  const cbAirport = document.getElementById("addonAirport");
  const cbInsurance = document.getElementById("addonInsurance");

  if (cbSingleRoom?.checked) addonTotal += ADDON_SERVICES.singleRoom.price;
  if (cbAirport?.checked) addonTotal += ADDON_SERVICES.airportShuttle.price;
  if (cbInsurance?.checked) {
    const totalPassengers = adultQty + childQty + infantQty;
    addonTotal += ADDON_SERVICES.premiumInsurance.price * totalPassengers;
  }

  // Tạm tính
  const subtotal = adultTotal + childTotal + infantTotal + addonTotal;

  // 3. Giảm giá Voucher
  let discountAmount = 0;
  if (AppState.appliedVoucher) {
    const v = AppState.appliedVoucher;
    if (v.discountType === "percent") {
      discountAmount = Math.round((subtotal * v.discountValue) / 100);
      if (v.maxDiscount && discountAmount > v.maxDiscount) {
        discountAmount = v.maxDiscount;
      }
    } else if (v.discountType === "fixed") {
      discountAmount = v.discountValue;
    }
  }

  // Tổng thanh toán cuối cùng (không âm)
  const grandTotal = Math.max(0, subtotal - discountAmount);

  // 4. Cập nhật lên giao diện Tóm tắt (DOM)
  document.getElementById("costAdultText").textContent = `${adultQty} x ${formatVND(tour.price)}`;
  document.getElementById("costAdultTotal").textContent = formatVND(adultTotal);

  const costChildRow = document.getElementById("costChildRow");
  if (costChildRow) {
    if (childQty > 0) {
      costChildRow.style.display = "flex";
      document.getElementById("costChildText").textContent = `${childQty} x ${formatVND(Math.round(tour.price * 0.75))}`;
      document.getElementById("costChildTotal").textContent = formatVND(childTotal);
    } else {
      costChildRow.style.display = "none";
    }
  }

  const costInfantRow = document.getElementById("costInfantRow");
  if (costInfantRow) {
    if (infantQty > 0) {
      costInfantRow.style.display = "flex";
      document.getElementById("costInfantText").textContent = `${infantQty} x ${formatVND(Math.round(tour.price * 0.10))}`;
      document.getElementById("costInfantTotal").textContent = formatVND(infantTotal);
    } else {
      costInfantRow.style.display = "none";
    }
  }

  const costAddonRow = document.getElementById("costAddonRow");
  if (costAddonRow) {
    if (addonTotal > 0) {
      costAddonRow.style.display = "flex";
      document.getElementById("costAddonTotal").textContent = formatVND(addonTotal);
    } else {
      costAddonRow.style.display = "none";
    }
  }

  // Hàng Voucher
  const costDiscountRow = document.getElementById("costDiscountRow");
  if (costDiscountRow) {
    if (discountAmount > 0) {
      costDiscountRow.style.display = "flex";
      document.getElementById("costDiscountVal").textContent = `-${formatVND(discountAmount)}`;
    } else {
      costDiscountRow.style.display = "none";
    }
  }

  // Tổng số tiền cần thanh toán
  document.getElementById("checkoutGrandTotal").textContent = formatVND(grandTotal);

  // Cập nhật số tiền và nội dung chuyển khoản trên Box QR Code
  const qrAmountEl = document.getElementById("qrTransferAmount");
  const qrCodeEl = document.getElementById("qrTransferContent");
  if (qrAmountEl) qrAmountEl.textContent = formatVND(grandTotal);
  if (qrCodeEl) qrCodeEl.textContent = AppState.bookingReference;

  return {
    tourId: tour.id,
    tourTitle: tour.title,
    adultQty,
    childQty,
    infantQty,
    adultTotal,
    childTotal,
    infantTotal,
    addonTotal,
    subtotal,
    discountAmount,
    grandTotal
  };
}

/**
 * Xử lý kiểm tra và áp dụng mã giảm giá Voucher
 */
function applyVoucherCode() {
  const input = document.getElementById("voucherCodeInput");
  const msgEl = document.getElementById("voucherStatusMsg");
  if (!input || !msgEl) return;

  const code = input.value.trim().toUpperCase();
  if (!code) {
    msgEl.className = "voucher-status-msg error";
    msgEl.textContent = "Vui lòng nhập mã giảm giá.";
    return;
  }

  const voucher = VOUCHERS_DATA.find(v => v.code === code);
  if (!voucher) {
    msgEl.className = "voucher-status-msg error";
    msgEl.textContent = "Mã voucher không tồn tại hoặc đã hết hạn!";
    AppState.appliedVoucher = null;
    calculateOrderPricing();
    return;
  }

  // Kiểm tra điều kiện đơn hàng tối thiểu
  const pricing = calculateOrderPricing();
  if (voucher.minOrderValue && pricing.subtotal < voucher.minOrderValue) {
    msgEl.className = "voucher-status-msg error";
    msgEl.textContent = `Mã này chỉ áp dụng cho đơn từ ${formatVND(voucher.minOrderValue)}`;
    AppState.appliedVoucher = null;
    calculateOrderPricing();
    return;
  }

  AppState.appliedVoucher = voucher;
  msgEl.className = "voucher-status-msg success";
  msgEl.textContent = `Áp dụng thành công: ${voucher.description}`;
  calculateOrderPricing();
  showToast("Áp dụng mã giảm giá thành công!", "success");
}

// =============================================================================
// XI. XỬ LÝ CHUYỂN TAB PHƯƠNG THỨC THANH TOÁN
// =============================================================================
function selectPaymentTab(method) {
  AppState.selectedPaymentMethod = method;

  // Cập nhật nút tab
  document.querySelectorAll(".payment-tab-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.method === method);
  });

  // Hiển thị khung nội dung tương ứng
  const panes = ["qr", "card", "ewallet", "cash"];
  panes.forEach(p => {
    const paneEl = document.getElementById(`paymentPane_${p}`);
    if (paneEl) {
      paneEl.style.display = (p === method) ? "block" : "none";
    }
  });
}

// =============================================================================
// XII. KIỂM TRA HỢP LỆ VÀ XÁC NHẬN ĐẶT TOUR (SUBMIT & CHECKOUT)
// =============================================================================
function handleBookingSubmission(e) {
  e.preventDefault();

  // 1. Lấy dữ liệu người đặt
  const fullName = document.getElementById("customerName")?.value.trim();
  const phone = document.getElementById("customerPhone")?.value.trim();
  const email = document.getElementById("customerEmail")?.value.trim();
  const cccd = document.getElementById("customerCCCD")?.value.trim();
  const departureDate = document.getElementById("bookingDepartureDate")?.value;
  const notes = document.getElementById("customerNotes")?.value.trim();

  // 2. Validate cơ bản
  if (!fullName) {
    showToast("Vui lòng nhập họ và tên của bạn", "error");
    document.getElementById("customerName")?.focus();
    return;
  }

  // Kiểm tra số điện thoại Việt Nam (10 số, bắt đầu bằng 0)
  const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
  if (!phone || !phoneRegex.test(phone)) {
    showToast("Số điện thoại không hợp lệ (gồm 10 số, VD: 0987654321)", "error");
    document.getElementById("customerPhone")?.focus();
    return;
  }

  // Kiểm tra Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    showToast("Vui lòng nhập địa chỉ email hợp lệ để nhận vé điện tử", "error");
    document.getElementById("customerEmail")?.focus();
    return;
  }

  if (!departureDate) {
    showToast("Vui lòng chọn ngày khởi hành", "error");
    document.getElementById("bookingDepartureDate")?.focus();
    return;
  }

  // 3. Nếu chọn phương thức thẻ ATM/Visa thì kiểm tra thông tin thẻ
  if (AppState.selectedPaymentMethod === "card") {
    const cardNumber = document.getElementById("cardNum")?.value.trim();
    const cardHolder = document.getElementById("cardHolder")?.value.trim();
    const cardExp = document.getElementById("cardExpiry")?.value.trim();
    const cardCvv = document.getElementById("cardCvv")?.value.trim();

    if (!cardNumber || !cardHolder || !cardExp || !cardCvv) {
      showToast("Vui lòng điền đầy đủ thông tin thẻ thanh toán", "error");
      return;
    }
  }

  // 4. Tính toán số tiền cuối
  const pricing = calculateOrderPricing();

  // Xác định trạng thái thanh toán
  const isPaid = (AppState.selectedPaymentMethod !== "cash");
  const statusText = isPaid ? "ĐÃ THANH TOÁN" : "CHỜ THANH TOÁN (24H)";

  // 5. Tạo đối tượng đơn hàng đầy đủ
  const newOrder = {
    bookingId: AppState.bookingReference,
    tourId: pricing.tourId,
    tourTitle: pricing.tourTitle,
    departureDate: departureDate,
    customer: {
      fullName,
      phone,
      email,
      cccd: cccd || "Chưa cung cấp",
      notes: notes || "Không có yêu cầu đặc biệt"
    },
    passengers: {
      adults: pricing.adultQty,
      children: pricing.childQty,
      infants: pricing.infantQty
    },
    pricing: {
      subtotal: pricing.subtotal,
      discount: pricing.discountAmount,
      total: pricing.grandTotal
    },
    paymentMethod: getPaymentMethodLabel(AppState.selectedPaymentMethod),
    status: statusText,
    isPaid: isPaid,
    createdAt: new Date().toLocaleString("vi-VN")
  };

  // 6. Lưu vào LocalStorage
  saveBookingToLocalStorage(newOrder);

  // 7. Ẩn modal đặt hàng và mở modal Vé Điện Tử
  bootstrap.Modal.getInstance(document.getElementById("bookingModal"))?.hide();
  displayETicket(newOrder);

  showToast("Đặt tour thành công! Vé điện tử đã được tạo.", "success");
}

function getPaymentMethodLabel(method) {
  switch (method) {
    case "qr": return "Chuyển khoản QR Ngân hàng (VietQR)";
    case "card": return "Thẻ Quốc tế / ATM Nội địa";
    case "ewallet": return "Ví điện tử MoMo / VNPay";
    case "cash": return "Tiền mặt tại Văn phòng Delta Travel";
    default: return "Chuyển khoản ngân hàng";
  }
}

// =============================================================================
// XIII. QUẢN LÝ ĐƠN HÀNG TRÊN LOCALSTORAGE
// =============================================================================
function getLocalBookings() {
  try {
    return JSON.parse(localStorage.getItem("delta_bookings")) || [];
  } catch (e) {
    return [];
  }
}

function saveBookingToLocalStorage(order) {
  const orders = getLocalBookings();
  orders.unshift(order); // Đưa đơn mới lên đầu mảng
  localStorage.setItem("delta_bookings", JSON.stringify(orders));
}

// =============================================================================
// XIV. HIỂN THỊ VÉ ĐIỆN TỬ (E-TICKET / HÓA ĐƠN XÁC NHẬN)
// =============================================================================
function displayETicket(order) {
  const modalEl = document.getElementById("eticketModal");
  if (!modalEl) return;

  // Điền dữ liệu vào vé
  document.getElementById("ticketBookingId").textContent = order.bookingId;
  document.getElementById("ticketStatusBadge").textContent = order.status;
  document.getElementById("ticketStatusBadge").className = order.isPaid
    ? "eticket-status-bar paid"
    : "eticket-status-bar pending";

  document.getElementById("ticketCreatedAt").textContent = order.createdAt;
  document.getElementById("ticketTourTitle").textContent = order.tourTitle;
  document.getElementById("ticketDepartureDate").textContent = order.departureDate;

  // Thông tin hành khách
  document.getElementById("ticketCustomerName").textContent = order.customer.fullName;
  document.getElementById("ticketCustomerPhone").textContent = order.customer.phone;
  document.getElementById("ticketCustomerEmail").textContent = order.customer.email;
  document.getElementById("ticketCustomerCCCD").textContent = order.customer.cccd;

  // Số lượng khách
  const passengerStr = `${order.passengers.adults} Người lớn`
    + (order.passengers.children ? `, ${order.passengers.children} Trẻ em` : "")
    + (order.passengers.infants ? `, ${order.passengers.infants} Em bé` : "");
  document.getElementById("ticketPassengerCount").textContent = passengerStr;

  // Thanh toán
  document.getElementById("ticketPaymentMethod").textContent = order.paymentMethod;
  document.getElementById("ticketTotalAmount").textContent = formatVND(order.pricing.total);

  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  modal.show();
}

/**
 * In vé điện tử hoặc lưu file PDF qua hộp thoại in của trình duyệt
 */
function printETicket() {
  window.print();
}

// =============================================================================
// XV. TRA CỨU & QUẢN LÝ ĐƠN ĐẶT CHỖ (MY BOOKINGS MODAL)
// =============================================================================
/**
 * Mở modal Quản lý và tra cứu đơn đặt chỗ
 */
function openMyBookingsModal() {
  const modalEl = document.getElementById("myBookingsModal");
  if (!modalEl) return;

  renderMyBookingsList();

  const modal = bootstrap.Modal.getOrCreateInstance(modalEl);
  modal.show();
}

/**
 * Kết xuất danh sách các đơn đã đặt từ localStorage
 */
function renderMyBookingsList(searchFilter = "") {
  const container = document.getElementById("myBookingsContainer");
  if (!container) return;

  let bookings = getLocalBookings();

  if (searchFilter.trim() !== "") {
    const kw = searchFilter.trim().toLowerCase();
    bookings = bookings.filter(b =>
      b.bookingId.toLowerCase().includes(kw) ||
      b.customer.phone.includes(kw) ||
      b.customer.fullName.toLowerCase().includes(kw)
    );
  }

  if (bookings.length === 0) {
    container.innerHTML = `
      <div class="text-center py-5">
        <i class="bi bi-inbox text-muted" style="font-size: 3rem;"></i>
        <h5 class="fw-bold text-muted mt-3">Không tìm thấy đơn đặt tour nào</h5>
        <p class="text-muted small">Bạn chưa thực hiện đặt tour hoặc số điện thoại tìm kiếm không khớp.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = bookings.map(b => {
    let badgeClass = "booking-badge-paid";
    if (b.status.includes("CHỜ")) badgeClass = "booking-badge-pending";
    if (b.status.includes("HỦY")) badgeClass = "booking-badge-cancelled";

    return `
      <div class="my-booking-card">
        <div class="my-booking-header">
          <div>
            <span class="fw-bold text-primary">${b.bookingId}</span>
            <span class="text-muted small ms-2">&bull; ${b.createdAt}</span>
          </div>
          <span class="${badgeClass}">${b.status}</span>
        </div>

        <div class="row align-items-center">
          <div class="col-md-7">
            <h6 class="fw-bold text-dark mb-1">${b.tourTitle}</h6>
            <div class="small text-muted mb-1">
              <i class="bi bi-calendar-event"></i> Ngày đi: <strong>${b.departureDate}</strong> &bull;
              <i class="bi bi-person"></i> Người đặt: <strong>${b.customer.fullName}</strong> (${b.customer.phone})
            </div>
            <div class="small text-muted">
              Phương thức: ${b.paymentMethod}
            </div>
          </div>
          <div class="col-md-5 text-md-end mt-3 mt-md-0">
            <div class="fw-bold text-danger fs-5 mb-2">${formatVND(b.pricing.total)}</div>
            <div class="d-flex gap-2 justify-content-md-end">
              <button class="btn btn-sm btn-outline-primary" onclick="viewExistingTicket('${b.bookingId}')">
                <i class="bi bi-receipt"></i> Xem vé
              </button>
              ${!b.status.includes("HỦY") ? `
                <button class="btn btn-sm btn-outline-danger" onclick="cancelBooking('${b.bookingId}')">
                  <i class="bi bi-x-circle"></i> Hủy lịch
                </button>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

/**
 * Tìm kiếm đơn đặt chỗ theo mã đơn hoặc số điện thoại
 */
function searchBookings() {
  const kw = document.getElementById("searchBookingInput")?.value || "";
  renderMyBookingsList(kw);
}

/**
 * Xem lại vé điện tử của một đơn hàng đã lưu
 */
function viewExistingTicket(bookingId) {
  const bookings = getLocalBookings();
  const order = bookings.find(b => b.bookingId === bookingId);
  if (order) {
    bootstrap.Modal.getInstance(document.getElementById("myBookingsModal"))?.hide();
    displayETicket(order);
  }
}

/**
 * Hủy đặt lịch du lịch
 */
function cancelBooking(bookingId) {
  if (!confirm(`Bạn có chắc chắn muốn hủy đơn đặt chỗ ${bookingId} không?`)) {
    return;
  }

  let bookings = getLocalBookings();
  const order = bookings.find(b => b.bookingId === bookingId);
  if (order) {
    order.status = "ĐÃ HỦY THEO YÊU CẦU";
    order.isPaid = false;
    localStorage.setItem("delta_bookings", JSON.stringify(bookings));
    renderMyBookingsList();
    showToast(`Đã hủy thành công đơn ${bookingId}`, "warning");
  }
}

// =============================================================================
// XVI. THÔNG BÁO TOAST THÂN THIỆN (TOAST NOTIFICATIONS)
// =============================================================================
function showToast(message, type = "info") {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = `custom-toast toast-${type}`;

  let icon = "bi-info-circle-fill text-primary";
  if (type === "success") icon = "bi-check-circle-fill text-success";
  if (type === "error") icon = "bi-exclamation-triangle-fill text-danger";
  if (type === "warning") icon = "bi-exclamation-circle-fill text-warning";

  toast.innerHTML = `
    <i class="bi ${icon} fs-5"></i>
    <div class="flex-grow-1 small fw-semibold">${message}</div>
    <button type="button" class="btn-close btn-close-sm" style="font-size: 0.75rem;" onclick="this.parentElement.remove()"></button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

function closeModal(modalId) {
  const el = document.getElementById(modalId);
  if (el) {
    bootstrap.Modal.getInstance(el)?.hide();
  }
}
