const sortAscending = (a, b) => {
  const dateA = new Date(a.start).getTime();
  const dateB = new Date(b.start).getTime();
  return dateA - dateB;
};

module.exports = sortAscending;
