const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      required: true,
    },

    location: {
      type: String,
    },

    salary: {
      type: String,
    },

    jobType: {
      type: String,
      enum: [
        "Full-time",
        "Part-time",
        "Internship",
        "Contract"
      ],
    },

    status: {
      type: String,
      enum: [
        "Saved",
        "Applied",
        "Screening",
        "Interview",
        "Offer",
        "Rejected"
      ],
      default: "Applied",
    },


    applicationDate: {
      type: Date,
      default: Date.now,
    },


    deadline: {
      type: Date,
    },


    jobLink:{
 type:String
},

    // our application timeline
timeline: {
  type: [
    {
      name: String,
      date: Date,
      completed: Boolean
    }
  ],

  default: [
    {
      name: "Applied",
      completed: true,
      date: Date.now()
    },
    {
      name: "Screening",
      completed: false
    },
    {
      name: "Interview",
      completed: false
    },
    {
      name: "Offer",
      completed: false
    }
  ]
},


    // NEW: interview tracking
    interviewDate: {
      type: Date,
    },


    // NEW: uploaded files
    documents: {
      cv: {
        type: String,
      },

      coverLetter: {
        type: String,
      },
    },


    // NEW: recruiter details
    contact: {
      name: {
        type: String,
      },

      email: {
        type: String,
      },
    },


    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

  },
  {
    timestamps: true,
  }
);


module.exports = mongoose.model("Job", jobSchema);