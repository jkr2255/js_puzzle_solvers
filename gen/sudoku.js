!function t(e,n,r){function i(a,s){if(!n[a]){if(!e[a]){var u="function"==typeof require&&require;if(!s&&u)return u(a,!0);if(o)return o(a,!0);var l=new Error("Cannot find module '"+a+"'");throw l.code="MODULE_NOT_FOUND",l}var c=n[a]={exports:{}};e[a][0].call(c.exports,function(t){var n=e[a][1][t];return i(n?n:t)},c,c.exports,t,e,n,r)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<r.length;a++)i(r[a]);return i}({1:[function(t,e,n){!function(t,r){"object"==typeof n&&"undefined"!=typeof e?r(n):"function"==typeof define&&define.amd?define(["exports"],r):r(t.riot=t.riot||{})}(this,function(t){"use strict";function e(t){return zt.test(t)}function n(t){return Wt.test(t)}function r(t){return typeof t===Pt}function i(t){return t&&typeof t===It}function o(t){return typeof t===Vt}function a(t){return typeof t===Rt}function s(t){return o(t)||null===t||""===t}function u(t){return Array.isArray(t)||t instanceof Array}function l(t,e){var n=Object.getOwnPropertyDescriptor(t,e);return o(t[e])||n&&n.writable}function c(t){return Ft.test(t)}function f(t,e){return(e||document).querySelectorAll(t)}function p(t,e){return(e||document).querySelector(t)}function d(){return document.createDocumentFragment()}function h(){return document.createTextNode("")}function m(t,e){return e?document.createElementNS("http://www.w3.org/2000/svg","svg"):document.createElement(t)}function g(t){if(t.outerHTML)return t.outerHTML;var e=m("div");return e.appendChild(t.cloneNode(!0)),e.innerHTML}function v(t,e){if(o(t.innerHTML)){var n=(new DOMParser).parseFromString(e,"application/xml"),r=t.ownerDocument.importNode(n.documentElement,!0);t.appendChild(r)}else t.innerHTML=e}function y(t,e){t.removeAttribute(e)}function b(t,e){return t.getAttribute(e)}function x(t,e,n){var r=Ht.exec(e);r&&r[1]?t.setAttributeNS(Dt,r[1],n):t.setAttribute(e,n)}function w(t,e,n){t.insertBefore(e,n.parentNode&&n)}function _(t,e){if(t)for(var n;n=qt.exec(t);)e(n[1].toLowerCase(),n[2]||n[3]||n[4])}function k(t,e,n){if(t){var r,i=e(t,n);if(i===!1)return;for(t=t.firstChild;t;)r=t.nextSibling,k(t,e,i),t=r}}function C(t,e){for(var n,r=t?t.length:0,i=0;r>i;++i)n=t[i],e(n,i)===!1&&i--;return t}function E(t,e){return!!~t.indexOf(e)}function N(t){return t.replace(/-(\w)/g,function(t,e){return e.toUpperCase()})}function M(t,e){return t.slice(0,e.length)===e}function T(t,e,n,r){return Object.defineProperty(t,e,O({value:n,enumerable:!1,writable:!1,configurable:!0},r)),t}function O(t){for(var e,n=arguments,r=1;r<n.length;++r)if(e=n[r])for(var i in e)l(t,i)&&(t[i]=e[i]);return t}function L(t,e,n){var r=this.__.parent,i=this.__.item;if(!i)for(;r&&!i;)i=r.__.item,r=r.__.parent;if(l(n,"currentTarget")&&(n.currentTarget=t),l(n,"target")&&(n.target=n.srcElement),l(n,"which")&&(n.which=n.charCode||n.keyCode),n.item=i,e.call(this,n),!n.preventUpdate){var o=lt(this);o.isMounted&&o.update()}}function S(t,e,n,r){var i,o=L.bind(r,n,e);return n.addEventListener?(n[t]=null,i=t.replace(oe,""),n._riotEvents||(n._riotEvents={}),n._riotEvents[t]&&n.removeEventListener(i,n._riotEvents[t]),n._riotEvents[t]=o,void n.addEventListener(i,o,!1)):void(n[t]=o)}function j(t,e){var n,r,i,o,a=ne(t.value,e);return t.tag&&t.tagName===a?void t.tag.update():(r="VIRTUAL"===t.dom.tagName,t.tag&&(r&&(i=t.tag.__.head,o=h(),i.parentNode.insertBefore(o,i)),t.tag.unmount(!0)),t.impl=Ct[a],n={root:t.dom,parent:e,hasImpl:!0,tagName:a},t.tag=ut(t.impl,n,t.dom.innerHTML,e),C(t.attrs,function(e){return x(t.tag.root,e.name,e.value)}),t.tagName=a,t.tag.mount(),r&&vt(t.tag,o||t.tag.root),void e.on("unmount",function(){var e=t.tag.opts.dataIs,n=t.tag.parent.tags,r=t.tag.__.parent.tags;ht(n,e,t.tag),ht(r,e,t.tag),t.tag.unmount()}))}function A(t){var e,n=t.dom,i=t.attr,a=E([jt,At],i),s=ne(t.expr,this),u="riot-value"===i,l=t.root&&"VIRTUAL"===t.root.tagName,c=n&&(t.parent||n.parentNode);if(t.bool?s=s?i:!1:(o(s)||null===s)&&(s=""),t._riot_id)return void(t.isMounted?t.update():(t.mount(),l&&vt(t,t.root)));if(e=t.value,t.value=s,t.update)return void t.update();if(t.isRtag&&s)return j(t,this);if(e!==s&&(!u||n.value!==s)){if(!i)return s+="",void(c&&(t.parent=c,"TEXTAREA"===c.tagName?(c.value=s,Kt||(n.nodeValue=s)):n.nodeValue=s));if(t.isAttrRemoved&&s||(y(n,i),t.isAttrRemoved=!0),r(s))S(i,s,n,this);else if(a)i===At&&(s=!s),n.style.display=s?"":"none";else if(u)n.value=s;else if(M(i,Nt)&&i!==Tt)i=i.slice(Nt.length),Gt[i]&&(i=Gt[i]),null!=s&&x(n,i,s);else{if("selected"===i&&c&&/^(SELECT|OPTGROUP)$/.test(c.tagName)&&s&&(c.value=n.value),t.bool&&(n[i]=s,!s))return;(0===s||s&&typeof s!==It)&&x(n,i,s)}}}function R(t){C(t,A.bind(this))}function I(t,e,n,r){var i=r?Object.create(r):{};return i[t.key]=e,t.pos&&(i[t.pos]=n),i}function V(t,e){for(var n=e.length,r=t.length;n>r;)n--,P.apply(e[n],[e,n])}function P(t,e){t.splice(e,1),this.unmount(),ht(this.parent,this,this.__.tagName,!0)}function D(t){var e=this;C(Object.keys(this.tags),function(n){var r=e.tags[n];u(r)?C(r,function(e){st.apply(e,[n,t])}):st.apply(r,[n,t])})}function H(t,e,n){n?bt.apply(this,[t,e]):w(t,this.root,e.root)}function $(t,e,n){n?yt.apply(this,[t,e]):w(t,this.root,e.root)}function B(t,e){e?yt.call(this,t):t.appendChild(this.root)}function U(t,e,n){y(t,Lt);var r,i=typeof b(t,St)!==Rt||y(t,St),o=ft(t),s=Ct[o]||{tmpl:g(t)},l=t.parentNode,c=h(),f=rt(t),p=ot(t),m=b(t,Ot),v=[],x=[],w=!0,_=!1,k=!Ct[o],N="VIRTUAL"===t.tagName;return n=ne.loopKeys(n),n.isLoop=!0,m&&y(t,Ot),p&&(_=ne.hasExpr(p),at(t)),l.insertBefore(c,t),l.removeChild(t),n.update=function(){var l=ne(n.val,e),h=d(),g=p,y=!u(l)&&!a(l),b=c.parentNode;y?(r=l||!1,l=r?Object.keys(l).map(function(t){return I(n,l[t],t)}):[]):r=!1,m&&(l=l.filter(function(t,r){return n.key&&!y?!!ne(m,I(n,t,r,e)):!!ne(m,O(Object.create(e),t))})),g&&_&&(g=ne(p,e)),g&&(e.refs[g]=[]),C(l,function(a,u){var c=i&&typeof a===It&&!r,p=x.indexOf(a),d=!~p,m=!d&&c?p:u,y=v[m],_=u>=x.length,C=c&&d||!c&&!y;a=!r&&n.key?I(n,a,u):a,C?(y=new nt(s,{parent:e,isLoop:w,isAnonymous:k,root:t.cloneNode(),item:a},t.innerHTML),y.mount(),_?B.apply(y,[h||b,N]):$.apply(y,[b,v[u],N]),_||x.splice(u,0,a),v.splice(u,0,y),f&&dt(e.tags,o,y,!0)):m!==u&&c&&(E(l,x[u])?(H.apply(y,[b,v[u],N]),v.splice(u,0,v.splice(m,1)[0]),x.splice(u,0,x.splice(m,1)[0])):(P.apply(v[u],[v,u]),x.splice(u,1)),n.pos&&(y[n.pos]=u),!f&&y.tags&&D.call(y,u),g&&e.refs[g].push(k?y.root:y)),C||y.update(a),y.__.item=a,y.__.parent=e}),V(l,v),x=l.slice(),b.insertBefore(h,c)},n.unmount=function(){C(v,function(t){t.unmount()})},n}function F(t,e,n){var r=this,i={parent:{children:e}};return k(t,function(e,i){var o,a,s,u=e.nodeType,l=i.parent;if(!n&&e===t)return{parent:l};if(3===u&&"STYLE"!==e.parentNode.tagName&&ne.hasExpr(e.nodeValue)&&l.children.push({dom:e,expr:e.nodeValue}),1!==u)return i;var c="VIRTUAL"===e.tagName;if(o=b(e,Lt))return c&&x(e,"loopVirtual",!0),l.children.push(U(e,r,o)),!1;if(o=b(e,Ot))return l.children.push(Object.create(ae).init(e,r,o)),!1;if((a=b(e,Tt))&&ne.hasExpr(a))return l.children.push({isRtag:!0,expr:a,dom:e,attrs:[].slice.call(e.attributes)}),!1;if(s=rt(e),c&&(b(e,"virtualized")&&e.parentElement.removeChild(e),s||b(e,"virtualized")||b(e,"loopVirtual")||(s={tmpl:e.outerHTML})),s&&(e!==t||n)){if(!c||b(e,Tt)){var f={root:e,parent:r,hasImpl:!0};return l.children.push(ut(s,f,e.innerHTML,r)),!1}x(e,"virtualized",!0);var p=new nt({tmpl:e.outerHTML},{root:e,parent:r},e.innerHTML);l.children.push(p)}return z.apply(r,[e,e.attributes,function(t,e){e&&l.children.push(e)}]),{parent:l}},i),{tree:i,root:t}}function z(t,e,r){var i=this;C(e,function(e){var o,a=e.name,s=n(a);E(Mt,a)?o=Object.create(se).init(t,i,a,e.value):ne.hasExpr(e.value)&&(o={dom:t,expr:e.value,attr:e.name,bool:s}),r(e,o)})}function q(t,e,n){var r="o"===n[0],i=r?"select>":"table>";if(t.innerHTML="<"+i+e.trim()+"</"+i,i=t.firstChild,r)i.selectedIndex=-1;else{var o=pe[n];o&&1===i.childElementCount&&(i=p(o,i))}return i}function G(t,e){if(!ue.test(t))return t;var n={};return e=e&&e.replace(ce,function(t,e,r){return n[e]=n[e]||r,""}).trim(),t.replace(fe,function(t,e,r){return n[e]||r||""}).replace(le,function(t,n){return e||n||""})}function W(t,n,r){var i=t&&t.match(/^\s*<([-\w]+)/),o=i&&i[1].toLowerCase(),a=m(he,r&&e(o));return t=G(t,n),de.test(o)?a=q(a,t,o):v(a,t),a.stub=!0,a}function K(t,e){var n=this,r=n.name,i=n.tmpl,o=n.css,a=n.attrs,s=n.onCreate;return Ct[r]||(Q(r,i,o,a,s),Ct[r]["class"]=this.constructor),gt(t,r,e,this),o&&te.inject(),this}function Q(t,e,n,i,o){return r(i)&&(o=i,/^[\w\-]+\s?=/.test(n)?(i=n,n=""):i=""),n&&(r(n)?o=n:te.add(n)),t=t.toLowerCase(),Ct[t]={name:t,tmpl:e,attrs:i,fn:o},t}function Z(t,e,n,r,i){n&&te.add(n,t);var o=!!Ct[t];return Ct[t]={name:t,tmpl:e,attrs:r,fn:i},o&&_e.hotReloader&&_e.hotReloader(t),t}function J(t,e,n){function r(t){if(t.tagName){var i=b(t,Tt);e&&i!==e&&(i=e,x(t,Tt,e));var a=gt(t,i||t.tagName.toLowerCase(),n);a&&o.push(a)}else t.length&&C(t,r)}var o=[];te.inject(),i(e)&&(n=e,e=0);var s,u;if(a(t)?(t="*"===t?u=xt():t+xt(t.split(/, */)),s=t?f(t):[]):s=t,"*"===e){if(e=u||xt(),s.tagName)s=f(e,s);else{var l=[];C(s,function(t){return l.push(f(e,t))}),s=l}e=0}return r(s),o}function X(t,e,n){if(i(t))return void X("__unnamed_"+ve++,t,!0);var a=n?ge:me;if(!e){if(o(a[t]))throw new Error("Unregistered mixin: "+t);return a[t]}a[t]=r(e)?O(e.prototype,a[t]||{})&&e:O(a[t]||{},e)}function Y(){return C(kt,function(t){return t.update()})}function tt(t){delete Ct[t]}function et(t,e,n,r,i){if(!t||!n){var o=!n&&t?this:e||this;C(i,function(t){t.expr&&R.call(o,[t.expr]),r[N(t.name)]=t.expr?t.expr.value:t.value})}}function nt(t,e,n){var i,o=O({},e.opts),s=e.parent,u=e.isLoop,l=e.isAnonymous,c=pt(e.item),f=[],p=[],d=[],h=e.root,m=e.tagName||ft(h),g="virtual"===m,v=[];re(this),t.name&&h._tag&&h._tag.unmount(!0),this.isMounted=!1,h.isLoop=u,T(this,"__",{isAnonymous:l,instAttrs:f,innerHTML:n,tagName:m,virts:[],tail:null,head:null,parent:null,item:null}),T(this,"_riot_id",++be),O(this,{root:h,opts:o},c),T(this,"parent",s||null),T(this,"tags",{}),T(this,"refs",{}),i=W(t.tmpl,n,u),T(this,"update",function(t){return r(this.shouldUpdate)&&!this.shouldUpdate(t)?this:(t=pt(t),u&&l&&it.apply(this,[this.parent,v]),O(this,t),et.apply(this,[u,s,l,o,f]),this.isMounted&&this.trigger("update",t),R.call(this,d),this.isMounted&&this.trigger("updated"),this)}.bind(this)),T(this,"mixin",function(){var t=this;return C(arguments,function(e){var n,i,o=[];e=a(e)?X(e):e,n=r(e)?new e:e;var s=Object.getPrototypeOf(n);do o=o.concat(Object.getOwnPropertyNames(i||n));while(i=Object.getPrototypeOf(i||n));C(o,function(e){if("init"!==e){var i=Object.getOwnPropertyDescriptor(n,e)||Object.getOwnPropertyDescriptor(s,e),o=i&&(i.get||i.set);!t.hasOwnProperty(e)&&o?Object.defineProperty(t,e,i):t[e]=r(n[e])?n[e].bind(t):n[e]}}),n.init&&n.init.bind(t)()}),this}.bind(this)),T(this,"mount",function(){var e=this,n=this.__.parent;h._tag=this,z.apply(s,[h,h.attributes,function(t,n){!l&&se.isPrototypeOf(n)&&(n.tag=e),t.expr=n,f.push(t)}]),p=[],_(t.attrs,function(t,e){p.push({name:t,value:e})}),z.apply(this,[h,p,function(t,e){e?d.push(e):x(h,t.name,t.value)}]),n&&l&&it.apply(this,[n,v]),et.apply(this,[u,s,l,o,f]);var r=X(Et);if(r)for(var a in r)r.hasOwnProperty(a)&&e.mixin(r[a]);if(t.fn&&t.fn.call(this,o),this.trigger("before-mount"),F.apply(this,[i,d,!1]),this.update(c),u&&l)this.root=h=i.firstChild;else{for(;i.firstChild;)h.appendChild(i.firstChild);h.stub&&(h=s.root)}return T(this,"root",h),T(this,"isMounted",!0),!this.parent||this.parent.isMounted?this.trigger("mount"):this.parent.one("mount",function(){e.trigger("mount")}),this}.bind(this)),T(this,"unmount",function(e){var n,r=this,i=this.root,o=i.parentNode,a=kt.indexOf(this);if(this.trigger("before-unmount"),_(t.attrs,function(t){M(t,Nt)&&(t=t.slice(Nt.length)),y(h,t)}),~a&&kt.splice(a,1),o){if(s)n=lt(s),g?Object.keys(this.tags).forEach(function(t){ht(n.tags,t,r.tags[t])}):(ht(n.tags,m,this),s!==n&&ht(s.tags,m,this));else for(;i.firstChild;)i.removeChild(i.firstChild);e?y(o,Tt):o.removeChild(i)}return this.__.virts&&C(this.__.virts,function(t){t.parentNode&&t.parentNode.removeChild(t)}),ct(d),C(f,function(t){return t.expr&&t.expr.unmount&&t.expr.unmount()}),this.trigger("unmount"),this.off("*"),T(this,"isMounted",!1),delete this.root._tag,this}.bind(this))}function rt(t){return t.tagName&&Ct[b(t,Tt)||b(t,Tt)||t.tagName.toLowerCase()]}function it(t,e){var n=this;C(Object.keys(t),function(r){var i=!c(r)&&E(e,r);(o(n[r])||i)&&(i||e.push(r),n[r]=t[r])})}function ot(t){return b(t,Mt[0])||b(t,Mt[1])}function at(t){Mt.forEach(function(e){return y(t,e)})}function st(t,e){var n,r=this.parent;r&&(n=r.tags[t],u(n)?n.splice(e,0,n.splice(n.indexOf(this),1)[0]):dt(r.tags,t,this))}function ut(t,e,n,r){var i=new nt(t,e,n),o=e.tagName||ft(e.root,!0),a=lt(r);return T(i,"parent",a),i.__.parent=r,dt(a.tags,o,i),a!==r&&dt(r.tags,o,i),e.root.innerHTML="",i}function lt(t){for(var e=t;e.__.isAnonymous&&e.parent;)e=e.parent;return e}function ct(t){C(t,function(t){t instanceof nt?t.unmount(!0):t.unmount&&t.unmount()})}function ft(t,e){var n=rt(t),r=!e&&b(t,Tt);return r&&!ne.hasExpr(r)?r:n?n.name:t.tagName.toLowerCase()}function pt(t){if(!(t instanceof nt||t&&r(t.trigger)))return t;var e={};for(var n in t)Ft.test(n)||(e[n]=t[n]);return e}function dt(t,e,n,r){var i=t[e],o=u(i);i&&i===n||(!i&&r?t[e]=[n]:i?(!o||o&&!E(i,n))&&(o?i.push(n):t[e]=[i,n]):t[e]=n)}function ht(t,e,n,r){u(t[e])?(C(t[e],function(r,i){r===n&&t[e].splice(i,1)}),t[e].length?1!==t[e].length||r||(t[e]=t[e][0]):delete t[e]):delete t[e]}function mt(t){for(;t;){if(t.inStub)return!0;t=t.parentNode}return!1}function gt(t,e,n,r){var i=Ct[e],o=Ct[e]["class"],a=r||(o?Object.create(o.prototype):{}),s=t._innerHTML=t._innerHTML||t.innerHTML;t.innerHTML="";var u={root:t,opts:n};return n&&n.parent&&(u.parent=n.parent),i&&t&&nt.apply(a,[i,u,s]),a&&a.mount&&(a.mount(!0),E(kt,a)||kt.push(a)),a}function vt(t,e){var n=d();yt.call(t,n),e.parentNode.replaceChild(n,e)}function yt(t,e){var n,r,i=this,o=h(),a=h(),s=d();for(this.__.head=this.root.insertBefore(o,this.root.firstChild),this.__.tail=this.root.appendChild(a),r=this.__.head;r;)n=r.nextSibling,s.appendChild(r),i.__.virts.push(r),r=n;e?t.insertBefore(s,e.__.head):t.appendChild(s)}function bt(t,e){for(var n,r=this,i=this.__.head,o=d();i;)if(n=i.nextSibling,o.appendChild(i),i=n,i===r.__.tail){o.appendChild(i),t.insertBefore(o,e.__.head);break}}function xt(t){if(!t){var e=Object.keys(Ct);return e+xt(e)}return t.filter(function(t){return!/[^-\w]/.test(t)}).reduce(function(t,e){var n=e.trim().toLowerCase();return t+",["+Tt+'="'+n+'"]'},"")}var wt,_t,kt=[],Ct={},Et="__global_mixin",Nt="riot-",Mt=["ref","data-ref"],Tt="data-is",Ot="if",Lt="each",St="no-reorder",jt="show",At="hide",Rt="string",It="object",Vt="undefined",Pt="function",Dt="http://www.w3.org/1999/xlink",Ht=/^xlink:(\w+)/,$t=typeof window===Vt?void 0:window,Bt=/^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/,Ut=/^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/,Ft=/^(?:_(?:item|id|parent)|update|root|(?:un)?mount|mixin|is(?:Mounted|Loop)|tags|refs|parent|opts|trigger|o(?:n|ff|ne))$/,zt=/^(altGlyph|animate(?:Color)?|circle|clipPath|defs|ellipse|fe(?:Blend|ColorMatrix|ComponentTransfer|Composite|ConvolveMatrix|DiffuseLighting|DisplacementMap|Flood|GaussianBlur|Image|Merge|Morphology|Offset|SpecularLighting|Tile|Turbulence)|filter|font|foreignObject|g(?:lyph)?(?:Ref)?|image|line(?:arGradient)?|ma(?:rker|sk)|missing-glyph|path|pattern|poly(?:gon|line)|radialGradient|rect|stop|svg|switch|symbol|text(?:Path)?|tref|tspan|use)$/,qt=/([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g,Gt={viewbox:"viewBox"},Wt=/^(?:disabled|checked|readonly|required|allowfullscreen|auto(?:focus|play)|compact|controls|default|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|no(?:resize|shade|validate|wrap)?|open|reversed|seamless|selected|sortable|truespeed|typemustmatch)$/,Kt=0|($t&&$t.document||{}).documentMode,Qt=Object.freeze({isSVGTag:e,isBoolAttr:n,isFunction:r,isObject:i,isUndefined:o,isString:a,isBlank:s,isArray:u,isWritable:l,isReservedName:c}),Zt=Object.freeze({$$:f,$:p,createFrag:d,createDOMPlaceholder:h,mkEl:m,getOuterHTML:g,setInnerHTML:v,remAttr:y,getAttr:b,setAttr:x,safeInsert:w,walkAttrs:_,walkNodes:k}),Jt={},Xt=[],Yt=!1;$t&&(wt=function(){var t=m("style");x(t,"type","text/css");var e=p("style[type=riot]");return e?(e.id&&(t.id=e.id),e.parentNode.replaceChild(t,e)):document.getElementsByTagName("head")[0].appendChild(t),t}(),_t=wt.styleSheet);var te={styleNode:wt,add:function(t,e){e?Jt[e]=t:Xt.push(t),Yt=!0},inject:function(){if($t&&Yt){Yt=!1;var t=Object.keys(Jt).map(function(t){return Jt[t]}).concat(Xt).join("\n");_t?_t.cssText=t:wt.innerHTML=t}}},ee=function(t){function e(t){return t}function n(t,e){return e||(e=b),new RegExp(t.source.replace(/{/g,e[2]).replace(/}/g,e[3]),t.global?l:"")}function r(t){if(t===g)return v;var e=t.split(" ");if(2!==e.length||d.test(t))throw new Error('Unsupported brackets "'+t+'"');return e=e.concat(t.replace(h,"\\").split(" ")),e[4]=n(e[1].length>1?/{[\S\s]*?}/:v[4],e),e[5]=n(t.length>3?/\\({|})/g:v[5],e),e[6]=n(v[6],e),e[7]=RegExp("\\\\("+e[3]+")|([[({])|("+e[3]+")|"+p,l),e[8]=t,e}function i(t){return t instanceof RegExp?s(t):b[t]}function o(t){(t||(t=g))!==b[8]&&(b=r(t),s=t===g?e:n,b[9]=s(v[9])),y=t}function a(t){var e;t=t||{},e=t.brackets,Object.defineProperty(t,"brackets",{set:o,get:function(){return y},enumerable:!0}),u=t,o(e)}var s,u,l="g",c=/\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,f=/"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'/g,p=f.source+"|"+/(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source+"|"+/\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?(\/)[gim]*/.source,d=RegExp("[\\x00-\\x1F<>a-zA-Z0-9'\",;\\\\]"),h=/(?=[[\]()*+?.^$|])/g,m={"(":RegExp("([()])|"+p,l),"[":RegExp("([[\\]])|"+p,l),"{":RegExp("([{}])|"+p,l)},g="{ }",v=["{","}","{","}",/{[^}]*}/,/\\([{}])/g,/\\({)|{/g,RegExp("\\\\(})|([[({])|(})|"+p,l),g,/^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/,/(^|[^\\]){=[\S\s]*?}/],y=t,b=[];return i.split=function(t,e,n){function r(t){l.push(e||a?t&&t.replace(n[5],"$1"):t)}function i(t,e,n){var r,i=m[e];for(i.lastIndex=n,n=1;(r=i.exec(t))&&(!r[1]||(r[1]===e?++n:--n)););return n?t.length:i.lastIndex}n||(n=b);var o,a,s,u,l=[],c=n[6];for(a=s=c.lastIndex=0;o=c.exec(t);){if(u=o.index,a){if(o[2]){c.lastIndex=i(t,o[2],c.lastIndex);continue}if(!o[3])continue}o[1]||(r(t.slice(s,u)),s=c.lastIndex,c=n[6+(a^=1)],c.lastIndex=s)}return t&&s<t.length&&r(t.slice(s)),l},i.hasExpr=function(t){return b[4].test(t)},i.loopKeys=function(t){var e=t.match(b[9]);return e?{key:e[1],pos:e[2],val:b[0]+e[3].trim()+b[1]}:{val:t.trim()}},i.array=function(t){return t?r(t):b},Object.defineProperty(i,"settings",{set:a,get:function(){return u}}),i.settings="undefined"!=typeof riot&&riot.settings||{},i.set=o,i.R_STRINGS=f,i.R_MLCOMMS=c,i.S_QBLOCKS=p,i}(),ne=function(){function t(t,r){return t?(a[t]||(a[t]=n(t))).call(r,e):t}function e(e,n){e.riotData={tagName:n&&n.__&&n.__.tagName,_riot_id:n&&n._riot_id},t.errorHandler?t.errorHandler(e):"undefined"!=typeof console&&"function"==typeof console.error&&(e.riotData.tagName&&console.error("Riot template error thrown in the <%s> tag",e.riotData.tagName),console.error(e))}function n(t){var e=r(t);return"try{return "!==e.slice(0,11)&&(e="return "+e),new Function("E",e+";")}function r(t){var e,n=[],r=ee.split(t.replace(c,'"'),1);if(r.length>2||r[0]){var o,a,s=[];for(o=a=0;o<r.length;++o)e=r[o],e&&(e=1&o?i(e,1,n):'"'+e.replace(/\\/g,"\\\\").replace(/\r\n?|\n/g,"\\n").replace(/"/g,'\\"')+'"')&&(s[a++]=e);e=2>a?s[0]:"["+s.join(",")+'].join("")'}else e=i(r[1],0,n);return n[0]&&(e=e.replace(f,function(t,e){return n[e].replace(/\r/g,"\\r").replace(/\n/g,"\\n")})),e}function i(t,e,n){function r(e,n){var r,i=1,o=p[e];for(o.lastIndex=n.lastIndex;r=o.exec(t);)if(r[0]===e)++i;else if(!--i)break;n.lastIndex=i?t.length:o.lastIndex}if(t=t.replace(l,function(t,e){return t.length>2&&!e?s+(n.push(t)-1)+"~":t}).replace(/\s+/g," ").trim().replace(/\ ?([[\({},?\.:])\ ?/g,"$1")){for(var i,a=[],c=0;t&&(i=t.match(u))&&!i.index;){var f,d,h=/,|([[{(])|$/g;for(t=RegExp.rightContext,f=i[2]?n[i[2]].slice(1,-1).trim().replace(/\s+/g," "):i[1];d=(i=h.exec(t))[1];)r(d,h);d=t.slice(0,i.index),t=RegExp.rightContext,a[c++]=o(d,1,f)}t=c?c>1?"["+a.join(",")+'].join(" ").trim()':a[0]:o(t,e)}return t}function o(t,e,n){var r;return t=t.replace(h,function(t,e,n,i,o){return n&&(i=r?0:i+t.length,"this"!==n&&"global"!==n&&"window"!==n?(t=e+'("'+n+d+n,i&&(r="."===(o=o[i])||"("===o||"["===o)):i&&(r=!m.test(o.slice(i)))),t}),r&&(t="try{return "+t+"}catch(e){E(e,this)}"),n?t=(r?"function(){"+t+"}.call(this)":"("+t+")")+'?"'+n+'":""':e&&(t="function(v){"+(r?t.replace("return ","v="):"v=("+t+")")+';return v||v===0?v:""}.call(this)'),t}var a={};t.hasExpr=ee.hasExpr,t.loopKeys=ee.loopKeys,t.clearCache=function(){a={}},t.errorHandler=null;var s=String.fromCharCode(8279),u=/^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/,l=RegExp(ee.S_QBLOCKS,"g"),c=/\u2057/g,f=/\u2057(\d+)~/g,p={"(":/[()]/g,"[":/[[\]]/g,"{":/[{}]/g},d='"in this?this:'+("object"!=typeof window?"global":"window")+").",h=/[,{][\$\w]+(?=:)|(^ *|[^$\w\.{])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,m=/^(?=(\.[$\w]+))\1(?:[^.[(]|$)/;return t.version=ee.version="v3.0.2",t}(),re=function(t){t=t||{};var e={},n=Array.prototype.slice;return Object.defineProperties(t,{on:{value:function(n,r){return"function"==typeof r&&(e[n]=e[n]||[]).push(r),t},enumerable:!1,writable:!1,configurable:!1},off:{value:function(n,r){if("*"!=n||r)if(r)for(var i,o=e[n],a=0;i=o&&o[a];++a)i==r&&o.splice(a--,1);else delete e[n];else e={};return t},enumerable:!1,writable:!1,configurable:!1},one:{value:function(e,n){function r(){t.off(e,r),n.apply(t,arguments)}return t.on(e,r)},enumerable:!1,writable:!1,configurable:!1},trigger:{value:function(r){var i,o,a,s=arguments,u=arguments.length-1,l=new Array(u);for(a=0;u>a;a++)l[a]=s[a+1];for(i=n.call(e[r]||[],0),a=0;o=i[a];++a)o.apply(t,l);return e["*"]&&"*"!=r&&t.trigger.apply(t,["*",r].concat(l)),t},enumerable:!1,writable:!1,configurable:!1}}),t},ie=Object.freeze({each:C,contains:E,toCamel:N,startsWith:M,defineProperty:T,extend:O}),oe=/^on/,ae={init:function(t,e,n){y(t,Ot),this.tag=e,this.expr=n,this.stub=document.createTextNode(""),this.pristine=t;var r=t.parentNode;return r.insertBefore(this.stub,t),r.removeChild(t),this},update:function(){var t=ne(this.expr,this.tag);t&&!this.current?(this.current=this.pristine.cloneNode(!0),this.stub.parentNode.insertBefore(this.current,this.stub),this.expressions=[],F.apply(this.tag,[this.current,this.expressions,!0])):!t&&this.current&&(ct(this.expressions),this.current._tag?this.current._tag.unmount():this.current.parentNode&&this.current.parentNode.removeChild(this.current),this.current=null,this.expressions=[]),t&&R.call(this.tag,this.expressions)},unmount:function(){ct(this.expressions||[]),delete this.pristine,delete this.parentNode,delete this.stub}},se={init:function(t,e,n,r){return this.dom=t,this.attr=n,this.rawValue=r,this.parent=e,this.hasExp=ne.hasExpr(r),this.firstRun=!0,this},update:function(){var t=this.rawValue;if(this.hasExp&&(t=ne(this.rawValue,this.parent)),this.firstRun||t!==this.value){var e=this.parent&&lt(this.parent),n=this.tag||this.dom;!s(this.value)&&e&&ht(e.refs,this.value,n),s(t)?y(this.dom,this.attr):(e&&dt(e.refs,t,n),x(this.dom,this.attr,t)),this.value=t,this.firstRun=!1}},unmount:function(){var t=this.tag||this.dom,e=this.parent&&lt(this.parent);!s(this.value)&&e&&ht(e.refs,this.value,t),delete this.dom,delete this.parent}},ue=/<yield\b/i,le=/<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/gi,ce=/<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/gi,fe=/<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/gi,pe={tr:"tbody",th:"tr",td:"tr",col:"colgroup"},de=Kt&&10>Kt?Bt:Ut,he="div",me={},ge=me[Et]={},ve=0,ye=Object.freeze({Tag:K,tag:Q,tag2:Z,mount:J,mixin:X,update:Y,unregister:tt}),be=0,xe=Object.freeze({getTag:rt,inheritFrom:it,getRefAttr:ot,remRefAttr:at,moveChildTag:st,initChildTag:ut,getImmediateCustomParentTag:lt,unmountAll:ct,getTagName:ft,cleanUpData:pt,arrayishAdd:dt,arrayishRemove:ht,isInStub:mt,mountTo:gt,makeReplaceVirtual:vt,makeVirtual:yt,moveVirtual:bt,selectTags:xt}),we=Object.create(ee.settings),_e={tmpl:ne,brackets:ee,styleManager:te,vdom:kt,styleNode:te.styleNode,dom:Zt,check:Qt,misc:ie,tags:xe},ke=K,Ce=Q,Ee=Z,Ne=J,Me=X,Te=Y,Oe=tt,Le=re,Se=O({},ye,{observable:re,settings:we,util:_e});t.settings=we,t.util=_e,t.Tag=ke,t.tag=Ce,t.tag2=Ee,t.mount=Ne,t.mixin=Me,t.update=Te,t.unregister=Oe,t.observable=Le,t["default"]=Se,Object.defineProperty(t,"__esModule",{value:!0})})},{}],2:[function(t,e){"use strict";function n(t,e){var i=[];if(e=+e,0>e||e>t.length)return[];if(0==e)return[[]];if(1==e)return t.map(function(t){return[t]});if(e==t.length-1){var o=function(){var e=void 0;for(e=0;e<t.length;++e)i.push(t.filter(function(t,n){return n!==e}));return{v:i}}();if("object"===("undefined"==typeof o?"undefined":r(o)))return o.v}var a=[].concat(t);if(e==t.length)return[a];for(;;){if(a.length===e){i.push(a);break}var s=[a.pop()],u=n(a,e-1),l=void 0;for(l=0;l<u.length;++l)i.push(u[l].concat(s))}return i}var r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};e.exports=n},{}],3:[function(t,e){"use strict";e.exports="function"==typeof Worker&&"function"==typeof Int32Array},{}],4:[function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t){return Math.round(1e6*t)/1e6}var i;i=performance&&performance.now?function(){return performance.now()}:Date.now?function(){return Date.now()}:function(){return(new Date).getTime()},e.exports=function(){function t(e){n(this,t),this.output=e}return t.prototype.start=function(){this.start_time=this.lap_time=i()},t.prototype.lap=function(t){var e=i();this.output(t+": "+r(e-this.lap_time)+" ms"),this.lap_time=e},t.prototype.finish=function(t){t&&this.lap(t),this.output("合計時間: "+r(this.lap_time-this.start_time)+" ms")},t}()},{}],5:[function(t,e){"use strict";e.exports=function(t,e,n){for(var r=[],i=0;e>i;++i){r.push([]);for(var o=0;t>o;++o)r[i].push(n)}return r}},{}],6:[function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t){var e=[],n="undefined"==typeof t?"undefined":i(t);if("string"===n)e=t.split(" ");else if("number"===n)e=[t];else{if("[object Array]"!==o.call(t))throw new TypeError;e=t.slice()}for(var r=0;r<e.length;++r){var a=+e[r];if(e[r]=a,(0|a)!==a)throw new RangeError("Only integers are accepted for constraints.")}e.sort(function(t,e){return 0===t&&0===e?0:0===t?1:0===e?-1:Math.abs(t)-Math.abs(e)});for(var s=0,u=0;u<e.length;++u)if(s<Math.abs(e[u])&&(s=Math.abs(e[u])),u<e.length-1&&0!==e[u]&&e[u]+e[u+1]===0)return{text:"",maxVar:0};for(;0===e[e.length-1];)e.pop();return e.push(0),{text:e.join(" "),maxVar:s}}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o=Object.prototype.toString,a=function(){function t(){n(this,t),this.clear()}return t.prototype.clear=function(){this.textConstraints=[],this.maxVar=0},t.prototype.add=function(t){var e=r(t);return e.maxVar>0&&(this.textConstraints.push(e.text),this.maxVar<e.maxVar&&(this.maxVar=e.maxVar)),this},t.prototype.length=function(){return this.textConstraints.length},t.prototype.merge=function(){for(var t=arguments.length,e=Array(t),n=0;t>n;n++)e[n]=arguments[n];for(var r=0;r<e.length;++r){for(var i=0;i<e[r].textConstraints.length;++i)this.textConstraints.push(e[r].textConstraints[i]);this.maxVar<e[r].maxVar&&(this.maxVar=e[r].maxVar)}return this},t.prototype.toDIMACS=function(){return"p cnf "+this.maxVar+" "+this.textConstraints.length+"\n"+this.textConstraints.join("\n")},t.merge=function(){var e=new t;return e.merge.apply(e,arguments),e},t}();e.exports=a},{}],7:[function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var r=t("./sat_constraints"),i=function(){function t(){n(this,t)}return t.prototype.loadWorker=function(){this.worker=new Worker("gen/minisat_worker.js")},t.prototype.setListener=function(t){this.worker||this.loadWorker(),this.listener&&this.worker.removeEventListener("message",this.listener,!0),this.listener=function(e){var n=e.data.result,r=null,i="ERROR";n&&(r=n.split(" "),i=r.shift(),r=r.map(function(t){return+t})),t(i,r,e.data.stdout,e.data.stderr)},this.worker.addEventListener("message",this.listener,!0)},t.prototype.solve=function(t,e){var n=t.toDIMACS();this.setListener(e),this.worker.postMessage(n)},t.prototype.solve_loop=function(t,e){var n=this;this.setListener(function(i,o,a,s){var u=e(t,i,o,a,s);if(u!==!1){if(u instanceof r)return t=u,void n.worker.postMessage(u.toDIMACS());throw new TypeError}}),this.worker.postMessage(t.toDIMACS())},t}();e.exports=i},{"./sat_constraints":6}],8:[function(t,e){"use strict";function n(t){return r.push(t),window.postMessage(i,"*"),null}var r=[],i="set_timeout_"+Math.random();window.addEventListener("message",function(t){t.source===window&&t.data===i&&(t.stopPropagation(),r.length>0&&r.shift()())},!0),e.exports=n},{}],9:[function(t){(function(e){"use strict";var n=t("riot");t("./tags/sudoku-field");var r=t("./lib/environment_check"),i=t("./lib/lap_timer"),o="undefined"!=typeof window?window.jQuery:"undefined"!=typeof e?e.jQuery:null,a=t("./lib/sat_solver"),s=t("./lib/sat_constraints"),u=t("./lib/combination"),l=t("./lib/make_matrix"),c=t("./lib/set_immediate");o(function(){if(!r)return void alert("この環境ではJavaScriptの機能が不足していて、実行できません。");var t=n.mount("sudoku-field")[0],e=o("#indicator"),f=new i(function(t){return o("<p />").text(t).appendTo(e)}),p=new a;p.loadWorker(),o("#solve_btn").click(function(){function e(t,e,n){return 81*t+9*e+(n-0)}function n(t){var e=(t-1)%9+1,n=(t-e)/9;return[Math.floor(n/9),n%9,e]}f.start();for(var r=new s,i=t.data,a=0;9>a;++a)for(var d=0;9>d;++d)i[a][d]&&r.add(e(a,d,+i[a][d]));for(var h=0;9>h;++h)for(var m=3*Math.floor(h/3),g=h%3*3,v=0;9>v;++v){for(var y=[],b=[],x=[],w=[],_=0;9>_;++_){var k=Math.floor(_/3),C=_%3;y[_]=e(h,v,_+1),b[_]=e(h,_,v+1),x[_]=e(_,h,v+1),w[_]=e(m+k,g+C,v+1)}r.add(y),r.add(b),r.add(x),r.add(w),u(y.map(function(t){return-t}),2).forEach(function(t){return r.add(t)}),u(b.map(function(t){return-t}),2).forEach(function(t){return r.add(t)}),u(x.map(function(t){return-t}),2).forEach(function(t){return r.add(t)}),u(w.map(function(t){return-t}),2).forEach(function(t){return r.add(t)})}f.lap("立式"),p.solve(r,function(e,a){function s(t){var e=l(9,9,"");return t.forEach(function(t){var r=n(t),i=r[0],o=r[1],a=r[2];e[i][o]=a}),e}if(f.lap("初回ソルバー"),"SAT"!==e)return void alert("解が見つかりませんでした。");var u=a.filter(function(t){return t>0}),d=s(u);t.update({data:d}),f.lap("出力"),r.add(u.map(function(t){return-t})),p.solve(r,function(e,n){if("SAT"!==e)return f.finish("別解チェック"),void alert("一意解です。");if(o("#others_reset").is(":checked"))return f.finish("別解チェック"),alert("別解があります。"),void t.update({data:i});f.lap("確定マスの抽出");var a=n.filter(function(t){return t>0&&-1!==u.indexOf(t)});r.add(a.map(function(t){return-t})),c(function(){return t.update({data:s(a)})}),p.solve_loop(r,function(e,n,i){return"UNSAT"===n?(f.finish("完了"),alert("別解があります。"),!1):(f.lap("確定マスの抽出"),a=i.filter(function(t){return t>0&&-1!==a.indexOf(t)}),c(function(){return t.update({data:s(a)})}),r.add(a.map(function(t){return-t})),r)})})})})})}).call(this,"undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:{})},{"./lib/combination":2,"./lib/environment_check":3,"./lib/lap_timer":4,"./lib/make_matrix":5,"./lib/sat_constraints":6,"./lib/sat_solver":7,
"./lib/set_immediate":8,"./tags/sudoku-field":10,riot:1}],10:[function(t,e,n){!function(r){"function"==typeof define&&define.amd?define(function(t,e,n){r(t("riot"),t,e,n)}):"undefined"!=typeof e&&"undefined"!=typeof e.exports?r(t("riot"),t,n,e):r(window.riot)}(function(t,e){t.tag2("sudoku-field",'<table> <tr each="{row, row_num in data}" class="{top: row_num % 3 === 0, bottom: (row_num + 1) % 3 === 0}"> <td each="{item, col_num in row}" class="{left: col_num % 3 === 0, right: (col_num + 1) % 3 === 0}" data-row="{row_num}" data-col="{col_num}" onclick="{clicked}" oncontextmenu="{clear}">{item}</td> </tr> </table> <h3>パレット</h3> <table> <tr> <td each="{number in numbers}" data-number="{number}" onclick="{selectPalette}" class="{selected: selected == number}"> {number} </td> </tr> </table>','sudoku-field table,[data-is="sudoku-field"] table{ border-collapse: collapse; } sudoku-field td,[data-is="sudoku-field"] td{ width: 1.5em; height: 1.5em; border: 1px solid #000; vertical-align: middle; text-align: center; } sudoku-field tr.top td,[data-is="sudoku-field"] tr.top td{ border-top-width: 2px; } sudoku-field tr.bottom td,[data-is="sudoku-field"] tr.bottom td{ border-bottom-width: 2px; } sudoku-field td.left,[data-is="sudoku-field"] td.left{ border-left-width: 2px; } sudoku-field td.right,[data-is="sudoku-field"] td.right{ border-right-width: 2px; } sudoku-field td.selected,[data-is="sudoku-field"] td.selected{ background-color: #ffb; }',"",function(t){"use strict";var n=this;this.dimension=3;var r=this.dimension*this.dimension;this.numbers=Array.from({length:r},function(t,e){return e+1});var i=e("../lib/make_matrix");this.data=t.data||i(r,r,""),this.selected="",this.clicked=function(t){var e=t.target.dataset.row,r=t.target.dataset.col;n.selected&&(n.data[e][r]=n.selected)},this.selectPalette=function(t){n.selected=t.item.number==n.selected?"":t.item.number},this.clear=function(t){var e=t.target.dataset.row,r=t.target.dataset.col;n.data[e][r]="",t.preventDefault()}})})},{"../lib/make_matrix":5,riot:1}]},{},[9]);