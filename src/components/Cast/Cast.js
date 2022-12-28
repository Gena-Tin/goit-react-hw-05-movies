import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { castRequest } from '../../services/apiMovies';
import { CastList, NoImage } from './Cast.styles';
import Loader from '../Loader/Loader';

const Cast = () => {
  const { movieId } = useParams();
  const [castInfo, setCastInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!movieId) {
      return;
    }

    (async function castInfo() {
      const res = await castRequest(movieId);
      setCastInfo(res.data.cast);
      setIsLoading(false);
    })();

    return () => {
    };
  }, [movieId]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <CastList>
          {castInfo.map(({ id, character, name, profile_path }) => {
            return (
              <li key={id}>
                {profile_path ? (
                  <img
                    src={'https://image.tmdb.org/t/p/w500' + profile_path}
                    alt={name}
                    width={200}
                  ></img>
                ) : (
                  <NoImage>No Image</NoImage>
                )}
                <p>
                 <b>{name}</b>
                </p>
                <p>
                  <b>Character: </b>( {character} )
                </p>
              </li>
            );
          })}
        </CastList>
      )}
      {!isLoading && castInfo.length === 0 && (
        <div>No information for this movie</div>
      )}
    </>
  );
};

export default Cast;