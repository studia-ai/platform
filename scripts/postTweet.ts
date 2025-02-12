// import 'dotenv/config';
// import crypto from 'crypto';
// import fetch, { Headers } from 'node-fetch';
// // const fetch = require('node-fetch');

// interface TweetResponse {
//   data: {
//     id: string;
//     text: string;
//     created_at: string;
//     edit_history_tweet_ids: string[];
//   };
// }

// async function postTweet() {
//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");
//   myHeaders.append("Authorization", "OAuth oauth_consumer_key=\"LVirf1j4leCcTcUM5fBw21KX9\",oauth_token=\"1886868908684001280-HD5K12r01ui6kLl7GQizIrfdl0j8k9\",oauth_signature_method=\"HMAC-SHA1\",oauth_timestamp=\"1738858150\",oauth_nonce=\"WPBCySBKTU6\",oauth_version=\"1.0\",oauth_signature=\"oPS%2FgipDbdqWKs7h93%2BR4HW6jzw%3D\"");
//   myHeaders.append("Cookie", "guest_id=v1%3A173885589614408131");

//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: JSON.stringify({
//       text: "123 "
//     }),
//     redirect: "follow" as const
//   };

//   try {
//     const response = await fetch("https://api.twitter.com/2/tweets", requestOptions);
//     const result = await response.json() as TweetResponse;
    
//     console.log('Status:', response.status);
//     console.log('Response:', result);
    
//     if (result.data) {
//       console.log('Tweet posted successfully!');
//       console.log('Tweet ID:', result.data.id);
//       console.log('Tweet Text:', result.data.text);
//       console.log('Created at:', result.data.created_at);
//     }
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// // Run the function
// postTweet(); 