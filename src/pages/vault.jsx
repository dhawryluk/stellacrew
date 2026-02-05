// import { services, categories } from "../data/vaultData";
// import FeaturedAsset from "../components/FeaturedAsset";
// import { ServiceModal } from "../components/ServiceModal"; // Ensure this component is created

// export default function VaultPage() {
//   const [activeTab, setActiveTab] = useState("All");
//   const [selectedItem, setSelectedItem] = useState(null); // Modal State

//   const filteredServices =
//     activeTab === "All"
//       ? services
//       : services.filter((s) => s.category === activeTab);

//   const handlePurchase = (link) => {
//     if (link === "#" || !link) {
//       alert("Inquiry only: Contact StellaCrew on Discord.");
//       return;
//     }
//     window.location.href = link;
//   };

//   return (
//     <div className="min-h-screen bg-[#050505] pt-32 pb-20 px-6 font-sans">
//       <div className="max-w-7xl mx-auto">
//         {/* 1. Header Section */}
//         <div className="text-center mb-16">
//           <h1 className="text-5xl font-bold text-[#d4af37] tracking-[0.4em] uppercase mb-4">
//             The Vault
//           </h1>
//           <div className="h-[1px] w-24 bg-[#d4af37] mx-auto opacity-40"></div>
//         </div>

//         <FeaturedAsset />

//         {/* 2. Process Steps */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-4xl mx-auto border-y border-[#d4af37]/10 py-10">
//           {[
//             {
//               id: "01",
//               title: "Select Tier",
//               desc: "Choose your asset package",
//             },
//             {
//               id: "02",
//               title: "Secure Access",
//               desc: "Complete Stripe checkout",
//             },
//             {
//               id: "03",
//               title: "Discord Handoff",
//               desc: "Join HQ for asset delivery",
//             },
//           ].map((step) => (
//             <div key={step.id} className="text-center group">
//               <span className="text-[#d4af37] font-mono text-xs block mb-2 transition-transform group-hover:-translate-y-1">
//                 {step.id}
//               </span>
//               <h4 className="text-white text-[10px] uppercase tracking-widest font-bold">
//                 {step.title}
//               </h4>
//               <p className="text-gray-500 text-[9px] uppercase mt-1 italic">
//                 {step.desc}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* 3. Filter Tabs */}
//         <div className="flex flex-wrap justify-center gap-4 mb-16">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setActiveTab(cat)}
//               className={`px-10 py-2 text-[10px] uppercase tracking-[0.3em] border transition-all duration-500 ${
//                 activeTab === cat
//                   ? "bg-[#d4af37] text-black border-[#d4af37] font-black shadow-[0_0_20px_rgba(212,175,55,0.3)]"
//                   : "border-[#d4af37]/10 text-gray-500 hover:border-[#d4af37] hover:text-[#d4af37]"
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* 4. Assets Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-stretch">
//           {filteredServices.map((item) => (
//             <div
//               key={item.id}
//               className="group relative bg-[#0d0d0d] border border-white/5 overflow-hidden transition-all duration-500 hover:border-[#d4af37]/40 flex flex-col h-full shadow-2xl"
//             >
//               {/* Image Container */}
//               <div className="relative aspect-video overflow-hidden shrink-0">
//                 <img
//                   src={item.img}
//                   alt={item.name}
//                   className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110 opacity-40 group-hover:opacity-100"
//                 />
//                 <div className="absolute top-4 right-4 bg-black/90 px-3 py-1 border border-[#d4af37]/20 text-[#d4af37] font-mono text-[10px]">
//                   {item.price}
//                 </div>
//               </div>

//               {/* Content Container */}
//               <div className="p-8 flex flex-col flex-grow">
//                 <span className="text-[10px] text-[#d4af37]/60 font-black uppercase tracking-widest">
//                   {item.category}
//                 </span>
//                 <h3 className="text-2xl text-white font-bold mt-1 uppercase tracking-tighter group-hover:text-[#d4af37] transition-colors">
//                   {item.name}
//                 </h3>

//                 {/* Short Preview Text */}
//                 <p className="text-gray-500 text-[11px] uppercase tracking-wider mt-4 font-medium flex-grow leading-relaxed line-clamp-2">
//                   {item.detail}
//                 </p>

//                 <div className="mt-8 space-y-3">
//                   {/* MODAL TRIGGER */}
//                   <button
//                     onClick={() => setSelectedItem(item)}
//                     className="w-full border border-white/10 text-white/40 py-3 text-[9px] font-black uppercase tracking-[0.2em] transition-all hover:border-[#d4af37] hover:text-[#d4af37]"
//                   >
//                     View Manifest Details
//                   </button>

//                   {/* PURCHASE BUTTON */}
//                   <button
//                     onClick={() => handlePurchase(item.stripeLink)}
//                     className="w-full bg-[#d4af37] text-black py-4 text-[11px] font-black uppercase tracking-[0.3em] transition-all hover:bg-white shadow-lg shadow-black"
//                   >
//                     Acquire Access
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Global Modal Component */}
//       <ServiceModal
//         item={selectedItem}
//         isOpen={!!selectedItem}
//         onClose={() => setSelectedItem(null)}
//       />
//     </div>
//   );
// }
