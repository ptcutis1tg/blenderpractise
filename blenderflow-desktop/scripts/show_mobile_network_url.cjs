const os = require('os');

function getLocalIpAddresses() {
  const interfaces = os.networkInterfaces();
  const addresses = [];

  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      // Filter for IPv4 and non-internal addresses
      if (iface.family === 'IPv4' && !iface.internal) {
        addresses.push({ name, address: iface.address });
      }
    }
  }

  return addresses;
}

const ips = getLocalIpAddresses();
const port = 5173;

console.log('===========================================================');
console.log('   BLENDERFLOW 5.3 - HƯỚNG DẪN TRUY CẬP TRÊN MOBILE (WEB)  ');
console.log('===========================================================');
console.log('\n📱 ĐẢM BẢO ĐIỆN THOẠI & MÁY TÍNH DÙNG CHUNG MẠNG WI-FI!');
console.log('Mở trình duyệt (Safari / Chrome) trên điện thoại và truy cập:\n');

if (ips.length > 0) {
  ips.forEach((ip, idx) => {
    console.log(`  👉 Kết nối ${idx + 1} (${ip.name}): http://${ip.address}:${port}`);
  });
} else {
  console.log(`  👉 http://localhost:${port}`);
}

console.log('\n===========================================================');
console.log('Giao diện đã được tối ưu 100% cho điện thoại di động:');
console.log('  ✓ Thanh điều hướng đáy (Bottom Navigation Bar)');
console.log('  ✓ Cảm ứng 1 ngón xoay 3D, 2 ngón chụm/zoom (Pinch-to-zoom)');
console.log('  ✓ Đọc toàn bộ 26 bài học giáo trình chuẩn responsive');
console.log('===========================================================\n');
