import { useToast } from 'vue-toastification'

const toast = useToast()

export const showToast = {
  success: (msg: string, opts = {}) => toast.success(msg, opts),
  error: (msg: string, opts = {}) => toast.error(msg, opts),
  info: (msg: string, opts = {}) => toast.info(msg, opts),
  warning: (msg: string, opts = {}) => toast.warning(msg, opts)
}
