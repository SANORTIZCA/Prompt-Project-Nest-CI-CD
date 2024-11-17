import { AuthService } from './auth.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Response } from 'express';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    showRegister(): Promise<{}>;
    register(body: RegisterAuthDto, res: Response): Promise<void>;
    showLogin(): Promise<{}>;
    login(body: LoginAuthDto, res: Response): Promise<void | Response<any, Record<string, any>>>;
}
