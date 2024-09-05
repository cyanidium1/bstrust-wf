document.addEventListener("DOMContentLoaded", () => {
  fetch("https://graphql.datocms.com/", {
    method: "POST",
    headers: {
      Authorization: "Bearer 0702bd476a5868df17f9eb47ae194a",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        allObjects {
          id
          title
          bathrooms
          bedrooms
          city {
            city
          }
          mainphoto {
            url
          }
          price
          area
          slug
          saleorrent
        }
      }`,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const listingsContainer = document.querySelector(
        ".recent-all-listings-grid"
      );

      console.log(data.data);

      data.data.allObjects.forEach((item) => {
        const listing = document.createElement("div");
        listing.classList.add("w-dyn-item");
        listing.role = "listitem";

        listing.innerHTML = `
          <a href="listings/${
            item.slug
          }.html" data-w-id="5074cdb3-2e5a-e0fa-1193-8ced74df4c38" class="listing-wrapper w-inline-block">
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
                item.saleorrent[0] === "sale" ? "Продажа" : "Аренда"
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
              <div class="large-text">${item.city.city[0]}</div>
            </div>
            <img src="${
              item.mainphoto ? item.mainphoto.url : "#"
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

        listingsContainer.appendChild(listing);

        const listingWrapper = listing.querySelector(".listing-wrapper");
        listingWrapper.addEventListener("mouseover", () => {
          listingWrapper
            .querySelectorAll('[style*="translate3d"]')
            .forEach((el) => {
              el.style.transform = "translate3d(0, 0, 0)";
            });
        });

        listingWrapper.addEventListener("mouseout", () => {
          listingWrapper
            .querySelectorAll('[style*="translate3d"]')
            .forEach((el) => {
              el.style.transform = el.style.transform.includes("25rem")
                ? "translate3d(0, 25rem, 0)"
                : "translate3d(0, 19rem, 0)";
            });
        });
      });
    })
    .catch((error) => console.error("Error:", error));
});
