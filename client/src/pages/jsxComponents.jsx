

// reference for style for search shipwrecks return value


// return (
//     <>
//       <div className="fixed top-0 left-0 right-0 bg-gray-800 text-white py-5 px-5 text-center">
//         <h1 className="text-3xl">Shipwreck Explorer</h1>
//       </div>
//       <div className="container mx-auto mt-20">
//         <div className="flex justify-center">
//           <div className="w-full md:w-1/2">
//             <div className="bg-gray-800 text-white py-5 px-5">
//               <div className="container mx-auto">
//                 <form onSubmit={handleFormSubmit}>
//                   <div className="mt-3 flex">
//                     <div className="w-full md:w-3/4">
//                       <select
//                         value={selectedShipwreck}
//                         onChange={(e) => setSelectedShipwreck(e.target.value)}
//                         className="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                       >
//                         <option value="" disabled>
//                           Select Shipwreck
//                         </option>
//                         {shipwrecks.map((shipwreck, index) => (
//                           <option key={index} value={index}>
//                             {shipwreck.name}
//                           </option>
//                         ))}
//                       </select>
//                     </div>
//                     <div className="w-full md:w-1/4 md:ml-3 mt-3 md:mt-0">
//                       <button
//                         type="submit"
//                         className="inline-block w-full px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
//                       >
//                         Plunder
//                       </button>
//                     </div>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="container mx-auto mt-24">
//         <div className="flex justify-center">
//           <div className="w-full md:w-1/2">
//             <div className="container mx-auto">
//               <h3 className="pt-2 text-white">
//                 {searchedShipWrecks.length
//                   ? `Viewing ${searchedShipWrecks.length} results:`
//                   : "Plunder for a shipwreck to begin"}
//               </h3>
//               <div className="mt-3 flex flex-wrap">
//                 {searchedShipWrecks.map((shipWreck, index) => (
//                   <div key={index} className="w-full md:w-1/3 mb-4">
//                     <div className="border border-gray-300 rounded-lg overflow-hidden">
//                       {shipWreck.image && (
//                         <img
//                           src={shipWreck.image}
//                           alt={`The cover for ${shipWreck.title}`}
//                           className="w-full h-40 object-cover"
//                         />
//                       )}
//                       <div className="p-4">
//                         <h2 className="text-xl font-semibold">{shipWreck.name}</h2>
//                         <p>
//                           <strong>Rarity: </strong> {shipWreck.rarity}
//                           <br />
//                           <strong>Treasure: </strong> <br />
//                           <span className="text-2xl">{shipWreck.treasure}</span>
//                           <br />
//                           <strong>Reason for Sinking:</strong> {shipWreck.reasonForSinking}
//                           <br />
//                           <strong>Year Sunk:</strong> {shipWreck.yearSunk}
//                           <br />
//                           <strong>Country:</strong> {shipWreck.country}
//                           <br />
//                           <strong>Body of Water:</strong> {shipWreck.bodyOfWater}
//                           <br />
//                           <strong>Casualties:</strong> {shipWreck.casualties}
//                           <br />
//                           <strong>Coordinates:</strong> {shipWreck.coordinates.lat}, {shipWreck.coordinates.lng}
//                         </p>
//                         {Auth.loggedIn() && (
//                           <button
//                             disabled={savedShipWreckIds?.some(id => id === shipWreck.shipWreckId)}
//                             className="block w-full mt-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                             onClick={() => handleSaveShipWreck(shipWreck.shipWreckId)}
//                           >
//                             {savedShipWreckIds?.some(id => id === shipWreck.shipWreckId)
//                               ? "Expedition Booked!"
//                               : "Book Expedition!"}
//                           </button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="container mx-auto mt-24">
//         <div className="flex justify-center">
//           <div className="w-full md:w-1/2">
//             <div className="container mx-auto">
//               <h2 className="pt-5 text-white">Saved Expeditions</h2>
//               <div className="mt-3 flex flex-wrap">
//                 {data &&
//                   data.me &&
//                   data.me.savedShipWrecks.map((shipWreck) => (
//                     <div key={shipWreck.shipWreckId} className="w-full md:w-1/3 mb-4">
//                       <div className="border border-gray-300 rounded-lg overflow-hidden">
//                         {shipWreck.image && (
//                           <img
//                             src={shipWreck.image}
//                             alt={`The cover for ${shipWreck.title}`}
//                             className="w-full h-40 object-cover"
//                           />
//                         )}
//                         <div className="p-4">
//                           <h2 className="text-xl font-semibold">{shipWreck.name}</h2>
//                           <p className="text-sm">Authors: {shipWreck.bodyOfWater}</p>
//                           <p>{shipWreck.chair ? shipWreck.chair : "No Chair"}</p>
//                           <button
//                             className="block w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
//                             onClick={() => handleDeleteShipWreck(shipWreck.shipWreckId)}
//                           >
//                             Delete this Expedition
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
  
  
  
  
//                         }
// export default SearchShipWrecks;