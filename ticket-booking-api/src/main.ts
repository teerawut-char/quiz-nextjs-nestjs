import "dotenv/config"
import { NestFactory } from "@nestjs/core"
import { ValidationPipe } from "@nestjs/common"
import { AppModule } from "./app.module"
import { TransformInterceptor } from "./common/interceptors/transform.interceptor"
import { LoggerInterceptor } from "./common/interceptors/logger.interceptor"
import { HttpExceptionFilter } from "./common/filters/http-exception.filter"

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            forbidNonWhitelisted: true,
            transform: true,
        }),
    )

    app.useGlobalInterceptors(new LoggerInterceptor())
    app.useGlobalInterceptors(new TransformInterceptor())
    app.useGlobalFilters(new HttpExceptionFilter())

    app.enableCors()

    const port = process.env.PORT || 3000
    await app.listen(port)
    console.log(`Application is running on: http://localhost:${port}`)
}
bootstrap()
