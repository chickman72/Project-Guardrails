const DEFAULT_UPSTREAM = "http://localhost:3000/api/chat";

function getUpstreamUrl(requestUrl: string) {
  const upstream = new URL(process.env.NEXUS_CHAT_API_URL ?? DEFAULT_UPSTREAM);
  const incoming = new URL(requestUrl);
  upstream.search = incoming.search;
  return upstream;
}

function buildUpstreamHeaders(request: Request) {
  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.delete("connection");
  headers.delete("content-length");
  return headers;
}

async function proxy(request: Request) {
  const upstreamUrl = getUpstreamUrl(request.url);
  const init: RequestInit = {
    method: request.method,
    headers: buildUpstreamHeaders(request),
    body:
      request.method === "GET" || request.method === "HEAD"
        ? undefined
        : await request.arrayBuffer(),
  };

  const response = await fetch(upstreamUrl, init);
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: response.headers,
  });
}

export async function POST(request: Request) {
  return proxy(request);
}

export async function OPTIONS(request: Request) {
  return proxy(request);
}
