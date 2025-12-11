import { PROJECT2_PROGRAM_ADDRESS } from '@project/anchor'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { ellipsify } from '@wallet-ui/react'

export function Project2UiProgramExplorerLink() {
  return <AppExplorerLink address={PROJECT2_PROGRAM_ADDRESS} label={ellipsify(PROJECT2_PROGRAM_ADDRESS)} />
}
