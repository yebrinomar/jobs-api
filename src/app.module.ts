import { Module } from '@nestjs/common';
import { JobsModule } from './jobs/jobs.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    JobsModule,
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/jobs'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
