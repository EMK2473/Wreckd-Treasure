export const getBookedTours = (userId) => {
  const bookedToursKey = `booked_tours_${userId}`;
  console.log("Getting booked tours for user:", userId);
  console.log("Using booked tours key:", bookedToursKey);
  const bookedTours = localStorage.getItem(bookedToursKey);
  console.log("Retrieved booked tours from local storage:", bookedTours);
  return bookedTours ? JSON.parse(bookedTours) : {};
};

export const saveBookedTour = (userId, tourName, tourDetails) => {
  const bookedToursKey = `booked_tours_${userId}`;
  console.log("Saving booked tour for user:", userId);
  console.log("Using booked tours key:", bookedToursKey);
  const bookedTours = getBookedTours(userId);
  console.log("Current booked tours:", bookedTours);
  bookedTours[tourName] = tourDetails;
  console.log("Updated booked tours:", bookedTours);
  localStorage.setItem(bookedToursKey, JSON.stringify(bookedTours));
  console.log("Saved booked tours to local storage.");
};

export const removeBookedTour = (userId, tourName) => {
  const bookedToursKey = `booked_tours_${userId}`;
  console.log("Removing booked tour for user:", userId);
  console.log("Using booked tours key:", bookedToursKey);
  const bookedTours = getBookedTours(userId);
  console.log("Current booked tours:", bookedTours);
  delete bookedTours[tourName];
  console.log("Updated booked tours after removal:", bookedTours);
  localStorage.setItem(bookedToursKey, JSON.stringify(bookedTours));
  console.log("Saved booked tours to local storage after removal.");
};
