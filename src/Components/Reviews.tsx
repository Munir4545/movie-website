import { useEffect, useState } from "react";
import { Review } from "./types";
import ReactMarkdown from 'react-markdown';
import { options } from "../apikey";

type ReviewProps = {
    movieId: string | undefined
}



export function Reviews(props: ReviewProps) {
    const [movieReviews, setMovieReviews] = useState<Review[]>([]);
    useEffect(() => {
        
          
          fetch(`https://api.themoviedb.org/3/movie/${props.movieId}/reviews?language=en-US&page=1`, options)
          .then(response => {
            if (!response.ok) {
              throw new Error(`Fetch failed with status ${response.status}`);
            }
            return response.json();
          })
          .then(response => {
            if (response.results && response.results.length > 0) {
              setMovieReviews(response.results);
              console.log("Reviews", movieReviews);
            } else {
              throw new Error('No reviews found');
            }
          })
          .catch(err => {
            console.error(err);
            // Proceed to fetch TV show reviews only if the movie reviews fetch fails
            fetch(`https://api.themoviedb.org/3/tv/${props.movieId}/reviews?language=en-US&page=1`, options)
              .then(response => response.json())
              .then(response => {
                if (response.results && response.results.length > 0) {
                  setMovieReviews(response.results);
                  console.log("Show reviews", movieReviews);
                } else {
                  console.error('No TV show reviews found');
                }
              })
              .catch(err => console.error(err));
          });
          
    }, [props.movieId]);


    return (
      <div className="mt-4">
        <h2 className="text-white p-4">COMMENTS</h2>
      {movieReviews.map(review => (
          <div key={review.id} className="mb-3">
              <div className=" bg-myColor text-white p-3 rounded" style={{ wordBreak: 'break-word', overflow: 'hidden' }}>
                <div className="landscape">
                  <img 
                  className=" img-fluid profile-pic" 
                  src={ review.author_details.avatar_path
                    ? `https://image.tmdb.org/t/p/w500/${review.author_details.avatar_path}`
                    : './defaultprofile.jpg'} 
                  alt={review.author_details.username} />
                  </div>
                  <div className="mt-3">
                      <h4 className="text-white">{review.author_details.rating}/10</h4>
                      <p className="text-white">{review.author_details.username}</p>
                      <ReactMarkdown className="text-white small">{review.content}</ReactMarkdown>
                      {/* Render other movie details as needed */}
                  </div>
              </div>
          </div>
      ))}
  </div>
    );
}
