const initialState = {
  inputs: {
    eps: 13.97,
    medianHistPE: 18.00,
    expectGrowthRate: 0.2,
    marginSafety: 0.25,
    conservGrowthRt: 0.15,
    growthDeclineRt: 0.05,
    discountRt: 0.09,
  },
};

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case 'SET_INPUTS':
      return state;
    default:
      return state;
  }
}
