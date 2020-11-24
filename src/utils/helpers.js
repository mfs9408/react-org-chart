module.exports = {
  getTextForTitle,
  getTextForDepartment,
  getCursorForNode,
}
function getTextForTitle (config) {
  return function (datum) {
    if (!datum.person || !datum.person.totalReports) {
      return ''
    }

    const {
      person: { totalReports },
   } = datum
   const cases = [2, 0, 1, 1, 1, 2];
    const { textForTitle } = config
   return totalReports + ' ' + textForTitle[
      totalReports % 100 > 4 && totalReports % 100 < 20
        ? 2
        : cases[totalReports % 10 < 5 ? totalReports % 10 : 5]
      ];
  }
}

const departmentAbbrMap = {
  Marketing: 'mktg',
  Operations: 'ops',
  Growth: 'gwth',
  Branding: 'brand',
  Assurance: 'fin',
  Data: 'data',
  Design: 'design',
  Communications: 'comms',
  Product: 'prod',
  People: 'people',
  Sales: 'sales',
}

function getTextForDepartment(datum) {
  if (!datum.person.department) {
    return ''
  }

  const { department } = datum.person

  if (departmentAbbrMap[department]) {
    return departmentAbbrMap[department].toUpperCase()
  }

  return datum.person.department.substring(0, 3).toUpperCase()
}

function getCursorForNode(datum) {
  return datum.children || datum._children || datum.hasChild
    ? 'pointer'
    : 'default'
}
