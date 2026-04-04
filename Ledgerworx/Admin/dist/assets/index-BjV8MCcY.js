function Ep(e,n){for(var t=0;t<n.length;t++){const a=n[t];if(typeof a!="string"&&!Array.isArray(a)){for(const i in a)if(i!=="default"&&!(i in e)){const s=Object.getOwnPropertyDescriptor(a,i);s&&Object.defineProperty(e,i,s.get?s:{enumerable:!0,get:()=>a[i]})}}}return Object.freeze(Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}))}(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))a(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();function Ap(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var ud={exports:{}},Ba={},pd={exports:{}},$={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var bt=Symbol.for("react.element"),Tp=Symbol.for("react.portal"),Dp=Symbol.for("react.fragment"),Rp=Symbol.for("react.strict_mode"),zp=Symbol.for("react.profiler"),Ip=Symbol.for("react.provider"),Lp=Symbol.for("react.context"),Fp=Symbol.for("react.forward_ref"),Mp=Symbol.for("react.suspense"),_p=Symbol.for("react.memo"),Op=Symbol.for("react.lazy"),Rl=Symbol.iterator;function Bp(e){return e===null||typeof e!="object"?null:(e=Rl&&e[Rl]||e["@@iterator"],typeof e=="function"?e:null)}var md={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},fd=Object.assign,hd={};function Ar(e,n,t){this.props=e,this.context=n,this.refs=hd,this.updater=t||md}Ar.prototype.isReactComponent={};Ar.prototype.setState=function(e,n){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,n,"setState")};Ar.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function gd(){}gd.prototype=Ar.prototype;function Fs(e,n,t){this.props=e,this.context=n,this.refs=hd,this.updater=t||md}var Ms=Fs.prototype=new gd;Ms.constructor=Fs;fd(Ms,Ar.prototype);Ms.isPureReactComponent=!0;var zl=Array.isArray,xd=Object.prototype.hasOwnProperty,_s={current:null},vd={key:!0,ref:!0,__self:!0,__source:!0};function yd(e,n,t){var a,i={},s=null,l=null;if(n!=null)for(a in n.ref!==void 0&&(l=n.ref),n.key!==void 0&&(s=""+n.key),n)xd.call(n,a)&&!vd.hasOwnProperty(a)&&(i[a]=n[a]);var c=arguments.length-2;if(c===1)i.children=t;else if(1<c){for(var d=Array(c),h=0;h<c;h++)d[h]=arguments[h+2];i.children=d}if(e&&e.defaultProps)for(a in c=e.defaultProps,c)i[a]===void 0&&(i[a]=c[a]);return{$$typeof:bt,type:e,key:s,ref:l,props:i,_owner:_s.current}}function Up(e,n){return{$$typeof:bt,type:e.type,key:n,ref:e.ref,props:e.props,_owner:e._owner}}function Os(e){return typeof e=="object"&&e!==null&&e.$$typeof===bt}function $p(e){var n={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(t){return n[t]})}var Il=/\/+/g;function ii(e,n){return typeof e=="object"&&e!==null&&e.key!=null?$p(""+e.key):n.toString(36)}function ea(e,n,t,a,i){var s=typeof e;(s==="undefined"||s==="boolean")&&(e=null);var l=!1;if(e===null)l=!0;else switch(s){case"string":case"number":l=!0;break;case"object":switch(e.$$typeof){case bt:case Tp:l=!0}}if(l)return l=e,i=i(l),e=a===""?"."+ii(l,0):a,zl(i)?(t="",e!=null&&(t=e.replace(Il,"$&/")+"/"),ea(i,n,t,"",function(h){return h})):i!=null&&(Os(i)&&(i=Up(i,t+(!i.key||l&&l.key===i.key?"":(""+i.key).replace(Il,"$&/")+"/")+e)),n.push(i)),1;if(l=0,a=a===""?".":a+":",zl(e))for(var c=0;c<e.length;c++){s=e[c];var d=a+ii(s,c);l+=ea(s,n,t,d,i)}else if(d=Bp(e),typeof d=="function")for(e=d.call(e),c=0;!(s=e.next()).done;)s=s.value,d=a+ii(s,c++),l+=ea(s,n,t,d,i);else if(s==="object")throw n=String(e),Error("Objects are not valid as a React child (found: "+(n==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":n)+"). If you meant to render a collection of children, use an array instead.");return l}function Rt(e,n,t){if(e==null)return e;var a=[],i=0;return ea(e,a,"","",function(s){return n.call(t,s,i++)}),a}function Vp(e){if(e._status===-1){var n=e._result;n=n(),n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t)},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t)}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var we={current:null},na={transition:null},Wp={ReactCurrentDispatcher:we,ReactCurrentBatchConfig:na,ReactCurrentOwner:_s};function bd(){throw Error("act(...) is not supported in production builds of React.")}$.Children={map:Rt,forEach:function(e,n,t){Rt(e,function(){n.apply(this,arguments)},t)},count:function(e){var n=0;return Rt(e,function(){n++}),n},toArray:function(e){return Rt(e,function(n){return n})||[]},only:function(e){if(!Os(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};$.Component=Ar;$.Fragment=Dp;$.Profiler=zp;$.PureComponent=Fs;$.StrictMode=Rp;$.Suspense=Mp;$.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=Wp;$.act=bd;$.cloneElement=function(e,n,t){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var a=fd({},e.props),i=e.key,s=e.ref,l=e._owner;if(n!=null){if(n.ref!==void 0&&(s=n.ref,l=_s.current),n.key!==void 0&&(i=""+n.key),e.type&&e.type.defaultProps)var c=e.type.defaultProps;for(d in n)xd.call(n,d)&&!vd.hasOwnProperty(d)&&(a[d]=n[d]===void 0&&c!==void 0?c[d]:n[d])}var d=arguments.length-2;if(d===1)a.children=t;else if(1<d){c=Array(d);for(var h=0;h<d;h++)c[h]=arguments[h+2];a.children=c}return{$$typeof:bt,type:e.type,key:i,ref:s,props:a,_owner:l}};$.createContext=function(e){return e={$$typeof:Lp,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:Ip,_context:e},e.Consumer=e};$.createElement=yd;$.createFactory=function(e){var n=yd.bind(null,e);return n.type=e,n};$.createRef=function(){return{current:null}};$.forwardRef=function(e){return{$$typeof:Fp,render:e}};$.isValidElement=Os;$.lazy=function(e){return{$$typeof:Op,_payload:{_status:-1,_result:e},_init:Vp}};$.memo=function(e,n){return{$$typeof:_p,type:e,compare:n===void 0?null:n}};$.startTransition=function(e){var n=na.transition;na.transition={};try{e()}finally{na.transition=n}};$.unstable_act=bd;$.useCallback=function(e,n){return we.current.useCallback(e,n)};$.useContext=function(e){return we.current.useContext(e)};$.useDebugValue=function(){};$.useDeferredValue=function(e){return we.current.useDeferredValue(e)};$.useEffect=function(e,n){return we.current.useEffect(e,n)};$.useId=function(){return we.current.useId()};$.useImperativeHandle=function(e,n,t){return we.current.useImperativeHandle(e,n,t)};$.useInsertionEffect=function(e,n){return we.current.useInsertionEffect(e,n)};$.useLayoutEffect=function(e,n){return we.current.useLayoutEffect(e,n)};$.useMemo=function(e,n){return we.current.useMemo(e,n)};$.useReducer=function(e,n,t){return we.current.useReducer(e,n,t)};$.useRef=function(e){return we.current.useRef(e)};$.useState=function(e){return we.current.useState(e)};$.useSyncExternalStore=function(e,n,t){return we.current.useSyncExternalStore(e,n,t)};$.useTransition=function(){return we.current.useTransition()};$.version="18.3.1";pd.exports=$;var k=pd.exports;const jd=Ap(k),qp=Ep({__proto__:null,default:jd},[k]);/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Hp=k,Qp=Symbol.for("react.element"),Yp=Symbol.for("react.fragment"),Kp=Object.prototype.hasOwnProperty,Gp=Hp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,Xp={key:!0,ref:!0,__self:!0,__source:!0};function wd(e,n,t){var a,i={},s=null,l=null;t!==void 0&&(s=""+t),n.key!==void 0&&(s=""+n.key),n.ref!==void 0&&(l=n.ref);for(a in n)Kp.call(n,a)&&!Xp.hasOwnProperty(a)&&(i[a]=n[a]);if(e&&e.defaultProps)for(a in n=e.defaultProps,n)i[a]===void 0&&(i[a]=n[a]);return{$$typeof:Qp,type:e,key:s,ref:l,props:i,_owner:Gp.current}}Ba.Fragment=Yp;Ba.jsx=wd;Ba.jsxs=wd;ud.exports=Ba;var r=ud.exports,Bi={},kd={exports:{}},ze={},Nd={exports:{}},Sd={};/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */(function(e){function n(F,_){var O=F.length;F.push(_);e:for(;0<O;){var H=O-1>>>1,C=F[H];if(0<i(C,_))F[H]=_,F[O]=C,O=H;else break e}}function t(F){return F.length===0?null:F[0]}function a(F){if(F.length===0)return null;var _=F[0],O=F.pop();if(O!==_){F[0]=O;e:for(var H=0,C=F.length,ae=C>>>1;H<ae;){var $e=2*(H+1)-1,gn=F[$e],Ve=$e+1,an=F[Ve];if(0>i(gn,O))Ve<C&&0>i(an,gn)?(F[H]=an,F[Ve]=O,H=Ve):(F[H]=gn,F[$e]=O,H=$e);else if(Ve<C&&0>i(an,O))F[H]=an,F[Ve]=O,H=Ve;else break e}}return _}function i(F,_){var O=F.sortIndex-_.sortIndex;return O!==0?O:F.id-_.id}if(typeof performance=="object"&&typeof performance.now=="function"){var s=performance;e.unstable_now=function(){return s.now()}}else{var l=Date,c=l.now();e.unstable_now=function(){return l.now()-c}}var d=[],h=[],f=1,x=null,p=3,y=!1,N=!1,S=!1,b=typeof setTimeout=="function"?setTimeout:null,u=typeof clearTimeout=="function"?clearTimeout:null,m=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function v(F){for(var _=t(h);_!==null;){if(_.callback===null)a(h);else if(_.startTime<=F)a(h),_.sortIndex=_.expirationTime,n(d,_);else break;_=t(h)}}function P(F){if(S=!1,v(F),!N)if(t(d)!==null)N=!0,Q(E);else{var _=t(h);_!==null&&Ue(P,_.startTime-F)}}function E(F,_){N=!1,S&&(S=!1,u(z),z=-1),y=!0;var O=p;try{for(v(_),x=t(d);x!==null&&(!(x.expirationTime>_)||F&&!I());){var H=x.callback;if(typeof H=="function"){x.callback=null,p=x.priorityLevel;var C=H(x.expirationTime<=_);_=e.unstable_now(),typeof C=="function"?x.callback=C:x===t(d)&&a(d),v(_)}else a(d);x=t(d)}if(x!==null)var ae=!0;else{var $e=t(h);$e!==null&&Ue(P,$e.startTime-_),ae=!1}return ae}finally{x=null,p=O,y=!1}}var j=!1,T=null,z=-1,g=5,w=-1;function I(){return!(e.unstable_now()-w<g)}function R(){if(T!==null){var F=e.unstable_now();w=F;var _=!0;try{_=T(!0,F)}finally{_?V():(j=!1,T=null)}}else j=!1}var V;if(typeof m=="function")V=function(){m(R)};else if(typeof MessageChannel<"u"){var U=new MessageChannel,A=U.port2;U.port1.onmessage=R,V=function(){A.postMessage(null)}}else V=function(){b(R,0)};function Q(F){T=F,j||(j=!0,V())}function Ue(F,_){z=b(function(){F(e.unstable_now())},_)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(F){F.callback=null},e.unstable_continueExecution=function(){N||y||(N=!0,Q(E))},e.unstable_forceFrameRate=function(F){0>F||125<F?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):g=0<F?Math.floor(1e3/F):5},e.unstable_getCurrentPriorityLevel=function(){return p},e.unstable_getFirstCallbackNode=function(){return t(d)},e.unstable_next=function(F){switch(p){case 1:case 2:case 3:var _=3;break;default:_=p}var O=p;p=_;try{return F()}finally{p=O}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(F,_){switch(F){case 1:case 2:case 3:case 4:case 5:break;default:F=3}var O=p;p=F;try{return _()}finally{p=O}},e.unstable_scheduleCallback=function(F,_,O){var H=e.unstable_now();switch(typeof O=="object"&&O!==null?(O=O.delay,O=typeof O=="number"&&0<O?H+O:H):O=H,F){case 1:var C=-1;break;case 2:C=250;break;case 5:C=1073741823;break;case 4:C=1e4;break;default:C=5e3}return C=O+C,F={id:f++,callback:_,priorityLevel:F,startTime:O,expirationTime:C,sortIndex:-1},O>H?(F.sortIndex=O,n(h,F),t(d)===null&&F===t(h)&&(S?(u(z),z=-1):S=!0,Ue(P,O-H))):(F.sortIndex=C,n(d,F),N||y||(N=!0,Q(E))),F},e.unstable_shouldYield=I,e.unstable_wrapCallback=function(F){var _=p;return function(){var O=p;p=_;try{return F.apply(this,arguments)}finally{p=O}}}})(Sd);Nd.exports=Sd;var Zp=Nd.exports;/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var Jp=k,Re=Zp;function D(e){for(var n="https://reactjs.org/docs/error-decoder.html?invariant="+e,t=1;t<arguments.length;t++)n+="&args[]="+encodeURIComponent(arguments[t]);return"Minified React error #"+e+"; visit "+n+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var Cd=new Set,nt={};function Jn(e,n){wr(e,n),wr(e+"Capture",n)}function wr(e,n){for(nt[e]=n,e=0;e<n.length;e++)Cd.add(n[e])}var un=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),Ui=Object.prototype.hasOwnProperty,em=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,Ll={},Fl={};function nm(e){return Ui.call(Fl,e)?!0:Ui.call(Ll,e)?!1:em.test(e)?Fl[e]=!0:(Ll[e]=!0,!1)}function rm(e,n,t,a){if(t!==null&&t.type===0)return!1;switch(typeof n){case"function":case"symbol":return!0;case"boolean":return a?!1:t!==null?!t.acceptsBooleans:(e=e.toLowerCase().slice(0,5),e!=="data-"&&e!=="aria-");default:return!1}}function tm(e,n,t,a){if(n===null||typeof n>"u"||rm(e,n,t,a))return!0;if(a)return!1;if(t!==null)switch(t.type){case 3:return!n;case 4:return n===!1;case 5:return isNaN(n);case 6:return isNaN(n)||1>n}return!1}function ke(e,n,t,a,i,s,l){this.acceptsBooleans=n===2||n===3||n===4,this.attributeName=a,this.attributeNamespace=i,this.mustUseProperty=t,this.propertyName=e,this.type=n,this.sanitizeURL=s,this.removeEmptyString=l}var fe={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e){fe[e]=new ke(e,0,!1,e,null,!1,!1)});[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(e){var n=e[0];fe[n]=new ke(n,1,!1,e[1],null,!1,!1)});["contentEditable","draggable","spellCheck","value"].forEach(function(e){fe[e]=new ke(e,2,!1,e.toLowerCase(),null,!1,!1)});["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(e){fe[e]=new ke(e,2,!1,e,null,!1,!1)});"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e){fe[e]=new ke(e,3,!1,e.toLowerCase(),null,!1,!1)});["checked","multiple","muted","selected"].forEach(function(e){fe[e]=new ke(e,3,!0,e,null,!1,!1)});["capture","download"].forEach(function(e){fe[e]=new ke(e,4,!1,e,null,!1,!1)});["cols","rows","size","span"].forEach(function(e){fe[e]=new ke(e,6,!1,e,null,!1,!1)});["rowSpan","start"].forEach(function(e){fe[e]=new ke(e,5,!1,e.toLowerCase(),null,!1,!1)});var Bs=/[\-:]([a-z])/g;function Us(e){return e[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e){var n=e.replace(Bs,Us);fe[n]=new ke(n,1,!1,e,null,!1,!1)});"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e){var n=e.replace(Bs,Us);fe[n]=new ke(n,1,!1,e,"http://www.w3.org/1999/xlink",!1,!1)});["xml:base","xml:lang","xml:space"].forEach(function(e){var n=e.replace(Bs,Us);fe[n]=new ke(n,1,!1,e,"http://www.w3.org/XML/1998/namespace",!1,!1)});["tabIndex","crossOrigin"].forEach(function(e){fe[e]=new ke(e,1,!1,e.toLowerCase(),null,!1,!1)});fe.xlinkHref=new ke("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1);["src","href","action","formAction"].forEach(function(e){fe[e]=new ke(e,1,!1,e.toLowerCase(),null,!0,!0)});function $s(e,n,t,a){var i=fe.hasOwnProperty(n)?fe[n]:null;(i!==null?i.type!==0:a||!(2<n.length)||n[0]!=="o"&&n[0]!=="O"||n[1]!=="n"&&n[1]!=="N")&&(tm(n,t,i,a)&&(t=null),a||i===null?nm(n)&&(t===null?e.removeAttribute(n):e.setAttribute(n,""+t)):i.mustUseProperty?e[i.propertyName]=t===null?i.type===3?!1:"":t:(n=i.attributeName,a=i.attributeNamespace,t===null?e.removeAttribute(n):(i=i.type,t=i===3||i===4&&t===!0?"":""+t,a?e.setAttributeNS(a,n,t):e.setAttribute(n,t))))}var hn=Jp.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,zt=Symbol.for("react.element"),tr=Symbol.for("react.portal"),ar=Symbol.for("react.fragment"),Vs=Symbol.for("react.strict_mode"),$i=Symbol.for("react.profiler"),Pd=Symbol.for("react.provider"),Ed=Symbol.for("react.context"),Ws=Symbol.for("react.forward_ref"),Vi=Symbol.for("react.suspense"),Wi=Symbol.for("react.suspense_list"),qs=Symbol.for("react.memo"),yn=Symbol.for("react.lazy"),Ad=Symbol.for("react.offscreen"),Ml=Symbol.iterator;function Ir(e){return e===null||typeof e!="object"?null:(e=Ml&&e[Ml]||e["@@iterator"],typeof e=="function"?e:null)}var ee=Object.assign,si;function $r(e){if(si===void 0)try{throw Error()}catch(t){var n=t.stack.trim().match(/\n( *(at )?)/);si=n&&n[1]||""}return`
`+si+e}var li=!1;function oi(e,n){if(!e||li)return"";li=!0;var t=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(n)if(n=function(){throw Error()},Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(n,[])}catch(h){var a=h}Reflect.construct(e,[],n)}else{try{n.call()}catch(h){a=h}e.call(n.prototype)}else{try{throw Error()}catch(h){a=h}e()}}catch(h){if(h&&a&&typeof h.stack=="string"){for(var i=h.stack.split(`
`),s=a.stack.split(`
`),l=i.length-1,c=s.length-1;1<=l&&0<=c&&i[l]!==s[c];)c--;for(;1<=l&&0<=c;l--,c--)if(i[l]!==s[c]){if(l!==1||c!==1)do if(l--,c--,0>c||i[l]!==s[c]){var d=`
`+i[l].replace(" at new "," at ");return e.displayName&&d.includes("<anonymous>")&&(d=d.replace("<anonymous>",e.displayName)),d}while(1<=l&&0<=c);break}}}finally{li=!1,Error.prepareStackTrace=t}return(e=e?e.displayName||e.name:"")?$r(e):""}function am(e){switch(e.tag){case 5:return $r(e.type);case 16:return $r("Lazy");case 13:return $r("Suspense");case 19:return $r("SuspenseList");case 0:case 2:case 15:return e=oi(e.type,!1),e;case 11:return e=oi(e.type.render,!1),e;case 1:return e=oi(e.type,!0),e;default:return""}}function qi(e){if(e==null)return null;if(typeof e=="function")return e.displayName||e.name||null;if(typeof e=="string")return e;switch(e){case ar:return"Fragment";case tr:return"Portal";case $i:return"Profiler";case Vs:return"StrictMode";case Vi:return"Suspense";case Wi:return"SuspenseList"}if(typeof e=="object")switch(e.$$typeof){case Ed:return(e.displayName||"Context")+".Consumer";case Pd:return(e._context.displayName||"Context")+".Provider";case Ws:var n=e.render;return e=e.displayName,e||(e=n.displayName||n.name||"",e=e!==""?"ForwardRef("+e+")":"ForwardRef"),e;case qs:return n=e.displayName||null,n!==null?n:qi(e.type)||"Memo";case yn:n=e._payload,e=e._init;try{return qi(e(n))}catch{}}return null}function im(e){var n=e.type;switch(e.tag){case 24:return"Cache";case 9:return(n.displayName||"Context")+".Consumer";case 10:return(n._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return e=n.render,e=e.displayName||e.name||"",n.displayName||(e!==""?"ForwardRef("+e+")":"ForwardRef");case 7:return"Fragment";case 5:return n;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return qi(n);case 8:return n===Vs?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof n=="function")return n.displayName||n.name||null;if(typeof n=="string")return n}return null}function In(e){switch(typeof e){case"boolean":case"number":case"string":case"undefined":return e;case"object":return e;default:return""}}function Td(e){var n=e.type;return(e=e.nodeName)&&e.toLowerCase()==="input"&&(n==="checkbox"||n==="radio")}function sm(e){var n=Td(e)?"checked":"value",t=Object.getOwnPropertyDescriptor(e.constructor.prototype,n),a=""+e[n];if(!e.hasOwnProperty(n)&&typeof t<"u"&&typeof t.get=="function"&&typeof t.set=="function"){var i=t.get,s=t.set;return Object.defineProperty(e,n,{configurable:!0,get:function(){return i.call(this)},set:function(l){a=""+l,s.call(this,l)}}),Object.defineProperty(e,n,{enumerable:t.enumerable}),{getValue:function(){return a},setValue:function(l){a=""+l},stopTracking:function(){e._valueTracker=null,delete e[n]}}}}function It(e){e._valueTracker||(e._valueTracker=sm(e))}function Dd(e){if(!e)return!1;var n=e._valueTracker;if(!n)return!0;var t=n.getValue(),a="";return e&&(a=Td(e)?e.checked?"true":"false":e.value),e=a,e!==t?(n.setValue(e),!0):!1}function ha(e){if(e=e||(typeof document<"u"?document:void 0),typeof e>"u")return null;try{return e.activeElement||e.body}catch{return e.body}}function Hi(e,n){var t=n.checked;return ee({},n,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:t??e._wrapperState.initialChecked})}function _l(e,n){var t=n.defaultValue==null?"":n.defaultValue,a=n.checked!=null?n.checked:n.defaultChecked;t=In(n.value!=null?n.value:t),e._wrapperState={initialChecked:a,initialValue:t,controlled:n.type==="checkbox"||n.type==="radio"?n.checked!=null:n.value!=null}}function Rd(e,n){n=n.checked,n!=null&&$s(e,"checked",n,!1)}function Qi(e,n){Rd(e,n);var t=In(n.value),a=n.type;if(t!=null)a==="number"?(t===0&&e.value===""||e.value!=t)&&(e.value=""+t):e.value!==""+t&&(e.value=""+t);else if(a==="submit"||a==="reset"){e.removeAttribute("value");return}n.hasOwnProperty("value")?Yi(e,n.type,t):n.hasOwnProperty("defaultValue")&&Yi(e,n.type,In(n.defaultValue)),n.checked==null&&n.defaultChecked!=null&&(e.defaultChecked=!!n.defaultChecked)}function Ol(e,n,t){if(n.hasOwnProperty("value")||n.hasOwnProperty("defaultValue")){var a=n.type;if(!(a!=="submit"&&a!=="reset"||n.value!==void 0&&n.value!==null))return;n=""+e._wrapperState.initialValue,t||n===e.value||(e.value=n),e.defaultValue=n}t=e.name,t!==""&&(e.name=""),e.defaultChecked=!!e._wrapperState.initialChecked,t!==""&&(e.name=t)}function Yi(e,n,t){(n!=="number"||ha(e.ownerDocument)!==e)&&(t==null?e.defaultValue=""+e._wrapperState.initialValue:e.defaultValue!==""+t&&(e.defaultValue=""+t))}var Vr=Array.isArray;function gr(e,n,t,a){if(e=e.options,n){n={};for(var i=0;i<t.length;i++)n["$"+t[i]]=!0;for(t=0;t<e.length;t++)i=n.hasOwnProperty("$"+e[t].value),e[t].selected!==i&&(e[t].selected=i),i&&a&&(e[t].defaultSelected=!0)}else{for(t=""+In(t),n=null,i=0;i<e.length;i++){if(e[i].value===t){e[i].selected=!0,a&&(e[i].defaultSelected=!0);return}n!==null||e[i].disabled||(n=e[i])}n!==null&&(n.selected=!0)}}function Ki(e,n){if(n.dangerouslySetInnerHTML!=null)throw Error(D(91));return ee({},n,{value:void 0,defaultValue:void 0,children:""+e._wrapperState.initialValue})}function Bl(e,n){var t=n.value;if(t==null){if(t=n.children,n=n.defaultValue,t!=null){if(n!=null)throw Error(D(92));if(Vr(t)){if(1<t.length)throw Error(D(93));t=t[0]}n=t}n==null&&(n=""),t=n}e._wrapperState={initialValue:In(t)}}function zd(e,n){var t=In(n.value),a=In(n.defaultValue);t!=null&&(t=""+t,t!==e.value&&(e.value=t),n.defaultValue==null&&e.defaultValue!==t&&(e.defaultValue=t)),a!=null&&(e.defaultValue=""+a)}function Ul(e){var n=e.textContent;n===e._wrapperState.initialValue&&n!==""&&n!==null&&(e.value=n)}function Id(e){switch(e){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function Gi(e,n){return e==null||e==="http://www.w3.org/1999/xhtml"?Id(n):e==="http://www.w3.org/2000/svg"&&n==="foreignObject"?"http://www.w3.org/1999/xhtml":e}var Lt,Ld=function(e){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(n,t,a,i){MSApp.execUnsafeLocalFunction(function(){return e(n,t,a,i)})}:e}(function(e,n){if(e.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in e)e.innerHTML=n;else{for(Lt=Lt||document.createElement("div"),Lt.innerHTML="<svg>"+n.valueOf().toString()+"</svg>",n=Lt.firstChild;e.firstChild;)e.removeChild(e.firstChild);for(;n.firstChild;)e.appendChild(n.firstChild)}});function rt(e,n){if(n){var t=e.firstChild;if(t&&t===e.lastChild&&t.nodeType===3){t.nodeValue=n;return}}e.textContent=n}var Hr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},lm=["Webkit","ms","Moz","O"];Object.keys(Hr).forEach(function(e){lm.forEach(function(n){n=n+e.charAt(0).toUpperCase()+e.substring(1),Hr[n]=Hr[e]})});function Fd(e,n,t){return n==null||typeof n=="boolean"||n===""?"":t||typeof n!="number"||n===0||Hr.hasOwnProperty(e)&&Hr[e]?(""+n).trim():n+"px"}function Md(e,n){e=e.style;for(var t in n)if(n.hasOwnProperty(t)){var a=t.indexOf("--")===0,i=Fd(t,n[t],a);t==="float"&&(t="cssFloat"),a?e.setProperty(t,i):e[t]=i}}var om=ee({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function Xi(e,n){if(n){if(om[e]&&(n.children!=null||n.dangerouslySetInnerHTML!=null))throw Error(D(137,e));if(n.dangerouslySetInnerHTML!=null){if(n.children!=null)throw Error(D(60));if(typeof n.dangerouslySetInnerHTML!="object"||!("__html"in n.dangerouslySetInnerHTML))throw Error(D(61))}if(n.style!=null&&typeof n.style!="object")throw Error(D(62))}}function Zi(e,n){if(e.indexOf("-")===-1)return typeof n.is=="string";switch(e){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Ji=null;function Hs(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var es=null,xr=null,vr=null;function $l(e){if(e=kt(e)){if(typeof es!="function")throw Error(D(280));var n=e.stateNode;n&&(n=qa(n),es(e.stateNode,e.type,n))}}function _d(e){xr?vr?vr.push(e):vr=[e]:xr=e}function Od(){if(xr){var e=xr,n=vr;if(vr=xr=null,$l(e),n)for(e=0;e<n.length;e++)$l(n[e])}}function Bd(e,n){return e(n)}function Ud(){}var di=!1;function $d(e,n,t){if(di)return e(n,t);di=!0;try{return Bd(e,n,t)}finally{di=!1,(xr!==null||vr!==null)&&(Ud(),Od())}}function tt(e,n){var t=e.stateNode;if(t===null)return null;var a=qa(t);if(a===null)return null;t=a[n];e:switch(n){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(a=!a.disabled)||(e=e.type,a=!(e==="button"||e==="input"||e==="select"||e==="textarea")),e=!a;break e;default:e=!1}if(e)return null;if(t&&typeof t!="function")throw Error(D(231,n,typeof t));return t}var ns=!1;if(un)try{var Lr={};Object.defineProperty(Lr,"passive",{get:function(){ns=!0}}),window.addEventListener("test",Lr,Lr),window.removeEventListener("test",Lr,Lr)}catch{ns=!1}function dm(e,n,t,a,i,s,l,c,d){var h=Array.prototype.slice.call(arguments,3);try{n.apply(t,h)}catch(f){this.onError(f)}}var Qr=!1,ga=null,xa=!1,rs=null,cm={onError:function(e){Qr=!0,ga=e}};function um(e,n,t,a,i,s,l,c,d){Qr=!1,ga=null,dm.apply(cm,arguments)}function pm(e,n,t,a,i,s,l,c,d){if(um.apply(this,arguments),Qr){if(Qr){var h=ga;Qr=!1,ga=null}else throw Error(D(198));xa||(xa=!0,rs=h)}}function er(e){var n=e,t=e;if(e.alternate)for(;n.return;)n=n.return;else{e=n;do n=e,n.flags&4098&&(t=n.return),e=n.return;while(e)}return n.tag===3?t:null}function Vd(e){if(e.tag===13){var n=e.memoizedState;if(n===null&&(e=e.alternate,e!==null&&(n=e.memoizedState)),n!==null)return n.dehydrated}return null}function Vl(e){if(er(e)!==e)throw Error(D(188))}function mm(e){var n=e.alternate;if(!n){if(n=er(e),n===null)throw Error(D(188));return n!==e?null:e}for(var t=e,a=n;;){var i=t.return;if(i===null)break;var s=i.alternate;if(s===null){if(a=i.return,a!==null){t=a;continue}break}if(i.child===s.child){for(s=i.child;s;){if(s===t)return Vl(i),e;if(s===a)return Vl(i),n;s=s.sibling}throw Error(D(188))}if(t.return!==a.return)t=i,a=s;else{for(var l=!1,c=i.child;c;){if(c===t){l=!0,t=i,a=s;break}if(c===a){l=!0,a=i,t=s;break}c=c.sibling}if(!l){for(c=s.child;c;){if(c===t){l=!0,t=s,a=i;break}if(c===a){l=!0,a=s,t=i;break}c=c.sibling}if(!l)throw Error(D(189))}}if(t.alternate!==a)throw Error(D(190))}if(t.tag!==3)throw Error(D(188));return t.stateNode.current===t?e:n}function Wd(e){return e=mm(e),e!==null?qd(e):null}function qd(e){if(e.tag===5||e.tag===6)return e;for(e=e.child;e!==null;){var n=qd(e);if(n!==null)return n;e=e.sibling}return null}var Hd=Re.unstable_scheduleCallback,Wl=Re.unstable_cancelCallback,fm=Re.unstable_shouldYield,hm=Re.unstable_requestPaint,te=Re.unstable_now,gm=Re.unstable_getCurrentPriorityLevel,Qs=Re.unstable_ImmediatePriority,Qd=Re.unstable_UserBlockingPriority,va=Re.unstable_NormalPriority,xm=Re.unstable_LowPriority,Yd=Re.unstable_IdlePriority,Ua=null,nn=null;function vm(e){if(nn&&typeof nn.onCommitFiberRoot=="function")try{nn.onCommitFiberRoot(Ua,e,void 0,(e.current.flags&128)===128)}catch{}}var Ye=Math.clz32?Math.clz32:jm,ym=Math.log,bm=Math.LN2;function jm(e){return e>>>=0,e===0?32:31-(ym(e)/bm|0)|0}var Ft=64,Mt=4194304;function Wr(e){switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return e&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return e&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return e}}function ya(e,n){var t=e.pendingLanes;if(t===0)return 0;var a=0,i=e.suspendedLanes,s=e.pingedLanes,l=t&268435455;if(l!==0){var c=l&~i;c!==0?a=Wr(c):(s&=l,s!==0&&(a=Wr(s)))}else l=t&~i,l!==0?a=Wr(l):s!==0&&(a=Wr(s));if(a===0)return 0;if(n!==0&&n!==a&&!(n&i)&&(i=a&-a,s=n&-n,i>=s||i===16&&(s&4194240)!==0))return n;if(a&4&&(a|=t&16),n=e.entangledLanes,n!==0)for(e=e.entanglements,n&=a;0<n;)t=31-Ye(n),i=1<<t,a|=e[t],n&=~i;return a}function wm(e,n){switch(e){case 1:case 2:case 4:return n+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return n+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function km(e,n){for(var t=e.suspendedLanes,a=e.pingedLanes,i=e.expirationTimes,s=e.pendingLanes;0<s;){var l=31-Ye(s),c=1<<l,d=i[l];d===-1?(!(c&t)||c&a)&&(i[l]=wm(c,n)):d<=n&&(e.expiredLanes|=c),s&=~c}}function ts(e){return e=e.pendingLanes&-1073741825,e!==0?e:e&1073741824?1073741824:0}function Kd(){var e=Ft;return Ft<<=1,!(Ft&4194240)&&(Ft=64),e}function ci(e){for(var n=[],t=0;31>t;t++)n.push(e);return n}function jt(e,n,t){e.pendingLanes|=n,n!==536870912&&(e.suspendedLanes=0,e.pingedLanes=0),e=e.eventTimes,n=31-Ye(n),e[n]=t}function Nm(e,n){var t=e.pendingLanes&~n;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.expiredLanes&=n,e.mutableReadLanes&=n,e.entangledLanes&=n,n=e.entanglements;var a=e.eventTimes;for(e=e.expirationTimes;0<t;){var i=31-Ye(t),s=1<<i;n[i]=0,a[i]=-1,e[i]=-1,t&=~s}}function Ys(e,n){var t=e.entangledLanes|=n;for(e=e.entanglements;t;){var a=31-Ye(t),i=1<<a;i&n|e[a]&n&&(e[a]|=n),t&=~i}}var q=0;function Gd(e){return e&=-e,1<e?4<e?e&268435455?16:536870912:4:1}var Xd,Ks,Zd,Jd,ec,as=!1,_t=[],Cn=null,Pn=null,En=null,at=new Map,it=new Map,jn=[],Sm="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function ql(e,n){switch(e){case"focusin":case"focusout":Cn=null;break;case"dragenter":case"dragleave":Pn=null;break;case"mouseover":case"mouseout":En=null;break;case"pointerover":case"pointerout":at.delete(n.pointerId);break;case"gotpointercapture":case"lostpointercapture":it.delete(n.pointerId)}}function Fr(e,n,t,a,i,s){return e===null||e.nativeEvent!==s?(e={blockedOn:n,domEventName:t,eventSystemFlags:a,nativeEvent:s,targetContainers:[i]},n!==null&&(n=kt(n),n!==null&&Ks(n)),e):(e.eventSystemFlags|=a,n=e.targetContainers,i!==null&&n.indexOf(i)===-1&&n.push(i),e)}function Cm(e,n,t,a,i){switch(n){case"focusin":return Cn=Fr(Cn,e,n,t,a,i),!0;case"dragenter":return Pn=Fr(Pn,e,n,t,a,i),!0;case"mouseover":return En=Fr(En,e,n,t,a,i),!0;case"pointerover":var s=i.pointerId;return at.set(s,Fr(at.get(s)||null,e,n,t,a,i)),!0;case"gotpointercapture":return s=i.pointerId,it.set(s,Fr(it.get(s)||null,e,n,t,a,i)),!0}return!1}function nc(e){var n=$n(e.target);if(n!==null){var t=er(n);if(t!==null){if(n=t.tag,n===13){if(n=Vd(t),n!==null){e.blockedOn=n,ec(e.priority,function(){Zd(t)});return}}else if(n===3&&t.stateNode.current.memoizedState.isDehydrated){e.blockedOn=t.tag===3?t.stateNode.containerInfo:null;return}}}e.blockedOn=null}function ra(e){if(e.blockedOn!==null)return!1;for(var n=e.targetContainers;0<n.length;){var t=is(e.domEventName,e.eventSystemFlags,n[0],e.nativeEvent);if(t===null){t=e.nativeEvent;var a=new t.constructor(t.type,t);Ji=a,t.target.dispatchEvent(a),Ji=null}else return n=kt(t),n!==null&&Ks(n),e.blockedOn=t,!1;n.shift()}return!0}function Hl(e,n,t){ra(e)&&t.delete(n)}function Pm(){as=!1,Cn!==null&&ra(Cn)&&(Cn=null),Pn!==null&&ra(Pn)&&(Pn=null),En!==null&&ra(En)&&(En=null),at.forEach(Hl),it.forEach(Hl)}function Mr(e,n){e.blockedOn===n&&(e.blockedOn=null,as||(as=!0,Re.unstable_scheduleCallback(Re.unstable_NormalPriority,Pm)))}function st(e){function n(i){return Mr(i,e)}if(0<_t.length){Mr(_t[0],e);for(var t=1;t<_t.length;t++){var a=_t[t];a.blockedOn===e&&(a.blockedOn=null)}}for(Cn!==null&&Mr(Cn,e),Pn!==null&&Mr(Pn,e),En!==null&&Mr(En,e),at.forEach(n),it.forEach(n),t=0;t<jn.length;t++)a=jn[t],a.blockedOn===e&&(a.blockedOn=null);for(;0<jn.length&&(t=jn[0],t.blockedOn===null);)nc(t),t.blockedOn===null&&jn.shift()}var yr=hn.ReactCurrentBatchConfig,ba=!0;function Em(e,n,t,a){var i=q,s=yr.transition;yr.transition=null;try{q=1,Gs(e,n,t,a)}finally{q=i,yr.transition=s}}function Am(e,n,t,a){var i=q,s=yr.transition;yr.transition=null;try{q=4,Gs(e,n,t,a)}finally{q=i,yr.transition=s}}function Gs(e,n,t,a){if(ba){var i=is(e,n,t,a);if(i===null)bi(e,n,a,ja,t),ql(e,a);else if(Cm(i,e,n,t,a))a.stopPropagation();else if(ql(e,a),n&4&&-1<Sm.indexOf(e)){for(;i!==null;){var s=kt(i);if(s!==null&&Xd(s),s=is(e,n,t,a),s===null&&bi(e,n,a,ja,t),s===i)break;i=s}i!==null&&a.stopPropagation()}else bi(e,n,a,null,t)}}var ja=null;function is(e,n,t,a){if(ja=null,e=Hs(a),e=$n(e),e!==null)if(n=er(e),n===null)e=null;else if(t=n.tag,t===13){if(e=Vd(n),e!==null)return e;e=null}else if(t===3){if(n.stateNode.current.memoizedState.isDehydrated)return n.tag===3?n.stateNode.containerInfo:null;e=null}else n!==e&&(e=null);return ja=e,null}function rc(e){switch(e){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(gm()){case Qs:return 1;case Qd:return 4;case va:case xm:return 16;case Yd:return 536870912;default:return 16}default:return 16}}var kn=null,Xs=null,ta=null;function tc(){if(ta)return ta;var e,n=Xs,t=n.length,a,i="value"in kn?kn.value:kn.textContent,s=i.length;for(e=0;e<t&&n[e]===i[e];e++);var l=t-e;for(a=1;a<=l&&n[t-a]===i[s-a];a++);return ta=i.slice(e,1<a?1-a:void 0)}function aa(e){var n=e.keyCode;return"charCode"in e?(e=e.charCode,e===0&&n===13&&(e=13)):e=n,e===10&&(e=13),32<=e||e===13?e:0}function Ot(){return!0}function Ql(){return!1}function Ie(e){function n(t,a,i,s,l){this._reactName=t,this._targetInst=i,this.type=a,this.nativeEvent=s,this.target=l,this.currentTarget=null;for(var c in e)e.hasOwnProperty(c)&&(t=e[c],this[c]=t?t(s):s[c]);return this.isDefaultPrevented=(s.defaultPrevented!=null?s.defaultPrevented:s.returnValue===!1)?Ot:Ql,this.isPropagationStopped=Ql,this}return ee(n.prototype,{preventDefault:function(){this.defaultPrevented=!0;var t=this.nativeEvent;t&&(t.preventDefault?t.preventDefault():typeof t.returnValue!="unknown"&&(t.returnValue=!1),this.isDefaultPrevented=Ot)},stopPropagation:function(){var t=this.nativeEvent;t&&(t.stopPropagation?t.stopPropagation():typeof t.cancelBubble!="unknown"&&(t.cancelBubble=!0),this.isPropagationStopped=Ot)},persist:function(){},isPersistent:Ot}),n}var Tr={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Zs=Ie(Tr),wt=ee({},Tr,{view:0,detail:0}),Tm=Ie(wt),ui,pi,_r,$a=ee({},wt,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:Js,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return"movementX"in e?e.movementX:(e!==_r&&(_r&&e.type==="mousemove"?(ui=e.screenX-_r.screenX,pi=e.screenY-_r.screenY):pi=ui=0,_r=e),ui)},movementY:function(e){return"movementY"in e?e.movementY:pi}}),Yl=Ie($a),Dm=ee({},$a,{dataTransfer:0}),Rm=Ie(Dm),zm=ee({},wt,{relatedTarget:0}),mi=Ie(zm),Im=ee({},Tr,{animationName:0,elapsedTime:0,pseudoElement:0}),Lm=Ie(Im),Fm=ee({},Tr,{clipboardData:function(e){return"clipboardData"in e?e.clipboardData:window.clipboardData}}),Mm=Ie(Fm),_m=ee({},Tr,{data:0}),Kl=Ie(_m),Om={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},Bm={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},Um={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function $m(e){var n=this.nativeEvent;return n.getModifierState?n.getModifierState(e):(e=Um[e])?!!n[e]:!1}function Js(){return $m}var Vm=ee({},wt,{key:function(e){if(e.key){var n=Om[e.key]||e.key;if(n!=="Unidentified")return n}return e.type==="keypress"?(e=aa(e),e===13?"Enter":String.fromCharCode(e)):e.type==="keydown"||e.type==="keyup"?Bm[e.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:Js,charCode:function(e){return e.type==="keypress"?aa(e):0},keyCode:function(e){return e.type==="keydown"||e.type==="keyup"?e.keyCode:0},which:function(e){return e.type==="keypress"?aa(e):e.type==="keydown"||e.type==="keyup"?e.keyCode:0}}),Wm=Ie(Vm),qm=ee({},$a,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Gl=Ie(qm),Hm=ee({},wt,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:Js}),Qm=Ie(Hm),Ym=ee({},Tr,{propertyName:0,elapsedTime:0,pseudoElement:0}),Km=Ie(Ym),Gm=ee({},$a,{deltaX:function(e){return"deltaX"in e?e.deltaX:"wheelDeltaX"in e?-e.wheelDeltaX:0},deltaY:function(e){return"deltaY"in e?e.deltaY:"wheelDeltaY"in e?-e.wheelDeltaY:"wheelDelta"in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0}),Xm=Ie(Gm),Zm=[9,13,27,32],el=un&&"CompositionEvent"in window,Yr=null;un&&"documentMode"in document&&(Yr=document.documentMode);var Jm=un&&"TextEvent"in window&&!Yr,ac=un&&(!el||Yr&&8<Yr&&11>=Yr),Xl=" ",Zl=!1;function ic(e,n){switch(e){case"keyup":return Zm.indexOf(n.keyCode)!==-1;case"keydown":return n.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function sc(e){return e=e.detail,typeof e=="object"&&"data"in e?e.data:null}var ir=!1;function ef(e,n){switch(e){case"compositionend":return sc(n);case"keypress":return n.which!==32?null:(Zl=!0,Xl);case"textInput":return e=n.data,e===Xl&&Zl?null:e;default:return null}}function nf(e,n){if(ir)return e==="compositionend"||!el&&ic(e,n)?(e=tc(),ta=Xs=kn=null,ir=!1,e):null;switch(e){case"paste":return null;case"keypress":if(!(n.ctrlKey||n.altKey||n.metaKey)||n.ctrlKey&&n.altKey){if(n.char&&1<n.char.length)return n.char;if(n.which)return String.fromCharCode(n.which)}return null;case"compositionend":return ac&&n.locale!=="ko"?null:n.data;default:return null}}var rf={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Jl(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n==="input"?!!rf[e.type]:n==="textarea"}function lc(e,n,t,a){_d(a),n=wa(n,"onChange"),0<n.length&&(t=new Zs("onChange","change",null,t,a),e.push({event:t,listeners:n}))}var Kr=null,lt=null;function tf(e){vc(e,0)}function Va(e){var n=or(e);if(Dd(n))return e}function af(e,n){if(e==="change")return n}var oc=!1;if(un){var fi;if(un){var hi="oninput"in document;if(!hi){var eo=document.createElement("div");eo.setAttribute("oninput","return;"),hi=typeof eo.oninput=="function"}fi=hi}else fi=!1;oc=fi&&(!document.documentMode||9<document.documentMode)}function no(){Kr&&(Kr.detachEvent("onpropertychange",dc),lt=Kr=null)}function dc(e){if(e.propertyName==="value"&&Va(lt)){var n=[];lc(n,lt,e,Hs(e)),$d(tf,n)}}function sf(e,n,t){e==="focusin"?(no(),Kr=n,lt=t,Kr.attachEvent("onpropertychange",dc)):e==="focusout"&&no()}function lf(e){if(e==="selectionchange"||e==="keyup"||e==="keydown")return Va(lt)}function of(e,n){if(e==="click")return Va(n)}function df(e,n){if(e==="input"||e==="change")return Va(n)}function cf(e,n){return e===n&&(e!==0||1/e===1/n)||e!==e&&n!==n}var Ge=typeof Object.is=="function"?Object.is:cf;function ot(e,n){if(Ge(e,n))return!0;if(typeof e!="object"||e===null||typeof n!="object"||n===null)return!1;var t=Object.keys(e),a=Object.keys(n);if(t.length!==a.length)return!1;for(a=0;a<t.length;a++){var i=t[a];if(!Ui.call(n,i)||!Ge(e[i],n[i]))return!1}return!0}function ro(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function to(e,n){var t=ro(e);e=0;for(var a;t;){if(t.nodeType===3){if(a=e+t.textContent.length,e<=n&&a>=n)return{node:t,offset:n-e};e=a}e:{for(;t;){if(t.nextSibling){t=t.nextSibling;break e}t=t.parentNode}t=void 0}t=ro(t)}}function cc(e,n){return e&&n?e===n?!0:e&&e.nodeType===3?!1:n&&n.nodeType===3?cc(e,n.parentNode):"contains"in e?e.contains(n):e.compareDocumentPosition?!!(e.compareDocumentPosition(n)&16):!1:!1}function uc(){for(var e=window,n=ha();n instanceof e.HTMLIFrameElement;){try{var t=typeof n.contentWindow.location.href=="string"}catch{t=!1}if(t)e=n.contentWindow;else break;n=ha(e.document)}return n}function nl(e){var n=e&&e.nodeName&&e.nodeName.toLowerCase();return n&&(n==="input"&&(e.type==="text"||e.type==="search"||e.type==="tel"||e.type==="url"||e.type==="password")||n==="textarea"||e.contentEditable==="true")}function uf(e){var n=uc(),t=e.focusedElem,a=e.selectionRange;if(n!==t&&t&&t.ownerDocument&&cc(t.ownerDocument.documentElement,t)){if(a!==null&&nl(t)){if(n=a.start,e=a.end,e===void 0&&(e=n),"selectionStart"in t)t.selectionStart=n,t.selectionEnd=Math.min(e,t.value.length);else if(e=(n=t.ownerDocument||document)&&n.defaultView||window,e.getSelection){e=e.getSelection();var i=t.textContent.length,s=Math.min(a.start,i);a=a.end===void 0?s:Math.min(a.end,i),!e.extend&&s>a&&(i=a,a=s,s=i),i=to(t,s);var l=to(t,a);i&&l&&(e.rangeCount!==1||e.anchorNode!==i.node||e.anchorOffset!==i.offset||e.focusNode!==l.node||e.focusOffset!==l.offset)&&(n=n.createRange(),n.setStart(i.node,i.offset),e.removeAllRanges(),s>a?(e.addRange(n),e.extend(l.node,l.offset)):(n.setEnd(l.node,l.offset),e.addRange(n)))}}for(n=[],e=t;e=e.parentNode;)e.nodeType===1&&n.push({element:e,left:e.scrollLeft,top:e.scrollTop});for(typeof t.focus=="function"&&t.focus(),t=0;t<n.length;t++)e=n[t],e.element.scrollLeft=e.left,e.element.scrollTop=e.top}}var pf=un&&"documentMode"in document&&11>=document.documentMode,sr=null,ss=null,Gr=null,ls=!1;function ao(e,n,t){var a=t.window===t?t.document:t.nodeType===9?t:t.ownerDocument;ls||sr==null||sr!==ha(a)||(a=sr,"selectionStart"in a&&nl(a)?a={start:a.selectionStart,end:a.selectionEnd}:(a=(a.ownerDocument&&a.ownerDocument.defaultView||window).getSelection(),a={anchorNode:a.anchorNode,anchorOffset:a.anchorOffset,focusNode:a.focusNode,focusOffset:a.focusOffset}),Gr&&ot(Gr,a)||(Gr=a,a=wa(ss,"onSelect"),0<a.length&&(n=new Zs("onSelect","select",null,n,t),e.push({event:n,listeners:a}),n.target=sr)))}function Bt(e,n){var t={};return t[e.toLowerCase()]=n.toLowerCase(),t["Webkit"+e]="webkit"+n,t["Moz"+e]="moz"+n,t}var lr={animationend:Bt("Animation","AnimationEnd"),animationiteration:Bt("Animation","AnimationIteration"),animationstart:Bt("Animation","AnimationStart"),transitionend:Bt("Transition","TransitionEnd")},gi={},pc={};un&&(pc=document.createElement("div").style,"AnimationEvent"in window||(delete lr.animationend.animation,delete lr.animationiteration.animation,delete lr.animationstart.animation),"TransitionEvent"in window||delete lr.transitionend.transition);function Wa(e){if(gi[e])return gi[e];if(!lr[e])return e;var n=lr[e],t;for(t in n)if(n.hasOwnProperty(t)&&t in pc)return gi[e]=n[t];return e}var mc=Wa("animationend"),fc=Wa("animationiteration"),hc=Wa("animationstart"),gc=Wa("transitionend"),xc=new Map,io="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function Fn(e,n){xc.set(e,n),Jn(n,[e])}for(var xi=0;xi<io.length;xi++){var vi=io[xi],mf=vi.toLowerCase(),ff=vi[0].toUpperCase()+vi.slice(1);Fn(mf,"on"+ff)}Fn(mc,"onAnimationEnd");Fn(fc,"onAnimationIteration");Fn(hc,"onAnimationStart");Fn("dblclick","onDoubleClick");Fn("focusin","onFocus");Fn("focusout","onBlur");Fn(gc,"onTransitionEnd");wr("onMouseEnter",["mouseout","mouseover"]);wr("onMouseLeave",["mouseout","mouseover"]);wr("onPointerEnter",["pointerout","pointerover"]);wr("onPointerLeave",["pointerout","pointerover"]);Jn("onChange","change click focusin focusout input keydown keyup selectionchange".split(" "));Jn("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));Jn("onBeforeInput",["compositionend","keypress","textInput","paste"]);Jn("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" "));Jn("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" "));Jn("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var qr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),hf=new Set("cancel close invalid load scroll toggle".split(" ").concat(qr));function so(e,n,t){var a=e.type||"unknown-event";e.currentTarget=t,pm(a,n,void 0,e),e.currentTarget=null}function vc(e,n){n=(n&4)!==0;for(var t=0;t<e.length;t++){var a=e[t],i=a.event;a=a.listeners;e:{var s=void 0;if(n)for(var l=a.length-1;0<=l;l--){var c=a[l],d=c.instance,h=c.currentTarget;if(c=c.listener,d!==s&&i.isPropagationStopped())break e;so(i,c,h),s=d}else for(l=0;l<a.length;l++){if(c=a[l],d=c.instance,h=c.currentTarget,c=c.listener,d!==s&&i.isPropagationStopped())break e;so(i,c,h),s=d}}}if(xa)throw e=rs,xa=!1,rs=null,e}function K(e,n){var t=n[ps];t===void 0&&(t=n[ps]=new Set);var a=e+"__bubble";t.has(a)||(yc(n,e,2,!1),t.add(a))}function yi(e,n,t){var a=0;n&&(a|=4),yc(t,e,a,n)}var Ut="_reactListening"+Math.random().toString(36).slice(2);function dt(e){if(!e[Ut]){e[Ut]=!0,Cd.forEach(function(t){t!=="selectionchange"&&(hf.has(t)||yi(t,!1,e),yi(t,!0,e))});var n=e.nodeType===9?e:e.ownerDocument;n===null||n[Ut]||(n[Ut]=!0,yi("selectionchange",!1,n))}}function yc(e,n,t,a){switch(rc(n)){case 1:var i=Em;break;case 4:i=Am;break;default:i=Gs}t=i.bind(null,n,t,e),i=void 0,!ns||n!=="touchstart"&&n!=="touchmove"&&n!=="wheel"||(i=!0),a?i!==void 0?e.addEventListener(n,t,{capture:!0,passive:i}):e.addEventListener(n,t,!0):i!==void 0?e.addEventListener(n,t,{passive:i}):e.addEventListener(n,t,!1)}function bi(e,n,t,a,i){var s=a;if(!(n&1)&&!(n&2)&&a!==null)e:for(;;){if(a===null)return;var l=a.tag;if(l===3||l===4){var c=a.stateNode.containerInfo;if(c===i||c.nodeType===8&&c.parentNode===i)break;if(l===4)for(l=a.return;l!==null;){var d=l.tag;if((d===3||d===4)&&(d=l.stateNode.containerInfo,d===i||d.nodeType===8&&d.parentNode===i))return;l=l.return}for(;c!==null;){if(l=$n(c),l===null)return;if(d=l.tag,d===5||d===6){a=s=l;continue e}c=c.parentNode}}a=a.return}$d(function(){var h=s,f=Hs(t),x=[];e:{var p=xc.get(e);if(p!==void 0){var y=Zs,N=e;switch(e){case"keypress":if(aa(t)===0)break e;case"keydown":case"keyup":y=Wm;break;case"focusin":N="focus",y=mi;break;case"focusout":N="blur",y=mi;break;case"beforeblur":case"afterblur":y=mi;break;case"click":if(t.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":y=Yl;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":y=Rm;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":y=Qm;break;case mc:case fc:case hc:y=Lm;break;case gc:y=Km;break;case"scroll":y=Tm;break;case"wheel":y=Xm;break;case"copy":case"cut":case"paste":y=Mm;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":y=Gl}var S=(n&4)!==0,b=!S&&e==="scroll",u=S?p!==null?p+"Capture":null:p;S=[];for(var m=h,v;m!==null;){v=m;var P=v.stateNode;if(v.tag===5&&P!==null&&(v=P,u!==null&&(P=tt(m,u),P!=null&&S.push(ct(m,P,v)))),b)break;m=m.return}0<S.length&&(p=new y(p,N,null,t,f),x.push({event:p,listeners:S}))}}if(!(n&7)){e:{if(p=e==="mouseover"||e==="pointerover",y=e==="mouseout"||e==="pointerout",p&&t!==Ji&&(N=t.relatedTarget||t.fromElement)&&($n(N)||N[pn]))break e;if((y||p)&&(p=f.window===f?f:(p=f.ownerDocument)?p.defaultView||p.parentWindow:window,y?(N=t.relatedTarget||t.toElement,y=h,N=N?$n(N):null,N!==null&&(b=er(N),N!==b||N.tag!==5&&N.tag!==6)&&(N=null)):(y=null,N=h),y!==N)){if(S=Yl,P="onMouseLeave",u="onMouseEnter",m="mouse",(e==="pointerout"||e==="pointerover")&&(S=Gl,P="onPointerLeave",u="onPointerEnter",m="pointer"),b=y==null?p:or(y),v=N==null?p:or(N),p=new S(P,m+"leave",y,t,f),p.target=b,p.relatedTarget=v,P=null,$n(f)===h&&(S=new S(u,m+"enter",N,t,f),S.target=v,S.relatedTarget=b,P=S),b=P,y&&N)n:{for(S=y,u=N,m=0,v=S;v;v=rr(v))m++;for(v=0,P=u;P;P=rr(P))v++;for(;0<m-v;)S=rr(S),m--;for(;0<v-m;)u=rr(u),v--;for(;m--;){if(S===u||u!==null&&S===u.alternate)break n;S=rr(S),u=rr(u)}S=null}else S=null;y!==null&&lo(x,p,y,S,!1),N!==null&&b!==null&&lo(x,b,N,S,!0)}}e:{if(p=h?or(h):window,y=p.nodeName&&p.nodeName.toLowerCase(),y==="select"||y==="input"&&p.type==="file")var E=af;else if(Jl(p))if(oc)E=df;else{E=lf;var j=sf}else(y=p.nodeName)&&y.toLowerCase()==="input"&&(p.type==="checkbox"||p.type==="radio")&&(E=of);if(E&&(E=E(e,h))){lc(x,E,t,f);break e}j&&j(e,p,h),e==="focusout"&&(j=p._wrapperState)&&j.controlled&&p.type==="number"&&Yi(p,"number",p.value)}switch(j=h?or(h):window,e){case"focusin":(Jl(j)||j.contentEditable==="true")&&(sr=j,ss=h,Gr=null);break;case"focusout":Gr=ss=sr=null;break;case"mousedown":ls=!0;break;case"contextmenu":case"mouseup":case"dragend":ls=!1,ao(x,t,f);break;case"selectionchange":if(pf)break;case"keydown":case"keyup":ao(x,t,f)}var T;if(el)e:{switch(e){case"compositionstart":var z="onCompositionStart";break e;case"compositionend":z="onCompositionEnd";break e;case"compositionupdate":z="onCompositionUpdate";break e}z=void 0}else ir?ic(e,t)&&(z="onCompositionEnd"):e==="keydown"&&t.keyCode===229&&(z="onCompositionStart");z&&(ac&&t.locale!=="ko"&&(ir||z!=="onCompositionStart"?z==="onCompositionEnd"&&ir&&(T=tc()):(kn=f,Xs="value"in kn?kn.value:kn.textContent,ir=!0)),j=wa(h,z),0<j.length&&(z=new Kl(z,e,null,t,f),x.push({event:z,listeners:j}),T?z.data=T:(T=sc(t),T!==null&&(z.data=T)))),(T=Jm?ef(e,t):nf(e,t))&&(h=wa(h,"onBeforeInput"),0<h.length&&(f=new Kl("onBeforeInput","beforeinput",null,t,f),x.push({event:f,listeners:h}),f.data=T))}vc(x,n)})}function ct(e,n,t){return{instance:e,listener:n,currentTarget:t}}function wa(e,n){for(var t=n+"Capture",a=[];e!==null;){var i=e,s=i.stateNode;i.tag===5&&s!==null&&(i=s,s=tt(e,t),s!=null&&a.unshift(ct(e,s,i)),s=tt(e,n),s!=null&&a.push(ct(e,s,i))),e=e.return}return a}function rr(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5);return e||null}function lo(e,n,t,a,i){for(var s=n._reactName,l=[];t!==null&&t!==a;){var c=t,d=c.alternate,h=c.stateNode;if(d!==null&&d===a)break;c.tag===5&&h!==null&&(c=h,i?(d=tt(t,s),d!=null&&l.unshift(ct(t,d,c))):i||(d=tt(t,s),d!=null&&l.push(ct(t,d,c)))),t=t.return}l.length!==0&&e.push({event:n,listeners:l})}var gf=/\r\n?/g,xf=/\u0000|\uFFFD/g;function oo(e){return(typeof e=="string"?e:""+e).replace(gf,`
`).replace(xf,"")}function $t(e,n,t){if(n=oo(n),oo(e)!==n&&t)throw Error(D(425))}function ka(){}var os=null,ds=null;function cs(e,n){return e==="textarea"||e==="noscript"||typeof n.children=="string"||typeof n.children=="number"||typeof n.dangerouslySetInnerHTML=="object"&&n.dangerouslySetInnerHTML!==null&&n.dangerouslySetInnerHTML.__html!=null}var us=typeof setTimeout=="function"?setTimeout:void 0,vf=typeof clearTimeout=="function"?clearTimeout:void 0,co=typeof Promise=="function"?Promise:void 0,yf=typeof queueMicrotask=="function"?queueMicrotask:typeof co<"u"?function(e){return co.resolve(null).then(e).catch(bf)}:us;function bf(e){setTimeout(function(){throw e})}function ji(e,n){var t=n,a=0;do{var i=t.nextSibling;if(e.removeChild(t),i&&i.nodeType===8)if(t=i.data,t==="/$"){if(a===0){e.removeChild(i),st(n);return}a--}else t!=="$"&&t!=="$?"&&t!=="$!"||a++;t=i}while(t);st(n)}function An(e){for(;e!=null;e=e.nextSibling){var n=e.nodeType;if(n===1||n===3)break;if(n===8){if(n=e.data,n==="$"||n==="$!"||n==="$?")break;if(n==="/$")return null}}return e}function uo(e){e=e.previousSibling;for(var n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="$"||t==="$!"||t==="$?"){if(n===0)return e;n--}else t==="/$"&&n++}e=e.previousSibling}return null}var Dr=Math.random().toString(36).slice(2),en="__reactFiber$"+Dr,ut="__reactProps$"+Dr,pn="__reactContainer$"+Dr,ps="__reactEvents$"+Dr,jf="__reactListeners$"+Dr,wf="__reactHandles$"+Dr;function $n(e){var n=e[en];if(n)return n;for(var t=e.parentNode;t;){if(n=t[pn]||t[en]){if(t=n.alternate,n.child!==null||t!==null&&t.child!==null)for(e=uo(e);e!==null;){if(t=e[en])return t;e=uo(e)}return n}e=t,t=e.parentNode}return null}function kt(e){return e=e[en]||e[pn],!e||e.tag!==5&&e.tag!==6&&e.tag!==13&&e.tag!==3?null:e}function or(e){if(e.tag===5||e.tag===6)return e.stateNode;throw Error(D(33))}function qa(e){return e[ut]||null}var ms=[],dr=-1;function Mn(e){return{current:e}}function G(e){0>dr||(e.current=ms[dr],ms[dr]=null,dr--)}function Y(e,n){dr++,ms[dr]=e.current,e.current=n}var Ln={},ve=Mn(Ln),Ce=Mn(!1),Yn=Ln;function kr(e,n){var t=e.type.contextTypes;if(!t)return Ln;var a=e.stateNode;if(a&&a.__reactInternalMemoizedUnmaskedChildContext===n)return a.__reactInternalMemoizedMaskedChildContext;var i={},s;for(s in t)i[s]=n[s];return a&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=n,e.__reactInternalMemoizedMaskedChildContext=i),i}function Pe(e){return e=e.childContextTypes,e!=null}function Na(){G(Ce),G(ve)}function po(e,n,t){if(ve.current!==Ln)throw Error(D(168));Y(ve,n),Y(Ce,t)}function bc(e,n,t){var a=e.stateNode;if(n=n.childContextTypes,typeof a.getChildContext!="function")return t;a=a.getChildContext();for(var i in a)if(!(i in n))throw Error(D(108,im(e)||"Unknown",i));return ee({},t,a)}function Sa(e){return e=(e=e.stateNode)&&e.__reactInternalMemoizedMergedChildContext||Ln,Yn=ve.current,Y(ve,e),Y(Ce,Ce.current),!0}function mo(e,n,t){var a=e.stateNode;if(!a)throw Error(D(169));t?(e=bc(e,n,Yn),a.__reactInternalMemoizedMergedChildContext=e,G(Ce),G(ve),Y(ve,e)):G(Ce),Y(Ce,t)}var ln=null,Ha=!1,wi=!1;function jc(e){ln===null?ln=[e]:ln.push(e)}function kf(e){Ha=!0,jc(e)}function _n(){if(!wi&&ln!==null){wi=!0;var e=0,n=q;try{var t=ln;for(q=1;e<t.length;e++){var a=t[e];do a=a(!0);while(a!==null)}ln=null,Ha=!1}catch(i){throw ln!==null&&(ln=ln.slice(e+1)),Hd(Qs,_n),i}finally{q=n,wi=!1}}return null}var cr=[],ur=0,Ca=null,Pa=0,Le=[],Fe=0,Kn=null,on=1,dn="";function On(e,n){cr[ur++]=Pa,cr[ur++]=Ca,Ca=e,Pa=n}function wc(e,n,t){Le[Fe++]=on,Le[Fe++]=dn,Le[Fe++]=Kn,Kn=e;var a=on;e=dn;var i=32-Ye(a)-1;a&=~(1<<i),t+=1;var s=32-Ye(n)+i;if(30<s){var l=i-i%5;s=(a&(1<<l)-1).toString(32),a>>=l,i-=l,on=1<<32-Ye(n)+i|t<<i|a,dn=s+e}else on=1<<s|t<<i|a,dn=e}function rl(e){e.return!==null&&(On(e,1),wc(e,1,0))}function tl(e){for(;e===Ca;)Ca=cr[--ur],cr[ur]=null,Pa=cr[--ur],cr[ur]=null;for(;e===Kn;)Kn=Le[--Fe],Le[Fe]=null,dn=Le[--Fe],Le[Fe]=null,on=Le[--Fe],Le[Fe]=null}var De=null,Te=null,X=!1,Qe=null;function kc(e,n){var t=Me(5,null,null,0);t.elementType="DELETED",t.stateNode=n,t.return=e,n=e.deletions,n===null?(e.deletions=[t],e.flags|=16):n.push(t)}function fo(e,n){switch(e.tag){case 5:var t=e.type;return n=n.nodeType!==1||t.toLowerCase()!==n.nodeName.toLowerCase()?null:n,n!==null?(e.stateNode=n,De=e,Te=An(n.firstChild),!0):!1;case 6:return n=e.pendingProps===""||n.nodeType!==3?null:n,n!==null?(e.stateNode=n,De=e,Te=null,!0):!1;case 13:return n=n.nodeType!==8?null:n,n!==null?(t=Kn!==null?{id:on,overflow:dn}:null,e.memoizedState={dehydrated:n,treeContext:t,retryLane:1073741824},t=Me(18,null,null,0),t.stateNode=n,t.return=e,e.child=t,De=e,Te=null,!0):!1;default:return!1}}function fs(e){return(e.mode&1)!==0&&(e.flags&128)===0}function hs(e){if(X){var n=Te;if(n){var t=n;if(!fo(e,n)){if(fs(e))throw Error(D(418));n=An(t.nextSibling);var a=De;n&&fo(e,n)?kc(a,t):(e.flags=e.flags&-4097|2,X=!1,De=e)}}else{if(fs(e))throw Error(D(418));e.flags=e.flags&-4097|2,X=!1,De=e}}}function ho(e){for(e=e.return;e!==null&&e.tag!==5&&e.tag!==3&&e.tag!==13;)e=e.return;De=e}function Vt(e){if(e!==De)return!1;if(!X)return ho(e),X=!0,!1;var n;if((n=e.tag!==3)&&!(n=e.tag!==5)&&(n=e.type,n=n!=="head"&&n!=="body"&&!cs(e.type,e.memoizedProps)),n&&(n=Te)){if(fs(e))throw Nc(),Error(D(418));for(;n;)kc(e,n),n=An(n.nextSibling)}if(ho(e),e.tag===13){if(e=e.memoizedState,e=e!==null?e.dehydrated:null,!e)throw Error(D(317));e:{for(e=e.nextSibling,n=0;e;){if(e.nodeType===8){var t=e.data;if(t==="/$"){if(n===0){Te=An(e.nextSibling);break e}n--}else t!=="$"&&t!=="$!"&&t!=="$?"||n++}e=e.nextSibling}Te=null}}else Te=De?An(e.stateNode.nextSibling):null;return!0}function Nc(){for(var e=Te;e;)e=An(e.nextSibling)}function Nr(){Te=De=null,X=!1}function al(e){Qe===null?Qe=[e]:Qe.push(e)}var Nf=hn.ReactCurrentBatchConfig;function Or(e,n,t){if(e=t.ref,e!==null&&typeof e!="function"&&typeof e!="object"){if(t._owner){if(t=t._owner,t){if(t.tag!==1)throw Error(D(309));var a=t.stateNode}if(!a)throw Error(D(147,e));var i=a,s=""+e;return n!==null&&n.ref!==null&&typeof n.ref=="function"&&n.ref._stringRef===s?n.ref:(n=function(l){var c=i.refs;l===null?delete c[s]:c[s]=l},n._stringRef=s,n)}if(typeof e!="string")throw Error(D(284));if(!t._owner)throw Error(D(290,e))}return e}function Wt(e,n){throw e=Object.prototype.toString.call(n),Error(D(31,e==="[object Object]"?"object with keys {"+Object.keys(n).join(", ")+"}":e))}function go(e){var n=e._init;return n(e._payload)}function Sc(e){function n(u,m){if(e){var v=u.deletions;v===null?(u.deletions=[m],u.flags|=16):v.push(m)}}function t(u,m){if(!e)return null;for(;m!==null;)n(u,m),m=m.sibling;return null}function a(u,m){for(u=new Map;m!==null;)m.key!==null?u.set(m.key,m):u.set(m.index,m),m=m.sibling;return u}function i(u,m){return u=zn(u,m),u.index=0,u.sibling=null,u}function s(u,m,v){return u.index=v,e?(v=u.alternate,v!==null?(v=v.index,v<m?(u.flags|=2,m):v):(u.flags|=2,m)):(u.flags|=1048576,m)}function l(u){return e&&u.alternate===null&&(u.flags|=2),u}function c(u,m,v,P){return m===null||m.tag!==6?(m=Ai(v,u.mode,P),m.return=u,m):(m=i(m,v),m.return=u,m)}function d(u,m,v,P){var E=v.type;return E===ar?f(u,m,v.props.children,P,v.key):m!==null&&(m.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===yn&&go(E)===m.type)?(P=i(m,v.props),P.ref=Or(u,m,v),P.return=u,P):(P=ua(v.type,v.key,v.props,null,u.mode,P),P.ref=Or(u,m,v),P.return=u,P)}function h(u,m,v,P){return m===null||m.tag!==4||m.stateNode.containerInfo!==v.containerInfo||m.stateNode.implementation!==v.implementation?(m=Ti(v,u.mode,P),m.return=u,m):(m=i(m,v.children||[]),m.return=u,m)}function f(u,m,v,P,E){return m===null||m.tag!==7?(m=Hn(v,u.mode,P,E),m.return=u,m):(m=i(m,v),m.return=u,m)}function x(u,m,v){if(typeof m=="string"&&m!==""||typeof m=="number")return m=Ai(""+m,u.mode,v),m.return=u,m;if(typeof m=="object"&&m!==null){switch(m.$$typeof){case zt:return v=ua(m.type,m.key,m.props,null,u.mode,v),v.ref=Or(u,null,m),v.return=u,v;case tr:return m=Ti(m,u.mode,v),m.return=u,m;case yn:var P=m._init;return x(u,P(m._payload),v)}if(Vr(m)||Ir(m))return m=Hn(m,u.mode,v,null),m.return=u,m;Wt(u,m)}return null}function p(u,m,v,P){var E=m!==null?m.key:null;if(typeof v=="string"&&v!==""||typeof v=="number")return E!==null?null:c(u,m,""+v,P);if(typeof v=="object"&&v!==null){switch(v.$$typeof){case zt:return v.key===E?d(u,m,v,P):null;case tr:return v.key===E?h(u,m,v,P):null;case yn:return E=v._init,p(u,m,E(v._payload),P)}if(Vr(v)||Ir(v))return E!==null?null:f(u,m,v,P,null);Wt(u,v)}return null}function y(u,m,v,P,E){if(typeof P=="string"&&P!==""||typeof P=="number")return u=u.get(v)||null,c(m,u,""+P,E);if(typeof P=="object"&&P!==null){switch(P.$$typeof){case zt:return u=u.get(P.key===null?v:P.key)||null,d(m,u,P,E);case tr:return u=u.get(P.key===null?v:P.key)||null,h(m,u,P,E);case yn:var j=P._init;return y(u,m,v,j(P._payload),E)}if(Vr(P)||Ir(P))return u=u.get(v)||null,f(m,u,P,E,null);Wt(m,P)}return null}function N(u,m,v,P){for(var E=null,j=null,T=m,z=m=0,g=null;T!==null&&z<v.length;z++){T.index>z?(g=T,T=null):g=T.sibling;var w=p(u,T,v[z],P);if(w===null){T===null&&(T=g);break}e&&T&&w.alternate===null&&n(u,T),m=s(w,m,z),j===null?E=w:j.sibling=w,j=w,T=g}if(z===v.length)return t(u,T),X&&On(u,z),E;if(T===null){for(;z<v.length;z++)T=x(u,v[z],P),T!==null&&(m=s(T,m,z),j===null?E=T:j.sibling=T,j=T);return X&&On(u,z),E}for(T=a(u,T);z<v.length;z++)g=y(T,u,z,v[z],P),g!==null&&(e&&g.alternate!==null&&T.delete(g.key===null?z:g.key),m=s(g,m,z),j===null?E=g:j.sibling=g,j=g);return e&&T.forEach(function(I){return n(u,I)}),X&&On(u,z),E}function S(u,m,v,P){var E=Ir(v);if(typeof E!="function")throw Error(D(150));if(v=E.call(v),v==null)throw Error(D(151));for(var j=E=null,T=m,z=m=0,g=null,w=v.next();T!==null&&!w.done;z++,w=v.next()){T.index>z?(g=T,T=null):g=T.sibling;var I=p(u,T,w.value,P);if(I===null){T===null&&(T=g);break}e&&T&&I.alternate===null&&n(u,T),m=s(I,m,z),j===null?E=I:j.sibling=I,j=I,T=g}if(w.done)return t(u,T),X&&On(u,z),E;if(T===null){for(;!w.done;z++,w=v.next())w=x(u,w.value,P),w!==null&&(m=s(w,m,z),j===null?E=w:j.sibling=w,j=w);return X&&On(u,z),E}for(T=a(u,T);!w.done;z++,w=v.next())w=y(T,u,z,w.value,P),w!==null&&(e&&w.alternate!==null&&T.delete(w.key===null?z:w.key),m=s(w,m,z),j===null?E=w:j.sibling=w,j=w);return e&&T.forEach(function(R){return n(u,R)}),X&&On(u,z),E}function b(u,m,v,P){if(typeof v=="object"&&v!==null&&v.type===ar&&v.key===null&&(v=v.props.children),typeof v=="object"&&v!==null){switch(v.$$typeof){case zt:e:{for(var E=v.key,j=m;j!==null;){if(j.key===E){if(E=v.type,E===ar){if(j.tag===7){t(u,j.sibling),m=i(j,v.props.children),m.return=u,u=m;break e}}else if(j.elementType===E||typeof E=="object"&&E!==null&&E.$$typeof===yn&&go(E)===j.type){t(u,j.sibling),m=i(j,v.props),m.ref=Or(u,j,v),m.return=u,u=m;break e}t(u,j);break}else n(u,j);j=j.sibling}v.type===ar?(m=Hn(v.props.children,u.mode,P,v.key),m.return=u,u=m):(P=ua(v.type,v.key,v.props,null,u.mode,P),P.ref=Or(u,m,v),P.return=u,u=P)}return l(u);case tr:e:{for(j=v.key;m!==null;){if(m.key===j)if(m.tag===4&&m.stateNode.containerInfo===v.containerInfo&&m.stateNode.implementation===v.implementation){t(u,m.sibling),m=i(m,v.children||[]),m.return=u,u=m;break e}else{t(u,m);break}else n(u,m);m=m.sibling}m=Ti(v,u.mode,P),m.return=u,u=m}return l(u);case yn:return j=v._init,b(u,m,j(v._payload),P)}if(Vr(v))return N(u,m,v,P);if(Ir(v))return S(u,m,v,P);Wt(u,v)}return typeof v=="string"&&v!==""||typeof v=="number"?(v=""+v,m!==null&&m.tag===6?(t(u,m.sibling),m=i(m,v),m.return=u,u=m):(t(u,m),m=Ai(v,u.mode,P),m.return=u,u=m),l(u)):t(u,m)}return b}var Sr=Sc(!0),Cc=Sc(!1),Ea=Mn(null),Aa=null,pr=null,il=null;function sl(){il=pr=Aa=null}function ll(e){var n=Ea.current;G(Ea),e._currentValue=n}function gs(e,n,t){for(;e!==null;){var a=e.alternate;if((e.childLanes&n)!==n?(e.childLanes|=n,a!==null&&(a.childLanes|=n)):a!==null&&(a.childLanes&n)!==n&&(a.childLanes|=n),e===t)break;e=e.return}}function br(e,n){Aa=e,il=pr=null,e=e.dependencies,e!==null&&e.firstContext!==null&&(e.lanes&n&&(Se=!0),e.firstContext=null)}function Oe(e){var n=e._currentValue;if(il!==e)if(e={context:e,memoizedValue:n,next:null},pr===null){if(Aa===null)throw Error(D(308));pr=e,Aa.dependencies={lanes:0,firstContext:e}}else pr=pr.next=e;return n}var Vn=null;function ol(e){Vn===null?Vn=[e]:Vn.push(e)}function Pc(e,n,t,a){var i=n.interleaved;return i===null?(t.next=t,ol(n)):(t.next=i.next,i.next=t),n.interleaved=t,mn(e,a)}function mn(e,n){e.lanes|=n;var t=e.alternate;for(t!==null&&(t.lanes|=n),t=e,e=e.return;e!==null;)e.childLanes|=n,t=e.alternate,t!==null&&(t.childLanes|=n),t=e,e=e.return;return t.tag===3?t.stateNode:null}var bn=!1;function dl(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Ec(e,n){e=e.updateQueue,n.updateQueue===e&&(n.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,effects:e.effects})}function cn(e,n){return{eventTime:e,lane:n,tag:0,payload:null,callback:null,next:null}}function Tn(e,n,t){var a=e.updateQueue;if(a===null)return null;if(a=a.shared,W&2){var i=a.pending;return i===null?n.next=n:(n.next=i.next,i.next=n),a.pending=n,mn(e,t)}return i=a.interleaved,i===null?(n.next=n,ol(a)):(n.next=i.next,i.next=n),a.interleaved=n,mn(e,t)}function ia(e,n,t){if(n=n.updateQueue,n!==null&&(n=n.shared,(t&4194240)!==0)){var a=n.lanes;a&=e.pendingLanes,t|=a,n.lanes=t,Ys(e,t)}}function xo(e,n){var t=e.updateQueue,a=e.alternate;if(a!==null&&(a=a.updateQueue,t===a)){var i=null,s=null;if(t=t.firstBaseUpdate,t!==null){do{var l={eventTime:t.eventTime,lane:t.lane,tag:t.tag,payload:t.payload,callback:t.callback,next:null};s===null?i=s=l:s=s.next=l,t=t.next}while(t!==null);s===null?i=s=n:s=s.next=n}else i=s=n;t={baseState:a.baseState,firstBaseUpdate:i,lastBaseUpdate:s,shared:a.shared,effects:a.effects},e.updateQueue=t;return}e=t.lastBaseUpdate,e===null?t.firstBaseUpdate=n:e.next=n,t.lastBaseUpdate=n}function Ta(e,n,t,a){var i=e.updateQueue;bn=!1;var s=i.firstBaseUpdate,l=i.lastBaseUpdate,c=i.shared.pending;if(c!==null){i.shared.pending=null;var d=c,h=d.next;d.next=null,l===null?s=h:l.next=h,l=d;var f=e.alternate;f!==null&&(f=f.updateQueue,c=f.lastBaseUpdate,c!==l&&(c===null?f.firstBaseUpdate=h:c.next=h,f.lastBaseUpdate=d))}if(s!==null){var x=i.baseState;l=0,f=h=d=null,c=s;do{var p=c.lane,y=c.eventTime;if((a&p)===p){f!==null&&(f=f.next={eventTime:y,lane:0,tag:c.tag,payload:c.payload,callback:c.callback,next:null});e:{var N=e,S=c;switch(p=n,y=t,S.tag){case 1:if(N=S.payload,typeof N=="function"){x=N.call(y,x,p);break e}x=N;break e;case 3:N.flags=N.flags&-65537|128;case 0:if(N=S.payload,p=typeof N=="function"?N.call(y,x,p):N,p==null)break e;x=ee({},x,p);break e;case 2:bn=!0}}c.callback!==null&&c.lane!==0&&(e.flags|=64,p=i.effects,p===null?i.effects=[c]:p.push(c))}else y={eventTime:y,lane:p,tag:c.tag,payload:c.payload,callback:c.callback,next:null},f===null?(h=f=y,d=x):f=f.next=y,l|=p;if(c=c.next,c===null){if(c=i.shared.pending,c===null)break;p=c,c=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(!0);if(f===null&&(d=x),i.baseState=d,i.firstBaseUpdate=h,i.lastBaseUpdate=f,n=i.shared.interleaved,n!==null){i=n;do l|=i.lane,i=i.next;while(i!==n)}else s===null&&(i.shared.lanes=0);Xn|=l,e.lanes=l,e.memoizedState=x}}function vo(e,n,t){if(e=n.effects,n.effects=null,e!==null)for(n=0;n<e.length;n++){var a=e[n],i=a.callback;if(i!==null){if(a.callback=null,a=t,typeof i!="function")throw Error(D(191,i));i.call(a)}}}var Nt={},rn=Mn(Nt),pt=Mn(Nt),mt=Mn(Nt);function Wn(e){if(e===Nt)throw Error(D(174));return e}function cl(e,n){switch(Y(mt,n),Y(pt,e),Y(rn,Nt),e=n.nodeType,e){case 9:case 11:n=(n=n.documentElement)?n.namespaceURI:Gi(null,"");break;default:e=e===8?n.parentNode:n,n=e.namespaceURI||null,e=e.tagName,n=Gi(n,e)}G(rn),Y(rn,n)}function Cr(){G(rn),G(pt),G(mt)}function Ac(e){Wn(mt.current);var n=Wn(rn.current),t=Gi(n,e.type);n!==t&&(Y(pt,e),Y(rn,t))}function ul(e){pt.current===e&&(G(rn),G(pt))}var Z=Mn(0);function Da(e){for(var n=e;n!==null;){if(n.tag===13){var t=n.memoizedState;if(t!==null&&(t=t.dehydrated,t===null||t.data==="$?"||t.data==="$!"))return n}else if(n.tag===19&&n.memoizedProps.revealOrder!==void 0){if(n.flags&128)return n}else if(n.child!==null){n.child.return=n,n=n.child;continue}if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return null;n=n.return}n.sibling.return=n.return,n=n.sibling}return null}var ki=[];function pl(){for(var e=0;e<ki.length;e++)ki[e]._workInProgressVersionPrimary=null;ki.length=0}var sa=hn.ReactCurrentDispatcher,Ni=hn.ReactCurrentBatchConfig,Gn=0,J=null,oe=null,ce=null,Ra=!1,Xr=!1,ft=0,Sf=0;function he(){throw Error(D(321))}function ml(e,n){if(n===null)return!1;for(var t=0;t<n.length&&t<e.length;t++)if(!Ge(e[t],n[t]))return!1;return!0}function fl(e,n,t,a,i,s){if(Gn=s,J=n,n.memoizedState=null,n.updateQueue=null,n.lanes=0,sa.current=e===null||e.memoizedState===null?Af:Tf,e=t(a,i),Xr){s=0;do{if(Xr=!1,ft=0,25<=s)throw Error(D(301));s+=1,ce=oe=null,n.updateQueue=null,sa.current=Df,e=t(a,i)}while(Xr)}if(sa.current=za,n=oe!==null&&oe.next!==null,Gn=0,ce=oe=J=null,Ra=!1,n)throw Error(D(300));return e}function hl(){var e=ft!==0;return ft=0,e}function Je(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return ce===null?J.memoizedState=ce=e:ce=ce.next=e,ce}function Be(){if(oe===null){var e=J.alternate;e=e!==null?e.memoizedState:null}else e=oe.next;var n=ce===null?J.memoizedState:ce.next;if(n!==null)ce=n,oe=e;else{if(e===null)throw Error(D(310));oe=e,e={memoizedState:oe.memoizedState,baseState:oe.baseState,baseQueue:oe.baseQueue,queue:oe.queue,next:null},ce===null?J.memoizedState=ce=e:ce=ce.next=e}return ce}function ht(e,n){return typeof n=="function"?n(e):n}function Si(e){var n=Be(),t=n.queue;if(t===null)throw Error(D(311));t.lastRenderedReducer=e;var a=oe,i=a.baseQueue,s=t.pending;if(s!==null){if(i!==null){var l=i.next;i.next=s.next,s.next=l}a.baseQueue=i=s,t.pending=null}if(i!==null){s=i.next,a=a.baseState;var c=l=null,d=null,h=s;do{var f=h.lane;if((Gn&f)===f)d!==null&&(d=d.next={lane:0,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null}),a=h.hasEagerState?h.eagerState:e(a,h.action);else{var x={lane:f,action:h.action,hasEagerState:h.hasEagerState,eagerState:h.eagerState,next:null};d===null?(c=d=x,l=a):d=d.next=x,J.lanes|=f,Xn|=f}h=h.next}while(h!==null&&h!==s);d===null?l=a:d.next=c,Ge(a,n.memoizedState)||(Se=!0),n.memoizedState=a,n.baseState=l,n.baseQueue=d,t.lastRenderedState=a}if(e=t.interleaved,e!==null){i=e;do s=i.lane,J.lanes|=s,Xn|=s,i=i.next;while(i!==e)}else i===null&&(t.lanes=0);return[n.memoizedState,t.dispatch]}function Ci(e){var n=Be(),t=n.queue;if(t===null)throw Error(D(311));t.lastRenderedReducer=e;var a=t.dispatch,i=t.pending,s=n.memoizedState;if(i!==null){t.pending=null;var l=i=i.next;do s=e(s,l.action),l=l.next;while(l!==i);Ge(s,n.memoizedState)||(Se=!0),n.memoizedState=s,n.baseQueue===null&&(n.baseState=s),t.lastRenderedState=s}return[s,a]}function Tc(){}function Dc(e,n){var t=J,a=Be(),i=n(),s=!Ge(a.memoizedState,i);if(s&&(a.memoizedState=i,Se=!0),a=a.queue,gl(Ic.bind(null,t,a,e),[e]),a.getSnapshot!==n||s||ce!==null&&ce.memoizedState.tag&1){if(t.flags|=2048,gt(9,zc.bind(null,t,a,i,n),void 0,null),ue===null)throw Error(D(349));Gn&30||Rc(t,n,i)}return i}function Rc(e,n,t){e.flags|=16384,e={getSnapshot:n,value:t},n=J.updateQueue,n===null?(n={lastEffect:null,stores:null},J.updateQueue=n,n.stores=[e]):(t=n.stores,t===null?n.stores=[e]:t.push(e))}function zc(e,n,t,a){n.value=t,n.getSnapshot=a,Lc(n)&&Fc(e)}function Ic(e,n,t){return t(function(){Lc(n)&&Fc(e)})}function Lc(e){var n=e.getSnapshot;e=e.value;try{var t=n();return!Ge(e,t)}catch{return!0}}function Fc(e){var n=mn(e,1);n!==null&&Ke(n,e,1,-1)}function yo(e){var n=Je();return typeof e=="function"&&(e=e()),n.memoizedState=n.baseState=e,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:ht,lastRenderedState:e},n.queue=e,e=e.dispatch=Ef.bind(null,J,e),[n.memoizedState,e]}function gt(e,n,t,a){return e={tag:e,create:n,destroy:t,deps:a,next:null},n=J.updateQueue,n===null?(n={lastEffect:null,stores:null},J.updateQueue=n,n.lastEffect=e.next=e):(t=n.lastEffect,t===null?n.lastEffect=e.next=e:(a=t.next,t.next=e,e.next=a,n.lastEffect=e)),e}function Mc(){return Be().memoizedState}function la(e,n,t,a){var i=Je();J.flags|=e,i.memoizedState=gt(1|n,t,void 0,a===void 0?null:a)}function Qa(e,n,t,a){var i=Be();a=a===void 0?null:a;var s=void 0;if(oe!==null){var l=oe.memoizedState;if(s=l.destroy,a!==null&&ml(a,l.deps)){i.memoizedState=gt(n,t,s,a);return}}J.flags|=e,i.memoizedState=gt(1|n,t,s,a)}function bo(e,n){return la(8390656,8,e,n)}function gl(e,n){return Qa(2048,8,e,n)}function _c(e,n){return Qa(4,2,e,n)}function Oc(e,n){return Qa(4,4,e,n)}function Bc(e,n){if(typeof n=="function")return e=e(),n(e),function(){n(null)};if(n!=null)return e=e(),n.current=e,function(){n.current=null}}function Uc(e,n,t){return t=t!=null?t.concat([e]):null,Qa(4,4,Bc.bind(null,n,e),t)}function xl(){}function $c(e,n){var t=Be();n=n===void 0?null:n;var a=t.memoizedState;return a!==null&&n!==null&&ml(n,a[1])?a[0]:(t.memoizedState=[e,n],e)}function Vc(e,n){var t=Be();n=n===void 0?null:n;var a=t.memoizedState;return a!==null&&n!==null&&ml(n,a[1])?a[0]:(e=e(),t.memoizedState=[e,n],e)}function Wc(e,n,t){return Gn&21?(Ge(t,n)||(t=Kd(),J.lanes|=t,Xn|=t,e.baseState=!0),n):(e.baseState&&(e.baseState=!1,Se=!0),e.memoizedState=t)}function Cf(e,n){var t=q;q=t!==0&&4>t?t:4,e(!0);var a=Ni.transition;Ni.transition={};try{e(!1),n()}finally{q=t,Ni.transition=a}}function qc(){return Be().memoizedState}function Pf(e,n,t){var a=Rn(e);if(t={lane:a,action:t,hasEagerState:!1,eagerState:null,next:null},Hc(e))Qc(n,t);else if(t=Pc(e,n,t,a),t!==null){var i=je();Ke(t,e,a,i),Yc(t,n,a)}}function Ef(e,n,t){var a=Rn(e),i={lane:a,action:t,hasEagerState:!1,eagerState:null,next:null};if(Hc(e))Qc(n,i);else{var s=e.alternate;if(e.lanes===0&&(s===null||s.lanes===0)&&(s=n.lastRenderedReducer,s!==null))try{var l=n.lastRenderedState,c=s(l,t);if(i.hasEagerState=!0,i.eagerState=c,Ge(c,l)){var d=n.interleaved;d===null?(i.next=i,ol(n)):(i.next=d.next,d.next=i),n.interleaved=i;return}}catch{}finally{}t=Pc(e,n,i,a),t!==null&&(i=je(),Ke(t,e,a,i),Yc(t,n,a))}}function Hc(e){var n=e.alternate;return e===J||n!==null&&n===J}function Qc(e,n){Xr=Ra=!0;var t=e.pending;t===null?n.next=n:(n.next=t.next,t.next=n),e.pending=n}function Yc(e,n,t){if(t&4194240){var a=n.lanes;a&=e.pendingLanes,t|=a,n.lanes=t,Ys(e,t)}}var za={readContext:Oe,useCallback:he,useContext:he,useEffect:he,useImperativeHandle:he,useInsertionEffect:he,useLayoutEffect:he,useMemo:he,useReducer:he,useRef:he,useState:he,useDebugValue:he,useDeferredValue:he,useTransition:he,useMutableSource:he,useSyncExternalStore:he,useId:he,unstable_isNewReconciler:!1},Af={readContext:Oe,useCallback:function(e,n){return Je().memoizedState=[e,n===void 0?null:n],e},useContext:Oe,useEffect:bo,useImperativeHandle:function(e,n,t){return t=t!=null?t.concat([e]):null,la(4194308,4,Bc.bind(null,n,e),t)},useLayoutEffect:function(e,n){return la(4194308,4,e,n)},useInsertionEffect:function(e,n){return la(4,2,e,n)},useMemo:function(e,n){var t=Je();return n=n===void 0?null:n,e=e(),t.memoizedState=[e,n],e},useReducer:function(e,n,t){var a=Je();return n=t!==void 0?t(n):n,a.memoizedState=a.baseState=n,e={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:n},a.queue=e,e=e.dispatch=Pf.bind(null,J,e),[a.memoizedState,e]},useRef:function(e){var n=Je();return e={current:e},n.memoizedState=e},useState:yo,useDebugValue:xl,useDeferredValue:function(e){return Je().memoizedState=e},useTransition:function(){var e=yo(!1),n=e[0];return e=Cf.bind(null,e[1]),Je().memoizedState=e,[n,e]},useMutableSource:function(){},useSyncExternalStore:function(e,n,t){var a=J,i=Je();if(X){if(t===void 0)throw Error(D(407));t=t()}else{if(t=n(),ue===null)throw Error(D(349));Gn&30||Rc(a,n,t)}i.memoizedState=t;var s={value:t,getSnapshot:n};return i.queue=s,bo(Ic.bind(null,a,s,e),[e]),a.flags|=2048,gt(9,zc.bind(null,a,s,t,n),void 0,null),t},useId:function(){var e=Je(),n=ue.identifierPrefix;if(X){var t=dn,a=on;t=(a&~(1<<32-Ye(a)-1)).toString(32)+t,n=":"+n+"R"+t,t=ft++,0<t&&(n+="H"+t.toString(32)),n+=":"}else t=Sf++,n=":"+n+"r"+t.toString(32)+":";return e.memoizedState=n},unstable_isNewReconciler:!1},Tf={readContext:Oe,useCallback:$c,useContext:Oe,useEffect:gl,useImperativeHandle:Uc,useInsertionEffect:_c,useLayoutEffect:Oc,useMemo:Vc,useReducer:Si,useRef:Mc,useState:function(){return Si(ht)},useDebugValue:xl,useDeferredValue:function(e){var n=Be();return Wc(n,oe.memoizedState,e)},useTransition:function(){var e=Si(ht)[0],n=Be().memoizedState;return[e,n]},useMutableSource:Tc,useSyncExternalStore:Dc,useId:qc,unstable_isNewReconciler:!1},Df={readContext:Oe,useCallback:$c,useContext:Oe,useEffect:gl,useImperativeHandle:Uc,useInsertionEffect:_c,useLayoutEffect:Oc,useMemo:Vc,useReducer:Ci,useRef:Mc,useState:function(){return Ci(ht)},useDebugValue:xl,useDeferredValue:function(e){var n=Be();return oe===null?n.memoizedState=e:Wc(n,oe.memoizedState,e)},useTransition:function(){var e=Ci(ht)[0],n=Be().memoizedState;return[e,n]},useMutableSource:Tc,useSyncExternalStore:Dc,useId:qc,unstable_isNewReconciler:!1};function qe(e,n){if(e&&e.defaultProps){n=ee({},n),e=e.defaultProps;for(var t in e)n[t]===void 0&&(n[t]=e[t]);return n}return n}function xs(e,n,t,a){n=e.memoizedState,t=t(a,n),t=t==null?n:ee({},n,t),e.memoizedState=t,e.lanes===0&&(e.updateQueue.baseState=t)}var Ya={isMounted:function(e){return(e=e._reactInternals)?er(e)===e:!1},enqueueSetState:function(e,n,t){e=e._reactInternals;var a=je(),i=Rn(e),s=cn(a,i);s.payload=n,t!=null&&(s.callback=t),n=Tn(e,s,i),n!==null&&(Ke(n,e,i,a),ia(n,e,i))},enqueueReplaceState:function(e,n,t){e=e._reactInternals;var a=je(),i=Rn(e),s=cn(a,i);s.tag=1,s.payload=n,t!=null&&(s.callback=t),n=Tn(e,s,i),n!==null&&(Ke(n,e,i,a),ia(n,e,i))},enqueueForceUpdate:function(e,n){e=e._reactInternals;var t=je(),a=Rn(e),i=cn(t,a);i.tag=2,n!=null&&(i.callback=n),n=Tn(e,i,a),n!==null&&(Ke(n,e,a,t),ia(n,e,a))}};function jo(e,n,t,a,i,s,l){return e=e.stateNode,typeof e.shouldComponentUpdate=="function"?e.shouldComponentUpdate(a,s,l):n.prototype&&n.prototype.isPureReactComponent?!ot(t,a)||!ot(i,s):!0}function Kc(e,n,t){var a=!1,i=Ln,s=n.contextType;return typeof s=="object"&&s!==null?s=Oe(s):(i=Pe(n)?Yn:ve.current,a=n.contextTypes,s=(a=a!=null)?kr(e,i):Ln),n=new n(t,s),e.memoizedState=n.state!==null&&n.state!==void 0?n.state:null,n.updater=Ya,e.stateNode=n,n._reactInternals=e,a&&(e=e.stateNode,e.__reactInternalMemoizedUnmaskedChildContext=i,e.__reactInternalMemoizedMaskedChildContext=s),n}function wo(e,n,t,a){e=n.state,typeof n.componentWillReceiveProps=="function"&&n.componentWillReceiveProps(t,a),typeof n.UNSAFE_componentWillReceiveProps=="function"&&n.UNSAFE_componentWillReceiveProps(t,a),n.state!==e&&Ya.enqueueReplaceState(n,n.state,null)}function vs(e,n,t,a){var i=e.stateNode;i.props=t,i.state=e.memoizedState,i.refs={},dl(e);var s=n.contextType;typeof s=="object"&&s!==null?i.context=Oe(s):(s=Pe(n)?Yn:ve.current,i.context=kr(e,s)),i.state=e.memoizedState,s=n.getDerivedStateFromProps,typeof s=="function"&&(xs(e,n,s,t),i.state=e.memoizedState),typeof n.getDerivedStateFromProps=="function"||typeof i.getSnapshotBeforeUpdate=="function"||typeof i.UNSAFE_componentWillMount!="function"&&typeof i.componentWillMount!="function"||(n=i.state,typeof i.componentWillMount=="function"&&i.componentWillMount(),typeof i.UNSAFE_componentWillMount=="function"&&i.UNSAFE_componentWillMount(),n!==i.state&&Ya.enqueueReplaceState(i,i.state,null),Ta(e,t,i,a),i.state=e.memoizedState),typeof i.componentDidMount=="function"&&(e.flags|=4194308)}function Pr(e,n){try{var t="",a=n;do t+=am(a),a=a.return;while(a);var i=t}catch(s){i=`
Error generating stack: `+s.message+`
`+s.stack}return{value:e,source:n,stack:i,digest:null}}function Pi(e,n,t){return{value:e,source:null,stack:t??null,digest:n??null}}function ys(e,n){try{console.error(n.value)}catch(t){setTimeout(function(){throw t})}}var Rf=typeof WeakMap=="function"?WeakMap:Map;function Gc(e,n,t){t=cn(-1,t),t.tag=3,t.payload={element:null};var a=n.value;return t.callback=function(){La||(La=!0,As=a),ys(e,n)},t}function Xc(e,n,t){t=cn(-1,t),t.tag=3;var a=e.type.getDerivedStateFromError;if(typeof a=="function"){var i=n.value;t.payload=function(){return a(i)},t.callback=function(){ys(e,n)}}var s=e.stateNode;return s!==null&&typeof s.componentDidCatch=="function"&&(t.callback=function(){ys(e,n),typeof a!="function"&&(Dn===null?Dn=new Set([this]):Dn.add(this));var l=n.stack;this.componentDidCatch(n.value,{componentStack:l!==null?l:""})}),t}function ko(e,n,t){var a=e.pingCache;if(a===null){a=e.pingCache=new Rf;var i=new Set;a.set(n,i)}else i=a.get(n),i===void 0&&(i=new Set,a.set(n,i));i.has(t)||(i.add(t),e=Hf.bind(null,e,n,t),n.then(e,e))}function No(e){do{var n;if((n=e.tag===13)&&(n=e.memoizedState,n=n!==null?n.dehydrated!==null:!0),n)return e;e=e.return}while(e!==null);return null}function So(e,n,t,a,i){return e.mode&1?(e.flags|=65536,e.lanes=i,e):(e===n?e.flags|=65536:(e.flags|=128,t.flags|=131072,t.flags&=-52805,t.tag===1&&(t.alternate===null?t.tag=17:(n=cn(-1,1),n.tag=2,Tn(t,n,1))),t.lanes|=1),e)}var zf=hn.ReactCurrentOwner,Se=!1;function be(e,n,t,a){n.child=e===null?Cc(n,null,t,a):Sr(n,e.child,t,a)}function Co(e,n,t,a,i){t=t.render;var s=n.ref;return br(n,i),a=fl(e,n,t,a,s,i),t=hl(),e!==null&&!Se?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~i,fn(e,n,i)):(X&&t&&rl(n),n.flags|=1,be(e,n,a,i),n.child)}function Po(e,n,t,a,i){if(e===null){var s=t.type;return typeof s=="function"&&!Sl(s)&&s.defaultProps===void 0&&t.compare===null&&t.defaultProps===void 0?(n.tag=15,n.type=s,Zc(e,n,s,a,i)):(e=ua(t.type,null,a,n,n.mode,i),e.ref=n.ref,e.return=n,n.child=e)}if(s=e.child,!(e.lanes&i)){var l=s.memoizedProps;if(t=t.compare,t=t!==null?t:ot,t(l,a)&&e.ref===n.ref)return fn(e,n,i)}return n.flags|=1,e=zn(s,a),e.ref=n.ref,e.return=n,n.child=e}function Zc(e,n,t,a,i){if(e!==null){var s=e.memoizedProps;if(ot(s,a)&&e.ref===n.ref)if(Se=!1,n.pendingProps=a=s,(e.lanes&i)!==0)e.flags&131072&&(Se=!0);else return n.lanes=e.lanes,fn(e,n,i)}return bs(e,n,t,a,i)}function Jc(e,n,t){var a=n.pendingProps,i=a.children,s=e!==null?e.memoizedState:null;if(a.mode==="hidden")if(!(n.mode&1))n.memoizedState={baseLanes:0,cachePool:null,transitions:null},Y(fr,Ae),Ae|=t;else{if(!(t&1073741824))return e=s!==null?s.baseLanes|t:t,n.lanes=n.childLanes=1073741824,n.memoizedState={baseLanes:e,cachePool:null,transitions:null},n.updateQueue=null,Y(fr,Ae),Ae|=e,null;n.memoizedState={baseLanes:0,cachePool:null,transitions:null},a=s!==null?s.baseLanes:t,Y(fr,Ae),Ae|=a}else s!==null?(a=s.baseLanes|t,n.memoizedState=null):a=t,Y(fr,Ae),Ae|=a;return be(e,n,i,t),n.child}function eu(e,n){var t=n.ref;(e===null&&t!==null||e!==null&&e.ref!==t)&&(n.flags|=512,n.flags|=2097152)}function bs(e,n,t,a,i){var s=Pe(t)?Yn:ve.current;return s=kr(n,s),br(n,i),t=fl(e,n,t,a,s,i),a=hl(),e!==null&&!Se?(n.updateQueue=e.updateQueue,n.flags&=-2053,e.lanes&=~i,fn(e,n,i)):(X&&a&&rl(n),n.flags|=1,be(e,n,t,i),n.child)}function Eo(e,n,t,a,i){if(Pe(t)){var s=!0;Sa(n)}else s=!1;if(br(n,i),n.stateNode===null)oa(e,n),Kc(n,t,a),vs(n,t,a,i),a=!0;else if(e===null){var l=n.stateNode,c=n.memoizedProps;l.props=c;var d=l.context,h=t.contextType;typeof h=="object"&&h!==null?h=Oe(h):(h=Pe(t)?Yn:ve.current,h=kr(n,h));var f=t.getDerivedStateFromProps,x=typeof f=="function"||typeof l.getSnapshotBeforeUpdate=="function";x||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(c!==a||d!==h)&&wo(n,l,a,h),bn=!1;var p=n.memoizedState;l.state=p,Ta(n,a,l,i),d=n.memoizedState,c!==a||p!==d||Ce.current||bn?(typeof f=="function"&&(xs(n,t,f,a),d=n.memoizedState),(c=bn||jo(n,t,c,a,p,d,h))?(x||typeof l.UNSAFE_componentWillMount!="function"&&typeof l.componentWillMount!="function"||(typeof l.componentWillMount=="function"&&l.componentWillMount(),typeof l.UNSAFE_componentWillMount=="function"&&l.UNSAFE_componentWillMount()),typeof l.componentDidMount=="function"&&(n.flags|=4194308)):(typeof l.componentDidMount=="function"&&(n.flags|=4194308),n.memoizedProps=a,n.memoizedState=d),l.props=a,l.state=d,l.context=h,a=c):(typeof l.componentDidMount=="function"&&(n.flags|=4194308),a=!1)}else{l=n.stateNode,Ec(e,n),c=n.memoizedProps,h=n.type===n.elementType?c:qe(n.type,c),l.props=h,x=n.pendingProps,p=l.context,d=t.contextType,typeof d=="object"&&d!==null?d=Oe(d):(d=Pe(t)?Yn:ve.current,d=kr(n,d));var y=t.getDerivedStateFromProps;(f=typeof y=="function"||typeof l.getSnapshotBeforeUpdate=="function")||typeof l.UNSAFE_componentWillReceiveProps!="function"&&typeof l.componentWillReceiveProps!="function"||(c!==x||p!==d)&&wo(n,l,a,d),bn=!1,p=n.memoizedState,l.state=p,Ta(n,a,l,i);var N=n.memoizedState;c!==x||p!==N||Ce.current||bn?(typeof y=="function"&&(xs(n,t,y,a),N=n.memoizedState),(h=bn||jo(n,t,h,a,p,N,d)||!1)?(f||typeof l.UNSAFE_componentWillUpdate!="function"&&typeof l.componentWillUpdate!="function"||(typeof l.componentWillUpdate=="function"&&l.componentWillUpdate(a,N,d),typeof l.UNSAFE_componentWillUpdate=="function"&&l.UNSAFE_componentWillUpdate(a,N,d)),typeof l.componentDidUpdate=="function"&&(n.flags|=4),typeof l.getSnapshotBeforeUpdate=="function"&&(n.flags|=1024)):(typeof l.componentDidUpdate!="function"||c===e.memoizedProps&&p===e.memoizedState||(n.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&p===e.memoizedState||(n.flags|=1024),n.memoizedProps=a,n.memoizedState=N),l.props=a,l.state=N,l.context=d,a=h):(typeof l.componentDidUpdate!="function"||c===e.memoizedProps&&p===e.memoizedState||(n.flags|=4),typeof l.getSnapshotBeforeUpdate!="function"||c===e.memoizedProps&&p===e.memoizedState||(n.flags|=1024),a=!1)}return js(e,n,t,a,s,i)}function js(e,n,t,a,i,s){eu(e,n);var l=(n.flags&128)!==0;if(!a&&!l)return i&&mo(n,t,!1),fn(e,n,s);a=n.stateNode,zf.current=n;var c=l&&typeof t.getDerivedStateFromError!="function"?null:a.render();return n.flags|=1,e!==null&&l?(n.child=Sr(n,e.child,null,s),n.child=Sr(n,null,c,s)):be(e,n,c,s),n.memoizedState=a.state,i&&mo(n,t,!0),n.child}function nu(e){var n=e.stateNode;n.pendingContext?po(e,n.pendingContext,n.pendingContext!==n.context):n.context&&po(e,n.context,!1),cl(e,n.containerInfo)}function Ao(e,n,t,a,i){return Nr(),al(i),n.flags|=256,be(e,n,t,a),n.child}var ws={dehydrated:null,treeContext:null,retryLane:0};function ks(e){return{baseLanes:e,cachePool:null,transitions:null}}function ru(e,n,t){var a=n.pendingProps,i=Z.current,s=!1,l=(n.flags&128)!==0,c;if((c=l)||(c=e!==null&&e.memoizedState===null?!1:(i&2)!==0),c?(s=!0,n.flags&=-129):(e===null||e.memoizedState!==null)&&(i|=1),Y(Z,i&1),e===null)return hs(n),e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null)?(n.mode&1?e.data==="$!"?n.lanes=8:n.lanes=1073741824:n.lanes=1,null):(l=a.children,e=a.fallback,s?(a=n.mode,s=n.child,l={mode:"hidden",children:l},!(a&1)&&s!==null?(s.childLanes=0,s.pendingProps=l):s=Xa(l,a,0,null),e=Hn(e,a,t,null),s.return=n,e.return=n,s.sibling=e,n.child=s,n.child.memoizedState=ks(t),n.memoizedState=ws,e):vl(n,l));if(i=e.memoizedState,i!==null&&(c=i.dehydrated,c!==null))return If(e,n,l,a,c,i,t);if(s){s=a.fallback,l=n.mode,i=e.child,c=i.sibling;var d={mode:"hidden",children:a.children};return!(l&1)&&n.child!==i?(a=n.child,a.childLanes=0,a.pendingProps=d,n.deletions=null):(a=zn(i,d),a.subtreeFlags=i.subtreeFlags&14680064),c!==null?s=zn(c,s):(s=Hn(s,l,t,null),s.flags|=2),s.return=n,a.return=n,a.sibling=s,n.child=a,a=s,s=n.child,l=e.child.memoizedState,l=l===null?ks(t):{baseLanes:l.baseLanes|t,cachePool:null,transitions:l.transitions},s.memoizedState=l,s.childLanes=e.childLanes&~t,n.memoizedState=ws,a}return s=e.child,e=s.sibling,a=zn(s,{mode:"visible",children:a.children}),!(n.mode&1)&&(a.lanes=t),a.return=n,a.sibling=null,e!==null&&(t=n.deletions,t===null?(n.deletions=[e],n.flags|=16):t.push(e)),n.child=a,n.memoizedState=null,a}function vl(e,n){return n=Xa({mode:"visible",children:n},e.mode,0,null),n.return=e,e.child=n}function qt(e,n,t,a){return a!==null&&al(a),Sr(n,e.child,null,t),e=vl(n,n.pendingProps.children),e.flags|=2,n.memoizedState=null,e}function If(e,n,t,a,i,s,l){if(t)return n.flags&256?(n.flags&=-257,a=Pi(Error(D(422))),qt(e,n,l,a)):n.memoizedState!==null?(n.child=e.child,n.flags|=128,null):(s=a.fallback,i=n.mode,a=Xa({mode:"visible",children:a.children},i,0,null),s=Hn(s,i,l,null),s.flags|=2,a.return=n,s.return=n,a.sibling=s,n.child=a,n.mode&1&&Sr(n,e.child,null,l),n.child.memoizedState=ks(l),n.memoizedState=ws,s);if(!(n.mode&1))return qt(e,n,l,null);if(i.data==="$!"){if(a=i.nextSibling&&i.nextSibling.dataset,a)var c=a.dgst;return a=c,s=Error(D(419)),a=Pi(s,a,void 0),qt(e,n,l,a)}if(c=(l&e.childLanes)!==0,Se||c){if(a=ue,a!==null){switch(l&-l){case 4:i=2;break;case 16:i=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:i=32;break;case 536870912:i=268435456;break;default:i=0}i=i&(a.suspendedLanes|l)?0:i,i!==0&&i!==s.retryLane&&(s.retryLane=i,mn(e,i),Ke(a,e,i,-1))}return Nl(),a=Pi(Error(D(421))),qt(e,n,l,a)}return i.data==="$?"?(n.flags|=128,n.child=e.child,n=Qf.bind(null,e),i._reactRetry=n,null):(e=s.treeContext,Te=An(i.nextSibling),De=n,X=!0,Qe=null,e!==null&&(Le[Fe++]=on,Le[Fe++]=dn,Le[Fe++]=Kn,on=e.id,dn=e.overflow,Kn=n),n=vl(n,a.children),n.flags|=4096,n)}function To(e,n,t){e.lanes|=n;var a=e.alternate;a!==null&&(a.lanes|=n),gs(e.return,n,t)}function Ei(e,n,t,a,i){var s=e.memoizedState;s===null?e.memoizedState={isBackwards:n,rendering:null,renderingStartTime:0,last:a,tail:t,tailMode:i}:(s.isBackwards=n,s.rendering=null,s.renderingStartTime=0,s.last=a,s.tail=t,s.tailMode=i)}function tu(e,n,t){var a=n.pendingProps,i=a.revealOrder,s=a.tail;if(be(e,n,a.children,t),a=Z.current,a&2)a=a&1|2,n.flags|=128;else{if(e!==null&&e.flags&128)e:for(e=n.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&To(e,t,n);else if(e.tag===19)To(e,t,n);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===n)break e;for(;e.sibling===null;){if(e.return===null||e.return===n)break e;e=e.return}e.sibling.return=e.return,e=e.sibling}a&=1}if(Y(Z,a),!(n.mode&1))n.memoizedState=null;else switch(i){case"forwards":for(t=n.child,i=null;t!==null;)e=t.alternate,e!==null&&Da(e)===null&&(i=t),t=t.sibling;t=i,t===null?(i=n.child,n.child=null):(i=t.sibling,t.sibling=null),Ei(n,!1,i,t,s);break;case"backwards":for(t=null,i=n.child,n.child=null;i!==null;){if(e=i.alternate,e!==null&&Da(e)===null){n.child=i;break}e=i.sibling,i.sibling=t,t=i,i=e}Ei(n,!0,t,null,s);break;case"together":Ei(n,!1,null,null,void 0);break;default:n.memoizedState=null}return n.child}function oa(e,n){!(n.mode&1)&&e!==null&&(e.alternate=null,n.alternate=null,n.flags|=2)}function fn(e,n,t){if(e!==null&&(n.dependencies=e.dependencies),Xn|=n.lanes,!(t&n.childLanes))return null;if(e!==null&&n.child!==e.child)throw Error(D(153));if(n.child!==null){for(e=n.child,t=zn(e,e.pendingProps),n.child=t,t.return=n;e.sibling!==null;)e=e.sibling,t=t.sibling=zn(e,e.pendingProps),t.return=n;t.sibling=null}return n.child}function Lf(e,n,t){switch(n.tag){case 3:nu(n),Nr();break;case 5:Ac(n);break;case 1:Pe(n.type)&&Sa(n);break;case 4:cl(n,n.stateNode.containerInfo);break;case 10:var a=n.type._context,i=n.memoizedProps.value;Y(Ea,a._currentValue),a._currentValue=i;break;case 13:if(a=n.memoizedState,a!==null)return a.dehydrated!==null?(Y(Z,Z.current&1),n.flags|=128,null):t&n.child.childLanes?ru(e,n,t):(Y(Z,Z.current&1),e=fn(e,n,t),e!==null?e.sibling:null);Y(Z,Z.current&1);break;case 19:if(a=(t&n.childLanes)!==0,e.flags&128){if(a)return tu(e,n,t);n.flags|=128}if(i=n.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Y(Z,Z.current),a)break;return null;case 22:case 23:return n.lanes=0,Jc(e,n,t)}return fn(e,n,t)}var au,Ns,iu,su;au=function(e,n){for(var t=n.child;t!==null;){if(t.tag===5||t.tag===6)e.appendChild(t.stateNode);else if(t.tag!==4&&t.child!==null){t.child.return=t,t=t.child;continue}if(t===n)break;for(;t.sibling===null;){if(t.return===null||t.return===n)return;t=t.return}t.sibling.return=t.return,t=t.sibling}};Ns=function(){};iu=function(e,n,t,a){var i=e.memoizedProps;if(i!==a){e=n.stateNode,Wn(rn.current);var s=null;switch(t){case"input":i=Hi(e,i),a=Hi(e,a),s=[];break;case"select":i=ee({},i,{value:void 0}),a=ee({},a,{value:void 0}),s=[];break;case"textarea":i=Ki(e,i),a=Ki(e,a),s=[];break;default:typeof i.onClick!="function"&&typeof a.onClick=="function"&&(e.onclick=ka)}Xi(t,a);var l;t=null;for(h in i)if(!a.hasOwnProperty(h)&&i.hasOwnProperty(h)&&i[h]!=null)if(h==="style"){var c=i[h];for(l in c)c.hasOwnProperty(l)&&(t||(t={}),t[l]="")}else h!=="dangerouslySetInnerHTML"&&h!=="children"&&h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&h!=="autoFocus"&&(nt.hasOwnProperty(h)?s||(s=[]):(s=s||[]).push(h,null));for(h in a){var d=a[h];if(c=i!=null?i[h]:void 0,a.hasOwnProperty(h)&&d!==c&&(d!=null||c!=null))if(h==="style")if(c){for(l in c)!c.hasOwnProperty(l)||d&&d.hasOwnProperty(l)||(t||(t={}),t[l]="");for(l in d)d.hasOwnProperty(l)&&c[l]!==d[l]&&(t||(t={}),t[l]=d[l])}else t||(s||(s=[]),s.push(h,t)),t=d;else h==="dangerouslySetInnerHTML"?(d=d?d.__html:void 0,c=c?c.__html:void 0,d!=null&&c!==d&&(s=s||[]).push(h,d)):h==="children"?typeof d!="string"&&typeof d!="number"||(s=s||[]).push(h,""+d):h!=="suppressContentEditableWarning"&&h!=="suppressHydrationWarning"&&(nt.hasOwnProperty(h)?(d!=null&&h==="onScroll"&&K("scroll",e),s||c===d||(s=[])):(s=s||[]).push(h,d))}t&&(s=s||[]).push("style",t);var h=s;(n.updateQueue=h)&&(n.flags|=4)}};su=function(e,n,t,a){t!==a&&(n.flags|=4)};function Br(e,n){if(!X)switch(e.tailMode){case"hidden":n=e.tail;for(var t=null;n!==null;)n.alternate!==null&&(t=n),n=n.sibling;t===null?e.tail=null:t.sibling=null;break;case"collapsed":t=e.tail;for(var a=null;t!==null;)t.alternate!==null&&(a=t),t=t.sibling;a===null?n||e.tail===null?e.tail=null:e.tail.sibling=null:a.sibling=null}}function ge(e){var n=e.alternate!==null&&e.alternate.child===e.child,t=0,a=0;if(n)for(var i=e.child;i!==null;)t|=i.lanes|i.childLanes,a|=i.subtreeFlags&14680064,a|=i.flags&14680064,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)t|=i.lanes|i.childLanes,a|=i.subtreeFlags,a|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=a,e.childLanes=t,n}function Ff(e,n,t){var a=n.pendingProps;switch(tl(n),n.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return ge(n),null;case 1:return Pe(n.type)&&Na(),ge(n),null;case 3:return a=n.stateNode,Cr(),G(Ce),G(ve),pl(),a.pendingContext&&(a.context=a.pendingContext,a.pendingContext=null),(e===null||e.child===null)&&(Vt(n)?n.flags|=4:e===null||e.memoizedState.isDehydrated&&!(n.flags&256)||(n.flags|=1024,Qe!==null&&(Rs(Qe),Qe=null))),Ns(e,n),ge(n),null;case 5:ul(n);var i=Wn(mt.current);if(t=n.type,e!==null&&n.stateNode!=null)iu(e,n,t,a,i),e.ref!==n.ref&&(n.flags|=512,n.flags|=2097152);else{if(!a){if(n.stateNode===null)throw Error(D(166));return ge(n),null}if(e=Wn(rn.current),Vt(n)){a=n.stateNode,t=n.type;var s=n.memoizedProps;switch(a[en]=n,a[ut]=s,e=(n.mode&1)!==0,t){case"dialog":K("cancel",a),K("close",a);break;case"iframe":case"object":case"embed":K("load",a);break;case"video":case"audio":for(i=0;i<qr.length;i++)K(qr[i],a);break;case"source":K("error",a);break;case"img":case"image":case"link":K("error",a),K("load",a);break;case"details":K("toggle",a);break;case"input":_l(a,s),K("invalid",a);break;case"select":a._wrapperState={wasMultiple:!!s.multiple},K("invalid",a);break;case"textarea":Bl(a,s),K("invalid",a)}Xi(t,s),i=null;for(var l in s)if(s.hasOwnProperty(l)){var c=s[l];l==="children"?typeof c=="string"?a.textContent!==c&&(s.suppressHydrationWarning!==!0&&$t(a.textContent,c,e),i=["children",c]):typeof c=="number"&&a.textContent!==""+c&&(s.suppressHydrationWarning!==!0&&$t(a.textContent,c,e),i=["children",""+c]):nt.hasOwnProperty(l)&&c!=null&&l==="onScroll"&&K("scroll",a)}switch(t){case"input":It(a),Ol(a,s,!0);break;case"textarea":It(a),Ul(a);break;case"select":case"option":break;default:typeof s.onClick=="function"&&(a.onclick=ka)}a=i,n.updateQueue=a,a!==null&&(n.flags|=4)}else{l=i.nodeType===9?i:i.ownerDocument,e==="http://www.w3.org/1999/xhtml"&&(e=Id(t)),e==="http://www.w3.org/1999/xhtml"?t==="script"?(e=l.createElement("div"),e.innerHTML="<script><\/script>",e=e.removeChild(e.firstChild)):typeof a.is=="string"?e=l.createElement(t,{is:a.is}):(e=l.createElement(t),t==="select"&&(l=e,a.multiple?l.multiple=!0:a.size&&(l.size=a.size))):e=l.createElementNS(e,t),e[en]=n,e[ut]=a,au(e,n,!1,!1),n.stateNode=e;e:{switch(l=Zi(t,a),t){case"dialog":K("cancel",e),K("close",e),i=a;break;case"iframe":case"object":case"embed":K("load",e),i=a;break;case"video":case"audio":for(i=0;i<qr.length;i++)K(qr[i],e);i=a;break;case"source":K("error",e),i=a;break;case"img":case"image":case"link":K("error",e),K("load",e),i=a;break;case"details":K("toggle",e),i=a;break;case"input":_l(e,a),i=Hi(e,a),K("invalid",e);break;case"option":i=a;break;case"select":e._wrapperState={wasMultiple:!!a.multiple},i=ee({},a,{value:void 0}),K("invalid",e);break;case"textarea":Bl(e,a),i=Ki(e,a),K("invalid",e);break;default:i=a}Xi(t,i),c=i;for(s in c)if(c.hasOwnProperty(s)){var d=c[s];s==="style"?Md(e,d):s==="dangerouslySetInnerHTML"?(d=d?d.__html:void 0,d!=null&&Ld(e,d)):s==="children"?typeof d=="string"?(t!=="textarea"||d!=="")&&rt(e,d):typeof d=="number"&&rt(e,""+d):s!=="suppressContentEditableWarning"&&s!=="suppressHydrationWarning"&&s!=="autoFocus"&&(nt.hasOwnProperty(s)?d!=null&&s==="onScroll"&&K("scroll",e):d!=null&&$s(e,s,d,l))}switch(t){case"input":It(e),Ol(e,a,!1);break;case"textarea":It(e),Ul(e);break;case"option":a.value!=null&&e.setAttribute("value",""+In(a.value));break;case"select":e.multiple=!!a.multiple,s=a.value,s!=null?gr(e,!!a.multiple,s,!1):a.defaultValue!=null&&gr(e,!!a.multiple,a.defaultValue,!0);break;default:typeof i.onClick=="function"&&(e.onclick=ka)}switch(t){case"button":case"input":case"select":case"textarea":a=!!a.autoFocus;break e;case"img":a=!0;break e;default:a=!1}}a&&(n.flags|=4)}n.ref!==null&&(n.flags|=512,n.flags|=2097152)}return ge(n),null;case 6:if(e&&n.stateNode!=null)su(e,n,e.memoizedProps,a);else{if(typeof a!="string"&&n.stateNode===null)throw Error(D(166));if(t=Wn(mt.current),Wn(rn.current),Vt(n)){if(a=n.stateNode,t=n.memoizedProps,a[en]=n,(s=a.nodeValue!==t)&&(e=De,e!==null))switch(e.tag){case 3:$t(a.nodeValue,t,(e.mode&1)!==0);break;case 5:e.memoizedProps.suppressHydrationWarning!==!0&&$t(a.nodeValue,t,(e.mode&1)!==0)}s&&(n.flags|=4)}else a=(t.nodeType===9?t:t.ownerDocument).createTextNode(a),a[en]=n,n.stateNode=a}return ge(n),null;case 13:if(G(Z),a=n.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(X&&Te!==null&&n.mode&1&&!(n.flags&128))Nc(),Nr(),n.flags|=98560,s=!1;else if(s=Vt(n),a!==null&&a.dehydrated!==null){if(e===null){if(!s)throw Error(D(318));if(s=n.memoizedState,s=s!==null?s.dehydrated:null,!s)throw Error(D(317));s[en]=n}else Nr(),!(n.flags&128)&&(n.memoizedState=null),n.flags|=4;ge(n),s=!1}else Qe!==null&&(Rs(Qe),Qe=null),s=!0;if(!s)return n.flags&65536?n:null}return n.flags&128?(n.lanes=t,n):(a=a!==null,a!==(e!==null&&e.memoizedState!==null)&&a&&(n.child.flags|=8192,n.mode&1&&(e===null||Z.current&1?de===0&&(de=3):Nl())),n.updateQueue!==null&&(n.flags|=4),ge(n),null);case 4:return Cr(),Ns(e,n),e===null&&dt(n.stateNode.containerInfo),ge(n),null;case 10:return ll(n.type._context),ge(n),null;case 17:return Pe(n.type)&&Na(),ge(n),null;case 19:if(G(Z),s=n.memoizedState,s===null)return ge(n),null;if(a=(n.flags&128)!==0,l=s.rendering,l===null)if(a)Br(s,!1);else{if(de!==0||e!==null&&e.flags&128)for(e=n.child;e!==null;){if(l=Da(e),l!==null){for(n.flags|=128,Br(s,!1),a=l.updateQueue,a!==null&&(n.updateQueue=a,n.flags|=4),n.subtreeFlags=0,a=t,t=n.child;t!==null;)s=t,e=a,s.flags&=14680066,l=s.alternate,l===null?(s.childLanes=0,s.lanes=e,s.child=null,s.subtreeFlags=0,s.memoizedProps=null,s.memoizedState=null,s.updateQueue=null,s.dependencies=null,s.stateNode=null):(s.childLanes=l.childLanes,s.lanes=l.lanes,s.child=l.child,s.subtreeFlags=0,s.deletions=null,s.memoizedProps=l.memoizedProps,s.memoizedState=l.memoizedState,s.updateQueue=l.updateQueue,s.type=l.type,e=l.dependencies,s.dependencies=e===null?null:{lanes:e.lanes,firstContext:e.firstContext}),t=t.sibling;return Y(Z,Z.current&1|2),n.child}e=e.sibling}s.tail!==null&&te()>Er&&(n.flags|=128,a=!0,Br(s,!1),n.lanes=4194304)}else{if(!a)if(e=Da(l),e!==null){if(n.flags|=128,a=!0,t=e.updateQueue,t!==null&&(n.updateQueue=t,n.flags|=4),Br(s,!0),s.tail===null&&s.tailMode==="hidden"&&!l.alternate&&!X)return ge(n),null}else 2*te()-s.renderingStartTime>Er&&t!==1073741824&&(n.flags|=128,a=!0,Br(s,!1),n.lanes=4194304);s.isBackwards?(l.sibling=n.child,n.child=l):(t=s.last,t!==null?t.sibling=l:n.child=l,s.last=l)}return s.tail!==null?(n=s.tail,s.rendering=n,s.tail=n.sibling,s.renderingStartTime=te(),n.sibling=null,t=Z.current,Y(Z,a?t&1|2:t&1),n):(ge(n),null);case 22:case 23:return kl(),a=n.memoizedState!==null,e!==null&&e.memoizedState!==null!==a&&(n.flags|=8192),a&&n.mode&1?Ae&1073741824&&(ge(n),n.subtreeFlags&6&&(n.flags|=8192)):ge(n),null;case 24:return null;case 25:return null}throw Error(D(156,n.tag))}function Mf(e,n){switch(tl(n),n.tag){case 1:return Pe(n.type)&&Na(),e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 3:return Cr(),G(Ce),G(ve),pl(),e=n.flags,e&65536&&!(e&128)?(n.flags=e&-65537|128,n):null;case 5:return ul(n),null;case 13:if(G(Z),e=n.memoizedState,e!==null&&e.dehydrated!==null){if(n.alternate===null)throw Error(D(340));Nr()}return e=n.flags,e&65536?(n.flags=e&-65537|128,n):null;case 19:return G(Z),null;case 4:return Cr(),null;case 10:return ll(n.type._context),null;case 22:case 23:return kl(),null;case 24:return null;default:return null}}var Ht=!1,xe=!1,_f=typeof WeakSet=="function"?WeakSet:Set,M=null;function mr(e,n){var t=e.ref;if(t!==null)if(typeof t=="function")try{t(null)}catch(a){ne(e,n,a)}else t.current=null}function Ss(e,n,t){try{t()}catch(a){ne(e,n,a)}}var Do=!1;function Of(e,n){if(os=ba,e=uc(),nl(e)){if("selectionStart"in e)var t={start:e.selectionStart,end:e.selectionEnd};else e:{t=(t=e.ownerDocument)&&t.defaultView||window;var a=t.getSelection&&t.getSelection();if(a&&a.rangeCount!==0){t=a.anchorNode;var i=a.anchorOffset,s=a.focusNode;a=a.focusOffset;try{t.nodeType,s.nodeType}catch{t=null;break e}var l=0,c=-1,d=-1,h=0,f=0,x=e,p=null;n:for(;;){for(var y;x!==t||i!==0&&x.nodeType!==3||(c=l+i),x!==s||a!==0&&x.nodeType!==3||(d=l+a),x.nodeType===3&&(l+=x.nodeValue.length),(y=x.firstChild)!==null;)p=x,x=y;for(;;){if(x===e)break n;if(p===t&&++h===i&&(c=l),p===s&&++f===a&&(d=l),(y=x.nextSibling)!==null)break;x=p,p=x.parentNode}x=y}t=c===-1||d===-1?null:{start:c,end:d}}else t=null}t=t||{start:0,end:0}}else t=null;for(ds={focusedElem:e,selectionRange:t},ba=!1,M=n;M!==null;)if(n=M,e=n.child,(n.subtreeFlags&1028)!==0&&e!==null)e.return=n,M=e;else for(;M!==null;){n=M;try{var N=n.alternate;if(n.flags&1024)switch(n.tag){case 0:case 11:case 15:break;case 1:if(N!==null){var S=N.memoizedProps,b=N.memoizedState,u=n.stateNode,m=u.getSnapshotBeforeUpdate(n.elementType===n.type?S:qe(n.type,S),b);u.__reactInternalSnapshotBeforeUpdate=m}break;case 3:var v=n.stateNode.containerInfo;v.nodeType===1?v.textContent="":v.nodeType===9&&v.documentElement&&v.removeChild(v.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(D(163))}}catch(P){ne(n,n.return,P)}if(e=n.sibling,e!==null){e.return=n.return,M=e;break}M=n.return}return N=Do,Do=!1,N}function Zr(e,n,t){var a=n.updateQueue;if(a=a!==null?a.lastEffect:null,a!==null){var i=a=a.next;do{if((i.tag&e)===e){var s=i.destroy;i.destroy=void 0,s!==void 0&&Ss(n,t,s)}i=i.next}while(i!==a)}}function Ka(e,n){if(n=n.updateQueue,n=n!==null?n.lastEffect:null,n!==null){var t=n=n.next;do{if((t.tag&e)===e){var a=t.create;t.destroy=a()}t=t.next}while(t!==n)}}function Cs(e){var n=e.ref;if(n!==null){var t=e.stateNode;switch(e.tag){case 5:e=t;break;default:e=t}typeof n=="function"?n(e):n.current=e}}function lu(e){var n=e.alternate;n!==null&&(e.alternate=null,lu(n)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(n=e.stateNode,n!==null&&(delete n[en],delete n[ut],delete n[ps],delete n[jf],delete n[wf])),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}function ou(e){return e.tag===5||e.tag===3||e.tag===4}function Ro(e){e:for(;;){for(;e.sibling===null;){if(e.return===null||ou(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.flags&2||e.child===null||e.tag===4)continue e;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ps(e,n,t){var a=e.tag;if(a===5||a===6)e=e.stateNode,n?t.nodeType===8?t.parentNode.insertBefore(e,n):t.insertBefore(e,n):(t.nodeType===8?(n=t.parentNode,n.insertBefore(e,t)):(n=t,n.appendChild(e)),t=t._reactRootContainer,t!=null||n.onclick!==null||(n.onclick=ka));else if(a!==4&&(e=e.child,e!==null))for(Ps(e,n,t),e=e.sibling;e!==null;)Ps(e,n,t),e=e.sibling}function Es(e,n,t){var a=e.tag;if(a===5||a===6)e=e.stateNode,n?t.insertBefore(e,n):t.appendChild(e);else if(a!==4&&(e=e.child,e!==null))for(Es(e,n,t),e=e.sibling;e!==null;)Es(e,n,t),e=e.sibling}var pe=null,He=!1;function xn(e,n,t){for(t=t.child;t!==null;)du(e,n,t),t=t.sibling}function du(e,n,t){if(nn&&typeof nn.onCommitFiberUnmount=="function")try{nn.onCommitFiberUnmount(Ua,t)}catch{}switch(t.tag){case 5:xe||mr(t,n);case 6:var a=pe,i=He;pe=null,xn(e,n,t),pe=a,He=i,pe!==null&&(He?(e=pe,t=t.stateNode,e.nodeType===8?e.parentNode.removeChild(t):e.removeChild(t)):pe.removeChild(t.stateNode));break;case 18:pe!==null&&(He?(e=pe,t=t.stateNode,e.nodeType===8?ji(e.parentNode,t):e.nodeType===1&&ji(e,t),st(e)):ji(pe,t.stateNode));break;case 4:a=pe,i=He,pe=t.stateNode.containerInfo,He=!0,xn(e,n,t),pe=a,He=i;break;case 0:case 11:case 14:case 15:if(!xe&&(a=t.updateQueue,a!==null&&(a=a.lastEffect,a!==null))){i=a=a.next;do{var s=i,l=s.destroy;s=s.tag,l!==void 0&&(s&2||s&4)&&Ss(t,n,l),i=i.next}while(i!==a)}xn(e,n,t);break;case 1:if(!xe&&(mr(t,n),a=t.stateNode,typeof a.componentWillUnmount=="function"))try{a.props=t.memoizedProps,a.state=t.memoizedState,a.componentWillUnmount()}catch(c){ne(t,n,c)}xn(e,n,t);break;case 21:xn(e,n,t);break;case 22:t.mode&1?(xe=(a=xe)||t.memoizedState!==null,xn(e,n,t),xe=a):xn(e,n,t);break;default:xn(e,n,t)}}function zo(e){var n=e.updateQueue;if(n!==null){e.updateQueue=null;var t=e.stateNode;t===null&&(t=e.stateNode=new _f),n.forEach(function(a){var i=Yf.bind(null,e,a);t.has(a)||(t.add(a),a.then(i,i))})}}function We(e,n){var t=n.deletions;if(t!==null)for(var a=0;a<t.length;a++){var i=t[a];try{var s=e,l=n,c=l;e:for(;c!==null;){switch(c.tag){case 5:pe=c.stateNode,He=!1;break e;case 3:pe=c.stateNode.containerInfo,He=!0;break e;case 4:pe=c.stateNode.containerInfo,He=!0;break e}c=c.return}if(pe===null)throw Error(D(160));du(s,l,i),pe=null,He=!1;var d=i.alternate;d!==null&&(d.return=null),i.return=null}catch(h){ne(i,n,h)}}if(n.subtreeFlags&12854)for(n=n.child;n!==null;)cu(n,e),n=n.sibling}function cu(e,n){var t=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(We(n,e),Ze(e),a&4){try{Zr(3,e,e.return),Ka(3,e)}catch(S){ne(e,e.return,S)}try{Zr(5,e,e.return)}catch(S){ne(e,e.return,S)}}break;case 1:We(n,e),Ze(e),a&512&&t!==null&&mr(t,t.return);break;case 5:if(We(n,e),Ze(e),a&512&&t!==null&&mr(t,t.return),e.flags&32){var i=e.stateNode;try{rt(i,"")}catch(S){ne(e,e.return,S)}}if(a&4&&(i=e.stateNode,i!=null)){var s=e.memoizedProps,l=t!==null?t.memoizedProps:s,c=e.type,d=e.updateQueue;if(e.updateQueue=null,d!==null)try{c==="input"&&s.type==="radio"&&s.name!=null&&Rd(i,s),Zi(c,l);var h=Zi(c,s);for(l=0;l<d.length;l+=2){var f=d[l],x=d[l+1];f==="style"?Md(i,x):f==="dangerouslySetInnerHTML"?Ld(i,x):f==="children"?rt(i,x):$s(i,f,x,h)}switch(c){case"input":Qi(i,s);break;case"textarea":zd(i,s);break;case"select":var p=i._wrapperState.wasMultiple;i._wrapperState.wasMultiple=!!s.multiple;var y=s.value;y!=null?gr(i,!!s.multiple,y,!1):p!==!!s.multiple&&(s.defaultValue!=null?gr(i,!!s.multiple,s.defaultValue,!0):gr(i,!!s.multiple,s.multiple?[]:"",!1))}i[ut]=s}catch(S){ne(e,e.return,S)}}break;case 6:if(We(n,e),Ze(e),a&4){if(e.stateNode===null)throw Error(D(162));i=e.stateNode,s=e.memoizedProps;try{i.nodeValue=s}catch(S){ne(e,e.return,S)}}break;case 3:if(We(n,e),Ze(e),a&4&&t!==null&&t.memoizedState.isDehydrated)try{st(n.containerInfo)}catch(S){ne(e,e.return,S)}break;case 4:We(n,e),Ze(e);break;case 13:We(n,e),Ze(e),i=e.child,i.flags&8192&&(s=i.memoizedState!==null,i.stateNode.isHidden=s,!s||i.alternate!==null&&i.alternate.memoizedState!==null||(jl=te())),a&4&&zo(e);break;case 22:if(f=t!==null&&t.memoizedState!==null,e.mode&1?(xe=(h=xe)||f,We(n,e),xe=h):We(n,e),Ze(e),a&8192){if(h=e.memoizedState!==null,(e.stateNode.isHidden=h)&&!f&&e.mode&1)for(M=e,f=e.child;f!==null;){for(x=M=f;M!==null;){switch(p=M,y=p.child,p.tag){case 0:case 11:case 14:case 15:Zr(4,p,p.return);break;case 1:mr(p,p.return);var N=p.stateNode;if(typeof N.componentWillUnmount=="function"){a=p,t=p.return;try{n=a,N.props=n.memoizedProps,N.state=n.memoizedState,N.componentWillUnmount()}catch(S){ne(a,t,S)}}break;case 5:mr(p,p.return);break;case 22:if(p.memoizedState!==null){Lo(x);continue}}y!==null?(y.return=p,M=y):Lo(x)}f=f.sibling}e:for(f=null,x=e;;){if(x.tag===5){if(f===null){f=x;try{i=x.stateNode,h?(s=i.style,typeof s.setProperty=="function"?s.setProperty("display","none","important"):s.display="none"):(c=x.stateNode,d=x.memoizedProps.style,l=d!=null&&d.hasOwnProperty("display")?d.display:null,c.style.display=Fd("display",l))}catch(S){ne(e,e.return,S)}}}else if(x.tag===6){if(f===null)try{x.stateNode.nodeValue=h?"":x.memoizedProps}catch(S){ne(e,e.return,S)}}else if((x.tag!==22&&x.tag!==23||x.memoizedState===null||x===e)&&x.child!==null){x.child.return=x,x=x.child;continue}if(x===e)break e;for(;x.sibling===null;){if(x.return===null||x.return===e)break e;f===x&&(f=null),x=x.return}f===x&&(f=null),x.sibling.return=x.return,x=x.sibling}}break;case 19:We(n,e),Ze(e),a&4&&zo(e);break;case 21:break;default:We(n,e),Ze(e)}}function Ze(e){var n=e.flags;if(n&2){try{e:{for(var t=e.return;t!==null;){if(ou(t)){var a=t;break e}t=t.return}throw Error(D(160))}switch(a.tag){case 5:var i=a.stateNode;a.flags&32&&(rt(i,""),a.flags&=-33);var s=Ro(e);Es(e,s,i);break;case 3:case 4:var l=a.stateNode.containerInfo,c=Ro(e);Ps(e,c,l);break;default:throw Error(D(161))}}catch(d){ne(e,e.return,d)}e.flags&=-3}n&4096&&(e.flags&=-4097)}function Bf(e,n,t){M=e,uu(e)}function uu(e,n,t){for(var a=(e.mode&1)!==0;M!==null;){var i=M,s=i.child;if(i.tag===22&&a){var l=i.memoizedState!==null||Ht;if(!l){var c=i.alternate,d=c!==null&&c.memoizedState!==null||xe;c=Ht;var h=xe;if(Ht=l,(xe=d)&&!h)for(M=i;M!==null;)l=M,d=l.child,l.tag===22&&l.memoizedState!==null?Fo(i):d!==null?(d.return=l,M=d):Fo(i);for(;s!==null;)M=s,uu(s),s=s.sibling;M=i,Ht=c,xe=h}Io(e)}else i.subtreeFlags&8772&&s!==null?(s.return=i,M=s):Io(e)}}function Io(e){for(;M!==null;){var n=M;if(n.flags&8772){var t=n.alternate;try{if(n.flags&8772)switch(n.tag){case 0:case 11:case 15:xe||Ka(5,n);break;case 1:var a=n.stateNode;if(n.flags&4&&!xe)if(t===null)a.componentDidMount();else{var i=n.elementType===n.type?t.memoizedProps:qe(n.type,t.memoizedProps);a.componentDidUpdate(i,t.memoizedState,a.__reactInternalSnapshotBeforeUpdate)}var s=n.updateQueue;s!==null&&vo(n,s,a);break;case 3:var l=n.updateQueue;if(l!==null){if(t=null,n.child!==null)switch(n.child.tag){case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}vo(n,l,t)}break;case 5:var c=n.stateNode;if(t===null&&n.flags&4){t=c;var d=n.memoizedProps;switch(n.type){case"button":case"input":case"select":case"textarea":d.autoFocus&&t.focus();break;case"img":d.src&&(t.src=d.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(n.memoizedState===null){var h=n.alternate;if(h!==null){var f=h.memoizedState;if(f!==null){var x=f.dehydrated;x!==null&&st(x)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(D(163))}xe||n.flags&512&&Cs(n)}catch(p){ne(n,n.return,p)}}if(n===e){M=null;break}if(t=n.sibling,t!==null){t.return=n.return,M=t;break}M=n.return}}function Lo(e){for(;M!==null;){var n=M;if(n===e){M=null;break}var t=n.sibling;if(t!==null){t.return=n.return,M=t;break}M=n.return}}function Fo(e){for(;M!==null;){var n=M;try{switch(n.tag){case 0:case 11:case 15:var t=n.return;try{Ka(4,n)}catch(d){ne(n,t,d)}break;case 1:var a=n.stateNode;if(typeof a.componentDidMount=="function"){var i=n.return;try{a.componentDidMount()}catch(d){ne(n,i,d)}}var s=n.return;try{Cs(n)}catch(d){ne(n,s,d)}break;case 5:var l=n.return;try{Cs(n)}catch(d){ne(n,l,d)}}}catch(d){ne(n,n.return,d)}if(n===e){M=null;break}var c=n.sibling;if(c!==null){c.return=n.return,M=c;break}M=n.return}}var Uf=Math.ceil,Ia=hn.ReactCurrentDispatcher,yl=hn.ReactCurrentOwner,_e=hn.ReactCurrentBatchConfig,W=0,ue=null,ie=null,me=0,Ae=0,fr=Mn(0),de=0,xt=null,Xn=0,Ga=0,bl=0,Jr=null,Ne=null,jl=0,Er=1/0,sn=null,La=!1,As=null,Dn=null,Qt=!1,Nn=null,Fa=0,et=0,Ts=null,da=-1,ca=0;function je(){return W&6?te():da!==-1?da:da=te()}function Rn(e){return e.mode&1?W&2&&me!==0?me&-me:Nf.transition!==null?(ca===0&&(ca=Kd()),ca):(e=q,e!==0||(e=window.event,e=e===void 0?16:rc(e.type)),e):1}function Ke(e,n,t,a){if(50<et)throw et=0,Ts=null,Error(D(185));jt(e,t,a),(!(W&2)||e!==ue)&&(e===ue&&(!(W&2)&&(Ga|=t),de===4&&wn(e,me)),Ee(e,a),t===1&&W===0&&!(n.mode&1)&&(Er=te()+500,Ha&&_n()))}function Ee(e,n){var t=e.callbackNode;km(e,n);var a=ya(e,e===ue?me:0);if(a===0)t!==null&&Wl(t),e.callbackNode=null,e.callbackPriority=0;else if(n=a&-a,e.callbackPriority!==n){if(t!=null&&Wl(t),n===1)e.tag===0?kf(Mo.bind(null,e)):jc(Mo.bind(null,e)),yf(function(){!(W&6)&&_n()}),t=null;else{switch(Gd(a)){case 1:t=Qs;break;case 4:t=Qd;break;case 16:t=va;break;case 536870912:t=Yd;break;default:t=va}t=yu(t,pu.bind(null,e))}e.callbackPriority=n,e.callbackNode=t}}function pu(e,n){if(da=-1,ca=0,W&6)throw Error(D(327));var t=e.callbackNode;if(jr()&&e.callbackNode!==t)return null;var a=ya(e,e===ue?me:0);if(a===0)return null;if(a&30||a&e.expiredLanes||n)n=Ma(e,a);else{n=a;var i=W;W|=2;var s=fu();(ue!==e||me!==n)&&(sn=null,Er=te()+500,qn(e,n));do try{Wf();break}catch(c){mu(e,c)}while(!0);sl(),Ia.current=s,W=i,ie!==null?n=0:(ue=null,me=0,n=de)}if(n!==0){if(n===2&&(i=ts(e),i!==0&&(a=i,n=Ds(e,i))),n===1)throw t=xt,qn(e,0),wn(e,a),Ee(e,te()),t;if(n===6)wn(e,a);else{if(i=e.current.alternate,!(a&30)&&!$f(i)&&(n=Ma(e,a),n===2&&(s=ts(e),s!==0&&(a=s,n=Ds(e,s))),n===1))throw t=xt,qn(e,0),wn(e,a),Ee(e,te()),t;switch(e.finishedWork=i,e.finishedLanes=a,n){case 0:case 1:throw Error(D(345));case 2:Bn(e,Ne,sn);break;case 3:if(wn(e,a),(a&130023424)===a&&(n=jl+500-te(),10<n)){if(ya(e,0)!==0)break;if(i=e.suspendedLanes,(i&a)!==a){je(),e.pingedLanes|=e.suspendedLanes&i;break}e.timeoutHandle=us(Bn.bind(null,e,Ne,sn),n);break}Bn(e,Ne,sn);break;case 4:if(wn(e,a),(a&4194240)===a)break;for(n=e.eventTimes,i=-1;0<a;){var l=31-Ye(a);s=1<<l,l=n[l],l>i&&(i=l),a&=~s}if(a=i,a=te()-a,a=(120>a?120:480>a?480:1080>a?1080:1920>a?1920:3e3>a?3e3:4320>a?4320:1960*Uf(a/1960))-a,10<a){e.timeoutHandle=us(Bn.bind(null,e,Ne,sn),a);break}Bn(e,Ne,sn);break;case 5:Bn(e,Ne,sn);break;default:throw Error(D(329))}}}return Ee(e,te()),e.callbackNode===t?pu.bind(null,e):null}function Ds(e,n){var t=Jr;return e.current.memoizedState.isDehydrated&&(qn(e,n).flags|=256),e=Ma(e,n),e!==2&&(n=Ne,Ne=t,n!==null&&Rs(n)),e}function Rs(e){Ne===null?Ne=e:Ne.push.apply(Ne,e)}function $f(e){for(var n=e;;){if(n.flags&16384){var t=n.updateQueue;if(t!==null&&(t=t.stores,t!==null))for(var a=0;a<t.length;a++){var i=t[a],s=i.getSnapshot;i=i.value;try{if(!Ge(s(),i))return!1}catch{return!1}}}if(t=n.child,n.subtreeFlags&16384&&t!==null)t.return=n,n=t;else{if(n===e)break;for(;n.sibling===null;){if(n.return===null||n.return===e)return!0;n=n.return}n.sibling.return=n.return,n=n.sibling}}return!0}function wn(e,n){for(n&=~bl,n&=~Ga,e.suspendedLanes|=n,e.pingedLanes&=~n,e=e.expirationTimes;0<n;){var t=31-Ye(n),a=1<<t;e[t]=-1,n&=~a}}function Mo(e){if(W&6)throw Error(D(327));jr();var n=ya(e,0);if(!(n&1))return Ee(e,te()),null;var t=Ma(e,n);if(e.tag!==0&&t===2){var a=ts(e);a!==0&&(n=a,t=Ds(e,a))}if(t===1)throw t=xt,qn(e,0),wn(e,n),Ee(e,te()),t;if(t===6)throw Error(D(345));return e.finishedWork=e.current.alternate,e.finishedLanes=n,Bn(e,Ne,sn),Ee(e,te()),null}function wl(e,n){var t=W;W|=1;try{return e(n)}finally{W=t,W===0&&(Er=te()+500,Ha&&_n())}}function Zn(e){Nn!==null&&Nn.tag===0&&!(W&6)&&jr();var n=W;W|=1;var t=_e.transition,a=q;try{if(_e.transition=null,q=1,e)return e()}finally{q=a,_e.transition=t,W=n,!(W&6)&&_n()}}function kl(){Ae=fr.current,G(fr)}function qn(e,n){e.finishedWork=null,e.finishedLanes=0;var t=e.timeoutHandle;if(t!==-1&&(e.timeoutHandle=-1,vf(t)),ie!==null)for(t=ie.return;t!==null;){var a=t;switch(tl(a),a.tag){case 1:a=a.type.childContextTypes,a!=null&&Na();break;case 3:Cr(),G(Ce),G(ve),pl();break;case 5:ul(a);break;case 4:Cr();break;case 13:G(Z);break;case 19:G(Z);break;case 10:ll(a.type._context);break;case 22:case 23:kl()}t=t.return}if(ue=e,ie=e=zn(e.current,null),me=Ae=n,de=0,xt=null,bl=Ga=Xn=0,Ne=Jr=null,Vn!==null){for(n=0;n<Vn.length;n++)if(t=Vn[n],a=t.interleaved,a!==null){t.interleaved=null;var i=a.next,s=t.pending;if(s!==null){var l=s.next;s.next=i,a.next=l}t.pending=a}Vn=null}return e}function mu(e,n){do{var t=ie;try{if(sl(),sa.current=za,Ra){for(var a=J.memoizedState;a!==null;){var i=a.queue;i!==null&&(i.pending=null),a=a.next}Ra=!1}if(Gn=0,ce=oe=J=null,Xr=!1,ft=0,yl.current=null,t===null||t.return===null){de=1,xt=n,ie=null;break}e:{var s=e,l=t.return,c=t,d=n;if(n=me,c.flags|=32768,d!==null&&typeof d=="object"&&typeof d.then=="function"){var h=d,f=c,x=f.tag;if(!(f.mode&1)&&(x===0||x===11||x===15)){var p=f.alternate;p?(f.updateQueue=p.updateQueue,f.memoizedState=p.memoizedState,f.lanes=p.lanes):(f.updateQueue=null,f.memoizedState=null)}var y=No(l);if(y!==null){y.flags&=-257,So(y,l,c,s,n),y.mode&1&&ko(s,h,n),n=y,d=h;var N=n.updateQueue;if(N===null){var S=new Set;S.add(d),n.updateQueue=S}else N.add(d);break e}else{if(!(n&1)){ko(s,h,n),Nl();break e}d=Error(D(426))}}else if(X&&c.mode&1){var b=No(l);if(b!==null){!(b.flags&65536)&&(b.flags|=256),So(b,l,c,s,n),al(Pr(d,c));break e}}s=d=Pr(d,c),de!==4&&(de=2),Jr===null?Jr=[s]:Jr.push(s),s=l;do{switch(s.tag){case 3:s.flags|=65536,n&=-n,s.lanes|=n;var u=Gc(s,d,n);xo(s,u);break e;case 1:c=d;var m=s.type,v=s.stateNode;if(!(s.flags&128)&&(typeof m.getDerivedStateFromError=="function"||v!==null&&typeof v.componentDidCatch=="function"&&(Dn===null||!Dn.has(v)))){s.flags|=65536,n&=-n,s.lanes|=n;var P=Xc(s,c,n);xo(s,P);break e}}s=s.return}while(s!==null)}gu(t)}catch(E){n=E,ie===t&&t!==null&&(ie=t=t.return);continue}break}while(!0)}function fu(){var e=Ia.current;return Ia.current=za,e===null?za:e}function Nl(){(de===0||de===3||de===2)&&(de=4),ue===null||!(Xn&268435455)&&!(Ga&268435455)||wn(ue,me)}function Ma(e,n){var t=W;W|=2;var a=fu();(ue!==e||me!==n)&&(sn=null,qn(e,n));do try{Vf();break}catch(i){mu(e,i)}while(!0);if(sl(),W=t,Ia.current=a,ie!==null)throw Error(D(261));return ue=null,me=0,de}function Vf(){for(;ie!==null;)hu(ie)}function Wf(){for(;ie!==null&&!fm();)hu(ie)}function hu(e){var n=vu(e.alternate,e,Ae);e.memoizedProps=e.pendingProps,n===null?gu(e):ie=n,yl.current=null}function gu(e){var n=e;do{var t=n.alternate;if(e=n.return,n.flags&32768){if(t=Mf(t,n),t!==null){t.flags&=32767,ie=t;return}if(e!==null)e.flags|=32768,e.subtreeFlags=0,e.deletions=null;else{de=6,ie=null;return}}else if(t=Ff(t,n,Ae),t!==null){ie=t;return}if(n=n.sibling,n!==null){ie=n;return}ie=n=e}while(n!==null);de===0&&(de=5)}function Bn(e,n,t){var a=q,i=_e.transition;try{_e.transition=null,q=1,qf(e,n,t,a)}finally{_e.transition=i,q=a}return null}function qf(e,n,t,a){do jr();while(Nn!==null);if(W&6)throw Error(D(327));t=e.finishedWork;var i=e.finishedLanes;if(t===null)return null;if(e.finishedWork=null,e.finishedLanes=0,t===e.current)throw Error(D(177));e.callbackNode=null,e.callbackPriority=0;var s=t.lanes|t.childLanes;if(Nm(e,s),e===ue&&(ie=ue=null,me=0),!(t.subtreeFlags&2064)&&!(t.flags&2064)||Qt||(Qt=!0,yu(va,function(){return jr(),null})),s=(t.flags&15990)!==0,t.subtreeFlags&15990||s){s=_e.transition,_e.transition=null;var l=q;q=1;var c=W;W|=4,yl.current=null,Of(e,t),cu(t,e),uf(ds),ba=!!os,ds=os=null,e.current=t,Bf(t),hm(),W=c,q=l,_e.transition=s}else e.current=t;if(Qt&&(Qt=!1,Nn=e,Fa=i),s=e.pendingLanes,s===0&&(Dn=null),vm(t.stateNode),Ee(e,te()),n!==null)for(a=e.onRecoverableError,t=0;t<n.length;t++)i=n[t],a(i.value,{componentStack:i.stack,digest:i.digest});if(La)throw La=!1,e=As,As=null,e;return Fa&1&&e.tag!==0&&jr(),s=e.pendingLanes,s&1?e===Ts?et++:(et=0,Ts=e):et=0,_n(),null}function jr(){if(Nn!==null){var e=Gd(Fa),n=_e.transition,t=q;try{if(_e.transition=null,q=16>e?16:e,Nn===null)var a=!1;else{if(e=Nn,Nn=null,Fa=0,W&6)throw Error(D(331));var i=W;for(W|=4,M=e.current;M!==null;){var s=M,l=s.child;if(M.flags&16){var c=s.deletions;if(c!==null){for(var d=0;d<c.length;d++){var h=c[d];for(M=h;M!==null;){var f=M;switch(f.tag){case 0:case 11:case 15:Zr(8,f,s)}var x=f.child;if(x!==null)x.return=f,M=x;else for(;M!==null;){f=M;var p=f.sibling,y=f.return;if(lu(f),f===h){M=null;break}if(p!==null){p.return=y,M=p;break}M=y}}}var N=s.alternate;if(N!==null){var S=N.child;if(S!==null){N.child=null;do{var b=S.sibling;S.sibling=null,S=b}while(S!==null)}}M=s}}if(s.subtreeFlags&2064&&l!==null)l.return=s,M=l;else e:for(;M!==null;){if(s=M,s.flags&2048)switch(s.tag){case 0:case 11:case 15:Zr(9,s,s.return)}var u=s.sibling;if(u!==null){u.return=s.return,M=u;break e}M=s.return}}var m=e.current;for(M=m;M!==null;){l=M;var v=l.child;if(l.subtreeFlags&2064&&v!==null)v.return=l,M=v;else e:for(l=m;M!==null;){if(c=M,c.flags&2048)try{switch(c.tag){case 0:case 11:case 15:Ka(9,c)}}catch(E){ne(c,c.return,E)}if(c===l){M=null;break e}var P=c.sibling;if(P!==null){P.return=c.return,M=P;break e}M=c.return}}if(W=i,_n(),nn&&typeof nn.onPostCommitFiberRoot=="function")try{nn.onPostCommitFiberRoot(Ua,e)}catch{}a=!0}return a}finally{q=t,_e.transition=n}}return!1}function _o(e,n,t){n=Pr(t,n),n=Gc(e,n,1),e=Tn(e,n,1),n=je(),e!==null&&(jt(e,1,n),Ee(e,n))}function ne(e,n,t){if(e.tag===3)_o(e,e,t);else for(;n!==null;){if(n.tag===3){_o(n,e,t);break}else if(n.tag===1){var a=n.stateNode;if(typeof n.type.getDerivedStateFromError=="function"||typeof a.componentDidCatch=="function"&&(Dn===null||!Dn.has(a))){e=Pr(t,e),e=Xc(n,e,1),n=Tn(n,e,1),e=je(),n!==null&&(jt(n,1,e),Ee(n,e));break}}n=n.return}}function Hf(e,n,t){var a=e.pingCache;a!==null&&a.delete(n),n=je(),e.pingedLanes|=e.suspendedLanes&t,ue===e&&(me&t)===t&&(de===4||de===3&&(me&130023424)===me&&500>te()-jl?qn(e,0):bl|=t),Ee(e,n)}function xu(e,n){n===0&&(e.mode&1?(n=Mt,Mt<<=1,!(Mt&130023424)&&(Mt=4194304)):n=1);var t=je();e=mn(e,n),e!==null&&(jt(e,n,t),Ee(e,t))}function Qf(e){var n=e.memoizedState,t=0;n!==null&&(t=n.retryLane),xu(e,t)}function Yf(e,n){var t=0;switch(e.tag){case 13:var a=e.stateNode,i=e.memoizedState;i!==null&&(t=i.retryLane);break;case 19:a=e.stateNode;break;default:throw Error(D(314))}a!==null&&a.delete(n),xu(e,t)}var vu;vu=function(e,n,t){if(e!==null)if(e.memoizedProps!==n.pendingProps||Ce.current)Se=!0;else{if(!(e.lanes&t)&&!(n.flags&128))return Se=!1,Lf(e,n,t);Se=!!(e.flags&131072)}else Se=!1,X&&n.flags&1048576&&wc(n,Pa,n.index);switch(n.lanes=0,n.tag){case 2:var a=n.type;oa(e,n),e=n.pendingProps;var i=kr(n,ve.current);br(n,t),i=fl(null,n,a,e,i,t);var s=hl();return n.flags|=1,typeof i=="object"&&i!==null&&typeof i.render=="function"&&i.$$typeof===void 0?(n.tag=1,n.memoizedState=null,n.updateQueue=null,Pe(a)?(s=!0,Sa(n)):s=!1,n.memoizedState=i.state!==null&&i.state!==void 0?i.state:null,dl(n),i.updater=Ya,n.stateNode=i,i._reactInternals=n,vs(n,a,e,t),n=js(null,n,a,!0,s,t)):(n.tag=0,X&&s&&rl(n),be(null,n,i,t),n=n.child),n;case 16:a=n.elementType;e:{switch(oa(e,n),e=n.pendingProps,i=a._init,a=i(a._payload),n.type=a,i=n.tag=Gf(a),e=qe(a,e),i){case 0:n=bs(null,n,a,e,t);break e;case 1:n=Eo(null,n,a,e,t);break e;case 11:n=Co(null,n,a,e,t);break e;case 14:n=Po(null,n,a,qe(a.type,e),t);break e}throw Error(D(306,a,""))}return n;case 0:return a=n.type,i=n.pendingProps,i=n.elementType===a?i:qe(a,i),bs(e,n,a,i,t);case 1:return a=n.type,i=n.pendingProps,i=n.elementType===a?i:qe(a,i),Eo(e,n,a,i,t);case 3:e:{if(nu(n),e===null)throw Error(D(387));a=n.pendingProps,s=n.memoizedState,i=s.element,Ec(e,n),Ta(n,a,null,t);var l=n.memoizedState;if(a=l.element,s.isDehydrated)if(s={element:a,isDehydrated:!1,cache:l.cache,pendingSuspenseBoundaries:l.pendingSuspenseBoundaries,transitions:l.transitions},n.updateQueue.baseState=s,n.memoizedState=s,n.flags&256){i=Pr(Error(D(423)),n),n=Ao(e,n,a,t,i);break e}else if(a!==i){i=Pr(Error(D(424)),n),n=Ao(e,n,a,t,i);break e}else for(Te=An(n.stateNode.containerInfo.firstChild),De=n,X=!0,Qe=null,t=Cc(n,null,a,t),n.child=t;t;)t.flags=t.flags&-3|4096,t=t.sibling;else{if(Nr(),a===i){n=fn(e,n,t);break e}be(e,n,a,t)}n=n.child}return n;case 5:return Ac(n),e===null&&hs(n),a=n.type,i=n.pendingProps,s=e!==null?e.memoizedProps:null,l=i.children,cs(a,i)?l=null:s!==null&&cs(a,s)&&(n.flags|=32),eu(e,n),be(e,n,l,t),n.child;case 6:return e===null&&hs(n),null;case 13:return ru(e,n,t);case 4:return cl(n,n.stateNode.containerInfo),a=n.pendingProps,e===null?n.child=Sr(n,null,a,t):be(e,n,a,t),n.child;case 11:return a=n.type,i=n.pendingProps,i=n.elementType===a?i:qe(a,i),Co(e,n,a,i,t);case 7:return be(e,n,n.pendingProps,t),n.child;case 8:return be(e,n,n.pendingProps.children,t),n.child;case 12:return be(e,n,n.pendingProps.children,t),n.child;case 10:e:{if(a=n.type._context,i=n.pendingProps,s=n.memoizedProps,l=i.value,Y(Ea,a._currentValue),a._currentValue=l,s!==null)if(Ge(s.value,l)){if(s.children===i.children&&!Ce.current){n=fn(e,n,t);break e}}else for(s=n.child,s!==null&&(s.return=n);s!==null;){var c=s.dependencies;if(c!==null){l=s.child;for(var d=c.firstContext;d!==null;){if(d.context===a){if(s.tag===1){d=cn(-1,t&-t),d.tag=2;var h=s.updateQueue;if(h!==null){h=h.shared;var f=h.pending;f===null?d.next=d:(d.next=f.next,f.next=d),h.pending=d}}s.lanes|=t,d=s.alternate,d!==null&&(d.lanes|=t),gs(s.return,t,n),c.lanes|=t;break}d=d.next}}else if(s.tag===10)l=s.type===n.type?null:s.child;else if(s.tag===18){if(l=s.return,l===null)throw Error(D(341));l.lanes|=t,c=l.alternate,c!==null&&(c.lanes|=t),gs(l,t,n),l=s.sibling}else l=s.child;if(l!==null)l.return=s;else for(l=s;l!==null;){if(l===n){l=null;break}if(s=l.sibling,s!==null){s.return=l.return,l=s;break}l=l.return}s=l}be(e,n,i.children,t),n=n.child}return n;case 9:return i=n.type,a=n.pendingProps.children,br(n,t),i=Oe(i),a=a(i),n.flags|=1,be(e,n,a,t),n.child;case 14:return a=n.type,i=qe(a,n.pendingProps),i=qe(a.type,i),Po(e,n,a,i,t);case 15:return Zc(e,n,n.type,n.pendingProps,t);case 17:return a=n.type,i=n.pendingProps,i=n.elementType===a?i:qe(a,i),oa(e,n),n.tag=1,Pe(a)?(e=!0,Sa(n)):e=!1,br(n,t),Kc(n,a,i),vs(n,a,i,t),js(null,n,a,!0,e,t);case 19:return tu(e,n,t);case 22:return Jc(e,n,t)}throw Error(D(156,n.tag))};function yu(e,n){return Hd(e,n)}function Kf(e,n,t,a){this.tag=e,this.key=t,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=n,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=a,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Me(e,n,t,a){return new Kf(e,n,t,a)}function Sl(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Gf(e){if(typeof e=="function")return Sl(e)?1:0;if(e!=null){if(e=e.$$typeof,e===Ws)return 11;if(e===qs)return 14}return 2}function zn(e,n){var t=e.alternate;return t===null?(t=Me(e.tag,n,e.key,e.mode),t.elementType=e.elementType,t.type=e.type,t.stateNode=e.stateNode,t.alternate=e,e.alternate=t):(t.pendingProps=n,t.type=e.type,t.flags=0,t.subtreeFlags=0,t.deletions=null),t.flags=e.flags&14680064,t.childLanes=e.childLanes,t.lanes=e.lanes,t.child=e.child,t.memoizedProps=e.memoizedProps,t.memoizedState=e.memoizedState,t.updateQueue=e.updateQueue,n=e.dependencies,t.dependencies=n===null?null:{lanes:n.lanes,firstContext:n.firstContext},t.sibling=e.sibling,t.index=e.index,t.ref=e.ref,t}function ua(e,n,t,a,i,s){var l=2;if(a=e,typeof e=="function")Sl(e)&&(l=1);else if(typeof e=="string")l=5;else e:switch(e){case ar:return Hn(t.children,i,s,n);case Vs:l=8,i|=8;break;case $i:return e=Me(12,t,n,i|2),e.elementType=$i,e.lanes=s,e;case Vi:return e=Me(13,t,n,i),e.elementType=Vi,e.lanes=s,e;case Wi:return e=Me(19,t,n,i),e.elementType=Wi,e.lanes=s,e;case Ad:return Xa(t,i,s,n);default:if(typeof e=="object"&&e!==null)switch(e.$$typeof){case Pd:l=10;break e;case Ed:l=9;break e;case Ws:l=11;break e;case qs:l=14;break e;case yn:l=16,a=null;break e}throw Error(D(130,e==null?e:typeof e,""))}return n=Me(l,t,n,i),n.elementType=e,n.type=a,n.lanes=s,n}function Hn(e,n,t,a){return e=Me(7,e,a,n),e.lanes=t,e}function Xa(e,n,t,a){return e=Me(22,e,a,n),e.elementType=Ad,e.lanes=t,e.stateNode={isHidden:!1},e}function Ai(e,n,t){return e=Me(6,e,null,n),e.lanes=t,e}function Ti(e,n,t){return n=Me(4,e.children!==null?e.children:[],e.key,n),n.lanes=t,n.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},n}function Xf(e,n,t,a,i){this.tag=n,this.containerInfo=e,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=ci(0),this.expirationTimes=ci(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=ci(0),this.identifierPrefix=a,this.onRecoverableError=i,this.mutableSourceEagerHydrationData=null}function Cl(e,n,t,a,i,s,l,c,d){return e=new Xf(e,n,t,c,d),n===1?(n=1,s===!0&&(n|=8)):n=0,s=Me(3,null,null,n),e.current=s,s.stateNode=e,s.memoizedState={element:a,isDehydrated:t,cache:null,transitions:null,pendingSuspenseBoundaries:null},dl(s),e}function Zf(e,n,t){var a=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:tr,key:a==null?null:""+a,children:e,containerInfo:n,implementation:t}}function bu(e){if(!e)return Ln;e=e._reactInternals;e:{if(er(e)!==e||e.tag!==1)throw Error(D(170));var n=e;do{switch(n.tag){case 3:n=n.stateNode.context;break e;case 1:if(Pe(n.type)){n=n.stateNode.__reactInternalMemoizedMergedChildContext;break e}}n=n.return}while(n!==null);throw Error(D(171))}if(e.tag===1){var t=e.type;if(Pe(t))return bc(e,t,n)}return n}function ju(e,n,t,a,i,s,l,c,d){return e=Cl(t,a,!0,e,i,s,l,c,d),e.context=bu(null),t=e.current,a=je(),i=Rn(t),s=cn(a,i),s.callback=n??null,Tn(t,s,i),e.current.lanes=i,jt(e,i,a),Ee(e,a),e}function Za(e,n,t,a){var i=n.current,s=je(),l=Rn(i);return t=bu(t),n.context===null?n.context=t:n.pendingContext=t,n=cn(s,l),n.payload={element:e},a=a===void 0?null:a,a!==null&&(n.callback=a),e=Tn(i,n,l),e!==null&&(Ke(e,i,l,s),ia(e,i,l)),l}function _a(e){if(e=e.current,!e.child)return null;switch(e.child.tag){case 5:return e.child.stateNode;default:return e.child.stateNode}}function Oo(e,n){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var t=e.retryLane;e.retryLane=t!==0&&t<n?t:n}}function Pl(e,n){Oo(e,n),(e=e.alternate)&&Oo(e,n)}function Jf(){return null}var wu=typeof reportError=="function"?reportError:function(e){console.error(e)};function El(e){this._internalRoot=e}Ja.prototype.render=El.prototype.render=function(e){var n=this._internalRoot;if(n===null)throw Error(D(409));Za(e,n,null,null)};Ja.prototype.unmount=El.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var n=e.containerInfo;Zn(function(){Za(null,e,null,null)}),n[pn]=null}};function Ja(e){this._internalRoot=e}Ja.prototype.unstable_scheduleHydration=function(e){if(e){var n=Jd();e={blockedOn:null,target:e,priority:n};for(var t=0;t<jn.length&&n!==0&&n<jn[t].priority;t++);jn.splice(t,0,e),t===0&&nc(e)}};function Al(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function ei(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11&&(e.nodeType!==8||e.nodeValue!==" react-mount-point-unstable "))}function Bo(){}function eh(e,n,t,a,i){if(i){if(typeof a=="function"){var s=a;a=function(){var h=_a(l);s.call(h)}}var l=ju(n,a,e,0,null,!1,!1,"",Bo);return e._reactRootContainer=l,e[pn]=l.current,dt(e.nodeType===8?e.parentNode:e),Zn(),l}for(;i=e.lastChild;)e.removeChild(i);if(typeof a=="function"){var c=a;a=function(){var h=_a(d);c.call(h)}}var d=Cl(e,0,!1,null,null,!1,!1,"",Bo);return e._reactRootContainer=d,e[pn]=d.current,dt(e.nodeType===8?e.parentNode:e),Zn(function(){Za(n,d,t,a)}),d}function ni(e,n,t,a,i){var s=t._reactRootContainer;if(s){var l=s;if(typeof i=="function"){var c=i;i=function(){var d=_a(l);c.call(d)}}Za(n,l,e,i)}else l=eh(t,n,e,i,a);return _a(l)}Xd=function(e){switch(e.tag){case 3:var n=e.stateNode;if(n.current.memoizedState.isDehydrated){var t=Wr(n.pendingLanes);t!==0&&(Ys(n,t|1),Ee(n,te()),!(W&6)&&(Er=te()+500,_n()))}break;case 13:Zn(function(){var a=mn(e,1);if(a!==null){var i=je();Ke(a,e,1,i)}}),Pl(e,1)}};Ks=function(e){if(e.tag===13){var n=mn(e,134217728);if(n!==null){var t=je();Ke(n,e,134217728,t)}Pl(e,134217728)}};Zd=function(e){if(e.tag===13){var n=Rn(e),t=mn(e,n);if(t!==null){var a=je();Ke(t,e,n,a)}Pl(e,n)}};Jd=function(){return q};ec=function(e,n){var t=q;try{return q=e,n()}finally{q=t}};es=function(e,n,t){switch(n){case"input":if(Qi(e,t),n=t.name,t.type==="radio"&&n!=null){for(t=e;t.parentNode;)t=t.parentNode;for(t=t.querySelectorAll("input[name="+JSON.stringify(""+n)+'][type="radio"]'),n=0;n<t.length;n++){var a=t[n];if(a!==e&&a.form===e.form){var i=qa(a);if(!i)throw Error(D(90));Dd(a),Qi(a,i)}}}break;case"textarea":zd(e,t);break;case"select":n=t.value,n!=null&&gr(e,!!t.multiple,n,!1)}};Bd=wl;Ud=Zn;var nh={usingClientEntryPoint:!1,Events:[kt,or,qa,_d,Od,wl]},Ur={findFiberByHostInstance:$n,bundleType:0,version:"18.3.1",rendererPackageName:"react-dom"},rh={bundleType:Ur.bundleType,version:Ur.version,rendererPackageName:Ur.rendererPackageName,rendererConfig:Ur.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:hn.ReactCurrentDispatcher,findHostInstanceByFiber:function(e){return e=Wd(e),e===null?null:e.stateNode},findFiberByHostInstance:Ur.findFiberByHostInstance||Jf,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.3.1-next-f1338f8080-20240426"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var Yt=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Yt.isDisabled&&Yt.supportsFiber)try{Ua=Yt.inject(rh),nn=Yt}catch{}}ze.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=nh;ze.createPortal=function(e,n){var t=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!Al(n))throw Error(D(200));return Zf(e,n,null,t)};ze.createRoot=function(e,n){if(!Al(e))throw Error(D(299));var t=!1,a="",i=wu;return n!=null&&(n.unstable_strictMode===!0&&(t=!0),n.identifierPrefix!==void 0&&(a=n.identifierPrefix),n.onRecoverableError!==void 0&&(i=n.onRecoverableError)),n=Cl(e,1,!1,null,null,t,!1,a,i),e[pn]=n.current,dt(e.nodeType===8?e.parentNode:e),new El(n)};ze.findDOMNode=function(e){if(e==null)return null;if(e.nodeType===1)return e;var n=e._reactInternals;if(n===void 0)throw typeof e.render=="function"?Error(D(188)):(e=Object.keys(e).join(","),Error(D(268,e)));return e=Wd(n),e=e===null?null:e.stateNode,e};ze.flushSync=function(e){return Zn(e)};ze.hydrate=function(e,n,t){if(!ei(n))throw Error(D(200));return ni(null,e,n,!0,t)};ze.hydrateRoot=function(e,n,t){if(!Al(e))throw Error(D(405));var a=t!=null&&t.hydratedSources||null,i=!1,s="",l=wu;if(t!=null&&(t.unstable_strictMode===!0&&(i=!0),t.identifierPrefix!==void 0&&(s=t.identifierPrefix),t.onRecoverableError!==void 0&&(l=t.onRecoverableError)),n=ju(n,null,e,1,t??null,i,!1,s,l),e[pn]=n.current,dt(e),a)for(e=0;e<a.length;e++)t=a[e],i=t._getVersion,i=i(t._source),n.mutableSourceEagerHydrationData==null?n.mutableSourceEagerHydrationData=[t,i]:n.mutableSourceEagerHydrationData.push(t,i);return new Ja(n)};ze.render=function(e,n,t){if(!ei(n))throw Error(D(200));return ni(null,e,n,!1,t)};ze.unmountComponentAtNode=function(e){if(!ei(e))throw Error(D(40));return e._reactRootContainer?(Zn(function(){ni(null,null,e,!1,function(){e._reactRootContainer=null,e[pn]=null})}),!0):!1};ze.unstable_batchedUpdates=wl;ze.unstable_renderSubtreeIntoContainer=function(e,n,t,a){if(!ei(t))throw Error(D(200));if(e==null||e._reactInternals===void 0)throw Error(D(38));return ni(e,n,t,!1,a)};ze.version="18.3.1-next-f1338f8080-20240426";function ku(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(ku)}catch(e){console.error(e)}}ku(),kd.exports=ze;var th=kd.exports,Uo=th;Bi.createRoot=Uo.createRoot,Bi.hydrateRoot=Uo.hydrateRoot;/**
 * @remix-run/router v1.23.2
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function vt(){return vt=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},vt.apply(this,arguments)}var Sn;(function(e){e.Pop="POP",e.Push="PUSH",e.Replace="REPLACE"})(Sn||(Sn={}));const $o="popstate";function ah(e){e===void 0&&(e={});function n(a,i){let{pathname:s,search:l,hash:c}=a.location;return zs("",{pathname:s,search:l,hash:c},i.state&&i.state.usr||null,i.state&&i.state.key||"default")}function t(a,i){return typeof i=="string"?i:Nu(i)}return sh(n,t,null,e)}function se(e,n){if(e===!1||e===null||typeof e>"u")throw new Error(n)}function Tl(e,n){if(!e){typeof console<"u"&&console.warn(n);try{throw new Error(n)}catch{}}}function ih(){return Math.random().toString(36).substr(2,8)}function Vo(e,n){return{usr:e.state,key:e.key,idx:n}}function zs(e,n,t,a){return t===void 0&&(t=null),vt({pathname:typeof e=="string"?e:e.pathname,search:"",hash:""},typeof n=="string"?Rr(n):n,{state:t,key:n&&n.key||a||ih()})}function Nu(e){let{pathname:n="/",search:t="",hash:a=""}=e;return t&&t!=="?"&&(n+=t.charAt(0)==="?"?t:"?"+t),a&&a!=="#"&&(n+=a.charAt(0)==="#"?a:"#"+a),n}function Rr(e){let n={};if(e){let t=e.indexOf("#");t>=0&&(n.hash=e.substr(t),e=e.substr(0,t));let a=e.indexOf("?");a>=0&&(n.search=e.substr(a),e=e.substr(0,a)),e&&(n.pathname=e)}return n}function sh(e,n,t,a){a===void 0&&(a={});let{window:i=document.defaultView,v5Compat:s=!1}=a,l=i.history,c=Sn.Pop,d=null,h=f();h==null&&(h=0,l.replaceState(vt({},l.state,{idx:h}),""));function f(){return(l.state||{idx:null}).idx}function x(){c=Sn.Pop;let b=f(),u=b==null?null:b-h;h=b,d&&d({action:c,location:S.location,delta:u})}function p(b,u){c=Sn.Push;let m=zs(S.location,b,u);h=f()+1;let v=Vo(m,h),P=S.createHref(m);try{l.pushState(v,"",P)}catch(E){if(E instanceof DOMException&&E.name==="DataCloneError")throw E;i.location.assign(P)}s&&d&&d({action:c,location:S.location,delta:1})}function y(b,u){c=Sn.Replace;let m=zs(S.location,b,u);h=f();let v=Vo(m,h),P=S.createHref(m);l.replaceState(v,"",P),s&&d&&d({action:c,location:S.location,delta:0})}function N(b){let u=i.location.origin!=="null"?i.location.origin:i.location.href,m=typeof b=="string"?b:Nu(b);return m=m.replace(/ $/,"%20"),se(u,"No window.location.(origin|href) available to create URL for href: "+m),new URL(m,u)}let S={get action(){return c},get location(){return e(i,l)},listen(b){if(d)throw new Error("A history only accepts one active listener");return i.addEventListener($o,x),d=b,()=>{i.removeEventListener($o,x),d=null}},createHref(b){return n(i,b)},createURL:N,encodeLocation(b){let u=N(b);return{pathname:u.pathname,search:u.search,hash:u.hash}},push:p,replace:y,go(b){return l.go(b)}};return S}var Wo;(function(e){e.data="data",e.deferred="deferred",e.redirect="redirect",e.error="error"})(Wo||(Wo={}));function lh(e,n,t){return t===void 0&&(t="/"),oh(e,n,t)}function oh(e,n,t,a){let i=typeof n=="string"?Rr(n):n,s=Pu(i.pathname||"/",t);if(s==null)return null;let l=Su(e);dh(l);let c=null;for(let d=0;c==null&&d<l.length;++d){let h=jh(s);c=vh(l[d],h)}return c}function Su(e,n,t,a){n===void 0&&(n=[]),t===void 0&&(t=[]),a===void 0&&(a="");let i=(s,l,c)=>{let d={relativePath:c===void 0?s.path||"":c,caseSensitive:s.caseSensitive===!0,childrenIndex:l,route:s};d.relativePath.startsWith("/")&&(se(d.relativePath.startsWith(a),'Absolute route path "'+d.relativePath+'" nested under path '+('"'+a+'" is not valid. An absolute child route path ')+"must start with the combined path of all its parent routes."),d.relativePath=d.relativePath.slice(a.length));let h=Qn([a,d.relativePath]),f=t.concat(d);s.children&&s.children.length>0&&(se(s.index!==!0,"Index routes must not have child routes. Please remove "+('all child routes from route path "'+h+'".')),Su(s.children,n,f,h)),!(s.path==null&&!s.index)&&n.push({path:h,score:gh(h,s.index),routesMeta:f})};return e.forEach((s,l)=>{var c;if(s.path===""||!((c=s.path)!=null&&c.includes("?")))i(s,l);else for(let d of Cu(s.path))i(s,l,d)}),n}function Cu(e){let n=e.split("/");if(n.length===0)return[];let[t,...a]=n,i=t.endsWith("?"),s=t.replace(/\?$/,"");if(a.length===0)return i?[s,""]:[s];let l=Cu(a.join("/")),c=[];return c.push(...l.map(d=>d===""?s:[s,d].join("/"))),i&&c.push(...l),c.map(d=>e.startsWith("/")&&d===""?"/":d)}function dh(e){e.sort((n,t)=>n.score!==t.score?t.score-n.score:xh(n.routesMeta.map(a=>a.childrenIndex),t.routesMeta.map(a=>a.childrenIndex)))}const ch=/^:[\w-]+$/,uh=3,ph=2,mh=1,fh=10,hh=-2,qo=e=>e==="*";function gh(e,n){let t=e.split("/"),a=t.length;return t.some(qo)&&(a+=hh),n&&(a+=ph),t.filter(i=>!qo(i)).reduce((i,s)=>i+(ch.test(s)?uh:s===""?mh:fh),a)}function xh(e,n){return e.length===n.length&&e.slice(0,-1).every((a,i)=>a===n[i])?e[e.length-1]-n[n.length-1]:0}function vh(e,n,t){let{routesMeta:a}=e,i={},s="/",l=[];for(let c=0;c<a.length;++c){let d=a[c],h=c===a.length-1,f=s==="/"?n:n.slice(s.length)||"/",x=yh({path:d.relativePath,caseSensitive:d.caseSensitive,end:h},f),p=d.route;if(!x)return null;Object.assign(i,x.params),l.push({params:i,pathname:Qn([s,x.pathname]),pathnameBase:Ch(Qn([s,x.pathnameBase])),route:p}),x.pathnameBase!=="/"&&(s=Qn([s,x.pathnameBase]))}return l}function yh(e,n){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[t,a]=bh(e.path,e.caseSensitive,e.end),i=n.match(t);if(!i)return null;let s=i[0],l=s.replace(/(.)\/+$/,"$1"),c=i.slice(1);return{params:a.reduce((h,f,x)=>{let{paramName:p,isOptional:y}=f;if(p==="*"){let S=c[x]||"";l=s.slice(0,s.length-S.length).replace(/(.)\/+$/,"$1")}const N=c[x];return y&&!N?h[p]=void 0:h[p]=(N||"").replace(/%2F/g,"/"),h},{}),pathname:s,pathnameBase:l,pattern:e}}function bh(e,n,t){n===void 0&&(n=!1),t===void 0&&(t=!0),Tl(e==="*"||!e.endsWith("*")||e.endsWith("/*"),'Route path "'+e+'" will be treated as if it were '+('"'+e.replace(/\*$/,"/*")+'" because the `*` character must ')+"always follow a `/` in the pattern. To get rid of this warning, "+('please change the route path to "'+e.replace(/\*$/,"/*")+'".'));let a=[],i="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(l,c,d)=>(a.push({paramName:c,isOptional:d!=null}),d?"/?([^\\/]+)?":"/([^\\/]+)"));return e.endsWith("*")?(a.push({paramName:"*"}),i+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):t?i+="\\/*$":e!==""&&e!=="/"&&(i+="(?:(?=\\/|$))"),[new RegExp(i,n?void 0:"i"),a]}function jh(e){try{return e.split("/").map(n=>decodeURIComponent(n).replace(/\//g,"%2F")).join("/")}catch(n){return Tl(!1,'The URL path "'+e+'" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent '+("encoding ("+n+").")),e}}function Pu(e,n){if(n==="/")return e;if(!e.toLowerCase().startsWith(n.toLowerCase()))return null;let t=n.endsWith("/")?n.length-1:n.length,a=e.charAt(t);return a&&a!=="/"?null:e.slice(t)||"/"}const wh=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,kh=e=>wh.test(e);function Nh(e,n){n===void 0&&(n="/");let{pathname:t,search:a="",hash:i=""}=typeof e=="string"?Rr(e):e,s;if(t)if(kh(t))s=t;else{if(t.includes("//")){let l=t;t=t.replace(/\/\/+/g,"/"),Tl(!1,"Pathnames cannot have embedded double slashes - normalizing "+(l+" -> "+t))}t.startsWith("/")?s=Ho(t.substring(1),"/"):s=Ho(t,n)}else s=n;return{pathname:s,search:Ph(a),hash:Eh(i)}}function Ho(e,n){let t=n.replace(/\/+$/,"").split("/");return e.split("/").forEach(i=>{i===".."?t.length>1&&t.pop():i!=="."&&t.push(i)}),t.length>1?t.join("/"):"/"}function Di(e,n,t,a){return"Cannot include a '"+e+"' character in a manually specified "+("`to."+n+"` field ["+JSON.stringify(a)+"].  Please separate it out to the ")+("`to."+t+"` field. Alternatively you may provide the full path as ")+'a string in <Link to="..."> and the router will parse it for you.'}function Sh(e){return e.filter((n,t)=>t===0||n.route.path&&n.route.path.length>0)}function Eu(e,n){let t=Sh(e);return n?t.map((a,i)=>i===t.length-1?a.pathname:a.pathnameBase):t.map(a=>a.pathnameBase)}function Au(e,n,t,a){a===void 0&&(a=!1);let i;typeof e=="string"?i=Rr(e):(i=vt({},e),se(!i.pathname||!i.pathname.includes("?"),Di("?","pathname","search",i)),se(!i.pathname||!i.pathname.includes("#"),Di("#","pathname","hash",i)),se(!i.search||!i.search.includes("#"),Di("#","search","hash",i)));let s=e===""||i.pathname==="",l=s?"/":i.pathname,c;if(l==null)c=t;else{let x=n.length-1;if(!a&&l.startsWith("..")){let p=l.split("/");for(;p[0]==="..";)p.shift(),x-=1;i.pathname=p.join("/")}c=x>=0?n[x]:"/"}let d=Nh(i,c),h=l&&l!=="/"&&l.endsWith("/"),f=(s||l===".")&&t.endsWith("/");return!d.pathname.endsWith("/")&&(h||f)&&(d.pathname+="/"),d}const Qn=e=>e.join("/").replace(/\/\/+/g,"/"),Ch=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),Ph=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,Eh=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function Ah(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}const Tu=["post","put","patch","delete"];new Set(Tu);const Th=["get",...Tu];new Set(Th);/**
 * React Router v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */function yt(){return yt=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var a in t)Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a])}return e},yt.apply(this,arguments)}const Dl=k.createContext(null),Dh=k.createContext(null),St=k.createContext(null),ri=k.createContext(null),nr=k.createContext({outlet:null,matches:[],isDataRoute:!1}),Du=k.createContext(null);function Ct(){return k.useContext(ri)!=null}function Pt(){return Ct()||se(!1),k.useContext(ri).location}function Ru(e){k.useContext(St).static||k.useLayoutEffect(e)}function Rh(){let{isDataRoute:e}=k.useContext(nr);return e?qh():zh()}function zh(){Ct()||se(!1);let e=k.useContext(Dl),{basename:n,future:t,navigator:a}=k.useContext(St),{matches:i}=k.useContext(nr),{pathname:s}=Pt(),l=JSON.stringify(Eu(i,t.v7_relativeSplatPath)),c=k.useRef(!1);return Ru(()=>{c.current=!0}),k.useCallback(function(h,f){if(f===void 0&&(f={}),!c.current)return;if(typeof h=="number"){a.go(h);return}let x=Au(h,JSON.parse(l),s,f.relative==="path");e==null&&n!=="/"&&(x.pathname=x.pathname==="/"?n:Qn([n,x.pathname])),(f.replace?a.replace:a.push)(x,f.state,f)},[n,a,l,s,e])}function Ih(e,n){return Lh(e,n)}function Lh(e,n,t,a){Ct()||se(!1);let{navigator:i}=k.useContext(St),{matches:s}=k.useContext(nr),l=s[s.length-1],c=l?l.params:{};l&&l.pathname;let d=l?l.pathnameBase:"/";l&&l.route;let h=Pt(),f;if(n){var x;let b=typeof n=="string"?Rr(n):n;d==="/"||(x=b.pathname)!=null&&x.startsWith(d)||se(!1),f=b}else f=h;let p=f.pathname||"/",y=p;if(d!=="/"){let b=d.replace(/^\//,"").split("/");y="/"+p.replace(/^\//,"").split("/").slice(b.length).join("/")}let N=lh(e,{pathname:y}),S=Bh(N&&N.map(b=>Object.assign({},b,{params:Object.assign({},c,b.params),pathname:Qn([d,i.encodeLocation?i.encodeLocation(b.pathname).pathname:b.pathname]),pathnameBase:b.pathnameBase==="/"?d:Qn([d,i.encodeLocation?i.encodeLocation(b.pathnameBase).pathname:b.pathnameBase])})),s,t,a);return n&&S?k.createElement(ri.Provider,{value:{location:yt({pathname:"/",search:"",hash:"",state:null,key:"default"},f),navigationType:Sn.Pop}},S):S}function Fh(){let e=Wh(),n=Ah(e)?e.status+" "+e.statusText:e instanceof Error?e.message:JSON.stringify(e),t=e instanceof Error?e.stack:null,i={padding:"0.5rem",backgroundColor:"rgba(200,200,200, 0.5)"};return k.createElement(k.Fragment,null,k.createElement("h2",null,"Unexpected Application Error!"),k.createElement("h3",{style:{fontStyle:"italic"}},n),t?k.createElement("pre",{style:i},t):null,null)}const Mh=k.createElement(Fh,null);class _h extends k.Component{constructor(n){super(n),this.state={location:n.location,revalidation:n.revalidation,error:n.error}}static getDerivedStateFromError(n){return{error:n}}static getDerivedStateFromProps(n,t){return t.location!==n.location||t.revalidation!=="idle"&&n.revalidation==="idle"?{error:n.error,location:n.location,revalidation:n.revalidation}:{error:n.error!==void 0?n.error:t.error,location:t.location,revalidation:n.revalidation||t.revalidation}}componentDidCatch(n,t){console.error("React Router caught the following error during render",n,t)}render(){return this.state.error!==void 0?k.createElement(nr.Provider,{value:this.props.routeContext},k.createElement(Du.Provider,{value:this.state.error,children:this.props.component})):this.props.children}}function Oh(e){let{routeContext:n,match:t,children:a}=e,i=k.useContext(Dl);return i&&i.static&&i.staticContext&&(t.route.errorElement||t.route.ErrorBoundary)&&(i.staticContext._deepestRenderedBoundaryId=t.route.id),k.createElement(nr.Provider,{value:n},a)}function Bh(e,n,t,a){var i;if(n===void 0&&(n=[]),t===void 0&&(t=null),a===void 0&&(a=null),e==null){var s;if(!t)return null;if(t.errors)e=t.matches;else if((s=a)!=null&&s.v7_partialHydration&&n.length===0&&!t.initialized&&t.matches.length>0)e=t.matches;else return null}let l=e,c=(i=t)==null?void 0:i.errors;if(c!=null){let f=l.findIndex(x=>x.route.id&&(c==null?void 0:c[x.route.id])!==void 0);f>=0||se(!1),l=l.slice(0,Math.min(l.length,f+1))}let d=!1,h=-1;if(t&&a&&a.v7_partialHydration)for(let f=0;f<l.length;f++){let x=l[f];if((x.route.HydrateFallback||x.route.hydrateFallbackElement)&&(h=f),x.route.id){let{loaderData:p,errors:y}=t,N=x.route.loader&&p[x.route.id]===void 0&&(!y||y[x.route.id]===void 0);if(x.route.lazy||N){d=!0,h>=0?l=l.slice(0,h+1):l=[l[0]];break}}}return l.reduceRight((f,x,p)=>{let y,N=!1,S=null,b=null;t&&(y=c&&x.route.id?c[x.route.id]:void 0,S=x.route.errorElement||Mh,d&&(h<0&&p===0?(Hh("route-fallback"),N=!0,b=null):h===p&&(N=!0,b=x.route.hydrateFallbackElement||null)));let u=n.concat(l.slice(0,p+1)),m=()=>{let v;return y?v=S:N?v=b:x.route.Component?v=k.createElement(x.route.Component,null):x.route.element?v=x.route.element:v=f,k.createElement(Oh,{match:x,routeContext:{outlet:f,matches:u,isDataRoute:t!=null},children:v})};return t&&(x.route.ErrorBoundary||x.route.errorElement||p===0)?k.createElement(_h,{location:t.location,revalidation:t.revalidation,component:S,error:y,children:m(),routeContext:{outlet:null,matches:u,isDataRoute:!0}}):m()},null)}var zu=function(e){return e.UseBlocker="useBlocker",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e}(zu||{}),Iu=function(e){return e.UseBlocker="useBlocker",e.UseLoaderData="useLoaderData",e.UseActionData="useActionData",e.UseRouteError="useRouteError",e.UseNavigation="useNavigation",e.UseRouteLoaderData="useRouteLoaderData",e.UseMatches="useMatches",e.UseRevalidator="useRevalidator",e.UseNavigateStable="useNavigate",e.UseRouteId="useRouteId",e}(Iu||{});function Uh(e){let n=k.useContext(Dl);return n||se(!1),n}function $h(e){let n=k.useContext(Dh);return n||se(!1),n}function Vh(e){let n=k.useContext(nr);return n||se(!1),n}function Lu(e){let n=Vh(),t=n.matches[n.matches.length-1];return t.route.id||se(!1),t.route.id}function Wh(){var e;let n=k.useContext(Du),t=$h(),a=Lu();return n!==void 0?n:(e=t.errors)==null?void 0:e[a]}function qh(){let{router:e}=Uh(zu.UseNavigateStable),n=Lu(Iu.UseNavigateStable),t=k.useRef(!1);return Ru(()=>{t.current=!0}),k.useCallback(function(i,s){s===void 0&&(s={}),t.current&&(typeof i=="number"?e.navigate(i):e.navigate(i,yt({fromRouteId:n},s)))},[e,n])}const Qo={};function Hh(e,n,t){Qo[e]||(Qo[e]=!0)}function Qh(e,n){e==null||e.v7_startTransition,e==null||e.v7_relativeSplatPath}function Is(e){let{to:n,replace:t,state:a,relative:i}=e;Ct()||se(!1);let{future:s,static:l}=k.useContext(St),{matches:c}=k.useContext(nr),{pathname:d}=Pt(),h=Rh(),f=Au(n,Eu(c,s.v7_relativeSplatPath),d,i==="path"),x=JSON.stringify(f);return k.useEffect(()=>h(JSON.parse(x),{replace:t,state:a,relative:i}),[h,x,i,t,a]),null}function ye(e){se(!1)}function Yh(e){let{basename:n="/",children:t=null,location:a,navigationType:i=Sn.Pop,navigator:s,static:l=!1,future:c}=e;Ct()&&se(!1);let d=n.replace(/^\/*/,"/"),h=k.useMemo(()=>({basename:d,navigator:s,static:l,future:yt({v7_relativeSplatPath:!1},c)}),[d,c,s,l]);typeof a=="string"&&(a=Rr(a));let{pathname:f="/",search:x="",hash:p="",state:y=null,key:N="default"}=a,S=k.useMemo(()=>{let b=Pu(f,d);return b==null?null:{location:{pathname:b,search:x,hash:p,state:y,key:N},navigationType:i}},[d,f,x,p,y,N,i]);return S==null?null:k.createElement(St.Provider,{value:h},k.createElement(ri.Provider,{children:t,value:S}))}function Kh(e){let{children:n,location:t}=e;return Ih(Ls(n),t)}new Promise(()=>{});function Ls(e,n){n===void 0&&(n=[]);let t=[];return k.Children.forEach(e,(a,i)=>{if(!k.isValidElement(a))return;let s=[...n,i];if(a.type===k.Fragment){t.push.apply(t,Ls(a.props.children,s));return}a.type!==ye&&se(!1),!a.props.index||!a.props.children||se(!1);let l={id:a.props.id||s.join("-"),caseSensitive:a.props.caseSensitive,element:a.props.element,Component:a.props.Component,index:a.props.index,path:a.props.path,loader:a.props.loader,action:a.props.action,errorElement:a.props.errorElement,ErrorBoundary:a.props.ErrorBoundary,hasErrorBoundary:a.props.ErrorBoundary!=null||a.props.errorElement!=null,shouldRevalidate:a.props.shouldRevalidate,handle:a.props.handle,lazy:a.props.lazy};a.props.children&&(l.children=Ls(a.props.children,s)),t.push(l)}),t}/**
 * React Router DOM v6.30.3
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */const Gh="6";try{window.__reactRouterVersion=Gh}catch{}const Xh="startTransition",Yo=qp[Xh];function Zh(e){let{basename:n,children:t,future:a,window:i}=e,s=k.useRef();s.current==null&&(s.current=ah({window:i,v5Compat:!0}));let l=s.current,[c,d]=k.useState({action:l.action,location:l.location}),{v7_startTransition:h}=a||{},f=k.useCallback(x=>{h&&Yo?Yo(()=>d(x)):d(x)},[d,h]);return k.useLayoutEffect(()=>l.listen(f),[l,f]),k.useEffect(()=>Qh(a),[a]),k.createElement(Yh,{basename:n,children:t,location:c.location,navigationType:c.action,navigator:l,future:a})}var Ko;(function(e){e.UseScrollRestoration="useScrollRestoration",e.UseSubmit="useSubmit",e.UseSubmitFetcher="useSubmitFetcher",e.UseFetcher="useFetcher",e.useViewTransitionState="useViewTransitionState"})(Ko||(Ko={}));var Go;(function(e){e.UseFetcher="useFetcher",e.UseFetchers="useFetchers",e.UseScrollRestoration="useScrollRestoration"})(Go||(Go={}));const Jh=[{key:"dashboard",label:"Dashboard",iconClass:"fa-solid fa-chart-column ico",path:"/dashboard"},{key:"sales",label:"Sales",iconClass:"fa-solid fa-folder-open ico",path:"/sales"},{key:"accounts",label:"Accounts",iconClass:"fa-solid fa-briefcase ico",path:"/accounts"},{key:"operations",label:"Operations",iconClass:"fa-solid fa-gears ico",path:"/operations"},{key:"company",label:"Company",iconClass:"fa-solid fa-building ico",path:"/company"},{key:"services",label:"Services",iconClass:"fa-solid fa-receipt ico",path:"/services"},{key:"users",label:"Users",iconClass:"fa-solid fa-users ico",path:"/users"},{key:"payments",label:"Payments",iconClass:"fa-solid fa-credit-card ico",path:"/payments"},{key:"settings",label:"Settings",iconClass:"fa-solid fa-sliders ico",path:"/settings"}],Xo=typeof window<"u"&&window.location&&window.location.origin?window.location.origin:"https://ledgerworx.me",Fu=k.createContext(null);async function eg(){var t,a,i;const n=await(await fetch(`${Xo}/wp-admin/admin-ajax.php?action=lw_portal_bootstrap`,{credentials:"include",headers:{Accept:"application/json"},cache:"no-store"})).json();return{authenticated:!!(n!=null&&n.authenticated),role:String((n==null?void 0:n.role)||""),profile:(n==null?void 0:n.profile)||null,config:{loginUrl:String(((t=n==null?void 0:n.config)==null?void 0:t.loginUrl)||`${Xo}/login/`),logoutUrl:String(((a=n==null?void 0:n.config)==null?void 0:a.logoutUrl)||""),portalBaseUrl:String(((i=n==null?void 0:n.config)==null?void 0:i.portalBaseUrl)||"")}}}function ng({children:e}){const[n,t]=k.useState({isLoading:!0,isError:!1,error:null,data:null});k.useEffect(()=>{let i=!0;return eg().then(s=>{i&&(typeof window<"u"&&(window.__LW_PORTAL_BOOTSTRAP__=s),t({isLoading:!1,isError:!1,error:null,data:s}))}).catch(s=>{i&&t({isLoading:!1,isError:!0,error:s,data:null})}),()=>{i=!1}},[]);const a=k.useMemo(()=>n,[n]);return r.jsx(Fu.Provider,{value:a,children:e})}function ti(){const e=k.useContext(Fu);if(!e)throw new Error("usePortalSession must be used within PortalSessionProvider.");return e}const rg="/portal/admin/assets/images/logowhite.png";function tn({adminName:e="Admin"}){var y,N;const n=ti(),t=Pt(),a=k.useRef(null),[i,s]=k.useState(!1),[l,c]=k.useState(()=>{try{return localStorage.getItem("ledger_dark")==="1"}catch{return!1}}),d=k.useMemo(()=>t.pathname,[t.pathname]),h=((N=(y=n.data)==null?void 0:y.profile)==null?void 0:N.name)||e,f=k.useMemo(()=>"/portal/admin/".replace(/\/+$/,"")||"/portal/admin",[]);k.useLayoutEffect(()=>{const S=document.documentElement,b=document.body;S.classList.toggle("dark-mode",l),b.classList.toggle("dark-mode",l),S.classList.toggle("dark",l),b.classList.toggle("dark",l);try{localStorage.setItem("ledger_dark",l?"1":"0")}catch{}},[l]),k.useEffect(()=>{function S(u){a.current&&!a.current.contains(u.target)&&s(!1)}function b(u){u.key==="Escape"&&s(!1)}return document.addEventListener("click",S),document.addEventListener("keydown",b),()=>{document.removeEventListener("click",S),document.removeEventListener("keydown",b)}},[]);function x(){window.location.assign(`${f}/profile`),s(!1)}function p(){var S,b;if((b=(S=n.data)==null?void 0:S.config)!=null&&b.logoutUrl){window.location.assign(n.data.config.logoutUrl);return}window.location.assign(`${f}/logout`),s(!1)}return r.jsxs("header",{className:"topbar",children:[r.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"12px"},children:[r.jsx("div",{className:"top-logo","aria-hidden":"true",children:r.jsx("img",{src:rg,alt:"LedgerWorx",className:"nav-logo"})}),r.jsx("nav",{className:"nav-items",children:r.jsx("div",{className:"nav-items-inner",children:Jh.map(S=>{const u=d===S.path?"active":"",m=r.jsx("i",{className:S.iconClass});return r.jsxs("a",{href:`${f}${S.path}`,className:u,children:[m,S.label]},S.key)})})})]}),r.jsx("div",{style:{display:"flex",alignItems:"center",gap:"18px"},children:r.jsx("div",{className:"right-area",children:r.jsxs("div",{className:"admin",style:{marginLeft:"12px"},ref:a,children:[r.jsx("button",{className:"admin-btn",id:"adminBtn",type:"button",onClick:S=>{S.stopPropagation(),s(b=>!b)},children:h}),r.jsxs("div",{className:`dropdown${i?" show":""}`,id:"adminDropdown","aria-hidden":!i,children:[r.jsx("div",{className:"dropdown-item",id:"editProfile",onClick:x,children:"Edit Profile"}),r.jsxs("div",{className:"toggle-row",children:[r.jsx("div",{style:{fontSize:"14px",color:"inherit"},children:"Dark Theme"}),r.jsxs("label",{className:"switch",children:[r.jsx("input",{type:"checkbox",id:"darkToggle",checked:l,onChange:S=>c(S.target.checked)}),r.jsx("span",{className:"slider"})]})]}),r.jsx("div",{className:"dropdown-item",id:"logoutLink",onClick:p,children:"Logout"})]})]})})})]})}const tg=[{count:"45",title:"Total Revenue (AED)",amount:"AED 1,250,000",meta:"4 Packages created"},{count:"90,000",title:"Pending Payments",amount:"AED 90,000",meta:"320 Payments"},{count:"320",title:"Total Invoices",amount:"320",meta:"881 Invoices"},{count:"45,000",title:"Overdue Invoices",amount:"AED 45,000",meta:"13 Packages created"}],Ri=[{inv:"INV-1024",company:"Bright Tech",package:"Standard",amount:"AED 20,000",status:"Paid"},{inv:"INV-1025",company:"Emirates Logistics",package:"Premium",amount:"AED 30,000",status:"Pending"},{inv:"INV-1026",company:"Nova Healthcare",package:"Basic",amount:"AED 10,000",status:"Overdue"},{inv:"INV-1025",company:"Simran Kohli",package:"Basic",amount:"AED 10,000",status:"Pending"}],ag=[{inv:"INV-1024",company:"Bright Tech",package:"Standard",amount:"AED 20,000",dueDate:"10-May",status:"Paid"},{inv:"INV-1025",company:"Emirates Logistics",package:"Premium",amount:"AED 30,000",dueDate:"15-May",status:"Pending"}],ig=["Standard","Premium","Basic","Client"],sg=`@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css');\r
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
`,Kt=new Map;function zi(e,n){if(!n||typeof document>"u")return()=>{};let t=Kt.get(e);if(t)t.cssText!==n&&(t.cssText=n,t.element.textContent=n);else{const a=document.createElement("style");a.setAttribute("data-admin-style",e),a.textContent=n,document.head.appendChild(a),t={count:0,cssText:n,element:a},Kt.set(e,t)}return t.count+=1,()=>{const a=Kt.get(e);a&&(a.count-=1,a.count<=0&&(a.element.remove(),Kt.delete(e)))}}function Xe({pageKey:e,pageCssText:n,includeHeader:t=!0,includeTheme:a=!0}){k.useLayoutEffect(()=>{const i=[];return t&&i.push(zi("admin-shared-header",sg)),e&&n&&i.push(zi(`admin-page-${e}`,n)),a&&i.push(zi("admin-shared-theme",lg)),()=>{for(let s=i.length-1;s>=0;s-=1)i[s]()}},[t,a,n,e])}const og=`:root{ --primary:#2f8f83; --bg:#eef1f7; --card:#fff; --text:#2c3e50; --muted:#7f8c8d; --line:#e4ecf5; }\r
*{margin:0;padding:0;box-sizing:border-box;font-family:"Segoe UI",sans-serif}\r
body{\r
  background:radial-gradient(circle at 0% 0%, #ffffff 0%, #edf2fa 50%, #e6edf8 100%);\r
  color:var(--text);\r
}\r
.page{padding:24px;max-width:1460px;margin:0 auto}\r
.breadcrumb{color:var(--muted);margin-bottom:14px;font-size:14px}\r
.page-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px}\r
.page-header h2{font-size:30px;letter-spacing:.2px}\r
.accounts-page .tiles{\r
  display:grid;\r
  grid-template-columns:repeat(4,minmax(0,1fr));\r
  gap:14px;\r
  margin-bottom:20px;\r
}\r
.accounts-page .tiles .tile{\r
  display:flex !important;\r
  flex-direction:column !important;\r
  justify-content:space-between !important;\r
  gap:10px;\r
  min-height:152px;\r
  padding:18px;\r
  border-radius:16px !important;\r
  border:1px solid #d5e1ef !important;\r
  border-top:4px solid #2b83d7 !important;\r
  background:linear-gradient(160deg,#ffffff 0%,#f4f9ff 100%) !important;\r
  box-shadow:0 10px 22px rgba(14,37,66,.10) !important;\r
  transition:transform .2s ease, box-shadow .2s ease !important;\r
}\r
.accounts-page .tiles .tile:hover{\r
  transform:translateY(-3px) !important;\r
  box-shadow:0 14px 28px rgba(14,37,66,.16) !important;\r
}\r
.accounts-page .tiles .tile:nth-child(2){\r
  border-top-color:#2fbe9a !important;\r
  background:linear-gradient(160deg,#ffffff 0%,#f3fff9 100%) !important;\r
}\r
.accounts-page .tiles .tile:nth-child(3){\r
  border-top-color:#f39c12 !important;\r
  background:linear-gradient(160deg,#ffffff 0%,#fffaf2 100%) !important;\r
}\r
.accounts-page .tiles .tile:nth-child(4){\r
  border-top-color:#6f42c1 !important;\r
  background:linear-gradient(160deg,#ffffff 0%,#f8f3ff 100%) !important;\r
}\r
.accounts-page .tiles .tile .num{\r
  font-size:30px;\r
  line-height:1;\r
  font-weight:800;\r
  letter-spacing:.2px;\r
  color:#224c74 !important;\r
}\r
.accounts-page .tiles .tile .tile-title{\r
  font-size:13px;\r
  font-weight:600;\r
  margin:0;\r
  color:#5f738a !important;\r
}\r
.accounts-page .tiles .tile .tile-amount{\r
  font-size:19px;\r
  font-weight:800;\r
  margin:0;\r
  color:#1f456c !important;\r
}\r
.accounts-page .tiles .tile .tile-meta{\r
  font-size:12px;\r
  margin:0;\r
  color:#6f8195 !important;\r
}\r
.layout{display:grid;grid-template-columns:1fr;gap:18px}\r
.card{\r
  background:linear-gradient(180deg,#ffffff 0%, #fbfdff 100%);\r
  border:1px solid var(--line);\r
  border-radius:14px;\r
  padding:16px;\r
  box-shadow:0 10px 22px rgba(14,37,66,.08);\r
}\r
.card h3,.card h4{color:#1c4268}\r
.filter-bar{display:flex;gap:10px;flex-wrap:wrap;margin-top:10px}\r
.filter-control{\r
  padding:9px 12px;\r
  border-radius:10px;\r
  border:1px solid #d2e0ef;\r
  background:#fff;\r
  color:#274764;\r
  font-size:14px;\r
}\r
.filter-control:focus{outline:none;border-color:#96bde9;box-shadow:0 0 0 3px rgba(65,105,225,.12)}\r
table{width:100%;border-collapse:separate;border-spacing:0;margin-top:10px;border:1px solid var(--line);border-radius:12px;overflow:hidden}\r
th,td{padding:11px 10px;border-bottom:1px solid #edf3fa;text-align:left}\r
th{background:#f6faff;color:#617992;font-size:12px;text-transform:uppercase;letter-spacing:.45px}\r
tbody tr:hover{background:#f8fbff}\r
tbody tr:last-child td{border-bottom:none}\r
.status{padding:7px 12px;border-radius:999px;font-size:12px;font-weight:700;display:inline-block;border:1px solid transparent}\r
.paid{background:#dcf7e6;color:#0f6c41;border-color:#bdeacc}\r
.pending{background:#fff4d8;color:#8b6100;border-color:#ffe1a4}\r
.overdue{background:#ffe4e4;color:#9f2a2a;border-color:#ffc4c4}\r
.side-panel .small{font-size:13px;color:var(--muted)}\r
.pay-btn{\r
  background:linear-gradient(135deg,#3f87ff,#2f6fda);\r
  color:#fff;\r
  padding:9px 14px;\r
  border-radius:999px;\r
  border:1px solid #9fc0ff;\r
  box-shadow:0 8px 16px rgba(47,111,218,.24);\r
  cursor:pointer;\r
}\r
.pay-btn:hover{filter:brightness(1.06)}\r
\r
.modal-overlay{\r
  position:fixed;\r
  inset:0;\r
  background:rgba(17,30,46,.55);\r
  display:none;\r
  align-items:center;\r
  justify-content:center;\r
  z-index:1200;\r
  padding:16px;\r
}\r
.modal-overlay.open{\r
  display:flex;\r
}\r
.modal-card{\r
  width:min(560px,100%);\r
  background:#fff;\r
  border:1px solid var(--line);\r
  border-radius:14px;\r
  padding:18px;\r
  box-shadow:0 20px 48px rgba(10,25,41,.22);\r
}\r
.modal-header{\r
  display:flex;\r
  justify-content:space-between;\r
  align-items:center;\r
  margin-bottom:12px;\r
}\r
.modal-header h3{\r
  margin:0;\r
  color:#1c4268;\r
}\r
.modal-close{\r
  border:none;\r
  background:transparent;\r
  color:#60758d;\r
  font-size:18px;\r
  cursor:pointer;\r
  line-height:1;\r
}\r
.details-grid{\r
  display:grid;\r
  grid-template-columns:1fr 1fr;\r
  gap:10px 12px;\r
}\r
.details-item{\r
  border:1px solid #e2eaf4;\r
  border-radius:10px;\r
  background:#f9fcff;\r
  padding:10px 12px;\r
  display:flex;\r
  flex-direction:column;\r
  gap:4px;\r
}\r
.details-item span{\r
  font-size:12px;\r
  color:#6f8298;\r
  text-transform:uppercase;\r
  letter-spacing:.35px;\r
}\r
.details-item strong{\r
  font-size:14px;\r
  color:#1f3e62;\r
}\r
.modal-actions{\r
  display:flex;\r
  justify-content:flex-end;\r
  margin-top:12px;\r
}\r
@media(max-width:1200px){\r
  .accounts-page .tiles{grid-template-columns:repeat(2,1fr)}\r
  .layout{grid-template-columns:1fr}\r
}\r
@media(max-width:760px){\r
  .page{padding:16px}\r
  .page-header{flex-direction:column;align-items:flex-start;gap:10px}\r
  .page-header h2{font-size:24px}\r
  .accounts-page .tiles{grid-template-columns:1fr}\r
  .details-grid{grid-template-columns:1fr}\r
}\r
`;function Zo(e){return e==="Paid"?"paid":e==="Pending"?"pending":"overdue"}function dg(){Xe({pageKey:"accounts",pageCssText:og});const[e,n]=k.useState(""),[t,a]=k.useState("All Statuses"),[i,s]=k.useState("All Companies"),[l,c]=k.useState("All Packages"),[d,h]=k.useState(null);k.useEffect(()=>{function b(u){u.key==="Escape"&&h(null)}return document.addEventListener("keydown",b),()=>{document.removeEventListener("keydown",b)}},[]);const f=[...new Set(Ri.map(b=>b.status))].sort((b,u)=>b.localeCompare(u)),x=[...new Set(Ri.map(b=>b.company))].sort((b,u)=>b.localeCompare(u)),p=e.trim().toLowerCase(),y=Ri.filter(b=>{const u=p===""||[b.inv,b.company,b.package,b.amount,b.status].some(E=>E.toLowerCase().includes(p)),m=t==="All Statuses"||b.status===t,v=i==="All Companies"||b.company===i,P=l==="All Packages"||b.package===l;return u&&m&&v&&P});function N(b){h(b)}function S(){h(null)}return r.jsxs(r.Fragment,{children:[r.jsx(tn,{adminName:"Admin"}),r.jsxs("div",{className:"page accounts-page",children:[r.jsx("div",{className:"breadcrumb",children:"Dashboard › Accounts Department"}),r.jsxs("div",{className:"page-header",children:[r.jsx("h2",{children:"Accounts Department"}),r.jsxs("div",{children:[r.jsx("button",{className:"pay-btn",type:"button",children:"Export CSV"})," ",r.jsx("button",{className:"pay-btn",type:"button",children:"Export PDF"})]})]}),r.jsx("div",{className:"tiles",children:tg.map(b=>r.jsxs("div",{className:"tile",children:[r.jsx("div",{className:"num",children:b.count}),r.jsx("div",{className:"tile-title",children:b.title}),r.jsx("div",{className:"tile-amount",children:b.amount}),r.jsx("div",{className:"tile-meta",children:b.meta})]},`${b.title}-${b.amount}`))}),r.jsx("div",{className:"layout",children:r.jsxs("div",{children:[r.jsxs("div",{className:"card",children:[r.jsx("h3",{children:"Invoice List"}),r.jsxs("div",{className:"filter-bar",children:[r.jsx("input",{id:"invoiceSearchInput",className:"filter-control",placeholder:"Search",style:{width:"220px"},value:e,onChange:b=>{n(b.target.value)}}),r.jsxs("select",{id:"invoiceStatusFilter",className:"filter-control",value:t,onChange:b=>{a(b.target.value)},children:[r.jsx("option",{children:"All Statuses"}),f.map(b=>r.jsx("option",{children:b},b))]}),r.jsxs("select",{id:"invoiceCompanyFilter",className:"filter-control",value:i,onChange:b=>{s(b.target.value)},children:[r.jsx("option",{children:"All Companies"}),x.map(b=>r.jsx("option",{children:b},b))]}),r.jsxs("select",{id:"invoicePackageFilter",className:"filter-control",value:l,onChange:b=>{c(b.target.value)},children:[r.jsx("option",{children:"All Packages"}),ig.map(b=>r.jsx("option",{children:b},b))]})]}),r.jsxs("table",{children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"Invoice No"}),r.jsx("th",{children:"Company"}),r.jsx("th",{children:"Package"}),r.jsx("th",{children:"Amount (AED)"}),r.jsx("th",{children:"Status"})]})}),r.jsxs("tbody",{id:"invoiceTableBody",children:[y.map(b=>r.jsxs("tr",{className:"invoice-row","data-inv":b.inv,"data-company":b.company,"data-package":b.package,"data-amount":b.amount,"data-status":b.status,children:[r.jsx("td",{children:b.inv}),r.jsx("td",{children:b.company}),r.jsx("td",{children:b.package}),r.jsx("td",{children:b.amount}),r.jsx("td",{children:r.jsx("span",{className:`status ${Zo(b.status)}`,children:b.status})})]},`${b.inv}-${b.company}-${b.package}-${b.amount}-${b.status}`)),y.length===0?r.jsx("tr",{id:"invoiceEmptyState",children:r.jsx("td",{colSpan:"5",style:{textAlign:"center",color:"#7f8c8d"},children:"No invoices found for selected filters."})}):null]})]})]}),r.jsxs("div",{className:"card",style:{marginTop:"16px"},children:[r.jsx("h3",{children:"Invoice List"}),r.jsxs("table",{id:"detailedInvoiceTable",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"Invoice No"}),r.jsx("th",{children:"Company"}),r.jsx("th",{children:"Package"}),r.jsx("th",{children:"Amount (AED)"}),r.jsx("th",{children:"Due Date"}),r.jsx("th",{children:"Status"}),r.jsx("th",{children:"Actions"})]})}),r.jsx("tbody",{children:ag.map(b=>r.jsxs("tr",{className:"view-invoice-row","data-inv":b.inv,"data-company":b.company,"data-package":b.package,"data-amount":b.amount,"data-due-date":b.dueDate,"data-status":b.status,children:[r.jsx("td",{children:b.inv}),r.jsx("td",{children:b.company}),r.jsx("td",{children:b.package}),r.jsx("td",{children:b.amount}),r.jsx("td",{children:b.dueDate}),r.jsx("td",{children:r.jsx("span",{className:`status ${Zo(b.status)}`,children:b.status})}),r.jsx("td",{children:r.jsx("button",{type:"button",className:"pay-btn view-invoice-btn",onClick:()=>{N(b)},children:"View"})})]},`${b.inv}-${b.company}-${b.dueDate}`))})]})]})]})})]}),r.jsx("div",{className:`modal-overlay${d?" open":""}`,id:"invoiceDetailsModal","aria-hidden":!d,onClick:b=>{b.target===b.currentTarget&&S()},children:r.jsxs("div",{className:"modal-card",role:"dialog","aria-modal":"true","aria-labelledby":"invoiceDetailsTitle",children:[r.jsxs("div",{className:"modal-header",children:[r.jsx("h3",{id:"invoiceDetailsTitle",children:"Invoice Details"}),r.jsx("button",{type:"button",className:"modal-close",id:"closeInvoiceDetailsModal","aria-label":"Close",onClick:S,children:"x"})]}),r.jsxs("div",{className:"details-grid",children:[r.jsxs("div",{className:"details-item",children:[r.jsx("span",{children:"Invoice No"}),r.jsx("strong",{id:"detailInvNo",children:(d==null?void 0:d.inv)??"-"})]}),r.jsxs("div",{className:"details-item",children:[r.jsx("span",{children:"Company"}),r.jsx("strong",{id:"detailCompany",children:(d==null?void 0:d.company)??"-"})]}),r.jsxs("div",{className:"details-item",children:[r.jsx("span",{children:"Package"}),r.jsx("strong",{id:"detailPackage",children:(d==null?void 0:d.package)??"-"})]}),r.jsxs("div",{className:"details-item",children:[r.jsx("span",{children:"Amount"}),r.jsx("strong",{id:"detailAmount",children:(d==null?void 0:d.amount)??"-"})]}),r.jsxs("div",{className:"details-item",children:[r.jsx("span",{children:"Due Date"}),r.jsx("strong",{id:"detailDueDate",children:(d==null?void 0:d.dueDate)??"-"})]}),r.jsxs("div",{className:"details-item",children:[r.jsx("span",{children:"Status"}),r.jsx("strong",{id:"detailStatus",children:(d==null?void 0:d.status)??"-"})]})]}),r.jsx("div",{className:"modal-actions",children:r.jsx("button",{type:"button",className:"pay-btn",id:"closeInvoiceDetailsBtn",onClick:S,children:"Close"})})]})})]})}const cg=[{iconClass:"fa fa-city icon",value:"75",label:"Total Companies"},{iconClass:"fa fa-check-circle icon",value:"60",label:"Active Companies"},{iconClass:"fa fa-clock icon",value:"10",label:"Pending Companies"},{iconClass:"fa fa-ban icon",value:"5",label:"Expired Companies"}],ug=[{id:"bright-tech-solutions",companyName:"Bright Tech Solutions",businessId:"CGD20208",industry:"Technology",ownerName:"Anil Kumar",ownerAvatar:"https://i.pravatar.cc/40?img=1",status:"Active",actionLabel:"Expired",actionClass:"suspend",vatTrn:"TRN-100245689100003",licenseExpiryDate:"2027-12-31",companyEmail:"contact@brighttech.com",phoneNumber:"+971 50 123 4567",address:"Business Bay, Dubai, UAE",poBox:"PO Box 44521",adminEmail:"anil.kumar@brighttech.com",username:"brighttech_admin",password:"********"},{id:"emirates-logistics",companyName:"Emirates Logistics",businessId:"FLG10236",industry:"Logistics",ownerName:"Sarah Ali",ownerAvatar:"https://i.pravatar.cc/40?img=2",status:"Pending",actionLabel:"Approve",actionClass:"approve",vatTrn:"TRN-100398451200003",licenseExpiryDate:"2026-09-15",companyEmail:"info@emirateslogistics.ae",phoneNumber:"+971 55 987 6543",address:"Al Quoz, Dubai, UAE",poBox:"PO Box 11209",adminEmail:"sarah.ali@emirateslogistics.ae",username:"emirateslog_admin",password:"********"},{id:"nova-healthcare",companyName:"Nova Healthcare",businessId:"MH467920",industry:"Healthcare",ownerName:"Meera Joshi",ownerAvatar:"https://i.pravatar.cc/40?img=3",status:"Expired",actionLabel:"Reactivate",actionClass:"reactivate",vatTrn:"TRN-100777234500003",licenseExpiryDate:"2025-11-30",companyEmail:"hello@novahealthcare.com",phoneNumber:"+971 58 222 1100",address:"Abu Dhabi, UAE",poBox:"PO Box 88761",adminEmail:"meera.joshi@novahealthcare.com",username:"novahealth_admin",password:"********"}],pa={companyName:"",tradeLicenseNo:"",vatTrn:"",licenseExpiryDate:"",companyEmail:"",phoneNumber:"",address:"",poBox:"",adminName:"",adminEmail:"",username:"",password:""},pg=`:root{\r
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
\r
*{margin:0;padding:0;box-sizing:border-box;font-family:"Segoe UI",sans-serif;}\r
body{\r
  background:radial-gradient(circle at 0% 0%, #ffffff 0%, #edf3fb 50%, #e6edf8 100%);\r
  color:var(--text);\r
}\r
\r
.page{padding:24px;max-width:1450px;margin:0 auto;}\r
.breadcrumb{\r
  font-size:14px;\r
  color:var(--muted);\r
  margin-bottom:12px;\r
}\r
.page-header{\r
  display:flex;\r
  justify-content:space-between;\r
  align-items:center;\r
  margin-bottom:20px;\r
}\r
.page-header h2{\r
  font-size:30px;\r
  color:#1c4268;\r
}\r
.page-header h2 i{margin-right:8px;color:#2f8f83;}\r
\r
.btn{\r
  padding:9px 14px;\r
  border:1px solid transparent;\r
  border-radius:999px;\r
  cursor:pointer;\r
  font-size:13px;\r
  font-weight:700;\r
  transition:.25s;\r
}\r
.btn i{margin-right:6px;}\r
.btn.primary{\r
  background:linear-gradient(135deg,var(--primary),var(--secondary));\r
  border-color:#7fd8d2;\r
  color:#fff;\r
  box-shadow:0 10px 18px rgba(31,143,139,.24);\r
}\r
.btn.primary:hover{\r
  filter:brightness(1.05);\r
  box-shadow:0 12px 20px rgba(31,143,139,.3);\r
}\r
\r
.tiles{\r
  display:grid;\r
  grid-template-columns:repeat(auto-fit,minmax(240px,1fr));\r
  gap:20px;\r
  margin-bottom:25px;\r
}\r
.tile{\r
  background:linear-gradient(140deg,#ffffff,#f8fbff);\r
  border:1px solid var(--line);\r
  border-radius:16px;\r
  box-shadow:0 10px 22px rgba(18,38,63,.10);\r
  padding:18px;\r
  transition:.25s ease;\r
}\r
.tile:hover{\r
  transform:translateY(-4px);\r
  box-shadow:0 16px 28px rgba(18,38,63,.14);\r
  border-color:#cfe0f3;\r
}\r
.tile .icon{\r
  font-size:22px;\r
  color:rgba(255,255,255,.96);\r
  margin-bottom:10px;\r
}\r
.tile h3{font-size:42px;color:#fff;font-weight:800;line-height:1.1;}\r
.tile p{font-size:14px;color:rgba(255,255,255,.96);}\r
.tile:nth-child(1){\r
  background:linear-gradient(135deg,#2f88d3,#2d72b6);\r
  border-color:#6eaee6;\r
}\r
.tile:nth-child(2){\r
  background:linear-gradient(135deg,#27b386,#1e9d76);\r
  border-color:#75d7ba;\r
}\r
.tile:nth-child(3){\r
  background:linear-gradient(135deg,#8a72d5,#6d59b8);\r
  border-color:#b9a8ea;\r
}\r
.tile:nth-child(4){\r
  background:linear-gradient(135deg,#eea336,#e08d21);\r
  border-color:#f1c27f;\r
}\r
\r
.card{\r
  background:linear-gradient(180deg,#ffffff,#fbfdff);\r
  border:1px solid var(--line);\r
  border-radius:16px;\r
  box-shadow:0 10px 22px rgba(18,38,63,.08);\r
  padding:16px;\r
}\r
\r
table{\r
  width:100%;\r
  border-collapse:separate;\r
  border-spacing:0;\r
  border:1px solid var(--line);\r
  border-radius:12px;\r
  overflow:hidden;\r
}\r
th,td{\r
  padding:12px;\r
  font-size:14px;\r
  border-bottom:1px solid #edf2f8;\r
}\r
th{\r
  background:#f6faff;\r
  text-align:left;\r
  color:#60758d;\r
  font-size:12px;\r
  text-transform:uppercase;\r
  letter-spacing:.45px;\r
}\r
tr:hover{background:#f8fbff;}\r
tbody tr:last-child td{border-bottom:none;}\r
\r
.status{\r
  padding:6px 12px;\r
  border-radius:999px;\r
  font-size:12px;\r
  font-weight:700;\r
  border:1px solid transparent;\r
}\r
.active{background:#dcf7e6;color:#0f6c41;border-color:#bdeacc;}\r
.pending{background:#fff4d8;color:#8b6100;border-color:#ffe1a4;}\r
.banned{background:#ffe4e4;color:#9f2a2a;border-color:#ffc4c4;}\r
\r
.action{\r
  padding:7px 12px;\r
  border-radius:999px;\r
  border:1px solid transparent;\r
  cursor:pointer;\r
  font-size:12px;\r
  font-weight:700;\r
  margin-right:4px;\r
}\r
.view{background:linear-gradient(135deg,var(--primary),var(--secondary));border-color:#7fd8d2;color:#fff;}\r
.edit{background:linear-gradient(135deg,#9aa8b5,#7f8f9f);border-color:#c6cfd7;color:#fff;}\r
.suspend{background:linear-gradient(135deg,#ffb44a,#ea8f16);border-color:#ffd59e;color:#fff;}\r
.approve{background:linear-gradient(135deg,#2ec68f,#21a976);border-color:#8be4c3;color:#fff;}\r
.reactivate{background:linear-gradient(135deg,#37c98d,#22a96f);border-color:#8be4c3;color:#fff;}\r
.action:hover{filter:brightness(1.05);}\r
\r
.company{display:flex;align-items:center;gap:10px;}\r
.company i{color:#2f8f83;font-size:18px;}\r
\r
.owner{display:flex;align-items:center;gap:8px;}\r
.owner img{\r
  width:28px;\r
  height:28px;\r
  border-radius:50%;\r
}\r
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
  background:#fff;\r
  border:1px solid var(--line);\r
  border-radius:16px;\r
  box-shadow:0 24px 52px rgba(10,22,37,.24);\r
  padding:18px;\r
}\r
.modal-header{\r
  display:flex;\r
  align-items:center;\r
  justify-content:space-between;\r
  margin-bottom:12px;\r
}\r
.modal-header h3{\r
  margin:0;\r
  color:#1c4268;\r
  font-size:22px;\r
}\r
.modal-close{\r
  border:none;\r
  background:transparent;\r
  font-size:18px;\r
  color:#60758d;\r
  cursor:pointer;\r
  line-height:1;\r
}\r
.company-form{\r
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
  font-size:13px;\r
  color:#5f748c;\r
  font-weight:600;\r
}\r
.form-row input{\r
  padding:10px 12px;\r
  border:1px solid #d2e0ef;\r
  border-radius:10px;\r
  font-size:14px;\r
  color:#274764;\r
  background:#fff;\r
}\r
.form-row input:focus{\r
  outline:none;\r
  border-color:#96bde9;\r
  box-shadow:0 0 0 3px rgba(65,105,225,.12);\r
}\r
.modal-actions{\r
  display:flex;\r
  justify-content:flex-end;\r
  gap:10px;\r
  margin-top:6px;\r
}\r
.company-details-grid{\r
  display:grid;\r
  grid-template-columns:1fr 1fr;\r
  gap:10px 12px;\r
}\r
.company-details-item{\r
  border:1px solid #e2eaf4;\r
  border-radius:10px;\r
  background:#f9fcff;\r
  padding:10px 12px;\r
  display:flex;\r
  flex-direction:column;\r
  gap:4px;\r
}\r
.company-details-item span{\r
  font-size:12px;\r
  color:#5f748c;\r
  text-transform:uppercase;\r
  letter-spacing:.35px;\r
}\r
.company-details-item strong{\r
  font-size:14px;\r
  color:#1f3e62;\r
  word-break:break-word;\r
}\r
@media(max-width:1000px){\r
  .page{padding:16px;}\r
  .page-header{flex-direction:column;align-items:flex-start;gap:10px;}\r
  .page-header h2{font-size:24px;}\r
  .form-grid{grid-template-columns:1fr;}\r
  .company-details-grid{grid-template-columns:1fr;}\r
}\r
\r
.tiles .tile,\r
.tiles .tile:nth-child(1),\r
.tiles .tile:nth-child(2),\r
.tiles .tile:nth-child(3),\r
.tiles .tile:nth-child(4){\r
  background:linear-gradient(135deg,#2f8f83 0%,#6b7280 100%) !important;\r
  border-color:#8ea8ad !important;\r
  color:#fff !important;\r
}\r
`;function mg(e){const n=String(e||"").toLowerCase();return n.includes("active")?"active":n.includes("pending")?"pending":"banned"}function fg(e){return e?{companyName:e.companyName,tradeLicenseNo:e.businessId,vatTrn:e.vatTrn,licenseExpiryDate:e.licenseExpiryDate,companyEmail:e.companyEmail,phoneNumber:e.phoneNumber,address:e.address,poBox:e.poBox,adminName:e.ownerName,adminEmail:e.adminEmail,username:e.username,password:e.password}:pa}function hg(){Xe({pageKey:"company-management",pageCssText:pg});const[e,n]=k.useState(ug),[t,a]=k.useState(!1),[i,s]=k.useState(null),[l,c]=k.useState(null),[d,h]=k.useState(pa),[f,x]=k.useState(pa),p=k.useRef(null),y=e.find(j=>j.id===i)??null,N=e.find(j=>j.id===l)??null;k.useEffect(()=>{function j(T){T.key==="Escape"&&(a(!1),s(null),c(null))}return document.addEventListener("keydown",j),()=>{document.removeEventListener("keydown",j)}},[]),k.useEffect(()=>{var j;t&&((j=p.current)==null||j.focus())},[t]);function S(){a(!1)}function b(){s(null)}function u(){c(null)}function m(j,T){h(z=>({...z,[j]:T}))}function v(j,T){x(z=>({...z,[j]:T}))}function P(j){j.preventDefault(),S(),h(pa)}function E(j){if(j.preventDefault(),!N){u();return}n(T=>T.map(z=>z.id!==N.id?z:{...z,companyName:f.companyName.trim(),businessId:f.tradeLicenseNo.trim(),vatTrn:f.vatTrn.trim(),licenseExpiryDate:f.licenseExpiryDate.trim(),companyEmail:f.companyEmail.trim(),phoneNumber:f.phoneNumber.trim(),address:f.address.trim(),poBox:f.poBox.trim(),ownerName:f.adminName.trim(),adminEmail:f.adminEmail.trim(),username:f.username.trim(),password:f.password.trim()})),u()}return r.jsxs(r.Fragment,{children:[r.jsx(tn,{adminName:"Admin"}),r.jsxs("div",{className:"page company-page",children:[r.jsx("div",{className:"breadcrumb",children:"Dashboard › Company Management"}),r.jsxs("div",{className:"page-header",children:[r.jsxs("h2",{children:[r.jsx("i",{className:"fa fa-building"}),"Company Management"]}),r.jsxs("button",{className:"btn primary",id:"openAddCompanyModalBtn",type:"button",onClick:()=>{a(!0)},children:[r.jsx("i",{className:"fa fa-plus"}),"Add New Company"]})]}),r.jsx("div",{className:"tiles",children:cg.map(j=>r.jsxs("div",{className:"tile",children:[r.jsx("i",{className:j.iconClass}),r.jsx("h3",{children:j.value}),r.jsx("p",{children:j.label})]},j.label))}),r.jsx("div",{className:"card",children:r.jsxs("table",{children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"Company Name"}),r.jsx("th",{children:"Business ID"}),r.jsx("th",{children:"Industry"}),r.jsx("th",{children:"Owner"}),r.jsx("th",{children:"Status"}),r.jsx("th",{children:"Actions"})]})}),r.jsx("tbody",{children:e.map(j=>r.jsxs("tr",{children:[r.jsxs("td",{className:"company",children:[r.jsx("i",{className:"fa fa-building"}),j.companyName]}),r.jsx("td",{children:j.businessId}),r.jsx("td",{children:j.industry}),r.jsxs("td",{className:"owner",children:[r.jsx("img",{src:j.ownerAvatar,alt:""}),j.ownerName]}),r.jsx("td",{children:r.jsx("span",{className:`status ${mg(j.status)}`,children:j.status})}),r.jsxs("td",{children:[r.jsx("button",{type:"button",className:"action view view-company-btn",onClick:()=>{s(j.id)},children:"View"}),r.jsx("button",{type:"button",className:"action edit edit-company-btn",onClick:()=>{c(j.id),x(fg(j))},children:"Edit"}),r.jsx("button",{type:"button",className:`action ${j.actionClass}`,children:j.actionLabel})]})]},j.id))})]})})]}),r.jsx("div",{className:`modal-overlay${y?" open":""}`,id:"viewCompanyModal","aria-hidden":!y,onClick:j=>{j.target===j.currentTarget&&b()},children:r.jsxs("div",{className:"modal-card",role:"dialog","aria-modal":"true","aria-labelledby":"viewCompanyTitle",children:[r.jsxs("div",{className:"modal-header",children:[r.jsx("h3",{id:"viewCompanyTitle",children:"Company Details"}),r.jsx("button",{type:"button",className:"modal-close",id:"closeViewCompanyModalBtn","aria-label":"Close",onClick:b,children:"x"})]}),r.jsxs("div",{className:"company-details-grid",children:[r.jsxs("div",{className:"company-details-item",children:[r.jsx("span",{children:"Company Name"}),r.jsx("strong",{id:"viewCompanyName",children:(y==null?void 0:y.companyName)??"-"})]}),r.jsxs("div",{className:"company-details-item",children:[r.jsx("span",{children:"Trade License Number"}),r.jsx("strong",{id:"viewTradeLicenseNumber",children:(y==null?void 0:y.businessId)??"-"})]}),r.jsxs("div",{className:"company-details-item",children:[r.jsx("span",{children:"VAT TRN"}),r.jsx("strong",{id:"viewVatTrn",children:(y==null?void 0:y.vatTrn)??"-"})]}),r.jsxs("div",{className:"company-details-item",children:[r.jsx("span",{children:"License Expiry Date"}),r.jsx("strong",{id:"viewLicenseExpiryDate",children:(y==null?void 0:y.licenseExpiryDate)??"-"})]}),r.jsxs("div",{className:"company-details-item",children:[r.jsx("span",{children:"Company Email"}),r.jsx("strong",{id:"viewCompanyEmail",children:(y==null?void 0:y.companyEmail)??"-"})]}),r.jsxs("div",{className:"company-details-item",children:[r.jsx("span",{children:"Phone Number"}),r.jsx("strong",{id:"viewPhoneNumber",children:(y==null?void 0:y.phoneNumber)??"-"})]}),r.jsxs("div",{className:"company-details-item",children:[r.jsx("span",{children:"Address"}),r.jsx("strong",{id:"viewAddress",children:(y==null?void 0:y.address)??"-"})]}),r.jsxs("div",{className:"company-details-item",children:[r.jsx("span",{children:"PO Box"}),r.jsx("strong",{id:"viewPoBox",children:(y==null?void 0:y.poBox)??"-"})]}),r.jsxs("div",{className:"company-details-item",children:[r.jsx("span",{children:"Admin Name"}),r.jsx("strong",{id:"viewAdminName",children:(y==null?void 0:y.ownerName)??"-"})]}),r.jsxs("div",{className:"company-details-item",children:[r.jsx("span",{children:"Admin Email"}),r.jsx("strong",{id:"viewAdminEmail",children:(y==null?void 0:y.adminEmail)??"-"})]}),r.jsxs("div",{className:"company-details-item",children:[r.jsx("span",{children:"Username"}),r.jsx("strong",{id:"viewUsername",children:(y==null?void 0:y.username)??"-"})]}),r.jsxs("div",{className:"company-details-item",children:[r.jsx("span",{children:"Password"}),r.jsx("strong",{id:"viewPassword",children:(y==null?void 0:y.password)??"-"})]})]}),r.jsx("div",{className:"modal-actions",children:r.jsx("button",{type:"button",className:"btn",id:"closeViewCompanyBtn",onClick:b,children:"Close"})})]})}),r.jsx("div",{className:`modal-overlay${N?" open":""}`,id:"editCompanyModal","aria-hidden":!N,onClick:j=>{j.target===j.currentTarget&&u()},children:r.jsxs("div",{className:"modal-card",role:"dialog","aria-modal":"true","aria-labelledby":"editCompanyTitle",children:[r.jsxs("div",{className:"modal-header",children:[r.jsx("h3",{id:"editCompanyTitle",children:"Edit Company Details"}),r.jsx("button",{type:"button",className:"modal-close",id:"closeEditCompanyModalBtn","aria-label":"Close",onClick:u,children:"x"})]}),r.jsxs("form",{id:"editCompanyForm",className:"company-form",onSubmit:E,children:[r.jsx("input",{type:"hidden",id:"editRowIndex",value:N?e.findIndex(j=>j.id===N.id)+1:"",readOnly:!0}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"editCompanyName",children:"Company Name"}),r.jsx("input",{id:"editCompanyName",type:"text",required:!0,value:f.companyName,onChange:j=>{v("companyName",j.target.value)}})]}),r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"editTradeLicenseNo",children:"Trade License Number"}),r.jsx("input",{id:"editTradeLicenseNo",type:"text",required:!0,value:f.tradeLicenseNo,onChange:j=>{v("tradeLicenseNo",j.target.value)}})]})]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"editVatTrn",children:"VAT TRN"}),r.jsx("input",{id:"editVatTrn",type:"text",required:!0,value:f.vatTrn,onChange:j=>{v("vatTrn",j.target.value)}})]}),r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"editLicenseExpiryDate",children:"License Expiry Date"}),r.jsx("input",{id:"editLicenseExpiryDate",type:"date",required:!0,value:f.licenseExpiryDate,onChange:j=>{v("licenseExpiryDate",j.target.value)}})]})]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"editCompanyEmail",children:"Company Email"}),r.jsx("input",{id:"editCompanyEmail",type:"email",required:!0,value:f.companyEmail,onChange:j=>{v("companyEmail",j.target.value)}})]}),r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"editPhoneNumber",children:"Phone Number"}),r.jsx("input",{id:"editPhoneNumber",type:"tel",required:!0,value:f.phoneNumber,onChange:j=>{v("phoneNumber",j.target.value)}})]})]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"editAddress",children:"Address"}),r.jsx("input",{id:"editAddress",type:"text",required:!0,value:f.address,onChange:j=>{v("address",j.target.value)}})]}),r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"editPoBox",children:"PO Box"}),r.jsx("input",{id:"editPoBox",type:"text",required:!0,value:f.poBox,onChange:j=>{v("poBox",j.target.value)}})]})]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"editAdminName",children:"Admin Name"}),r.jsx("input",{id:"editAdminName",type:"text",required:!0,value:f.adminName,onChange:j=>{v("adminName",j.target.value)}})]}),r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"editAdminEmail",children:"Admin Email"}),r.jsx("input",{id:"editAdminEmail",type:"email",required:!0,value:f.adminEmail,onChange:j=>{v("adminEmail",j.target.value)}})]})]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"editUsername",children:"Username"}),r.jsx("input",{id:"editUsername",type:"text",required:!0,value:f.username,onChange:j=>{v("username",j.target.value)}})]}),r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"editPassword",children:"Password"}),r.jsx("input",{id:"editPassword",type:"text",required:!0,value:f.password,onChange:j=>{v("password",j.target.value)}})]})]}),r.jsxs("div",{className:"modal-actions",children:[r.jsx("button",{type:"button",className:"btn",id:"cancelEditCompanyBtn",onClick:u,children:"Cancel"}),r.jsx("button",{type:"submit",className:"btn primary",children:"Save Changes"})]})]})]})}),r.jsx("div",{className:`modal-overlay${t?" open":""}`,id:"addCompanyModal","aria-hidden":!t,onClick:j=>{j.target===j.currentTarget&&S()},children:r.jsxs("div",{className:"modal-card",role:"dialog","aria-modal":"true","aria-labelledby":"addCompanyTitle",children:[r.jsxs("div",{className:"modal-header",children:[r.jsx("h3",{id:"addCompanyTitle",children:"Add New Company"}),r.jsx("button",{type:"button",className:"modal-close",id:"closeAddCompanyModalBtn","aria-label":"Close",onClick:S,children:"x"})]}),r.jsxs("form",{id:"addCompanyForm",className:"company-form",onSubmit:P,children:[r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"companyName",children:"Company Name"}),r.jsx("input",{id:"companyName",name:"company_name",type:"text",required:!0,ref:p,value:d.companyName,onChange:j=>{m("companyName",j.target.value)}})]}),r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"tradeLicenseNo",children:"Trade License Number"}),r.jsx("input",{id:"tradeLicenseNo",name:"trade_license_number",type:"text",required:!0,value:d.tradeLicenseNo,onChange:j=>{m("tradeLicenseNo",j.target.value)}})]})]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"vatTrn",children:"VAT TRN"}),r.jsx("input",{id:"vatTrn",name:"vat_trn",type:"text",required:!0,value:d.vatTrn,onChange:j=>{m("vatTrn",j.target.value)}})]}),r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"licenseExpiryDate",children:"License Expiry Date"}),r.jsx("input",{id:"licenseExpiryDate",name:"license_expiry_date",type:"date",required:!0,value:d.licenseExpiryDate,onChange:j=>{m("licenseExpiryDate",j.target.value)}})]})]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"companyEmail",children:"Company Email"}),r.jsx("input",{id:"companyEmail",name:"company_email",type:"email",required:!0,value:d.companyEmail,onChange:j=>{m("companyEmail",j.target.value)}})]}),r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"phoneNumber",children:"Phone Number"}),r.jsx("input",{id:"phoneNumber",name:"phone_number",type:"tel",required:!0,value:d.phoneNumber,onChange:j=>{m("phoneNumber",j.target.value)}})]})]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"companyAddress",children:"Address"}),r.jsx("input",{id:"companyAddress",name:"address",type:"text",required:!0,value:d.address,onChange:j=>{m("address",j.target.value)}})]}),r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"poBox",children:"PO Box"}),r.jsx("input",{id:"poBox",name:"po_box",type:"text",required:!0,value:d.poBox,onChange:j=>{m("poBox",j.target.value)}})]})]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"adminName",children:"Admin Name"}),r.jsx("input",{id:"adminName",name:"admin_name",type:"text",required:!0,value:d.adminName,onChange:j=>{m("adminName",j.target.value)}})]}),r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"adminEmail",children:"Admin Email"}),r.jsx("input",{id:"adminEmail",name:"admin_email",type:"email",required:!0,value:d.adminEmail,onChange:j=>{m("adminEmail",j.target.value)}})]})]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"companyUsername",children:"Username"}),r.jsx("input",{id:"companyUsername",name:"username",type:"text",required:!0,value:d.username,onChange:j=>{m("username",j.target.value)}})]}),r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"companyPassword",children:"Password"}),r.jsx("input",{id:"companyPassword",name:"password",type:"password",required:!0,value:d.password,onChange:j=>{m("password",j.target.value)}})]})]}),r.jsxs("div",{className:"modal-actions",children:[r.jsx("button",{type:"button",className:"btn",id:"cancelAddCompanyBtn",onClick:S,children:"Cancel"}),r.jsx("button",{type:"submit",className:"btn primary",children:"Create Company"})]})]})]})})]})}const gg=[{key:"dashboard",path:"/dashboard",icon:"🏠",label:"Dashboard",className:"active"},{key:"sales",path:"/sales",icon:"💼",label:"Sales Department"},{key:"accounts",path:"/accounts",icon:"📊",label:"Accounts Department"},{key:"services",path:"/services",icon:"🧾",label:"Services & Packages"},{key:"users",path:"/users",icon:"👥",label:"Users & Roles"},{key:"payments",path:"/payments",icon:"💳",label:"Payments & Reports"},{key:"settings",path:"/settings",icon:"⚙️",label:"Settings"},{key:"logout",path:"/logout",icon:"🚪",label:"Logout"}],xg=[{head:"Sales Department",label:"Active Leads:",value:"25",className:"kpi-blue"},{head:"Accounts Department",label:"Pending Payments:",value:"AED 1,20,000",className:"kpi-green"},{head:"Operations",label:"Approval List:",value:"7",className:"kpi-orange"},{head:"Company Management",label:"Active Companies:",value:"45",className:"kpi-purple"}],vg=[{lead:"ABC Corp",assigned:"Rahul",status:"Follow Up",statusClass:"blue",action:"Action",actionClass:""},{lead:"XYZ Ltd",assigned:"Priya",status:"New Lead",statusClass:"yellow",action:"Action",actionClass:""},{lead:"Tech Solutions",assigned:"Amit",status:"In Progress",statusClass:"green",action:"Action",actionClass:""}],yg=[{company:"Gulf Star LLC",zone:"Free Zone",status:"Active",statusClass:"green",action:"Manage",actionClass:"manage"},{company:"Desert Holdings",zone:"Mainland",status:"Expiring",statusClass:"orange",action:"Assign",actionClass:"assign"},{company:"Oceanic Corp",zone:"Mainland",status:"Expired",statusClass:"red",action:"Reactivate",actionClass:"reactivate"}],Jo={pendingInvoices:"15",totalRevenue:"AED 3,45,000"},bg=[{invoice:"#1024",client:"Global Enterprises",amount:"AED 15,000",status:"Paid",statusClass:"green"},{invoice:"#1025",client:"Metro Corp",amount:"AED 8,500",status:"Pending",statusClass:"yellow"},{invoice:"#1026",client:"XYZ Solutions",amount:"AED 8,500",status:"Overdue",statusClass:"red"}],jg=[{prefix:"Finance:",message:"Invoice #123 updated",time:"25m ago"},{prefix:"Sales:",message:"New lead added",time:"10m ago"},{prefix:"Zoho CRM:",message:"Sync completed",time:"25m ago"}],wg=[{message:"Security: Failed login attempt",time:"45m ago"},{message:"System: Backup completed",time:"1h ago"}],kg=`:root{\r
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
.side-nav{ display:flex; flex-direction:column; gap:8px; }\r
.side-nav a{ color:rgba(255,255,255,.9); text-decoration:none; padding:10px; border-radius:8px; cursor:pointer; }\r
.side-nav a.active{ background:rgba(255,255,255,.06); }\r
\r
.content{ flex:1; display:flex; flex-direction:column; }\r
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
@media (max-width:1000px){\r
  .kpi-grid{ grid-template-columns:repeat(auto-fit,minmax(180px,1fr)); }\r
  .grid{ grid-template-columns:1fr; }\r
  .col.right{ grid-column:auto; }\r
  .sidebar{ display:none; }\r
  .topbar .nav-items{ /* keep visible but allow scroll on small screens */ overflow:auto; }\r
  .card h4{ font-size:18px; }\r
  .card h5{ font-size:16px; }\r
}\r
\r
/* Route-scoped dashboard overrides to prevent global admin CSS collisions */\r
.admin-dashboard-page.wrap{\r
  display:flex !important;\r
  min-height:100vh !important;\r
}\r
\r
.admin-dashboard-page{\r
  background:radial-gradient(circle at 10% 0%, #ffffff 0%, #f4f6fb 35%, #edf2f9 100%) !important;\r
  color:var(--text) !important;\r
}\r
\r
html.dark .admin-dashboard-page,\r
body.dark .admin-dashboard-page,\r
html.dark-mode .admin-dashboard-page,\r
body.dark-mode .admin-dashboard-page{\r
  background:#0f1720 !important;\r
}\r
\r
.admin-dashboard-page .sidebar{\r
  display:none !important;\r
}\r
\r
.admin-dashboard-page .content{\r
  flex:1 !important;\r
  display:flex !important;\r
  flex-direction:column !important;\r
  min-width:0 !important;\r
}\r
\r
.admin-dashboard-page .main{\r
  padding:24px !important;\r
}\r
\r
.admin-dashboard-page .kpi-grid{\r
  display:grid !important;\r
  grid-template-columns:repeat(4,1fr) !important;\r
  gap:18px !important;\r
  margin-bottom:24px !important;\r
}\r
\r
.admin-dashboard-page .kpi{\r
  padding:18px !important;\r
  border-radius:14px !important;\r
  display:flex !important;\r
  flex-direction:column !important;\r
  justify-content:space-between !important;\r
  border:1px solid #e4edf8 !important;\r
  box-shadow:0 8px 20px rgba(19,39,67,.08) !important;\r
  min-height:auto !important;\r
}\r
\r
.admin-dashboard-page .kpi-head{\r
  font-weight:700 !important;\r
  margin-bottom:8px !important;\r
  font-size:13px !important;\r
  color:#516883 !important;\r
  text-transform:uppercase !important;\r
  letter-spacing:.45px !important;\r
}\r
\r
.admin-dashboard-page .kpi-value{\r
  font-size:16px !important;\r
  color:#274766 !important;\r
}\r
\r
.admin-dashboard-page .kpi span{\r
  font-size:21px !important;\r
  font-weight:800 !important;\r
  margin-left:4px !important;\r
}\r
\r
.admin-dashboard-page .kpi.kpi-blue{\r
  border-top:4px solid #2b83d7 !important;\r
  background:linear-gradient(160deg,#ffffff,#f4f9ff) !important;\r
}\r
\r
.admin-dashboard-page .kpi.kpi-green{\r
  border-top:4px solid #2fbe9a !important;\r
  background:linear-gradient(160deg,#ffffff,#f3fff9) !important;\r
}\r
\r
.admin-dashboard-page .kpi.kpi-orange{\r
  border-top:4px solid #f39c12 !important;\r
  background:linear-gradient(160deg,#ffffff,#fffaf2) !important;\r
}\r
\r
.admin-dashboard-page .kpi.kpi-purple{\r
  border-top:4px solid #6f42c1 !important;\r
  background:linear-gradient(160deg,#ffffff,#f8f3ff) !important;\r
}\r
\r
.admin-dashboard-page .kpi.kpi-blue span{\r
  color:#2b83d7 !important;\r
}\r
\r
.admin-dashboard-page .kpi.kpi-green span{\r
  color:#2f8f83 !important;\r
}\r
\r
.admin-dashboard-page .kpi.kpi-orange span{\r
  color:#d88706 !important;\r
}\r
\r
.admin-dashboard-page .kpi.kpi-purple span{\r
  color:#6f42c1 !important;\r
}\r
\r
.admin-dashboard-page .grid{\r
  display:grid !important;\r
  grid-template-columns:1fr 420px !important;\r
  gap:22px !important;\r
  align-items:start !important;\r
  margin-top:0 !important;\r
}\r
\r
.admin-dashboard-page .col{\r
  display:block !important;\r
  min-width:0 !important;\r
}\r
\r
.admin-dashboard-page .col.left{\r
  grid-column:1 !important;\r
}\r
\r
.admin-dashboard-page .col.middle{\r
  grid-column:1 !important;\r
}\r
\r
.admin-dashboard-page .col.right{\r
  grid-column:2 !important;\r
}\r
\r
.admin-dashboard-page .management-tiles{\r
  display:grid !important;\r
  grid-template-columns:repeat(2,minmax(0,1fr)) !important;\r
  gap:18px !important;\r
}\r
\r
.admin-dashboard-page .management-tile{\r
  margin-bottom:0 !important;\r
}\r
\r
.admin-dashboard-page .card{\r
  background:linear-gradient(180deg,#ffffff 0%, #fbfcff 100%) !important;\r
  border:1px solid #e3eaf3 !important;\r
  border-radius:16px !important;\r
  padding:20px !important;\r
  box-shadow:0 10px 24px rgba(18,38,63,.08) !important;\r
  margin:0 0 20px !important;\r
  max-width:none !important;\r
  width:auto !important;\r
  color:var(--text) !important;\r
  display:block !important;\r
}\r
\r
.admin-dashboard-page .small-card{\r
  padding:14px !important;\r
}\r
\r
.admin-dashboard-page .card h4{\r
  font-size:22px !important;\r
  color:#17385d !important;\r
  margin-bottom:12px !important;\r
  letter-spacing:.2px !important;\r
}\r
\r
.admin-dashboard-page .card h5{\r
  font-size:18px !important;\r
  color:#24496e !important;\r
  margin:16px 0 10px !important;\r
}\r
\r
.admin-dashboard-page .stats{\r
  display:grid !important;\r
  grid-template-columns:repeat(2,minmax(180px,1fr)) !important;\r
  gap:12px !important;\r
  margin-bottom:8px !important;\r
}\r
\r
.admin-dashboard-page .stat{\r
  background:linear-gradient(135deg,#ecf7ff,#f5faff) !important;\r
  border:1px solid #d6e7f7 !important;\r
  border-radius:14px !important;\r
  padding:14px 16px !important;\r
}\r
\r
.admin-dashboard-page .stat .small{\r
  font-size:12px !important;\r
  color:#5f738a !important;\r
  margin-bottom:8px !important;\r
  font-weight:600 !important;\r
  text-transform:uppercase !important;\r
  letter-spacing:.4px !important;\r
}\r
\r
.admin-dashboard-page .stat .big{\r
  font-size:22px !important;\r
  color:#1c4268 !important;\r
  font-weight:700 !important;\r
}\r
\r
.admin-dashboard-page .table{\r
  width:100% !important;\r
  border-collapse:separate !important;\r
  border-spacing:0 !important;\r
  border-radius:12px !important;\r
  overflow:hidden !important;\r
  background:transparent !important;\r
}\r
\r
.admin-dashboard-page .table thead th{\r
  text-align:left !important;\r
  padding:12px 10px !important;\r
  color:#6b7e95 !important;\r
  font-size:12px !important;\r
  font-weight:700 !important;\r
  text-transform:uppercase !important;\r
  letter-spacing:.5px !important;\r
  background:#f7faff !important;\r
  border-bottom:1px solid #e3edf7 !important;\r
}\r
\r
.admin-dashboard-page .table tbody td{\r
  padding:12px 10px !important;\r
  border-bottom:1px solid #edf2f8 !important;\r
  color:var(--text) !important;\r
}\r
\r
.admin-dashboard-page .table tbody tr:hover{\r
  background:#f8fbff !important;\r
}\r
\r
.admin-dashboard-page .table.small thead th,\r
.admin-dashboard-page .table.small tbody td{\r
  padding:11px 10px !important;\r
  font-size:14px !important;\r
}\r
\r
.admin-dashboard-page .table tbody tr:last-child td{\r
  border-bottom:none !important;\r
}\r
\r
.admin-dashboard-page .management-table thead th:last-child,\r
.admin-dashboard-page .management-table tbody td:last-child{\r
  width:150px !important;\r
  text-align:center !important;\r
}\r
\r
.admin-dashboard-page .management-table thead th:nth-child(3),\r
.admin-dashboard-page .management-table tbody td:nth-child(3){\r
  width:170px !important;\r
}\r
\r
.admin-dashboard-page .feed{\r
  display:flex !important;\r
  flex-direction:column !important;\r
  gap:10px !important;\r
}\r
\r
.admin-dashboard-page .feed-item{\r
  font-size:14px !important;\r
  border:1px solid #e7edf5 !important;\r
  background:linear-gradient(180deg,#f9fbff,#f6f9fe) !important;\r
  border-radius:10px !important;\r
  padding:10px 12px !important;\r
  color:var(--text) !important;\r
}\r
\r
.admin-dashboard-page .muted{\r
  color:var(--muted) !important;\r
  font-size:12px !important;\r
  margin-left:8px !important;\r
}\r
\r
@media (max-width:1500px){\r
  .admin-dashboard-page .management-tiles{\r
    grid-template-columns:1fr !important;\r
  }\r
}\r
\r
@media (max-width:1000px){\r
  .admin-dashboard-page .kpi-grid{\r
    grid-template-columns:repeat(auto-fit,minmax(180px,1fr)) !important;\r
  }\r
\r
  .admin-dashboard-page .grid{\r
    grid-template-columns:1fr !important;\r
  }\r
\r
  .admin-dashboard-page .col.right{\r
    grid-column:auto !important;\r
  }\r
\r
  .admin-dashboard-page .card h4{\r
    font-size:18px !important;\r
  }\r
\r
  .admin-dashboard-page .card h5{\r
    font-size:16px !important;\r
  }\r
}\r
`,Ng="/portal/admin/assets/images/logowhite.png";function Sg(){Xe({pageKey:"dashboard",pageCssText:kg});const e=`${"/portal/admin/".replace(/\/+$/,"")}`;return r.jsxs("div",{className:"admin-dashboard-page wrap",children:[r.jsxs("aside",{className:"sidebar",children:[r.jsxs("div",{className:"brand",children:[r.jsx("div",{className:"brand-logo","aria-hidden":"true",children:r.jsx("img",{src:Ng,alt:"LedgerWorx",className:"nav-logo"})}),r.jsxs("h2",{children:["LEDGER ",r.jsx("span",{children:"WORX"})]})]}),r.jsx("nav",{className:"side-nav",children:gg.map(n=>r.jsxs("a",{href:`${e}${n.path}`,className:n.className??"",children:[n.icon," ",n.label]},n.key))})]}),r.jsxs("div",{className:"content",children:[r.jsx(tn,{adminName:"Admin"}),r.jsxs("main",{className:"main",children:[r.jsx("div",{className:"kpi-grid",children:xg.map(n=>r.jsxs("div",{className:`kpi ${n.className}`,children:[r.jsx("div",{className:"kpi-head",children:n.head}),r.jsxs("div",{className:"kpi-value",children:[n.label," ",r.jsx("span",{children:n.value})]})]},n.head))}),r.jsxs("div",{className:"grid",children:[r.jsx("section",{className:"col left",children:r.jsxs("div",{className:"management-tiles",children:[r.jsxs("div",{className:"card management-tile",children:[r.jsx("h4",{children:"Lead Management"}),r.jsxs("table",{className:"table management-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"Lead"}),r.jsx("th",{children:"Assigned"}),r.jsx("th",{children:"Status"}),r.jsx("th",{children:"Action"})]})}),r.jsx("tbody",{children:vg.map(n=>r.jsxs("tr",{children:[r.jsx("td",{children:n.lead}),r.jsx("td",{children:n.assigned}),r.jsx("td",{children:r.jsx("span",{className:`tag ${n.statusClass}`,children:n.status})}),r.jsx("td",{children:r.jsx("button",{className:`table-action-btn ${n.actionClass}`.trim(),children:n.action})})]},`${n.lead}-${n.assigned}`))})]})]}),r.jsxs("div",{className:"card management-tile",children:[r.jsx("h4",{children:"Company Management"}),r.jsxs("table",{className:"table management-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"Company"}),r.jsx("th",{children:"Zone"}),r.jsx("th",{children:"Status"}),r.jsx("th",{children:"Actions"})]})}),r.jsx("tbody",{children:yg.map(n=>r.jsxs("tr",{children:[r.jsx("td",{children:n.company}),r.jsx("td",{children:n.zone}),r.jsx("td",{children:r.jsx("span",{className:`tag ${n.statusClass}`,children:n.status})}),r.jsx("td",{children:r.jsx("button",{className:`table-action-btn ${n.actionClass}`.trim(),children:n.action})})]},`${n.company}-${n.zone}`))})]})]})]})}),r.jsx("section",{className:"col middle",children:r.jsxs("div",{className:"card",children:[r.jsx("h4",{children:"Accounts Overview"}),r.jsxs("div",{className:"stats",children:[r.jsxs("div",{className:"stat",children:[r.jsx("div",{className:"small",children:"Pending Invoices"}),r.jsx("div",{className:"big",children:Jo.pendingInvoices})]}),r.jsxs("div",{className:"stat",children:[r.jsx("div",{className:"small",children:"Total Revenue"}),r.jsx("div",{className:"big",children:Jo.totalRevenue})]})]}),r.jsx("h5",{children:"Recent Payments"}),r.jsxs("table",{className:"table small",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"Invoice"}),r.jsx("th",{children:"Client"}),r.jsx("th",{children:"Amount"}),r.jsx("th",{children:"Status"})]})}),r.jsx("tbody",{children:bg.map(n=>r.jsxs("tr",{children:[r.jsx("td",{children:n.invoice}),r.jsx("td",{children:n.client}),r.jsx("td",{children:n.amount}),r.jsx("td",{children:r.jsx("span",{className:`tag ${n.statusClass}`,children:n.status})})]},`${n.invoice}-${n.client}`))})]})]})}),r.jsxs("aside",{className:"col right",children:[r.jsxs("div",{className:"card small-card",children:[r.jsx("h4",{children:"Company Management"}),r.jsx("div",{className:"feed",children:jg.map(n=>r.jsxs("div",{className:"feed-item",children:[r.jsx("strong",{children:n.prefix})," ",n.message,r.jsx("span",{className:"muted",children:n.time})]},`${n.prefix}-${n.message}`))})]}),r.jsxs("div",{className:"card small-card",children:[r.jsx("h4",{children:"Live Activity Feed"}),r.jsx("div",{className:"feed",children:wg.map(n=>r.jsxs("div",{className:"feed-item",children:[n.message,r.jsx("span",{className:"muted",children:n.time})]},`${n.message}-${n.time}`))})]})]})]})]})]})]})}const Cg=`.logout-page{\r
  font-family:Segoe UI,sans-serif;\r
  display:flex;\r
  align-items:center;\r
  justify-content:center;\r
  height:100vh;\r
  background:#eef1f7;\r
  color:#2c3e50;\r
}\r
\r
.logout-page .card{\r
  background:#fff;\r
  padding:24px;\r
  border-radius:10px;\r
  box-shadow:0 8px 20px rgba(0,0,0,.08);\r
}\r
`;function Pg(){var n,t;const e=ti();return Xe({pageKey:"logout",pageCssText:Cg,includeHeader:!1,includeTheme:!1}),k.useEffect(()=>{var a,i,s;(a=e.data)!=null&&a.authenticated&&((s=(i=e.data)==null?void 0:i.config)!=null&&s.logoutUrl)&&window.location.replace(e.data.config.logoutUrl)},[e.data]),r.jsx("div",{className:"logout-page",children:r.jsxs("div",{className:"card",children:[r.jsx("h2",{children:"You are logged out"}),r.jsx("p",{children:r.jsx("a",{href:((t=(n=e.data)==null?void 0:n.config)==null?void 0:t.loginUrl)||"https://ledgerworx.me/login/",children:"Return to login"})})]})})}const Eg=[{key:"approval",iconClass:"fa fa-clipboard-check",title:"Approval List",description:"Pending approvals for companies, services & payments"},{key:"request",iconClass:"fa fa-file-circle-plus",title:"Request Form",description:"Incoming requests from clients and staff"}],Ag=[{type:"Company Registration",reference:"BR-1024",requestedBy:"Client – ABC Corp"}],Tg=[{requestType:"Document Upload",reference:"REQ-2031",from:"Client – XYZ Ltd"}],Dg=["Rahul","Priya","Amit"],Rg=`:root{\r
  --primary:#2f8f83;\r
  --dark:#1f2f3a;\r
  --bg:#eef1f7;\r
  --card:#ffffff;\r
  --text:#2c3e50;\r
  --muted:#7f8c8d;\r
  --line:#e2ebf5;\r
  --shadow:rgba(0,0,0,0.1);\r
}\r
\r
*{margin:0;padding:0;box-sizing:border-box;font-family:"Segoe UI",sans-serif;}\r
body{\r
  background:radial-gradient(circle at 0% 0%, #ffffff 0%, #edf3fb 50%, #e6edf8 100%);\r
  color:var(--text);\r
}\r
\r
.page{padding:24px;max-width:1450px;margin:0 auto;}\r
.page-header{\r
  display:flex;\r
  justify-content:space-between;\r
  align-items:center;\r
  margin-bottom:20px;\r
}\r
.page-header h2{\r
  font-size:30px;\r
  color:#1d3f64;\r
  letter-spacing:.2px;\r
}\r
.page-header h2 i{margin-right:8px;color:#2f8f83;}\r
\r
.tiles{\r
  display:grid;\r
  grid-template-columns:repeat(auto-fit,minmax(260px,1fr));\r
  gap:18px;\r
  margin-bottom:22px;\r
}\r
.tile{\r
  background:linear-gradient(140deg,#ffffff,#f7fbff);\r
  border:1px solid var(--line);\r
  padding:25px;\r
  border-radius:16px;\r
  box-shadow:0 10px 22px rgba(18,38,63,.10);\r
  cursor:pointer;\r
  transition:.25s ease;\r
}\r
.tile:hover{\r
  transform:translateY(-4px);\r
  box-shadow:0 16px 30px rgba(18,38,63,.14);\r
  border-color:#cddff2;\r
}\r
.tile i{\r
  font-size:30px;\r
  color:#2d8de0;\r
  margin-bottom:10px;\r
}\r
.tile h3{\r
  font-size:22px;\r
  margin-bottom:6px;\r
  color:#1a3a5b;\r
}\r
.tile p{font-size:14px;color:var(--muted);}\r
.tile:first-child,\r
.tile:last-child{\r
  background:linear-gradient(140deg,#f6fbff,#edf7ff);\r
}\r
\r
.card{\r
  background:linear-gradient(180deg,#ffffff,#fbfdff);\r
  border:1px solid var(--line);\r
  border-radius:16px;\r
  box-shadow:0 10px 22px rgba(18,38,63,.08);\r
  padding:20px;\r
  display:none;\r
}\r
.card h3{\r
  font-size:24px;\r
  color:#1d4268;\r
}\r
\r
table{\r
  width:100%;\r
  border-collapse:separate;\r
  border-spacing:0;\r
  border:1px solid var(--line);\r
  border-radius:12px;\r
  overflow:hidden;\r
}\r
th,td{\r
  padding:12px;\r
  font-size:14px;\r
  border-bottom:1px solid #edf2f8;\r
}\r
th{\r
  background:#f6faff;\r
  text-align:left;\r
  color:#60758d;\r
  font-size:12px;\r
  text-transform:uppercase;\r
  letter-spacing:.45px;\r
}\r
tr:hover{background:#f8fbff}\r
tbody tr:last-child td{border-bottom:none;}\r
\r
.btn{\r
  padding:7px 13px;\r
  border:1px solid transparent;\r
  border-radius:999px;\r
  cursor:pointer;\r
  font-size:12px;\r
  font-weight:700;\r
}\r
.approve{background:linear-gradient(135deg,#2ec68f,#21a976);border-color:#8be4c3;color:#fff;}\r
.email{background:linear-gradient(135deg,#49adf7,#2d8de0);border-color:#96d0fa;color:#fff;}\r
.assign{background:linear-gradient(135deg,#ffb84f,#ef9721);border-color:#ffd59e;color:#fff;}\r
.view{background:linear-gradient(135deg,#8f9cab,#748497);border-color:#c2cad4;color:#fff;}\r
.btn:hover{filter:brightness(1.05)}\r
\r
.modal{\r
  position:fixed;\r
  inset:0;\r
  background:rgba(0,0,0,.6);\r
  display:none;\r
  align-items:center;\r
  justify-content:center;\r
  z-index:100;\r
}\r
.modal-content{\r
  background:linear-gradient(180deg,#ffffff,#f8fbff);\r
  border:1px solid var(--line);\r
  padding:25px;\r
  border-radius:14px;\r
  width:350px;\r
  box-shadow:0 16px 32px rgba(0,0,0,.22);\r
}\r
.modal-content select{\r
  width:100%;\r
  padding:10px;\r
  border-radius:10px;\r
  border:1px solid #d2dce8;\r
  margin:15px 0;\r
}\r
\r
.popup{\r
  position:fixed;\r
  top:20px;\r
  right:20px;\r
  background:#27ae60;\r
  color:#fff;\r
  padding:12px 18px;\r
  border-radius:10px;\r
  box-shadow:0 10px 18px rgba(39,174,96,.28);\r
  display:none;\r
  z-index:200;\r
}\r
@media(max-width:900px){\r
  .page{padding:16px;}\r
  .page-header h2{font-size:24px;}\r
  .tile h3{font-size:20px;}\r
  .card h3{font-size:20px;}\r
}\r
`;function zg(){Xe({pageKey:"operations",pageCssText:Rg});const[e,n]=k.useState(null),[t,a]=k.useState(!1),[i,s]=k.useState("Select Salesperson"),[l,c]=k.useState(""),d=k.useRef(null);k.useEffect(()=>()=>{d.current&&clearTimeout(d.current)},[]);function h(p){d.current&&clearTimeout(d.current),c(p),d.current=setTimeout(()=>{c(""),d.current=null},3e3)}function f(){h("Email sent successfully")}function x(){a(!1),h("Salesperson assigned successfully")}return r.jsxs(r.Fragment,{children:[r.jsx(tn,{adminName:"Admin"}),r.jsxs("div",{className:"page",children:[r.jsx("div",{className:"page-header",children:r.jsxs("h2",{children:[r.jsx("i",{className:"fa fa-gears"}),"Operations"]})}),r.jsx("div",{className:"tiles",children:Eg.map(p=>r.jsxs("div",{className:"tile",onClick:()=>{n(p.key)},children:[r.jsx("i",{className:p.iconClass}),r.jsx("h3",{children:p.title}),r.jsx("p",{children:p.description})]},p.key))}),r.jsxs("div",{className:"card",id:"approvalCard",style:{display:e==="approval"?"block":"none"},children:[r.jsx("h3",{children:"Approval List"}),r.jsx("br",{}),r.jsxs("table",{children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"Type"}),r.jsx("th",{children:"Reference"}),r.jsx("th",{children:"Requested By"}),r.jsx("th",{children:"Actions"})]})}),r.jsx("tbody",{children:Ag.map(p=>r.jsxs("tr",{children:[r.jsx("td",{children:p.type}),r.jsx("td",{children:p.reference}),r.jsx("td",{children:p.requestedBy}),r.jsxs("td",{children:[r.jsx("button",{className:"btn approve",type:"button",children:"Approve"})," ",r.jsx("button",{className:"btn email",type:"button",onClick:()=>{f()},children:"Send Email"})," ",r.jsx("button",{className:"btn assign",type:"button",onClick:()=>{a(!0)},children:"Assign"})]})]},`${p.type}-${p.reference}`))})]})]}),r.jsxs("div",{className:"card",id:"requestCard",style:{display:e==="request"?"block":"none"},children:[r.jsx("h3",{children:"Request Form"}),r.jsx("br",{}),r.jsxs("table",{children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"Request Type"}),r.jsx("th",{children:"Reference"}),r.jsx("th",{children:"From"}),r.jsx("th",{children:"Actions"})]})}),r.jsx("tbody",{children:Tg.map(p=>r.jsxs("tr",{children:[r.jsx("td",{children:p.requestType}),r.jsx("td",{children:p.reference}),r.jsx("td",{children:p.from}),r.jsxs("td",{children:[r.jsx("button",{className:"btn view",type:"button",children:"View"})," ",r.jsx("button",{className:"btn email",type:"button",onClick:()=>{f()},children:"Send Email"})," ",r.jsx("button",{className:"btn assign",type:"button",onClick:()=>{a(!0)},children:"Assign"})]})]},`${p.requestType}-${p.reference}`))})]})]})]}),r.jsx("div",{className:"modal",id:"assignModal",style:{display:t?"flex":"none"},onClick:p=>{p.target.id==="assignModal"&&a(!1)},children:r.jsxs("div",{className:"modal-content",children:[r.jsx("h3",{children:"Assign Salesperson"}),r.jsxs("select",{value:i,onChange:p=>{s(p.target.value)},children:[r.jsx("option",{children:"Select Salesperson"}),Dg.map(p=>r.jsx("option",{children:p},p))]}),r.jsx("button",{className:"btn approve",type:"button",onClick:x,children:"Assign"})]})}),r.jsx("div",{className:"popup",id:"popup",style:{display:l?"block":"none"},children:l})]})}const Ig=["Export as CSV","Export as PDF","Download Invoice"],Lg=["All","Invoice","Credit Note"],ed=["All","Created","Paid","Overdue"],Fg=["Customer","Qubicle Technologies LLC","FutureTech Solutions","Global Electronics"],Mg=["10 Items/page","20 Items/page","50 Items/page"],_g=typeof window<"u"&&window.location&&window.location.origin?window.location.origin:"https://ledgerworx.me";let hr="",Gt=null;class Og extends Error{constructor(n,t={}){super(n),this.name="AdminPortalApiError",this.status=t.status||0,this.payload=t.payload}}function Bg(e){if(/^https?:\/\//i.test(e))return e;const n=String(e||"").startsWith("/")?e:`/${String(e||"")}`;return`${_g}${n}`}async function Ug(e){const n=e.headers.get("content-type")||"",t=await e.text(),a=n.includes("application/json")?JSON.parse(String(t||"null")):t;if(!e.ok){const i=typeof a=="object"&&a&&a.message?a.message:"The admin portal request failed.";throw new Og(i,{status:e.status,payload:a})}return a}async function Et(e,n={}){const t={Accept:"application/json",...n.headers||{}};hr&&(t["X-WP-Nonce"]=hr);const a=await fetch(Bg(e),{credentials:"include",headers:t,...n});return Ug(a)}async function ai(){return hr||(Gt||(Gt=Et("/wp-admin/admin-ajax.php?action=lw_portal_bootstrap",{cache:"no-store"}).then(e=>{var n;return hr=String(((n=e==null?void 0:e.config)==null?void 0:n.restNonce)||"").trim(),hr}).finally(()=>{Gt=null})),Gt)}async function $g(){return await ai(),Et(`/wp-json/lw/v1/admin/users?_=${Date.now()}`,{cache:"no-store"})}async function Vg(){return await ai(),Et(`/wp-json/lw/v1/admin/payments?_=${Date.now()}`,{cache:"no-store"})}async function Wg(e){return await ai(),Et(`/wp-json/lw/v1/admin/requests/${encodeURIComponent(e)}/approve-payment`,{method:"POST",cache:"no-store"})}async function qg(e){return await ai(),Et(`/wp-json/lw/v1/admin/requests/${encodeURIComponent(e)}/advance-stage`,{method:"POST",cache:"no-store"})}const Hg=`html,\r
body {\r
  margin: 0;\r
  padding: 0;\r
}\r
\r
* {\r
  box-sizing: border-box;\r
}\r
\r
.payments-page-v2 {\r
  max-width: 1460px;\r
  margin: 0 auto;\r
  padding: 24px;\r
  color: #2f3c4e;\r
  --payp-btn-primary: var(--primary, #1f8f8b);\r
  --payp-btn-secondary: var(--secondary, #2fb7b0);\r
  --payp-btn-shadow: 0 8px 18px rgba(31, 143, 139, 0.24);\r
  --payp-btn-shadow-hover: 0 12px 24px rgba(31, 143, 139, 0.32);\r
}\r
\r
body,\r
.payments-page-v2,\r
.payments-page-v2 * {\r
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;\r
}\r
\r
.payments-page-v2 .fa-solid {\r
  font-family: "Font Awesome 6 Free" !important;\r
  font-weight: 900;\r
}\r
\r
.payments-page-v2 .fa-regular {\r
  font-family: "Font Awesome 6 Free" !important;\r
  font-weight: 400;\r
}\r
\r
.payments-page-v2 button,\r
.payments-page-v2 select,\r
.payments-page-v2 input {\r
  transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease, color 0.2s ease, transform 0.15s ease;\r
}\r
\r
.payments-page-v2 button:focus-visible,\r
.payments-page-v2 select:focus-visible,\r
.payments-page-v2 input:focus-visible {\r
  outline: 2px solid rgba(31, 143, 139, 0.35);\r
  outline-offset: 1px;\r
}\r
\r
.payments-page-v2 .payp-topbar {\r
  display: flex;\r
  justify-content: space-between;\r
  align-items: center;\r
  margin-bottom: 12px;\r
  gap: 12px;\r
}\r
\r
.payments-page-v2 .payp-topbar h2 {\r
  margin: 0;\r
  font-size: 30px;\r
  font-weight: 700;\r
  color: #303c4f;\r
}\r
\r
.payments-page-v2 .payp-top-actions {\r
  display: flex;\r
  gap: 8px;\r
  flex-wrap: wrap;\r
}\r
\r
.payments-page-v2 .payp-top-btn {\r
  border: 1px solid transparent;\r
  border-radius: 9px;\r
  background: linear-gradient(135deg, var(--payp-btn-primary), var(--payp-btn-secondary));\r
  color: #ffffff;\r
  font-size: 12px;\r
  font-weight: 700;\r
  padding: 8px 16px;\r
  min-height: 36px;\r
  box-shadow: var(--payp-btn-shadow);\r
  cursor: pointer;\r
}\r
\r
.payments-page-v2 .payp-top-btn:hover {\r
  box-shadow: var(--payp-btn-shadow-hover);\r
  transform: translateY(-1px);\r
  filter: brightness(1.03);\r
}\r
\r
.payments-page-v2 .payp-top-btn:active {\r
  transform: translateY(0);\r
}\r
\r
.payments-page-v2 .payp-kpi-grid {\r
  display: grid;\r
  grid-template-columns: repeat(4, 1fr);\r
  gap: 14px;\r
  margin-bottom: 14px;\r
  background: transparent;\r
}\r
\r
.payments-page-v2 .payp-kpi {\r
  padding: 16px 18px;\r
  border: 1px solid #dde4ef;\r
  border-top: 4px solid #2f80d7;\r
  border-radius: 16px;\r
  background: #eef1f5;\r
  box-shadow: 0 8px 20px rgba(19, 39, 67, 0.08);\r
}\r
\r
.payments-page-v2 .payp-kpi-head {\r
  display: flex;\r
  align-items: center;\r
  gap: 8px;\r
  color: #48627f;\r
  font-size: 14px;\r
  font-weight: 700;\r
  margin-bottom: 7px;\r
}\r
\r
.payments-page-v2 .payp-kpi-icon {\r
  width: 18px;\r
  height: 18px;\r
  border-radius: 4px;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  color: #fff;\r
  font-size: 10px;\r
}\r
\r
.payments-page-v2 .payp-kpi-revenue .payp-kpi-icon {\r
  background: #4f8eed;\r
}\r
\r
.payments-page-v2 .payp-kpi-pending .payp-kpi-icon {\r
  background: #f2b93f;\r
}\r
\r
.payments-page-v2 .payp-kpi-paid .payp-kpi-icon {\r
  background: #29b5a9;\r
}\r
\r
.payments-page-v2 .payp-kpi-overdue .payp-kpi-icon {\r
  background: #ef6a57;\r
}\r
\r
.payments-page-v2 .payp-kpi-value {\r
  font-size: 40px;\r
  font-weight: 800;\r
  line-height: 1.2;\r
  color: #1f4b78;\r
  margin-bottom: 5px;\r
}\r
\r
.payments-page-v2 .payp-kpi-meta {\r
  font-size: 13px;\r
  color: #6a7f97;\r
  font-weight: 600;\r
  display: flex;\r
  align-items: center;\r
  gap: 6px;\r
}\r
\r
.payments-page-v2 .payp-kpi-meta i {\r
  font-size: 8px;\r
  color: #6a7f97;\r
}\r
\r
.payments-page-v2 .payp-kpi:nth-child(2) {\r
  background: #edf4f3;\r
  border-top-color: #2fbe9a;\r
}\r
\r
.payments-page-v2 .payp-kpi:nth-child(3) {\r
  background: #f2f0ec;\r
  border-top-color: #f39c12;\r
}\r
\r
.payments-page-v2 .payp-kpi:nth-child(4) {\r
  background: #f0edf5;\r
  border-top-color: #6f42c1;\r
}\r
\r
.payments-page-v2 .payp-layout {\r
  display: grid;\r
  grid-template-columns: 2fr 1fr;\r
  gap: 10px;\r
  align-items: stretch;\r
}\r
\r
.payments-page-v2 .payp-left-panel,\r
.payments-page-v2 .payp-right-panel {\r
  border: 1px solid #d9e2ef;\r
  background: #f8fafd;\r
  border-radius: 8px;\r
  min-height: 560px;\r
}\r
\r
.payments-page-v2 .payp-left-panel {\r
  padding: 8px;\r
}\r
\r
.payments-page-v2 .payp-filter-wrap {\r
  border: 1px solid #dde5f1;\r
  background: #f2f5fb;\r
  border-radius: 8px;\r
  padding: 8px;\r
  margin-bottom: 8px;\r
}\r
\r
.payments-page-v2 .payp-filter-row {\r
  display: grid;\r
  grid-template-columns: repeat(3, minmax(0, 1fr)) 58px;\r
  gap: 8px;\r
  margin-bottom: 7px;\r
  align-items: center;\r
}\r
\r
.payments-page-v2 .payp-filter-row:last-child {\r
  margin-bottom: 0;\r
}\r
\r
.payments-page-v2 .payp-control {\r
  display: grid;\r
  grid-template-columns: 88px minmax(0, 1fr);\r
  align-items: center;\r
  gap: 8px;\r
}\r
\r
.payments-page-v2 .payp-control label {\r
  font-size: 12px;\r
  font-weight: 700;\r
  color: #5b6f8b;\r
  min-width: 0;\r
  white-space: nowrap;\r
  margin: 0;\r
}\r
\r
.payments-page-v2 .payp-control select,\r
.payments-page-v2 .payp-control input {\r
  width: 100%;\r
  height: 32px;\r
  border: 1px solid #ccd6e8;\r
  border-radius: 5px;\r
  background: #f8faff;\r
  color: #4c607c;\r
  font-size: 12px;\r
  padding: 0 10px;\r
}\r
\r
.payments-page-v2 .payp-control input::placeholder {\r
  color: #9aaac0;\r
}\r
\r
.payments-page-v2 .payp-mini-btn {\r
  border: 1px solid transparent;\r
  border-radius: 7px;\r
  background: linear-gradient(135deg, var(--payp-btn-primary), var(--payp-btn-secondary));\r
  color: #ffffff;\r
  font-size: 12px;\r
  font-weight: 700;\r
  padding: 0 10px;\r
  width: 58px;\r
  height: 32px;\r
  box-shadow: 0 6px 14px rgba(31, 143, 139, 0.22);\r
  cursor: pointer;\r
}\r
\r
.payments-page-v2 .payp-mini-btn:hover {\r
  box-shadow: 0 10px 18px rgba(31, 143, 139, 0.3);\r
  transform: translateY(-1px);\r
  filter: brightness(1.03);\r
}\r
\r
.payments-page-v2 .payp-table-wrap {\r
  border: 1px solid #dde5f1;\r
  border-radius: 8px;\r
  overflow: hidden;\r
  background: #fff;\r
}\r
\r
.payments-page-v2 .payp-table {\r
  width: 100%;\r
  border-collapse: collapse;\r
  table-layout: fixed;\r
}\r
\r
.payments-page-v2 .payp-col-customer {\r
  width: 30%;\r
}\r
\r
.payments-page-v2 .payp-col-type {\r
  width: 11%;\r
}\r
\r
.payments-page-v2 .payp-col-date {\r
  width: 14%;\r
}\r
\r
.payments-page-v2 .payp-col-status {\r
  width: 12%;\r
}\r
\r
.payments-page-v2 .payp-col-amount {\r
  width: 15%;\r
}\r
\r
.payments-page-v2 .payp-col-assigned {\r
  width: 14%;\r
}\r
\r
.payments-page-v2 .payp-col-action {\r
  width: 4%;\r
}\r
\r
.payments-page-v2 .payp-table th,\r
.payments-page-v2 .payp-table td {\r
  border-bottom: 1px solid #e8edf6;\r
  padding: 12px 12px;\r
  font-size: 13px;\r
  color: #344a66;\r
  text-align: left;\r
  white-space: nowrap;\r
  overflow: hidden;\r
  text-overflow: ellipsis;\r
}\r
\r
.payments-page-v2 .payp-table th {\r
  background: #f3f6fb;\r
  font-size: 12px;\r
  font-weight: 800;\r
  color: #4d6380;\r
}\r
\r
.payments-page-v2 .payp-row {\r
  cursor: pointer;\r
  transition: background 0.2s ease;\r
}\r
\r
.payments-page-v2 .payp-row:hover {\r
  background: #f7fafe;\r
}\r
\r
.payments-page-v2 .payp-row.active {\r
  background: #eef4ff;\r
}\r
\r
.payments-page-v2 .payp-status-tag {\r
  display: inline-flex;\r
  align-items: center;\r
  gap: 5px;\r
  font-weight: 700;\r
  font-size: 12px;\r
  padding: 4px 0;\r
}\r
\r
.payments-page-v2 .payp-status-tag.created {\r
  color: #546a86;\r
}\r
\r
.payments-page-v2 .payp-status-tag.paid {\r
  color: #17a680;\r
}\r
\r
.payments-page-v2 .payp-assigned {\r
  font-weight: 500;\r
}\r
\r
.payments-page-v2 .payp-action-cell {\r
  text-align: center !important;\r
  padding-left: 4px !important;\r
  padding-right: 4px !important;\r
}\r
\r
.payments-page-v2 .payp-dot-btn {\r
  width: 26px;\r
  height: 26px;\r
  border: 1px solid rgba(31, 143, 139, 0.28);\r
  border-radius: 50%;\r
  background: rgba(31, 143, 139, 0.1);\r
  color: var(--payp-btn-primary);\r
  cursor: pointer;\r
  padding: 0;\r
  font-size: 12px;\r
}\r
\r
.payments-page-v2 .payp-dot-btn:hover {\r
  border-color: var(--payp-btn-primary);\r
  background: linear-gradient(135deg, var(--payp-btn-primary), var(--payp-btn-secondary));\r
  color: #ffffff;\r
}\r
\r
.payments-page-v2 .payp-table-footer {\r
  display: flex;\r
  justify-content: space-between;\r
  align-items: center;\r
  gap: 10px;\r
  padding: 8px 10px;\r
  background: #f8fafd;\r
}\r
\r
.payments-page-v2 .payp-record-count {\r
  font-size: 12px;\r
  color: #5d7190;\r
  font-weight: 700;\r
}\r
\r
.payments-page-v2 .payp-footer-controls {\r
  display: flex;\r
  align-items: center;\r
  gap: 4px;\r
}\r
\r
.payments-page-v2 .payp-nav-btn {\r
  width: 24px;\r
  height: 20px;\r
  border: 1px solid rgba(31, 143, 139, 0.3);\r
  background: rgba(31, 143, 139, 0.08);\r
  border-radius: 5px;\r
  color: var(--payp-btn-primary);\r
  font-size: 9px;\r
  box-shadow: 0 1px 4px rgba(31, 143, 139, 0.14);\r
  cursor: pointer;\r
}\r
\r
.payments-page-v2 .payp-nav-btn:hover {\r
  border-color: var(--payp-btn-primary);\r
  background: linear-gradient(135deg, var(--payp-btn-primary), var(--payp-btn-secondary));\r
  color: #ffffff;\r
  transform: translateY(-1px);\r
}\r
\r
.payments-page-v2 .payp-page-pill {\r
  min-width: 26px;\r
  height: 20px;\r
  border: 1px solid #cfd8e7;\r
  border-radius: 3px;\r
  background: #fff;\r
  color: #516985;\r
  display: inline-flex;\r
  align-items: center;\r
  justify-content: center;\r
  font-size: 11px;\r
  font-weight: 700;\r
}\r
\r
.payments-page-v2 .payp-page-size {\r
  height: 22px;\r
  border: 1px solid rgba(31, 143, 139, 0.3);\r
  border-radius: 5px;\r
  background: #ffffff;\r
  color: var(--payp-btn-primary);\r
  font-size: 11px;\r
  padding: 0 8px;\r
}\r
\r
.payments-page-v2 .payp-right-panel {\r
  padding: 10px;\r
  display: flex;\r
  flex-direction: column;\r
}\r
\r
.payments-page-v2 .payp-info-head {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  padding-bottom: 8px;\r
  border-bottom: 1px solid #dbe4f0;\r
  margin-bottom: 10px;\r
}\r
\r
.payments-page-v2 .payp-info-head h3 {\r
  margin: 0;\r
  font-size: 17px;\r
  color: #2e4058;\r
}\r
\r
.payments-page-v2 .payp-primary-btn {\r
  border: 1px solid transparent;\r
  border-radius: 8px;\r
  background: linear-gradient(135deg, var(--payp-btn-primary), var(--payp-btn-secondary));\r
  color: #fff;\r
  font-size: 11px;\r
  font-weight: 800;\r
  padding: 7px 14px;\r
  box-shadow: var(--payp-btn-shadow);\r
  cursor: pointer;\r
}\r
\r
.payments-page-v2 .payp-primary-btn:hover {\r
  box-shadow: var(--payp-btn-shadow-hover);\r
  transform: translateY(-1px);\r
  filter: brightness(1.03);\r
}\r
\r
.payments-page-v2 .payp-customer-block {\r
  margin-bottom: 10px;\r
}\r
\r
.payments-page-v2 .payp-label {\r
  font-size: 12px;\r
  color: #8394ab;\r
  margin-bottom: 4px;\r
}\r
\r
.payments-page-v2 .payp-customer-name {\r
  font-size: 20px;\r
  color: #2f4058;\r
  font-weight: 700;\r
}\r
\r
.payments-page-v2 .payp-info-grid {\r
  display: grid;\r
  grid-template-columns: repeat(3, 1fr);\r
  gap: 0;\r
  border-top: 1px solid #dfe7f2;\r
  border-bottom: 1px solid #dfe7f2;\r
  margin-bottom: 12px;\r
}\r
\r
.payments-page-v2 .payp-info-grid > div {\r
  padding: 8px 6px;\r
  border-right: 1px solid #e3eaf5;\r
}\r
\r
.payments-page-v2 .payp-info-grid > div:nth-child(3n) {\r
  border-right: none;\r
}\r
\r
.payments-page-v2 .payp-value {\r
  font-size: 13px;\r
  font-weight: 700;\r
  color: #3a4f69;\r
}\r
\r
.payments-page-v2 .payp-items-panel {\r
  border: 1px solid #dce5f1;\r
  border-radius: 8px;\r
  overflow: hidden;\r
  margin-bottom: 10px;\r
}\r
\r
.payments-page-v2 .payp-items-title {\r
  background: #f0f4fa;\r
  color: #405773;\r
  font-size: 13px;\r
  font-weight: 800;\r
  padding: 8px 10px;\r
}\r
\r
.payments-page-v2 .payp-item-row {\r
  display: flex;\r
  align-items: center;\r
  justify-content: space-between;\r
  padding: 8px 10px;\r
  border-top: 1px solid #e4ebf6;\r
  font-size: 13px;\r
  color: #4b607a;\r
}\r
\r
.payments-page-v2 .payp-item-row.total {\r
  background: #f8fbff;\r
  font-size: 18px;\r
  font-weight: 800;\r
  color: #324760;\r
}\r
\r
.payments-page-v2 .payp-item-row.total strong {\r
  font-size: 18px;\r
}\r
\r
.payments-page-v2 .payp-record-btn {\r
  border: 1px solid transparent;\r
  border-radius: 8px;\r
  background: linear-gradient(135deg, var(--payp-btn-primary), var(--payp-btn-secondary));\r
  color: #fff;\r
  padding: 10px 14px;\r
  font-size: 15px;\r
  font-weight: 700;\r
  box-shadow: var(--payp-btn-shadow);\r
  cursor: pointer;\r
  margin-bottom: 10px;\r
}\r
\r
.payments-page-v2 .payp-record-btn:hover {\r
  transform: translateY(-1px);\r
  box-shadow: var(--payp-btn-shadow-hover);\r
  filter: brightness(1.03);\r
}\r
\r
.payments-page-v2 .payp-side-actions {\r
  display: grid;\r
  grid-template-columns: 1fr 1fr;\r
  gap: 8px;\r
  margin-bottom: 8px;\r
}\r
\r
.payments-page-v2 .payp-side-btn {\r
  border: 1px solid transparent;\r
  border-radius: 7px;\r
  background: linear-gradient(135deg, var(--payp-btn-primary), var(--payp-btn-secondary));\r
  color: #ffffff;\r
  font-size: 13px;\r
  font-weight: 700;\r
  padding: 8px 10px;\r
  min-height: 38px;\r
  box-shadow: var(--payp-btn-shadow);\r
  cursor: pointer;\r
}\r
\r
.payments-page-v2 .payp-side-btn i {\r
  margin-right: 6px;\r
}\r
\r
.payments-page-v2 .payp-side-btn:hover {\r
  box-shadow: var(--payp-btn-shadow-hover);\r
  transform: translateY(-1px);\r
  filter: brightness(1.03);\r
}\r
\r
.payments-page-v2 .payp-csv-select {\r
  border: 1px solid rgba(31, 143, 139, 0.3);\r
  border-radius: 6px;\r
  background: #fff;\r
  color: var(--payp-btn-primary);\r
  font-size: 13px;\r
  font-weight: 700;\r
  padding: 0 8px;\r
  height: 37px;\r
}\r
\r
@media (max-width: 1300px) {\r
  .payments-page-v2 .payp-kpi-value {\r
    font-size: 30px;\r
  }\r
}\r
\r
@media (max-width: 1100px) {\r
  .payments-page-v2 .payp-layout {\r
    grid-template-columns: 1fr;\r
  }\r
\r
  .payments-page-v2 .payp-right-panel {\r
    min-height: auto;\r
  }\r
}\r
\r
@media (max-width: 900px) {\r
  .payments-page-v2 .payp-kpi-grid {\r
    grid-template-columns: repeat(2, 1fr);\r
  }\r
\r
  .payments-page-v2 .payp-filter-row {\r
    grid-template-columns: 1fr;\r
  }\r
\r
  .payments-page-v2 .payp-control {\r
    grid-template-columns: 96px minmax(0, 1fr);\r
  }\r
\r
  .payments-page-v2 .payp-table {\r
    table-layout: auto;\r
  }\r
\r
  .payments-page-v2 .payp-table th,\r
  .payments-page-v2 .payp-table td {\r
    white-space: normal;\r
  }\r
}\r
\r
@media (max-width: 700px) {\r
  .payments-page-v2 {\r
    padding: 14px 4px 20px;\r
  }\r
\r
  .payments-page-v2 .payp-topbar {\r
    flex-direction: column;\r
    align-items: flex-start;\r
  }\r
\r
  .payments-page-v2 .payp-info-grid {\r
    grid-template-columns: 1fr 1fr;\r
  }\r
\r
  .payments-page-v2 .payp-info-grid > div:nth-child(3n) {\r
    border-right: 1px solid #e3eaf5;\r
  }\r
\r
  .payments-page-v2 .payp-info-grid > div:nth-child(2n) {\r
    border-right: none;\r
  }\r
\r
  .payments-page-v2 .payp-side-actions {\r
    grid-template-columns: 1fr;\r
  }\r
}\r
`;function Qg(){return r.jsxs("div",{className:"employee-portal-loader__glyph","aria-hidden":"true",children:[r.jsx("span",{className:"employee-portal-loader__glyph-mark",children:"LW"}),r.jsx("span",{className:"employee-portal-loader__glyph-ring employee-portal-loader__glyph-ring--outer"}),r.jsx("span",{className:"employee-portal-loader__glyph-ring employee-portal-loader__glyph-ring--inner"})]})}function Oa({title:e="Loading workspace",message:n="Preparing your portal workspace...",state:t="loading",actionLabel:a="",onAction:i=null,compact:s=!1,fullHeight:l=!1,className:c=""}){const d=["employee-portal-loader",s?"employee-portal-loader--compact":"",l?"employee-portal-loader--full-height":"",t==="error"?"employee-portal-loader--error":"",c].filter(Boolean).join(" ");return r.jsx("div",{className:d,role:t==="error"?"alert":"status","aria-live":"polite",children:r.jsxs("div",{className:"employee-portal-loader__panel",children:[r.jsx(Qg,{}),r.jsxs("div",{className:"employee-portal-loader__content",children:[r.jsx("div",{className:"employee-portal-loader__eyebrow",children:t==="error"?"Portal connection issue":"LedgerWorx employee portal"}),r.jsx("h2",{className:"employee-portal-loader__title",children:e}),r.jsx("p",{className:"employee-portal-loader__message",children:n}),t==="loading"?r.jsxs("div",{className:"employee-portal-loader__bars","aria-hidden":"true",children:[r.jsx("span",{}),r.jsx("span",{}),r.jsx("span",{})]}):null,a&&typeof i=="function"?r.jsx("button",{type:"button",className:"employee-portal-loader__action",onClick:i,children:a}):null]})]})})}function Yg(e){return e==="Completed"?r.jsxs("span",{className:"payp-status-tag paid payp-status-text",children:[r.jsx("i",{className:"fa-solid fa-circle-check"})," Completed"]}):e==="Processing"||e==="Confirmation"?r.jsx("span",{className:"payp-status-tag created payp-status-text",children:e}):r.jsx("span",{className:"payp-status-tag created payp-status-text",children:e})}function Kg(){Xe({pageKey:"payments-reports",pageCssText:Hg});const[e,n]=k.useState([]),[t,a]=k.useState(null),[i,s]=k.useState(!0),[l,c]=k.useState(""),[d,h]=k.useState(!1),f=e.find(u=>u.id===t)??e[0]??null,x=k.useMemo(()=>[{key:"revenue",cardClass:"payp-kpi-revenue",iconClass:"fa-solid fa-bolt",label:"Total Revenue",value:`AED ${e.reduce((u,m)=>u+Number(String(m.total||"").replace(/[^0-9.]/g,"")||0),0).toLocaleString("en-US",{minimumFractionDigits:2,maximumFractionDigits:2})}`,meta:"Invoice"},{key:"pending",cardClass:"payp-kpi-pending",iconClass:"fa-solid fa-hourglass-half",label:"Pending Payments",value:String(e.filter(u=>u.status!=="Completed").length),meta:"Requests"},{key:"paid",cardClass:"payp-kpi-paid",iconClass:"fa-solid fa-check",label:"Paid Invoices",value:String(e.filter(u=>u.status==="Completed").length),meta:"Processed"},{key:"overdue",cardClass:"payp-kpi-overdue",iconClass:"fa-solid fa-exclamation",label:"Overdue Payments",value:"0",meta:"Overdue"}],[e]);function p(){s(!0),c(""),Vg().then(u=>{var v;const m=Array.isArray(u==null?void 0:u.payments)?u.payments:[];n(m),a(((v=m[0])==null?void 0:v.id)??null)}).catch(u=>{c((u==null?void 0:u.message)||"Unable to load admin payments.")}).finally(()=>{s(!1)})}k.useEffect(()=>{p()},[]);function y(){t&&(h(!0),Wg(t).then(()=>p()).catch(u=>{window.alert((u==null?void 0:u.message)||"Unable to approve payment right now.")}).finally(()=>{h(!1)}))}function N(){t&&(h(!0),qg(t).then(()=>p()).catch(u=>{window.alert((u==null?void 0:u.message)||"Unable to move this request to the next stage right now.")}).finally(()=>{h(!1)}))}const S=(f==null?void 0:f.stage)||(f==null?void 0:f.status)||"",b=t?S==="Payment"?{label:d?"Approving...":"Approve Payment",disabled:d,onClick:y}:S==="Processing"?{label:d?"Updating...":"Move to Confirmation",disabled:d,onClick:N}:S==="Confirmation"?{label:d?"Updating...":"Mark Completed",disabled:d,onClick:N}:{label:"No Action Needed",disabled:!0,onClick:()=>{}}:{label:"Select a Request",disabled:!0,onClick:()=>{}};return r.jsxs(r.Fragment,{children:[r.jsx(tn,{adminName:"Admin"}),r.jsxs("div",{className:"page payments-page-v2",children:[r.jsxs("div",{className:"payp-topbar",children:[r.jsx("h2",{children:"Payments & Reports"}),r.jsx("div",{className:"payp-top-actions",children:Ig.map(u=>r.jsx("button",{type:"button",className:"payp-top-btn",children:u},u))})]}),l?r.jsx("div",{style:{color:"#dc2626",marginBottom:"16px"},children:l}):null,r.jsx("section",{className:"payp-kpi-grid",children:x.map(u=>r.jsxs("article",{className:`payp-kpi ${u.cardClass}`,children:[r.jsxs("div",{className:"payp-kpi-head",children:[r.jsx("span",{className:"payp-kpi-icon",children:r.jsx("i",{className:u.iconClass})}),r.jsx("span",{children:u.label})]}),r.jsx("div",{className:"payp-kpi-value",children:u.value}),r.jsxs("div",{className:"payp-kpi-meta",children:[r.jsx("i",{className:"fa-solid fa-circle"})," ",u.meta]})]},u.key))}),r.jsxs("div",{className:"payp-layout",children:[r.jsxs("section",{className:"payp-left-panel",children:[r.jsxs("div",{className:"payp-filter-wrap",children:[r.jsxs("div",{className:"payp-filter-row",children:[r.jsxs("div",{className:"payp-control",children:[r.jsx("label",{children:"Type"}),r.jsx("select",{defaultValue:"All",children:Lg.map(u=>r.jsx("option",{children:u},u))})]}),r.jsxs("div",{className:"payp-control",children:[r.jsx("label",{children:"Status"}),r.jsx("select",{defaultValue:"All",children:ed.map(u=>r.jsx("option",{children:u},u))})]}),r.jsxs("div",{className:"payp-control payp-control-wide",children:[r.jsx("label",{children:"Date Range"}),r.jsx("input",{type:"text",placeholder:"Date Range.."})]}),r.jsx("button",{type:"button",className:"payp-mini-btn",children:r.jsx("i",{className:"fa-solid fa-ellipsis"})})]}),r.jsxs("div",{className:"payp-filter-row",children:[r.jsxs("div",{className:"payp-control",children:[r.jsx("label",{children:"Status"}),r.jsx("select",{defaultValue:"All",children:ed.map(u=>r.jsx("option",{children:u},u))})]}),r.jsxs("div",{className:"payp-control",children:[r.jsx("label",{children:"Customer"}),r.jsx("input",{type:"text",placeholder:"Customer"})]}),r.jsxs("div",{className:"payp-control",children:[r.jsx("label",{children:"Customer"}),r.jsx("select",{defaultValue:"Customer",children:Fg.map(u=>r.jsx("option",{children:u},u))})]}),r.jsx("button",{type:"button",className:"payp-mini-btn",children:"Clear"})]})]}),r.jsxs("div",{className:"payp-table-wrap",children:[r.jsxs("table",{className:"payp-table",children:[r.jsxs("colgroup",{children:[r.jsx("col",{className:"payp-col-customer"}),r.jsx("col",{className:"payp-col-type"}),r.jsx("col",{className:"payp-col-date"}),r.jsx("col",{className:"payp-col-status"}),r.jsx("col",{className:"payp-col-amount"}),r.jsx("col",{className:"payp-col-assigned"}),r.jsx("col",{className:"payp-col-action"})]}),r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"Customer"}),r.jsx("th",{children:"Type"}),r.jsx("th",{children:"Date"}),r.jsx("th",{children:"Status"}),r.jsx("th",{children:"Amount (AED)"}),r.jsx("th",{children:"Assigned To"}),r.jsx("th",{})]})}),r.jsx("tbody",{children:i?r.jsx("tr",{children:r.jsx("td",{colSpan:"7",style:{textAlign:"center",padding:"24px"},children:r.jsx(Oa,{compact:!0,title:"Loading payment queue",message:"Refreshing real request payment stages for the admin workspace."})})}):e.map(u=>r.jsxs("tr",{className:`payp-row${u.id===t?" active":""}`,onClick:()=>{a(u.id)},children:[r.jsx("td",{children:u.customer}),r.jsx("td",{children:u.type}),r.jsx("td",{children:u.date}),r.jsx("td",{children:Yg(u.status)}),r.jsx("td",{children:u.total}),r.jsx("td",{className:"payp-assigned",children:u.assignedTo}),r.jsx("td",{className:"payp-action-cell",children:r.jsx("button",{type:"button",className:"payp-dot-btn",children:r.jsx("i",{className:"fa-solid fa-ellipsis"})})})]},u.id))})]}),r.jsxs("div",{className:"payp-table-footer",children:[r.jsx("div",{className:"payp-record-count",children:"1-5 of 50 records"}),r.jsxs("div",{className:"payp-footer-controls",children:[r.jsx("button",{type:"button",className:"payp-nav-btn",children:r.jsx("i",{className:"fa-solid fa-backward-step"})}),r.jsx("button",{type:"button",className:"payp-nav-btn",children:r.jsx("i",{className:"fa-solid fa-caret-left"})}),r.jsx("span",{className:"payp-page-pill",children:"10"}),r.jsx("button",{type:"button",className:"payp-nav-btn",children:r.jsx("i",{className:"fa-solid fa-caret-right"})}),r.jsx("button",{type:"button",className:"payp-nav-btn",children:r.jsx("i",{className:"fa-solid fa-forward-step"})}),r.jsx("select",{className:"payp-page-size",defaultValue:"10 Items/page",children:Mg.map(u=>r.jsx("option",{children:u},u))})]})]})]})]}),r.jsxs("aside",{className:"payp-right-panel",children:[r.jsxs("div",{className:"payp-info-head",children:[r.jsx("h3",{children:"Payment Information"}),r.jsx("button",{type:"button",id:"paypMarkAsPaidBtn",className:"payp-primary-btn",onClick:b.onClick,disabled:b.disabled,children:b.label})]}),r.jsxs("div",{className:"payp-customer-block",children:[r.jsx("div",{className:"payp-label",children:"Customer Name"}),r.jsx("div",{id:"paypCustomerName",className:"payp-customer-name",children:(f==null?void 0:f.customer)??"-"})]}),r.jsxs("div",{className:"payp-info-grid",children:[r.jsxs("div",{children:[r.jsx("div",{className:"payp-label",children:"Type"}),r.jsx("div",{id:"paypTypeValue",className:"payp-value",children:(f==null?void 0:f.type)??"-"})]}),r.jsxs("div",{children:[r.jsx("div",{className:"payp-label",children:"Invoice"}),r.jsx("div",{id:"paypInvoiceValue",className:"payp-value",children:(f==null?void 0:f.id)??"-"})]}),r.jsxs("div",{children:[r.jsx("div",{className:"payp-label",children:"Status"}),r.jsx("div",{id:"paypStatusValue",className:"payp-value",children:(f==null?void 0:f.status)??"-"})]}),r.jsxs("div",{children:[r.jsx("div",{className:"payp-label",children:"Invoice ID"}),r.jsx("div",{id:"paypInvoiceIdValue",className:"payp-value",children:(f==null?void 0:f.invoiceId)??"-"})]}),r.jsxs("div",{children:[r.jsx("div",{className:"payp-label",children:"Due Date"}),r.jsx("div",{id:"paypDueDateValue",className:"payp-value",children:(f==null?void 0:f.dueDate)??"-"})]}),r.jsxs("div",{children:[r.jsx("div",{className:"payp-label",children:"Date"}),r.jsx("div",{id:"paypDateValue",className:"payp-value",children:(f==null?void 0:f.entryDate)??"-"})]})]}),r.jsxs("div",{className:"payp-items-panel",children:[r.jsx("div",{className:"payp-items-title",children:"Items"}),r.jsxs("div",{className:"payp-item-row",children:[r.jsx("span",{id:"paypItemLabel",children:(f==null?void 0:f.itemLabel)??"-"}),r.jsx("strong",{id:"paypItemAmount",children:(f==null?void 0:f.itemAmount)??"-"})]}),r.jsxs("div",{className:"payp-item-row",children:[r.jsx("span",{children:"Discount"}),r.jsx("strong",{id:"paypDiscountAmount",children:(f==null?void 0:f.discount)??"-"})]}),r.jsxs("div",{className:"payp-item-row",children:[r.jsx("span",{children:"Tax(AED)"}),r.jsx("strong",{id:"paypTaxAmount",children:(f==null?void 0:f.tax)??"-"})]}),r.jsxs("div",{className:"payp-item-row",children:[r.jsx("span",{children:"Adjustment (AED)"}),r.jsx("strong",{id:"paypAdjustmentAmount",children:(f==null?void 0:f.adjustment)??"-"})]}),r.jsxs("div",{className:"payp-item-row total",children:[r.jsx("span",{children:"Grand Total"}),r.jsx("strong",{id:"paypGrandTotal",children:(f==null?void 0:f.total)??"-"})]})]}),r.jsx("button",{type:"button",className:"payp-record-btn",children:"Record Payment"}),r.jsxs("div",{className:"payp-side-actions",children:[r.jsxs("button",{type:"button",className:"payp-side-btn",children:[r.jsx("i",{className:"fa-regular fa-envelope"})," Send Invoice"]}),r.jsxs("button",{type:"button",className:"payp-side-btn",children:[r.jsx("i",{className:"fa-regular fa-file-lines"})," Download PDF"]})]}),r.jsxs("div",{className:"payp-side-actions",children:[r.jsxs("button",{type:"button",className:"payp-side-btn",children:[r.jsx("i",{className:"fa-solid fa-file-export"})," Export"]}),r.jsxs("select",{className:"payp-csv-select",defaultValue:"CSV",children:[r.jsx("option",{children:"CSV"}),r.jsx("option",{children:"PDF"})]})]})]})]})]})]})}const vn={fullName:"System Administrator",username:"Admin",email:"admin@ledgerworx.me",phone:"9988776655",employeeId:"LW-ADM-001",department:"Admin",designation:"Administrator",profilePhoto:""},Gg=`* {\r
  box-sizing: border-box;\r
}\r
\r
html,\r
body {\r
  margin: 0;\r
  padding: 0;\r
}\r
\r
body {\r
  font-family: "Segoe UI", sans-serif;\r
  background: radial-gradient(circle at 0% 0%, #ffffff 0%, #edf3fb 50%, #e6edf8 100%);\r
  color: var(--text-dark, #1f2937);\r
}\r
\r
.profile-page {\r
  max-width: 1140px;\r
  margin: 0 auto;\r
  padding: 24px;\r
}\r
\r
.breadcrumb {\r
  font-size: 13px;\r
  color: var(--text-light, #6b7280);\r
  margin-bottom: 12px;\r
}\r
\r
.profile-card {\r
  background: var(--card, #ffffff);\r
  border: 1px solid var(--border, #e5e7eb);\r
  border-radius: 16px;\r
  box-shadow: var(--shadow-sm, 0 2px 8px rgba(0, 0, 0, 0.05));\r
  padding: 22px;\r
}\r
\r
.profile-header {\r
  margin-bottom: 16px;\r
}\r
\r
.profile-header h2 {\r
  margin: 0;\r
  color: #1d4f77;\r
  font-size: 28px;\r
}\r
\r
.profile-header p {\r
  margin: 8px 0 0;\r
  color: var(--text-light, #6b7280);\r
  font-size: 14px;\r
}\r
\r
.alert {\r
  border-radius: 12px;\r
  padding: 12px 14px;\r
  margin-bottom: 16px;\r
  font-size: 14px;\r
  border: 1px solid transparent;\r
}\r
\r
.alert.success {\r
  background: #edfdf3;\r
  border-color: #b7efce;\r
  color: #10683c;\r
}\r
\r
.alert.error {\r
  background: #fff3f3;\r
  border-color: #f8c3c3;\r
  color: #9f2a2a;\r
}\r
\r
.alert.error strong {\r
  display: block;\r
  margin-bottom: 8px;\r
}\r
\r
.alert.error ul {\r
  margin: 0;\r
  padding-left: 18px;\r
}\r
\r
.profile-form {\r
  margin-top: 6px;\r
}\r
\r
.profile-layout {\r
  display: grid;\r
  grid-template-columns: 250px 1fr;\r
  gap: 22px;\r
}\r
\r
.photo-column {\r
  background: linear-gradient(160deg, #f7fbff, #eef6ff);\r
  border: 1px solid #d8e5f6;\r
  border-radius: 14px;\r
  padding: 16px;\r
  height: fit-content;\r
}\r
\r
.photo-preview {\r
  width: 140px;\r
  height: 140px;\r
  margin: 0 auto 12px;\r
  border-radius: 50%;\r
  border: 2px dashed #9fbfe5;\r
  display: flex;\r
  align-items: center;\r
  justify-content: center;\r
  background: #ffffff;\r
  color: #93a6bc;\r
  overflow: hidden;\r
  font-size: 42px;\r
}\r
\r
.photo-preview.has-photo {\r
  border-style: solid;\r
}\r
\r
.photo-preview img {\r
  width: 100%;\r
  height: 100%;\r
  object-fit: cover;\r
}\r
\r
.upload-btn {\r
  width: 100%;\r
  border: 1px solid #b6d5ef;\r
  border-radius: 10px;\r
  background: #ffffff;\r
  color: #27506f;\r
  font-size: 13px;\r
  font-weight: 600;\r
  padding: 10px 12px;\r
  text-align: center;\r
  cursor: pointer;\r
  display: inline-block;\r
}\r
\r
#profilePhoto {\r
  position: absolute;\r
  left: -9999px;\r
}\r
\r
.hint {\r
  display: block;\r
  color: #59718a;\r
  margin-top: 10px;\r
  font-size: 12px;\r
  line-height: 1.4;\r
}\r
\r
.fields-column {\r
  min-width: 0;\r
}\r
\r
.form-grid {\r
  display: grid;\r
  grid-template-columns: repeat(2, minmax(0, 1fr));\r
  gap: 14px 16px;\r
}\r
\r
.field {\r
  display: flex;\r
  flex-direction: column;\r
  gap: 6px;\r
}\r
\r
.field.field-full {\r
  grid-column: 1 / -1;\r
}\r
\r
.field label {\r
  font-size: 12px;\r
  font-weight: 700;\r
  color: #516a83;\r
  letter-spacing: 0.3px;\r
}\r
\r
.field input {\r
  width: 100%;\r
  border: 1px solid #d4dfec;\r
  border-radius: 10px;\r
  padding: 10px 12px;\r
  min-height: 42px;\r
  font-size: 14px;\r
  color: #1f3f60;\r
  background: #ffffff;\r
}\r
\r
.field input:focus {\r
  outline: none;\r
  border-color: #8fb6df;\r
  box-shadow: 0 0 0 3px rgba(47, 143, 131, 0.14);\r
}\r
\r
.field input[readonly] {\r
  background: #f5f8fc;\r
  color: #61738b;\r
}\r
\r
.password-block {\r
  margin-top: 18px;\r
  border: 1px solid #dce7f4;\r
  border-radius: 14px;\r
  padding: 14px;\r
  background: #f9fcff;\r
}\r
\r
.password-block h3 {\r
  margin: 0;\r
  font-size: 18px;\r
  color: #1d4f77;\r
}\r
\r
.password-block p {\r
  margin: 6px 0 12px;\r
  font-size: 13px;\r
  color: #5f748c;\r
}\r
\r
.form-actions {\r
  display: flex;\r
  justify-content: flex-end;\r
  gap: 10px;\r
  margin-top: 18px;\r
}\r
\r
.btn {\r
  min-width: 110px;\r
  border-radius: 999px;\r
  border: 1px solid transparent;\r
  padding: 10px 16px;\r
  cursor: pointer;\r
  font-size: 13px;\r
  font-weight: 700;\r
  transition: 0.2s ease;\r
}\r
\r
.btn.primary {\r
  color: #ffffff;\r
  background: linear-gradient(135deg, #2f8f83, #2fb7b0);\r
  border-color: #7ad6cf;\r
  box-shadow: 0 8px 16px rgba(31, 143, 139, 0.24);\r
}\r
\r
.btn.primary:hover {\r
  filter: brightness(1.04);\r
}\r
\r
.btn.secondary {\r
  color: #244766;\r
  background: #f6f9fc;\r
  border-color: #d5e2ef;\r
}\r
\r
.btn.secondary:hover {\r
  background: #edf4fb;\r
}\r
\r
body.dark-mode .photo-column,\r
body.dark .photo-column,\r
html.dark body .photo-column {\r
  background: rgba(15, 23, 42, 0.35);\r
  border-color: #3a4d64;\r
}\r
\r
body.dark-mode .field input,\r
body.dark .field input,\r
html.dark body .field input {\r
  background: #0f172a;\r
  border-color: #334155;\r
  color: #f1f5f9;\r
}\r
\r
body.dark-mode .field input[readonly],\r
body.dark .field input[readonly],\r
html.dark body .field input[readonly] {\r
  background: #1e293b;\r
  color: #cbd5e1;\r
}\r
\r
body.dark-mode .password-block,\r
body.dark .password-block,\r
html.dark body .password-block {\r
  background: rgba(30, 41, 59, 0.55);\r
  border-color: #3a4d64;\r
}\r
\r
@media (max-width: 900px) {\r
  .profile-page {\r
    padding: 16px;\r
  }\r
\r
  .profile-layout {\r
    grid-template-columns: 1fr;\r
  }\r
\r
  .photo-column {\r
    display: grid;\r
    grid-template-columns: 140px 1fr;\r
    align-items: center;\r
    gap: 14px;\r
  }\r
\r
  .photo-preview {\r
    margin: 0;\r
  }\r
\r
  .form-grid {\r
    grid-template-columns: 1fr;\r
  }\r
}\r
\r
@media (max-width: 540px) {\r
  .profile-header h2 {\r
    font-size: 24px;\r
  }\r
\r
  .photo-column {\r
    grid-template-columns: 1fr;\r
  }\r
\r
  .photo-preview {\r
    margin: 0 auto 10px;\r
  }\r
\r
  .form-actions {\r
    flex-direction: column-reverse;\r
  }\r
\r
  .btn {\r
    width: 100%;\r
  }\r
}\r
`;function Xt(e){return{fullName:e.fullName,username:e.username,email:e.email,phone:e.phone,employeeId:e.employeeId,department:e.department,designation:e.designation,currentPassword:"",newPassword:"",confirmPassword:""}}function Ii(e){return{fullName:(e==null?void 0:e.name)||vn.fullName,username:(e==null?void 0:e.username)||vn.username,email:(e==null?void 0:e.email)||vn.email,phone:(e==null?void 0:e.phone)||vn.phone,employeeId:(e==null?void 0:e.employeeId)||vn.employeeId,department:(e==null?void 0:e.department)||vn.department,designation:(e==null?void 0:e.designation)||(e==null?void 0:e.role)||vn.designation,profilePhoto:(e==null?void 0:e.avatarUrl)||vn.profilePhoto}}function Xg(e){const n=[];if(e.fullName.trim()===""&&n.push("Full Name is required."),e.username.trim()===""&&n.push("Username is required."),e.email.trim()===""?n.push("Official Email is required."):/^[^@\s]+@ledgerworx\.me$/i.test(e.email.trim())||n.push("Official Email must end with @ledgerworx.me."),e.phone.trim()==="")n.push("Phone Number is required.");else{const l=e.phone.replace(/\D+/g,"");(l.length<10||l.length>15)&&n.push("Phone Number must contain 10 to 15 digits.")}e.designation.trim()===""&&n.push("Designation is required.");const t=e.currentPassword.trim(),a=e.newPassword.trim(),i=e.confirmPassword.trim();return(t!==""||a!==""||i!=="")&&(t===""||a===""||i===""?n.push("To change password, fill Current, New, and Confirm password fields."):a.length<8?n.push("New Password must be at least 8 characters."):a!==i&&n.push("New Password and Confirm Password do not match.")),n}function Zg(){var v,P;Xe({pageKey:"profile",pageCssText:Gg});const e=ti(),n=Ii((v=e.data)==null?void 0:v.profile),[t,a]=k.useState(n),[i,s]=k.useState(Xt(n)),[l,c]=k.useState(n.profilePhoto),[d,h]=k.useState([]),[f,x]=k.useState(""),[p,y]=k.useState(!1),N=k.useRef(null);k.useEffect(()=>{var j;const E=Ii((j=e.data)==null?void 0:j.profile);a(E),s(Xt(E)),c(E.profilePhoto)},[(P=e.data)==null?void 0:P.profile]);function S(E,j){s(T=>({...T,[E]:j})),x("")}function b(E){const j=E.target.files&&E.target.files[0]?E.target.files[0]:null;if(x(""),!j){c(t.profilePhoto);return}const T=new FileReader;T.onload=()=>{c(typeof T.result=="string"?T.result:"")},T.readAsDataURL(j)}function u(E){E.preventDefault();const j=Xg(i);if(j.length>0){h(j),x("");return}y(!0),fetch("/wp-admin/admin-ajax.php?action=lw_save_portal_profile",{method:"POST",credentials:"include",headers:{"Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",Accept:"application/json"},body:new URLSearchParams({name:i.fullName.trim(),email:i.email.trim(),phone:i.phone.trim(),department:t.department,designation:i.designation.trim()})}).then(async T=>({ok:T.ok,payload:await T.json()})).then(({ok:T,payload:z})=>{if(!T||!(z!=null&&z.profile)){h([(z==null?void 0:z.message)||"Unable to update profile."]),x("");return}e.data&&(e.data.profile=z.profile);const g={...Ii(z.profile)};a(g),s(Xt(g)),c(g.profilePhoto),h([]),x("Profile updated successfully."),N.current&&(N.current.value="")}).catch(()=>{h(["Unable to update profile."]),x("")}).finally(()=>{y(!1)})}function m(){s(Xt(t)),c(t.profilePhoto),h([]),x(""),N.current&&(N.current.value="")}return r.jsxs(r.Fragment,{children:[r.jsx(tn,{adminName:t.username||"Admin"}),r.jsxs("div",{className:"profile-page",children:[r.jsx("div",{className:"breadcrumb",children:"Dashboard > Profile"}),r.jsxs("section",{className:"profile-card","aria-labelledby":"profileTitle",children:[r.jsxs("div",{className:"profile-header",children:[r.jsx("h2",{id:"profileTitle",children:"Edit Profile"}),r.jsx("p",{children:"Update your admin details and account credentials."})]}),f!==""?r.jsx("div",{className:"alert success",role:"status",children:f}):null,d.length>0?r.jsxs("div",{className:"alert error",role:"alert",children:[r.jsx("strong",{children:"Please fix the following:"}),r.jsx("ul",{children:d.map(E=>r.jsx("li",{children:E},E))})]}):null,r.jsx("form",{id:"adminProfileForm",className:"profile-form",method:"post",encType:"multipart/form-data",onSubmit:u,children:r.jsxs("div",{className:"profile-layout",children:[r.jsxs("aside",{className:"photo-column",children:[r.jsx("div",{className:`photo-preview${l!==""?" has-photo":""}`,id:"profilePhotoPreview",children:l!==""?r.jsx("img",{src:l,alt:"Profile Photo",id:"profilePhotoImage"}):r.jsx("i",{className:"fa-solid fa-user","aria-hidden":"true"})}),r.jsx("label",{htmlFor:"profilePhoto",className:"upload-btn",children:"Choose Profile Photo"}),r.jsx("input",{ref:N,type:"file",id:"profilePhoto",name:"profile_photo",accept:".jpg,.jpeg,.png,.webp,.gif,image/*",onChange:b}),r.jsx("small",{className:"hint",children:"Optional. JPG, PNG, WEBP, or GIF (max 2MB)."})]}),r.jsxs("div",{className:"fields-column",children:[r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{htmlFor:"fullName",children:"Full Name"}),r.jsx("input",{type:"text",id:"fullName",name:"full_name",value:i.fullName,onChange:E=>{S("fullName",E.target.value)},required:!0})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{htmlFor:"username",children:"Username"}),r.jsx("input",{type:"text",id:"username",name:"username",value:i.username,readOnly:!0})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{htmlFor:"officialEmail",children:"Official Email (ledgerworx.me)"}),r.jsx("input",{type:"email",id:"officialEmail",name:"email",value:i.email,onChange:E=>{S("email",E.target.value)},pattern:"^[^@\\s]+@ledgerworx\\.me$",title:"Email must end with @ledgerworx.me",required:!0})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{htmlFor:"phoneNumber",children:"Phone Number"}),r.jsx("input",{type:"tel",id:"phoneNumber",name:"phone",value:i.phone,onChange:E=>{S("phone",E.target.value)},required:!0})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{htmlFor:"employeeId",children:"Employee ID"}),r.jsx("input",{type:"text",id:"employeeId",name:"employee_id",value:i.employeeId,readOnly:!0})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{htmlFor:"department",children:"Department"}),r.jsx("input",{type:"text",id:"department",name:"department",value:i.department,readOnly:!0})]}),r.jsxs("div",{className:"field field-full",children:[r.jsx("label",{htmlFor:"designation",children:"Designation"}),r.jsx("input",{type:"text",id:"designation",name:"designation",value:i.designation,onChange:E=>{S("designation",E.target.value)},required:!0})]})]}),r.jsxs("div",{className:"password-block",children:[r.jsx("h3",{children:"Change Password"}),r.jsx("p",{children:"Fill all three fields only when you want to update the password."}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{htmlFor:"currentPassword",children:"Current Password"}),r.jsx("input",{type:"password",id:"currentPassword",name:"current_password",autoComplete:"current-password",value:i.currentPassword,onChange:E=>{S("currentPassword",E.target.value)}})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{htmlFor:"newPassword",children:"New Password"}),r.jsx("input",{type:"password",id:"newPassword",name:"new_password",minLength:"8",autoComplete:"new-password",value:i.newPassword,onChange:E=>{S("newPassword",E.target.value)}})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{htmlFor:"confirmPassword",children:"Confirm New Password"}),r.jsx("input",{type:"password",id:"confirmPassword",name:"confirm_password",minLength:"8",autoComplete:"new-password",value:i.confirmPassword,onChange:E=>{S("confirmPassword",E.target.value)}})]})]})]}),r.jsxs("div",{className:"form-actions",children:[r.jsx("button",{type:"submit",className:"btn primary",disabled:p,children:p?"Saving...":"Save"}),r.jsx("button",{type:"button",className:"btn secondary",id:"cancelProfileBtn",onClick:m,children:"Cancel"})]})]})]})})]})]})]})}const Jg=[{key:"total-sales",className:"total-sales",icon:"📊",label:"Total Sales",value:"AED 1,250,000"},{key:"outstanding",className:"outstanding",icon:"⏳",label:"Outstanding",value:"AED 450,000"},{key:"total",className:"total",icon:"✓",label:"Total",value:"75"},{key:"targets",className:"targets",icon:"🎯",label:"Targets",value:"50+"}],nd=[{no:"INV-1024",company:"Bright Tech",package:"Standard",amount:"AED 20,000",dueDate:"10-May",status:"Paid"},{no:"INV-1025",company:"Neha Patel",package:"Premium",amount:"AED 30,000",dueDate:"15-May",status:"Pending"},{no:"INV-1026",company:"Amit Verma",package:"Basic",amount:"AED 10,000",dueDate:"05-May",status:"Overdue"},{no:"INV-1027",company:"Simran Kohli",package:"Client",amount:"AED 50,000",dueDate:"05-May",status:"Pending"},{no:"INV-1028",company:"Desert Holdings",package:"Premium",amount:"AED 25,000",dueDate:"12-May",status:"Paid"},{no:"INV-1029",company:"Gulf Star LLC",package:"Standard",amount:"AED 15,000",dueDate:"08-May",status:"Paid"},{no:"INV-1030",company:"Tech Solutions",package:"Basic",amount:"AED 12,000",dueDate:"20-May",status:"Pending"},{no:"INV-1031",company:"Global Enterprises",package:"Client",amount:"AED 45,000",dueDate:"18-May",status:"Overdue"},{no:"INV-1032",company:"Metro Corp",package:"Premium",amount:"AED 35,000",dueDate:"16-May",status:"Pending"},{no:"INV-1033",company:"XYZ Solutions",package:"Standard",amount:"AED 22,000",dueDate:"14-May",status:"Paid"},{no:"INV-1034",company:"TechFlow Inc",package:"Basic",amount:"AED 11,000",dueDate:"09-May",status:"Pending"},{no:"INV-1035",company:"Digital Minds",package:"Client",amount:"AED 48,000",dueDate:"22-May",status:"Pending"},{no:"INV-1036",company:"Innovation Labs",package:"Premium",amount:"AED 32,000",dueDate:"11-May",status:"Paid"},{no:"INV-1037",company:"Smart Industries",package:"Standard",amount:"AED 18,000",dueDate:"19-May",status:"Overdue"},{no:"INV-1038",company:"Future Systems",package:"Basic",amount:"AED 13,000",dueDate:"07-May",status:"Paid"},{no:"INV-1039",company:"Quantum Tech",package:"Client",amount:"AED 52,000",dueDate:"25-May",status:"Pending"},{no:"INV-1040",company:"Nexus Corp",package:"Premium",amount:"AED 28,000",dueDate:"13-May",status:"Paid"},{no:"INV-1041",company:"Cloud Dynamics",package:"Standard",amount:"AED 21,000",dueDate:"17-May",status:"Pending"},{no:"INV-1042",company:"Vertex Solutions",package:"Basic",amount:"AED 14,000",dueDate:"06-May",status:"Overdue"},{no:"INV-1043",company:"Alpha Enterprises",package:"Client",amount:"AED 55,000",dueDate:"24-May",status:"Pending"},{no:"INV-1044",company:"Beta Industries",package:"Premium",amount:"AED 31,000",dueDate:"21-May",status:"Paid"}],ex=[{name:"Rahul Sharma",email:"rahul@sales.com",target:"20",sold:"9",achieved:"21",action:"View",employeeId:"N/A",phone:"N/A",department:"Sales",region:"N/A",username:"N/A",status:"Active"},{name:"Neha Patel",email:"neha@sales.com",target:"15",sold:"7",achieved:"15",action:"Remind",employeeId:"N/A",phone:"N/A",department:"Sales",region:"N/A",username:"N/A",status:"Active"},{name:"Amit Verma",email:"amit@sales.com",target:"10",sold:"5",achieved:"12",action:"View",employeeId:"N/A",phone:"N/A",department:"Sales",region:"N/A",username:"N/A",status:"Active"},{name:"Simran Kohli",email:"simran@sales.com",target:"5",sold:"3",achieved:"60",action:"View",employeeId:"N/A",phone:"N/A",department:"Sales",region:"N/A",username:"N/A",status:"Active"}],nx=[{title:"Weekly Report",period:"This Week",revenue:"AED 85,000",deals:"12 Closed Deals",target:"68% of weekly target"},{title:"Monthly Report",period:"March 2026",revenue:"AED 365,000",deals:"49 Closed Deals",target:"74% of monthly target"},{title:"Overall Report",period:"Year to Date",revenue:"AED 1,250,000",deals:"156 Closed Deals",target:"81% annual target progress"}],rx=["Active","Inactive"],tx=`*{box-sizing:border-box}\r
body{font-family:"Segoe UI",sans-serif;background:#eef1f7;color:#2c3e50;margin:0}\r
.page{padding:25px}\r
.breadcrumb{display:flex;align-items:center;gap:10px;margin-bottom:15px;color:#666;font-size:14px}\r
.breadcrumb a{color:#4169e1;text-decoration:none;cursor:pointer}\r
.breadcrumb a:hover{text-decoration:underline}\r
.page-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:30px;padding:0}\r
.page-header h2{margin:0;font-size:28px;color:#2c3e50}\r
.btn-primary{background:#4169e1;color:white;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-size:14px;display:flex;align-items:center;gap:5px}\r
.btn-primary:hover{background:#3154c5}\r
.stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:20px;margin-bottom:35px}\r
.stat-card{background:white;border-radius:12px;padding:24px;box-shadow:0 2px 8px rgba(0,0,0,.1);display:flex;flex-direction:column;justify-content:flex-start;cursor:pointer;transition:.3s}\r
.stat-card:hover{transform:translateY(-6px);box-shadow:0 12px 24px rgba(0,0,0,.15)}\r
.stat-card.total-sales,\r
.stat-card.outstanding,\r
.stat-card.total,\r
.stat-card.targets{\r
  background:linear-gradient(135deg,#2f8f83 0%,#6b7280 100%) !important;\r
  color:#fff;\r
}\r
.stat-card.total-sales:hover, .stat-card.outstanding:hover, .stat-card.total:hover, .stat-card.targets:hover{transform:translateY(-6px);box-shadow:0 12px 24px rgba(0,0,0,.25)}\r
.stat-label{font-size:13px;opacity:.9;margin-bottom:12px;text-transform:uppercase;letter-spacing:.5px}\r
.stat-value{font-size:28px;font-weight:bold;line-height:1.2}\r
.stat-icon{font-size:24px;margin-bottom:12px}\r
@media(max-width:1200px){.stats-grid{grid-template-columns:repeat(2,1fr)}}\r
@media(max-width:768px){.stats-grid{grid-template-columns:1fr}}\r
.card{background:white;border-radius:12px;padding:25px;box-shadow:0 2px 8px rgba(0,0,0,.1);margin-bottom:25px}\r
.card-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:25px;border-bottom:1px solid #eee;padding-bottom:20px;gap:15px}\r
.card-title{font-size:18px;font-weight:600;color:#2c3e50;white-space:nowrap}\r
.filter-group{display:flex;gap:15px;align-items:center;flex-wrap:wrap}\r
.filter-select{padding:10px 14px;border:1px solid #ddd;border-radius:6px;font-size:14px;background:white;cursor:pointer;white-space:nowrap}\r
.table{width:100%;border-collapse:collapse}\r
.table thead{background:#f8f9fa;border-bottom:2px solid #dee2e6}\r
.table th{padding:14px 12px;text-align:left;font-size:13px;font-weight:600;color:#495057;text-transform:uppercase}\r
.table td{padding:14px 12px;border-bottom:1px solid #dee2e6;font-size:14px}\r
.table tbody tr:hover{background:#f5f7fa}\r
.status-badge{display:inline-block;padding:6px 12px;border-radius:4px;font-size:12px;font-weight:500}\r
.status-paid{background:#d4edda;color:#155724}\r
.status-pending{background:#fff3cd;color:#856404}\r
.status-overdue{background:#f8d7da;color:#721c24}\r
.action-btn{padding:8px 14px;border:1px solid #4169e1;background:white;color:#4169e1;border-radius:4px;cursor:pointer;font-size:12px;font-weight:600;white-space:nowrap}\r
.action-btn:hover{background:#4169e1;color:white}\r
.salesperson-row{display:flex;align-items:center;gap:12px}\r
.salesperson-photo{width:40px;height:40px;border-radius:50%;background:#ccc;flex-shrink:0}\r
.salesperson-info{display:flex;flex-direction:column}\r
.salesperson-name{font-weight:600;font-size:14px}\r
.salesperson-email{font-size:12px;color:#999}\r
.progress-bar{width:120px;height:6px;background:#e9ecef;border-radius:3px;margin:0;position:relative;overflow:hidden}\r
.progress-fill{height:100%;background:#4169e1;border-radius:3px}\r
.layout-row{display:grid;grid-template-columns:1fr 1fr;gap:25px;align-items:start}\r
@media(max-width:1024px){.layout-row{grid-template-columns:1fr}}\r
.payroll-summary{display:grid;grid-template-columns:1fr;gap:15px;margin-bottom:20px}\r
.payroll-item{padding:16px;background:#f8f9fa;border-radius:8px;display:flex;justify-content:space-between;align-items:center}\r
.payroll-label{font-size:14px;color:#666;font-weight:500}\r
.payroll-value{font-size:22px;font-weight:bold;color:#2c3e50}\r
.btn-generate{background:#4169e1;color:white;border:none;padding:12px 24px;border-radius:6px;cursor:pointer;font-size:14px;font-weight:600;width:100%;margin-top:15px}\r
.btn-generate:hover{background:#3154c5}\r
\r
:root{\r
  --accent:#2f8f83;\r
  --accent-2:#4169e1;\r
  --ink:#243447;\r
  --muted:#6b7f94;\r
  --panel:#ffffff;\r
  --line:#e5edf6;\r
}\r
body{\r
  background:\r
    radial-gradient(circle at 0% 0%, #ffffff 0%, #eef3fb 45%, #e8edf7 100%);\r
  color:var(--ink);\r
}\r
.page{\r
  max-width:1440px;\r
  margin:0 auto;\r
  padding:26px;\r
}\r
.breadcrumb{\r
  color:var(--muted);\r
  margin-bottom:18px;\r
}\r
.page-header{\r
  margin-bottom:26px;\r
}\r
.page-header h2{\r
  font-size:30px;\r
  letter-spacing:.2px;\r
}\r
.btn-primary{\r
  border-radius:999px;\r
  padding:10px 18px;\r
  box-shadow:0 8px 18px rgba(65,105,225,.22);\r
}\r
.stats-grid{\r
  margin-bottom:28px;\r
  gap:18px;\r
}\r
.stat-card{\r
  border-radius:16px;\r
  box-shadow:0 10px 24px rgba(23,40,71,.15);\r
  overflow:hidden;\r
  position:relative;\r
}\r
.stat-card:before{\r
  content:"";\r
  position:absolute;\r
  inset:0;\r
  background:linear-gradient(160deg,rgba(255,255,255,.20),rgba(255,255,255,0));\r
  pointer-events:none;\r
}\r
.card{\r
  border:1px solid var(--line);\r
  border-radius:16px;\r
  box-shadow:0 10px 24px rgba(23,40,71,.08);\r
  padding:22px;\r
}\r
.card-header{\r
  margin-bottom:18px;\r
  padding-bottom:14px;\r
  border-bottom:1px solid var(--line);\r
}\r
.card-title{\r
  font-size:19px;\r
  color:#1e3b5f;\r
}\r
.filter-group{\r
  gap:10px;\r
}\r
.filter-select{\r
  border:1px solid #d7e2ef;\r
  border-radius:10px;\r
  padding:10px 14px;\r
  min-width:150px;\r
  color:#244564;\r
  box-shadow:0 2px 6px rgba(23,40,71,.04) inset;\r
}\r
.filter-select:focus{\r
  outline:none;\r
  border-color:#97bde8;\r
  box-shadow:0 0 0 3px rgba(65,105,225,.12);\r
}\r
.table{\r
  border-collapse:separate;\r
  border-spacing:0;\r
  border:1px solid var(--line);\r
  border-radius:12px;\r
  overflow:hidden;\r
}\r
.table thead{\r
  background:#f5f9ff;\r
  border-bottom:1px solid var(--line);\r
}\r
.table th{\r
  color:#5f748c;\r
  font-size:12px;\r
  letter-spacing:.45px;\r
}\r
.table td{\r
  border-bottom:1px solid #edf3fa;\r
}\r
.table tbody tr:hover{\r
  background:#f7fbff;\r
}\r
.salesperson-entry{\r
  cursor:pointer;\r
}\r
.table tbody tr:last-child td{\r
  border-bottom:none;\r
}\r
.status-badge{\r
  border-radius:999px;\r
  padding:7px 12px;\r
  font-weight:700;\r
  font-size:11px;\r
  border:1px solid transparent;\r
}\r
.status-paid{background:#dcf7e6;color:#0f6c41;border-color:#bdeacc}\r
.status-pending{background:#fff4d8;color:#8b6100;border-color:#ffe1a4}\r
.status-overdue{background:#ffe4e4;color:#9f2a2a;border-color:#ffc4c4}\r
.action-btn{\r
  border-radius:999px;\r
  border-color:#aac4ff;\r
  padding:8px 14px;\r
}\r
.action-btn:hover{\r
  box-shadow:0 8px 16px rgba(65,105,225,.18);\r
}\r
#paginationControls{\r
  flex-wrap:wrap;\r
}\r
#entryInfo{\r
  color:#6f8298 !important;\r
}\r
.payroll-item{\r
  border:1px solid #e2eaf4;\r
  background:linear-gradient(180deg,#ffffff,#f8fbff);\r
}\r
.payroll-label{\r
  color:#60758d;\r
}\r
.payroll-value{\r
  color:#1f3e62;\r
}\r
.btn-generate{\r
  border-radius:12px;\r
  box-shadow:0 10px 20px rgba(65,105,225,.24);\r
}\r
.sales-report-list{\r
  display:grid;\r
  grid-template-columns:1fr;\r
  gap:12px;\r
}\r
.sales-report-item{\r
  border:1px solid #e2eaf4;\r
  border-radius:12px;\r
  padding:14px;\r
  background:linear-gradient(180deg,#ffffff,#f8fbff);\r
}\r
.sales-report-top{\r
  display:flex;\r
  align-items:center;\r
  justify-content:space-between;\r
  gap:10px;\r
  margin-bottom:8px;\r
}\r
.sales-report-top h4{\r
  margin:0;\r
  font-size:15px;\r
  color:#1e3b5f;\r
}\r
.sales-report-top span{\r
  font-size:12px;\r
  color:#6f8298;\r
}\r
.sales-report-revenue{\r
  font-size:22px;\r
  font-weight:700;\r
  color:#1f3e62;\r
  margin-bottom:4px;\r
}\r
.sales-report-meta{\r
  font-size:13px;\r
  color:#5f748c;\r
  margin-bottom:4px;\r
}\r
.sales-report-progress{\r
  font-size:12px;\r
  color:#2f8f83;\r
  font-weight:600;\r
}\r
@media(max-width:768px){\r
  .page{padding:16px}\r
  .page-header h2{font-size:24px}\r
}\r
\r
.modal-overlay{\r
  position:fixed;\r
  inset:0;\r
  background:rgba(20,33,51,.55);\r
  display:none;\r
  align-items:center;\r
  justify-content:center;\r
  z-index:1200;\r
  padding:18px;\r
}\r
.modal-overlay.open{\r
  display:flex;\r
}\r
.modal-card{\r
  width:min(560px,100%);\r
  background:#fff;\r
  border:1px solid var(--line);\r
  border-radius:16px;\r
  box-shadow:0 20px 48px rgba(10,25,41,.25);\r
  padding:20px;\r
}\r
.modal-header{\r
  display:flex;\r
  align-items:center;\r
  justify-content:space-between;\r
  margin-bottom:14px;\r
}\r
.modal-header h3{\r
  margin:0;\r
  color:#1e3b5f;\r
  font-size:20px;\r
}\r
.modal-close{\r
  border:none;\r
  background:transparent;\r
  color:#60758d;\r
  font-size:18px;\r
  cursor:pointer;\r
  line-height:1;\r
}\r
.salesperson-form{\r
  display:flex;\r
  flex-direction:column;\r
  gap:12px;\r
}\r
.form-grid{\r
  display:grid;\r
  grid-template-columns:1fr 1fr;\r
  gap:12px;\r
}\r
.form-row{\r
  display:flex;\r
  flex-direction:column;\r
  gap:7px;\r
}\r
.form-row label{\r
  font-size:13px;\r
  color:#4d647d;\r
  font-weight:600;\r
}\r
.form-row input{\r
  border:1px solid #d7e2ef;\r
  border-radius:10px;\r
  padding:10px 12px;\r
  font-size:14px;\r
  color:#244564;\r
}\r
.form-row input:focus{\r
  outline:none;\r
  border-color:#97bde8;\r
  box-shadow:0 0 0 3px rgba(65,105,225,.12);\r
}\r
.modal-actions{\r
  display:flex;\r
  justify-content:flex-end;\r
  gap:10px;\r
  margin-top:6px;\r
}\r
.profile-grid{\r
  display:grid;\r
  grid-template-columns:1fr 1fr;\r
  gap:10px 14px;\r
  margin-top:4px;\r
}\r
.profile-item{\r
  display:flex;\r
  flex-direction:column;\r
  gap:4px;\r
  padding:10px 12px;\r
  border:1px solid #e2eaf4;\r
  border-radius:10px;\r
  background:#f9fcff;\r
}\r
.profile-item span{\r
  font-size:12px;\r
  color:#6b7f94;\r
  text-transform:uppercase;\r
  letter-spacing:.4px;\r
}\r
.profile-item strong{\r
  font-size:14px;\r
  color:#1f3e62;\r
  word-break:break-word;\r
}\r
body.modal-open{\r
  overflow:hidden;\r
}\r
@media(max-width:640px){\r
  .form-grid{\r
    grid-template-columns:1fr;\r
  }\r
  .profile-grid{\r
    grid-template-columns:1fr;\r
  }\r
}\r
\r
.stats-grid .stat-card.total-sales,\r
.stats-grid .stat-card.outstanding,\r
.stats-grid .stat-card.total,\r
.stats-grid .stat-card.targets{\r
  background:linear-gradient(135deg,#2f8f83 0%,#6b7280 100%) !important;\r
  color:#fff !important;\r
}\r
`,Zt=10,rd={fullName:"",employeeId:"",phone:"",email:"",department:"Sales",salesTarget:"",assignedRegion:"",status:"Active",username:"",password:""};function ax(e){return`status-${String(e).toLowerCase()}`}function ix(){return ex.map((e,n)=>({id:`salesperson-${n+1}`,...e}))}function sx(){Xe({pageKey:"sales",pageCssText:tx});const e=`${"/portal/admin/".replace(/\/+$/,"")}`,[n,t]=k.useState("All Statuses"),[a,i]=k.useState("All Companies"),[s,l]=k.useState(1),[c,d]=k.useState(ix),[h,f]=k.useState(!1),[x,p]=k.useState(null),[y,N]=k.useState(rd),S=k.useRef(null);k.useEffect(()=>{var A;h&&((A=S.current)==null||A.focus())},[h]),k.useEffect(()=>{const A=h||x!==null;return document.body.classList.toggle("modal-open",A),()=>{document.body.classList.remove("modal-open")}},[h,x]),k.useEffect(()=>{function A(Q){Q.key==="Escape"&&(h&&T(),x&&z())}return document.addEventListener("keydown",A),()=>{document.removeEventListener("keydown",A)}},[h,x]);const b=["Paid","Pending","Overdue"],u=[...new Set(nd.map(A=>A.company))].sort((A,Q)=>A.localeCompare(Q)),m=nd.filter(A=>{const Q=n==="All Statuses"||A.status===n,Ue=a==="All Companies"||A.company===a;return Q&&Ue}),v=Math.max(1,Math.ceil(m.length/Zt)),P=Math.max(1,Math.min(s,v)),E=(P-1)*Zt,j=m.slice(E,E+Zt);function T(){f(!1),N(rd)}function z(){p(null)}function g(A,Q){A==="status"?t(Q):i(Q),l(1)}function w(A,Q){N(Ue=>({...Ue,[A]:Q}))}function I(){l(A=>Math.max(1,A-1))}function R(){l(A=>Math.min(v,A+1))}function V(A){l(A)}function U(A){A.preventDefault();const Q=y.fullName.trim(),Ue=y.employeeId.trim(),F=y.phone.trim(),_=y.email.trim(),O=y.department.trim()||"Sales",H=Number(y.salesTarget||0),C=y.assignedRegion.trim(),ae=y.username.trim(),$e=y.status.trim()||"Active",gn=0;if(!Q||!_)return;const Ve=H>0?Math.round(gn/H*100):0;d(an=>[...an,{id:`salesperson-${an.length+1}`,name:Q,email:_,target:String(H),sold:String(gn),achieved:String(Ve),action:"View",employeeId:Ue||"N/A",phone:F||"N/A",department:O,region:C||"N/A",username:ae||"N/A",status:$e}]),T()}return r.jsxs(r.Fragment,{children:[r.jsx(tn,{adminName:"Admin"}),r.jsxs("div",{className:"page",children:[r.jsxs("div",{className:"breadcrumb",children:[r.jsx("a",{href:`${e}/dashboard`,children:"Dashboard"}),r.jsx("span",{children:"›"}),r.jsx("span",{children:"Sales Department"})]}),r.jsxs("div",{className:"page-header",children:[r.jsx("h2",{children:"Sales Department"}),r.jsx("button",{className:"btn-primary",id:"openAddSalespersonBtn",type:"button",onClick:()=>{f(!0)},children:"+ Add User"})]}),r.jsx("div",{className:"stats-grid",children:Jg.map(A=>r.jsxs("div",{className:`stat-card ${A.className}`,children:[r.jsx("div",{className:"stat-icon",children:A.icon}),r.jsx("div",{className:"stat-label",children:A.label}),r.jsx("div",{className:"stat-value",children:A.value})]},A.key))}),r.jsxs("div",{className:"layout-row",children:[r.jsxs("div",{children:[r.jsxs("div",{className:"card",children:[r.jsxs("div",{className:"card-header",children:[r.jsx("div",{className:"card-title",children:"Company Packages"}),r.jsxs("div",{className:"filter-group",children:[r.jsxs("select",{className:"filter-select",id:"statusFilter",value:n,onChange:A=>{g("status",A.target.value)},children:[r.jsx("option",{value:"All Statuses",children:"All Statuses"}),b.map(A=>r.jsx("option",{value:A,children:A},A))]}),r.jsxs("select",{className:"filter-select",id:"companyFilter",value:a,onChange:A=>{g("company",A.target.value)},children:[r.jsx("option",{value:"All Companies",children:"All Companies"}),u.map(A=>r.jsx("option",{value:A,children:A},A))]})]})]}),r.jsxs("table",{className:"table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"Invoice No"}),r.jsx("th",{children:"Company"}),r.jsx("th",{children:"Package"}),r.jsx("th",{children:"Amount (AED)"}),r.jsx("th",{children:"Due Date"}),r.jsx("th",{children:"Status"})]})}),r.jsx("tbody",{id:"invoiceTableBody",children:j.length===0?r.jsx("tr",{children:r.jsx("td",{colSpan:"6",style:{textAlign:"center",color:"#7f8c8d"},children:"No invoices found for selected filters."})}):j.map(A=>r.jsxs("tr",{children:[r.jsx("td",{children:A.no}),r.jsx("td",{children:A.company}),r.jsx("td",{children:A.package}),r.jsx("td",{children:A.amount}),r.jsx("td",{children:A.dueDate}),r.jsx("td",{children:r.jsx("span",{className:`status-badge ${ax(A.status)}`,children:A.status})})]},A.no))})]}),r.jsx("div",{style:{marginTop:"20px",textAlign:"center",color:"#666",fontSize:"13px"},children:r.jsxs("span",{id:"entryInfo",children:["Showing ",m.length>0?E+1:0," to"," ",Math.min(E+Zt,m.length)," of"," ",m.length," entries"]})}),r.jsxs("div",{style:{marginTop:"15px",textAlign:"center",display:"flex",justifyContent:"center",gap:"5px"},id:"paginationControls","data-total-pages":v,children:[r.jsx("button",{className:"action-btn",id:"prevBtn",type:"button",onClick:I,children:"Previous"}),Array.from({length:v},(A,Q)=>Q+1).map(A=>r.jsx("button",{className:`action-btn page-btn${A===P?" active":""}`,style:A===P?{background:"#4169e1",color:"white"}:{},type:"button",onClick:()=>{V(A)},children:A},A)),r.jsx("button",{className:"action-btn",id:"nextBtn",type:"button",onClick:R,children:"Next"})]})]}),r.jsxs("div",{className:"card",children:[r.jsx("div",{className:"card-header",children:r.jsx("div",{className:"card-title",children:"Salesperson Details"})}),r.jsxs("table",{className:"table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"Photo"}),r.jsx("th",{children:"Name"}),r.jsx("th",{children:"Email"}),r.jsx("th",{children:"Weekly Target"}),r.jsx("th",{children:"Packages Sold"}),r.jsx("th",{children:"Achieved"}),r.jsx("th",{})]})}),r.jsx("tbody",{id:"salespersonTableBody",children:c.map(A=>r.jsxs("tr",{className:"salesperson-entry",onClick:()=>{p(A)},children:[r.jsx("td",{children:r.jsx("div",{className:"salesperson-photo"})}),r.jsx("td",{children:r.jsx("span",{className:"salesperson-name",children:A.name})}),r.jsx("td",{children:r.jsx("span",{className:"salesperson-email",children:A.email})}),r.jsx("td",{children:A.target}),r.jsx("td",{children:A.sold}),r.jsxs("td",{children:[r.jsx("div",{className:"progress-bar",children:r.jsx("div",{className:"progress-fill",style:{width:`${Math.max(0,Math.min(Number(A.achieved),100))}%`}})})," ",A.achieved,Number(A.achieved)===0?"%":""]}),r.jsx("td",{children:r.jsx("button",{className:"action-btn",type:"button",children:A.action})})]},A.id))})]})]})]}),r.jsx("div",{children:r.jsxs("div",{className:"card",children:[r.jsx("div",{className:"card-header",children:r.jsx("div",{className:"card-title",children:"Sales Reports"})}),r.jsx("div",{className:"sales-report-list",children:nx.map(A=>r.jsxs("div",{className:"sales-report-item",children:[r.jsxs("div",{className:"sales-report-top",children:[r.jsx("h4",{children:A.title}),r.jsx("span",{children:A.period})]}),r.jsx("div",{className:"sales-report-revenue",children:A.revenue}),r.jsx("div",{className:"sales-report-meta",children:A.deals}),r.jsx("div",{className:"sales-report-progress",children:A.target})]},A.title))})]})})]})]}),r.jsx("div",{className:`modal-overlay${h?" open":""}`,id:"addSalespersonModal","aria-hidden":!h,onClick:A=>{A.target===A.currentTarget&&T()},children:r.jsxs("div",{className:"modal-card",role:"dialog","aria-modal":"true","aria-labelledby":"addSalespersonTitle",children:[r.jsxs("div",{className:"modal-header",children:[r.jsx("h3",{id:"addSalespersonTitle",children:"Create Salesperson"}),r.jsx("button",{type:"button",className:"modal-close",id:"closeAddSalespersonModal","aria-label":"Close",onClick:T,children:"x"})]}),r.jsxs("form",{id:"addSalespersonForm",className:"salesperson-form",onSubmit:U,children:[r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"salespersonFullName",children:"Full Name"}),r.jsx("input",{ref:S,id:"salespersonFullName",name:"full_name",type:"text",required:!0,value:y.fullName,onChange:A=>{w("fullName",A.target.value)}})]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"salespersonEmployeeId",children:"Employee ID"}),r.jsx("input",{id:"salespersonEmployeeId",name:"employee_id",type:"text",required:!0,value:y.employeeId,onChange:A=>{w("employeeId",A.target.value)}})]}),r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"salespersonPhone",children:"Phone Number"}),r.jsx("input",{id:"salespersonPhone",name:"phone",type:"tel",required:!0,value:y.phone,onChange:A=>{w("phone",A.target.value)}})]})]}),r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"salespersonEmail",children:"Email"}),r.jsx("input",{id:"salespersonEmail",name:"email",type:"email",required:!0,value:y.email,onChange:A=>{w("email",A.target.value)}})]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"salespersonDepartment",children:"Department"}),r.jsx("input",{id:"salespersonDepartment",name:"department",type:"text",value:y.department,readOnly:!0})]}),r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"salespersonSalesTarget",children:"Sales Target"}),r.jsx("input",{id:"salespersonSalesTarget",name:"sales_target",type:"number",min:"0",required:!0,value:y.salesTarget,onChange:A=>{w("salesTarget",A.target.value)}})]})]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"salespersonRegion",children:"Assigned Region"}),r.jsx("input",{id:"salespersonRegion",name:"assigned_region",type:"text",required:!0,value:y.assignedRegion,onChange:A=>{w("assignedRegion",A.target.value)}})]}),r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"salespersonStatus",children:"Status"}),r.jsx("select",{id:"salespersonStatus",name:"status",className:"filter-select",required:!0,value:y.status,onChange:A=>{w("status",A.target.value)},children:rx.map(A=>r.jsx("option",{value:A,children:A},A))})]})]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"salespersonUsername",children:"Username"}),r.jsx("input",{id:"salespersonUsername",name:"username",type:"text",required:!0,value:y.username,onChange:A=>{w("username",A.target.value)}})]}),r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"salespersonPassword",children:"Password"}),r.jsx("input",{id:"salespersonPassword",name:"password",type:"password",required:!0,value:y.password,onChange:A=>{w("password",A.target.value)}})]})]}),r.jsxs("div",{className:"modal-actions",children:[r.jsx("button",{type:"button",className:"action-btn",id:"cancelAddSalespersonBtn",onClick:T,children:"Cancel"}),r.jsx("button",{type:"submit",className:"btn-primary",children:"Create Salesperson"})]})]})]})}),r.jsx("div",{className:`modal-overlay${x?" open":""}`,id:"salespersonProfileModal","aria-hidden":!x,onClick:A=>{A.target===A.currentTarget&&z()},children:r.jsxs("div",{className:"modal-card",role:"dialog","aria-modal":"true","aria-labelledby":"salespersonProfileTitle",children:[r.jsxs("div",{className:"modal-header",children:[r.jsx("h3",{id:"salespersonProfileTitle",children:"Salesperson Profile"}),r.jsx("button",{type:"button",className:"modal-close",id:"closeSalespersonProfileModal","aria-label":"Close",onClick:z,children:"x"})]}),r.jsxs("div",{className:"profile-grid",children:[r.jsxs("div",{className:"profile-item",children:[r.jsx("span",{children:"Full Name"}),r.jsx("strong",{id:"profileFullName",children:(x==null?void 0:x.name)??"-"})]}),r.jsxs("div",{className:"profile-item",children:[r.jsx("span",{children:"Employee ID"}),r.jsx("strong",{id:"profileEmployeeId",children:(x==null?void 0:x.employeeId)??"-"})]}),r.jsxs("div",{className:"profile-item",children:[r.jsx("span",{children:"Phone Number"}),r.jsx("strong",{id:"profilePhone",children:(x==null?void 0:x.phone)??"-"})]}),r.jsxs("div",{className:"profile-item",children:[r.jsx("span",{children:"Email"}),r.jsx("strong",{id:"profileEmail",children:(x==null?void 0:x.email)??"-"})]}),r.jsxs("div",{className:"profile-item",children:[r.jsx("span",{children:"Department"}),r.jsx("strong",{id:"profileDepartment",children:(x==null?void 0:x.department)??"Sales"})]}),r.jsxs("div",{className:"profile-item",children:[r.jsx("span",{children:"Sales Target"}),r.jsx("strong",{id:"profileSalesTarget",children:(x==null?void 0:x.target)??"-"})]}),r.jsxs("div",{className:"profile-item",children:[r.jsx("span",{children:"Packages Sold"}),r.jsx("strong",{id:"profileSold",children:(x==null?void 0:x.sold)??"-"})]}),r.jsxs("div",{className:"profile-item",children:[r.jsx("span",{children:"Achieved"}),r.jsx("strong",{id:"profileAchieved",children:x?`${x.achieved}%`:"-"})]}),r.jsxs("div",{className:"profile-item",children:[r.jsx("span",{children:"Assigned Region"}),r.jsx("strong",{id:"profileRegion",children:(x==null?void 0:x.region)??"-"})]}),r.jsxs("div",{className:"profile-item",children:[r.jsx("span",{children:"Username"}),r.jsx("strong",{id:"profileUsername",children:(x==null?void 0:x.username)??"-"})]}),r.jsxs("div",{className:"profile-item",children:[r.jsx("span",{children:"Status"}),r.jsx("strong",{id:"profileStatus",children:(x==null?void 0:x.status)??"-"})]})]}),r.jsx("div",{className:"modal-actions",children:r.jsx("button",{type:"button",className:"action-btn",id:"closeProfileBtn",onClick:z,children:"Close"})})]})})]})}const lx=[{id:"service-1",count:3,title:"Business Setup",meta:"3 Packages Created"},{id:"service-2",count:2,title:"Accounting & Bookkeeping",meta:"2 Packages Created"},{id:"service-3",count:1,title:"VAT Registration",meta:"1 Package Created"},{id:"service-4",count:1,title:"PRO Services",meta:"1 Package Created"}],ox=[{id:"package-1",name:"Basic Package",service:"Business Setup",price:"AED 10,000",status:"Enabled",isPopular:!1},{id:"package-2",name:"Standard Package",service:"Business Setup",price:"AED 20,000",status:"Enabled",isPopular:!0},{id:"package-3",name:"Premium Package",service:"Business Setup",price:"AED 30,000",status:"Enabled",isPopular:!1},{id:"package-4",name:"Accounting Starter",service:"Accounting & Bookkeeping",price:"AED 5,000",status:"Enabled",isPopular:!1}],td={name:"Appliance Repair",description:"Repairing household appliances, including washing machines, refrigerators, and microwaves",category:"Repair",members:"",availableDays:"Every business day",availableTime:"Same as business hours",currency:"AED - UAE Dirham",requiredDocument:"",duration:"2",priority:"Medium",location:"On-site",visibleTo:"All Clients"},dx=["Repair","Maintenance","Consulting","Support"],cx=["Every business day","All week days","Weekends only","Custom schedule"],ux=["Same as business hours","24 x 7","Morning shift","Evening shift"],px=["INR - Indian Rupee","AED - UAE Dirham","USD - US Dollar"],mx=["1","2","4","8"],fx=["Low","Medium","High"],hx=["On-site","Remote","Hybrid"],gx=["All Clients","Premium Clients","Internal Team Only"],ad=["All","Active","Popular","Recently Added"],ma=["Business Setup","Accounting & Bookkeeping","VAT Registration","PRO Services"],fa=["Enabled","Disabled","Draft"],xx=`:root{\r
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
\r
*{margin:0;padding:0;box-sizing:border-box;font-family:"Segoe UI",sans-serif;}\r
body{\r
  background:radial-gradient(circle at 0% 0%, #ffffff 0%, #edf3fb 50%, #e6edf8 100%);\r
  color:var(--text);\r
}\r
\r
/* NAVBAR */\r
.navbar{\r
  height:70px;\r
  background:linear-gradient(90deg,var(--dark),var(--primary));\r
  display:flex;\r
  justify-content:space-between;\r
  align-items:center;\r
  padding:0 25px;\r
  color:#fff;\r
}\r
  .nav-left{display:flex;align-items:center;gap:30px;}\r
  .logo img{height:32px}\r
  .nav-logo{ height:34px; display:block; }\r
\r
.nav-links{display:flex;gap:18px;}\r
.nav-links a{\r
  color:#ecf0f1;\r
  text-decoration:none;\r
  font-size:14px;\r
  padding:8px 12px;\r
  border-radius:6px;\r
  transition:.3s;\r
}\r
.nav-links a:hover{background:rgba(255,255,255,.18);}\r
.nav-links a.active{background:rgba(255,255,255,.28);}\r
\r
.nav-right{display:flex;align-items:center;gap:15px;}\r
.search{\r
  width:260px;\r
  padding:7px 14px;\r
  border-radius:20px;\r
  border:none;\r
}\r
.profile{font-weight:600}\r
\r
/* PAGE */\r
.page{padding:24px;max-width:1450px;margin:0 auto;}\r
.breadcrumb{\r
  font-size:14px;\r
  color:var(--muted);\r
  margin-bottom:12px;\r
}\r
.page-header{\r
  display:flex;\r
  justify-content:space-between;\r
  align-items:center;\r
  margin-bottom:16px;\r
}\r
.page-header h2{font-size:30px;color:#1c4268;}\r
.page-header h3{font-size:24px;color:#1d4268;}\r
\r
.btn{\r
  padding:9px 14px;\r
  border:1px solid transparent;\r
  border-radius:999px;\r
  cursor:pointer;\r
  font-size:13px;\r
  font-weight:700;\r
  transition:.25s;\r
}\r
.btn.primary{\r
  background:linear-gradient(135deg,var(--primary),var(--secondary));\r
  border-color:#7fd8d2;\r
  color:#fff;\r
  box-shadow:0 10px 18px rgba(31,143,139,.24);\r
}\r
.btn.primary:hover{\r
  filter:brightness(1.05);\r
  box-shadow:0 12px 20px rgba(31,143,139,.3);\r
}\r
.btn.gray{\r
  background:#e0e0e0;\r
}\r
.btn.gray:hover{\r
  background:#d5d5d5;\r
}\r
\r
/* SERVICES */\r
.services-page .services{\r
  display:grid;\r
  grid-template-columns:repeat(4,minmax(0,1fr));\r
  gap:14px;\r
  margin-bottom:20px;\r
}\r
.services-page .services .service{\r
  display:flex;\r
  flex-direction:column;\r
  justify-content:space-between;\r
  gap:10px;\r
  min-height:152px;\r
  padding:18px;\r
  border-radius:16px !important;\r
  border:1px solid #d5e1ef !important;\r
  border-top:4px solid #2b83d7 !important;\r
  background:linear-gradient(160deg,#ffffff 0%,#f4f9ff 100%) !important;\r
  box-shadow:0 10px 22px rgba(14,37,66,.10) !important;\r
  transition:transform .2s ease, box-shadow .2s ease !important;\r
}\r
.services-page .services .service:hover{\r
  transform:translateY(-3px);\r
  box-shadow:0 14px 28px rgba(14,37,66,.16) !important;\r
}\r
.services-page .services .service .num{\r
  color:#224c74 !important;\r
  font-size:30px;\r
  line-height:1;\r
  font-weight:800;\r
  letter-spacing:.2px;\r
  margin:0;\r
}\r
.services-page .services .service .tile-title{\r
  font-size:13px;\r
  font-weight:800 !important;\r
  color:#5f738a !important;\r
  margin:0;\r
}\r
.services-page .services .service .tile-amount{\r
  font-size:19px;\r
  color:#1f456c !important;\r
  margin:0;\r
  font-weight:800;\r
}\r
.services-page .services .service .tile-meta{\r
  font-size:12px;\r
  margin:0;\r
  color:#6f8195 !important;\r
  font-weight:600;\r
}\r
.services-page .services .service:nth-child(2){\r
  border-top-color:#2fbe9a;\r
  background:linear-gradient(160deg,#ffffff 0%,#f3fff9 100%) !important;\r
}\r
.services-page .services .service:nth-child(3){\r
  border-top-color:#f39c12;\r
  background:linear-gradient(160deg,#ffffff 0%,#fffaf2 100%) !important;\r
}\r
.services-page .services .service:nth-child(4){\r
  border-top-color:#6f42c1;\r
  background:linear-gradient(160deg,#ffffff 0%,#f8f3ff 100%) !important;\r
}\r
\r
/* PACKAGES */\r
.card{\r
  background:linear-gradient(180deg,#ffffff,#fbfdff);\r
  border:1px solid var(--line);\r
  border-radius:16px;\r
  box-shadow:0 10px 22px rgba(18,38,63,.08);\r
  padding:16px;\r
}\r
.filters{\r
  display:flex;\r
  gap:10px;\r
  margin-bottom:12px;\r
  flex-wrap:wrap;\r
}\r
.filters input,\r
.filters select{\r
  padding:9px 11px;\r
  border-radius:10px;\r
  border:1px solid #d2e0ef;\r
  font-size:13px;\r
  color:#274764;\r
}\r
.filters input:focus,\r
.filters select:focus{\r
  outline:none;\r
  border-color:#96bde9;\r
  box-shadow:0 0 0 3px rgba(65,105,225,.12);\r
}\r
table{\r
  width:100%;\r
  border-collapse:separate;\r
  border-spacing:0;\r
  border:1px solid var(--line);\r
  border-radius:12px;\r
  overflow:hidden;\r
}\r
th,td{\r
  padding:12px;\r
  font-size:14px;\r
  border-bottom:1px solid #edf2f8;\r
}\r
th{\r
  background:#f6faff;\r
  text-align:left;\r
  color:#60758d;\r
  font-size:12px;\r
  text-transform:uppercase;\r
  letter-spacing:.45px;\r
}\r
tr:hover{\r
  background:#f8fbff;\r
}\r
tbody tr:last-child td{border-bottom:none;}\r
\r
.tag{\r
  padding:6px 10px;\r
  border-radius:999px;\r
  font-size:12px;\r
  font-weight:700;\r
  color:#fff;\r
}\r
.popular{background:#f39c12;}\r
\r
.status{\r
  padding:6px 12px;\r
  border-radius:999px;\r
  font-size:12px;\r
  font-weight:700;\r
  border:1px solid transparent;\r
}\r
.status-enabled{color:#0f6c41;background:#dcf7e6;border-color:#bdeacc}\r
.status-disabled{color:#9f2a2a;background:#ffe4e4;border-color:#ffc4c4}\r
.status-draft{color:#8b6100;background:#fff4d8;border-color:#ffe1a4}\r
\r
.action{\r
  padding:7px 12px;\r
  border-radius:999px;\r
  border:1px solid transparent;\r
  cursor:pointer;\r
  font-size:12px;\r
  font-weight:700;\r
}\r
.edit{background:linear-gradient(135deg,var(--primary),var(--secondary));border-color:#7fd8d2;color:#fff;}\r
.disable{background:linear-gradient(135deg,#9aa8b5,#7f8f9f);border-color:#c6cfd7;color:#fff;}\r
.disable:hover{background:linear-gradient(135deg,#f06e6e,#db4e4e);border-color:#f6b6b6;color:#fff;}\r
.action:hover{filter:brightness(1.05);}\r
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
  width:min(640px,100%);\r
  max-height:90vh;\r
  overflow:auto;\r
  background:#fff;\r
  border:1px solid var(--line);\r
  border-radius:16px;\r
  box-shadow:0 24px 52px rgba(10,22,37,.24);\r
  padding:18px;\r
}\r
.modal-header{\r
  display:flex;\r
  align-items:center;\r
  justify-content:space-between;\r
  margin-bottom:12px;\r
}\r
.modal-header h3{\r
  margin:0;\r
  color:#1c4268;\r
  font-size:22px;\r
}\r
.modal-close{\r
  border:none;\r
  background:transparent;\r
  font-size:18px;\r
  color:#60758d;\r
  cursor:pointer;\r
  line-height:1;\r
}\r
.package-form{\r
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
  font-size:13px;\r
  color:#5f748c;\r
  font-weight:600;\r
}\r
.form-row input,.form-row select{\r
  padding:10px 12px;\r
  border:1px solid #d2e0ef;\r
  border-radius:10px;\r
  font-size:14px;\r
  color:#274764;\r
  background:#fff;\r
}\r
.form-row input:focus,.form-row select:focus{\r
  outline:none;\r
  border-color:#96bde9;\r
  box-shadow:0 0 0 3px rgba(65,105,225,.12);\r
}\r
.modal-actions{\r
  display:flex;\r
  justify-content:flex-end;\r
  gap:10px;\r
  margin-top:6px;\r
}\r
\r
/* Add service modal */\r
.add-service-modal{\r
  width:min(1120px,100%);\r
  max-height:92vh;\r
  overflow:auto;\r
  padding:0;\r
}\r
.add-service-header{\r
  display:flex;\r
  align-items:center;\r
  justify-content:space-between;\r
  padding:14px 18px;\r
  border-bottom:1px solid #e4ebf4;\r
  background:#fff;\r
}\r
.add-service-header h3{\r
  margin:0;\r
  font-size:31px;\r
  color:#2e3f55;\r
  display:flex;\r
  align-items:center;\r
  gap:10px;\r
}\r
.add-service-header h3 i{\r
  color:#5f748c;\r
  font-size:19px;\r
}\r
.add-service-form{\r
  display:flex;\r
  flex-direction:column;\r
}\r
.add-service-grid{\r
  display:grid;\r
  grid-template-columns:1.4fr 1fr;\r
  gap:14px;\r
  padding:14px;\r
  background:#f7f9fc;\r
}\r
.add-service-col{\r
  display:flex;\r
  flex-direction:column;\r
  gap:12px;\r
}\r
.service-form-section{\r
  background:#fff;\r
  border:1px solid #e2eaf4;\r
  border-radius:10px;\r
  padding:12px;\r
}\r
.service-form-section h4{\r
  margin:0 0 10px;\r
  color:#3a4d63;\r
  font-size:22px;\r
  display:flex;\r
  align-items:center;\r
  gap:8px;\r
}\r
.service-form-section h4 i{\r
  color:#6b7f94;\r
  font-size:16px;\r
}\r
.service-field{\r
  display:grid;\r
  grid-template-columns:130px 1fr;\r
  align-items:center;\r
  gap:10px;\r
  margin-bottom:10px;\r
}\r
.service-field.stacked{\r
  grid-template-columns:1fr;\r
  gap:6px;\r
}\r
.service-field:last-child{\r
  margin-bottom:0;\r
}\r
.service-field label{\r
  color:#4e6177;\r
  font-size:14px;\r
  font-weight:600;\r
}\r
.service-field input,\r
.service-field select,\r
.service-field textarea{\r
  width:100%;\r
  padding:10px 12px;\r
  border:1px solid #d7e2ef;\r
  border-radius:7px;\r
  font-size:14px;\r
  color:#33485f;\r
  background:#fff;\r
}\r
.service-field textarea{\r
  resize:vertical;\r
  min-height:72px;\r
}\r
.service-field input:focus,\r
.service-field select:focus,\r
.service-field textarea:focus{\r
  outline:none;\r
  border-color:#96bde9;\r
  box-shadow:0 0 0 3px rgba(65,105,225,.12);\r
}\r
.btn-link{\r
  border:none;\r
  background:transparent;\r
  color:#2f6fda;\r
  font-weight:700;\r
  padding:0;\r
  margin:2px 0 8px;\r
  cursor:pointer;\r
}\r
.btn-link:hover{\r
  text-decoration:underline;\r
}\r
.doc-list{\r
  list-style:none;\r
  margin:0;\r
  padding:0;\r
  display:flex;\r
  flex-direction:column;\r
  gap:8px;\r
}\r
.doc-list li{\r
  display:flex;\r
  align-items:center;\r
  justify-content:space-between;\r
  gap:10px;\r
  border:1px solid #dfe8f3;\r
  border-radius:8px;\r
  background:#f8fbff;\r
  padding:8px 10px;\r
  color:#3e566f;\r
}\r
.doc-list button{\r
  border:none;\r
  background:transparent;\r
  color:#9aa8b6;\r
  cursor:pointer;\r
  font-size:12px;\r
  font-weight:700;\r
}\r
.doc-list button:hover{\r
  color:#db4e4e;\r
}\r
.section-note{\r
  margin:6px 0 0;\r
  color:#7b8ea3;\r
  font-size:12px;\r
}\r
.add-service-actions{\r
  display:flex;\r
  justify-content:flex-end;\r
  gap:10px;\r
  padding:14px 18px;\r
  border-top:1px solid #e4ebf4;\r
  background:#fff;\r
}\r
\r
@media(max-width:1200px){\r
  .services-page .services{grid-template-columns:repeat(2,1fr);}\r
}\r
\r
@media(max-width:900px){\r
  .page{padding:16px;}\r
  .page-header{flex-direction:column;align-items:flex-start;gap:10px;}\r
  .page-header h2{font-size:24px;}\r
  .page-header h3{font-size:20px;}\r
  .form-grid{grid-template-columns:1fr;}\r
  .add-service-grid{grid-template-columns:1fr;}\r
  .service-field{grid-template-columns:1fr;}\r
}\r
\r
@media(max-width:760px){\r
  .services-page .services{grid-template-columns:1fr;}\r
}\r
`,Mu={name:"",service:ma[0],price:"",status:fa[0]};function vx(e){const n=String(e||"").toLowerCase();return n==="enabled"?"status-enabled":n==="disabled"?"status-disabled":"status-draft"}function yx(e){return e?{name:e.name,service:e.service,price:e.price,status:e.status}:Mu}function bx(){Xe({pageKey:"services-packages",pageCssText:xx});const[e,n]=k.useState(lx),[t,a]=k.useState(ox),[i,s]=k.useState(!1),[l,c]=k.useState(null),[d,h]=k.useState(Mu),[f,x]=k.useState(td),[p,y]=k.useState([]),N=t.find(g=>g.id===l)??null;k.useEffect(()=>{function g(w){w.key==="Escape"&&(c(null),s(!1))}return document.addEventListener("keydown",g),()=>{document.removeEventListener("keydown",g)}},[]);function S(){c(null)}function b(){s(!1)}function u(g,w){h(I=>({...I,[g]:w}))}function m(g,w){x(I=>({...I,[g]:w}))}function v(g){c(g.id),h(yx(g))}function P(g){window.confirm(`Do you want to disable ${g.name}?`)&&a(I=>I.map(R=>R.id!==g.id?R:{...R,status:"Disabled"}))}function E(){const g=f.requiredDocument.trim();g&&(y(w=>[...w,g]),m("requiredDocument",""))}function j(g){y(w=>w.filter((I,R)=>R!==g))}function T(g){if(g.preventDefault(),!N){S();return}a(w=>w.map(I=>I.id!==N.id?I:{...I,name:d.name.trim(),service:d.service.trim(),price:d.price.trim(),status:d.status.trim()})),S()}function z(g){g.preventDefault();const w=f.name.trim()||"New Service",I=p.length>0?p.length:1,R=`${I} ${I===1?"Package Created":"Packages Created"}`;n(V=>[...V,{id:`service-${V.length+1}`,count:I,title:w,meta:R}]),x(td),y([]),b()}return r.jsxs(r.Fragment,{children:[r.jsx(tn,{adminName:"Admin"}),r.jsxs("div",{className:"page services-page",children:[r.jsx("div",{className:"breadcrumb",children:"Dashboard › Services & Packages"}),r.jsxs("div",{className:"page-header",children:[r.jsx("h2",{children:"Services & Packages"}),r.jsx("button",{className:"btn primary",id:"openAddServiceModalBtn",type:"button",onClick:()=>{s(!0)},children:"+ Add New Service"})]}),r.jsx("h3",{style:{marginBottom:"10px"},children:"Services"}),r.jsx("div",{className:"services tiles",children:e.map(g=>r.jsxs("div",{className:"service tile",children:[r.jsx("div",{className:"num",children:g.count}),r.jsx("div",{className:"tile-title",children:g.title}),r.jsx("div",{className:"tile-meta",children:g.meta})]},g.id))}),r.jsxs("div",{className:"page-header",children:[r.jsx("h3",{children:"Packages"}),r.jsx("button",{className:"btn primary",type:"button",children:"+ Add New Package"})]}),r.jsxs("div",{className:"card",children:[r.jsxs("div",{className:"filters",children:[r.jsx("input",{placeholder:"Search"}),r.jsx("select",{defaultValue:ad[0],children:ad.map(g=>r.jsx("option",{children:g},g))}),r.jsx("select",{defaultValue:ma[0],children:ma.map(g=>r.jsx("option",{children:g},g))}),r.jsx("select",{defaultValue:fa[0],children:fa.map(g=>r.jsx("option",{children:g},g))})]}),r.jsxs("table",{id:"packagesTable",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"Package"}),r.jsx("th",{children:"Service"}),r.jsx("th",{children:"Price"}),r.jsx("th",{children:"Status"}),r.jsx("th",{children:"Actions"})]})}),r.jsx("tbody",{children:t.map(g=>r.jsxs("tr",{className:"package-row",children:[r.jsxs("td",{children:[g.name,g.isPopular?r.jsxs(r.Fragment,{children:[" ",r.jsx("span",{className:"tag popular",children:"Most Popular"})]}):null]}),r.jsx("td",{children:g.service}),r.jsx("td",{children:g.price}),r.jsx("td",{children:r.jsx("span",{className:`status ${vx(g.status)}`,children:g.status})}),r.jsxs("td",{children:[r.jsx("button",{type:"button",className:"action edit edit-package-btn",onClick:()=>{v(g)},children:"Edit"})," ",r.jsx("button",{type:"button",className:"action disable disable-package-btn",onClick:()=>{P(g)},children:"Disable"})]})]},g.id))})]})]})]}),r.jsx("div",{className:`modal-overlay${i?" open":""}`,id:"addServiceModal","aria-hidden":!i,onClick:g=>{g.target===g.currentTarget&&b()},children:r.jsxs("div",{className:"modal-card add-service-modal",role:"dialog","aria-modal":"true","aria-labelledby":"addServiceTitle",children:[r.jsxs("div",{className:"add-service-header",children:[r.jsxs("h3",{id:"addServiceTitle",children:[r.jsx("i",{className:"fa-solid fa-circle-plus"})," Add Service"]}),r.jsx("button",{type:"button",className:"modal-close",id:"closeAddServiceModalBtn","aria-label":"Close",onClick:b,children:"x"})]}),r.jsxs("form",{id:"addServiceForm",className:"add-service-form",onSubmit:z,children:[r.jsxs("div",{className:"add-service-grid",children:[r.jsxs("div",{className:"add-service-col",children:[r.jsxs("section",{className:"service-form-section",children:[r.jsxs("h4",{children:[r.jsx("i",{className:"fa-solid fa-circle-info"})," Basic Details"]}),r.jsxs("div",{className:"service-field",children:[r.jsx("label",{htmlFor:"addServiceName",children:"Service Name"}),r.jsx("input",{id:"addServiceName",type:"text",required:!0,value:f.name,onChange:g=>{m("name",g.target.value)}})]}),r.jsxs("div",{className:"service-field",children:[r.jsx("label",{htmlFor:"addServiceDescription",children:"Description"}),r.jsx("textarea",{id:"addServiceDescription",rows:"3",value:f.description,onChange:g=>{m("description",g.target.value)}})]}),r.jsxs("div",{className:"service-field",children:[r.jsx("label",{htmlFor:"addServiceCategory",children:"Category"}),r.jsx("select",{id:"addServiceCategory",value:f.category,onChange:g=>{m("category",g.target.value)},children:dx.map(g=>r.jsx("option",{children:g},g))})]})]}),r.jsxs("section",{className:"service-form-section",children:[r.jsxs("h4",{children:[r.jsx("i",{className:"fa-solid fa-users"})," Assigned Team"]}),r.jsxs("div",{className:"service-field",children:[r.jsx("label",{htmlFor:"addServiceMembers",children:"Assign Members"}),r.jsx("input",{id:"addServiceMembers",type:"text",placeholder:"Rahul, Priya, Amit",value:f.members,onChange:g=>{m("members",g.target.value)}})]}),r.jsx("p",{className:"section-note",children:"Assign members responsible for this service."})]}),r.jsxs("section",{className:"service-form-section",children:[r.jsxs("h4",{children:[r.jsx("i",{className:"fa-solid fa-calendar-days"})," Availability Settings"]}),r.jsxs("div",{className:"service-field",children:[r.jsx("label",{htmlFor:"addServiceDays",children:"Available Days"}),r.jsx("select",{id:"addServiceDays",value:f.availableDays,onChange:g=>{m("availableDays",g.target.value)},children:cx.map(g=>r.jsx("option",{children:g},g))})]}),r.jsxs("div",{className:"service-field",children:[r.jsx("label",{htmlFor:"addServiceTime",children:"Available Time"}),r.jsx("select",{id:"addServiceTime",value:f.availableTime,onChange:g=>{m("availableTime",g.target.value)},children:ux.map(g=>r.jsx("option",{children:g},g))})]}),r.jsxs("div",{className:"service-field",children:[r.jsx("label",{htmlFor:"addServiceCurrency",children:"Currency"}),r.jsx("select",{id:"addServiceCurrency",value:f.currency,onChange:g=>{m("currency",g.target.value)},children:px.map(g=>r.jsx("option",{children:g},g))})]}),r.jsx("p",{className:"section-note",children:"Define pricing and billing for the service."})]})]}),r.jsxs("div",{className:"add-service-col",children:[r.jsxs("section",{className:"service-form-section",children:[r.jsxs("h4",{children:[r.jsx("i",{className:"fa-regular fa-clipboard"})," Requirements"]}),r.jsxs("div",{className:"service-field stacked",children:[r.jsx("label",{htmlFor:"addServiceRequiredDoc",children:"Required Documents"}),r.jsx("input",{id:"addServiceRequiredDoc",type:"text",placeholder:"Proof of Purchase, Image Upload",value:f.requiredDocument,onChange:g=>{m("requiredDocument",g.target.value)}})]}),r.jsx("button",{type:"button",className:"btn-link",id:"addServiceAddDocumentBtn",onClick:E,children:"+ Add Document"}),r.jsx("ul",{id:"addServiceDocsList",className:"doc-list",children:p.map((g,w)=>r.jsxs("li",{children:[r.jsx("span",{children:g}),r.jsx("button",{type:"button",onClick:()=>{j(w)},children:"Remove"})]},`${g}-${w}`))}),r.jsx("p",{className:"section-note",children:"Specify any documents needed for this service."})]}),r.jsxs("section",{className:"service-form-section",children:[r.jsxs("h4",{children:[r.jsx("i",{className:"fa-regular fa-clock"})," Duration & Location"]}),r.jsxs("div",{className:"service-field",children:[r.jsx("label",{htmlFor:"addServiceDuration",children:"Estimated Duration (Hrs)"}),r.jsx("select",{id:"addServiceDuration",value:f.duration,onChange:g=>{m("duration",g.target.value)},children:mx.map(g=>r.jsx("option",{children:g},g))})]}),r.jsxs("div",{className:"service-field",children:[r.jsx("label",{htmlFor:"addServicePriority",children:"Priority"}),r.jsx("select",{id:"addServicePriority",value:f.priority,onChange:g=>{m("priority",g.target.value)},children:fx.map(g=>r.jsx("option",{children:g},g))})]}),r.jsxs("div",{className:"service-field",children:[r.jsx("label",{htmlFor:"addServiceLocation",children:"Location"}),r.jsx("select",{id:"addServiceLocation",value:f.location,onChange:g=>{m("location",g.target.value)},children:hx.map(g=>r.jsx("option",{children:g},g))})]}),r.jsx("p",{className:"section-note",children:"Specify the duration and location for the service."})]}),r.jsxs("section",{className:"service-form-section",children:[r.jsxs("h4",{children:[r.jsx("i",{className:"fa-regular fa-eye"})," Visibility Settings"]}),r.jsxs("div",{className:"service-field",children:[r.jsx("label",{htmlFor:"addServiceVisibleTo",children:"Visible To"}),r.jsx("select",{id:"addServiceVisibleTo",value:f.visibleTo,onChange:g=>{m("visibleTo",g.target.value)},children:gx.map(g=>r.jsx("option",{children:g},g))})]}),r.jsx("p",{className:"section-note",children:"Control who can view and request this service."})]})]})]}),r.jsxs("div",{className:"add-service-actions",children:[r.jsx("button",{type:"button",className:"btn gray",id:"cancelAddServiceBtn",onClick:b,children:"Cancel"}),r.jsx("button",{type:"submit",className:"btn primary",children:"Add Service"})]})]})]})}),r.jsx("div",{className:`modal-overlay${N?" open":""}`,id:"editPackageModal","aria-hidden":!N,onClick:g=>{g.target===g.currentTarget&&S()},children:r.jsxs("div",{className:"modal-card",role:"dialog","aria-modal":"true","aria-labelledby":"editPackageTitle",children:[r.jsxs("div",{className:"modal-header",children:[r.jsx("h3",{id:"editPackageTitle",children:"Edit Package Details"}),r.jsx("button",{type:"button",className:"modal-close",id:"closeEditPackageModalBtn","aria-label":"Close",onClick:S,children:"x"})]}),r.jsxs("form",{id:"editPackageForm",className:"package-form",onSubmit:T,children:[r.jsx("input",{type:"hidden",id:"editPackageRowIndex",value:N?t.findIndex(g=>g.id===N.id):"",readOnly:!0}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"editPackageName",children:"Package Name"}),r.jsx("input",{id:"editPackageName",type:"text",required:!0,value:d.name,onChange:g=>{u("name",g.target.value)}})]}),r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"editPackageService",children:"Service"}),r.jsx("select",{id:"editPackageService",required:!0,value:d.service,onChange:g=>{u("service",g.target.value)},children:ma.map(g=>r.jsx("option",{children:g},g))})]})]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"editPackagePrice",children:"Price"}),r.jsx("input",{id:"editPackagePrice",type:"text",required:!0,value:d.price,onChange:g=>{u("price",g.target.value)}})]}),r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"editPackageStatus",children:"Status"}),r.jsx("select",{id:"editPackageStatus",required:!0,value:d.status,onChange:g=>{u("status",g.target.value)},children:fa.map(g=>r.jsx("option",{children:g},g))})]})]}),r.jsxs("div",{className:"modal-actions",children:[r.jsx("button",{type:"button",className:"btn gray",id:"cancelEditPackageBtn",onClick:S,children:"Cancel"}),r.jsx("button",{type:"submit",className:"btn primary",children:"Save Changes"})]})]})]})})]})}const jx=[{key:"company",buttonId:"btnCompany",iconClass:"fa fa-building",label:"Company Settings"},{key:"users",buttonId:"btnUsers",iconClass:"fa fa-users",label:"User Management"},{key:"roles",buttonId:"btnRoles",iconClass:"fa fa-lock",label:"Roles & Permissions"},{key:"security",buttonId:"btnSecurity",iconClass:"fa fa-shield-alt",label:"Security Settings"},{key:"financial",buttonId:"btnFinancial",iconClass:"fa fa-coins",label:"Financial Settings"},{key:"email",buttonId:"btnEmail",iconClass:"fa fa-envelope",label:"Email & Notifications"},{key:"workflow",buttonId:"btnWorkflow",iconClass:"fa fa-sitemap",label:"Workflow & Approvals"},{key:"system",buttonId:"btnSystem",iconClass:"fa fa-database",label:"Backup & System"}],wx={companyName:"",tradeLicense:"",vatNumber:"",contactEmail:"",contactPhone:"",address:"",poBox:"",companyCurrency:"AED",companyTimeZone:"Asia/Dubai"},kx=[{id:1,name:"System Admin",email:"admin@company.com",role:"Admin",status:"Active",lastLogin:"2026-02-14 10:30am"},{id:2,name:"Rahul Sharma",email:"rahul@company.com",role:"Sales",status:"Active",lastLogin:"2026-02-13 02:15pm"},{id:3,name:"Priya Agarwal",email:"priya@company.com",role:"Accounts",status:"Active",lastLogin:"2026-02-12 09:45am"},{id:4,name:"Rohit Verma",email:"rohit@company.com",role:"Manager",status:"Active",lastLogin:"2026-02-11 11:20am"},{id:5,name:"Anand Kapoor",email:"anand@company.com",role:"Client",status:"Inactive",lastLogin:"2026-01-30 03:10pm"}],Nx=[{value:"",label:"Select Role"},{value:"Admin",label:"Admin"},{value:"Manager",label:"Manager"},{value:"Sales",label:"Sales Department"},{value:"Accounts",label:"Accounts Department"},{value:"Client",label:"Client"}],Sx=[{key:"clients",title:"Clients",iconClass:"fa fa-user-tie",badgeClass:"full-access",badgeLabel:"Full Access",permissions:[{key:"view",id:"permClientView",label:"View"},{key:"create",id:"permClientCreate",label:"Create"},{key:"edit",id:"permClientEdit",label:"Edit"},{key:"delete",id:"permClientDelete",label:"Delete"},{key:"approve",id:"permClientApprove",label:"Approve"}]},{key:"sales",title:"Sales",iconClass:"fa fa-chart-line",badgeClass:"full-access",badgeLabel:"Full Access",permissions:[{key:"view",id:"permSalesView",label:"View"},{key:"create",id:"permSalesCreate",label:"Create"},{key:"edit",id:"permSalesEdit",label:"Edit"},{key:"delete",id:"permSalesDelete",label:"Delete"},{key:"approve",id:"permSalesApprove",label:"Approve"}]},{key:"accounts",title:"Accounts",iconClass:"fa fa-calculator",badgeClass:"full-access",badgeLabel:"Full Access",permissions:[{key:"view",id:"permAccountsView",label:"View"},{key:"create",id:"permAccountsCreate",label:"Create"},{key:"edit",id:"permAccountsEdit",label:"Edit"},{key:"delete",id:"permAccountsDelete",label:"Delete"},{key:"approve",id:"permAccountsApprove",label:"Approve"}]},{key:"reports",title:"Reports",iconClass:"fa fa-file-pdf",badgeClass:"full-access",badgeLabel:"Full Access",permissions:[{key:"view",id:"permReportsView",label:"View"},{key:"create",id:"permReportsCreate",label:"Create"},{key:"edit",id:"permReportsEdit",label:"Edit"},{key:"delete",id:"permReportDelete",label:"Delete"},{key:"approve",id:"permReportsApprove",label:"Approve"}]},{key:"operations",title:"Operations",iconClass:"fa fa-cog",badgeClass:"full-access",badgeLabel:"Full Access",permissions:[{key:"view",id:"permOpsView",label:"View"},{key:"create",id:"permOpsCreate",label:"Create"},{key:"edit",id:"permOpsEdit",label:"Edit"},{key:"delete",id:"permOpsDelete",label:"Delete"},{key:"approve",id:"permOpsApprove",label:"Approve"}]}],Cx={clients:{view:!0,create:!0,edit:!0,delete:!0,approve:!0},sales:{view:!0,create:!0,edit:!0,delete:!0,approve:!0},accounts:{view:!0,create:!0,edit:!0,delete:!0,approve:!0},reports:{view:!0,create:!0,edit:!0,delete:!0,approve:!0},operations:{view:!0,create:!0,edit:!0,delete:!0,approve:!0}},Px=[{value:"",label:"Choose a template..."},{value:"invoice",label:"Invoice Email"},{value:"payment",label:"Payment Confirmation"},{value:"approval",label:"Approval Request"},{value:"quotation",label:"Quotation"},{value:"welcome",label:"Welcome Email"}],Ex={invoice:{subject:"Invoice {invoice_no} - {company}",body:`Dear {client},

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
{company}`}},Ax={smtpServer:"",smtpPort:"587",smtpEmail:"",smtpPassword:"",smtpEncryption:"tls",senderName:"LedgerWorx",templateType:"",templateSubject:"",templateBody:"",emailOnInvoice:!0,emailOnPayment:!0,emailOnApproval:!0,whatsappEnabled:!1,whatsappAccountId:"",whatsappApiKey:"",whatsappPhone:"",waInvoice:!0,waPayment:!0,waApproval:!1,smsProvider:"",smsAccountId:"",smsAuthToken:"",smsSenderPhone:"",smsInvoice:!1,smsPayment:!1,smsApproval:!1},Tx=[{dateTime:"2026-02-14 02:30 PM",ipAddress:"203.0.113.42",browser:"Chrome on Windows",status:"Success",color:"green"},{dateTime:"2026-02-14 10:15 AM",ipAddress:"203.0.113.42",browser:"Safari on MacOS",status:"Success",color:"green"},{dateTime:"2026-02-13 11:45 PM",ipAddress:"192.168.1.50",browser:"Firefox on Linux",status:"Success",color:"green"},{dateTime:"2026-02-13 03:20 PM",ipAddress:"203.0.113.42",browser:"Chrome on Windows",status:"Success",color:"green"},{dateTime:"2026-02-12 09:00 AM",ipAddress:"10.0.0.5",browser:"Chrome on Windows",status:"Failed - Wrong Password",color:"red"}],Dx=[{dateTime:"2026-02-14 02:35 PM",user:"System Admin",action:"Updated Settings",resource:"Company Settings",status:"Success",color:"green"},{dateTime:"2026-02-14 02:30 PM",user:"System Admin",action:"Created User",resource:"Rahul Sharma (ID: 6)",status:"Success",color:"green"},{dateTime:"2026-02-14 01:15 PM",user:"Manager",action:"Viewed Report",resource:"Sales Report - Feb 2026",status:"Success",color:"green"},{dateTime:"2026-02-13 11:50 PM",user:"System Admin",action:"Modified Permission",resource:"Sales Department Role",status:"Success",color:"green"},{dateTime:"2026-02-13 10:20 AM",user:"System Admin",action:"Deleted User",resource:"Old Test Account (ID: 4)",status:"Success",color:"green"}],Rx={currentPassword:"",newPassword:"",confirmPassword:"",twoFactorEnabled:!1,authMethod:"",maxAttempts:"5",lockoutDuration:"15",sessionTimeout:"30",inactivityWarning:"25",ipWhitelistEnabled:!1,ipAddresses:""},zx={vatPercent:"5",vatRegNumber:"",vatApplyTo:"all",invoicePrefix:"INV",invoiceYearFormat:"full",invoiceDigits:"3",quotationPrefix:"QT",quotationValidity:"30",quotationTerms:"yes",defaultPaymentTerms:"cod",earlyPaymentDiscount:"0",latePaymentPenalty:"0",bankName:"",accountHolderName:"",accountNumber:"",iban:"",swiftCode:"",branchCode:"",multiCurrencyEnabled:!1,baseCurrency:"AED",supportedCurrencies:[],taxInPrice:!1,taxOnDiscounts:!1,taxRegNumber:"",taxLabel:"VAT"},id=["AED","USD","EUR","INR","GBP","SAR","KWD","QAR"],Ix={level1Approver:"",level1Required:"yes",level2Approver:"3",level2Required:"yes",level3Approver:"1",level3Required:"yes",defaultSalesperson:"2",autoAssignToggle:"yes",emailOnApproved:!0,emailOnRejected:!0,emailOnHold:!1,emailOnStatusChange:!0,emailRecipientRequester:!0,emailRecipientApprover:!0,emailRecipientManager:!1,emailRecipientAdmin:!1,escalationToggle:!1,escalateAfterHours:"24",escalateToLevel:"next",escalationEmailCurrentApprover:!0,escalationEmailNextApprover:!0,escalationAdminAlert:!0},Lx=[{title:"Pending",description:"Awaiting approval",color:"#f39c12",statusLabel:"Active"},{title:"Approved",description:"Request approved",color:"#27ae60",statusLabel:"Active"},{title:"Rejected",description:"Request rejected",color:"#e74c3c",statusLabel:"Active"},{title:"On Hold",description:"Temporarily paused",color:"#95a5a6",statusLabel:"Active"}],Fx={backupFrequency:"daily",backupTime:"02:00",maintenanceModeToggle:!1,systemVersionLabel:"LedgerWorx v2.3.1",buildDate:"2026-02-14"},Mx=`:root{\r
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
`,Un={border:"1px solid #ddd",borderRadius:"10px",padding:"20px",background:"var(--card)"},le={...Un,marginBottom:"20px"},Li={background:"#f0f8ff",padding:"15px",borderRadius:"6px",marginTop:"15px",borderLeft:"4px solid var(--primary)"},_x={background:"#fff3cd",padding:"12px",borderRadius:"6px",borderLeft:"4px solid #f39c12",marginTop:"15px"},Ox={display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"15px",marginBottom:"15px"},Bx={border:"1px solid #ddd",borderRadius:"8px",padding:"12px",background:"#f9f9f9"},Ux={display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:"10px"},$x={marginTop:"10px",display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))",gap:"10px"},Vx={minHeight:"120px",padding:"10px",border:"1px solid #ddd",borderRadius:"6px",fontFamily:"monospace"},Wx={minHeight:"200px",padding:"10px",border:"1px solid #ddd",borderRadius:"6px",fontFamily:"monospace",fontSize:"13px"},sd={fullName:"",email:"",role:"",status:"Active"},Fi={1:"System Admin",2:"Rahul Sharma",3:"Priya Agarwal",4:"Rohit Verma"},qx={2:"Rahul Sharma",5:"Sales Team Lead",6:"Vikram Singh"},Hx={cod:"Cash on Delivery",net15:"Net 15 Days",net30:"Net 30 Days",net45:"Net 45 Days",net60:"Net 60 Days"};function ld(e,n){const t=new FileReader;t.onload=a=>{var i;n(String(((i=a.target)==null?void 0:i.result)??""))},t.readAsDataURL(e)}function Qx(e){const n=String(new Date().getFullYear()),t=e.invoicePrefix.trim().toUpperCase()||"INV",a=e.invoiceYearFormat==="full"?n:n.slice(-2),i=Math.max(1,Number(e.invoiceDigits||1)),s=`${"0".repeat(i-1)}1`;return`${t}-${a}-${s}`}function Yx(e){return`${e.quotationPrefix.trim().toUpperCase()||"QT"}-${new Date().getFullYear()}-001`}function Kx(e){return String(e||"?").trim().charAt(0).toUpperCase()}function Gx(){if(typeof window>"u")return"Admin";try{const e=window.localStorage.getItem("ledger_role");return e&&e.trim()?e.trim():"Admin"}catch{return"Admin"}}function Xx(e){return e.length===0?1:Math.max(...e.map(n=>n.id))+1}function Zx(){Xe({pageKey:"settings",pageCssText:Mx});const n=k.useMemo(()=>Gx(),[]).toLowerCase()==="admin",t=k.useRef(null),a=k.useRef(null),[i,s]=k.useState("company"),[l,c]=k.useState(wx),[d,h]=k.useState(""),[f,x]=k.useState(""),[p,y]=k.useState(Ax),[N,S]=k.useState(Rx),[b,u]=k.useState(kx),[m,v]=k.useState(!1),[P,E]=k.useState(null),[j,T]=k.useState(sd),[z,g]=k.useState(Cx),[w,I]=k.useState(zx),[R,V]=k.useState(Ix),[U,A]=k.useState(Fx),[Q,Ue]=k.useState(null);k.useEffect(()=>{function o(L){L.key==="Escape"&&(v(!1),E(null))}return document.addEventListener("keydown",o),()=>{document.removeEventListener("keydown",o)}},[]);const F=k.useMemo(()=>Qx(w),[w]),_=k.useMemo(()=>Yx(w),[w]),O=n?"Admin can configure: SMTP, Email Templates, Auto Email (Invoice Creation, Payment Received, Approval Request), WhatsApp API, SMS Integration.":"Admin-only configuration. Your current role can view but cannot modify Email & Notification settings.",H=n?"Admin only controls":"Admin only controls. Your current role does not allow changes.";function C(o,L,B){o(re=>({...re,[L]:B}))}function ae(){return n?!0:(window.alert("Only admin users can perform this action."),!1)}function $e(o){var B;const L=(B=o.target.files)==null?void 0:B[0];L&&ld(L,h)}function gn(o){var B;const L=(B=o.target.files)==null?void 0:B[0];L&&ld(L,x)}function Ve(){t.current&&(t.current.value=""),h("")}function an(){a.current&&(a.current.value=""),x("")}function _u(){if(!n){window.alert("Only admin users can add new users.");return}E(null),T(sd),v(!0)}function Ou(o){const L=b.find(B=>B.id===o);L&&(E(o),T({fullName:L.name,email:L.email,role:L.role,status:L.status}),v(!0))}function At(){v(!1),E(null)}function Bu(){const o=j.fullName.trim(),L=j.email.trim(),B=j.role,re=j.status;if(!o||!L||!B){window.alert("Please fill all required fields");return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(L)){window.alert("Please enter a valid email");return}P?(u(Dt=>Dt.map(zr=>zr.id===P?{...zr,name:o,email:L,role:B,status:re}:zr)),window.alert("User updated successfully!")):(u(Dt=>{const zr=Xx(Dt);return[...Dt,{id:zr,name:o,email:L,role:B,status:re,lastLogin:"Never"}]}),window.alert("User added successfully! (Password should be sent separately)")),At()}function Uu(o){window.confirm("Are you sure you want to delete this user?")&&(u(L=>L.filter(B=>B.id!==o)),window.alert("User deleted successfully!"))}function $u(o){const L=b.find(re=>re.id===o);if(!L)return;const B=L.status==="Active"?"Inactive":"Active";u(re=>re.map(Tt=>Tt.id===o?{...Tt,status:B}:Tt)),window.alert(`User ${B==="Active"?"activated":"deactivated"} successfully!`)}function Vu(o){const L=b.find(re=>re.id===o);if(!L)return;const B=window.prompt(`Generate new password for ${L.name}?
(Leave blank to auto-generate)`);if(B!==null){const re=B||`AUTO-GENERATED-${Math.random().toString(36).substring(7)}`;window.alert(`Password reset for ${L.name}.
New password: ${re}
(Should be sent via email)`)}}function Wu(o){const L=b.find(B=>B.id===o);!L||!window.confirm(`Force logout ${L.name}?`)||window.alert(`${L.name} has been logged out from all sessions.`)}function qu(o,L,B){g(re=>({...re,[o]:{...re[o],[L]:B}}))}function Hu(){console.log("Role Permissions saved:",z),window.alert("Role permissions saved successfully!")}function Qu(){const o={companyName:l.companyName.trim(),tradeLicense:l.tradeLicense.trim(),vatNumber:l.vatNumber.trim(),contactEmail:l.contactEmail.trim(),contactPhone:l.contactPhone.trim(),address:l.address.trim(),poBox:l.poBox.trim(),currency:l.companyCurrency,timeZone:l.companyTimeZone};if(!o.companyName||!o.contactEmail||!o.contactPhone){window.alert("Company Name, Email, and Phone are required");return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(o.contactEmail)){window.alert("Please enter a valid email address");return}console.log("Company Settings saved:",o),window.alert("Company settings saved successfully!")}function Yu(){if(!ae())return;const o=Number(p.smtpPort);if(!p.smtpServer.trim()||!p.smtpEmail.trim()||!p.smtpPassword||!p.senderName.trim()||!o){window.alert("Please fill all required SMTP fields");return}if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(p.smtpEmail.trim())){window.alert("Please enter a valid email address");return}console.log("SMTP Settings:",p),window.alert(`SMTP Settings saved:
- Server: ${p.smtpServer.trim()}:${o}
- Email: ${p.smtpEmail.trim()}
- Sender: ${p.senderName.trim()}`)}function Ku(){if(ae()){if(!p.smtpServer.trim()){window.alert("Please save SMTP settings first");return}window.alert(`Testing SMTP connection to ${p.smtpServer.trim()}...

Connection Status: SUCCESS ✓

SMTP server is reachable and authentication is valid.`)}}function Gu(o){if(!o){y(B=>({...B,templateType:"",templateSubject:"",templateBody:""}));return}const L=Ex[o];y(B=>({...B,templateType:o,templateSubject:L.subject,templateBody:L.body}))}function Xu(){if(ae()){if(!p.templateSubject.trim()||!p.templateBody.trim()){window.alert("Subject and body are required");return}console.log("Email Template:",{templateType:p.templateType,subject:p.templateSubject,body:p.templateBody}),window.alert("Email template saved successfully!")}}function Zu(){ae()&&window.alert(`Auto Email Triggers saved:
- Invoice Creation: ${p.emailOnInvoice?"Enabled":"Disabled"}
- Payment Received: ${p.emailOnPayment?"Enabled":"Disabled"}
- Approval Request: ${p.emailOnApproval?"Enabled":"Disabled"}`)}function Ju(o){n&&C(y,"whatsappEnabled",o)}function ep(){if(ae()){if(!p.whatsappAccountId.trim()||!p.whatsappApiKey||!p.whatsappPhone.trim()){window.alert("Please fill all required WhatsApp fields");return}console.log("WhatsApp Settings:",p),window.alert(`WhatsApp API Settings saved:
- Account ID: ${p.whatsappAccountId.trim()}
- Default Phone: ${p.whatsappPhone.trim()}`)}}function np(){if(ae()){if(!p.whatsappAccountId.trim()){window.alert("Please save WhatsApp settings first");return}window.alert(`Testing WhatsApp connection for account ${p.whatsappAccountId.trim()}...

Connection Status: SUCCESS ✓

WhatsApp API is accessible and authentication is valid.`)}}function rp(o){n&&C(y,"smsProvider",o)}function tp(){if(ae()){if(!p.smsAccountId.trim()||!p.smsAuthToken){window.alert("Please fill all required SMS fields");return}if(p.smsProvider==="twilio"&&!p.smsSenderPhone.trim()){window.alert("Sender phone number is required for Twilio");return}console.log("SMS Settings:",p),window.alert(`SMS Settings saved:
- Provider: ${p.smsProvider.toUpperCase()}
- Account ID: ${p.smsAccountId.trim()}`)}}function ap(){if(ae()){if(!p.smsProvider){window.alert("Please select an SMS provider");return}window.alert(`Testing ${p.smsProvider.toUpperCase()} SMS connection...

Connection Status: SUCCESS ✓

SMS gateway is accessible and authentication is valid.`)}}function ip(){if(!N.currentPassword||!N.newPassword||!N.confirmPassword){window.alert("All password fields are required");return}if(N.newPassword.length<8){window.alert("New password must be at least 8 characters");return}if(N.newPassword!==N.confirmPassword){window.alert("New password and confirmation do not match");return}if(N.currentPassword===N.newPassword){window.alert("New password cannot be the same as current password");return}window.alert("Password updated successfully! You will be logged out for security purposes."),S(o=>({...o,currentPassword:"",newPassword:"",confirmPassword:""}))}function sp(){if(!N.authMethod){window.alert("Please select an authentication method");return}window.alert(`2FA Setup: ${N.authMethod}

A verification code has been sent to your registered ${N.authMethod==="sms"?"phone number":"email"}.
Please verify to complete 2FA setup.`)}function lp(){const o=Number(N.maxAttempts),L=Number(N.lockoutDuration);if(o<1||L<5){window.alert("Invalid values. Max attempts must be at least 1, lockout duration at least 5 minutes");return}console.log("Login attempt settings:",{maxFailed:o,lockoutMinutes:L}),window.alert(`Login attempt settings saved:
- Max Failed Attempts: ${o}
- Lockout Duration: ${L} minutes`)}function op(){const o=Number(N.sessionTimeout),L=Number(N.inactivityWarning);if(o<5||L<1||L>=o){window.alert("Invalid timeout values. Session must be >= 5 min, warning < session timeout");return}console.log("Session timeout settings:",{sessionMinutes:o,warningMinutes:L}),window.alert(`Session timeout settings saved:
- Session Timeout: ${o} minutes
- Inactivity Warning: ${L} minutes`)}function dp(){const o=N.ipAddresses.trim().split(`
`).filter(re=>re.trim());if(o.length===0){window.alert("Please enter at least one IP address");return}const L=/^(\d{1,3}\.){3}\d{1,3}$/,B=o.filter(re=>!L.test(re.trim()));if(B.length>0){window.alert(`Invalid IP addresses: ${B.join(", ")}`);return}console.log("IP whitelist:",o),window.alert(`IP Whitelist saved:
${o.join(`
`)}`)}function cp(){const o=Number(w.vatPercent);if(o<0||o>100){window.alert("VAT percentage must be between 0 and 100");return}console.log("VAT Settings:",w),window.alert(`VAT Settings saved:
- VAT %: ${o}%
- Registration: ${w.vatRegNumber.trim()||"Not provided"}
- Apply to: ${w.vatApplyTo}`)}function up(){if(!w.invoicePrefix.trim()){window.alert("Invoice prefix is required");return}console.log("Invoice Format:",w),window.alert(`Invoice Format saved:
Example: ${F}`)}function pp(){const o=Number(w.quotationValidity);if(!w.quotationPrefix.trim()||o<1||o>365){window.alert("Please enter valid quotation settings (prefix required, validity 1-365 days)");return}console.log("Quotation Format:",w),window.alert(`Quotation Format saved:
Example: ${_}
Validity: ${o} days`)}function mp(){const o=Number(w.earlyPaymentDiscount),L=Number(w.latePaymentPenalty);if(o<0||o>50||L<0||L>50){window.alert("Discount and penalty percentages must be between 0 and 50");return}console.log("Payment Terms:",w),window.alert(`Payment Terms saved:
- Default: ${Hx[w.defaultPaymentTerms]||w.defaultPaymentTerms}
- Early Payment Discount: ${o}%
- Late Payment Penalty: ${L}%`)}function fp(){if(!w.bankName.trim()||!w.accountHolderName.trim()||!w.accountNumber.trim()||!w.iban.trim()){window.alert("Bank Name, Account Holder, Account Number, and IBAN are required");return}if(!/^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/.test(w.iban.trim())){window.alert("Please enter a valid IBAN format");return}console.log("Bank Details:",w),window.alert(`Bank Details saved:
- Bank: ${w.bankName.trim()}
- Account Holder: ${w.accountHolderName.trim()}
- IBAN: ${w.iban.trim()}`)}function hp(o,L){I(B=>({...B,supportedCurrencies:L?[...B.supportedCurrencies,o]:B.supportedCurrencies.filter(re=>re!==o)}))}function gp(){const o=[...w.supportedCurrencies];if(o.length===0){window.alert("Please select at least one currency");return}o.includes(w.baseCurrency)||o.push(w.baseCurrency);const L=o.sort();console.log("Currency Settings:",{baseCurrency:w.baseCurrency,supportedCurrencies:L}),window.alert(`Currency Settings saved:
- Base Currency: ${w.baseCurrency}
- Supported: ${L.join(", ")}`)}function xp(){console.log("Tax Settings:",w),window.alert(`Tax Settings saved:
- Include in Price: ${w.taxInPrice?"Yes":"No"}
- Tax on Discounts: ${w.taxOnDiscounts?"Yes":"No"}
- Tax Label: ${w.taxLabel.trim()||"VAT"}`)}function vp(){if(!R.level1Approver||!R.level2Approver||!R.level3Approver){window.alert("Please select an approver for all levels");return}console.log("Approval Hierarchy:",R),window.alert(`Approval Hierarchy saved:

Level 1 (0-10K): ${Fi[R.level1Approver]}
Level 2 (10K-50K): ${Fi[R.level2Approver]}
Level 3 (50K+): ${Fi[R.level3Approver]}`)}function yp(){if(!R.defaultSalesperson){window.alert("Please select a default salesperson");return}console.log("Default Salesperson:",R),window.alert(`Default Salesperson saved:
- Salesperson: ${qx[R.defaultSalesperson]}
- Auto-assign new clients: ${R.autoAssignToggle==="yes"?"Yes":"No"}`)}function bp(){window.alert(`Custom status creation:

You can add new status types that complement the default statuses (Pending, Approved, Rejected, On Hold).

Example custom statuses:
- In Review
- Needs Revision
- Escalated
- Conditional Approval

Feature coming soon!`)}function jp(){const o=[];R.emailOnApproved&&o.push("Approval"),R.emailOnRejected&&o.push("Rejection"),R.emailOnHold&&o.push("On Hold"),R.emailOnStatusChange&&o.push("Status Change");const L=[R.emailRecipientRequester?"Requester":null,R.emailRecipientApprover?"Approver":null,R.emailRecipientManager?"Manager":null,R.emailRecipientAdmin?"Admin":null].filter(Boolean);console.log("Auto Email Approval:",R),window.alert(`Auto Email Settings saved:

Triggers: ${o.length>0?o.join(", "):"None"}

Recipients: ${L.join(", ")}`)}function wp(){const o=Number(R.escalateAfterHours);if(o<1||o>168){window.alert("Escalation time must be between 1 and 168 hours");return}const L={next:"Next Approver in Hierarchy",manager:"Department Manager",ceo:"CEO/Admin"};console.log("Escalation Rules:",R),window.alert(`Escalation Rules saved:

Escalate after: ${o} hours
Escalate to: ${L[R.escalateToLevel]}

Notifications:
- Current Approver Reminder: ${R.escalationEmailCurrentApprover?"Yes":"No"}
- Next Approver Alert: ${R.escalationEmailNextApprover?"Yes":"No"}
- Admin Alert: ${R.escalationAdminAlert?"Yes":"No"}`)}function kp(){if(!ae())return;const o=new Date,L=`ledgerworx_backup_${o.getFullYear()}${String(o.getMonth()+1).padStart(2,"0")}${String(o.getDate()).padStart(2,"0")}_${String(o.getHours()).padStart(2,"0")}${String(o.getMinutes()).padStart(2,"0")}.sql`,B=o.toLocaleString();Ue({fileName:L,generatedAt:B}),window.alert(`Manual backup completed successfully.

Generated file: ${L}`)}function Np(){if(ae()){if(!U.backupTime){window.alert("Please select a valid backup time.");return}console.log("Backup schedule saved:",{frequency:U.backupFrequency,time:U.backupTime}),window.alert(`Auto backup schedule saved:
- Frequency: ${U.backupFrequency}
- Time: ${U.backupTime}`)}}function Sp(){if(ae()){if(!Q){window.alert("No backup file available yet. Run a manual backup first.");return}window.alert(`Downloading: ${Q.fileName}

In production, this will stream the backup file.`)}}function Cp(o){ae()&&(C(A,"maintenanceModeToggle",o),window.alert(`Maintenance mode ${o?"enabled":"disabled"} successfully.`))}function Pp(){ae()&&window.confirm("Clear system cache now? This may temporarily slow the next few requests.")&&window.alert("System cache cleared successfully.")}return r.jsxs(r.Fragment,{children:[r.jsx(tn,{adminName:"Admin"}),r.jsx("div",{className:"page",children:r.jsxs("div",{className:"card",children:[r.jsx("div",{className:"settings-menu",children:jx.map(o=>r.jsxs("button",{id:o.buttonId,className:i===o.key?"active":"",type:"button",onClick:()=>{s(o.key)},children:[r.jsx("i",{className:o.iconClass})," ",o.label]},o.key))}),r.jsxs("div",{id:"company",className:`section${i==="company"?" active":""}`,children:[r.jsx("h3",{children:"Company Settings"}),r.jsx("br",{}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Company Name *"}),r.jsx("input",{id:"companyName",placeholder:"Enter company name",value:l.companyName,onChange:o=>C(c,"companyName",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Trade License Number"}),r.jsx("input",{id:"tradeLicense",placeholder:"e.g., TL-123456",value:l.tradeLicense,onChange:o=>C(c,"tradeLicense",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"VAT Number (5%)"}),r.jsx("input",{id:"vatNumber",placeholder:"e.g., 100123456700003",value:l.vatNumber,onChange:o=>C(c,"vatNumber",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Contact Email *"}),r.jsx("input",{id:"contactEmail",type:"email",placeholder:"admin@company.com",value:l.contactEmail,onChange:o=>C(c,"contactEmail",o.target.value)})]})]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Contact Phone *"}),r.jsx("input",{id:"contactPhone",placeholder:"e.g., +971-4-1234567",value:l.contactPhone,onChange:o=>C(c,"contactPhone",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Address"}),r.jsx("input",{id:"address",placeholder:"Street address",value:l.address,onChange:o=>C(c,"address",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"PO Box"}),r.jsx("input",{id:"poBox",placeholder:"e.g., P.O. Box 123456",value:l.poBox,onChange:o=>C(c,"poBox",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Currency"}),r.jsxs("select",{id:"companyCurrency",value:l.companyCurrency,onChange:o=>C(c,"companyCurrency",o.target.value),children:[r.jsx("option",{children:"AED"}),r.jsx("option",{children:"USD"}),r.jsx("option",{children:"INR"})]})]})]}),r.jsx("div",{className:"form-grid",children:r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Time Zone"}),r.jsxs("select",{id:"companyTimeZone",value:l.companyTimeZone,onChange:o=>C(c,"companyTimeZone",o.target.value),children:[r.jsx("option",{children:"Asia/Dubai"}),r.jsx("option",{children:"Asia/Kolkata"}),r.jsx("option",{children:"Europe/London"})]})]})}),r.jsxs("div",{style:{...Un,marginTop:"25px",background:"#f9f9f9"},children:[r.jsx("h4",{style:{marginBottom:"15px"},children:"Company Logo"}),r.jsxs("div",{className:"upload-box",onClick:()=>{var o;(o=t.current)==null||o.click()},children:[r.jsx("input",{ref:t,type:"file",id:"logoUpload",accept:"image/*",style:{display:"none"},onChange:$e}),r.jsx("i",{className:"fas fa-cloud-upload-alt",style:{fontSize:"32px",color:"var(--muted)"}}),r.jsx("br",{}),r.jsx("small",{style:{color:"var(--muted)"},children:"Click to upload or drag logo (PNG, JPG, SVG)"}),r.jsx("div",{id:"logoPreview",children:d?r.jsxs("div",{className:"upload-preview",children:[r.jsx("img",{src:d,alt:"Logo"}),r.jsx("button",{type:"button",className:"remove-upload",onClick:o=>{o.stopPropagation(),Ve()},children:"×"})]}):null})]})]}),r.jsxs("div",{style:{...Un,marginTop:"25px",background:"#f9f9f9"},children:[r.jsx("h4",{style:{marginBottom:"15px"},children:"Company Stamp / Seal"}),r.jsxs("div",{className:"upload-box",onClick:()=>{var o;(o=a.current)==null||o.click()},children:[r.jsx("input",{ref:a,type:"file",id:"stampUpload",accept:"image/*",style:{display:"none"},onChange:gn}),r.jsx("i",{className:"fas fa-stamp",style:{fontSize:"32px",color:"var(--muted)"}}),r.jsx("br",{}),r.jsx("small",{style:{color:"var(--muted)"},children:"Click to upload company stamp (PNG, JPG)"}),r.jsx("div",{id:"stampPreview",children:f?r.jsxs("div",{className:"upload-preview",children:[r.jsx("img",{src:f,alt:"Stamp"}),r.jsx("button",{type:"button",className:"remove-upload",onClick:o=>{o.stopPropagation(),an()},children:"×"})]}):null})]})]}),r.jsx("button",{className:"save-btn",type:"button",onClick:Qu,children:"Save Company Settings"})]}),r.jsxs("div",{id:"email",className:`section${i==="email"?" active":""}`,children:[r.jsx("h3",{children:"Email & Notification Settings"}),r.jsx("br",{}),r.jsxs("div",{className:"admin-only-banner",id:"emailAdminBanner",children:[r.jsx("i",{className:"fa fa-lock"})," ",O]}),r.jsxs("div",{style:le,children:[r.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[r.jsx("i",{className:"fa fa-server"})," SMTP Email Settings"]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"SMTP Server *"}),r.jsx("input",{id:"smtpServer",placeholder:"e.g., smtp.gmail.com",value:p.smtpServer,disabled:!n,onChange:o=>C(y,"smtpServer",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"SMTP Port *"}),r.jsx("input",{type:"number",id:"smtpPort",placeholder:"587 or 465",value:p.smtpPort,disabled:!n,onChange:o=>C(y,"smtpPort",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Email Address *"}),r.jsx("input",{type:"email",id:"smtpEmail",placeholder:"noreply@company.com",value:p.smtpEmail,disabled:!n,onChange:o=>C(y,"smtpEmail",o.target.value)})]})]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Password *"}),r.jsx("input",{type:"password",id:"smtpPassword",placeholder:"Enter SMTP password",value:p.smtpPassword,disabled:!n,onChange:o=>C(y,"smtpPassword",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Encryption"}),r.jsxs("select",{id:"smtpEncryption",value:p.smtpEncryption,disabled:!n,onChange:o=>C(y,"smtpEncryption",o.target.value),children:[r.jsx("option",{value:"tls",children:"TLS"}),r.jsx("option",{value:"ssl",children:"SSL"}),r.jsx("option",{value:"none",children:"None"})]})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Sender Name *"}),r.jsx("input",{id:"senderName",placeholder:"e.g., LedgerWorx Admin",value:p.senderName,disabled:!n,onChange:o=>C(y,"senderName",o.target.value)})]})]}),r.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},disabled:!n,onClick:Yu,children:"Save SMTP Settings"}),r.jsx("button",{className:"save-btn",type:"button",style:{marginLeft:"10px",marginTop:"10px",background:"#27ae60"},disabled:!n,onClick:Ku,children:"Test Connection"})]}),r.jsxs("div",{style:le,children:[r.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[r.jsx("i",{className:"fa fa-file-alt"})," Email Templates"]}),r.jsxs("div",{style:{marginBottom:"15px"},children:[r.jsx("label",{style:{display:"block",marginBottom:"8px"},children:r.jsx("strong",{children:"Select Template to Edit:"})}),r.jsx("select",{id:"templateSelect",style:{padding:"8px",border:"1px solid #ddd",borderRadius:"6px",width:"100%"},value:p.templateType,disabled:!n,onChange:o=>Gu(o.target.value),children:Px.map(o=>r.jsx("option",{value:o.value,children:o.label},o.value||"empty"))})]}),r.jsxs("div",{id:"templateEditor",style:{display:p.templateType?"block":"none"},children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Subject Line *"}),r.jsx("input",{type:"text",id:"templateSubject",placeholder:"Email subject",value:p.templateSubject,disabled:!n,onChange:o=>C(y,"templateSubject",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Email Body *"}),r.jsx("textarea",{id:"templateBody",placeholder:`Email body content
Use {company}, {client}, {date}, {amount}, {invoice_no} as variables`,style:Wx,value:p.templateBody,disabled:!n,onChange:o=>C(y,"templateBody",o.target.value)})]}),r.jsx("div",{style:{background:"#f0f8ff",padding:"10px",borderRadius:"6px",marginTop:"10px",borderLeft:"4px solid var(--primary)"},children:r.jsxs("small",{children:[r.jsx("strong",{children:"Available Variables:"})," ","{company}, {client}, {date}, {amount}, {invoice_no}, {payment_status}, {approval_url}"]})}),r.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},disabled:!n,onClick:Xu,children:"Save Template"})]})]}),r.jsxs("div",{style:le,children:[r.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[r.jsx("i",{className:"fa fa-envelope-open"})," Auto Email Triggers"]}),r.jsxs("div",{className:"toggle-row",children:[r.jsxs("span",{children:[r.jsx("i",{className:"fa fa-file-invoice"})," Send Email on Invoice Creation"]}),r.jsxs("label",{className:"switch",children:[r.jsx("input",{type:"checkbox",id:"emailOnInvoice",checked:p.emailOnInvoice,disabled:!n,onChange:o=>C(y,"emailOnInvoice",o.target.checked)}),r.jsx("span",{className:"slider"})]})]}),r.jsxs("div",{className:"toggle-row",style:{marginTop:"10px"},children:[r.jsxs("span",{children:[r.jsx("i",{className:"fa fa-check-circle"})," Send Email on Payment Received"]}),r.jsxs("label",{className:"switch",children:[r.jsx("input",{type:"checkbox",id:"emailOnPayment",checked:p.emailOnPayment,disabled:!n,onChange:o=>C(y,"emailOnPayment",o.target.checked)}),r.jsx("span",{className:"slider"})]})]}),r.jsxs("div",{className:"toggle-row",style:{marginTop:"10px"},children:[r.jsxs("span",{children:[r.jsx("i",{className:"fa fa-user-check"})," Send Email on Approval Request"]}),r.jsxs("label",{className:"switch",children:[r.jsx("input",{type:"checkbox",id:"emailOnApproval",checked:p.emailOnApproval,disabled:!n,onChange:o=>C(y,"emailOnApproval",o.target.checked)}),r.jsx("span",{className:"slider"})]})]}),r.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"15px"},disabled:!n,onClick:Zu,children:"Save Triggers"})]}),r.jsxs("div",{style:le,children:[r.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[r.jsx("i",{className:"fab fa-whatsapp"})," WhatsApp API Integration"]}),r.jsxs("div",{className:"toggle-row",children:[r.jsx("span",{children:"Enable WhatsApp Notifications"}),r.jsxs("label",{className:"switch",children:[r.jsx("input",{type:"checkbox",id:"whatsappToggle",checked:p.whatsappEnabled,disabled:!n,onChange:o=>Ju(o.target.checked)}),r.jsx("span",{className:"slider"})]})]}),r.jsxs("div",{id:"whatsappSettings",style:{display:p.whatsappEnabled?"block":"none",marginTop:"15px"},children:[r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"WhatsApp Business Account ID *"}),r.jsx("input",{id:"whatsappAccountId",placeholder:"e.g., 1234567890",value:p.whatsappAccountId,disabled:!n,onChange:o=>C(y,"whatsappAccountId",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"WhatsApp API Key *"}),r.jsx("input",{type:"password",id:"whatsappApiKey",placeholder:"Enter API key",value:p.whatsappApiKey,disabled:!n,onChange:o=>C(y,"whatsappApiKey",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Default Phone Number *"}),r.jsx("input",{id:"whatsappPhone",placeholder:"e.g., +971501234567",value:p.whatsappPhone,disabled:!n,onChange:o=>C(y,"whatsappPhone",o.target.value)})]})]}),r.jsxs("div",{style:{marginTop:"15px"},children:[r.jsx("h5",{style:{color:"var(--primary)"},children:"WhatsApp Message Templates"}),r.jsxs("div",{className:"toggle-row",style:{marginTop:"10px"},children:[r.jsx("span",{children:"Invoice Notifications"}),r.jsxs("label",{className:"switch",children:[r.jsx("input",{type:"checkbox",id:"waInvoice",checked:p.waInvoice,disabled:!n,onChange:o=>C(y,"waInvoice",o.target.checked)}),r.jsx("span",{className:"slider"})]})]}),r.jsxs("div",{className:"toggle-row",children:[r.jsx("span",{children:"Payment Confirmations"}),r.jsxs("label",{className:"switch",children:[r.jsx("input",{type:"checkbox",id:"waPayment",checked:p.waPayment,disabled:!n,onChange:o=>C(y,"waPayment",o.target.checked)}),r.jsx("span",{className:"slider"})]})]}),r.jsxs("div",{className:"toggle-row",children:[r.jsx("span",{children:"Approval Requests"}),r.jsxs("label",{className:"switch",children:[r.jsx("input",{type:"checkbox",id:"waApproval",checked:p.waApproval,disabled:!n,onChange:o=>C(y,"waApproval",o.target.checked)}),r.jsx("span",{className:"slider"})]})]})]}),r.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"15px"},disabled:!n,onClick:ep,children:"Save WhatsApp Settings"}),r.jsx("button",{className:"save-btn",type:"button",style:{marginLeft:"10px",marginTop:"15px",background:"#25d366"},disabled:!n,onClick:np,children:"Test Connection"})]})]}),r.jsxs("div",{style:Un,children:[r.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[r.jsx("i",{className:"fa fa-sms"})," SMS Integration"]}),r.jsx("div",{className:"form-grid",children:r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"SMS Provider"}),r.jsxs("select",{id:"smsProvider",value:p.smsProvider,disabled:!n,onChange:o=>rp(o.target.value),children:[r.jsx("option",{value:"",children:"Select Provider"}),r.jsx("option",{value:"twilio",children:"Twilio"}),r.jsx("option",{value:"nexmo",children:"Vonage (Nexmo)"}),r.jsx("option",{value:"aws",children:"AWS SNS"}),r.jsx("option",{value:"custom",children:"Custom Gateway"})]})]})}),r.jsxs("div",{id:"smsSettings",style:{display:p.smsProvider?"block":"none",marginTop:"15px"},children:[r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Account SID / API Key *"}),r.jsx("input",{id:"smsAccountId",placeholder:"Enter account ID",value:p.smsAccountId,disabled:!n,onChange:o=>C(y,"smsAccountId",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Auth Token / Secret Key *"}),r.jsx("input",{type:"password",id:"smsAuthToken",placeholder:"Enter authentication token",value:p.smsAuthToken,disabled:!n,onChange:o=>C(y,"smsAuthToken",o.target.value)})]}),r.jsxs("div",{className:"field",id:"smsPhoneField",style:{display:p.smsProvider==="twilio"?"block":"none"},children:[r.jsx("label",{children:"Sender Phone Number *"}),r.jsx("input",{id:"smsSenderPhone",placeholder:"e.g., +971501234567",value:p.smsSenderPhone,disabled:!n,onChange:o=>C(y,"smsSenderPhone",o.target.value)})]})]}),r.jsxs("div",{style:{marginTop:"15px"},children:[r.jsx("h5",{style:{color:"var(--primary)"},children:"SMS Message Templates"}),r.jsxs("div",{className:"toggle-row",children:[r.jsx("span",{children:"Invoice Created"}),r.jsxs("label",{className:"switch",children:[r.jsx("input",{type:"checkbox",id:"smsInvoice",checked:p.smsInvoice,disabled:!n,onChange:o=>C(y,"smsInvoice",o.target.checked)}),r.jsx("span",{className:"slider"})]})]}),r.jsxs("div",{className:"toggle-row",children:[r.jsx("span",{children:"Payment Confirmation"}),r.jsxs("label",{className:"switch",children:[r.jsx("input",{type:"checkbox",id:"smsPayment",checked:p.smsPayment,disabled:!n,onChange:o=>C(y,"smsPayment",o.target.checked)}),r.jsx("span",{className:"slider"})]})]}),r.jsxs("div",{className:"toggle-row",children:[r.jsx("span",{children:"Approval Requests"}),r.jsxs("label",{className:"switch",children:[r.jsx("input",{type:"checkbox",id:"smsApproval",checked:p.smsApproval,disabled:!n,onChange:o=>C(y,"smsApproval",o.target.checked)}),r.jsx("span",{className:"slider"})]})]})]}),r.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"15px"},disabled:!n,onClick:tp,children:"Save SMS Settings"}),r.jsx("button",{className:"save-btn",type:"button",style:{marginLeft:"10px",marginTop:"15px",background:"#FF6600"},disabled:!n,onClick:ap,children:"Test SMS"})]})]})]}),r.jsxs("div",{id:"security",className:`section${i==="security"?" active":""}`,children:[r.jsx("h3",{children:"Security Settings"}),r.jsx("br",{}),r.jsxs("div",{style:le,children:[r.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[r.jsx("i",{className:"fa fa-key"})," Change Password"]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Current Password *"}),r.jsx("input",{type:"password",id:"currentPassword",placeholder:"Enter current password",value:N.currentPassword,onChange:o=>C(S,"currentPassword",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"New Password *"}),r.jsx("input",{type:"password",id:"newPassword",placeholder:"Enter new password (min 8 chars)",value:N.newPassword,onChange:o=>C(S,"newPassword",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Confirm Password *"}),r.jsx("input",{type:"password",id:"confirmPassword",placeholder:"Confirm new password",value:N.confirmPassword,onChange:o=>C(S,"confirmPassword",o.target.value)})]})]}),r.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},onClick:ip,children:"Update Password"})]}),r.jsxs("div",{style:le,children:[r.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[r.jsx("i",{className:"fa fa-mobile-alt"})," Two-Factor Authentication"]}),r.jsxs("div",{className:"toggle-row",children:[r.jsx("span",{children:"Enable 2FA (SMS or Authenticator App)"}),r.jsxs("label",{className:"switch",children:[r.jsx("input",{type:"checkbox",id:"twoFactorToggle",checked:N.twoFactorEnabled,onChange:o=>C(S,"twoFactorEnabled",o.target.checked)}),r.jsx("span",{className:"slider"})]})]}),r.jsxs("div",{id:"twoFactorOptions",style:{display:N.twoFactorEnabled?"block":"none",marginTop:"15px"},children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Authentication Method *"}),r.jsxs("select",{id:"authMethod",value:N.authMethod,onChange:o=>C(S,"authMethod",o.target.value),children:[r.jsx("option",{value:"",children:"Select method"}),r.jsx("option",{value:"sms",children:"SMS Code"}),r.jsx("option",{value:"authenticator",children:"Authenticator App"}),r.jsx("option",{value:"both",children:"Both (SMS + App)"})]})]}),r.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},onClick:sp,children:"Set Up 2FA"})]})]}),r.jsxs("div",{style:le,children:[r.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[r.jsx("i",{className:"fa fa-ban"})," Login Attempt Limit"]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Max Failed Login Attempts"}),r.jsx("input",{type:"number",id:"maxAttempts",min:"1",max:"20",value:N.maxAttempts,onChange:o=>C(S,"maxAttempts",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Lockout Duration (minutes)"}),r.jsx("input",{type:"number",id:"lockoutDuration",min:"5",max:"120",value:N.lockoutDuration,onChange:o=>C(S,"lockoutDuration",o.target.value)})]})]}),r.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},onClick:lp,children:"Save Settings"})]}),r.jsxs("div",{style:le,children:[r.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[r.jsx("i",{className:"fa fa-hourglass-end"})," Session Timeout"]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Session Timeout (minutes)"}),r.jsx("input",{type:"number",id:"sessionTimeout",min:"5",max:"480",value:N.sessionTimeout,onChange:o=>C(S,"sessionTimeout",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Inactivity Warning (minutes)"}),r.jsx("input",{type:"number",id:"inactivityWarning",min:"1",max:"60",value:N.inactivityWarning,onChange:o=>C(S,"inactivityWarning",o.target.value)})]})]}),r.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},onClick:op,children:"Save Settings"})]}),r.jsxs("div",{style:le,children:[r.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[r.jsx("i",{className:"fa fa-network-wired"})," Restrict IP Address"]}),r.jsxs("div",{className:"toggle-row",children:[r.jsx("span",{children:"Enable IP Whitelisting"}),r.jsxs("label",{className:"switch",children:[r.jsx("input",{type:"checkbox",id:"ipWhitelistToggle",checked:N.ipWhitelistEnabled,onChange:o=>C(S,"ipWhitelistEnabled",o.target.checked)}),r.jsx("span",{className:"slider"})]})]}),r.jsxs("div",{id:"ipWhitelistBox",style:{display:N.ipWhitelistEnabled?"block":"none",marginTop:"15px"},children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Authorized IP Addresses (one per line)"}),r.jsx("textarea",{id:"ipAddresses",placeholder:`e.g., 192.168.1.1
10.0.0.5
203.0.113.42`,style:Vx,value:N.ipAddresses,onChange:o=>C(S,"ipAddresses",o.target.value)})]}),r.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},onClick:dp,children:"Save IP List"})]})]}),r.jsxs("div",{className:"log-panel",children:[r.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[r.jsx("i",{className:"fa fa-history"})," Login History"]}),r.jsx("div",{className:"log-table-wrap",children:r.jsxs("table",{className:"users-table",style:{fontSize:"13px"},children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"Date & Time"}),r.jsx("th",{children:"IP Address"}),r.jsx("th",{children:"Browser/Device"}),r.jsx("th",{children:"Status"})]})}),r.jsx("tbody",{id:"loginHistoryBody",children:Tx.map(o=>r.jsxs("tr",{children:[r.jsx("td",{children:o.dateTime}),r.jsx("td",{children:o.ipAddress}),r.jsx("td",{children:o.browser}),r.jsx("td",{children:r.jsx("span",{style:{color:o.color},children:o.status})})]},`${o.dateTime}-${o.ipAddress}-${o.browser}`))})]})})]}),r.jsxs("div",{className:"log-panel",children:[r.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[r.jsx("i",{className:"fa fa-clipboard-list"})," System Activity Logs"]}),r.jsx("div",{className:"log-table-wrap",children:r.jsxs("table",{className:"users-table",style:{fontSize:"13px"},children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"Date & Time"}),r.jsx("th",{children:"User"}),r.jsx("th",{children:"Action"}),r.jsx("th",{children:"Affected Resource"}),r.jsx("th",{children:"Status"})]})}),r.jsx("tbody",{id:"activityLogsBody",children:Dx.map(o=>r.jsxs("tr",{children:[r.jsx("td",{children:o.dateTime}),r.jsx("td",{children:o.user}),r.jsx("td",{children:o.action}),r.jsx("td",{children:o.resource}),r.jsx("td",{children:r.jsx("span",{style:{color:o.color},children:o.status})})]},`${o.dateTime}-${o.user}-${o.action}`))})]})})]})]}),r.jsxs("div",{id:"users",className:`section${i==="users"?" active":""}`,children:[r.jsxs("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"},children:[r.jsx("h3",{children:"User Management"}),n?r.jsx("button",{id:"btnAddUser",className:"save-btn",type:"button",style:{marginTop:0},onClick:_u,children:"+ Add New User"}):null]}),r.jsx("div",{className:"users-table-wrap",children:r.jsxs("table",{className:"users-table",children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"Name"}),r.jsx("th",{children:"Email"}),r.jsx("th",{children:"Role"}),r.jsx("th",{children:"Status"}),r.jsx("th",{children:"Last Login"}),r.jsx("th",{children:"Actions"})]})}),r.jsx("tbody",{id:"usersTableBody",children:b.map(o=>r.jsxs("tr",{children:[r.jsx("td",{children:r.jsxs("div",{className:"user-info",children:[r.jsx("div",{className:"user-avatar",children:Kx(o.name)}),r.jsx("span",{children:o.name})]})}),r.jsx("td",{children:o.email}),r.jsx("td",{children:r.jsx("span",{className:`role-badge role-${o.role.toLowerCase().replace(/\s+/g,"")}`,children:o.role})}),r.jsx("td",{children:r.jsx("span",{className:o.status==="Active"?"status-active":"status-inactive",children:o.status})}),r.jsx("td",{children:o.lastLogin}),r.jsx("td",{children:r.jsxs("div",{className:"action-buttons",children:[r.jsx("button",{className:"btn-action btn-edit",type:"button",onClick:()=>Ou(o.id),children:"Edit"}),r.jsx("button",{className:"btn-action btn-status",type:"button",onClick:()=>$u(o.id),children:o.status==="Active"?"Deactivate":"Activate"}),r.jsx("button",{className:"btn-action btn-reset",type:"button",onClick:()=>Vu(o.id),children:"Reset Password"}),r.jsx("button",{className:"btn-action btn-logout",type:"button",onClick:()=>Wu(o.id),children:"Logout"}),r.jsx("button",{className:"btn-action btn-delete",type:"button",onClick:()=>Uu(o.id),children:"Delete"})]})})]},o.id))})]})})]}),r.jsxs("div",{id:"roles",className:`section${i==="roles"?" active":""}`,children:[r.jsx("h3",{children:"Roles & Permissions"}),r.jsx("br",{}),r.jsxs("div",{className:"permissions-container",children:[r.jsx("h4",{style:{marginBottom:"20px",color:"var(--primary)"},children:"Module Access Control"}),Sx.map(o=>r.jsxs("div",{className:"permission-card",children:[r.jsxs("div",{className:"permission-card-header",children:[r.jsxs("h4",{children:[r.jsx("i",{className:o.iconClass})," ",o.title]}),r.jsx("span",{className:`permission-badge ${o.badgeClass}`,children:o.badgeLabel})]}),r.jsx("div",{className:"permission-grid",children:o.permissions.map(L=>r.jsxs("div",{className:"permission-checkbox",children:[r.jsx("input",{type:"checkbox",id:L.id,checked:z[o.key][L.key],onChange:B=>qu(o.key,L.key,B.target.checked)}),r.jsx("label",{htmlFor:L.id,children:L.label})]},L.id))})]},o.key))]}),r.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"20px"},onClick:Hu,children:"Save Permissions"})]}),r.jsxs("div",{id:"financial",className:`section${i==="financial"?" active":""}`,children:[r.jsx("h3",{children:"Financial Settings"}),r.jsx("br",{}),r.jsxs("div",{style:le,children:[r.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[r.jsx("i",{className:"fa fa-percent"})," VAT Settings"]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"VAT Percentage *"}),r.jsx("input",{type:"number",id:"vatPercent",min:"0",max:"100",step:"0.01",placeholder:"e.g., 5",value:w.vatPercent,onChange:o=>C(I,"vatPercent",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"VAT Registration Number"}),r.jsx("input",{id:"vatRegNumber",placeholder:"e.g., 100123456700003",value:w.vatRegNumber,onChange:o=>C(I,"vatRegNumber",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Apply VAT to"}),r.jsxs("select",{id:"vatApplyTo",value:w.vatApplyTo,onChange:o=>C(I,"vatApplyTo",o.target.value),children:[r.jsx("option",{value:"all",children:"All Transactions"}),r.jsx("option",{value:"domestic",children:"Domestic Only"}),r.jsx("option",{value:"manual",children:"Manual Selection"})]})]})]}),r.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},onClick:cp,children:"Save VAT Settings"})]}),r.jsxs("div",{style:le,children:[r.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[r.jsx("i",{className:"fa fa-receipt"})," Invoice Number Format"]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Invoice Format Prefix *"}),r.jsx("input",{id:"invoicePrefix",placeholder:"e.g., INV",value:w.invoicePrefix,onChange:o=>C(I,"invoicePrefix",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Invoice Format Year *"}),r.jsxs("select",{id:"invoiceYearFormat",value:w.invoiceYearFormat,onChange:o=>C(I,"invoiceYearFormat",o.target.value),children:[r.jsx("option",{value:"full",children:"Full Year (2026)"}),r.jsx("option",{value:"short",children:"Short Year (26)"})]})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Number of Digits *"}),r.jsxs("select",{id:"invoiceDigits",value:w.invoiceDigits,onChange:o=>C(I,"invoiceDigits",o.target.value),children:[r.jsx("option",{value:"3",children:"3 digits (001)"}),r.jsx("option",{value:"4",children:"4 digits (0001)"}),r.jsx("option",{value:"5",children:"5 digits (00001)"}),r.jsx("option",{value:"6",children:"6 digits (000001)"})]})]})]}),r.jsx("div",{style:Li,children:r.jsxs("small",{children:[r.jsx("strong",{children:"Preview:"})," ",r.jsx("span",{id:"invoicePreview",children:F})]})}),r.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},onClick:up,children:"Save Invoice Format"})]}),r.jsxs("div",{style:le,children:[r.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[r.jsx("i",{className:"fa fa-file-contract"})," Quotation Format"]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Quotation Prefix *"}),r.jsx("input",{id:"quotationPrefix",placeholder:"e.g., QT",value:w.quotationPrefix,onChange:o=>C(I,"quotationPrefix",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Quotation Validity (Days) *"}),r.jsx("input",{type:"number",id:"quotationValidity",min:"1",max:"365",value:w.quotationValidity,onChange:o=>C(I,"quotationValidity",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Include Terms & Conditions"}),r.jsxs("select",{id:"quotationTerms",value:w.quotationTerms,onChange:o=>C(I,"quotationTerms",o.target.value),children:[r.jsx("option",{value:"yes",children:"Yes"}),r.jsx("option",{value:"no",children:"No"})]})]})]}),r.jsx("div",{style:Li,children:r.jsxs("small",{children:[r.jsx("strong",{children:"Preview:"})," ",r.jsx("span",{id:"quotationPreview",children:_})]})}),r.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},onClick:pp,children:"Save Quotation Format"})]}),r.jsxs("div",{style:le,children:[r.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[r.jsx("i",{className:"fa fa-handshake"})," Payment Terms"]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Default Payment Terms *"}),r.jsxs("select",{id:"defaultPaymentTerms",value:w.defaultPaymentTerms,onChange:o=>C(I,"defaultPaymentTerms",o.target.value),children:[r.jsx("option",{value:"cod",children:"Cash on Delivery"}),r.jsx("option",{value:"net15",children:"Net 15 Days"}),r.jsx("option",{value:"net30",children:"Net 30 Days"}),r.jsx("option",{value:"net45",children:"Net 45 Days"}),r.jsx("option",{value:"net60",children:"Net 60 Days"}),r.jsx("option",{value:"custom",children:"Custom"})]})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Early Payment Discount % *"}),r.jsx("input",{type:"number",id:"earlyPaymentDiscount",min:"0",max:"50",step:"0.01",placeholder:"e.g., 2",value:w.earlyPaymentDiscount,onChange:o=>C(I,"earlyPaymentDiscount",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Late Payment Penalty % *"}),r.jsx("input",{type:"number",id:"latePaymentPenalty",min:"0",max:"50",step:"0.01",placeholder:"e.g., 2",value:w.latePaymentPenalty,onChange:o=>C(I,"latePaymentPenalty",o.target.value)})]})]}),r.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},onClick:mp,children:"Save Payment Terms"})]}),r.jsxs("div",{style:le,children:[r.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[r.jsx("i",{className:"fa fa-university"})," Default Bank Details"]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Bank Name *"}),r.jsx("input",{id:"bankName",placeholder:"e.g., Emirates NBD",value:w.bankName,onChange:o=>C(I,"bankName",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Account Holder Name *"}),r.jsx("input",{id:"accountHolderName",placeholder:"Company name",value:w.accountHolderName,onChange:o=>C(I,"accountHolderName",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Account Number *"}),r.jsx("input",{id:"accountNumber",placeholder:"e.g., 12345678901234",value:w.accountNumber,onChange:o=>C(I,"accountNumber",o.target.value)})]})]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"IBAN *"}),r.jsx("input",{id:"iban",placeholder:"e.g., AE070331234567890123456",value:w.iban,onChange:o=>C(I,"iban",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"SWIFT Code"}),r.jsx("input",{id:"swiftCode",placeholder:"e.g., NBADAEAD",value:w.swiftCode,onChange:o=>C(I,"swiftCode",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Branch Code"}),r.jsx("input",{id:"branchCode",placeholder:"e.g., 123",value:w.branchCode,onChange:o=>C(I,"branchCode",o.target.value)})]})]}),r.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},onClick:fp,children:"Save Bank Details"})]}),r.jsxs("div",{style:le,children:[r.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[r.jsx("i",{className:"fa fa-globe"})," Multi-Currency Options"]}),r.jsxs("div",{className:"toggle-row",children:[r.jsx("span",{children:"Enable Multi-Currency Support"}),r.jsxs("label",{className:"switch",children:[r.jsx("input",{type:"checkbox",id:"multiCurrencyToggle",checked:w.multiCurrencyEnabled,onChange:o=>C(I,"multiCurrencyEnabled",o.target.checked)}),r.jsx("span",{className:"slider"})]})]}),r.jsxs("div",{id:"currencyOptions",style:{display:w.multiCurrencyEnabled?"block":"none",marginTop:"15px"},children:[r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Base/Home Currency *"}),r.jsx("select",{id:"baseCurrency",value:w.baseCurrency,onChange:o=>C(I,"baseCurrency",o.target.value),children:id.slice(0,6).map(o=>r.jsx("option",{value:o,children:o},o))})]}),r.jsx("div",{className:"field",children:r.jsx("label",{children:"Supported Currencies (select multiple)"})})]}),r.jsx("div",{style:$x,children:id.map(o=>r.jsxs("label",{children:[r.jsx("input",{type:"checkbox",value:o,className:"currencyCheckbox",checked:w.supportedCurrencies.includes(o),onChange:L=>hp(o,L.target.checked)})," ",o]},o))}),r.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"15px"},onClick:gp,children:"Save Currency Options"})]})]}),r.jsxs("div",{style:Un,children:[r.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[r.jsx("i",{className:"fa fa-calculator"})," Additional Tax Settings"]}),r.jsxs("div",{className:"toggle-row",children:[r.jsx("span",{children:"Include Tax in Prices"}),r.jsxs("label",{className:"switch",children:[r.jsx("input",{type:"checkbox",id:"taxInPrice",checked:w.taxInPrice,onChange:o=>C(I,"taxInPrice",o.target.checked)}),r.jsx("span",{className:"slider"})]})]}),r.jsxs("div",{className:"toggle-row",style:{marginTop:"15px"},children:[r.jsx("span",{children:"Apply Tax to Discounts"}),r.jsxs("label",{className:"switch",children:[r.jsx("input",{type:"checkbox",id:"taxOnDiscounts",checked:w.taxOnDiscounts,onChange:o=>C(I,"taxOnDiscounts",o.target.checked)}),r.jsx("span",{className:"slider"})]})]}),r.jsxs("div",{className:"form-grid",style:{marginTop:"15px"},children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Tax Registration Number"}),r.jsx("input",{id:"taxRegNumber",placeholder:"e.g., 12345678901234",value:w.taxRegNumber,onChange:o=>C(I,"taxRegNumber",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Tax Name (Label)"}),r.jsx("input",{id:"taxLabel",placeholder:"e.g., VAT, GST, TAX",value:w.taxLabel,onChange:o=>C(I,"taxLabel",o.target.value)})]})]}),r.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},onClick:xp,children:"Save Tax Settings"})]})]}),r.jsxs("div",{id:"workflow",className:`section${i==="workflow"?" active":""}`,children:[r.jsx("h3",{children:"Workflow & Approval Settings"}),r.jsx("br",{}),r.jsxs("div",{style:le,children:[r.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[r.jsx("i",{className:"fa fa-sitemap"})," Approval Hierarchy"]}),r.jsx("p",{style:{fontSize:"13px",color:"var(--muted)",marginBottom:"15px"},children:"Define the approval chain for different transaction amounts"}),r.jsxs("div",{style:{marginBottom:"15px"},children:[r.jsx("h5",{style:{color:"var(--primary)",marginBottom:"10px"},children:"Level 1 (0 - 10,000 AED)"}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Approver *"}),r.jsxs("select",{id:"level1Approver",value:R.level1Approver,onChange:o=>C(V,"level1Approver",o.target.value),children:[r.jsx("option",{value:"",children:"Select user"}),r.jsx("option",{value:"1",children:"System Admin"}),r.jsx("option",{value:"2",children:"Rahul Sharma"}),r.jsx("option",{value:"3",children:"Priya Agarwal"})]})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Require Approval"}),r.jsxs("select",{id:"level1Required",value:R.level1Required,onChange:o=>C(V,"level1Required",o.target.value),children:[r.jsx("option",{value:"yes",children:"Yes"}),r.jsx("option",{value:"no",children:"No"})]})]})]})]}),r.jsxs("div",{style:{marginBottom:"15px"},children:[r.jsx("h5",{style:{color:"var(--primary)",marginBottom:"10px"},children:"Level 2 (10,001 - 50,000 AED)"}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Approver *"}),r.jsxs("select",{id:"level2Approver",value:R.level2Approver,onChange:o=>C(V,"level2Approver",o.target.value),children:[r.jsx("option",{value:"",children:"Select user"}),r.jsx("option",{value:"1",children:"System Admin"}),r.jsx("option",{value:"3",children:"Priya Agarwal"}),r.jsx("option",{value:"4",children:"Rohit Verma"})]})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Require Approval"}),r.jsxs("select",{id:"level2Required",value:R.level2Required,onChange:o=>C(V,"level2Required",o.target.value),children:[r.jsx("option",{value:"yes",children:"Yes"}),r.jsx("option",{value:"no",children:"No"})]})]})]})]}),r.jsxs("div",{style:{marginBottom:"15px"},children:[r.jsx("h5",{style:{color:"var(--primary)",marginBottom:"10px"},children:"Level 3 (50,001+ AED)"}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Approver *"}),r.jsxs("select",{id:"level3Approver",value:R.level3Approver,onChange:o=>C(V,"level3Approver",o.target.value),children:[r.jsx("option",{value:"",children:"Select user"}),r.jsx("option",{value:"1",children:"System Admin"})]})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Require Approval"}),r.jsxs("select",{id:"level3Required",value:R.level3Required,onChange:o=>C(V,"level3Required",o.target.value),children:[r.jsx("option",{value:"yes",children:"Yes"}),r.jsx("option",{value:"no",children:"No"})]})]})]})]}),r.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},onClick:vp,children:"Save Hierarchy"})]}),r.jsxs("div",{style:le,children:[r.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[r.jsx("i",{className:"fa fa-user-tie"})," Default Salesperson Assignment"]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Default Salesperson *"}),r.jsxs("select",{id:"defaultSalesperson",value:R.defaultSalesperson,onChange:o=>C(V,"defaultSalesperson",o.target.value),children:[r.jsx("option",{value:"",children:"Select salesperson"}),r.jsx("option",{value:"2",children:"Rahul Sharma"}),r.jsx("option",{value:"5",children:"Sales Team Lead"}),r.jsx("option",{value:"6",children:"Vikram Singh"})]})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Auto-Assign to New Clients"}),r.jsxs("select",{id:"autoAssignToggle",value:R.autoAssignToggle,onChange:o=>C(V,"autoAssignToggle",o.target.value),children:[r.jsx("option",{value:"yes",children:"Yes"}),r.jsx("option",{value:"no",children:"No"})]})]})]}),r.jsx("p",{style:{fontSize:"13px",color:"var(--muted)",marginTop:"10px"},children:"If enabled, all new clients will be automatically assigned to the selected salesperson"}),r.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},onClick:yp,children:"Save Assignment"})]}),r.jsxs("div",{style:le,children:[r.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[r.jsx("i",{className:"fa fa-list"})," Status Types Configuration"]}),r.jsx("p",{style:{fontSize:"13px",color:"var(--muted)",marginBottom:"15px"},children:"Manage request and approval status types"}),r.jsx("div",{style:Ox,children:Lx.map(o=>r.jsx("div",{style:Bx,children:r.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[r.jsxs("div",{children:[r.jsx("strong",{style:{color:o.color},children:o.title}),r.jsx("br",{}),r.jsx("small",{style:{color:"var(--muted)"},children:o.description})]}),r.jsx("span",{style:{background:o.color,color:"#fff",padding:"4px 8px",borderRadius:"4px",fontSize:"11px"},children:o.statusLabel})]})},o.title))}),r.jsxs("div",{style:Li,children:[r.jsxs("small",{children:[r.jsx("strong",{children:"Status Order:"})," Pending → Approved/Rejected/On Hold"]}),r.jsx("br",{}),r.jsx("small",{style:{color:"var(--muted)"},children:"Note: Default statuses cannot be deleted but can be customized"})]}),r.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"10px"},onClick:bp,children:"+ Add Custom Status"})]}),r.jsxs("div",{style:le,children:[r.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[r.jsx("i",{className:"fa fa-envelope-circle-check"})," Auto Email Notification"]}),r.jsxs("div",{className:"toggle-row",children:[r.jsx("span",{children:"Send Email When Request is Approved"}),r.jsxs("label",{className:"switch",children:[r.jsx("input",{type:"checkbox",id:"emailOnApproved",checked:R.emailOnApproved,onChange:o=>C(V,"emailOnApproved",o.target.checked)}),r.jsx("span",{className:"slider"})]})]}),r.jsxs("div",{className:"toggle-row",style:{marginTop:"10px"},children:[r.jsx("span",{children:"Send Email When Request is Rejected"}),r.jsxs("label",{className:"switch",children:[r.jsx("input",{type:"checkbox",id:"emailOnRejected",checked:R.emailOnRejected,onChange:o=>C(V,"emailOnRejected",o.target.checked)}),r.jsx("span",{className:"slider"})]})]}),r.jsxs("div",{className:"toggle-row",style:{marginTop:"10px"},children:[r.jsx("span",{children:"Send Email When Placed On Hold"}),r.jsxs("label",{className:"switch",children:[r.jsx("input",{type:"checkbox",id:"emailOnHold",checked:R.emailOnHold,onChange:o=>C(V,"emailOnHold",o.target.checked)}),r.jsx("span",{className:"slider"})]})]}),r.jsxs("div",{className:"toggle-row",style:{marginTop:"10px"},children:[r.jsx("span",{children:"Send Email When Status Changes"}),r.jsxs("label",{className:"switch",children:[r.jsx("input",{type:"checkbox",id:"emailOnStatusChange",checked:R.emailOnStatusChange,onChange:o=>C(V,"emailOnStatusChange",o.target.checked)}),r.jsx("span",{className:"slider"})]})]}),r.jsxs("div",{style:{marginTop:"15px"},children:[r.jsx("label",{style:{display:"block",marginBottom:"8px"},children:r.jsx("strong",{children:"Email Recipients:"})}),r.jsxs("div",{style:Ux,children:[r.jsxs("label",{children:[r.jsx("input",{type:"checkbox",id:"emailRecipientRequester",checked:R.emailRecipientRequester,onChange:o=>C(V,"emailRecipientRequester",o.target.checked)})," Request Creator"]}),r.jsxs("label",{children:[r.jsx("input",{type:"checkbox",id:"emailRecipientApprover",checked:R.emailRecipientApprover,onChange:o=>C(V,"emailRecipientApprover",o.target.checked)})," Approver"]}),r.jsxs("label",{children:[r.jsx("input",{type:"checkbox",id:"emailRecipientManager",checked:R.emailRecipientManager,onChange:o=>C(V,"emailRecipientManager",o.target.checked)})," Manager"]}),r.jsxs("label",{children:[r.jsx("input",{type:"checkbox",id:"emailRecipientAdmin",checked:R.emailRecipientAdmin,onChange:o=>C(V,"emailRecipientAdmin",o.target.checked)})," Admin"]})]})]}),r.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"15px"},onClick:jp,children:"Save Email Settings"})]}),r.jsxs("div",{style:Un,children:[r.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"15px"},children:[r.jsx("i",{className:"fa fa-arrow-up"})," Escalation Rules"]}),r.jsx("p",{style:{fontSize:"13px",color:"var(--muted)",marginBottom:"15px"},children:"Automatically escalate pending approvals if not reviewed within specified time"}),r.jsxs("div",{className:"toggle-row",children:[r.jsx("span",{children:"Enable Automatic Escalation"}),r.jsxs("label",{className:"switch",children:[r.jsx("input",{type:"checkbox",id:"escalationToggle",checked:R.escalationToggle,onChange:o=>C(V,"escalationToggle",o.target.checked)}),r.jsx("span",{className:"slider"})]})]}),r.jsxs("div",{id:"escalationRules",style:{display:R.escalationToggle?"block":"none",marginTop:"15px"},children:[r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Escalate After (Hours) *"}),r.jsx("input",{type:"number",id:"escalateAfterHours",min:"1",max:"168",value:R.escalateAfterHours,onChange:o=>C(V,"escalateAfterHours",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Escalate To Level *"}),r.jsxs("select",{id:"escalateToLevel",value:R.escalateToLevel,onChange:o=>C(V,"escalateToLevel",o.target.value),children:[r.jsx("option",{value:"next",children:"Next Approver in Hierarchy"}),r.jsx("option",{value:"manager",children:"Department Manager"}),r.jsx("option",{value:"ceo",children:"CEO/Admin"})]})]})]}),r.jsxs("div",{style:{marginTop:"15px"},children:[r.jsx("h5",{style:{color:"var(--primary)"},children:"Escalation Notification"}),r.jsxs("div",{className:"toggle-row",style:{marginTop:"10px"},children:[r.jsx("span",{children:"Send Reminder Email to Current Approver"}),r.jsxs("label",{className:"switch",children:[r.jsx("input",{type:"checkbox",id:"escalationEmailCurrentApprover",checked:R.escalationEmailCurrentApprover,onChange:o=>C(V,"escalationEmailCurrentApprover",o.target.checked)}),r.jsx("span",{className:"slider"})]})]}),r.jsxs("div",{className:"toggle-row",children:[r.jsx("span",{children:"Send Notification to Escalated Approver"}),r.jsxs("label",{className:"switch",children:[r.jsx("input",{type:"checkbox",id:"escalationEmailNextApprover",checked:R.escalationEmailNextApprover,onChange:o=>C(V,"escalationEmailNextApprover",o.target.checked)}),r.jsx("span",{className:"slider"})]})]}),r.jsxs("div",{className:"toggle-row",children:[r.jsx("span",{children:"Include in Admin Alert"}),r.jsxs("label",{className:"switch",children:[r.jsx("input",{type:"checkbox",id:"escalationAdminAlert",checked:R.escalationAdminAlert,onChange:o=>C(V,"escalationAdminAlert",o.target.checked)}),r.jsx("span",{className:"slider"})]})]})]}),r.jsx("div",{style:_x,children:r.jsxs("small",{children:[r.jsx("strong",{children:"Example:"})," If an approval is pending for 24 hours, it will be escalated to the next approver in the hierarchy"]})}),r.jsx("button",{className:"save-btn",type:"button",style:{marginTop:"15px"},onClick:wp,children:"Save Escalation Rules"})]})]})]}),r.jsxs("div",{id:"system",className:`section${i==="system"?" active":""}`,children:[r.jsx("h3",{children:"Backup & System Settings"}),r.jsx("br",{}),r.jsxs("div",{className:"admin-only-banner",children:[r.jsx("i",{className:"fa fa-lock"})," ",H]}),r.jsxs("div",{style:Un,children:[r.jsxs("h4",{style:{color:"var(--primary)",marginBottom:"10px"},children:[r.jsx("i",{className:"fa fa-server"})," Backup & System Controls"]}),r.jsx("p",{style:{fontSize:"13px",color:"var(--muted)",marginBottom:"15px"},children:"Manage database backups, maintenance mode, and system housekeeping."}),r.jsxs("div",{className:"system-action-grid",children:[r.jsxs("div",{className:"system-action-card",children:[r.jsxs("h5",{children:[r.jsx("i",{className:"fa fa-database"})," Manual Database Backup"]}),r.jsx("small",{children:"Create a new backup snapshot now."}),r.jsx("button",{className:"save-btn tile-action",id:"btnManualBackup",type:"button",disabled:!n,onClick:kp,children:"Run Backup Now"}),r.jsxs("div",{className:"backup-status",id:"manualBackupStatus",children:["Last backup: ",Q?Q.generatedAt:"Not available"]})]}),r.jsxs("div",{className:"system-action-card",children:[r.jsxs("h5",{children:[r.jsx("i",{className:"fa fa-clock"})," Auto Backup Schedule"]}),r.jsx("small",{children:"Configure automated backup frequency and time."}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Frequency *"}),r.jsxs("select",{id:"backupFrequency",value:U.backupFrequency,disabled:!n,onChange:o=>C(A,"backupFrequency",o.target.value),children:[r.jsx("option",{value:"daily",children:"Daily"}),r.jsx("option",{value:"weekly",children:"Weekly"}),r.jsx("option",{value:"monthly",children:"Monthly"})]})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Backup Time *"}),r.jsx("input",{type:"time",id:"backupTime",value:U.backupTime,disabled:!n,onChange:o=>C(A,"backupTime",o.target.value)})]})]}),r.jsx("button",{className:"save-btn tile-action",id:"btnSaveBackupSchedule",type:"button",disabled:!n,onClick:Np,children:"Save Schedule"})]}),r.jsxs("div",{className:"system-action-card",children:[r.jsxs("h5",{children:[r.jsx("i",{className:"fa fa-download"})," Download Backup"]}),r.jsx("small",{children:"Download the latest generated backup file."}),r.jsx("button",{className:"save-btn tile-action",id:"btnDownloadBackup",type:"button",style:{background:"#27ae60"},disabled:!n,onClick:Sp,children:"Download Latest Backup"}),r.jsxs("div",{className:"system-info-row",id:"latestBackupFile",children:["File: ",Q?Q.fileName:"Not generated yet"]})]}),r.jsxs("div",{className:"system-action-card",children:[r.jsxs("h5",{children:[r.jsx("i",{className:"fa fa-tools"})," Maintenance Mode"]}),r.jsx("small",{children:"Temporarily restrict app access for maintenance."}),r.jsxs("div",{className:"toggle-row",style:{marginTop:0},children:[r.jsx("span",{children:"Enable Maintenance Mode"}),r.jsxs("label",{className:"switch",children:[r.jsx("input",{type:"checkbox",id:"maintenanceModeToggle",checked:U.maintenanceModeToggle,disabled:!n,onChange:o=>Cp(o.target.checked)}),r.jsx("span",{className:"slider"})]})]})]}),r.jsxs("div",{className:"system-action-card",children:[r.jsxs("h5",{children:[r.jsx("i",{className:"fa fa-broom"})," Clear Cache"]}),r.jsx("small",{children:"Clear cached templates, session cache, and temp files."}),r.jsx("button",{className:"save-btn tile-action",id:"btnClearCache",type:"button",style:{background:"#e67e22"},disabled:!n,onClick:Pp,children:"Clear Cache"})]}),r.jsxs("div",{className:"system-action-card",children:[r.jsxs("h5",{children:[r.jsx("i",{className:"fa fa-code-branch"})," System Version"]}),r.jsx("small",{children:"Current deployed application version."}),r.jsx("div",{style:{fontSize:"18px",fontWeight:700,color:"var(--text)"},id:"systemVersionLabel",children:U.systemVersionLabel}),r.jsxs("div",{className:"system-info-row",children:["Build date: ",U.buildDate]})]})]})]})]}),r.jsx("div",{id:"userModal",className:`modal${m?" show":""}`,onClick:o=>{o.target===o.currentTarget&&At()},children:r.jsxs("div",{className:"modal-content",children:[r.jsxs("div",{className:"modal-header",children:[r.jsx("h3",{id:"userModalTitle",children:P?"Edit User":"Add New User"}),r.jsx("button",{className:"modal-close",type:"button",onClick:At,children:"×"})]}),r.jsxs("div",{className:"modal-body",children:[r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Full Name *"}),r.jsx("input",{type:"text",id:"modalFullName",placeholder:"Enter full name",value:j.fullName,onChange:o=>C(T,"fullName",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Email *"}),r.jsx("input",{type:"email",id:"modalEmail",placeholder:"Enter email address",value:j.email,onChange:o=>C(T,"email",o.target.value)})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Role *"}),r.jsx("select",{id:"modalRole",value:j.role,onChange:o=>C(T,"role",o.target.value),children:Nx.map(o=>r.jsx("option",{value:o.value,children:o.label},o.label))})]}),r.jsxs("div",{className:"field",children:[r.jsx("label",{children:"Status *"}),r.jsxs("select",{id:"modalStatus",value:j.status,onChange:o=>C(T,"status",o.target.value),children:[r.jsx("option",{value:"Active",children:"Active"}),r.jsx("option",{value:"Inactive",children:"Inactive"})]})]})]}),r.jsxs("div",{className:"modal-footer",children:[r.jsx("button",{className:"btn-secondary",type:"button",onClick:At,children:"Cancel"}),r.jsx("button",{className:"btn-primary",type:"button",onClick:Bu,children:"Save User"})]})]})}),r.jsx("button",{className:"save-btn",type:"button",children:"Save Settings"})]})})]})}const od={fullName:"",employeeId:"",email:"",phone:"",department:"",designation:"",role:"",status:"",username:"",password:"",joiningDate:""},Jx=["Client","Sales","Accounts","Operations","Manager"],Mi=["Client","Sales","Accounts","Manager"],dd=["Client","Salesperson","Accountant","Manager","Admin"],cd=["Active","Inactive"],ev=`/* ==== KEEPING YOUR ORIGINAL CSS SAME ==== */\r
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
`,_i={width:"120px"},nv={width:"150px"};function Oi(e){return e==="Admin"?"admin-role":e.toLowerCase().replace(/\s+/g,"")}function rv(e){return{fullName:e.fullName,email:e.email,phone:e.phone,department:e.department,designation:e.designation,status:e.status,role:e.role}}function tv(){Xe({pageKey:"users-roles",pageCssText:ev});const[e,n]=k.useState([]),[t,a]=k.useState({}),[i,s]=k.useState(!1),[l,c]=k.useState(od),[d,h]=k.useState(!0),[f,x]=k.useState("");k.useEffect(()=>{async function g(){h(!0),x("");try{const w=await $g();n(Array.isArray(w==null?void 0:w.users)?w.users:[])}catch(w){x((w==null?void 0:w.message)||"Unable to load admin users.")}finally{h(!1)}}g()},[]),k.useEffect(()=>{function g(w){w.key==="Escape"&&s(!1)}return document.addEventListener("keydown",g),()=>{document.removeEventListener("keydown",g)}},[]);function p(g,w){c(I=>({...I,[g]:w}))}function y(g,w,I){a(R=>({...R,[g]:{...R[g],[w]:I}}))}function N(){c(od)}function S(){N(),s(!0)}function b(){s(!1)}function u(){N(),b()}function m(g){a(w=>w[g.id]?w:{...w,[g.id]:rv(g)})}function v(g){const w=t[g];if(w){if(!/@ledgerworx\.me$/i.test(w.email.trim())){window.alert("Email must end with @ledgerworx.me.");return}n(I=>I.map(R=>R.id!==g?R:{...R,fullName:w.fullName.trim(),email:w.email.trim(),phone:w.phone.trim(),department:w.department,designation:w.designation.trim(),status:w.status,role:w.role,roleClass:Oi(w.role)})),a(I=>{const R={...I};return delete R[g],R})}}function P(){a({}),s(!1),N()}function E(g,w){n(I=>I.map(R=>R.id!==g?R:w==="inactive"?{...R,status:"Inactive",lastOnline:"Deactivated"}:{...R,status:"Active",lastOnline:"Online now"}))}function j(g){window.confirm("Deactivate this user?")&&E(g,"inactive")}function T(g){window.confirm("Activate this user?")&&E(g,"active")}function z(){const g=[{key:"fullName",label:"Full Name",type:"input"},{key:"employeeId",label:"Employee ID",type:"input"},{key:"email",label:"Email",type:"input"},{key:"phone",label:"Phone Number",type:"input"},{key:"department",label:"Department",type:"select"},{key:"designation",label:"Designation",type:"input"},{key:"role",label:"Role",type:"select"},{key:"status",label:"Status",type:"select"},{key:"username",label:"Username",type:"input"},{key:"password",label:"Password",type:"input"},{key:"joiningDate",label:"Joining Date",type:"input"}];for(const w of g)if(!String(l[w.key]??"").trim()){const R=w.type==="select"?"select":"fill";window.alert(`Please ${R} ${w.label}.`);return}if(!/@ledgerworx\.me$/i.test(l.email.trim())){window.alert("Email must end with @ledgerworx.me.");return}n(w=>[...w,{id:w.length+1,fullName:l.fullName.trim(),email:l.email.trim(),phone:l.phone.trim(),department:l.department,designation:l.designation.trim(),status:l.status,role:l.role,roleClass:Oi(l.role),lastOnline:l.joiningDate,employeeId:l.employeeId.trim(),username:l.username.trim(),password:l.password.trim(),joiningDate:l.joiningDate}]),N(),b()}return r.jsxs(r.Fragment,{children:[r.jsx(tn,{adminName:"Admin"}),r.jsxs("div",{className:"page",children:[r.jsxs("div",{className:"page-header",children:[r.jsx("h2",{children:"Users & Roles"}),r.jsx("button",{className:"btn primary",id:"addUserBtn",type:"button",onClick:S,children:"+ Add User"})]}),f?r.jsx("div",{style:{color:"#dc2626",marginBottom:"16px"},children:f}):null,r.jsx("div",{className:`modal-overlay${i?" open":""}`,id:"addUserModal","aria-hidden":!i,onClick:g=>{g.target===g.currentTarget&&b()},children:r.jsxs("div",{className:"modal-card",role:"dialog","aria-modal":"true","aria-labelledby":"addUserModalTitle",children:[r.jsxs("div",{className:"modal-header",children:[r.jsx("h3",{id:"addUserModalTitle",children:"Add User"}),r.jsx("button",{type:"button",className:"modal-close",id:"closeAddUserModalBtn","aria-label":"Close",onClick:b,children:"×"})]}),r.jsxs("div",{className:"add-user-form",children:[r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"newFullName",children:"Full Name"}),r.jsx("input",{id:"newFullName",placeholder:"Full Name",required:!0,value:l.fullName,onChange:g=>p("fullName",g.target.value)})]}),r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"newEmployeeId",children:"Employee ID"}),r.jsx("input",{id:"newEmployeeId",placeholder:"Employee ID",required:!0,value:l.employeeId,onChange:g=>p("employeeId",g.target.value)})]})]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"newEmail",children:"Email"}),r.jsx("input",{id:"newEmail",type:"email",placeholder:"Email",pattern:"^[^\\\\s@]+@ledgerworx\\\\.me$",title:"Email must end with @ledgerworx.me",required:!0,value:l.email,onChange:g=>p("email",g.target.value)})]}),r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"newPhone",children:"Phone Number"}),r.jsx("input",{id:"newPhone",placeholder:"Phone Number",required:!0,value:l.phone,onChange:g=>p("phone",g.target.value)})]})]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"newDepartment",children:"Department"}),r.jsxs("select",{id:"newDepartment",required:!0,value:l.department,onChange:g=>p("department",g.target.value),children:[r.jsx("option",{value:"",disabled:!0,children:"Select Department"}),Jx.map(g=>r.jsx("option",{children:g},g))]})]}),r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"newDesignation",children:"Designation"}),r.jsx("input",{id:"newDesignation",placeholder:"Designation",value:l.designation,onChange:g=>p("designation",g.target.value)})]})]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"newRole",children:"Role"}),r.jsxs("select",{id:"newRole",required:!0,value:l.role,onChange:g=>p("role",g.target.value),children:[r.jsx("option",{value:"",disabled:!0,children:"Select Role"}),dd.map(g=>r.jsx("option",{children:g},g))]})]}),r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"newStatus",children:"Status"}),r.jsxs("select",{id:"newStatus",required:!0,value:l.status,onChange:g=>p("status",g.target.value),children:[r.jsx("option",{value:"",disabled:!0,children:"Select Status"}),cd.map(g=>r.jsx("option",{children:g},g))]})]})]}),r.jsxs("div",{className:"form-grid",children:[r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"newUsername",children:"Username"}),r.jsx("input",{id:"newUsername",placeholder:"Username",required:!0,value:l.username,onChange:g=>p("username",g.target.value)})]}),r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"newPassword",children:"Password"}),r.jsx("input",{id:"newPassword",type:"password",placeholder:"Password",required:!0,value:l.password,onChange:g=>p("password",g.target.value)})]})]}),r.jsxs("div",{className:"form-row",children:[r.jsx("label",{htmlFor:"newJoiningDate",children:"Joining Date"}),r.jsx("input",{id:"newJoiningDate",type:"date",required:!0,value:l.joiningDate,onChange:g=>p("joiningDate",g.target.value)})]}),r.jsxs("div",{className:"form-actions",children:[r.jsx("button",{type:"button",className:"btn",id:"cancelNewUser",onClick:u,children:"Cancel"}),r.jsx("button",{type:"button",className:"btn primary",id:"saveNewUser",onClick:z,children:"Save"})]})]})]})}),r.jsx("div",{className:"card",children:r.jsxs("table",{children:[r.jsx("thead",{children:r.jsxs("tr",{children:[r.jsx("th",{children:"Full Name"}),r.jsx("th",{children:"Email"}),r.jsx("th",{children:"Phone"}),r.jsx("th",{children:"Department"}),r.jsx("th",{children:"Designation"}),r.jsx("th",{children:"Status"}),r.jsx("th",{children:"Role"}),r.jsx("th",{children:"Last Online"}),r.jsx("th",{children:"Actions"})]})}),r.jsx("tbody",{children:d?r.jsx("tr",{children:r.jsx("td",{colSpan:"9",style:{textAlign:"center",padding:"24px"},children:r.jsx(Oa,{compact:!0,title:"Loading employees",message:"Fetching the latest WordPress user directory for the admin workspace."})})}):e.map(g=>{const w=!!t[g.id],I=t[g.id],R=g.status==="Inactive"?"activate":"deactivate",V=w&&!Mi.includes(I.department)?[I.department,...Mi]:Mi;return r.jsxs("tr",{"data-index":g.id,children:[r.jsx("td",{className:"fullname-cell",children:r.jsx("span",{className:"fullname-text",children:w?r.jsx("input",{className:"edit-input name-input",style:_i,value:I.fullName,onChange:U=>y(g.id,"fullName",U.target.value)}):g.fullName})}),r.jsx("td",{className:"email-cell",children:r.jsx("span",{className:"email-text",children:w?r.jsx("input",{className:"edit-input email-input",type:"email",pattern:"^[^\\\\s@]+@ledgerworx\\\\.me$",title:"Email must end with @ledgerworx.me",style:nv,value:I.email,onChange:U=>y(g.id,"email",U.target.value)}):g.email})}),r.jsx("td",{className:"phone-cell",children:r.jsx("span",{className:"phone-text",children:w?r.jsx("input",{className:"edit-input phone-input",style:_i,value:I.phone,onChange:U=>y(g.id,"phone",U.target.value)}):g.phone})}),r.jsx("td",{className:"department-cell",children:r.jsx("span",{className:"department-text",children:w?r.jsx("select",{className:"dept-select",value:I.department,onChange:U=>y(g.id,"department",U.target.value),children:V.map(U=>r.jsx("option",{children:U},U))}):g.department})}),r.jsx("td",{className:"designation-cell",children:r.jsx("span",{className:"designation-text",children:w?r.jsx("input",{className:"edit-input desig-input",style:_i,value:I.designation,onChange:U=>y(g.id,"designation",U.target.value)}):g.designation})}),r.jsx("td",{className:"status-cell",children:r.jsx("span",{className:"status-text",children:w?r.jsx("select",{className:"status-select",value:I.status,onChange:U=>y(g.id,"status",U.target.value),children:cd.map(U=>r.jsx("option",{children:U},U))}):g.status})}),r.jsx("td",{children:r.jsx("span",{className:`role ${w?Oi(I.role):g.roleClass} role-text`,children:w?r.jsx("select",{className:"role-select",value:I.role,onChange:U=>y(g.id,"role",U.target.value),children:dd.map(U=>r.jsx("option",{value:U,children:U},U))}):g.role})}),r.jsx("td",{className:`${g.lastOnline==="Online now"?"online ":""}lastonline-text`,children:g.lastOnline}),r.jsxs("td",{children:[w?r.jsx("button",{className:"btn btn-edit","data-action":"save",type:"button",onClick:()=>v(g.id),children:"Save"}):r.jsx("button",{className:"btn btn-edit","data-action":"edit",type:"button",onClick:()=>m(g),children:"Edit"}),r.jsx("button",{className:`btn ${R==="activate"?"activate":"btn-delete"}`,"data-action":R,type:"button",style:{marginLeft:"8px"},onClick:()=>{if(R==="activate"){T(g.id);return}j(g.id)},children:R==="activate"?"Activate":"Deactivate"}),r.jsx("button",{className:"btn","data-action":"cancel",type:"button",style:{display:w?"inline-block":"none",marginLeft:"8px"},onClick:P,children:"Cancel"})]})]},g.id)})})]})})]})]})}function av(){return r.jsx(Is,{to:"../dashboard",replace:!0})}function iv({children:e}){var i,s,l,c,d;const n=Pt(),t=ti(),a=n.pathname==="/logout";return t.isLoading?r.jsx(Oa,{fullHeight:!0,title:"Checking employee session",message:"Validating your Admin portal access and preparing the control workspace."}):t.isError?r.jsx(Oa,{fullHeight:!0,state:"error",title:"Unable to verify your session",message:"We couldn't confirm your Admin portal session right now. Please try again.",actionLabel:"Retry",onAction:()=>window.location.reload()}):(i=t.data)!=null&&i.authenticated?["administrator"].includes(t.data.role)?e:(window.location.assign(((d=(c=t.data)==null?void 0:c.config)==null?void 0:d.portalBaseUrl)||"https://ledgerworx.me/portal/client/"),null):a?e:(window.location.assign(((l=(s=t.data)==null?void 0:s.config)==null?void 0:l.loginUrl)||"https://ledgerworx.me/login/"),null)}function sv(){return r.jsx(ng,{children:r.jsx(iv,{children:r.jsxs(Kh,{children:[r.jsx(ye,{path:"dashboard",element:r.jsx(Sg,{})}),r.jsx(ye,{path:"sales",element:r.jsx(sx,{})}),r.jsx(ye,{path:"accounts",element:r.jsx(dg,{})}),r.jsx(ye,{path:"operations",element:r.jsx(zg,{})}),r.jsx(ye,{path:"company",element:r.jsx(hg,{})}),r.jsx(ye,{path:"services",element:r.jsx(bx,{})}),r.jsx(ye,{path:"users",element:r.jsx(tv,{})}),r.jsx(ye,{path:"payments",element:r.jsx(Kg,{})}),r.jsx(ye,{path:"settings",element:r.jsx(Zx,{})}),r.jsx(ye,{path:"zoho",element:r.jsx(av,{})}),r.jsx(ye,{path:"profile",element:r.jsx(Zg,{})}),r.jsx(ye,{path:"logout",element:r.jsx(Pg,{})}),r.jsx(ye,{path:"/",element:r.jsx(Is,{to:"/dashboard",replace:!0})}),r.jsx(ye,{path:"*",element:r.jsx(Is,{to:"/dashboard",replace:!0})})]})})})}const Jt="/admin",lv=["/dashboard","/sales","/accounts","/operations","/company","/services","/users","/payments","/settings","/zoho","/profile","/logout"];function ov(e){const n=String(e).trim();return n===""||n==="/"?"":n.replace(/\/+$/,"")}function dv(){if(typeof window>"u")return"";const e=window.location.pathname||"";if(e.includes("/portal/admin"))return"/portal/admin";for(const t of lv){const a=`${Jt}${t}`,i=e.indexOf(a);if(i>0)return e.slice(0,i+Jt.length)}const n=e.indexOf(Jt);return n>=0?e.slice(0,n+Jt.length):""}const cv=ov("/portal"),uv=dv()||cv||"/portal/admin";Bi.createRoot(document.getElementById("root")).render(r.jsx(jd.StrictMode,{children:r.jsx(Zh,{basename:uv,future:{v7_startTransition:!0,v7_relativeSplatPath:!0},children:r.jsx(sv,{})})}));
