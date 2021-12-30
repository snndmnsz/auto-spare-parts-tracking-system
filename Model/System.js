const db = require('../util/database');


module.exports = class System {
  
  static getBills() {
    return db.execute('SELECT * FROM bill');
  }

  static insertStorage(BarcodNumber,RackPlace,ShelveNumber,Quantity) {
    return db.execute('INSERT INTO storage VALUES (?,?,?,?)',[BarcodNumber,RackPlace,ShelveNumber,Quantity]);
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

  static findCarById(id) {
    return db.execute('SELECT * FROM car WHERE car.CarID = ?', [id]);
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