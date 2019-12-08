const initialState = {
  appState: false,
};

export default function (state = initialState, action) {
  const { type } = action;
  switch (type) {
    case 'TOGGLE_STATE':
      return state;
    default:
      return state;
  }
}
