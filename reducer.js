import { FAJN, TEDA, DOBREMOJ } from "./actionTypes";

const initialState = {

};

export default (state = initialState, {type, payload}) => {
  switch (type) {
    case FAJN:
      return {
        ...state, ...payload
      };
    case TEDA:
      return {
        ...state, ...payload
      };
    case DOBREMOJ:
      return {
        ...state, ...payload
      };
    default:
      return state;
  }
};