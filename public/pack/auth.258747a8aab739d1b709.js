var auth = webpackJsonp_name_([ 17, 2 ], {
0: function(t, e, n) {
"use strict";
function r() {
var t = new i(window.authOptions);
document.getElementById("auth-form").appendChild(t.getElem());
}
e.AuthModal = n(84);
var i = n(128);
r();
},
28: function(t, e, n) {
"use strict";
function r(t) {
function e(t, e) {
var n = new CustomEvent(t);
return n.originalEvent = e, n;
}
function n(t, n) {
var r = e("fail", n);
r.reason = t, i.dispatchEvent(r);
}
function r(t, n) {
var r = e("success", n);
r.result = t, i.dispatchEvent(r);
}
var i = new XMLHttpRequest(), a = t.method || "GET", s = t.body, c = t.url;
i.open(a, c, t.sync ? !1 : !0), i.method = a;
var l = o();
l && !t.skipCsrf && i.setRequestHeader("X-XSRF-TOKEN", l), "[object Object]" == {}.toString.call(s) && (i.setRequestHeader("Content-Type", "application/json;charset=UTF-8"), 
s = JSON.stringify(s)), t.noDocumentEvents || (i.addEventListener("loadstart", function(t) {
i.timeStart = Date.now();
var n = e("xhrstart", t);
document.dispatchEvent(n);
}), i.addEventListener("loadend", function(t) {
var n = e("xhrend", t);
document.dispatchEvent(n);
}), i.addEventListener("success", function(t) {
var n = e("xhrsuccess", t);
n.result = t.result, document.dispatchEvent(n);
}), i.addEventListener("fail", function(t) {
var n = e("xhrfail", t);
n.reason = t.reason, document.dispatchEvent(n);
})), t.raw || i.setRequestHeader("Accept", "application/json"), i.setRequestHeader("X-Requested-With", "XMLHttpRequest");
var u = t.normalStatuses || [ 200 ];
return i.addEventListener("error", function(t) {
n("Ошибка связи с сервером.", t);
}), i.addEventListener("timeout", function(t) {
n("Превышено максимально допустимое время ожидания ответа от сервера.", t);
}), i.addEventListener("abort", function(t) {
n("Запрос был прерван.", t);
}), i.addEventListener("load", function(e) {
if (!i.status) return void n("Не получен ответ от сервера.", e);
if (-1 == u.indexOf(i.status)) return void n("Ошибка на стороне сервера (код " + i.status + "), попытайтесь позднее", e);
var o = i.responseText, a = i.getResponseHeader("Content-Type");
if (a.match(/^application\/json/) || t.json) try {
o = JSON.parse(o);
} catch (e) {
return void n("Некорректный формат ответа от сервера", e);
}
r(o, e);
}), setTimeout(function() {
i.send(s);
}, 0), i;
}
var i = n(23), o = n(77);
document.addEventListener("xhrfail", function(t) {
new i.Error(t.reason);
}), t.exports = r;
},
49: function(t, e, n) {
"use strict";
function r(t) {
t.bem = i, t.thumb = o;
}
var i = n(78)(), o = n(56).thumb;
t.exports = function(t, e) {
return e = e ? Object.create(e) : {}, r(e), t(e);
};
},
56: function(t, e) {
"use strict";
e.thumb = function(t, e, n) {
if (!t) return t;
var r = window.devicePixelRatio;
e *= r, n *= r;
var i = 160 >= e && 160 >= n ? "t" : 320 >= e && 320 >= n ? "m" : 640 >= e && 640 >= n ? "i" : 1024 >= e && 1024 >= n ? "h" : "";
return t.slice(0, t.lastIndexOf(".")) + i + t.slice(t.lastIndexOf("."));
};
},
77: function(t) {
"use strict";
t.exports = function() {
var t = document.cookie.match(/XSRF-TOKEN=([\w-]+)/);
return t ? t[1] : null;
};
},
78: function(t, e, n) {
"use strict";
var r = n(108);
t.exports = function(t) {
function e(t, e, n, i, o) {
var a = o || "div";
switch (a) {
case "img":
n.alt && !n.title && (n.title = ""), n.title && !n.alt && (n.alt = n.title), n.alt || (n.alt = "");
break;

case "input":
n.type || (n.type = "text");
break;

case "html":
t.push("<!DOCTYPE HTML>");
break;

case "a":
n.href || (n.href = "#");
}
t.push("<" + a + r.attrs(r.merge([ n ]), !0) + ">"), e && e(), -1 == [ "area", "base", "br", "col", "embed", "hr", "img", "input", "keygen", "link", "menuitem", "meta", "param", "source", "track", "wbr" ].indexOf(a) && t.push("</" + a + ">");
}
return t = t || {}, t.prefix = t.prefix || "", t.element = t.element || "__", t.modifier = t.modifier || "_", 
function(n, r, i, o) {
var a = this.block, s = this.attributes || {};
if (!s.class && i && !o) throw Error("Block without class: " + i);
if (s.class) {
var c = s.class;
c instanceof Array && (c = c.join(" ")), c = c.split(" ");
var l;
try {
l = c[0].match(RegExp("^(((?!" + t.element + "|" + t.modifier + ").)+)"))[1];
} catch (u) {
throw Error("Incorrect bem class: " + c[0]);
}
o ? c[0] = r[r.length - 1] + t.element + c[0] : r[r.length] = l;
var h = (o ? r[r.length - 1] + t.element : "") + l;
-1 === c.indexOf(h) && (c[c.length] = h);
for (var f = 0; f < c.length; f++) {
var d = c[f];
d.match(RegExp("^(?!" + t.element + ")" + t.modifier)) ? c[f] = h + d : d.match(RegExp("^" + t.element)) && (r[r.length - 2] ? c[f] = r[r.length - 2] + d : c[f] = r[r.length - 1] + d), 
c[f].match(RegExp("^" + h + "($|(?=" + t.element + "|" + t.modifier + "))")) && (c[f] = t.prefix + c[f]);
}
s.class = c.sort().join(" ");
}
e(n, a, s, r, i), o || r.pop();
};
};
},
84: function(t, e, n) {
"use strict";
function r(t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
function i(t, e) {
if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
t.prototype = Object.create(e && e.prototype, {
constructor: {
value: t,
enumerable: !1,
writable: !0,
configurable: !0
}
}), e && (t.__proto__ = e);
}
var o = function() {
function t(t, e) {
for (var n = 0; n < e.length; n++) {
var r = e[n];
r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
Object.defineProperty(t, r.key, r);
}
}
return function(e, n, r) {
return n && t(e.prototype, n), r && t(e, r), e;
};
}(), a = function(t, e, n) {
for (var r = !0; r; ) {
var i = t, o = e, a = n;
s = l = c = void 0, r = !1;
var s = Object.getOwnPropertyDescriptor(i, o);
if (void 0 !== s) {
if ("value" in s) return s.value;
var c = s.get;
return void 0 === c ? void 0 : c.call(a);
}
var l = Object.getPrototypeOf(i);
if (null === l) return void 0;
t = l, e = o, n = a, r = !0;
}
}, s = n(10), c = n(128), l = function(t) {
function e(t) {
r(this, e), a(Object.getPrototypeOf(e.prototype), "constructor", this).call(this, t), 
this.options = t || {};
var n = new c(this.options);
this.setContent(n.getElem());
}
return i(e, t), o(e, [ {
key: "render",
value: function() {
a(Object.getPrototypeOf(e.prototype), "render", this).call(this), this.elem.classList.add("login-form-modal");
}
} ]), e;
}(s);
t.exports = l;
},
108: function(t, e, n) {
"use strict";
function r(t) {
return null != t && "" !== t;
}
function i(t) {
return (Array.isArray(t) ? t.map(i) : t && "object" == typeof t ? Object.keys(t).filter(function(e) {
return t[e];
}) : [ t ]).filter(r).join(" ");
}
e.merge = function o(t, e) {
if (1 === arguments.length) {
for (var n = t[0], i = 1; i < t.length; i++) n = o(n, t[i]);
return n;
}
var a = t.class, s = e.class;
(a || s) && (a = a || [], s = s || [], Array.isArray(a) || (a = [ a ]), Array.isArray(s) || (s = [ s ]), 
t.class = a.concat(s).filter(r));
for (var c in e) "class" != c && (t[c] = e[c]);
return t;
}, e.joinClasses = i, e.cls = function(t, n) {
for (var r = [], o = 0; o < t.length; o++) n && n[o] ? r.push(e.escape(i([ t[o] ]))) : r.push(i(t[o]));
var a = i(r);
return a.length ? ' class="' + a + '"' : "";
}, e.style = function(t) {
return t && "object" == typeof t ? Object.keys(t).map(function(e) {
return e + ":" + t[e];
}).join(";") : t;
}, e.attr = function(t, n, r, i) {
return "style" === t && (n = e.style(n)), "boolean" == typeof n || null == n ? n ? " " + (i ? t : t + '="' + t + '"') : "" : 0 == t.indexOf("data") && "string" != typeof n ? (-1 !== JSON.stringify(n).indexOf("&"), 
n && "function" == typeof n.toISOString, " " + t + "='" + JSON.stringify(n).replace(/'/g, "&apos;") + "'") : r ? (n && "function" == typeof n.toISOString, 
" " + t + '="' + e.escape(n) + '"') : (n && "function" == typeof n.toISOString, 
" " + t + '="' + n + '"');
}, e.attrs = function(t, n) {
var r = [], o = Object.keys(t);
if (o.length) for (var a = 0; a < o.length; ++a) {
var s = o[a], c = t[s];
"class" == s ? (c = i(c)) && r.push(" " + s + '="' + c + '"') : r.push(e.attr(s, c, !1, n));
}
return r.join("");
}, e.escape = function(t) {
var e = (t + "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
return e === "" + t ? t : e;
}, e.rethrow = function a(t, e, r, i) {
if (!(t instanceof Error)) throw t;
if (!("undefined" == typeof window && e || i)) throw t.message += " on line " + r, 
t;
try {
i = i || n(116).readFileSync(e, "utf8");
} catch (o) {
a(t, null, r);
}
var s = 3, c = i.split("\n"), l = Math.max(r - s, 0), u = Math.min(c.length, r + s), s = c.slice(l, u).map(function(t, e) {
var n = e + l + 1;
return (n == r ? "  > " : "    ") + n + "| " + t;
}).join("\n");
throw t.path = e, t.message = (e || "Jade") + ":" + r + "\n" + s + "\n\n" + t.message, 
t;
};
},
113: function(t, e, n) {
var r = n(108);
t.exports = function(t) {
var e = [], n = {}, i = t || {};
return function(t) {
e.push("");
var i = [];
n.b = function(n, r, o) {
this && this.block, this && this.attributes || {};
t.call(this, e, i, n, r, o);
}, n.e = function(t) {
var e = this && this.block, i = this && this.attributes || {};
n.b.call({
block: function() {
e && e();
},
attributes: r.merge([ i ])
}, t, !0);
}, n.b.call({
block: function() {
n.e.call({
block: function() {
n.e.call({
block: function() {
n.e.call({
block: function() {
e.push("Вход в сайт");
},
attributes: {
"class": "title"
}
}, "h4"), n.e.call({
block: function() {
n.e.call({
block: function() {
e.push("регистрация");
},
attributes: {
type: "button",
"data-switch": "register-form",
"class": "button-link __register"
}
}, "button");
},
attributes: {
"class": "header-aside"
}
});
},
attributes: {
"class": "line __header"
}
}), n.e.call({
attributes: {
"data-notification": !0,
"class": "line __notification"
}
}), n.e.call({
block: function() {
n.e.call({
block: function() {
e.push("Email:");
},
attributes: {
"for": "auth-email",
"class": "label"
}
}, "label"), n.b.call({
block: function() {
n.e.call({
attributes: {
id: "auth-email",
name: "email",
type: "email",
autofocus: !0,
"class": "control"
}
}, "input");
},
attributes: {
"class": "text-input __input"
}
}, "span");
},
attributes: {
"class": "line"
}
}), n.e.call({
block: function() {
n.e.call({
block: function() {
e.push("Пароль:");
},
attributes: {
"for": "auth-password",
"class": "label"
}
}, "label"), n.b.call({
block: function() {
n.e.call({
attributes: {
id: "auth-password",
type: "password",
name: "password",
"class": "control"
}
}, "input"), n.e.call({
block: function() {
e.push("Забыли?");
},
attributes: {
type: "button",
"data-switch": "forgot-form",
"class": "aside __forgot __button-link"
}
}, "button");
},
attributes: {
"class": "text-input _with-aside __input"
}
}, "span");
},
attributes: {
"class": "line"
}
}), n.e.call({
block: function() {
n.b.call({
block: function() {
n.e.call({
block: function() {
e.push("Войти");
},
attributes: {
"class": "text"
}
}, "span");
},
attributes: {
type: "submit",
"class": "button _action"
}
}, "button"), n.e.call({
block: function() {
e.push("Отмена");
},
attributes: {
"class": "close-link tablet-only modal__close"
}
}, "a");
},
attributes: {
"class": "line __footer"
}
}), n.e.call({
block: function() {
n.e.call({
block: function() {
e.push("Вход через социальные сети");
},
attributes: {
"class": "social-logins-title"
}
}, "h5"), e.push(" "), n.b.call({
block: function() {
e.push("Facebook");
},
attributes: {
"data-provider": "facebook",
"class": "social-login _facebook __social-login"
}
}, "button"), e.push(" "), n.b.call({
block: function() {
e.push("Google+");
},
attributes: {
"data-provider": "google",
"class": "social-login _google __social-login"
}
}, "button"), e.push(" "), n.b.call({
block: function() {
e.push("Вконтакте");
},
attributes: {
"data-provider": "vkontakte",
"class": "social-login _vkontakte __social-login"
}
}, "button"), e.push(" "), n.b.call({
block: function() {
e.push("Github");
},
attributes: {
"data-provider": "github",
"class": "social-login _github __social-login"
}
}, "button"), e.push(" "), n.b.call({
block: function() {
e.push("Яндекс");
},
attributes: {
"data-provider": "yandex",
"class": "social-login _yandex __social-login"
}
}, "button");
},
attributes: {
"class": "line __social-logins"
}
});
},
attributes: {
action: "#",
"class": "form"
}
}, "form");
},
attributes: {
"data-form": "login",
"class": "login-form"
}
});
}.call(this, "bem" in i ? i.bem : "undefined" != typeof bem ? bem : void 0), e.join("");
};
},
114: function(t, e, n) {
var r = n(108);
t.exports = function(t) {
var e = [], n = {}, i = t || {};
return function(t) {
e.push("");
var i = [];
n.b = function(n, r, o) {
this && this.block, this && this.attributes || {};
t.call(this, e, i, n, r, o);
}, n.e = function(t) {
var e = this && this.block, i = this && this.attributes || {};
n.b.call({
block: function() {
e && e();
},
attributes: r.merge([ i ])
}, t, !0);
}, n.b.call({
block: function() {
n.e.call({
block: function() {
n.e.call({
block: function() {
n.e.call({
block: function() {
e.push("Регистрация");
},
attributes: {
"class": "title"
}
}, "h4"), n.e.call({
block: function() {
n.e.call({
block: function() {
e.push("вход");
},
attributes: {
type: "button",
"data-switch": "login-form",
"class": "button-link"
}
}, "button");
},
attributes: {
"class": "header-aside"
}
});
},
attributes: {
"class": "line __header"
}
}), n.e.call({
attributes: {
"data-notification": !0,
"class": "line __notification"
}
}), n.e.call({
block: function() {
n.e.call({
block: function() {
e.push("Email:");
},
attributes: {
"for": "register-email",
"class": "label"
}
}, "label"), n.b.call({
block: function() {
n.e.call({
attributes: {
id: "register-email",
name: "email",
type: "email",
required: !0,
autofocus: !0,
"class": "control"
}
}, "input");
},
attributes: {
"class": "text-input __input"
}
}, "span");
},
attributes: {
"class": "line"
}
}), n.e.call({
block: function() {
n.e.call({
block: function() {
e.push("Имя пользователя:");
},
attributes: {
"for": "register-displayName",
"class": "label"
}
}, "label"), n.b.call({
block: function() {
n.e.call({
attributes: {
id: "register-displayName",
name: "displayName",
required: !0,
"class": "control"
}
}, "input");
},
attributes: {
"class": "text-input __input"
}
}, "span");
},
attributes: {
"class": "line"
}
}), n.e.call({
block: function() {
n.e.call({
block: function() {
e.push("Пароль:");
},
attributes: {
"for": "register-password",
"class": "label"
}
}, "label"), n.b.call({
block: function() {
n.e.call({
attributes: {
id: "register-password",
type: "password",
name: "password",
required: !0,
minlength: "4",
"class": "control"
}
}, "input");
},
attributes: {
"class": "text-input __input"
}
}, "span");
},
attributes: {
"class": "line"
}
}), n.e.call({
block: function() {
n.b.call({
block: function() {
n.e.call({
block: function() {
e.push("Зарегистрироваться");
},
attributes: {
"class": "text"
}
}, "span");
},
attributes: {
type: "submit",
"class": "button _action submit"
}
}, "button"), n.e.call({
block: function() {
e.push("Отмена");
},
attributes: {
"class": "close-link tablet-only modal__close"
}
}, "a");
},
attributes: {
"class": "line __footer"
}
}), n.e.call({
block: function() {
e.push('Регистрируясь, вы принимаете <a href="/agreement">пользовательское соглашение</a>.');
},
attributes: {
"class": "line __agreement"
}
}), n.e.call({
block: function() {
n.e.call({
block: function() {
e.push("Вход через социальные сети");
},
attributes: {
"class": "social-logins-title"
}
}, "h5"), e.push(" "), n.b.call({
block: function() {
e.push("Facebook");
},
attributes: {
"data-provider": "facebook",
"class": "social-login _facebook __social-login"
}
}, "button"), e.push(" "), n.b.call({
block: function() {
e.push("Google+");
},
attributes: {
"data-provider": "google",
"class": "social-login _google __social-login"
}
}, "button"), e.push(" "), n.b.call({
block: function() {
e.push("Вконтакте");
},
attributes: {
"data-provider": "vkontakte",
"class": "social-login _vkontakte __social-login"
}
}, "button"), e.push(" "), n.b.call({
block: function() {
e.push("Github");
},
attributes: {
"data-provider": "github",
"class": "social-login _github __social-login"
}
}, "button"), e.push(" "), n.b.call({
block: function() {
e.push("Яндекс");
},
attributes: {
"data-provider": "yandex",
"class": "social-login _yandex __social-login"
}
}, "button");
},
attributes: {
"class": "line __social-logins"
}
});
},
attributes: {
action: "#",
"data-form": "register",
"class": "form"
}
}, "form");
},
attributes: {
"class": "login-form"
}
});
}.call(this, "bem" in i ? i.bem : "undefined" != typeof bem ? bem : void 0), e.join("");
};
},
115: function(t, e, n) {
var r = n(108);
t.exports = function(t) {
var e = [], n = {}, i = t || {};
return function(t) {
e.push("");
var i = [];
n.b = function(n, r, o) {
this && this.block, this && this.attributes || {};
t.call(this, e, i, n, r, o);
}, n.e = function(t) {
var e = this && this.block, i = this && this.attributes || {};
n.b.call({
block: function() {
e && e();
},
attributes: r.merge([ i ])
}, t, !0);
}, n.b.call({
block: function() {
n.e.call({
block: function() {
n.e.call({
block: function() {
n.e.call({
block: function() {
e.push("Восстановление пароля");
},
attributes: {
"class": "title"
}
}, "h4");
},
attributes: {
"class": "line __header"
}
}), n.e.call({
attributes: {
"data-notification": !0,
"class": "line __notification"
}
}), n.e.call({
block: function() {
n.e.call({
block: function() {
e.push("Email:");
},
attributes: {
"for": "forgot-email",
"class": "label"
}
}, "label"), n.b.call({
block: function() {
n.e.call({
attributes: {
id: "forgot-email",
name: "email",
type: "email",
autofocus: !0,
"class": "control"
}
}, "input");
},
attributes: {
"class": "text-input __input"
}
}, "span");
},
attributes: {
"class": "line"
}
}), n.e.call({
block: function() {
n.b.call({
block: function() {
n.e.call({
block: function() {
e.push("Восстановить пароль");
},
attributes: {
"class": "text"
}
}, "span");
},
attributes: {
type: "submit",
"class": "button _action __submit"
}
}, "button");
},
attributes: {
"class": "line"
}
}), n.e.call({
block: function() {
n.e.call({
block: function() {
e.push("Вход");
},
attributes: {
type: "button",
"data-switch": "login-form",
"class": "button-link"
}
}, "button"), e.push(" "), n.e.call({
block: function() {
e.push("/");
},
attributes: {
"class": "separator"
}
}, "span"), e.push(" "), n.e.call({
block: function() {
e.push("Регистрация");
},
attributes: {
"data-switch": "register-form",
"class": "button-link"
}
}, "button"), n.e.call({
block: function() {
e.push("Отмена");
},
attributes: {
"class": "close-link tablet-only modal__close"
}
}, "a");
},
attributes: {
"class": "line __footer"
}
}), n.e.call({
block: function() {
n.e.call({
block: function() {
e.push("Вход через социальные сети");
},
attributes: {
"class": "social-logins-title"
}
}, "h5"), e.push(" "), n.b.call({
block: function() {
e.push("Facebook");
},
attributes: {
"data-provider": "facebook",
"class": "social-login _facebook __social-login"
}
}, "button"), e.push(" "), n.b.call({
block: function() {
e.push("Google+");
},
attributes: {
"data-provider": "google",
"class": "social-login _google __social-login"
}
}, "button"), e.push(" "), n.b.call({
block: function() {
e.push("Вконтакте");
},
attributes: {
"data-provider": "vkontakte",
"class": "social-login _vkontakte __social-login"
}
}, "button"), e.push(" "), n.b.call({
block: function() {
e.push("Github");
},
attributes: {
"data-provider": "github",
"class": "social-login _github __social-login"
}
}, "button"), e.push(" "), n.b.call({
block: function() {
e.push("Яндекс");
},
attributes: {
"data-provider": "yandex",
"class": "social-login _yandex __social-login"
}
}, "button");
},
attributes: {
"class": "line __social-logins"
}
});
},
attributes: {
action: "#",
"data-form": "forgot",
"class": "form"
}
}, "form");
},
attributes: {
"class": "login-form"
}
});
}.call(this, "bem" in i ? i.bem : "undefined" != typeof bem ? bem : void 0), e.join("");
};
},
116: function() {},
128: function(t, e, n) {
"use strict";
function r(t, e) {
if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
}
var i = function() {
function t(t, e) {
for (var n = 0; n < e.length; n++) {
var r = e[n];
r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), 
Object.defineProperty(t, r.key, r);
}
}
return function(e, n, r) {
return n && t(e.prototype, n), r && t(e, r), e;
};
}(), o = n(28), a = n(27), s = n(53), c = n(113), l = n(114), u = n(115), h = n(49), f = function() {
function t(e) {
r(this, t), this.options = e, e.successRedirect || (e.successRedirect = window.location.href);
}
return i(t, [ {
key: "render",
value: function() {
this.elem = document.createElement("div"), this.elem.innerHTML = h(c), this.options.message && this.showFormMessage(this.options.message), 
this.initEventHandlers();
}
}, {
key: "getElem",
value: function() {
return this.elem || this.render(), this.elem;
}
}, {
key: "successRedirect",
value: function() {
window.location.href == this.options.successRedirect ? window.location.reload() : window.location.href = this.options.successRedirect;
}
}, {
key: "clearFormMessages",
value: function() {
[].forEach.call(this.elem.querySelectorAll(".text-input_invalid"), function(t) {
t.classList.remove("text-input_invalid");
}), [].forEach.call(this.elem.querySelectorAll(".text-input__err"), function(t) {
t.remove();
}), this.elem.querySelector("[data-notification]").innerHTML = "";
}
}, {
key: "request",
value: function e(t) {
var e = o(t);
return e.addEventListener("loadstart", function() {
var t = this.startRequestIndication();
e.addEventListener("loadend", t);
}.bind(this)), e;
}
}, {
key: "startRequestIndication",
value: function() {
this.elem.classList.add("modal-overlay_light");
var t = this, e = this.elem.querySelector('[type="submit"]');
if (e) {
var n = new s({
elem: e,
size: "small",
"class": "",
elemClass: "button_loading"
});
n.start();
}
return function() {
t.elem.classList.remove("modal-overlay_light"), n && n.stop();
};
}
}, {
key: "initEventHandlers",
value: function() {
this.delegate('[data-switch="register-form"]', "click", function(t) {
t.preventDefault(), this.elem.innerHTML = h(l);
}), this.delegate('[data-switch="login-form"]', "click", function(t) {
t.preventDefault(), this.elem.innerHTML = h(c);
}), this.delegate('[data-switch="forgot-form"]', "click", function(t) {
t.preventDefault();
var e = this.elem.querySelector('[type="email"]');
this.elem.innerHTML = h(u);
var n = this.elem.querySelector('[type="email"]');
n.value = e.value;
}), this.delegate('[data-form="login"]', "submit", function(t) {
t.preventDefault(), this.submitLoginForm(t.target);
}), this.delegate('[data-form="register"]', "submit", function(t) {
t.preventDefault(), this.submitRegisterForm(t.target);
}), this.delegate('[data-form="forgot"]', "submit", function(t) {
t.preventDefault(), this.submitForgotForm(t.target);
}), this.delegate("[data-provider]", "click", function(t) {
t.preventDefault(), this.openAuthPopup("/auth/login/" + t.delegateTarget.dataset.provider);
}), this.delegate("[data-action-verify-email]", "click", function(t) {
t.preventDefault();
var e = new FormData(), n = t.delegateTarget.dataset.actionVerifyEmail;
e.append("email", n);
var r = this.request({
method: "POST",
url: "/auth/reverify",
body: e
}), i = this;
r.addEventListener("success", function(t) {
200 == this.status ? i.showFormMessage({
html: "\n            <p>Письмо-подтверждение отправлено ещё раз.</p>\n            <p><a href='#' data-action-verify-email='" + n + "'>перезапросить подтверждение.</a></p>\n            ",
type: "success"
}) : i.showFormMessage({
type: "error",
html: t.result
});
});
});
}
}, {
key: "submitRegisterForm",
value: function(t) {
this.clearFormMessages();
var e = !1;
if (t.elements.email.value || (e = !0, this.showInputError(t.elements.email, "Введите, пожалуста, email.")), 
t.elements.displayName.value || (e = !0, this.showInputError(t.elements.displayName, "Введите, пожалуста, имя пользователя.")), 
t.elements.password.value || (e = !0, this.showInputError(t.elements.password, "Введите, пожалуста, пароль.")), 
!e) {
var n = new FormData(t);
n.append("successRedirect", this.options.successRedirect);
var r = this.request({
method: "POST",
url: "/auth/register",
normalStatuses: [ 201, 400 ],
body: n
}), i = this;
r.addEventListener("success", function(e) {
if (201 == this.status) return i.elem.innerHTML = h(c), void i.showFormMessage({
html: "<p>С адреса notify@javascript.ru отправлено письмо со ссылкой-подтверждением.</p><p><a href='#' data-action-verify-email='" + t.elements.email.value + "'>перезапросить подтверждение.</a></p>",
type: "success"
});
if (400 != this.status) i.showFormMessage({
html: "Неизвестный статус ответа сервера",
type: "error"
}); else for (var n in e.result.errors) i.showInputError(t.elements[n], e.result.errors[n]);
});
}
}
}, {
key: "submitForgotForm",
value: function(t) {
this.clearFormMessages();
var e = !1;
if (t.elements.email.value || (e = !0, this.showInputError(t.elements.email, "Введите, пожалуста, email.")), 
!e) {
var n = new FormData(t);
n.append("successRedirect", this.options.successRedirect);
var r = this.request({
method: "POST",
url: "/auth/forgot",
normalStatuses: [ 200, 404, 403 ],
body: n
}), i = this;
r.addEventListener("success", function(t) {
200 == this.status ? (i.elem.innerHTML = h(c), i.showFormMessage({
html: t.result,
type: "success"
})) : 404 == this.status ? i.showFormMessage({
html: t.result,
type: "error"
}) : 403 == this.status && i.showFormMessage({
html: t.result.message || "Действие запрещено.",
type: "error"
});
});
}
}
}, {
key: "showInputError",
value: function(t, e) {
t.parentNode.classList.add("text-input_invalid");
var n = document.createElement("span");
n.className = "text-input__err", n.innerHTML = e, t.parentNode.appendChild(n);
}
}, {
key: "showFormMessage",
value: function(t) {
var e = t.html;
0 !== e.indexOf("<p>") && (e = "<p>" + e + "</p>");
var n = t.type;
if (-1 == [ "info", "error", "warning", "success" ].indexOf(n)) throw Error("Unsupported type: " + n);
var r = document.createElement("div");
r.className = "login-form__" + n, r.innerHTML = e, this.elem.querySelector("[data-notification]").innerHTML = "", 
this.elem.querySelector("[data-notification]").appendChild(r);
}
}, {
key: "submitLoginForm",
value: function(t) {
var e = this;
this.clearFormMessages();
var n = !1;
if (t.elements.email.value || (n = !0, this.showInputError(t.elements.email, "Введите, пожалуста, email.")), 
t.elements.password.value || (n = !0, this.showInputError(t.elements.password, "Введите, пожалуста, пароль.")), 
!n) {
var r = o({
method: "POST",
url: "/auth/login/local",
noDocumentEvents: !0,
normalStatuses: [ 200, 401 ],
body: new FormData(t)
}), i = this.startRequestIndication();
r.addEventListener("success", function(t) {
return 401 == r.status ? (i(), void e.onAuthFailure(t.result.message)) : void (e.options.callback ? (i(), 
e.onAuthSuccess(t.result.user)) : e.onAuthSuccess(t.result.user));
}), r.addEventListener("fail", function(t) {
i(), e.onAuthFailure(t.reason);
});
}
}
}, {
key: "openAuthPopup",
value: function(t) {
this.authPopup && !this.authPopup.closed && this.authPopup.close();
var e = 800, n = 600, r = (window.outerHeight - n) / 2, i = (window.outerWidth - e) / 2;
window.authForm = this, this.authPopup = window.open(t, "authForm", "width=" + e + ",height=" + n + ",scrollbars=0,top=" + r + ",left=" + i);
}
}, {
key: "onAuthSuccess",
value: function(t) {
window.currentUser = t, this.options.callback ? this.options.callback() : this.successRedirect();
}
}, {
key: "onAuthFailure",
value: function(t) {
this.showFormMessage({
html: t || "Отказ в авторизации.",
type: "error"
});
}
} ]), t;
}();
a.delegateMixin(f.prototype), t.exports = f;
}
});
//# sourceMappingURL=auth.258747a8aab739d1b709.js.map