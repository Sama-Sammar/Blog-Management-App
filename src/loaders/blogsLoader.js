import { redirect } from "react-router-dom";
import { getBlogsPage } from "../services/blogsService";

function normalizeLang(lng) {
    const v = (lng || "").toLowerCase();
    return v.startsWith("ar") ? "ar" : "en";
}

export async function homeLoader({ request }) {
    const url = new URL(request.url);

    const langParam = url.searchParams.get("lang");
    const lang = normalizeLang(langParam);

    const pageParam = url.searchParams.get("page");
    const currentPage = pageParam ? Number(pageParam) : 1;

    const pageSize = 6;
    const safePage =
        Number.isNaN(currentPage) || currentPage < 1 ? 1 : currentPage;

    const { blogs, totalCount } = await getBlogsPage({
        page: safePage,
        limit: pageSize,
        lang,
    });

    const totalPages = Math.max(1, Math.ceil((totalCount || 0) / pageSize));
    const finalPage = safePage > totalPages ? totalPages : safePage;

    if (!langParam || finalPage !== safePage) {
        url.searchParams.set("lang", lang);
        url.searchParams.set("page", String(finalPage));
        return redirect(`/?${url.searchParams.toString()}`);
    }

    return {
        blogs,
        pagination: { currentPage: finalPage, totalPages },
    };
}
