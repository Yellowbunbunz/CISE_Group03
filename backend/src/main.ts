import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 8082;

  // Originally, CORS blocked our frontend from creating POST requests.
  // The code below tells it to chill and let the methods defined be requested from :3000
  app.enableCors({
    origin: 'https://speed-product.vercel.app/',
    methods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Content-type, Authorization',
  });

  await app.listen(port, () => console.log(`Server running on port ${port}`));
}
bootstrap();
