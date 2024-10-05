$(document).ready(function() {
    // Mảng dữ liệu sinh viên
    let students = [
        { studentId: "SV001", studentName: "Bùi Tiến Anh", age: 21, sex: true, birthDate: "2003-12-13", birthPlace: "CH", address: "Tuyên Quang" },
        { studentId: "SV002", studentName: "Nguyễn Văn B", age: 21, sex: false, birthDate: "2001-09-09", birthPlace: "BN", address: "1, Ngô Quyền" }
        
    ];
    let editingIndex = -1; // Chỉ số sinh viên đang sửa

    // Hiển thị danh sách sinh viên
    function renderStudents() {
        const tableBody = $('#studentTable');
        tableBody.empty(); // Xóa nội dung cũ

        students.forEach((student, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${student.studentId}</td>
                    <td>${student.studentName}</td>
                    <td>${student.age}</td>
                    <td>${student.sex ? 'Nam' : 'Nữ'}</td>
                    <td class="action-buttons">
                        <button class="btn btn-danger btn-sm" onclick="viewStudent(${index})">Xem</button>
                        <button class="btn btn-warning btn-sm" onclick="editStudent(${index})">Sửa</button>
                        <button class="btn btn-info btn-sm" onclick="deleteStudent(${index})">Xóa</button>
                    </td>
                </tr>
            `;
            tableBody.append(row);
        });
    }

    // Thêm/Sửa sinh viên
    $('#saveButton').click(function() {
        const studentId = $('#studentId').val();
        const studentName = $('#studentName').val();
        const age = $('#age').val();
        const sex = $('#sex').val();
        const birthDate = $('#birthDate').val();
        const birthPlace = $('#birthPlace').val();
        const address = $('#address').val();

        if (editingIndex >= 0) {
            // Sửa thông tin sinh viên
            students[editingIndex] = { studentId, studentName, age, sex, birthDate, birthPlace, address };
            editingIndex = -1; // Đặt lại chỉ số sau khi sửa
        } else {
            // Thêm sinh viên mới
            students.push({ studentId, studentName, age, sex, birthDate, birthPlace, address });
        }

        renderStudents(); // Cập nhật danh sách
        $('#studentForm')[0].reset(); // Reset form
    });

    // Xem sinh viên
    window.viewStudent = function(index) {
        const student = students[index];
        alert(`Thông tin sinh viên:\nMã: ${student.studentId}\nTên: ${student.studentName}\nTuổi: ${student.age}`);
    };

    // Sửa sinh viên
    window.editStudent = function(index) {
        document.getElementById("from2").style.display="block";
        const student = students[index];
        $('#studentId').val(student.studentId);
        $('#studentName').val(student.studentName);
        $('#age').val(student.age);
        $('#sex').val(student.sex);
        $('#birthDate').val(student.birthDate);
        $('#birthPlace').val(student.birthPlace);
        $('#address').val(student.address);

        editingIndex = index; // Đặt chỉ số đang sửa
    };

    // Xóa sinh viên
    window.deleteStudent = function(index) {
        students.splice(index, 1); // Xóa 1 phần tử tại chỉ số
        renderStudents(); // Cập nhật danh sách
    };

    // Tìm kiếm sinh viên
    $('#searchButton').click(function() {
        const searchTerm = $('#searchInput').val().toLowerCase();
        const filteredStudents = students.filter(student => student.studentName.toLowerCase().includes(searchTerm));
        renderFilteredStudents(filteredStudents);
    }); 

    function renderFilteredStudents(filteredStudents) {
        const tableBody = $('#studentTable');
        tableBody.empty(); // Xóa nội dung cũ

        filteredStudents.forEach((student, index) => {
            const row = `
                <tr>
                    <td>${index + 1}</td>
                    <td>${student.studentId}</td>
                    <td>${student.studentName}</td>
                    <td>${student.age}</td>
                    <td>${student.sex}</td>
                    <td class="action-buttons">
                        <button class="btn btn-danger btn-sm" onclick="viewStudent(${index})">Xem</button>
                        <button class="btn btn-warning btn-sm" onclick="editStudent(${index})">Sửa</button>
                        <button class="btn btn-info btn-sm" onclick="deleteStudent(${index})">Xóa</button>
                    </td>
                </tr>
            `;
            tableBody.append(row);
        });
    }

    // Sắp xếp sinh viên theo tên
    $('#sortButton').click(function() {
        students.sort((a, b) => a.studentName.localeCompare(b.studentName));
        renderStudents();
    });

    renderStudents(); // Hiển thị dữ liệu khi trang tải
});
function functionThemSV(){
    if(document.getElementById("from2").style.display=="block"){
        document.getElementById("from2").style.display="none";
    }else{
         document.getElementById("from2").style.display="block";
    }
}