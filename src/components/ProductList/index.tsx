/* eslint-disable react-hooks/exhaustive-deps */
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Grid, Rating } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { AddItemToCart, getPostsAction } from "../../store/slice/commonSlice";
import ProductDetails from "../ProductDetails";

const PostListing = () => {
  const [productCount, setProductCount] = React.useState<number>(24);
  const [openDetails, setOpenDetails] = React.useState<boolean>(false);
  const [productData, setProductData] = React.useState<any>(null);
  const dispatch = useAppDispatch();
  React.useEffect(() => {
    dispatch(getPostsAction(productCount));
  }, [productCount]);
  const productList = useAppSelector((state) => state.data);

  return (
    <>
      <ProductDetails
        openDetails={openDetails}
        setOpenDetails={setOpenDetails}
        productData={productData}
        setProductData={setProductData}
      />
      <Grid container spacing={4}>
        {productList?.data?.products?.map((item: any, index: number) => {
          return (
            <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
              <Card
                sx={{ maxWidth: 345 }}
              >
                <CardMedia
                  sx={{ height: 140 }}
                  image={item?.images[0]}
                  title={item?.title}
                  onClick={() => {
                    setOpenDetails(!openDetails);
                    setProductData(item);
                  }}
                />
                <CardContent sx={{p:1}}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    className="product-title"
                    onClick={() => {
                        setOpenDetails(!openDetails);
                        setProductData(item);
                      }}
                  >
                    {item?.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    className="product-discription"
                  >
                    {item?.description}
                  </Typography>
                  <Box sx={{py:1}}>
                  <Rating name="size-small" value={item?.rating} size="small" readOnly/>
                  </Box>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    className="product-price"
                    onClick={() => {
                        setOpenDetails(!openDetails);
                        setProductData(item);
                      }}
                  >
                    ${item?.price}
                  </Typography>
                </CardContent>
                <CardActions className="flex-center">
                    <Button className="add-to-cart-button" size="small" onClick={()=>dispatch(AddItemToCart(item))}>
                      Add to cart
                    </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
      <Box className="flex-center" sx={{ my: 4 }}>
        <Button
          className="load-more-button"
          onClick={() => setProductCount(productCount + 24)}
          disabled={productCount > 100}
        >
          Load more{" "}
          <span className="flex-center">
            <ExpandMoreIcon />
          </span>
        </Button>
      </Box>
    </>
  );
};

export default PostListing;
