!function(t){function e(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,e),i.l=!0,i.exports}var n={};e.m=t,e.c=n,e.d=function(t,n,r){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:r})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="",e(e.s=37)}([function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t){var e=[],n=void 0===t?"undefined":o(t);if("string"===n)e=t.split(" ");else if("number"===n)e=[t];else{if("[object Array]"!==a.call(t))throw new TypeError;e=t.slice()}for(var r=0;r<e.length;++r){var i=+e[r];if(e[r]=i,(0|i)!==i)throw new RangeError("Only integers are accepted for constraints.")}e.sort(function(t,e){return 0===t&&0===e?0:0===t?1:0===e?-1:Math.abs(t)-Math.abs(e)});for(var s=0,u=0;u<e.length;++u)if(s<Math.abs(e[u])&&(s=Math.abs(e[u])),u<e.length-1&&0!==e[u]&&e[u]+e[u+1]===0)return{text:"",maxVar:0};for(;0===e[e.length-1];)e.pop();return e.push(0),{text:e.join(" "),maxVar:s}}var o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},a=Object.prototype.toString,s=function(){function t(){r(this,t),this.clear()}return t.prototype.clear=function(){this.textConstraints=[],this.maxVar=0},t.prototype.add=function(t){var e=i(t);return e.maxVar>0&&(this.textConstraints.push(e.text),this.maxVar<e.maxVar&&(this.maxVar=e.maxVar)),this},t.prototype.length=function(){return this.textConstraints.length},t.prototype.merge=function(){for(var t=arguments.length,e=Array(t),n=0;n<t;n++)e[n]=arguments[n];for(var r=0;r<e.length;++r){for(var i=0;i<e[r].textConstraints.length;++i)this.textConstraints.push(e[r].textConstraints[i]);this.maxVar<e[r].maxVar&&(this.maxVar=e[r].maxVar)}return this},t.prototype.toDIMACS=function(){return"p cnf "+this.maxVar+" "+this.textConstraints.length+"\n"+this.textConstraints.join("\n")},t.merge=function(){var e=new t;return e.merge.apply(e,arguments),e},t}();t.exports=s},function(t,e,n){/* Riot v3.6.3, @license MIT */
!function(t,n){n(e)}(0,function(t){"use strict";function e(t){return Kt.test(t)}function n(t){return typeof t===Rt}function r(t){return t&&typeof t===It}function i(t){return typeof t===Vt}function o(t){return typeof t===Lt}function a(t){return i(t)||null===t||""===t}function s(t){return Array.isArray(t)||t instanceof Array}function u(t,e){var n=Object.getOwnPropertyDescriptor(t,e);return i(t[e])||n&&n.writable}function l(t,e){return Array.prototype.slice.call((e||document).querySelectorAll(t))}function c(t,e){return(e||document).querySelector(t)}function f(){return document.createDocumentFragment()}function p(){return document.createTextNode("")}function d(t){return!!t.ownerSVGElement}function h(t){return"svg"===t?document.createElementNS($t,t):document.createElement(t)}function g(t,e){if(i(t.innerHTML)){var n=(new DOMParser).parseFromString(e,"application/xml"),r=t.ownerDocument.importNode(n.documentElement,!0);t.appendChild(r)}else t.innerHTML=e}function m(t,e){t.style.display=e?"":"none",t.hidden=!e}function v(t,e){t.removeAttribute(e)}function y(t){return Object.keys(t).reduce(function(e,n){return e+" "+n+": "+t[n]+";"},"")}function b(t,e){return t.getAttribute(e)}function x(t,e,n){var r=Dt.exec(e);r&&r[1]?t.setAttributeNS(Pt,r[1],n):t.setAttribute(e,n)}function w(t,e,n){t.insertBefore(e,n.parentNode&&n)}function _(t,e){if(t)for(var n;n=Ft.exec(t);)e(n[1].toLowerCase(),n[2]||n[3]||n[4])}function C(t,e,n){if(t){var r,i=e(t,n);if(!1===i)return;for(t=t.firstChild;t;)r=t.nextSibling,C(t,e,i),t=r}}function k(t,e){for(var n=t?t.length:0,r=0;r<n;++r)e(t[r],r);return t}function O(t,e){return-1!==t.indexOf(e)}function E(t){return t.replace(/-(\w)/g,function(t,e){return e.toUpperCase()})}function N(t,e){return t.slice(0,e.length)===e}function S(t,e,n,r){return Object.defineProperty(t,e,j({value:n,enumerable:!1,writable:!1,configurable:!0},r)),t}function j(t){for(var e,n=arguments,r=1;r<n.length;++r)if(e=n[r])for(var i in e)u(t,i)&&(t[i]=e[i]);return t}function T(t,e,n){var r=this.__.parent,i=this.__.item;if(!i)for(;r&&!i;)i=r.__.item,r=r.__.parent;if(u(n,"currentTarget")&&(n.currentTarget=t),u(n,"target")&&(n.target=n.srcElement),u(n,"which")&&(n.which=n.charCode||n.keyCode),n.item=i,e.call(this,n),oe.autoUpdate&&!n.preventUpdate){var o=lt(this);o.isMounted&&o.update()}}function A(t,e,n,r){var i,o=T.bind(r,n,e);n[t]=null,i=t.replace(Bt,""),O(r.__.listeners,n)||r.__.listeners.push(n),n[Mt]||(n[Mt]={}),n[Mt][t]&&n.removeEventListener(i,n[Mt][t]),n[Mt][t]=o,n.addEventListener(i,o,!1)}function M(t,e,n){var r,i=t.tag||t.dom._tag,a=i?i.__:{},s=a.head,u="VIRTUAL"===t.dom.tagName;if(i&&t.tagName===n)return void i.update();i&&(u&&(r=p(),s.parentNode.insertBefore(r,s)),i.unmount(!0)),o(n)&&(t.impl=_t[n],t.impl&&(t.tag=i=ut(t.impl,{root:t.dom,parent:e,tagName:n},t.dom.innerHTML,e),k(t.attrs,function(t){return x(i.root,t.name,t.value)}),t.tagName=n,i.mount(),u&&gt(i,r||i.root),e.__.onUnmount=function(){var t=i.opts.dataIs;dt(i.parent.tags,t,i),dt(i.__.parent.tags,t,i),i.unmount()}))}function L(t){return t?(t=t.replace(kt,""),Wt[t]&&(t=Wt[t]),t):null}function I(t){if(!this.root||!b(this.root,"virtualized")){var e,i,o,s=t.dom,u=L(t.attr),l=O([Tt,At],u),c=t.root&&"VIRTUAL"===t.root.tagName,f=s&&(t.parent||s.parentNode),p="style"===u,d="class"===u;if(t._riot_id)return void(t.__.wasCreated?t.update():(t.mount(),c&&gt(t,t.root)));if(t.update)return t.update();if(o=ne(t.expr,l?j({},Object.create(this.parent),this):this),e=!a(o),i=r(o),i&&(i=!d&&!p,d?o=ne(JSON.stringify(o),this):p&&(o=y(o))),!t.attr||t.isAttrRemoved&&e&&!1!==o||(v(s,t.attr),t.isAttrRemoved=!0),t.bool&&(o=!!o&&u),t.isRtag)return M(t,this,o);if((!t.wasParsedOnce||t.value!==o)&&(t.value=o,t.wasParsedOnce=!0,!i||l)){if(a(o)&&(o=""),!u)return o+="",void(f&&(t.parent=f,"TEXTAREA"===f.tagName?(f.value=o,qt||(s.nodeValue=o)):s.nodeValue=o));n(o)?A(u,o,s,this):l?m(s,u===At?!o:o):(t.bool&&(s[u]=o),"value"===u&&s.value!==o&&(s.value=o),e&&!1!==o&&x(s,u,o),p&&s.hidden&&m(s,!1))}}}function V(t){k(t,I.bind(this))}function R(t,e,n,r){var i=r?Object.create(r):{};return i[t.key]=e,t.pos&&(i[t.pos]=n),i}function P(t,e){for(var n=e.length,r=t.length;n>r;)n--,$.apply(e[n],[e,n])}function $(t,e){t.splice(e,1),this.unmount(),dt(this.parent,this,this.__.tagName,!0)}function D(t){var e=this;k(Object.keys(this.tags),function(n){st.apply(e.tags[n],[n,t])})}function H(t,e,n){n?vt.apply(this,[t,e]):w(t,this.root,e.root)}function z(t,e,n){n?mt.apply(this,[t,e]):w(t,this.root,e.root)}function U(t,e){e?mt.call(this,t):t.appendChild(this.root)}function B(t,e,n){var r,i=typeof b(t,jt)!==Lt||v(t,jt),a=ft(t),u=_t[a],l=t.parentNode,c=p(),d=ot(t),h=b(t,Nt),g=[],m=!_t[a],y="VIRTUAL"===t.tagName,x=[];return v(t,St),n=ne.loopKeys(n),n.isLoop=!0,h&&v(t,Nt),l.insertBefore(c,t),l.removeChild(t),n.update=function(){n.value=ne(n.val,e);var l=n.value,p=f(),v=!s(l)&&!o(l),b=c.parentNode;b&&(v?(r=l||!1,l=r?Object.keys(l).map(function(t){return R(n,l[t],t)}):[]):r=!1,h&&(l=l.filter(function(t,r){return n.key&&!v?!!ne(h,R(n,t,r,e)):!!ne(h,j(Object.create(e),t))})),k(l,function(o,s){var c=i&&typeof o===It&&!r,f=x.indexOf(o),h=-1===f,v=!h&&c?f:s,w=g[v],_=s>=x.length,C=c&&h||!c&&!w;o=!r&&n.key?R(n,o,s):o,C?(w=new it(u,{parent:e,isLoop:!0,isAnonymous:m,tagName:a,root:t.cloneNode(m),item:o,index:s},t.innerHTML),w.mount(),_?U.apply(w,[p||b,y]):z.apply(w,[b,g[s],y]),_||x.splice(s,0,o),g.splice(s,0,w),d&&pt(e.tags,a,w,!0)):v!==s&&c&&(O(l,x[v])&&(H.apply(w,[b,g[s],y]),g.splice(s,0,g.splice(v,1)[0]),x.splice(s,0,x.splice(v,1)[0])),n.pos&&(w[n.pos]=s),!d&&w.tags&&D.call(w,s)),w.__.item=o,w.__.index=s,w.__.parent=e,C||w.update(o)}),P(l,g),x=l.slice(),b.insertBefore(p,c))},n.unmount=function(){k(g,function(t){t.unmount()})},n}function F(t,e,n){var r=this,i={parent:{children:e}};C(t,function(e,i){var o,a,s,u=e.nodeType,l=i.parent;if(!n&&e===t)return{parent:l};if(3===u&&"STYLE"!==e.parentNode.tagName&&ne.hasExpr(e.nodeValue)&&l.children.push({dom:e,expr:e.nodeValue}),1!==u)return i;var c="VIRTUAL"===e.tagName;if(o=b(e,St))return c&&x(e,"loopVirtual",!0),l.children.push(B(e,r,o)),!1;if(o=b(e,Nt))return l.children.push(Object.create(ae).init(e,r,o)),!1;if((a=b(e,Et))&&ne.hasExpr(a))return l.children.push({isRtag:!0,expr:a,dom:e,attrs:[].slice.call(e.attributes)}),!1;if(s=ot(e),c&&(b(e,"virtualized")&&e.parentElement.removeChild(e),s||b(e,"virtualized")||b(e,"loopVirtual")||(s={tmpl:e.outerHTML})),s&&(e!==t||n)){if(!c||b(e,Et))return l.children.push(ut(s,{root:e,parent:r},e.innerHTML,r)),!1;x(e,"virtualized",!0);var f=new it({tmpl:e.outerHTML},{root:e,parent:r},e.innerHTML);l.children.push(f)}return W.apply(r,[e,e.attributes,function(t,e){e&&l.children.push(e)}]),{parent:l}},i)}function W(t,n,r){var i=this;k(n,function(n){if(!n)return!1;var o,a=n.name,s=e(a);O(Ot,a)?o=Object.create(se).init(t,i,a,n.value):ne.hasExpr(n.value)&&(o={dom:t,expr:n.value,attr:a,bool:s}),r(n,o)})}function K(t,e,n){var r="o"===n[0],i=r?"select>":"table>";if(t.innerHTML="<"+i+e.trim()+"</"+i,i=t.firstChild,r)i.selectedIndex=-1;else{var o=pe[n];o&&1===i.childElementCount&&(i=c(o,i))}return i}function q(t,e){if(!ue.test(t))return t;var n={};return e=e&&e.replace(ce,function(t,e,r){return n[e]=n[e]||r,""}).trim(),t.replace(fe,function(t,e,r){return n[e]||r||""}).replace(le,function(t,n){return e||n||""})}function Z(t,e,n){var r=t&&t.match(/^\s*<([-\w]+)/),i=r&&r[1].toLowerCase(),o=h(n?ge:he);return t=q(t,e),de.test(i)?o=K(o,t,i):g(o,t),o}function G(t,e){var n=this,r=n.name,i=n.tmpl,o=n.css,a=n.attrs,s=n.onCreate;return _t[r]||(J(r,i,o,a,s),_t[r].class=this.constructor),ht(t,r,e,this),o&&Yt.inject(),this}function J(t,e,r,i,o){return n(i)&&(o=i,/^[\w-]+\s?=/.test(r)?(i=r,r=""):i=""),r&&(n(r)?o=r:Yt.add(r)),t=t.toLowerCase(),_t[t]={name:t,tmpl:e,attrs:i,fn:o},t}function Q(t,e,n,r,i){return n&&Yt.add(n,t),_t[t]={name:t,tmpl:e,attrs:r,fn:i},t}function X(t,e,n){function i(t){if(t.tagName){var r,o=b(t,Et);e&&o!==e&&(o=e,x(t,Et,e)),r=ht(t,o||t.tagName.toLowerCase(),n),r&&u.push(r)}else t.length&&k(t,i)}var a,s,u=[];if(Yt.inject(),r(e)&&(n=e,e=0),o(t)?(t="*"===t?s=yt():t+yt(t.split(/, */)),a=t?l(t):[]):a=t,"*"===e){if(e=s||yt(),a.tagName)a=l(e,a);else{var c=[];k(a,function(t){return c.push(l(e,t))}),a=c}e=0}return i(a),u}function Y(t,e,o){if(r(t))return void Y("__"+ye+++"__",t,!0);var a=o?ve:me;if(!e){if(i(a[t]))throw new Error("Unregistered mixin: "+t);return a[t]}a[t]=n(e)?j(e.prototype,a[t]||{})&&e:j(a[t]||{},e)}function tt(){return k(wt,function(t){return t.update()})}function et(t){_t[t]=null}function nt(t,e,n,r,i){if(!t||!n){var o=!n&&t?this:e||this;k(i,function(t){t.expr&&V.call(o,[t.expr]),r[E(t.name).replace(kt,"")]=t.expr?t.expr.value:t.value})}}function rt(t){S(this,"isMounted",t)}function it(t,e,r){void 0===t&&(t={}),void 0===e&&(e={});var i,a=j({},e.opts),s=e.parent,u=e.isLoop,l=!!e.isAnonymous,c=oe.skipAnonymousTags&&l,f=e.item,p=e.index,h=[],m=[],y=[],b=e.root,w=e.tagName||ft(b),C="virtual"===w,E=!C&&!t.tmpl,T=[];c||re(this),t.name&&b._tag&&b._tag.unmount(!0),rt.call(this,!1),S(this,"__",{isAnonymous:l,instAttrs:h,innerHTML:r,tagName:w,index:p,isLoop:u,isInline:E,listeners:[],virts:[],wasCreated:!1,tail:null,head:null,parent:null,item:null}),S(this,"_riot_id",++xe),S(this,"root",b),j(this,{opts:a},f),S(this,"parent",s||null),S(this,"tags",{}),S(this,"refs",{}),E||u&&l?i=b:(C||(b.innerHTML=""),i=Z(t.tmpl,r,d(b))),S(this,"update",function(t){var e={},r=this.isMounted&&!c;return j(this,t),nt.apply(this,[u,s,l,e,h]),r&&this.isMounted&&n(this.shouldUpdate)&&!this.shouldUpdate(t,e)?this:(u&&l&&at.apply(this,[this.parent,T]),j(a,e),r&&this.trigger("update",t),V.call(this,y),r&&this.trigger("updated"),this)}.bind(this)),S(this,"mixin",function(){var t=this;return k(arguments,function(e){var r,i,a=[],s=["init","__proto__"];e=o(e)?Y(e):e,r=n(e)?new e:e;var u=Object.getPrototypeOf(r);do{a=a.concat(Object.getOwnPropertyNames(i||r))}while(i=Object.getPrototypeOf(i||r));k(a,function(e){if(!O(s,e)){var i=Object.getOwnPropertyDescriptor(r,e)||Object.getOwnPropertyDescriptor(u,e),o=i&&(i.get||i.set);!t.hasOwnProperty(e)&&o?Object.defineProperty(t,e,i):t[e]=n(r[e])?r[e].bind(t):r[e]}}),r.init&&r.init.bind(t)()}),this}.bind(this)),S(this,"mount",function(){var e=this;b._tag=this,W.apply(s,[b,b.attributes,function(t,n){!l&&se.isPrototypeOf(n)&&(n.tag=e),t.expr=n,h.push(t)}]),m=[],_(t.attrs,function(t,e){m.push({name:t,value:e})}),W.apply(this,[b,m,function(t,e){e?y.push(e):x(b,t.name,t.value)}]),nt.apply(this,[u,s,l,a,h]);var n=Y(Ct);if(n&&!c)for(var r in n)n.hasOwnProperty(r)&&e.mixin(n[r]);if(t.fn&&t.fn.call(this,a),c||this.trigger("before-mount"),F.apply(this,[i,y,l]),this.update(f),!l&&!E)for(;i.firstChild;)b.appendChild(i.firstChild);if(S(this,"root",b),!c&&this.parent){var o=lt(this.parent);o.one(o.isMounted?"updated":"mount",function(){rt.call(e,!0),e.trigger("mount")})}else rt.call(this,!0),c||this.trigger("mount");return this.__.wasCreated=!0,this}.bind(this)),S(this,"unmount",function(e){var n,r=this,i=this.root,o=i.parentNode,a=wt.indexOf(this);return c||this.trigger("before-unmount"),_(t.attrs,function(t){N(t,kt)&&(t=t.slice(kt.length)),v(b,t)}),this.__.listeners.forEach(function(t){Object.keys(t[Mt]).forEach(function(e){t.removeEventListener(e,t[Mt][e])})}),-1!==a&&wt.splice(a,1),(o||C)&&(s?(n=lt(s),C?Object.keys(this.tags).forEach(function(t){dt(n.tags,t,r.tags[t])}):(dt(n.tags,w,this),s!==n&&dt(s.tags,w,this))):g(i,""),o&&!e&&o.removeChild(i)),this.__.virts&&k(this.__.virts,function(t){t.parentNode&&t.parentNode.removeChild(t)}),ct(y),k(h,function(t){return t.expr&&t.expr.unmount&&t.expr.unmount()}),this.__.onUnmount&&this.__.onUnmount(),c||(this.isMounted||this.trigger("mount"),this.trigger("unmount"),this.off("*")),S(this,"isMounted",!1),this.__.wasCreated=!1,delete this.root._tag,this}.bind(this))}function ot(t){return t.tagName&&_t[b(t,Et)||b(t,Et)||t.tagName.toLowerCase()]}function at(t,e){var n=this;k(Object.keys(t),function(r){var o=O(e,r);(i(n[r])||o)&&(o||e.push(r),n[r]=t[r])})}function st(t,e){var n,r=this.parent;r&&(n=r.tags[t],s(n)?n.splice(e,0,n.splice(n.indexOf(this),1)[0]):pt(r.tags,t,this))}function ut(t,e,n,r){var i=new it(t,e,n),o=e.tagName||ft(e.root,!0),a=lt(r);return S(i,"parent",a),i.__.parent=r,pt(a.tags,o,i),a!==r&&pt(r.tags,o,i),i}function lt(t){for(var e=t;e.__.isAnonymous&&e.parent;)e=e.parent;return e}function ct(t){k(t,function(t){t instanceof it?t.unmount(!0):t.tagName?t.tag.unmount(!0):t.unmount&&t.unmount()})}function ft(t,e){var n=ot(t),r=!e&&b(t,Et);return r&&!ne.hasExpr(r)?r:n?n.name:t.tagName.toLowerCase()}function pt(t,e,n,r,o){var a=t[e],u=s(a),l=!i(o);if(!a||a!==n)if(!a&&r)t[e]=[n];else if(a)if(u){var c=a.indexOf(n);if(c===o)return;-1!==c&&a.splice(c,1),l?a.splice(o,0,n):a.push(n)}else t[e]=[a,n];else t[e]=n}function dt(t,e,n,r){if(s(t[e])){var i=t[e].indexOf(n);-1!==i&&t[e].splice(i,1),t[e].length?1!==t[e].length||r||(t[e]=t[e][0]):delete t[e]}else delete t[e]}function ht(t,e,n,r){var i=_t[e],o=_t[e].class,a=r||(o?Object.create(o.prototype):{}),s=t._innerHTML=t._innerHTML||t.innerHTML,u=j({root:t,opts:n},{parent:n?n.parent:null});return i&&t&&it.apply(a,[i,u,s]),a&&a.mount&&(a.mount(!0),O(wt,a)||wt.push(a)),a}function gt(t,e){var n=f();mt.call(t,n),e.parentNode.replaceChild(n,e)}function mt(t,e){var n,r,i=this,o=p(),a=p(),s=f();for(this.root.insertBefore(o,this.root.firstChild),this.root.appendChild(a),this.__.head=r=o,this.__.tail=a;r;)n=r.nextSibling,s.appendChild(r),i.__.virts.push(r),r=n;e?t.insertBefore(s,e.__.head):t.appendChild(s)}function vt(t,e){for(var n,r=this,i=this.__.head,o=f();i;)if(n=i.nextSibling,o.appendChild(i),(i=n)===r.__.tail){o.appendChild(i),t.insertBefore(o,e.__.head);break}}function yt(t){if(!t){var e=Object.keys(_t);return e+yt(e)}return t.filter(function(t){return!/[^-\w]/.test(t)}).reduce(function(t,e){var n=e.trim().toLowerCase();return t+",["+Et+'="'+n+'"]'},"")}var bt,xt,wt=[],_t={},Ct="__global_mixin",kt="riot-",Ot=["ref","data-ref"],Et="data-is",Nt="if",St="each",jt="no-reorder",Tt="show",At="hide",Mt="__riot-events__",Lt="string",It="object",Vt="undefined",Rt="function",Pt="http://www.w3.org/1999/xlink",$t="http://www.w3.org/2000/svg",Dt=/^xlink:(\w+)/,Ht=typeof window===Vt?void 0:window,zt=/^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/,Ut=/^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/,Bt=/^on/,Ft=/([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g,Wt={viewbox:"viewBox"},Kt=/^(?:disabled|checked|readonly|required|allowfullscreen|auto(?:focus|play)|compact|controls|default|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|no(?:resize|shade|validate|wrap)?|open|reversed|seamless|selected|sortable|truespeed|typemustmatch)$/,qt=0|(Ht&&Ht.document||{}).documentMode,Zt=Object.freeze({isBoolAttr:e,isFunction:n,isObject:r,isUndefined:i,isString:o,isBlank:a,isArray:s,isWritable:u}),Gt=Object.freeze({$$:l,$:c,createFrag:f,createDOMPlaceholder:p,isSvg:d,mkEl:h,setInnerHTML:g,toggleVisibility:m,remAttr:v,styleObjectToString:y,getAttr:b,setAttr:x,safeInsert:w,walkAttrs:_,walkNodes:C}),Jt={},Qt=[],Xt=!1;Ht&&(bt=function(){var t=h("style");x(t,"type","text/css");var e=c("style[type=riot]");return e?(e.id&&(t.id=e.id),e.parentNode.replaceChild(t,e)):document.getElementsByTagName("head")[0].appendChild(t),t}(),xt=bt.styleSheet);var Yt={styleNode:bt,add:function(t,e){e?Jt[e]=t:Qt.push(t),Xt=!0},inject:function(){if(Ht&&Xt){Xt=!1;var t=Object.keys(Jt).map(function(t){return Jt[t]}).concat(Qt).join("\n");xt?xt.cssText=t:bt.innerHTML=t}}},te=function(){function t(t,e){for(;--e>=0&&/\s/.test(t[e]););return e}function e(e,s){var u=/.*/g,l=u.lastIndex=s++,c=u.exec(e)[0].match(o);if(c){var f=l+c[0].length;l=t(e,l);var p=e[l];if(l<0||~n.indexOf(p))return f;if("."===p)"."===e[l-1]&&(s=f);else if("+"===p||"-"===p)(e[--l]!==p||(l=t(e,l))<0||!a.test(e[l]))&&(s=f);else if(~i.indexOf(p)){for(var d=l+1;--l>=0&&a.test(e[l]););~r.indexOf(e.slice(l+1,d))&&(s=f)}}return s}var n="[{(,;:?=|&!^~>%*/",r=["case","default","do","else","in","instanceof","prefix","return","typeof","void","yield"],i=r.reduce(function(t,e){return t+e.slice(-1)},""),o=/^\/(?=[^*>\/])[^[\/\\]*(?:(?:\\.|\[(?:\\.|[^\]\\]*)*\])[^[\\/]*)*?\/[gimuy]*/,a=/[$\w]/;return e}(),ee=function(t){function e(t){return t}function n(t,e){return e||(e=x),new RegExp(t.source.replace(/{/g,e[2]).replace(/}/g,e[3]),t.global?l:"")}function r(t){if(t===v)return y;var e=t.split(" ");if(2!==e.length||d.test(t))throw new Error('Unsupported brackets "'+t+'"');return e=e.concat(t.replace(h,"\\").split(" ")),e[4]=n(e[1].length>1?/{[\S\s]*?}/:y[4],e),e[5]=n(t.length>3?/\\({|})/g:y[5],e),e[6]=n(y[6],e),e[7]=RegExp("\\\\("+e[3]+")|([[({])|("+e[3]+")|"+g,l),e[8]=t,e}function i(t){return t instanceof RegExp?s(t):x[t]}function o(t){(t||(t=v))!==x[8]&&(x=r(t),s=t===v?e:n,x[9]=s(y[9])),b=t}function a(t){var e;t=t||{},e=t.brackets,Object.defineProperty(t,"brackets",{set:o,get:function(){return b},enumerable:!0}),u=t,o(e)}var s,u,l="g",c=/\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,f=/"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'|`[^`\\]*(?:\\[\S\s][^`\\]*)*`/g,p=f.source+"|"+/(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source+"|"+/\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?([^<]\/)[gim]*/.source,d=RegExp("[\\x00-\\x1F<>a-zA-Z0-9'\",;\\\\]"),h=/(?=[[\]()*+?.^$|])/g,g=f.source+"|"+/(\/)(?![*\/])/.source,m={"(":RegExp("([()])|"+g,l),"[":RegExp("([[\\]])|"+g,l),"{":RegExp("([{}])|"+g,l)},v="{ }",y=["{","}","{","}",/{[^}]*}/,/\\([{}])/g,/\\({)|{/g,RegExp("\\\\(})|([[({])|(})|"+g,l),v,/^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/,/(^|[^\\]){=[\S\s]*?}/],b=void 0,x=[];return i.split=function(t,e,n){function r(t){h&&(t=h+t,h=""),e||a?f.push(t&&t.replace(n[5],"$1")):f.push(t)}function i(n,r,i){return i&&(r=te(t,n)),e&&r>n+2&&(l="⁗"+d.length+"~",d.push(t.slice(n,r)),h+=t.slice(s,n)+l,s=r),r}n||(n=x);var o,a,s,u,l,c,f=[],p=n[6],d=[],h="";for(a=s=p.lastIndex=0;o=p.exec(t);){if(c=p.lastIndex,u=o.index,a){if(o[2]){var g=o[2],v=m[g],y=1;for(v.lastIndex=c;o=v.exec(t);)if(o[1]){if(o[1]===g)++y;else if(!--y)break}else v.lastIndex=i(o.index,v.lastIndex,o[2]);p.lastIndex=y?t.length:v.lastIndex;continue}if(!o[3]){p.lastIndex=i(u,c,o[4]);continue}}o[1]||(r(t.slice(s,u)),s=p.lastIndex,p=n[6+(a^=1)],p.lastIndex=s)}return t&&s<t.length&&r(t.slice(s)),f.qblocks=d,f},i.hasExpr=function(t){return x[4].test(t)},i.loopKeys=function(t){var e=t.match(x[9]);return e?{key:e[1],pos:e[2],val:x[0]+e[3].trim()+x[1]}:{val:t.trim()}},i.array=function(t){return t?r(t):x},Object.defineProperty(i,"settings",{set:a,get:function(){return u}}),i.settings="undefined"!=typeof riot&&riot.settings||{},i.set=o,i.skipRegex=te,i.R_STRINGS=f,i.R_MLCOMMS=c,i.S_QBLOCKS=p,i.S_QBLOCK2=g,i}(),ne=function(){function t(t,r){return t?(a[t]||(a[t]=n(t))).call(r,e.bind({data:r,tmpl:t})):t}function e(e,n){e.riotData={tagName:n&&n.__&&n.__.tagName,_riot_id:n&&n._riot_id},t.errorHandler?t.errorHandler(e):"undefined"!=typeof console&&"function"==typeof console.error&&(console.error(e.message),console.log("<%s> %s",e.riotData.tagName||"Unknown tag",this.tmpl),console.log(this.data))}function n(t){var e=r(t);return"try{return "!==e.slice(0,11)&&(e="return "+e),new Function("E",e+";")}function r(t){var e,n=ee.split(t.replace(s,'"'),1),r=n.qblocks;if(n.length>2||n[0]){var o,a,l=[];for(o=a=0;o<n.length;++o)(e=n[o])&&(e=1&o?i(e,1,r):'"'+e.replace(/\\/g,"\\\\").replace(/\r\n?|\n/g,"\\n").replace(/"/g,'\\"')+'"')&&(l[a++]=e);e=a<2?l[0]:"["+l.join(",")+'].join("")'}else e=i(n[1],0,r);return r.length&&(e=e.replace(u,function(t,e){return r[e].replace(/\r/g,"\\r").replace(/\n/g,"\\n")})),e}function i(t,e,n){if(t=t.replace(/\s+/g," ").trim().replace(/\ ?([[\({},?\.:])\ ?/g,"$1")){for(var r,i=[],a=0;t&&(r=t.match(l))&&!r.index;){var s,u,f=/,|([[{(])|$/g;for(t=RegExp.rightContext,s=r[2]?n[r[2]].slice(1,-1).trim().replace(/\s+/g," "):r[1];u=(r=f.exec(t))[1];)!function(e,n){var r,i=1,o=c[e];for(o.lastIndex=n.lastIndex;r=o.exec(t);)if(r[0]===e)++i;else if(!--i)break;n.lastIndex=i?t.length:o.lastIndex}(u,f);u=t.slice(0,r.index),t=RegExp.rightContext,i[a++]=o(u,1,s)}t=a?a>1?"["+i.join(",")+'].join(" ").trim()':i[0]:o(t,e)}return t}function o(t,e,n){var r;return t=t.replace(p,function(t,e,n,i,o){return n&&(i=r?0:i+t.length,"this"!==n&&"global"!==n&&"window"!==n?(t=e+'("'+n+f+n,i&&(r="."===(o=o[i])||"("===o||"["===o)):i&&(r=!d.test(o.slice(i)))),t}),r&&(t="try{return "+t+"}catch(e){E(e,this)}"),n?t=(r?"function(){"+t+"}.call(this)":"("+t+")")+'?"'+n+'":""':e&&(t="function(v){"+(r?t.replace("return ","v="):"v=("+t+")")+';return v||v===0?v:""}.call(this)'),t}var a={};t.hasExpr=ee.hasExpr,t.loopKeys=ee.loopKeys,t.clearCache=function(){a={}},t.errorHandler=null;var s=/\u2057/g,u=/\u2057(\d+)~/g,l=/^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/,c={"(":/[()]/g,"[":/[[\]]/g,"{":/[{}]/g},f='"in this?this:'+("object"!=typeof window?"global":"window")+").",p=/[,{][\$\w]+(?=:)|(^ *|[^$\w\.{])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,d=/^(?=(\.[$\w]+))\1(?:[^.[(]|$)/;return t.version=ee.version="v3.0.8",t}(),re=function(t){t=t||{};var e={},n=Array.prototype.slice;return Object.defineProperties(t,{on:{value:function(n,r){return"function"==typeof r&&(e[n]=e[n]||[]).push(r),t},enumerable:!1,writable:!1,configurable:!1},off:{value:function(n,r){if("*"!=n||r)if(r)for(var i,o=e[n],a=0;i=o&&o[a];++a)i==r&&o.splice(a--,1);else delete e[n];else e={};return t},enumerable:!1,writable:!1,configurable:!1},one:{value:function(e,n){function r(){t.off(e,r),n.apply(t,arguments)}return t.on(e,r)},enumerable:!1,writable:!1,configurable:!1},trigger:{value:function(r){var i,o,a,s=arguments,u=arguments.length-1,l=new Array(u);for(a=0;a<u;a++)l[a]=s[a+1];for(i=n.call(e[r]||[],0),a=0;o=i[a];++a)o.apply(t,l);return e["*"]&&"*"!=r&&t.trigger.apply(t,["*",r].concat(l)),t},enumerable:!1,writable:!1,configurable:!1}}),t},ie=Object.freeze({each:k,contains:O,toCamel:E,startsWith:N,defineProperty:S,extend:j}),oe=j(Object.create(ee.settings),{skipAnonymousTags:!0,autoUpdate:!0}),ae={init:function(t,e,n){v(t,Nt),this.tag=e,this.expr=n,this.stub=p(),this.pristine=t;var r=t.parentNode;return r.insertBefore(this.stub,t),r.removeChild(t),this},update:function(){this.value=ne(this.expr,this.tag),this.value&&!this.current?(this.current=this.pristine.cloneNode(!0),this.stub.parentNode.insertBefore(this.current,this.stub),this.expressions=[],F.apply(this.tag,[this.current,this.expressions,!0])):!this.value&&this.current&&(ct(this.expressions),this.current._tag?this.current._tag.unmount():this.current.parentNode&&this.current.parentNode.removeChild(this.current),this.current=null,this.expressions=[]),this.value&&V.call(this.tag,this.expressions)},unmount:function(){ct(this.expressions||[])}},se={init:function(t,e,n,r){return this.dom=t,this.attr=n,this.rawValue=r,this.parent=e,this.hasExp=ne.hasExpr(r),this},update:function(){var t=this.value,e=this.parent&&lt(this.parent),n=this.dom.__ref||this.tag||this.dom;this.value=this.hasExp?ne(this.rawValue,this.parent):this.rawValue,!a(t)&&e&&dt(e.refs,t,n),!a(this.value)&&o(this.value)?(e&&pt(e.refs,this.value,n,null,this.parent.__.index),this.value!==t&&x(this.dom,this.attr,this.value)):v(this.dom,this.attr),this.dom.__ref||(this.dom.__ref=n)},unmount:function(){var t=this.tag||this.dom,e=this.parent&&lt(this.parent);!a(this.value)&&e&&dt(e.refs,this.value,t)}},ue=/<yield\b/i,le=/<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/gi,ce=/<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/gi,fe=/<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/gi,pe={tr:"tbody",th:"tr",td:"tr",col:"colgroup"},de=qt&&qt<10?zt:Ut,he="div",ge="svg",me={},ve=me[Ct]={},ye=0,be=Object.freeze({Tag:G,tag:J,tag2:Q,mount:X,mixin:Y,update:tt,unregister:et,version:"v3.6.3"}),xe=0,we=Object.freeze({getTag:ot,inheritFrom:at,moveChildTag:st,initChildTag:ut,getImmediateCustomParentTag:lt,unmountAll:ct,getTagName:ft,arrayishAdd:pt,arrayishRemove:dt,mountTo:ht,makeReplaceVirtual:gt,makeVirtual:mt,moveVirtual:vt,selectTags:yt}),_e=oe,Ce={tmpl:ne,brackets:ee,styleManager:Yt,vdom:wt,styleNode:Yt.styleNode,dom:Gt,check:Zt,misc:ie,tags:we},ke=G,Oe=J,Ee=Q,Ne=X,Se=Y,je=tt,Te=et,Ae=re,Me=j({},be,{observable:re,settings:_e,util:Ce});t.settings=_e,t.util=Ce,t.Tag=ke,t.tag=Oe,t.tag2=Ee,t.mount=Ne,t.mixin=Se,t.update=je,t.unregister=Te,t.version="v3.6.3",t.observable=Ae,t.default=Me,Object.defineProperty(t,"__esModule",{value:!0})})},function(t,e,n){"use strict";t.exports="function"==typeof Worker&&"function"==typeof Int32Array},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t){return Math.round(1e6*t)/1e6}var o;o=performance&&performance.now?function(){return performance.now()}:Date.now?function(){return Date.now()}:function(){return(new Date).getTime()},t.exports=function(){function t(e){r(this,t),this.output=e}return t.prototype.start=function(){this.start_time=this.lap_time=o()},t.prototype.lap=function(t){var e=o();this.output(t+": "+i(e-this.lap_time)+" ms"),this.lap_time=e},t.prototype.finish=function(t){t&&this.lap(t),this.output("合計時間: "+i(this.lap_time-this.start_time)+" ms")},t}()},function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var i=n(0),o=function(){function t(){r(this,t)}return t.prototype.loadWorker=function(){this.worker=new Worker("gen/minisat_worker.js")},t.prototype.setListener=function(t){this.worker||this.loadWorker(),this.listener&&this.worker.removeEventListener("message",this.listener,!0),this.listener=function(e){var n=e.data.result,r=null,i="ERROR";n&&(r=n.split(" "),i=r.shift(),r=r.map(function(t){return+t})),t(i,r,e.data.stdout,e.data.stderr)},this.worker.addEventListener("message",this.listener,!0)},t.prototype.solve=function(t,e){var n=t.toDIMACS();this.setListener(e),this.worker.postMessage(n)},t.prototype.solve_loop=function(t,e){var n=this;this.setListener(function(r,o,a,s){var u=e(t,r,o,a,s);if(!1!==u){if(u instanceof i)return t=u,void n.worker.postMessage(u.toDIMACS());throw new TypeError}}),this.worker.postMessage(t.toDIMACS())},t}();t.exports=o},function(t,e,n){"use strict";t.exports=function(t,e,n){for(var r=[],i=0;i<e;++i){r.push([]);for(var o=0;o<t;++o)r[i].push(n)}return r}},function(t,e,n){"use strict";function r(t,e){var n=[];if((e=+e)<0||e>t.length)return[];if(0==e)return[[]];if(1==e)return t.map(function(t){return[t]});if(e==t.length-1){var o=function(){var e=void 0;for(e=0;e<t.length;++e)n.push(t.filter(function(t,n){return n!==e}));return{v:n}}();if("object"===(void 0===o?"undefined":i(o)))return o.v}var a=[].concat(t);if(e==t.length)return[a];for(;;){if(a.length===e){n.push(a);break}var s=[a.pop()],u=r(a,e-1),l=void 0;for(l=0;l<u.length;++l)n.push(u[l].concat(s))}return n}var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t};t.exports=r},function(t,e,n){"use strict";function r(t){return i.push(t),window.postMessage(o,"*"),null}var i=[],o="set_timeout_"+Math.random();window.addEventListener("message",function(t){t.source===window&&t.data===o&&(t.stopPropagation(),i.length>0&&i.shift()())},!0),t.exports=r},,,,,function(t,e,n){"use strict";t.exports=function(t){return document.addEventListener("DOMContentLoaded",t,!1)}},function(t,e,n){"use strict";n(1).tag2("indicator",'<div class="indicator"> <p each="{mes in messages}">{mes}</p> </div>','indicator .indicator,[data-is="indicator"] .indicator{ height:4.5em; line-height:1.5; overflow-y:auto; border:1px solid #ccc; margin:20px; } indicator .indicator p,[data-is="indicator"] .indicator p{ margin:0 0.5em; }',"",function(t){var e=this,n=e.messages=[];e.log=function(t){n.push(t),e.update()},e.clear=function(){n.length=0,e.update()}})},,,,,,,,,,,,,,,,,,,,,,,,function(t,e,n){"use strict";var r=n(1),i=n(12);n(38),n(13);var o=n(2),a=n(3),s=n(4),u=n(0),l=n(6),c=n(5),f=n(7);i(function(){if(!o)return void alert("この環境ではJavaScriptの機能が不足していて、実行できません。");var t=r.mount("akari-field")[0],e=r.mount("indicator")[0],n=new a(e.log.bind(e)),i=new s;i.loadWorker(),document.getElementById("solve_btn").addEventListener("click",function(){function r(t,e){return t*a+ +e+1}function o(t){!t||t.length<=1||l(t.map(function(t){return-t}),2).forEach(function(t){return h.add(t)})}e.clear(),n.start(),t.creating=!1,t.update();for(var a=t.width,s=t.height,p=c(a,s,null),d=c(a,s,null),h=new u,g=0;g<s;++g){for(var m=null,v=0;v<a;++v)t.data[g][v]>0?(o(m),m=null):(null===m&&(m=[]),m.push(r(g,v)),p[g][v]=m);o(m)}for(var y=0;y<a;++y){for(var b=null,x=0;x<s;++x)t.data[x][y]>0?(o(b),b=null):(null===b&&(b=[]),b.push(r(x,y)),d[x][y]=b);o(b)}for(var w=0;w<s;++w)for(var _=0;_<a;++_){var C=+t.data[w][_];if(C>0){if(h.add(-r(w,_)),6==C)continue;var k=function(t,e){for(var n=[1,0,-1,0],i=[0,1,0,-1],o=[],u=0;u<4;++u){var l=t+n[u],c=e+i[u];0<=l&&l<s&&0<=c&&c<a&&o.push(r(l,c))}return o}(w,_),O=5===C?0:C;if(O>k.length)return void alert("数字がおかしいです。");O>0&&l(k,k.length-O+1).forEach(function(t){return h.add(t)}),O<k.length&&l(k.map(function(t){return-t}),O+1).forEach(function(t){return h.add(t)})}else h.add(p[w][_].concat(d[w][_]).filter(function(t,e,n){return n.indexOf(t)===e}))}n.lap("立式"),i.solve(h,function(e,o,u,l){function c(e){for(var n=0;n<s;++n)for(var i=0;i<a;++i)t.data[n][i]>0||(t.data[n][i]=e[r(n,i)]?-1:0);t.update()}if(n.lap("初回ソルバー"),"SAT"!==e)return void alert("解が見つかりませんでした。");var p={};o.forEach(function(t){return t>0&&(p[t]=!0)}),c(p),n.lap("出力"),h.add(Object.keys(p).map(function(t){return-t})),i.solve(h,function(e,r,o,a){if("SAT"!==e)return n.finish("別解チェック"),void alert("一意解です。");if(document.getElementById("others_reset").checked)return n.finish("別解チェック"),alert("別解があります。"),c({}),void t.update();n.lap("確定マスの抽出");var s=r.filter(function(t){return t>0&&p[t]});h.add(s.map(function(t){return-t})),f(function(){var e={};s.forEach(function(t){return e[t]=!0}),c(e),t.update()}),i.solve_loop(h,function(e,r,i,o,a){return"UNSAT"===r?(n.finish("完了"),alert("別解があります。"),!1):(s=i.filter(function(t){return t>0&&-1!==s.indexOf(t)}),0===s.length?(n.finish("完了"),c({}),t.update(),alert("別解があります。"),!1):(n.lap("確定マスの抽出"),f(function(){var e={};s.forEach(function(t){return e[t]=!0}),c(e),t.update()}),h.add(s.map(function(t){return-t})),h))})})})},!1)})},function(t,e,n){"use strict";n(1).tag2("akari-field",'<div class="control"> <label>幅: <input ref="width" riot-value="{width}" min="2" onchange="{onInputSize}" oninput="{onInputSize}" type="{\'number\'}"></label> × <label>高さ: <input ref="height" riot-value="{height}" min="2" onchange="{onInputSize}" oninput="{onInputSize}" type="{\'number\'}"></label> <input type="button" value="変更 &amp; クリア" onclick="{recreateField}"> </div> <div class="control"> 操作モード： <label><input type="radio" name="creating" value="1" checked="{creating}" onchange="{onCreatingChange}"> 作問</label> <label><input type="radio" name="creating" value="0" checked="{!creating}" onchange="{onCreatingChange}"> 解答</label> </div> <table> <tr each="{row, row_num in data}"> <td each="{item, col_num in row}" class="{num: 0 < item, lit: lit[row_num][col_num]}" data-row="{row_num}" data-col="{col_num}" oncontextmenu="{clearCell}" onclick="{onClickCell}">{disp(item)}</td> </tr> </table>','akari-field div.control,[data-is="akari-field"] div.control{ margin: 5px 0; } akari-field table,[data-is="akari-field"] table{ border-collapse: collapse; border: 2px solid #000; } akari-field td,[data-is="akari-field"] td{ width: 1.5em; height: 1.5em; border: 1px solid #000; vertical-align: middle; text-align: center; } akari-field td.num,[data-is="akari-field"] td.num{ background-color: #000; color: #fff; } akari-field td.lit,[data-is="akari-field"] td.lit{ background-color: #ffc; }',"",function(t){var e=this;e.width=e.height=10,e.creating=!0;var r=n(5);e.recreateField=function(){e.data=r(e.width,e.height,"")},e.recreateField(),e.onInputSize=function(){e.width=e.refs.width.value,e.height=e.refs.height.value},e.onCreatingChange=function(t){e.creating="1"==t.target.value},e.disp=function(t){return""==t?"":5==t?"0":6==t?"":-1==t?"○":t},e.on("update",function(){e.lit=r(e.width,e.height,!1);for(var t=0;t<e.height;++t)for(var n=null,i=!1,o=0;o<e.width;++o){var a=+e.data[t][o];if(a>0)i=!1,n=null;else{if(null===n&&(n=o),-1===a){if(i=!0,null!==n)for(var s=n;s<o;++s)e.lit[t][s]=!0;for(var u=t-1;u>=0&&!(e.data[u][o]>0);--u)e.lit[u][o]=!0;for(var l=t+1;l<e.height&&!(e.data[l][o]>0);++l)e.lit[l][o]=!0}i&&(e.lit[t][o]=!0)}}});var i={6:5,5:1,1:2,2:3,3:4,4:""};e.onClickCell=function(t){var n=t.target.dataset.row,r=t.target.dataset.col,o=e.data[n][r];if(e.creating)return void(e.data[n][r]=o in i?i[o]:6);e.data[n][r]>0||(e.data[n][r]=-1)},e.clearCell=function(t){t.preventDefault();var n=t.target.dataset.row,r=t.target.dataset.col;!e.creating&&e.data[n][r]>0||(e.data[n][r]="")}})}]);