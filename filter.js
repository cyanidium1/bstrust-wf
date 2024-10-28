document.addEventListener('DOMContentLoaded', () => {
  let allProperties = [];
  let currentFilteredProperties = [];
  const listingsContainer = document.querySelector('.recent-all-listings-grid');
  const noElementsText = document.querySelector('.non_elements_wrapper'); // блок, который нужно показать или скрыть
  const showMoreButton = document.querySelector('[data-action="show-more"]'); // кнопка "Показать еще"
  const clearFilterButton = document.querySelector('.btn-clear');
  const pageSize = 4; // Количество объектов, которые нужно загружать за раз
  let currentPage = 0; // Текущая страница
  let totalLoaded = 0;

  fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer 0702bd476a5868df17f9eb47ae194a',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `{
      allObjects {
        id
        title
        _status
        _firstPublishedAt
        bathrooms
        bedrooms
        mainphoto {
          url
        }
        price
        area
        slug
        saleorrent
        typeofobj
        city
      }
    }`,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      allProperties = data.data.allObjects;
      currentFilteredProperties = allProperties;
      displayResults(currentFilteredProperties, listingsContainer, currentPage);
    })
    .catch((error) => console.error('Error:', error));

  const filterForm = document.getElementById('email-form-2');

  function displayResults(properties, container, page) {
    const start = page * pageSize;
    const end = start + pageSize;
    const paginatedProperties = properties.slice(start, end); // Пагинация

    // Проверяем, есть ли объекты после фильтрации
    if (paginatedProperties.length === 0) {
      noElementsText.style.display = 'block'; // показываем текст "Нету элементов"
      showMoreButton.style.display = 'none'; // скрываем кнопку "Показать еще"
      return;
    } else {
      noElementsText.style.display = 'none'; // скрываем текст
      showMoreButton.style.display = 'block'; // показываем кнопку
    }

    paginatedProperties.forEach((property) => {
      createListingElement(property, container);
    });

    totalLoaded += paginatedProperties.length;

    if (totalLoaded >= properties.length) {
      showMoreButton.style.display = 'none'; // Скрываем кнопку, если больше объектов нет
    } else {
      showMoreButton.style.display = 'block'; // Если объекты есть, показываем кнопку
    }
  }

  function filterProperties() {
    // Получаем выбранные значения фильтра и отфильтровываем массив
    const selectedCities = Array.from(
      filterForm.querySelectorAll('input[data-group="cities"]:checked'),
    ).map((cb) => cb.value);
    const selectedObjectType = filterForm.querySelector(
      'input[data-group="objectType"]:checked',
    )?.value;
    const selectedSaleOrRent = filterForm.querySelector(
      'input[data-group="saleOrRent"]:checked',
    )?.value;

    currentFilteredProperties = allProperties.filter((property) => {
      const cityMatch =
        selectedCities.length === 0 ||
        selectedCities.includes(property.city[0]);

      const objectTypeMatch =
        !selectedObjectType ||
        property.typeofobj
          .map((obj) => obj.toLowerCase().trim())
          .includes(selectedObjectType.toLowerCase().trim());

      const saleOrRentMatch =
        !selectedSaleOrRent || property.saleorrent.includes(selectedSaleOrRent);

      return cityMatch && objectTypeMatch && saleOrRentMatch;
    });

    // Сброс пагинации и отображение отфильтрованных данных
    currentPage = 0;
    totalLoaded = 0;
    listingsContainer.innerHTML = '';
    displayResults(currentFilteredProperties, listingsContainer, currentPage);
  }

  // Обработчик события на кнопку "Показать еще"
  showMoreButton.addEventListener('click', () => {
    currentPage++;
    displayResults(currentFilteredProperties, listingsContainer, currentPage);
  });

  function createListingElement(item, container) {
    const listing = document.createElement('div');
    listing.classList.add('w-dyn-item');
    listing.role = 'listitem';

    listing.innerHTML = `
      <a href="listing.html?slug=${item.slug}" data-w-id="5074cdb3-2e5a-e0fa-1193-8ced74df4c38" class="listing-wrapper w-inline-block">
            <div
                    style="
                      -webkit-transform: translate3d(0, 19rem, 0)
                        scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0)
                        skew(0, 0);
                      -moz-transform: translate3d(0, 19rem, 0) scale3d(1, 1, 1)
                        rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                      -ms-transform: translate3d(0, 19rem, 0) scale3d(1, 1, 1)
                        rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                      transform: translate3d(0, 19rem, 0) scale3d(1, 1, 1)
                        rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    "
                    class="listing-text"
                  >
              <h5 class="heading-3">${item.title}</h5>
              <div class="large-text bold">B&amp;S Trust 369</div>
              <div class="text-for-object-filter">Квартира</div>
              <div class="text-block-89">${
                item.saleorrent[0] === 'sale' ? 'Продажа' : 'Аренда'
              }</div>
            </div>
            <div style="
                      -webkit-transform: translate3d(0, 25rem, 0)
                        scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0)
                        skew(0, 0);
                      -moz-transform: translate3d(0, 25rem, 0) scale3d(1, 1, 1)
                        rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                      -ms-transform: translate3d(0, 25rem, 0) scale3d(1, 1, 1)
                        rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                      transform: translate3d(0, 25rem, 0) scale3d(1, 1, 1)
                        rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    "
                    class="listing-info-wrapper">
              <div class="listing-info">
                <img
                        src="https://cdn.prod.website-files.com/65e725860dff8ddbac53ef69/65e725860dff8ddbac53efe7_Bed icon.svg"
                        loading="lazy"
                        alt=""
                        class="listing-icon"
                      />
                <div class="large-text">${item.bedrooms}</div>
              </div>
              <div class="listing-info">
                <img
                        src="https://cdn.prod.website-files.com/65e725860dff8ddbac53ef69/65e725860dff8ddbac53efe8_Bathroom icon.svg"
                        loading="lazy"
                        alt=""
                        class="listing-icon"
                      />
                <div class="large-text">${item.bathrooms}</div>
              </div>
              <div class="listing-info">
                <img
                        src="https://cdn.prod.website-files.com/65e725860dff8ddbac53ef69/65e725860dff8ddbac53efe9_Area icon.svg"
                        loading="lazy"
                        alt=""
                        class="listing-icon"
                      />
                <div class="large-text">${item.area}м2</div>
              </div>
            </div>
            <h5 style="
                      -webkit-transform: translate3d(0, 19rem, 0)
                        scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0)
                        skew(0, 0);
                      -moz-transform: translate3d(0, 19rem, 0) scale3d(1, 1, 1)
                        rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                      -ms-transform: translate3d(0, 19rem, 0) scale3d(1, 1, 1)
                        rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                      transform: translate3d(0, 19rem, 0) scale3d(1, 1, 1)
                        rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    "
                    class="listing-price">${item.price} евро</h5>
            <div style="
                      -webkit-transform: translate3d(0, 19rem, 0)
                        scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0)
                        skew(0, 0);
                      -moz-transform: translate3d(0, 19rem, 0) scale3d(1, 1, 1)
                        rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                      -ms-transform: translate3d(0, 19rem, 0) scale3d(1, 1, 1)
                        rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                      transform: translate3d(0, 19rem, 0) scale3d(1, 1, 1)
                        rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    "
                    class="listing-location-wrapper">
              <img
                      src="https://cdn.prod.website-files.com/65e725860dff8ddbac53ef69/65e725860dff8ddbac53efea_Location icon.svg"
                      loading="lazy"
                      alt=""
                      class="listing-icon"
                    />
              <div class="large-text">${item.city[0]}</div>
            </div>
            <img src="${
              item.mainphoto ? item.mainphoto.url : '#'
            }" class="listing-image" alt="Listing Image" />
            <div
                    style="
                      -webkit-transform: translate3d(0, 19rem, 0)
                        scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0)
                        skew(0, 0);
                      -moz-transform: translate3d(0, 19rem, 0) scale3d(1, 1, 1)
                        rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                      -ms-transform: translate3d(0, 19rem, 0) scale3d(1, 1, 1)
                        rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                      transform: translate3d(0, 19rem, 0) scale3d(1, 1, 1)
                        rotateX(0) rotateY(0) rotateZ(0) skew(0, 0);
                    "
                    class="listing-overlay-wrapper"
                  >
            <div class="blur-overlay" style="opacity: 0.9"></div></div>
          </a>
    `;

    container.appendChild(listing);

    const listingWrapper = listing.querySelector('.listing-wrapper');
    listingWrapper.addEventListener('mouseover', () => {
      listingWrapper
        .querySelectorAll('[style*="translate3d"]')
        .forEach((el) => {
          el.style.transform = 'translate3d(0, 0, 0)';
        });
    });

    listingWrapper.addEventListener('mouseout', () => {
      listingWrapper
        .querySelectorAll('[style*="translate3d"]')
        .forEach((el) => {
          el.style.transform = el.style.transform.includes('25rem')
            ? 'translate3d(0, 25rem, 0)'
            : 'translate3d(0, 19rem, 0)';
        });
    });
  }

  // Обработчик события на кнопку "Сбросить фильтр"
  clearFilterButton.addEventListener('click', (e) => {
    e.preventDefault();

    // Сбрасываем все фильтры формы
    filterForm.reset();

    // Сбрасываем текущую страницу
    currentPage = 0;

    // Очищаем контейнер
    listingsContainer.innerHTML = '';

    // Сбрасываем отображаемые данные до полного списка объектов
    currentFilteredProperties = allProperties;

    // Обновляем счетчик totalLoaded
    totalLoaded = 0;

    // Отображаем все объекты
    displayResults(currentFilteredProperties, listingsContainer, currentPage);

    // Показываем кнопку "Показать еще"
    showMoreButton.style.display = 'block';

    // Скрываем текст "Нету элементов" при наличии данных
    if (currentFilteredProperties.length > 0) {
      noElementsText.style.display = 'none';
    }
  });

  filterForm.addEventListener('change', filterProperties);
});
