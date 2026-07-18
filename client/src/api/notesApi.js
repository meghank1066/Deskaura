import API from "./axios";


export const getNotes = (jobId) => {
    return API.get(`/notes/${jobId}`);
};


export const createNote = (note) => {
    return API.post("/notes", note);
};


export const deleteNote = (id) => {
    return API.delete(`/notes/${id}`);
};