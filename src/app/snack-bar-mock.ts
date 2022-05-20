import { of } from "rxjs";

export class SnackBarMock {
    open() {
        return {
          close: () => of(true)
        }
      }
}
