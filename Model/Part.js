const db = require('../util/database');


module.exports = class Part {
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

  save() {
    return db.execute(
      'INSERT INTO part (PartID, PartName, Year, IsSecondHand, BrandID, BarcodNumber, Price, CurrencyStatus, Details) VALUES (?, ?, ?, ?)',
      [this.PartID, this.PartName, this.Year, this.IsSecondHand, this.BrandID, this.BarcodNumber,this.Price, this.CurrencyStatus, this.Details]
    );
  }

  static fetchAll() {
    return db.execute('SELECT * FROM part');
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

  static getPartsForCars(id) {
    return db.execute('SELECT * FROM partsforcar WHERE partsforcar.PartID = ?', [id]);
  }
};