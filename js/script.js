document.getElementById("icon-menu").addEventListener("click", mostrar_menu);

function mostrar_menu() {
    document.getElementById("move-content").classList.toggle('move-container-all');
    document.getElementById("show-menu").classList.toggle('show-lateral');
}

// Agregar controladores de eventos a los enlaces dentro del menú
const enlacesMenu = document.querySelectorAll("#show-menu a");

enlacesMenu.forEach(function (enlace) {
    enlace.addEventListener("click", function () {
        // Cierra el menú al hacer clic en un enlace
        document.getElementById("move-content").classList.remove('move-container-all');
        document.getElementById("show-menu").classList.remove('show-lateral');
    });
});

let currentIndex = 0;
let reviews = [];

function initMap() {
  console.log("google: ", google);
  console.log("google.maps: ", google.maps);
  console.log("google.maps.places: ", google.maps.places);

  if (typeof google !== 'undefined' && google.maps && google.maps.places) {
      const myLatLng = { lat: 40.7128, lng: -74.0060 };

      // Obtén el elemento del mapa por su ID
      const mapElement = document.getElementById("map");

      if (mapElement) {
          const map = new google.maps.Map(mapElement, {
              center: myLatLng,
              zoom: 15,
          });

          loadGoogleReviews(map);
      } else {
          console.error("No se encontró el elemento del mapa.");
      }
  } else {
      console.error("La API de Google Maps no está cargada correctamente.");
  }
}

function loadGoogleReviews(map) {
    const service = new google.maps.places.PlacesService(map);

    const request = {
        placeId: "ChIJc660WKrLvJURzEEy7OVjq6A",
        fields: ["reviews"],
    };

    service.getDetails(request, (place, status) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            reviews = place.reviews || [];
            createCarousel();
        } else {
            console.error("Error al cargar los comentarios de Google Maps");
        }
    });
}

function createCarousel() {
    const reviewsContainer = document.getElementById("reviews-container");

    reviews.forEach((review) => {
        const reviewCard = document.createElement("div");
        reviewCard.classList.add("review-card");

        const ratingElement = document.createElement("div");
        ratingElement.classList.add("rating");
        ratingElement.innerHTML = `Rating: ${review.rating}`;

        const textElement = document.createElement("div");
        textElement.classList.add("text");
        textElement.innerHTML = review.text;

        reviewCard.appendChild(ratingElement);
        reviewCard.appendChild(textElement);

        reviewsContainer.appendChild(reviewCard);
    });

    showReview(currentIndex);
}

function showReview(index) {
    const translateValue = -index * 100 + "%";
    const reviewsContainer = document.getElementById("reviews-container");
    reviewsContainer.style.transform = `translateX(${translateValue})`;
}

function nextReview() {
    currentIndex = (currentIndex + 1) % reviews.length;
    showReview(currentIndex);
}

function prevReview() {
    currentIndex = (currentIndex - 1 + reviews.length) % reviews.length;
    showReview(currentIndex);
}