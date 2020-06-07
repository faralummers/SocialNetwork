import { profileAPI } from "../api/usersAPI";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET_USER_PROFILE';
const TOGGLE_IS_FETCHING_PROFILE = 'TOGGLE_IS_FETCHING_PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';

let initialState = {
  postsData: [
    { id: 1, message: 'Hi, how are you' },
    { id: 2, message: 'Its my first post' }
  ],
  profileData: null,
  isFetching: false,
  profileStatus: ''
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 3,
        message: action.newPostText
      };
      return {
        ...state,
        postsData: [...state.postsData, newPost],
      };
    case SET_USER_PROFILE:
      return {
        ...state,
        profileData: action.profileData
      };
    case TOGGLE_IS_FETCHING_PROFILE:
      return {
        ...state,
        isFetching: action.isFetching
      }
    case SET_STATUS:
      return {
        ...state,
        profileStatus: action.newStatus
      }
    case DELETE_POST:
      return {
        ...state,
        postsData: state.postsData.filter(p => p.id !== action.postId)
      }
    default:
      return state;
  }

}
// ActionCreators
export let addPost = (newPostText) => ({ type: ADD_POST, newPostText });
export let deletePost = (postId) => ({ type: DELETE_POST, postId });
export let setUserProfile = (profileData) => ({
  type: SET_USER_PROFILE,
  profileData
});
export let toggleIsFetchingProfile = (isFetching) => ({ type: TOGGLE_IS_FETCHING_PROFILE, isFetching });
export let setStatus = (newStatus) => ({ type: SET_STATUS, newStatus });

// ThunkCreators
export const getProfile = (userId) => {
  return async (dispatch) => {
    dispatch(toggleIsFetchingProfile(true));
    let response = await profileAPI.getProfile(userId);
    dispatch(toggleIsFetchingProfile(false));
    dispatch(setUserProfile(response));
  }
}
export const getProfileStatus = (userId) => {
  return async (dispatch) => {
    let response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response));
  }
}
export const updateProfileStatus = (status) => {
  return async (dispatch) => {
    let response = await profileAPI.updateStatus(status);
    if (response.resultCode === 0) {
      dispatch(setStatus(status));
    }
  }
}

export default profileReducer;