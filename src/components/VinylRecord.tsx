import { cn } from "./lib/utils";

interface VinylRecordProps {
  size?: "sm" | "md" | "lg" | "xl";
  spinning?: boolean;
  className?: string;
  albumArt?: string;
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
  albumArt 
}: VinylRecordProps) => {
  return (
    <div className={cn("relative", sizeClasses[size], className)}>
      {/* Vinyl disc */}
      <div 
        className={cn(
          "absolute inset-0 rounded-full groove-pattern",
          spinning && "vinyl-spin"
        )}
      >
        {/* Grooves effect */}
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
          <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-zinc-950 via-zinc-800 to-zinc-950">
            {/* Center label */}
            <div className="absolute inset-1/3 rounded-full bg-primary flex items-center justify-center overflow-hidden">
              {albumArt ? (
                <img 
                  src={albumArt} 
                  alt="Album art" 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-primary-foreground text-center">
                  <div className="text-xs font-bold tracking-wider">VINYL</div>
                </div>
              )}
            </div>
            {/* Center hole */}
            <div className="absolute inset-[45%] rounded-full bg-background" />
          </div>
        </div>
        {/* Shine effect */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent" />
      </div>
    </div>
  );
};
export default VinylRecord;