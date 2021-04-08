export default function timePosted(timeString) {
  const date = new Date(timeString);
  const now = new Date();
  const diff = now.getTime() / 1000 - date.getTime() / 1000;
  if (diff > 31536000) {
    const years = Math.floor(diff / 31536000);
    const str = years >= 2 ? "s" : "";
    return `${years} year${str} ago`;
  } else if (diff > 2592000) {
    const months = Math.floor(diff / 2592000);
    const str = months >= 2 ? "s" : "";
    return `${months} month${str} ago`;
  } else if (diff > 86400) {
    const days = Math.floor(diff / 86400);
    const str = days >= 2 ? "s" : "";
    return `${days} day${str} ago`;
  } else {
    return "today";
  }
}
