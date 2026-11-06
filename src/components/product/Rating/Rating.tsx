import { Star, StarHalf } from "lucide-react";

const Rating = ({rating,reviews}:{rating:number,reviews:number}) => {
  return (
    <div className="flex items-center gap-1.5 text-sm" aria-label={`Rated ${rating} out of 5`}>
      <div className="flex items-center">
          {[...Array(5)].map((_, i) => {
            // if the rating is greater than i+1,full render
            if(rating>=i+1){
              return <Star key={i} className="fill-yellow-400 text-yellow-400 size-3.5" />
            }
            // to check the half start
            if (rating >= i + 0.5) {
              return <StarHalf key={i} className="size-3.5 fill-yellow-400 text-yellow-400" />;
            }

            return <Star key={i} className="fill-muted text-muted size-3.5" />
          }
        )}
      </div>
      <span className="text-muted-foreground">
          {reviews}
      </span>
    </div>
  )
}
export default Rating