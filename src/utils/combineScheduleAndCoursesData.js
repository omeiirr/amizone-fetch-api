const sortAscending = require('./sortAscendingByTime');

const combineScheduleAndCoursesData = (scheduleData, coursesData) => {
  scheduleData.map((lecture) => {
    let tempAtt = coursesData.find((course) => course.code.trim() === lecture.courseCode.trim());
    lecture.attendance = tempAtt['attendance'];
  });

  scheduleData.sort(sortAscending);
  return scheduleData;
};

module.exports = combineScheduleAndCoursesData;
