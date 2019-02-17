const me = require("../../models/me");

const assert = me.getMe();

test('The name should be Christopher Augustsson', () => {
    expect(assert.name).toBe("Christopher Augustsson");
});