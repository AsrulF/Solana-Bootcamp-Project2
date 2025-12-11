import { Project2Account } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useProject2CloseMutation } from '@/features/project2/data-access/use-project2-close-mutation'

export function Project2UiButtonClose({ account, project2 }: { account: UiWalletAccount; project2: Project2Account }) {
  const closeMutation = useProject2CloseMutation({ account, project2 })

  return (
    <Button
      variant="destructive"
      onClick={() => {
        if (!window.confirm('Are you sure you want to close this account?')) {
          return
        }
        return closeMutation.mutateAsync()
      }}
      disabled={closeMutation.isPending}
    >
      Close
    </Button>
  )
}
