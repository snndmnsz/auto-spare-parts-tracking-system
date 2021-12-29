const db = require('../util/database');


module.exports = class System {
  
  save() {
    return db.execute(
      'INSERT INTO part (PartID, PartName, Year, IsSecondHand, BrandID, BarcodNumber, Price, CurrencyStatus, Details) VALUES (?, ?, ?, ?)',
      [this.PartID, this.PartName, this.Year, this.IsSecondHand, this.BrandID, this.BarcodNumber,this.Price, this.CurrencyStatus, this.Details]
    );
  }

  static getBills() {
    return db.execute('SELECT * FROM bill');
  }

  static getAllCustomers() {
    return db.execute('SELECT * FROM customer');
  }
  static findCustomerById(id) {
    return db.execute('SELECT * FROM customer WHERE customer.CustomerID = ?', [id]);
  }

  static getBrandById(id) {
    return db.execute('SELECT * FROM brand WHERE brand.ID = ?', [id]);
  }

  static getProductsInStoragebyID(id) {
    return db.execute('SELECT * FROM storage WHERE storage.BarcodNumber = ?', [id]);
  }


  static findById(id) {
    return db.execute('SELECT * FROM part WHERE part.PartID = ?', [id]);
  }

  static deleteById(id) {
    return db.execute('DELETE FROM part WHERE part.PartID = ?', [id]);
  }

  static editById(id) {
    return db.execute('UPDATE part SET column1=value, column2=value2,... WHERE part.PartID = ?', [id])
  }
};