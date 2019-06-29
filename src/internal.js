'use strict';

const normalizeAndTransform = (items, xform) => {
  if (!items) {
    return [];
  }

  return items.filter(item => item).map((item, i) => xform(item));
};

module.exports = {
  normalizeAndTransform,
};