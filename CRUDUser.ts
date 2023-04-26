import * as TE from "fp-ts/TaskEither";
import * as T from "fp-ts/Task";
import { fromTask } from "fp-ts/lib/Task";
import { pipe, flow } from "fp-ts/function";
import { HttpError } from "./errors";
import * as O from "fp-ts/lib/Option";
import { IO } from "fp-ts/lib/IO";

type User = {
  id: number;
  name: string;
  email: string;
};

const API_URL = "https://example.com/api/users";

async function getRandomNumber(): Promise<number> {
  return new Promise((res) => res(Math.random()));
}
const getUser = (): T.Task<number> => flow(getRandomNumber);

// const createUser = (user: User): TE.TaskEither<HttpError, User> =>
//   pipe(
//     TE.tryCatch(
//       () =>
//         fetch(`${API_URL}`, {
//           method: "POST",
//           body: JSON.stringify(user),
//           headers: { "Content-Type": "application/json" },
//         }).then((res) => {
//           if (res.ok) {
//             return res.json() as Promise<User>;
//           } else {
//             throw new HttpError(res.status, res.statusText);
//           }
//         }),
//       (err) => new HttpError(500, err.message)
//     )
//   );

// const updateUser = (user: User): TE.TaskEither<HttpError, User> =>
//   pipe(
//     TE.tryCatch(
//       () =>
//         fetch(`${API_URL}/${user.id}`, {
//           method: "PUT",
//           body: JSON.stringify(user),
//           headers: { "Content-Type": "application/json" },
//         }).then((res) => {
//           if (res.ok) {
//             return res.json() as Promise<User>;
//           } else {
//             throw new HttpError(res.status, res.statusText);
//           }
//         }),
//       (err) => new HttpError(500, err.message)
//     )
//   );

// const deleteUser = (userId: number): TE.TaskEither<HttpError, void> =>
//   pipe(
//     TE.tryCatch(
//       () =>
//         fetch(`${API_URL}/${userId}`, { method: "DELETE" }).then((res) => {
//           if (res.ok) {
//             return;
//           } else {
//             throw new HttpError(res.status, res.statusText);
//           }
//         }),
//       (err) => new HttpError(500, err.message)
//     )
//   );

const userId = 123;

// pipe(
//   // getUser(userId)
//   // TE.chain((user) => updateUser({ ...user, name: "Alice Smith" })),
//   // TE.chain((updatedUser) => createUser({ ...updatedUser, id: undefined })),
//   // TE.chain((createdUser) => deleteUser(createdUser.id)),
//   // TE.fold(
//   //   (err) => console.error(`Failed to perform operation: ${err.message}`),
//   //   () =>
//   //     console.log(`User ${userId} updated, created, and deleted successfully`)
//   // )
// )();

pipe(
  T.Do,
  getUser,
  TE.fromTask,
  TE.foldW(
    () => T.of(-1),
    (n) => T.of(n)
  ),
  console.log
);
