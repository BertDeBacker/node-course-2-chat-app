const expect = require('expect')

//import isRealString
const { isRealString } = require('./validate')

//isRealString
describe('isRealString validation', () => {

        it('Should reject non-string values', () => {
            var res = isRealString(123)
            expect(res).toBeFalsy()
        })

        it('Should reject string with only spaces', () => {
            var res = isRealString('    ')
            expect(res).toBeFalsy()
        })

        it('Should allow string with non-space characters', () => {
            var res = isRealString('sdf25dss  sdd4s')
            expect(res).toBeTruthy()
        })


    })
    //should reject non-string values

//should allow string with non-space characters