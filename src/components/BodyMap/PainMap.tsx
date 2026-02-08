import React, { useState } from 'react';
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
  const [selectedPointId, setSelectedPointId] = useState<string | null>(null);

  // Use external or internal state
  const view = externalView ?? internalView;
  const setView = onViewChange ?? setInternalView;
  const painPoints = externalPainPoints ?? internalPainPoints;
  const setPainPoints = onPainPointsChange ?? setInternalPainPoints;

  // GESTION DU CLIC - Attaché uniquement sur le conteneur parent
  const handleContainerClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Utilise event.currentTarget pour obtenir le conteneur parent
    const rect = event.currentTarget.getBoundingClientRect();

    // Calcul des coordonnées en pourcentage
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;

    // Créer un nouveau point
    const newPoint: PainPoint = {
      id: `pain-${Date.now()}`,
      x,
      y,
      intensity: 5,
    };

    setPainPoints([...painPoints, newPoint]);
    setSelectedPointId(null);
  };

  const handleRemovePoint = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPainPoints(painPoints.filter((p) => p.id !== id));
    if (selectedPointId === id) setSelectedPointId(null);
  };

  const handlePointInteraction = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedPointId(selectedPointId === id ? null : id);
  };

  const handleIntensityChange = (id: string, intensity: number) => {
    setPainPoints(painPoints.map((p) => (p.id === id ? { ...p, intensity } : p)));
  };

  const clearAllPoints = () => {
    setPainPoints([]);
    setSelectedPointId(null);
  };

  const bodyImage = view === 'front' ? bodyFront : bodyBack;

  // Couleur basée sur l'intensité
  const getPointColor = (intensity: number): string => {
    const colors = [
      'rgba(34, 197, 94, 0.7)',   // 1 - vert
      'rgba(74, 222, 128, 0.7)',  // 2
      'rgba(163, 230, 53, 0.7)',  // 3
      'rgba(250, 204, 21, 0.7)',  // 4 - jaune
      'rgba(251, 146, 60, 0.7)',  // 5 - orange
      'rgba(249, 115, 22, 0.7)',  // 6
      'rgba(239, 68, 68, 0.7)',   // 7 - rouge
      'rgba(220, 38, 38, 0.75)',  // 8
      'rgba(185, 28, 28, 0.8)',   // 9
      'rgba(127, 29, 29, 0.85)',  // 10 - rouge foncé
    ];
    return colors[Math.min(Math.max(intensity - 1, 0), 9)];
  };

  const getGlowColor = (intensity: number): string => {
    if (intensity <= 3) return 'rgba(34, 197, 94, 0.5)';
    if (intensity <= 5) return 'rgba(251, 146, 60, 0.5)';
    if (intensity <= 7) return 'rgba(239, 68, 68, 0.5)';
    return 'rgba(185, 28, 28, 0.6)';
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Header controls */}
      <div className="flex items-center justify-between">
        {/* View toggle */}
        <div className="flex bg-muted rounded-lg p-1">
          <button
            type="button"
            onClick={() => setView('front')}
            className={cn(
              'px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200',
              view === 'front'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            Face
          </button>
          <button
            type="button"
            onClick={() => setView('back')}
            className={cn(
              'px-3 py-1.5 text-xs font-medium rounded-md transition-all duration-200',
              view === 'back'
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
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

      {/* 
        CONTENEUR PARENT - position: relative
        C'est ici qu'on attache le onClick, PAS sur l'image
      */}
      <div
        onClick={handleContainerClick}
        className="relative mx-auto cursor-crosshair rounded-2xl bg-gradient-to-b from-muted/30 to-muted/10 overflow-hidden"
        style={{ width: 'fit-content' }}
      >
        {/* 
          IMAGE DU CORPS
          - width: 100%, display: block pour éviter les espaces fantômes
          - pointer-events: none pour que les clics passent au conteneur
        */}
        <img
          src={bodyImage}
          alt={`Corps humain - vue ${view === 'front' ? 'de face' : 'de dos'}`}
          draggable={false}
          style={{
            display: 'block',
            width: '100%',
            maxHeight: '500px',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />

        {/* RENDU DES BOULES DE DOULEUR */}
        {painPoints.map((point) => (
          <div
            key={point.id}
            className="group"
            style={{
              // Position absolue dans le conteneur parent
              position: 'absolute',
              left: `${point.x}%`,
              top: `${point.y}%`,
              // CRUCIAL: translate(-50%, -50%) pour centrer la boule sur le point exact
              transform: 'translate(-50%, -50%)',
              // pointer-events: auto pour permettre l'interaction avec cette boule
              pointerEvents: 'auto',
            }}
          >
            {/* Animation ping externe */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: `radial-gradient(circle, ${getPointColor(point.intensity)} 0%, transparent 70%)`,
                animation: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
                pointerEvents: 'none',
              }}
            />

            {/* Anneau de glow pulsant */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '54px',
                height: '54px',
                borderRadius: '50%',
                background: `radial-gradient(circle, transparent 35%, ${getGlowColor(point.intensity)} 55%, transparent 70%)`,
                animation: 'pulse 2s ease-in-out infinite',
                pointerEvents: 'none',
              }}
            />

            {/* Marqueur principal avec dégradé thermique */}
            <div
              onClick={(e) => handlePointInteraction(point.id, e)}
              style={{
                position: 'relative',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: `radial-gradient(circle at 35% 35%, 
                  ${getPointColor(point.intensity).replace('0.7', '1')} 0%, 
                  ${getPointColor(point.intensity)} 50%, 
                  transparent 75%)`,
                boxShadow: `0 0 16px ${getGlowColor(point.intensity)}, 
                            0 0 32px ${getGlowColor(point.intensity).replace('0.5', '0.25')}`,
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.15)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />

            {/* Bouton de suppression au survol */}
            <button
              type="button"
              onClick={(e) => handleRemovePoint(point.id, e)}
              className="absolute opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center bg-destructive text-destructive-foreground rounded-full hover:scale-110"
              style={{
                width: '18px',
                height: '18px',
                top: '-6px',
                right: '-6px',
              }}
            >
              <X className="w-3 h-3" />
            </button>

            {/* Sélecteur d'intensité au clic */}
            {selectedPointId === point.id && (
              <div
                onClick={(e) => e.stopPropagation()}
                className="absolute z-20 bg-popover border border-border rounded-xl p-3 shadow-lg animate-in fade-in-0 zoom-in-95"
                style={{
                  top: '36px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  minWidth: '160px',
                }}
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
                      hsl(120, 60%, 50%) 0%, 
                      hsl(60, 70%, 50%) 30%,
                      hsl(30, 80%, 50%) 60%,
                      hsl(0, 70%, 45%) 100%)`,
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

        {/* Instructions si aucun point */}
        {painPoints.length === 0 && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ pointerEvents: 'none' }}
          >
            <div className="bg-background/80 backdrop-blur-sm rounded-xl px-4 py-3 border border-border/50 shadow-lg">
              <p className="text-sm text-muted-foreground text-center">
                Cliquez sur le corps pour ajouter un point de douleur
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Résumé des points */}
      {painPoints.length > 0 && (
        <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-muted">
            {painPoints.length} point{painPoints.length > 1 ? 's' : ''} de douleur
          </span>
        </div>
      )}

      {/* Keyframes pour les animations */}
      <style>{`
        @keyframes ping {
          75%, 100% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 0;
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
