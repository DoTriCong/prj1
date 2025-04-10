const avatar = document.querySelector('.avatar');
const dropdown = document.querySelector('.dropdown');

avatar.addEventListener('click', () => {
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});
document.getElementById("logout-link").addEventListener("click", (event) => {
    event.preventDefault(); // Ngăn chặn hành động mặc định của liên kết
  
    Swal.fire({
      title: "Bạn có chắc chắn muốn đăng xuất?",
      text: "Sau khi đăng xuất, bạn sẽ cần đăng nhập lại để sử dụng hệ thống.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy bỏ"
    }).then((result) => {
      if (result.isConfirmed) {
        // Xóa thông tin người dùng (nếu cần)
        localStorage.removeItem("currentUser"); // Xóa thông tin đăng nhập hiện tại
  
        // Hiển thị thông báo đăng xuất thành công
        Swal.fire({
          title: "Đăng xuất thành công!",
          text: "Bạn sẽ được điều hướng về trang chính.",
          icon: "success",
          confirmButtonText: "Tiếp tục",
        }).then(() => {
          // Điều hướng về trang index.html
          window.location.href = "index.html";
        });
      }
    });
  });
  
  