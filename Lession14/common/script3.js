const time = new Date().getHours();
let gretting;
if(time < 10){
    gretting = "Good Morning";
}else if(time < 20){
    gretting = "GoodDay";
}else{
    gretting = "Good Evening"
}
document.getElementById("demo").innerHTML = gretting;