// const warmer = fetch('./warmer.json');

// const preWarm = (page) => {
//   fetch(page);
// }

// const executePreWarm = () => {
//   console.log('executePreWarm');
//   warmer.urls.forEach((url) => console.log(url))
//   // load data file.

//   // Loop each pge

//   // call load.
// }


const cli = require('next/dist/cli/next-start');
cli.nextStart(['-p', process.env.PORT || 3000]);

// setTimeout(() => executePreWarm, 10000);

