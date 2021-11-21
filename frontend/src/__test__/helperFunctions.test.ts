import { typesToList } from "../util/helperFunctions";

describe("typesToList tests", () => {
    it("dragon and steel types to list", () => {
        expect(typesToList("dragon", "steel")).toStrictEqual(["dragon", "steel"])
    })
    it("empty string equals empty list", () => {
        expect(typesToList("", "").length).toBe(0)
    }) 
})




