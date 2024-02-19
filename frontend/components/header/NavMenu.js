import { ClockIcon, CurrencyDollarIcon, UserCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'
import { classNames } from '../../utils/classNames'
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui'
import { truncate } from '../../utils/string'
require('@solana/wallet-adapter-react-ui/styles.css')

const NavMenu = ({ connected, myKey }) => {
    const menus = [
        
        {
            icon: Cog6ToothIcon,
            item: 'Settings',
            current: false,
        },
    ]
// flex-col space-y-10 removed 
// WalletMultiButton 


    return (
        <nav className="flex flex-1 items-center justify-center">
            <ul className="flex items-center justify-center m-9 gap-8">
              <>
                {menus.map(({ icon, item, current, action }, i) => (
                    <NavMenuItem key={i} Icon={icon} item={item} current={current} action={action} />
                ))}
                <li>
                
                    <WalletMultiButton className='phantom-button' startIcon={<UserCircleIcon style={{height: 24, width: 24, color:'#FFFFFF' }} />}>
                      <span className='text-sm font-semibold text-white hover:text-yellow-600'> 
                        { connected ? truncate(myKey.toString()) : "Connect Wallet" }
                      </span>
                    </WalletMultiButton>
                  
                </li>
              </>
            </ul>
        </nav>
    )
}

// PublicKey == WalletAddress 

const NavMenuItem = ({ Icon, item, current, action }) => {
    return (
        <li onClick={action} className={classNames('flex cursor-pointer space-x-3 transition-all hover:text-yellow-600', current ? 'text-white' : 'text-white', 'font-semibold')}>
            <Icon className="h-6 w-6 " />
            <span>{item}</span>
        </li>
    )
}

export default NavMenu



