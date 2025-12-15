import * as anchor from '@coral-xyz/anchor';
import { Program } from '@coral-xyz/anchor';
import { Keypair, PublicKey } from '@solana/web3.js';
import { Project2 } from "../target/types/project2";
import { BankrunProvider, startAnchor } from "anchor-bankrun";

const IDL = require("../target/idl/project2.json");

const project2Address = new PublicKey("Count3AcZucFDPSFBAeHkQ6AvttieKUkyJ8HiQGhQwe")

describe('project2', () => {

  let context;
  let provider;
  let project2Program: Program<Project2>;

  beforeAll(async () => {
    context = await startAnchor("", [{name: "project2", programId: project2Address}], []);
    provider = new BankrunProvider(context);

    project2Program = new Program<Project2>(
      IDL,
      provider,
    );
  })


  it('Initialize Poll', async () => {

    await project2Program.methods.initializePoll(
      new anchor.BN(1),
      "What is your type of peanut butter ?",
      new anchor.BN(0),
      new anchor.BN(1865505523)
    ).rpc();

    const [pollAddress] = PublicKey.findProgramAddressSync(
      [new anchor.BN(1).toArrayLike(Buffer, 'le', 8)],
      project2Address,
    );

    const poll = await project2Program.account.poll.fetch(pollAddress);

    console.log(poll);

    expect(poll.pollId.toNumber()).toEqual(1);
    expect(poll.pollDescription).toEqual("What is your type of peanut butter ?");
    expect(poll.pollStart.toNumber()).toBeLessThan(poll.pollEnd.toNumber());
    expect(poll.candidateAmount.toNumber()).toEqual(0);
  })

  it('Initialize Candidate', async () => {

    await project2Program.methods.initializeCandidate(
      "Smooth",
      new anchor.BN(1),
    ).rpc();

    await project2Program.methods.initializeCandidate(
      "Crunchy",
      new anchor.BN(1),
    ).rpc();

    const [smoothAddress] = PublicKey.findProgramAddressSync(
      [Buffer.from("Smooth"), new anchor.BN(1).toArrayLike(Buffer, 'le', 8)],
      project2Address,
    );

    const smoothCandidate = await project2Program.account.candidate.fetch(smoothAddress);

    console.log(smoothCandidate);

    expect(smoothCandidate.candidateName).toEqual("Smooth");
    expect(smoothCandidate.candidateVote.toNumber()).toEqual(0);

    const [crunchyAddress] = PublicKey.findProgramAddressSync(
      [Buffer.from("Crunchy"), new anchor.BN(1).toArrayLike(Buffer, 'le', 8)],
      project2Address,
    );

    const crunchyCandidate = await project2Program.account.candidate.fetch(crunchyAddress);

    console.log(crunchyCandidate);

    expect(crunchyCandidate.candidateName).toEqual("Crunchy");
    expect(crunchyCandidate.candidateVote.toNumber()).toEqual(0);

  })

  it('vote', async () => {

    await project2Program.methods.vote(
      "Crunchy",
      new anchor.BN(1),
    ).rpc();

    const [crunchyAddress] = PublicKey.findProgramAddressSync(
      [Buffer.from("Crunchy"), new anchor.BN(1).toArrayLike(Buffer, 'le', 8)],
      project2Address,
    );

    const crunchyCandidate = await project2Program.account.candidate.fetch(crunchyAddress);

    console.log(crunchyCandidate);

    expect(crunchyCandidate.candidateName).toEqual("Crunchy");
    expect(crunchyCandidate.candidateVote.toNumber()).toEqual(1);
  })

})

