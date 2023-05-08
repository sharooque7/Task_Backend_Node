import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { getAllReview, removeReview } from "./reviewSlice";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";
import { Pagination } from "@mui/material";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const Cards = ({ review }: any) => {
  const { pagination }: any = useAppSelector((state) => state?.movies);

  const limit: number = pagination && pagination.limit;
  const offset: number = pagination && pagination.offset;
  const count: number = pagination && pagination.count;
  const pageSize = limit;
  const totalPage = count / pageSize;
  const [curr, setCurr] = React.useState(1);
  const user: any = localStorage.getItem("user");
  const userData = JSON.parse(user);
  const user_id = userData.data.login.user.id;
  const newDate = new Date(parseInt(review.createdAt)).toISOString();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleEdit = async (review: any) => {
    navigate("/movies/review/update", { state: { review } });
    // const reviews = navigate("/moives/review/update");
  };
  const deleteReview = async (id: string, movie_id: number) => {
    try {
      let current = (curr - 1) * pageSize;
      const review: any = await dispatch(
        removeReview({ user_id, review_id: parseInt(id) })
      );
      await dispatch(
        getAllReview({ limit: pageSize, offset: current, movie_id })
      );

      if (review?.payload?.data?.removeReview?.statusCode === 200) {
        toast.success(review?.payload?.data?.removeReview?.message);
      }
      if (review?.payload?.data?.removeReview?.statusCode !== 200) {
        throw {
          message: review?.payload?.data?.removeReview?.message,
          code: review?.payload?.data?.removeReview?.statusCode,
        };
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {review.comment}
        </Typography>
        <Typography variant="h5" component="div">
          {review.rating}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {newDate.replace(/-/g, "/")}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: "flex", justifyContent: "space-around" }}>
        <Button
          size="small"
          disabled={user_id !== review.user_id}
          onClick={() => {
            handleEdit(review);
          }}
        >
          Edit
        </Button>
        <Button
          disabled={user_id !== review.user_id}
          size="small"
          onClick={() => {
            deleteReview(review.id, review.movie_id);
          }}
        >
          Delete
        </Button>
      </CardActions>
    </React.Fragment>
  );
};

export default function Review({ review }: any) {
  return (
    <>
      <Box sx={{ minWidth: 200, maxWidth: 280 }}>
        <Card variant="outlined">
          <Cards review={review} />
        </Card>
      </Box>
    </>
  );
}
