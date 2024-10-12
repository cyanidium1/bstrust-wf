document.addEventListener('DOMContentLoaded', () => {
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
      renderBlogs(allBlogposts);
    })
    .catch((error) => console.error('Error:', error));
});

function renderBlogs(blogs) {
  const listingsContainer = document.querySelector('.news-grid.w-dyn-items');

  blogs.forEach((blog) => {
    const blogItem = document.createElement('div');
    blogItem.setAttribute('role', 'listitem');
    blogItem.className = 'collection-item-2 w-dyn-item';

    blogItem.innerHTML = `
      <div
                id="w-node-_03265bc8-0bb9-7fb1-95f7-fa60c1bee12f-c1bee128"
                role="listitem"
                class="collection-item-2 w-dyn-item"
              >
      <a
        href="blog-posts.html?id=${blog.id}" 
        class="post-wrapper w-inline-block">
        <div class="post-image-wrapper">
          <img
            loading="lazy"
            src="${blog.mainphoto.url}"
            alt="${blog.title}"
            sizes="(max-width: 479px) 100vw, (max-width: 767px) 63vw, (max-width: 991px) 46vw, 30vw"
            class="post-image"
          />
        </div>
        <div class="post-category-wrapper">
          <div class="post-category white">${blog.abouttag}</div>
        </div>
        <div class="post-info-wrapper">
          <div class="div-block-427">
            <div class="post-date-wrapper">
              <div class="post-date deep-cove">Сегодня</div>
              <div class="post-read-time deep-cove">5 минут</div>
            </div>
            <div class="post-summary-wrapper">
              <div class="post-title deep-cove text-align-left">
                ${blog.title}
              </div>
              <p class="small-paragraph deep-cove text-align-left">
                ${blog.maintext.substring(0, 100)}...
              </p>
            </div>
          </div>
          <div class="post-button-wrapper">
            <div class="post-button deep-cove">Подробнее</div>
            <img
              src="https://cdn.prod.website-files.com/65e725860dff8ddbac53ef69/65e725860dff8ddbac53effc_Arrow.svg"
              loading="lazy"
              alt=""
              class="arrow-image"
            />
          </div>
        </div>
      </a>
       </div>
    `;

    listingsContainer.appendChild(blogItem);
  });
}
