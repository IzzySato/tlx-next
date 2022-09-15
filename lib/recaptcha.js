import axios from 'axios';

const fetchGoogleRecaptcha = async (captchaToken) => {
  try {
    const res = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${captchaToken}`
    );
    return res;
  } catch (err) {
    console.log(err);
  };
};

export {
  fetchGoogleRecaptcha
}