const hour = new Date().getHours()
let gretting;
if(hour < 18){
    gretting = "GoodDay";
}else{
    gretting = "Good Evening";
}
document.getElementBy("demo").innerHTML = gretting;