import { useSolana } from '@/components/solana/use-solana'
import { useQuery } from '@tanstack/react-query'
import { getProject2ProgramAccounts } from '@project/anchor'
import { useProject2AccountsQueryKey } from './use-project2-accounts-query-key'

export function useProject2AccountsQuery() {
  const { client } = useSolana()

  return useQuery({
    queryKey: useProject2AccountsQueryKey(),
    queryFn: async () => await getProject2ProgramAccounts(client.rpc),
  })
}
