export const userReducer = (state, action) => {
  switch (action.type) {
    //login
    case "USER_LOGIN_REQUEST":
      return { ...state, userLogin: { loginLoading: true } };
    case "USER_LOGIN_SUCCESS":
      return {
        ...state,
        userLogin: { userInfo: action.payload, loginLoading: false },
      };
    case "USER_LOGIN_FAIL":
      return {
        ...state,
        userLogin: { loginError: action.payload, loginLoading: false },
      };
    case "USER_LOGOUT":
      return { ...state, userLogin: {}, userRegister: {}, user: {}, users: {} };
    case "USER_REGISTER_REQUEST":
      return { ...state, userRegister: { registerLoading: true } };
    case "USER_REGISTER_SUCCESS":
      return {
        ...state,
        userRegister: { registerLoading: false, registerSuccess: true },
        userLogin: { userInfo: action.payload },
      };
    case "USER_REGISTER_FAIL":
      return {
        ...state,
        userRegister: {
          registerLoading: false,
          registerSuccess: false,
          registerError: action.payload,
        },
      };
    case "USER_REGISTER_RESET":
      return { ...state, userRegister: {} };

    case "USER_DETAILS_REQUEST":
      return { ...state, user: { userLoading: true } };
    case "USER_DETAILS_SUCCESS":
      return {
        ...state,
        user: { userLoading: false, userDetail: action.payload },
      };
    case "USER_DETAILS_FAIL":
      return {
        ...state,
        user: { userLoading: false, userError: action.payload },
      };
    case "USER_DETAILS_RESET":
      return { ...state, user: {} };

    case "USER_UPDATE_PROFILE_REQUEST":
      return { ...state, updateProfile: { updateProfileLoading: true } };
    case "USER_UPDATE_PROFILE_SUCCESS":
      return {
        ...state,
        updateProfile: {
          updateProfileLoading: false,
          updateProfileSuccess: true,
        },
        userLogin: { userInfo: action.payload },
      };
    case "USER_UPDATE_PROFILE_FAIL":
      return {
        ...state,
        updateProfile: {
          updateProfileLoading: false,
          updateProfileSuccess: false,
          updateProfileError: action.payload,
        },
      };
    case "USER_UPDATE_PROFILE_RESET":
      return { ...state, updateProfile: {} };

    case "USER_LIST_REQUEST":
      return { ...state, userList: { usersLoading: true } };
    case "USER_LIST_SUCCESS":
      return {
        ...state,
        userList: { usersLoading: false, users: action.payload },
      };
    case "USER_LIST_FAIL":
      return {
        ...state,
        userList: { usersLoading: false, usersError: action.payload },
      };
    case "USER_LIST_RESET":
      return { ...state, userList: {} };

    case "USER_DELETE_REQUEST":
      return { ...state, userDelete: { userDeleteLoading: true } };
    case "USER_DELETE_SUCCESS":
      return {
        ...state,
        userDelete: { userDeleteLoading: false, userDeleteSuccess: true },
      };
    case "USER_DELETE_FAIL":
      return {
        ...state,
        userDelete: {
          userDeleteLoading: false,
          userDeleteSuccess: false,
          userDeleteError: action.payload,
        },
      };
    case "USER_DELETE_RESET":
      return { ...state, userDelete: {} };

    case "USER_UPDATE_REQUEST":
      return { ...state, userUpdate: { userUpdateLoading: true } };
    case "USER_UPDATE_SUCCESS":
      return {
        ...state,
        serUpdate: { userUpdateLoading: false, userUpdateSuccess: true },
      };
    case "USER_UPDATE_FAIL":
      return {
        ...state,
        userUpdate: {
          userUpdateLoading: false,
          userUpdateSuccess: false,
          userUpdateError: action.payload,
        },
      };
    case "USER_UPDATE_RESET":
      return {
        ...state,
        userUpdate: {},
      };
    default:
      return {
        state,
      };
  }
};
