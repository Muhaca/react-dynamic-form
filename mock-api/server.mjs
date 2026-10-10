import { createServer } from 'node:http';

/**
 * Mock API minimal untuk playground: in-memory form registry.
 * Endpoint:
 *   GET /api/forms/:id  -> BackendSchemaResponse
 *     (formId, version, gridColumns, fields)
 * Tidak ada dependency eksternal — murni node:http.
 */

const FORMS = {
  'playground-form': {
    formId: 'playground-form',
    version: '1.0.0',
    gridColumns: 12,
    fields: [
      { name: 'heading', type: 'heading', label: 'Employee Onboarding', textSize: 'h2' },
      {
        name: 'fullName',
        type: 'text',
        label: 'Nama Lengkap',
        required: true,
        placeholder: 'John Doe',
        validation: { minLength: 3 },
        layout: { colSpan: 6 },
      },
      {
        name: 'email',
        type: 'email',
        label: 'Email',
        required: true,
        placeholder: 'you@example.com',
        layout: { colSpan: 6 },
      },
      {
        name: 'country',
        type: 'select',
        label: 'Negara',
        required: true,
        options: [
          { label: 'Indonesia', value: 'id' },
          { label: 'Singapura', value: 'sg' },
          { label: 'Malaysia', value: 'my' },
        ],
        layout: { colSpan: 4 },
      },
      { name: 'joinDate', type: 'date', label: 'Tanggal Mulai', layout: { colSpan: 4 } },
      {
        name: 'salary',
        type: 'currency',
        label: 'Gaji',
        symbol: 'Rp',
        defaultValue: 0,
        layout: { colSpan: 4 },
      },
      { name: 'divider', type: 'divider', label: '' },
      {
        name: 'details',
        type: 'container',
        label: 'Alamat & Kontak',
        layout: { colSpan: 12 },
        children: [
          { name: 'address', type: 'address', label: 'Alamat', placeholder: 'Jalan, nomor, kota' },
          { name: 'phone', type: 'phone', label: 'Telepon', placeholder: '+62...' },
        ],
      },
      {
        name: 'skills',
        type: 'multiselect',
        label: 'Keahlian',
        options: [
          { label: 'React', value: 'react' },
          { label: 'TypeScript', value: 'ts' },
          { label: 'Node.js', value: 'node' },
        ],
      },
      {
        name: 'subscribe',
        type: 'checkbox',
        label: 'Berlangganan newsletter',
        defaultValue: false,
      },
      {
        name: 'notes',
        type: 'textarea',
        label: 'Catatan tambahan',
        placeholder: 'Opsional...',
        visibleWhen: { field: 'subscribe', operator: 'eq', value: true },
      },
    ],
  },
};

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization',
};

const server = createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS);
    res.end();
    return;
  }

  const match = req.url?.match(/^\/api\/forms\/([^/?]+)/);
  if (match && req.method === 'GET') {
    const formId = decodeURIComponent(match[1]);
    const form = FORMS[formId];
    if (!form) {
      res.writeHead(404, { ...CORS, 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: `form "${formId}" tidak ditemukan` }));
      return;
    }
    res.writeHead(200, { ...CORS, 'Content-Type': 'application/json' });
    res.end(JSON.stringify(form));
    return;
  }

  res.writeHead(404, { ...CORS, 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'not found' }));
});

const PORT = Number(process.env.PORT ?? 4000);
server.listen(PORT, () => {
  console.log(`[mock-api] listening on http://localhost:${PORT}`);
  console.log(`[mock-api] try: http://localhost:${PORT}/api/forms/playground-form`);
});
