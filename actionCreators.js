import {
    AHOJ_CAV,FETCH_OK,OK,M
} from "./actionTypes";

export const ahojCav = payload => ({
  type: AHOJ_CAV,
  payload
});
export const  fetchOk = payload => ({
  type: FETCH_OK,
  payload
});
export const  ok = payload => ({
  type: OK,
  payload
});
export const  m = payload => ({
  type: M,
  payload
});
import {
    DOBRE_CAV
} from "./actionTypes";

export const DOBRECAV = payload => ({
  type: DOBRECAV,
  payload
});
import {
    M_N
} from "./actionTypes";

export const mN = payload => ({
  type: M_N,
  payload
});
import {
    KRASNE_FUNGUJEME
} from "./actionTypes";

export const krasneFungujeme = payload => ({
  type: KRASNE_FUNGUJEME,
  payload
});
