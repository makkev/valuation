const initialState = {
  inputs: {
    shareholdersEquity: 48741,
    price: 92.08,
    ROE: 0.33,
    sharesOutstanding: 1056,
    dividendYield: 0.0238,
    dividendPayoutRatio: 0.2810,
    marginOfSafety: 0.25,
    conservativeGrowthRate: 0.1780,
    discountRate: 0.1,
  },
};

export default function (state = initialState, action) {
  const { type, name, value } = action;
  switch (type) {
    case 'SET_INPUT':
      return ({
        ...state,
        inputs: {
          ...state.inputs,
          [name]: value === '' ? '' : Number(value),
        },
      });
    default:
      return state;
  }
}
