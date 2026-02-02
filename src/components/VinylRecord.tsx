import { cn } from "./lib/utils";

interface VinylRecordProps {
  size?: "sm" | "md" | "lg" | "xl";
  spinning?: boolean;
  className?: string;
  vinylColor?: "black" | "red" | "blue" | "purple" | "green" | "orange" | "pink" | "clear" | "white" | "yellow" | "brown";
}

const sizeClasses = {
  sm: "w-32 h-32",
  md: "w-48 h-48",
  lg: "w-64 h-64",
  xl: "w-96 h-96",
};

export const VinylRecord = ({
  size = "lg",
  spinning = false,
  className,
  vinylColor = "black"
}: VinylRecordProps) => {
  const getVinylColorStyle = () => {
    switch (vinylColor) {
      case "red":
        return "linear-gradient(to bottom right, #7f1d1d, #991b1b, #450a0a)";
      case "blue":
        return "linear-gradient(to bottom right, #1e3a8a, #1d4ed8, #1e40af)";
      case "purple":
        return "linear-gradient(to bottom right, #581c87, #7e22ce, #6b21a8)";
      case "green":
        return "linear-gradient(to bottom right, #14532d, #15803d, #166534)";
      case "orange":
        return "linear-gradient(to bottom right, #7c2d12, #c2410c, #9a3412)";
      case "pink":
        return "linear-gradient(to bottom right, #831843, #be185d, #9f1239)";
      case "clear":
        return "linear-gradient(to bottom right, rgba(228, 228, 231, 0.4), rgba(212, 212, 216, 0.3), rgba(228, 228, 231, 0.4))";
      case "white":
        return "linear-gradient(to bottom right, #f5f5f5, #ffffff, #e5e5e5)";
      case "yellow":
        return "linear-gradient(to bottom right, #854d0e, #ca8a04, #a16207)";
      case "brown":
        return "linear-gradient(to bottom right, #451a03, #78350f, #5c2b0f)";
      case "black":
      default:
        return "linear-gradient(to bottom right, #18181b, #27272a, #09090b)";
    }
  };

  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      {/* Vinyl disc */}
      <div
        className={cn(
          "absolute inset-0 rounded-full overflow-hidden",
          spinning && "animate-spin"
        )}
        style={{
          background: getVinylColorStyle()
        }}
      >
        {/* Groove rings */}
        <div className="absolute inset-0 rounded-full border-[1px] border-white/10" />
        <div className="absolute inset-[5%] rounded-full border-[1px] border-white/5" />
        <div className="absolute inset-[10%] rounded-full border-[1px] border-white/5" />
        <div className="absolute inset-[15%] rounded-full border-[1px] border-white/5" />
        <div className="absolute inset-[20%] rounded-full border-[1px] border-white/5" />

        {/* Center label area */}
        <div className="absolute inset-[30%] rounded-full bg-black/80 shadow-2xl border border-white/10" />

        {/* Center hole */}
        <div className="absolute inset-[45%] rounded-full bg-background shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)]" />

        {/* Shine effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/30 via-transparent to-transparent" />

        {/* Additional shine for clear vinyl */}
        {vinylColor === "clear" && (
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
        )}
      </div>
    </div>
  );
};

export default VinylRecord;