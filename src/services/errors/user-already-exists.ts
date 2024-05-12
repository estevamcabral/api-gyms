export class UserAlreadyExists extends Error {
  constructor() {
    super("User aldready exists!");
  }
}
