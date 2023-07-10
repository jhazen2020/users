import { Inject, Injectable } from "@nestjs/common";
import { Users } from "./users.entity";
import { Users as usersModel, UsersInput } from "./users.model";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, MoreThanOrEqual } from "typeorm";
import { ExceptionHandler } from "lib/exception-handler";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        @Inject(ExceptionHandler)
        private excpetionHandler: ExceptionHandler
    ) { }
    async addUser(user: UsersInput) {
        try{
            return await this.usersRepository.insert(user);
        }catch(e){
            this.excpetionHandler.graphqlErrorHandler(e);
        }
    }
    async updateUser(user: Omit<usersModel,'user_category'>) {
        return await this.usersRepository.update({ id: user.id }, user);
    }
    async getUsers(limit: number = 10, cursor: (number | undefined) = 0, order: ("desc" | "asc" | "DESC" | "ASC") = "DESC") {
        return await this.usersRepository.find({
            relations: ['usersCategories'],
            where: {
                id: MoreThanOrEqual(cursor)
            },
            take: limit,
            order: {
                id: {
                    direction: order
                }
            }
        });
    }
    async getUser(id: number) {
        return await this.usersRepository.findOne({
            where: {
                id
            }
        });
    }
    async deleteUser(id: number) {
        return await this.usersRepository.delete(id);
    }
}