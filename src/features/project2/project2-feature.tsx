import { useSolana } from '@/components/solana/use-solana'
import { WalletDropdown } from '@/components/wallet-dropdown'
import { AppHero } from '@/components/app-hero'
import { Project2UiButtonInitialize } from './ui/project2-ui-button-initialize'
import { Project2UiList } from './ui/project2-ui-list'
import { Project2UiProgramExplorerLink } from './ui/project2-ui-program-explorer-link'
import { Project2UiProgramGuard } from './ui/project2-ui-program-guard'

export default function Project2Feature() {
  const { account } = useSolana()

  return (
    <Project2UiProgramGuard>
      <AppHero
        title="Project2"
        subtitle={
          account
            ? "Initialize a new project2 onchain by clicking the button. Use the program's methods (increment, decrement, set, and close) to change the state of the account."
            : 'Select a wallet to run the program.'
        }
      >
        <p className="mb-6">
          <Project2UiProgramExplorerLink />
        </p>
        {account ? (
          <Project2UiButtonInitialize account={account} />
        ) : (
          <div style={{ display: 'inline-block' }}>
            <WalletDropdown />
          </div>
        )}
      </AppHero>
      {account ? <Project2UiList account={account} /> : null}
    </Project2UiProgramGuard>
  )
}
