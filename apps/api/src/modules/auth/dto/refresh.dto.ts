import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString, MinLength } from "class-validator";

export class RefreshDto {
  @ApiProperty({ example: "a1b2c3..." })
  @IsString()
  @MinLength(20)
  refreshToken!: string;
}

export class LogoutDto {
  @ApiPropertyOptional({ example: "a1b2c3..." })
  @IsOptional()
  @IsString()
  refreshToken?: string;
}
