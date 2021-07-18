'use strict';

class array extends Array {
  getRange(range) {
    const values = range.split('-')
    let start = parseInt(values[0]);
    let elements = [];

    if (range.includes('-')){
      start = parseInt(values[0]) || 0;
      const end = parseInt(values[1]) || this.length;
      elements.push(...this.slice(start, end + 1));
    } else if (isNaN(start)) {
      return elements;
    } else {
      elements.push(this[parseInt(values[0])]);
    }

    return elements;
  }

  getListRange(rangeList) {
    const ranges = rangeList.split('\n').filter(function(item) { return item != '' });
  
    let allElements = [];
    for (const index in ranges) {
      allElements.push(...this.getRange(ranges[index]));
    }
    return allElements;
  }
  
  
  unique(value, index, self) {
    return self.indexOf(value) === index;
  }
  
  distinct() {
    return Array.from(this.filter(this.unique));
  }
  
  removeRangeList(rangeList) {
    const elements = this.getListRange(rangeList).filter(this.unique);
  
    for (const index in elements) {
      this.splice(this.indexOf(elements[index]),1);
    }
    return Array.from(this);
  }

  regexFilter(regex) {
    const parts = /\/(.*)\/(.*)/.exec(regex);
    const regexp = new RegExp(parts[1], parts[2]);
    return Array.from(this).filter(/./.test.bind(regexp));
  }
}

module.exports = {
  array
};
