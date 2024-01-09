const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiYWUyM2Q5MjNiZWJhY2ZiNjM0ZThiN2NjZWRjMWNhMCIsInN1YiI6IjY1OWFhMjg0YmQ1ODhiMDA5MzkyMTcyYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rR8IXAh4KfWblP4_ks2edWCpSXHU1Hw45hT5i6rxCKI'
    }
  };
  
  let movieList = []; // 전체 영화 목록을 저장할 배열
  
  // 최고 평점 영화 데이터 가져오고 화면에 표시
  fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    .then(response => response.json())
    .then(data => {
      movieList = data.results;
      displayMovies(movieList); // 초기 영화 목록 표시
    })
    .catch(err => console.error(err));
  
  // 영화 카드 생성 함수
  function createMovieCard(movie) {
    const card = document.createElement('div');
    card.className = 'movie-card';
  
    const title = document.createElement('h3');
    title.textContent = movie.title;
  
    const overview = document.createElement('p');
    overview.textContent = movie.overview;
  
    const posterPath = document.createElement('img');
    posterPath.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
    posterPath.alt = movie.title;
  
    const voteAverage = document.createElement('p');
    voteAverage.textContent = `평점: ${movie.vote_average}`;
  
    card.appendChild(title);
    card.appendChild(overview);
    card.appendChild(posterPath);
    card.appendChild(voteAverage);
  
    // 클릭 이벤트 리스너 추가
    card.addEventListener('click', () => {
      alert(`클릭한 영화: ${movie.title} (ID: ${movie.id})`);
    });
  
    return card;
  }
  
  // 화면에 영화 목록 표시 함수
  function displayMovies(movies) {
    const cardList = document.querySelector('.card-list');
    cardList.innerHTML = ''; // 기존 카드 초기화
  
    movies.forEach(movie => {
      const movieCard = createMovieCard(movie);
      cardList.appendChild(movieCard);
    });
  }
  
  // 검색 폼 제출 처리 함수
  function handleSearch(event) {
    event.preventDefault();
    const searchInput = document.getElementById('search-input');
    const searchTerm = searchInput.value.toLowerCase();
  
    // 검색어에 맞는 영화 필터링
    const filteredMovies = movieList.filter(movie => movie.title.toLowerCase().includes(searchTerm));
  
    displayMovies(filteredMovies);
  }

 