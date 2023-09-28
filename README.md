# CinemaWeb

## Start Backend Sever
- `npm run-script start:server`

## Start Frontend Sever
- `npm run-script start:web`
### Notes
- There is no need to restart the server / web if changes is made. With `nodemon` it restarts when the file is saved.

- If there's environment variables changes the server / web needs to be restarted manually

## Environment Config / `dotenv`
- The `.env.dev` file holds all the env variables for `dev`

## API TESTING SCOPE

## -Booking
### METHOD : GET
Get Movie Bookings
`endpoint : /booking/movie/:id`
`params : number id`

### -METHOD : POST
Add Movie Booking
`endpoint : /booking`
`params : object body{
    cinemaMovieId: number,
    movie: number,
    date: DATE,
    showId: number,
    seatIds: number,
    email: string
  }`

## -Movie Details
### METHOD : GET
Get Movie Details
`endpoint : /movie/:movieId/details`
`params : number movieId`

## -Confirmation
### METHOD : GET
Get Confirmation
`endpoint : /confirmation/:bookingRef`
`params : number bookingRef`

## -Home 
### METHOD : GET
Get Home
`endpoint : /extras`
`params : None`

## -Extras
##3 METHOD : GET
Get Extras 
`endpoint : /extras`
`params : None`

### METHOD : POST 
Add extras
`endpoint : /`
`params : object body {
    purchasedItems : [[ string name, number price, string imagePath ]], 
    bookingRef : number
}`
