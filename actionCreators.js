import {
    AHOJ,FERO
} from "./actionTypes";

export const ahoj = payload => ({
  type: AHOJ,
  payload
});
export const  fero = payload => ({
  type: FERO,
  payload
});
