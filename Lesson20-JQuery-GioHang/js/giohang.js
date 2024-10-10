// Các chức năng Giỏ hàng
$(document).ready(function() {

    //Cập nhập thành tiền
    function updateTotalPrice(input) {
        var price = parseInt(input.attr('data-price')); // Lấy đơn giá từ data-price
        var quantity = parseInt(input.val()); // Lấy số lượng từ input
        var totalPrice = price * quantity; // Tính thành tiền
        input.closest('.gh-item').find('.total_price').text(totalPrice.toLocaleString()); // Cập nhật thành tiền
        updateFinalAmount(); // Cập nhật tổng số tiền đơn hàng
    }

    //button "-" số lượng
    $(".btn-down").click(function() {
        var input = $(this).siblings(".qty_input"); // Lấy input liên quan đến nút bấm
        var currentValue = parseInt(input.val()); // Lấy giá trị hiện tại từ input
        var minValue = parseInt(input.attr("min")); // Lấy giá trị tối thiểu từ thuộc tính 'min'

        if (currentValue > minValue) {  // Kiểm tra nếu giá trị lớn hơn minValue
            input.val(currentValue - 1); // Trừ 1 vào giá trị hiện tại
            updateTotalPrice(input); // Cập nhật thành tiền
        }
    });

    //button "+" số lượng
    $(".btn-up").click(function() {
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

        $('.total_price').each(function() {
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
    $('.gh-item .gh-action button:first-child').click(function() {
        $(this).closest('.gh-item').remove(); // Xóa sản phẩm
        updateFinalAmount(); // Cập nhật tổng số tiền sau khi xóa
    });

    // Cập nhật sản phẩm
    $('.gh-item .gh-action button:last-child').click(function() {
        var input = $(this).closest('.gh-item').find('.qty_input'); // Lấy input của sản phẩm
        updateTotalPrice(input); // Cập nhật lại thành tiền cho sản phẩm
        
        // Thay đổi trạng thái của input
        if (input.prop('disabled')) {
            input.prop('disabled', false); // Cho phép chỉnh sửa
        } else {
            input.prop('disabled', true); // Ngăn không cho chỉnh sửa
        }
    });
});