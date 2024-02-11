
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

export const getBookedTourIds = () => {
  const bookedTourIds = localStorage.getItem('booked_tours')
    ? JSON.parse(localStorage.getItem('booked_tours'))
    : [];

  return bookedTourIds;
};

export const saveBookedTourIds = (tourIdArr) => {
  if (tourIdArr.length) {
    localStorage.setItem('booked_tours', JSON.stringify(tourIdArr));
  } else {
    localStorage.removeItem('booked_tours');
  }
};

export const removeBookedTourId = (tourId) => {
  const bookedTourIds = localStorage.getItem('booked_tours')
    ? JSON.parse(localStorage.getItem('booked_tours'))
    : null;

  if (!bookedTourIds) {
    return false;
  }

  const updatedBookedTourIds = bookedTourIds.filter((savedTourId) => savedTourId !== tourId);
  localStorage.setItem('booked_tours', JSON.stringify(updatedBookedTourIds));

  return true;
};
