import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt } from 'class-validator';

export class JobDTO {
  @ApiProperty({
    type: String,
    description: 'The title of the job position',
    default: '',
  })
  @IsString()
  readonly title: string;

  @ApiProperty({
    type: Number,
    description: 'The expected salary of the job position',
    default: 3000,
  })
  @IsInt()
  readonly salary: number;
}
