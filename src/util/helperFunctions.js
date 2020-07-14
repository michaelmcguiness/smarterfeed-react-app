export function getTopDomain(url) {
  const a = document.createElement("a");
  a.href = url;
  return a.hostname;
}
