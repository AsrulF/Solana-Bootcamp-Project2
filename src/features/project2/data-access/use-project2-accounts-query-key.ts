import { useSolana } from '@/components/solana/use-solana'

export function useProject2AccountsQueryKey() {
  const { cluster } = useSolana()

  return ['project2', 'accounts', { cluster }]
}
