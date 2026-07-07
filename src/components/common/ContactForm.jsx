import React, { useState } from 'react';

const copy = {
  en: {
    title: 'Reach Us Anytime',
    name: 'Full Name*',
    phone: 'Phone*',
    email: 'Email*',
    subject: 'Subject*',
    message: 'Message*',
    send: 'Submit Now',
    sending: 'Sending...',
    success: 'Message sent. We will get back to you soon.',
    error: 'Unable to send the message. Please try again.',
    placeholders: {
      name: 'Your name',
      phone: '+1 555 000 0000',
      email: 'you@example.com',
      subject: 'Order, product, or shipping question',
      message: 'Write your message...',
    },
  },
  es: {
    title: 'Contactanos cuando quieras',
    name: 'Nombre completo*',
    phone: 'Telefono*',
    email: 'Email*',
    subject: 'Asunto*',
    message: 'Mensaje*',
    send: 'Enviar',
    sending: 'Enviando...',
    success: 'Mensaje enviado. Te responderemos pronto.',
    error: 'No se pudo enviar el mensaje. Intenta de nuevo.',
    placeholders: {
      name: 'Tu nombre',
      phone: '+1 555 000 0000',
      email: 'tu@email.com',
      subject: 'Pregunta sobre pedido, producto o envio',
      message: 'Escribe tu mensaje...',
    },
  },
};

const initialForm = {
  name: '',
  phone: '',
  email: '',
  subject: '',
  message: '',
};

const ContactForm = ({ lang = 'en' }) => {
  const labels = copy[lang] || copy.en;
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('idle');

  const updateField = (field) => (event) => {
    setForm((current) => ({ ...current, [field]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, lang }),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || result.success === false) {
        throw new Error(result.message || 'Contact request failed');
      }

      setForm(initialForm);
      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return (
    <div className="inquiry-form">
      <div className="section-title mb-20">
        <h4>{labels.title}</h4>
      </div>
      {status === 'success' && <div className="alert alert-success">{labels.success}</div>}
      {status === 'error' && <div className="alert alert-danger">{labels.error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-12">
            <div className="form-inner mb-20">
              <label>{labels.name}</label>
              <input required type="text" value={form.name} onChange={updateField('name')} placeholder={labels.placeholders.name} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-inner mb-20">
              <label>{labels.phone}</label>
              <input required type="tel" value={form.phone} onChange={updateField('phone')} placeholder={labels.placeholders.phone} />
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-inner mb-20">
              <label>{labels.email}</label>
              <input required type="email" value={form.email} onChange={updateField('email')} placeholder={labels.placeholders.email} />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-inner mb-20">
              <label>{labels.subject}</label>
              <input required type="text" value={form.subject} onChange={updateField('subject')} placeholder={labels.placeholders.subject} />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-inner mb-30">
              <label>{labels.message}</label>
              <textarea required value={form.message} onChange={updateField('message')} placeholder={labels.placeholders.message} />
            </div>
          </div>
          <div className="col-md-12">
            <div className="form-inner">
              <button type="submit" className="primary-btn1 hover-btn3" disabled={status === 'sending'}>
                {status === 'sending' ? labels.sending : labels.send}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
