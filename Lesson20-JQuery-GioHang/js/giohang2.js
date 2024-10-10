// Các chức năng thao tác với giỏ hàng
$(document).ready(function() {

    if (!localStorage.getItem('products')) {
        const initialProducts = [
            { productId: "P0001", productName: "Bàn ăn", productImage: ["004.jpg"], dataPrice: "30.000.000" ,productPrice:"30000000"},
            { productId: "P0002", productName: "Bàn uống Trà", productImage: ["009.jpg"], dataPrice: "3.000.000", productPrice:"3000000"}
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
                <div class="gh-item d-flex justify-content-between align-items-center py-2">
                    <div class="p-item d-flex justify-content-between align-items-center">
                        <div class="image ">
                            <img src="./image/${productImage}" alt="" style="width: 100px;">
                        </div>
                        <div class="p-info px-2">
                            <h4>${product.productName}</h4>
                            <div class="p-action d-flex justify-content-start align-items-center ">
                                <button class="minus">-</button>
                                <input type="text" value="1" data-price="${product.dataPrice}">
                                <button class="plus">+</button>
                            </div>
                            <p>
                                <p><b>Giá:</b><span class="price">${product.productPrice}</span>VNĐ</p>
                            </p>
                            <p>
                                <b>Thành tiền:</b>
                                <span class="thanh-tien" data-money="0">0</span>
                                <b>VND</b>
                            </p>
                        </div>
                    </div>
                    <div class="gh-action d-flex flex-column align-items-end">
                        <button class="remove">X</button>
                        <button>Cập nhật</button>
                    </div>
                </div>

            `);
        });
    }
    
    console.log("Ứng dụng đã sẵn sàng");
    //Button plus
    $(document).on('click', '.plus', function() {
        // Lấy đơn giá
        let price = $(this).siblings('input').attr('data-price');
        console.log("Price +:", price);
        // Lấy số lượng hiện tại
        let qty = $(this).siblings('input').val();
        if(parseInt(qty)>=10) return;
        console.log("Số lượng: ", qty);
        //Tăng số lượng
        qty = parseInt(qty) + 1;
        //Gán lại ô input
        $(this).siblings('input').val(qty);
        // Tính thành tiền
        let thanhTien = qty*parseFloat(price);
        // Gán vào phần hiển thị
        $(this).parent().siblings("p").children('span.thanh-tien').text(fn_FormatMoney(thanhTien,0,',','.'));
        $(this).parent().siblings("p").children('span.thanh-tien').attr("data-money",thanhTien);

        console.log("Tổng thành tiền:", fn_tongThanhTien());
        //Tính tổng thành tiền
        let tong = fn_tongThanhTien();
        $("#tongThanhTien").html(fn_FormatMoney(tong,0,',','.'));
        // Tính tổng hóa đơn (thêm phần ship)
        $("#tongTien").html(fn_FormatMoney(tong,0,',','.'));
    });
    //Button minus
    $(document).on('click', '.minus', function() {
        // Lấy đơn giá
        let price = $(this).siblings('input').attr('data-price');
        console.log("Price -:", price);
        // Lấy số lượng hiện tại
        let qty = $(this).siblings('input').val();
        if(parseInt(qty)<=1) return;
        console.log("Số lượng: ", qty);
        //Tăng số lượng
        qty = parseInt(qty) - 1;
        //Gán lại ô input
        $(this).siblings('input').val(qty);
        // Tính thành tiền
        let thanhTien = qty*parseFloat(price);
        // Gán vào phần hiển thị
        $(this).parent().siblings("p").children('span.thanh-tien').text(fn_FormatMoney(thanhTien,0,',','.'));
        $(this).parent().siblings("p").children('span.thanh-tien').attr("data-money",thanhTien);  
        
        console.log("Tổng thành tiền:", fn_tongThanhTien());
        //Tính tổng thành tiền
        let tong = fn_tongThanhTien();
        $("#tongThanhTien").html(fn_FormatMoney(tong,0,',','.'));
         // Tính tổng hóa đơn (thêm phần ship)
         $("#tongTien").html(fn_FormatMoney(tong,0,',','.'));
    });
    //Tính tổng thành tiền, tổng tiền
    const fn_tongThanhTien = () => {
        let tong = 0;
        $('span.thanh-tien').each(function() {
            let thanhTien = $(this).attr('data-money');
            // console.log(thanhTien);
            // console.log("text:", $(this).text());
            tong += parseFloat(thanhTien);
        });
        return tong;
    }
    
    // test
    console.log("Tổng thành tiền:", fn_tongThanhTien());
     

    //xoá item trong giỏ hàng
    $(document).on('click', '.remove', function() {
        if(!iconfirm("Bạn có muốn xoá ko?")) return;

        console.log("ok");
        //các xử lý, cập nhật, thành tiền, số lượng,...

        //xoá trên giao diện
        $(this).parent().parent().remove();
    })



    //input 
    $('.p-action input').change(function() {
        // Lấy đơn giá
        let price = $(this).attr('data-price');
        console.log("Price +:", price);
        // Lấy số lượng hiện tại
        let qty = $(this).val();
        qty = parentInt(qty);
        if(qty>=10 || qty<=1) return;
        console.log("Số lượng: ", qty);

        // Tính thành tiền
        let thanhTien = qty*parseFloat(price);
        // Gán vào phần hiển thị
        $(this).parent().siblings("p").children('span.thanh-tien').text(fn_FormatMoney(thanhTien,0,',','.'));
        $(this).parent().siblings("p").children('span.thanh-tien').attr("data-money",thanhTien);

        console.log("Tổng thành tiền:", fn_tongThanhTien());
        //Tính tổng thành tiền
        let tong = fn_tongThanhTien();
        $("#tongThanhTien").html(fn_FormatMoney(tong,0,',','.'));
        // Tính tổng hóa đơn (thêm phần ship)
        $("#tongTien").html(fn_FormatMoney(tong,0,',','.'));
    });

    function fn_FormatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
        try {
        decimalCount = Math.abs(decimalCount);
        decimalCount = isNaN(decimalCount) ? 2 : decimalCount;
    
        const negativeSign = amount < 0 ? "-" : "";
    
        let i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString();
        let j = (i.length > 3) ? i.length % 3 : 0;
    
        return negativeSign +
            (j ? i.substr(0, j) + thousands : '') +
            i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousands) +
            (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : "");
        } catch (e) {
        console.log(e)
        } 
    };
    var fnTest = fn_FormatMoney('123456',0,',','.')
        console.log("Format:",fnTest);

        refreshTable();
});