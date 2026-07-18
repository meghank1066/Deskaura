function StatusTimeline({ timeline }) {


return (

<div className="timeline">

<h2>
Application Progress
</h2>


{timeline.map((step,index)=>(

<div 
key={index}
className={`timeline-step ${
step.completed ? "complete" : ""
}`}
>


<div className="circle">
{
step.completed ? "✓" : "○"
}
</div>


<div>

<h4>
{step.name}
</h4>


<p>
{step.date || "Pending"}
</p>

</div>


</div>


))}


</div>

)

}


export default StatusTimeline;