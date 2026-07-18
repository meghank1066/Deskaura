function ContactCard({contact}){

return(
<div className="contact-card">

<h2>
Recruiter Contact
</h2>

<p>
👤 {contact?.name || "No contact"}
</p>
<p>
📧 {contact?.email || "No email"}
</p>

</div>
)
}

export default ContactCard;