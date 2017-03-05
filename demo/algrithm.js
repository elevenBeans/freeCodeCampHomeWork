
function convertToRoman(aNumber) {
  if(aNumber < 1 || aNumber > 3999){  
     return false;  
  }
   
  var aArray = [1000,900,500,400,100,90,50,40,10,9,5,4,1];  
  var rArray = ["M","CM","D","CD","C","XC","L","XL","X","IX","V","IV","I"];  
  var rNumber = "";  

  for(var i=0; i<aArray.length; i++){  
      while(aNumber >= aArray[i]){  
          rNumber += rArray[i];  
          aNumber -= aArray[i];  
      }  
  }  

  return rNumber;  
}

convertToRoman(3600);