import { cn } from "./lib/utils";

interface CassetteTapeProps {
  size?: "sm" | "md" | "lg" | "xl";
  spinning?: boolean;
  className?: string;
  cassetteColor?: "black" | "white" | "clear" | "red" | "blue" | "green" | "purple" | "orange" | "pink" | "yellow";
}

const sizeClasses = {
<<<<<<< HEAD
<<<<<<< HEAD
  sm: "w-40 h-24",
  md: "w-56 h-36",
  lg: "w-80 h-48",
=======
  sm: "w-32 h-20",
  md: "w-48 h-30",
  lg: "w-64 h-40",
>>>>>>> d1ddc53 (Alpha Build)
=======
  sm: "w-40 h-24",
  md: "w-56 h-36",
  lg: "w-80 h-48",
>>>>>>> baab95a (Alpha Build)
  xl: "w-96 h-60",
};

export const CassetteTape = ({
  size = "lg",
  spinning = false,
  className,
  cassetteColor = "black"
}: CassetteTapeProps) => {
  const getCassetteColorStyle = () => {
    switch(cassetteColor) {
      case "white":
        return {
<<<<<<< HEAD
<<<<<<< HEAD
          body: "linear-gradient(135deg, #fafafa 0%, #ffffff 50%, #f5f5f5 100%)",
          label: "#ffffff",
          spools: "#2a2a2a",
          tape: "#1a1a1a"
        };
      case "clear":
        return {
          body: "linear-gradient(135deg, rgba(245, 245, 245, 0.4), rgba(255, 255, 255, 0.3))",
          label: "rgba(255, 255, 255, 0.8)",
          spools: "#3a3a3a",
          tape: "#2a2a2a"
        };
      case "red":
        return {
          body: "linear-gradient(135deg, #dc2626, #ef4444, #dc2626)",
          label: "#fecaca",
          spools: "#450a0a",
          tape: "#7f1d1d"
        };
      case "blue":
        return {
          body: "linear-gradient(135deg, #2563eb, #3b82f6, #2563eb)",
          label: "#bfdbfe",
          spools: "#1e3a8a",
          tape: "#1e40af"
        };
      case "green":
        return {
          body: "linear-gradient(135deg, #16a34a, #22c55e, #16a34a)",
          label: "#bbf7d0",
          spools: "#14532d",
          tape: "#166534"
        };
      case "purple":
        return {
          body: "linear-gradient(135deg, #9333ea, #a855f7, #9333ea)",
          label: "#e9d5ff",
          spools: "#581c87",
          tape: "#6b21a8"
        };
      case "orange":
        return {
          body: "linear-gradient(135deg, #ea580c, #f97316, #ea580c)",
          label: "#fed7aa",
          spools: "#7c2d12",
          tape: "#9a3412"
        };
      case "pink":
        return {
          body: "linear-gradient(135deg, #db2777, #ec4899, #db2777)",
          label: "#fce7f3",
          spools: "#831843",
          tape: "#9f1239"
        };
      case "yellow":
        return {
          body: "linear-gradient(135deg, #ca8a04, #eab308, #ca8a04)",
          label: "#fef9c3",
          spools: "#713f12",
          tape: "#854d0e"
=======
          body: "linear-gradient(to bottom, #f5f5f5, #ffffff, #e5e5e5)",
=======
          body: "linear-gradient(135deg, #fafafa 0%, #ffffff 50%, #f5f5f5 100%)",
>>>>>>> baab95a (Alpha Build)
          label: "#ffffff",
          spools: "#2a2a2a",
          tape: "#1a1a1a"
        };
      case "clear":
        return {
          body: "linear-gradient(135deg, rgba(245, 245, 245, 0.4), rgba(255, 255, 255, 0.3))",
          label: "rgba(255, 255, 255, 0.8)",
          spools: "#3a3a3a",
          tape: "#2a2a2a"
        };
      case "red":
        return {
          body: "linear-gradient(135deg, #dc2626, #ef4444, #dc2626)",
          label: "#fecaca",
          spools: "#450a0a",
          tape: "#7f1d1d"
        };
      case "blue":
        return {
          body: "linear-gradient(135deg, #2563eb, #3b82f6, #2563eb)",
          label: "#bfdbfe",
          spools: "#1e3a8a",
          tape: "#1e40af"
        };
      case "green":
        return {
          body: "linear-gradient(135deg, #16a34a, #22c55e, #16a34a)",
          label: "#bbf7d0",
          spools: "#14532d",
          tape: "#166534"
        };
      case "purple":
        return {
          body: "linear-gradient(135deg, #9333ea, #a855f7, #9333ea)",
          label: "#e9d5ff",
          spools: "#581c87",
          tape: "#6b21a8"
        };
      case "orange":
        return {
          body: "linear-gradient(135deg, #ea580c, #f97316, #ea580c)",
          label: "#fed7aa",
          spools: "#7c2d12",
          tape: "#9a3412"
        };
      case "pink":
        return {
          body: "linear-gradient(135deg, #db2777, #ec4899, #db2777)",
          label: "#fce7f3",
          spools: "#831843",
          tape: "#9f1239"
        };
      case "yellow":
        return {
<<<<<<< HEAD
          body: "linear-gradient(to bottom, #a16207, #eab308)",
          label: "#fef08a",
          spools: "#854d0e"
>>>>>>> d1ddc53 (Alpha Build)
=======
          body: "linear-gradient(135deg, #ca8a04, #eab308, #ca8a04)",
          label: "#fef9c3",
          spools: "#713f12",
          tape: "#854d0e"
>>>>>>> baab95a (Alpha Build)
        };
      case "black":
      default:
        return {
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> baab95a (Alpha Build)
          body: "linear-gradient(135deg, #18181b, #27272a, #18181b)",
          label: "#71717a",
          spools: "#09090b",
          tape: "#3f3f46"
<<<<<<< HEAD
=======
          body: "linear-gradient(to bottom, #18181b, #27272a, #18181b)",
          label: "#52525b",
          spools: "#09090b"
>>>>>>> d1ddc53 (Alpha Build)
=======
>>>>>>> baab95a (Alpha Build)
        };
    }
  };

  const colors = getCassetteColorStyle();

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      {/* Cassette body */}
      <div 
<<<<<<< HEAD
<<<<<<< HEAD
        className="absolute inset-0 rounded-md overflow-hidden shadow-2xl"
        style={{ 
          background: colors.body,
          border: cassetteColor === "white" ? "2px solid #e5e5e5" : "2px solid rgba(0,0,0,0.2)"
        }}
      >
        {/* Window/Viewing area (top section) */}
        <div 
          className="absolute top-[8%] left-[8%] right-[8%] h-[45%] rounded-sm"
          style={{ 
            background: cassetteColor === "clear" 
              ? "linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.05))"
              : "rgba(0, 0, 0, 0.15)",
            border: "1px solid rgba(0,0,0,0.1)"
          }}
        >
          {/* Left spool */}
          <div className="absolute top-[18%] left-[15%] w-[25%] aspect-square">
=======
        className="absolute inset-0 rounded-lg overflow-hidden shadow-2xl"
=======
        className="absolute inset-0 rounded-md overflow-hidden shadow-2xl"
>>>>>>> baab95a (Alpha Build)
        style={{ 
          background: colors.body,
          border: cassetteColor === "white" ? "2px solid #e5e5e5" : "2px solid rgba(0,0,0,0.2)"
        }}
      >
        {/* Window/Viewing area (top section) */}
        <div 
          className="absolute top-[8%] left-[8%] right-[8%] h-[45%] rounded-sm"
          style={{ 
            background: cassetteColor === "clear" 
              ? "linear-gradient(135deg, rgba(0,0,0,0.1), rgba(0,0,0,0.05))"
              : "rgba(0, 0, 0, 0.15)",
            border: "1px solid rgba(0,0,0,0.1)"
          }}
        >
          {/* Left spool */}
<<<<<<< HEAD
          <div className="relative w-[28%] aspect-square">
>>>>>>> d1ddc53 (Alpha Build)
=======
          <div className="absolute top-[18%] left-[15%] w-[25%] aspect-square">
>>>>>>> baab95a (Alpha Build)
            <div 
              className={cn(
                "absolute inset-0 rounded-full",
                spinning && "animate-spin"
              )}
              style={{ 
<<<<<<< HEAD
<<<<<<< HEAD
                background: colors.spools,
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3)"
              }}
            >
              {/* Spool teeth */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-[15%] h-[60%] left-1/2 top-1/2"
                  style={{
                    background: colors.tape,
                    transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-80%)`,
                    transformOrigin: "center"
                  }}
                />
              ))}
              {/* Center circle */}
              <div 
                className="absolute inset-[25%] rounded-full"
                style={{ background: colors.body }}
              />
            </div>
          </div>

          {/* Right spool */}
          <div className="absolute top-[18%] right-[15%] w-[25%] aspect-square">
=======
                background: `conic-gradient(from 0deg, ${colors.spools} 0%, ${colors.spools} 45%, transparent 45%, transparent 55%, ${colors.spools} 55%, ${colors.spools} 100%)`
=======
                background: colors.spools,
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3)"
>>>>>>> baab95a (Alpha Build)
              }}
            >
              {/* Spool teeth */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-[15%] h-[60%] left-1/2 top-1/2"
                  style={{
                    background: colors.tape,
                    transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-80%)`,
                    transformOrigin: "center"
                  }}
                />
              ))}
              {/* Center circle */}
              <div 
                className="absolute inset-[25%] rounded-full"
                style={{ background: colors.body }}
              />
            </div>
          </div>

          {/* Right spool */}
<<<<<<< HEAD
          <div className="relative w-[28%] aspect-square">
>>>>>>> d1ddc53 (Alpha Build)
=======
          <div className="absolute top-[18%] right-[15%] w-[25%] aspect-square">
>>>>>>> baab95a (Alpha Build)
            <div 
              className={cn(
                "absolute inset-0 rounded-full",
                spinning && "animate-spin"
              )}
              style={{ 
<<<<<<< HEAD
<<<<<<< HEAD
                background: colors.spools,
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3)"
              }}
            >
              {/* Spool teeth */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-[15%] h-[60%] left-1/2 top-1/2"
                  style={{
                    background: colors.tape,
                    transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-80%)`,
                    transformOrigin: "center"
                  }}
                />
              ))}
              {/* Center circle */}
              <div 
                className="absolute inset-[25%] rounded-full"
                style={{ background: colors.body }}
              />
            </div>
          </div>

          {/* Tape between spools */}
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
          {/* Label lines */}
          <div className="absolute top-[20%] left-[8%] right-[8%] h-[1.5px]" 
            style={{ background: "rgba(0,0,0,0.2)" }} 
          />
          <div className="absolute top-[40%] left-[8%] right-[8%] h-[1.5px]" 
            style={{ background: "rgba(0,0,0,0.2)" }} 
          />
          <div className="absolute top-[60%] left-[8%] right-[8%] h-[1.5px]" 
            style={{ background: "rgba(0,0,0,0.2)" }} 
          />
          <div className="absolute top-[80%] left-[8%] right-[8%] h-[1.5px]" 
            style={{ background: "rgba(0,0,0,0.2)" }} 
          />
        </div>

        {/* Corner screws */}
        {[
          { top: "3%", left: "3%" },
          { top: "3%", right: "3%" },
          { bottom: "3%", left: "3%" },
          { bottom: "3%", right: "3%" }
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-[5%] aspect-square rounded-full"
            style={{ 
              ...pos,
              background: colors.spools,
              border: "1px solid rgba(0,0,0,0.3)",
              boxShadow: "inset 0 1px 2px rgba(255,255,255,0.2)"
            }}
          >
            {/* Screw slot */}
            <div 
              className="absolute inset-[35%]"
              style={{ 
                borderTop: "1.5px solid rgba(0,0,0,0.5)",
                borderBottom: "1.5px solid rgba(0,0,0,0.5)",
                transform: "rotate(45deg)"
              }}
            />
          </div>
        ))}

        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none rounded-md" />
        
        {/* Additional shine for clear */}
        {cassetteColor === "clear" && (
          <div className="absolute inset-0 bg-gradient-to-tl from-white/20 via-transparent to-transparent pointer-events-none rounded-md" />
        )}
=======
                background: `conic-gradient(from 0deg, ${colors.spools} 0%, ${colors.spools} 45%, transparent 45%, transparent 55%, ${colors.spools} 55%, ${colors.spools} 100%)`
=======
                background: colors.spools,
                boxShadow: "inset 0 2px 4px rgba(0,0,0,0.3)"
>>>>>>> baab95a (Alpha Build)
              }}
            >
              {/* Spool teeth */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-[15%] h-[60%] left-1/2 top-1/2"
                  style={{
                    background: colors.tape,
                    transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-80%)`,
                    transformOrigin: "center"
                  }}
                />
              ))}
              {/* Center circle */}
              <div 
                className="absolute inset-[25%] rounded-full"
                style={{ background: colors.body }}
              />
            </div>
          </div>

          {/* Tape between spools */}
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
          {/* Label lines */}
          <div className="absolute top-[20%] left-[8%] right-[8%] h-[1.5px]" 
            style={{ background: "rgba(0,0,0,0.2)" }} 
          />
          <div className="absolute top-[40%] left-[8%] right-[8%] h-[1.5px]" 
            style={{ background: "rgba(0,0,0,0.2)" }} 
          />
          <div className="absolute top-[60%] left-[8%] right-[8%] h-[1.5px]" 
            style={{ background: "rgba(0,0,0,0.2)" }} 
          />
          <div className="absolute top-[80%] left-[8%] right-[8%] h-[1.5px]" 
            style={{ background: "rgba(0,0,0,0.2)" }} 
          />
        </div>

        {/* Corner screws */}
        {[
          { top: "3%", left: "3%" },
          { top: "3%", right: "3%" },
          { bottom: "3%", left: "3%" },
          { bottom: "3%", right: "3%" }
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute w-[5%] aspect-square rounded-full"
            style={{ 
              ...pos,
              background: colors.spools,
              border: "1px solid rgba(0,0,0,0.3)",
              boxShadow: "inset 0 1px 2px rgba(255,255,255,0.2)"
            }}
          >
            {/* Screw slot */}
            <div 
              className="absolute inset-[35%]"
              style={{ 
                borderTop: "1.5px solid rgba(0,0,0,0.5)",
                borderBottom: "1.5px solid rgba(0,0,0,0.5)",
                transform: "rotate(45deg)"
              }}
            />
          </div>
        ))}

        {/* Shine effect */}
<<<<<<< HEAD
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent pointer-events-none" />
>>>>>>> d1ddc53 (Alpha Build)
=======
        <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none rounded-md" />
        
        {/* Additional shine for clear */}
        {cassetteColor === "clear" && (
          <div className="absolute inset-0 bg-gradient-to-tl from-white/20 via-transparent to-transparent pointer-events-none rounded-md" />
        )}
>>>>>>> baab95a (Alpha Build)
      </div>
    </div>
  );
};

export default CassetteTape;