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
      const messages = state.messages.find(id => id === action.payload._id)
        ? state.messages
        : [...state.messages, action.payload];

      return {
        ...state,
        loading: false,
        messages
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

