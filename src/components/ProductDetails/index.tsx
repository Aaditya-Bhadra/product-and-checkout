import CloseIcon from "@mui/icons-material/Close";
import { Button, IconButton, Rating, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { useAppDispatch } from "../../store";
import * as React from "react";
import { AddItemToCart } from "src/store/slice/commonSlice";

type Anchor = "top" | "left" | "bottom" | "right";

export default function TemporaryDrawer({
  openDetails,
  setOpenDetails,
  productData,
  setProductData,
}) {
  const [state, setState] = React.useState({
    left: false,
  });
  const dispatch = useAppDispatch();

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
      setOpenDetails(false);
      setProductData(null);
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
      <Box className="close-button">
        <IconButton onClick={() => toggleDrawer("left", false)}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box>
        <Box className="product-details-image">
          <img
            className="product-details-image"
            src={productData?.images[0]}
            alt="product"
          />
        </Box>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          // className="product-title"
        >
          {productData?.title}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          // className="product-discription"
        >
          {productData?.description}
        </Typography>
        <Box sx={{ py: 1 }}>
          <Rating
            name="size-small"
            value={productData?.rating}
            size="small"
            readOnly
          />
        </Box>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          className="product-price"
        >
          ${productData?.price}
        </Typography>
        <Box className="flex-center">
          <Button className="add-to-cart-button" size="small" onClick={()=>dispatch(AddItemToCart(productData))}>
            Add to cart
          </Button>
        </Box>
      </Box>
    </Box>
  );

  return (
    <div>
      {(["left"] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            anchor={anchor}
            open={openDetails}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
