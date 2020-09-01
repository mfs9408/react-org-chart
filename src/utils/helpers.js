module.exports = {
  getTextForTitle,
  getTextForDepartment,
  getCursorForNode,
}

function getTextForTitle(datum) {
  if (!datum.person || !datum.person.totalReports) {
    return ''
  }

  const {
    person: { totalReports },
  } = datum
  let pluralEnding = ''
  if (totalReports > 1 && totalReports < 5) {
    pluralEnding = 'а'
  }
  else {
    pluralEnding = 'ов'
  }

  return `${totalReports} документ${pluralEnding}`
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
