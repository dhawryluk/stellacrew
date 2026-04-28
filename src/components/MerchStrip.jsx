import { useState, useEffect } from "react";

const STOREFRONT_TOKEN = import.meta.env.VITE_FOURTHWALL_TOKEN;
const STORE_URL = "https://stellacrew-gaming-shop.fourthwall.com";

export default function MerchStrip() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [error, setError]       = useState(null);

  useEffect(() => {
    // Fetch all collections first, then get products from the first collection
    fetch(
      `https://storefront-api.fourthwall.com/v1/collections?storefront_token=${STOREFRONT_TOKEN}`
    )
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then((data) => {
        const collections = data.results ?? [];
        if (collections.length === 0) throw new Error("No collections found");
        const handle = collections[0].slug;
        return fetch(
          `https://storefront-api.fourthwall.com/v1/collections/${handle}/products?storefront_token=${STOREFRONT_TOKEN}`
        );
      })
      .then((r) => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then((data) => { setProducts(data.results ?? data.products ?? data ?? []); setLoading(false); })
      .catch((e) => { console.error("Fourthwall error:", e); setError(e.message); setLoading(false); });
  }, []);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-8 py-16">

      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/40 shadow-[0_0_6px_rgba(234,179,8,0.4)]" />
            <span className="text-[8px] font-bold uppercase tracking-[.5em] text-yellow-500/50">
              Stella Crew — Official Merch
            </span>
          </div>
          <h2 className="text-3xl font-black uppercase italic tracking-tighter text-white">
            Represent the <span className="text-yellow-500">Crew</span>
          </h2>
        </div>
        <a
          href={STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:flex items-center gap-2 text-[9px] font-black uppercase tracking-[.2em] text-white/30 hover:text-yellow-500 border border-white/8 hover:border-yellow-500/30 px-4 py-2 transition-all"
        >
          View Shop →
        </a>
      </div>

      {/* Loading skeletons */}
      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="border border-white/5 bg-[#0d0d0d] animate-pulse">
              <div className="aspect-square bg-[#151515]" />
              <div className="p-4 flex flex-col gap-2">
                <div className="h-3 bg-white/5 rounded-none w-3/4" />
                <div className="h-3 bg-white/5 rounded-none w-1/3" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-[10px] uppercase tracking-widest text-white/20 text-center py-12">
          Could not load products — {error}
        </div>
      )}

      {/* Products */}
      {!loading && !error && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.slice(0, 4).map((product) => {
            const image    = product.images?.[0]?.url ?? product.variants?.[0]?.images?.[0]?.url;
            const price    = product.variants?.[0]?.unitPrice?.value;
            const currency = product.variants?.[0]?.unitPrice?.currency ?? "CAD";
            const slug     = product.slug;
            const url      = `${STORE_URL}/products/${slug}`;

            return (
              <a
                key={product.id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-white/8 bg-[#0d0d0d] hover:border-yellow-500/30 transition-all duration-200 flex flex-col overflow-hidden"
              >
                {/* Image */}
                <div className="aspect-square bg-[#111] overflow-hidden relative">
                  {image ? (
                    <img
                      src={image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-yellow-500/10 text-4xl font-black italic">SC</span>
                    </div>
                  )}
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                    <span className="text-[9px] font-black uppercase tracking-[.2em] text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 border border-white/40 px-3 py-1.5 bg-black/60">
                      View Item →
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col gap-1.5 flex-1">
                  <h3 className="text-[11px] font-black uppercase tracking-tight text-white/80 group-hover:text-white transition-colors leading-tight line-clamp-2">
                    {product.name}
                  </h3>
                  {price != null && (
                    <div className="text-[12px] font-black text-yellow-500 mt-auto">
                      {new Intl.NumberFormat("en-CA", {
                        style: "currency",
                        currency,
                      }).format(price)}
                    </div>
                  )}
                </div>
              </a>
            );
          })}
        </div>
      )}

      {/* Mobile view all */}
      <div className="mt-6 flex justify-center md:hidden">
        <a
          href={STORE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[9px] font-black uppercase tracking-[.2em] text-white/30 hover:text-yellow-500 border border-white/8 hover:border-yellow-500/30 px-6 py-2.5 transition-all"
        >
          View Full Shop →
        </a>
      </div>
    </section>
  );
}