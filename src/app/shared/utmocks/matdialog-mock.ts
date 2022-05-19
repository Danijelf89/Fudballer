import { of } from "rxjs";

export class MatdialogMock {
    open() {
        return {
          close: () => of(true)
        }
      }
}
