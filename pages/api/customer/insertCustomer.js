import { insertCustomer } from '../../../lib/sanity/data/customerSanity';

export default async function handler(req, res) {
  try {
    const { body } = req;
    await insertCustomer(body);
    res.status(200).json({
        status: true
      });
  } catch(err) {
    console.log(err);
    res.status(500).json({
        status: false
      });
  }
}