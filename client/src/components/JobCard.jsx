import { Link } from "react-router-dom";


function JobCard({ job }) {


return (

<div className="job-card">


    <div className="job-header">

        <h3>{job.company}</h3>

        <span className={`status ${job.status}`}>
            {job.status}
        </span>

    </div>



    <p className="role">
        {job.position}
    </p>


    <p>
        📍 {job.location}
    </p>


    <p>
        Applied: {new Date(job.dateApplied).toLocaleDateString()}
    </p>


    <Link to={`/jobs/${job._id}`}>
        View Details
    </Link>


</div>

);

}


export default JobCard;