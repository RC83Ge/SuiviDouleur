import React, { useState } from 'react';
import { BottomNav, NavTab } from '@/components/Navigation/BottomNav';
import { Header } from '@/components/Layout/Header';
import { Dashboard } from '@/components/Dashboard/Dashboard';
import { PainEntryForm } from '@/components/PainForm/PainEntryForm';
import { PainJournal } from '@/components/Journal/PainJournal';
import { BodyZoneSelector } from '@/components/BodyMap/BodyZoneSelector';
import { usePainStore } from '@/hooks/usePainStore';
import { toast } from 'sonner';

const Index = () => {
  const [activeTab, setActiveTab] = useState<NavTab>('home');
  const { entries, addEntry, deleteEntry, isLoading } = usePainStore();

  const getTitle = () => {
    switch (activeTab) {
      case 'home':
        return 'Suivi Douleur';
      case 'add':
        return 'Nouvel épisode';
      case 'journal':
        return 'Journal';
      default:
        return 'Suivi Douleur';
    }
  };

  const handleSaveEntry = (entry: Parameters<typeof addEntry>[0]) => {
    addEntry(entry);
    toast.success('Épisode enregistré', {
      description: 'Votre douleur a été enregistrée dans le journal.'
    });
    setActiveTab('journal');
  };

  const handleDeleteEntry = (id: string) => {
    deleteEntry(id);
    toast.success('Épisode supprimé');
  };

  const handleCancel = () => {
    setActiveTab('home');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Chargement...</p>
        </div>
      </div>);

  }

  return (
    <div className="min-h-screen bg-background pb-24 opacity-95 rounded-sm shadow-none">
      <Header title={getTitle()} />
      
      <main className="px-4 py-4 max-w-lg mx-auto">
        {activeTab === 'home' && <BodyZoneSelector />}
        
        {activeTab === 'add' &&
        <PainEntryForm
          onSave={handleSaveEntry}
          onCancel={handleCancel} />

        }
        
        {activeTab === 'journal' &&
        <PainJournal
          entries={entries}
          onDeleteEntry={handleDeleteEntry} />

        }
      </main>

      <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
    </div>);

};

export default Index;