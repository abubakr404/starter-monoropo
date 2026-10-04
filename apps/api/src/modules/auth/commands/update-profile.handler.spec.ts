import { NotFoundException } from "@nestjs/common";
import { UpdateProfileHandler } from "./update-profile.handler";
import { UpdateProfileCommand } from "./update-profile.command";

describe("UpdateProfileHandler", () => {
  const prisma = {
    user: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
  };

  const handler = new UpdateProfileHandler(prisma as never);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("updates the user name", async () => {
    prisma.user.findUnique.mockResolvedValue({ id: "u1", email: "a@b.com" });
    prisma.user.update.mockResolvedValue({
      id: "u1",
      email: "a@b.com",
      name: "Ada",
      role: "USER",
      updatedAt: new Date(),
    });

    const result = await handler.execute(
      new UpdateProfileCommand("u1", { name: "Ada" }),
    );

    expect(prisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { id: "u1" },
        data: { name: "Ada" },
      }),
    );
    expect(result.name).toBe("Ada");
  });

  it("merges notification preferences", async () => {
    prisma.user.findUnique.mockResolvedValue({
      id: "u1",
      preferences: { emailAlerts: true },
    });
    prisma.user.update.mockResolvedValue({
      id: "u1",
      email: "a@b.com",
      name: "Ada",
      role: "USER",
      preferences: { emailAlerts: true, productUpdates: true },
      updatedAt: new Date(),
    });

    const result = await handler.execute(
      new UpdateProfileCommand("u1", {
        preferences: { productUpdates: true },
      }),
    );

    expect(prisma.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          preferences: { emailAlerts: true, productUpdates: true },
        },
      }),
    );
    expect(result.preferences).toEqual({
      emailAlerts: true,
      productUpdates: true,
    });
  });

  it("throws when user is missing", async () => {
    prisma.user.findUnique.mockResolvedValue(null);

    await expect(
      handler.execute(new UpdateProfileCommand("missing", { name: "X" })),
    ).rejects.toBeInstanceOf(NotFoundException);
  });
});
