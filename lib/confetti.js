// canvas-confetti.js - v1.6.0
!((t, e) => {
  !(function t(e, n, a, i) {
    var o = !!(
      e.Worker &&
      e.Blob &&
      e.Promise &&
      e.OffscreenCanvas &&
      e.OffscreenCanvasRenderingContext2D &&
      e.HTMLCanvasElement &&
      e.HTMLCanvasElement.prototype.transferControlToOffscreen &&
      e.URL &&
      e.URL.createObjectURL
    )
    function r() {}
    function l(t) {
      var a = n.exports.Promise,
        i = void 0 !== a ? a : e.Promise
      return "function" == typeof i ? new i(t) : (t(r, r), null)
    }
    var c,
      s,
      u,
      d,
      f,
      h,
      g,
      m,
      b =
        ((u = Math.floor(1e3 / 60)),
        (d = {}),
        (f = 0),
        "function" == typeof requestAnimationFrame && "function" == typeof cancelAnimationFrame
          ? ((c = (t) => {
              var e = Math.random()
              return (
                (d[e] = requestAnimationFrame(function n(a) {
                  f === a || f + u - 1 < a ? ((f = a), delete d[e], t()) : (d[e] = requestAnimationFrame(n))
                })),
                e
              )
            }),
            (s = (t) => {
              d[t] && cancelAnimationFrame(d[t])
            }))
          : ((c = (t) => setTimeout(t, u)), (s = (t) => clearTimeout(t))),
        { frame: c, cancel: s }),
      v =
        ((m = {}),
        () => {
          if (h) return h
          if (!a && o) {
            var e = [
              "var CONFETTI, SIZE = {}, module = {};",
              "(" + t.toString() + ")(this, module, true, SIZE);",
              "onmessage = function(msg) {",
              "  if (msg.data.options) {",
              "    CONFETTI(msg.data.options).then(function () {",
              "      if (msg.data.callback) {",
              "        postMessage({ callback: msg.data.callback });",
              "      }",
              "    });",
              "  } else if (msg.data.reset) {",
              "    CONFETTI.reset();",
              "  } else if (msg.data.resize) {",
              "    SIZE.width = msg.data.resize.width;",
              "    SIZE.height = msg.data.resize.height;",
              "  } else if (msg.data.canvas) {",
              "    SIZE.width = msg.data.canvas.width;",
              "    SIZE.height = msg.data.canvas.height;",
              "    CONFETTI = module.exports.create(msg.data.canvas);",
              "  }",
              "}",
            ].join("\n")
            try {
              h = new Worker(URL.createObjectURL(new Blob([e])))
            } catch (t) {
              return (
                typeof console !== void 0 &&
                  typeof console.warn === "function" &&
                  console.warn("🎊 Could not load worker", t),
                null
              )
            }
            !((t) => {
              function e(e, n) {
                t.postMessage({ options: e || {}, callback: n })
              }
              ;(t.init = (e) => {
                var n = e.transferControlToOffscreen()
                t.postMessage({ canvas: n }, [n])
              }),
                (t.fire = (n, a, i) => {
                  if (g) return e(n, null), g
                  var o = Math.random().toString(36).slice(2)
                  return (g = l((a) => {
                    function r(e) {
                      e.data.callback === o && (delete m[o], t.removeEventListener("message", r), (g = null), i(), a())
                    }
                    t.addEventListener("message", r), e(n, o), (m[o] = r.bind(null, { data: { callback: o } }))
                  }))
                }),
                (t.reset = () => {
                  for (var e in (t.postMessage({ reset: !0 }), m)) m[e](), delete m[e]
                })
            })(h)
          }
          return h
        }),
      y = {
        particleCount: 50,
        angle: 90,
        spread: 45,
        startVelocity: 45,
        decay: 0.9,
        gravity: 1,
        drift: 0,
        ticks: 200,
        x: 0.5,
        y: 0.5,
        shapes: ["square", "circle"],
        zIndex: 100,
        colors: ["#26ccff", "#a25afd", "#ff5e7e", "#88ff5a", "#fcff42", "#ffa62d", "#ff36ff"],
        disableForReducedMotion: !1,
        scalar: 1,
      }
    function p(t, e, n) {
      return ((t, e) => (e ? e(t) : t))(t && null != t[e] ? t[e] : y[e], n)
    }
    function M(t) {
      return t < 0 ? 0 : Math.floor(t)
    }
    function w(t) {
      return Number.parseInt(t, 16)
    }
    function x(t) {
      return t.map(C)
    }
    function C(t) {
      var e = String(t).replace(/[^0-9a-f]/gi, "")
      return (
        e.length < 6 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]),
        { r: w(e.substring(0, 2)), g: w(e.substring(2, 4)), b: w(e.substring(4, 6)) }
      )
    }
    function k(t) {
      ;(t.width = document.documentElement.clientWidth), (t.height = document.documentElement.clientHeight)
    }
    function I(t) {
      var e = t.getBoundingClientRect()
      ;(t.width = e.width), (t.height = e.height)
    }
    function T(t, e, n, o, r) {
      var c,
        s,
        u = e.slice(),
        d = t.getContext("2d"),
        f = l((e) => {
          function l() {
            ;(c = s = null), d.clearRect(0, 0, o.width, o.height), r(), e()
          }
          ;(c = b.frame(function e() {
            !a ||
              (o.width === i.width && o.height === i.height) ||
              ((o.width = t.width = i.width), (o.height = t.height = i.height)),
              o.width || o.height || (n(t), (o.width = t.width), (o.height = t.height)),
              d.clearRect(0, 0, o.width, o.height),
              (u = u.filter((t) =>
                ((t, e) => {
                  ;(e.x += Math.cos(e.angle2D) * e.velocity + e.drift),
                    (e.y += Math.sin(e.angle2D) * e.velocity + e.gravity),
                    (e.wobble += e.wobbleSpeed),
                    (e.velocity *= e.decay),
                    (e.tiltAngle += 0.1),
                    (e.tiltSin = Math.sin(e.tiltAngle)),
                    (e.tiltCos = Math.cos(e.tiltAngle)),
                    (e.random = Math.random() + 2),
                    (e.wobbleX = e.x + 10 * e.scalar * Math.cos(e.wobble)),
                    (e.wobbleY = e.y + 10 * e.scalar * Math.sin(e.wobble))
                  var n = e.tick++ / e.totalTicks,
                    a = e.x + e.random * e.tiltCos,
                    i = e.y + e.random * e.tiltSin,
                    o = e.wobbleX + e.random * e.tiltCos,
                    r = e.wobbleY + e.random * e.tiltSin
                  return (
                    (t.fillStyle = "rgba(" + e.color.r + ", " + e.color.g + ", " + e.color.b + ", " + (1 - n) + ")"),
                    t.beginPath(),
                    "circle" === e.shape
                      ? t.ellipse
                        ? t.ellipse(
                            e.x,
                            e.y,
                            Math.abs(o - a) * e.ovalScalar,
                            Math.abs(r - i) * e.ovalScalar,
                            (Math.PI / 10) * e.wobble,
                            0,
                            2 * Math.PI,
                          )
                        : ((t, e, n, a, i, o, r, l, c) => {
                            t.save(),
                              t.translate(e, n),
                              t.rotate(o),
                              t.scale(a, i),
                              t.arc(0, 0, 1, r, l, c),
                              t.restore()
                          })(
                            t,
                            e.x,
                            e.y,
                            Math.abs(o - a) * e.ovalScalar,
                            Math.abs(r - i) * e.ovalScalar,
                            (Math.PI / 10) * e.wobble,
                            0,
                            2 * Math.PI,
                          )
                      : (t.moveTo(Math.floor(e.x), Math.floor(e.y)),
                        t.lineTo(Math.floor(e.wobbleX), Math.floor(i)),
                        t.lineTo(Math.floor(o), Math.floor(r)),
                        t.lineTo(Math.floor(a), Math.floor(e.wobbleY))),
                    t.closePath(),
                    t.fill(),
                    e.tick < e.totalTicks
                  )
                })(d, t),
              )).length
                ? (c = b.frame(e))
                : l()
          })),
            (s = l)
        })
      return {
        addFettis: (t) => ((u = u.concat(t)), f),
        canvas: t,
        promise: f,
        reset: () => {
          c && b.cancel(c), s && s()
        },
      }
    }
    function E(t, n) {
      var a,
        i = !t,
        r = !!p(n || {}, "resize"),
        c = p(n, "disableForReducedMotion", Boolean),
        s = o && !!p(n || {}, "useWorker") ? v() : null,
        u = i ? k : I,
        d = !(!t || !s) && !!t.__confetti_initialized,
        f = "function" == typeof matchMedia && matchMedia("(prefers-reduced-motion)").matches
      function h(e, n, i) {
        for (
          var o,
            r,
            l,
            c,
            s,
            d = p(e, "particleCount", M),
            f = p(e, "angle", Number),
            h = p(e, "spread", Number),
            g = p(e, "startVelocity", Number),
            m = p(e, "decay", Number),
            b = p(e, "gravity", Number),
            v = p(e, "drift", Number),
            y = p(e, "colors", x),
            w = p(e, "ticks", Number),
            C = p(e, "shapes"),
            k = p(e, "scalar"),
            I = ((t) => {
              var e = p(t, "origin", Object)
              return (e.x = p(e, "x", Number)), (e.y = p(e, "y", Number)), e
            })(e),
            E = d,
            S = [],
            F = t.width * I.x,
            N = t.height * I.y;
          E--;
        )
          S.push(
            ((o = {
              x: F,
              y: N,
              angle: f,
              spread: h,
              startVelocity: g,
              color: y[E % y.length],
              shape: C[((c = 0), (s = C.length), Math.floor(Math.random() * (s - c)) + c)],
              ticks: w,
              decay: m,
              gravity: b,
              drift: v,
              scalar: k,
            }),
            (r = void 0),
            (l = void 0),
            (r = o.angle * (Math.PI / 180)),
            (l = o.spread * (Math.PI / 180)),
            {
              x: o.x,
              y: o.y,
              wobble: 10 * Math.random(),
              wobbleSpeed: Math.min(0.11, 0.1 * Math.random() + 0.05),
              velocity: 0.5 * o.startVelocity + Math.random() * o.startVelocity,
              angle2D: -r + (0.5 * l - Math.random() * l),
              tiltAngle: (0.5 * Math.random() + 0.25) * Math.PI,
              color: o.color,
              shape: o.shape,
              tick: 0,
              totalTicks: o.ticks,
              decay: o.decay,
              drift: o.drift,
              random: Math.random() + 2,
              tiltSin: 0,
              tiltCos: 0,
              wobbleX: 0,
              wobbleY: 0,
              gravity: 3 * o.gravity,
              ovalScalar: 0.6,
              scalar: o.scalar,
            }),
          )
        return a ? a.addFettis(S) : (a = T(t, S, u, n, i)).promise
      }
      function g(n) {
        var o = c || p(n, "disableForReducedMotion", Boolean),
          g = p(n, "zIndex", Number)
        if (o && f)
          return l((t) => {
            t()
          })
        i && a
          ? (t = a.canvas)
          : i &&
            !t &&
            ((t = ((t) => {
              var e = document.createElement("canvas")
              return (
                (e.style.position = "fixed"),
                (e.style.top = "0px"),
                (e.style.left = "0px"),
                (e.style.pointerEvents = "none"),
                (e.style.zIndex = t),
                e
              )
            })(g)),
            document.body.appendChild(t)),
          r && !d && u(t)
        var m = { width: t.width, height: t.height }
        function b() {
          if (s) {
            var e = {
              getBoundingClientRect: () => {
                if (!i) return t.getBoundingClientRect()
              },
            }
            return u(e), void s.postMessage({ resize: { width: e.width, height: e.height } })
          }
          m.width = m.height = null
        }
        function v() {
          ;(a = null),
            r && e.removeEventListener("resize", b),
            i && t && (document.body.removeChild(t), (t = null), (d = !1))
        }
        return (
          s && !d && s.init(t),
          (d = !0),
          s && (t.__confetti_initialized = !0),
          r && e.addEventListener("resize", b, !1),
          s ? s.fire(n, m, v) : h(n, m, v)
        )
      }
      return (
        (g.reset = () => {
          s && s.reset(), a && a.reset()
        }),
        g
      )
    }
    function S() {
      return f || (f = E(null, { useWorker: !0, resize: !0 })), f
    }
    ;(n.exports = function () {
      return S().apply(this, arguments)
    }),
      (n.exports.reset = () => {
        S().reset()
      }),
      (n.exports.create = E)
  })(
    (function () {
      return "undefined" != typeof window ? window : "undefined" != typeof self ? self : this || {}
    })(),
    t,
    !1,
  ),
    (e.confetti = t.exports)
})(window, {})
