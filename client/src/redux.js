import { combineReducers } from 'redux'
import axios from 'axios'
import { serverURI } from './config';

let request = axios.create({
  'baseURL': serverURI,
  'Access-Control-Allow-Origin': '*'
});

const GET_KITTIES = 'GET_KITTIES'
const GET_GIFTING_LIST = 'GET_GIFTING_LIST'
const GET_GIFTING_KITTY_LIST = 'GET_GIFTING_KITTY_LIST'

export const getCatList = (offset=0, address) => function (dispatch) {
  request.get(`https://api.cryptokitties.co/v2/kitties?offset=${offset}&limit=20&owner_wallet_address=${address}&parents=false&authenticated=true&include=sale,sire,other&orderBy=id&orderDirection=desc`)
  .then(list=>{
    dispatch({ type: GET_KITTIES, payload: list.data })
  }).catch(err=>console.error(err))
}
export const getGiftingList = (address) => function (dispatch) {
  request.get(`/api/giftingList/${address}`)
  .then(res=>{
    dispatch({ type: GET_GIFTING_LIST, payload: res.data })
  }).catch(err=>console.error(err))
}
export const getGiftingKittyList = (address) => function (dispatch) {
  request.get(`/api/giftingKittyList/${address}`)
  .then(res=>{
    dispatch({ type: GET_GIFTING_KITTY_LIST, payload: res.data })
  }).catch(err=>console.error(err))
}
export const newGifting = (data) => function (dispatch) {
  request.post(`/api/giftingList`, data)
  .then(res=>{
  }).catch(err=>console.error(err))
}
export const removeGifting = (data) => function (dispatch) {
  request.post(`/api/removeGifting`, data)
  .then(res=>{
  }).catch(err=>console.error(err))
}

const INIT_STATE = {
  catList: [],
  giftingList: [],
  giftingKittyList: []
}

function reducer(state = INIT_STATE, action){
  switch (action.type) {
    case GET_KITTIES:
      return { ...state, catList: action.payload }
    case GET_GIFTING_LIST:
      return { ...state, giftingList: action.payload }
    case GET_GIFTING_KITTY_LIST:
      return { ...state, giftingKittyList: action.payload }
    default:
      return state
  }
}

export const reducers = combineReducers({
  props: reducer
})