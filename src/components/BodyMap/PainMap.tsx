import React, { useState, useRef } from 'react';
import { BodyView } from '@/types/pain';
import { cn } from '@/lib/utils';
import bodyFront from '@/assets/body-front.png';
import bodyBack from '@/assets/body-back.png';
import { X, Trash2 } from 'lucide-react';

interface PainPoint {
  id: string;
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  intensity: number; // 1-10
}

interface PainMapProps {
  view?: BodyView;
  onViewChange?: (view: BodyView) => void;
  painPoints?: PainPoint[];
  onPainPointsChange?: (points: PainPoint[]) => void;
  className?: string;
}

export function PainMap({
  view: externalView,
  onViewChange,
  painPoints: externalPainPoints,
  onPainPointsChange,
  className,
}: PainMapProps) {
  // Internal state fallback
  const [internalView, setInternalView] = useState<BodyView>('front');
  const [internalPainPoints, setInternalPainPoints] = useState<PainPoint[]>([]);
  
  // Use external or internal state
  const view = externalView ?? internalView;
  const setView = onViewChange ?? setInternalView;
  const painPoints = externalPainPoints ?? internalPainPoints;
  const setPainPoints = onPainPointsChange ?? setInternalPainPoints;

  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    // Ignore clicks on existing points
    if ((e.target as HTMLElement).closest('.pain-point')) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const newPoint: PainPoint = {
      id: `pain-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      x,
      y,
      intensity: 5, // Default intensity
    };

    setPainPoints([...painPoints, newPoint]);
  };

  const handleRemovePoint = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPainPoints(painPoints.filter(p => p.id !== id));
    setSelectedPoint(null);
  };

  const handlePointClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPoint(selectedPoint === id ? null : id);
  };

  const handleIntensityChange = (id: string, intensity: number) => {
    setPainPoints(painPoints.map(p => 
      p.id === id ? { ...p, intensity } : p
    ));
  };

  const clearAllPoints = () => {
    setPainPoints([]);
    setSelectedPoint(null);
  };

  const bodyImage = view === 'front' ? bodyFront : bodyBack;

  // Get color based on intensity
  const getPointColor = (intensity: number) => {
    const colors = [
      'rgba(34, 197, 94, 0.6)',   // 1 - green
      'rgba(74, 222, 128, 0.6)',  // 2
      'rgba(163, 230, 53, 0.6)',  // 3 - lime
      'rgba(250, 204, 21, 0.6)',  // 4 - yellow
      'rgba(251, 146, 60, 0.6)',  // 5 - orange
      'rgba(249, 115, 22, 0.6)',  // 6
      'rgba(239, 68, 68, 0.6)',   // 7 - red
      'rgba(220, 38, 38, 0.6)',   // 8
      'rgba(185, 28, 28, 0.7)',   // 9
      'rgba(127, 29, 29, 0.8)',   // 10 - dark red
    ];
    return colors[Math.min(intensity - 1, 9)];
  };

  const getGlowColor = (intensity: number) => {
    if (intensity <= 3) return 'rgba(34, 197, 94, 0.4)';
    if (intensity <= 5) return 'rgba(251, 146, 60, 0.4)';
    if (intensity <= 7) return 'rgba(239, 68, 68, 0.4)';
    return 'rgba(185, 28, 28, 0.5)';
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header controls */}
      <div className="flex items-center justify-between">
        {/* View toggle */}
        <div className="flex bg-muted rounded-lg p-1">
          <button
            type="button"
            onClick={() => setView('front')}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
              view === 'front' 
                ? "bg-background text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Face
          </button>
          <button
            type="button"
            onClick={() => setView('back')}
            className={cn(
              "px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200",
              view === 'back' 
                ? "bg-background text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            Dos
          </button>
        </div>

        {/* Clear all button */}
        {painPoints.length > 0 && (
          <button
            type="button"
            onClick={clearAllPoints}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-destructive bg-muted/50 hover:bg-destructive/10 rounded-lg transition-all duration-200"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Tout effacer
          </button>
        )}
      </div>

      {/* Pain map container */}
      <div 
        ref={containerRef}
        onClick={handleContainerClick}
        className="relative w-full aspect-[608/1080] max-h-[500px] mx-auto cursor-crosshair select-none overflow-hidden rounded-2xl bg-gradient-to-b from-muted/30 to-muted/10"
        style={{ touchAction: 'manipulation' }}
      >
        {/* Body image */}
        <img
          src={bodyImage}
          alt={`Corps humain - vue ${view === 'front' ? 'de face' : 'de dos'}`}
          className="w-full h-full object-contain pointer-events-none"
          draggable={false}
        />

        {/* Pain points */}
        {painPoints.map((point) => (
          <div
            key={point.id}
            className="pain-point absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
              top: `${point.y}%`,
              left: `${point.x}%`,
            }}
            onClick={(e) => handlePointClick(point.id, e)}
          >
            {/* Outer ping animation */}
            <div 
              className="absolute inset-0 rounded-full animate-ping"
              style={{
                width: '40px',
                height: '40px',
                marginLeft: '-20px',
                marginTop: '-20px',
                background: `radial-gradient(circle, ${getPointColor(point.intensity)} 0%, transparent 70%)`,
                animationDuration: '1.5s',
              }}
            />
            
            {/* Pulsing glow ring */}
            <div 
              className="absolute rounded-full animate-pulse"
              style={{
                width: '50px',
                height: '50px',
                marginLeft: '-25px',
                marginTop: '-25px',
                background: `radial-gradient(circle, transparent 40%, ${getGlowColor(point.intensity)} 60%, transparent 70%)`,
                animationDuration: '2s',
              }}
            />

            {/* Main pain marker with thermal gradient */}
            <div 
              className="relative rounded-full transition-transform duration-200 hover:scale-110"
              style={{
                width: '30px',
                height: '30px',
                marginLeft: '-15px',
                marginTop: '-15px',
                background: `radial-gradient(circle at 40% 40%, 
                  ${getPointColor(point.intensity).replace('0.6', '0.9')} 0%, 
                  ${getPointColor(point.intensity)} 40%, 
                  transparent 70%)`,
                boxShadow: `0 0 20px ${getGlowColor(point.intensity)}, 
                           0 0 40px ${getGlowColor(point.intensity).replace('0.4', '0.2')}`,
              }}
            />

            {/* Remove button on hover */}
            <button
              type="button"
              onClick={(e) => handleRemovePoint(point.id, e)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:scale-110"
              style={{ marginLeft: '10px', marginTop: '-25px' }}
            >
              <X className="w-3 h-3" />
            </button>

            {/* Intensity selector on click */}
            {selectedPoint === point.id && (
              <div 
                className="absolute z-10 bg-popover border border-border rounded-xl p-3 shadow-lg animate-in fade-in-0 zoom-in-95"
                style={{ 
                  top: '40px', 
                  left: '50%', 
                  transform: 'translateX(-50%)',
                  minWidth: '180px'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-xs font-medium text-foreground mb-2">
                  Intensité: {point.intensity}/10
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={point.intensity}
                  onChange={(e) => handleIntensityChange(point.id, parseInt(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, 
                      hsl(var(--pain-0)) 0%, 
                      hsl(var(--pain-5)) 50%, 
                      hsl(var(--pain-10)) 100%)`
                  }}
                />
                <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
                  <span>Faible</span>
                  <span>Sévère</span>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* Instructions overlay when empty */}
        {painPoints.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-background/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-border/50 shadow-lg">
              <p className="text-sm text-muted-foreground text-center">
                Cliquez sur le corps pour ajouter un point de douleur
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Points summary */}
      {painPoints.length > 0 && (
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted">
            {painPoints.length} point{painPoints.length > 1 ? 's' : ''} de douleur
          </span>
        </div>
      )}
    </div>
  );
}
