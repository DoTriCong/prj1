// Dữ liệu mẫu: Danh sách bài viết
const articles = [
    { id: 1, title: "A Productive Day at Work", category: "Daily Journal", mood: "😊 Happy", content: "Today was a productive day!", status: "Public" },
    { id: 2, title: "My First Job Interview", category: "Work & Career", mood: "😐 Neutral", content: "I had my first job interview today!", status: "Public" },
    { id: 3, title: "Overthinking Everything", category: "Personal Thoughts", mood: "😔 Sad", content: "Lately, I've been overthinking...", status: "Private" }
  ];
  
  let currentPage = 1; // Trang hiện tại
  const itemsPerPage = 5; // Số lượng bài viết hiển thị mỗi trang
  
  // Hiển thị danh sách bài viết
  function renderArticleList(filteredArticles) {
    const tbody = document.querySelector('.article-list tbody');
    tbody.innerHTML = ''; // Xóa danh sách cũ
  
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const articlesToDisplay = filteredArticles.slice(start, end);
  
    articlesToDisplay.forEach(article => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${article.id}</td>
        <td>${article.title}</td>
        <td>${article.category}</td>
        <td>${article.mood}</td>
        <td>${article.status}</td>
        <td>
          <button class="edit-btn" data-id="${article.id}">Edit</button>
          <button class="delete-btn" data-id="${article.id}">Delete</button>
        </td>
      `;
      tbody.appendChild(row);
    });
  
    updatePagination(filteredArticles);
  }
  
  // Cập nhật phân trang
  function updatePagination(filteredArticles) {
    const pagination = document.querySelector('.pagination .page-numbers');
    const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  
    pagination.innerHTML = ''; // Xóa nội dung cũ
    for (let i = 1; i <= totalPages; i++) {
      const pageNumber = document.createElement('span');
      pageNumber.textContent = i;
      pageNumber.classList.add(i === currentPage ? 'active' : '');
      pageNumber.addEventListener('click', () => {
        currentPage = i;
        renderArticleList(filteredArticles);
      });
      pagination.appendChild(pageNumber);
    }
  }
  
  // Thêm bài viết mới
  document.querySelector('.add-btn').addEventListener('click', () => {
    const title = document.getElementById('title').value.trim();
    const category = document.getElementById('categories').value.trim();
    const mood = document.getElementById('mood').value.trim();
    const content = document.getElementById('content').value.trim();
    const status = document.querySelector('input[name="status"]:checked')?.value;
  
    if (title && category && content && status) {
      const newArticle = {
        id: articles.length + 1,
        title,
        category,
        mood,
        content,
        status
      };
      articles.push(newArticle);
  
      renderArticleList(articles);
      alert('Bài viết đã được thêm thành công!');
    } else {
      alert('Vui lòng điền đầy đủ thông tin bài viết!');
    }
  });
  
  // Xóa bài viết
  document.querySelector('.article-list').addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-btn')) {
      const articleId = parseInt(event.target.getAttribute('data-id'));
      const index = articles.findIndex(article => article.id === articleId);
  
      if (index !== -1) {
        articles.splice(index, 1); // Xóa bài viết khỏi danh sách
        renderArticleList(articles);
        alert('Bài viết đã được xóa!');
      }
    }
  });
  
  // Sửa bài viết
  document.querySelector('.article-list').addEventListener('click', (event) => {
    if (event.target.classList.contains('edit-btn')) {
      const articleId = parseInt(event.target.getAttribute('data-id'));
      const article = articles.find(article => article.id === articleId);
  
      if (article) {
        const newTitle = prompt('Nhập tiêu đề mới:', article.title);
        const newCategory = prompt('Nhập danh mục mới:', article.category);
        const newContent = prompt('Nhập nội dung mới:', article.content);
        const newStatus = prompt('Nhập trạng thái mới (Public/Private):', article.status);
  
        if (newTitle && newCategory && newContent && newStatus) {
          article.title = newTitle.trim();
          article.category = newCategory.trim();
          article.content = newContent.trim();
          article.status = newStatus.trim();
  
          renderArticleList(articles);
          alert('Bài viết đã được chỉnh sửa!');
        } else {
          alert('Thông tin bài viết không được để trống!');
        }
      }
    }
  });
  
  // Khởi tạo danh sách bài viết
  renderArticleList(articles);
  