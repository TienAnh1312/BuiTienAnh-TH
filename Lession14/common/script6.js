let text;
switch(new Date().getDay()){
    case 6:
        text = "Saturday";
        break;
    case 0:
        text = "Sunday";
        break;
    default:
        text = "Chịu";
}
document.getElementById("demo").innerHTML = text;

//2
let day;
switch(new Date().getDay()){
    case 1:
    case 2:
    case 3:
        text = "Đầu tuần";
        break;
    case 5:
    case 6:
    case 0:
        text = "Cuối tuần";
        break;
  
    default:
        text = "Chịu";
        break;
}
document.getElementById("demo2").innerHTML = day;
