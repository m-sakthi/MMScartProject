import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    loading: false,
    adminChannel: null,
    messages: []
  },
  reducers: {
    saveSocketID(state, action) {
      return {
        ...state,
        socketID: action.payload
      }
    },
    messagesRequest(state, action) {
      return {
        ...state,
        loading: true
      }
    },
    messagesSuccess(state, action) {
      return {
        ...state,
        loading: false,
        messages: action.payload.messages,
        messagesCount: action.payload.count
      }
    },
    messagesFail(state, action) {
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    },
    addNewMessage(state, action) {
      return {
        ...state,
        loading: false,
        messages: [...state.messages, action.payload]
      }
    },
  }
});

const { actions, reducer } = messageSlice;

export const {
  messagesRequest,
  messagesSuccess,
  messagesFail,
  saveSocketID,
  addNewMessage,
} = actions;

export default reducer;

