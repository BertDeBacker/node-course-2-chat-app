const expect = require('expect')
const { Users } = require('./users')



describe('Users', () => {
    var users
    beforeEach(() => {
        users = new Users()
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Jen',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Julie',
            room: 'Node Course'
        }]
    })


    it('Should add new user', () => {
        var users = new Users()
        var user = {
            id: 132,
            name: 'Bert',
            room: 'Office'
        }
        var respUser = users.addUser(user.id, user.name, user.room)

        //check if the array contains an identical object
        expect(users.users).toContainEqual(user)

        //check if the 3 properties of the user object contain a value
        expect(typeof respUser.id).toBe('number')
        expect(respUser.id).toBe(132)
        expect(typeof respUser.name).toBe('string')
        expect(respUser.name).toBe('Bert')
        expect(typeof respUser.room).toBe('string')
        expect(respUser.room).toBe('Office')

    })

    it('should return names for the node course', () => {
        var userList = users.getUserList('Node Course')
        expect(userList).toContain('Mike')
    })

    it('should return names for the react course', () => {
        var userList = users.getUserList('React Course')
        expect(userList).toContain('Jen')
    })

    it('should remove user', () => {
        var removedUser = users.removeUser('2')
        expect(removedUser).toBeTruthy
        expect(users.users.length).toBe(2)

    })

    it('should NOT remove user', () => {
        var removedUser = users.removeUser('9')
        expect(removedUser).toBeFalsy()
        expect(users.users.length).toBe(3)
    })

    it('should find user', () => {
        var userId = '2';
        var user = users.getUser(userId)

        expect(user.id).toBe(userId)
    })

    it('should NOT find user', () => {
        var userId = '99';
        var user = users.getUser(userId)

        expect(user).toBeFalsy()

    })

})