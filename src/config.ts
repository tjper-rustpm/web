const stripeMonthlyPriceID = (): string => {
  if (process.env.NODE_ENV == 'production') {
    return 'price_1MJ7pfCEcXRU8XL2ncBPSC6C';
  }
  return 'price_1KLJWjCEcXRU8XL2TVKcLGUO';
};

const stripeFiveDayPriceID = (): string => {
  if (process.env.NODE_ENV == 'production') {
    return 'price_1MJ7ozCEcXRU8XL25CLoBvfA';
  }
  return 'price_1LyigBCEcXRU8XL2L6eMGz6Y';
};

export const config = {
  stripeMonthlyPriceID: stripeMonthlyPriceID(),
  stripeFiveDayPriceID: stripeFiveDayPriceID(),
};
