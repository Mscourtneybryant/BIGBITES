import React from 'react';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import { Avatar } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Badge from '@mui/material/Badge';




export const Navbar = () =>{
    return(
       
        <>
         {/*creating a div for the nav bar*/}
        <div className='px-5 z-50 py-[.8rem] bg-[#ffff00] lg:px-20 flex justify-between'>

           
            {/*to hold the logo*/}
                <div className='lg:mr-10 cursor-pointer text-black flex items-center'>
                    <li className='logo font-regular text-black-300 text-2xl list-none'>
                        <span className="big">Big</span>Bites
                    </li>

                </div>
                {/*to hold the search bar*/}
                <div className='flex items-center space-x-2 lg:space-x-10'>
                    <div className=''>
                        <IconButton>
                            <SearchIcon className="iconBtnColor" sx={{fontSize:"1.5rem"}}/>
                        </IconButton>

                    </div>
                    <div className=''>

                        <Avatar className='cursor-pointer' sx={{bgcolor:"#1c1c1c", color:"#ffff00"}}>BB</Avatar>


                    </div>

                    <IconButton>
                        <Badge color="secondary" badgeContent={3} max={4}>
                        <ShoppingCartIcon className="iconBtnColor" sx={{fontSize:"1.5rem"}}/>
                        </Badge>
                            
                        </IconButton>

                    

                </div>
                

            </div>
            
           
        </>
        
    )
}