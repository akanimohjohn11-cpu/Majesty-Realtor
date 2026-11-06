'use client';

import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const defaultMsg =
    'Hello Majesty Realty, I would like to inquire about your available properties and schedule an inspection.';

  const handleSend = () => {
    const text = customMsg.trim() || defaultMsg;
    const url = `https://wa.me/2347089581351?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Quick Chat Popup Card */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl border border-[#DFBE6C]/30 overflow-hidden text-[#1E332B] animate-in fade-in slide-in-from-bottom-2 duration-200">
          {/* Header */}
          <div className="bg-[#0D4A36] p-4 text-[#FAF9F6] flex items-center justify-between border-b border-[#DFBE6C]/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#DFBE6C] text-[#0D4A36] flex items-center justify-center font-bold text-sm shadow-xs">
                MR
              </div>
              <div>
                <h4 className="text-sm font-bold leading-tight text-white">Majesty Realty & Construction</h4>
                <p className="text-xs text-[#DFBE6C]">Online · Instant WhatsApp Desk</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#FAF9F6]/70 hover:text-white p-1 rounded focus:outline-none"
              aria-label="Close chat popup"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 bg-[#FAF8F2] space-y-3">
            <div className="bg-white p-3 rounded-md shadow-xs text-xs text-[#26342F] border border-[#173F32]/5 leading-relaxed">
              Welcome to Majesty Realty and Construction. How can our acquisition and property management
              team assist your property search today?
            </div>

            <div>
              <label htmlFor="wa-message" className="block text-[11px] font-medium text-[#5C6E66] mb-1">
                Your enquiry / property of interest:
              </label>
              <textarea
                id="wa-message"
                rows={2}
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                placeholder="e.g. Inquiring about 5-bed duplex in Ikoyi..."
                className="w-full text-xs p-2.5 rounded border border-[#173F32]/15 focus:outline-none focus:border-[#173F32] bg-white resize-none"
              />
            </div>

            <button
              onClick={handleSend}
              className="w-full py-2.5 bg-[#173F32] text-white hover:bg-[#14372C] text-xs font-semibold uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-[#D8C5A2]" />
              <span>Start WhatsApp Conversation</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Chat with Majesty Realty on WhatsApp"
        className="flex items-center gap-2.5 px-4 py-3 bg-[#173F32] text-white rounded-full shadow-lg hover:bg-[#14372C] transition-all duration-200 border border-[#D8C5A2]/30 group focus:outline-none"
      >
        <div className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center">
          <MessageSquare className="w-4 h-4 fill-white" />
        </div>
        <span className="text-xs font-semibold tracking-wide hidden sm:inline text-[#FAF8F2]">
          Chat on WhatsApp
        </span>
      </button>
    </div>
  );
}
