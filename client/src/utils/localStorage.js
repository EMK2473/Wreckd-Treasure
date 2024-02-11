export const getBookedTours = () => {
  const bookedTours = localStorage.getItem('booked_tours');
  return bookedTours ? JSON.parse(bookedTours) : {};
};

export const saveBookedTour = (tourName, tourDetails) => {
  const bookedTours = getBookedTours();
  bookedTours[tourName] = tourDetails;
  localStorage.setItem('booked_tours', JSON.stringify(bookedTours));
};

export const removeBookedTour = (tourName) => {
  const bookedTours = getBookedTours();
  delete bookedTours[tourName];
  localStorage.setItem('booked_tours', JSON.stringify(bookedTours));
};
