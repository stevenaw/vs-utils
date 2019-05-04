'use strict';

class Project {
  constructor(rawData) {
    Object.assign(this, {
        data() {
          return rawData;
        }
    });
  }
}

module.exports = Project;