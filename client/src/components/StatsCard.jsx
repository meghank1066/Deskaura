
function StatCard({title,value,icon}){

return (

<div className="stats-card">

<div className="stats-icon">
{icon}
</div>


<h3>
{title}
</h3>


<p>
{value}
</p>


</div>

)

}


export default StatCard;