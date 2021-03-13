#!/usr/bin/env node
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __markAsModule = (target) => __defProp(target, "__esModule", {value: true});
var __commonJS = (callback, module2) => () => {
  if (!module2) {
    module2 = {exports: {}};
    callback(module2.exports, module2);
  }
  return module2.exports;
};
var __exportStar = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, {get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable});
  }
  return target;
};
var __toModule = (module2) => {
  return __exportStar(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? {get: () => module2.default, enumerable: true} : {value: module2, enumerable: true})), module2);
};

// node_modules/@actions/core/lib/utils.js
var require_utils = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  function toCommandValue(input) {
    if (input === null || input === void 0) {
      return "";
    } else if (typeof input === "string" || input instanceof String) {
      return input;
    }
    return JSON.stringify(input);
  }
  exports2.toCommandValue = toCommandValue;
});

// node_modules/@actions/core/lib/command.js
var require_command = __commonJS((exports2) => {
  "use strict";
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var os = __importStar(require("os"));
  var utils_1 = require_utils();
  function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
  }
  exports2.issueCommand = issueCommand;
  function issue(name, message = "") {
    issueCommand(name, {}, message);
  }
  exports2.issue = issue;
  var CMD_STRING = "::";
  var Command = class {
    constructor(command, properties, message) {
      if (!command) {
        command = "missing.command";
      }
      this.command = command;
      this.properties = properties;
      this.message = message;
    }
    toString() {
      let cmdStr = CMD_STRING + this.command;
      if (this.properties && Object.keys(this.properties).length > 0) {
        cmdStr += " ";
        let first = true;
        for (const key in this.properties) {
          if (this.properties.hasOwnProperty(key)) {
            const val = this.properties[key];
            if (val) {
              if (first) {
                first = false;
              } else {
                cmdStr += ",";
              }
              cmdStr += `${key}=${escapeProperty(val)}`;
            }
          }
        }
      }
      cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
      return cmdStr;
    }
  };
  function escapeData(s) {
    return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
  }
  function escapeProperty(s) {
    return utils_1.toCommandValue(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A").replace(/:/g, "%3A").replace(/,/g, "%2C");
  }
});

// node_modules/@actions/core/lib/file-command.js
var require_file_command = __commonJS((exports2) => {
  "use strict";
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var fs = __importStar(require("fs"));
  var os = __importStar(require("os"));
  var utils_1 = require_utils();
  function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
      throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
      throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
      encoding: "utf8"
    });
  }
  exports2.issueCommand = issueCommand;
});

// node_modules/@actions/core/lib/core.js
var require_core = __commonJS((exports2) => {
  "use strict";
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var command_1 = require_command();
  var file_command_1 = require_file_command();
  var utils_1 = require_utils();
  var os = __importStar(require("os"));
  var path = __importStar(require("path"));
  var ExitCode;
  (function(ExitCode2) {
    ExitCode2[ExitCode2["Success"] = 0] = "Success";
    ExitCode2[ExitCode2["Failure"] = 1] = "Failure";
  })(ExitCode = exports2.ExitCode || (exports2.ExitCode = {}));
  function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env["GITHUB_ENV"] || "";
    if (filePath) {
      const delimiter = "_GitHubActionsFileCommandDelimeter_";
      const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
      file_command_1.issueCommand("ENV", commandValue);
    } else {
      command_1.issueCommand("set-env", {name}, convertedVal);
    }
  }
  exports2.exportVariable = exportVariable;
  function setSecret(secret) {
    command_1.issueCommand("add-mask", {}, secret);
  }
  exports2.setSecret = setSecret;
  function addPath(inputPath) {
    const filePath = process.env["GITHUB_PATH"] || "";
    if (filePath) {
      file_command_1.issueCommand("PATH", inputPath);
    } else {
      command_1.issueCommand("add-path", {}, inputPath);
    }
    process.env["PATH"] = `${inputPath}${path.delimiter}${process.env["PATH"]}`;
  }
  exports2.addPath = addPath;
  function getInput2(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`] || "";
    if (options && options.required && !val) {
      throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
  }
  exports2.getInput = getInput2;
  function setOutput(name, value) {
    command_1.issueCommand("set-output", {name}, value);
  }
  exports2.setOutput = setOutput;
  function setCommandEcho(enabled) {
    command_1.issue("echo", enabled ? "on" : "off");
  }
  exports2.setCommandEcho = setCommandEcho;
  function setFailed3(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
  }
  exports2.setFailed = setFailed3;
  function isDebug() {
    return process.env["RUNNER_DEBUG"] === "1";
  }
  exports2.isDebug = isDebug;
  function debug(message) {
    command_1.issueCommand("debug", {}, message);
  }
  exports2.debug = debug;
  function error(message) {
    command_1.issue("error", message instanceof Error ? message.toString() : message);
  }
  exports2.error = error;
  function warning(message) {
    command_1.issue("warning", message instanceof Error ? message.toString() : message);
  }
  exports2.warning = warning;
  function info3(message) {
    process.stdout.write(message + os.EOL);
  }
  exports2.info = info3;
  function startGroup(name) {
    command_1.issue("group", name);
  }
  exports2.startGroup = startGroup;
  function endGroup() {
    command_1.issue("endgroup");
  }
  exports2.endGroup = endGroup;
  function group2(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
      startGroup(name);
      let result;
      try {
        result = yield fn();
      } finally {
        endGroup();
      }
      return result;
    });
  }
  exports2.group = group2;
  function saveState(name, value) {
    command_1.issueCommand("save-state", {name}, value);
  }
  exports2.saveState = saveState;
  function getState(name) {
    return process.env[`STATE_${name}`] || "";
  }
  exports2.getState = getState;
});

// node_modules/@actions/http-client/proxy.js
var require_proxy = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  function getProxyUrl(reqUrl) {
    let usingSsl = reqUrl.protocol === "https:";
    let proxyUrl;
    if (checkBypass(reqUrl)) {
      return proxyUrl;
    }
    let proxyVar;
    if (usingSsl) {
      proxyVar = process.env["https_proxy"] || process.env["HTTPS_PROXY"];
    } else {
      proxyVar = process.env["http_proxy"] || process.env["HTTP_PROXY"];
    }
    if (proxyVar) {
      proxyUrl = new URL(proxyVar);
    }
    return proxyUrl;
  }
  exports2.getProxyUrl = getProxyUrl;
  function checkBypass(reqUrl) {
    if (!reqUrl.hostname) {
      return false;
    }
    let noProxy = process.env["no_proxy"] || process.env["NO_PROXY"] || "";
    if (!noProxy) {
      return false;
    }
    let reqPort;
    if (reqUrl.port) {
      reqPort = Number(reqUrl.port);
    } else if (reqUrl.protocol === "http:") {
      reqPort = 80;
    } else if (reqUrl.protocol === "https:") {
      reqPort = 443;
    }
    let upperReqHosts = [reqUrl.hostname.toUpperCase()];
    if (typeof reqPort === "number") {
      upperReqHosts.push(`${upperReqHosts[0]}:${reqPort}`);
    }
    for (let upperNoProxyItem of noProxy.split(",").map((x) => x.trim().toUpperCase()).filter((x) => x)) {
      if (upperReqHosts.some((x) => x === upperNoProxyItem)) {
        return true;
      }
    }
    return false;
  }
  exports2.checkBypass = checkBypass;
});

// node_modules/tunnel/lib/tunnel.js
var require_tunnel = __commonJS((exports2) => {
  "use strict";
  var net = require("net");
  var tls = require("tls");
  var http = require("http");
  var https = require("https");
  var events = require("events");
  var assert = require("assert");
  var util = require("util");
  exports2.httpOverHttp = httpOverHttp;
  exports2.httpsOverHttp = httpsOverHttp;
  exports2.httpOverHttps = httpOverHttps;
  exports2.httpsOverHttps = httpsOverHttps;
  function httpOverHttp(options) {
    var agent = new TunnelingAgent(options);
    agent.request = http.request;
    return agent;
  }
  function httpsOverHttp(options) {
    var agent = new TunnelingAgent(options);
    agent.request = http.request;
    agent.createSocket = createSecureSocket;
    agent.defaultPort = 443;
    return agent;
  }
  function httpOverHttps(options) {
    var agent = new TunnelingAgent(options);
    agent.request = https.request;
    return agent;
  }
  function httpsOverHttps(options) {
    var agent = new TunnelingAgent(options);
    agent.request = https.request;
    agent.createSocket = createSecureSocket;
    agent.defaultPort = 443;
    return agent;
  }
  function TunnelingAgent(options) {
    var self = this;
    self.options = options || {};
    self.proxyOptions = self.options.proxy || {};
    self.maxSockets = self.options.maxSockets || http.Agent.defaultMaxSockets;
    self.requests = [];
    self.sockets = [];
    self.on("free", function onFree(socket, host, port, localAddress) {
      var options2 = toOptions(host, port, localAddress);
      for (var i = 0, len = self.requests.length; i < len; ++i) {
        var pending = self.requests[i];
        if (pending.host === options2.host && pending.port === options2.port) {
          self.requests.splice(i, 1);
          pending.request.onSocket(socket);
          return;
        }
      }
      socket.destroy();
      self.removeSocket(socket);
    });
  }
  util.inherits(TunnelingAgent, events.EventEmitter);
  TunnelingAgent.prototype.addRequest = function addRequest(req, host, port, localAddress) {
    var self = this;
    var options = mergeOptions({request: req}, self.options, toOptions(host, port, localAddress));
    if (self.sockets.length >= this.maxSockets) {
      self.requests.push(options);
      return;
    }
    self.createSocket(options, function(socket) {
      socket.on("free", onFree);
      socket.on("close", onCloseOrRemove);
      socket.on("agentRemove", onCloseOrRemove);
      req.onSocket(socket);
      function onFree() {
        self.emit("free", socket, options);
      }
      function onCloseOrRemove(err) {
        self.removeSocket(socket);
        socket.removeListener("free", onFree);
        socket.removeListener("close", onCloseOrRemove);
        socket.removeListener("agentRemove", onCloseOrRemove);
      }
    });
  };
  TunnelingAgent.prototype.createSocket = function createSocket(options, cb) {
    var self = this;
    var placeholder = {};
    self.sockets.push(placeholder);
    var connectOptions = mergeOptions({}, self.proxyOptions, {
      method: "CONNECT",
      path: options.host + ":" + options.port,
      agent: false,
      headers: {
        host: options.host + ":" + options.port
      }
    });
    if (options.localAddress) {
      connectOptions.localAddress = options.localAddress;
    }
    if (connectOptions.proxyAuth) {
      connectOptions.headers = connectOptions.headers || {};
      connectOptions.headers["Proxy-Authorization"] = "Basic " + new Buffer(connectOptions.proxyAuth).toString("base64");
    }
    debug("making CONNECT request");
    var connectReq = self.request(connectOptions);
    connectReq.useChunkedEncodingByDefault = false;
    connectReq.once("response", onResponse);
    connectReq.once("upgrade", onUpgrade);
    connectReq.once("connect", onConnect);
    connectReq.once("error", onError);
    connectReq.end();
    function onResponse(res) {
      res.upgrade = true;
    }
    function onUpgrade(res, socket, head) {
      process.nextTick(function() {
        onConnect(res, socket, head);
      });
    }
    function onConnect(res, socket, head) {
      connectReq.removeAllListeners();
      socket.removeAllListeners();
      if (res.statusCode !== 200) {
        debug("tunneling socket could not be established, statusCode=%d", res.statusCode);
        socket.destroy();
        var error = new Error("tunneling socket could not be established, statusCode=" + res.statusCode);
        error.code = "ECONNRESET";
        options.request.emit("error", error);
        self.removeSocket(placeholder);
        return;
      }
      if (head.length > 0) {
        debug("got illegal response body from proxy");
        socket.destroy();
        var error = new Error("got illegal response body from proxy");
        error.code = "ECONNRESET";
        options.request.emit("error", error);
        self.removeSocket(placeholder);
        return;
      }
      debug("tunneling connection has established");
      self.sockets[self.sockets.indexOf(placeholder)] = socket;
      return cb(socket);
    }
    function onError(cause) {
      connectReq.removeAllListeners();
      debug("tunneling socket could not be established, cause=%s\n", cause.message, cause.stack);
      var error = new Error("tunneling socket could not be established, cause=" + cause.message);
      error.code = "ECONNRESET";
      options.request.emit("error", error);
      self.removeSocket(placeholder);
    }
  };
  TunnelingAgent.prototype.removeSocket = function removeSocket(socket) {
    var pos = this.sockets.indexOf(socket);
    if (pos === -1) {
      return;
    }
    this.sockets.splice(pos, 1);
    var pending = this.requests.shift();
    if (pending) {
      this.createSocket(pending, function(socket2) {
        pending.request.onSocket(socket2);
      });
    }
  };
  function createSecureSocket(options, cb) {
    var self = this;
    TunnelingAgent.prototype.createSocket.call(self, options, function(socket) {
      var hostHeader = options.request.getHeader("host");
      var tlsOptions = mergeOptions({}, self.options, {
        socket,
        servername: hostHeader ? hostHeader.replace(/:.*$/, "") : options.host
      });
      var secureSocket = tls.connect(0, tlsOptions);
      self.sockets[self.sockets.indexOf(socket)] = secureSocket;
      cb(secureSocket);
    });
  }
  function toOptions(host, port, localAddress) {
    if (typeof host === "string") {
      return {
        host,
        port,
        localAddress
      };
    }
    return host;
  }
  function mergeOptions(target) {
    for (var i = 1, len = arguments.length; i < len; ++i) {
      var overrides = arguments[i];
      if (typeof overrides === "object") {
        var keys = Object.keys(overrides);
        for (var j = 0, keyLen = keys.length; j < keyLen; ++j) {
          var k = keys[j];
          if (overrides[k] !== void 0) {
            target[k] = overrides[k];
          }
        }
      }
    }
    return target;
  }
  var debug;
  if (process.env.NODE_DEBUG && /\btunnel\b/.test(process.env.NODE_DEBUG)) {
    debug = function() {
      var args = Array.prototype.slice.call(arguments);
      if (typeof args[0] === "string") {
        args[0] = "TUNNEL: " + args[0];
      } else {
        args.unshift("TUNNEL:");
      }
      console.error.apply(console, args);
    };
  } else {
    debug = function() {
    };
  }
  exports2.debug = debug;
});

// node_modules/tunnel/index.js
var require_tunnel2 = __commonJS((exports2, module2) => {
  module2.exports = require_tunnel();
});

// node_modules/@actions/http-client/index.js
var require_http_client = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var http = require("http");
  var https = require("https");
  var pm = require_proxy();
  var tunnel;
  var HttpCodes;
  (function(HttpCodes2) {
    HttpCodes2[HttpCodes2["OK"] = 200] = "OK";
    HttpCodes2[HttpCodes2["MultipleChoices"] = 300] = "MultipleChoices";
    HttpCodes2[HttpCodes2["MovedPermanently"] = 301] = "MovedPermanently";
    HttpCodes2[HttpCodes2["ResourceMoved"] = 302] = "ResourceMoved";
    HttpCodes2[HttpCodes2["SeeOther"] = 303] = "SeeOther";
    HttpCodes2[HttpCodes2["NotModified"] = 304] = "NotModified";
    HttpCodes2[HttpCodes2["UseProxy"] = 305] = "UseProxy";
    HttpCodes2[HttpCodes2["SwitchProxy"] = 306] = "SwitchProxy";
    HttpCodes2[HttpCodes2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    HttpCodes2[HttpCodes2["PermanentRedirect"] = 308] = "PermanentRedirect";
    HttpCodes2[HttpCodes2["BadRequest"] = 400] = "BadRequest";
    HttpCodes2[HttpCodes2["Unauthorized"] = 401] = "Unauthorized";
    HttpCodes2[HttpCodes2["PaymentRequired"] = 402] = "PaymentRequired";
    HttpCodes2[HttpCodes2["Forbidden"] = 403] = "Forbidden";
    HttpCodes2[HttpCodes2["NotFound"] = 404] = "NotFound";
    HttpCodes2[HttpCodes2["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    HttpCodes2[HttpCodes2["NotAcceptable"] = 406] = "NotAcceptable";
    HttpCodes2[HttpCodes2["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    HttpCodes2[HttpCodes2["RequestTimeout"] = 408] = "RequestTimeout";
    HttpCodes2[HttpCodes2["Conflict"] = 409] = "Conflict";
    HttpCodes2[HttpCodes2["Gone"] = 410] = "Gone";
    HttpCodes2[HttpCodes2["TooManyRequests"] = 429] = "TooManyRequests";
    HttpCodes2[HttpCodes2["InternalServerError"] = 500] = "InternalServerError";
    HttpCodes2[HttpCodes2["NotImplemented"] = 501] = "NotImplemented";
    HttpCodes2[HttpCodes2["BadGateway"] = 502] = "BadGateway";
    HttpCodes2[HttpCodes2["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    HttpCodes2[HttpCodes2["GatewayTimeout"] = 504] = "GatewayTimeout";
  })(HttpCodes = exports2.HttpCodes || (exports2.HttpCodes = {}));
  var Headers;
  (function(Headers2) {
    Headers2["Accept"] = "accept";
    Headers2["ContentType"] = "content-type";
  })(Headers = exports2.Headers || (exports2.Headers = {}));
  var MediaTypes;
  (function(MediaTypes2) {
    MediaTypes2["ApplicationJson"] = "application/json";
  })(MediaTypes = exports2.MediaTypes || (exports2.MediaTypes = {}));
  function getProxyUrl(serverUrl) {
    let proxyUrl = pm.getProxyUrl(new URL(serverUrl));
    return proxyUrl ? proxyUrl.href : "";
  }
  exports2.getProxyUrl = getProxyUrl;
  var HttpRedirectCodes = [
    HttpCodes.MovedPermanently,
    HttpCodes.ResourceMoved,
    HttpCodes.SeeOther,
    HttpCodes.TemporaryRedirect,
    HttpCodes.PermanentRedirect
  ];
  var HttpResponseRetryCodes = [
    HttpCodes.BadGateway,
    HttpCodes.ServiceUnavailable,
    HttpCodes.GatewayTimeout
  ];
  var RetryableHttpVerbs = ["OPTIONS", "GET", "DELETE", "HEAD"];
  var ExponentialBackoffCeiling = 10;
  var ExponentialBackoffTimeSlice = 5;
  var HttpClientError = class extends Error {
    constructor(message, statusCode) {
      super(message);
      this.name = "HttpClientError";
      this.statusCode = statusCode;
      Object.setPrototypeOf(this, HttpClientError.prototype);
    }
  };
  exports2.HttpClientError = HttpClientError;
  var HttpClientResponse = class {
    constructor(message) {
      this.message = message;
    }
    readBody() {
      return new Promise(async (resolve2, reject) => {
        let output = Buffer.alloc(0);
        this.message.on("data", (chunk) => {
          output = Buffer.concat([output, chunk]);
        });
        this.message.on("end", () => {
          resolve2(output.toString());
        });
      });
    }
  };
  exports2.HttpClientResponse = HttpClientResponse;
  function isHttps(requestUrl) {
    let parsedUrl = new URL(requestUrl);
    return parsedUrl.protocol === "https:";
  }
  exports2.isHttps = isHttps;
  var HttpClient = class {
    constructor(userAgent, handlers, requestOptions) {
      this._ignoreSslError = false;
      this._allowRedirects = true;
      this._allowRedirectDowngrade = false;
      this._maxRedirects = 50;
      this._allowRetries = false;
      this._maxRetries = 1;
      this._keepAlive = false;
      this._disposed = false;
      this.userAgent = userAgent;
      this.handlers = handlers || [];
      this.requestOptions = requestOptions;
      if (requestOptions) {
        if (requestOptions.ignoreSslError != null) {
          this._ignoreSslError = requestOptions.ignoreSslError;
        }
        this._socketTimeout = requestOptions.socketTimeout;
        if (requestOptions.allowRedirects != null) {
          this._allowRedirects = requestOptions.allowRedirects;
        }
        if (requestOptions.allowRedirectDowngrade != null) {
          this._allowRedirectDowngrade = requestOptions.allowRedirectDowngrade;
        }
        if (requestOptions.maxRedirects != null) {
          this._maxRedirects = Math.max(requestOptions.maxRedirects, 0);
        }
        if (requestOptions.keepAlive != null) {
          this._keepAlive = requestOptions.keepAlive;
        }
        if (requestOptions.allowRetries != null) {
          this._allowRetries = requestOptions.allowRetries;
        }
        if (requestOptions.maxRetries != null) {
          this._maxRetries = requestOptions.maxRetries;
        }
      }
    }
    options(requestUrl, additionalHeaders) {
      return this.request("OPTIONS", requestUrl, null, additionalHeaders || {});
    }
    get(requestUrl, additionalHeaders) {
      return this.request("GET", requestUrl, null, additionalHeaders || {});
    }
    del(requestUrl, additionalHeaders) {
      return this.request("DELETE", requestUrl, null, additionalHeaders || {});
    }
    post(requestUrl, data, additionalHeaders) {
      return this.request("POST", requestUrl, data, additionalHeaders || {});
    }
    patch(requestUrl, data, additionalHeaders) {
      return this.request("PATCH", requestUrl, data, additionalHeaders || {});
    }
    put(requestUrl, data, additionalHeaders) {
      return this.request("PUT", requestUrl, data, additionalHeaders || {});
    }
    head(requestUrl, additionalHeaders) {
      return this.request("HEAD", requestUrl, null, additionalHeaders || {});
    }
    sendStream(verb, requestUrl, stream, additionalHeaders) {
      return this.request(verb, requestUrl, stream, additionalHeaders);
    }
    async getJson(requestUrl, additionalHeaders = {}) {
      additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
      let res = await this.get(requestUrl, additionalHeaders);
      return this._processResponse(res, this.requestOptions);
    }
    async postJson(requestUrl, obj, additionalHeaders = {}) {
      let data = JSON.stringify(obj, null, 2);
      additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
      additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
      let res = await this.post(requestUrl, data, additionalHeaders);
      return this._processResponse(res, this.requestOptions);
    }
    async putJson(requestUrl, obj, additionalHeaders = {}) {
      let data = JSON.stringify(obj, null, 2);
      additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
      additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
      let res = await this.put(requestUrl, data, additionalHeaders);
      return this._processResponse(res, this.requestOptions);
    }
    async patchJson(requestUrl, obj, additionalHeaders = {}) {
      let data = JSON.stringify(obj, null, 2);
      additionalHeaders[Headers.Accept] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.Accept, MediaTypes.ApplicationJson);
      additionalHeaders[Headers.ContentType] = this._getExistingOrDefaultHeader(additionalHeaders, Headers.ContentType, MediaTypes.ApplicationJson);
      let res = await this.patch(requestUrl, data, additionalHeaders);
      return this._processResponse(res, this.requestOptions);
    }
    async request(verb, requestUrl, data, headers) {
      if (this._disposed) {
        throw new Error("Client has already been disposed.");
      }
      let parsedUrl = new URL(requestUrl);
      let info3 = this._prepareRequest(verb, parsedUrl, headers);
      let maxTries = this._allowRetries && RetryableHttpVerbs.indexOf(verb) != -1 ? this._maxRetries + 1 : 1;
      let numTries = 0;
      let response;
      while (numTries < maxTries) {
        response = await this.requestRaw(info3, data);
        if (response && response.message && response.message.statusCode === HttpCodes.Unauthorized) {
          let authenticationHandler;
          for (let i = 0; i < this.handlers.length; i++) {
            if (this.handlers[i].canHandleAuthentication(response)) {
              authenticationHandler = this.handlers[i];
              break;
            }
          }
          if (authenticationHandler) {
            return authenticationHandler.handleAuthentication(this, info3, data);
          } else {
            return response;
          }
        }
        let redirectsRemaining = this._maxRedirects;
        while (HttpRedirectCodes.indexOf(response.message.statusCode) != -1 && this._allowRedirects && redirectsRemaining > 0) {
          const redirectUrl = response.message.headers["location"];
          if (!redirectUrl) {
            break;
          }
          let parsedRedirectUrl = new URL(redirectUrl);
          if (parsedUrl.protocol == "https:" && parsedUrl.protocol != parsedRedirectUrl.protocol && !this._allowRedirectDowngrade) {
            throw new Error("Redirect from HTTPS to HTTP protocol. This downgrade is not allowed for security reasons. If you want to allow this behavior, set the allowRedirectDowngrade option to true.");
          }
          await response.readBody();
          if (parsedRedirectUrl.hostname !== parsedUrl.hostname) {
            for (let header in headers) {
              if (header.toLowerCase() === "authorization") {
                delete headers[header];
              }
            }
          }
          info3 = this._prepareRequest(verb, parsedRedirectUrl, headers);
          response = await this.requestRaw(info3, data);
          redirectsRemaining--;
        }
        if (HttpResponseRetryCodes.indexOf(response.message.statusCode) == -1) {
          return response;
        }
        numTries += 1;
        if (numTries < maxTries) {
          await response.readBody();
          await this._performExponentialBackoff(numTries);
        }
      }
      return response;
    }
    dispose() {
      if (this._agent) {
        this._agent.destroy();
      }
      this._disposed = true;
    }
    requestRaw(info3, data) {
      return new Promise((resolve2, reject) => {
        let callbackForResult = function(err, res) {
          if (err) {
            reject(err);
          }
          resolve2(res);
        };
        this.requestRawWithCallback(info3, data, callbackForResult);
      });
    }
    requestRawWithCallback(info3, data, onResult) {
      let socket;
      if (typeof data === "string") {
        info3.options.headers["Content-Length"] = Buffer.byteLength(data, "utf8");
      }
      let callbackCalled = false;
      let handleResult = (err, res) => {
        if (!callbackCalled) {
          callbackCalled = true;
          onResult(err, res);
        }
      };
      let req = info3.httpModule.request(info3.options, (msg) => {
        let res = new HttpClientResponse(msg);
        handleResult(null, res);
      });
      req.on("socket", (sock) => {
        socket = sock;
      });
      req.setTimeout(this._socketTimeout || 3 * 6e4, () => {
        if (socket) {
          socket.end();
        }
        handleResult(new Error("Request timeout: " + info3.options.path), null);
      });
      req.on("error", function(err) {
        handleResult(err, null);
      });
      if (data && typeof data === "string") {
        req.write(data, "utf8");
      }
      if (data && typeof data !== "string") {
        data.on("close", function() {
          req.end();
        });
        data.pipe(req);
      } else {
        req.end();
      }
    }
    getAgent(serverUrl) {
      let parsedUrl = new URL(serverUrl);
      return this._getAgent(parsedUrl);
    }
    _prepareRequest(method, requestUrl, headers) {
      const info3 = {};
      info3.parsedUrl = requestUrl;
      const usingSsl = info3.parsedUrl.protocol === "https:";
      info3.httpModule = usingSsl ? https : http;
      const defaultPort = usingSsl ? 443 : 80;
      info3.options = {};
      info3.options.host = info3.parsedUrl.hostname;
      info3.options.port = info3.parsedUrl.port ? parseInt(info3.parsedUrl.port) : defaultPort;
      info3.options.path = (info3.parsedUrl.pathname || "") + (info3.parsedUrl.search || "");
      info3.options.method = method;
      info3.options.headers = this._mergeHeaders(headers);
      if (this.userAgent != null) {
        info3.options.headers["user-agent"] = this.userAgent;
      }
      info3.options.agent = this._getAgent(info3.parsedUrl);
      if (this.handlers) {
        this.handlers.forEach((handler) => {
          handler.prepareRequest(info3.options);
        });
      }
      return info3;
    }
    _mergeHeaders(headers) {
      const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
      if (this.requestOptions && this.requestOptions.headers) {
        return Object.assign({}, lowercaseKeys(this.requestOptions.headers), lowercaseKeys(headers));
      }
      return lowercaseKeys(headers || {});
    }
    _getExistingOrDefaultHeader(additionalHeaders, header, _default) {
      const lowercaseKeys = (obj) => Object.keys(obj).reduce((c, k) => (c[k.toLowerCase()] = obj[k], c), {});
      let clientHeader;
      if (this.requestOptions && this.requestOptions.headers) {
        clientHeader = lowercaseKeys(this.requestOptions.headers)[header];
      }
      return additionalHeaders[header] || clientHeader || _default;
    }
    _getAgent(parsedUrl) {
      let agent;
      let proxyUrl = pm.getProxyUrl(parsedUrl);
      let useProxy = proxyUrl && proxyUrl.hostname;
      if (this._keepAlive && useProxy) {
        agent = this._proxyAgent;
      }
      if (this._keepAlive && !useProxy) {
        agent = this._agent;
      }
      if (!!agent) {
        return agent;
      }
      const usingSsl = parsedUrl.protocol === "https:";
      let maxSockets = 100;
      if (!!this.requestOptions) {
        maxSockets = this.requestOptions.maxSockets || http.globalAgent.maxSockets;
      }
      if (useProxy) {
        if (!tunnel) {
          tunnel = require_tunnel2();
        }
        const agentOptions = {
          maxSockets,
          keepAlive: this._keepAlive,
          proxy: {
            proxyAuth: `${proxyUrl.username}:${proxyUrl.password}`,
            host: proxyUrl.hostname,
            port: proxyUrl.port
          }
        };
        let tunnelAgent;
        const overHttps = proxyUrl.protocol === "https:";
        if (usingSsl) {
          tunnelAgent = overHttps ? tunnel.httpsOverHttps : tunnel.httpsOverHttp;
        } else {
          tunnelAgent = overHttps ? tunnel.httpOverHttps : tunnel.httpOverHttp;
        }
        agent = tunnelAgent(agentOptions);
        this._proxyAgent = agent;
      }
      if (this._keepAlive && !agent) {
        const options = {keepAlive: this._keepAlive, maxSockets};
        agent = usingSsl ? new https.Agent(options) : new http.Agent(options);
        this._agent = agent;
      }
      if (!agent) {
        agent = usingSsl ? https.globalAgent : http.globalAgent;
      }
      if (usingSsl && this._ignoreSslError) {
        agent.options = Object.assign(agent.options || {}, {
          rejectUnauthorized: false
        });
      }
      return agent;
    }
    _performExponentialBackoff(retryNumber) {
      retryNumber = Math.min(ExponentialBackoffCeiling, retryNumber);
      const ms = ExponentialBackoffTimeSlice * Math.pow(2, retryNumber);
      return new Promise((resolve2) => setTimeout(() => resolve2(), ms));
    }
    static dateTimeDeserializer(key, value) {
      if (typeof value === "string") {
        let a = new Date(value);
        if (!isNaN(a.valueOf())) {
          return a;
        }
      }
      return value;
    }
    async _processResponse(res, options) {
      return new Promise(async (resolve2, reject) => {
        const statusCode = res.message.statusCode;
        const response = {
          statusCode,
          result: null,
          headers: {}
        };
        if (statusCode == HttpCodes.NotFound) {
          resolve2(response);
        }
        let obj;
        let contents;
        try {
          contents = await res.readBody();
          if (contents && contents.length > 0) {
            if (options && options.deserializeDates) {
              obj = JSON.parse(contents, HttpClient.dateTimeDeserializer);
            } else {
              obj = JSON.parse(contents);
            }
            response.result = obj;
          }
          response.headers = res.message.headers;
        } catch (err) {
        }
        if (statusCode > 299) {
          let msg;
          if (obj && obj.message) {
            msg = obj.message;
          } else if (contents && contents.length > 0) {
            msg = contents;
          } else {
            msg = "Failed request: (" + statusCode + ")";
          }
          let err = new HttpClientError(msg, statusCode);
          err.result = response.result;
          reject(err);
        } else {
          resolve2(response);
        }
      });
    }
  };
  exports2.HttpClient = HttpClient;
});

// node_modules/@actions/http-client/auth.js
var require_auth = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var BasicCredentialHandler = class {
    constructor(username, password) {
      this.username = username;
      this.password = password;
    }
    prepareRequest(options) {
      options.headers["Authorization"] = "Basic " + Buffer.from(this.username + ":" + this.password).toString("base64");
    }
    canHandleAuthentication(response) {
      return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
      return null;
    }
  };
  exports2.BasicCredentialHandler = BasicCredentialHandler;
  var BearerCredentialHandler = class {
    constructor(token) {
      this.token = token;
    }
    prepareRequest(options) {
      options.headers["Authorization"] = "Bearer " + this.token;
    }
    canHandleAuthentication(response) {
      return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
      return null;
    }
  };
  exports2.BearerCredentialHandler = BearerCredentialHandler;
  var PersonalAccessTokenCredentialHandler = class {
    constructor(token) {
      this.token = token;
    }
    prepareRequest(options) {
      options.headers["Authorization"] = "Basic " + Buffer.from("PAT:" + this.token).toString("base64");
    }
    canHandleAuthentication(response) {
      return false;
    }
    handleAuthentication(httpClient, requestInfo, objs) {
      return null;
    }
  };
  exports2.PersonalAccessTokenCredentialHandler = PersonalAccessTokenCredentialHandler;
});

// node_modules/@actions/artifact/lib/internal/config-variables.js
var require_config_variables = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  function getUploadFileConcurrency() {
    return 2;
  }
  exports2.getUploadFileConcurrency = getUploadFileConcurrency;
  function getUploadChunkSize() {
    return 8 * 1024 * 1024;
  }
  exports2.getUploadChunkSize = getUploadChunkSize;
  function getRetryLimit() {
    return 5;
  }
  exports2.getRetryLimit = getRetryLimit;
  function getRetryMultiplier() {
    return 1.5;
  }
  exports2.getRetryMultiplier = getRetryMultiplier;
  function getInitialRetryIntervalInMilliseconds() {
    return 3e3;
  }
  exports2.getInitialRetryIntervalInMilliseconds = getInitialRetryIntervalInMilliseconds;
  function getDownloadFileConcurrency() {
    return 2;
  }
  exports2.getDownloadFileConcurrency = getDownloadFileConcurrency;
  function getRuntimeToken() {
    const token = process.env["ACTIONS_RUNTIME_TOKEN"];
    if (!token) {
      throw new Error("Unable to get ACTIONS_RUNTIME_TOKEN env variable");
    }
    return token;
  }
  exports2.getRuntimeToken = getRuntimeToken;
  function getRuntimeUrl() {
    const runtimeUrl = process.env["ACTIONS_RUNTIME_URL"];
    if (!runtimeUrl) {
      throw new Error("Unable to get ACTIONS_RUNTIME_URL env variable");
    }
    return runtimeUrl;
  }
  exports2.getRuntimeUrl = getRuntimeUrl;
  function getWorkFlowRunId() {
    const workFlowRunId = process.env["GITHUB_RUN_ID"];
    if (!workFlowRunId) {
      throw new Error("Unable to get GITHUB_RUN_ID env variable");
    }
    return workFlowRunId;
  }
  exports2.getWorkFlowRunId = getWorkFlowRunId;
  function getWorkSpaceDirectory() {
    const workspaceDirectory = process.env["GITHUB_WORKSPACE"];
    if (!workspaceDirectory) {
      throw new Error("Unable to get GITHUB_WORKSPACE env variable");
    }
    return workspaceDirectory;
  }
  exports2.getWorkSpaceDirectory = getWorkSpaceDirectory;
  function getRetentionDays() {
    return process.env["GITHUB_RETENTION_DAYS"];
  }
  exports2.getRetentionDays = getRetentionDays;
});

// node_modules/@actions/artifact/lib/internal/utils.js
var require_utils2 = __commonJS((exports2) => {
  "use strict";
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var core_1 = require_core();
  var fs_1 = require("fs");
  var http_client_1 = require_http_client();
  var auth_1 = require_auth();
  var config_variables_1 = require_config_variables();
  function getExponentialRetryTimeInMilliseconds(retryCount) {
    if (retryCount < 0) {
      throw new Error("RetryCount should not be negative");
    } else if (retryCount === 0) {
      return config_variables_1.getInitialRetryIntervalInMilliseconds();
    }
    const minTime = config_variables_1.getInitialRetryIntervalInMilliseconds() * config_variables_1.getRetryMultiplier() * retryCount;
    const maxTime = minTime * config_variables_1.getRetryMultiplier();
    return Math.random() * (maxTime - minTime) + minTime;
  }
  exports2.getExponentialRetryTimeInMilliseconds = getExponentialRetryTimeInMilliseconds;
  function parseEnvNumber(key) {
    const value = Number(process.env[key]);
    if (Number.isNaN(value) || value < 0) {
      return void 0;
    }
    return value;
  }
  exports2.parseEnvNumber = parseEnvNumber;
  function getApiVersion() {
    return "6.0-preview";
  }
  exports2.getApiVersion = getApiVersion;
  function isSuccessStatusCode(statusCode) {
    if (!statusCode) {
      return false;
    }
    return statusCode >= 200 && statusCode < 300;
  }
  exports2.isSuccessStatusCode = isSuccessStatusCode;
  function isForbiddenStatusCode(statusCode) {
    if (!statusCode) {
      return false;
    }
    return statusCode === http_client_1.HttpCodes.Forbidden;
  }
  exports2.isForbiddenStatusCode = isForbiddenStatusCode;
  function isRetryableStatusCode(statusCode) {
    if (!statusCode) {
      return false;
    }
    const retryableStatusCodes = [
      http_client_1.HttpCodes.BadGateway,
      http_client_1.HttpCodes.ServiceUnavailable,
      http_client_1.HttpCodes.GatewayTimeout,
      http_client_1.HttpCodes.TooManyRequests,
      413
    ];
    return retryableStatusCodes.includes(statusCode);
  }
  exports2.isRetryableStatusCode = isRetryableStatusCode;
  function isThrottledStatusCode(statusCode) {
    if (!statusCode) {
      return false;
    }
    return statusCode === http_client_1.HttpCodes.TooManyRequests;
  }
  exports2.isThrottledStatusCode = isThrottledStatusCode;
  function tryGetRetryAfterValueTimeInMilliseconds(headers) {
    if (headers["retry-after"]) {
      const retryTime = Number(headers["retry-after"]);
      if (!isNaN(retryTime)) {
        core_1.info(`Retry-After header is present with a value of ${retryTime}`);
        return retryTime * 1e3;
      }
      core_1.info(`Returned retry-after header value: ${retryTime} is non-numeric and cannot be used`);
      return void 0;
    }
    core_1.info(`No retry-after header was found. Dumping all headers for diagnostic purposes`);
    console.log(headers);
    return void 0;
  }
  exports2.tryGetRetryAfterValueTimeInMilliseconds = tryGetRetryAfterValueTimeInMilliseconds;
  function getContentRange(start, end, total) {
    return `bytes ${start}-${end}/${total}`;
  }
  exports2.getContentRange = getContentRange;
  function getDownloadHeaders(contentType, isKeepAlive, acceptGzip) {
    const requestOptions = {};
    if (contentType) {
      requestOptions["Content-Type"] = contentType;
    }
    if (isKeepAlive) {
      requestOptions["Connection"] = "Keep-Alive";
      requestOptions["Keep-Alive"] = "10";
    }
    if (acceptGzip) {
      requestOptions["Accept-Encoding"] = "gzip";
      requestOptions["Accept"] = `application/octet-stream;api-version=${getApiVersion()}`;
    } else {
      requestOptions["Accept"] = `application/json;api-version=${getApiVersion()}`;
    }
    return requestOptions;
  }
  exports2.getDownloadHeaders = getDownloadHeaders;
  function getUploadHeaders(contentType, isKeepAlive, isGzip, uncompressedLength, contentLength, contentRange) {
    const requestOptions = {};
    requestOptions["Accept"] = `application/json;api-version=${getApiVersion()}`;
    if (contentType) {
      requestOptions["Content-Type"] = contentType;
    }
    if (isKeepAlive) {
      requestOptions["Connection"] = "Keep-Alive";
      requestOptions["Keep-Alive"] = "10";
    }
    if (isGzip) {
      requestOptions["Content-Encoding"] = "gzip";
      requestOptions["x-tfs-filelength"] = uncompressedLength;
    }
    if (contentLength) {
      requestOptions["Content-Length"] = contentLength;
    }
    if (contentRange) {
      requestOptions["Content-Range"] = contentRange;
    }
    return requestOptions;
  }
  exports2.getUploadHeaders = getUploadHeaders;
  function createHttpClient(userAgent) {
    return new http_client_1.HttpClient(userAgent, [
      new auth_1.BearerCredentialHandler(config_variables_1.getRuntimeToken())
    ]);
  }
  exports2.createHttpClient = createHttpClient;
  function getArtifactUrl() {
    const artifactUrl = `${config_variables_1.getRuntimeUrl()}_apis/pipelines/workflows/${config_variables_1.getWorkFlowRunId()}/artifacts?api-version=${getApiVersion()}`;
    core_1.debug(`Artifact Url: ${artifactUrl}`);
    return artifactUrl;
  }
  exports2.getArtifactUrl = getArtifactUrl;
  function displayHttpDiagnostics(response) {
    core_1.info(`##### Begin Diagnostic HTTP information #####
Status Code: ${response.message.statusCode}
Status Message: ${response.message.statusMessage}
Header Information: ${JSON.stringify(response.message.headers, void 0, 2)}
###### End Diagnostic HTTP information ######`);
  }
  exports2.displayHttpDiagnostics = displayHttpDiagnostics;
  var invalidArtifactFilePathCharacters = ['"', ":", "<", ">", "|", "*", "?"];
  var invalidArtifactNameCharacters = [
    ...invalidArtifactFilePathCharacters,
    "\\",
    "/"
  ];
  function checkArtifactName(name) {
    if (!name) {
      throw new Error(`Artifact name: ${name}, is incorrectly provided`);
    }
    for (const invalidChar of invalidArtifactNameCharacters) {
      if (name.includes(invalidChar)) {
        throw new Error(`Artifact name is not valid: ${name}. Contains character: "${invalidChar}". Invalid artifact name characters include: ${invalidArtifactNameCharacters.toString()}.`);
      }
    }
  }
  exports2.checkArtifactName = checkArtifactName;
  function checkArtifactFilePath(path) {
    if (!path) {
      throw new Error(`Artifact path: ${path}, is incorrectly provided`);
    }
    for (const invalidChar of invalidArtifactFilePathCharacters) {
      if (path.includes(invalidChar)) {
        throw new Error(`Artifact path is not valid: ${path}. Contains character: "${invalidChar}". Invalid characters include: ${invalidArtifactFilePathCharacters.toString()}.`);
      }
    }
  }
  exports2.checkArtifactFilePath = checkArtifactFilePath;
  function createDirectoriesForArtifact(directories) {
    return __awaiter(this, void 0, void 0, function* () {
      for (const directory of directories) {
        yield fs_1.promises.mkdir(directory, {
          recursive: true
        });
      }
    });
  }
  exports2.createDirectoriesForArtifact = createDirectoriesForArtifact;
  function createEmptyFilesForArtifact(emptyFilesToCreate) {
    return __awaiter(this, void 0, void 0, function* () {
      for (const filePath of emptyFilesToCreate) {
        yield (yield fs_1.promises.open(filePath, "w")).close();
      }
    });
  }
  exports2.createEmptyFilesForArtifact = createEmptyFilesForArtifact;
  function getFileSize(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
      const stats = yield fs_1.promises.stat(filePath);
      core_1.debug(`${filePath} size:(${stats.size}) blksize:(${stats.blksize}) blocks:(${stats.blocks})`);
      return stats.size;
    });
  }
  exports2.getFileSize = getFileSize;
  function rmFile(filePath) {
    return __awaiter(this, void 0, void 0, function* () {
      yield fs_1.promises.unlink(filePath);
    });
  }
  exports2.rmFile = rmFile;
  function getProperRetention(retentionInput, retentionSetting) {
    if (retentionInput < 0) {
      throw new Error("Invalid retention, minimum value is 1.");
    }
    let retention = retentionInput;
    if (retentionSetting) {
      const maxRetention = parseInt(retentionSetting);
      if (!isNaN(maxRetention) && maxRetention < retention) {
        core_1.warning(`Retention days is greater than the max value allowed by the repository setting, reduce retention to ${maxRetention} days`);
        retention = maxRetention;
      }
    }
    return retention;
  }
  exports2.getProperRetention = getProperRetention;
  function sleep(milliseconds) {
    return __awaiter(this, void 0, void 0, function* () {
      return new Promise((resolve2) => setTimeout(resolve2, milliseconds));
    });
  }
  exports2.sleep = sleep;
});

// node_modules/@actions/artifact/lib/internal/upload-specification.js
var require_upload_specification = __commonJS((exports2) => {
  "use strict";
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var fs = __importStar(require("fs"));
  var core_1 = require_core();
  var path_1 = require("path");
  var utils_1 = require_utils2();
  function getUploadSpecification(artifactName, rootDirectory, artifactFiles) {
    utils_1.checkArtifactName(artifactName);
    const specifications = [];
    if (!fs.existsSync(rootDirectory)) {
      throw new Error(`Provided rootDirectory ${rootDirectory} does not exist`);
    }
    if (!fs.lstatSync(rootDirectory).isDirectory()) {
      throw new Error(`Provided rootDirectory ${rootDirectory} is not a valid directory`);
    }
    rootDirectory = path_1.normalize(rootDirectory);
    rootDirectory = path_1.resolve(rootDirectory);
    for (let file of artifactFiles) {
      if (!fs.existsSync(file)) {
        throw new Error(`File ${file} does not exist`);
      }
      if (!fs.lstatSync(file).isDirectory()) {
        file = path_1.normalize(file);
        file = path_1.resolve(file);
        if (!file.startsWith(rootDirectory)) {
          throw new Error(`The rootDirectory: ${rootDirectory} is not a parent directory of the file: ${file}`);
        }
        const uploadPath = file.replace(rootDirectory, "");
        utils_1.checkArtifactFilePath(uploadPath);
        specifications.push({
          absoluteFilePath: file,
          uploadFilePath: path_1.join(artifactName, uploadPath)
        });
      } else {
        core_1.debug(`Removing ${file} from rawSearchResults because it is a directory`);
      }
    }
    return specifications;
  }
  exports2.getUploadSpecification = getUploadSpecification;
});

// node_modules/fs.realpath/old.js
var require_old = __commonJS((exports2) => {
  var pathModule = require("path");
  var isWindows = process.platform === "win32";
  var fs = require("fs");
  var DEBUG = process.env.NODE_DEBUG && /fs/.test(process.env.NODE_DEBUG);
  function rethrow() {
    var callback;
    if (DEBUG) {
      var backtrace = new Error();
      callback = debugCallback;
    } else
      callback = missingCallback;
    return callback;
    function debugCallback(err) {
      if (err) {
        backtrace.message = err.message;
        err = backtrace;
        missingCallback(err);
      }
    }
    function missingCallback(err) {
      if (err) {
        if (process.throwDeprecation)
          throw err;
        else if (!process.noDeprecation) {
          var msg = "fs: missing callback " + (err.stack || err.message);
          if (process.traceDeprecation)
            console.trace(msg);
          else
            console.error(msg);
        }
      }
    }
  }
  function maybeCallback(cb) {
    return typeof cb === "function" ? cb : rethrow();
  }
  var normalize = pathModule.normalize;
  if (isWindows) {
    nextPartRe = /(.*?)(?:[\/\\]+|$)/g;
  } else {
    nextPartRe = /(.*?)(?:[\/]+|$)/g;
  }
  var nextPartRe;
  if (isWindows) {
    splitRootRe = /^(?:[a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/][^\\\/]+)?[\\\/]*/;
  } else {
    splitRootRe = /^[\/]*/;
  }
  var splitRootRe;
  exports2.realpathSync = function realpathSync(p, cache) {
    p = pathModule.resolve(p);
    if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
      return cache[p];
    }
    var original = p, seenLinks = {}, knownHard = {};
    var pos;
    var current;
    var base;
    var previous;
    start();
    function start() {
      var m = splitRootRe.exec(p);
      pos = m[0].length;
      current = m[0];
      base = m[0];
      previous = "";
      if (isWindows && !knownHard[base]) {
        fs.lstatSync(base);
        knownHard[base] = true;
      }
    }
    while (pos < p.length) {
      nextPartRe.lastIndex = pos;
      var result = nextPartRe.exec(p);
      previous = current;
      current += result[0];
      base = previous + result[1];
      pos = nextPartRe.lastIndex;
      if (knownHard[base] || cache && cache[base] === base) {
        continue;
      }
      var resolvedLink;
      if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
        resolvedLink = cache[base];
      } else {
        var stat = fs.lstatSync(base);
        if (!stat.isSymbolicLink()) {
          knownHard[base] = true;
          if (cache)
            cache[base] = base;
          continue;
        }
        var linkTarget = null;
        if (!isWindows) {
          var id = stat.dev.toString(32) + ":" + stat.ino.toString(32);
          if (seenLinks.hasOwnProperty(id)) {
            linkTarget = seenLinks[id];
          }
        }
        if (linkTarget === null) {
          fs.statSync(base);
          linkTarget = fs.readlinkSync(base);
        }
        resolvedLink = pathModule.resolve(previous, linkTarget);
        if (cache)
          cache[base] = resolvedLink;
        if (!isWindows)
          seenLinks[id] = linkTarget;
      }
      p = pathModule.resolve(resolvedLink, p.slice(pos));
      start();
    }
    if (cache)
      cache[original] = p;
    return p;
  };
  exports2.realpath = function realpath(p, cache, cb) {
    if (typeof cb !== "function") {
      cb = maybeCallback(cache);
      cache = null;
    }
    p = pathModule.resolve(p);
    if (cache && Object.prototype.hasOwnProperty.call(cache, p)) {
      return process.nextTick(cb.bind(null, null, cache[p]));
    }
    var original = p, seenLinks = {}, knownHard = {};
    var pos;
    var current;
    var base;
    var previous;
    start();
    function start() {
      var m = splitRootRe.exec(p);
      pos = m[0].length;
      current = m[0];
      base = m[0];
      previous = "";
      if (isWindows && !knownHard[base]) {
        fs.lstat(base, function(err) {
          if (err)
            return cb(err);
          knownHard[base] = true;
          LOOP();
        });
      } else {
        process.nextTick(LOOP);
      }
    }
    function LOOP() {
      if (pos >= p.length) {
        if (cache)
          cache[original] = p;
        return cb(null, p);
      }
      nextPartRe.lastIndex = pos;
      var result = nextPartRe.exec(p);
      previous = current;
      current += result[0];
      base = previous + result[1];
      pos = nextPartRe.lastIndex;
      if (knownHard[base] || cache && cache[base] === base) {
        return process.nextTick(LOOP);
      }
      if (cache && Object.prototype.hasOwnProperty.call(cache, base)) {
        return gotResolvedLink(cache[base]);
      }
      return fs.lstat(base, gotStat);
    }
    function gotStat(err, stat) {
      if (err)
        return cb(err);
      if (!stat.isSymbolicLink()) {
        knownHard[base] = true;
        if (cache)
          cache[base] = base;
        return process.nextTick(LOOP);
      }
      if (!isWindows) {
        var id = stat.dev.toString(32) + ":" + stat.ino.toString(32);
        if (seenLinks.hasOwnProperty(id)) {
          return gotTarget(null, seenLinks[id], base);
        }
      }
      fs.stat(base, function(err2) {
        if (err2)
          return cb(err2);
        fs.readlink(base, function(err3, target) {
          if (!isWindows)
            seenLinks[id] = target;
          gotTarget(err3, target);
        });
      });
    }
    function gotTarget(err, target, base2) {
      if (err)
        return cb(err);
      var resolvedLink = pathModule.resolve(previous, target);
      if (cache)
        cache[base2] = resolvedLink;
      gotResolvedLink(resolvedLink);
    }
    function gotResolvedLink(resolvedLink) {
      p = pathModule.resolve(resolvedLink, p.slice(pos));
      start();
    }
  };
});

// node_modules/fs.realpath/index.js
var require_fs = __commonJS((exports2, module2) => {
  module2.exports = realpath;
  realpath.realpath = realpath;
  realpath.sync = realpathSync;
  realpath.realpathSync = realpathSync;
  realpath.monkeypatch = monkeypatch;
  realpath.unmonkeypatch = unmonkeypatch;
  var fs = require("fs");
  var origRealpath = fs.realpath;
  var origRealpathSync = fs.realpathSync;
  var version = process.version;
  var ok = /^v[0-5]\./.test(version);
  var old = require_old();
  function newError(er) {
    return er && er.syscall === "realpath" && (er.code === "ELOOP" || er.code === "ENOMEM" || er.code === "ENAMETOOLONG");
  }
  function realpath(p, cache, cb) {
    if (ok) {
      return origRealpath(p, cache, cb);
    }
    if (typeof cache === "function") {
      cb = cache;
      cache = null;
    }
    origRealpath(p, cache, function(er, result) {
      if (newError(er)) {
        old.realpath(p, cache, cb);
      } else {
        cb(er, result);
      }
    });
  }
  function realpathSync(p, cache) {
    if (ok) {
      return origRealpathSync(p, cache);
    }
    try {
      return origRealpathSync(p, cache);
    } catch (er) {
      if (newError(er)) {
        return old.realpathSync(p, cache);
      } else {
        throw er;
      }
    }
  }
  function monkeypatch() {
    fs.realpath = realpath;
    fs.realpathSync = realpathSync;
  }
  function unmonkeypatch() {
    fs.realpath = origRealpath;
    fs.realpathSync = origRealpathSync;
  }
});

// node_modules/concat-map/index.js
var require_concat_map = __commonJS((exports2, module2) => {
  module2.exports = function(xs, fn) {
    var res = [];
    for (var i = 0; i < xs.length; i++) {
      var x = fn(xs[i], i);
      if (isArray(x))
        res.push.apply(res, x);
      else
        res.push(x);
    }
    return res;
  };
  var isArray = Array.isArray || function(xs) {
    return Object.prototype.toString.call(xs) === "[object Array]";
  };
});

// node_modules/balanced-match/index.js
var require_balanced_match = __commonJS((exports2, module2) => {
  "use strict";
  module2.exports = balanced;
  function balanced(a, b, str) {
    if (a instanceof RegExp)
      a = maybeMatch(a, str);
    if (b instanceof RegExp)
      b = maybeMatch(b, str);
    var r = range(a, b, str);
    return r && {
      start: r[0],
      end: r[1],
      pre: str.slice(0, r[0]),
      body: str.slice(r[0] + a.length, r[1]),
      post: str.slice(r[1] + b.length)
    };
  }
  function maybeMatch(reg, str) {
    var m = str.match(reg);
    return m ? m[0] : null;
  }
  balanced.range = range;
  function range(a, b, str) {
    var begs, beg, left, right, result;
    var ai = str.indexOf(a);
    var bi = str.indexOf(b, ai + 1);
    var i = ai;
    if (ai >= 0 && bi > 0) {
      begs = [];
      left = str.length;
      while (i >= 0 && !result) {
        if (i == ai) {
          begs.push(i);
          ai = str.indexOf(a, i + 1);
        } else if (begs.length == 1) {
          result = [begs.pop(), bi];
        } else {
          beg = begs.pop();
          if (beg < left) {
            left = beg;
            right = bi;
          }
          bi = str.indexOf(b, i + 1);
        }
        i = ai < bi && ai >= 0 ? ai : bi;
      }
      if (begs.length) {
        result = [left, right];
      }
    }
    return result;
  }
});

// node_modules/brace-expansion/index.js
var require_brace_expansion = __commonJS((exports2, module2) => {
  var concatMap = require_concat_map();
  var balanced = require_balanced_match();
  module2.exports = expandTop;
  var escSlash = "\0SLASH" + Math.random() + "\0";
  var escOpen = "\0OPEN" + Math.random() + "\0";
  var escClose = "\0CLOSE" + Math.random() + "\0";
  var escComma = "\0COMMA" + Math.random() + "\0";
  var escPeriod = "\0PERIOD" + Math.random() + "\0";
  function numeric(str) {
    return parseInt(str, 10) == str ? parseInt(str, 10) : str.charCodeAt(0);
  }
  function escapeBraces(str) {
    return str.split("\\\\").join(escSlash).split("\\{").join(escOpen).split("\\}").join(escClose).split("\\,").join(escComma).split("\\.").join(escPeriod);
  }
  function unescapeBraces(str) {
    return str.split(escSlash).join("\\").split(escOpen).join("{").split(escClose).join("}").split(escComma).join(",").split(escPeriod).join(".");
  }
  function parseCommaParts(str) {
    if (!str)
      return [""];
    var parts = [];
    var m = balanced("{", "}", str);
    if (!m)
      return str.split(",");
    var pre = m.pre;
    var body = m.body;
    var post = m.post;
    var p = pre.split(",");
    p[p.length - 1] += "{" + body + "}";
    var postParts = parseCommaParts(post);
    if (post.length) {
      p[p.length - 1] += postParts.shift();
      p.push.apply(p, postParts);
    }
    parts.push.apply(parts, p);
    return parts;
  }
  function expandTop(str) {
    if (!str)
      return [];
    if (str.substr(0, 2) === "{}") {
      str = "\\{\\}" + str.substr(2);
    }
    return expand(escapeBraces(str), true).map(unescapeBraces);
  }
  function embrace(str) {
    return "{" + str + "}";
  }
  function isPadded(el) {
    return /^-?0\d/.test(el);
  }
  function lte(i, y) {
    return i <= y;
  }
  function gte(i, y) {
    return i >= y;
  }
  function expand(str, isTop) {
    var expansions = [];
    var m = balanced("{", "}", str);
    if (!m || /\$$/.test(m.pre))
      return [str];
    var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
    var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
    var isSequence = isNumericSequence || isAlphaSequence;
    var isOptions = m.body.indexOf(",") >= 0;
    if (!isSequence && !isOptions) {
      if (m.post.match(/,.*\}/)) {
        str = m.pre + "{" + m.body + escClose + m.post;
        return expand(str);
      }
      return [str];
    }
    var n;
    if (isSequence) {
      n = m.body.split(/\.\./);
    } else {
      n = parseCommaParts(m.body);
      if (n.length === 1) {
        n = expand(n[0], false).map(embrace);
        if (n.length === 1) {
          var post = m.post.length ? expand(m.post, false) : [""];
          return post.map(function(p) {
            return m.pre + n[0] + p;
          });
        }
      }
    }
    var pre = m.pre;
    var post = m.post.length ? expand(m.post, false) : [""];
    var N;
    if (isSequence) {
      var x = numeric(n[0]);
      var y = numeric(n[1]);
      var width = Math.max(n[0].length, n[1].length);
      var incr = n.length == 3 ? Math.abs(numeric(n[2])) : 1;
      var test = lte;
      var reverse = y < x;
      if (reverse) {
        incr *= -1;
        test = gte;
      }
      var pad = n.some(isPadded);
      N = [];
      for (var i = x; test(i, y); i += incr) {
        var c;
        if (isAlphaSequence) {
          c = String.fromCharCode(i);
          if (c === "\\")
            c = "";
        } else {
          c = String(i);
          if (pad) {
            var need = width - c.length;
            if (need > 0) {
              var z = new Array(need + 1).join("0");
              if (i < 0)
                c = "-" + z + c.slice(1);
              else
                c = z + c;
            }
          }
        }
        N.push(c);
      }
    } else {
      N = concatMap(n, function(el) {
        return expand(el, false);
      });
    }
    for (var j = 0; j < N.length; j++) {
      for (var k = 0; k < post.length; k++) {
        var expansion = pre + N[j] + post[k];
        if (!isTop || isSequence || expansion)
          expansions.push(expansion);
      }
    }
    return expansions;
  }
});

// node_modules/minimatch/minimatch.js
var require_minimatch = __commonJS((exports2, module2) => {
  module2.exports = minimatch;
  minimatch.Minimatch = Minimatch;
  var path = {sep: "/"};
  try {
    path = require("path");
  } catch (er) {
  }
  var GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {};
  var expand = require_brace_expansion();
  var plTypes = {
    "!": {open: "(?:(?!(?:", close: "))[^/]*?)"},
    "?": {open: "(?:", close: ")?"},
    "+": {open: "(?:", close: ")+"},
    "*": {open: "(?:", close: ")*"},
    "@": {open: "(?:", close: ")"}
  };
  var qmark = "[^/]";
  var star = qmark + "*?";
  var twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
  var twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
  var reSpecials = charSet("().*{}+?[]^$\\!");
  function charSet(s) {
    return s.split("").reduce(function(set, c) {
      set[c] = true;
      return set;
    }, {});
  }
  var slashSplit = /\/+/;
  minimatch.filter = filter;
  function filter(pattern, options) {
    options = options || {};
    return function(p, i, list) {
      return minimatch(p, pattern, options);
    };
  }
  function ext(a, b) {
    a = a || {};
    b = b || {};
    var t = {};
    Object.keys(b).forEach(function(k) {
      t[k] = b[k];
    });
    Object.keys(a).forEach(function(k) {
      t[k] = a[k];
    });
    return t;
  }
  minimatch.defaults = function(def) {
    if (!def || !Object.keys(def).length)
      return minimatch;
    var orig = minimatch;
    var m = function minimatch2(p, pattern, options) {
      return orig.minimatch(p, pattern, ext(def, options));
    };
    m.Minimatch = function Minimatch2(pattern, options) {
      return new orig.Minimatch(pattern, ext(def, options));
    };
    return m;
  };
  Minimatch.defaults = function(def) {
    if (!def || !Object.keys(def).length)
      return Minimatch;
    return minimatch.defaults(def).Minimatch;
  };
  function minimatch(p, pattern, options) {
    if (typeof pattern !== "string") {
      throw new TypeError("glob pattern string required");
    }
    if (!options)
      options = {};
    if (!options.nocomment && pattern.charAt(0) === "#") {
      return false;
    }
    if (pattern.trim() === "")
      return p === "";
    return new Minimatch(pattern, options).match(p);
  }
  function Minimatch(pattern, options) {
    if (!(this instanceof Minimatch)) {
      return new Minimatch(pattern, options);
    }
    if (typeof pattern !== "string") {
      throw new TypeError("glob pattern string required");
    }
    if (!options)
      options = {};
    pattern = pattern.trim();
    if (path.sep !== "/") {
      pattern = pattern.split(path.sep).join("/");
    }
    this.options = options;
    this.set = [];
    this.pattern = pattern;
    this.regexp = null;
    this.negate = false;
    this.comment = false;
    this.empty = false;
    this.make();
  }
  Minimatch.prototype.debug = function() {
  };
  Minimatch.prototype.make = make;
  function make() {
    if (this._made)
      return;
    var pattern = this.pattern;
    var options = this.options;
    if (!options.nocomment && pattern.charAt(0) === "#") {
      this.comment = true;
      return;
    }
    if (!pattern) {
      this.empty = true;
      return;
    }
    this.parseNegate();
    var set = this.globSet = this.braceExpand();
    if (options.debug)
      this.debug = console.error;
    this.debug(this.pattern, set);
    set = this.globParts = set.map(function(s) {
      return s.split(slashSplit);
    });
    this.debug(this.pattern, set);
    set = set.map(function(s, si, set2) {
      return s.map(this.parse, this);
    }, this);
    this.debug(this.pattern, set);
    set = set.filter(function(s) {
      return s.indexOf(false) === -1;
    });
    this.debug(this.pattern, set);
    this.set = set;
  }
  Minimatch.prototype.parseNegate = parseNegate;
  function parseNegate() {
    var pattern = this.pattern;
    var negate = false;
    var options = this.options;
    var negateOffset = 0;
    if (options.nonegate)
      return;
    for (var i = 0, l = pattern.length; i < l && pattern.charAt(i) === "!"; i++) {
      negate = !negate;
      negateOffset++;
    }
    if (negateOffset)
      this.pattern = pattern.substr(negateOffset);
    this.negate = negate;
  }
  minimatch.braceExpand = function(pattern, options) {
    return braceExpand(pattern, options);
  };
  Minimatch.prototype.braceExpand = braceExpand;
  function braceExpand(pattern, options) {
    if (!options) {
      if (this instanceof Minimatch) {
        options = this.options;
      } else {
        options = {};
      }
    }
    pattern = typeof pattern === "undefined" ? this.pattern : pattern;
    if (typeof pattern === "undefined") {
      throw new TypeError("undefined pattern");
    }
    if (options.nobrace || !pattern.match(/\{.*\}/)) {
      return [pattern];
    }
    return expand(pattern);
  }
  Minimatch.prototype.parse = parse;
  var SUBPARSE = {};
  function parse(pattern, isSub) {
    if (pattern.length > 1024 * 64) {
      throw new TypeError("pattern is too long");
    }
    var options = this.options;
    if (!options.noglobstar && pattern === "**")
      return GLOBSTAR;
    if (pattern === "")
      return "";
    var re = "";
    var hasMagic = !!options.nocase;
    var escaping = false;
    var patternListStack = [];
    var negativeLists = [];
    var stateChar;
    var inClass = false;
    var reClassStart = -1;
    var classStart = -1;
    var patternStart = pattern.charAt(0) === "." ? "" : options.dot ? "(?!(?:^|\\/)\\.{1,2}(?:$|\\/))" : "(?!\\.)";
    var self = this;
    function clearStateChar() {
      if (stateChar) {
        switch (stateChar) {
          case "*":
            re += star;
            hasMagic = true;
            break;
          case "?":
            re += qmark;
            hasMagic = true;
            break;
          default:
            re += "\\" + stateChar;
            break;
        }
        self.debug("clearStateChar %j %j", stateChar, re);
        stateChar = false;
      }
    }
    for (var i = 0, len = pattern.length, c; i < len && (c = pattern.charAt(i)); i++) {
      this.debug("%s	%s %s %j", pattern, i, re, c);
      if (escaping && reSpecials[c]) {
        re += "\\" + c;
        escaping = false;
        continue;
      }
      switch (c) {
        case "/":
          return false;
        case "\\":
          clearStateChar();
          escaping = true;
          continue;
        case "?":
        case "*":
        case "+":
        case "@":
        case "!":
          this.debug("%s	%s %s %j <-- stateChar", pattern, i, re, c);
          if (inClass) {
            this.debug("  in class");
            if (c === "!" && i === classStart + 1)
              c = "^";
            re += c;
            continue;
          }
          self.debug("call clearStateChar %j", stateChar);
          clearStateChar();
          stateChar = c;
          if (options.noext)
            clearStateChar();
          continue;
        case "(":
          if (inClass) {
            re += "(";
            continue;
          }
          if (!stateChar) {
            re += "\\(";
            continue;
          }
          patternListStack.push({
            type: stateChar,
            start: i - 1,
            reStart: re.length,
            open: plTypes[stateChar].open,
            close: plTypes[stateChar].close
          });
          re += stateChar === "!" ? "(?:(?!(?:" : "(?:";
          this.debug("plType %j %j", stateChar, re);
          stateChar = false;
          continue;
        case ")":
          if (inClass || !patternListStack.length) {
            re += "\\)";
            continue;
          }
          clearStateChar();
          hasMagic = true;
          var pl = patternListStack.pop();
          re += pl.close;
          if (pl.type === "!") {
            negativeLists.push(pl);
          }
          pl.reEnd = re.length;
          continue;
        case "|":
          if (inClass || !patternListStack.length || escaping) {
            re += "\\|";
            escaping = false;
            continue;
          }
          clearStateChar();
          re += "|";
          continue;
        case "[":
          clearStateChar();
          if (inClass) {
            re += "\\" + c;
            continue;
          }
          inClass = true;
          classStart = i;
          reClassStart = re.length;
          re += c;
          continue;
        case "]":
          if (i === classStart + 1 || !inClass) {
            re += "\\" + c;
            escaping = false;
            continue;
          }
          if (inClass) {
            var cs = pattern.substring(classStart + 1, i);
            try {
              RegExp("[" + cs + "]");
            } catch (er) {
              var sp = this.parse(cs, SUBPARSE);
              re = re.substr(0, reClassStart) + "\\[" + sp[0] + "\\]";
              hasMagic = hasMagic || sp[1];
              inClass = false;
              continue;
            }
          }
          hasMagic = true;
          inClass = false;
          re += c;
          continue;
        default:
          clearStateChar();
          if (escaping) {
            escaping = false;
          } else if (reSpecials[c] && !(c === "^" && inClass)) {
            re += "\\";
          }
          re += c;
      }
    }
    if (inClass) {
      cs = pattern.substr(classStart + 1);
      sp = this.parse(cs, SUBPARSE);
      re = re.substr(0, reClassStart) + "\\[" + sp[0];
      hasMagic = hasMagic || sp[1];
    }
    for (pl = patternListStack.pop(); pl; pl = patternListStack.pop()) {
      var tail = re.slice(pl.reStart + pl.open.length);
      this.debug("setting tail", re, pl);
      tail = tail.replace(/((?:\\{2}){0,64})(\\?)\|/g, function(_, $1, $2) {
        if (!$2) {
          $2 = "\\";
        }
        return $1 + $1 + $2 + "|";
      });
      this.debug("tail=%j\n   %s", tail, tail, pl, re);
      var t = pl.type === "*" ? star : pl.type === "?" ? qmark : "\\" + pl.type;
      hasMagic = true;
      re = re.slice(0, pl.reStart) + t + "\\(" + tail;
    }
    clearStateChar();
    if (escaping) {
      re += "\\\\";
    }
    var addPatternStart = false;
    switch (re.charAt(0)) {
      case ".":
      case "[":
      case "(":
        addPatternStart = true;
    }
    for (var n = negativeLists.length - 1; n > -1; n--) {
      var nl = negativeLists[n];
      var nlBefore = re.slice(0, nl.reStart);
      var nlFirst = re.slice(nl.reStart, nl.reEnd - 8);
      var nlLast = re.slice(nl.reEnd - 8, nl.reEnd);
      var nlAfter = re.slice(nl.reEnd);
      nlLast += nlAfter;
      var openParensBefore = nlBefore.split("(").length - 1;
      var cleanAfter = nlAfter;
      for (i = 0; i < openParensBefore; i++) {
        cleanAfter = cleanAfter.replace(/\)[+*?]?/, "");
      }
      nlAfter = cleanAfter;
      var dollar = "";
      if (nlAfter === "" && isSub !== SUBPARSE) {
        dollar = "$";
      }
      var newRe = nlBefore + nlFirst + nlAfter + dollar + nlLast;
      re = newRe;
    }
    if (re !== "" && hasMagic) {
      re = "(?=.)" + re;
    }
    if (addPatternStart) {
      re = patternStart + re;
    }
    if (isSub === SUBPARSE) {
      return [re, hasMagic];
    }
    if (!hasMagic) {
      return globUnescape(pattern);
    }
    var flags = options.nocase ? "i" : "";
    try {
      var regExp = new RegExp("^" + re + "$", flags);
    } catch (er) {
      return new RegExp("$.");
    }
    regExp._glob = pattern;
    regExp._src = re;
    return regExp;
  }
  minimatch.makeRe = function(pattern, options) {
    return new Minimatch(pattern, options || {}).makeRe();
  };
  Minimatch.prototype.makeRe = makeRe;
  function makeRe() {
    if (this.regexp || this.regexp === false)
      return this.regexp;
    var set = this.set;
    if (!set.length) {
      this.regexp = false;
      return this.regexp;
    }
    var options = this.options;
    var twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot;
    var flags = options.nocase ? "i" : "";
    var re = set.map(function(pattern) {
      return pattern.map(function(p) {
        return p === GLOBSTAR ? twoStar : typeof p === "string" ? regExpEscape(p) : p._src;
      }).join("\\/");
    }).join("|");
    re = "^(?:" + re + ")$";
    if (this.negate)
      re = "^(?!" + re + ").*$";
    try {
      this.regexp = new RegExp(re, flags);
    } catch (ex) {
      this.regexp = false;
    }
    return this.regexp;
  }
  minimatch.match = function(list, pattern, options) {
    options = options || {};
    var mm = new Minimatch(pattern, options);
    list = list.filter(function(f) {
      return mm.match(f);
    });
    if (mm.options.nonull && !list.length) {
      list.push(pattern);
    }
    return list;
  };
  Minimatch.prototype.match = match;
  function match(f, partial) {
    this.debug("match", f, this.pattern);
    if (this.comment)
      return false;
    if (this.empty)
      return f === "";
    if (f === "/" && partial)
      return true;
    var options = this.options;
    if (path.sep !== "/") {
      f = f.split(path.sep).join("/");
    }
    f = f.split(slashSplit);
    this.debug(this.pattern, "split", f);
    var set = this.set;
    this.debug(this.pattern, "set", set);
    var filename;
    var i;
    for (i = f.length - 1; i >= 0; i--) {
      filename = f[i];
      if (filename)
        break;
    }
    for (i = 0; i < set.length; i++) {
      var pattern = set[i];
      var file = f;
      if (options.matchBase && pattern.length === 1) {
        file = [filename];
      }
      var hit = this.matchOne(file, pattern, partial);
      if (hit) {
        if (options.flipNegate)
          return true;
        return !this.negate;
      }
    }
    if (options.flipNegate)
      return false;
    return this.negate;
  }
  Minimatch.prototype.matchOne = function(file, pattern, partial) {
    var options = this.options;
    this.debug("matchOne", {this: this, file, pattern});
    this.debug("matchOne", file.length, pattern.length);
    for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
      this.debug("matchOne loop");
      var p = pattern[pi];
      var f = file[fi];
      this.debug(pattern, p, f);
      if (p === false)
        return false;
      if (p === GLOBSTAR) {
        this.debug("GLOBSTAR", [pattern, p, f]);
        var fr = fi;
        var pr = pi + 1;
        if (pr === pl) {
          this.debug("** at the end");
          for (; fi < fl; fi++) {
            if (file[fi] === "." || file[fi] === ".." || !options.dot && file[fi].charAt(0) === ".")
              return false;
          }
          return true;
        }
        while (fr < fl) {
          var swallowee = file[fr];
          this.debug("\nglobstar while", file, fr, pattern, pr, swallowee);
          if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
            this.debug("globstar found match!", fr, fl, swallowee);
            return true;
          } else {
            if (swallowee === "." || swallowee === ".." || !options.dot && swallowee.charAt(0) === ".") {
              this.debug("dot detected!", file, fr, pattern, pr);
              break;
            }
            this.debug("globstar swallow a segment, and continue");
            fr++;
          }
        }
        if (partial) {
          this.debug("\n>>> no match, partial?", file, fr, pattern, pr);
          if (fr === fl)
            return true;
        }
        return false;
      }
      var hit;
      if (typeof p === "string") {
        if (options.nocase) {
          hit = f.toLowerCase() === p.toLowerCase();
        } else {
          hit = f === p;
        }
        this.debug("string match", p, f, hit);
      } else {
        hit = f.match(p);
        this.debug("pattern match", p, f, hit);
      }
      if (!hit)
        return false;
    }
    if (fi === fl && pi === pl) {
      return true;
    } else if (fi === fl) {
      return partial;
    } else if (pi === pl) {
      var emptyFileEnd = fi === fl - 1 && file[fi] === "";
      return emptyFileEnd;
    }
    throw new Error("wtf?");
  };
  function globUnescape(s) {
    return s.replace(/\\(.)/g, "$1");
  }
  function regExpEscape(s) {
    return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
});

// node_modules/inherits/inherits_browser.js
var require_inherits_browser = __commonJS((exports2, module2) => {
  if (typeof Object.create === "function") {
    module2.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        ctor.prototype = Object.create(superCtor.prototype, {
          constructor: {
            value: ctor,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
      }
    };
  } else {
    module2.exports = function inherits(ctor, superCtor) {
      if (superCtor) {
        ctor.super_ = superCtor;
        var TempCtor = function() {
        };
        TempCtor.prototype = superCtor.prototype;
        ctor.prototype = new TempCtor();
        ctor.prototype.constructor = ctor;
      }
    };
  }
});

// node_modules/inherits/inherits.js
var require_inherits = __commonJS((exports2, module2) => {
  try {
    util = require("util");
    if (typeof util.inherits !== "function")
      throw "";
    module2.exports = util.inherits;
  } catch (e) {
    module2.exports = require_inherits_browser();
  }
  var util;
});

// node_modules/path-is-absolute/index.js
var require_path_is_absolute = __commonJS((exports2, module2) => {
  "use strict";
  function posix(path) {
    return path.charAt(0) === "/";
  }
  function win32(path) {
    var splitDeviceRe = /^([a-zA-Z]:|[\\\/]{2}[^\\\/]+[\\\/]+[^\\\/]+)?([\\\/])?([\s\S]*?)$/;
    var result = splitDeviceRe.exec(path);
    var device = result[1] || "";
    var isUnc = Boolean(device && device.charAt(1) !== ":");
    return Boolean(result[2] || isUnc);
  }
  module2.exports = process.platform === "win32" ? win32 : posix;
  module2.exports.posix = posix;
  module2.exports.win32 = win32;
});

// node_modules/glob/common.js
var require_common = __commonJS((exports2) => {
  exports2.alphasort = alphasort;
  exports2.alphasorti = alphasorti;
  exports2.setopts = setopts;
  exports2.ownProp = ownProp;
  exports2.makeAbs = makeAbs;
  exports2.finish = finish;
  exports2.mark = mark;
  exports2.isIgnored = isIgnored;
  exports2.childrenIgnored = childrenIgnored;
  function ownProp(obj, field) {
    return Object.prototype.hasOwnProperty.call(obj, field);
  }
  var path = require("path");
  var minimatch = require_minimatch();
  var isAbsolute = require_path_is_absolute();
  var Minimatch = minimatch.Minimatch;
  function alphasorti(a, b) {
    return a.toLowerCase().localeCompare(b.toLowerCase());
  }
  function alphasort(a, b) {
    return a.localeCompare(b);
  }
  function setupIgnores(self, options) {
    self.ignore = options.ignore || [];
    if (!Array.isArray(self.ignore))
      self.ignore = [self.ignore];
    if (self.ignore.length) {
      self.ignore = self.ignore.map(ignoreMap);
    }
  }
  function ignoreMap(pattern) {
    var gmatcher = null;
    if (pattern.slice(-3) === "/**") {
      var gpattern = pattern.replace(/(\/\*\*)+$/, "");
      gmatcher = new Minimatch(gpattern, {dot: true});
    }
    return {
      matcher: new Minimatch(pattern, {dot: true}),
      gmatcher
    };
  }
  function setopts(self, pattern, options) {
    if (!options)
      options = {};
    if (options.matchBase && pattern.indexOf("/") === -1) {
      if (options.noglobstar) {
        throw new Error("base matching requires globstar");
      }
      pattern = "**/" + pattern;
    }
    self.silent = !!options.silent;
    self.pattern = pattern;
    self.strict = options.strict !== false;
    self.realpath = !!options.realpath;
    self.realpathCache = options.realpathCache || Object.create(null);
    self.follow = !!options.follow;
    self.dot = !!options.dot;
    self.mark = !!options.mark;
    self.nodir = !!options.nodir;
    if (self.nodir)
      self.mark = true;
    self.sync = !!options.sync;
    self.nounique = !!options.nounique;
    self.nonull = !!options.nonull;
    self.nosort = !!options.nosort;
    self.nocase = !!options.nocase;
    self.stat = !!options.stat;
    self.noprocess = !!options.noprocess;
    self.absolute = !!options.absolute;
    self.maxLength = options.maxLength || Infinity;
    self.cache = options.cache || Object.create(null);
    self.statCache = options.statCache || Object.create(null);
    self.symlinks = options.symlinks || Object.create(null);
    setupIgnores(self, options);
    self.changedCwd = false;
    var cwd = process.cwd();
    if (!ownProp(options, "cwd"))
      self.cwd = cwd;
    else {
      self.cwd = path.resolve(options.cwd);
      self.changedCwd = self.cwd !== cwd;
    }
    self.root = options.root || path.resolve(self.cwd, "/");
    self.root = path.resolve(self.root);
    if (process.platform === "win32")
      self.root = self.root.replace(/\\/g, "/");
    self.cwdAbs = isAbsolute(self.cwd) ? self.cwd : makeAbs(self, self.cwd);
    if (process.platform === "win32")
      self.cwdAbs = self.cwdAbs.replace(/\\/g, "/");
    self.nomount = !!options.nomount;
    options.nonegate = true;
    options.nocomment = true;
    self.minimatch = new Minimatch(pattern, options);
    self.options = self.minimatch.options;
  }
  function finish(self) {
    var nou = self.nounique;
    var all = nou ? [] : Object.create(null);
    for (var i = 0, l = self.matches.length; i < l; i++) {
      var matches = self.matches[i];
      if (!matches || Object.keys(matches).length === 0) {
        if (self.nonull) {
          var literal = self.minimatch.globSet[i];
          if (nou)
            all.push(literal);
          else
            all[literal] = true;
        }
      } else {
        var m = Object.keys(matches);
        if (nou)
          all.push.apply(all, m);
        else
          m.forEach(function(m2) {
            all[m2] = true;
          });
      }
    }
    if (!nou)
      all = Object.keys(all);
    if (!self.nosort)
      all = all.sort(self.nocase ? alphasorti : alphasort);
    if (self.mark) {
      for (var i = 0; i < all.length; i++) {
        all[i] = self._mark(all[i]);
      }
      if (self.nodir) {
        all = all.filter(function(e) {
          var notDir = !/\/$/.test(e);
          var c = self.cache[e] || self.cache[makeAbs(self, e)];
          if (notDir && c)
            notDir = c !== "DIR" && !Array.isArray(c);
          return notDir;
        });
      }
    }
    if (self.ignore.length)
      all = all.filter(function(m2) {
        return !isIgnored(self, m2);
      });
    self.found = all;
  }
  function mark(self, p) {
    var abs = makeAbs(self, p);
    var c = self.cache[abs];
    var m = p;
    if (c) {
      var isDir = c === "DIR" || Array.isArray(c);
      var slash = p.slice(-1) === "/";
      if (isDir && !slash)
        m += "/";
      else if (!isDir && slash)
        m = m.slice(0, -1);
      if (m !== p) {
        var mabs = makeAbs(self, m);
        self.statCache[mabs] = self.statCache[abs];
        self.cache[mabs] = self.cache[abs];
      }
    }
    return m;
  }
  function makeAbs(self, f) {
    var abs = f;
    if (f.charAt(0) === "/") {
      abs = path.join(self.root, f);
    } else if (isAbsolute(f) || f === "") {
      abs = f;
    } else if (self.changedCwd) {
      abs = path.resolve(self.cwd, f);
    } else {
      abs = path.resolve(f);
    }
    if (process.platform === "win32")
      abs = abs.replace(/\\/g, "/");
    return abs;
  }
  function isIgnored(self, path2) {
    if (!self.ignore.length)
      return false;
    return self.ignore.some(function(item) {
      return item.matcher.match(path2) || !!(item.gmatcher && item.gmatcher.match(path2));
    });
  }
  function childrenIgnored(self, path2) {
    if (!self.ignore.length)
      return false;
    return self.ignore.some(function(item) {
      return !!(item.gmatcher && item.gmatcher.match(path2));
    });
  }
});

// node_modules/glob/sync.js
var require_sync = __commonJS((exports2, module2) => {
  module2.exports = globSync;
  globSync.GlobSync = GlobSync;
  var fs = require("fs");
  var rp = require_fs();
  var minimatch = require_minimatch();
  var Minimatch = minimatch.Minimatch;
  var Glob = require_glob().Glob;
  var util = require("util");
  var path = require("path");
  var assert = require("assert");
  var isAbsolute = require_path_is_absolute();
  var common = require_common();
  var alphasort = common.alphasort;
  var alphasorti = common.alphasorti;
  var setopts = common.setopts;
  var ownProp = common.ownProp;
  var childrenIgnored = common.childrenIgnored;
  var isIgnored = common.isIgnored;
  function globSync(pattern, options) {
    if (typeof options === "function" || arguments.length === 3)
      throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
    return new GlobSync(pattern, options).found;
  }
  function GlobSync(pattern, options) {
    if (!pattern)
      throw new Error("must provide pattern");
    if (typeof options === "function" || arguments.length === 3)
      throw new TypeError("callback provided to sync glob\nSee: https://github.com/isaacs/node-glob/issues/167");
    if (!(this instanceof GlobSync))
      return new GlobSync(pattern, options);
    setopts(this, pattern, options);
    if (this.noprocess)
      return this;
    var n = this.minimatch.set.length;
    this.matches = new Array(n);
    for (var i = 0; i < n; i++) {
      this._process(this.minimatch.set[i], i, false);
    }
    this._finish();
  }
  GlobSync.prototype._finish = function() {
    assert(this instanceof GlobSync);
    if (this.realpath) {
      var self = this;
      this.matches.forEach(function(matchset, index) {
        var set = self.matches[index] = Object.create(null);
        for (var p in matchset) {
          try {
            p = self._makeAbs(p);
            var real = rp.realpathSync(p, self.realpathCache);
            set[real] = true;
          } catch (er) {
            if (er.syscall === "stat")
              set[self._makeAbs(p)] = true;
            else
              throw er;
          }
        }
      });
    }
    common.finish(this);
  };
  GlobSync.prototype._process = function(pattern, index, inGlobStar) {
    assert(this instanceof GlobSync);
    var n = 0;
    while (typeof pattern[n] === "string") {
      n++;
    }
    var prefix;
    switch (n) {
      case pattern.length:
        this._processSimple(pattern.join("/"), index);
        return;
      case 0:
        prefix = null;
        break;
      default:
        prefix = pattern.slice(0, n).join("/");
        break;
    }
    var remain = pattern.slice(n);
    var read;
    if (prefix === null)
      read = ".";
    else if (isAbsolute(prefix) || isAbsolute(pattern.join("/"))) {
      if (!prefix || !isAbsolute(prefix))
        prefix = "/" + prefix;
      read = prefix;
    } else
      read = prefix;
    var abs = this._makeAbs(read);
    if (childrenIgnored(this, read))
      return;
    var isGlobStar = remain[0] === minimatch.GLOBSTAR;
    if (isGlobStar)
      this._processGlobStar(prefix, read, abs, remain, index, inGlobStar);
    else
      this._processReaddir(prefix, read, abs, remain, index, inGlobStar);
  };
  GlobSync.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar) {
    var entries = this._readdir(abs, inGlobStar);
    if (!entries)
      return;
    var pn = remain[0];
    var negate = !!this.minimatch.negate;
    var rawGlob = pn._glob;
    var dotOk = this.dot || rawGlob.charAt(0) === ".";
    var matchedEntries = [];
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      if (e.charAt(0) !== "." || dotOk) {
        var m;
        if (negate && !prefix) {
          m = !e.match(pn);
        } else {
          m = e.match(pn);
        }
        if (m)
          matchedEntries.push(e);
      }
    }
    var len = matchedEntries.length;
    if (len === 0)
      return;
    if (remain.length === 1 && !this.mark && !this.stat) {
      if (!this.matches[index])
        this.matches[index] = Object.create(null);
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        if (prefix) {
          if (prefix.slice(-1) !== "/")
            e = prefix + "/" + e;
          else
            e = prefix + e;
        }
        if (e.charAt(0) === "/" && !this.nomount) {
          e = path.join(this.root, e);
        }
        this._emitMatch(index, e);
      }
      return;
    }
    remain.shift();
    for (var i = 0; i < len; i++) {
      var e = matchedEntries[i];
      var newPattern;
      if (prefix)
        newPattern = [prefix, e];
      else
        newPattern = [e];
      this._process(newPattern.concat(remain), index, inGlobStar);
    }
  };
  GlobSync.prototype._emitMatch = function(index, e) {
    if (isIgnored(this, e))
      return;
    var abs = this._makeAbs(e);
    if (this.mark)
      e = this._mark(e);
    if (this.absolute) {
      e = abs;
    }
    if (this.matches[index][e])
      return;
    if (this.nodir) {
      var c = this.cache[abs];
      if (c === "DIR" || Array.isArray(c))
        return;
    }
    this.matches[index][e] = true;
    if (this.stat)
      this._stat(e);
  };
  GlobSync.prototype._readdirInGlobStar = function(abs) {
    if (this.follow)
      return this._readdir(abs, false);
    var entries;
    var lstat;
    var stat;
    try {
      lstat = fs.lstatSync(abs);
    } catch (er) {
      if (er.code === "ENOENT") {
        return null;
      }
    }
    var isSym = lstat && lstat.isSymbolicLink();
    this.symlinks[abs] = isSym;
    if (!isSym && lstat && !lstat.isDirectory())
      this.cache[abs] = "FILE";
    else
      entries = this._readdir(abs, false);
    return entries;
  };
  GlobSync.prototype._readdir = function(abs, inGlobStar) {
    var entries;
    if (inGlobStar && !ownProp(this.symlinks, abs))
      return this._readdirInGlobStar(abs);
    if (ownProp(this.cache, abs)) {
      var c = this.cache[abs];
      if (!c || c === "FILE")
        return null;
      if (Array.isArray(c))
        return c;
    }
    try {
      return this._readdirEntries(abs, fs.readdirSync(abs));
    } catch (er) {
      this._readdirError(abs, er);
      return null;
    }
  };
  GlobSync.prototype._readdirEntries = function(abs, entries) {
    if (!this.mark && !this.stat) {
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (abs === "/")
          e = abs + e;
        else
          e = abs + "/" + e;
        this.cache[e] = true;
      }
    }
    this.cache[abs] = entries;
    return entries;
  };
  GlobSync.prototype._readdirError = function(f, er) {
    switch (er.code) {
      case "ENOTSUP":
      case "ENOTDIR":
        var abs = this._makeAbs(f);
        this.cache[abs] = "FILE";
        if (abs === this.cwdAbs) {
          var error = new Error(er.code + " invalid cwd " + this.cwd);
          error.path = this.cwd;
          error.code = er.code;
          throw error;
        }
        break;
      case "ENOENT":
      case "ELOOP":
      case "ENAMETOOLONG":
      case "UNKNOWN":
        this.cache[this._makeAbs(f)] = false;
        break;
      default:
        this.cache[this._makeAbs(f)] = false;
        if (this.strict)
          throw er;
        if (!this.silent)
          console.error("glob error", er);
        break;
    }
  };
  GlobSync.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar) {
    var entries = this._readdir(abs, inGlobStar);
    if (!entries)
      return;
    var remainWithoutGlobStar = remain.slice(1);
    var gspref = prefix ? [prefix] : [];
    var noGlobStar = gspref.concat(remainWithoutGlobStar);
    this._process(noGlobStar, index, false);
    var len = entries.length;
    var isSym = this.symlinks[abs];
    if (isSym && inGlobStar)
      return;
    for (var i = 0; i < len; i++) {
      var e = entries[i];
      if (e.charAt(0) === "." && !this.dot)
        continue;
      var instead = gspref.concat(entries[i], remainWithoutGlobStar);
      this._process(instead, index, true);
      var below = gspref.concat(entries[i], remain);
      this._process(below, index, true);
    }
  };
  GlobSync.prototype._processSimple = function(prefix, index) {
    var exists = this._stat(prefix);
    if (!this.matches[index])
      this.matches[index] = Object.create(null);
    if (!exists)
      return;
    if (prefix && isAbsolute(prefix) && !this.nomount) {
      var trail = /[\/\\]$/.test(prefix);
      if (prefix.charAt(0) === "/") {
        prefix = path.join(this.root, prefix);
      } else {
        prefix = path.resolve(this.root, prefix);
        if (trail)
          prefix += "/";
      }
    }
    if (process.platform === "win32")
      prefix = prefix.replace(/\\/g, "/");
    this._emitMatch(index, prefix);
  };
  GlobSync.prototype._stat = function(f) {
    var abs = this._makeAbs(f);
    var needDir = f.slice(-1) === "/";
    if (f.length > this.maxLength)
      return false;
    if (!this.stat && ownProp(this.cache, abs)) {
      var c = this.cache[abs];
      if (Array.isArray(c))
        c = "DIR";
      if (!needDir || c === "DIR")
        return c;
      if (needDir && c === "FILE")
        return false;
    }
    var exists;
    var stat = this.statCache[abs];
    if (!stat) {
      var lstat;
      try {
        lstat = fs.lstatSync(abs);
      } catch (er) {
        if (er && (er.code === "ENOENT" || er.code === "ENOTDIR")) {
          this.statCache[abs] = false;
          return false;
        }
      }
      if (lstat && lstat.isSymbolicLink()) {
        try {
          stat = fs.statSync(abs);
        } catch (er) {
          stat = lstat;
        }
      } else {
        stat = lstat;
      }
    }
    this.statCache[abs] = stat;
    var c = true;
    if (stat)
      c = stat.isDirectory() ? "DIR" : "FILE";
    this.cache[abs] = this.cache[abs] || c;
    if (needDir && c === "FILE")
      return false;
    return c;
  };
  GlobSync.prototype._mark = function(p) {
    return common.mark(this, p);
  };
  GlobSync.prototype._makeAbs = function(f) {
    return common.makeAbs(this, f);
  };
});

// node_modules/wrappy/wrappy.js
var require_wrappy = __commonJS((exports2, module2) => {
  module2.exports = wrappy;
  function wrappy(fn, cb) {
    if (fn && cb)
      return wrappy(fn)(cb);
    if (typeof fn !== "function")
      throw new TypeError("need wrapper function");
    Object.keys(fn).forEach(function(k) {
      wrapper[k] = fn[k];
    });
    return wrapper;
    function wrapper() {
      var args = new Array(arguments.length);
      for (var i = 0; i < args.length; i++) {
        args[i] = arguments[i];
      }
      var ret = fn.apply(this, args);
      var cb2 = args[args.length - 1];
      if (typeof ret === "function" && ret !== cb2) {
        Object.keys(cb2).forEach(function(k) {
          ret[k] = cb2[k];
        });
      }
      return ret;
    }
  }
});

// node_modules/once/once.js
var require_once = __commonJS((exports2, module2) => {
  var wrappy = require_wrappy();
  module2.exports = wrappy(once);
  module2.exports.strict = wrappy(onceStrict);
  once.proto = once(function() {
    Object.defineProperty(Function.prototype, "once", {
      value: function() {
        return once(this);
      },
      configurable: true
    });
    Object.defineProperty(Function.prototype, "onceStrict", {
      value: function() {
        return onceStrict(this);
      },
      configurable: true
    });
  });
  function once(fn) {
    var f = function() {
      if (f.called)
        return f.value;
      f.called = true;
      return f.value = fn.apply(this, arguments);
    };
    f.called = false;
    return f;
  }
  function onceStrict(fn) {
    var f = function() {
      if (f.called)
        throw new Error(f.onceError);
      f.called = true;
      return f.value = fn.apply(this, arguments);
    };
    var name = fn.name || "Function wrapped with `once`";
    f.onceError = name + " shouldn't be called more than once";
    f.called = false;
    return f;
  }
});

// node_modules/inflight/inflight.js
var require_inflight = __commonJS((exports2, module2) => {
  var wrappy = require_wrappy();
  var reqs = Object.create(null);
  var once = require_once();
  module2.exports = wrappy(inflight);
  function inflight(key, cb) {
    if (reqs[key]) {
      reqs[key].push(cb);
      return null;
    } else {
      reqs[key] = [cb];
      return makeres(key);
    }
  }
  function makeres(key) {
    return once(function RES() {
      var cbs = reqs[key];
      var len = cbs.length;
      var args = slice(arguments);
      try {
        for (var i = 0; i < len; i++) {
          cbs[i].apply(null, args);
        }
      } finally {
        if (cbs.length > len) {
          cbs.splice(0, len);
          process.nextTick(function() {
            RES.apply(null, args);
          });
        } else {
          delete reqs[key];
        }
      }
    });
  }
  function slice(args) {
    var length = args.length;
    var array = [];
    for (var i = 0; i < length; i++)
      array[i] = args[i];
    return array;
  }
});

// node_modules/glob/glob.js
var require_glob = __commonJS((exports2, module2) => {
  module2.exports = glob;
  var fs = require("fs");
  var rp = require_fs();
  var minimatch = require_minimatch();
  var Minimatch = minimatch.Minimatch;
  var inherits = require_inherits();
  var EE = require("events").EventEmitter;
  var path = require("path");
  var assert = require("assert");
  var isAbsolute = require_path_is_absolute();
  var globSync = require_sync();
  var common = require_common();
  var alphasort = common.alphasort;
  var alphasorti = common.alphasorti;
  var setopts = common.setopts;
  var ownProp = common.ownProp;
  var inflight = require_inflight();
  var util = require("util");
  var childrenIgnored = common.childrenIgnored;
  var isIgnored = common.isIgnored;
  var once = require_once();
  function glob(pattern, options, cb) {
    if (typeof options === "function")
      cb = options, options = {};
    if (!options)
      options = {};
    if (options.sync) {
      if (cb)
        throw new TypeError("callback provided to sync glob");
      return globSync(pattern, options);
    }
    return new Glob(pattern, options, cb);
  }
  glob.sync = globSync;
  var GlobSync = glob.GlobSync = globSync.GlobSync;
  glob.glob = glob;
  function extend(origin, add) {
    if (add === null || typeof add !== "object") {
      return origin;
    }
    var keys = Object.keys(add);
    var i = keys.length;
    while (i--) {
      origin[keys[i]] = add[keys[i]];
    }
    return origin;
  }
  glob.hasMagic = function(pattern, options_) {
    var options = extend({}, options_);
    options.noprocess = true;
    var g = new Glob(pattern, options);
    var set = g.minimatch.set;
    if (!pattern)
      return false;
    if (set.length > 1)
      return true;
    for (var j = 0; j < set[0].length; j++) {
      if (typeof set[0][j] !== "string")
        return true;
    }
    return false;
  };
  glob.Glob = Glob;
  inherits(Glob, EE);
  function Glob(pattern, options, cb) {
    if (typeof options === "function") {
      cb = options;
      options = null;
    }
    if (options && options.sync) {
      if (cb)
        throw new TypeError("callback provided to sync glob");
      return new GlobSync(pattern, options);
    }
    if (!(this instanceof Glob))
      return new Glob(pattern, options, cb);
    setopts(this, pattern, options);
    this._didRealPath = false;
    var n = this.minimatch.set.length;
    this.matches = new Array(n);
    if (typeof cb === "function") {
      cb = once(cb);
      this.on("error", cb);
      this.on("end", function(matches) {
        cb(null, matches);
      });
    }
    var self = this;
    this._processing = 0;
    this._emitQueue = [];
    this._processQueue = [];
    this.paused = false;
    if (this.noprocess)
      return this;
    if (n === 0)
      return done();
    var sync = true;
    for (var i = 0; i < n; i++) {
      this._process(this.minimatch.set[i], i, false, done);
    }
    sync = false;
    function done() {
      --self._processing;
      if (self._processing <= 0) {
        if (sync) {
          process.nextTick(function() {
            self._finish();
          });
        } else {
          self._finish();
        }
      }
    }
  }
  Glob.prototype._finish = function() {
    assert(this instanceof Glob);
    if (this.aborted)
      return;
    if (this.realpath && !this._didRealpath)
      return this._realpath();
    common.finish(this);
    this.emit("end", this.found);
  };
  Glob.prototype._realpath = function() {
    if (this._didRealpath)
      return;
    this._didRealpath = true;
    var n = this.matches.length;
    if (n === 0)
      return this._finish();
    var self = this;
    for (var i = 0; i < this.matches.length; i++)
      this._realpathSet(i, next);
    function next() {
      if (--n === 0)
        self._finish();
    }
  };
  Glob.prototype._realpathSet = function(index, cb) {
    var matchset = this.matches[index];
    if (!matchset)
      return cb();
    var found = Object.keys(matchset);
    var self = this;
    var n = found.length;
    if (n === 0)
      return cb();
    var set = this.matches[index] = Object.create(null);
    found.forEach(function(p, i) {
      p = self._makeAbs(p);
      rp.realpath(p, self.realpathCache, function(er, real) {
        if (!er)
          set[real] = true;
        else if (er.syscall === "stat")
          set[p] = true;
        else
          self.emit("error", er);
        if (--n === 0) {
          self.matches[index] = set;
          cb();
        }
      });
    });
  };
  Glob.prototype._mark = function(p) {
    return common.mark(this, p);
  };
  Glob.prototype._makeAbs = function(f) {
    return common.makeAbs(this, f);
  };
  Glob.prototype.abort = function() {
    this.aborted = true;
    this.emit("abort");
  };
  Glob.prototype.pause = function() {
    if (!this.paused) {
      this.paused = true;
      this.emit("pause");
    }
  };
  Glob.prototype.resume = function() {
    if (this.paused) {
      this.emit("resume");
      this.paused = false;
      if (this._emitQueue.length) {
        var eq = this._emitQueue.slice(0);
        this._emitQueue.length = 0;
        for (var i = 0; i < eq.length; i++) {
          var e = eq[i];
          this._emitMatch(e[0], e[1]);
        }
      }
      if (this._processQueue.length) {
        var pq = this._processQueue.slice(0);
        this._processQueue.length = 0;
        for (var i = 0; i < pq.length; i++) {
          var p = pq[i];
          this._processing--;
          this._process(p[0], p[1], p[2], p[3]);
        }
      }
    }
  };
  Glob.prototype._process = function(pattern, index, inGlobStar, cb) {
    assert(this instanceof Glob);
    assert(typeof cb === "function");
    if (this.aborted)
      return;
    this._processing++;
    if (this.paused) {
      this._processQueue.push([pattern, index, inGlobStar, cb]);
      return;
    }
    var n = 0;
    while (typeof pattern[n] === "string") {
      n++;
    }
    var prefix;
    switch (n) {
      case pattern.length:
        this._processSimple(pattern.join("/"), index, cb);
        return;
      case 0:
        prefix = null;
        break;
      default:
        prefix = pattern.slice(0, n).join("/");
        break;
    }
    var remain = pattern.slice(n);
    var read;
    if (prefix === null)
      read = ".";
    else if (isAbsolute(prefix) || isAbsolute(pattern.join("/"))) {
      if (!prefix || !isAbsolute(prefix))
        prefix = "/" + prefix;
      read = prefix;
    } else
      read = prefix;
    var abs = this._makeAbs(read);
    if (childrenIgnored(this, read))
      return cb();
    var isGlobStar = remain[0] === minimatch.GLOBSTAR;
    if (isGlobStar)
      this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb);
    else
      this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb);
  };
  Glob.prototype._processReaddir = function(prefix, read, abs, remain, index, inGlobStar, cb) {
    var self = this;
    this._readdir(abs, inGlobStar, function(er, entries) {
      return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
    });
  };
  Glob.prototype._processReaddir2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
    if (!entries)
      return cb();
    var pn = remain[0];
    var negate = !!this.minimatch.negate;
    var rawGlob = pn._glob;
    var dotOk = this.dot || rawGlob.charAt(0) === ".";
    var matchedEntries = [];
    for (var i = 0; i < entries.length; i++) {
      var e = entries[i];
      if (e.charAt(0) !== "." || dotOk) {
        var m;
        if (negate && !prefix) {
          m = !e.match(pn);
        } else {
          m = e.match(pn);
        }
        if (m)
          matchedEntries.push(e);
      }
    }
    var len = matchedEntries.length;
    if (len === 0)
      return cb();
    if (remain.length === 1 && !this.mark && !this.stat) {
      if (!this.matches[index])
        this.matches[index] = Object.create(null);
      for (var i = 0; i < len; i++) {
        var e = matchedEntries[i];
        if (prefix) {
          if (prefix !== "/")
            e = prefix + "/" + e;
          else
            e = prefix + e;
        }
        if (e.charAt(0) === "/" && !this.nomount) {
          e = path.join(this.root, e);
        }
        this._emitMatch(index, e);
      }
      return cb();
    }
    remain.shift();
    for (var i = 0; i < len; i++) {
      var e = matchedEntries[i];
      var newPattern;
      if (prefix) {
        if (prefix !== "/")
          e = prefix + "/" + e;
        else
          e = prefix + e;
      }
      this._process([e].concat(remain), index, inGlobStar, cb);
    }
    cb();
  };
  Glob.prototype._emitMatch = function(index, e) {
    if (this.aborted)
      return;
    if (isIgnored(this, e))
      return;
    if (this.paused) {
      this._emitQueue.push([index, e]);
      return;
    }
    var abs = isAbsolute(e) ? e : this._makeAbs(e);
    if (this.mark)
      e = this._mark(e);
    if (this.absolute)
      e = abs;
    if (this.matches[index][e])
      return;
    if (this.nodir) {
      var c = this.cache[abs];
      if (c === "DIR" || Array.isArray(c))
        return;
    }
    this.matches[index][e] = true;
    var st = this.statCache[abs];
    if (st)
      this.emit("stat", e, st);
    this.emit("match", e);
  };
  Glob.prototype._readdirInGlobStar = function(abs, cb) {
    if (this.aborted)
      return;
    if (this.follow)
      return this._readdir(abs, false, cb);
    var lstatkey = "lstat\0" + abs;
    var self = this;
    var lstatcb = inflight(lstatkey, lstatcb_);
    if (lstatcb)
      fs.lstat(abs, lstatcb);
    function lstatcb_(er, lstat) {
      if (er && er.code === "ENOENT")
        return cb();
      var isSym = lstat && lstat.isSymbolicLink();
      self.symlinks[abs] = isSym;
      if (!isSym && lstat && !lstat.isDirectory()) {
        self.cache[abs] = "FILE";
        cb();
      } else
        self._readdir(abs, false, cb);
    }
  };
  Glob.prototype._readdir = function(abs, inGlobStar, cb) {
    if (this.aborted)
      return;
    cb = inflight("readdir\0" + abs + "\0" + inGlobStar, cb);
    if (!cb)
      return;
    if (inGlobStar && !ownProp(this.symlinks, abs))
      return this._readdirInGlobStar(abs, cb);
    if (ownProp(this.cache, abs)) {
      var c = this.cache[abs];
      if (!c || c === "FILE")
        return cb();
      if (Array.isArray(c))
        return cb(null, c);
    }
    var self = this;
    fs.readdir(abs, readdirCb(this, abs, cb));
  };
  function readdirCb(self, abs, cb) {
    return function(er, entries) {
      if (er)
        self._readdirError(abs, er, cb);
      else
        self._readdirEntries(abs, entries, cb);
    };
  }
  Glob.prototype._readdirEntries = function(abs, entries, cb) {
    if (this.aborted)
      return;
    if (!this.mark && !this.stat) {
      for (var i = 0; i < entries.length; i++) {
        var e = entries[i];
        if (abs === "/")
          e = abs + e;
        else
          e = abs + "/" + e;
        this.cache[e] = true;
      }
    }
    this.cache[abs] = entries;
    return cb(null, entries);
  };
  Glob.prototype._readdirError = function(f, er, cb) {
    if (this.aborted)
      return;
    switch (er.code) {
      case "ENOTSUP":
      case "ENOTDIR":
        var abs = this._makeAbs(f);
        this.cache[abs] = "FILE";
        if (abs === this.cwdAbs) {
          var error = new Error(er.code + " invalid cwd " + this.cwd);
          error.path = this.cwd;
          error.code = er.code;
          this.emit("error", error);
          this.abort();
        }
        break;
      case "ENOENT":
      case "ELOOP":
      case "ENAMETOOLONG":
      case "UNKNOWN":
        this.cache[this._makeAbs(f)] = false;
        break;
      default:
        this.cache[this._makeAbs(f)] = false;
        if (this.strict) {
          this.emit("error", er);
          this.abort();
        }
        if (!this.silent)
          console.error("glob error", er);
        break;
    }
    return cb();
  };
  Glob.prototype._processGlobStar = function(prefix, read, abs, remain, index, inGlobStar, cb) {
    var self = this;
    this._readdir(abs, inGlobStar, function(er, entries) {
      self._processGlobStar2(prefix, read, abs, remain, index, inGlobStar, entries, cb);
    });
  };
  Glob.prototype._processGlobStar2 = function(prefix, read, abs, remain, index, inGlobStar, entries, cb) {
    if (!entries)
      return cb();
    var remainWithoutGlobStar = remain.slice(1);
    var gspref = prefix ? [prefix] : [];
    var noGlobStar = gspref.concat(remainWithoutGlobStar);
    this._process(noGlobStar, index, false, cb);
    var isSym = this.symlinks[abs];
    var len = entries.length;
    if (isSym && inGlobStar)
      return cb();
    for (var i = 0; i < len; i++) {
      var e = entries[i];
      if (e.charAt(0) === "." && !this.dot)
        continue;
      var instead = gspref.concat(entries[i], remainWithoutGlobStar);
      this._process(instead, index, true, cb);
      var below = gspref.concat(entries[i], remain);
      this._process(below, index, true, cb);
    }
    cb();
  };
  Glob.prototype._processSimple = function(prefix, index, cb) {
    var self = this;
    this._stat(prefix, function(er, exists) {
      self._processSimple2(prefix, index, er, exists, cb);
    });
  };
  Glob.prototype._processSimple2 = function(prefix, index, er, exists, cb) {
    if (!this.matches[index])
      this.matches[index] = Object.create(null);
    if (!exists)
      return cb();
    if (prefix && isAbsolute(prefix) && !this.nomount) {
      var trail = /[\/\\]$/.test(prefix);
      if (prefix.charAt(0) === "/") {
        prefix = path.join(this.root, prefix);
      } else {
        prefix = path.resolve(this.root, prefix);
        if (trail)
          prefix += "/";
      }
    }
    if (process.platform === "win32")
      prefix = prefix.replace(/\\/g, "/");
    this._emitMatch(index, prefix);
    cb();
  };
  Glob.prototype._stat = function(f, cb) {
    var abs = this._makeAbs(f);
    var needDir = f.slice(-1) === "/";
    if (f.length > this.maxLength)
      return cb();
    if (!this.stat && ownProp(this.cache, abs)) {
      var c = this.cache[abs];
      if (Array.isArray(c))
        c = "DIR";
      if (!needDir || c === "DIR")
        return cb(null, c);
      if (needDir && c === "FILE")
        return cb();
    }
    var exists;
    var stat = this.statCache[abs];
    if (stat !== void 0) {
      if (stat === false)
        return cb(null, stat);
      else {
        var type = stat.isDirectory() ? "DIR" : "FILE";
        if (needDir && type === "FILE")
          return cb();
        else
          return cb(null, type, stat);
      }
    }
    var self = this;
    var statcb = inflight("stat\0" + abs, lstatcb_);
    if (statcb)
      fs.lstat(abs, statcb);
    function lstatcb_(er, lstat) {
      if (lstat && lstat.isSymbolicLink()) {
        return fs.stat(abs, function(er2, stat2) {
          if (er2)
            self._stat2(f, abs, null, lstat, cb);
          else
            self._stat2(f, abs, er2, stat2, cb);
        });
      } else {
        self._stat2(f, abs, er, lstat, cb);
      }
    }
  };
  Glob.prototype._stat2 = function(f, abs, er, stat, cb) {
    if (er && (er.code === "ENOENT" || er.code === "ENOTDIR")) {
      this.statCache[abs] = false;
      return cb();
    }
    var needDir = f.slice(-1) === "/";
    this.statCache[abs] = stat;
    if (abs.slice(-1) === "/" && stat && !stat.isDirectory())
      return cb(null, false, stat);
    var c = true;
    if (stat)
      c = stat.isDirectory() ? "DIR" : "FILE";
    this.cache[abs] = this.cache[abs] || c;
    if (needDir && c === "FILE")
      return cb();
    return cb(null, c, stat);
  };
});

// node_modules/tmp/node_modules/rimraf/rimraf.js
var require_rimraf = __commonJS((exports2, module2) => {
  module2.exports = rimraf;
  rimraf.sync = rimrafSync;
  var assert = require("assert");
  var path = require("path");
  var fs = require("fs");
  var glob = void 0;
  try {
    glob = require_glob();
  } catch (_err) {
  }
  var _0666 = parseInt("666", 8);
  var defaultGlobOpts = {
    nosort: true,
    silent: true
  };
  var timeout = 0;
  var isWindows = process.platform === "win32";
  function defaults(options) {
    var methods = [
      "unlink",
      "chmod",
      "stat",
      "lstat",
      "rmdir",
      "readdir"
    ];
    methods.forEach(function(m) {
      options[m] = options[m] || fs[m];
      m = m + "Sync";
      options[m] = options[m] || fs[m];
    });
    options.maxBusyTries = options.maxBusyTries || 3;
    options.emfileWait = options.emfileWait || 1e3;
    if (options.glob === false) {
      options.disableGlob = true;
    }
    if (options.disableGlob !== true && glob === void 0) {
      throw Error("glob dependency not found, set `options.disableGlob = true` if intentional");
    }
    options.disableGlob = options.disableGlob || false;
    options.glob = options.glob || defaultGlobOpts;
  }
  function rimraf(p, options, cb) {
    if (typeof options === "function") {
      cb = options;
      options = {};
    }
    assert(p, "rimraf: missing path");
    assert.equal(typeof p, "string", "rimraf: path should be a string");
    assert.equal(typeof cb, "function", "rimraf: callback function required");
    assert(options, "rimraf: invalid options argument provided");
    assert.equal(typeof options, "object", "rimraf: options should be object");
    defaults(options);
    var busyTries = 0;
    var errState = null;
    var n = 0;
    if (options.disableGlob || !glob.hasMagic(p))
      return afterGlob(null, [p]);
    options.lstat(p, function(er, stat) {
      if (!er)
        return afterGlob(null, [p]);
      glob(p, options.glob, afterGlob);
    });
    function next(er) {
      errState = errState || er;
      if (--n === 0)
        cb(errState);
    }
    function afterGlob(er, results) {
      if (er)
        return cb(er);
      n = results.length;
      if (n === 0)
        return cb();
      results.forEach(function(p2) {
        rimraf_(p2, options, function CB(er2) {
          if (er2) {
            if ((er2.code === "EBUSY" || er2.code === "ENOTEMPTY" || er2.code === "EPERM") && busyTries < options.maxBusyTries) {
              busyTries++;
              var time = busyTries * 100;
              return setTimeout(function() {
                rimraf_(p2, options, CB);
              }, time);
            }
            if (er2.code === "EMFILE" && timeout < options.emfileWait) {
              return setTimeout(function() {
                rimraf_(p2, options, CB);
              }, timeout++);
            }
            if (er2.code === "ENOENT")
              er2 = null;
          }
          timeout = 0;
          next(er2);
        });
      });
    }
  }
  function rimraf_(p, options, cb) {
    assert(p);
    assert(options);
    assert(typeof cb === "function");
    options.lstat(p, function(er, st) {
      if (er && er.code === "ENOENT")
        return cb(null);
      if (er && er.code === "EPERM" && isWindows)
        fixWinEPERM(p, options, er, cb);
      if (st && st.isDirectory())
        return rmdir(p, options, er, cb);
      options.unlink(p, function(er2) {
        if (er2) {
          if (er2.code === "ENOENT")
            return cb(null);
          if (er2.code === "EPERM")
            return isWindows ? fixWinEPERM(p, options, er2, cb) : rmdir(p, options, er2, cb);
          if (er2.code === "EISDIR")
            return rmdir(p, options, er2, cb);
        }
        return cb(er2);
      });
    });
  }
  function fixWinEPERM(p, options, er, cb) {
    assert(p);
    assert(options);
    assert(typeof cb === "function");
    if (er)
      assert(er instanceof Error);
    options.chmod(p, _0666, function(er2) {
      if (er2)
        cb(er2.code === "ENOENT" ? null : er);
      else
        options.stat(p, function(er3, stats) {
          if (er3)
            cb(er3.code === "ENOENT" ? null : er);
          else if (stats.isDirectory())
            rmdir(p, options, er, cb);
          else
            options.unlink(p, cb);
        });
    });
  }
  function fixWinEPERMSync(p, options, er) {
    assert(p);
    assert(options);
    if (er)
      assert(er instanceof Error);
    try {
      options.chmodSync(p, _0666);
    } catch (er2) {
      if (er2.code === "ENOENT")
        return;
      else
        throw er;
    }
    try {
      var stats = options.statSync(p);
    } catch (er3) {
      if (er3.code === "ENOENT")
        return;
      else
        throw er;
    }
    if (stats.isDirectory())
      rmdirSync(p, options, er);
    else
      options.unlinkSync(p);
  }
  function rmdir(p, options, originalEr, cb) {
    assert(p);
    assert(options);
    if (originalEr)
      assert(originalEr instanceof Error);
    assert(typeof cb === "function");
    options.rmdir(p, function(er) {
      if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM"))
        rmkids(p, options, cb);
      else if (er && er.code === "ENOTDIR")
        cb(originalEr);
      else
        cb(er);
    });
  }
  function rmkids(p, options, cb) {
    assert(p);
    assert(options);
    assert(typeof cb === "function");
    options.readdir(p, function(er, files) {
      if (er)
        return cb(er);
      var n = files.length;
      if (n === 0)
        return options.rmdir(p, cb);
      var errState;
      files.forEach(function(f) {
        rimraf(path.join(p, f), options, function(er2) {
          if (errState)
            return;
          if (er2)
            return cb(errState = er2);
          if (--n === 0)
            options.rmdir(p, cb);
        });
      });
    });
  }
  function rimrafSync(p, options) {
    options = options || {};
    defaults(options);
    assert(p, "rimraf: missing path");
    assert.equal(typeof p, "string", "rimraf: path should be a string");
    assert(options, "rimraf: missing options");
    assert.equal(typeof options, "object", "rimraf: options should be object");
    var results;
    if (options.disableGlob || !glob.hasMagic(p)) {
      results = [p];
    } else {
      try {
        options.lstatSync(p);
        results = [p];
      } catch (er) {
        results = glob.sync(p, options.glob);
      }
    }
    if (!results.length)
      return;
    for (var i = 0; i < results.length; i++) {
      var p = results[i];
      try {
        var st = options.lstatSync(p);
      } catch (er) {
        if (er.code === "ENOENT")
          return;
        if (er.code === "EPERM" && isWindows)
          fixWinEPERMSync(p, options, er);
      }
      try {
        if (st && st.isDirectory())
          rmdirSync(p, options, null);
        else
          options.unlinkSync(p);
      } catch (er) {
        if (er.code === "ENOENT")
          return;
        if (er.code === "EPERM")
          return isWindows ? fixWinEPERMSync(p, options, er) : rmdirSync(p, options, er);
        if (er.code !== "EISDIR")
          throw er;
        rmdirSync(p, options, er);
      }
    }
  }
  function rmdirSync(p, options, originalEr) {
    assert(p);
    assert(options);
    if (originalEr)
      assert(originalEr instanceof Error);
    try {
      options.rmdirSync(p);
    } catch (er) {
      if (er.code === "ENOENT")
        return;
      if (er.code === "ENOTDIR")
        throw originalEr;
      if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")
        rmkidsSync(p, options);
    }
  }
  function rmkidsSync(p, options) {
    assert(p);
    assert(options);
    options.readdirSync(p).forEach(function(f) {
      rimrafSync(path.join(p, f), options);
    });
    var retries = isWindows ? 100 : 1;
    var i = 0;
    do {
      var threw = true;
      try {
        var ret = options.rmdirSync(p, options);
        threw = false;
        return ret;
      } finally {
        if (++i < retries && threw)
          continue;
      }
    } while (true);
  }
});

// node_modules/tmp/lib/tmp.js
var require_tmp = __commonJS((exports2, module2) => {
  /*!
   * Tmp
   *
   * Copyright (c) 2011-2017 KARASZI Istvan <github@spam.raszi.hu>
   *
   * MIT Licensed
   */
  var fs = require("fs");
  var os = require("os");
  var path = require("path");
  var crypto = require("crypto");
  var _c = fs.constants && os.constants ? {fs: fs.constants, os: os.constants} : process.binding("constants");
  var rimraf = require_rimraf();
  var RANDOM_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  var TEMPLATE_PATTERN = /XXXXXX/;
  var DEFAULT_TRIES = 3;
  var CREATE_FLAGS = (_c.O_CREAT || _c.fs.O_CREAT) | (_c.O_EXCL || _c.fs.O_EXCL) | (_c.O_RDWR || _c.fs.O_RDWR);
  var EBADF = _c.EBADF || _c.os.errno.EBADF;
  var ENOENT = _c.ENOENT || _c.os.errno.ENOENT;
  var DIR_MODE = 448;
  var FILE_MODE = 384;
  var EXIT = "exit";
  var SIGINT = "SIGINT";
  var _removeObjects = [];
  var _gracefulCleanup = false;
  function _randomChars(howMany) {
    var value = [], rnd = null;
    try {
      rnd = crypto.randomBytes(howMany);
    } catch (e) {
      rnd = crypto.pseudoRandomBytes(howMany);
    }
    for (var i = 0; i < howMany; i++) {
      value.push(RANDOM_CHARS[rnd[i] % RANDOM_CHARS.length]);
    }
    return value.join("");
  }
  function _isUndefined(obj) {
    return typeof obj === "undefined";
  }
  function _parseArguments(options, callback) {
    if (typeof options === "function") {
      return [{}, options];
    }
    if (_isUndefined(options)) {
      return [{}, callback];
    }
    return [options, callback];
  }
  function _generateTmpName(opts) {
    const tmpDir = _getTmpDir();
    if (isBlank(opts.dir) && isBlank(tmpDir)) {
      throw new Error("No tmp dir specified");
    }
    if (!isBlank(opts.name)) {
      return path.join(opts.dir || tmpDir, opts.name);
    }
    if (opts.template) {
      var template = opts.template;
      if (path.basename(template) === template)
        template = path.join(opts.dir || tmpDir, template);
      return template.replace(TEMPLATE_PATTERN, _randomChars(6));
    }
    const name = [
      isBlank(opts.prefix) ? "tmp-" : opts.prefix,
      process.pid,
      _randomChars(12),
      opts.postfix ? opts.postfix : ""
    ].join("");
    return path.join(opts.dir || tmpDir, name);
  }
  function tmpName(options, callback) {
    var args = _parseArguments(options, callback), opts = args[0], cb = args[1], tries = !isBlank(opts.name) ? 1 : opts.tries || DEFAULT_TRIES;
    if (isNaN(tries) || tries < 0)
      return cb(new Error("Invalid tries"));
    if (opts.template && !opts.template.match(TEMPLATE_PATTERN))
      return cb(new Error("Invalid template provided"));
    (function _getUniqueName() {
      try {
        const name = _generateTmpName(opts);
        fs.stat(name, function(err) {
          if (!err) {
            if (tries-- > 0)
              return _getUniqueName();
            return cb(new Error("Could not get a unique tmp filename, max tries reached " + name));
          }
          cb(null, name);
        });
      } catch (err) {
        cb(err);
      }
    })();
  }
  function tmpNameSync(options) {
    var args = _parseArguments(options), opts = args[0], tries = !isBlank(opts.name) ? 1 : opts.tries || DEFAULT_TRIES;
    if (isNaN(tries) || tries < 0)
      throw new Error("Invalid tries");
    if (opts.template && !opts.template.match(TEMPLATE_PATTERN))
      throw new Error("Invalid template provided");
    do {
      const name = _generateTmpName(opts);
      try {
        fs.statSync(name);
      } catch (e) {
        return name;
      }
    } while (tries-- > 0);
    throw new Error("Could not get a unique tmp filename, max tries reached");
  }
  function file(options, callback) {
    var args = _parseArguments(options, callback), opts = args[0], cb = args[1];
    tmpName(opts, function _tmpNameCreated(err, name) {
      if (err)
        return cb(err);
      fs.open(name, CREATE_FLAGS, opts.mode || FILE_MODE, function _fileCreated(err2, fd) {
        if (err2)
          return cb(err2);
        if (opts.discardDescriptor) {
          return fs.close(fd, function _discardCallback(err3) {
            if (err3) {
              try {
                fs.unlinkSync(name);
              } catch (e) {
                if (!isENOENT(e)) {
                  err3 = e;
                }
              }
              return cb(err3);
            }
            cb(null, name, void 0, _prepareTmpFileRemoveCallback(name, -1, opts));
          });
        }
        if (opts.detachDescriptor) {
          return cb(null, name, fd, _prepareTmpFileRemoveCallback(name, -1, opts));
        }
        cb(null, name, fd, _prepareTmpFileRemoveCallback(name, fd, opts));
      });
    });
  }
  function fileSync(options) {
    var args = _parseArguments(options), opts = args[0];
    const discardOrDetachDescriptor = opts.discardDescriptor || opts.detachDescriptor;
    const name = tmpNameSync(opts);
    var fd = fs.openSync(name, CREATE_FLAGS, opts.mode || FILE_MODE);
    if (opts.discardDescriptor) {
      fs.closeSync(fd);
      fd = void 0;
    }
    return {
      name,
      fd,
      removeCallback: _prepareTmpFileRemoveCallback(name, discardOrDetachDescriptor ? -1 : fd, opts)
    };
  }
  function dir(options, callback) {
    var args = _parseArguments(options, callback), opts = args[0], cb = args[1];
    tmpName(opts, function _tmpNameCreated(err, name) {
      if (err)
        return cb(err);
      fs.mkdir(name, opts.mode || DIR_MODE, function _dirCreated(err2) {
        if (err2)
          return cb(err2);
        cb(null, name, _prepareTmpDirRemoveCallback(name, opts));
      });
    });
  }
  function dirSync(options) {
    var args = _parseArguments(options), opts = args[0];
    const name = tmpNameSync(opts);
    fs.mkdirSync(name, opts.mode || DIR_MODE);
    return {
      name,
      removeCallback: _prepareTmpDirRemoveCallback(name, opts)
    };
  }
  function _removeFileAsync(fdPath, next) {
    const _handler = function(err) {
      if (err && !isENOENT(err)) {
        return next(err);
      }
      next();
    };
    if (0 <= fdPath[0])
      fs.close(fdPath[0], function(err) {
        fs.unlink(fdPath[1], _handler);
      });
    else
      fs.unlink(fdPath[1], _handler);
  }
  function _removeFileSync(fdPath) {
    try {
      if (0 <= fdPath[0])
        fs.closeSync(fdPath[0]);
    } catch (e) {
      if (!isEBADF(e) && !isENOENT(e))
        throw e;
    } finally {
      try {
        fs.unlinkSync(fdPath[1]);
      } catch (e) {
        if (!isENOENT(e))
          throw e;
      }
    }
  }
  function _prepareTmpFileRemoveCallback(name, fd, opts) {
    const removeCallbackSync = _prepareRemoveCallback(_removeFileSync, [fd, name]);
    const removeCallback = _prepareRemoveCallback(_removeFileAsync, [fd, name], removeCallbackSync);
    if (!opts.keep)
      _removeObjects.unshift(removeCallbackSync);
    return removeCallback;
  }
  function _rimrafRemoveDirWrapper(dirPath, next) {
    rimraf(dirPath, next);
  }
  function _rimrafRemoveDirSyncWrapper(dirPath, next) {
    try {
      return next(null, rimraf.sync(dirPath));
    } catch (err) {
      return next(err);
    }
  }
  function _prepareTmpDirRemoveCallback(name, opts) {
    const removeFunction = opts.unsafeCleanup ? _rimrafRemoveDirWrapper : fs.rmdir.bind(fs);
    const removeFunctionSync = opts.unsafeCleanup ? _rimrafRemoveDirSyncWrapper : fs.rmdirSync.bind(fs);
    const removeCallbackSync = _prepareRemoveCallback(removeFunctionSync, name);
    const removeCallback = _prepareRemoveCallback(removeFunction, name, removeCallbackSync);
    if (!opts.keep)
      _removeObjects.unshift(removeCallbackSync);
    return removeCallback;
  }
  function _prepareRemoveCallback(removeFunction, arg, cleanupCallbackSync) {
    var called = false;
    return function _cleanupCallback(next) {
      next = next || function() {
      };
      if (!called) {
        const toRemove = cleanupCallbackSync || _cleanupCallback;
        const index = _removeObjects.indexOf(toRemove);
        if (index >= 0)
          _removeObjects.splice(index, 1);
        called = true;
        if (removeFunction.length === 1) {
          try {
            removeFunction(arg);
            return next(null);
          } catch (err) {
            return next(err);
          }
        } else
          return removeFunction(arg, next);
      } else
        return next(new Error("cleanup callback has already been called"));
    };
  }
  function _garbageCollector() {
    if (!_gracefulCleanup)
      return;
    while (_removeObjects.length) {
      try {
        _removeObjects[0]();
      } catch (e) {
      }
    }
  }
  function isEBADF(error) {
    return isExpectedError(error, -EBADF, "EBADF");
  }
  function isENOENT(error) {
    return isExpectedError(error, -ENOENT, "ENOENT");
  }
  function isExpectedError(error, code, errno) {
    return error.code === code || error.code === errno;
  }
  function isBlank(s) {
    return s === null || s === void 0 || !s.trim();
  }
  function setGracefulCleanup() {
    _gracefulCleanup = true;
  }
  function _getTmpDir() {
    return os.tmpdir();
  }
  function _is_legacy_listener(listener) {
    return (listener.name === "_exit" || listener.name === "_uncaughtExceptionThrown") && listener.toString().indexOf("_garbageCollector();") > -1;
  }
  function _safely_install_sigint_listener() {
    const listeners = process.listeners(SIGINT);
    const existingListeners = [];
    for (let i = 0, length = listeners.length; i < length; i++) {
      const lstnr = listeners[i];
      if (lstnr.name === "_tmp$sigint_listener") {
        existingListeners.push(lstnr);
        process.removeListener(SIGINT, lstnr);
      }
    }
    process.on(SIGINT, function _tmp$sigint_listener(doExit) {
      for (let i = 0, length = existingListeners.length; i < length; i++) {
        try {
          existingListeners[i](false);
        } catch (err) {
        }
      }
      try {
        _garbageCollector();
      } finally {
        if (!!doExit) {
          process.exit(0);
        }
      }
    });
  }
  function _safely_install_exit_listener() {
    const listeners = process.listeners(EXIT);
    const existingListeners = [];
    for (let i = 0, length = listeners.length; i < length; i++) {
      const lstnr = listeners[i];
      if (lstnr.name === "_tmp$safe_listener" || _is_legacy_listener(lstnr)) {
        if (lstnr.name !== "_uncaughtExceptionThrown") {
          existingListeners.push(lstnr);
        }
        process.removeListener(EXIT, lstnr);
      }
    }
    process.addListener(EXIT, function _tmp$safe_listener(data) {
      for (let i = 0, length = existingListeners.length; i < length; i++) {
        try {
          existingListeners[i](data);
        } catch (err) {
        }
      }
      _garbageCollector();
    });
  }
  _safely_install_exit_listener();
  _safely_install_sigint_listener();
  Object.defineProperty(module2.exports, "tmpdir", {
    enumerable: true,
    configurable: false,
    get: function() {
      return _getTmpDir();
    }
  });
  module2.exports.dir = dir;
  module2.exports.dirSync = dirSync;
  module2.exports.file = file;
  module2.exports.fileSync = fileSync;
  module2.exports.tmpName = tmpName;
  module2.exports.tmpNameSync = tmpNameSync;
  module2.exports.setGracefulCleanup = setGracefulCleanup;
});

// node_modules/tmp-promise/index.js
var require_tmp_promise = __commonJS((exports2, module2) => {
  var {promisify} = require("util");
  var tmp = require_tmp();
  module2.exports.fileSync = tmp.fileSync;
  var fileWithOptions = promisify((options, cb) => tmp.file(options, (err, path, fd, cleanup) => err ? cb(err) : cb(void 0, {path, fd, cleanup: promisify(cleanup)})));
  module2.exports.file = async (options) => fileWithOptions(options);
  module2.exports.withFile = async function withFile(fn, options) {
    const {path, fd, cleanup} = await module2.exports.file(options);
    try {
      return await fn({path, fd});
    } finally {
      await cleanup();
    }
  };
  module2.exports.dirSync = tmp.dirSync;
  var dirWithOptions = promisify((options, cb) => tmp.dir(options, (err, path, cleanup) => err ? cb(err) : cb(void 0, {path, cleanup: promisify(cleanup)})));
  module2.exports.dir = async (options) => dirWithOptions(options);
  module2.exports.withDir = async function withDir(fn, options) {
    const {path, cleanup} = await module2.exports.dir(options);
    try {
      return await fn({path});
    } finally {
      await cleanup();
    }
  };
  module2.exports.tmpNameSync = tmp.tmpNameSync;
  module2.exports.tmpName = promisify(tmp.tmpName);
  module2.exports.tmpdir = tmp.tmpdir;
  module2.exports.setGracefulCleanup = tmp.setGracefulCleanup;
});

// node_modules/@actions/artifact/lib/internal/status-reporter.js
var require_status_reporter = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var core_1 = require_core();
  var StatusReporter = class {
    constructor(displayFrequencyInMilliseconds) {
      this.totalNumberOfFilesToProcess = 0;
      this.processedCount = 0;
      this.largeFiles = new Map();
      this.totalFileStatus = void 0;
      this.largeFileStatus = void 0;
      this.displayFrequencyInMilliseconds = displayFrequencyInMilliseconds;
    }
    setTotalNumberOfFilesToProcess(fileTotal) {
      this.totalNumberOfFilesToProcess = fileTotal;
    }
    start() {
      this.totalFileStatus = setInterval(() => {
        const percentage = this.formatPercentage(this.processedCount, this.totalNumberOfFilesToProcess);
        core_1.info(`Total file count: ${this.totalNumberOfFilesToProcess} ---- Processed file #${this.processedCount} (${percentage.slice(0, percentage.indexOf(".") + 2)}%)`);
      }, this.displayFrequencyInMilliseconds);
      this.largeFileStatus = setInterval(() => {
        for (const value of Array.from(this.largeFiles.values())) {
          core_1.info(value);
        }
        this.largeFiles.clear();
      }, 1e3);
    }
    updateLargeFileStatus(fileName, numerator, denominator) {
      const percentage = this.formatPercentage(numerator, denominator);
      const displayInformation = `Uploading ${fileName} (${percentage.slice(0, percentage.indexOf(".") + 2)}%)`;
      this.largeFiles.set(fileName, displayInformation);
    }
    stop() {
      if (this.totalFileStatus) {
        clearInterval(this.totalFileStatus);
      }
      if (this.largeFileStatus) {
        clearInterval(this.largeFileStatus);
      }
    }
    incrementProcessedCount() {
      this.processedCount++;
    }
    formatPercentage(numerator, denominator) {
      return (numerator / denominator * 100).toFixed(4).toString();
    }
  };
  exports2.StatusReporter = StatusReporter;
});

// node_modules/@actions/artifact/lib/internal/http-manager.js
var require_http_manager = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var utils_1 = require_utils2();
  var HttpManager = class {
    constructor(clientCount, userAgent) {
      if (clientCount < 1) {
        throw new Error("There must be at least one client");
      }
      this.userAgent = userAgent;
      this.clients = new Array(clientCount).fill(utils_1.createHttpClient(userAgent));
    }
    getClient(index) {
      return this.clients[index];
    }
    disposeAndReplaceClient(index) {
      this.clients[index].dispose();
      this.clients[index] = utils_1.createHttpClient(this.userAgent);
    }
    disposeAndReplaceAllClients() {
      for (const [index] of this.clients.entries()) {
        this.disposeAndReplaceClient(index);
      }
    }
  };
  exports2.HttpManager = HttpManager;
});

// node_modules/@actions/artifact/lib/internal/upload-gzip.js
var require_upload_gzip = __commonJS((exports2) => {
  "use strict";
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __asyncValues = exports2 && exports2.__asyncValues || function(o) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
      return this;
    }, i);
    function verb(n) {
      i[n] = o[n] && function(v) {
        return new Promise(function(resolve2, reject) {
          v = o[n](v), settle(resolve2, reject, v.done, v.value);
        });
      };
    }
    function settle(resolve2, reject, d, v) {
      Promise.resolve(v).then(function(v2) {
        resolve2({value: v2, done: d});
      }, reject);
    }
  };
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var fs = __importStar(require("fs"));
  var zlib = __importStar(require("zlib"));
  var util_1 = require("util");
  var stat = util_1.promisify(fs.stat);
  function createGZipFileOnDisk(originalFilePath, tempFilePath) {
    return __awaiter(this, void 0, void 0, function* () {
      return new Promise((resolve2, reject) => {
        const inputStream = fs.createReadStream(originalFilePath);
        const gzip = zlib.createGzip();
        const outputStream = fs.createWriteStream(tempFilePath);
        inputStream.pipe(gzip).pipe(outputStream);
        outputStream.on("finish", () => __awaiter(this, void 0, void 0, function* () {
          const size = (yield stat(tempFilePath)).size;
          resolve2(size);
        }));
        outputStream.on("error", (error) => {
          console.log(error);
          reject;
        });
      });
    });
  }
  exports2.createGZipFileOnDisk = createGZipFileOnDisk;
  function createGZipFileInBuffer(originalFilePath) {
    return __awaiter(this, void 0, void 0, function* () {
      return new Promise((resolve2) => __awaiter(this, void 0, void 0, function* () {
        var e_1, _a;
        const inputStream = fs.createReadStream(originalFilePath);
        const gzip = zlib.createGzip();
        inputStream.pipe(gzip);
        const chunks = [];
        try {
          for (var gzip_1 = __asyncValues(gzip), gzip_1_1; gzip_1_1 = yield gzip_1.next(), !gzip_1_1.done; ) {
            const chunk = gzip_1_1.value;
            chunks.push(chunk);
          }
        } catch (e_1_1) {
          e_1 = {error: e_1_1};
        } finally {
          try {
            if (gzip_1_1 && !gzip_1_1.done && (_a = gzip_1.return))
              yield _a.call(gzip_1);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
        resolve2(Buffer.concat(chunks));
      }));
    });
  }
  exports2.createGZipFileInBuffer = createGZipFileInBuffer;
});

// node_modules/@actions/artifact/lib/internal/requestUtils.js
var require_requestUtils = __commonJS((exports2) => {
  "use strict";
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var utils_1 = require_utils2();
  var core = __importStar(require_core());
  var config_variables_1 = require_config_variables();
  function retry(name, operation, customErrorMessages, maxAttempts) {
    return __awaiter(this, void 0, void 0, function* () {
      let response = void 0;
      let statusCode = void 0;
      let isRetryable = false;
      let errorMessage = "";
      let customErrorInformation = void 0;
      let attempt = 1;
      while (attempt <= maxAttempts) {
        try {
          response = yield operation();
          statusCode = response.message.statusCode;
          if (utils_1.isSuccessStatusCode(statusCode)) {
            return response;
          }
          if (statusCode) {
            customErrorInformation = customErrorMessages.get(statusCode);
          }
          isRetryable = utils_1.isRetryableStatusCode(statusCode);
          errorMessage = `Artifact service responded with ${statusCode}`;
        } catch (error) {
          isRetryable = true;
          errorMessage = error.message;
        }
        if (!isRetryable) {
          core.info(`${name} - Error is not retryable`);
          if (response) {
            utils_1.displayHttpDiagnostics(response);
          }
          break;
        }
        core.info(`${name} - Attempt ${attempt} of ${maxAttempts} failed with error: ${errorMessage}`);
        yield utils_1.sleep(utils_1.getExponentialRetryTimeInMilliseconds(attempt));
        attempt++;
      }
      if (response) {
        utils_1.displayHttpDiagnostics(response);
      }
      if (customErrorInformation) {
        throw Error(`${name} failed: ${customErrorInformation}`);
      }
      throw Error(`${name} failed: ${errorMessage}`);
    });
  }
  exports2.retry = retry;
  function retryHttpClientRequest(name, method, customErrorMessages = new Map(), maxAttempts = config_variables_1.getRetryLimit()) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield retry(name, method, customErrorMessages, maxAttempts);
    });
  }
  exports2.retryHttpClientRequest = retryHttpClientRequest;
});

// node_modules/@actions/artifact/lib/internal/upload-http-client.js
var require_upload_http_client = __commonJS((exports2) => {
  "use strict";
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var fs = __importStar(require("fs"));
  var core = __importStar(require_core());
  var tmp = __importStar(require_tmp_promise());
  var stream = __importStar(require("stream"));
  var utils_1 = require_utils2();
  var config_variables_1 = require_config_variables();
  var util_1 = require("util");
  var url_1 = require("url");
  var perf_hooks_1 = require("perf_hooks");
  var status_reporter_1 = require_status_reporter();
  var http_client_1 = require_http_client();
  var http_manager_1 = require_http_manager();
  var upload_gzip_1 = require_upload_gzip();
  var requestUtils_1 = require_requestUtils();
  var stat = util_1.promisify(fs.stat);
  var UploadHttpClient = class {
    constructor() {
      this.uploadHttpManager = new http_manager_1.HttpManager(config_variables_1.getUploadFileConcurrency(), "@actions/artifact-upload");
      this.statusReporter = new status_reporter_1.StatusReporter(1e4);
    }
    createArtifactInFileContainer(artifactName, options) {
      return __awaiter(this, void 0, void 0, function* () {
        const parameters = {
          Type: "actions_storage",
          Name: artifactName
        };
        if (options && options.retentionDays) {
          const maxRetentionStr = config_variables_1.getRetentionDays();
          parameters.RetentionDays = utils_1.getProperRetention(options.retentionDays, maxRetentionStr);
        }
        const data = JSON.stringify(parameters, null, 2);
        const artifactUrl = utils_1.getArtifactUrl();
        const client = this.uploadHttpManager.getClient(0);
        const headers = utils_1.getUploadHeaders("application/json", false);
        const customErrorMessages = new Map([
          [
            http_client_1.HttpCodes.Forbidden,
            "Artifact storage quota has been hit. Unable to upload any new artifacts"
          ],
          [
            http_client_1.HttpCodes.BadRequest,
            `The artifact name ${artifactName} is not valid. Request URL ${artifactUrl}`
          ]
        ]);
        const response = yield requestUtils_1.retryHttpClientRequest("Create Artifact Container", () => __awaiter(this, void 0, void 0, function* () {
          return client.post(artifactUrl, data, headers);
        }), customErrorMessages);
        const body = yield response.readBody();
        return JSON.parse(body);
      });
    }
    uploadArtifactToFileContainer(uploadUrl, filesToUpload, options) {
      return __awaiter(this, void 0, void 0, function* () {
        const FILE_CONCURRENCY = config_variables_1.getUploadFileConcurrency();
        const MAX_CHUNK_SIZE = config_variables_1.getUploadChunkSize();
        core.debug(`File Concurrency: ${FILE_CONCURRENCY}, and Chunk Size: ${MAX_CHUNK_SIZE}`);
        const parameters = [];
        let continueOnError = true;
        if (options) {
          if (options.continueOnError === false) {
            continueOnError = false;
          }
        }
        for (const file of filesToUpload) {
          const resourceUrl = new url_1.URL(uploadUrl);
          resourceUrl.searchParams.append("itemPath", file.uploadFilePath);
          parameters.push({
            file: file.absoluteFilePath,
            resourceUrl: resourceUrl.toString(),
            maxChunkSize: MAX_CHUNK_SIZE,
            continueOnError
          });
        }
        const parallelUploads = [...new Array(FILE_CONCURRENCY).keys()];
        const failedItemsToReport = [];
        let currentFile = 0;
        let completedFiles = 0;
        let uploadFileSize = 0;
        let totalFileSize = 0;
        let abortPendingFileUploads = false;
        this.statusReporter.setTotalNumberOfFilesToProcess(filesToUpload.length);
        this.statusReporter.start();
        yield Promise.all(parallelUploads.map((index) => __awaiter(this, void 0, void 0, function* () {
          while (currentFile < filesToUpload.length) {
            const currentFileParameters = parameters[currentFile];
            currentFile += 1;
            if (abortPendingFileUploads) {
              failedItemsToReport.push(currentFileParameters.file);
              continue;
            }
            const startTime = perf_hooks_1.performance.now();
            const uploadFileResult = yield this.uploadFileAsync(index, currentFileParameters);
            if (core.isDebug()) {
              core.debug(`File: ${++completedFiles}/${filesToUpload.length}. ${currentFileParameters.file} took ${(perf_hooks_1.performance.now() - startTime).toFixed(3)} milliseconds to finish upload`);
            }
            uploadFileSize += uploadFileResult.successfulUploadSize;
            totalFileSize += uploadFileResult.totalSize;
            if (uploadFileResult.isSuccess === false) {
              failedItemsToReport.push(currentFileParameters.file);
              if (!continueOnError) {
                core.error(`aborting artifact upload`);
                abortPendingFileUploads = true;
              }
            }
            this.statusReporter.incrementProcessedCount();
          }
        })));
        this.statusReporter.stop();
        this.uploadHttpManager.disposeAndReplaceAllClients();
        core.info(`Total size of all the files uploaded is ${uploadFileSize} bytes`);
        return {
          uploadSize: uploadFileSize,
          totalSize: totalFileSize,
          failedItems: failedItemsToReport
        };
      });
    }
    uploadFileAsync(httpClientIndex, parameters) {
      return __awaiter(this, void 0, void 0, function* () {
        const totalFileSize = (yield stat(parameters.file)).size;
        let offset = 0;
        let isUploadSuccessful = true;
        let failedChunkSizes = 0;
        let uploadFileSize = 0;
        let isGzip = true;
        if (totalFileSize < 65536) {
          const buffer = yield upload_gzip_1.createGZipFileInBuffer(parameters.file);
          let openUploadStream;
          if (totalFileSize < buffer.byteLength) {
            openUploadStream = () => fs.createReadStream(parameters.file);
            isGzip = false;
            uploadFileSize = totalFileSize;
          } else {
            openUploadStream = () => {
              const passThrough = new stream.PassThrough();
              passThrough.end(buffer);
              return passThrough;
            };
            uploadFileSize = buffer.byteLength;
          }
          const result = yield this.uploadChunk(httpClientIndex, parameters.resourceUrl, openUploadStream, 0, uploadFileSize - 1, uploadFileSize, isGzip, totalFileSize);
          if (!result) {
            isUploadSuccessful = false;
            failedChunkSizes += uploadFileSize;
            core.warning(`Aborting upload for ${parameters.file} due to failure`);
          }
          return {
            isSuccess: isUploadSuccessful,
            successfulUploadSize: uploadFileSize - failedChunkSizes,
            totalSize: totalFileSize
          };
        } else {
          const tempFile = yield tmp.file();
          uploadFileSize = yield upload_gzip_1.createGZipFileOnDisk(parameters.file, tempFile.path);
          let uploadFilePath = tempFile.path;
          if (totalFileSize < uploadFileSize) {
            uploadFileSize = totalFileSize;
            uploadFilePath = parameters.file;
            isGzip = false;
          }
          let abortFileUpload = false;
          while (offset < uploadFileSize) {
            const chunkSize = Math.min(uploadFileSize - offset, parameters.maxChunkSize);
            if (uploadFileSize > 104857600) {
              this.statusReporter.updateLargeFileStatus(parameters.file, offset, uploadFileSize);
            }
            const start = offset;
            const end = offset + chunkSize - 1;
            offset += parameters.maxChunkSize;
            if (abortFileUpload) {
              failedChunkSizes += chunkSize;
              continue;
            }
            const result = yield this.uploadChunk(httpClientIndex, parameters.resourceUrl, () => fs.createReadStream(uploadFilePath, {
              start,
              end,
              autoClose: false
            }), start, end, uploadFileSize, isGzip, totalFileSize);
            if (!result) {
              isUploadSuccessful = false;
              failedChunkSizes += chunkSize;
              core.warning(`Aborting upload for ${parameters.file} due to failure`);
              abortFileUpload = true;
            }
          }
          yield tempFile.cleanup();
          return {
            isSuccess: isUploadSuccessful,
            successfulUploadSize: uploadFileSize - failedChunkSizes,
            totalSize: totalFileSize
          };
        }
      });
    }
    uploadChunk(httpClientIndex, resourceUrl, openStream, start, end, uploadFileSize, isGzip, totalFileSize) {
      return __awaiter(this, void 0, void 0, function* () {
        const headers = utils_1.getUploadHeaders("application/octet-stream", true, isGzip, totalFileSize, end - start + 1, utils_1.getContentRange(start, end, uploadFileSize));
        const uploadChunkRequest = () => __awaiter(this, void 0, void 0, function* () {
          const client = this.uploadHttpManager.getClient(httpClientIndex);
          return yield client.sendStream("PUT", resourceUrl, openStream(), headers);
        });
        let retryCount = 0;
        const retryLimit = config_variables_1.getRetryLimit();
        const incrementAndCheckRetryLimit = (response) => {
          retryCount++;
          if (retryCount > retryLimit) {
            if (response) {
              utils_1.displayHttpDiagnostics(response);
            }
            core.info(`Retry limit has been reached for chunk at offset ${start} to ${resourceUrl}`);
            return true;
          }
          return false;
        };
        const backOff = (retryAfterValue) => __awaiter(this, void 0, void 0, function* () {
          this.uploadHttpManager.disposeAndReplaceClient(httpClientIndex);
          if (retryAfterValue) {
            core.info(`Backoff due to too many requests, retry #${retryCount}. Waiting for ${retryAfterValue} milliseconds before continuing the upload`);
            yield utils_1.sleep(retryAfterValue);
          } else {
            const backoffTime = utils_1.getExponentialRetryTimeInMilliseconds(retryCount);
            core.info(`Exponential backoff for retry #${retryCount}. Waiting for ${backoffTime} milliseconds before continuing the upload at offset ${start}`);
            yield utils_1.sleep(backoffTime);
          }
          core.info(`Finished backoff for retry #${retryCount}, continuing with upload`);
          return;
        });
        while (retryCount <= retryLimit) {
          let response;
          try {
            response = yield uploadChunkRequest();
          } catch (error) {
            core.info(`An error has been caught http-client index ${httpClientIndex}, retrying the upload`);
            console.log(error);
            if (incrementAndCheckRetryLimit()) {
              return false;
            }
            yield backOff();
            continue;
          }
          yield response.readBody();
          if (utils_1.isSuccessStatusCode(response.message.statusCode)) {
            return true;
          } else if (utils_1.isRetryableStatusCode(response.message.statusCode)) {
            core.info(`A ${response.message.statusCode} status code has been received, will attempt to retry the upload`);
            if (incrementAndCheckRetryLimit(response)) {
              return false;
            }
            utils_1.isThrottledStatusCode(response.message.statusCode) ? yield backOff(utils_1.tryGetRetryAfterValueTimeInMilliseconds(response.message.headers)) : yield backOff();
          } else {
            core.error(`Unexpected response. Unable to upload chunk to ${resourceUrl}`);
            utils_1.displayHttpDiagnostics(response);
            return false;
          }
        }
        return false;
      });
    }
    patchArtifactSize(size, artifactName) {
      return __awaiter(this, void 0, void 0, function* () {
        const resourceUrl = new url_1.URL(utils_1.getArtifactUrl());
        resourceUrl.searchParams.append("artifactName", artifactName);
        const parameters = {Size: size};
        const data = JSON.stringify(parameters, null, 2);
        core.debug(`URL is ${resourceUrl.toString()}`);
        const client = this.uploadHttpManager.getClient(0);
        const headers = utils_1.getUploadHeaders("application/json", false);
        const customErrorMessages = new Map([
          [
            http_client_1.HttpCodes.NotFound,
            `An Artifact with the name ${artifactName} was not found`
          ]
        ]);
        const response = yield requestUtils_1.retryHttpClientRequest("Finalize artifact upload", () => __awaiter(this, void 0, void 0, function* () {
          return client.patch(resourceUrl.toString(), data, headers);
        }), customErrorMessages);
        yield response.readBody();
        core.debug(`Artifact ${artifactName} has been successfully uploaded, total size in bytes: ${size}`);
      });
    }
  };
  exports2.UploadHttpClient = UploadHttpClient;
});

// node_modules/@actions/artifact/lib/internal/download-http-client.js
var require_download_http_client = __commonJS((exports2) => {
  "use strict";
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var fs = __importStar(require("fs"));
  var core = __importStar(require_core());
  var zlib = __importStar(require("zlib"));
  var utils_1 = require_utils2();
  var url_1 = require("url");
  var status_reporter_1 = require_status_reporter();
  var perf_hooks_1 = require("perf_hooks");
  var http_manager_1 = require_http_manager();
  var config_variables_1 = require_config_variables();
  var requestUtils_1 = require_requestUtils();
  var DownloadHttpClient = class {
    constructor() {
      this.downloadHttpManager = new http_manager_1.HttpManager(config_variables_1.getDownloadFileConcurrency(), "@actions/artifact-download");
      this.statusReporter = new status_reporter_1.StatusReporter(1e3);
    }
    listArtifacts() {
      return __awaiter(this, void 0, void 0, function* () {
        const artifactUrl = utils_1.getArtifactUrl();
        const client = this.downloadHttpManager.getClient(0);
        const headers = utils_1.getDownloadHeaders("application/json");
        const response = yield requestUtils_1.retryHttpClientRequest("List Artifacts", () => __awaiter(this, void 0, void 0, function* () {
          return client.get(artifactUrl, headers);
        }));
        const body = yield response.readBody();
        return JSON.parse(body);
      });
    }
    getContainerItems(artifactName, containerUrl) {
      return __awaiter(this, void 0, void 0, function* () {
        const resourceUrl = new url_1.URL(containerUrl);
        resourceUrl.searchParams.append("itemPath", artifactName);
        const client = this.downloadHttpManager.getClient(0);
        const headers = utils_1.getDownloadHeaders("application/json");
        const response = yield requestUtils_1.retryHttpClientRequest("Get Container Items", () => __awaiter(this, void 0, void 0, function* () {
          return client.get(resourceUrl.toString(), headers);
        }));
        const body = yield response.readBody();
        return JSON.parse(body);
      });
    }
    downloadSingleArtifact(downloadItems) {
      return __awaiter(this, void 0, void 0, function* () {
        const DOWNLOAD_CONCURRENCY = config_variables_1.getDownloadFileConcurrency();
        core.debug(`Download file concurrency is set to ${DOWNLOAD_CONCURRENCY}`);
        const parallelDownloads = [...new Array(DOWNLOAD_CONCURRENCY).keys()];
        let currentFile = 0;
        let downloadedFiles = 0;
        core.info(`Total number of files that will be downloaded: ${downloadItems.length}`);
        this.statusReporter.setTotalNumberOfFilesToProcess(downloadItems.length);
        this.statusReporter.start();
        yield Promise.all(parallelDownloads.map((index) => __awaiter(this, void 0, void 0, function* () {
          while (currentFile < downloadItems.length) {
            const currentFileToDownload = downloadItems[currentFile];
            currentFile += 1;
            const startTime = perf_hooks_1.performance.now();
            yield this.downloadIndividualFile(index, currentFileToDownload.sourceLocation, currentFileToDownload.targetPath);
            if (core.isDebug()) {
              core.debug(`File: ${++downloadedFiles}/${downloadItems.length}. ${currentFileToDownload.targetPath} took ${(perf_hooks_1.performance.now() - startTime).toFixed(3)} milliseconds to finish downloading`);
            }
            this.statusReporter.incrementProcessedCount();
          }
        }))).catch((error) => {
          throw new Error(`Unable to download the artifact: ${error}`);
        }).finally(() => {
          this.statusReporter.stop();
          this.downloadHttpManager.disposeAndReplaceAllClients();
        });
      });
    }
    downloadIndividualFile(httpClientIndex, artifactLocation, downloadPath) {
      return __awaiter(this, void 0, void 0, function* () {
        let retryCount = 0;
        const retryLimit = config_variables_1.getRetryLimit();
        let destinationStream = fs.createWriteStream(downloadPath);
        const headers = utils_1.getDownloadHeaders("application/json", true, true);
        const makeDownloadRequest = () => __awaiter(this, void 0, void 0, function* () {
          const client = this.downloadHttpManager.getClient(httpClientIndex);
          return yield client.get(artifactLocation, headers);
        });
        const isGzip = (incomingHeaders) => {
          return "content-encoding" in incomingHeaders && incomingHeaders["content-encoding"] === "gzip";
        };
        const backOff = (retryAfterValue) => __awaiter(this, void 0, void 0, function* () {
          retryCount++;
          if (retryCount > retryLimit) {
            return Promise.reject(new Error(`Retry limit has been reached. Unable to download ${artifactLocation}`));
          } else {
            this.downloadHttpManager.disposeAndReplaceClient(httpClientIndex);
            if (retryAfterValue) {
              core.info(`Backoff due to too many requests, retry #${retryCount}. Waiting for ${retryAfterValue} milliseconds before continuing the download`);
              yield utils_1.sleep(retryAfterValue);
            } else {
              const backoffTime = utils_1.getExponentialRetryTimeInMilliseconds(retryCount);
              core.info(`Exponential backoff for retry #${retryCount}. Waiting for ${backoffTime} milliseconds before continuing the download`);
              yield utils_1.sleep(backoffTime);
            }
            core.info(`Finished backoff for retry #${retryCount}, continuing with download`);
          }
        });
        const isAllBytesReceived = (expected, received) => {
          if (!expected || !received || process.env["ACTIONS_ARTIFACT_SKIP_DOWNLOAD_VALIDATION"]) {
            core.info("Skipping download validation.");
            return true;
          }
          return parseInt(expected) === received;
        };
        const resetDestinationStream = (fileDownloadPath) => __awaiter(this, void 0, void 0, function* () {
          destinationStream.close();
          yield utils_1.rmFile(fileDownloadPath);
          destinationStream = fs.createWriteStream(fileDownloadPath);
        });
        while (retryCount <= retryLimit) {
          let response;
          try {
            response = yield makeDownloadRequest();
            if (core.isDebug()) {
              utils_1.displayHttpDiagnostics(response);
            }
          } catch (error) {
            core.info("An error occurred while attempting to download a file");
            console.log(error);
            yield backOff();
            continue;
          }
          let forceRetry = false;
          if (utils_1.isSuccessStatusCode(response.message.statusCode)) {
            try {
              const isGzipped = isGzip(response.message.headers);
              yield this.pipeResponseToFile(response, destinationStream, isGzipped);
              if (isGzipped || isAllBytesReceived(response.message.headers["content-length"], yield utils_1.getFileSize(downloadPath))) {
                return;
              } else {
                forceRetry = true;
              }
            } catch (error) {
              forceRetry = true;
            }
          }
          if (forceRetry || utils_1.isRetryableStatusCode(response.message.statusCode)) {
            core.info(`A ${response.message.statusCode} response code has been received while attempting to download an artifact`);
            resetDestinationStream(downloadPath);
            utils_1.isThrottledStatusCode(response.message.statusCode) ? yield backOff(utils_1.tryGetRetryAfterValueTimeInMilliseconds(response.message.headers)) : yield backOff();
          } else {
            utils_1.displayHttpDiagnostics(response);
            return Promise.reject(new Error(`Unexpected http ${response.message.statusCode} during download for ${artifactLocation}`));
          }
        }
      });
    }
    pipeResponseToFile(response, destinationStream, isGzip) {
      return __awaiter(this, void 0, void 0, function* () {
        yield new Promise((resolve2, reject) => {
          if (isGzip) {
            const gunzip = zlib.createGunzip();
            response.message.on("error", (error) => {
              core.error(`An error occurred while attempting to read the response stream`);
              gunzip.close();
              destinationStream.close();
              reject(error);
            }).pipe(gunzip).on("error", (error) => {
              core.error(`An error occurred while attempting to decompress the response stream`);
              destinationStream.close();
              reject(error);
            }).pipe(destinationStream).on("close", () => {
              resolve2();
            }).on("error", (error) => {
              core.error(`An error occurred while writing a downloaded file to ${destinationStream.path}`);
              reject(error);
            });
          } else {
            response.message.on("error", (error) => {
              core.error(`An error occurred while attempting to read the response stream`);
              destinationStream.close();
              reject(error);
            }).pipe(destinationStream).on("close", () => {
              resolve2();
            }).on("error", (error) => {
              core.error(`An error occurred while writing a downloaded file to ${destinationStream.path}`);
              reject(error);
            });
          }
        });
        return;
      });
    }
  };
  exports2.DownloadHttpClient = DownloadHttpClient;
});

// node_modules/@actions/artifact/lib/internal/download-specification.js
var require_download_specification = __commonJS((exports2) => {
  "use strict";
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var path = __importStar(require("path"));
  function getDownloadSpecification(artifactName, artifactEntries, downloadPath, includeRootDirectory) {
    const directories = new Set();
    const specifications = {
      rootDownloadLocation: includeRootDirectory ? path.join(downloadPath, artifactName) : downloadPath,
      directoryStructure: [],
      emptyFilesToCreate: [],
      filesToDownload: []
    };
    for (const entry of artifactEntries) {
      if (entry.path.startsWith(`${artifactName}/`) || entry.path.startsWith(`${artifactName}\\`)) {
        const normalizedPathEntry = path.normalize(entry.path);
        const filePath = path.join(downloadPath, includeRootDirectory ? normalizedPathEntry : normalizedPathEntry.replace(artifactName, ""));
        if (entry.itemType === "file") {
          directories.add(path.dirname(filePath));
          if (entry.fileLength === 0) {
            specifications.emptyFilesToCreate.push(filePath);
          } else {
            specifications.filesToDownload.push({
              sourceLocation: entry.contentLocation,
              targetPath: filePath
            });
          }
        }
      }
    }
    specifications.directoryStructure = Array.from(directories);
    return specifications;
  }
  exports2.getDownloadSpecification = getDownloadSpecification;
});

// node_modules/@actions/artifact/lib/internal/artifact-client.js
var require_artifact_client = __commonJS((exports2) => {
  "use strict";
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var core = __importStar(require_core());
  var upload_specification_1 = require_upload_specification();
  var upload_http_client_1 = require_upload_http_client();
  var utils_1 = require_utils2();
  var download_http_client_1 = require_download_http_client();
  var download_specification_1 = require_download_specification();
  var config_variables_1 = require_config_variables();
  var path_1 = require("path");
  var DefaultArtifactClient = class {
    static create() {
      return new DefaultArtifactClient();
    }
    uploadArtifact(name, files, rootDirectory, options) {
      return __awaiter(this, void 0, void 0, function* () {
        utils_1.checkArtifactName(name);
        const uploadSpecification = upload_specification_1.getUploadSpecification(name, rootDirectory, files);
        const uploadResponse = {
          artifactName: name,
          artifactItems: [],
          size: 0,
          failedItems: []
        };
        const uploadHttpClient = new upload_http_client_1.UploadHttpClient();
        if (uploadSpecification.length === 0) {
          core.warning(`No files found that can be uploaded`);
        } else {
          const response = yield uploadHttpClient.createArtifactInFileContainer(name, options);
          if (!response.fileContainerResourceUrl) {
            core.debug(response.toString());
            throw new Error("No URL provided by the Artifact Service to upload an artifact to");
          }
          core.debug(`Upload Resource URL: ${response.fileContainerResourceUrl}`);
          const uploadResult = yield uploadHttpClient.uploadArtifactToFileContainer(response.fileContainerResourceUrl, uploadSpecification, options);
          yield uploadHttpClient.patchArtifactSize(uploadResult.totalSize, name);
          core.info(`Finished uploading artifact ${name}. Reported size is ${uploadResult.uploadSize} bytes. There were ${uploadResult.failedItems.length} items that failed to upload`);
          uploadResponse.artifactItems = uploadSpecification.map((item) => item.absoluteFilePath);
          uploadResponse.size = uploadResult.uploadSize;
          uploadResponse.failedItems = uploadResult.failedItems;
        }
        return uploadResponse;
      });
    }
    downloadArtifact(name, path, options) {
      return __awaiter(this, void 0, void 0, function* () {
        const downloadHttpClient = new download_http_client_1.DownloadHttpClient();
        const artifacts = yield downloadHttpClient.listArtifacts();
        if (artifacts.count === 0) {
          throw new Error(`Unable to find any artifacts for the associated workflow`);
        }
        const artifactToDownload = artifacts.value.find((artifact) => {
          return artifact.name === name;
        });
        if (!artifactToDownload) {
          throw new Error(`Unable to find an artifact with the name: ${name}`);
        }
        const items = yield downloadHttpClient.getContainerItems(artifactToDownload.name, artifactToDownload.fileContainerResourceUrl);
        if (!path) {
          path = config_variables_1.getWorkSpaceDirectory();
        }
        path = path_1.normalize(path);
        path = path_1.resolve(path);
        const downloadSpecification = download_specification_1.getDownloadSpecification(name, items.value, path, (options === null || options === void 0 ? void 0 : options.createArtifactFolder) || false);
        if (downloadSpecification.filesToDownload.length === 0) {
          core.info(`No downloadable files were found for the artifact: ${artifactToDownload.name}`);
        } else {
          yield utils_1.createDirectoriesForArtifact(downloadSpecification.directoryStructure);
          core.info("Directory structure has been setup for the artifact");
          yield utils_1.createEmptyFilesForArtifact(downloadSpecification.emptyFilesToCreate);
          yield downloadHttpClient.downloadSingleArtifact(downloadSpecification.filesToDownload);
        }
        return {
          artifactName: name,
          downloadPath: downloadSpecification.rootDownloadLocation
        };
      });
    }
    downloadAllArtifacts(path) {
      return __awaiter(this, void 0, void 0, function* () {
        const downloadHttpClient = new download_http_client_1.DownloadHttpClient();
        const response = [];
        const artifacts = yield downloadHttpClient.listArtifacts();
        if (artifacts.count === 0) {
          core.info("Unable to find any artifacts for the associated workflow");
          return response;
        }
        if (!path) {
          path = config_variables_1.getWorkSpaceDirectory();
        }
        path = path_1.normalize(path);
        path = path_1.resolve(path);
        let downloadedArtifacts = 0;
        while (downloadedArtifacts < artifacts.count) {
          const currentArtifactToDownload = artifacts.value[downloadedArtifacts];
          downloadedArtifacts += 1;
          const items = yield downloadHttpClient.getContainerItems(currentArtifactToDownload.name, currentArtifactToDownload.fileContainerResourceUrl);
          const downloadSpecification = download_specification_1.getDownloadSpecification(currentArtifactToDownload.name, items.value, path, true);
          if (downloadSpecification.filesToDownload.length === 0) {
            core.info(`No downloadable files were found for any artifact ${currentArtifactToDownload.name}`);
          } else {
            yield utils_1.createDirectoriesForArtifact(downloadSpecification.directoryStructure);
            yield utils_1.createEmptyFilesForArtifact(downloadSpecification.emptyFilesToCreate);
            yield downloadHttpClient.downloadSingleArtifact(downloadSpecification.filesToDownload);
          }
          response.push({
            artifactName: currentArtifactToDownload.name,
            downloadPath: downloadSpecification.rootDownloadLocation
          });
        }
        return response;
      });
    }
  };
  exports2.DefaultArtifactClient = DefaultArtifactClient;
});

// node_modules/@actions/artifact/lib/artifact-client.js
var require_artifact_client2 = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var artifact_client_1 = require_artifact_client();
  function create() {
    return artifact_client_1.DefaultArtifactClient.create();
  }
  exports2.create = create;
});

// node_modules/@actions/io/lib/io-util.js
var require_io_util = __commonJS((exports2) => {
  "use strict";
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var _a;
  Object.defineProperty(exports2, "__esModule", {value: true});
  var assert_1 = require("assert");
  var fs = require("fs");
  var path = require("path");
  _a = fs.promises, exports2.chmod = _a.chmod, exports2.copyFile = _a.copyFile, exports2.lstat = _a.lstat, exports2.mkdir = _a.mkdir, exports2.readdir = _a.readdir, exports2.readlink = _a.readlink, exports2.rename = _a.rename, exports2.rmdir = _a.rmdir, exports2.stat = _a.stat, exports2.symlink = _a.symlink, exports2.unlink = _a.unlink;
  exports2.IS_WINDOWS = process.platform === "win32";
  function exists(fsPath) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        yield exports2.stat(fsPath);
      } catch (err) {
        if (err.code === "ENOENT") {
          return false;
        }
        throw err;
      }
      return true;
    });
  }
  exports2.exists = exists;
  function isDirectory(fsPath, useStat = false) {
    return __awaiter(this, void 0, void 0, function* () {
      const stats = useStat ? yield exports2.stat(fsPath) : yield exports2.lstat(fsPath);
      return stats.isDirectory();
    });
  }
  exports2.isDirectory = isDirectory;
  function isRooted(p) {
    p = normalizeSeparators(p);
    if (!p) {
      throw new Error('isRooted() parameter "p" cannot be empty');
    }
    if (exports2.IS_WINDOWS) {
      return p.startsWith("\\") || /^[A-Z]:/i.test(p);
    }
    return p.startsWith("/");
  }
  exports2.isRooted = isRooted;
  function mkdirP(fsPath, maxDepth = 1e3, depth = 1) {
    return __awaiter(this, void 0, void 0, function* () {
      assert_1.ok(fsPath, "a path argument must be provided");
      fsPath = path.resolve(fsPath);
      if (depth >= maxDepth)
        return exports2.mkdir(fsPath);
      try {
        yield exports2.mkdir(fsPath);
        return;
      } catch (err) {
        switch (err.code) {
          case "ENOENT": {
            yield mkdirP(path.dirname(fsPath), maxDepth, depth + 1);
            yield exports2.mkdir(fsPath);
            return;
          }
          default: {
            let stats;
            try {
              stats = yield exports2.stat(fsPath);
            } catch (err2) {
              throw err;
            }
            if (!stats.isDirectory())
              throw err;
          }
        }
      }
    });
  }
  exports2.mkdirP = mkdirP;
  function tryGetExecutablePath(filePath, extensions) {
    return __awaiter(this, void 0, void 0, function* () {
      let stats = void 0;
      try {
        stats = yield exports2.stat(filePath);
      } catch (err) {
        if (err.code !== "ENOENT") {
          console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
        }
      }
      if (stats && stats.isFile()) {
        if (exports2.IS_WINDOWS) {
          const upperExt = path.extname(filePath).toUpperCase();
          if (extensions.some((validExt) => validExt.toUpperCase() === upperExt)) {
            return filePath;
          }
        } else {
          if (isUnixExecutable(stats)) {
            return filePath;
          }
        }
      }
      const originalFilePath = filePath;
      for (const extension of extensions) {
        filePath = originalFilePath + extension;
        stats = void 0;
        try {
          stats = yield exports2.stat(filePath);
        } catch (err) {
          if (err.code !== "ENOENT") {
            console.log(`Unexpected error attempting to determine if executable file exists '${filePath}': ${err}`);
          }
        }
        if (stats && stats.isFile()) {
          if (exports2.IS_WINDOWS) {
            try {
              const directory = path.dirname(filePath);
              const upperName = path.basename(filePath).toUpperCase();
              for (const actualName of yield exports2.readdir(directory)) {
                if (upperName === actualName.toUpperCase()) {
                  filePath = path.join(directory, actualName);
                  break;
                }
              }
            } catch (err) {
              console.log(`Unexpected error attempting to determine the actual case of the file '${filePath}': ${err}`);
            }
            return filePath;
          } else {
            if (isUnixExecutable(stats)) {
              return filePath;
            }
          }
        }
      }
      return "";
    });
  }
  exports2.tryGetExecutablePath = tryGetExecutablePath;
  function normalizeSeparators(p) {
    p = p || "";
    if (exports2.IS_WINDOWS) {
      p = p.replace(/\//g, "\\");
      return p.replace(/\\\\+/g, "\\");
    }
    return p.replace(/\/\/+/g, "/");
  }
  function isUnixExecutable(stats) {
    return (stats.mode & 1) > 0 || (stats.mode & 8) > 0 && stats.gid === process.getgid() || (stats.mode & 64) > 0 && stats.uid === process.getuid();
  }
});

// node_modules/@actions/io/lib/io.js
var require_io = __commonJS((exports2) => {
  "use strict";
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var childProcess = require("child_process");
  var path = require("path");
  var util_1 = require("util");
  var ioUtil = require_io_util();
  var exec2 = util_1.promisify(childProcess.exec);
  function cp2(source, dest, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
      const {force, recursive} = readCopyOptions(options);
      const destStat = (yield ioUtil.exists(dest)) ? yield ioUtil.stat(dest) : null;
      if (destStat && destStat.isFile() && !force) {
        return;
      }
      const newDest = destStat && destStat.isDirectory() ? path.join(dest, path.basename(source)) : dest;
      if (!(yield ioUtil.exists(source))) {
        throw new Error(`no such file or directory: ${source}`);
      }
      const sourceStat = yield ioUtil.stat(source);
      if (sourceStat.isDirectory()) {
        if (!recursive) {
          throw new Error(`Failed to copy. ${source} is a directory, but tried to copy without recursive flag.`);
        } else {
          yield cpDirRecursive(source, newDest, 0, force);
        }
      } else {
        if (path.relative(source, newDest) === "") {
          throw new Error(`'${newDest}' and '${source}' are the same file`);
        }
        yield copyFile(source, newDest, force);
      }
    });
  }
  exports2.cp = cp2;
  function mv(source, dest, options = {}) {
    return __awaiter(this, void 0, void 0, function* () {
      if (yield ioUtil.exists(dest)) {
        let destExists = true;
        if (yield ioUtil.isDirectory(dest)) {
          dest = path.join(dest, path.basename(source));
          destExists = yield ioUtil.exists(dest);
        }
        if (destExists) {
          if (options.force == null || options.force) {
            yield rmRF(dest);
          } else {
            throw new Error("Destination already exists");
          }
        }
      }
      yield mkdirP(path.dirname(dest));
      yield ioUtil.rename(source, dest);
    });
  }
  exports2.mv = mv;
  function rmRF(inputPath) {
    return __awaiter(this, void 0, void 0, function* () {
      if (ioUtil.IS_WINDOWS) {
        try {
          if (yield ioUtil.isDirectory(inputPath, true)) {
            yield exec2(`rd /s /q "${inputPath}"`);
          } else {
            yield exec2(`del /f /a "${inputPath}"`);
          }
        } catch (err) {
          if (err.code !== "ENOENT")
            throw err;
        }
        try {
          yield ioUtil.unlink(inputPath);
        } catch (err) {
          if (err.code !== "ENOENT")
            throw err;
        }
      } else {
        let isDir = false;
        try {
          isDir = yield ioUtil.isDirectory(inputPath);
        } catch (err) {
          if (err.code !== "ENOENT")
            throw err;
          return;
        }
        if (isDir) {
          yield exec2(`rm -rf "${inputPath}"`);
        } else {
          yield ioUtil.unlink(inputPath);
        }
      }
    });
  }
  exports2.rmRF = rmRF;
  function mkdirP(fsPath) {
    return __awaiter(this, void 0, void 0, function* () {
      yield ioUtil.mkdirP(fsPath);
    });
  }
  exports2.mkdirP = mkdirP;
  function which(tool, check) {
    return __awaiter(this, void 0, void 0, function* () {
      if (!tool) {
        throw new Error("parameter 'tool' is required");
      }
      if (check) {
        const result = yield which(tool, false);
        if (!result) {
          if (ioUtil.IS_WINDOWS) {
            throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also verify the file has a valid extension for an executable file.`);
          } else {
            throw new Error(`Unable to locate executable file: ${tool}. Please verify either the file path exists or the file can be found within a directory specified by the PATH environment variable. Also check the file mode to verify the file is executable.`);
          }
        }
      }
      try {
        const extensions = [];
        if (ioUtil.IS_WINDOWS && process.env.PATHEXT) {
          for (const extension of process.env.PATHEXT.split(path.delimiter)) {
            if (extension) {
              extensions.push(extension);
            }
          }
        }
        if (ioUtil.isRooted(tool)) {
          const filePath = yield ioUtil.tryGetExecutablePath(tool, extensions);
          if (filePath) {
            return filePath;
          }
          return "";
        }
        if (tool.includes("/") || ioUtil.IS_WINDOWS && tool.includes("\\")) {
          return "";
        }
        const directories = [];
        if (process.env.PATH) {
          for (const p of process.env.PATH.split(path.delimiter)) {
            if (p) {
              directories.push(p);
            }
          }
        }
        for (const directory of directories) {
          const filePath = yield ioUtil.tryGetExecutablePath(directory + path.sep + tool, extensions);
          if (filePath) {
            return filePath;
          }
        }
        return "";
      } catch (err) {
        throw new Error(`which failed with message ${err.message}`);
      }
    });
  }
  exports2.which = which;
  function readCopyOptions(options) {
    const force = options.force == null ? true : options.force;
    const recursive = Boolean(options.recursive);
    return {force, recursive};
  }
  function cpDirRecursive(sourceDir, destDir, currentDepth, force) {
    return __awaiter(this, void 0, void 0, function* () {
      if (currentDepth >= 255)
        return;
      currentDepth++;
      yield mkdirP(destDir);
      const files = yield ioUtil.readdir(sourceDir);
      for (const fileName of files) {
        const srcFile = `${sourceDir}/${fileName}`;
        const destFile = `${destDir}/${fileName}`;
        const srcFileStat = yield ioUtil.lstat(srcFile);
        if (srcFileStat.isDirectory()) {
          yield cpDirRecursive(srcFile, destFile, currentDepth, force);
        } else {
          yield copyFile(srcFile, destFile, force);
        }
      }
      yield ioUtil.chmod(destDir, (yield ioUtil.stat(sourceDir)).mode);
    });
  }
  function copyFile(srcFile, destFile, force) {
    return __awaiter(this, void 0, void 0, function* () {
      if ((yield ioUtil.lstat(srcFile)).isSymbolicLink()) {
        try {
          yield ioUtil.lstat(destFile);
          yield ioUtil.unlink(destFile);
        } catch (e) {
          if (e.code === "EPERM") {
            yield ioUtil.chmod(destFile, "0666");
            yield ioUtil.unlink(destFile);
          }
        }
        const symlinkFull = yield ioUtil.readlink(srcFile);
        yield ioUtil.symlink(symlinkFull, destFile, ioUtil.IS_WINDOWS ? "junction" : null);
      } else if (!(yield ioUtil.exists(destFile)) || force) {
        yield ioUtil.copyFile(srcFile, destFile);
      }
    });
  }
});

// node_modules/@actions/exec/lib/toolrunner.js
var require_toolrunner = __commonJS((exports2) => {
  "use strict";
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var os = __importStar(require("os"));
  var events = __importStar(require("events"));
  var child = __importStar(require("child_process"));
  var path = __importStar(require("path"));
  var io = __importStar(require_io());
  var ioUtil = __importStar(require_io_util());
  var IS_WINDOWS = process.platform === "win32";
  var ToolRunner = class extends events.EventEmitter {
    constructor(toolPath, args, options) {
      super();
      if (!toolPath) {
        throw new Error("Parameter 'toolPath' cannot be null or empty.");
      }
      this.toolPath = toolPath;
      this.args = args || [];
      this.options = options || {};
    }
    _debug(message) {
      if (this.options.listeners && this.options.listeners.debug) {
        this.options.listeners.debug(message);
      }
    }
    _getCommandString(options, noPrefix) {
      const toolPath = this._getSpawnFileName();
      const args = this._getSpawnArgs(options);
      let cmd = noPrefix ? "" : "[command]";
      if (IS_WINDOWS) {
        if (this._isCmdFile()) {
          cmd += toolPath;
          for (const a of args) {
            cmd += ` ${a}`;
          }
        } else if (options.windowsVerbatimArguments) {
          cmd += `"${toolPath}"`;
          for (const a of args) {
            cmd += ` ${a}`;
          }
        } else {
          cmd += this._windowsQuoteCmdArg(toolPath);
          for (const a of args) {
            cmd += ` ${this._windowsQuoteCmdArg(a)}`;
          }
        }
      } else {
        cmd += toolPath;
        for (const a of args) {
          cmd += ` ${a}`;
        }
      }
      return cmd;
    }
    _processLineBuffer(data, strBuffer, onLine) {
      try {
        let s = strBuffer + data.toString();
        let n = s.indexOf(os.EOL);
        while (n > -1) {
          const line = s.substring(0, n);
          onLine(line);
          s = s.substring(n + os.EOL.length);
          n = s.indexOf(os.EOL);
        }
        strBuffer = s;
      } catch (err) {
        this._debug(`error processing line. Failed with error ${err}`);
      }
    }
    _getSpawnFileName() {
      if (IS_WINDOWS) {
        if (this._isCmdFile()) {
          return process.env["COMSPEC"] || "cmd.exe";
        }
      }
      return this.toolPath;
    }
    _getSpawnArgs(options) {
      if (IS_WINDOWS) {
        if (this._isCmdFile()) {
          let argline = `/D /S /C "${this._windowsQuoteCmdArg(this.toolPath)}`;
          for (const a of this.args) {
            argline += " ";
            argline += options.windowsVerbatimArguments ? a : this._windowsQuoteCmdArg(a);
          }
          argline += '"';
          return [argline];
        }
      }
      return this.args;
    }
    _endsWith(str, end) {
      return str.endsWith(end);
    }
    _isCmdFile() {
      const upperToolPath = this.toolPath.toUpperCase();
      return this._endsWith(upperToolPath, ".CMD") || this._endsWith(upperToolPath, ".BAT");
    }
    _windowsQuoteCmdArg(arg) {
      if (!this._isCmdFile()) {
        return this._uvQuoteCmdArg(arg);
      }
      if (!arg) {
        return '""';
      }
      const cmdSpecialChars = [
        " ",
        "	",
        "&",
        "(",
        ")",
        "[",
        "]",
        "{",
        "}",
        "^",
        "=",
        ";",
        "!",
        "'",
        "+",
        ",",
        "`",
        "~",
        "|",
        "<",
        ">",
        '"'
      ];
      let needsQuotes = false;
      for (const char of arg) {
        if (cmdSpecialChars.some((x) => x === char)) {
          needsQuotes = true;
          break;
        }
      }
      if (!needsQuotes) {
        return arg;
      }
      let reverse = '"';
      let quoteHit = true;
      for (let i = arg.length; i > 0; i--) {
        reverse += arg[i - 1];
        if (quoteHit && arg[i - 1] === "\\") {
          reverse += "\\";
        } else if (arg[i - 1] === '"') {
          quoteHit = true;
          reverse += '"';
        } else {
          quoteHit = false;
        }
      }
      reverse += '"';
      return reverse.split("").reverse().join("");
    }
    _uvQuoteCmdArg(arg) {
      if (!arg) {
        return '""';
      }
      if (!arg.includes(" ") && !arg.includes("	") && !arg.includes('"')) {
        return arg;
      }
      if (!arg.includes('"') && !arg.includes("\\")) {
        return `"${arg}"`;
      }
      let reverse = '"';
      let quoteHit = true;
      for (let i = arg.length; i > 0; i--) {
        reverse += arg[i - 1];
        if (quoteHit && arg[i - 1] === "\\") {
          reverse += "\\";
        } else if (arg[i - 1] === '"') {
          quoteHit = true;
          reverse += "\\";
        } else {
          quoteHit = false;
        }
      }
      reverse += '"';
      return reverse.split("").reverse().join("");
    }
    _cloneExecOptions(options) {
      options = options || {};
      const result = {
        cwd: options.cwd || process.cwd(),
        env: options.env || process.env,
        silent: options.silent || false,
        windowsVerbatimArguments: options.windowsVerbatimArguments || false,
        failOnStdErr: options.failOnStdErr || false,
        ignoreReturnCode: options.ignoreReturnCode || false,
        delay: options.delay || 1e4
      };
      result.outStream = options.outStream || process.stdout;
      result.errStream = options.errStream || process.stderr;
      return result;
    }
    _getSpawnOptions(options, toolPath) {
      options = options || {};
      const result = {};
      result.cwd = options.cwd;
      result.env = options.env;
      result["windowsVerbatimArguments"] = options.windowsVerbatimArguments || this._isCmdFile();
      if (options.windowsVerbatimArguments) {
        result.argv0 = `"${toolPath}"`;
      }
      return result;
    }
    exec() {
      return __awaiter(this, void 0, void 0, function* () {
        if (!ioUtil.isRooted(this.toolPath) && (this.toolPath.includes("/") || IS_WINDOWS && this.toolPath.includes("\\"))) {
          this.toolPath = path.resolve(process.cwd(), this.options.cwd || process.cwd(), this.toolPath);
        }
        this.toolPath = yield io.which(this.toolPath, true);
        return new Promise((resolve2, reject) => {
          this._debug(`exec tool: ${this.toolPath}`);
          this._debug("arguments:");
          for (const arg of this.args) {
            this._debug(`   ${arg}`);
          }
          const optionsNonNull = this._cloneExecOptions(this.options);
          if (!optionsNonNull.silent && optionsNonNull.outStream) {
            optionsNonNull.outStream.write(this._getCommandString(optionsNonNull) + os.EOL);
          }
          const state = new ExecState(optionsNonNull, this.toolPath);
          state.on("debug", (message) => {
            this._debug(message);
          });
          const fileName = this._getSpawnFileName();
          const cp2 = child.spawn(fileName, this._getSpawnArgs(optionsNonNull), this._getSpawnOptions(this.options, fileName));
          const stdbuffer = "";
          if (cp2.stdout) {
            cp2.stdout.on("data", (data) => {
              if (this.options.listeners && this.options.listeners.stdout) {
                this.options.listeners.stdout(data);
              }
              if (!optionsNonNull.silent && optionsNonNull.outStream) {
                optionsNonNull.outStream.write(data);
              }
              this._processLineBuffer(data, stdbuffer, (line) => {
                if (this.options.listeners && this.options.listeners.stdline) {
                  this.options.listeners.stdline(line);
                }
              });
            });
          }
          const errbuffer = "";
          if (cp2.stderr) {
            cp2.stderr.on("data", (data) => {
              state.processStderr = true;
              if (this.options.listeners && this.options.listeners.stderr) {
                this.options.listeners.stderr(data);
              }
              if (!optionsNonNull.silent && optionsNonNull.errStream && optionsNonNull.outStream) {
                const s = optionsNonNull.failOnStdErr ? optionsNonNull.errStream : optionsNonNull.outStream;
                s.write(data);
              }
              this._processLineBuffer(data, errbuffer, (line) => {
                if (this.options.listeners && this.options.listeners.errline) {
                  this.options.listeners.errline(line);
                }
              });
            });
          }
          cp2.on("error", (err) => {
            state.processError = err.message;
            state.processExited = true;
            state.processClosed = true;
            state.CheckComplete();
          });
          cp2.on("exit", (code) => {
            state.processExitCode = code;
            state.processExited = true;
            this._debug(`Exit code ${code} received from tool '${this.toolPath}'`);
            state.CheckComplete();
          });
          cp2.on("close", (code) => {
            state.processExitCode = code;
            state.processExited = true;
            state.processClosed = true;
            this._debug(`STDIO streams have closed for tool '${this.toolPath}'`);
            state.CheckComplete();
          });
          state.on("done", (error, exitCode) => {
            if (stdbuffer.length > 0) {
              this.emit("stdline", stdbuffer);
            }
            if (errbuffer.length > 0) {
              this.emit("errline", errbuffer);
            }
            cp2.removeAllListeners();
            if (error) {
              reject(error);
            } else {
              resolve2(exitCode);
            }
          });
          if (this.options.input) {
            if (!cp2.stdin) {
              throw new Error("child process missing stdin");
            }
            cp2.stdin.end(this.options.input);
          }
        });
      });
    }
  };
  exports2.ToolRunner = ToolRunner;
  function argStringToArray(argString) {
    const args = [];
    let inQuotes = false;
    let escaped = false;
    let arg = "";
    function append(c) {
      if (escaped && c !== '"') {
        arg += "\\";
      }
      arg += c;
      escaped = false;
    }
    for (let i = 0; i < argString.length; i++) {
      const c = argString.charAt(i);
      if (c === '"') {
        if (!escaped) {
          inQuotes = !inQuotes;
        } else {
          append(c);
        }
        continue;
      }
      if (c === "\\" && escaped) {
        append(c);
        continue;
      }
      if (c === "\\" && inQuotes) {
        escaped = true;
        continue;
      }
      if (c === " " && !inQuotes) {
        if (arg.length > 0) {
          args.push(arg);
          arg = "";
        }
        continue;
      }
      append(c);
    }
    if (arg.length > 0) {
      args.push(arg.trim());
    }
    return args;
  }
  exports2.argStringToArray = argStringToArray;
  var ExecState = class extends events.EventEmitter {
    constructor(options, toolPath) {
      super();
      this.processClosed = false;
      this.processError = "";
      this.processExitCode = 0;
      this.processExited = false;
      this.processStderr = false;
      this.delay = 1e4;
      this.done = false;
      this.timeout = null;
      if (!toolPath) {
        throw new Error("toolPath must not be empty");
      }
      this.options = options;
      this.toolPath = toolPath;
      if (options.delay) {
        this.delay = options.delay;
      }
    }
    CheckComplete() {
      if (this.done) {
        return;
      }
      if (this.processClosed) {
        this._setResult();
      } else if (this.processExited) {
        this.timeout = setTimeout(ExecState.HandleTimeout, this.delay, this);
      }
    }
    _debug(message) {
      this.emit("debug", message);
    }
    _setResult() {
      let error;
      if (this.processExited) {
        if (this.processError) {
          error = new Error(`There was an error when attempting to execute the process '${this.toolPath}'. This may indicate the process failed to start. Error: ${this.processError}`);
        } else if (this.processExitCode !== 0 && !this.options.ignoreReturnCode) {
          error = new Error(`The process '${this.toolPath}' failed with exit code ${this.processExitCode}`);
        } else if (this.processStderr && this.options.failOnStdErr) {
          error = new Error(`The process '${this.toolPath}' failed because one or more lines were written to the STDERR stream`);
        }
      }
      if (this.timeout) {
        clearTimeout(this.timeout);
        this.timeout = null;
      }
      this.done = true;
      this.emit("done", error, this.processExitCode);
    }
    static HandleTimeout(state) {
      if (state.done) {
        return;
      }
      if (!state.processClosed && state.processExited) {
        const message = `The STDIO streams did not close within ${state.delay / 1e3} seconds of the exit event from process '${state.toolPath}'. This may indicate a child process inherited the STDIO streams and has not yet exited.`;
        state._debug(message);
      }
      state._setResult();
    }
  };
});

// node_modules/@actions/exec/lib/exec.js
var require_exec = __commonJS((exports2) => {
  "use strict";
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var tr = __importStar(require_toolrunner());
  function exec2(commandLine, args, options) {
    return __awaiter(this, void 0, void 0, function* () {
      const commandArgs = tr.argStringToArray(commandLine);
      if (commandArgs.length === 0) {
        throw new Error(`Parameter 'commandLine' cannot be null or empty.`);
      }
      const toolPath = commandArgs[0];
      args = commandArgs.slice(1).concat(args || []);
      const runner = new tr.ToolRunner(toolPath, args, options);
      return runner.exec();
    });
  }
  exports2.exec = exec2;
});

// node_modules/@actions/glob/lib/internal-glob-options-helper.js
var require_internal_glob_options_helper = __commonJS((exports2) => {
  "use strict";
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var core = __importStar(require_core());
  function getOptions(copy) {
    const result = {
      followSymbolicLinks: true,
      implicitDescendants: true,
      omitBrokenSymbolicLinks: true
    };
    if (copy) {
      if (typeof copy.followSymbolicLinks === "boolean") {
        result.followSymbolicLinks = copy.followSymbolicLinks;
        core.debug(`followSymbolicLinks '${result.followSymbolicLinks}'`);
      }
      if (typeof copy.implicitDescendants === "boolean") {
        result.implicitDescendants = copy.implicitDescendants;
        core.debug(`implicitDescendants '${result.implicitDescendants}'`);
      }
      if (typeof copy.omitBrokenSymbolicLinks === "boolean") {
        result.omitBrokenSymbolicLinks = copy.omitBrokenSymbolicLinks;
        core.debug(`omitBrokenSymbolicLinks '${result.omitBrokenSymbolicLinks}'`);
      }
    }
    return result;
  }
  exports2.getOptions = getOptions;
});

// node_modules/@actions/glob/lib/internal-path-helper.js
var require_internal_path_helper = __commonJS((exports2) => {
  "use strict";
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  var __importDefault = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var path = __importStar(require("path"));
  var assert_1 = __importDefault(require("assert"));
  var IS_WINDOWS = process.platform === "win32";
  function dirname(p) {
    p = safeTrimTrailingSeparator(p);
    if (IS_WINDOWS && /^\\\\[^\\]+(\\[^\\]+)?$/.test(p)) {
      return p;
    }
    let result = path.dirname(p);
    if (IS_WINDOWS && /^\\\\[^\\]+\\[^\\]+\\$/.test(result)) {
      result = safeTrimTrailingSeparator(result);
    }
    return result;
  }
  exports2.dirname = dirname;
  function ensureAbsoluteRoot(root, itemPath) {
    assert_1.default(root, `ensureAbsoluteRoot parameter 'root' must not be empty`);
    assert_1.default(itemPath, `ensureAbsoluteRoot parameter 'itemPath' must not be empty`);
    if (hasAbsoluteRoot(itemPath)) {
      return itemPath;
    }
    if (IS_WINDOWS) {
      if (itemPath.match(/^[A-Z]:[^\\/]|^[A-Z]:$/i)) {
        let cwd = process.cwd();
        assert_1.default(cwd.match(/^[A-Z]:\\/i), `Expected current directory to start with an absolute drive root. Actual '${cwd}'`);
        if (itemPath[0].toUpperCase() === cwd[0].toUpperCase()) {
          if (itemPath.length === 2) {
            return `${itemPath[0]}:\\${cwd.substr(3)}`;
          } else {
            if (!cwd.endsWith("\\")) {
              cwd += "\\";
            }
            return `${itemPath[0]}:\\${cwd.substr(3)}${itemPath.substr(2)}`;
          }
        } else {
          return `${itemPath[0]}:\\${itemPath.substr(2)}`;
        }
      } else if (normalizeSeparators(itemPath).match(/^\\$|^\\[^\\]/)) {
        const cwd = process.cwd();
        assert_1.default(cwd.match(/^[A-Z]:\\/i), `Expected current directory to start with an absolute drive root. Actual '${cwd}'`);
        return `${cwd[0]}:\\${itemPath.substr(1)}`;
      }
    }
    assert_1.default(hasAbsoluteRoot(root), `ensureAbsoluteRoot parameter 'root' must have an absolute root`);
    if (root.endsWith("/") || IS_WINDOWS && root.endsWith("\\")) {
    } else {
      root += path.sep;
    }
    return root + itemPath;
  }
  exports2.ensureAbsoluteRoot = ensureAbsoluteRoot;
  function hasAbsoluteRoot(itemPath) {
    assert_1.default(itemPath, `hasAbsoluteRoot parameter 'itemPath' must not be empty`);
    itemPath = normalizeSeparators(itemPath);
    if (IS_WINDOWS) {
      return itemPath.startsWith("\\\\") || /^[A-Z]:\\/i.test(itemPath);
    }
    return itemPath.startsWith("/");
  }
  exports2.hasAbsoluteRoot = hasAbsoluteRoot;
  function hasRoot(itemPath) {
    assert_1.default(itemPath, `isRooted parameter 'itemPath' must not be empty`);
    itemPath = normalizeSeparators(itemPath);
    if (IS_WINDOWS) {
      return itemPath.startsWith("\\") || /^[A-Z]:/i.test(itemPath);
    }
    return itemPath.startsWith("/");
  }
  exports2.hasRoot = hasRoot;
  function normalizeSeparators(p) {
    p = p || "";
    if (IS_WINDOWS) {
      p = p.replace(/\//g, "\\");
      const isUnc = /^\\\\+[^\\]/.test(p);
      return (isUnc ? "\\" : "") + p.replace(/\\\\+/g, "\\");
    }
    return p.replace(/\/\/+/g, "/");
  }
  exports2.normalizeSeparators = normalizeSeparators;
  function safeTrimTrailingSeparator(p) {
    if (!p) {
      return "";
    }
    p = normalizeSeparators(p);
    if (!p.endsWith(path.sep)) {
      return p;
    }
    if (p === path.sep) {
      return p;
    }
    if (IS_WINDOWS && /^[A-Z]:\\$/i.test(p)) {
      return p;
    }
    return p.substr(0, p.length - 1);
  }
  exports2.safeTrimTrailingSeparator = safeTrimTrailingSeparator;
});

// node_modules/@actions/glob/lib/internal-match-kind.js
var require_internal_match_kind = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var MatchKind;
  (function(MatchKind2) {
    MatchKind2[MatchKind2["None"] = 0] = "None";
    MatchKind2[MatchKind2["Directory"] = 1] = "Directory";
    MatchKind2[MatchKind2["File"] = 2] = "File";
    MatchKind2[MatchKind2["All"] = 3] = "All";
  })(MatchKind = exports2.MatchKind || (exports2.MatchKind = {}));
});

// node_modules/@actions/glob/lib/internal-pattern-helper.js
var require_internal_pattern_helper = __commonJS((exports2) => {
  "use strict";
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var pathHelper = __importStar(require_internal_path_helper());
  var internal_match_kind_1 = require_internal_match_kind();
  var IS_WINDOWS = process.platform === "win32";
  function getSearchPaths(patterns) {
    patterns = patterns.filter((x) => !x.negate);
    const searchPathMap = {};
    for (const pattern of patterns) {
      const key = IS_WINDOWS ? pattern.searchPath.toUpperCase() : pattern.searchPath;
      searchPathMap[key] = "candidate";
    }
    const result = [];
    for (const pattern of patterns) {
      const key = IS_WINDOWS ? pattern.searchPath.toUpperCase() : pattern.searchPath;
      if (searchPathMap[key] === "included") {
        continue;
      }
      let foundAncestor = false;
      let tempKey = key;
      let parent = pathHelper.dirname(tempKey);
      while (parent !== tempKey) {
        if (searchPathMap[parent]) {
          foundAncestor = true;
          break;
        }
        tempKey = parent;
        parent = pathHelper.dirname(tempKey);
      }
      if (!foundAncestor) {
        result.push(pattern.searchPath);
        searchPathMap[key] = "included";
      }
    }
    return result;
  }
  exports2.getSearchPaths = getSearchPaths;
  function match(patterns, itemPath) {
    let result = internal_match_kind_1.MatchKind.None;
    for (const pattern of patterns) {
      if (pattern.negate) {
        result &= ~pattern.match(itemPath);
      } else {
        result |= pattern.match(itemPath);
      }
    }
    return result;
  }
  exports2.match = match;
  function partialMatch(patterns, itemPath) {
    return patterns.some((x) => !x.negate && x.partialMatch(itemPath));
  }
  exports2.partialMatch = partialMatch;
});

// node_modules/@actions/glob/lib/internal-path.js
var require_internal_path = __commonJS((exports2) => {
  "use strict";
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  var __importDefault = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var path = __importStar(require("path"));
  var pathHelper = __importStar(require_internal_path_helper());
  var assert_1 = __importDefault(require("assert"));
  var IS_WINDOWS = process.platform === "win32";
  var Path = class {
    constructor(itemPath) {
      this.segments = [];
      if (typeof itemPath === "string") {
        assert_1.default(itemPath, `Parameter 'itemPath' must not be empty`);
        itemPath = pathHelper.safeTrimTrailingSeparator(itemPath);
        if (!pathHelper.hasRoot(itemPath)) {
          this.segments = itemPath.split(path.sep);
        } else {
          let remaining = itemPath;
          let dir = pathHelper.dirname(remaining);
          while (dir !== remaining) {
            const basename = path.basename(remaining);
            this.segments.unshift(basename);
            remaining = dir;
            dir = pathHelper.dirname(remaining);
          }
          this.segments.unshift(remaining);
        }
      } else {
        assert_1.default(itemPath.length > 0, `Parameter 'itemPath' must not be an empty array`);
        for (let i = 0; i < itemPath.length; i++) {
          let segment = itemPath[i];
          assert_1.default(segment, `Parameter 'itemPath' must not contain any empty segments`);
          segment = pathHelper.normalizeSeparators(itemPath[i]);
          if (i === 0 && pathHelper.hasRoot(segment)) {
            segment = pathHelper.safeTrimTrailingSeparator(segment);
            assert_1.default(segment === pathHelper.dirname(segment), `Parameter 'itemPath' root segment contains information for multiple segments`);
            this.segments.push(segment);
          } else {
            assert_1.default(!segment.includes(path.sep), `Parameter 'itemPath' contains unexpected path separators`);
            this.segments.push(segment);
          }
        }
      }
    }
    toString() {
      let result = this.segments[0];
      let skipSlash = result.endsWith(path.sep) || IS_WINDOWS && /^[A-Z]:$/i.test(result);
      for (let i = 1; i < this.segments.length; i++) {
        if (skipSlash) {
          skipSlash = false;
        } else {
          result += path.sep;
        }
        result += this.segments[i];
      }
      return result;
    }
  };
  exports2.Path = Path;
});

// node_modules/@actions/glob/lib/internal-pattern.js
var require_internal_pattern = __commonJS((exports2) => {
  "use strict";
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  var __importDefault = exports2 && exports2.__importDefault || function(mod) {
    return mod && mod.__esModule ? mod : {default: mod};
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var os = __importStar(require("os"));
  var path = __importStar(require("path"));
  var pathHelper = __importStar(require_internal_path_helper());
  var assert_1 = __importDefault(require("assert"));
  var minimatch_1 = require_minimatch();
  var internal_match_kind_1 = require_internal_match_kind();
  var internal_path_1 = require_internal_path();
  var IS_WINDOWS = process.platform === "win32";
  var Pattern = class {
    constructor(patternOrNegate, segments, homedir) {
      this.negate = false;
      let pattern;
      if (typeof patternOrNegate === "string") {
        pattern = patternOrNegate.trim();
      } else {
        segments = segments || [];
        assert_1.default(segments.length, `Parameter 'segments' must not empty`);
        const root = Pattern.getLiteral(segments[0]);
        assert_1.default(root && pathHelper.hasAbsoluteRoot(root), `Parameter 'segments' first element must be a root path`);
        pattern = new internal_path_1.Path(segments).toString().trim();
        if (patternOrNegate) {
          pattern = `!${pattern}`;
        }
      }
      while (pattern.startsWith("!")) {
        this.negate = !this.negate;
        pattern = pattern.substr(1).trim();
      }
      pattern = Pattern.fixupPattern(pattern, homedir);
      this.segments = new internal_path_1.Path(pattern).segments;
      this.trailingSeparator = pathHelper.normalizeSeparators(pattern).endsWith(path.sep);
      pattern = pathHelper.safeTrimTrailingSeparator(pattern);
      let foundGlob = false;
      const searchSegments = this.segments.map((x) => Pattern.getLiteral(x)).filter((x) => !foundGlob && !(foundGlob = x === ""));
      this.searchPath = new internal_path_1.Path(searchSegments).toString();
      this.rootRegExp = new RegExp(Pattern.regExpEscape(searchSegments[0]), IS_WINDOWS ? "i" : "");
      const minimatchOptions = {
        dot: true,
        nobrace: true,
        nocase: IS_WINDOWS,
        nocomment: true,
        noext: true,
        nonegate: true
      };
      pattern = IS_WINDOWS ? pattern.replace(/\\/g, "/") : pattern;
      this.minimatch = new minimatch_1.Minimatch(pattern, minimatchOptions);
    }
    match(itemPath) {
      if (this.segments[this.segments.length - 1] === "**") {
        itemPath = pathHelper.normalizeSeparators(itemPath);
        if (!itemPath.endsWith(path.sep)) {
          itemPath = `${itemPath}${path.sep}`;
        }
      } else {
        itemPath = pathHelper.safeTrimTrailingSeparator(itemPath);
      }
      if (this.minimatch.match(itemPath)) {
        return this.trailingSeparator ? internal_match_kind_1.MatchKind.Directory : internal_match_kind_1.MatchKind.All;
      }
      return internal_match_kind_1.MatchKind.None;
    }
    partialMatch(itemPath) {
      itemPath = pathHelper.safeTrimTrailingSeparator(itemPath);
      if (pathHelper.dirname(itemPath) === itemPath) {
        return this.rootRegExp.test(itemPath);
      }
      return this.minimatch.matchOne(itemPath.split(IS_WINDOWS ? /\\+/ : /\/+/), this.minimatch.set[0], true);
    }
    static globEscape(s) {
      return (IS_WINDOWS ? s : s.replace(/\\/g, "\\\\")).replace(/(\[)(?=[^/]+\])/g, "[[]").replace(/\?/g, "[?]").replace(/\*/g, "[*]");
    }
    static fixupPattern(pattern, homedir) {
      assert_1.default(pattern, "pattern cannot be empty");
      const literalSegments = new internal_path_1.Path(pattern).segments.map((x) => Pattern.getLiteral(x));
      assert_1.default(literalSegments.every((x, i) => (x !== "." || i === 0) && x !== ".."), `Invalid pattern '${pattern}'. Relative pathing '.' and '..' is not allowed.`);
      assert_1.default(!pathHelper.hasRoot(pattern) || literalSegments[0], `Invalid pattern '${pattern}'. Root segment must not contain globs.`);
      pattern = pathHelper.normalizeSeparators(pattern);
      if (pattern === "." || pattern.startsWith(`.${path.sep}`)) {
        pattern = Pattern.globEscape(process.cwd()) + pattern.substr(1);
      } else if (pattern === "~" || pattern.startsWith(`~${path.sep}`)) {
        homedir = homedir || os.homedir();
        assert_1.default(homedir, "Unable to determine HOME directory");
        assert_1.default(pathHelper.hasAbsoluteRoot(homedir), `Expected HOME directory to be a rooted path. Actual '${homedir}'`);
        pattern = Pattern.globEscape(homedir) + pattern.substr(1);
      } else if (IS_WINDOWS && (pattern.match(/^[A-Z]:$/i) || pattern.match(/^[A-Z]:[^\\]/i))) {
        let root = pathHelper.ensureAbsoluteRoot("C:\\dummy-root", pattern.substr(0, 2));
        if (pattern.length > 2 && !root.endsWith("\\")) {
          root += "\\";
        }
        pattern = Pattern.globEscape(root) + pattern.substr(2);
      } else if (IS_WINDOWS && (pattern === "\\" || pattern.match(/^\\[^\\]/))) {
        let root = pathHelper.ensureAbsoluteRoot("C:\\dummy-root", "\\");
        if (!root.endsWith("\\")) {
          root += "\\";
        }
        pattern = Pattern.globEscape(root) + pattern.substr(1);
      } else {
        pattern = pathHelper.ensureAbsoluteRoot(Pattern.globEscape(process.cwd()), pattern);
      }
      return pathHelper.normalizeSeparators(pattern);
    }
    static getLiteral(segment) {
      let literal = "";
      for (let i = 0; i < segment.length; i++) {
        const c = segment[i];
        if (c === "\\" && !IS_WINDOWS && i + 1 < segment.length) {
          literal += segment[++i];
          continue;
        } else if (c === "*" || c === "?") {
          return "";
        } else if (c === "[" && i + 1 < segment.length) {
          let set = "";
          let closed = -1;
          for (let i2 = i + 1; i2 < segment.length; i2++) {
            const c2 = segment[i2];
            if (c2 === "\\" && !IS_WINDOWS && i2 + 1 < segment.length) {
              set += segment[++i2];
              continue;
            } else if (c2 === "]") {
              closed = i2;
              break;
            } else {
              set += c2;
            }
          }
          if (closed >= 0) {
            if (set.length > 1) {
              return "";
            }
            if (set) {
              literal += set;
              i = closed;
              continue;
            }
          }
        }
        literal += c;
      }
      return literal;
    }
    static regExpEscape(s) {
      return s.replace(/[[\\^$.|?*+()]/g, "\\$&");
    }
  };
  exports2.Pattern = Pattern;
});

// node_modules/@actions/glob/lib/internal-search-state.js
var require_internal_search_state = __commonJS((exports2) => {
  "use strict";
  Object.defineProperty(exports2, "__esModule", {value: true});
  var SearchState = class {
    constructor(path, level) {
      this.path = path;
      this.level = level;
    }
  };
  exports2.SearchState = SearchState;
});

// node_modules/@actions/glob/lib/internal-globber.js
var require_internal_globber = __commonJS((exports2) => {
  "use strict";
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __asyncValues = exports2 && exports2.__asyncValues || function(o) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
      return this;
    }, i);
    function verb(n) {
      i[n] = o[n] && function(v) {
        return new Promise(function(resolve2, reject) {
          v = o[n](v), settle(resolve2, reject, v.done, v.value);
        });
      };
    }
    function settle(resolve2, reject, d, v) {
      Promise.resolve(v).then(function(v2) {
        resolve2({value: v2, done: d});
      }, reject);
    }
  };
  var __await = exports2 && exports2.__await || function(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
  };
  var __asyncGenerator = exports2 && exports2.__asyncGenerator || function(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator)
      throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
      return this;
    }, i;
    function verb(n) {
      if (g[n])
        i[n] = function(v) {
          return new Promise(function(a, b) {
            q.push([n, v, a, b]) > 1 || resume(n, v);
          });
        };
    }
    function resume(n, v) {
      try {
        step(g[n](v));
      } catch (e) {
        settle(q[0][3], e);
      }
    }
    function step(r) {
      r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
    }
    function fulfill(value) {
      resume("next", value);
    }
    function reject(value) {
      resume("throw", value);
    }
    function settle(f, v) {
      if (f(v), q.shift(), q.length)
        resume(q[0][0], q[0][1]);
    }
  };
  var __importStar = exports2 && exports2.__importStar || function(mod) {
    if (mod && mod.__esModule)
      return mod;
    var result = {};
    if (mod != null) {
      for (var k in mod)
        if (Object.hasOwnProperty.call(mod, k))
          result[k] = mod[k];
    }
    result["default"] = mod;
    return result;
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var core = __importStar(require_core());
  var fs = __importStar(require("fs"));
  var globOptionsHelper = __importStar(require_internal_glob_options_helper());
  var path = __importStar(require("path"));
  var patternHelper = __importStar(require_internal_pattern_helper());
  var internal_match_kind_1 = require_internal_match_kind();
  var internal_pattern_1 = require_internal_pattern();
  var internal_search_state_1 = require_internal_search_state();
  var IS_WINDOWS = process.platform === "win32";
  var DefaultGlobber = class {
    constructor(options) {
      this.patterns = [];
      this.searchPaths = [];
      this.options = globOptionsHelper.getOptions(options);
    }
    getSearchPaths() {
      return this.searchPaths.slice();
    }
    glob() {
      var e_1, _a;
      return __awaiter(this, void 0, void 0, function* () {
        const result = [];
        try {
          for (var _b = __asyncValues(this.globGenerator()), _c; _c = yield _b.next(), !_c.done; ) {
            const itemPath = _c.value;
            result.push(itemPath);
          }
        } catch (e_1_1) {
          e_1 = {error: e_1_1};
        } finally {
          try {
            if (_c && !_c.done && (_a = _b.return))
              yield _a.call(_b);
          } finally {
            if (e_1)
              throw e_1.error;
          }
        }
        return result;
      });
    }
    globGenerator() {
      return __asyncGenerator(this, arguments, function* globGenerator_1() {
        const options = globOptionsHelper.getOptions(this.options);
        const patterns = [];
        for (const pattern of this.patterns) {
          patterns.push(pattern);
          if (options.implicitDescendants && (pattern.trailingSeparator || pattern.segments[pattern.segments.length - 1] !== "**")) {
            patterns.push(new internal_pattern_1.Pattern(pattern.negate, pattern.segments.concat("**")));
          }
        }
        const stack = [];
        for (const searchPath of patternHelper.getSearchPaths(patterns)) {
          core.debug(`Search path '${searchPath}'`);
          try {
            yield __await(fs.promises.lstat(searchPath));
          } catch (err) {
            if (err.code === "ENOENT") {
              continue;
            }
            throw err;
          }
          stack.unshift(new internal_search_state_1.SearchState(searchPath, 1));
        }
        const traversalChain = [];
        while (stack.length) {
          const item = stack.pop();
          const match = patternHelper.match(patterns, item.path);
          const partialMatch = !!match || patternHelper.partialMatch(patterns, item.path);
          if (!match && !partialMatch) {
            continue;
          }
          const stats = yield __await(DefaultGlobber.stat(item, options, traversalChain));
          if (!stats) {
            continue;
          }
          if (stats.isDirectory()) {
            if (match & internal_match_kind_1.MatchKind.Directory) {
              yield yield __await(item.path);
            } else if (!partialMatch) {
              continue;
            }
            const childLevel = item.level + 1;
            const childItems = (yield __await(fs.promises.readdir(item.path))).map((x) => new internal_search_state_1.SearchState(path.join(item.path, x), childLevel));
            stack.push(...childItems.reverse());
          } else if (match & internal_match_kind_1.MatchKind.File) {
            yield yield __await(item.path);
          }
        }
      });
    }
    static create(patterns, options) {
      return __awaiter(this, void 0, void 0, function* () {
        const result = new DefaultGlobber(options);
        if (IS_WINDOWS) {
          patterns = patterns.replace(/\r\n/g, "\n");
          patterns = patterns.replace(/\r/g, "\n");
        }
        const lines = patterns.split("\n").map((x) => x.trim());
        for (const line of lines) {
          if (!line || line.startsWith("#")) {
            continue;
          } else {
            result.patterns.push(new internal_pattern_1.Pattern(line));
          }
        }
        result.searchPaths.push(...patternHelper.getSearchPaths(result.patterns));
        return result;
      });
    }
    static stat(item, options, traversalChain) {
      return __awaiter(this, void 0, void 0, function* () {
        let stats;
        if (options.followSymbolicLinks) {
          try {
            stats = yield fs.promises.stat(item.path);
          } catch (err) {
            if (err.code === "ENOENT") {
              if (options.omitBrokenSymbolicLinks) {
                core.debug(`Broken symlink '${item.path}'`);
                return void 0;
              }
              throw new Error(`No information found for the path '${item.path}'. This may indicate a broken symbolic link.`);
            }
            throw err;
          }
        } else {
          stats = yield fs.promises.lstat(item.path);
        }
        if (stats.isDirectory() && options.followSymbolicLinks) {
          const realPath = yield fs.promises.realpath(item.path);
          while (traversalChain.length >= item.level) {
            traversalChain.pop();
          }
          if (traversalChain.some((x) => x === realPath)) {
            core.debug(`Symlink cycle detected for path '${item.path}' and realpath '${realPath}'`);
            return void 0;
          }
          traversalChain.push(realPath);
        }
        return stats;
      });
    }
  };
  exports2.DefaultGlobber = DefaultGlobber;
});

// node_modules/@actions/glob/lib/glob.js
var require_glob2 = __commonJS((exports2) => {
  "use strict";
  var __awaiter = exports2 && exports2.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve2) {
        resolve2(value);
      });
    }
    return new (P || (P = Promise))(function(resolve2, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve2(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  Object.defineProperty(exports2, "__esModule", {value: true});
  var internal_globber_1 = require_internal_globber();
  function create(patterns, options) {
    return __awaiter(this, void 0, void 0, function* () {
      return yield internal_globber_1.DefaultGlobber.create(patterns, options);
    });
  }
  exports2.create = create;
});

// src/index.ts
var import_fs = __toModule(require("fs"));
var import_path = __toModule(require("path"));
var import_artifact = __toModule(require_artifact_client2());
var import_core2 = __toModule(require_core());
var import_exec = __toModule(require_exec());
var import_glob = __toModule(require_glob2());
var import_io = __toModule(require_io());

// src/abort.ts
var Abort = class {
  constructor() {
    this.signalValue = 0;
  }
  get signal() {
    return this.signalValue;
  }
  abort() {
    this.signalValue = 1;
  }
};

// src/job.ts
var import_core = __toModule(require_core());
var job = async (name, options, task) => {
  const {signal, signalAbort, failOnError = true, failMessage, skippable = true} = options;
  return await (0, import_core.group)(name, async () => {
    if (skippable && signal) {
      return void (0, import_core.info)("SKIPPED!");
    }
    const result = task();
    result.catch((err) => {
      signalAbort();
      failOnError && (0, import_core.setFailed)(failMessage || err);
    });
    return await result;
  });
};

// src/index.ts
async function run() {
  const abortController = new Abort();
  try {
    const version = (0, import_core2.getInput)("version");
    const builderVersion = `v${version}`;
    const cwd = process.cwd();
    const sourceDir = (0, import_path.resolve)(cwd, (0, import_core2.getInput)("sourceDir"));
    const builderDir = (0, import_path.resolve)(__dirname, `../builders/ng-${builderVersion}`);
    const builderProjectsDir = (0, import_path.resolve)(builderDir, "projects");
    const artifactsDir = (0, import_path.resolve)(builderDir, "dist/ng-in-viewport");
    if (!(0, import_fs.existsSync)(sourceDir) || !(0, import_fs.lstatSync)(sourceDir).isDirectory()) {
      abortController.abort();
      (0, import_core2.setFailed)("Invalid `sourceDir` path");
    }
    await job("Clone library", {signal: abortController.signal, signalAbort: () => abortController.abort()}, async () => {
      await (0, import_io.cp)(sourceDir, builderProjectsDir, {
        recursive: true,
        force: true
      });
      (0, import_core2.info)("The library has been successfully cloned");
    });
    await job("Install dependencies", {signal: abortController.signal, signalAbort: () => abortController.abort()}, async () => {
      return await (0, import_exec.exec)("bash", ["-c", "npm ci"], {
        cwd: builderDir,
        failOnStdErr: true
      });
    });
    const buildExitCode = await job("Build library", {signal: abortController.signal, signalAbort: () => abortController.abort()}, async () => {
      return await (0, import_exec.exec)("npm run build:lib", [], {
        cwd: builderDir,
        failOnStdErr: false,
        ignoreReturnCode: false
      });
    });
    if (buildExitCode !== 0) {
      abortController.abort();
      (0, import_core2.setFailed)("Build failed");
    }
    await job("Upload build artifacts", {signal: abortController.signal, signalAbort: () => abortController.abort()}, async () => {
      const patterns = [`${artifactsDir}/**`];
      const globber = await (0, import_glob.create)(patterns.join("\n"));
      const files = await globber.glob();
      return void await (0, import_artifact.create)().uploadArtifact(`ng-in-viewport-${builderVersion}`, files, artifactsDir, {
        continueOnError: false
      });
    });
  } catch (error) {
    (0, import_core2.setFailed)(error.message);
  } finally {
    abortController.abort();
  }
}
run();
