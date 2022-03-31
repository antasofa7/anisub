export const dispatchLoading = (dispatch, type) => {
  return dispatch({
    type: type,
    payload: {
      loading: true,
      data: null,
      errorMessage: null,
    },
  });
};

export const dispatchSuccess = (dispatch, type, results) => {
  return dispatch({
    type: type,
    payload: {
      loading: false,
      data: results,
      errorMessage: null,
    },
  });
};

export const dispatchError = (dispatch, type, error) => {
  dispatch({
    type: type,
    payload: {
      loading: false,
      data: null,
      errorMessage: error,
    },
  });
};
