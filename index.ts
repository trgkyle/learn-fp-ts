// import {} from "fp-ts";
import * as EI from "fp-ts/lib/Either";
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

pipe(EI.Do, getUserName, console.log);
