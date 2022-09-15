import { sanityFetch } from '../../lib/sanity/sanityFetch';

export default async function handler(req, res) {
  try {
    const businessInfo = await sanityFetch('info') || [];
    res.status(200).json({ businessInfo });
  } catch (err) {
    console.log(err);
    throw err;
  }
}