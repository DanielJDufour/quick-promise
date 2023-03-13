const test = require("flug");
const QuickPromise = require("./quick-promise.js");

test("QuickPromise.all: sync inputs", ({ eq }) => {
  let checked = false;
  QuickPromise.all([1, 2]).then(values => {
    eq(values, [1, 2]);
    checked = true;
  });
  eq(checked, true);
});

test("QuickPromise.all: async + sync inputs", async ({ eq }) => {
  let checked = false;
  const promise = QuickPromise.all([Promise.resolve(1), 2]).then(values => {
    eq(values, [1, 2]);
    checked = true;
  });
  eq(checked, false);
  await promise;
  eq(checked, true);
});

test("QuickPromise.resolve: sync number", ({ eq }) => {
  let checked = false;
  QuickPromise.resolve(1).then(value => {
    eq(value, 1);
    checked = true;
  });
  eq(checked, true);
});

test("QuickPromise.resolve: async number", async ({ eq }) => {
  let checked = false;
  await QuickPromise.resolve(Promise.resolve(1)).then(value => {
    eq(value, 1);
    checked = true;
  });
  eq(checked, true);
});

test("QuickPromise.resolve: sync number with await", async ({ eq }) => {
  const value = await QuickPromise.resolve(1);
  eq(value, 1);
});
