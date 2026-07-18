import { useEffect, useState } from "react";
import api from "../api/axios";


function Notes({ jobId }) {

  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {

    fetchNotes();

  }, [jobId]);



  const fetchNotes = async () => {

    try {

      const res = await api.get(`/notes/${jobId}`);

      setNotes(res.data);

    } catch(error) {

      console.error(
        "Failed to fetch notes",
        error
      );

    }

  };



  const addNote = async () => {

    if(!newNote.trim()) return;


    try {

      setLoading(true);


      const res = await api.post(
        `/notes/${jobId}`,
        {
          content: newNote
        }
      );


      setNotes([
        ...notes,
        res.data
      ]);


      setNewNote("");


    } catch(error) {

      console.error(
        "Failed to create note",
        error
      );


    } finally {

      setLoading(false);

    }

  };




  const deleteNote = async (noteId) => {

    try {

      await api.delete(`/notes/${noteId}`);


      setNotes(
        notes.filter(
          note => note._id !== noteId
        )
      );


    } catch(error) {

      console.error(
        "Failed to delete note",
        error
      );

    }

  };



  return (

    <section className="notes">


      <h2>
        Notes
      </h2>



      <div className="note-create">


        <textarea

          placeholder="Add interview prep notes, reminders..."

          value={newNote}

          onChange={(e)=>setNewNote(e.target.value)}

        />


        <button
          onClick={addNote}
          disabled={loading}
        >

          {loading ? "Saving..." : "Add Note"}

        </button>


      </div>




      <div className="note-list">


        {notes.length === 0 ? (

          <p>
            No notes yet
          </p>


        ) : (


          notes.map(note => (

            <div 
              key={note._id}
              className="note-card"
            >


              <p>
                {note.content}
              </p>


              <small>
                {new Date(note.createdAt)
                .toLocaleDateString()}
              </small>


              <button
                onClick={() => deleteNote(note._id)}
              >
                Delete
              </button>


            </div>


          ))

        )}


      </div>


    </section>

  );

}


export default Notes;