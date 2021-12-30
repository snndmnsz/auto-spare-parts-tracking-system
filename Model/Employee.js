const db = require('../util/database');


module.exports = class Order {
  constructor(PartID, PartName, Year, IsSecondHand, BrandID, BarcodNumber, Price, CurrencyStatus, Details) {
    this.PartID = PartID;
    this.PartName = PartName;
    this.Year = Year;
    this.IsSecondHand = IsSecondHand;
    this.BrandID = BrandID;
    this.BarcodNumber = BarcodNumber;
    this.Price=Price;
    this.CurrencyStatus = CurrencyStatus;
    this.Details = Details;
  }

  static findByName(username,password) {
    return db.execute('SELECT * FROM employee WHERE employee.Username = ? and employee.Password = ? ', [username,password]);
  }

  static fetchActiveOrders() {
    return db.execute("SELECT * FROM orderstatus WHERE OrderStatus in ('Payment Received','Awaiting Payment')");
  }

  static getMessages() {
    return db.execute('SELECT * FROM managermessages');
  }

  static deleteById(id) {
    return db.execute('DELETE FROM part WHERE part.PartID = ?', [id]);
  }

  static editById(id) {
    return db.execute('UPDATE part SET column1=value, column2=value2,... WHERE part.PartID = ?', [id])
  }
};