const {validationResult}= require('express-validator/check');
const Post= require("../models/post");

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: '1',
        title: 'First Post',
        content: 'This is the first post!',
        imageUrl: 'images/hey.png',
        creator: {
          name: 'Mrin'
        },
        createdAt: new Date()
      }
    ]
  });
};

exports.createPost = (req, res, next) => {
  const errors= validationResult(req);
  if(!errors.isEmpty()){
    const error=new Error('Validation error');
    error.statusCode= 422;
    throw error;
  }
    // Create post in db
  const title = req.body.title;
  const content = req.body.content;
  const post= new Post({
    title: title,
    imageUrl:'images/hey.png',
    content: content,
    creator: {name:'Mrin'}
  });
  post.save().then(result=>{
    console.log(result);
    res.status(201).json({
      message: 'Post created successfully!',
      post: result
    });
  }).catch(err=>{
    // console.log(err);
    if(!error.statusCode){
      error.statusCode=500; 
    }
    next(err);
  })
};
