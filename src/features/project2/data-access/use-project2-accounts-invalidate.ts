import { useQueryClient } from '@tanstack/react-query'
import { useProject2AccountsQueryKey } from './use-project2-accounts-query-key'

export function useProject2AccountsInvalidate() {
  const queryClient = useQueryClient()
  const queryKey = useProject2AccountsQueryKey()

  return () => queryClient.invalidateQueries({ queryKey })
}
