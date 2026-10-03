let memberCode = "";
let memberTier = "";
let lockerZone = "";
let isMemberValid = false;

let towelQty = 0;
let lockQty = 0;
let depositFee = 0;
let rentalFee = 0;

let menu = true;

while (menu) {
  console.log("HE THONG PHAN BO TU DO VA VAT TU GYM");
  console.log("1. Tiep nhan va xac thuc the hoi vien");
  console.log("2. Ghi nhan vat tu muon them");
  console.log("3. In phieu ban giao va phu phi");
  console.log("4. Dong ca va thoat");

  let choice = prompt("Nhap lua chon (1 - 4):");

  if (choice === null || choice.trim() === "") {
    console.log("Loi: Vui long chon tu 1 den 4!");
    continue;
  }

  switch (choice.trim()) {
    case "1": {
      memberCode = "";
      memberTier = "";
      lockerZone = "";
      isMemberValid = false;
      towelQty = 0;
      lockQty = 0;
      depositFee = 0;
      rentalFee = 0;

      let input = prompt("Nhap ma the hoi vien (VD: GYM-VIP-001 hoac GYM-STD-002):");

      if (input === null || input.trim() === "") {
        console.log("Loi: Chua nhap ma the hoi vien!");
        break;
      }

      let code = input.trim().toUpperCase();

      if (!code.startsWith("GYM-") || code.length < 8) {
        console.log("Loi: Ma the khong hop le!");
        break;
      }

      if (code.includes("VIP")) {
        memberTier = "VIP";
        lockerZone = "ZONE-A";
      } else {
        memberTier = "STANDARD";
        lockerZone = "ZONE-B";
      }

      memberCode = code;
      isMemberValid = true;
      console.log("Xac thuc the thanh cong!");
      console.log("Ma the: " + memberCode);
      console.log("Hang the: " + memberTier);
      console.log("Phan bo tu do: " + lockerZone);
      break;
    }

    case "2": {
      if (!isMemberValid) {
        console.log("Loi: Vui long xac thuc the o muc 1 truoc!");
        break;
      }

      let logInput = prompt("Nhap chuoi vat tu muon (VD: TOWEL:2|LOCK:1):");

      if (logInput === null || logInput.trim() === "") {
        console.log("Khong co vat tu muon them.");
        break;
      }

      let logStr = logInput.trim().toUpperCase();
      towelQty = 0;
      lockQty = 0;

      let towelIndex = logStr.indexOf("TOWEL:");
      if (towelIndex !== -1) {
        let start = towelIndex + 6;
        let end = logStr.indexOf("|", start);
        if (end === -1) {
          end = logStr.length;
        }
        let qty = Number(logStr.slice(start, end));
        if (!isNaN(qty) && qty > 0) {
          towelQty = qty;
        }
      }

      let lockIndex = logStr.indexOf("LOCK:");
      if (lockIndex !== -1) {
        let start = lockIndex + 5;
        let end = logStr.indexOf("|", start);
        if (end === -1) {
          end = logStr.length;
        }
        let qty = Number(logStr.slice(start, end));
        if (!isNaN(qty) && qty > 0) {
          lockQty = qty;
        }
      }

      console.log("Ghi nhan vat tu thanh cong:");
      console.log("So luong khan tam muon: " + towelQty);
      console.log("So luong khoa phu muon: " + lockQty);
      break;
    }

    case "3": {
      if (!isMemberValid) {
        console.log("Loi: Chua xac thuc the, khong the in phieu!");
        break;
      }

      let freeTowel = 0;
      let billTowelQty = towelQty;

      if (memberTier === "VIP") {
        freeTowel = 1;
        if (billTowelQty > 0) {
          billTowelQty = billTowelQty - 1;
        }
      }

      rentalFee = (billTowelQty * 20000) + (lockQty * 15000);

      if (towelQty > 0 || lockQty > 0) {
        depositFee = 50000;
      } else {
        depositFee = 0;
      }

      let totalCost = rentalFee + depositFee;

      console.log("PHIEU BAN GIAO TU DO VA VAT TU");
      console.log("Ma hoi vien: " + memberCode);
      console.log("Hang hoi vien: " + memberTier);
      console.log("Khu vuc tu do: " + lockerZone);
      if (freeTowel > 0) {
        console.log("Uu dai VIP: Mien phi 1 khan tam lon");
      }
      console.log("Khan tam muon tinh phi: " + billTowelQty + " cai (" + (billTowelQty * 20000) + " VND)");
      console.log("Khoa phu muon: " + lockQty + " cai (" + (lockQty * 15000) + " VND)");
      console.log("Tien thue vat tu: " + rentalFee + " VND");
      console.log("Tien dat coc (hoan tra khi tra do): " + depositFee + " VND");
      console.log("Tong tien phai nop: " + totalCost + " VND");

      isMemberValid = false;
      memberCode = "";
      break;
    }

    case "4": {
      console.log("Dong ca lam viec thanh cong. Tam biet!");
      menu = false;
      break;
    }

    default: {
      console.log("Loi: Lua chon khong hop le, vui long chon 1 den 4!");
      break;
    }
  }
}