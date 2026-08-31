"use client";

import React, { useState } from 'react';
import { WebsiteContent } from '@/api/content';
import { FormField } from '@/components/admin/FormField';
import { sanitizeNumeric10Digits, isValidEmail, isValid10DigitPhone } from '@/utils/validation';
import { RotateCcw } from 'lucide-react';

interface ContactEditorProps {
  content: WebsiteContent | null;
  onChangeField: (field: string, value: string) => void;
  onResetSection: () => void;
}

export function ContactEditor({ content, onChangeField, onResetSection }: ContactEditorProps) {
  const contact = content?.contact;
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [whatsappError, setWhatsappError] = useState('');

  const handleEmailChange = (val: string) => {
    onChangeField('email', val);
    if (val.trim() && !isValidEmail(val)) {
      setEmailError('Please enter a valid email address (e.g. contact@company.com)');
    } else {
      setEmailError('');
    }
  };

  const handlePhoneChange = (val: string) => {
    const clean = sanitizeNumeric10Digits(val);
    onChangeField('phone', clean);
    if (clean.length > 0 && clean.length !== 10) {
      setPhoneError('Phone number must be exactly 10 numeric digits');
    } else {
      setPhoneError('');
    }
  };

  const handleWhatsappChange = (val: string) => {
    const clean = sanitizeNumeric10Digits(val);
    onChangeField('whatsapp', clean);
    if (clean.length > 0 && clean.length !== 10) {
      setWhatsappError('WhatsApp number must be exactly 10 numeric digits');
    } else {
      setWhatsappError('');
    }
  };

  return (
    <div className="space-y-4 font-sans text-slate-200">
      <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
        <span className="text-xs font-bold text-white">Contact Information</span>
        <button
          onClick={onResetSection}
          className="flex items-center space-x-1 text-[11px] font-semibold text-slate-400 hover:text-[#FA8373] transition-colors"
          title="Reset section to saved database baseline"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset Section</span>
        </button>
      </div>

      <FormField label="Official Business Email" error={emailError} helpText="Standard format (e.g. contact@business.com)">
        <input
          type="email"
          placeholder="contact@business.test"
          value={contact?.email || ''}
          onChange={(e) => handleEmailChange(e.target.value)}
          className="w-full px-3.5 py-2 bg-[#0F172A] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#FA8373] transition-all"
        />
      </FormField>

      <div className="space-y-3">
        <FormField label="Phone Number (10 Digits)" error={phoneError} helpText="Only numeric digits, exactly 10 digits">
          <input
            type="text"
            maxLength={10}
            placeholder="9876543210"
            value={contact?.phone || ''}
            onChange={(e) => handlePhoneChange(e.target.value)}
            className="w-full px-3.5 py-2 bg-[#0F172A] border border-slate-700 rounded-xl text-xs text-white font-mono outline-none focus:border-[#FA8373] transition-all"
          />
        </FormField>

        <FormField label="WhatsApp Number (10 Digits)" error={whatsappError} helpText="Only numeric digits, exactly 10 digits">
          <input
            type="text"
            maxLength={10}
            placeholder="9876543210"
            value={contact?.whatsapp || ''}
            onChange={(e) => handleWhatsappChange(e.target.value)}
            className="w-full px-3.5 py-2 bg-[#0F172A] border border-slate-700 rounded-xl text-xs text-white font-mono outline-none focus:border-[#FA8373] transition-all"
          />
        </FormField>
      </div>

      <FormField label="Physical Street Address">
        <textarea
          rows={2}
          placeholder="123 Executive Avenue, Financial District"
          value={contact?.address || ''}
          onChange={(e) => onChangeField('address', e.target.value)}
          className="w-full px-3.5 py-2 bg-[#0F172A] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#FA8373] transition-all"
        />
      </FormField>

      <div className="grid grid-cols-3 gap-2">
        <FormField label="City">
          <input
            type="text"
            placeholder="New York"
            value={contact?.city || ''}
            onChange={(e) => onChangeField('city', e.target.value)}
            className="w-full px-2.5 py-2 bg-[#0F172A] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#FA8373]"
          />
        </FormField>
        <FormField label="State / Region">
          <input
            type="text"
            placeholder="NY"
            value={contact?.state || ''}
            onChange={(e) => onChangeField('state', e.target.value)}
            className="w-full px-2.5 py-2 bg-[#0F172A] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#FA8373]"
          />
        </FormField>
        <FormField label="Country">
          <input
            type="text"
            placeholder="USA"
            value={contact?.country || ''}
            onChange={(e) => onChangeField('country', e.target.value)}
            className="w-full px-2.5 py-2 bg-[#0F172A] border border-slate-700 rounded-xl text-xs text-white outline-none focus:border-[#FA8373]"
          />
        </FormField>
      </div>

      <FormField label="Google Maps Embed / URL">
        <input
          type="url"
          placeholder="https://maps.google.com/..."
          value={contact?.mapUrl || ''}
          onChange={(e) => onChangeField('mapUrl', e.target.value)}
          className="w-full px-3.5 py-2 bg-[#0F172A] border border-slate-700 rounded-xl text-xs font-mono text-white outline-none focus:border-[#FA8373]"
        />
      </FormField>
    </div>
  );
}
