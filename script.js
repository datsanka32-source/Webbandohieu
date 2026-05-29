// Mảng toàn cục lưu trữ danh sách hàng hiệu trong giỏ
let cart = [];

// 1. Hàm bật/tắt thanh trượt Giỏ hàng bên phải
function toggleCart() {
    const sidebar = document.getElementById('cart-sidebar');
    sidebar.classList.toggle('active');
}

// 2. Hàm thêm sản phẩm và tự động đẩy giao diện cập nhật mới
function addToCart(name, price) {
    cart.push({ name: name, price: price });
    updateCartUI();
    // Tự động mở mở nhẹ giỏ hàng ra báo hiệu
    document.getElementById('cart-sidebar').classList.add('active');
}

// 3. Hàm loại bỏ sản phẩm ra khỏi danh sách
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

// 4. Hàm tính tổng số tiền hiện tại của giỏ hàng
function getTotalCartAmount() {
    return cart.reduce((sum, item) => sum + item.price, 0);
}

// 5. Hàm cốt lõi dựng lại giao diện giỏ hàng thời gian thực
function updateCartUI() {
    // Cập nhật số lượng đếm trên thanh Header
    document.getElementById('cart-count').innerText = cart.length;
    
    const container = document.getElementById('cart-items-container');
    const totalDisplay = document.getElementById('cart-total-price');
    
    // Nếu giỏ trống rỗng
    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-message">Chưa có sản phẩm nào được chọn.</p>';
        totalDisplay.innerText = '0 ₫';
        return;
    }
    
    // Đổ dữ liệu thật do người dùng mua vào vòng lặp HTML
    let htmlContent = '';
    cart.forEach((item, index) => {
        htmlContent += `
            <div class="cart-item">
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${item.name}</h4>
                    <p class="cart-item-price">${item.price.toLocaleString('vi-VN')} ₫</p>
                </div>
                <button class="btn-remove-item" onclick="removeFromCart(${index})">✕ Xóa</button>
            </div>
        `;
    });
    
    container.innerHTML = htmlContent;
    totalDisplay.innerText = getTotalCartAmount().toLocaleString('vi-VN') + ' ₫';
}

// 6. Hàm kích hoạt mở Modal nhập thông tin
function openCheckoutModal() {
    if (cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống. Vui lòng chọn sản phẩm trước khi thanh toán!");
        return;
    }
    
    // Đồng bộ số tiền thanh toán sang bảng thông tin đặt hàng
    const totalAmount = getTotalCartAmount();
    document.getElementById('modal-total-display').innerText = totalAmount.toLocaleString('vi-VN') + ' ₫';
    
    document.getElementById('checkout-modal').classList.add('active');
}

// 7. Hàm đóng Modal nhập thông tin
function closeCheckoutModal() {
    document.getElementById('checkout-modal').classList.remove('remove'); // Reset phòng hờ
    document.getElementById('checkout-modal').classList.remove('active');
}

// 8. Hàm xử lý gửi đơn hàng thành công, trích xuất thông tin người nhận
function processOrder(event) {
    event.preventDefault(); // Chặn hành vi tải lại trang của Form mẫu
    
    const name = document.getElementById('customer-name').value;
    const phone = document.getElementById('customer-phone').value;
    const address = document.getElementById('customer-address').value;
    const finalPrice = getTotalCartAmount().toLocaleString('vi-VN') + ' ₫';
    
    alert(
        `✨ ĐƠN HÀNG HOÀNG GIA ĐÃ ĐƯỢC KHỞI TẠO! ✨\n\n` +
        `Chào bạn ${name},\n` +
        `Maison de L'Élégance đã ghi nhận đơn đặt hàng của bạn.\n\n` +
        `▪ Số tiền cần phải thanh toán: ${finalPrice}\n` +
        `▪ Số điện thoại: ${phone}\n` +
        `▪ Địa chỉ giao hàng: ${address}\n\n` +
        `Chúng tôi sẽ liên hệ xác nhận điều phối giao hàng sớm nhất!`
    );
    
    // Dọn sạch giỏ hàng hoàn tất chu trình mua bán thành công
    cart = [];
    updateCartUI();
    closeCheckoutModal();
    document.getElementById('cart-sidebar').classList.remove('active');
    document.getElementById('checkout-form').reset();
}