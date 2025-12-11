import { Project2Account } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useProject2DecrementMutation } from '../data-access/use-project2-decrement-mutation'

export function Project2UiButtonDecrement({ account, project2 }: { account: UiWalletAccount; project2: Project2Account }) {
  const decrementMutation = useProject2DecrementMutation({ account, project2 })

  return (
    <Button variant="outline" onClick={() => decrementMutation.mutateAsync()} disabled={decrementMutation.isPending}>
      Decrement
    </Button>
  )
}
