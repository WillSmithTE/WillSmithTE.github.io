var result;
var inputStr = "";
$(document).ready(function(){
  $(".inputBtn").on("click",function(){
    document.getElementById("input").value += this.textContent;
    inputStr += this.value;
    setSubInput();
  });
  $("#equals").on("click",function(){
    inputStr = (document.getElementById("input").value=eval(inputStr));
    document.getElementById("subInput").value = "";
      });
  $("#clear").on("click",function(){
    inputStr = inputStr.substring(0,inputStr.length-1);
    input = document.getElementById("input").value;
    document.getElementById("input").value = input.substring(0,input.length-1);
  });
  $("#clearAll").on("click",function(){
    document.getElementById("input").value = "";
    inputStr = "";
  });
});
  function setSubInput(){
    try{
    if ((inputStr.split(/[+()*/-]/).length>1) &&(eval(inputStr))){
            document.getElementById("subInput").value =     eval(inputStr);
            return true;
    };
    } catch(err){
      document.getElementById("subInput").value = "";
      return false;
    }
  };
