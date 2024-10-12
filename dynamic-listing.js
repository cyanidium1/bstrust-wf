document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');
  fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      Authorization: 'Bearer 0702bd476a5868df17f9eb47ae194a',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: `{
      allObjects(filter: {slug: {eq: "${slug}"}}) {
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
        description
        allphotos {
          url
        }
      }
    }`,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const detailContainer = document.getElementById('listing-detail');
      const detailContainerTwo = document.getElementById('detailContainerTwo');
      const item = data.data.allObjects[0];

      detailContainer.innerHTML = `
                   <div class="container">
        <div class="current-listing-wrapper">
          <div class="listing-menu-wrapper">
            <a href="./index.html" class="listing-menu-link deep-cove"
              >Главная /</a
            ><a
              href="./locations/durres.html"
              class="listing-menu-link deep-cove"
              >Дуррес /</a
            ><a href="./types/rent.html" class="listing-menu-link deep-cove"
              >Продажа</a
            >
          </div>
          <h3 class="deep-cove">
           ${item?.title}
          </h3>
          <div class="listing-images-wrapper">
            <a href="${item?.mainphoto.url}" data-fancybox="gallery" class="lightbox-link w-inline-block w-lightbox"
              ><img
                alt=""
                loading="lazy"
                src=" ${item?.mainphoto.url}"
              />
            </a>
            <div class="w-dyn-list">

              <div role="list" class="listing-gallery-grid w-dyn-items">

             ${item.allphotos
               .map(
                 (photo) => `
              <div role="listitem" class="listing-item w-dyn-item w-dyn-repeater-item">
                <a href="${photo.url}" data-fancybox="gallery" class="listing-lightbox-link w-inline-block w-lightbox">
                  <img
                    alt=""
                    loading="lazy"
                    src="${photo.url}"
                    sizes="(max-width: 479px) 42vw, (max-width: 767px) 23vw, 100vw"
                    class="listing-gallery-image"
                  />
                </a>
              </div>
            `,
               )
               .join('')}   
 
              
              </div>
              <div class="w-dyn-hide w-dyn-empty">
                <div>No items found.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
                `;

      detailContainerTwo.innerHTML = `<div
            id="w-node-b00dd244-0300-0df5-b063-846d8602fefe-ac53efb4"
            class="listing-information-wrapper"
          >
            <div class="listing-details-wrapper">
              <div class="listing-wrapper horisontal">
                <div class="listing-detail">
                  <img
                    src="https://cdn.prod.website-files.com/65e725860dff8ddbac53ef69/65e725860dff8ddbac53f014_Bed icon bllue.svg"
                    loading="lazy"
                    alt=""
                    class="listing-detail-image"
                  />
                  <div class="listing-detail-text deep-cove">${item.bedrooms}</div>
                </div>
                <div class="listing-detail">
                  <img
                    src="https://cdn.prod.website-files.com/65e725860dff8ddbac53ef69/65e725860dff8ddbac53f016_Bathroom icon blue.svg"
                    loading="lazy"
                    alt=""
                    class="listing-detail-image"
                  />
                  <div class="listing-detail-text deep-cove">${
                    item.bathrooms
                  }</div>
                </div>
                <div class="listing-detail"
                style="
                 font-family: 'Work Sans', sans-serif;
                 font-size: 1.25rem;
                 line-height: 1.3;
                 color: #333;
                 margin: 0;
                 padding: 10px 0;
                 text-align: center;
                 ">
                  <img
                    src="https://cdn.prod.website-files.com/65e725860dff8ddbac53ef69/65e725860dff8ddbac53f015_Area icon blue.svg"
                    loading="lazy"
                    alt=""
                    class="listing-detail-image"
                  />
                  <div
                    class="listing-detail-text deep-cove w-dyn-bind-empty"
                  ></div>
                  ${item.area} м²
                </div>
              </div>
            </div>
            <div class="line gradient-deep-cove listing"></div>
            <div class="rich-text-block-2 w-richtext">
              <p>${item.description}</p>
             
              <p><strong>Цена: ${item.price} евро</strong></p>
              <p>‍</p>
              <p>
                <strong
                  >Если остались вопросы, позвоните или напишите нам:</strong
                >
              </p>
              <p>+355 69 312 2813 (Telegram)</p>
              <p>+38 093 512 8547 (WhatsApp)</p>
              <p>‍</p>
            </div>
          </div>
           <div
            id="w-node-f658bb3c-9639-6d99-8e13-17632fc49371-ac53efb4"
            class="listing-side-bar-wrapper"
          >
            <h5 class="deep-cove-copy">${item.price} евро</h5>
            <div class="property-type-wrapper">
              <div class="text-block-90-copy-copy">Связаться с нами</div>
            </div>
            <div class="listing-side-bar-form w-form">
              <form
                id="wf-form-form-of-house-2"
                name="wf-form-form-of-house-2"
                data-name="form of house"
                method="post"
                class="listing-form"
                data-wf-page-id="65e725860dff8ddbac53efb4"
                data-wf-element-id="1dd85aaf-c52f-8901-fee4-85b27b4ad96b"
              >
                <div class="input-form">
                  <input
                    class="listing-text-field w-input"
                    maxlength="256"
                    name="name"
                    data-name="Name"
                    placeholder="Полное имя"
                    type="text"
                    id="name"
                    required=""
                  />
                  <div class="listing-form-icon-wrapper">
                    <img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/65e725860dff8ddbac53ef69/65e725860dff8ddbac53f017_name.svg"
                      alt=""
                      class="listing-form-icon"
                    />
                  </div>
                </div>
                <div class="input-form">
                  <input
                    class="listing-text-field w-input"
                    maxlength="256"
                    name="name-2"
                    data-name="Name 2"
                    placeholder="Email или мессенджер"
                    type="email"
                    id="name-2"
                    required=""
                  />
                  <div class="listing-form-icon-wrapper">
                    <img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/65e725860dff8ddbac53ef69/65e725860dff8ddbac53f011_email.svg"
                      alt=""
                      class="listing-form-icon small-icon"
                    />
                  </div>
                </div>
                <div class="input-form">
                  <input
                    class="listing-text-field w-input"
                    maxlength="256"
                    name="name-3"
                    data-name="Name 3"
                    placeholder="Телефон"
                    type="tel"
                    id="name-3"
                    required=""
                  />
                  <div class="listing-form-icon-wrapper">
                    <img
                      loading="lazy"
                      src="https://cdn.prod.website-files.com/65e725860dff8ddbac53ef69/65e725860dff8ddbac53f013_phone.svg"
                      alt=""
                      class="listing-form-icon small-icon"
                    />
                  </div>
                </div>
                <div fs-cmsselect-element="text-value" class="type-of-house">
                  Для АРЕНДЫ квартира 1+1 с боковым видом на море и скалу Кавая
                </div>
                <div
                  fs-cmsselect-element="text-value-2"
                  class="location-to-telegram"
                >
                  Durres
                </div>
                <div fs-cmsselect-element="text-value-3" class="type">
                  Аренда
                </div>
                <select
                  id="apartments"
                  name="apartments"
                  data-name="apartments"
                  fs-cmsselect-element="select"
                  class="select-field w-select"
                ></select
                ><select
                  id="location"
                  name="location"
                  data-name="location"
                  fs-cmsselect-element="select-2"
                  class="select-field-2 w-select"
                ></select
                ><select
                  id="sell-or-rent"
                  name="sell-or-rent"
                  data-name="sell-or-rent"
                  fs-cmsselect-element="select-3"
                  class="select-field-3 w-select"
                ></select
                ><input
                  type="submit"
                  data-wait="Подождите..."
                  class="primary-button listing-side-bar w-button"
                  value="Отправить заявку"
                />
              </form>
              <div class="success-message w-form-done">
                <div class="text-block-91">Спасибо! Ваша заявка получена!</div>
              </div>
              <div class="error-message w-form-fail">
                <div class="text-block-92">
                  Что-то пошло не так. Свяжитесь с нами по телефону. Спасибо!
                </div>
              </div>
            </div>
          </div>
          `;
    })

    .catch((error) => console.error('Error:', error));
});
