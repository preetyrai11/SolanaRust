import { useState, useEffect } from 'react'
import Action from '../components/header/Action'
import NavMenu from '../components/header/NavMenu'
import Profile from '../components/header/Profile'
import SearchBar from '../components/home/SearchBar'
import NewTransactionModal from '../components/transaction/NewTransactionModal'
import TransactionsList from '../components/transaction/TransactionsList'
import { useWallet } from '@solana/wallet-adapter-react'
import TransactionQRModal from '../components/transaction/TransactionQRModal'
import { transactions } from '../data/transactions'
import { getAvatarUrl } from "../functions/getAvatarUrl"
import { useCashApp } from "../hooks/cashapp" 


const Home = () => {
    // const { connected, publicKey } = useWallet()
    // const [userAddress, setUserAddress] = useState("11111111111111111111111111111111")
    // const [avatar, setAvatar] = useState("")
    const [transactionQRModalOpen, setTransactionQRModalOpen] = useState(false)
    const [newTransactionModalOpen, setNewTransactionModalOpen] = useState(false)

    const { connected, publicKey, avatar, userAddress, transactions, setTransactions } = useCashApp()
    const [qrCode, setQrCode] = useState(false) 

    // Get Avatar based on the userAddress
    // useEffect(() => {
    //     setAvatar(getAvatarUrl(userAddress))
    // })
    
    console.log(connected, "ARE WE CONNECTED") 

// w-[250px] , flex-col added  bg-[#0bb534]
    return (
        <div className="flex flex-col min-h-screen ">
            <header className="flex w-full flex-col bg-[#202A44] p-12">
                <Profile setModalOpen={setTransactionQRModalOpen} avatar={avatar} userAddress={userAddress} />
                <TransactionQRModal modalOpen={transactionQRModalOpen} setModalOpen={setTransactionQRModalOpen} userAddress={userAddress} myKey={publicKey} setQrCode={setQrCode} />

                <NavMenu connected={connected} myKey={publicKey} />

                <Action setModalOpen={setNewTransactionModalOpen} />
                <NewTransactionModal modalOpen={newTransactionModalOpen} setModalOpen={setNewTransactionModalOpen} />
            </header>

            <main className="flex flex-1 flex-col">
                <SearchBar />

                <TransactionsList connected={connected} transactions={transactions} />
            </main>
        </div>
    )
}

export default Home



