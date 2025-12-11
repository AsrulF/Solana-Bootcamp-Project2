import { Project2UiCard } from './project2-ui-card'
import { useProject2AccountsQuery } from '@/features/project2/data-access/use-project2-accounts-query'
import { UiWalletAccount } from '@wallet-ui/react'

export function Project2UiList({ account }: { account: UiWalletAccount }) {
  const project2AccountsQuery = useProject2AccountsQuery()

  if (project2AccountsQuery.isLoading) {
    return <span className="loading loading-spinner loading-lg"></span>
  }

  if (!project2AccountsQuery.data?.length) {
    return (
      <div className="text-center">
        <h2 className={'text-2xl'}>No accounts</h2>
        No accounts found. Initialize one to get started.
      </div>
    )
  }

  return (
    <div className="grid lg:grid-cols-2 gap-4">
      {project2AccountsQuery.data?.map((project2) => (
        <Project2UiCard account={account} key={project2.address} project2={project2} />
      ))}
    </div>
  )
}
