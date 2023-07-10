import { HttpStatus, Injectable } from "@nestjs/common";
import { GraphQLError } from "graphql";

@Injectable()
export class ExceptionHandler{
    graphqlErrorHandler(e: any){
        let message = ''
            if (typeof e === "string") {
                message = e.toUpperCase() // works, `e` narrowed to string
            } else if (e instanceof Error) {
                message = e.message // works, `e` narrowed to Error
            }
            console.log(`Error saving user. message: ${message}`);
            throw new GraphQLError('Failed to add the user.',{
                extensions: {
                code: HttpStatus.BAD_REQUEST,
               }});
    }
}