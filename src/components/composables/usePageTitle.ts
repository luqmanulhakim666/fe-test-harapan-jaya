import { ref } from 'vue'

const pageTitle = ref<string>('')

export function usePageTitle(title?: string) {
  if (title) pageTitle.value = title
  return pageTitle
}
