import {
  Blockhash,
  createSolanaClient,
  createTransaction,
  generateKeyPairSigner,
  Instruction,
  isSolanaError,
  KeyPairSigner,
  signTransactionMessageWithSigners,
} from 'gill'
import {
  fetchProject2,
  getCloseInstruction,
  getDecrementInstruction,
  getIncrementInstruction,
  getInitializeInstruction,
  getSetInstruction,
} from '../src'
// @ts-ignore error TS2307 suggest setting `moduleResolution` but this is already configured
import { loadKeypairSignerFromFile } from 'gill/node'

const { rpc, sendAndConfirmTransaction } = createSolanaClient({ urlOrMoniker: process.env.ANCHOR_PROVIDER_URL! })

describe('project2', () => {
  let payer: KeyPairSigner
  let project2: KeyPairSigner

  beforeAll(async () => {
    project2 = await generateKeyPairSigner()
    payer = await loadKeypairSignerFromFile(process.env.ANCHOR_WALLET!)
  })

  it('Initialize Project2', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getInitializeInstruction({ payer: payer, project2: project2 })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSER
    const currentProject2 = await fetchProject2(rpc, project2.address)
    expect(currentProject2.data.count).toEqual(0)
  })

  it('Increment Project2', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getIncrementInstruction({
      project2: project2.address,
    })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    const currentCount = await fetchProject2(rpc, project2.address)
    expect(currentCount.data.count).toEqual(1)
  })

  it('Increment Project2 Again', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getIncrementInstruction({ project2: project2.address })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    const currentCount = await fetchProject2(rpc, project2.address)
    expect(currentCount.data.count).toEqual(2)
  })

  it('Decrement Project2', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getDecrementInstruction({
      project2: project2.address,
    })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    const currentCount = await fetchProject2(rpc, project2.address)
    expect(currentCount.data.count).toEqual(1)
  })

  it('Set project2 value', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getSetInstruction({ project2: project2.address, value: 42 })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    const currentCount = await fetchProject2(rpc, project2.address)
    expect(currentCount.data.count).toEqual(42)
  })

  it('Set close the project2 account', async () => {
    // ARRANGE
    expect.assertions(1)
    const ix = getCloseInstruction({
      payer: payer,
      project2: project2.address,
    })

    // ACT
    await sendAndConfirm({ ix, payer })

    // ASSERT
    try {
      await fetchProject2(rpc, project2.address)
    } catch (e) {
      if (!isSolanaError(e)) {
        throw new Error(`Unexpected error: ${e}`)
      }
      expect(e.message).toEqual(`Account not found at address: ${project2.address}`)
    }
  })
})

// Helper function to keep the tests DRY
let latestBlockhash: Awaited<ReturnType<typeof getLatestBlockhash>> | undefined
async function getLatestBlockhash(): Promise<Readonly<{ blockhash: Blockhash; lastValidBlockHeight: bigint }>> {
  if (latestBlockhash) {
    return latestBlockhash
  }
  return await rpc
    .getLatestBlockhash()
    .send()
    .then(({ value }) => value)
}
async function sendAndConfirm({ ix, payer }: { ix: Instruction; payer: KeyPairSigner }) {
  const tx = createTransaction({
    feePayer: payer,
    instructions: [ix],
    version: 'legacy',
    latestBlockhash: await getLatestBlockhash(),
  })
  const signedTransaction = await signTransactionMessageWithSigners(tx)
  return await sendAndConfirmTransaction(signedTransaction)
}
