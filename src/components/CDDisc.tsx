import { cn } from "./lib/utils";

interface CDDiscProps {
  size?: "sm" | "md" | "lg" | "xl";
  spinning?: boolean;
  className?: string;
}

const sizeClasses = {
  sm: "w-32 h-32",
  md: "w-48 h-48",
  lg: "w-64 h-64",
  xl: "w-96 h-96",
};

export const CDDisc = ({
  size = "lg",
  spinning = false,
  className
}: CDDiscProps) => {
  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      {/* CD disc */}
      <div
        className={cn(
          "absolute inset-0 rounded-full overflow-hidden",
          spinning && "animate-spin"
        )}
        style={{
          background: "linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 25%, #ffffff 50%, #f0f0f0 75%, #e5e5e5 100%)"
        }}
      >
        {/* Rainbow reflection rings */}
        <div className="absolute inset-0 rounded-full opacity-60">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/30 via-blue-400/30 to-green-400/30" />
          <div className="absolute inset-[10%] rounded-full bg-gradient-to-br from-green-400/30 via-yellow-400/30 to-orange-400/30" />
          <div className="absolute inset-[20%] rounded-full bg-gradient-to-br from-orange-400/30 via-red-400/30 to-pink-400/30" />
          <div className="absolute inset-[30%] rounded-full bg-gradient-to-br from-pink-400/30 via-purple-400/30 to-blue-400/30" />
        </div>

        {/* Data track rings */}
        <div className="absolute inset-0 rounded-full border-[1px] border-gray-300/40" />
        <div className="absolute inset-[8%] rounded-full border-[1px] border-gray-300/30" />
        <div className="absolute inset-[16%] rounded-full border-[1px] border-gray-300/30" />
        <div className="absolute inset-[24%] rounded-full border-[1px] border-gray-300/30" />
        <div className="absolute inset-[32%] rounded-full border-[1px] border-gray-300/30" />

        {/* Center label area (silver/metallic) */}
        <div className="absolute inset-[40%] rounded-full bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 shadow-2xl border border-gray-300/50" />

        {/* Center hole */}
        <div className="absolute inset-[47%] rounded-full bg-background shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)]" />

        {/* Primary shine effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/60 via-transparent to-transparent" />

        {/* Secondary shine (top-right) */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-transparent via-white/30 to-transparent" />

        {/* Subtle radial shine */}
        <div className="absolute inset-[15%] rounded-full bg-gradient-to-br from-white/20 via-transparent to-transparent" />

        {/* CD holographic effect */}
        <div 
          className="absolute inset-0 rounded-full opacity-40"
          style={{
            background: "conic-gradient(from 0deg, transparent 0%, rgba(147, 51, 234, 0.3) 25%, transparent 50%, rgba(59, 130, 246, 0.3) 75%, transparent 100%)"
          }}
        />
      </div>
    </div>
  );
};

export default CDDisc;