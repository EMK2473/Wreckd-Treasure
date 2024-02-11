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
