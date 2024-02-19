import BN from 'bn.js';

const anchor = require('@project-serum/anchor')
const { DEFI_PROGRAM_ID } = require('@solana/spl-token')
const _ = require('lodash')
const { web3 } = anchor
const { SystemProgram } = web3
const assert = require('assert')
const utf8 = anchor.utils.bytes.utf8
//const provider = anchor.Provider.env()
const provider = anchor.Provider.local()
const TOKEN_PROGRAM_ID = "2FMfGHc7zqgKS8oDTVZPNvUGz5KAPb8G9mbQX8vgcf2C"

const defaultAccounts = {
  tokenProgram: TOKEN_PROGRAM_ID,
  clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
  systemProgram: SystemProgram.programId,
  // rent: anchor.web3.SYSVAR_RENT_PUBKEY,
}

// Configure the client to use the local cluster.
anchor.setProvider(provider)
const program = anchor.workspace.TikTokClone as Program<Defi>
let creatorKey = provider.wallet.publicKey
let stateSigner
let videoSigner

describe('Defi initialize', () => {
  it('Create State', async () => {
    ;[stateSigner] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode('state')],
      program.programId,
    )

    try {
      const stateInfo = await program.account.stateAccount.fetch(stateSigner)
    } catch {
      await program.rpc.createState({
        accounts: {
          state: stateSigner,
          authority: creatorKey,
          ...defaultAccounts,
        },
      })

      const stateInfo = await program.account.stateAccount.fetch(stateSigner)
      assert(
        stateInfo.authority.toString() === creatorKey.toString(),
        'State Creator is Invalid',
      )
    }
  })

  it("Should Deposit Assets", async () => {
    const stateInfo = await program.account.stateAccount.fetch(stateSigner);
    console.log(stateInfo.count);

    if (stateInfo.count > 0) {
      return;
    }

    [userSigner] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode('defi'), stateInfo.count.toBuffer("be", 8)],
      program.programId
    );

    try{
      const defiInfo = await program.account.defiAccount.fetch(videoSigner);
      console.log(defiInfo);
    }
    catch{
      await program.rpc.deposit("this is first transaction", "dummy_url","first", "https://first.com", {
        accounts: {
          state: stateSigner,
          fund: DEFI_PROGRAM_ID,
          authority: creatorKey,
          ...defaultAccounts
        },
      })

      const defiInfo = await program.account.defiAccount.fetch(userSigner);
      console.log(defiInfo);
      assert(defiInfo.authority.toString() === creatorKey.toString(), "User is Invalid");
    
  });

  

  it("should withdraw funds", async () => {
    const stateInfo = await program.account.stateAccount.fetch(stateSigner);
    console.log(stateInfo.defiCount);

    if (stateInfo.defiCount > 1) {
      return;
    }

    [defiSigner] = await anchor.web3.PublicKey.findProgramAddress(
      [utf8.encode('transaction'), stateInfo.defiCount.toBuffer("be", 8)],
      program.programId
    );

    try{
      const defiInfo = await program.account.defiAccount.fetch(userSigner);
      console.log(defiInfo);
    }
    catch{
      

      const defiInfo = await program.account.defiAccount.fetch(userSigner);
      console.log(defiInfo);
      assert(defiInfo.authority.toString() === creatorKey.toString(), "User is Invalid");
    }
  });

  

})
