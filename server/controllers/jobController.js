const Job = require("../models/Job");


// create a job
exports.createJob = async(req,res)=>{

try{

const job = await Job.create({

company:req.body.company,

role:req.body.role,

location:req.body.location,

salary:req.body.salary,

jobType:req.body.jobType,

status:req.body.status,

user:req.user._id

});


res.status(201).json(job);


}catch(error){

res.status(500).json({
message:error.message
});

}

};

// get all jobs
exports.getJobs = async (req,res)=>{
  try {

   const query = {
  user: req.user._id
};


if(req.query.status){
  query.status = req.query.status;
}


if(req.query.company){
  query.company = {
    $regex: req.query.company,
    $options: "i"
  };
}


const jobs = await Job.find(query)
.sort({
  createdAt:-1
});

    res.json(jobs);

  } catch(error){
    res.status(500).json({
      message:error.message
    });
  }
};


// get single job
exports.getJob = async(req,res)=>{
  try{

    const job = await Job.findOne({
      _id:req.params.id,
      user:req.user._id
    });

    if(!job){
      return res.status(404).json({
        message:"Job not found"
      });
    }

    res.json(job);

  }catch(error){
    res.status(500).json({
      message:error.message
    });
  }
};


// updates our job
exports.updateJob = async(req,res)=>{
  try{

    const job = await Job.findOneAndUpdate(
      {
        _id:req.params.id,
        user:req.user._id
      },
      req.body,
      {
        new:true
      }
    );

    res.json(job);

  }catch(error){
    res.status(500).json({
      message:error.message
    });
  }
};


// deletes our job
exports.deleteJob = async(req,res)=>{
  try{

    console.log("Deleting job:", req.params.id);

    const deletedJob = await Job.findOneAndDelete({
      _id:req.params.id,
      user:req.user._id
    });

    console.log("Deleted:", deletedJob);

    res.json({
      message:"Job deleted",
      deletedJob
    });

  }catch(error){
    res.status(500).json({
      message:error.message
    });
  }
};