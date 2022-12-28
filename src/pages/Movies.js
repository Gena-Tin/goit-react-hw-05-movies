import { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';
import { moviesQueryRequest } from '../services/apiMovies';

import { Container, Form, MoviesList, Input, Button} from '../components/Layout/Layout.styles';

const Movies = () => {
  const [moviesFound, setMoviesFound] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('search');
  const location = useLocation();

  function handlerQuery(evt) {
    evt.preventDefault();

    const form = evt.currentTarget;
    const searchQuery = form.elements.search.value;

    setSearchParams({ search: searchQuery });

    form.reset();
  }

  useEffect(() => {
    setNoResult(false);
    if (!query) {
      return;
    }
    (async function searchMovies() {
      const res = await moviesQueryRequest(query);
      const movies = res.data.results;
      if (movies.length === 0) {
        setNoResult(true);
        return;
      }
      setMoviesFound(movies);
    })(query);
    return () => {
    };
  }, [query]);

  return (
    <Container>
      <Form onSubmit={handlerQuery}>
        <Input
          name="search"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
        ></Input>
        <Button type="submit"> </Button>
      </Form>
      {query && !noResult && (
        <MoviesList>
          {moviesFound.map(({ id, name, title }) => (
            <li key={id}>
              <Link to={`${id}`} state={{ from: location }} key={id}>
                {title} {name}
              </Link>
            </li>
          ))}
        </MoviesList>
      )}
      {noResult && <div>Aw, there are no results for your query!</div>}
    </Container>
  );
};

export default Movies;