const channel = new BroadcastChannel("article_channel");
// Hàm xử lý sự kiện khi chọn tệp ảnh
localStorage.removeItem("articles");
document.getElementById("fileInput").addEventListener("change", (event) => {
  const files = event.target.files;
  if (files.length > 0) {
    const reader = new FileReader();
    reader.onload = (e) => {
      // Hiển thị ảnh tải lên
      const preview = document.getElementById("image-preview");
      preview.src = e.target.result;
      preview.alt = "Preview Image";
      preview.style.display = "block"; // Hiển thị ảnh
    };
    reader.readAsDataURL(files[0]); // Đọc tệp ảnh
  }
});

// Hàm thêm bài viết mới
document.querySelector(".add-btn").addEventListener("click", () => {
  const title = document.getElementById("title").value.trim();
  const category = document.getElementById("categories").value.trim();
  const moodSelect = document.getElementById("mood");
  const moods = Array.from(moodSelect.selectedOptions).map(option => option.value);
  const content = document.getElementById("content").value.trim();
  const statusElement = document.querySelector('input[name="status"]:checked');
  const fileInput = document.getElementById("fileInput");

  // Kiểm tra nếu thiếu thông tin
  if (!title || !category || moods.length === 0 || !content || !statusElement || fileInput.files.length === 0) {
    Swal.fire({
      icon: 'error',
      title: 'Thông báo lỗi',
      text: 'Vui lòng điền đầy đủ thông tin bài viết, bao gồm cả hình ảnh!',
    });
    return;
  }

  const status = statusElement.value;
  const file = fileInput.files[0];

  // Đọc tệp ảnh và thêm bài viết
  const reader = new FileReader();
  reader.onload = function (e) {
    const newArticle = {
      id: new Date().getTime(), // Tạo ID duy nhất
      title,
      category,
      moods,
      content,
      status,
      image: e.target.result, // Lưu URL ảnh
    };

    // Lưu bài viết vào Local Storage
    articles.push(newArticle);
    localStorage.setItem("articles", JSON.stringify(articles));

    // Gửi tín hiệu đồng bộ qua Broadcast Channel
    channel.postMessage({ type: "new_article", article: newArticle });

    // Hiển thị thông báo thành công
    Swal.fire({
      icon: 'success',
      title: 'Thành công!',
      text: 'Bài viết đã được thêm!',
      confirmButtonText: 'OK',
    });

    // Reset form
    document.getElementById("title").value = "";
    document.getElementById("categories").value = "";
    moodSelect.selectedIndex = -1; // Bỏ chọn mood
    document.getElementById("content").value = "";
    document.querySelectorAll('input[name="status"]').forEach(radio => {
      radio.checked = false;
    });
    fileInput.value = ""; // Xóa chọn tệp

    // Xóa ảnh xem trước
    const preview = document.getElementById("image-preview");
    preview.src = "";
    preview.style.display = "none"; // Ẩn ảnh xem trước
  };

  reader.readAsDataURL(file); // Đọc tệp ảnh
});

// Khi tải lại trang, đảm bảo dữ liệu từ Local Storage vẫn hiển thị
document.addEventListener("DOMContentLoaded", () => {
  articles = JSON.parse(localStorage.getItem("articles")) || [];
  console.log("Danh sách bài viết đã lưu:", articles);
});


