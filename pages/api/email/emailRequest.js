import { sendEmail } from '../../../lib/email';

export default async function handler(req, res) {
  try {
    const { body } = req;
    await sendEmail(body);
    res.status(200).json({
        status: true,
        message: 'Thank you for your request, we will touch with you as soon as possible.',
      });
  } catch(err) {
    console.log(err);
    res.status(500).json({
        status: false,
        message: 'Sorry, something went wrong. Please call us.'
      });
  }
}