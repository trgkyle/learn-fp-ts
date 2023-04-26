import * as TE from "fp-ts/TaskEither";
import * as T from "fp-ts/Task";
import { pipe } from "fp-ts/lib/function";
import * as Console from "fp-ts/Console";

function callData() {
  return TE.tryCatch(
    async () => {
      await fetch("https://example.com/data.json");
      return TE.right(true);
    },
    () => TE.left(false)
  );
}
function fetchData() {
  return pipe(
    TE.Do,
    callData,
    TE.fold(
      () => {
        return TE.FromIO(Console.log("hello"));
      },
      (r) => {
        console.log(r);
        return 1;
      }
    )
  );
}

function test() {
  const data = fetchData();
  console.log(data);
}
// Usage
test();
