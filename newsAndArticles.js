document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const blogId = urlParams.get('id');

  fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer 0702bd476a5868df17f9eb47ae194a',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `{
        allBlogposts {
          mainphoto {
            url
          }
          maintext
          title
          id
          abouttag
        }
      }`,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const allBlogposts = data.data.allBlogposts;
      const otherBlogs = allBlogposts.filter((blog) => blog.id !== blogId); // Отфильтровываем текущую статью
      renderNewsAndArticles(otherBlogs);
    })
    .catch((error) => console.error('Error:', error));
});

function renderNewsAndArticles(blogs) {
  const listingsContainer = document.querySelector('.news-grid.w-dyn-items');

  blogs.forEach((blog) => {
    const blogItem = document.createElement('div');
    blogItem.setAttribute('role', 'listitem');
    blogItem.className = 'w-dyn-item';

    blogItem.innerHTML = `
      <a
        href="blog-posts.html?id=${blog.id}" 
        class="post-wrapper w-inline-block">
        <div class="post-image-wrapper">
          <img
            loading="lazy"
            src="${blog.mainphoto.url}"
            alt="${blog.title}"
            sizes="(max-width: 479px) 300px, (max-width: 767px) 63vw, (max-width: 991px) 44vw, 30vw"
            class="post-image"
          />
        </div>
        <div class="post-category-wrapper">
          <div class="post-category white">${blog.abouttag}</div>
        </div>
        <div class="post-info-wrapper">
          <div class="post-date-wrapper">
            <div class="post-date deep-cove"></div>
            <img
              src="https://cdn.prod.website-files.com/65e725860dff8ddbac53ef69/65e725860dff8ddbac53ef69/Ellipse 1.svg"
              loading="lazy"
              alt=""
            />
            <div class="post-read-time deep-cove">5 минут</div>
          </div>
          <div class="post-summary-wrapper">
            <div class="post-title deep-cove">
              ${blog.title}
            </div>
            <p class="small-paragraph deep-cove-80">
              ${blog.maintext.substring(0, 100)}...
            </p>
          </div>
          <div class="post-button-wrapper">
            <div class="post-button deep-cove">Подробнее</div>
            <img
              src="https://cdn.prod.website-files.com/65e725860dff8ddbac53ef69/65e725860dff8ddbac53ef69/Arrow.svg"
              loading="lazy"
              alt=""
              class="arrow-image"
            />
          </div>
        </div>
      </a>
    `;

    listingsContainer.appendChild(blogItem);
  });
}
