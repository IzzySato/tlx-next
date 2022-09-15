import { fetchGoogleRecaptcha } from '../../lib/recaptcha';

export default async function handler (req, res) {
  try {
    const { body } = req;
    await fetchGoogleRecaptcha(body);
    res.status(200).json({
        status: true
      });
  } catch(err) {
    console.log(err);
    res.status(500).json({
        status: false
      });
  }
};
