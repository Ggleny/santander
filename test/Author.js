/* eslint-disable handle-callback-err */
//During the test the env variable is set to test
process.env.NODE_ENV = 'test'

const app = require('../src/app')
const chai = require('chai')
const chaiHttp = require('chai-http')
const baseUrl = '/api/v1'
const { expect } = chai
chai.use(chaiHttp)

const historyTest = {
  epaga:[
    'A Message to Our Customers',
    '“Was isolated from 1999 to 2006 with a 486. Built my own late 80s OS”',
    'Apple’s declining software quality'
  ],
  saintamh:[
    'Google Is Eating Our Mail',
    'Why I’m Suing the US Government'
  ]
}
describe('API REST', () => {
  Object.keys(historyTest).forEach(author=>{
    it(`GET ${baseUrl}/author_history?author=${author} debe devolver el historial del author ${author}`, done => {
      chai
        .request(app)
        .get(`${baseUrl}/author_history?author=${author}`)
        .end((err, res) => {
          expect(res).to.have.status(200)
            
          const articles = res.body
          expect(articles).to.be.an('Array')
          let titles = []
          for (let art of articles) {
            expect(art).to.be.an('Object')
            expect(art.title).to.be.a('String')
          }
          expect(articles.map(v=>v.title)).to.deep.equal(historyTest[author])
          done()
        })
    })
  })
    
})