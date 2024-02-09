//   #map {
//     height: 1000px;
//     width: 1500px;
//   }
//   .info-window-content {
//     font-size: 20px;
//   }

// <div id="map"></div>
// <div id="info">
//   <p>Total Distance: <span id="totalDistance"></span> meters</p>
//   <p>Total Price: <span id="totalPrice"></span> USD</p>
// </div>
// <script>

export const googleAPIkey =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyB90p1YPZjlgRQFoft_USPDy7Z6SJHJOHo&callback=initMap";

const shipwrecks = [
  {
    name: "Empress of Ireland",
    rarity: "Epic",
    image: "/public/EmpressOfIreland1.png",
    reasonForSinking: "Collision",
    yearSunk: "1914",
    country: "United Kingdom",
    bodyOfWater: "Gulf of Saint Lawrence",
    casualties: "1012",
    coordinates: { lat: 48.618056, lng: 68.401389 },
    shipWreckId: "1",
    treasure: ["🏎	", "🍴", "☠", "🌫", "💍"],
  },

  {
    name: "Gunilda",
    rarity: "Common",
    image: "/public/Gunilda1.png",
    reasonForSinking: "Ran aground and sank",
    yearSunk: "1911",
    country: "United States",
    bodyOfWater: "Lake Superior",
    casualties: "0",
    coordinates: { lat: 48.784167, lng: 87.422222 },
    shipWreckId: "2",
    treasure: ["☠", "💍", "🍴", "🐟", "🐚"],
  },

  {
    name: "HMHS Britannic",
    rarity: "Common",
    image: "/public/HMHSBritannic1.png",
    reasonForSinking: "War/battle damage",
    yearSunk: "1916",
    country: "United Kingdom",
    bodyOfWater: "Aegean Sea",
    casualties: "30",
    coordinates: { lat: 37.701389, lng: 24.283889 },
    shipWreckId: "3",
    treasure: ["☠", "💊", "🩹", "💉", "⛑"],
  },

  {
    name: "The Zeila Shipwreck",
    rarity: "Common",
    image: "/public/Zeila1.png",
    reasonForSinking: "Collision",
    yearSunk: "2008",
    country: "Namibia",
    bodyOfWater: "Atlantic Ocean",
    casualties: "N/A",
    coordinates: { lat: -22.24024396889257, lng: 14.353560089858977 },
    shipWreckId: "4",
    treasure: ["☠", "🐟", "🐠", "🐦", "🏖"],
  },

  {
    name: "SS Daniel J. Morrell",
    rarity: "Uncommon",
    image: "/public/DanielJMorrell1.png",
    reasonForSinking: "Weather",
    yearSunk: "1966",
    country: "United States",
    bodyOfWater: "Lake Huron",
    casualties: "28",
    coordinates: { lat: 43.85, lng: 82.59 },
    shipWreckId: "5",
    treasure: ["☠", "🌊", "🌩", "🌀", "🚣‍♂️"],
  },

  {
    name: "Vasa",
    rarity: "Rare",
    image: "/public/Vasa1.png",
    reasonForSinking: "Flawed Design",
    yearSunk: "1628",
    country: "Sweden",
    bodyOfWater: "Stockholm Harbor",
    casualties: "15",
    coordinates: { lat: 59.32333204, lng: 18.087999648 },
    shipWreckId: "6",
    treasure: ["☠", "🏺", "🧍‍♂️", "🦀", "👑"],
  },

  {
    name: "USS Indianapolis",
    rarity: "Epic",
    image: "/public/USSIndianapolis1.png",
    reasonForSinking: "War/battle damage",
    yearSunk: "1945",
    country: "United States",
    bodyOfWater: "Philippine Sea",
    casualties: "879",
    coordinates: { lat: 12.0333332, lng: 134.7999968 },
    shipWreckId: "7",
    treasure: ["☠", "🦈", "🏊‍♂️", "⚔", "🔫", "☢"],
  },

  {
    name: "Mary Rose",
    rarity: "Rare",
    image: "/public/MaryRose1.png",
    reasonForSinking: "War/battle damage",
    yearSunk: "1545",
    country: "United Kingdom",
    bodyOfWater: "The Solent",
    casualties: "179",
    coordinates: { lat: 50.7666636, lng: -1.0999996 },
    shipWreckId: "8",
    treasure: ["☠", "🎲", "🎷", "🥾", "👞"],
  },

  {
    name: "MS Estonia",
    rarity: "Common",
    image: "/public/MSEstonia1.png",
    reasonForSinking: "Onboard accident",
    yearSunk: "1994",
    country: "Estonia",
    bodyOfWater: "Baltic Sea",
    casualties: "850",
    coordinates: { lat: 59.38331, lng: 21.68494 },
    shipWreckId: "9",
    treasure: ["🏎	", "☠", "🌩", "🌀", "🚪"],
  },

  {
    name: "Queen Anne's Revenge",
    rarity: "Exotic",
    image: "/public/QueenAnnesRevenge1.png",
    reasonForSinking: "Ran aground",
    yearSunk: "1718",
    country: "United Kingdom",
    bodyOfWater: "Atlantic Ocean",
    casualties: "0",
    coordinates: { lat: 34.69801, lng: -76.67048 },
    shipWreckId: "10",
    treasure: ["☠", "🏴‍☠️", "🏖", "💰", "💎", "💍"],
  },

  {
    name: "RMS Lustitania",
    rarity: "Epic",
    image: "/public/RMSLusitania1.png",
    reasonForSinking: "War/battle damage",
    yearSunk: "1915",
    country: "United Kingdom",
    bodyOfWater: "Atlantic Ocean",
    casualties: "1198",
    coordinates: { lat: 51.41664, lng: -8.54993 },
    shipWreckId: "11",
    treasure: ["☠", "👪", "👠", "🚫", "⌛"],
  },

  {
    name: "HMS Terror",
    rarity: "Common",
    image: "/public/HMSTerror1.png",
    reasonForSinking: "Icebound/abandoned",
    yearSunk: "1848",
    country: "United Kingdom",
    bodyOfWater: "Arctic Ocean",
    casualties: "129",
    coordinates: { lat: 68.86126, lng: -98.92031 },
    shipWreckId: "12",
    treasure: ["☠", "🍖", "🧊", "👻", "⚠"],
  },

  {
    name: "HMS Erebus",
    rarity: "Common",
    image: "/public/HMSErebus1.png",
    reasonForSinking: "Icebound/abandoned",
    yearSunk: "1848",
    country: "United Kingdom",
    bodyOfWater: "Arctic Ocean",
    casualties: "129",
    coordinates: { lat: 68.24054, lng: -98.87357 },
    shipWreckId: "13",
    treasure: ["☠", "🍖", "🧊", "👻", "⚠"],
  },

  {
    name: "USS Monitor",
    rarity: "Common",
    image: "/public/USSMonitor1.png",
    reasonForSinking: "Weather",
    yearSunk: "1862",
    country: "United States",
    bodyOfWater: "North ATlantic Ocean",
    casualties: "16",
    coordinates: { lat: 35.00167, lng: -75.40639 },
    shipWreckId: "14",
    treasure: ["☠", "🌩", "🌀", "🔫", "📷"],
  },

  {
    name: "Battleship Yamato",
    rarity: "Epic",
    image: "/public/Yamato1.png",
    reasonForSinking: "War/battle damage",
    yearSunk: "1945",
    country: "Japan",
    bodyOfWater: "East China Sea",
    casualties: "3055",
    coordinates: { lat: 30.366667, lng: 128.066667 },
    shipWreckId: "16",
    treasure: ["☠", "🔫", "💣", "⚔", "🎖", "🎎"],
  },

  {
    name: "SS Edmund Fitzgerald",
    rarity: "UnCommon",
    image: "/public/EdmundFitzgerald1.png",
    reasonForSinking: "Weather/Main Hatchway Caving In",
    yearSunk: "1975",
    country: "United States",
    bodyOfWater: "Lake Superior",
    casualties: "29",
    coordinates: { lat: 46.99887, lng: -85.10979 },
    shipWreckId: "18",
    treasure: ["☠", "🌩", "🌀", "🌊", "🔔"],
  },

  {
    name: "RFS Moskva",
    rarity: "Rare",
    image: "/public/RSFMoskva1.png",
    reasonForSinking: "War/battle damage",
    yearSunk: "2022",
    country: "Russia",
    bodyOfWater: "Black Sea",
    casualties: "0",
    coordinates: { lat: 45.2951, lng: 30.8789 },
    shipWreckId: "19",
    treasure: ["☠", "🔫", "🎖", "☢", "💣"],
  },

  {
    name: "Felicity Ace",
    rarity: "Legendary",
    image: "/public/FelicityAce1.png",
    reasonForSinking: "Onboard accident",
    yearSunk: "2022",
    country: "Japan",
    bodyOfWater: "Atlantic Ocean",
    casualties: "0",
    coordinates: { lat: 37.52861, lng: 28.9856 },
    shipWreckId: "20",
    treasure: ["🏎	", "☠", "🔥", "🚗", "🚜"],
  },

  {
    name: "MV Wilhelm Gustloff",
    rarity: "Uncommon",
    image: "/public/MVWilhelmGustav1.png",
    reasonForSinking: "War/battle damage",
    yearSunk: "1945",
    country: "Germany",
    bodyOfWater: "Baltic Sea",
    casualties: "9600",
    coordinates: { lat: 55.07328, lng: 17.42185 },
    shipWreckId: "21",
    treasure: ["☠", "🎖", "☠☠", "👨‍👩‍👧‍👦", "🔫"],
  },

  {
    name: "RMS Titanic",
    rarity: "Legendary",
    image: "/public/RMSTitanic1.png",
    reasonForSinking: "Collision",
    yearSunk: "1912",
    country: "United Kingdom",
    bodyOfWater: "Atlantic Ocean",
    casualties: "1500",
    coordinates: { lat: 41.73297, lng: -49.94703 },
    shipWreckId: "22",
    treasure: ["☠", "🧊", "👞", "🚣‍♀️", "💎", "🚪", "🎮"],
  },
];

function initMap() {
  var map = new google.maps.Map(document.getElementById("map"), {
    center: shipwrecks[0].coordinates,
    zoom: 4,
  });

  shipwrecks.forEach(function (shipwreck) {
    var marker = new google.maps.Marker({
      position: shipwreck.coordinates,
      map: map,
      title: shipwreck.name,
    });

    // Add info window to marker
    var infoWindow = new google.maps.InfoWindow({
      content: `<div class="info-window-content"><b>${shipwreck.name}</b><br>
                Rarity: ${shipwreck.rarity}<br>
                Reason for Sinking: ${shipwreck.reasonForSinking}<br>
                Year Sunk: ${shipwreck.yearSunk}<br>
                Country: ${shipwreck.country}<br>
                Body of Water: ${shipwreck.bodyOfWater}<br>
                Casualties: ${shipwreck.casualties}<br>
                Shipwreck ID: ${shipwreck.shipWreckId}<br>
                Treasure: ${shipwreck.treasure.join(", ")}</div>
                <img src="${shipwreck.image}" alt="${
        shipwreck.name
      } Image" width="200"></div>`,
    });

    marker.addListener("click", function () {
      infoWindow.open(map, marker);
    });

    // Create marker icon
    var markerIcon = {
      scaledSize: new google.maps.Size(50, 50),
    };

    // Load image asynchronously
    var image = new Image();
    image.onload = function () {
      marker.setIcon(markerIcon);
    };
    image.src = shipwreck.image;
  });

  // Iterate over shipwrecks to draw polylines
  shipwrecks.forEach(function (shipwreck) {
    if (shipwreck.shipWreckId !== "1") {
      // Calculate polyline coordinates
      var polylineCoordinates = [
        new google.maps.LatLng(
          shipwreck.coordinates.lat,
          shipwreck.coordinates.lng
        ),
        new google.maps.LatLng(
          shipwrecks[parseInt(shipwreck.shipWreckId) - 2].coordinates.lat,
          shipwrecks[parseInt(shipwreck.shipWreckId) - 2].coordinates.lng
        ),
      ];

      // Draw polyline with random color
      var polyline = new google.maps.Polyline({
        path: polylineCoordinates,
        geodesic: true,
        strokeColor: generateRandomHexColor(), // Set random color
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });

      polyline.setMap(map);

      // Calculate total distance of polyline
      var totalDistance = calculateTotalDistance(polyline);

      // Update total distance and total price elements
      document.getElementById("totalDistance").textContent =
        totalDistance.toFixed(2);
      document.getElementById("totalPrice").textContent =
        calculatePrice(totalDistance);
    }
  });
}

// Function to generate a random hex color
const generateRandomHexColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

function calculateDistance(lat1, lon1, lat2, lon2) {
  var R = 6371e3; // Earth's radius in meters
  var φ1 = (lat1 * Math.PI) / 180; // Latitude of first point in radians
  var φ2 = (lat2 * Math.PI) / 180; // Latitude of second point in radians
  var Δφ = ((lat2 - lat1) * Math.PI) / 180; // Difference in latitude in radians
  var Δλ = ((lon2 - lon1) * Math.PI) / 180; // Difference in longitude in radians

  var a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  var distance = R * c; // Distance in meters

  return distance;
}

function calculateTotalDistance(polyline) {
  var path = polyline.getPath();
  var totalDistance = 0;

  for (var i = 0; i < path.getLength() - 1; i++) {
    var p1 = path.getAt(i);
    var p2 = path.getAt(i + 1);
    totalDistance += calculateDistance(p1.lat(), p1.lng(), p2.lat(), p2.lng());
  }

  return totalDistance;
}

function calculatePrice(totalDistance) {
  const basePrice = 10; // Base price in USD
  const pricePerKilometer = 0.05; // Price per kilometer in USD

  return (basePrice + totalDistance * pricePerKilometer).toFixed(2);
}

<script
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB90p1YPZjlgRQFoft_USPDy7Z6SJHJOHo&callback=initMap"
  async
  defer
></script>;
