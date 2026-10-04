import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import {
  IsBoolean,
  IsOptional,
  IsString,
  MinLength,
  ValidateNested,
} from "class-validator";

export class UserPreferencesDto {
  @ApiPropertyOptional({ example: true })
  @IsOptional()
  @IsBoolean()
  emailAlerts?: boolean;

  @ApiPropertyOptional({ example: false })
  @IsOptional()
  @IsBoolean()
  productUpdates?: boolean;
}

export class UpdateProfileDto {
  @ApiPropertyOptional({ example: "Jane Doe" })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ example: "newpassword123" })
  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;

  @ApiPropertyOptional({ type: UserPreferencesDto })
  @IsOptional()
  @ValidateNested()
  @Type(() => UserPreferencesDto)
  preferences?: UserPreferencesDto;
}
