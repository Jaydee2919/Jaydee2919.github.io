const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 4173);

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
};

function send(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, { "Content-Type": type });
  res.end(body);
}

function safePath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0]);
  const requested = cleanPath === "/" ? "/admin.html" : cleanPath;
  const filePath = path.normalize(path.join(root, requested));
  if (!filePath.startsWith(root)) return null;
  return filePath;
}

const server = http.createServer((req, res) => {
  if (req.method === "POST" && req.url === "/api/content") {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 1024 * 1024) req.destroy();
    });
    req.on("end", () => {
      try {
        const parsed = JSON.parse(body);
        const output = `window.siteContent = ${JSON.stringify(parsed, null, 2)};\n`;
        fs.writeFileSync(path.join(root, "content.js"), output, "utf8");
        send(res, 200, "Saved content.js");
      } catch (error) {
        send(res, 400, error.message);
      }
    });
    return;
  }

  if (req.method !== "GET") {
    send(res, 405, "Method not allowed");
    return;
  }

  const filePath = safePath(req.url);
  if (!filePath) {
    send(res, 403, "Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      send(res, 404, "Not found");
      return;
    }
    send(res, 200, data, types[path.extname(filePath)] || "application/octet-stream");
  });
});

server.listen(port, () => {
  console.log(`Website editor running at http://localhost:${port}/admin.html`);
  console.log("Keep this Terminal window open while editing.");
});
