const avatar = document.querySelector('.avatar');
const dropdown = document.querySelector('.dropdown');

avatar.addEventListener('click', () => {
  dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
});
document.getElementById("logout-link").addEventListener("click", (event) => {
  event.preventDefault(); 
  Swal.fire({
    title: "Bạn có muốn đăng xuất?",
    text: "Sau khi đăng xuất, bạn sẽ cần đăng nhập lại để sử dụng hệ thống.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Đồng ý",
    cancelButtonText: "Hủy bỏ"
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("currentUser");

      Swal.fire({
        title: "Đăng xuất thành công!",
        text: "Bạn sẽ được điều hướng về trang chính.",
        icon: "success",
        confirmButtonText: "Tiếp tục"
      }).then(() => {
        window.location.href = "index.html"; 
      });
    }
  });
});
document.getElementById("update-avatar-link").addEventListener("click", (e) => {
  e.preventDefault(); 
  window.location.href = "../pages/profile.html"; 
});

document.getElementById("change-password-link").addEventListener("click", (e) => {
  e.preventDefault();
  window.location.href = "../pages/profile.html"; 
});

if (document.querySelector("#avatar-modal")) {
  document.getElementById("save-avatar-btn").addEventListener("click", () => {
    const avatarInput = document.getElementById("avatar-input");
    if (avatarInput.files.length > 0) {
      const file = avatarInput.files[0];
      const reader = new FileReader();

      reader.onload = function (e) {
        const avatarElement = document.querySelector(".avatar");
        avatarElement.src = e.target.result;

        Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: "Ảnh đại diện đã được cập nhật!"
        });
        document.getElementById("avatar-modal").classList.add("hidden");
      };

      reader.readAsDataURL(file);
    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Vui lòng chọn ảnh để cập nhật!"
      });
    }
  });

  document.getElementById("cancel-avatar-btn").addEventListener("click", () => {
    document.getElementById("avatar-modal").classList.add("hidden");
  });
}

if (document.querySelector("#password-modal")) {
  document.getElementById("save-password-btn").addEventListener("click", () => {
    const currentPassword = document.getElementById("current-password").value.trim();
    const newPassword = document.getElementById("new-password").value.trim();

    if (currentPassword && newPassword) {
      const storedPassword = "123456";

      if (currentPassword === storedPassword) {
        Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: "Mật khẩu đã được đổi thành công!"
        });
        document.getElementById("password-modal").classList.add("hidden");
      } else {
        Swal.fire({
          icon: "error",
          title: "Lỗi!",
          text: "Mật khẩu hiện tại không đúng!"
        });
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Vui lòng điền đầy đủ thông tin!"
      });
    }
  });

  document.getElementById("cancel-password-btn").addEventListener("click", () => {
    document.getElementById("password-modal").classList.add("hidden");
  });
}
