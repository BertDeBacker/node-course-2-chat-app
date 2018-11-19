var expect = require('expect')
var { generateMessage, generateLocationMessage } = require('./message')

describe('generateMessage', () => {

    //this is a synchronous test, therefore DONE is not needed!
    it('should generate correct message object', () => {
        var res = generateMessage('Bert', 'message text')

        expect(res.from).toBeTruthy()
        expect(res.text).toBeTruthy()
        expect(typeof res.createdAt).toBe('number')
    })
})

describe('generateLocationMessage', () => {

    //this is a synchronous test, therefore DONE is not needed!
    it('should generate correct location object', () => {
        var res = generateLocationMessage('Admin', 1, 2)

        expect(res.from).toBeTruthy()
        expect(res.url).toBe('https://www.google.com/maps?q=1,2')
        expect(typeof res.createdAt).toBe('number')
    })
})