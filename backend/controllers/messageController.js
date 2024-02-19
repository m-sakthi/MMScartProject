const Message = require('../models/messageModel');
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures');

//Get Messages - /api/v1/messages
exports.getMessages = catchAsyncError(async (req, res, next) => {
  const resPerPage = 10;
  const totalCount = await Message.countDocuments({});
  const messages = await Message
    .find({ channel: req.query.channelId })
    .sort({ createdAt: 'asc' })
    .lean({ virtuals: true }).exec();

  res.status(200).json({
    success: true,
    count: messages.length,
    totalCount,
    resPerPage,
    messages
  })
})

//Create Message - /api/v1/Message/new
exports.newMessage = catchAsyncError(async (req, res, next) => {
  let images = []
  let BASE_URL = process.env.BACKEND_URL;
  if (process.env.NODE_ENV === "production") {
    BASE_URL = `${req.protocol}://${req.get('host')}`
  }

  if (req.files.length > 0) {
    req.files.forEach(file => {
      let url = `${BASE_URL}/uploads/Message/${file.originalname}`;
      images.push({ image: url })
    })
  }

  req.body.images = images;
  req.body.user = req.user.id;

  const message = await Message.create(req.body);

  res.status(201).json({
    success: true,
    message
  })
});

// //Get Single Message - api/v1/Message/:id
// exports.getSingleMessage = catchAsyncError(async (req, res, next) => {
//   const Message = await Message.findById(req.params.id).populate('reviews.user', 'name email');

//   if (!Message) {
//     return next(new ErrorHandler('Message not found', 400));
//   }

//   res.status(201).json({
//     success: true,
//     Message
//   })
// })

// //Update Message - api/v1/Message/:id
// exports.updateMessage = catchAsyncError(async (req, res, next) => {
//   let Message = await Message.findById(req.params.id);

//   //uploading images
//   let images = []

//   //if images not cleared we keep existing images
//   if (req.body.imagesCleared === 'false') {
//     images = Message.images;
//   }
//   let BASE_URL = process.env.BACKEND_URL;
//   if (process.env.NODE_ENV === "messageion") {
//     BASE_URL = `${req.protocol}://${req.get('host')}`
//   }

//   if (req.files.length > 0) {
//     req.files.forEach(file => {
//       let url = `${BASE_URL}/uploads/Message/${file.originalname}`;
//       images.push({ image: url })
//     })
//   }


//   req.body.images = images;

//   if (!Message) {
//     return res.status(404).json({
//       success: false,
//       message: "Message not found"
//     });
//   }

//   Message = await Message.findByIdAndUpdate(req.params.id, req.body, {
//     new: true,
//     runValidators: true
//   })

//   res.status(200).json({
//     success: true,
//     Message
//   })

// })

// //Delete Message - api/v1/Message/:id
// exports.deleteMessage = catchAsyncError(async (req, res, next) => {
//   const Message = await Message.findById(req.params.id);

//   if (!Message) {
//     return res.status(404).json({
//       success: false,
//       message: "Message not found"
//     });
//   }

//   await Message.remove();

//   res.status(200).json({
//     success: true,
//     message: "Message Deleted!"
//   })

// })
