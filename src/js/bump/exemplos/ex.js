

class MyArray extends Array {
  customMethod() {
    return this.length;
  }
 
}

const myArr = new MyArray(1, 2, 3);
console.log(myArr.customMethod()); // Outputs: 3