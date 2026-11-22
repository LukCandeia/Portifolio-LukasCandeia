import { useRef, useState } from 'react';
import { formspreeEndpoint } from '../config.js';
import { isFormspreeEndpoint, sendContact } from '../contact.js';
import { toolIcons } from '../tool-icons.js';

function ContactIcon({ kind }) {
  if (kind === 'github')
    return (
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: toolIcons.GitHub }}
      />
    );
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
      {kind === 'email' && (
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 6 9 7 9-7" />
        </>
      )}
      {kind === 'linkedin' && (
        <>
          <rect x="3" y="3" width="18" height="18" rx="3" />
          <path d="M7 10v7m0-11v1m4 10v-7m0 3c0-4 6-4 6 0v4" />
        </>
      )}
      {kind === 'whatsapp' && (
        <>
          <path d="M20 12a8 8 0 0 1-12 7l-5 2 2-5a8 8 0 1 1 15-4Z" />
          <path d="M8 8c0 5 3 8 8 8l1-3-3-1-1 1-2-2 1-1-1-3Z" />
        </>
      )}
    </svg>
  );
}

export function Contact({ language, text, ui }) {
  const formRef = useRef(null);
  const pending = useRef(false);
  const configured = isFormspreeEndpoint(formspreeEndpoint);
  const [state, setState] = useState(configured ? '' : 'unavailable');
  const [errors, setErrors] = useState({});
  const sending = state === 'sending';

  async function submit(event) {
    event.preventDefault();
    if (pending.current || !configured) return;
    const form = formRef.current;
    const nextErrors = {};
    for (const field of [form.elements.name, form.elements.email, form.elements.message]) {
      if (!field.value.trim()) nextErrors[field.name] = 'required';
      else if (field.validity.typeMismatch) nextErrors[field.name] = 'invalidEmail';
      else if (field.value.length > field.maxLength) nextErrors[field.name] = 'tooLong';
    }
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      form.elements[Object.keys(nextErrors)[0]].focus();
      return;
    }
    const data = new FormData(form);
    for (const [key, value] of data) data.set(key, value.trim());
    pending.current = true;
    setState('sending');
    const result = await sendContact(formspreeEndpoint, data);
    if (result === 'success') form.reset();
    pending.current = false;
    setState(result);
  }
  const inputProps = (name) => ({
    name,
    required: true,
    readOnly: sending,
    'aria-invalid': !!errors[name],
    'aria-describedby': errors[name] ? `${name}-error` : undefined,
    onChange: () => {
      setErrors((previous) => ({ ...previous, [name]: undefined }));
      if (!pending.current && configured) setState('');
    },
  });
  const error = (name) =>
    errors[name] && (
      <span className="field-error" id={`${name}-error`}>
        {ui[errors[name]]}
      </span>
    );

  return (
    <section className="glass contact-section" id="contact" aria-labelledby="contact-heading">
      <div>
        <span className="pill">
          <span className="status-dot" />
          {text.opportunity}
        </span>
        <h2 id="contact-heading">{text.contactHeading}</h2>
        <p>{text.contactCopy}</p>
        <div className="contact-actions">
          <a className="email-address" href="mailto:Lukasnathan62@gmail.com">
            <ContactIcon kind="email" />
            Lukasnathan62@gmail.com
          </a>
          <div className="contact-links">
            <a href="https://wa.me/5531988378504" target="_blank" rel="noopener noreferrer">
              <ContactIcon kind="whatsapp" />
              WhatsApp
            </a>
            <a
              href="https://www.linkedin.com/in/lukascandeia"
              target="_blank"
              rel="noopener noreferrer"
            >
              <ContactIcon kind="linkedin" />
              LinkedIn
            </a>
            <a href="https://github.com/LukCandeia" target="_blank" rel="noopener noreferrer">
              <ContactIcon kind="github" />
              GitHub
            </a>
          </div>
        </div>
      </div>
      <form
        ref={formRef}
        className="contact-form"
        id="contact-form"
        aria-label={language === 'pt' ? 'Formulário de contato' : 'Contact form'}
        aria-describedby="form-privacy"
        aria-busy={sending}
        noValidate
        onSubmit={submit}
      >
        <div className="form-row">
          <label>
            <span>{ui.name}</span>
            <input {...inputProps('name')} autoComplete="name" maxLength={100} />
            {error('name')}
          </label>
          <label>
            <span>{ui.email}</span>
            <input {...inputProps('email')} type="email" autoComplete="email" maxLength={254} />
            {error('email')}
          </label>
        </div>
        <label>
          <span>{ui.message}</span>
          <textarea {...inputProps('message')} rows={5} maxLength={5000} />
          {error('message')}
        </label>
        <p className="form-privacy" id="form-privacy">
          {ui.privacy}
        </p>
        <button
          className="button primary form-submit"
          type="submit"
          disabled={sending || !configured}
        >
          {ui[sending ? 'sending' : 'send']}
        </button>
        <p className="form-status" role="status" aria-live="polite" data-state={state}>
          {state ? ui[state] : ''}
        </p>
      </form>
    </section>
  );
}
