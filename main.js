"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
const helmet_1 = require("helmet");
const auth_guard_1 = require("./auth/guards/auth.guard");
const jwt_1 = require("@nestjs/jwt");
const cookieParser = require("cookie-parser");
const path = require("path");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.use((0, helmet_1.default)());
    app.use(helmet_1.default.contentSecurityPolicy({
        directives: {
            defaultSrc: ["'self'"],
            imgSrc: [
                "'self'",
                'https://nestjs.com',
                'https://insomnia.rest',
                'https://raw.githubusercontent.com',
                'https://nodejs.org',
                'https://handlebarsjs.com',
                'https://www.debian.org',
                'https://upload.wikimedia.org',
                'https://github.githubassets.com',
                'https://prismalens.vercel.app/header/logo-white.svg',
            ],
        },
    }));
    app.use(cookieParser());
    app.setBaseViewsDir(path.join(__dirname, '..', 'views'));
    app.setViewEngine('hbs');
    const jwtService = app.get(jwt_1.JwtService);
    const reflector = app.get(core_1.Reflector);
    app.useGlobalGuards(new auth_guard_1.AuthGuard(jwtService, reflector));
    const port = configService.get('PORT');
    await app.listen(port);
    console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map