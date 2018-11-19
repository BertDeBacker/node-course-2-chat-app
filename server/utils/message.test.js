var expect = require('expect')
var { generateMessage } = require('./message')

describe('generateMessage', () => {

    //this is a synchronous test, therefore DONE is not needed!
    it('should generate correct message object', () => {
        var res = generateMessage('Bert', 'message text')


        expect(res.from).toBeTruthy()
        expect(res.text).toBeTruthy()
        expect(typeof res.createdAt).toBe('number')


    })
})