const Job = require("../models/Job");

exports.getStats = async (req, res) => {
  try {

    const jobs = await Job.find({
      user: req.user._id
    }).sort({
      createdAt: -1
    });


    const totalApplications = jobs.length;

    const applied = jobs.filter(
      job => job.status === "Applied"
    ).length;

    const interviews = jobs.filter(
      job => job.status === "Interview"
    ).length;

    const offers = jobs.filter(
      job => job.status === "Offer"
    ).length;


    const rejected = jobs.filter(
      job => job.status === "Rejected"
    ).length;


    // percentage calculations
    const interviewRate = totalApplications
      ? Math.round((interviews / totalApplications) * 100)
      : 0;


    const offerRate = totalApplications
      ? Math.round((offers / totalApplications) * 100)
      : 0;


    const responseRate = totalApplications
      ? Math.round(
          ((interviews + offers + rejected) / totalApplications) * 100
        )
      : 0;



    const recentApplications = jobs.slice(0, 5);



    res.json({

      totalApplications,

      applied,

      interviews,

      offers,

      rejected,


      responseRate: `${responseRate}%`,

      interviewRate: `${interviewRate}%`,

      offerRate: `${offerRate}%`,


      recentApplications

    });


  } catch(error){

    res.status(500).json({
      message:error.message
    });

  }
};