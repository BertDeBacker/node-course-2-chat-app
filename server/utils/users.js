//array of users
[{
    id: 'Id',
    name: 'Bert',
    room: 'Office'
}]

//addUser (id, name, room)

//removeUser(id)

//getUser(id)

//getUserList(room)


class Users {
    constructor() {
        this.users = []
    }

    addUser(id, name, room) {
        var user = { id, name, room }
        this.users.push(user)

        return user
    }

    removeUser(id) {
        var user = this.getUser(id)
        if (user) {
            var filteredList = this.users.filter(obj => !(obj.id === id))
            this.users = filteredList
        }
        return user
    }

    getUser(id) {
        var index = this.users.findIndex(user => user.id == id)
            //retruns undefined if index = -1 (Means item does not exist in the list)
        return this.users[index]

        //alternative solution 
        //return this.users.filter((user) => user.room === room)
    }

    getUserList(room) {
        //filter on an array object takes a function as an input parameter
        //if the function returns the true then the object will be kept in the array, 
        //if the function returns the false then the object will be removed from the array.
        //syntaxt is JavaScript V6 syntax.
        var users = this.users.filter((user) => user.room === room)

        //map creates a new array containing only the properties needed, in this case 'name'
        var namesArray = users.map((user) => user.name)

        return namesArray
    }
}





module.exports = { Users }



// //in a class, this refers to the instance, not the class!!
// class Person {
//     constructor(name, age) {
//         this.name = name
//         this.age = age
//     }

//     getUserDescription() {
//         return `${this.name} is ${this.age} year(s) old`
//     }
// }

// var me = new Person('Bert', 43)
// console.log('this.name', me.name)
// console.log('this.age', me.age)

// var description = me.getUserDescription()
// console.log(description)