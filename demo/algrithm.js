;(function(){

  var argrithm = {
    bubbleSort: function(arr){
      for(var i = 0; i < arr.length - 1; i++){
        for(var j = 1; j < arr.length - 2; j++){
          if(arr[j-1] > arr[j]){
            temp = arr[j];
            arr[j] = arr[j-1];
            arr[j-1] = temp;
          }
        }
      }
      return arr;
    },
    quickSort: function(arr){
      if(arr.length < 2) return arr;
      var middleIndex = Math.floor(arr.length / 2);
      var middleValue = arr.splice(middleIndex,1)[0];
      
      var left = [];
      var right = [];

      for(var i = 0; i < arr.length; i++){
        if(arr[i] < middleValue){
          left.push(arr[i]);
        }else{
          right.push(arr[i]);
        }
      }
      return this.quickSort(left).concat(middleValue,this.quickSort(right));
    },
    insertionSort(arr) {
      var len = arr.length;
      var preIndex, current;
      for (var i = 1; i < len; i++) {
          preIndex = i - 1;
          current = arr[i];
          while(preIndex >= 0 && arr[preIndex] > current) { // 找位置
              arr[preIndex + 1] = arr[preIndex];
              preIndex--;
          }
          arr[preIndex + 1] = current; // 插入
      }
      return arr;
    },
    shellSort: function(arr) {
      var len = arr.length;
      for (var fraction = Math.floor(len / 2); fraction > 0; 
          fraction = Math.floor(fraction / 2)) {
        for (var i = fraction; i < len; i++) {
          for (var j = i - fraction; j >= 0 && 
              arr[j] > arr[fraction + j]; j -= fraction) {
            var temp = arr[j];              
            arr[j] = arr[fraction + j];
            arr[fraction + j] = temp;
          }
        }
      }
      return arr;
    },
    selectionSort: function(arr){
      var minIndex, temp;
      for(var n = 0; n < arr.length - 1; n++){
        minIndex = n;
        for(var i = n + 1; i < arr.length; i++ ){
          if(arr[i] < arr[minIndex]){
            minIndex = i;
          }
        };

        temp = arr[minIndex];
        arr[minIndex] = arr[n];
        arr[n] = temp;
      }
      return arr;
    },
    binarySearch(data, dest){
      var h = data.length - 1,
          l = 0;
      while(l <= h){
        var m = Math.floor((h + l) / 2);
        if(data[m] == dest){
          return m;
        }
        if(dest > data[m]){
          l = m + 1;
        }else{
          h = m - 1;
        }
      }   
      return false;
    },
    factorial(num){
      if(num == 0){
        return 1;
      }else if(num == 1){
        return 1;
      }else{
        return num * this.factorial(num-1);
      }
    },

    convertToRoman(aNumber) {
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
    },
    uniteUnique() {
      var arr = [];
      //unite中参数总数目（即数组个数）
      var len = arguments.length;
      //控制遍历哪个数组（arguments[i],i可取0~len-1）
      var i = 0;  
      while(i < len){
        //控制遍历的数组arguments[i]中元素下标
        var j = 0;
        while(j < arguments[i].length){
          //如果 arr 中没有索引为 i 的数组参数中的索引为 j 的元素
          //将其 push 到 arr 中
          if(arr.indexOf(arguments[i][j]) == -1)
             arr.push(arguments[i][j]);
          j++;
        }
        i++;   
      }
      return arr;
    },
    flatten(arr) { //数组扁平化
      var self = this;
      arr = arr.reduce(function(acc, val){
        return acc.concat(Array.isArray(val) ? self.flatten(val) : val)
      },[])
      return arr;
    },
    spinalCase(str) {

      str = str.replace(/_/g," ")
            .replace(/([A-Z])/g," $1")
            .replace(/^\s/,"")
            .replace(/\s+/g,"-")
            .toLowerCase();
      
      return str;
    },
    sym() { // Symmetric Difference
      var argArr = [];
      for(var key in arguments){
        arguments[key] = arguments[key].sort();
        arguments[key] = [...new Set(arguments[key])];
        argArr.push(arguments[key]);
      }
      return argArr.reduce(function(pre, next){
        return add(pre, next)
      });
      
      function add(argFirst, argSecond){
        var total = argFirst.concat(argSecond);
        var same = argFirst.filter(function(item){
          return argSecond.indexOf(item) !== -1;
        });

        var res = total.filter(function(item){
          return same.indexOf(item) == -1;
        }); 
        return res;
      }

      return argArr;
    },
    checkCashRegister(price, cash, cid) {
      var change = cash*100 - price*100;
      // Here is your change, ma'am.
      var cashInDrawer = 0;
      var res = [];
      
      cid.map(function(item){
          cashInDrawer += item[1]*100;     
      });
      
      if(change === 0){
        return 'no change';
      }
      function amount(num){
        console.log('num:', (Math.floor(change/num)*num).toFixed(2));
        return (Math.floor(change/num)*num).toFixed(2);
      }
      if(change > cashInDrawer){
        return 'Insufficient Funds'; 
      } else if (change == cashInDrawer) {
        return 'Closed';
      } else {
        if(change >= 10000){
          if(amount(10000) <= cid[8][1]*100){
            res.push(['ONE HUNDRED', amount(10000)]);
            change -= Math.floor(change/10000)*10000;   
          } else {
            res.push(['ONE HUNDRED', cid[8][1]*100]);
            change -= cid[8][1]*100;  
          }

        }
        // debugger
        if(change >= 2000){
          if(amount(2000) <= cid[7][1]*100){       
            res.push(['TWENTY', amount(2000)]);
            change -= Math.floor(change/2000)*2000;
          } else{
            res.push(['TWENTY', cid[7][1]*100]);
            change -= cid[7][1]*100;
          }
        }
        
        if(change >= 1000){
          if(amount(1000) <= cid[6][1]*100){ 
            res.push(['TEN', amount(1000)]);
            change -= Math.floor(change/1000)*1000;
          } else {
            res.push(['TEN', cid[6][1]*100]);
            change -= cid[6][1]*100;        
          }
        }
        
        if(change >= 500){  
          if(amount(500) <= cid[5][1]*100){       
            res.push(['FIVE', amount(500)]);
            change -= Math.floor(change/500)*500;
          } else {
            res.push(['FIVE', cid[5][1]*100]);
            change -= cid[5][1]*100;        
          }
        }
        
        if(change >= 100){
          if(amount(100) <= cid[4][1]*100){ 
            res.push(['ONE', amount(100)]);
            change -= Math.floor(change/100)*100;
          }else{
            res.push(['ONE', cid[4][1]*100]);
            change -= cid[4][1]*100;        
          }
        }
        
        if(change >= 25){
          if(amount(25) <= cid[3][1]*100){  
            res.push(['QUARTER', amount(25)]);
            change -= Math.floor(change/25)*25;
          } else{
            res.push(['QUARTER', cid[3][1]*100]);
            change -= cid[3][1]*100;
          }
        }
        
        if(change >= 10){
          if(amount(10) <= cid[2][1]*100){  
            res.push(['DIME', amount(10)]);
            change -= Math.floor(change/10)*10;
          } else {
            res.push(['DIME', cid[2][1]*100]);
            change -= cid[2][1]*100;        
          }
        }
        
        if(change >= 5){
          if(amount(5) <= cid[1][1]*100){  
            res.push(['NICKEL', amount(5)]);
            change -= Math.floor(change/5)*5;
          }else{
            res.push(['NICKEL', cid[1][1]*100]);
            change -= cid[1][1]*100;        
          }
        }
        
        if(change >= 1){
          if(amount(1) <= cid[0][1]*100){  
            res.push(['PENNY', amount(1)]);
            change -= Math.floor(change/1)*1;
          } else {
            res.push(['PENNY', cid[0][1]*100]);
            change -= cid[0][1]*100;        
          }
        }
        
        if(change < 1){
          res.map(function(item){
            item[1] = item[1]/100;
          });
          return res;
        }
        return 'Insufficient Funds';
      }
    },

    updateInventory(arr1, arr2) {
      // All inventory must be accounted for or you're fired!
      arr1 = arr1.concat(arr2);
      
      var valueArr = [];
      var res = [];
      
      arr1.map(function(item){
        if(valueArr.indexOf(item[1]) == -1){
          valueArr.push(item[1]);
          res.push(item);
        }else{
          res.map(function(it){
            if(it[1] == item[1]){
              it[0] += item[0];
            }
          });
        }
      });
      
      res = res.sort(function(a, b){
        return a[1].charAt(0).charCodeAt() - b[1].charAt(0).charCodeAt();
      });
      
      return res;
    }

  };

  window.Argrithm = argrithm;

})(window);
