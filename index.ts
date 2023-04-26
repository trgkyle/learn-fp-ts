// import {} from "fp-ts";
import * as TE from "fp-ts/TaskEither";
import * as EI from "fp-ts/lib/Either";
import * as O from "fp-ts/lib/Option";
import { pipe } from "fp-ts/lib/function";

interface IUser {
  name: string;
}

type UserError = {
  error: string;
};

const k = EI.fromNullable(5);
function getUserName(): EI.Either<UserError, IUser> {
  if (Math.random() > 0.5) return EI.left({ error: "hello" });
  return EI.right({ name: "Chao xin" });
}

function getRandomNumberGreater05(): EI.Either<boolean, number> {
  const randomNumber = Math.random();
  if (randomNumber > 0.5) return EI.right(randomNumber);
  return EI.left(false);
}

function getRandomNumberGreater06(): O.Option<number> {
  const randomNumber = Math.random();
  return O.some(randomNumber);
}
// EX1: use Either example
// pipe(
//   EI.Do,
//   EI.fromNullable(4),
//   EI.bindW("randomNumber", getRandomNumberGreater05),
//   EI.match(
//     (l) => -1,
//     (r) => r.randomNumber
//   ),
//   console.log
// );

// EX2: use TaskEither
// pipe(
//   TE.Do,
//   TE.of,
//   TE.matchW(
//     () => {
//       console.log("may failed ?");
//     },
//     () => {
//       console.log("Success fully");
//     }
//   )
// );
