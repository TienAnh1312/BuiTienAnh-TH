$(document).ready(function() {

    if (!localStorage.getItem('products')) {
        const initialProducts = [
            { productId: "P0001", productName: "Bàn ăn", productImage: ["004.jpg"], dataPrice: "30000000" ,productPrice:"30000000"},
            { productId: "P0002", productName: "Bàn uống Trà", productImage: ["009.jpg"], dataPrice: "3000000", productPrice:"3000000"}
        ];
        localStorage.setItem('products', JSON.stringify(initialProducts));
    }

    function getProducts() {
        return JSON.parse(localStorage.getItem('products')) || [];
    }

    function saveProducts(products) {
        localStorage.setItem('products', JSON.stringify(products));
    }

    //dùng để xóa localStorage
    // localStorage.removeItem('products');

    function refreshTable() {
        const products = getProducts();
        $('.tt-item').html(''); // Làm trống bảng

        products.forEach((product, index) => {
            // Lấy hình ảnh đầu tiên từ mảng productImage
            const productImage = product.productImage.length > 0 ? product.productImage[0] : 'default.jpg';

            $(".tt-item").append(`
                <div class="gh-item d-flex justify-content-between align-items-center">
                    <div class="p-item d-flex justify-content-between align-items-center">
                        <div class="img px-2">
                            <img src="./image/${productImage}" alt="">
                        </div>
                        <div class="p-info">
                            <h4>${product.productName}</h4>
                            <div class="p-act d-flex justify-content-start align-items-center">
                                <button class="btn-down">-</button>
                                <input type="number" value="0" data-price="${product.dataPrice}" class="qty_input" max="10" min="0">
                                <button class="btn-up">+</button>
                            </div>
                            <p><b>Giá:</b><span class="price">${product.productPrice}</span>VNĐ</p>
                            <p>
                                <b>Thành tiền:</b>
                                <span class="total_price">0</span>VNĐ
                            </p>
                        </div>
                    </div>
    
                    <div class="gh-action m-2 d-flex flex-column">
                        <button class="delete-item">x</button>
                        <button class="update-item">Cập nhật</button>
                    </div>
                </div>

            `);
        });
    }

    //Cập nhập thành tiền
    function updateTotalPrice(input) {
        var price = parseInt(input.attr('data-price')); // Lấy đơn giá từ data-price
        var quantity = parseInt(input.val()); // Lấy số lượng từ input
        var totalPrice = price * quantity; // Tính thành tiền
        input.closest('.gh-item').find('.total_price').text(totalPrice.toLocaleString()); // Cập nhật thành tiền
        updateFinalAmount(); // Cập nhật tổng số tiền đơn hàng
    }

    //button "-" số lượng
    $(document).on('click','.btn-down',function(){
        var input = $(this).siblings(".qty_input"); // Lấy input liên quan đến nút bấm
        var currentValue = parseInt(input.val()); // Lấy giá trị hiện tại từ input
        var minValue = parseInt(input.attr("min")); // Lấy giá trị tối thiểu từ thuộc tính 'min'

        if (currentValue > minValue) {  // Kiểm tra nếu giá trị lớn hơn minValue
            input.val(currentValue - 1); // Trừ 1 vào giá trị hiện tại
            updateTotalPrice(input); // Cập nhật thành tiền
        }
    });

    //button "+" số lượng
    $(document).on('click','.btn-up',function(){
        var input = $(this).siblings(".qty_input"); // Lấy input liên quan đến nút bấm
        var currentValue = parseInt(input.val());
        var maxValue = parseInt(input.attr("max")); // Lấy giá trị tối đa từ thuộc tính 'max'

        if (currentValue < maxValue) { // Kiểm tra nếu giá trị nhỏ hơn maxValue
            input.val(currentValue + 1); // Tăng 1 giá trị vào ô input
            updateTotalPrice(input); // Cập nhật thành tiền
        }
    });

    function updateFinalAmount() {
        let totalAmount = 0;
        let hasAboveTenMillion = false; // Biến kiểm tra xem có sản phẩm nào trên 10 triệu

        // Duyệt qua tất cả các ô thành tiền để tính tổng
        $('.total_price').each(function() {
        // $('.total_price').each(function() {
            let itemTotal = parseInt($(this).text().replace(/,/g, '')) || 0; // Lấy thành tiền sản phẩm
            totalAmount += itemTotal; // Cộng dồn thành tiền
            if (itemTotal >= 10000000) { // Kiểm tra xem có sản phẩm nào trên 10 triệu
                hasAboveTenMillion = true;
            }
        });
         
        // Lấy số km từ thuộc tính data-km
        let shippingDistance = parseInt($('.shipping_distance').attr('data-km')); // Số km
        let shippingFee = 0;

        // Tính phí vận chuyển
        if (!hasAboveTenMillion) { // Nếu không có sản phẩm nào trên 10 triệu
            shippingFee = shippingDistance * 10000; // Tính phí vận chuyển 10k/km
        }
        
        let finalAmount = totalAmount + shippingFee; // Tổng tiền = thành tiền + phí vận chuyển

        $('.total_amount').text(totalAmount.toLocaleString()); // Cập nhật tổng thành tiền
        $('.final_amount').text(finalAmount.toLocaleString()); // Cập nhật tổng tiền cuối cùng
        $('.shipping_fee').text(shippingFee.toLocaleString()); // Cập nhật phí vận chuyển
    }

    // Xóa sản phẩm
    $(document).on('click', '.delete-item', function() {
        $(this).closest('.gh-item').remove(); // Xóa sản phẩm
        updateFinalAmount(); // Cập nhật tổng số tiền sau khi xóa
    });

    // Cập nhật sản phẩm
    $(document).on('click', '.update-item', function() {
        var input = $(this).closest('.gh-item').find('.qty_input'); // Lấy input của sản phẩm
        updateTotalPrice(input); // Cập nhật lại thành tiền cho sản phẩm
        
        // Thay đổi trạng thái của input
        if (input.prop('disabled')) {
            input.prop('disabled', false); // Cho phép chỉnh sửa
        } else {
            input.prop('disabled', true); // Ngăn không cho chỉnh sửa
        }
    });

    refreshTable();
});
