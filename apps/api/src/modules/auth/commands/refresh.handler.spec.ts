import { UnauthorizedException } from "@nestjs/common";
import { RefreshHandler } from "./refresh.handler";
import { RefreshCommand } from "./refresh.command";

describe("RefreshHandler", () => {
  const tokens = {
    rotateRefreshToken: jest.fn(),
  };

  const handler = new RefreshHandler(tokens as never);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("returns rotated tokens", async () => {
    tokens.rotateRefreshToken.mockResolvedValue({
      user: { id: "u1", email: "a@b.com", role: "USER" },
      accessToken: "access",
      refreshToken: "refresh",
    });

    const result = await handler.execute(new RefreshCommand("old-token"));
    expect(result.accessToken).toBe("access");
    expect(result.refreshToken).toBe("refresh");
  });

  it("rejects invalid tokens", async () => {
    tokens.rotateRefreshToken.mockResolvedValue(null);

    await expect(handler.execute(new RefreshCommand("bad"))).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });
});
