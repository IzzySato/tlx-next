const sendEmmailClient = async (
  fName,
  lName,
  email,
  tel,
  address,
  service,
  comments,
  ) => {
    try {
      const res = await fetch('/api/email/emailRequest', {
        body: JSON.stringify({
          fName,
          lName,
          email,
          tel,
          address,
          service,
          comments,
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
  sendEmmailClient
}