#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("Count3AcZucFDPSFBAeHkQ6AvttieKUkyJ8HiQGhQwe");

#[program]
pub mod project2 {
    use super::*;

    pub fn initialize_poll(
            ctx: Context<InitializePoll>,
            poll_id: u64,
            poll_description: String,
            poll_start: u64,
            poll_end: u64,
    ) -> Result<()> {
        let poll = &mut ctx.accounts.polls;
        poll.poll_id = poll_id;
        poll.poll_description = poll_description;
        poll.poll_start = poll_start;
        poll.poll_end = poll_end;
        poll.candidate_amount = 0;

        Ok(())
    }

    pub fn initialize_candidate(
        ctx: Context<InitializeCandidate>,
        candidate_name: String,
        _poll_id: u64,
    ) -> Result<()> {
        let candidate = &mut ctx.accounts.candidate;
        candidate.candidate_name = candidate_name;
        candidate.candidate_vote = 0;

        let poll = &mut ctx.accounts.poll;
        poll.candidate_amount += 1;

        Ok(())
    }

    pub fn vote(
        ctx: Context<MakeVote>,
        _candidate_name: String,
        _poll_id: u64,
    ) -> Result<()> {
        let vote = &mut ctx.accounts.candidate;
        vote.candidate_vote += 1;

        let voter =&mut ctx.accounts.voter;
        voter.voter = ctx.accounts.signer.key();
        
        Ok(())
    }

}

#[derive(Accounts)]
#[instruction(poll_id: u64)]
pub struct InitializePoll<'info> {
    #[account(mut)]
    pub voter: Signer<'info>,
    #[account(
        init,
        payer = voter,
        space = 8 + Poll::INIT_SPACE,
        seeds = [
            poll_id.to_le_bytes().as_ref(),
        ],
        bump
    )]
    pub polls: Account<'info, Poll>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct Poll {
    pub poll_id: u64,
    #[max_len(280)]
    pub poll_description: String,
    pub poll_start: u64,
    pub poll_end: u64,
    pub candidate_amount: u64,
}

#[derive(Accounts)]
#[instruction(candidate_name: String, poll_id: u64)]
pub struct  InitializeCandidate<'info> {
    #[account(mut)]
    pub maker: Signer<'info>,
    #[account(
        mut,
        seeds = [
            poll_id.to_le_bytes().as_ref(),
        ],
        bump
    )]
    pub poll: Account<'info, Poll>,
    #[account(
        init,
        payer = maker,
        space = 8 + Candidate::INIT_SPACE,
        seeds = [
            candidate_name.as_bytes(),
            poll_id.to_le_bytes().as_ref(),
        ],
        bump
    )]
    pub candidate: Account<'info, Candidate>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct Candidate {
    #[max_len(32)]
    pub candidate_name: String,
    pub candidate_vote: u64,
}


#[derive(Accounts)]
#[instruction(candidate_name: String, poll_id: u64)]
pub struct MakeVote<'info> {
    #[account(mut)]
    pub signer: Signer<'info>,
    #[account(
        seeds = [
            poll_id.to_le_bytes().as_ref()
        ],
        bump
    )]
    pub poll: Account<'info, Poll>,
    #[account(
        mut,
        seeds = [
            candidate_name.as_bytes(),
            poll_id.to_le_bytes().as_ref(),
        ],
        bump
    )]
    pub candidate: Account<'info, Candidate>,
    #[account(
        init,
        payer = signer,
        space = 8 + Voter::INIT_SPACE,
        seeds = [
            candidate_name.as_bytes(),
            poll_id.to_le_bytes().as_ref(),
            signer.key().as_ref(),
        ],
        bump
    )]
    pub voter: Account<'info, Voter>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(InitSpace)]
pub struct Voter {
    pub voter: Pubkey
}