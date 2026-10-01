import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetHealthQuery } from "./get-health.query";

@QueryHandler(GetHealthQuery)
export class GetHealthHandler implements IQueryHandler<GetHealthQuery> {
  async execute() {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
