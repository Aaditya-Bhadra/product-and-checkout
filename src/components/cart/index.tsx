import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { DeleteItemFromCart } from "src/store/slice/commonSlice";

type Anchor = "top" | "left" | "bottom" | "right";

export default function TemporaryDrawer({ openCart, setOpenCart }) {
  const dispatch = useAppDispatch();

  const [state, setState] = React.useState({
    left: false,
  });
  const productCount = useAppSelector((state) => state.data.cartObjs);
  const [subTotal, setSubTotal] = React.useState<number>(0);
  React.useEffect(() => {
    const total: number = productCount?.reduce(
      (sum: number, currentObject: any) => {
        return sum + currentObject?.data?.price;
      },
      0
    );
    setSubTotal(total);
  }, [productCount]);

  const handleDelete = (item: any) => {
    let newArr = productCount?.filter((data) => data?.data?.id !== item?.id);
    dispatch(DeleteItemFromCart(newArr));
  };

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setOpenCart(false);
      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : "320px",
        padding: "10px",
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box className="close-button-checkout">
        <IconButton onClick={() => toggleDrawer("left", false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box>
        <Typography component="div" variant="h5" className="product-title">
          Subtotal: ${subTotal}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {productCount?.map((item: any, index: number) => {
          return (
            <Grid key={index} item xs={12}>
              <Card sx={{ display: "flex" }}>
                <Box sx={{ display: "flex", flexDirection: "row" }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 80, p: 1 }}
                    image={item?.data?.images[0]}
                    alt={item?.data?.title}
                    title={item?.data?.title}
                  />
                  <CardContent sx={{ flex: "1 0 auto" }}>
                    <Typography
                      component="div"
                      variant="subtitle1"
                      className="product-cart-text"
                    >
                      {item?.data?.title}
                    </Typography>
                    <Typography component="div" variant="h6">
                      ${item?.data?.price}
                    </Typography>
                  </CardContent>
                </Box>
                <CardActionArea className="delete-item-button flex-center">
                  <IconButton
                    onClick={()=>handleDelete(item?.data)}
                    className="flex-center"
                    sx={{ p: "unset" }}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      {productCount?.length > 0 && (<Box className="flex-center" sx={{ my: 4 }}>
        <Button className="load-more-button" disabled={productCount > 100}>
          Proceed to checkout
        </Button>
      </Box>)}
    </Box>
  );

  return (
    <div>
      {(["right"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={openCart}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
