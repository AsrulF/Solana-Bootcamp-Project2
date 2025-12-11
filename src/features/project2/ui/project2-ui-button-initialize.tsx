import { Button } from '@/components/ui/button'
import { UiWalletAccount } from '@wallet-ui/react'

import { useProject2InitializeMutation } from '@/features/project2/data-access/use-project2-initialize-mutation'

export function Project2UiButtonInitialize({ account }: { account: UiWalletAccount }) {
  const mutationInitialize = useProject2InitializeMutation({ account })

  return (
    <Button onClick={() => mutationInitialize.mutateAsync()} disabled={mutationInitialize.isPending}>
      Initialize Project2 {mutationInitialize.isPending && '...'}
    </Button>
  )
}
