import db from "./drizzle";
import { cache } from "react";

export const getCourses = cache(async () => {
    const data = await db.query.courses.findMany();
    return data;
})