import https from 'https';

const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZheHJva3hjeWdtcXB4cnZlc29jIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDgyOTM2NiwiZXhwIjoyMDg2NDA1MzY2fQ.riKd-UumHlIXM8YjqmcZ-d85WvMVAgtS2wkKX1Gd6Vk';
const HOST = 'faxrokxcygmqpxrvesoc.supabase.co';
const headers = {
  'Content-Type': 'application/json',
  'apikey': SERVICE_KEY,
  'Authorization': `Bearer ${SERVICE_KEY}`,
};

function request(method, path, body) {
  return new Promise((resolve, reject) => {
    const req = https.request({ hostname: HOST, path, method, headers }, (res) => {
      let b = '';
      res.on('data', d => b += d);
      res.on('end', () => resolve({ status: res.statusCode, body: b }));
    });
    req.on('error', reject);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

async function listBucket(bucket, prefix = '') {
  const res = await request('POST', `/storage/v1/object/list/${bucket}`, { prefix, limit: 1000 });
  return JSON.parse(res.body);
}

async function main() {
  const buckets = ['site', 'products'];
  const mediaRows = [];

  for (const bucket of buckets) {
    // List root
    const rootFiles = await listBucket(bucket);
    for (const item of rootFiles) {
      if (item.metadata) {
        const publicUrl = `https://${HOST}/storage/v1/object/public/${bucket}/${item.name}`;
        mediaRows.push({
          url: publicUrl,
          filename: item.name,
          mime_type: item.metadata.mimetype,
          size: item.metadata.size,
          alt_text: null,
        });
      } else if (item.id === null) {
        // It's a folder, list its contents
        const subFiles = await listBucket(bucket, item.name + '/');
        for (const sub of subFiles) {
          if (sub.metadata) {
            const publicUrl = `https://${HOST}/storage/v1/object/public/${bucket}/${item.name}/${sub.name}`;
            mediaRows.push({
              url: publicUrl,
              filename: sub.name,
              mime_type: sub.metadata.mimetype,
              size: sub.metadata.size,
              alt_text: null,
            });
          }
        }
      }
    }
  }

  console.log(`Found ${mediaRows.length} files in storage. Syncing to media table...`);

  if (mediaRows.length > 0) {
    const res = await request('POST', '/rest/v1/media', mediaRows);
    console.log('Insert:', res.status, res.body || '(success)');
  }
}

main().catch(console.error);
