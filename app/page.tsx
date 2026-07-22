import { client } from "../sanity/client";
import Image from "next/image";
import { urlFor } from "../sanity/image";
import Link from "next/link";

const POSTS_QUERY = `*[
  _type == "post"
  && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id, 
  title, 
  slug, 
  category,
  publishedAt,
  mainImage,
  "excerpt": array::join(string::split((pt::text(body)), "")[0...120], "") + "..."
}`;

interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  category?: string;
  publishedAt: string;
  excerpt?: string;
  mainImage?: any;
}

export default async function Home() {
  const posts = await client.fetch<Post[]>(
    POSTS_QUERY,
    {},
    { cache: "no-store" },
  );

  return (
    <main className="container mx-auto max-w-5xl px-6 py-12">
      {/* Hero — framed like a chart index card: graticule, coordinate stamp, ledger rule */}
      <section className="chart-grid relative mb-16 overflow-hidden rounded-sm border border-parchment-line px-8 py-14 sm:px-14">
        <div className="relative z-10 flex flex-col gap-6">
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-ink-soft">
            <span>Field Notes</span>
            <span>30.3935&deg;N&nbsp;&nbsp;86.4958&deg;W</span>
          </div>
          <h1 className="max-w-2xl font-display text-4xl font-medium leading-[1.05] text-ink sm:text-5xl md:text-6xl">
            Reading the Emerald Coast market, one parcel at a time.
          </h1>
          <p className="max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Local analysis, HOA &amp; condo compliance guides, and
            neighborhood-level insight for Destin and Okaloosa County.
          </p>
          <div className="h-px w-24 bg-buoy" />
        </div>
      </section>

      {posts.length === 0 ? (
        <div className="rounded-sm border border-dashed border-parchment-line bg-white/40 p-12 text-center">
          <p className="mb-4 text-lg text-ink-soft">
            No field notes filed yet.
          </p>
          <Link
            href="/studio"
            className="inline-block bg-ink px-6 py-3 text-sm font-medium tracking-wide text-parchment transition-colors hover:bg-depth"
          >
            Write Your First Post
          </Link>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post._id}
              className="group flex h-full flex-col overflow-hidden border border-parchment-line bg-white/60 transition-all duration-300 hover:-translate-y-1 hover:border-ink"
            >
              <Link
                href={`/blog/${post.slug.current}`}
                className="flex flex-grow flex-col"
              >
                {/* Sounding line — marks each entry, like a depth reading on a chart */}
                <div className="h-1 w-full bg-depth" />

                {post.mainImage ? (
                  <div className="relative h-56 w-full overflow-hidden bg-parchment-line/40">
                    <Image
                      src={urlFor(post.mainImage).url()}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="flex h-56 w-full items-center justify-center bg-parchment-line/30">
                    <span className="font-mono text-xs uppercase tracking-widest text-ink-soft/60">
                      No Image on File
                    </span>
                  </div>
                )}

                <div className="flex flex-grow flex-col p-6">
                  <p className="mb-2 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-buoy">
                    <span className="inline-block h-1.5 w-1.5 bg-buoy" />
                    {post.category || "Field Note"}
                  </p>
                  <h2 className="mb-3 font-display text-xl font-medium leading-snug text-ink line-clamp-2 transition-colors group-hover:text-depth">
                    {post.title}
                  </h2>

                  {post.excerpt && (
                    <p className="mb-4 text-sm leading-relaxed text-ink-soft line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}

                  <div className="mt-auto flex items-center justify-between border-t border-parchment-line pt-4">
                    <p className="font-mono text-[11px] uppercase tracking-widest text-ink-soft/70">
                      {post.publishedAt
                        ? new Date(post.publishedAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )
                        : "Draft"}
                    </p>
                    <span className="font-mono text-[11px] font-medium uppercase tracking-widest text-ink transition-colors group-hover:text-depth">
                      Read &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
