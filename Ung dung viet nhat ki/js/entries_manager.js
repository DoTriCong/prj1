// Dữ liệu mẫu: Danh sách các chủ đề
const categories = [
    { id: 1, name: "Technology" },
    { id: 2, name: "Travel" },
    { id: 3, name: "Education" }
  ];
  
  let currentPage = 1; // Trang hiện tại
  const itemsPerPage = 5; // Số lượng chủ đề hiển thị mỗi trang
  
  // Hiển thị danh sách các chủ đề
  function renderCategoryList(filteredCategories) {
    const tbody = document.querySelector('.category-list tbody');
    tbody.innerHTML = ''; // Xóa danh sách cũ
  
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
  
    pagination.innerHTML = ''; // Xóa nội dung cũ
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
  }
  
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
      input.value = ''; // Xóa nội dung ô input
      renderCategoryList(categories);
      alert('Chủ đề mới đã được thêm!');
    } else {
      alert('Vui lòng nhập tên chủ đề!');
    }
  });
  
  // Xóa chủ đề
  document.querySelector('.category-list').addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
      const categoryId = parseInt(event.target.getAttribute('data-id'));
      const index = categories.findIndex(category => category.id === categoryId);
  
      if (index !== -1) {
        categories.splice(index, 1); // Xóa chủ đề khỏi danh sách
        renderCategoryList(categories);
        alert('Chủ đề đã được xóa!');
      }
    }
  });
  
  // Chỉnh sửa chủ đề
  document.querySelector('.category-list').addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-btn')) {
      const categoryId = parseInt(event.target.getAttribute('data-id'));
      const category = categories.find(cat => cat.id === categoryId);
  
      if (category) {
        const newName = prompt('Nhập tên mới cho chủ đề:', category.name);
        if (newName && newName.trim()) {
          category.name = newName.trim();
          renderCategoryList(categories);
          alert('Chủ đề đã được chỉnh sửa!');
        } else {
          alert('Tên chủ đề không được để trống!');
        }
      }
    }
  });
  
  // Khởi tạo danh sách chủ đề
  renderCategoryList(categories);
  