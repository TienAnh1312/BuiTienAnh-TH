// cấu trúc điều khiển if
//Dạng 1: if đơn
/*
    cú pháp:
    if(condition-expression){
    block statement;
    }
*/ 
//Ví dụ: kiểm tra số num; kiểm tra có là số duơng
num = 10;
if(num > 0){
    console.log(num, " là số dương");
}
//nếu num > 0 gán lại giá trị num = -100
if(num>0){
    num = -100;
    console.log(num);
}

//Dạng 2: if ... else
num=12
//ktra số num là số chẵn hay số lẻ
if(num % 2 == 0){
    console.log(num, " là số chẵn");
}else{
    console.log(num, "là số lẻ");
}

//Dạng 3: if else if
//ktra số num là số dương, âm hay số 0
if (num > 0){
    console.log(num, " là số dươnng");
}else if(num < 0){
    console.log(num, "là số âm");
}else{
    console.log(num," là số không")
}

//Dạng 4: nested if
num1 = 12;
num2 = 15;
//nếu num1 là số chẵn; kiểm tra num2 là số lẻ
//tính: res = num1 + num2

if(num1 %2 == 0){
    if(num2 % 2 == 1){
        res = num1 + num2;
        console.log(res);
    }
}else{
    if(num2 % 2 == 1){
        res = num1 - num2;
        console.log(res);
    }
}

//Lt1: Giải pt bậc 1: ax+b=0
a = 5;
b = 10;

if(a === 0){
    if(b === 0){
        console.log("Phương trình b1 vô số nghiệm")
    }else{
        console.log("Phương trình b1 vô nghiệm")
    }
}else{
    x = -b/a 
    console.log("Nghiệm phương trình b1 là: ",x)
}

//Lt2: Giải pt bậc 2: ax^2+b+c=0
a = 2;
b = 4;
c = -6;
let delta = b*b - 4 * a * c;
if(delta>0){
    x1 = (-b + delta) / (2*a);
    x2 = (-b - delta) / (2*a);
    console.log("Phương trình có 2 nghiệm phân biệt ",x1, x2)
}else if (delta === 0){
    x = -b / (2 * a);
    console.log("Phương trình có nghiệm kép:", x);
}else{
    console.log("Phương trình vô nghiệm")
}