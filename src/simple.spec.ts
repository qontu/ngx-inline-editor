import { TestBed, inject, async } from "@angular/core/testing";
describe("SampleTest", () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [],
            imports: [],
        });
    });

    it("should expect", () => {
        expect(true).toBeTruthy();
    });

    it("should expect async", async(() => {
        setTimeout(() => {
            expect(true).toBeTruthy();
        }, 500);

    }));

});
