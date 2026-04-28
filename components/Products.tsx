// "use client";

// import { useState, useEffect, useCallback } from "react";
// import {
//   Users,
//   CreditCard,
//   BarChart2,
//   UserCheck,
//   Calendar,
//   DollarSign,
//   MessageSquare,
//   Video,
//   FolderOpen,
//   CheckSquare,
//   GitBranch,
//   Activity,
//   TrendingUp,
//   Briefcase,
//   MessageCircle,
//   Kanban,
//   ArrowRight,
//   ChevronLeft,
//   ChevronRight,
//   Sparkles,
//   type LucideIcon,
// } from "lucide-react";
// import WaveDivider from "@/components/WaveDivider";
// import useReveal from "@/hooks/useReveal";

// type Feature = { icon: LucideIcon; title: string; description: string };
// type Product = {
//   number: string;
//   mainIcon: LucideIcon;
//   label: string;
//   title: string;
//   subtitle: string;
//   description: string;
//   features: Feature[];
// };

// const products: Product[] = [
//   {
//     number: "01",
//     mainIcon: TrendingUp,
//     label: "Customer & Growth",
//     title: "Customer & Growth Tools",
//     subtitle: "Build relationships and grow revenue.",
//     description:
//       "CNX247 CRM gives your sales team real-time visibility into leads, clients, and invoices — so no deal ever slips through the cracks.",
//     features: [
//       {
//         icon: Users,
//         title: "CRM (Customer Management)",
//         description: "Track leads, manage deals, and monitor customer interactions.",
//       },
//       {
//         icon: CreditCard,
//         title: "Sales & Invoicing",
//         description: "Convert leads into paying customers seamlessly.",
//       },
//       {
//         icon: BarChart2,
//         title: "Analytics & Reports",
//         description: "Get insights to make smarter business decisions.",
//       },
//     ],
//   },
//   {
//     number: "02",
//     mainIcon: Briefcase,
//     label: "Team & HR",
//     title: "Team & HR Management",
//     subtitle: "Empower your workforce.",
//     description:
//       "Manage your people from a single hub — attendance, performance, payroll, and leave requests handled with zero friction.",
//     features: [
//       {
//         icon: UserCheck,
//         title: "Employee Management",
//         description: "Monitor staff, attendance, and performance centrally.",
//       },
//       {
//         icon: Calendar,
//         title: "Leave & Workflow",
//         description: "Automate approvals and internal processes.",
//       },
//       {
//         icon: DollarSign,
//         title: "Payroll & Records",
//         description: "Keep everything organized and accessible.",
//       },
//     ],
//   },
//   {
//     number: "03",
//     mainIcon: MessageCircle,
//     label: "Communication",
//     title: "Communication & Collaboration",
//     subtitle: "Work smarter together.",
//     description:
//       "From instant chat to video meetings and shared drives, CNX247 keeps every conversation and file in one connected workspace.",
//     features: [
//       {
//         icon: MessageSquare,
//         title: "Chat & Calls",
//         description: "Instant messaging and voice calls across teams.",
//       },
//       {
//         icon: Video,
//         title: "Video Meetings",
//         description: "Host meetings and webinars effortlessly.",
//       },
//       {
//         icon: FolderOpen,
//         title: "Shared Workspace",
//         description: "Store, share, and collaborate on files.",
//       },
//     ],
//   },
//   {
//     number: "04",
//     mainIcon: Kanban,
//     label: "Project & Workflow",
//     title: "Project & Workflow Management",
//     subtitle: "Deliver projects faster.",
//     description:
//       "Track every project from kickoff to completion with automated workflows that eliminate bottlenecks and keep your team moving.",
//     features: [
//       {
//         icon: CheckSquare,
//         title: "Task Management",
//         description: "Break projects into manageable, trackable tasks.",
//       },
//       {
//         icon: GitBranch,
//         title: "Workflow Automation",
//         description: "Automate approvals and multi-step processes.",
//       },
//       {
//         icon: Activity,
//         title: "Activity Tracking",
//         description: "Monitor progress and bottlenecks in real time.",
//       },
//     ],
//   },
// ];

// const AUTOPLAY_INTERVAL = 7000; // 7 seconds

// export default function Products() {
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [hasInteracted, setHasInteracted] = useState(false);
//   const sectionRef = useReveal();

//   const handleNext = useCallback((isManual = false) => {
//     if (isManual) setHasInteracted(true);
//     setActiveIndex((prev) => (prev + 1) % products.length);
//   }, []);

//   const handlePrev = useCallback((isManual = false) => {
//     if (isManual) setHasInteracted(true);
//     setActiveIndex((prev) => (prev - 1 + products.length) % products.length);
//   }, []);

//   const handleDotClick = (i: number) => {
//     setHasInteracted(true);
//     setActiveIndex(i);
//   };

//   // Autoplay functionality
//   useEffect(() => {
//     if (hasInteracted) return;

//     const timeoutId = setTimeout(() => {
//       handleNext(false);
//     }, AUTOPLAY_INTERVAL);

//     return () => clearTimeout(timeoutId);
//   }, [activeIndex, hasInteracted, handleNext]);

//   return (
//     <>
//       <WaveDivider fill="#e4f3ee" />

//       <section
//         id="products"
//         ref={sectionRef}
//         className="relative bg-bg-light pt-16 md:pt-24 pb-24 md:pb-32 overflow-hidden"
//       >
//         <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           {/* Section Header */}
//           <div className="max-w-3xl mx-auto text-center mb-16 md:mb-20">
//             <span className="reveal inline-flex items-center gap-1.5 py-1.5 px-3 rounded-full bg-white/70 border border-primary/15 text-primary text-[11px] font-bold tracking-[0.18em] uppercase mb-6 backdrop-blur-sm">
//               <Sparkles className="w-3 h-3" aria-hidden="true" />
//               Platform Capabilities
//             </span>
//             <h2 className="reveal text-4xl md:text-5xl lg:text-6xl font-bold text-heading tracking-tight leading-[1.05] mb-6">
//               Everything you need to{" "}
//               <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-accent">
//                 scale faster.
//               </span>
//             </h2>
//             <p className="reveal text-lg text-body leading-relaxed">
//               Replace dozens of disconnected tools with one unified, intelligent platform.
//               Experience seamless workflows designed for modern teams.
//             </p>
//           </div>

//           {/* Slideshow Area */}
//           <div
//             className="reveal"
//             role="region"
//             aria-roledescription="carousel"
//             aria-label="Platform Modules Showcase"
//           >
//             {/* The Stacked Grid */}
//             <div className="grid grid-cols-1">
//               {products.map((product, idx) => {
//                 const isActive = activeIndex === idx;
//                 const MainIcon = product.mainIcon;

//                 return (
//                   <div
//                     key={product.number}
//                     className={`col-start-1 row-start-1 grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[2.5rem] shadow-xl overflow-hidden transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${isActive
//                         ? "opacity-100 z-10 translate-y-0 scale-100 pointer-events-auto shadow-[0_30px_80px_-20px_rgba(46,147,125,0.15)]"
//                         : "opacity-0 z-0 translate-y-12 scale-95 pointer-events-none shadow-none"
//                       }`}
//                     aria-hidden={!isActive}
//                   >
//                     {/* Left: Content Panel */}
//                     <div className="p-6 sm:p-10 lg:p-14 flex flex-col justify-center relative border-r border-gray-100/50">
//                       <div className="mb-8">
//                         <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
//                           <MainIcon size={16} strokeWidth={2.5} />
//                           {product.label}
//                         </div>
//                         <h3 className="text-3xl lg:text-4xl font-bold text-heading tracking-tight mb-4 leading-tight">
//                           {product.title}
//                         </h3>
//                         <p className="text-lg text-body leading-relaxed">
//                           {product.description}
//                         </p>
//                       </div>

//                       <div className="space-y-3 mb-10">
//                         {product.features.map((f, i) => (
//                           <div
//                             key={i}
//                             className="group flex items-start gap-4 p-4 rounded-2xl hover:bg-bg-light/60 transition-colors border border-transparent hover:border-gray-100"
//                           >
//                             <div className="mt-0.5 bg-white shadow-sm border border-gray-100/80 p-2.5 rounded-xl text-primary shrink-0 group-hover:scale-110 transition-transform duration-300">
//                               <f.icon size={22} strokeWidth={2} />
//                             </div>
//                             <div>
//                               <h4 className="font-semibold text-heading mb-1 text-[15px]">
//                                 {f.title}
//                               </h4>
//                               <p className="text-[14px] text-body leading-relaxed">
//                                 {f.description}
//                               </p>
//                             </div>
//                           </div>
//                         ))}
//                       </div>

//                       <div className="mt-auto">
//                         <button className="group inline-flex items-center gap-2 text-[15px] font-semibold text-white bg-gray-900 px-6 py-3.5 rounded-full hover:bg-gray-800 hover:shadow-lg transition-all focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 outline-none">
//                           Explore {product.label}
//                           <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
//                         </button>
//                       </div>
//                     </div>

//                     {/* Right: Abstract Visual Panel */}
//                     <div className="relative min-h-[350px] lg:min-h-full bg-linear-to-br from-bg-light/50 via-white to-primary/5 overflow-hidden flex items-center justify-center p-6 lg:p-8">
//                       {/* Watermark Number */}
//                       <span className="absolute -top-10 -right-10 text-[14rem] lg:text-[18rem] font-black text-primary/[0.03] leading-none select-none tracking-tighter pointer-events-none">
//                         {product.number}
//                       </span>

//                       {/* Ambient Blobs */}
//                       <div className="absolute top-1/4 -left-12 w-64 h-64 bg-primary/15 rounded-full blur-[80px] animate-pulse pointer-events-none" />
//                       <div className="absolute bottom-1/4 -right-12 w-64 h-64 bg-accent/15 rounded-full blur-[80px] animate-pulse delay-1000 pointer-events-none" />

//                       {/* Composition */}
//                       <div className="relative w-full max-w-[280px] sm:max-w-sm aspect-square flex items-center justify-center">
//                         {/* Center Node */}
//                         <div className="relative z-10 w-32 h-32 md:w-44 md:h-44 bg-white/80 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] shadow-[0_20px_50px_-10px_rgba(46,147,125,0.2)] flex items-center justify-center transform transition-transform duration-700 hover:scale-[1.03]">
//                           <MainIcon size={64} className="text-primary drop-shadow-sm" strokeWidth={1.5} />
//                         </div>

//                         {/* Orbiting Elements */}
//                         {product.features.map((f, i) => {
//                           const positions = [
//                             "top-4 -left-2 lg:-left-6 -rotate-6",
//                             "bottom-8 -right-2 lg:-right-8 rotate-6",
//                             "-bottom-6 left-6 lg:left-12 -rotate-3",
//                           ];

//                           return (
//                             <div
//                               key={i}
//                               className={`absolute ${positions[i]} z-20 bg-white/90 backdrop-blur-xl p-3 pr-4 lg:pr-5 rounded-2xl shadow-xl border border-white/60 flex items-center gap-3 animate-float-slow`}
//                               style={{ animationDelay: `${i * 0.9}s` }}
//                             >
//                               <div className="bg-gradient-to-br from-primary/10 to-primary/5 text-primary p-2.5 rounded-xl shadow-inner shrink-0">
//                                 <f.icon size={20} strokeWidth={2.5} />
//                               </div>
//                               <span className="font-semibold text-heading text-xs lg:text-sm whitespace-nowrap">
//                                 {f.title}
//                               </span>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>

//             {/* Slideshow Controls */}
//             <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 px-2 sm:px-6">
//               {/* Progress Dots */}
//               <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
//                 {products.map((p, i) => (
//                   <button
//                     key={i}
//                     onClick={() => handleDotClick(i)}
//                     className="group flex flex-col gap-2.5 shrink-0 outline-none"
//                     aria-label={`Go to slide ${i + 1}`}
//                     aria-current={activeIndex === i}
//                   >
//                     <div className="flex items-center h-5">
//                       <span className={`text-[11px] font-bold tracking-[0.2em] uppercase transition-colors duration-300 shrink-0 ${activeIndex === i ? 'text-primary' : 'text-body/40 group-hover:text-body/70'}`}>
//                         {p.number}
//                       </span>
//                       <div className={`overflow-hidden transition-all duration-500 ease-out flex items-center ${activeIndex === i ? 'max-w-[150px] opacity-100 ml-2' : 'max-w-0 opacity-0 ml-0'}`}>
//                         <span className="text-xs font-semibold whitespace-nowrap text-heading">
//                           {p.label}
//                         </span>
//                       </div>
//                     </div>
//                     <div className="w-16 sm:w-20 md:w-28 h-1.5 rounded-full bg-gray-200/80 overflow-hidden relative">
//                       {/* Active Fill */}
//                       {activeIndex === i && (
//                         <div
//                           key={`progress-${activeIndex}`}
//                           className={`absolute top-0 left-0 bottom-0 bg-primary w-full origin-left ${hasInteracted ? 'scale-x-100 transition-transform duration-300' : 'animate-progress-fill'}`}
//                         />
//                       )}
//                     </div>
//                   </button>
//                 ))}
//               </div>

//               {/* Prev / Next Arrows */}
//               <div className="flex items-center gap-3 shrink-0">
//                 <button
//                   onClick={() => handlePrev(true)}
//                   className="p-3.5 rounded-full bg-white border border-gray-200/80 text-body hover:text-primary hover:border-primary hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
//                   aria-label="Previous module"
//                 >
//                   <ChevronLeft size={22} strokeWidth={2} />
//                 </button>
//                 <button
//                   onClick={() => handleNext(true)}
//                   className="p-3.5 rounded-full bg-white border border-gray-200/80 text-body hover:text-primary hover:border-primary hover:shadow-md transition-all focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
//                   aria-label="Next module"
//                 >
//                   <ChevronRight size={22} strokeWidth={2} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <style
//         dangerouslySetInnerHTML={{
//           __html: `
//         @keyframes progress-fill {
//           0% { transform: scaleX(0); }
//           100% { transform: scaleX(1); }
//         }
//         .animate-progress-fill {
//           animation: progress-fill ${AUTOPLAY_INTERVAL}ms linear forwards;
//         }
//         @keyframes float-slow {
//           0%, 100% { transform: translateY(0px); }
//           50% { transform: translateY(-8px); }
//         }
//         .animate-float-slow {
//           animation: float-slow 4s ease-in-out infinite;
//         }
//         .hide-scrollbar::-webkit-scrollbar {
//           display: none;
//         }
//         .hide-scrollbar {
//           -ms-overflow-style: none;
//           scrollbar-width: none;
//         }
//       `,
//         }}
//       />
//     </>
//   );
// }
