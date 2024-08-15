function bubbleSortRecursive(arr, n = arr.length) {
  if (n == 1) return;

  for (let i = 0; i < n - 1; i++) {
    if (arr[i] > arr[i + 1]) {
      [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    }
  }

  bubbleSortRecursive(arr, n - 1);
}

function sortArray(arr) {
  bubbleSortRecursive(arr);

  let genap = arr.filter((num) => num % 2 === 0);
  let ganjil = arr.filter((num) => num % 2 !== 0);

  return {
    sortedArray: arr,
    genap: genap,
    ganjil: ganjil,
  };
}

// Contoh penggunaan:
let inputArray = [2, 24, 32, 22, 31, 100, 56, 21, 99, 7, 5, 37, 97, 25, 13, 11];
let result = sortArray(inputArray);

console.log("Array:", result.sortedArray.join(", "));
console.log("Ganjil:", result.ganjil.join(", "));
console.log("Genap:", result.genap.join(", "));
