import { sanityFetch } from '../../lib/sanity/sanityFetch';

export default async function handler(req, res){
  try {
    const root = await sanityFetch('root', '', '{rootKey, data}');
    const font = await sanityFetch('font', '', '{rel, href}');
    res.status(200).json({ root, font })
  } catch (err) {
    console.log(err);
    throw err;
  }
}