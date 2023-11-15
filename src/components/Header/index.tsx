import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Cart from "../cart";
import { useAppSelector } from "../../store";
import { Badge } from "@mui/material";

const Header = () => {
  const [openCart, setOpenCart] = React.useState<boolean>(false);
  const productCount = useAppSelector((state) => state.data.cartObjs);
  return (
    <>
      <Cart openCart={openCart} setOpenCart={setOpenCart} />
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" component="div">
              Products
            </Typography>
            <Badge badgeContent={productCount?.length} color="success">
              <IconButton
                sx={{ py: "unset" }}
                size="large"
                edge="end"
                color="inherit"
                aria-label="ShoppingCartIcon"
                onClick={() => setOpenCart(!openCart)}
              >
                <ShoppingCartIcon />
              </IconButton>
            </Badge>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default Header;
