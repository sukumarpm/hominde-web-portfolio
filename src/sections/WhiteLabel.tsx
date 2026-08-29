const customizations = [
  {icon:"🎨",label:"Custom Logo"},{icon:"🖌️",label:"Brand Colors"},
  {icon:"📛",label:"Custom App Name"},{icon:"🖥️",label:"Custom UI"},
  {icon:"🔧",label:"Custom Features"},{icon:"🌐",label:"Custom Domain"},
  {icon:"🏢",label:"Building Configuration"},{icon:"⚙️",label:"Organization Settings"},
];
const brands = [
  {name:"Sunrise Residency",     color:"#EA580C",bg:"rgba(234,88,12,0.08)",  border:"rgba(234,88,12,0.2)"},
  {name:"Bluebell Towers",       color:"#2563EB",bg:"var(--blue-bg)",        border:"var(--blue-border)"},
  {name:"Greenpark Homes",       color:"#059669",bg:"var(--green-bg)",       border:"var(--green-border)"},
  {name:"Royal Gated Community", color:"#7C3AED",bg:"var(--purple-bg)",      border:"rgba(124,58,237,0.25)"},
];

export default function WhiteLabel() {
  return (
    <section className="py-24 px-6 section-fade theme-transition" style={{background:"var(--bg)"}}>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-start gap-14">
          <div className="flex-1 max-w-lg">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6" style={{background:"var(--purple-bg)",border:"1px solid rgba(124,58,237,0.25)",color:"#7C3AED"}}>
              ✦ White-label Platform
            </div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{color:"var(--text-1)"}}>
              Your brand.<br/><span style={{color:"#7C3AED"}}>Your community.</span><br/>Your platform.
            </h2>
            <p className="text-lg mb-8 leading-relaxed" style={{color:"var(--text-2)"}}>
              Deploy Hominode as a fully customizable white-label experience designed around your organisation&apos;s identity. No mention of Hominode unless you want it.
            </p>
            <div className="grid grid-cols-2 gap-2.5 mb-6">
              {customizations.map((item) => (
                <div key={item.label} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-150 theme-transition" style={{background:"var(--purple-bg)",border:"1px solid rgba(124,58,237,0.2)"}}>
                  <span className="text-base">{item.icon}</span>
                  <span className="text-sm font-medium" style={{color:"var(--text-2)"}}>{item.label}</span>
                </div>
              ))}
            </div>
            <button
              className="w-full py-3 rounded-xl text-sm font-semibold transition-all duration-200 btn-primary"
              style={{background:"linear-gradient(135deg,#7C3AED,#6D28D9)"}}
              onMouseEnter={(e) => {(e.currentTarget as HTMLElement).style.transform="translateY(-1px)";}}
              onMouseLeave={(e) => {(e.currentTarget as HTMLElement).style.transform="translateY(0)";}}
            >
              Build Your Branded Platform →
            </button>
          </div>

          <div className="flex-1 flex flex-col gap-3 max-w-sm w-full lg:mt-8">
            {brands.map((brand) => (
              <div
                key={brand.name}
                className="px-5 py-4 rounded-2xl flex items-center justify-between transition-all duration-200 theme-transition"
                style={{background:"var(--surface)",border:"1px solid var(--border)"}}
                onMouseEnter={(e) => {const el=e.currentTarget as HTMLElement; el.style.borderColor=brand.border; el.style.boxShadow=`0 4px 20px ${brand.color}12`;}}
                onMouseLeave={(e) => {const el=e.currentTarget as HTMLElement; el.style.borderColor="var(--border)"; el.style.boxShadow="none";}}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold" style={{background:brand.bg,color:brand.color,border:`1px solid ${brand.border}`}}>
                    {brand.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{color:"var(--text-1)"}}>{brand.name}</p>
                    <p className="text-xs" style={{color:"var(--text-4)"}}>Community Management App</p>
                  </div>
                </div>
                <div className="px-2.5 py-1 rounded-full text-[10px] font-semibold" style={{background:brand.bg,color:brand.color,border:`1px solid ${brand.border}`}}>Active</div>
              </div>
            ))}
            <p className="text-center text-xs" style={{color:"var(--text-4)"}}>Same platform. Different brands.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
