const Channel = require('../models/channelModel');
const User = require('../models/userModel');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const APIFeatures = require('../utils/apiFeatures');

//Get Channels - /api/v1/channels
exports.getChannels = catchAsyncError(async (req, res, next) => {
  const resPerPage = 3;

  let buildQuery = () => {
    return new APIFeatures(Channel.find(), req.query).search().filter()
  }

  const filteredChannelsCount = await buildQuery().query.countDocuments({})
  const totalChannelsCount = await Channel.countDocuments({});
  let channelsCount = totalChannelsCount;

  if (filteredChannelsCount !== totalChannelsCount) {
    channelsCount = filteredChannelsCount;
  }

  const channels = await buildQuery().paginate(resPerPage).query;

  res.status(200).json({
    success: true,
    count: channelsCount,
    resPerPage,
    channels
  })
})

//Create Channel - /api/v1/Channel/findOrCreate
exports.findOrCreate = catchAsyncError(async (req, res, next) => {
  req.body.members = [req.user.id, req.body.recepientId];

  console.log("req.body:::", req.body);

  let channel = await Channel.findOne({
    members: [req.user.id, req.body.recepientId]
  });

  if (!channel) {
    channel = await Channel.create(req.body);

    return res.status(201).json({
      success: true,
      channel
    });
  } else {
    return res.status(200).json({
      success: true,
      channel: channel
    });
  }
});

// Create chat channel with Admin
exports.adminFindOrCreate = catchAsyncError(async (req, res, next) => {
  const adminUser = await User.findOne({
    role: 'admin'
  });

  if (!adminUser) {
    return res.status(400).json({
      message: 'Admin user not found..!'
    });
  } else {

  }

  req.body.members = [req.user.id, adminUser.id];

  let channel = await Channel.findOne({
    members: [req.user.id, adminUser.id]
  });

  if (!channel) {
    channel = await Channel.create(req.body);

    return res.status(201).json({
      success: true,
      channel
    });
  } else {
    return res.status(200).json({
      success: true,
      channel: channel
    });
  }
});


// //Get Single Channel - api/v1/Channel/:id
// exports.getSingleChannel = catchAsyncError(async (req, res, next) => {
//   const Channel = await Channel.findById(req.params.id).populate('reviews.user', 'name email');

//   if (!Channel) {
//     return next(new ErrorHandler('Channel not found', 400));
//   }

//   res.status(201).json({
//     success: true,
//     Channel
//   })
// })

// //Update Channel - api/v1/Channel/:id
// exports.updateChannel = catchAsyncError(async (req, res, next) => {
//   let Channel = await Channel.findById(req.params.id);

//   //uploading images
//   let images = []

//   //if images not cleared we keep existing images
//   if (req.body.imagesCleared === 'false') {
//     images = Channel.images;
//   }
//   let BASE_URL = process.env.BACKEND_URL;
//   if (process.env.NODE_ENV === "channelion") {
//     BASE_URL = `${req.protocol}://${req.get('host')}`
//   }

//   if (req.files.length > 0) {
//     req.files.forEach(file => {
//       let url = `${BASE_URL}/uploads/Channel/${file.originalname}`;
//       images.push({ image: url })
//     })
//   }


//   req.body.images = images;

//   if (!Channel) {
//     return res.status(404).json({
//       success: false,
//       channel: "Channel not found"
//     });
//   }

//   Channel = await Channel.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true
//   })

//   res.status(200).json({
//     success: true,
//     Channel
//   })

// })

// //Delete Channel - api/v1/Channel/:id
// exports.deleteChannel = catchAsyncError(async (req, res, next) => {
//   const Channel = await Channel.findById(req.params.id);

//   if (!Channel) {
//     return res.status(404).json({
//       success: false,
//       channel: "Channel not found"
//     });
//   }

//   await Channel.remove();

//   res.status(200).json({
//     success: true,
//     channel: "Channel Deleted!"
//   })

// })
