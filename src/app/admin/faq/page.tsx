"use client";

import { useEffect, useState } from "react";
import { getFAQs, createFAQ, updateFAQ, deleteFAQ } from "../actions";
import { Plus, Trash2, Loader2, ArrowLeft, X } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { ConfirmModal } from "@/components/admin/ConfirmModal";

export default function AdminFAQPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [currentView, setCurrentView] = useState<'list' | 'edit'>('list');
  const [editingItem, setEditingItem] = useState<any | null>(null);
  
  const [modalConfig, setModalConfig] = useState<{isOpen: boolean; title: string; message: string; onConfirm: () => void}>({
    isOpen: false, title: '', message: '', onConfirm: () => {}
  });
  
  const [formData, setFormData] = useState<any>({ question: '', answer: '', category: 'general', order: 0 });

  useEffect(() => {
    async function fetchData() {
      const isMissingEnv = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");
      if (isMissingEnv) {
        setItems([]);
        setLoading(false);
        return;
      }
      try {
        const data = await getFAQs();
        if (data && data.length > 0) setItems(data);
      } catch (err) {
        console.error("Error loading:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const openCreateView = () => {
    setEditingItem(null);
    setFormData({ question: '', answer: '', category: 'general', order: 0 });
    setCurrentView('edit');
  };

  const openEditView = (item: any) => {
    setEditingItem(item);
    setFormData(item);
    setCurrentView('edit');
  };

  const closeView = () => setCurrentView('list');

  const requestDelete = (id: string) => {
    setModalConfig({
      isOpen: true,
      title: "Delete FAQ",
      message: "Are you sure you want to delete this FAQ?",
      onConfirm: () => handleDelete(id)
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteFAQ(id);
      setItems(items.filter((i: any) => i.id !== id));
      if (editingItem?.id === id) closeView();
      setModalConfig(prev => ({ ...prev, isOpen: false }));
    } catch (err) {
      console.error(err);
      alert("Failed to delete.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateFAQ(editingItem.id, formData);
      } else {
        await createFAQ(formData);
      }
      const data = await getFAQs();
      if (data) setItems(data);
      closeView();
    } catch (err) {
      console.error(err);
      alert("Failed to save.");
    }
  };

  if (loading) {
    return <div className="flex h-[calc(100vh-64px)] items-center justify-center"><Loader2 className="animate-spin text-stone-400" size={32} /></div>;
  }

  if (currentView === 'edit') {
    return (
      <div className="max-w-3xl mx-auto space-y-6 pb-20 p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button onClick={closeView} className="p-1.5 text-stone-500 hover:bg-stone-200 dark:hover:bg-stone-800 rounded-md transition-colors"><ArrowLeft size={20} /></button>
            <h2 className="text-2xl font-serif text-stone-900 dark:text-white">{editingItem ? "Edit" : "New"} FAQ</h2>
          </div>
          <div className="flex items-center gap-3">
            {editingItem && <button type="button" onClick={() => requestDelete(editingItem.id)} className="px-4 py-2 rounded-md text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">Delete</button>}
            <button onClick={handleSubmit} className="bg-stone-900 dark:bg-white text-white dark:text-stone-900 px-6 py-2 rounded-md text-sm font-medium hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors">Save</button>
          </div>
        </div>
        <div className="bg-white dark:bg-[#111] p-8 border border-stone-200 dark:border-stone-800 rounded-xl space-y-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Question</label>
              <input type="text" value={formData.question || ""} onChange={e => setFormData({...formData, question: e.target.value})} className="w-full bg-stone-50 dark:bg-[#0a0a0a] border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-stone-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Category</label>
              <input type="text" value={formData.category || ""} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-stone-50 dark:bg-[#0a0a0a] border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-stone-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Order</label>
              <input type="number" value={formData.order || 0} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} className="w-full bg-stone-50 dark:bg-[#0a0a0a] border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-stone-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Answer</label>
              <textarea value={formData.answer || ""} onChange={e => setFormData({...formData, answer: e.target.value})} rows={5} className="w-full bg-stone-50 dark:bg-[#0a0a0a] border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-stone-500 font-serif leading-relaxed" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 pb-32">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-serif text-stone-900 dark:text-white">FAQs</h1>
          <button onClick={openCreateView} className="bg-stone-900 dark:bg-white text-white dark:text-stone-900 px-4 py-2 rounded-lg text-sm font-medium hover:opacity-90 flex items-center gap-2"><Plus size={16} /> New FAQ</button>
        </div>
        <div className="bg-white dark:bg-[#111] border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
          {items.length === 0 ? (
            <div className="p-12 text-center text-stone-500 text-sm">No items found.</div>
          ) : (
            <div className="divide-y divide-stone-200 dark:divide-stone-800">
              {items.map((item: any) => (
                <div key={item.id} className="p-6 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-900/50 transition-colors">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium text-stone-900 dark:text-white">{item.question}</h3>
                    <p className="text-xs text-stone-500 line-clamp-1">{item.category}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEditView(item)} className="px-3 py-1.5 text-xs font-medium border border-stone-200 dark:border-stone-700 rounded-md hover:bg-stone-100 dark:hover:bg-stone-800">Edit</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <ConfirmModal isOpen={modalConfig.isOpen} title={modalConfig.title} message={modalConfig.message} onConfirm={modalConfig.onConfirm} onCancel={() => setModalConfig(prev => ({...prev, isOpen: false}))} />
    </div>
  );
}
