import React from 'react'
import { Link } from 'react-router-dom'

const NotesNotFound = () => {
  return (
    <div className="text-center text-gray-500 py-10">
      <h2 className="text-2xl font-bold mb-4">No Notes Found</h2>
      <p className="text-lg">
        It seems you haven't created any notes yet. Click the button below to create your first note!
      </p>
      <Link to="/create" className="btn btn-primary mt-6">
        Create Note
      </Link>
    </div>
  )
}

export default NotesNotFound
