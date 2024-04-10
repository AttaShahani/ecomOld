import profilePic from "../assets/images/Profile.png"
import Rating from "@mui/material/Rating"

const ReviewCard = ({review}) => {
  return (
    <div className="reviewCard">
        <img className="revUserProfile" src={profilePic} alt="User" />
        <p className="revUsername">{review.name}</p>
        <Rating readOnly value={review.rating} precision={0.5} size="small" style={{ color: "#FF8C32" }}/>
        <p className="revComment">{review.comment}</p>
    </div>
  )
}

export default ReviewCard