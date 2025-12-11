#![allow(clippy::result_large_err)]

use anchor_lang::prelude::*;

declare_id!("Count3AcZucFDPSFBAeHkQ6AvttieKUkyJ8HiQGhQwe");

#[program]
pub mod project2 {
    use super::*;

    pub fn close(_ctx: Context<CloseProject2>) -> Result<()> {
        Ok(())
    }

    pub fn decrement(ctx: Context<Update>) -> Result<()> {
        ctx.accounts.project2.count = ctx.accounts.project2.count.checked_sub(1).unwrap();
        Ok(())
    }

    pub fn increment(ctx: Context<Update>) -> Result<()> {
        ctx.accounts.project2.count = ctx.accounts.project2.count.checked_add(1).unwrap();
        Ok(())
    }

    pub fn initialize(_ctx: Context<InitializeProject2>) -> Result<()> {
        Ok(())
    }

    pub fn set(ctx: Context<Update>, value: u8) -> Result<()> {
        ctx.accounts.project2.count = value.clone();
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeProject2<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
  init,
  space = 8 + Project2::INIT_SPACE,
  payer = payer
    )]
    pub project2: Account<'info, Project2>,
    pub system_program: Program<'info, System>,
}
#[derive(Accounts)]
pub struct CloseProject2<'info> {
    #[account(mut)]
    pub payer: Signer<'info>,

    #[account(
  mut,
  close = payer, // close account and return lamports to payer
    )]
    pub project2: Account<'info, Project2>,
}

#[derive(Accounts)]
pub struct Update<'info> {
    #[account(mut)]
    pub project2: Account<'info, Project2>,
}

#[account]
#[derive(InitSpace)]
pub struct Project2 {
    count: u8,
}
