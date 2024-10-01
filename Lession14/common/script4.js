$(document).ready(function(){
    $("#HTML").click(function(){
        $("#HTML").css("background-color","red");
        $("#content").text("Đây là Html");
        $("#PHP, #CSS, #Jquery").css("background-color","#ccc");
    })
    $("#CSS").click(function(){
        $("#CSS").css("background-color","green");
        $("#content").text("Đây là Css");
        $("#PHP, #HTML, #Jquery").css("background-color","#ccc");
    })
    $("#Jquery").click(function(){
        $("#Jquery").css("background-color","blue");
        $("#content").text("Đây là Jquery");
        $("#PHP, #CSS, #HTML").css("background-color","#ccc");
    })
    $("#PHP").click(function(){ 
        $("#PHP").css("background-color","black");
        $("#content").text("Đây là PHP");
        $("#HTML, #CSS, #Jquery").css("background-color","#ccc");
    })
})
    