
//                  callback I
// str1 = 'Str1';


// let func1 = () => {
//     console.log("Func 1 ");
// }

// let func2 = ( (callback) => {

    
    
//     callback();

//     console.log("Func 2 with callback")
// })

// func2(func1);


//                  callback         II

// let add = (a,b) =>{
//     return a+b;
// };

// let multiply = (a,b) =>{
//     return a*b;
// }

// let calc = (num1, num2, callback) => {
//     return callback(num1,num2);
// };

// console.log(calc(2,3,multiply))


//                  callback         III
function printList(callback) {
    // do your printList work
    console.log('printList is done');
    for(i = 0;i<5;i++){
        callback();
    }
  }
  
  function updateDB(callback) {
    // do your updateDB work
    console.log('updateDB is done');
    callback()
  }
  
  function getDistanceWithLatLong(callback) {
    // do your getDistanceWithLatLong work
    console.log('getDistanceWithLatLong is done');
    callback();
  }
  
  function runSearchInOrder(callback) {
    console.log('1');
      getDistanceWithLatLong(function() {
          updateDB(function() {
              printList(callback);
          });
      });
      console.log('2');
  }
  
  runSearchInOrder(function(){console.log('finished')});