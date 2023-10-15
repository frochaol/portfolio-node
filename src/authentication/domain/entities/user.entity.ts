export class UserEntity {
  constructor(
    public id: string,
    public name: string,
    public lastname: string,
    public password: string,
    public email: string
  ) {}
}
