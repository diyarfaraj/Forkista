import uniqid from "uniqid";

export default class List {
  constructor() {
    this.items = [];
  }

  addItem(count, unit, ingredient) {
    const item = {
      id: uniqid(),
      count,
      unit,
      ingredient
    };

    this.items.push(item);
    return item;
  }
  deleteItem(id) {
    const index = this.items.findIndex(el => el.id === id);
    //[2,4,6] splice[1, 1] --> returns 4, and original array is mutated [2,6]
    //[2,4,6] slice[1, 1] --> returns 4, and original array is not mutated [2,4,6]
    this.items.splice(index, 1);
  }

  updateCount(id, newCount) {
    this.items.find(el => el.id === id).count = newCount;
  }
}

let num = 0;

while (num < 100) {
  num += 1;

  if (num % 3 === 0 && num % 5 === 0) {
    console.log("FIZZBUZZ");
  } else if (num % 3 === 0) {
    console.log("fizz");
  } else if (num % 5 === 0 && num % 3 !== 0) {
    console.log("buzz");
  } else {
    console.log(num);
  }
}
