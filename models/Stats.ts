/**
 * Tuit stats which shows the number of tweets, retweets, likes and dislikes
 */
export default interface Stats {
  likes: number;
  dislikes: number;
  replies: number;
  retuits?: number;
}