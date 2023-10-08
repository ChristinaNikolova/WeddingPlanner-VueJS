function guestViewModel(guest) {
    return {
        id: guest._id,
        firstName: guest.firstName,
        lastName: guest.lastName,
        gender: guest.gender,
        age: guest.age,
        side: guest.side,
        role: guest.role,
        table: guest.table,
        mainDish: guest.mainDish,
        confirmed: guest.confirmed,
    }
}

module.exports = {
    guestViewModel,
}