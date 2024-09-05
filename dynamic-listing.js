document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get("slug");

  fetch("https://graphql.datocms.com/", {
    method: "POST",
    headers: {
      Authorization: "Bearer YOUR_API_KEY", // Replace with your DatoCMS API key
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `{
        allObjects(filter: {slug: {eq: "${slug}"}}) {
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
          saleorrent
        }
      }`,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      const listing = data.data.allObjects[0];
      if (!listing) {
        document.body.innerHTML = "<h1>Listing not found</h1>";
        return;
      }

      document.querySelector(".listing-title").innerText = listing.title;
      document.querySelector(
        ".listing-price"
      ).innerText = `${listing.price} евро`;
      document.querySelector(".listing-city").innerText = listing.city.city[0];
      document.querySelector(".listing-image").src = listing.mainphoto
        ? listing.mainphoto.url
        : "placeholder.jpg";
      document.querySelector(".listing-bedrooms").innerText = listing.bedrooms;
      document.querySelector(".listing-bathrooms").innerText =
        listing.bathrooms;
      document.querySelector(".listing-area").innerText = `${listing.area} м²`;
      document.querySelector(".listing-saleorrent").innerText =
        listing.saleorrent[0] === "sale" ? "Продажа" : "Аренда";
    })
    .catch((error) => console.error("Error:", error));
});
