"use client";

import { useEffect, useState } from "react";
import { getReviews, updateReview, deleteReview } from "../actions";
import { Trash2, Loader2, ArrowLeft, X, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { ConfirmModal } from "@/components/admin/ConfirmModal";

export default function AdminReviewsPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [currentView, setCurrentView] = useState<'list' | 'edit'>('list');
  const [editingItem, setEditingItem] = useState<any | null>(null);
  
  const [modalConfig, setModalConfig] = useState<{isOpen: boolean; title: string; message: string; onConfirm: () => void}>({
    isOpen: false, title: '', message: '', onConfirm: () => {}
  });
  
  const [formData, setFormData] = useState<any>({ customer_name: '', rating: 5, text_content: '', is_approved: false });

  useEffect(() => {
    async function fetchData() {
      const isMissingEnv = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes("placeholder");
      if (isMissingEnv) {
        setItems([]);
        setLoading(false);
        return;
      }
      try {
        const data = await getReviews();
        if (data && data.length > 0) setItems(data);
      } catch (err) {
        console.error("Error loading:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const openEditView = (item: any) => {
    setEditingItem(item);
    setFormData(item);
    setCurrentView('edit');
  };

  const closeView = () => setCurrentView('list');

  const requestDelete = (id: string) => {
    setModalConfig({
      isOpen: true,
      title: "Delete Review",
      message: "Are you sure you want to delete this review?",
      onConfirm: () => handleDelete(id)
    });
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteReview(id);
      setItems(items.filter((i: any) => i.id !== id));
      if (editingItem?.id === id) closeView();
      setModalConfig(prev => ({ ...prev, isOpen: false }));
    } catch (err) {
      console.error(err);
      alert("Failed to delete.");
    }
  };

  const handleApprove = async (item: any) => {
    try {
      await updateReview(item.id, { is_approved: true });
      const data = await getReviews();
      if (data) setItems(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingItem) {
        await updateReview(editingItem.id, formData);
      }
      const data = await getReviews();
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
            <h2 className="text-2xl font-serif text-stone-900 dark:text-white">Edit Review</h2>
          </div>
          <div className="flex items-center gap-3">
            {editingItem && <button type="button" onClick={() => requestDelete(editingItem.id)} className="px-4 py-2 rounded-md text-red-600 dark:text-red-400 text-sm font-medium hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors">Delete</button>}
            <button onClick={handleSubmit} className="bg-stone-900 dark:bg-white text-white dark:text-stone-900 px-6 py-2 rounded-md text-sm font-medium hover:bg-stone-800 dark:hover:bg-stone-100 transition-colors">Save</button>
          </div>
        </div>
        <div className="bg-white dark:bg-[#111] p-8 border border-stone-200 dark:border-stone-800 rounded-xl space-y-8">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Customer Name</label>
              <input type="text" value={formData.customer_name || ""} onChange={e => setFormData({...formData, customer_name: e.target.value})} className="w-full bg-stone-50 dark:bg-[#0a0a0a] border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-stone-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Rating (1-5)</label>
              <input type="number" value={formData.rating || 5} onChange={e => setFormData({...formData, rating: parseInt(e.target.value)})} className="w-full bg-stone-50 dark:bg-[#0a0a0a] border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-stone-500" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" checked={formData.is_approved || false} onChange={e => setFormData({...formData, is_approved: e.target.checked})} className="rounded border-stone-300 text-stone-900 focus:ring-stone-900" />
              <label className="text-sm font-medium text-stone-700 dark:text-stone-300">Is Approved</label>
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-1">Review Text</label>
              <textarea value={formData.text_content || ""} onChange={e => setFormData({...formData, text_content: e.target.value})} rows={5} className="w-full bg-stone-50 dark:bg-[#0a0a0a] border border-stone-200 dark:border-stone-800 rounded-lg px-4 py-3 text-stone-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-stone-500 font-serif leading-relaxed" />
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
          <h1 className="text-3xl font-serif text-stone-900 dark:text-white">Reviews</h1>
        </div>
        <div className="bg-white dark:bg-[#111] border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden">
          {items.length === 0 ? (
            <div className="p-12 text-center text-stone-500 text-sm">No items found.</div>
          ) : (
            <div className="divide-y divide-stone-200 dark:divide-stone-800">
              {items.map((item: any) => (
                <div key={item.id} className="p-6 flex items-center justify-between hover:bg-stone-50 dark:hover:bg-stone-900/50 transition-colors">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-sm font-medium text-stone-900 dark:text-white">{item.customer_name} - {item.products?.title || "Unknown Product"}</h3>
                    <p className="text-xs text-stone-500 line-clamp-1">{"⭐".repeat(item.rating)} | {item.text_content}</p>
                    {!item.is_approved && <span className="text-xs text-red-500 font-bold mt-1">Pending Approval</span>}
                  </div>
                  <div className="flex items-center gap-2">
                    {!item.is_approved && (
                      <button onClick={() => handleApprove(item)} className="px-3 py-1.5 text-xs font-medium border border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-md hover:bg-green-100 dark:hover:bg-green-800/50 flex items-center gap-1">
                        <CheckCircle size={14} /> Approve
                      </button>
                    )}
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
