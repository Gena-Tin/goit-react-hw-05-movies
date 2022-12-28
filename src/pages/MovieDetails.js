import { Suspense, useState, useEffect, useRef } from 'react';
import { Outlet, useParams, useLocation } from 'react-router-dom';

import {
  Container,
  MoreInfoLink,
  MoreInfoList,
  Box,
  GoBack,
} from './../components/Layout/Layout.styles';
import { movieInfoRequest } from '../services/apiMovies';
import { AboutMovie } from '../components/AboutMovie/AboutMovie';
import Loader from 'components/Loader/Loader';

const MovieDetails = () => {
  const [movieInfo, setMovieInfo] = useState([]);
  const { movieId } = useParams();
  const location = useLocation();
  const backLinkHref = useRef(location.state?.from);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    (async function aboutMovie() {
      const res = await movieInfoRequest(movieId);
      if (res.data.length === 0) {
        return;
      }
      setMovieInfo(res.data);
      setIsLoading(false);
    })();

    return () => {
    };
  }, [movieId]);

  return (
    <Container>
      <GoBack to={backLinkHref.current ?? '/'}>
      &#8678;
        Go back
      </GoBack>

      {isLoading && <Loader />}
      {!isLoading && <AboutMovie movieInfo={movieInfo} />}

      <Box>
        <p>Additional information</p>
        <MoreInfoList>
          <li>
            <MoreInfoLink to={'cast'}>Cast</MoreInfoLink>
          </li>
          <li>
            <MoreInfoLink to={'reviews'}>Reviews</MoreInfoLink>
          </li>
        </MoreInfoList>
      </Box>

      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </Container>
  );
};

export default MovieDetails;