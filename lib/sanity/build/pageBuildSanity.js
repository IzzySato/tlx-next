import { sanityClient } from '../../../sanityConfig';
import { deleteData } from '../sanityFetch';
import { transformAboutPage } from '../data/aboutSanity';
import { transformContactPage } from '../data/contactSanity';
import { transformHomePage } from '../data/homeSanity';
import { transformServicePage } from '../data/serviceSanity';
import {
  getDefaulGlobalStyles,
  transformGlobalData,
  getDefaultFontInfo,
  getDefaultGlobalData,
  transformFontData,
  transformServiceData,
 } from '../data/globalSanity';
import { getGlobalData } from '../../../Util/pageUtil';

const STYLE_DEFAULT_API_URL = `http://localhost:3000/newDefault.json`;

let flag = false;

const getUniqueStringId = (title) =>
  `${title.replace(/\s/g, '').toLowerCase()}${Date.now()}`;

const getDefaultData = (json, typeName) =>
  json.filter(({ _type }) => _type === typeName)[0];

const buildImage = async (url) => {
  const res = await fetch(url);
  const buffer = await res.buffer();
  const { _id } =  await sanityClient.assets.upload('image', buffer);
  return {
    _type: 'image',
    asset: {
      _ref: _id,
      _type: 'reference',
      _type: 'image'
    }
  };
};

const buildStyleArray = (array, type) =>
  array.forEach(s => {
    s._type = type;
    s._id = getUniqueStringId(s.title);
  });

const transformToReferenceData = (data) =>
  data.map(({ _id }) =>
    ({_key: _id, _type: 'reference', _ref: _id}));


  const getTransformFunc = async (type, data, imgBuffer) => {
    let formattedData = {};
    switch(type) {
      case 'homePage':
        formattedData = transformHomePage(data, imgBuffer);
        break;
      case 'aboutPage':
        formattedData = transformAboutPage(data, imgBuffer);
        break;
      case 'servicePage':
        formattedData = transformServicePage(data);
        break;
      case 'contactPage':
        formattedData = transformContactPage(data, imgBuffer);
        break;
      case 'pageFont':
        formattedData = transformFontData(data);
        break;
      case 'service':
        formattedData = transformServiceData(data, type, imgBuffer);
        break;
      case 'global':
        formattedData = transformGlobalData(data);
        break;
      default:
        formattedData = transformGlobalData(data);
    };
    return formattedData;
  };
               
const defaultGlobalFontRootInit = async (json) => {
  // global font & root into sanity
  // then add global document (reference to the font & root)
  const globalStyles = getDefaulGlobalStyles(json);
  buildStyleArray(globalStyles, 'root');
  const defaultFontInfo = getDefaultFontInfo(json);
  buildStyleArray(defaultFontInfo, 'font');
  const { list } = getDefaultData(json, 'service');
  const formattedServiceList = await Promise.all(list.map(async (s) => {
    const imgBuffer = await buildImage(s.serviceImg);
    return await getTransformFunc('service', s, imgBuffer);
  }));
  const allData = [
    ...globalStyles,
    ...defaultFontInfo,
    ...formattedServiceList ];
  await Promise.all(allData.map(doc => sanityClient.createOrReplace(doc)));
  const data = getDefaultGlobalData(json);
  const formattedData = await Promise.all(data.map(async (d) => 
    await getTransformFunc(d._type, d, '')));
  await Promise.all(formattedData.map(doc => sanityClient.createOrReplace(doc)));
};

const defaultDataToSanity = async (
  data,
  type) => {
  try {
    //deleteData();
    if(data.length === 0 && flag === false) {
      flag = true;
      const globalData = await getGlobalData();
      const res = await fetch(STYLE_DEFAULT_API_URL);
      const json = await res.json();
      const data = await getDefaultData(json, type);
      buildStyleArray(data.styles, 'root');
      if(globalData.length === 0) {
        defaultGlobalFontRootInit(json);
      }
      const imgBuffer = (data.imageUrl) ? await buildImage(data.imageUrl) : '';
      const transformedPageData = await getTransformFunc(type, data, imgBuffer);
      await Promise.all(data.styles.map(doc => sanityClient.createOrReplace(doc)));
      const result = await sanityClient.createOrReplace(transformedPageData);
      flag = false;
      return result;
     }
  } catch (err) {
    console.log(err);
    throw err;
  }
};

export {
  defaultDataToSanity,
  transformToReferenceData,
  getUniqueStringId,
}