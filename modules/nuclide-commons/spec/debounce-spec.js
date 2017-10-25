'use strict';

var _debounce;

function _load_debounce() {
  return _debounce = _interopRequireDefault(require('../debounce'));
}

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Copyright (c) 2017-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * 
 * @format
 */

describe('debounce()', () => {
  it('only calls function once after time advances', () => {
    const timerCallback = jasmine.createSpy('timerCallback');
    const debouncedFunc = (0, (_debounce || _load_debounce()).default)(timerCallback, 100, false);

    debouncedFunc();
    expect(timerCallback).not.toHaveBeenCalled();

    advanceClock(101);
    expect(timerCallback).toHaveBeenCalled();
  });

  it('disposes', () => {
    const timerCallback = jasmine.createSpy('timerCallback');
    const debouncedFunc = (0, (_debounce || _load_debounce()).default)(timerCallback, 100, false);

    debouncedFunc();
    expect(timerCallback).not.toHaveBeenCalled();

    debouncedFunc.dispose();

    advanceClock(101);
    expect(timerCallback).not.toHaveBeenCalled();
  });

  it('does not swallow flow types', () => {
    const func = a => 1;
    const debounced = (0, (_debounce || _load_debounce()).default)(func, 0);
    const ret = debounced('bar');

    // $FlowIgnore: func's first param should be a string.
    debounced(1);

    expect(() => {
      // $FlowIgnore: debounce's return type is "maybe func's return" type.
      ret;
      // This is false because we haven't waited for the timer.

      if (!(ret != null)) {
        throw new Error('Invariant violation: "ret != null"');
      }

      ret;
    }).toThrow();

    debounced.dispose();

    expect(() => {
      // $FlowIgnore: debounced has no "bar" property.
      debounced.bar();
    }).toThrow();
  });
});