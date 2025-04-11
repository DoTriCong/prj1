const users = JSON.parse(localStorage.getItem('users')) || [];

// Cấu hình phân trang
const itemsPerPage = 5;
let currentPage = 1;

// Hiển thị danh sách user
function renderUserList(filteredUsers) {
  const tbody = document.querySelector('.user-list tbody');
  tbody.innerHTML = ''; 

  // Tính toán số lượng user cần hiển thị theo phân trang
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const usersToDisplay = filteredUsers.slice(start, end);

  if (usersToDisplay.length === 0) {
    tbody.innerHTML = '<tr><td colspan="5">Không có người dùng nào!</td></tr>';
  } else {
    usersToDisplay.forEach(user => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${user.name || 'Không xác định'}</td>
        <td>${user.status || 'Không xác định'}</td>
        <td>${user.email || 'Không xác định'}</td>
        <td>
          <a href="#" class="block-btn">block</a> 
          <a href="#" class="unblock-btn">unblock</a>
        </td>
        <td></td>
      `;
      tbody.appendChild(row);
    });
  }

  updatePagination(filteredUsers);
}

// Cập nhật thanh phân trang
function updatePagination(filteredUsers) {
  const pagination = document.querySelector('.pagination .page-numbers');
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  pagination.innerHTML = ''; 
  for (let i = 1; i <= totalPages; i++) {
    const pageNumber = document.createElement('span');
    pageNumber.textContent = i;
    pageNumber.classList.add(i === currentPage ? 'active' : '');
    pageNumber.addEventListener('click', () => {
      currentPage = i;
      renderUserList(filteredUsers);
    });
    pagination.appendChild(pageNumber);
  }

  document.querySelector('.prev-btn').style.visibility = currentPage > 1 ? 'visible' : 'hidden';
  document.querySelector('.next-btn').style.visibility = currentPage < totalPages ? 'visible' : 'hidden';
}

document.querySelector('.prev-btn').addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    renderUserList(users);
  }
});

document.querySelector('.next-btn').addEventListener('click', () => {
  const totalPages = Math.ceil(users.length / itemsPerPage);
  if (currentPage < totalPages) {
    currentPage++;
    renderUserList(users);
  }
});

// Tìm kiếm user theo tên
document.querySelector('.topbar input').addEventListener('input', (event) => {
  const searchValue = event.target.value.toLowerCase().trim();

  // Lọc danh sách user theo từ khóa tìm kiếm
  const filteredUsers = users.filter(user =>
    user.name && user.name.toLowerCase().includes(searchValue)
  );

  if (filteredUsers.length === 0) {
    const tbody = document.querySelector('.user-list tbody');
    tbody.innerHTML = '<tr><td colspan="5">Không tìm thấy người dùng phù hợp!</td></tr>';
    updatePagination(filteredUsers); // Cập nhật phân trang
    return;
  }

  currentPage = 1; // Reset về trang đầu tiên khi tìm kiếm
  renderUserList(filteredUsers);
});

// Sắp xếp theo tên user
document.querySelector('.chevrons-up').addEventListener('click', () => {
  users.sort((a, b) => a.name.localeCompare(b.name));
  renderUserList(users);
});

document.querySelector('.chevrons-down').addEventListener('click', () => {
  users.sort((a, b) => b.name.localeCompare(a.name)); 
  renderUserList(users);
});
renderUserList(users);
