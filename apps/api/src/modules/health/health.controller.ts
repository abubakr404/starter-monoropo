import { Controller, Get } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiTags } from "@nestjs/swagger";
import { GetHealthQuery } from "./queries/get-health.query";

@ApiTags("health")
@Controller("health")
export class HealthController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  getHealth() {
    return this.queryBus.execute(new GetHealthQuery());
  }
}
