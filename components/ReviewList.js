import Review from './Review';

export default function ReviewList(props) {
  const {reviews} = props;

  const review = reviews.map((review, index) => {
    return (
      <Review review={review} id={index}/>
    )
  })

  return (
    <div id="reviews">
      <div id="reviews-title">
      </div>
      {/* id="review-list" */}
      {review}
    </div>
  );
}

/*model reviews {
  id       Int       @id @default(autoincrement())
  name     String?   @db.VarChar
  body     String?   @db.VarChar
  date     DateTime? @db.Timestamp(6)
  rating   Int?
  helpful  Int?
  reported Int?
  shop_id  String?   @db.VarChar
  user_id  String?   @db.VarChar
  photos   photos[]

  @@index([shop_id], map: "reviews_idx_shops")
}
*/