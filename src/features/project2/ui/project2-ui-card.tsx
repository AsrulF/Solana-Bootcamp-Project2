import { Project2Account } from '@project/anchor'
import { ellipsify, UiWalletAccount } from '@wallet-ui/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AppExplorerLink } from '@/components/app-explorer-link'
import { Project2UiButtonClose } from './project2-ui-button-close'
import { Project2UiButtonDecrement } from './project2-ui-button-decrement'
import { Project2UiButtonIncrement } from './project2-ui-button-increment'
import { Project2UiButtonSet } from './project2-ui-button-set'

export function Project2UiCard({ account, project2 }: { account: UiWalletAccount; project2: Project2Account }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Project2: {project2.data.count}</CardTitle>
        <CardDescription>
          Account: <AppExplorerLink address={project2.address} label={ellipsify(project2.address)} />
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 justify-evenly">
          <Project2UiButtonIncrement account={account} project2={project2} />
          <Project2UiButtonSet account={account} project2={project2} />
          <Project2UiButtonDecrement account={account} project2={project2} />
          <Project2UiButtonClose account={account} project2={project2} />
        </div>
      </CardContent>
    </Card>
  )
}
