$(document).ready(function () {

    if(!localStorage.getItem('products')){
        const initialStudents = [
            { productId: "SV0001", studentName: "Nguyễn Văn A", age: 20, sex: true, birthDate: "2002-04-23", birthPlace: "HN", address: "25, Vũ Ngọc Phan" },
            { P: "SV0002", studentName: "Nguyễn Văn B", age: 21, sex: false, birthDate: "2001-09-09", birthPlace: "ĐN", address: "1, Ngô Quyền" }
           
        ];
        localStorage.setItem('students',JSON.stringify(initialStudents));   
    }
    
    function getStudents(){
        return JSON.parse(localStorage.getItem('students'))||[];
    }

    function saveStudents(students){
        localStorage.setItem('students', JSON.stringify(students));
    }

    function refreshTable(studentsToDisplay){
        const students =studentsToDisplay || getStudents();
        $('#studentTable').html('');
        students.forEach((student, index) => {
            $("#studentTable").append(`
                <tr>
                    <td>${index+1}</td>
                    <td>${student.studentId}</td>
                    <td>${student.studentName}</td>
                    <td>${student.age}</td>
                    <td>${student.sex ? 'Nam':'Nữ'}</td>
                    <td>
                        <button class="btn btn-info action-btn viewBtn" data-index="${index}">Xem</button>
                        <button class="btn btn-warning action-btn editBtn" data-index="${index}">Sửa</button>
                        <button class="btn btn-danger action-btn deleteBtn" data-index="${index}" >Xoá</button>
                    </td>
                </tr>    
            `);
        });
    }

    
    //button plus
    $('.p-act button.plus').click(function () {
        //Lấy đơn giá
        let price = $(this).siblings('input').attr('data-price');
        //Lấy số lượng hiện tại
        let qty = $(this).siblings('input').val();
        //tăng số lượng
        qty = parseInt(qty) + 1;
        //gán lại ô input
        $(this).siblings('input').val(qty);

        //Tính thành tiền
        let thanhTien = qty * parseFloat(price);
        //gán lại vào phần hiển thị
        $(this).parent().siblings("p").children('span.thanh-tien').text(fn_formatMoney(thanhTien, 0, ',', '.'));
        $(this).parent().siblings("p").children('span.thanh-tien').attr("data-money", thanhTien);

        //tính tổng thành tiền
        let tong = fn_tongThanhTien();
        $("#tongThanhTien").html(fn_formatMoney(tong, 0, ',', '.'));

        //Tính tổng hóa đơn(Thêm phần ship)
        $("#tongTien").html(fn_formatMoney(tong, 0, ',', '.'));

    });

    //button minus
    $('.p-act button.minus').click(function () {
        //Lấy đơn giá
        let price = $(this).siblings('input').attr('data-price');
        //Lấy số lượng hiện tại
        let qty = $(this).siblings('input').val();
        //giảm số lượng
        if (qty > 1) {
            qty = parseInt(qty) - 1;
        }
        //gán lại ô input
        $(this).siblings('input').val(qty);

        //Tính thành tiền
        let thanhTien = qty * parseFloat(price);
        //gán lại vào phần hiển thị
        $(this).parent().siblings("p").children('span.thanh-tien').text(fn_formatMoney(thanhTien, 0, ',', '.'));
        $(this).parent().siblings("p").children('span.thanh-tien').attr("data-money", thanhTien);

        //tính tổng thành tiền
        let tong = fn_tongThanhTien();
        $("#tongThanhTien").html(fn_formatMoney(tong, 0, ',', '.'));

        //Tính tổng hóa đơn(Thêm phần ship)
        $("#tongTien").html(fn_formatMoney(tong, 0, ',', '.'));
    });

    //Tính tổng thành tiền, tổng tiền
    const fn_tongThanhTien = () => {
        let tong = 0;
        $('span.thanh-tien').each(function(){
            tong += parseFloat(thanhtien);
        })
        return tong;
    }

    //Xóa item trong giỏ hàng
    $('button.remove').click(function(){
        if(!confirm('Bạn có muốn xóa không?')) return;

        //xóa trên giao diện
        $(this).parent().parent().remove();
    });


    //input change
    $('.p-act input').change(function () {
        //Lấy đơn giá
        let price = $(this).siblings('input').attr('data-price');
        //Lấy số lượng hiện tại
        let qty = $(this).val();
        if(qty>=10 || qty <=1) return;
        qty = parseInt(qty);

        //Tính thành tiền
        let thanhTien = qty * parseFloat(price);
        //gán lại vào phần hiển thị
        $(this).parent().siblings("p").children('span.thanh-tien').text(fn_formatMoney(thanhTien, 0, ',', '.'));
        $(this).parent().siblings("p").children('span.thanh-tien').attr("data-money", thanhTien);

        //tính tổng thành tiền
        let tong = fn_tongThanhTien();
        $("#tongThanhTien").html(fn_formatMoney(tong, 0, ',', '.'));

        //Tính tổng hóa đơn(Thêm phần ship)
        $("#tongTien").html(fn_formatMoney(tong, 0, ',', '.'));

    });


    function fn_formatMoney(amount, decimalCount = 2, decimal = ".", thousands = ",") {
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


    var fntest = fn_formatMoney('123456', 0, ',', '.')
    console.log("Format:", fntest);

});