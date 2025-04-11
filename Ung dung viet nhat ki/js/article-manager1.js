document.addEventListener("DOMContentLoaded", () => {
    const articleData = JSON.parse(localStorage.getItem("selectedArticle"));

    if (articleData) {
      // Hiển thị thông tin bài viết
      document.querySelector(".post-info h3").innerText = articleData.title;
      document.querySelector(".post-info .summary").innerText =
        articleData.content;
      document.querySelector(".post img").src = articleData.image;

      // Hiển thị bình luận hiện tại
      const commentsContainer =
        document.getElementById("comments-container");
      commentsContainer.innerHTML = "";

      if (articleData.comments && articleData.comments.length > 0) {
        articleData.comments.forEach((comment) => {
          const commentElement = document.createElement("div");
          commentElement.classList.add("comment");
          commentElement.innerHTML = `
            <p><img src="${comment.avatar}" alt="Avatar" /> ${comment.text}</p>
            <p class="stats">Likes: ${comment.likes} 💓 Replies: ${comment.replies} 🗯</p>
          `;
          commentsContainer.appendChild(commentElement);
        });
      } else {
        commentsContainer.innerHTML = `<p>Không có bình luận nào.</p>`;
      }
    }

    // Xử lý form gửi bình luận mới
    const commentForm = document.getElementById("comment-form");
    commentForm.addEventListener("submit", (e) => {
      e.preventDefault();

      const commentText = document
        .getElementById("comment-text")
        .value.trim();
      if (!commentText) return;

      const newComment = {
        avatar: "../assets/images/default-avatar.png",
        text: commentText,
        likes: 0,
        replies: 0,
      };

      // Cập nhật bình luận vào selectedArticle
      if (!articleData.comments) {
        articleData.comments = [];
      }
      articleData.comments.push(newComment);
      localStorage.setItem("selectedArticle", JSON.stringify(articleData));

      // Cập nhật lại trong danh sách articles nếu có
      let allArticles = JSON.parse(localStorage.getItem("articles"));
      if (allArticles && Array.isArray(allArticles)) {
        const articleIndex = allArticles.findIndex(
          (article) => article.title === articleData.title
        );
        if (articleIndex !== -1) {
          allArticles[articleIndex] = articleData;
          localStorage.setItem("articles", JSON.stringify(allArticles));
        }
      }

      // Hiển thị bình luận mới ngay
      const commentElement = document.createElement("div");
      commentElement.classList.add("comment");
      commentElement.innerHTML = `
        <p><img src="${newComment.avatar}" alt="Avatar" /> ${newComment.text}</p>
        <p class="stats">Likes: ${newComment.likes} 💓 Replies: ${newComment.replies} 🗯</p>
      `;
      commentsContainer.appendChild(commentElement);

      // Reset ô nhập
      document.getElementById("comment-text").value = "";
    });
  });