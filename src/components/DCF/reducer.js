const initialState = {
  inputs: {
    totalCash: 40546,
    totalDebt: 16960,
    freeCashFlow: 46737,
    sharesOutstanding: 6029.67,
    expectedGrowthRate: 0.1537,
    marginOfSafety: 0.25,
    conservativeGrowthRate: 0.1153,
    growthDeclineRate: 0.05,
    discountRate: 0.1,
    valuationLastFCF: 12,
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
