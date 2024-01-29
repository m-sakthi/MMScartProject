import axios from 'axios';
import {
  messagesRequest,
  messagesSuccess,
  messagesFail,
  saveSocketID,
  channelsRequest,
  channelsSuccess,
  channelsFail,
  addNewMessage,
} from '../slices/messageSlice';

export const getChannels = async (dispatch) => {
  try {
    dispatch(channelsRequest())
    const { data } = await axios.get(`/api/v1/channels`)
    dispatch(channelsSuccess(data))
  } catch (error) {
    dispatch(channelsFail(error.response.data.message))
  }
}


export const findOrCreateAdminChannel = async (dispatch) => {
  try {
    dispatch(channelsRequest())
    const { data } = await axios.put(`/api/v1/channels/adminFindOrCreate`)
    dispatch(channelsSuccess(data))
    console.log('*******  channelsSuccess data', data);
    // Get all the messages once channel is fetched
    dispatch(getMessages(data.channel._id));
  } catch (error) {
    dispatch(channelsFail(error.response.data.message))
  }
}

export const newMessageReceived = params => async (dispatch) => {
  if (params.data) {
    dispatch(addNewMessage(params.data));
  }
}

export const saveSocketDetail = socketID => async (dispatch) => {
  dispatch(saveSocketID(socketID));
};
