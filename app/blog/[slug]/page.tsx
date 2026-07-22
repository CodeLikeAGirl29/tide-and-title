import { client } from "../../../sanity/client";
import { PortableText } from "@portabletext/react";
import Link from "next/link";

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  title,
  category,
  publishedAt,
  body
}`;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await client.fetch(POST_QUERY, { slug }, { cache: "no-store" });

  if (!post) {
    return (
      <main className="container mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-soft">
          Field Notes
        </p>
        <h1 className="mb-6 font-display text-3xl font-medium text-ink">
          Entry Not Found
        </h1>
        <Link
          href="/"
          className="font-mono text-xs uppercase tracking-widest text-depth transition-colors hover:text-buoy"
        >
          &larr; Back to Field Notes
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-3xl px-6 py-16">
      <Link
        href="/"
        className="mb-10 inline-block font-mono text-xs uppercase tracking-widest text-depth transition-colors hover:text-buoy"
      >
        &larr; Back to Field Notes
      </Link>

      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-ink-soft">
        {post.category || "Field Note"}
        {post.publishedAt &&
          ` — ${new Date(post.publishedAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })}`}
      </p>

      <h1 className="mb-8 font-display text-3xl font-medium leading-tight text-ink sm:text-4xl">
        {post.title}
      </h1>

      <div className="mb-10 h-px w-16 bg-buoy" />

      {/* Tailwind Typography 'prose' styles, retuned to the chart-ink / depth palette */}
      <article
        className="prose prose-slate max-w-none leading-relaxed
          prose-headings:font-display prose-headings:font-medium prose-headings:text-ink
          prose-p:text-ink-soft
          prose-a:text-depth prose-a:no-underline hover:prose-a:text-buoy
          prose-strong:text-ink
          prose-blockquote:border-l-buoy prose-blockquote:text-ink-soft"
      >
        <PortableText value={post.body} />
      </article>
    </main>
  );
}
