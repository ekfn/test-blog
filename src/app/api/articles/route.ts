import queryArticles from "@/entities/article/api/queryArticles";
import zod from "zod";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const limit = zod.coerce.number().parse(searchParams.get("limit"));
  const cursor =
    zod.coerce.number().nullable().parse(searchParams.get("cursor")) ?? 0;

  const response = await queryArticles({ cursor, limit });
  return Response.json(response);
}
