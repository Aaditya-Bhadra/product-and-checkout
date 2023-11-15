import Box from '@mui/material/Box';
import * as React from 'react';
import Header from "../components/Header";
import Cart from "../components/cart";

type LayoutProps = {
    children?: React.ReactNode;
  };

const ButtonAppBar: React.FC<LayoutProps> = ({children}) =>{
    const [openCart, setOpenCart] = React.useState<boolean>(false)
  return (
    <>
    <Cart openCart={openCart} setOpenCart={setOpenCart} />
    <Header />
    <Box sx={{mt: 10}}>
    {children}
    </Box>
    </>
  );
}

export default ButtonAppBar;