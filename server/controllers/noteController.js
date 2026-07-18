const Note = require("../models/Note");


// creating a note
exports.createNote = async(req,res)=>{

try{

const note = await Note.create({

content:req.body.content,

job:req.params.jobId,

user:req.user._id

});


res.status(201).json(note);


}catch(error){

res.status(500).json({
message:error.message
});

}

};



// gets notes for a job
exports.getNotes = async(req,res)=>{

try{

const notes = await Note.find({

job:req.params.jobId,

user:req.user._id

});


res.json(notes);


}catch(error){

res.status(500).json({
message:error.message
});

}

};



// deletes note
exports.deleteNote = async(req,res)=>{

try{

await Note.findOneAndDelete({

_id:req.params.id,

user:req.user._id

});


res.json({
message:"Note deleted"
});


}catch(error){

res.status(500).json({
message:error.message
});

}

};