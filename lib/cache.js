const NodeCache = require( "node-cache" );
const myCache = new NodeCache({ stdTTL: process.env.STD_TTL || 300 });

myCache.version = Date.now();

const getData = async (key, dbFunc) => {
  if(myCache.has(key)) {
    return myCache.get(key);
  }
  try {
    const data = await dbFunc();
    myCache.set(key, data);
    return data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const deleteKey = (key) => {
  try {
    myCache.del(key);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

const clearCache = () => {
  try {
    myCache.flushAll();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

const getAllKeys = () => {
  try {
    return myCache.keys();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export {
  getData,
  deleteKey,
  clearCache,
  getAllKeys
}