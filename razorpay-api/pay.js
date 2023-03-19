var Razorpay = (function () {
  var e = function (e, n) {
      var t = { tags: n };
      switch (!0) {
        case !e:
          t.message = "NA";
          break;
        case "string" == typeof e:
          t.message = e;
          break;
        case "object" == typeof e:
          var r = e.name,
            i = e.message,
            o = e.stack,
            a = e.fileName,
            u = e.lineNumber,
            c = e.columnNumber;
          t = window.Object.assign(JSON.parse(JSON.stringify(e)), {
            name: r,
            message: i,
            stack: o,
            fileName: a,
            lineNumber: u,
            columnNumber: c,
            tags: n,
          });
          break;
        default:
          t.message = JSON.stringify(e);
      }
      return t;
    },
    n = "S0",
    t = "S1",
    r = !1;
  function i(e, n) {
    return [
      {
        name: "checkout.sessionErrored.metrics",
        labels: [{ type: e, severity: n }],
      },
    ];
  }
  var o = function (o, a) {
      var u,
        l,
        m,
        f,
        d = a.analytics,
        p = a.severity,
        h = void 0 === p ? t : p,
        v = a.unhandled,
        y = void 0 !== v && v;
      try {
        var g = d || {},
          _ = g.event,
          b = g.data,
          w = g.immediately,
          k = void 0 === w || w,
          S = "string" == typeof _ ? _ : "js_error";
        try {
          if ((h === n || h === t) && !r) {
            var E = { metrics: i("session_errored", h) };
            s({
              url: "https://lumberjack-metrics.razorpay.com/v1/frontend-metrics",
              data: {
                key: "ZmY5N2M0YzVkN2JiYzkyMWM1ZmVmYWJk",
                data: window.encodeURIComponent(
                  window.btoa(
                    window.unescape(
                      window.encodeURIComponent(JSON.stringify(E))
                    )
                  )
                ),
              },
            });
            var A = JSON.stringify({
              data: { data: { sessionErrored: !0 } },
              topic: "syncAvailability",
              source: "__razorpay",
              time: window.Date.now(),
            });
            window.postMessage(A, "*"), (r = !0);
          }
        } catch (e) {}
        (u = S),
          (l = {
            data: window.Object.assign({}, "object" == typeof b ? b : {}, {
              error: e(o, { severity: h, unhandled: y }),
            }),
            immediately: window.Boolean(k),
            isError: !0,
          }),
          (m = (void 0 === l ? {} : l).data),
          (f = {
            event: u,
            properties: {
              data: void 0 === m ? {} : m,
              build_number: 3073097293,
            },
            timestamp: window.Date.now(),
          }),
          c.push(f);
      } catch (e) {}
    },
    a = [
      "https://checkout.razorpay.com",
      "https://checkout-static.razorpay.com",
    ];
  function u(e) {
    var n,
      t = e.error;
    if (
      t &&
      (e.filename || t.stack) &&
      ((n = e.filename || e.error.stack),
      a.some(function (e) {
        return -1 !== n.indexOf(e);
      }))
    ) {
      var r = {
        message: t.message,
        lineNumber: e.lineno,
        fileName: e.filename,
        columnNumber: e.colno,
        stack: t.stack,
      };
      o(t, { unhandled: !0, analytics: { event: "js_error", data: r } });
    }
  }
  var c = [];
  function s(e) {
    try {
      var n = "sendBeacon" in window.navigator,
        t = !1;
      n && (t = window.navigator.sendBeacon(e.url, JSON.stringify(e.data))),
        t || fetch(e.url, { method: "POST", body: JSON.stringify(e.data) });
    } catch (e) {}
  }
  window.setInterval(function () {
    !(function () {
      if (c.length) {
        var e = {
          context: {
            platform: window.CheckoutBridge ? "mobile_sdk" : "browser",
          },
          addons: [
            {
              name: "ua_parser",
              input_key: "user_agent",
              output_key: "user_agent_parsed",
            },
          ],
          events: c.splice(0, 5),
        };
        s({
          url: "https://lumberjack.razorpay.com/v1/track",
          data: {
            key: "ZmY5N2M0YzVkN2JiYzkyMWM1ZmVmYWJk",
            data: window.encodeURIComponent(
              window.btoa(
                window.unescape(window.encodeURIComponent(JSON.stringify(e)))
              )
            ),
          },
        });
      }
    })();
  }, 1e3);
  try {
    -1 === "production".indexOf("TRAFFIC_ENV") &&
      (window.addEventListener("message", function (e) {
        var n = {};
        try {
          n = JSON.parse(e.data);
        } catch (e) {}
        try {
          var t = (n || {}).topic;
          t &&
            "clearMountErrorListener" === t &&
            window.removeEventListener("error", u, { capture: !0 });
        } catch (e) {}
      }),
      window.addEventListener("error", u, { capture: !0 }));
  } catch (e) {}
  var l = window,
    m = l.document,
    f = l.Boolean,
    d = l.Array,
    p = l.Object,
    h = l.String,
    v = l.Number,
    y = l.Date,
    g = l.Math,
    _ = l.setTimeout,
    b = l.setInterval,
    w = l.clearTimeout,
    k = l.parseInt,
    S = l.encodeURIComponent,
    E = l.decodeURIComponent,
    A = l.btoa,
    C = l.unescape,
    D = l.TypeError,
    R = l.navigator,
    x = l.location,
    P = l.XMLHttpRequest,
    N = l.NodeList,
    M = l.FormData;
  function I(e) {
    var n = this.constructor;
    return this.then(
      function (t) {
        return n.resolve(e()).then(function () {
          return t;
        });
      },
      function (t) {
        return n.resolve(e()).then(function () {
          return n.reject(t);
        });
      }
    );
  }
  function T(e) {
    return new this(function (n, t) {
      if (!e || void 0 === e.length)
        return t(
          new D(
            typeof e +
              " " +
              e +
              " is not iterable(cannot read property Symbol(Symbol.iterator))"
          )
        );
      var r = d.prototype.slice.call(e);
      if (0 === r.length) return n([]);
      var i = r.length;
      function o(e, t) {
        if (t && ("object" == typeof t || "function" == typeof t)) {
          var a = t.then;
          if ("function" == typeof a)
            return void a.call(
              t,
              function (n) {
                o(e, n);
              },
              function (t) {
                (r[e] = { status: "rejected", reason: t }), 0 == --i && n(r);
              }
            );
        }
        (r[e] = { status: "fulfilled", value: t }), 0 == --i && n(r);
      }
      for (var a = 0; a < r.length; a++) o(a, r[a]);
    });
  }
  var L = _;
  function O(e) {
    return f(e && void 0 !== e.length);
  }
  function B() {}
  function F(e) {
    if (!(this instanceof F))
      throw new D("Promises must be constructed via new");
    if ("function" != typeof e) throw new D("not a function");
    (this._state = 0),
      (this._handled = !1),
      (this._value = void 0),
      (this._deferreds = []),
      G(e, this);
  }
  function z(e, n) {
    for (; 3 === e._state; ) e = e._value;
    0 !== e._state
      ? ((e._handled = !0),
        F._immediateFn(function () {
          var t = 1 === e._state ? n.onFulfilled : n.onRejected;
          if (null !== t) {
            var r;
            try {
              r = t(e._value);
            } catch (e) {
              return void $(n.promise, e);
            }
            K(n.promise, r);
          } else (1 === e._state ? K : $)(n.promise, e._value);
        }))
      : e._deferreds.push(n);
  }
  function K(e, n) {
    try {
      if (n === e) throw new D("A promise cannot be resolved with itself.");
      if (n && ("object" == typeof n || "function" == typeof n)) {
        var t = n.then;
        if (n instanceof F) return (e._state = 3), (e._value = n), void j(e);
        if ("function" == typeof t)
          return void G(
            ((r = t),
            (i = n),
            function () {
              r.apply(i, arguments);
            }),
            e
          );
      }
      (e._state = 1), (e._value = n), j(e);
    } catch (n) {
      $(e, n);
    }
    var r, i;
  }
  function $(e, n) {
    (e._state = 2), (e._value = n), j(e);
  }
  function j(e) {
    2 === e._state &&
      0 === e._deferreds.length &&
      F._immediateFn(function () {
        e._handled || F._unhandledRejectionFn(e._value);
      });
    for (var n = 0, t = e._deferreds.length; n < t; n++) z(e, e._deferreds[n]);
    e._deferreds = null;
  }
  function H(e, n, t) {
    (this.onFulfilled = "function" == typeof e ? e : null),
      (this.onRejected = "function" == typeof n ? n : null),
      (this.promise = t);
  }
  function G(e, n) {
    var t = !1;
    try {
      e(
        function (e) {
          t || ((t = !0), K(n, e));
        },
        function (e) {
          t || ((t = !0), $(n, e));
        }
      );
    } catch (e) {
      if (t) return;
      (t = !0), $(n, e);
    }
  }
  (F.prototype.catch = function (e) {
    return this.then(null, e);
  }),
    (F.prototype.then = function (e, n) {
      var t = new this.constructor(B);
      return z(this, new H(e, n, t)), t;
    }),
    (F.prototype.finally = I),
    (F.all = function (e) {
      return new F(function (n, t) {
        if (!O(e)) return t(new D("Promise.all accepts an array"));
        var r = d.prototype.slice.call(e);
        if (0 === r.length) return n([]);
        var i = r.length;
        function o(e, a) {
          try {
            if (a && ("object" == typeof a || "function" == typeof a)) {
              var u = a.then;
              if ("function" == typeof u)
                return void u.call(
                  a,
                  function (n) {
                    o(e, n);
                  },
                  t
                );
            }
            (r[e] = a), 0 == --i && n(r);
          } catch (e) {
            t(e);
          }
        }
        for (var a = 0; a < r.length; a++) o(a, r[a]);
      });
    }),
    (F.allSettled = T),
    (F.resolve = function (e) {
      return e && "object" == typeof e && e.constructor === F
        ? e
        : new F(function (n) {
            n(e);
          });
    }),
    (F.reject = function (e) {
      return new F(function (n, t) {
        t(e);
      });
    }),
    (F.race = function (e) {
      return new F(function (n, t) {
        if (!O(e)) return t(new D("Promise.race accepts an array"));
        for (var r = 0, i = e.length; r < i; r++) F.resolve(e[r]).then(n, t);
      });
    }),
    (F._immediateFn =
      ("function" == typeof setImmediate &&
        function (e) {
          setImmediate(e);
        }) ||
      function (e) {
        L(e, 0);
      }),
    (F._unhandledRejectionFn = function (e) {
      "undefined" != typeof console && console;
    });
  var U = (function () {
    if ("undefined" != typeof self) return self;
    if ("undefined" != typeof window) return window;
    if (void 0 !== l) return l;
    throw new Error("unable to locate global object");
  })();
  "function" != typeof U.Promise
    ? (U.Promise = F)
    : (U.Promise.prototype.finally || (U.Promise.prototype.finally = I),
      U.Promise.allSettled || (U.Promise.allSettled = T)),
    p.entries ||
      (p.entries = function (e) {
        for (var n = p.keys(e), t = n.length, r = new d(t); t--; )
          r[t] = [n[t], e[n[t]]];
        return r;
      }),
    p.values ||
      (p.values = function (e) {
        for (var n = p.keys(e), t = n.length, r = new d(t); t--; )
          r[t] = e[n[t]];
        return r;
      }),
    "function" != typeof p.assign &&
      p.defineProperty(p, "assign", {
        value: function (e) {
          if (null == e)
            throw new D("Cannot convert undefined or null to object");
          for (var n = p(e), t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            if (null != r)
              for (var i in r)
                p.prototype.hasOwnProperty.call(r, i) && (n[i] = r[i]);
          }
          return n;
        },
        writable: !0,
        configurable: !0,
      }),
    window.NodeList &&
      !N.prototype.forEach &&
      (N.prototype.forEach = d.prototype.forEach),
    d.prototype.find ||
      (d.prototype.find = function (e) {
        if ("function" != typeof e) throw new D("callback must be a function");
        for (var n = arguments[1] || this, t = 0; t < this.length; t++)
          if (e.call(n, this[t], t, this)) return this[t];
      }),
    d.prototype.includes ||
      (d.prototype.includes = function () {
        return -1 !== d.prototype.indexOf.apply(this, arguments);
      }),
    d.prototype.flatMap ||
      (d.prototype.flatMap = function (e, n) {
        for (
          var t = n || this, r = [], i = p(t), o = i.length >>> 0, a = 0;
          a < o;
          ++a
        )
          if (a in i) {
            var u = e.call(t, i[a], a, i);
            r = r.concat(u);
          }
        return r;
      }),
    d.prototype.findIndex ||
      (d.prototype.findIndex = function (e) {
        if ("function" != typeof e) throw new D("callback must be a function");
        for (var n = arguments[1] || this, t = 0; t < this.length; t++)
          if (e.call(n, this[t], t, this)) return t;
        return -1;
      }),
    h.prototype.endsWith ||
      (h.prototype.endsWith = function (e, n) {
        return (
          n < this.length ? (n |= 0) : (n = this.length),
          this.substr(n - e.length, e.length) === e
        );
      });
  var Y,
    Z,
    V,
    W,
    J,
    q =
      "undefined" != typeof globalThis
        ? globalThis
        : "undefined" != typeof window
        ? window
        : "undefined" != typeof global
        ? global
        : "undefined" != typeof self
        ? self
        : {};
  function X() {
    return (
      (X =
        p.assign ||
        function (e) {
          for (var n = 1; n < arguments.length; n++) {
            var t = arguments[n];
            for (var r in t)
              p.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
          }
          return e;
        }),
      X.apply(this, arguments)
    );
  }
  h.prototype.includes ||
    (h.prototype.includes = function () {
      return -1 !== h.prototype.indexOf.apply(this, arguments);
    }),
    h.prototype.startsWith ||
      (h.prototype.startsWith = function () {
        return 0 === h.prototype.indexOf.apply(this, arguments);
      }),
    d.from ||
      (d.from =
        ((Y = p.prototype.toString),
        (Z = function (e) {
          return "function" == typeof e || "[object Function]" === Y.call(e);
        }),
        (V = g.pow(2, 53) - 1),
        (W = function (e) {
          var n = (function (e) {
            var n = v(e);
            return isNaN(n)
              ? 0
              : 0 !== n && isFinite(n)
              ? (n > 0 ? 1 : -1) * g.floor(g.abs(n))
              : n;
          })(e);
          return g.min(g.max(n, 0), V);
        }),
        (J = function (e) {
          var n = [];
          return (
            e.forEach(function (e) {
              return n.push(e);
            }),
            n
          );
        }),
        function (e) {
          if (e instanceof Set) return J(e);
          var n = this,
            t = p(e);
          if (null == e)
            throw new D(
              "Array.from requires an array-like object - not null or undefined"
            );
          var r,
            i = arguments.length > 1 ? arguments[1] : void 0;
          if (void 0 !== i) {
            if (!Z(i))
              throw new D(
                "Array.from: when provided, the second argument must be a function"
              );
            arguments.length > 2 && (r = arguments[2]);
          }
          for (
            var o, a = W(t.length), u = Z(n) ? p(new n(a)) : new d(a), c = 0;
            c < a;

          )
            (o = t[c]),
              (u[c] = i ? (void 0 === r ? i(o, c) : i.call(r, o, c)) : o),
              (c += 1);
          return (u.length = a), u;
        })),
    d.prototype.fill ||
      p.defineProperty(d.prototype, "fill", {
        value: function (e) {
          if (null == this) throw new D("this is null or not defined");
          for (
            var n = p(this),
              t = n.length >>> 0,
              r = arguments[1],
              i = r >> 0,
              o = i < 0 ? g.max(t + i, 0) : g.min(i, t),
              a = arguments[2],
              u = void 0 === a ? t : a >> 0,
              c = u < 0 ? g.max(t + u, 0) : g.min(u, t);
            o < c;

          )
            (n[o] = e), o++;
          return n;
        },
      }),
    "function" != typeof p.assign &&
      p.defineProperty(p, "assign", {
        value: function (e) {
          if (null == e)
            throw new D("Cannot convert undefined or null to object");
          for (var n = p(e), t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            if (null != r)
              for (var i in r)
                p.prototype.hasOwnProperty.call(r, i) && (n[i] = r[i]);
          }
          return n;
        },
        writable: !0,
        configurable: !0,
      }),
    q.alert.name ||
      p.defineProperty(Function.prototype, "name", {
        get: function () {
          var e = (this.toString()
            .replace(/\n/g, "")
            .match(/^function\s*([^\s(]+)/) || [])[1];
          return p.defineProperty(this, "name", { value: e }), e;
        },
        configurable: !0,
      }),
    d.prototype.filter ||
      (d.prototype.filter = function (e) {
        for (var n = [], t = this.length, r = 0; r < t; r++)
          e(this[r], r, this) && n.push(this[r]);
        return n;
      });
  var Q = "behav",
    ee = "metric",
    ne = Object.freeze({
      __proto__: null,
      BEHAV: Q,
      RENDER: "render",
      METRIC: ee,
      DEBUG: "debug",
      INTEGRATION: "integration",
    }),
    te = function () {
      return (
        (te =
          p.assign ||
          function (e) {
            for (var n, t = 1, r = arguments.length; t < r; t++)
              for (var i in (n = arguments[t]))
                p.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
            return e;
          }),
        te.apply(this, arguments)
      );
    };
  function re(e, n, t) {
    if (t || 2 === arguments.length)
      for (var r, i = 0, o = n.length; i < o; i++)
        (!r && i in n) ||
          (r || (r = d.prototype.slice.call(n, 0, i)), (r[i] = n[i]));
    return e.concat(r || d.prototype.slice.call(n));
  }
  var ie = {
    _storage: {},
    setItem: function (e, n) {
      this._storage[e] = n;
    },
    getItem: function (e) {
      return this._storage[e] || null;
    },
    removeItem: function (e) {
      delete this._storage[e];
    },
  };
  var oe = (function () {
      var e = y.now();
      try {
        l.localStorage.setItem("_storage", e);
        var n = l.localStorage.getItem("_storage");
        return (
          l.localStorage.removeItem("_storage"),
          e !== k(h(n)) ? ie : l.localStorage
        );
      } catch (e) {
        return ie;
      }
    })(),
    ae = "rzp_checkout_exp",
    ue = (function () {
      function e(n) {
        void 0 === n && (n = {});
        var t = this;
        (this.getExperiment = function (e) {
          return e ? t.experiments[e] : null;
        }),
          (this.getAllActiveExperimentsName = function () {
            return p.keys(t.experiments);
          }),
          (this.clearOldExperiments = function () {
            var n = e.getExperimentsFromStorage(),
              r = t.getAllActiveExperimentsName().reduce(function (e, t) {
                return void 0 !== n[t] && (e[t] = n[t]), e;
              }, {});
            e.setExperimentsInStorage(r);
          }),
          (this.create = function (e, n, r) {
            var i;
            void 0 === r && (r = {});
            var o = r.evaluatorArg,
              a = r.overrideFn;
            var u = n;
            if (
              ("number" == typeof n &&
                (u = function () {
                  return g.random() < n ? 0 : 1;
                }),
              "function" != typeof u)
            )
              throw new Error("evaluatorFn must be a function or number");
            var c = {
              name: e,
              enabled: function () {
                return 1 === this.getSegmentOrCreate(e, o, a);
              }.bind(t),
              evaluator: u,
            };
            return t.register((((i = {})[e] = c), i)), c;
          }),
          (this.experiments = n);
      }
      return (
        (e.setExperimentsInStorage = function (e) {
          if (e && "object" == typeof e)
            try {
              oe.setItem(ae, JSON.stringify(e));
            } catch (e) {
              return;
            }
        }),
        (e.getExperimentsFromStorage = function () {
          var e;
          try {
            e = JSON.parse(oe.getItem(ae));
          } catch (e) {}
          return e && "object" == typeof e && !d.isArray(e) ? e : {};
        }),
        (e.prototype.setSegment = function (n, t, r) {
          var i = this.getExperiment(n);
          if (i) {
            var o = ("function" == typeof r ? r : i.evaluator)(t),
              a = e.getExperimentsFromStorage();
            return (a[i.name] = o), e.setExperimentsInStorage(a), o;
          }
        }),
        (e.prototype.getSegment = function (n) {
          return e.getExperimentsFromStorage()[n];
        }),
        (e.prototype.getSegmentOrCreate = function (e, n, t) {
          var r = this.getSegment(e);
          return "function" == typeof t
            ? t(n)
            : void 0 === r
            ? this.setSegment(e, n, t)
            : r;
        }),
        (e.prototype.register = function (e) {
          this.experiments = te(te({}, this.experiments), e);
        }),
        e
      );
    })();
  new ue({});
  var ce;
  function se(e, n) {
    for (var t = 0; t < n.length; t++) {
      var r = n[t];
      (r.enumerable = r.enumerable || !1),
        (r.configurable = !0),
        "value" in r && (r.writable = !0),
        p.defineProperty(e, r.key, r);
    }
  }
  function le(e, n, t) {
    return n && se(e.prototype, n), t && se(e, t), e;
  }
  function me(e) {
    return (
      (me = p.setPrototypeOf
        ? p.getPrototypeOf
        : function (e) {
            return e.__proto__ || p.getPrototypeOf(e);
          }),
      me(e)
    );
  }
  function fe(e, n) {
    return (
      (fe =
        p.setPrototypeOf ||
        function (e, n) {
          return (e.__proto__ = n), e;
        }),
      fe(e, n)
    );
  }
  function de() {
    if ("undefined" == typeof Reflect || !Reflect.construct) return !1;
    if (Reflect.construct.sham) return !1;
    if ("function" == typeof Proxy) return !0;
    try {
      return (
        f.prototype.valueOf.call(Reflect.construct(f, [], function () {})), !0
      );
    } catch (e) {
      return !1;
    }
  }
  function pe(e, n, t) {
    return (
      (pe = de()
        ? Reflect.construct
        : function (e, n, t) {
            var r = [null];
            r.push.apply(r, n);
            var i = new (Function.bind.apply(e, r))();
            return t && fe(i, t.prototype), i;
          }),
      pe.apply(null, arguments)
    );
  }
  function he(e) {
    var n = "function" == typeof Map ? new Map() : void 0;
    return (
      (he = function (e) {
        if (
          null === e ||
          ((t = e), -1 === Function.toString.call(t).indexOf("[native code]"))
        )
          return e;
        var t;
        if ("function" != typeof e)
          throw new D("Super expression must either be null or a function");
        if (void 0 !== n) {
          if (n.has(e)) return n.get(e);
          n.set(e, r);
        }
        function r() {
          return pe(e, arguments, me(this).constructor);
        }
        return (
          (r.prototype = p.create(e.prototype, {
            constructor: {
              value: r,
              enumerable: !1,
              writable: !0,
              configurable: !0,
            },
          })),
          fe(r, e)
        );
      }),
      he(e)
    );
  }
  function ve(e, n) {
    (null == n || n > e.length) && (n = e.length);
    for (var t = 0, r = new d(n); t < n; t++) r[t] = e[t];
    return r;
  }
  function ye(e) {
    return (
      (function (e) {
        if (d.isArray(e)) return ve(e);
      })(e) ||
      (function (e) {
        if (
          ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
          null != e["@@iterator"]
        )
          return d.from(e);
      })(e) ||
      (function (e, n) {
        if (e) {
          if ("string" == typeof e) return ve(e, n);
          var t = p.prototype.toString.call(e).slice(8, -1);
          return (
            "Object" === t && e.constructor && (t = e.constructor.name),
            "Map" === t || "Set" === t
              ? d.from(e)
              : "Arguments" === t ||
                /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
              ? ve(e, n)
              : void 0
          );
        }
      })(e) ||
      (function () {
        throw new D(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function ge(e, n) {
    (e.prototype = p.create(n.prototype)),
      (e.prototype.constructor = e),
      fe(e, n);
  }
  function _e() {}
  function be(e) {
    return e();
  }
  function we() {
    return Object.create(null);
  }
  function ke(e) {
    e.forEach(be);
  }
  function Se(e) {
    return "function" == typeof e;
  }
  function Ee(e, n) {
    return e != e
      ? n == n
      : e !== n || (e && "object" == typeof e) || "function" == typeof e;
  }
  function Ae(e) {
    if (null == e) return _e;
    for (
      var n = arguments.length, t = new Array(n > 1 ? n - 1 : 0), r = 1;
      r < n;
      r++
    )
      t[r - 1] = arguments[r];
    var i = e.subscribe.apply(e, t);
    return i.unsubscribe
      ? function () {
          return i.unsubscribe();
        }
      : i;
  }
  function Ce(e) {
    var n;
    return (
      Ae(e, function (e) {
        return (n = e);
      })(),
      n
    );
  }
  function De(e, n, t, r) {
    return e[1] && r
      ? (function (e, n) {
          for (var t in n) e[t] = n[t];
          return e;
        })(t.ctx.slice(), e[1](r(n)))
      : t.ctx;
  }
  function Re(e, n) {
    e.appendChild(n);
  }
  function xe(e, n, t) {
    e.insertBefore(n, t || null);
  }
  function Pe(e) {
    e.parentNode.removeChild(e);
  }
  function Ne(e) {
    return document.createElement(e);
  }
  function Me(e) {
    return document.createElementNS("http://www.w3.org/2000/svg", e);
  }
  function Ie(e) {
    return document.createTextNode(e);
  }
  function Te(e, n, t) {
    null == t
      ? e.removeAttribute(n)
      : e.getAttribute(n) !== t && e.setAttribute(n, t);
  }
  function Le(e, n, t, r) {
    e.style.setProperty(n, t, r ? "important" : "");
  }
  function Oe(e) {
    ce = e;
  }
  function Be() {
    var e = (function () {
      if (!ce)
        throw new Error("Function called outside component initialization");
      return ce;
    })();
    return function (n, t) {
      var r = e.$$.callbacks[n];
      if (r) {
        var i = (function (e, n, t) {
          void 0 === t && (t = !1);
          var r = document.createEvent("CustomEvent");
          return r.initCustomEvent(e, t, !1, n), r;
        })(n, t);
        r.slice().forEach(function (n) {
          n.call(e, i);
        });
      }
    };
  }
  var Fe = [],
    ze = [],
    Ke = [],
    $e = [],
    je = Promise.resolve(),
    He = !1;
  function Ge(e) {
    Ke.push(e);
  }
  var Ue = !1,
    Ye = new Set();
  function Ze() {
    if (!Ue) {
      Ue = !0;
      do {
        for (var e = 0; e < Fe.length; e += 1) {
          var n = Fe[e];
          Oe(n), Ve(n.$$);
        }
        for (Oe(null), Fe.length = 0; ze.length; ) ze.pop()();
        for (var t = 0; t < Ke.length; t += 1) {
          var r = Ke[t];
          Ye.has(r) || (Ye.add(r), r());
        }
        Ke.length = 0;
      } while (Fe.length);
      for (; $e.length; ) $e.pop()();
      (He = !1), (Ue = !1), Ye.clear();
    }
  }
  function Ve(e) {
    if (null !== e.fragment) {
      e.update(), ke(e.before_update);
      var n = e.dirty;
      (e.dirty = [-1]),
        e.fragment && e.fragment.p(e.ctx, n),
        e.after_update.forEach(Ge);
    }
  }
  var We = new Set();
  function Je(e, n) {
    e && e.i && (We.delete(e), e.i(n));
  }
  function qe(e, n) {
    -1 === e.$$.dirty[0] &&
      (Fe.push(e), He || ((He = !0), je.then(Ze)), e.$$.dirty.fill(0)),
      (e.$$.dirty[(n / 31) | 0] |= 1 << n % 31);
  }
  function Xe(e, n, t, r, i, o, a, u) {
    void 0 === u && (u = [-1]);
    var c = ce;
    Oe(e);
    var s = (e.$$ = {
      fragment: null,
      ctx: null,
      props: o,
      update: _e,
      not_equal: i,
      bound: we(),
      on_mount: [],
      on_destroy: [],
      on_disconnect: [],
      before_update: [],
      after_update: [],
      context: new Map(n.context || (c ? c.$$.context : [])),
      callbacks: we(),
      dirty: u,
      skip_bound: !1,
      root: n.target || c.$$.root,
    });
    a && a(s.root);
    var l = !1;
    if (
      ((s.ctx = t
        ? t(e, n.props || {}, function (n, t) {
            var r =
              !(arguments.length <= 2) && arguments.length - 2
                ? arguments.length <= 2
                  ? void 0
                  : arguments[2]
                : t;
            return (
              s.ctx &&
                i(s.ctx[n], (s.ctx[n] = r)) &&
                (!s.skip_bound && s.bound[n] && s.bound[n](r), l && qe(e, n)),
              t
            );
          })
        : []),
      s.update(),
      (l = !0),
      ke(s.before_update),
      (s.fragment = !!r && r(s.ctx)),
      n.target)
    ) {
      if (n.hydrate) {
        var m = (function (e) {
          return Array.from(e.childNodes);
        })(n.target);
        s.fragment && s.fragment.l(m), m.forEach(Pe);
      } else s.fragment && s.fragment.c();
      n.intro && Je(e.$$.fragment),
        (function (e, n, t, r) {
          var i = e.$$,
            o = i.fragment,
            a = i.on_mount,
            u = i.on_destroy,
            c = i.after_update;
          o && o.m(n, t),
            r ||
              Ge(function () {
                var n = a.map(be).filter(Se);
                u ? u.push.apply(u, ye(n)) : ke(n), (e.$$.on_mount = []);
              }),
            c.forEach(Ge);
        })(e, n.target, n.anchor, n.customElement),
        Ze();
    }
    Oe(c);
  }
  var Qe = (function () {
    function e() {}
    var n = e.prototype;
    return (
      (n.$destroy = function () {
        var e, n;
        (e = 1),
          null !== (n = this.$$).fragment &&
            (ke(n.on_destroy),
            n.fragment && n.fragment.d(e),
            (n.on_destroy = n.fragment = null),
            (n.ctx = [])),
          (this.$destroy = _e);
      }),
      (n.$on = function (e, n) {
        var t = this.$$.callbacks[e] || (this.$$.callbacks[e] = []);
        return (
          t.push(n),
          function () {
            var e = t.indexOf(n);
            -1 !== e && t.splice(e, 1);
          }
        );
      }),
      (n.$set = function (e) {
        var n;
        this.$$set &&
          ((n = e), 0 !== Object.keys(n).length) &&
          ((this.$$.skip_bound = !0), this.$$set(e), (this.$$.skip_bound = !1));
      }),
      e
    );
  })();
  function en(e, n) {
    var t =
      ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
    if (t) return (t = t.call(e)).next.bind(t);
    if (
      Array.isArray(e) ||
      (t = (function (e, n) {
        if (!e) return;
        if ("string" == typeof e) return nn(e, n);
        var t = Object.prototype.toString.call(e).slice(8, -1);
        "Object" === t && e.constructor && (t = e.constructor.name);
        if ("Map" === t || "Set" === t) return Array.from(e);
        if (
          "Arguments" === t ||
          /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
        )
          return nn(e, n);
      })(e)) ||
      (n && e && "number" == typeof e.length)
    ) {
      t && (e = t);
      var r = 0;
      return function () {
        return r >= e.length ? { done: !0 } : { done: !1, value: e[r++] };
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  function nn(e, n) {
    (null == n || n > e.length) && (n = e.length);
    for (var t = 0, r = new Array(n); t < n; t++) r[t] = e[t];
    return r;
  }
  var tn = [];
  function rn(e, n) {
    var t;
    void 0 === n && (n = _e);
    var r = new Set();
    function i(n) {
      if (Ee(e, n) && ((e = n), t)) {
        for (var i, o = !tn.length, a = en(r); !(i = a()).done; ) {
          var u = i.value;
          u[1](), tn.push(u, e);
        }
        if (o) {
          for (var c = 0; c < tn.length; c += 2) tn[c][0](tn[c + 1]);
          tn.length = 0;
        }
      }
    }
    return {
      set: i,
      update: function (n) {
        i(n(e));
      },
      subscribe: function (o, a) {
        void 0 === a && (a = _e);
        var u = [o, a];
        return (
          r.add(u),
          1 === r.size && (t = n(i) || _e),
          o(e),
          function () {
            r.delete(u), 0 === r.size && (t(), (t = null));
          }
        );
      },
    };
  }
  function on(e, n, t) {
    var r,
      i = !Array.isArray(e),
      o = i ? [e] : e,
      a = n.length < 2;
    return (
      (r = function (e) {
        var t = !1,
          r = [],
          u = 0,
          c = _e,
          s = function () {
            if (!u) {
              c();
              var t = n(i ? r[0] : r, e);
              a ? e(t) : (c = Se(t) ? t : _e);
            }
          },
          l = o.map(function (e, n) {
            return Ae(
              e,
              function (e) {
                (r[n] = e), (u &= ~(1 << n)), t && s();
              },
              function () {
                u |= 1 << n;
              }
            );
          });
        return (
          (t = !0),
          s(),
          function () {
            ke(l), c();
          }
        );
      }),
      { subscribe: rn(t, r).subscribe }
    );
  }
  var an = [
      "rzp_test_mZcDnA8WJMFQQD",
      "rzp_live_ENneAQv5t7kTEQ",
      "rzp_test_kD8QgcxVGzYSOU",
      "rzp_live_alEMh9FVT4XpwM",
    ],
    un = ["order", "invoice", "subscription"];
  function cn(e, n, t) {
    return (
      void 0 === t && (t = null),
      "string" == typeof n && (n = n.split(".")),
      n.reduce(function (e, n) {
        return e && void 0 !== e[n] ? e[n] : t;
      }, e)
    );
  }
  function sn(e) {
    return null !== e && "object" == typeof e;
  }
  var ln = function (e, n) {
      return !!sn(e) && n in e;
    },
    mn = function (e) {
      return !p.keys(e || {}).length;
    },
    fn = function (e, n) {
      return p.keys(e).reduce(function (t, r) {
        return (t[r] = n(e[r], r, e)), t;
      }, {});
    },
    dn = function (e, n) {
      void 0 === e && (e = {}), void 0 === n && (n = "");
      var t = {};
      return (
        p.entries(e).forEach(function (e) {
          var r = e[0],
            i = e[1],
            o = n ? "".concat(n, ".").concat(r) : r;
          i && "object" == typeof i ? p.assign(t, dn(i, o)) : (t[o] = i);
        }),
        t
      );
    },
    pn = function (e) {
      void 0 === e && (e = {});
      var n,
        t = {};
      return (
        p.entries(e).forEach(function (e) {
          var r = e[0],
            i = e[1],
            o = (r = r.replace(/\[([^[\]]+)\]/g, "".concat(".", "$1"))).split(
              "."
            ),
            a = t;
          o.forEach(function (e, t) {
            t < o.length - 1
              ? (a[e] || (a[e] = {}), (n = a[e]), (a = n))
              : (a[e] = i);
          });
        }),
        t
      );
    },
    hn = function (e) {
      return sn(e) ? JSON.parse(JSON.stringify(e)) : e;
    },
    vn = function (e, n) {
      sn(e) &&
        p.keys(e).forEach(function (t) {
          return n(e[t], t, e);
        });
    },
    yn = function (e) {
      try {
        return JSON.parse(e);
      } catch (e) {}
    },
    gn = (function () {
      function e() {
        var e = this;
        (this.instance = null),
          (this.preferenceResponse = null),
          (this.isEmbedded = !1),
          (this.updateInstance = function (n) {
            e.razorpayInstance = n;
          }),
          (this.triggerInstanceMethod = function (n, t) {
            if ((void 0 === t && (t = []), e.instance))
              return e.instance[n].apply(e.instance, t);
          }),
          (this.set = function () {
            for (var n = arguments.length, t = new d(n), r = 0; r < n; r++)
              t[r] = arguments[r];
            return e.triggerInstanceMethod("set", t);
          }),
          (this.subscribe = function () {
            for (var n = arguments.length, t = new d(n), r = 0; r < n; r++)
              t[r] = arguments[r];
            return e._store.subscribe.apply(e, t);
          }),
          (this.get = function () {
            for (var n = arguments.length, t = new d(n), r = 0; r < n; r++)
              t[r] = arguments[r];
            return t.length ? e.triggerInstanceMethod("get", t) : e.instance;
          }),
          (this.getMerchantOption = function (n) {
            void 0 === n && (n = "");
            var t = e.triggerInstanceMethod("get") || {};
            return n ? cn(t, n) : t;
          }),
          (this.isIRCTC = function () {
            return an.indexOf(e.get("key")) >= 0;
          }),
          (this.getCardFeatures = function (n) {
            return e.instance.getCardFeatures(n);
          }),
          (this._store = rn());
      }
      return (
        le(e, [
          {
            key: "razorpayInstance",
            get: function () {
              return this.instance;
            },
            set: function (e) {
              (this.instance = e),
                (this.preferenceResponse = e.preferences),
                this._store.set(e),
                this.isIRCTC() && this.set("theme.image_frame", !1);
            },
          },
          {
            key: "preferences",
            get: function () {
              return this.preferenceResponse;
            },
          },
        ]),
        e
      );
    })(),
    _n = new gn(),
    bn = {
      AED: {
        code: "784",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "Ø¯.Ø¥",
        name: "Emirati Dirham",
      },
      ALL: {
        code: "008",
        denomination: 100,
        min_value: 221,
        min_auth_value: 100,
        symbol: "Lek",
        name: "Albanian Lek",
      },
      AMD: {
        code: "051",
        denomination: 100,
        min_value: 975,
        min_auth_value: 100,
        symbol: "Ö",
        name: "Armenian Dram",
      },
      ARS: {
        code: "032",
        denomination: 100,
        min_value: 80,
        min_auth_value: 100,
        symbol: "ARS",
        name: "Argentine Peso",
      },
      AUD: {
        code: "036",
        denomination: 100,
        min_value: 50,
        min_auth_value: 100,
        symbol: "A$",
        name: "Australian Dollar",
      },
      AWG: {
        code: "533",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "Afl.",
        name: "Aruban or Dutch Guilder",
      },
      BBD: {
        code: "052",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "Bds$",
        name: "Barbadian or Bajan Dollar",
      },
      BDT: {
        code: "050",
        denomination: 100,
        min_value: 168,
        min_auth_value: 100,
        symbol: "à§³",
        name: "Bangladeshi Taka",
      },
      BMD: {
        code: "060",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "$",
        name: "Bermudian Dollar",
      },
      BND: {
        code: "096",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "BND",
        name: "Bruneian Dollar",
      },
      BOB: {
        code: "068",
        denomination: 100,
        min_value: 14,
        min_auth_value: 100,
        symbol: "Bs",
        name: "Bolivian BolÃ­viano",
      },
      BSD: {
        code: "044",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "BSD",
        name: "Bahamian Dollar",
      },
      BWP: {
        code: "072",
        denomination: 100,
        min_value: 22,
        min_auth_value: 100,
        symbol: "P",
        name: "Botswana Pula",
      },
      BZD: {
        code: "084",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "BZ$",
        name: "Belizean Dollar",
      },
      CAD: {
        code: "124",
        denomination: 100,
        min_value: 50,
        min_auth_value: 100,
        symbol: "C$",
        name: "Canadian Dollar",
      },
      CHF: {
        code: "756",
        denomination: 100,
        min_value: 50,
        min_auth_value: 100,
        symbol: "CHf",
        name: "Swiss Franc",
      },
      CNY: {
        code: "156",
        denomination: 100,
        min_value: 14,
        min_auth_value: 100,
        symbol: "Â¥",
        name: "Chinese Yuan Renminbi",
      },
      COP: {
        code: "170",
        denomination: 100,
        min_value: 1e3,
        min_auth_value: 100,
        symbol: "COL$",
        name: "Colombian Peso",
      },
      CRC: {
        code: "188",
        denomination: 100,
        min_value: 1e3,
        min_auth_value: 100,
        symbol: "â‚¡",
        name: "Costa Rican Colon",
      },
      CUP: {
        code: "192",
        denomination: 100,
        min_value: 53,
        min_auth_value: 100,
        symbol: "$MN",
        name: "Cuban Peso",
      },
      CZK: {
        code: "203",
        denomination: 100,
        min_value: 46,
        min_auth_value: 100,
        symbol: "KÄ",
        name: "Czech Koruna",
      },
      DKK: {
        code: "208",
        denomination: 100,
        min_value: 250,
        min_auth_value: 100,
        symbol: "DKK",
        name: "Danish Krone",
      },
      DOP: {
        code: "214",
        denomination: 100,
        min_value: 102,
        min_auth_value: 100,
        symbol: "RD$",
        name: "Dominican Peso",
      },
      DZD: {
        code: "012",
        denomination: 100,
        min_value: 239,
        min_auth_value: 100,
        symbol: "Ø¯.Ø¬",
        name: "Algerian Dinar",
      },
      EGP: {
        code: "818",
        denomination: 100,
        min_value: 35,
        min_auth_value: 100,
        symbol: "EÂ£",
        name: "Egyptian Pound",
      },
      ETB: {
        code: "230",
        denomination: 100,
        min_value: 57,
        min_auth_value: 100,
        symbol: "á‰¥áˆ­",
        name: "Ethiopian Birr",
      },
      EUR: {
        code: "978",
        denomination: 100,
        min_value: 50,
        min_auth_value: 100,
        symbol: "â‚¬",
        name: "Euro",
      },
      FJD: {
        code: "242",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "FJ$",
        name: "Fijian Dollar",
      },
      GBP: {
        code: "826",
        denomination: 100,
        min_value: 30,
        min_auth_value: 100,
        symbol: "Â£",
        name: "British Pound",
      },
      GIP: {
        code: "292",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "GIP",
        name: "Gibraltar Pound",
      },
      GMD: {
        code: "270",
        denomination: 100,
        min_value: 100,
        min_auth_value: 100,
        symbol: "D",
        name: "Gambian Dalasi",
      },
      GTQ: {
        code: "320",
        denomination: 100,
        min_value: 16,
        min_auth_value: 100,
        symbol: "Q",
        name: "Guatemalan Quetzal",
      },
      GYD: {
        code: "328",
        denomination: 100,
        min_value: 418,
        min_auth_value: 100,
        symbol: "G$",
        name: "Guyanese Dollar",
      },
      HKD: {
        code: "344",
        denomination: 100,
        min_value: 400,
        min_auth_value: 100,
        symbol: "HK$",
        name: "Hong Kong Dollar",
      },
      HNL: {
        code: "340",
        denomination: 100,
        min_value: 49,
        min_auth_value: 100,
        symbol: "HNL",
        name: "Honduran Lempira",
      },
      HRK: {
        code: "191",
        denomination: 100,
        min_value: 14,
        min_auth_value: 100,
        symbol: "kn",
        name: "Croatian Kuna",
      },
      HTG: {
        code: "332",
        denomination: 100,
        min_value: 167,
        min_auth_value: 100,
        symbol: "G",
        name: "Haitian Gourde",
      },
      HUF: {
        code: "348",
        denomination: 100,
        min_value: 555,
        min_auth_value: 100,
        symbol: "Ft",
        name: "Hungarian Forint",
      },
      IDR: {
        code: "360",
        denomination: 100,
        min_value: 1e3,
        min_auth_value: 100,
        symbol: "Rp",
        name: "Indonesian Rupiah",
      },
      ILS: {
        code: "376",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "â‚ª",
        name: "Israeli Shekel",
      },
      INR: {
        code: "356",
        denomination: 100,
        min_value: 100,
        min_auth_value: 100,
        symbol: "â‚¹",
        name: "Indian Rupee",
      },
      JMD: {
        code: "388",
        denomination: 100,
        min_value: 250,
        min_auth_value: 100,
        symbol: "J$",
        name: "Jamaican Dollar",
      },
      KES: {
        code: "404",
        denomination: 100,
        min_value: 201,
        min_auth_value: 100,
        symbol: "Ksh",
        name: "Kenyan Shilling",
      },
      KGS: {
        code: "417",
        denomination: 100,
        min_value: 140,
        min_auth_value: 100,
        symbol: "Ð›Ð²",
        name: "Kyrgyzstani Som",
      },
      KHR: {
        code: "116",
        denomination: 100,
        min_value: 1e3,
        min_auth_value: 100,
        symbol: "áŸ›",
        name: "Cambodian Riel",
      },
      KYD: {
        code: "136",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "CI$",
        name: "Caymanian Dollar",
      },
      KZT: {
        code: "398",
        denomination: 100,
        min_value: 759,
        min_auth_value: 100,
        symbol: "â‚¸",
        name: "Kazakhstani Tenge",
      },
      LAK: {
        code: "418",
        denomination: 100,
        min_value: 1e3,
        min_auth_value: 100,
        symbol: "â‚­",
        name: "Lao Kip",
      },
      LBP: {
        code: "422",
        denomination: 100,
        min_value: 1e3,
        min_auth_value: 100,
        symbol: "&#1604;.&#1604;.",
        name: "Lebanese Pound",
      },
      LKR: {
        code: "144",
        denomination: 100,
        min_value: 358,
        min_auth_value: 100,
        symbol: "à¶»à·”",
        name: "Sri Lankan Rupee",
      },
      LRD: {
        code: "430",
        denomination: 100,
        min_value: 325,
        min_auth_value: 100,
        symbol: "L$",
        name: "Liberian Dollar",
      },
      LSL: {
        code: "426",
        denomination: 100,
        min_value: 29,
        min_auth_value: 100,
        symbol: "LSL",
        name: "Basotho Loti",
      },
      MAD: {
        code: "504",
        denomination: 100,
        min_value: 20,
        min_auth_value: 100,
        symbol: "Ø¯.Ù….",
        name: "Moroccan Dirham",
      },
      MDL: {
        code: "498",
        denomination: 100,
        min_value: 35,
        min_auth_value: 100,
        symbol: "MDL",
        name: "Moldovan Leu",
      },
      MKD: {
        code: "807",
        denomination: 100,
        min_value: 109,
        min_auth_value: 100,
        symbol: "Ð´ÐµÐ½",
        name: "Macedonian Denar",
      },
      MMK: {
        code: "104",
        denomination: 100,
        min_value: 1e3,
        min_auth_value: 100,
        symbol: "MMK",
        name: "Burmese Kyat",
      },
      MNT: {
        code: "496",
        denomination: 100,
        min_value: 1e3,
        min_auth_value: 100,
        symbol: "â‚®",
        name: "Mongolian Tughrik",
      },
      MOP: {
        code: "446",
        denomination: 100,
        min_value: 17,
        min_auth_value: 100,
        symbol: "MOP$",
        name: "Macau Pataca",
      },
      MUR: {
        code: "480",
        denomination: 100,
        min_value: 70,
        min_auth_value: 100,
        symbol: "â‚¨",
        name: "Mauritian Rupee",
      },
      MVR: {
        code: "462",
        denomination: 100,
        min_value: 31,
        min_auth_value: 100,
        symbol: "Rf",
        name: "Maldivian Rufiyaa",
      },
      MWK: {
        code: "454",
        denomination: 100,
        min_value: 1e3,
        min_auth_value: 100,
        symbol: "MK",
        name: "Malawian Kwacha",
      },
      MXN: {
        code: "484",
        denomination: 100,
        min_value: 39,
        min_auth_value: 100,
        symbol: "Mex$",
        name: "Mexican Peso",
      },
      MYR: {
        code: "458",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "RM",
        name: "Malaysian Ringgit",
      },
      NAD: {
        code: "516",
        denomination: 100,
        min_value: 29,
        min_auth_value: 100,
        symbol: "N$",
        name: "Namibian Dollar",
      },
      NGN: {
        code: "566",
        denomination: 100,
        min_value: 723,
        min_auth_value: 100,
        symbol: "â‚¦",
        name: "Nigerian Naira",
      },
      NIO: {
        code: "558",
        denomination: 100,
        min_value: 66,
        min_auth_value: 100,
        symbol: "NIO",
        name: "Nicaraguan Cordoba",
      },
      NOK: {
        code: "578",
        denomination: 100,
        min_value: 300,
        min_auth_value: 100,
        symbol: "NOK",
        name: "Norwegian Krone",
      },
      NPR: {
        code: "524",
        denomination: 100,
        min_value: 221,
        min_auth_value: 100,
        symbol: "à¤°à¥‚",
        name: "Nepalese Rupee",
      },
      NZD: {
        code: "554",
        denomination: 100,
        min_value: 50,
        min_auth_value: 100,
        symbol: "NZ$",
        name: "New Zealand Dollar",
      },
      PEN: {
        code: "604",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "S/",
        name: "Peruvian Sol",
      },
      PGK: {
        code: "598",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "PGK",
        name: "Papua New Guinean Kina",
      },
      PHP: {
        code: "608",
        denomination: 100,
        min_value: 106,
        min_auth_value: 100,
        symbol: "â‚±",
        name: "Philippine Peso",
      },
      PKR: {
        code: "586",
        denomination: 100,
        min_value: 227,
        min_auth_value: 100,
        symbol: "â‚¨",
        name: "Pakistani Rupee",
      },
      QAR: {
        code: "634",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "QR",
        name: "Qatari Riyal",
      },
      RUB: {
        code: "643",
        denomination: 100,
        min_value: 130,
        min_auth_value: 100,
        symbol: "â‚½",
        name: "Russian Ruble",
      },
      SAR: {
        code: "682",
        denomination: 100,
        min_value: 10,
        min_auth_value: 100,
        symbol: "SR",
        name: "Saudi Arabian Riyal",
      },
      SCR: {
        code: "690",
        denomination: 100,
        min_value: 28,
        min_auth_value: 100,
        symbol: "SRe",
        name: "Seychellois Rupee",
      },
      SEK: {
        code: "752",
        denomination: 100,
        min_value: 300,
        min_auth_value: 100,
        symbol: "SEK",
        name: "Swedish Krona",
      },
      SGD: {
        code: "702",
        denomination: 100,
        min_value: 50,
        min_auth_value: 100,
        symbol: "S$",
        name: "Singapore Dollar",
      },
      SLL: {
        code: "694",
        denomination: 100,
        min_value: 1e3,
        min_auth_value: 100,
        symbol: "Le",
        name: "Sierra Leonean Leone",
      },
      SOS: {
        code: "706",
        denomination: 100,
        min_value: 1e3,
        min_auth_value: 100,
        symbol: "Sh.so.",
        name: "Somali Shilling",
      },
      SSP: {
        code: "728",
        denomination: 100,
        min_value: 100,
        min_auth_value: 100,
        symbol: "SSÂ£",
        name: "South Sudanese Pound",
      },
      SVC: {
        code: "222",
        denomination: 100,
        min_value: 18,
        min_auth_value: 100,
        symbol: "â‚¡",
        name: "Salvadoran Colon",
      },
      SZL: {
        code: "748",
        denomination: 100,
        min_value: 29,
        min_auth_value: 100,
        symbol: "E",
        name: "Swazi Lilangeni",
      },
      THB: {
        code: "764",
        denomination: 100,
        min_value: 64,
        min_auth_value: 100,
        symbol: "à¸¿",
        name: "Thai Baht",
      },
      TTD: {
        code: "780",
        denomination: 100,
        min_value: 14,
        min_auth_value: 100,
        symbol: "TT$",
        name: "Trinidadian Dollar",
      },
      TZS: {
        code: "834",
        denomination: 100,
        min_value: 1e3,
        min_auth_value: 100,
        symbol: "Sh",
        name: "Tanzanian Shilling",
      },
      USD: {
        code: "840",
        denomination: 100,
        min_value: 50,
        min_auth_value: 100,
        symbol: "$",
        name: "US Dollar",
      },
      UYU: {
        code: "858",
        denomination: 100,
        min_value: 67,
        min_auth_value: 100,
        symbol: "$U",
        name: "Uruguayan Peso",
      },
      UZS: {
        code: "860",
        denomination: 100,
        min_value: 1e3,
        min_auth_value: 100,
        symbol: "so'm",
        name: "Uzbekistani Som",
      },
      YER: {
        code: "886",
        denomination: 100,
        min_value: 501,
        min_auth_value: 100,
        symbol: "ï·¼",
        name: "Yemeni Rial",
      },
      ZAR: {
        code: "710",
        denomination: 100,
        min_value: 29,
        min_auth_value: 100,
        symbol: "R",
        name: "South African Rand",
      },
    },
    wn = function (e, n) {
      return (
        void 0 === n && (n = "."),
        function (t) {
          for (var r = n, i = 0; i < e; i++) r += "0";
          return t.replace(r, "");
        }
      );
    },
    kn = function (e, n) {
      return void 0 === n && (n = ","), e.replace(/\./, n);
    },
    Sn = {
      three: function (e, n) {
        var t;
        return (
          (t = h(e).replace(
            new RegExp("(.{1,3})(?=(...)+(\\..{" + n + "})$)", "g"),
            "$1,"
          )),
          wn(n)(t)
        );
      },
      threecommadecimal: function (e, n) {
        var t;
        return (
          (t = kn(h(e)).replace(
            new RegExp("(.{1,3})(?=(...)+(\\,.{" + n + "})$)", "g"),
            "$1."
          )),
          wn(n, ",")(t)
        );
      },
      threespaceseparator: function (e, n) {
        var t;
        return (
          (t = h(e).replace(
            new RegExp("(.{1,3})(?=(...)+(\\..{" + n + "})$)", "g"),
            "$1 "
          )),
          wn(n)(t)
        );
      },
      threespacecommadecimal: function (e, n) {
        var t;
        return (
          (t = kn(h(e)).replace(
            new RegExp("(.{1,3})(?=(...)+(\\,.{" + n + "})$)", "g"),
            "$1 "
          )),
          wn(n, ",")(t)
        );
      },
      szl: function (e, n) {
        var t;
        return (
          (t = h(e).replace(
            new RegExp("(.{1,3})(?=(...)+(\\..{" + n + "})$)", "g"),
            "$1, "
          )),
          wn(n)(t)
        );
      },
      chf: function (e, n) {
        var t;
        return (
          (t = h(e).replace(
            new RegExp("(.{1,3})(?=(...)+(\\..{" + n + "})$)", "g"),
            "$1'"
          )),
          wn(n)(t)
        );
      },
      inr: function (e, n) {
        var t;
        return (
          (t = h(e).replace(
            new RegExp("(.{1,2})(?=.(..)+(\\..{" + n + "})$)", "g"),
            "$1,"
          )),
          wn(n)(t)
        );
      },
      none: function (e) {
        return h(e);
      },
    },
    En = {
      default: { decimals: 2, format: Sn.three, minimum: 100 },
      AED: { minor: "fil", minimum: 10 },
      AFN: { minor: "pul" },
      ALL: { minor: "qindarka", minimum: 221 },
      AMD: { minor: "luma", minimum: 975 },
      ANG: { minor: "cent" },
      AOA: { minor: "lwei" },
      ARS: { format: Sn.threecommadecimal, minor: "centavo", minimum: 80 },
      AUD: { format: Sn.threespaceseparator, minimum: 50, minor: "cent" },
      AWG: { minor: "cent", minimum: 10 },
      AZN: { minor: "qÃ¤pik" },
      BAM: { minor: "fenning" },
      BBD: { minor: "cent", minimum: 10 },
      BDT: { minor: "paisa", minimum: 168 },
      BGN: { minor: "stotinki" },
      BHD: { dir: "rtl", decimals: 3, minor: "fils" },
      BIF: { decimals: 0, major: "franc", minor: "centime" },
      BMD: { minor: "cent", minimum: 10 },
      BND: { minor: "sen", minimum: 10 },
      BOB: { minor: "centavo", minimum: 14 },
      BRL: { format: Sn.threecommadecimal, minimum: 50, minor: "centavo" },
      BSD: { minor: "cent", minimum: 10 },
      BTN: { minor: "chetrum" },
      BWP: { minor: "thebe", minimum: 22 },
      BYR: { decimals: 0, major: "ruble" },
      BZD: { minor: "cent", minimum: 10 },
      CAD: { minimum: 50, minor: "cent" },
      CDF: { minor: "centime" },
      CHF: { format: Sn.chf, minimum: 50, minor: "rappen" },
      CLP: { decimals: 0, format: Sn.none, major: "peso", minor: "centavo" },
      CNY: { minor: "jiao", minimum: 14 },
      COP: { format: Sn.threecommadecimal, minor: "centavo", minimum: 1e3 },
      CRC: { format: Sn.threecommadecimal, minor: "centimo", minimum: 1e3 },
      CUC: { minor: "centavo" },
      CUP: { minor: "centavo", minimum: 53 },
      CVE: { minor: "centavo" },
      CZK: { format: Sn.threecommadecimal, minor: "haler", minimum: 46 },
      DJF: { decimals: 0, major: "franc", minor: "centime" },
      DKK: { minimum: 250, minor: "Ã¸re" },
      DOP: { minor: "centavo", minimum: 102 },
      DZD: { minor: "centime", minimum: 239 },
      EGP: { minor: "piaster", minimum: 35 },
      ERN: { minor: "cent" },
      ETB: { minor: "cent", minimum: 57 },
      EUR: { minimum: 50, minor: "cent" },
      FJD: { minor: "cent", minimum: 10 },
      FKP: { minor: "pence" },
      GBP: { minimum: 30, minor: "pence" },
      GEL: { minor: "tetri" },
      GHS: { minor: "pesewas", minimum: 3 },
      GIP: { minor: "pence", minimum: 10 },
      GMD: { minor: "butut" },
      GTQ: { minor: "centavo", minimum: 16 },
      GYD: { minor: "cent", minimum: 418 },
      HKD: { minimum: 400, minor: "cent" },
      HNL: { minor: "centavo", minimum: 49 },
      HRK: { format: Sn.threecommadecimal, minor: "lipa", minimum: 14 },
      HTG: { minor: "centime", minimum: 167 },
      HUF: { decimals: 0, format: Sn.none, major: "forint", minimum: 555 },
      IDR: { format: Sn.threecommadecimal, minor: "sen", minimum: 1e3 },
      ILS: { minor: "agorot", minimum: 10 },
      INR: { format: Sn.inr, minor: "paise" },
      IQD: { decimals: 3, minor: "fil" },
      IRR: { minor: "rials" },
      ISK: { decimals: 0, format: Sn.none, major: "krÃ³na", minor: "aurar" },
      JMD: { minor: "cent", minimum: 250 },
      JOD: { decimals: 3, minor: "fil" },
      JPY: { decimals: 0, minimum: 50, minor: "sen" },
      KES: { minor: "cent", minimum: 201 },
      KGS: { minor: "tyyn", minimum: 140 },
      KHR: { minor: "sen", minimum: 1e3 },
      KMF: { decimals: 0, major: "franc", minor: "centime" },
      KPW: { minor: "chon" },
      KRW: { decimals: 0, major: "won", minor: "chon" },
      KWD: { dir: "rtl", decimals: 3, minor: "fil" },
      KYD: { minor: "cent", minimum: 10 },
      KZT: { minor: "tiyn", minimum: 759 },
      LAK: { minor: "at", minimum: 1e3 },
      LBP: { format: Sn.threespaceseparator, minor: "piastre", minimum: 1e3 },
      LKR: { minor: "cent", minimum: 358 },
      LRD: { minor: "cent", minimum: 325 },
      LSL: { minor: "lisente", minimum: 29 },
      LTL: { format: Sn.threespacecommadecimal, minor: "centu" },
      LVL: { minor: "santim" },
      LYD: { decimals: 3, minor: "dirham" },
      MAD: { minor: "centime", minimum: 20 },
      MDL: { minor: "ban", minimum: 35 },
      MGA: { decimals: 0, major: "ariary" },
      MKD: { minor: "deni" },
      MMK: { minor: "pya", minimum: 1e3 },
      MNT: { minor: "mongo", minimum: 1e3 },
      MOP: { minor: "avo", minimum: 17 },
      MRO: { minor: "khoum" },
      MUR: { minor: "cent", minimum: 70 },
      MVR: { minor: "lari", minimum: 31 },
      MWK: { minor: "tambala", minimum: 1e3 },
      MXN: { minor: "centavo", minimum: 39 },
      MYR: { minor: "sen", minimum: 10 },
      MZN: { decimals: 0, major: "metical" },
      NAD: { minor: "cent", minimum: 29 },
      NGN: { minor: "kobo", minimum: 723 },
      NIO: { minor: "centavo", minimum: 66 },
      NOK: { format: Sn.threecommadecimal, minimum: 300, minor: "Ã¸re" },
      NPR: { minor: "paise", minimum: 221 },
      NZD: { minimum: 50, minor: "cent" },
      OMR: { dir: "rtl", minor: "baiza", decimals: 3 },
      PAB: { minor: "centesimo" },
      PEN: { minor: "centimo", minimum: 10 },
      PGK: { minor: "toea", minimum: 10 },
      PHP: { minor: "centavo", minimum: 106 },
      PKR: { minor: "paisa", minimum: 227 },
      PLN: { format: Sn.threespacecommadecimal, minor: "grosz" },
      PYG: { decimals: 0, major: "guarani", minor: "centimo" },
      QAR: { minor: "dirham", minimum: 10 },
      RON: { format: Sn.threecommadecimal, minor: "bani" },
      RUB: { format: Sn.threecommadecimal, minor: "kopeck", minimum: 130 },
      RWF: { decimals: 0, major: "franc", minor: "centime" },
      SAR: { minor: "halalat", minimum: 10 },
      SBD: { minor: "cent" },
      SCR: { minor: "cent", minimum: 28 },
      SEK: { format: Sn.threespacecommadecimal, minimum: 300, minor: "Ã¶re" },
      SGD: { minimum: 50, minor: "cent" },
      SHP: { minor: "new pence" },
      SLL: { minor: "cent", minimum: 1e3 },
      SOS: { minor: "centesimi", minimum: 1e3 },
      SRD: { minor: "cent" },
      STD: { minor: "centimo" },
      SSP: { minor: "piaster" },
      SVC: { minor: "centavo", minimum: 18 },
      SYP: { minor: "piaster" },
      SZL: { format: Sn.szl, minor: "cent", minimum: 29 },
      THB: { minor: "satang", minimum: 64 },
      TJS: { minor: "diram" },
      TMT: { minor: "tenga" },
      TND: { decimals: 3, minor: "millime" },
      TOP: { minor: "seniti" },
      TRY: { minor: "kurus" },
      TTD: { minor: "cent", minimum: 14 },
      TWD: { minor: "cent" },
      TZS: { minor: "cent", minimum: 1e3 },
      UAH: { format: Sn.threespacecommadecimal, minor: "kopiyka" },
      UGX: { minor: "cent" },
      USD: { minimum: 50, minor: "cent" },
      UYU: { format: Sn.threecommadecimal, minor: "centÃ©", minimum: 67 },
      UZS: { minor: "tiyin", minimum: 1e3 },
      VND: { format: Sn.none, minor: "hao,xu" },
      VUV: { decimals: 0, major: "vatu", minor: "centime" },
      WST: { minor: "sene" },
      XAF: { decimals: 0, major: "franc", minor: "centime" },
      XCD: { minor: "cent" },
      XPF: { decimals: 0, major: "franc", minor: "centime" },
      YER: { minor: "fil", minimum: 501 },
      ZAR: { format: Sn.threespaceseparator, minor: "cent", minimum: 29 },
      ZMK: { minor: "ngwee" },
    },
    An = function (e) {
      return En[e] ? En[e] : En.default;
    },
    Cn = [
      "AED",
      "ALL",
      "AMD",
      "ARS",
      "AUD",
      "AWG",
      "BBD",
      "BDT",
      "BHD",
      "BMD",
      "BND",
      "BOB",
      "BSD",
      "BWP",
      "BZD",
      "CAD",
      "CHF",
      "CNY",
      "COP",
      "CRC",
      "CUP",
      "CZK",
      "DKK",
      "DOP",
      "DZD",
      "EGP",
      "ETB",
      "EUR",
      "FJD",
      "GBP",
      "GHS",
      "GIP",
      "GMD",
      "GTQ",
      "GYD",
      "HKD",
      "HNL",
      "HRK",
      "HTG",
      "HUF",
      "IDR",
      "ILS",
      "INR",
      "JMD",
      "KES",
      "KGS",
      "KHR",
      "KWD",
      "KYD",
      "KZT",
      "LAK",
      "LBP",
      "LKR",
      "LRD",
      "LSL",
      "MAD",
      "MDL",
      "MKD",
      "MMK",
      "MNT",
      "MOP",
      "MUR",
      "MVR",
      "MWK",
      "MXN",
      "MYR",
      "NAD",
      "NGN",
      "NIO",
      "NOK",
      "NPR",
      "NZD",
      "OMR",
      "PEN",
      "PGK",
      "PHP",
      "PKR",
      "QAR",
      "RUB",
      "SAR",
      "SCR",
      "SEK",
      "SGD",
      "SLL",
      "SOS",
      "SSP",
      "SVC",
      "SZL",
      "THB",
      "TTD",
      "TZS",
      "USD",
      "UYU",
      "UZS",
      "YER",
      "ZAR",
    ],
    Dn = {
      AED: "Ø¯.Ø¥",
      AFN: "&#x60b;",
      ALL: "Lek",
      AMD: "Ö",
      ANG: "NAÆ’",
      AOA: "Kz",
      ARS: "ARS",
      AUD: "A$",
      AWG: "Afl.",
      AZN: "Ð¼Ð°Ð½",
      BAM: "KM",
      BBD: "Bds$",
      BDT: "à§³",
      BGN: "Ð»Ð²",
      BHD: "Ø¯.Ø¨",
      BIF: "FBu",
      BMD: "$",
      BND: "BND",
      BOB: "Bs.",
      BRL: "R$",
      BSD: "BSD",
      BTN: "Nu.",
      BWP: "P",
      BYR: "Br",
      BZD: "BZ$",
      CAD: "C$",
      CDF: "FC",
      CHF: "CHf",
      CLP: "CLP$",
      CNY: "Â¥",
      COP: "COL$",
      CRC: "â‚¡",
      CUC: "&#x20b1;",
      CUP: "$MN",
      CVE: "Esc",
      CZK: "KÄ",
      DJF: "Fdj",
      DKK: "DKK",
      DOP: "RD$",
      DZD: "Ø¯.Ø¬",
      EGP: "EÂ£",
      ERN: "Nfa",
      ETB: "á‰¥áˆ­",
      EUR: "â‚¬",
      FJD: "FJ$",
      FKP: "FK&#163;",
      GBP: "Â£",
      GEL: "áƒš",
      GHS: "&#x20b5;",
      GIP: "GIP",
      GMD: "D",
      GNF: "FG",
      GTQ: "Q",
      GYD: "G$",
      HKD: "HK$",
      HNL: "HNL",
      HRK: "kn",
      HTG: "G",
      HUF: "Ft",
      IDR: "Rp",
      ILS: "â‚ª",
      INR: "â‚¹",
      IQD: "Ø¹.Ø¯",
      IRR: "&#xfdfc;",
      ISK: "ISK",
      JMD: "J$",
      JOD: "Ø¯.Ø§",
      JPY: "&#165;",
      KES: "Ksh",
      KGS: "Ð›Ð²",
      KHR: "áŸ›",
      KMF: "CF",
      KPW: "KPW",
      KRW: "KRW",
      KWD: "Ø¯.Ùƒ",
      KYD: "CI$",
      KZT: "â‚¸",
      LAK: "â‚­",
      LBP: "&#1604;.&#1604;.",
      LD: "LD",
      LKR: "à¶»à·”",
      LRD: "L$",
      LSL: "LSL",
      LTL: "Lt",
      LVL: "Ls",
      LYD: "LYD",
      MAD: "Ø¯.Ù….",
      MDL: "MDL",
      MGA: "Ar",
      MKD: "Ð´ÐµÐ½",
      MMK: "MMK",
      MNT: "â‚®",
      MOP: "MOP$",
      MRO: "UM",
      MUR: "â‚¨",
      MVR: "Rf",
      MWK: "MK",
      MXN: "Mex$",
      MYR: "RM",
      MZN: "MT",
      NAD: "N$",
      NGN: "â‚¦",
      NIO: "NIO",
      NOK: "NOK",
      NPR: "à¤°à¥‚",
      NZD: "NZ$",
      OMR: "Ø±.Ø¹.",
      PAB: "B/.",
      PEN: "S/",
      PGK: "PGK",
      PHP: "â‚±",
      PKR: "â‚¨",
      PLN: "ZÅ‚",
      PYG: "&#x20b2;",
      QAR: "QR",
      RON: "RON",
      RSD: "Ð”Ð¸Ð½.",
      RUB: "â‚½",
      RWF: "RF",
      SAR: "SR",
      SBD: "SI$",
      SCR: "SRe",
      SDG: "&#163;Sd",
      SEK: "SEK",
      SFR: "Fr",
      SGD: "S$",
      SHP: "&#163;",
      SLL: "Le",
      SOS: "Sh.so.",
      SRD: "Sr$",
      SSP: "SSÂ£",
      STD: "Db",
      SVC: "â‚¡",
      SYP: "S&#163;",
      SZL: "E",
      THB: "à¸¿",
      TJS: "SM",
      TMT: "M",
      TND: "Ø¯.Øª",
      TOP: "T$",
      TRY: "TL",
      TTD: "TT$",
      TWD: "NT$",
      TZS: "Sh",
      UAH: "&#x20b4;",
      UGX: "USh",
      USD: "$",
      UYU: "$U",
      UZS: "so'm",
      VEF: "Bs",
      VND: "&#x20ab;",
      VUV: "VT",
      WST: "T",
      XAF: "FCFA",
      XCD: "EC$",
      XOF: "CFA",
      XPF: "CFPF",
      YER: "ï·¼",
      ZAR: "R",
      ZMK: "ZK",
      ZWL: "Z$",
    },
    Rn = function (e) {
      vn(e, function (n, t) {
        (En[t] = p.assign({}, En.default, En[t] || {})),
          (En[t].code = t),
          e[t] && (En[t].symbol = e[t]);
      });
    };
  function xn(e, n) {
    var t = An(n),
      r = e / g.pow(10, t.decimals);
    return t.format(r.toFixed(t.decimals), t.decimals);
  }
  !(function (e) {
    var n = {};
    vn(e, function (t, r) {
      (bn[r] = t),
        (En[r] = En[r] || {}),
        e[r].min_value && (En[r].minimum = e[r].min_value),
        e[r].denomination &&
          (En[r].decimals = g.LOG10E * g.log(e[r].denomination)),
        (n[r] = e[r].symbol);
    }),
      p.assign(Dn, n),
      Rn(n);
  })(bn),
    Rn(Dn),
    Cn.reduce(function (e, n) {
      return (e[n] = Dn[n]), e;
    }, {});
  var Pn = function (e, n) {
      return e ? cn(_n.preferences, e, n) : _n.preferences;
    },
    Nn = function (e) {
      return e ? _n.get(e) : _n.triggerInstanceMethod("get");
    };
  var Mn = function () {
      return Nn("amount");
    },
    In = function () {
      var e =
        un.find(function (e) {
          return Pn(e);
        }) || {};
      return (null == e ? void 0 : e.currency) || Nn("currency");
    };
  var Tn = function () {
      var e;
      return (
        (null == (e = Pn("order")) ? void 0 : e.line_items_total) &&
        Pn("features.one_click_checkout")
      );
    },
    Ln = function () {
      return Pn("invoice.order_id") || Nn("order_id");
    };
  function On() {
    return Pn("order.convenience_fee_config", null);
  }
  function Bn() {
    return f(On());
  }
  var Fn = function (e) {
      return function (n, t) {
        return arguments.length < 2
          ? function (t) {
              return e.call(null, t, n);
            }
          : e.call(null, n, t);
      };
    },
    zn = function (e) {
      return function (n, t, r) {
        return arguments.length < 3
          ? function (r) {
              return e.call(null, r, n, t);
            }
          : e.call(null, n, t, r);
      };
    };
  function Kn() {
    for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
    return function (n) {
      return function () {
        for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
        return e.every(function (e, n) {
          if (e(t[n])) return !0;
          l.dispatchEvent(
            new ft("rzp_error", {
              detail: new Error("wrong ".concat(n, "th argtype ").concat(t[n])),
            })
          );
        })
          ? n.apply(null, re([], t, !0))
          : t[0];
      };
    };
  }
  var $n = Fn(function (e, n) {
      return typeof e === n;
    }),
    jn = $n("boolean"),
    Hn = $n("number"),
    Gn = $n("string"),
    Un = $n("function"),
    Yn = $n("object"),
    Zn = d.isArray,
    Vn = $n("undefined"),
    Wn = function (e) {
      return Jn(e) && 1 === e.nodeType;
    },
    Jn = function (e) {
      return (
        !(function (e) {
          return null === e;
        })(e) && Yn(e)
      );
    },
    qn = Fn(function (e, n) {
      return e && e[n];
    }),
    Xn = qn("length"),
    Qn = qn("prototype"),
    et = Fn(function (e, n) {
      return e instanceof n;
    }),
    nt = y.now,
    tt = g.random,
    rt = g.floor,
    it = function () {
      var e = nt();
      return function () {
        return nt() - e;
      };
    };
  function ot(e, n) {
    void 0 === n && (n = "");
    var t = { description: h(e) };
    return n && (t.field = n), t;
  }
  function at(e, n) {
    return void 0 === n && (n = ""), { error: ot(e, n) };
  }
  function ut(e) {
    throw new Error(e);
  }
  var ct = function (e) {
    return /data:image\/[^;]+;base64/.test(e);
  };
  function st(e, n) {
    var t = {};
    if (!Jn(e)) return t;
    var r = null == n;
    return (
      p.keys(e).forEach(function (i) {
        var o = e[i],
          a = r ? i : "".concat(n, "[").concat(i, "]");
        if ("object" == typeof o) {
          var u = st(o, a);
          p.keys(u).forEach(function (e) {
            t[e] = u[e];
          });
        } else t[a] = o;
      }),
      t
    );
  }
  function lt(e) {
    var n = st(e);
    return p
      .keys(n)
      .map(function (e) {
        return "".concat(S(e), "=").concat(S(n[e]));
      })
      .join("&");
  }
  function mt(e, n) {
    var t = n;
    return (
      Jn(n) && (t = lt(n)),
      t &&
        ((e += (null == e ? void 0 : e.indexOf("?")) > 0 ? "&" : "?"),
        (e += t)),
      e
    );
  }
  function ft(e, n) {
    n = n || { bubbles: !1, cancelable: !1, detail: void 0 };
    var t = m.createEvent("CustomEvent");
    return t.initCustomEvent(e, n.bubbles, n.cancelable, n.detail), t;
  }
  var dt = l.Element,
    pt = function (e) {
      return m.createElement(e || "div");
    },
    ht = function (e) {
      return e.parentNode;
    },
    vt = Kn(Wn),
    yt = Kn(Wn, Wn),
    gt = Kn(Wn, Gn),
    _t = Kn(Wn, Gn, function () {
      return !0;
    }),
    bt = Kn(Wn, Jn),
    wt = Fn(
      yt(function (e, n) {
        return n.appendChild(e);
      })
    ),
    kt = Fn(
      yt(function (e, n) {
        return wt(n, e), e;
      })
    ),
    St = vt(function (e) {
      var n = ht(e);
      return n && n.removeChild(e), e;
    });
  vt(qn("selectionStart")),
    vt(qn("selectionEnd")),
    Fn(
      Kn(
        Wn,
        Hn
      )(function (e, n) {
        return (e.selectionStart = e.selectionEnd = n), e;
      })
    );
  var Et = zn(
      _t(function (e, n, t) {
        return e.setAttribute(n, t), e;
      })
    ),
    At = zn(
      _t(function (e, n, t) {
        return (e.style[n] = t), e;
      })
    ),
    Ct = Fn(
      bt(function (e, n) {
        return (
          vn(n, function (n, t) {
            return Et(e, t, n);
          }),
          e
        );
      })
    ),
    Dt = Fn(
      bt(function (e, n) {
        return (
          vn(n, function (n, t) {
            return At(e, t, n);
          }),
          e
        );
      })
    ),
    Rt = Fn(
      gt(function (e, n) {
        return (e.innerHTML = n), e;
      })
    ),
    xt = Fn(
      gt(function (e, n) {
        return At(e, "display", n);
      })
    );
  xt("none"), xt("block"), xt("inline-block");
  var Pt,
    Nt,
    Mt,
    It = qn("offsetWidth"),
    Tt = qn("offsetHeight"),
    Lt = Qn(dt),
    Ot =
      Lt.matches ||
      Lt.matchesSelector ||
      Lt.webkitMatchesSelector ||
      Lt.mozMatchesSelector ||
      Lt.msMatchesSelector ||
      Lt.oMatchesSelector,
    Bt = Fn(
      gt(function (e, n) {
        return Ot.call(e, n);
      })
    ),
    Ft = function (e, n, t, r) {
      if (!et(e, dt))
        return function (i) {
          var o = n;
          return (
            Gn(t)
              ? (o = function (e) {
                  for (var r = e.target; !Bt(r, t) && r !== i; ) r = ht(r);
                  r !== i && ((e.delegateTarget = r), n(e));
                })
              : (r = t),
            (r = !!r),
            i.addEventListener(e, o, r),
            function () {
              return i.removeEventListener(e, o, r);
            }
          );
        };
    },
    zt = P,
    Kt = at("Network error"),
    $t = 0,
    jt = !1,
    Ht = 0;
  function Gt() {
    jt && (jt = !1), Ut(0);
  }
  function Ut(e) {
    isNaN(e) || (Ht = +e);
  }
  function Yt(e) {
    return Gt(), this ? this(e) : null;
  }
  function Zt(e, n) {
    return (function (e, n, t) {
      var r;
      return n && t ? mt(e, lt((((r = {})[n] = t), r))) : e;
    })(e, "keyless_header", n);
  }
  function Vt(e) {
    if (!et(this, Vt)) return new Vt(e);
    (this.options = (function (e) {
      var n = e;
      Gn(e) && (n = { url: e });
      if (n) {
        var t = n.method,
          r = n.headers,
          i = n.callback,
          o = n.data;
        return (
          r || (n.headers = {}),
          t || (n.method = "get"),
          i ||
            (n.callback = function (e) {
              return e;
            }),
          Jn(o) && !et(o, M) && (o = lt(o)),
          (n.data = o),
          n
        );
      }
      return e;
    })(e)),
      this.defer();
  }
  var Wt = {
    options: {
      url: "",
      method: "get",
      callback: function (e) {
        return e;
      },
    },
    setReq: function (e, n) {
      return this.abort(), (this.type = e), (this.req = n), this;
    },
    till: function (e, n, t) {
      var r = this;
      if ((void 0 === n && (n = 0), void 0 === t && (t = 3e3), !jt)) {
        var i = Ht ? Ht * t : t;
        return this.setReq(
          "timeout",
          _(function () {
            r.call(function (i) {
              i.error && n > 0
                ? r.till(e, n - 1, t)
                : e(i)
                ? r.till(e, n, t)
                : r.options.callback && r.options.callback(i);
            });
          }, i)
        );
      }
      _(function () {
        r.till(e, n, t);
      }, t);
    },
    abort: function () {
      var e = this.req,
        n = this.type;
      e &&
        ("ajax" === n
          ? e.abort()
          : "jsonp" === n
          ? (l.Razorpay[e] = function (e) {
              return e;
            })
          : w(e),
        (this.req = null));
    },
    defer: function () {
      var e = this;
      this.req = _(function () {
        return e.call();
      });
    },
    call: function (e) {
      void 0 === e && (e = this.options.callback);
      var n = this.options,
        t = n.method,
        r = n.data,
        i = n.headers,
        o = void 0 === i ? {} : i,
        a = this.options.url;
      a = Zt(a, Mt);
      var u = new zt();
      this.setReq("ajax", u),
        u.open(t, a, !0),
        (u.onreadystatechange = function () {
          if (4 === u.readyState && u.status) {
            var n = yn(u.responseText);
            n ||
              ((n = at("Parsing error")).xhr = {
                status: u.status,
                text: u.responseText,
              }),
              n.error &&
                l.dispatchEvent(
                  ft("rzp_network_error", {
                    detail: {
                      method: t,
                      url: a,
                      baseUrl: null == a ? void 0 : a.split("?")[0],
                      status: u.status,
                      xhrErrored: !1,
                      response: n,
                    },
                  })
                ),
              (n.status_code = u.status),
              e(n);
          }
        }),
        (u.onerror = function () {
          var n = Kt;
          (n.xhr = { status: 0 }),
            l.dispatchEvent(
              ft("rzp_network_error", {
                detail: {
                  method: t,
                  url: a,
                  baseUrl: null == a ? void 0 : a.split("?")[0],
                  status: 0,
                  xhrErrored: !0,
                  response: n,
                },
              })
            ),
            e(n);
        }),
        Pt && (o["X-Razorpay-SessionId"] = Pt),
        Nt && (o["X-Razorpay-TrackId"] = Nt),
        vn(o, function (e, n) {
          return u.setRequestHeader(n, e);
        }),
        u.send(r);
    },
  };
  (Wt.constructor = Vt),
    (Vt.prototype = Wt),
    (Vt.post = Yt.bind(function (e) {
      return (
        (e.method = "post"),
        e.headers || (e.headers = {}),
        e.headers["Content-type"] ||
          (e.headers["Content-type"] = "application/x-www-form-urlencoded"),
        Vt(e)
      );
    })),
    (Vt.patch = Yt.bind(function (e) {
      return (
        (e.method = "PATCH"),
        e.headers || (e.headers = {}),
        e.headers["Content-type"] ||
          (e.headers["Content-type"] = "application/x-www-form-urlencoded"),
        Vt(e)
      );
    })),
    (Vt.put = Yt.bind(function (e) {
      return (
        (e.method = "put"),
        e.headers || (e.headers = {}),
        e.headers["Content-type"] ||
          (e.headers["Content-type"] = "application/x-www-form-urlencoded"),
        Vt(e)
      );
    })),
    (Vt.setSessionId = function (e) {
      Pt = e;
    }),
    (Vt.setTrackId = function (e) {
      Nt = e;
    }),
    (Vt.setKeylessHeader = function (e) {
      Mt = e;
    }),
    (Vt.jsonp = Yt.bind(function (e) {
      e.data || (e.data = {});
      var n = $t++,
        t = 0,
        r = new Vt(e);
      return (
        (e = r.options),
        (r.call = function (r) {
          void 0 === r && (r = e.callback), t++;
          var i = "jsonp".concat(n, "_").concat(t),
            o = !1,
            a = function () {
              o ||
                (this.readyState &&
                  "loaded" !== this.readyState &&
                  "complete" !== this.readyState) ||
                ((o = !0),
                (this.onload = this.onreadystatechange = null),
                St(this));
            },
            u = (l.Razorpay[i] = function (e) {
              delete e.http_status_code, r(e), delete l.Razorpay[i];
            });
          this.setReq("jsonp", u);
          var c = mt(e.url, e.data);
          c = mt((c = Zt(c, Mt)), lt({ callback: "Razorpay.".concat(i) }));
          var s = pt("script");
          p.assign(s, {
            src: c,
            async: !0,
            onerror: function () {
              return r(Kt);
            },
            onload: a,
            onreadystatechange: a,
          }),
            wt(s, m.documentElement);
        }),
        r
      );
    })),
    (Vt.pausePoll = function () {
      jt || (jt = !0);
    }),
    (Vt.resumePoll = Gt),
    (Vt.setPollDelayBy = Ut);
  var Jt = l !== l.parent,
    qt = Jt ? l.parent : l.opener,
    Xt = 3073097293,
    Qt = "production",
    er = (function () {
      function e() {}
      return (
        (e.setId = function (n) {
          (e.id = n), e.sendMessage("updateInterfaceId", n);
        }),
        (e.subscribe = function (n, t) {
          e.subscriptions[n] || (e.subscriptions[n] = []),
            e.subscriptions[n].push(t);
        }),
        (e.resetSubscriptions = function () {
          e.subscriptions = {};
        }),
        (e.publishToParent = function (n, t) {
          if ((void 0 === t && (t = {}), qt)) {
            e.source || e.updateSource();
            var r = t;
            ("object" == typeof r && r) || (r = { data: t }),
              (r.source = e.source || "reset"),
              (r.id = e.id);
            var i = JSON.stringify({
              data: r,
              topic: n,
              source: r.source,
              time: y.now(),
            });
            qt.postMessage(i, "*");
          }
        }),
        (e.updateSource = function () {
          Jt && window && window.location && (e.source = "checkout-frame");
        }),
        (e.sendMessage = function (n, t) {
          var r =
            e.iframeReference && e.iframeReference.contentWindow
              ? e.iframeReference.contentWindow
              : window;
          r &&
            r.postMessage(
              JSON.stringify({
                topic: n,
                data: { data: t, id: e.id, source: "checkoutjs" },
                time: y.now(),
                source: "checkoutjs",
                _module: "interface",
              }),
              "*"
            );
        }),
        (e.subscriptions = {}),
        e
      );
    })();
  er.updateSource(),
    Jt &&
      (er.publishToParent("ready"),
      er.subscribe("updateInterfaceId", function (e) {
        er.id = e.data;
      })),
    window.addEventListener("message", function (e) {
      var n = {};
      try {
        n = JSON.parse(e.data);
      } catch (e) {}
      var t = n || {},
        r = t.topic,
        i = t.data;
      r &&
        er.subscriptions[r] &&
        er.subscriptions[r].forEach(function (e) {
          e(i);
        });
    });
  var nr = "session_created",
    tr = "session_errored",
    rr = !1,
    ir = !1,
    or = Qt;
  try {
    if (0 === x.href.indexOf("https://api.razorpay.com/v1/checkout/public")) {
      var ar = "traffic_env=",
        ur = x.search
          .slice(1)
          .split("&")
          .filter(function (e) {
            return 0 === e.indexOf(ar);
          })[0];
      ur && (or = ur.slice(ar.length));
    }
  } catch (e) {}
  function cr(e, n) {
    var t = (function (e) {
        return e === nr
          ? ("checkout." + or + ".sessionCreated.metrics").replace(
              ".production",
              ""
            )
          : ("checkout." + or + ".sessionErrored.metrics").replace(
              ".production",
              ""
            );
      })(e),
      r = [{ name: t, labels: [{ type: e, env: or }] }];
    return n && (r[0].labels[0].severity = n), r;
  }
  function sr(e, n) {
    var t,
      r,
      i,
      o,
      a,
      u = ln(R, "sendBeacon"),
      c = {
        url: "https://lumberjack-metrics.razorpay.com/v1/frontend-metrics",
        data: {
          key: "ZmY5N2M0YzVkN2JiYzkyMWM1ZmVmYWJk",
          data:
            ((a = { metrics: cr(e, n) }),
            (o = JSON.stringify(a)),
            (i = S(o)),
            (r = C(i)),
            (t = A(r)),
            S(t)),
        },
      },
      s = Pn("merchant_key") || Nn("key") || "",
      l = e === tr;
    if (
      !((s && s.indexOf("test_") > -1) || (!s && !l)) &&
      ((!rr && e === nr) || (!ir && e === tr))
    )
      try {
        u ? R.sendBeacon(c.url, JSON.stringify(c.data)) : Vt.post(c),
          e === nr && (rr = !0),
          e === tr && (ir = !0),
          (function (e, n) {
            Jt
              ? er.publishToParent("syncAvailability", {
                  sessionCreated: e,
                  sessionErrored: n,
                })
              : er.sendMessage("syncAvailability", {
                  sessionCreated: e,
                  sessionErrored: n,
                });
          })(rr, ir);
      } catch (e) {}
  }
  er.subscribe("syncAvailability", function (e) {
    var n = e.data || {},
      t = n.sessionCreated,
      r = n.sessionErrored;
    (rr = "boolean" == typeof t ? t : rr),
      (ir = "boolean" == typeof r ? r : ir);
  });
  var lr,
    mr,
    fr,
    dr = "rzp_device_id",
    pr = 1,
    hr = "",
    vr = "",
    yr = l.screen;
  try {
    ((fr = [
      R.userAgent,
      R.language,
      new y().getTimezoneOffset(),
      R.platform,
      R.cpuClass,
      R.hardwareConcurrency,
      yr.colorDepth,
      R.deviceMemory,
      yr.width + yr.height,
      yr.width * yr.height,
      l.devicePixelRatio,
    ]),
    (lr = fr.join()),
    (mr = new l.TextEncoder("utf-8").encode(lr)),
    l.crypto.subtle.digest("SHA-1", mr).then(function (e) {
      return (hr = (function (e) {
        for (
          var n = [], t = new l.DataView(e), r = 0;
          r < t.byteLength;
          r += 4
        ) {
          var i = "00000000",
            o = (i + t.getUint32(r).toString(16)).slice(-i.length);
          n.push(o);
        }
        return n.join("");
      })(e));
    }))
      .then(function (e) {
        e &&
          ((hr = e),
          (function (e) {
            if (e) {
              try {
                vr = oe.getItem(dr);
              } catch (e) {}
              if (!vr) {
                vr = [pr, e, y.now(), g.random().toString().slice(-8)].join(
                  "."
                );
                try {
                  oe.setItem(dr, vr);
                } catch (e) {}
              }
            }
          })(e));
      })
      .catch(f);
  } catch (e) {}
  function gr() {
    var e;
    return null != (e = vr) ? e : null;
  }
  var _r = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    br = _r.split("").reduce(function (e, n, t) {
      var r;
      return X({}, e, (((r = {})[n] = t), r));
    }, {});
  function wr(e) {
    for (var n = ""; e; ) (n = _r[e % 62] + n), (e = rt(e / 62));
    return n;
  }
  function kr() {
    var e,
      n =
        wr(h(nt() - 13885344e5) + h("000000" + rt(1e6 * tt())).slice(-6)) +
        wr(rt(238328 * tt())) +
        "0",
      t = 0;
    return (
      n.split("").forEach(function (r, i) {
        (e = br[n[n.length - 1 - i]]),
          (n.length - i) % 2 && (e *= 2),
          e >= 62 && (e = (e % 62) + 1),
          (t += e);
      }),
      (e = t % 62) && (e = _r[62 - e]),
      h(n).slice(0, 13) + e
    );
  }
  var Sr = kr(),
    Er = {
      library: "checkoutjs",
      platform: "browser",
      referer: x.href,
      env: "",
    };
  function Ar(e) {
    var n,
      t = {
        checkout_id: e ? e.id : Sr,
        "device.id": null != (n = gr()) ? n : "",
      };
    return (
      [
        "device",
        "env",
        "integration",
        "library",
        "os_version",
        "os",
        "platform_version",
        "platform",
        "referer",
      ].forEach(function (e) {
        Er[e] && (t[e] = Er[e]);
      }),
      t
    );
  }
  var Cr,
    Dr,
    Rr = [],
    xr = [],
    Pr = function (e) {
      var n, t, r, i, o;
      if ((e && (Cr = e), Rr.length && "live" === Cr)) {
        Rr.forEach(function (e) {
          ("open" === e.event ||
            ("submit" === e.event && "razorpayjs" === Nr.props.library)) &&
            sr("session_created");
        });
        var a = ln(R, "sendBeacon"),
          u = {
            url: "https://lumberjack.razorpay.com/v1/track",
            data: {
              key: "ZmY5N2M0YzVkN2JiYzkyMWM1ZmVmYWJk",
              data:
                ((o = {
                  context: Dr,
                  addons: [
                    {
                      name: "ua_parser",
                      input_key: "user_agent",
                      output_key: "user_agent_parsed",
                    },
                  ],
                  events: Rr.splice(0, 5),
                }),
                (i = JSON.stringify(o)),
                (r = S(i)),
                (t = C(r)),
                (n = A(t)),
                S(n)),
            },
          };
        try {
          var c = !1;
          a && (c = R.sendBeacon(u.url, JSON.stringify(u.data))),
            c || Vt.post(u);
        } catch (e) {}
      }
    };
  function Nr(e, n, t, r) {
    e
      ? "test" !== (Cr = e.getMode()) &&
        _(function () {
          t instanceof Error && (t = { message: t.message, stack: t.stack });
          var i = Ar(e);
          (i.user_agent = null), (i.mode = "live");
          var o = Ln();
          o && (i.order_id = o);
          var a = {},
            u = { options: a };
          t && (u.data = t),
            (a = p.assign(a, pn(e.get()))),
            "function" == typeof e.get("handler") && (a.handler = !0);
          var c = e.get("callback_url");
          c && "string" == typeof c && (a.callback_url = !0),
            ln(a, "prefill") &&
              ["card"].forEach(function (e) {
                ln(a.prefill, e) && (a.prefill[e] = !0);
              }),
            a.image && ct(a.image) && (a.image = "base64");
          var s = e.get("external.wallets") || [];
          (a.external_wallets = s.reduce(function (e, n) {
            var t;
            return X({}, e, (((t = {})[n] = !0), t));
          }, {})),
            Sr && (u.local_order_id = Sr),
            (u.build_number = Xt),
            (u.experiments = ue.getExperimentsFromStorage());
          var l,
            m = Pn("experiments");
          try {
            sn(m) && (u.backendExperiments = X({}, m));
          } catch (e) {}
          (l = { event: n, properties: u, timestamp: nt() }),
            Rr.push(l),
            (Dr = i),
            r && Pr();
        })
      : xr.push([n, t, r]);
  }
  b(function () {
    Pr();
  }, 1e3),
    (Nr.dispatchPendingEvents = function (e) {
      if (e) {
        var n = Nr.bind(Nr, e);
        xr.splice(0, xr.length).forEach(function (e) {
          n.apply(Nr, e);
        });
      }
    }),
    (Nr.parseAnalyticsData = function (e) {
      Jn(e) &&
        vn(e, function (e, n) {
          Er[n] = e;
        });
    }),
    (Nr.makeUid = kr),
    (Nr.common = Ar),
    (Nr.props = Er),
    (Nr.id = Sr),
    (Nr.updateUid = function (e) {
      (Sr = e), (Nr.id = e);
    }),
    (Nr.flush = Pr);
  var Mr,
    Ir = {},
    Tr = {},
    Lr = {
      setR: function (e) {
        (Mr = e), Nr.dispatchPendingEvents(e);
      },
      track: function (e, n) {
        var t,
          r = void 0 === n ? {} : n,
          i = r.type,
          o = r.data,
          a = void 0 === o ? {} : o,
          u = r.r,
          c = void 0 === u ? Mr : u,
          s = r.immediately,
          l = void 0 !== s && s,
          m = r.isError;
        try {
          m &&
            !c &&
            (c = {
              id: Nr.id,
              getMode: function () {
                return "live";
              },
              get: function (e) {
                return "string" != typeof e && {};
              },
            });
          var f =
            ((t = dn(Ir)),
            vn(t, function (e, n) {
              Un(e) && (t[n] = e.call());
            }),
            t);
          (a = (function (e) {
            var n = hn(e || {});
            return (
              ["token"].forEach(function (e) {
                n[e] && (n[e] = "__REDACTED__");
              }),
              n
            );
          })(a)),
            (a = Jn(a) ? hn(a) : { data: a }).meta &&
              Jn(a.meta) &&
              (f = p.assign(f, a.meta)),
            (a.meta = f),
            (a.meta.request_index = c ? Tr[c.id] : null),
            i && (e = i + ":" + e),
            Nr(c, e, a, l);
        } catch (e) {}
      },
      setMeta: function (e, n) {
        Ir[e] = n;
      },
      removeMeta: function (e) {
        delete Ir[e];
      },
      getMeta: function () {
        return pn(Ir);
      },
      updateRequestIndex: function (e) {
        if (!Mr || !e) return 0;
        ln(Tr, Mr.id) || (Tr[Mr.id] = {});
        var n = Tr[Mr.id];
        return ln(n, e) || (n[e] = -1), (n[e] += 1), n[e];
      },
    },
    Or = function (e, n) {
      if (!e) return n;
      var t = {};
      return (
        p.keys(n).forEach(function (r) {
          var i = n[r];
          "__PREFIX" !== r || "__PREFIX" !== i
            ? (t[r] = e + ":" + i)
            : (t[e.toUpperCase()] = "" + e);
        }),
        t
      );
    },
    Br = Or(
      "card",
      X(
        {},
        { ADD_NEW_CARD: "add_new" },
        {
          APP_SELECT: "app:select",
          ADD_CARD_SCREEN_RENDERED: "1cc_payments_add_new_card_screen_loaded",
          SAVED_CARD_SCREEN_RENDERED: "1cc_payments_saved_card_screen_loaded",
        }
      )
    ),
    Fr = Or("saved_cards", {
      __PREFIX: "__PREFIX",
      CHECK_SAVED_CARDS: "check",
      HIDE_SAVED_CARDS: "hide",
      SHOW_SAVED_CARDS: "show",
      SKIP_SAVED_CARDS: "skip",
      EMI_PLAN_VIEW_SAVED_CARDS: "emi:plans:view",
      OTP_SUBMIT_SAVED_CARDS: "save:otp:submit",
      ACCESS_OTP_SUBMIT_SAVED_CARDS: "access:otp:submit",
      USER_CONSENT_FOR_TOKENIZATION: "user_consent_for_tokenization",
      TOKENIZATION_KNOW_MORE_MODAL: "tokenization_know_more_modal",
    }),
    zr = Or("emi", {
      VIEW_EMI_PLANS: "plans:view",
      EDIT_EMI_PLANS: "plans:edit",
      PAY_WITHOUT_EMI: "pay_without",
      VIEW_ALL_EMI_PLANS: "plans:view:all",
      SELECT_EMI_PLAN: "plan:select",
      CHOOSE_EMI_PLAN: "plan:choose",
      EMI_PLANS: "plans",
      EMI_CONTACT: "contact",
      EMI_CONTACT_FILLED: "contact:filled",
    }),
    Kr = X(
      {},
      {
        SHOW_AVS_SCREEN: "avs_screen:show",
        LOAD_AVS_FORM: "avs_screen:load_form",
        AVS_FORM_DATA_INPUT: "avs_screen:form_data_input",
        AVS_FORM_SUBMIT: "avs_screen:form_submit",
      },
      { HIDE_ADD_CARD_SCREEN: "add_cards:hide" },
      {
        SHOW_PAYPAL_RETRY_SCREEN: "paypal_retry:show",
        SHOW_PAYPAL_RETRY_ON_OTP_SCREEN: "paypal_retry:show:otp_screen",
        PAYPAL_RETRY_CANCEL_BTN_CLICK: "paypal_retry:cancel_click",
        PAYPAL_RETRY_PAYPAL_BTN_CLICK: "paypal_retry:paypal_click",
        PAYPAL_RETRY_PAYPAL_ENABLED: "paypal_retry:paypal_enabled",
      }
    );
  X({}, Br, Fr, zr, Kr);
  var $r = Or("cred", {
    ELIGIBILITY_CHECK: "eligibility_check",
    SUBTEXT_OFFER_EXPERIMENT: "subtext_offer_experiment",
    EXPERIMENT_OFFER_SELECTED: "experiment_offer_selected",
  });
  Or("offer", X({}, { APPLY: "apply" }));
  Or(
    "p13n",
    X(
      {},
      {
        INSTRUMENTS_SHOWN: "instruments_shown",
        INSTRUMENTS_LIST: "instruments:list",
      }
    )
  );
  Or(
    "home",
    X(
      {},
      {
        HOME_LOADED: "checkoutHomeScreenLoaded",
        HOME_LOADED_V2: "1cc_payment_home_screen_loaded",
        PAYMENT_INSTRUMENT_SELECTED: "checkoutPaymentInstrumentSelected",
        PAYMENT_INSTRUMENT_SELECTED_V2:
          "1cc_payment_home_screen_instrument_selected",
        PAYMENT_METHOD_SELECTED: "checkoutPaymentMethodSelected",
        PAYMENT_METHOD_SELECTED_V2: "1cc_payment_home_screen_method_selected",
        METHODS_SHOWN: "methods:shown",
        METHODS_HIDE: "methods:hide",
        P13N_EXPERIMENT: "p13n:experiment",
        LANDING: "landing",
        PROCEED: "proceed",
        CONTACT_SCREEN_LOAD: "complete:contact_details",
      }
    )
  );
  Or("order", X({}, { INVALID_TPV: "invalid_tpv" }));
  var jr = "automatic_checkout_open",
    Hr = "automatic_checkout_click",
    Gr = "intl_missing";
  Or(
    "downtime",
    X(
      {},
      {
        ALERT_SHOW: "alert:show",
        CALLOUT_SHOW: "callout:show",
        DOWNTIME_ALERTSHOW: "alert:show",
      }
    )
  );
  var Ur = "js_error",
    Yr = (function () {
      var e = {};
      return (
        p.keys(ne).forEach(function (n) {
          var t = ne[n],
            r = "Track" + t.charAt(0).toUpperCase() + t.slice(1);
          e[r] = function (e, n) {
            Lr.track(e, { type: t, data: n });
          };
        }),
        (e.Track = function (e, n) {
          Lr.track(e, { data: n });
        }),
        e
      );
    })();
  function Zr(e) {
    return e;
  }
  function Vr() {
    return (this._evts = {}), (this._defs = {}), this;
  }
  function Wr(e, n, t, r, i, o, a) {
    try {
      var u = e[o](a),
        c = u.value;
    } catch (e) {
      return void t(e);
    }
    u.done ? n(c) : Promise.resolve(c).then(r, i);
  }
  (Yr = (function (e) {
    return X({}, e, {
      setMeta: Lr.setMeta,
      removeMeta: Lr.removeMeta,
      updateRequestIndex: Lr.updateRequestIndex,
      setR: Lr.setR,
    });
  })(Yr)),
    (Vr.prototype = {
      onNew: Zr,
      def: function (e, n) {
        this._defs[e] = n;
      },
      on: function (e, n) {
        if (Gn(e) && Un(n)) {
          var t = this._evts;
          t[e] || (t[e] = []), !1 !== this.onNew(e, n) && t[e].push(n);
        }
        return this;
      },
      once: function (e, n) {
        var t = n,
          r = this;
        return (
          (n = function n() {
            t.apply(r, arguments), r.off(e, n);
          }),
          this.on(e, n)
        );
      },
      off: function (e, n) {
        var t = arguments.length;
        if (!t) return Vr.call(this);
        var r = this._evts;
        if (2 === t) {
          var i = r[e];
          if (!Un(n) || !Zn(i)) return;
          if ((i.splice(i.indexOf(n), 1), i.length)) return;
        }
        return (
          r[e]
            ? delete r[e]
            : ((e += "."),
              vn(r, function (n, t) {
                t.indexOf(e) || delete r[t];
              })),
          this
        );
      },
      emit: function (e, n) {
        var t = this;
        return (
          (this._evts[e] || []).forEach(function (e) {
            try {
              e.call(t, n);
            } catch (e) {
              console.error;
            }
          }),
          this
        );
      },
      emitter: function () {
        var e = arguments,
          n = this;
        return function () {
          n.emit.apply(n, e);
        };
      },
    });
  var Jr,
    qr,
    Xr =
      ((Jr = function (e) {
        var n = (function (e) {
          var n,
            t = p.prototype,
            r = t.hasOwnProperty,
            i = "function" == typeof Symbol ? Symbol : {},
            o = i.iterator || "@@iterator",
            a = i.asyncIterator || "@@asyncIterator",
            u = i.toStringTag || "@@toStringTag";
          function c(e, n, t) {
            return (
              p.defineProperty(e, n, {
                value: t,
                enumerable: !0,
                configurable: !0,
                writable: !0,
              }),
              e[n]
            );
          }
          try {
            c({}, "");
          } catch (e) {
            c = function (e, n, t) {
              return (e[n] = t);
            };
          }
          function s(e, n, t, r) {
            var i = n && n.prototype instanceof y ? n : y,
              o = p.create(i.prototype),
              a = new P(r || []);
            return (
              (o._invoke = (function (e, n, t) {
                var r = m;
                return function (i, o) {
                  if (r === d) throw new Error("Generator is already running");
                  if (r === h) {
                    if ("throw" === i) throw o;
                    return M();
                  }
                  for (t.method = i, t.arg = o; ; ) {
                    var a = t.delegate;
                    if (a) {
                      var u = C(a, t);
                      if (u) {
                        if (u === v) continue;
                        return u;
                      }
                    }
                    if ("next" === t.method) t.sent = t._sent = t.arg;
                    else if ("throw" === t.method) {
                      if (r === m) throw ((r = h), t.arg);
                      t.dispatchException(t.arg);
                    } else "return" === t.method && t.abrupt("return", t.arg);
                    r = d;
                    var c = l(e, n, t);
                    if ("normal" === c.type) {
                      if (((r = t.done ? h : f), c.arg === v)) continue;
                      return { value: c.arg, done: t.done };
                    }
                    "throw" === c.type &&
                      ((r = h), (t.method = "throw"), (t.arg = c.arg));
                  }
                };
              })(e, t, a)),
              o
            );
          }
          function l(e, n, t) {
            try {
              return { type: "normal", arg: e.call(n, t) };
            } catch (e) {
              return { type: "throw", arg: e };
            }
          }
          e.wrap = s;
          var m = "suspendedStart",
            f = "suspendedYield",
            d = "executing",
            h = "completed",
            v = {};
          function y() {}
          function g() {}
          function _() {}
          var b = {};
          b[o] = function () {
            return this;
          };
          var w = p.getPrototypeOf,
            k = w && w(w(N([])));
          k && k !== t && r.call(k, o) && (b = k);
          var S = (_.prototype = y.prototype = p.create(b));
          function E(e) {
            ["next", "throw", "return"].forEach(function (n) {
              c(e, n, function (e) {
                return this._invoke(n, e);
              });
            });
          }
          function A(e, n) {
            function t(i, o, a, u) {
              var c = l(e[i], e, o);
              if ("throw" !== c.type) {
                var s = c.arg,
                  m = s.value;
                return m && "object" == typeof m && r.call(m, "__await")
                  ? n.resolve(m.__await).then(
                      function (e) {
                        t("next", e, a, u);
                      },
                      function (e) {
                        t("throw", e, a, u);
                      }
                    )
                  : n.resolve(m).then(
                      function (e) {
                        (s.value = e), a(s);
                      },
                      function (e) {
                        return t("throw", e, a, u);
                      }
                    );
              }
              u(c.arg);
            }
            var i;
            this._invoke = function (e, r) {
              function o() {
                return new n(function (n, i) {
                  t(e, r, n, i);
                });
              }
              return (i = i ? i.then(o, o) : o());
            };
          }
          function C(e, t) {
            var r = e.iterator[t.method];
            if (r === n) {
              if (((t.delegate = null), "throw" === t.method)) {
                if (
                  e.iterator.return &&
                  ((t.method = "return"),
                  (t.arg = n),
                  C(e, t),
                  "throw" === t.method)
                )
                  return v;
                (t.method = "throw"),
                  (t.arg = new D(
                    "The iterator does not provide a 'throw' method"
                  ));
              }
              return v;
            }
            var i = l(r, e.iterator, t.arg);
            if ("throw" === i.type)
              return (
                (t.method = "throw"), (t.arg = i.arg), (t.delegate = null), v
              );
            var o = i.arg;
            return o
              ? o.done
                ? ((t[e.resultName] = o.value),
                  (t.next = e.nextLoc),
                  "return" !== t.method && ((t.method = "next"), (t.arg = n)),
                  (t.delegate = null),
                  v)
                : o
              : ((t.method = "throw"),
                (t.arg = new D("iterator result is not an object")),
                (t.delegate = null),
                v);
          }
          function R(e) {
            var n = { tryLoc: e[0] };
            1 in e && (n.catchLoc = e[1]),
              2 in e && ((n.finallyLoc = e[2]), (n.afterLoc = e[3])),
              this.tryEntries.push(n);
          }
          function x(e) {
            var n = e.completion || {};
            (n.type = "normal"), delete n.arg, (e.completion = n);
          }
          function P(e) {
            (this.tryEntries = [{ tryLoc: "root" }]),
              e.forEach(R, this),
              this.reset(!0);
          }
          function N(e) {
            if (e) {
              var t = e[o];
              if (t) return t.call(e);
              if ("function" == typeof e.next) return e;
              if (!isNaN(e.length)) {
                var i = -1,
                  a = function t() {
                    for (; ++i < e.length; )
                      if (r.call(e, i))
                        return (t.value = e[i]), (t.done = !1), t;
                    return (t.value = n), (t.done = !0), t;
                  };
                return (a.next = a);
              }
            }
            return { next: M };
          }
          function M() {
            return { value: n, done: !0 };
          }
          return (
            (g.prototype = S.constructor = _),
            (_.constructor = g),
            (g.displayName = c(_, u, "GeneratorFunction")),
            (e.isGeneratorFunction = function (e) {
              var n = "function" == typeof e && e.constructor;
              return (
                !!n &&
                (n === g || "GeneratorFunction" === (n.displayName || n.name))
              );
            }),
            (e.mark = function (e) {
              return (
                p.setPrototypeOf
                  ? p.setPrototypeOf(e, _)
                  : ((e.__proto__ = _), c(e, u, "GeneratorFunction")),
                (e.prototype = p.create(S)),
                e
              );
            }),
            (e.awrap = function (e) {
              return { __await: e };
            }),
            E(A.prototype),
            (A.prototype[a] = function () {
              return this;
            }),
            (e.AsyncIterator = A),
            (e.async = function (n, t, r, i, o) {
              void 0 === o && (o = Promise);
              var a = new A(s(n, t, r, i), o);
              return e.isGeneratorFunction(t)
                ? a
                : a.next().then(function (e) {
                    return e.done ? e.value : a.next();
                  });
            }),
            E(S),
            c(S, u, "Generator"),
            (S[o] = function () {
              return this;
            }),
            (S.toString = function () {
              return "[object Generator]";
            }),
            (e.keys = function (e) {
              var n = [];
              for (var t in e) n.push(t);
              return (
                n.reverse(),
                function t() {
                  for (; n.length; ) {
                    var r = n.pop();
                    if (r in e) return (t.value = r), (t.done = !1), t;
                  }
                  return (t.done = !0), t;
                }
              );
            }),
            (e.values = N),
            (P.prototype = {
              constructor: P,
              reset: function (e) {
                if (
                  ((this.prev = 0),
                  (this.next = 0),
                  (this.sent = this._sent = n),
                  (this.done = !1),
                  (this.delegate = null),
                  (this.method = "next"),
                  (this.arg = n),
                  this.tryEntries.forEach(x),
                  !e)
                )
                  for (var t in this)
                    "t" === t.charAt(0) &&
                      r.call(this, t) &&
                      !isNaN(+t.slice(1)) &&
                      (this[t] = n);
              },
              stop: function () {
                this.done = !0;
                var e = this.tryEntries[0].completion;
                if ("throw" === e.type) throw e.arg;
                return this.rval;
              },
              dispatchException: function (e) {
                if (this.done) throw e;
                var t = this;
                function i(r, i) {
                  return (
                    (u.type = "throw"),
                    (u.arg = e),
                    (t.next = r),
                    i && ((t.method = "next"), (t.arg = n)),
                    !!i
                  );
                }
                for (var o = this.tryEntries.length - 1; o >= 0; --o) {
                  var a = this.tryEntries[o],
                    u = a.completion;
                  if ("root" === a.tryLoc) return i("end");
                  if (a.tryLoc <= this.prev) {
                    var c = r.call(a, "catchLoc"),
                      s = r.call(a, "finallyLoc");
                    if (c && s) {
                      if (this.prev < a.catchLoc) return i(a.catchLoc, !0);
                      if (this.prev < a.finallyLoc) return i(a.finallyLoc);
                    } else if (c) {
                      if (this.prev < a.catchLoc) return i(a.catchLoc, !0);
                    } else {
                      if (!s)
                        throw new Error(
                          "try statement without catch or finally"
                        );
                      if (this.prev < a.finallyLoc) return i(a.finallyLoc);
                    }
                  }
                }
              },
              abrupt: function (e, n) {
                for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                  var i = this.tryEntries[t];
                  if (
                    i.tryLoc <= this.prev &&
                    r.call(i, "finallyLoc") &&
                    this.prev < i.finallyLoc
                  ) {
                    var o = i;
                    break;
                  }
                }
                o &&
                  ("break" === e || "continue" === e) &&
                  o.tryLoc <= n &&
                  n <= o.finallyLoc &&
                  (o = null);
                var a = o ? o.completion : {};
                return (
                  (a.type = e),
                  (a.arg = n),
                  o
                    ? ((this.method = "next"), (this.next = o.finallyLoc), v)
                    : this.complete(a)
                );
              },
              complete: function (e, n) {
                if ("throw" === e.type) throw e.arg;
                return (
                  "break" === e.type || "continue" === e.type
                    ? (this.next = e.arg)
                    : "return" === e.type
                    ? ((this.rval = this.arg = e.arg),
                      (this.method = "return"),
                      (this.next = "end"))
                    : "normal" === e.type && n && (this.next = n),
                  v
                );
              },
              finish: function (e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var t = this.tryEntries[n];
                  if (t.finallyLoc === e)
                    return this.complete(t.completion, t.afterLoc), x(t), v;
                }
              },
              catch: function (e) {
                for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                  var t = this.tryEntries[n];
                  if (t.tryLoc === e) {
                    var r = t.completion;
                    if ("throw" === r.type) {
                      var i = r.arg;
                      x(t);
                    }
                    return i;
                  }
                }
                throw new Error("illegal catch attempt");
              },
              delegateYield: function (e, t, r) {
                return (
                  (this.delegate = {
                    iterator: N(e),
                    resultName: t,
                    nextLoc: r,
                  }),
                  "next" === this.method && (this.arg = n),
                  v
                );
              },
            }),
            e
          );
        })(e.exports);
        try {
          regeneratorRuntime = n;
        } catch (e) {
          Function("r", "regeneratorRuntime = r")(n);
        }
      }),
      Jr((qr = { exports: {} }), qr.exports),
      qr.exports),
    Qr = Xr,
    ei = R.userAgent,
    ni = R.vendor;
  function ti(e) {
    return e.test(ei);
  }
  function ri(e) {
    return e.test(ni);
  }
  var ii = ti(/MSIE |Trident\//),
    oi = ti(/iPhone/),
    ai = oi || ti(/iPad/),
    ui = ti(/Android/),
    ci = ti(/iPad/),
    si = ti(/Windows NT/),
    li = ti(/Linux/),
    mi = ti(/Mac OS/);
  ti(/^((?!chrome|android).)*safari/i) || ri(/Apple/),
    ti(/firefox/),
    ti(/Chrome/) && ri(/Google Inc/),
    ti(/; wv\) |Gecko\) Version\/[^ ]+ Chrome/),
    ti(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/);
  var fi = ti(/Instagram/);
  ti(/SamsungBrowser/);
  var di = ti(/FB_IAB/),
    pi = ti(/FBAN/),
    hi = di || pi;
  var vi =
    ti(
      /; wv\) |Gecko\) Version\/[^ ]+ Chrome|Windows Phone|Opera Mini|UCBrowser|CriOS/
    ) ||
    hi ||
    fi ||
    ai ||
    ti(/Android 4/);
  ti(/iPhone/), ei.match(/Chrome\/(\d+)/);
  var yi = (function () {
    var e = (function (e) {
      return function () {
        var n = this,
          t = arguments;
        return new Promise(function (r, i) {
          var o = e.apply(n, t);
          function a(e) {
            Wr(o, r, i, a, u, "next", e);
          }
          function u(e) {
            Wr(o, r, i, a, u, "throw", e);
          }
          a(void 0);
        });
      };
    })(
      Qr.mark(function e() {
        return Qr.wrap(
          function (e) {
            for (;;)
              switch ((e.prev = e.next)) {
                case 0:
                  if (!R.brave) {
                    e.next = 10;
                    break;
                  }
                  return (e.prev = 1), (e.next = 4), R.brave.isBrave();
                case 4:
                  return e.abrupt("return", e.sent);
                case 7:
                  return (
                    (e.prev = 7), (e.t0 = e.catch(1)), e.abrupt("return", !1)
                  );
                case 10:
                  return e.abrupt("return", !1);
                case 11:
                case "end":
                  return e.stop();
              }
          },
          e,
          null,
          [[1, 7]]
        );
      })
    );
    return function () {
      return e.apply(this, arguments);
    };
  })();
  ti(/(Vivo|HeyTap|Realme|Oppo)Browser/);
  var gi = function () {
      return oi
        ? "iPhone"
        : ci
        ? "iPad"
        : ui
        ? "android"
        : (function () {
            var e;
            return (
              !l.matchMedia ||
              (null ==
              (e = l.matchMedia(
                "(max-device-height: 485px),(max-device-width: 485px)"
              ))
                ? void 0
                : e.matches)
            );
          })()
        ? "mobile"
        : "desktop";
    },
    _i = {
      key: "",
      account_id: "",
      image: "",
      amount: 100,
      currency: "INR",
      order_id: "",
      invoice_id: "",
      subscription_id: "",
      auth_link_id: "",
      payment_link_id: "",
      notes: null,
      disable_redesign_v15: null,
      callback_url: "",
      redirect: !1,
      description: "",
      customer_id: "",
      recurring: null,
      payout: null,
      contact_id: "",
      signature: "",
      retry: !0,
      target: "",
      subscription_card_change: null,
      display_currency: "",
      display_amount: "",
      recurring_token: { max_amount: 0, expire_by: 0 },
      checkout_config_id: "",
      send_sms_hash: !1,
      show_address: !0,
      show_coupons: !0,
      mandatory_login: !1,
      enable_ga_analytics: !1,
      enable_fb_analytics: !1,
      customer_cart: {},
      disable_emi_ux: null,
    };
  function bi(e, n, t, r) {
    var i = n[(t = t.toLowerCase())],
      o = typeof i;
    "object" === o && null === i
      ? Gn(r) &&
        ("true" === r || "1" === r
          ? (r = !0)
          : ("false" !== r && "0" !== r) || (r = !1))
      : "string" === o && (Hn(r) || jn(r))
      ? (r = h(r))
      : "number" === o
      ? (r = v(r))
      : "boolean" === o &&
        (Gn(r)
          ? "true" === r || "1" === r
            ? (r = !0)
            : ("false" !== r && "0" !== r) || (r = !1)
          : Hn(r) && (r = !!r)),
      (null !== i && o !== typeof r) || (e[t] = r);
  }
  function wi(e, n, t) {
    vn(e[n], function (r, i) {
      var o = typeof r;
      ("string" !== o && "number" !== o && "boolean" !== o) ||
        ((i = n + t[0] + i), t.length > 1 && (i += t[1]), (e[i] = r));
    }),
      delete e[n];
  }
  function ki(e, n) {
    var t = {};
    return (
      vn(e, function (e, r) {
        r in Si
          ? vn(e, function (e, i) {
              bi(t, n, r + "." + i, e);
            })
          : bi(t, n, r, e);
      }),
      t
    );
  }
  var Si = {};
  function Ei(e) {
    (e = (function (e) {
      return (
        "object" == typeof e.retry &&
          "boolean" == typeof e.retry.enabled &&
          (e.retry = e.retry.enabled),
        e
      );
    })(e)),
      vn(_i, function (e, n) {
        Jn(e) &&
          !(function (e) {
            return !Xn(p.keys(e));
          })(e) &&
          ((Si[n] = !0),
          vn(e, function (e, t) {
            _i[n + "." + t] = e;
          }),
          delete _i[n]);
      }),
      (e = ki(e, _i)).callback_url && vi && (e.redirect = !0),
      (this.get = function (n) {
        return arguments.length ? (n in e ? e[n] : _i[n]) : e;
      }),
      (this.set = function (n, t) {
        e[n] = t;
      }),
      (this.unset = function (n) {
        delete e[n];
      });
  }
  var Ai,
    Ci = "com.google.android.apps.nbu.paisa.user",
    Di = function (e, n) {
      void 0 === n && (n = {});
      var t = hn(e);
      t.default_dcc_currency && delete t.default_dcc_currency,
        n.feesRedirect && (t.view = "html"),
        [
          "amount",
          "currency",
          "signature",
          "description",
          "order_id",
          "account_id",
          "notes",
          "subscription_id",
          "auth_link_id",
          "payment_link_id",
          "customer_id",
          "recurring",
          "subscription_card_change",
          "recurring_token.max_amount",
          "recurring_token.expire_by",
        ].forEach(function (e) {
          if (!t.hasOwnProperty(e)) {
            var n = "order_id" === e ? Ln() : Nn(e);
            n &&
              ("boolean" == typeof n && (n = 1),
              (t[e.replace(/\.(\w+)/g, "[$1]")] = n));
          }
        });
      var r = Nn("key");
      !t.key_id && r && (t.key_id = r),
        n.avoidPopup &&
          "wallet" === t.method &&
          (t["_[source]"] = "checkoutjs"),
        (n.tez || n.gpay) &&
          ((t["_[flow]"] = "intent"), t["_[app]"] || (t["_[app]"] = Ci));
      [
        "integration",
        "integration_version",
        "integration_parent_version",
      ].forEach(function (e) {
        var n = Nn("_." + e);
        n && (t["_[" + e + "]"] = n);
      });
      var i,
        o = null != (i = hr) ? i : null;
      o && (t["_[shield][fhash]"] = o);
      var a = gr();
      a && (t["_[device_id]"] = a),
        (t["_[shield][tz]"] = -new y().getTimezoneOffset()),
        (t["_[build]"] = Xt),
        wi(t, "notes", "[]"),
        wi(t, "card", "[]");
      var u = t["card[expiry]"];
      return (
        Gn(u) &&
          ((t["card[expiry_month]"] = u.slice(0, 2)),
          (t["card[expiry_year]"] = u.slice(-2)),
          delete t["card[expiry]"]),
        (t._ = Nr.common()),
        wi(t, "_", "[]"),
        t
      );
    },
    Ri = "avoidPopup",
    xi = "forceIframeFlow",
    Pi = "onlyPhoneRequired",
    Ni = "forcePopupCustomCheckout",
    Mi = "disableWalletAmountCheck";
  ((Ai = {})[xi] = !0), (Ai[Pi] = !0), (Ai[Ni] = !0);
  var Ii = {
    api: "https://api.razorpay.com/",
    version: "v1/",
    frameApi: "/",
    cdn: "https://cdn.razorpay.com/",
  };
  try {
    p.assign(Ii, l.Razorpay.config);
  } catch (e) {}
  function Ti(e) {
    var n = e.doc,
      t = void 0 === n ? window.document : n,
      r = e.url,
      i = e.method,
      o = void 0 === i ? "post" : i,
      a = e.target,
      u = e.params,
      c = void 0 === u ? {} : u;
    if (((c = Fi(c)), o && "get" === o.toLowerCase())) {
      var s = Bi(r, c || "");
      a
        ? window.open(s, a)
        : t !== window.document
        ? t.location.assign(s)
        : window.location.assign(s);
    } else {
      var l = t.createElement("form");
      (l.method = o),
        (l.action = r),
        a && (l.target = a),
        Li({ doc: t, form: l, data: c }),
        t.body.appendChild(l),
        l.submit();
    }
  }
  function Li(e) {
    var n = e.doc,
      t = void 0 === n ? window.document : n,
      r = e.form,
      i = e.data;
    if (sn(i))
      for (var o in i)
        if (i.hasOwnProperty(o)) {
          var a = Oi({ doc: t, name: o, value: i[o] });
          r.appendChild(a);
        }
  }
  function Oi(e) {
    var n = e.doc,
      t = void 0 === n ? window.document : n,
      r = e.name,
      i = e.value,
      o = t.createElement("input");
    return (o.type = "hidden"), (o.name = r), (o.value = i), o;
  }
  function Bi(e, n) {
    return (
      "object" == typeof n &&
        null !== n &&
        (n = (function (e) {
          sn(e) || (e = {});
          var n = [];
          for (var t in e) e.hasOwnProperty(t) && n.push(S(t) + "=" + S(e[t]));
          return n.join("&");
        })(n)),
      n && ((e += e.indexOf("?") > 0 ? "&" : "?"), (e += n)),
      e
    );
  }
  function Fi(e) {
    var n = e;
    sn(n) || (n = {});
    var t = {};
    if (0 === p.keys(n).length) return {};
    return (
      (function e(n, r) {
        if (p(n) !== n) t[r] = n;
        else if (d.isArray(n)) {
          for (var i = n.length, o = 0; o < i; o++) e(n[o], r + "[" + o + "]");
          0 === i && (t[r] = []);
        } else {
          var a = !0;
          for (var u in n) (a = !1), e(n[u], r ? r + "[" + u + "]" : u);
          a && r && (t[r] = {});
        }
      })(n, ""),
      t
    );
  }
  function zi(e, n) {
    return (
      void 0 === e && (e = ""),
      void 0 === n && (n = !0),
      ["checkoutjs", "hosted"].includes(Nr.props.library) &&
      l.session_token &&
      n
        ? (function (e, n) {
            return (
              void 0 === e && (e = ""),
              Bi(Ii.api + Ii.version + "standard_checkout/" + e, {
                session_token: n,
              })
            );
          })(e, l.session_token)
        : Ii.api + Ii.version + e
    );
  }
  var Ki = [
    "key",
    "order_id",
    "invoice_id",
    "subscription_id",
    "auth_link_id",
    "payment_link_id",
    "contact_id",
    "checkout_config_id",
  ];
  function $i(e, n) {
    n = zi(n);
    for (var t = 0; t < Ki.length; t++) {
      var r = Ki[t],
        i = Nn(r);
      if (((r = "key" === r ? "key_id" : "x_entity_id"), i)) {
        var o = Nn("account_id");
        return (
          o && (i += "&account_id=" + o),
          n + (n.indexOf("?") >= 0 ? "&" : "?") + r + "=" + i
        );
      }
    }
    return n;
  }
  var ji = "add-card",
    Hi = rn({});
  rn({}), rn("");
  var Gi = rn("");
  function Ui(e, n) {
    return (function (e, n) {
      var t,
        r = On(),
        i = null == r || null == (t = r.methods) ? void 0 : t[e];
      if (i && p.keys(i).length > 0)
        if (n) {
          var o,
            a =
              p.keys(i).includes("type") &&
              null != i &&
              null != (o = i.type) &&
              o[n]
                ? d.isArray(i.type[n])
                  ? void 0
                  : i.type[n].amount
                  ? i.type[n].amount
                  : null == i
                  ? void 0
                  : i.amount
                : null == i
                ? void 0
                : i.amount;
          a
            ? Hi.update(function (e) {
                var n;
                return p.assign(
                  {},
                  e,
                  (((n = {}).convenience_fee = a),
                  (n.checkout_label = null == r ? void 0 : r.label_on_checkout),
                  n)
                );
              })
            : Hi.update(function (e) {
                var n;
                return p.assign(
                  {},
                  e,
                  (((n = {}).checkout_label =
                    null == r ? void 0 : r.label_on_checkout),
                  n)
                );
              });
        } else {
          var u = null == i ? void 0 : i.amount;
          u
            ? Hi.update(function (e) {
                var n;
                return p.assign(
                  {},
                  e,
                  (((n = {}).convenience_fee = u),
                  (n.checkout_label = null == r ? void 0 : r.label_on_checkout),
                  n)
                );
              })
            : Hi.update(function (e) {
                var n;
                return p.assign(
                  {},
                  e,
                  (((n = {}).checkout_label =
                    null == r ? void 0 : r.label_on_checkout),
                  n)
                );
              });
        }
      else
        Hi.update(function (e) {
          var n;
          return p.assign(
            {},
            e,
            (((n = {}).checkout_label =
              null == r ? void 0 : r.label_on_checkout),
            n)
          );
        });
    })(e, n);
  }
  var Yi = function () {
      return Ce(Gi) === ji;
    },
    Zi = function (e, n) {
      var t = { tags: n };
      switch (!0) {
        case !e:
          t.message = "NA";
          break;
        case "string" == typeof e:
          t.message = e;
          break;
        case "object" == typeof e:
          var r = e.name,
            i = e.message,
            o = e.stack,
            a = e.fileName,
            u = e.lineNumber,
            c = e.columnNumber;
          t = X({}, JSON.parse(JSON.stringify(e)), {
            name: r,
            message: i,
            stack: o,
            fileName: a,
            lineNumber: u,
            columnNumber: c,
            tags: n,
          });
          break;
        default:
          t.message = JSON.stringify(e);
      }
      return t;
    },
    Vi = "S0",
    Wi = "S1",
    Ji = "S3",
    qi = {
      amex: "American Express",
      diners: "Diners Club",
      maestro: "Maestro",
      mastercard: "MasterCard",
      rupay: "RuPay",
      visa: "Visa",
      bajaj: "Bajaj Finserv",
      unknown: "unknown",
    },
    Xi = function (e) {
      return e.replace(/\D/g, "");
    },
    Qi = function (e) {
      return Xi(e).slice(0, 6);
    },
    eo = [
      { name: "visa", regex: /^4/ },
      { name: "mastercard", regex: /^(5[1-5]|2[2-7])/ },
      { name: "maestro16", regex: /^(50(81(25|26|59|92)|8227)|4(437|681))/ },
      { name: "amex", regex: /^3[47]/ },
      { name: "rupay", regex: /^787878/ },
      {
        name: "rupay",
        regex:
          /^(508[5-9]|60(80(0|)[^0]|8[1-4]|8500|698[5-9]|699|7[^9]|79[0-7]|798[0-4])|65(2(1[5-9]|[2-9])|30|31[0-4])|817[2-9]|81[89]|820[01])/,
      },
      { name: "discover", regex: /^(65[1,3-9]|6011)/ },
      { name: "maestro", regex: /^(6|5(0|[6-9])).{5}/ },
      { name: "diners", regex: /^3[0689]/ },
      { name: "jcb", regex: /^35/ },
      { name: "bajaj", regex: /^203040/ },
    ],
    no = function (e) {
      void 0 === e && (e = ""), (e = (e || "").replace(/\D/g, ""));
      var n = "";
      return (
        eo.forEach(function (t) {
          t.regex.test(e) && (n || (n = t.name));
        }),
        n
      );
    },
    to = { iin: {}, token: {} };
  function ro(e, n) {
    void 0 === n && (n = {}), (e = Qi(e)), to.iin[e] || (to.iin[e] = {});
    var t,
      r,
      i = to.iin[e];
    n.issuer && (i.issuer = n.issuer),
      n.network
        ? (i.network =
            ((t = n.network),
            vn(qi, function (e, n) {
              (t !== e && t !== n) || (r = n);
            }),
            r))
        : (i.network = no(e)),
      n.type && (i.type = n.type);
  }
  var io = { iin: {} },
    oo = { iin: {} };
  function ao(e) {
    if (
      !(function (e) {
        var n = Qi(e);
        return n && n.length >= 6;
      })(e)
    )
      return Promise.resolve({});
    var n = Qi(e),
      t = oo.iin[n];
    if (t) {
      var r;
      if (Bn() && Yi())
        if (io.iin[n]) Ui("card", null == (r = io.iin[n]) ? void 0 : r.type);
      return t;
    }
    return (
      (oo.iin[n] = new Promise(function (e, t) {
        var r = $i(0, "payment/iin");
        (r = mt(r, { iin: n, "_[source]": Nr.props.library })),
          Vt.jsonp({
            url: r,
            callback: function (r) {
              if (r.error)
                return (
                  Lr.track("features:card:fetch:failure", {
                    data: { iin: n, error: r.error },
                  }),
                  t(r.error)
                );
              if (((io.iin[n] = r), ro(n, r), Bn() && Yi())) {
                var i, o;
                if (io.iin[n]) i = null == (o = io.iin[n]) ? void 0 : o.type;
                else i = null == r ? void 0 : r.type;
                Ui("card", i);
              }
              e(r),
                Lr.track("features:card:fetch:success", {
                  data: { iin: n, features: r },
                });
            },
          }),
          Lr.track("features:card:fetch:start", { data: { iin: n } });
      })),
      oo.iin[n]
    );
  }
  var uo,
    co = Ii.cdn + "bank/",
    so = function (e) {
      return "" + co + e.slice(0, 4) + ".gif";
    };
  (uo = {
    ICIC_C: "ICICI Corporate",
    UTIB_C: "Axis Corporate",
    SBIN: "SBI",
    HDFC: "HDFC",
    ICIC: "ICICI",
    UTIB: "Axis",
    KKBK: "Kotak",
    YESB: "Yes",
    IBKL: "IDBI",
    BARB_R: "BOB",
    PUNB_R: "PNB",
    IOBA: "IOB",
    FDRL: "Federal",
    CORP: "Corporate",
    IDFB: "IDFC",
    INDB: "IndusInd",
    VIJB: "Vijaya Bank",
    BARB: "BOB",
    RATN: "RBL",
  }),
    p.entries(uo).map(function (e) {
      return { name: e[1], code: e[0], logo: so(e[0]) };
    });
  var lo = [
      { code: "KKBK", name: "Kotak Mahindra Bank" },
      { code: "KKBK_DC", name: "Kotak Debit Cards" },
      { code: "HDFC_DC", name: "HDFC Debit Cards" },
      { code: "HDFC", name: "HDFC Credit Cards" },
      { code: "UTIB", name: "Axis Bank" },
      { code: "INDB", name: "Indusind Bank" },
      { code: "RATN", name: "RBL Bank" },
      { code: "ICIC", name: "ICICI Bank" },
      { code: "SCBL", name: "Standard Chartered Bank" },
      { code: "YESB", name: "Yes Bank" },
      { code: "AMEX", name: "American Express" },
      { code: "SBIN", name: "State Bank of India" },
      { code: "BARB", name: "Bank of Baroda" },
      { code: "BAJAJ", name: "Bajaj Finserv" },
      { code: "CITI", name: "CITI Bank" },
      { code: "HSBC", name: "HSBC Credit Cards" },
      { code: "FDRL", name: "Federal Bank" },
      { code: "IDFB", name: "IDFC First Bank" },
    ],
    mo = function (e) {
      var n = (function (e) {
          if (/^token_/.test(e)) return hn(to.token[e] || {});
          if (/^\d{6}$/.test(e)) return hn(to.iin[e] || {});
          var n = Qi(e),
            t = { last4: Xi(e).slice(-4) };
          return p.assign(t, to.iin[n] || {});
        })(e),
        t = n.issuer;
      t || "amex" !== n.network || (t = "AMEX"),
        "debit" === n.type && (t += "_DC");
      var r = lo.find(function (e) {
        return e.code === t;
      });
      if (r) return { name: r.name, code: r.code, logo: so(r.code) };
    };
  (lo || []).reduce(function (e, n) {
    return (e[n.code] = n), e;
  }, {});
  var fo = Ii.cdn,
    po = fo + "cardless_emi/",
    ho = fo + "cardless_emi-sq/",
    vo = { min_amount: 3e5, headless: !0, fee_bearer_customer: !0 };
  fn(
    {
      walnut369: {
        name: "Axio",
        fee_bearer_customer: !1,
        headless: !1,
        pushToFirst: !0,
        min_amount: 100,
      },
      bajaj: { name: "Bajaj Finserv" },
      sezzle: {
        name: "Sezzle",
        headless: !1,
        fee_bearer_customer: !1,
        min_amount: 2e4,
      },
      earlysalary: { name: "EarlySalary", fee_bearer_customer: !1 },
      zestmoney: {
        name: "ZestMoney",
        min_amount: 9900,
        fee_bearer_customer: !1,
      },
      flexmoney: {
        name: "Cardless EMI by InstaCred",
        headless: !1,
        fee_bearer_customer: !1,
      },
      barb: { name: "Bank of Baroda Cardless EMI", headless: !1 },
      fdrl: { name: "Federal Bank Cardless EMI", headless: !1 },
      hdfc: { name: "HDFC Bank Cardless EMI", headless: !1 },
      idfb: { name: "IDFC First Bank Cardless EMI", headless: !1 },
      kkbk: { name: "Kotak Mahindra Bank Cardless EMI", headless: !1 },
      icic: { name: "ICICI Bank Cardless EMI", headless: !1 },
      hcin: { name: "Home Credit Ujjwal Card", headless: !1, min_amount: 5e4 },
    },
    function (e, n) {
      return p.assign(
        {},
        vo,
        { code: n, logo: po + n + ".svg", sqLogo: ho + n + ".svg" },
        e
      );
    }
  );
  var yo = Ii.cdn,
    go = yo + "paylater/",
    _o = yo + "paylater-sq/",
    bo = { min_amount: 3e5 };
  fn(
    {
      epaylater: { name: "ePayLater" },
      getsimpl: { name: "Simpl" },
      icic: { name: "ICICI Bank PayLater" },
      hdfc: { name: "FlexiPay by HDFC Bank" },
      lazypay: { name: "LazyPay" },
      kkbk: { name: "kkbk" },
    },
    function (e, n) {
      return p.assign(
        {},
        bo,
        { code: n, logo: go + n + ".svg", sqLogo: _o + n + ".svg" },
        e
      );
    }
  );
  var wo = {
    properties: ["providers"],
    payment: ["provider"],
    groupedToIndividual: function (e) {
      var n = hn(e);
      return (
        delete n.providers,
        (e.providers || []).map(function (e) {
          return p.assign({ provider: e }, n);
        })
      );
    },
    isValid: function (e) {
      return f(e.providers) && e.providers.length > 0;
    },
  };
  function ko(e, n, t) {
    n = hn(n);
    var r = e.method,
      i = Do[r].payment;
    if (
      ((n.method = r),
      i.forEach(function (t) {
        var r = e[t];
        Vn(r) || (n[t] = r);
      }),
      e.token_id && t)
    ) {
      var o = cn(t, "tokens.items", []).find(function (n) {
        return n.id === e.token_id;
      });
      o && (n.token = o.token);
    }
    return n;
  }
  function So() {
    return !0;
  }
  function Eo(e) {
    return [e];
  }
  var Ao = ["types", "iins", "issuers", "networks", "token_id"],
    Co = ["flows", "apps", "token_id", "vpas"],
    Do = {
      card: {
        properties: Ao,
        payment: ["token"],
        groupedToIndividual: function (e, n) {
          var t = cn(n, "tokens.items", []),
            r = hn(e);
          if (
            (Ao.forEach(function (e) {
              delete r[e];
            }),
            e.token_id)
          ) {
            var i = e.token_id,
              o = t.find(function (e) {
                return e.id === i;
              });
            if (o)
              return [
                p.assign(
                  {
                    token_id: i,
                    type: o.card.type,
                    issuer: o.card.issuer,
                    network: o.card.network,
                  },
                  r
                ),
              ];
          }
          var a = (function (e, n) {
            void 0 === n && (n = []);
            var t = [];
            return (
              n.forEach(function (n) {
                var r = e[n];
                if (r && r.length) {
                  var i = n.slice(0, -1);
                  if (0 === t.length)
                    t = r.map(function (e) {
                      var n;
                      return ((n = {})[i] = e), n;
                    });
                  else {
                    var o = r.flatMap(function (e) {
                      return t.map(function (n) {
                        var t;
                        return p.assign((((t = {})[i] = e), t), n);
                      });
                    });
                    t = o;
                  }
                }
              }),
              t
            );
          })(e, ["issuers", "networks", "types", "iins"]);
          return a.map(function (e) {
            return p.assign(e, r);
          });
        },
        isValid: function (e) {
          var n = f(e.issuers),
            t = f(e.networks),
            r = f(e.types);
          return (
            !(n && !e.issuers.length) &&
            !(t && !e.networks.length) &&
            !(r && !e.types.length)
          );
        },
      },
      netbanking: {
        properties: ["banks"],
        payment: ["bank"],
        groupedToIndividual: function (e) {
          var n = hn(e);
          return (
            delete n.banks,
            (e.banks || []).map(function (e) {
              return p.assign({ bank: e }, n);
            })
          );
        },
        isValid: function (e) {
          return f(e.banks) && e.banks.length > 0;
        },
      },
      wallet: {
        properties: ["wallets"],
        payment: ["wallet"],
        groupedToIndividual: function (e) {
          var n = hn(e);
          return (
            delete n.wallets,
            (e.wallets || []).map(function (e) {
              return p.assign({ wallet: e }, n);
            })
          );
        },
        isValid: function (e) {
          return f(e.wallets) && e.wallets.length > 0;
        },
      },
      upi: {
        properties: Co,
        payment: ["flow", "app", "token", "vpa"],
        groupedToIndividual: function (e, n) {
          var t = [],
            r = [],
            i = [],
            o = [],
            a = cn(n, "tokens.items", []),
            u = hn(e);
          if (
            (Co.forEach(function (e) {
              delete u[e];
            }),
            e.flows && (t = e.flows),
            e.vpas && (i = e.vpas),
            e.apps && (r = e.apps),
            t.includes("collect") && i.length)
          ) {
            var c = i.map(function (n) {
              var t = p.assign({ vpa: n, flow: "collect" }, u);
              if (e.token_id) {
                var r = e.token_id;
                a.find(function (e) {
                  return e.id === r;
                }) && (t.token_id = r);
              }
              return t;
            });
            o = o.concat(c);
          }
          if (t.includes("intent") && r.length) {
            var s = r.map(function (e) {
              return p.assign({ app: e, flow: "intent" }, u);
            });
            o = o.concat(s);
          }
          if (t.length > 0) {
            var l = t
              .map(function (e) {
                var n = p.assign({ flow: e }, u);
                if (
                  !(
                    ("intent" === e && r.length) ||
                    ("collect" === e && i.length)
                  )
                )
                  return n;
              })
              .filter(f);
            o = o.concat(l);
          }
          return o;
        },
        getPaymentPayload: function (e, n, t) {
          return (
            "collect" === (n = ko(e, n, t)).flow &&
              ((n.flow = "directpay"), n.token && n.vpa && delete n.vpa),
            "qr" === n.flow && ((n["_[upiqr]"] = 1), (n.flow = "intent")),
            n.flow && ((n["_[flow]"] = n.flow), delete n.flow),
            n.app && ((n.upi_app = n.app), delete n.app),
            n
          );
        },
        isValid: function (e) {
          var n = f(e.flows),
            t = f(e.apps);
          if (!n || !e.flows.length) return !1;
          if (t) {
            if (!e.apps.length) return !1;
            if (!n || !e.flows.includes("intent")) return !1;
          }
          return !0;
        },
      },
      cardless_emi: {
        properties: ["providers"],
        payment: ["provider"],
        groupedToIndividual: function (e) {
          var n = hn(e);
          return (
            delete n.providers,
            (e.providers || []).map(function (e) {
              return p.assign({ provider: e }, n);
            })
          );
        },
        isValid: function (e) {
          return f(e.providers) && e.providers.length > 0;
        },
      },
      paylater: {
        properties: ["providers"],
        payment: ["provider"],
        groupedToIndividual: function (e) {
          var n = hn(e);
          return (
            delete n.providers,
            (e.providers || []).map(function (e) {
              return p.assign({ provider: e }, n);
            })
          );
        },
        isValid: function (e) {
          return f(e.providers) && e.providers.length > 0;
        },
      },
      app: {
        properties: ["providers"],
        payment: ["provider"],
        groupedToIndividual: function (e) {
          var n = hn(e);
          return (
            delete n.providers,
            (e.providers || []).map(function (e) {
              return p.assign({ provider: e }, n);
            })
          );
        },
        isValid: function (e) {
          return f(e.providers) && e.providers.length > 0;
        },
      },
      international: wo,
      intl_bank_transfer: wo,
    };
  function Ro(e) {
    var n = e.method,
      t = Do[n];
    if (!t) return !1;
    var r = p.keys(e);
    return t.properties.every(function (e) {
      return !r.includes(e);
    });
  }
  (Do.emi = Do.card),
    (Do.credit_card = Do.card),
    (Do.debit_card = Do.card),
    (Do.upi_otm = Do.upi),
    (Do.emandate = Do.netbanking),
    [
      "card",
      "upi",
      "netbanking",
      "wallet",
      "upi_otm",
      "gpay",
      "emi",
      "cardless_emi",
      "qr",
      "paylater",
      "paypal",
      "bank_transfer",
      "offline_challan",
      "nach",
      "app",
      "emandate",
      "cod",
      "international",
      "intl_bank_transfer",
    ].forEach(function (e) {
      Do[e] || (Do[e] = {});
    }),
    vn(Do, function (e, n) {
      Do[n] = p.assign(
        {
          getPaymentPayload: ko,
          groupedToIndividual: Eo,
          isValid: So,
          properties: [],
          payment: [],
        },
        Do[n]
      );
    });
  var xo = rn(""),
    Po = rn("");
  rn("");
  var No = on([xo, Po], function (e) {
    var n = e[0],
      t = e[1];
    return t ? n + t : "";
  });
  rn({});
  var Mo = rn(""),
    Io = rn("");
  on([Mo, Io], function (e) {
    var n = e[0],
      t = e[1];
    return t ? n + t : "";
  }),
    xo.subscribe(function (e) {
      Mo.set(e);
    }),
    Po.subscribe(function (e) {
      Io.set(e);
    }),
    rn(""),
    rn(""),
    rn(""),
    rn(""),
    rn(""),
    rn("netbanking"),
    rn(),
    rn("");
  var To = on(rn([]), function (e) {
    return e.flatMap(function (e) {
      return e.instruments;
    });
  });
  rn([]), rn([]), rn([]);
  var Lo = on([To, rn(null)], function (e) {
    var n = e[0],
      t = void 0 === n ? [] : n,
      r = e[1],
      i = void 0 === r ? null : r;
    return t.find(function (e) {
      return e.id === i;
    });
  });
  on(Lo, function (e) {
    return e &&
      (Ro(e) ||
        (function (e) {
          var n = Ro(e),
            t = ["card", "emi"].includes(e.method);
          if ("emandate" === e.method) return !0;
          if (n) return !0;
          if (t) return !e.token_id;
          if ("upi" === e.method && e.flows) {
            if (e.flows.length > 1) return !0;
            if (e.flows.includes("omnichannel")) return !0;
            if (e.flows.includes("collect")) {
              var r = e._ungrouped;
              if (1 === r.length) {
                var i = r[0],
                  o = i.flow,
                  a = i.vpa;
                if ("collect" === o && a) return !1;
              }
              return !0;
            }
            if (e.flows.includes("intent") && !e.apps) return !0;
          }
          return e._ungrouped.length > 1;
        })(e))
      ? e
      : null;
  }),
    on(No, function (e) {
      return e && "+91" !== e && "+" !== e;
    }),
    rn([]);
  var Oo = on([No], function (e) {
      return e[0].startsWith("+91");
    }),
    Bo = Ii.cdn,
    Fo = {
      TRUSTLY: "trustly",
      POLI: "poli",
      SOFORT: "sofort",
      GIROPAY: "giropay",
    },
    zo = Ii.cdn;
  function Ko(e) {
    (this.name = e),
      (this._exists = !1),
      (this.platform = ""),
      (this.bridge = {}),
      this.init();
  }
  X(
    {
      google_pay: {
        code: "google_pay",
        logo: zo + "app/googlepay.svg",
        card_logo: zo + "card/googlepay.svg",
        verify_registration: !0,
        externalSDK: "googlepay",
        isCompatibleWithSDK: function (e) {
          return "android" === e.platform;
        },
      },
      cred: {
        code: "cred",
        logo: zo + "checkout/cred.png",
        uri: "credpay",
        package_name: "com.dreamplug.androidapp",
        isCompatibleWithSDK: function (e) {
          var n = e.platform;
          return "android" === n || "ios" === n;
        },
      },
    },
    (function () {
      var e = {};
      return (
        p.keys(Fo).forEach(function (n) {
          e[Fo[n]] = {
            code: Fo[n],
            logo: Bo + "international/" + Fo[n] + ".png",
            uri: "",
            package_name: "",
            isCompatibleWithSDK: function (e) {
              var n = e.platform;
              return "android" === n || "ios" === n;
            },
          };
        }),
        e
      );
    })()
  ),
    (Ko.prototype = {
      init: function () {
        var e = this.name,
          n = window[e],
          t = ((window.webkit || {}).messageHandlers || {})[e];
        t
          ? ((this._exists = !0), (this.bridge = t), (this.platform = "ios"))
          : n &&
            ((this._exists = !0),
            (this.bridge = n),
            (this.platform = "android"));
      },
      exists: function () {
        return this._exists;
      },
      get: function (e) {
        if (this.exists())
          if ("android" === this.platform) {
            if (Un(this.bridge[e])) return this.bridge[e];
          } else if ("ios" === this.platform) return this.bridge.postMessage;
      },
      has: function (e) {
        return !(!this.exists() || !this.get(e));
      },
      callAndroid: function (e) {
        for (
          var n = arguments.length, t = new d(n > 1 ? n - 1 : 0), r = 1;
          r < n;
          r++
        )
          t[r - 1] = arguments[r];
        t = t.map(function (e) {
          return "object" == typeof e ? JSON.stringify(e) : e;
        });
        var i = this.get(e);
        if (i) return i.apply(this.bridge, t);
      },
      callIos: function (e) {
        var n = this.get(e);
        if (n)
          try {
            var t = { action: e },
              r = arguments.length <= 1 ? void 0 : arguments[1];
            return r && (t.body = r), n.call(this.bridge, t);
          } catch (e) {}
      },
      call: function (e) {
        for (
          var n = arguments.length, t = new d(n > 1 ? n - 1 : 0), r = 1;
          r < n;
          r++
        )
          t[r - 1] = arguments[r];
        var i = this.get(e);
        (t = [e].concat(t)),
          i && (this.callAndroid.apply(this, t), this.callIos.apply(this, t));
      },
    });
  var $o = m.body,
    jo = l.innerHeight,
    Ho = l.pageYOffset,
    Go = window.scrollBy,
    Uo = window.scrollTo,
    Yo = window.requestAnimationFrame,
    Zo = m.querySelector.bind(m),
    Vo = m.querySelectorAll.bind(m);
  m.getElementById.bind(m), l.getComputedStyle.bind(l);
  var Wo,
    Jo = function (e) {
      return "string" == typeof e ? Zo(e) : e;
    };
  function qo(e) {
    if (!e.target && l !== l.parent)
      return l.Razorpay.sendMessage({ event: "redirect", data: e });
    Ti({ url: e.url, params: e.content, method: e.method, target: e.target });
  }
  function Xo(e) {
    var n = {};
    return (
      null == e ||
        e.querySelectorAll("[name]").forEach(function (e) {
          n[e.name] = e.value;
        }),
      n
    );
  }
  function Qo(e) {
    !(function (e) {
      if (!l.requestAnimationFrame) return Go(0, e);
      Wo && w(Wo);
      Wo = _(function () {
        var n = Ho,
          t = g.min(n + e, Tt($o) - jo);
        e = t - n;
        var r = 0,
          i = l.performance.now();
        function o(a) {
          if ((r += (a - i) / 300) >= 1) return Uo(0, t);
          var u = g.sin((ea * r) / 2);
          Uo(0, n + g.round(e * u)), (i = a), Yo(o);
        }
        Yo(o);
      }, 100);
    })(e - Ho);
  }
  var ea = g.PI;
  new Ko("CheckoutBridge"), new Ko("StorageBridge");
  var na = Ii.cdn,
    ta = na + "wallet/",
    ra = na + "wallet-sq/",
    ia = ["mobikwik", "freecharge", "payumoney"];
  fn(
    {
      airtelmoney: ["Airtel Money", 32],
      amazonpay: ["Amazon Pay", 28],
      citrus: ["Citrus Wallet", 32],
      freecharge: ["Freecharge", 18],
      jiomoney: ["JioMoney", 68],
      mobikwik: ["Mobikwik", 20],
      olamoney: ["Ola Money (Postpaid + Wallet)", 22],
      paypal: ["PayPal", 20],
      paytm: ["Paytm", 18],
      payumoney: ["PayUMoney", 18],
      payzapp: ["PayZapp", 24],
      phonepe: ["PhonePe", 20],
      sbibuddy: ["SBI Buddy", 22],
      zeta: ["Zeta", 25],
      citibankrewards: ["Citibank Reward Points", 20],
      itzcash: ["Itz Cash", 20],
      paycash: ["PayCash", 20],
    },
    function (e, n) {
      return {
        power: -1 !== ia.indexOf(n),
        name: e[0],
        h: e[1],
        code: n,
        logo: ta + n + ".png",
        sqLogo: ra + n + ".png",
      };
    }
  );
  var oa,
    aa,
    ua,
    ca =
      (void 0 === oa && (oa = x.search),
      Gn(oa)
        ? ((aa = oa.slice(1)),
          (ua = {}),
          aa.split(/=|&/).forEach(function (e, n, t) {
            n % 2 && (ua[t[n - 1]] = E(e));
          }),
          ua)
        : {});
  var sa = {};
  [
    { package_name: Ci, method: "upi" },
    { package_name: "com.phonepe.app", method: "upi" },
    { package_name: "cred", method: "app" },
  ].forEach(function (e) {
    sa[e.package_name] = !1;
  });
  var la,
    ma = rn({});
  function fa(e) {
    return e.type === la.literal;
  }
  function da(e) {
    return e.type === la.argument;
  }
  function pa(e) {
    return e.type === la.number;
  }
  function ha(e) {
    return e.type === la.date;
  }
  function va(e) {
    return e.type === la.time;
  }
  function ya(e) {
    return e.type === la.select;
  }
  function ga(e) {
    return e.type === la.plural;
  }
  function _a(e) {
    return e.type === la.pound;
  }
  function ba(e) {
    return !(!e || "object" != typeof e || 0 !== e.type);
  }
  function wa(e) {
    return !(!e || "object" != typeof e || 1 !== e.type);
  }
  rn([]),
    rn([]),
    (function (e) {
      (e[(e.literal = 0)] = "literal"),
        (e[(e.argument = 1)] = "argument"),
        (e[(e.number = 2)] = "number"),
        (e[(e.date = 3)] = "date"),
        (e[(e.time = 4)] = "time"),
        (e[(e.select = 5)] = "select"),
        (e[(e.plural = 6)] = "plural"),
        (e[(e.pound = 7)] = "pound");
    })(la || (la = {}));
  var ka,
    Sa =
      ((ka = function (e, n) {
        return (
          (ka =
            p.setPrototypeOf ||
            ({ __proto__: [] } instanceof d &&
              function (e, n) {
                e.__proto__ = n;
              }) ||
            function (e, n) {
              for (var t in n) n.hasOwnProperty(t) && (e[t] = n[t]);
            }),
          ka(e, n)
        );
      }),
      function (e, n) {
        function t() {
          this.constructor = e;
        }
        ka(e, n),
          (e.prototype =
            null === n ? p.create(n) : ((t.prototype = n.prototype), new t()));
      }),
    Ea = function () {
      return (
        (Ea =
          p.assign ||
          function (e) {
            for (var n, t = 1, r = arguments.length; t < r; t++)
              for (var i in (n = arguments[t]))
                p.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
            return e;
          }),
        Ea.apply(this, arguments)
      );
    },
    Aa = (function (e) {
      function n(t, r, i, o) {
        var a = e.call(this) || this;
        return (
          (a.message = t),
          (a.expected = r),
          (a.found = i),
          (a.location = o),
          (a.name = "SyntaxError"),
          "function" == typeof Error.captureStackTrace &&
            Error.captureStackTrace(a, n),
          a
        );
      }
      return (
        Sa(n, e),
        (n.buildMessage = function (e, n) {
          function t(e) {
            return e.charCodeAt(0).toString(16).toUpperCase();
          }
          function r(e) {
            return e
              .replace(/\\/g, "\\\\")
              .replace(/"/g, '\\"')
              .replace(/\0/g, "\\0")
              .replace(/\t/g, "\\t")
              .replace(/\n/g, "\\n")
              .replace(/\r/g, "\\r")
              .replace(/[\x00-\x0F]/g, function (e) {
                return "\\x0" + t(e);
              })
              .replace(/[\x10-\x1F\x7F-\x9F]/g, function (e) {
                return "\\x" + t(e);
              });
          }
          function i(e) {
            return e
              .replace(/\\/g, "\\\\")
              .replace(/\]/g, "\\]")
              .replace(/\^/g, "\\^")
              .replace(/-/g, "\\-")
              .replace(/\0/g, "\\0")
              .replace(/\t/g, "\\t")
              .replace(/\n/g, "\\n")
              .replace(/\r/g, "\\r")
              .replace(/[\x00-\x0F]/g, function (e) {
                return "\\x0" + t(e);
              })
              .replace(/[\x10-\x1F\x7F-\x9F]/g, function (e) {
                return "\\x" + t(e);
              });
          }
          function o(e) {
            switch (e.type) {
              case "literal":
                return '"' + r(e.text) + '"';
              case "class":
                var n = e.parts.map(function (e) {
                  return d.isArray(e) ? i(e[0]) + "-" + i(e[1]) : i(e);
                });
                return "[" + (e.inverted ? "^" : "") + n + "]";
              case "any":
                return "any character";
              case "end":
                return "end of input";
              case "other":
                return e.description;
            }
          }
          return (
            "Expected " +
            (function (e) {
              var n,
                t,
                r = e.map(o);
              if ((r.sort(), r.length > 0)) {
                for (n = 1, t = 1; n < r.length; n++)
                  r[n - 1] !== r[n] && ((r[t] = r[n]), t++);
                r.length = t;
              }
              switch (r.length) {
                case 1:
                  return r[0];
                case 2:
                  return r[0] + " or " + r[1];
                default:
                  return r.slice(0, -1).join(", ") + ", or " + r[r.length - 1];
              }
            })(e) +
            " but " +
            (((a = n) ? '"' + r(a) + '"' : "end of input") + " found.")
          );
          var a;
        }),
        n
      );
    })(Error);
  var Ca = function (e, n) {
      n = void 0 !== n ? n : {};
      var t,
        r = {},
        i = { start: Me },
        o = Me,
        a = Ce("#", !1),
        u = Re("argumentElement"),
        c = "{",
        s = Ce("{", !1),
        l = "}",
        m = Ce("}", !1),
        f = Re("numberSkeletonId"),
        d = /^['\/{}]/,
        p = De(["'", "/", "{", "}"], !1, !1),
        h = { type: "any" },
        v = Re("numberSkeletonTokenOption"),
        y = Ce("/", !1),
        g = Re("numberSkeletonToken"),
        _ = "::",
        b = Ce("::", !1),
        w = function (e) {
          return tn.pop(), e.replace(/\s*$/, "");
        },
        S = ",",
        E = Ce(",", !1),
        A = "number",
        C = Ce("number", !1),
        D = function (e, n, t) {
          return Ea(
            {
              type:
                "number" === n ? la.number : "date" === n ? la.date : la.time,
              style: t && t[2],
              value: e,
            },
            on()
          );
        },
        R = "'",
        x = Ce("'", !1),
        P = /^[^']/,
        N = De(["'"], !0, !1),
        M = /^[^a-zA-Z'{}]/,
        I = De([["a", "z"], ["A", "Z"], "'", "{", "}"], !0, !1),
        T = /^[a-zA-Z]/,
        L = De(
          [
            ["a", "z"],
            ["A", "Z"],
          ],
          !1,
          !1
        ),
        O = "date",
        B = Ce("date", !1),
        F = "time",
        z = Ce("time", !1),
        K = "plural",
        $ = Ce("plural", !1),
        j = "selectordinal",
        H = Ce("selectordinal", !1),
        G = "offset:",
        U = Ce("offset:", !1),
        Y = "select",
        Z = Ce("select", !1),
        V = Ce("=", !1),
        W = Re("whitespace"),
        J =
          /^[\t-\r \x85\xA0\u1680\u2000-\u200A\u2028\u2029\u202F\u205F\u3000]/,
        q = De(
          [
            ["\t", "\r"],
            " ",
            "Â…",
            "Â ",
            "áš€",
            ["â€€", "â€Š"],
            "\u2028",
            "\u2029",
            "â€¯",
            "âŸ",
            "ã€€",
          ],
          !1,
          !1
        ),
        X = Re("syntax pattern"),
        Q =
          /^[!-\/:-@[-\^`{-~\xA1-\xA7\xA9\xAB\xAC\xAE\xB0\xB1\xB6\xBB\xBF\xD7\xF7\u2010-\u2027\u2030-\u203E\u2041-\u2053\u2055-\u205E\u2190-\u245F\u2500-\u2775\u2794-\u2BFF\u2E00-\u2E7F\u3001-\u3003\u3008-\u3020\u3030\uFD3E\uFD3F\uFE45\uFE46]/,
        ee = De(
          [
            ["!", "/"],
            [":", "@"],
            ["[", "^"],
            "`",
            ["{", "~"],
            ["Â¡", "Â§"],
            "Â©",
            "Â«",
            "Â¬",
            "Â®",
            "Â°",
            "Â±",
            "Â¶",
            "Â»",
            "Â¿",
            "Ã—",
            "Ã·",
            ["â€", "â€§"],
            ["â€°", "â€¾"],
            ["â", "â“"],
            ["â•", "âž"],
            ["â†", "â‘Ÿ"],
            ["â”€", "âµ"],
            ["âž”", "â¯¿"],
            ["â¸€", "â¹¿"],
            ["ã€", "ã€ƒ"],
            ["ã€ˆ", "ã€ "],
            "ã€°",
            "ï´¾",
            "ï´¿",
            "ï¹…",
            "ï¹†",
          ],
          !1,
          !1
        ),
        ne = Re("optional whitespace"),
        te = Re("number"),
        re = Ce("-", !1),
        ie = Re("double apostrophes"),
        oe = "''",
        ae = Ce("''", !1),
        ue = function (e) {
          return !(
            "{" === e ||
            (rn() && "#" === e) ||
            (tn.length > 1 && "}" === e)
          );
        },
        ce = Ce("\n", !1),
        se = Re("argNameOrNumber"),
        le = Re("argNumber"),
        me = Ce("0", !1),
        fe = /^[1-9]/,
        de = De([["1", "9"]], !1, !1),
        pe = /^[0-9]/,
        he = De([["0", "9"]], !1, !1),
        ve = Re("argName"),
        ye = 0,
        ge = 0,
        _e = [{ line: 1, column: 1 }],
        be = 0,
        we = [],
        ke = 0;
      if (void 0 !== n.startRule) {
        if (!(n.startRule in i))
          throw new Error(
            "Can't start parsing from rule \"" + n.startRule + '".'
          );
        o = i[n.startRule];
      }
      function Se() {
        return e.substring(ge, ye);
      }
      function Ee() {
        return Pe(ge, ye);
      }
      function Ae(e, n) {
        throw (function (e, n) {
          return new Aa(e, [], "", n);
        })(e, (n = void 0 !== n ? n : Pe(ge, ye)));
      }
      function Ce(e, n) {
        return { type: "literal", text: e, ignoreCase: n };
      }
      function De(e, n, t) {
        return { type: "class", parts: e, inverted: n, ignoreCase: t };
      }
      function Re(e) {
        return { type: "other", description: e };
      }
      function xe(n) {
        var t,
          r = _e[n];
        if (r) return r;
        for (t = n - 1; !_e[t]; ) t--;
        for (r = { line: (r = _e[t]).line, column: r.column }; t < n; )
          10 === e.charCodeAt(t) ? (r.line++, (r.column = 1)) : r.column++, t++;
        return (_e[n] = r), r;
      }
      function Pe(e, n) {
        var t = xe(e),
          r = xe(n);
        return {
          start: { offset: e, line: t.line, column: t.column },
          end: { offset: n, line: r.line, column: r.column },
        };
      }
      function Ne(e) {
        ye < be || (ye > be && ((be = ye), (we = [])), we.push(e));
      }
      function Me() {
        return Ie();
      }
      function Ie() {
        var e, n;
        for (e = [], n = Te(); n !== r; ) e.push(n), (n = Te());
        return e;
      }
      function Te() {
        var n;
        return (
          (n = (function () {
            var e, n;
            (e = ye),
              (n = Le()) !== r &&
                ((ge = e),
                (t = n),
                (n = Ea({ type: la.literal, value: t }, on())));
            var t;
            return (e = n);
          })()) === r &&
            (n = (function () {
              var n, t, i, o;
              ke++,
                (n = ye),
                123 === e.charCodeAt(ye)
                  ? ((t = c), ye++)
                  : ((t = r), 0 === ke && Ne(s));
              t !== r && Ue() !== r && (i = Je()) !== r && Ue() !== r
                ? (125 === e.charCodeAt(ye)
                    ? ((o = l), ye++)
                    : ((o = r), 0 === ke && Ne(m)),
                  o !== r
                    ? ((ge = n),
                      (a = i),
                      (n = t = Ea({ type: la.argument, value: a }, on())))
                    : ((ye = n), (n = r)))
                : ((ye = n), (n = r));
              var a;
              ke--, n === r && ((t = r), 0 === ke && Ne(u));
              return n;
            })()) === r &&
            (n = (function () {
              var n;
              (n = (function () {
                var n, t, i, o, a, u, f, d, p;
                (n = ye),
                  123 === e.charCodeAt(ye)
                    ? ((t = c), ye++)
                    : ((t = r), 0 === ke && Ne(s));
                t !== r && Ue() !== r && (i = Je()) !== r && Ue() !== r
                  ? (44 === e.charCodeAt(ye)
                      ? ((o = S), ye++)
                      : ((o = r), 0 === ke && Ne(E)),
                    o !== r && Ue() !== r
                      ? (e.substr(ye, 6) === A
                          ? ((a = A), (ye += 6))
                          : ((a = r), 0 === ke && Ne(C)),
                        a !== r && Ue() !== r
                          ? ((u = ye),
                            44 === e.charCodeAt(ye)
                              ? ((f = S), ye++)
                              : ((f = r), 0 === ke && Ne(E)),
                            f !== r && (d = Ue()) !== r
                              ? ((p = (function () {
                                  var n, t, i;
                                  (n = ye),
                                    e.substr(ye, 2) === _
                                      ? ((t = _), (ye += 2))
                                      : ((t = r), 0 === ke && Ne(b));
                                  t !== r
                                    ? ((i = (function () {
                                        var e, n, t;
                                        if (
                                          ((e = ye), (n = []), (t = Fe()) !== r)
                                        )
                                          for (; t !== r; )
                                            n.push(t), (t = Fe());
                                        else n = r;
                                        n !== r &&
                                          ((ge = e),
                                          (n = Ea(
                                            { type: 0, tokens: n },
                                            on()
                                          )));
                                        return (e = n);
                                      })()),
                                      i !== r
                                        ? ((ge = n), (n = t = i))
                                        : ((ye = n), (n = r)))
                                    : ((ye = n), (n = r));
                                  n === r &&
                                    ((n = ye),
                                    (ge = ye),
                                    tn.push("numberArgStyle"),
                                    (t = (t = !0) ? void 0 : r) !== r &&
                                    (i = Le()) !== r
                                      ? ((ge = n), (n = t = w(i)))
                                      : ((ye = n), (n = r)));
                                  return n;
                                })()),
                                p !== r
                                  ? (u = f = [f, d, p])
                                  : ((ye = u), (u = r)))
                              : ((ye = u), (u = r)),
                            u === r && (u = null),
                            u !== r && (f = Ue()) !== r
                              ? (125 === e.charCodeAt(ye)
                                  ? ((d = l), ye++)
                                  : ((d = r), 0 === ke && Ne(m)),
                                d !== r
                                  ? ((ge = n), (n = t = D(i, a, u)))
                                  : ((ye = n), (n = r)))
                              : ((ye = n), (n = r)))
                          : ((ye = n), (n = r)))
                      : ((ye = n), (n = r)))
                  : ((ye = n), (n = r));
                return n;
              })()) === r &&
                (n = (function () {
                  var n, t, i, o, a, u, f, d, p;
                  (n = ye),
                    123 === e.charCodeAt(ye)
                      ? ((t = c), ye++)
                      : ((t = r), 0 === ke && Ne(s));
                  t !== r && Ue() !== r && (i = Je()) !== r && Ue() !== r
                    ? (44 === e.charCodeAt(ye)
                        ? ((o = S), ye++)
                        : ((o = r), 0 === ke && Ne(E)),
                      o !== r && Ue() !== r
                        ? (e.substr(ye, 4) === O
                            ? ((a = O), (ye += 4))
                            : ((a = r), 0 === ke && Ne(B)),
                          a === r &&
                            (e.substr(ye, 4) === F
                              ? ((a = F), (ye += 4))
                              : ((a = r), 0 === ke && Ne(z))),
                          a !== r && Ue() !== r
                            ? ((u = ye),
                              44 === e.charCodeAt(ye)
                                ? ((f = S), ye++)
                                : ((f = r), 0 === ke && Ne(E)),
                              f !== r && (d = Ue()) !== r
                                ? ((p = (function () {
                                    var n, t, i;
                                    (n = ye),
                                      e.substr(ye, 2) === _
                                        ? ((t = _), (ye += 2))
                                        : ((t = r), 0 === ke && Ne(b));
                                    t !== r
                                      ? ((i = (function () {
                                          var n, t, i, o;
                                          (n = ye),
                                            (t = ye),
                                            (i = []),
                                            (o = ze()) === r && (o = Ke());
                                          if (o !== r)
                                            for (; o !== r; )
                                              i.push(o),
                                                (o = ze()) === r && (o = Ke());
                                          else i = r;
                                          t = i !== r ? e.substring(t, ye) : i;
                                          t !== r &&
                                            ((ge = n),
                                            (t = Ea(
                                              { type: 1, pattern: t },
                                              on()
                                            )));
                                          return (n = t);
                                        })()),
                                        i !== r
                                          ? ((ge = n), (n = t = i))
                                          : ((ye = n), (n = r)))
                                      : ((ye = n), (n = r));
                                    n === r &&
                                      ((n = ye),
                                      (ge = ye),
                                      tn.push("dateOrTimeArgStyle"),
                                      (t = (t = !0) ? void 0 : r) !== r &&
                                      (i = Le()) !== r
                                        ? ((ge = n), (n = t = w(i)))
                                        : ((ye = n), (n = r)));
                                    return n;
                                  })()),
                                  p !== r
                                    ? (u = f = [f, d, p])
                                    : ((ye = u), (u = r)))
                                : ((ye = u), (u = r)),
                              u === r && (u = null),
                              u !== r && (f = Ue()) !== r
                                ? (125 === e.charCodeAt(ye)
                                    ? ((d = l), ye++)
                                    : ((d = r), 0 === ke && Ne(m)),
                                  d !== r
                                    ? ((ge = n), (n = t = D(i, a, u)))
                                    : ((ye = n), (n = r)))
                                : ((ye = n), (n = r)))
                            : ((ye = n), (n = r)))
                        : ((ye = n), (n = r)))
                    : ((ye = n), (n = r));
                  return n;
                })());
              return n;
            })()) === r &&
            ((n = (function () {
              var n, t, i, o, a, u, f, d, p, h, v;
              (n = ye),
                123 === e.charCodeAt(ye)
                  ? ((t = c), ye++)
                  : ((t = r), 0 === ke && Ne(s));
              if (t !== r)
                if (Ue() !== r)
                  if ((i = Je()) !== r)
                    if (Ue() !== r)
                      if (
                        (44 === e.charCodeAt(ye)
                          ? ((o = S), ye++)
                          : ((o = r), 0 === ke && Ne(E)),
                        o !== r)
                      )
                        if (Ue() !== r)
                          if (
                            (e.substr(ye, 6) === K
                              ? ((a = K), (ye += 6))
                              : ((a = r), 0 === ke && Ne($)),
                            a === r &&
                              (e.substr(ye, 13) === j
                                ? ((a = j), (ye += 13))
                                : ((a = r), 0 === ke && Ne(H))),
                            a !== r)
                          )
                            if (Ue() !== r)
                              if (
                                (44 === e.charCodeAt(ye)
                                  ? ((u = S), ye++)
                                  : ((u = r), 0 === ke && Ne(E)),
                                u !== r)
                              )
                                if (Ue() !== r)
                                  if (
                                    ((f = ye),
                                    e.substr(ye, 7) === G
                                      ? ((d = G), (ye += 7))
                                      : ((d = r), 0 === ke && Ne(U)),
                                    d !== r &&
                                    (p = Ue()) !== r &&
                                    (h = Ye()) !== r
                                      ? (f = d = [d, p, h])
                                      : ((ye = f), (f = r)),
                                    f === r && (f = null),
                                    f !== r)
                                  )
                                    if ((d = Ue()) !== r) {
                                      if (((p = []), (h = je()) !== r))
                                        for (; h !== r; ) p.push(h), (h = je());
                                      else p = r;
                                      p !== r && (h = Ue()) !== r
                                        ? (125 === e.charCodeAt(ye)
                                            ? ((v = l), ye++)
                                            : ((v = r), 0 === ke && Ne(m)),
                                          v !== r
                                            ? ((ge = n),
                                              (t = (function (e, n, t, r) {
                                                return Ea(
                                                  {
                                                    type: la.plural,
                                                    pluralType:
                                                      "plural" === n
                                                        ? "cardinal"
                                                        : "ordinal",
                                                    value: e,
                                                    offset: t ? t[2] : 0,
                                                    options: r.reduce(function (
                                                      e,
                                                      n
                                                    ) {
                                                      var t = n.id,
                                                        r = n.value,
                                                        i = n.location;
                                                      return (
                                                        t in e &&
                                                          Ae(
                                                            'Duplicate option "' +
                                                              t +
                                                              '" in plural element: "' +
                                                              Se() +
                                                              '"',
                                                            Ee()
                                                          ),
                                                        (e[t] = {
                                                          value: r,
                                                          location: i,
                                                        }),
                                                        e
                                                      );
                                                    },
                                                    {}),
                                                  },
                                                  on()
                                                );
                                              })(i, a, f, p)),
                                              (n = t))
                                            : ((ye = n), (n = r)))
                                        : ((ye = n), (n = r));
                                    } else (ye = n), (n = r);
                                  else (ye = n), (n = r);
                                else (ye = n), (n = r);
                              else (ye = n), (n = r);
                            else (ye = n), (n = r);
                          else (ye = n), (n = r);
                        else (ye = n), (n = r);
                      else (ye = n), (n = r);
                    else (ye = n), (n = r);
                  else (ye = n), (n = r);
                else (ye = n), (n = r);
              else (ye = n), (n = r);
              return n;
            })()),
            n === r &&
              ((n = (function () {
                var n, t, i, o, a, u, f, d, p;
                (n = ye),
                  123 === e.charCodeAt(ye)
                    ? ((t = c), ye++)
                    : ((t = r), 0 === ke && Ne(s));
                if (t !== r)
                  if (Ue() !== r)
                    if ((i = Je()) !== r)
                      if (Ue() !== r)
                        if (
                          (44 === e.charCodeAt(ye)
                            ? ((o = S), ye++)
                            : ((o = r), 0 === ke && Ne(E)),
                          o !== r)
                        )
                          if (Ue() !== r)
                            if (
                              (e.substr(ye, 6) === Y
                                ? ((a = Y), (ye += 6))
                                : ((a = r), 0 === ke && Ne(Z)),
                              a !== r)
                            )
                              if (Ue() !== r)
                                if (
                                  (44 === e.charCodeAt(ye)
                                    ? ((u = S), ye++)
                                    : ((u = r), 0 === ke && Ne(E)),
                                  u !== r)
                                )
                                  if (Ue() !== r) {
                                    if (((f = []), (d = $e()) !== r))
                                      for (; d !== r; ) f.push(d), (d = $e());
                                    else f = r;
                                    f !== r && (d = Ue()) !== r
                                      ? (125 === e.charCodeAt(ye)
                                          ? ((p = l), ye++)
                                          : ((p = r), 0 === ke && Ne(m)),
                                        p !== r
                                          ? ((ge = n),
                                            (t = (function (e, n) {
                                              return Ea(
                                                {
                                                  type: la.select,
                                                  value: e,
                                                  options: n.reduce(function (
                                                    e,
                                                    n
                                                  ) {
                                                    var t = n.id,
                                                      r = n.value,
                                                      i = n.location;
                                                    return (
                                                      t in e &&
                                                        Ae(
                                                          'Duplicate option "' +
                                                            t +
                                                            '" in select element: "' +
                                                            Se() +
                                                            '"',
                                                          Ee()
                                                        ),
                                                      (e[t] = {
                                                        value: r,
                                                        location: i,
                                                      }),
                                                      e
                                                    );
                                                  },
                                                  {}),
                                                },
                                                on()
                                              );
                                            })(i, f)),
                                            (n = t))
                                          : ((ye = n), (n = r)))
                                      : ((ye = n), (n = r));
                                  } else (ye = n), (n = r);
                                else (ye = n), (n = r);
                              else (ye = n), (n = r);
                            else (ye = n), (n = r);
                          else (ye = n), (n = r);
                        else (ye = n), (n = r);
                      else (ye = n), (n = r);
                    else (ye = n), (n = r);
                  else (ye = n), (n = r);
                else (ye = n), (n = r);
                return n;
              })()),
              n === r &&
                (n = (function () {
                  var n, t;
                  (n = ye),
                    35 === e.charCodeAt(ye)
                      ? ((t = "#"), ye++)
                      : ((t = r), 0 === ke && Ne(a));
                  t !== r && ((ge = n), (t = Ea({ type: la.pound }, on())));
                  return (n = t);
                })()))),
          n
        );
      }
      function Le() {
        var e, n, t;
        if (
          ((e = ye),
          (n = []),
          (t = Ze()) === r && (t = Ve()) === r && (t = We()),
          t !== r)
        )
          for (; t !== r; )
            n.push(t), (t = Ze()) === r && (t = Ve()) === r && (t = We());
        else n = r;
        return n !== r && ((ge = e), (n = n.join(""))), (e = n);
      }
      function Oe() {
        var n, t, i, o, a;
        if (
          (ke++,
          (n = ye),
          (t = []),
          (i = ye),
          (o = ye),
          ke++,
          (a = He()) === r &&
            (d.test(e.charAt(ye))
              ? ((a = e.charAt(ye)), ye++)
              : ((a = r), 0 === ke && Ne(p))),
          ke--,
          a === r ? (o = void 0) : ((ye = o), (o = r)),
          o !== r
            ? (e.length > ye
                ? ((a = e.charAt(ye)), ye++)
                : ((a = r), 0 === ke && Ne(h)),
              a !== r ? (i = o = [o, a]) : ((ye = i), (i = r)))
            : ((ye = i), (i = r)),
          i !== r)
        )
          for (; i !== r; )
            t.push(i),
              (i = ye),
              (o = ye),
              ke++,
              (a = He()) === r &&
                (d.test(e.charAt(ye))
                  ? ((a = e.charAt(ye)), ye++)
                  : ((a = r), 0 === ke && Ne(p))),
              ke--,
              a === r ? (o = void 0) : ((ye = o), (o = r)),
              o !== r
                ? (e.length > ye
                    ? ((a = e.charAt(ye)), ye++)
                    : ((a = r), 0 === ke && Ne(h)),
                  a !== r ? (i = o = [o, a]) : ((ye = i), (i = r)))
                : ((ye = i), (i = r));
        else t = r;
        return (
          (n = t !== r ? e.substring(n, ye) : t),
          ke--,
          n === r && ((t = r), 0 === ke && Ne(f)),
          n
        );
      }
      function Be() {
        var n, t, i;
        return (
          ke++,
          (n = ye),
          47 === e.charCodeAt(ye)
            ? ((t = "/"), ye++)
            : ((t = r), 0 === ke && Ne(y)),
          t !== r && (i = Oe()) !== r
            ? ((ge = n), (n = t = i))
            : ((ye = n), (n = r)),
          ke--,
          n === r && ((t = r), 0 === ke && Ne(v)),
          n
        );
      }
      function Fe() {
        var e, n, t, i, o;
        if ((ke++, (e = ye), (n = Ue()) !== r))
          if ((t = Oe()) !== r) {
            for (i = [], o = Be(); o !== r; ) i.push(o), (o = Be());
            i !== r
              ? ((ge = e),
                (n = (function (e, n) {
                  return { stem: e, options: n };
                })(t, i)),
                (e = n))
              : ((ye = e), (e = r));
          } else (ye = e), (e = r);
        else (ye = e), (e = r);
        return ke--, e === r && ((n = r), 0 === ke && Ne(g)), e;
      }
      function ze() {
        var n, t, i, o;
        if (
          ((n = ye),
          39 === e.charCodeAt(ye)
            ? ((t = R), ye++)
            : ((t = r), 0 === ke && Ne(x)),
          t !== r)
        ) {
          if (
            ((i = []),
            (o = Ze()) === r &&
              (P.test(e.charAt(ye))
                ? ((o = e.charAt(ye)), ye++)
                : ((o = r), 0 === ke && Ne(N))),
            o !== r)
          )
            for (; o !== r; )
              i.push(o),
                (o = Ze()) === r &&
                  (P.test(e.charAt(ye))
                    ? ((o = e.charAt(ye)), ye++)
                    : ((o = r), 0 === ke && Ne(N)));
          else i = r;
          i !== r
            ? (39 === e.charCodeAt(ye)
                ? ((o = R), ye++)
                : ((o = r), 0 === ke && Ne(x)),
              o !== r ? (n = t = [t, i, o]) : ((ye = n), (n = r)))
            : ((ye = n), (n = r));
        } else (ye = n), (n = r);
        if (n === r)
          if (
            ((n = []),
            (t = Ze()) === r &&
              (M.test(e.charAt(ye))
                ? ((t = e.charAt(ye)), ye++)
                : ((t = r), 0 === ke && Ne(I))),
            t !== r)
          )
            for (; t !== r; )
              n.push(t),
                (t = Ze()) === r &&
                  (M.test(e.charAt(ye))
                    ? ((t = e.charAt(ye)), ye++)
                    : ((t = r), 0 === ke && Ne(I)));
          else n = r;
        return n;
      }
      function Ke() {
        var n, t;
        if (
          ((n = []),
          T.test(e.charAt(ye))
            ? ((t = e.charAt(ye)), ye++)
            : ((t = r), 0 === ke && Ne(L)),
          t !== r)
        )
          for (; t !== r; )
            n.push(t),
              T.test(e.charAt(ye))
                ? ((t = e.charAt(ye)), ye++)
                : ((t = r), 0 === ke && Ne(L));
        else n = r;
        return n;
      }
      function $e() {
        var n, t, i, o, a, u, f;
        return (
          (n = ye),
          Ue() !== r && (t = Xe()) !== r && Ue() !== r
            ? (123 === e.charCodeAt(ye)
                ? ((i = c), ye++)
                : ((i = r), 0 === ke && Ne(s)),
              i !== r
                ? ((ge = ye),
                  tn.push("select"),
                  (!0 ? void 0 : r) !== r && (o = Ie()) !== r
                    ? (125 === e.charCodeAt(ye)
                        ? ((a = l), ye++)
                        : ((a = r), 0 === ke && Ne(m)),
                      a !== r
                        ? ((ge = n),
                          (u = t),
                          (f = o),
                          tn.pop(),
                          (n = Ea({ id: u, value: f }, on())))
                        : ((ye = n), (n = r)))
                    : ((ye = n), (n = r)))
                : ((ye = n), (n = r)))
            : ((ye = n), (n = r)),
          n
        );
      }
      function je() {
        var n, t, i, o, a, u, f;
        return (
          (n = ye),
          Ue() !== r
            ? ((t = (function () {
                var n, t, i, o;
                return (
                  (n = ye),
                  (t = ye),
                  61 === e.charCodeAt(ye)
                    ? ((i = "="), ye++)
                    : ((i = r), 0 === ke && Ne(V)),
                  i !== r && (o = Ye()) !== r
                    ? (t = i = [i, o])
                    : ((ye = t), (t = r)),
                  (n = t !== r ? e.substring(n, ye) : t) === r && (n = Xe()),
                  n
                );
              })()),
              t !== r && Ue() !== r
                ? (123 === e.charCodeAt(ye)
                    ? ((i = c), ye++)
                    : ((i = r), 0 === ke && Ne(s)),
                  i !== r
                    ? ((ge = ye),
                      tn.push("plural"),
                      (!0 ? void 0 : r) !== r && (o = Ie()) !== r
                        ? (125 === e.charCodeAt(ye)
                            ? ((a = l), ye++)
                            : ((a = r), 0 === ke && Ne(m)),
                          a !== r
                            ? ((ge = n),
                              (u = t),
                              (f = o),
                              tn.pop(),
                              (n = Ea({ id: u, value: f }, on())))
                            : ((ye = n), (n = r)))
                        : ((ye = n), (n = r)))
                    : ((ye = n), (n = r)))
                : ((ye = n), (n = r)))
            : ((ye = n), (n = r)),
          n
        );
      }
      function He() {
        var n;
        return (
          ke++,
          J.test(e.charAt(ye))
            ? ((n = e.charAt(ye)), ye++)
            : ((n = r), 0 === ke && Ne(q)),
          ke--,
          n === r && 0 === ke && Ne(W),
          n
        );
      }
      function Ge() {
        var n;
        return (
          ke++,
          Q.test(e.charAt(ye))
            ? ((n = e.charAt(ye)), ye++)
            : ((n = r), 0 === ke && Ne(ee)),
          ke--,
          n === r && 0 === ke && Ne(X),
          n
        );
      }
      function Ue() {
        var n, t, i;
        for (ke++, n = ye, t = [], i = He(); i !== r; ) t.push(i), (i = He());
        return (
          (n = t !== r ? e.substring(n, ye) : t),
          ke--,
          n === r && ((t = r), 0 === ke && Ne(ne)),
          n
        );
      }
      function Ye() {
        var n, t, i, o, a;
        return (
          ke++,
          (n = ye),
          45 === e.charCodeAt(ye)
            ? ((t = "-"), ye++)
            : ((t = r), 0 === ke && Ne(re)),
          t === r && (t = null),
          t !== r && (i = qe()) !== r
            ? ((ge = n), (o = t), (n = t = (a = i) ? (o ? -a : a) : 0))
            : ((ye = n), (n = r)),
          ke--,
          n === r && ((t = r), 0 === ke && Ne(te)),
          n
        );
      }
      function Ze() {
        var n, t;
        return (
          ke++,
          (n = ye),
          e.substr(ye, 2) === oe
            ? ((t = oe), (ye += 2))
            : ((t = r), 0 === ke && Ne(ae)),
          t !== r && ((ge = n), (t = "'")),
          ke--,
          (n = t) === r && ((t = r), 0 === ke && Ne(ie)),
          n
        );
      }
      function Ve() {
        var n, t, i, o, a, u;
        if (
          ((n = ye),
          39 === e.charCodeAt(ye)
            ? ((t = R), ye++)
            : ((t = r), 0 === ke && Ne(x)),
          t !== r)
        )
          if (
            ((i = (function () {
              var n, t, i, o;
              (n = ye),
                (t = ye),
                e.length > ye
                  ? ((i = e.charAt(ye)), ye++)
                  : ((i = r), 0 === ke && Ne(h));
              i !== r
                ? ((ge = ye),
                  (o = (function (e) {
                    return "{" === e || "}" === e || (rn() && "#" === e);
                  })(i)),
                  (o = o ? void 0 : r) !== r
                    ? (t = i = [i, o])
                    : ((ye = t), (t = r)))
                : ((ye = t), (t = r));
              n = t !== r ? e.substring(n, ye) : t;
              return n;
            })()),
            i !== r)
          ) {
            for (
              o = ye,
                a = [],
                e.substr(ye, 2) === oe
                  ? ((u = oe), (ye += 2))
                  : ((u = r), 0 === ke && Ne(ae)),
                u === r &&
                  (P.test(e.charAt(ye))
                    ? ((u = e.charAt(ye)), ye++)
                    : ((u = r), 0 === ke && Ne(N)));
              u !== r;

            )
              a.push(u),
                e.substr(ye, 2) === oe
                  ? ((u = oe), (ye += 2))
                  : ((u = r), 0 === ke && Ne(ae)),
                u === r &&
                  (P.test(e.charAt(ye))
                    ? ((u = e.charAt(ye)), ye++)
                    : ((u = r), 0 === ke && Ne(N)));
            (o = a !== r ? e.substring(o, ye) : a) !== r
              ? (39 === e.charCodeAt(ye)
                  ? ((a = R), ye++)
                  : ((a = r), 0 === ke && Ne(x)),
                a === r && (a = null),
                a !== r
                  ? ((ge = n), (n = t = i + o.replace("''", "'")))
                  : ((ye = n), (n = r)))
              : ((ye = n), (n = r));
          } else (ye = n), (n = r);
        else (ye = n), (n = r);
        return n;
      }
      function We() {
        var n, t, i, o;
        return (
          (n = ye),
          (t = ye),
          e.length > ye
            ? ((i = e.charAt(ye)), ye++)
            : ((i = r), 0 === ke && Ne(h)),
          i !== r
            ? ((ge = ye),
              (o = (o = ue(i)) ? void 0 : r) !== r
                ? (t = i = [i, o])
                : ((ye = t), (t = r)))
            : ((ye = t), (t = r)),
          t === r &&
            (10 === e.charCodeAt(ye)
              ? ((t = "\n"), ye++)
              : ((t = r), 0 === ke && Ne(ce))),
          (n = t !== r ? e.substring(n, ye) : t)
        );
      }
      function Je() {
        var n, t;
        return (
          ke++,
          (n = ye),
          (t = qe()) === r && (t = Xe()),
          (n = t !== r ? e.substring(n, ye) : t),
          ke--,
          n === r && ((t = r), 0 === ke && Ne(se)),
          n
        );
      }
      function qe() {
        var n, t, i, o, a;
        if (
          (ke++,
          (n = ye),
          48 === e.charCodeAt(ye)
            ? ((t = "0"), ye++)
            : ((t = r), 0 === ke && Ne(me)),
          t !== r && ((ge = n), (t = 0)),
          (n = t) === r)
        ) {
          if (
            ((n = ye),
            (t = ye),
            fe.test(e.charAt(ye))
              ? ((i = e.charAt(ye)), ye++)
              : ((i = r), 0 === ke && Ne(de)),
            i !== r)
          ) {
            for (
              o = [],
                pe.test(e.charAt(ye))
                  ? ((a = e.charAt(ye)), ye++)
                  : ((a = r), 0 === ke && Ne(he));
              a !== r;

            )
              o.push(a),
                pe.test(e.charAt(ye))
                  ? ((a = e.charAt(ye)), ye++)
                  : ((a = r), 0 === ke && Ne(he));
            o !== r ? (t = i = [i, o]) : ((ye = t), (t = r));
          } else (ye = t), (t = r);
          t !== r && ((ge = n), (t = k(t.join(""), 10))), (n = t);
        }
        return ke--, n === r && ((t = r), 0 === ke && Ne(le)), n;
      }
      function Xe() {
        var n, t, i, o, a;
        if (
          (ke++,
          (n = ye),
          (t = []),
          (i = ye),
          (o = ye),
          ke++,
          (a = He()) === r && (a = Ge()),
          ke--,
          a === r ? (o = void 0) : ((ye = o), (o = r)),
          o !== r
            ? (e.length > ye
                ? ((a = e.charAt(ye)), ye++)
                : ((a = r), 0 === ke && Ne(h)),
              a !== r ? (i = o = [o, a]) : ((ye = i), (i = r)))
            : ((ye = i), (i = r)),
          i !== r)
        )
          for (; i !== r; )
            t.push(i),
              (i = ye),
              (o = ye),
              ke++,
              (a = He()) === r && (a = Ge()),
              ke--,
              a === r ? (o = void 0) : ((ye = o), (o = r)),
              o !== r
                ? (e.length > ye
                    ? ((a = e.charAt(ye)), ye++)
                    : ((a = r), 0 === ke && Ne(h)),
                  a !== r ? (i = o = [o, a]) : ((ye = i), (i = r)))
                : ((ye = i), (i = r));
        else t = r;
        return (
          (n = t !== r ? e.substring(n, ye) : t),
          ke--,
          n === r && ((t = r), 0 === ke && Ne(ve)),
          n
        );
      }
      var Qe,
        en,
        nn,
        tn = ["root"];
      function rn() {
        return "plural" === tn[tn.length - 1];
      }
      function on() {
        return n && n.captureLocation ? { location: Ee() } : {};
      }
      if ((t = o()) !== r && ye === e.length) return t;
      throw (
        (t !== r && ye < e.length && Ne({ type: "end" }),
        (Qe = we),
        (en = be < e.length ? e.charAt(be) : null),
        (nn = be < e.length ? Pe(be, be + 1) : Pe(be, be)),
        new Aa(Aa.buildMessage(Qe, en), Qe, en, nn))
      );
    },
    Da = function () {
      for (var e = 0, n = 0, t = arguments.length; n < t; n++)
        e += arguments[n].length;
      var r = d(e),
        i = 0;
      for (n = 0; n < t; n++)
        for (var o = arguments[n], a = 0, u = o.length; a < u; a++, i++)
          r[i] = o[a];
      return r;
    },
    Ra = /(^|[^\\])#/g;
  function xa(e) {
    e.forEach(function (e) {
      (ga(e) || ya(e)) &&
        p.keys(e.options).forEach(function (n) {
          for (
            var t, r = e.options[n], i = -1, o = void 0, a = 0;
            a < r.value.length;
            a++
          ) {
            var u = r.value[a];
            if (fa(u) && Ra.test(u.value)) {
              (i = a), (o = u);
              break;
            }
          }
          if (o) {
            var c = o.value.replace(Ra, "$1{" + e.value + ", number}"),
              s = Ca(c);
            (t = r.value).splice.apply(t, Da([i, 1], s));
          }
          xa(r.value);
        });
    });
  }
  var Pa = function () {
      return (
        (Pa =
          p.assign ||
          function (e) {
            for (var n, t = 1, r = arguments.length; t < r; t++)
              for (var i in (n = arguments[t]))
                p.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
            return e;
          }),
        Pa.apply(this, arguments)
      );
    },
    Na =
      /(?:[Eec]{1,6}|G{1,5}|[Qq]{1,5}|(?:[yYur]+|U{1,5})|[ML]{1,5}|d{1,2}|D{1,3}|F{1}|[abB]{1,5}|[hkHK]{1,2}|w{1,2}|W{1}|m{1,2}|s{1,2}|[zZOvVxX]{1,4})(?=([^']*'[^']*')*[^']*$)/g;
  function Ma(e) {
    var n = {};
    return (
      e.replace(Na, function (e) {
        var t = e.length;
        switch (e[0]) {
          case "G":
            n.era = 4 === t ? "long" : 5 === t ? "narrow" : "short";
            break;
          case "y":
            n.year = 2 === t ? "2-digit" : "numeric";
            break;
          case "Y":
          case "u":
          case "U":
          case "r":
            throw new RangeError(
              "`Y/u/U/r` (year) patterns are not supported, use `y` instead"
            );
          case "q":
          case "Q":
            throw new RangeError("`q/Q` (quarter) patterns are not supported");
          case "M":
          case "L":
            n.month = ["numeric", "2-digit", "short", "long", "narrow"][t - 1];
            break;
          case "w":
          case "W":
            throw new RangeError("`w/W` (week) patterns are not supported");
          case "d":
            n.day = ["numeric", "2-digit"][t - 1];
            break;
          case "D":
          case "F":
          case "g":
            throw new RangeError(
              "`D/F/g` (day) patterns are not supported, use `d` instead"
            );
          case "E":
            n.weekday = 4 === t ? "short" : 5 === t ? "narrow" : "short";
            break;
          case "e":
            if (t < 4)
              throw new RangeError(
                "`e..eee` (weekday) patterns are not supported"
              );
            n.weekday = ["short", "long", "narrow", "short"][t - 4];
            break;
          case "c":
            if (t < 4)
              throw new RangeError(
                "`c..ccc` (weekday) patterns are not supported"
              );
            n.weekday = ["short", "long", "narrow", "short"][t - 4];
            break;
          case "a":
            n.hour12 = !0;
            break;
          case "b":
          case "B":
            throw new RangeError(
              "`b/B` (period) patterns are not supported, use `a` instead"
            );
          case "h":
            (n.hourCycle = "h12"), (n.hour = ["numeric", "2-digit"][t - 1]);
            break;
          case "H":
            (n.hourCycle = "h23"), (n.hour = ["numeric", "2-digit"][t - 1]);
            break;
          case "K":
            (n.hourCycle = "h11"), (n.hour = ["numeric", "2-digit"][t - 1]);
            break;
          case "k":
            (n.hourCycle = "h24"), (n.hour = ["numeric", "2-digit"][t - 1]);
            break;
          case "j":
          case "J":
          case "C":
            throw new RangeError(
              "`j/J/C` (hour) patterns are not supported, use `h/H/K/k` instead"
            );
          case "m":
            n.minute = ["numeric", "2-digit"][t - 1];
            break;
          case "s":
            n.second = ["numeric", "2-digit"][t - 1];
            break;
          case "S":
          case "A":
            throw new RangeError(
              "`S/A` (second) pattenrs are not supported, use `s` instead"
            );
          case "z":
            n.timeZoneName = t < 4 ? "short" : "long";
            break;
          case "Z":
          case "O":
          case "v":
          case "V":
          case "X":
          case "x":
            throw new RangeError(
              "`Z/O/v/V/X/x` (timeZone) pattenrs are not supported, use `z` instead"
            );
        }
        return "";
      }),
      n
    );
  }
  var Ia = /^\.(?:(0+)(\+|#+)?)?$/g,
    Ta = /^(@+)?(\+|#+)?$/g;
  function La(e) {
    var n = {};
    return (
      e.replace(Ta, function (e, t, r) {
        return (
          "string" != typeof r
            ? ((n.minimumSignificantDigits = t.length),
              (n.maximumSignificantDigits = t.length))
            : "+" === r
            ? (n.minimumSignificantDigits = t.length)
            : "#" === t[0]
            ? (n.maximumSignificantDigits = t.length)
            : ((n.minimumSignificantDigits = t.length),
              (n.maximumSignificantDigits =
                t.length + ("string" == typeof r ? r.length : 0))),
          ""
        );
      }),
      n
    );
  }
  function Oa(e) {
    switch (e) {
      case "sign-auto":
        return { signDisplay: "auto" };
      case "sign-accounting":
        return { currencySign: "accounting" };
      case "sign-always":
        return { signDisplay: "always" };
      case "sign-accounting-always":
        return { signDisplay: "always", currencySign: "accounting" };
      case "sign-except-zero":
        return { signDisplay: "exceptZero" };
      case "sign-accounting-except-zero":
        return { signDisplay: "exceptZero", currencySign: "accounting" };
      case "sign-never":
        return { signDisplay: "never" };
    }
  }
  function Ba(e) {
    var n = Oa(e);
    return n || {};
  }
  function Fa(e) {
    for (var n = {}, t = 0, r = e; t < r.length; t++) {
      var i = r[t];
      switch (i.stem) {
        case "percent":
          n.style = "percent";
          continue;
        case "currency":
          (n.style = "currency"), (n.currency = i.options[0]);
          continue;
        case "group-off":
          n.useGrouping = !1;
          continue;
        case "precision-integer":
          n.maximumFractionDigits = 0;
          continue;
        case "measure-unit":
          (n.style = "unit"), (n.unit = i.options[0].replace(/^(.*?)-/, ""));
          continue;
        case "compact-short":
          (n.notation = "compact"), (n.compactDisplay = "short");
          continue;
        case "compact-long":
          (n.notation = "compact"), (n.compactDisplay = "long");
          continue;
        case "scientific":
          n = Pa(
            Pa(Pa({}, n), { notation: "scientific" }),
            i.options.reduce(function (e, n) {
              return Pa(Pa({}, e), Ba(n));
            }, {})
          );
          continue;
        case "engineering":
          n = Pa(
            Pa(Pa({}, n), { notation: "engineering" }),
            i.options.reduce(function (e, n) {
              return Pa(Pa({}, e), Ba(n));
            }, {})
          );
          continue;
        case "notation-simple":
          n.notation = "standard";
          continue;
        case "unit-width-narrow":
          (n.currencyDisplay = "narrowSymbol"), (n.unitDisplay = "narrow");
          continue;
        case "unit-width-short":
          (n.currencyDisplay = "code"), (n.unitDisplay = "short");
          continue;
        case "unit-width-full-name":
          (n.currencyDisplay = "name"), (n.unitDisplay = "long");
          continue;
        case "unit-width-iso-code":
          n.currencyDisplay = "symbol";
          continue;
      }
      if (Ia.test(i.stem)) {
        if (i.options.length > 1)
          throw new RangeError(
            "Fraction-precision stems only accept a single optional option"
          );
        i.stem.replace(Ia, function (e, t, r) {
          return (
            "." === e
              ? (n.maximumFractionDigits = 0)
              : "+" === r
              ? (n.minimumFractionDigits = r.length)
              : "#" === t[0]
              ? (n.maximumFractionDigits = t.length)
              : ((n.minimumFractionDigits = t.length),
                (n.maximumFractionDigits =
                  t.length + ("string" == typeof r ? r.length : 0))),
            ""
          );
        }),
          i.options.length && (n = Pa(Pa({}, n), La(i.options[0])));
      } else if (Ta.test(i.stem)) n = Pa(Pa({}, n), La(i.stem));
      else {
        var o = Oa(i.stem);
        o && (n = Pa(Pa({}, n), o));
      }
    }
    return n;
  }
  function za(e, n) {
    var t = Ca(e, n);
    return (n && !1 === n.normalizeHashtagInPlural) || xa(t), t;
  }
  var Ka = function () {
    for (var e = 0, n = 0, t = arguments.length; n < t; n++)
      e += arguments[n].length;
    var r = d(e),
      i = 0;
    for (n = 0; n < t; n++)
      for (var o = arguments[n], a = 0, u = o.length; a < u; a++, i++)
        r[i] = o[a];
    return r;
  };
  function $a(e) {
    return JSON.stringify(
      e.map(function (e) {
        return e && "object" == typeof e
          ? (function (e) {
              return p
                .keys(e)
                .sort()
                .map(function (n) {
                  var t;
                  return ((t = {})[n] = e[n]), t;
                });
            })(e)
          : e;
      })
    );
  }
  var ja,
    Ha = function (e, n) {
      return (
        void 0 === n && (n = {}),
        function () {
          for (var t, r = [], i = 0; i < arguments.length; i++)
            r[i] = arguments[i];
          var o = $a(r),
            a = o && n[o];
          return (
            a ||
              ((a = new ((t = e).bind.apply(t, Ka([void 0], r)))()),
              o && (n[o] = a)),
            a
          );
        }
      );
    },
    Ga = (function () {
      var e = function (n, t) {
        return (
          (e =
            p.setPrototypeOf ||
            ({ __proto__: [] } instanceof d &&
              function (e, n) {
                e.__proto__ = n;
              }) ||
            function (e, n) {
              for (var t in n) n.hasOwnProperty(t) && (e[t] = n[t]);
            }),
          e(n, t)
        );
      };
      return function (n, t) {
        function r() {
          this.constructor = n;
        }
        e(n, t),
          (n.prototype =
            null === t ? p.create(t) : ((r.prototype = t.prototype), new r()));
      };
    })(),
    Ua = function () {
      for (var e = 0, n = 0, t = arguments.length; n < t; n++)
        e += arguments[n].length;
      var r = d(e),
        i = 0;
      for (n = 0; n < t; n++)
        for (var o = arguments[n], a = 0, u = o.length; a < u; a++, i++)
          r[i] = o[a];
      return r;
    },
    Ya = (function (e) {
      function n(n, t) {
        var r = e.call(this, n) || this;
        return (r.variableId = t), r;
      }
      return Ga(n, e), n;
    })(Error);
  function Za(e, n, t, r, i, o, a) {
    if (1 === e.length && fa(e[0])) return [{ type: 0, value: e[0].value }];
    for (var u, c = [], s = 0, l = e; s < l.length; s++) {
      var m = l[s];
      if (fa(m)) c.push({ type: 0, value: m.value });
      else if (_a(m))
        "number" == typeof o &&
          c.push({ type: 0, value: t.getNumberFormat(n).format(o) });
      else {
        var f = m.value;
        if (!i || !(f in i))
          throw new Ya(
            'The intl string context variable "' +
              f +
              '" was not provided to the string "' +
              a +
              '"'
          );
        var d = i[f];
        if (da(m))
          (d && "string" != typeof d && "number" != typeof d) ||
            (d = "string" == typeof d || "number" == typeof d ? h(d) : ""),
            c.push({ type: 1, value: d });
        else if (ha(m)) {
          var v = "string" == typeof m.style ? r.date[m.style] : void 0;
          c.push({ type: 0, value: t.getDateTimeFormat(n, v).format(d) });
        } else if (va(m)) {
          v =
            "string" == typeof m.style
              ? r.time[m.style]
              : wa(m.style)
              ? Ma(m.style.pattern)
              : void 0;
          c.push({ type: 0, value: t.getDateTimeFormat(n, v).format(d) });
        } else if (pa(m)) {
          v =
            "string" == typeof m.style
              ? r.number[m.style]
              : ba(m.style)
              ? Fa(m.style.tokens)
              : void 0;
          c.push({ type: 0, value: t.getNumberFormat(n, v).format(d) });
        } else if (ya(m)) {
          if (!(y = m.options[d] || m.options.other))
            throw new RangeError(
              'Invalid values for "' +
                m.value +
                '": "' +
                d +
                '". Options are "' +
                p.keys(m.options).join('", "') +
                '"'
            );
          c.push.apply(c, Za(y.value, n, t, r, i));
        } else if (ga(m)) {
          var y;
          if (!(y = m.options["=" + d])) {
            if (!Intl.PluralRules)
              throw new Ya(
                'Intl.PluralRules is not available in this environment.\nTry polyfilling it using "@formatjs/intl-pluralrules"\n'
              );
            var g = t
              .getPluralRules(n, { type: m.pluralType })
              .select(d - (m.offset || 0));
            y = m.options[g] || m.options.other;
          }
          if (!y)
            throw new RangeError(
              'Invalid values for "' +
                m.value +
                '": "' +
                d +
                '". Options are "' +
                p.keys(m.options).join('", "') +
                '"'
            );
          c.push.apply(c, Za(y.value, n, t, r, i, d - (m.offset || 0)));
        } else;
      }
    }
    return (u = c).length < 2
      ? u
      : u.reduce(function (e, n) {
          var t = e[e.length - 1];
          return (
            t && 0 === t.type && 0 === n.type
              ? (t.value += n.value)
              : e.push(n),
            e
          );
        }, []);
  }
  var Va = /@@(\d+_\d+)@@/g,
    Wa = 0;
  function Ja(e, n) {
    return e
      .split(Va)
      .filter(f)
      .map(function (e) {
        return null != n[e] ? n[e] : e;
      })
      .reduce(function (e, n) {
        return (
          e.length && "string" == typeof n && "string" == typeof e[e.length - 1]
            ? (e[e.length - 1] += n)
            : e.push(n),
          e
        );
      }, []);
  }
  var qa =
      /(<([0-9a-zA-Z-_]*?)>(.*?)<\/([0-9a-zA-Z-_]*?)>)|(<[0-9a-zA-Z-_]*?\/>)/,
    Xa = y.now() + "@@",
    Qa = [
      "area",
      "base",
      "br",
      "col",
      "embed",
      "hr",
      "img",
      "input",
      "link",
      "meta",
      "param",
      "source",
      "track",
      "wbr",
    ];
  function eu(e, n, t) {
    var r = e.tagName,
      i = e.outerHTML,
      o = e.textContent,
      a = e.childNodes;
    if (!r) return Ja(o || "", n);
    r = r.toLowerCase();
    var u = ~Qa.indexOf(r),
      c = t[r];
    if (c && u)
      throw new Ya(
        r +
          " is a self-closing tag and can not be used, please use another tag name."
      );
    if (!a.length) return [i];
    var s = d.prototype.slice.call(a).reduce(function (e, r) {
      return e.concat(eu(r, n, t));
    }, []);
    return c
      ? "function" == typeof c
        ? [c.apply(void 0, s)]
        : [c]
      : Ua(["<" + r + ">"], s, ["</" + r + ">"]);
  }
  function nu(e, n, t, r, i, o) {
    var a = Za(e, n, t, r, i, void 0, o),
      u = {},
      c = a.reduce(function (e, n) {
        if (0 === n.type) return e + n.value;
        var t = y.now() + "_" + ++Wa;
        return (u[t] = n.value), e + "@@" + t + "@@";
      }, "");
    if (!qa.test(c)) return Ja(c, u);
    if (!i) throw new Ya("Message has placeholders but no values was given");
    if ("undefined" == typeof DOMParser)
      throw new Ya("Cannot format XML message without DOMParser");
    ja || (ja = new DOMParser());
    var s = ja
      .parseFromString(
        '<formatted-message id="' + Xa + '">' + c + "</formatted-message>",
        "text/html"
      )
      .getElementById(Xa);
    if (!s) throw new Ya("Malformed HTML message " + c);
    var l = p.keys(i).filter(function (e) {
      return !!s.getElementsByTagName(e).length;
    });
    if (!l.length) return Ja(c, u);
    var m = l.filter(function (e) {
      return e !== e.toLowerCase();
    });
    if (m.length)
      throw new Ya(
        "HTML tag must be lowercased but the following tags are not: " +
          m.join(", ")
      );
    return d.prototype.slice.call(s.childNodes).reduce(function (e, n) {
      return e.concat(eu(n, u, i));
    }, []);
  }
  var tu = function () {
    return (
      (tu =
        p.assign ||
        function (e) {
          for (var n, t = 1, r = arguments.length; t < r; t++)
            for (var i in (n = arguments[t]))
              p.prototype.hasOwnProperty.call(n, i) && (e[i] = n[i]);
          return e;
        }),
      tu.apply(this, arguments)
    );
  };
  function ru(e, n) {
    return n
      ? p.keys(e).reduce(function (t, r) {
          var i, o;
          return (
            (t[r] =
              ((i = e[r]),
              (o = n[r])
                ? tu(
                    tu(tu({}, i || {}), o || {}),
                    p.keys(i).reduce(function (e, n) {
                      return (e[n] = tu(tu({}, i[n]), o[n] || {})), e;
                    }, {})
                  )
                : i)),
            t
          );
        }, tu({}, e))
      : e;
  }
  var iu,
    ou = (function () {
      function e(n, t, r, i) {
        var o,
          a = this;
        if (
          (void 0 === t && (t = e.defaultLocale),
          (this.formatterCache = { number: {}, dateTime: {}, pluralRules: {} }),
          (this.format = function (e) {
            return (function (e, n, t, r, i, o) {
              var a = Za(e, n, t, r, i, void 0, o);
              return 1 === a.length
                ? a[0].value
                : a.reduce(function (e, n) {
                    return e + n.value;
                  }, "");
            })(a.ast, a.locales, a.formatters, a.formats, e, a.message);
          }),
          (this.formatToParts = function (e) {
            return Za(
              a.ast,
              a.locales,
              a.formatters,
              a.formats,
              e,
              void 0,
              a.message
            );
          }),
          (this.formatHTMLMessage = function (e) {
            return nu(a.ast, a.locales, a.formatters, a.formats, e, a.message);
          }),
          (this.resolvedOptions = function () {
            return {
              locale: Intl.NumberFormat.supportedLocalesOf(a.locales)[0],
            };
          }),
          (this.getAst = function () {
            return a.ast;
          }),
          "string" == typeof n)
        ) {
          if (((this.message = n), !e.__parse))
            throw new D(
              "IntlMessageFormat.__parse must be set to process `message` of type `string`"
            );
          this.ast = e.__parse(n, { normalizeHashtagInPlural: !1 });
        } else this.ast = n;
        if (!d.isArray(this.ast))
          throw new D("A message must be provided as a String or AST.");
        (this.formats = ru(e.formats, r)),
          (this.locales = t),
          (this.formatters =
            (i && i.formatters) ||
            (void 0 === (o = this.formatterCache) &&
              (o = { number: {}, dateTime: {}, pluralRules: {} }),
            {
              getNumberFormat: Ha(Intl.NumberFormat, o.number),
              getDateTimeFormat: Ha(Intl.DateTimeFormat, o.dateTime),
              getPluralRules: Ha(Intl.PluralRules, o.pluralRules),
            }));
      }
      return (
        (e.defaultLocale = new Intl.NumberFormat().resolvedOptions().locale),
        (e.__parse = za),
        (e.formats = {
          number: {
            currency: { style: "currency" },
            percent: { style: "percent" },
          },
          date: {
            short: { month: "numeric", day: "numeric", year: "2-digit" },
            medium: { month: "short", day: "numeric", year: "numeric" },
            long: { month: "long", day: "numeric", year: "numeric" },
            full: {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            },
          },
          time: {
            short: { hour: "numeric", minute: "numeric" },
            medium: { hour: "numeric", minute: "numeric", second: "numeric" },
            long: {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              timeZoneName: "short",
            },
            full: {
              hour: "numeric",
              minute: "numeric",
              second: "numeric",
              timeZoneName: "short",
            },
          },
        }),
        e
      );
    })(),
    au = function e(n, t) {
      void 0 === t && (t = "");
      var r = {};
      for (var i in n) {
        var o = t + i;
        "object" == typeof n[i] ? p.assign(r, e(n[i], o + ".")) : (r[o] = n[i]);
      }
      return r;
    },
    uu = rn({});
  function cu(e) {
    return e in iu;
  }
  function su(e) {
    return null == e || cu(e) ? e : su(Au(e));
  }
  function lu(e) {
    for (
      var n = arguments.length, t = new d(n > 1 ? n - 1 : 0), r = 1;
      r < n;
      r++
    )
      t[r - 1] = arguments[r];
    var i = t.map(function (e) {
      return au(e);
    });
    uu.update(function (n) {
      return (n[e] = p.assign.apply(p, [n[e] || {}].concat(ye(i)))), n;
    });
  }
  on([uu], function (e) {
    var n = e[0];
    return p.keys(n);
  }),
    uu.subscribe(function (e) {
      return (iu = e);
    });
  var mu = {};
  function fu(e) {
    return mu[e];
  }
  function du(e) {
    return Cu(e)
      .reverse()
      .some(function (e) {
        var n;
        return null === (n = fu(e)) || void 0 === n ? void 0 : n.size;
      });
  }
  function pu(e, n) {
    return Promise.all(
      n.map(function (n) {
        return (
          (function (e, n) {
            mu[e].delete(n), 0 === mu[e].size && delete mu[e];
          })(e, n),
          n().then(function (e) {
            return e.default || e;
          })
        );
      })
    ).then(function (n) {
      return lu.apply(void 0, [e].concat(ye(n)));
    });
  }
  var hu = {};
  function vu(e) {
    if (!du(e)) return e in hu ? hu[e] : void 0;
    var n = (function (e) {
      return Cu(e)
        .reverse()
        .map(function (e) {
          var n = fu(e);
          return [e, n ? ye(n) : []];
        })
        .filter(function (e) {
          return e[1].length > 0;
        });
    })(e);
    return (
      (hu[e] = Promise.all(
        n.map(function (e) {
          return pu(e[0], e[1]);
        })
      ).then(function () {
        if (du(e)) return vu(e);
        delete hu[e];
      })),
      hu[e]
    );
  }
  function yu(e, n) {
    var t = {};
    for (var r in e)
      p.prototype.hasOwnProperty.call(e, r) &&
        n.indexOf(r) < 0 &&
        (t[r] = e[r]);
    if (null != e && "function" == typeof p.getOwnPropertySymbols) {
      var i = 0;
      for (r = p.getOwnPropertySymbols(e); i < r.length; i++)
        n.indexOf(r[i]) < 0 &&
          p.prototype.propertyIsEnumerable.call(e, r[i]) &&
          (t[r[i]] = e[r[i]]);
    }
    return t;
  }
  var gu = {
    fallbackLocale: null,
    initialLocale: null,
    loadingDelay: 200,
    formats: {
      number: {
        scientific: { notation: "scientific" },
        engineering: { notation: "engineering" },
        compactLong: { notation: "compact", compactDisplay: "long" },
        compactShort: { notation: "compact", compactDisplay: "short" },
      },
      date: {
        short: { month: "numeric", day: "numeric", year: "2-digit" },
        medium: { month: "short", day: "numeric", year: "numeric" },
        long: { month: "long", day: "numeric", year: "numeric" },
        full: {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        },
      },
      time: {
        short: { hour: "numeric", minute: "numeric" },
        medium: { hour: "numeric", minute: "numeric", second: "numeric" },
        long: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short",
        },
        full: {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
          timeZoneName: "short",
        },
      },
    },
    warnOnMissingMessages: !0,
  };
  function _u() {
    return gu;
  }
  var bu,
    wu = rn(!1),
    ku = rn(null);
  function Su(e, n) {
    return 0 === n.indexOf(e) && e !== n;
  }
  function Eu(e, n) {
    return e === n || Su(e, n) || Su(n, e);
  }
  function Au(e) {
    var n = e.lastIndexOf("-");
    if (n > 0) return e.slice(0, n);
    var t = _u().fallbackLocale;
    return t && !Eu(e, t) ? t : null;
  }
  function Cu(e) {
    var n = e.split("-").map(function (e, n, t) {
        return t.slice(0, n + 1).join("-");
      }),
      t = _u().fallbackLocale;
    return t && !Eu(e, t) ? n.concat(Cu(t)) : n;
  }
  function Du() {
    return bu;
  }
  ku.subscribe(function (e) {
    (bu = e),
      "undefined" != typeof window && m.documentElement.setAttribute("lang", e);
  });
  var Ru = ku.set;
  (ku.set = function (e) {
    if (su(e) && du(e)) {
      var n,
        t = _u().loadingDelay;
      return (
        "undefined" != typeof window && null != Du() && t
          ? (n = window.setTimeout(function () {
              return wu.set(!0);
            }, t))
          : wu.set(!0),
        vu(e)
          .then(function () {
            Ru(e);
          })
          .finally(function () {
            w(n), wu.set(!1);
          })
      );
    }
    return Ru(e);
  }),
    (ku.update = function (e) {
      return Ru(e(bu));
    });
  var xu = {},
    Pu = function e(n, t) {
      if (null == t) return null;
      var r = (function (e, n) {
        if (cu(e)) {
          var t = (function (e) {
            return iu[e] || null;
          })(e);
          if (n in t) return t[n];
        }
        return null;
      })(t, n);
      return r || e(n, Au(t));
    },
    Nu = function (e) {
      var n = p.create(null);
      return function (t) {
        var r = JSON.stringify(t);
        return r in n ? n[r] : (n[r] = e(t));
      };
    },
    Mu = function (e, n) {
      var t = _u().formats;
      if (e in t && n in t[e]) return t[e][n];
      throw new Error('[svelte-i18n] Unknown "' + n + '" ' + e + " format.");
    },
    Iu = Nu(function (e) {
      var n = e.locale,
        t = e.format,
        r = yu(e, ["locale", "format"]);
      if (null == n)
        throw new Error(
          '[svelte-i18n] A "locale" must be set to format numbers'
        );
      return t && (r = Mu("number", t)), new Intl.NumberFormat(n, r);
    }),
    Tu = Nu(function (e) {
      var n = e.locale,
        t = e.format,
        r = yu(e, ["locale", "format"]);
      if (null == n)
        throw new Error('[svelte-i18n] A "locale" must be set to format dates');
      return (
        t
          ? (r = Mu("date", t))
          : 0 === p.keys(r).length && (r = Mu("date", "short")),
        new Intl.DateTimeFormat(n, r)
      );
    }),
    Lu = Nu(function (e) {
      var n = e.locale,
        t = e.format,
        r = yu(e, ["locale", "format"]);
      if (null == n)
        throw new Error(
          '[svelte-i18n] A "locale" must be set to format time values'
        );
      return (
        t
          ? (r = Mu("time", t))
          : 0 === p.keys(r).length && (r = Mu("time", "short")),
        new Intl.DateTimeFormat(n, r)
      );
    }),
    Ou = Nu(function (e, n) {
      return void 0 === n && (n = Du()), new ou(e, n, _u().formats);
    }),
    Bu = function (e, n) {
      void 0 === n && (n = {}), "object" == typeof e && (e = (n = e).id);
      var t = n,
        r = t.values,
        i = t.locale,
        o = void 0 === i ? Du() : i,
        a = t.default;
      if (null == o)
        throw new Error(
          "[svelte-i18n] Cannot format a message without first setting the initial locale."
        );
      var u = (function (e, n) {
        if (n in xu && e in xu[n]) return xu[n][e];
        var t = Pu(e, n);
        return t
          ? (function (e, n, t) {
              return t
                ? (n in xu || (xu[n] = {}), e in xu[n] || (xu[n][e] = t), t)
                : t;
            })(e, n, t)
          : null;
      })(e, o);
      return u
        ? r
          ? Ou(u, o).format(r)
          : u
        : (_u().warnOnMissingMessages, a || e);
    },
    Fu = function (e, n) {
      return (function (e) {
        void 0 === e && (e = {});
        var n = e.locale,
          t = void 0 === n ? Du() : n,
          r = yu(e, ["locale"]);
        return Lu(p.assign({ locale: t }, r));
      })(n).format(e);
    },
    zu = function (e, n) {
      return (function (e) {
        void 0 === e && (e = {});
        var n = e.locale,
          t = void 0 === n ? Du() : n,
          r = yu(e, ["locale"]);
        return Tu(p.assign({ locale: t }, r));
      })(n).format(e);
    },
    Ku = function (e, n) {
      return (function (e) {
        void 0 === e && (e = {});
        var n = e.locale,
          t = void 0 === n ? Du() : n,
          r = yu(e, ["locale"]);
        return Iu(p.assign({ locale: t }, r));
      })(n).format(e);
    },
    $u = on([ku, uu], function () {
      return Bu;
    });
  on([ku], function () {
    return Fu;
  }),
    on([ku], function () {
      return zu;
    }),
    on([ku], function () {
      return Ku;
    });
  var ju = (function () {
      function e() {
        (this.store = rn({ amount: Mn(), currency: In() })),
          (this.stateMap = rn({ "default-tab": { show: !0 } })),
          (this.activeCTAScreen = rn("")),
          (this.backupCTAState = { show: !0 });
      }
      return (
        (e.prototype.setActiveCTAScreen = function (e) {
          this.activeCTAScreen.set(e);
        }),
        (e.prototype.getActiveState = function () {
          return Ce(this.stateMap)[Ce(this.activeCTAScreen)] || {};
        }),
        (e.prototype.triggerAction = function () {
          for (var e = [], n = 0; n < arguments.length; n++)
            e[n] = arguments[n];
          var t = this.getActiveState().onSubmit;
          "function" == typeof t && t.apply(void 0, e);
        }),
        (e.prototype.setCurrency = function (e) {
          this.store.update(function (n) {
            return te(te({}, n), { currency: e });
          });
        }),
        (e.prototype.setAmount = function (e, n) {
          this.store.update(function (t) {
            return te(te({}, t), {
              amount: e,
              currency: n || t.currency || In(),
              rawAmount: "",
            });
          });
        }),
        (e.prototype.setRawAmount = function (e) {
          this.store.update(function (n) {
            return te(te({}, n), { rawAmount: e });
          });
        }),
        (e.prototype.setState = function (e, n) {
          void 0 === e && (e = {}),
            void 0 === n && (n = "default-tab"),
            this.stateMap.update(function (t) {
              var r;
              return te(
                te({}, t),
                (((r = {})[n] = te(te({}, t[n] || {}), e)), r)
              );
            });
        }),
        (e.prototype.isCTAShown = function () {
          return this.getActiveState().show;
        }),
        (e.prototype.onViewDetailsClick = function () {
          var e = this.getActiveState().onViewDetailsClick;
          "function" == typeof e && e();
        }),
        e
      );
    })(),
    Hu = new ju(),
    Gu = {},
    Uu = function (e) {
      return void 0 === e && (e = Nr.id), Gu[e];
    },
    Yu = rn(null),
    Zu = rn(0),
    Vu = rn(0);
  Zu.subscribe(function (e) {
    e && Uu().setAmount(e, !0);
  });
  var Wu = rn(0),
    Ju = rn(0),
    qu = rn(0),
    Xu = rn(0);
  rn(null).subscribe(function (e) {
    !0 === e ? Zu.set(Ce(Zu) + Ce(Xu)) : !1 === e && Zu.set(Ce(Zu) - Ce(Xu));
  }),
    rn(null).subscribe(function (e) {
      !0 === e
        ? Zu.set(Ce(Wu) - Ce(Ju) + Ce(Yu))
        : !1 === e && Zu.set(Ce(Zu) - Ce(Yu));
    });
  Yu.subscribe(function (e) {
    !(function (e) {
      var n = Ce(Wu),
        t = Ce(Ju);
      e && Ce(qu) && t < n
        ? Ju.set(n)
        : !e && n && t === n && (Ju.set(n - 100), qu.set(100));
    })(e),
      Zu.set(Ce(Wu) - Ce(Ju) + (e || 0));
  });
  var Qu = rn("");
  rn(""), rn(""), rn("");
  var ec = rn(!0);
  rn("c3ds"),
    rn(null),
    rn(null),
    rn(!1),
    rn(""),
    rn(""),
    rn(""),
    rn(""),
    rn(!1);
  rn(!0), rn({}), rn({}), rn(null), rn(null), rn(null);
  var nc = on(Qu, no);
  rn(null);
  var tc = on(Qu, Qi),
    rc = rn(""),
    ic = on([Qu, nc], function (e) {
      var n = e[0];
      return "maestro" === e[1] && n.length > 5;
    });
  on([ic, rn(!1)], function (e) {
    var n = e[0],
      t = e[1];
    return n && t;
  }),
    rn(!1),
    rn(""),
    rn(""),
    rn(!1),
    rn(!0),
    null == Oo || Oo.subscribe(ec.set);
  var oc,
    ac = rn();
  rn(!1),
    rn(!1),
    ac.subscribe(function (e) {
      var n = Tn();
      if (n) {
        var t = Ce(e && n ? Wu : Zu);
        if (e) {
          if (n) t = t + (Ce(Yu) || 0) - (Ce(Ju) || 0);
          var r = e.original_amount - e.amount || 0;
          (t -= r), Vu.set(r);
        } else (t += Ce(Vu)), Vu.set(0);
        Zu.set(t);
      }
    });
  var uc = on([ac, tc, rc], function (e, n) {
    var t = e[0],
      r = e[1],
      i = e[2];
    if (
      (n(!0),
      oc && oc.abort(),
      "card" === i &&
        t &&
        ("CRED_experimental_offer" !== (null == t ? void 0 : t.id) ||
          i !== (null == t ? void 0 : t.payment_method)) &&
        t &&
        r.length > 5)
    ) {
      var o = t.payment_method;
      if ("card" === o || "emi" === o)
        if (t.emi_subvention)
          ao(r)
            .then(function () {
              if (Ce(tc) === r) {
                var e = mo(r);
                if (e) {
                  var i = t["AMEX" === e.code ? "payment_network" : "issuer"];
                  (e && i === e.code) || n(!1);
                } else n(!1);
              }
            })
            .catch(function () {});
        else {
          var a = $i(0, "validate/checkout/offers"),
            u = Ln();
          if (
            (function (e) {
              if ((void 0 === e && (e = null), !Pn("subscription"))) return !1;
              if (!e) return !0;
              var n = Pn();
              return n.subscription[e] && !1 !== n.subscription[e];
            })()
          )
            u = Pn("subscription").order_id;
          oc = Vt.post({
            url: a,
            data: {
              amount: Mn(),
              method: "card",
              "card[number]": r,
              order_id: u,
              offers: [t.id],
            },
            callback: function (e) {
              (oc = null),
                (e.error || (Zn(e) && !e.length)) &&
                  (Lr.track("offers:card_invalid", {
                    type: Q,
                    data: { offer_id: t.id, iin: r },
                  }),
                  n(!1));
            },
          });
        }
    }
  });
  on([ac, uc], function (e) {
    var n,
      t = e[0],
      r = e[1];
    return t && r
      ? null === (n = Ce(ac)) || void 0 === n
        ? void 0
        : n.amount
      : Mn();
  }),
    rn(!0);
  var cc = rn(!1);
  on([rn(!1), cc], function (e) {
    var n = e[0],
      t = e[1];
    return (
      (n || -1 !== (Pn("optional") || []).indexOf("email")) &&
      (t || -1 !== (Pn("optional") || []).indexOf("contact"))
    );
  }),
    rn(!1),
    rn(!0);
  var sc,
    lc = "couponsList",
    mc = "savedAddress",
    fc = "savedBillingAddress",
    dc = "addAddress",
    pc = "addBillingAddress",
    hc = "methods",
    vc = "otp",
    yc = "details",
    gc = "upi",
    _c = "emi",
    bc = "card",
    wc = "wallet",
    kc = "paylater",
    Sc = "emiplans",
    Ec = "netbanking";
  ((sc = {})["coupons"] = "summary_screen"),
    (sc[lc] = "coupon_screen"),
    (sc[mc] = "saved_shipping_address_screen"),
    (sc[fc] = "saved_billing_address_screen"),
    (sc[dc] = "new_shipping_address_screen"),
    (sc[pc] = "new_billing_address_screen"),
    (sc[vc] = "otp_screen"),
    (sc[yc] = "details_screen"),
    (sc[hc] = "payment_l0_screen"),
    (sc[gc] = "payment_l1_screen"),
    (sc[_c] = "payment_l1_screen"),
    (sc[bc] = "payment_l1_screen"),
    (sc[wc] = "payment_l1_screen"),
    (sc[kc] = "payment_l1_screen"),
    (sc[Sc] = "payment_l1_screen"),
    (sc[Ec] = "payment_l1_screen"),
    (sc.qr = "payment_l1_screen"),
    rn([]),
    rn([]),
    rn([]),
    rn(null),
    rn(!1),
    rn(!1);
  var Ac = { VARIANT_A: "VARIANT_A", VARIANT_B: "VARIANT_B" },
    Cc = ["name", "price", "quantity", "image_url"],
    Dc = new RegExp(
      "^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$",
      "i"
    ),
    Rc = rn([]);
  rn(!1),
    on([Rc], function (e) {
      var n = e[0];
      return (
        p.values(Ac).includes(Pn("1cc_cart_items_exp")) &&
        (function (e) {
          if (!e.length) return !1;
          var n = e.every(function (e) {
              return Cc.every(function (n) {
                return (
                  n in e &&
                  ("image_url" === n ? Dc.test(e[n]) : e[n] || 0 === e[n])
                );
              });
            }),
            t = e.reduce(function (e, n) {
              return e + n.quantity * +n.price;
            }, 0);
          return n && t === Ce(Wu);
        })(n)
      );
    }),
    rn(""),
    rn(null),
    rn("idle"),
    rn([]),
    rn(""),
    rn(""),
    rn(""),
    rn(""),
    rn(0),
    rn(0),
    rn(""),
    rn(""),
    rn(""),
    rn("");
  var xc = rn(null);
  rn();
  var Pc = rn({});
  rn(!1),
    rn(!1),
    on([xc, Pc], function (e) {
      var n = e[0];
      return e[1][n];
    }),
    rn(!1),
    rn(!1),
    rn(!1),
    on([rn({ view: "", data: {} }), ku], function (e) {
      var n = e[0],
        t = e[1],
        r = n.view,
        i = n.data;
      return r
        ? (function (e, n, t, r) {
            try {
              return Ce($u)(e, { locale: t, values: n, default: r });
            } catch (i) {
              return (
                Lr.track("i18n:template:error", {
                  data: { message: i.message, label: e, locale: t, data: n },
                }),
                r || e
              );
            }
          })("cta.".concat(r), i, t)
        : "";
    });
  var Nc = rn(""),
    Mc = rn("");
  function Ic(e, n) {
    e || (e = "home"),
      n || (n = "tab"),
      "home-1cc" === e && (n = Ce(ma).name),
      Hu.setActiveCTAScreen(e + ":" + n);
  }
  function Tc(e) {
    return {
      "_[agent][platform]": (cn(window, "webkit.messageHandlers.CheckoutBridge")
        ? { platform: "ios" }
        : {
            platform: ca.platform || "web",
            library: "checkoutjs",
            version: (ca.version || Xt) + "",
          }
      ).platform,
      "_[agent][device]":
        null != e && e.cred
          ? "desktop" !== gi()
            ? "mobile"
            : "desktop"
          : gi(),
      "_[agent][os]":
        oi || ci
          ? "iOS"
          : ui
          ? "android"
          : si
          ? "windows"
          : li
          ? "linux"
          : mi
          ? "macOS"
          : "other",
    };
  }
  ma.subscribe(function (e) {
    "home-1cc" === Ce(Nc) && Ic(Ce(Nc), e);
  }),
    Nc.subscribe(function (e) {
      Ic(e, Ce(Mc));
    }),
    Mc.subscribe(function (e) {
      Ic(Ce(Nc), e);
    }),
    rn(!1);
  var Lc;
  function Oc(e) {
    var n,
      t = this;
    if (!et(this, Oc)) return new Oc(e);
    Vr.call(this), (this.id = Nr.makeUid()), Lr.setR(this);
    try {
      (n = (function (e) {
        (e && "object" == typeof e) || ut("Invalid options");
        var n = new Ei(e);
        return (
          (function (e, n) {
            void 0 === n && (n = []);
            var t = !0;
            (e = e.get()),
              vn($c, function (r, i) {
                if (!n.includes(i) && i in e) {
                  var o = r(e[i], e);
                  o && ((t = !1), ut("Invalid " + i + " (" + o + ")"));
                }
              });
          })(n, ["amount"]),
          (function (e) {
            vn(e, function (n, t) {
              Gn(n)
                ? n.length > 254 && (e[t] = n.slice(0, 254))
                : Hn(n) || jn(n) || delete e[t];
            });
          })(n.get("notes")),
          n
        );
      })(e)),
        (this.get = n.get),
        (this.set = n.set);
    } catch (n) {
      var r = n.message;
      (this.get && this.isLiveMode()) || (sn(e) && !e.parent && l.alert(r)),
        ut(r);
    }
    [
      "integration",
      "integration_version",
      "integration_parent_version",
    ].forEach(function (e) {
      var n = t.get("_." + e);
      n && (Nr.props[e] = n);
    }),
      Ki.every(function (e) {
        return !n.get(e);
      }) && ut("No key passed"),
      _n.updateInstance(this),
      this.postInit();
  }
  var Bc = (Oc.prototype = new Vr());
  function Fc(e, n) {
    return Vt.jsonp({
      url: zi("preferences"),
      data: e,
      callback: function (e) {
        (_n.preferenceResponse = e), n(e);
      },
    });
  }
  function zc(e) {
    if (e) {
      var n = {},
        t = Nn("key");
      t && (n.key_id = t);
      var r = [Nn("currency")],
        i = Nn("display_currency"),
        o = Nn("display_amount");
      i && ("" + o).length && r.push(i),
        (n.currency = r),
        [
          "order_id",
          "customer_id",
          "invoice_id",
          "payment_link_id",
          "subscription_id",
          "auth_link_id",
          "recurring",
          "subscription_card_change",
          "account_id",
          "contact_id",
          "checkout_config_id",
          "amount",
        ].forEach(function (e) {
          var t = Nn(e);
          t && (n[e] = t);
        }),
        (n["_[build]"] = Xt),
        (n["_[checkout_id]"] = e.id),
        (n["_[library]"] = Nr.props.library),
        (n["_[platform]"] = Nr.props.platform);
      var a = Tc() || {};
      return (n = X({}, n, a));
    }
  }
  (Bc.postInit = Zr),
    (Bc.onNew = function (e, n) {
      var t = this;
      "ready" === e &&
        (this.prefs
          ? n(e, this.prefs)
          : Fc(zc(this), function (e) {
              e.methods && ((t.prefs = e), (t.methods = e.methods)),
                n(t.prefs, e);
            }));
    }),
    (Bc.emi_calculator = function (e, n) {
      return Oc.emi.calculator(this.get("amount") / 100, e, n);
    }),
    (Oc.emi = {
      calculator: function (e, n, t) {
        if (!t) return g.ceil(e / n);
        t /= 1200;
        var r = g.pow(1 + t, n);
        return k((e * t * r) / (r - 1), 10);
      },
      calculatePlan: function (e, n, t) {
        var r = this.calculator(e, n, t);
        return { total: t ? r * n : e, installment: r };
      },
    }),
    (Oc.payment = {
      getMethods: function (e) {
        return Fc({ key_id: Oc.defaults.key }, function (n) {
          e(n.methods || n);
        });
      },
      getPrefs: function (e, n) {
        var t = it();
        return (
          Lr.track("prefs:start", { type: ee }),
          sn(e) &&
            (e["_[request_index]"] = Lr.updateRequestIndex("preferences")),
          mn(Lc) || mn(Lc.order)
            ? Vt({
                url: mt(zi("preferences"), e),
                callback: function (r) {
                  if (
                    (Lr.track("prefs:end", { type: ee, data: { time: t() } }),
                    r.xhr && 0 === r.xhr.status)
                  )
                    return Fc(e, n);
                  n(r);
                },
              })
            : (Lr.track("prefs:end", { type: ee, data: { time: t() } }),
              void n(Lc))
        );
      },
      getRewards: function (e, n) {
        var t = it();
        return (
          Lr.track("rewards:start", { type: ee }),
          Vt({
            url: mt(zi("checkout/rewards"), e),
            callback: function (e) {
              Lr.track("rewards:end", { type: ee, data: { time: t() } }), n(e);
            },
          })
        );
      },
    }),
    (Bc.isLiveMode = function () {
      var e = this.preferences;
      return (!e && /^rzp_l/.test(this.get("key"))) || (e && "live" === e.mode);
    }),
    (Bc.getMode = function () {
      var e = this.preferences;
      return this.get("key") || e
        ? (!e && /^rzp_l/.test(this.get("key"))) || (e && "live" === e.mode)
          ? "live"
          : "test"
        : "pending";
    }),
    (Bc.calculateFees = function (e) {
      var n = this;
      return new Promise(function (t, r) {
        (e = Di(e, n)),
          Vt.post({
            url: zi("payments/calculate/fees"),
            data: e,
            callback: function (e) {
              return e.error ? r(e) : t(e);
            },
          });
      });
    }),
    (Bc.fetchVirtualAccount = function (e) {
      var n = e.customer_id,
        t = e.order_id,
        r = e.notes;
      return new Promise(function (e, i) {
        if (t) {
          var o = { customer_id: n, notes: r };
          n || delete o.customer_id, r || delete o.notes;
          var a = zi("orders/" + t + "/virtual_accounts?x_entity_id=" + t);
          Vt.post({
            url: a,
            data: o,
            callback: function (n) {
              return n.error ? i(n) : e(n);
            },
          });
        } else i("Order ID is required to fetch the account details");
      });
    }),
    (Bc.checkCREDEligibility = function (e) {
      var n = this,
        t = Uu(),
        r = Tc({ cred: !0 }) || {},
        i = $i(t && t.r, "payments/validate/account"),
        o = new Promise(function (o, a) {
          if (!e)
            return a(new Error("contact is required to check eligibility"));
          Vt.post({
            url: i,
            data: X(
              {
                entity: "cred",
                value: e,
                "_[checkout_id]":
                  (null == t ? void 0 : t.id) || (null == n ? void 0 : n.id),
                "_[build]": Xt,
                "_[library]": Nr.props.library,
                "_[platform]": Nr.props.platform,
              },
              r
            ),
            callback: function (e) {
              var n,
                t = "ELIGIBLE" === (null == (n = e.data) ? void 0 : n.state);
              return (
                Yr.Track($r.ELIGIBILITY_CHECK, {
                  source: "validate_api",
                  isEligible: t,
                }),
                t ? o(e) : a(e)
              );
            },
          });
        });
      return o;
    });
  var Kc,
    $c = {
      notes: function (e) {
        if (sn(e) && Xn(p.keys(e)) > 15) return "At most 15 notes are allowed";
      },
      amount: function (e, n) {
        var t,
          r,
          i = n.display_currency || n.currency || "INR",
          o = An(i),
          a = o.minimum,
          u = "";
        if (
          (o.decimals && o.minor
            ? (u = " " + o.minor)
            : o.major && (u = " " + o.major),
          void 0 === (r = a) && (r = 100),
          (/[^0-9]/.test((t = e)) || !((t = k(t, 10)) >= r)) && !n.recurring)
        )
          return (
            "should be passed in integer" +
            u +
            ". Minimum value is " +
            a +
            u +
            ", i.e. " +
            (function (e, n, t) {
              return (
                void 0 === t && (t = !0), [Dn[n], xn(e, n)].join(t ? " " : "")
              );
            })(a, i)
          );
      },
      currency: function (e) {
        if (!Cn.includes(e))
          return "The provided currency is not currently supported";
      },
      display_currency: function (e) {
        if (!(e in Dn) && e !== Oc.defaults.display_currency)
          return "This display currency is not supported";
      },
      display_amount: function (e) {
        if (
          !(e = h(e).replace(/([^0-9.])/g, "")) &&
          e !== Oc.defaults.display_amount
        )
          return "";
      },
      payout: function (e, n) {
        if (e) {
          if (!n.key) return "key is required for a Payout";
          if (!n.contact_id) return "contact_id is required for a Payout";
        }
      },
    };
  (Oc.configure = function (e, n) {
    void 0 === n && (n = {}),
      vn(ki(e, _i), function (e, n) {
        typeof _i[n] == typeof e && (_i[n] = e);
      }),
      n.library && (Nr.props.library = n.library),
      n.referer && (Nr.props.referer = n.referer);
  }),
    (Oc.defaults = _i),
    (l.Razorpay = Oc),
    (_i.timeout = 0),
    (_i.name = ""),
    (_i.partnership_logo = ""),
    (_i.nativeotp = !0),
    (_i.remember_customer = !1),
    (_i.personalization = !1),
    (_i.paused = !1),
    (_i.fee_label = ""),
    (_i.force_terminal_id = ""),
    (_i.is_donation_checkout = !1),
    (_i.keyless_header = ""),
    (_i.min_amount_label = ""),
    (_i.partial_payment = {
      min_amount_label: "",
      full_amount_label: "",
      partial_amount_label: "",
      partial_amount_description: "",
      select_partial: !1,
    }),
    (_i.method = {
      netbanking: null,
      card: !0,
      credit_card: !0,
      debit_card: !0,
      cardless_emi: null,
      wallet: null,
      emi: !0,
      upi: null,
      upi_intent: !0,
      qr: !0,
      bank_transfer: !0,
      offline_challan: !0,
      upi_otm: !0,
      cod: !0,
    }),
    (_i.prefill = {
      amount: "",
      wallet: "",
      provider: "",
      method: "",
      name: "",
      contact: "",
      email: "",
      vpa: "",
      coupon_code: "",
      "card[number]": "",
      "card[expiry]": "",
      "card[cvv]": "",
      "billing_address[line1]": "",
      "billing_address[line2]": "",
      "billing_address[postal_code]": "",
      "billing_address[city]": "",
      "billing_address[country]": "",
      "billing_address[state]": "",
      "billing_address[first_name]": "",
      "billing_address[last_name]": "",
      bank: "",
      "bank_account[name]": "",
      "bank_account[account_number]": "",
      "bank_account[account_type]": "",
      "bank_account[ifsc]": "",
      auth_type: "",
    }),
    (_i.features = { cardsaving: !0 }),
    (_i.readonly = { contact: !1, email: !1, name: !1 }),
    (_i.hidden = { contact: !1, email: !1 }),
    (_i.modal = {
      confirm_close: !1,
      ondismiss: Zr,
      onhidden: Zr,
      escape: !0,
      animation:
        !l.matchMedia ||
        !(
          null != (Kc = l.matchMedia("(prefers-reduced-motion: reduce)")) &&
          Kc.matches
        ),
      backdropclose: !1,
      handleback: !0,
    }),
    (_i.external = { wallets: [], handler: Zr }),
    (_i.challan = { fields: [], disclaimers: [], expiry: {} }),
    (_i.theme = {
      upi_only: !1,
      color: "",
      backdrop_color: "rgba(0,0,0,0.6)",
      image_padding: !0,
      image_frame: !0,
      close_button: !0,
      close_method_back: !1,
      hide_topbar: !1,
      branding: "",
      debit_card: !1,
    }),
    (_i._ = {
      integration: null,
      integration_version: null,
      integration_parent_version: null,
    }),
    (_i.config = { display: {} });
  var jc =
    "https://fonts.googleapis.com/css2?family=Inter:wght@200;300;400;500;600;700;800&display=swap";
  function Hc() {
    var e;
    (e = jc),
      m.querySelector('link[href$="'.concat(e, '"]')) ||
        (function (e) {
          return new Promise(function (n, t) {
            var r = pt("link");
            (r.rel = "stylesheet"),
              (r.href = e),
              (r.onload = n),
              (r.onerror = t),
              m.head.appendChild(r);
          });
        })(jc).catch(function (e) {
          Yr.TrackMetric("inter_font_load_failure", { data: { error: e } });
        });
  }
  var Gc = {
      PRODUCT: { page: "product", text: "Buy now with Magic" },
      PRODUCT_SM: { page: "product_sm", text: "Buy now" },
      CART: { page: "cart", text: "Checkout with Magic" },
      CART_SM: { page: "cart_sm", text: "Checkout" },
    },
    Uc = ["page-type", "width", "border-radius", "bg-color", "title"],
    Yc = function (e) {
      return {};
    },
    Zc = function (e) {
      return {};
    };
  function Vc(e) {
    var n,
      t,
      r,
      i,
      o,
      a,
      u,
      c,
      s = e[8].title,
      l = (function (e, n, t, r) {
        if (e) {
          var i = De(e, n, t, r);
          return e[0](i);
        }
      })(s, e, e[7], Zc),
      m =
        l ||
        (function (e) {
          var n,
            t,
            r = (e[3] || e[4]) + "";
          return {
            c: function () {
              (n = Ne("span")), (t = Ie(r));
            },
            m: function (e, r) {
              xe(e, n, r), Re(n, t);
            },
            p: function (e, n) {
              24 & n &&
                r !== (r = (e[3] || e[4]) + "") &&
                (function (e, n) {
                  (n = "" + n), e.wholeText !== n && (e.data = n);
                })(t, r);
            },
            d: function (e) {
              e && Pe(n);
            },
          };
        })(e);
    return {
      c: function () {
        (n = Ne("button")),
          (t = Me("svg")),
          (r = Me("path")),
          (i = Me("path")),
          (o = Ie(" ")),
          m && m.c(),
          Te(
            r,
            "d",
            "M5.14321 4.72412L4.47803 7.1758L8.28423 4.71034L5.7951 14.0119L8.32281 14.0142L11.9999 0.275635L5.14321 4.72412Z"
          ),
          Te(r, "fill", "#F4F6FE"),
          Te(
            i,
            "d",
            "M1.04646 10.1036L0 14.0138H5.18124C5.18124 14.0138 7.3005 6.06116 7.30109 6.05884C7.2991 6.06011 1.04646 10.1036 1.04646 10.1036Z"
          ),
          Te(i, "fill", "#F4F6FE"),
          Te(t, "width", "12"),
          Te(t, "height", "15"),
          Te(t, "viewBox", "0 0 12 15"),
          Te(t, "fill", "none"),
          Te(t, "xmlns", "http://www.w3.org/2000/svg"),
          Te(t, "class", "icon"),
          Te(n, "id", "razorpay-magic-btn"),
          Le(n, "width", e[0], 1),
          Le(n, "border-radius", e[1], 1),
          Le(n, "background-color", e[2], 1),
          Te(n, "data-testid", "razorpay-magic-btn");
      },
      m: function (s, l) {
        var f, d, p, h;
        xe(s, n, l),
          Re(n, t),
          Re(t, r),
          Re(t, i),
          Re(n, o),
          m && m.m(n, null),
          (a = !0),
          u ||
            ((f = n),
            (d = "click"),
            (p = e[5]),
            f.addEventListener(d, p, h),
            (c = function () {
              return f.removeEventListener(d, p, h);
            }),
            (u = !0));
      },
      p: function (e, t) {
        var r = t[0];
        l
          ? l.p &&
            (!a || 128 & r) &&
            (function (e, n, t, r, i, o) {
              if (i) {
                var a = De(n, t, r, o);
                e.p(a, i);
              }
            })(
              l,
              s,
              e,
              e[7],
              a
                ? (function (e, n, t, r) {
                    if (e[2] && r) {
                      var i = e[2](r(t));
                      if (void 0 === n.dirty) return i;
                      if ("object" == typeof i) {
                        for (
                          var o = [],
                            a = Math.max(n.dirty.length, i.length),
                            u = 0;
                          u < a;
                          u += 1
                        )
                          o[u] = n.dirty[u] | i[u];
                        return o;
                      }
                      return n.dirty | i;
                    }
                    return n.dirty;
                  })(s, e[7], r, Yc)
                : (function (e) {
                    if (e.ctx.length > 32) {
                      for (var n = [], t = e.ctx.length / 32, r = 0; r < t; r++)
                        n[r] = -1;
                      return n;
                    }
                    return -1;
                  })(e[7]),
              Zc
            )
          : m && m.p && (!a || 24 & r) && m.p(e, a ? r : -1),
          (!a || 1 & r) && Le(n, "width", e[0], 1),
          (!a || 2 & r) && Le(n, "border-radius", e[1], 1),
          (!a || 4 & r) && Le(n, "background-color", e[2], 1);
      },
      i: function (e) {
        a || (Je(m, e), (a = !0));
      },
      o: function (e) {
        !(function (e, n, t, r) {
          if (e && e.o) {
            if (We.has(e)) return;
            We.add(e),
              (void 0).c.push(function () {
                We.delete(e), r && (t && e.d(1), r());
              }),
              e.o(n);
          }
        })(m, e),
          (a = !1);
      },
      d: function (e) {
        e && Pe(n), m && m.d(e), (u = !1), c();
      },
    };
  }
  function Wc(e, n, t) {
    var r,
      i = n.$$slots,
      o = void 0 === i ? {} : i,
      a = n.$$scope,
      u = n.width,
      c = void 0 === u ? "100%" : u,
      s = n.borderRadius,
      l = void 0 === s ? "4px" : s,
      m = n.pageType,
      f = void 0 === m ? Gc.CART : m,
      d = n.bgColor,
      p = void 0 === d ? "#0460f8" : d,
      h = n.title,
      v = void 0 === h ? "" : h,
      y = Be();
    return (
      (e.$$set = function (e) {
        "width" in e && t(0, (c = e.width)),
          "borderRadius" in e && t(1, (l = e.borderRadius)),
          "pageType" in e && t(6, (f = e.pageType)),
          "bgColor" in e && t(2, (p = e.bgColor)),
          "title" in e && t(3, (v = e.title)),
          "$$scope" in e && t(7, (a = e.$$scope));
      }),
      (e.$$.update = function () {
        if (64 & e.$$.dirty) {
          var n = Gc.PRODUCT,
            i = Gc.PRODUCT_SM,
            o = Gc.CART,
            a = Gc.CART_SM;
          switch (f) {
            case n.page:
              t(4, (r = n.text));
              break;
            case i.page:
              t(4, (r = i.text));
              break;
            case o.page:
              t(4, (r = o.text));
              break;
            case a.page:
              t(4, (r = a.text));
              break;
            default:
              t(4, (r = "Checkout with Magic"));
          }
        }
      }),
      [
        c,
        l,
        p,
        v,
        r,
        function (e) {
          y("click", e);
        },
        f,
        a,
        o,
      ]
    );
  }
  var Jc = (function (e) {
      function n(n) {
        var t;
        return (
          Xe(
            (function (e) {
              if (void 0 === e)
                throw new ReferenceError(
                  "this hasn't been initialised - super() hasn't been called"
                );
              return e;
            })((t = e.call(this) || this)),
            n,
            Wc,
            Vc,
            Ee,
            { width: 0, borderRadius: 1, pageType: 6, bgColor: 2, title: 3 }
          ),
          t
        );
      }
      return (
        ge(n, e),
        le(n, [
          {
            key: "width",
            get: function () {
              return this.$$.ctx[0];
            },
            set: function (e) {
              this.$$set({ width: e }), Ze();
            },
          },
          {
            key: "borderRadius",
            get: function () {
              return this.$$.ctx[1];
            },
            set: function (e) {
              this.$$set({ borderRadius: e }), Ze();
            },
          },
          {
            key: "pageType",
            get: function () {
              return this.$$.ctx[6];
            },
            set: function (e) {
              this.$$set({ pageType: e }), Ze();
            },
          },
          {
            key: "bgColor",
            get: function () {
              return this.$$.ctx[2];
            },
            set: function (e) {
              this.$$set({ bgColor: e }), Ze();
            },
          },
          {
            key: "title",
            get: function () {
              return this.$$.ctx[3];
            },
            set: function (e) {
              this.$$set({ title: e }), Ze();
            },
          },
        ]),
        n
      );
    })(Qe),
    qc = m.createElement("template");
  if (
    ((qc.innerHTML =
      "\n  <style>\n  * {\n    padding: 0px;\n    margin: 0px;\n    border: 0px;\n    box-sizing: border-box;\n  }\n\n  #razorpay-magic-btn {\n    width: 100% !important;\n    padding: 14px !important;\n    background-color: #0460F8 !important;\n    color: #fff !important;\n    border-radius: 4px !important;\n    cursor: pointer !important;\n  }\n\n  #razorpay-magic-btn span {\n    font-family: 'Inter' !important;\n    font-weight: bold !important;\n    font-size: 14px !important;\n  }\n\n  #razorpay-magic-btn .icon {\n    margin-bottom: -1.1px;\n  }\n  </style>\n"),
    !ii && "customElements" in window)
  ) {
    var Xc = (function (e) {
      function n() {
        var n;
        return (
          ((n = e.call(this) || this)._root = n.attachShadow({
            mode: "closed",
          })),
          (n._options = {}),
          (n._rzp = null),
          Hc(),
          n._root.appendChild(qc.content.cloneNode(!0)),
          (n._button = new Jc({ target: n._root })),
          n
        );
      }
      ge(n, e);
      var t = n.prototype;
      return (
        (t.restyle = function () {
          var e = this;
          Uc.forEach(function (n) {
            var t = e.getAttribute(n);
            if (t) {
              var r = n.replace(/-([a-z])/g, function (e, n) {
                return n.toUpperCase();
              });
              e._button[r] = t;
            }
          });
        }),
        (t.attributeChangedCallback = function (e, n, t) {
          t !== n && this.restyle();
        }),
        (t.openRzpModal = function (e) {
          e.stopPropagation();
          var n = this._options,
            t = n.key,
            r = n.order_id,
            i = n.amount;
          "true" === this.getAttribute("auto-checkout") &&
            ((t && i) || r) &&
            ((this._rzp = new window.Razorpay(this._options)),
            this._rzp.open()),
            this.dispatchEvent(new CustomEvent("click", e));
        }),
        (t.connectedCallback = function () {
          var e = this;
          this._root
            .getElementById("razorpay-magic-btn")
            .addEventListener("click", this.openRzpModal.bind(this)),
            _(function () {
              var n = e.querySelector('[slot="title"]');
              null != n && n.textContent && (e._button.title = n.textContent);
            }),
            this.restyle();
        }),
        (t.disconnectedCallback = function () {
          this._button.removeEventListener(
            "click",
            this.openRzpModal.bind(this)
          );
        }),
        le(
          n,
          [
            {
              key: "rzp",
              get: function () {
                return this._rzp;
              },
            },
            {
              key: "options",
              set: function (e) {
                (this._options = e),
                  (this._rzp = new window.Razorpay(this._options));
              },
            },
          ],
          [
            {
              key: "observedAttributes",
              get: function () {
                return Uc;
              },
            },
          ]
        ),
        n
      );
    })(he(HTMLElement));
    window.customElements.get("magic-checkout-btn") ||
      window.customElements.define("magic-checkout-btn", Xc);
  }
  var Qc = "page_view",
    es = "payment_successful",
    ns = "payment_failed",
    ts = "rzp_payments";
  function rs(e, n, t) {
    var r;
    void 0 === e && (e = m.body), void 0 === t && (t = !1);
    try {
      if (t) {
        m.body.style.background = "#00000080";
        var i = pt("style");
        (i.innerText =
          "@keyframes rzp-rot{to{transform: rotate(360deg);}}@-webkit-keyframes rzp-rot{to{-webkit-transform: rotate(360deg);}}"),
          wt(i, e);
      }
      (r = m.createElement("div")).className = "razorpay-loader";
      var o =
        "margin:-25px 0 0 -25px;height:50px;width:50px;animation:rzp-rot 1s infinite linear;-webkit-animation:rzp-rot 1s infinite linear;border: 1px solid rgba(255, 255, 255, 0.2);border-top-color: rgba(255, 255, 255, 0.7);border-radius: 50%;";
      return (
        (o += n
          ? "margin: 100px auto -150px;border: 1px solid rgba(0, 0, 0, 0.2);border-top-color: rgba(0, 0, 0, 0.7);"
          : "position:absolute;left:50%;top:50%;"),
        r.setAttribute("style", o),
        wt(r, e),
        r
      );
    } catch (e) {
      !(function (e, n) {
        var t = n.analytics,
          r = n.severity,
          i = void 0 === r ? Wi : r,
          o = n.unhandled,
          a = void 0 !== o && o;
        try {
          var u = t || {},
            c = u.event,
            s = u.data,
            l = u.immediately,
            m = void 0 === l || l,
            d = "string" == typeof c ? c : Ur;
          (i !== Vi && i !== Wi) || sr("session_errored", i),
            Lr.track(d, {
              data: X({}, "object" == typeof s ? s : {}, {
                error: Zi(e, { severity: i, unhandled: a }),
              }),
              immediately: f(m),
              isError: !0,
            });
        } catch (e) {}
      })(e, { severity: Ji, unhandled: !1 });
    }
  }
  function is(e, n) {
    var t;
    if (null != (t = window) && t.ga)
      for (var r = window.ga, i = r.getAll() || [], o = 0; o < i.length; o++) {
        r(i[o].get("name") + "." + e, n);
      }
  }
  var os,
    as,
    us,
    cs,
    ss = l,
    ls = ss.screen,
    ms = ss.scrollTo,
    fs = oi,
    ds = !1,
    ps = {
      overflow: "",
      metas: null,
      orientationchange: function () {
        ps.resize.call(this), ps.scroll.call(this);
      },
      resize: function () {
        var e = l.innerHeight || ls.height;
        (gs.container.style.position = e < 450 ? "absolute" : "fixed"),
          (this.el.style.height = g.max(e, 460) + "px");
      },
      scroll: function () {
        if ("number" == typeof l.pageYOffset)
          if (l.innerHeight < 460) {
            var e = 460 - l.innerHeight;
            l.pageYOffset > e + 120 && Qo(e);
          } else this.isFocused || Qo(0);
      },
    };
  function hs() {
    return (
      ps.metas ||
        (ps.metas = Vo(
          'head meta[name=viewport],head meta[name="theme-color"]'
        )),
      ps.metas
    );
  }
  function vs(e) {
    var n = Ii.frame;
    if (!n) {
      n = zi("checkout", !1);
      var t = zc(e);
      t ? (n = mt(n, t)) : (n += "/public");
    }
    return (n = mt(n, {
      traffic_env: Qt,
      build: "fc63e9523e2463fa82a6f68197db98319548b532",
    }));
  }
  function ys(e) {
    try {
      gs.backdrop.style.background = e;
    } catch (e) {}
  }
  function gs(e) {
    if (((os = m.body), (as = m.head), (us = os.style), e))
      return this.getEl(e), this.openRzp(e);
    this.getEl(), (this.time = nt());
  }
  gs.prototype = {
    getEl: function (e) {
      if (!this.el) {
        var n,
          t = {
            style:
              "opacity: 1; height: 100%; position: relative; background: none; display: block; border: 0 none transparent; margin: 0px; padding: 0px; z-index: 2;",
            allowtransparency: !0,
            frameborder: 0,
            width: "100%",
            height: "100%",
            allowpaymentrequest: !0,
            src: vs(e),
            class: "razorpay-checkout-frame",
          };
        this.el = ((n = pt("iframe")), Ct(t)(n));
      }
      return this.el;
    },
    openRzp: function (e) {
      var n,
        t = ((n = this.el), Dt({ width: "100%", height: "100%" })(n)),
        r = e.get("parent");
      r && (r = Jo(r));
      var i,
        o,
        a,
        u = r || gs.container;
      (cs || (cs = rs(u, r)),
      e !== this.rzp && (ht(t) !== u && kt(u, t), (this.rzp = e)),
      r)
        ? ((i = t), At("minHeight", "530px")(i), (this.embedded = !0))
        : ((a = u),
          (o = At("display", "block")(a)),
          It(o),
          ys(e.get("theme.backdrop_color")),
          /^rzp_t/.test(e.get("key")) &&
            gs.ribbon &&
            (gs.ribbon.style.opacity = 1),
          this.setMetaAndOverflow());
      this.bind(), this.onload();
    },
    makeMessage: function (e, n) {
      var t = this.rzp,
        r = t.get(),
        i = {
          integration: Nr.props.integration,
          referer: Nr.props.referer || x.href,
          options: r,
          library: Nr.props.library,
          id: t.id,
        };
      return (
        e && (i.event = e),
        t._order && (i._order = t._order),
        t._prefs && (i._prefs = t._prefs),
        t.metadata && (i.metadata = t.metadata),
        n && (i.extra = n),
        vn(t.modal.options, function (e, n) {
          r["modal." + n] = e;
        }),
        this.embedded && (delete r.parent, (i.embedded = !0)),
        (function (e) {
          var n = e.image;
          if (n && Gn(n)) {
            if (ct(n)) return;
            if (n.indexOf("http")) {
              var t =
                  x.protocol + "//" + x.hostname + (x.port ? ":" + x.port : ""),
                r = "";
              "/" !== n[0] &&
                "/" !== (r += x.pathname.replace(/[^/]*$/g, ""))[0] &&
                (r = "/" + r),
                (e.image = t + r + n);
            }
          }
        })(r),
        i
      );
    },
    close: function () {
      ys(""),
        gs.ribbon && (gs.ribbon.style.opacity = 0),
        (function (e) {
          e && e.forEach(St);
          var n = hs();
          n && n.forEach(wt(as));
        })(this.$metas),
        (us.overflow = ps.overflow),
        this.unbind(),
        fs && ms(0, ps.oldY),
        Nr.flush();
    },
    bind: function () {
      var e = this;
      if (!this.listeners) {
        this.listeners = [];
        var n = {};
        fs &&
          ((n.orientationchange = ps.orientationchange),
          this.rzp.get("parent") || (n.resize = ps.resize)),
          vn(n, function (n, t) {
            var r;
            e.listeners.push(((r = window), Ft(t, n.bind(e))(r)));
          });
      }
    },
    unbind: function () {
      this.listeners.forEach(function (e) {
        "function" == typeof e && e();
      }),
        (this.listeners = null);
    },
    setMetaAndOverflow: function () {
      var e, n;
      as &&
        (hs().forEach(function (e) {
          return St(e);
        }),
        (this.$metas = [
          ((e = pt("meta")),
          Ct({
            name: "viewport",
            content:
              "width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no",
          })(e)),
          ((n = pt("meta")),
          Ct({ name: "theme-color", content: this.rzp.get("theme.color") })(n)),
        ]),
        this.$metas.forEach(wt(as)),
        (ps.overflow = us.overflow),
        (us.overflow = "hidden"),
        fs &&
          ((ps.oldY = l.pageYOffset),
          l.scrollTo(0, 0),
          ps.orientationchange.call(this)));
    },
    postMessage: function (e) {
      var n, t;
      (e.id = this.rzp.id),
        (e = JSON.stringify(e)),
        null == (n = this.el) ||
          null == (t = n.contentWindow) ||
          t.postMessage(e, "*");
    },
    prefetchPrefs: function (e) {
      e !== this.rzp && (this.rzp = e),
        this.postMessage(this.makeMessage("prefetch"));
    },
    makeCheckoutCallForShopify: function (e, n) {
      e !== this.rzp && (this.rzp = e),
        ds
          ? this.postMessage(
              this.makeMessage("1cc_shopify_checkout_initiate", n)
            )
          : this.onevent({ event: "shopify_failure" });
    },
    onmessage: function (e) {
      var n = yn(e.data);
      if (n) {
        var t = n.event,
          r = this.rzp;
        e.origin &&
          "frame" === n.source &&
          e.source === this.el.contentWindow &&
          ((n = n.data),
          this["on" + t](n),
          ("dismiss" !== t && "fault" !== t) ||
            Lr.track(t, { data: n, r: r, immediately: !0 }));
      }
    },
    onload: function (e) {
      e && "checkout-frame" === e.origin && (ds = !0),
        this.rzp && this.postMessage(this.makeMessage());
    },
    onfocus: function () {
      this.isFocused = !0;
    },
    onblur: function () {
      (this.isFocused = !1), ps.orientationchange.call(this);
    },
    onrender: function () {
      cs && (St(cs), (cs = null));
      this.rzp.emit("render");
    },
    onevent: function (e) {
      this.rzp.emit(e.event, e.data);
    },
    ongaevent: function (e) {
      var n,
        t,
        r = e.event,
        i = e.category,
        o = e.params,
        a = void 0 === o ? {} : o;
      this.rzp.set("enable_ga_analytics", !0),
        null != (n = window) &&
          n.gtag &&
          "function" == typeof window.gtag &&
          window.gtag("event", r, X({ event_category: i }, a)),
        null != (t = window) &&
          t.ga &&
          "function" == typeof window.ga &&
          is(
            "send",
            r === Qc
              ? { hitType: "pageview", title: i }
              : { hitType: "event", eventCategory: i, eventAction: r }
          );
    },
    onfbaevent: function (e) {
      var n,
        t = e.eventType,
        r = void 0 === t ? "trackCustom" : t,
        i = e.event,
        o = e.category,
        a = e.params,
        u = void 0 === a ? {} : a;
      null != (n = window) &&
        n.fbq &&
        "function" == typeof window.fbq &&
        (this.rzp.set("enable_fb_analytics", !0),
        o && (u.page = o),
        window.fbq(r, i, u));
    },
    onredirect: function (e) {
      Nr.flush(),
        e.target || (e.target = this.rzp.get("target") || "_top"),
        qo(e);
    },
    onsubmit: function (e) {
      Nr.flush();
      var n = this.rzp;
      "wallet" === e.method &&
        (n.get("external.wallets") || []).forEach(function (t) {
          if (t === e.wallet)
            try {
              n.get("external.handler").call(n, e);
            } catch (e) {}
        }),
        n.emit("payment.submit", { method: e.method });
    },
    ondismiss: function (e) {
      this.close();
      var n = this.rzp.get("modal.ondismiss");
      Un(n) &&
        _(function () {
          return n(e);
        });
    },
    onhidden: function () {
      Nr.flush(), this.afterClose();
      var e = this.rzp.get("modal.onhidden");
      Un(e) && e();
    },
    oncomplete: function (e) {
      var n = this.rzp.get(),
        t = n.enable_ga_analytics,
        r = n.enable_fb_analytics;
      t && this.ongaevent({ event: es, category: ts }),
        r && this.onfbaevent({ event: es, category: ts }),
        this.close();
      var i = this.rzp,
        o = i.get("handler");
      Lr.track("checkout_success", { r: i, data: e, immediately: !0 }),
        Un(o) &&
          _(function () {
            o.call(i, e);
          }, 200);
    },
    onpaymenterror: function (e) {
      Nr.flush();
      var n = this.rzp.get(),
        t = n.enable_ga_analytics,
        r = n.enable_fb_analytics;
      t && this.ongaevent({ event: ns, category: ts }),
        r && this.onfbaevent({ event: ns, category: ts });
      try {
        var i,
          o = this.rzp.get("callback_url"),
          a = this.rzp.get("redirect") || vi,
          u = this.rzp.get("retry");
        if (a && o && !1 === u)
          return (
            null != e &&
              null != (i = e.error) &&
              i.metadata &&
              (e.error.metadata = JSON.stringify(e.error.metadata)),
            void qo({
              url: o,
              content: e,
              method: "post",
              target: this.rzp.get("target") || "_top",
            })
          );
        this.rzp.emit("payment.error", e), this.rzp.emit("payment.failed", e);
      } catch (e) {}
    },
    onfailure: function (e) {
      var n = this.rzp.get(),
        t = n.enable_ga_analytics,
        r = n.enable_fb_analytics;
      t && this.ongaevent({ event: ns, category: ts }),
        r && this.onfbaevent({ event: ns, category: ts }),
        this.ondismiss(),
        l.alert("Payment Failed.\n" + e.error.description),
        this.onhidden();
    },
    onfault: function (e) {
      var n = "Something went wrong.";
      Gn(e)
        ? (n = e)
        : Yn(e) &&
          (e.message || e.description) &&
          (n = e.message || e.description),
        Nr.flush(),
        this.rzp.close(),
        this.rzp.emit("fault.close");
      var t = this.rzp.get("callback_url");
      (this.rzp.get("redirect") || vi) && t
        ? Ti({ url: t, params: { error: e }, method: "POST" })
        : l.alert("Oops! Something went wrong.\n" + n),
        this.afterClose();
    },
    afterClose: function () {
      gs.container.style.display = "none";
    },
    onflush: function (e) {
      Nr.flush(e);
    },
  };
  var _s,
    bs = Qn(Oc);
  function ws(e) {
    return function n() {
      return _s ? e.call(this) : (_(n.bind(this), 99), this);
    };
  }
  !(function e() {
    (_s = m.body || m.getElementsByTagName("body")[0]) || _(e, 99);
  })();
  var ks,
    Ss = m.currentScript || (ks = Vo("script"))[ks.length - 1];
  function Es(e) {
    var n = ht(Ss);
    Li({ form: n, data: Fi(e) }), (n.onsubmit = Zr), n.submit();
  }
  var As, Cs;
  function Ds() {
    var e = {};
    vn(Ss.attributes, function (n) {
      var t = n.name.toLowerCase();
      if (/^data-/.test(t)) {
        var r = e;
        t = t.replace(/^data-/, "");
        var i = n.value;
        "true" === i ? (i = !0) : "false" === i && (i = !1),
          /^notes\./.test(t) &&
            (e.notes || (e.notes = {}),
            (r = e.notes),
            (t = t.replace(/^notes\./, ""))),
          (r[t] = i);
      }
    });
    var n = e.key;
    if (n && n.length > 0) {
      e.handler = Es;
      var t = Oc(e);
      e.parent ||
        (Yr.TrackRender(jr, t),
        (function (e) {
          var n = ht(Ss);
          kt(
            n,
            p.assign(pt("input"), {
              type: "submit",
              value: e.get("buttontext"),
              className: "razorpay-payment-button",
            })
          ).onsubmit = function (n) {
            n.preventDefault();
            var t = this,
              r = t.action,
              i = t.method,
              o = t.target,
              a = e.get();
            if (Gn(r) && r && !a.callback_url) {
              var u = {
                url: r,
                content: Xo(t),
                method: Gn(i) ? i : "get",
                target: Gn(o) && o,
              };
              try {
                var c = A(
                  JSON.stringify({
                    request: u,
                    options: JSON.stringify(a),
                    back: x.href,
                  })
                );
                a.callback_url = zi("checkout/onyx") + "?data=" + c;
              } catch (e) {}
            }
            return e.open(), Yr.TrackBehav(Hr), !1;
          };
        })(t));
    }
  }
  function Rs() {
    if (!As) {
      var e = pt();
      (e.className = "razorpay-container"),
        Rt(
          e,
          "<style>@keyframes rzp-rot{to{transform: rotate(360deg);}}@-webkit-keyframes rzp-rot{to{-webkit-transform: rotate(360deg);}}</style>"
        ),
        Dt(e, {
          zIndex: 2147483647,
          position: "fixed",
          top: 0,
          display: "none",
          left: 0,
          height: "100%",
          width: "100%",
          "-webkit-overflow-scrolling": "touch",
          "-webkit-backface-visibility": "hidden",
          "overflow-y": "visible",
        }),
        (As = wt(e, _s)),
        (gs.container = As);
      var n =
        ((r = As),
        ((i = pt()).className = "razorpay-backdrop"),
        Dt(i, {
          "min-height": "100%",
          transition: "0.3s ease-out",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }),
        wt(i, r));
      gs.backdrop = n;
      var t = (function (e) {
        var n = "rotate(45deg)",
          t = "opacity 0.3s ease-in",
          r = pt("span");
        return (
          (r.textContent = "Test Mode"),
          Dt(r, {
            "text-decoration": "none",
            background: "#D64444",
            border: "1px dashed white",
            padding: "3px",
            opacity: "0",
            "-webkit-transform": n,
            "-moz-transform": n,
            "-ms-transform": n,
            "-o-transform": n,
            transform: n,
            "-webkit-transition": t,
            "-moz-transition": t,
            transition: t,
            "font-family": "lato,ubuntu,helvetica,sans-serif",
            color: "white",
            position: "absolute",
            width: "200px",
            "text-align": "center",
            right: "-50px",
            top: "50px",
          }),
          wt(r, e)
        );
      })(n);
      gs.ribbon = t;
    }
    var r, i;
    return As;
  }
  var xs,
    Ps = !1,
    Ns =
      ((xs = (function (e) {
        try {
          var n = localStorage.getItem(e);
          if (!n) return null;
          var t = JSON.parse(n);
          return new y().getTime() > t.expiry
            ? (localStorage.removeItem(e), null)
            : t;
        } catch (e) {
          return null;
        }
      })("razorpay_affordability_widget_fid")),
      (null == xs ? void 0 : xs.id) ? xs.id : null);
  function Ms(e) {
    var n, t;
    Cs
      ? Cs.openRzp(e)
      : ((Cs = new gs(e)),
        (er.iframeReference = Cs.el),
        er.setId(Nr.id),
        (n = l),
        Ft("message", Cs.onmessage.bind(Cs))(n),
        (t = As),
        kt(Cs.el)(t));
    return Cs;
  }
  yi().then(function (e) {
    Ps = e;
  }),
    (Oc.open = function (e) {
      return Oc(e).open();
    }),
    (bs.postInit = function () {
      (this.modal = { options: {} }), this.get("parent") && this.open();
    });
  var Is = bs.onNew;
  (bs.onNew = function (e, n) {
    "payment.error" === e && Nr(this, "event_paymenterror", x.href),
      Un(Is) && Is.call(this, e, n);
  }),
    (bs.initAndPrefetchPrefs = function () {
      return Cs.prefetchPrefs(this), this;
    }),
    (bs.createCheckoutAndFetchPrefs = function (e) {
      Cs
        ? Cs.makeCheckoutCallForShopify(this, e)
        : this.emit("shopify_failure");
    }),
    (bs.open = ws(function () {
      this.metadata ||
        ((this.metadata = { isBrave: Ps }),
        Ns && (this.metadata.affordability_widget_fid = Ns)),
        (this.metadata.openedAt = y.now());
      var e = (this.checkoutFrame = Ms(this));
      return (
        Nr(this, "open"),
        e.el.contentWindow ||
          (e.close(),
          e.afterClose(),
          l.alert(
            "This browser is not supported.\nPlease try payment in another browser."
          )),
        "-new.js" === Ss.src.slice(-7) && Nr(this, "oldscript", x.href),
        this
      );
    })),
    (bs.resume = function (e) {
      var n = this.checkoutFrame;
      n && n.postMessage({ event: "resume", data: e });
    }),
    (bs.close = function () {
      var e = this.checkoutFrame;
      e && e.postMessage({ event: "close" });
    });
  var Ts = ws(function () {
    Rs(), window.Intl ? (Cs = Ms()) : Yr.Track(Gr);
    try {
      Ds();
    } catch (e) {}
  });
  return (
    l.addEventListener("rzp_error", function (e) {
      var n = e.detail;
      Lr.track("cfu_error", { data: { error: n }, immediately: !0 });
    }),
    l.addEventListener("rzp_network_error", function (e) {
      var n = e.detail;
      (n && "https://lumberjack.razorpay.com/v1/track" === n.baseUrl) ||
        Lr.track("network_error", { data: n, immediately: !0 });
    }),
    (Nr.props.library = "checkoutjs"),
    (_i.handler = function (e) {
      if (et(this, Oc)) {
        var n = this.get("callback_url");
        n && Ti({ url: n, params: e, method: "POST" });
      }
    }),
    (_i.buttontext = "Pay"),
    (_i.parent = null),
    ($c.parent = function (e) {
      if (!Jo(e)) return "parent provided for embedded mode doesn't exist";
    }),
    Ts(),
    Oc
  );
})();
//# sourceMappingURL=checkout.js.map
