// Dữ liệu mẫu: Danh sách các chủ đề
let categories = [
    { id: 1, name: "Daily Journal" },
    { id: 2, name: "Work & Career" },
    { id: 3, name: "Personal Thoughts" },
    { id: 4, name: "Emotions & Feelings" }
  ];
  
  // Hiển thị danh sách các chủ đề
  function renderCategoryList() {
    const categoryList = document.querySelector(".categories ul");
    categoryList.innerHTML = ""; // Xóa danh sách cũ
  
    // Duyệt qua danh sách các chủ đề và tạo các phần tử HTML
    categories.forEach(category => {
      const listItem = document.createElement("li");
      listItem.innerHTML = `
        <span>${category.name}</span>
        <button class="edit-btn" data-id="${category.id}">Edit</button>
        <button class="delete-btn" data-id="${category.id}">Delete</button>
      `;
      categoryList.appendChild(listItem);
    });
  }
  
  // Thêm chủ đề mới
  function addCategory() {
    const newCategoryName = prompt("Nhập tên chủ đề mới:");
    if (newCategoryName && newCategoryName.trim() !== "") {
      const newCategory = {
        id: categories.length > 0 ? categories[categories.length - 1].id + 1 : 1, // Tạo ID tự động
        name: newCategoryName.trim()
      };
      categories.push(newCategory);
      renderCategoryList(); // Hiển thị lại danh sách sau khi thêm
      alert("Chủ đề mới đã được thêm!");
    } else {
      alert("Tên chủ đề không được để trống!");
    }
  }
  
  // Chỉnh sửa chủ đề
  function editCategory(categoryId) {
    const category = categories.find(cat => cat.id === categoryId);
    if (category) {
      const newName = prompt("Nhập tên mới cho chủ đề:", category.name);
      if (newName && newName.trim() !== "") {
        category.name = newName.trim();
        renderCategoryList(); // Hiển thị lại danh sách sau khi chỉnh sửa
        alert("Chủ đề đã được chỉnh sửa!");
      } else {
        alert("Tên chủ đề không được để trống!");
      }
    }
  }
  
  // Xóa chủ đề
  function deleteCategory(categoryId) {
    const confirmDelete = confirm("Bạn có chắc muốn xóa chủ đề này?");
    if (confirmDelete) {
      categories = categories.filter(category => category.id !== categoryId);
      renderCategoryList(); // Hiển thị lại danh sách sau khi xóa
      alert("Chủ đề đã được xóa!");
    }
  }
    document.getElementById("add-article").addEventListener("click", () => {
        // Điều hướng sang trang tạo bài viết
        window.location.href = "article_manager.html";

        // Thay đổi đường dẫn tới trang bạn cần
    });
    
  // Xử lý sự kiện cho các nút Edit và Delete
  document.querySelector(".categories ul").addEventListener("click", (event) => {
    const target = event.target;
    const categoryId = parseInt(target.getAttribute("data-id"), 10); // Chuyển đổi ID về dạng số
  
    if (target.classList.contains("edit-btn")) {
      editCategory(categoryId);
    }
  
    if (target.classList.contains("delete-btn")) {
      deleteCategory(categoryId);
    }
  });
  
  // Kết nối sự kiện với phần tiêu đề (nếu bạn sử dụng onclick trong tiêu đề h2)
  document.querySelector(".category-header").addEventListener("click", () => {
    addCategory();
  });
  
  // Tự động gọi render danh sách ban đầu
  renderCategoryList();
  