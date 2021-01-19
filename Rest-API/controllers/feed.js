const {validationResult}= require('express-validator/check');
const Post= require("../models/post");

exports.getPosts = (req, res, next) => {
  Post.find()
  .then(posts=>{
    res.status(200)
    .json({message: 'Fetched posts succesfully', posts:posts});
  })
  .catch(err=>{
    // console.log(err);
    if(!error.statusCode){
      error.statusCode=500; 
    }
    next(err);
  })
};

exports.createPost = (req, res, next) => {
  const errors= validationResult(req);
  if(!errors.isEmpty()){
    const error=new Error('Validation error');
    error.statusCode= 422;
    throw error;
  }
  if(!req.file){
    const error= new Error("file not uploaded");
    error.statusCode=422;
    throw error;
  }

    // Create post in db
    const image= req.file.filename
    console.log(image);
  const title = req.body.title;
  const content = req.body.content;
  const post= new Post({
    title: title,
    imageUrl:"images/"+image,
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

exports.getPost=(req,res,next)=>{
  const postId=req.params.postId;
  Post.findById(postId)
  .then(post=>{
    if(!post){
      const error= new Error("could not found");
      error.statusCode= 404;
      throw error;
    }
    res.status(200).json({message: "Post fetched", post: post});
  })
  .catch(err=>{
    if(!err.statusCode){
      err.statusCode=500;
    }
    next(err);
  });
};
