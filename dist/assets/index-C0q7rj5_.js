(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function e(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerPolicy&&(a.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?a.credentials="include":s.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=e(s);fetch(s.href,a)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const fr="169",ch=0,$r=1,hh=2,pr=1,xo=2,vn=3,Bn=0,Ne=1,Se=2,Nn=0,ai=1,oi=2,qr=3,Xr=4,dh=5,Jn=100,uh=101,fh=102,ph=103,mh=104,gh=200,vh=201,_h=202,Mh=203,yo=204,bo=205,xh=206,yh=207,bh=208,wh=209,Sh=210,Th=211,Eh=212,Ah=213,Ch=214,wo=0,So=1,To=2,Gi=3,Eo=4,Ao=5,Co=6,Ro=7,lc=0,Rh=1,Ph=2,Fn=0,Lh=1,Ih=2,Dh=3,cc=4,Uh=5,Nh=6,Fh=7,hc=300,Vi=301,Wi=302,Po=303,Lo=304,wa=306,Io=1e3,ni=1001,Do=1002,Be=1003,kh=1004,bs=1005,an=1006,Da=1007,ii=1008,bn=1009,dc=1010,uc=1011,ps=1012,mr=1013,ri=1014,cn=1015,_s=1016,gr=1017,vr=1018,$i=1020,fc=35902,pc=1021,mc=1022,on=1023,gc=1024,vc=1025,Bi=1026,qi=1027,_r=1028,Mr=1029,_c=1030,xr=1031,yr=1033,sa=33776,aa=33777,oa=33778,ra=33779,Uo=35840,No=35841,Fo=35842,ko=35843,Oo=36196,Bo=37492,zo=37496,Ho=37808,Go=37809,Vo=37810,Wo=37811,$o=37812,qo=37813,Xo=37814,Yo=37815,jo=37816,Ko=37817,Zo=37818,Qo=37819,Jo=37820,tr=37821,la=36492,er=36494,nr=36495,Mc=36283,ir=36284,sr=36285,ar=36286,Oh=3200,Bh=3201,xc=0,zh=1,Un="",We="srgb",Hn="srgb-linear",br="display-p3",Sa="display-p3-linear",da="linear",ae="srgb",ua="rec709",fa="p3",ui=7680,Yr=519,Hh=512,Gh=513,Vh=514,yc=515,Wh=516,$h=517,qh=518,Xh=519,or=35044,jr="300 es",xn=2e3,pa=2001;class ji{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const s=this._listeners[t];if(s!==void 0){const a=s.indexOf(e);a!==-1&&s.splice(a,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const s=n.slice(0);for(let a=0,r=s.length;a<r;a++)s[a].call(this,t);t.target=null}}}const Ee=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ua=Math.PI/180,rr=180/Math.PI;function kn(){const i=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ee[i&255]+Ee[i>>8&255]+Ee[i>>16&255]+Ee[i>>24&255]+"-"+Ee[t&255]+Ee[t>>8&255]+"-"+Ee[t>>16&15|64]+Ee[t>>24&255]+"-"+Ee[e&63|128]+Ee[e>>8&255]+"-"+Ee[e>>16&255]+Ee[e>>24&255]+Ee[n&255]+Ee[n>>8&255]+Ee[n>>16&255]+Ee[n>>24&255]).toLowerCase()}function Ce(i,t,e){return Math.max(t,Math.min(e,i))}function Yh(i,t){return(i%t+t)%t}function Na(i,t,e){return(1-e)*i+e*t}function ln(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return i/4294967295;case Uint16Array:return i/65535;case Uint8Array:return i/255;case Int32Array:return Math.max(i/2147483647,-1);case Int16Array:return Math.max(i/32767,-1);case Int8Array:return Math.max(i/127,-1);default:throw new Error("Invalid component type.")}}function Qt(i,t){switch(t.constructor){case Float32Array:return i;case Uint32Array:return Math.round(i*4294967295);case Uint16Array:return Math.round(i*65535);case Uint8Array:return Math.round(i*255);case Int32Array:return Math.round(i*2147483647);case Int16Array:return Math.round(i*32767);case Int8Array:return Math.round(i*127);default:throw new Error("Invalid component type.")}}class Lt{constructor(t=0,e=0){Lt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,s=t.elements;return this.x=s[0]*e+s[3]*n+s[6],this.y=s[1]*e+s[4]*n+s[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ce(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),s=Math.sin(e),a=this.x-t.x,r=this.y-t.y;return this.x=a*n-r*s+t.x,this.y=a*s+r*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Ft{constructor(t,e,n,s,a,r,o,l,c){Ft.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,s,a,r,o,l,c)}set(t,e,n,s,a,r,o,l,c){const h=this.elements;return h[0]=t,h[1]=s,h[2]=o,h[3]=e,h[4]=a,h[5]=l,h[6]=n,h[7]=r,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,a=this.elements,r=n[0],o=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],m=n[5],g=n[8],_=s[0],p=s[3],f=s[6],b=s[1],x=s[4],S=s[7],R=s[2],C=s[5],A=s[8];return a[0]=r*_+o*b+l*R,a[3]=r*p+o*x+l*C,a[6]=r*f+o*S+l*A,a[1]=c*_+h*b+d*R,a[4]=c*p+h*x+d*C,a[7]=c*f+h*S+d*A,a[2]=u*_+m*b+g*R,a[5]=u*p+m*x+g*C,a[8]=u*f+m*S+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*r*h-e*o*c-n*a*h+n*o*l+s*a*c-s*r*l}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=h*r-o*c,u=o*l-h*a,m=c*a-r*l,g=e*d+n*u+s*m;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=d*_,t[1]=(s*c-h*n)*_,t[2]=(o*n-s*r)*_,t[3]=u*_,t[4]=(h*e-s*l)*_,t[5]=(s*a-o*e)*_,t[6]=m*_,t[7]=(n*l-c*e)*_,t[8]=(r*e-n*a)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,s,a,r,o){const l=Math.cos(a),c=Math.sin(a);return this.set(n*l,n*c,-n*(l*r+c*o)+r+t,-s*c,s*l,-s*(-c*r+l*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Fa.makeScale(t,e)),this}rotate(t){return this.premultiply(Fa.makeRotation(-t)),this}translate(t,e){return this.premultiply(Fa.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<9;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Fa=new Ft;function bc(i){for(let t=i.length-1;t>=0;--t)if(i[t]>=65535)return!0;return!1}function ma(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function jh(){const i=ma("canvas");return i.style.display="block",i}const Kr={};function ca(i){i in Kr||(Kr[i]=!0,console.warn(i))}function Kh(i,t,e){return new Promise(function(n,s){function a(){switch(i.clientWaitSync(t,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(a,e);break;default:n()}}setTimeout(a,e)})}function Zh(i){const t=i.elements;t[2]=.5*t[2]+.5*t[3],t[6]=.5*t[6]+.5*t[7],t[10]=.5*t[10]+.5*t[11],t[14]=.5*t[14]+.5*t[15]}function Qh(i){const t=i.elements;t[11]===-1?(t[10]=-t[10]-1,t[14]=-t[14]):(t[10]=-t[10],t[14]=-t[14]+1)}const Zr=new Ft().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),Qr=new Ft().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Qi={[Hn]:{transfer:da,primaries:ua,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i,fromReference:i=>i},[We]:{transfer:ae,primaries:ua,luminanceCoefficients:[.2126,.7152,.0722],toReference:i=>i.convertSRGBToLinear(),fromReference:i=>i.convertLinearToSRGB()},[Sa]:{transfer:da,primaries:fa,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.applyMatrix3(Qr),fromReference:i=>i.applyMatrix3(Zr)},[br]:{transfer:ae,primaries:fa,luminanceCoefficients:[.2289,.6917,.0793],toReference:i=>i.convertSRGBToLinear().applyMatrix3(Qr),fromReference:i=>i.applyMatrix3(Zr).convertLinearToSRGB()}},Jh=new Set([Hn,Sa]),Kt={enabled:!0,_workingColorSpace:Hn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(i){if(!Jh.has(i))throw new Error(`Unsupported working color space, "${i}".`);this._workingColorSpace=i},convert:function(i,t,e){if(this.enabled===!1||t===e||!t||!e)return i;const n=Qi[t].toReference,s=Qi[e].fromReference;return s(n(i))},fromWorkingColorSpace:function(i,t){return this.convert(i,this._workingColorSpace,t)},toWorkingColorSpace:function(i,t){return this.convert(i,t,this._workingColorSpace)},getPrimaries:function(i){return Qi[i].primaries},getTransfer:function(i){return i===Un?da:Qi[i].transfer},getLuminanceCoefficients:function(i,t=this._workingColorSpace){return i.fromArray(Qi[t].luminanceCoefficients)}};function zi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function ka(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let fi;class td{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{fi===void 0&&(fi=ma("canvas")),fi.width=t.width,fi.height=t.height;const n=fi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=fi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ma("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const s=n.getImageData(0,0,t.width,t.height),a=s.data;for(let r=0;r<a.length;r++)a[r]=zi(a[r]/255)*255;return n.putImageData(s,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(zi(e[n]/255)*255):e[n]=zi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let ed=0;class wc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:ed++}),this.uuid=kn(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let a;if(Array.isArray(s)){a=[];for(let r=0,o=s.length;r<o;r++)s[r].isDataTexture?a.push(Oa(s[r].image)):a.push(Oa(s[r]))}else a=Oa(s);n.url=a}return e||(t.images[this.uuid]=n),n}}function Oa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?td.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let nd=0;class Pe extends ji{constructor(t=Pe.DEFAULT_IMAGE,e=Pe.DEFAULT_MAPPING,n=ni,s=ni,a=an,r=ii,o=on,l=bn,c=Pe.DEFAULT_ANISOTROPY,h=Un){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:nd++}),this.uuid=kn(),this.name="",this.source=new wc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=a,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new Lt(0,0),this.repeat=new Lt(1,1),this.center=new Lt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ft,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==hc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Io:t.x=t.x-Math.floor(t.x);break;case ni:t.x=t.x<0?0:1;break;case Do:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Io:t.y=t.y-Math.floor(t.y);break;case ni:t.y=t.y<0?0:1;break;case Do:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Pe.DEFAULT_IMAGE=null;Pe.DEFAULT_MAPPING=hc;Pe.DEFAULT_ANISOTROPY=1;class Jt{constructor(t=0,e=0,n=0,s=1){Jt.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=s}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,s){return this.x=t,this.y=e,this.z=n,this.w=s,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,a=this.w,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*s+r[12]*a,this.y=r[1]*e+r[5]*n+r[9]*s+r[13]*a,this.z=r[2]*e+r[6]*n+r[10]*s+r[14]*a,this.w=r[3]*e+r[7]*n+r[11]*s+r[15]*a,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,s,a;const l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],m=l[5],g=l[9],_=l[2],p=l[6],f=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-_)<.01&&Math.abs(g-p)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+_)<.1&&Math.abs(g+p)<.1&&Math.abs(c+m+f-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(c+1)/2,S=(m+1)/2,R=(f+1)/2,C=(h+u)/4,A=(d+_)/4,L=(g+p)/4;return x>S&&x>R?x<.01?(n=0,s=.707106781,a=.707106781):(n=Math.sqrt(x),s=C/n,a=A/n):S>R?S<.01?(n=.707106781,s=0,a=.707106781):(s=Math.sqrt(S),n=C/s,a=L/s):R<.01?(n=.707106781,s=.707106781,a=0):(a=Math.sqrt(R),n=A/a,s=L/a),this.set(n,s,a,e),this}let b=Math.sqrt((p-g)*(p-g)+(d-_)*(d-_)+(u-h)*(u-h));return Math.abs(b)<.001&&(b=1),this.x=(p-g)/b,this.y=(d-_)/b,this.z=(u-h)/b,this.w=Math.acos((c+m+f-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class id extends ji{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Jt(0,0,t,e),this.scissorTest=!1,this.viewport=new Jt(0,0,t,e);const s={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:an,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const a=new Pe(s,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);a.flipY=!1,a.generateMipmaps=n.generateMipmaps,a.internalFormat=n.internalFormat,this.textures=[];const r=n.count;for(let o=0;o<r;o++)this.textures[o]=a.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let s=0,a=this.textures.length;s<a;s++)this.textures[s].image.width=t,this.textures[s].image.height=e,this.textures[s].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,s=t.textures.length;n<s;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new wc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class li extends id{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Sc extends Pe{constructor(t=null,e=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Be,this.minFilter=Be,this.wrapR=ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class sd extends Pe{constructor(t=null,e=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:s},this.magFilter=Be,this.minFilter=Be,this.wrapR=ni,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ue{constructor(t=0,e=0,n=0,s=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=s}static slerpFlat(t,e,n,s,a,r,o){let l=n[s+0],c=n[s+1],h=n[s+2],d=n[s+3];const u=a[r+0],m=a[r+1],g=a[r+2],_=a[r+3];if(o===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(o===1){t[e+0]=u,t[e+1]=m,t[e+2]=g,t[e+3]=_;return}if(d!==_||l!==u||c!==m||h!==g){let p=1-o;const f=l*u+c*m+h*g+d*_,b=f>=0?1:-1,x=1-f*f;if(x>Number.EPSILON){const R=Math.sqrt(x),C=Math.atan2(R,f*b);p=Math.sin(p*C)/R,o=Math.sin(o*C)/R}const S=o*b;if(l=l*p+u*S,c=c*p+m*S,h=h*p+g*S,d=d*p+_*S,p===1-o){const R=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=R,c*=R,h*=R,d*=R}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,s,a,r){const o=n[s],l=n[s+1],c=n[s+2],h=n[s+3],d=a[r],u=a[r+1],m=a[r+2],g=a[r+3];return t[e]=o*g+h*d+l*m-c*u,t[e+1]=l*g+h*u+c*d-o*m,t[e+2]=c*g+h*m+o*u-l*d,t[e+3]=h*g-o*d-l*u-c*m,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,s){return this._x=t,this._y=e,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,s=t._y,a=t._z,r=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(s/2),d=o(a/2),u=l(n/2),m=l(s/2),g=l(a/2);switch(r){case"XYZ":this._x=u*h*d+c*m*g,this._y=c*m*d-u*h*g,this._z=c*h*g+u*m*d,this._w=c*h*d-u*m*g;break;case"YXZ":this._x=u*h*d+c*m*g,this._y=c*m*d-u*h*g,this._z=c*h*g-u*m*d,this._w=c*h*d+u*m*g;break;case"ZXY":this._x=u*h*d-c*m*g,this._y=c*m*d+u*h*g,this._z=c*h*g+u*m*d,this._w=c*h*d-u*m*g;break;case"ZYX":this._x=u*h*d-c*m*g,this._y=c*m*d+u*h*g,this._z=c*h*g-u*m*d,this._w=c*h*d+u*m*g;break;case"YZX":this._x=u*h*d+c*m*g,this._y=c*m*d+u*h*g,this._z=c*h*g-u*m*d,this._w=c*h*d-u*m*g;break;case"XZY":this._x=u*h*d-c*m*g,this._y=c*m*d-u*h*g,this._z=c*h*g+u*m*d,this._w=c*h*d+u*m*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,s=Math.sin(n);return this._x=t.x*s,this._y=t.y*s,this._z=t.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],s=e[4],a=e[8],r=e[1],o=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+o+d;if(u>0){const m=.5/Math.sqrt(u+1);this._w=.25/m,this._x=(h-l)*m,this._y=(a-c)*m,this._z=(r-s)*m}else if(n>o&&n>d){const m=2*Math.sqrt(1+n-o-d);this._w=(h-l)/m,this._x=.25*m,this._y=(s+r)/m,this._z=(a+c)/m}else if(o>d){const m=2*Math.sqrt(1+o-n-d);this._w=(a-c)/m,this._x=(s+r)/m,this._y=.25*m,this._z=(l+h)/m}else{const m=2*Math.sqrt(1+d-n-o);this._w=(r-s)/m,this._x=(a+c)/m,this._y=(l+h)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ce(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const s=Math.min(1,e/n);return this.slerp(t,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,s=t._y,a=t._z,r=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+r*o+s*c-a*l,this._y=s*h+r*l+a*o-n*c,this._z=a*h+r*c+n*l-s*o,this._w=r*h-n*o-s*l-a*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,s=this._y,a=this._z,r=this._w;let o=r*t._w+n*t._x+s*t._y+a*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=r,this._x=n,this._y=s,this._z=a,this;const l=1-o*o;if(l<=Number.EPSILON){const m=1-e;return this._w=m*r+e*this._w,this._x=m*n+e*this._x,this._y=m*s+e*this._y,this._z=m*a+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,o),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=r*d+this._w*u,this._x=n*d+this._x*u,this._y=s*d+this._y*u,this._z=a*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),a=Math.sqrt(n);return this.set(s*Math.sin(t),s*Math.cos(t),a*Math.sin(e),a*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class T{constructor(t=0,e=0,n=0){T.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Jr.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Jr.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,s=this.z,a=t.elements;return this.x=a[0]*e+a[3]*n+a[6]*s,this.y=a[1]*e+a[4]*n+a[7]*s,this.z=a[2]*e+a[5]*n+a[8]*s,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,s=this.z,a=t.elements,r=1/(a[3]*e+a[7]*n+a[11]*s+a[15]);return this.x=(a[0]*e+a[4]*n+a[8]*s+a[12])*r,this.y=(a[1]*e+a[5]*n+a[9]*s+a[13])*r,this.z=(a[2]*e+a[6]*n+a[10]*s+a[14])*r,this}applyQuaternion(t){const e=this.x,n=this.y,s=this.z,a=t.x,r=t.y,o=t.z,l=t.w,c=2*(r*s-o*n),h=2*(o*e-a*s),d=2*(a*n-r*e);return this.x=e+l*c+r*d-o*h,this.y=n+l*h+o*c-a*d,this.z=s+l*d+a*h-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,s=this.z,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*s,this.y=a[1]*e+a[5]*n+a[9]*s,this.z=a[2]*e+a[6]*n+a[10]*s,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,s=t.y,a=t.z,r=e.x,o=e.y,l=e.z;return this.x=s*l-a*o,this.y=a*r-n*l,this.z=n*o-s*r,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ba.copy(this).projectOnVector(t),this.sub(Ba)}reflect(t){return this.sub(Ba.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ce(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,s=this.z-t.z;return e*e+n*n+s*s}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const s=Math.sin(e)*t;return this.x=s*Math.sin(n),this.y=Math.cos(e)*t,this.z=s*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),s=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=s,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ba=new T,Jr=new Ue;class ci{constructor(t=new T(1/0,1/0,1/0),e=new T(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Qe.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Qe.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Qe.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const a=n.getAttribute("position");if(e===!0&&a!==void 0&&t.isInstancedMesh!==!0)for(let r=0,o=a.count;r<o;r++)t.isMesh===!0?t.getVertexPosition(r,Qe):Qe.fromBufferAttribute(a,r),Qe.applyMatrix4(t.matrixWorld),this.expandByPoint(Qe);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ws.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ws.copy(n.boundingBox)),ws.applyMatrix4(t.matrixWorld),this.union(ws)}const s=t.children;for(let a=0,r=s.length;a<r;a++)this.expandByObject(s[a],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,Qe),Qe.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ji),Ss.subVectors(this.max,Ji),pi.subVectors(t.a,Ji),mi.subVectors(t.b,Ji),gi.subVectors(t.c,Ji),Tn.subVectors(mi,pi),En.subVectors(gi,mi),Wn.subVectors(pi,gi);let e=[0,-Tn.z,Tn.y,0,-En.z,En.y,0,-Wn.z,Wn.y,Tn.z,0,-Tn.x,En.z,0,-En.x,Wn.z,0,-Wn.x,-Tn.y,Tn.x,0,-En.y,En.x,0,-Wn.y,Wn.x,0];return!za(e,pi,mi,gi,Ss)||(e=[1,0,0,0,1,0,0,0,1],!za(e,pi,mi,gi,Ss))?!1:(Ts.crossVectors(Tn,En),e=[Ts.x,Ts.y,Ts.z],za(e,pi,mi,gi,Ss))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Qe).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Qe).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(un[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),un[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),un[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),un[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),un[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),un[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),un[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),un[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(un),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const un=[new T,new T,new T,new T,new T,new T,new T,new T],Qe=new T,ws=new ci,pi=new T,mi=new T,gi=new T,Tn=new T,En=new T,Wn=new T,Ji=new T,Ss=new T,Ts=new T,$n=new T;function za(i,t,e,n,s){for(let a=0,r=i.length-3;a<=r;a+=3){$n.fromArray(i,a);const o=s.x*Math.abs($n.x)+s.y*Math.abs($n.y)+s.z*Math.abs($n.z),l=t.dot($n),c=e.dot($n),h=n.dot($n);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const ad=new ci,ts=new T,Ha=new T;class hi{constructor(t=new T,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):ad.setFromPoints(t).getCenter(n);let s=0;for(let a=0,r=t.length;a<r;a++)s=Math.max(s,n.distanceToSquared(t[a]));return this.radius=Math.sqrt(s),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ts.subVectors(t,this.center);const e=ts.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),s=(n-this.radius)*.5;this.center.addScaledVector(ts,s/n),this.radius+=s}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Ha.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ts.copy(t.center).add(Ha)),this.expandByPoint(ts.copy(t.center).sub(Ha))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const fn=new T,Ga=new T,Es=new T,An=new T,Va=new T,As=new T,Wa=new T;class wr{constructor(t=new T,e=new T(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,fn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=fn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(fn.copy(this.origin).addScaledVector(this.direction,e),fn.distanceToSquared(t))}distanceSqToSegment(t,e,n,s){Ga.copy(t).add(e).multiplyScalar(.5),Es.copy(e).sub(t).normalize(),An.copy(this.origin).sub(Ga);const a=t.distanceTo(e)*.5,r=-this.direction.dot(Es),o=An.dot(this.direction),l=-An.dot(Es),c=An.lengthSq(),h=Math.abs(1-r*r);let d,u,m,g;if(h>0)if(d=r*l-o,u=r*o-l,g=a*h,d>=0)if(u>=-g)if(u<=g){const _=1/h;d*=_,u*=_,m=d*(d+r*u+2*o)+u*(r*d+u+2*l)+c}else u=a,d=Math.max(0,-(r*u+o)),m=-d*d+u*(u+2*l)+c;else u=-a,d=Math.max(0,-(r*u+o)),m=-d*d+u*(u+2*l)+c;else u<=-g?(d=Math.max(0,-(-r*a+o)),u=d>0?-a:Math.min(Math.max(-a,-l),a),m=-d*d+u*(u+2*l)+c):u<=g?(d=0,u=Math.min(Math.max(-a,-l),a),m=u*(u+2*l)+c):(d=Math.max(0,-(r*a+o)),u=d>0?a:Math.min(Math.max(-a,-l),a),m=-d*d+u*(u+2*l)+c);else u=r>0?-a:a,d=Math.max(0,-(r*u+o)),m=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Ga).addScaledVector(Es,u),m}intersectSphere(t,e){fn.subVectors(t.center,this.origin);const n=fn.dot(this.direction),s=fn.dot(fn)-n*n,a=t.radius*t.radius;if(s>a)return null;const r=Math.sqrt(a-s),o=n-r,l=n+r;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,s,a,r,o,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,s=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,s=(t.min.x-u.x)*c),h>=0?(a=(t.min.y-u.y)*h,r=(t.max.y-u.y)*h):(a=(t.max.y-u.y)*h,r=(t.min.y-u.y)*h),n>r||a>s||((a>n||isNaN(n))&&(n=a),(r<s||isNaN(s))&&(s=r),d>=0?(o=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(o=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,e)}intersectsBox(t){return this.intersectBox(t,fn)!==null}intersectTriangle(t,e,n,s,a){Va.subVectors(e,t),As.subVectors(n,t),Wa.crossVectors(Va,As);let r=this.direction.dot(Wa),o;if(r>0){if(s)return null;o=1}else if(r<0)o=-1,r=-r;else return null;An.subVectors(this.origin,t);const l=o*this.direction.dot(As.crossVectors(An,As));if(l<0)return null;const c=o*this.direction.dot(Va.cross(An));if(c<0||l+c>r)return null;const h=-o*An.dot(Wa);return h<0?null:this.at(h/r,a)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class qt{constructor(t,e,n,s,a,r,o,l,c,h,d,u,m,g,_,p){qt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,s,a,r,o,l,c,h,d,u,m,g,_,p)}set(t,e,n,s,a,r,o,l,c,h,d,u,m,g,_,p){const f=this.elements;return f[0]=t,f[4]=e,f[8]=n,f[12]=s,f[1]=a,f[5]=r,f[9]=o,f[13]=l,f[2]=c,f[6]=h,f[10]=d,f[14]=u,f[3]=m,f[7]=g,f[11]=_,f[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new qt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,s=1/vi.setFromMatrixColumn(t,0).length(),a=1/vi.setFromMatrixColumn(t,1).length(),r=1/vi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*s,e[1]=n[1]*s,e[2]=n[2]*s,e[3]=0,e[4]=n[4]*a,e[5]=n[5]*a,e[6]=n[6]*a,e[7]=0,e[8]=n[8]*r,e[9]=n[9]*r,e[10]=n[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,s=t.y,a=t.z,r=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),h=Math.cos(a),d=Math.sin(a);if(t.order==="XYZ"){const u=r*h,m=r*d,g=o*h,_=o*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=m+g*c,e[5]=u-_*c,e[9]=-o*l,e[2]=_-u*c,e[6]=g+m*c,e[10]=r*l}else if(t.order==="YXZ"){const u=l*h,m=l*d,g=c*h,_=c*d;e[0]=u+_*o,e[4]=g*o-m,e[8]=r*c,e[1]=r*d,e[5]=r*h,e[9]=-o,e[2]=m*o-g,e[6]=_+u*o,e[10]=r*l}else if(t.order==="ZXY"){const u=l*h,m=l*d,g=c*h,_=c*d;e[0]=u-_*o,e[4]=-r*d,e[8]=g+m*o,e[1]=m+g*o,e[5]=r*h,e[9]=_-u*o,e[2]=-r*c,e[6]=o,e[10]=r*l}else if(t.order==="ZYX"){const u=r*h,m=r*d,g=o*h,_=o*d;e[0]=l*h,e[4]=g*c-m,e[8]=u*c+_,e[1]=l*d,e[5]=_*c+u,e[9]=m*c-g,e[2]=-c,e[6]=o*l,e[10]=r*l}else if(t.order==="YZX"){const u=r*l,m=r*c,g=o*l,_=o*c;e[0]=l*h,e[4]=_-u*d,e[8]=g*d+m,e[1]=d,e[5]=r*h,e[9]=-o*h,e[2]=-c*h,e[6]=m*d+g,e[10]=u-_*d}else if(t.order==="XZY"){const u=r*l,m=r*c,g=o*l,_=o*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+_,e[5]=r*h,e[9]=m*d-g,e[2]=g*d-m,e[6]=o*h,e[10]=_*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(od,t,rd)}lookAt(t,e,n){const s=this.elements;return Ge.subVectors(t,e),Ge.lengthSq()===0&&(Ge.z=1),Ge.normalize(),Cn.crossVectors(n,Ge),Cn.lengthSq()===0&&(Math.abs(n.z)===1?Ge.x+=1e-4:Ge.z+=1e-4,Ge.normalize(),Cn.crossVectors(n,Ge)),Cn.normalize(),Cs.crossVectors(Ge,Cn),s[0]=Cn.x,s[4]=Cs.x,s[8]=Ge.x,s[1]=Cn.y,s[5]=Cs.y,s[9]=Ge.y,s[2]=Cn.z,s[6]=Cs.z,s[10]=Ge.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,s=e.elements,a=this.elements,r=n[0],o=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],m=n[13],g=n[2],_=n[6],p=n[10],f=n[14],b=n[3],x=n[7],S=n[11],R=n[15],C=s[0],A=s[4],L=s[8],I=s[12],v=s[1],M=s[5],U=s[9],k=s[13],z=s[2],X=s[6],O=s[10],Y=s[14],V=s[3],J=s[7],ot=s[11],ft=s[15];return a[0]=r*C+o*v+l*z+c*V,a[4]=r*A+o*M+l*X+c*J,a[8]=r*L+o*U+l*O+c*ot,a[12]=r*I+o*k+l*Y+c*ft,a[1]=h*C+d*v+u*z+m*V,a[5]=h*A+d*M+u*X+m*J,a[9]=h*L+d*U+u*O+m*ot,a[13]=h*I+d*k+u*Y+m*ft,a[2]=g*C+_*v+p*z+f*V,a[6]=g*A+_*M+p*X+f*J,a[10]=g*L+_*U+p*O+f*ot,a[14]=g*I+_*k+p*Y+f*ft,a[3]=b*C+x*v+S*z+R*V,a[7]=b*A+x*M+S*X+R*J,a[11]=b*L+x*U+S*O+R*ot,a[15]=b*I+x*k+S*Y+R*ft,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],s=t[8],a=t[12],r=t[1],o=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],m=t[14],g=t[3],_=t[7],p=t[11],f=t[15];return g*(+a*l*d-s*c*d-a*o*u+n*c*u+s*o*m-n*l*m)+_*(+e*l*m-e*c*u+a*r*u-s*r*m+s*c*h-a*l*h)+p*(+e*c*d-e*o*m-a*r*d+n*r*m+a*o*h-n*c*h)+f*(-s*o*h-e*l*d+e*o*u+s*r*d-n*r*u+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const s=this.elements;return t.isVector3?(s[12]=t.x,s[13]=t.y,s[14]=t.z):(s[12]=t,s[13]=e,s[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],s=t[2],a=t[3],r=t[4],o=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],m=t[11],g=t[12],_=t[13],p=t[14],f=t[15],b=d*p*c-_*u*c+_*l*m-o*p*m-d*l*f+o*u*f,x=g*u*c-h*p*c-g*l*m+r*p*m+h*l*f-r*u*f,S=h*_*c-g*d*c+g*o*m-r*_*m-h*o*f+r*d*f,R=g*d*l-h*_*l-g*o*u+r*_*u+h*o*p-r*d*p,C=e*b+n*x+s*S+a*R;if(C===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/C;return t[0]=b*A,t[1]=(_*u*a-d*p*a-_*s*m+n*p*m+d*s*f-n*u*f)*A,t[2]=(o*p*a-_*l*a+_*s*c-n*p*c-o*s*f+n*l*f)*A,t[3]=(d*l*a-o*u*a-d*s*c+n*u*c+o*s*m-n*l*m)*A,t[4]=x*A,t[5]=(h*p*a-g*u*a+g*s*m-e*p*m-h*s*f+e*u*f)*A,t[6]=(g*l*a-r*p*a-g*s*c+e*p*c+r*s*f-e*l*f)*A,t[7]=(r*u*a-h*l*a+h*s*c-e*u*c-r*s*m+e*l*m)*A,t[8]=S*A,t[9]=(g*d*a-h*_*a-g*n*m+e*_*m+h*n*f-e*d*f)*A,t[10]=(r*_*a-g*o*a+g*n*c-e*_*c-r*n*f+e*o*f)*A,t[11]=(h*o*a-r*d*a-h*n*c+e*d*c+r*n*m-e*o*m)*A,t[12]=R*A,t[13]=(h*_*s-g*d*s+g*n*u-e*_*u-h*n*p+e*d*p)*A,t[14]=(g*o*s-r*_*s-g*n*l+e*_*l+r*n*p-e*o*p)*A,t[15]=(r*d*s-h*o*s+h*n*l-e*d*l-r*n*u+e*o*u)*A,this}scale(t){const e=this.elements,n=t.x,s=t.y,a=t.z;return e[0]*=n,e[4]*=s,e[8]*=a,e[1]*=n,e[5]*=s,e[9]*=a,e[2]*=n,e[6]*=s,e[10]*=a,e[3]*=n,e[7]*=s,e[11]*=a,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],s=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,s))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),s=Math.sin(e),a=1-n,r=t.x,o=t.y,l=t.z,c=a*r,h=a*o;return this.set(c*r+n,c*o-s*l,c*l+s*o,0,c*o+s*l,h*o+n,h*l-s*r,0,c*l-s*o,h*l+s*r,a*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,s,a,r){return this.set(1,n,a,0,t,1,r,0,e,s,1,0,0,0,0,1),this}compose(t,e,n){const s=this.elements,a=e._x,r=e._y,o=e._z,l=e._w,c=a+a,h=r+r,d=o+o,u=a*c,m=a*h,g=a*d,_=r*h,p=r*d,f=o*d,b=l*c,x=l*h,S=l*d,R=n.x,C=n.y,A=n.z;return s[0]=(1-(_+f))*R,s[1]=(m+S)*R,s[2]=(g-x)*R,s[3]=0,s[4]=(m-S)*C,s[5]=(1-(u+f))*C,s[6]=(p+b)*C,s[7]=0,s[8]=(g+x)*A,s[9]=(p-b)*A,s[10]=(1-(u+_))*A,s[11]=0,s[12]=t.x,s[13]=t.y,s[14]=t.z,s[15]=1,this}decompose(t,e,n){const s=this.elements;let a=vi.set(s[0],s[1],s[2]).length();const r=vi.set(s[4],s[5],s[6]).length(),o=vi.set(s[8],s[9],s[10]).length();this.determinant()<0&&(a=-a),t.x=s[12],t.y=s[13],t.z=s[14],Je.copy(this);const c=1/a,h=1/r,d=1/o;return Je.elements[0]*=c,Je.elements[1]*=c,Je.elements[2]*=c,Je.elements[4]*=h,Je.elements[5]*=h,Je.elements[6]*=h,Je.elements[8]*=d,Je.elements[9]*=d,Je.elements[10]*=d,e.setFromRotationMatrix(Je),n.x=a,n.y=r,n.z=o,this}makePerspective(t,e,n,s,a,r,o=xn){const l=this.elements,c=2*a/(e-t),h=2*a/(n-s),d=(e+t)/(e-t),u=(n+s)/(n-s);let m,g;if(o===xn)m=-(r+a)/(r-a),g=-2*r*a/(r-a);else if(o===pa)m=-r/(r-a),g=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=m,l[14]=g,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,s,a,r,o=xn){const l=this.elements,c=1/(e-t),h=1/(n-s),d=1/(r-a),u=(e+t)*c,m=(n+s)*h;let g,_;if(o===xn)g=(r+a)*d,_=-2*d;else if(o===pa)g=a*d,_=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-m,l[2]=0,l[6]=0,l[10]=_,l[14]=-g,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let s=0;s<16;s++)if(e[s]!==n[s])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const vi=new T,Je=new qt,od=new T(0,0,0),rd=new T(1,1,1),Cn=new T,Cs=new T,Ge=new T,tl=new qt,el=new Ue;class ge{constructor(t=0,e=0,n=0,s=ge.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=s}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,s=this._order){return this._x=t,this._y=e,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const s=t.elements,a=s[0],r=s[4],o=s[8],l=s[1],c=s[5],h=s[9],d=s[2],u=s[6],m=s[10];switch(e){case"XYZ":this._y=Math.asin(Ce(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,m),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ce(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,a),this._z=0);break;case"ZXY":this._x=Math.asin(Ce(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-Ce(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,m),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Ce(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,a)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-Ce(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-h,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return tl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(tl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return el.setFromEuler(this),this.setFromQuaternion(el,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}ge.DEFAULT_ORDER="XYZ";class Tc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let ld=0;const nl=new T,_i=new Ue,pn=new qt,Rs=new T,es=new T,cd=new T,hd=new Ue,il=new T(1,0,0),sl=new T(0,1,0),al=new T(0,0,1),ol={type:"added"},dd={type:"removed"},Mi={type:"childadded",child:null},$a={type:"childremoved",child:null};class ve extends ji{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ld++}),this.uuid=kn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=ve.DEFAULT_UP.clone();const t=new T,e=new ge,n=new Ue,s=new T(1,1,1);function a(){n.setFromEuler(e,!1)}function r(){e.setFromQuaternion(n,void 0,!1)}e._onChange(a),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new qt},normalMatrix:{value:new Ft}}),this.matrix=new qt,this.matrixWorld=new qt,this.matrixAutoUpdate=ve.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return _i.setFromAxisAngle(t,e),this.quaternion.multiply(_i),this}rotateOnWorldAxis(t,e){return _i.setFromAxisAngle(t,e),this.quaternion.premultiply(_i),this}rotateX(t){return this.rotateOnAxis(il,t)}rotateY(t){return this.rotateOnAxis(sl,t)}rotateZ(t){return this.rotateOnAxis(al,t)}translateOnAxis(t,e){return nl.copy(t).applyQuaternion(this.quaternion),this.position.add(nl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(il,t)}translateY(t){return this.translateOnAxis(sl,t)}translateZ(t){return this.translateOnAxis(al,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(pn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Rs.copy(t):Rs.set(t,e,n);const s=this.parent;this.updateWorldMatrix(!0,!1),es.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?pn.lookAt(es,Rs,this.up):pn.lookAt(Rs,es,this.up),this.quaternion.setFromRotationMatrix(pn),s&&(pn.extractRotation(s.matrixWorld),_i.setFromRotationMatrix(pn),this.quaternion.premultiply(_i.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(ol),Mi.child=t,this.dispatchEvent(Mi),Mi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(dd),$a.child=t,this.dispatchEvent($a),$a.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),pn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),pn.multiply(t.parent.matrixWorld)),t.applyMatrix4(pn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(ol),Mi.child=t,this.dispatchEvent(Mi),Mi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,s=this.children.length;n<s;n++){const r=this.children[n].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(es,t,cd),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(es,hd,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,s=e.length;n<s;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),e===!0){const s=this.children;for(let a=0,r=s.length;a<r;a++)s[a].updateWorldMatrix(!1,!0)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,this.name!==""&&(s.name=this.name),this.castShadow===!0&&(s.castShadow=!0),this.receiveShadow===!0&&(s.receiveShadow=!0),this.visible===!1&&(s.visible=!1),this.frustumCulled===!1&&(s.frustumCulled=!1),this.renderOrder!==0&&(s.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(s.matrixAutoUpdate=!1),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.visibility=this._visibility,s.active=this._active,s.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.geometryCount=this._geometryCount,s.matricesTexture=this._matricesTexture.toJSON(t),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(s.boundingSphere={center:s.boundingSphere.center.toArray(),radius:s.boundingSphere.radius}),this.boundingBox!==null&&(s.boundingBox={min:s.boundingBox.min.toArray(),max:s.boundingBox.max.toArray()}));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=a(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];a(t.shapes,d)}else a(t.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(t.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(t.materials,this.material[l]));s.material=o}else s.material=a(t.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(a(t.animations,l))}}if(e){const o=r(t.geometries),l=r(t.materials),c=r(t.textures),h=r(t.images),d=r(t.shapes),u=r(t.skeletons),m=r(t.animations),g=r(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),m.length>0&&(n.animations=m),g.length>0&&(n.nodes=g)}return n.object=s,n;function r(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const s=t.children[n];this.add(s.clone())}return this}}ve.DEFAULT_UP=new T(0,1,0);ve.DEFAULT_MATRIX_AUTO_UPDATE=!0;ve.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const tn=new T,mn=new T,qa=new T,gn=new T,xi=new T,yi=new T,rl=new T,Xa=new T,Ya=new T,ja=new T,Ka=new Jt,Za=new Jt,Qa=new Jt;class je{constructor(t=new T,e=new T,n=new T){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,s){s.subVectors(n,e),tn.subVectors(t,e),s.cross(tn);const a=s.lengthSq();return a>0?s.multiplyScalar(1/Math.sqrt(a)):s.set(0,0,0)}static getBarycoord(t,e,n,s,a){tn.subVectors(s,e),mn.subVectors(n,e),qa.subVectors(t,e);const r=tn.dot(tn),o=tn.dot(mn),l=tn.dot(qa),c=mn.dot(mn),h=mn.dot(qa),d=r*c-o*o;if(d===0)return a.set(0,0,0),null;const u=1/d,m=(c*l-o*h)*u,g=(r*h-o*l)*u;return a.set(1-m-g,g,m)}static containsPoint(t,e,n,s){return this.getBarycoord(t,e,n,s,gn)===null?!1:gn.x>=0&&gn.y>=0&&gn.x+gn.y<=1}static getInterpolation(t,e,n,s,a,r,o,l){return this.getBarycoord(t,e,n,s,gn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,gn.x),l.addScaledVector(r,gn.y),l.addScaledVector(o,gn.z),l)}static getInterpolatedAttribute(t,e,n,s,a,r){return Ka.setScalar(0),Za.setScalar(0),Qa.setScalar(0),Ka.fromBufferAttribute(t,e),Za.fromBufferAttribute(t,n),Qa.fromBufferAttribute(t,s),r.setScalar(0),r.addScaledVector(Ka,a.x),r.addScaledVector(Za,a.y),r.addScaledVector(Qa,a.z),r}static isFrontFacing(t,e,n,s){return tn.subVectors(n,e),mn.subVectors(t,e),tn.cross(mn).dot(s)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,s){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[s]),this}setFromAttributeAndIndices(t,e,n,s){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,s),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return tn.subVectors(this.c,this.b),mn.subVectors(this.a,this.b),tn.cross(mn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return je.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return je.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,s,a){return je.getInterpolation(t,this.a,this.b,this.c,e,n,s,a)}containsPoint(t){return je.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return je.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,s=this.b,a=this.c;let r,o;xi.subVectors(s,n),yi.subVectors(a,n),Xa.subVectors(t,n);const l=xi.dot(Xa),c=yi.dot(Xa);if(l<=0&&c<=0)return e.copy(n);Ya.subVectors(t,s);const h=xi.dot(Ya),d=yi.dot(Ya);if(h>=0&&d<=h)return e.copy(s);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return r=l/(l-h),e.copy(n).addScaledVector(xi,r);ja.subVectors(t,a);const m=xi.dot(ja),g=yi.dot(ja);if(g>=0&&m<=g)return e.copy(a);const _=m*c-l*g;if(_<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(yi,o);const p=h*g-m*d;if(p<=0&&d-h>=0&&m-g>=0)return rl.subVectors(a,s),o=(d-h)/(d-h+(m-g)),e.copy(s).addScaledVector(rl,o);const f=1/(p+_+u);return r=_*f,o=u*f,e.copy(n).addScaledVector(xi,r).addScaledVector(yi,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Ec={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Rn={h:0,s:0,l:0},Ps={h:0,s:0,l:0};function Ja(i,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?i+(t-i)*6*e:e<1/2?t:e<2/3?i+(t-i)*6*(2/3-e):i}class St{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const s=t;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=We){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Kt.toWorkingColorSpace(this,e),this}setRGB(t,e,n,s=Kt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Kt.toWorkingColorSpace(this,s),this}setHSL(t,e,n,s=Kt.workingColorSpace){if(t=Yh(t,1),e=Ce(e,0,1),n=Ce(n,0,1),e===0)this.r=this.g=this.b=n;else{const a=n<=.5?n*(1+e):n+e-n*e,r=2*n-a;this.r=Ja(r,a,t+1/3),this.g=Ja(r,a,t),this.b=Ja(r,a,t-1/3)}return Kt.toWorkingColorSpace(this,s),this}setStyle(t,e=We){function n(a){a!==void 0&&parseFloat(a)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(t)){let a;const r=s[1],o=s[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,e);if(a=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setRGB(Math.min(100,parseInt(a[1],10))/100,Math.min(100,parseInt(a[2],10))/100,Math.min(100,parseInt(a[3],10))/100,e);break;case"hsl":case"hsla":if(a=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(t)){const a=s[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(a,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=We){const n=Ec[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=zi(t.r),this.g=zi(t.g),this.b=zi(t.b),this}copyLinearToSRGB(t){return this.r=ka(t.r),this.g=ka(t.g),this.b=ka(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=We){return Kt.fromWorkingColorSpace(Ae.copy(this),t),Math.round(Ce(Ae.r*255,0,255))*65536+Math.round(Ce(Ae.g*255,0,255))*256+Math.round(Ce(Ae.b*255,0,255))}getHexString(t=We){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Kt.workingColorSpace){Kt.fromWorkingColorSpace(Ae.copy(this),e);const n=Ae.r,s=Ae.g,a=Ae.b,r=Math.max(n,s,a),o=Math.min(n,s,a);let l,c;const h=(o+r)/2;if(o===r)l=0,c=0;else{const d=r-o;switch(c=h<=.5?d/(r+o):d/(2-r-o),r){case n:l=(s-a)/d+(s<a?6:0);break;case s:l=(a-n)/d+2;break;case a:l=(n-s)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Kt.workingColorSpace){return Kt.fromWorkingColorSpace(Ae.copy(this),e),t.r=Ae.r,t.g=Ae.g,t.b=Ae.b,t}getStyle(t=We){Kt.fromWorkingColorSpace(Ae.copy(this),t);const e=Ae.r,n=Ae.g,s=Ae.b;return t!==We?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(t,e,n){return this.getHSL(Rn),this.setHSL(Rn.h+t,Rn.s+e,Rn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Rn),t.getHSL(Ps);const n=Na(Rn.h,Ps.h,e),s=Na(Rn.s,Ps.s,e),a=Na(Rn.l,Ps.l,e);return this.setHSL(n,s,a),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,s=this.b,a=t.elements;return this.r=a[0]*e+a[3]*n+a[6]*s,this.g=a[1]*e+a[4]*n+a[7]*s,this.b=a[2]*e+a[5]*n+a[8]*s,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ae=new St;St.NAMES=Ec;let ud=0;class Gn extends ji{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ud++}),this.uuid=kn(),this.name="",this.type="Material",this.blending=ai,this.side=Bn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=yo,this.blendDst=bo,this.blendEquation=Jn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new St(0,0,0),this.blendAlpha=0,this.depthFunc=Gi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Yr,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ui,this.stencilZFail=ui,this.stencilZPass=ui,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const s=this[e];if(s===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ai&&(n.blending=this.blending),this.side!==Bn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==yo&&(n.blendSrc=this.blendSrc),this.blendDst!==bo&&(n.blendDst=this.blendDst),this.blendEquation!==Jn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Gi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Yr&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ui&&(n.stencilFail=this.stencilFail),this.stencilZFail!==ui&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==ui&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(a){const r=[];for(const o in a){const l=a[o];delete l.metadata,r.push(l)}return r}if(e){const a=s(t.textures),r=s(t.images);a.length>0&&(n.textures=a),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const s=e.length;n=new Array(s);for(let a=0;a!==s;++a)n[a]=e[a].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}}class On extends Gn{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new St(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ge,this.combine=lc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const me=new T,Ls=new Lt;class be{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=or,this.updateRanges=[],this.gpuType=cn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let s=0,a=this.itemSize;s<a;s++)this.array[t+s]=e.array[n+s];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ls.fromBufferAttribute(this,e),Ls.applyMatrix3(t),this.setXY(e,Ls.x,Ls.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.applyMatrix3(t),this.setXYZ(e,me.x,me.y,me.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.applyMatrix4(t),this.setXYZ(e,me.x,me.y,me.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.applyNormalMatrix(t),this.setXYZ(e,me.x,me.y,me.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.transformDirection(t),this.setXYZ(e,me.x,me.y,me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=ln(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Qt(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=ln(e,this.array)),e}setX(t,e){return this.normalized&&(e=Qt(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=ln(e,this.array)),e}setY(t,e){return this.normalized&&(e=Qt(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=ln(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Qt(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=ln(e,this.array)),e}setW(t,e){return this.normalized&&(e=Qt(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Qt(e,this.array),n=Qt(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,s){return t*=this.itemSize,this.normalized&&(e=Qt(e,this.array),n=Qt(n,this.array),s=Qt(s,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this}setXYZW(t,e,n,s,a){return t*=this.itemSize,this.normalized&&(e=Qt(e,this.array),n=Qt(n,this.array),s=Qt(s,this.array),a=Qt(a,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=s,this.array[t+3]=a,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==or&&(t.usage=this.usage),t}}class Ac extends be{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Cc extends be{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ne extends be{constructor(t,e,n){super(new Float32Array(t),e,n)}}let fd=0;const Xe=new qt,to=new ve,bi=new T,Ve=new ci,ns=new ci,ye=new T;class le extends ji{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:fd++}),this.uuid=kn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(bc(t)?Cc:Ac)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const a=new Ft().getNormalMatrix(t);n.applyNormalMatrix(a),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(t),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return Xe.makeRotationFromQuaternion(t),this.applyMatrix4(Xe),this}rotateX(t){return Xe.makeRotationX(t),this.applyMatrix4(Xe),this}rotateY(t){return Xe.makeRotationY(t),this.applyMatrix4(Xe),this}rotateZ(t){return Xe.makeRotationZ(t),this.applyMatrix4(Xe),this}translate(t,e,n){return Xe.makeTranslation(t,e,n),this.applyMatrix4(Xe),this}scale(t,e,n){return Xe.makeScale(t,e,n),this.applyMatrix4(Xe),this}lookAt(t){return to.lookAt(t),to.updateMatrix(),this.applyMatrix4(to.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(bi).negate(),this.translate(bi.x,bi.y,bi.z),this}setFromPoints(t){const e=[];for(let n=0,s=t.length;n<s;n++){const a=t[n];e.push(a.x,a.y,a.z||0)}return this.setAttribute("position",new ne(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new ci);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new T(-1/0,-1/0,-1/0),new T(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,s=e.length;n<s;n++){const a=e[n];Ve.setFromBufferAttribute(a),this.morphTargetsRelative?(ye.addVectors(this.boundingBox.min,Ve.min),this.boundingBox.expandByPoint(ye),ye.addVectors(this.boundingBox.max,Ve.max),this.boundingBox.expandByPoint(ye)):(this.boundingBox.expandByPoint(Ve.min),this.boundingBox.expandByPoint(Ve.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new hi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new T,1/0);return}if(t){const n=this.boundingSphere.center;if(Ve.setFromBufferAttribute(t),e)for(let a=0,r=e.length;a<r;a++){const o=e[a];ns.setFromBufferAttribute(o),this.morphTargetsRelative?(ye.addVectors(Ve.min,ns.min),Ve.expandByPoint(ye),ye.addVectors(Ve.max,ns.max),Ve.expandByPoint(ye)):(Ve.expandByPoint(ns.min),Ve.expandByPoint(ns.max))}Ve.getCenter(n);let s=0;for(let a=0,r=t.count;a<r;a++)ye.fromBufferAttribute(t,a),s=Math.max(s,n.distanceToSquared(ye));if(e)for(let a=0,r=e.length;a<r;a++){const o=e[a],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)ye.fromBufferAttribute(o,c),l&&(bi.fromBufferAttribute(t,c),ye.add(bi)),s=Math.max(s,n.distanceToSquared(ye))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,s=e.normal,a=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new be(new Float32Array(4*n.count),4));const r=this.getAttribute("tangent"),o=[],l=[];for(let L=0;L<n.count;L++)o[L]=new T,l[L]=new T;const c=new T,h=new T,d=new T,u=new Lt,m=new Lt,g=new Lt,_=new T,p=new T;function f(L,I,v){c.fromBufferAttribute(n,L),h.fromBufferAttribute(n,I),d.fromBufferAttribute(n,v),u.fromBufferAttribute(a,L),m.fromBufferAttribute(a,I),g.fromBufferAttribute(a,v),h.sub(c),d.sub(c),m.sub(u),g.sub(u);const M=1/(m.x*g.y-g.x*m.y);isFinite(M)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(d,-m.y).multiplyScalar(M),p.copy(d).multiplyScalar(m.x).addScaledVector(h,-g.x).multiplyScalar(M),o[L].add(_),o[I].add(_),o[v].add(_),l[L].add(p),l[I].add(p),l[v].add(p))}let b=this.groups;b.length===0&&(b=[{start:0,count:t.count}]);for(let L=0,I=b.length;L<I;++L){const v=b[L],M=v.start,U=v.count;for(let k=M,z=M+U;k<z;k+=3)f(t.getX(k+0),t.getX(k+1),t.getX(k+2))}const x=new T,S=new T,R=new T,C=new T;function A(L){R.fromBufferAttribute(s,L),C.copy(R);const I=o[L];x.copy(I),x.sub(R.multiplyScalar(R.dot(I))).normalize(),S.crossVectors(C,I);const M=S.dot(l[L])<0?-1:1;r.setXYZW(L,x.x,x.y,x.z,M)}for(let L=0,I=b.length;L<I;++L){const v=b[L],M=v.start,U=v.count;for(let k=M,z=M+U;k<z;k+=3)A(t.getX(k+0)),A(t.getX(k+1)),A(t.getX(k+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new be(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,m=n.count;u<m;u++)n.setXYZ(u,0,0,0);const s=new T,a=new T,r=new T,o=new T,l=new T,c=new T,h=new T,d=new T;if(t)for(let u=0,m=t.count;u<m;u+=3){const g=t.getX(u+0),_=t.getX(u+1),p=t.getX(u+2);s.fromBufferAttribute(e,g),a.fromBufferAttribute(e,_),r.fromBufferAttribute(e,p),h.subVectors(r,a),d.subVectors(s,a),h.cross(d),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,_),c.fromBufferAttribute(n,p),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,l.x,l.y,l.z),n.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,m=e.count;u<m;u+=3)s.fromBufferAttribute(e,u+0),a.fromBufferAttribute(e,u+1),r.fromBufferAttribute(e,u+2),h.subVectors(r,a),d.subVectors(s,a),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)ye.fromBufferAttribute(t,e),ye.normalize(),t.setXYZ(e,ye.x,ye.y,ye.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,d=o.normalized,u=new c.constructor(l.length*h);let m=0,g=0;for(let _=0,p=l.length;_<p;_++){o.isInterleavedBufferAttribute?m=l[_]*o.data.stride+o.offset:m=l[_]*h;for(let f=0;f<h;f++)u[g++]=c[m++]}return new be(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new le,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=t(l,n);e.setAttribute(o,c)}const a=this.morphAttributes;for(const o in a){const l=[],c=a[o];for(let h=0,d=c.length;h<d;h++){const u=c[h],m=t(u,n);l.push(m)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const s={};let a=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const m=c[d];h.push(m.toJSON(t.data))}h.length>0&&(s[l]=h,a=!0)}a&&(t.data.morphAttributes=s,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const s=t.attributes;for(const c in s){const h=s[c];this.setAttribute(c,h.clone(e))}const a=t.morphAttributes;for(const c in a){const h=[],d=a[c];for(let u=0,m=d.length;u<m;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let c=0,h=r.length;c<h;c++){const d=r[c];this.addGroup(d.start,d.count,d.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ll=new qt,qn=new wr,Is=new hi,cl=new T,Ds=new T,Us=new T,Ns=new T,eo=new T,Fs=new T,hl=new T,ks=new T;class tt extends ve{constructor(t=new le,e=new On){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(t,e){const n=this.geometry,s=n.attributes.position,a=n.morphAttributes.position,r=n.morphTargetsRelative;e.fromBufferAttribute(s,t);const o=this.morphTargetInfluences;if(a&&o){Fs.set(0,0,0);for(let l=0,c=a.length;l<c;l++){const h=o[l],d=a[l];h!==0&&(eo.fromBufferAttribute(d,t),r?Fs.addScaledVector(eo,h):Fs.addScaledVector(eo.sub(e),h))}e.add(Fs)}return e}raycast(t,e){const n=this.geometry,s=this.material,a=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Is.copy(n.boundingSphere),Is.applyMatrix4(a),qn.copy(t.ray).recast(t.near),!(Is.containsPoint(qn.origin)===!1&&(qn.intersectSphere(Is,cl)===null||qn.origin.distanceToSquared(cl)>(t.far-t.near)**2))&&(ll.copy(a).invert(),qn.copy(t.ray).applyMatrix4(ll),!(n.boundingBox!==null&&qn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,qn)))}_computeIntersections(t,e,n){let s;const a=this.geometry,r=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,h=a.attributes.uv1,d=a.attributes.normal,u=a.groups,m=a.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,_=u.length;g<_;g++){const p=u[g],f=r[p.materialIndex],b=Math.max(p.start,m.start),x=Math.min(o.count,Math.min(p.start+p.count,m.start+m.count));for(let S=b,R=x;S<R;S+=3){const C=o.getX(S),A=o.getX(S+1),L=o.getX(S+2);s=Os(this,f,t,n,c,h,d,C,A,L),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,m.start),_=Math.min(o.count,m.start+m.count);for(let p=g,f=_;p<f;p+=3){const b=o.getX(p),x=o.getX(p+1),S=o.getX(p+2);s=Os(this,r,t,n,c,h,d,b,x,S),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,_=u.length;g<_;g++){const p=u[g],f=r[p.materialIndex],b=Math.max(p.start,m.start),x=Math.min(l.count,Math.min(p.start+p.count,m.start+m.count));for(let S=b,R=x;S<R;S+=3){const C=S,A=S+1,L=S+2;s=Os(this,f,t,n,c,h,d,C,A,L),s&&(s.faceIndex=Math.floor(S/3),s.face.materialIndex=p.materialIndex,e.push(s))}}else{const g=Math.max(0,m.start),_=Math.min(l.count,m.start+m.count);for(let p=g,f=_;p<f;p+=3){const b=p,x=p+1,S=p+2;s=Os(this,r,t,n,c,h,d,b,x,S),s&&(s.faceIndex=Math.floor(p/3),e.push(s))}}}}function pd(i,t,e,n,s,a,r,o){let l;if(t.side===Ne?l=n.intersectTriangle(r,a,s,!0,o):l=n.intersectTriangle(s,a,r,t.side===Bn,o),l===null)return null;ks.copy(o),ks.applyMatrix4(i.matrixWorld);const c=e.ray.origin.distanceTo(ks);return c<e.near||c>e.far?null:{distance:c,point:ks.clone(),object:i}}function Os(i,t,e,n,s,a,r,o,l,c){i.getVertexPosition(o,Ds),i.getVertexPosition(l,Us),i.getVertexPosition(c,Ns);const h=pd(i,t,e,n,Ds,Us,Ns,hl);if(h){const d=new T;je.getBarycoord(hl,Ds,Us,Ns,d),s&&(h.uv=je.getInterpolatedAttribute(s,o,l,c,d,new Lt)),a&&(h.uv1=je.getInterpolatedAttribute(a,o,l,c,d,new Lt)),r&&(h.normal=je.getInterpolatedAttribute(r,o,l,c,d,new T),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new T,materialIndex:0};je.getNormal(Ds,Us,Ns,u.normal),h.face=u,h.barycoord=d}return h}class re extends le{constructor(t=1,e=1,n=1,s=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:s,heightSegments:a,depthSegments:r};const o=this;s=Math.floor(s),a=Math.floor(a),r=Math.floor(r);const l=[],c=[],h=[],d=[];let u=0,m=0;g("z","y","x",-1,-1,n,e,t,r,a,0),g("z","y","x",1,-1,n,e,-t,r,a,1),g("x","z","y",1,1,t,n,e,s,r,2),g("x","z","y",1,-1,t,n,-e,s,r,3),g("x","y","z",1,-1,t,e,n,s,a,4),g("x","y","z",-1,-1,t,e,-n,s,a,5),this.setIndex(l),this.setAttribute("position",new ne(c,3)),this.setAttribute("normal",new ne(h,3)),this.setAttribute("uv",new ne(d,2));function g(_,p,f,b,x,S,R,C,A,L,I){const v=S/A,M=R/L,U=S/2,k=R/2,z=C/2,X=A+1,O=L+1;let Y=0,V=0;const J=new T;for(let ot=0;ot<O;ot++){const ft=ot*M-k;for(let zt=0;zt<X;zt++){const kt=zt*v-U;J[_]=kt*b,J[p]=ft*x,J[f]=z,c.push(J.x,J.y,J.z),J[_]=0,J[p]=0,J[f]=C>0?1:-1,h.push(J.x,J.y,J.z),d.push(zt/A),d.push(1-ot/L),Y+=1}}for(let ot=0;ot<L;ot++)for(let ft=0;ft<A;ft++){const zt=u+ft+X*ot,kt=u+ft+X*(ot+1),q=u+(ft+1)+X*(ot+1),$=u+(ft+1)+X*ot;l.push(zt,kt,$),l.push(kt,q,$),V+=6}o.addGroup(m,V,I),m+=V,u+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new re(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Xi(i){const t={};for(const e in i){t[e]={};for(const n in i[e]){const s=i[e][n];s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)?s.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=s.clone():Array.isArray(s)?t[e][n]=s.slice():t[e][n]=s}}return t}function De(i){const t={};for(let e=0;e<i.length;e++){const n=Xi(i[e]);for(const s in n)t[s]=n[s]}return t}function md(i){const t=[];for(let e=0;e<i.length;e++)t.push(i[e].clone());return t}function Rc(i){const t=i.getRenderTarget();return t===null?i.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Kt.workingColorSpace}const gd={clone:Xi,merge:De};var vd=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,_d=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class wn extends Gn{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=vd,this.fragmentShader=_d,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Xi(t.uniforms),this.uniformsGroups=md(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const s in this.uniforms){const r=this.uniforms[s].value;r&&r.isTexture?e.uniforms[s]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[s]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[s]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[s]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[s]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[s]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[s]={type:"m4",value:r.toArray()}:e.uniforms[s]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Pc extends ve{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new qt,this.projectionMatrix=new qt,this.projectionMatrixInverse=new qt,this.coordinateSystem=xn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Pn=new T,dl=new Lt,ul=new Lt;class Re extends Pc{constructor(t=50,e=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=rr*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ua*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return rr*2*Math.atan(Math.tan(Ua*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Pn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Pn.x,Pn.y).multiplyScalar(-t/Pn.z),Pn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Pn.x,Pn.y).multiplyScalar(-t/Pn.z)}getViewSize(t,e){return this.getViewBounds(t,dl,ul),e.subVectors(ul,dl)}setViewOffset(t,e,n,s,a,r){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ua*.5*this.fov)/this.zoom,n=2*e,s=this.aspect*n,a=-.5*s;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;a+=r.offsetX*s/l,e-=r.offsetY*n/c,s*=r.width/l,n*=r.height/c}const o=this.filmOffset;o!==0&&(a+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+s,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const wi=-90,Si=1;class Md extends ve{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new Re(wi,Si,t,e);s.layers=this.layers,this.add(s);const a=new Re(wi,Si,t,e);a.layers=this.layers,this.add(a);const r=new Re(wi,Si,t,e);r.layers=this.layers,this.add(r);const o=new Re(wi,Si,t,e);o.layers=this.layers,this.add(o);const l=new Re(wi,Si,t,e);l.layers=this.layers,this.add(l);const c=new Re(wi,Si,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,s,a,r,o,l]=e;for(const c of e)this.remove(c);if(t===xn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===pa)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[a,r,o,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),m=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,s),t.render(e,a),t.setRenderTarget(n,1,s),t.render(e,r),t.setRenderTarget(n,2,s),t.render(e,o),t.setRenderTarget(n,3,s),t.render(e,l),t.setRenderTarget(n,4,s),t.render(e,c),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,s),t.render(e,h),t.setRenderTarget(d,u,m),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Lc extends Pe{constructor(t,e,n,s,a,r,o,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:Vi,super(t,e,n,s,a,r,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class xd extends li{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},s=[n,n,n,n,n,n];this.texture=new Lc(s,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:an}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new re(5,5,5),a=new wn({name:"CubemapFromEquirect",uniforms:Xi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ne,blending:Nn});a.uniforms.tEquirect.value=e;const r=new tt(s,a),o=e.minFilter;return e.minFilter===ii&&(e.minFilter=an),new Md(1,10,this).update(t,r),e.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(t,e,n,s){const a=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,n,s);t.setRenderTarget(a)}}const no=new T,yd=new T,bd=new Ft;class Zn{constructor(t=new T(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,s){return this.normal.set(t,e,n),this.constant=s,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const s=no.subVectors(n,e).cross(yd.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(s,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(no),s=this.normal.dot(n);if(s===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/s;return a<0||a>1?null:e.copy(t.start).addScaledVector(n,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||bd.getNormalMatrix(t),s=this.coplanarPoint(no).applyMatrix4(t),a=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(a),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const Xn=new hi,Bs=new T;class Sr{constructor(t=new Zn,e=new Zn,n=new Zn,s=new Zn,a=new Zn,r=new Zn){this.planes=[t,e,n,s,a,r]}set(t,e,n,s,a,r){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(s),o[4].copy(a),o[5].copy(r),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=xn){const n=this.planes,s=t.elements,a=s[0],r=s[1],o=s[2],l=s[3],c=s[4],h=s[5],d=s[6],u=s[7],m=s[8],g=s[9],_=s[10],p=s[11],f=s[12],b=s[13],x=s[14],S=s[15];if(n[0].setComponents(l-a,u-c,p-m,S-f).normalize(),n[1].setComponents(l+a,u+c,p+m,S+f).normalize(),n[2].setComponents(l+r,u+h,p+g,S+b).normalize(),n[3].setComponents(l-r,u-h,p-g,S-b).normalize(),n[4].setComponents(l-o,u-d,p-_,S-x).normalize(),e===xn)n[5].setComponents(l+o,u+d,p+_,S+x).normalize();else if(e===pa)n[5].setComponents(o,d,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),Xn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),Xn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(Xn)}intersectsSprite(t){return Xn.center.set(0,0,0),Xn.radius=.7071067811865476,Xn.applyMatrix4(t.matrixWorld),this.intersectsSphere(Xn)}intersectsSphere(t){const e=this.planes,n=t.center,s=-t.radius;for(let a=0;a<6;a++)if(e[a].distanceToPoint(n)<s)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const s=e[n];if(Bs.x=s.normal.x>0?t.max.x:t.min.x,Bs.y=s.normal.y>0?t.max.y:t.min.y,Bs.z=s.normal.z>0?t.max.z:t.min.z,s.distanceToPoint(Bs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Ic(){let i=null,t=!1,e=null,n=null;function s(a,r){e(a,r),n=i.requestAnimationFrame(s)}return{start:function(){t!==!0&&e!==null&&(n=i.requestAnimationFrame(s),t=!0)},stop:function(){i.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(a){e=a},setContext:function(a){i=a}}}function wd(i){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,d=c.byteLength,u=i.createBuffer();i.bindBuffer(l,u),i.bufferData(l,c,h),o.onUploadCallback();let m;if(c instanceof Float32Array)m=i.FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=i.SHORT;else if(c instanceof Uint32Array)m=i.UNSIGNED_INT;else if(c instanceof Int32Array)m=i.INT;else if(c instanceof Int8Array)m=i.BYTE;else if(c instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,l,c){const h=l.array,d=l.updateRanges;if(i.bindBuffer(c,o),d.length===0)i.bufferSubData(c,0,h);else{d.sort((m,g)=>m.start-g.start);let u=0;for(let m=1;m<d.length;m++){const g=d[u],_=d[m];_.start<=g.start+g.count+1?g.count=Math.max(g.count,_.start+_.count-g.start):(++u,d[u]=_)}d.length=u+1;for(let m=0,g=d.length;m<g;m++){const _=d[m];i.bufferSubData(c,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(i.deleteBuffer(l.buffer),t.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:a,update:r}}class zn extends le{constructor(t=1,e=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:s};const a=t/2,r=e/2,o=Math.floor(n),l=Math.floor(s),c=o+1,h=l+1,d=t/o,u=e/l,m=[],g=[],_=[],p=[];for(let f=0;f<h;f++){const b=f*u-r;for(let x=0;x<c;x++){const S=x*d-a;g.push(S,-b,0),_.push(0,0,1),p.push(x/o),p.push(1-f/l)}}for(let f=0;f<l;f++)for(let b=0;b<o;b++){const x=b+c*f,S=b+c*(f+1),R=b+1+c*(f+1),C=b+1+c*f;m.push(x,S,C),m.push(S,R,C)}this.setIndex(m),this.setAttribute("position",new ne(g,3)),this.setAttribute("normal",new ne(_,3)),this.setAttribute("uv",new ne(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new zn(t.width,t.height,t.widthSegments,t.heightSegments)}}var Sd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Td=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Ed=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Ad=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Cd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Rd=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Pd=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Ld=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Id=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,Dd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ud=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Nd=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Fd=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,kd=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Od=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Bd=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,zd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Hd=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Gd=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Vd=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Wd=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,$d=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,qd=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Xd=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Yd=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,jd=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Kd=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Zd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Qd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Jd=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,tu="gl_FragColor = linearToOutputTexel( gl_FragColor );",eu=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,nu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,iu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,su=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,au=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ou=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ru=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,lu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,cu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,hu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,du=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,uu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,fu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,pu=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,mu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,gu=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,vu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,_u=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Mu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,xu=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,yu=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,bu=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,wu=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Su=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Tu=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Eu=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Au=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Cu=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ru=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Pu=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Lu=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Iu=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Du=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Uu=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Nu=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Fu=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ku=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Ou=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Bu=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,zu=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Hu=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Gu=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Vu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Wu=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,$u=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,qu=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Xu=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Yu=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ju=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Ku=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Zu=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Qu=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Ju=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,tf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,ef=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,nf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,sf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,af=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,of=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,rf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,lf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,cf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,hf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,df=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,uf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,ff=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,pf=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,mf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,gf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,vf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,_f=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Mf=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,xf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,yf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,bf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,wf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Sf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Tf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ef=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Af=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Rf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Pf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Lf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,If=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,Df=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,Uf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Nf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Ff=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,kf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Of=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Bf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,zf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Hf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Gf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,Vf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Wf=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,$f=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,qf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Xf=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Yf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,jf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Kf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Zf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Qf=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Jf=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,tp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ep=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,np=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ip=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Nt={alphahash_fragment:Sd,alphahash_pars_fragment:Td,alphamap_fragment:Ed,alphamap_pars_fragment:Ad,alphatest_fragment:Cd,alphatest_pars_fragment:Rd,aomap_fragment:Pd,aomap_pars_fragment:Ld,batching_pars_vertex:Id,batching_vertex:Dd,begin_vertex:Ud,beginnormal_vertex:Nd,bsdfs:Fd,iridescence_fragment:kd,bumpmap_pars_fragment:Od,clipping_planes_fragment:Bd,clipping_planes_pars_fragment:zd,clipping_planes_pars_vertex:Hd,clipping_planes_vertex:Gd,color_fragment:Vd,color_pars_fragment:Wd,color_pars_vertex:$d,color_vertex:qd,common:Xd,cube_uv_reflection_fragment:Yd,defaultnormal_vertex:jd,displacementmap_pars_vertex:Kd,displacementmap_vertex:Zd,emissivemap_fragment:Qd,emissivemap_pars_fragment:Jd,colorspace_fragment:tu,colorspace_pars_fragment:eu,envmap_fragment:nu,envmap_common_pars_fragment:iu,envmap_pars_fragment:su,envmap_pars_vertex:au,envmap_physical_pars_fragment:gu,envmap_vertex:ou,fog_vertex:ru,fog_pars_vertex:lu,fog_fragment:cu,fog_pars_fragment:hu,gradientmap_pars_fragment:du,lightmap_pars_fragment:uu,lights_lambert_fragment:fu,lights_lambert_pars_fragment:pu,lights_pars_begin:mu,lights_toon_fragment:vu,lights_toon_pars_fragment:_u,lights_phong_fragment:Mu,lights_phong_pars_fragment:xu,lights_physical_fragment:yu,lights_physical_pars_fragment:bu,lights_fragment_begin:wu,lights_fragment_maps:Su,lights_fragment_end:Tu,logdepthbuf_fragment:Eu,logdepthbuf_pars_fragment:Au,logdepthbuf_pars_vertex:Cu,logdepthbuf_vertex:Ru,map_fragment:Pu,map_pars_fragment:Lu,map_particle_fragment:Iu,map_particle_pars_fragment:Du,metalnessmap_fragment:Uu,metalnessmap_pars_fragment:Nu,morphinstance_vertex:Fu,morphcolor_vertex:ku,morphnormal_vertex:Ou,morphtarget_pars_vertex:Bu,morphtarget_vertex:zu,normal_fragment_begin:Hu,normal_fragment_maps:Gu,normal_pars_fragment:Vu,normal_pars_vertex:Wu,normal_vertex:$u,normalmap_pars_fragment:qu,clearcoat_normal_fragment_begin:Xu,clearcoat_normal_fragment_maps:Yu,clearcoat_pars_fragment:ju,iridescence_pars_fragment:Ku,opaque_fragment:Zu,packing:Qu,premultiplied_alpha_fragment:Ju,project_vertex:tf,dithering_fragment:ef,dithering_pars_fragment:nf,roughnessmap_fragment:sf,roughnessmap_pars_fragment:af,shadowmap_pars_fragment:of,shadowmap_pars_vertex:rf,shadowmap_vertex:lf,shadowmask_pars_fragment:cf,skinbase_vertex:hf,skinning_pars_vertex:df,skinning_vertex:uf,skinnormal_vertex:ff,specularmap_fragment:pf,specularmap_pars_fragment:mf,tonemapping_fragment:gf,tonemapping_pars_fragment:vf,transmission_fragment:_f,transmission_pars_fragment:Mf,uv_pars_fragment:xf,uv_pars_vertex:yf,uv_vertex:bf,worldpos_vertex:wf,background_vert:Sf,background_frag:Tf,backgroundCube_vert:Ef,backgroundCube_frag:Af,cube_vert:Cf,cube_frag:Rf,depth_vert:Pf,depth_frag:Lf,distanceRGBA_vert:If,distanceRGBA_frag:Df,equirect_vert:Uf,equirect_frag:Nf,linedashed_vert:Ff,linedashed_frag:kf,meshbasic_vert:Of,meshbasic_frag:Bf,meshlambert_vert:zf,meshlambert_frag:Hf,meshmatcap_vert:Gf,meshmatcap_frag:Vf,meshnormal_vert:Wf,meshnormal_frag:$f,meshphong_vert:qf,meshphong_frag:Xf,meshphysical_vert:Yf,meshphysical_frag:jf,meshtoon_vert:Kf,meshtoon_frag:Zf,points_vert:Qf,points_frag:Jf,shadow_vert:tp,shadow_frag:ep,sprite_vert:np,sprite_frag:ip},rt={common:{diffuse:{value:new St(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ft}},envmap:{envMap:{value:null},envMapRotation:{value:new Ft},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ft}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ft}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ft},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ft},normalScale:{value:new Lt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ft},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ft}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ft}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ft}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new St(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new St(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0},uvTransform:{value:new Ft}},sprite:{diffuse:{value:new St(16777215)},opacity:{value:1},center:{value:new Lt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ft},alphaMap:{value:null},alphaMapTransform:{value:new Ft},alphaTest:{value:0}}},rn={basic:{uniforms:De([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.fog]),vertexShader:Nt.meshbasic_vert,fragmentShader:Nt.meshbasic_frag},lambert:{uniforms:De([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new St(0)}}]),vertexShader:Nt.meshlambert_vert,fragmentShader:Nt.meshlambert_frag},phong:{uniforms:De([rt.common,rt.specularmap,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,rt.lights,{emissive:{value:new St(0)},specular:{value:new St(1118481)},shininess:{value:30}}]),vertexShader:Nt.meshphong_vert,fragmentShader:Nt.meshphong_frag},standard:{uniforms:De([rt.common,rt.envmap,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.roughnessmap,rt.metalnessmap,rt.fog,rt.lights,{emissive:{value:new St(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Nt.meshphysical_vert,fragmentShader:Nt.meshphysical_frag},toon:{uniforms:De([rt.common,rt.aomap,rt.lightmap,rt.emissivemap,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.gradientmap,rt.fog,rt.lights,{emissive:{value:new St(0)}}]),vertexShader:Nt.meshtoon_vert,fragmentShader:Nt.meshtoon_frag},matcap:{uniforms:De([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,rt.fog,{matcap:{value:null}}]),vertexShader:Nt.meshmatcap_vert,fragmentShader:Nt.meshmatcap_frag},points:{uniforms:De([rt.points,rt.fog]),vertexShader:Nt.points_vert,fragmentShader:Nt.points_frag},dashed:{uniforms:De([rt.common,rt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Nt.linedashed_vert,fragmentShader:Nt.linedashed_frag},depth:{uniforms:De([rt.common,rt.displacementmap]),vertexShader:Nt.depth_vert,fragmentShader:Nt.depth_frag},normal:{uniforms:De([rt.common,rt.bumpmap,rt.normalmap,rt.displacementmap,{opacity:{value:1}}]),vertexShader:Nt.meshnormal_vert,fragmentShader:Nt.meshnormal_frag},sprite:{uniforms:De([rt.sprite,rt.fog]),vertexShader:Nt.sprite_vert,fragmentShader:Nt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ft},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Nt.background_vert,fragmentShader:Nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ft}},vertexShader:Nt.backgroundCube_vert,fragmentShader:Nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Nt.cube_vert,fragmentShader:Nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Nt.equirect_vert,fragmentShader:Nt.equirect_frag},distanceRGBA:{uniforms:De([rt.common,rt.displacementmap,{referencePosition:{value:new T},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Nt.distanceRGBA_vert,fragmentShader:Nt.distanceRGBA_frag},shadow:{uniforms:De([rt.lights,rt.fog,{color:{value:new St(0)},opacity:{value:1}}]),vertexShader:Nt.shadow_vert,fragmentShader:Nt.shadow_frag}};rn.physical={uniforms:De([rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ft},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ft},clearcoatNormalScale:{value:new Lt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ft},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ft},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ft},sheen:{value:0},sheenColor:{value:new St(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ft},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ft},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ft},transmissionSamplerSize:{value:new Lt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ft},attenuationDistance:{value:0},attenuationColor:{value:new St(0)},specularColor:{value:new St(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ft},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ft},anisotropyVector:{value:new Lt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ft}}]),vertexShader:Nt.meshphysical_vert,fragmentShader:Nt.meshphysical_frag};const zs={r:0,b:0,g:0},Yn=new ge,sp=new qt;function ap(i,t,e,n,s,a,r){const o=new St(0);let l=a===!0?0:1,c,h,d=null,u=0,m=null;function g(b){let x=b.isScene===!0?b.background:null;return x&&x.isTexture&&(x=(b.backgroundBlurriness>0?e:t).get(x)),x}function _(b){let x=!1;const S=g(b);S===null?f(o,l):S&&S.isColor&&(f(S,1),x=!0);const R=i.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,r):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(i.autoClear||x)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function p(b,x){const S=g(x);S&&(S.isCubeTexture||S.mapping===wa)?(h===void 0&&(h=new tt(new re(1,1,1),new wn({name:"BackgroundCubeMaterial",uniforms:Xi(rn.backgroundCube.uniforms),vertexShader:rn.backgroundCube.vertexShader,fragmentShader:rn.backgroundCube.fragmentShader,side:Ne,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,C,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),s.update(h)),Yn.copy(x.backgroundRotation),Yn.x*=-1,Yn.y*=-1,Yn.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Yn.y*=-1,Yn.z*=-1),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(sp.makeRotationFromEuler(Yn)),h.material.toneMapped=Kt.getTransfer(S.colorSpace)!==ae,(d!==S||u!==S.version||m!==i.toneMapping)&&(h.material.needsUpdate=!0,d=S,u=S.version,m=i.toneMapping),h.layers.enableAll(),b.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(c===void 0&&(c=new tt(new zn(2,2),new wn({name:"BackgroundMaterial",uniforms:Xi(rn.background.uniforms),vertexShader:rn.background.vertexShader,fragmentShader:rn.background.fragmentShader,side:Bn,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),s.update(c)),c.material.uniforms.t2D.value=S,c.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,c.material.toneMapped=Kt.getTransfer(S.colorSpace)!==ae,S.matrixAutoUpdate===!0&&S.updateMatrix(),c.material.uniforms.uvTransform.value.copy(S.matrix),(d!==S||u!==S.version||m!==i.toneMapping)&&(c.material.needsUpdate=!0,d=S,u=S.version,m=i.toneMapping),c.layers.enableAll(),b.unshift(c,c.geometry,c.material,0,0,null))}function f(b,x){b.getRGB(zs,Rc(i)),n.buffers.color.setClear(zs.r,zs.g,zs.b,x,r)}return{getClearColor:function(){return o},setClearColor:function(b,x=1){o.set(b),l=x,f(o,l)},getClearAlpha:function(){return l},setClearAlpha:function(b){l=b,f(o,l)},render:_,addToRenderList:p}}function op(i,t){const e=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=u(null);let a=s,r=!1;function o(v,M,U,k,z){let X=!1;const O=d(k,U,M);a!==O&&(a=O,c(a.object)),X=m(v,k,U,z),X&&g(v,k,U,z),z!==null&&t.update(z,i.ELEMENT_ARRAY_BUFFER),(X||r)&&(r=!1,S(v,M,U,k),z!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,t.get(z).buffer))}function l(){return i.createVertexArray()}function c(v){return i.bindVertexArray(v)}function h(v){return i.deleteVertexArray(v)}function d(v,M,U){const k=U.wireframe===!0;let z=n[v.id];z===void 0&&(z={},n[v.id]=z);let X=z[M.id];X===void 0&&(X={},z[M.id]=X);let O=X[k];return O===void 0&&(O=u(l()),X[k]=O),O}function u(v){const M=[],U=[],k=[];for(let z=0;z<e;z++)M[z]=0,U[z]=0,k[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:M,enabledAttributes:U,attributeDivisors:k,object:v,attributes:{},index:null}}function m(v,M,U,k){const z=a.attributes,X=M.attributes;let O=0;const Y=U.getAttributes();for(const V in Y)if(Y[V].location>=0){const ot=z[V];let ft=X[V];if(ft===void 0&&(V==="instanceMatrix"&&v.instanceMatrix&&(ft=v.instanceMatrix),V==="instanceColor"&&v.instanceColor&&(ft=v.instanceColor)),ot===void 0||ot.attribute!==ft||ft&&ot.data!==ft.data)return!0;O++}return a.attributesNum!==O||a.index!==k}function g(v,M,U,k){const z={},X=M.attributes;let O=0;const Y=U.getAttributes();for(const V in Y)if(Y[V].location>=0){let ot=X[V];ot===void 0&&(V==="instanceMatrix"&&v.instanceMatrix&&(ot=v.instanceMatrix),V==="instanceColor"&&v.instanceColor&&(ot=v.instanceColor));const ft={};ft.attribute=ot,ot&&ot.data&&(ft.data=ot.data),z[V]=ft,O++}a.attributes=z,a.attributesNum=O,a.index=k}function _(){const v=a.newAttributes;for(let M=0,U=v.length;M<U;M++)v[M]=0}function p(v){f(v,0)}function f(v,M){const U=a.newAttributes,k=a.enabledAttributes,z=a.attributeDivisors;U[v]=1,k[v]===0&&(i.enableVertexAttribArray(v),k[v]=1),z[v]!==M&&(i.vertexAttribDivisor(v,M),z[v]=M)}function b(){const v=a.newAttributes,M=a.enabledAttributes;for(let U=0,k=M.length;U<k;U++)M[U]!==v[U]&&(i.disableVertexAttribArray(U),M[U]=0)}function x(v,M,U,k,z,X,O){O===!0?i.vertexAttribIPointer(v,M,U,z,X):i.vertexAttribPointer(v,M,U,k,z,X)}function S(v,M,U,k){_();const z=k.attributes,X=U.getAttributes(),O=M.defaultAttributeValues;for(const Y in X){const V=X[Y];if(V.location>=0){let J=z[Y];if(J===void 0&&(Y==="instanceMatrix"&&v.instanceMatrix&&(J=v.instanceMatrix),Y==="instanceColor"&&v.instanceColor&&(J=v.instanceColor)),J!==void 0){const ot=J.normalized,ft=J.itemSize,zt=t.get(J);if(zt===void 0)continue;const kt=zt.buffer,q=zt.type,$=zt.bytesPerElement,it=q===i.INT||q===i.UNSIGNED_INT||J.gpuType===mr;if(J.isInterleavedBufferAttribute){const nt=J.data,xt=nt.stride,pt=J.offset;if(nt.isInstancedInterleavedBuffer){for(let Dt=0;Dt<V.locationSize;Dt++)f(V.location+Dt,nt.meshPerAttribute);v.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let Dt=0;Dt<V.locationSize;Dt++)p(V.location+Dt);i.bindBuffer(i.ARRAY_BUFFER,kt);for(let Dt=0;Dt<V.locationSize;Dt++)x(V.location+Dt,ft/V.locationSize,q,ot,xt*$,(pt+ft/V.locationSize*Dt)*$,it)}else{if(J.isInstancedBufferAttribute){for(let nt=0;nt<V.locationSize;nt++)f(V.location+nt,J.meshPerAttribute);v.isInstancedMesh!==!0&&k._maxInstanceCount===void 0&&(k._maxInstanceCount=J.meshPerAttribute*J.count)}else for(let nt=0;nt<V.locationSize;nt++)p(V.location+nt);i.bindBuffer(i.ARRAY_BUFFER,kt);for(let nt=0;nt<V.locationSize;nt++)x(V.location+nt,ft/V.locationSize,q,ot,ft*$,ft/V.locationSize*nt*$,it)}}else if(O!==void 0){const ot=O[Y];if(ot!==void 0)switch(ot.length){case 2:i.vertexAttrib2fv(V.location,ot);break;case 3:i.vertexAttrib3fv(V.location,ot);break;case 4:i.vertexAttrib4fv(V.location,ot);break;default:i.vertexAttrib1fv(V.location,ot)}}}}b()}function R(){L();for(const v in n){const M=n[v];for(const U in M){const k=M[U];for(const z in k)h(k[z].object),delete k[z];delete M[U]}delete n[v]}}function C(v){if(n[v.id]===void 0)return;const M=n[v.id];for(const U in M){const k=M[U];for(const z in k)h(k[z].object),delete k[z];delete M[U]}delete n[v.id]}function A(v){for(const M in n){const U=n[M];if(U[v.id]===void 0)continue;const k=U[v.id];for(const z in k)h(k[z].object),delete k[z];delete U[v.id]}}function L(){I(),r=!0,a!==s&&(a=s,c(a.object))}function I(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:L,resetDefaultState:I,dispose:R,releaseStatesOfGeometry:C,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:p,disableUnusedAttributes:b}}function rp(i,t,e){let n;function s(c){n=c}function a(c,h){i.drawArrays(n,c,h),e.update(h,n,1)}function r(c,h,d){d!==0&&(i.drawArraysInstanced(n,c,h,d),e.update(h,n,d))}function o(c,h,d){if(d===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,h,0,d);let m=0;for(let g=0;g<d;g++)m+=h[g];e.update(m,n,1)}function l(c,h,d,u){if(d===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let g=0;g<c.length;g++)r(c[g],h[g],u[g]);else{m.multiDrawArraysInstancedWEBGL(n,c,0,h,0,u,0,d);let g=0;for(let _=0;_<d;_++)g+=h[_];for(let _=0;_<u.length;_++)e.update(g,n,u[_])}}this.setMode=s,this.render=a,this.renderInstances=r,this.renderMultiDraw=o,this.renderMultiDrawInstances=l}function lp(i,t,e,n){let s;function a(){if(s!==void 0)return s;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");s=i.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function r(A){return!(A!==on&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const L=A===_s&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==bn&&n.convert(A)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==cn&&!L)}function l(A){if(A==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const d=e.logarithmicDepthBuffer===!0,u=e.reverseDepthBuffer===!0&&t.has("EXT_clip_control");if(u===!0){const A=t.get("EXT_clip_control");A.clipControlEXT(A.LOWER_LEFT_EXT,A.ZERO_TO_ONE_EXT)}const m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),g=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_TEXTURE_SIZE),p=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),f=i.getParameter(i.MAX_VERTEX_ATTRIBS),b=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),x=i.getParameter(i.MAX_VARYING_VECTORS),S=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),R=g>0,C=i.getParameter(i.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reverseDepthBuffer:u,maxTextures:m,maxVertexTextures:g,maxTextureSize:_,maxCubemapSize:p,maxAttributes:f,maxVertexUniforms:b,maxVaryings:x,maxFragmentUniforms:S,vertexTextures:R,maxSamples:C}}function cp(i){const t=this;let e=null,n=0,s=!1,a=!1;const r=new Zn,o=new Ft,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const m=d.length!==0||u||n!==0||s;return s=u,n=d.length,m},this.beginShadows=function(){a=!0,h(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,m){const g=d.clippingPlanes,_=d.clipIntersection,p=d.clipShadows,f=i.get(d);if(!s||g===null||g.length===0||a&&!p)a?h(null):c();else{const b=a?0:n,x=b*4;let S=f.clippingState||null;l.value=S,S=h(g,u,x,m);for(let R=0;R!==x;++R)S[R]=e[R];f.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,m,g){const _=d!==null?d.length:0;let p=null;if(_!==0){if(p=l.value,g!==!0||p===null){const f=m+_*4,b=u.matrixWorldInverse;o.getNormalMatrix(b),(p===null||p.length<f)&&(p=new Float32Array(f));for(let x=0,S=m;x!==_;++x,S+=4)r.copy(d[x]).applyMatrix4(b,o),r.normal.toArray(p,S),p[S+3]=r.constant}l.value=p,l.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,p}}function hp(i){let t=new WeakMap;function e(r,o){return o===Po?r.mapping=Vi:o===Lo&&(r.mapping=Wi),r}function n(r){if(r&&r.isTexture){const o=r.mapping;if(o===Po||o===Lo)if(t.has(r)){const l=t.get(r).texture;return e(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new xd(l.height);return c.fromEquirectangularTexture(i,r),t.set(r,c),r.addEventListener("dispose",s),e(c.texture,r.mapping)}else return null}}return r}function s(r){const o=r.target;o.removeEventListener("dispose",s);const l=t.get(o);l!==void 0&&(t.delete(o),l.dispose())}function a(){t=new WeakMap}return{get:n,dispose:a}}class Dc extends Pc{constructor(t=-1,e=1,n=1,s=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=s,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,s,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=s,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let a=n-t,r=n+t,o=s+e,l=s-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,r=a+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Fi=4,fl=[.125,.215,.35,.446,.526,.582],ti=20,io=new Dc,pl=new St;let so=null,ao=0,oo=0,ro=!1;const Qn=(1+Math.sqrt(5))/2,Ti=1/Qn,ml=[new T(-Qn,Ti,0),new T(Qn,Ti,0),new T(-Ti,0,Qn),new T(Ti,0,Qn),new T(0,Qn,-Ti),new T(0,Qn,Ti),new T(-1,1,-1),new T(1,1,-1),new T(-1,1,1),new T(1,1,1)];class gl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,s=100){so=this._renderer.getRenderTarget(),ao=this._renderer.getActiveCubeFace(),oo=this._renderer.getActiveMipmapLevel(),ro=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const a=this._allocateTargets();return a.depthBuffer=!0,this._sceneToCubeUV(t,n,s,a),e>0&&this._blur(a,0,0,e),this._applyPMREM(a),this._cleanup(a),a}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ml(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_l(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(so,ao,oo),this._renderer.xr.enabled=ro,t.scissorTest=!1,Hs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Vi||t.mapping===Wi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),so=this._renderer.getRenderTarget(),ao=this._renderer.getActiveCubeFace(),oo=this._renderer.getActiveMipmapLevel(),ro=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:an,minFilter:an,generateMipmaps:!1,type:_s,format:on,colorSpace:Hn,depthBuffer:!1},s=vl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=vl(t,e,n);const{_lodMax:a}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=dp(a)),this._blurMaterial=up(a,t,e)}return s}_compileMaterial(t){const e=new tt(this._lodPlanes[0],t);this._renderer.compile(e,io)}_sceneToCubeUV(t,e,n,s){const o=new Re(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(pl),h.toneMapping=Fn,h.autoClear=!1;const m=new On({name:"PMREM.Background",side:Ne,depthWrite:!1,depthTest:!1}),g=new tt(new re,m);let _=!1;const p=t.background;p?p.isColor&&(m.color.copy(p),t.background=null,_=!0):(m.color.copy(pl),_=!0);for(let f=0;f<6;f++){const b=f%3;b===0?(o.up.set(0,l[f],0),o.lookAt(c[f],0,0)):b===1?(o.up.set(0,0,l[f]),o.lookAt(0,c[f],0)):(o.up.set(0,l[f],0),o.lookAt(0,0,c[f]));const x=this._cubeSize;Hs(s,b*x,f>2?x:0,x,x),h.setRenderTarget(s),_&&h.render(g,o),h.render(t,o)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=p}_textureToCubeUV(t,e){const n=this._renderer,s=t.mapping===Vi||t.mapping===Wi;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ml()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=_l());const a=s?this._cubemapMaterial:this._equirectMaterial,r=new tt(this._lodPlanes[0],a),o=a.uniforms;o.envMap.value=t;const l=this._cubeSize;Hs(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(r,io)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const s=this._lodPlanes.length;for(let a=1;a<s;a++){const r=Math.sqrt(this._sigmas[a]*this._sigmas[a]-this._sigmas[a-1]*this._sigmas[a-1]),o=ml[(s-a-1)%ml.length];this._blur(t,a-1,a,r,o)}e.autoClear=n}_blur(t,e,n,s,a){const r=this._pingPongRenderTarget;this._halfBlur(t,r,e,n,s,"latitudinal",a),this._halfBlur(r,t,n,n,s,"longitudinal",a)}_halfBlur(t,e,n,s,a,r,o){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new tt(this._lodPlanes[s],c),u=c.uniforms,m=this._sizeLods[n]-1,g=isFinite(a)?Math.PI/(2*m):2*Math.PI/(2*ti-1),_=a/g,p=isFinite(a)?1+Math.floor(h*_):ti;p>ti&&console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${ti}`);const f=[];let b=0;for(let A=0;A<ti;++A){const L=A/_,I=Math.exp(-L*L/2);f.push(I),A===0?b+=I:A<p&&(b+=2*I)}for(let A=0;A<f.length;A++)f[A]=f[A]/b;u.envMap.value=t.texture,u.samples.value=p,u.weights.value=f,u.latitudinal.value=r==="latitudinal",o&&(u.poleAxis.value=o);const{_lodMax:x}=this;u.dTheta.value=g,u.mipInt.value=x-n;const S=this._sizeLods[s],R=3*S*(s>x-Fi?s-x+Fi:0),C=4*(this._cubeSize-S);Hs(e,R,C,3*S,2*S),l.setRenderTarget(e),l.render(d,io)}}function dp(i){const t=[],e=[],n=[];let s=i;const a=i-Fi+1+fl.length;for(let r=0;r<a;r++){const o=Math.pow(2,s);e.push(o);let l=1/o;r>i-Fi?l=fl[r-i+Fi-1]:r===0&&(l=0),n.push(l);const c=1/(o-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],m=6,g=6,_=3,p=2,f=1,b=new Float32Array(_*g*m),x=new Float32Array(p*g*m),S=new Float32Array(f*g*m);for(let C=0;C<m;C++){const A=C%3*2/3-1,L=C>2?0:-1,I=[A,L,0,A+2/3,L,0,A+2/3,L+1,0,A,L,0,A+2/3,L+1,0,A,L+1,0];b.set(I,_*g*C),x.set(u,p*g*C);const v=[C,C,C,C,C,C];S.set(v,f*g*C)}const R=new le;R.setAttribute("position",new be(b,_)),R.setAttribute("uv",new be(x,p)),R.setAttribute("faceIndex",new be(S,f)),t.push(R),s>Fi&&s--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function vl(i,t,e){const n=new li(i,t,e);return n.texture.mapping=wa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Hs(i,t,e,n,s){i.viewport.set(t,e,n,s),i.scissor.set(t,e,n,s)}function up(i,t,e){const n=new Float32Array(ti),s=new T(0,1,0);return new wn({name:"SphericalGaussianBlur",defines:{n:ti,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${i}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:s}},vertexShader:Tr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function _l(){return new wn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Tr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function Ml(){return new wn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Tr(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Nn,depthTest:!1,depthWrite:!1})}function Tr(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function fp(i){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const l=o.mapping,c=l===Po||l===Lo,h=l===Vi||l===Wi;if(c||h){let d=t.get(o);const u=d!==void 0?d.texture.pmremVersion:0;if(o.isRenderTargetTexture&&o.pmremVersion!==u)return e===null&&(e=new gl(i)),d=c?e.fromEquirectangular(o,d):e.fromCubemap(o,d),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),d.texture;if(d!==void 0)return d.texture;{const m=o.image;return c&&m&&m.height>0||h&&m&&s(m)?(e===null&&(e=new gl(i)),d=c?e.fromEquirectangular(o):e.fromCubemap(o),d.texture.pmremVersion=o.pmremVersion,t.set(o,d),o.addEventListener("dispose",a),d.texture):null}}}return o}function s(o){let l=0;const c=6;for(let h=0;h<c;h++)o[h]!==void 0&&l++;return l===c}function a(o){const l=o.target;l.removeEventListener("dispose",a);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function r(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:r}}function pp(i){const t={};function e(n){if(t[n]!==void 0)return t[n];let s;switch(n){case"WEBGL_depth_texture":s=i.getExtension("WEBGL_depth_texture")||i.getExtension("MOZ_WEBGL_depth_texture")||i.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":s=i.getExtension("EXT_texture_filter_anisotropic")||i.getExtension("MOZ_EXT_texture_filter_anisotropic")||i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":s=i.getExtension("WEBGL_compressed_texture_s3tc")||i.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":s=i.getExtension("WEBGL_compressed_texture_pvrtc")||i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:s=i.getExtension(n)}return t[n]=s,s}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const s=e(n);return s===null&&ca("THREE.WebGLRenderer: "+n+" extension not supported."),s}}}function mp(i,t,e,n){const s={},a=new WeakMap;function r(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);for(const g in u.morphAttributes){const _=u.morphAttributes[g];for(let p=0,f=_.length;p<f;p++)t.remove(_[p])}u.removeEventListener("dispose",r),delete s[u.id];const m=a.get(u);m&&(t.remove(m),a.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function o(d,u){return s[u.id]===!0||(u.addEventListener("dispose",r),s[u.id]=!0,e.memory.geometries++),u}function l(d){const u=d.attributes;for(const g in u)t.update(u[g],i.ARRAY_BUFFER);const m=d.morphAttributes;for(const g in m){const _=m[g];for(let p=0,f=_.length;p<f;p++)t.update(_[p],i.ARRAY_BUFFER)}}function c(d){const u=[],m=d.index,g=d.attributes.position;let _=0;if(m!==null){const b=m.array;_=m.version;for(let x=0,S=b.length;x<S;x+=3){const R=b[x+0],C=b[x+1],A=b[x+2];u.push(R,C,C,A,A,R)}}else if(g!==void 0){const b=g.array;_=g.version;for(let x=0,S=b.length/3-1;x<S;x+=3){const R=x+0,C=x+1,A=x+2;u.push(R,C,C,A,A,R)}}else return;const p=new(bc(u)?Cc:Ac)(u,1);p.version=_;const f=a.get(d);f&&t.remove(f),a.set(d,p)}function h(d){const u=a.get(d);if(u){const m=d.index;m!==null&&u.version<m.version&&c(d)}else c(d);return a.get(d)}return{get:o,update:l,getWireframeAttribute:h}}function gp(i,t,e){let n;function s(u){n=u}let a,r;function o(u){a=u.type,r=u.bytesPerElement}function l(u,m){i.drawElements(n,m,a,u*r),e.update(m,n,1)}function c(u,m,g){g!==0&&(i.drawElementsInstanced(n,m,a,u*r,g),e.update(m,n,g))}function h(u,m,g){if(g===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,a,u,0,g);let p=0;for(let f=0;f<g;f++)p+=m[f];e.update(p,n,1)}function d(u,m,g,_){if(g===0)return;const p=t.get("WEBGL_multi_draw");if(p===null)for(let f=0;f<u.length;f++)c(u[f]/r,m[f],_[f]);else{p.multiDrawElementsInstancedWEBGL(n,m,0,a,u,0,_,0,g);let f=0;for(let b=0;b<g;b++)f+=m[b];for(let b=0;b<_.length;b++)e.update(f,n,_[b])}}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=d}function vp(i){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(a,r,o){switch(e.calls++,r){case i.TRIANGLES:e.triangles+=o*(a/3);break;case i.LINES:e.lines+=o*(a/2);break;case i.LINE_STRIP:e.lines+=o*(a-1);break;case i.LINE_LOOP:e.lines+=o*a;break;case i.POINTS:e.points+=o*a;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function s(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:s,update:n}}function _p(i,t,e){const n=new WeakMap,s=new Jt;function a(r,o,l){const c=r.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let v=function(){L.dispose(),n.delete(o),o.removeEventListener("dispose",v)};var m=v;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,_=o.morphAttributes.normal!==void 0,p=o.morphAttributes.color!==void 0,f=o.morphAttributes.position||[],b=o.morphAttributes.normal||[],x=o.morphAttributes.color||[];let S=0;g===!0&&(S=1),_===!0&&(S=2),p===!0&&(S=3);let R=o.attributes.position.count*S,C=1;R>t.maxTextureSize&&(C=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);const A=new Float32Array(R*C*4*d),L=new Sc(A,R,C,d);L.type=cn,L.needsUpdate=!0;const I=S*4;for(let M=0;M<d;M++){const U=f[M],k=b[M],z=x[M],X=R*C*4*M;for(let O=0;O<U.count;O++){const Y=O*I;g===!0&&(s.fromBufferAttribute(U,O),A[X+Y+0]=s.x,A[X+Y+1]=s.y,A[X+Y+2]=s.z,A[X+Y+3]=0),_===!0&&(s.fromBufferAttribute(k,O),A[X+Y+4]=s.x,A[X+Y+5]=s.y,A[X+Y+6]=s.z,A[X+Y+7]=0),p===!0&&(s.fromBufferAttribute(z,O),A[X+Y+8]=s.x,A[X+Y+9]=s.y,A[X+Y+10]=s.z,A[X+Y+11]=z.itemSize===4?s.w:1)}}u={count:d,texture:L,size:new Lt(R,C)},n.set(o,u),o.addEventListener("dispose",v)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",r.morphTexture,e);else{let g=0;for(let p=0;p<c.length;p++)g+=c[p];const _=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(i,"morphTargetBaseInfluence",_),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(i,"morphTargetsTextureSize",u.size)}return{update:a}}function Mp(i,t,e,n){let s=new WeakMap;function a(l){const c=n.render.frame,h=l.geometry,d=t.get(l,h);if(s.get(d)!==c&&(t.update(d),s.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",o)===!1&&l.addEventListener("dispose",o),s.get(l)!==c&&(e.update(l.instanceMatrix,i.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,i.ARRAY_BUFFER),s.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;s.get(u)!==c&&(u.update(),s.set(u,c))}return d}function r(){s=new WeakMap}function o(l){const c=l.target;c.removeEventListener("dispose",o),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:a,dispose:r}}class Uc extends Pe{constructor(t,e,n,s,a,r,o,l,c,h=Bi){if(h!==Bi&&h!==qi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Bi&&(n=ri),n===void 0&&h===qi&&(n=$i),super(null,s,a,r,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Be,this.minFilter=l!==void 0?l:Be,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Nc=new Pe,xl=new Uc(1,1),Fc=new Sc,kc=new sd,Oc=new Lc,yl=[],bl=[],wl=new Float32Array(16),Sl=new Float32Array(9),Tl=new Float32Array(4);function Ki(i,t,e){const n=i[0];if(n<=0||n>0)return i;const s=t*e;let a=yl[s];if(a===void 0&&(a=new Float32Array(s),yl[s]=a),t!==0){n.toArray(a,0);for(let r=1,o=0;r!==t;++r)o+=e,i[r].toArray(a,o)}return a}function Me(i,t){if(i.length!==t.length)return!1;for(let e=0,n=i.length;e<n;e++)if(i[e]!==t[e])return!1;return!0}function xe(i,t){for(let e=0,n=t.length;e<n;e++)i[e]=t[e]}function Ta(i,t){let e=bl[t];e===void 0&&(e=new Int32Array(t),bl[t]=e);for(let n=0;n!==t;++n)e[n]=i.allocateTextureUnit();return e}function xp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1f(this.addr,t),e[0]=t)}function yp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;i.uniform2fv(this.addr,t),xe(e,t)}}function bp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(i.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Me(e,t))return;i.uniform3fv(this.addr,t),xe(e,t)}}function wp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;i.uniform4fv(this.addr,t),xe(e,t)}}function Sp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;i.uniformMatrix2fv(this.addr,!1,t),xe(e,t)}else{if(Me(e,n))return;Tl.set(n),i.uniformMatrix2fv(this.addr,!1,Tl),xe(e,n)}}function Tp(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;i.uniformMatrix3fv(this.addr,!1,t),xe(e,t)}else{if(Me(e,n))return;Sl.set(n),i.uniformMatrix3fv(this.addr,!1,Sl),xe(e,n)}}function Ep(i,t){const e=this.cache,n=t.elements;if(n===void 0){if(Me(e,t))return;i.uniformMatrix4fv(this.addr,!1,t),xe(e,t)}else{if(Me(e,n))return;wl.set(n),i.uniformMatrix4fv(this.addr,!1,wl),xe(e,n)}}function Ap(i,t){const e=this.cache;e[0]!==t&&(i.uniform1i(this.addr,t),e[0]=t)}function Cp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;i.uniform2iv(this.addr,t),xe(e,t)}}function Rp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;i.uniform3iv(this.addr,t),xe(e,t)}}function Pp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;i.uniform4iv(this.addr,t),xe(e,t)}}function Lp(i,t){const e=this.cache;e[0]!==t&&(i.uniform1ui(this.addr,t),e[0]=t)}function Ip(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(i.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Me(e,t))return;i.uniform2uiv(this.addr,t),xe(e,t)}}function Dp(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(i.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Me(e,t))return;i.uniform3uiv(this.addr,t),xe(e,t)}}function Up(i,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(i.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Me(e,t))return;i.uniform4uiv(this.addr,t),xe(e,t)}}function Np(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let a;this.type===i.SAMPLER_2D_SHADOW?(xl.compareFunction=yc,a=xl):a=Nc,e.setTexture2D(t||a,s)}function Fp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture3D(t||kc,s)}function kp(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTextureCube(t||Oc,s)}function Op(i,t,e){const n=this.cache,s=e.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),e.setTexture2DArray(t||Fc,s)}function Bp(i){switch(i){case 5126:return xp;case 35664:return yp;case 35665:return bp;case 35666:return wp;case 35674:return Sp;case 35675:return Tp;case 35676:return Ep;case 5124:case 35670:return Ap;case 35667:case 35671:return Cp;case 35668:case 35672:return Rp;case 35669:case 35673:return Pp;case 5125:return Lp;case 36294:return Ip;case 36295:return Dp;case 36296:return Up;case 35678:case 36198:case 36298:case 36306:case 35682:return Np;case 35679:case 36299:case 36307:return Fp;case 35680:case 36300:case 36308:case 36293:return kp;case 36289:case 36303:case 36311:case 36292:return Op}}function zp(i,t){i.uniform1fv(this.addr,t)}function Hp(i,t){const e=Ki(t,this.size,2);i.uniform2fv(this.addr,e)}function Gp(i,t){const e=Ki(t,this.size,3);i.uniform3fv(this.addr,e)}function Vp(i,t){const e=Ki(t,this.size,4);i.uniform4fv(this.addr,e)}function Wp(i,t){const e=Ki(t,this.size,4);i.uniformMatrix2fv(this.addr,!1,e)}function $p(i,t){const e=Ki(t,this.size,9);i.uniformMatrix3fv(this.addr,!1,e)}function qp(i,t){const e=Ki(t,this.size,16);i.uniformMatrix4fv(this.addr,!1,e)}function Xp(i,t){i.uniform1iv(this.addr,t)}function Yp(i,t){i.uniform2iv(this.addr,t)}function jp(i,t){i.uniform3iv(this.addr,t)}function Kp(i,t){i.uniform4iv(this.addr,t)}function Zp(i,t){i.uniform1uiv(this.addr,t)}function Qp(i,t){i.uniform2uiv(this.addr,t)}function Jp(i,t){i.uniform3uiv(this.addr,t)}function tm(i,t){i.uniform4uiv(this.addr,t)}function em(i,t,e){const n=this.cache,s=t.length,a=Ta(e,s);Me(n,a)||(i.uniform1iv(this.addr,a),xe(n,a));for(let r=0;r!==s;++r)e.setTexture2D(t[r]||Nc,a[r])}function nm(i,t,e){const n=this.cache,s=t.length,a=Ta(e,s);Me(n,a)||(i.uniform1iv(this.addr,a),xe(n,a));for(let r=0;r!==s;++r)e.setTexture3D(t[r]||kc,a[r])}function im(i,t,e){const n=this.cache,s=t.length,a=Ta(e,s);Me(n,a)||(i.uniform1iv(this.addr,a),xe(n,a));for(let r=0;r!==s;++r)e.setTextureCube(t[r]||Oc,a[r])}function sm(i,t,e){const n=this.cache,s=t.length,a=Ta(e,s);Me(n,a)||(i.uniform1iv(this.addr,a),xe(n,a));for(let r=0;r!==s;++r)e.setTexture2DArray(t[r]||Fc,a[r])}function am(i){switch(i){case 5126:return zp;case 35664:return Hp;case 35665:return Gp;case 35666:return Vp;case 35674:return Wp;case 35675:return $p;case 35676:return qp;case 5124:case 35670:return Xp;case 35667:case 35671:return Yp;case 35668:case 35672:return jp;case 35669:case 35673:return Kp;case 5125:return Zp;case 36294:return Qp;case 36295:return Jp;case 36296:return tm;case 35678:case 36198:case 36298:case 36306:case 35682:return em;case 35679:case 36299:case 36307:return nm;case 35680:case 36300:case 36308:case 36293:return im;case 36289:case 36303:case 36311:case 36292:return sm}}class om{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Bp(e.type)}}class rm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=am(e.type)}}class lm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const s=this.seq;for(let a=0,r=s.length;a!==r;++a){const o=s[a];o.setValue(t,e[o.id],n)}}}const lo=/(\w+)(\])?(\[|\.)?/g;function El(i,t){i.seq.push(t),i.map[t.id]=t}function cm(i,t,e){const n=i.name,s=n.length;for(lo.lastIndex=0;;){const a=lo.exec(n),r=lo.lastIndex;let o=a[1];const l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===s){El(e,c===void 0?new om(o,i,t):new rm(o,i,t));break}else{let d=e.map[o];d===void 0&&(d=new lm(o),El(e,d)),e=d}}}class ha{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let s=0;s<n;++s){const a=t.getActiveUniform(e,s),r=t.getUniformLocation(e,a.name);cm(a,r,this)}}setValue(t,e,n,s){const a=this.map[e];a!==void 0&&a.setValue(t,n,s)}setOptional(t,e,n){const s=e[n];s!==void 0&&this.setValue(t,n,s)}static upload(t,e,n,s){for(let a=0,r=e.length;a!==r;++a){const o=e[a],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,s)}}static seqWithValue(t,e){const n=[];for(let s=0,a=t.length;s!==a;++s){const r=t[s];r.id in e&&n.push(r)}return n}}function Al(i,t,e){const n=i.createShader(t);return i.shaderSource(n,e),i.compileShader(n),n}const hm=37297;let dm=0;function um(i,t){const e=i.split(`
`),n=[],s=Math.max(t-6,0),a=Math.min(t+6,e.length);for(let r=s;r<a;r++){const o=r+1;n.push(`${o===t?">":" "} ${o}: ${e[r]}`)}return n.join(`
`)}function fm(i){const t=Kt.getPrimaries(Kt.workingColorSpace),e=Kt.getPrimaries(i);let n;switch(t===e?n="":t===fa&&e===ua?n="LinearDisplayP3ToLinearSRGB":t===ua&&e===fa&&(n="LinearSRGBToLinearDisplayP3"),i){case Hn:case Sa:return[n,"LinearTransferOETF"];case We:case br:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",i),[n,"LinearTransferOETF"]}}function Cl(i,t,e){const n=i.getShaderParameter(t,i.COMPILE_STATUS),s=i.getShaderInfoLog(t).trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const r=parseInt(a[1]);return e.toUpperCase()+`

`+s+`

`+um(i.getShaderSource(t),r)}else return s}function pm(i,t){const e=fm(t);return`vec4 ${i}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function mm(i,t){let e;switch(t){case Lh:e="Linear";break;case Ih:e="Reinhard";break;case Dh:e="Cineon";break;case cc:e="ACESFilmic";break;case Nh:e="AgX";break;case Fh:e="Neutral";break;case Uh:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+i+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const Gs=new T;function gm(){Kt.getLuminanceCoefficients(Gs);const i=Gs.x.toFixed(4),t=Gs.y.toFixed(4),e=Gs.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function vm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(us).join(`
`)}function _m(i){const t=[];for(const e in i){const n=i[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Mm(i,t){const e={},n=i.getProgramParameter(t,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const a=i.getActiveAttrib(t,s),r=a.name;let o=1;a.type===i.FLOAT_MAT2&&(o=2),a.type===i.FLOAT_MAT3&&(o=3),a.type===i.FLOAT_MAT4&&(o=4),e[r]={type:a.type,location:i.getAttribLocation(t,r),locationSize:o}}return e}function us(i){return i!==""}function Rl(i,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return i.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Pl(i,t){return i.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const xm=/^[ \t]*#include +<([\w\d./]+)>/gm;function lr(i){return i.replace(xm,bm)}const ym=new Map;function bm(i,t){let e=Nt[t];if(e===void 0){const n=ym.get(t);if(n!==void 0)e=Nt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return lr(e)}const wm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ll(i){return i.replace(wm,Sm)}function Sm(i,t,e,n){let s="";for(let a=parseInt(t);a<parseInt(e);a++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return s}function Il(i){let t=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?t+=`
#define HIGH_PRECISION`:i.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Tm(i){let t="SHADOWMAP_TYPE_BASIC";return i.shadowMapType===pr?t="SHADOWMAP_TYPE_PCF":i.shadowMapType===xo?t="SHADOWMAP_TYPE_PCF_SOFT":i.shadowMapType===vn&&(t="SHADOWMAP_TYPE_VSM"),t}function Em(i){let t="ENVMAP_TYPE_CUBE";if(i.envMap)switch(i.envMapMode){case Vi:case Wi:t="ENVMAP_TYPE_CUBE";break;case wa:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Am(i){let t="ENVMAP_MODE_REFLECTION";if(i.envMap)switch(i.envMapMode){case Wi:t="ENVMAP_MODE_REFRACTION";break}return t}function Cm(i){let t="ENVMAP_BLENDING_NONE";if(i.envMap)switch(i.combine){case lc:t="ENVMAP_BLENDING_MULTIPLY";break;case Rh:t="ENVMAP_BLENDING_MIX";break;case Ph:t="ENVMAP_BLENDING_ADD";break}return t}function Rm(i){const t=i.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Pm(i,t,e,n){const s=i.getContext(),a=e.defines;let r=e.vertexShader,o=e.fragmentShader;const l=Tm(e),c=Em(e),h=Am(e),d=Cm(e),u=Rm(e),m=vm(e),g=_m(a),_=s.createProgram();let p,f,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(us).join(`
`),p.length>0&&(p+=`
`),f=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(us).join(`
`),f.length>0&&(f+=`
`)):(p=[Il(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(us).join(`
`),f=[Il(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor||e.batchingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Fn?"#define TONE_MAPPING":"",e.toneMapping!==Fn?Nt.tonemapping_pars_fragment:"",e.toneMapping!==Fn?mm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Nt.colorspace_pars_fragment,pm("linearToOutputTexel",e.outputColorSpace),gm(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(us).join(`
`)),r=lr(r),r=Rl(r,e),r=Pl(r,e),o=lr(o),o=Rl(o,e),o=Pl(o,e),r=Ll(r),o=Ll(o),e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,p=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,f=["#define varying in",e.glslVersion===jr?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===jr?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const x=b+p+r,S=b+f+o,R=Al(s,s.VERTEX_SHADER,x),C=Al(s,s.FRAGMENT_SHADER,S);s.attachShader(_,R),s.attachShader(_,C),e.index0AttributeName!==void 0?s.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function A(M){if(i.debug.checkShaderErrors){const U=s.getProgramInfoLog(_).trim(),k=s.getShaderInfoLog(R).trim(),z=s.getShaderInfoLog(C).trim();let X=!0,O=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(X=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,R,C);else{const Y=Cl(s,R,"vertex"),V=Cl(s,C,"fragment");console.error("THREE.WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+M.name+`
Material Type: `+M.type+`

Program Info Log: `+U+`
`+Y+`
`+V)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(k===""||z==="")&&(O=!1);O&&(M.diagnostics={runnable:X,programLog:U,vertexShader:{log:k,prefix:p},fragmentShader:{log:z,prefix:f}})}s.deleteShader(R),s.deleteShader(C),L=new ha(s,_),I=Mm(s,_)}let L;this.getUniforms=function(){return L===void 0&&A(this),L};let I;this.getAttributes=function(){return I===void 0&&A(this),I};let v=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=s.getProgramParameter(_,hm)),v},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=dm++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=C,this}let Lm=0;class Im{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,s=this._getShaderStage(e),a=this._getShaderStage(n),r=this._getShaderCacheForMaterial(t);return r.has(s)===!1&&(r.add(s),s.usedTimes++),r.has(a)===!1&&(r.add(a),a.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new Dm(t),e.set(t,n)),n}}class Dm{constructor(t){this.id=Lm++,this.code=t,this.usedTimes=0}}function Um(i,t,e,n,s,a,r){const o=new Tc,l=new Im,c=new Set,h=[],d=s.logarithmicDepthBuffer,u=s.reverseDepthBuffer,m=s.vertexTextures;let g=s.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(v){return c.add(v),v===0?"uv":`uv${v}`}function f(v,M,U,k,z){const X=k.fog,O=z.geometry,Y=v.isMeshStandardMaterial?k.environment:null,V=(v.isMeshStandardMaterial?e:t).get(v.envMap||Y),J=V&&V.mapping===wa?V.image.height:null,ot=_[v.type];v.precision!==null&&(g=s.getMaxPrecision(v.precision),g!==v.precision&&console.warn("THREE.WebGLProgram.getParameters:",v.precision,"not supported, using",g,"instead."));const ft=O.morphAttributes.position||O.morphAttributes.normal||O.morphAttributes.color,zt=ft!==void 0?ft.length:0;let kt=0;O.morphAttributes.position!==void 0&&(kt=1),O.morphAttributes.normal!==void 0&&(kt=2),O.morphAttributes.color!==void 0&&(kt=3);let q,$,it,nt;if(ot){const Oe=rn[ot];q=Oe.vertexShader,$=Oe.fragmentShader}else q=v.vertexShader,$=v.fragmentShader,l.update(v),it=l.getVertexShaderID(v),nt=l.getFragmentShaderID(v);const xt=i.getRenderTarget(),pt=z.isInstancedMesh===!0,Dt=z.isBatchedMesh===!0,Ot=!!v.map,At=!!v.matcap,P=!!V,fe=!!v.aoMap,Ht=!!v.lightMap,Wt=!!v.bumpMap,Ct=!!v.normalMap,ie=!!v.displacementMap,It=!!v.emissiveMap,E=!!v.metalnessMap,y=!!v.roughnessMap,B=v.anisotropy>0,K=v.clearcoat>0,et=v.dispersion>0,j=v.iridescence>0,yt=v.sheen>0,lt=v.transmission>0,mt=B&&!!v.anisotropyMap,$t=K&&!!v.clearcoatMap,st=K&&!!v.clearcoatNormalMap,gt=K&&!!v.clearcoatRoughnessMap,Rt=j&&!!v.iridescenceMap,Pt=j&&!!v.iridescenceThicknessMap,vt=yt&&!!v.sheenColorMap,Gt=yt&&!!v.sheenRoughnessMap,Ut=!!v.specularMap,te=!!v.specularColorMap,D=!!v.specularIntensityMap,dt=lt&&!!v.transmissionMap,W=lt&&!!v.thicknessMap,Z=!!v.gradientMap,ct=!!v.alphaMap,ut=v.alphaTest>0,Vt=!!v.alphaHash,pe=!!v.extensions;let ke=Fn;v.toneMapped&&(xt===null||xt.isXRRenderTarget===!0)&&(ke=i.toneMapping);const Xt={shaderID:ot,shaderType:v.type,shaderName:v.name,vertexShader:q,fragmentShader:$,defines:v.defines,customVertexShaderID:it,customFragmentShaderID:nt,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:g,batching:Dt,batchingColor:Dt&&z._colorsTexture!==null,instancing:pt,instancingColor:pt&&z.instanceColor!==null,instancingMorph:pt&&z.morphTexture!==null,supportsVertexTextures:m,outputColorSpace:xt===null?i.outputColorSpace:xt.isXRRenderTarget===!0?xt.texture.colorSpace:Hn,alphaToCoverage:!!v.alphaToCoverage,map:Ot,matcap:At,envMap:P,envMapMode:P&&V.mapping,envMapCubeUVHeight:J,aoMap:fe,lightMap:Ht,bumpMap:Wt,normalMap:Ct,displacementMap:m&&ie,emissiveMap:It,normalMapObjectSpace:Ct&&v.normalMapType===zh,normalMapTangentSpace:Ct&&v.normalMapType===xc,metalnessMap:E,roughnessMap:y,anisotropy:B,anisotropyMap:mt,clearcoat:K,clearcoatMap:$t,clearcoatNormalMap:st,clearcoatRoughnessMap:gt,dispersion:et,iridescence:j,iridescenceMap:Rt,iridescenceThicknessMap:Pt,sheen:yt,sheenColorMap:vt,sheenRoughnessMap:Gt,specularMap:Ut,specularColorMap:te,specularIntensityMap:D,transmission:lt,transmissionMap:dt,thicknessMap:W,gradientMap:Z,opaque:v.transparent===!1&&v.blending===ai&&v.alphaToCoverage===!1,alphaMap:ct,alphaTest:ut,alphaHash:Vt,combine:v.combine,mapUv:Ot&&p(v.map.channel),aoMapUv:fe&&p(v.aoMap.channel),lightMapUv:Ht&&p(v.lightMap.channel),bumpMapUv:Wt&&p(v.bumpMap.channel),normalMapUv:Ct&&p(v.normalMap.channel),displacementMapUv:ie&&p(v.displacementMap.channel),emissiveMapUv:It&&p(v.emissiveMap.channel),metalnessMapUv:E&&p(v.metalnessMap.channel),roughnessMapUv:y&&p(v.roughnessMap.channel),anisotropyMapUv:mt&&p(v.anisotropyMap.channel),clearcoatMapUv:$t&&p(v.clearcoatMap.channel),clearcoatNormalMapUv:st&&p(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:gt&&p(v.clearcoatRoughnessMap.channel),iridescenceMapUv:Rt&&p(v.iridescenceMap.channel),iridescenceThicknessMapUv:Pt&&p(v.iridescenceThicknessMap.channel),sheenColorMapUv:vt&&p(v.sheenColorMap.channel),sheenRoughnessMapUv:Gt&&p(v.sheenRoughnessMap.channel),specularMapUv:Ut&&p(v.specularMap.channel),specularColorMapUv:te&&p(v.specularColorMap.channel),specularIntensityMapUv:D&&p(v.specularIntensityMap.channel),transmissionMapUv:dt&&p(v.transmissionMap.channel),thicknessMapUv:W&&p(v.thicknessMap.channel),alphaMapUv:ct&&p(v.alphaMap.channel),vertexTangents:!!O.attributes.tangent&&(Ct||B),vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!O.attributes.color&&O.attributes.color.itemSize===4,pointsUvs:z.isPoints===!0&&!!O.attributes.uv&&(Ot||ct),fog:!!X,useFog:v.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:v.flatShading===!0,sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:d,reverseDepthBuffer:u,skinning:z.isSkinnedMesh===!0,morphTargets:O.morphAttributes.position!==void 0,morphNormals:O.morphAttributes.normal!==void 0,morphColors:O.morphAttributes.color!==void 0,morphTargetsCount:zt,morphTextureStride:kt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:i.shadowMap.enabled&&U.length>0,shadowMapType:i.shadowMap.type,toneMapping:ke,decodeVideoTexture:Ot&&v.map.isVideoTexture===!0&&Kt.getTransfer(v.map.colorSpace)===ae,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===Se,flipSided:v.side===Ne,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:pe&&v.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(pe&&v.extensions.multiDraw===!0||Dt)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Xt.vertexUv1s=c.has(1),Xt.vertexUv2s=c.has(2),Xt.vertexUv3s=c.has(3),c.clear(),Xt}function b(v){const M=[];if(v.shaderID?M.push(v.shaderID):(M.push(v.customVertexShaderID),M.push(v.customFragmentShaderID)),v.defines!==void 0)for(const U in v.defines)M.push(U),M.push(v.defines[U]);return v.isRawShaderMaterial===!1&&(x(M,v),S(M,v),M.push(i.outputColorSpace)),M.push(v.customProgramCacheKey),M.join()}function x(v,M){v.push(M.precision),v.push(M.outputColorSpace),v.push(M.envMapMode),v.push(M.envMapCubeUVHeight),v.push(M.mapUv),v.push(M.alphaMapUv),v.push(M.lightMapUv),v.push(M.aoMapUv),v.push(M.bumpMapUv),v.push(M.normalMapUv),v.push(M.displacementMapUv),v.push(M.emissiveMapUv),v.push(M.metalnessMapUv),v.push(M.roughnessMapUv),v.push(M.anisotropyMapUv),v.push(M.clearcoatMapUv),v.push(M.clearcoatNormalMapUv),v.push(M.clearcoatRoughnessMapUv),v.push(M.iridescenceMapUv),v.push(M.iridescenceThicknessMapUv),v.push(M.sheenColorMapUv),v.push(M.sheenRoughnessMapUv),v.push(M.specularMapUv),v.push(M.specularColorMapUv),v.push(M.specularIntensityMapUv),v.push(M.transmissionMapUv),v.push(M.thicknessMapUv),v.push(M.combine),v.push(M.fogExp2),v.push(M.sizeAttenuation),v.push(M.morphTargetsCount),v.push(M.morphAttributeCount),v.push(M.numDirLights),v.push(M.numPointLights),v.push(M.numSpotLights),v.push(M.numSpotLightMaps),v.push(M.numHemiLights),v.push(M.numRectAreaLights),v.push(M.numDirLightShadows),v.push(M.numPointLightShadows),v.push(M.numSpotLightShadows),v.push(M.numSpotLightShadowsWithMaps),v.push(M.numLightProbes),v.push(M.shadowMapType),v.push(M.toneMapping),v.push(M.numClippingPlanes),v.push(M.numClipIntersection),v.push(M.depthPacking)}function S(v,M){o.disableAll(),M.supportsVertexTextures&&o.enable(0),M.instancing&&o.enable(1),M.instancingColor&&o.enable(2),M.instancingMorph&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUv1s&&o.enable(13),M.vertexUv2s&&o.enable(14),M.vertexUv3s&&o.enable(15),M.vertexTangents&&o.enable(16),M.anisotropy&&o.enable(17),M.alphaHash&&o.enable(18),M.batching&&o.enable(19),M.dispersion&&o.enable(20),M.batchingColor&&o.enable(21),v.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.reverseDepthBuffer&&o.enable(4),M.skinning&&o.enable(5),M.morphTargets&&o.enable(6),M.morphNormals&&o.enable(7),M.morphColors&&o.enable(8),M.premultipliedAlpha&&o.enable(9),M.shadowMapEnabled&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.opaque&&o.enable(17),M.pointsUvs&&o.enable(18),M.decodeVideoTexture&&o.enable(19),M.alphaToCoverage&&o.enable(20),v.push(o.mask)}function R(v){const M=_[v.type];let U;if(M){const k=rn[M];U=gd.clone(k.uniforms)}else U=v.uniforms;return U}function C(v,M){let U;for(let k=0,z=h.length;k<z;k++){const X=h[k];if(X.cacheKey===M){U=X,++U.usedTimes;break}}return U===void 0&&(U=new Pm(i,M,v,a),h.push(U)),U}function A(v){if(--v.usedTimes===0){const M=h.indexOf(v);h[M]=h[h.length-1],h.pop(),v.destroy()}}function L(v){l.remove(v)}function I(){l.dispose()}return{getParameters:f,getProgramCacheKey:b,getUniforms:R,acquireProgram:C,releaseProgram:A,releaseShaderCache:L,programs:h,dispose:I}}function Nm(){let i=new WeakMap;function t(r){return i.has(r)}function e(r){let o=i.get(r);return o===void 0&&(o={},i.set(r,o)),o}function n(r){i.delete(r)}function s(r,o,l){i.get(r)[o]=l}function a(){i=new WeakMap}return{has:t,get:e,remove:n,update:s,dispose:a}}function Fm(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.material.id!==t.material.id?i.material.id-t.material.id:i.z!==t.z?i.z-t.z:i.id-t.id}function Dl(i,t){return i.groupOrder!==t.groupOrder?i.groupOrder-t.groupOrder:i.renderOrder!==t.renderOrder?i.renderOrder-t.renderOrder:i.z!==t.z?t.z-i.z:i.id-t.id}function Ul(){const i=[];let t=0;const e=[],n=[],s=[];function a(){t=0,e.length=0,n.length=0,s.length=0}function r(d,u,m,g,_,p){let f=i[t];return f===void 0?(f={id:d.id,object:d,geometry:u,material:m,groupOrder:g,renderOrder:d.renderOrder,z:_,group:p},i[t]=f):(f.id=d.id,f.object=d,f.geometry=u,f.material=m,f.groupOrder=g,f.renderOrder=d.renderOrder,f.z=_,f.group=p),t++,f}function o(d,u,m,g,_,p){const f=r(d,u,m,g,_,p);m.transmission>0?n.push(f):m.transparent===!0?s.push(f):e.push(f)}function l(d,u,m,g,_,p){const f=r(d,u,m,g,_,p);m.transmission>0?n.unshift(f):m.transparent===!0?s.unshift(f):e.unshift(f)}function c(d,u){e.length>1&&e.sort(d||Fm),n.length>1&&n.sort(u||Dl),s.length>1&&s.sort(u||Dl)}function h(){for(let d=t,u=i.length;d<u;d++){const m=i[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:e,transmissive:n,transparent:s,init:a,push:o,unshift:l,finish:h,sort:c}}function km(){let i=new WeakMap;function t(n,s){const a=i.get(n);let r;return a===void 0?(r=new Ul,i.set(n,[r])):s>=a.length?(r=new Ul,a.push(r)):r=a[s],r}function e(){i=new WeakMap}return{get:t,dispose:e}}function Om(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new T,color:new St};break;case"SpotLight":e={position:new T,direction:new T,color:new St,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new T,color:new St,distance:0,decay:0};break;case"HemisphereLight":e={direction:new T,skyColor:new St,groundColor:new St};break;case"RectAreaLight":e={color:new St,position:new T,halfWidth:new T,halfHeight:new T};break}return i[t.id]=e,e}}}function Bm(){const i={};return{get:function(t){if(i[t.id]!==void 0)return i[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Lt};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Lt};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Lt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[t.id]=e,e}}}let zm=0;function Hm(i,t){return(t.castShadow?2:0)-(i.castShadow?2:0)+(t.map?1:0)-(i.map?1:0)}function Gm(i){const t=new Om,e=Bm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new T);const s=new T,a=new qt,r=new qt;function o(c){let h=0,d=0,u=0;for(let I=0;I<9;I++)n.probe[I].set(0,0,0);let m=0,g=0,_=0,p=0,f=0,b=0,x=0,S=0,R=0,C=0,A=0;c.sort(Hm);for(let I=0,v=c.length;I<v;I++){const M=c[I],U=M.color,k=M.intensity,z=M.distance,X=M.shadow&&M.shadow.map?M.shadow.map.texture:null;if(M.isAmbientLight)h+=U.r*k,d+=U.g*k,u+=U.b*k;else if(M.isLightProbe){for(let O=0;O<9;O++)n.probe[O].addScaledVector(M.sh.coefficients[O],k);A++}else if(M.isDirectionalLight){const O=t.get(M);if(O.color.copy(M.color).multiplyScalar(M.intensity),M.castShadow){const Y=M.shadow,V=e.get(M);V.shadowIntensity=Y.intensity,V.shadowBias=Y.bias,V.shadowNormalBias=Y.normalBias,V.shadowRadius=Y.radius,V.shadowMapSize=Y.mapSize,n.directionalShadow[m]=V,n.directionalShadowMap[m]=X,n.directionalShadowMatrix[m]=M.shadow.matrix,b++}n.directional[m]=O,m++}else if(M.isSpotLight){const O=t.get(M);O.position.setFromMatrixPosition(M.matrixWorld),O.color.copy(U).multiplyScalar(k),O.distance=z,O.coneCos=Math.cos(M.angle),O.penumbraCos=Math.cos(M.angle*(1-M.penumbra)),O.decay=M.decay,n.spot[_]=O;const Y=M.shadow;if(M.map&&(n.spotLightMap[R]=M.map,R++,Y.updateMatrices(M),M.castShadow&&C++),n.spotLightMatrix[_]=Y.matrix,M.castShadow){const V=e.get(M);V.shadowIntensity=Y.intensity,V.shadowBias=Y.bias,V.shadowNormalBias=Y.normalBias,V.shadowRadius=Y.radius,V.shadowMapSize=Y.mapSize,n.spotShadow[_]=V,n.spotShadowMap[_]=X,S++}_++}else if(M.isRectAreaLight){const O=t.get(M);O.color.copy(U).multiplyScalar(k),O.halfWidth.set(M.width*.5,0,0),O.halfHeight.set(0,M.height*.5,0),n.rectArea[p]=O,p++}else if(M.isPointLight){const O=t.get(M);if(O.color.copy(M.color).multiplyScalar(M.intensity),O.distance=M.distance,O.decay=M.decay,M.castShadow){const Y=M.shadow,V=e.get(M);V.shadowIntensity=Y.intensity,V.shadowBias=Y.bias,V.shadowNormalBias=Y.normalBias,V.shadowRadius=Y.radius,V.shadowMapSize=Y.mapSize,V.shadowCameraNear=Y.camera.near,V.shadowCameraFar=Y.camera.far,n.pointShadow[g]=V,n.pointShadowMap[g]=X,n.pointShadowMatrix[g]=M.shadow.matrix,x++}n.point[g]=O,g++}else if(M.isHemisphereLight){const O=t.get(M);O.skyColor.copy(M.color).multiplyScalar(k),O.groundColor.copy(M.groundColor).multiplyScalar(k),n.hemi[f]=O,f++}}p>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=rt.LTC_FLOAT_1,n.rectAreaLTC2=rt.LTC_FLOAT_2):(n.rectAreaLTC1=rt.LTC_HALF_1,n.rectAreaLTC2=rt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const L=n.hash;(L.directionalLength!==m||L.pointLength!==g||L.spotLength!==_||L.rectAreaLength!==p||L.hemiLength!==f||L.numDirectionalShadows!==b||L.numPointShadows!==x||L.numSpotShadows!==S||L.numSpotMaps!==R||L.numLightProbes!==A)&&(n.directional.length=m,n.spot.length=_,n.rectArea.length=p,n.point.length=g,n.hemi.length=f,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.pointShadow.length=x,n.pointShadowMap.length=x,n.spotShadow.length=S,n.spotShadowMap.length=S,n.directionalShadowMatrix.length=b,n.pointShadowMatrix.length=x,n.spotLightMatrix.length=S+R-C,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=A,L.directionalLength=m,L.pointLength=g,L.spotLength=_,L.rectAreaLength=p,L.hemiLength=f,L.numDirectionalShadows=b,L.numPointShadows=x,L.numSpotShadows=S,L.numSpotMaps=R,L.numLightProbes=A,n.version=zm++)}function l(c,h){let d=0,u=0,m=0,g=0,_=0;const p=h.matrixWorldInverse;for(let f=0,b=c.length;f<b;f++){const x=c[f];if(x.isDirectionalLight){const S=n.directional[d];S.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(p),d++}else if(x.isSpotLight){const S=n.spot[m];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(p),S.direction.setFromMatrixPosition(x.matrixWorld),s.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(s),S.direction.transformDirection(p),m++}else if(x.isRectAreaLight){const S=n.rectArea[g];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(p),r.identity(),a.copy(x.matrixWorld),a.premultiply(p),r.extractRotation(a),S.halfWidth.set(x.width*.5,0,0),S.halfHeight.set(0,x.height*.5,0),S.halfWidth.applyMatrix4(r),S.halfHeight.applyMatrix4(r),g++}else if(x.isPointLight){const S=n.point[u];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(p),u++}else if(x.isHemisphereLight){const S=n.hemi[_];S.direction.setFromMatrixPosition(x.matrixWorld),S.direction.transformDirection(p),_++}}}return{setup:o,setupView:l,state:n}}function Nl(i){const t=new Gm(i),e=[],n=[];function s(h){c.camera=h,e.length=0,n.length=0}function a(h){e.push(h)}function r(h){n.push(h)}function o(){t.setup(e)}function l(h){t.setupView(e,h)}const c={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:s,state:c,setupLights:o,setupLightsView:l,pushLight:a,pushShadow:r}}function Vm(i){let t=new WeakMap;function e(s,a=0){const r=t.get(s);let o;return r===void 0?(o=new Nl(i),t.set(s,[o])):a>=r.length?(o=new Nl(i),r.push(o)):o=r[a],o}function n(){t=new WeakMap}return{get:e,dispose:n}}class Wm extends Gn{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Oh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class $m extends Gn{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const qm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Xm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Ym(i,t,e){let n=new Sr;const s=new Lt,a=new Lt,r=new Jt,o=new Wm({depthPacking:Bh}),l=new $m,c={},h=e.maxTextureSize,d={[Bn]:Ne,[Ne]:Bn,[Se]:Se},u=new wn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Lt},radius:{value:4}},vertexShader:qm,fragmentShader:Xm}),m=u.clone();m.defines.HORIZONTAL_PASS=1;const g=new le;g.setAttribute("position",new be(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new tt(g,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=pr;let f=this.type;this.render=function(C,A,L){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||C.length===0)return;const I=i.getRenderTarget(),v=i.getActiveCubeFace(),M=i.getActiveMipmapLevel(),U=i.state;U.setBlending(Nn),U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);const k=f!==vn&&this.type===vn,z=f===vn&&this.type!==vn;for(let X=0,O=C.length;X<O;X++){const Y=C[X],V=Y.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;s.copy(V.mapSize);const J=V.getFrameExtents();if(s.multiply(J),a.copy(V.mapSize),(s.x>h||s.y>h)&&(s.x>h&&(a.x=Math.floor(h/J.x),s.x=a.x*J.x,V.mapSize.x=a.x),s.y>h&&(a.y=Math.floor(h/J.y),s.y=a.y*J.y,V.mapSize.y=a.y)),V.map===null||k===!0||z===!0){const ft=this.type!==vn?{minFilter:Be,magFilter:Be}:{};V.map!==null&&V.map.dispose(),V.map=new li(s.x,s.y,ft),V.map.texture.name=Y.name+".shadowMap",V.camera.updateProjectionMatrix()}i.setRenderTarget(V.map),i.clear();const ot=V.getViewportCount();for(let ft=0;ft<ot;ft++){const zt=V.getViewport(ft);r.set(a.x*zt.x,a.y*zt.y,a.x*zt.z,a.y*zt.w),U.viewport(r),V.updateMatrices(Y,ft),n=V.getFrustum(),S(A,L,V.camera,Y,this.type)}V.isPointLightShadow!==!0&&this.type===vn&&b(V,L),V.needsUpdate=!1}f=this.type,p.needsUpdate=!1,i.setRenderTarget(I,v,M)};function b(C,A){const L=t.update(_);u.defines.VSM_SAMPLES!==C.blurSamples&&(u.defines.VSM_SAMPLES=C.blurSamples,m.defines.VSM_SAMPLES=C.blurSamples,u.needsUpdate=!0,m.needsUpdate=!0),C.mapPass===null&&(C.mapPass=new li(s.x,s.y)),u.uniforms.shadow_pass.value=C.map.texture,u.uniforms.resolution.value=C.mapSize,u.uniforms.radius.value=C.radius,i.setRenderTarget(C.mapPass),i.clear(),i.renderBufferDirect(A,null,L,u,_,null),m.uniforms.shadow_pass.value=C.mapPass.texture,m.uniforms.resolution.value=C.mapSize,m.uniforms.radius.value=C.radius,i.setRenderTarget(C.map),i.clear(),i.renderBufferDirect(A,null,L,m,_,null)}function x(C,A,L,I){let v=null;const M=L.isPointLight===!0?C.customDistanceMaterial:C.customDepthMaterial;if(M!==void 0)v=M;else if(v=L.isPointLight===!0?l:o,i.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const U=v.uuid,k=A.uuid;let z=c[U];z===void 0&&(z={},c[U]=z);let X=z[k];X===void 0&&(X=v.clone(),z[k]=X,A.addEventListener("dispose",R)),v=X}if(v.visible=A.visible,v.wireframe=A.wireframe,I===vn?v.side=A.shadowSide!==null?A.shadowSide:A.side:v.side=A.shadowSide!==null?A.shadowSide:d[A.side],v.alphaMap=A.alphaMap,v.alphaTest=A.alphaTest,v.map=A.map,v.clipShadows=A.clipShadows,v.clippingPlanes=A.clippingPlanes,v.clipIntersection=A.clipIntersection,v.displacementMap=A.displacementMap,v.displacementScale=A.displacementScale,v.displacementBias=A.displacementBias,v.wireframeLinewidth=A.wireframeLinewidth,v.linewidth=A.linewidth,L.isPointLight===!0&&v.isMeshDistanceMaterial===!0){const U=i.properties.get(v);U.light=L}return v}function S(C,A,L,I,v){if(C.visible===!1)return;if(C.layers.test(A.layers)&&(C.isMesh||C.isLine||C.isPoints)&&(C.castShadow||C.receiveShadow&&v===vn)&&(!C.frustumCulled||n.intersectsObject(C))){C.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,C.matrixWorld);const k=t.update(C),z=C.material;if(Array.isArray(z)){const X=k.groups;for(let O=0,Y=X.length;O<Y;O++){const V=X[O],J=z[V.materialIndex];if(J&&J.visible){const ot=x(C,J,I,v);C.onBeforeShadow(i,C,A,L,k,ot,V),i.renderBufferDirect(L,null,k,ot,C,V),C.onAfterShadow(i,C,A,L,k,ot,V)}}}else if(z.visible){const X=x(C,z,I,v);C.onBeforeShadow(i,C,A,L,k,X,null),i.renderBufferDirect(L,null,k,X,C,null),C.onAfterShadow(i,C,A,L,k,X,null)}}const U=C.children;for(let k=0,z=U.length;k<z;k++)S(U[k],A,L,I,v)}function R(C){C.target.removeEventListener("dispose",R);for(const L in c){const I=c[L],v=C.target.uuid;v in I&&(I[v].dispose(),delete I[v])}}}const jm={[wo]:So,[To]:Co,[Eo]:Ro,[Gi]:Ao,[So]:wo,[Co]:To,[Ro]:Eo,[Ao]:Gi};function Km(i){function t(){let D=!1;const dt=new Jt;let W=null;const Z=new Jt(0,0,0,0);return{setMask:function(ct){W!==ct&&!D&&(i.colorMask(ct,ct,ct,ct),W=ct)},setLocked:function(ct){D=ct},setClear:function(ct,ut,Vt,pe,ke){ke===!0&&(ct*=pe,ut*=pe,Vt*=pe),dt.set(ct,ut,Vt,pe),Z.equals(dt)===!1&&(i.clearColor(ct,ut,Vt,pe),Z.copy(dt))},reset:function(){D=!1,W=null,Z.set(-1,0,0,0)}}}function e(){let D=!1,dt=!1,W=null,Z=null,ct=null;return{setReversed:function(ut){dt=ut},setTest:function(ut){ut?it(i.DEPTH_TEST):nt(i.DEPTH_TEST)},setMask:function(ut){W!==ut&&!D&&(i.depthMask(ut),W=ut)},setFunc:function(ut){if(dt&&(ut=jm[ut]),Z!==ut){switch(ut){case wo:i.depthFunc(i.NEVER);break;case So:i.depthFunc(i.ALWAYS);break;case To:i.depthFunc(i.LESS);break;case Gi:i.depthFunc(i.LEQUAL);break;case Eo:i.depthFunc(i.EQUAL);break;case Ao:i.depthFunc(i.GEQUAL);break;case Co:i.depthFunc(i.GREATER);break;case Ro:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}Z=ut}},setLocked:function(ut){D=ut},setClear:function(ut){ct!==ut&&(i.clearDepth(ut),ct=ut)},reset:function(){D=!1,W=null,Z=null,ct=null}}}function n(){let D=!1,dt=null,W=null,Z=null,ct=null,ut=null,Vt=null,pe=null,ke=null;return{setTest:function(Xt){D||(Xt?it(i.STENCIL_TEST):nt(i.STENCIL_TEST))},setMask:function(Xt){dt!==Xt&&!D&&(i.stencilMask(Xt),dt=Xt)},setFunc:function(Xt,Oe,dn){(W!==Xt||Z!==Oe||ct!==dn)&&(i.stencilFunc(Xt,Oe,dn),W=Xt,Z=Oe,ct=dn)},setOp:function(Xt,Oe,dn){(ut!==Xt||Vt!==Oe||pe!==dn)&&(i.stencilOp(Xt,Oe,dn),ut=Xt,Vt=Oe,pe=dn)},setLocked:function(Xt){D=Xt},setClear:function(Xt){ke!==Xt&&(i.clearStencil(Xt),ke=Xt)},reset:function(){D=!1,dt=null,W=null,Z=null,ct=null,ut=null,Vt=null,pe=null,ke=null}}}const s=new t,a=new e,r=new n,o=new WeakMap,l=new WeakMap;let c={},h={},d=new WeakMap,u=[],m=null,g=!1,_=null,p=null,f=null,b=null,x=null,S=null,R=null,C=new St(0,0,0),A=0,L=!1,I=null,v=null,M=null,U=null,k=null;const z=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,O=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(O=parseFloat(/^WebGL (\d)/.exec(Y)[1]),X=O>=1):Y.indexOf("OpenGL ES")!==-1&&(O=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),X=O>=2);let V=null,J={};const ot=i.getParameter(i.SCISSOR_BOX),ft=i.getParameter(i.VIEWPORT),zt=new Jt().fromArray(ot),kt=new Jt().fromArray(ft);function q(D,dt,W,Z){const ct=new Uint8Array(4),ut=i.createTexture();i.bindTexture(D,ut),i.texParameteri(D,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(D,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Vt=0;Vt<W;Vt++)D===i.TEXTURE_3D||D===i.TEXTURE_2D_ARRAY?i.texImage3D(dt,0,i.RGBA,1,1,Z,0,i.RGBA,i.UNSIGNED_BYTE,ct):i.texImage2D(dt+Vt,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,ct);return ut}const $={};$[i.TEXTURE_2D]=q(i.TEXTURE_2D,i.TEXTURE_2D,1),$[i.TEXTURE_CUBE_MAP]=q(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[i.TEXTURE_2D_ARRAY]=q(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),$[i.TEXTURE_3D]=q(i.TEXTURE_3D,i.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),r.setClear(0),it(i.DEPTH_TEST),a.setFunc(Gi),Ht(!1),Wt($r),it(i.CULL_FACE),P(Nn);function it(D){c[D]!==!0&&(i.enable(D),c[D]=!0)}function nt(D){c[D]!==!1&&(i.disable(D),c[D]=!1)}function xt(D,dt){return h[D]!==dt?(i.bindFramebuffer(D,dt),h[D]=dt,D===i.DRAW_FRAMEBUFFER&&(h[i.FRAMEBUFFER]=dt),D===i.FRAMEBUFFER&&(h[i.DRAW_FRAMEBUFFER]=dt),!0):!1}function pt(D,dt){let W=u,Z=!1;if(D){W=d.get(dt),W===void 0&&(W=[],d.set(dt,W));const ct=D.textures;if(W.length!==ct.length||W[0]!==i.COLOR_ATTACHMENT0){for(let ut=0,Vt=ct.length;ut<Vt;ut++)W[ut]=i.COLOR_ATTACHMENT0+ut;W.length=ct.length,Z=!0}}else W[0]!==i.BACK&&(W[0]=i.BACK,Z=!0);Z&&i.drawBuffers(W)}function Dt(D){return m!==D?(i.useProgram(D),m=D,!0):!1}const Ot={[Jn]:i.FUNC_ADD,[uh]:i.FUNC_SUBTRACT,[fh]:i.FUNC_REVERSE_SUBTRACT};Ot[ph]=i.MIN,Ot[mh]=i.MAX;const At={[gh]:i.ZERO,[vh]:i.ONE,[_h]:i.SRC_COLOR,[yo]:i.SRC_ALPHA,[Sh]:i.SRC_ALPHA_SATURATE,[bh]:i.DST_COLOR,[xh]:i.DST_ALPHA,[Mh]:i.ONE_MINUS_SRC_COLOR,[bo]:i.ONE_MINUS_SRC_ALPHA,[wh]:i.ONE_MINUS_DST_COLOR,[yh]:i.ONE_MINUS_DST_ALPHA,[Th]:i.CONSTANT_COLOR,[Eh]:i.ONE_MINUS_CONSTANT_COLOR,[Ah]:i.CONSTANT_ALPHA,[Ch]:i.ONE_MINUS_CONSTANT_ALPHA};function P(D,dt,W,Z,ct,ut,Vt,pe,ke,Xt){if(D===Nn){g===!0&&(nt(i.BLEND),g=!1);return}if(g===!1&&(it(i.BLEND),g=!0),D!==dh){if(D!==_||Xt!==L){if((p!==Jn||x!==Jn)&&(i.blendEquation(i.FUNC_ADD),p=Jn,x=Jn),Xt)switch(D){case ai:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case oi:i.blendFunc(i.ONE,i.ONE);break;case qr:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Xr:i.blendFuncSeparate(i.ZERO,i.SRC_COLOR,i.ZERO,i.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}else switch(D){case ai:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case oi:i.blendFunc(i.SRC_ALPHA,i.ONE);break;case qr:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case Xr:i.blendFunc(i.ZERO,i.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",D);break}f=null,b=null,S=null,R=null,C.set(0,0,0),A=0,_=D,L=Xt}return}ct=ct||dt,ut=ut||W,Vt=Vt||Z,(dt!==p||ct!==x)&&(i.blendEquationSeparate(Ot[dt],Ot[ct]),p=dt,x=ct),(W!==f||Z!==b||ut!==S||Vt!==R)&&(i.blendFuncSeparate(At[W],At[Z],At[ut],At[Vt]),f=W,b=Z,S=ut,R=Vt),(pe.equals(C)===!1||ke!==A)&&(i.blendColor(pe.r,pe.g,pe.b,ke),C.copy(pe),A=ke),_=D,L=!1}function fe(D,dt){D.side===Se?nt(i.CULL_FACE):it(i.CULL_FACE);let W=D.side===Ne;dt&&(W=!W),Ht(W),D.blending===ai&&D.transparent===!1?P(Nn):P(D.blending,D.blendEquation,D.blendSrc,D.blendDst,D.blendEquationAlpha,D.blendSrcAlpha,D.blendDstAlpha,D.blendColor,D.blendAlpha,D.premultipliedAlpha),a.setFunc(D.depthFunc),a.setTest(D.depthTest),a.setMask(D.depthWrite),s.setMask(D.colorWrite);const Z=D.stencilWrite;r.setTest(Z),Z&&(r.setMask(D.stencilWriteMask),r.setFunc(D.stencilFunc,D.stencilRef,D.stencilFuncMask),r.setOp(D.stencilFail,D.stencilZFail,D.stencilZPass)),ie(D.polygonOffset,D.polygonOffsetFactor,D.polygonOffsetUnits),D.alphaToCoverage===!0?it(i.SAMPLE_ALPHA_TO_COVERAGE):nt(i.SAMPLE_ALPHA_TO_COVERAGE)}function Ht(D){I!==D&&(D?i.frontFace(i.CW):i.frontFace(i.CCW),I=D)}function Wt(D){D!==ch?(it(i.CULL_FACE),D!==v&&(D===$r?i.cullFace(i.BACK):D===hh?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):nt(i.CULL_FACE),v=D}function Ct(D){D!==M&&(X&&i.lineWidth(D),M=D)}function ie(D,dt,W){D?(it(i.POLYGON_OFFSET_FILL),(U!==dt||k!==W)&&(i.polygonOffset(dt,W),U=dt,k=W)):nt(i.POLYGON_OFFSET_FILL)}function It(D){D?it(i.SCISSOR_TEST):nt(i.SCISSOR_TEST)}function E(D){D===void 0&&(D=i.TEXTURE0+z-1),V!==D&&(i.activeTexture(D),V=D)}function y(D,dt,W){W===void 0&&(V===null?W=i.TEXTURE0+z-1:W=V);let Z=J[W];Z===void 0&&(Z={type:void 0,texture:void 0},J[W]=Z),(Z.type!==D||Z.texture!==dt)&&(V!==W&&(i.activeTexture(W),V=W),i.bindTexture(D,dt||$[D]),Z.type=D,Z.texture=dt)}function B(){const D=J[V];D!==void 0&&D.type!==void 0&&(i.bindTexture(D.type,null),D.type=void 0,D.texture=void 0)}function K(){try{i.compressedTexImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function et(){try{i.compressedTexImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function j(){try{i.texSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function yt(){try{i.texSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function lt(){try{i.compressedTexSubImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function mt(){try{i.compressedTexSubImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function $t(){try{i.texStorage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function st(){try{i.texStorage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function gt(){try{i.texImage2D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Rt(){try{i.texImage3D.apply(i,arguments)}catch(D){console.error("THREE.WebGLState:",D)}}function Pt(D){zt.equals(D)===!1&&(i.scissor(D.x,D.y,D.z,D.w),zt.copy(D))}function vt(D){kt.equals(D)===!1&&(i.viewport(D.x,D.y,D.z,D.w),kt.copy(D))}function Gt(D,dt){let W=l.get(dt);W===void 0&&(W=new WeakMap,l.set(dt,W));let Z=W.get(D);Z===void 0&&(Z=i.getUniformBlockIndex(dt,D.name),W.set(D,Z))}function Ut(D,dt){const Z=l.get(dt).get(D);o.get(dt)!==Z&&(i.uniformBlockBinding(dt,Z,D.__bindingPointIndex),o.set(dt,Z))}function te(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),c={},V=null,J={},h={},d=new WeakMap,u=[],m=null,g=!1,_=null,p=null,f=null,b=null,x=null,S=null,R=null,C=new St(0,0,0),A=0,L=!1,I=null,v=null,M=null,U=null,k=null,zt.set(0,0,i.canvas.width,i.canvas.height),kt.set(0,0,i.canvas.width,i.canvas.height),s.reset(),a.reset(),r.reset()}return{buffers:{color:s,depth:a,stencil:r},enable:it,disable:nt,bindFramebuffer:xt,drawBuffers:pt,useProgram:Dt,setBlending:P,setMaterial:fe,setFlipSided:Ht,setCullFace:Wt,setLineWidth:Ct,setPolygonOffset:ie,setScissorTest:It,activeTexture:E,bindTexture:y,unbindTexture:B,compressedTexImage2D:K,compressedTexImage3D:et,texImage2D:gt,texImage3D:Rt,updateUBOMapping:Gt,uniformBlockBinding:Ut,texStorage2D:$t,texStorage3D:st,texSubImage2D:j,texSubImage3D:yt,compressedTexSubImage2D:lt,compressedTexSubImage3D:mt,scissor:Pt,viewport:vt,reset:te}}function Fl(i,t,e,n){const s=Zm(n);switch(e){case pc:return i*t;case gc:return i*t;case vc:return i*t*2;case _r:return i*t/s.components*s.byteLength;case Mr:return i*t/s.components*s.byteLength;case _c:return i*t*2/s.components*s.byteLength;case xr:return i*t*2/s.components*s.byteLength;case mc:return i*t*3/s.components*s.byteLength;case on:return i*t*4/s.components*s.byteLength;case yr:return i*t*4/s.components*s.byteLength;case sa:case aa:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case oa:case ra:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case No:case ko:return Math.max(i,16)*Math.max(t,8)/4;case Uo:case Fo:return Math.max(i,8)*Math.max(t,8)/2;case Oo:case Bo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*8;case zo:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Ho:return Math.floor((i+3)/4)*Math.floor((t+3)/4)*16;case Go:return Math.floor((i+4)/5)*Math.floor((t+3)/4)*16;case Vo:return Math.floor((i+4)/5)*Math.floor((t+4)/5)*16;case Wo:return Math.floor((i+5)/6)*Math.floor((t+4)/5)*16;case $o:return Math.floor((i+5)/6)*Math.floor((t+5)/6)*16;case qo:return Math.floor((i+7)/8)*Math.floor((t+4)/5)*16;case Xo:return Math.floor((i+7)/8)*Math.floor((t+5)/6)*16;case Yo:return Math.floor((i+7)/8)*Math.floor((t+7)/8)*16;case jo:return Math.floor((i+9)/10)*Math.floor((t+4)/5)*16;case Ko:return Math.floor((i+9)/10)*Math.floor((t+5)/6)*16;case Zo:return Math.floor((i+9)/10)*Math.floor((t+7)/8)*16;case Qo:return Math.floor((i+9)/10)*Math.floor((t+9)/10)*16;case Jo:return Math.floor((i+11)/12)*Math.floor((t+9)/10)*16;case tr:return Math.floor((i+11)/12)*Math.floor((t+11)/12)*16;case la:case er:case nr:return Math.ceil(i/4)*Math.ceil(t/4)*16;case Mc:case ir:return Math.ceil(i/4)*Math.ceil(t/4)*8;case sr:case ar:return Math.ceil(i/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Zm(i){switch(i){case bn:case dc:return{byteLength:1,components:1};case ps:case uc:case _s:return{byteLength:2,components:1};case gr:case vr:return{byteLength:2,components:4};case ri:case mr:case cn:return{byteLength:4,components:1};case fc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${i}.`)}function Qm(i,t,e,n,s,a,r){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Lt,h=new WeakMap;let d;const u=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(E,y){return m?new OffscreenCanvas(E,y):ma("canvas")}function _(E,y,B){let K=1;const et=It(E);if((et.width>B||et.height>B)&&(K=B/Math.max(et.width,et.height)),K<1)if(typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&E instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&E instanceof ImageBitmap||typeof VideoFrame<"u"&&E instanceof VideoFrame){const j=Math.floor(K*et.width),yt=Math.floor(K*et.height);d===void 0&&(d=g(j,yt));const lt=y?g(j,yt):d;return lt.width=j,lt.height=yt,lt.getContext("2d").drawImage(E,0,0,j,yt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+j+"x"+yt+")."),lt}else return"data"in E&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+")."),E;return E}function p(E){return E.generateMipmaps&&E.minFilter!==Be&&E.minFilter!==an}function f(E){i.generateMipmap(E)}function b(E,y,B,K,et=!1){if(E!==null){if(i[E]!==void 0)return i[E];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+E+"'")}let j=y;if(y===i.RED&&(B===i.FLOAT&&(j=i.R32F),B===i.HALF_FLOAT&&(j=i.R16F),B===i.UNSIGNED_BYTE&&(j=i.R8)),y===i.RED_INTEGER&&(B===i.UNSIGNED_BYTE&&(j=i.R8UI),B===i.UNSIGNED_SHORT&&(j=i.R16UI),B===i.UNSIGNED_INT&&(j=i.R32UI),B===i.BYTE&&(j=i.R8I),B===i.SHORT&&(j=i.R16I),B===i.INT&&(j=i.R32I)),y===i.RG&&(B===i.FLOAT&&(j=i.RG32F),B===i.HALF_FLOAT&&(j=i.RG16F),B===i.UNSIGNED_BYTE&&(j=i.RG8)),y===i.RG_INTEGER&&(B===i.UNSIGNED_BYTE&&(j=i.RG8UI),B===i.UNSIGNED_SHORT&&(j=i.RG16UI),B===i.UNSIGNED_INT&&(j=i.RG32UI),B===i.BYTE&&(j=i.RG8I),B===i.SHORT&&(j=i.RG16I),B===i.INT&&(j=i.RG32I)),y===i.RGB_INTEGER&&(B===i.UNSIGNED_BYTE&&(j=i.RGB8UI),B===i.UNSIGNED_SHORT&&(j=i.RGB16UI),B===i.UNSIGNED_INT&&(j=i.RGB32UI),B===i.BYTE&&(j=i.RGB8I),B===i.SHORT&&(j=i.RGB16I),B===i.INT&&(j=i.RGB32I)),y===i.RGBA_INTEGER&&(B===i.UNSIGNED_BYTE&&(j=i.RGBA8UI),B===i.UNSIGNED_SHORT&&(j=i.RGBA16UI),B===i.UNSIGNED_INT&&(j=i.RGBA32UI),B===i.BYTE&&(j=i.RGBA8I),B===i.SHORT&&(j=i.RGBA16I),B===i.INT&&(j=i.RGBA32I)),y===i.RGB&&B===i.UNSIGNED_INT_5_9_9_9_REV&&(j=i.RGB9_E5),y===i.RGBA){const yt=et?da:Kt.getTransfer(K);B===i.FLOAT&&(j=i.RGBA32F),B===i.HALF_FLOAT&&(j=i.RGBA16F),B===i.UNSIGNED_BYTE&&(j=yt===ae?i.SRGB8_ALPHA8:i.RGBA8),B===i.UNSIGNED_SHORT_4_4_4_4&&(j=i.RGBA4),B===i.UNSIGNED_SHORT_5_5_5_1&&(j=i.RGB5_A1)}return(j===i.R16F||j===i.R32F||j===i.RG16F||j===i.RG32F||j===i.RGBA16F||j===i.RGBA32F)&&t.get("EXT_color_buffer_float"),j}function x(E,y){let B;return E?y===null||y===ri||y===$i?B=i.DEPTH24_STENCIL8:y===cn?B=i.DEPTH32F_STENCIL8:y===ps&&(B=i.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===ri||y===$i?B=i.DEPTH_COMPONENT24:y===cn?B=i.DEPTH_COMPONENT32F:y===ps&&(B=i.DEPTH_COMPONENT16),B}function S(E,y){return p(E)===!0||E.isFramebufferTexture&&E.minFilter!==Be&&E.minFilter!==an?Math.log2(Math.max(y.width,y.height))+1:E.mipmaps!==void 0&&E.mipmaps.length>0?E.mipmaps.length:E.isCompressedTexture&&Array.isArray(E.image)?y.mipmaps.length:1}function R(E){const y=E.target;y.removeEventListener("dispose",R),A(y),y.isVideoTexture&&h.delete(y)}function C(E){const y=E.target;y.removeEventListener("dispose",C),I(y)}function A(E){const y=n.get(E);if(y.__webglInit===void 0)return;const B=E.source,K=u.get(B);if(K){const et=K[y.__cacheKey];et.usedTimes--,et.usedTimes===0&&L(E),Object.keys(K).length===0&&u.delete(B)}n.remove(E)}function L(E){const y=n.get(E);i.deleteTexture(y.__webglTexture);const B=E.source,K=u.get(B);delete K[y.__cacheKey],r.memory.textures--}function I(E){const y=n.get(E);if(E.depthTexture&&E.depthTexture.dispose(),E.isWebGLCubeRenderTarget)for(let K=0;K<6;K++){if(Array.isArray(y.__webglFramebuffer[K]))for(let et=0;et<y.__webglFramebuffer[K].length;et++)i.deleteFramebuffer(y.__webglFramebuffer[K][et]);else i.deleteFramebuffer(y.__webglFramebuffer[K]);y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer[K])}else{if(Array.isArray(y.__webglFramebuffer))for(let K=0;K<y.__webglFramebuffer.length;K++)i.deleteFramebuffer(y.__webglFramebuffer[K]);else i.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&i.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&i.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let K=0;K<y.__webglColorRenderbuffer.length;K++)y.__webglColorRenderbuffer[K]&&i.deleteRenderbuffer(y.__webglColorRenderbuffer[K]);y.__webglDepthRenderbuffer&&i.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const B=E.textures;for(let K=0,et=B.length;K<et;K++){const j=n.get(B[K]);j.__webglTexture&&(i.deleteTexture(j.__webglTexture),r.memory.textures--),n.remove(B[K])}n.remove(E)}let v=0;function M(){v=0}function U(){const E=v;return E>=s.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+E+" texture units while this GPU supports only "+s.maxTextures),v+=1,E}function k(E){const y=[];return y.push(E.wrapS),y.push(E.wrapT),y.push(E.wrapR||0),y.push(E.magFilter),y.push(E.minFilter),y.push(E.anisotropy),y.push(E.internalFormat),y.push(E.format),y.push(E.type),y.push(E.generateMipmaps),y.push(E.premultiplyAlpha),y.push(E.flipY),y.push(E.unpackAlignment),y.push(E.colorSpace),y.join()}function z(E,y){const B=n.get(E);if(E.isVideoTexture&&Ct(E),E.isRenderTargetTexture===!1&&E.version>0&&B.__version!==E.version){const K=E.image;if(K===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(K.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{kt(B,E,y);return}}e.bindTexture(i.TEXTURE_2D,B.__webglTexture,i.TEXTURE0+y)}function X(E,y){const B=n.get(E);if(E.version>0&&B.__version!==E.version){kt(B,E,y);return}e.bindTexture(i.TEXTURE_2D_ARRAY,B.__webglTexture,i.TEXTURE0+y)}function O(E,y){const B=n.get(E);if(E.version>0&&B.__version!==E.version){kt(B,E,y);return}e.bindTexture(i.TEXTURE_3D,B.__webglTexture,i.TEXTURE0+y)}function Y(E,y){const B=n.get(E);if(E.version>0&&B.__version!==E.version){q(B,E,y);return}e.bindTexture(i.TEXTURE_CUBE_MAP,B.__webglTexture,i.TEXTURE0+y)}const V={[Io]:i.REPEAT,[ni]:i.CLAMP_TO_EDGE,[Do]:i.MIRRORED_REPEAT},J={[Be]:i.NEAREST,[kh]:i.NEAREST_MIPMAP_NEAREST,[bs]:i.NEAREST_MIPMAP_LINEAR,[an]:i.LINEAR,[Da]:i.LINEAR_MIPMAP_NEAREST,[ii]:i.LINEAR_MIPMAP_LINEAR},ot={[Hh]:i.NEVER,[Xh]:i.ALWAYS,[Gh]:i.LESS,[yc]:i.LEQUAL,[Vh]:i.EQUAL,[qh]:i.GEQUAL,[Wh]:i.GREATER,[$h]:i.NOTEQUAL};function ft(E,y){if(y.type===cn&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===an||y.magFilter===Da||y.magFilter===bs||y.magFilter===ii||y.minFilter===an||y.minFilter===Da||y.minFilter===bs||y.minFilter===ii)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(E,i.TEXTURE_WRAP_S,V[y.wrapS]),i.texParameteri(E,i.TEXTURE_WRAP_T,V[y.wrapT]),(E===i.TEXTURE_3D||E===i.TEXTURE_2D_ARRAY)&&i.texParameteri(E,i.TEXTURE_WRAP_R,V[y.wrapR]),i.texParameteri(E,i.TEXTURE_MAG_FILTER,J[y.magFilter]),i.texParameteri(E,i.TEXTURE_MIN_FILTER,J[y.minFilter]),y.compareFunction&&(i.texParameteri(E,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(E,i.TEXTURE_COMPARE_FUNC,ot[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Be||y.minFilter!==bs&&y.minFilter!==ii||y.type===cn&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const B=t.get("EXT_texture_filter_anisotropic");i.texParameterf(E,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,s.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function zt(E,y){let B=!1;E.__webglInit===void 0&&(E.__webglInit=!0,y.addEventListener("dispose",R));const K=y.source;let et=u.get(K);et===void 0&&(et={},u.set(K,et));const j=k(y);if(j!==E.__cacheKey){et[j]===void 0&&(et[j]={texture:i.createTexture(),usedTimes:0},r.memory.textures++,B=!0),et[j].usedTimes++;const yt=et[E.__cacheKey];yt!==void 0&&(et[E.__cacheKey].usedTimes--,yt.usedTimes===0&&L(y)),E.__cacheKey=j,E.__webglTexture=et[j].texture}return B}function kt(E,y,B){let K=i.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(K=i.TEXTURE_2D_ARRAY),y.isData3DTexture&&(K=i.TEXTURE_3D);const et=zt(E,y),j=y.source;e.bindTexture(K,E.__webglTexture,i.TEXTURE0+B);const yt=n.get(j);if(j.version!==yt.__version||et===!0){e.activeTexture(i.TEXTURE0+B);const lt=Kt.getPrimaries(Kt.workingColorSpace),mt=y.colorSpace===Un?null:Kt.getPrimaries(y.colorSpace),$t=y.colorSpace===Un||lt===mt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,$t);let st=_(y.image,!1,s.maxTextureSize);st=ie(y,st);const gt=a.convert(y.format,y.colorSpace),Rt=a.convert(y.type);let Pt=b(y.internalFormat,gt,Rt,y.colorSpace,y.isVideoTexture);ft(K,y);let vt;const Gt=y.mipmaps,Ut=y.isVideoTexture!==!0,te=yt.__version===void 0||et===!0,D=j.dataReady,dt=S(y,st);if(y.isDepthTexture)Pt=x(y.format===qi,y.type),te&&(Ut?e.texStorage2D(i.TEXTURE_2D,1,Pt,st.width,st.height):e.texImage2D(i.TEXTURE_2D,0,Pt,st.width,st.height,0,gt,Rt,null));else if(y.isDataTexture)if(Gt.length>0){Ut&&te&&e.texStorage2D(i.TEXTURE_2D,dt,Pt,Gt[0].width,Gt[0].height);for(let W=0,Z=Gt.length;W<Z;W++)vt=Gt[W],Ut?D&&e.texSubImage2D(i.TEXTURE_2D,W,0,0,vt.width,vt.height,gt,Rt,vt.data):e.texImage2D(i.TEXTURE_2D,W,Pt,vt.width,vt.height,0,gt,Rt,vt.data);y.generateMipmaps=!1}else Ut?(te&&e.texStorage2D(i.TEXTURE_2D,dt,Pt,st.width,st.height),D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,st.width,st.height,gt,Rt,st.data)):e.texImage2D(i.TEXTURE_2D,0,Pt,st.width,st.height,0,gt,Rt,st.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Ut&&te&&e.texStorage3D(i.TEXTURE_2D_ARRAY,dt,Pt,Gt[0].width,Gt[0].height,st.depth);for(let W=0,Z=Gt.length;W<Z;W++)if(vt=Gt[W],y.format!==on)if(gt!==null)if(Ut){if(D)if(y.layerUpdates.size>0){const ct=Fl(vt.width,vt.height,y.format,y.type);for(const ut of y.layerUpdates){const Vt=vt.data.subarray(ut*ct/vt.data.BYTES_PER_ELEMENT,(ut+1)*ct/vt.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,W,0,0,ut,vt.width,vt.height,1,gt,Vt,0,0)}y.clearLayerUpdates()}else e.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,W,0,0,0,vt.width,vt.height,st.depth,gt,vt.data,0,0)}else e.compressedTexImage3D(i.TEXTURE_2D_ARRAY,W,Pt,vt.width,vt.height,st.depth,0,vt.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Ut?D&&e.texSubImage3D(i.TEXTURE_2D_ARRAY,W,0,0,0,vt.width,vt.height,st.depth,gt,Rt,vt.data):e.texImage3D(i.TEXTURE_2D_ARRAY,W,Pt,vt.width,vt.height,st.depth,0,gt,Rt,vt.data)}else{Ut&&te&&e.texStorage2D(i.TEXTURE_2D,dt,Pt,Gt[0].width,Gt[0].height);for(let W=0,Z=Gt.length;W<Z;W++)vt=Gt[W],y.format!==on?gt!==null?Ut?D&&e.compressedTexSubImage2D(i.TEXTURE_2D,W,0,0,vt.width,vt.height,gt,vt.data):e.compressedTexImage2D(i.TEXTURE_2D,W,Pt,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Ut?D&&e.texSubImage2D(i.TEXTURE_2D,W,0,0,vt.width,vt.height,gt,Rt,vt.data):e.texImage2D(i.TEXTURE_2D,W,Pt,vt.width,vt.height,0,gt,Rt,vt.data)}else if(y.isDataArrayTexture)if(Ut){if(te&&e.texStorage3D(i.TEXTURE_2D_ARRAY,dt,Pt,st.width,st.height,st.depth),D)if(y.layerUpdates.size>0){const W=Fl(st.width,st.height,y.format,y.type);for(const Z of y.layerUpdates){const ct=st.data.subarray(Z*W/st.data.BYTES_PER_ELEMENT,(Z+1)*W/st.data.BYTES_PER_ELEMENT);e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Z,st.width,st.height,1,gt,Rt,ct)}y.clearLayerUpdates()}else e.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,st.width,st.height,st.depth,gt,Rt,st.data)}else e.texImage3D(i.TEXTURE_2D_ARRAY,0,Pt,st.width,st.height,st.depth,0,gt,Rt,st.data);else if(y.isData3DTexture)Ut?(te&&e.texStorage3D(i.TEXTURE_3D,dt,Pt,st.width,st.height,st.depth),D&&e.texSubImage3D(i.TEXTURE_3D,0,0,0,0,st.width,st.height,st.depth,gt,Rt,st.data)):e.texImage3D(i.TEXTURE_3D,0,Pt,st.width,st.height,st.depth,0,gt,Rt,st.data);else if(y.isFramebufferTexture){if(te)if(Ut)e.texStorage2D(i.TEXTURE_2D,dt,Pt,st.width,st.height);else{let W=st.width,Z=st.height;for(let ct=0;ct<dt;ct++)e.texImage2D(i.TEXTURE_2D,ct,Pt,W,Z,0,gt,Rt,null),W>>=1,Z>>=1}}else if(Gt.length>0){if(Ut&&te){const W=It(Gt[0]);e.texStorage2D(i.TEXTURE_2D,dt,Pt,W.width,W.height)}for(let W=0,Z=Gt.length;W<Z;W++)vt=Gt[W],Ut?D&&e.texSubImage2D(i.TEXTURE_2D,W,0,0,gt,Rt,vt):e.texImage2D(i.TEXTURE_2D,W,Pt,gt,Rt,vt);y.generateMipmaps=!1}else if(Ut){if(te){const W=It(st);e.texStorage2D(i.TEXTURE_2D,dt,Pt,W.width,W.height)}D&&e.texSubImage2D(i.TEXTURE_2D,0,0,0,gt,Rt,st)}else e.texImage2D(i.TEXTURE_2D,0,Pt,gt,Rt,st);p(y)&&f(K),yt.__version=j.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function q(E,y,B){if(y.image.length!==6)return;const K=zt(E,y),et=y.source;e.bindTexture(i.TEXTURE_CUBE_MAP,E.__webglTexture,i.TEXTURE0+B);const j=n.get(et);if(et.version!==j.__version||K===!0){e.activeTexture(i.TEXTURE0+B);const yt=Kt.getPrimaries(Kt.workingColorSpace),lt=y.colorSpace===Un?null:Kt.getPrimaries(y.colorSpace),mt=y.colorSpace===Un||yt===lt?i.NONE:i.BROWSER_DEFAULT_WEBGL;i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,y.flipY),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),i.pixelStorei(i.UNPACK_ALIGNMENT,y.unpackAlignment),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,mt);const $t=y.isCompressedTexture||y.image[0].isCompressedTexture,st=y.image[0]&&y.image[0].isDataTexture,gt=[];for(let Z=0;Z<6;Z++)!$t&&!st?gt[Z]=_(y.image[Z],!0,s.maxCubemapSize):gt[Z]=st?y.image[Z].image:y.image[Z],gt[Z]=ie(y,gt[Z]);const Rt=gt[0],Pt=a.convert(y.format,y.colorSpace),vt=a.convert(y.type),Gt=b(y.internalFormat,Pt,vt,y.colorSpace),Ut=y.isVideoTexture!==!0,te=j.__version===void 0||K===!0,D=et.dataReady;let dt=S(y,Rt);ft(i.TEXTURE_CUBE_MAP,y);let W;if($t){Ut&&te&&e.texStorage2D(i.TEXTURE_CUBE_MAP,dt,Gt,Rt.width,Rt.height);for(let Z=0;Z<6;Z++){W=gt[Z].mipmaps;for(let ct=0;ct<W.length;ct++){const ut=W[ct];y.format!==on?Pt!==null?Ut?D&&e.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ct,0,0,ut.width,ut.height,Pt,ut.data):e.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ct,Gt,ut.width,ut.height,0,ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ut?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ct,0,0,ut.width,ut.height,Pt,vt,ut.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ct,Gt,ut.width,ut.height,0,Pt,vt,ut.data)}}}else{if(W=y.mipmaps,Ut&&te){W.length>0&&dt++;const Z=It(gt[0]);e.texStorage2D(i.TEXTURE_CUBE_MAP,dt,Gt,Z.width,Z.height)}for(let Z=0;Z<6;Z++)if(st){Ut?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,gt[Z].width,gt[Z].height,Pt,vt,gt[Z].data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Gt,gt[Z].width,gt[Z].height,0,Pt,vt,gt[Z].data);for(let ct=0;ct<W.length;ct++){const Vt=W[ct].image[Z].image;Ut?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ct+1,0,0,Vt.width,Vt.height,Pt,vt,Vt.data):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ct+1,Gt,Vt.width,Vt.height,0,Pt,vt,Vt.data)}}else{Ut?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,0,0,Pt,vt,gt[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,0,Gt,Pt,vt,gt[Z]);for(let ct=0;ct<W.length;ct++){const ut=W[ct];Ut?D&&e.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ct+1,0,0,Pt,vt,ut.image[Z]):e.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Z,ct+1,Gt,Pt,vt,ut.image[Z])}}}p(y)&&f(i.TEXTURE_CUBE_MAP),j.__version=et.version,y.onUpdate&&y.onUpdate(y)}E.__version=y.version}function $(E,y,B,K,et,j){const yt=a.convert(B.format,B.colorSpace),lt=a.convert(B.type),mt=b(B.internalFormat,yt,lt,B.colorSpace);if(!n.get(y).__hasExternalTextures){const st=Math.max(1,y.width>>j),gt=Math.max(1,y.height>>j);et===i.TEXTURE_3D||et===i.TEXTURE_2D_ARRAY?e.texImage3D(et,j,mt,st,gt,y.depth,0,yt,lt,null):e.texImage2D(et,j,mt,st,gt,0,yt,lt,null)}e.bindFramebuffer(i.FRAMEBUFFER,E),Wt(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,K,et,n.get(B).__webglTexture,0,Ht(y)):(et===i.TEXTURE_2D||et>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,K,et,n.get(B).__webglTexture,j),e.bindFramebuffer(i.FRAMEBUFFER,null)}function it(E,y,B){if(i.bindRenderbuffer(i.RENDERBUFFER,E),y.depthBuffer){const K=y.depthTexture,et=K&&K.isDepthTexture?K.type:null,j=x(y.stencilBuffer,et),yt=y.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,lt=Ht(y);Wt(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,lt,j,y.width,y.height):B?i.renderbufferStorageMultisample(i.RENDERBUFFER,lt,j,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,j,y.width,y.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,yt,i.RENDERBUFFER,E)}else{const K=y.textures;for(let et=0;et<K.length;et++){const j=K[et],yt=a.convert(j.format,j.colorSpace),lt=a.convert(j.type),mt=b(j.internalFormat,yt,lt,j.colorSpace),$t=Ht(y);B&&Wt(y)===!1?i.renderbufferStorageMultisample(i.RENDERBUFFER,$t,mt,y.width,y.height):Wt(y)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,$t,mt,y.width,y.height):i.renderbufferStorage(i.RENDERBUFFER,mt,y.width,y.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function nt(E,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(i.FRAMEBUFFER,E),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),z(y.depthTexture,0);const K=n.get(y.depthTexture).__webglTexture,et=Ht(y);if(y.depthTexture.format===Bi)Wt(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0,et):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_ATTACHMENT,i.TEXTURE_2D,K,0);else if(y.depthTexture.format===qi)Wt(y)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0,et):i.framebufferTexture2D(i.FRAMEBUFFER,i.DEPTH_STENCIL_ATTACHMENT,i.TEXTURE_2D,K,0);else throw new Error("Unknown depthTexture format")}function xt(E){const y=n.get(E),B=E.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==E.depthTexture){const K=E.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),K){const et=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,K.removeEventListener("dispose",et)};K.addEventListener("dispose",et),y.__depthDisposeCallback=et}y.__boundDepthTexture=K}if(E.depthTexture&&!y.__autoAllocateDepthBuffer){if(B)throw new Error("target.depthTexture not supported in Cube render targets");nt(y.__webglFramebuffer,E)}else if(B){y.__webglDepthbuffer=[];for(let K=0;K<6;K++)if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer[K]),y.__webglDepthbuffer[K]===void 0)y.__webglDepthbuffer[K]=i.createRenderbuffer(),it(y.__webglDepthbuffer[K],E,!1);else{const et=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,j=y.__webglDepthbuffer[K];i.bindRenderbuffer(i.RENDERBUFFER,j),i.framebufferRenderbuffer(i.FRAMEBUFFER,et,i.RENDERBUFFER,j)}}else if(e.bindFramebuffer(i.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=i.createRenderbuffer(),it(y.__webglDepthbuffer,E,!1);else{const K=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,et=y.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,et),i.framebufferRenderbuffer(i.FRAMEBUFFER,K,i.RENDERBUFFER,et)}e.bindFramebuffer(i.FRAMEBUFFER,null)}function pt(E,y,B){const K=n.get(E);y!==void 0&&$(K.__webglFramebuffer,E,E.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),B!==void 0&&xt(E)}function Dt(E){const y=E.texture,B=n.get(E),K=n.get(y);E.addEventListener("dispose",C);const et=E.textures,j=E.isWebGLCubeRenderTarget===!0,yt=et.length>1;if(yt||(K.__webglTexture===void 0&&(K.__webglTexture=i.createTexture()),K.__version=y.version,r.memory.textures++),j){B.__webglFramebuffer=[];for(let lt=0;lt<6;lt++)if(y.mipmaps&&y.mipmaps.length>0){B.__webglFramebuffer[lt]=[];for(let mt=0;mt<y.mipmaps.length;mt++)B.__webglFramebuffer[lt][mt]=i.createFramebuffer()}else B.__webglFramebuffer[lt]=i.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){B.__webglFramebuffer=[];for(let lt=0;lt<y.mipmaps.length;lt++)B.__webglFramebuffer[lt]=i.createFramebuffer()}else B.__webglFramebuffer=i.createFramebuffer();if(yt)for(let lt=0,mt=et.length;lt<mt;lt++){const $t=n.get(et[lt]);$t.__webglTexture===void 0&&($t.__webglTexture=i.createTexture(),r.memory.textures++)}if(E.samples>0&&Wt(E)===!1){B.__webglMultisampledFramebuffer=i.createFramebuffer(),B.__webglColorRenderbuffer=[],e.bindFramebuffer(i.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let lt=0;lt<et.length;lt++){const mt=et[lt];B.__webglColorRenderbuffer[lt]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,B.__webglColorRenderbuffer[lt]);const $t=a.convert(mt.format,mt.colorSpace),st=a.convert(mt.type),gt=b(mt.internalFormat,$t,st,mt.colorSpace,E.isXRRenderTarget===!0),Rt=Ht(E);i.renderbufferStorageMultisample(i.RENDERBUFFER,Rt,gt,E.width,E.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+lt,i.RENDERBUFFER,B.__webglColorRenderbuffer[lt])}i.bindRenderbuffer(i.RENDERBUFFER,null),E.depthBuffer&&(B.__webglDepthRenderbuffer=i.createRenderbuffer(),it(B.__webglDepthRenderbuffer,E,!0)),e.bindFramebuffer(i.FRAMEBUFFER,null)}}if(j){e.bindTexture(i.TEXTURE_CUBE_MAP,K.__webglTexture),ft(i.TEXTURE_CUBE_MAP,y);for(let lt=0;lt<6;lt++)if(y.mipmaps&&y.mipmaps.length>0)for(let mt=0;mt<y.mipmaps.length;mt++)$(B.__webglFramebuffer[lt][mt],E,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,mt);else $(B.__webglFramebuffer[lt],E,y,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+lt,0);p(y)&&f(i.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(yt){for(let lt=0,mt=et.length;lt<mt;lt++){const $t=et[lt],st=n.get($t);e.bindTexture(i.TEXTURE_2D,st.__webglTexture),ft(i.TEXTURE_2D,$t),$(B.__webglFramebuffer,E,$t,i.COLOR_ATTACHMENT0+lt,i.TEXTURE_2D,0),p($t)&&f(i.TEXTURE_2D)}e.unbindTexture()}else{let lt=i.TEXTURE_2D;if((E.isWebGL3DRenderTarget||E.isWebGLArrayRenderTarget)&&(lt=E.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),e.bindTexture(lt,K.__webglTexture),ft(lt,y),y.mipmaps&&y.mipmaps.length>0)for(let mt=0;mt<y.mipmaps.length;mt++)$(B.__webglFramebuffer[mt],E,y,i.COLOR_ATTACHMENT0,lt,mt);else $(B.__webglFramebuffer,E,y,i.COLOR_ATTACHMENT0,lt,0);p(y)&&f(lt),e.unbindTexture()}E.depthBuffer&&xt(E)}function Ot(E){const y=E.textures;for(let B=0,K=y.length;B<K;B++){const et=y[B];if(p(et)){const j=E.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:i.TEXTURE_2D,yt=n.get(et).__webglTexture;e.bindTexture(j,yt),f(j),e.unbindTexture()}}}const At=[],P=[];function fe(E){if(E.samples>0){if(Wt(E)===!1){const y=E.textures,B=E.width,K=E.height;let et=i.COLOR_BUFFER_BIT;const j=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,yt=n.get(E),lt=y.length>1;if(lt)for(let mt=0;mt<y.length;mt++)e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.RENDERBUFFER,null),e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.TEXTURE_2D,null,0);e.bindFramebuffer(i.READ_FRAMEBUFFER,yt.__webglMultisampledFramebuffer),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,yt.__webglFramebuffer);for(let mt=0;mt<y.length;mt++){if(E.resolveDepthBuffer&&(E.depthBuffer&&(et|=i.DEPTH_BUFFER_BIT),E.stencilBuffer&&E.resolveStencilBuffer&&(et|=i.STENCIL_BUFFER_BIT)),lt){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,yt.__webglColorRenderbuffer[mt]);const $t=n.get(y[mt]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,$t,0)}i.blitFramebuffer(0,0,B,K,0,0,B,K,et,i.NEAREST),l===!0&&(At.length=0,P.length=0,At.push(i.COLOR_ATTACHMENT0+mt),E.depthBuffer&&E.resolveDepthBuffer===!1&&(At.push(j),P.push(j),i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,P)),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,At))}if(e.bindFramebuffer(i.READ_FRAMEBUFFER,null),e.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),lt)for(let mt=0;mt<y.length;mt++){e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.RENDERBUFFER,yt.__webglColorRenderbuffer[mt]);const $t=n.get(y[mt]).__webglTexture;e.bindFramebuffer(i.FRAMEBUFFER,yt.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+mt,i.TEXTURE_2D,$t,0)}e.bindFramebuffer(i.DRAW_FRAMEBUFFER,yt.__webglMultisampledFramebuffer)}else if(E.depthBuffer&&E.resolveDepthBuffer===!1&&l){const y=E.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[y])}}}function Ht(E){return Math.min(s.maxSamples,E.samples)}function Wt(E){const y=n.get(E);return E.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Ct(E){const y=r.render.frame;h.get(E)!==y&&(h.set(E,y),E.update())}function ie(E,y){const B=E.colorSpace,K=E.format,et=E.type;return E.isCompressedTexture===!0||E.isVideoTexture===!0||B!==Hn&&B!==Un&&(Kt.getTransfer(B)===ae?(K!==on||et!==bn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",B)),y}function It(E){return typeof HTMLImageElement<"u"&&E instanceof HTMLImageElement?(c.width=E.naturalWidth||E.width,c.height=E.naturalHeight||E.height):typeof VideoFrame<"u"&&E instanceof VideoFrame?(c.width=E.displayWidth,c.height=E.displayHeight):(c.width=E.width,c.height=E.height),c}this.allocateTextureUnit=U,this.resetTextureUnits=M,this.setTexture2D=z,this.setTexture2DArray=X,this.setTexture3D=O,this.setTextureCube=Y,this.rebindTextures=pt,this.setupRenderTarget=Dt,this.updateRenderTargetMipmap=Ot,this.updateMultisampleRenderTarget=fe,this.setupDepthRenderbuffer=xt,this.setupFrameBufferTexture=$,this.useMultisampledRTT=Wt}function Jm(i,t){function e(n,s=Un){let a;const r=Kt.getTransfer(s);if(n===bn)return i.UNSIGNED_BYTE;if(n===gr)return i.UNSIGNED_SHORT_4_4_4_4;if(n===vr)return i.UNSIGNED_SHORT_5_5_5_1;if(n===fc)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===dc)return i.BYTE;if(n===uc)return i.SHORT;if(n===ps)return i.UNSIGNED_SHORT;if(n===mr)return i.INT;if(n===ri)return i.UNSIGNED_INT;if(n===cn)return i.FLOAT;if(n===_s)return i.HALF_FLOAT;if(n===pc)return i.ALPHA;if(n===mc)return i.RGB;if(n===on)return i.RGBA;if(n===gc)return i.LUMINANCE;if(n===vc)return i.LUMINANCE_ALPHA;if(n===Bi)return i.DEPTH_COMPONENT;if(n===qi)return i.DEPTH_STENCIL;if(n===_r)return i.RED;if(n===Mr)return i.RED_INTEGER;if(n===_c)return i.RG;if(n===xr)return i.RG_INTEGER;if(n===yr)return i.RGBA_INTEGER;if(n===sa||n===aa||n===oa||n===ra)if(r===ae)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(n===sa)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===aa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===oa)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ra)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(n===sa)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===aa)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===oa)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ra)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Uo||n===No||n===Fo||n===ko)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(n===Uo)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===No)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Fo)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===ko)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Oo||n===Bo||n===zo)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(n===Oo||n===Bo)return r===ae?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(n===zo)return r===ae?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Ho||n===Go||n===Vo||n===Wo||n===$o||n===qo||n===Xo||n===Yo||n===jo||n===Ko||n===Zo||n===Qo||n===Jo||n===tr)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(n===Ho)return r===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Go)return r===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Vo)return r===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Wo)return r===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===$o)return r===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===qo)return r===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Xo)return r===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Yo)return r===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===jo)return r===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ko)return r===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Zo)return r===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Qo)return r===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Jo)return r===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===tr)return r===ae?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===la||n===er||n===nr)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(n===la)return r===ae?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===er)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===nr)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Mc||n===ir||n===sr||n===ar)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(n===la)return a.COMPRESSED_RED_RGTC1_EXT;if(n===ir)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===sr)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ar)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===$i?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:e}}class t0 extends Re{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ue extends ve{constructor(){super(),this.isGroup=!0,this.type="Group"}}const e0={type:"move"};class co{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ue,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ue,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new T,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new T),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ue,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new T,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new T),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let s=null,a=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(const _ of t.hand.values()){const p=e.getJointPose(_,n),f=this._getHandJoint(c,_);p!==null&&(f.matrix.fromArray(p.transform.matrix),f.matrix.decompose(f.position,f.rotation,f.scale),f.matrixWorldNeedsUpdate=!0,f.jointRadius=p.radius),f.visible=p!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),m=.02,g=.005;c.inputState.pinching&&u>m+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=m-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(a=e.getPose(t.gripSpace,n),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(s=e.getPose(t.targetRaySpace,n),s===null&&a!==null&&(s=a),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(e0)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ue;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const n0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,i0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class s0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const s=new Pe,a=t.properties.get(s);a.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=s}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new wn({vertexShader:n0,fragmentShader:i0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new tt(new zn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class a0 extends ji{constructor(t,e){super();const n=this;let s=null,a=1,r=null,o="local-floor",l=1,c=null,h=null,d=null,u=null,m=null,g=null;const _=new s0,p=e.getContextAttributes();let f=null,b=null;const x=[],S=[],R=new Lt;let C=null;const A=new Re;A.layers.enable(1),A.viewport=new Jt;const L=new Re;L.layers.enable(2),L.viewport=new Jt;const I=[A,L],v=new t0;v.layers.enable(1),v.layers.enable(2);let M=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let $=x[q];return $===void 0&&($=new co,x[q]=$),$.getTargetRaySpace()},this.getControllerGrip=function(q){let $=x[q];return $===void 0&&($=new co,x[q]=$),$.getGripSpace()},this.getHand=function(q){let $=x[q];return $===void 0&&($=new co,x[q]=$),$.getHandSpace()};function k(q){const $=S.indexOf(q.inputSource);if($===-1)return;const it=x[$];it!==void 0&&(it.update(q.inputSource,q.frame,c||r),it.dispatchEvent({type:q.type,data:q.inputSource}))}function z(){s.removeEventListener("select",k),s.removeEventListener("selectstart",k),s.removeEventListener("selectend",k),s.removeEventListener("squeeze",k),s.removeEventListener("squeezestart",k),s.removeEventListener("squeezeend",k),s.removeEventListener("end",z),s.removeEventListener("inputsourceschange",X);for(let q=0;q<x.length;q++){const $=S[q];$!==null&&(S[q]=null,x[q].disconnect($))}M=null,U=null,_.reset(),t.setRenderTarget(f),m=null,u=null,d=null,s=null,b=null,kt.stop(),n.isPresenting=!1,t.setPixelRatio(C),t.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){a=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(q){c=q},this.getBaseLayer=function(){return u!==null?u:m},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return s},this.setSession=async function(q){if(s=q,s!==null){if(f=t.getRenderTarget(),s.addEventListener("select",k),s.addEventListener("selectstart",k),s.addEventListener("selectend",k),s.addEventListener("squeeze",k),s.addEventListener("squeezestart",k),s.addEventListener("squeezeend",k),s.addEventListener("end",z),s.addEventListener("inputsourceschange",X),p.xrCompatible!==!0&&await e.makeXRCompatible(),C=t.getPixelRatio(),t.getSize(R),s.renderState.layers===void 0){const $={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:a};m=new XRWebGLLayer(s,e,$),s.updateRenderState({baseLayer:m}),t.setPixelRatio(1),t.setSize(m.framebufferWidth,m.framebufferHeight,!1),b=new li(m.framebufferWidth,m.framebufferHeight,{format:on,type:bn,colorSpace:t.outputColorSpace,stencilBuffer:p.stencil})}else{let $=null,it=null,nt=null;p.depth&&(nt=p.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,$=p.stencil?qi:Bi,it=p.stencil?$i:ri);const xt={colorFormat:e.RGBA8,depthFormat:nt,scaleFactor:a};d=new XRWebGLBinding(s,e),u=d.createProjectionLayer(xt),s.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),b=new li(u.textureWidth,u.textureHeight,{format:on,type:bn,depthTexture:new Uc(u.textureWidth,u.textureHeight,it,void 0,void 0,void 0,void 0,void 0,void 0,$),stencilBuffer:p.stencil,colorSpace:t.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await s.requestReferenceSpace(o),kt.setContext(s),kt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return _.getDepthTexture()};function X(q){for(let $=0;$<q.removed.length;$++){const it=q.removed[$],nt=S.indexOf(it);nt>=0&&(S[nt]=null,x[nt].disconnect(it))}for(let $=0;$<q.added.length;$++){const it=q.added[$];let nt=S.indexOf(it);if(nt===-1){for(let pt=0;pt<x.length;pt++)if(pt>=S.length){S.push(it),nt=pt;break}else if(S[pt]===null){S[pt]=it,nt=pt;break}if(nt===-1)break}const xt=x[nt];xt&&xt.connect(it)}}const O=new T,Y=new T;function V(q,$,it){O.setFromMatrixPosition($.matrixWorld),Y.setFromMatrixPosition(it.matrixWorld);const nt=O.distanceTo(Y),xt=$.projectionMatrix.elements,pt=it.projectionMatrix.elements,Dt=xt[14]/(xt[10]-1),Ot=xt[14]/(xt[10]+1),At=(xt[9]+1)/xt[5],P=(xt[9]-1)/xt[5],fe=(xt[8]-1)/xt[0],Ht=(pt[8]+1)/pt[0],Wt=Dt*fe,Ct=Dt*Ht,ie=nt/(-fe+Ht),It=ie*-fe;if($.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(It),q.translateZ(ie),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert(),xt[10]===-1)q.projectionMatrix.copy($.projectionMatrix),q.projectionMatrixInverse.copy($.projectionMatrixInverse);else{const E=Dt+ie,y=Ot+ie,B=Wt-It,K=Ct+(nt-It),et=At*Ot/y*E,j=P*Ot/y*E;q.projectionMatrix.makePerspective(B,K,et,j,E,y),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}}function J(q,$){$===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices($.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(s===null)return;let $=q.near,it=q.far;_.texture!==null&&(_.depthNear>0&&($=_.depthNear),_.depthFar>0&&(it=_.depthFar)),v.near=L.near=A.near=$,v.far=L.far=A.far=it,(M!==v.near||U!==v.far)&&(s.updateRenderState({depthNear:v.near,depthFar:v.far}),M=v.near,U=v.far);const nt=q.parent,xt=v.cameras;J(v,nt);for(let pt=0;pt<xt.length;pt++)J(xt[pt],nt);xt.length===2?V(v,A,L):v.projectionMatrix.copy(A.projectionMatrix),ot(q,v,nt)};function ot(q,$,it){it===null?q.matrix.copy($.matrixWorld):(q.matrix.copy(it.matrixWorld),q.matrix.invert(),q.matrix.multiply($.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy($.projectionMatrix),q.projectionMatrixInverse.copy($.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=rr*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return v},this.getFoveation=function(){if(!(u===null&&m===null))return l},this.setFoveation=function(q){l=q,u!==null&&(u.fixedFoveation=q),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=q)},this.hasDepthSensing=function(){return _.texture!==null},this.getDepthSensingMesh=function(){return _.getMesh(v)};let ft=null;function zt(q,$){if(h=$.getViewerPose(c||r),g=$,h!==null){const it=h.views;m!==null&&(t.setRenderTargetFramebuffer(b,m.framebuffer),t.setRenderTarget(b));let nt=!1;it.length!==v.cameras.length&&(v.cameras.length=0,nt=!0);for(let pt=0;pt<it.length;pt++){const Dt=it[pt];let Ot=null;if(m!==null)Ot=m.getViewport(Dt);else{const P=d.getViewSubImage(u,Dt);Ot=P.viewport,pt===0&&(t.setRenderTargetTextures(b,P.colorTexture,u.ignoreDepthValues?void 0:P.depthStencilTexture),t.setRenderTarget(b))}let At=I[pt];At===void 0&&(At=new Re,At.layers.enable(pt),At.viewport=new Jt,I[pt]=At),At.matrix.fromArray(Dt.transform.matrix),At.matrix.decompose(At.position,At.quaternion,At.scale),At.projectionMatrix.fromArray(Dt.projectionMatrix),At.projectionMatrixInverse.copy(At.projectionMatrix).invert(),At.viewport.set(Ot.x,Ot.y,Ot.width,Ot.height),pt===0&&(v.matrix.copy(At.matrix),v.matrix.decompose(v.position,v.quaternion,v.scale)),nt===!0&&v.cameras.push(At)}const xt=s.enabledFeatures;if(xt&&xt.includes("depth-sensing")){const pt=d.getDepthInformation(it[0]);pt&&pt.isValid&&pt.texture&&_.init(t,pt,s.renderState)}}for(let it=0;it<x.length;it++){const nt=S[it],xt=x[it];nt!==null&&xt!==void 0&&xt.update(nt,$,c||r)}ft&&ft(q,$),$.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:$}),g=null}const kt=new Ic;kt.setAnimationLoop(zt),this.setAnimationLoop=function(q){ft=q},this.dispose=function(){}}}const jn=new ge,o0=new qt;function r0(i,t){function e(p,f){p.matrixAutoUpdate===!0&&p.updateMatrix(),f.value.copy(p.matrix)}function n(p,f){f.color.getRGB(p.fogColor.value,Rc(i)),f.isFog?(p.fogNear.value=f.near,p.fogFar.value=f.far):f.isFogExp2&&(p.fogDensity.value=f.density)}function s(p,f,b,x,S){f.isMeshBasicMaterial||f.isMeshLambertMaterial?a(p,f):f.isMeshToonMaterial?(a(p,f),d(p,f)):f.isMeshPhongMaterial?(a(p,f),h(p,f)):f.isMeshStandardMaterial?(a(p,f),u(p,f),f.isMeshPhysicalMaterial&&m(p,f,S)):f.isMeshMatcapMaterial?(a(p,f),g(p,f)):f.isMeshDepthMaterial?a(p,f):f.isMeshDistanceMaterial?(a(p,f),_(p,f)):f.isMeshNormalMaterial?a(p,f):f.isLineBasicMaterial?(r(p,f),f.isLineDashedMaterial&&o(p,f)):f.isPointsMaterial?l(p,f,b,x):f.isSpriteMaterial?c(p,f):f.isShadowMaterial?(p.color.value.copy(f.color),p.opacity.value=f.opacity):f.isShaderMaterial&&(f.uniformsNeedUpdate=!1)}function a(p,f){p.opacity.value=f.opacity,f.color&&p.diffuse.value.copy(f.color),f.emissive&&p.emissive.value.copy(f.emissive).multiplyScalar(f.emissiveIntensity),f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.bumpMap&&(p.bumpMap.value=f.bumpMap,e(f.bumpMap,p.bumpMapTransform),p.bumpScale.value=f.bumpScale,f.side===Ne&&(p.bumpScale.value*=-1)),f.normalMap&&(p.normalMap.value=f.normalMap,e(f.normalMap,p.normalMapTransform),p.normalScale.value.copy(f.normalScale),f.side===Ne&&p.normalScale.value.negate()),f.displacementMap&&(p.displacementMap.value=f.displacementMap,e(f.displacementMap,p.displacementMapTransform),p.displacementScale.value=f.displacementScale,p.displacementBias.value=f.displacementBias),f.emissiveMap&&(p.emissiveMap.value=f.emissiveMap,e(f.emissiveMap,p.emissiveMapTransform)),f.specularMap&&(p.specularMap.value=f.specularMap,e(f.specularMap,p.specularMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest);const b=t.get(f),x=b.envMap,S=b.envMapRotation;x&&(p.envMap.value=x,jn.copy(S),jn.x*=-1,jn.y*=-1,jn.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(jn.y*=-1,jn.z*=-1),p.envMapRotation.value.setFromMatrix4(o0.makeRotationFromEuler(jn)),p.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,p.reflectivity.value=f.reflectivity,p.ior.value=f.ior,p.refractionRatio.value=f.refractionRatio),f.lightMap&&(p.lightMap.value=f.lightMap,p.lightMapIntensity.value=f.lightMapIntensity,e(f.lightMap,p.lightMapTransform)),f.aoMap&&(p.aoMap.value=f.aoMap,p.aoMapIntensity.value=f.aoMapIntensity,e(f.aoMap,p.aoMapTransform))}function r(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform))}function o(p,f){p.dashSize.value=f.dashSize,p.totalSize.value=f.dashSize+f.gapSize,p.scale.value=f.scale}function l(p,f,b,x){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.size.value=f.size*b,p.scale.value=x*.5,f.map&&(p.map.value=f.map,e(f.map,p.uvTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function c(p,f){p.diffuse.value.copy(f.color),p.opacity.value=f.opacity,p.rotation.value=f.rotation,f.map&&(p.map.value=f.map,e(f.map,p.mapTransform)),f.alphaMap&&(p.alphaMap.value=f.alphaMap,e(f.alphaMap,p.alphaMapTransform)),f.alphaTest>0&&(p.alphaTest.value=f.alphaTest)}function h(p,f){p.specular.value.copy(f.specular),p.shininess.value=Math.max(f.shininess,1e-4)}function d(p,f){f.gradientMap&&(p.gradientMap.value=f.gradientMap)}function u(p,f){p.metalness.value=f.metalness,f.metalnessMap&&(p.metalnessMap.value=f.metalnessMap,e(f.metalnessMap,p.metalnessMapTransform)),p.roughness.value=f.roughness,f.roughnessMap&&(p.roughnessMap.value=f.roughnessMap,e(f.roughnessMap,p.roughnessMapTransform)),f.envMap&&(p.envMapIntensity.value=f.envMapIntensity)}function m(p,f,b){p.ior.value=f.ior,f.sheen>0&&(p.sheenColor.value.copy(f.sheenColor).multiplyScalar(f.sheen),p.sheenRoughness.value=f.sheenRoughness,f.sheenColorMap&&(p.sheenColorMap.value=f.sheenColorMap,e(f.sheenColorMap,p.sheenColorMapTransform)),f.sheenRoughnessMap&&(p.sheenRoughnessMap.value=f.sheenRoughnessMap,e(f.sheenRoughnessMap,p.sheenRoughnessMapTransform))),f.clearcoat>0&&(p.clearcoat.value=f.clearcoat,p.clearcoatRoughness.value=f.clearcoatRoughness,f.clearcoatMap&&(p.clearcoatMap.value=f.clearcoatMap,e(f.clearcoatMap,p.clearcoatMapTransform)),f.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=f.clearcoatRoughnessMap,e(f.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),f.clearcoatNormalMap&&(p.clearcoatNormalMap.value=f.clearcoatNormalMap,e(f.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(f.clearcoatNormalScale),f.side===Ne&&p.clearcoatNormalScale.value.negate())),f.dispersion>0&&(p.dispersion.value=f.dispersion),f.iridescence>0&&(p.iridescence.value=f.iridescence,p.iridescenceIOR.value=f.iridescenceIOR,p.iridescenceThicknessMinimum.value=f.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=f.iridescenceThicknessRange[1],f.iridescenceMap&&(p.iridescenceMap.value=f.iridescenceMap,e(f.iridescenceMap,p.iridescenceMapTransform)),f.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=f.iridescenceThicknessMap,e(f.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),f.transmission>0&&(p.transmission.value=f.transmission,p.transmissionSamplerMap.value=b.texture,p.transmissionSamplerSize.value.set(b.width,b.height),f.transmissionMap&&(p.transmissionMap.value=f.transmissionMap,e(f.transmissionMap,p.transmissionMapTransform)),p.thickness.value=f.thickness,f.thicknessMap&&(p.thicknessMap.value=f.thicknessMap,e(f.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=f.attenuationDistance,p.attenuationColor.value.copy(f.attenuationColor)),f.anisotropy>0&&(p.anisotropyVector.value.set(f.anisotropy*Math.cos(f.anisotropyRotation),f.anisotropy*Math.sin(f.anisotropyRotation)),f.anisotropyMap&&(p.anisotropyMap.value=f.anisotropyMap,e(f.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=f.specularIntensity,p.specularColor.value.copy(f.specularColor),f.specularColorMap&&(p.specularColorMap.value=f.specularColorMap,e(f.specularColorMap,p.specularColorMapTransform)),f.specularIntensityMap&&(p.specularIntensityMap.value=f.specularIntensityMap,e(f.specularIntensityMap,p.specularIntensityMapTransform))}function g(p,f){f.matcap&&(p.matcap.value=f.matcap)}function _(p,f){const b=t.get(f).light;p.referencePosition.value.setFromMatrixPosition(b.matrixWorld),p.nearDistance.value=b.shadow.camera.near,p.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function l0(i,t,e,n){let s={},a={},r=[];const o=i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS);function l(b,x){const S=x.program;n.uniformBlockBinding(b,S)}function c(b,x){let S=s[b.id];S===void 0&&(g(b),S=h(b),s[b.id]=S,b.addEventListener("dispose",p));const R=x.program;n.updateUBOMapping(b,R);const C=t.render.frame;a[b.id]!==C&&(u(b),a[b.id]=C)}function h(b){const x=d();b.__bindingPointIndex=x;const S=i.createBuffer(),R=b.__size,C=b.usage;return i.bindBuffer(i.UNIFORM_BUFFER,S),i.bufferData(i.UNIFORM_BUFFER,R,C),i.bindBuffer(i.UNIFORM_BUFFER,null),i.bindBufferBase(i.UNIFORM_BUFFER,x,S),S}function d(){for(let b=0;b<o;b++)if(r.indexOf(b)===-1)return r.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(b){const x=s[b.id],S=b.uniforms,R=b.__cache;i.bindBuffer(i.UNIFORM_BUFFER,x);for(let C=0,A=S.length;C<A;C++){const L=Array.isArray(S[C])?S[C]:[S[C]];for(let I=0,v=L.length;I<v;I++){const M=L[I];if(m(M,C,I,R)===!0){const U=M.__offset,k=Array.isArray(M.value)?M.value:[M.value];let z=0;for(let X=0;X<k.length;X++){const O=k[X],Y=_(O);typeof O=="number"||typeof O=="boolean"?(M.__data[0]=O,i.bufferSubData(i.UNIFORM_BUFFER,U+z,M.__data)):O.isMatrix3?(M.__data[0]=O.elements[0],M.__data[1]=O.elements[1],M.__data[2]=O.elements[2],M.__data[3]=0,M.__data[4]=O.elements[3],M.__data[5]=O.elements[4],M.__data[6]=O.elements[5],M.__data[7]=0,M.__data[8]=O.elements[6],M.__data[9]=O.elements[7],M.__data[10]=O.elements[8],M.__data[11]=0):(O.toArray(M.__data,z),z+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}i.bufferSubData(i.UNIFORM_BUFFER,U,M.__data)}}}i.bindBuffer(i.UNIFORM_BUFFER,null)}function m(b,x,S,R){const C=b.value,A=x+"_"+S;if(R[A]===void 0)return typeof C=="number"||typeof C=="boolean"?R[A]=C:R[A]=C.clone(),!0;{const L=R[A];if(typeof C=="number"||typeof C=="boolean"){if(L!==C)return R[A]=C,!0}else if(L.equals(C)===!1)return L.copy(C),!0}return!1}function g(b){const x=b.uniforms;let S=0;const R=16;for(let A=0,L=x.length;A<L;A++){const I=Array.isArray(x[A])?x[A]:[x[A]];for(let v=0,M=I.length;v<M;v++){const U=I[v],k=Array.isArray(U.value)?U.value:[U.value];for(let z=0,X=k.length;z<X;z++){const O=k[z],Y=_(O),V=S%R,J=V%Y.boundary,ot=V+J;S+=J,ot!==0&&R-ot<Y.storage&&(S+=R-ot),U.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=S,S+=Y.storage}}}const C=S%R;return C>0&&(S+=R-C),b.__size=S,b.__cache={},this}function _(b){const x={boundary:0,storage:0};return typeof b=="number"||typeof b=="boolean"?(x.boundary=4,x.storage=4):b.isVector2?(x.boundary=8,x.storage=8):b.isVector3||b.isColor?(x.boundary=16,x.storage=12):b.isVector4?(x.boundary=16,x.storage=16):b.isMatrix3?(x.boundary=48,x.storage=48):b.isMatrix4?(x.boundary=64,x.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),x}function p(b){const x=b.target;x.removeEventListener("dispose",p);const S=r.indexOf(x.__bindingPointIndex);r.splice(S,1),i.deleteBuffer(s[x.id]),delete s[x.id],delete a[x.id]}function f(){for(const b in s)i.deleteBuffer(s[b]);r=[],s={},a={}}return{bind:l,update:c,dispose:f}}class c0{constructor(t={}){const{canvas:e=jh(),context:n=null,depth:s=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=t;this.isWebGLRenderer=!0;let u;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");u=n.getContextAttributes().alpha}else u=r;const m=new Uint32Array(4),g=new Int32Array(4);let _=null,p=null;const f=[],b=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=We,this.toneMapping=Fn,this.toneMappingExposure=1;const x=this;let S=!1,R=0,C=0,A=null,L=-1,I=null;const v=new Jt,M=new Jt;let U=null;const k=new St(0);let z=0,X=e.width,O=e.height,Y=1,V=null,J=null;const ot=new Jt(0,0,X,O),ft=new Jt(0,0,X,O);let zt=!1;const kt=new Sr;let q=!1,$=!1;const it=new qt,nt=new qt,xt=new T,pt=new Jt,Dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Ot=!1;function At(){return A===null?Y:1}let P=n;function fe(w,N){return e.getContext(w,N)}try{const w={alpha:!0,depth:s,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${fr}`),e.addEventListener("webglcontextlost",Z,!1),e.addEventListener("webglcontextrestored",ct,!1),e.addEventListener("webglcontextcreationerror",ut,!1),P===null){const N="webgl2";if(P=fe(N,w),P===null)throw fe(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Ht,Wt,Ct,ie,It,E,y,B,K,et,j,yt,lt,mt,$t,st,gt,Rt,Pt,vt,Gt,Ut,te,D;function dt(){Ht=new pp(P),Ht.init(),Ut=new Jm(P,Ht),Wt=new lp(P,Ht,t,Ut),Ct=new Km(P),Wt.reverseDepthBuffer&&Ct.buffers.depth.setReversed(!0),ie=new vp(P),It=new Nm,E=new Qm(P,Ht,Ct,It,Wt,Ut,ie),y=new hp(x),B=new fp(x),K=new wd(P),te=new op(P,K),et=new mp(P,K,ie,te),j=new Mp(P,et,K,ie),Pt=new _p(P,Wt,E),st=new cp(It),yt=new Um(x,y,B,Ht,Wt,te,st),lt=new r0(x,It),mt=new km,$t=new Vm(Ht),Rt=new ap(x,y,B,Ct,j,u,l),gt=new Ym(x,j,Wt),D=new l0(P,ie,Wt,Ct),vt=new rp(P,Ht,ie),Gt=new gp(P,Ht,ie),ie.programs=yt.programs,x.capabilities=Wt,x.extensions=Ht,x.properties=It,x.renderLists=mt,x.shadowMap=gt,x.state=Ct,x.info=ie}dt();const W=new a0(x,P);this.xr=W,this.getContext=function(){return P},this.getContextAttributes=function(){return P.getContextAttributes()},this.forceContextLoss=function(){const w=Ht.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){const w=Ht.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(w){w!==void 0&&(Y=w,this.setSize(X,O,!1))},this.getSize=function(w){return w.set(X,O)},this.setSize=function(w,N,H=!0){if(W.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}X=w,O=N,e.width=Math.floor(w*Y),e.height=Math.floor(N*Y),H===!0&&(e.style.width=w+"px",e.style.height=N+"px"),this.setViewport(0,0,w,N)},this.getDrawingBufferSize=function(w){return w.set(X*Y,O*Y).floor()},this.setDrawingBufferSize=function(w,N,H){X=w,O=N,Y=H,e.width=Math.floor(w*H),e.height=Math.floor(N*H),this.setViewport(0,0,w,N)},this.getCurrentViewport=function(w){return w.copy(v)},this.getViewport=function(w){return w.copy(ot)},this.setViewport=function(w,N,H,G){w.isVector4?ot.set(w.x,w.y,w.z,w.w):ot.set(w,N,H,G),Ct.viewport(v.copy(ot).multiplyScalar(Y).round())},this.getScissor=function(w){return w.copy(ft)},this.setScissor=function(w,N,H,G){w.isVector4?ft.set(w.x,w.y,w.z,w.w):ft.set(w,N,H,G),Ct.scissor(M.copy(ft).multiplyScalar(Y).round())},this.getScissorTest=function(){return zt},this.setScissorTest=function(w){Ct.setScissorTest(zt=w)},this.setOpaqueSort=function(w){V=w},this.setTransparentSort=function(w){J=w},this.getClearColor=function(w){return w.copy(Rt.getClearColor())},this.setClearColor=function(){Rt.setClearColor.apply(Rt,arguments)},this.getClearAlpha=function(){return Rt.getClearAlpha()},this.setClearAlpha=function(){Rt.setClearAlpha.apply(Rt,arguments)},this.clear=function(w=!0,N=!0,H=!0){let G=0;if(w){let F=!1;if(A!==null){const at=A.texture.format;F=at===yr||at===xr||at===Mr}if(F){const at=A.texture.type,ht=at===bn||at===ri||at===ps||at===$i||at===gr||at===vr,_t=Rt.getClearColor(),Mt=Rt.getClearAlpha(),Tt=_t.r,Et=_t.g,bt=_t.b;ht?(m[0]=Tt,m[1]=Et,m[2]=bt,m[3]=Mt,P.clearBufferuiv(P.COLOR,0,m)):(g[0]=Tt,g[1]=Et,g[2]=bt,g[3]=Mt,P.clearBufferiv(P.COLOR,0,g))}else G|=P.COLOR_BUFFER_BIT}N&&(G|=P.DEPTH_BUFFER_BIT,P.clearDepth(this.capabilities.reverseDepthBuffer?0:1)),H&&(G|=P.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),P.clear(G)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",Z,!1),e.removeEventListener("webglcontextrestored",ct,!1),e.removeEventListener("webglcontextcreationerror",ut,!1),mt.dispose(),$t.dispose(),It.dispose(),y.dispose(),B.dispose(),j.dispose(),te.dispose(),D.dispose(),yt.dispose(),W.dispose(),W.removeEventListener("sessionstart",kr),W.removeEventListener("sessionend",Or),Vn.stop()};function Z(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function ct(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const w=ie.autoReset,N=gt.enabled,H=gt.autoUpdate,G=gt.needsUpdate,F=gt.type;dt(),ie.autoReset=w,gt.enabled=N,gt.autoUpdate=H,gt.needsUpdate=G,gt.type=F}function ut(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function Vt(w){const N=w.target;N.removeEventListener("dispose",Vt),pe(N)}function pe(w){ke(w),It.remove(w)}function ke(w){const N=It.get(w).programs;N!==void 0&&(N.forEach(function(H){yt.releaseProgram(H)}),w.isShaderMaterial&&yt.releaseShaderCache(w))}this.renderBufferDirect=function(w,N,H,G,F,at){N===null&&(N=Dt);const ht=F.isMesh&&F.matrixWorld.determinant()<0,_t=ah(w,N,H,G,F);Ct.setMaterial(G,ht);let Mt=H.index,Tt=1;if(G.wireframe===!0){if(Mt=et.getWireframeAttribute(H),Mt===void 0)return;Tt=2}const Et=H.drawRange,bt=H.attributes.position;let Zt=Et.start*Tt,se=(Et.start+Et.count)*Tt;at!==null&&(Zt=Math.max(Zt,at.start*Tt),se=Math.min(se,(at.start+at.count)*Tt)),Mt!==null?(Zt=Math.max(Zt,0),se=Math.min(se,Mt.count)):bt!=null&&(Zt=Math.max(Zt,0),se=Math.min(se,bt.count));const ce=se-Zt;if(ce<0||ce===1/0)return;te.setup(F,G,_t,H,Mt);let ze,Yt=vt;if(Mt!==null&&(ze=K.get(Mt),Yt=Gt,Yt.setIndex(ze)),F.isMesh)G.wireframe===!0?(Ct.setLineWidth(G.wireframeLinewidth*At()),Yt.setMode(P.LINES)):Yt.setMode(P.TRIANGLES);else if(F.isLine){let wt=G.linewidth;wt===void 0&&(wt=1),Ct.setLineWidth(wt*At()),F.isLineSegments?Yt.setMode(P.LINES):F.isLineLoop?Yt.setMode(P.LINE_LOOP):Yt.setMode(P.LINE_STRIP)}else F.isPoints?Yt.setMode(P.POINTS):F.isSprite&&Yt.setMode(P.TRIANGLES);if(F.isBatchedMesh)if(F._multiDrawInstances!==null)Yt.renderMultiDrawInstances(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount,F._multiDrawInstances);else if(Ht.get("WEBGL_multi_draw"))Yt.renderMultiDraw(F._multiDrawStarts,F._multiDrawCounts,F._multiDrawCount);else{const wt=F._multiDrawStarts,we=F._multiDrawCounts,jt=F._multiDrawCount,Ze=Mt?K.get(Mt).bytesPerElement:1,di=It.get(G).currentProgram.getUniforms();for(let He=0;He<jt;He++)di.setValue(P,"_gl_DrawID",He),Yt.render(wt[He]/Ze,we[He])}else if(F.isInstancedMesh)Yt.renderInstances(Zt,ce,F.count);else if(H.isInstancedBufferGeometry){const wt=H._maxInstanceCount!==void 0?H._maxInstanceCount:1/0,we=Math.min(H.instanceCount,wt);Yt.renderInstances(Zt,ce,we)}else Yt.render(Zt,ce)};function Xt(w,N,H){w.transparent===!0&&w.side===Se&&w.forceSinglePass===!1?(w.side=Ne,w.needsUpdate=!0,ys(w,N,H),w.side=Bn,w.needsUpdate=!0,ys(w,N,H),w.side=Se):ys(w,N,H)}this.compile=function(w,N,H=null){H===null&&(H=w),p=$t.get(H),p.init(N),b.push(p),H.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),w!==H&&w.traverseVisible(function(F){F.isLight&&F.layers.test(N.layers)&&(p.pushLight(F),F.castShadow&&p.pushShadow(F))}),p.setupLights();const G=new Set;return w.traverse(function(F){if(!(F.isMesh||F.isPoints||F.isLine||F.isSprite))return;const at=F.material;if(at)if(Array.isArray(at))for(let ht=0;ht<at.length;ht++){const _t=at[ht];Xt(_t,H,F),G.add(_t)}else Xt(at,H,F),G.add(at)}),b.pop(),p=null,G},this.compileAsync=function(w,N,H=null){const G=this.compile(w,N,H);return new Promise(F=>{function at(){if(G.forEach(function(ht){It.get(ht).currentProgram.isReady()&&G.delete(ht)}),G.size===0){F(w);return}setTimeout(at,10)}Ht.get("KHR_parallel_shader_compile")!==null?at():setTimeout(at,10)})};let Oe=null;function dn(w){Oe&&Oe(w)}function kr(){Vn.stop()}function Or(){Vn.start()}const Vn=new Ic;Vn.setAnimationLoop(dn),typeof self<"u"&&Vn.setContext(self),this.setAnimationLoop=function(w){Oe=w,W.setAnimationLoop(w),w===null?Vn.stop():Vn.start()},W.addEventListener("sessionstart",kr),W.addEventListener("sessionend",Or),this.render=function(w,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),W.enabled===!0&&W.isPresenting===!0&&(W.cameraAutoUpdate===!0&&W.updateCamera(N),N=W.getCamera()),w.isScene===!0&&w.onBeforeRender(x,w,N,A),p=$t.get(w,b.length),p.init(N),b.push(p),nt.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),kt.setFromProjectionMatrix(nt),$=this.localClippingEnabled,q=st.init(this.clippingPlanes,$),_=mt.get(w,f.length),_.init(),f.push(_),W.enabled===!0&&W.isPresenting===!0){const at=x.xr.getDepthSensingMesh();at!==null&&Ra(at,N,-1/0,x.sortObjects)}Ra(w,N,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(V,J),Ot=W.enabled===!1||W.isPresenting===!1||W.hasDepthSensing()===!1,Ot&&Rt.addToRenderList(_,w),this.info.render.frame++,q===!0&&st.beginShadows();const H=p.state.shadowsArray;gt.render(H,w,N),q===!0&&st.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=_.opaque,F=_.transmissive;if(p.setupLights(),N.isArrayCamera){const at=N.cameras;if(F.length>0)for(let ht=0,_t=at.length;ht<_t;ht++){const Mt=at[ht];zr(G,F,w,Mt)}Ot&&Rt.render(w);for(let ht=0,_t=at.length;ht<_t;ht++){const Mt=at[ht];Br(_,w,Mt,Mt.viewport)}}else F.length>0&&zr(G,F,w,N),Ot&&Rt.render(w),Br(_,w,N);A!==null&&(E.updateMultisampleRenderTarget(A),E.updateRenderTargetMipmap(A)),w.isScene===!0&&w.onAfterRender(x,w,N),te.resetDefaultState(),L=-1,I=null,b.pop(),b.length>0?(p=b[b.length-1],q===!0&&st.setGlobalState(x.clippingPlanes,p.state.camera)):p=null,f.pop(),f.length>0?_=f[f.length-1]:_=null};function Ra(w,N,H,G){if(w.visible===!1)return;if(w.layers.test(N.layers)){if(w.isGroup)H=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(N);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||kt.intersectsSprite(w)){G&&pt.setFromMatrixPosition(w.matrixWorld).applyMatrix4(nt);const ht=j.update(w),_t=w.material;_t.visible&&_.push(w,ht,_t,H,pt.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||kt.intersectsObject(w))){const ht=j.update(w),_t=w.material;if(G&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),pt.copy(w.boundingSphere.center)):(ht.boundingSphere===null&&ht.computeBoundingSphere(),pt.copy(ht.boundingSphere.center)),pt.applyMatrix4(w.matrixWorld).applyMatrix4(nt)),Array.isArray(_t)){const Mt=ht.groups;for(let Tt=0,Et=Mt.length;Tt<Et;Tt++){const bt=Mt[Tt],Zt=_t[bt.materialIndex];Zt&&Zt.visible&&_.push(w,ht,Zt,H,pt.z,bt)}}else _t.visible&&_.push(w,ht,_t,H,pt.z,null)}}const at=w.children;for(let ht=0,_t=at.length;ht<_t;ht++)Ra(at[ht],N,H,G)}function Br(w,N,H,G){const F=w.opaque,at=w.transmissive,ht=w.transparent;p.setupLightsView(H),q===!0&&st.setGlobalState(x.clippingPlanes,H),G&&Ct.viewport(v.copy(G)),F.length>0&&xs(F,N,H),at.length>0&&xs(at,N,H),ht.length>0&&xs(ht,N,H),Ct.buffers.depth.setTest(!0),Ct.buffers.depth.setMask(!0),Ct.buffers.color.setMask(!0),Ct.setPolygonOffset(!1)}function zr(w,N,H,G){if((H.isScene===!0?H.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[G.id]===void 0&&(p.state.transmissionRenderTarget[G.id]=new li(1,1,{generateMipmaps:!0,type:Ht.has("EXT_color_buffer_half_float")||Ht.has("EXT_color_buffer_float")?_s:bn,minFilter:ii,samples:4,stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Kt.workingColorSpace}));const at=p.state.transmissionRenderTarget[G.id],ht=G.viewport||v;at.setSize(ht.z,ht.w);const _t=x.getRenderTarget();x.setRenderTarget(at),x.getClearColor(k),z=x.getClearAlpha(),z<1&&x.setClearColor(16777215,.5),x.clear(),Ot&&Rt.render(H);const Mt=x.toneMapping;x.toneMapping=Fn;const Tt=G.viewport;if(G.viewport!==void 0&&(G.viewport=void 0),p.setupLightsView(G),q===!0&&st.setGlobalState(x.clippingPlanes,G),xs(w,H,G),E.updateMultisampleRenderTarget(at),E.updateRenderTargetMipmap(at),Ht.has("WEBGL_multisampled_render_to_texture")===!1){let Et=!1;for(let bt=0,Zt=N.length;bt<Zt;bt++){const se=N[bt],ce=se.object,ze=se.geometry,Yt=se.material,wt=se.group;if(Yt.side===Se&&ce.layers.test(G.layers)){const we=Yt.side;Yt.side=Ne,Yt.needsUpdate=!0,Hr(ce,H,G,ze,Yt,wt),Yt.side=we,Yt.needsUpdate=!0,Et=!0}}Et===!0&&(E.updateMultisampleRenderTarget(at),E.updateRenderTargetMipmap(at))}x.setRenderTarget(_t),x.setClearColor(k,z),Tt!==void 0&&(G.viewport=Tt),x.toneMapping=Mt}function xs(w,N,H){const G=N.isScene===!0?N.overrideMaterial:null;for(let F=0,at=w.length;F<at;F++){const ht=w[F],_t=ht.object,Mt=ht.geometry,Tt=G===null?ht.material:G,Et=ht.group;_t.layers.test(H.layers)&&Hr(_t,N,H,Mt,Tt,Et)}}function Hr(w,N,H,G,F,at){w.onBeforeRender(x,N,H,G,F,at),w.modelViewMatrix.multiplyMatrices(H.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),F.onBeforeRender(x,N,H,G,w,at),F.transparent===!0&&F.side===Se&&F.forceSinglePass===!1?(F.side=Ne,F.needsUpdate=!0,x.renderBufferDirect(H,N,G,F,w,at),F.side=Bn,F.needsUpdate=!0,x.renderBufferDirect(H,N,G,F,w,at),F.side=Se):x.renderBufferDirect(H,N,G,F,w,at),w.onAfterRender(x,N,H,G,F,at)}function ys(w,N,H){N.isScene!==!0&&(N=Dt);const G=It.get(w),F=p.state.lights,at=p.state.shadowsArray,ht=F.state.version,_t=yt.getParameters(w,F.state,at,N,H),Mt=yt.getProgramCacheKey(_t);let Tt=G.programs;G.environment=w.isMeshStandardMaterial?N.environment:null,G.fog=N.fog,G.envMap=(w.isMeshStandardMaterial?B:y).get(w.envMap||G.environment),G.envMapRotation=G.environment!==null&&w.envMap===null?N.environmentRotation:w.envMapRotation,Tt===void 0&&(w.addEventListener("dispose",Vt),Tt=new Map,G.programs=Tt);let Et=Tt.get(Mt);if(Et!==void 0){if(G.currentProgram===Et&&G.lightsStateVersion===ht)return Vr(w,_t),Et}else _t.uniforms=yt.getUniforms(w),w.onBeforeCompile(_t,x),Et=yt.acquireProgram(_t,Mt),Tt.set(Mt,Et),G.uniforms=_t.uniforms;const bt=G.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(bt.clippingPlanes=st.uniform),Vr(w,_t),G.needsLights=rh(w),G.lightsStateVersion=ht,G.needsLights&&(bt.ambientLightColor.value=F.state.ambient,bt.lightProbe.value=F.state.probe,bt.directionalLights.value=F.state.directional,bt.directionalLightShadows.value=F.state.directionalShadow,bt.spotLights.value=F.state.spot,bt.spotLightShadows.value=F.state.spotShadow,bt.rectAreaLights.value=F.state.rectArea,bt.ltc_1.value=F.state.rectAreaLTC1,bt.ltc_2.value=F.state.rectAreaLTC2,bt.pointLights.value=F.state.point,bt.pointLightShadows.value=F.state.pointShadow,bt.hemisphereLights.value=F.state.hemi,bt.directionalShadowMap.value=F.state.directionalShadowMap,bt.directionalShadowMatrix.value=F.state.directionalShadowMatrix,bt.spotShadowMap.value=F.state.spotShadowMap,bt.spotLightMatrix.value=F.state.spotLightMatrix,bt.spotLightMap.value=F.state.spotLightMap,bt.pointShadowMap.value=F.state.pointShadowMap,bt.pointShadowMatrix.value=F.state.pointShadowMatrix),G.currentProgram=Et,G.uniformsList=null,Et}function Gr(w){if(w.uniformsList===null){const N=w.currentProgram.getUniforms();w.uniformsList=ha.seqWithValue(N.seq,w.uniforms)}return w.uniformsList}function Vr(w,N){const H=It.get(w);H.outputColorSpace=N.outputColorSpace,H.batching=N.batching,H.batchingColor=N.batchingColor,H.instancing=N.instancing,H.instancingColor=N.instancingColor,H.instancingMorph=N.instancingMorph,H.skinning=N.skinning,H.morphTargets=N.morphTargets,H.morphNormals=N.morphNormals,H.morphColors=N.morphColors,H.morphTargetsCount=N.morphTargetsCount,H.numClippingPlanes=N.numClippingPlanes,H.numIntersection=N.numClipIntersection,H.vertexAlphas=N.vertexAlphas,H.vertexTangents=N.vertexTangents,H.toneMapping=N.toneMapping}function ah(w,N,H,G,F){N.isScene!==!0&&(N=Dt),E.resetTextureUnits();const at=N.fog,ht=G.isMeshStandardMaterial?N.environment:null,_t=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Hn,Mt=(G.isMeshStandardMaterial?B:y).get(G.envMap||ht),Tt=G.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,Et=!!H.attributes.tangent&&(!!G.normalMap||G.anisotropy>0),bt=!!H.morphAttributes.position,Zt=!!H.morphAttributes.normal,se=!!H.morphAttributes.color;let ce=Fn;G.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(ce=x.toneMapping);const ze=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,Yt=ze!==void 0?ze.length:0,wt=It.get(G),we=p.state.lights;if(q===!0&&($===!0||w!==I)){const qe=w===I&&G.id===L;st.setState(G,w,qe)}let jt=!1;G.version===wt.__version?(wt.needsLights&&wt.lightsStateVersion!==we.state.version||wt.outputColorSpace!==_t||F.isBatchedMesh&&wt.batching===!1||!F.isBatchedMesh&&wt.batching===!0||F.isBatchedMesh&&wt.batchingColor===!0&&F.colorTexture===null||F.isBatchedMesh&&wt.batchingColor===!1&&F.colorTexture!==null||F.isInstancedMesh&&wt.instancing===!1||!F.isInstancedMesh&&wt.instancing===!0||F.isSkinnedMesh&&wt.skinning===!1||!F.isSkinnedMesh&&wt.skinning===!0||F.isInstancedMesh&&wt.instancingColor===!0&&F.instanceColor===null||F.isInstancedMesh&&wt.instancingColor===!1&&F.instanceColor!==null||F.isInstancedMesh&&wt.instancingMorph===!0&&F.morphTexture===null||F.isInstancedMesh&&wt.instancingMorph===!1&&F.morphTexture!==null||wt.envMap!==Mt||G.fog===!0&&wt.fog!==at||wt.numClippingPlanes!==void 0&&(wt.numClippingPlanes!==st.numPlanes||wt.numIntersection!==st.numIntersection)||wt.vertexAlphas!==Tt||wt.vertexTangents!==Et||wt.morphTargets!==bt||wt.morphNormals!==Zt||wt.morphColors!==se||wt.toneMapping!==ce||wt.morphTargetsCount!==Yt)&&(jt=!0):(jt=!0,wt.__version=G.version);let Ze=wt.currentProgram;jt===!0&&(Ze=ys(G,N,F));let di=!1,He=!1,Pa=!1;const de=Ze.getUniforms(),Sn=wt.uniforms;if(Ct.useProgram(Ze.program)&&(di=!0,He=!0,Pa=!0),G.id!==L&&(L=G.id,He=!0),di||I!==w){Wt.reverseDepthBuffer?(it.copy(w.projectionMatrix),Zh(it),Qh(it),de.setValue(P,"projectionMatrix",it)):de.setValue(P,"projectionMatrix",w.projectionMatrix),de.setValue(P,"viewMatrix",w.matrixWorldInverse);const qe=de.map.cameraPosition;qe!==void 0&&qe.setValue(P,xt.setFromMatrixPosition(w.matrixWorld)),Wt.logarithmicDepthBuffer&&de.setValue(P,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(G.isMeshPhongMaterial||G.isMeshToonMaterial||G.isMeshLambertMaterial||G.isMeshBasicMaterial||G.isMeshStandardMaterial||G.isShaderMaterial)&&de.setValue(P,"isOrthographic",w.isOrthographicCamera===!0),I!==w&&(I=w,He=!0,Pa=!0)}if(F.isSkinnedMesh){de.setOptional(P,F,"bindMatrix"),de.setOptional(P,F,"bindMatrixInverse");const qe=F.skeleton;qe&&(qe.boneTexture===null&&qe.computeBoneTexture(),de.setValue(P,"boneTexture",qe.boneTexture,E))}F.isBatchedMesh&&(de.setOptional(P,F,"batchingTexture"),de.setValue(P,"batchingTexture",F._matricesTexture,E),de.setOptional(P,F,"batchingIdTexture"),de.setValue(P,"batchingIdTexture",F._indirectTexture,E),de.setOptional(P,F,"batchingColorTexture"),F._colorsTexture!==null&&de.setValue(P,"batchingColorTexture",F._colorsTexture,E));const La=H.morphAttributes;if((La.position!==void 0||La.normal!==void 0||La.color!==void 0)&&Pt.update(F,H,Ze),(He||wt.receiveShadow!==F.receiveShadow)&&(wt.receiveShadow=F.receiveShadow,de.setValue(P,"receiveShadow",F.receiveShadow)),G.isMeshGouraudMaterial&&G.envMap!==null&&(Sn.envMap.value=Mt,Sn.flipEnvMap.value=Mt.isCubeTexture&&Mt.isRenderTargetTexture===!1?-1:1),G.isMeshStandardMaterial&&G.envMap===null&&N.environment!==null&&(Sn.envMapIntensity.value=N.environmentIntensity),He&&(de.setValue(P,"toneMappingExposure",x.toneMappingExposure),wt.needsLights&&oh(Sn,Pa),at&&G.fog===!0&&lt.refreshFogUniforms(Sn,at),lt.refreshMaterialUniforms(Sn,G,Y,O,p.state.transmissionRenderTarget[w.id]),ha.upload(P,Gr(wt),Sn,E)),G.isShaderMaterial&&G.uniformsNeedUpdate===!0&&(ha.upload(P,Gr(wt),Sn,E),G.uniformsNeedUpdate=!1),G.isSpriteMaterial&&de.setValue(P,"center",F.center),de.setValue(P,"modelViewMatrix",F.modelViewMatrix),de.setValue(P,"normalMatrix",F.normalMatrix),de.setValue(P,"modelMatrix",F.matrixWorld),G.isShaderMaterial||G.isRawShaderMaterial){const qe=G.uniformsGroups;for(let Ia=0,lh=qe.length;Ia<lh;Ia++){const Wr=qe[Ia];D.update(Wr,Ze),D.bind(Wr,Ze)}}return Ze}function oh(w,N){w.ambientLightColor.needsUpdate=N,w.lightProbe.needsUpdate=N,w.directionalLights.needsUpdate=N,w.directionalLightShadows.needsUpdate=N,w.pointLights.needsUpdate=N,w.pointLightShadows.needsUpdate=N,w.spotLights.needsUpdate=N,w.spotLightShadows.needsUpdate=N,w.rectAreaLights.needsUpdate=N,w.hemisphereLights.needsUpdate=N}function rh(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return C},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(w,N,H){It.get(w.texture).__webglTexture=N,It.get(w.depthTexture).__webglTexture=H;const G=It.get(w);G.__hasExternalTextures=!0,G.__autoAllocateDepthBuffer=H===void 0,G.__autoAllocateDepthBuffer||Ht.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),G.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(w,N){const H=It.get(w);H.__webglFramebuffer=N,H.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(w,N=0,H=0){A=w,R=N,C=H;let G=!0,F=null,at=!1,ht=!1;if(w){const Mt=It.get(w);if(Mt.__useDefaultFramebuffer!==void 0)Ct.bindFramebuffer(P.FRAMEBUFFER,null),G=!1;else if(Mt.__webglFramebuffer===void 0)E.setupRenderTarget(w);else if(Mt.__hasExternalTextures)E.rebindTextures(w,It.get(w.texture).__webglTexture,It.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){const bt=w.depthTexture;if(Mt.__boundDepthTexture!==bt){if(bt!==null&&It.has(bt)&&(w.width!==bt.image.width||w.height!==bt.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");E.setupDepthRenderbuffer(w)}}const Tt=w.texture;(Tt.isData3DTexture||Tt.isDataArrayTexture||Tt.isCompressedArrayTexture)&&(ht=!0);const Et=It.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(Et[N])?F=Et[N][H]:F=Et[N],at=!0):w.samples>0&&E.useMultisampledRTT(w)===!1?F=It.get(w).__webglMultisampledFramebuffer:Array.isArray(Et)?F=Et[H]:F=Et,v.copy(w.viewport),M.copy(w.scissor),U=w.scissorTest}else v.copy(ot).multiplyScalar(Y).floor(),M.copy(ft).multiplyScalar(Y).floor(),U=zt;if(Ct.bindFramebuffer(P.FRAMEBUFFER,F)&&G&&Ct.drawBuffers(w,F),Ct.viewport(v),Ct.scissor(M),Ct.setScissorTest(U),at){const Mt=It.get(w.texture);P.framebufferTexture2D(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,P.TEXTURE_CUBE_MAP_POSITIVE_X+N,Mt.__webglTexture,H)}else if(ht){const Mt=It.get(w.texture),Tt=N||0;P.framebufferTextureLayer(P.FRAMEBUFFER,P.COLOR_ATTACHMENT0,Mt.__webglTexture,H||0,Tt)}L=-1},this.readRenderTargetPixels=function(w,N,H,G,F,at,ht){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let _t=It.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ht!==void 0&&(_t=_t[ht]),_t){Ct.bindFramebuffer(P.FRAMEBUFFER,_t);try{const Mt=w.texture,Tt=Mt.format,Et=Mt.type;if(!Wt.textureFormatReadable(Tt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!Wt.textureTypeReadable(Et)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=w.width-G&&H>=0&&H<=w.height-F&&P.readPixels(N,H,G,F,Ut.convert(Tt),Ut.convert(Et),at)}finally{const Mt=A!==null?It.get(A).__webglFramebuffer:null;Ct.bindFramebuffer(P.FRAMEBUFFER,Mt)}}},this.readRenderTargetPixelsAsync=async function(w,N,H,G,F,at,ht){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let _t=It.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&ht!==void 0&&(_t=_t[ht]),_t){const Mt=w.texture,Tt=Mt.format,Et=Mt.type;if(!Wt.textureFormatReadable(Tt))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!Wt.textureTypeReadable(Et))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(N>=0&&N<=w.width-G&&H>=0&&H<=w.height-F){Ct.bindFramebuffer(P.FRAMEBUFFER,_t);const bt=P.createBuffer();P.bindBuffer(P.PIXEL_PACK_BUFFER,bt),P.bufferData(P.PIXEL_PACK_BUFFER,at.byteLength,P.STREAM_READ),P.readPixels(N,H,G,F,Ut.convert(Tt),Ut.convert(Et),0);const Zt=A!==null?It.get(A).__webglFramebuffer:null;Ct.bindFramebuffer(P.FRAMEBUFFER,Zt);const se=P.fenceSync(P.SYNC_GPU_COMMANDS_COMPLETE,0);return P.flush(),await Kh(P,se,4),P.bindBuffer(P.PIXEL_PACK_BUFFER,bt),P.getBufferSubData(P.PIXEL_PACK_BUFFER,0,at),P.deleteBuffer(bt),P.deleteSync(se),at}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(w,N=null,H=0){w.isTexture!==!0&&(ca("WebGLRenderer: copyFramebufferToTexture function signature has changed."),N=arguments[0]||null,w=arguments[1]);const G=Math.pow(2,-H),F=Math.floor(w.image.width*G),at=Math.floor(w.image.height*G),ht=N!==null?N.x:0,_t=N!==null?N.y:0;E.setTexture2D(w,0),P.copyTexSubImage2D(P.TEXTURE_2D,H,0,0,ht,_t,F,at),Ct.unbindTexture()},this.copyTextureToTexture=function(w,N,H=null,G=null,F=0){w.isTexture!==!0&&(ca("WebGLRenderer: copyTextureToTexture function signature has changed."),G=arguments[0]||null,w=arguments[1],N=arguments[2],F=arguments[3]||0,H=null);let at,ht,_t,Mt,Tt,Et;H!==null?(at=H.max.x-H.min.x,ht=H.max.y-H.min.y,_t=H.min.x,Mt=H.min.y):(at=w.image.width,ht=w.image.height,_t=0,Mt=0),G!==null?(Tt=G.x,Et=G.y):(Tt=0,Et=0);const bt=Ut.convert(N.format),Zt=Ut.convert(N.type);E.setTexture2D(N,0),P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,N.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,N.unpackAlignment);const se=P.getParameter(P.UNPACK_ROW_LENGTH),ce=P.getParameter(P.UNPACK_IMAGE_HEIGHT),ze=P.getParameter(P.UNPACK_SKIP_PIXELS),Yt=P.getParameter(P.UNPACK_SKIP_ROWS),wt=P.getParameter(P.UNPACK_SKIP_IMAGES),we=w.isCompressedTexture?w.mipmaps[F]:w.image;P.pixelStorei(P.UNPACK_ROW_LENGTH,we.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,we.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,_t),P.pixelStorei(P.UNPACK_SKIP_ROWS,Mt),w.isDataTexture?P.texSubImage2D(P.TEXTURE_2D,F,Tt,Et,at,ht,bt,Zt,we.data):w.isCompressedTexture?P.compressedTexSubImage2D(P.TEXTURE_2D,F,Tt,Et,we.width,we.height,bt,we.data):P.texSubImage2D(P.TEXTURE_2D,F,Tt,Et,at,ht,bt,Zt,we),P.pixelStorei(P.UNPACK_ROW_LENGTH,se),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ce),P.pixelStorei(P.UNPACK_SKIP_PIXELS,ze),P.pixelStorei(P.UNPACK_SKIP_ROWS,Yt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,wt),F===0&&N.generateMipmaps&&P.generateMipmap(P.TEXTURE_2D),Ct.unbindTexture()},this.copyTextureToTexture3D=function(w,N,H=null,G=null,F=0){w.isTexture!==!0&&(ca("WebGLRenderer: copyTextureToTexture3D function signature has changed."),H=arguments[0]||null,G=arguments[1]||null,w=arguments[2],N=arguments[3],F=arguments[4]||0);let at,ht,_t,Mt,Tt,Et,bt,Zt,se;const ce=w.isCompressedTexture?w.mipmaps[F]:w.image;H!==null?(at=H.max.x-H.min.x,ht=H.max.y-H.min.y,_t=H.max.z-H.min.z,Mt=H.min.x,Tt=H.min.y,Et=H.min.z):(at=ce.width,ht=ce.height,_t=ce.depth,Mt=0,Tt=0,Et=0),G!==null?(bt=G.x,Zt=G.y,se=G.z):(bt=0,Zt=0,se=0);const ze=Ut.convert(N.format),Yt=Ut.convert(N.type);let wt;if(N.isData3DTexture)E.setTexture3D(N,0),wt=P.TEXTURE_3D;else if(N.isDataArrayTexture||N.isCompressedArrayTexture)E.setTexture2DArray(N,0),wt=P.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}P.pixelStorei(P.UNPACK_FLIP_Y_WEBGL,N.flipY),P.pixelStorei(P.UNPACK_PREMULTIPLY_ALPHA_WEBGL,N.premultiplyAlpha),P.pixelStorei(P.UNPACK_ALIGNMENT,N.unpackAlignment);const we=P.getParameter(P.UNPACK_ROW_LENGTH),jt=P.getParameter(P.UNPACK_IMAGE_HEIGHT),Ze=P.getParameter(P.UNPACK_SKIP_PIXELS),di=P.getParameter(P.UNPACK_SKIP_ROWS),He=P.getParameter(P.UNPACK_SKIP_IMAGES);P.pixelStorei(P.UNPACK_ROW_LENGTH,ce.width),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,ce.height),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Mt),P.pixelStorei(P.UNPACK_SKIP_ROWS,Tt),P.pixelStorei(P.UNPACK_SKIP_IMAGES,Et),w.isDataTexture||w.isData3DTexture?P.texSubImage3D(wt,F,bt,Zt,se,at,ht,_t,ze,Yt,ce.data):N.isCompressedArrayTexture?P.compressedTexSubImage3D(wt,F,bt,Zt,se,at,ht,_t,ze,ce.data):P.texSubImage3D(wt,F,bt,Zt,se,at,ht,_t,ze,Yt,ce),P.pixelStorei(P.UNPACK_ROW_LENGTH,we),P.pixelStorei(P.UNPACK_IMAGE_HEIGHT,jt),P.pixelStorei(P.UNPACK_SKIP_PIXELS,Ze),P.pixelStorei(P.UNPACK_SKIP_ROWS,di),P.pixelStorei(P.UNPACK_SKIP_IMAGES,He),F===0&&N.generateMipmaps&&P.generateMipmap(wt),Ct.unbindTexture()},this.initRenderTarget=function(w){It.get(w).__webglFramebuffer===void 0&&E.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?E.setTextureCube(w,0):w.isData3DTexture?E.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?E.setTexture2DArray(w,0):E.setTexture2D(w,0),Ct.unbindTexture()},this.resetState=function(){R=0,C=0,A=null,Ct.reset(),te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===br?"display-p3":"srgb",e.unpackColorSpace=Kt.workingColorSpace===Sa?"display-p3":"srgb"}}class Er{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new St(t),this.density=e}clone(){return new Er(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Ar extends ve{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new ge,this.environmentIntensity=1,this.environmentRotation=new ge,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class h0{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=or,this.updateRanges=[],this.version=0,this.uuid=kn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let s=0,a=this.stride;s<a;s++)this.array[t+s]=e.array[n+s];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=kn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=kn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Le=new T;class ga{constructor(t,e,n,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyMatrix4(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.applyNormalMatrix(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Le.fromBufferAttribute(this,e),Le.transformDirection(t),this.setXYZ(e,Le.x,Le.y,Le.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=ln(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Qt(n,this.array)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=Qt(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=Qt(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=Qt(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=Qt(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=ln(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=ln(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=ln(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=ln(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=Qt(e,this.array),n=Qt(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,s){return t=t*this.data.stride+this.offset,this.normalized&&(e=Qt(e,this.array),n=Qt(n,this.array),s=Qt(s,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this}setXYZW(t,e,n,s,a){return t=t*this.data.stride+this.offset,this.normalized&&(e=Qt(e,this.array),n=Qt(n,this.array),s=Qt(s,this.array),a=Qt(a,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=s,this.data.array[t+3]=a,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)e.push(this.data.array[s+a])}return new be(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new ga(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const s=n*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)e.push(this.data.array[s+a])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class Cr extends Gn{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new St(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Ei;const is=new T,Ai=new T,Ci=new T,Ri=new Lt,ss=new Lt,Bc=new qt,Vs=new T,as=new T,Ws=new T,kl=new Lt,ho=new Lt,Ol=new Lt;class zc extends ve{constructor(t=new Cr){if(super(),this.isSprite=!0,this.type="Sprite",Ei===void 0){Ei=new le;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new h0(e,5);Ei.setIndex([0,1,2,0,2,3]),Ei.setAttribute("position",new ga(n,3,0,!1)),Ei.setAttribute("uv",new ga(n,2,3,!1))}this.geometry=Ei,this.material=t,this.center=new Lt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Ai.setFromMatrixScale(this.matrixWorld),Bc.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Ci.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Ai.multiplyScalar(-Ci.z);const n=this.material.rotation;let s,a;n!==0&&(a=Math.cos(n),s=Math.sin(n));const r=this.center;$s(Vs.set(-.5,-.5,0),Ci,r,Ai,s,a),$s(as.set(.5,-.5,0),Ci,r,Ai,s,a),$s(Ws.set(.5,.5,0),Ci,r,Ai,s,a),kl.set(0,0),ho.set(1,0),Ol.set(1,1);let o=t.ray.intersectTriangle(Vs,as,Ws,!1,is);if(o===null&&($s(as.set(-.5,.5,0),Ci,r,Ai,s,a),ho.set(0,1),o=t.ray.intersectTriangle(Vs,Ws,as,!1,is),o===null))return;const l=t.ray.origin.distanceTo(is);l<t.near||l>t.far||e.push({distance:l,point:is.clone(),uv:je.getInterpolation(is,Vs,as,Ws,kl,ho,Ol,new Lt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function $s(i,t,e,n,s,a){Ri.subVectors(i,e).addScalar(.5).multiply(n),s!==void 0?(ss.x=a*Ri.x-s*Ri.y,ss.y=s*Ri.x+a*Ri.y):ss.copy(Ri),i.copy(t),i.x+=ss.x,i.y+=ss.y,i.applyMatrix4(Bc)}class d0 extends Pe{constructor(t=null,e=1,n=1,s,a,r,o,l,c=Be,h=Be,d,u){super(null,r,o,l,c,h,s,a,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Bl extends be{constructor(t,e,n,s=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Pi=new qt,zl=new qt,qs=[],Hl=new ci,u0=new qt,os=new tt,rs=new hi;class va extends tt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Bl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,u0)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new ci),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Pi),Hl.copy(t.boundingBox).applyMatrix4(Pi),this.boundingBox.union(Hl)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new hi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Pi),rs.copy(t.boundingSphere).applyMatrix4(Pi),this.boundingSphere.union(rs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.morphTexture!==null&&(this.morphTexture=t.morphTexture.clone()),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,s=this.morphTexture.source.data.data,a=n.length+1,r=t*a+1;for(let o=0;o<n.length;o++)n[o]=s[r+o]}raycast(t,e){const n=this.matrixWorld,s=this.count;if(os.geometry=this.geometry,os.material=this.material,os.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),rs.copy(this.boundingSphere),rs.applyMatrix4(n),t.ray.intersectsSphere(rs)!==!1))for(let a=0;a<s;a++){this.getMatrixAt(a,Pi),zl.multiplyMatrices(n,Pi),os.matrixWorld=zl,os.raycast(t,qs);for(let r=0,o=qs.length;r<o;r++){const l=qs[r];l.instanceId=a,l.object=this,e.push(l)}qs.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Bl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}setMorphAt(t,e){const n=e.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new d0(new Float32Array(s*this.count),s,this.count,_r,cn));const a=this.morphTexture.source.data.data;let r=0;for(let c=0;c<n.length;c++)r+=n[c];const o=this.geometry.morphTargetsRelative?1:1-r,l=s*t;a[l]=o,a.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}}class Hc extends Gn{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new St(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const _a=new T,Ma=new T,Gl=new qt,ls=new wr,Xs=new hi,uo=new T,Vl=new T;class Wl extends ve{constructor(t=new le,e=new Hc){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let s=1,a=e.count;s<a;s++)_a.fromBufferAttribute(e,s-1),Ma.fromBufferAttribute(e,s),n[s]=n[s-1],n[s]+=_a.distanceTo(Ma);t.setAttribute("lineDistance",new ne(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,a=t.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Xs.copy(n.boundingSphere),Xs.applyMatrix4(s),Xs.radius+=a,t.ray.intersectsSphere(Xs)===!1)return;Gl.copy(s).invert(),ls.copy(t.ray).applyMatrix4(Gl);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const m=Math.max(0,r.start),g=Math.min(h.count,r.start+r.count);for(let _=m,p=g-1;_<p;_+=c){const f=h.getX(_),b=h.getX(_+1),x=Ys(this,t,ls,l,f,b);x&&e.push(x)}if(this.isLineLoop){const _=h.getX(g-1),p=h.getX(m),f=Ys(this,t,ls,l,_,p);f&&e.push(f)}}else{const m=Math.max(0,r.start),g=Math.min(u.count,r.start+r.count);for(let _=m,p=g-1;_<p;_+=c){const f=Ys(this,t,ls,l,_,_+1);f&&e.push(f)}if(this.isLineLoop){const _=Ys(this,t,ls,l,g-1,m);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function Ys(i,t,e,n,s,a){const r=i.geometry.attributes.position;if(_a.fromBufferAttribute(r,s),Ma.fromBufferAttribute(r,a),e.distanceSqToSegment(_a,Ma,uo,Vl)>n)return;uo.applyMatrix4(i.matrixWorld);const l=t.ray.origin.distanceTo(uo);if(!(l<t.near||l>t.far))return{distance:l,point:Vl.clone().applyMatrix4(i.matrixWorld),index:s,face:null,faceIndex:null,barycoord:null,object:i}}class Zi extends Gn{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new St(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const $l=new qt,cr=new wr,js=new hi,Ks=new T;class Ms extends ve{constructor(t=new le,e=new Zi){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}raycast(t,e){const n=this.geometry,s=this.matrixWorld,a=t.params.Points.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),js.copy(n.boundingSphere),js.applyMatrix4(s),js.radius+=a,t.ray.intersectsSphere(js)===!1)return;$l.copy(s).invert(),cr.copy(t.ray).applyMatrix4($l);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,d=n.attributes.position;if(c!==null){const u=Math.max(0,r.start),m=Math.min(c.count,r.start+r.count);for(let g=u,_=m;g<_;g++){const p=c.getX(g);Ks.fromBufferAttribute(d,p),ql(Ks,p,l,s,t,e,this)}}else{const u=Math.max(0,r.start),m=Math.min(d.count,r.start+r.count);for(let g=u,_=m;g<_;g++)Ks.fromBufferAttribute(d,g),ql(Ks,g,l,s,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const s=e[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=s.length;a<r;a++){const o=s[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function ql(i,t,e,n,s,a,r){const o=cr.distanceSqToPoint(i);if(o<e){const l=new T;cr.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;a.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:r})}}class Gc extends Pe{constructor(t,e,n,s,a,r,o,l,c){super(t,e,n,s,a,r,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class f0{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,s=this.getPoint(0),a=0;e.push(0);for(let r=1;r<=t;r++)n=this.getPoint(r/t),a+=n.distanceTo(s),e.push(a),s=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let s=0;const a=n.length;let r;e?r=e:r=t*n[a-1];let o=0,l=a-1,c;for(;o<=l;)if(s=Math.floor(o+(l-o)/2),c=n[s]-r,c<0)o=s+1;else if(c>0)l=s-1;else{l=s;break}if(s=l,n[s]===r)return s/(a-1);const h=n[s],u=n[s+1]-h,m=(r-h)/u;return(s+m)/(a-1)}getTangent(t,e){let s=t-1e-4,a=t+1e-4;s<0&&(s=0),a>1&&(a=1);const r=this.getPoint(s),o=this.getPoint(a),l=e||(r.isVector2?new Lt:new T);return l.copy(o).sub(r).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new T,s=[],a=[],r=[],o=new T,l=new qt;for(let m=0;m<=t;m++){const g=m/t;s[m]=this.getTangentAt(g,new T)}a[0]=new T,r[0]=new T;let c=Number.MAX_VALUE;const h=Math.abs(s[0].x),d=Math.abs(s[0].y),u=Math.abs(s[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(s[0],n).normalize(),a[0].crossVectors(s[0],o),r[0].crossVectors(s[0],a[0]);for(let m=1;m<=t;m++){if(a[m]=a[m-1].clone(),r[m]=r[m-1].clone(),o.crossVectors(s[m-1],s[m]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Ce(s[m-1].dot(s[m]),-1,1));a[m].applyMatrix4(l.makeRotationAxis(o,g))}r[m].crossVectors(s[m],a[m])}if(e===!0){let m=Math.acos(Ce(a[0].dot(a[t]),-1,1));m/=t,s[0].dot(o.crossVectors(a[0],a[t]))>0&&(m=-m);for(let g=1;g<=t;g++)a[g].applyMatrix4(l.makeRotationAxis(s[g],m*g)),r[g].crossVectors(s[g],a[g])}return{tangents:s,normals:a,binormals:r}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}function Rr(){let i=0,t=0,e=0,n=0;function s(a,r,o,l){i=a,t=o,e=-3*a+3*r-2*o-l,n=2*a-2*r+o+l}return{initCatmullRom:function(a,r,o,l,c){s(r,o,c*(o-a),c*(l-r))},initNonuniformCatmullRom:function(a,r,o,l,c,h,d){let u=(r-a)/c-(o-a)/(c+h)+(o-r)/h,m=(o-r)/h-(l-r)/(h+d)+(l-o)/d;u*=h,m*=h,s(r,o,u,m)},calc:function(a){const r=a*a,o=r*a;return i+t*a+e*r+n*o}}}const Zs=new T,fo=new Rr,po=new Rr,mo=new Rr;class p0 extends f0{constructor(t=[],e=!1,n="centripetal",s=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=s}getPoint(t,e=new T){const n=e,s=this.points,a=s.length,r=(a-(this.closed?0:1))*t;let o=Math.floor(r),l=r-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/a)+1)*a:l===0&&o===a-1&&(o=a-2,l=1);let c,h;this.closed||o>0?c=s[(o-1)%a]:(Zs.subVectors(s[0],s[1]).add(s[0]),c=Zs);const d=s[o%a],u=s[(o+1)%a];if(this.closed||o+2<a?h=s[(o+2)%a]:(Zs.subVectors(s[a-1],s[a-2]).add(s[a-1]),h=Zs),this.curveType==="centripetal"||this.curveType==="chordal"){const m=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(d),m),_=Math.pow(d.distanceToSquared(u),m),p=Math.pow(u.distanceToSquared(h),m);_<1e-4&&(_=1),g<1e-4&&(g=_),p<1e-4&&(p=_),fo.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,g,_,p),po.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,g,_,p),mo.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,g,_,p)}else this.curveType==="catmullrom"&&(fo.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),po.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),mo.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(fo.calc(l),po.calc(l),mo.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(s.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const s=this.points[e];t.points.push(s.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const s=t.points[e];this.points.push(new T().fromArray(s))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}class Yi extends le{constructor(t=1,e=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:s},e=Math.max(3,e);const a=[],r=[],o=[],l=[],c=new T,h=new Lt;r.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){const m=n+d/e*s;c.x=t*Math.cos(m),c.y=t*Math.sin(m),r.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(r[u]/t+1)/2,h.y=(r[u+1]/t+1)/2,l.push(h.x,h.y)}for(let d=1;d<=e;d++)a.push(d,d+1,0);this.setIndex(a),this.setAttribute("position",new ne(r,3)),this.setAttribute("normal",new ne(o,3)),this.setAttribute("uv",new ne(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Yi(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class oe extends le{constructor(t=1,e=1,n=1,s=32,a=1,r=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:s,heightSegments:a,openEnded:r,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),a=Math.floor(a);const h=[],d=[],u=[],m=[];let g=0;const _=[],p=n/2;let f=0;b(),r===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new ne(d,3)),this.setAttribute("normal",new ne(u,3)),this.setAttribute("uv",new ne(m,2));function b(){const S=new T,R=new T;let C=0;const A=(e-t)/n;for(let L=0;L<=a;L++){const I=[],v=L/a,M=v*(e-t)+t;for(let U=0;U<=s;U++){const k=U/s,z=k*l+o,X=Math.sin(z),O=Math.cos(z);R.x=M*X,R.y=-v*n+p,R.z=M*O,d.push(R.x,R.y,R.z),S.set(X,A,O).normalize(),u.push(S.x,S.y,S.z),m.push(k,1-v),I.push(g++)}_.push(I)}for(let L=0;L<s;L++)for(let I=0;I<a;I++){const v=_[I][L],M=_[I+1][L],U=_[I+1][L+1],k=_[I][L+1];t>0&&(h.push(v,M,k),C+=3),e>0&&(h.push(M,U,k),C+=3)}c.addGroup(f,C,0),f+=C}function x(S){const R=g,C=new Lt,A=new T;let L=0;const I=S===!0?t:e,v=S===!0?1:-1;for(let U=1;U<=s;U++)d.push(0,p*v,0),u.push(0,v,0),m.push(.5,.5),g++;const M=g;for(let U=0;U<=s;U++){const z=U/s*l+o,X=Math.cos(z),O=Math.sin(z);A.x=I*O,A.y=p*v,A.z=I*X,d.push(A.x,A.y,A.z),u.push(0,v,0),C.x=X*.5+.5,C.y=O*.5*v+.5,m.push(C.x,C.y),g++}for(let U=0;U<s;U++){const k=R+U,z=M+U;S===!0?h.push(z,z+1,k):h.push(z+1,z,k),L+=3}c.addGroup(f,L,S===!0?1:2),f+=L}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new oe(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Fe extends oe{constructor(t=1,e=1,n=32,s=1,a=!1,r=0,o=Math.PI*2){super(0,t,e,n,s,a,r,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:s,openEnded:a,thetaStart:r,thetaLength:o}}static fromJSON(t){return new Fe(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Ea extends le{constructor(t=[],e=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:s};const a=[],r=[];o(s),c(n),h(),this.setAttribute("position",new ne(a,3)),this.setAttribute("normal",new ne(a.slice(),3)),this.setAttribute("uv",new ne(r,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(b){const x=new T,S=new T,R=new T;for(let C=0;C<e.length;C+=3)m(e[C+0],x),m(e[C+1],S),m(e[C+2],R),l(x,S,R,b)}function l(b,x,S,R){const C=R+1,A=[];for(let L=0;L<=C;L++){A[L]=[];const I=b.clone().lerp(S,L/C),v=x.clone().lerp(S,L/C),M=C-L;for(let U=0;U<=M;U++)U===0&&L===C?A[L][U]=I:A[L][U]=I.clone().lerp(v,U/M)}for(let L=0;L<C;L++)for(let I=0;I<2*(C-L)-1;I++){const v=Math.floor(I/2);I%2===0?(u(A[L][v+1]),u(A[L+1][v]),u(A[L][v])):(u(A[L][v+1]),u(A[L+1][v+1]),u(A[L+1][v]))}}function c(b){const x=new T;for(let S=0;S<a.length;S+=3)x.x=a[S+0],x.y=a[S+1],x.z=a[S+2],x.normalize().multiplyScalar(b),a[S+0]=x.x,a[S+1]=x.y,a[S+2]=x.z}function h(){const b=new T;for(let x=0;x<a.length;x+=3){b.x=a[x+0],b.y=a[x+1],b.z=a[x+2];const S=p(b)/2/Math.PI+.5,R=f(b)/Math.PI+.5;r.push(S,1-R)}g(),d()}function d(){for(let b=0;b<r.length;b+=6){const x=r[b+0],S=r[b+2],R=r[b+4],C=Math.max(x,S,R),A=Math.min(x,S,R);C>.9&&A<.1&&(x<.2&&(r[b+0]+=1),S<.2&&(r[b+2]+=1),R<.2&&(r[b+4]+=1))}}function u(b){a.push(b.x,b.y,b.z)}function m(b,x){const S=b*3;x.x=t[S+0],x.y=t[S+1],x.z=t[S+2]}function g(){const b=new T,x=new T,S=new T,R=new T,C=new Lt,A=new Lt,L=new Lt;for(let I=0,v=0;I<a.length;I+=9,v+=6){b.set(a[I+0],a[I+1],a[I+2]),x.set(a[I+3],a[I+4],a[I+5]),S.set(a[I+6],a[I+7],a[I+8]),C.set(r[v+0],r[v+1]),A.set(r[v+2],r[v+3]),L.set(r[v+4],r[v+5]),R.copy(b).add(x).add(S).divideScalar(3);const M=p(R);_(C,v+0,b,M),_(A,v+2,x,M),_(L,v+4,S,M)}}function _(b,x,S,R){R<0&&b.x===1&&(r[x]=b.x-1),S.x===0&&S.z===0&&(r[x]=R/2/Math.PI+.5)}function p(b){return Math.atan2(b.z,-b.x)}function f(b){return Math.atan2(-b.y,Math.sqrt(b.x*b.x+b.z*b.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ea(t.vertices,t.indices,t.radius,t.details)}}class Pr extends Ea{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=1/n,a=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],r=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(a,r,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Pr(t.radius,t.detail)}}class Lr extends Ea{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,s=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],a=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(s,a,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Lr(t.radius,t.detail)}}class ms extends le{constructor(t=.5,e=1,n=32,s=1,a=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:s,thetaStart:a,thetaLength:r},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],c=[],h=[];let d=t;const u=(e-t)/s,m=new T,g=new Lt;for(let _=0;_<=s;_++){for(let p=0;p<=n;p++){const f=a+p/n*r;m.x=d*Math.cos(f),m.y=d*Math.sin(f),l.push(m.x,m.y,m.z),c.push(0,0,1),g.x=(m.x/e+1)/2,g.y=(m.y/e+1)/2,h.push(g.x,g.y)}d+=u}for(let _=0;_<s;_++){const p=_*(n+1);for(let f=0;f<n;f++){const b=f+p,x=b,S=b+n+1,R=b+n+2,C=b+1;o.push(x,S,C),o.push(S,R,C)}}this.setIndex(o),this.setAttribute("position",new ne(l,3)),this.setAttribute("normal",new ne(c,3)),this.setAttribute("uv",new ne(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ms(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class $e extends le{constructor(t=1,e=32,n=16,s=0,a=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:s,phiLength:a,thetaStart:r,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(r+o,Math.PI);let c=0;const h=[],d=new T,u=new T,m=[],g=[],_=[],p=[];for(let f=0;f<=n;f++){const b=[],x=f/n;let S=0;f===0&&r===0?S=.5/e:f===n&&l===Math.PI&&(S=-.5/e);for(let R=0;R<=e;R++){const C=R/e;d.x=-t*Math.cos(s+C*a)*Math.sin(r+x*o),d.y=t*Math.cos(r+x*o),d.z=t*Math.sin(s+C*a)*Math.sin(r+x*o),g.push(d.x,d.y,d.z),u.copy(d).normalize(),_.push(u.x,u.y,u.z),p.push(C+S,1-x),b.push(c++)}h.push(b)}for(let f=0;f<n;f++)for(let b=0;b<e;b++){const x=h[f][b+1],S=h[f][b],R=h[f+1][b],C=h[f+1][b+1];(f!==0||r>0)&&m.push(x,S,C),(f!==n-1||l<Math.PI)&&m.push(S,R,C)}this.setIndex(m),this.setAttribute("position",new ne(g,3)),this.setAttribute("normal",new ne(_,3)),this.setAttribute("uv",new ne(p,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new $e(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ke extends le{constructor(t=1,e=.4,n=12,s=48,a=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:s,arc:a},n=Math.floor(n),s=Math.floor(s);const r=[],o=[],l=[],c=[],h=new T,d=new T,u=new T;for(let m=0;m<=n;m++)for(let g=0;g<=s;g++){const _=g/s*a,p=m/n*Math.PI*2;d.x=(t+e*Math.cos(p))*Math.cos(_),d.y=(t+e*Math.cos(p))*Math.sin(_),d.z=e*Math.sin(p),o.push(d.x,d.y,d.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),u.subVectors(d,h).normalize(),l.push(u.x,u.y,u.z),c.push(g/s),c.push(m/n)}for(let m=1;m<=n;m++)for(let g=1;g<=s;g++){const _=(s+1)*m+g-1,p=(s+1)*(m-1)+g-1,f=(s+1)*(m-1)+g,b=(s+1)*m+g;r.push(_,p,b),r.push(p,f,b)}this.setIndex(r),this.setAttribute("position",new ne(o,3)),this.setAttribute("normal",new ne(l,3)),this.setAttribute("uv",new ne(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ke(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Bt extends Gn{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new St(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new St(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=xc,this.normalScale=new Lt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new ge,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Aa extends ve{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new St(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(e.object.target=this.target.uuid),e}}class m0 extends Aa{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(ve.DEFAULT_UP),this.updateMatrix(),this.groundColor=new St(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const go=new qt,Xl=new T,Yl=new T;class Vc{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Lt(512,512),this.map=null,this.mapPass=null,this.matrix=new qt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Sr,this._frameExtents=new Lt(1,1),this._viewportCount=1,this._viewports=[new Jt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Xl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Xl),Yl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Yl),e.updateMatrixWorld(),go.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(go),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(go)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.intensity!==1&&(t.intensity=this.intensity),this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const jl=new qt,cs=new T,vo=new T;class g0 extends Vc{constructor(){super(new Re(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Lt(4,2),this._viewportCount=6,this._viewports=[new Jt(2,1,1,1),new Jt(0,1,1,1),new Jt(3,1,1,1),new Jt(1,1,1,1),new Jt(3,0,1,1),new Jt(1,0,1,1)],this._cubeDirections=[new T(1,0,0),new T(-1,0,0),new T(0,0,1),new T(0,0,-1),new T(0,1,0),new T(0,-1,0)],this._cubeUps=[new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,1,0),new T(0,0,1),new T(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,s=this.matrix,a=t.distance||n.far;a!==n.far&&(n.far=a,n.updateProjectionMatrix()),cs.setFromMatrixPosition(t.matrixWorld),n.position.copy(cs),vo.copy(n.position),vo.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(vo),n.updateMatrixWorld(),s.makeTranslation(-cs.x,-cs.y,-cs.z),jl.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(jl)}}class Kl extends Aa{constructor(t,e,n=0,s=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new g0}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class v0 extends Vc{constructor(){super(new Dc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class _0 extends Aa{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(ve.DEFAULT_UP),this.updateMatrix(),this.target=new ve,this.shadow=new v0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class M0 extends Aa{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class x0{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Zl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Zl();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Zl(){return performance.now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:fr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=fr);const y0=Math.PI*2,Ii=[{id:"gryffindor",name:"Gryffindor",color:"#8f1d2c",accent:"#e8b64c",trait:"Courage"},{id:"slytherin",name:"Slytherin",color:"#1f5d45",accent:"#c7d3c0",trait:"Ambition"},{id:"ravenclaw",name:"Ravenclaw",color:"#263f73",accent:"#b9a46a",trait:"Wit"},{id:"hufflepuff",name:"Hufflepuff",color:"#b8891f",accent:"#26211b",trait:"Loyalty"}],Wc=[{id:"speed",name:"Swiftness",desc:"Top speed on every broom",icon:"wind"},{id:"handling",name:"Handling",desc:"Sharper turns and control",icon:"compass"},{id:"boost",name:"Broom Magic",desc:"Stronger, longer boosts",icon:"spark"},{id:"power",name:"Power",desc:"Harder shots and Bludgers",icon:"impact"},{id:"reflex",name:"Reflex",desc:"Saves, catches and tackles",icon:"eye"}],gs=[{id:"cleansweep",name:"Cleansweep Eleven",maker:"Cleansweep Broom Co.",tier:1,price:0,level:1,length:"Reliable · Forgiving",desc:"The dependable school broom. Gentle, honest and ready for a first season.",stats:{speed:40,accel:52,handling:60,boost:40},colors:["#8b5a34","#caa06b"],accent:"#e5c87c"},{id:"comet",name:"Comet 290",maker:"Comet Trading Co.",tier:2,price:900,level:2,length:"Balanced · Agile",desc:"A sleek all-rounder with a lively tail and a taste for tight corners.",stats:{speed:52,accel:62,handling:66,boost:54},colors:["#3f5a72","#b9c6d2"],accent:"#e7b95e"},{id:"nimbus",name:"Nimbus 2001",maker:"Nimbus Racing Broom Co.",tier:3,price:1900,level:4,length:"Quick · Responsive",desc:"A championship-grade broom with silver-etched handle and superb balance.",stats:{speed:64,accel:70,handling:74,boost:64},colors:["#4a3a28","#d7c7a3"],accent:"#cfd6df"},{id:"firebolt",name:"Firebolt Supreme",maker:"Firebolt Premier",tier:4,price:3400,level:6,length:"Fast · Precise",desc:"Hand-finished ash, unbreakable braking charm. A World Cup icon.",stats:{speed:78,accel:79,handling:82,boost:82},colors:["#2b2119","#8f6a45"],accent:"#e6b34d"},{id:"stormchaser",name:"Stormchaser X",maker:"Belfast Broomworks",tier:5,price:5200,level:9,length:"Ferocious · Grippy",desc:"Built for storms. Copper coils drink lightning and spit it out as speed.",stats:{speed:88,accel:85,handling:74,boost:92},colors:["#232b38","#6f849d"],accent:"#69d3f4"},{id:"elderwind",name:"Elderwind Sovereign",maker:"Ollivander & Sons",tier:6,price:8500,level:12,length:"Legendary · Alive",desc:"A living broom grown from a single elder bough. It chooses its rider.",stats:{speed:96,accel:92,handling:90,boost:96},colors:["#3a2845","#c8aa6a"],accent:"#b6f2c4"}],ki=[{id:"gold",name:"Gold",color:"#e8bd5b"},{id:"scarlet",name:"Scarlet",color:"#c0392b"},{id:"emerald",name:"Emerald",color:"#2f9e6f"},{id:"ice",name:"Ice",color:"#7dd8f0"},{id:"violet",name:"Violet",color:"#a87ce0"},{id:"silver",name:"Silver",color:"#d6dde6"}],Ln=({count:i=14,rx:t,rz:e,base:n,amp:s=10,wobble:a=.15,phase:r=0})=>{const o=[];for(let l=0;l<i;l++){const c=l/i*y0,h=Math.cos(c)*t+Math.sin(c*3+r)*t*a*.18,d=Math.sin(c)*e+Math.cos(c*2+r*1.3)*e*a*.22,u=n+Math.sin(c*2+r)*s+Math.cos(c*3+r*1.7)*s*.32;o.push([Number(h.toFixed(1)),Number(u.toFixed(1)),Number(d.toFixed(1))])}return o},sn=[{id:"hogwarts",name:"Hogwarts Sky Circuit",region:"Hogwarts Grounds",theme:"hogwarts",time:"day",weather:"clear",wind:.18,difficulty:1,laps:2,tunnel:[7,8],warp:[5],boost:[3,10],count:14,tagline:"Castle turrets, lake winds and a first taste of glory.",desc:"Thread the golden hoops above the Black Lake and sweep past the Astronomy Tower before diving through the viaduct.",points:Ln({rx:205,rz:150,base:40,amp:13,wobble:.22,phase:.6}),targetLap:34500},{id:"worldcup",name:"World Cup Colosseum",region:"International Stadium",theme:"worldcup",time:"night",weather:"clear",wind:.1,difficulty:2,laps:3,tunnel:[9,10],warp:[6],boost:[2,5,12],count:14,tagline:"A floodlit lap of honour around the greatest stadium in sport.",desc:"Circle the Quidditch World Cup stadium at roof height, then cut through the torch arches as ninety thousand fans roar.",points:Ln({rx:185,rz:135,base:34,amp:12,wobble:.08,phase:2.1}),targetLap:30500},{id:"highlands",name:"Highland Thunder Run",region:"Scottish Highlands",theme:"highlands",time:"day",weather:"storm",wind:.65,difficulty:2,laps:2,tunnel:[4,5],warp:[9],boost:[1,7,11],count:16,tagline:"Storm winds, standing stones and mile after mile of heather.",desc:"Battle crosswinds between ancient standing stones. The loch is below, the lightning is close, and the finish is calling.",points:Ln({rx:255,rz:195,base:56,amp:24,wobble:.34,phase:4.2}),targetLap:41e3},{id:"london",name:"Diagon Rooftop Dash",region:"London Wizarding District",theme:"london",time:"dusk",weather:"rain",wind:.3,difficulty:2,laps:2,tunnel:[10,11],warp:[4],boost:[2,8],count:14,tagline:"Rain-slicked slate, glowing shop windows and no room for error.",desc:"Skim the chimneys of Diagon Alley and dive between gas lamps and owl post towers. Mind the washing lines.",points:Ln({rx:178,rz:138,base:30,amp:9,wobble:.28,phase:1.2}),targetLap:33e3},{id:"forest",name:"Forbidden Hollow",region:"The Forbidden Forest",theme:"forest",time:"night",weather:"clear",wind:.22,difficulty:2,laps:2,tunnel:[5,6,7],warp:[8],boost:[3,11],count:14,tagline:"Bioluminescent hollows and things that watch from the dark.",desc:"Weave between ancient roots and glowing fungi. The trees lean closer with every lap. Stay on the path.",points:Ln({rx:158,rz:128,base:24,amp:11,wobble:.36,phase:3.3}),targetLap:35e3},{id:"alpine",name:"Frostpeak Aurora",region:"Snow-Covered Alps",theme:"alpine",time:"night",weather:"snow",wind:.5,difficulty:3,laps:2,tunnel:[8,9],warp:[6],boost:[2,4,12],count:16,tagline:"Aurora above, blizzard below, ice in your veins.",desc:"Climb above the frozen lake and carve between glacier spires. The aurora lights the hoops — if you can see them.",points:Ln({rx:238,rz:192,base:66,amp:28,wobble:.3,phase:5.4}),targetLap:42e3},{id:"kyoto",name:"Kyoto Lantern Ascent",region:"Mahoutokoro, Japan",theme:"kyoto",time:"dawn",weather:"clear",wind:.2,difficulty:2,laps:2,tunnel:[6,7],warp:[3],boost:[1,9,12],count:14,tagline:"Cherry blossom winds and a thousand floating lanterns.",desc:"Skim the rooftops of the mahoutokoro shrine as paper lanterns drift skyward. Every hoop is a torii gate to glory.",points:Ln({rx:188,rz:158,base:40,amp:15,wobble:.24,phase:.9}),targetLap:34500},{id:"cairo",name:"Sunspire Sprint",region:"Cairo, Egypt",theme:"cairo",time:"dusk",weather:"clear",wind:.35,difficulty:3,laps:2,tunnel:[4,5],warp:[8],boost:[2,6,11],count:16,tagline:"Pyramids, sunfire and a desert wind at your back.",desc:"Race the setting sun past the pyramids and through obelisk gates. The desert heat turns the air to silk — and the sand to a wall.",points:Ln({rx:220,rz:172,base:46,amp:19,wobble:.26,phase:2.8}),targetLap:38e3}],he=[{id:"england",name:"England",code:"ENG",city:"London",stadium:"The Wembley of Wizardry",colors:["#9e1b32","#f3e7ce"],accent:"#e2b954",beast:"Lion"},{id:"france",name:"France",code:"FRA",city:"Paris",stadium:"Stade des Sortilèges",colors:["#244b9b","#eef2fa"],accent:"#cdd6e6",beast:"Fleur"},{id:"japan",name:"Japan",code:"JPN",city:"Kyoto",stadium:"Mahoutokoro Sky Bowl",colors:["#b8243f","#f7eee8"],accent:"#e8c36a",beast:"Crane"},{id:"brazil",name:"Brazil",code:"BRA",city:"Rio",stadium:"Estádio das Nuvens",colors:["#1c7a4b","#f3d34a"],accent:"#7dd8f0",beast:"Macaw"},{id:"egypt",name:"Egypt",code:"EGY",city:"Cairo",stadium:"The Sunspire Arena",colors:["#b8862f","#1d7d80"],accent:"#f2d37d",beast:"Sphinx"},{id:"norway",name:"Norway",code:"NOR",city:"Bergen",stadium:"Frostheim Bowl",colors:["#2a5d8f","#dfeef8"],accent:"#9fe8ff",beast:"Fenrir"},{id:"usa",name:"United States",code:"USA",city:"New York",stadium:"The Thunderdome",colors:["#27345f","#b23a48"],accent:"#e7c56a",beast:"Thunderbird"},{id:"australia",name:"Australia",code:"AUS",city:"Melbourne",stadium:"Sunburnt Sky Park",colors:["#1f6b4a","#e6b84c"],accent:"#f6e3a1",beast:"Kangaroo"}],si=[{id:"chaser",name:"Chaser",short:"CH",icon:"quaffle",color:"#e05d4f",desc:"Take the Quaffle. Break through. Score ten points a goal."},{id:"beater",name:"Beater",short:"BE",icon:"bludger",color:"#7c8fa8",desc:"Swing the bat. Clear opponents and protect your ball carrier."},{id:"keeper",name:"Keeper",short:"KP",icon:"hoop",color:"#7fc5a6",desc:"Guard three hoops. Read the shot and dive to deny it."},{id:"seeker",name:"Seeker",short:"SE",icon:"snitch",color:"#e8c45b",desc:"Hunt the Golden Snitch. Catch it and end the match, +150."}],Ye=[{id:"rookie",name:"Rookie",ai:.82,reward:.9,desc:"Gentle winds. Room to learn."},{id:"pro",name:"Professional",ai:.97,reward:1,desc:"A true contest."},{id:"world",name:"World Class",ai:1.1,reward:1.25,desc:"No mercy. Legends only."}],Hi=[{id:"defensive",name:"Defensive",desc:"Protect the hoops. Fewer goals, fewer risks."},{id:"balanced",name:"Balanced",desc:"A measured match from end to end."},{id:"aggressive",name:"Aggressive",desc:"Press high. Score fast — and leave gaps."}],hs=[{id:"quick",name:"Quick Race",icon:"bolt",desc:"Three rivals, golden hoops, full throttle."},{id:"trial",name:"Time Trial",icon:"clock",desc:"Fly alone. Beat the clock and your best lap."},{id:"qualify",name:"Qualifying",icon:"flag",desc:"One flying lap to set your grid position."},{id:"championship",name:"Championship",icon:"trophy",desc:"Three circuits. One crown. Points decide everything."}],_n={name:"International Broom Grand Prix",tracks:["hogwarts","highlands","alpine"],points:[25,18,15,12,10,8]},Oi=[{id:"firstflight",title:"First Flight",roman:"I",icon:"broom",desc:"Complete any broom race and prove you belong in the sky.",hint:"Finish a Quick Race, Time Trial or Championship race.",reward:{galleons:250,xp:120},goal:i=>Math.min(1,i.stats.races),count:1},{id:"hogwartshero",title:"Hogwarts Hero",roman:"II",icon:"castle",desc:"Reach the podium on the Hogwarts Sky Circuit.",hint:"Finish in the top three at Hogwarts.",reward:{galleons:400,xp:180},goal:i=>{var t,e;return(e=(t=i.stats.trackResults)==null?void 0:t.hogwarts)!=null&&e.bestPos&&i.stats.trackResults.hogwarts.bestPos<=3?1:0},count:1},{id:"worldstage",title:"The World Stage",roman:"III",icon:"quidditch",desc:"Win a Quidditch World Cup match for your nation.",hint:"Win any tournament match.",reward:{galleons:500,xp:220},goal:i=>Math.min(1,i.quidditch.wins),count:1},{id:"grandprix",title:"Grand Prix Glory",roman:"IV",icon:"trophy",desc:"Win the International Broom Grand Prix championship.",hint:"Finish first overall in a three-race championship.",reward:{galleons:750,xp:300},goal:i=>Math.min(1,i.career.championships),count:1},{id:"snitch",title:"The Golden Snitch",roman:"V",icon:"snitch",desc:"Catch the Golden Snitch in a World Cup match.",hint:"Play as Seeker and get within grabbing distance.",reward:{galleons:650,xp:280},goal:i=>Math.min(1,i.quidditch.snitch),count:1},{id:"worldchampion",title:"World Champion",roman:"VI",icon:"cup",desc:"Lift the Quidditch World Cup for your nation.",hint:"Win the quarter-final, semi-final and final.",reward:{galleons:2500,xp:1e3},goal:i=>Math.min(1,i.career.cups),count:1}],hr=[{id:"firstflight",name:"First Flight",desc:"Complete your first broom race.",icon:"broom",goal:i=>i.stats.races,count:1,reward:150},{id:"podium",name:"On the Podium",desc:"Finish a race in the top three.",icon:"trophy",goal:i=>i.stats.podiums,count:1,reward:200},{id:"winner",name:"Golden Grip",desc:"Win a broom race.",icon:"medal",goal:i=>i.stats.wins,count:1,reward:300},{id:"globetrotter",name:"Globetrotter",desc:"Race on five different circuits.",icon:"map",goal:i=>Object.keys(i.stats.trackResults||{}).length,count:5,reward:400},{id:"boostlord",name:"Broom Magic",desc:"Spend 120 seconds boosting.",icon:"spark",goal:i=>Math.floor(i.stats.boostTime||0),count:120,reward:250},{id:"goals",name:"Quaffle Hunter",desc:"Score five Quaffle goals.",icon:"quaffle",goal:i=>i.quidditch.goals,count:5,reward:300},{id:"hattrick",name:"Hat-Trick Hero",desc:"Score three goals in one match.",icon:"bolt",goal:i=>i.stats.bestMatchGoals||0,count:3,reward:350},{id:"saves",name:"Wall of Iron",desc:"Make five Keeper saves.",icon:"hoop",goal:i=>i.quidditch.saves,count:5,reward:300},{id:"bludger",name:"Bludger Bruiser",desc:"Land five Bludger hits.",icon:"bludger",goal:i=>i.quidditch.bludgers,count:5,reward:300},{id:"snitch",name:"Snitch Catcher",desc:"Catch the Golden Snitch.",icon:"snitch",goal:i=>i.quidditch.snitch,count:1,reward:500},{id:"champion",name:"World Champion",desc:"Win the Quidditch World Cup.",icon:"cup",goal:i=>i.career.cups,count:1,reward:1e3},{id:"legend",name:"Living Legend",desc:"Reach level 10.",icon:"star",goal:i=>i.profile.level,count:10,reward:800}],Ql=["Cassia Flint","Mateo Delacroix","Yuki Takeda","Priya Nair","Ivo Krum","Saoirse Quinn","Amara Okafor","Luca Bellini","Freya Lund","Darius Vance","Nellie Park","Rafael Costa"],Qs={england:["A. Peverell","M. Thorne","S. Whitlock","J. Ashford","R. Lyle","B. Keane","E. Vane"],france:["C. Delacour","L. Moreau","A. Rousseau","M. Girard","P. Laurent","S. Blanchet","N. Fontaine"],japan:["H. Sato","K. Mori","Y. Takeda","R. Ito","A. Kuroda","M. Sano","T. Nakamura"],brazil:["D. Silva","R. Costa","L. Almeida","B. Souza","I. Rocha","C. Mendes","J. Pereira"],egypt:["K. Hassan","N. Farouk","A. Rahman","S. Nasser","T. Aziz","H. Mansour","M. Saleh"],norway:["E. Lund","F. Berg","S. Dahl","O. Vik","H. Solberg","K. Aas","L. Fjord"],usa:["J. Carter","D. Boone","M. Ellis","T. Reed","S. Cole","W. Hayes","A. Brooks"],australia:["L. Hunter","N. Marsh","C. Dunn","R. Flynn","E. Walsh","T. Reid","M. Kerr"]},$c={raceStart:["They are away! The hoops are calling!","And they’re off — brooms at full tilt!","A clean start. Now the sky belongs to them."],lap:["Final lap! Everything to fly for!","The pace is relentless as they begin another lap.","The crowd is on its feet — this is broom racing!"],boost:["A burst of broom magic!","Look at that acceleration!","They’re riding the wind now!"],warp:["A reckless shortcut through the veil!","Through the dark gate — brave or foolish?","The shortcut bites back!"],hit:["A nasty clip! That will cost precious time.","Collision! The circuit bites!","They’re shaken, but still flying!"],win:["A magnificent victory! The crowd erupts!","First across the line — what a flight!","A performance worthy of the World Cup!"],lose:["A valiant flight, but the day belongs to another.","So close — and yet the hoops keep their secrets.","The circuit is cruel today. There is always another race."],quidStart:["The Quaffle is released — the World Cup is alive!","Captains shake hands, brooms rise. Quidditch begins!","Ninety thousand voices, one magnificent match!"],goal:["GOAL! The Quaffle sails clean through!","Ten points! What a strike!","The hoops shudder — it’s a goal!"],save:["Denied! A spectacular save!","The Keeper reads it all the way!","No way through — what reflexes!"],bludger:["A Bludger with bad intentions!","Crunching hit! The carrier is down!","The Beaters are earning their keep!"],snitch:["The Snitch is loose! Seekers, after it!","A flash of gold in the sun — the chase is on!","The Golden Snitch! This could decide everything!"],snitchCatch:["CAUGHT! The Golden Snitch! One hundred and fifty points!","They have the Snitch — the World Cup is decided!","A blur of gold, a closed fist — the match is over!"],time:["The whistle goes! What a match!","Full time — the scoreboard tells the story."],tackle:["A brave interception!","Turnover! The Quaffle changes hands!"]},Ir="wizarding-sports-save-v1",qc=1;function Js(){return{version:qc,created:!1,profile:{name:"Aria Blackwood",house:"gryffindor",robe:"#8f1d2c",skin:"#d9a97f",hair:"#3a251a",level:1,xp:0,galleons:750,skillPoints:1,ranking:1180,nation:"england"},brooms:{owned:["cleansweep"],selected:"cleansweep",upgrades:{},livery:"gold"},skills:{speed:0,handling:0,boost:0,power:0,reflex:0},stats:{races:0,wins:0,podiums:0,boostTime:0,trackResults:{},bestMatchGoals:0},quidditch:{wins:0,losses:0,matches:0,goals:0,saves:0,bludgers:0,snitch:0,tournament:null},career:{chapter:0,claimed:[],championships:0,cups:0},history:[],achievements:{},settings:{sound:!0,music:!0,voice:!1,quality:"high",haptics:!0}}}function b0(){try{const i=localStorage.getItem(Ir);if(!i)return Js();const t=JSON.parse(i);return!t||t.version!==qc?Js():w0(Js(),t)}catch{return Js()}}function w0(i,t){var n;const e={...i,...t};return e.profile={...i.profile,...t.profile||{}},e.brooms={...i.brooms,...t.brooms||{}},e.skills={...i.skills,...t.skills||{}},e.stats={...i.stats,...t.stats||{}},e.stats.trackResults={...((n=t.stats)==null?void 0:n.trackResults)||{}},e.quidditch={...i.quidditch,...t.quidditch||{}},e.career={...i.career,...t.career||{}},e.settings={...i.settings,...t.settings||{}},e.history=Array.isArray(t.history)?t.history.slice(0,30):[],e.achievements={...t.achievements||{}},e}function S0(i){try{localStorage.setItem(Ir,JSON.stringify(i))}catch{}}function xa(i){return 190+i*110}function Xc(i,t){const e={levels:0,points:0};for(i.profile.xp+=Math.max(0,Math.round(t));i.profile.xp>=xa(i.profile.level);)i.profile.xp-=xa(i.profile.level),i.profile.level+=1,i.profile.skillPoints+=1,i.profile.galleons+=100,e.levels+=1,e.points+=1;return e}function ta(i){return i>=2100?"World Legend":i>=1850?"Elite Champion":i>=1600?"International":i>=1380?"Contender":i>=1250?"Rising Star":"Academy Flyer"}function yn(i){return gs.find(t=>t.id===i)||gs[0]}function Di(i,t){var a;const e=yn(t).stats,n=((a=i.brooms.upgrades)==null?void 0:a[t])||{},s=i.skills;return{speed:Math.min(100,e.speed+(n.speed||0)*2.6+s.speed*2.1),accel:Math.min(100,e.accel+(n.accel||0)*2.6+s.handling*1.4),handling:Math.min(100,e.handling+(n.handling||0)*2.6+s.handling*2.1),boost:Math.min(100,e.boost+(n.boost||0)*2.6+s.boost*2.1)}}function Yc(i,t){const e={speed:190,accel:150,handling:165,boost:180}[i]||170;return Math.round((e+t*135)/10)*10}function T0(i,t){const e=yn(t);return i.brooms.owned.includes(t)?{ok:!0,owned:!0}:i.profile.galleons<e.price?{ok:!1,reason:"Not enough Galleons."}:i.profile.level<e.level?{ok:!1,reason:`Reach level ${e.level} to unlock.`}:(i.profile.galleons-=e.price,i.brooms.owned.push(t),i.brooms.selected=t,{ok:!0})}function E0(i,t,e){if(!i.brooms.owned.includes(t))return{ok:!1,reason:"Broom not owned."};const n=i.brooms.upgrades[t]||(i.brooms.upgrades[t]={}),s=n[e]||0;if(s>=5)return{ok:!1,reason:"Fully upgraded."};const a=Yc(e,s);return i.profile.galleons<a?{ok:!1,reason:"Not enough Galleons."}:(i.profile.galleons-=a,n[e]=s+1,{ok:!0,cost:a})}function A0(i,t){return!Wc.some(e=>e.id===t)||i.profile.skillPoints<=0||i.skills[t]>=10?!1:(i.skills[t]+=1,i.profile.skillPoints-=1,!0)}function Jl(i,{xp:t=0,galleons:e=0,ranking:n=0}){const s=Xc(i,t);return i.profile.galleons+=Math.round(e),i.profile.ranking=Math.max(0,i.profile.ranking+Math.round(n)),s}function C0(i,t){const e=i.stats;e.races+=1,t.pos===1&&(e.wins+=1),t.pos<=3&&(e.podiums+=1),e.boostTime=(e.boostTime||0)+(t.boostTime||0);const n=e.trackResults[t.trackId]||(e.trackResults[t.trackId]={races:0,bestPos:99,bestLap:null});return n.races+=1,n.bestPos=Math.min(n.bestPos,t.pos),t.bestLap&&(!n.bestLap||t.bestLap<n.bestLap)&&(n.bestLap=t.bestLap),i.history.unshift({type:"race",id:t.trackId,name:t.trackName,pos:t.pos,time:t.time,mode:t.mode,at:Date.now()}),i.history=i.history.slice(0,30),e}function R0(i,t){const e=i.quidditch;e.matches+=1,t.won?e.wins+=1:e.losses+=1,e.goals+=t.goals||0,e.saves+=t.saves||0,e.bludgers+=t.bludgers||0,t.snitch&&(e.snitch+=1),i.stats.bestMatchGoals=Math.max(i.stats.bestMatchGoals||0,t.goals||0),i.history.unshift({type:"quidditch",id:t.opponentId,name:`${t.nationName} vs ${t.opponentName}`,round:t.roundName,won:t.won,score:`${t.scoreFor}–${t.scoreAgainst}`,snitch:t.snitch,at:Date.now()}),i.history=i.history.slice(0,30)}function _o(i){const t=[];for(const e of hr){if(i.achievements[e.id])continue;Number(e.goal(i)||0)>=e.count&&(i.achievements[e.id]=Date.now(),i.profile.galleons+=e.reward,t.push(e))}return t}function dr(i,t){if(!t)return 0;const e=Number(t.goal(i)||0);return Math.min(1,e/t.count)}function jc(i,t){return dr(i,t)>=1&&!i.career.claimed.includes(t.id)}function P0(i,t){if(!jc(i,t))return!1;i.career.claimed.push(t.id),i.profile.galleons+=t.reward.galleons,Xc(i,t.reward.xp);const e=Oi.findIndex(n=>n.id===t.id);return e>=0&&(i.career.chapter=Math.max(i.career.chapter,e+1)),!0}function ei(i){if(!i&&i!==0)return"—";const t=Math.max(0,Math.round(i)),e=Math.floor(t/6e4),n=Math.floor(t%6e4/1e3),s=Math.floor(t%1e3/10);return`${e}:${String(n).padStart(2,"0")}.${String(s).padStart(2,"0")}`}function L0(i){const t=Math.max(0,Math.ceil(i));return`${Math.floor(t/60)}:${String(t%60).padStart(2,"0")}`}const Kc=["Quarter-final","Semi-final","Final"];function ya(){const i=40+Math.floor(Math.random()*90),t=Math.random()<.5?150:0;return i+t}function I0(i){const t=[...i];for(let e=t.length-1;e>0;e--){const n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function D0(i,t,e){const n=he.find(r=>r.id===t)||he[0],s=I0(he.filter(r=>r.id!==n.id)),a=[{a:n.id,b:s[0].id,player:!0,played:!1},{a:s[1].id,b:s[2].id,played:!1},{a:s[3].id,b:s[4].id,played:!1},{a:s[5].id,b:s[6].id,played:!1}];for(const r of a)r.player||(r.sa=ya(),r.sb=ya(),r.winner=r.sa>=r.sb?r.a:r.b,r.played=!0);return i.quidditch.tournament={nation:n.id,difficulty:e,round:0,rounds:[{name:Kc[0],matches:a}],champion:!1,eliminated:!1},i.quidditch.tournament}function ba(i){const t=i.quidditch.tournament;if(!t||t.eliminated||t.champion)return null;const e=t.rounds[t.round];if(!e)return null;const n=e.matches.find(a=>a.a===t.nation||a.b===t.nation);if(!n)return null;const s=n.a===t.nation?n.b:n.a;return{match:n,opponentId:s,round:t.round,roundName:e.name}}function U0(i,t,e){const n=i.quidditch.tournament,s=ba(i);if(!n||!s)return{done:!0,champion:!!(n!=null&&n.champion),eliminated:!!(n!=null&&n.eliminated)};const a=s.match;a.sa=a.a===n.nation?t:e,a.sb=a.a===n.nation?e:t,a.winner=t>=e?n.nation:s.opponentId,a.played=!0;const r=a.winner===n.nation;if(!r)return n.eliminated=!0,{done:!0,won:r,champion:!1,eliminated:!0,roundName:s.roundName};if(n.round>=2)return n.champion=!0,i.career.cups+=1,{done:!0,won:r,champion:!0,eliminated:!1,roundName:s.roundName};const o=n.rounds[n.round].matches.map(h=>h.winner),l=Kc[n.round+1];let c;n.round===0?c=[{a:o[0],b:o[1],player:o[0]===n.nation||o[1]===n.nation,played:!1},{a:o[2],b:o[3],player:o[2]===n.nation||o[3]===n.nation,played:!1}]:c=[{a:o[0],b:o[1],player:!0,played:!1}];for(const h of c)h.player||(h.sa=ya(),h.sb=ya(),h.winner=h.sa>=h.sb?h.a:h.b,h.played=!0);return n.round+=1,n.rounds.push({name:l,matches:c}),{done:!1,won:r,champion:!1,eliminated:!1,roundName:s.roundName}}function N0(i,t){const e=[{win:{galleons:400,xp:180,ranking:40},loss:{galleons:120,xp:70,ranking:8}},{win:{galleons:700,xp:280,ranking:75},loss:{galleons:200,xp:100,ranking:12}},{win:{galleons:1200,xp:500,ranking:120},loss:{galleons:300,xp:150,ranking:20}}];return(e[i]||e[0])[t?"win":"loss"]}function tc(i){i.quidditch.tournament=null}class F0{constructor(){this.ctx=null,this.mode="menu",this.state=null,this.started=!1,this.master=null,this.musicBus=null,this.sfxBus=null,this.delay=null,this.crowdBus=null,this.crowdGain=null,this.nextNote=0,this.step=0,this.time=0,this.lastSpeak=0,this.crowdTarget=0}attachState(t){this.state=t,this.crowdGain&&this.setMode(this.mode)}init(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}try{const t=window.AudioContext||window.webkitAudioContext;if(!t)return;const e=new t;this.ctx=e,this.master=e.createGain(),this.master.gain.value=.55,this.master.connect(e.destination),this.musicBus=e.createGain(),this.musicBus.gain.value=.24,this.musicBus.connect(this.master),this.sfxBus=e.createGain(),this.sfxBus.gain.value=.5,this.sfxBus.connect(this.master),this.delay=e.createDelay(1.2),this.delay.delayTime.value=.36;const n=e.createGain();n.gain.value=.3;const s=e.createGain();s.gain.value=.3,this.delay.connect(n),n.connect(this.delay),this.delay.connect(s),s.connect(this.master),this.wet=s,this.crowdBus=e.createGain(),this.crowdBus.gain.value=0,this.crowdBus.connect(this.master),this.crowdGain=this.crowdBus,this.startCrowd(),this.nextNote=e.currentTime+.1,this.setMode(this.mode),this.started=!0}catch{}}setMode(t){var e,n,s,a;if(this.mode=t,!!this.ctx){if(this.crowdTarget=t==="quid"?.12:t==="race"?.035:0,this.crowdGain&&(this.crowdGain.gain.cancelScheduledValues(this.ctx.currentTime),this.crowdGain.gain.setTargetAtTime(((n=(e=this.state)==null?void 0:e.settings)==null?void 0:n.sound)===!1?0:this.crowdTarget,this.ctx.currentTime,.6)),this.musicBus){const r=((a=(s=this.state)==null?void 0:s.settings)==null?void 0:a.music)!==!1;this.musicBus.gain.setTargetAtTime(r?t==="race"?.3:.22:0,this.ctx.currentTime,.4)}this.nextNote=Math.max(this.nextNote,this.ctx.currentTime+.05)}}startCrowd(){const t=this.ctx,n=t.createBuffer(2,t.sampleRate*4,t.sampleRate);for(let o=0;o<2;o++){const l=n.getChannelData(o);for(let c=0;c<l.length;c++){const h=c/l.length,d=.55+.45*Math.sin(h*Math.PI*2*1.7+o);l[c]=(Math.random()*2-1)*d*.5}}const s=t.createBufferSource();s.buffer=n,s.loop=!0;const a=t.createBiquadFilter();a.type="bandpass",a.frequency.value=680,a.Q.value=.55;const r=t.createBiquadFilter();r.type="lowpass",r.frequency.value=2400,s.connect(a).connect(r).connect(this.crowdBus),s.start(),this.crowdSource=s}update(t){var n,s;if(!this.ctx)return;if(this.time+=t,this.crowdGain){const a=((s=(n=this.state)==null?void 0:n.settings)==null?void 0:s.sound)===!1?0:this.crowdTarget;this.crowdGain.gain.setTargetAtTime(a,this.ctx.currentTime,.4)}const e=this.ctx.currentTime;for(;this.nextNote<e+.25;){this.scheduleStep(this.nextNote);const a=this.mode==="race"?.19:this.mode==="quid"?.24:.42;this.nextNote+=a,this.step+=1}}scheduleStep(t){var a,r;if(!(((r=(a=this.state)==null?void 0:a.settings)==null?void 0:r.music)!==!1))return;const n=this.step,s=this.mode;if(s==="menu"){const o=[146.83,174.61,220,196],l=o[Math.floor(n/8)%o.length];if(n%2===0){const c=[1,1.5,2,2.5,3,2.5,2,1.5],h=l*c[n/2%c.length|0];this.tone(h,t,1.1,.09,"sine",!0),this.tone(h*2.005,t,.7,.035,"triangle",!0)}n%16===0&&(this.tone(l*.5,t,3.4,.06,"sine",!0),this.tone(l*.75,t,3,.045,"triangle",!0))}else if(s==="race"){const o=[110,130.81,98,146.83],l=o[Math.floor(n/16)%o.length],c=[1,1,1.5,1,2,1.5,1,1];n%2===0&&this.tone(l*.5*c[n/2%8],t,.24,.07,"sawtooth",!1),n%4===1&&this.tone(l*2,t,.16,.03,"square",!0),n%8===4&&(this.tone(l*4,t,.32,.02,"sine",!0),this.tone(l*3,t+.1,.3,.018,"sine",!0)),n%32===0&&this.tone(l,t,2.2,.045,"sine",!0)}else if(s==="quid"){const o=[130.81,146.83,174.61,196],l=o[Math.floor(n/16)%o.length];if(n%2===0&&this.tone(l*.5,t,.22,.055,"triangle",!1),n%4===0){const c=[2,2.5,3,4];this.tone(l*c[n/4%4],t,.35,.045,"sine",!0)}n%16===8&&this.tone(l*1.5,t,.5,.03,"triangle",!0)}else if(s==="victory"){const o=[261.63,329.63,392,523.25,659.25,783.99],l=o[n%o.length];this.tone(l,t,.7,.07,"triangle",!0),this.tone(l*.5,t,.7,.04,"sine",!0)}}tone(t,e,n,s=.06,a="sine",r=!1){if(!this.ctx)return;const o=this.ctx,l=o.createOscillator(),c=o.createGain();l.type=a,l.frequency.setValueAtTime(t,e),c.gain.setValueAtTime(1e-4,e),c.gain.exponentialRampToValueAtTime(Math.max(2e-4,s),e+.02),c.gain.exponentialRampToValueAtTime(1e-4,e+n),l.connect(c),c.connect(this.musicBus),r&&c.connect(this.delay),l.start(e),l.stop(e+n+.05)}noise(t,e,n,s,a="bandpass",r=.9,o="sfx"){if(!this.ctx)return;const l=this.ctx,c=Math.max(1,Math.floor(l.sampleRate*e)),h=l.createBuffer(1,c,l.sampleRate),d=h.getChannelData(0);for(let _=0;_<c;_++)d[_]=Math.random()*2-1;const u=l.createBufferSource();u.buffer=h;const m=l.createBiquadFilter();m.type=a,m.frequency.value=s,m.Q.value=r;const g=l.createGain();g.gain.setValueAtTime(Math.max(2e-4,n),t),g.gain.exponentialRampToValueAtTime(1e-4,t+e),u.connect(m).connect(g).connect(o==="music"?this.musicBus:this.sfxBus),u.start(t),u.stop(t+e+.02)}sweep(t,e,n,s=.1,a="sawtooth"){if(!this.ctx)return;const r=this.ctx,o=r.currentTime,l=r.createOscillator(),c=r.createGain(),h=r.createBiquadFilter();h.type="lowpass",h.frequency.value=2400,l.type=a,l.frequency.setValueAtTime(t,o),l.frequency.exponentialRampToValueAtTime(Math.max(20,e),o+n),c.gain.setValueAtTime(1e-4,o),c.gain.exponentialRampToValueAtTime(s,o+.03),c.gain.exponentialRampToValueAtTime(1e-4,o+n),l.connect(h).connect(c).connect(this.sfxBus),l.start(o),l.stop(o+n+.02)}sfx(t){var n,s;if(!this.ctx||((s=(n=this.state)==null?void 0:n.settings)==null?void 0:s.sound)===!1)return;const e=this.ctx.currentTime;switch(t){case"click":this.tone(720,e,.08,.04,"sine");break;case"back":this.tone(420,e,.1,.035,"sine");break;case"checkpoint":this.tone(880,e,.22,.05,"sine"),this.tone(1320,e+.08,.35,.045,"sine");break;case"boost":this.sweep(180,1100,.5,.11,"sawtooth"),this.noise(e,.35,.09,1800,"highpass",1.2);break;case"warp":this.sweep(900,90,.7,.13,"square"),this.tone(70,e+.2,.9,.07,"sine");break;case"hit":this.noise(e,.45,.3,180,"lowpass",.8),this.sweep(220,40,.45,.16,"triangle");break;case"whoosh":this.noise(e,.3,.11,900,"bandpass",1.4);break;case"crowd":this.noise(e,1.8,.24,900,"bandpass",.4);break;case"cheer":this.noise(e,2.6,.32,1e3,"bandpass",.35),this.tone(523,e,.4,.05,"square"),this.tone(659,e+.12,.5,.05,"square");break;case"goal":this.sfx("cheer"),this.tone(392,e,.5,.08,"sawtooth"),this.tone(523,e+.18,.6,.08,"sawtooth");break;case"save":this.noise(e,.2,.25,220,"lowpass",.8),this.tone(660,e+.05,.3,.05,"sine"),this.sfx("crowd");break;case"bludger":this.noise(e,.3,.3,160,"lowpass",.7),this.sweep(160,50,.35,.15,"square");break;case"snitch":this.tone(1800,e,.2,.035,"sine"),this.tone(2300,e+.08,.2,.03,"sine"),this.tone(2700,e+.16,.25,.025,"sine");break;case"catch":this.sfx("snitch"),this.tone(1046,e+.1,.8,.08,"triangle"),this.tone(1318,e+.3,1.1,.07,"triangle"),this.noise(e,3,.3,1100,"bandpass",.4);break;case"win":[523.25,659.25,783.99,1046.5].forEach((a,r)=>this.tone(a,e+r*.16,.8,.07,"triangle")),this.noise(e,3.2,.32,1e3,"bandpass",.4);break;case"lose":[392,349.23,311.13,261.63].forEach((a,r)=>this.tone(a,e+r*.22,.9,.05,"sine"));break;case"whistle":this.tone(2100,e,.35,.06,"square"),this.tone(2600,e+.02,.3,.04,"sine");break;default:this.tone(600,e,.1,.03,"sine")}}speak(t){var n,s;if(!this.ctx||((s=(n=this.state)==null?void 0:n.settings)==null?void 0:s.voice)===!1||!("speechSynthesis"in window))return;const e=performance.now();if(!(e-this.lastSpeak<700)){this.lastSpeak=e;try{speechSynthesis.cancel();const a=new SpeechSynthesisUtterance(t.replace(/[—…]/g,","));a.lang="en-GB",a.rate=1.08,a.pitch=.92,a.volume=.55;const r=speechSynthesis.getVoices(),o=r.find(l=>/en-GB/i.test(l.lang))||r.find(l=>/en/i.test(l.lang));o&&(a.voice=o),speechSynthesis.speak(a)}catch{}}}vibrate(t=20){var e,n;if(((n=(e=this.state)==null?void 0:e.settings)==null?void 0:n.haptics)!==!1&&navigator.vibrate)try{navigator.vibrate(t)}catch{}}}const ec={hogwarts:{skyTop:"#2f5f9e",skyBottom:"#cfe2ec",horizon:"#efe8d0",sun:"#fff1c9",fog:"#c3d3da",fogDensity:.00125,ground:"#4d7440",ground2:"#6e9052",rock:"#7b8273",hemi:"#a8c7e6",hemiGround:"#4e5a39",hemiIntensity:1.25,sunColor:"#fff2d2",sunIntensity:2.4,sunDir:new T(.45,.62,.35),groundY:-34,night:!1,cloud:"#ffffff"},worldcup:{skyTop:"#050d26",skyBottom:"#1e3561",horizon:"#5a4f70",sun:"#dce8ff",fog:"#1b2a48",fogDensity:.0014,ground:"#2d3b33",ground2:"#40513e",rock:"#4a4a5a",hemi:"#405d8d",hemiGround:"#172015",hemiIntensity:.85,sunColor:"#bcd5ff",sunIntensity:1.25,sunDir:new T(-.35,.55,.4),groundY:-14,night:!0,cloud:"#36435f"},highlands:{skyTop:"#4c6278",skyBottom:"#a5b4b8",horizon:"#c9c5ae",sun:"#f0e3bd",fog:"#9aa9aa",fogDensity:.00165,ground:"#556b3f",ground2:"#77804d",rock:"#6e7166",hemi:"#96aeb8",hemiGround:"#3d462f",hemiIntensity:.95,sunColor:"#dae2d9",sunIntensity:1.4,sunDir:new T(-.5,.5,.2),groundY:-30,night:!1,cloud:"#aab4ba"},london:{skyTop:"#241a42",skyBottom:"#8e5f74",horizon:"#e1a277",sun:"#ffd9a0",fog:"#6e5e74",fogDensity:.0021,ground:"#2a2b33",ground2:"#43404a",rock:"#4b4550",hemi:"#725e8c",hemiGround:"#231f2c",hemiIntensity:.9,sunColor:"#ffd0a2",sunIntensity:1.2,sunDir:new T(-.6,.3,.35),groundY:-30,night:!1,cloud:"#8b7890",rain:!0},forest:{skyTop:"#03131b",skyBottom:"#0e3437",horizon:"#24544a",sun:"#9fe9cf",fog:"#0a2b2b",fogDensity:.0032,ground:"#142e22",ground2:"#214534",rock:"#2a3831",hemi:"#2d665c",hemiGround:"#0a1511",hemiIntensity:.7,sunColor:"#88c8bd",sunIntensity:.8,sunDir:new T(.3,.55,-.2),groundY:-24,night:!0,cloud:"#183b3a"},alpine:{skyTop:"#06142d",skyBottom:"#1b3e64",horizon:"#4e7a91",sun:"#c9f1ff",fog:"#2f5574",fogDensity:.0021,ground:"#dbe8ee",ground2:"#a9c3d3",rock:"#6d8294",hemi:"#6084a6",hemiGround:"#d5e5ef",hemiIntensity:.95,sunColor:"#c6e9ff",sunIntensity:1.1,sunDir:new T(.35,.48,-.3),groundY:-13,night:!0,cloud:"#54718a",snow:!0},kyoto:{skyTop:"#5c4b84",skyBottom:"#e6a4a0",horizon:"#f9d8bd",sun:"#ffe9c9",fog:"#d9a9a4",fogDensity:.0016,ground:"#425d46",ground2:"#6f7a4e",rock:"#6d6159",hemi:"#d8a8b3",hemiGround:"#32402e",hemiIntensity:1.1,sunColor:"#ffe0bd",sunIntensity:1.75,sunDir:new T(.6,.32,.2),groundY:-30,night:!1,cloud:"#ecc8c2"},cairo:{skyTop:"#3a2450",skyBottom:"#d0895c",horizon:"#f4c183",sun:"#ffe2a3",fog:"#c89572",fogDensity:.0017,ground:"#b58a52",ground2:"#d1a966",rock:"#9a7549",hemi:"#b98b71",hemiGround:"#7e5b35",hemiIntensity:1.1,sunColor:"#ffd79a",sunIntensity:2,sunDir:new T(-.7,.28,.32),groundY:-25,night:!1,cloud:"#d3a58f"}},nc={england:{base:"hogwarts",skyTop:"#2c5d95",skyBottom:"#c6dbe4",sun:"#ffecc4",fog:"#b9cdd5"},france:{base:"kyoto",skyTop:"#3a4479",skyBottom:"#d7b4ba",sun:"#ffe6cf",fog:"#c2aeb7"},japan:{base:"kyoto"},brazil:{base:"hogwarts",skyTop:"#1a5a86",skyBottom:"#c4e0d4",sun:"#fff0b3",fog:"#b4d3ca"},egypt:{base:"cairo"},norway:{base:"alpine",skyTop:"#122747",skyBottom:"#6c8daa",sun:"#d8f0ff",fog:"#60809a"},usa:{base:"worldcup"},australia:{base:"cairo",skyTop:"#264d73",skyBottom:"#d8c093",sun:"#ffe6ad",fog:"#c4b291"}};function Ca(i){return ec[i]||ec.hogwarts}function k0(i){const t=nc[i]||nc.england;return{...Ca(t.base),...t,base:void 0}}let Ui=null;function O0(){if(Ui)return Ui;const i=document.createElement("canvas");i.width=i.height=128;const t=i.getContext("2d"),e=t.createRadialGradient(64,64,0,64,64,64);return e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.25,"rgba(255,255,255,0.8)"),e.addColorStop(.55,"rgba(255,255,255,0.22)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),Ui=new Gc(i),Ui.colorSpace=We,Ui}function Te(i,t=6,e=1){const n=new Cr({map:O0(),color:new St(i),transparent:!0,opacity:e,blending:oi,depthWrite:!1}),s=new zc(n);return s.scale.set(t,t,1),s}function ur(i,t="#f2d27a",e="rgba(10,12,24,0.68)"){const n=document.createElement("canvas");n.width=512,n.height=128;const s=n.getContext("2d");s.fillStyle=e,ic(s,6,20,500,88,20),s.fill(),s.strokeStyle=t,s.lineWidth=3,ic(s,6,20,500,88,20),s.stroke(),s.font="600 58px Georgia, serif",s.fillStyle=t,s.textAlign="center",s.textBaseline="middle",s.fillText(i,256,66);const a=new Gc(n);a.colorSpace=We;const r=new Cr({map:a,transparent:!0,depthWrite:!1}),o=new zc(r);return o.scale.set(11,2.75,1),o}function ic(i,t,e,n,s,a){i.beginPath(),i.moveTo(t+a,e),i.arcTo(t+n,e,t+n,e+s,a),i.arcTo(t+n,e+s,t,e+s,a),i.arcTo(t,e+s,t,e,a),i.arcTo(t,e,t+n,e,a),i.closePath()}function hn(i){let t=i>>>0;return function(){t|=0,t=t+1831565813|0;let e=Math.imul(t^t>>>15,1|t);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function ee(i,t={}){return new Bt({color:i,roughness:.85,metalness:.04,flatShading:!0,...t})}function Dr(i,t,e={}){const n={topColor:{value:new St(t.skyTop)},bottomColor:{value:new St(t.skyBottom)},horizonColor:{value:new St(t.horizon)},sunColor:{value:new St(t.sun)},sunDir:{value:t.sunDir.clone().normalize()}},s=new $e(1200,32,20),a=new wn({side:Ne,depthWrite:!1,fog:!1,uniforms:n,vertexShader:"varying vec3 vPos; void main(){ vPos = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
      uniform vec3 topColor, bottomColor, horizonColor, sunColor; uniform vec3 sunDir; varying vec3 vPos;
      void main(){
        vec3 d = normalize(vPos);
        float h = d.y;
        vec3 col = mix(horizonColor, bottomColor, smoothstep(-0.06, 0.16, h));
        col = mix(col, topColor, smoothstep(0.05, 0.65, h));
        float disk = smoothstep(0.9993, 0.9998, dot(d, normalize(sunDir)));
        float halo = pow(max(dot(d, normalize(sunDir)), 0.0), 24.0);
        col += sunColor * (disk * 1.4 + halo * 0.32);
        vec3 glow = vec3(1.0, 0.72, 0.42) * pow(max(0.0, 1.0 - abs(h) * 5.0), 4.0) * 0.10;
        col += glow;
        gl_FragColor = vec4(col, 1.0);
      }`}),r=new tt(s,a);if(r.frustumCulled=!1,r.renderOrder=-10,i.add(r),i.fog=new Er(t.fog,t.fogDensity),i.background=new St(t.skyBottom),t.night){const o=hn(e.seed||7),l=650,c=new Float32Array(l*3);for(let m=0;m<l;m++){const g=new T(o()*2-1,o()*.9+.08,o()*2-1).normalize().multiplyScalar(1100);c[m*3]=g.x,c[m*3+1]=g.y,c[m*3+2]=g.z}const h=new le;h.setAttribute("position",new be(c,3));const d=new Ms(h,new Zi({color:"#e8f3ff",size:4.2,sizeAttenuation:!1,transparent:!0,opacity:.85,blending:oi,depthWrite:!1}));d.frustumCulled=!1,i.add(d);const u=Te("#cfe7ff",90,.9);u.position.copy(t.sunDir).normalize().multiplyScalar(750),i.add(u)}if(!t.night){const o=Te(t.sun,150,.4);o.position.copy(t.sunDir).normalize().multiplyScalar(850),i.add(o)}return{sky:r,uniforms:n}}function Ur(i,t){const e=new m0(t.hemi,t.hemiGround,t.hemiIntensity);i.add(e);const n=new _0(t.sunColor,t.sunIntensity);n.position.copy(t.sunDir).normalize().multiplyScalar(320),n.castShadow=!0,n.shadow.mapSize.set(1024,1024),n.shadow.camera.near=10,n.shadow.camera.far=700,n.shadow.camera.left=-190,n.shadow.camera.right=190,n.shadow.camera.top=190,n.shadow.camera.bottom=-190,n.shadow.bias=-4e-4,n.shadow.normalBias=.05,i.add(n);const s=new M0(t.hemi,t.night?.26:.16);return i.add(s),{hemi:e,dir:n,fill:s}}function B0(i,t,e,n=1){const s=e.groundY;let a=Math.sin(i*.009+n)*5+Math.cos(t*.011+n*2)*5;return a+=Math.sin((i+t)*.0045+n)*8,a+=Math.cos(i*.023-t*.017)*2.4,s+a}function Nr(i,t,e={}){const a=new zn(1500,1500,78,78);a.rotateX(-Math.PI/2);const r=a.attributes.position,o=new Float32Array(r.count*3),l=new St(t.ground),c=new St(t.ground2),h=new St(t.rock),d=new St,u=hn(e.seed||3);for(let g=0;g<r.count;g++){const _=r.getX(g),p=r.getZ(g),f=B0(_,p,t,e.seed||3);r.setY(g,f);const b=Math.max(0,Math.min(1,Math.abs(_)/700)),x=u()*.45+b*.2;d.copy(l).lerp(c,Math.min(1,x+Math.max(0,f-t.groundY)/24)),f>t.groundY+10&&d.lerp(h,.4),o[g*3]=d.r,o[g*3+1]=d.g,o[g*3+2]=d.b}a.setAttribute("color",new be(o,3)),a.computeVertexNormals();const m=new tt(a,new Bt({vertexColors:!0,roughness:1,metalness:0,flatShading:!0}));return m.receiveShadow=!0,i.add(m),m}function fs(i,t,e,n,s,a,r="#2f6b77"){const o=new Yi(1,48);o.rotateX(-Math.PI/2);const l=new Bt({color:r,roughness:.18,metalness:.55,transparent:!0,opacity:.86}),c=new tt(o,l);return c.position.set(e,t.groundY+1.3,n),c.scale.set(s,1,a),i.add(c),c}function Mn(i,t,e={}){const n=hn(e.seed||11),s=e.count||14,a=ee(t.rock,{roughness:1}),r=ee("#e8f2f7",{roughness:.9});for(let o=0;o<s;o++){const l=n()*Math.PI*2,c=(e.minR||320)+n()*(e.maxR||360),h=90+n()*(e.height||160),d=h*(.55+n()*.35),u=new tt(new Fe(d,h,5+Math.floor(n()*3),1),a);if(u.position.set(Math.cos(l)*c,t.groundY+h*.5-4,Math.sin(l)*c),u.rotation.y=n()*Math.PI,i.add(u),t.ground==="#dbe8ee"||t.snow||e.snowCap){const m=new tt(new Fe(d*.38,h*.38,5),r);m.position.set(u.position.x,u.position.y+h*.31,u.position.z),m.rotation.y=u.rotation.y,i.add(m)}}}function Dn(i,t,e={}){const n=hn(e.seed||21),s=e.count||220,a=new oe(.7,1.2,10,5),r=t.snow?new Fe(4.4,14,6):new Fe(4.8,13,6),o=ee(t.snow?"#5b4c45":"#4a3524",{roughness:1}),l=ee(e.leafColor||(t.snow?"#3f6372":"#274c2e"),{roughness:.95,flatShading:!0}),c=new va(a,o,s),h=new va(r,l,s),d=new qt,u=new Ue;let m=0,g=0;for(;m<s&&g<s*12;){g++;const _=n()*Math.PI*2,p=(e.minR||45)+n()*(e.range||420),f=Math.cos(_)*p,b=Math.sin(_)*p;if(e.avoidCenter!==!1&&p<95)continue;const x=.6+n()*1.5,S=t.groundY+5*x;u.setFromAxisAngle(new T(0,1,0),n()*Math.PI*2),d.compose(new T(f,S,b),u,new T(x,x,x)),c.setMatrixAt(m,d),d.compose(new T(f,S+8.4*x,b),u,new T(x,x,x)),h.setMatrixAt(m,d),m++}return c.count=m,h.count=m,c.castShadow=!1,i.add(c,h),{trunks:c,leaves:h}}function Fr(i,t,e={}){const n=hn(e.seed||31),s=new Bt({color:t.cloud,roughness:1,transparent:!0,opacity:e.opacity||.82,flatShading:!0,depthWrite:!1}),a=e.count||11,r=new ue;for(let o=0;o<a;o++){const l=new ue,c=4+Math.floor(n()*5);for(let u=0;u<c;u++){const m=7+n()*15,g=new tt(new $e(m,6,5),s);g.position.set((n()-.5)*32,(n()-.5)*5,(n()-.5)*20),g.scale.y=.55,l.add(g)}const h=n()*Math.PI*2,d=140+n()*500;l.position.set(Math.cos(h)*d,75+n()*85,Math.sin(h)*d),l.rotation.y=n()*Math.PI,r.add(l)}return i.add(r),r}function nn(i,t="#9effc8",e=140,n={}){const s=hn(n.seed||41),a=new Float32Array(e*3);for(let c=0;c<e;c++){const h=s()*Math.PI*2,d=30+s()*(n.range||260);a[c*3]=Math.cos(h)*d,a[c*3+1]=(n.y||0)+s()*45,a[c*3+2]=Math.sin(h)*d}const r=new le;r.setAttribute("position",new be(a,3));const o=new Zi({color:t,size:n.size||1.3,transparent:!0,opacity:.9,blending:oi,depthWrite:!1,sizeAttenuation:!0}),l=new Ms(r,o);return l.frustumCulled=!1,i.add(l),l}function ds(i,t,e,n,s,a,r="#3b4458"){const o=ee("#8e8a7e",{roughness:.95}),l=ee("#777264",{roughness:1}),c=ee(r,{roughness:.7,metalness:.15}),h=new tt(new oe(n,n*1.08,s,8),o);h.position.set(t,s/2,e),h.castShadow=!0,h.receiveShadow=!0,i.add(h);const d=new tt(new oe(n*1.13,n*1.13,1.4,8),l);d.position.set(t,s-2,e),i.add(d);const u=new tt(new Fe(n*1.42,n*2.6,8),c);u.position.set(t,s+n*1.3,e),u.castShadow=!0,i.add(u);const m=new Bt({color:"#ffcf73",emissive:"#ffb84d",emissiveIntensity:1.8});for(let g=0;g<Math.max(2,Math.floor(s/10));g++){const _=new tt(new re(.9,1.7,.3),m),p=g/5*Math.PI*2;_.position.set(t+Math.cos(p)*(n+.05),7+g*(s-10)/Math.max(2,Math.floor(s/10)),e+Math.sin(p)*(n+.05)),_.lookAt(t,_.position.y,e),i.add(_)}return h}function Zc(i,t=1){const e=new ue,n=ee("#7d7b71",{roughness:1}),s=new tt(new re(52,34,32),n);s.position.set(0,17,0),s.castShadow=!0,s.receiveShadow=!0,e.add(s);const a=new tt(new re(35,24,46),ee("#89867a"));a.position.set(-34,12,8),a.castShadow=!0,e.add(a),ds(e,28,12,8,58,i,"#2f4b62"),ds(e,-28,-16,7,46,i,"#425d4e"),ds(e,5,22,6,40,i,"#3a4d66"),ds(e,-12,24,5,34,i,"#4e3e62"),ds(e,38,-14,5,32,i,"#35485c");const r=ee("#8a877c");for(let c=0;c<5;c++){const h=new tt(new oe(2,2.5,15,6),r);h.position.set(-46-c*11,7.5,-14),e.add(h);const d=new tt(new Ke(4,.75,5,8,Math.PI),r);d.position.set(-46-c*11,13,-14),d.rotation.z=Math.PI,e.add(d)}const o=new tt(new re(58,2.2,6),r);o.position.set(-68,17,-14),e.add(o);const l=new Bt({color:"#ffd078",emissive:"#ffb347",emissiveIntensity:1.6});for(let c=0;c<44;c++){const h=new tt(new re(1.1,1.8,.25),l),d=Math.floor(Math.random()*4),u=6+Math.random()*24;d===0&&h.position.set(-25+Math.random()*50,u,16.1),d===1&&h.position.set(-25+Math.random()*50,u,-16.1),d===2&&h.position.set(26.1,u,-15+Math.random()*30),d===3&&h.position.set(-26.1,u,-15+Math.random()*30),d<2?h.rotation.y=0:h.rotation.y=Math.PI/2,e.add(h)}return e.scale.setScalar(t),e}function z0(i,t=1){const e=new ue,n=ee("#7a3d33",{roughness:.9}),s=ee("#3b2a2c",{roughness:.85}),a=ee("#dab45f",{metalness:.55,roughness:.4});for(let l=0;l<5;l++){const c=28-l*4,h=new tt(new re(c,7,c*.8),n);h.position.y=3.5+l*9,e.add(h);const d=new tt(new Fe(c*.95,5,4),s);d.position.y=8.5+l*9,d.rotation.y=Math.PI/4,e.add(d)}const r=new tt(new oe(.35,.6,12,6),a);r.position.y=51,e.add(r);const o=new tt(new $e(1.2,8,6),a);return o.position.y=57,e.add(o),e.scale.setScalar(t),e}function H0(i,t,e,n,s,a="#b23a3a"){const r=new ue,o=ee(a,{roughness:.8}),l=new oe(.55,.7,10,6),c=new tt(l,o);c.position.set(-4,5,0),r.add(c);const h=new tt(l,o);h.position.set(4,5,0),r.add(h);const d=new tt(new re(11,1,1.4),o);d.position.y=10.4,r.add(d);const u=new tt(new re(9.5,.7,1.2),o);return u.position.y=8.9,r.add(u),r.position.set(t,n,e),r.scale.setScalar(s),i.add(r),r}function Mo(i,t){const e=new ue,n=ee("#c39a5c",{roughness:1}),s=new tt(new Fe(t,t*1.15,4,4),n);s.rotation.y=Math.PI/4,s.position.y=t*.575,s.castShadow=!0,e.add(s);const a=new tt(new Fe(t*.14,t*.14,4),ee("#e8c06a",{metalness:.6,roughness:.3}));return a.rotation.y=Math.PI/4,a.position.y=t*1.09,e.add(a),e}function Qc(i,t={}){const{colors:e=["#9e1b32","#f3e7ce"],accent:n="#e2b954",scale:s=1,hoops:a=!0,crowd:r=1200,seed:o=5,logo:l="WC"}=t,c=new ue;c.scale.setScalar(s);const h=new Yi(1,64);h.rotateX(-Math.PI/2);const d=new tt(h,new Bt({color:"#3d6b3a",roughness:1}));d.scale.set(90,1,55),d.receiveShadow=!0,c.add(d);const u=new tt(new ms(1,1.1,64),new Bt({color:"#6a5533",roughness:1}));u.rotation.x=-Math.PI/2,u.scale.set(91,56,1),u.position.y=.01,c.add(u);const m=new Hc({color:"#efe7cd",transparent:!0,opacity:.7}),g=[];for(let $=0;$<=80;$++){const it=$/80*Math.PI*2;g.push(new T(Math.cos(it)*86,.04,Math.sin(it)*52))}c.add(new Wl(new le().setFromPoints(g),m));const _=[new T(0,.04,-50),new T(0,.04,50)];c.add(new Wl(new le().setFromPoints(_),m));const p=new tt(new ms(14,14.4,48),new On({color:"#efe7cd",transparent:!0,opacity:.45,side:Se}));p.rotation.x=-Math.PI/2,p.position.y=.03,c.add(p);const f=ee("#3c3b43",{roughness:.95,emissive:"#2b2a35",emissiveIntensity:.55}),b=[{off:10,y:3,h:6,d:13},{off:22,y:8.5,h:6,d:13},{off:34,y:14,h:6,d:13}],x=56,S=new va(new re(1,1,1),f,b.length*x),R=new qt,C=new Ue,A=new ge;let L=0;for(const $ of b)for(let it=0;it<x;it++){const nt=it/x*Math.PI*2,xt=95+$.off,pt=61+$.off*.72,Dt=Math.cos(nt)*xt,Ot=Math.sin(nt)*pt;A.set(0,-nt+Math.PI/2,0),C.setFromEuler(A);const At=Math.max(9,Math.PI*2*Math.sqrt((xt*xt+pt*pt)/2)/x*1.08);R.compose(new T(Dt,$.y,Ot),C,new T(At,$.h,$.d)),S.setMatrixAt(L++,R)}S.receiveShadow=!0,c.add(S);const I=hn(o),v=new re(.6,1.1,.6),M=new Bt({roughness:.9}),U=new va(v,M,r),k=[e[0],e[1],n,"#e8e2d2","#5b6c8c","#a24a5c","#4b7a5f"],z=new St;for(let $=0;$<r;$++){const it=Math.floor(I()*b.length),nt=b[it],xt=I()*Math.PI*2,pt=95+nt.off,Dt=61+nt.off*.72,Ot=(I()-.5)*10,At=Math.cos(xt)*(pt+Ot),P=Math.sin(xt)*(Dt+Ot*.7),fe=.75+I()*.55;R.compose(new T(At,nt.y+nt.h/2+.9+I()*.8,P),C.identity(),new T(fe,fe,fe)),U.setMatrixAt($,R),z.set(k[Math.floor(I()*k.length)]),U.setColorAt($,z)}c.add(U);const X=new oe(1,1,1,64,1,!0),O=new tt(X,new Bt({color:"#2e2d33",emissive:"#23222c",emissiveIntensity:.5,roughness:1,side:Se}));O.scale.set(118,5,79),O.position.y=2.5,c.add(O);const Y=ee("#5a5b63",{metalness:.5,roughness:.6}),V=new Bt({color:"#fff2bd",emissive:"#ffe38a",emissiveIntensity:3.2}),J=[[-116,-76],[116,-76],[-116,76],[116,76]];for(const[$,it]of J){const nt=new tt(new oe(1,1.6,56,6),Y);nt.position.set($,28,it),c.add(nt);const xt=new tt(new re(14,5,1.5),V);xt.position.set($,57,it),xt.lookAt(0,30,0),c.add(xt);const pt=Te("#ffe9b0",34,.45);pt.position.set($,57,it),c.add(pt)}for(let $=0;$<10;$++){const it=$/10*Math.PI*2,nt=94,xt=60,pt=Math.cos(it)*nt,Dt=Math.sin(it)*xt,Ot=new tt(new oe(.28,.28,23,5),Y);Ot.position.set(pt,11.5,Dt),c.add(Ot);const At=new tt(new zn(7,11),new Bt({color:$%2?e[0]:e[1],side:Se,roughness:.9,emissive:n,emissiveIntensity:.08}));At.position.set(pt,17,Dt),At.lookAt(0,17,0),At.rotateY(Math.PI/2),c.add(At);const P=new tt(new Yi(1.6,16),new On({color:n,transparent:!0,opacity:.95,side:Se}));P.position.set(pt,17,Dt),P.lookAt(0,17,0),P.translateZ(.08),c.add(P)}const ot=new Bt({color:"#d8ad4f",emissive:"#b47c1e",emissiveIntensity:.8,metalness:.7,roughness:.32}),ft=[];if(a)for(const $ of[-1,1]){const it=$*88;[8.5,13.5,18.5].forEach((nt,xt)=>{const pt=(xt-1)*8,Dt=it+$*4.6,Ot=new tt(new oe(.34,.5,nt+4,6),ot);Ot.position.set(Dt,(nt+4)/2,pt),c.add(Ot);const At=new tt(new re(4.8,.34,.34),ot);At.position.set(it+$*2.3,nt+.1,pt),c.add(At);const P=new tt(new Ke(3.4-xt*.25,.26,8,26),ot);P.position.set(it,nt,pt),P.rotation.y=Math.PI/2,P.castShadow=!1,c.add(P);const fe=Te("#ffd97a",7,.3);fe.position.set(it,nt,pt),c.add(fe),ft.push({side:$,y:nt,x:it,z:pt,ring:P})})}const zt=new Bt({color:"#161b2b",emissive:"#0c1220",roughness:.5}),kt=new tt(new re(34,14,2),zt);kt.position.set(0,25,-86),c.add(kt);const q=new tt(new zn(30,10),new On({color:n,transparent:!0,opacity:.22}));return q.position.set(0,25,-84.9),c.add(q),i.add(c),{group:c,pitch:d,hoopData:ft,crowdMesh:U,colors:e,accent:n}}function vs(i={}){const{robe:t="#8f1d2c",skin:e="#d9a97f",hair:n="#3a251a",livery:s="#e8bd5b",wood:a=["#8b5a34","#caa06b"],scale:r=1}=i,o=new ue,l=new Bt({color:a[0],roughness:.6,metalness:.08}),c=new Bt({color:a[1],roughness:.55}),h=new Bt({color:"#c9a765",roughness:.95}),d=new Bt({color:s,roughness:.35,metalness:.45}),u=new Bt({color:t,roughness:.82}),m=new Bt({color:e,roughness:.85}),g=new Bt({color:n,roughness:.95}),_=new tt(new oe(.09,.13,3.4,8),l);_.rotation.x=Math.PI/2,_.position.z=-.15,o.add(_);const p=new tt(new oe(.14,.09,.8,8),c);p.rotation.x=Math.PI/2,p.position.z=-2.05,o.add(p);const f=new tt(new oe(.15,.15,.7,8),d);f.rotation.x=Math.PI/2,f.position.z=-1.5,o.add(f);for(const V of[-1.05,.1,.7]){const J=new tt(new Ke(.13,.025,4,10),d);J.position.z=V,J.rotation.y=Math.PI/2,J.rotation.x=Math.PI/2,o.add(J)}const b=new tt(new Fe(.38,1.7,10),h);b.rotation.x=-Math.PI/2,b.position.set(0,.02,2.35),o.add(b);const x=new tt(new Fe(.3,1.2,8),new Bt({color:"#b28f53",roughness:1}));x.rotation.x=-Math.PI/2,x.position.set(0,.02,2.05),o.add(x);const S=new tt(new Ke(.28,.05,4,10),d);S.position.z=1.55,S.rotation.x=Math.PI/2,o.add(S);const R=new ue;R.position.y=.2;const C=new tt(new oe(.3,.42,1.15,8),u);C.rotation.x=.55,C.position.set(0,.7,.18),C.castShadow=!0,R.add(C);const A=new tt(new Fe(.55,1.9,7,1,!0),u);A.rotation.x=-1,A.position.set(0,.38,.95),R.add(A);const L=new tt(new $e(.27,10,8),m);L.position.set(0,1.38,-.25),L.castShadow=!0,R.add(L);const I=new tt(new $e(.285,10,8,0,Math.PI*2,0,Math.PI*.62),g);I.position.copy(L.position),I.position.y+=.02,I.rotation.x=-.2,R.add(I);const v=new tt(new Ke(.23,.055,4,12),d);v.position.set(0,1.15,-.2),v.rotation.x=Math.PI/2+.18,R.add(v);const M=new tt(new re(.16,.06,.8),d);M.position.set(.18,1.12,.25),M.rotation.x=.3,M.rotation.z=-.2,R.add(M);const U=u,k=new tt(new oe(.075,.09,.75,6),U);k.position.set(-.28,.78,-.55),k.rotation.x=1.12,k.rotation.z=.3,R.add(k);const z=k.clone();z.position.x=.28,z.rotation.z=-.3,R.add(z);const X=m,O=new tt(new $e(.09,6,5),X);O.position.set(-.2,.42,-.95),R.add(O);const Y=O.clone();return Y.position.x=.2,R.add(Y),o.add(R),o.userData={robeTail:A,scarfTail:M,handle:_,bristle:b,rider:R},o.scale.setScalar(r),o}function G0(){const i=new ue,t=new tt(new $e(.55,14,12),new Bt({color:"#9f2f26",roughness:.55,metalness:.08}));t.castShadow=!0,i.add(t);const e=new tt(new Ke(.56,.035,4,18),new Bt({color:"#e0bf8a",roughness:.7}));e.rotation.x=Math.PI/2,i.add(e);const n=e.clone();return n.rotation.set(0,Math.PI/2,0),i.add(n),i.userData.ball=t,i}function sc(){const i=new ue,t=new Bt({color:"#2a2b30",roughness:.45,metalness:.65}),e=new tt(new $e(.52,12,10),t);e.castShadow=!0,i.add(e);for(let s=0;s<8;s++){const a=new tt(new Fe(.14,.35,4),t),r=s/8*Math.PI*2;a.position.set(Math.cos(r)*.5,Math.sin(r*2.1)*.4,Math.sin(r)*.5),a.lookAt(0,0,0),a.rotateX(Math.PI/2),i.add(a)}const n=Te("#8e6aff",2.6,.4);return i.add(n),i}function Jc(){const i=new ue,t=new Bt({color:"#e8c25a",emissive:"#c79a2e",emissiveIntensity:1.5,metalness:.8,roughness:.25}),e=new tt(new $e(.26,10,8),t);i.add(e);const n=new Bt({color:"#f6e7bd",transparent:!0,opacity:.85,side:Se,emissive:"#e8d28a",emissiveIntensity:.6,roughness:.4}),s=new tt(new zn(1.1,.38),n);s.position.set(.55,.15,0),s.rotation.z=-.3;const a=s.clone();a.position.x=-.55,a.rotation.z=.3,i.add(s,a);const r=Te("#ffe08a",4.5,.8);return i.add(r),i.userData={wings:[s,a],glow:r},i}function th(i,t="#f2cf72"){const e=new tt(new ms(1.25,1.5,32),new On({color:t,transparent:!0,opacity:.8,side:Se,depthWrite:!1}));e.rotation.x=-Math.PI/2,e.position.y=-.8,i.add(e);const n=Te(t,5,.35);return n.position.y=.2,i.add(n),{ring:e,glow:n}}class eh{constructor(t,e="clear",n=Ca("hogwarts")){this.scene=t,this.type=e,this.theme=n,this.group=new ue,this.group.frustumCulled=!1,t.add(this.group),this.points=null,this.vel=[],this.wind=new T(.9,0,.3),this.flash=0,this.time=0,this.build(e)}build(t){if(this.points&&(this.group.remove(this.points),this.points.geometry.dispose(),this.points.material.dispose(),this.points=null),this.type=t,t==="clear")return;const e=t==="rain"||t==="storm",n=t==="storm"?900:700,s=new Float32Array(n*3);this.vel=[];for(let o=0;o<n;o++)s[o*3]=(Math.random()-.5)*140,s[o*3+1]=(Math.random()-.2)*90,s[o*3+2]=(Math.random()-.5)*140,this.vel.push({y:e?34+Math.random()*20:1.1+Math.random()*2.2,x:(Math.random()-.5)*2});const a=new le;a.setAttribute("position",new be(s,3));const r=new Zi({color:e?"#bcd8ea":"#ffffff",size:e?.5:.85,transparent:!0,opacity:e?.55:.85,depthWrite:!1,blending:e?ai:oi,sizeAttenuation:!0});this.points=new Ms(a,r),this.points.frustumCulled=!1,this.group.add(this.points),this.count=n}setType(t,e){this.build(t),e&&(this.theme=e)}update(t,e){if(!this.points)return;this.time+=t;const n=this.type==="rain"||this.type==="storm";this.group.position.set(e.position.x,e.position.y,e.position.z);const s=this.points.geometry.attributes.position,a=s.array,r=(this.type==="storm"?12:2.4)*t;for(let o=0;o<this.count;o++)a[o*3+1]-=this.vel[o].y*t,a[o*3]+=this.vel[o].x*t+r,n||(a[o*3+2]+=Math.sin(this.time*.8+o)*.5*t),a[o*3+1]<-38&&(a[o*3+1]=52,a[o*3]=(Math.random()-.5)*140,a[o*3+2]=(Math.random()-.5)*140),a[o*3]>72&&(a[o*3]=-72),a[o*3]<-72&&(a[o*3]=72);s.needsUpdate=!0,this.type==="storm"&&(this.flash=Math.max(0,this.flash-t*2.4),Math.random()<t*.14&&(this.flash=1))}}function V0(i,t,e){var b,x;const n=i.points,s=new T(...n[t]),a=n.length,r=new T(...n[(t-1+a)%a]),l=new T(...n[(t+1)%a]).clone().sub(r).normalize(),c=(b=i.warp)!=null&&b.includes(t)?"warp":(x=i.boost)!=null&&x.includes(t)?"boost":"normal",h=c==="warp"?"#b581ff":c==="boost"?"#ffd166":"#6fe3ff",d=new ue;d.position.copy(s),d.quaternion.setFromUnitVectors(new T(0,0,1),l);const u=new Bt({color:c==="warp"?"#5d2f88":"#1d5a6b",emissive:h,emissiveIntensity:1.3,metalness:.55,roughness:.3}),m=c==="warp"?8.4:7.6,g=new tt(new Ke(m,.38,8,40),u);g.castShadow=!1,d.add(g);const _=new tt(new Ke(m+.7,.1,4,40),new On({color:h,transparent:!0,opacity:.55}));d.add(_);const p=Te(h,22,.35);d.add(p);const f=new tt(new Yi(m-.2,32),new On({color:h,transparent:!0,opacity:.035,side:Se,depthWrite:!1}));d.add(f);for(const S of[-1,1]){const R=new tt(new re(.5,2.8,1.2),u);R.position.set(S*(m+.6),0,0),d.add(R)}if(c==="warp"){const S=ur("WARP","#d7b9ff");S.position.set(0,m+3,0),S.scale.set(6.5,1.65,1),d.add(S),d.add(Te("#a969ff",18,.4))}else if(c==="boost"){const S=ur("BOOST","#ffe6a6");S.position.set(0,m+3,0),S.scale.set(6.8,1.7,1),d.add(S)}return{group:d,ring:g,ring2:_,inner:f,glow:p,mod:c,color:h,radius:m,pos:s,index:t}}function nh(i,t="high"){const e=Ca(i.theme),n=new Ar;Dr(n,e,{seed:i.points.length*13+3});const s=Ur(n,e);if(t!=="low"&&(s.dir.castShadow=!0),Nr(n,e,{seed:i.id.length*7+2}),Fr(n,e,{count:e.night?7:11,seed:i.id.length*3+1}),new T(0,e.groundY,0),i.theme==="hogwarts"){Mn(n,e,{count:12,minR:360,maxR:380,height:130}),fs(n,e,0,0,280,190);const I=Zc(e,1.35);I.position.set(-10,e.groundY+12,-8),n.add(I),Dn(n,e,{count:220,minR:120,range:420,seed:9});const v=nn(n,"#ffd894",90,{range:160,y:e.groundY+80,seed:12});n.userData.fireflies=v}else if(i.theme==="worldcup")Qc(n,{colors:["#6b2440","#d9c58f"],accent:"#f0c75a",scale:1.05,crowd:1300,seed:14}).group.position.set(0,e.groundY+4,0),Mn(n,e,{count:10,minR:430,maxR:200,height:140}),Dn(n,e,{count:80,minR:320,range:300,seed:17}),nn(n,"#ffe6a8",90,{range:300,y:10,seed:19});else if(i.theme==="highlands"){Mn(n,e,{count:20,minR:320,maxR:300,height:210,snowCap:!0}),fs(n,e,40,-20,320,220,"#375d64"),Dn(n,e,{count:180,minR:130,range:400,seed:23});const I=ee("#6f7468",{roughness:1});for(let v=0;v<13;v++){const M=v/13*Math.PI*2,U=new tt(new re(4+Math.random()*2,10+Math.random()*9,3.5),I);U.position.set(Math.cos(M)*72,e.groundY+7,Math.sin(M)*72),U.rotation.y=M+Math.random()*.4,U.rotation.z=(Math.random()-.5)*.12,U.castShadow=!0,n.add(U)}nn(n,"#b4e6c0",60,{range:220,y:e.groundY+25,seed:27})}else if(i.theme==="london"){const I=hn(33),v=ee("#3b3947",{roughness:.9}),M=ee("#554b57",{roughness:.9}),U=new Bt({color:"#ffd27c",emissive:"#ffb84a",emissiveIntensity:2.2});for(let k=0;k<46;k++){const z=I()*Math.PI*2,X=70+I()*300,O=22+I()*62,Y=9+I()*18,V=9+I()*18,J=new tt(new re(Y,O,V),I()>.45?v:M);J.position.set(Math.cos(z)*X,e.groundY+O/2+2,Math.sin(z)*X),J.rotation.y=I()*Math.PI,J.castShadow=!0,n.add(J);const ot=1+Math.floor(I()*3);for(let kt=0;kt<ot;kt++){const q=new tt(new re(1.6,4+I()*3,1.6),v);q.position.set(J.position.x+(I()-.5)*Y*.6,e.groundY+O+2.5,J.position.z+(I()-.5)*V*.6),n.add(q)}const ft=Math.floor(Y/4),zt=Math.floor(O/6);for(let kt=0;kt<ft;kt++)for(let q=0;q<zt;q++){if(I()>.55)continue;const $=new tt(new re(.9,1.4,.2),U);$.position.set(J.position.x-Y/2+2.4+kt*4,e.groundY+5+q*6,J.position.z+V/2+.1),$.rotation.y=J.rotation.y;const it=$.position.x-J.position.x,nt=$.position.z-J.position.z;$.position.x=J.position.x+it*Math.cos(J.rotation.y)-nt*Math.sin(J.rotation.y),$.position.z=J.position.z+it*Math.sin(J.rotation.y)+nt*Math.cos(J.rotation.y),n.add($)}}fs(n,e,0,-20,380,90,"#2a3346"),nn(n,"#ffcf85",80,{range:220,y:e.groundY+50,seed:39})}else if(i.theme==="forest"){Dn(n,e,{count:330,minR:55,range:420,seed:43,leafColor:"#1b3c2b"}),Mn(n,e,{count:8,minR:430,maxR:120,height:110});const I=new tt(new oe(8,16,120,9),ee("#3a2a1e",{roughness:1}));I.position.set(0,e.groundY+60,0),n.add(I);for(let v=0;v<5;v++){const M=new tt(new $e(24+v*6,8,6),ee("#20472f",{roughness:1}));M.position.set(Math.cos(v*1.4)*18,e.groundY+110+v*7,Math.sin(v*1.4)*18),M.scale.y=.6,n.add(M)}for(let v=0;v<26;v++){const M=Math.random()*Math.PI*2,U=60+Math.random()*180,k=new Bt({color:"#2a5f6d",emissive:"#58e0d0",emissiveIntensity:1.5,roughness:.7}),z=new tt(new oe(.25,.5,2.2,5),ee("#d8e7d0")),X=new tt(new $e(1.2,7,5,0,Math.PI*2,0,Math.PI/2),k);z.position.set(Math.cos(M)*U,e.groundY+1,Math.sin(M)*U),X.position.copy(z.position).y+=2.1,n.add(z,X)}nn(n,"#7cffcf",220,{range:300,y:e.groundY+10,seed:47,size:1.6})}else if(i.theme==="alpine")Mn(n,e,{count:26,minR:260,maxR:340,height:260,snowCap:!0}),fs(n,e,0,0,300,220,"#7fb7c9"),Dn(n,e,{count:150,minR:150,range:380,seed:53}),nn(n,"#b9f4ff",110,{range:280,y:e.groundY+50,seed:57});else if(i.theme==="kyoto"){const I=z0(e,1.15);I.position.set(0,e.groundY+8,0),n.add(I);for(let M=0;M<7;M++)H0(n,-100+M*34,-70+M*12,e.groundY+2,1.3);Mn(n,e,{count:9,minR:380,maxR:220,height:150}),Dn(n,e,{count:170,minR:110,range:360,seed:61,leafColor:"#7a4f5e"});const v=new Bt({color:"#ffb55d",emissive:"#ff9d3c",emissiveIntensity:2.2});for(let M=0;M<55;M++){const U=Math.random()*Math.PI*2,k=40+Math.random()*240,z=new tt(new oe(.4,.5,1.2,6),v);z.position.set(Math.cos(U)*k,e.groundY+25+Math.random()*70,Math.sin(U)*k),n.add(z)}nn(n,"#ffd1a1",120,{range:260,y:e.groundY+30,seed:67})}else if(i.theme==="cairo"){const I=Mo(e,110);I.position.set(-10,e.groundY+2,-10),n.add(I);const v=Mo(e,70);v.position.set(150,e.groundY+2,90),n.add(v);const M=Mo(e,50);M.position.set(-180,e.groundY+2,120),n.add(M),Mn(n,e,{count:8,minR:460,maxR:180,height:80});const U=ee("#c8a266",{roughness:.8});for(let k=0;k<8;k++){const z=k/8*Math.PI*2,X=100,O=new tt(new oe(1.5,2.4,24,4),U);O.position.set(Math.cos(z)*X,e.groundY+13,Math.sin(z)*X),O.rotation.y=Math.PI/4,n.add(O)}Dn(n,e,{count:60,minR:250,range:300,seed:71,leafColor:"#7c6b3f"}),nn(n,"#ffdb93",80,{range:280,y:e.groundY+30,seed:73})}nn(n,e.night?"#9ec9ff":"#ffe9bd",45,{range:420,y:60,seed:77,size:.9});const a=i.points.map(I=>new T(...I)),r=new p0(a,!0,"catmullrom",.28),o=i.points.map((I,v)=>V0(i,v));for(const I of o)n.add(I.group);const l=o[0],c=new ue;c.position.copy(l.group.position),c.quaternion.copy(l.group.quaternion);const h=new Bt({color:"#d9b35c",metalness:.6,roughness:.35,emissive:"#8a5e18",emissiveIntensity:.35});for(const I of[-1,1]){const v=new tt(new oe(.8,1.1,25,6),h);v.position.set(I*12,5,0),c.add(v)}const d=new tt(new re(26,2.4,1.6),h);d.position.y=18,c.add(d);const u=ur("START · FINISH","#ffe5a0","rgba(30,16,20,0.8)");u.position.set(0,21.5,0),u.scale.set(18,4.5,1),c.add(u),n.add(c);const m=r.getSpacedPoints(240),g=new le().setFromPoints(m),_=new Ms(g,new Zi({color:"#ffe6a8",size:.75,transparent:!0,opacity:.42,blending:oi,depthWrite:!1}));n.add(_);const p=[];for(let I=0;I<(i.tunnel?1:0);I++){const v=i.tunnel[0]%i.points.length,M=(i.tunnel[1]??v+1)%i.points.length,U=a[v],k=a[M],z=U.clone().add(k).multiplyScalar(.5),X=U.distanceTo(k)+12,O=k.clone().sub(U).normalize(),Y=new ue,V=new tt(new oe(15,15,X,20,1,!0),new Bt({color:i.theme==="forest"?"#233b2d":i.theme==="kyoto"?"#5a3240":"#4a4d57",roughness:.95,side:Se,transparent:!0,opacity:.82}));V.rotation.x=Math.PI/2,Y.add(V);const J=new Bt({color:"#807f7c",emissive:i.theme==="kyoto"?"#ff9b6b":"#66d9ff",emissiveIntensity:.5,roughness:.7});for(let ot=0;ot<5;ot++){const ft=new tt(new Ke(15,.45,6,20),J);ft.position.z=-X/2+3+ot/4*(X-6),Y.add(ft)}Y.position.copy(z),Y.quaternion.setFromUnitVectors(new T(0,0,1),O),n.add(Y),p.push(Y)}const f=hn(i.id.length*19+5),b=[],x=ee(i.theme==="forest"?"#3c3327":e.rock,{roughness:1});for(let I=0;I<13;I++){const v=Math.floor(f()*o.length),M=o[v],U=o[(v+1)%o.length],k=.35+f()*.35,z=M.pos.clone().lerp(U.pos,k),X=new T().subVectors(U.pos,M.pos).normalize().cross(new T(0,1,0)).normalize(),O=(f()>.5?1:-1)*(2.2+f()*6.5);z.addScaledVector(X,O),z.y+=(f()-.5)*8;const V=f()>.4?new Pr(1.8+f()*1.6,0):new Lr(1.4+f()*1.2,0),J=new tt(V,x);J.position.copy(z),J.rotation.set(f()*3,f()*3,f()*3),J.castShadow=!0,n.add(J);const ot=Te("#ff8066",5,.26);ot.position.copy(z),n.add(ot),b.push({mesh:J,pos:z,radius:3.4,warn:ot,baseY:z.y,phase:f()*6})}const S=[],R=new Bt({color:"#d9a73d",emissive:"#ffcf5a",emissiveIntensity:1.5,metalness:.5,roughness:.3});for(const I of i.boost||[]){const v=o[I%o.length],M=v.pos.clone(),U=new tt(new Ke(3.5,.22,6,24),R);U.position.copy(M),U.quaternion.copy(v.group.quaternion),n.add(U);const k=Te("#ffd873",12,.35);k.position.copy(M),n.add(k),S.push({mesh:U,pos:M,phase:f()*6})}const C=new eh(n,i.weather,e),A=n.children.find(I=>I.isGroup&&I.children.length>8&&I.children[0].isGroup),L={scene:n,theme:e,gates:o,curve:r,obstacles:b,pads:S,tunnels:p,weather:C,lights:s,track:i,time:0,arch:c,guide:_,pathPts:a};return L.update=(I,v)=>{if(L.time+=I,C.update(I,v),s.dir){const M=C.flash||0;s.dir.intensity=e.sunIntensity*(1+M*2.2),M>.5?n.fog.color.setHex(9415128):n.fog.color.set(e.fog)}for(const M of b)M.mesh.rotation.y+=I*.4,M.mesh.rotation.x+=I*.15,M.mesh.position.y=M.baseY+Math.sin(L.time*.8+M.phase)*1.1,M.pos.copy(M.mesh.position),M.warn.position.copy(M.mesh.position),M.warn.material.opacity=.14+Math.sin(L.time*3+M.phase)*.08;for(const M of S)M.mesh.rotation.z+=I*1.2,M.mesh.material.emissiveIntensity=1.2+Math.sin(L.time*4+M.phase)*.5;for(const M of o)M.ring.rotation.z+=I*.15,M.ring2.rotation.z-=I*.35;A&&(A.rotation.y+=I*.004)},L}function W0(i,t,e={}){const n=k0(i.id);(t==null?void 0:t.id)==="norway"&&(n.snow=!0);const s=new Ar;Dr(s,n,{seed:i.name.length*5+4});const a=Ur(s,n);Nr(s,n,{seed:i.name.length*9+1}),Mn(s,n,{count:12,minR:400,maxR:250,height:170,snowCap:n.snow}),Fr(s,n,{count:8,seed:i.name.length+5});const r=Qc(s,{colors:i.colors,accent:i.accent,crowd:1400,seed:i.name.length*7});r.group.position.set(0,0,0);const o=new Kl("#ffe6b8",1900,300,2);o.position.set(-78,46,0),s.add(o);const l=new Kl("#ffe6b8",1900,300,2);l.position.set(78,46,0),s.add(l);const c=hn(i.name.length*13+7);for(let g=0;g<24;g++){const _=c()*Math.PI*2,p=170+c()*150,f=new tt(new Fe(7+c()*7,10+c()*8,4),new Bt({color:[i.colors[0],i.colors[1],i.accent,"#d8d0ba"][Math.floor(c()*4)],roughness:.95}));f.position.set(Math.cos(_)*p,5,Math.sin(_)*p),f.rotation.y=c()*Math.PI,s.add(f)}nn(s,i.accent,90,{range:280,y:12,seed:79,size:1.1});const h=n.snow?"snow":n.rain?"rain":"clear",d=new eh(s,h,n),u=$0(s),m={scene:s,theme:n,stadium:r,weather:d,lights:a,confetti:u,time:0,hoops:r.hoopData};return m.update=(g,_)=>{m.time+=g,d.update(g,_),u.update(g),r.crowdMesh.rotation.y=Math.sin(m.time*.2)*.002},m}function $0(i){const e=new le,n=new Float32Array(450*3),s=new Float32Array(450*3),a=new St;for(let c=0;c<450;c++)n[c*3]=(Math.random()-.5)*180,n[c*3+1]=20+Math.random()*60,n[c*3+2]=(Math.random()-.5)*120,a.setHSL(Math.random(),.8,.6),s[c*3]=a.r,s[c*3+1]=a.g,s[c*3+2]=a.b;e.setAttribute("position",new be(n,3)),e.setAttribute("color",new be(s,3));const r=new Zi({size:1.1,vertexColors:!0,transparent:!0,opacity:0,depthWrite:!1}),o=new Ms(e,r);i.add(o);let l=0;return{points:o,burst(){l=1,r.opacity=.95;const c=e.attributes.position.array;for(let h=0;h<450;h++)c[h*3+1]=20+Math.random()*50;e.attributes.position.needsUpdate=!0},update(c){if(l<=0)return;l-=c*.08,r.opacity=Math.max(0,l);const h=e.attributes.position.array;for(let d=0;d<450;d++)h[d*3+1]-=c*(4+d%7),h[d*3]+=Math.sin(d+l*5)*c*1.2,h[d*3+1]<0&&(h[d*3+1]=70);e.attributes.position.needsUpdate=!0}}}function q0(i){const t={...Ca("hogwarts"),skyTop:"#0a1732",skyBottom:"#273a5e",horizon:"#47416c",sun:"#cfdcff",fog:"#1d2b45",fogDensity:.0015,hemi:"#415e86",hemiGround:"#18231c",hemiIntensity:.7,sunColor:"#b3c8ec",sunIntensity:1,sunDir:new T(.4,.45,-.45),night:!0,cloud:"#2b3953",ground:"#2a3324",ground2:"#3b4630"};Dr(i,t,{seed:11});const e=Ur(i,t);Nr(i,t,{seed:6}),fs(i,t,30,20,420,260,"#1d3a4c");const n=Zc(t,1.55);n.position.set(-10,t.groundY+22,10),i.add(n),Dn(i,t,{count:170,minR:140,range:420,seed:10}),Mn(i,t,{count:15,minR:420,maxR:350,height:190,snowCap:!0}),Fr(i,t,{count:9,seed:13});const s=nn(i,"#ffdd9a",150,{range:260,y:-10,seed:15,size:1.5}),a=Jc();a.scale.setScalar(1.4),i.add(a);const r=vs({robe:"#7d1c2b",skin:"#e0b48b",hair:"#4b2d1a",livery:"#e3bd63",wood:["#4a2f1d","#a97a46"]});r.scale.setScalar(1.9),i.add(r);const o=new Re(52,1,.1,1500);o.position.set(150,66,230),o.lookAt(0,30,0);const l=new ue,c=new Bt({color:"#fff0c8",emissive:"#ffcf76",emissiveIntensity:2.6});for(let u=0;u<26;u++){const m=Math.random()*Math.PI*2,g=40+Math.random()*190,_=new tt(new oe(.12,.16,1.4,5),c);_.position.set(Math.cos(m)*g,t.groundY+65+Math.random()*55,Math.sin(m)*g),_.userData.phase=Math.random()*6,l.add(_)}i.add(l);const h=new T;return{scene:i,camera:o,update:(u,m)=>{const g=u*.045+2.2;o.position.set(Math.cos(g)*260,82+Math.sin(u*.14)*9,Math.sin(g)*260),o.lookAt(-10,35,10);const _=u*.9;a.position.set(Math.cos(_)*60,48+Math.sin(u*2.3)*8,Math.sin(_)*60),a.rotation.y+=m*3;const p=a.userData.wings;p[0].rotation.y=Math.sin(u*22)*.7,p[1].rotation.y=-Math.sin(u*22)*.7;const f=u*.28;r.position.set(Math.cos(f)*130,54+Math.sin(u*.8)*6,Math.sin(f)*130),h.set(-Math.sin(f),0,Math.cos(f)),r.lookAt(r.position.clone().add(h)),r.rotation.z=.2,s.rotation.y+=m*.02,l.children.forEach((b,x)=>{b.position.y+=Math.sin(u*.8+b.userData.phase)*m*.25}),e.dir.intensity=t.sunIntensity+Math.sin(u*.3)*.1},theme:t,snitch:a,flyer:r}}function ea(i){var t;i&&(i.traverse(e=>{var n,s,a;if(e.geometry&&e.geometry.dispose(),e.material){const r=Array.isArray(e.material)?e.material:[e.material];for(const o of r)o.map&&o.map!==Ui&&((s=(n=o.map).dispose)==null||s.call(n)),(a=o.dispose)==null||a.call(o)}}),(t=i.clear)==null||t.call(i))}const In=(i,t,e)=>Math.max(t,Math.min(e,i)),Li=(i,t,e)=>i+(t-i)*e;function X0(i,t){let e=i-t;for(;e>Math.PI;)e-=Math.PI*2;for(;e<-Math.PI;)e+=Math.PI*2;return e}class Y0{constructor(t,e){this.game=t,this.cfg=e,this.track=e.track,this.mode=e.mode||"quick",this.difficulty=Ye.find(d=>d.id===(e.difficulty||"pro"))||Ye[1],this.state=t.state,this.N=this.track.points.length,this.laps=e.laps||(this.mode==="trial"||this.mode==="qualify"?1:this.track.laps),this.world=nh(this.track,this.state.settings.quality),this.scene=this.world.scene,this.camera=new Re(62,t.aspect,.15,2e3),this.camera.position.set(0,80,120),this.game.renderer.shadowMap.enabled=this.state.settings.quality!=="low",this.elapsed=0,this.phase="intro",this.introTime=0,this.countdown=4.6,this.finished=!1,this.endTimer=0,this.resultSent=!1,this.passed=0,this.lapStart=0,this.lapTimes=[],this.bestLap=null,this.boostTime=0,this.rank=1,this.shake=0,this.wobble=0,this.collisionCooldown=0,this.time=0,this.hudTimer=0,this.weatherChangeTimer=34+Math.random()*25,this.weatherType=this.track.weather,this.messageTimer=0,this.lastCommentary=-99,this.lapMessageShown=0,this.boostWasHeld=!1,this.padCooldown=0,this.goTimer=0;const n=Di(this.state,this.cfg.broomId);this.stats=n,this.speedBase=37.5+n.speed*.165,this.accel=10+n.accel*.12,this.turnRate=.82+n.handling*.0076,this.boostPower=1.16+n.boost*.0021;const s=this.world.gates[0],a=this.gateTangent(0),r=s.pos.clone().addScaledVector(a,-8);this.player={pos:r,yaw:Math.atan2(-a.x,-a.z),pitch:Math.asin(In(a.y,-.7,.7)),bank:0,speed:0,boost:100,nextGate:0,passed:0,wobble:0,lastPad:-1,trailPos:r.clone()};const o=yn(this.cfg.broomId),l=t.state.brooms.livery&&this.game.liveryColor()||o.accent;this.playerModel=vs({robe:this.state.profile.robe,skin:this.state.profile.skin,hair:this.state.profile.hair,livery:l,wood:o.colors,scale:1.12}),this.playerModel.position.copy(this.player.pos),this.scene.add(this.playerModel),this.marker=th(this.playerModel,"#ffd873"),this.trail=Te(l,8,.18),this.trail.position.copy(this.player.pos),this.scene.add(this.trail),this.ais=[];const c=this.mode==="trial"?0:this.mode==="practice"?3:5,h=["#2b4f8c","#2f6b48","#6f2c5f","#8a5a24","#364326","#5c2b2b"];for(let d=0;d<c;d++){const u=In(this.difficulty.ai+(Math.random()-.5)*.12,.7,1.2),m=vs({robe:h[d%h.length],skin:["#e0b48b","#b98460","#8a5b3f","#f0c9a6"][d%4],hair:["#2d1d14","#6d4a2d","#a8793f","#1c1713"][d%4],livery:["#e3bd63","#7dd8f0","#c0392b","#8fd8a5","#c7a8ff"][d%5],wood:["#4a2f1d","#3f3a45","#6b4a2c","#565a63"][d%4],scale:1.08});m.position.copy(this.world.gates[0].pos),this.scene.add(m),this.ais.push({id:d,name:Ql[(d+(this.track.id.length||0))%Ql.length],u:0,lap:1,speed:(41+u*7+Math.random()*2.4)*(this.mode==="practice"?.86:1),model:m,finished:!1,finishTime:null,phase:Math.random()*6,lane:(d-(c-1)/2)*2.2,baseSpeed:41+u*7,skill:u,wobble:.2+Math.random()*.3})}this.curveLen=this.world.curve.getLength(),this.beacon=Te("#ffe08a",34,.4),this.scene.add(this.beacon),this.audio=t.audio,this.audio.setMode("race"),this.ui=t.ui,this.ui.showRaceHUD(this),this.game.input.bindRace(),this.updateGateHighlight(),this.ui.raceMessage("Follow the golden hoops","info"),this.audio.sfx("crowd"),this.audio.speak("Riders, mount your brooms.")}gateTangent(t){const e=this.track.points,n=this.N,s=new T(...e[(t-1+n)%n]);return new T(...e[(t+1)%n]).sub(s).normalize()}say(t,e="info",n=!1){this.ui.raceMessage(t,e),n&&this.audio.speak(t)}commentary(t,e=!0){const n=$c[t];if(!n||this.elapsed-this.lastCommentary<5)return;this.lastCommentary=this.elapsed;const s=n[Math.floor(Math.random()*n.length)];this.say(s,t==="hit"?"danger":"gold",e)}updateGateHighlight(){const t=this.world.gates[this.player.nextGate%this.N];this.world.gates.forEach((e,n)=>{const s=e===t&&!this.finished;e.ring.material.emissiveIntensity=s?2.6:.7+(e.mod!=="normal"?.5:0),e.ring2.material.opacity=s?.95:.4,e.inner.material.opacity=s?.13:.035,e.glow.material.opacity=s?.65:.22,e.group.scale.setScalar(1),e.active=s}),t&&(this.beacon.position.copy(t.pos),this.beacon.position.y+=13,this.beacon.material.color.set(t.color))}passGate(){const t=this.world.gates[this.player.nextGate%this.N],e=t.mod;let n=1;const s=e==="boost";if(e==="warp"?(n=2,this.player.wobble=2.4,this.player.speed*=.86,this.player.boost=Math.max(0,this.player.boost-18),this.shake=.9,this.audio.sfx("warp"),this.commentary("warp")):(this.player.boost=Math.min(100,this.player.boost+(s?32:10)),this.player.speed+=s?8:2.4,this.audio.sfx("checkpoint"),s&&(this.audio.sfx("boost"),this.say("Boost hoop! Broom magic surges","gold"))),t.ring.material.emissiveIntensity=5,this.shake=Math.max(this.shake,.12),this.audio.vibrate(s?22:8),this.player.passed=Math.min(this.laps*this.N,this.player.passed+n),this.player.nextGate=this.player.passed%this.N,this.player.passed>=this.laps*this.N){this.finishRace();return}const r=Math.floor(this.player.passed/this.N)+1;if(this.player.nextGate===0&&this.player.passed>0&&this.lapMessageShown<r){const o=(this.elapsed-this.lapStart)*1e3;this.lapTimes.push(o),(!this.bestLap||o<this.bestLap)&&(this.bestLap=o),this.lapStart=this.elapsed,this.lapMessageShown=r,this.player.passed<this.laps*this.N&&(this.say(r===this.laps?"FINAL LAP — everything to fly for!":`Lap ${r} of ${this.laps}`,"gold",!0),this.audio.sfx("whistle"),this.commentary("lap"))}this.updateGateHighlight()}finishRace(){if(this.finished)return;this.finished=!0,this.phase="finished",this.finishTime=this.elapsed,this.lapTimes.length===0&&this.elapsed>0&&(this.lapTimes.push(this.elapsed*1e3),this.bestLap=this.elapsed*1e3),this.rank=this.currentRank(!0),this.endTimer=2.4,this.goTimer=0,this.ui.raceCountdown("",""),this.audio.sfx(this.rank<=3?"win":"lose"),this.commentary(this.rank<=3?"win":"lose"),this.ui.raceFinishFlash(this.rank);const t=this.world.gates[this.player.nextGate%this.N]||this.world.gates[0];t&&(this.beacon.position.copy(t.pos),this.beacon.visible=!1),this.game.input.clear()}currentRank(t=!1){var e;return this.finished&&!t?this.rank:((e=this.rankEntries().find(n=>n.player))==null?void 0:e.pos)??1}rankEntries(){const t=[{name:this.state.profile.name,player:!0,finished:this.finished,time:this.finished?this.finishTime:null,progress:this.player.passed/this.N}];for(const e of this.ais)t.push({name:e.name,player:!1,finished:e.finished,time:e.finished?e.finishTime:null,progress:e.lap-1+e.u});return t.sort((e,n)=>e.finished&&n.finished?e.time-n.time:e.finished!==n.finished?e.finished?-1:1:n.progress-e.progress),t.forEach((e,n)=>{e.pos=n+1}),t}standings(){return this.rankEntries().map(t=>({name:t.name,player:t.player,score:t.progress,time:t.time,pos:t.pos}))}buildSummary(){const t=this.standings().map(s=>({...s,timeText:s.time?ei(s.time*1e3):"—",gap:s.time&&this.finishTime?s.time-this.finishTime:null}));let e=this.rank;const n=t.find(s=>s.player);return n&&(e=n.pos),{track:this.track,trackId:this.track.id,trackName:this.track.name,mode:this.mode,difficulty:this.difficulty.id,pos:e,totalTime:this.finishTime*1e3,bestLap:this.bestLap,lapTimes:this.lapTimes,boostTime:this.boostTime,standings:t,laps:this.laps,championship:this.cfg.championship||null,weather:this.weatherType}}setWeather(t,e=!0){if(t===this.weatherType)return;this.weatherType=t,this.world.weather.setType(t);const n={clear:"Clear skies",rain:"Rain",snow:"Snow",storm:"Storm"}[t]||t;e&&this.say(`Conditions shifting — ${n.toLowerCase()}`,t==="storm"?"danger":"info",!0),this.audio.sfx(t==="storm"?"hit":"whoosh")}update(t){var e,n;if(this.time+=t,this.world.update(t,this.camera),this.shake=Math.max(0,this.shake-t*2.4),this.collisionCooldown=Math.max(0,this.collisionCooldown-t),this.padCooldown=Math.max(0,this.padCooldown-t),this.wobble=Math.max(0,this.wobble-t),this.player.wobble=Math.max(0,this.player.wobble-t),this.phase==="intro"){this.introTime+=t,this.countdown-=t,this.updateIntroCamera(t),this.updateWeatherVisual(t);const s=Math.ceil(this.countdown);this.countdown>.2?this.ui.raceCountdown(String(Math.max(1,s)),this.countdown<3.2?"go-soon":""):this.countdown>-.9?(this.ui.raceCountdown("GO!","go"),this.phase==="intro"&&this.countdown<0&&(this.phase="race",this.goTimer=1.1,this.audio.sfx("whistle"),this.audio.speak("And they are off!"),this.ui.raceMessage("GO!","gold"),this.commentary("raceStart",!1))):this.ui.raceCountdown("",""),this.updateModelsIdle(t),this.phase==="race"&&(this.lapStart=0)}else this.phase==="race"?(this.goTimer>0&&(this.goTimer-=t,this.goTimer<=0&&this.ui.raceCountdown("","")),this.elapsed+=t,this.updatePlayer(t),this.updateAIs(t),this.updateCamera(t),this.updateWeather(t),this.checkPickups(t),this.hudTimer-=t,this.hudTimer<=0&&(this.hudTimer=.09,this.updateHUD()),this.audio.settings,(n=(e=this.audio).update)==null||n.call(e,0)):(this.endTimer-=t,this.updateAIs(t*.65),this.rank=this.currentRank(),this.updateFinishCamera(t),this.updateHUD(),this.endTimer<=0&&!this.resultSent&&(this.resultSent=!0,this.game.completeRace(this.buildSummary())));this.phase!=="finished"&&this.updateHUD()}updateWeatherVisual(t){}updateWeather(t){if(this.weatherChangeTimer-=t,this.weatherChangeTimer<=0&&!this.finished){this.weatherChangeTimer=35+Math.random()*20;const n=(this.track.weather==="clear"?["clear","rain","storm"]:this.track.weather==="rain"?["rain","clear","storm"]:this.track.weather==="snow"?["snow","storm","snow"]:["storm","rain"]).filter(s=>s!==this.weatherType);this.setWeather(n[Math.floor(Math.random()*n.length)])}this.world.weather.flash>.5&&(this.shake=Math.max(this.shake,.08))}updateIntroCamera(t){this.world.gates[0];const e=this.introTime,n=.6+e*.32,s=this.player.pos.clone(),a=s.clone().add(new T(Math.cos(n)*26,7+Math.sin(e*.8)*3,Math.sin(n)*26));this.camera.position.lengthSq()<100&&this.camera.position.copy(a),this.camera.position.lerp(a,1-Math.exp(-t*2.5)),this.camera.lookAt(s.x,s.y+1.2,s.z),this.camera.fov=Li(this.camera.fov,55,1-Math.exp(-t*2)),this.camera.updateProjectionMatrix(),this.playerModel.rotation.z=Math.sin(e*1.2)*.05,this.playerModel.position.y=this.player.pos.y+Math.sin(e*2)*.12,this.trail.position.copy(this.playerModel.position).add(new T(0,-.4,2.4)),this.updateAIModels(t)}updateModelsIdle(t){this.playerModel.position.copy(this.player.pos);const e=new Ue().setFromEuler(new ge(this.player.pitch,this.player.yaw,0,"YXZ"));this.playerModel.quaternion.copy(e);const n=this.playerModel.userData;n.robeTail&&(n.robeTail.rotation.x=-1+Math.sin(this.time*5)*.12),n.scarfTail&&(n.scarfTail.rotation.x=.3+Math.sin(this.time*8)*.2),this.updateAIModels(t)}updatePlayer(t){const e=this.game.input,n=this.player;this.stats;const s=e.boost&&n.boost>1&&this.wobble<=.05,a=e.brake,r=this.weatherType==="storm"?.82:this.weatherType==="snow"?.9:this.weatherType==="rain"?.94:1;let o=this.speedBase;this.mode==="trial"&&(o+=2),s?(o*=this.boostPower,n.boost=Math.max(0,n.boost-27*t),this.boostTime+=t,this.boostWasHeld||(this.audio.sfx("boost"),this.audio.speak("Boost!"),this.commentary("boost",!1),this.shake=Math.max(this.shake,.2)),this.boostWasHeld=!0):(this.boostWasHeld=!1,n.boost=Math.min(100,n.boost+(a?11:5.5)*t)),a&&(o*=.58),o*=r;const l=this.accel*(s?1.4:1);n.speed=Li(n.speed,o,1-Math.exp(-t*(l/13))),n.speed<8&&(n.speed=Math.min(o,n.speed+18*t));let c=e.joy.x,h=-e.joy.y;(this.wobble>0||n.wobble>0)&&(c+=Math.sin(this.time*8.5)*.35,h+=Math.cos(this.time*7.2)*.12);const d=this.weatherType==="storm"?.72:this.weatherType==="snow"?.8:this.weatherType==="rain"?.88:1;n.yaw-=c*this.turnRate*t*1.15*d,n.pitch+=h*t*1.1*d,n.pitch=In(n.pitch,-.72,.72),Math.abs(h)<.06&&(n.pitch=Li(n.pitch,0,1-Math.exp(-t*1.7)));const u=this.world.gates[n.nextGate%this.N];if(u){const x=u.pos.clone().sub(n.pos),S=x.length();if(S<170){const R=Math.atan2(-x.x,-x.z),C=X0(R,n.yaw);Math.abs(c)<.12&&Math.abs(C)<.75&&(n.yaw+=C*t*.85);const A=Math.hypot(x.x,x.z),L=In(Math.atan2(x.y,A),-.6,.6);if(Math.abs(h)<.15&&(n.pitch=Li(n.pitch,L,1-Math.exp(-t*.65))),S<60){const I=this.gateTangent(n.nextGate%this.N),v=new T().crossVectors(I,new T(0,1,0)).normalize(),M=x.dot(v);Math.abs(M)>28&&(n.yaw+=Math.sign(M)*-.2*t)}}}n.bank=Li(n.bank,-c*.55+n.wobble*.2,1-Math.exp(-t*6));const m=new Ue().setFromEuler(new ge(n.pitch,n.yaw,0,"YXZ")),g=new T(0,0,-1).applyQuaternion(m),_=(.45+Math.sin(this.time*.8)*.3)*this.track.wind*(this.weatherType==="storm"?3.4:1);n.pos.addScaledVector(g,n.speed*t),n.pos.x+=Math.sin(this.time*.5+.4)*_*t,n.pos.z+=Math.cos(this.time*.4)*_*t;const p=this.world.theme.groundY+5;n.pos.y<p&&(n.pos.y=p,n.pitch=Math.max(.05,n.pitch)),n.pos.y=Math.min(n.pos.y,190);const f=Math.hypot(n.pos.x,n.pos.z);f>780&&(n.pos.x*=780/f,n.pos.z*=780/f),this.playerModel.position.copy(n.pos),this.playerModel.quaternion.copy(m),this.playerModel.rotateZ(n.bank);const b=this.playerModel.userData;if(b.robeTail&&(b.robeTail.rotation.x=-1+Math.sin(this.time*9)*.08+Math.min(.25,n.speed/300)),b.scarfTail&&(b.scarfTail.rotation.x=.3+Math.sin(this.time*13)*.18+.12),this.playerModel.position.y+=Math.sin(this.time*4)*.035,this.marker.ring.rotation.z+=t*.8,this.marker.ring.material.opacity=.55+Math.sin(this.time*3)*.2,this.trail.position.copy(n.pos).addScaledVector(g,3.2),this.trail.material.opacity=In((n.speed-20)/120,0,.34)+(s?.22:0),this.trail.scale.setScalar(5+n.speed*.07),u&&n.pos.distanceTo(u.pos)<11.5&&this.passGate(),this.padCooldown<=0){for(const x of this.world.pads)if(n.pos.distanceTo(x.pos)<6.5){n.boost=Math.min(100,n.boost+30),n.speed+=7,this.padCooldown=.85,this.audio.sfx("whoosh"),this.ui.raceMessage("Boost ring!","gold"),this.shake=Math.max(this.shake,.12);break}}if(this.collisionCooldown<=0){for(const x of this.world.obstacles)if(n.pos.distanceTo(x.pos)<x.radius+1.4){this.collisionCooldown=1.4,n.speed*=.42,n.boost=Math.max(0,n.boost-12),n.wobble=.9,this.shake=1,this.audio.sfx("hit"),this.audio.vibrate(90),this.ui.raceHit(),this.commentary("hit");break}}this.player.passed===0&&this.elapsed>.2&&(this.lapStart=Math.max(this.lapStart,0))}updateAIs(t){const e=this.curveLen||1;this.player.pos;for(const n of this.ais){if(n.finished){n.model.position.y+=Math.sin(this.time*3+n.phase)*t*.02;continue}const s=n.lap-1+n.u,a=this.player.passed/this.N;let r=0;s<a-.08&&(r=.065),s>a+.12&&(r=-.04);const o=n.baseSpeed*this.difficulty.ai*(1+r)*(this.weatherType==="storm"?.9:1);if(n.u+=o*t/e,n.lap+=Math.floor(n.u),n.u=(n.u%1+1)%1,n.lap>this.laps){n.finished=!0,n.lap=this.laps,n.u=1,n.finishTime=this.elapsed,n.model.position.set(0,-500,0);continue}(n.lap-1+n.u)/this.laps;const l=In(n.u,0,.9999),c=this.world.curve.getPointAt(l),h=this.world.curve.getTangentAt(l),d=new T().crossVectors(h,new T(0,1,0)).normalize(),u=Math.sin(this.time*.55+n.phase)*(2+n.wobble*4)+n.lane;c.addScaledVector(d,u),c.y+=Math.sin(this.time*.9+n.phase)*2.4,n.model.position.copy(c);const m=Math.atan2(-h.x,-h.z),g=new Ue().setFromEuler(new ge(0,m,0));g.multiply(new Ue().setFromAxisAngle(new T(0,0,1),Math.sin(this.time*.8+n.phase)*.2)),n.model.quaternion.copy(g);const _=n.model.userData;_.robeTail&&(_.robeTail.rotation.x=-1+Math.sin(this.time*8+n.phase)*.1)}this.updateAIModels(t)}updateAIModels(t){for(const e of this.ais)e.finished||(e.model.position.y+=Math.sin(this.time*3.2+e.phase)*.008)}checkPickups(t){}updateCamera(t){const e=this.player,n=new Ue().setFromEuler(new ge(e.pitch*.6,e.yaw,0,"YXZ")),s=new T(0,3.9,10.5).applyQuaternion(n),a=e.pos.clone().add(s);e.pos.clone().add(new T(0,1.9,0)),this.camera.position.lerp(a,1-Math.exp(-t*7)),this.shake>0&&(this.camera.position.x+=(Math.random()-.5)*this.shake*1.2,this.camera.position.y+=(Math.random()-.5)*this.shake*1.2);const r=e.pos.clone().add(new T(0,2.1,0)),o=this.world.gates[e.nextGate%this.N];o&&r.lerp(o.pos,.06),this.camera.lookAt(r);const l=61+Math.max(0,e.speed-32)*.22+(this.game.input.boost?5:0);if(this.camera.fov=Li(this.camera.fov,In(l,58,76),1-Math.exp(-t*3)),this.camera.updateProjectionMatrix(),this.beacon&&!this.finished){const c=30+Math.sin(this.time*3)*5;this.beacon.scale.set(c,c,1),this.beacon.material.opacity=.28+Math.sin(this.time*3)*.12}}updateFinishCamera(t){const e=this.player.pos,n=this.time*.35,s=e.clone().add(new T(Math.cos(n)*22,7,Math.sin(n)*22));this.camera.position.lerp(s,1-Math.exp(-t*2)),this.camera.lookAt(e)}updateHUD(){var e;const t=In(this.player.boost/100,0,1);this.ui.updateRaceHUD({speed:Math.round(this.player.speed*2.6),boost:t,lap:Math.min(this.laps,Math.floor(this.player.passed/this.N)+1),laps:this.laps,pos:this.currentRank(),time:this.elapsed*1e3,gatesTotal:this.N,gateIndex:this.player.nextGate,nextGate:this.player.nextGate,weather:this.weatherType,boostHeld:this.game.input.boost,beacon:this.finished?null:(e=this.world.gates[this.player.nextGate%this.N])==null?void 0:e.pos,player:this.player,ais:this.ais,lapTimes:this.lapTimes,bestLap:this.bestLap})}dispose(){this.audio.setMode("menu")}}const _e=(i,t,e)=>Math.max(t,Math.min(e,i)),en=(i,t,e)=>i+(t-i)*e;function ac(i,t){let e=i-t;for(;e>Math.PI;)e-=Math.PI*2;for(;e<-Math.PI;)e+=Math.PI*2;return e}class j0{constructor(t,e){this.game=t,this.cfg=e,this.state=t.state,this.nation=he.find(o=>o.id===e.nationId)||he[0],this.opponent=he.find(o=>o.id===e.opponentId)||he[1],this.role=e.role||"chaser",this.tactics=Hi.find(o=>o.id===(e.tactics||"balanced"))||Hi[1],this.difficulty=Ye.find(o=>o.id===(e.difficulty||"pro"))||Ye[1],this.round=e.round||0,this.roundName=e.roundName||"Quarter-final",this.world=W0(this.nation,this.opponent,{}),this.scene=this.world.scene,this.weather=this.world.weather,this.camera=new Re(58,t.aspect,.1,1600),this.game.renderer.shadowMap.enabled=this.state.settings.quality!=="low",this.matchLength=170,this.elapsed=0,this.timeLeft=this.matchLength,this.phase="intro",this.introCountdown=3.8,this.introTime=0,this.endTimer=0,this.resultSent=!1,this.soundTime=0,this.messageTimer=0,this.hudTimer=0,this.shake=0,this.score={player:0,opp:0},this.stats={goals:0,saves:0,bludgers:0,snitch:0,shots:0},this.shot=null,this.incoming=null,this.bludgerShots=[],this.attackTimer=9+Math.random()*4,this.oppAttackTimer=11+Math.random()*4,this.bludgerThreatTimer=16+Math.random()*8,this.snitchReleased=!1,this.snitchCaught=!1,this.snitchAiTimer=0,this.snitchVisible=!1,this.stun=0,this.actionCooldown=0,this.passCooldown=0,this.boost=100,this.boostHeld=!1,this.possess="player",this.pendingReset=0,this.lastComment=-9,this.diveTimer=0,this.snitchTarget=new T(0,18,0),this.snitchRetarget=0,this.crowdNoise=0,this.trailPositions=[];const n=si.find(o=>o.id===this.role)||si[0];this.roleInfo=n,this.broom=yn(this.state.brooms.selected);const s=this.nation.colors[0];this.player={pos:this.startPosition(this.role),yaw:-Math.PI/2,pitch:0,bank:0,speed:0,role:this.role,stun:0},this.playerModel=vs({robe:s,skin:this.state.profile.skin,hair:this.state.profile.hair,livery:this.nation.accent,wood:this.broom.colors,scale:1.05}),this.playerModel.position.copy(this.player.pos),this.scene.add(this.playerModel),this.marker=th(this.playerModel,this.nation.accent),this.trail=Te(this.nation.accent,7,.2),this.scene.add(this.trail),this.teammates=[],this.opponents=[];const a=Qs[this.nation.id]||Qs.england,r=Qs[this.opponent.id]||Qs.france;this.buildTeam("player",a,this.nation.colors[0],this.teammates),this.buildTeam("opp",r,this.opponent.colors[0],this.opponents),this.quaffle=G0(),this.quaffle.scale.setScalar(1.25),this.scene.add(this.quaffle),this.quaffleGlow=Te("#ff9b7a",3.2,.3),this.quaffle.add(this.quaffleGlow),this.bludgers=[sc(),sc()],this.bludgers.forEach((o,l)=>{o.scale.setScalar(1.15),this.scene.add(o),o.userData.phase=l*3.1,o.userData.anchor=new T(0,10+l*5,0)}),this.snitch=Jc(),this.snitch.scale.setScalar(1.5),this.snitch.position.set(0,20,0),this.snitch.visible=!1,this.scene.add(this.snitch),this.snitchGlow=Te("#ffe08a",8,.5),this.snitch.add(this.snitchGlow),this.hoopTargets=this.world.hoops.map(o=>({...o,world:new T(o.x,o.y,o.z),glow:Te("#ffd776",10,.25)}));for(const o of this.hoopTargets)o.glow.position.set(o.x,o.y,o.z),this.scene.add(o.glow);this.audio=t.audio,this.audio.setMode("quid"),this.audio.sfx("crowd"),this.ui=t.ui,this.ui.showQuidditchHUD(this),this.game.input.bindQuidditch(),this.audio.speak(`${this.roundName}. ${this.nation.name} versus ${this.opponent.name}.`),this.say(`${this.nation.name} vs ${this.opponent.name} — ${this.roundName}`,"gold"),this.possess=this.role==="chaser"?"player":"player-ai",this.chooseAiCarrier(),this.updateCameraIntro(.016,!0),this.ui.updateQuidditchHUD(this.hudData())}startPosition(t){return t==="keeper"?new T(-72,11,0):t==="beater"?new T(-34,12,16):t==="seeker"?new T(-36,19,-8):new T(-14,11,0)}buildTeam(t,e,n,s){const a=["chaser","chaser","chaser","beater","beater","keeper","seeker"];let r=!1;a.forEach((o,l)=>{if(t==="player"&&o===this.role&&!r){r=!0;return}t==="player"&&o===this.role&&r&&a.indexOf(o);const h=vs({robe:n,skin:["#e0b48b","#b98460","#8a5b3f","#f0c9a6"][l%4],hair:["#2d1d14","#6d4a2d","#a8793f","#1c1713"][l%4],livery:this.nation.accent,wood:[["#4a2f1d","#795534"],["#3f3a45","#78808c"],["#6b4a2c","#a98253"]][l%3],scale:.98});this.scene.add(h);const d=l/7*Math.PI*2,u=t==="player"?-30:30;h.position.set(u+Math.cos(d)*12,10+l%4*3,Math.sin(d)*18),s.push({team:t,role:o,name:e[l%e.length]||`Player ${l}`,model:h,phase:Math.random()*6.28,anchor:new T(u,11+l%4*3,Math.sin(d)*18),radius:8+l%3*5,speed:.16+l%3*.04,carrier:!1,stunned:0,dive:0})})}chooseAiCarrier(){if(this.role==="chaser"&&this.possess==="player"){this.quaffleHolder="player";return}const t=this.possess==="opp"?this.opponents:this.possess==="player-ai"?this.teammates:this.teammates,e=t.filter(s=>s.role==="chaser"),n=e[Math.floor(Math.random()*e.length)]||t[0];n?(this.quaffleHolder=n,n.carrier=!0):this.quaffleHolder=null}setPossession(t){this.possess=t;for(const a of[...this.teammates,...this.opponents])a.carrier=!1;if(t==="player"){this.quaffleHolder="player";return}const e=t==="opp"?this.opponents:this.teammates,n=e.filter(a=>a.role==="chaser"),s=n[Math.floor(Math.random()*n.length)]||e[0];this.quaffleHolder=s||null,s&&(s.carrier=!0)}say(t,e="info"){this.ui.quidditchMessage(t,e)}commentary(t){const e=$c[t];if(!e||this.elapsed-this.lastComment<3.5)return;this.lastComment=this.elapsed;const n=e[Math.floor(Math.random()*e.length)];this.say(n,t==="goal"?"gold":t==="save"?"ice":t==="snitchCatch"?"gold":"info"),this.audio.speak(n)}update(t){if(t=Math.min(t,.05),this.world.update(t,this.camera),this.shake=Math.max(0,this.shake-t*2),this.stun=Math.max(0,this.stun-t),this.player.stun=Math.max(0,this.player.stun-t),this.actionCooldown=Math.max(0,this.actionCooldown-t),this.passCooldown=Math.max(0,this.passCooldown-t),this.diveTimer=Math.max(0,this.diveTimer-t),this.phase==="intro"){this.introTime+=t,this.introCountdown-=t,this.updateCameraIntro(t),this.updateAIModels(t*.4),this.animateBalls(t);const e=Math.ceil(this.introCountdown);this.introCountdown>.1?this.ui.quidditchCountdown(String(Math.max(1,e))):this.ui.quidditchCountdown("PLAY!"),this.introCountdown<=-.7&&(this.phase="play",this.ui.quidditchCountdown(""),this.audio.sfx("whistle"),this.audio.speak("The Quaffle is released!"),this.commentary("quidStart")),this.ui.updateQuidditchHUD(this.hudData());return}if(this.phase==="done"){this.endTimer-=t,this.updateCameraFinish(t),this.updateAIModels(t*.4),this.animateBalls(t),this.endTimer<=0&&!this.resultSent&&(this.resultSent=!0,this.game.completeQuidditch(this.buildSummary()));return}this.elapsed+=t,this.timeLeft=Math.max(0,this.matchLength-this.elapsed),this.updatePlayer(t),this.updateAIModels(t),this.updateAttacks(t),this.updateBalls(t),this.updateSnitch(t),this.updateBludgers(t),this.updateCamera(t),this.updateEffects(t),this.timeLeft<=0&&!this.snitchCaught&&this.endMatch(!1,!0),this.hudTimer-=t,this.hudTimer<=0&&(this.hudTimer=.08,this.ui.updateQuidditchHUD(this.hudData()))}updatePlayer(t){const e=this.player,n=this.game.input,s=e.stun>0||this.stun>0;let a=n.joy.x,r=-n.joy.y;s&&(a*=.1,r*=.1),this.state.skills.reflex,this.boostHeld=n.boost&&this.boost>1&&!s,this.boostHeld?this.boost=Math.max(0,this.boost-24*t):this.boost=Math.min(100,this.boost+8*t);const o=19+(this.state.skills.speed||0)*.25,l=(this.boostHeld?o*1.6:o)*(s?.3:1);e.speed=en(e.speed,l,1-Math.exp(-t*3.2));const c=1.45+(this.state.skills.handling||0)*.02;if(e.yaw-=a*c*t,e.pitch+=r*c*.52*t,e.pitch=_e(e.pitch,-.55,.55),Math.abs(r)<.05&&(e.pitch=en(e.pitch,0,1-Math.exp(-t*2))),this.aimTarget=null,this.role==="chaser"&&this.quaffleHolder==="player"){const g=this.getShotTarget(e.yaw,e.pitch);if(this.aimTarget=(g==null?void 0:g.target)||null,g&&g.angle<1.05){const _=_e(1-Math.hypot(a,r)*.72,.22,1),p=(1-Math.exp(-t*2.4))*_;e.yaw+=ac(g.yaw,e.yaw)*p,e.pitch=_e(e.pitch+ac(g.pitch,e.pitch)*p*.72,-.55,.55)}}e.bank=en(e.bank,-a*.5,1-Math.exp(-t*5));const h=new Ue().setFromEuler(new ge(e.pitch,e.yaw,0,"YXZ")),d=new T(0,0,-1).applyQuaternion(h);e.pos.addScaledVector(d,e.speed*t),e.pos.x=_e(e.pos.x,-87,87),e.pos.z=_e(e.pos.z,-48,48),e.pos.y=_e(e.pos.y,3.2,30);const u=Math.sin(this.elapsed*3.4)*.08;this.playerModel.position.copy(e.pos),this.playerModel.position.y+=u,this.playerModel.quaternion.copy(h),this.playerModel.rotateZ(e.bank);const m=this.playerModel.userData;m.robeTail&&(m.robeTail.rotation.x=-1+Math.sin(this.elapsed*9)*.12),m.scarfTail&&(m.scarfTail.rotation.x=.3+Math.sin(this.elapsed*12)*.2),this.marker.ring.rotation.z+=t,this.marker.ring.material.opacity=.5+Math.sin(this.elapsed*3)*.2,this.trail.position.copy(e.pos).addScaledVector(d,3.2),this.trail.material.opacity=.12+(this.boostHeld?.2:0),this.trail.scale.setScalar(5+e.speed*.12),n.consumeAction()&&this.doAction(),n.consumePass()&&this.doPass(),s&&(e.pos.y=Math.max(3,e.pos.y-t*2))}doAction(){if(this.game.input,this.actionCooldown>0)return;const t=this.role;t==="chaser"?this.quaffleHolder==="player"?(this.playerShoot(),this.actionCooldown=1.1):this.nearOpponentCarrier()?(this.tackle(),this.actionCooldown=1.5):(this.player.boostDodge=.4,this.player.speed+=5,this.actionCooldown=.6,this.say("Pressing forward","info")):t==="beater"?(this.smashBludger(),this.actionCooldown=2.2):t==="keeper"?(this.keeperDive(),this.actionCooldown=.8):t==="seeker"&&(this.snitchReleased&&this.snitch.visible?this.player.pos.distanceTo(this.snitch.position)<10?this.catchSnitch("player",!0):(this.say("The Snitch is too far — chase it down!","info"),this.player.speed+=4):this.say("The Snitch is not out yet. Watch the skies.","info"),this.actionCooldown=.9)}doPass(){if(this.role!=="chaser"||this.quaffleHolder!=="player"||this.passCooldown>0)return;const t=this.teammates.filter(n=>n.role==="chaser"),e=t[Math.floor(Math.random()*t.length)];e&&(this.passCooldown=1.6,this.quaffleHolder=e,e.carrier=!0,e.receiveBoost=1.8,this.possess="player-ai",this.say(`Pass to ${e.name}`,"info"),this.audio.sfx("whoosh"),this.attackTimer=Math.min(this.attackTimer,2.6))}nearOpponentCarrier(){for(const t of this.opponents)if(t.carrier&&t.stunned<=0&&this.player.pos.distanceTo(t.model.position)<6.5)return!0;return!1}tackle(){const t=this.opponents.find(n=>n.carrier&&this.player.pos.distanceTo(n.model.position)<7);if(!t)return;const e=.55+(this.state.skills.reflex||0)*.035;Math.random()<e?(t.carrier=!1,this.quaffleHolder="player",this.possess="player",this.say("Turnover! The Quaffle is yours","gold"),this.audio.sfx("whoosh"),this.commentary("tackle")):(this.player.stun=.9,this.shake=.6,this.say("Tackle missed — you’re jostled","danger"),this.audio.sfx("hit"))}getShotTarget(t=this.player.yaw,e=this.player.pitch){const n=this.player,s=new T(0,0,-1).applyEuler(new ge(e,t,0,"YXZ"));let a=null;for(const r of this.hoopTargets){if(r.side!==1)continue;const o=r.world.clone().sub(n.pos),l=o.length();if(l<.001)continue;const c=o.multiplyScalar(1/l),h=_e(c.dot(s),-1,1),d=Math.acos(h),u=d+l*7e-4;(!a||u<a.score)&&(a={target:r,distance:l,angle:d,score:u,yaw:Math.atan2(-c.x,-c.z),pitch:Math.asin(_e(c.y,-1,1))})}return a}playerShoot(){this.player;const t=this.getShotTarget(),e=t==null?void 0:t.target;if(!e)return;const n=t.distance;if(n>105){this.say("Too far from the hoops — fly closer!","danger"),this.ui.quidditchFlashAction("TOO FAR");return}this.stats.shots+=1,this.quaffleHolder=null,this.possess="loose",this.shot={team:"player",from:this.quaffle.position.clone(),to:e.world.clone(),t:0,duration:_e(n/75,.35,1),target:e,distance:n,accuracy:_e(.97-n/220-t.angle*.16+(this.state.skills.power||0)*.008,.48,.96),playerShot:!0},this.audio.sfx("whoosh"),this.actionCooldown=1.2,this.say(t.angle<.22?"Perfect aim — shot away!":"Shot away!","gold")}smashBludger(){const t=this.player;let e=null,n=70;for(const a of this.bludgers){if(a.userData.inFlight)continue;const r=t.pos.distanceTo(a.position);r<n&&(n=r,e=a)}if(!e){this.say("No Bludger in range","info");return}const s=this.nearestOpponent(t.pos)||this.opponents[0];s&&(this.bludgerShots.push({mesh:e,from:e.position.clone(),to:s,t:0,duration:.6,hit:!1,target:s}),e.userData.inFlight=!0,this.stats.bludgers+=1,this.audio.sfx("bludger"),this.shake=Math.max(this.shake,.3),this.say(`Bludger away at ${s.name}!`,"gold"),this.commentary("bludger"))}nearestOpponent(t){let e=null,n=1/0;for(const s of this.opponents){if(s.stunned>0)continue;const a=t.distanceTo(s.model.position);a<n&&(n=a,e=s)}return e}keeperDive(){this.diveTimer=1.2,this.player.speed*=.8,this.audio.sfx("whoosh"),this.say("Dive!","gold"),this.incoming&&this.incoming.timer<.35&&this.trySave(this.incoming.target,!0)}trySave(t,e=!1){const s=this.player.pos.distanceTo(t.world),a=this.state.skills.reflex||0,r=_e(.2+(e?.38:0)+a*.035+Math.max(0,12-s)*.035,.1,.95);return(s<13||e)&&Math.random()<r?(this.stats.saves+=1,this.score.player+=0,this.say("SAVED! What a stop!","ice"),this.commentary("save"),this.audio.sfx("save"),this.world.confetti.burst(),this.boardFlash("SAVE"),!0):!1}updateAttacks(t){this.attackTimer-=t,this.oppAttackTimer-=t;const e=this.tactics.id==="aggressive"?.8:this.tactics.id==="defensive"?1.25:1;if(this.oppAttackTimer<=0&&(this.oppAttackTimer=(11+Math.random()*5)*(this.tactics.id==="defensive"?1.25:this.tactics.id==="aggressive"?.85:1),this.role==="keeper"?this.beginIncomingShot():this.simulatedAttack("opp")),this.attackTimer<=0&&(this.attackTimer=(13+Math.random()*6)*(this.role==="chaser"?1.7:1)*e,(this.role!=="chaser"||this.quaffleHolder!=="player")&&this.simulatedAttack("player")),this.pendingReset>0&&(this.pendingReset-=t,this.pendingReset<=0&&this.resetQuaffle()),this.role==="keeper"&&this.incoming){this.incoming.timer-=t;const n=this.incoming.target;n.glow.material.opacity=.55+Math.sin(this.elapsed*12)*.35,this.incoming.timer<=0&&!this.incoming.launched&&(this.incoming.launched=!0,this.launchShot("opp",n,!1),this.incoming=null)}this.bludgerThreatTimer>0&&(this.bludgerThreatTimer-=t,this.bludgerThreatTimer<=0&&(this.bludgerThreatTimer=20+Math.random()*14,(this.role!=="beater"||Math.random()<.35)&&this.bludgerThreat()))}simulatedAttack(t){const e=this.tactics.id,n=this.difficulty.ai,s=t==="player"?_e(.46+(e==="aggressive"?.09:e==="defensive"?-.05:0)+(this.state.skills.power||0)*.006,.2,.75):_e(.44+(n-.97)*.18+(e==="defensive"?-.08:e==="aggressive"?.05:0),.2,.72);if(Math.random()<s){const a=this.hoopTargets.filter(r=>r.side===(t==="player"?1:-1))[Math.floor(Math.random()*3)];this.launchShot(t,a,!1,!0)}else t==="opp"?(this.say("The Keeper palms it away!","ice"),this.audio.sfx("save")):this.say("Saved by the opposing Keeper!","danger")}beginIncomingShot(){const t=this.hoopTargets.filter(n=>n.side===-1),e=t[Math.floor(Math.random()*t.length)];this.incoming={target:e,timer:1.5,launched:!1},this.boardFlash("INCOMING"),this.say(`Shot incoming — ${e.y>16?"top":e.y<11?"low":"middle"} hoop! Dive!`,"danger"),this.audio.sfx("whoosh"),this.audio.vibrate(60)}launchShot(t,e,n,s=!1){const a=t==="player"?this.player.pos.clone():new T(-40+Math.random()*20,10+Math.random()*10,(Math.random()-.5)*30);this.quaffleHolder=null,this.possess="loose",this.shot={team:t,from:a,to:e.world.clone(),t:0,duration:s?.45:.75,target:e,distance:a.distanceTo(e.world),accuracy:t==="player"?.7:.6,playerShot:!!n,resolveOnly:!n&&!s},this.actionCooldown=Math.max(this.actionCooldown,.2)}resolveShot(){const t=this.shot;if(!t)return;const e=t.team,n=t.target,s=t.accuracy;let a=!1;if(e==="player"){const r=.32+(this.difficulty.ai-.97)*.2;Math.random()>r&&Math.random()<s?(a=!0,this.score.player+=10,this.stats.goals+=1,this.world.confetti.burst(),this.boardFlash("GOAL!"),this.say("GOAL! The Quaffle flies through!","gold"),this.commentary("goal"),this.audio.sfx("goal")):(this.say("Saved! The Keeper gets a hand to it","ice"),this.audio.sfx("save"))}else{let r=!1;if(this.role==="keeper"){const o=this.player.pos.distanceTo(n.world),l=this.state.skills.reflex||0,c=.1+Math.max(0,14-o)*.035+l*.03+(this.diveTimer>0?.35:0);Math.random()<_e(c,.05,.92)&&(r=!0,this.stats.saves+=1,this.say("SAVED! You deny them!","ice"),this.commentary("save"),this.audio.sfx("save"),this.boardFlash("SAVE"))}else{const o=.36-(this.difficulty.ai-.97)*.2;r=Math.random()<o}r||(a=!0,this.score.opp+=10,this.say("The Quaffle is through — ten points to "+this.opponent.name,"danger"),this.audio.sfx("crowd"),this.boardFlash("TEN POINTS"))}a&&(n.glow.material.opacity=.9,this.audio.vibrate(45)),this.shot=null,this.pendingReset=1.9,this.ui.quidditchScoreFlash(e,a)}resetQuaffle(){if(this.quaffle.position.set(0,12,0),this.quaffle.visible=!0,this.quaffleHolder=null,this.possess="loose",this.role==="chaser"&&Math.random()<.55)this.quaffleHolder="player",this.possess="player";else{const t=Math.random()<.5?"player-ai":"opp";this.setPossession(t)}this.attackTimer=Math.min(this.attackTimer,5),this.oppAttackTimer=Math.min(this.oppAttackTimer,7)}updateSnitch(t){if(!this.snitchReleased&&this.elapsed>=55&&(this.snitchReleased=!0,this.snitch.visible=!0,this.snitch.position.set(0,22,0),this.snitchAiTimer=32+Math.random()*22,this.audio.sfx("snitch"),this.audio.speak("The Golden Snitch is released!"),this.commentary("snitch"),this.ui.quidditchBanner("THE GOLDEN SNITCH IS LOOSE"),this.ui.quidditchCountdown("")),!this.snitchReleased)return;this.snitchRetarget-=t,this.snitchRetarget<=0&&(this.snitchRetarget=1.2+Math.random()*1.8,this.snitchTarget.set((Math.random()-.5)*150,9+Math.random()*20,(Math.random()-.5)*80)),this.snitch.position.lerp(this.snitchTarget,1-Math.exp(-t*1.2)),this.snitch.position.y+=Math.sin(this.elapsed*4)*t*2,this.snitch.position.x=_e(this.snitch.position.x,-80,80),this.snitch.position.z=_e(this.snitch.position.z,-44,44),this.snitch.position.y=_e(this.snitch.position.y,7,30),this.snitch.rotation.y+=t*3;const e=this.snitch.userData.wings;e[0].rotation.y=Math.sin(this.elapsed*26)*.8,e[1].rotation.y=-Math.sin(this.elapsed*26)*.8,this.snitchGlow.material.opacity=.45+Math.sin(this.elapsed*7)*.2;const n=[];for(const s of this.opponents)s.role==="seeker"&&n.push({p:s,team:"opp"});for(const s of this.teammates)s.role==="seeker"&&n.push({p:s,team:"player"});for(const s of n){const a=this.snitch.position,r=s.p.model.position;r.lerp(a,1-Math.exp(-t*(.28+Math.random()*.05))),r.y+=Math.sin(this.elapsed*2+s.p.phase)*.02;const o=Math.atan2(-(a.x-r.x),-(a.z-r.z));s.p.model.rotation.y=o}if(this.snitchAiTimer-=t,this.snitchAiTimer<=0){if(this.role==="seeker"){if(this.player.pos.distanceTo(this.snitch.position)<7.5&&Math.random()<.6){this.catchSnitch("player",!0);return}this.catchSnitch("opp",!1)}else{const s=this.teammates.find(r=>r.role==="seeker"),a=this.opponents.find(r=>r.role==="seeker");s&&Math.random()<.42?this.catchSnitch("player",!1):a&&this.catchSnitch("opp",!1)}this.snitchAiTimer=25+Math.random()*20}this.snitch.visible&&this.player.pos.distanceTo(this.snitch.position)<4.2&&this.role==="seeker"&&this.catchSnitch("player",!0)}catchSnitch(t,e){this.snitchCaught||(this.snitchCaught=!0,this.snitch.visible=!1,t==="player"?(this.score.player+=150,e&&(this.stats.snitch=1),this.say("THE SNITCH IS CAUGHT! 150 POINTS!","gold"),this.audio.sfx("catch"),this.audio.speak(e?"You caught the Snitch! One hundred and fifty points!":"Your Seeker has caught the Snitch!"),this.world.confetti.burst(),this.boardFlash("+150 SNITCH")):(this.score.opp+=150,this.say(`The ${this.opponent.name} Seeker catches the Snitch — +150`,"danger"),this.audio.sfx("snitch"),this.audio.speak("The opposing Seeker has caught the Golden Snitch."),this.boardFlash("+150 OPPONENT")),this.commentary("snitchCatch"),this.endMatch(t==="player",!1,!0))}updateBludgers(t){for(const e of this.bludgers){if(e.userData.inFlight)continue;const n=this.elapsed*.7+e.userData.phase;e.position.set(Math.sin(n*.9)*52,12+Math.sin(n*1.7)*8,Math.cos(n*.7)*30),e.rotation.y+=t*2}for(let e=this.bludgerShots.length-1;e>=0;e--){const n=this.bludgerShots[e];n.t+=t;const s=_e(n.t/n.duration,0,1),a=n.target.model.position.clone();n.mesh.position.lerpVectors(n.from,a,s),s>=1&&!n.hit&&(n.hit=!0,n.target.stunned=3.2,n.target.model.rotation.z=.8,this.audio.sfx("bludger"),this.shake=.5,this.say(`${n.target.name} takes a Bludger!`,"gold"),n.target.carrier&&(n.target.carrier=!1,this.quaffleHolder=null,this.possess="loose",this.quaffle.position.copy(n.target.model.position),this.pendingReset=1.4,this.say("The Quaffle is knocked loose!","gold")),this.bludgerShots.splice(e,1),n.mesh.userData.inFlight=!1,n.mesh.position.set(0,30,0))}}bludgerThreat(){if(this.role==="keeper"&&this.incoming)return;if(this.ui.quidditchWarning("BLUDGER INCOMING"),this.audio.sfx("bludger"),(this.game.input.boost||Math.abs(this.game.input.joy.x)>.7)&&Math.random()<.6){this.say("You dodge the Bludger!","ice");return}this.player.stun=1.3,this.shake=1,this.audio.sfx("hit"),this.audio.vibrate(100),this.quaffleHolder==="player"?(this.quaffleHolder=null,this.possess="loose",this.pendingReset=1.5,this.say("Bludger hit! You drop the Quaffle","danger")):this.say("Bludger hit! Shake it off","danger")}updateBalls(t){if(this.animateBalls(t),this.possess==="loose"&&!this.shot&&this.quaffle.visible){const e=this.player.pos.distanceTo(this.quaffle.position);e<5&&this.role==="chaser"&&this.player.stun<=0?(this.quaffleHolder="player",this.possess="player",this.audio.sfx("whoosh"),this.say("Quaffle secured","gold")):e<6&&this.role!=="chaser"&&this.ui.quidditchHint("Only a Chaser can carry the Quaffle")}}animateBalls(t){if(this.shot){const e=this.shot;e.t+=t;const n=_e(e.t/e.duration,0,1),s=Math.sin(n*Math.PI)*8;this.quaffle.position.lerpVectors(e.from,e.to,n),this.quaffle.position.y+=s,this.quaffle.rotation.x+=t*5,n>=1&&this.resolveShot()}else if(this.quaffleHolder==="player"){const e=new T(0,0,-1).applyEuler(new ge(this.player.pitch,this.player.yaw,0,"YXZ"));this.quaffle.position.copy(this.player.pos).addScaledVector(e,1.6),this.quaffle.position.y-=.45,this.quaffle.rotation.y+=t*1.5}else if(this.quaffleHolder&&this.quaffleHolder.model){const e=this.quaffleHolder.model.position,n=this.quaffleHolder.team==="player"?1:-1;this.quaffle.position.set(e.x+n*1.1,e.y-.5,e.z),this.quaffle.rotation.y+=t*1.5}else!this.shot&&this.possess==="loose"&&(this.quaffle.position.y=12+Math.sin(this.elapsed*2.5)*.6,this.quaffle.rotation.y+=t)}updateAIModels(t){for(const e of[...this.teammates,...this.opponents]){if(e.stunned>0){e.stunned-=t,e.model.rotation.z=en(e.model.rotation.z,.9,.1),e.model.position.y=Math.max(4,e.model.position.y-t*3),e.stunned<=0&&(e.model.rotation.z=0);continue}e.stunned=Math.max(0,e.stunned);const n=this.elapsed,s=e.team==="player"?1:-1;let a,r,o;if(e.role==="keeper")a=e.team==="player"?-80:80,r=10+Math.sin(n*.8+e.phase)*3,o=Math.sin(n*1.1+e.phase)*18;else if(e.role==="seeker")a=Math.sin(n*.45+e.phase)*30,r=20+Math.sin(n*.8+e.phase)*5,o=Math.cos(n*.6+e.phase)*20,this.snitchReleased&&(a=en(a,this.snitch.position.x,.04),r=en(r,this.snitch.position.y,.04),o=en(o,this.snitch.position.z,.04));else if(e.role==="beater")a=Math.sin(n*.5+e.phase)*45+s*5,r=13+Math.sin(n*1.2+e.phase)*4,o=Math.cos(n*.65+e.phase)*26;else{const c=e.phase*13%30-15;a=Math.sin(n*.55+e.phase)*30+s*12,r=11+Math.sin(n*1.1+e.phase)*3,o=Math.cos(n*.4+e.phase)*22+c*.5}e.carrier&&(a=s*28+Math.sin(n*.7+e.phase)*12,o=Math.sin(n*.9+e.phase)*12,r=12+Math.sin(n*1.3)*2),e.model.position.set(a,r,o);const l=e.team==="player"?-Math.PI/2:Math.PI/2;e.model.rotation.y=l+Math.sin(n*.7+e.phase)*.2,e.model.rotation.z=Math.sin(n*.9+e.phase)*.12}}updateCameraIntro(t,e=!1){const n=this.introTime,s=n*.35+.8,a=new T(Math.cos(s)*120,55+Math.sin(n)*6,Math.sin(s)*95);e?this.camera.position.copy(a):this.camera.position.lerp(a,1-Math.exp(-t*2.2)),this.camera.lookAt(0,12,0),this.camera.fov=58,this.camera.updateProjectionMatrix()}updateCamera(t){const e=this.player,n=new Ue().setFromEuler(new ge(e.pitch*.5,e.yaw,0,"YXZ")),s=new T(0,4.6,13.5).applyQuaternion(n),a=e.pos.clone().add(s);this.camera.position.lerp(a,1-Math.exp(-t*5.2)),this.shake>0&&(this.camera.position.x+=(Math.random()-.5)*this.shake,this.camera.position.y+=(Math.random()-.5)*this.shake);const r=e.pos.clone().add(new T(0,2.2,0));if(this.role==="seeker"&&this.snitchReleased)r.lerp(this.snitch.position,.15);else if(this.role==="chaser"&&this.quaffleHolder!=="player"){const l=this.quaffle.position;e.pos.distanceTo(l)<55&&r.lerp(l,.12)}this.camera.lookAt(r);const o=this.boostHeld?68:58;this.camera.fov=en(this.camera.fov,o,1-Math.exp(-t*2.5)),this.camera.updateProjectionMatrix()}updateCameraFinish(t){const e=this.player.pos,n=this.elapsed*.25+1,s=e.clone().add(new T(Math.cos(n)*28,9,Math.sin(n)*28));this.camera.position.lerp(s,1-Math.exp(-t*1.6)),this.camera.lookAt(e)}updateEffects(t){var e;for(const n of this.hoopTargets)((e=this.incoming)==null?void 0:e.target)===n?(n.glow.material.color.set("#ff6d68"),n.glow.material.opacity=en(n.glow.material.opacity,.85,1-Math.exp(-t*5)),n.glow.scale.setScalar(12+Math.sin(this.elapsed*8)*1.2)):this.aimTarget===n?(n.glow.material.color.set("#ffe29a"),n.glow.material.opacity=en(n.glow.material.opacity,.68,1-Math.exp(-t*5)),n.glow.scale.setScalar(10+Math.sin(this.elapsed*4)*.65)):(n.glow.material.color.set("#ffd776"),n.glow.material.opacity=en(n.glow.material.opacity,.2,1-Math.exp(-t*4)),n.glow.scale.setScalar(10));this.crowdNoise>0&&(this.crowdNoise-=t),this.snitch.visible&&(this.snitch.rotation.y+=t)}endMatch(t,e=!1,n=!1){this.phase==="done"||this.phase==="ending"||(this.phase="done",this.endTimer=3,this.won=this.score.player>this.score.opp,e&&(this.say(this.won?"FULL TIME! Victory is yours!":"Full time. The scoreboard is cruel.",this.won?"gold":"danger"),this.commentary("time")),this.audio.sfx(this.won?"win":"lose"),this.won?(this.world.confetti.burst(),this.boardFlash("VICTORY")):this.boardFlash("FULL TIME"),this.audio.speak(this.won?`${this.nation.name} wins!`:`${this.opponent.name} wins.`),this.game.input.clear())}buildSummary(){return{nationId:this.nation.id,nationName:this.nation.name,opponentId:this.opponent.id,opponentName:this.opponent.name,round:this.round,roundName:this.roundName,role:this.role,tactics:this.tactics.id,difficulty:this.difficulty.id,scoreFor:this.score.player,scoreAgainst:this.score.opp,won:this.score.player>this.score.opp,goals:this.stats.goals,saves:this.stats.saves,bludgers:this.stats.bludgers,snitch:this.stats.snitch,shots:this.stats.shots,timeLeft:this.timeLeft,snitchCaught:this.snitchCaught}}boardFlash(t){this.ui.quidditchScoreFlash(t)}hudData(){var e,n;const t=this.actionLabel();return{scorePlayer:this.score.player,scoreOpp:this.score.opp,nation:this.nation,opponent:this.opponent,timeLeft:this.timeLeft,role:this.role,action:t,actionCooldown:this.actionCooldown,boost:this.boost/100,carrying:this.quaffleHolder==="player",pass:this.role==="chaser"&&this.quaffleHolder==="player",snitchReleased:this.snitchReleased,snitchVisible:this.snitch.visible,incoming:((e=this.incoming)==null?void 0:e.target)||null,aimTargetY:((n=this.aimTarget)==null?void 0:n.y)??null,playerPos:this.player.pos,playerYaw:this.player.yaw,quafflePos:this.quaffle.position,snitchPos:this.snitch.position,opponents:this.opponents,teammates:this.teammates,roleInfo:this.roleInfo,match:this}}actionLabel(){return this.actionCooldown>0?`${this.role==="beater"?"SMASH":this.role==="keeper"?"DIVE":this.role==="seeker"?"GRAB":"SHOOT"}`:this.role==="chaser"?this.quaffleHolder==="player"?"SHOOT":this.nearOpponentCarrier()?"TACKLE":"DASH":this.role==="beater"?"SMASH":this.role==="keeper"?"DIVE":"GRAB"}substituteRole(t){const e=si.find(o=>o.id===t);if(!e||e.id===this.role||this.phase==="done")return;this.quaffleHolder==="player"&&(this.quaffleHolder=null,this.possess="loose",this.quaffle.position.copy(this.player.pos),this.pendingReset=1.1),this.role=e.id,this.roleInfo=e,this.player.role=e.id,this.player.pos.copy(this.startPosition(e.id)),this.player.yaw=-Math.PI/2,this.player.pitch=0,this.player.bank=0,this.player.speed=0,this.player.stun=0,this.playerModel.position.copy(this.player.pos),this.incoming=null,this.actionCooldown=.4,this.diveTimer=0,this.role==="chaser"&&this.possess==="loose"&&(this.attackTimer=Math.min(this.attackTimer,4));const n=new Ue().setFromEuler(new ge(0,this.player.yaw,0,"YXZ")),s=new T(0,4.6,13.5).applyQuaternion(n);this.camera.position.copy(this.player.pos).add(s),this.camera.lookAt(this.player.pos.x,this.player.pos.y+2.2,this.player.pos.z);const a=document.getElementById("quid-role");a&&(a.textContent=e.name);const r=document.getElementById("btn-action");if(r){const o=r.querySelector("#quid-action");o&&(o.textContent=this.actionLabel())}this.ui.quidditchBanner(`SUBSTITUTION · ${e.name.toUpperCase()}`),this.say(`You are now playing ${e.name}. ${e.desc}`,"gold"),this.audio.sfx("whistle")}setTactics(t){const e=Hi.find(n=>n.id===t);e&&(this.tactics=e,this.ui.quidditchBanner(`TACTICS · ${e.name.toUpperCase()}`),this.say(`Tactics set to ${e.name}. ${e.desc}`,"gold"))}dispose(){this.audio.setMode("menu")}}function Ie(i=""){return String(i).replace(/[&<>"']/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[t])}const oc={home:'<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/>',broom:'<path d="M3 21c4-1 6-3 8-6"/><path d="M9 15l6-6 4-4"/><path d="M14 5l5 5"/><path d="M4 20l3-6 3 3-6 3z"/>',quaffle:'<circle cx="12" cy="12" r="8"/><path d="M6.5 7.5c3 2 8 2 11 0M6.5 16.5c3-2 8-2 11 0"/><path d="M12 4v16"/>',bludger:'<circle cx="12" cy="12" r="6"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2"/>',hoop:'<ellipse cx="12" cy="8" rx="6" ry="2.5"/><path d="M6 8v9c0 1.4 2.7 2.5 6 2.5s6-1.1 6-2.5V8"/><path d="M9 16l3-4 3 4"/>',snitch:'<circle cx="12" cy="12" r="3"/><path d="M9 10C6 7 3 7 2 9c3 1 5 2 7 3M15 10c3-3 6-3 7-1-3 1-5 2-7 3M9 14c-3 3-6 3-7 1 3-1 5-2 7-3M15 14c3 3 6 3 7 1-3-1-5-2-7-3"/>',trophy:'<path d="M8 4h8v4a4 4 0 0 1-8 0V4z"/><path d="M8 5H4v2a4 4 0 0 0 4 4M16 5h4v2a4 4 0 0 1-4 4"/><path d="M12 12v5M8 21h8M9 21c0-2 1-4 3-4s3 2 3 4"/>',cup:'<path d="M5 8h14v3a7 7 0 0 1-14 0V8z"/><path d="M9 11h6M12 18v3M8 21h8"/>',map:'<path d="M9 4 3 6v15l6-2 6 2 6-2V4l-6 2-6-2z"/><path d="M9 4v15M15 6v15"/>',clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',flag:'<path d="M5 21V4"/><path d="M5 4c4-2 7 2 11 0v8c-4 2-7-2-11 0z"/>',bolt:'<path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z"/>',star:'<path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1L3.2 9.5l6.1-.9L12 3z"/>',spark:'<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/><circle cx="12" cy="12" r="3"/>',wind:'<path d="M3 8h11a3 3 0 1 0-3-3"/><path d="M3 12h15a3 3 0 1 1-3 3"/><path d="M3 16h7"/>',compass:'<circle cx="12" cy="12" r="9"/><path d="m15 9-2 4-4 2 2-4 4-2z"/>',impact:'<path d="m13 2-8 11h5l-1 9 9-12h-6l1-8z"/>',eye:'<path d="M2 12s4-6 10-6 10 6 10 6-4 6-10 6S2 12 2 12z"/><circle cx="12" cy="12" r="2.5"/>',castle:'<path d="M4 21V8l3 1V4h3v4h4V4h3v5l3-1v13"/><path d="M9 21v-5h6v5M7 12h2M15 12h2"/>',quidditch:'<circle cx="12" cy="12" r="9"/><path d="M12 3v18M3 12h18"/><path d="m7 7 2 2M15 15l2 2M17 7l-2 2M9 15l-2 2"/>',medal:'<circle cx="12" cy="14" r="5"/><path d="m8 3 3 6M16 3l-3 6M12 12l.8 1.6 1.8.3-1.3 1.2.3 1.8-1.6-.8-1.6.8.3-1.8-1.3-1.2 1.8-.3L12 12z"/>',settings:'<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21h-4v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.9.3l-.1.1L4.2 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3v-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.9L4.2 7 7 4.2l.1.1A1.7 1.7 0 0 0 9 4.6a1.7 1.7 0 0 0 1-1.5V3h4v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 7l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.5 1h.1v4h-.1a1.7 1.7 0 0 0-1.5 1z"/>',coin:'<circle cx="12" cy="12" r="8"/><path d="M12 7v10M15 9.5c0-1-1.3-1.8-3-1.8s-3 .8-3 1.8 1.3 1.7 3 2 3 1 3 2-1.3 1.8-3 1.8-3-.8-3-1.8"/>',chevron:'<path d="m9 6 6 6-6 6"/>',back:'<path d="m15 6-6 6 6 6"/>',play:'<path d="m9 5 10 7-10 7V5z"/>',close:'<path d="M6 6l12 12M18 6 6 18"/>',sound:'<path d="M4 9h4l5-4v14l-5-4H4V9z"/><path d="M16 8a5 5 0 0 1 0 8"/>',pause:'<path d="M8 5v14M16 5v14"/>',restart:'<path d="M20 11a8 8 0 1 0-2.3 6.3"/><path d="M20 4v7h-7"/>',person:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7"/>',globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 3 4 6 4 9s-1.5 6-4 9c-2.5-3-4-6-4-9s1.5-6 4-9z"/>',shield:'<path d="M12 3 5 6v6c0 4 3 7 7 9 4-2 7-5 7-9V6l-7-3z"/><path d="m9 12 2 2 4-4"/>'};function Q(i,t=""){return`<svg class="icon ${t}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${oc[i]||oc.star}</svg>`}function ih(i,t=3){let e="";for(let n=0;n<t;n++)e+=`<i class="${n<i?"on":""}"></i>`;return`<span class="pips">${e}</span>`}function na(i,t,e=""){return`<div class="stat-row"><span>${i}</span><div class="bar"><i style="width:${Math.round(t)}%"></i></div><b>${Math.round(t)}</b>${e}</div>`}function rc(i){return Ie((i||"A").split(/\s+/).map(t=>t[0]).slice(0,2).join("").toUpperCase())}function Ni(i){return{clear:"Clear skies",rain:"Rain",snow:"Snow",storm:"Storm"}[i]||i}function Kn(i,t=""){return`<span class="crest ${t}" style="--c1:${i.colors[0]};--c2:${i.colors[1]};--ca:${i.accent}"><b>${i.code}</b><i></i></span>`}function ia(i,t="#e8bd5b"){return`<div class="broom-art" style="--wood:${i.colors[0]};--wood2:${i.colors[1]};--livery:${t}">
    <svg viewBox="0 0 300 120" aria-hidden="true">
      <defs><linearGradient id="bg-${i.id}" x1="0" x2="1"><stop offset="0" stop-color="var(--wood2)"/><stop offset="1" stop-color="var(--wood)"/></linearGradient></defs>
      <path d="M36 88 Q120 44 250 60" stroke="url(#bg-${i.id})" stroke-width="10" fill="none" stroke-linecap="round"/>
      <path d="M245 57 l28 -7 -24 20 -4 -13z" fill="var(--livery)"/>
      <path d="M40 86 C26 98 18 104 8 108 M46 88 C34 103 27 111 16 116 M52 88 C45 104 39 114 32 120 M59 88 C56 104 53 112 46 121" stroke="#b28f53" stroke-width="3" fill="none" stroke-linecap="round"/>
      <circle cx="208" cy="57" r="4" fill="var(--livery)"/>
      <path d="M120 62 l10 3 M140 57 l10 3 M160 55 l10 3" stroke="var(--livery)" stroke-width="3"/>
    </svg>
  </div>`}function sh(i){return i==="hogwarts"||i==="worldcup"?`<svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMax slice">
      <path d="M110 150V80h14V52h14v28h10V66h18v84M198 150V62h12V38h16v24h12v88M280 150V88h12V60h16v28h10v62" fill="currentColor"/>
      <path d="M104 52l18-18 18 18M192 38l14-16 14 16M274 60l18-18 18 18" fill="currentColor"/>
      <circle cx="330" cy="42" r="18" fill="currentColor" opacity=".5"/>
      <path d="M0 150h400v10H0z" fill="currentColor"/>
    </svg>`:i==="london"?`<svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMax slice">
      <path d="M20 150V60h34v90M62 150V92h26v58M96 150V42h40v108M144 150V76h30v74M182 150V54h46v96M236 150V88h24v62M268 150V32h42v118M318 150V72h34v78M360 150V96h24v54" fill="currentColor"/>
      <path d="M30 54h14M104 36h20M192 48h26M278 26h22" stroke="currentColor" stroke-width="4"/>
    </svg>`:i==="forest"?`<svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMax slice">
      <path d="M60 150 90 40l30 110M120 150 155 55l34 95M210 150 245 25l35 125M280 150 308 62l28 88M325 150 355 45l30 105" fill="currentColor"/>
      <path d="M180 150c0-40 20-72 20-72s20 32 20 72" fill="currentColor" opacity=".8"/>
      <circle cx="115" cy="70" r="3" fill="#9effc8"/><circle cx="240" cy="48" r="3" fill="#9effc8"/><circle cx="320" cy="80" r="3" fill="#9effc8"/>
    </svg>`:i==="alpine"?`<svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMax slice">
      <path d="M0 150 80 30l55 70 30-40 60 90zM180 150 270 20l50 65 20-20 60 85z" fill="currentColor"/>
      <path d="M80 30l24 31 15-10-18-18zM270 20l22 29 21-6-24-22z" fill="#fff" opacity=".55"/>
    </svg>`:i==="kyoto"?`<svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMax slice">
      <path d="M130 150V90h140v60M150 90V78h100v12" fill="currentColor"/>
      <path d="M120 78h160l-20-16H140zM135 62h130l-18-14H153zM152 48h96l-16-12h-64z" fill="currentColor"/>
      <path d="M200 36V12M180 150v-35h40v35" stroke="currentColor" stroke-width="5"/>
      <path d="M40 120h80M64 120V92M96 120V92M33 92h94" stroke="currentColor" stroke-width="7" opacity=".7"/>
    </svg>`:i==="cairo"?`<svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMax slice">
      <path d="M80 150 190 55l110 95zM220 150 300 88l80 62z" fill="currentColor"/>
      <path d="M32 150V80h10v70M300 150V70h10v80M348 150V92h8v58" fill="currentColor"/>
      <circle cx="330" cy="38" r="22" fill="currentColor" opacity=".6"/>
    </svg>`:'<svg viewBox="0 0 400 160" preserveAspectRatio="xMidYMax slice"><path d="M0 150 90 45l70 105M150 150 240 25l90 125M310 150l30-60 60 60" fill="currentColor"/></svg>'}function K0(i,t,e){var a;const n=(a=e.stats.trackResults)==null?void 0:a[i.id],s=n!=null&&n.bestLap?ei(n.bestLap):"No time";return`<button class="track-card ${t?"selected":""}" data-action="select-track" data-value="${i.id}">
    <div class="track-art theme-${i.theme}">
      <div class="art-orb"></div>
      <div class="art-landmark">${sh(i.theme)}</div>
      <div class="art-shade"></div>
      <div class="art-top"><span class="weather-chip">${Ni(i.weather)}</span><span>${i.laps} laps</span></div>
      <div class="art-bottom"><span class="track-region">${i.region}</span><strong>${i.name}</strong></div>
      ${t?'<i class="track-check">✓</i>':""}
    </div>
    <div class="track-mini"><span>Best lap <b>${s}</b></span>${ih(i.difficulty)}</div>
  </button>`}class Z0{constructor(t){this.game=t,this.state=t.state,this.current="home",this.modal=null,this.hudEls={},this.lastComment="",this.els={topbar:document.getElementById("topbar"),screen:document.getElementById("screen"),nav:document.getElementById("nav"),hud:document.getElementById("hud"),modal:document.getElementById("modal-root"),toast:document.getElementById("toast-root"),fade:document.getElementById("fade"),loading:document.getElementById("loading")},this.els.screen.addEventListener("click",e=>this.handleClick(e)),this.els.screen.addEventListener("change",e=>this.handleChange(e)),this.els.screen.addEventListener("input",e=>this.handleInput(e)),this.els.topbar.addEventListener("click",e=>this.handleClick(e)),this.els.nav.addEventListener("click",e=>this.handleClick(e)),this.els.modal.addEventListener("click",e=>{const n=e.target.closest(".modal-backdrop");n&&!n.dataset.sticky&&this.closeModal();const s=e.target.closest("[data-action]");if(s){if(e.preventDefault(),this.game.audio.sfx("click"),s.dataset.action.startsWith("onboard-")){this.handleOnboard(s);return}this.game.handleUI(s.dataset.action,s.dataset.value,s.dataset)}}),this.els.hud.addEventListener("click",e=>{const n=e.target.closest("[data-action]");n&&(e.preventDefault(),this.game.audio.sfx("click"),this.game.handleUI(n.dataset.action,n.dataset.value,n.dataset))}),this.renderChrome()}hideLoading(){var t;(t=this.els.loading)==null||t.classList.add("gone"),setTimeout(()=>{var e;return(e=this.els.loading)==null?void 0:e.remove()},900)}renderChrome(){const t=this.state,e=!!this.game.active||this.game.mode==="preview";this.els.topbar.classList.toggle("hidden",e),this.els.nav.classList.toggle("hidden",e),document.body.classList.toggle("in-game",e),document.body.classList.toggle("in-menu",!e);const n=t.profile.level,s=ta(t.profile.ranking);this.els.topbar.innerHTML=`
      <button class="profile-chip" data-action="go" data-value="career">
        <span class="avatar" style="background:linear-gradient(145deg,${t.profile.robe},#141b2d)"><i>${rc(t.profile.name)}</i></span>
        <span class="profile-meta"><small>LEVEL ${n} · ${s}</small><b>${Ie(t.profile.name)}</b></span>
      </button>
      <div class="top-right">
        <span class="currency">${Q("coin")} <b>${t.profile.galleons.toLocaleString()}</b></span>
        <button class="icon-btn" data-action="settings" aria-label="Settings">${Q("settings")}</button>
      </div>`;const a=[["home","home","Home"],["race","broom","Racing"],["quid","quaffle","Quidditch"],["career","trophy","Career"],["locker","star","Locker"]];this.els.nav.innerHTML=a.map(([r,o,l])=>`
      <button class="nav-btn ${this.current===r?"active":""}" data-action="go" data-value="${r}">
        ${Q(o)}<span>${l}</span>
      </button>`).join("")}go(t,e={}){const n=e.preserve?this.els.screen.scrollTop:0;this.current=t,this.render(),this.renderChrome(),e.preserve?requestAnimationFrame(()=>{this.els.screen.scrollTop=n}):this.els.screen.scrollTop=0}render(){switch(this.game,this.state,this.current){case"home":this.els.screen.innerHTML=this.homeScreen();break;case"race":this.els.screen.innerHTML=this.raceScreen();break;case"quid":this.els.screen.innerHTML=this.quidScreen();break;case"career":this.els.screen.innerHTML=this.careerScreen();break;case"locker":this.els.screen.innerHTML=this.lockerScreen();break;default:this.els.screen.innerHTML=this.homeScreen()}}rerender(){const t=this.els.screen.scrollTop;this.renderChrome(),this.render(),requestAnimationFrame(()=>{this.els.screen.scrollTop=t})}handleClick(t){const e=t.target.closest("[data-action]");if(e){if(t.preventDefault(),this.game.audio.init(),this.game.audio.sfx("click"),e.dataset.action.startsWith("onboard-")){this.handleOnboard(e);return}this.game.handleUI(e.dataset.action,e.dataset.value,e.dataset)}}handleOnboard(t){const e=t.dataset.action.replace("onboard-","");if(e==="house"||e==="skin"||e==="robe"){this.onboardDraft[e]=t.dataset.value;const n=`.${e==="house"?"house-option":e==="skin"?"onboard-skin":"onboard-robe"}`;this.els.modal.querySelectorAll(n).forEach(s=>s.classList.remove("active")),t.classList.add("active")}}getOnboarding(){var t,e;return{name:(((t=document.getElementById("onboard-name"))==null?void 0:t.value)||"Aria Blackwood").trim().slice(0,24),nation:((e=document.getElementById("onboard-nation"))==null?void 0:e.value)||"england",...this.onboardDraft}}handleChange(t){const e=t.target;e.dataset.field&&this.game.handleUIField(e.dataset.field,e.value)}handleInput(t){const e=t.target;e.dataset.field==="name"&&(this.game.state.profile.name=e.value.slice(0,24))}toast(t,e="",n="spark"){const s=document.createElement("div");s.className="toast",s.innerHTML=`<span class="toast-icon">${Q(n)}</span><div><b>${Ie(t)}</b>${e?`<small>${Ie(e)}</small>`:""}</div>`,this.els.toast.appendChild(s),requestAnimationFrame(()=>s.classList.add("in")),setTimeout(()=>{s.classList.remove("in"),setTimeout(()=>s.remove(),400)},3e3)}showModal(t,e={}){clearTimeout(this._modalCloseTimer),this.els.modal.innerHTML=`<div class="modal-backdrop ${e.cls||""}" ${e.sticky?'data-sticky="1"':""}><div class="modal-card ${e.card||""}" role="dialog">${t}</div></div>`,requestAnimationFrame(()=>{var n;return(n=this.els.modal.querySelector(".modal-backdrop"))==null?void 0:n.classList.add("in")}),this.modal=e,e.onOpen&&e.onOpen()}closeModal(){const t=this.els.modal.querySelector(".modal-backdrop");t?(t.classList.remove("in"),clearTimeout(this._modalCloseTimer),this._modalCloseTimer=setTimeout(()=>{this.els.modal.innerHTML=""},220)):this.els.modal.innerHTML="",this.modal=null}homeScreen(){var o,l,c;const t=this.state,e=Oi[Math.min(t.career.chapter,Oi.length-1)],n=e?dr(t,e):1,s=(l=(o=t.stats.trackResults)==null?void 0:o[this.game.sel.trackId])==null?void 0:l.bestLap,a=t.quidditch.wins,r=t.profile.ranking;return`<div class="screen home-screen">
      <section class="home-hero">
        <div class="eyebrow"><span>✦</span> THE INTERNATIONAL <span>✦</span></div>
        <h1>Wizarding<br><em>World Cup</em></h1>
        <p class="hero-tag">Broom racing. Quidditch. One legend.</p>
        <div class="hero-actions">
          <button class="btn gold" data-action="go" data-value="race">${Q("broom")} Enter the Circuit</button>
          <button class="btn ghost" data-action="go" data-value="quid">${Q("quaffle")} World Cup</button>
        </div>
        <div class="hero-rank"><span>${Q("globe")} World Ranking</span><b>${r.toLocaleString()}</b><small>${ta(r)}</small></div>
      </section>

      <section class="home-sheet">
        <div class="sheet-grip"></div>
        <div class="continue-card" data-action="go" data-value="career">
          <div class="continue-icon">${Q((e==null?void 0:e.icon)||"trophy")}</div>
          <div class="continue-body">
            <small>CAREER CHAPTER ${(e==null?void 0:e.roman)||"VI"} · ${Math.round(n*100)}%</small>
            <b>${Ie((e==null?void 0:e.title)||"World Champion")}</b>
            <div class="progress"><i style="width:${n*100}%"></i></div>
            <span>${Ie((e==null?void 0:e.hint)||"You have conquered the world.")}</span>
          </div>
          ${Q("chevron","continue-arrow")}
        </div>

        <div class="mode-grid">
          <button class="mode-card race" data-action="go" data-value="race">
            <div class="mode-glow"></div>
            <span class="mode-icon">${Q("broom")}</span>
            <small>HIGH-SPEED CIRCUITS</small>
            <b>Broom Racing</b>
            <span class="mode-meta">${t.stats.races} races · ${t.stats.wins} wins</span>
            <span class="mode-cta">Fly now ${Q("chevron")}</span>
          </button>
          <button class="mode-card quid" data-action="go" data-value="quid">
            <div class="mode-glow"></div>
            <span class="mode-icon">${Q("quaffle")}</span>
            <small>NATIONS · 7 A SIDE</small>
            <b>Quidditch</b>
            <span class="mode-meta">${a} victories · ${t.quidditch.snitch} snitches</span>
            <span class="mode-cta">Take the pitch ${Q("chevron")}</span>
          </button>
        </div>

        <div class="home-grid">
          <div class="mini-panel">
            <div class="mini-head"><span>${Q("clock")} Best lap</span><b>${s?ei(s):"—"}</b></div>
            <div class="mini-sub">${((c=sn.find(h=>h.id===this.game.sel.trackId))==null?void 0:c.name)||"Hogwarts"}</div>
          </div>
          <div class="mini-panel">
            <div class="mini-head"><span>${Q("star")} Skill points</span><b>${t.profile.skillPoints}</b></div>
            <div class="mini-sub">Spend in the Locker</div>
          </div>
        </div>

        <div class="news-ticker">
          <span class="ticker-live"><i></i> WORLD CUP</span>
          <div class="ticker-track">
            <span>${this.tickerText()}</span>
          </div>
        </div>

        <div class="home-footer">${Q("spark")} Choose a mode, chase the glory. Progress saves automatically.</div>
      </section>
    </div>`}tickerText(){var s,a,r;const t=this.state,e=t.quidditch,n=t.quidditch.tournament;return n!=null&&n.champion?`${((s=he.find(o=>o.id===n.nation))==null?void 0:s.name)||"Your nation"} are World Champions! A new tournament awaits.`:n&&!n.eliminated?`${((a=he.find(o=>o.id===n.nation))==null?void 0:a.name)||"Your nation"} are through to the ${((r=n.rounds[n.round])==null?void 0:r.name)||"quarter-final"}. The world is watching.`:`World Cup qualifying is live · ${e.wins} wins this season · Ranking ${t.profile.ranking} · ${e.snitch} Snitch catches · The next legend could be you.`}raceScreen(){var c,h,d;const t=this.state,e=this.game.sel,n=sn.find(u=>u.id===e.trackId)||sn[0],s=(c=t.stats.trackResults)==null?void 0:c[n.id],a=s!=null&&s.bestLap?ei(s.bestLap):"No best lap yet",r=hs.find(u=>u.id===e.mode)||hs[0],o=yn(t.brooms.selected),l=this.game.championship;return`<div class="screen race-screen">
      <header class="screen-head">
        <div><span class="eyebrow-small">INTERNATIONAL CIRCUIT</span><h2>Broom Racing</h2><p>Seven circuits. One crown.</p></div>
        <div class="head-badge">${Q("broom")}<b>${t.stats.wins}</b><small>wins</small></div>
      </header>

      <div class="seg-chips scroll-x">
        ${hs.map(u=>`<button class="chip ${e.mode===u.id?"active":""}" data-action="select-mode" data-value="${u.id}">${Q(u.icon)}${u.name}</button>`).join("")}
      </div>
      <p class="mode-desc">${r.desc}</p>

      ${e.mode==="championship"?`<div class="champ-banner">
        <div><small>${_n.name}</small><b>${l?`Round ${Math.min(3,l.round+1)} of 3`:"Three circuits · points decide everything"}</b></div>
        <div class="champ-tracks">${_n.tracks.map((u,m)=>`<span class="${l&&l.round>m?"done":""}">${m+1}</span>`).join("")}</div>
      </div>`:""}

      <div class="section-title"><span>Select circuit</span><small>Tap a circuit to inspect</small></div>
      <div class="track-scroller scroll-x" id="track-scroller">
        ${sn.map(u=>K0(u,u.id===e.trackId,t)).join("")}
      </div>

      <div class="track-detail">
        <div class="detail-head">
          <div><small>${n.region}</small><h3>${n.name}</h3></div>
          <span class="difficulty">${ih(n.difficulty)} <small>${["","Academy","Professional","World Class"][n.difficulty]}</small></span>
        </div>
        <p>${n.desc}</p>
        <div class="detail-grid">
          <div>${Q("flag")}<span>Weather</span><b>${Ni(n.weather)}</b></div>
          <div>${Q("compass")}<span>Laps</span><b>${e.mode==="trial"||e.mode==="qualify"?1:n.laps}</b></div>
          <div>${Q("clock")}<span>Best lap</span><b>${a}</b></div>
          <div>${Q("wind")}<span>Wind</span><b>${Math.round(n.wind*100)}%</b></div>
        </div>
      </div>

      <div class="section-title"><span>Opponents</span><small>${e.mode==="trial"?"The clock is your only rival":"Five rival flyers"}</small></div>
      <div class="seg-chips">
        ${Ye.map(u=>`<button class="chip ${e.difficulty===u.id?"active":""}" data-action="select-difficulty" data-value="${u.id}">${u.name}</button>`).join("")}
      </div>
      <p class="mode-desc">${((h=Ye.find(u=>u.id===e.difficulty))==null?void 0:h.desc)||""}</p>

      <div class="broom-select" data-action="go" data-value="locker">
        <div class="broom-thumb">${ia(o,(d=ki.find(u=>u.id===t.brooms.livery))==null?void 0:d.color)}</div>
        <div class="broom-select-body">
          <small>YOUR BROOM · TIER ${o.tier}</small>
          <b>${o.name}</b>
          <div class="micro-stats">
            <span>SPD ${Math.round(Di(t,o.id).speed)}</span>
            <span>HND ${Math.round(Di(t,o.id).handling)}</span>
            <span>BST ${Math.round(Di(t,o.id).boost)}</span>
          </div>
        </div>
        ${Q("chevron")}
      </div>

      <div class="launch-bar">
        <div><small>${r.name} · ${n.name}</small><b>${e.mode==="championship"?"Grand Prix":n.region}</b></div>
        <button class="btn gold" data-action="open-briefing">${Q("play")} ${e.mode==="championship"?"Enter Grand Prix":"Race"}</button>
      </div>
      <div class="screen-pad"></div>
    </div>`}quidScreen(){var l;const t=this.state,e=this.game.sel,n=t.quidditch.tournament,s=he.find(c=>c.id===((n==null?void 0:n.nation)||t.profile.nation))||he[0],a=ba(t),r=a?he.find(c=>c.id===a.opponentId):null,o=si.find(c=>c.id===e.role)||si[0];return`<div class="screen quid-screen">
      <header class="screen-head">
        <div><span class="eyebrow-small">XIV WORLD CUP</span><h2>Quidditch</h2><p>Represent your nation. Raise the cup.</p></div>
        <div class="head-badge quid-badge">${Q("quaffle")}<b>${t.quidditch.wins}</b><small>wins</small></div>
      </header>

      ${n?this.tournamentPanel(n,a):`<div class="campaign-hero">
        <div class="campaign-crest">${Kn(s,"large")}</div>
        <div><small>REPRESENTING</small><b>${s.name}</b><span>${s.stadium} · ${s.city}</span></div>
        <button class="btn small ghost" data-action="go" data-value="career">${Q("globe")} Ranking</button>
      </div>`}

      ${!n||n.champion||n.eliminated?`
      <div class="section-title"><span>Choose your nation</span><small>${n?"Start a new campaign":"Eight nations. One cup."}</small></div>
      <div class="nation-grid">
        ${he.map(c=>`<button class="nation-card ${(n?n.nation:t.profile.nation)===c.id?"selected":""}" data-action="select-nation" data-value="${c.id}" style="--c1:${c.colors[0]};--c2:${c.colors[1]};--ca:${c.accent}">
          ${Kn(c)}
          <b>${c.name}</b><small>${c.city}</small>
        </button>`).join("")}
      </div>
      <div class="nation-strip">
        <div>${Q("castle")}<span><small>Home stadium</small><b>${s.stadium}</b></span></div>
        <div>${Q("shield")}<span><small>National symbol</small><b>${s.beast}</b></span></div>
      </div>`:""}

      <div class="section-title"><span>Your position</span><small>Switch roles at any substitution</small></div>
      <div class="role-grid">
        ${si.map(c=>`<button class="role-card ${e.role===c.id?"active":""}" data-action="select-role" data-value="${c.id}" style="--role:${c.color}">
          <span class="role-icon">${Q(c.icon)}</span><b>${c.name}</b><small>${c.desc}</small>
        </button>`).join("")}
      </div>

      <div class="section-title"><span>Tactics</span><small>How will your team play?</small></div>
      <div class="seg-chips">
        ${Hi.map(c=>`<button class="chip ${e.tactics===c.id?"active":""}" data-action="select-tactics" data-value="${c.id}">${c.name}</button>`).join("")}
      </div>
      <p class="mode-desc">${((l=Hi.find(c=>c.id===e.tactics))==null?void 0:l.desc)||""}</p>
      <div class="seg-chips">
        ${Ye.map(c=>`<button class="chip ${e.qDifficulty===c.id?"active":""}" data-action="select-qdifficulty" data-value="${c.id}">${c.name}</button>`).join("")}
      </div>

      <div class="launch-bar">
        <div><small>${n&&!n.champion&&!n.eliminated?(a==null?void 0:a.roundName)||"World Cup":"Quidditch World Cup"}</small><b>${r?`vs ${r.name}`:`${s.name} · ${o.name}`}</b></div>
        ${n&&!n.champion&&!n.eliminated?`<button class="btn gold" data-action="start-match">${Q("play")} Play Match</button>`:`<button class="btn gold" data-action="start-campaign">${Q("trophy")} ${n!=null&&n.champion?"New Campaign":"Enter World Cup"}</button>`}
      </div>
      <div class="screen-pad"></div>
    </div>`}tournamentPanel(t,e){var a;const n=t.rounds,s=r=>he.find(o=>o.id===r)||he[0];return`<div class="bracket-card">
      <div class="bracket-head">
        <div><small>KNOCKOUT STAGE</small><b>${s(t.nation).name} · ${((a=Ye.find(r=>r.id===t.difficulty))==null?void 0:a.name)||"Professional"}</b></div>
        <span class="bracket-status ${t.champion?"champion":t.eliminated?"out":""}">${t.champion?"CHAMPIONS":t.eliminated?"ELIMINATED":(e==null?void 0:e.roundName)||""}</span>
      </div>
      <div class="bracket">
        ${n.map((r,o)=>`<div class="bracket-round ${o===t.round&&!t.champion?"current":""}">
          <h5>${r.name}</h5>
          ${r.matches.map(l=>{const c=s(l.a),h=s(l.b),d=l.a===t.nation||l.b===t.nation,u=l.played,m=u&&l.sa!==void 0?l.sa:"—",g=u&&l.sb!==void 0?l.sb:"—";return`<div class="bracket-match ${d?"involved":""}">
              <span class="${l.winner===l.a?"winner":""}">${Kn(c)}<b>${c.code}</b><i>${m}</i></span>
              <span class="${l.winner===l.b?"winner":""}">${Kn(h)}<b>${h.code}</b><i>${g}</i></span>
            </div>`}).join("")}
        </div>`).join("")}
      </div>
      ${e?`<div class="next-fixture"><span>NEXT FIXTURE</span><b>${s(t.nation).name} vs ${s(e.opponentId).name}</b><small>${e.roundName} · ${s(e.opponentId).stadium}</small></div>`:""}
      ${t.champion?`<div class="champion-banner">${Q("cup")} WORLD CHAMPIONS</div>`:""}
    </div>`}careerScreen(){var s,a;const t=this.state,e=this.game.sel.careerTab,n=[["overview","Overview","trophy"],["rankings","Rankings","globe"],["history","History","clock"],["awards","Awards","star"]];return`<div class="screen career-screen">
      <header class="screen-head">
        <div><span class="eyebrow-small">THE PATH TO GLORY</span><h2>Career</h2><p>Every flight writes your legend.</p></div>
      </header>
      <div class="profile-card">
        <div class="profile-avatar" style="background:linear-gradient(145deg,${t.profile.robe},#101728)"><span>${rc(t.profile.name)}</span><i>${((s=Ii.find(r=>r.id===t.profile.house))==null?void 0:s.name)||""}</i></div>
        <div class="profile-main">
          <small>${(a=Ii.find(r=>r.id===t.profile.house))==null?void 0:a.name} · Level ${t.profile.level}</small>
          <h3>${Ie(t.profile.name)}</h3>
          <div class="xp-line"><div class="progress"><i style="width:${t.profile.xp/xa(t.profile.level)*100}%"></i></div><span>${t.profile.xp}/${xa(t.profile.level)} XP</span></div>
        </div>
        <div class="profile-rank"><b>${t.profile.ranking}</b><small>${ta(t.profile.ranking)}</small></div>
      </div>
      <div class="tabs">
        ${n.map(([r,o,l])=>`<button class="tab ${e===r?"active":""}" data-action="career-tab" data-value="${r}">${Q(l)}${o}</button>`).join("")}
      </div>
      ${e==="overview"?this.careerOverview():e==="rankings"?this.rankingsTab():e==="history"?this.historyTab():this.awardsTab()}
      <div class="screen-pad"></div>
    </div>`}careerOverview(){const t=this.state,e=t.stats;return`<div class="stat-grid">
      <div><b>${e.races}</b><span>Races</span></div>
      <div><b>${e.wins}</b><span>Wins</span></div>
      <div><b>${e.podiums}</b><span>Podiums</span></div>
      <div><b>${t.quidditch.goals}</b><span>Quaffle goals</span></div>
      <div><b>${t.quidditch.saves}</b><span>Saves</span></div>
      <div><b>${t.quidditch.snitch}</b><span>Snitches</span></div>
    </div>
    <div class="section-title"><span>Chapters</span><small>${t.career.claimed.length}/${Oi.length} claimed</small></div>
    <div class="chapter-list">
      ${Oi.map((n,s)=>{const a=dr(t,n),r=jc(t,n),o=t.career.claimed.includes(n.id);return`<div class="chapter ${o?"claimed":a>=1?"complete":""} ${s===t.career.chapter?"current":""}">
          <div class="chapter-roman">${n.roman}</div>
          <div class="chapter-icon">${Q(n.icon)}</div>
          <div class="chapter-body">
            <div><b>${n.title}</b>${o?`<span class="claimed-tag">${Q("shield")} Claimed</span>`:""}</div>
            <p>${n.desc}</p>
            <div class="progress"><i style="width:${a*100}%"></i></div>
            <small>${Math.round(a*100)}% · +${n.reward.galleons} G · +${n.reward.xp} XP</small>
          </div>
          ${r?`<button class="btn tiny gold" data-action="claim-chapter" data-value="${n.id}">Claim</button>`:o?`<span class="checkmark">${Q("shield")}</span>`:""}
        </div>`}).join("")}
    </div>
    <div class="section-title"><span>Season records</span><small>All-time</small></div>
    <div class="record-list">
      <div><span>${Q("trophy")} Grand Prix titles</span><b>${t.career.championships}</b></div>
      <div><span>${Q("cup")} World Cups</span><b>${t.career.cups}</b></div>
      <div><span>${Q("bolt")} Boost time</span><b>${Math.round(t.stats.boostTime)}s</b></div>
      <div><span>${Q("medal")} Best match goals</span><b>${t.stats.bestMatchGoals||0}</b></div>
    </div>`}rankingsTab(){const t=this.state,e=["V. Krum","C. Delacour","H. Sato","A. Peverell","M. Thorne","R. Costa","F. Lund","I. Hassan","L. Hunter","D. Boone"],n=[],s=Math.max(900,t.profile.ranking-420);return e.forEach((a,r)=>n.push({name:a,pts:s+(10-r)*47+Math.round(Math.sin(r*2.3)*30),me:!1})),n.push({name:t.profile.name,pts:t.profile.ranking,me:!0}),n.sort((a,r)=>r.pts-a.pts),`<div class="ranking-card">
      <div class="ranking-head"><span>#</span><span>Flyer</span><span>Points</span></div>
      ${n.slice(0,12).map((a,r)=>`<div class="ranking-row ${a.me?"me":""}"><b>${r+1}</b><span>${Ie(a.name)}</span><i>${a.pts}</i></div>`).join("")}
    </div>
    <p class="mode-desc">Ranking points are earned in races and World Cup matches. Reach 2,100 to become a World Legend.</p>`}historyTab(){const t=this.state;return t.history.length?`<div class="history-list">${t.history.map(e=>`<div class="history-row">
      <span class="history-icon ${e.type}">${Q(e.type==="race"?"broom":"quaffle")}</span>
      <div><b>${Ie(e.name)}</b><small>${e.type==="race"?e.mode==="championship"?"Championship race":"Broom race":e.round||"Quidditch"} · ${new Date(e.at).toLocaleDateString()}</small></div>
      <span class="history-result ${e.won===!1||e.pos&&e.pos>3?"bad":"good"}">${e.type==="race"?e.pos?`P${e.pos}`:"—":`${e.score}${e.won?" W":""}`}</span>
    </div>`).join("")}</div>`:`<div class="empty-state">${Q("clock")}<b>No flights yet</b><p>Your race and match history will appear here.</p><button class="btn gold" data-action="go" data-value="race">Start racing</button></div>`}awardsTab(){const t=this.state;return`<div class="section-title"><span>Achievements</span><small>${Object.keys(t.achievements).length}/${hr.length}</small></div>
    <div class="award-grid">${hr.map(e=>{const n=!!t.achievements[e.id],s=Math.min(Number(e.goal(t)||0),e.count);return`<div class="award ${n?"got":""}">
        <span class="award-icon">${Q(e.icon)}</span>
        <b>${e.name}</b><small>${e.desc}</small>
        <div class="progress"><i style="width:${s/e.count*100}%"></i></div>
        <span class="award-meta">${n?"Unlocked":`${s}/${e.count}`} · +${e.reward} G</span>
      </div>`}).join("")}</div>`}lockerScreen(){const t=this.state,e=this.game.sel.lockerTab||"brooms";return`<div class="screen locker-screen">
      <header class="screen-head">
        <div><span class="eyebrow-small">EQUIPMENT & IDENTITY</span><h2>Locker Room</h2><p>Your broom. Your colours. Your legend.</p></div>
        <div class="head-badge">${Q("coin")}<b>${t.profile.galleons.toLocaleString()}</b><small>galleons</small></div>
      </header>
      <div class="tabs">
        <button class="tab ${e==="brooms"?"active":""}" data-action="locker-tab" data-value="brooms">${Q("broom")}Brooms</button>
        <button class="tab ${e==="look"?"active":""}" data-action="locker-tab" data-value="look">${Q("person")}Appearance</button>
        <button class="tab ${e==="skills"?"active":""}" data-action="locker-tab" data-value="skills">${Q("spark")}Skills${t.profile.skillPoints?` <i class="dot">${t.profile.skillPoints}</i>`:""}</button>
      </div>
      ${e==="brooms"?this.broomsTab():e==="look"?this.lookTab():this.skillsTab()}
      <div class="screen-pad"></div>
    </div>`}broomsTab(){var r;const t=this.state,e=yn(t.brooms.selected),n=Di(t,e.id),s=((r=ki.find(o=>o.id===t.brooms.livery))==null?void 0:r.color)||e.accent,a=t.brooms.upgrades[e.id]||{};return`<div class="featured-broom">
      <div class="featured-glow"></div>
      ${ia(e,s)}
      <div class="featured-info">
        <small>${e.maker}</small><h3>${e.name}</h3>
        <p>${e.desc}</p>
        <div class="badges"><span>Tier ${e.tier}</span><span>${e.length}</span></div>
      </div>
    </div>
    <div class="stat-block">
      ${na("Speed",n.speed)}
      ${na("Acceleration",n.accel)}
      ${na("Handling",n.handling)}
      ${na("Boost",n.boost)}
    </div>
    <div class="section-title"><span>Upgrades</span><small>Max 5 per attribute</small></div>
    <div class="upgrade-list">
      ${[["speed","Speed"],["accel","Acceleration"],["handling","Handling"],["boost","Boost magic"]].map(([o,l])=>{const c=a[o]||0,h=Yc(o,c);return`<div class="upgrade-row"><div><b>${l}</b><span class="up-pips">${Array.from({length:5},(d,u)=>`<i class="${u<c?"on":""}"></i>`).join("")}</span></div>
          <button class="btn tiny ${t.profile.galleons>=h&&c<5?"gold":"dim"}" data-action="upgrade-broom" data-value="${o}" ${c>=5?"disabled":""}>${c>=5?"MAX":`${Q("coin")}${h}`}</button></div>`}).join("")}
    </div>
    <div class="section-title"><span>Broom collection</span><small>${t.brooms.owned.length}/${gs.length} owned</small></div>
    <div class="broom-list">
      ${gs.map(o=>{const l=t.brooms.owned.includes(o.id),c=t.profile.level<o.level;return`<button class="broom-card ${t.brooms.selected===o.id?"selected":""} ${l?"":"locked"}" data-action="select-broom" data-value="${o.id}">
          <div class="broom-card-art">${ia(o,o.accent)}</div>
          <div class="broom-card-info"><small>TIER ${o.tier} · ${o.length}</small><b>${o.name}</b>
          ${l?`<span class="owned">${t.brooms.selected===o.id?"Equipped":"Owned"}</span>`:`<span class="price">${c?`Level ${o.level}`:`${Q("coin")} ${o.price.toLocaleString()}`}</span>`}</div>
          ${t.brooms.selected===o.id?'<i class="equipped-check">✓</i>':""}
        </button>`}).join("")}
    </div>`}lookTab(){var e;const t=this.state;return`<div class="look-preview">
      <div class="look-avatar" style="background:radial-gradient(circle at 50% 35%, #f4e3c7, #1a2033 75%)">
        <div class="wizard-face" style="--skin:${t.profile.skin};--hair:${t.profile.hair};--robe:${t.profile.robe}">
          <div class="hair"></div><div class="head"></div><div class="glasses"></div><div class="robe"></div>
        </div>
      </div>
      <div><small>WITCH / WIZARD</small><b>${Ie(t.profile.name)}</b><span>${(e=Ii.find(n=>n.id===t.profile.house))==null?void 0:e.name} · ${ta(t.profile.ranking)}</span></div>
    </div>
    <div class="form-card">
      <label>Name<input data-field="name" data-action="noop" value="${Ie(t.profile.name)}" maxlength="24" /></label>
      <div class="field"><span>House</span><div class="swatches houses">${Ii.map(n=>`<button class="house-swatch ${t.profile.house===n.id?"active":""}" data-action="select-house" data-value="${n.id}" style="--c:${n.color};--a:${n.accent}"><i></i><b>${n.name}</b></button>`).join("")}</div></div>
      <div class="field"><span>Robe colour</span><div class="swatches">${["#8f1d2c","#1f5d45","#263f73","#b8891f","#5b2d73","#1f3d4d","#6d1f52","#232733"].map(n=>`<button class="swatch ${t.profile.robe===n?"active":""}" style="--c:${n}" data-action="select-robe" data-value="${n}"></button>`).join("")}</div></div>
      <div class="field"><span>Skin tone</span><div class="swatches">${["#f2d3b3","#e0b48b","#c08e63","#9a6842","#714a2f","#4e3322"].map(n=>`<button class="swatch ${t.profile.skin===n?"active":""}" style="--c:${n}" data-action="select-skin" data-value="${n}"></button>`).join("")}</div></div>
      <div class="field"><span>Hair</span><div class="swatches">${["#2a1a12","#6d4a2d","#b98543","#d9c7a1","#8a8f96","#4b2548"].map(n=>`<button class="swatch ${t.profile.hair===n?"active":""}" style="--c:${n}" data-action="select-hair" data-value="${n}"></button>`).join("")}</div></div>
      <button class="btn gold full" data-action="save-appearance">${Q("shield")} Save appearance</button>
    </div>
    <div class="section-title"><span>Broom livery</span><small>Applied to your selected broom</small></div>
    <div class="livery-grid">${ki.map(n=>`<button class="livery ${t.brooms.livery===n.id?"active":""}" data-action="select-livery" data-value="${n.id}" style="--c:${n.color}"><i></i>${n.name}</button>`).join("")}</div>`}skillsTab(){const t=this.state;return`<div class="skill-hero"><div class="skill-points"><b>${t.profile.skillPoints}</b><span>Skill points</span></div><p>Every level grants a point. Build the flyer you want to become — these bonuses apply to every broom and every match.</p></div>
    <div class="skill-list">${Wc.map(e=>{const n=t.skills[e.id]||0;return`<div class="skill-row">
        <span class="skill-icon">${Q(e.icon)}</span>
        <div class="skill-body"><b>${e.name}</b><small>${e.desc}</small><div class="skill-pips">${Array.from({length:10},(s,a)=>`<i class="${a<n?"on":""}"></i>`).join("")}</div></div>
        <button class="skill-plus" data-action="spend-skill" data-value="${e.id}" ${t.profile.skillPoints<=0||n>=10?"disabled":""}>+</button>
      </div>`}).join("")}</div>
    <div class="section-title"><span>Current bonuses</span><small>Applied live</small></div>
    <div class="record-list">
      <div><span>${Q("wind")} Top speed</span><b>+${(t.skills.speed*2.1).toFixed(1)}%</b></div>
      <div><span>${Q("compass")} Handling</span><b>+${(t.skills.handling*2.1).toFixed(1)}%</b></div>
      <div><span>${Q("spark")} Boost</span><b>+${(t.skills.boost*2.1).toFixed(1)}%</b></div>
      <div><span>${Q("impact")} Shot power</span><b>+${(t.skills.power*.8).toFixed(1)}%</b></div>
      <div><span>${Q("eye")} Reflex</span><b>+${(t.skills.reflex*3).toFixed(0)}%</b></div>
    </div>`}showOnboarding(){this.els.topbar.classList.add("hidden"),this.els.nav.classList.add("hidden"),this.els.screen.innerHTML="",document.body.classList.add("onboarding"),this.showModal(`<div class="onboarding">
      <div class="onboard-crest">${Q("broom")}</div>
      <span class="eyebrow-small">THE INTERNATIONAL</span>
      <h2>Create your flyer</h2>
      <p class="onboard-sub">A new season is calling. Name yourself, choose your colours, and step onto the world stage.</p>
      <label class="big-input"><span>Name</span><input id="onboard-name" value="Aria Blackwood" maxlength="24" /></label>
      <div class="onboard-section"><span>House</span><div class="house-grid">${Ii.map((t,e)=>`<button class="house-option ${e===0?"active":""}" data-action="onboard-house" data-value="${t.id}" style="--c:${t.color};--a:${t.accent}"><i></i><b>${t.name}</b><small>${t.trait}</small></button>`).join("")}</div></div>
      <div class="onboard-section"><span>Skin tone</span><div class="swatches">${["#f2d3b3","#e0b48b","#c08e63","#9a6842","#714a2f","#4e3322"].map((t,e)=>`<button class="swatch onboard-skin ${e===1?"active":""}" data-action="onboard-skin" data-value="${t}" style="--c:${t}"></button>`).join("")}</div></div>
      <div class="onboard-section"><span>Robe colour</span><div class="swatches">${["#8f1d2c","#1f5d45","#263f73","#b8891f","#5b2d73","#1f3d4d"].map((t,e)=>`<button class="swatch onboard-robe ${e===0?"active":""}" data-action="onboard-robe" data-value="${t}" style="--c:${t}"></button>`).join("")}</div></div>
      <label class="big-input"><span>Nation</span><select id="onboard-nation">${he.map(t=>`<option value="${t.id}">${t.name}</option>`).join("")}</select></label>
      <button class="btn gold full big" data-action="create-player">${Q("spark")} Begin my career</button>
      <p class="fineprint">Progress saves on this device. All 8 nations, 8 circuits and the full World Cup are included.</p>
    </div>`,{sticky:!0,card:"onboard-card"}),this.onboardDraft={house:"gryffindor",skin:"#d9a97f",robe:"#8f1d2c"}}showBriefing(){var d;const t=this.game,e=this.state,n=t.sel,s=sn.find(u=>u.id===n.trackId)||sn[0],a=hs.find(u=>u.id===n.mode)||hs[0],r=Ye.find(u=>u.id===n.difficulty)||Ye[1],o=yn(e.brooms.selected),l=Di(e,o.id),c=n.mode==="trial"||n.mode==="qualify"?1:s.laps,h=this.raceRewardsPreview(n.mode,r);this.showModal(`<div class="briefing">
      <div class="briefing-art theme-${s.theme}">
        <div class="art-orb"></div>
        <div class="art-landmark">${sh(s.theme)}</div>
        <div class="briefing-fade"></div>
        <button class="icon-btn floating-close" data-action="close-briefing">${Q("close")}</button>
        <div class="briefing-title"><small>${a.name.toUpperCase()} · ${s.region.toUpperCase()}</small><h2>${s.name}</h2><span>${s.tagline}</span></div>
        <div class="briefing-weather">${Ni(s.weather)}<b>${Math.round(s.wind*100)}% wind</b></div>
      </div>
      <div class="briefing-body">
        <div class="briefing-grid">
          <div><small>Laps</small><b>${c}</b></div>
          <div><small>Rivals</small><b>${n.mode==="trial"?"None":"5"}</b></div>
          <div><small>Difficulty</small><b>${r.name}</b></div>
          <div><small>Weather</small><b>${Ni(s.weather)}</b></div>
        </div>
        <p class="briefing-desc">${s.desc}</p>
        <div class="briefing-broom">
          <div class="briefing-broom-art">${ia(o,(d=ki.find(u=>u.id===e.brooms.livery))==null?void 0:d.color)}</div>
          <div><small>YOUR BROOM</small><b>${o.name}</b><div class="micro-stats"><span>SPD ${Math.round(l.speed)}</span><span>HND ${Math.round(l.handling)}</span><span>BST ${Math.round(l.boost)}</span></div></div>
        </div>
        <div class="briefing-rewards">
          <span>${Q("coin")} ${h.galleons} G</span>
          <span>${Q("star")} ${h.xp} XP</span>
          <span>${Q("globe")} ${h.ranking} RP</span>
        </div>
        <div class="briefing-tip">${Q("compass")} Tilt your broom with the joystick. Fly through golden hoops and chase the glowing beacon.</div>
        <div class="briefing-actions">
          <button class="btn ghost" data-action="close-briefing">Back</button>
          <button class="btn gold" data-action="begin-race">${Q("play")} Begin</button>
        </div>
      </div>
    </div>`,{card:"briefing-card",sticky:!0})}raceRewardsPreview(t,e){const n=e.reward;return t==="trial"?{galleons:Math.round(300*n),xp:Math.round(100*n),ranking:10}:t==="qualify"?{galleons:Math.round(220*n),xp:Math.round(80*n),ranking:8}:{galleons:Math.round(500*n),xp:Math.round(180*n),ranking:50}}showSettings(){const t=this.state.settings,e=(n,s,a,r)=>`<button class="setting-row" data-action="toggle-setting" data-value="${n}">
      <span class="setting-ic">${Q(r)}</span><div><b>${s}</b><small>${a}</small></div>
      <span class="toggle ${t[n]?"on":""}"><i></i></span>
    </button>`;this.showModal(`<div class="modal-head"><div><small>PREFERENCES</small><h3>Settings</h3></div><button class="icon-btn" data-action="close-modal">${Q("close")}</button></div>
      <div class="setting-list">
        ${e("sound","Sound effects","Whooshes, hoops and crowd roars","sound")}
        ${e("music","Magical score","Procedural music for every arena","spark")}
        ${e("voice","Commentary voice","Spoken match commentary","quaffle")}
        ${e("haptics","Haptics","Feel collisions and saves","bolt")}
      </div>
      <div class="setting-label">GRAPHICS</div>
      <div class="seg-chips">${["high","medium","low"].map(n=>`<button class="chip ${t.quality===n?"active":""}" data-action="set-quality" data-value="${n}">${n[0].toUpperCase()+n.slice(1)}</button>`).join("")}</div>
      <p class="fineprint">High quality uses device pixel ratio and real-time shadows. Reduce for older phones.</p>
      <div class="setting-label">GAME DATA</div>
      <button class="danger-link" data-action="reset-save">Reset all progress…</button>
      <p class="fineprint">Version 1.0 · A fully 3D mobile wizarding sports game. Built with Three.js.</p>`,{card:"settings-card"})}showPause(t){const e=!!t;this.state,this.showModal(`<div class="modal-head"><div><small>${e?"QUIDDITCH":"BROOM RACING"}</small><h3>Paused</h3></div><button class="icon-btn" data-action="resume">${Q("play")}</button></div>
      ${e?`<div class="pause-score"><div><small>${t.nation.name}</small><b>${t.score.player}</b></div><span>VS</span><div><small>${t.opponent.name}</small><b>${t.score.opp}</b></div></div>
      <div class="setting-label">SUBSTITUTION</div>
      <div class="sub-grid">${si.map(n=>`<button class="sub-btn ${t.role===n.id?"active":""}" data-action="sub-role" data-value="${n.id}">${Q(n.icon)}<b>${n.name}</b></button>`).join("")}</div>
      <div class="setting-label">TACTICS</div>
      <div class="seg-chips">${Hi.map(n=>`<button class="chip ${t.tactics.id===n.id?"active":""}" data-action="change-tactics" data-value="${n.id}">${n.name}</button>`).join("")}</div>
      <p class="fineprint">Substitutions swap the position you control. Your team keeps its formation.</p>
      `:'<p class="pause-note">Take a breath. The hoops will wait.</p>'}
      <div class="pause-actions">
        <button class="btn gold full" data-action="resume">${Q("play")} Resume</button>
        <button class="btn ghost full" data-action="restart-current">${Q("restart")} Restart</button>
        <button class="btn ghost full" data-action="quit-game">${Q("home")} Return to menu</button>
      </div>`,{sticky:!0,card:"pause-card"})}showRaceResults(t,e,n={}){const s=t.pos,a=`${s}${s===1?"st":s===2?"nd":s===3?"rd":"th"}`,r=t.standings.slice(0,6),o=n.championship,l=o?Object.entries(o.points).sort((h,d)=>d[1]-h[1]):null,c=n.achievements||[];this.showModal(`<div class="results">
      <div class="results-hero ${s<=3?"podium":""}">
        <span class="results-rays"></span>
        <div class="big-rank">${a}</div>
        <small>${t.mode==="trial"?"TIME TRIAL":t.mode==="qualify"?"QUALIFYING":t.mode==="championship"?"GRAND PRIX":"RACE COMPLETE"}</small>
        <h2>${s===1?"Victory":s<=3?"Podium finish":"Race complete"}</h2>
        <p>${t.trackName}</p>
        <div class="result-times"><div><small>Total time</small><b>${ei(t.totalTime)}</b></div><div><small>Best lap</small><b>${ei(t.bestLap)}</b></div><div><small>Boost</small><b>${Math.round(t.boostTime)}s</b></div></div>
      </div>
      <div class="results-body">
        <div class="reward-row">
          <span>${Q("coin")} <b>+${e.galleons}</b><small>Galleons</small></span>
          <span>${Q("star")} <b>+${e.xp}</b><small>XP</small></span>
          <span>${Q("globe")} <b>+${e.ranking}</b><small>Ranking</small></span>
        </div>
        ${n.levels?`<div class="level-up">${Q("spark")} Level up! You are now level ${this.state.profile.level}. +1 skill point.</div>`:""}
        ${c.length?`<div class="ach-toast">${c.map(h=>`<span>${Q(h.icon)} ${h.name}</span>`).join("")}</div>`:""}
        <div class="result-table">
          <div class="result-head"><span>#</span><span>Flyer</span><span>Time / gap</span></div>
          ${r.map(h=>`<div class="result-row ${h.player?"me":""}"><b>${h.pos}</b><span>${Ie(h.name)}</span><i>${h.timeText||"—"}${h.gap&&h.gap>0?` +${h.gap.toFixed(1)}s`:""}</i></div>`).join("")}
        </div>
        ${o?`<div class="champ-standings"><div class="section-title"><span>Championship</span><small>Round ${o.round+1} of 3</small></div>
          ${l.map(([h,d],u)=>`<div class="result-row ${h===this.state.profile.name?"me":""}"><b>${u+1}</b><span>${Ie(h)}</span><i>${d} pts</i></div>`).join("")}
        </div>`:""}
        <div class="results-actions">
          ${o&&!o.final?`<button class="btn gold" data-action="next-champ-race">${Q("flag")} Next race</button>`:""}
          ${o&&o.final?`<button class="btn gold" data-action="go" data-value="career">${Q("trophy")} View career</button>`:""}
          ${o?"":`<button class="btn gold" data-action="race-again">${Q("restart")} Race again</button>`}
          <button class="btn ghost" data-action="go" data-value="race">Change circuit</button>
          <button class="btn ghost" data-action="go" data-value="home">Home</button>
        </div>
      </div>
    </div>`,{sticky:!0,card:"results-card"})}showQuidditchResults(t,e,n={}){var c;const s=t.won,a=n.achievements||[];n.tournament;const r=n.nextFixture,o=n.champion,l=n.eliminated;this.showModal(`<div class="results quid-results ${s?"won":"lost"}">
      <div class="results-hero ${s?"podium":""}">
        <span class="results-rays"></span>
        <div class="result-crest">${Kn(he.find(h=>h.id===t.nationId))}</div>
        <small>${t.roundName.toUpperCase()} · ${t.role.toUpperCase()}</small>
        <h2>${s?"Victory":"Defeat"}</h2>
        <div class="quid-final-score"><b>${t.scoreFor}</b><span>—</span><b>${t.scoreAgainst}</b></div>
        <p>${t.nationName} vs ${t.opponentName}</p>
        ${t.snitch?`<div class="snitch-tag">${Q("snitch")} GOLDEN SNITCH CAUGHT</div>`:""}
      </div>
      <div class="results-body">
        <div class="match-stats">
          <div><b>${t.goals}</b><span>Goals</span></div>
          <div><b>${t.saves}</b><span>Saves</span></div>
          <div><b>${t.bludgers}</b><span>Bludger hits</span></div>
          <div><b>${t.shots}</b><span>Shots</span></div>
        </div>
        <div class="reward-row">
          <span>${Q("coin")} <b>+${e.galleons}</b><small>Galleons</small></span>
          <span>${Q("star")} <b>+${e.xp}</b><small>XP</small></span>
          <span>${Q("globe")} <b>+${e.ranking}</b><small>Ranking</small></span>
        </div>
        ${n.levels?`<div class="level-up">${Q("spark")} Level up! You are now level ${this.state.profile.level}.</div>`:""}
        ${a.length?`<div class="ach-toast">${a.map(h=>`<span>${Q(h.icon)} ${h.name}</span>`).join("")}</div>`:""}
        ${o?`<div class="champion-banner">${Q("cup")} WORLD CHAMPIONS · THE CUP IS YOURS</div>`:l?'<div class="eliminated-banner">Knocked out of the World Cup. A new campaign awaits.</div>':r?`<div class="next-fixture"><span>NEXT</span><b>${r.roundName}</b><small>${((c=he.find(h=>h.id===r.opponentId))==null?void 0:c.name)||""}</small></div>`:""}
        <div class="results-actions">
          ${!o&&!l?`<button class="btn gold" data-action="next-quid-match">${Q("play")} Next match</button>`:`<button class="btn gold" data-action="new-quid-campaign">${Q("trophy")} New campaign</button>`}
          <button class="btn ghost" data-action="go" data-value="quid">World Cup hub</button>
          <button class="btn ghost" data-action="go" data-value="home">Home</button>
        </div>
      </div>
    </div>`,{sticky:!0,card:"results-card"})}showConfirmReset(){this.showModal(`<div class="modal-head"><div><small>IRREVERSIBLE</small><h3>Reset progress?</h3></div></div>
      <p class="pause-note">All levels, brooms, trophies, records and tournaments will be erased. This cannot be undone.</p>
      <div class="pause-actions">
        <button class="btn gold full" data-action="close-modal">Keep my legend</button>
        <button class="btn danger full" data-action="confirm-reset">Erase everything</button>
      </div>`,{card:"settings-card"})}baseControls(){return`<div class="controls">
      <div class="joystick-wrap">
        <div class="joystick" id="joystick-zone"><div class="joy-glow"></div><div class="joy-knob" id="joystick-knob">${Q("wind")}</div></div>
        <span class="control-label">FLY</span>
      </div>
      <div class="action-cluster">
        <button class="round-btn brake" id="btn-brake" aria-label="Brake">${Q("wind")}<span>BRAKE</span></button>
        <button class="round-btn boost" id="btn-boost" aria-label="Boost">${Q("bolt")}<span>BOOST</span></button>
      </div>
    </div>`}hudTop(t){return`<div class="hud-top">${t}</div>`}showRaceHUD(t){this.els.topbar.classList.add("hidden"),this.els.nav.classList.add("hidden"),document.body.classList.add("in-game");const e=t.track;this.els.hud.innerHTML=`<div class="hud race-hud" id="race-hud">
      <div class="hud-top">
        <div class="hud-chip lap-chip"><small>LAP</small><b id="race-lap">1/2</b></div>
        <div class="hud-chip pos-chip"><small>POS</small><b id="race-pos">1</b><span>st</span></div>
        <div class="hud-chip time-chip"><small>TIME</small><b id="race-time">0:00.00</b></div>
        <div class="hud-chip weather-chip-hud" id="race-weather">${Ni(e.weather)}</div>
        <button class="hud-pause" data-action="pause">${Q("pause")}</button>
      </div>
      <div class="race-minimap-wrap"><canvas id="race-minimap" width="220" height="150"></canvas><span class="map-label">CIRCUIT</span></div>
      <div class="race-compass" id="race-compass"><span class="compass-arrow">${Q("chevron")}</span><small id="race-compass-dist">—</small></div>
      <div class="race-message" id="race-message"></div>
      <div class="countdown" id="race-countdown"></div>
      <div class="finish-flash" id="race-finish"></div>
      <div class="speed-panel">
        <div class="speed-value"><b id="race-speed">0</b><small>KM/H</small></div>
        <div class="boost-meter"><div class="boost-fill" id="race-boost"></div><span>BROOM MAGIC</span></div>
      </div>
      <div class="race-objective" id="race-objective">${Q("hoop")} <span>Follow the golden hoops</span></div>
      ${this.baseControls()}
      <div class="speedlines"></div>
      <div class="hit-flash"></div>
    </div>`,this.cacheHUD(),this.els.hud.querySelectorAll("[data-action]").forEach(n=>{n.addEventListener("click",s=>{s.preventDefault(),this.game.handleUI(n.dataset.action,n.dataset.value,n.dataset)})})}cacheHUD(){const t=e=>document.getElementById(e);this.hudEls={lap:t("race-lap"),pos:t("race-pos"),time:t("race-time"),speed:t("race-speed"),boost:t("race-boost"),weather:t("race-weather"),message:t("race-message"),countdown:t("race-countdown"),finish:t("race-finish"),compass:t("race-compass"),compassDist:t("race-compass-dist"),objective:t("race-objective"),minimap:t("race-minimap"),hud:t("race-hud"),qScoreP:t("quid-score-p"),qScoreO:t("quid-score-o"),qClock:t("quid-clock"),qAction:t("quid-action"),qPass:t("quid-pass"),qBoost:t("quid-boost"),qCommentary:t("quid-commentary"),qObjective:t("quid-objective"),qMinimap:t("quid-minimap"),qCountdown:t("quid-countdown"),qBanner:t("quid-banner"),qWarning:t("quid-warning"),qRound:t("quid-round"),qFlash:t("quid-score-flash"),qActionCooldown:t("quid-action-cooldown")}}updateRaceHUD(t){var n;const e=this.hudEls;if(e.lap){if(e.lap.textContent=`${t.lap}/${t.laps}`,e.pos.textContent=t.pos,e.pos.parentElement.classList.toggle("first",t.pos===1),e.time.textContent=ei(t.time),e.speed.textContent=t.speed,e.boost.style.width=`${Math.round(t.boost*100)}%`,e.boost.classList.toggle("full",t.boost>.98),(n=e.hud)==null||n.classList.toggle("boosting",!!t.boostHeld),e.weather.textContent=Ni(t.weather),e.weather.dataset.weather=t.weather,t.beacon&&t.player){const s=t.beacon.x-t.player.pos.x,a=t.beacon.z-t.player.pos.z;let o=Math.atan2(-s,-a)-t.player.yaw;for(;o>Math.PI;)o-=Math.PI*2;for(;o<-Math.PI;)o+=Math.PI*2;const l=e.compass.querySelector(".compass-arrow");l&&(l.style.transform=`rotate(${-o}rad)`);const c=Math.hypot(s,a,(t.beacon.y||0)-t.player.pos.y);e.compassDist.textContent=`${Math.round(c)}m`,e.objective.querySelector("span").textContent=c<55?"Through the next hoop!":"Follow the golden hoops"}this.drawRaceMinimap(t)}}drawRaceMinimap(t){var x,S;const e=this.hudEls.minimap;if(!e)return;const n=e.getContext("2d"),s=e.width,a=e.height;n.clearRect(0,0,s,a);const r=(x=this.game.active)==null?void 0:x.track;if(!r)return;const o=r.points;let l=1/0,c=-1/0,h=1/0,d=-1/0;for(const R of o)l=Math.min(l,R[0]),c=Math.max(c,R[0]),h=Math.min(h,R[2]),d=Math.max(d,R[2]);const u=22,m=(s-u*2)/(c-l||1),g=(a-u*2)/(d-h||1),_=Math.min(m,g),p=(R,C)=>[s/2+(R-(l+c)/2)*_,a/2+(C-(h+d)/2)*_];n.fillStyle="rgba(9,15,25,0.62)",n.fillRect(0,0,s,a),n.strokeStyle="rgba(255,221,150,0.28)",n.lineWidth=3,n.beginPath(),o.forEach((R,C)=>{const[A,L]=p(R[0],R[2]);C===0?n.moveTo(A,L):n.lineTo(A,L)}),n.closePath(),n.stroke(),(((S=this.game.active)==null?void 0:S.world.gates)||[]).forEach((R,C)=>{const[A,L]=p(R.pos.x,R.pos.z),I=C===t.nextGate%o.length;n.beginPath(),n.arc(A,L,I?4.2:2.3,0,Math.PI*2),n.fillStyle=R.mod==="warp"?"#bb8bff":I?"#ffe08a":"rgba(180,220,240,0.55)",n.fill()});for(const R of t.ais||[]){if(R.finished)continue;(R.lap-1+R.u)/this.game.active.laps;const C=this.game.active.world.curve.getPointAt(Math.min(.999,R.u)),[A,L]=p(C.x,C.z);n.beginPath(),n.arc(A,L,2.4,0,Math.PI*2),n.fillStyle="rgba(200,215,235,0.7)",n.fill()}const[f,b]=p(t.player.pos.x,t.player.pos.z);n.save(),n.translate(f,b),n.rotate(-t.player.yaw),n.beginPath(),n.moveTo(0,-8),n.lineTo(5.5,6),n.lineTo(0,3),n.lineTo(-5.5,6),n.closePath(),n.fillStyle="#ffd873",n.fill(),n.strokeStyle="#2a1b0a",n.lineWidth=1,n.stroke(),n.restore()}raceCountdown(t,e=""){const n=this.hudEls.countdown;n&&(n.textContent=t,n.className=`countdown ${e||""} ${t?"show":""}`)}raceMessage(t,e="info"){const n=this.hudEls.message;n&&(n.innerHTML=`<span class="msg-mark">${e==="danger"?"⚠":e==="gold"?"✦":"◆"}</span>${Ie(t)}`,n.className=`race-message show ${e}`,clearTimeout(this._msgTimer),this._msgTimer=setTimeout(()=>n.classList.remove("show"),3200))}raceHit(){const t=this.hudEls.hud;t&&(t.classList.remove("hit"),t.offsetWidth,t.classList.add("hit"))}raceFinishFlash(t){const e=this.hudEls.finish;e&&(e.innerHTML=`<small>FINISH</small><b>${t}${t===1?"st":t===2?"nd":t===3?"rd":"th"}</b>`,e.classList.add("show"))}showQuidditchHUD(t){var e;this.els.topbar.classList.add("hidden"),this.els.nav.classList.add("hidden"),document.body.classList.add("in-game","quid-game"),this.els.hud.innerHTML=`<div class="hud quid-hud" id="quid-hud">
      <div class="scoreboard">
        <div class="team-block player-team" style="--c:${t.nation.colors[0]};--ca:${t.nation.accent}">
          ${Kn(t.nation,"small")}<div><small>${t.nation.name}</small><b id="quid-score-p">0</b></div>
        </div>
        <div class="match-clock"><small id="quid-round">${t.roundName.toUpperCase()}</small><b id="quid-clock">2:50</b><span class="clock-underline"></span></div>
        <div class="team-block opp-team" style="--c:${t.opponent.colors[0]};--ca:${t.opponent.accent}">
          <div><small>${t.opponent.name}</small><b id="quid-score-o">0</b></div>${Kn(t.opponent,"small")}
        </div>
        <button class="hud-pause" data-action="pause">${Q("pause")}</button>
      </div>
      <div class="quid-commentary" id="quid-commentary"><span>✦</span> The Quaffle is released — the World Cup is alive!</div>
      <div class="quid-objective" id="quid-objective"><span class="obj-dot"></span><b>Role</b><span>—</span></div>
      <div class="quid-warning" id="quid-warning"></div>
      <div class="quid-minimap-wrap"><canvas id="quid-minimap" width="200" height="130"></canvas><span class="map-label">PITCH</span></div>
      <div class="role-chip" id="quid-role">${Q(t.roleInfo.icon)} ${t.roleInfo.name}</div>
      <div class="quid-boost"><div class="boost-meter"><div class="boost-fill" id="quid-boost"></div><span>FLIGHT</span></div></div>
      <div class="quid-actions">
        <button class="round-btn boost" id="btn-boost">${Q("bolt")}<span>BOOST</span></button>
        <button class="round-btn action" id="btn-action">${Q(t.roleInfo.icon)}<span id="quid-action">${t.actionLabel()}</span><i class="cooldown-ring" id="quid-action-cooldown"></i></button>
        <button class="round-btn pass hidden" id="btn-pass">${Q("quaffle")}<span>PASS</span></button>
      </div>
      <div class="countdown quid-countdown" id="quid-countdown"></div>
      <div class="quid-banner" id="quid-banner"></div>
      <div class="quid-score-flash" id="quid-score-flash"></div>
      <div class="speedlines"></div>
      <div class="hit-flash"></div>
      ${this.baseControls()}
    </div>`,(e=this.els.hud.querySelector(".action-cluster"))==null||e.remove(),this.cacheHUD(),this._qTimer=null,this.els.hud.querySelectorAll("[data-action]").forEach(n=>{n.addEventListener("click",s=>{s.preventDefault(),this.game.handleUI(n.dataset.action,n.dataset.value,n.dataset)})})}updateQuidditchHUD(t){const e=this.hudEls;if(!e.qScoreP)return;e.qScoreP.textContent=t.scorePlayer,e.qScoreO.textContent=t.scoreOpp,e.qClock.textContent=L0(t.timeLeft),e.qClock.classList.toggle("urgent",t.timeLeft<30),e.qBoost.style.width=`${Math.round(t.boost*100)}%`;const n=this.els.hud.querySelector("#quid-action");n&&(n.textContent=t.action);const s=document.getElementById("btn-action");s&&(s.disabled=t.actionCooldown>0);const a=document.getElementById("quid-action-cooldown");a&&a.style.setProperty("--cd",`${Math.max(0,Math.min(1,t.actionCooldown/2))*360}deg`);const r=document.getElementById("btn-pass");r&&r.classList.toggle("hidden",!t.pass),this.els.hud.classList.toggle("boosting",t.boost>=.99);let o="";if(t.incoming?o=`SHOT INCOMING — dive to the ${t.incoming.y>16?"top":t.incoming.y<11?"low":"middle"} hoop!`:t.role==="chaser"?t.carrying?o=`Steer toward the glowing hoop and SHOOT${t.aimTargetY==null?"":` · ${t.aimTargetY>16?"TOP":t.aimTargetY<11?"LOW":"MIDDLE"} HOOP LINED UP`}`:o="Chase the Quaffle — steal it or scoop it up":t.role==="beater"?o="Protect your carrier — SMASH a Bludger at a rival":t.role==="keeper"?o="Guard all three hoops — DIVE when a shot comes":o=t.snitchReleased?"The Snitch is loose — chase it down and GRAB":"Watch the skies — the Snitch appears soon",e.qObjective&&(e.qObjective.innerHTML=`<span class="obj-dot"></span><b>${t.roleInfo.name}</b><span>${o}</span>`,e.qObjective.classList.toggle("danger",!!t.incoming)),t.incoming){const l=document.getElementById("quid-warning");l&&(l.textContent="INCOMING SHOT",l.classList.add("show"))}else{const l=document.getElementById("quid-warning");l&&l.classList.remove("show")}this.drawQuidditchMinimap(t)}drawQuidditchMinimap(t){const e=this.hudEls.qMinimap;if(!e)return;const n=e.getContext("2d"),s=e.width,a=e.height;n.clearRect(0,0,s,a),n.fillStyle="rgba(9,15,25,0.65)",n.fillRect(0,0,s,a);const r=s/2,o=a/2,l=(s-24)/180,c=(a-20)/104,h=(p,f)=>[r+p*l,o+f*c];n.strokeStyle="rgba(220,235,210,0.4)",n.lineWidth=1.5,n.beginPath(),n.ellipse(r,o,86*l,50*c,0,0,Math.PI*2),n.stroke(),n.beginPath(),n.moveTo(r,o-50*c),n.lineTo(r,o+50*c),n.stroke(),n.strokeStyle="rgba(225,190,90,0.9)",n.lineWidth=2;for(const p of[[-88,8.5],[-88,13.5],[-88,18.5],[88,8.5],[88,13.5],[88,18.5]]){const[f,b]=h(p[0],0);n.beginPath(),n.arc(f,b,3,0,Math.PI*2),n.stroke()}for(const p of t.opponents||[]){if(!p.model)continue;const[f,b]=h(p.model.position.x,p.model.position.z);n.beginPath(),n.arc(f,b,2.3,0,Math.PI*2),n.fillStyle="#c26868",n.fill()}for(const p of t.teammates||[]){if(!p.model)continue;const[f,b]=h(p.model.position.x,p.model.position.z);n.beginPath(),n.arc(f,b,2.1,0,Math.PI*2),n.fillStyle="rgba(160,210,230,0.8)",n.fill()}const d=t.quafflePos,[u,m]=h(d.x,d.z);if(n.beginPath(),n.arc(u,m,3,0,Math.PI*2),n.fillStyle="#ff8a6b",n.fill(),t.snitchVisible){const[p,f]=h(t.snitchPos.x,t.snitchPos.z);n.beginPath(),n.arc(p,f,3.4,0,Math.PI*2),n.fillStyle="#ffe08a",n.fill(),n.strokeStyle="rgba(255,224,138,0.5)",n.beginPath(),n.arc(p,f,7,0,Math.PI*2),n.stroke()}const[g,_]=h(t.playerPos.x,t.playerPos.z);n.save(),n.translate(g,_),n.rotate(-t.playerYaw),n.beginPath(),n.moveTo(0,-7),n.lineTo(5,5),n.lineTo(0,2.5),n.lineTo(-5,5),n.closePath(),n.fillStyle="#ffd873",n.fill(),n.restore()}quidditchCountdown(t){const e=this.hudEls.qCountdown;e&&(e.textContent=t,e.classList.toggle("show",!!t))}quidditchMessage(t,e="info"){const n=this.hudEls.qCommentary;n&&(n.innerHTML=`<span>${e==="danger"?"⚠":"✦"}</span> ${Ie(t)}`,n.classList.remove("flash"),n.offsetWidth,n.classList.add("flash"),this.lastComment=t)}quidditchBanner(t){const e=this.hudEls.qBanner;e&&(e.textContent=t,e.classList.add("show"),clearTimeout(this._qBanner),this._qBanner=setTimeout(()=>e.classList.remove("show"),2600))}quidditchWarning(t){const e=this.hudEls.qWarning;e&&(e.textContent=t,e.classList.add("show"),clearTimeout(this._qWarn),this._qWarn=setTimeout(()=>e.classList.remove("show"),2e3),this.game.audio.sfx("hit"))}quidditchHint(t){(!this.lastHint||performance.now()-this.lastHint>4e3)&&(this.lastHint=performance.now(),this.quidditchMessage(t,"info"))}quidditchScoreFlash(t,e){const n=this.hudEls.qFlash;if(!n)return;let s=t;typeof t!="string"&&(s=t==="player"?e?"+10 GOAL":"SAVED":e?"+10 OPPONENT":"SAVED"),n.textContent=s,n.className=`quid-score-flash show ${e?"good":"bad"}`,clearTimeout(this._qFlash),this._qFlash=setTimeout(()=>n.classList.remove("show"),1700)}quidditchFlashAction(t){this.quidditchScoreFlash(t,!1)}hideHUD(){this.els.hud.innerHTML="",this.hudEls={},document.body.classList.remove("in-game","quid-game"),this.els.topbar.classList.remove("hidden"),this.els.nav.classList.remove("hidden"),this.renderChrome()}}class Q0{constructor(t){this.game=t,this.joy={x:0,y:0},this.raw={x:0,y:0},this.joyHome={x:0,y:0},this.joyOrigin={x:0,y:0},this.joyMax=42,this.boost=!1,this.brake=!1,this.action=!1,this.pass=!1,this.keys={},this.touchId=null,this.touchActive=!1,this.btnBoost=!1,this.btnBrake=!1,this.abort=null,window.addEventListener("keydown",e=>{["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "].includes(e.key)&&e.preventDefault(),this.keys[e.code]=!0,e.code==="Space"&&!e.repeat&&(this.action=!0),e.code==="KeyF"&&!e.repeat&&(this.action=!0),e.code==="KeyE"&&!e.repeat&&(this.pass=!0),e.code==="Escape"&&this.game.handleUI("pause")}),window.addEventListener("keyup",e=>{this.keys[e.code]=!1}),window.addEventListener("blur",()=>this.clear())}bindRace(){this.bindHUD(!1)}bindQuidditch(){this.bindHUD(!0)}bindHUD(t){this.unbind(),this.abort=new AbortController;const e=this.abort.signal,n=document.getElementById("joystick-zone"),s=document.getElementById("joystick-knob");if(n){const r=l=>{if(l.pointerId!==this.touchId)return;let c=(l.clientX-this.joyOrigin.x)/this.joyMax,h=(l.clientY-this.joyOrigin.y)/this.joyMax;const d=Math.hypot(c,h);d>1&&(c/=d,h/=d),this.raw.x=c,this.raw.y=h,s&&(s.style.transform=`translate(${this.joyHome.x+c*this.joyMax*.6}px, ${this.joyHome.y+h*this.joyMax*.6}px)`)};n.addEventListener("pointerdown",l=>{l.preventDefault(),this.touchId=l.pointerId,this.touchActive=!0,this.game.audio.init();const c=n.getBoundingClientRect(),h=c.left+c.width/2,d=c.top+c.height/2;this.joyMax=Math.max(36,c.width*.32);const u=c.width*.16;this.joyHome={x:Math.max(-u,Math.min(u,l.clientX-h)),y:Math.max(-u,Math.min(u,l.clientY-d))},this.joyOrigin={x:l.clientX,y:l.clientY},n.classList.add("active"),r(l)},{signal:e}),window.addEventListener("pointermove",l=>{this.touchActive&&r(l)},{signal:e});const o=l=>{l.pointerId===this.touchId&&(this.touchId=null,this.touchActive=!1,this.raw.x=0,this.raw.y=0,this.joyHome.x=0,this.joyHome.y=0,n.classList.remove("active"),s&&(s.style.transform="translate(0,0)"))};window.addEventListener("pointerup",o,{signal:e}),window.addEventListener("pointercancel",o,{signal:e})}const a=(r,o,l)=>{const c=document.getElementById(r);if(!c)return;c.addEventListener("pointerdown",d=>{d.preventDefault(),this.game.audio.init(),o(),c.classList.add("pressed")},{signal:e});const h=()=>{l&&l(),c.classList.remove("pressed")};c.addEventListener("pointerup",h,{signal:e}),c.addEventListener("pointercancel",h,{signal:e}),c.addEventListener("pointerleave",h,{signal:e})};a("btn-boost",()=>{this.btnBoost=!0,this.game.audio.sfx("whoosh")},()=>{this.btnBoost=!1}),a("btn-brake",()=>{this.btnBrake=!0},()=>{this.btnBrake=!1}),a("btn-action",()=>{this.action=!0},null),a("btn-pass",()=>{this.pass=!0},null)}update(t=1/60){const e=this.keys;if(!this.touchActive){let o=0,l=0;(e.ArrowLeft||e.KeyA)&&(o-=1),(e.ArrowRight||e.KeyD)&&(o+=1),(e.ArrowUp||e.KeyW)&&(l-=1),(e.ArrowDown||e.KeyS)&&(l+=1),this.raw.x=o,this.raw.y=l}const n=o=>{const l=Math.abs(o);return l<.07?0:Math.sign(o)*Math.pow((l-.07)/.93,1.16)},s=n(this.raw.x),a=n(this.raw.y),r=1-Math.exp(-t*24);this.joy.x+=(s-this.joy.x)*r,this.joy.y+=(a-this.joy.y)*r,Math.abs(this.joy.x)<.004&&(this.joy.x=0),Math.abs(this.joy.y)<.004&&(this.joy.y=0),this.boost=this.btnBoost||!!e.ShiftLeft||!!e.ShiftRight,this.brake=this.btnBrake||!!e.KeyX}consumeAction(){return this.action?(this.action=!1,!0):!1}consumePass(){return this.pass?(this.pass=!1,!0):!1}clear(){var e;this.joy.x=0,this.joy.y=0,this.raw.x=0,this.raw.y=0,this.touchActive=!1,this.touchId=null,this.joyHome.x=0,this.joyHome.y=0,this.btnBoost=!1,this.btnBrake=!1,this.boost=!1,this.brake=!1,this.action=!1,this.pass=!1;const t=document.getElementById("joystick-knob");t&&(t.style.transform="translate(0,0)"),(e=document.getElementById("joystick-zone"))==null||e.classList.remove("active")}unbind(){var t;(t=this.abort)==null||t.abort(),this.abort=null,this.clear()}}class J0{constructor(){this.state=b0(),this.audio=new F0,this.audio.attachState(this.state),this.sel={mode:"quick",trackId:"hogwarts",difficulty:"pro",role:"chaser",tactics:"balanced",qDifficulty:"pro",careerTab:"overview",lockerTab:"brooms"},this.active=null,this.preview=null,this.mode="menu",this.paused=!1,this.championship=null,this.lastRaceConfig=null,this.lastMatchConfig=null,this.t=0,this._completing=!1;const t=document.getElementById("gl");this.renderer=new c0({canvas:t,antialias:!0,powerPreference:"high-performance",alpha:!1,stencil:!1}),this.renderer.outputColorSpace=We,this.renderer.toneMapping=cc,this.renderer.toneMappingExposure=1.22,this.renderer.shadowMap.enabled=this.state.settings.quality!=="low",this.renderer.shadowMap.type=xo,this._perfAcc=0,this._perfFrames=0,this._lastFrame=performance.now(),this.applyQuality(),this.scene=null,this.camera=null,this.menu=q0(this.scene=new Ar),this.scene=this.menu.scene,this.camera=this.menu.camera,this.aspect=1,this.resize(),this.ui=new Z0(this),this.input=new Q0(this),this.clock=new x0,this.installErrors(),window.addEventListener("resize",()=>this.resize()),window.addEventListener("orientationchange",()=>setTimeout(()=>this.resize(),200)),document.addEventListener("visibilitychange",()=>{var e,n;document.hidden&&((n=(e=this.audio.ctx)==null?void 0:e.suspend)==null||n.call(e))}),this.state.created?this.ui.go("home"):this.ui.showOnboarding(),this.updateReadyTimer=setTimeout(()=>{this.ui.hideLoading(),window.__ready=!0},700),this.loop=this.loop.bind(this),requestAnimationFrame(this.loop),window.game=this,console.log("[Wizarding Sports] Ready ·",gs.length,"brooms ·",sn.length,"circuits ·",he.length,"nations")}installErrors(){window.__errors=[],window.addEventListener("error",t=>{window.__errors.push(String(t.message||t.error))}),window.addEventListener("unhandledrejection",t=>{window.__errors.push(String(t.reason))})}applyQuality(){const t=this.state.settings.quality,e=window.devicePixelRatio||1,n=t==="high"?2:t==="medium"?1.5:1;this._maxPixelRatio=Math.min(e,n),this._pixelRatio=this._maxPixelRatio,this.renderer.setPixelRatio(this._pixelRatio),this.renderer.shadowMap.enabled=t!=="low",this.renderer.shadowMap.type=t==="high"?xo:pr}trackPerformance(t){if(this._perfAcc+=t,this._perfFrames++,this._perfAcc<1.4)return;const e=this._perfFrames/this._perfAcc;this._perfAcc=0,this._perfFrames=0;const n=this.state.settings.quality==="low"?.8:.72;e<47&&this._pixelRatio>n?(this._pixelRatio=Math.max(n,this._pixelRatio*.92),this.renderer.setPixelRatio(this._pixelRatio)):e>57&&this._pixelRatio<this._maxPixelRatio&&(this._pixelRatio=Math.min(this._maxPixelRatio,this._pixelRatio*1.04),this.renderer.setPixelRatio(this._pixelRatio))}resize(){var s,a;const t=window.innerWidth,e=window.innerHeight;this.aspect=t/Math.max(1,e),this.renderer.setSize(t,e,!1),this.renderer.setPixelRatio(this._pixelRatio||this._maxPixelRatio||1);const n=((s=this.active)==null?void 0:s.camera)||((a=this.preview)==null?void 0:a.camera)||this.menu.camera;n&&(n.aspect=this.aspect,n.updateProjectionMatrix())}save(){S0(this.state),this.ui.renderChrome()}liveryColor(){var t;return((t=ki.find(e=>e.id===this.state.brooms.livery))==null?void 0:t.color)||"#e8bd5b"}loop(){var r,o,l,c;requestAnimationFrame(this.loop);const t=performance.now(),e=Math.max(1e-4,(t-this._lastFrame)/1e3);this._lastFrame=t;const n=Math.min(.05,this.clock.getDelta());this.t+=n,this.trackPerformance(e),this.input.update(n),this.paused||(this.active?this.active.update(n):this.preview?this.updatePreview(n):this.menu&&this.menu.update(this.t,n)),this.audio.update(n);const s=((r=this.active)==null?void 0:r.scene)||((o=this.preview)==null?void 0:o.scene)||this.menu.scene,a=((l=this.active)==null?void 0:l.camera)||((c=this.preview)==null?void 0:c.camera)||this.menu.camera;a&&(a.aspect=this.aspect,a.updateProjectionMatrix(),this.renderer.render(s,a))}go(t){(this.active||this.preview)&&this.leaveGame(),this.ui.closeModal(),this.audio.setMode("menu"),this.ui.go(t),this.audio.init(),this.audio.sfx("back")}leaveGame(){var t,e;if(this.paused=!1,this.ui.closeModal(),this.active){try{this.active.scene&&ea(this.active.scene),(e=(t=this.active).dispose)==null||e.call(t)}catch(n){console.warn(n)}this.active=null}if(this.preview){try{ea(this.preview.scene)}catch{}this.preview=null}this.mode="menu",this.input.unbind(),this.ui.hideHUD(),this.audio.setMode("menu"),this.ui.renderChrome()}handleUI(t,e){var n,s,a;switch(this.audio.init(),t){case"go":this.go(e);break;case"settings":this.ui.showSettings();break;case"close-modal":this.ui.closeModal();break;case"select-mode":{this.sel.mode=e,e==="championship"&&((!this.championship||this.championship.finished)&&(this.championship={round:0,points:{},finished:!1,tracks:_n.tracks}),this.sel.trackId=_n.tracks[Math.min(2,this.championship.round)]),this.ui.rerender();break}case"select-track":this.sel.mode!=="championship"?this.sel.trackId=e:this.sel.trackId=e,this.ui.rerender();break;case"select-difficulty":this.sel.difficulty=e,this.ui.rerender();break;case"select-qdifficulty":this.sel.qDifficulty=e,this.ui.rerender();break;case"select-broom":this.selectBroom(e);break;case"upgrade-broom":this.upgradeSelected(e);break;case"select-livery":this.state.brooms.livery=e,this.save(),this.ui.rerender(),this.ui.toast("Livery applied",`${((n=ki.find(o=>o.id===e))==null?void 0:n.name)||""} broom finish`,"spark");break;case"select-house":this.state.profile.house=e;const r=Ii.find(o=>o.id===e);r&&(this.state.profile.robe=r.color),this.save(),this.ui.rerender();break;case"select-robe":this.state.profile.robe=e,this.save(),this.ui.rerender();break;case"select-skin":this.state.profile.skin=e,this.save(),this.ui.rerender();break;case"select-hair":this.state.profile.hair=e,this.save(),this.ui.rerender();break;case"save-appearance":this.save(),this.ui.toast("Appearance saved","Your flyer is ready for the world stage","person");break;case"career-tab":this.sel.careerTab=e,this.ui.rerender();break;case"locker-tab":this.sel.lockerTab=e,this.ui.rerender();break;case"spend-skill":this.spendSkill(e);break;case"claim-chapter":this.claimChapter(e);break;case"select-nation":{const o=this.state.quidditch.tournament;if(o&&!o.champion&&!o.eliminated){this.ui.toast("Campaign in progress","Finish or reset the tournament to change nation","shield");break}this.state.profile.nation=e,this.state.quidditch.tournament=null,this.save(),this.ui.rerender();break}case"select-role":this.sel.role=e,this.ui.rerender();break;case"select-tactics":this.sel.tactics=e,this.ui.rerender();break;case"open-briefing":this.openBriefing();break;case"close-briefing":this.closeBriefing();break;case"begin-race":this.beginRace();break;case"race-again":this.raceAgain();break;case"next-champ-race":this.nextChampRace();break;case"start-campaign":this.startCampaign();break;case"start-match":this.startMatch();break;case"next-quid-match":this.nextQuidMatch();break;case"new-quid-campaign":this.newQuidCampaign();break;case"pause":this.pauseGame();break;case"resume":this.resumeGame();break;case"quit-game":this.quitGame();break;case"restart-current":this.restartCurrent();break;case"sub-role":(s=this.active)!=null&&s.substituteRole&&(this.active.substituteRole(e),this.sel.role=e,this.ui.showPause(this.active));break;case"change-tactics":(a=this.active)!=null&&a.setTactics&&(this.active.setTactics(e),this.sel.tactics=e,this.ui.showPause(this.active));break;case"toggle-setting":this.state.settings[e]=!this.state.settings[e],this.save(),this.ui.showSettings(),this.audio.setMode(this.mode==="quidditch"?"quid":this.mode==="race"?"race":"menu");break;case"set-quality":this.state.settings.quality=e,this.applyQuality(),this.resize(),this.save(),this.ui.showSettings();break;case"reset-save":this.ui.showConfirmReset();break;case"confirm-reset":localStorage.removeItem(Ir),location.reload();break;case"create-player":this.createPlayer();break}}handleUIField(t,e){t==="name"&&(this.state.profile.name=e.slice(0,24),this.save())}selectBroom(t){if(this.state.brooms.owned.includes(t)){this.state.brooms.selected=t,this.save(),this.ui.rerender();return}const e=T0(this.state,t);if(!e.ok){this.ui.toast("Cannot buy broom",e.reason,"close");return}this.audio.sfx("checkpoint"),this.save(),this.ui.rerender(),this.ui.toast("Broom acquired!",yn(t).name,"broom")}upgradeSelected(t){const e=this.state.brooms.selected,n=E0(this.state,e,t);if(!n.ok){this.ui.toast("Upgrade unavailable",n.reason,"close");return}this.audio.sfx("checkpoint"),this.save(),this.ui.rerender(),this.ui.toast("Upgrade complete",`${yn(e).name} · ${t} improved`,"spark")}spendSkill(t){if(!A0(this.state,t)){this.ui.toast("No skill points","Earn XP and level up to gain more","star");return}this.audio.sfx("checkpoint"),this.save(),this.ui.rerender()}claimChapter(t){const e=Oi.find(n=>n.id===t);if(e){if(!P0(this.state,e)){this.ui.toast("Not ready","Complete the chapter objective first","clock");return}_o(this.state),this.audio.sfx("win"),this.save(),this.ui.rerender(),this.ui.toast("Chapter claimed",`+${e.reward.galleons} Galleons · +${e.reward.xp} XP`,"trophy")}}createPlayer(){var e;const t=this.ui.getOnboarding();this.state.created=!0,this.state.profile.name=t.name||"Aria Blackwood",this.state.profile.house=t.house||"gryffindor",this.state.profile.robe=t.robe||"#8f1d2c",this.state.profile.skin=t.skin||"#d9a97f",this.state.profile.nation=t.nation||"england",this.save(),document.body.classList.remove("onboarding"),this.ui.closeModal(),this.audio.init(),this.audio.sfx("win"),this.ui.go("home"),this.ui.toast("Welcome to the World Cup",`${this.state.profile.name} · ${(e=he.find(n=>n.id===this.state.profile.nation))==null?void 0:e.name}`,"spark")}raceConfig(t=this.sel.trackId){let e=sn.find(n=>n.id===t)||sn[0];if(this.sel.mode==="championship"){(!this.championship||this.championship.finished)&&(this.championship={round:0,points:{},finished:!1,tracks:_n.tracks});const n=_n.tracks[Math.min(2,this.championship.round)];e=sn.find(s=>s.id===n)||sn[0],this.sel.trackId=e.id}return{track:e,broomId:this.state.brooms.selected,mode:this.sel.mode,difficulty:this.sel.difficulty,laps:this.sel.mode==="trial"||this.sel.mode==="qualify"?1:e.laps}}openBriefing(){this.audio.init(),this.ui.closeModal(),this.active&&this.leaveGame();const t=this.raceConfig(),e=nh(t.track,this.state.settings.quality),n=new Re(55,this.aspect,.1,2e3),s=e.gates[0];n.position.copy(s.pos).add(new T(28,9,28)),n.lookAt(s.pos),this.previewCfg=t,this.preview={scene:e.scene,camera:n,world:e,t:0,gate:s},this.mode="preview",this.ui.renderChrome(),this.ui.showBriefing()}updatePreview(t){if(!this.preview)return;const e=this.preview;e.t+=t,e.world.update(t,e.camera);const n=e.t*.22+.5,s=e.gate.pos,a=s.clone().add(new T(Math.cos(n)*34,9+Math.sin(e.t*.6)*2,Math.sin(n)*34));e.camera.position.lerp(a,1-Math.exp(-t*1.8)),e.camera.lookAt(s)}closeBriefing(){if(this.ui.closeModal(),this.preview){try{ea(this.preview.scene)}catch{}this.preview=null}this.mode="menu",this.previewCfg=null,this.ui.renderChrome(),this.ui.go("race")}beginRace(){if(this.ui.closeModal(),this.preview){try{ea(this.preview.scene)}catch{}this.preview=null}this.ui.els.fade.classList.add("show"),setTimeout(()=>{try{this.startRace(this.previewCfg||this.raceConfig())}catch(t){console.error(t),this.ui.toast("Unable to start race",String(t.message||t),"close"),this.mode="menu",this.ui.renderChrome()}setTimeout(()=>this.ui.els.fade.classList.remove("show"),200)},180)}startRace(t){this.leaveGame();const e=t||this.raceConfig();this.lastRaceConfig=e,e.mode==="championship"&&((!this.championship||this.championship.finished)&&(this.championship={round:0,points:{},finished:!1,tracks:_n.tracks}),e.championship={round:this.championship.round}),this.mode="race",this.paused=!1,this.active=new Y0(this,e),this.ui.renderChrome(),this.audio.init()}raceAgain(){const t=this.lastRaceConfig?{...this.lastRaceConfig}:this.raceConfig();t.mode==="championship"&&(t.mode="quick"),this.ui.closeModal(),this.startRace(t)}nextChampRace(){if(!this.championship||this.championship.finished){this.go("race");return}this.ui.closeModal(),this.startRace(this.raceConfig())}completeRace(t){var e;if(!this._completing){this._completing=!0;try{const n=Ye.find(m=>m.id===t.difficulty)||Ye[1],s=t.pos;let r=[520,360,270,200,160,120][Math.min(5,s-1)]||100,o=[190,145,115,90,75,60][Math.min(5,s-1)]||50,l=[50,35,25,16,10,6][Math.min(5,s-1)]||4;t.mode==="trial"?(r=300,o=120,l=10,t.bestLap&&t.bestLap<t.track.targetLap&&(r+=200,o+=70,l+=6,this.ui.toast("Target beaten!",`New benchmark on ${t.track.name}`,"clock"))):t.mode==="qualify"&&(r=240,o=90,l=8);const c={galleons:Math.round(r*n.reward),xp:Math.round(o*n.reward),ranking:Math.round(l*n.reward)};C0(this.state,{trackId:t.trackId,trackName:t.trackName,pos:s,time:t.totalTime,bestLap:t.bestLap,mode:t.mode,boostTime:t.boostTime});let h=null;if(t.mode==="championship"&&this.championship){const m=this.championship.tracks.length,g=this.championship.points,_=_n.points;for(const x of t.standings){const S=x.player?this.state.profile.name:x.name;g[S]=(g[S]||0)+(_[x.pos-1]||2)}const p=this.championship.round,f=p>=m-1;let b=null;f?(b=((e=Object.entries(g).sort((x,S)=>S[1]-x[1])[0])==null?void 0:e[0])||null,this.championship.finished=!0,b===this.state.profile.name&&!this.championship.awarded&&(this.championship.awarded=!0,this.state.career.championships+=1,c.galleons+=1200,c.xp+=500,c.ranking+=80,this.audio.sfx("win"),this.ui.toast("Grand Prix Champion!","The International Broom Grand Prix is yours","trophy"))):(this.championship.round+=1,this.sel.trackId=_n.tracks[this.championship.round]),h={round:p,final:f,champion:b,points:{...g}}}const d=Jl(this.state,c),u=_o(this.state);this.save(),this.ui.renderChrome(),this.ui.showRaceResults(t,c,{levels:d.levels,achievements:u,championship:h}),this.audio.setMode("menu"),d.levels>0&&this.audio.sfx("win")}finally{setTimeout(()=>{this._completing=!1},500)}}}startCampaign(){const t=this.state.quidditch.tournament;if(t&&!t.champion&&!t.eliminated){this.ui.go("quid");return}const e=he.find(n=>n.id===this.state.profile.nation)||he[0];tc(this.state),D0(this.state,e.id,this.sel.qDifficulty),this.save(),this.audio.sfx("whistle"),this.ui.rerender(),this.ui.toast("World Cup draw complete",`${e.name} enter the quarter-final`,"quaffle")}startMatch(t){this.ui.closeModal(),this.leaveGame();const e=this.state.quidditch.tournament,n=ba(this.state);if(!e||!n){this.ui.toast("No fixture available","Enter the World Cup to begin a campaign","quaffle"),this.ui.go("quid");return}const s=t||{nationId:e.nation,opponentId:n.opponentId,round:n.round,roundName:n.roundName,difficulty:e.difficulty,role:this.sel.role,tactics:this.sel.tactics};this.lastMatchConfig=s,this.mode="quidditch",this.paused=!1;try{this.active=new j0(this,s),this.ui.renderChrome(),this.audio.init()}catch(a){console.error(a),this.ui.toast("Unable to start match",String(a.message||a),"close"),this.mode="menu",this.ui.go("quid")}}completeQuidditch(t){this.state.quidditch.tournament;const e=t.round,n=U0(this.state,t.scoreFor,t.scoreAgainst),s=N0(e,t.won);n.champion&&(s.galleons+=1e3,s.xp+=400,s.ranking+=100),R0(this.state,{won:t.won,goals:t.goals,saves:t.saves,bludgers:t.bludgers,snitch:t.snitch,opponentId:t.opponentId,opponentName:t.opponentName,nationName:t.nationName,roundName:t.roundName,scoreFor:t.scoreFor,scoreAgainst:t.scoreAgainst});const a=Jl(this.state,s),r=_o(this.state);this.save(),this.ui.renderChrome();const o=ba(this.state);this.ui.showQuidditchResults(t,s,{levels:a.levels,achievements:r,tournament:this.state.quidditch.tournament,nextFixture:o,champion:n.champion,eliminated:n.eliminated}),this.audio.setMode("menu"),t.won?this.audio.sfx("win"):this.audio.sfx("lose")}nextQuidMatch(){this.ui.closeModal(),this.startMatch()}newQuidCampaign(){this.leaveGame(),this.ui.closeModal(),tc(this.state),this.startCampaign(),this.ui.go("quid")}pauseGame(){!this.active||this.paused||this.active.phase==="done"||this.active.phase==="finished"||(this.paused=!0,this.input.clear(),this.ui.showPause(this.mode==="quidditch"?this.active:null))}resumeGame(){this.paused=!1,this.ui.closeModal(),this.audio.init()}quitGame(){this.leaveGame(),this.ui.go("home")}restartCurrent(){const t=this.mode==="quidditch",e=this.lastRaceConfig?{...this.lastRaceConfig}:null,n=this.lastMatchConfig?{...this.lastMatchConfig}:null;this.ui.closeModal(),this.leaveGame(),t&&n?this.startMatch(n):e?this.startRace(e):this.go("home")}}const tg=new J0;window.addEventListener("pointerdown",()=>tg.audio.init(),{once:!0});
