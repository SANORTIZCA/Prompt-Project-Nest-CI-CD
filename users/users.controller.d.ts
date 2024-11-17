import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAllUsers(): Promise<{
        users: {
            name: string;
            email: string;
            password: string;
            id: number;
        }[];
    }>;
    findOne(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    update(id: number, userUpdateData: UpdateUserDto): Promise<User>;
    remove(id: number): Promise<User>;
}
