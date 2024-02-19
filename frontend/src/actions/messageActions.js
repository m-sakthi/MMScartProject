import axios from 'axios';
import {
  messagesRequest,
  messagesSuccess,
  messagesFail,
  saveSocket,
  addNewMessage,
} from '../slices/messageSlice';

import {
  channelsRequest,
  channelsSuccess,
  channelsFail,
  updateChannelLastMessage,
} from '../slices/channelSlice';

import { saveIsOnline } from '../slices/authSlice'

export const getChannels = async (dispatch) => {
  try {
    dispatch(channelsRequest())
    const { data } = await axios.get(`/api/v1/channels`)
    dispatch(channelsSuccess(data))
  } catch (error) {
    dispatch(channelsFail(error.response.data.message))
  }
}

export const getMessages = channelId => async (dispatch) => {
  try {
    dispatch(messagesRequest())
    const { data } = await axios.get(`/api/v1/messages?channelId=${channelId}`)
    dispatch(messagesSuccess(data))
  } catch (error) {
    dispatch(messagesFail(error.response.data.message))
  }
}


// export const findOrCreateAdminChannel = async (dispatch) => {
//   try {
//     dispatch(channelsRequest())
//     const { data } = await axios.put(`/api/v1/channels/adminFindOrCreate`)
//     dispatch(channelsSuccess(data))
//     // Get all the messages once channel is fetched
//     dispatch(getMessages(data.channel._id));
//   } catch (error) {
//     dispatch(channelsFail(error.response.data.message))
//   }
// }

export const newMessageReceived = params => async (dispatch) => {
  if (params.data) {
    dispatch(addNewMessage(params.data));
    dispatch(updateChannelLastMessage(params.data));
  }
}

export const saveSocketDetail = socket => async (dispatch) => {
  dispatch(saveSocket(socket));
  dispatch(saveIsOnline(Boolean(socket)));
};
