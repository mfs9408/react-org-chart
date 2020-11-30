import React from 'react'
import './App.css'
import OrgChart from '@unicef/react-org-chart'
import { BrowserRouter, Route } from 'react-router-dom'
import { tree, tree1, tree2, tree3, tree4 } from './Tree'
import avatarPersonnel from './assets/avatar-personnel.svg'

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      tree: tree,
      downloadingChart: false,
      config: {},
      highlightPostNumbers: [1],
    }
  }

  getChild = (id) => {
    switch (id) {
      case 100:
        return tree1
      case 36:
        return tree2
      case 56:
        return tree3
      case 25:
        return tree4
      default:
        return console.log('no children')
    }
  }

  getParent = (d) => {
    if (d.id === 100) {
      return {
        id: 500,
        person: {
          id: 500,
          avatar: avatarPersonnel,
          department: '',
          name: 'Pascal ruth',
          title: 'Member',
          totalReports: 1,
        },
        hasChild: false,
        hasParent: true,
        children: [d],
      }
    } else if (d.id === 500) {
      return {
        id: 1,
        person: {
          id: 1,
          avatar: avatarPersonnel,
          department: '',
          name: 'Bryce joe',
          title: 'Director',
          totalReports: 1,
        },
        hasChild: false,
        hasParent: false,
        children: [d],
      }
    } else {
      return d
    }
  }

  handleDownload = () => {
    this.setState({ downloadingChart: false })
  }

  handleOnChangeConfig = (config) => {
    this.setState({ config: config })
  }

  handleLoadConfig = () => {
    const { config } = this.state
    return config
  }

  getPluralsText = (datum) => {
    const locale = 'en'

    const {
      person: { totalReports },
    } = datum

    if (locale === 'ru') {
      const pluralTextForTitle = {
        one: 'документ',
        few: 'документа',
        many: 'документов',
        other: 'документы',
      }

      if (totalReports % 10 == 1 && totalReports % 11 !== 11)
        return totalReports + ' ' + pluralTextForTitle.one
      if (totalReports % 10 >= 2 && totalReports % 10 <= 4)
        return totalReports + ' ' + pluralTextForTitle.few
      if (
        totalReports % 10 == 0 ||
        (totalReports % 10 >= 5 && totalReports % 10 <= 9) ||
        (totalReports % 100 >= 11 && totalReports <= 14)
      )
        return totalReports + ' ' + pluralTextForTitle.many
      else return totalReports + ' ' + pluralTextForTitle.other
    }

    if (locale === 'en') {
      const pluralTextForTitle = {
        one: 'document',
        other: 'documents',
      }
      if (totalReports == 1) {
        return totalReports + ' ' + pluralTextForTitle.one
      }
      if (totalReports > 1) {
        return totalReports + ' ' + pluralTextForTitle.other
      }
    }
  }

  render() {
    // const smth = ['высокопроизводительный', 'высокотехнологичный', 'комп']
    // console.log(smth[0].concat('-'))

    const { tree, downloadingChart } = this.state

    //For downloading org chart as image or pdf based on id
    const downloadImageId = 'download-image'
    const downloadPdfId = 'download-pdf'

    return (
      <BrowserRouter basename="/react-org-chart">
        <Route exact path="/">
          <React.Fragment>
            <div className="zoom-buttons">
              <button
                className="btn btn-outline-primary zoom-button"
                id="zoom-in"
              >
                +
              </button>
              <button
                className="btn btn-outline-primary zoom-button"
                id="zoom-out"
              >
                -
              </button>
            </div>
            <div className="download-buttons">
              <button className="btn btn-outline-primary" id="download-image">
                Download as image
              </button>
              <button className="btn btn-outline-primary" id="download-pdf">
                Download as PDF
              </button>
              <a
                className="github-link"
                href="https://github.com/unicef/react-org-chart"
              >
                Github
              </a>
              {downloadingChart && <div>Downloading chart</div>}
            </div>
            <OrgChart
              tree={tree}
              getPluralsText={(datum) => this.getPluralsText(datum)}
              downloadImageId={downloadImageId}
              downloadPdfId={downloadPdfId}
              onConfigChange={(config) => {
                this.handleOnChangeConfig(config)
              }}
              loadConfig={(d) => {
                let configuration = this.handleLoadConfig(d)
                if (configuration) {
                  return configuration
                }
              }}
              downlowdedOrgChart={(d) => {
                this.handleDownload()
              }}
              loadImage={(d) => {
                return Promise.resolve(avatarPersonnel)
              }}
              loadParent={(d) => {
                const parentData = this.getParent(d)
                return parentData
              }}
              loadChildren={(d) => {
                const childrenData = this.getChild(d.id)
                return childrenData
              }}
              onNodeClick={(node) => {
                console.log('NODE CLICK CLOCK!', node)
              }}
            />
          </React.Fragment>
        </Route>
      </BrowserRouter>
    )
  }
}
