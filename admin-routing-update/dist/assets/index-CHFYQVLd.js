function Np(e,n){for(var r=0;r<n.length;r++){const a=n[r];if(typeof a!="string"&&!Array.isArray(a)){for(const i in a)if(i!=="default"&&!(i in e)){const s=Object.getOwnPropertyDescriptor(a,i);s&&Object.defineProperty(e,i,s.get?s:{enumerable:!0,get:()=>a[i]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function r(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(i){if(i.ep)return;i.ep=!0;const s=r(i);fetch(i.href,s)}})();function Sp(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var cd={exports:{}},Ia={},ud={exports:{}},U={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var jr=Symbol.for("react.element"),Cp=Symbol.for("react.portal"),Ep=Symbol.for("react.fragment"),Pp=Symbol.for("react.strict_mode"),Ap=Symbol.for("react.profiler"),Tp=Symbol.for("react.provider"),Dp=Symbol.for("react.context"),Rp=Symbol.for("react.forward_ref"),zp=Symbol.for("react.suspense"),Ip=Symbol.for("react.memo"),Lp=Symbol.for("react.lazy"),Tl=Symbol.iterator;function Mp(e){return e===null||typeof e!="object"?null:(e=Tl&&e[Tl]||e["@@iterator"],typeof e=="function"?e:null)}var pd={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},md=Object.assign,fd={};function Pt(e,n,r){this.props=e,this.context=n,this.refs=fd,this.updater=r||pd}Pt.prototype.isReactComponent={};Pt.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};Pt.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function hd(){}hd.prototype=Pt.prototype;function Ts(e,n,r){this.props=e,this.context=n,this.refs=fd,this.updater=r||pd}var Ds=Ts.prototype=new hd;Ds.constructor=Ts;md(Ds,Pt.prototype);Ds.isPureReactComponent=!0;var Dl=Array.isArray,gd=Object.prototype.hasOwnProperty,Rs={current:null},xd={key:!0,ref:!0,__self:!0,__source:!0};function vd(e,n,r){var a,i={},s=null,l=null;if(n!=null)for(a in n.ref!==void 0&&(l=n.ref),n.key!==void 0&&(s=""+n.key),n)gd.call(n,a)&&!xd.hasOwnProperty(a)&&(i[a]=n[a]);var o=arguments.length-2;if(o===1)i.children=r;else if(1<o){for(var d=Array(o),p=0;p<o;p++)d[p]=arguments[p+2];i.children=d}if(e&&e.defaultProps)for(a in o=e.defaultProps,o)i[a]===void 0&&(i[a]=o[a]);return{$$typeof:jr,type:e,key:s,ref:l,props:i,_owner:Rs.current}}function Fp(e,n){return{$$typeof:jr,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function zs(e){return typeof e=="object"&&e!==null&&e.$$typeof===jr}function Op(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return n[r]})}var Rl=/\/+/g;function Za(e,n){return typeof e=="object"&&e!==null&&e.key!=null?Op(""+e.key):n.toString(36)}function Yr(e,n,r,a,i){var s=typeof e;(s==="undefined"||s==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(s){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case jr:case Cp:l=!0}}if(l)return l=e,i=i(l),e=a===""?"."+Za(l,0):a,Dl(i)?(r="",e!=null&&(r=e.replace(Rl,"$&/")+"/"),Yr(i,n,r,"",function(p){return p})):i!=null&&(zs(i)&&(i=Fp(i,r+(!i.key||l&&l.key===i.key?"":(""+i.key).replace(Rl,"$&/")+"/")+e)),n.push(i)),1;if(l=0,a=a===""?".":a+":",Dl(e))for(var o=0;o<e.length;o++){s=e[o];var d=a+Za(s,o);l+=Yr(s,n,r,d,i)}else if(d=Mp(e),typeof d=="function")for(e=d.call(e),o=0;!(s=e.next()).done;)s=s.value,d=a+Za(s,o++),l+=Yr(s,n,r,d,i);else if(s==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return l}function Ar(e,n,r){if(e==null)return e;var a=[],i=0;return Yr(e,a,"","",function(s){return n.call(r,s,i++)}),a}function _p(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var je={current:null},Kr={transition:null},Bp={ReactCurrentDispatcher:je,ReactCurrentBatchConfig:Kr,ReactCurrentOwner:Rs};function yd(){throw Error("act(...) is not supported in production builds of React.")}U.Children={map:Ar,forEach:function(e,n,r){Ar(e,function(){n.apply(this,arguments)},r)},count:function(e){var n=0;return Ar(e,function(){n++}),n},toArray:function(e){return Ar(e,function(n){return n})||[]},only:function(e){if(!zs(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};U.Component=Pt;U.Fragment=Ep;U.Profiler=Ap;U.PureComponent=Ts;U.StrictMode=Pp;U.Suspense=zp;U.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Bp;U.act=yd;U.cloneElement=function(e,n,r){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var a=md({},e.props),i=e.key,s=e.ref,l=e._owner;if(n!=null){if(n.ref!==void 0&&(s=n.ref,l=Rs.current),n.key!==void 0&&(i=""+n.key),e.type&&e.type.defaultProps)var o=e.type.defaultProps;for(d in n)gd.call(n,d)&&!xd.hasOwnProperty(d)&&(a[d]=n[d]===void 0&&o!==void 0?o[d]:n[d])}var d=arguments.length-2;if(d===1)a.children=r;else if(1<d){o=Array(d);for(var p=0;p<d;p++)o[p]=arguments[p+2];a.children=o}return{$$typeof:jr,type:e.type,key:i,ref:s,props:a,_owner:l}};U.createContext=function(e){return e={$$typeof:Dp,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Tp,_context:e},e.Consumer=e};U.createElement=vd;U.createFactory=function(e){var n=vd.bind(null,e);return n.type=e,n};U.createRef=function(){return{current:null}};U.forwardRef=function(e){return{$$typeof:Rp,render:e}};U.isValidElement=zs;U.lazy=function(e){return{$$typeof:Lp,_payload:{_status:-1,_result:e},_init:_p}};U.memo=function(e,n){return{$$typeof:Ip,type:e,compare:n===void 0?null:n}};U.startTransition=function(e){var n=Kr.transition;Kr.transition={};try{e()}finally{Kr.transition=n}};U.unstable_act=yd;U.useCallback=function(e,n){return je.current.useCallback(e,n)};U.useContext=function(e){return je.current.useContext(e)};U.useDebugValue=function(){};U.useDeferredValue=function(e){return je.current.useDeferredValue(e)};U.useEffect=function(e,n){return je.current.useEffect(e,n)};U.useId=function(){return je.current.useId()};U.useImperativeHandle=function(e,n,r){return je.current.useImperativeHandle(e,n,r)};U.useInsertionEffect=function(e,n){return je.current.useInsertionEffect(e,n)};U.useLayoutEffect=function(e,n){return je.current.useLayoutEffect(e,n)};U.useMemo=function(e,n){return je.current.useMemo(e,n)};U.useReducer=function(e,n,r){return je.current.useReducer(e,n,r)};U.useRef=function(e){return je.current.useRef(e)};U.useState=function(e){return je.current.useState(e)};U.useSyncExternalStore=function(e,n,r){return je.current.useSyncExternalStore(e,n,r)};U.useTransition=function(){return je.current.useTransition()};U.version="18.3.1";ud.exports=U;var S=ud.exports;const bd=Sp(S),Up=Np({__proto__:null,default:bd},[S]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var $p=S,Vp=Symbol.for("react.element"),Wp=Symbol.for("react.fragment"),qp=Object.prototype.hasOwnProperty,Hp=$p.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Qp={key:!0,ref:!0,__self:!0,__source:!0};function jd(e,n,r){var a,i={},s=null,l=null;r!==void 0&&(s=""+r),n.key!==void 0&&(s=""+n.key),n.ref!==void 0&&(l=n.ref);for(a in n)qp.call(n,a)&&!Qp.hasOwnProperty(a)&&(i[a]=n[a]);if(e&&e.defaultProps)for(a in n=e.defaultProps,n)i[a]===void 0&&(i[a]=n[a]);return{$$typeof:Vp,type:e,key:s,ref:l,props:i,_owner:Hp.current}}Ia.Fragment=Wp;Ia.jsx=jd;Ia.jsxs=jd;cd.exports=Ia;var t=cd.exports,Ii={},wd={exports:{}},ze={},kd={exports:{}},Nd={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function n(I,O){var _=I.length;I.push(O);e:for(;0<_;){var H=_-1>>>1,A=I[H];if(0<i(A,O))I[H]=O,I[_]=A,_=H;else break e}}function r(I){return I.length===0?null:I[0]}function a(I){if(I.length===0)return null;var O=I[0],_=I.pop();if(_!==O){I[0]=_;e:for(var H=0,A=I.length,ae=A>>>1;H<ae;){var Le=2*(H+1)-1,_n=I[Le],Me=Le+1,nt=I[Me];if(0>i(_n,_))Me<A&&0>i(nt,_n)?(I[H]=nt,I[Me]=_,H=Me):(I[H]=_n,I[Le]=_,H=Le);else if(Me<A&&0>i(nt,_))I[H]=nt,I[Me]=_,H=Me;else break e}}return O}function i(I,O){var _=I.sortIndex-O.sortIndex;return _!==0?_:I.id-O.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;e.unstable_now=function(){return s.now()}}else{var l=Date,o=l.now();e.unstable_now=function(){return l.now()-o}}var d=[],p=[],m=1,g=null,u=3,y=!1,N=!1,k=!1,b=typeof setTimeout=="function"?setTimeout:null,h=typeof clearTimeout=="function"?clearTimeout:null,f=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function v(I){for(var O=r(p);O!==null;){if(O.callback===null)a(p);else if(O.startTime<=I)a(p),O.sortIndex=O.expirationTime,n(d,O);else break;O=r(p)}}function E(I){if(k=!1,v(I),!N)if(r(d)!==null)N=!0,fe(j);else{var O=r(p);O!==null&&On(E,O.startTime-I)}}function j(I,O){N=!1,k&&(k=!1,h(R),R=-1),y=!0;var _=u;try{for(v(O),g=r(d);g!==null&&(!(g.expirationTime>O)||I&&!F());){var H=g.callback;if(typeof H=="function"){g.callback=null,u=g.priorityLevel;var A=H(g.expirationTime<=O);O=e.unstable_now(),typeof A=="function"?g.callback=A:g===r(d)&&a(d),v(O)}else a(d);g=r(d)}if(g!==null)var ae=!0;else{var Le=r(p);Le!==null&&On(E,Le.startTime-O),ae=!1}return ae}finally{g=null,u=_,y=!1}}var x=!1,T=null,R=-1,w=5,C=-1;function F(){return!(e.unstable_now()-C<w)}function M(){if(T!==null){var I=e.unstable_now();C=I;var O=!0;try{O=T(!0,I)}finally{O?$():(x=!1,T=null)}}else x=!1}var $;if(typeof f=="function")$=function(){f(M)};else if(typeof MessageChannel<"u"){var P=new MessageChannel,ee=P.port2;P.port1.onmessage=M,$=function(){ee.postMessage(null)}}else $=function(){b(M,0)};function fe(I){T=I,x||(x=!0,$())}function On(I,O){R=b(function(){I(e.unstable_now())},O)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(I){I.callback=null},e.unstable_continueExecution=function(){N||y||(N=!0,fe(j))},e.unstable_forceFrameRate=function(I){0>I||125<I?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):w=0<I?Math.floor(1e3/I):5},e.unstable_getCurrentPriorityLevel=function(){return u},e.unstable_getFirstCallbackNode=function(){return r(d)},e.unstable_next=function(I){switch(u){case 1:case 2:case 3:var O=3;break;default:O=u}var _=u;u=O;try{return I()}finally{u=_}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(I,O){switch(I){case 1:case 2:case 3:case 4:case 5:break;default:I=3}var _=u;u=I;try{return O()}finally{u=_}},e.unstable_scheduleCallback=function(I,O,_){var H=e.unstable_now();switch(typeof _=="object"&&_!==null?(_=_.delay,_=typeof _=="number"&&0<_?H+_:H):_=H,I){case 1:var A=-1;break;case 2:A=250;break;case 5:A=1073741823;break;case 4:A=1e4;break;default:A=5e3}return A=_+A,I={id:m++,callback:O,priorityLevel:I,startTime:_,expirationTime:A,sortIndex:-1},_>H?(I.sortIndex=_,n(p,I),r(d)===null&&I===r(p)&&(k?(h(R),R=-1):k=!0,On(E,_-H))):(I.sortIndex=A,n(d,I),N||y||(N=!0,fe(j))),I},e.unstable_shouldYield=F,e.unstable_wrapCallback=function(I){var O=u;return function(){var _=u;u=O;try{return I.apply(this,arguments)}finally{u=_}}}})(Nd);kd.exports=Nd;var Yp=kd.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Kp=S,Re=Yp;function D(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,r=1;r<arguments.length;r++)n+="&args[]="+encodeURIComponent(arguments[r]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Sd=new Set,tr={};function Jn(e,n){jt(e,n),jt(e+"Capture",n)}function jt(e,n){for(tr[e]=n,e=0;e<n.length;e++)Sd.add(n[e])}var dn=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Li=Object.prototype.hasOwnProperty,Gp=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,zl={},Il={};function Xp(e){return Li.call(Il,e)?!0:Li.call(zl,e)?!1:Gp.test(e)?Il[e]=!0:(zl[e]=!0,!1)}function Zp(e,n,r,a){if(r!==null&&r.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return a?!1:r!==null?!r.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function Jp(e,n,r,a){if(n===null||typeof n>"u"||Zp(e,n,r,a))return!0;if(a)return!1;if(r!==null)switch(r.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function we(e,n,r,a,i,s,l){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=a,this.attributeNamespace=i,this.mustUseProperty=r,this.propertyName=e,this.type=n,this.sanitizeURL=s,this.removeEmptyString=l}var me={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){me[e]=new we(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];me[n]=new we(n,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){me[e]=new we(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){me[e]=new we(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){me[e]=new we(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){me[e]=new we(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){me[e]=new we(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){me[e]=new we(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){me[e]=new we(e,5,!1,e.toLowerCase(),null,!1,!1)});var Is=/[\-:]([a-z])/g;function Ls(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(Is,Ls);me[n]=new we(n,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(Is,Ls);me[n]=new we(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(Is,Ls);me[n]=new we(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){me[e]=new we(e,1,!1,e.toLowerCase(),null,!1,!1)});me.xlinkHref=new we("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){me[e]=new we(e,1,!1,e.toLowerCase(),null,!0,!0)});function Ms(e,n,r,a){var i=me.hasOwnProperty(n)?me[n]:null;(i!==null?i.type!==0:a||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(Jp(n,r,i,a)&&(r=null),a||i===null?Xp(n)&&(r===null?e.removeAttribute(n):e.setAttribute(n,""+r)):i.mustUseProperty?e[i.propertyName]=r===null?i.type===3?!1:"":r:(n=i.attributeName,a=i.attributeNamespace,r===null?e.removeAttribute(n):(i=i.type,r=i===3||i===4&&r===!0?"":""+r,a?e.setAttributeNS(a,n,r):e.setAttribute(n,r))))}var mn=Kp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,Tr=Symbol.for("react.element"),rt=Symbol.for("react.portal"),at=Symbol.for("react.fragment"),Fs=Symbol.for("react.strict_mode"),Mi=Symbol.for("react.profiler"),Cd=Symbol.for("react.provider"),Ed=Symbol.for("react.context"),Os=Symbol.for("react.forward_ref"),Fi=Symbol.for("react.suspense"),Oi=Symbol.for("react.suspense_list"),_s=Symbol.for("react.memo"),hn=Symbol.for("react.lazy"),Pd=Symbol.for("react.offscreen"),Ll=Symbol.iterator;function Lt(e){return e===null||typeof e!="object"?null:(e=Ll&&e[Ll]||e["@@iterator"],typeof e=="function"?e:null)}var Z=Object.assign,Ja;function Vt(e){if(Ja===void 0)try{throw Error()}catch(r){var n=r.stack.trim().match(/\n( *(at )?)/);Ja=n&&n[1]||""}return`
`+Ja+e}var ei=!1;function ni(e,n){if(!e||ei)return"";ei=!0;var r=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(p){var a=p}Reflect.construct(e,[],n)}else{try{n.call()}catch(p){a=p}e.call(n.prototype)}else{try{throw Error()}catch(p){a=p}e()}}catch(p){if(p&&a&&typeof p.stack=="string"){for(var i=p.stack.split(`
`),s=a.stack.split(`
`),l=i.length-1,o=s.length-1;1<=l&&0<=o&&i[l]!==s[o];)o--;for(;1<=l&&0<=o;l--,o--)if(i[l]!==s[o]){if(l!==1||o!==1)do if(l--,o--,0>o||i[l]!==s[o]){var d=`
`+i[l].replace(" at new "," at ");return e.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",e.displayName)),d}while(1<=l&&0<=o);break}}}finally{ei=!1,Error.prepareStackTrace=r}return(e=e?e.displayName||e.name:"")?Vt(e):""}function em(e){switch(e.tag){case 5:return Vt(e.type);case 16:return Vt("Lazy");case 13:return Vt("Suspense");case 19:return Vt("SuspenseList");case 0:case 2:case 15:return e=ni(e.type,!1),e;case 11:return e=ni(e.type.render,!1),e;case 1:return e=ni(e.type,!0),e;default:return""}}function _i(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case at:return"Fragment";case rt:return"Portal";case Mi:return"Profiler";case Fs:return"StrictMode";case Fi:return"Suspense";case Oi:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Ed:return(e.displayName||"Context")+".Consumer";case Cd:return(e._context.displayName||"Context")+".Provider";case Os:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case _s:return n=e.displayName||null,n!==null?n:_i(e.type)||"Memo";case hn:n=e._payload,e=e._init;try{return _i(e(n))}catch{}}return null}function nm(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return _i(n);case 8:return n===Fs?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function Dn(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Ad(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function tm(e){var n=Ad(e)?"checked":"value",r=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),a=""+e[n];if(!e.hasOwnProperty(n)&&typeof r<"u"&&typeof r.get=="function"&&typeof r.set=="function"){var i=r.get,s=r.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return i.call(this)},set:function(l){a=""+l,s.call(this,l)}}),Object.defineProperty(e,n,{enumerable:r.enumerable}),{getValue:function(){return a},setValue:function(l){a=""+l},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function Dr(e){e._valueTracker||(e._valueTracker=tm(e))}function Td(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var r=n.getValue(),a="";return e&&(a=Ad(e)?e.checked?"true":"false":e.value),e=a,e!==r?(n.setValue(e),!0):!1}function da(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Bi(e,n){var r=n.checked;return Z({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:r??e._wrapperState.initialChecked})}function Ml(e,n){var r=n.defaultValue==null?"":n.defaultValue,a=n.checked!=null?n.checked:n.defaultChecked;r=Dn(n.value!=null?n.value:r),e._wrapperState={initialChecked:a,initialValue:r,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function Dd(e,n){n=n.checked,n!=null&&Ms(e,"checked",n,!1)}function Ui(e,n){Dd(e,n);var r=Dn(n.value),a=n.type;if(r!=null)a==="number"?(r===0&&e.value===""||e.value!=r)&&(e.value=""+r):e.value!==""+r&&(e.value=""+r);else if(a==="submit"||a==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?$i(e,n.type,r):n.hasOwnProperty("defaultValue")&&$i(e,n.type,Dn(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function Fl(e,n,r){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var a=n.type;if(!(a!=="submit"&&a!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,r||n===e.value||(e.value=n),e.defaultValue=n}r=e.name,r!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,r!==""&&(e.name=r)}function $i(e,n,r){(n!=="number"||da(e.ownerDocument)!==e)&&(r==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+r&&(e.defaultValue=""+r))}var Wt=Array.isArray;function ht(e,n,r,a){if(e=e.options,n){n={};for(var i=0;i<r.length;i++)n["$"+r[i]]=!0;for(r=0;r<e.length;r++)i=n.hasOwnProperty("$"+e[r].value),e[r].selected!==i&&(e[r].selected=i),i&&a&&(e[r].defaultSelected=!0)}else{for(r=""+Dn(r),n=null,i=0;i<e.length;i++){if(e[i].value===r){e[i].selected=!0,a&&(e[i].defaultSelected=!0);return}n!==null||e[i].disabled||(n=e[i])}n!==null&&(n.selected=!0)}}function Vi(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(D(91));return Z({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Ol(e,n){var r=n.value;if(r==null){if(r=n.children,n=n.defaultValue,r!=null){if(n!=null)throw Error(D(92));if(Wt(r)){if(1<r.length)throw Error(D(93));r=r[0]}n=r}n==null&&(n=""),r=n}e._wrapperState={initialValue:Dn(r)}}function Rd(e,n){var r=Dn(n.value),a=Dn(n.defaultValue);r!=null&&(r=""+r,r!==e.value&&(e.value=r),n.defaultValue==null&&e.defaultValue!==r&&(e.defaultValue=r)),a!=null&&(e.defaultValue=""+a)}function _l(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function zd(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Wi(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?zd(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Rr,Id=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,r,a,i){MSApp.execUnsafeLocalFunction(function(){return e(n,r,a,i)})}:e}(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(Rr=Rr||document.createElement("div"),Rr.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=Rr.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function rr(e,n){if(n){var r=e.firstChild;if(r&&r===e.lastChild&&r.nodeType===3){r.nodeValue=n;return}}e.textContent=n}var Qt={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},rm=["Webkit","ms","Moz","O"];Object.keys(Qt).forEach(function(e){rm.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),Qt[n]=Qt[e]})});function Ld(e,n,r){return n==null||typeof n=="boolean"||n===""?"":r||typeof n!="number"||n===0||Qt.hasOwnProperty(e)&&Qt[e]?(""+n).trim():n+"px"}function Md(e,n){e=e.style;for(var r in n)if(n.hasOwnProperty(r)){var a=r.indexOf("--")===0,i=Ld(r,n[r],a);r==="float"&&(r="cssFloat"),a?e.setProperty(r,i):e[r]=i}}var am=Z({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function qi(e,n){if(n){if(am[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(D(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(D(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(D(61))}if(n.style!=null&&typeof n.style!="object")throw Error(D(62))}}function Hi(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Qi=null;function Bs(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Yi=null,gt=null,xt=null;function Bl(e){if(e=Nr(e)){if(typeof Yi!="function")throw Error(D(280));var n=e.stateNode;n&&(n=_a(n),Yi(e.stateNode,e.type,n))}}function Fd(e){gt?xt?xt.push(e):xt=[e]:gt=e}function Od(){if(gt){var e=gt,n=xt;if(xt=gt=null,Bl(e),n)for(e=0;e<n.length;e++)Bl(n[e])}}function _d(e,n){return e(n)}function Bd(){}var ti=!1;function Ud(e,n,r){if(ti)return e(n,r);ti=!0;try{return _d(e,n,r)}finally{ti=!1,(gt!==null||xt!==null)&&(Bd(),Od())}}function ar(e,n){var r=e.stateNode;if(r===null)return null;var a=_a(r);if(a===null)return null;r=a[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break e;default:e=!1}if(e)return null;if(r&&typeof r!="function")throw Error(D(231,n,typeof r));return r}var Ki=!1;if(dn)try{var Mt={};Object.defineProperty(Mt,"passive",{get:function(){Ki=!0}}),window.addEventListener("test",Mt,Mt),window.removeEventListener("test",Mt,Mt)}catch{Ki=!1}function im(e,n,r,a,i,s,l,o,d){var p=Array.prototype.slice.call(arguments,3);try{n.apply(r,p)}catch(m){this.onError(m)}}var Yt=!1,ca=null,ua=!1,Gi=null,sm={onError:function(e){Yt=!0,ca=e}};function lm(e,n,r,a,i,s,l,o,d){Yt=!1,ca=null,im.apply(sm,arguments)}function om(e,n,r,a,i,s,l,o,d){if(lm.apply(this,arguments),Yt){if(Yt){var p=ca;Yt=!1,ca=null}else throw Error(D(198));ua||(ua=!0,Gi=p)}}function et(e){var n=e,r=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,n.flags&4098&&(r=n.return),e=n.return;while(e)}return n.tag===3?r:null}function $d(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function Ul(e){if(et(e)!==e)throw Error(D(188))}function dm(e){var n=e.alternate;if(!n){if(n=et(e),n===null)throw Error(D(188));return n!==e?null:e}for(var r=e,a=n;;){var i=r.return;if(i===null)break;var s=i.alternate;if(s===null){if(a=i.return,a!==null){r=a;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===r)return Ul(i),e;if(s===a)return Ul(i),n;s=s.sibling}throw Error(D(188))}if(r.return!==a.return)r=i,a=s;else{for(var l=!1,o=i.child;o;){if(o===r){l=!0,r=i,a=s;break}if(o===a){l=!0,a=i,r=s;break}o=o.sibling}if(!l){for(o=s.child;o;){if(o===r){l=!0,r=s,a=i;break}if(o===a){l=!0,a=s,r=i;break}o=o.sibling}if(!l)throw Error(D(189))}}if(r.alternate!==a)throw Error(D(190))}if(r.tag!==3)throw Error(D(188));return r.stateNode.current===r?e:n}function Vd(e){return e=dm(e),e!==null?Wd(e):null}function Wd(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=Wd(e);if(n!==null)return n;e=e.sibling}return null}var qd=Re.unstable_scheduleCallback,$l=Re.unstable_cancelCallback,cm=Re.unstable_shouldYield,um=Re.unstable_requestPaint,te=Re.unstable_now,pm=Re.unstable_getCurrentPriorityLevel,Us=Re.unstable_ImmediatePriority,Hd=Re.unstable_UserBlockingPriority,pa=Re.unstable_NormalPriority,mm=Re.unstable_LowPriority,Qd=Re.unstable_IdlePriority,La=null,en=null;function fm(e){if(en&&typeof en.onCommitFiberRoot=="function")try{en.onCommitFiberRoot(La,e,void 0,(e.current.flags&128)===128)}catch{}}var Qe=Math.clz32?Math.clz32:xm,hm=Math.log,gm=Math.LN2;function xm(e){return e>>>=0,e===0?32:31-(hm(e)/gm|0)|0}var zr=64,Ir=4194304;function qt(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ma(e,n){var r=e.pendingLanes;if(r===0)return 0;var a=0,i=e.suspendedLanes,s=e.pingedLanes,l=r&268435455;if(l!==0){var o=l&~i;o!==0?a=qt(o):(s&=l,s!==0&&(a=qt(s)))}else l=r&~i,l!==0?a=qt(l):s!==0&&(a=qt(s));if(a===0)return 0;if(n!==0&&n!==a&&!(n&i)&&(i=a&-a,s=n&-n,i>=s||i===16&&(s&4194240)!==0))return n;if(a&4&&(a|=r&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=a;0<n;)r=31-Qe(n),i=1<<r,a|=e[r],n&=~i;return a}function vm(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ym(e,n){for(var r=e.suspendedLanes,a=e.pingedLanes,i=e.expirationTimes,s=e.pendingLanes;0<s;){var l=31-Qe(s),o=1<<l,d=i[l];d===-1?(!(o&r)||o&a)&&(i[l]=vm(o,n)):d<=n&&(e.expiredLanes|=o),s&=~o}}function Xi(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Yd(){var e=zr;return zr<<=1,!(zr&4194240)&&(zr=64),e}function ri(e){for(var n=[],r=0;31>r;r++)n.push(e);return n}function wr(e,n,r){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-Qe(n),e[n]=r}function bm(e,n){var r=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var a=e.eventTimes;for(e=e.expirationTimes;0<r;){var i=31-Qe(r),s=1<<i;n[i]=0,a[i]=-1,e[i]=-1,r&=~s}}function $s(e,n){var r=e.entangledLanes|=n;for(e=e.entanglements;r;){var a=31-Qe(r),i=1<<a;i&n|e[a]&n&&(e[a]|=n),r&=~i}}var W=0;function Kd(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Gd,Vs,Xd,Zd,Jd,Zi=!1,Lr=[],wn=null,kn=null,Nn=null,ir=new Map,sr=new Map,xn=[],jm="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Vl(e,n){switch(e){case"focusin":case"focusout":wn=null;break;case"dragenter":case"dragleave":kn=null;break;case"mouseover":case"mouseout":Nn=null;break;case"pointerover":case"pointerout":ir.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":sr.delete(n.pointerId)}}function Ft(e,n,r,a,i,s){return e===null||e.nativeEvent!==s?(e={blockedOn:n,domEventName:r,eventSystemFlags:a,nativeEvent:s,targetContainers:[i]},n!==null&&(n=Nr(n),n!==null&&Vs(n)),e):(e.eventSystemFlags|=a,n=e.targetContainers,i!==null&&n.indexOf(i)===-1&&n.push(i),e)}function wm(e,n,r,a,i){switch(n){case"focusin":return wn=Ft(wn,e,n,r,a,i),!0;case"dragenter":return kn=Ft(kn,e,n,r,a,i),!0;case"mouseover":return Nn=Ft(Nn,e,n,r,a,i),!0;case"pointerover":var s=i.pointerId;return ir.set(s,Ft(ir.get(s)||null,e,n,r,a,i)),!0;case"gotpointercapture":return s=i.pointerId,sr.set(s,Ft(sr.get(s)||null,e,n,r,a,i)),!0}return!1}function ec(e){var n=Vn(e.target);if(n!==null){var r=et(n);if(r!==null){if(n=r.tag,n===13){if(n=$d(r),n!==null){e.blockedOn=n,Jd(e.priority,function(){Xd(r)});return}}else if(n===3&&r.stateNode.current.memoizedState.isDehydrated){e.blockedOn=r.tag===3?r.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Gr(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var r=Ji(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(r===null){r=e.nativeEvent;var a=new r.constructor(r.type,r);Qi=a,r.target.dispatchEvent(a),Qi=null}else return n=Nr(r),n!==null&&Vs(n),e.blockedOn=r,!1;n.shift()}return!0}function Wl(e,n,r){Gr(e)&&r.delete(n)}function km(){Zi=!1,wn!==null&&Gr(wn)&&(wn=null),kn!==null&&Gr(kn)&&(kn=null),Nn!==null&&Gr(Nn)&&(Nn=null),ir.forEach(Wl),sr.forEach(Wl)}function Ot(e,n){e.blockedOn===n&&(e.blockedOn=null,Zi||(Zi=!0,Re.unstable_scheduleCallback(Re.unstable_NormalPriority,km)))}function lr(e){function n(i){return Ot(i,e)}if(0<Lr.length){Ot(Lr[0],e);for(var r=1;r<Lr.length;r++){var a=Lr[r];a.blockedOn===e&&(a.blockedOn=null)}}for(wn!==null&&Ot(wn,e),kn!==null&&Ot(kn,e),Nn!==null&&Ot(Nn,e),ir.forEach(n),sr.forEach(n),r=0;r<xn.length;r++)a=xn[r],a.blockedOn===e&&(a.blockedOn=null);for(;0<xn.length&&(r=xn[0],r.blockedOn===null);)ec(r),r.blockedOn===null&&xn.shift()}var vt=mn.ReactCurrentBatchConfig,fa=!0;function Nm(e,n,r,a){var i=W,s=vt.transition;vt.transition=null;try{W=1,Ws(e,n,r,a)}finally{W=i,vt.transition=s}}function Sm(e,n,r,a){var i=W,s=vt.transition;vt.transition=null;try{W=4,Ws(e,n,r,a)}finally{W=i,vt.transition=s}}function Ws(e,n,r,a){if(fa){var i=Ji(e,n,r,a);if(i===null)mi(e,n,a,ha,r),Vl(e,a);else if(wm(i,e,n,r,a))a.stopPropagation();else if(Vl(e,a),n&4&&-1<jm.indexOf(e)){for(;i!==null;){var s=Nr(i);if(s!==null&&Gd(s),s=Ji(e,n,r,a),s===null&&mi(e,n,a,ha,r),s===i)break;i=s}i!==null&&a.stopPropagation()}else mi(e,n,a,null,r)}}var ha=null;function Ji(e,n,r,a){if(ha=null,e=Bs(a),e=Vn(e),e!==null)if(n=et(e),n===null)e=null;else if(r=n.tag,r===13){if(e=$d(n),e!==null)return e;e=null}else if(r===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return ha=e,null}function nc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(pm()){case Us:return 1;case Hd:return 4;case pa:case mm:return 16;case Qd:return 536870912;default:return 16}default:return 16}}var yn=null,qs=null,Xr=null;function tc(){if(Xr)return Xr;var e,n=qs,r=n.length,a,i="value"in yn?yn.value:yn.textContent,s=i.length;for(e=0;e<r&&n[e]===i[e];e++);var l=r-e;for(a=1;a<=l&&n[r-a]===i[s-a];a++);return Xr=i.slice(e,1<a?1-a:void 0)}function Zr(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Mr(){return!0}function ql(){return!1}function Ie(e){function n(r,a,i,s,l){this._reactName=r,this._targetInst=i,this.type=a,this.nativeEvent=s,this.target=l,this.currentTarget=null;for(var o in e)e.hasOwnProperty(o)&&(r=e[o],this[o]=r?r(s):s[o]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Mr:ql,this.isPropagationStopped=ql,this}return Z(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var r=this.nativeEvent;r&&(r.preventDefault?r.preventDefault():typeof r.returnValue!="unknown"&&(r.returnValue=!1),this.isDefaultPrevented=Mr)},stopPropagation:function(){var r=this.nativeEvent;r&&(r.stopPropagation?r.stopPropagation():typeof r.cancelBubble!="unknown"&&(r.cancelBubble=!0),this.isPropagationStopped=Mr)},persist:function(){},isPersistent:Mr}),n}var At={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Hs=Ie(At),kr=Z({},At,{view:0,detail:0}),Cm=Ie(kr),ai,ii,_t,Ma=Z({},kr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Qs,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==_t&&(_t&&e.type==="mousemove"?(ai=e.screenX-_t.screenX,ii=e.screenY-_t.screenY):ii=ai=0,_t=e),ai)},movementY:function(e){return"movementY"in e?e.movementY:ii}}),Hl=Ie(Ma),Em=Z({},Ma,{dataTransfer:0}),Pm=Ie(Em),Am=Z({},kr,{relatedTarget:0}),si=Ie(Am),Tm=Z({},At,{animationName:0,elapsedTime:0,pseudoElement:0}),Dm=Ie(Tm),Rm=Z({},At,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),zm=Ie(Rm),Im=Z({},At,{data:0}),Ql=Ie(Im),Lm={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Mm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Fm={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function Om(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=Fm[e])?!!n[e]:!1}function Qs(){return Om}var _m=Z({},kr,{key:function(e){if(e.key){var n=Lm[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=Zr(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Mm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Qs,charCode:function(e){return e.type==="keypress"?Zr(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?Zr(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Bm=Ie(_m),Um=Z({},Ma,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Yl=Ie(Um),$m=Z({},kr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Qs}),Vm=Ie($m),Wm=Z({},At,{propertyName:0,elapsedTime:0,pseudoElement:0}),qm=Ie(Wm),Hm=Z({},Ma,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Qm=Ie(Hm),Ym=[9,13,27,32],Ys=dn&&"CompositionEvent"in window,Kt=null;dn&&"documentMode"in document&&(Kt=document.documentMode);var Km=dn&&"TextEvent"in window&&!Kt,rc=dn&&(!Ys||Kt&&8<Kt&&11>=Kt),Kl=" ",Gl=!1;function ac(e,n){switch(e){case"keyup":return Ym.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ic(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var it=!1;function Gm(e,n){switch(e){case"compositionend":return ic(n);case"keypress":return n.which!==32?null:(Gl=!0,Kl);case"textInput":return e=n.data,e===Kl&&Gl?null:e;default:return null}}function Xm(e,n){if(it)return e==="compositionend"||!Ys&&ac(e,n)?(e=tc(),Xr=qs=yn=null,it=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return rc&&n.locale!=="ko"?null:n.data;default:return null}}var Zm={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Xl(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!Zm[e.type]:n==="textarea"}function sc(e,n,r,a){Fd(a),n=ga(n,"onChange"),0<n.length&&(r=new Hs("onChange","change",null,r,a),e.push({event:r,listeners:n}))}var Gt=null,or=null;function Jm(e){xc(e,0)}function Fa(e){var n=ot(e);if(Td(n))return e}function ef(e,n){if(e==="change")return n}var lc=!1;if(dn){var li;if(dn){var oi="oninput"in document;if(!oi){var Zl=document.createElement("div");Zl.setAttribute("oninput","return;"),oi=typeof Zl.oninput=="function"}li=oi}else li=!1;lc=li&&(!document.documentMode||9<document.documentMode)}function Jl(){Gt&&(Gt.detachEvent("onpropertychange",oc),or=Gt=null)}function oc(e){if(e.propertyName==="value"&&Fa(or)){var n=[];sc(n,or,e,Bs(e)),Ud(Jm,n)}}function nf(e,n,r){e==="focusin"?(Jl(),Gt=n,or=r,Gt.attachEvent("onpropertychange",oc)):e==="focusout"&&Jl()}function tf(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Fa(or)}function rf(e,n){if(e==="click")return Fa(n)}function af(e,n){if(e==="input"||e==="change")return Fa(n)}function sf(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Ke=typeof Object.is=="function"?Object.is:sf;function dr(e,n){if(Ke(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var r=Object.keys(e),a=Object.keys(n);if(r.length!==a.length)return!1;for(a=0;a<r.length;a++){var i=r[a];if(!Li.call(n,i)||!Ke(e[i],n[i]))return!1}return!0}function eo(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function no(e,n){var r=eo(e);e=0;for(var a;r;){if(r.nodeType===3){if(a=e+r.textContent.length,e<=n&&a>=n)return{node:r,offset:n-e};e=a}e:{for(;r;){if(r.nextSibling){r=r.nextSibling;break e}r=r.parentNode}r=void 0}r=eo(r)}}function dc(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?dc(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function cc(){for(var e=window,n=da();n instanceof e.HTMLIFrameElement;){try{var r=typeof n.contentWindow.location.href=="string"}catch{r=!1}if(r)e=n.contentWindow;else break;n=da(e.document)}return n}function Ks(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function lf(e){var n=cc(),r=e.focusedElem,a=e.selectionRange;if(n!==r&&r&&r.ownerDocument&&dc(r.ownerDocument.documentElement,r)){if(a!==null&&Ks(r)){if(n=a.start,e=a.end,e===void 0&&(e=n),"selectionStart"in r)r.selectionStart=n,r.selectionEnd=Math.min(e,r.value.length);else if(e=(n=r.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var i=r.textContent.length,s=Math.min(a.start,i);a=a.end===void 0?s:Math.min(a.end,i),!e.extend&&s>a&&(i=a,a=s,s=i),i=no(r,s);var l=no(r,a);i&&l&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&(n=n.createRange(),n.setStart(i.node,i.offset),e.removeAllRanges(),s>a?(e.addRange(n),e.extend(l.node,l.offset)):(n.setEnd(l.node,l.offset),e.addRange(n)))}}for(n=[],e=r;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof r.focus=="function"&&r.focus(),r=0;r<n.length;r++)e=n[r],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var of=dn&&"documentMode"in document&&11>=document.documentMode,st=null,es=null,Xt=null,ns=!1;function to(e,n,r){var a=r.window===r?r.document:r.nodeType===9?r:r.ownerDocument;ns||st==null||st!==da(a)||(a=st,"selectionStart"in a&&Ks(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),Xt&&dr(Xt,a)||(Xt=a,a=ga(es,"onSelect"),0<a.length&&(n=new Hs("onSelect","select",null,n,r),e.push({event:n,listeners:a}),n.target=st)))}function Fr(e,n){var r={};return r[e.toLowerCase()]=n.toLowerCase(),r["Webkit"+e]="webkit"+n,r["Moz"+e]="moz"+n,r}var lt={animationend:Fr("Animation","AnimationEnd"),animationiteration:Fr("Animation","AnimationIteration"),animationstart:Fr("Animation","AnimationStart"),transitionend:Fr("Transition","TransitionEnd")},di={},uc={};dn&&(uc=document.createElement("div").style,"AnimationEvent"in window||(delete lt.animationend.animation,delete lt.animationiteration.animation,delete lt.animationstart.animation),"TransitionEvent"in window||delete lt.transitionend.transition);function Oa(e){if(di[e])return di[e];if(!lt[e])return e;var n=lt[e],r;for(r in n)if(n.hasOwnProperty(r)&&r in uc)return di[e]=n[r];return e}var pc=Oa("animationend"),mc=Oa("animationiteration"),fc=Oa("animationstart"),hc=Oa("transitionend"),gc=new Map,ro="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function zn(e,n){gc.set(e,n),Jn(n,[e])}for(var ci=0;ci<ro.length;ci++){var ui=ro[ci],df=ui.toLowerCase(),cf=ui[0].toUpperCase()+ui.slice(1);zn(df,"on"+cf)}zn(pc,"onAnimationEnd");zn(mc,"onAnimationIteration");zn(fc,"onAnimationStart");zn("dblclick","onDoubleClick");zn("focusin","onFocus");zn("focusout","onBlur");zn(hc,"onTransitionEnd");jt("onMouseEnter",["mouseout","mouseover"]);jt("onMouseLeave",["mouseout","mouseover"]);jt("onPointerEnter",["pointerout","pointerover"]);jt("onPointerLeave",["pointerout","pointerover"]);Jn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Jn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Jn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Jn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Jn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Jn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Ht="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),uf=new Set("cancel close invalid load scroll toggle".split(" ").concat(Ht));function ao(e,n,r){var a=e.type||"unknown-event";e.currentTarget=r,om(a,n,void 0,e),e.currentTarget=null}function xc(e,n){n=(n&4)!==0;for(var r=0;r<e.length;r++){var a=e[r],i=a.event;a=a.listeners;e:{var s=void 0;if(n)for(var l=a.length-1;0<=l;l--){var o=a[l],d=o.instance,p=o.currentTarget;if(o=o.listener,d!==s&&i.isPropagationStopped())break e;ao(i,o,p),s=d}else for(l=0;l<a.length;l++){if(o=a[l],d=o.instance,p=o.currentTarget,o=o.listener,d!==s&&i.isPropagationStopped())break e;ao(i,o,p),s=d}}}if(ua)throw e=Gi,ua=!1,Gi=null,e}function Q(e,n){var r=n[ss];r===void 0&&(r=n[ss]=new Set);var a=e+"__bubble";r.has(a)||(vc(n,e,2,!1),r.add(a))}function pi(e,n,r){var a=0;n&&(a|=4),vc(r,e,a,n)}var Or="_reactListening"+Math.random().toString(36).slice(2);function cr(e){if(!e[Or]){e[Or]=!0,Sd.forEach(function(r){r!=="selectionchange"&&(uf.has(r)||pi(r,!1,e),pi(r,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[Or]||(n[Or]=!0,pi("selectionchange",!1,n))}}function vc(e,n,r,a){switch(nc(n)){case 1:var i=Nm;break;case 4:i=Sm;break;default:i=Ws}r=i.bind(null,n,r,e),i=void 0,!Ki||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(i=!0),a?i!==void 0?e.addEventListener(n,r,{capture:!0,passive:i}):e.addEventListener(n,r,!0):i!==void 0?e.addEventListener(n,r,{passive:i}):e.addEventListener(n,r,!1)}function mi(e,n,r,a,i){var s=a;if(!(n&1)&&!(n&2)&&a!==null)e:for(;;){if(a===null)return;var l=a.tag;if(l===3||l===4){var o=a.stateNode.containerInfo;if(o===i||o.nodeType===8&&o.parentNode===i)break;if(l===4)for(l=a.return;l!==null;){var d=l.tag;if((d===3||d===4)&&(d=l.stateNode.containerInfo,d===i||d.nodeType===8&&d.parentNode===i))return;l=l.return}for(;o!==null;){if(l=Vn(o),l===null)return;if(d=l.tag,d===5||d===6){a=s=l;continue e}o=o.parentNode}}a=a.return}Ud(function(){var p=s,m=Bs(r),g=[];e:{var u=gc.get(e);if(u!==void 0){var y=Hs,N=e;switch(e){case"keypress":if(Zr(r)===0)break e;case"keydown":case"keyup":y=Bm;break;case"focusin":N="focus",y=si;break;case"focusout":N="blur",y=si;break;case"beforeblur":case"afterblur":y=si;break;case"click":if(r.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=Hl;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=Pm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=Vm;break;case pc:case mc:case fc:y=Dm;break;case hc:y=qm;break;case"scroll":y=Cm;break;case"wheel":y=Qm;break;case"copy":case"cut":case"paste":y=zm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=Yl}var k=(n&4)!==0,b=!k&&e==="scroll",h=k?u!==null?u+"Capture":null:u;k=[];for(var f=p,v;f!==null;){v=f;var E=v.stateNode;if(v.tag===5&&E!==null&&(v=E,h!==null&&(E=ar(f,h),E!=null&&k.push(ur(f,E,v)))),b)break;f=f.return}0<k.length&&(u=new y(u,N,null,r,m),g.push({event:u,listeners:k}))}}if(!(n&7)){e:{if(u=e==="mouseover"||e==="pointerover",y=e==="mouseout"||e==="pointerout",u&&r!==Qi&&(N=r.relatedTarget||r.fromElement)&&(Vn(N)||N[cn]))break e;if((y||u)&&(u=m.window===m?m:(u=m.ownerDocument)?u.defaultView||u.parentWindow:window,y?(N=r.relatedTarget||r.toElement,y=p,N=N?Vn(N):null,N!==null&&(b=et(N),N!==b||N.tag!==5&&N.tag!==6)&&(N=null)):(y=null,N=p),y!==N)){if(k=Hl,E="onMouseLeave",h="onMouseEnter",f="mouse",(e==="pointerout"||e==="pointerover")&&(k=Yl,E="onPointerLeave",h="onPointerEnter",f="pointer"),b=y==null?u:ot(y),v=N==null?u:ot(N),u=new k(E,f+"leave",y,r,m),u.target=b,u.relatedTarget=v,E=null,Vn(m)===p&&(k=new k(h,f+"enter",N,r,m),k.target=v,k.relatedTarget=b,E=k),b=E,y&&N)n:{for(k=y,h=N,f=0,v=k;v;v=tt(v))f++;for(v=0,E=h;E;E=tt(E))v++;for(;0<f-v;)k=tt(k),f--;for(;0<v-f;)h=tt(h),v--;for(;f--;){if(k===h||h!==null&&k===h.alternate)break n;k=tt(k),h=tt(h)}k=null}else k=null;y!==null&&io(g,u,y,k,!1),N!==null&&b!==null&&io(g,b,N,k,!0)}}e:{if(u=p?ot(p):window,y=u.nodeName&&u.nodeName.toLowerCase(),y==="select"||y==="input"&&u.type==="file")var j=ef;else if(Xl(u))if(lc)j=af;else{j=tf;var x=nf}else(y=u.nodeName)&&y.toLowerCase()==="input"&&(u.type==="checkbox"||u.type==="radio")&&(j=rf);if(j&&(j=j(e,p))){sc(g,j,r,m);break e}x&&x(e,u,p),e==="focusout"&&(x=u._wrapperState)&&x.controlled&&u.type==="number"&&$i(u,"number",u.value)}switch(x=p?ot(p):window,e){case"focusin":(Xl(x)||x.contentEditable==="true")&&(st=x,es=p,Xt=null);break;case"focusout":Xt=es=st=null;break;case"mousedown":ns=!0;break;case"contextmenu":case"mouseup":case"dragend":ns=!1,to(g,r,m);break;case"selectionchange":if(of)break;case"keydown":case"keyup":to(g,r,m)}var T;if(Ys)e:{switch(e){case"compositionstart":var R="onCompositionStart";break e;case"compositionend":R="onCompositionEnd";break e;case"compositionupdate":R="onCompositionUpdate";break e}R=void 0}else it?ac(e,r)&&(R="onCompositionEnd"):e==="keydown"&&r.keyCode===229&&(R="onCompositionStart");R&&(rc&&r.locale!=="ko"&&(it||R!=="onCompositionStart"?R==="onCompositionEnd"&&it&&(T=tc()):(yn=m,qs="value"in yn?yn.value:yn.textContent,it=!0)),x=ga(p,R),0<x.length&&(R=new Ql(R,e,null,r,m),g.push({event:R,listeners:x}),T?R.data=T:(T=ic(r),T!==null&&(R.data=T)))),(T=Km?Gm(e,r):Xm(e,r))&&(p=ga(p,"onBeforeInput"),0<p.length&&(m=new Ql("onBeforeInput","beforeinput",null,r,m),g.push({event:m,listeners:p}),m.data=T))}xc(g,n)})}function ur(e,n,r){return{instance:e,listener:n,currentTarget:r}}function ga(e,n){for(var r=n+"Capture",a=[];e!==null;){var i=e,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=ar(e,r),s!=null&&a.unshift(ur(e,s,i)),s=ar(e,n),s!=null&&a.push(ur(e,s,i))),e=e.return}return a}function tt(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function io(e,n,r,a,i){for(var s=n._reactName,l=[];r!==null&&r!==a;){var o=r,d=o.alternate,p=o.stateNode;if(d!==null&&d===a)break;o.tag===5&&p!==null&&(o=p,i?(d=ar(r,s),d!=null&&l.unshift(ur(r,d,o))):i||(d=ar(r,s),d!=null&&l.push(ur(r,d,o)))),r=r.return}l.length!==0&&e.push({event:n,listeners:l})}var pf=/\r\n?/g,mf=/\u0000|\uFFFD/g;function so(e){return(typeof e=="string"?e:""+e).replace(pf,`
`).replace(mf,"")}function _r(e,n,r){if(n=so(n),so(e)!==n&&r)throw Error(D(425))}function xa(){}var ts=null,rs=null;function as(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var is=typeof setTimeout=="function"?setTimeout:void 0,ff=typeof clearTimeout=="function"?clearTimeout:void 0,lo=typeof Promise=="function"?Promise:void 0,hf=typeof queueMicrotask=="function"?queueMicrotask:typeof lo<"u"?function(e){return lo.resolve(null).then(e).catch(gf)}:is;function gf(e){setTimeout(function(){throw e})}function fi(e,n){var r=n,a=0;do{var i=r.nextSibling;if(e.removeChild(r),i&&i.nodeType===8)if(r=i.data,r==="/$"){if(a===0){e.removeChild(i),lr(n);return}a--}else r!=="$"&&r!=="$?"&&r!=="$!"||a++;r=i}while(r);lr(n)}function Sn(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function oo(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var r=e.data;if(r==="$"||r==="$!"||r==="$?"){if(n===0)return e;n--}else r==="/$"&&n++}e=e.previousSibling}return null}var Tt=Math.random().toString(36).slice(2),Je="__reactFiber$"+Tt,pr="__reactProps$"+Tt,cn="__reactContainer$"+Tt,ss="__reactEvents$"+Tt,xf="__reactListeners$"+Tt,vf="__reactHandles$"+Tt;function Vn(e){var n=e[Je];if(n)return n;for(var r=e.parentNode;r;){if(n=r[cn]||r[Je]){if(r=n.alternate,n.child!==null||r!==null&&r.child!==null)for(e=oo(e);e!==null;){if(r=e[Je])return r;e=oo(e)}return n}e=r,r=e.parentNode}return null}function Nr(e){return e=e[Je]||e[cn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function ot(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(D(33))}function _a(e){return e[pr]||null}var ls=[],dt=-1;function In(e){return{current:e}}function Y(e){0>dt||(e.current=ls[dt],ls[dt]=null,dt--)}function q(e,n){dt++,ls[dt]=e.current,e.current=n}var Rn={},ve=In(Rn),Ce=In(!1),Yn=Rn;function wt(e,n){var r=e.type.contextTypes;if(!r)return Rn;var a=e.stateNode;if(a&&a.__reactInternalMemoizedUnmaskedChildContext===n)return a.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in r)i[s]=n[s];return a&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=i),i}function Ee(e){return e=e.childContextTypes,e!=null}function va(){Y(Ce),Y(ve)}function co(e,n,r){if(ve.current!==Rn)throw Error(D(168));q(ve,n),q(Ce,r)}function yc(e,n,r){var a=e.stateNode;if(n=n.childContextTypes,typeof a.getChildContext!="function")return r;a=a.getChildContext();for(var i in a)if(!(i in n))throw Error(D(108,nm(e)||"Unknown",i));return Z({},r,a)}function ya(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Rn,Yn=ve.current,q(ve,e),q(Ce,Ce.current),!0}function uo(e,n,r){var a=e.stateNode;if(!a)throw Error(D(169));r?(e=yc(e,n,Yn),a.__reactInternalMemoizedMergedChildContext=e,Y(Ce),Y(ve),q(ve,e)):Y(Ce),q(Ce,r)}var an=null,Ba=!1,hi=!1;function bc(e){an===null?an=[e]:an.push(e)}function yf(e){Ba=!0,bc(e)}function Ln(){if(!hi&&an!==null){hi=!0;var e=0,n=W;try{var r=an;for(W=1;e<r.length;e++){var a=r[e];do a=a(!0);while(a!==null)}an=null,Ba=!1}catch(i){throw an!==null&&(an=an.slice(e+1)),qd(Us,Ln),i}finally{W=n,hi=!1}}return null}var ct=[],ut=0,ba=null,ja=0,Fe=[],Oe=0,Kn=null,sn=1,ln="";function Bn(e,n){ct[ut++]=ja,ct[ut++]=ba,ba=e,ja=n}function jc(e,n,r){Fe[Oe++]=sn,Fe[Oe++]=ln,Fe[Oe++]=Kn,Kn=e;var a=sn;e=ln;var i=32-Qe(a)-1;a&=~(1<<i),r+=1;var s=32-Qe(n)+i;if(30<s){var l=i-i%5;s=(a&(1<<l)-1).toString(32),a>>=l,i-=l,sn=1<<32-Qe(n)+i|r<<i|a,ln=s+e}else sn=1<<s|r<<i|a,ln=e}function Gs(e){e.return!==null&&(Bn(e,1),jc(e,1,0))}function Xs(e){for(;e===ba;)ba=ct[--ut],ct[ut]=null,ja=ct[--ut],ct[ut]=null;for(;e===Kn;)Kn=Fe[--Oe],Fe[Oe]=null,ln=Fe[--Oe],Fe[Oe]=null,sn=Fe[--Oe],Fe[Oe]=null}var De=null,Te=null,K=!1,He=null;function wc(e,n){var r=_e(5,null,null,0);r.elementType="DELETED",r.stateNode=n,r.return=e,n=e.deletions,n===null?(e.deletions=[r],e.flags|=16):n.push(r)}function po(e,n){switch(e.tag){case 5:var r=e.type;return n=n.nodeType!==1||r.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,De=e,Te=Sn(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,De=e,Te=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(r=Kn!==null?{id:sn,overflow:ln}:null,e.memoizedState={dehydrated:n,treeContext:r,retryLane:1073741824},r=_e(18,null,null,0),r.stateNode=n,r.return=e,e.child=r,De=e,Te=null,!0):!1;default:return!1}}function os(e){return(e.mode&1)!==0&&(e.flags&128)===0}function ds(e){if(K){var n=Te;if(n){var r=n;if(!po(e,n)){if(os(e))throw Error(D(418));n=Sn(r.nextSibling);var a=De;n&&po(e,n)?wc(a,r):(e.flags=e.flags&-4097|2,K=!1,De=e)}}else{if(os(e))throw Error(D(418));e.flags=e.flags&-4097|2,K=!1,De=e}}}function mo(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;De=e}function Br(e){if(e!==De)return!1;if(!K)return mo(e),K=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!as(e.type,e.memoizedProps)),n&&(n=Te)){if(os(e))throw kc(),Error(D(418));for(;n;)wc(e,n),n=Sn(n.nextSibling)}if(mo(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(D(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var r=e.data;if(r==="/$"){if(n===0){Te=Sn(e.nextSibling);break e}n--}else r!=="$"&&r!=="$!"&&r!=="$?"||n++}e=e.nextSibling}Te=null}}else Te=De?Sn(e.stateNode.nextSibling):null;return!0}function kc(){for(var e=Te;e;)e=Sn(e.nextSibling)}function kt(){Te=De=null,K=!1}function Zs(e){He===null?He=[e]:He.push(e)}var bf=mn.ReactCurrentBatchConfig;function Bt(e,n,r){if(e=r.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(r._owner){if(r=r._owner,r){if(r.tag!==1)throw Error(D(309));var a=r.stateNode}if(!a)throw Error(D(147,e));var i=a,s=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===s?n.ref:(n=function(l){var o=i.refs;l===null?delete o[s]:o[s]=l},n._stringRef=s,n)}if(typeof e!="string")throw Error(D(284));if(!r._owner)throw Error(D(290,e))}return e}function Ur(e,n){throw e=Object.prototype.toString.call(n),Error(D(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function fo(e){var n=e._init;return n(e._payload)}function Nc(e){function n(h,f){if(e){var v=h.deletions;v===null?(h.deletions=[f],h.flags|=16):v.push(f)}}function r(h,f){if(!e)return null;for(;f!==null;)n(h,f),f=f.sibling;return null}function a(h,f){for(h=new Map;f!==null;)f.key!==null?h.set(f.key,f):h.set(f.index,f),f=f.sibling;return h}function i(h,f){return h=An(h,f),h.index=0,h.sibling=null,h}function s(h,f,v){return h.index=v,e?(v=h.alternate,v!==null?(v=v.index,v<f?(h.flags|=2,f):v):(h.flags|=2,f)):(h.flags|=1048576,f)}function l(h){return e&&h.alternate===null&&(h.flags|=2),h}function o(h,f,v,E){return f===null||f.tag!==6?(f=wi(v,h.mode,E),f.return=h,f):(f=i(f,v),f.return=h,f)}function d(h,f,v,E){var j=v.type;return j===at?m(h,f,v.props.children,E,v.key):f!==null&&(f.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===hn&&fo(j)===f.type)?(E=i(f,v.props),E.ref=Bt(h,f,v),E.return=h,E):(E=ia(v.type,v.key,v.props,null,h.mode,E),E.ref=Bt(h,f,v),E.return=h,E)}function p(h,f,v,E){return f===null||f.tag!==4||f.stateNode.containerInfo!==v.containerInfo||f.stateNode.implementation!==v.implementation?(f=ki(v,h.mode,E),f.return=h,f):(f=i(f,v.children||[]),f.return=h,f)}function m(h,f,v,E,j){return f===null||f.tag!==7?(f=Qn(v,h.mode,E,j),f.return=h,f):(f=i(f,v),f.return=h,f)}function g(h,f,v){if(typeof f=="string"&&f!==""||typeof f=="number")return f=wi(""+f,h.mode,v),f.return=h,f;if(typeof f=="object"&&f!==null){switch(f.$$typeof){case Tr:return v=ia(f.type,f.key,f.props,null,h.mode,v),v.ref=Bt(h,null,f),v.return=h,v;case rt:return f=ki(f,h.mode,v),f.return=h,f;case hn:var E=f._init;return g(h,E(f._payload),v)}if(Wt(f)||Lt(f))return f=Qn(f,h.mode,v,null),f.return=h,f;Ur(h,f)}return null}function u(h,f,v,E){var j=f!==null?f.key:null;if(typeof v=="string"&&v!==""||typeof v=="number")return j!==null?null:o(h,f,""+v,E);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case Tr:return v.key===j?d(h,f,v,E):null;case rt:return v.key===j?p(h,f,v,E):null;case hn:return j=v._init,u(h,f,j(v._payload),E)}if(Wt(v)||Lt(v))return j!==null?null:m(h,f,v,E,null);Ur(h,v)}return null}function y(h,f,v,E,j){if(typeof E=="string"&&E!==""||typeof E=="number")return h=h.get(v)||null,o(f,h,""+E,j);if(typeof E=="object"&&E!==null){switch(E.$$typeof){case Tr:return h=h.get(E.key===null?v:E.key)||null,d(f,h,E,j);case rt:return h=h.get(E.key===null?v:E.key)||null,p(f,h,E,j);case hn:var x=E._init;return y(h,f,v,x(E._payload),j)}if(Wt(E)||Lt(E))return h=h.get(v)||null,m(f,h,E,j,null);Ur(f,E)}return null}function N(h,f,v,E){for(var j=null,x=null,T=f,R=f=0,w=null;T!==null&&R<v.length;R++){T.index>R?(w=T,T=null):w=T.sibling;var C=u(h,T,v[R],E);if(C===null){T===null&&(T=w);break}e&&T&&C.alternate===null&&n(h,T),f=s(C,f,R),x===null?j=C:x.sibling=C,x=C,T=w}if(R===v.length)return r(h,T),K&&Bn(h,R),j;if(T===null){for(;R<v.length;R++)T=g(h,v[R],E),T!==null&&(f=s(T,f,R),x===null?j=T:x.sibling=T,x=T);return K&&Bn(h,R),j}for(T=a(h,T);R<v.length;R++)w=y(T,h,R,v[R],E),w!==null&&(e&&w.alternate!==null&&T.delete(w.key===null?R:w.key),f=s(w,f,R),x===null?j=w:x.sibling=w,x=w);return e&&T.forEach(function(F){return n(h,F)}),K&&Bn(h,R),j}function k(h,f,v,E){var j=Lt(v);if(typeof j!="function")throw Error(D(150));if(v=j.call(v),v==null)throw Error(D(151));for(var x=j=null,T=f,R=f=0,w=null,C=v.next();T!==null&&!C.done;R++,C=v.next()){T.index>R?(w=T,T=null):w=T.sibling;var F=u(h,T,C.value,E);if(F===null){T===null&&(T=w);break}e&&T&&F.alternate===null&&n(h,T),f=s(F,f,R),x===null?j=F:x.sibling=F,x=F,T=w}if(C.done)return r(h,T),K&&Bn(h,R),j;if(T===null){for(;!C.done;R++,C=v.next())C=g(h,C.value,E),C!==null&&(f=s(C,f,R),x===null?j=C:x.sibling=C,x=C);return K&&Bn(h,R),j}for(T=a(h,T);!C.done;R++,C=v.next())C=y(T,h,R,C.value,E),C!==null&&(e&&C.alternate!==null&&T.delete(C.key===null?R:C.key),f=s(C,f,R),x===null?j=C:x.sibling=C,x=C);return e&&T.forEach(function(M){return n(h,M)}),K&&Bn(h,R),j}function b(h,f,v,E){if(typeof v=="object"&&v!==null&&v.type===at&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case Tr:e:{for(var j=v.key,x=f;x!==null;){if(x.key===j){if(j=v.type,j===at){if(x.tag===7){r(h,x.sibling),f=i(x,v.props.children),f.return=h,h=f;break e}}else if(x.elementType===j||typeof j=="object"&&j!==null&&j.$$typeof===hn&&fo(j)===x.type){r(h,x.sibling),f=i(x,v.props),f.ref=Bt(h,x,v),f.return=h,h=f;break e}r(h,x);break}else n(h,x);x=x.sibling}v.type===at?(f=Qn(v.props.children,h.mode,E,v.key),f.return=h,h=f):(E=ia(v.type,v.key,v.props,null,h.mode,E),E.ref=Bt(h,f,v),E.return=h,h=E)}return l(h);case rt:e:{for(x=v.key;f!==null;){if(f.key===x)if(f.tag===4&&f.stateNode.containerInfo===v.containerInfo&&f.stateNode.implementation===v.implementation){r(h,f.sibling),f=i(f,v.children||[]),f.return=h,h=f;break e}else{r(h,f);break}else n(h,f);f=f.sibling}f=ki(v,h.mode,E),f.return=h,h=f}return l(h);case hn:return x=v._init,b(h,f,x(v._payload),E)}if(Wt(v))return N(h,f,v,E);if(Lt(v))return k(h,f,v,E);Ur(h,v)}return typeof v=="string"&&v!==""||typeof v=="number"?(v=""+v,f!==null&&f.tag===6?(r(h,f.sibling),f=i(f,v),f.return=h,h=f):(r(h,f),f=wi(v,h.mode,E),f.return=h,h=f),l(h)):r(h,f)}return b}var Nt=Nc(!0),Sc=Nc(!1),wa=In(null),ka=null,pt=null,Js=null;function el(){Js=pt=ka=null}function nl(e){var n=wa.current;Y(wa),e._currentValue=n}function cs(e,n,r){for(;e!==null;){var a=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,a!==null&&(a.childLanes|=n)):a!==null&&(a.childLanes&n)!==n&&(a.childLanes|=n),e===r)break;e=e.return}}function yt(e,n){ka=e,Js=pt=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&n&&(Se=!0),e.firstContext=null)}function Ue(e){var n=e._currentValue;if(Js!==e)if(e={context:e,memoizedValue:n,next:null},pt===null){if(ka===null)throw Error(D(308));pt=e,ka.dependencies={lanes:0,firstContext:e}}else pt=pt.next=e;return n}var Wn=null;function tl(e){Wn===null?Wn=[e]:Wn.push(e)}function Cc(e,n,r,a){var i=n.interleaved;return i===null?(r.next=r,tl(n)):(r.next=i.next,i.next=r),n.interleaved=r,un(e,a)}function un(e,n){e.lanes|=n;var r=e.alternate;for(r!==null&&(r.lanes|=n),r=e,e=e.return;e!==null;)e.childLanes|=n,r=e.alternate,r!==null&&(r.childLanes|=n),r=e,e=e.return;return r.tag===3?r.stateNode:null}var gn=!1;function rl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Ec(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function on(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function Cn(e,n,r){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,V&2){var i=a.pending;return i===null?n.next=n:(n.next=i.next,i.next=n),a.pending=n,un(e,r)}return i=a.interleaved,i===null?(n.next=n,tl(a)):(n.next=i.next,i.next=n),a.interleaved=n,un(e,r)}function Jr(e,n,r){if(n=n.updateQueue,n!==null&&(n=n.shared,(r&4194240)!==0)){var a=n.lanes;a&=e.pendingLanes,r|=a,n.lanes=r,$s(e,r)}}function ho(e,n){var r=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,r===a)){var i=null,s=null;if(r=r.firstBaseUpdate,r!==null){do{var l={eventTime:r.eventTime,lane:r.lane,tag:r.tag,payload:r.payload,callback:r.callback,next:null};s===null?i=s=l:s=s.next=l,r=r.next}while(r!==null);s===null?i=s=n:s=s.next=n}else i=s=n;r={baseState:a.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:a.shared,effects:a.effects},e.updateQueue=r;return}e=r.lastBaseUpdate,e===null?r.firstBaseUpdate=n:e.next=n,r.lastBaseUpdate=n}function Na(e,n,r,a){var i=e.updateQueue;gn=!1;var s=i.firstBaseUpdate,l=i.lastBaseUpdate,o=i.shared.pending;if(o!==null){i.shared.pending=null;var d=o,p=d.next;d.next=null,l===null?s=p:l.next=p,l=d;var m=e.alternate;m!==null&&(m=m.updateQueue,o=m.lastBaseUpdate,o!==l&&(o===null?m.firstBaseUpdate=p:o.next=p,m.lastBaseUpdate=d))}if(s!==null){var g=i.baseState;l=0,m=p=d=null,o=s;do{var u=o.lane,y=o.eventTime;if((a&u)===u){m!==null&&(m=m.next={eventTime:y,lane:0,tag:o.tag,payload:o.payload,callback:o.callback,next:null});e:{var N=e,k=o;switch(u=n,y=r,k.tag){case 1:if(N=k.payload,typeof N=="function"){g=N.call(y,g,u);break e}g=N;break e;case 3:N.flags=N.flags&-65537|128;case 0:if(N=k.payload,u=typeof N=="function"?N.call(y,g,u):N,u==null)break e;g=Z({},g,u);break e;case 2:gn=!0}}o.callback!==null&&o.lane!==0&&(e.flags|=64,u=i.effects,u===null?i.effects=[o]:u.push(o))}else y={eventTime:y,lane:u,tag:o.tag,payload:o.payload,callback:o.callback,next:null},m===null?(p=m=y,d=g):m=m.next=y,l|=u;if(o=o.next,o===null){if(o=i.shared.pending,o===null)break;u=o,o=u.next,u.next=null,i.lastBaseUpdate=u,i.shared.pending=null}}while(!0);if(m===null&&(d=g),i.baseState=d,i.firstBaseUpdate=p,i.lastBaseUpdate=m,n=i.shared.interleaved,n!==null){i=n;do l|=i.lane,i=i.next;while(i!==n)}else s===null&&(i.shared.lanes=0);Xn|=l,e.lanes=l,e.memoizedState=g}}function go(e,n,r){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var a=e[n],i=a.callback;if(i!==null){if(a.callback=null,a=r,typeof i!="function")throw Error(D(191,i));i.call(a)}}}var Sr={},nn=In(Sr),mr=In(Sr),fr=In(Sr);function qn(e){if(e===Sr)throw Error(D(174));return e}function al(e,n){switch(q(fr,n),q(mr,e),q(nn,Sr),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:Wi(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=Wi(n,e)}Y(nn),q(nn,n)}function St(){Y(nn),Y(mr),Y(fr)}function Pc(e){qn(fr.current);var n=qn(nn.current),r=Wi(n,e.type);n!==r&&(q(mr,e),q(nn,r))}function il(e){mr.current===e&&(Y(nn),Y(mr))}var G=In(0);function Sa(e){for(var n=e;n!==null;){if(n.tag===13){var r=n.memoizedState;if(r!==null&&(r=r.dehydrated,r===null||r.data==="$?"||r.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if(n.flags&128)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var gi=[];function sl(){for(var e=0;e<gi.length;e++)gi[e]._workInProgressVersionPrimary=null;gi.length=0}var ea=mn.ReactCurrentDispatcher,xi=mn.ReactCurrentBatchConfig,Gn=0,X=null,le=null,de=null,Ca=!1,Zt=!1,hr=0,jf=0;function he(){throw Error(D(321))}function ll(e,n){if(n===null)return!1;for(var r=0;r<n.length&&r<e.length;r++)if(!Ke(e[r],n[r]))return!1;return!0}function ol(e,n,r,a,i,s){if(Gn=s,X=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,ea.current=e===null||e.memoizedState===null?Sf:Cf,e=r(a,i),Zt){s=0;do{if(Zt=!1,hr=0,25<=s)throw Error(D(301));s+=1,de=le=null,n.updateQueue=null,ea.current=Ef,e=r(a,i)}while(Zt)}if(ea.current=Ea,n=le!==null&&le.next!==null,Gn=0,de=le=X=null,Ca=!1,n)throw Error(D(300));return e}function dl(){var e=hr!==0;return hr=0,e}function Ze(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return de===null?X.memoizedState=de=e:de=de.next=e,de}function $e(){if(le===null){var e=X.alternate;e=e!==null?e.memoizedState:null}else e=le.next;var n=de===null?X.memoizedState:de.next;if(n!==null)de=n,le=e;else{if(e===null)throw Error(D(310));le=e,e={memoizedState:le.memoizedState,baseState:le.baseState,baseQueue:le.baseQueue,queue:le.queue,next:null},de===null?X.memoizedState=de=e:de=de.next=e}return de}function gr(e,n){return typeof n=="function"?n(e):n}function vi(e){var n=$e(),r=n.queue;if(r===null)throw Error(D(311));r.lastRenderedReducer=e;var a=le,i=a.baseQueue,s=r.pending;if(s!==null){if(i!==null){var l=i.next;i.next=s.next,s.next=l}a.baseQueue=i=s,r.pending=null}if(i!==null){s=i.next,a=a.baseState;var o=l=null,d=null,p=s;do{var m=p.lane;if((Gn&m)===m)d!==null&&(d=d.next={lane:0,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null}),a=p.hasEagerState?p.eagerState:e(a,p.action);else{var g={lane:m,action:p.action,hasEagerState:p.hasEagerState,eagerState:p.eagerState,next:null};d===null?(o=d=g,l=a):d=d.next=g,X.lanes|=m,Xn|=m}p=p.next}while(p!==null&&p!==s);d===null?l=a:d.next=o,Ke(a,n.memoizedState)||(Se=!0),n.memoizedState=a,n.baseState=l,n.baseQueue=d,r.lastRenderedState=a}if(e=r.interleaved,e!==null){i=e;do s=i.lane,X.lanes|=s,Xn|=s,i=i.next;while(i!==e)}else i===null&&(r.lanes=0);return[n.memoizedState,r.dispatch]}function yi(e){var n=$e(),r=n.queue;if(r===null)throw Error(D(311));r.lastRenderedReducer=e;var a=r.dispatch,i=r.pending,s=n.memoizedState;if(i!==null){r.pending=null;var l=i=i.next;do s=e(s,l.action),l=l.next;while(l!==i);Ke(s,n.memoizedState)||(Se=!0),n.memoizedState=s,n.baseQueue===null&&(n.baseState=s),r.lastRenderedState=s}return[s,a]}function Ac(){}function Tc(e,n){var r=X,a=$e(),i=n(),s=!Ke(a.memoizedState,i);if(s&&(a.memoizedState=i,Se=!0),a=a.queue,cl(zc.bind(null,r,a,e),[e]),a.getSnapshot!==n||s||de!==null&&de.memoizedState.tag&1){if(r.flags|=2048,xr(9,Rc.bind(null,r,a,i,n),void 0,null),ce===null)throw Error(D(349));Gn&30||Dc(r,n,i)}return i}function Dc(e,n,r){e.flags|=16384,e={getSnapshot:n,value:r},n=X.updateQueue,n===null?(n={lastEffect:null,stores:null},X.updateQueue=n,n.stores=[e]):(r=n.stores,r===null?n.stores=[e]:r.push(e))}function Rc(e,n,r,a){n.value=r,n.getSnapshot=a,Ic(n)&&Lc(e)}function zc(e,n,r){return r(function(){Ic(n)&&Lc(e)})}function Ic(e){var n=e.getSnapshot;e=e.value;try{var r=n();return!Ke(e,r)}catch{return!0}}function Lc(e){var n=un(e,1);n!==null&&Ye(n,e,1,-1)}function xo(e){var n=Ze();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:gr,lastRenderedState:e},n.queue=e,e=e.dispatch=Nf.bind(null,X,e),[n.memoizedState,e]}function xr(e,n,r,a){return e={tag:e,create:n,destroy:r,deps:a,next:null},n=X.updateQueue,n===null?(n={lastEffect:null,stores:null},X.updateQueue=n,n.lastEffect=e.next=e):(r=n.lastEffect,r===null?n.lastEffect=e.next=e:(a=r.next,r.next=e,e.next=a,n.lastEffect=e)),e}function Mc(){return $e().memoizedState}function na(e,n,r,a){var i=Ze();X.flags|=e,i.memoizedState=xr(1|n,r,void 0,a===void 0?null:a)}function Ua(e,n,r,a){var i=$e();a=a===void 0?null:a;var s=void 0;if(le!==null){var l=le.memoizedState;if(s=l.destroy,a!==null&&ll(a,l.deps)){i.memoizedState=xr(n,r,s,a);return}}X.flags|=e,i.memoizedState=xr(1|n,r,s,a)}function vo(e,n){return na(8390656,8,e,n)}function cl(e,n){return Ua(2048,8,e,n)}function Fc(e,n){return Ua(4,2,e,n)}function Oc(e,n){return Ua(4,4,e,n)}function _c(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Bc(e,n,r){return r=r!=null?r.concat([e]):null,Ua(4,4,_c.bind(null,n,e),r)}function ul(){}function Uc(e,n){var r=$e();n=n===void 0?null:n;var a=r.memoizedState;return a!==null&&n!==null&&ll(n,a[1])?a[0]:(r.memoizedState=[e,n],e)}function $c(e,n){var r=$e();n=n===void 0?null:n;var a=r.memoizedState;return a!==null&&n!==null&&ll(n,a[1])?a[0]:(e=e(),r.memoizedState=[e,n],e)}function Vc(e,n,r){return Gn&21?(Ke(r,n)||(r=Yd(),X.lanes|=r,Xn|=r,e.baseState=!0),n):(e.baseState&&(e.baseState=!1,Se=!0),e.memoizedState=r)}function wf(e,n){var r=W;W=r!==0&&4>r?r:4,e(!0);var a=xi.transition;xi.transition={};try{e(!1),n()}finally{W=r,xi.transition=a}}function Wc(){return $e().memoizedState}function kf(e,n,r){var a=Pn(e);if(r={lane:a,action:r,hasEagerState:!1,eagerState:null,next:null},qc(e))Hc(n,r);else if(r=Cc(e,n,r,a),r!==null){var i=be();Ye(r,e,a,i),Qc(r,n,a)}}function Nf(e,n,r){var a=Pn(e),i={lane:a,action:r,hasEagerState:!1,eagerState:null,next:null};if(qc(e))Hc(n,i);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=n.lastRenderedReducer,s!==null))try{var l=n.lastRenderedState,o=s(l,r);if(i.hasEagerState=!0,i.eagerState=o,Ke(o,l)){var d=n.interleaved;d===null?(i.next=i,tl(n)):(i.next=d.next,d.next=i),n.interleaved=i;return}}catch{}finally{}r=Cc(e,n,i,a),r!==null&&(i=be(),Ye(r,e,a,i),Qc(r,n,a))}}function qc(e){var n=e.alternate;return e===X||n!==null&&n===X}function Hc(e,n){Zt=Ca=!0;var r=e.pending;r===null?n.next=n:(n.next=r.next,r.next=n),e.pending=n}function Qc(e,n,r){if(r&4194240){var a=n.lanes;a&=e.pendingLanes,r|=a,n.lanes=r,$s(e,r)}}var Ea={readContext:Ue,useCallback:he,useContext:he,useEffect:he,useImperativeHandle:he,useInsertionEffect:he,useLayoutEffect:he,useMemo:he,useReducer:he,useRef:he,useState:he,useDebugValue:he,useDeferredValue:he,useTransition:he,useMutableSource:he,useSyncExternalStore:he,useId:he,unstable_isNewReconciler:!1},Sf={readContext:Ue,useCallback:function(e,n){return Ze().memoizedState=[e,n===void 0?null:n],e},useContext:Ue,useEffect:vo,useImperativeHandle:function(e,n,r){return r=r!=null?r.concat([e]):null,na(4194308,4,_c.bind(null,n,e),r)},useLayoutEffect:function(e,n){return na(4194308,4,e,n)},useInsertionEffect:function(e,n){return na(4,2,e,n)},useMemo:function(e,n){var r=Ze();return n=n===void 0?null:n,e=e(),r.memoizedState=[e,n],e},useReducer:function(e,n,r){var a=Ze();return n=r!==void 0?r(n):n,a.memoizedState=a.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},a.queue=e,e=e.dispatch=kf.bind(null,X,e),[a.memoizedState,e]},useRef:function(e){var n=Ze();return e={current:e},n.memoizedState=e},useState:xo,useDebugValue:ul,useDeferredValue:function(e){return Ze().memoizedState=e},useTransition:function(){var e=xo(!1),n=e[0];return e=wf.bind(null,e[1]),Ze().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,r){var a=X,i=Ze();if(K){if(r===void 0)throw Error(D(407));r=r()}else{if(r=n(),ce===null)throw Error(D(349));Gn&30||Dc(a,n,r)}i.memoizedState=r;var s={value:r,getSnapshot:n};return i.queue=s,vo(zc.bind(null,a,s,e),[e]),a.flags|=2048,xr(9,Rc.bind(null,a,s,r,n),void 0,null),r},useId:function(){var e=Ze(),n=ce.identifierPrefix;if(K){var r=ln,a=sn;r=(a&~(1<<32-Qe(a)-1)).toString(32)+r,n=":"+n+"R"+r,r=hr++,0<r&&(n+="H"+r.toString(32)),n+=":"}else r=jf++,n=":"+n+"r"+r.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},Cf={readContext:Ue,useCallback:Uc,useContext:Ue,useEffect:cl,useImperativeHandle:Bc,useInsertionEffect:Fc,useLayoutEffect:Oc,useMemo:$c,useReducer:vi,useRef:Mc,useState:function(){return vi(gr)},useDebugValue:ul,useDeferredValue:function(e){var n=$e();return Vc(n,le.memoizedState,e)},useTransition:function(){var e=vi(gr)[0],n=$e().memoizedState;return[e,n]},useMutableSource:Ac,useSyncExternalStore:Tc,useId:Wc,unstable_isNewReconciler:!1},Ef={readContext:Ue,useCallback:Uc,useContext:Ue,useEffect:cl,useImperativeHandle:Bc,useInsertionEffect:Fc,useLayoutEffect:Oc,useMemo:$c,useReducer:yi,useRef:Mc,useState:function(){return yi(gr)},useDebugValue:ul,useDeferredValue:function(e){var n=$e();return le===null?n.memoizedState=e:Vc(n,le.memoizedState,e)},useTransition:function(){var e=yi(gr)[0],n=$e().memoizedState;return[e,n]},useMutableSource:Ac,useSyncExternalStore:Tc,useId:Wc,unstable_isNewReconciler:!1};function We(e,n){if(e&&e.defaultProps){n=Z({},n),e=e.defaultProps;for(var r in e)n[r]===void 0&&(n[r]=e[r]);return n}return n}function us(e,n,r,a){n=e.memoizedState,r=r(a,n),r=r==null?n:Z({},n,r),e.memoizedState=r,e.lanes===0&&(e.updateQueue.baseState=r)}var $a={isMounted:function(e){return(e=e._reactInternals)?et(e)===e:!1},enqueueSetState:function(e,n,r){e=e._reactInternals;var a=be(),i=Pn(e),s=on(a,i);s.payload=n,r!=null&&(s.callback=r),n=Cn(e,s,i),n!==null&&(Ye(n,e,i,a),Jr(n,e,i))},enqueueReplaceState:function(e,n,r){e=e._reactInternals;var a=be(),i=Pn(e),s=on(a,i);s.tag=1,s.payload=n,r!=null&&(s.callback=r),n=Cn(e,s,i),n!==null&&(Ye(n,e,i,a),Jr(n,e,i))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var r=be(),a=Pn(e),i=on(r,a);i.tag=2,n!=null&&(i.callback=n),n=Cn(e,i,a),n!==null&&(Ye(n,e,a,r),Jr(n,e,a))}};function yo(e,n,r,a,i,s,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,s,l):n.prototype&&n.prototype.isPureReactComponent?!dr(r,a)||!dr(i,s):!0}function Yc(e,n,r){var a=!1,i=Rn,s=n.contextType;return typeof s=="object"&&s!==null?s=Ue(s):(i=Ee(n)?Yn:ve.current,a=n.contextTypes,s=(a=a!=null)?wt(e,i):Rn),n=new n(r,s),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=$a,e.stateNode=n,n._reactInternals=e,a&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=s),n}function bo(e,n,r,a){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(r,a),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(r,a),n.state!==e&&$a.enqueueReplaceState(n,n.state,null)}function ps(e,n,r,a){var i=e.stateNode;i.props=r,i.state=e.memoizedState,i.refs={},rl(e);var s=n.contextType;typeof s=="object"&&s!==null?i.context=Ue(s):(s=Ee(n)?Yn:ve.current,i.context=wt(e,s)),i.state=e.memoizedState,s=n.getDerivedStateFromProps,typeof s=="function"&&(us(e,n,s,r),i.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(n=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),n!==i.state&&$a.enqueueReplaceState(i,i.state,null),Na(e,r,i,a),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function Ct(e,n){try{var r="",a=n;do r+=em(a),a=a.return;while(a);var i=r}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:e,source:n,stack:i,digest:null}}function bi(e,n,r){return{value:e,source:null,stack:r??null,digest:n??null}}function ms(e,n){try{console.error(n.value)}catch(r){setTimeout(function(){throw r})}}var Pf=typeof WeakMap=="function"?WeakMap:Map;function Kc(e,n,r){r=on(-1,r),r.tag=3,r.payload={element:null};var a=n.value;return r.callback=function(){Aa||(Aa=!0,ks=a),ms(e,n)},r}function Gc(e,n,r){r=on(-1,r),r.tag=3;var a=e.type.getDerivedStateFromError;if(typeof a=="function"){var i=n.value;r.payload=function(){return a(i)},r.callback=function(){ms(e,n)}}var s=e.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(r.callback=function(){ms(e,n),typeof a!="function"&&(En===null?En=new Set([this]):En.add(this));var l=n.stack;this.componentDidCatch(n.value,{componentStack:l!==null?l:""})}),r}function jo(e,n,r){var a=e.pingCache;if(a===null){a=e.pingCache=new Pf;var i=new Set;a.set(n,i)}else i=a.get(n),i===void 0&&(i=new Set,a.set(n,i));i.has(r)||(i.add(r),e=$f.bind(null,e,n,r),n.then(e,e))}function wo(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function ko(e,n,r,a,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===n?e.flags|=65536:(e.flags|=128,r.flags|=131072,r.flags&=-52805,r.tag===1&&(r.alternate===null?r.tag=17:(n=on(-1,1),n.tag=2,Cn(r,n,1))),r.lanes|=1),e)}var Af=mn.ReactCurrentOwner,Se=!1;function ye(e,n,r,a){n.child=e===null?Sc(n,null,r,a):Nt(n,e.child,r,a)}function No(e,n,r,a,i){r=r.render;var s=n.ref;return yt(n,i),a=ol(e,n,r,a,s,i),r=dl(),e!==null&&!Se?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~i,pn(e,n,i)):(K&&r&&Gs(n),n.flags|=1,ye(e,n,a,i),n.child)}function So(e,n,r,a,i){if(e===null){var s=r.type;return typeof s=="function"&&!yl(s)&&s.defaultProps===void 0&&r.compare===null&&r.defaultProps===void 0?(n.tag=15,n.type=s,Xc(e,n,s,a,i)):(e=ia(r.type,null,a,n,n.mode,i),e.ref=n.ref,e.return=n,n.child=e)}if(s=e.child,!(e.lanes&i)){var l=s.memoizedProps;if(r=r.compare,r=r!==null?r:dr,r(l,a)&&e.ref===n.ref)return pn(e,n,i)}return n.flags|=1,e=An(s,a),e.ref=n.ref,e.return=n,n.child=e}function Xc(e,n,r,a,i){if(e!==null){var s=e.memoizedProps;if(dr(s,a)&&e.ref===n.ref)if(Se=!1,n.pendingProps=a=s,(e.lanes&i)!==0)e.flags&131072&&(Se=!0);else return n.lanes=e.lanes,pn(e,n,i)}return fs(e,n,r,a,i)}function Zc(e,n,r){var a=n.pendingProps,i=a.children,s=e!==null?e.memoizedState:null;if(a.mode==="hidden")if(!(n.mode&1))n.memoizedState={baseLanes:0,cachePool:null,transitions:null},q(ft,Ae),Ae|=r;else{if(!(r&1073741824))return e=s!==null?s.baseLanes|r:r,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,q(ft,Ae),Ae|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},a=s!==null?s.baseLanes:r,q(ft,Ae),Ae|=a}else s!==null?(a=s.baseLanes|r,n.memoizedState=null):a=r,q(ft,Ae),Ae|=a;return ye(e,n,i,r),n.child}function Jc(e,n){var r=n.ref;(e===null&&r!==null||e!==null&&e.ref!==r)&&(n.flags|=512,n.flags|=2097152)}function fs(e,n,r,a,i){var s=Ee(r)?Yn:ve.current;return s=wt(n,s),yt(n,i),r=ol(e,n,r,a,s,i),a=dl(),e!==null&&!Se?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~i,pn(e,n,i)):(K&&a&&Gs(n),n.flags|=1,ye(e,n,r,i),n.child)}function Co(e,n,r,a,i){if(Ee(r)){var s=!0;ya(n)}else s=!1;if(yt(n,i),n.stateNode===null)ta(e,n),Yc(n,r,a),ps(n,r,a,i),a=!0;else if(e===null){var l=n.stateNode,o=n.memoizedProps;l.props=o;var d=l.context,p=r.contextType;typeof p=="object"&&p!==null?p=Ue(p):(p=Ee(r)?Yn:ve.current,p=wt(n,p));var m=r.getDerivedStateFromProps,g=typeof m=="function"||typeof l.getSnapshotBeforeUpdate=="function";g||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(o!==a||d!==p)&&bo(n,l,a,p),gn=!1;var u=n.memoizedState;l.state=u,Na(n,a,l,i),d=n.memoizedState,o!==a||u!==d||Ce.current||gn?(typeof m=="function"&&(us(n,r,m,a),d=n.memoizedState),(o=gn||yo(n,r,o,a,u,d,p))?(g||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(n.flags|=4194308)):(typeof l.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=a,n.memoizedState=d),l.props=a,l.state=d,l.context=p,a=o):(typeof l.componentDidMount=="function"&&(n.flags|=4194308),a=!1)}else{l=n.stateNode,Ec(e,n),o=n.memoizedProps,p=n.type===n.elementType?o:We(n.type,o),l.props=p,g=n.pendingProps,u=l.context,d=r.contextType,typeof d=="object"&&d!==null?d=Ue(d):(d=Ee(r)?Yn:ve.current,d=wt(n,d));var y=r.getDerivedStateFromProps;(m=typeof y=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(o!==g||u!==d)&&bo(n,l,a,d),gn=!1,u=n.memoizedState,l.state=u,Na(n,a,l,i);var N=n.memoizedState;o!==g||u!==N||Ce.current||gn?(typeof y=="function"&&(us(n,r,y,a),N=n.memoizedState),(p=gn||yo(n,r,p,a,u,N,d)||!1)?(m||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(a,N,d),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(a,N,d)),typeof l.componentDidUpdate=="function"&&(n.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof l.componentDidUpdate!="function"||o===e.memoizedProps&&u===e.memoizedState||(n.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&u===e.memoizedState||(n.flags|=1024),n.memoizedProps=a,n.memoizedState=N),l.props=a,l.state=N,l.context=d,a=p):(typeof l.componentDidUpdate!="function"||o===e.memoizedProps&&u===e.memoizedState||(n.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||o===e.memoizedProps&&u===e.memoizedState||(n.flags|=1024),a=!1)}return hs(e,n,r,a,s,i)}function hs(e,n,r,a,i,s){Jc(e,n);var l=(n.flags&128)!==0;if(!a&&!l)return i&&uo(n,r,!1),pn(e,n,s);a=n.stateNode,Af.current=n;var o=l&&typeof r.getDerivedStateFromError!="function"?null:a.render();return n.flags|=1,e!==null&&l?(n.child=Nt(n,e.child,null,s),n.child=Nt(n,null,o,s)):ye(e,n,o,s),n.memoizedState=a.state,i&&uo(n,r,!0),n.child}function eu(e){var n=e.stateNode;n.pendingContext?co(e,n.pendingContext,n.pendingContext!==n.context):n.context&&co(e,n.context,!1),al(e,n.containerInfo)}function Eo(e,n,r,a,i){return kt(),Zs(i),n.flags|=256,ye(e,n,r,a),n.child}var gs={dehydrated:null,treeContext:null,retryLane:0};function xs(e){return{baseLanes:e,cachePool:null,transitions:null}}function nu(e,n,r){var a=n.pendingProps,i=G.current,s=!1,l=(n.flags&128)!==0,o;if((o=l)||(o=e!==null&&e.memoizedState===null?!1:(i&2)!==0),o?(s=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),q(G,i&1),e===null)return ds(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(n.mode&1?e.data==="$!"?n.lanes=8:n.lanes=1073741824:n.lanes=1,null):(l=a.children,e=a.fallback,s?(a=n.mode,s=n.child,l={mode:"hidden",children:l},!(a&1)&&s!==null?(s.childLanes=0,s.pendingProps=l):s=qa(l,a,0,null),e=Qn(e,a,r,null),s.return=n,e.return=n,s.sibling=e,n.child=s,n.child.memoizedState=xs(r),n.memoizedState=gs,e):pl(n,l));if(i=e.memoizedState,i!==null&&(o=i.dehydrated,o!==null))return Tf(e,n,l,a,o,i,r);if(s){s=a.fallback,l=n.mode,i=e.child,o=i.sibling;var d={mode:"hidden",children:a.children};return!(l&1)&&n.child!==i?(a=n.child,a.childLanes=0,a.pendingProps=d,n.deletions=null):(a=An(i,d),a.subtreeFlags=i.subtreeFlags&14680064),o!==null?s=An(o,s):(s=Qn(s,l,r,null),s.flags|=2),s.return=n,a.return=n,a.sibling=s,n.child=a,a=s,s=n.child,l=e.child.memoizedState,l=l===null?xs(r):{baseLanes:l.baseLanes|r,cachePool:null,transitions:l.transitions},s.memoizedState=l,s.childLanes=e.childLanes&~r,n.memoizedState=gs,a}return s=e.child,e=s.sibling,a=An(s,{mode:"visible",children:a.children}),!(n.mode&1)&&(a.lanes=r),a.return=n,a.sibling=null,e!==null&&(r=n.deletions,r===null?(n.deletions=[e],n.flags|=16):r.push(e)),n.child=a,n.memoizedState=null,a}function pl(e,n){return n=qa({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function $r(e,n,r,a){return a!==null&&Zs(a),Nt(n,e.child,null,r),e=pl(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function Tf(e,n,r,a,i,s,l){if(r)return n.flags&256?(n.flags&=-257,a=bi(Error(D(422))),$r(e,n,l,a)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(s=a.fallback,i=n.mode,a=qa({mode:"visible",children:a.children},i,0,null),s=Qn(s,i,l,null),s.flags|=2,a.return=n,s.return=n,a.sibling=s,n.child=a,n.mode&1&&Nt(n,e.child,null,l),n.child.memoizedState=xs(l),n.memoizedState=gs,s);if(!(n.mode&1))return $r(e,n,l,null);if(i.data==="$!"){if(a=i.nextSibling&&i.nextSibling.dataset,a)var o=a.dgst;return a=o,s=Error(D(419)),a=bi(s,a,void 0),$r(e,n,l,a)}if(o=(l&e.childLanes)!==0,Se||o){if(a=ce,a!==null){switch(l&-l){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(a.suspendedLanes|l)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,un(e,i),Ye(a,e,i,-1))}return vl(),a=bi(Error(D(421))),$r(e,n,l,a)}return i.data==="$?"?(n.flags|=128,n.child=e.child,n=Vf.bind(null,e),i._reactRetry=n,null):(e=s.treeContext,Te=Sn(i.nextSibling),De=n,K=!0,He=null,e!==null&&(Fe[Oe++]=sn,Fe[Oe++]=ln,Fe[Oe++]=Kn,sn=e.id,ln=e.overflow,Kn=n),n=pl(n,a.children),n.flags|=4096,n)}function Po(e,n,r){e.lanes|=n;var a=e.alternate;a!==null&&(a.lanes|=n),cs(e.return,n,r)}function ji(e,n,r,a,i){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:a,tail:r,tailMode:i}:(s.isBackwards=n,s.rendering=null,s.renderingStartTime=0,s.last=a,s.tail=r,s.tailMode=i)}function tu(e,n,r){var a=n.pendingProps,i=a.revealOrder,s=a.tail;if(ye(e,n,a.children,r),a=G.current,a&2)a=a&1|2,n.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&Po(e,r,n);else if(e.tag===19)Po(e,r,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}a&=1}if(q(G,a),!(n.mode&1))n.memoizedState=null;else switch(i){case"forwards":for(r=n.child,i=null;r!==null;)e=r.alternate,e!==null&&Sa(e)===null&&(i=r),r=r.sibling;r=i,r===null?(i=n.child,n.child=null):(i=r.sibling,r.sibling=null),ji(n,!1,i,r,s);break;case"backwards":for(r=null,i=n.child,n.child=null;i!==null;){if(e=i.alternate,e!==null&&Sa(e)===null){n.child=i;break}e=i.sibling,i.sibling=r,r=i,i=e}ji(n,!0,r,null,s);break;case"together":ji(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function ta(e,n){!(n.mode&1)&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function pn(e,n,r){if(e!==null&&(n.dependencies=e.dependencies),Xn|=n.lanes,!(r&n.childLanes))return null;if(e!==null&&n.child!==e.child)throw Error(D(153));if(n.child!==null){for(e=n.child,r=An(e,e.pendingProps),n.child=r,r.return=n;e.sibling!==null;)e=e.sibling,r=r.sibling=An(e,e.pendingProps),r.return=n;r.sibling=null}return n.child}function Df(e,n,r){switch(n.tag){case 3:eu(n),kt();break;case 5:Pc(n);break;case 1:Ee(n.type)&&ya(n);break;case 4:al(n,n.stateNode.containerInfo);break;case 10:var a=n.type._context,i=n.memoizedProps.value;q(wa,a._currentValue),a._currentValue=i;break;case 13:if(a=n.memoizedState,a!==null)return a.dehydrated!==null?(q(G,G.current&1),n.flags|=128,null):r&n.child.childLanes?nu(e,n,r):(q(G,G.current&1),e=pn(e,n,r),e!==null?e.sibling:null);q(G,G.current&1);break;case 19:if(a=(r&n.childLanes)!==0,e.flags&128){if(a)return tu(e,n,r);n.flags|=128}if(i=n.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),q(G,G.current),a)break;return null;case 22:case 23:return n.lanes=0,Zc(e,n,r)}return pn(e,n,r)}var ru,vs,au,iu;ru=function(e,n){for(var r=n.child;r!==null;){if(r.tag===5||r.tag===6)e.appendChild(r.stateNode);else if(r.tag!==4&&r.child!==null){r.child.return=r,r=r.child;continue}if(r===n)break;for(;r.sibling===null;){if(r.return===null||r.return===n)return;r=r.return}r.sibling.return=r.return,r=r.sibling}};vs=function(){};au=function(e,n,r,a){var i=e.memoizedProps;if(i!==a){e=n.stateNode,qn(nn.current);var s=null;switch(r){case"input":i=Bi(e,i),a=Bi(e,a),s=[];break;case"select":i=Z({},i,{value:void 0}),a=Z({},a,{value:void 0}),s=[];break;case"textarea":i=Vi(e,i),a=Vi(e,a),s=[];break;default:typeof i.onClick!="function"&&typeof a.onClick=="function"&&(e.onclick=xa)}qi(r,a);var l;r=null;for(p in i)if(!a.hasOwnProperty(p)&&i.hasOwnProperty(p)&&i[p]!=null)if(p==="style"){var o=i[p];for(l in o)o.hasOwnProperty(l)&&(r||(r={}),r[l]="")}else p!=="dangerouslySetInnerHTML"&&p!=="children"&&p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&p!=="autoFocus"&&(tr.hasOwnProperty(p)?s||(s=[]):(s=s||[]).push(p,null));for(p in a){var d=a[p];if(o=i!=null?i[p]:void 0,a.hasOwnProperty(p)&&d!==o&&(d!=null||o!=null))if(p==="style")if(o){for(l in o)!o.hasOwnProperty(l)||d&&d.hasOwnProperty(l)||(r||(r={}),r[l]="");for(l in d)d.hasOwnProperty(l)&&o[l]!==d[l]&&(r||(r={}),r[l]=d[l])}else r||(s||(s=[]),s.push(p,r)),r=d;else p==="dangerouslySetInnerHTML"?(d=d?d.__html:void 0,o=o?o.__html:void 0,d!=null&&o!==d&&(s=s||[]).push(p,d)):p==="children"?typeof d!="string"&&typeof d!="number"||(s=s||[]).push(p,""+d):p!=="suppressContentEditableWarning"&&p!=="suppressHydrationWarning"&&(tr.hasOwnProperty(p)?(d!=null&&p==="onScroll"&&Q("scroll",e),s||o===d||(s=[])):(s=s||[]).push(p,d))}r&&(s=s||[]).push("style",r);var p=s;(n.updateQueue=p)&&(n.flags|=4)}};iu=function(e,n,r,a){r!==a&&(n.flags|=4)};function Ut(e,n){if(!K)switch(e.tailMode){case"hidden":n=e.tail;for(var r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?e.tail=null:r.sibling=null;break;case"collapsed":r=e.tail;for(var a=null;r!==null;)r.alternate!==null&&(a=r),r=r.sibling;a===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function ge(e){var n=e.alternate!==null&&e.alternate.child===e.child,r=0,a=0;if(n)for(var i=e.child;i!==null;)r|=i.lanes|i.childLanes,a|=i.subtreeFlags&14680064,a|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)r|=i.lanes|i.childLanes,a|=i.subtreeFlags,a|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=a,e.childLanes=r,n}function Rf(e,n,r){var a=n.pendingProps;switch(Xs(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ge(n),null;case 1:return Ee(n.type)&&va(),ge(n),null;case 3:return a=n.stateNode,St(),Y(Ce),Y(ve),sl(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Br(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&!(n.flags&256)||(n.flags|=1024,He!==null&&(Cs(He),He=null))),vs(e,n),ge(n),null;case 5:il(n);var i=qn(fr.current);if(r=n.type,e!==null&&n.stateNode!=null)au(e,n,r,a,i),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!a){if(n.stateNode===null)throw Error(D(166));return ge(n),null}if(e=qn(nn.current),Br(n)){a=n.stateNode,r=n.type;var s=n.memoizedProps;switch(a[Je]=n,a[pr]=s,e=(n.mode&1)!==0,r){case"dialog":Q("cancel",a),Q("close",a);break;case"iframe":case"object":case"embed":Q("load",a);break;case"video":case"audio":for(i=0;i<Ht.length;i++)Q(Ht[i],a);break;case"source":Q("error",a);break;case"img":case"image":case"link":Q("error",a),Q("load",a);break;case"details":Q("toggle",a);break;case"input":Ml(a,s),Q("invalid",a);break;case"select":a._wrapperState={wasMultiple:!!s.multiple},Q("invalid",a);break;case"textarea":Ol(a,s),Q("invalid",a)}qi(r,s),i=null;for(var l in s)if(s.hasOwnProperty(l)){var o=s[l];l==="children"?typeof o=="string"?a.textContent!==o&&(s.suppressHydrationWarning!==!0&&_r(a.textContent,o,e),i=["children",o]):typeof o=="number"&&a.textContent!==""+o&&(s.suppressHydrationWarning!==!0&&_r(a.textContent,o,e),i=["children",""+o]):tr.hasOwnProperty(l)&&o!=null&&l==="onScroll"&&Q("scroll",a)}switch(r){case"input":Dr(a),Fl(a,s,!0);break;case"textarea":Dr(a),_l(a);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(a.onclick=xa)}a=i,n.updateQueue=a,a!==null&&(n.flags|=4)}else{l=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=zd(r)),e==="http://www.w3.org/1999/xhtml"?r==="script"?(e=l.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof a.is=="string"?e=l.createElement(r,{is:a.is}):(e=l.createElement(r),r==="select"&&(l=e,a.multiple?l.multiple=!0:a.size&&(l.size=a.size))):e=l.createElementNS(e,r),e[Je]=n,e[pr]=a,ru(e,n,!1,!1),n.stateNode=e;e:{switch(l=Hi(r,a),r){case"dialog":Q("cancel",e),Q("close",e),i=a;break;case"iframe":case"object":case"embed":Q("load",e),i=a;break;case"video":case"audio":for(i=0;i<Ht.length;i++)Q(Ht[i],e);i=a;break;case"source":Q("error",e),i=a;break;case"img":case"image":case"link":Q("error",e),Q("load",e),i=a;break;case"details":Q("toggle",e),i=a;break;case"input":Ml(e,a),i=Bi(e,a),Q("invalid",e);break;case"option":i=a;break;case"select":e._wrapperState={wasMultiple:!!a.multiple},i=Z({},a,{value:void 0}),Q("invalid",e);break;case"textarea":Ol(e,a),i=Vi(e,a),Q("invalid",e);break;default:i=a}qi(r,i),o=i;for(s in o)if(o.hasOwnProperty(s)){var d=o[s];s==="style"?Md(e,d):s==="dangerouslySetInnerHTML"?(d=d?d.__html:void 0,d!=null&&Id(e,d)):s==="children"?typeof d=="string"?(r!=="textarea"||d!=="")&&rr(e,d):typeof d=="number"&&rr(e,""+d):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(tr.hasOwnProperty(s)?d!=null&&s==="onScroll"&&Q("scroll",e):d!=null&&Ms(e,s,d,l))}switch(r){case"input":Dr(e),Fl(e,a,!1);break;case"textarea":Dr(e),_l(e);break;case"option":a.value!=null&&e.setAttribute("value",""+Dn(a.value));break;case"select":e.multiple=!!a.multiple,s=a.value,s!=null?ht(e,!!a.multiple,s,!1):a.defaultValue!=null&&ht(e,!!a.multiple,a.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=xa)}switch(r){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}}a&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return ge(n),null;case 6:if(e&&n.stateNode!=null)iu(e,n,e.memoizedProps,a);else{if(typeof a!="string"&&n.stateNode===null)throw Error(D(166));if(r=qn(fr.current),qn(nn.current),Br(n)){if(a=n.stateNode,r=n.memoizedProps,a[Je]=n,(s=a.nodeValue!==r)&&(e=De,e!==null))switch(e.tag){case 3:_r(a.nodeValue,r,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&_r(a.nodeValue,r,(e.mode&1)!==0)}s&&(n.flags|=4)}else a=(r.nodeType===9?r:r.ownerDocument).createTextNode(a),a[Je]=n,n.stateNode=a}return ge(n),null;case 13:if(Y(G),a=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(K&&Te!==null&&n.mode&1&&!(n.flags&128))kc(),kt(),n.flags|=98560,s=!1;else if(s=Br(n),a!==null&&a.dehydrated!==null){if(e===null){if(!s)throw Error(D(318));if(s=n.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(D(317));s[Je]=n}else kt(),!(n.flags&128)&&(n.memoizedState=null),n.flags|=4;ge(n),s=!1}else He!==null&&(Cs(He),He=null),s=!0;if(!s)return n.flags&65536?n:null}return n.flags&128?(n.lanes=r,n):(a=a!==null,a!==(e!==null&&e.memoizedState!==null)&&a&&(n.child.flags|=8192,n.mode&1&&(e===null||G.current&1?oe===0&&(oe=3):vl())),n.updateQueue!==null&&(n.flags|=4),ge(n),null);case 4:return St(),vs(e,n),e===null&&cr(n.stateNode.containerInfo),ge(n),null;case 10:return nl(n.type._context),ge(n),null;case 17:return Ee(n.type)&&va(),ge(n),null;case 19:if(Y(G),s=n.memoizedState,s===null)return ge(n),null;if(a=(n.flags&128)!==0,l=s.rendering,l===null)if(a)Ut(s,!1);else{if(oe!==0||e!==null&&e.flags&128)for(e=n.child;e!==null;){if(l=Sa(e),l!==null){for(n.flags|=128,Ut(s,!1),a=l.updateQueue,a!==null&&(n.updateQueue=a,n.flags|=4),n.subtreeFlags=0,a=r,r=n.child;r!==null;)s=r,e=a,s.flags&=14680066,l=s.alternate,l===null?(s.childLanes=0,s.lanes=e,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=l.childLanes,s.lanes=l.lanes,s.child=l.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=l.memoizedProps,s.memoizedState=l.memoizedState,s.updateQueue=l.updateQueue,s.type=l.type,e=l.dependencies,s.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),r=r.sibling;return q(G,G.current&1|2),n.child}e=e.sibling}s.tail!==null&&te()>Et&&(n.flags|=128,a=!0,Ut(s,!1),n.lanes=4194304)}else{if(!a)if(e=Sa(l),e!==null){if(n.flags|=128,a=!0,r=e.updateQueue,r!==null&&(n.updateQueue=r,n.flags|=4),Ut(s,!0),s.tail===null&&s.tailMode==="hidden"&&!l.alternate&&!K)return ge(n),null}else 2*te()-s.renderingStartTime>Et&&r!==1073741824&&(n.flags|=128,a=!0,Ut(s,!1),n.lanes=4194304);s.isBackwards?(l.sibling=n.child,n.child=l):(r=s.last,r!==null?r.sibling=l:n.child=l,s.last=l)}return s.tail!==null?(n=s.tail,s.rendering=n,s.tail=n.sibling,s.renderingStartTime=te(),n.sibling=null,r=G.current,q(G,a?r&1|2:r&1),n):(ge(n),null);case 22:case 23:return xl(),a=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==a&&(n.flags|=8192),a&&n.mode&1?Ae&1073741824&&(ge(n),n.subtreeFlags&6&&(n.flags|=8192)):ge(n),null;case 24:return null;case 25:return null}throw Error(D(156,n.tag))}function zf(e,n){switch(Xs(n),n.tag){case 1:return Ee(n.type)&&va(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return St(),Y(Ce),Y(ve),sl(),e=n.flags,e&65536&&!(e&128)?(n.flags=e&-65537|128,n):null;case 5:return il(n),null;case 13:if(Y(G),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(D(340));kt()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return Y(G),null;case 4:return St(),null;case 10:return nl(n.type._context),null;case 22:case 23:return xl(),null;case 24:return null;default:return null}}var Vr=!1,xe=!1,If=typeof WeakSet=="function"?WeakSet:Set,L=null;function mt(e,n){var r=e.ref;if(r!==null)if(typeof r=="function")try{r(null)}catch(a){J(e,n,a)}else r.current=null}function ys(e,n,r){try{r()}catch(a){J(e,n,a)}}var Ao=!1;function Lf(e,n){if(ts=fa,e=cc(),Ks(e)){if("selectionStart"in e)var r={start:e.selectionStart,end:e.selectionEnd};else e:{r=(r=e.ownerDocument)&&r.defaultView||window;var a=r.getSelection&&r.getSelection();if(a&&a.rangeCount!==0){r=a.anchorNode;var i=a.anchorOffset,s=a.focusNode;a=a.focusOffset;try{r.nodeType,s.nodeType}catch{r=null;break e}var l=0,o=-1,d=-1,p=0,m=0,g=e,u=null;n:for(;;){for(var y;g!==r||i!==0&&g.nodeType!==3||(o=l+i),g!==s||a!==0&&g.nodeType!==3||(d=l+a),g.nodeType===3&&(l+=g.nodeValue.length),(y=g.firstChild)!==null;)u=g,g=y;for(;;){if(g===e)break n;if(u===r&&++p===i&&(o=l),u===s&&++m===a&&(d=l),(y=g.nextSibling)!==null)break;g=u,u=g.parentNode}g=y}r=o===-1||d===-1?null:{start:o,end:d}}else r=null}r=r||{start:0,end:0}}else r=null;for(rs={focusedElem:e,selectionRange:r},fa=!1,L=n;L!==null;)if(n=L,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,L=e;else for(;L!==null;){n=L;try{var N=n.alternate;if(n.flags&1024)switch(n.tag){case 0:case 11:case 15:break;case 1:if(N!==null){var k=N.memoizedProps,b=N.memoizedState,h=n.stateNode,f=h.getSnapshotBeforeUpdate(n.elementType===n.type?k:We(n.type,k),b);h.__reactInternalSnapshotBeforeUpdate=f}break;case 3:var v=n.stateNode.containerInfo;v.nodeType===1?v.textContent="":v.nodeType===9&&v.documentElement&&v.removeChild(v.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(D(163))}}catch(E){J(n,n.return,E)}if(e=n.sibling,e!==null){e.return=n.return,L=e;break}L=n.return}return N=Ao,Ao=!1,N}function Jt(e,n,r){var a=n.updateQueue;if(a=a!==null?a.lastEffect:null,a!==null){var i=a=a.next;do{if((i.tag&e)===e){var s=i.destroy;i.destroy=void 0,s!==void 0&&ys(n,r,s)}i=i.next}while(i!==a)}}function Va(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var r=n=n.next;do{if((r.tag&e)===e){var a=r.create;r.destroy=a()}r=r.next}while(r!==n)}}function bs(e){var n=e.ref;if(n!==null){var r=e.stateNode;switch(e.tag){case 5:e=r;break;default:e=r}typeof n=="function"?n(e):n.current=e}}function su(e){var n=e.alternate;n!==null&&(e.alternate=null,su(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[Je],delete n[pr],delete n[ss],delete n[xf],delete n[vf])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function lu(e){return e.tag===5||e.tag===3||e.tag===4}function To(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||lu(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function js(e,n,r){var a=e.tag;if(a===5||a===6)e=e.stateNode,n?r.nodeType===8?r.parentNode.insertBefore(e,n):r.insertBefore(e,n):(r.nodeType===8?(n=r.parentNode,n.insertBefore(e,r)):(n=r,n.appendChild(e)),r=r._reactRootContainer,r!=null||n.onclick!==null||(n.onclick=xa));else if(a!==4&&(e=e.child,e!==null))for(js(e,n,r),e=e.sibling;e!==null;)js(e,n,r),e=e.sibling}function ws(e,n,r){var a=e.tag;if(a===5||a===6)e=e.stateNode,n?r.insertBefore(e,n):r.appendChild(e);else if(a!==4&&(e=e.child,e!==null))for(ws(e,n,r),e=e.sibling;e!==null;)ws(e,n,r),e=e.sibling}var ue=null,qe=!1;function fn(e,n,r){for(r=r.child;r!==null;)ou(e,n,r),r=r.sibling}function ou(e,n,r){if(en&&typeof en.onCommitFiberUnmount=="function")try{en.onCommitFiberUnmount(La,r)}catch{}switch(r.tag){case 5:xe||mt(r,n);case 6:var a=ue,i=qe;ue=null,fn(e,n,r),ue=a,qe=i,ue!==null&&(qe?(e=ue,r=r.stateNode,e.nodeType===8?e.parentNode.removeChild(r):e.removeChild(r)):ue.removeChild(r.stateNode));break;case 18:ue!==null&&(qe?(e=ue,r=r.stateNode,e.nodeType===8?fi(e.parentNode,r):e.nodeType===1&&fi(e,r),lr(e)):fi(ue,r.stateNode));break;case 4:a=ue,i=qe,ue=r.stateNode.containerInfo,qe=!0,fn(e,n,r),ue=a,qe=i;break;case 0:case 11:case 14:case 15:if(!xe&&(a=r.updateQueue,a!==null&&(a=a.lastEffect,a!==null))){i=a=a.next;do{var s=i,l=s.destroy;s=s.tag,l!==void 0&&(s&2||s&4)&&ys(r,n,l),i=i.next}while(i!==a)}fn(e,n,r);break;case 1:if(!xe&&(mt(r,n),a=r.stateNode,typeof a.componentWillUnmount=="function"))try{a.props=r.memoizedProps,a.state=r.memoizedState,a.componentWillUnmount()}catch(o){J(r,n,o)}fn(e,n,r);break;case 21:fn(e,n,r);break;case 22:r.mode&1?(xe=(a=xe)||r.memoizedState!==null,fn(e,n,r),xe=a):fn(e,n,r);break;default:fn(e,n,r)}}function Do(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var r=e.stateNode;r===null&&(r=e.stateNode=new If),n.forEach(function(a){var i=Wf.bind(null,e,a);r.has(a)||(r.add(a),a.then(i,i))})}}function Ve(e,n){var r=n.deletions;if(r!==null)for(var a=0;a<r.length;a++){var i=r[a];try{var s=e,l=n,o=l;e:for(;o!==null;){switch(o.tag){case 5:ue=o.stateNode,qe=!1;break e;case 3:ue=o.stateNode.containerInfo,qe=!0;break e;case 4:ue=o.stateNode.containerInfo,qe=!0;break e}o=o.return}if(ue===null)throw Error(D(160));ou(s,l,i),ue=null,qe=!1;var d=i.alternate;d!==null&&(d.return=null),i.return=null}catch(p){J(i,n,p)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)du(n,e),n=n.sibling}function du(e,n){var r=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(Ve(n,e),Xe(e),a&4){try{Jt(3,e,e.return),Va(3,e)}catch(k){J(e,e.return,k)}try{Jt(5,e,e.return)}catch(k){J(e,e.return,k)}}break;case 1:Ve(n,e),Xe(e),a&512&&r!==null&&mt(r,r.return);break;case 5:if(Ve(n,e),Xe(e),a&512&&r!==null&&mt(r,r.return),e.flags&32){var i=e.stateNode;try{rr(i,"")}catch(k){J(e,e.return,k)}}if(a&4&&(i=e.stateNode,i!=null)){var s=e.memoizedProps,l=r!==null?r.memoizedProps:s,o=e.type,d=e.updateQueue;if(e.updateQueue=null,d!==null)try{o==="input"&&s.type==="radio"&&s.name!=null&&Dd(i,s),Hi(o,l);var p=Hi(o,s);for(l=0;l<d.length;l+=2){var m=d[l],g=d[l+1];m==="style"?Md(i,g):m==="dangerouslySetInnerHTML"?Id(i,g):m==="children"?rr(i,g):Ms(i,m,g,p)}switch(o){case"input":Ui(i,s);break;case"textarea":Rd(i,s);break;case"select":var u=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var y=s.value;y!=null?ht(i,!!s.multiple,y,!1):u!==!!s.multiple&&(s.defaultValue!=null?ht(i,!!s.multiple,s.defaultValue,!0):ht(i,!!s.multiple,s.multiple?[]:"",!1))}i[pr]=s}catch(k){J(e,e.return,k)}}break;case 6:if(Ve(n,e),Xe(e),a&4){if(e.stateNode===null)throw Error(D(162));i=e.stateNode,s=e.memoizedProps;try{i.nodeValue=s}catch(k){J(e,e.return,k)}}break;case 3:if(Ve(n,e),Xe(e),a&4&&r!==null&&r.memoizedState.isDehydrated)try{lr(n.containerInfo)}catch(k){J(e,e.return,k)}break;case 4:Ve(n,e),Xe(e);break;case 13:Ve(n,e),Xe(e),i=e.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(hl=te())),a&4&&Do(e);break;case 22:if(m=r!==null&&r.memoizedState!==null,e.mode&1?(xe=(p=xe)||m,Ve(n,e),xe=p):Ve(n,e),Xe(e),a&8192){if(p=e.memoizedState!==null,(e.stateNode.isHidden=p)&&!m&&e.mode&1)for(L=e,m=e.child;m!==null;){for(g=L=m;L!==null;){switch(u=L,y=u.child,u.tag){case 0:case 11:case 14:case 15:Jt(4,u,u.return);break;case 1:mt(u,u.return);var N=u.stateNode;if(typeof N.componentWillUnmount=="function"){a=u,r=u.return;try{n=a,N.props=n.memoizedProps,N.state=n.memoizedState,N.componentWillUnmount()}catch(k){J(a,r,k)}}break;case 5:mt(u,u.return);break;case 22:if(u.memoizedState!==null){zo(g);continue}}y!==null?(y.return=u,L=y):zo(g)}m=m.sibling}e:for(m=null,g=e;;){if(g.tag===5){if(m===null){m=g;try{i=g.stateNode,p?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(o=g.stateNode,d=g.memoizedProps.style,l=d!=null&&d.hasOwnProperty("display")?d.display:null,o.style.display=Ld("display",l))}catch(k){J(e,e.return,k)}}}else if(g.tag===6){if(m===null)try{g.stateNode.nodeValue=p?"":g.memoizedProps}catch(k){J(e,e.return,k)}}else if((g.tag!==22&&g.tag!==23||g.memoizedState===null||g===e)&&g.child!==null){g.child.return=g,g=g.child;continue}if(g===e)break e;for(;g.sibling===null;){if(g.return===null||g.return===e)break e;m===g&&(m=null),g=g.return}m===g&&(m=null),g.sibling.return=g.return,g=g.sibling}}break;case 19:Ve(n,e),Xe(e),a&4&&Do(e);break;case 21:break;default:Ve(n,e),Xe(e)}}function Xe(e){var n=e.flags;if(n&2){try{e:{for(var r=e.return;r!==null;){if(lu(r)){var a=r;break e}r=r.return}throw Error(D(160))}switch(a.tag){case 5:var i=a.stateNode;a.flags&32&&(rr(i,""),a.flags&=-33);var s=To(e);ws(e,s,i);break;case 3:case 4:var l=a.stateNode.containerInfo,o=To(e);js(e,o,l);break;default:throw Error(D(161))}}catch(d){J(e,e.return,d)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function Mf(e,n,r){L=e,cu(e)}function cu(e,n,r){for(var a=(e.mode&1)!==0;L!==null;){var i=L,s=i.child;if(i.tag===22&&a){var l=i.memoizedState!==null||Vr;if(!l){var o=i.alternate,d=o!==null&&o.memoizedState!==null||xe;o=Vr;var p=xe;if(Vr=l,(xe=d)&&!p)for(L=i;L!==null;)l=L,d=l.child,l.tag===22&&l.memoizedState!==null?Io(i):d!==null?(d.return=l,L=d):Io(i);for(;s!==null;)L=s,cu(s),s=s.sibling;L=i,Vr=o,xe=p}Ro(e)}else i.subtreeFlags&8772&&s!==null?(s.return=i,L=s):Ro(e)}}function Ro(e){for(;L!==null;){var n=L;if(n.flags&8772){var r=n.alternate;try{if(n.flags&8772)switch(n.tag){case 0:case 11:case 15:xe||Va(5,n);break;case 1:var a=n.stateNode;if(n.flags&4&&!xe)if(r===null)a.componentDidMount();else{var i=n.elementType===n.type?r.memoizedProps:We(n.type,r.memoizedProps);a.componentDidUpdate(i,r.memoizedState,a.__reactInternalSnapshotBeforeUpdate)}var s=n.updateQueue;s!==null&&go(n,s,a);break;case 3:var l=n.updateQueue;if(l!==null){if(r=null,n.child!==null)switch(n.child.tag){case 5:r=n.child.stateNode;break;case 1:r=n.child.stateNode}go(n,l,r)}break;case 5:var o=n.stateNode;if(r===null&&n.flags&4){r=o;var d=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":d.autoFocus&&r.focus();break;case"img":d.src&&(r.src=d.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var p=n.alternate;if(p!==null){var m=p.memoizedState;if(m!==null){var g=m.dehydrated;g!==null&&lr(g)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(D(163))}xe||n.flags&512&&bs(n)}catch(u){J(n,n.return,u)}}if(n===e){L=null;break}if(r=n.sibling,r!==null){r.return=n.return,L=r;break}L=n.return}}function zo(e){for(;L!==null;){var n=L;if(n===e){L=null;break}var r=n.sibling;if(r!==null){r.return=n.return,L=r;break}L=n.return}}function Io(e){for(;L!==null;){var n=L;try{switch(n.tag){case 0:case 11:case 15:var r=n.return;try{Va(4,n)}catch(d){J(n,r,d)}break;case 1:var a=n.stateNode;if(typeof a.componentDidMount=="function"){var i=n.return;try{a.componentDidMount()}catch(d){J(n,i,d)}}var s=n.return;try{bs(n)}catch(d){J(n,s,d)}break;case 5:var l=n.return;try{bs(n)}catch(d){J(n,l,d)}}}catch(d){J(n,n.return,d)}if(n===e){L=null;break}var o=n.sibling;if(o!==null){o.return=n.return,L=o;break}L=n.return}}var Ff=Math.ceil,Pa=mn.ReactCurrentDispatcher,ml=mn.ReactCurrentOwner,Be=mn.ReactCurrentBatchConfig,V=0,ce=null,ie=null,pe=0,Ae=0,ft=In(0),oe=0,vr=null,Xn=0,Wa=0,fl=0,er=null,Ne=null,hl=0,Et=1/0,rn=null,Aa=!1,ks=null,En=null,Wr=!1,bn=null,Ta=0,nr=0,Ns=null,ra=-1,aa=0;function be(){return V&6?te():ra!==-1?ra:ra=te()}function Pn(e){return e.mode&1?V&2&&pe!==0?pe&-pe:bf.transition!==null?(aa===0&&(aa=Yd()),aa):(e=W,e!==0||(e=window.event,e=e===void 0?16:nc(e.type)),e):1}function Ye(e,n,r,a){if(50<nr)throw nr=0,Ns=null,Error(D(185));wr(e,r,a),(!(V&2)||e!==ce)&&(e===ce&&(!(V&2)&&(Wa|=r),oe===4&&vn(e,pe)),Pe(e,a),r===1&&V===0&&!(n.mode&1)&&(Et=te()+500,Ba&&Ln()))}function Pe(e,n){var r=e.callbackNode;ym(e,n);var a=ma(e,e===ce?pe:0);if(a===0)r!==null&&$l(r),e.callbackNode=null,e.callbackPriority=0;else if(n=a&-a,e.callbackPriority!==n){if(r!=null&&$l(r),n===1)e.tag===0?yf(Lo.bind(null,e)):bc(Lo.bind(null,e)),hf(function(){!(V&6)&&Ln()}),r=null;else{switch(Kd(a)){case 1:r=Us;break;case 4:r=Hd;break;case 16:r=pa;break;case 536870912:r=Qd;break;default:r=pa}r=vu(r,uu.bind(null,e))}e.callbackPriority=n,e.callbackNode=r}}function uu(e,n){if(ra=-1,aa=0,V&6)throw Error(D(327));var r=e.callbackNode;if(bt()&&e.callbackNode!==r)return null;var a=ma(e,e===ce?pe:0);if(a===0)return null;if(a&30||a&e.expiredLanes||n)n=Da(e,a);else{n=a;var i=V;V|=2;var s=mu();(ce!==e||pe!==n)&&(rn=null,Et=te()+500,Hn(e,n));do try{Bf();break}catch(o){pu(e,o)}while(!0);el(),Pa.current=s,V=i,ie!==null?n=0:(ce=null,pe=0,n=oe)}if(n!==0){if(n===2&&(i=Xi(e),i!==0&&(a=i,n=Ss(e,i))),n===1)throw r=vr,Hn(e,0),vn(e,a),Pe(e,te()),r;if(n===6)vn(e,a);else{if(i=e.current.alternate,!(a&30)&&!Of(i)&&(n=Da(e,a),n===2&&(s=Xi(e),s!==0&&(a=s,n=Ss(e,s))),n===1))throw r=vr,Hn(e,0),vn(e,a),Pe(e,te()),r;switch(e.finishedWork=i,e.finishedLanes=a,n){case 0:case 1:throw Error(D(345));case 2:Un(e,Ne,rn);break;case 3:if(vn(e,a),(a&130023424)===a&&(n=hl+500-te(),10<n)){if(ma(e,0)!==0)break;if(i=e.suspendedLanes,(i&a)!==a){be(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=is(Un.bind(null,e,Ne,rn),n);break}Un(e,Ne,rn);break;case 4:if(vn(e,a),(a&4194240)===a)break;for(n=e.eventTimes,i=-1;0<a;){var l=31-Qe(a);s=1<<l,l=n[l],l>i&&(i=l),a&=~s}if(a=i,a=te()-a,a=(120>a?120:480>a?480:1080>a?1080:1920>a?1920:3e3>a?3e3:4320>a?4320:1960*Ff(a/1960))-a,10<a){e.timeoutHandle=is(Un.bind(null,e,Ne,rn),a);break}Un(e,Ne,rn);break;case 5:Un(e,Ne,rn);break;default:throw Error(D(329))}}}return Pe(e,te()),e.callbackNode===r?uu.bind(null,e):null}function Ss(e,n){var r=er;return e.current.memoizedState.isDehydrated&&(Hn(e,n).flags|=256),e=Da(e,n),e!==2&&(n=Ne,Ne=r,n!==null&&Cs(n)),e}function Cs(e){Ne===null?Ne=e:Ne.push.apply(Ne,e)}function Of(e){for(var n=e;;){if(n.flags&16384){var r=n.updateQueue;if(r!==null&&(r=r.stores,r!==null))for(var a=0;a<r.length;a++){var i=r[a],s=i.getSnapshot;i=i.value;try{if(!Ke(s(),i))return!1}catch{return!1}}}if(r=n.child,n.subtreeFlags&16384&&r!==null)r.return=n,n=r;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function vn(e,n){for(n&=~fl,n&=~Wa,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var r=31-Qe(n),a=1<<r;e[r]=-1,n&=~a}}function Lo(e){if(V&6)throw Error(D(327));bt();var n=ma(e,0);if(!(n&1))return Pe(e,te()),null;var r=Da(e,n);if(e.tag!==0&&r===2){var a=Xi(e);a!==0&&(n=a,r=Ss(e,a))}if(r===1)throw r=vr,Hn(e,0),vn(e,n),Pe(e,te()),r;if(r===6)throw Error(D(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,Un(e,Ne,rn),Pe(e,te()),null}function gl(e,n){var r=V;V|=1;try{return e(n)}finally{V=r,V===0&&(Et=te()+500,Ba&&Ln())}}function Zn(e){bn!==null&&bn.tag===0&&!(V&6)&&bt();var n=V;V|=1;var r=Be.transition,a=W;try{if(Be.transition=null,W=1,e)return e()}finally{W=a,Be.transition=r,V=n,!(V&6)&&Ln()}}function xl(){Ae=ft.current,Y(ft)}function Hn(e,n){e.finishedWork=null,e.finishedLanes=0;var r=e.timeoutHandle;if(r!==-1&&(e.timeoutHandle=-1,ff(r)),ie!==null)for(r=ie.return;r!==null;){var a=r;switch(Xs(a),a.tag){case 1:a=a.type.childContextTypes,a!=null&&va();break;case 3:St(),Y(Ce),Y(ve),sl();break;case 5:il(a);break;case 4:St();break;case 13:Y(G);break;case 19:Y(G);break;case 10:nl(a.type._context);break;case 22:case 23:xl()}r=r.return}if(ce=e,ie=e=An(e.current,null),pe=Ae=n,oe=0,vr=null,fl=Wa=Xn=0,Ne=er=null,Wn!==null){for(n=0;n<Wn.length;n++)if(r=Wn[n],a=r.interleaved,a!==null){r.interleaved=null;var i=a.next,s=r.pending;if(s!==null){var l=s.next;s.next=i,a.next=l}r.pending=a}Wn=null}return e}function pu(e,n){do{var r=ie;try{if(el(),ea.current=Ea,Ca){for(var a=X.memoizedState;a!==null;){var i=a.queue;i!==null&&(i.pending=null),a=a.next}Ca=!1}if(Gn=0,de=le=X=null,Zt=!1,hr=0,ml.current=null,r===null||r.return===null){oe=1,vr=n,ie=null;break}e:{var s=e,l=r.return,o=r,d=n;if(n=pe,o.flags|=32768,d!==null&&typeof d=="object"&&typeof d.then=="function"){var p=d,m=o,g=m.tag;if(!(m.mode&1)&&(g===0||g===11||g===15)){var u=m.alternate;u?(m.updateQueue=u.updateQueue,m.memoizedState=u.memoizedState,m.lanes=u.lanes):(m.updateQueue=null,m.memoizedState=null)}var y=wo(l);if(y!==null){y.flags&=-257,ko(y,l,o,s,n),y.mode&1&&jo(s,p,n),n=y,d=p;var N=n.updateQueue;if(N===null){var k=new Set;k.add(d),n.updateQueue=k}else N.add(d);break e}else{if(!(n&1)){jo(s,p,n),vl();break e}d=Error(D(426))}}else if(K&&o.mode&1){var b=wo(l);if(b!==null){!(b.flags&65536)&&(b.flags|=256),ko(b,l,o,s,n),Zs(Ct(d,o));break e}}s=d=Ct(d,o),oe!==4&&(oe=2),er===null?er=[s]:er.push(s),s=l;do{switch(s.tag){case 3:s.flags|=65536,n&=-n,s.lanes|=n;var h=Kc(s,d,n);ho(s,h);break e;case 1:o=d;var f=s.type,v=s.stateNode;if(!(s.flags&128)&&(typeof f.getDerivedStateFromError=="function"||v!==null&&typeof v.componentDidCatch=="function"&&(En===null||!En.has(v)))){s.flags|=65536,n&=-n,s.lanes|=n;var E=Gc(s,o,n);ho(s,E);break e}}s=s.return}while(s!==null)}hu(r)}catch(j){n=j,ie===r&&r!==null&&(ie=r=r.return);continue}break}while(!0)}function mu(){var e=Pa.current;return Pa.current=Ea,e===null?Ea:e}function vl(){(oe===0||oe===3||oe===2)&&(oe=4),ce===null||!(Xn&268435455)&&!(Wa&268435455)||vn(ce,pe)}function Da(e,n){var r=V;V|=2;var a=mu();(ce!==e||pe!==n)&&(rn=null,Hn(e,n));do try{_f();break}catch(i){pu(e,i)}while(!0);if(el(),V=r,Pa.current=a,ie!==null)throw Error(D(261));return ce=null,pe=0,oe}function _f(){for(;ie!==null;)fu(ie)}function Bf(){for(;ie!==null&&!cm();)fu(ie)}function fu(e){var n=xu(e.alternate,e,Ae);e.memoizedProps=e.pendingProps,n===null?hu(e):ie=n,ml.current=null}function hu(e){var n=e;do{var r=n.alternate;if(e=n.return,n.flags&32768){if(r=zf(r,n),r!==null){r.flags&=32767,ie=r;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{oe=6,ie=null;return}}else if(r=Rf(r,n,Ae),r!==null){ie=r;return}if(n=n.sibling,n!==null){ie=n;return}ie=n=e}while(n!==null);oe===0&&(oe=5)}function Un(e,n,r){var a=W,i=Be.transition;try{Be.transition=null,W=1,Uf(e,n,r,a)}finally{Be.transition=i,W=a}return null}function Uf(e,n,r,a){do bt();while(bn!==null);if(V&6)throw Error(D(327));r=e.finishedWork;var i=e.finishedLanes;if(r===null)return null;if(e.finishedWork=null,e.finishedLanes=0,r===e.current)throw Error(D(177));e.callbackNode=null,e.callbackPriority=0;var s=r.lanes|r.childLanes;if(bm(e,s),e===ce&&(ie=ce=null,pe=0),!(r.subtreeFlags&2064)&&!(r.flags&2064)||Wr||(Wr=!0,vu(pa,function(){return bt(),null})),s=(r.flags&15990)!==0,r.subtreeFlags&15990||s){s=Be.transition,Be.transition=null;var l=W;W=1;var o=V;V|=4,ml.current=null,Lf(e,r),du(r,e),lf(rs),fa=!!ts,rs=ts=null,e.current=r,Mf(r),um(),V=o,W=l,Be.transition=s}else e.current=r;if(Wr&&(Wr=!1,bn=e,Ta=i),s=e.pendingLanes,s===0&&(En=null),fm(r.stateNode),Pe(e,te()),n!==null)for(a=e.onRecoverableError,r=0;r<n.length;r++)i=n[r],a(i.value,{componentStack:i.stack,digest:i.digest});if(Aa)throw Aa=!1,e=ks,ks=null,e;return Ta&1&&e.tag!==0&&bt(),s=e.pendingLanes,s&1?e===Ns?nr++:(nr=0,Ns=e):nr=0,Ln(),null}function bt(){if(bn!==null){var e=Kd(Ta),n=Be.transition,r=W;try{if(Be.transition=null,W=16>e?16:e,bn===null)var a=!1;else{if(e=bn,bn=null,Ta=0,V&6)throw Error(D(331));var i=V;for(V|=4,L=e.current;L!==null;){var s=L,l=s.child;if(L.flags&16){var o=s.deletions;if(o!==null){for(var d=0;d<o.length;d++){var p=o[d];for(L=p;L!==null;){var m=L;switch(m.tag){case 0:case 11:case 15:Jt(8,m,s)}var g=m.child;if(g!==null)g.return=m,L=g;else for(;L!==null;){m=L;var u=m.sibling,y=m.return;if(su(m),m===p){L=null;break}if(u!==null){u.return=y,L=u;break}L=y}}}var N=s.alternate;if(N!==null){var k=N.child;if(k!==null){N.child=null;do{var b=k.sibling;k.sibling=null,k=b}while(k!==null)}}L=s}}if(s.subtreeFlags&2064&&l!==null)l.return=s,L=l;else e:for(;L!==null;){if(s=L,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Jt(9,s,s.return)}var h=s.sibling;if(h!==null){h.return=s.return,L=h;break e}L=s.return}}var f=e.current;for(L=f;L!==null;){l=L;var v=l.child;if(l.subtreeFlags&2064&&v!==null)v.return=l,L=v;else e:for(l=f;L!==null;){if(o=L,o.flags&2048)try{switch(o.tag){case 0:case 11:case 15:Va(9,o)}}catch(j){J(o,o.return,j)}if(o===l){L=null;break e}var E=o.sibling;if(E!==null){E.return=o.return,L=E;break e}L=o.return}}if(V=i,Ln(),en&&typeof en.onPostCommitFiberRoot=="function")try{en.onPostCommitFiberRoot(La,e)}catch{}a=!0}return a}finally{W=r,Be.transition=n}}return!1}function Mo(e,n,r){n=Ct(r,n),n=Kc(e,n,1),e=Cn(e,n,1),n=be(),e!==null&&(wr(e,1,n),Pe(e,n))}function J(e,n,r){if(e.tag===3)Mo(e,e,r);else for(;n!==null;){if(n.tag===3){Mo(n,e,r);break}else if(n.tag===1){var a=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(En===null||!En.has(a))){e=Ct(r,e),e=Gc(n,e,1),n=Cn(n,e,1),e=be(),n!==null&&(wr(n,1,e),Pe(n,e));break}}n=n.return}}function $f(e,n,r){var a=e.pingCache;a!==null&&a.delete(n),n=be(),e.pingedLanes|=e.suspendedLanes&r,ce===e&&(pe&r)===r&&(oe===4||oe===3&&(pe&130023424)===pe&&500>te()-hl?Hn(e,0):fl|=r),Pe(e,n)}function gu(e,n){n===0&&(e.mode&1?(n=Ir,Ir<<=1,!(Ir&130023424)&&(Ir=4194304)):n=1);var r=be();e=un(e,n),e!==null&&(wr(e,n,r),Pe(e,r))}function Vf(e){var n=e.memoizedState,r=0;n!==null&&(r=n.retryLane),gu(e,r)}function Wf(e,n){var r=0;switch(e.tag){case 13:var a=e.stateNode,i=e.memoizedState;i!==null&&(r=i.retryLane);break;case 19:a=e.stateNode;break;default:throw Error(D(314))}a!==null&&a.delete(n),gu(e,r)}var xu;xu=function(e,n,r){if(e!==null)if(e.memoizedProps!==n.pendingProps||Ce.current)Se=!0;else{if(!(e.lanes&r)&&!(n.flags&128))return Se=!1,Df(e,n,r);Se=!!(e.flags&131072)}else Se=!1,K&&n.flags&1048576&&jc(n,ja,n.index);switch(n.lanes=0,n.tag){case 2:var a=n.type;ta(e,n),e=n.pendingProps;var i=wt(n,ve.current);yt(n,r),i=ol(null,n,a,e,i,r);var s=dl();return n.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,Ee(a)?(s=!0,ya(n)):s=!1,n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,rl(n),i.updater=$a,n.stateNode=i,i._reactInternals=n,ps(n,a,e,r),n=hs(null,n,a,!0,s,r)):(n.tag=0,K&&s&&Gs(n),ye(null,n,i,r),n=n.child),n;case 16:a=n.elementType;e:{switch(ta(e,n),e=n.pendingProps,i=a._init,a=i(a._payload),n.type=a,i=n.tag=Hf(a),e=We(a,e),i){case 0:n=fs(null,n,a,e,r);break e;case 1:n=Co(null,n,a,e,r);break e;case 11:n=No(null,n,a,e,r);break e;case 14:n=So(null,n,a,We(a.type,e),r);break e}throw Error(D(306,a,""))}return n;case 0:return a=n.type,i=n.pendingProps,i=n.elementType===a?i:We(a,i),fs(e,n,a,i,r);case 1:return a=n.type,i=n.pendingProps,i=n.elementType===a?i:We(a,i),Co(e,n,a,i,r);case 3:e:{if(eu(n),e===null)throw Error(D(387));a=n.pendingProps,s=n.memoizedState,i=s.element,Ec(e,n),Na(n,a,null,r);var l=n.memoizedState;if(a=l.element,s.isDehydrated)if(s={element:a,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},n.updateQueue.baseState=s,n.memoizedState=s,n.flags&256){i=Ct(Error(D(423)),n),n=Eo(e,n,a,r,i);break e}else if(a!==i){i=Ct(Error(D(424)),n),n=Eo(e,n,a,r,i);break e}else for(Te=Sn(n.stateNode.containerInfo.firstChild),De=n,K=!0,He=null,r=Sc(n,null,a,r),n.child=r;r;)r.flags=r.flags&-3|4096,r=r.sibling;else{if(kt(),a===i){n=pn(e,n,r);break e}ye(e,n,a,r)}n=n.child}return n;case 5:return Pc(n),e===null&&ds(n),a=n.type,i=n.pendingProps,s=e!==null?e.memoizedProps:null,l=i.children,as(a,i)?l=null:s!==null&&as(a,s)&&(n.flags|=32),Jc(e,n),ye(e,n,l,r),n.child;case 6:return e===null&&ds(n),null;case 13:return nu(e,n,r);case 4:return al(n,n.stateNode.containerInfo),a=n.pendingProps,e===null?n.child=Nt(n,null,a,r):ye(e,n,a,r),n.child;case 11:return a=n.type,i=n.pendingProps,i=n.elementType===a?i:We(a,i),No(e,n,a,i,r);case 7:return ye(e,n,n.pendingProps,r),n.child;case 8:return ye(e,n,n.pendingProps.children,r),n.child;case 12:return ye(e,n,n.pendingProps.children,r),n.child;case 10:e:{if(a=n.type._context,i=n.pendingProps,s=n.memoizedProps,l=i.value,q(wa,a._currentValue),a._currentValue=l,s!==null)if(Ke(s.value,l)){if(s.children===i.children&&!Ce.current){n=pn(e,n,r);break e}}else for(s=n.child,s!==null&&(s.return=n);s!==null;){var o=s.dependencies;if(o!==null){l=s.child;for(var d=o.firstContext;d!==null;){if(d.context===a){if(s.tag===1){d=on(-1,r&-r),d.tag=2;var p=s.updateQueue;if(p!==null){p=p.shared;var m=p.pending;m===null?d.next=d:(d.next=m.next,m.next=d),p.pending=d}}s.lanes|=r,d=s.alternate,d!==null&&(d.lanes|=r),cs(s.return,r,n),o.lanes|=r;break}d=d.next}}else if(s.tag===10)l=s.type===n.type?null:s.child;else if(s.tag===18){if(l=s.return,l===null)throw Error(D(341));l.lanes|=r,o=l.alternate,o!==null&&(o.lanes|=r),cs(l,r,n),l=s.sibling}else l=s.child;if(l!==null)l.return=s;else for(l=s;l!==null;){if(l===n){l=null;break}if(s=l.sibling,s!==null){s.return=l.return,l=s;break}l=l.return}s=l}ye(e,n,i.children,r),n=n.child}return n;case 9:return i=n.type,a=n.pendingProps.children,yt(n,r),i=Ue(i),a=a(i),n.flags|=1,ye(e,n,a,r),n.child;case 14:return a=n.type,i=We(a,n.pendingProps),i=We(a.type,i),So(e,n,a,i,r);case 15:return Xc(e,n,n.type,n.pendingProps,r);case 17:return a=n.type,i=n.pendingProps,i=n.elementType===a?i:We(a,i),ta(e,n),n.tag=1,Ee(a)?(e=!0,ya(n)):e=!1,yt(n,r),Yc(n,a,i),ps(n,a,i,r),hs(null,n,a,!0,e,r);case 19:return tu(e,n,r);case 22:return Zc(e,n,r)}throw Error(D(156,n.tag))};function vu(e,n){return qd(e,n)}function qf(e,n,r,a){this.tag=e,this.key=r,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function _e(e,n,r,a){return new qf(e,n,r,a)}function yl(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Hf(e){if(typeof e=="function")return yl(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Os)return 11;if(e===_s)return 14}return 2}function An(e,n){var r=e.alternate;return r===null?(r=_e(e.tag,n,e.key,e.mode),r.elementType=e.elementType,r.type=e.type,r.stateNode=e.stateNode,r.alternate=e,e.alternate=r):(r.pendingProps=n,r.type=e.type,r.flags=0,r.subtreeFlags=0,r.deletions=null),r.flags=e.flags&14680064,r.childLanes=e.childLanes,r.lanes=e.lanes,r.child=e.child,r.memoizedProps=e.memoizedProps,r.memoizedState=e.memoizedState,r.updateQueue=e.updateQueue,n=e.dependencies,r.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},r.sibling=e.sibling,r.index=e.index,r.ref=e.ref,r}function ia(e,n,r,a,i,s){var l=2;if(a=e,typeof e=="function")yl(e)&&(l=1);else if(typeof e=="string")l=5;else e:switch(e){case at:return Qn(r.children,i,s,n);case Fs:l=8,i|=8;break;case Mi:return e=_e(12,r,n,i|2),e.elementType=Mi,e.lanes=s,e;case Fi:return e=_e(13,r,n,i),e.elementType=Fi,e.lanes=s,e;case Oi:return e=_e(19,r,n,i),e.elementType=Oi,e.lanes=s,e;case Pd:return qa(r,i,s,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Cd:l=10;break e;case Ed:l=9;break e;case Os:l=11;break e;case _s:l=14;break e;case hn:l=16,a=null;break e}throw Error(D(130,e==null?e:typeof e,""))}return n=_e(l,r,n,i),n.elementType=e,n.type=a,n.lanes=s,n}function Qn(e,n,r,a){return e=_e(7,e,a,n),e.lanes=r,e}function qa(e,n,r,a){return e=_e(22,e,a,n),e.elementType=Pd,e.lanes=r,e.stateNode={isHidden:!1},e}function wi(e,n,r){return e=_e(6,e,null,n),e.lanes=r,e}function ki(e,n,r){return n=_e(4,e.children!==null?e.children:[],e.key,n),n.lanes=r,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function Qf(e,n,r,a,i){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ri(0),this.expirationTimes=ri(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ri(0),this.identifierPrefix=a,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function bl(e,n,r,a,i,s,l,o,d){return e=new Qf(e,n,r,o,d),n===1?(n=1,s===!0&&(n|=8)):n=0,s=_e(3,null,null,n),e.current=s,s.stateNode=e,s.memoizedState={element:a,isDehydrated:r,cache:null,transitions:null,pendingSuspenseBoundaries:null},rl(s),e}function Yf(e,n,r){var a=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:rt,key:a==null?null:""+a,children:e,containerInfo:n,implementation:r}}function yu(e){if(!e)return Rn;e=e._reactInternals;e:{if(et(e)!==e||e.tag!==1)throw Error(D(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(Ee(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(D(171))}if(e.tag===1){var r=e.type;if(Ee(r))return yc(e,r,n)}return n}function bu(e,n,r,a,i,s,l,o,d){return e=bl(r,a,!0,e,i,s,l,o,d),e.context=yu(null),r=e.current,a=be(),i=Pn(r),s=on(a,i),s.callback=n??null,Cn(r,s,i),e.current.lanes=i,wr(e,i,a),Pe(e,a),e}function Ha(e,n,r,a){var i=n.current,s=be(),l=Pn(i);return r=yu(r),n.context===null?n.context=r:n.pendingContext=r,n=on(s,l),n.payload={element:e},a=a===void 0?null:a,a!==null&&(n.callback=a),e=Cn(i,n,l),e!==null&&(Ye(e,i,l,s),Jr(e,i,l)),l}function Ra(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Fo(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var r=e.retryLane;e.retryLane=r!==0&&r<n?r:n}}function jl(e,n){Fo(e,n),(e=e.alternate)&&Fo(e,n)}function Kf(){return null}var ju=typeof reportError=="function"?reportError:function(e){console.error(e)};function wl(e){this._internalRoot=e}Qa.prototype.render=wl.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(D(409));Ha(e,n,null,null)};Qa.prototype.unmount=wl.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;Zn(function(){Ha(null,e,null,null)}),n[cn]=null}};function Qa(e){this._internalRoot=e}Qa.prototype.unstable_scheduleHydration=function(e){if(e){var n=Zd();e={blockedOn:null,target:e,priority:n};for(var r=0;r<xn.length&&n!==0&&n<xn[r].priority;r++);xn.splice(r,0,e),r===0&&ec(e)}};function kl(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function Ya(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Oo(){}function Gf(e,n,r,a,i){if(i){if(typeof a=="function"){var s=a;a=function(){var p=Ra(l);s.call(p)}}var l=bu(n,a,e,0,null,!1,!1,"",Oo);return e._reactRootContainer=l,e[cn]=l.current,cr(e.nodeType===8?e.parentNode:e),Zn(),l}for(;i=e.lastChild;)e.removeChild(i);if(typeof a=="function"){var o=a;a=function(){var p=Ra(d);o.call(p)}}var d=bl(e,0,!1,null,null,!1,!1,"",Oo);return e._reactRootContainer=d,e[cn]=d.current,cr(e.nodeType===8?e.parentNode:e),Zn(function(){Ha(n,d,r,a)}),d}function Ka(e,n,r,a,i){var s=r._reactRootContainer;if(s){var l=s;if(typeof i=="function"){var o=i;i=function(){var d=Ra(l);o.call(d)}}Ha(n,l,e,i)}else l=Gf(r,n,e,i,a);return Ra(l)}Gd=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var r=qt(n.pendingLanes);r!==0&&($s(n,r|1),Pe(n,te()),!(V&6)&&(Et=te()+500,Ln()))}break;case 13:Zn(function(){var a=un(e,1);if(a!==null){var i=be();Ye(a,e,1,i)}}),jl(e,1)}};Vs=function(e){if(e.tag===13){var n=un(e,134217728);if(n!==null){var r=be();Ye(n,e,134217728,r)}jl(e,134217728)}};Xd=function(e){if(e.tag===13){var n=Pn(e),r=un(e,n);if(r!==null){var a=be();Ye(r,e,n,a)}jl(e,n)}};Zd=function(){return W};Jd=function(e,n){var r=W;try{return W=e,n()}finally{W=r}};Yi=function(e,n,r){switch(n){case"input":if(Ui(e,r),n=r.name,r.type==="radio"&&n!=null){for(r=e;r.parentNode;)r=r.parentNode;for(r=r.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<r.length;n++){var a=r[n];if(a!==e&&a.form===e.form){var i=_a(a);if(!i)throw Error(D(90));Td(a),Ui(a,i)}}}break;case"textarea":Rd(e,r);break;case"select":n=r.value,n!=null&&ht(e,!!r.multiple,n,!1)}};_d=gl;Bd=Zn;var Xf={usingClientEntryPoint:!1,Events:[Nr,ot,_a,Fd,Od,gl]},$t={findFiberByHostInstance:Vn,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},Zf={bundleType:$t.bundleType,version:$t.version,rendererPackageName:$t.rendererPackageName,rendererConfig:$t.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:mn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Vd(e),e===null?null:e.stateNode},findFiberByHostInstance:$t.findFiberByHostInstance||Kf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var qr=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!qr.isDisabled&&qr.supportsFiber)try{La=qr.inject(Zf),en=qr}catch{}}ze.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Xf;ze.createPortal=function(e,n){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!kl(n))throw Error(D(200));return Yf(e,n,null,r)};ze.createRoot=function(e,n){if(!kl(e))throw Error(D(299));var r=!1,a="",i=ju;return n!=null&&(n.unstable_strictMode===!0&&(r=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),n=bl(e,1,!1,null,null,r,!1,a,i),e[cn]=n.current,cr(e.nodeType===8?e.parentNode:e),new wl(n)};ze.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(D(188)):(e=Object.keys(e).join(","),Error(D(268,e)));return e=Vd(n),e=e===null?null:e.stateNode,e};ze.flushSync=function(e){return Zn(e)};ze.hydrate=function(e,n,r){if(!Ya(n))throw Error(D(200));return Ka(null,e,n,!0,r)};ze.hydrateRoot=function(e,n,r){if(!kl(e))throw Error(D(405));var a=r!=null&&r.hydratedSources||null,i=!1,s="",l=ju;if(r!=null&&(r.unstable_strictMode===!0&&(i=!0),r.identifierPrefix!==void 0&&(s=r.identifierPrefix),r.onRecoverableError!==void 0&&(l=r.onRecoverableError)),n=bu(n,null,e,1,r??null,i,!1,s,l),e[cn]=n.current,cr(e),a)for(e=0;e<a.length;e++)r=a[e],i=r._getVersion,i=i(r._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[r,i]:n.mutableSourceEagerHydrationData.push(r,i);return new Qa(n)};ze.render=function(e,n,r){if(!Ya(n))throw Error(D(200));return Ka(null,e,n,!1,r)};ze.unmountComponentAtNode=function(e){if(!Ya(e))throw Error(D(40));return e._reactRootContainer?(Zn(function(){Ka(null,null,e,!1,function(){e._reactRootContainer=null,e[cn]=null})}),!0):!1};ze.unstable_batchedUpdates=gl;ze.unstable_renderSubtreeIntoContainer=function(e,n,r,a){if(!Ya(r))throw Error(D(200));if(e==null||e._reactInternals===void 0)throw Error(D(38));return Ka(e,n,r,!1,a)};ze.version="18.3.1-next-f1338f8080-20240426";function wu(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(wu)}catch(e){console.error(e)}}wu(),wd.exports=ze;var Jf=wd.exports,_o=Jf;Ii.createRoot=_o.createRoot,Ii.hydrateRoot=_o.hydrateRoot;/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function yr(){return yr=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},yr.apply(this,arguments)}var jn;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(jn||(jn={}));const Bo="popstate";function eh(e){e===void 0&&(e={});function n(a,i){let{pathname:s,search:l,hash:o}=a.location;return Es("",{pathname:s,search:l,hash:o},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function r(a,i){return typeof i=="string"?i:za(i)}return th(n,r,null,e)}function re(e,n){if(e===!1||e===null||typeof e>"u")throw new Error(n)}function Nl(e,n){if(!e){typeof console<"u"&&console.warn(n);try{throw new Error(n)}catch{}}}function nh(){return Math.random().toString(36).substr(2,8)}function Uo(e,n){return{usr:e.state,key:e.key,idx:n}}function Es(e,n,r,a){return r===void 0&&(r=null),yr({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof n=="string"?Dt(n):n,{state:r,key:n&&n.key||a||nh()})}function za(e){let{pathname:n="/",search:r="",hash:a=""}=e;return r&&r!=="?"&&(n+=r.charAt(0)==="?"?r:"?"+r),a&&a!=="#"&&(n+=a.charAt(0)==="#"?a:"#"+a),n}function Dt(e){let n={};if(e){let r=e.indexOf("#");r>=0&&(n.hash=e.substr(r),e=e.substr(0,r));let a=e.indexOf("?");a>=0&&(n.search=e.substr(a),e=e.substr(0,a)),e&&(n.pathname=e)}return n}function th(e,n,r,a){a===void 0&&(a={});let{window:i=document.defaultView,v5Compat:s=!1}=a,l=i.history,o=jn.Pop,d=null,p=m();p==null&&(p=0,l.replaceState(yr({},l.state,{idx:p}),""));function m(){return(l.state||{idx:null}).idx}function g(){o=jn.Pop;let b=m(),h=b==null?null:b-p;p=b,d&&d({action:o,location:k.location,delta:h})}function u(b,h){o=jn.Push;let f=Es(k.location,b,h);p=m()+1;let v=Uo(f,p),E=k.createHref(f);try{l.pushState(v,"",E)}catch(j){if(j instanceof DOMException&&j.name==="DataCloneError")throw j;i.location.assign(E)}s&&d&&d({action:o,location:k.location,delta:1})}function y(b,h){o=jn.Replace;let f=Es(k.location,b,h);p=m();let v=Uo(f,p),E=k.createHref(f);l.replaceState(v,"",E),s&&d&&d({action:o,location:k.location,delta:0})}function N(b){let h=i.location.origin!=="null"?i.location.origin:i.location.href,f=typeof b=="string"?b:za(b);return f=f.replace(/ $/,"%20"),re(h,"No window.location.(origin|href) available to create URL for href: "+f),new URL(f,h)}let k={get action(){return o},get location(){return e(i,l)},listen(b){if(d)throw new Error("A history only accepts one active listener");return i.addEventListener(Bo,g),d=b,()=>{i.removeEventListener(Bo,g),d=null}},createHref(b){return n(i,b)},createURL:N,encodeLocation(b){let h=N(b);return{pathname:h.pathname,search:h.search,hash:h.hash}},push:u,replace:y,go(b){return l.go(b)}};return k}var $o;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})($o||($o={}));function rh(e,n,r){return r===void 0&&(r="/"),ah(e,n,r)}function ah(e,n,r,a){let i=typeof n=="string"?Dt(n):n,s=Sl(i.pathname||"/",r);if(s==null)return null;let l=ku(e);ih(l);let o=null;for(let d=0;o==null&&d<l.length;++d){let p=xh(s);o=fh(l[d],p)}return o}function ku(e,n,r,a){n===void 0&&(n=[]),r===void 0&&(r=[]),a===void 0&&(a="");let i=(s,l,o)=>{let d={relativePath:o===void 0?s.path||"":o,caseSensitive:s.caseSensitive===!0,childrenIndex:l,route:s};d.relativePath.startsWith("/")&&(re(d.relativePath.startsWith(a),'Absolute route path "'+d.relativePath+'" nested under path '+('"'+a+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),d.relativePath=d.relativePath.slice(a.length));let p=Tn([a,d.relativePath]),m=r.concat(d);s.children&&s.children.length>0&&(re(s.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+p+'".')),ku(s.children,n,m,p)),!(s.path==null&&!s.index)&&n.push({path:p,score:ph(p,s.index),routesMeta:m})};return e.forEach((s,l)=>{var o;if(s.path===""||!((o=s.path)!=null&&o.includes("?")))i(s,l);else for(let d of Nu(s.path))i(s,l,d)}),n}function Nu(e){let n=e.split("/");if(n.length===0)return[];let[r,...a]=n,i=r.endsWith("?"),s=r.replace(/\?$/,"");if(a.length===0)return i?[s,""]:[s];let l=Nu(a.join("/")),o=[];return o.push(...l.map(d=>d===""?s:[s,d].join("/"))),i&&o.push(...l),o.map(d=>e.startsWith("/")&&d===""?"/":d)}function ih(e){e.sort((n,r)=>n.score!==r.score?r.score-n.score:mh(n.routesMeta.map(a=>a.childrenIndex),r.routesMeta.map(a=>a.childrenIndex)))}const sh=/^:[\w-]+$/,lh=3,oh=2,dh=1,ch=10,uh=-2,Vo=e=>e==="*";function ph(e,n){let r=e.split("/"),a=r.length;return r.some(Vo)&&(a+=uh),n&&(a+=oh),r.filter(i=>!Vo(i)).reduce((i,s)=>i+(sh.test(s)?lh:s===""?dh:ch),a)}function mh(e,n){return e.length===n.length&&e.slice(0,-1).every((a,i)=>a===n[i])?e[e.length-1]-n[n.length-1]:0}function fh(e,n,r){let{routesMeta:a}=e,i={},s="/",l=[];for(let o=0;o<a.length;++o){let d=a[o],p=o===a.length-1,m=s==="/"?n:n.slice(s.length)||"/",g=hh({path:d.relativePath,caseSensitive:d.caseSensitive,end:p},m),u=d.route;if(!g)return null;Object.assign(i,g.params),l.push({params:i,pathname:Tn([s,g.pathname]),pathnameBase:wh(Tn([s,g.pathnameBase])),route:u}),g.pathnameBase!=="/"&&(s=Tn([s,g.pathnameBase]))}return l}function hh(e,n){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[r,a]=gh(e.path,e.caseSensitive,e.end),i=n.match(r);if(!i)return null;let s=i[0],l=s.replace(/(.)\/+$/,"$1"),o=i.slice(1);return{params:a.reduce((p,m,g)=>{let{paramName:u,isOptional:y}=m;if(u==="*"){let k=o[g]||"";l=s.slice(0,s.length-k.length).replace(/(.)\/+$/,"$1")}const N=o[g];return y&&!N?p[u]=void 0:p[u]=(N||"").replace(/%2F/g,"/"),p},{}),pathname:s,pathnameBase:l,pattern:e}}function gh(e,n,r){n===void 0&&(n=!1),r===void 0&&(r=!0),Nl(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let a=[],i="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(l,o,d)=>(a.push({paramName:o,isOptional:d!=null}),d?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(a.push({paramName:"*"}),i+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):r?i+="\\/*$":e!==""&&e!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,n?void 0:"i"),a]}function xh(e){try{return e.split("/").map(n=>decodeURIComponent(n).replace(/\//g,"%2F")).join("/")}catch(n){return Nl(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+n+").")),e}}function Sl(e,n){if(n==="/")return e;if(!e.toLowerCase().startsWith(n.toLowerCase()))return null;let r=n.endsWith("/")?n.length-1:n.length,a=e.charAt(r);return a&&a!=="/"?null:e.slice(r)||"/"}const vh=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,yh=e=>vh.test(e);function bh(e,n){n===void 0&&(n="/");let{pathname:r,search:a="",hash:i=""}=typeof e=="string"?Dt(e):e,s;if(r)if(yh(r))s=r;else{if(r.includes("//")){let l=r;r=r.replace(/\/\/+/g,"/"),Nl(!1,"Pathnames cannot have embedded double slashes - normalizing "+(l+" -> "+r))}r.startsWith("/")?s=Wo(r.substring(1),"/"):s=Wo(r,n)}else s=n;return{pathname:s,search:kh(a),hash:Nh(i)}}function Wo(e,n){let r=n.replace(/\/+$/,"").split("/");return e.split("/").forEach(i=>{i===".."?r.length>1&&r.pop():i!=="."&&r.push(i)}),r.length>1?r.join("/"):"/"}function Ni(e,n,r,a){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+n+"` field ["+JSON.stringify(a)+"].  Please separate it out to the ")+("`to."+r+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function jh(e){return e.filter((n,r)=>r===0||n.route.path&&n.route.path.length>0)}function Cl(e,n){let r=jh(e);return n?r.map((a,i)=>i===r.length-1?a.pathname:a.pathnameBase):r.map(a=>a.pathnameBase)}function El(e,n,r,a){a===void 0&&(a=!1);let i;typeof e=="string"?i=Dt(e):(i=yr({},e),re(!i.pathname||!i.pathname.includes("?"),Ni("?","pathname","search",i)),re(!i.pathname||!i.pathname.includes("#"),Ni("#","pathname","hash",i)),re(!i.search||!i.search.includes("#"),Ni("#","search","hash",i)));let s=e===""||i.pathname==="",l=s?"/":i.pathname,o;if(l==null)o=r;else{let g=n.length-1;if(!a&&l.startsWith("..")){let u=l.split("/");for(;u[0]==="..";)u.shift(),g-=1;i.pathname=u.join("/")}o=g>=0?n[g]:"/"}let d=bh(i,o),p=l&&l!=="/"&&l.endsWith("/"),m=(s||l===".")&&r.endsWith("/");return!d.pathname.endsWith("/")&&(p||m)&&(d.pathname+="/"),d}const Tn=e=>e.join("/").replace(/\/\/+/g,"/"),wh=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),kh=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Nh=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function Sh(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const Su=["post","put","patch","delete"];new Set(Su);const Ch=["get",...Su];new Set(Ch);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function br(){return br=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},br.apply(this,arguments)}const Pl=S.createContext(null),Eh=S.createContext(null),Mn=S.createContext(null),Ga=S.createContext(null),Fn=S.createContext({outlet:null,matches:[],isDataRoute:!1}),Cu=S.createContext(null);function Ph(e,n){let{relative:r}=n===void 0?{}:n;Rt()||re(!1);let{basename:a,navigator:i}=S.useContext(Mn),{hash:s,pathname:l,search:o}=Pu(e,{relative:r}),d=l;return a!=="/"&&(d=l==="/"?a:Tn([a,l])),i.createHref({pathname:d,search:o,hash:s})}function Rt(){return S.useContext(Ga)!=null}function zt(){return Rt()||re(!1),S.useContext(Ga).location}function Eu(e){S.useContext(Mn).static||S.useLayoutEffect(e)}function Al(){let{isDataRoute:e}=S.useContext(Fn);return e?Uh():Ah()}function Ah(){Rt()||re(!1);let e=S.useContext(Pl),{basename:n,future:r,navigator:a}=S.useContext(Mn),{matches:i}=S.useContext(Fn),{pathname:s}=zt(),l=JSON.stringify(Cl(i,r.v7_relativeSplatPath)),o=S.useRef(!1);return Eu(()=>{o.current=!0}),S.useCallback(function(p,m){if(m===void 0&&(m={}),!o.current)return;if(typeof p=="number"){a.go(p);return}let g=El(p,JSON.parse(l),s,m.relative==="path");e==null&&n!=="/"&&(g.pathname=g.pathname==="/"?n:Tn([n,g.pathname])),(m.replace?a.replace:a.push)(g,m.state,m)},[n,a,l,s,e])}function Pu(e,n){let{relative:r}=n===void 0?{}:n,{future:a}=S.useContext(Mn),{matches:i}=S.useContext(Fn),{pathname:s}=zt(),l=JSON.stringify(Cl(i,a.v7_relativeSplatPath));return S.useMemo(()=>El(e,JSON.parse(l),s,r==="path"),[e,l,s,r])}function Th(e,n){return Dh(e,n)}function Dh(e,n,r,a){Rt()||re(!1);let{navigator:i}=S.useContext(Mn),{matches:s}=S.useContext(Fn),l=s[s.length-1],o=l?l.params:{};l&&l.pathname;let d=l?l.pathnameBase:"/";l&&l.route;let p=zt(),m;if(n){var g;let b=typeof n=="string"?Dt(n):n;d==="/"||(g=b.pathname)!=null&&g.startsWith(d)||re(!1),m=b}else m=p;let u=m.pathname||"/",y=u;if(d!=="/"){let b=d.replace(/^\//,"").split("/");y="/"+u.replace(/^\//,"").split("/").slice(b.length).join("/")}let N=rh(e,{pathname:y}),k=Mh(N&&N.map(b=>Object.assign({},b,{params:Object.assign({},o,b.params),pathname:Tn([d,i.encodeLocation?i.encodeLocation(b.pathname).pathname:b.pathname]),pathnameBase:b.pathnameBase==="/"?d:Tn([d,i.encodeLocation?i.encodeLocation(b.pathnameBase).pathname:b.pathnameBase])})),s,r,a);return n&&k?S.createElement(Ga.Provider,{value:{location:br({pathname:"/",search:"",hash:"",state:null,key:"default"},m),navigationType:jn.Pop}},k):k}function Rh(){let e=Bh(),n=Sh(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),r=e instanceof Error?e.stack:null,i={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return S.createElement(S.Fragment,null,S.createElement("h2",null,"Unexpected Application Error!"),S.createElement("h3",{style:{fontStyle:"italic"}},n),r?S.createElement("pre",{style:i},r):null,null)}const zh=S.createElement(Rh,null);class Ih extends S.Component{constructor(n){super(n),this.state={location:n.location,revalidation:n.revalidation,error:n.error}}static getDerivedStateFromError(n){return{error:n}}static getDerivedStateFromProps(n,r){return r.location!==n.location||r.revalidation!=="idle"&&n.revalidation==="idle"?{error:n.error,location:n.location,revalidation:n.revalidation}:{error:n.error!==void 0?n.error:r.error,location:r.location,revalidation:n.revalidation||r.revalidation}}componentDidCatch(n,r){console.error("React Router caught the following error during render",n,r)}render(){return this.state.error!==void 0?S.createElement(Fn.Provider,{value:this.props.routeContext},S.createElement(Cu.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function Lh(e){let{routeContext:n,match:r,children:a}=e,i=S.useContext(Pl);return i&&i.static&&i.staticContext&&(r.route.errorElement||r.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=r.route.id),S.createElement(Fn.Provider,{value:n},a)}function Mh(e,n,r,a){var i;if(n===void 0&&(n=[]),r===void 0&&(r=null),a===void 0&&(a=null),e==null){var s;if(!r)return null;if(r.errors)e=r.matches;else if((s=a)!=null&&s.v7_partialHydration&&n.length===0&&!r.initialized&&r.matches.length>0)e=r.matches;else return null}let l=e,o=(i=r)==null?void 0:i.errors;if(o!=null){let m=l.findIndex(g=>g.route.id&&(o==null?void 0:o[g.route.id])!==void 0);m>=0||re(!1),l=l.slice(0,Math.min(l.length,m+1))}let d=!1,p=-1;if(r&&a&&a.v7_partialHydration)for(let m=0;m<l.length;m++){let g=l[m];if((g.route.HydrateFallback||g.route.hydrateFallbackElement)&&(p=m),g.route.id){let{loaderData:u,errors:y}=r,N=g.route.loader&&u[g.route.id]===void 0&&(!y||y[g.route.id]===void 0);if(g.route.lazy||N){d=!0,p>=0?l=l.slice(0,p+1):l=[l[0]];break}}}return l.reduceRight((m,g,u)=>{let y,N=!1,k=null,b=null;r&&(y=o&&g.route.id?o[g.route.id]:void 0,k=g.route.errorElement||zh,d&&(p<0&&u===0?($h("route-fallback"),N=!0,b=null):p===u&&(N=!0,b=g.route.hydrateFallbackElement||null)));let h=n.concat(l.slice(0,u+1)),f=()=>{let v;return y?v=k:N?v=b:g.route.Component?v=S.createElement(g.route.Component,null):g.route.element?v=g.route.element:v=m,S.createElement(Lh,{match:g,routeContext:{outlet:m,matches:h,isDataRoute:r!=null},children:v})};return r&&(g.route.ErrorBoundary||g.route.errorElement||u===0)?S.createElement(Ih,{location:r.location,revalidation:r.revalidation,component:k,error:y,children:f(),routeContext:{outlet:null,matches:h,isDataRoute:!0}}):f()},null)}var Au=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(Au||{}),Tu=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(Tu||{});function Fh(e){let n=S.useContext(Pl);return n||re(!1),n}function Oh(e){let n=S.useContext(Eh);return n||re(!1),n}function _h(e){let n=S.useContext(Fn);return n||re(!1),n}function Du(e){let n=_h(),r=n.matches[n.matches.length-1];return r.route.id||re(!1),r.route.id}function Bh(){var e;let n=S.useContext(Cu),r=Oh(),a=Du();return n!==void 0?n:(e=r.errors)==null?void 0:e[a]}function Uh(){let{router:e}=Fh(Au.UseNavigateStable),n=Du(Tu.UseNavigateStable),r=S.useRef(!1);return Eu(()=>{r.current=!0}),S.useCallback(function(i,s){s===void 0&&(s={}),r.current&&(typeof i=="number"?e.navigate(i):e.navigate(i,br({fromRouteId:n},s)))},[e,n])}const qo={};function $h(e,n,r){qo[e]||(qo[e]=!0)}function Vh(e,n){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function Ru(e){let{to:n,replace:r,state:a,relative:i}=e;Rt()||re(!1);let{future:s,static:l}=S.useContext(Mn),{matches:o}=S.useContext(Fn),{pathname:d}=zt(),p=Al(),m=El(n,Cl(o,s.v7_relativeSplatPath),d,i==="path"),g=JSON.stringify(m);return S.useEffect(()=>p(JSON.parse(g),{replace:r,state:a,relative:i}),[p,g,i,r,a]),null}function ke(e){re(!1)}function Wh(e){let{basename:n="/",children:r=null,location:a,navigationType:i=jn.Pop,navigator:s,static:l=!1,future:o}=e;Rt()&&re(!1);let d=n.replace(/^\/*/,"/"),p=S.useMemo(()=>({basename:d,navigator:s,static:l,future:br({v7_relativeSplatPath:!1},o)}),[d,o,s,l]);typeof a=="string"&&(a=Dt(a));let{pathname:m="/",search:g="",hash:u="",state:y=null,key:N="default"}=a,k=S.useMemo(()=>{let b=Sl(m,d);return b==null?null:{location:{pathname:b,search:g,hash:u,state:y,key:N},navigationType:i}},[d,m,g,u,y,N,i]);return k==null?null:S.createElement(Mn.Provider,{value:p},S.createElement(Ga.Provider,{children:r,value:k}))}function qh(e){let{children:n,location:r}=e;return Th(Ps(n),r)}new Promise(()=>{});function Ps(e,n){n===void 0&&(n=[]);let r=[];return S.Children.forEach(e,(a,i)=>{if(!S.isValidElement(a))return;let s=[...n,i];if(a.type===S.Fragment){r.push.apply(r,Ps(a.props.children,s));return}a.type!==ke&&re(!1),!a.props.index||!a.props.children||re(!1);let l={id:a.props.id||s.join("-"),caseSensitive:a.props.caseSensitive,element:a.props.element,Component:a.props.Component,index:a.props.index,path:a.props.path,loader:a.props.loader,action:a.props.action,errorElement:a.props.errorElement,ErrorBoundary:a.props.ErrorBoundary,hasErrorBoundary:a.props.ErrorBoundary!=null||a.props.errorElement!=null,shouldRevalidate:a.props.shouldRevalidate,handle:a.props.handle,lazy:a.props.lazy};a.props.children&&(l.children=Ps(a.props.children,s)),r.push(l)}),r}/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function As(){return As=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var r=arguments[n];for(var a in r)Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a])}return e},As.apply(this,arguments)}function Hh(e,n){if(e==null)return{};var r={},a=Object.keys(e),i,s;for(s=0;s<a.length;s++)i=a[s],!(n.indexOf(i)>=0)&&(r[i]=e[i]);return r}function Qh(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function Yh(e,n){return e.button===0&&(!n||n==="_self")&&!Qh(e)}const Kh=["onClick","relative","reloadDocument","replace","state","target","to","preventScrollReset","viewTransition"],Gh="6";try{window.__reactRouterVersion=Gh}catch{}const Xh="startTransition",Ho=Up[Xh];function Zh(e){let{basename:n,children:r,future:a,window:i}=e,s=S.useRef();s.current==null&&(s.current=eh({window:i,v5Compat:!0}));let l=s.current,[o,d]=S.useState({action:l.action,location:l.location}),{v7_startTransition:p}=a||{},m=S.useCallback(g=>{p&&Ho?Ho(()=>d(g)):d(g)},[d,p]);return S.useLayoutEffect(()=>l.listen(m),[l,m]),S.useEffect(()=>Vh(a),[a]),S.createElement(Wh,{basename:n,children:r,location:o.location,navigationType:o.action,navigator:l,future:a})}const Jh=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u",eg=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,Xa=S.forwardRef(function(n,r){let{onClick:a,relative:i,reloadDocument:s,replace:l,state:o,target:d,to:p,preventScrollReset:m,viewTransition:g}=n,u=Hh(n,Kh),{basename:y}=S.useContext(Mn),N,k=!1;if(typeof p=="string"&&eg.test(p)&&(N=p,Jh))try{let v=new URL(window.location.href),E=p.startsWith("//")?new URL(v.protocol+p):new URL(p),j=Sl(E.pathname,y);E.origin===v.origin&&j!=null?p=j+E.search+E.hash:k=!0}catch{}let b=Ph(p,{relative:i}),h=ng(p,{replace:l,state:o,target:d,preventScrollReset:m,relative:i,viewTransition:g});function f(v){a&&a(v),v.defaultPrevented||h(v)}return S.createElement("a",As({},u,{href:N||b,onClick:k||s?a:f,ref:r,target:d}))});var Qo;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(Qo||(Qo={}));var Yo;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(Yo||(Yo={}));function ng(e,n){let{target:r,replace:a,state:i,preventScrollReset:s,relative:l,viewTransition:o}=n===void 0?{}:n,d=Al(),p=zt(),m=Pu(e,{relative:l});return S.useCallback(g=>{if(Yh(g,r)){g.preventDefault();let u=a!==void 0?a:za(p)===za(m);d(e,{replace:u,state:i,preventScrollReset:s,relative:l,viewTransition:o})}},[p,d,m,a,i,r,e,s,l,o])}const tg=[{key:"dashboard",label:"Dashboard",iconClass:"fa-solid fa-chart-column ico",path:"/admin/dashboard"},{key:"sales",label:"Sales",iconClass:"fa-solid fa-folder-open ico",path:"/admin/sales"},{key:"accounts",label:"Accounts",iconClass:"fa-solid fa-briefcase ico",path:"/admin/accounts"},{key:"operations",label:"Operations",iconClass:"fa-solid fa-gears ico",path:"/admin/operations"},{key:"company",label:"Company",iconClass:"fa-solid fa-building ico",path:"/admin/company"},{key:"services",label:"Services",iconClass:"fa-solid fa-receipt ico",path:"/admin/services"},{key:"users",label:"Users",iconClass:"fa-solid fa-users ico",path:"/admin/users"},{key:"payments",label:"Payments",iconClass:"fa-solid fa-credit-card ico",path:"/admin/payments"},{key:"settings",label:"Settings",iconClass:"fa-solid fa-sliders ico",path:"/admin/settings"}];function tn({adminName:e="Admin"}){const n=zt(),r=Al(),a=S.useRef(null),[i,s]=S.useState(!1),[l,o]=S.useState(()=>{try{return localStorage.getItem("ledger_dark")==="1"}catch{return!1}}),d=S.useMemo(()=>n.pathname,[n.pathname]);S.useLayoutEffect(()=>{const g=document.documentElement,u=document.body;g.classList.toggle("dark-mode",l),u.classList.toggle("dark-mode",l),g.classList.toggle("dark",l),u.classList.toggle("dark",l);try{localStorage.setItem("ledger_dark",l?"1":"0")}catch{}},[l]),S.useEffect(()=>{function g(y){a.current&&!a.current.contains(y.target)&&s(!1)}function u(y){y.key==="Escape"&&s(!1)}return document.addEventListener("click",g),document.addEventListener("keydown",u),()=>{document.removeEventListener("click",g),document.removeEventListener("keydown",u)}},[]);function p(){r("/admin/profile"),s(!1)}function m(){r("/admin/logout"),s(!1)}return t.jsxs("header",{className:"topbar",children:[t.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[t.jsx("div",{className:"top-logo","aria-hidden":"true",children:t.jsx("img",{src:"/assets/images/logowhite.png",alt:"LedgerWorx",className:"nav-logo"})}),t.jsx("nav",{className:"nav-items",children:t.jsx("div",{className:"nav-items-inner",children:tg.map(g=>{const y=d===g.path?"active":"",N=t.jsx("i",{className:g.iconClass});return t.jsxs(Xa,{to:g.path,className:y,children:[N,g.label]},g.key)})})})]}),t.jsx("div",{style:{display:"flex",alignItems:"center",gap:"18px"},children:t.jsx("div",{className:"right-area",children:t.jsxs("div",{className:"admin",style:{marginLeft:"12px"},ref:a,children:[t.jsx("button",{className:"admin-btn",id:"adminBtn",type:"button",onClick:g=>{g.stopPropagation(),s(u=>!u)},children:e}),t.jsxs("div",{className:`dropdown${i?" show":""}`,id:"adminDropdown","aria-hidden":!i,children:[t.jsx("div",{className:"dropdown-item",id:"editProfile",onClick:p,children:"Edit Profile"}),t.jsxs("div",{className:"toggle-row",children:[t.jsx("div",{style:{fontSize:"14px",color:"inherit"},children:"Dark Theme"}),t.jsxs("label",{className:"switch",children:[t.jsx("input",{type:"checkbox",id:"darkToggle",checked:l,onChange:g=>o(g.target.checked)}),t.jsx("span",{className:"slider"})]})]}),t.jsx("div",{className:"dropdown-item",id:"logoutLink",onClick:m,children:"Logout"})]})]})})})]})}const rg=[{count:"45",title:"Total Revenue (AED)",amount:"AED 1,250,000",meta:"4 Packages created"},{count:"90,000",title:"Pending Payments",amount:"AED 90,000",meta:"320 Payments"},{count:"320",title:"Total Invoices",amount:"320",meta:"881 Invoices"},{count:"45,000",title:"Overdue Invoices",amount:"AED 45,000",meta:"13 Packages created"}],Si=[{inv:"INV-1024",company:"Bright Tech",package:"Standard",amount:"AED 20,000",status:"Paid"},{inv:"INV-1025",company:"Emirates Logistics",package:"Premium",amount:"AED 30,000",status:"Pending"},{inv:"INV-1026",company:"Nova Healthcare",package:"Basic",amount:"AED 10,000",status:"Overdue"},{inv:"INV-1025",company:"Simran Kohli",package:"Basic",amount:"AED 10,000",status:"Pending"}],ag=[{inv:"INV-1024",company:"Bright Tech",package:"Standard",amount:"AED 20,000",dueDate:"10-May",status:"Paid"},{inv:"INV-1025",company:"Emirates Logistics",package:"Premium",amount:"AED 30,000",dueDate:"15-May",status:"Pending"}],ig=["Standard","Premium","Basic","Client"],sg=`@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');\r
\r
:root{\r
  --header-dark:#164b4a;\r
  --header-light:#2f8f83;\r
  --header-text:#ffffff;\r
}\r
\r
.topbar{\r
  height:72px;\r
  display:flex;\r
  align-items:center;\r
  justify-content:space-between;\r
  padding:6px 18px;\r
  background:linear-gradient(90deg,var(--header-dark),var(--header-light));\r
  box-shadow:0 6px 18px rgba(0,0,0,.12);\r
  color:var(--header-text);\r
}\r
.topbar .nav-items{ display:flex; gap:18px; align-items:center; margin-left:12px; overflow:auto; }\r
.topbar .nav-items-inner{ display:flex; gap:8px; white-space:nowrap; }\r
.topbar .nav-items a{ display:flex; flex-direction:column; align-items:center; gap:6px; padding:12px 18px; color:rgba(255,255,255,.95); text-decoration:none; border-radius:8px; font-size:13px; opacity:.95; flex:0 0 auto; }\r
.topbar .nav-items a .ico{ font-size:18px; display:block; }\r
.topbar .nav-items a.active{ background:rgba(0,0,0,.12); box-shadow:inset 0 1px 0 rgba(255,255,255,.02); }\r
.topbar .search input{ border:none; padding:10px 16px; border-radius:22px; background:#fff; min-width:300px; }\r
.topbar .right-area{ display:flex; align-items:center; gap:18px; color:#fff; }\r
.topbar .welcome{ text-align:right; }\r
.topbar .welcome strong{ display:block; font-size:16px; }\r
.top-logo{ margin-right:12px; }\r
.nav-logo{ height:34px; display:block; }\r
\r
@media (max-width:900px){\r
  .topbar .search input{ min-width:180px; }\r
  .topbar .nav-items a{ padding:8px 12px; font-size:12px; }\r
}\r
\r
/* ADMIN DROPDOWN */\r
.admin{ position:relative; }\r
.admin-btn{\r
  background:rgba(255,255,255,.18);\r
  border:1px solid rgba(255,255,255,.2);\r
  color:var(--header-text);\r
  padding:10px 18px;\r
  border-radius:999px;\r
  cursor:pointer;\r
  font-weight:700;\r
  min-width:110px;\r
  text-align:center;\r
}\r
.admin-btn::after{ content:" \\25BE"; opacity:.9; margin-left:6px; font-size:12px; }\r
.dropdown{\r
  position:absolute;\r
  right:0;\r
  top:62px;\r
  background:#141b25;\r
  color:#eaf2ff;\r
  border-radius:10px;\r
  box-shadow:0 12px 30px rgba(0,0,0,.3);\r
  border:1px solid rgba(255,255,255,.08);\r
  width:240px;\r
  display:none;\r
  z-index:800;\r
}\r
.dropdown.show{ display:block; }\r
.dropdown .dropdown-item{ padding:12px 14px; cursor:pointer; border-bottom:1px solid rgba(255,255,255,.08); }\r
.dropdown .dropdown-item:last-child{ border-bottom:none; }\r
.dropdown .dropdown-item:hover{ background:rgba(255,255,255,.06); }\r
.dropdown .toggle-row{ display:flex; align-items:center; justify-content:space-between; padding:10px 14px; border-bottom:1px solid rgba(255,255,255,.08); }\r
.switch{ position:relative; width:52px; height:28px; }\r
.switch input{ opacity:0; width:0; height:0; }\r
.slider{ position:absolute; inset:0; background:#2c3441; border-radius:28px; transition:.25s; border:1px solid rgba(255,255,255,.15); }\r
.slider:before{ content:""; position:absolute; height:22px; width:22px; left:2px; bottom:2px; background:#fff; border-radius:50%; transition:.25s; }\r
.switch input:checked + .slider{ background:var(--header-light); border-color:transparent; }\r
.switch input:checked + .slider:before{ transform:translateX(24px); }\r
\r
/* Dark theme styles for dropdown when body.dark */\r
body.dark .dropdown{ background:#1f2630; color:#f1f1f1; }\r
body.dark .dropdown .dropdown-item{ border-bottom:1px solid rgba(255,255,255,.08); }\r
`,lg=`:root {\r
  --primary: #1f8f8b;\r
  --secondary: #2fb7b0;\r
  --accent: #ff6b9d;\r
  --bg-main: #eef1f5;\r
  --bg-soft: #f7f8fb;\r
  --card: #ffffff;\r
  --border: #e5e7eb;\r
  --text-dark: #1f2937;\r
  --text-light: #6b7280;\r
  --success: #22c55e;\r
  --warning: #f59e0b;\r
  --danger: #ef4444;\r
  --info: #3b82f6;\r
  --radius: 14px;\r
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.05);\r
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.08);\r
  --shadow-lg: 0 14px 30px rgba(0, 0, 0, 0.12);\r
}\r
\r
body.dark-mode,\r
body.dark,\r
html.dark body {\r
  --bg-main: #0f172a;\r
  --bg-soft: #1e293b;\r
  --card: #1e293b;\r
  --border: #334155;\r
  --text-dark: #f1f5f9;\r
  --text-light: #cbd5e1;\r
  --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.3);\r
  --shadow-md: 0 4px 16px rgba(0, 0, 0, 0.4);\r
  --shadow-lg: 0 14px 30px rgba(0, 0, 0, 0.5);\r
}\r
\r
* {\r
  box-sizing: border-box;\r
}\r
\r
body {\r
  background: var(--bg-main) !important;\r
  color: var(--text-dark) !important;\r
  transition: background 0.3s ease, color 0.3s ease;\r
}\r
\r
/* Navbar refresh across all admin pages */\r
.topbar,\r
.navbar {\r
  background: linear-gradient(135deg, var(--primary), var(--secondary)) !important;\r
  padding: 14px 24px !important;\r
  height: auto !important;\r
  min-height: 74px;\r
  box-shadow: var(--shadow-md) !important;\r
  position: sticky;\r
  top: 0;\r
  z-index: 1000;\r
  color: #ffffff !important;\r
}\r
\r
.topbar .top-logo {\r
  margin-right: 10px;\r
}\r
\r
.topbar .nav-logo {\r
  height: 36px;\r
}\r
\r
.topbar .nav-items {\r
  gap: 10px !important;\r
  margin-left: 0 !important;\r
  overflow: auto;\r
}\r
\r
.topbar .nav-items-inner {\r
  gap: 6px !important;\r
}\r
\r
.topbar .nav-items a {\r
  color: #ffffff !important;\r
  text-decoration: none;\r
  padding: 10px 14px !important;\r
  border-radius: 10px;\r
  font-size: 13px;\r
  font-weight: 600;\r
  display: inline-flex !important;\r
  flex-direction: row !important;\r
  align-items: center;\r
  gap: 8px;\r
  opacity: 0.95;\r
  position: relative;\r
  transition: background 0.25s ease, opacity 0.25s ease;\r
}\r
\r
.topbar .nav-items a .ico {\r
  font-size: 14px !important;\r
  display: inline-block !important;\r
}\r
\r
.topbar .nav-items a::after {\r
  content: "";\r
  position: absolute;\r
  left: 14px;\r
  bottom: 7px;\r
  width: 0;\r
  height: 2px;\r
  background: rgba(255, 255, 255, 0.95);\r
  transition: width 0.22s ease;\r
}\r
\r
.topbar .nav-items a:hover::after,\r
.topbar .nav-items a.active::after {\r
  width: calc(100% - 28px);\r
}\r
\r
.topbar .nav-items a:hover {\r
  background: rgba(255, 255, 255, 0.16) !important;\r
}\r
\r
.topbar .nav-items a.active {\r
  background: rgba(255, 255, 255, 0.2) !important;\r
}\r
\r
.topbar .search input {\r
  border: 1px solid rgba(255, 255, 255, 0.35) !important;\r
  padding: 10px 16px;\r
  border-radius: 999px;\r
  background: rgba(255, 255, 255, 0.18) !important;\r
  color: #ffffff !important;\r
  min-width: 240px;\r
}\r
\r
.topbar .search input::placeholder {\r
  color: rgba(255, 255, 255, 0.86);\r
}\r
\r
.topbar .right-area {\r
  color: #ffffff !important;\r
}\r
\r
.admin-btn {\r
  background: rgba(255, 255, 255, 0.14) !important;\r
  border: 1px solid rgba(255, 255, 255, 0.35) !important;\r
  color: #ffffff !important;\r
  padding: 9px 16px !important;\r
  border-radius: 999px !important;\r
  font-weight: 600 !important;\r
}\r
\r
.dropdown {\r
  background: var(--card) !important;\r
  color: var(--text-dark) !important;\r
  border: 1px solid var(--border) !important;\r
  border-radius: var(--radius) !important;\r
  box-shadow: var(--shadow-lg) !important;\r
}\r
\r
.dropdown .dropdown-item,\r
.dropdown .toggle-row {\r
  border-bottom: 1px solid var(--border) !important;\r
}\r
\r
.dropdown .dropdown-item:last-child {\r
  border-bottom: none !important;\r
}\r
\r
.dropdown .dropdown-item:hover {\r
  color: #ffffff !important;\r
  background: linear-gradient(90deg, var(--primary), var(--secondary)) !important;\r
}\r
\r
.switch .slider {\r
  background: #cbd5e1 !important;\r
  border: none !important;\r
}\r
\r
.switch input:checked + .slider {\r
  background: var(--primary) !important;\r
}\r
\r
/* Shared color language across modules */\r
.page,\r
.main {\r
  color: var(--text-dark);\r
}\r
\r
.card,\r
.kpi,\r
.stat-card,\r
.permission-card,\r
.role-item,\r
.system-action-card,\r
.log-panel,\r
.modal-content,\r
.sales-report-item,\r
.payroll-item,\r
.upload-box {\r
  background: var(--card) !important;\r
  border: 1px solid var(--border) !important;\r
  border-radius: var(--radius) !important;\r
  color: var(--text-dark) !important;\r
  box-shadow: var(--shadow-sm) !important;\r
}\r
\r
.card:hover,\r
.kpi:hover,\r
.stat-card:hover,\r
.system-action-card:hover {\r
  box-shadow: var(--shadow-md) !important;\r
}\r
\r
/* Dashboard tile palette parity across all admin pages */\r
.kpi,\r
.tiles .tile,\r
.stats-grid .stat-card {\r
  border-radius: 14px !important;\r
  border: 1px solid #e4edf8 !important;\r
  border-top: 4px solid #2b83d7 !important;\r
  background: linear-gradient(160deg, #ffffff, #f4f9ff) !important;\r
  box-shadow: 0 8px 20px rgba(19, 39, 67, 0.08) !important;\r
  color: #274766 !important;\r
}\r
\r
.kpi:nth-child(2),\r
.tiles .tile:nth-child(2),\r
.stats-grid .stat-card:nth-child(2),\r
.stats-grid .stat-card.outstanding,\r
.tiles .tile.green {\r
  border-top-color: #2fbe9a !important;\r
  background: linear-gradient(160deg, #ffffff, #f3fff9) !important;\r
}\r
\r
.kpi:nth-child(3),\r
.tiles .tile:nth-child(3),\r
.stats-grid .stat-card:nth-child(3),\r
.stats-grid .stat-card.total,\r
.tiles .tile.orange {\r
  border-top-color: #f39c12 !important;\r
  background: linear-gradient(160deg, #ffffff, #fffaf2) !important;\r
}\r
\r
.kpi:nth-child(4),\r
.tiles .tile:nth-child(4),\r
.stats-grid .stat-card:nth-child(4),\r
.stats-grid .stat-card.targets,\r
.tiles .tile.gray {\r
  border-top-color: #6f42c1 !important;\r
  background: linear-gradient(160deg, #ffffff, #f8f3ff) !important;\r
}\r
\r
.stats-grid .stat-card.total-sales,\r
.tiles .tile.blue {\r
  border-top-color: #2b83d7 !important;\r
  background: linear-gradient(160deg, #ffffff, #f4f9ff) !important;\r
}\r
\r
.tiles .tile h3,\r
.tiles .tile h4,\r
.tiles .tile .num,\r
.tiles .tile span,\r
.tiles .tile .tile-amount,\r
.stats-grid .stat-card .stat-value,\r
.stats-grid .stat-card h2,\r
.stats-grid .stat-card h3 {\r
  color: #274766 !important;\r
}\r
\r
.tiles .tile p,\r
.tiles .tile small,\r
.tiles .tile .tile-title,\r
.tiles .tile .tile-meta,\r
.stats-grid .stat-card .stat-label,\r
.stats-grid .stat-card p {\r
  color: #5f738a !important;\r
}\r
\r
.tiles .tile .icon,\r
.tiles .tile i {\r
  color: #2b83d7 !important;\r
}\r
\r
/* Match image tile style for Company and Payments */\r
.company-page .tiles .tile,\r
.payments-page .tiles .tile {\r
  position: relative !important;\r
  overflow: hidden !important;\r
  display: flex !important;\r
  flex-direction: column !important;\r
  justify-content: space-between !important;\r
  gap: 10px !important;\r
  min-height: 152px !important;\r
  padding: 20px 18px !important;\r
  background: linear-gradient(160deg, #f3f7fc 0%, #e8edf5 100%) !important;\r
  border: 1px solid #d4dfec !important;\r
  border-top: 4px solid #2f80d7 !important;\r
  border-radius: 18px !important;\r
  box-shadow: 0 12px 26px rgba(19, 39, 67, 0.1) !important;\r
  color: #1f4b78 !important;\r
  transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease !important;\r
}\r
\r
.company-page .tiles .tile::before,\r
.payments-page .tiles .tile::before {\r
  content: "";\r
  position: absolute;\r
  top: 0;\r
  right: 0;\r
  width: 48%;\r
  height: 100%;\r
  background: linear-gradient(130deg, rgba(255, 255, 255, 0.55), rgba(255, 255, 255, 0));\r
  pointer-events: none;\r
}\r
\r
.company-page .tiles .tile:nth-child(2),\r
.payments-page .tiles .tile:nth-child(2) {\r
  background: linear-gradient(160deg, #eff8f5 0%, #e4f1eb 100%) !important;\r
  border-top-color: #2fbe9a !important;\r
}\r
\r
.company-page .tiles .tile:nth-child(3),\r
.payments-page .tiles .tile:nth-child(3) {\r
  background: linear-gradient(160deg, #fbf4e9 0%, #f2ece2 100%) !important;\r
  border-top-color: #f39c12 !important;\r
}\r
\r
.company-page .tiles .tile:nth-child(4),\r
.payments-page .tiles .tile:nth-child(4) {\r
  background: linear-gradient(160deg, #f4f0fb 0%, #ebe5f4 100%) !important;\r
  border-top-color: #6f42c1 !important;\r
}\r
\r
.company-page .tiles .tile:hover,\r
.payments-page .tiles .tile:hover {\r
  transform: translateY(-5px) !important;\r
  box-shadow: 0 18px 30px rgba(19, 39, 67, 0.16) !important;\r
  border-color: #c0d0e4 !important;\r
}\r
\r
.company-page .tiles .tile .icon {\r
  display: none !important;\r
}\r
\r
.company-page .tiles .tile h3,\r
.payments-page .tiles .tile span {\r
  color: #1f4b78 !important;\r
  font-weight: 800 !important;\r
}\r
\r
.company-page .tiles .tile h3,\r
.payments-page .tiles .tile span {\r
  font-size: 42px !important;\r
  line-height: 1.05 !important;\r
  letter-spacing: 0.2px !important;\r
}\r
\r
.payments-page .tiles .tile h4,\r
.company-page .tiles .tile p,\r
.services-page .services .service p,\r
.services-page .services .service .meta {\r
  color: #48627f !important;\r
  font-weight: 600 !important;\r
}\r
\r
.company-page .tiles .tile p,\r
.services-page .services .service .meta {\r
  margin-top: auto !important;\r
}\r
\r
/* Restore visible action buttons on Company/Services/Payments tables */\r
.company-page .action {\r
  background: linear-gradient(135deg, var(--primary), var(--secondary)) !important;\r
  border: 1px solid #7fd8d2 !important;\r
  color: #ffffff !important;\r
  font-weight: 700 !important;\r
}\r
\r
.services-page .action,\r
.payments-page .action {\r
  background: linear-gradient(135deg, #49adf7, #2d8de0) !important;\r
  border: 1px solid #96d0fa !important;\r
  color: #ffffff !important;\r
  font-weight: 700 !important;\r
}\r
\r
.company-page .action.edit,\r
.services-page .action.edit {\r
  background: linear-gradient(135deg, #9aa8b5, #7f8f9f) !important;\r
  border-color: #c6cfd7 !important;\r
}\r
\r
.company-page .action.suspend,\r
.services-page .action.disable {\r
  background: linear-gradient(135deg, #ffb44a, #ea8f16) !important;\r
  border-color: #ffd59e !important;\r
}\r
\r
.company-page .action.approve,\r
.company-page .action.reactivate {\r
  background: linear-gradient(135deg, #2ec68f, #21a976) !important;\r
  border-color: #8be4c3 !important;\r
}\r
\r
.payments-page .action.reject {\r
  background: linear-gradient(135deg, #f0a33a, #e08d21) !important;\r
  border-color: #f1c27f !important;\r
}\r
\r
.company-page .action:hover,\r
.services-page .action:hover,\r
.payments-page .action:hover {\r
  filter: brightness(1.05);\r
}\r
\r
.table,\r
.users-table {\r
  background: var(--card) !important;\r
  color: var(--text-dark);\r
}\r
\r
.table th,\r
.users-table th {\r
  color: var(--text-light) !important;\r
  border-bottom: 2px solid var(--border) !important;\r
  background: rgba(31, 143, 139, 0.06) !important;\r
}\r
\r
.table td,\r
.users-table td {\r
  border-bottom: 1px solid var(--border) !important;\r
  color: var(--text-dark) !important;\r
}\r
\r
.table tbody tr:hover,\r
.users-table tbody tr:hover {\r
  background: linear-gradient(90deg, rgba(31, 143, 139, 0.09) 0%, rgba(31, 143, 139, 0.02) 100%) !important;\r
}\r
\r
.view-all {\r
  color: var(--primary) !important;\r
}\r
\r
.task,\r
.action {\r
  background: var(--bg-soft) !important;\r
  border-color: var(--border) !important;\r
}\r
\r
.task:hover {\r
  background: #e0f2f1 !important;\r
}\r
\r
.action:hover {\r
  background: var(--primary) !important;\r
  color: #ffffff !important;\r
}\r
\r
.badge.success,\r
.green {\r
  background: var(--success) !important;\r
}\r
\r
.badge.warning,\r
.orange {\r
  background: var(--warning) !important;\r
}\r
\r
.badge.danger,\r
.red {\r
  background: var(--danger) !important;\r
}\r
\r
.badge.info,\r
.blue {\r
  background: var(--info) !important;\r
}\r
\r
.btn-primary,\r
.save-btn,\r
.btn-generate,\r
.table-action-btn,\r
.tile-action {\r
  background: linear-gradient(135deg, var(--primary), var(--secondary)) !important;\r
  border: 1px solid transparent !important;\r
  color: #ffffff !important;\r
  box-shadow: var(--shadow-sm);\r
}\r
\r
.btn-primary:hover,\r
.save-btn:hover,\r
.btn-generate:hover,\r
.table-action-btn:hover,\r
.tile-action:hover {\r
  box-shadow: var(--shadow-md);\r
}\r
\r
/* Dark mode refinements */\r
body.dark-mode .topbar,\r
body.dark .topbar,\r
html.dark body .topbar {\r
  background: linear-gradient(135deg, #0f766e, #155e75) !important;\r
}\r
\r
body.dark-mode .topbar .search input,\r
body.dark .topbar .search input,\r
html.dark body .topbar .search input {\r
  background: rgba(15, 23, 42, 0.65) !important;\r
  border-color: rgba(148, 163, 184, 0.55) !important;\r
}\r
\r
body.dark-mode .dropdown,\r
body.dark .dropdown,\r
html.dark body .dropdown {\r
  background: #1e293b !important;\r
  color: var(--text-dark) !important;\r
}\r
\r
body.dark-mode .task:hover,\r
body.dark .task:hover,\r
html.dark body .task:hover {\r
  background: #334155 !important;\r
}\r
\r
body.dark-mode .table tr:hover,\r
body.dark .table tr:hover,\r
html.dark body .table tr:hover {\r
  background: rgba(51, 65, 85, 0.55) !important;\r
}\r
\r
@media (max-width: 1024px) {\r
  .topbar {\r
    padding: 12px 14px !important;\r
  }\r
\r
  .topbar .nav-items {\r
    max-width: 100%;\r
  }\r
\r
  .topbar .search input {\r
    min-width: 180px;\r
  }\r
}\r
\r
@media (max-width: 768px) {\r
  .topbar .search {\r
    display: none;\r
  }\r
\r
  .topbar .nav-items a {\r
    padding: 8px 10px !important;\r
    font-size: 12px;\r
  }\r
\r
  .topbar .nav-items a::after {\r
    left: 10px;\r
    width: 0;\r
  }\r
}\r
`,Hr=new Map;function Ci(e,n){if(!n||typeof document>"u")return()=>{};let r=Hr.get(e);if(r)r.cssText!==n&&(r.cssText=n,r.element.textContent=n);else{const a=document.createElement("style");a.setAttribute("data-admin-style",e),a.textContent=n,document.head.appendChild(a),r={count:0,cssText:n,element:a},Hr.set(e,r)}return r.count+=1,()=>{const a=Hr.get(e);a&&(a.count-=1,a.count<=0&&(a.element.remove(),Hr.delete(e)))}}function Ge({pageKey:e,pageCssText:n,includeHeader:r=!0,includeTheme:a=!0}){S.useLayoutEffect(()=>{const i=[];return r&&i.push(Ci("admin-shared-header",sg)),e&&n&&i.push(Ci(`admin-page-${e}`,n)),a&&i.push(Ci("admin-shared-theme",lg)),()=>{for(let s=i.length-1;s>=0;s-=1)i[s]()}},[r,a,n,e])}const og=`:root{ --primary:#2f8f83; --bg:#eef1f7; --card:#fff; --text:#2c3e50; --muted:#7f8c8d; --line:#e4ecf5; }
*{margin:0;padding:0;box-sizing:border-box;font-family:"Segoe UI",sans-serif}
body{
  background:radial-gradient(circle at 0% 0%, #ffffff 0%, #edf2fa 50%, #e6edf8 100%);
  color:var(--text);
}
.page{padding:24px;max-width:1460px;margin:0 auto}
.breadcrumb{color:var(--muted);margin-bottom:14px;font-size:14px}
.page-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}
.page-header h2{font-size:30px;letter-spacing:.2px}
.accounts-page .tiles{
  display:grid;
  grid-template-columns:repeat(4,minmax(0,1fr));
  gap:14px;
  margin-bottom:20px;
}
.accounts-page .tiles .tile{
  display:flex !important;
  flex-direction:column !important;
  justify-content:space-between !important;
  gap:10px;
  min-height:152px;
  padding:18px;
  border-radius:16px !important;
  border:1px solid #d5e1ef !important;
  border-top:4px solid #2b83d7 !important;
  background:linear-gradient(160deg,#ffffff 0%,#f4f9ff 100%) !important;
  box-shadow:0 10px 22px rgba(14,37,66,.10) !important;
  transition:transform .2s ease, box-shadow .2s ease !important;
}
.accounts-page .tiles .tile:hover{
  transform:translateY(-3px) !important;
  box-shadow:0 14px 28px rgba(14,37,66,.16) !important;
}
.accounts-page .tiles .tile:nth-child(2){
  border-top-color:#2fbe9a !important;
  background:linear-gradient(160deg,#ffffff 0%,#f3fff9 100%) !important;
}
.accounts-page .tiles .tile:nth-child(3){
  border-top-color:#f39c12 !important;
  background:linear-gradient(160deg,#ffffff 0%,#fffaf2 100%) !important;
}
.accounts-page .tiles .tile:nth-child(4){
  border-top-color:#6f42c1 !important;
  background:linear-gradient(160deg,#ffffff 0%,#f8f3ff 100%) !important;
}
.accounts-page .tiles .tile .num{
  font-size:30px;
  line-height:1;
  font-weight:800;
  letter-spacing:.2px;
  color:#224c74 !important;
}
.accounts-page .tiles .tile .tile-title{
  font-size:13px;
  font-weight:600;
  margin:0;
  color:#5f738a !important;
}
.accounts-page .tiles .tile .tile-amount{
  font-size:19px;
  font-weight:800;
  margin:0;
  color:#1f456c !important;
}
.accounts-page .tiles .tile .tile-meta{
  font-size:12px;
  margin:0;
  color:#6f8195 !important;
}
.layout{display:grid;grid-template-columns:1fr;gap:18px}
.card{
  background:linear-gradient(180deg,#ffffff 0%, #fbfdff 100%);
  border:1px solid var(--line);
  border-radius:14px;
  padding:16px;
  box-shadow:0 10px 22px rgba(14,37,66,.08);
}
.card h3,.card h4{color:#1c4268}
.filter-bar{display:flex;gap:10px;flex-wrap:wrap;margin-top:10px}
.filter-control{
  padding:9px 12px;
  border-radius:10px;
  border:1px solid #d2e0ef;
  background:#fff;
  color:#274764;
  font-size:14px;
}
.filter-control:focus{outline:none;border-color:#96bde9;box-shadow:0 0 0 3px rgba(65,105,225,.12)}
table{width:100%;border-collapse:separate;border-spacing:0;margin-top:10px;border:1px solid var(--line);border-radius:12px;overflow:hidden}
th,td{padding:11px 10px;border-bottom:1px solid #edf3fa;text-align:left}
th{background:#f6faff;color:#617992;font-size:12px;text-transform:uppercase;letter-spacing:.45px}
tbody tr:hover{background:#f8fbff}
tbody tr:last-child td{border-bottom:none}
.status{padding:7px 12px;border-radius:999px;font-size:12px;font-weight:700;display:inline-block;border:1px solid transparent}
.paid{background:#dcf7e6;color:#0f6c41;border-color:#bdeacc}
.pending{background:#fff4d8;color:#8b6100;border-color:#ffe1a4}
.overdue{background:#ffe4e4;color:#9f2a2a;border-color:#ffc4c4}
.side-panel .small{font-size:13px;color:var(--muted)}
.pay-btn{
  background:linear-gradient(135deg,#3f87ff,#2f6fda);
  color:#fff;
  padding:9px 14px;
  border-radius:999px;
  border:1px solid #9fc0ff;
  box-shadow:0 8px 16px rgba(47,111,218,.24);
  cursor:pointer;
}
.pay-btn:hover{filter:brightness(1.06)}

.modal-overlay{
  position:fixed;
  inset:0;
  background:rgba(17,30,46,.55);
  display:none;
  align-items:center;
  justify-content:center;
  z-index:1200;
  padding:16px;
}
.modal-overlay.open{
  display:flex;
}
.modal-card{
  width:min(560px,100%);
  background:#fff;
  border:1px solid var(--line);
  border-radius:14px;
  padding:18px;
  box-shadow:0 20px 48px rgba(10,25,41,.22);
}
.modal-header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:12px;
}
.modal-header h3{
  margin:0;
  color:#1c4268;
}
.modal-close{
  border:none;
  background:transparent;
  color:#60758d;
  font-size:18px;
  cursor:pointer;
  line-height:1;
}
.details-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px 12px;
}
.details-item{
  border:1px solid #e2eaf4;
  border-radius:10px;
  background:#f9fcff;
  padding:10px 12px;
  display:flex;
  flex-direction:column;
  gap:4px;
}
.details-item span{
  font-size:12px;
  color:#6f8298;
  text-transform:uppercase;
  letter-spacing:.35px;
}
.details-item strong{
  font-size:14px;
  color:#1f3e62;
}
.modal-actions{
  display:flex;
  justify-content:flex-end;
  margin-top:12px;
}
@media(max-width:1200px){
  .accounts-page .tiles{grid-template-columns:repeat(2,1fr)}
  .layout{grid-template-columns:1fr}
}
@media(max-width:760px){
  .page{padding:16px}
  .page-header{flex-direction:column;align-items:flex-start;gap:10px}
  .page-header h2{font-size:24px}
  .accounts-page .tiles{grid-template-columns:1fr}
  .details-grid{grid-template-columns:1fr}
}
`;function Ko(e){return e==="Paid"?"paid":e==="Pending"?"pending":"overdue"}function dg(){Ge({pageKey:"accounts",pageCssText:og});const[e,n]=S.useState(""),[r,a]=S.useState("All Statuses"),[i,s]=S.useState("All Companies"),[l,o]=S.useState("All Packages"),[d,p]=S.useState(null);S.useEffect(()=>{function b(h){h.key==="Escape"&&p(null)}return document.addEventListener("keydown",b),()=>{document.removeEventListener("keydown",b)}},[]);const m=[...new Set(Si.map(b=>b.status))].sort((b,h)=>b.localeCompare(h)),g=[...new Set(Si.map(b=>b.company))].sort((b,h)=>b.localeCompare(h)),u=e.trim().toLowerCase(),y=Si.filter(b=>{const h=u===""||[b.inv,b.company,b.package,b.amount,b.status].some(j=>j.toLowerCase().includes(u)),f=r==="All Statuses"||b.status===r,v=i==="All Companies"||b.company===i,E=l==="All Packages"||b.package===l;return h&&f&&v&&E});function N(b){p(b)}function k(){p(null)}return t.jsxs(t.Fragment,{children:[t.jsx(tn,{adminName:"Admin"}),t.jsxs("div",{className:"page accounts-page",children:[t.jsx("div",{className:"breadcrumb",children:"Dashboard › Accounts Department"}),t.jsxs("div",{className:"page-header",children:[t.jsx("h2",{children:"Accounts Department"}),t.jsxs("div",{children:[t.jsx("button",{className:"pay-btn",type:"button",children:"Export CSV"})," ",t.jsx("button",{className:"pay-btn",type:"button",children:"Export PDF"})]})]}),t.jsx("div",{className:"tiles",children:rg.map(b=>t.jsxs("div",{className:"tile",children:[t.jsx("div",{className:"num",children:b.count}),t.jsx("div",{className:"tile-title",children:b.title}),t.jsx("div",{className:"tile-amount",children:b.amount}),t.jsx("div",{className:"tile-meta",children:b.meta})]},`${b.title}-${b.amount}`))}),t.jsx("div",{className:"layout",children:t.jsxs("div",{children:[t.jsxs("div",{className:"card",children:[t.jsx("h3",{children:"Invoice List"}),t.jsxs("div",{className:"filter-bar",children:[t.jsx("input",{id:"invoiceSearchInput",className:"filter-control",placeholder:"Search",style:{width:"220px"},value:e,onChange:b=>{n(b.target.value)}}),t.jsxs("select",{id:"invoiceStatusFilter",className:"filter-control",value:r,onChange:b=>{a(b.target.value)},children:[t.jsx("option",{children:"All Statuses"}),m.map(b=>t.jsx("option",{children:b},b))]}),t.jsxs("select",{id:"invoiceCompanyFilter",className:"filter-control",value:i,onChange:b=>{s(b.target.value)},children:[t.jsx("option",{children:"All Companies"}),g.map(b=>t.jsx("option",{children:b},b))]}),t.jsxs("select",{id:"invoicePackageFilter",className:"filter-control",value:l,onChange:b=>{o(b.target.value)},children:[t.jsx("option",{children:"All Packages"}),ig.map(b=>t.jsx("option",{children:b},b))]})]}),t.jsxs("table",{children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Invoice No"}),t.jsx("th",{children:"Company"}),t.jsx("th",{children:"Package"}),t.jsx("th",{children:"Amount (AED)"}),t.jsx("th",{children:"Status"})]})}),t.jsxs("tbody",{id:"invoiceTableBody",children:[y.map(b=>t.jsxs("tr",{className:"invoice-row","data-inv":b.inv,"data-company":b.company,"data-package":b.package,"data-amount":b.amount,"data-status":b.status,children:[t.jsx("td",{children:b.inv}),t.jsx("td",{children:b.company}),t.jsx("td",{children:b.package}),t.jsx("td",{children:b.amount}),t.jsx("td",{children:t.jsx("span",{className:`status ${Ko(b.status)}`,children:b.status})})]},`${b.inv}-${b.company}-${b.package}-${b.amount}-${b.status}`)),y.length===0?t.jsx("tr",{id:"invoiceEmptyState",children:t.jsx("td",{colSpan:"5",style:{textAlign:"center",color:"#7f8c8d"},children:"No invoices found for selected filters."})}):null]})]})]}),t.jsxs("div",{className:"card",style:{marginTop:"16px"},children:[t.jsx("h3",{children:"Invoice List"}),t.jsxs("table",{id:"detailedInvoiceTable",children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Invoice No"}),t.jsx("th",{children:"Company"}),t.jsx("th",{children:"Package"}),t.jsx("th",{children:"Amount (AED)"}),t.jsx("th",{children:"Due Date"}),t.jsx("th",{children:"Status"}),t.jsx("th",{children:"Actions"})]})}),t.jsx("tbody",{children:ag.map(b=>t.jsxs("tr",{className:"view-invoice-row","data-inv":b.inv,"data-company":b.company,"data-package":b.package,"data-amount":b.amount,"data-due-date":b.dueDate,"data-status":b.status,children:[t.jsx("td",{children:b.inv}),t.jsx("td",{children:b.company}),t.jsx("td",{children:b.package}),t.jsx("td",{children:b.amount}),t.jsx("td",{children:b.dueDate}),t.jsx("td",{children:t.jsx("span",{className:`status ${Ko(b.status)}`,children:b.status})}),t.jsx("td",{children:t.jsx("button",{type:"button",className:"pay-btn view-invoice-btn",onClick:()=>{N(b)},children:"View"})})]},`${b.inv}-${b.company}-${b.dueDate}`))})]})]})]})})]}),t.jsx("div",{className:`modal-overlay${d?" open":""}`,id:"invoiceDetailsModal","aria-hidden":!d,onClick:b=>{b.target===b.currentTarget&&k()},children:t.jsxs("div",{className:"modal-card",role:"dialog","aria-modal":"true","aria-labelledby":"invoiceDetailsTitle",children:[t.jsxs("div",{className:"modal-header",children:[t.jsx("h3",{id:"invoiceDetailsTitle",children:"Invoice Details"}),t.jsx("button",{type:"button",className:"modal-close",id:"closeInvoiceDetailsModal","aria-label":"Close",onClick:k,children:"x"})]}),t.jsxs("div",{className:"details-grid",children:[t.jsxs("div",{className:"details-item",children:[t.jsx("span",{children:"Invoice No"}),t.jsx("strong",{id:"detailInvNo",children:(d==null?void 0:d.inv)??"-"})]}),t.jsxs("div",{className:"details-item",children:[t.jsx("span",{children:"Company"}),t.jsx("strong",{id:"detailCompany",children:(d==null?void 0:d.company)??"-"})]}),t.jsxs("div",{className:"details-item",children:[t.jsx("span",{children:"Package"}),t.jsx("strong",{id:"detailPackage",children:(d==null?void 0:d.package)??"-"})]}),t.jsxs("div",{className:"details-item",children:[t.jsx("span",{children:"Amount"}),t.jsx("strong",{id:"detailAmount",children:(d==null?void 0:d.amount)??"-"})]}),t.jsxs("div",{className:"details-item",children:[t.jsx("span",{children:"Due Date"}),t.jsx("strong",{id:"detailDueDate",children:(d==null?void 0:d.dueDate)??"-"})]}),t.jsxs("div",{className:"details-item",children:[t.jsx("span",{children:"Status"}),t.jsx("strong",{id:"detailStatus",children:(d==null?void 0:d.status)??"-"})]})]}),t.jsx("div",{className:"modal-actions",children:t.jsx("button",{type:"button",className:"pay-btn",id:"closeInvoiceDetailsBtn",onClick:k,children:"Close"})})]})})]})}const cg=[{iconClass:"fa fa-city icon",value:"75",label:"Total Companies"},{iconClass:"fa fa-check-circle icon",value:"60",label:"Active Companies"},{iconClass:"fa fa-clock icon",value:"10",label:"Pending Companies"},{iconClass:"fa fa-ban icon",value:"5",label:"Expired Companies"}],ug=[{id:"bright-tech-solutions",companyName:"Bright Tech Solutions",businessId:"CGD20208",industry:"Technology",ownerName:"Anil Kumar",ownerAvatar:"https://i.pravatar.cc/40?img=1",status:"Active",actionLabel:"Expired",actionClass:"suspend",vatTrn:"TRN-100245689100003",licenseExpiryDate:"2027-12-31",companyEmail:"contact@brighttech.com",phoneNumber:"+971 50 123 4567",address:"Business Bay, Dubai, UAE",poBox:"PO Box 44521",adminEmail:"anil.kumar@brighttech.com",username:"brighttech_admin",password:"********"},{id:"emirates-logistics",companyName:"Emirates Logistics",businessId:"FLG10236",industry:"Logistics",ownerName:"Sarah Ali",ownerAvatar:"https://i.pravatar.cc/40?img=2",status:"Pending",actionLabel:"Approve",actionClass:"approve",vatTrn:"TRN-100398451200003",licenseExpiryDate:"2026-09-15",companyEmail:"info@emirateslogistics.ae",phoneNumber:"+971 55 987 6543",address:"Al Quoz, Dubai, UAE",poBox:"PO Box 11209",adminEmail:"sarah.ali@emirateslogistics.ae",username:"emirateslog_admin",password:"********"},{id:"nova-healthcare",companyName:"Nova Healthcare",businessId:"MH467920",industry:"Healthcare",ownerName:"Meera Joshi",ownerAvatar:"https://i.pravatar.cc/40?img=3",status:"Expired",actionLabel:"Reactivate",actionClass:"reactivate",vatTrn:"TRN-100777234500003",licenseExpiryDate:"2025-11-30",companyEmail:"hello@novahealthcare.com",phoneNumber:"+971 58 222 1100",address:"Abu Dhabi, UAE",poBox:"PO Box 88761",adminEmail:"meera.joshi@novahealthcare.com",username:"novahealth_admin",password:"********"}],sa={companyName:"",tradeLicenseNo:"",vatTrn:"",licenseExpiryDate:"",companyEmail:"",phoneNumber:"",address:"",poBox:"",adminName:"",adminEmail:"",username:"",password:""},pg=`:root{
  --primary:#2f8f83;
  --secondary:#2fb7b0;
  --dark:#1f2f3a;
  --bg:#eef1f7;
  --card:#ffffff;
  --text:#2c3e50;
  --muted:#7f8c8d;
  --line:#e2ebf5;
  --shadow:rgba(0,0,0,0.08);
}

*{margin:0;padding:0;box-sizing:border-box;font-family:"Segoe UI",sans-serif;}
body{
  background:radial-gradient(circle at 0% 0%, #ffffff 0%, #edf3fb 50%, #e6edf8 100%);
  color:var(--text);
}

.page{padding:24px;max-width:1450px;margin:0 auto;}
.breadcrumb{
  font-size:14px;
  color:var(--muted);
  margin-bottom:12px;
}
.page-header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:20px;
}
.page-header h2{
  font-size:30px;
  color:#1c4268;
}
.page-header h2 i{margin-right:8px;color:#2f8f83;}

.btn{
  padding:9px 14px;
  border:1px solid transparent;
  border-radius:999px;
  cursor:pointer;
  font-size:13px;
  font-weight:700;
  transition:.25s;
}
.btn i{margin-right:6px;}
.btn.primary{
  background:linear-gradient(135deg,var(--primary),var(--secondary));
  border-color:#7fd8d2;
  color:#fff;
  box-shadow:0 10px 18px rgba(31,143,139,.24);
}
.btn.primary:hover{
  filter:brightness(1.05);
  box-shadow:0 12px 20px rgba(31,143,139,.3);
}

.tiles{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
  gap:20px;
  margin-bottom:25px;
}
.tile{
  background:linear-gradient(140deg,#ffffff,#f8fbff);
  border:1px solid var(--line);
  border-radius:16px;
  box-shadow:0 10px 22px rgba(18,38,63,.10);
  padding:18px;
  transition:.25s ease;
}
.tile:hover{
  transform:translateY(-4px);
  box-shadow:0 16px 28px rgba(18,38,63,.14);
  border-color:#cfe0f3;
}
.tile .icon{
  font-size:22px;
  color:rgba(255,255,255,.96);
  margin-bottom:10px;
}
.tile h3{font-size:42px;color:#fff;font-weight:800;line-height:1.1;}
.tile p{font-size:14px;color:rgba(255,255,255,.96);}
.tile:nth-child(1){
  background:linear-gradient(135deg,#2f88d3,#2d72b6);
  border-color:#6eaee6;
}
.tile:nth-child(2){
  background:linear-gradient(135deg,#27b386,#1e9d76);
  border-color:#75d7ba;
}
.tile:nth-child(3){
  background:linear-gradient(135deg,#8a72d5,#6d59b8);
  border-color:#b9a8ea;
}
.tile:nth-child(4){
  background:linear-gradient(135deg,#eea336,#e08d21);
  border-color:#f1c27f;
}

.card{
  background:linear-gradient(180deg,#ffffff,#fbfdff);
  border:1px solid var(--line);
  border-radius:16px;
  box-shadow:0 10px 22px rgba(18,38,63,.08);
  padding:16px;
}

table{
  width:100%;
  border-collapse:separate;
  border-spacing:0;
  border:1px solid var(--line);
  border-radius:12px;
  overflow:hidden;
}
th,td{
  padding:12px;
  font-size:14px;
  border-bottom:1px solid #edf2f8;
}
th{
  background:#f6faff;
  text-align:left;
  color:#60758d;
  font-size:12px;
  text-transform:uppercase;
  letter-spacing:.45px;
}
tr:hover{background:#f8fbff;}
tbody tr:last-child td{border-bottom:none;}

.status{
  padding:6px 12px;
  border-radius:999px;
  font-size:12px;
  font-weight:700;
  border:1px solid transparent;
}
.active{background:#dcf7e6;color:#0f6c41;border-color:#bdeacc;}
.pending{background:#fff4d8;color:#8b6100;border-color:#ffe1a4;}
.banned{background:#ffe4e4;color:#9f2a2a;border-color:#ffc4c4;}

.action{
  padding:7px 12px;
  border-radius:999px;
  border:1px solid transparent;
  cursor:pointer;
  font-size:12px;
  font-weight:700;
  margin-right:4px;
}
.view{background:linear-gradient(135deg,var(--primary),var(--secondary));border-color:#7fd8d2;color:#fff;}
.edit{background:linear-gradient(135deg,#9aa8b5,#7f8f9f);border-color:#c6cfd7;color:#fff;}
.suspend{background:linear-gradient(135deg,#ffb44a,#ea8f16);border-color:#ffd59e;color:#fff;}
.approve{background:linear-gradient(135deg,#2ec68f,#21a976);border-color:#8be4c3;color:#fff;}
.reactivate{background:linear-gradient(135deg,#37c98d,#22a96f);border-color:#8be4c3;color:#fff;}
.action:hover{filter:brightness(1.05);}

.company{display:flex;align-items:center;gap:10px;}
.company i{color:#2f8f83;font-size:18px;}

.owner{display:flex;align-items:center;gap:8px;}
.owner img{
  width:28px;
  height:28px;
  border-radius:50%;
}

.modal-overlay{
  position:fixed;
  inset:0;
  background:rgba(18,30,46,.56);
  display:none;
  align-items:center;
  justify-content:center;
  padding:16px;
  z-index:1300;
}
.modal-overlay.open{
  display:flex;
}
.modal-card{
  width:min(760px,100%);
  max-height:90vh;
  overflow:auto;
  background:#fff;
  border:1px solid var(--line);
  border-radius:16px;
  box-shadow:0 24px 52px rgba(10,22,37,.24);
  padding:18px;
}
.modal-header{
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-bottom:12px;
}
.modal-header h3{
  margin:0;
  color:#1c4268;
  font-size:22px;
}
.modal-close{
  border:none;
  background:transparent;
  font-size:18px;
  color:#60758d;
  cursor:pointer;
  line-height:1;
}
.company-form{
  display:flex;
  flex-direction:column;
  gap:10px;
}
.form-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px 12px;
}
.form-row{
  display:flex;
  flex-direction:column;
  gap:6px;
}
.form-row label{
  font-size:13px;
  color:#5f748c;
  font-weight:600;
}
.form-row input{
  padding:10px 12px;
  border:1px solid #d2e0ef;
  border-radius:10px;
  font-size:14px;
  color:#274764;
  background:#fff;
}
.form-row input:focus{
  outline:none;
  border-color:#96bde9;
  box-shadow:0 0 0 3px rgba(65,105,225,.12);
}
.modal-actions{
  display:flex;
  justify-content:flex-end;
  gap:10px;
  margin-top:6px;
}
.company-details-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px 12px;
}
.company-details-item{
  border:1px solid #e2eaf4;
  border-radius:10px;
  background:#f9fcff;
  padding:10px 12px;
  display:flex;
  flex-direction:column;
  gap:4px;
}
.company-details-item span{
  font-size:12px;
  color:#5f748c;
  text-transform:uppercase;
  letter-spacing:.35px;
}
.company-details-item strong{
  font-size:14px;
  color:#1f3e62;
  word-break:break-word;
}
@media(max-width:1000px){
  .page{padding:16px;}
  .page-header{flex-direction:column;align-items:flex-start;gap:10px;}
  .page-header h2{font-size:24px;}
  .form-grid{grid-template-columns:1fr;}
  .company-details-grid{grid-template-columns:1fr;}
}

.tiles .tile,
.tiles .tile:nth-child(1),
.tiles .tile:nth-child(2),
.tiles .tile:nth-child(3),
.tiles .tile:nth-child(4){
  background:linear-gradient(135deg,#2f8f83 0%,#6b7280 100%) !important;
  border-color:#8ea8ad !important;
  color:#fff !important;
}
`;function mg(e){const n=String(e||"").toLowerCase();return n.includes("active")?"active":n.includes("pending")?"pending":"banned"}function fg(e){return e?{companyName:e.companyName,tradeLicenseNo:e.businessId,vatTrn:e.vatTrn,licenseExpiryDate:e.licenseExpiryDate,companyEmail:e.companyEmail,phoneNumber:e.phoneNumber,address:e.address,poBox:e.poBox,adminName:e.ownerName,adminEmail:e.adminEmail,username:e.username,password:e.password}:sa}function hg(){Ge({pageKey:"company-management",pageCssText:pg});const[e,n]=S.useState(ug),[r,a]=S.useState(!1),[i,s]=S.useState(null),[l,o]=S.useState(null),[d,p]=S.useState(sa),[m,g]=S.useState(sa),u=S.useRef(null),y=e.find(x=>x.id===i)??null,N=e.find(x=>x.id===l)??null;S.useEffect(()=>{function x(T){T.key==="Escape"&&(a(!1),s(null),o(null))}return document.addEventListener("keydown",x),()=>{document.removeEventListener("keydown",x)}},[]),S.useEffect(()=>{var x;r&&((x=u.current)==null||x.focus())},[r]);function k(){a(!1)}function b(){s(null)}function h(){o(null)}function f(x,T){p(R=>({...R,[x]:T}))}function v(x,T){g(R=>({...R,[x]:T}))}function E(x){x.preventDefault(),k(),p(sa)}function j(x){if(x.preventDefault(),!N){h();return}n(T=>T.map(R=>R.id!==N.id?R:{...R,companyName:m.companyName.trim(),businessId:m.tradeLicenseNo.trim(),vatTrn:m.vatTrn.trim(),licenseExpiryDate:m.licenseExpiryDate.trim(),companyEmail:m.companyEmail.trim(),phoneNumber:m.phoneNumber.trim(),address:m.address.trim(),poBox:m.poBox.trim(),ownerName:m.adminName.trim(),adminEmail:m.adminEmail.trim(),username:m.username.trim(),password:m.password.trim()})),h()}return t.jsxs(t.Fragment,{children:[t.jsx(tn,{adminName:"Admin"}),t.jsxs("div",{className:"page company-page",children:[t.jsx("div",{className:"breadcrumb",children:"Dashboard › Company Management"}),t.jsxs("div",{className:"page-header",children:[t.jsxs("h2",{children:[t.jsx("i",{className:"fa fa-building"}),"Company Management"]}),t.jsxs("button",{className:"btn primary",id:"openAddCompanyModalBtn",type:"button",onClick:()=>{a(!0)},children:[t.jsx("i",{className:"fa fa-plus"}),"Add New Company"]})]}),t.jsx("div",{className:"tiles",children:cg.map(x=>t.jsxs("div",{className:"tile",children:[t.jsx("i",{className:x.iconClass}),t.jsx("h3",{children:x.value}),t.jsx("p",{children:x.label})]},x.label))}),t.jsx("div",{className:"card",children:t.jsxs("table",{children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Company Name"}),t.jsx("th",{children:"Business ID"}),t.jsx("th",{children:"Industry"}),t.jsx("th",{children:"Owner"}),t.jsx("th",{children:"Status"}),t.jsx("th",{children:"Actions"})]})}),t.jsx("tbody",{children:e.map(x=>t.jsxs("tr",{children:[t.jsxs("td",{className:"company",children:[t.jsx("i",{className:"fa fa-building"}),x.companyName]}),t.jsx("td",{children:x.businessId}),t.jsx("td",{children:x.industry}),t.jsxs("td",{className:"owner",children:[t.jsx("img",{src:x.ownerAvatar,alt:""}),x.ownerName]}),t.jsx("td",{children:t.jsx("span",{className:`status ${mg(x.status)}`,children:x.status})}),t.jsxs("td",{children:[t.jsx("button",{type:"button",className:"action view view-company-btn",onClick:()=>{s(x.id)},children:"View"}),t.jsx("button",{type:"button",className:"action edit edit-company-btn",onClick:()=>{o(x.id),g(fg(x))},children:"Edit"}),t.jsx("button",{type:"button",className:`action ${x.actionClass}`,children:x.actionLabel})]})]},x.id))})]})})]}),t.jsx("div",{className:`modal-overlay${y?" open":""}`,id:"viewCompanyModal","aria-hidden":!y,onClick:x=>{x.target===x.currentTarget&&b()},children:t.jsxs("div",{className:"modal-card",role:"dialog","aria-modal":"true","aria-labelledby":"viewCompanyTitle",children:[t.jsxs("div",{className:"modal-header",children:[t.jsx("h3",{id:"viewCompanyTitle",children:"Company Details"}),t.jsx("button",{type:"button",className:"modal-close",id:"closeViewCompanyModalBtn","aria-label":"Close",onClick:b,children:"x"})]}),t.jsxs("div",{className:"company-details-grid",children:[t.jsxs("div",{className:"company-details-item",children:[t.jsx("span",{children:"Company Name"}),t.jsx("strong",{id:"viewCompanyName",children:(y==null?void 0:y.companyName)??"-"})]}),t.jsxs("div",{className:"company-details-item",children:[t.jsx("span",{children:"Trade License Number"}),t.jsx("strong",{id:"viewTradeLicenseNumber",children:(y==null?void 0:y.businessId)??"-"})]}),t.jsxs("div",{className:"company-details-item",children:[t.jsx("span",{children:"VAT TRN"}),t.jsx("strong",{id:"viewVatTrn",children:(y==null?void 0:y.vatTrn)??"-"})]}),t.jsxs("div",{className:"company-details-item",children:[t.jsx("span",{children:"License Expiry Date"}),t.jsx("strong",{id:"viewLicenseExpiryDate",children:(y==null?void 0:y.licenseExpiryDate)??"-"})]}),t.jsxs("div",{className:"company-details-item",children:[t.jsx("span",{children:"Company Email"}),t.jsx("strong",{id:"viewCompanyEmail",children:(y==null?void 0:y.companyEmail)??"-"})]}),t.jsxs("div",{className:"company-details-item",children:[t.jsx("span",{children:"Phone Number"}),t.jsx("strong",{id:"viewPhoneNumber",children:(y==null?void 0:y.phoneNumber)??"-"})]}),t.jsxs("div",{className:"company-details-item",children:[t.jsx("span",{children:"Address"}),t.jsx("strong",{id:"viewAddress",children:(y==null?void 0:y.address)??"-"})]}),t.jsxs("div",{className:"company-details-item",children:[t.jsx("span",{children:"PO Box"}),t.jsx("strong",{id:"viewPoBox",children:(y==null?void 0:y.poBox)??"-"})]}),t.jsxs("div",{className:"company-details-item",children:[t.jsx("span",{children:"Admin Name"}),t.jsx("strong",{id:"viewAdminName",children:(y==null?void 0:y.ownerName)??"-"})]}),t.jsxs("div",{className:"company-details-item",children:[t.jsx("span",{children:"Admin Email"}),t.jsx("strong",{id:"viewAdminEmail",children:(y==null?void 0:y.adminEmail)??"-"})]}),t.jsxs("div",{className:"company-details-item",children:[t.jsx("span",{children:"Username"}),t.jsx("strong",{id:"viewUsername",children:(y==null?void 0:y.username)??"-"})]}),t.jsxs("div",{className:"company-details-item",children:[t.jsx("span",{children:"Password"}),t.jsx("strong",{id:"viewPassword",children:(y==null?void 0:y.password)??"-"})]})]}),t.jsx("div",{className:"modal-actions",children:t.jsx("button",{type:"button",className:"btn",id:"closeViewCompanyBtn",onClick:b,children:"Close"})})]})}),t.jsx("div",{className:`modal-overlay${N?" open":""}`,id:"editCompanyModal","aria-hidden":!N,onClick:x=>{x.target===x.currentTarget&&h()},children:t.jsxs("div",{className:"modal-card",role:"dialog","aria-modal":"true","aria-labelledby":"editCompanyTitle",children:[t.jsxs("div",{className:"modal-header",children:[t.jsx("h3",{id:"editCompanyTitle",children:"Edit Company Details"}),t.jsx("button",{type:"button",className:"modal-close",id:"closeEditCompanyModalBtn","aria-label":"Close",onClick:h,children:"x"})]}),t.jsxs("form",{id:"editCompanyForm",className:"company-form",onSubmit:j,children:[t.jsx("input",{type:"hidden",id:"editRowIndex",value:N?e.findIndex(x=>x.id===N.id)+1:"",readOnly:!0}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"editCompanyName",children:"Company Name"}),t.jsx("input",{id:"editCompanyName",type:"text",required:!0,value:m.companyName,onChange:x=>{v("companyName",x.target.value)}})]}),t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"editTradeLicenseNo",children:"Trade License Number"}),t.jsx("input",{id:"editTradeLicenseNo",type:"text",required:!0,value:m.tradeLicenseNo,onChange:x=>{v("tradeLicenseNo",x.target.value)}})]})]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"editVatTrn",children:"VAT TRN"}),t.jsx("input",{id:"editVatTrn",type:"text",required:!0,value:m.vatTrn,onChange:x=>{v("vatTrn",x.target.value)}})]}),t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"editLicenseExpiryDate",children:"License Expiry Date"}),t.jsx("input",{id:"editLicenseExpiryDate",type:"date",required:!0,value:m.licenseExpiryDate,onChange:x=>{v("licenseExpiryDate",x.target.value)}})]})]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"editCompanyEmail",children:"Company Email"}),t.jsx("input",{id:"editCompanyEmail",type:"email",required:!0,value:m.companyEmail,onChange:x=>{v("companyEmail",x.target.value)}})]}),t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"editPhoneNumber",children:"Phone Number"}),t.jsx("input",{id:"editPhoneNumber",type:"tel",required:!0,value:m.phoneNumber,onChange:x=>{v("phoneNumber",x.target.value)}})]})]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"editAddress",children:"Address"}),t.jsx("input",{id:"editAddress",type:"text",required:!0,value:m.address,onChange:x=>{v("address",x.target.value)}})]}),t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"editPoBox",children:"PO Box"}),t.jsx("input",{id:"editPoBox",type:"text",required:!0,value:m.poBox,onChange:x=>{v("poBox",x.target.value)}})]})]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"editAdminName",children:"Admin Name"}),t.jsx("input",{id:"editAdminName",type:"text",required:!0,value:m.adminName,onChange:x=>{v("adminName",x.target.value)}})]}),t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"editAdminEmail",children:"Admin Email"}),t.jsx("input",{id:"editAdminEmail",type:"email",required:!0,value:m.adminEmail,onChange:x=>{v("adminEmail",x.target.value)}})]})]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"editUsername",children:"Username"}),t.jsx("input",{id:"editUsername",type:"text",required:!0,value:m.username,onChange:x=>{v("username",x.target.value)}})]}),t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"editPassword",children:"Password"}),t.jsx("input",{id:"editPassword",type:"text",required:!0,value:m.password,onChange:x=>{v("password",x.target.value)}})]})]}),t.jsxs("div",{className:"modal-actions",children:[t.jsx("button",{type:"button",className:"btn",id:"cancelEditCompanyBtn",onClick:h,children:"Cancel"}),t.jsx("button",{type:"submit",className:"btn primary",children:"Save Changes"})]})]})]})}),t.jsx("div",{className:`modal-overlay${r?" open":""}`,id:"addCompanyModal","aria-hidden":!r,onClick:x=>{x.target===x.currentTarget&&k()},children:t.jsxs("div",{className:"modal-card",role:"dialog","aria-modal":"true","aria-labelledby":"addCompanyTitle",children:[t.jsxs("div",{className:"modal-header",children:[t.jsx("h3",{id:"addCompanyTitle",children:"Add New Company"}),t.jsx("button",{type:"button",className:"modal-close",id:"closeAddCompanyModalBtn","aria-label":"Close",onClick:k,children:"x"})]}),t.jsxs("form",{id:"addCompanyForm",className:"company-form",onSubmit:E,children:[t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"companyName",children:"Company Name"}),t.jsx("input",{id:"companyName",name:"company_name",type:"text",required:!0,ref:u,value:d.companyName,onChange:x=>{f("companyName",x.target.value)}})]}),t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"tradeLicenseNo",children:"Trade License Number"}),t.jsx("input",{id:"tradeLicenseNo",name:"trade_license_number",type:"text",required:!0,value:d.tradeLicenseNo,onChange:x=>{f("tradeLicenseNo",x.target.value)}})]})]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"vatTrn",children:"VAT TRN"}),t.jsx("input",{id:"vatTrn",name:"vat_trn",type:"text",required:!0,value:d.vatTrn,onChange:x=>{f("vatTrn",x.target.value)}})]}),t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"licenseExpiryDate",children:"License Expiry Date"}),t.jsx("input",{id:"licenseExpiryDate",name:"license_expiry_date",type:"date",required:!0,value:d.licenseExpiryDate,onChange:x=>{f("licenseExpiryDate",x.target.value)}})]})]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"companyEmail",children:"Company Email"}),t.jsx("input",{id:"companyEmail",name:"company_email",type:"email",required:!0,value:d.companyEmail,onChange:x=>{f("companyEmail",x.target.value)}})]}),t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"phoneNumber",children:"Phone Number"}),t.jsx("input",{id:"phoneNumber",name:"phone_number",type:"tel",required:!0,value:d.phoneNumber,onChange:x=>{f("phoneNumber",x.target.value)}})]})]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"companyAddress",children:"Address"}),t.jsx("input",{id:"companyAddress",name:"address",type:"text",required:!0,value:d.address,onChange:x=>{f("address",x.target.value)}})]}),t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"poBox",children:"PO Box"}),t.jsx("input",{id:"poBox",name:"po_box",type:"text",required:!0,value:d.poBox,onChange:x=>{f("poBox",x.target.value)}})]})]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"adminName",children:"Admin Name"}),t.jsx("input",{id:"adminName",name:"admin_name",type:"text",required:!0,value:d.adminName,onChange:x=>{f("adminName",x.target.value)}})]}),t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"adminEmail",children:"Admin Email"}),t.jsx("input",{id:"adminEmail",name:"admin_email",type:"email",required:!0,value:d.adminEmail,onChange:x=>{f("adminEmail",x.target.value)}})]})]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"companyUsername",children:"Username"}),t.jsx("input",{id:"companyUsername",name:"username",type:"text",required:!0,value:d.username,onChange:x=>{f("username",x.target.value)}})]}),t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"companyPassword",children:"Password"}),t.jsx("input",{id:"companyPassword",name:"password",type:"password",required:!0,value:d.password,onChange:x=>{f("password",x.target.value)}})]})]}),t.jsxs("div",{className:"modal-actions",children:[t.jsx("button",{type:"button",className:"btn",id:"cancelAddCompanyBtn",onClick:k,children:"Cancel"}),t.jsx("button",{type:"submit",className:"btn primary",children:"Create Company"})]})]})]})})]})}const gg=[{key:"dashboard",path:"/admin/dashboard",icon:"🏠",label:"Dashboard",className:"active"},{key:"sales",path:"/admin/sales",icon:"💼",label:"Sales Department"},{key:"accounts",path:"/admin/accounts",icon:"📊",label:"Accounts Department"},{key:"services",path:"/admin/services",icon:"🧾",label:"Services & Packages"},{key:"users",path:"/admin/users",icon:"👥",label:"Users & Roles"},{key:"payments",path:"/admin/payments",icon:"💳",label:"Payments & Reports"},{key:"settings",path:"/admin/settings",icon:"⚙️",label:"Settings"},{key:"logout",path:"/admin/logout",icon:"🚪",label:"Logout"}],xg=[{head:"Sales Department",label:"Active Leads:",value:"25",className:"kpi-blue"},{head:"Accounts Department",label:"Pending Payments:",value:"AED 1,20,000",className:"kpi-green"},{head:"Operations",label:"Approval List:",value:"7",className:"kpi-orange"},{head:"Company Management",label:"Active Companies:",value:"45",className:"kpi-purple"}],vg=[{lead:"ABC Corp",assigned:"Rahul",status:"Follow Up",statusClass:"blue",action:"Action",actionClass:""},{lead:"XYZ Ltd",assigned:"Priya",status:"New Lead",statusClass:"yellow",action:"Action",actionClass:""},{lead:"Tech Solutions",assigned:"Amit",status:"In Progress",statusClass:"green",action:"Action",actionClass:""}],yg=[{company:"Gulf Star LLC",zone:"Free Zone",status:"Active",statusClass:"green",action:"Manage",actionClass:"manage"},{company:"Desert Holdings",zone:"Mainland",status:"Expiring",statusClass:"orange",action:"Assign",actionClass:"assign"},{company:"Oceanic Corp",zone:"Mainland",status:"Expired",statusClass:"red",action:"Reactivate",actionClass:"reactivate"}],Go={pendingInvoices:"15",totalRevenue:"AED 3,45,000"},bg=[{invoice:"#1024",client:"Global Enterprises",amount:"AED 15,000",status:"Paid",statusClass:"green"},{invoice:"#1025",client:"Metro Corp",amount:"AED 8,500",status:"Pending",statusClass:"yellow"},{invoice:"#1026",client:"XYZ Solutions",amount:"AED 8,500",status:"Overdue",statusClass:"red"}],jg=[{prefix:"Finance:",message:"Invoice #123 updated",time:"25m ago"},{prefix:"Sales:",message:"New lead added",time:"10m ago"},{prefix:"Zoho CRM:",message:"Sync completed",time:"25m ago"}],wg=[{message:"Security: Failed login attempt",time:"45m ago"},{message:"System: Backup completed",time:"1h ago"}],kg=`:root{\r
  --primary:#2f8f83;\r
  --dark:#1f2f3a;\r
  --accent-blue:#2d8de0;\r
  --accent-green:#20a975;\r
  --accent-orange:#ef9d2f;\r
  --accent-red:#de5b5b;\r
  --bg:#f4f6fb;\r
  --card:#ffffff;\r
  --text:#2c3e50;\r
  --muted:#7f8c8d;\r
  --shadow:rgba(0,0,0,.08);\r
}\r
\r
body.dark{\r
  --bg:#0f1720;\r
  --card:#1c2633;\r
  --text:#ecf0f1;\r
  --muted:#aab4c0;\r
  --shadow:rgba(0,0,0,.5);\r
}\r
\r
*{\r
  margin:0;\r
  padding:0;\r
  box-sizing:border-box;\r
  font-family:"Segoe UI",sans-serif;\r
}\r
\r
body{\r
  background:\r
    radial-gradient(circle at 10% 0%, #ffffff 0%, #f4f6fb 35%, #edf2f9 100%);\r
  color:var(--text);\r
  transition:.3s;\r
}\r
\r
/* NAVBAR */\r
.navbar{\r
  height:70px;\r
  background:linear-gradient(90deg,var(--dark),var(--primary));\r
  display:flex;\r
  justify-content:space-between;\r
  align-items:center;\r
  padding:0 30px;\r
  color:#fff;\r
}\r
\r
.logo img{\r
  height:36px;\r
}\r
\r
.nav-links{\r
  display:flex;\r
  gap:18px;\r
}\r
\r
.nav-links a{\r
  text-decoration:none;\r
  color:#fff;\r
  padding:8px 12px;\r
  border-radius:6px;\r
  font-size:14px;\r
}\r
\r
.nav-links a:hover{\r
  background:rgba(255,255,255,.2);\r
}\r
\r
/* ADMIN DROPDOWN */\r
.admin{ position:relative; }\r
\r
.admin-btn{\r
  background:rgba(255,255,255,.2);\r
  border:none;\r
  color:#fff;\r
  padding:8px 14px;\r
  border-radius:20px;\r
  cursor:pointer;\r
}\r
\r
.dropdown{\r
  position:absolute;\r
  right:0;\r
  top:55px;\r
  background:var(--card);\r
  width:220px;\r
  border-radius:12px;\r
  box-shadow:0 12px 25px var(--shadow);\r
  display:none;\r
  z-index:999;\r
}\r
\r
.dropdown.show{ display:block; }\r
\r
.dropdown-item{\r
  padding:12px 16px;\r
  cursor:pointer;\r
  display:flex;\r
  justify-content:space-between;\r
  align-items:center;\r
}\r
\r
.dropdown-item:hover{\r
  background:rgba(47,143,131,.15);\r
}\r
\r
/* TOGGLE */\r
.switch{\r
  position:relative;\r
  width:38px;\r
  height:20px;\r
}\r
\r
.switch input{ display:none; }\r
\r
.slider{\r
  position:absolute;\r
  inset:0;\r
  background:#ccc;\r
  border-radius:20px;\r
}\r
\r
.slider:before{\r
  content:"";\r
  position:absolute;\r
  height:16px;\r
  width:16px;\r
  left:2px;\r
  top:2px;\r
  background:#fff;\r
  border-radius:50%;\r
  transition:.3s;\r
}\r
\r
input:checked + .slider{\r
  background:var(--primary);\r
}\r
\r
input:checked + .slider:before{\r
  transform:translateX(18px);\r
}\r
\r
/* MAIN */\r
.main{ padding:25px; }\r
\r
.kpi-grid{\r
  display:grid;\r
  grid-template-columns:repeat(auto-fit,minmax(230px,1fr));\r
  gap:20px;\r
  margin-bottom:25px;\r
}\r
\r
.kpi{\r
  background:var(--card);\r
  padding:20px;\r
  border-radius:12px;\r
  box-shadow:0 6px 14px var(--shadow);\r
  transition:.3s;\r
}\r
\r
.kpi:hover{\r
  transform:translateY(-6px);\r
  background:linear-gradient(135deg,var(--primary),var(--dark));\r
  color:#fff;\r
}\r
\r
.kpi span{\r
  font-size:20px;\r
  font-weight:600;\r
  color:var(--primary);\r
}\r
\r
.card{\r
  background:linear-gradient(180deg,#ffffff 0%, #fbfcff 100%);\r
  border:1px solid #e3eaf3;\r
  border-radius:16px;\r
  padding:20px;\r
  box-shadow:0 10px 24px rgba(18,38,63,.08);\r
  margin-bottom:20px;\r
  transition:transform .22s ease, box-shadow .22s ease, border-color .22s ease;\r
}\r
.card:hover{\r
  transform:translateY(-2px);\r
  box-shadow:0 14px 28px rgba(18,38,63,.12);\r
  border-color:#d3deec;\r
}\r
\r
/* LAYOUT */\r
.wrap{ display:flex; min-height:100vh; }\r
.sidebar{ display:none; }\r
.brand{ display:flex; align-items:center; gap:10px; margin-bottom:18px; }\r
.brand img{ height:36px; }\r
.nav-logo{ height:34px; display:block; }\r
.brand h2{ font-size:16px; letter-spacing:1px; }\r
.brand span{ color:#7bd4c8; }\r
.side-nav{ display:flex; flex-direction:column; gap:8px; }
.side-nav a{ color:rgba(255,255,255,.9); text-decoration:none; padding:10px; border-radius:8px; cursor:pointer; }
.side-nav a.active{ background:rgba(255,255,255,.06); }

.content{ flex:1; display:flex; flex-direction:column; }
.topbar{ height:72px; display:flex; align-items:center; justify-content:space-between; padding:6px 18px; background:linear-gradient(90deg,#164b4a,#2f8f83); box-shadow:0 6px 18px rgba(0,0,0,.12); color:#fff; }\r
.topbar .nav-items{ display:flex; gap:18px; align-items:center; margin-left:12px; overflow:auto; }\r
.topbar .nav-items-inner{ display:flex; gap:12px; white-space:nowrap; }\r
.topbar .nav-items a{ display:flex; flex-direction:column; align-items:center; gap:6px; padding:12px 18px; color:rgba(255,255,255,.95); text-decoration:none; border-radius:8px; font-size:13px; opacity:.95; flex:0 0 auto; }\r
.topbar .nav-items a .ico{ font-size:18px; display:block; }\r
.topbar .nav-items a.active{ background:rgba(255,255,255,.08); box-shadow:inset 0 1px 0 rgba(255,255,255,.02); }\r
.topbar .search input{ border:none; padding:10px 16px; border-radius:22px; background:rgba(255,255,255,.95); min-width:260px; }\r
.topbar .right-area{ display:flex; align-items:center; gap:18px; }\r
.top-logo{ margin-right:12px; }\r
.main{ padding:24px; }\r
\r
/* KPI */\r
.kpi-grid{ display:grid; grid-template-columns:repeat(4,1fr); gap:18px; margin-bottom:24px; }\r
.kpi{\r
  padding:18px;\r
  border-radius:14px;\r
  display:flex;\r
  flex-direction:column;\r
  justify-content:space-between;\r
  border:1px solid #e4edf8;\r
  box-shadow:0 8px 20px rgba(19,39,67,.08);\r
}\r
.kpi-head{ font-weight:700; margin-bottom:8px; font-size:13px; color:#516883; text-transform:uppercase; letter-spacing:.45px; }\r
.kpi-value{ font-size:16px; color:#274766; }\r
.kpi span{ font-size:21px; font-weight:800; margin-left:4px; }\r
.kpi-blue{ border-top:4px solid #2b83d7; background:linear-gradient(160deg,#ffffff,#f4f9ff); }\r
.kpi-green{ border-top:4px solid #2fbe9a; background:linear-gradient(160deg,#ffffff,#f3fff9); }\r
.kpi-orange{ border-top:4px solid #f39c12; background:linear-gradient(160deg,#ffffff,#fffaf2); }\r
.kpi-purple{ border-top:4px solid #6f42c1; background:linear-gradient(160deg,#ffffff,#f8f3ff); }\r
\r
/* GRID CONTENT */\r
.grid{ display:grid; grid-template-columns:1fr 420px; gap:22px; align-items:start; }\r
.col{ display:block; }\r
.col.left{ grid-column:1; }\r
.col.middle{ grid-column:1; }\r
.col.right{ grid-column:2; }\r
.small-card{ padding:14px; }\r
.management-tiles{\r
  display:grid;\r
  grid-template-columns:repeat(2,minmax(0,1fr));\r
  gap:18px;\r
}\r
.management-tile{ margin-bottom:0; }\r
.management-table thead th,\r
.management-table tbody td{ padding:11px 9px; }\r
.management-table thead th:last-child,\r
.management-table tbody td:last-child{\r
  width:150px;\r
  text-align:center;\r
}\r
.management-table thead th:nth-child(3),\r
.management-table tbody td:nth-child(3){ width:170px; }\r
\r
.card h4{\r
  font-size:22px;\r
  color:#17385d;\r
  margin-bottom:12px;\r
  letter-spacing:.2px;\r
}\r
.card h5{\r
  font-size:18px;\r
  color:#24496e;\r
  margin:16px 0 10px;\r
}\r
\r
/* ACCOUNT STATS */\r
.stats{\r
  display:grid;\r
  grid-template-columns:repeat(2,minmax(180px,1fr));\r
  gap:12px;\r
  margin-bottom:8px;\r
}\r
.stat{\r
  background:linear-gradient(135deg,#ecf7ff,#f5faff);\r
  border:1px solid #d6e7f7;\r
  border-radius:14px;\r
  padding:14px 16px;\r
}\r
.stat .small{\r
  font-size:12px;\r
  color:#5f738a;\r
  margin-bottom:8px;\r
  font-weight:600;\r
  text-transform:uppercase;\r
  letter-spacing:.4px;\r
}\r
.stat .big{\r
  font-size:22px;\r
  color:#1c4268;\r
  font-weight:700;\r
}\r
\r
/* TABLES */\r
.table{\r
  width:100%;\r
  border-collapse:separate;\r
  border-spacing:0;\r
  border-radius:12px;\r
  overflow:hidden;\r
}\r
.table thead th{\r
  text-align:left;\r
  padding:12px 10px;\r
  color:#6b7e95;\r
  font-size:12px;\r
  font-weight:700;\r
  text-transform:uppercase;\r
  letter-spacing:.5px;\r
  background:#f7faff;\r
  border-bottom:1px solid #e3edf7;\r
}\r
.table tbody td{\r
  padding:12px 10px;\r
  border-bottom:1px solid #edf2f8;\r
}\r
.table tbody tr:hover{\r
  background:#f8fbff;\r
}\r
.table.small thead th, .table.small tbody td{ padding:11px 10px; font-size:14px; }\r
.table tbody tr:last-child td{ border-bottom:none; }\r
\r
/* TAGS */\r
.tag{\r
  display:inline-block;\r
  padding:7px 12px;\r
  border-radius:999px;\r
  font-size:12px;\r
  font-weight:700;\r
  border:1px solid transparent;\r
}\r
.tag.green{ background:#dbf7ea; color:#146c4a; border-color:#b9ebd2; }\r
.tag.blue{ background:#e6f2ff; color:#1e5d9b; border-color:#c9e1ff; }\r
.tag.yellow{ background:#fff3d3; color:#8a5a00; border-color:#ffe4a4; }\r
.tag.orange{ background:#ffeedd; color:#a55c00; border-color:#ffd7ad; }\r
.tag.red{ background:#ffe4e4; color:#a63232; border-color:#ffc3c3; }\r
\r
/* TABLE ACTION BUTTONS */\r
.table-action-btn{\r
  border:1px solid #8ec8f7;\r
  background:linear-gradient(135deg,#43acf8,#2d8de0);\r
  color:#fff;\r
  padding:7px 15px;\r
  border-radius:999px;\r
  font-size:12px;\r
  font-weight:600;\r
  cursor:pointer;\r
  box-shadow:0 6px 14px rgba(45,141,224,.25);\r
  transition:transform .2s ease, box-shadow .2s ease, filter .2s ease;\r
}\r
.table-action-btn.manage{ background:linear-gradient(135deg,#34b986,#209b6c); border-color:#80dfbf; box-shadow:0 6px 14px rgba(32,155,108,.22); }\r
.table-action-btn.assign{ background:linear-gradient(135deg,#ffb44a,#ea8f16); border-color:#ffd59e; box-shadow:0 6px 14px rgba(234,143,22,.22); }\r
.table-action-btn.reactivate{ background:linear-gradient(135deg,#f06e6e,#db4e4e); border-color:#f6b6b6; box-shadow:0 6px 14px rgba(219,78,78,.24); }\r
.table-action-btn:hover{\r
  filter:brightness(1.05);\r
  transform:translateY(-1px);\r
  box-shadow:0 10px 18px rgba(45,141,224,.3);\r
}\r
\r
/* FEED */\r
.feed{ display:flex; flex-direction:column; gap:10px; }\r
.feed-item{\r
  font-size:14px;\r
  border:1px solid #e7edf5;\r
  background:linear-gradient(180deg,#f9fbff,#f6f9fe);\r
  border-radius:10px;\r
  padding:10px 12px;\r
}\r
.muted{ color:var(--muted); font-size:12px; margin-left:8px; }\r
\r
@media (max-width:1500px){\r
  .management-tiles{ grid-template-columns:1fr; }\r
}\r
\r
@media (max-width:1000px){
  .kpi-grid{ grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); }
  .grid{ grid-template-columns:1fr; }
  .col.right{ grid-column:auto; }
  .sidebar{ display:none; }
  .topbar .nav-items{ /* keep visible but allow scroll on small screens */ overflow:auto; }
  .card h4{ font-size:18px; }
  .card h5{ font-size:16px; }
}

/* Route-scoped dashboard overrides to prevent global admin CSS collisions */
.admin-dashboard-page.wrap{
  display:flex !important;
  min-height:100vh !important;
}

.admin-dashboard-page{
  background:radial-gradient(circle at 10% 0%, #ffffff 0%, #f4f6fb 35%, #edf2f9 100%) !important;
  color:var(--text) !important;
}

html.dark .admin-dashboard-page,
body.dark .admin-dashboard-page,
html.dark-mode .admin-dashboard-page,
body.dark-mode .admin-dashboard-page{
  background:#0f1720 !important;
}

.admin-dashboard-page .sidebar{
  display:none !important;
}

.admin-dashboard-page .content{
  flex:1 !important;
  display:flex !important;
  flex-direction:column !important;
  min-width:0 !important;
}

.admin-dashboard-page .main{
  padding:24px !important;
}

.admin-dashboard-page .kpi-grid{
  display:grid !important;
  grid-template-columns:repeat(4,1fr) !important;
  gap:18px !important;
  margin-bottom:24px !important;
}

.admin-dashboard-page .kpi{
  padding:18px !important;
  border-radius:14px !important;
  display:flex !important;
  flex-direction:column !important;
  justify-content:space-between !important;
  border:1px solid #e4edf8 !important;
  box-shadow:0 8px 20px rgba(19,39,67,.08) !important;
  min-height:auto !important;
}

.admin-dashboard-page .kpi-head{
  font-weight:700 !important;
  margin-bottom:8px !important;
  font-size:13px !important;
  color:#516883 !important;
  text-transform:uppercase !important;
  letter-spacing:.45px !important;
}

.admin-dashboard-page .kpi-value{
  font-size:16px !important;
  color:#274766 !important;
}

.admin-dashboard-page .kpi span{
  font-size:21px !important;
  font-weight:800 !important;
  margin-left:4px !important;
}

.admin-dashboard-page .kpi.kpi-blue{
  border-top:4px solid #2b83d7 !important;
  background:linear-gradient(160deg,#ffffff,#f4f9ff) !important;
}

.admin-dashboard-page .kpi.kpi-green{
  border-top:4px solid #2fbe9a !important;
  background:linear-gradient(160deg,#ffffff,#f3fff9) !important;
}

.admin-dashboard-page .kpi.kpi-orange{
  border-top:4px solid #f39c12 !important;
  background:linear-gradient(160deg,#ffffff,#fffaf2) !important;
}

.admin-dashboard-page .kpi.kpi-purple{
  border-top:4px solid #6f42c1 !important;
  background:linear-gradient(160deg,#ffffff,#f8f3ff) !important;
}

.admin-dashboard-page .kpi.kpi-blue span{
  color:#2b83d7 !important;
}

.admin-dashboard-page .kpi.kpi-green span{
  color:#2f8f83 !important;
}

.admin-dashboard-page .kpi.kpi-orange span{
  color:#d88706 !important;
}

.admin-dashboard-page .kpi.kpi-purple span{
  color:#6f42c1 !important;
}

.admin-dashboard-page .grid{
  display:grid !important;
  grid-template-columns:1fr 420px !important;
  gap:22px !important;
  align-items:start !important;
  margin-top:0 !important;
}

.admin-dashboard-page .col{
  display:block !important;
  min-width:0 !important;
}

.admin-dashboard-page .col.left{
  grid-column:1 !important;
}

.admin-dashboard-page .col.middle{
  grid-column:1 !important;
}

.admin-dashboard-page .col.right{
  grid-column:2 !important;
}

.admin-dashboard-page .management-tiles{
  display:grid !important;
  grid-template-columns:repeat(2,minmax(0,1fr)) !important;
  gap:18px !important;
}

.admin-dashboard-page .management-tile{
  margin-bottom:0 !important;
}

.admin-dashboard-page .card{
  background:linear-gradient(180deg,#ffffff 0%, #fbfcff 100%) !important;
  border:1px solid #e3eaf3 !important;
  border-radius:16px !important;
  padding:20px !important;
  box-shadow:0 10px 24px rgba(18,38,63,.08) !important;
  margin:0 0 20px !important;
  max-width:none !important;
  width:auto !important;
  color:var(--text) !important;
  display:block !important;
}

.admin-dashboard-page .small-card{
  padding:14px !important;
}

.admin-dashboard-page .card h4{
  font-size:22px !important;
  color:#17385d !important;
  margin-bottom:12px !important;
  letter-spacing:.2px !important;
}

.admin-dashboard-page .card h5{
  font-size:18px !important;
  color:#24496e !important;
  margin:16px 0 10px !important;
}

.admin-dashboard-page .stats{
  display:grid !important;
  grid-template-columns:repeat(2,minmax(180px,1fr)) !important;
  gap:12px !important;
  margin-bottom:8px !important;
}

.admin-dashboard-page .stat{
  background:linear-gradient(135deg,#ecf7ff,#f5faff) !important;
  border:1px solid #d6e7f7 !important;
  border-radius:14px !important;
  padding:14px 16px !important;
}

.admin-dashboard-page .stat .small{
  font-size:12px !important;
  color:#5f738a !important;
  margin-bottom:8px !important;
  font-weight:600 !important;
  text-transform:uppercase !important;
  letter-spacing:.4px !important;
}

.admin-dashboard-page .stat .big{
  font-size:22px !important;
  color:#1c4268 !important;
  font-weight:700 !important;
}

.admin-dashboard-page .table{
  width:100% !important;
  border-collapse:separate !important;
  border-spacing:0 !important;
  border-radius:12px !important;
  overflow:hidden !important;
  background:transparent !important;
}

.admin-dashboard-page .table thead th{
  text-align:left !important;
  padding:12px 10px !important;
  color:#6b7e95 !important;
  font-size:12px !important;
  font-weight:700 !important;
  text-transform:uppercase !important;
  letter-spacing:.5px !important;
  background:#f7faff !important;
  border-bottom:1px solid #e3edf7 !important;
}

.admin-dashboard-page .table tbody td{
  padding:12px 10px !important;
  border-bottom:1px solid #edf2f8 !important;
  color:var(--text) !important;
}

.admin-dashboard-page .table tbody tr:hover{
  background:#f8fbff !important;
}

.admin-dashboard-page .table.small thead th,
.admin-dashboard-page .table.small tbody td{
  padding:11px 10px !important;
  font-size:14px !important;
}

.admin-dashboard-page .table tbody tr:last-child td{
  border-bottom:none !important;
}

.admin-dashboard-page .management-table thead th:last-child,
.admin-dashboard-page .management-table tbody td:last-child{
  width:150px !important;
  text-align:center !important;
}

.admin-dashboard-page .management-table thead th:nth-child(3),
.admin-dashboard-page .management-table tbody td:nth-child(3){
  width:170px !important;
}

.admin-dashboard-page .feed{
  display:flex !important;
  flex-direction:column !important;
  gap:10px !important;
}

.admin-dashboard-page .feed-item{
  font-size:14px !important;
  border:1px solid #e7edf5 !important;
  background:linear-gradient(180deg,#f9fbff,#f6f9fe) !important;
  border-radius:10px !important;
  padding:10px 12px !important;
  color:var(--text) !important;
}

.admin-dashboard-page .muted{
  color:var(--muted) !important;
  font-size:12px !important;
  margin-left:8px !important;
}

@media (max-width:1500px){
  .admin-dashboard-page .management-tiles{
    grid-template-columns:1fr !important;
  }
}

@media (max-width:1000px){
  .admin-dashboard-page .kpi-grid{
    grid-template-columns:repeat(auto-fit,minmax(180px,1fr)) !important;
  }

  .admin-dashboard-page .grid{
    grid-template-columns:1fr !important;
  }

  .admin-dashboard-page .col.right{
    grid-column:auto !important;
  }

  .admin-dashboard-page .card h4{
    font-size:18px !important;
  }

  .admin-dashboard-page .card h5{
    font-size:16px !important;
  }
}
`;function Ng(){return Ge({pageKey:"dashboard",pageCssText:kg}),t.jsxs("div",{className:"admin-dashboard-page wrap",children:[t.jsxs("aside",{className:"sidebar",children:[t.jsxs("div",{className:"brand",children:[t.jsx("div",{className:"brand-logo","aria-hidden":"true",children:t.jsx("img",{src:"/assets/images/logowhite.png",alt:"LedgerWorx",className:"nav-logo"})}),t.jsxs("h2",{children:["LEDGER ",t.jsx("span",{children:"WORX"})]})]}),t.jsx("nav",{className:"side-nav",children:gg.map(e=>t.jsxs(Xa,{to:e.path,className:e.className??"",children:[e.icon," ",e.label]},e.key))})]}),t.jsxs("div",{className:"content",children:[t.jsx(tn,{adminName:"Admin"}),t.jsxs("main",{className:"main",children:[t.jsx("div",{className:"kpi-grid",children:xg.map(e=>t.jsxs("div",{className:`kpi ${e.className}`,children:[t.jsx("div",{className:"kpi-head",children:e.head}),t.jsxs("div",{className:"kpi-value",children:[e.label," ",t.jsx("span",{children:e.value})]})]},e.head))}),t.jsxs("div",{className:"grid",children:[t.jsx("section",{className:"col left",children:t.jsxs("div",{className:"management-tiles",children:[t.jsxs("div",{className:"card management-tile",children:[t.jsx("h4",{children:"Lead Management"}),t.jsxs("table",{className:"table management-table",children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Lead"}),t.jsx("th",{children:"Assigned"}),t.jsx("th",{children:"Status"}),t.jsx("th",{children:"Action"})]})}),t.jsx("tbody",{children:vg.map(e=>t.jsxs("tr",{children:[t.jsx("td",{children:e.lead}),t.jsx("td",{children:e.assigned}),t.jsx("td",{children:t.jsx("span",{className:`tag ${e.statusClass}`,children:e.status})}),t.jsx("td",{children:t.jsx("button",{className:`table-action-btn ${e.actionClass}`.trim(),children:e.action})})]},`${e.lead}-${e.assigned}`))})]})]}),t.jsxs("div",{className:"card management-tile",children:[t.jsx("h4",{children:"Company Management"}),t.jsxs("table",{className:"table management-table",children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Company"}),t.jsx("th",{children:"Zone"}),t.jsx("th",{children:"Status"}),t.jsx("th",{children:"Actions"})]})}),t.jsx("tbody",{children:yg.map(e=>t.jsxs("tr",{children:[t.jsx("td",{children:e.company}),t.jsx("td",{children:e.zone}),t.jsx("td",{children:t.jsx("span",{className:`tag ${e.statusClass}`,children:e.status})}),t.jsx("td",{children:t.jsx("button",{className:`table-action-btn ${e.actionClass}`.trim(),children:e.action})})]},`${e.company}-${e.zone}`))})]})]})]})}),t.jsx("section",{className:"col middle",children:t.jsxs("div",{className:"card",children:[t.jsx("h4",{children:"Accounts Overview"}),t.jsxs("div",{className:"stats",children:[t.jsxs("div",{className:"stat",children:[t.jsx("div",{className:"small",children:"Pending Invoices"}),t.jsx("div",{className:"big",children:Go.pendingInvoices})]}),t.jsxs("div",{className:"stat",children:[t.jsx("div",{className:"small",children:"Total Revenue"}),t.jsx("div",{className:"big",children:Go.totalRevenue})]})]}),t.jsx("h5",{children:"Recent Payments"}),t.jsxs("table",{className:"table small",children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Invoice"}),t.jsx("th",{children:"Client"}),t.jsx("th",{children:"Amount"}),t.jsx("th",{children:"Status"})]})}),t.jsx("tbody",{children:bg.map(e=>t.jsxs("tr",{children:[t.jsx("td",{children:e.invoice}),t.jsx("td",{children:e.client}),t.jsx("td",{children:e.amount}),t.jsx("td",{children:t.jsx("span",{className:`tag ${e.statusClass}`,children:e.status})})]},`${e.invoice}-${e.client}`))})]})]})}),t.jsxs("aside",{className:"col right",children:[t.jsxs("div",{className:"card small-card",children:[t.jsx("h4",{children:"Company Management"}),t.jsx("div",{className:"feed",children:jg.map(e=>t.jsxs("div",{className:"feed-item",children:[t.jsx("strong",{children:e.prefix})," ",e.message,t.jsx("span",{className:"muted",children:e.time})]},`${e.prefix}-${e.message}`))})]}),t.jsxs("div",{className:"card small-card",children:[t.jsx("h4",{children:"Live Activity Feed"}),t.jsx("div",{className:"feed",children:wg.map(e=>t.jsxs("div",{className:"feed-item",children:[e.message,t.jsx("span",{className:"muted",children:e.time})]},`${e.message}-${e.time}`))})]})]})]})]})]})]})}const Sg=`.logout-page{
  font-family:Segoe UI,sans-serif;
  display:flex;
  align-items:center;
  justify-content:center;
  height:100vh;
  background:#eef1f7;
  color:#2c3e50;
}

.logout-page .card{
  background:#fff;
  padding:24px;
  border-radius:10px;
  box-shadow:0 8px 20px rgba(0,0,0,.08);
}
`;function Cg(){return Ge({pageKey:"logout",pageCssText:Sg,includeHeader:!1,includeTheme:!1}),t.jsx("div",{className:"logout-page",children:t.jsxs("div",{className:"card",children:[t.jsx("h2",{children:"You are logged out"}),t.jsx("p",{children:t.jsx(Xa,{to:"/admin/dashboard",children:"Return to dashboard"})})]})})}const Eg=[{key:"approval",iconClass:"fa fa-clipboard-check",title:"Approval List",description:"Pending approvals for companies, services & payments"},{key:"request",iconClass:"fa fa-file-circle-plus",title:"Request Form",description:"Incoming requests from clients and staff"}],Pg=[{type:"Company Registration",reference:"BR-1024",requestedBy:"Client – ABC Corp"}],Ag=[{requestType:"Document Upload",reference:"REQ-2031",from:"Client – XYZ Ltd"}],Tg=["Rahul","Priya","Amit"],Dg=`:root{
  --primary:#2f8f83;
  --dark:#1f2f3a;
  --bg:#eef1f7;
  --card:#ffffff;
  --text:#2c3e50;
  --muted:#7f8c8d;
  --line:#e2ebf5;
  --shadow:rgba(0,0,0,0.1);
}

*{margin:0;padding:0;box-sizing:border-box;font-family:"Segoe UI",sans-serif;}
body{
  background:radial-gradient(circle at 0% 0%, #ffffff 0%, #edf3fb 50%, #e6edf8 100%);
  color:var(--text);
}

.page{padding:24px;max-width:1450px;margin:0 auto;}
.page-header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:20px;
}
.page-header h2{
  font-size:30px;
  color:#1d3f64;
  letter-spacing:.2px;
}
.page-header h2 i{margin-right:8px;color:#2f8f83;}

.tiles{
  display:grid;
  grid-template-columns:repeat(auto-fit,minmax(260px,1fr));
  gap:18px;
  margin-bottom:22px;
}
.tile{
  background:linear-gradient(140deg,#ffffff,#f7fbff);
  border:1px solid var(--line);
  padding:25px;
  border-radius:16px;
  box-shadow:0 10px 22px rgba(18,38,63,.10);
  cursor:pointer;
  transition:.25s ease;
}
.tile:hover{
  transform:translateY(-4px);
  box-shadow:0 16px 30px rgba(18,38,63,.14);
  border-color:#cddff2;
}
.tile i{
  font-size:30px;
  color:#2d8de0;
  margin-bottom:10px;
}
.tile h3{
  font-size:22px;
  margin-bottom:6px;
  color:#1a3a5b;
}
.tile p{font-size:14px;color:var(--muted);}
.tile:first-child,
.tile:last-child{
  background:linear-gradient(140deg,#f6fbff,#edf7ff);
}

.card{
  background:linear-gradient(180deg,#ffffff,#fbfdff);
  border:1px solid var(--line);
  border-radius:16px;
  box-shadow:0 10px 22px rgba(18,38,63,.08);
  padding:20px;
  display:none;
}
.card h3{
  font-size:24px;
  color:#1d4268;
}

table{
  width:100%;
  border-collapse:separate;
  border-spacing:0;
  border:1px solid var(--line);
  border-radius:12px;
  overflow:hidden;
}
th,td{
  padding:12px;
  font-size:14px;
  border-bottom:1px solid #edf2f8;
}
th{
  background:#f6faff;
  text-align:left;
  color:#60758d;
  font-size:12px;
  text-transform:uppercase;
  letter-spacing:.45px;
}
tr:hover{background:#f8fbff}
tbody tr:last-child td{border-bottom:none;}

.btn{
  padding:7px 13px;
  border:1px solid transparent;
  border-radius:999px;
  cursor:pointer;
  font-size:12px;
  font-weight:700;
}
.approve{background:linear-gradient(135deg,#2ec68f,#21a976);border-color:#8be4c3;color:#fff;}
.email{background:linear-gradient(135deg,#49adf7,#2d8de0);border-color:#96d0fa;color:#fff;}
.assign{background:linear-gradient(135deg,#ffb84f,#ef9721);border-color:#ffd59e;color:#fff;}
.view{background:linear-gradient(135deg,#8f9cab,#748497);border-color:#c2cad4;color:#fff;}
.btn:hover{filter:brightness(1.05)}

.modal{
  position:fixed;
  inset:0;
  background:rgba(0,0,0,.6);
  display:none;
  align-items:center;
  justify-content:center;
  z-index:100;
}
.modal-content{
  background:linear-gradient(180deg,#ffffff,#f8fbff);
  border:1px solid var(--line);
  padding:25px;
  border-radius:14px;
  width:350px;
  box-shadow:0 16px 32px rgba(0,0,0,.22);
}
.modal-content select{
  width:100%;
  padding:10px;
  border-radius:10px;
  border:1px solid #d2dce8;
  margin:15px 0;
}

.popup{
  position:fixed;
  top:20px;
  right:20px;
  background:#27ae60;
  color:#fff;
  padding:12px 18px;
  border-radius:10px;
  box-shadow:0 10px 18px rgba(39,174,96,.28);
  display:none;
  z-index:200;
}
@media(max-width:900px){
  .page{padding:16px;}
  .page-header h2{font-size:24px;}
  .tile h3{font-size:20px;}
  .card h3{font-size:20px;}
}
`;function Rg(){Ge({pageKey:"operations",pageCssText:Dg});const[e,n]=S.useState(null),[r,a]=S.useState(!1),[i,s]=S.useState("Select Salesperson"),[l,o]=S.useState(""),d=S.useRef(null);S.useEffect(()=>()=>{d.current&&clearTimeout(d.current)},[]);function p(u){d.current&&clearTimeout(d.current),o(u),d.current=setTimeout(()=>{o(""),d.current=null},3e3)}function m(){p("Email sent successfully")}function g(){a(!1),p("Salesperson assigned successfully")}return t.jsxs(t.Fragment,{children:[t.jsx(tn,{adminName:"Admin"}),t.jsxs("div",{className:"page",children:[t.jsx("div",{className:"page-header",children:t.jsxs("h2",{children:[t.jsx("i",{className:"fa fa-gears"}),"Operations"]})}),t.jsx("div",{className:"tiles",children:Eg.map(u=>t.jsxs("div",{className:"tile",onClick:()=>{n(u.key)},children:[t.jsx("i",{className:u.iconClass}),t.jsx("h3",{children:u.title}),t.jsx("p",{children:u.description})]},u.key))}),t.jsxs("div",{className:"card",id:"approvalCard",style:{display:e==="approval"?"block":"none"},children:[t.jsx("h3",{children:"Approval List"}),t.jsx("br",{}),t.jsxs("table",{children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Type"}),t.jsx("th",{children:"Reference"}),t.jsx("th",{children:"Requested By"}),t.jsx("th",{children:"Actions"})]})}),t.jsx("tbody",{children:Pg.map(u=>t.jsxs("tr",{children:[t.jsx("td",{children:u.type}),t.jsx("td",{children:u.reference}),t.jsx("td",{children:u.requestedBy}),t.jsxs("td",{children:[t.jsx("button",{className:"btn approve",type:"button",children:"Approve"})," ",t.jsx("button",{className:"btn email",type:"button",onClick:()=>{m()},children:"Send Email"})," ",t.jsx("button",{className:"btn assign",type:"button",onClick:()=>{a(!0)},children:"Assign"})]})]},`${u.type}-${u.reference}`))})]})]}),t.jsxs("div",{className:"card",id:"requestCard",style:{display:e==="request"?"block":"none"},children:[t.jsx("h3",{children:"Request Form"}),t.jsx("br",{}),t.jsxs("table",{children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Request Type"}),t.jsx("th",{children:"Reference"}),t.jsx("th",{children:"From"}),t.jsx("th",{children:"Actions"})]})}),t.jsx("tbody",{children:Ag.map(u=>t.jsxs("tr",{children:[t.jsx("td",{children:u.requestType}),t.jsx("td",{children:u.reference}),t.jsx("td",{children:u.from}),t.jsxs("td",{children:[t.jsx("button",{className:"btn view",type:"button",children:"View"})," ",t.jsx("button",{className:"btn email",type:"button",onClick:()=>{m()},children:"Send Email"})," ",t.jsx("button",{className:"btn assign",type:"button",onClick:()=>{a(!0)},children:"Assign"})]})]},`${u.requestType}-${u.reference}`))})]})]})]}),t.jsx("div",{className:"modal",id:"assignModal",style:{display:r?"flex":"none"},onClick:u=>{u.target.id==="assignModal"&&a(!1)},children:t.jsxs("div",{className:"modal-content",children:[t.jsx("h3",{children:"Assign Salesperson"}),t.jsxs("select",{value:i,onChange:u=>{s(u.target.value)},children:[t.jsx("option",{children:"Select Salesperson"}),Tg.map(u=>t.jsx("option",{children:u},u))]}),t.jsx("button",{className:"btn approve",type:"button",onClick:g,children:"Assign"})]})}),t.jsx("div",{className:"popup",id:"popup",style:{display:l?"block":"none"},children:l})]})}const zg=["Export as CSV","Export as PDF","Download Invoice"],Ig=[{key:"revenue",cardClass:"payp-kpi-revenue",iconClass:"fa-solid fa-bolt",label:"Total Revenue",value:"AED 82,500",meta:"Invoice"},{key:"pending",cardClass:"payp-kpi-pending",iconClass:"fa-solid fa-hourglass-half",label:"Pending Payments",value:"AED 8,700",meta:"Invoice"},{key:"paid",cardClass:"payp-kpi-paid",iconClass:"fa-solid fa-check",label:"Paid Invoices",value:"AED 65,800",meta:"Paid Invoices"},{key:"overdue",cardClass:"payp-kpi-overdue",iconClass:"fa-solid fa-exclamation",label:"Overdue Payments",value:"AED 8,000",meta:"Overdue"}],Lg=["All","Invoice","Credit Note"],Xo=["All","Created","Paid","Overdue"],Mg=["Customer","Qubicle Technologies LLC","FutureTech Solutions","Global Electronics"],Fg=["10 Items/page","20 Items/page","50 Items/page"],Zo=[{id:"INV-00255",customer:"Qubicle Technologies LLC",type:"Invoice",date:"18/10/2025",status:"Created",invoiceId:"INV-00255",dueDate:"18/10/2025",entryDate:"18/10/2025",itemLabel:"Appliance Repair",itemAmount:"AED 2,000",discount:"AED 2,000",tax:"00",adjustment:"AED 2,000",total:"AED 2,000",assignedTo:"Arun Paul"},{id:"INV-00263",customer:"FutureTech Solutions",type:"Invoice",date:"19/06/2025",status:"Paid",invoiceId:"INV-00263",dueDate:"19/06/2025",entryDate:"19/06/2025",itemLabel:"Annual Maintenance",itemAmount:"AED 7,800",discount:"AED 0",tax:"0",adjustment:"AED 0",total:"AED 7,800",assignedTo:"Priyanka Das"},{id:"INV-00198",customer:"Global Electronics",type:"Invoice",date:"18/06/2025",status:"Paid",invoiceId:"INV-00198",dueDate:"18/06/2025",entryDate:"18/06/2025",itemLabel:"Device Replacement",itemAmount:"AED 5,900",discount:"AED 0",tax:"0",adjustment:"AED 0",total:"AED 5,900",assignedTo:"Sameer Khan"}],Og=`html,
body {
  margin: 0;
  padding: 0;
}

* {
  box-sizing: border-box;
}

.payments-page-v2 {
  max-width: 1460px;
  margin: 0 auto;
  padding: 24px;
  color: #2f3c4e;
  --payp-btn-primary: var(--primary, #1f8f8b);
  --payp-btn-secondary: var(--secondary, #2fb7b0);
  --payp-btn-shadow: 0 8px 18px rgba(31, 143, 139, 0.24);
  --payp-btn-shadow-hover: 0 12px 24px rgba(31, 143, 139, 0.32);
}

body,
.payments-page-v2,
.payments-page-v2 * {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

.payments-page-v2 .fa-solid {
  font-family: "Font Awesome 6 Free" !important;
  font-weight: 900;
}

.payments-page-v2 .fa-regular {
  font-family: "Font Awesome 6 Free" !important;
  font-weight: 400;
}

.payments-page-v2 button,
.payments-page-v2 select,
.payments-page-v2 input {
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, color 0.2s ease, transform 0.15s ease;
}

.payments-page-v2 button:focus-visible,
.payments-page-v2 select:focus-visible,
.payments-page-v2 input:focus-visible {
  outline: 2px solid rgba(31, 143, 139, 0.35);
  outline-offset: 1px;
}

.payments-page-v2 .payp-topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  gap: 12px;
}

.payments-page-v2 .payp-topbar h2 {
  margin: 0;
  font-size: 30px;
  font-weight: 700;
  color: #303c4f;
}

.payments-page-v2 .payp-top-actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.payments-page-v2 .payp-top-btn {
  border: 1px solid transparent;
  border-radius: 9px;
  background: linear-gradient(135deg, var(--payp-btn-primary), var(--payp-btn-secondary));
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  padding: 8px 16px;
  min-height: 36px;
  box-shadow: var(--payp-btn-shadow);
  cursor: pointer;
}

.payments-page-v2 .payp-top-btn:hover {
  box-shadow: var(--payp-btn-shadow-hover);
  transform: translateY(-1px);
  filter: brightness(1.03);
}

.payments-page-v2 .payp-top-btn:active {
  transform: translateY(0);
}

.payments-page-v2 .payp-kpi-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  margin-bottom: 14px;
  background: transparent;
}

.payments-page-v2 .payp-kpi {
  padding: 16px 18px;
  border: 1px solid #dde4ef;
  border-top: 4px solid #2f80d7;
  border-radius: 16px;
  background: #eef1f5;
  box-shadow: 0 8px 20px rgba(19, 39, 67, 0.08);
}

.payments-page-v2 .payp-kpi-head {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #48627f;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 7px;
}

.payments-page-v2 .payp-kpi-icon {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 10px;
}

.payments-page-v2 .payp-kpi-revenue .payp-kpi-icon {
  background: #4f8eed;
}

.payments-page-v2 .payp-kpi-pending .payp-kpi-icon {
  background: #f2b93f;
}

.payments-page-v2 .payp-kpi-paid .payp-kpi-icon {
  background: #29b5a9;
}

.payments-page-v2 .payp-kpi-overdue .payp-kpi-icon {
  background: #ef6a57;
}

.payments-page-v2 .payp-kpi-value {
  font-size: 40px;
  font-weight: 800;
  line-height: 1.2;
  color: #1f4b78;
  margin-bottom: 5px;
}

.payments-page-v2 .payp-kpi-meta {
  font-size: 13px;
  color: #6a7f97;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
}

.payments-page-v2 .payp-kpi-meta i {
  font-size: 8px;
  color: #6a7f97;
}

.payments-page-v2 .payp-kpi:nth-child(2) {
  background: #edf4f3;
  border-top-color: #2fbe9a;
}

.payments-page-v2 .payp-kpi:nth-child(3) {
  background: #f2f0ec;
  border-top-color: #f39c12;
}

.payments-page-v2 .payp-kpi:nth-child(4) {
  background: #f0edf5;
  border-top-color: #6f42c1;
}

.payments-page-v2 .payp-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 10px;
  align-items: stretch;
}

.payments-page-v2 .payp-left-panel,
.payments-page-v2 .payp-right-panel {
  border: 1px solid #d9e2ef;
  background: #f8fafd;
  border-radius: 8px;
  min-height: 560px;
}

.payments-page-v2 .payp-left-panel {
  padding: 8px;
}

.payments-page-v2 .payp-filter-wrap {
  border: 1px solid #dde5f1;
  background: #f2f5fb;
  border-radius: 8px;
  padding: 8px;
  margin-bottom: 8px;
}

.payments-page-v2 .payp-filter-row {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr)) 58px;
  gap: 8px;
  margin-bottom: 7px;
  align-items: center;
}

.payments-page-v2 .payp-filter-row:last-child {
  margin-bottom: 0;
}

.payments-page-v2 .payp-control {
  display: grid;
  grid-template-columns: 88px minmax(0, 1fr);
  align-items: center;
  gap: 8px;
}

.payments-page-v2 .payp-control label {
  font-size: 12px;
  font-weight: 700;
  color: #5b6f8b;
  min-width: 0;
  white-space: nowrap;
  margin: 0;
}

.payments-page-v2 .payp-control select,
.payments-page-v2 .payp-control input {
  width: 100%;
  height: 32px;
  border: 1px solid #ccd6e8;
  border-radius: 5px;
  background: #f8faff;
  color: #4c607c;
  font-size: 12px;
  padding: 0 10px;
}

.payments-page-v2 .payp-control input::placeholder {
  color: #9aaac0;
}

.payments-page-v2 .payp-mini-btn {
  border: 1px solid transparent;
  border-radius: 7px;
  background: linear-gradient(135deg, var(--payp-btn-primary), var(--payp-btn-secondary));
  color: #ffffff;
  font-size: 12px;
  font-weight: 700;
  padding: 0 10px;
  width: 58px;
  height: 32px;
  box-shadow: 0 6px 14px rgba(31, 143, 139, 0.22);
  cursor: pointer;
}

.payments-page-v2 .payp-mini-btn:hover {
  box-shadow: 0 10px 18px rgba(31, 143, 139, 0.3);
  transform: translateY(-1px);
  filter: brightness(1.03);
}

.payments-page-v2 .payp-table-wrap {
  border: 1px solid #dde5f1;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
}

.payments-page-v2 .payp-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.payments-page-v2 .payp-col-customer {
  width: 30%;
}

.payments-page-v2 .payp-col-type {
  width: 11%;
}

.payments-page-v2 .payp-col-date {
  width: 14%;
}

.payments-page-v2 .payp-col-status {
  width: 12%;
}

.payments-page-v2 .payp-col-amount {
  width: 15%;
}

.payments-page-v2 .payp-col-assigned {
  width: 14%;
}

.payments-page-v2 .payp-col-action {
  width: 4%;
}

.payments-page-v2 .payp-table th,
.payments-page-v2 .payp-table td {
  border-bottom: 1px solid #e8edf6;
  padding: 12px 12px;
  font-size: 13px;
  color: #344a66;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.payments-page-v2 .payp-table th {
  background: #f3f6fb;
  font-size: 12px;
  font-weight: 800;
  color: #4d6380;
}

.payments-page-v2 .payp-row {
  cursor: pointer;
  transition: background 0.2s ease;
}

.payments-page-v2 .payp-row:hover {
  background: #f7fafe;
}

.payments-page-v2 .payp-row.active {
  background: #eef4ff;
}

.payments-page-v2 .payp-status-tag {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  font-weight: 700;
  font-size: 12px;
  padding: 4px 0;
}

.payments-page-v2 .payp-status-tag.created {
  color: #546a86;
}

.payments-page-v2 .payp-status-tag.paid {
  color: #17a680;
}

.payments-page-v2 .payp-assigned {
  font-weight: 500;
}

.payments-page-v2 .payp-action-cell {
  text-align: center !important;
  padding-left: 4px !important;
  padding-right: 4px !important;
}

.payments-page-v2 .payp-dot-btn {
  width: 26px;
  height: 26px;
  border: 1px solid rgba(31, 143, 139, 0.28);
  border-radius: 50%;
  background: rgba(31, 143, 139, 0.1);
  color: var(--payp-btn-primary);
  cursor: pointer;
  padding: 0;
  font-size: 12px;
}

.payments-page-v2 .payp-dot-btn:hover {
  border-color: var(--payp-btn-primary);
  background: linear-gradient(135deg, var(--payp-btn-primary), var(--payp-btn-secondary));
  color: #ffffff;
}

.payments-page-v2 .payp-table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  background: #f8fafd;
}

.payments-page-v2 .payp-record-count {
  font-size: 12px;
  color: #5d7190;
  font-weight: 700;
}

.payments-page-v2 .payp-footer-controls {
  display: flex;
  align-items: center;
  gap: 4px;
}

.payments-page-v2 .payp-nav-btn {
  width: 24px;
  height: 20px;
  border: 1px solid rgba(31, 143, 139, 0.3);
  background: rgba(31, 143, 139, 0.08);
  border-radius: 5px;
  color: var(--payp-btn-primary);
  font-size: 9px;
  box-shadow: 0 1px 4px rgba(31, 143, 139, 0.14);
  cursor: pointer;
}

.payments-page-v2 .payp-nav-btn:hover {
  border-color: var(--payp-btn-primary);
  background: linear-gradient(135deg, var(--payp-btn-primary), var(--payp-btn-secondary));
  color: #ffffff;
  transform: translateY(-1px);
}

.payments-page-v2 .payp-page-pill {
  min-width: 26px;
  height: 20px;
  border: 1px solid #cfd8e7;
  border-radius: 3px;
  background: #fff;
  color: #516985;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
}

.payments-page-v2 .payp-page-size {
  height: 22px;
  border: 1px solid rgba(31, 143, 139, 0.3);
  border-radius: 5px;
  background: #ffffff;
  color: var(--payp-btn-primary);
  font-size: 11px;
  padding: 0 8px;
}

.payments-page-v2 .payp-right-panel {
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.payments-page-v2 .payp-info-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 8px;
  border-bottom: 1px solid #dbe4f0;
  margin-bottom: 10px;
}

.payments-page-v2 .payp-info-head h3 {
  margin: 0;
  font-size: 17px;
  color: #2e4058;
}

.payments-page-v2 .payp-primary-btn {
  border: 1px solid transparent;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--payp-btn-primary), var(--payp-btn-secondary));
  color: #fff;
  font-size: 11px;
  font-weight: 800;
  padding: 7px 14px;
  box-shadow: var(--payp-btn-shadow);
  cursor: pointer;
}

.payments-page-v2 .payp-primary-btn:hover {
  box-shadow: var(--payp-btn-shadow-hover);
  transform: translateY(-1px);
  filter: brightness(1.03);
}

.payments-page-v2 .payp-customer-block {
  margin-bottom: 10px;
}

.payments-page-v2 .payp-label {
  font-size: 12px;
  color: #8394ab;
  margin-bottom: 4px;
}

.payments-page-v2 .payp-customer-name {
  font-size: 20px;
  color: #2f4058;
  font-weight: 700;
}

.payments-page-v2 .payp-info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  border-top: 1px solid #dfe7f2;
  border-bottom: 1px solid #dfe7f2;
  margin-bottom: 12px;
}

.payments-page-v2 .payp-info-grid > div {
  padding: 8px 6px;
  border-right: 1px solid #e3eaf5;
}

.payments-page-v2 .payp-info-grid > div:nth-child(3n) {
  border-right: none;
}

.payments-page-v2 .payp-value {
  font-size: 13px;
  font-weight: 700;
  color: #3a4f69;
}

.payments-page-v2 .payp-items-panel {
  border: 1px solid #dce5f1;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 10px;
}

.payments-page-v2 .payp-items-title {
  background: #f0f4fa;
  color: #405773;
  font-size: 13px;
  font-weight: 800;
  padding: 8px 10px;
}

.payments-page-v2 .payp-item-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  border-top: 1px solid #e4ebf6;
  font-size: 13px;
  color: #4b607a;
}

.payments-page-v2 .payp-item-row.total {
  background: #f8fbff;
  font-size: 18px;
  font-weight: 800;
  color: #324760;
}

.payments-page-v2 .payp-item-row.total strong {
  font-size: 18px;
}

.payments-page-v2 .payp-record-btn {
  border: 1px solid transparent;
  border-radius: 8px;
  background: linear-gradient(135deg, var(--payp-btn-primary), var(--payp-btn-secondary));
  color: #fff;
  padding: 10px 14px;
  font-size: 15px;
  font-weight: 700;
  box-shadow: var(--payp-btn-shadow);
  cursor: pointer;
  margin-bottom: 10px;
}

.payments-page-v2 .payp-record-btn:hover {
  transform: translateY(-1px);
  box-shadow: var(--payp-btn-shadow-hover);
  filter: brightness(1.03);
}

.payments-page-v2 .payp-side-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 8px;
}

.payments-page-v2 .payp-side-btn {
  border: 1px solid transparent;
  border-radius: 7px;
  background: linear-gradient(135deg, var(--payp-btn-primary), var(--payp-btn-secondary));
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
  padding: 8px 10px;
  min-height: 38px;
  box-shadow: var(--payp-btn-shadow);
  cursor: pointer;
}

.payments-page-v2 .payp-side-btn i {
  margin-right: 6px;
}

.payments-page-v2 .payp-side-btn:hover {
  box-shadow: var(--payp-btn-shadow-hover);
  transform: translateY(-1px);
  filter: brightness(1.03);
}

.payments-page-v2 .payp-csv-select {
  border: 1px solid rgba(31, 143, 139, 0.3);
  border-radius: 6px;
  background: #fff;
  color: var(--payp-btn-primary);
  font-size: 13px;
  font-weight: 700;
  padding: 0 8px;
  height: 37px;
}

@media (max-width: 1300px) {
  .payments-page-v2 .payp-kpi-value {
    font-size: 30px;
  }
}

@media (max-width: 1100px) {
  .payments-page-v2 .payp-layout {
    grid-template-columns: 1fr;
  }

  .payments-page-v2 .payp-right-panel {
    min-height: auto;
  }
}

@media (max-width: 900px) {
  .payments-page-v2 .payp-kpi-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .payments-page-v2 .payp-filter-row {
    grid-template-columns: 1fr;
  }

  .payments-page-v2 .payp-control {
    grid-template-columns: 96px minmax(0, 1fr);
  }

  .payments-page-v2 .payp-table {
    table-layout: auto;
  }

  .payments-page-v2 .payp-table th,
  .payments-page-v2 .payp-table td {
    white-space: normal;
  }
}

@media (max-width: 700px) {
  .payments-page-v2 {
    padding: 14px 4px 20px;
  }

  .payments-page-v2 .payp-topbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .payments-page-v2 .payp-info-grid {
    grid-template-columns: 1fr 1fr;
  }

  .payments-page-v2 .payp-info-grid > div:nth-child(3n) {
    border-right: 1px solid #e3eaf5;
  }

  .payments-page-v2 .payp-info-grid > div:nth-child(2n) {
    border-right: none;
  }

  .payments-page-v2 .payp-side-actions {
    grid-template-columns: 1fr;
  }
}
`;function _g(e){return e==="Paid"?t.jsxs("span",{className:"payp-status-tag paid payp-status-text",children:[t.jsx("i",{className:"fa-solid fa-circle-check"})," Paid"]}):t.jsx("span",{className:"payp-status-tag created payp-status-text",children:e})}function Bg(){var l;Ge({pageKey:"payments-reports",pageCssText:Og});const[e,n]=S.useState(Zo),[r,a]=S.useState(((l=Zo[0])==null?void 0:l.id)??null),i=e.find(o=>o.id===r)??e[0]??null;function s(){r&&n(o=>o.map(d=>d.id===r?{...d,status:"Paid"}:d))}return t.jsxs(t.Fragment,{children:[t.jsx(tn,{adminName:"Admin"}),t.jsxs("div",{className:"page payments-page-v2",children:[t.jsxs("div",{className:"payp-topbar",children:[t.jsx("h2",{children:"Payments & Reports"}),t.jsx("div",{className:"payp-top-actions",children:zg.map(o=>t.jsx("button",{type:"button",className:"payp-top-btn",children:o},o))})]}),t.jsx("section",{className:"payp-kpi-grid",children:Ig.map(o=>t.jsxs("article",{className:`payp-kpi ${o.cardClass}`,children:[t.jsxs("div",{className:"payp-kpi-head",children:[t.jsx("span",{className:"payp-kpi-icon",children:t.jsx("i",{className:o.iconClass})}),t.jsx("span",{children:o.label})]}),t.jsx("div",{className:"payp-kpi-value",children:o.value}),t.jsxs("div",{className:"payp-kpi-meta",children:[t.jsx("i",{className:"fa-solid fa-circle"})," ",o.meta]})]},o.key))}),t.jsxs("div",{className:"payp-layout",children:[t.jsxs("section",{className:"payp-left-panel",children:[t.jsxs("div",{className:"payp-filter-wrap",children:[t.jsxs("div",{className:"payp-filter-row",children:[t.jsxs("div",{className:"payp-control",children:[t.jsx("label",{children:"Type"}),t.jsx("select",{defaultValue:"All",children:Lg.map(o=>t.jsx("option",{children:o},o))})]}),t.jsxs("div",{className:"payp-control",children:[t.jsx("label",{children:"Status"}),t.jsx("select",{defaultValue:"All",children:Xo.map(o=>t.jsx("option",{children:o},o))})]}),t.jsxs("div",{className:"payp-control payp-control-wide",children:[t.jsx("label",{children:"Date Range"}),t.jsx("input",{type:"text",placeholder:"Date Range.."})]}),t.jsx("button",{type:"button",className:"payp-mini-btn",children:t.jsx("i",{className:"fa-solid fa-ellipsis"})})]}),t.jsxs("div",{className:"payp-filter-row",children:[t.jsxs("div",{className:"payp-control",children:[t.jsx("label",{children:"Status"}),t.jsx("select",{defaultValue:"All",children:Xo.map(o=>t.jsx("option",{children:o},o))})]}),t.jsxs("div",{className:"payp-control",children:[t.jsx("label",{children:"Customer"}),t.jsx("input",{type:"text",placeholder:"Customer"})]}),t.jsxs("div",{className:"payp-control",children:[t.jsx("label",{children:"Customer"}),t.jsx("select",{defaultValue:"Customer",children:Mg.map(o=>t.jsx("option",{children:o},o))})]}),t.jsx("button",{type:"button",className:"payp-mini-btn",children:"Clear"})]})]}),t.jsxs("div",{className:"payp-table-wrap",children:[t.jsxs("table",{className:"payp-table",children:[t.jsxs("colgroup",{children:[t.jsx("col",{className:"payp-col-customer"}),t.jsx("col",{className:"payp-col-type"}),t.jsx("col",{className:"payp-col-date"}),t.jsx("col",{className:"payp-col-status"}),t.jsx("col",{className:"payp-col-amount"}),t.jsx("col",{className:"payp-col-assigned"}),t.jsx("col",{className:"payp-col-action"})]}),t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Customer"}),t.jsx("th",{children:"Type"}),t.jsx("th",{children:"Date"}),t.jsx("th",{children:"Status"}),t.jsx("th",{children:"Amount (AED)"}),t.jsx("th",{children:"Assigned To"}),t.jsx("th",{})]})}),t.jsx("tbody",{children:e.map(o=>t.jsxs("tr",{className:`payp-row${o.id===r?" active":""}`,onClick:()=>{a(o.id)},children:[t.jsx("td",{children:o.customer}),t.jsx("td",{children:o.type}),t.jsx("td",{children:o.date}),t.jsx("td",{children:_g(o.status)}),t.jsx("td",{children:o.total}),t.jsx("td",{className:"payp-assigned",children:o.assignedTo}),t.jsx("td",{className:"payp-action-cell",children:t.jsx("button",{type:"button",className:"payp-dot-btn",children:t.jsx("i",{className:"fa-solid fa-ellipsis"})})})]},o.id))})]}),t.jsxs("div",{className:"payp-table-footer",children:[t.jsx("div",{className:"payp-record-count",children:"1-5 of 50 records"}),t.jsxs("div",{className:"payp-footer-controls",children:[t.jsx("button",{type:"button",className:"payp-nav-btn",children:t.jsx("i",{className:"fa-solid fa-backward-step"})}),t.jsx("button",{type:"button",className:"payp-nav-btn",children:t.jsx("i",{className:"fa-solid fa-caret-left"})}),t.jsx("span",{className:"payp-page-pill",children:"10"}),t.jsx("button",{type:"button",className:"payp-nav-btn",children:t.jsx("i",{className:"fa-solid fa-caret-right"})}),t.jsx("button",{type:"button",className:"payp-nav-btn",children:t.jsx("i",{className:"fa-solid fa-forward-step"})}),t.jsx("select",{className:"payp-page-size",defaultValue:"10 Items/page",children:Fg.map(o=>t.jsx("option",{children:o},o))})]})]})]})]}),t.jsxs("aside",{className:"payp-right-panel",children:[t.jsxs("div",{className:"payp-info-head",children:[t.jsx("h3",{children:"Payment Information"}),t.jsx("button",{type:"button",id:"paypMarkAsPaidBtn",className:"payp-primary-btn",onClick:s,children:"Mark as Paid"})]}),t.jsxs("div",{className:"payp-customer-block",children:[t.jsx("div",{className:"payp-label",children:"Customer Name"}),t.jsx("div",{id:"paypCustomerName",className:"payp-customer-name",children:(i==null?void 0:i.customer)??"-"})]}),t.jsxs("div",{className:"payp-info-grid",children:[t.jsxs("div",{children:[t.jsx("div",{className:"payp-label",children:"Type"}),t.jsx("div",{id:"paypTypeValue",className:"payp-value",children:(i==null?void 0:i.type)??"-"})]}),t.jsxs("div",{children:[t.jsx("div",{className:"payp-label",children:"Invoice"}),t.jsx("div",{id:"paypInvoiceValue",className:"payp-value",children:(i==null?void 0:i.id)??"-"})]}),t.jsxs("div",{children:[t.jsx("div",{className:"payp-label",children:"Status"}),t.jsx("div",{id:"paypStatusValue",className:"payp-value",children:(i==null?void 0:i.status)??"-"})]}),t.jsxs("div",{children:[t.jsx("div",{className:"payp-label",children:"Invoice ID"}),t.jsx("div",{id:"paypInvoiceIdValue",className:"payp-value",children:(i==null?void 0:i.invoiceId)??"-"})]}),t.jsxs("div",{children:[t.jsx("div",{className:"payp-label",children:"Due Date"}),t.jsx("div",{id:"paypDueDateValue",className:"payp-value",children:(i==null?void 0:i.dueDate)??"-"})]}),t.jsxs("div",{children:[t.jsx("div",{className:"payp-label",children:"Date"}),t.jsx("div",{id:"paypDateValue",className:"payp-value",children:(i==null?void 0:i.entryDate)??"-"})]})]}),t.jsxs("div",{className:"payp-items-panel",children:[t.jsx("div",{className:"payp-items-title",children:"Items"}),t.jsxs("div",{className:"payp-item-row",children:[t.jsx("span",{id:"paypItemLabel",children:(i==null?void 0:i.itemLabel)??"-"}),t.jsx("strong",{id:"paypItemAmount",children:(i==null?void 0:i.itemAmount)??"-"})]}),t.jsxs("div",{className:"payp-item-row",children:[t.jsx("span",{children:"Discount"}),t.jsx("strong",{id:"paypDiscountAmount",children:(i==null?void 0:i.discount)??"-"})]}),t.jsxs("div",{className:"payp-item-row",children:[t.jsx("span",{children:"Tax(AED)"}),t.jsx("strong",{id:"paypTaxAmount",children:(i==null?void 0:i.tax)??"-"})]}),t.jsxs("div",{className:"payp-item-row",children:[t.jsx("span",{children:"Adjustment (AED)"}),t.jsx("strong",{id:"paypAdjustmentAmount",children:(i==null?void 0:i.adjustment)??"-"})]}),t.jsxs("div",{className:"payp-item-row total",children:[t.jsx("span",{children:"Grand Total"}),t.jsx("strong",{id:"paypGrandTotal",children:(i==null?void 0:i.total)??"-"})]})]}),t.jsx("button",{type:"button",className:"payp-record-btn",children:"Record Payment"}),t.jsxs("div",{className:"payp-side-actions",children:[t.jsxs("button",{type:"button",className:"payp-side-btn",children:[t.jsx("i",{className:"fa-regular fa-envelope"})," Send Invoice"]}),t.jsxs("button",{type:"button",className:"payp-side-btn",children:[t.jsx("i",{className:"fa-regular fa-file-lines"})," Download PDF"]})]}),t.jsxs("div",{className:"payp-side-actions",children:[t.jsxs("button",{type:"button",className:"payp-side-btn",children:[t.jsx("i",{className:"fa-solid fa-file-export"})," Export"]}),t.jsxs("select",{className:"payp-csv-select",defaultValue:"CSV",children:[t.jsx("option",{children:"CSV"}),t.jsx("option",{children:"PDF"})]})]})]})]})]})]})}const Ei={fullName:"System Administrator",username:"Admin",email:"admin@ledgerworx.me",phone:"9988776655",employeeId:"LW-ADM-001",department:"Admin",designation:"Administrator",profilePhoto:""},Ug=`* {
  box-sizing: border-box;
}

html,
body {
  margin: 0;
  padding: 0;
}

body {
  font-family: "Segoe UI", sans-serif;
  background: radial-gradient(circle at 0% 0%, #ffffff 0%, #edf3fb 50%, #e6edf8 100%);
  color: var(--text-dark, #1f2937);
}

.profile-page {
  max-width: 1140px;
  margin: 0 auto;
  padding: 24px;
}

.breadcrumb {
  font-size: 13px;
  color: var(--text-light, #6b7280);
  margin-bottom: 12px;
}

.profile-card {
  background: var(--card, #ffffff);
  border: 1px solid var(--border, #e5e7eb);
  border-radius: 16px;
  box-shadow: var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.05));
  padding: 22px;
}

.profile-header {
  margin-bottom: 16px;
}

.profile-header h2 {
  margin: 0;
  color: #1d4f77;
  font-size: 28px;
}

.profile-header p {
  margin: 8px 0 0;
  color: var(--text-light, #6b7280);
  font-size: 14px;
}

.alert {
  border-radius: 12px;
  padding: 12px 14px;
  margin-bottom: 16px;
  font-size: 14px;
  border: 1px solid transparent;
}

.alert.success {
  background: #edfdf3;
  border-color: #b7efce;
  color: #10683c;
}

.alert.error {
  background: #fff3f3;
  border-color: #f8c3c3;
  color: #9f2a2a;
}

.alert.error strong {
  display: block;
  margin-bottom: 8px;
}

.alert.error ul {
  margin: 0;
  padding-left: 18px;
}

.profile-form {
  margin-top: 6px;
}

.profile-layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 22px;
}

.photo-column {
  background: linear-gradient(160deg, #f7fbff, #eef6ff);
  border: 1px solid #d8e5f6;
  border-radius: 14px;
  padding: 16px;
  height: fit-content;
}

.photo-preview {
  width: 140px;
  height: 140px;
  margin: 0 auto 12px;
  border-radius: 50%;
  border: 2px dashed #9fbfe5;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  color: #93a6bc;
  overflow: hidden;
  font-size: 42px;
}

.photo-preview.has-photo {
  border-style: solid;
}

.photo-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.upload-btn {
  width: 100%;
  border: 1px solid #b6d5ef;
  border-radius: 10px;
  background: #ffffff;
  color: #27506f;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 12px;
  text-align: center;
  cursor: pointer;
  display: inline-block;
}

#profilePhoto {
  position: absolute;
  left: -9999px;
}

.hint {
  display: block;
  color: #59718a;
  margin-top: 10px;
  font-size: 12px;
  line-height: 1.4;
}

.fields-column {
  min-width: 0;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px 16px;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.field.field-full {
  grid-column: 1 / -1;
}

.field label {
  font-size: 12px;
  font-weight: 700;
  color: #516a83;
  letter-spacing: 0.3px;
}

.field input {
  width: 100%;
  border: 1px solid #d4dfec;
  border-radius: 10px;
  padding: 10px 12px;
  min-height: 42px;
  font-size: 14px;
  color: #1f3f60;
  background: #ffffff;
}

.field input:focus {
  outline: none;
  border-color: #8fb6df;
  box-shadow: 0 0 0 3px rgba(47, 143, 131, 0.14);
}

.field input[readonly] {
  background: #f5f8fc;
  color: #61738b;
}

.password-block {
  margin-top: 18px;
  border: 1px solid #dce7f4;
  border-radius: 14px;
  padding: 14px;
  background: #f9fcff;
}

.password-block h3 {
  margin: 0;
  font-size: 18px;
  color: #1d4f77;
}

.password-block p {
  margin: 6px 0 12px;
  font-size: 13px;
  color: #5f748c;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 18px;
}

.btn {
  min-width: 110px;
  border-radius: 999px;
  border: 1px solid transparent;
  padding: 10px 16px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 700;
  transition: 0.2s ease;
}

.btn.primary {
  color: #ffffff;
  background: linear-gradient(135deg, #2f8f83, #2fb7b0);
  border-color: #7ad6cf;
  box-shadow: 0 8px 16px rgba(31, 143, 139, 0.24);
}

.btn.primary:hover {
  filter: brightness(1.04);
}

.btn.secondary {
  color: #244766;
  background: #f6f9fc;
  border-color: #d5e2ef;
}

.btn.secondary:hover {
  background: #edf4fb;
}

body.dark-mode .photo-column,
body.dark .photo-column,
html.dark body .photo-column {
  background: rgba(15, 23, 42, 0.35);
  border-color: #3a4d64;
}

body.dark-mode .field input,
body.dark .field input,
html.dark body .field input {
  background: #0f172a;
  border-color: #334155;
  color: #f1f5f9;
}

body.dark-mode .field input[readonly],
body.dark .field input[readonly],
html.dark body .field input[readonly] {
  background: #1e293b;
  color: #cbd5e1;
}

body.dark-mode .password-block,
body.dark .password-block,
html.dark body .password-block {
  background: rgba(30, 41, 59, 0.55);
  border-color: #3a4d64;
}

@media (max-width: 900px) {
  .profile-page {
    padding: 16px;
  }

  .profile-layout {
    grid-template-columns: 1fr;
  }

  .photo-column {
    display: grid;
    grid-template-columns: 140px 1fr;
    align-items: center;
    gap: 14px;
  }

  .photo-preview {
    margin: 0;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 540px) {
  .profile-header h2 {
    font-size: 24px;
  }

  .photo-column {
    grid-template-columns: 1fr;
  }

  .photo-preview {
    margin: 0 auto 10px;
  }

  .form-actions {
    flex-direction: column-reverse;
  }

  .btn {
    width: 100%;
  }
}
`;function Pi(e){return{fullName:e.fullName,username:e.username,email:e.email,phone:e.phone,employeeId:e.employeeId,department:e.department,designation:e.designation,currentPassword:"",newPassword:"",confirmPassword:""}}function $g(e){const n=[];if(e.fullName.trim()===""&&n.push("Full Name is required."),e.username.trim()===""&&n.push("Username is required."),e.email.trim()===""?n.push("Official Email is required."):/^[^@\s]+@ledgerworx\.me$/i.test(e.email.trim())||n.push("Official Email must end with @ledgerworx.me."),e.phone.trim()==="")n.push("Phone Number is required.");else{const l=e.phone.replace(/\D+/g,"");(l.length<10||l.length>15)&&n.push("Phone Number must contain 10 to 15 digits.")}e.designation.trim()===""&&n.push("Designation is required.");const r=e.currentPassword.trim(),a=e.newPassword.trim(),i=e.confirmPassword.trim();return(r!==""||a!==""||i!=="")&&(r===""||a===""||i===""?n.push("To change password, fill Current, New, and Confirm password fields."):a.length<8?n.push("New Password must be at least 8 characters."):a!==i&&n.push("New Password and Confirm Password do not match.")),n}function Vg(){Ge({pageKey:"profile",pageCssText:Ug});const[e,n]=S.useState(Ei),[r,a]=S.useState(Pi(Ei)),[i,s]=S.useState(Ei.profilePhoto),[l,o]=S.useState([]),[d,p]=S.useState(""),m=S.useRef(null);function g(k,b){a(h=>({...h,[k]:b})),p("")}function u(k){const b=k.target.files&&k.target.files[0]?k.target.files[0]:null;if(p(""),!b){s(e.profilePhoto);return}const h=new FileReader;h.onload=()=>{s(typeof h.result=="string"?h.result:"")},h.readAsDataURL(b)}function y(k){k.preventDefault();const b=$g(r);if(b.length>0){o(b),p("");return}const h={fullName:r.fullName.trim(),username:r.username.trim(),email:r.email.trim(),phone:r.phone.trim(),employeeId:e.employeeId,department:e.department,designation:r.designation.trim(),profilePhoto:i};n(h),a(Pi(h)),o([]),p("Profile updated successfully."),m.current&&(m.current.value="")}function N(){a(Pi(e)),s(e.profilePhoto),o([]),p(""),m.current&&(m.current.value="")}return t.jsxs(t.Fragment,{children:[t.jsx(tn,{adminName:e.username||"Admin"}),t.jsxs("div",{className:"profile-page",children:[t.jsx("div",{className:"breadcrumb",children:"Dashboard > Profile"}),t.jsxs("section",{className:"profile-card","aria-labelledby":"profileTitle",children:[t.jsxs("div",{className:"profile-header",children:[t.jsx("h2",{id:"profileTitle",children:"Edit Profile"}),t.jsx("p",{children:"Update your admin details and account credentials."})]}),d!==""?t.jsx("div",{className:"alert success",role:"status",children:d}):null,l.length>0?t.jsxs("div",{className:"alert error",role:"alert",children:[t.jsx("strong",{children:"Please fix the following:"}),t.jsx("ul",{children:l.map(k=>t.jsx("li",{children:k},k))})]}):null,t.jsx("form",{id:"adminProfileForm",className:"profile-form",method:"post",encType:"multipart/form-data",onSubmit:y,children:t.jsxs("div",{className:"profile-layout",children:[t.jsxs("aside",{className:"photo-column",children:[t.jsx("div",{className:`photo-preview${i!==""?" has-photo":""}`,id:"profilePhotoPreview",children:i!==""?t.jsx("img",{src:i,alt:"Profile Photo",id:"profilePhotoImage"}):t.jsx("i",{className:"fa-solid fa-user","aria-hidden":"true"})}),t.jsx("label",{htmlFor:"profilePhoto",className:"upload-btn",children:"Choose Profile Photo"}),t.jsx("input",{ref:m,type:"file",id:"profilePhoto",name:"profile_photo",accept:".jpg,.jpeg,.png,.webp,.gif,image/*",onChange:u}),t.jsx("small",{className:"hint",children:"Optional. JPG, PNG, WEBP, or GIF (max 2MB)."})]}),t.jsxs("div",{className:"fields-column",children:[t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{htmlFor:"fullName",children:"Full Name"}),t.jsx("input",{type:"text",id:"fullName",name:"full_name",value:r.fullName,onChange:k=>{g("fullName",k.target.value)},required:!0})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{htmlFor:"username",children:"Username"}),t.jsx("input",{type:"text",id:"username",name:"username",value:r.username,onChange:k=>{g("username",k.target.value)},required:!0})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{htmlFor:"officialEmail",children:"Official Email (ledgerworx.me)"}),t.jsx("input",{type:"email",id:"officialEmail",name:"email",value:r.email,onChange:k=>{g("email",k.target.value)},pattern:"^[^@\\s]+@ledgerworx\\.me$",title:"Email must end with @ledgerworx.me",required:!0})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{htmlFor:"phoneNumber",children:"Phone Number"}),t.jsx("input",{type:"tel",id:"phoneNumber",name:"phone",value:r.phone,onChange:k=>{g("phone",k.target.value)},required:!0})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{htmlFor:"employeeId",children:"Employee ID"}),t.jsx("input",{type:"text",id:"employeeId",name:"employee_id",value:r.employeeId,readOnly:!0})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{htmlFor:"department",children:"Department"}),t.jsx("input",{type:"text",id:"department",name:"department",value:r.department,readOnly:!0})]}),t.jsxs("div",{className:"field field-full",children:[t.jsx("label",{htmlFor:"designation",children:"Designation"}),t.jsx("input",{type:"text",id:"designation",name:"designation",value:r.designation,onChange:k=>{g("designation",k.target.value)},required:!0})]})]}),t.jsxs("div",{className:"password-block",children:[t.jsx("h3",{children:"Change Password"}),t.jsx("p",{children:"Fill all three fields only when you want to update the password."}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{htmlFor:"currentPassword",children:"Current Password"}),t.jsx("input",{type:"password",id:"currentPassword",name:"current_password",autoComplete:"current-password",value:r.currentPassword,onChange:k=>{g("currentPassword",k.target.value)}})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{htmlFor:"newPassword",children:"New Password"}),t.jsx("input",{type:"password",id:"newPassword",name:"new_password",minLength:"8",autoComplete:"new-password",value:r.newPassword,onChange:k=>{g("newPassword",k.target.value)}})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{htmlFor:"confirmPassword",children:"Confirm New Password"}),t.jsx("input",{type:"password",id:"confirmPassword",name:"confirm_password",minLength:"8",autoComplete:"new-password",value:r.confirmPassword,onChange:k=>{g("confirmPassword",k.target.value)}})]})]})]}),t.jsxs("div",{className:"form-actions",children:[t.jsx("button",{type:"submit",className:"btn primary",children:"Save"}),t.jsx("button",{type:"button",className:"btn secondary",id:"cancelProfileBtn",onClick:N,children:"Cancel"})]})]})]})})]})]})]})}const Wg=[{key:"total-sales",className:"total-sales",icon:"📊",label:"Total Sales",value:"AED 1,250,000"},{key:"outstanding",className:"outstanding",icon:"⏳",label:"Outstanding",value:"AED 450,000"},{key:"total",className:"total",icon:"✓",label:"Total",value:"75"},{key:"targets",className:"targets",icon:"🎯",label:"Targets",value:"50+"}],Jo=[{no:"INV-1024",company:"Bright Tech",package:"Standard",amount:"AED 20,000",dueDate:"10-May",status:"Paid"},{no:"INV-1025",company:"Neha Patel",package:"Premium",amount:"AED 30,000",dueDate:"15-May",status:"Pending"},{no:"INV-1026",company:"Amit Verma",package:"Basic",amount:"AED 10,000",dueDate:"05-May",status:"Overdue"},{no:"INV-1027",company:"Simran Kohli",package:"Client",amount:"AED 50,000",dueDate:"05-May",status:"Pending"},{no:"INV-1028",company:"Desert Holdings",package:"Premium",amount:"AED 25,000",dueDate:"12-May",status:"Paid"},{no:"INV-1029",company:"Gulf Star LLC",package:"Standard",amount:"AED 15,000",dueDate:"08-May",status:"Paid"},{no:"INV-1030",company:"Tech Solutions",package:"Basic",amount:"AED 12,000",dueDate:"20-May",status:"Pending"},{no:"INV-1031",company:"Global Enterprises",package:"Client",amount:"AED 45,000",dueDate:"18-May",status:"Overdue"},{no:"INV-1032",company:"Metro Corp",package:"Premium",amount:"AED 35,000",dueDate:"16-May",status:"Pending"},{no:"INV-1033",company:"XYZ Solutions",package:"Standard",amount:"AED 22,000",dueDate:"14-May",status:"Paid"},{no:"INV-1034",company:"TechFlow Inc",package:"Basic",amount:"AED 11,000",dueDate:"09-May",status:"Pending"},{no:"INV-1035",company:"Digital Minds",package:"Client",amount:"AED 48,000",dueDate:"22-May",status:"Pending"},{no:"INV-1036",company:"Innovation Labs",package:"Premium",amount:"AED 32,000",dueDate:"11-May",status:"Paid"},{no:"INV-1037",company:"Smart Industries",package:"Standard",amount:"AED 18,000",dueDate:"19-May",status:"Overdue"},{no:"INV-1038",company:"Future Systems",package:"Basic",amount:"AED 13,000",dueDate:"07-May",status:"Paid"},{no:"INV-1039",company:"Quantum Tech",package:"Client",amount:"AED 52,000",dueDate:"25-May",status:"Pending"},{no:"INV-1040",company:"Nexus Corp",package:"Premium",amount:"AED 28,000",dueDate:"13-May",status:"Paid"},{no:"INV-1041",company:"Cloud Dynamics",package:"Standard",amount:"AED 21,000",dueDate:"17-May",status:"Pending"},{no:"INV-1042",company:"Vertex Solutions",package:"Basic",amount:"AED 14,000",dueDate:"06-May",status:"Overdue"},{no:"INV-1043",company:"Alpha Enterprises",package:"Client",amount:"AED 55,000",dueDate:"24-May",status:"Pending"},{no:"INV-1044",company:"Beta Industries",package:"Premium",amount:"AED 31,000",dueDate:"21-May",status:"Paid"}],qg=[{name:"Rahul Sharma",email:"rahul@sales.com",target:"20",sold:"9",achieved:"21",action:"View",employeeId:"N/A",phone:"N/A",department:"Sales",region:"N/A",username:"N/A",status:"Active"},{name:"Neha Patel",email:"neha@sales.com",target:"15",sold:"7",achieved:"15",action:"Remind",employeeId:"N/A",phone:"N/A",department:"Sales",region:"N/A",username:"N/A",status:"Active"},{name:"Amit Verma",email:"amit@sales.com",target:"10",sold:"5",achieved:"12",action:"View",employeeId:"N/A",phone:"N/A",department:"Sales",region:"N/A",username:"N/A",status:"Active"},{name:"Simran Kohli",email:"simran@sales.com",target:"5",sold:"3",achieved:"60",action:"View",employeeId:"N/A",phone:"N/A",department:"Sales",region:"N/A",username:"N/A",status:"Active"}],Hg=[{title:"Weekly Report",period:"This Week",revenue:"AED 85,000",deals:"12 Closed Deals",target:"68% of weekly target"},{title:"Monthly Report",period:"March 2026",revenue:"AED 365,000",deals:"49 Closed Deals",target:"74% of monthly target"},{title:"Overall Report",period:"Year to Date",revenue:"AED 1,250,000",deals:"156 Closed Deals",target:"81% annual target progress"}],Qg=["Active","Inactive"],Yg=`*{box-sizing:border-box}
body{font-family:"Segoe UI",sans-serif;background:#eef1f7;color:#2c3e50;margin:0}
.page{padding:25px}
.breadcrumb{display:flex;align-items:center;gap:10px;margin-bottom:15px;color:#666;font-size:14px}
.breadcrumb a{color:#4169e1;text-decoration:none;cursor:pointer}
.breadcrumb a:hover{text-decoration:underline}
.page-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:30px;padding:0}
.page-header h2{margin:0;font-size:28px;color:#2c3e50}
.btn-primary{background:#4169e1;color:white;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:14px;display:flex;align-items:center;gap:5px}
.btn-primary:hover{background:#3154c5}
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-bottom:35px}
.stat-card{background:white;border-radius:12px;padding:24px;box-shadow:0 2px 8px rgba(0,0,0,.1);display:flex;flex-direction:column;justify-content:flex-start;cursor:pointer;transition:.3s}
.stat-card:hover{transform:translateY(-6px);box-shadow:0 12px 24px rgba(0,0,0,.15)}
.stat-card.total-sales,
.stat-card.outstanding,
.stat-card.total,
.stat-card.targets{
  background:linear-gradient(135deg,#2f8f83 0%,#6b7280 100%) !important;
  color:#fff;
}
.stat-card.total-sales:hover, .stat-card.outstanding:hover, .stat-card.total:hover, .stat-card.targets:hover{transform:translateY(-6px);box-shadow:0 12px 24px rgba(0,0,0,.25)}
.stat-label{font-size:13px;opacity:.9;margin-bottom:12px;text-transform:uppercase;letter-spacing:.5px}
.stat-value{font-size:28px;font-weight:bold;line-height:1.2}
.stat-icon{font-size:24px;margin-bottom:12px}
@media(max-width:1200px){.stats-grid{grid-template-columns:repeat(2,1fr)}}
@media(max-width:768px){.stats-grid{grid-template-columns:1fr}}
.card{background:white;border-radius:12px;padding:25px;box-shadow:0 2px 8px rgba(0,0,0,.1);margin-bottom:25px}
.card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:25px;border-bottom:1px solid #eee;padding-bottom:20px;gap:15px}
.card-title{font-size:18px;font-weight:600;color:#2c3e50;white-space:nowrap}
.filter-group{display:flex;gap:15px;align-items:center;flex-wrap:wrap}
.filter-select{padding:10px 14px;border:1px solid #ddd;border-radius:6px;font-size:14px;background:white;cursor:pointer;white-space:nowrap}
.table{width:100%;border-collapse:collapse}
.table thead{background:#f8f9fa;border-bottom:2px solid #dee2e6}
.table th{padding:14px 12px;text-align:left;font-size:13px;font-weight:600;color:#495057;text-transform:uppercase}
.table td{padding:14px 12px;border-bottom:1px solid #dee2e6;font-size:14px}
.table tbody tr:hover{background:#f5f7fa}
.status-badge{display:inline-block;padding:6px 12px;border-radius:4px;font-size:12px;font-weight:500}
.status-paid{background:#d4edda;color:#155724}
.status-pending{background:#fff3cd;color:#856404}
.status-overdue{background:#f8d7da;color:#721c24}
.action-btn{padding:8px 14px;border:1px solid #4169e1;background:white;color:#4169e1;border-radius:4px;cursor:pointer;font-size:12px;font-weight:600;white-space:nowrap}
.action-btn:hover{background:#4169e1;color:white}
.salesperson-row{display:flex;align-items:center;gap:12px}
.salesperson-photo{width:40px;height:40px;border-radius:50%;background:#ccc;flex-shrink:0}
.salesperson-info{display:flex;flex-direction:column}
.salesperson-name{font-weight:600;font-size:14px}
.salesperson-email{font-size:12px;color:#999}
.progress-bar{width:120px;height:6px;background:#e9ecef;border-radius:3px;margin:0;position:relative;overflow:hidden}
.progress-fill{height:100%;background:#4169e1;border-radius:3px}
.layout-row{display:grid;grid-template-columns:1fr 1fr;gap:25px;align-items:start}
@media(max-width:1024px){.layout-row{grid-template-columns:1fr}}
.payroll-summary{display:grid;grid-template-columns:1fr;gap:15px;margin-bottom:20px}
.payroll-item{padding:16px;background:#f8f9fa;border-radius:8px;display:flex;justify-content:space-between;align-items:center}
.payroll-label{font-size:14px;color:#666;font-weight:500}
.payroll-value{font-size:22px;font-weight:bold;color:#2c3e50}
.btn-generate{background:#4169e1;color:white;border:none;padding:12px 24px;border-radius:6px;cursor:pointer;font-size:14px;font-weight:600;width:100%;margin-top:15px}
.btn-generate:hover{background:#3154c5}

:root{
  --accent:#2f8f83;
  --accent-2:#4169e1;
  --ink:#243447;
  --muted:#6b7f94;
  --panel:#ffffff;
  --line:#e5edf6;
}
body{
  background:
    radial-gradient(circle at 0% 0%, #ffffff 0%, #eef3fb 45%, #e8edf7 100%);
  color:var(--ink);
}
.page{
  max-width:1440px;
  margin:0 auto;
  padding:26px;
}
.breadcrumb{
  color:var(--muted);
  margin-bottom:18px;
}
.page-header{
  margin-bottom:26px;
}
.page-header h2{
  font-size:30px;
  letter-spacing:.2px;
}
.btn-primary{
  border-radius:999px;
  padding:10px 18px;
  box-shadow:0 8px 18px rgba(65,105,225,.22);
}
.stats-grid{
  margin-bottom:28px;
  gap:18px;
}
.stat-card{
  border-radius:16px;
  box-shadow:0 10px 24px rgba(23,40,71,.15);
  overflow:hidden;
  position:relative;
}
.stat-card:before{
  content:"";
  position:absolute;
  inset:0;
  background:linear-gradient(160deg,rgba(255,255,255,.20),rgba(255,255,255,0));
  pointer-events:none;
}
.card{
  border:1px solid var(--line);
  border-radius:16px;
  box-shadow:0 10px 24px rgba(23,40,71,.08);
  padding:22px;
}
.card-header{
  margin-bottom:18px;
  padding-bottom:14px;
  border-bottom:1px solid var(--line);
}
.card-title{
  font-size:19px;
  color:#1e3b5f;
}
.filter-group{
  gap:10px;
}
.filter-select{
  border:1px solid #d7e2ef;
  border-radius:10px;
  padding:10px 14px;
  min-width:150px;
  color:#244564;
  box-shadow:0 2px 6px rgba(23,40,71,.04) inset;
}
.filter-select:focus{
  outline:none;
  border-color:#97bde8;
  box-shadow:0 0 0 3px rgba(65,105,225,.12);
}
.table{
  border-collapse:separate;
  border-spacing:0;
  border:1px solid var(--line);
  border-radius:12px;
  overflow:hidden;
}
.table thead{
  background:#f5f9ff;
  border-bottom:1px solid var(--line);
}
.table th{
  color:#5f748c;
  font-size:12px;
  letter-spacing:.45px;
}
.table td{
  border-bottom:1px solid #edf3fa;
}
.table tbody tr:hover{
  background:#f7fbff;
}
.salesperson-entry{
  cursor:pointer;
}
.table tbody tr:last-child td{
  border-bottom:none;
}
.status-badge{
  border-radius:999px;
  padding:7px 12px;
  font-weight:700;
  font-size:11px;
  border:1px solid transparent;
}
.status-paid{background:#dcf7e6;color:#0f6c41;border-color:#bdeacc}
.status-pending{background:#fff4d8;color:#8b6100;border-color:#ffe1a4}
.status-overdue{background:#ffe4e4;color:#9f2a2a;border-color:#ffc4c4}
.action-btn{
  border-radius:999px;
  border-color:#aac4ff;
  padding:8px 14px;
}
.action-btn:hover{
  box-shadow:0 8px 16px rgba(65,105,225,.18);
}
#paginationControls{
  flex-wrap:wrap;
}
#entryInfo{
  color:#6f8298 !important;
}
.payroll-item{
  border:1px solid #e2eaf4;
  background:linear-gradient(180deg,#ffffff,#f8fbff);
}
.payroll-label{
  color:#60758d;
}
.payroll-value{
  color:#1f3e62;
}
.btn-generate{
  border-radius:12px;
  box-shadow:0 10px 20px rgba(65,105,225,.24);
}
.sales-report-list{
  display:grid;
  grid-template-columns:1fr;
  gap:12px;
}
.sales-report-item{
  border:1px solid #e2eaf4;
  border-radius:12px;
  padding:14px;
  background:linear-gradient(180deg,#ffffff,#f8fbff);
}
.sales-report-top{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
  margin-bottom:8px;
}
.sales-report-top h4{
  margin:0;
  font-size:15px;
  color:#1e3b5f;
}
.sales-report-top span{
  font-size:12px;
  color:#6f8298;
}
.sales-report-revenue{
  font-size:22px;
  font-weight:700;
  color:#1f3e62;
  margin-bottom:4px;
}
.sales-report-meta{
  font-size:13px;
  color:#5f748c;
  margin-bottom:4px;
}
.sales-report-progress{
  font-size:12px;
  color:#2f8f83;
  font-weight:600;
}
@media(max-width:768px){
  .page{padding:16px}
  .page-header h2{font-size:24px}
}

.modal-overlay{
  position:fixed;
  inset:0;
  background:rgba(20,33,51,.55);
  display:none;
  align-items:center;
  justify-content:center;
  z-index:1200;
  padding:18px;
}
.modal-overlay.open{
  display:flex;
}
.modal-card{
  width:min(560px,100%);
  background:#fff;
  border:1px solid var(--line);
  border-radius:16px;
  box-shadow:0 20px 48px rgba(10,25,41,.25);
  padding:20px;
}
.modal-header{
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-bottom:14px;
}
.modal-header h3{
  margin:0;
  color:#1e3b5f;
  font-size:20px;
}
.modal-close{
  border:none;
  background:transparent;
  color:#60758d;
  font-size:18px;
  cursor:pointer;
  line-height:1;
}
.salesperson-form{
  display:flex;
  flex-direction:column;
  gap:12px;
}
.form-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:12px;
}
.form-row{
  display:flex;
  flex-direction:column;
  gap:7px;
}
.form-row label{
  font-size:13px;
  color:#4d647d;
  font-weight:600;
}
.form-row input{
  border:1px solid #d7e2ef;
  border-radius:10px;
  padding:10px 12px;
  font-size:14px;
  color:#244564;
}
.form-row input:focus{
  outline:none;
  border-color:#97bde8;
  box-shadow:0 0 0 3px rgba(65,105,225,.12);
}
.modal-actions{
  display:flex;
  justify-content:flex-end;
  gap:10px;
  margin-top:6px;
}
.profile-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px 14px;
  margin-top:4px;
}
.profile-item{
  display:flex;
  flex-direction:column;
  gap:4px;
  padding:10px 12px;
  border:1px solid #e2eaf4;
  border-radius:10px;
  background:#f9fcff;
}
.profile-item span{
  font-size:12px;
  color:#6b7f94;
  text-transform:uppercase;
  letter-spacing:.4px;
}
.profile-item strong{
  font-size:14px;
  color:#1f3e62;
  word-break:break-word;
}
body.modal-open{
  overflow:hidden;
}
@media(max-width:640px){
  .form-grid{
    grid-template-columns:1fr;
  }
  .profile-grid{
    grid-template-columns:1fr;
  }
}

.stats-grid .stat-card.total-sales,
.stats-grid .stat-card.outstanding,
.stats-grid .stat-card.total,
.stats-grid .stat-card.targets{
  background:linear-gradient(135deg,#2f8f83 0%,#6b7280 100%) !important;
  color:#fff !important;
}
`,Qr=10,ed={fullName:"",employeeId:"",phone:"",email:"",department:"Sales",salesTarget:"",assignedRegion:"",status:"Active",username:"",password:""};function Kg(e){return`status-${String(e).toLowerCase()}`}function Gg(){return qg.map((e,n)=>({id:`salesperson-${n+1}`,...e}))}function Xg(){Ge({pageKey:"sales",pageCssText:Yg});const[e,n]=S.useState("All Statuses"),[r,a]=S.useState("All Companies"),[i,s]=S.useState(1),[l,o]=S.useState(Gg),[d,p]=S.useState(!1),[m,g]=S.useState(null),[u,y]=S.useState(ed),N=S.useRef(null);S.useEffect(()=>{var P;d&&((P=N.current)==null||P.focus())},[d]),S.useEffect(()=>{const P=d||m!==null;return document.body.classList.toggle("modal-open",P),()=>{document.body.classList.remove("modal-open")}},[d,m]),S.useEffect(()=>{function P(ee){ee.key==="Escape"&&(d&&x(),m&&T())}return document.addEventListener("keydown",P),()=>{document.removeEventListener("keydown",P)}},[d,m]);const k=["Paid","Pending","Overdue"],b=[...new Set(Jo.map(P=>P.company))].sort((P,ee)=>P.localeCompare(ee)),h=Jo.filter(P=>{const ee=e==="All Statuses"||P.status===e,fe=r==="All Companies"||P.company===r;return ee&&fe}),f=Math.max(1,Math.ceil(h.length/Qr)),v=Math.max(1,Math.min(i,f)),E=(v-1)*Qr,j=h.slice(E,E+Qr);function x(){p(!1),y(ed)}function T(){g(null)}function R(P,ee){P==="status"?n(ee):a(ee),s(1)}function w(P,ee){y(fe=>({...fe,[P]:ee}))}function C(){s(P=>Math.max(1,P-1))}function F(){s(P=>Math.min(f,P+1))}function M(P){s(P)}function $(P){P.preventDefault();const ee=u.fullName.trim(),fe=u.employeeId.trim(),On=u.phone.trim(),I=u.email.trim(),O=u.department.trim()||"Sales",_=Number(u.salesTarget||0),H=u.assignedRegion.trim(),A=u.username.trim(),ae=u.status.trim()||"Active",Le=0;if(!ee||!I)return;const _n=_>0?Math.round(Le/_*100):0;o(Me=>[...Me,{id:`salesperson-${Me.length+1}`,name:ee,email:I,target:String(_),sold:String(Le),achieved:String(_n),action:"View",employeeId:fe||"N/A",phone:On||"N/A",department:O,region:H||"N/A",username:A||"N/A",status:ae}]),x()}return t.jsxs(t.Fragment,{children:[t.jsx(tn,{adminName:"Admin"}),t.jsxs("div",{className:"page",children:[t.jsxs("div",{className:"breadcrumb",children:[t.jsx(Xa,{to:"/admin/dashboard",children:"Dashboard"}),t.jsx("span",{children:"›"}),t.jsx("span",{children:"Sales Department"})]}),t.jsxs("div",{className:"page-header",children:[t.jsx("h2",{children:"Sales Department"}),t.jsx("button",{className:"btn-primary",id:"openAddSalespersonBtn",type:"button",onClick:()=>{p(!0)},children:"+ Add User"})]}),t.jsx("div",{className:"stats-grid",children:Wg.map(P=>t.jsxs("div",{className:`stat-card ${P.className}`,children:[t.jsx("div",{className:"stat-icon",children:P.icon}),t.jsx("div",{className:"stat-label",children:P.label}),t.jsx("div",{className:"stat-value",children:P.value})]},P.key))}),t.jsxs("div",{className:"layout-row",children:[t.jsxs("div",{children:[t.jsxs("div",{className:"card",children:[t.jsxs("div",{className:"card-header",children:[t.jsx("div",{className:"card-title",children:"Company Packages"}),t.jsxs("div",{className:"filter-group",children:[t.jsxs("select",{className:"filter-select",id:"statusFilter",value:e,onChange:P=>{R("status",P.target.value)},children:[t.jsx("option",{value:"All Statuses",children:"All Statuses"}),k.map(P=>t.jsx("option",{value:P,children:P},P))]}),t.jsxs("select",{className:"filter-select",id:"companyFilter",value:r,onChange:P=>{R("company",P.target.value)},children:[t.jsx("option",{value:"All Companies",children:"All Companies"}),b.map(P=>t.jsx("option",{value:P,children:P},P))]})]})]}),t.jsxs("table",{className:"table",children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Invoice No"}),t.jsx("th",{children:"Company"}),t.jsx("th",{children:"Package"}),t.jsx("th",{children:"Amount (AED)"}),t.jsx("th",{children:"Due Date"}),t.jsx("th",{children:"Status"})]})}),t.jsx("tbody",{id:"invoiceTableBody",children:j.length===0?t.jsx("tr",{children:t.jsx("td",{colSpan:"6",style:{textAlign:"center",color:"#7f8c8d"},children:"No invoices found for selected filters."})}):j.map(P=>t.jsxs("tr",{children:[t.jsx("td",{children:P.no}),t.jsx("td",{children:P.company}),t.jsx("td",{children:P.package}),t.jsx("td",{children:P.amount}),t.jsx("td",{children:P.dueDate}),t.jsx("td",{children:t.jsx("span",{className:`status-badge ${Kg(P.status)}`,children:P.status})})]},P.no))})]}),t.jsx("div",{style:{marginTop:"20px",textAlign:"center",color:"#666",fontSize:"13px"},children:t.jsxs("span",{id:"entryInfo",children:["Showing ",h.length>0?E+1:0," to"," ",Math.min(E+Qr,h.length)," of"," ",h.length," entries"]})}),t.jsxs("div",{style:{marginTop:"15px",textAlign:"center",display:"flex",justifyContent:"center",gap:"5px"},id:"paginationControls","data-total-pages":f,children:[t.jsx("button",{className:"action-btn",id:"prevBtn",type:"button",onClick:C,children:"Previous"}),Array.from({length:f},(P,ee)=>ee+1).map(P=>t.jsx("button",{className:`action-btn page-btn${P===v?" active":""}`,style:P===v?{background:"#4169e1",color:"white"}:{},type:"button",onClick:()=>{M(P)},children:P},P)),t.jsx("button",{className:"action-btn",id:"nextBtn",type:"button",onClick:F,children:"Next"})]})]}),t.jsxs("div",{className:"card",children:[t.jsx("div",{className:"card-header",children:t.jsx("div",{className:"card-title",children:"Salesperson Details"})}),t.jsxs("table",{className:"table",children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Photo"}),t.jsx("th",{children:"Name"}),t.jsx("th",{children:"Email"}),t.jsx("th",{children:"Weekly Target"}),t.jsx("th",{children:"Packages Sold"}),t.jsx("th",{children:"Achieved"}),t.jsx("th",{})]})}),t.jsx("tbody",{id:"salespersonTableBody",children:l.map(P=>t.jsxs("tr",{className:"salesperson-entry",onClick:()=>{g(P)},children:[t.jsx("td",{children:t.jsx("div",{className:"salesperson-photo"})}),t.jsx("td",{children:t.jsx("span",{className:"salesperson-name",children:P.name})}),t.jsx("td",{children:t.jsx("span",{className:"salesperson-email",children:P.email})}),t.jsx("td",{children:P.target}),t.jsx("td",{children:P.sold}),t.jsxs("td",{children:[t.jsx("div",{className:"progress-bar",children:t.jsx("div",{className:"progress-fill",style:{width:`${Math.max(0,Math.min(Number(P.achieved),100))}%`}})})," ",P.achieved,Number(P.achieved)===0?"%":""]}),t.jsx("td",{children:t.jsx("button",{className:"action-btn",type:"button",children:P.action})})]},P.id))})]})]})]}),t.jsx("div",{children:t.jsxs("div",{className:"card",children:[t.jsx("div",{className:"card-header",children:t.jsx("div",{className:"card-title",children:"Sales Reports"})}),t.jsx("div",{className:"sales-report-list",children:Hg.map(P=>t.jsxs("div",{className:"sales-report-item",children:[t.jsxs("div",{className:"sales-report-top",children:[t.jsx("h4",{children:P.title}),t.jsx("span",{children:P.period})]}),t.jsx("div",{className:"sales-report-revenue",children:P.revenue}),t.jsx("div",{className:"sales-report-meta",children:P.deals}),t.jsx("div",{className:"sales-report-progress",children:P.target})]},P.title))})]})})]})]}),t.jsx("div",{className:`modal-overlay${d?" open":""}`,id:"addSalespersonModal","aria-hidden":!d,onClick:P=>{P.target===P.currentTarget&&x()},children:t.jsxs("div",{className:"modal-card",role:"dialog","aria-modal":"true","aria-labelledby":"addSalespersonTitle",children:[t.jsxs("div",{className:"modal-header",children:[t.jsx("h3",{id:"addSalespersonTitle",children:"Create Salesperson"}),t.jsx("button",{type:"button",className:"modal-close",id:"closeAddSalespersonModal","aria-label":"Close",onClick:x,children:"x"})]}),t.jsxs("form",{id:"addSalespersonForm",className:"salesperson-form",onSubmit:$,children:[t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"salespersonFullName",children:"Full Name"}),t.jsx("input",{ref:N,id:"salespersonFullName",name:"full_name",type:"text",required:!0,value:u.fullName,onChange:P=>{w("fullName",P.target.value)}})]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"salespersonEmployeeId",children:"Employee ID"}),t.jsx("input",{id:"salespersonEmployeeId",name:"employee_id",type:"text",required:!0,value:u.employeeId,onChange:P=>{w("employeeId",P.target.value)}})]}),t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"salespersonPhone",children:"Phone Number"}),t.jsx("input",{id:"salespersonPhone",name:"phone",type:"tel",required:!0,value:u.phone,onChange:P=>{w("phone",P.target.value)}})]})]}),t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"salespersonEmail",children:"Email"}),t.jsx("input",{id:"salespersonEmail",name:"email",type:"email",required:!0,value:u.email,onChange:P=>{w("email",P.target.value)}})]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"salespersonDepartment",children:"Department"}),t.jsx("input",{id:"salespersonDepartment",name:"department",type:"text",value:u.department,readOnly:!0})]}),t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"salespersonSalesTarget",children:"Sales Target"}),t.jsx("input",{id:"salespersonSalesTarget",name:"sales_target",type:"number",min:"0",required:!0,value:u.salesTarget,onChange:P=>{w("salesTarget",P.target.value)}})]})]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"salespersonRegion",children:"Assigned Region"}),t.jsx("input",{id:"salespersonRegion",name:"assigned_region",type:"text",required:!0,value:u.assignedRegion,onChange:P=>{w("assignedRegion",P.target.value)}})]}),t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"salespersonStatus",children:"Status"}),t.jsx("select",{id:"salespersonStatus",name:"status",className:"filter-select",required:!0,value:u.status,onChange:P=>{w("status",P.target.value)},children:Qg.map(P=>t.jsx("option",{value:P,children:P},P))})]})]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"salespersonUsername",children:"Username"}),t.jsx("input",{id:"salespersonUsername",name:"username",type:"text",required:!0,value:u.username,onChange:P=>{w("username",P.target.value)}})]}),t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"salespersonPassword",children:"Password"}),t.jsx("input",{id:"salespersonPassword",name:"password",type:"password",required:!0,value:u.password,onChange:P=>{w("password",P.target.value)}})]})]}),t.jsxs("div",{className:"modal-actions",children:[t.jsx("button",{type:"button",className:"action-btn",id:"cancelAddSalespersonBtn",onClick:x,children:"Cancel"}),t.jsx("button",{type:"submit",className:"btn-primary",children:"Create Salesperson"})]})]})]})}),t.jsx("div",{className:`modal-overlay${m?" open":""}`,id:"salespersonProfileModal","aria-hidden":!m,onClick:P=>{P.target===P.currentTarget&&T()},children:t.jsxs("div",{className:"modal-card",role:"dialog","aria-modal":"true","aria-labelledby":"salespersonProfileTitle",children:[t.jsxs("div",{className:"modal-header",children:[t.jsx("h3",{id:"salespersonProfileTitle",children:"Salesperson Profile"}),t.jsx("button",{type:"button",className:"modal-close",id:"closeSalespersonProfileModal","aria-label":"Close",onClick:T,children:"x"})]}),t.jsxs("div",{className:"profile-grid",children:[t.jsxs("div",{className:"profile-item",children:[t.jsx("span",{children:"Full Name"}),t.jsx("strong",{id:"profileFullName",children:(m==null?void 0:m.name)??"-"})]}),t.jsxs("div",{className:"profile-item",children:[t.jsx("span",{children:"Employee ID"}),t.jsx("strong",{id:"profileEmployeeId",children:(m==null?void 0:m.employeeId)??"-"})]}),t.jsxs("div",{className:"profile-item",children:[t.jsx("span",{children:"Phone Number"}),t.jsx("strong",{id:"profilePhone",children:(m==null?void 0:m.phone)??"-"})]}),t.jsxs("div",{className:"profile-item",children:[t.jsx("span",{children:"Email"}),t.jsx("strong",{id:"profileEmail",children:(m==null?void 0:m.email)??"-"})]}),t.jsxs("div",{className:"profile-item",children:[t.jsx("span",{children:"Department"}),t.jsx("strong",{id:"profileDepartment",children:(m==null?void 0:m.department)??"Sales"})]}),t.jsxs("div",{className:"profile-item",children:[t.jsx("span",{children:"Sales Target"}),t.jsx("strong",{id:"profileSalesTarget",children:(m==null?void 0:m.target)??"-"})]}),t.jsxs("div",{className:"profile-item",children:[t.jsx("span",{children:"Packages Sold"}),t.jsx("strong",{id:"profileSold",children:(m==null?void 0:m.sold)??"-"})]}),t.jsxs("div",{className:"profile-item",children:[t.jsx("span",{children:"Achieved"}),t.jsx("strong",{id:"profileAchieved",children:m?`${m.achieved}%`:"-"})]}),t.jsxs("div",{className:"profile-item",children:[t.jsx("span",{children:"Assigned Region"}),t.jsx("strong",{id:"profileRegion",children:(m==null?void 0:m.region)??"-"})]}),t.jsxs("div",{className:"profile-item",children:[t.jsx("span",{children:"Username"}),t.jsx("strong",{id:"profileUsername",children:(m==null?void 0:m.username)??"-"})]}),t.jsxs("div",{className:"profile-item",children:[t.jsx("span",{children:"Status"}),t.jsx("strong",{id:"profileStatus",children:(m==null?void 0:m.status)??"-"})]})]}),t.jsx("div",{className:"modal-actions",children:t.jsx("button",{type:"button",className:"action-btn",id:"closeProfileBtn",onClick:T,children:"Close"})})]})})]})}const Zg=[{id:"service-1",count:3,title:"Business Setup",meta:"3 Packages Created"},{id:"service-2",count:2,title:"Accounting & Bookkeeping",meta:"2 Packages Created"},{id:"service-3",count:1,title:"VAT Registration",meta:"1 Package Created"},{id:"service-4",count:1,title:"PRO Services",meta:"1 Package Created"}],Jg=[{id:"package-1",name:"Basic Package",service:"Business Setup",price:"AED 10,000",status:"Enabled",isPopular:!1},{id:"package-2",name:"Standard Package",service:"Business Setup",price:"AED 20,000",status:"Enabled",isPopular:!0},{id:"package-3",name:"Premium Package",service:"Business Setup",price:"AED 30,000",status:"Enabled",isPopular:!1},{id:"package-4",name:"Accounting Starter",service:"Accounting & Bookkeeping",price:"AED 5,000",status:"Enabled",isPopular:!1}],nd={name:"Appliance Repair",description:"Repairing household appliances, including washing machines, refrigerators, and microwaves",category:"Repair",members:"",availableDays:"Every business day",availableTime:"Same as business hours",currency:"AED - UAE Dirham",requiredDocument:"",duration:"2",priority:"Medium",location:"On-site",visibleTo:"All Clients"},ex=["Repair","Maintenance","Consulting","Support"],nx=["Every business day","All week days","Weekends only","Custom schedule"],tx=["Same as business hours","24 x 7","Morning shift","Evening shift"],rx=["INR - Indian Rupee","AED - UAE Dirham","USD - US Dollar"],ax=["1","2","4","8"],ix=["Low","Medium","High"],sx=["On-site","Remote","Hybrid"],lx=["All Clients","Premium Clients","Internal Team Only"],td=["All","Active","Popular","Recently Added"],la=["Business Setup","Accounting & Bookkeeping","VAT Registration","PRO Services"],oa=["Enabled","Disabled","Draft"],ox=`:root{
  --primary:#2f8f83;
  --secondary:#2fb7b0;
  --dark:#1f2f3a;
  --bg:#eef1f7;
  --card:#ffffff;
  --text:#2c3e50;
  --muted:#7f8c8d;
  --line:#e2ebf5;
  --shadow:rgba(0,0,0,0.08);
}

*{margin:0;padding:0;box-sizing:border-box;font-family:"Segoe UI",sans-serif;}
body{
  background:radial-gradient(circle at 0% 0%, #ffffff 0%, #edf3fb 50%, #e6edf8 100%);
  color:var(--text);
}

/* NAVBAR */
.navbar{
  height:70px;
  background:linear-gradient(90deg,var(--dark),var(--primary));
  display:flex;
  justify-content:space-between;
  align-items:center;
  padding:0 25px;
  color:#fff;
}
  .nav-left{display:flex;align-items:center;gap:30px;}
  .logo img{height:32px}
  .nav-logo{ height:34px; display:block; }

.nav-links{display:flex;gap:18px;}
.nav-links a{
  color:#ecf0f1;
  text-decoration:none;
  font-size:14px;
  padding:8px 12px;
  border-radius:6px;
  transition:.3s;
}
.nav-links a:hover{background:rgba(255,255,255,.18);}
.nav-links a.active{background:rgba(255,255,255,.28);}

.nav-right{display:flex;align-items:center;gap:15px;}
.search{
  width:260px;
  padding:7px 14px;
  border-radius:20px;
  border:none;
}
.profile{font-weight:600}

/* PAGE */
.page{padding:24px;max-width:1450px;margin:0 auto;}
.breadcrumb{
  font-size:14px;
  color:var(--muted);
  margin-bottom:12px;
}
.page-header{
  display:flex;
  justify-content:space-between;
  align-items:center;
  margin-bottom:16px;
}
.page-header h2{font-size:30px;color:#1c4268;}
.page-header h3{font-size:24px;color:#1d4268;}

.btn{
  padding:9px 14px;
  border:1px solid transparent;
  border-radius:999px;
  cursor:pointer;
  font-size:13px;
  font-weight:700;
  transition:.25s;
}
.btn.primary{
  background:linear-gradient(135deg,var(--primary),var(--secondary));
  border-color:#7fd8d2;
  color:#fff;
  box-shadow:0 10px 18px rgba(31,143,139,.24);
}
.btn.primary:hover{
  filter:brightness(1.05);
  box-shadow:0 12px 20px rgba(31,143,139,.3);
}
.btn.gray{
  background:#e0e0e0;
}
.btn.gray:hover{
  background:#d5d5d5;
}

/* SERVICES */
.services-page .services{
  display:grid;
  grid-template-columns:repeat(4,minmax(0,1fr));
  gap:14px;
  margin-bottom:20px;
}
.services-page .services .service{
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  gap:10px;
  min-height:152px;
  padding:18px;
  border-radius:16px !important;
  border:1px solid #d5e1ef !important;
  border-top:4px solid #2b83d7 !important;
  background:linear-gradient(160deg,#ffffff 0%,#f4f9ff 100%) !important;
  box-shadow:0 10px 22px rgba(14,37,66,.10) !important;
  transition:transform .2s ease, box-shadow .2s ease !important;
}
.services-page .services .service:hover{
  transform:translateY(-3px);
  box-shadow:0 14px 28px rgba(14,37,66,.16) !important;
}
.services-page .services .service .num{
  color:#224c74 !important;
  font-size:30px;
  line-height:1;
  font-weight:800;
  letter-spacing:.2px;
  margin:0;
}
.services-page .services .service .tile-title{
  font-size:13px;
  font-weight:800 !important;
  color:#5f738a !important;
  margin:0;
}
.services-page .services .service .tile-amount{
  font-size:19px;
  color:#1f456c !important;
  margin:0;
  font-weight:800;
}
.services-page .services .service .tile-meta{
  font-size:12px;
  margin:0;
  color:#6f8195 !important;
  font-weight:600;
}
.services-page .services .service:nth-child(2){
  border-top-color:#2fbe9a;
  background:linear-gradient(160deg,#ffffff 0%,#f3fff9 100%) !important;
}
.services-page .services .service:nth-child(3){
  border-top-color:#f39c12;
  background:linear-gradient(160deg,#ffffff 0%,#fffaf2 100%) !important;
}
.services-page .services .service:nth-child(4){
  border-top-color:#6f42c1;
  background:linear-gradient(160deg,#ffffff 0%,#f8f3ff 100%) !important;
}

/* PACKAGES */
.card{
  background:linear-gradient(180deg,#ffffff,#fbfdff);
  border:1px solid var(--line);
  border-radius:16px;
  box-shadow:0 10px 22px rgba(18,38,63,.08);
  padding:16px;
}
.filters{
  display:flex;
  gap:10px;
  margin-bottom:12px;
  flex-wrap:wrap;
}
.filters input,
.filters select{
  padding:9px 11px;
  border-radius:10px;
  border:1px solid #d2e0ef;
  font-size:13px;
  color:#274764;
}
.filters input:focus,
.filters select:focus{
  outline:none;
  border-color:#96bde9;
  box-shadow:0 0 0 3px rgba(65,105,225,.12);
}
table{
  width:100%;
  border-collapse:separate;
  border-spacing:0;
  border:1px solid var(--line);
  border-radius:12px;
  overflow:hidden;
}
th,td{
  padding:12px;
  font-size:14px;
  border-bottom:1px solid #edf2f8;
}
th{
  background:#f6faff;
  text-align:left;
  color:#60758d;
  font-size:12px;
  text-transform:uppercase;
  letter-spacing:.45px;
}
tr:hover{
  background:#f8fbff;
}
tbody tr:last-child td{border-bottom:none;}

.tag{
  padding:6px 10px;
  border-radius:999px;
  font-size:12px;
  font-weight:700;
  color:#fff;
}
.popular{background:#f39c12;}

.status{
  padding:6px 12px;
  border-radius:999px;
  font-size:12px;
  font-weight:700;
  border:1px solid transparent;
}
.status-enabled{color:#0f6c41;background:#dcf7e6;border-color:#bdeacc}
.status-disabled{color:#9f2a2a;background:#ffe4e4;border-color:#ffc4c4}
.status-draft{color:#8b6100;background:#fff4d8;border-color:#ffe1a4}

.action{
  padding:7px 12px;
  border-radius:999px;
  border:1px solid transparent;
  cursor:pointer;
  font-size:12px;
  font-weight:700;
}
.edit{background:linear-gradient(135deg,var(--primary),var(--secondary));border-color:#7fd8d2;color:#fff;}
.disable{background:linear-gradient(135deg,#9aa8b5,#7f8f9f);border-color:#c6cfd7;color:#fff;}
.disable:hover{background:linear-gradient(135deg,#f06e6e,#db4e4e);border-color:#f6b6b6;color:#fff;}
.action:hover{filter:brightness(1.05);}

.modal-overlay{
  position:fixed;
  inset:0;
  background:rgba(18,30,46,.56);
  display:none;
  align-items:center;
  justify-content:center;
  padding:16px;
  z-index:1300;
}
.modal-overlay.open{
  display:flex;
}
.modal-card{
  width:min(640px,100%);
  max-height:90vh;
  overflow:auto;
  background:#fff;
  border:1px solid var(--line);
  border-radius:16px;
  box-shadow:0 24px 52px rgba(10,22,37,.24);
  padding:18px;
}
.modal-header{
  display:flex;
  align-items:center;
  justify-content:space-between;
  margin-bottom:12px;
}
.modal-header h3{
  margin:0;
  color:#1c4268;
  font-size:22px;
}
.modal-close{
  border:none;
  background:transparent;
  font-size:18px;
  color:#60758d;
  cursor:pointer;
  line-height:1;
}
.package-form{
  display:flex;
  flex-direction:column;
  gap:10px;
}
.form-grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:10px 12px;
}
.form-row{
  display:flex;
  flex-direction:column;
  gap:6px;
}
.form-row label{
  font-size:13px;
  color:#5f748c;
  font-weight:600;
}
.form-row input,.form-row select{
  padding:10px 12px;
  border:1px solid #d2e0ef;
  border-radius:10px;
  font-size:14px;
  color:#274764;
  background:#fff;
}
.form-row input:focus,.form-row select:focus{
  outline:none;
  border-color:#96bde9;
  box-shadow:0 0 0 3px rgba(65,105,225,.12);
}
.modal-actions{
  display:flex;
  justify-content:flex-end;
  gap:10px;
  margin-top:6px;
}

/* Add service modal */
.add-service-modal{
  width:min(1120px,100%);
  max-height:92vh;
  overflow:auto;
  padding:0;
}
.add-service-header{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:14px 18px;
  border-bottom:1px solid #e4ebf4;
  background:#fff;
}
.add-service-header h3{
  margin:0;
  font-size:31px;
  color:#2e3f55;
  display:flex;
  align-items:center;
  gap:10px;
}
.add-service-header h3 i{
  color:#5f748c;
  font-size:19px;
}
.add-service-form{
  display:flex;
  flex-direction:column;
}
.add-service-grid{
  display:grid;
  grid-template-columns:1.4fr 1fr;
  gap:14px;
  padding:14px;
  background:#f7f9fc;
}
.add-service-col{
  display:flex;
  flex-direction:column;
  gap:12px;
}
.service-form-section{
  background:#fff;
  border:1px solid #e2eaf4;
  border-radius:10px;
  padding:12px;
}
.service-form-section h4{
  margin:0 0 10px;
  color:#3a4d63;
  font-size:22px;
  display:flex;
  align-items:center;
  gap:8px;
}
.service-form-section h4 i{
  color:#6b7f94;
  font-size:16px;
}
.service-field{
  display:grid;
  grid-template-columns:130px 1fr;
  align-items:center;
  gap:10px;
  margin-bottom:10px;
}
.service-field.stacked{
  grid-template-columns:1fr;
  gap:6px;
}
.service-field:last-child{
  margin-bottom:0;
}
.service-field label{
  color:#4e6177;
  font-size:14px;
  font-weight:600;
}
.service-field input,
.service-field select,
.service-field textarea{
  width:100%;
  padding:10px 12px;
  border:1px solid #d7e2ef;
  border-radius:7px;
  font-size:14px;
  color:#33485f;
  background:#fff;
}
.service-field textarea{
  resize:vertical;
  min-height:72px;
}
.service-field input:focus,
.service-field select:focus,
.service-field textarea:focus{
  outline:none;
  border-color:#96bde9;
  box-shadow:0 0 0 3px rgba(65,105,225,.12);
}
.btn-link{
  border:none;
  background:transparent;
  color:#2f6fda;
  font-weight:700;
  padding:0;
  margin:2px 0 8px;
  cursor:pointer;
}
.btn-link:hover{
  text-decoration:underline;
}
.doc-list{
  list-style:none;
  margin:0;
  padding:0;
  display:flex;
  flex-direction:column;
  gap:8px;
}
.doc-list li{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
  border:1px solid #dfe8f3;
  border-radius:8px;
  background:#f8fbff;
  padding:8px 10px;
  color:#3e566f;
}
.doc-list button{
  border:none;
  background:transparent;
  color:#9aa8b6;
  cursor:pointer;
  font-size:12px;
  font-weight:700;
}
.doc-list button:hover{
  color:#db4e4e;
}
.section-note{
  margin:6px 0 0;
  color:#7b8ea3;
  font-size:12px;
}
.add-service-actions{
  display:flex;
  justify-content:flex-end;
  gap:10px;
  padding:14px 18px;
  border-top:1px solid #e4ebf4;
  background:#fff;
}

@media(max-width:1200px){
  .services-page .services{grid-template-columns:repeat(2,1fr);}
}

@media(max-width:900px){
  .page{padding:16px;}
  .page-header{flex-direction:column;align-items:flex-start;gap:10px;}
  .page-header h2{font-size:24px;}
  .page-header h3{font-size:20px;}
  .form-grid{grid-template-columns:1fr;}
  .add-service-grid{grid-template-columns:1fr;}
  .service-field{grid-template-columns:1fr;}
}

@media(max-width:760px){
  .services-page .services{grid-template-columns:1fr;}
}
`,zu={name:"",service:la[0],price:"",status:oa[0]};function dx(e){const n=String(e||"").toLowerCase();return n==="enabled"?"status-enabled":n==="disabled"?"status-disabled":"status-draft"}function cx(e){return e?{name:e.name,service:e.service,price:e.price,status:e.status}:zu}function ux(){Ge({pageKey:"services-packages",pageCssText:ox});const[e,n]=S.useState(Zg),[r,a]=S.useState(Jg),[i,s]=S.useState(!1),[l,o]=S.useState(null),[d,p]=S.useState(zu),[m,g]=S.useState(nd),[u,y]=S.useState([]),N=r.find(w=>w.id===l)??null;S.useEffect(()=>{function w(C){C.key==="Escape"&&(o(null),s(!1))}return document.addEventListener("keydown",w),()=>{document.removeEventListener("keydown",w)}},[]);function k(){o(null)}function b(){s(!1)}function h(w,C){p(F=>({...F,[w]:C}))}function f(w,C){g(F=>({...F,[w]:C}))}function v(w){o(w.id),p(cx(w))}function E(w){window.confirm(`Do you want to disable ${w.name}?`)&&a(F=>F.map(M=>M.id!==w.id?M:{...M,status:"Disabled"}))}function j(){const w=m.requiredDocument.trim();w&&(y(C=>[...C,w]),f("requiredDocument",""))}function x(w){y(C=>C.filter((F,M)=>M!==w))}function T(w){if(w.preventDefault(),!N){k();return}a(C=>C.map(F=>F.id!==N.id?F:{...F,name:d.name.trim(),service:d.service.trim(),price:d.price.trim(),status:d.status.trim()})),k()}function R(w){w.preventDefault();const C=m.name.trim()||"New Service",F=u.length>0?u.length:1,M=`${F} ${F===1?"Package Created":"Packages Created"}`;n($=>[...$,{id:`service-${$.length+1}`,count:F,title:C,meta:M}]),g(nd),y([]),b()}return t.jsxs(t.Fragment,{children:[t.jsx(tn,{adminName:"Admin"}),t.jsxs("div",{className:"page services-page",children:[t.jsx("div",{className:"breadcrumb",children:"Dashboard › Services & Packages"}),t.jsxs("div",{className:"page-header",children:[t.jsx("h2",{children:"Services & Packages"}),t.jsx("button",{className:"btn primary",id:"openAddServiceModalBtn",type:"button",onClick:()=>{s(!0)},children:"+ Add New Service"})]}),t.jsx("h3",{style:{marginBottom:"10px"},children:"Services"}),t.jsx("div",{className:"services tiles",children:e.map(w=>t.jsxs("div",{className:"service tile",children:[t.jsx("div",{className:"num",children:w.count}),t.jsx("div",{className:"tile-title",children:w.title}),t.jsx("div",{className:"tile-meta",children:w.meta})]},w.id))}),t.jsxs("div",{className:"page-header",children:[t.jsx("h3",{children:"Packages"}),t.jsx("button",{className:"btn primary",type:"button",children:"+ Add New Package"})]}),t.jsxs("div",{className:"card",children:[t.jsxs("div",{className:"filters",children:[t.jsx("input",{placeholder:"Search"}),t.jsx("select",{defaultValue:td[0],children:td.map(w=>t.jsx("option",{children:w},w))}),t.jsx("select",{defaultValue:la[0],children:la.map(w=>t.jsx("option",{children:w},w))}),t.jsx("select",{defaultValue:oa[0],children:oa.map(w=>t.jsx("option",{children:w},w))})]}),t.jsxs("table",{id:"packagesTable",children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Package"}),t.jsx("th",{children:"Service"}),t.jsx("th",{children:"Price"}),t.jsx("th",{children:"Status"}),t.jsx("th",{children:"Actions"})]})}),t.jsx("tbody",{children:r.map(w=>t.jsxs("tr",{className:"package-row",children:[t.jsxs("td",{children:[w.name,w.isPopular?t.jsxs(t.Fragment,{children:[" ",t.jsx("span",{className:"tag popular",children:"Most Popular"})]}):null]}),t.jsx("td",{children:w.service}),t.jsx("td",{children:w.price}),t.jsx("td",{children:t.jsx("span",{className:`status ${dx(w.status)}`,children:w.status})}),t.jsxs("td",{children:[t.jsx("button",{type:"button",className:"action edit edit-package-btn",onClick:()=>{v(w)},children:"Edit"})," ",t.jsx("button",{type:"button",className:"action disable disable-package-btn",onClick:()=>{E(w)},children:"Disable"})]})]},w.id))})]})]})]}),t.jsx("div",{className:`modal-overlay${i?" open":""}`,id:"addServiceModal","aria-hidden":!i,onClick:w=>{w.target===w.currentTarget&&b()},children:t.jsxs("div",{className:"modal-card add-service-modal",role:"dialog","aria-modal":"true","aria-labelledby":"addServiceTitle",children:[t.jsxs("div",{className:"add-service-header",children:[t.jsxs("h3",{id:"addServiceTitle",children:[t.jsx("i",{className:"fa-solid fa-circle-plus"})," Add Service"]}),t.jsx("button",{type:"button",className:"modal-close",id:"closeAddServiceModalBtn","aria-label":"Close",onClick:b,children:"x"})]}),t.jsxs("form",{id:"addServiceForm",className:"add-service-form",onSubmit:R,children:[t.jsxs("div",{className:"add-service-grid",children:[t.jsxs("div",{className:"add-service-col",children:[t.jsxs("section",{className:"service-form-section",children:[t.jsxs("h4",{children:[t.jsx("i",{className:"fa-solid fa-circle-info"})," Basic Details"]}),t.jsxs("div",{className:"service-field",children:[t.jsx("label",{htmlFor:"addServiceName",children:"Service Name"}),t.jsx("input",{id:"addServiceName",type:"text",required:!0,value:m.name,onChange:w=>{f("name",w.target.value)}})]}),t.jsxs("div",{className:"service-field",children:[t.jsx("label",{htmlFor:"addServiceDescription",children:"Description"}),t.jsx("textarea",{id:"addServiceDescription",rows:"3",value:m.description,onChange:w=>{f("description",w.target.value)}})]}),t.jsxs("div",{className:"service-field",children:[t.jsx("label",{htmlFor:"addServiceCategory",children:"Category"}),t.jsx("select",{id:"addServiceCategory",value:m.category,onChange:w=>{f("category",w.target.value)},children:ex.map(w=>t.jsx("option",{children:w},w))})]})]}),t.jsxs("section",{className:"service-form-section",children:[t.jsxs("h4",{children:[t.jsx("i",{className:"fa-solid fa-users"})," Assigned Team"]}),t.jsxs("div",{className:"service-field",children:[t.jsx("label",{htmlFor:"addServiceMembers",children:"Assign Members"}),t.jsx("input",{id:"addServiceMembers",type:"text",placeholder:"Rahul, Priya, Amit",value:m.members,onChange:w=>{f("members",w.target.value)}})]}),t.jsx("p",{className:"section-note",children:"Assign members responsible for this service."})]}),t.jsxs("section",{className:"service-form-section",children:[t.jsxs("h4",{children:[t.jsx("i",{className:"fa-solid fa-calendar-days"})," Availability Settings"]}),t.jsxs("div",{className:"service-field",children:[t.jsx("label",{htmlFor:"addServiceDays",children:"Available Days"}),t.jsx("select",{id:"addServiceDays",value:m.availableDays,onChange:w=>{f("availableDays",w.target.value)},children:nx.map(w=>t.jsx("option",{children:w},w))})]}),t.jsxs("div",{className:"service-field",children:[t.jsx("label",{htmlFor:"addServiceTime",children:"Available Time"}),t.jsx("select",{id:"addServiceTime",value:m.availableTime,onChange:w=>{f("availableTime",w.target.value)},children:tx.map(w=>t.jsx("option",{children:w},w))})]}),t.jsxs("div",{className:"service-field",children:[t.jsx("label",{htmlFor:"addServiceCurrency",children:"Currency"}),t.jsx("select",{id:"addServiceCurrency",value:m.currency,onChange:w=>{f("currency",w.target.value)},children:rx.map(w=>t.jsx("option",{children:w},w))})]}),t.jsx("p",{className:"section-note",children:"Define pricing and billing for the service."})]})]}),t.jsxs("div",{className:"add-service-col",children:[t.jsxs("section",{className:"service-form-section",children:[t.jsxs("h4",{children:[t.jsx("i",{className:"fa-regular fa-clipboard"})," Requirements"]}),t.jsxs("div",{className:"service-field stacked",children:[t.jsx("label",{htmlFor:"addServiceRequiredDoc",children:"Required Documents"}),t.jsx("input",{id:"addServiceRequiredDoc",type:"text",placeholder:"Proof of Purchase, Image Upload",value:m.requiredDocument,onChange:w=>{f("requiredDocument",w.target.value)}})]}),t.jsx("button",{type:"button",className:"btn-link",id:"addServiceAddDocumentBtn",onClick:j,children:"+ Add Document"}),t.jsx("ul",{id:"addServiceDocsList",className:"doc-list",children:u.map((w,C)=>t.jsxs("li",{children:[t.jsx("span",{children:w}),t.jsx("button",{type:"button",onClick:()=>{x(C)},children:"Remove"})]},`${w}-${C}`))}),t.jsx("p",{className:"section-note",children:"Specify any documents needed for this service."})]}),t.jsxs("section",{className:"service-form-section",children:[t.jsxs("h4",{children:[t.jsx("i",{className:"fa-regular fa-clock"})," Duration & Location"]}),t.jsxs("div",{className:"service-field",children:[t.jsx("label",{htmlFor:"addServiceDuration",children:"Estimated Duration (Hrs)"}),t.jsx("select",{id:"addServiceDuration",value:m.duration,onChange:w=>{f("duration",w.target.value)},children:ax.map(w=>t.jsx("option",{children:w},w))})]}),t.jsxs("div",{className:"service-field",children:[t.jsx("label",{htmlFor:"addServicePriority",children:"Priority"}),t.jsx("select",{id:"addServicePriority",value:m.priority,onChange:w=>{f("priority",w.target.value)},children:ix.map(w=>t.jsx("option",{children:w},w))})]}),t.jsxs("div",{className:"service-field",children:[t.jsx("label",{htmlFor:"addServiceLocation",children:"Location"}),t.jsx("select",{id:"addServiceLocation",value:m.location,onChange:w=>{f("location",w.target.value)},children:sx.map(w=>t.jsx("option",{children:w},w))})]}),t.jsx("p",{className:"section-note",children:"Specify the duration and location for the service."})]}),t.jsxs("section",{className:"service-form-section",children:[t.jsxs("h4",{children:[t.jsx("i",{className:"fa-regular fa-eye"})," Visibility Settings"]}),t.jsxs("div",{className:"service-field",children:[t.jsx("label",{htmlFor:"addServiceVisibleTo",children:"Visible To"}),t.jsx("select",{id:"addServiceVisibleTo",value:m.visibleTo,onChange:w=>{f("visibleTo",w.target.value)},children:lx.map(w=>t.jsx("option",{children:w},w))})]}),t.jsx("p",{className:"section-note",children:"Control who can view and request this service."})]})]})]}),t.jsxs("div",{className:"add-service-actions",children:[t.jsx("button",{type:"button",className:"btn gray",id:"cancelAddServiceBtn",onClick:b,children:"Cancel"}),t.jsx("button",{type:"submit",className:"btn primary",children:"Add Service"})]})]})]})}),t.jsx("div",{className:`modal-overlay${N?" open":""}`,id:"editPackageModal","aria-hidden":!N,onClick:w=>{w.target===w.currentTarget&&k()},children:t.jsxs("div",{className:"modal-card",role:"dialog","aria-modal":"true","aria-labelledby":"editPackageTitle",children:[t.jsxs("div",{className:"modal-header",children:[t.jsx("h3",{id:"editPackageTitle",children:"Edit Package Details"}),t.jsx("button",{type:"button",className:"modal-close",id:"closeEditPackageModalBtn","aria-label":"Close",onClick:k,children:"x"})]}),t.jsxs("form",{id:"editPackageForm",className:"package-form",onSubmit:T,children:[t.jsx("input",{type:"hidden",id:"editPackageRowIndex",value:N?r.findIndex(w=>w.id===N.id):"",readOnly:!0}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"editPackageName",children:"Package Name"}),t.jsx("input",{id:"editPackageName",type:"text",required:!0,value:d.name,onChange:w=>{h("name",w.target.value)}})]}),t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"editPackageService",children:"Service"}),t.jsx("select",{id:"editPackageService",required:!0,value:d.service,onChange:w=>{h("service",w.target.value)},children:la.map(w=>t.jsx("option",{children:w},w))})]})]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"editPackagePrice",children:"Price"}),t.jsx("input",{id:"editPackagePrice",type:"text",required:!0,value:d.price,onChange:w=>{h("price",w.target.value)}})]}),t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"editPackageStatus",children:"Status"}),t.jsx("select",{id:"editPackageStatus",required:!0,value:d.status,onChange:w=>{h("status",w.target.value)},children:oa.map(w=>t.jsx("option",{children:w},w))})]})]}),t.jsxs("div",{className:"modal-actions",children:[t.jsx("button",{type:"button",className:"btn gray",id:"cancelEditPackageBtn",onClick:k,children:"Cancel"}),t.jsx("button",{type:"submit",className:"btn primary",children:"Save Changes"})]})]})]})})]})}const px=[{key:"company",buttonId:"btnCompany",iconClass:"fa fa-building",label:"Company Settings"},{key:"users",buttonId:"btnUsers",iconClass:"fa fa-users",label:"User Management"},{key:"roles",buttonId:"btnRoles",iconClass:"fa fa-lock",label:"Roles & Permissions"},{key:"security",buttonId:"btnSecurity",iconClass:"fa fa-shield-alt",label:"Security Settings"},{key:"financial",buttonId:"btnFinancial",iconClass:"fa fa-coins",label:"Financial Settings"},{key:"email",buttonId:"btnEmail",iconClass:"fa fa-envelope",label:"Email & Notifications"},{key:"workflow",buttonId:"btnWorkflow",iconClass:"fa fa-sitemap",label:"Workflow & Approvals"},{key:"system",buttonId:"btnSystem",iconClass:"fa fa-database",label:"Backup & System"}],mx={companyName:"",tradeLicense:"",vatNumber:"",contactEmail:"",contactPhone:"",address:"",poBox:"",companyCurrency:"AED",companyTimeZone:"Asia/Dubai"},fx=[{id:1,name:"System Admin",email:"admin@company.com",role:"Admin",status:"Active",lastLogin:"2026-02-14 10:30am"},{id:2,name:"Rahul Sharma",email:"rahul@company.com",role:"Sales",status:"Active",lastLogin:"2026-02-13 02:15pm"},{id:3,name:"Priya Agarwal",email:"priya@company.com",role:"Accounts",status:"Active",lastLogin:"2026-02-12 09:45am"},{id:4,name:"Rohit Verma",email:"rohit@company.com",role:"Manager",status:"Active",lastLogin:"2026-02-11 11:20am"},{id:5,name:"Anand Kapoor",email:"anand@company.com",role:"Client",status:"Inactive",lastLogin:"2026-01-30 03:10pm"}],hx=[{value:"",label:"Select Role"},{value:"Admin",label:"Admin"},{value:"Manager",label:"Manager"},{value:"Sales",label:"Sales Department"},{value:"Accounts",label:"Accounts Department"},{value:"Client",label:"Client"}],gx=[{key:"clients",title:"Clients",iconClass:"fa fa-user-tie",badgeClass:"full-access",badgeLabel:"Full Access",permissions:[{key:"view",id:"permClientView",label:"View"},{key:"create",id:"permClientCreate",label:"Create"},{key:"edit",id:"permClientEdit",label:"Edit"},{key:"delete",id:"permClientDelete",label:"Delete"},{key:"approve",id:"permClientApprove",label:"Approve"}]},{key:"sales",title:"Sales",iconClass:"fa fa-chart-line",badgeClass:"full-access",badgeLabel:"Full Access",permissions:[{key:"view",id:"permSalesView",label:"View"},{key:"create",id:"permSalesCreate",label:"Create"},{key:"edit",id:"permSalesEdit",label:"Edit"},{key:"delete",id:"permSalesDelete",label:"Delete"},{key:"approve",id:"permSalesApprove",label:"Approve"}]},{key:"accounts",title:"Accounts",iconClass:"fa fa-calculator",badgeClass:"full-access",badgeLabel:"Full Access",permissions:[{key:"view",id:"permAccountsView",label:"View"},{key:"create",id:"permAccountsCreate",label:"Create"},{key:"edit",id:"permAccountsEdit",label:"Edit"},{key:"delete",id:"permAccountsDelete",label:"Delete"},{key:"approve",id:"permAccountsApprove",label:"Approve"}]},{key:"reports",title:"Reports",iconClass:"fa fa-file-pdf",badgeClass:"full-access",badgeLabel:"Full Access",permissions:[{key:"view",id:"permReportsView",label:"View"},{key:"create",id:"permReportsCreate",label:"Create"},{key:"edit",id:"permReportsEdit",label:"Edit"},{key:"delete",id:"permReportDelete",label:"Delete"},{key:"approve",id:"permReportsApprove",label:"Approve"}]},{key:"operations",title:"Operations",iconClass:"fa fa-cog",badgeClass:"full-access",badgeLabel:"Full Access",permissions:[{key:"view",id:"permOpsView",label:"View"},{key:"create",id:"permOpsCreate",label:"Create"},{key:"edit",id:"permOpsEdit",label:"Edit"},{key:"delete",id:"permOpsDelete",label:"Delete"},{key:"approve",id:"permOpsApprove",label:"Approve"}]}],xx={clients:{view:!0,create:!0,edit:!0,delete:!0,approve:!0},sales:{view:!0,create:!0,edit:!0,delete:!0,approve:!0},accounts:{view:!0,create:!0,edit:!0,delete:!0,approve:!0},reports:{view:!0,create:!0,edit:!0,delete:!0,approve:!0},operations:{view:!0,create:!0,edit:!0,delete:!0,approve:!0}},vx=[{value:"",label:"Choose a template..."},{value:"invoice",label:"Invoice Email"},{value:"payment",label:"Payment Confirmation"},{value:"approval",label:"Approval Request"},{value:"quotation",label:"Quotation"},{value:"welcome",label:"Welcome Email"}],yx={invoice:{subject:"Invoice {invoice_no} - {company}",body:`Dear {client},

Please find attached your invoice {invoice_no}.

Amount Due: {amount}

Thank you for your business!

Best regards,
{company}`},payment:{subject:"Payment Confirmation - Thank You",body:`Dear {client},

We have received your payment of {amount}.

Thank you for your prompt payment!

Best regards,
{company}`},approval:{subject:"Approval Request - Action Required",body:`Dear {client},

Your approval is required for the following:

Amount: {amount}
Date: {date}

Please click the link below to approve:
{approval_url}

Best regards,
{company}`},quotation:{subject:"Quotation {invoice_no} - Valid until {date}",body:`Dear {client},

Please find attached our quotation {invoice_no}.

Amount: {amount}
Validity: 30 days

We await your confirmation.

Best regards,
{company}`},welcome:{subject:"Welcome to {company}",body:`Dear {client},

Welcome to {company}!

We are delighted to have you as a client. Our team is ready to assist you.

If you have any questions, please don't hesitate to contact us.

Best regards,
{company}`}},bx={smtpServer:"",smtpPort:"587",smtpEmail:"",smtpPassword:"",smtpEncryption:"tls",senderName:"LedgerWorx",templateType:"",templateSubject:"",templateBody:"",emailOnInvoice:!0,emailOnPayment:!0,emailOnApproval:!0,whatsappEnabled:!1,whatsappAccountId:"",whatsappApiKey:"",whatsappPhone:"",waInvoice:!0,waPayment:!0,waApproval:!1,smsProvider:"",smsAccountId:"",smsAuthToken:"",smsSenderPhone:"",smsInvoice:!1,smsPayment:!1,smsApproval:!1},jx=[{dateTime:"2026-02-14 02:30 PM",ipAddress:"203.0.113.42",browser:"Chrome on Windows",status:"Success",color:"green"},{dateTime:"2026-02-14 10:15 AM",ipAddress:"203.0.113.42",browser:"Safari on MacOS",status:"Success",color:"green"},{dateTime:"2026-02-13 11:45 PM",ipAddress:"192.168.1.50",browser:"Firefox on Linux",status:"Success",color:"green"},{dateTime:"2026-02-13 03:20 PM",ipAddress:"203.0.113.42",browser:"Chrome on Windows",status:"Success",color:"green"},{dateTime:"2026-02-12 09:00 AM",ipAddress:"10.0.0.5",browser:"Chrome on Windows",status:"Failed - Wrong Password",color:"red"}],wx=[{dateTime:"2026-02-14 02:35 PM",user:"System Admin",action:"Updated Settings",resource:"Company Settings",status:"Success",color:"green"},{dateTime:"2026-02-14 02:30 PM",user:"System Admin",action:"Created User",resource:"Rahul Sharma (ID: 6)",status:"Success",color:"green"},{dateTime:"2026-02-14 01:15 PM",user:"Manager",action:"Viewed Report",resource:"Sales Report - Feb 2026",status:"Success",color:"green"},{dateTime:"2026-02-13 11:50 PM",user:"System Admin",action:"Modified Permission",resource:"Sales Department Role",status:"Success",color:"green"},{dateTime:"2026-02-13 10:20 AM",user:"System Admin",action:"Deleted User",resource:"Old Test Account (ID: 4)",status:"Success",color:"green"}],kx={currentPassword:"",newPassword:"",confirmPassword:"",twoFactorEnabled:!1,authMethod:"",maxAttempts:"5",lockoutDuration:"15",sessionTimeout:"30",inactivityWarning:"25",ipWhitelistEnabled:!1,ipAddresses:""},Nx={vatPercent:"5",vatRegNumber:"",vatApplyTo:"all",invoicePrefix:"INV",invoiceYearFormat:"full",invoiceDigits:"3",quotationPrefix:"QT",quotationValidity:"30",quotationTerms:"yes",defaultPaymentTerms:"cod",earlyPaymentDiscount:"0",latePaymentPenalty:"0",bankName:"",accountHolderName:"",accountNumber:"",iban:"",swiftCode:"",branchCode:"",multiCurrencyEnabled:!1,baseCurrency:"AED",supportedCurrencies:[],taxInPrice:!1,taxOnDiscounts:!1,taxRegNumber:"",taxLabel:"VAT"},rd=["AED","USD","EUR","INR","GBP","SAR","KWD","QAR"],Sx={level1Approver:"",level1Required:"yes",level2Approver:"3",level2Required:"yes",level3Approver:"1",level3Required:"yes",defaultSalesperson:"2",autoAssignToggle:"yes",emailOnApproved:!0,emailOnRejected:!0,emailOnHold:!1,emailOnStatusChange:!0,emailRecipientRequester:!0,emailRecipientApprover:!0,emailRecipientManager:!1,emailRecipientAdmin:!1,escalationToggle:!1,escalateAfterHours:"24",escalateToLevel:"next",escalationEmailCurrentApprover:!0,escalationEmailNextApprover:!0,escalationAdminAlert:!0},Cx=[{title:"Pending",description:"Awaiting approval",color:"#f39c12",statusLabel:"Active"},{title:"Approved",description:"Request approved",color:"#27ae60",statusLabel:"Active"},{title:"Rejected",description:"Request rejected",color:"#e74c3c",statusLabel:"Active"},{title:"On Hold",description:"Temporarily paused",color:"#95a5a6",statusLabel:"Active"}],Ex={backupFrequency:"daily",backupTime:"02:00",maintenanceModeToggle:!1,systemVersionLabel:"LedgerWorx v2.3.1",buildDate:"2026-02-14"},Px=`:root{\r
  --primary:#2f8f83;\r
  --bg:#eef1f7;\r
  --card:#ffffff;\r
  --text:#2c3e50;\r
  --muted:#7f8c8d;\r
}\r
\r
body.dark{\r
  --bg:#121212;\r
  --card:#1e1e1e;\r
  --text:#f1f1f1;\r
  --muted:#aaaaaa;\r
}\r
\r
*{margin:0;padding:0;box-sizing:border-box;font-family:"Segoe UI",sans-serif;}\r
body{\r
  background:var(--bg);\r
  color:var(--text);\r
  transition:background .35s,color .35s;\r
}\r
\r
/* NAVBAR */\r
.navbar{\r
  height:70px;\r
  background:linear-gradient(90deg,#1f2f3a,var(--primary));\r
  display:flex;\r
  justify-content:space-between;\r
  align-items:center;\r
  padding:0 25px;\r
  color:#fff;\r
}\r
.nav-left{display:flex;align-items:center;gap:25px;}\r
.logo img{height:32px}\r
.nav-logo{ height:34px; display:block; }\r
\r
.nav-links a{\r
  color:#fff;\r
  text-decoration:none;\r
  padding:8px 12px;\r
  border-radius:6px;\r
  font-size:14px;\r
  transition:.25s;\r
}\r
.nav-links a:hover{background:rgba(255,255,255,.2);}\r
.nav-links a.active{background:rgba(255,255,255,.3);}\r
\r
.nav-right{font-weight:600}\r
\r
/* PAGE */\r
.page{padding:25px;}\r
.card{\r
  background:var(--card);\r
  border-radius:14px;\r
  padding:25px;\r
  max-width:1240px;\r
  margin:auto;\r
  box-shadow:0 6px 14px rgba(0,0,0,.1);\r
}\r
\r
/* SETTINGS MENU */\r
.settings-menu{\r
  display:grid;\r
  grid-template-columns:repeat(8,minmax(0,1fr));\r
  gap:12px;\r
  margin-bottom:20px;\r
}\r
.settings-menu button{\r
  border:none;\r
  padding:14px 10px;\r
  border-radius:10px;\r
  cursor:pointer;\r
  font-size:20px;\r
  line-height:1.25;\r
  min-height:92px;\r
  display:flex;\r
  flex-direction:column;\r
  align-items:center;\r
  justify-content:center;\r
  gap:6px;\r
  text-align:center;\r
  background:#f2f4f8;\r
  transition:.25s;\r
}\r
.settings-menu button i{\r
  font-size:17px;\r
}\r
.settings-menu button.active{\r
  background:var(--primary);\r
  color:#fff;\r
}\r
.settings-menu button:hover{\r
  transform:translateY(-2px);\r
}\r
@media (max-width: 1200px){\r
  .settings-menu{\r
    grid-template-columns:repeat(4,minmax(0,1fr));\r
  }\r
}\r
@media (max-width: 768px){\r
  .card{\r
    max-width:100%;\r
    padding:16px;\r
  }\r
  .settings-menu{\r
    grid-template-columns:repeat(2,minmax(0,1fr));\r
    gap:10px;\r
  }\r
  .settings-menu button{\r
    min-height:78px;\r
    font-size:20px;\r
  }\r
}\r
\r
/* SECTIONS */\r
.section{display:none;}\r
.section.active{display:block;}\r
\r
.form-grid{\r
  display:grid;\r
  grid-template-columns:repeat(auto-fit,minmax(240px,1fr));\r
  gap:15px;\r
}\r
\r
.field label{\r
  font-size:13px;\r
  color:var(--muted);\r
  margin-bottom:5px;\r
  display:block;\r
}\r
.field input,\r
.field select{\r
  width:100%;\r
  padding:9px 10px;\r
  border-radius:6px;\r
  border:1px solid #ccc;\r
  background:transparent;\r
  color:var(--text);\r
}\r
\r
/* SWITCH */\r
.switch{\r
  position:relative;\r
  width:56px;\r
  height:28px;\r
}\r
.switch input{opacity:0;width:0;height:0;}\r
.slider{\r
  position:absolute;\r
  cursor:pointer;\r
  inset:0;\r
  background:#ccc;\r
  border-radius:28px;\r
  transition:.3s;\r
}\r
.slider:before{\r
  content:"";\r
  position:absolute;\r
  height:22px;\r
  width:22px;\r
  left:3px;\r
  bottom:3px;\r
  background:white;\r
  border-radius:50%;\r
  transition:.3s;\r
}\r
.switch input:checked + .slider{\r
  background:var(--primary);\r
}\r
.switch input:checked + .slider:before{\r
  transform:translateX(28px);\r
}\r
\r
.toggle-row{\r
  display:flex;\r
  justify-content:space-between;\r
  align-items:center;\r
  padding:14px;\r
  border:1px solid #ddd;\r
  border-radius:10px;\r
  margin-top:15px;\r
}\r
\r
.save-btn{\r
  margin-top:25px;\r
  padding:10px 22px;\r
  border:none;\r
  border-radius:8px;\r
  background:#2f80ed;\r
  color:#fff;\r
  cursor:pointer;\r
}\r
.save-btn:hover{background:#1f6fe0}\r
\r
/* FILE UPLOAD PREVIEW */\r
.upload-box{\r
  padding:20px;\r
  border:2px dashed #ccc;\r
  border-radius:10px;\r
  text-align:center;\r
  cursor:pointer;\r
  transition:.3s;\r
}\r
.upload-box:hover{\r
  border-color:var(--primary);\r
  background:rgba(47,143,131,.05);\r
}\r
.upload-box img,\r
.upload-box svg{\r
  max-width:100px;\r
  max-height:100px;\r
  margin:10px 0;\r
}\r
.upload-preview{\r
  display:inline-block;\r
  position:relative;\r
  margin:10px;\r
}\r
.upload-preview img{\r
  max-width:120px;\r
  max-height:120px;\r
  border-radius:8px;\r
  border:2px solid #ddd;\r
}\r
.remove-upload{\r
  position:absolute;\r
  top:-8px;\r
  right:-8px;\r
  background:#e74c3c;\r
  color:#fff;\r
  border:none;\r
  border-radius:50%;\r
  width:24px;\r
  height:24px;\r
  cursor:pointer;\r
  font-size:12px;\r
}\r
\r
/* FILE UPLOAD PREVIEW */\r
.upload-box{\r
  padding:20px;\r
  border:2px dashed #ccc;\r
  border-radius:10px;\r
  text-align:center;\r
  cursor:pointer;\r
  transition:.3s;\r
}\r
.upload-box:hover{\r
  border-color:var(--primary);\r
  background:rgba(47,143,131,.05);\r
}\r
.upload-box img,\r
.upload-box svg{\r
  max-width:100px;\r
  max-height:100px;\r
  margin:10px 0;\r
}\r
.upload-preview{\r
  display:inline-block;\r
  position:relative;\r
  margin:10px;\r
}\r
.upload-preview img{\r
  max-width:120px;\r
  max-height:120px;\r
  border-radius:8px;\r
  border:2px solid #ddd;\r
}\r
.remove-upload{\r
  position:absolute;\r
  top:-8px;\r
  right:-8px;\r
  background:#e74c3c;\r
  color:#fff;\r
  border:none;\r
  border-radius:50%;\r
  width:24px;\r
  height:24px;\r
  cursor:pointer;\r
  font-size:12px;\r
}\r
\r
/* FILE UPLOAD PREVIEW */\r
.upload-box{\r
  padding:20px;\r
  border:2px dashed #ccc;\r
  border-radius:10px;\r
  text-align:center;\r
  cursor:pointer;\r
  transition:.3s;\r
}\r
.upload-box:hover{\r
  border-color:var(--primary);\r
  background:rgba(47,143,131,.05);\r
}\r
.upload-box img,\r
.upload-box svg{\r
  max-width:100px;\r
  max-height:100px;\r
  margin:10px 0;\r
}\r
.upload-preview{\r
  display:inline-block;\r
  position:relative;\r
  margin:10px;\r
}\r
.upload-preview img{\r
  max-width:120px;\r
  max-height:120px;\r
  border-radius:8px;\r
  border:2px solid #ddd;\r
}\r
.remove-upload{\r
  position:absolute;\r
  top:-8px;\r
  right:-8px;\r
  background:#e74c3c;\r
  color:#fff;\r
  border:none;\r
  border-radius:50%;\r
  width:24px;\r
  height:24px;\r
  cursor:pointer;\r
  font-size:12px;\r
}\r
\r
/* PERMISSIONS MATRIX */\r
.permissions-container{\r
  margin-top:20px;\r
}\r
.permission-card{\r
  border:1px solid #ddd;\r
  border-radius:10px;\r
  padding:20px;\r
  margin-bottom:20px;\r
  background:var(--card);\r
}\r
.permission-card-header{\r
  display:flex;\r
  justify-content:space-between;\r
  align-items:center;\r
  margin-bottom:15px;\r
  padding-bottom:10px;\r
  border-bottom:2px solid #ddd;\r
}\r
.permission-card-header h4{\r
  margin:0;\r
  color:var(--primary);\r
  font-size:16px;\r
}\r
.permission-badge{\r
  display:inline-block;\r
  padding:4px 10px;\r
  border-radius:20px;\r
  font-size:12px;\r
  font-weight:600;\r
}\r
.permission-badge.full-access{\r
  background:#27ae60;\r
  color:#fff;\r
}\r
.permission-badge.limited{\r
  background:#f39c12;\r
  color:#fff;\r
}\r
\r
.permission-grid{\r
  display:grid;\r
  grid-template-columns:repeat(auto-fit,minmax(150px,1fr));\r
  gap:12px;\r
  margin-top:15px;\r
}\r
.permission-checkbox{\r
  display:flex;\r
  align-items:center;\r
  gap:8px;\r
  padding:8px;\r
  border-radius:6px;\r
  background:#f9f9f9;\r
}\r
.permission-checkbox input[type="checkbox"]{\r
  width:18px;\r
  height:18px;\r
  cursor:pointer;\r
}\r
.permission-checkbox label{\r
  cursor:pointer;\r
  margin:0;\r
  font-size:13px;\r
}\r
\r
.roles-list{\r
  display:grid;\r
  grid-template-columns:repeat(auto-fit,minmax(250px,1fr));\r
  gap:15px;\r
  margin-top:20px;\r
}\r
.role-item{\r
  border:1px solid #ddd;\r
  border-radius:10px;\r
  padding:15px;\r
  background:#f9f9f9;\r
  transition:.3s;\r
}\r
.role-item:hover{\r
  box-shadow:0 4px 12px rgba(0,0,0,.1);\r
}\r
.role-item-header{\r
  display:flex;\r
  justify-content:space-between;\r
  align-items:center;\r
  margin-bottom:12px;\r
  padding-bottom:8px;\r
  border-bottom:1px solid #ddd;\r
}\r
.role-item-header h5{\r
  margin:0;\r
  color:var(--primary);\r
  font-size:14px;\r
  font-weight:600;\r
}\r
.role-item-actions{\r
  display:flex;\r
  gap:6px;\r
}\r
.role-item-actions button{\r
  padding:5px 10px;\r
  border:none;\r
  border-radius:4px;\r
  background:var(--primary);\r
  color:#fff;\r
  cursor:pointer;\r
  font-size:11px;\r
  font-weight:600;\r
}\r
.role-item-actions button:hover{\r
  opacity:.8;\r
}\r
\r
/* USER ACTION BUTTONS */\r
.action-buttons{\r
  display:flex;\r
  flex-wrap:wrap;\r
  gap:6px;\r
}\r
.action-buttons .btn-action{\r
  border:1px solid transparent;\r
  border-radius:7px;\r
  padding:6px 10px;\r
  font-size:12px;\r
  font-weight:600;\r
  cursor:pointer;\r
  line-height:1.2;\r
}\r
.action-buttons .btn-edit{\r
  background:#ebf5ff;\r
  border-color:#b9d9ff;\r
  color:#1d5fa7;\r
}\r
.action-buttons .btn-status{\r
  background:#fff6e8;\r
  border-color:#ffd79e;\r
  color:#915d00;\r
}\r
.action-buttons .btn-reset{\r
  background:#eef3ff;\r
  border-color:#c6d4ff;\r
  color:#334eaa;\r
}\r
.action-buttons .btn-logout{\r
  background:#f2f4f8;\r
  border-color:#d7dde7;\r
  color:#394a5a;\r
}\r
.action-buttons .btn-delete{\r
  background:#ffecec;\r
  border-color:#ffc5c5;\r
  color:#b42318;\r
}\r
.action-buttons .btn-action:hover{\r
  filter:brightness(.97);\r
}\r
\r
/* USER MANAGEMENT TABLE SPACING */\r
#users .users-table-wrap{\r
  margin-top:8px;\r
  overflow-x:auto;\r
}\r
#users .users-table{\r
  width:100%;\r
  min-width:1080px;\r
  border-collapse:separate;\r
  border-spacing:0;\r
}\r
#users .users-table th{\r
  text-align:left;\r
  font-size:12px;\r
  color:var(--muted);\r
  padding:14px 16px;\r
  border-bottom:1px solid #e6ebf2;\r
  white-space:nowrap;\r
}\r
#users .users-table td{\r
  padding:16px;\r
  border-bottom:1px solid #eef2f7;\r
  vertical-align:top;\r
}\r
#users .users-table th:nth-child(1),\r
#users .users-table td:nth-child(1){\r
  min-width:190px;\r
}\r
#users .users-table th:nth-child(2),\r
#users .users-table td:nth-child(2){\r
  min-width:230px;\r
}\r
#users .users-table th:nth-child(3),\r
#users .users-table td:nth-child(3){\r
  min-width:120px;\r
}\r
#users .users-table th:nth-child(4),\r
#users .users-table td:nth-child(4){\r
  min-width:110px;\r
}\r
#users .users-table th:nth-child(5),\r
#users .users-table td:nth-child(5){\r
  min-width:150px;\r
}\r
#users .users-table th:nth-child(6),\r
#users .users-table td:nth-child(6){\r
  min-width:280px;\r
}\r
#users .user-info{\r
  display:flex;\r
  align-items:center;\r
  gap:10px;\r
}\r
#users .user-avatar{\r
  width:34px;\r
  height:34px;\r
  border-radius:50%;\r
  display:flex;\r
  align-items:center;\r
  justify-content:center;\r
  font-weight:700;\r
  font-size:13px;\r
  background:#e9f2ff;\r
  color:#1f4f8a;\r
  flex:0 0 34px;\r
}\r
#users .role-badge{\r
  display:inline-block;\r
  padding:4px 10px;\r
  border-radius:999px;\r
  background:#eef3ff;\r
  color:#334eaa;\r
  font-size:12px;\r
  font-weight:600;\r
}\r
#users .status-active{\r
  color:#0f7a37;\r
  font-weight:600;\r
}\r
#users .status-inactive{\r
  color:#9a3412;\r
  font-weight:600;\r
}\r
\r
.system-action-grid{\r
  display:grid;\r
  grid-template-columns:repeat(auto-fit,minmax(280px,1fr));\r
  gap:18px;\r
  margin-top:18px;\r
}\r
.system-action-card{\r
  border:1px solid #d8dce3;\r
  border-radius:14px;\r
  padding:18px;\r
  background:linear-gradient(180deg,#ffffff,#f7f9fc);\r
  box-shadow:0 6px 16px rgba(0,0,0,.05);\r
  display:flex;\r
  flex-direction:column;\r
  min-height:210px;\r
  transition:transform .2s ease, box-shadow .2s ease, border-color .2s ease;\r
}\r
.system-action-card h5{\r
  margin-bottom:8px;\r
  color:var(--primary);\r
  font-size:15px;\r
  display:flex;\r
  align-items:center;\r
  gap:8px;\r
}\r
.system-action-card small{\r
  color:var(--muted);\r
  display:block;\r
  margin-bottom:14px;\r
  line-height:1.4;\r
}\r
.system-action-card:hover{\r
  transform:translateY(-2px);\r
  box-shadow:0 10px 24px rgba(0,0,0,.08);\r
  border-color:#c8d1dc;\r
}\r
.system-action-card .toggle-row{\r
  margin-top:auto;\r
}\r
.tile-action{\r
  margin-top:auto !important;\r
  width:fit-content;\r
  min-width:170px;\r
  border-radius:10px;\r
}\r
.system-info-row{\r
  margin-top:10px;\r
  font-size:13px;\r
  color:var(--muted);\r
}\r
.admin-only-banner{\r
  background:#fff3cd;\r
  color:#856404;\r
  border:1px solid #ffeeba;\r
  border-radius:8px;\r
  padding:10px 12px;\r
  margin-bottom:15px;\r
  font-size:13px;\r
}\r
.backup-status{\r
  margin-top:10px;\r
  font-size:13px;\r
  color:var(--text);\r
}\r
\r
/* SECURITY LOG PANELS */\r
.log-panel{\r
  border:1px solid #ddd;\r
  border-radius:12px;\r
  padding:22px;\r
  background:var(--card);\r
  margin-top:26px;\r
}\r
.log-table-wrap{\r
  margin-top:12px;\r
  overflow-x:auto;\r
}\r
.log-panel .users-table{\r
  width:100%;\r
  border-collapse:separate;\r
  border-spacing:0;\r
  min-width:760px;\r
}\r
.log-panel .users-table th{\r
  text-align:left;\r
  font-size:12px;\r
  color:var(--muted);\r
  padding:12px 14px;\r
  border-bottom:1px solid #e6ebf2;\r
  background:#f8fafc;\r
}\r
.log-panel .users-table td{\r
  padding:14px;\r
  border-bottom:1px solid #eef2f7;\r
  line-height:1.45;\r
  vertical-align:top;\r
}\r
.log-panel .users-table tbody tr:last-child td{\r
  border-bottom:none;\r
}\r
@media (max-width: 768px){\r
  .log-panel{\r
    padding:16px;\r
    margin-top:18px;\r
  }\r
}\r
\r
/* USER MODAL */\r
.modal{\r
  display:none;\r
  position:fixed;\r
  inset:0;\r
  background:rgba(0,0,0,.45);\r
  z-index:9999;\r
  align-items:center;\r
  justify-content:center;\r
  padding:16px;\r
}\r
.modal.show{\r
  display:flex;\r
}\r
.modal-content{\r
  width:100%;\r
  max-width:640px;\r
  background:var(--card);\r
  border-radius:12px;\r
  box-shadow:0 14px 36px rgba(0,0,0,.2);\r
  border:1px solid #d9dfe8;\r
  overflow:hidden;\r
}\r
.modal-header{\r
  display:flex;\r
  justify-content:space-between;\r
  align-items:center;\r
  padding:14px 16px;\r
  border-bottom:1px solid #e4e8ef;\r
}\r
.modal-body{\r
  padding:16px;\r
}\r
.modal-footer{\r
  padding:14px 16px;\r
  border-top:1px solid #e4e8ef;\r
  display:flex;\r
  justify-content:flex-end;\r
  gap:10px;\r
}\r
.modal-close,\r
.btn-secondary,\r
.btn-primary{\r
  border:1px solid #d0d7e1;\r
  border-radius:8px;\r
  padding:8px 12px;\r
  background:#fff;\r
  cursor:pointer;\r
}\r
.btn-primary{\r
  background:#2f80ed;\r
  border-color:#2f80ed;\r
  color:#fff;\r
}\r
@media (max-width: 640px){\r
  .system-action-grid{\r
    grid-template-columns:1fr;\r
  }\r
  .system-action-card{\r
    min-height:auto;\r
  }\r
  .tile-action{\r
    width:100%;\r
  }\r
}\r
\r
/* SETTINGS PAGE VISUAL POLISH */\r
body{\r
  background:radial-gradient(circle at 0% 0%, #ffffff 0%, #edf3fb 50%, #e6edf8 100%);\r
}\r
body.dark{\r
  background:#121821;\r
}\r
.page{\r
  max-width:1460px;\r
  margin:0 auto;\r
  padding:24px;\r
}\r
.card{\r
  background:linear-gradient(180deg,#ffffff,#fbfdff);\r
  border:1px solid #e2ebf5;\r
  border-radius:16px;\r
  box-shadow:0 10px 24px rgba(18,38,63,.09);\r
}\r
.settings-menu{\r
  gap:10px;\r
  margin-bottom:22px;\r
}\r
.settings-menu button{\r
  border:1px solid #dce6f3;\r
  border-radius:12px;\r
  background:linear-gradient(180deg,#f8fbff,#f2f6fc);\r
  box-shadow:0 4px 10px rgba(18,38,63,.05);\r
  font-size:18px;\r
}\r
.settings-menu button:hover{\r
  transform:translateY(-2px);\r
  box-shadow:0 10px 18px rgba(18,38,63,.10);\r
}\r
.settings-menu button.active{\r
  background:linear-gradient(135deg,#36a494,#2f8f83);\r
  border-color:#78cbbf;\r
  color:#fff;\r
}\r
.field label{\r
  font-size:12px;\r
  color:#617891;\r
  font-weight:600;\r
  letter-spacing:.3px;\r
}\r
.field input,\r
.field select,\r
textarea{\r
  border:1px solid #d2e0ef;\r
  border-radius:10px;\r
  padding:10px 11px;\r
  background:#fff;\r
}\r
.field input:focus,\r
.field select:focus,\r
textarea:focus{\r
  outline:none;\r
  border-color:#96bde9;\r
  box-shadow:0 0 0 3px rgba(65,105,225,.12);\r
}\r
.toggle-row{\r
  border-color:#d8e2ee;\r
  background:#f9fbff;\r
}\r
.save-btn{\r
  border:1px solid #9ecfff;\r
  border-radius:999px;\r
  background:linear-gradient(135deg,#46a0f3,#2f80ed);\r
  box-shadow:0 9px 18px rgba(47,128,237,.24);\r
  font-weight:700;\r
}\r
.save-btn:hover{\r
  filter:brightness(1.05);\r
  box-shadow:0 12px 20px rgba(47,128,237,.3);\r
}\r
.permission-card,\r
.role-item,\r
.log-panel{\r
  border-color:#dde7f2;\r
  border-radius:14px;\r
  box-shadow:0 8px 18px rgba(18,38,63,.06);\r
}\r
.permission-checkbox{\r
  background:#f7fbff;\r
  border:1px solid #e2ebf5;\r
}\r
#users .users-table{\r
  border:1px solid #e1eaf4;\r
  border-radius:12px;\r
  overflow:hidden;\r
}\r
#users .users-table th{\r
  background:#f6faff;\r
  color:#60758d;\r
  font-size:12px;\r
  text-transform:uppercase;\r
  letter-spacing:.45px;\r
}\r
#users .users-table tbody tr:hover{\r
  background:#f8fbff;\r
}\r
.system-action-card{\r
  border-color:#dce5ef;\r
  border-radius:14px;\r
  background:linear-gradient(180deg,#ffffff,#f8fbff);\r
  box-shadow:0 10px 22px rgba(18,38,63,.07);\r
}\r
.admin-only-banner{\r
  border-radius:10px;\r
}\r
.modal-content{\r
  border-radius:14px;\r
  box-shadow:0 18px 36px rgba(0,0,0,.22);\r
}\r
.btn-secondary,\r
.modal-close,\r
.btn-primary{\r
  border-radius:999px;\r
  font-weight:700;\r
}\r
`,$n={border:"1px solid #ddd",borderRadius:"10px",padding:"20px",background:"var(--card)"},se={...$n,marginBottom:"20px"},Ai={background:"#f0f8ff",padding:"15px",borderRadius:"6px",marginTop:"15px",borderLeft:"4px solid var(--primary)"},Ax={background:"#fff3cd",padding:"12px",borderRadius:"6px",borderLeft:"4px solid #f39c12",marginTop:"15px"},Tx={display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"15px",marginBottom:"15px"},Dx={border:"1px solid #ddd",borderRadius:"8px",padding:"12px",background:"#f9f9f9"},Rx={display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:"10px"},zx={marginTop:"10px",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:"10px"},Ix={minHeight:"120px",padding:"10px",border:"1px solid #ddd",borderRadius:"6px",fontFamily:"monospace"},Lx={minHeight:"200px",padding:"10px",border:"1px solid #ddd",borderRadius:"6px",fontFamily:"monospace",fontSize:"13px"},ad={fullName:"",email:"",role:"",status:"Active"},Ti={1:"System Admin",2:"Rahul Sharma",3:"Priya Agarwal",4:"Rohit Verma"},Mx={2:"Rahul Sharma",5:"Sales Team Lead",6:"Vikram Singh"},Fx={cod:"Cash on Delivery",net15:"Net 15 Days",net30:"Net 30 Days",net45:"Net 45 Days",net60:"Net 60 Days"};function id(e,n){const r=new FileReader;r.onload=a=>{var i;n(String(((i=a.target)==null?void 0:i.result)??""))},r.readAsDataURL(e)}function Ox(e){const n=String(new Date().getFullYear()),r=e.invoicePrefix.trim().toUpperCase()||"INV",a=e.invoiceYearFormat==="full"?n:n.slice(-2),i=Math.max(1,Number(e.invoiceDigits||1)),s=`${"0".repeat(i-1)}1`;return`${r}-${a}-${s}`}function _x(e){return`${e.quotationPrefix.trim().toUpperCase()||"QT"}-${new Date().getFullYear()}-001`}function Bx(e){return String(e||"?").trim().charAt(0).toUpperCase()}function Ux(){if(typeof window>"u")return"Admin";try{const e=window.localStorage.getItem("ledger_role");return e&&e.trim()?e.trim():"Admin"}catch{return"Admin"}}function $x(e){return e.length===0?1:Math.max(...e.map(n=>n.id))+1}function Vx(){Ge({pageKey:"settings",pageCssText:Px});const n=S.useMemo(()=>Ux(),[]).toLowerCase()==="admin",r=S.useRef(null),a=S.useRef(null),[i,s]=S.useState("company"),[l,o]=S.useState(mx),[d,p]=S.useState(""),[m,g]=S.useState(""),[u,y]=S.useState(bx),[N,k]=S.useState(kx),[b,h]=S.useState(fx),[f,v]=S.useState(!1),[E,j]=S.useState(null),[x,T]=S.useState(ad),[R,w]=S.useState(xx),[C,F]=S.useState(Nx),[M,$]=S.useState(Sx),[P,ee]=S.useState(Ex),[fe,On]=S.useState(null);S.useEffect(()=>{function c(z){z.key==="Escape"&&(v(!1),j(null))}return document.addEventListener("keydown",c),()=>{document.removeEventListener("keydown",c)}},[]);const I=S.useMemo(()=>Ox(C),[C]),O=S.useMemo(()=>_x(C),[C]),_=n?"Admin can configure: SMTP, Email Templates, Auto Email (Invoice Creation, Payment Received, Approval Request), WhatsApp API, SMS Integration.":"Admin-only configuration. Your current role can view but cannot modify Email & Notification settings.",H=n?"Admin only controls":"Admin only controls. Your current role does not allow changes.";function A(c,z,B){c(ne=>({...ne,[z]:B}))}function ae(){return n?!0:(window.alert("Only admin users can perform this action."),!1)}function Le(c){var B;const z=(B=c.target.files)==null?void 0:B[0];z&&id(z,p)}function _n(c){var B;const z=(B=c.target.files)==null?void 0:B[0];z&&id(z,g)}function Me(){r.current&&(r.current.value=""),p("")}function nt(){a.current&&(a.current.value=""),g("")}function Iu(){if(!n){window.alert("Only admin users can add new users.");return}j(null),T(ad),v(!0)}function Lu(c){const z=b.find(B=>B.id===c);z&&(j(c),T({fullName:z.name,email:z.email,role:z.role,status:z.status}),v(!0))}function Cr(){v(!1),j(null)}function Mu(){const c=x.fullName.trim(),z=x.email.trim(),B=x.role,ne=x.status;if(!c||!z||!B){window.alert("Please fill all required fields");return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(z)){window.alert("Please enter a valid email");return}E?(h(Pr=>Pr.map(It=>It.id===E?{...It,name:c,email:z,role:B,status:ne}:It)),window.alert("User updated successfully!")):(h(Pr=>{const It=$x(Pr);return[...Pr,{id:It,name:c,email:z,role:B,status:ne,lastLogin:"Never"}]}),window.alert("User added successfully! (Password should be sent separately)")),Cr()}function Fu(c){window.confirm("Are you sure you want to delete this user?")&&(h(z=>z.filter(B=>B.id!==c)),window.alert("User deleted successfully!"))}function Ou(c){const z=b.find(ne=>ne.id===c);if(!z)return;const B=z.status==="Active"?"Inactive":"Active";h(ne=>ne.map(Er=>Er.id===c?{...Er,status:B}:Er)),window.alert(`User ${B==="Active"?"activated":"deactivated"} successfully!`)}function _u(c){const z=b.find(ne=>ne.id===c);if(!z)return;const B=window.prompt(`Generate new password for ${z.name}?
(Leave blank to auto-generate)`);if(B!==null){const ne=B||`AUTO-GENERATED-${Math.random().toString(36).substring(7)}`;window.alert(`Password reset for ${z.name}.
New password: ${ne}
(Should be sent via email)`)}}function Bu(c){const z=b.find(B=>B.id===c);!z||!window.confirm(`Force logout ${z.name}?`)||window.alert(`${z.name} has been logged out from all sessions.`)}function Uu(c,z,B){w(ne=>({...ne,[c]:{...ne[c],[z]:B}}))}function $u(){console.log("Role Permissions saved:",R),window.alert("Role permissions saved successfully!")}function Vu(){const c={companyName:l.companyName.trim(),tradeLicense:l.tradeLicense.trim(),vatNumber:l.vatNumber.trim(),contactEmail:l.contactEmail.trim(),contactPhone:l.contactPhone.trim(),address:l.address.trim(),poBox:l.poBox.trim(),currency:l.companyCurrency,timeZone:l.companyTimeZone};if(!c.companyName||!c.contactEmail||!c.contactPhone){window.alert("Company Name, Email, and Phone are required");return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.contactEmail)){window.alert("Please enter a valid email address");return}console.log("Company Settings saved:",c),window.alert("Company settings saved successfully!")}function Wu(){if(!ae())return;const c=Number(u.smtpPort);if(!u.smtpServer.trim()||!u.smtpEmail.trim()||!u.smtpPassword||!u.senderName.trim()||!c){window.alert("Please fill all required SMTP fields");return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(u.smtpEmail.trim())){window.alert("Please enter a valid email address");return}console.log("SMTP Settings:",u),window.alert(`SMTP Settings saved:
- Server: ${u.smtpServer.trim()}:${c}
- Email: ${u.smtpEmail.trim()}
- Sender: ${u.senderName.trim()}`)}function qu(){if(ae()){if(!u.smtpServer.trim()){window.alert("Please save SMTP settings first");return}window.alert(`Testing SMTP connection to ${u.smtpServer.trim()}...

Connection Status: SUCCESS ✓

SMTP server is reachable and authentication is valid.`)}}function Hu(c){if(!c){y(B=>({...B,templateType:"",templateSubject:"",templateBody:""}));return}const z=yx[c];y(B=>({...B,templateType:c,templateSubject:z.subject,templateBody:z.body}))}function Qu(){if(ae()){if(!u.templateSubject.trim()||!u.templateBody.trim()){window.alert("Subject and body are required");return}console.log("Email Template:",{templateType:u.templateType,subject:u.templateSubject,body:u.templateBody}),window.alert("Email template saved successfully!")}}function Yu(){ae()&&window.alert(`Auto Email Triggers saved:
- Invoice Creation: ${u.emailOnInvoice?"Enabled":"Disabled"}
- Payment Received: ${u.emailOnPayment?"Enabled":"Disabled"}
- Approval Request: ${u.emailOnApproval?"Enabled":"Disabled"}`)}function Ku(c){n&&A(y,"whatsappEnabled",c)}function Gu(){if(ae()){if(!u.whatsappAccountId.trim()||!u.whatsappApiKey||!u.whatsappPhone.trim()){window.alert("Please fill all required WhatsApp fields");return}console.log("WhatsApp Settings:",u),window.alert(`WhatsApp API Settings saved:
- Account ID: ${u.whatsappAccountId.trim()}
- Default Phone: ${u.whatsappPhone.trim()}`)}}function Xu(){if(ae()){if(!u.whatsappAccountId.trim()){window.alert("Please save WhatsApp settings first");return}window.alert(`Testing WhatsApp connection for account ${u.whatsappAccountId.trim()}...

Connection Status: SUCCESS ✓

WhatsApp API is accessible and authentication is valid.`)}}function Zu(c){n&&A(y,"smsProvider",c)}function Ju(){if(ae()){if(!u.smsAccountId.trim()||!u.smsAuthToken){window.alert("Please fill all required SMS fields");return}if(u.smsProvider==="twilio"&&!u.smsSenderPhone.trim()){window.alert("Sender phone number is required for Twilio");return}console.log("SMS Settings:",u),window.alert(`SMS Settings saved:
- Provider: ${u.smsProvider.toUpperCase()}
- Account ID: ${u.smsAccountId.trim()}`)}}function ep(){if(ae()){if(!u.smsProvider){window.alert("Please select an SMS provider");return}window.alert(`Testing ${u.smsProvider.toUpperCase()} SMS connection...

Connection Status: SUCCESS ✓

SMS gateway is accessible and authentication is valid.`)}}function np(){if(!N.currentPassword||!N.newPassword||!N.confirmPassword){window.alert("All password fields are required");return}if(N.newPassword.length<8){window.alert("New password must be at least 8 characters");return}if(N.newPassword!==N.confirmPassword){window.alert("New password and confirmation do not match");return}if(N.currentPassword===N.newPassword){window.alert("New password cannot be the same as current password");return}window.alert("Password updated successfully! You will be logged out for security purposes."),k(c=>({...c,currentPassword:"",newPassword:"",confirmPassword:""}))}function tp(){if(!N.authMethod){window.alert("Please select an authentication method");return}window.alert(`2FA Setup: ${N.authMethod}

A verification code has been sent to your registered ${N.authMethod==="sms"?"phone number":"email"}.
Please verify to complete 2FA setup.`)}function rp(){const c=Number(N.maxAttempts),z=Number(N.lockoutDuration);if(c<1||z<5){window.alert("Invalid values. Max attempts must be at least 1, lockout duration at least 5 minutes");return}console.log("Login attempt settings:",{maxFailed:c,lockoutMinutes:z}),window.alert(`Login attempt settings saved:
- Max Failed Attempts: ${c}
- Lockout Duration: ${z} minutes`)}function ap(){const c=Number(N.sessionTimeout),z=Number(N.inactivityWarning);if(c<5||z<1||z>=c){window.alert("Invalid timeout values. Session must be >= 5 min, warning < session timeout");return}console.log("Session timeout settings:",{sessionMinutes:c,warningMinutes:z}),window.alert(`Session timeout settings saved:
- Session Timeout: ${c} minutes
- Inactivity Warning: ${z} minutes`)}function ip(){const c=N.ipAddresses.trim().split(`
`).filter(ne=>ne.trim());if(c.length===0){window.alert("Please enter at least one IP address");return}const z=/^(\d{1,3}\.){3}\d{1,3}$/,B=c.filter(ne=>!z.test(ne.trim()));if(B.length>0){window.alert(`Invalid IP addresses: ${B.join(", ")}`);return}console.log("IP whitelist:",c),window.alert(`IP Whitelist saved:
${c.join(`
`)}`)}function sp(){const c=Number(C.vatPercent);if(c<0||c>100){window.alert("VAT percentage must be between 0 and 100");return}console.log("VAT Settings:",C),window.alert(`VAT Settings saved:
- VAT %: ${c}%
- Registration: ${C.vatRegNumber.trim()||"Not provided"}
- Apply to: ${C.vatApplyTo}`)}function lp(){if(!C.invoicePrefix.trim()){window.alert("Invoice prefix is required");return}console.log("Invoice Format:",C),window.alert(`Invoice Format saved:
Example: ${I}`)}function op(){const c=Number(C.quotationValidity);if(!C.quotationPrefix.trim()||c<1||c>365){window.alert("Please enter valid quotation settings (prefix required, validity 1-365 days)");return}console.log("Quotation Format:",C),window.alert(`Quotation Format saved:
Example: ${O}
Validity: ${c} days`)}function dp(){const c=Number(C.earlyPaymentDiscount),z=Number(C.latePaymentPenalty);if(c<0||c>50||z<0||z>50){window.alert("Discount and penalty percentages must be between 0 and 50");return}console.log("Payment Terms:",C),window.alert(`Payment Terms saved:
- Default: ${Fx[C.defaultPaymentTerms]||C.defaultPaymentTerms}
- Early Payment Discount: ${c}%
- Late Payment Penalty: ${z}%`)}function cp(){if(!C.bankName.trim()||!C.accountHolderName.trim()||!C.accountNumber.trim()||!C.iban.trim()){window.alert("Bank Name, Account Holder, Account Number, and IBAN are required");return}if(!/^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/.test(C.iban.trim())){window.alert("Please enter a valid IBAN format");return}console.log("Bank Details:",C),window.alert(`Bank Details saved:
- Bank: ${C.bankName.trim()}
- Account Holder: ${C.accountHolderName.trim()}
- IBAN: ${C.iban.trim()}`)}function up(c,z){F(B=>({...B,supportedCurrencies:z?[...B.supportedCurrencies,c]:B.supportedCurrencies.filter(ne=>ne!==c)}))}function pp(){const c=[...C.supportedCurrencies];if(c.length===0){window.alert("Please select at least one currency");return}c.includes(C.baseCurrency)||c.push(C.baseCurrency);const z=c.sort();console.log("Currency Settings:",{baseCurrency:C.baseCurrency,supportedCurrencies:z}),window.alert(`Currency Settings saved:
- Base Currency: ${C.baseCurrency}
- Supported: ${z.join(", ")}`)}function mp(){console.log("Tax Settings:",C),window.alert(`Tax Settings saved:
- Include in Price: ${C.taxInPrice?"Yes":"No"}
- Tax on Discounts: ${C.taxOnDiscounts?"Yes":"No"}
- Tax Label: ${C.taxLabel.trim()||"VAT"}`)}function fp(){if(!M.level1Approver||!M.level2Approver||!M.level3Approver){window.alert("Please select an approver for all levels");return}console.log("Approval Hierarchy:",M),window.alert(`Approval Hierarchy saved:

Level 1 (0-10K): ${Ti[M.level1Approver]}
Level 2 (10K-50K): ${Ti[M.level2Approver]}
Level 3 (50K+): ${Ti[M.level3Approver]}`)}function hp(){if(!M.defaultSalesperson){window.alert("Please select a default salesperson");return}console.log("Default Salesperson:",M),window.alert(`Default Salesperson saved:
- Salesperson: ${Mx[M.defaultSalesperson]}
- Auto-assign new clients: ${M.autoAssignToggle==="yes"?"Yes":"No"}`)}function gp(){window.alert(`Custom status creation:

You can add new status types that complement the default statuses (Pending, Approved, Rejected, On Hold).

Example custom statuses:
- In Review
- Needs Revision
- Escalated
- Conditional Approval

Feature coming soon!`)}function xp(){const c=[];M.emailOnApproved&&c.push("Approval"),M.emailOnRejected&&c.push("Rejection"),M.emailOnHold&&c.push("On Hold"),M.emailOnStatusChange&&c.push("Status Change");const z=[M.emailRecipientRequester?"Requester":null,M.emailRecipientApprover?"Approver":null,M.emailRecipientManager?"Manager":null,M.emailRecipientAdmin?"Admin":null].filter(Boolean);console.log("Auto Email Approval:",M),window.alert(`Auto Email Settings saved:

Triggers: ${c.length>0?c.join(", "):"None"}

Recipients: ${z.join(", ")}`)}function vp(){const c=Number(M.escalateAfterHours);if(c<1||c>168){window.alert("Escalation time must be between 1 and 168 hours");return}const z={next:"Next Approver in Hierarchy",manager:"Department Manager",ceo:"CEO/Admin"};console.log("Escalation Rules:",M),window.alert(`Escalation Rules saved:

Escalate after: ${c} hours
Escalate to: ${z[M.escalateToLevel]}

Notifications:
- Current Approver Reminder: ${M.escalationEmailCurrentApprover?"Yes":"No"}
- Next Approver Alert: ${M.escalationEmailNextApprover?"Yes":"No"}
- Admin Alert: ${M.escalationAdminAlert?"Yes":"No"}`)}function yp(){if(!ae())return;const c=new Date,z=`ledgerworx_backup_${c.getFullYear()}${String(c.getMonth()+1).padStart(2,"0")}${String(c.getDate()).padStart(2,"0")}_${String(c.getHours()).padStart(2,"0")}${String(c.getMinutes()).padStart(2,"0")}.sql`,B=c.toLocaleString();On({fileName:z,generatedAt:B}),window.alert(`Manual backup completed successfully.

Generated file: ${z}`)}function bp(){if(ae()){if(!P.backupTime){window.alert("Please select a valid backup time.");return}console.log("Backup schedule saved:",{frequency:P.backupFrequency,time:P.backupTime}),window.alert(`Auto backup schedule saved:
- Frequency: ${P.backupFrequency}
- Time: ${P.backupTime}`)}}function jp(){if(ae()){if(!fe){window.alert("No backup file available yet. Run a manual backup first.");return}window.alert(`Downloading: ${fe.fileName}

In production, this will stream the backup file.`)}}function wp(c){ae()&&(A(ee,"maintenanceModeToggle",c),window.alert(`Maintenance mode ${c?"enabled":"disabled"} successfully.`))}function kp(){ae()&&window.confirm("Clear system cache now? This may temporarily slow the next few requests.")&&window.alert("System cache cleared successfully.")}return t.jsxs(t.Fragment,{children:[t.jsx(tn,{adminName:"Admin"}),t.jsx("div",{className:"page",children:t.jsxs("div",{className:"card",children:[t.jsx("div",{className:"settings-menu",children:px.map(c=>t.jsxs("button",{id:c.buttonId,className:i===c.key?"active":"",type:"button",onClick:()=>{s(c.key)},children:[t.jsx("i",{className:c.iconClass})," ",c.label]},c.key))}),t.jsxs("div",{id:"company",className:`section${i==="company"?" active":""}`,children:[t.jsx("h3",{children:"Company Settings"}),t.jsx("br",{}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Company Name *"}),t.jsx("input",{id:"companyName",placeholder:"Enter company name",value:l.companyName,onChange:c=>A(o,"companyName",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Trade License Number"}),t.jsx("input",{id:"tradeLicense",placeholder:"e.g., TL-123456",value:l.tradeLicense,onChange:c=>A(o,"tradeLicense",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"VAT Number (5%)"}),t.jsx("input",{id:"vatNumber",placeholder:"e.g., 100123456700003",value:l.vatNumber,onChange:c=>A(o,"vatNumber",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Contact Email *"}),t.jsx("input",{id:"contactEmail",type:"email",placeholder:"admin@company.com",value:l.contactEmail,onChange:c=>A(o,"contactEmail",c.target.value)})]})]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Contact Phone *"}),t.jsx("input",{id:"contactPhone",placeholder:"e.g., +971-4-1234567",value:l.contactPhone,onChange:c=>A(o,"contactPhone",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Address"}),t.jsx("input",{id:"address",placeholder:"Street address",value:l.address,onChange:c=>A(o,"address",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"PO Box"}),t.jsx("input",{id:"poBox",placeholder:"e.g., P.O. Box 123456",value:l.poBox,onChange:c=>A(o,"poBox",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Currency"}),t.jsxs("select",{id:"companyCurrency",value:l.companyCurrency,onChange:c=>A(o,"companyCurrency",c.target.value),children:[t.jsx("option",{children:"AED"}),t.jsx("option",{children:"USD"}),t.jsx("option",{children:"INR"})]})]})]}),t.jsx("div",{className:"form-grid",children:t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Time Zone"}),t.jsxs("select",{id:"companyTimeZone",value:l.companyTimeZone,onChange:c=>A(o,"companyTimeZone",c.target.value),children:[t.jsx("option",{children:"Asia/Dubai"}),t.jsx("option",{children:"Asia/Kolkata"}),t.jsx("option",{children:"Europe/London"})]})]})}),t.jsxs("div",{style:{...$n,marginTop:"25px",background:"#f9f9f9"},children:[t.jsx("h4",{style:{marginBottom:"15px"},children:"Company Logo"}),t.jsxs("div",{className:"upload-box",onClick:()=>{var c;(c=r.current)==null||c.click()},children:[t.jsx("input",{ref:r,type:"file",id:"logoUpload",accept:"image/*",style:{display:"none"},onChange:Le}),t.jsx("i",{className:"fas fa-cloud-upload-alt",style:{fontSize:"32px",color:"var(--muted)"}}),t.jsx("br",{}),t.jsx("small",{style:{color:"var(--muted)"},children:"Click to upload or drag logo (PNG, JPG, SVG)"}),t.jsx("div",{id:"logoPreview",children:d?t.jsxs("div",{className:"upload-preview",children:[t.jsx("img",{src:d,alt:"Logo"}),t.jsx("button",{type:"button",className:"remove-upload",onClick:c=>{c.stopPropagation(),Me()},children:"×"})]}):null})]})]}),t.jsxs("div",{style:{...$n,marginTop:"25px",background:"#f9f9f9"},children:[t.jsx("h4",{style:{marginBottom:"15px"},children:"Company Stamp / Seal"}),t.jsxs("div",{className:"upload-box",onClick:()=>{var c;(c=a.current)==null||c.click()},children:[t.jsx("input",{ref:a,type:"file",id:"stampUpload",accept:"image/*",style:{display:"none"},onChange:_n}),t.jsx("i",{className:"fas fa-stamp",style:{fontSize:"32px",color:"var(--muted)"}}),t.jsx("br",{}),t.jsx("small",{style:{color:"var(--muted)"},children:"Click to upload company stamp (PNG, JPG)"}),t.jsx("div",{id:"stampPreview",children:m?t.jsxs("div",{className:"upload-preview",children:[t.jsx("img",{src:m,alt:"Stamp"}),t.jsx("button",{type:"button",className:"remove-upload",onClick:c=>{c.stopPropagation(),nt()},children:"×"})]}):null})]})]}),t.jsx("button",{className:"save-btn",type:"button",onClick:Vu,children:"Save Company Settings"})]}),t.jsxs("div",{id:"email",className:`section${i==="email"?" active":""}`,children:[t.jsx("h3",{children:"Email & Notification Settings"}),t.jsx("br",{}),t.jsxs("div",{className:"admin-only-banner",id:"emailAdminBanner",children:[t.jsx("i",{className:"fa fa-lock"})," ",_]}),t.jsxs("div",{style:se,children:[t.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[t.jsx("i",{className:"fa fa-server"})," SMTP Email Settings"]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"SMTP Server *"}),t.jsx("input",{id:"smtpServer",placeholder:"e.g., smtp.gmail.com",value:u.smtpServer,disabled:!n,onChange:c=>A(y,"smtpServer",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"SMTP Port *"}),t.jsx("input",{type:"number",id:"smtpPort",placeholder:"587 or 465",value:u.smtpPort,disabled:!n,onChange:c=>A(y,"smtpPort",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Email Address *"}),t.jsx("input",{type:"email",id:"smtpEmail",placeholder:"noreply@company.com",value:u.smtpEmail,disabled:!n,onChange:c=>A(y,"smtpEmail",c.target.value)})]})]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Password *"}),t.jsx("input",{type:"password",id:"smtpPassword",placeholder:"Enter SMTP password",value:u.smtpPassword,disabled:!n,onChange:c=>A(y,"smtpPassword",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Encryption"}),t.jsxs("select",{id:"smtpEncryption",value:u.smtpEncryption,disabled:!n,onChange:c=>A(y,"smtpEncryption",c.target.value),children:[t.jsx("option",{value:"tls",children:"TLS"}),t.jsx("option",{value:"ssl",children:"SSL"}),t.jsx("option",{value:"none",children:"None"})]})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Sender Name *"}),t.jsx("input",{id:"senderName",placeholder:"e.g., LedgerWorx Admin",value:u.senderName,disabled:!n,onChange:c=>A(y,"senderName",c.target.value)})]})]}),t.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},disabled:!n,onClick:Wu,children:"Save SMTP Settings"}),t.jsx("button",{className:"save-btn",type:"button",style:{marginLeft:"10px",marginTop:"10px",background:"#27ae60"},disabled:!n,onClick:qu,children:"Test Connection"})]}),t.jsxs("div",{style:se,children:[t.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[t.jsx("i",{className:"fa fa-file-alt"})," Email Templates"]}),t.jsxs("div",{style:{marginBottom:"15px"},children:[t.jsx("label",{style:{display:"block",marginBottom:"8px"},children:t.jsx("strong",{children:"Select Template to Edit:"})}),t.jsx("select",{id:"templateSelect",style:{padding:"8px",border:"1px solid #ddd",borderRadius:"6px",width:"100%"},value:u.templateType,disabled:!n,onChange:c=>Hu(c.target.value),children:vx.map(c=>t.jsx("option",{value:c.value,children:c.label},c.value||"empty"))})]}),t.jsxs("div",{id:"templateEditor",style:{display:u.templateType?"block":"none"},children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Subject Line *"}),t.jsx("input",{type:"text",id:"templateSubject",placeholder:"Email subject",value:u.templateSubject,disabled:!n,onChange:c=>A(y,"templateSubject",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Email Body *"}),t.jsx("textarea",{id:"templateBody",placeholder:`Email body content
Use {company}, {client}, {date}, {amount}, {invoice_no} as variables`,style:Lx,value:u.templateBody,disabled:!n,onChange:c=>A(y,"templateBody",c.target.value)})]}),t.jsx("div",{style:{background:"#f0f8ff",padding:"10px",borderRadius:"6px",marginTop:"10px",borderLeft:"4px solid var(--primary)"},children:t.jsxs("small",{children:[t.jsx("strong",{children:"Available Variables:"})," ","{company}, {client}, {date}, {amount}, {invoice_no}, {payment_status}, {approval_url}"]})}),t.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},disabled:!n,onClick:Qu,children:"Save Template"})]})]}),t.jsxs("div",{style:se,children:[t.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[t.jsx("i",{className:"fa fa-envelope-open"})," Auto Email Triggers"]}),t.jsxs("div",{className:"toggle-row",children:[t.jsxs("span",{children:[t.jsx("i",{className:"fa fa-file-invoice"})," Send Email on Invoice Creation"]}),t.jsxs("label",{className:"switch",children:[t.jsx("input",{type:"checkbox",id:"emailOnInvoice",checked:u.emailOnInvoice,disabled:!n,onChange:c=>A(y,"emailOnInvoice",c.target.checked)}),t.jsx("span",{className:"slider"})]})]}),t.jsxs("div",{className:"toggle-row",style:{marginTop:"10px"},children:[t.jsxs("span",{children:[t.jsx("i",{className:"fa fa-check-circle"})," Send Email on Payment Received"]}),t.jsxs("label",{className:"switch",children:[t.jsx("input",{type:"checkbox",id:"emailOnPayment",checked:u.emailOnPayment,disabled:!n,onChange:c=>A(y,"emailOnPayment",c.target.checked)}),t.jsx("span",{className:"slider"})]})]}),t.jsxs("div",{className:"toggle-row",style:{marginTop:"10px"},children:[t.jsxs("span",{children:[t.jsx("i",{className:"fa fa-user-check"})," Send Email on Approval Request"]}),t.jsxs("label",{className:"switch",children:[t.jsx("input",{type:"checkbox",id:"emailOnApproval",checked:u.emailOnApproval,disabled:!n,onChange:c=>A(y,"emailOnApproval",c.target.checked)}),t.jsx("span",{className:"slider"})]})]}),t.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"15px"},disabled:!n,onClick:Yu,children:"Save Triggers"})]}),t.jsxs("div",{style:se,children:[t.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[t.jsx("i",{className:"fab fa-whatsapp"})," WhatsApp API Integration"]}),t.jsxs("div",{className:"toggle-row",children:[t.jsx("span",{children:"Enable WhatsApp Notifications"}),t.jsxs("label",{className:"switch",children:[t.jsx("input",{type:"checkbox",id:"whatsappToggle",checked:u.whatsappEnabled,disabled:!n,onChange:c=>Ku(c.target.checked)}),t.jsx("span",{className:"slider"})]})]}),t.jsxs("div",{id:"whatsappSettings",style:{display:u.whatsappEnabled?"block":"none",marginTop:"15px"},children:[t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"WhatsApp Business Account ID *"}),t.jsx("input",{id:"whatsappAccountId",placeholder:"e.g., 1234567890",value:u.whatsappAccountId,disabled:!n,onChange:c=>A(y,"whatsappAccountId",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"WhatsApp API Key *"}),t.jsx("input",{type:"password",id:"whatsappApiKey",placeholder:"Enter API key",value:u.whatsappApiKey,disabled:!n,onChange:c=>A(y,"whatsappApiKey",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Default Phone Number *"}),t.jsx("input",{id:"whatsappPhone",placeholder:"e.g., +971501234567",value:u.whatsappPhone,disabled:!n,onChange:c=>A(y,"whatsappPhone",c.target.value)})]})]}),t.jsxs("div",{style:{marginTop:"15px"},children:[t.jsx("h5",{style:{color:"var(--primary)"},children:"WhatsApp Message Templates"}),t.jsxs("div",{className:"toggle-row",style:{marginTop:"10px"},children:[t.jsx("span",{children:"Invoice Notifications"}),t.jsxs("label",{className:"switch",children:[t.jsx("input",{type:"checkbox",id:"waInvoice",checked:u.waInvoice,disabled:!n,onChange:c=>A(y,"waInvoice",c.target.checked)}),t.jsx("span",{className:"slider"})]})]}),t.jsxs("div",{className:"toggle-row",children:[t.jsx("span",{children:"Payment Confirmations"}),t.jsxs("label",{className:"switch",children:[t.jsx("input",{type:"checkbox",id:"waPayment",checked:u.waPayment,disabled:!n,onChange:c=>A(y,"waPayment",c.target.checked)}),t.jsx("span",{className:"slider"})]})]}),t.jsxs("div",{className:"toggle-row",children:[t.jsx("span",{children:"Approval Requests"}),t.jsxs("label",{className:"switch",children:[t.jsx("input",{type:"checkbox",id:"waApproval",checked:u.waApproval,disabled:!n,onChange:c=>A(y,"waApproval",c.target.checked)}),t.jsx("span",{className:"slider"})]})]})]}),t.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"15px"},disabled:!n,onClick:Gu,children:"Save WhatsApp Settings"}),t.jsx("button",{className:"save-btn",type:"button",style:{marginLeft:"10px",marginTop:"15px",background:"#25d366"},disabled:!n,onClick:Xu,children:"Test Connection"})]})]}),t.jsxs("div",{style:$n,children:[t.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[t.jsx("i",{className:"fa fa-sms"})," SMS Integration"]}),t.jsx("div",{className:"form-grid",children:t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"SMS Provider"}),t.jsxs("select",{id:"smsProvider",value:u.smsProvider,disabled:!n,onChange:c=>Zu(c.target.value),children:[t.jsx("option",{value:"",children:"Select Provider"}),t.jsx("option",{value:"twilio",children:"Twilio"}),t.jsx("option",{value:"nexmo",children:"Vonage (Nexmo)"}),t.jsx("option",{value:"aws",children:"AWS SNS"}),t.jsx("option",{value:"custom",children:"Custom Gateway"})]})]})}),t.jsxs("div",{id:"smsSettings",style:{display:u.smsProvider?"block":"none",marginTop:"15px"},children:[t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Account SID / API Key *"}),t.jsx("input",{id:"smsAccountId",placeholder:"Enter account ID",value:u.smsAccountId,disabled:!n,onChange:c=>A(y,"smsAccountId",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Auth Token / Secret Key *"}),t.jsx("input",{type:"password",id:"smsAuthToken",placeholder:"Enter authentication token",value:u.smsAuthToken,disabled:!n,onChange:c=>A(y,"smsAuthToken",c.target.value)})]}),t.jsxs("div",{className:"field",id:"smsPhoneField",style:{display:u.smsProvider==="twilio"?"block":"none"},children:[t.jsx("label",{children:"Sender Phone Number *"}),t.jsx("input",{id:"smsSenderPhone",placeholder:"e.g., +971501234567",value:u.smsSenderPhone,disabled:!n,onChange:c=>A(y,"smsSenderPhone",c.target.value)})]})]}),t.jsxs("div",{style:{marginTop:"15px"},children:[t.jsx("h5",{style:{color:"var(--primary)"},children:"SMS Message Templates"}),t.jsxs("div",{className:"toggle-row",children:[t.jsx("span",{children:"Invoice Created"}),t.jsxs("label",{className:"switch",children:[t.jsx("input",{type:"checkbox",id:"smsInvoice",checked:u.smsInvoice,disabled:!n,onChange:c=>A(y,"smsInvoice",c.target.checked)}),t.jsx("span",{className:"slider"})]})]}),t.jsxs("div",{className:"toggle-row",children:[t.jsx("span",{children:"Payment Confirmation"}),t.jsxs("label",{className:"switch",children:[t.jsx("input",{type:"checkbox",id:"smsPayment",checked:u.smsPayment,disabled:!n,onChange:c=>A(y,"smsPayment",c.target.checked)}),t.jsx("span",{className:"slider"})]})]}),t.jsxs("div",{className:"toggle-row",children:[t.jsx("span",{children:"Approval Requests"}),t.jsxs("label",{className:"switch",children:[t.jsx("input",{type:"checkbox",id:"smsApproval",checked:u.smsApproval,disabled:!n,onChange:c=>A(y,"smsApproval",c.target.checked)}),t.jsx("span",{className:"slider"})]})]})]}),t.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"15px"},disabled:!n,onClick:Ju,children:"Save SMS Settings"}),t.jsx("button",{className:"save-btn",type:"button",style:{marginLeft:"10px",marginTop:"15px",background:"#FF6600"},disabled:!n,onClick:ep,children:"Test SMS"})]})]})]}),t.jsxs("div",{id:"security",className:`section${i==="security"?" active":""}`,children:[t.jsx("h3",{children:"Security Settings"}),t.jsx("br",{}),t.jsxs("div",{style:se,children:[t.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[t.jsx("i",{className:"fa fa-key"})," Change Password"]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Current Password *"}),t.jsx("input",{type:"password",id:"currentPassword",placeholder:"Enter current password",value:N.currentPassword,onChange:c=>A(k,"currentPassword",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"New Password *"}),t.jsx("input",{type:"password",id:"newPassword",placeholder:"Enter new password (min 8 chars)",value:N.newPassword,onChange:c=>A(k,"newPassword",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Confirm Password *"}),t.jsx("input",{type:"password",id:"confirmPassword",placeholder:"Confirm new password",value:N.confirmPassword,onChange:c=>A(k,"confirmPassword",c.target.value)})]})]}),t.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},onClick:np,children:"Update Password"})]}),t.jsxs("div",{style:se,children:[t.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[t.jsx("i",{className:"fa fa-mobile-alt"})," Two-Factor Authentication"]}),t.jsxs("div",{className:"toggle-row",children:[t.jsx("span",{children:"Enable 2FA (SMS or Authenticator App)"}),t.jsxs("label",{className:"switch",children:[t.jsx("input",{type:"checkbox",id:"twoFactorToggle",checked:N.twoFactorEnabled,onChange:c=>A(k,"twoFactorEnabled",c.target.checked)}),t.jsx("span",{className:"slider"})]})]}),t.jsxs("div",{id:"twoFactorOptions",style:{display:N.twoFactorEnabled?"block":"none",marginTop:"15px"},children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Authentication Method *"}),t.jsxs("select",{id:"authMethod",value:N.authMethod,onChange:c=>A(k,"authMethod",c.target.value),children:[t.jsx("option",{value:"",children:"Select method"}),t.jsx("option",{value:"sms",children:"SMS Code"}),t.jsx("option",{value:"authenticator",children:"Authenticator App"}),t.jsx("option",{value:"both",children:"Both (SMS + App)"})]})]}),t.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},onClick:tp,children:"Set Up 2FA"})]})]}),t.jsxs("div",{style:se,children:[t.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[t.jsx("i",{className:"fa fa-ban"})," Login Attempt Limit"]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Max Failed Login Attempts"}),t.jsx("input",{type:"number",id:"maxAttempts",min:"1",max:"20",value:N.maxAttempts,onChange:c=>A(k,"maxAttempts",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Lockout Duration (minutes)"}),t.jsx("input",{type:"number",id:"lockoutDuration",min:"5",max:"120",value:N.lockoutDuration,onChange:c=>A(k,"lockoutDuration",c.target.value)})]})]}),t.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},onClick:rp,children:"Save Settings"})]}),t.jsxs("div",{style:se,children:[t.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[t.jsx("i",{className:"fa fa-hourglass-end"})," Session Timeout"]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Session Timeout (minutes)"}),t.jsx("input",{type:"number",id:"sessionTimeout",min:"5",max:"480",value:N.sessionTimeout,onChange:c=>A(k,"sessionTimeout",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Inactivity Warning (minutes)"}),t.jsx("input",{type:"number",id:"inactivityWarning",min:"1",max:"60",value:N.inactivityWarning,onChange:c=>A(k,"inactivityWarning",c.target.value)})]})]}),t.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},onClick:ap,children:"Save Settings"})]}),t.jsxs("div",{style:se,children:[t.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[t.jsx("i",{className:"fa fa-network-wired"})," Restrict IP Address"]}),t.jsxs("div",{className:"toggle-row",children:[t.jsx("span",{children:"Enable IP Whitelisting"}),t.jsxs("label",{className:"switch",children:[t.jsx("input",{type:"checkbox",id:"ipWhitelistToggle",checked:N.ipWhitelistEnabled,onChange:c=>A(k,"ipWhitelistEnabled",c.target.checked)}),t.jsx("span",{className:"slider"})]})]}),t.jsxs("div",{id:"ipWhitelistBox",style:{display:N.ipWhitelistEnabled?"block":"none",marginTop:"15px"},children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Authorized IP Addresses (one per line)"}),t.jsx("textarea",{id:"ipAddresses",placeholder:`e.g., 192.168.1.1
10.0.0.5
203.0.113.42`,style:Ix,value:N.ipAddresses,onChange:c=>A(k,"ipAddresses",c.target.value)})]}),t.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},onClick:ip,children:"Save IP List"})]})]}),t.jsxs("div",{className:"log-panel",children:[t.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[t.jsx("i",{className:"fa fa-history"})," Login History"]}),t.jsx("div",{className:"log-table-wrap",children:t.jsxs("table",{className:"users-table",style:{fontSize:"13px"},children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Date & Time"}),t.jsx("th",{children:"IP Address"}),t.jsx("th",{children:"Browser/Device"}),t.jsx("th",{children:"Status"})]})}),t.jsx("tbody",{id:"loginHistoryBody",children:jx.map(c=>t.jsxs("tr",{children:[t.jsx("td",{children:c.dateTime}),t.jsx("td",{children:c.ipAddress}),t.jsx("td",{children:c.browser}),t.jsx("td",{children:t.jsx("span",{style:{color:c.color},children:c.status})})]},`${c.dateTime}-${c.ipAddress}-${c.browser}`))})]})})]}),t.jsxs("div",{className:"log-panel",children:[t.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[t.jsx("i",{className:"fa fa-clipboard-list"})," System Activity Logs"]}),t.jsx("div",{className:"log-table-wrap",children:t.jsxs("table",{className:"users-table",style:{fontSize:"13px"},children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Date & Time"}),t.jsx("th",{children:"User"}),t.jsx("th",{children:"Action"}),t.jsx("th",{children:"Affected Resource"}),t.jsx("th",{children:"Status"})]})}),t.jsx("tbody",{id:"activityLogsBody",children:wx.map(c=>t.jsxs("tr",{children:[t.jsx("td",{children:c.dateTime}),t.jsx("td",{children:c.user}),t.jsx("td",{children:c.action}),t.jsx("td",{children:c.resource}),t.jsx("td",{children:t.jsx("span",{style:{color:c.color},children:c.status})})]},`${c.dateTime}-${c.user}-${c.action}`))})]})})]})]}),t.jsxs("div",{id:"users",className:`section${i==="users"?" active":""}`,children:[t.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[t.jsx("h3",{children:"User Management"}),n?t.jsx("button",{id:"btnAddUser",className:"save-btn",type:"button",style:{marginTop:0},onClick:Iu,children:"+ Add New User"}):null]}),t.jsx("div",{className:"users-table-wrap",children:t.jsxs("table",{className:"users-table",children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Name"}),t.jsx("th",{children:"Email"}),t.jsx("th",{children:"Role"}),t.jsx("th",{children:"Status"}),t.jsx("th",{children:"Last Login"}),t.jsx("th",{children:"Actions"})]})}),t.jsx("tbody",{id:"usersTableBody",children:b.map(c=>t.jsxs("tr",{children:[t.jsx("td",{children:t.jsxs("div",{className:"user-info",children:[t.jsx("div",{className:"user-avatar",children:Bx(c.name)}),t.jsx("span",{children:c.name})]})}),t.jsx("td",{children:c.email}),t.jsx("td",{children:t.jsx("span",{className:`role-badge role-${c.role.toLowerCase().replace(/\s+/g,"")}`,children:c.role})}),t.jsx("td",{children:t.jsx("span",{className:c.status==="Active"?"status-active":"status-inactive",children:c.status})}),t.jsx("td",{children:c.lastLogin}),t.jsx("td",{children:t.jsxs("div",{className:"action-buttons",children:[t.jsx("button",{className:"btn-action btn-edit",type:"button",onClick:()=>Lu(c.id),children:"Edit"}),t.jsx("button",{className:"btn-action btn-status",type:"button",onClick:()=>Ou(c.id),children:c.status==="Active"?"Deactivate":"Activate"}),t.jsx("button",{className:"btn-action btn-reset",type:"button",onClick:()=>_u(c.id),children:"Reset Password"}),t.jsx("button",{className:"btn-action btn-logout",type:"button",onClick:()=>Bu(c.id),children:"Logout"}),t.jsx("button",{className:"btn-action btn-delete",type:"button",onClick:()=>Fu(c.id),children:"Delete"})]})})]},c.id))})]})})]}),t.jsxs("div",{id:"roles",className:`section${i==="roles"?" active":""}`,children:[t.jsx("h3",{children:"Roles & Permissions"}),t.jsx("br",{}),t.jsxs("div",{className:"permissions-container",children:[t.jsx("h4",{style:{marginBottom:"20px",color:"var(--primary)"},children:"Module Access Control"}),gx.map(c=>t.jsxs("div",{className:"permission-card",children:[t.jsxs("div",{className:"permission-card-header",children:[t.jsxs("h4",{children:[t.jsx("i",{className:c.iconClass})," ",c.title]}),t.jsx("span",{className:`permission-badge ${c.badgeClass}`,children:c.badgeLabel})]}),t.jsx("div",{className:"permission-grid",children:c.permissions.map(z=>t.jsxs("div",{className:"permission-checkbox",children:[t.jsx("input",{type:"checkbox",id:z.id,checked:R[c.key][z.key],onChange:B=>Uu(c.key,z.key,B.target.checked)}),t.jsx("label",{htmlFor:z.id,children:z.label})]},z.id))})]},c.key))]}),t.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"20px"},onClick:$u,children:"Save Permissions"})]}),t.jsxs("div",{id:"financial",className:`section${i==="financial"?" active":""}`,children:[t.jsx("h3",{children:"Financial Settings"}),t.jsx("br",{}),t.jsxs("div",{style:se,children:[t.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[t.jsx("i",{className:"fa fa-percent"})," VAT Settings"]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"VAT Percentage *"}),t.jsx("input",{type:"number",id:"vatPercent",min:"0",max:"100",step:"0.01",placeholder:"e.g., 5",value:C.vatPercent,onChange:c=>A(F,"vatPercent",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"VAT Registration Number"}),t.jsx("input",{id:"vatRegNumber",placeholder:"e.g., 100123456700003",value:C.vatRegNumber,onChange:c=>A(F,"vatRegNumber",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Apply VAT to"}),t.jsxs("select",{id:"vatApplyTo",value:C.vatApplyTo,onChange:c=>A(F,"vatApplyTo",c.target.value),children:[t.jsx("option",{value:"all",children:"All Transactions"}),t.jsx("option",{value:"domestic",children:"Domestic Only"}),t.jsx("option",{value:"manual",children:"Manual Selection"})]})]})]}),t.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},onClick:sp,children:"Save VAT Settings"})]}),t.jsxs("div",{style:se,children:[t.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[t.jsx("i",{className:"fa fa-receipt"})," Invoice Number Format"]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Invoice Format Prefix *"}),t.jsx("input",{id:"invoicePrefix",placeholder:"e.g., INV",value:C.invoicePrefix,onChange:c=>A(F,"invoicePrefix",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Invoice Format Year *"}),t.jsxs("select",{id:"invoiceYearFormat",value:C.invoiceYearFormat,onChange:c=>A(F,"invoiceYearFormat",c.target.value),children:[t.jsx("option",{value:"full",children:"Full Year (2026)"}),t.jsx("option",{value:"short",children:"Short Year (26)"})]})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Number of Digits *"}),t.jsxs("select",{id:"invoiceDigits",value:C.invoiceDigits,onChange:c=>A(F,"invoiceDigits",c.target.value),children:[t.jsx("option",{value:"3",children:"3 digits (001)"}),t.jsx("option",{value:"4",children:"4 digits (0001)"}),t.jsx("option",{value:"5",children:"5 digits (00001)"}),t.jsx("option",{value:"6",children:"6 digits (000001)"})]})]})]}),t.jsx("div",{style:Ai,children:t.jsxs("small",{children:[t.jsx("strong",{children:"Preview:"})," ",t.jsx("span",{id:"invoicePreview",children:I})]})}),t.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},onClick:lp,children:"Save Invoice Format"})]}),t.jsxs("div",{style:se,children:[t.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[t.jsx("i",{className:"fa fa-file-contract"})," Quotation Format"]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Quotation Prefix *"}),t.jsx("input",{id:"quotationPrefix",placeholder:"e.g., QT",value:C.quotationPrefix,onChange:c=>A(F,"quotationPrefix",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Quotation Validity (Days) *"}),t.jsx("input",{type:"number",id:"quotationValidity",min:"1",max:"365",value:C.quotationValidity,onChange:c=>A(F,"quotationValidity",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Include Terms & Conditions"}),t.jsxs("select",{id:"quotationTerms",value:C.quotationTerms,onChange:c=>A(F,"quotationTerms",c.target.value),children:[t.jsx("option",{value:"yes",children:"Yes"}),t.jsx("option",{value:"no",children:"No"})]})]})]}),t.jsx("div",{style:Ai,children:t.jsxs("small",{children:[t.jsx("strong",{children:"Preview:"})," ",t.jsx("span",{id:"quotationPreview",children:O})]})}),t.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},onClick:op,children:"Save Quotation Format"})]}),t.jsxs("div",{style:se,children:[t.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[t.jsx("i",{className:"fa fa-handshake"})," Payment Terms"]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Default Payment Terms *"}),t.jsxs("select",{id:"defaultPaymentTerms",value:C.defaultPaymentTerms,onChange:c=>A(F,"defaultPaymentTerms",c.target.value),children:[t.jsx("option",{value:"cod",children:"Cash on Delivery"}),t.jsx("option",{value:"net15",children:"Net 15 Days"}),t.jsx("option",{value:"net30",children:"Net 30 Days"}),t.jsx("option",{value:"net45",children:"Net 45 Days"}),t.jsx("option",{value:"net60",children:"Net 60 Days"}),t.jsx("option",{value:"custom",children:"Custom"})]})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Early Payment Discount % *"}),t.jsx("input",{type:"number",id:"earlyPaymentDiscount",min:"0",max:"50",step:"0.01",placeholder:"e.g., 2",value:C.earlyPaymentDiscount,onChange:c=>A(F,"earlyPaymentDiscount",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Late Payment Penalty % *"}),t.jsx("input",{type:"number",id:"latePaymentPenalty",min:"0",max:"50",step:"0.01",placeholder:"e.g., 2",value:C.latePaymentPenalty,onChange:c=>A(F,"latePaymentPenalty",c.target.value)})]})]}),t.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},onClick:dp,children:"Save Payment Terms"})]}),t.jsxs("div",{style:se,children:[t.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[t.jsx("i",{className:"fa fa-university"})," Default Bank Details"]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Bank Name *"}),t.jsx("input",{id:"bankName",placeholder:"e.g., Emirates NBD",value:C.bankName,onChange:c=>A(F,"bankName",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Account Holder Name *"}),t.jsx("input",{id:"accountHolderName",placeholder:"Company name",value:C.accountHolderName,onChange:c=>A(F,"accountHolderName",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Account Number *"}),t.jsx("input",{id:"accountNumber",placeholder:"e.g., 12345678901234",value:C.accountNumber,onChange:c=>A(F,"accountNumber",c.target.value)})]})]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"IBAN *"}),t.jsx("input",{id:"iban",placeholder:"e.g., AE070331234567890123456",value:C.iban,onChange:c=>A(F,"iban",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"SWIFT Code"}),t.jsx("input",{id:"swiftCode",placeholder:"e.g., NBADAEAD",value:C.swiftCode,onChange:c=>A(F,"swiftCode",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Branch Code"}),t.jsx("input",{id:"branchCode",placeholder:"e.g., 123",value:C.branchCode,onChange:c=>A(F,"branchCode",c.target.value)})]})]}),t.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},onClick:cp,children:"Save Bank Details"})]}),t.jsxs("div",{style:se,children:[t.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[t.jsx("i",{className:"fa fa-globe"})," Multi-Currency Options"]}),t.jsxs("div",{className:"toggle-row",children:[t.jsx("span",{children:"Enable Multi-Currency Support"}),t.jsxs("label",{className:"switch",children:[t.jsx("input",{type:"checkbox",id:"multiCurrencyToggle",checked:C.multiCurrencyEnabled,onChange:c=>A(F,"multiCurrencyEnabled",c.target.checked)}),t.jsx("span",{className:"slider"})]})]}),t.jsxs("div",{id:"currencyOptions",style:{display:C.multiCurrencyEnabled?"block":"none",marginTop:"15px"},children:[t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Base/Home Currency *"}),t.jsx("select",{id:"baseCurrency",value:C.baseCurrency,onChange:c=>A(F,"baseCurrency",c.target.value),children:rd.slice(0,6).map(c=>t.jsx("option",{value:c,children:c},c))})]}),t.jsx("div",{className:"field",children:t.jsx("label",{children:"Supported Currencies (select multiple)"})})]}),t.jsx("div",{style:zx,children:rd.map(c=>t.jsxs("label",{children:[t.jsx("input",{type:"checkbox",value:c,className:"currencyCheckbox",checked:C.supportedCurrencies.includes(c),onChange:z=>up(c,z.target.checked)})," ",c]},c))}),t.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"15px"},onClick:pp,children:"Save Currency Options"})]})]}),t.jsxs("div",{style:$n,children:[t.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[t.jsx("i",{className:"fa fa-calculator"})," Additional Tax Settings"]}),t.jsxs("div",{className:"toggle-row",children:[t.jsx("span",{children:"Include Tax in Prices"}),t.jsxs("label",{className:"switch",children:[t.jsx("input",{type:"checkbox",id:"taxInPrice",checked:C.taxInPrice,onChange:c=>A(F,"taxInPrice",c.target.checked)}),t.jsx("span",{className:"slider"})]})]}),t.jsxs("div",{className:"toggle-row",style:{marginTop:"15px"},children:[t.jsx("span",{children:"Apply Tax to Discounts"}),t.jsxs("label",{className:"switch",children:[t.jsx("input",{type:"checkbox",id:"taxOnDiscounts",checked:C.taxOnDiscounts,onChange:c=>A(F,"taxOnDiscounts",c.target.checked)}),t.jsx("span",{className:"slider"})]})]}),t.jsxs("div",{className:"form-grid",style:{marginTop:"15px"},children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Tax Registration Number"}),t.jsx("input",{id:"taxRegNumber",placeholder:"e.g., 12345678901234",value:C.taxRegNumber,onChange:c=>A(F,"taxRegNumber",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Tax Name (Label)"}),t.jsx("input",{id:"taxLabel",placeholder:"e.g., VAT, GST, TAX",value:C.taxLabel,onChange:c=>A(F,"taxLabel",c.target.value)})]})]}),t.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},onClick:mp,children:"Save Tax Settings"})]})]}),t.jsxs("div",{id:"workflow",className:`section${i==="workflow"?" active":""}`,children:[t.jsx("h3",{children:"Workflow & Approval Settings"}),t.jsx("br",{}),t.jsxs("div",{style:se,children:[t.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[t.jsx("i",{className:"fa fa-sitemap"})," Approval Hierarchy"]}),t.jsx("p",{style:{fontSize:"13px",color:"var(--muted)",marginBottom:"15px"},children:"Define the approval chain for different transaction amounts"}),t.jsxs("div",{style:{marginBottom:"15px"},children:[t.jsx("h5",{style:{color:"var(--primary)",marginBottom:"10px"},children:"Level 1 (0 - 10,000 AED)"}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Approver *"}),t.jsxs("select",{id:"level1Approver",value:M.level1Approver,onChange:c=>A($,"level1Approver",c.target.value),children:[t.jsx("option",{value:"",children:"Select user"}),t.jsx("option",{value:"1",children:"System Admin"}),t.jsx("option",{value:"2",children:"Rahul Sharma"}),t.jsx("option",{value:"3",children:"Priya Agarwal"})]})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Require Approval"}),t.jsxs("select",{id:"level1Required",value:M.level1Required,onChange:c=>A($,"level1Required",c.target.value),children:[t.jsx("option",{value:"yes",children:"Yes"}),t.jsx("option",{value:"no",children:"No"})]})]})]})]}),t.jsxs("div",{style:{marginBottom:"15px"},children:[t.jsx("h5",{style:{color:"var(--primary)",marginBottom:"10px"},children:"Level 2 (10,001 - 50,000 AED)"}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Approver *"}),t.jsxs("select",{id:"level2Approver",value:M.level2Approver,onChange:c=>A($,"level2Approver",c.target.value),children:[t.jsx("option",{value:"",children:"Select user"}),t.jsx("option",{value:"1",children:"System Admin"}),t.jsx("option",{value:"3",children:"Priya Agarwal"}),t.jsx("option",{value:"4",children:"Rohit Verma"})]})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Require Approval"}),t.jsxs("select",{id:"level2Required",value:M.level2Required,onChange:c=>A($,"level2Required",c.target.value),children:[t.jsx("option",{value:"yes",children:"Yes"}),t.jsx("option",{value:"no",children:"No"})]})]})]})]}),t.jsxs("div",{style:{marginBottom:"15px"},children:[t.jsx("h5",{style:{color:"var(--primary)",marginBottom:"10px"},children:"Level 3 (50,001+ AED)"}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Approver *"}),t.jsxs("select",{id:"level3Approver",value:M.level3Approver,onChange:c=>A($,"level3Approver",c.target.value),children:[t.jsx("option",{value:"",children:"Select user"}),t.jsx("option",{value:"1",children:"System Admin"})]})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Require Approval"}),t.jsxs("select",{id:"level3Required",value:M.level3Required,onChange:c=>A($,"level3Required",c.target.value),children:[t.jsx("option",{value:"yes",children:"Yes"}),t.jsx("option",{value:"no",children:"No"})]})]})]})]}),t.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},onClick:fp,children:"Save Hierarchy"})]}),t.jsxs("div",{style:se,children:[t.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[t.jsx("i",{className:"fa fa-user-tie"})," Default Salesperson Assignment"]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Default Salesperson *"}),t.jsxs("select",{id:"defaultSalesperson",value:M.defaultSalesperson,onChange:c=>A($,"defaultSalesperson",c.target.value),children:[t.jsx("option",{value:"",children:"Select salesperson"}),t.jsx("option",{value:"2",children:"Rahul Sharma"}),t.jsx("option",{value:"5",children:"Sales Team Lead"}),t.jsx("option",{value:"6",children:"Vikram Singh"})]})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Auto-Assign to New Clients"}),t.jsxs("select",{id:"autoAssignToggle",value:M.autoAssignToggle,onChange:c=>A($,"autoAssignToggle",c.target.value),children:[t.jsx("option",{value:"yes",children:"Yes"}),t.jsx("option",{value:"no",children:"No"})]})]})]}),t.jsx("p",{style:{fontSize:"13px",color:"var(--muted)",marginTop:"10px"},children:"If enabled, all new clients will be automatically assigned to the selected salesperson"}),t.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},onClick:hp,children:"Save Assignment"})]}),t.jsxs("div",{style:se,children:[t.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[t.jsx("i",{className:"fa fa-list"})," Status Types Configuration"]}),t.jsx("p",{style:{fontSize:"13px",color:"var(--muted)",marginBottom:"15px"},children:"Manage request and approval status types"}),t.jsx("div",{style:Tx,children:Cx.map(c=>t.jsx("div",{style:Dx,children:t.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[t.jsxs("div",{children:[t.jsx("strong",{style:{color:c.color},children:c.title}),t.jsx("br",{}),t.jsx("small",{style:{color:"var(--muted)"},children:c.description})]}),t.jsx("span",{style:{background:c.color,color:"#fff",padding:"4px 8px",borderRadius:"4px",fontSize:"11px"},children:c.statusLabel})]})},c.title))}),t.jsxs("div",{style:Ai,children:[t.jsxs("small",{children:[t.jsx("strong",{children:"Status Order:"})," Pending → Approved/Rejected/On Hold"]}),t.jsx("br",{}),t.jsx("small",{style:{color:"var(--muted)"},children:"Note: Default statuses cannot be deleted but can be customized"})]}),t.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},onClick:gp,children:"+ Add Custom Status"})]}),t.jsxs("div",{style:se,children:[t.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[t.jsx("i",{className:"fa fa-envelope-circle-check"})," Auto Email Notification"]}),t.jsxs("div",{className:"toggle-row",children:[t.jsx("span",{children:"Send Email When Request is Approved"}),t.jsxs("label",{className:"switch",children:[t.jsx("input",{type:"checkbox",id:"emailOnApproved",checked:M.emailOnApproved,onChange:c=>A($,"emailOnApproved",c.target.checked)}),t.jsx("span",{className:"slider"})]})]}),t.jsxs("div",{className:"toggle-row",style:{marginTop:"10px"},children:[t.jsx("span",{children:"Send Email When Request is Rejected"}),t.jsxs("label",{className:"switch",children:[t.jsx("input",{type:"checkbox",id:"emailOnRejected",checked:M.emailOnRejected,onChange:c=>A($,"emailOnRejected",c.target.checked)}),t.jsx("span",{className:"slider"})]})]}),t.jsxs("div",{className:"toggle-row",style:{marginTop:"10px"},children:[t.jsx("span",{children:"Send Email When Placed On Hold"}),t.jsxs("label",{className:"switch",children:[t.jsx("input",{type:"checkbox",id:"emailOnHold",checked:M.emailOnHold,onChange:c=>A($,"emailOnHold",c.target.checked)}),t.jsx("span",{className:"slider"})]})]}),t.jsxs("div",{className:"toggle-row",style:{marginTop:"10px"},children:[t.jsx("span",{children:"Send Email When Status Changes"}),t.jsxs("label",{className:"switch",children:[t.jsx("input",{type:"checkbox",id:"emailOnStatusChange",checked:M.emailOnStatusChange,onChange:c=>A($,"emailOnStatusChange",c.target.checked)}),t.jsx("span",{className:"slider"})]})]}),t.jsxs("div",{style:{marginTop:"15px"},children:[t.jsx("label",{style:{display:"block",marginBottom:"8px"},children:t.jsx("strong",{children:"Email Recipients:"})}),t.jsxs("div",{style:Rx,children:[t.jsxs("label",{children:[t.jsx("input",{type:"checkbox",id:"emailRecipientRequester",checked:M.emailRecipientRequester,onChange:c=>A($,"emailRecipientRequester",c.target.checked)})," Request Creator"]}),t.jsxs("label",{children:[t.jsx("input",{type:"checkbox",id:"emailRecipientApprover",checked:M.emailRecipientApprover,onChange:c=>A($,"emailRecipientApprover",c.target.checked)})," Approver"]}),t.jsxs("label",{children:[t.jsx("input",{type:"checkbox",id:"emailRecipientManager",checked:M.emailRecipientManager,onChange:c=>A($,"emailRecipientManager",c.target.checked)})," Manager"]}),t.jsxs("label",{children:[t.jsx("input",{type:"checkbox",id:"emailRecipientAdmin",checked:M.emailRecipientAdmin,onChange:c=>A($,"emailRecipientAdmin",c.target.checked)})," Admin"]})]})]}),t.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"15px"},onClick:xp,children:"Save Email Settings"})]}),t.jsxs("div",{style:$n,children:[t.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[t.jsx("i",{className:"fa fa-arrow-up"})," Escalation Rules"]}),t.jsx("p",{style:{fontSize:"13px",color:"var(--muted)",marginBottom:"15px"},children:"Automatically escalate pending approvals if not reviewed within specified time"}),t.jsxs("div",{className:"toggle-row",children:[t.jsx("span",{children:"Enable Automatic Escalation"}),t.jsxs("label",{className:"switch",children:[t.jsx("input",{type:"checkbox",id:"escalationToggle",checked:M.escalationToggle,onChange:c=>A($,"escalationToggle",c.target.checked)}),t.jsx("span",{className:"slider"})]})]}),t.jsxs("div",{id:"escalationRules",style:{display:M.escalationToggle?"block":"none",marginTop:"15px"},children:[t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Escalate After (Hours) *"}),t.jsx("input",{type:"number",id:"escalateAfterHours",min:"1",max:"168",value:M.escalateAfterHours,onChange:c=>A($,"escalateAfterHours",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Escalate To Level *"}),t.jsxs("select",{id:"escalateToLevel",value:M.escalateToLevel,onChange:c=>A($,"escalateToLevel",c.target.value),children:[t.jsx("option",{value:"next",children:"Next Approver in Hierarchy"}),t.jsx("option",{value:"manager",children:"Department Manager"}),t.jsx("option",{value:"ceo",children:"CEO/Admin"})]})]})]}),t.jsxs("div",{style:{marginTop:"15px"},children:[t.jsx("h5",{style:{color:"var(--primary)"},children:"Escalation Notification"}),t.jsxs("div",{className:"toggle-row",style:{marginTop:"10px"},children:[t.jsx("span",{children:"Send Reminder Email to Current Approver"}),t.jsxs("label",{className:"switch",children:[t.jsx("input",{type:"checkbox",id:"escalationEmailCurrentApprover",checked:M.escalationEmailCurrentApprover,onChange:c=>A($,"escalationEmailCurrentApprover",c.target.checked)}),t.jsx("span",{className:"slider"})]})]}),t.jsxs("div",{className:"toggle-row",children:[t.jsx("span",{children:"Send Notification to Escalated Approver"}),t.jsxs("label",{className:"switch",children:[t.jsx("input",{type:"checkbox",id:"escalationEmailNextApprover",checked:M.escalationEmailNextApprover,onChange:c=>A($,"escalationEmailNextApprover",c.target.checked)}),t.jsx("span",{className:"slider"})]})]}),t.jsxs("div",{className:"toggle-row",children:[t.jsx("span",{children:"Include in Admin Alert"}),t.jsxs("label",{className:"switch",children:[t.jsx("input",{type:"checkbox",id:"escalationAdminAlert",checked:M.escalationAdminAlert,onChange:c=>A($,"escalationAdminAlert",c.target.checked)}),t.jsx("span",{className:"slider"})]})]})]}),t.jsx("div",{style:Ax,children:t.jsxs("small",{children:[t.jsx("strong",{children:"Example:"})," If an approval is pending for 24 hours, it will be escalated to the next approver in the hierarchy"]})}),t.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"15px"},onClick:vp,children:"Save Escalation Rules"})]})]})]}),t.jsxs("div",{id:"system",className:`section${i==="system"?" active":""}`,children:[t.jsx("h3",{children:"Backup & System Settings"}),t.jsx("br",{}),t.jsxs("div",{className:"admin-only-banner",children:[t.jsx("i",{className:"fa fa-lock"})," ",H]}),t.jsxs("div",{style:$n,children:[t.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"10px"},children:[t.jsx("i",{className:"fa fa-server"})," Backup & System Controls"]}),t.jsx("p",{style:{fontSize:"13px",color:"var(--muted)",marginBottom:"15px"},children:"Manage database backups, maintenance mode, and system housekeeping."}),t.jsxs("div",{className:"system-action-grid",children:[t.jsxs("div",{className:"system-action-card",children:[t.jsxs("h5",{children:[t.jsx("i",{className:"fa fa-database"})," Manual Database Backup"]}),t.jsx("small",{children:"Create a new backup snapshot now."}),t.jsx("button",{className:"save-btn tile-action",id:"btnManualBackup",type:"button",disabled:!n,onClick:yp,children:"Run Backup Now"}),t.jsxs("div",{className:"backup-status",id:"manualBackupStatus",children:["Last backup: ",fe?fe.generatedAt:"Not available"]})]}),t.jsxs("div",{className:"system-action-card",children:[t.jsxs("h5",{children:[t.jsx("i",{className:"fa fa-clock"})," Auto Backup Schedule"]}),t.jsx("small",{children:"Configure automated backup frequency and time."}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Frequency *"}),t.jsxs("select",{id:"backupFrequency",value:P.backupFrequency,disabled:!n,onChange:c=>A(ee,"backupFrequency",c.target.value),children:[t.jsx("option",{value:"daily",children:"Daily"}),t.jsx("option",{value:"weekly",children:"Weekly"}),t.jsx("option",{value:"monthly",children:"Monthly"})]})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Backup Time *"}),t.jsx("input",{type:"time",id:"backupTime",value:P.backupTime,disabled:!n,onChange:c=>A(ee,"backupTime",c.target.value)})]})]}),t.jsx("button",{className:"save-btn tile-action",id:"btnSaveBackupSchedule",type:"button",disabled:!n,onClick:bp,children:"Save Schedule"})]}),t.jsxs("div",{className:"system-action-card",children:[t.jsxs("h5",{children:[t.jsx("i",{className:"fa fa-download"})," Download Backup"]}),t.jsx("small",{children:"Download the latest generated backup file."}),t.jsx("button",{className:"save-btn tile-action",id:"btnDownloadBackup",type:"button",style:{background:"#27ae60"},disabled:!n,onClick:jp,children:"Download Latest Backup"}),t.jsxs("div",{className:"system-info-row",id:"latestBackupFile",children:["File: ",fe?fe.fileName:"Not generated yet"]})]}),t.jsxs("div",{className:"system-action-card",children:[t.jsxs("h5",{children:[t.jsx("i",{className:"fa fa-tools"})," Maintenance Mode"]}),t.jsx("small",{children:"Temporarily restrict app access for maintenance."}),t.jsxs("div",{className:"toggle-row",style:{marginTop:0},children:[t.jsx("span",{children:"Enable Maintenance Mode"}),t.jsxs("label",{className:"switch",children:[t.jsx("input",{type:"checkbox",id:"maintenanceModeToggle",checked:P.maintenanceModeToggle,disabled:!n,onChange:c=>wp(c.target.checked)}),t.jsx("span",{className:"slider"})]})]})]}),t.jsxs("div",{className:"system-action-card",children:[t.jsxs("h5",{children:[t.jsx("i",{className:"fa fa-broom"})," Clear Cache"]}),t.jsx("small",{children:"Clear cached templates, session cache, and temp files."}),t.jsx("button",{className:"save-btn tile-action",id:"btnClearCache",type:"button",style:{background:"#e67e22"},disabled:!n,onClick:kp,children:"Clear Cache"})]}),t.jsxs("div",{className:"system-action-card",children:[t.jsxs("h5",{children:[t.jsx("i",{className:"fa fa-code-branch"})," System Version"]}),t.jsx("small",{children:"Current deployed application version."}),t.jsx("div",{style:{fontSize:"18px",fontWeight:700,color:"var(--text)"},id:"systemVersionLabel",children:P.systemVersionLabel}),t.jsxs("div",{className:"system-info-row",children:["Build date: ",P.buildDate]})]})]})]})]}),t.jsx("div",{id:"userModal",className:`modal${f?" show":""}`,onClick:c=>{c.target===c.currentTarget&&Cr()},children:t.jsxs("div",{className:"modal-content",children:[t.jsxs("div",{className:"modal-header",children:[t.jsx("h3",{id:"userModalTitle",children:E?"Edit User":"Add New User"}),t.jsx("button",{className:"modal-close",type:"button",onClick:Cr,children:"×"})]}),t.jsxs("div",{className:"modal-body",children:[t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Full Name *"}),t.jsx("input",{type:"text",id:"modalFullName",placeholder:"Enter full name",value:x.fullName,onChange:c=>A(T,"fullName",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Email *"}),t.jsx("input",{type:"email",id:"modalEmail",placeholder:"Enter email address",value:x.email,onChange:c=>A(T,"email",c.target.value)})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Role *"}),t.jsx("select",{id:"modalRole",value:x.role,onChange:c=>A(T,"role",c.target.value),children:hx.map(c=>t.jsx("option",{value:c.value,children:c.label},c.label))})]}),t.jsxs("div",{className:"field",children:[t.jsx("label",{children:"Status *"}),t.jsxs("select",{id:"modalStatus",value:x.status,onChange:c=>A(T,"status",c.target.value),children:[t.jsx("option",{value:"Active",children:"Active"}),t.jsx("option",{value:"Inactive",children:"Inactive"})]})]})]}),t.jsxs("div",{className:"modal-footer",children:[t.jsx("button",{className:"btn-secondary",type:"button",onClick:Cr,children:"Cancel"}),t.jsx("button",{className:"btn-primary",type:"button",onClick:Mu,children:"Save User"})]})]})}),t.jsx("button",{className:"save-btn",type:"button",children:"Save Settings"})]})})]})}const Wx=[{id:1,fullName:"System Administrator",email:"admin@ledgerworx.me",phone:"9988776655",department:"Admin",designation:"Administrator",status:"Active",role:"Admin",roleClass:"admin-role",lastOnline:"Online now",employeeId:"EMP-001",username:"admin",password:"Admin@123",joiningDate:"2026-02-14"},{id:2,fullName:"Rahul Sharma",email:"rahul@ledgerworx.me",phone:"9123456780",department:"Sales",designation:"Sales Executive",status:"Active",role:"Salesperson",roleClass:"sales",lastOnline:"5 min ago",employeeId:"EMP-002",username:"rahul.sharma",password:"Rahul@123",joiningDate:"2026-02-13"},{id:3,fullName:"Priya Agarwal",email:"priya@ledgerworx.me",phone:"9234567890",department:"Accounts",designation:"Accountant",status:"Active",role:"Accountant",roleClass:"accountant",lastOnline:"1 hour ago",employeeId:"EMP-003",username:"priya.agarwal",password:"Priya@123",joiningDate:"2026-02-12"},{id:4,fullName:"Rohit Verma",email:"rohit.mgr@ledgerworx.me",phone:"9345678901",department:"Management",designation:"Manager",status:"Active",role:"Manager",roleClass:"manager",lastOnline:"Yesterday",employeeId:"EMP-004",username:"rohit.verma",password:"Rohit@123",joiningDate:"2026-02-11"},{id:5,fullName:"Anand Kapoor",email:"anand.client@ledgerworx.me",phone:"9456789012",department:"Client",designation:"Client",status:"Active",role:"Client",roleClass:"client",lastOnline:"2 days ago",employeeId:"EMP-005",username:"anand.kapoor",password:"Anand@123",joiningDate:"2026-02-10"}],sd={fullName:"",employeeId:"",email:"",phone:"",department:"",designation:"",role:"",status:"",username:"",password:"",joiningDate:""},qx=["Client","Sales","Accounts","Operations","Manager"],Di=["Client","Sales","Accounts","Manager"],ld=["Client","Salesperson","Accountant","Manager","Admin"],od=["Active","Inactive"],Hx=`/* ==== KEEPING YOUR ORIGINAL CSS SAME ==== */\r
:root{\r
  --primary:#2f8f83;\r
  --secondary:#2fb7b0;\r
  --dark:#1f2f3a;\r
  --bg:#eef1f7;\r
  --card:#ffffff;\r
  --text:#2c3e50;\r
  --muted:#7f8c8d;\r
  --line:#e2ebf5;\r
  --shadow:rgba(0,0,0,0.08);\r
}\r
body.dark{\r
  --bg:#0f1720;\r
  --card:#1c2633;\r
  --text:#ecf0f1;\r
  --muted:#aab4c0;\r
}\r
*{margin:0;padding:0;box-sizing:border-box;font-family:"Segoe UI",sans-serif;}\r
body{\r
  background:radial-gradient(circle at 0% 0%, #ffffff 0%, #edf3fb 50%, #e6edf8 100%);\r
  color:var(--text);\r
  transition:.3s;\r
}\r
\r
.navbar{\r
  height:70px;\r
  background:linear-gradient(90deg,var(--dark),var(--primary));\r
  display:flex;\r
  justify-content:space-between;\r
  align-items:center;\r
  padding:0 25px;\r
  color:#fff;\r
}\r
.logo{font-weight:600;font-size:18px;}\r
.nav-logo{ height:34px; display:block; }\r
.nav-links{display:flex;gap:18px;}\r
.nav-links a{\r
  color:#ecf0f1;text-decoration:none;font-size:14px;\r
  padding:8px 12px;border-radius:6px;\r
}\r
.nav-links a:hover{background:rgba(255,255,255,.18);}\r
.nav-links a.active{background:rgba(255,255,255,.28);}\r
\r
.admin{position:relative;}\r
.admin-btn{\r
  background:rgba(255,255,255,.2);\r
  border:none;color:#fff;\r
  padding:8px 14px;border-radius:20px;\r
  cursor:pointer;font-weight:600;\r
}\r
\r
.dropdown{\r
  position:absolute;right:0;top:55px;\r
  background:var(--card);width:220px;\r
  border-radius:12px;display:none;\r
  box-shadow:0 12px 25px rgba(0,0,0,.2);\r
}\r
.dropdown.show{display:block;}\r
.dropdown-item{padding:12px 16px;cursor:pointer;}\r
.dropdown-item:hover{background:rgba(47,143,131,.15);}\r
\r
.page{padding:24px;max-width:1460px;margin:0 auto;}\r
.page-header{\r
  display:flex;justify-content:space-between;\r
  align-items:center;margin-bottom:16px;\r
}\r
.page-header h2{\r
  font-size:30px;\r
  color:#1c4268;\r
}\r
.btn{\r
  padding:8px 13px;\r
  border:1px solid transparent;\r
  border-radius:999px;\r
  cursor:pointer;\r
  font-size:12px;\r
  font-weight:700;\r
  transition:.2s ease;\r
}\r
.btn.primary,.btn.edit{\r
  background:linear-gradient(135deg,var(--primary),var(--secondary));\r
  border-color:#7fd8d2;\r
  color:#fff;\r
  box-shadow:0 8px 16px rgba(31,143,139,.24);\r
}\r
.btn.primary:hover,.btn.edit:hover{filter:brightness(1.06);}\r
.btn.activate{background:linear-gradient(135deg,#9aa8b5,#7f8f9f);border-color:#c6cfd7;color:#fff;}\r
.btn-edit{\r
  background:linear-gradient(135deg,var(--primary),var(--secondary));\r
  border-color:#7fd8d2;\r
  color:#fff;\r
  box-shadow:0 8px 14px rgba(31,143,139,.22);\r
}\r
.btn-delete{\r
  background:linear-gradient(135deg,#f06e6e,#db4e4e);\r
  border-color:#f6b6b6;\r
  color:#fff;\r
  box-shadow:0 8px 14px rgba(219,78,78,.22);\r
}\r
.btn-edit:hover,.btn-delete:hover{\r
  transform:translateY(-1px);\r
  filter:brightness(1.05);\r
}\r
\r
.card{\r
  background:linear-gradient(180deg,#ffffff,#fbfdff);\r
  border:1px solid var(--line);\r
  border-radius:16px;\r
  padding:16px;\r
  box-shadow:0 10px 22px rgba(18,38,63,.08);\r
  overflow:auto;\r
}\r
\r
table{\r
  width:100%;\r
  border-collapse:separate;\r
  border-spacing:0;\r
  min-width:1040px;\r
  border:1px solid var(--line);\r
  border-radius:12px;\r
  overflow:hidden;\r
}\r
th,td{padding:12px;border-bottom:1px solid #edf2f8;font-size:14px;}\r
th{\r
  background:#f6faff;\r
  text-align:left;\r
  color:#60758d;\r
  font-size:12px;\r
  text-transform:uppercase;\r
  letter-spacing:.45px;\r
}\r
body.dark th{background:#233041;}\r
tr:hover{background:#f8fbff;}\r
tbody tr:last-child td{border-bottom:none;}\r
\r
.user{display:flex;align-items:center;gap:10px;}\r
.user img{width:36px;height:36px;border-radius:50%;}\r
\r
.role{\r
  padding:6px 12px;\r
  border-radius:999px;\r
  color:#fff;\r
  font-size:12px;\r
  font-weight:700;\r
  border:1px solid transparent;\r
}\r
.admin-role{background:#ffe4e4;color:#9f2a2a;border-color:#ffc4c4;}\r
.sales,.salesperson{background:#e6f2ff;color:#1f5e9d;border-color:#c9e1ff;}\r
.accountant{background:#dcf7e6;color:#0f6c41;border-color:#bdeacc;}\r
.manager{background:#fff4d8;color:#8b6100;border-color:#ffe1a4;}\r
.client{background:#efe8ff;color:#5a3f9c;border-color:#d7c7ff;}\r
\r
.online{color:#27ae60;font-weight:600;}\r
\r
.modal-overlay{\r
  position:fixed;\r
  inset:0;\r
  background:rgba(18,30,46,.56);\r
  display:none;\r
  align-items:center;\r
  justify-content:center;\r
  padding:16px;\r
  z-index:1300;\r
}\r
.modal-overlay.open{\r
  display:flex;\r
}\r
.modal-card{\r
  width:min(760px,100%);\r
  max-height:90vh;\r
  overflow:auto;\r
  background:linear-gradient(180deg,#ffffff,#f8fbff);\r
  border:1px solid var(--line);\r
  border-radius:18px;\r
  box-shadow:0 24px 52px rgba(10,22,37,.24), 0 2px 0 rgba(255,255,255,.8) inset;\r
  padding:22px;\r
}\r
.modal-header{\r
  display:flex;\r
  align-items:center;\r
  justify-content:space-between;\r
  margin-bottom:14px;\r
}\r
.modal-header h3{\r
  margin:0;\r
  color:#1c4268;\r
  font-size:22px;\r
  letter-spacing:.2px;\r
}\r
.modal-close{\r
  width:34px;\r
  height:34px;\r
  border:1px solid #d2e0ef;\r
  background:#fff;\r
  font-size:22px;\r
  color:#5c7086;\r
  border-radius:10px;\r
  cursor:pointer;\r
  line-height:30px;\r
  text-align:center;\r
}\r
.modal-close:hover{background:#f1f6fd}\r
.add-user-form{\r
  display:flex;\r
  flex-direction:column;\r
  gap:10px;\r
}\r
.form-grid{\r
  display:grid;\r
  grid-template-columns:1fr 1fr;\r
  gap:10px 12px;\r
}\r
.form-row{\r
  display:flex;\r
  flex-direction:column;\r
  gap:6px;\r
}\r
.form-row label{\r
  font-size:12px;\r
  color:#4f6378;\r
  letter-spacing:.3px;\r
  font-weight:700;\r
}\r
.add-user-form input,\r
.add-user-form select,\r
input.edit-input,\r
select.dept-select,\r
select.status-select,\r
select.role-select{\r
  border:1px solid #d2e0ef !important;\r
  border-radius:12px !important;\r
  padding:10px 12px !important;\r
  background:#fff !important;\r
  min-height:40px;\r
}\r
.add-user-form input:focus,\r
.add-user-form select:focus{\r
  outline:none;\r
  border-color:#96bde9 !important;\r
  box-shadow:0 0 0 3px rgba(65,105,225,.12);\r
}\r
.form-actions{\r
  display:flex;\r
  justify-content:flex-end;\r
  gap:10px;\r
  margin-top:4px;\r
}\r
@media(max-width:900px){\r
  .page{padding:16px;}\r
  .page-header{flex-direction:column;align-items:flex-start;gap:10px;}\r
  .page-header h2{font-size:24px;}\r
  .form-grid{grid-template-columns:1fr;}\r
}\r
`,Ri={width:"120px"},Qx={width:"150px"};function dd(){return Wx.map(e=>({...e}))}function zi(e){return e==="Admin"?"admin-role":e.toLowerCase().replace(/\s+/g,"")}function Yx(e){return{fullName:e.fullName,email:e.email,phone:e.phone,department:e.department,designation:e.designation,status:e.status,role:e.role}}function Kx(){Ge({pageKey:"users-roles",pageCssText:Hx});const[e,n]=S.useState(dd),[r,a]=S.useState({}),[i,s]=S.useState(!1),[l,o]=S.useState(sd);S.useEffect(()=>{function j(x){x.key==="Escape"&&s(!1)}return document.addEventListener("keydown",j),()=>{document.removeEventListener("keydown",j)}},[]);function d(j,x){o(T=>({...T,[j]:x}))}function p(j,x,T){a(R=>({...R,[j]:{...R[j],[x]:T}}))}function m(){o(sd)}function g(){m(),s(!0)}function u(){s(!1)}function y(){m(),u()}function N(j){a(x=>x[j.id]?x:{...x,[j.id]:Yx(j)})}function k(j){const x=r[j];if(x){if(!/@ledgerworx\.me$/i.test(x.email.trim())){window.alert("Email must end with @ledgerworx.me.");return}n(T=>T.map(R=>R.id!==j?R:{...R,fullName:x.fullName.trim(),email:x.email.trim(),phone:x.phone.trim(),department:x.department,designation:x.designation.trim(),status:x.status,role:x.role,roleClass:zi(x.role)})),a(T=>{const R={...T};return delete R[j],R})}}function b(){n(dd()),a({}),s(!1),m()}function h(j,x){n(T=>T.map(R=>R.id!==j?R:x==="inactive"?{...R,status:"Inactive",lastOnline:"Deactivated"}:{...R,status:"Active",lastOnline:"Online now"}))}function f(j){window.confirm("Deactivate this user?")&&h(j,"inactive")}function v(j){window.confirm("Activate this user?")&&h(j,"active")}function E(){const j=[{key:"fullName",label:"Full Name",type:"input"},{key:"employeeId",label:"Employee ID",type:"input"},{key:"email",label:"Email",type:"input"},{key:"phone",label:"Phone Number",type:"input"},{key:"department",label:"Department",type:"select"},{key:"designation",label:"Designation",type:"input"},{key:"role",label:"Role",type:"select"},{key:"status",label:"Status",type:"select"},{key:"username",label:"Username",type:"input"},{key:"password",label:"Password",type:"input"},{key:"joiningDate",label:"Joining Date",type:"input"}];for(const x of j)if(!String(l[x.key]??"").trim()){const R=x.type==="select"?"select":"fill";window.alert(`Please ${R} ${x.label}.`);return}if(!/@ledgerworx\.me$/i.test(l.email.trim())){window.alert("Email must end with @ledgerworx.me.");return}n(x=>[...x,{id:x.length+1,fullName:l.fullName.trim(),email:l.email.trim(),phone:l.phone.trim(),department:l.department,designation:l.designation.trim(),status:l.status,role:l.role,roleClass:zi(l.role),lastOnline:l.joiningDate,employeeId:l.employeeId.trim(),username:l.username.trim(),password:l.password.trim(),joiningDate:l.joiningDate}]),m(),u()}return t.jsxs(t.Fragment,{children:[t.jsx(tn,{adminName:"Admin"}),t.jsxs("div",{className:"page",children:[t.jsxs("div",{className:"page-header",children:[t.jsx("h2",{children:"Users & Roles"}),t.jsx("button",{className:"btn primary",id:"addUserBtn",type:"button",onClick:g,children:"+ Add User"})]}),t.jsx("div",{className:`modal-overlay${i?" open":""}`,id:"addUserModal","aria-hidden":!i,onClick:j=>{j.target===j.currentTarget&&u()},children:t.jsxs("div",{className:"modal-card",role:"dialog","aria-modal":"true","aria-labelledby":"addUserModalTitle",children:[t.jsxs("div",{className:"modal-header",children:[t.jsx("h3",{id:"addUserModalTitle",children:"Add User"}),t.jsx("button",{type:"button",className:"modal-close",id:"closeAddUserModalBtn","aria-label":"Close",onClick:u,children:"×"})]}),t.jsxs("div",{className:"add-user-form",children:[t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"newFullName",children:"Full Name"}),t.jsx("input",{id:"newFullName",placeholder:"Full Name",required:!0,value:l.fullName,onChange:j=>d("fullName",j.target.value)})]}),t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"newEmployeeId",children:"Employee ID"}),t.jsx("input",{id:"newEmployeeId",placeholder:"Employee ID",required:!0,value:l.employeeId,onChange:j=>d("employeeId",j.target.value)})]})]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"newEmail",children:"Email"}),t.jsx("input",{id:"newEmail",type:"email",placeholder:"Email",pattern:"^[^\\\\s@]+@ledgerworx\\\\.me$",title:"Email must end with @ledgerworx.me",required:!0,value:l.email,onChange:j=>d("email",j.target.value)})]}),t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"newPhone",children:"Phone Number"}),t.jsx("input",{id:"newPhone",placeholder:"Phone Number",required:!0,value:l.phone,onChange:j=>d("phone",j.target.value)})]})]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"newDepartment",children:"Department"}),t.jsxs("select",{id:"newDepartment",required:!0,value:l.department,onChange:j=>d("department",j.target.value),children:[t.jsx("option",{value:"",disabled:!0,children:"Select Department"}),qx.map(j=>t.jsx("option",{children:j},j))]})]}),t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"newDesignation",children:"Designation"}),t.jsx("input",{id:"newDesignation",placeholder:"Designation",value:l.designation,onChange:j=>d("designation",j.target.value)})]})]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"newRole",children:"Role"}),t.jsxs("select",{id:"newRole",required:!0,value:l.role,onChange:j=>d("role",j.target.value),children:[t.jsx("option",{value:"",disabled:!0,children:"Select Role"}),ld.map(j=>t.jsx("option",{children:j},j))]})]}),t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"newStatus",children:"Status"}),t.jsxs("select",{id:"newStatus",required:!0,value:l.status,onChange:j=>d("status",j.target.value),children:[t.jsx("option",{value:"",disabled:!0,children:"Select Status"}),od.map(j=>t.jsx("option",{children:j},j))]})]})]}),t.jsxs("div",{className:"form-grid",children:[t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"newUsername",children:"Username"}),t.jsx("input",{id:"newUsername",placeholder:"Username",required:!0,value:l.username,onChange:j=>d("username",j.target.value)})]}),t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"newPassword",children:"Password"}),t.jsx("input",{id:"newPassword",type:"password",placeholder:"Password",required:!0,value:l.password,onChange:j=>d("password",j.target.value)})]})]}),t.jsxs("div",{className:"form-row",children:[t.jsx("label",{htmlFor:"newJoiningDate",children:"Joining Date"}),t.jsx("input",{id:"newJoiningDate",type:"date",required:!0,value:l.joiningDate,onChange:j=>d("joiningDate",j.target.value)})]}),t.jsxs("div",{className:"form-actions",children:[t.jsx("button",{type:"button",className:"btn",id:"cancelNewUser",onClick:y,children:"Cancel"}),t.jsx("button",{type:"button",className:"btn primary",id:"saveNewUser",onClick:E,children:"Save"})]})]})]})}),t.jsx("div",{className:"card",children:t.jsxs("table",{children:[t.jsx("thead",{children:t.jsxs("tr",{children:[t.jsx("th",{children:"Full Name"}),t.jsx("th",{children:"Email"}),t.jsx("th",{children:"Phone"}),t.jsx("th",{children:"Department"}),t.jsx("th",{children:"Designation"}),t.jsx("th",{children:"Status"}),t.jsx("th",{children:"Role"}),t.jsx("th",{children:"Last Online"}),t.jsx("th",{children:"Actions"})]})}),t.jsx("tbody",{children:e.map(j=>{const x=!!r[j.id],T=r[j.id],R=j.status==="Inactive"?"activate":"deactivate",w=x&&!Di.includes(T.department)?[T.department,...Di]:Di;return t.jsxs("tr",{"data-index":j.id,children:[t.jsx("td",{className:"fullname-cell",children:t.jsx("span",{className:"fullname-text",children:x?t.jsx("input",{className:"edit-input name-input",style:Ri,value:T.fullName,onChange:C=>p(j.id,"fullName",C.target.value)}):j.fullName})}),t.jsx("td",{className:"email-cell",children:t.jsx("span",{className:"email-text",children:x?t.jsx("input",{className:"edit-input email-input",type:"email",pattern:"^[^\\\\s@]+@ledgerworx\\\\.me$",title:"Email must end with @ledgerworx.me",style:Qx,value:T.email,onChange:C=>p(j.id,"email",C.target.value)}):j.email})}),t.jsx("td",{className:"phone-cell",children:t.jsx("span",{className:"phone-text",children:x?t.jsx("input",{className:"edit-input phone-input",style:Ri,value:T.phone,onChange:C=>p(j.id,"phone",C.target.value)}):j.phone})}),t.jsx("td",{className:"department-cell",children:t.jsx("span",{className:"department-text",children:x?t.jsx("select",{className:"dept-select",value:T.department,onChange:C=>p(j.id,"department",C.target.value),children:w.map(C=>t.jsx("option",{children:C},C))}):j.department})}),t.jsx("td",{className:"designation-cell",children:t.jsx("span",{className:"designation-text",children:x?t.jsx("input",{className:"edit-input desig-input",style:Ri,value:T.designation,onChange:C=>p(j.id,"designation",C.target.value)}):j.designation})}),t.jsx("td",{className:"status-cell",children:t.jsx("span",{className:"status-text",children:x?t.jsx("select",{className:"status-select",value:T.status,onChange:C=>p(j.id,"status",C.target.value),children:od.map(C=>t.jsx("option",{children:C},C))}):j.status})}),t.jsx("td",{children:t.jsx("span",{className:`role ${x?zi(T.role):j.roleClass} role-text`,children:x?t.jsx("select",{className:"role-select",value:T.role,onChange:C=>p(j.id,"role",C.target.value),children:ld.map(C=>t.jsx("option",{value:C,children:C},C))}):j.role})}),t.jsx("td",{className:`${j.lastOnline==="Online now"?"online ":""}lastonline-text`,children:j.lastOnline}),t.jsxs("td",{children:[x?t.jsx("button",{className:"btn btn-edit","data-action":"save",type:"button",onClick:()=>k(j.id),children:"Save"}):t.jsx("button",{className:"btn btn-edit","data-action":"edit",type:"button",onClick:()=>N(j),children:"Edit"}),t.jsx("button",{className:`btn ${R==="activate"?"activate":"btn-delete"}`,"data-action":R,type:"button",style:{marginLeft:"8px"},onClick:()=>{if(R==="activate"){v(j.id);return}f(j.id)},children:R==="activate"?"Activate":"Deactivate"}),t.jsx("button",{className:"btn","data-action":"cancel",type:"button",style:{display:x?"inline-block":"none",marginLeft:"8px"},onClick:b,children:"Cancel"})]})]},j.id)})})]})})]})]})}function Gx(){return t.jsx(Ru,{to:"/admin/dashboard",replace:!0})}function Xx(){return t.jsxs(qh,{children:[t.jsx(ke,{path:"/admin/dashboard",element:t.jsx(Ng,{})}),t.jsx(ke,{path:"/admin/sales",element:t.jsx(Xg,{})}),t.jsx(ke,{path:"/admin/accounts",element:t.jsx(dg,{})}),t.jsx(ke,{path:"/admin/operations",element:t.jsx(Rg,{})}),t.jsx(ke,{path:"/admin/company",element:t.jsx(hg,{})}),t.jsx(ke,{path:"/admin/services",element:t.jsx(ux,{})}),t.jsx(ke,{path:"/admin/users",element:t.jsx(Kx,{})}),t.jsx(ke,{path:"/admin/payments",element:t.jsx(Bg,{})}),t.jsx(ke,{path:"/admin/settings",element:t.jsx(Vx,{})}),t.jsx(ke,{path:"/admin/zoho",element:t.jsx(Gx,{})}),t.jsx(ke,{path:"/admin/profile",element:t.jsx(Vg,{})}),t.jsx(ke,{path:"/admin/logout",element:t.jsx(Cg,{})}),t.jsx(ke,{path:"*",element:t.jsx(Ru,{to:"/admin/dashboard",replace:!0})})]})}function Zx(e){const n=String(e).trim();return n===""||n==="/"?"/":n.replace(/\/+$/,"")}const Jx=Zx("/");Ii.createRoot(document.getElementById("root")).render(t.jsx(bd.StrictMode,{children:t.jsx(Zh,{basename:Jx,future:{v7_startTransition:!0,v7_relativeSplatPath:!0},children:t.jsx(Xx,{})})}));
