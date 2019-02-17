const reports = require("../../models/reports");


test("Test get function. Get a valid report", () => {
    return expect(reports.get("")).resolves.toEqual({ res: "ok" });
})

test("Test get function. This should give an error from DB", () => {
    return expect(reports.get("fail")).rejects.toMatch("error");
})

test("Test addReport with database error", () => {
    return expect(reports.addReport("")).resolves.toEqual({ data: { message: "Reports added" } });
})

test("Test addReport with database error", () => {
    return expect(reports.addReport("fail")).rejects.toMatch("error");
})