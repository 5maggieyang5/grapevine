# Grapevine

Grapevine is a food bartering app made by Maggie Yang, Damion Gibbs, and Jordan Youngs as their final project at Lighthouse Labs Bootcamp. We wanted to make an app to connect people who grow their own food, letting them trade their excess food rather than having it go to waste. It also helps them access a wider variety beyond what they grow themselves, and helps build a community by connecting people with a mutual interest.

Our biggest feature is making 3 way trades where a 2 way trade is not possible. Consider this scenario: Maggie has an apple available for trade. Jordan wants Maggie's apple, but only has a cucumber to offer. Maggie does not want a cucumber. What can Jordan do in this situation? Current solutions would be for Jordan to offer a gift card to Maggie, or make other trades until he can return with something Maggie wants.

Our solution is to find another user, Damion. Damion has a carrot, which Maggie wants. Also, Damion wants a cucumber. With Damion in the picture, a 3 way trade is possible. Jordan can give his cucumber to Damion, Damion can give his carrot to Maggie, and Maggie can give her apple to Jordan. By involving this third user, Jordan was able to trade his cucumber for the apple he was originally interested in.

Our app is centered around 3 way trades such as the scenario above. We use PostgresQL and Knex queries to generate possible 3 way trades. We setup the backend server with Node and Express. We used React for the frontend and connected to the backend using fetch/axios.

Upon initiating a 3 way trade, traders are guided through a step-by-step process. First, they are shown a diagram detailing who will give what foods to who. Then, they pick an available date range on a calendar, and we calculate the earliest date when all traders are available.
Then we show them a map with all the trader locations marked on it, as well as a center point between them all so they can find a convenient location to meet. Then we show them each others contact info so they can finalise details and meetup. The last step is to review eachother after the trade.

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command in both the backend and frontend directories.
3. Create the `.env` by using `.env.example` as a reference
4. Update the .env file with your correct local information (you will need a pg database)
5. Run migrations from /backend: `knex migrate:latest`
6. Run the seed from /backend: `knex seed:run`
7. You will need two terminal tabs: one for the server, one for the app.
   Start the backend server from /backend using the `npm start` command.
8. Start the frontend app from /frontend using the `npm start` command.
   The app will be served at <http://localhost:3000/>.
9. Go to <http://localhost:3000/> in your browser.

## Screenshots

Two clients side by side
!["Screenshot of two clients on load"](https://github.com/jordanyoungs/chatty/blob/master/docs/Home.png?raw=true)

Name change feature
!["Screenshot of names changing"](https://github.com/jordanyoungs/chatty/blob/master/docs/NameChanges.png?raw=true)

Messages being sent
!["Screenshot of some messaging"](https://github.com/jordanyoungs/chatty/blob/master/docs/Messaging.png?raw=true)

Client leaving chatroom
!["Screenshot of a client leaving"](https://github.com/jordanyoungs/chatty/blob/master/docs/Leaving.png?raw=true)
