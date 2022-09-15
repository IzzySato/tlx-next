import { getUniqueStringId, transformToReferenceData } from "../build/pageBuildSanity";

const getDefaultGlobalData = (json) =>
  json.filter(({global}) => global);

const getDefaulGlobalStyles = (json) =>
  getDefaultGlobalData(json).flatMap(({ styles }) => styles);

const getDefaultFontInfo = (json) =>
  json.filter(({_type}) => _type === 'pageFont')
      .flatMap(({fontInfo}) => fontInfo);

const transformGlobalData = ({
  _type,
  title,
  styles
}) => {
  const transformed = transformToReferenceData(styles);
  const formattedGlobalStyles = {
    _id: getUniqueStringId(_type),
    _type,
    title,
    styles: transformed,
  }
  return formattedGlobalStyles;
};

const transformFontData = ({
  _type,
  title,
  fontInfo,
  styles
}) => {
  const transformedStyle = transformToReferenceData(styles);
  const transformedFont = transformToReferenceData(fontInfo);
  const formattedGlobalStyles = {
    _id: getUniqueStringId(_type),
    _type,
    title,
    fontInfo: transformedFont,
    styles: transformedStyle,
  }
  return formattedGlobalStyles;
};

const transformServiceData = ({
  serviceName,
  serviceDesc
}, 
_type,
imgBuffer,
) => {
  const formattedService = {
    _id: getUniqueStringId(_type),
    _type,
    serviceName,
    serviceDesc,
    serviceImg: imgBuffer,
  }
  return formattedService;
};

export {
  getDefaultGlobalData,
  getDefaulGlobalStyles,
  getDefaultFontInfo,
  transformGlobalData,
  transformFontData,
  transformServiceData
}