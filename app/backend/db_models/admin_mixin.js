module.exports = {
  create: function(item) {
    return this.database.runLockingSqliteCommand(() => {
      return this.dbModel.max('display_order').then((lowestDisplayOrder) => {
        Object.assign(item, { display_order: lowestDisplayOrder + 1 });
        return this.dbModel.create(item);
      });
    });
  },

  changeOrderUp: function(item) {
    return this.database.runLockingSqliteCommand(() => {
      return this.dbModel.findOne({ where: { display_order: item.display_order - 1}})
      .then((higherItem) => {
        const higherItemIndex = higherItem.display_order;
        higherItem.display_order = item.display_order;
        item.display_order = higherItemIndex;
        return higherItem.save().then(() => item.save());
      });
    });
  },

  changeOrderDown(item) {
    return this.database.runLockingSqliteCommand(() => {
      return this.dbModel.findOne({ where: { display_order: item.display_order + 1 }})
      .then((lowerItem) => {
        const lowerItemIndex = lowerItem.display_order;
        lowerItem.display_order = item.display_order;
        item.display_order = lowerItemIndex;
        return lowerItem.save().then(() => item.save());
      });
    });
  }
};