import { useState, useEffect } from 'react' 
import { getAvatarUrl } from '../functions/getAvatarUrl' 
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base"; 
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
// import { PublicKey } from "@solana/web3.js";
import { clusterApiUrl, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js" 

import BigNumber from 'bignumber.js';

export const useCashApp = () => {
    const [avatar, setAvatar] = useState("")
    const [userAddress, setUserAddress] = useState("11111111111111111111111111111111")
    const [amount, setAmount] = useState(0) 
    const [newTransactionModalOpen, setNewTransactionModalOpen] = useState(false)

    const { connected, publicKey, sendTransaction } = useWallet() 
    const { connection } = useConnection() 
    // const [amount, setAmount] = useState(0)
    const [receiver, setReceiver] = useState('')
    const [transactionPurpose, setTransactionPurpose] = useState('')

    
    const useLocalStorage = (storageKey, fallbackState ) => {
        const [value, setValue] = useState( 
            JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState 
        )
        useEffect(() => {
            localStorage.setItem(storageKey, JSON.stringify(value)); 

        }, [value, setValue]) 
        return [value, setValue] 
    }

    // IMPORTANT 
    const [transactions, setTransactions] = useLocalStorage("transaction", []) 
    // Get Avatar based on the userAddress 
    useEffect(() => {
        if(connected){
            setAvatar(getAvatarUrl(publicKey.toString()))
            setUserAddress(publicKey.toString())
        }
    }, [connected])

    // Create the transaction to send to our wallet and we can sign it from there! 
    const makeTransaction = async (fromWallet, toWallet, amount, reference) => {
        const network = WalletAdapterNetwork.Devnet 
        const endpoint = clusterApiUrl(network) 
        const connection = new Connection(endpoint) 

        // Get a recent blockchash to include in the transaction 
        const {blockhash} = await connection.getLatestBlockhash('finalized') 

        const transaction = new Transaction({ 
          recentBlockhash: blockhash, 
          // The buyer pays the transaction fee 
          feePayer: fromWallet 
        }) 

        // Create the instruction to send Sol from owner to receipent 
        const transferInstruction = SystemProgram.transfer({ 
            fromPubkey: fromWallet, 
            lamports: amount.multipliedBy(LAMPORTS_PER_SOL).toNumber(),
            toPubKey: toWallet, 
        })

        transferInstruction.keys.push({
            pubkey: reference, 
            isSigner: false, 
            isWritable: false, 
        })

        transaction.add(transferInstruction) 
        return transaction 
    }
    
    // Create the function to RUN the transaction. This will added to the button 
    const doTransaction = async ({ amount, receiver, transactionPurpose }) => {

        // const network = WalletAdapterNetwork.Devnet 
        // const endpoint = clusterApiUrl(network) 
        // const connection = new Connection(endpoint) 

        // // Get a recent blockchash to include in the transaction 
        // const {blockhash} = await connection.getLatestBlockhash('finalized') 

        // const transaction = new Transaction({ 
        //   recentBlockhash: blockhash, 
        //   // The buyer pays the transaction fee 
        //   feePayer: fromWallet 
        // }) 

        // // Create the instruction to send Sol from owner to receipent 
        // const transferInstruction = SystemProgram.transfer({ 
        //     fromPubkey: publicKey, 
        //     lamports: amount.multipliedBy(LAMPORTS_PER_SOL).toNumber(),
        //     toPubKey: toWallet, 
        // })

        /// demo 
       const fromWallet = publicKey
       console.log("FROM WALLET :-- ", fromWallet) 
       
    //    console.log('RECIEVER:--', receivers) 
       const toWallet = new PublicKey(receiver) 

       console.log("TO WALLET ", toWallet) 

       const {blockhash} = await connection.getLatestBlockhash('finalized') 


       const transaction = new Transaction({ 
        recentBlockhash: blockhash, 
        // The buyer pays the transaction fee 
        feePayer: fromWallet 
      }) 
 

      console.log("AMOUNTS AMOUNTS:-- ", amount) 
      // Create the instruction to send Sol from owner to receipent 
      const transferInstruction = SystemProgram.transfer({ 
          fromPubkey: fromWallet, 
        //   lamports: amount.multipliedBy(LAMPORTS_PER_SOL).toNumber(),
          lamports: amount,
          toPubKey: toWallet, 
      })

      transferInstruction.keys.push({
        pubkey: reference, 
        isSigner: false, 
        isWritable: false, 
     })

    //   transaction.add(transferInstruction) 
    //   return transaction 


     
    //    const bnAmount = new BigNumber(amount) 
       const reference = Keypair.generate().publicKey 
    //    const transaction = await makeTransaction(fromWallet,"5hn6qMeBbw8jTjUi1q5DSgK7Ptf8uLH1T9wk5Zm11mSK", bnAmount, reference) 

       const txHash = await sendTransaction(transaction, connection) 
       console.log(txHash) 

       // Create transaction history object 
       const newId = (transactions.length + 1).toString() 
       const newTransaction = {
          id: newId,
          from: {
            name: publicKey,
            handle: publicKey,
            avatar: avatar, 
            verified: true, 
          }, 
          to: { 
            name: receiver,
            handle: '-', 
            avatar: getAvatarUrl(receiver.toString()), 
            verified: false, 
          }, 
          description: transactionPurpose, 
          transactionDate: new Date(),
          status: 'Completed',
          amount: amount,
          source: '-',
          identifier: '-' 
       }; 
       setNewTransactionModalOpen(false) 
       setTransactions([newTransaction, ...transactions])

    }

    return { 
        connected, 
        publicKey, 
        avatar, 
        userAddress, 
        doTransaction,
        amount, 
        setAmount, 
        receiver, 
        setReceiver, 
        transactionPurpose, 
        setTransactionPurpose, 
        doTransaction, 
        transactions, 
        setTransactions, 
        setNewTransactionModalOpen,
        newTransactionModalOpen,
    }  
   
}
































































