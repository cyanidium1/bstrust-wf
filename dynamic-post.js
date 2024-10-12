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
        allBlogposts(filter: {id: {eq: "${blogId}"}}) {
          mainphoto {
            url
          }
          maintext
          title
          id
          abouttag
          ytvideolink
        }
      }`,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const blogPost = data.data.allBlogposts[0];

      if (blogPost) {
        // Найдем элемент h2 внутри элемента с классом post-wrapper
        const postWrapper = document.querySelector('.post-wrapper');
        const headerElement = postWrapper.querySelector('h2.white');

        // Заменяем текст заголовка на динамическое значение
        if (headerElement) {
          headerElement.innerHTML = blogPost.title; // Подставляем динамическое значение заголовка
        }

        // Создаем элемент для изображения
        const imgElement = document.createElement('img'); // Создаем новый элемент img
        imgElement.src = blogPost.mainphoto.url; // Устанавливаем URL изображения
        imgElement.alt = 'Динамическое изображение'; // Устанавливаем альтернативный текст
        imgElement.loading = 'lazy'; // Устанавливаем lazy loading
        imgElement.className = 'current-post-image'; // Добавляем класс для стилей (если нужно)

        // Находим элемент current-post-image-wrapper
        const imageWrapper = postWrapper.querySelector(
          '.current-post-image-wrapper',
        );

        // Вставляем изображение в wrapper
        if (imageWrapper) {
          imageWrapper.innerHTML = ''; // Очищаем существующее содержимое
          imageWrapper.appendChild(imgElement); // Добавляем новое изображение
        }

        // Вставляем динамический блок с тегом abouttag
        const aboutTag = blogPost.abouttag; // Получаем содержимое поля abouttag
        const categoryWrapper = postWrapper.querySelector(
          '.current-post-category-wrapper',
        );

        if (categoryWrapper) {
          categoryWrapper.innerHTML = `<div class="current-post-category">${aboutTag}</div>`; // Вставляем динамический блок
        }

        // Вставляем динамический параграф в блок с классом rich-text-white w-richtext
        const richTextWhite = document.querySelector(
          '.rich-text-white.w-richtext',
        );
        if (richTextWhite) {
          richTextWhite.innerHTML = `<p>${blogPost.maintext}</p>`;
        }
      }
    })

    .catch((error) => console.error('Error:', error));
});
