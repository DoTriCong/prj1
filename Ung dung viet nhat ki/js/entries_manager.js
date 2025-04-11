// Dữ liệu mẫu: Danh sách các chủ đề
const categories = [
  { id: 1, name: "Technology" },
  { id: 2, name: "Travel" },
  { id: 3, name: "Education" },
];

let currentPage = 1; // Trang hiện tại
const itemsPerPage = 5; // Số mục mỗi trang

// Hiển thị danh sách các chủ đề
function renderCategoryList(filteredCategories) {
  const tbody = document.querySelector('.category-list tbody');
  tbody.innerHTML = '';
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const categoriesToDisplay = filteredCategories.slice(start, end);

  categoriesToDisplay.forEach(category => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${category.id}</td>
      <td>${category.name}</td>
      <td>
        <button class="edit-btn" data-id="${category.id}">Edit</button>
        <button class="delete-btn" data-id="${category.id}">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  updatePagination(filteredCategories);
}

// Cập nhật phân trang
function updatePagination(filteredCategories) {
  const pagination = document.querySelector('.pagination .page-numbers');
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  pagination.innerHTML = '';
  for (let i = 1; i <= totalPages; i++) {
    const pageNumber = document.createElement('span');
    pageNumber.textContent = i;
    pageNumber.classList.add(i === currentPage ? 'active' : '');
    pageNumber.addEventListener('click', () => {
      currentPage = i;
      renderCategoryList(filteredCategories);
    });
    pagination.appendChild(pageNumber);
  }

  document.querySelector('.prev-btn').disabled = currentPage === 1;
  document.querySelector('.next-btn').disabled = currentPage === totalPages;
}

// Xử lý nút Previous
document.querySelector('.prev-btn').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderCategoryList(categories);
  }
});

// Xử lý nút Next
document.querySelector('.next-btn').addEventListener('click', () => {
  const totalPages = Math.ceil(categories.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderCategoryList(categories);
  }
});

// Tìm kiếm danh mục
document.querySelector(".topbar input").addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm)
  );
  currentPage = 1; // Reset về trang đầu tiên khi tìm kiếm
  renderCategoryList(filteredCategories);
});

// Thêm chủ đề
document.querySelector('.add-category').addEventListener('click', () => {
  const input = document.querySelector('.category-form input');
  const categoryName = input.value.trim();

  if (categoryName) {
    const newCategory = {
      id: categories.length + 1,
      name: categoryName
    };
    categories.push(newCategory);
    input.value = '';
    renderCategoryList(categories);

    Swal.fire({
      icon: 'success',
      title: 'Thành công!',
      text: 'Chủ đề mới đã được thêm!',
      confirmButtonText: 'OK'
    });
  } else {
    Swal.fire({
      icon: 'error',
      title: 'Lỗi!',
      text: 'Vui lòng nhập tên chủ đề!',
      confirmButtonText: 'OK'
    });
  }
});

// Xóa chủ đề
document.querySelector('.category-list').addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const categoryId = parseInt(event.target.getAttribute('data-id'));
    const index = categories.findIndex(category => category.id === categoryId);

    if (index !== -1) {
      categories.splice(index, 1);
      renderCategoryList(categories);

      Swal.fire({
        icon: 'success',
        title: 'Thành công!',
        text: 'Chủ đề đã được xóa!',
        confirmButtonText: 'OK'
      });
    }
  }
});

// Chỉnh sửa chủ đề
document.querySelector('.category-list').addEventListener('click', (event) => {
  if (event.target.classList.contains('edit-btn')) {
    const categoryId = parseInt(event.target.getAttribute('data-id'));
    const category = categories.find(cat => cat.id === categoryId);

    if (category) {
      Swal.fire({
        title: 'Chỉnh sửa chủ đề',
        input: 'text',
        inputPlaceholder: 'Nhập tên mới cho chủ đề',
        inputValue: category.name,
        showCancelButton: true,
        confirmButtonText: 'Lưu',
        cancelButtonText: 'Hủy'
      }).then(result => {
        if (result.isConfirmed) {
          const newName = result.value.trim();
          if (newName) {
            category.name = newName;
            renderCategoryList(categories);
            Swal.fire({
              icon: 'success',
              title: 'Thành công!',
              text: 'Chủ đề đã được chỉnh sửa!',
              confirmButtonText: 'OK'
            });
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Lỗi!',
              text: 'Tên chủ đề không được để trống!',
              confirmButtonText: 'OK'
            });
          }
        }
      });
    }
  }
});

// Khởi chạy hiển thị danh sách
renderCategoryList(categories);
