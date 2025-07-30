// src/components/Toast.jsx
import { toast } from 'react-hot-toast'

const Toast = {
  error: (message) => toast.error(message),
  success: (message) => toast.success(message)
}

export default Toast
