import React, { useState, useEffect } from "react";
import { X, Type, MousePointer, AlignLeft, Zap, Palette, Sun, Moon, Languages, Disc } from "lucide-react";
import { Button } from "./ui/Button.tsx";

export const Settings = ({ isOpen, onClose }) => {
  const [settings, setSettings] = useState({
    biggerText: false,
    biggerCursor: false,
    lineHeight: "normal",
    stopAnimations: false,
    hideVinylEntirely: false,
    hideVinylArtistOnly: false,
    invertColors: false,
    brightness: 100,
    contrast: 100,
    language: "az",
    theme: "dark"
  });

  useEffect(() => {
    const saved = localStorage.getItem("userSettings");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setSettings(parsed);
        applySettings(parsed);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("userSettings", JSON.stringify(settings));
    applySettings(settings);
  }, [settings]);

  const applySettings = (s) => {
    const root = document.documentElement;

    root.style.fontSize = s.biggerText ? "120%" : "100%";

    if (s.biggerCursor) {
      root.classList.add("custom-cursor");
    } else {
      root.classList.remove("custom-cursor");
    }

    const lhMap = { normal: "1.5", relaxed: "1.8", loose: "2" };
    root.style.lineHeight = lhMap[s.lineHeight] || "1.5";

    if (s.stopAnimations) {
      root.classList.add("no-animations");
    } else {
      root.classList.remove("no-animations");
    }

    const invertVal = s.invertColors ? "invert(1) hue-rotate(180deg)" : "invert(0)";
    root.style.filter = `brightness(${s.brightness}%) contrast(${s.contrast}%) ${invertVal}`;

    if (s.theme === "light") {
      root.classList.add("light");
      root.classList.remove("dark");
    } else {
      root.classList.add("dark");
      root.classList.remove("light");
    }

    let vinylState = "none";
    if (s.hideVinylEntirely) {
      vinylState = "all";
    } else if (s.hideVinylArtistOnly) {
      vinylState = "artist";
    }

    root.setAttribute("data-hide-vinyl", vinylState);
    root.classList.toggle("vinyl-stop", s.stopAnimations);

    root.setAttribute("lang", s.language);
  };

  const resetSettings = () => {
    setSettings({
      biggerText: false,
      biggerCursor: false,
      lineHeight: "normal",
      stopAnimations: false,
      hideVinylEntirely: false,
      hideVinylArtistOnly: false,
      invertColors: false,
      brightness: 100,
      contrast: 100,
      language: "az",
      theme: "dark"
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
      <div className="bg-background border border-border w-full max-w-2xl max-h-[85vh] overflow-hidden shadow-2xl rounded-2xl flex flex-col">
        <div className="px-8 py-6 border-b border-border flex items-center justify-between bg-muted/30">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Parametrlər</h2>
            <p className="text-sm text-muted-foreground">Görünüşü və interfeysi fərdiləşdirin</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-muted rounded-full transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 overflow-y-auto space-y-10">
          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
              <Disc className="w-4 h-4" /> Vinyl Tənzimləmələri
            </h3>
            <div className="grid grid-cols-1 gap-3">
              <button
                onClick={() => setSettings(s => ({ ...s, hideVinylEntirely: !s.hideVinylEntirely }))}
                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${settings.hideVinylEntirely ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
              >
                <span className="font-semibold text-sm">Vinyl-ı tamamilə gizlə</span>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${settings.hideVinylEntirely ? "bg-primary" : "bg-muted"}`}>
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${settings.hideVinylEntirely ? "left-6" : "left-1"}`} />
                </div>
              </button>

              <button
                disabled={settings.hideVinylEntirely}
                onClick={() => setSettings(s => ({ ...s, hideVinylArtistOnly: !s.hideVinylArtistOnly }))}
                className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${settings.hideVinylArtistOnly ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"} ${settings.hideVinylEntirely ? "opacity-40 cursor-not-allowed" : ""}`}
              >
                <span className="font-semibold text-sm">Yalnız Artist səhifəsində gizlə</span>
                <div className={`w-10 h-5 rounded-full relative transition-colors ${settings.hideVinylArtistOnly ? "bg-primary" : "bg-muted"}`}>
                  <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${settings.hideVinylArtistOnly ? "left-6" : "left-1"}`} />
                </div>
              </button>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
              <Type className="w-4 h-4" /> Məzmun Görünüşü
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setSettings(s => ({ ...s, biggerText: !s.biggerText }))}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${settings.biggerText ? "border-primary bg-primary/5 shadow-inner" : "border-border hover:border-primary/50"}`}
              >
                <div className={`p-2 rounded-lg ${settings.biggerText ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  <Type className="w-6 h-6" />
                </div>
                <span className="font-semibold">Böyük Mətn</span>
              </button>

              <button
                onClick={() => setSettings(s => ({ ...s, biggerCursor: !s.biggerCursor }))}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${settings.biggerCursor ? "border-primary bg-primary/5 shadow-inner" : "border-border hover:border-primary/50"}`}
              >
                <div className={`p-2 rounded-lg ${settings.biggerCursor ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                  <MousePointer className="w-6 h-6" />
                </div>
                <span className="font-semibold">Böyük Kursor</span>
              </button>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">Sətir Hündürlüyü</label>
              <select
                value={settings.lineHeight}
                onChange={(e) => setSettings(s => ({ ...s, lineHeight: e.target.value }))}
                className="w-full p-3 rounded-lg bg-muted border border-border focus:ring-2 ring-primary outline-none"
              >
                <option value="normal">Normal</option>
                <option value="relaxed">Rahat</option>
                <option value="loose">Geniş</option>
              </select>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4" /> Effektlər və Rənglər
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setSettings(s => ({ ...s, stopAnimations: !s.stopAnimations }))}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${settings.stopAnimations ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
              >
                <Zap className={`w-6 h-6 ${settings.stopAnimations ? "text-primary" : "text-muted-foreground"}`} />
                <span className="font-semibold">Animasiyaları Dayandır</span>
              </button>

              <button
                onClick={() => setSettings(s => ({ ...s, invertColors: !s.invertColors }))}
                className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all ${settings.invertColors ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"}`}
              >
                <Palette className={`w-6 h-6 ${settings.invertColors ? "text-primary" : "text-muted-foreground"}`} />
                <span className="font-semibold">Rəngləri Çevir</span>
              </button>
            </div>

            <div className="mt-6 space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Parlaqlıq: {settings.brightness}%</label>
                </div>
                <input
                  type="range" min="50" max="150" value={settings.brightness}
                  onChange={(e) => setSettings(s => ({ ...s, brightness: parseInt(e.target.value) }))}
                  className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <label className="text-sm font-medium">Kontrast: {settings.contrast}%</label>
                </div>
                <input
                  type="range" min="50" max="150" value={settings.contrast}
                  onChange={(e) => setSettings(s => ({ ...s, contrast: parseInt(e.target.value) }))}
                  className="w-full h-1.5 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 flex items-center gap-2">
              <Languages className="w-4 h-4" /> Dil
            </h3>
            <select
              value={settings.language}
              onChange={(e) => setSettings(s => ({ ...s, language: e.target.value }))}
              className="w-full p-3 rounded-lg bg-muted border border-border focus:ring-2 ring-primary outline-none"
            >
              <option value="az">Azərbaycan</option>
              <option value="en">English</option>
              <option value="ru">Русский</option>
            </select>
          </section>

          <section>
            <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4">Görünüş Rejimi</h3>
            <div className="flex p-1 bg-muted rounded-xl gap-1">
              <button
                onClick={() => setSettings(s => ({ ...s, theme: 'dark' }))}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-all ${settings.theme === 'dark' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Moon className="w-4 h-4" /> Qaranlıq
              </button>
              <button
                onClick={() => setSettings(s => ({ ...s, theme: 'light' }))}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-all ${settings.theme === 'light' ? "bg-background shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                <Sun className="w-4 h-4" /> İşıqlı
              </button>
            </div>
          </section>
        </div>

        <div className="p-6 border-t border-border bg-muted/20">
          <Button onClick={resetSettings} variant="outline" className="w-full">
            Parametrləri Sıfırla
          </Button>
        </div>
      </div>
    </div>
  );
};