const showAlert = payload => ({
  type: 'SHOW_ALERT',
  message: payload.message,
  positiveOutcome: payload.positiveOutcome
});

const hideAlert = () => ({
  type: 'HIDE_ALERT',
});

export {
  showAlert,
  hideAlert
}
