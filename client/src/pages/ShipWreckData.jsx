const shipwrecks = [
  { name: "Empress of Ireland", image: '/ShipWreckPictures/EmpressOfIreland1.png', reasonForSinking: "Collision", yearSunk: "1914", country: "United Kingdom", bodyOfWater: "Gulf of Saint Lawrence", casualties: "1012", coordinates: "48°37.5'N 68°24.5'W", shipWreckId: "1", rarity: "Rare", treasure: ["🏎	", "🏍", "🍴", "🎲", "☠", "💀", "💰", "🪙", "🎷", "💎", "💍"		]},

  { name: "Gunilda", image: "/ShipWreckPictures/Gunilda1.png", reasonForSinking: "Ran aground and sank", yearSunk: "1911", country: "United States", bodyOfWater: "Lake Superior", casualties: "0", coordinates: "48°47.3'N 87°25.20'W", shipWreckId: "2"}, 

  { name: "HMHS Britannic", image: "/ShipWreckPictures/HMHSBritannic1.png", reasonForSinking: "War/battle damage", yearSunk: "1916", country: "United Kingdom", bodyOfWater: "Aegean Sea", casualties: "30", coordinates: "37°42.5'N, 24°17.2'E", shipWreckId: "3"},

  { name: "The Zeila Shipwreck", image: "/ShipWreckPictures/Zeila1.png", reasonForSinking: "Collision", yearSunk: "2008", country: "Namibia", bodyOfWater: "Atlantic Ocean", casualties: "N/A", coordinates: "-22°14.27'S 14°21.12'E", shipWreckId: "4"},

  { name: "SS Daniel J. Morrell", image: "/ShipWreckPictures/DanielJMorrell1.png", reasonForSinking: "Weather", yearSunk: "1966", country: "United States", bodyOfWater: "Lake Huron", casualties: "28", coordinates: "44°15.9N 82°50W", shipWreckId: "5"},

  { name: "Vasa", image: "/ShipWreckPictures/Vasa1.png", reasonForSinking: "Flawed Design", yearSunk: "1628", country: "Sweden", bodyOfWater: "Stockholm Harbor", casualties: "15", coordinates: "59°19.40'N 18°5.28'E", shipWreckId: "6"},

  { name: "USS Indianapolis", image: "/ShipWreckPictures/USSIndianapolis1.png", reasonForSinking: "War/battle damage", yearSunk: "1945", country: "United States", bodyOfWater: "Philippine Sea", casualties: "879", coordinates: "12°2'N 134°48'E", shipWreckId: "7"},

  { name: "Mary Rose", image: "/ShipWreckPictures/MaryRose1.png", reasonForSinking: "War/battle damage", yearSunk: "1545", country: "United Kingdom", bodyOfWater: "The Solent", casualties: "179", coordinates: "50°47.59'N 1°6.24'W", shipWreckId: "8"},

  { name: "MS Estonia", image: "/ShipWreckPictures/MSEstonia1.png", reasonForSinking: "Onboard accident", yearSunk: "1994", country: "Estonia", bodyOfWater: "Baltic Sea", casualties: "850", coordinates: "59°23.0'N 21°40.0'E", shipWreckId: "9"},

  { name: "Queen Anne's Revenge", image: "/ShipWreckPictures/QueenAnnesRevenge1.png", reasonForSinking: "Ran aground", yearSunk: "1718", country: "United Kingdom", bodyOfWater: "Atlantic Ocean", casualties: "0", coordinates: "34°41.44'N 76°41.20'W", shipWreckId: "10"},

  { name: "RMS Lustitania", image: "/ShipWreckPictures/RMSLusitania1.png", reasonForSinking: "War/battle damage", yearSunk: "1915", country: "United Kingdom", bodyOfWater: "Atlantic Ocean", casualties: "1198", coordinates: "51°25`N 8°33`W", shipWreckId: "11"},

  { name: "HMS Terror", image: "/ShipWreckPictures/HMSTerror1.png", reasonForSinking: "Icebound/abandoned", yearSunk: "1848", country: "United Kingdom", bodyOfWater: "Arctic Ocean", casualties: "129", coordinates: "68°54'N 98°56'W (approximate)", shipWreckId: "12"},

  { name: "HMS Erebus", image: "/ShipWreckPictures/HMSErebus1.png", reasonForSinking: "Icebound/abandoned", yearSunk: "1848", country: "United Kingdom", bodyOfWater: "Arctic Ocean", casualties: "129", coordinates: "68°14.44'N 98°52.22'W (approximate)", shipWreckId: "13"},

  { name: "USS Monitor", image: "/ShipWreckPictures/USSMonitor1.png", reasonForSinking: "Weather", yearSunk: "1862", country: "United States", bodyOfWater: "North ATlantic Ocean", casualties: "16", coordinates: "35°0.6'N 75°24.23'W", shipWreckId: "14"},

  { name: "MV Doña Paz", image: "/ShipWreckPictures/MVDonaPaz1.png", reasonForSinking: "Collision", yearSunk: "1987", country: "Philippines", bodyOfWater: "Tablas Strait", casualties: "4385", coordinates: "N/A", shipWreckId: "15"},

  { name: "Battleship Yamato", image: "/ShipWreckPictures/Yamato1.png", reasonForSinking: "War/battle damage", yearSunk: "1945", country: "Japan", bodyOfWater: "East China Sea", casualties: "3055", coordinates: "30°22.0016'N 128°4.0016'E", shipWreckId: "16"},

  { name: "The White Ship", image: "/ShipWreckPictures/TheWhiteShip1.png", reasonForSinking: "Collision", yearSunk: "1120", country: "United Kingdom", bodyOfWater: "English Channel", casualties: "300", coordinates: "N/A", shipWreckId: "17"},

  { name: "SS Edmund Fitzgerald", image: "/ShipWreckPictures/EdmundFitzgerald1.png", reasonForSinking: "Unknown", yearSunk: "1975", country: "United States", bodyOfWater: "Lake Superior", casualties: "29", coordinates: "46°59.91'N 85°06.61'W", shipWreckId: "18"},

  { name: "RFS Moskva", image: "/ShipWreckPictures/RSFMoskva1.png", reasonForSinking: "War/battle damage", yearSunk: "2022", country: "Russia", bodyOfWater: "Black Sea", casualties: "0", coordinates: "45°10.43'N 30°55.31'E", shipWreckId: "19"},

  { name: "Felicity Ace", image: "/ShipWreckPictures/FelicityAce1.png", reasonForSinking: "Onboard accident", yearSunk: "2022", country: "Japan", bodyOfWater: "Atlantic Ocean", casualties: "0", coordinates: "37°31.43'N 28°59.08'W", shipWreckId: "20"},

  { name: "MV Wilhelm Gustloff", image: "/ShipWreckPictures/MVWilhelmGustav1.png", reasonForSinking: "War/battle damage", yearSunk: "1945", country: "Germany", bodyOfWater: "Baltic Sea", casualties: "9600", coordinates: "55°04.22'N 17°25.17'E", shipWreckId: "21"},

  { name: "RMS Titanic", image: "/ShipWreckPictures/RMSTitanic1.png", reasonForSinking: "Collision", yearSunk: "1912", country: "United Kingdom", bodyOfWater: "Atlantic Ocean", casualties: "1500", coordinates: "41°43.57'N 49°56.49'W", shipWreckId: "22"},

  { name: "USS Rodolph", image: "/ShipWreckPictures/USSRodolph1.png", reasonForSinking: "War/battle damage", yearSunk: "1865", country: "United States", bodyOfWater: "Blakeley River", casualties: "4", coordinates: "N/A", shipWreckId: "23"},
];


export default shipwrecks;