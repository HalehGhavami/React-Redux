const redux = require('redux');
const thunkMiddleware = require('redux.thunk').default;
const axios = require('axios');
const createStore = redux.createStore;
const applyMiddleware = redux.applyMiddleware;

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
// creating Async. action-creatore with help of thunk middleware
// we could also return a function* that we use for our dispatch()
const fetchUsers = () => {
  return function (dispatch) {
    axios
      .get('https://fakerestapi.azurewebsites.net/api/v1/Users')

      .then((Response) => {
        const users = Response.data;
        dispatch(fetchDataSuccess(users));
      })
      .catch((error) => {
        dispatch(fetchDataFailure(error.message));
      });
  };
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

store.subscribe(() => {
  console.log(store.getState());
});
store.dispatch(fetchUsers());
