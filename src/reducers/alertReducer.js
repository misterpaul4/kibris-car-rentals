const alertReducer = (state = [], action) => {
  switch (action.type) {
    case 'SHOW_ALERT':
      return {
        ...state,
        reveal: true,
        positiveOutcome: action.positiveOutcome,
        message: action.message,
      };

      case 'HIDE_ALERT':
        return {
          ...state,
          reveal: false,
          message: '',
          positiveOutcome: null
        }

    default:
      return state;
  }
};

export default alertReducer;
