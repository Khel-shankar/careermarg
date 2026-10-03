const http = require("http");
const fs = require("fs");
const path = require("path");
const url = require("url");

// Load .env variables manually without needing external dotenv package
const envPath = path.join(__dirname, ".env");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#")) {
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        const value = trimmed.slice(eqIdx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }
  });
}

const PORT = parseInt(process.env.PORT || "3000", 10);
const HOST = process.env.HOST || "0.0.0.0";

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".ttf": "font/ttf",
  ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ".pdf": "application/pdf",
  ".sql": "text/plain; charset=utf-8"
};

function parseBody(req) {
  return new Promise((resolve) => {
    let bodyData = "";
    req.on("data", (chunk) => {
      bodyData += chunk;
      // Protect against large payloads
      if (bodyData.length > 5e6) {
        req.destroy();
      }
    });
    req.on("end", () => {
      if (!bodyData) {
        return resolve({});
      }
      const contentType = req.headers["content-type"] || "";
      if (contentType.includes("application/json")) {
        try {
          resolve(JSON.parse(bodyData));
        } catch {
          resolve({});
        }
      } else if (contentType.includes("application/x-www-form-urlencoded")) {
        const params = new URLSearchParams(bodyData);
        const parsed = {};
        for (const [k, v] of params.entries()) {
          parsed[k] = v;
        }
        resolve(parsed);
      } else {
        try {
          resolve(JSON.parse(bodyData));
        } catch {
          resolve({ raw: bodyData });
        }
      }
    });
  });
}

const server = http.createServer(async (req, res) => {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    return res.end();
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname || "/";

  // Polyfill helper response methods for serverless handlers
  res.status = function (statusCode) {
    this.statusCode = statusCode;
    return this;
  };
  res.json = function (data) {
    if (!this.getHeader("Content-Type")) {
      this.setHeader("Content-Type", "application/json; charset=utf-8");
    }
    this.end(JSON.stringify(data));
  };
  res.send = function (data) {
    this.end(typeof data === "object" ? JSON.stringify(data) : String(data));
  };

  req.query = parsedUrl.query || {};

  // API Routing (/api/auth, /api/sync, etc.)
  if (pathname.startsWith("/api/")) {
    const apiName = pathname.replace(/^\/api\//, "").replace(/\.js$/, "");
    const apiFilePath = path.join(__dirname, "api", `${apiName}.js`);

    if (fs.existsSync(apiFilePath)) {
      try {
        req.body = await parseBody(req);
        // Clear require cache for development hot-reloading
        delete require.cache[require.resolve(apiFilePath)];
        const handler = require(apiFilePath);
        return await handler(req, res);
      } catch (err) {
        console.error(`[API Error in ${apiName}]:`, err);
        return res.status(500).json({
          success: false,
          error: "Internal Server Error",
          message: err.message
        });
      }
    } else {
      return res.status(404).json({ success: false, error: "API route not found" });
    }
  }

  // Static File Serving
  let relativeFilePath = pathname === "/" ? "/index.html" : pathname;
  // Decode URI components for paths with spaces
  try {
    relativeFilePath = decodeURIComponent(relativeFilePath);
  } catch {}

  const safePath = path.normalize(relativeFilePath).replace(/^(\.\.[/\\])+/, "");
  const filePath = path.join(__dirname, safePath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    res.setHeader("Content-Type", contentType);
    const readStream = fs.createReadStream(filePath);
    return readStream.pipe(res);
  }

  // Fallback to index.html for SPA client-side routes
  const indexPath = path.join(__dirname, "index.html");
  if (fs.existsSync(indexPath)) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    return fs.createReadStream(indexPath).pipe(res);
  }

  res.statusCode = 404;
  res.end("404 Not Found");
});

server.listen(PORT, HOST, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 CareerMarg v3 Development Server Running!`);
  console.log(`📡 Local URL:   http://localhost:${PORT}`);
  console.log(`🌐 Network URL: http://${HOST}:${PORT}`);
  console.log(`======================================================\n`);
});
