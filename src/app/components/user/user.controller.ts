import { UserDTO } from './user.providers'

export class UserController {
  constructor(
    private UserService: any,
  ) {}

  public get = async (username: string, user: UserDTO) =>
    await this.UserService.get(username, user)

  public list = async (query: {
    perPage: number,
    page: number,
  }) => await this.UserService.list(query)

  public update = async (query: {
    username: string,
    userLogged: UserDTO,
    changes: UserDTO
  }) => await this.UserService.update(query)

  public toggleStatus = async (username: string) =>
    await this.UserService.toggleStatus(username)
}
