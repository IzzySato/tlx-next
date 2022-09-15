import { sanityClient } from '../../../sanityConfig';
import { getUniqueStringId, transformToReferenceData } from '../build/pageBuildSanity';

const transformServicePage = ({
  servicePageTitle,
  styles
}) => {
  const transformed = transformToReferenceData(styles);
  const formattedServiceStyles = {
    _id: getUniqueStringId(servicePageTitle),
    _type: 'servicePage',
    servicePageTitle,
    serviceStyles: transformed,
  }
  return formattedServiceStyles;
};

const getServicePageData = async () => {
  const query = `*[_type=="servicePage"]{
    ...,
    "relatedStyles": *[_type=='root' && serviceStyles._ref == root._id]{rootKey, data }
  }`;
  return await sanityClient.fetch(query);
};

export {
  transformServicePage,
  getServicePageData
}