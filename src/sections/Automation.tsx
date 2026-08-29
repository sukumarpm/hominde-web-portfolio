const workflows = [
  { title:"Visitor Approval",      desc:"Resident creates request → Admin notified → One-tap approval → QR dispatched automatically.", icon:"🚗", color:"#2563EB", steps:["Request","Notify","Approve","QR Sent"]          },
  { title:"Maintenance Reminders", desc:"Bill generated → Resident notified → Due date reminder → Payment status updated.",             icon:"💳", color:"#D97706", steps:["Bill Created","Notify","Reminder","Collected"]  },
  { title:"Amenity Booking",       desc:"Resident selects slot → Availability checked → Booking confirmed → Reminder sent.",           icon:"🏊", color:"#7C3AED", steps:["Select Slot","Check","Confirm","Remind"]         },
  { title:"Complaint Workflow",    desc:"Resident raises complaint → Admin notified → Assigned to staff → Resolved and closed.",       icon:"🔧", color:"#DB2777", steps:["Raised","Assigned","In Progress","Resolved"]    },
  { title:"Staff Attendance",      desc:"Staff QR generated → Scan on arrival → Attendance logged → Summary available.",               icon:"👷", color:"#059669", steps:["QR Generated","Scan In","Logged","Summary"]     },
  { title:"Emergency Alert",       desc:"SOS triggered → All security notified → Residents informed → Situation tracked.",             icon:"🚨", color:"#EF4444", steps:["SOS","Security Alert","Residents Notified","Tracked"] },
];

type Workflow = typeof workflows[0];

function WorkflowCard({ w }: { w: Workflow }) {
  return (
    <div
      className="p-5 rounded-2xl h-full flex flex-col transition-all duration-200 theme-transition"
      style={{ background:"var(--card)", border:"1px solid var(--border)", boxShadow:"var(--card-shadow)" }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = w.color;
        el.style.transform = "translateY(-3px)";
        el.style.boxShadow = `0 8px 32px ${w.color}18`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "var(--border)";
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "var(--card-shadow)";
      }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{ background:`${w.color}12`, border:`1px solid ${w.color}25` }}>
          {w.icon}
        </div>
        <h3 className="text-sm font-semibold" style={{ color:"var(--text-1)" }}>{w.title}</h3>
      </div>
      <p className="text-xs leading-relaxed mb-5 flex-1" style={{ color:"var(--text-2)" }}>{w.desc}</p>

      {/* Step chain */}
      <div className="flex items-center gap-1 flex-wrap">
        {w.steps.map((step, i) => (
          <div key={step} className="flex items-center gap-1">
            <div className="px-2 py-0.5 rounded-md text-[9px] font-semibold" style={{ background:`${w.color}12`, color:w.color, border:`1px solid ${w.color}25` }}>
              {step}
            </div>
            {i < w.steps.length - 1 && (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke={w.color} strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" strokeOpacity="0.5"/>
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Automation() {
  return (
    <section className="py-28 px-6 section-fade theme-transition" style={{ background:"var(--bg-2)" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-wider uppercase mb-4" style={{ color:"var(--blue)" }}>Automation</p>
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ color:"var(--text-1)" }}>
            Automate the everyday.
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color:"var(--text-2)" }}>
            Repetitive community workflows run automatically — so your team focuses on what actually needs attention.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {workflows.map((wf) => <WorkflowCard key={wf.title} w={wf}/>)}
        </div>
      </div>
    </section>
  );
}
