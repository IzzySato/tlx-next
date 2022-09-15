const recaptchaClient = async (captchaToken) => {
  try {
    const res = await fetch('/api/recaptchaRequest', {
    body: JSON.stringify({
      captchaToken,
    }),
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'POST'
  });
  return await res.json();
  } catch (err) {
    console.log(err);
  };
};

export {
  recaptchaClient
}