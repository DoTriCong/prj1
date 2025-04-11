document.getElementById("update-avatar-link").addEventListener("click", (e) => {
    e.preventDefault(); // Ngăn chặn hành động mặc định
  
    Swal.fire({
      title: "Cập nhật ảnh đại diện",
      html: `
        <input type="file" id="avatar-input" accept="image/*" class="swal2-input">
      `,
      showCancelButton: true,
      confirmButtonText: "Lưu",
      cancelButtonText: "Hủy",
      preConfirm: () => {
        const avatarInput = document.getElementById("avatar-input").files[0];
        if (!avatarInput) {
          Swal.showValidationMessage("Vui lòng chọn ảnh để cập nhật!");
          return false; 
        }
        return avatarInput;
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const reader = new FileReader();
        reader.onload = (e) => {
          document.querySelector(".profile-avatar").src = e.target.result; 
          Swal.fire({
            icon: "success",
            title: "Thành công!",
            text: "Ảnh đại diện đã được cập nhật!"
          });
        };
        reader.readAsDataURL(result.value); // Đọc nội dung file ảnh
      }
    });
  });
  
  // Xử lý lưu ảnh đại diện
  document.getElementById("save-avatar-btn").addEventListener("click", () => {
    const avatarInput = document.getElementById("avatar-input");
    if (avatarInput.files.length > 0) {
      const file = avatarInput.files[0];
      const reader = new FileReader();
  
      reader.onload = function (e) {
        document.querySelector(".profile-avatar").src = e.target.result; // Hiển thị ảnh đại diện mới
        Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: "Ảnh đại diện đã được cập nhật!"
        });
        document.getElementById("avatar-modal").classList.add("hidden"); // Đóng modal
      };
  
      reader.readAsDataURL(file); // Đọc file ảnh
    } else {
      Swal.fire({
        icon: "error",
        title: "Lỗi!",
        text: "Vui lòng chọn ảnh để cập nhật!"
      });
    }
  });
  
  // Đóng modal cập nhật ảnh đại diện
  document.getElementById("cancel-avatar-btn").addEventListener("click", () => {
    const avatarModal = document.getElementById("avatar-modal");
    avatarModal.classList.add("hidden"); // Đóng modal
  });
  document.getElementById("change-password-link").addEventListener("click", (e) => {
    e.preventDefault();
  
    Swal.fire({
      title: "Đổi mật khẩu",
      html: `
        <input type="password" id="current-password" class="swal2-input" placeholder="Mật khẩu hiện tại">
        <input type="password" id="new-password" class="swal2-input" placeholder="Mật khẩu mới">
      `,
      showCancelButton: true,
      confirmButtonText: "Lưu",
      cancelButtonText: "Hủy",
      preConfirm: () => {
        const currentPassword = document.getElementById("current-password").value.trim();
        const newPassword = document.getElementById("new-password").value.trim();
  
        // Kiểm tra lỗi
        if (!currentPassword || !newPassword) {
          Swal.showValidationMessage("Vui lòng điền đầy đủ thông tin!");
        } else if (currentPassword !== "123456") { // Giả lập mật khẩu hiện tại
          Swal.showValidationMessage("Mật khẩu hiện tại không đúng!");
        } else {
          return { newPassword }; // Trả về mật khẩu mới nếu hợp lệ
        }
      },
    }).then((result) => {
      if (result.isConfirmed) {
        // Cập nhật mật khẩu mới vào Local Storage
        const currentUser = JSON.parse(localStorage.getItem("currentUser")) || {};
        currentUser.password = result.value.newPassword; // Thay mật khẩu mới
        localStorage.setItem("currentUser", JSON.stringify(currentUser)); // Lưu lại
  
        Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: "Mật khẩu đã được đổi thành công!"
        });
      }
    });
  });
  
 // Xử lý đổi mật khẩu
document.getElementById("save-password-btn").addEventListener("click", () => {
    const currentPassword = document.getElementById("current-password").value.trim();
    const newPassword = document.getElementById("new-password").value.trim();
  
    if (currentPassword && newPassword) {
      // Lấy thông tin tài khoản từ Local Storage
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  
      if (currentUser && currentPassword === currentUser.password) {
        // Cập nhật mật khẩu mới
        currentUser.password = newPassword;
        localStorage.setItem("currentUser", JSON.stringify(currentUser)); // Lưu lại vào Local Storage
  
        Swal.fire({
          icon: "success",
          title: "Thành công!",
          text: "Mật khẩu đã được đổi thành công!"
        });
        document.getElementById("password-modal").classList.add("hidden"); // Đóng modal
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
  
  
  // Đóng modal đổi mật khẩu
  document.getElementById("cancel-password-btn").addEventListener("click", () => {
    const passwordModal = document.getElementById("password-modal");
    passwordModal.classList.add("hidden"); // Đóng modal
  });
  