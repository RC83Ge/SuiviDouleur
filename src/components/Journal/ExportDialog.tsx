import React from 'react';
import { PainEntry } from '@/types/pain';
import { exportToCSV, exportToPDF } from '@/lib/exportUtils';
import { FileText, FileSpreadsheet, X, Download, Share2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface ExportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entries: PainEntry[];
}

export function ExportDialog({ open, onOpenChange, entries }: ExportDialogProps) {
  const handleExportPDF = () => {
    exportToPDF(entries);
    onOpenChange(false);
  };

  const handleExportCSV = () => {
    exportToCSV(entries);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-primary" />
            Exporter le journal
          </DialogTitle>
          <DialogDescription>
            Exportez votre journal de douleur pour le partager avec un professionnel de santé.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-4">
          <button
            onClick={handleExportPDF}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors text-left"
          >
            <div className="w-12 h-12 rounded-lg bg-destructive/10 flex items-center justify-center">
              <FileText className="w-6 h-6 text-destructive" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Export PDF</h3>
              <p className="text-sm text-muted-foreground">
                Document formaté avec résumé médical
              </p>
            </div>
            <Download className="w-5 h-5 text-muted-foreground" />
          </button>

          <button
            onClick={handleExportCSV}
            className="w-full flex items-center gap-4 p-4 rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors text-left"
          >
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
              <FileSpreadsheet className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">Export CSV</h3>
              <p className="text-sm text-muted-foreground">
                Données brutes pour tableur (Excel)
              </p>
            </div>
            <Download className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="pt-2 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            {entries.length} épisode{entries.length > 1 ? 's' : ''} sera{entries.length > 1 ? 'ont' : ''} exporté{entries.length > 1 ? 's' : ''}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
