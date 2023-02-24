export function getTimeAgo(time: number) {
  const diff = new Date().getTime() - time;
  let timeAgo = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (timeAgo) return timeAgo + " days ago";

  timeAgo = Math.floor(diff / (1000 * 60 * 60));
  if (timeAgo) return timeAgo + " hours ago";

  timeAgo = Math.floor(diff / (1000 * 60));
  if (timeAgo) return timeAgo + " mins ago";

  return "now";
}
