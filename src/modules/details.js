const loginToAmizone = require('../utils/login');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const extractUserDetailsData = (htmlData) => {
  const detailsDOM = new JSDOM(htmlData);

  let details = {};

  const tempArr = detailsDOM.window.document.querySelectorAll('#DivForm > div.row > div > ol > li');

  details.institution = tempArr[0].querySelector('b').innerText;
  details.programme = tempArr[1].querySelector('b').innerText;
  details.name = tempArr[2].querySelector('b').innerText;
  details.fathersName = tempArr[3].querySelector('b').innerText;
  details.enrollmentNo = tempArr[4].querySelector('b').innerText;
  details.batch = tempArr[5].querySelector('b').innerText;

  return details;
};

const fetchDetailsData = async (credentials) => {
  const { page, browser, blockResourcesPlugin, error } = await loginToAmizone(credentials);
  if (error) {
    return { error };
  }
  blockResourcesPlugin.blockedTypes.delete('script');

  try {
    await page.waitForSelector('#M96');

    /* Navigate to page */
    await page.evaluate(() => document.querySelector('#M96').click());

    const response = await page.waitForResponse(
      (response) =>
        response.url().startsWith('https://s.amizone.net/Electives/Specialization') &&
        response.status() === 200,
    );
    const responseHTML = await response.text();

    const userData = extractUserDetailsData(responseHTML);
    // const userData = extractUserDetailsData(
    //   responseHTML.split('<div class="col-xs-12">')[1].split('<div class="hr hr32 hr-dotted">')[0],
    // );

    await browser.close();
    return userData;
  } catch (e) {
    console.log(e);
    return { error: 'Request Timeout.' };
  }
};

module.exports = fetchDetailsData;
