const initialState = {
  loading: false,
  users: [],
  error: '',
};

const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchDataSuccess = (users) => {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: users,
  };
};

const fetchDataFailure = (error) => {
  return {
    type: FETCH_DATA_FAILURE,
    payload: error,
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_DATA_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: '',
      };
    case FETCH_DATA_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};
