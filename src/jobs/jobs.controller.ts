import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  // HttpException,
  // HttpStatus,
  // UsePipes,
  UseFilters,
  UseInterceptors,
  Render,
} from '@nestjs/common';
import { JobsService } from './jobs.service';
import { JobDTO } from './dtos/job.dto';
import { Job } from './interfaces/job.interface';
import { HttpExceptionFilter } from '../filters/http-exception.filter';
import { ValidationPipe } from '../pipes/validation.pipe';
import { JobData } from 'src/decorators/jobdata.decorator';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { BenchmarkInterceptor } from 'src/interceptors/benchmark.interceptor';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('jobs')
@Controller('jobs')
@UseInterceptors(CacheInterceptor, BenchmarkInterceptor)
// @UseFilters(HttpExceptionFilter)
// @UsePipes(ValidationPipe)
export class JobsController {
  constructor(private readonly jobsService: JobsService) {}

  // @Get(':id')
  // find(@Param('id') id): Promise<Job> {
  //   return this.jobsService
  //     .find(id)
  //     .then((result) => {
  //       if (result) {
  //         return result;
  //       } else {
  //         throw new HttpException('Job not found', HttpStatus.NOT_FOUND);
  //       }
  //     })
  //     .catch(() => {
  //       throw new HttpException('Job not found', HttpStatus.NOT_FOUND);
  //     });
  // }

  @Get()
  @Render('jobs/index')
  root() {
    return this.jobsService
      .findAll()
      .then((result) => (result ? { jobs: result } : { jobs: [] }));
  }

  @Get()
  @CacheKey('allJobs')
  @CacheTTL(25)
  @ApiOkResponse({
    description: 'The resource list has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  findAll(): Promise<Job[]> {
    return this.jobsService.findAll();
  }

  @Get(':id')
  @CacheTTL(30)
  @ApiOkResponse({
    description: 'The resource has been successfully returned.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  find(@Param('id') id: string): Promise<Job> {
    return this.jobsService.find(id);
  }

  @Post()
  // @UsePipes(ValidationPipe)
  // create(@Body(ValidationPipe) job: JobDTO): Promise<Job>
  @UseFilters(HttpExceptionFilter)
  @ApiCreatedResponse({
    description: 'The resource has been successfully created.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  create(@JobData(ValidationPipe) job: JobDTO): Promise<Job> {
    return this.jobsService.create(job);
  }

  @Put(':id')
  @ApiOkResponse({
    description: 'The resource has been successfully updated.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  update(@Param('id') id: string, @Body() job: JobDTO): Promise<Job> {
    return this.jobsService.update(id, job);
  }

  @Delete(':id')
  @ApiOkResponse({
    description: 'The resource has been successfully removed.',
  })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  delete(@Param('id') id: string): Promise<Job> {
    return this.jobsService.delete(id);
  }
}
