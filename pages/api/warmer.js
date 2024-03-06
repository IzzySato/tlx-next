export default function handler(req, res) {
  try {
    const { query: { hostname, port } } = req;
    const urls = [
      "about",
      "service",
      "gallery",
      "contact"
    ];
    urls.forEach(async (url) => await fetch(`http://${hostname}:${port}/${url}`))
    res.status(200);
  } catch (err) {
    console.log(err);
    throw err;
  }
}