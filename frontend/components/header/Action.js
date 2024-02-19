const Action = ({ setModalOpen }) => {
    const onNewTransaction = () => {
        setModalOpen(true)
    }

    const onDeposit = () => {
        
    }

    const onWithdraw = () => {

    }

    return (
        <>
        <div>
            <button onClick={onNewTransaction} className="w-full rounded-lg bg-[#1e0f24] py-3 my-5 hover:bg-opacity-70">
                <span className="font-medium text-white">Pay</span>
            </button>
        </div>
        // <div>
        //     <button onClick={onDeposit} className="w-full rounded-lg bg-[#1e0f24] py-3  my-5 hover:bg-opacity-70">
        //         <span className="font-medium text-white">Deposit</span>
        //     </button>
        // </div>
        <div>
            <button onClick={onWithdraw} className="w-full rounded-lg bg-[#1e0f24] py-3 my-5 hover:bg-opacity-70">
                <span className="font-medium text-white">Withdraw</span>
            </button>
        </div>
        </>
    )
}

export default Action





















































