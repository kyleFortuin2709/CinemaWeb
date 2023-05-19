const {
   extrasService
} = require('./extras.service');

module.exports.extrasController = {
  getAll: () => {
    return extrasService.getAllExtras();
  },
  processExtrasPurchasedItems: (data) => {
    const { bookingRef, purchasedItems } = data;
    console.log('Ref: ', bookingRef);
    if(purchasedItems.length !== 0) {
      return extrasService.processItems(purchasedItems, bookingRef)
        .then(() => {
          return {extras: 'processed', bookingRef}
        })
    }

    return Promise.resolve({extras: 'no items', bookingRef})
  }
}