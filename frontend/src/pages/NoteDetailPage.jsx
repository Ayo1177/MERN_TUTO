import React, { useEffect } from 'react'
import toast, { LoaderIcon } from 'react-hot-toast'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../lib/axios'
import { ArrowLeft, Trash } from 'lucide-react'

const NoteDetailPage = () => {
  const [note, setNote] = React.useState(null)
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)

  const navigate = useNavigate()
  const { id } = useParams()

  React.useEffect(() => {
    const fetchNote = async () => {
      try {
        const res = await api.get(`/notes/${id}`)
        setNote(res.data)
      } catch (error) {
        console.log('Error fetching note:', error)
        toast.error('Failed to fetch note')
      } finally {
        setLoading(false)
      }
    }

    fetchNote()
  }, [id])

  const handleDelete = async (noteId) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return

    try {
      await api.delete(`/notes/${noteId}`)
      toast.success('Note deleted successfully')
      navigate('/')
    } catch (error) {
      console.error('Error deleting note:', error)
      toast.error('Failed to delete note')
    }
  }
  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error('All fields are required')
      return
    }

    setSaving(true)
    try {
      await api.put(`/notes/${note._id}`, note)
      toast.success('Note saved successfully')
      navigate('/')
    } catch (error) {
      console.error('Error saving note:', error)
      toast.error('Failed to save note')
    } finally {
      setSaving(false)
    }
  }



  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <LoaderIcon className='size-6 animate-spin text-primary mx-auto mt-10' />
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-base-200'>
      <div className='container mx-auto px-4 py-8'>
        <div className='max-w-2xl mx-auto'>
          <div className='flex justify-between items-center mb-6'>
            <Link to='/' className='btn btn-ghost'>
              <ArrowLeft className='size-5' />
              Back to Notes
            </Link>
            <button
              className='btn btn-error btn-outline'
              onClick={() => handleDelete(note._id)}
            >
              <Trash className='size-5' />
              Delete Note
            </button>
          </div>

          <div className='form-control mb-4'>
            <label className='label'>
              <span className='label-text'>Title</span>
            </label>
            <input
              type='text'
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
              className='input input-bordered w-full'
            />
          </div>

          <div className='form-control mb-4'>
            <label className='label'>
              <span className='label-text'>Content</span>
            </label>
            <textarea
              value={note.content}
              onChange={(e) => setNote({ ...note, content: e.target.value })}
              className='textarea textarea-bordered w-full h-32'
            />
          </div>


          <div className="card-actions justify-end">
            <button
              className='btn btn-primary' disabled={saving} onClick={handleSave}>
              {saving ? 'Saving...' : 'Save Note'}
              </button>
          </div>
          {/* Add save button or other UI below */}
        </div>
      </div>
    </div>
  )
}

export default NoteDetailPage
