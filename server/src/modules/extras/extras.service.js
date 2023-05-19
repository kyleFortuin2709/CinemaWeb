const {
  extras,
  booking,
  bookingExtras
} = require('../../adapters/database')

const getBooking = (refNo) => {
  return booking.getBooking(refNo);
};
const saveExtraItem = (extrasId, bookingId) => {
  return bookingExtras.saveItemPurchase({extrasId, bookingId});
};

const saveItems = (purchasedItems, bookingId) => {
  const promises = [];
  purchasedItems.forEach(item => {
    promises.push(saveExtraItem(item.id, bookingId));
  });
  return Promise.all(promises);
}



module.exports.extrasService = {
  getAllExtras: () => {
    return extras.getAllExtras();
  },
  processItems: (purchasedItems, refNo) => {
    return getBooking(refNo)
      .then(booking => {
        console.log('Booking: ', booking);
        return saveItems(purchasedItems, booking.id);
      });
  }
};