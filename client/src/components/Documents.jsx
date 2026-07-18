function Documents({documents}){


return(

<div className="documents">


<h2>
Documents
</h2>


<p>
📄 CV:
{" "}
{documents?.cv || "None uploaded"}
</p>


<p>
✉️ Cover Letter:
{" "}
{documents?.coverLetter || "None uploaded"}
</p>



<button>
Upload Document
</button>


</div>

)

}


export default Documents;