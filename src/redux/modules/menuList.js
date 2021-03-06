const GET_MENU_LIST = 'mypage/GET_MENU_LIST';
const ADD_MENU_LIST = 'mypage/ADD_MENU_LIST';
const DELETE_MENU_LIST = 'mypage/DELETE_MENU_LIST';
const ADD_WATER_DOSE = 'mypage/ADD_WATER_DOSE';
const RESET_WATER_DOSE = 'mypage/RESET_WATER_DOSE';
const ADD_DAILY_REVIEW = 'mypage/ADD_DAILY_REVIEW';
const DELETE_DAILY_REVIEW = 'mypage/DELETE_DAILY_REVIEW';

export const getMenuListAction = data => ({
  type: GET_MENU_LIST,
  payload: {
    data
  }
});

export const addMenuListAction = data => ({
  type: ADD_MENU_LIST,
  payload: {
    data
  }
});

export const deleteMenuListAction = (date, mealId) => ({
  type: DELETE_MENU_LIST,
  payload: {
    date,
    mealId
  }
});

export const addWaterDoseAction = (date, waterDose) => ({
  type: ADD_WATER_DOSE,
  payload: {
    date,
    waterDose
  }
});

export const resetWaterDoseAction = date => ({
  type: RESET_WATER_DOSE,
  payload: {
    date
  }
});

export const addDailyReviewAction = (date, review) => ({
  type: ADD_DAILY_REVIEW,
  payload: {
    date,
    review
  }
});

export const DeleteDailyReviewAction = date => ({
  type: DELETE_DAILY_REVIEW,
  payload: {
    date
  }
});

const initialState = {};

export default function menuList(state = initialState, action) {
  switch (action.type) {
    case GET_MENU_LIST:
      return {
        ...action.payload.data
      };
    case ADD_MENU_LIST:
      const newAddData = [
        ...Object.entries({ ...state }).filter(data =>
          data[0].includes(action.payload.data.date)
        )
      ];
      if (newAddData.length) {
        return {
          ...state,
          [newAddData[0][0]]: {
            ...state[newAddData[0][0]],
            meals: state[newAddData[0][0]].meals.concat(action.payload.data)
          }
        };
      } else
        return {
          ...state,
          [action.payload.data.date]: {
            meals: [action.payload.data]
          }
        };
    case DELETE_MENU_LIST:
      const newData = [
        ...Object.entries({ ...state[action.payload.date].meals })
          .map(data => data[1])
          .filter(meal => meal.id !== action.payload.mealId)
      ];

      if (newData) {
        return {
          ...state,
          [action.payload.date]: {
            ...state[action.payload.date],
            meals: newData
          }
        };
      } else
        return {
          ...Object.assign(
            {},
            ...Object.entries({ ...state })
              .filter(data => data[0] !== action.payload.date)
              .map(arr => ({ [arr[0]]: arr[1] }))
          )
        };
    case ADD_WATER_DOSE:
      return {
        ...state,
        [action.payload.date]: {
          ...state[action.payload.date],
          waterDose: action.payload.waterDose
        }
      };
    case RESET_WATER_DOSE:
      return {
        ...state,
        [action.payload.date]: {
          ...state[action.payload.date],
          waterDose: 0
        }
      };
    case ADD_DAILY_REVIEW:
      return {
        ...state,
        [action.payload.date]: {
          ...state[action.payload.date],
          dailyReview: action.payload.review
        }
      };
    case DELETE_DAILY_REVIEW:
      return {
        ...state,
        [action.payload.date]: {
          ...state[action.payload.date],
          dailyReview: ''
        }
      };
    default:
      return state;
  }
}
