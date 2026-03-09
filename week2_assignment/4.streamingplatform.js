const movies = [
  { id: 1, title: "Inception", genre: "Sci-Fi", rating: 8.8 },
  { id: 2, title: "Joker", genre: "Drama", rating: 8.4 },
  { id: 3, title: "Avengers", genre: "Action", rating: 8.0 },
  { id: 4, title: "Interstellar", genre: "Sci-Fi", rating: 8.6 }
];
//sci-fi movies
let r1=movies.filter(movie=>movie.genre=="Sci-Fi")
console.log(r1)
//inception 8.8
let r2=movies.map(movie=>movie.rating==8.8)
console.log(r2)
//avg rating
let r3=movies.reduce((acc ,movie)=>acc+movie.rating,0)
let avg=r3/movies.length
console.log(avg)
//index of avengers
let r4=movies.findIndex(movie=>movie.title=="Avengers")
console.log(r4)