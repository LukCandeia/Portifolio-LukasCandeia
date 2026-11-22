import test from 'node:test';
import assert from 'node:assert/strict';
import { isFormspreeEndpoint, sendContact } from '../src/contact.js';
const endpoint = 'https://formspree.io/f/testid';
test('não envia dados sem endpoint válido', async () => {
  let requests = 0;
  for (const url of [
    '',
    'https://outro.site/f/test',
    'https://formspree.io/f/',
    'https://formspree.io.evil/f/test',
    null,
    undefined,
  ]) {
    assert.equal(isFormspreeEndpoint(url), false);
    assert.equal(
      await sendContact(url, {}, () => {
        requests++;
        return { ok: true };
      }),
      'unavailable',
    );
  }
  assert.equal(requests, 0);
});
test('envia POST e só confirma sucesso após resposta positiva', async () => {
  const data = new FormData();
  data.set('message', 'Teste simulado');
  assert.equal(
    await sendContact(endpoint, data, async (url, options) => {
      assert.equal(url, endpoint);
      assert.equal(options.method, 'POST');
      assert.equal(options.body, data);
      assert.equal(options.headers.Accept, 'application/json');
      return { ok: true };
    }),
    'success',
  );
});
test('distingue limite, rejeição e falha de rede sem sucesso falso', async () => {
  assert.equal(await sendContact(endpoint, {}, async () => ({ ok: false, status: 429 })), 'limit');
  assert.equal(await sendContact(endpoint, {}, async () => ({ ok: false, status: 422 })), 'error');
  assert.equal(
    await sendContact(endpoint, {}, async () => {
      throw Error('offline');
    }),
    'network',
  );
});
