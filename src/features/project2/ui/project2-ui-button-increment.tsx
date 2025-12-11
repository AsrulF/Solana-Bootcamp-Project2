import { Project2Account } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'
import { useProject2IncrementMutation } from '../data-access/use-project2-increment-mutation'

export function Project2UiButtonIncrement({ account, project2 }: { account: UiWalletAccount; project2: Project2Account }) {
  const incrementMutation = useProject2IncrementMutation({ account, project2 })

  return (
    <Button variant="outline" onClick={() => incrementMutation.mutateAsync()} disabled={incrementMutation.isPending}>
      Increment
    </Button>
  )
}
