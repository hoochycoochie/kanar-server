import { IsString } from 'class-validator';

class LogInDto {
  @IsString()
  public identifiant: string;

  @IsString()
  public reference: string;
  @IsString()
  public password: string;
}

export default LogInDto;
