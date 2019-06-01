'use strict';

class Version {
  constructor(data) {
    this.major = data.major;
    this.minor = data.minor;
    this.patch = data.patch;
    this.version = data.version;
    this.originalString = data.originalString;
  }

  toString() {
    return this.version;
  }
}

module.exports = Version;