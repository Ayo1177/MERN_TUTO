import Note from "../model/Note.js";

export async function getAllNotes(req, res) {
    try {
        // Fetch all notes from the database
        const notes = await Note.find().sort({ createdAt: -1 }); // Sort notes by creation date in descending order
        res.status(200).json(notes); // Return the notes as JSON
    } catch (error) {
        console.error("Error fetching notes:", error);
        res.status(500).json({ message: "Error fetching notes", error: error.message });
    }
};


export async function createNote(req, res) {
    try {
        const {title, content} = req.body; // Destructure title and content from request body
        const newNote = new Note({ title, content }); // Create a new note instance
        
        const savedNote = await newNote.save(); // Save the note to the database
        res.status(201).json({message: "Note created successfully", note: newNote}); // Return the created note as JSON
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ message: "Error creating note", error: error.message });
    }
};

export async function updateNote(req, res) {
    try {
        const { title, content } = req.body; // Destructure title and content from request body
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true }); // Update the note by ID
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" }); // If note not found, return 404
        }
        res.status(200).json(updatedNote); 
    } catch (error) {
        console.error("Error creating note:", error);
        res.status(500).json({ message: "Error creating note", error: error.message });
    }
};

export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id); // Delete the note by ID
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" }); // If note not found, return 404
        }
        res.status(200).json({ message: "Note deleted successfully" }); // Return success message
    } catch (error) {
        console.error("Error deleting note:", error);
        res.status(500).json({ message: "Error deleting note", error: error.message });
    }   
};

export async function getNoteById(req, res) {
    try {
        const note = await Note.findById(req.params.id); // Find the note by ID
        if (!note) {
            return res.status(404).json({ message: "Note not found" }); // If note not found, return 404
        }
        res.status(200).json(note); // Return the found note as JSON
    } catch (error) {
        console.error("Error fetching note:", error);
        res.status(500).json({ message: "Error fetching note", error: error.message });
    }
};

