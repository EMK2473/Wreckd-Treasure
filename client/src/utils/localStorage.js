export const getBookedTours = (userId) => {
  const bookedToursKey = `booked_tours_${userId}`;
  const bookedTours = localStorage.getItem(bookedToursKey);
  return bookedTours ? JSON.parse(bookedTours) : {};
};

export const saveBookedTour = (userId, tourName, tourDetails) => {
  const bookedToursKey = `booked_tours_${userId}`;
  const bookedTours = getBookedTours(userId);
  bookedTours[tourName] = tourDetails;
  localStorage.setItem(bookedToursKey, JSON.stringify(bookedTours));
};

export const removeBookedTour = (userId, tourName) => {
  const bookedToursKey = `booked_tours_${userId}`;
  const bookedTours = getBookedTours(userId);
  delete bookedTours[tourName];
  localStorage.setItem(bookedToursKey, JSON.stringify(bookedTours));
};
