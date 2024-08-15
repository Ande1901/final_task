function isPrime(num) {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i += 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
}

function generatePrimes(limit) {
  let primes = [];
  let num = 2;
  while (primes.length < limit) {
    if (isPrime(num)) {
      primes.push(num);
    }
    num++;
  }
  return primes;
}

function drawSikuSiku(size) {
  if (size <= 0 || size >= 10) {
    console.log("Input harus antara 0 < Alas/Tinggi < 10");
    return;
  }

  let totalPrimes = (size * (size + 1)) / 2;
  let primes = generatePrimes(totalPrimes);
  let index = 0;

  for (let i = 1; i <= size; i++) {
    let output = "";
    for (let j = 1; j <= i; j++) {
      output += primes[index] + " ";
      index++;
    }
    console.log(output.trim());
  }
}

// Contoh penggunaan:
drawSikuSiku(7);
