const insertCustomerClient = async (
  fName,
  lName,
  email,
  tel,
  address,
  comment,
  serviceType
  ) => {
    try {
      const res = await fetch('/api/customer/insertCustomer', {
        body: JSON.stringify({
          fName,
          lName,
          email,
          tel,
          address,
          comment,
          serviceType
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
  insertCustomerClient
}