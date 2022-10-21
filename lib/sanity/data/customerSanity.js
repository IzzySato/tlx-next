import { sanityClient } from '../../../sanityConfig';

// customer submit the estimation form
// => insert the customer into sanity.io customer
// => insert request into sanity.io request
const insertCustomer = async (
{  
  fName,
  lName,
  email,
  tel,
  address,
  comment,
  serviceType
}
) => {
  const date = new Date();
  const customerId = `customer${fName}${Date.now()}`;
  const requestId =  `request${lName}${Date.now()}`;
  const doc = {
    _type: 'customer',
    _id: customerId,
    fName,
    lName,
    email,
    tel,
    address,
  };
  const request = {
    _type: 'request',
    _id: requestId,
    customerInfo: {
      _key: customerId,
      _type: 'reference',
      _ref: customerId
    },
    comment,
    serviceType,
    receivedDate: date.toISOString().split('T')[0]
  }
  await sanityClient.createIfNotExists(doc);
  await sanityClient.createIfNotExists(request);
};

export {
  insertCustomer
}