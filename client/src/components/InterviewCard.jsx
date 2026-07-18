function InterviewCard({date}){


return(

<div className="interview-card">

<h2>
Upcoming Interview
</h2>

<p>
📅 {date || "No interview scheduled"}
</p>

<button>
Add Interview
</button>

</div>
)

}

export default InterviewCard;