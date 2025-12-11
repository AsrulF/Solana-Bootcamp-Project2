import { Project2Account } from '@project/anchor'
import { UiWalletAccount } from '@wallet-ui/react'
import { Button } from '@/components/ui/button'

import { useProject2SetMutation } from '@/features/project2/data-access/use-project2-set-mutation'

export function Project2UiButtonSet({ account, project2 }: { account: UiWalletAccount; project2: Project2Account }) {
  const setMutation = useProject2SetMutation({ account, project2 })

  return (
    <Button
      variant="outline"
      onClick={() => {
        const value = window.prompt('Set value to:', project2.data.count.toString() ?? '0')
        if (!value || parseInt(value) === project2.data.count || isNaN(parseInt(value))) {
          return
        }
        return setMutation.mutateAsync(parseInt(value))
      }}
      disabled={setMutation.isPending}
    >
      Set
    </Button>
  )
}
