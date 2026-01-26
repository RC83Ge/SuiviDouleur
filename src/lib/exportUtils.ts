import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PainEntry, BODY_ZONE_LABELS, PAIN_TYPE_LABELS, PAIN_DURATION_LABELS, BodyZone } from '@/types/pain';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface MedicalSummary {
  totalEntries: number;
  dateRange: { start: Date; end: Date } | null;
  averageIntensity: number;
  maxIntensity: number;
  mostFrequentZones: { zone: BodyZone; count: number }[];
  mostFrequentPainTypes: { type: string; count: number }[];
  entriesPerWeek: number;
}

function calculateMedicalSummary(entries: PainEntry[]): MedicalSummary {
  if (entries.length === 0) {
    return {
      totalEntries: 0,
      dateRange: null,
      averageIntensity: 0,
      maxIntensity: 0,
      mostFrequentZones: [],
      mostFrequentPainTypes: [],
      entriesPerWeek: 0,
    };
  }

  const sortedByDate = [...entries].sort((a, b) => 
    new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  const dateRange = {
    start: new Date(sortedByDate[0].date),
    end: new Date(sortedByDate[sortedByDate.length - 1].date),
  };

  const totalIntensity = entries.reduce((sum, e) => sum + e.intensity, 0);
  const averageIntensity = Math.round((totalIntensity / entries.length) * 10) / 10;
  const maxIntensity = Math.max(...entries.map(e => e.intensity));

  // Count zones
  const zoneCounts: Record<string, number> = {};
  entries.forEach(entry => {
    entry.zones.forEach(zone => {
      zoneCounts[zone] = (zoneCounts[zone] || 0) + 1;
    });
  });
  const mostFrequentZones = Object.entries(zoneCounts)
    .map(([zone, count]) => ({ zone: zone as BodyZone, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Count pain types
  const typeCounts: Record<string, number> = {};
  entries.forEach(entry => {
    entry.painTypes.forEach(type => {
      typeCounts[type] = (typeCounts[type] || 0) + 1;
    });
  });
  const mostFrequentPainTypes = Object.entries(typeCounts)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  // Calculate entries per week
  const daysDiff = Math.max(1, Math.ceil(
    (dateRange.end.getTime() - dateRange.start.getTime()) / (1000 * 60 * 60 * 24)
  ));
  const weeksCount = Math.max(1, daysDiff / 7);
  const entriesPerWeek = Math.round((entries.length / weeksCount) * 10) / 10;

  return {
    totalEntries: entries.length,
    dateRange,
    averageIntensity,
    maxIntensity,
    mostFrequentZones,
    mostFrequentPainTypes,
    entriesPerWeek,
  };
}

export function exportToCSV(entries: PainEntry[]): void {
  const headers = [
    'Date',
    'Heure',
    'Zones',
    'Types de douleur',
    'Intensité',
    'Durée',
    'Facteurs déclenchants',
    'Facteurs de soulagement',
    'Notes',
  ];

  const rows = entries.map(entry => [
    format(new Date(entry.date), 'dd/MM/yyyy', { locale: fr }),
    format(new Date(entry.date), 'HH:mm', { locale: fr }),
    entry.zones.map(z => BODY_ZONE_LABELS[z]).join('; '),
    entry.painTypes.map(t => PAIN_TYPE_LABELS[t]).join('; '),
    entry.intensity.toString(),
    PAIN_DURATION_LABELS[entry.duration],
    entry.triggerFactors.join('; '),
    entry.reliefFactors.join('; '),
    entry.notes.replace(/"/g, '""'),
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(',')),
  ].join('\n');

  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `journal-douleur-${format(new Date(), 'yyyy-MM-dd')}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
}

export function exportToPDF(entries: PainEntry[]): void {
  const doc = new jsPDF();
  const summary = calculateMedicalSummary(entries);
  
  // Title
  doc.setFontSize(20);
  doc.setTextColor(33, 33, 33);
  doc.text('Journal de Suivi de la Douleur', 105, 20, { align: 'center' });
  
  // Subtitle with date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Généré le ${format(new Date(), "d MMMM yyyy 'à' HH:mm", { locale: fr })}`, 105, 28, { align: 'center' });
  
  // Disclaimer
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('Ce document est un outil de suivi personnel. Il ne constitue pas un diagnostic médical.', 105, 35, { align: 'center' });
  
  let yPosition = 45;

  // Medical Summary Section
  doc.setFontSize(14);
  doc.setTextColor(33, 33, 33);
  doc.text('Résumé Médical', 14, yPosition);
  yPosition += 8;

  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);

  if (summary.dateRange) {
    doc.text(`Période : du ${format(summary.dateRange.start, 'd MMMM yyyy', { locale: fr })} au ${format(summary.dateRange.end, 'd MMMM yyyy', { locale: fr })}`, 14, yPosition);
    yPosition += 6;
  }

  doc.text(`Nombre total d'épisodes : ${summary.totalEntries}`, 14, yPosition);
  yPosition += 6;
  doc.text(`Fréquence moyenne : ${summary.entriesPerWeek} épisodes/semaine`, 14, yPosition);
  yPosition += 6;
  doc.text(`Intensité moyenne : ${summary.averageIntensity}/10`, 14, yPosition);
  yPosition += 6;
  doc.text(`Intensité maximale : ${summary.maxIntensity}/10`, 14, yPosition);
  yPosition += 10;

  // Most frequent zones
  if (summary.mostFrequentZones.length > 0) {
    doc.setFontSize(11);
    doc.setTextColor(33, 33, 33);
    doc.text('Zones les plus touchées :', 14, yPosition);
    yPosition += 6;
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    summary.mostFrequentZones.forEach(({ zone, count }) => {
      doc.text(`• ${BODY_ZONE_LABELS[zone]} : ${count} occurrence${count > 1 ? 's' : ''}`, 18, yPosition);
      yPosition += 5;
    });
    yPosition += 5;
  }

  // Most frequent pain types
  if (summary.mostFrequentPainTypes.length > 0) {
    doc.setFontSize(11);
    doc.setTextColor(33, 33, 33);
    doc.text('Types de douleur les plus fréquents :', 14, yPosition);
    yPosition += 6;
    doc.setFontSize(10);
    doc.setTextColor(60, 60, 60);
    summary.mostFrequentPainTypes.forEach(({ type, count }) => {
      const label = PAIN_TYPE_LABELS[type as keyof typeof PAIN_TYPE_LABELS] || type;
      doc.text(`• ${label} : ${count} occurrence${count > 1 ? 's' : ''}`, 18, yPosition);
      yPosition += 5;
    });
    yPosition += 10;
  }

  // Detailed entries table
  doc.setFontSize(14);
  doc.setTextColor(33, 33, 33);
  doc.text('Détail des Épisodes', 14, yPosition);
  yPosition += 5;

  const tableData = entries.map(entry => [
    format(new Date(entry.date), 'dd/MM/yyyy HH:mm', { locale: fr }),
    entry.zones.map(z => BODY_ZONE_LABELS[z]).join(', '),
    entry.painTypes.map(t => PAIN_TYPE_LABELS[t]).join(', '),
    `${entry.intensity}/10`,
    PAIN_DURATION_LABELS[entry.duration],
    entry.notes.substring(0, 50) + (entry.notes.length > 50 ? '...' : ''),
  ]);

  autoTable(doc, {
    startY: yPosition,
    head: [['Date/Heure', 'Localisation', 'Type', 'Intensité', 'Durée', 'Notes']],
    body: tableData,
    headStyles: {
      fillColor: [79, 129, 189],
      textColor: 255,
      fontSize: 9,
    },
    bodyStyles: {
      fontSize: 8,
      textColor: [60, 60, 60],
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
    columnStyles: {
      0: { cellWidth: 30 },
      1: { cellWidth: 35 },
      2: { cellWidth: 30 },
      3: { cellWidth: 20 },
      4: { cellWidth: 25 },
      5: { cellWidth: 40 },
    },
    margin: { left: 14, right: 14 },
  });

  // Footer on each page
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      `Page ${i} sur ${pageCount}`,
      105,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }

  doc.save(`journal-douleur-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
}
