const combineScheduleAndCoursesData = require('../utils/combineScheduleAndCoursesData');
const fetchCoursesData = require('./courses');

const fetchTodayScheduleData = async (page, browser, blockResourcesPlugin, error) => {
  // const { page, browser, blockResourcesPlugin, error } = await loginToAmizone(credentials);
  // if (error) {
  //   return { error };
  // }

  blockResourcesPlugin.blockedTypes.delete('script');

  try {
    // await Promise.all([
    //   page.waitForSelector("#email"),
    //   page.waitForSelector("#dlPassword")
    // ]);

    /* Get Data */
    /* Wait for page API response what provides the data */

    await page.waitForSelector('a[href="/Home/_Home"]');

    /* Navigate to page */
    await page.evaluate(() => document.querySelector('a[href="/Home/_Home"]').click());

    const response = await page.waitForResponse(
      (response) =>
        response.url().startsWith('https://s.amizone.net/Calendar/home/GetDiaryEvents') &&
        response.status() === 200,
    );
    const responseData = await response.json();

    date = responseData[0]?.start?.trim().split(' ')[0];

    const scheduleData = await responseData
      .filter((item) => item.start.trim().split(' ')[0] === date)
      .map((item) => {
        return {
          courseTitle: item.title,
          courseCode: item.CourseCode,
          facultyName: item.FacultyName,
          start: item.start,
          end: item.end,
          roomNumber: item.RoomNo,
          attendanceColor: item.AttndColor,
          allDay: item.allDay,
        };
      });
    const coursesData = await fetchCoursesData(page, browser, blockResourcesPlugin, error);

    /* Close puppeteer */
    await browser.close();
    return combineScheduleAndCoursesData(scheduleData, coursesData);

    // return userData;
  } catch (e) {
    console.log(e);
    return { error: 'Request Timeout.' };
  }
};

module.exports = fetchTodayScheduleData;
