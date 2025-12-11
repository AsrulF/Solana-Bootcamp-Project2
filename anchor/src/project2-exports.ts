// Here we export some useful types and functions for interacting with the Anchor program.
import { Account, getBase58Decoder, SolanaClient } from 'gill'
import { getProgramAccountsDecoded } from './helpers/get-program-accounts-decoded'
import { Project2, PROJECT2_DISCRIMINATOR, PROJECT2_PROGRAM_ADDRESS, getProject2Decoder } from './client/js'
import Project2IDL from '../target/idl/project2.json'

export type Project2Account = Account<Project2, string>

// Re-export the generated IDL and type
export { Project2IDL }

export * from './client/js'

export function getProject2ProgramAccounts(rpc: SolanaClient['rpc']) {
  return getProgramAccountsDecoded(rpc, {
    decoder: getProject2Decoder(),
    filter: getBase58Decoder().decode(PROJECT2_DISCRIMINATOR),
    programAddress: PROJECT2_PROGRAM_ADDRESS,
  })
}
