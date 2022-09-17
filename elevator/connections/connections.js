const { EventEmitter } = require("events");

class TicketManager extends EventEmitter {
    constructor(supply) {
        super();
        this.supply = supply;
    }

    buy(email, price) {
        this.supply--;
        console.log('bought')
        this.emit("buy", email, price, Date.now());
    }
}

let ticketManager = new TicketManager(10);

module.exports = ticketManager