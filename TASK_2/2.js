function hitungVoucher(voucher, totalBelanja, uangDibayar) {
  let diskon = 0;
  let uangHarusDibayar = 0;
  let kembalian = 0;

  if (voucher === "DumbWaysJos") {
    if (totalBelanja >= 50000) {
      diskon = totalBelanja * 0.211;
      if (diskon > 20000) {
        diskon = 20000;
      }
    }
  } else if (voucher === "DumbWaysMantap") {
    if (totalBelanja >= 80000) {
      diskon = totalBelanja * 0.3;
      if (diskon > 40000) {
        diskon = 40000;
      }
    }
  }

  uangHarusDibayar = totalBelanja - diskon;
  kembalian = uangDibayar - uangHarusDibayar;

  console.log(`Uang yang harus dibayar: ${uangHarusDibayar}`);
  console.log(`Diskon: ${diskon}`);
  console.log(`Kembalian: ${kembalian}`);
}

// Contoh penggunaan
hitungVoucher("DumbWaysJos", 100000, 100000);
