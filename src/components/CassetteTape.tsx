import { cn } from "./lib/Utils";

interface CassetteTapeProps {
  size?: "sm" | "md" | "lg" | "xl";
  spinning?: boolean;
  className?: string;
  cassetteColor?: "black" | "white" | "clear" | "red" | "blue" | "green" | "purple" | "orange" | "pink" | "yellow";
}

const sizeClasses = {
  sm: "w-40 h-24",
  md: "w-56 h-36",
  lg: "w-80 h-48",
  xl: "w-96 h-60",
};

const colorMap = {
  white: {
    body: "linear-gradient(135deg, #fafafa 0%, #ffffff 50%, #f5f5f5 100%)",
    label: "#ffffff",
    spools: "#2a2a2a",
    tape: "#1a1a1a"
  },
  clear: {
    body: "linear-gradient(135deg, rgba(245, 245, 245, 0.4), rgba(255, 255, 255, 0.3))",
    label: "rgba(255, 255, 255, 0.8)",
    spools: "#3a3a3a",
    tape: "#2a2a2a"
  },
  red: {
    body: "linear-gradient(135deg, #dc2626, #ef4444, #dc2626)",
    label: "#fecaca",
    spools: "#450a0a",
    tape: "#7f1d1d"
  },
  blue: {
    body: "linear-gradient(135deg, #2563eb, #3b82f6, #2563eb)",
    label: "#bfdbfe",
    spools: "#1e3a8a",
    tape: "#1e40af"
  },
  green: {
    body: "linear-gradient(135deg, #16a34a, #22c55e, #16a34a)",
    label: "#bbf7d0",
    spools: "#14532d",
    tape: "#166534"
  },
  purple: {
    body: "linear-gradient(135deg, #9333ea, #a855f7, #9333ea)",
    label: "#e9d5ff",
    spools: "#581c87",
    tape: "#6b21a8"
  },
  orange: {
    body: "linear-gradient(135deg, #ea580c, #f97316, #ea580c)",
    label: "#fed7aa",
    spools: "#7c2d12",
    tape: "#9a3412"
  },
  pink: {
    body: "linear-gradient(135deg, #db2777, #ec4899, #db2777)",
    label: "#fce7f3",
    spools: "#831843",
    tape: "#9f1239"
  },
  yellow: {
    body: "linear-gradient(135deg, #ca8a04, #eab308, #ca8a04)",
    label: "#fef9c3",
    spools: "#713f12",
    tape: "#854d0e"
  },
  black: {
    body: "linear-gradient(135deg, #18181b, #27272a, #18181b)",
    label: "#71717a",
    spools: "#09090b",
    tape: "#3f3f46"
  }
};

export const CassetteTape = ({
  size = "lg",
  spinning = false,
  className,
  cassetteColor = "black"
}: CassetteTapeProps) => {
  const colors = colorMap[cassetteColor] || colorMap.black;

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      <div 
        className="absolute inset-0 rounded-md overflow-hidden shadow-2xl"
        style={{ 
          background: colors.body,
          border: cassetteColor === "white" ? "2px solid #e5e5e5" : "2px solid rgba(0,0,0,0.2)"
        }}
      >
        {/* Window/Viewing area */}
        <div 
          className="absolute top-[8%] left-[8%] right-[8%] h-[45%] rounded-sm"
          style={{ 
            background: cassetteColor === "clear" 
              ? "linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.05))"
              : "rgba(0, 0, 0, 0.15)",
            border: "1px solid rgba(0,0,0,0.1)"
          }}
        >
          {/* Spools Container */}
          <div className="flex justify-around items-center h-full px-6">
            {[1, 2].map((i) => (
              <div key={i} className="relative w-[28%] aspect-square">
                <div 
                  className={cn(
                    "absolute inset-0 rounded-full flex items-center justify-center",
                    spinning && "animate-spin"
                  )}
                  style={{ 
                    background: colors.spools,
                    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3)"
                  }}
                >
                  {/* Spool teeth */}
                  {[...Array(6)].map((_, idx) => (
                    <div
                      key={idx}
                      className="absolute w-[15%] h-[60%] left-1/2 top-1/2"
                      style={{
                        background: colors.tape,
                        transform: `translate(-50%, -50%) rotate(${idx * 60}deg) translateY(-80%)`,
                        transformOrigin: "center"
                      }}
                    />
                  ))}
                  {/* Center circle */}
                  <div 
                    className="absolute inset-[25%] rounded-full"
                    style={{ background: colors.body.includes("rgba") ? "rgba(255,255,255,0.1)" : "#222" }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Tape strip between spools */}
          <div 
            className="absolute top-[40%] left-[28%] right-[28%] h-[15%] rounded-sm"
            style={{ 
              background: colors.tape,
              boxShadow: "0 1px 3px rgba(0,0,0,0.3)"
            }}
          />
        </div>

        {/* Label area */}
        <div 
          className="absolute top-[58%] left-[10%] right-[10%] h-[32%] rounded-sm"
          style={{ 
            background: colors.label,
            border: "1px solid rgba(0,0,0,0.15)",
            boxShadow: "inset 0 1px 3px rgba(0,0,0,0.1)"
          }}
        >
          {[20, 40, 60, 80].map((top) => (
            <div 
              key={top}
              className="absolute left-[8%] right-[8%] h-[1.5px]" 
              style={{ top: `${top}%`, background: "rgba(0,0,0,0.1)" }} 
            />
          ))}
        </div>

        {/* Screws */}
        {[
          { top: "3%", left: "3%" },
          { top: "3%", right: "3%" },
          { bottom: "3%", left: "3%" },
          { bottom: "3%", right: "3%" }
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-[4%] aspect-square rounded-full flex items-center justify-center"
            style={{ 
              ...pos,
              background: colors.spools,
              boxShadow: "inset 0 1px 2px rgba(255,255,255,0.2)"
            }}
          >
            <div className="w-[70%] h-[1px] bg-black/40 rotate-45" />
          </div>
        ))}

        {/* Shine effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
};

export default CassetteTape;