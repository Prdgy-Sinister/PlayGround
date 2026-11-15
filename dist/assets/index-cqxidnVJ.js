(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const a of i)if(a.type==="childList")for(const r of a.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function t(i){const a={};return i.integrity&&(a.integrity=i.integrity),i.referrerPolicy&&(a.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?a.credentials="include":i.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(i){if(i.ep)return;i.ep=!0;const a=t(i);fetch(i.href,a)}})();const zo="187",Kd=0,xl=1,Zd=2,Pa=1,Lc=2,Ls=3,Ui=0,tn=1,rt=2,ls=0,Ds=1,je=2,yl=3,_l=4,Jd=5,rs=100,Qd=101,jd=102,eh=103,th=104,nh=200,ih=201,sh=202,ah=203,Ic=204,Dc=205,rh=206,oh=207,lh=208,ch=209,dh=210,hh=211,uh=212,fh=213,ph=214,$r=0,qr=1,Xr=2,Ns=3,Yr=4,Kr=5,Zr=6,Jr=7,Nc=0,mh=1,gh=2,ai=0,Uc=1,Fc=2,Oc=3,Bo=4,kc=5,zc=6,Bc=7,Hc=300,hs=301,Us=302,rr=303,or=304,Fa=1e3,ii=1001,Qr=1002,Xt=1003,vh=1004,Ys=1005,fn=1006,lr=1007,xi=1008,xn=1009,Gc=1010,Vc=1011,Fs=1012,Ho=1013,qn=1014,Dn=1015,Xn=1016,Go=1017,Vo=1018,us=1020,Wc=35902,$c=35899,qc=1021,Xc=1022,Vn=1023,_i=1026,yi=1027,Wo=1028,$o=1029,Fi=1030,qo=1031,Xo=1033,La=33776,Ia=33777,Da=33778,Na=33779,jr=35840,eo=35841,to=35842,no=35843,io=36196,so=37492,ao=37496,ro=37488,oo=37489,Oa=37490,lo=37491,co=37808,ho=37809,uo=37810,fo=37811,po=37812,mo=37813,go=37814,vo=37815,xo=37816,yo=37817,_o=37818,Mo=37819,bo=37820,wo=37821,So=36492,Eo=36494,To=36495,Ao=36283,Ro=36284,ka=36285,Co=36286,xh=3200,Po=0,yh=1,vi="",ln="srgb",za="srgb-linear",Ba="linear",mt="srgb",cr=7680,_h=519,Mh=512,bh=513,wh=514,Yc=515,Sh=516,Eh=517,Kc=518,Zc=519,Jc=35044,Ml="300 es",Nn=2e3,Os=2001;function Th(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function Ha(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Ah(){const s=Ha("canvas");return s.style.display="block",s}const bl={};function Ga(...s){const e="THREE."+s.shift();console.log(e,...s)}function Qc(s){const e=s[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=s[1];t&&t.isStackTrace?s[0]+=" "+t.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Ve(...s){s=Qc(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...s)}}function ct(...s){s=Qc(s);const e="THREE."+s.shift();{const t=s[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...s)}}function cs(...s){const e=s.join(" ");e in bl||(bl[e]=!0,Ve(...s))}function Rh(s,e,t){return new Promise(function(n,i){function a(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(a,t);break;default:n()}}setTimeout(a,t)})}const Ch={[$r]:$r,[Xr]:Zr,[Yr]:Yr,[Ns]:Kr,[qr]:qr,[Zr]:Xr,[Jr]:Jr,[Kr]:Ns};class ki{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const a=i.indexOf(t);a!==-1&&i.splice(a,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let a=0,r=i.length;a<r;a++)i[a].call(this,e);e.target=null}}}const Qt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],dr=Math.PI/180,Va=180/Math.PI;function zi(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Qt[s&255]+Qt[s>>8&255]+Qt[s>>16&255]+Qt[s>>24&255]+"-"+Qt[e&255]+Qt[e>>8&255]+"-"+Qt[e>>16&15|64]+Qt[e>>24&255]+"-"+Qt[t&63|128]+Qt[t>>8&255]+"-"+Qt[t>>16&255]+Qt[t>>24&255]+Qt[n&255]+Qt[n>>8&255]+Qt[n>>16&255]+Qt[n>>24&255]).toLowerCase()}function tt(s,e,t){return Math.max(e,Math.min(t,s))}function Ph(s,e){return(s%e+e)%e}function hr(s,e,t){return(1-t)*s+t*e}function Lh(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Qa(s){switch(s.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function jc(s,e){if(e.constructor===Float32Array)return s;const t=Qa(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(s/t,-1)}function ed(s,e){if(e.constructor===Float32Array)return s;const t=Qa(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(s*t)}const il=class il{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),a=this.x-e.x,r=this.y-e.y;return this.x=a*n-r*i+e.x,this.y=a*i+r*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};il.prototype.isVector2=!0;let $e=il;class ms{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,a,r,o){let l=n[i+0],c=n[i+1],d=n[i+2],u=n[i+3],h=a[r+0],f=a[r+1],g=a[r+2],v=a[r+3];if(u!==v||l!==h||c!==f||d!==g){let m=l*h+c*f+d*g+u*v;m<0&&(h=-h,f=-f,g=-g,v=-v,m=-m);let p=1-o;if(m<.9995){const x=Math.acos(m),M=Math.sin(x);p=Math.sin(p*x)/M,o=Math.sin(o*x)/M,l=l*p+h*o,c=c*p+f*o,d=d*p+g*o,u=u*p+v*o}else{l=l*p+h*o,c=c*p+f*o,d=d*p+g*o,u=u*p+v*o;const x=1/Math.sqrt(l*l+c*c+d*d+u*u);l*=x,c*=x,d*=x,u*=x}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,a,r){const o=n[i],l=n[i+1],c=n[i+2],d=n[i+3],u=a[r],h=a[r+1],f=a[r+2],g=a[r+3];return e[t]=o*g+d*u+l*f-c*h,e[t+1]=l*g+d*h+c*u-o*f,e[t+2]=c*g+d*f+o*h-l*u,e[t+3]=d*g-o*u-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,a=e._z,r=e._order,o=Math.cos,l=Math.sin,c=o(n/2),d=o(i/2),u=o(a/2),h=l(n/2),f=l(i/2),g=l(a/2);switch(r){case"XYZ":this._x=h*d*u+c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u-h*f*g;break;case"YXZ":this._x=h*d*u+c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u+h*f*g;break;case"ZXY":this._x=h*d*u-c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u-h*f*g;break;case"ZYX":this._x=h*d*u-c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u+h*f*g;break;case"YZX":this._x=h*d*u+c*f*g,this._y=c*f*u+h*d*g,this._z=c*d*g-h*f*u,this._w=c*d*u-h*f*g;break;case"XZY":this._x=h*d*u-c*f*g,this._y=c*f*u-h*d*g,this._z=c*d*g+h*f*u,this._w=c*d*u+h*f*g;break;default:Ve("Quaternion: .setFromEuler() encountered an unknown order: "+r)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],a=t[8],r=t[1],o=t[5],l=t[9],c=t[2],d=t[6],u=t[10],h=n+o+u;if(h>0){const f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(d-l)*f,this._y=(a-c)*f,this._z=(r-i)*f}else if(n>o&&n>u){const f=2*Math.sqrt(1+n-o-u);this._w=(d-l)/f,this._x=.25*f,this._y=(i+r)/f,this._z=(a+c)/f}else if(o>u){const f=2*Math.sqrt(1+o-n-u);this._w=(a-c)/f,this._x=(i+r)/f,this._y=.25*f,this._z=(l+d)/f}else{const f=2*Math.sqrt(1+u-n-o);this._w=(r-i)/f,this._x=(a+c)/f,this._y=(l+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(tt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,a=e._z,r=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=n*d+r*o+i*c-a*l,this._y=i*d+r*l+a*o-n*c,this._z=a*d+r*c+n*l-i*o,this._w=r*d-n*o-i*l-a*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,a=e._z,r=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,a=-a,r=-r,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),d=Math.sin(c);l=Math.sin(l*c)/d,t=Math.sin(t*c)/d,this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+a*t,this._w=this._w*l+r*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+i*t,this._z=this._z*l+a*t,this._w=this._w*l+r*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),a=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),a*Math.sin(t),a*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const sl=class sl{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(wl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(wl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,a=e.elements;return this.x=a[0]*t+a[3]*n+a[6]*i,this.y=a[1]*t+a[4]*n+a[7]*i,this.z=a[2]*t+a[5]*n+a[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,a=e.elements,r=1/(a[3]*t+a[7]*n+a[11]*i+a[15]);return this.x=(a[0]*t+a[4]*n+a[8]*i+a[12])*r,this.y=(a[1]*t+a[5]*n+a[9]*i+a[13])*r,this.z=(a[2]*t+a[6]*n+a[10]*i+a[14])*r,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,a=e.x,r=e.y,o=e.z,l=e.w,c=2*(r*i-o*n),d=2*(o*t-a*i),u=2*(a*n-r*t);return this.x=t+l*c+r*u-o*d,this.y=n+l*d+o*c-a*u,this.z=i+l*u+a*d-r*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i,this.y=a[1]*t+a[5]*n+a[9]*i,this.z=a[2]*t+a[6]*n+a[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this.z=tt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this.z=tt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,a=e.z,r=t.x,o=t.y,l=t.z;return this.x=i*l-a*o,this.y=a*r-n*l,this.z=n*o-i*r,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return ur.copy(this).projectOnVector(e),this.sub(ur)}reflect(e){return this.sub(ur.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(tt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};sl.prototype.isVector3=!0;let L=sl;const ur=new L,wl=new ms,al=class al{constructor(e,t,n,i,a,r,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,a,r,o,l,c)}set(e,t,n,i,a,r,o,l,c){const d=this.elements;return d[0]=e,d[1]=i,d[2]=o,d[3]=t,d[4]=a,d[5]=l,d[6]=n,d[7]=r,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,a=this.elements,r=n[0],o=n[3],l=n[6],c=n[1],d=n[4],u=n[7],h=n[2],f=n[5],g=n[8],v=i[0],m=i[3],p=i[6],x=i[1],M=i[4],_=i[7],E=i[2],T=i[5],y=i[8];return a[0]=r*v+o*x+l*E,a[3]=r*m+o*M+l*T,a[6]=r*p+o*_+l*y,a[1]=c*v+d*x+u*E,a[4]=c*m+d*M+u*T,a[7]=c*p+d*_+u*y,a[2]=h*v+f*x+g*E,a[5]=h*m+f*M+g*T,a[8]=h*p+f*_+g*y,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*r*d-t*o*c-n*a*d+n*o*l+i*a*c-i*r*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=d*r-o*c,h=o*l-d*a,f=c*a-r*l,g=t*u+n*h+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return e[0]=u*v,e[1]=(i*c-d*n)*v,e[2]=(o*n-i*r)*v,e[3]=h*v,e[4]=(d*t-i*l)*v,e[5]=(i*a-o*t)*v,e[6]=f*v,e[7]=(n*l-c*t)*v,e[8]=(r*t-n*a)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,a,r,o){const l=Math.cos(a),c=Math.sin(a);return this.set(n*l,n*c,-n*(l*r+c*o)+r+e,-i*c,i*l,-i*(-c*r+l*o)+o+t,0,0,1),this}scale(e,t){return cs("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(fr.makeScale(e,t)),this}rotate(e){return cs("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(fr.makeRotation(-e)),this}translate(e,t){return cs("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(fr.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};al.prototype.isMatrix3=!0;let Xe=al;const fr=new Xe,Sl=new Xe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),El=new Xe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Ih(){const s={enabled:!0,workingColorSpace:za,spaces:{},convert:function(i,a,r){return this.enabled===!1||a===r||!a||!r||(this.spaces[a].transfer===mt&&(i.r=ri(i.r),i.g=ri(i.g),i.b=ri(i.b)),this.spaces[a].primaries!==this.spaces[r].primaries&&(i.applyMatrix3(this.spaces[a].toXYZ),i.applyMatrix3(this.spaces[r].fromXYZ)),this.spaces[r].transfer===mt&&(i.r=ds(i.r),i.g=ds(i.g),i.b=ds(i.b))),i},workingToColorSpace:function(i,a){return this.convert(i,this.workingColorSpace,a)},colorSpaceToWorking:function(i,a){return this.convert(i,a,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===vi?Ba:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,a=this.workingColorSpace){return i.fromArray(this.spaces[a].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,a,r){return i.copy(this.spaces[r].fromXYZ).multiply(this.spaces[a].toXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[za]:{primaries:e,whitePoint:n,transfer:Ba,toXYZ:Sl,fromXYZ:El,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:ln},outputColorSpaceConfig:{drawingBufferColorSpace:ln}},[ln]:{primaries:e,whitePoint:n,transfer:mt,toXYZ:Sl,fromXYZ:El,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:ln}}}),s}const at=Ih();function ri(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function ds(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Vi;class Dh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Vi===void 0&&(Vi=Ha("canvas")),Vi.width=e.width,Vi.height=e.height;const i=Vi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Vi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=Ha("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),a=i.data;for(let r=0;r<a.length;r++)a[r]=ri(a[r]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ri(t[n]/255)*255):t[n]=ri(t[n]);return{data:t,width:e.width,height:e.height}}else return Ve("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Nh=0;class Yo{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:Nh++}),this.uuid=zi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let a;if(Array.isArray(i)){a=[];for(let r=0,o=i.length;r<o;r++)i[r].isDataTexture?a.push(pr(i[r].image)):a.push(pr(i[r]))}else a=pr(i);n.url=a}return t||(e.images[this.uuid]=n),n}}function pr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Dh.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Ve("Texture: Unable to serialize Texture."),{})}let Uh=0;const mr=new L;class nn extends ki{constructor(e=nn.DEFAULT_IMAGE,t=nn.DEFAULT_MAPPING,n=ii,i=ii,a=fn,r=xi,o=Vn,l=xn,c=nn.DEFAULT_ANISOTROPY,d=vi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Uh++}),this.uuid=zi(),this.name="",this.source=new Yo(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=a,this.minFilter=r,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new $e(0,0),this.repeat=new $e(1,1),this.center=new $e(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Xe,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(mr).x}get height(){return this.source.getSize(mr).y}get depth(){return this.source.getSize(mr).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){Ve(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ve(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Hc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Fa:e.x=e.x-Math.floor(e.x);break;case ii:e.x=e.x<0?0:1;break;case Qr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Fa:e.y=e.y-Math.floor(e.y);break;case ii:e.y=e.y<0?0:1;break;case Qr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}nn.DEFAULT_IMAGE=null;nn.DEFAULT_MAPPING=Hc;nn.DEFAULT_ANISOTROPY=1;const rl=class rl{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,a=this.w,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i+r[12]*a,this.y=r[1]*t+r[5]*n+r[9]*i+r[13]*a,this.z=r[2]*t+r[6]*n+r[10]*i+r[14]*a,this.w=r[3]*t+r[7]*n+r[11]*i+r[15]*a,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,a;const l=e.elements,c=l[0],d=l[4],u=l[8],h=l[1],f=l[5],g=l[9],v=l[2],m=l[6],p=l[10];if(Math.abs(d-h)<.01&&Math.abs(u-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(d+h)<.1&&Math.abs(u+v)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const M=(c+1)/2,_=(f+1)/2,E=(p+1)/2,T=(d+h)/4,y=(u+v)/4,b=(g+m)/4;return M>_&&M>E?M<.01?(n=0,i=.707106781,a=.707106781):(n=Math.sqrt(M),i=T/n,a=y/n):_>E?_<.01?(n=.707106781,i=0,a=.707106781):(i=Math.sqrt(_),n=T/i,a=b/i):E<.01?(n=.707106781,i=.707106781,a=0):(a=Math.sqrt(E),n=y/a,i=b/a),this.set(n,i,a,t),this}let x=Math.sqrt((m-g)*(m-g)+(u-v)*(u-v)+(h-d)*(h-d));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(u-v)/x,this.z=(h-d)/x,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=tt(this.x,e.x,t.x),this.y=tt(this.y,e.y,t.y),this.z=tt(this.z,e.z,t.z),this.w=tt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=tt(this.x,e,t),this.y=tt(this.y,e,t),this.z=tt(this.z,e,t),this.w=tt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(tt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};rl.prototype.isVector4=!0;let Rt=rl;class Fh extends ki{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:fn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Rt(0,0,e,t),this.scissorTest=!1,this.viewport=new Rt(0,0,e,t),this.textures=[];const i=n.count;for(let a=0;a<i;a++)this.textures[a]=new nn({width:e,height:t,depth:n.depth}),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:fn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,a=this.textures.length;i<a;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Yo(i)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Wn extends Fh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class td extends nn{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Oh extends nn{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Xt,this.minFilter=Xt,this.wrapR=ii,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const Ja=class Ja{constructor(e,t,n,i,a,r,o,l,c,d,u,h,f,g,v,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,a,r,o,l,c,d,u,h,f,g,v,m)}set(e,t,n,i,a,r,o,l,c,d,u,h,f,g,v,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=a,p[5]=r,p[9]=o,p[13]=l,p[2]=c,p[6]=d,p[10]=u,p[14]=h,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ja().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,i=1/Wi.setFromMatrixColumn(e,0).length(),a=1/Wi.setFromMatrixColumn(e,1).length(),r=1/Wi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*a,t[5]=n[5]*a,t[6]=n[6]*a,t[7]=0,t[8]=n[8]*r,t[9]=n[9]*r,t[10]=n[10]*r,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,a=e.z,r=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),d=Math.cos(a),u=Math.sin(a);if(e.order==="XYZ"){const h=r*d,f=r*u,g=o*d,v=o*u;t[0]=l*d,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=h-v*c,t[9]=-o*l,t[2]=v-h*c,t[6]=g+f*c,t[10]=r*l}else if(e.order==="YXZ"){const h=l*d,f=l*u,g=c*d,v=c*u;t[0]=h+v*o,t[4]=g*o-f,t[8]=r*c,t[1]=r*u,t[5]=r*d,t[9]=-o,t[2]=f*o-g,t[6]=v+h*o,t[10]=r*l}else if(e.order==="ZXY"){const h=l*d,f=l*u,g=c*d,v=c*u;t[0]=h-v*o,t[4]=-r*u,t[8]=g+f*o,t[1]=f+g*o,t[5]=r*d,t[9]=v-h*o,t[2]=-r*c,t[6]=o,t[10]=r*l}else if(e.order==="ZYX"){const h=r*d,f=r*u,g=o*d,v=o*u;t[0]=l*d,t[4]=g*c-f,t[8]=h*c+v,t[1]=l*u,t[5]=v*c+h,t[9]=f*c-g,t[2]=-c,t[6]=o*l,t[10]=r*l}else if(e.order==="YZX"){const h=r*l,f=r*c,g=o*l,v=o*c;t[0]=l*d,t[4]=v-h*u,t[8]=g*u+f,t[1]=u,t[5]=r*d,t[9]=-o*d,t[2]=-c*d,t[6]=f*u+g,t[10]=h-v*u}else if(e.order==="XZY"){const h=r*l,f=r*c,g=o*l,v=o*c;t[0]=l*d,t[4]=-u,t[8]=c*d,t[1]=h*u+v,t[5]=r*d,t[9]=f*u-g,t[2]=g*u-f,t[6]=o*d,t[10]=v*u+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(kh,e,zh)}lookAt(e,t,n){const i=this.elements;return mn.subVectors(e,t),mn.lengthSq()===0&&(mn.z=1),mn.normalize(),hi.crossVectors(n,mn),hi.lengthSq()===0&&(Math.abs(n.z)===1?mn.x+=1e-4:mn.z+=1e-4,mn.normalize(),hi.crossVectors(n,mn)),hi.normalize(),Ks.crossVectors(mn,hi),i[0]=hi.x,i[4]=Ks.x,i[8]=mn.x,i[1]=hi.y,i[5]=Ks.y,i[9]=mn.y,i[2]=hi.z,i[6]=Ks.z,i[10]=mn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,a=this.elements,r=n[0],o=n[4],l=n[8],c=n[12],d=n[1],u=n[5],h=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],x=n[3],M=n[7],_=n[11],E=n[15],T=i[0],y=i[4],b=i[8],P=i[12],I=i[1],O=i[5],k=i[9],Z=i[13],R=i[2],U=i[6],F=i[10],z=i[14],j=i[3],W=i[7],te=i[11],se=i[15];return a[0]=r*T+o*I+l*R+c*j,a[4]=r*y+o*O+l*U+c*W,a[8]=r*b+o*k+l*F+c*te,a[12]=r*P+o*Z+l*z+c*se,a[1]=d*T+u*I+h*R+f*j,a[5]=d*y+u*O+h*U+f*W,a[9]=d*b+u*k+h*F+f*te,a[13]=d*P+u*Z+h*z+f*se,a[2]=g*T+v*I+m*R+p*j,a[6]=g*y+v*O+m*U+p*W,a[10]=g*b+v*k+m*F+p*te,a[14]=g*P+v*Z+m*z+p*se,a[3]=x*T+M*I+_*R+E*j,a[7]=x*y+M*O+_*U+E*W,a[11]=x*b+M*k+_*F+E*te,a[15]=x*P+M*Z+_*z+E*se,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],a=e[12],r=e[1],o=e[5],l=e[9],c=e[13],d=e[2],u=e[6],h=e[10],f=e[14],g=e[3],v=e[7],m=e[11],p=e[15],x=l*f-c*h,M=o*f-c*u,_=o*h-l*u,E=r*f-c*d,T=r*h-l*d,y=r*u-o*d;return t*(v*x-m*M+p*_)-n*(g*x-m*E+p*T)+i*(g*M-v*E+p*y)-a*(g*_-v*T+m*y)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],i=e[8],a=e[1],r=e[5],o=e[9],l=e[2],c=e[6],d=e[10];return t*(r*d-o*c)-n*(a*d-o*l)+i*(a*c-r*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],a=e[3],r=e[4],o=e[5],l=e[6],c=e[7],d=e[8],u=e[9],h=e[10],f=e[11],g=e[12],v=e[13],m=e[14],p=e[15],x=t*o-n*r,M=t*l-i*r,_=t*c-a*r,E=n*l-i*o,T=n*c-a*o,y=i*c-a*l,b=d*v-u*g,P=d*m-h*g,I=d*p-f*g,O=u*m-h*v,k=u*p-f*v,Z=h*p-f*m,R=x*Z-M*k+_*O+E*I-T*P+y*b;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const U=1/R;return e[0]=(o*Z-l*k+c*O)*U,e[1]=(i*k-n*Z-a*O)*U,e[2]=(v*y-m*T+p*E)*U,e[3]=(h*T-u*y-f*E)*U,e[4]=(l*I-r*Z-c*P)*U,e[5]=(t*Z-i*I+a*P)*U,e[6]=(m*_-g*y-p*M)*U,e[7]=(d*y-h*_+f*M)*U,e[8]=(r*k-o*I+c*b)*U,e[9]=(n*I-t*k-a*b)*U,e[10]=(g*T-v*_+p*x)*U,e[11]=(u*_-d*T-f*x)*U,e[12]=(o*P-r*O-l*b)*U,e[13]=(t*O-n*P+i*b)*U,e[14]=(v*M-g*E-m*x)*U,e[15]=(d*E-u*M+h*x)*U,this}scale(e){const t=this.elements,n=e.x,i=e.y,a=e.z;return t[0]*=n,t[4]*=i,t[8]*=a,t[1]*=n,t[5]*=i,t[9]*=a,t[2]*=n,t[6]*=i,t[10]*=a,t[3]*=n,t[7]*=i,t[11]*=a,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),a=1-n,r=e.x,o=e.y,l=e.z,c=a*r,d=a*o;return this.set(c*r+n,c*o-i*l,c*l+i*o,0,c*o+i*l,d*o+n,d*l-i*r,0,c*l-i*o,d*l+i*r,a*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,a,r){return this.set(1,n,a,0,e,1,r,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,a=t._x,r=t._y,o=t._z,l=t._w,c=a+a,d=r+r,u=o+o,h=a*c,f=a*d,g=a*u,v=r*d,m=r*u,p=o*u,x=l*c,M=l*d,_=l*u,E=n.x,T=n.y,y=n.z;return i[0]=(1-(v+p))*E,i[1]=(f+_)*E,i[2]=(g-M)*E,i[3]=0,i[4]=(f-_)*T,i[5]=(1-(h+p))*T,i[6]=(m+x)*T,i[7]=0,i[8]=(g+M)*y,i[9]=(m-x)*y,i[10]=(1-(h+v))*y,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];const a=this.determinantAffine();if(a===0)return n.set(1,1,1),t.identity(),this;let r=Wi.set(i[0],i[1],i[2]).length();const o=Wi.set(i[4],i[5],i[6]).length(),l=Wi.set(i[8],i[9],i[10]).length();a<0&&(r=-r),Rn.copy(this);const c=1/r,d=1/o,u=1/l;return Rn.elements[0]*=c,Rn.elements[1]*=c,Rn.elements[2]*=c,Rn.elements[4]*=d,Rn.elements[5]*=d,Rn.elements[6]*=d,Rn.elements[8]*=u,Rn.elements[9]*=u,Rn.elements[10]*=u,t.setFromRotationMatrix(Rn),n.x=r,n.y=o,n.z=l,this}makePerspective(e,t,n,i,a,r,o=Nn,l=!1){const c=this.elements,d=2*a/(t-e),u=2*a/(n-i),h=(t+e)/(t-e),f=(n+i)/(n-i);let g,v;if(l)g=a/(r-a),v=r*a/(r-a);else if(o===Nn)g=-(r+a)/(r-a),v=-2*r*a/(r-a);else if(o===Os)g=-r/(r-a),v=-r*a/(r-a);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,a,r,o=Nn,l=!1){const c=this.elements,d=2/(t-e),u=2/(n-i),h=-(t+e)/(t-e),f=-(n+i)/(n-i);let g,v;if(l)g=1/(r-a),v=r/(r-a);else if(o===Nn)g=-2/(r-a),v=-(r+a)/(r-a);else if(o===Os)g=-1/(r-a),v=-a/(r-a);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Ja.prototype.isMatrix4=!0;let ut=Ja;const Wi=new L,Rn=new ut,kh=new L(0,0,0),zh=new L(1,1,1),hi=new L,Ks=new L,mn=new L,Tl=new ut,Al=new ms;class Mi{constructor(e=0,t=0,n=0,i=Mi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,a=i[0],r=i[4],o=i[8],l=i[1],c=i[5],d=i[9],u=i[2],h=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(tt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-r,a)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-tt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,a),this._z=0);break;case"ZXY":this._x=Math.asin(tt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,a));break;case"ZYX":this._y=Math.asin(-tt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,a)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(tt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-u,a)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-tt(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,a)):(this._x=Math.atan2(-d,f),this._y=0);break;default:Ve("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Tl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Tl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Al.setFromEuler(this),this.setFromQuaternion(Al,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Mi.DEFAULT_ORDER="XYZ";class nd{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Bh=0;const Rl=new L,$i=new ms,Zn=new ut,Zs=new L,xs=new L,Hh=new L,Gh=new ms,Cl=new L(1,0,0),Pl=new L(0,1,0),Ll=new L(0,0,1),Il={type:"added"},Vh={type:"removed"},qi={type:"childadded",child:null},gr={type:"childremoved",child:null};class wt extends ki{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Bh++}),this.uuid=zi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=wt.DEFAULT_UP.clone();const e=new L,t=new Mi,n=new ms,i=new L(1,1,1);function a(){n.setFromEuler(t,!1)}function r(){t.setFromQuaternion(n,void 0,!1)}t._onChange(a),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ut},normalMatrix:{value:new Xe}}),this.matrix=new ut,this.matrixWorld=new ut,this.matrixAutoUpdate=wt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new nd,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return $i.setFromAxisAngle(e,t),this.quaternion.multiply($i),this}rotateOnWorldAxis(e,t){return $i.setFromAxisAngle(e,t),this.quaternion.premultiply($i),this}rotateX(e){return this.rotateOnAxis(Cl,e)}rotateY(e){return this.rotateOnAxis(Pl,e)}rotateZ(e){return this.rotateOnAxis(Ll,e)}translateOnAxis(e,t){return Rl.copy(e).applyQuaternion(this.quaternion),this.position.add(Rl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Cl,e)}translateY(e){return this.translateOnAxis(Pl,e)}translateZ(e){return this.translateOnAxis(Ll,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Zn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Zs.copy(e):Zs.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),xs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Zn.lookAt(xs,Zs,this.up):Zn.lookAt(Zs,xs,this.up),this.quaternion.setFromRotationMatrix(Zn),i&&(Zn.extractRotation(i.matrixWorld),$i.setFromRotationMatrix(Zn),this.quaternion.premultiply($i.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(ct("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Il),qi.child=e,this.dispatchEvent(qi),qi.child=null):ct("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(Vh),gr.child=e,this.dispatchEvent(gr),gr.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Zn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Zn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Zn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Il),qi.child=e,this.dispatchEvent(qi),qi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const r=this.children[n].getObjectByProperty(e,t);if(r!==void 0)return r}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let a=0,r=i.length;a<r;a++)i[a].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xs,e,Hh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xs,Gh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,i=e.z,a=this.matrix.elements;a[12]+=t-a[0]*t-a[4]*n-a[8]*i,a[13]+=n-a[1]*t-a[5]*n-a[9]*i,a[14]+=i-a[2]*t-a[6]*n-a[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const a=this.children;for(let r=0,o=a.length;r<o;r++)a[r].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function a(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=a(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){const u=l[c];a(e.shapes,u)}else a(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(a(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(a(e.materials,this.material[l]));i.material=o}else i.material=a(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(a(e.animations,l))}}if(t){const o=r(e.geometries),l=r(e.materials),c=r(e.textures),d=r(e.images),u=r(e.shapes),h=r(e.skeletons),f=r(e.animations),g=r(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),d.length>0&&(n.images=d),u.length>0&&(n.shapes=u),h.length>0&&(n.skeletons=h),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function r(o){const l=[];for(const c in o){const d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}wt.DEFAULT_UP=new L(0,1,0);wt.DEFAULT_MATRIX_AUTO_UPDATE=!0;wt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class Le extends wt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Wh={type:"move"};class vr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Le,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Le,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new L,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new L),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Le,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new L,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new L,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,a=null,r=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){r=!0;for(const v of e.hand.values()){const m=t.getJointPose(v,n),p=this._getHandJoint(c,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.quaternion,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const d=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],h=d.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&h>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(a=t.getPose(e.gripSpace,n),a!==null&&(l.matrix.fromArray(a.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,a.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(a.linearVelocity)):l.hasLinearVelocity=!1,a.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(a.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&a!==null&&(i=a),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Wh)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=a!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new Le;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const id={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ui={h:0,s:0,l:0},Js={h:0,s:0,l:0};function xr(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class Oe{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=ln){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,at.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=at.workingColorSpace){return this.r=e,this.g=t,this.b=n,at.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=at.workingColorSpace){if(e=Ph(e,1),t=tt(t,0,1),n=tt(n,0,1),t===0)this.r=this.g=this.b=n;else{const a=n<=.5?n*(1+t):n+t-n*t,r=2*n-a;this.r=xr(r,a,e+1/3),this.g=xr(r,a,e),this.b=xr(r,a,e-1/3)}return at.colorSpaceToWorking(this,i),this}setStyle(e,t=ln){function n(a){a!==void 0&&parseFloat(a)<1&&Ve("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let a;const r=i[1],o=i[2];switch(r){case"rgb":case"rgba":if(a=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(a[4]),this.setRGB(Math.min(255,parseInt(a[1],10))/255,Math.min(255,parseInt(a[2],10))/255,Math.min(255,parseInt(a[3],10))/255,t);if(a=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(a[4]),this.setRGB(Math.min(100,parseFloat(a[1]))/100,Math.min(100,parseFloat(a[2]))/100,Math.min(100,parseFloat(a[3]))/100,t);break;case"hsl":case"hsla":if(a=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(a[4]),this.setHSL(parseFloat(a[1])/360,parseFloat(a[2])/100,parseFloat(a[3])/100,t);break;default:Ve("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const a=i[1],r=a.length;if(r===3)return this.setRGB(parseInt(a.charAt(0),16)/15,parseInt(a.charAt(1),16)/15,parseInt(a.charAt(2),16)/15,t);if(r===6)return this.setHex(parseInt(a,16),t);Ve("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=ln){const n=id[e.toLowerCase()];return n!==void 0?this.setHex(n,t):Ve("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ri(e.r),this.g=ri(e.g),this.b=ri(e.b),this}copyLinearToSRGB(e){return this.r=ds(e.r),this.g=ds(e.g),this.b=ds(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=ln){return at.workingToColorSpace(jt.copy(this),e),Math.round(tt(jt.r*255,0,255))*65536+Math.round(tt(jt.g*255,0,255))*256+Math.round(tt(jt.b*255,0,255))}getHexString(e=ln){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=at.workingColorSpace){at.workingToColorSpace(jt.copy(this),t);const n=jt.r,i=jt.g,a=jt.b,r=Math.max(n,i,a),o=Math.min(n,i,a);let l,c;const d=(o+r)/2;if(o===r)l=0,c=0;else{const u=r-o;switch(c=d<=.5?u/(r+o):u/(2-r-o),r){case n:l=(i-a)/u+(i<a?6:0);break;case i:l=(a-n)/u+2;break;case a:l=(n-i)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=at.workingColorSpace){return at.workingToColorSpace(jt.copy(this),t),e.r=jt.r,e.g=jt.g,e.b=jt.b,e}getStyle(e=ln){at.workingToColorSpace(jt.copy(this),e);const t=jt.r,n=jt.g,i=jt.b;return e!==ln?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(ui),this.setHSL(ui.h+e,ui.s+t,ui.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ui),e.getHSL(Js);const n=hr(ui.h,Js.h,t),i=hr(ui.s,Js.s,t),a=hr(ui.l,Js.l,t);return this.setHSL(n,i,a),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,a=e.elements;return this.r=a[0]*t+a[3]*n+a[6]*i,this.g=a[1]*t+a[4]*n+a[7]*i,this.b=a[2]*t+a[5]*n+a[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const jt=new Oe;Oe.NAMES=id;class ja{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Oe(e),this.density=t}clone(){return new ja(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class sd extends wt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Mi,this.environmentIntensity=1,this.environmentRotation=new Mi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Cn=new L,Jn=new L,yr=new L,Qn=new L,Xi=new L,Yi=new L,Dl=new L,_r=new L,Mr=new L,br=new L,wr=new Rt,Sr=new Rt,Er=new Rt;class bn{constructor(e=new L,t=new L,n=new L){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Cn.subVectors(e,t),i.cross(Cn);const a=i.lengthSq();return a>0?i.multiplyScalar(1/Math.sqrt(a)):i.set(0,0,0)}static getBarycoord(e,t,n,i,a){Cn.subVectors(i,t),Jn.subVectors(n,t),yr.subVectors(e,t);const r=Cn.dot(Cn),o=Cn.dot(Jn),l=Cn.dot(yr),c=Jn.dot(Jn),d=Jn.dot(yr),u=r*c-o*o;if(u===0)return a.set(0,0,0),null;const h=1/u,f=(c*l-o*d)*h,g=(r*d-o*l)*h;return a.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Qn)===null?!1:Qn.x>=0&&Qn.y>=0&&Qn.x+Qn.y<=1}static getInterpolation(e,t,n,i,a,r,o,l){return this.getBarycoord(e,t,n,i,Qn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(a,Qn.x),l.addScaledVector(r,Qn.y),l.addScaledVector(o,Qn.z),l)}static getInterpolatedAttribute(e,t,n,i,a,r){return wr.setScalar(0),Sr.setScalar(0),Er.setScalar(0),wr.fromBufferAttribute(e,t),Sr.fromBufferAttribute(e,n),Er.fromBufferAttribute(e,i),r.setScalar(0),r.addScaledVector(wr,a.x),r.addScaledVector(Sr,a.y),r.addScaledVector(Er,a.z),r}static isFrontFacing(e,t,n,i){return Cn.subVectors(n,t),Jn.subVectors(e,t),Cn.cross(Jn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Cn.subVectors(this.c,this.b),Jn.subVectors(this.a,this.b),Cn.cross(Jn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return bn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return bn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,a){return bn.getInterpolation(e,this.a,this.b,this.c,t,n,i,a)}containsPoint(e){return bn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return bn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,a=this.c;let r,o;Xi.subVectors(i,n),Yi.subVectors(a,n),_r.subVectors(e,n);const l=Xi.dot(_r),c=Yi.dot(_r);if(l<=0&&c<=0)return t.copy(n);Mr.subVectors(e,i);const d=Xi.dot(Mr),u=Yi.dot(Mr);if(d>=0&&u<=d)return t.copy(i);const h=l*u-d*c;if(h<=0&&l>=0&&d<=0&&l-d>0)return r=l/(l-d),t.copy(n).addScaledVector(Xi,r);br.subVectors(e,a);const f=Xi.dot(br),g=Yi.dot(br);if(g>=0&&f<=g)return t.copy(a);const v=f*c-l*g;if(v<=0&&c>=0&&g<=0)return o=c/(c-g),t.copy(n).addScaledVector(Yi,o);const m=d*g-f*u;if(m<=0&&u-d>=0&&f-g>=0)return Dl.subVectors(a,i),o=(u-d)/(u-d+(f-g)),t.copy(i).addScaledVector(Dl,o);const p=1/(m+v+h);return r=v*p,o=h*p,t.copy(n).addScaledVector(Xi,r).addScaledVector(Yi,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class Bi{constructor(e=new L(1/0,1/0,1/0),t=new L(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Pn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Pn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Pn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const a=n.getAttribute("position");if(t===!0&&a!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let r=0,o=a.count;r<o;r++)e.isMesh===!0?e.getVertexPosition(r,Pn):Pn.fromBufferAttribute(a,r),Pn.applyMatrix4(e.matrixWorld),this.expandByPoint(Pn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Qs.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Qs.copy(n.boundingBox)),Qs.applyMatrix4(e.matrixWorld),this.union(Qs)}const i=e.children;for(let a=0,r=i.length;a<r;a++)this.expandByObject(i[a],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Pn),Pn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(ys),js.subVectors(this.max,ys),Ki.subVectors(e.a,ys),Zi.subVectors(e.b,ys),Ji.subVectors(e.c,ys),fi.subVectors(Zi,Ki),pi.subVectors(Ji,Zi),Ri.subVectors(Ki,Ji);let t=[0,-fi.z,fi.y,0,-pi.z,pi.y,0,-Ri.z,Ri.y,fi.z,0,-fi.x,pi.z,0,-pi.x,Ri.z,0,-Ri.x,-fi.y,fi.x,0,-pi.y,pi.x,0,-Ri.y,Ri.x,0];return!Tr(t,Ki,Zi,Ji,js)||(t=[1,0,0,0,1,0,0,0,1],!Tr(t,Ki,Zi,Ji,js))?!1:(ea.crossVectors(fi,pi),t=[ea.x,ea.y,ea.z],Tr(t,Ki,Zi,Ji,js))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Pn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Pn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(jn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),jn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),jn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),jn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),jn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),jn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),jn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),jn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(jn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const jn=[new L,new L,new L,new L,new L,new L,new L,new L],Pn=new L,Qs=new Bi,Ki=new L,Zi=new L,Ji=new L,fi=new L,pi=new L,Ri=new L,ys=new L,js=new L,ea=new L,Ci=new L;function Tr(s,e,t,n,i){for(let a=0,r=s.length-3;a<=r;a+=3){Ci.fromArray(s,a);const o=i.x*Math.abs(Ci.x)+i.y*Math.abs(Ci.y)+i.z*Math.abs(Ci.z),l=e.dot(Ci),c=t.dot(Ci),d=n.dot(Ci);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}const Nt=new L,ta=new $e;let $h=0;class Ft extends ki{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:$h++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Jc,this.updateRanges=[],this.gpuType=Dn,this.version=0,this._normalizationScale=e!==void 0?Qa(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,a=this.itemSize;i<a;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)ta.fromBufferAttribute(this,t),ta.applyMatrix3(e),this.setXY(t,ta.x,ta.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix3(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyMatrix4(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.applyNormalMatrix(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Nt.fromBufferAttribute(this,t),Nt.transformDirection(e),this.setXYZ(t,Nt.x,Nt.y,Nt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,a){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i),a=this._normalize(a)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=a,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){const t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):jc(e,this.array)}_normalize(e){const t=this._normalizationScale;return t!==void 0?Math.round(e*t):ed(e,this.array)}}class ad extends Ft{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class rd extends Ft{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class ft extends Ft{constructor(e,t,n){super(new Float32Array(e),t,n)}}const qh=new Bi,_s=new L,Ar=new L;class Hi{constructor(e=new L,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):qh.setFromPoints(e).getCenter(n);let i=0;for(let a=0,r=e.length;a<r;a++)i=Math.max(i,n.distanceToSquared(e[a]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;_s.subVectors(e,this.center);const t=_s.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(_s,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Ar.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(_s.copy(e.center).add(Ar)),this.expandByPoint(_s.copy(e.center).sub(Ar))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Xh=0;const _n=new ut,Rr=new wt,Qi=new L,gn=new Bi,Ms=new Bi,Gt=new L;class _t extends ki{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Xh++}),this.uuid=zi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Th(e)?rd:ad)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const a=new Xe().getNormalMatrix(e);n.applyNormalMatrix(a),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return _n.makeRotationFromQuaternion(e),this.applyMatrix4(_n),this}rotateX(e){return _n.makeRotationX(e),this.applyMatrix4(_n),this}rotateY(e){return _n.makeRotationY(e),this.applyMatrix4(_n),this}rotateZ(e){return _n.makeRotationZ(e),this.applyMatrix4(_n),this}translate(e,t,n){return _n.makeTranslation(e,t,n),this.applyMatrix4(_n),this}scale(e,t,n){return _n.makeScale(e,t,n),this.applyMatrix4(_n),this}lookAt(e){return Rr.lookAt(e),Rr.updateMatrix(),this.applyMatrix4(Rr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Qi).negate(),this.translate(Qi.x,Qi.y,Qi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,a=e.length;i<a;i++){const r=e[i];n.push(r.x,r.y,r.z||0)}this.setAttribute("position",new ft(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const a=e[i];t.setXYZ(i,a.x,a.y,a.z||0)}e.length>t.count&&Ve("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Bi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ct("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new L(-1/0,-1/0,-1/0),new L(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const a=t[n];gn.setFromBufferAttribute(a),this.morphTargetsRelative?(Gt.addVectors(this.boundingBox.min,gn.min),this.boundingBox.expandByPoint(Gt),Gt.addVectors(this.boundingBox.max,gn.max),this.boundingBox.expandByPoint(Gt)):(this.boundingBox.expandByPoint(gn.min),this.boundingBox.expandByPoint(gn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ct('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Hi);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ct("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new L,1/0);return}if(e){const n=this.boundingSphere.center;if(gn.setFromBufferAttribute(e),t)for(let a=0,r=t.length;a<r;a++){const o=t[a];Ms.setFromBufferAttribute(o),this.morphTargetsRelative?(Gt.addVectors(gn.min,Ms.min),gn.expandByPoint(Gt),Gt.addVectors(gn.max,Ms.max),gn.expandByPoint(Gt)):(gn.expandByPoint(Ms.min),gn.expandByPoint(Ms.max))}gn.getCenter(n);let i=0;for(let a=0,r=e.count;a<r;a++)Gt.fromBufferAttribute(e,a),i=Math.max(i,n.distanceToSquared(Gt));if(t)for(let a=0,r=t.length;a<r;a++){const o=t[a],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)Gt.fromBufferAttribute(o,c),l&&(Qi.fromBufferAttribute(e,c),Gt.add(Qi)),i=Math.max(i,n.distanceToSquared(Gt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&ct('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ct("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,a=t.uv;let r=this.getAttribute("tangent");(r===void 0||r.count!==n.count)&&(r=new Ft(new Float32Array(4*n.count),4),this.setAttribute("tangent",r));const o=[],l=[],c=new Uint8Array(n.count);for(let P=0;P<n.count;P++)o[P]=new L,l[P]=new L;const d=new L,u=new L,h=new L,f=new $e,g=new $e,v=new $e,m=new L,p=new L;function x(P,I,O){c[P]=c[I]=c[O]=1,d.fromBufferAttribute(n,P),u.fromBufferAttribute(n,I),h.fromBufferAttribute(n,O),f.fromBufferAttribute(a,P),g.fromBufferAttribute(a,I),v.fromBufferAttribute(a,O),u.sub(d),h.sub(d),g.sub(f),v.sub(f);const k=1/(g.x*v.y-v.x*g.y);isFinite(k)&&(m.copy(u).multiplyScalar(v.y).addScaledVector(h,-g.y).multiplyScalar(k),p.copy(h).multiplyScalar(g.x).addScaledVector(u,-v.x).multiplyScalar(k),o[P].add(m),o[I].add(m),o[O].add(m),l[P].add(p),l[I].add(p),l[O].add(p))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let P=0,I=M.length;P<I;++P){const O=M[P],k=O.start,Z=O.count;for(let R=k,U=k+Z;R<U;R+=3)x(e.getX(R+0),e.getX(R+1),e.getX(R+2))}const _=new L,E=new L,T=new L,y=new L;function b(P){T.fromBufferAttribute(i,P),y.copy(T);const I=o[P];_.copy(I),_.sub(T.multiplyScalar(T.dot(I))).normalize(),E.crossVectors(y,I);const k=E.dot(l[P])<0?-1:1;r.setXYZW(P,_.x,_.y,_.z,k)}for(let P=0,I=n.count;P<I;++P)c[P]&&b(P);this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Ft(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,f=n.count;h<f;h++)n.setXYZ(h,0,0,0);const i=new L,a=new L,r=new L,o=new L,l=new L,c=new L,d=new L,u=new L;if(e)for(let h=0,f=e.count;h<f;h+=3){const g=e.getX(h+0),v=e.getX(h+1),m=e.getX(h+2);i.fromBufferAttribute(t,g),a.fromBufferAttribute(t,v),r.fromBufferAttribute(t,m),d.subVectors(r,a),u.subVectors(i,a),d.cross(u),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(d),l.add(d),c.add(d),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)i.fromBufferAttribute(t,h+0),a.fromBufferAttribute(t,h+1),r.fromBufferAttribute(t,h+2),d.subVectors(r,a),u.subVectors(i,a),d.cross(u),n.setXYZ(h+0,d.x,d.y,d.z),n.setXYZ(h+1,d.x,d.y,d.z),n.setXYZ(h+2,d.x,d.y,d.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Gt.fromBufferAttribute(e,t),Gt.normalize(),e.setXYZ(t,Gt.x,Gt.y,Gt.z)}toNonIndexed(){function e(o,l){const c=o.array,d=o.itemSize,u=o.normalized,h=new c.constructor(l.length*d);let f=0,g=0;for(let v=0,m=l.length;v<m;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*d;for(let p=0;p<d;p++)h[g++]=c[f++]}return new Ft(h,d,u)}if(this.index===null)return Ve("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new _t,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=e(l,n);t.setAttribute(o,c)}const a=this.morphAttributes;for(const o in a){const l=[],c=a[o];for(let d=0,u=c.length;d<u;d++){const h=c[d],f=e(h,n);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let o=0,l=r.length;o<l;o++){const c=r[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let a=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],d=[];for(let u=0,h=c.length;u<h;u++){const f=c[u];d.push(f.toJSON(e.data))}d.length>0&&(i[l]=d,a=!0)}a&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(e.data.groups=JSON.parse(JSON.stringify(r)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const d=i[c];this.setAttribute(c,d.clone(t))}const a=e.morphAttributes;for(const c in a){const d=[],u=a[c];for(let h=0,f=u.length;h<f;h++)d.push(u[h].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;const r=e.groups;for(let c=0,d=r.length;c<d;c++){const u=r[c];this.addGroup(u.start,u.count,u.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Yh{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Jc,this.updateRanges=[],this.version=0,this.uuid=zi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,a=this.stride;i<a;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});const t=Nl(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=this.array.slice(0).buffer);const n=new this.array.constructor(e.arrayBuffers[t]),i=new this.constructor(n,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={});const t=Nl(this.array);e.arrayBuffers[t]===void 0&&(e.arrayBuffers[t]=Array.from(new Uint32Array(this.array.slice(0).buffer)));const n={uuid:this.uuid,buffer:t,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}}function Nl(s){return s.buffer._uuid===void 0&&(s.buffer._uuid=zi()),s.byteOffset===0&&s.byteLength===s.buffer.byteLength?s.buffer._uuid:s.buffer._uuid+":"+s.byteOffset+":"+s.byteLength}const rn=new L;class Wa{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i,this._normalizationScale=e!==void 0?Qa(e.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)rn.fromBufferAttribute(this,t),rn.applyMatrix4(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)rn.fromBufferAttribute(this,t),rn.applyNormalMatrix(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)rn.fromBufferAttribute(this,t),rn.transformDirection(e),this.setXYZ(t,rn.x,rn.y,rn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=this._denormalize(t)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=this._denormalize(t)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=this._denormalize(t)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=this._denormalize(t)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,a){return e=e*this.data.stride+this.offset,this.normalized&&(t=this._normalize(t),n=this._normalize(n),i=this._normalize(i),a=this._normalize(a)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=a,this}clone(e){if(e===void 0){Ga("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[i+a])}return new Ft(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Wa(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ga("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let a=0;a<this.itemSize;a++)t.push(this.data.array[i+a])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(e){const t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):jc(e,this.data.array)}_normalize(e){const t=this._normalizationScale;return t!==void 0?Math.round(e*t):ed(e,this.data.array)}}const Cr=new L,Kh=new L,Zh=new Xe;class gi{constructor(e=new L(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Cr.subVectors(n,t).cross(Kh.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const i=e.delta(Cr),a=this.normal.dot(i);if(a===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/a;return n===!0&&(r<0||r>1)?null:t.copy(e.start).addScaledVector(i,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Zh.getNormalMatrix(e),i=this.coplanarPoint(Cr).applyMatrix4(e),a=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(a),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Jh=0;class wi extends ki{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Jh++}),this.uuid=zi(),this.name="",this.type="Material",this.blending=Ds,this.side=Ui,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ic,this.blendDst=Dc,this.blendEquation=rs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Oe(0,0,0),this.blendAlpha=0,this.depthFunc=Ns,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=_h,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=cr,this.stencilZFail=cr,this.stencilZPass=cr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){Ve(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){Ve(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(a=>a.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(a){const r=[];for(const o in a){const l=a[o];delete l.metadata,r.push(l)}return r}if(t){const a=i(e.textures),r=i(e.images);a.length>0&&(n.textures=a),r.length>0&&(n.images=r)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Oe().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new gi().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new $e().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new $e().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let a=0;a!==i;++a)n[a]=t[a].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Sn extends wi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Oe(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let ji;const bs=new L,es=new L,ts=new L,ns=new $e,ws=new $e,od=new ut,na=new L,Ss=new L,ia=new L,Ul=new $e,Pr=new $e,Fl=new $e;class Un extends wt{constructor(e=new Sn){if(super(),this.isSprite=!0,this.type="Sprite",ji===void 0){ji=new _t;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Yh(t,5);ji.setIndex([0,1,2,0,2,3]),ji.setAttribute("position",new Wa(n,3,0,!1)),ji.setAttribute("uv",new Wa(n,2,3,!1))}this.geometry=ji,this.material=e,this.center=new $e(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&ct('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),es.setFromMatrixScale(this.matrixWorld),od.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),ts.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&es.multiplyScalar(-ts.z);const n=this.material.rotation;let i,a;n!==0&&(a=Math.cos(n),i=Math.sin(n));const r=this.center;sa(na.set(-.5,-.5,0),ts,r,es,i,a),sa(Ss.set(.5,-.5,0),ts,r,es,i,a),sa(ia.set(.5,.5,0),ts,r,es,i,a),Ul.set(0,0),Pr.set(1,0),Fl.set(1,1);let o=e.ray.intersectTriangle(na,Ss,ia,!1,bs);if(o===null&&(sa(Ss.set(-.5,.5,0),ts,r,es,i,a),Pr.set(0,1),o=e.ray.intersectTriangle(na,ia,Ss,!1,bs),o===null))return;const l=e.ray.origin.distanceTo(bs);l<e.near||l>e.far||t.push({distance:l,point:bs.clone(),uv:bn.getInterpolation(bs,na,Ss,ia,Ul,Pr,Fl,new $e),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}toJSON(e){const t=super.toJSON(e);return t.object.center=this.center.toArray(),t}}function sa(s,e,t,n,i,a){ns.subVectors(s,t).addScalar(.5).multiply(n),i!==void 0?(ws.x=a*ns.x-i*ns.y,ws.y=i*ns.x+a*ns.y):ws.copy(ns),s.copy(e),s.x+=ws.x,s.y+=ws.y,s.applyMatrix4(od)}const ei=new L,Lr=new L,aa=new L,ra=new L;class Ko{constructor(e=new L,t=new L(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ei)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=ei.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ei.copy(this.origin).addScaledVector(this.direction,t),ei.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Lr.copy(e).add(t).multiplyScalar(.5),aa.copy(t).sub(e).normalize(),ra.copy(this.origin).sub(Lr);const a=e.distanceTo(t)*.5,r=-this.direction.dot(aa),o=ra.dot(this.direction),l=-ra.dot(aa),c=ra.lengthSq(),d=Math.abs(1-r*r);let u,h,f,g;if(d>0)if(u=r*l-o,h=r*o-l,g=a*d,u>=0)if(h>=-g)if(h<=g){const v=1/d;u*=v,h*=v,f=u*(u+r*h+2*o)+h*(r*u+h+2*l)+c}else h=a,u=Math.max(0,-(r*h+o)),f=-u*u+h*(h+2*l)+c;else h=-a,u=Math.max(0,-(r*h+o)),f=-u*u+h*(h+2*l)+c;else h<=-g?(u=Math.max(0,-(-r*a+o)),h=u>0?-a:Math.min(Math.max(-a,-l),a),f=-u*u+h*(h+2*l)+c):h<=g?(u=0,h=Math.min(Math.max(-a,-l),a),f=h*(h+2*l)+c):(u=Math.max(0,-(r*a+o)),h=u>0?a:Math.min(Math.max(-a,-l),a),f=-u*u+h*(h+2*l)+c);else h=r>0?-a:a,u=Math.max(0,-(r*h+o)),f=-u*u+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Lr).addScaledVector(aa,h),f}intersectSphere(e,t){if(e.radius<0)return null;ei.subVectors(e.center,this.origin);const n=ei.dot(this.direction),i=ei.dot(ei)-n*n,a=e.radius*e.radius;if(i>a)return null;const r=Math.sqrt(a-i),o=n-r,l=n+r;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,a,r,o,l;const c=1/this.direction.x,d=1/this.direction.y,u=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,i=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,i=(e.min.x-h.x)*c),d>=0?(a=(e.min.y-h.y)*d,r=(e.max.y-h.y)*d):(a=(e.max.y-h.y)*d,r=(e.min.y-h.y)*d),n>r||a>i||((a>n||isNaN(n))&&(n=a),(r<i||isNaN(i))&&(i=r),u>=0?(o=(e.min.z-h.z)*u,l=(e.max.z-h.z)*u):(o=(e.max.z-h.z)*u,l=(e.min.z-h.z)*u),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,ei)!==null}intersectTriangle(e,t,n,i,a){const r=this.origin,o=this.direction,l=o.x,c=o.y,d=o.z,u=e.x-r.x,h=e.y-r.y,f=e.z-r.z,g=t.x-r.x,v=t.y-r.y,m=t.z-r.z,p=n.x-r.x,x=n.y-r.y,M=n.z-r.z,_=Math.abs(l),E=Math.abs(c),T=Math.abs(d);let y,b,P,I,O,k,Z,R,U,F,z,j;if(_>=E&&_>=T?(P=l,k=u,U=g,j=p,l>=0?(y=c,b=d,I=h,O=f,Z=v,R=m,F=x,z=M):(y=d,b=c,I=f,O=h,Z=m,R=v,F=M,z=x)):E>=T?(P=c,k=h,U=v,j=x,c>=0?(y=d,b=l,I=f,O=u,Z=m,R=g,F=M,z=p):(y=l,b=d,I=u,O=f,Z=g,R=m,F=p,z=M)):(P=d,k=f,U=m,j=M,d>=0?(y=l,b=c,I=u,O=h,Z=g,R=v,F=p,z=x):(y=c,b=l,I=h,O=u,Z=v,R=g,F=x,z=p)),P===0)return null;const W=y/P,te=b/P,se=1/P,Me=I-W*k,Ue=O-te*k,ne=Z-W*U,ce=R-te*U,we=F-W*j,Ae=z-te*j,ve=we*ce-Ae*ne,me=Me*Ae-Ue*we,ze=ne*Ue-ce*Me;if(i){if(ve<0||me<0||ze<0)return null}else if((ve<0||me<0||ze<0)&&(ve>0||me>0||ze>0))return null;const xe=ve+me+ze;if(xe===0)return null;const qe=se*(ve*k+me*U+ze*j);return(xe>0?qe<0:qe>0)?null:this.at(qe/xe,a)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class nt extends wi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Oe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mi,this.combine=Nc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Ol=new ut,Pi=new Ko,oa=new Hi,kl=new L,la=new L,ca=new L,da=new L,Ir=new L,ha=new L,zl=new L,ua=new L;class Y extends wt{constructor(e=new _t,t=new nt){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=i.length;a<r;a++){const o=i[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,a=n.morphAttributes.position,r=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(a&&o){ha.set(0,0,0);for(let l=0,c=a.length;l<c;l++){const d=o[l],u=a[l];d!==0&&(Ir.fromBufferAttribute(u,e),r?ha.addScaledVector(Ir,d):ha.addScaledVector(Ir.sub(t),d))}t.add(ha)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,i=this.material,a=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),oa.copy(n.boundingSphere),oa.applyMatrix4(a),Pi.copy(e.ray).recast(e.near),!(oa.containsPoint(Pi.origin)===!1&&(Pi.intersectSphere(oa,kl)===null||Pi.origin.distanceToSquared(kl)>(e.far-e.near)**2))&&(Ol.copy(a).invert(),Pi.copy(e.ray).applyMatrix4(Ol),!(n.boundingBox!==null&&Pi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Pi)))}_computeIntersections(e,t,n){let i;const a=this.geometry,r=this.material,o=a.index,l=a.attributes.position,c=a.attributes.uv,d=a.attributes.uv1,u=a.attributes.normal,h=a.groups,f=a.drawRange;if(o!==null)if(Array.isArray(r))for(let g=0,v=h.length;g<v;g++){const m=h[g],p=r[m.materialIndex],x=Math.max(m.start,f.start),M=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let _=x,E=M;_<E;_+=3){const T=o.getX(_),y=o.getX(_+1),b=o.getX(_+2);i=fa(this,p,e,n,c,d,u,T,y,b),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const x=o.getX(m),M=o.getX(m+1),_=o.getX(m+2);i=fa(this,r,e,n,c,d,u,x,M,_),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(r))for(let g=0,v=h.length;g<v;g++){const m=h[g],p=r[m.materialIndex],x=Math.max(m.start,f.start),M=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let _=x,E=M;_<E;_+=3){const T=_,y=_+1,b=_+2;i=fa(this,p,e,n,c,d,u,T,y,b),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const x=m,M=m+1,_=m+2;i=fa(this,r,e,n,c,d,u,x,M,_),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function Qh(s,e,t,n,i,a,r,o){let l;if(e.side===tn?l=n.intersectTriangle(r,a,i,!0,o):l=n.intersectTriangle(i,a,r,e.side===Ui,o),l===null)return null;ua.copy(o),ua.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(ua);return c<t.near||c>t.far?null:{distance:c,point:ua.clone(),object:s}}function fa(s,e,t,n,i,a,r,o,l,c){s.getVertexPosition(o,la),s.getVertexPosition(l,ca),s.getVertexPosition(c,da);const d=Qh(s,e,t,n,la,ca,da,zl);if(d){const u=new L;bn.getBarycoord(zl,la,ca,da,u),i&&(d.uv=bn.getInterpolatedAttribute(i,o,l,c,u,new $e)),a&&(d.uv1=bn.getInterpolatedAttribute(a,o,l,c,u,new $e)),r&&(d.normal=bn.getInterpolatedAttribute(r,o,l,c,u,new L),d.normal.dot(n.direction)>0&&d.normal.multiplyScalar(-1));const h={a:o,b:l,c,normal:new L,materialIndex:0};bn.getNormal(la,ca,da,h.normal),d.face=h,d.barycoord=u}return d}class ld extends nn{constructor(e=null,t=1,n=1,i,a,r,o,l,c=Xt,d=Xt,u,h){super(null,r,o,l,c,d,i,a,u,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Bl extends Ft{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const is=new ut,Hl=new ut,pa=[],Gl=new Bi,jh=new ut,Es=new Y,Ts=new Hi;class As extends Y{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new Bl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,jh)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Bi),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,is),Gl.copy(e.boundingBox).applyMatrix4(is),this.boundingBox.union(Gl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Hi),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,is),Ts.copy(e.boundingSphere).applyMatrix4(is),this.boundingSphere.union(Ts)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,a=n.length+1,r=e*a+1;for(let o=0;o<n.length;o++)n[o]=i[r+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(Es.geometry=this.geometry,Es.material=this.material,Es.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ts.copy(this.boundingSphere),Ts.applyMatrix4(n),e.ray.intersectsSphere(Ts)!==!1))for(let a=0;a<i;a++){this.getMatrixAt(a,is),Hl.multiplyMatrices(n,is),Es.matrixWorld=Hl,Es.raycast(e,pa);for(let r=0,o=pa.length;r<o;r++){const l=pa[r];l.instanceId=a,l.object=this,t.push(l)}pa.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new Bl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new ld(new Float32Array(i*this.count),i,this.count,Wo,Dn));const a=this.morphTexture.source.data.data;let r=0;for(let c=0;c<n.length;c++)r+=n[c];const o=this.geometry.morphTargetsRelative?1:1-r,l=i*e;return a[l]=o,a.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Li=new Hi,eu=new $e(.5,.5),ma=new L;class ks{constructor(e=new gi,t=new gi,n=new gi,i=new gi,a=new gi,r=new gi){this.planes=[e,t,n,i,a,r]}set(e,t,n,i,a,r){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(a),o[5].copy(r),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Nn,n=!1){const i=this.planes,a=e.elements,r=a[0],o=a[1],l=a[2],c=a[3],d=a[4],u=a[5],h=a[6],f=a[7],g=a[8],v=a[9],m=a[10],p=a[11],x=a[12],M=a[13],_=a[14],E=a[15];if(i[0].setComponents(c-r,f-d,p-g,E-x).normalize(),i[1].setComponents(c+r,f+d,p+g,E+x).normalize(),i[2].setComponents(c+o,f+u,p+v,E+M).normalize(),i[3].setComponents(c-o,f-u,p-v,E-M).normalize(),n)i[4].setComponents(l,h,m,_).normalize(),i[5].setComponents(c-l,f-h,p-m,E-_).normalize();else if(i[4].setComponents(c-l,f-h,p-m,E-_).normalize(),t===Nn)i[5].setComponents(c+l,f+h,p+m,E+_).normalize();else if(t===Os)i[5].setComponents(l,h,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Li.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Li.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Li)}intersectsSprite(e){Li.center.set(0,0,0);const t=eu.distanceTo(e.center);return Li.radius=.7071067811865476+t,Li.applyMatrix4(e.matrixWorld),this.intersectsSphere(Li)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let a=0;a<6;a++)if(t[a].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(ma.x=i.normal.x>0?e.max.x:e.min.x,ma.y=i.normal.y>0?e.max.y:e.min.y,ma.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(ma)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const Vl=new ut;class Zo{constructor(){this.coordinateSystem=Nn,this._frustums=[],this._count=0}setFromArrayCamera(e){const t=e.cameras,n=this._frustums;for(let i=0;i<t.length;i++){const a=t[i];Vl.multiplyMatrices(a.projectionMatrix,a.matrixWorldInverse),n[i]===void 0&&(n[i]=new ks),n[i].setFromProjectionMatrix(Vl,a.coordinateSystem,a.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;const t=this._frustums,n=e._frustums;for(let i=0;i<e._count;i++)t[i]===void 0&&(t[i]=new ks),t[i].copy(n[i]);return this._count=e._count,this}clone(){return new Zo().copy(this)}}class Jo extends wi{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Oe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const $a=new L,qa=new L,Wl=new ut,Rs=new Ko,ga=new Hi,Dr=new L,$l=new L;class cd extends wt{constructor(e=new _t,t=new Jo){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,a=t.count;i<a;i++)$a.fromBufferAttribute(t,i-1),qa.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=$a.distanceTo(qa);e.setAttribute("lineDistance",new ft(n,1))}else Ve("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,i=this.matrixWorld,a=e.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ga.copy(n.boundingSphere),ga.applyMatrix4(i),ga.radius+=a,e.ray.intersectsSphere(ga)===!1)return;Wl.copy(i).invert(),Rs.copy(e.ray).applyMatrix4(Wl);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,d=n.index,h=n.attributes.position;if(d!==null){const f=Math.max(0,r.start),g=Math.min(d.count,r.start+r.count);for(let v=f,m=g-1;v<m;v+=c){const p=d.getX(v),x=d.getX(v+1),M=va(this,e,Rs,l,p,x,v);M&&t.push(M)}if(this.isLineLoop){const v=d.getX(g-1),m=d.getX(f),p=va(this,e,Rs,l,v,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,r.start),g=Math.min(h.count,r.start+r.count);for(let v=f,m=g-1;v<m;v+=c){const p=va(this,e,Rs,l,v,v+1,v);p&&t.push(p)}if(this.isLineLoop){const v=va(this,e,Rs,l,g-1,f,g-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=i.length;a<r;a++){const o=i[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function va(s,e,t,n,i,a,r){const o=s.geometry.attributes.position;if($a.fromBufferAttribute(o,i),qa.fromBufferAttribute(o,a),t.distanceSqToSegment($a,qa,Dr,$l)>n)return;Dr.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(Dr);if(!(c<e.near||c>e.far))return{distance:c,point:$l.clone().applyMatrix4(s.matrixWorld),index:r,face:null,faceIndex:null,barycoord:null,object:s}}const ql=new L,Xl=new L;class tu extends cd{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,a=t.count;i<a;i+=2)ql.fromBufferAttribute(t,i),Xl.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+ql.distanceTo(Xl);e.setAttribute("lineDistance",new ft(n,1))}else Ve("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class $n extends wi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Oe(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Yl=new ut,Lo=new Ko,xa=new Hi,ya=new L;class oi extends wt{constructor(e=new _t,t=new $n){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,i=this.matrixWorld,a=e.params.Points.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),xa.copy(n.boundingSphere),xa.applyMatrix4(i),xa.radius+=a,e.ray.intersectsSphere(xa)===!1)return;Yl.copy(i).invert(),Lo.copy(e.ray).applyMatrix4(Yl);const o=a/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,u=n.attributes.position;if(c!==null){const h=Math.max(0,r.start),f=Math.min(c.count,r.start+r.count);for(let g=h,v=f;g<v;g++){const m=c.getX(g);ya.fromBufferAttribute(u,m),Kl(ya,m,l,i,e,t,this)}}else{const h=Math.max(0,r.start),f=Math.min(u.count,r.start+r.count);for(let g=h,v=f;g<v;g++)ya.fromBufferAttribute(u,g),Kl(ya,g,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let a=0,r=i.length;a<r;a++){const o=i[a].name||String(a);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=a}}}}}function Kl(s,e,t,n,i,a,r){const o=Lo.distanceSqToPoint(s);if(o<t){const l=new L;Lo.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;a.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:r})}}class dd extends nn{constructor(e=[],t=hs,n,i,a,r,o,l,c,d){super(e,t,n,i,a,r,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class Qo extends nn{constructor(e,t,n,i,a,r,o,l,c){super(e,t,n,i,a,r,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class fs extends nn{constructor(e,t,n=qn,i,a,r,o=Xt,l=Xt,c,d=_i,u=1){if(d!==_i&&d!==yi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:u};super(h,i,a,r,o,l,d,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Yo(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class hd extends fs{constructor(e,t=qn,n=hs,i,a,r=Xt,o=Xt,l,c=_i){const d={width:e,height:e,depth:1},u=[d,d,d,d,d,d];super(e,e,t,n,i,a,r,o,l,c),this.image=u,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class ud extends nn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Si extends _t{constructor(e=1,t=1,n=1,i=1,a=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:a,depthSegments:r};const o=this;i=Math.floor(i),a=Math.floor(a),r=Math.floor(r);const l=[],c=[],d=[],u=[];let h=0,f=0;g("z","y","x",-1,-1,n,t,e,r,a,0),g("z","y","x",1,-1,n,t,-e,r,a,1),g("x","z","y",1,1,e,n,t,i,r,2),g("x","z","y",1,-1,e,n,-t,i,r,3),g("x","y","z",1,-1,e,t,n,i,a,4),g("x","y","z",-1,-1,e,t,-n,i,a,5),this.setIndex(l),this.setAttribute("position",new ft(c,3)),this.setAttribute("normal",new ft(d,3)),this.setAttribute("uv",new ft(u,2));function g(v,m,p,x,M,_,E,T,y,b,P){const I=_/y,O=E/b,k=_/2,Z=E/2,R=T/2,U=y+1,F=b+1;let z=0,j=0;const W=new L;for(let te=0;te<F;te++){const se=te*O-Z;for(let Me=0;Me<U;Me++){const Ue=Me*I-k;W[v]=Ue*x,W[m]=se*M,W[p]=R,c.push(W.x,W.y,W.z),W[v]=0,W[m]=0,W[p]=T>0?1:-1,d.push(W.x,W.y,W.z),u.push(Me/y),u.push(1-te/b),z+=1}}for(let te=0;te<b;te++)for(let se=0;se<y;se++){const Me=h+se+U*te,Ue=h+se+U*(te+1),ne=h+(se+1)+U*(te+1),ce=h+(se+1)+U*te;l.push(Me,Ue,ce),l.push(Ue,ne,ce),j+=6}o.addGroup(f,j,P),f+=j,h+=z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Si(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Yt extends _t{constructor(e=1,t=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);const a=[],r=[],o=[],l=[],c=new L,d=new $e;r.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,h=3;u<=t;u++,h+=3){const f=n+u/t*i;c.x=e*Math.cos(f),c.y=e*Math.sin(f),r.push(c.x,c.y,c.z),o.push(0,0,1),d.x=(r[h]/e+1)/2,d.y=(r[h+1]/e+1)/2,l.push(d.x,d.y)}for(let u=1;u<=t;u++)a.push(u,u+1,0);this.setIndex(a),this.setAttribute("position",new ft(r,3)),this.setAttribute("normal",new ft(o,3)),this.setAttribute("uv",new ft(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yt(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class ht extends _t{constructor(e=1,t=1,n=1,i=32,a=1,r=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:a,openEnded:r,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),a=Math.floor(a);const d=[],u=[],h=[],f=[];let g=0;const v=[],m=n/2;let p=0;x(),r===!1&&(e>0&&M(!0),t>0&&M(!1)),this.setIndex(d),this.setAttribute("position",new ft(u,3)),this.setAttribute("normal",new ft(h,3)),this.setAttribute("uv",new ft(f,2));function x(){const _=new L,E=new L;let T=0;const y=(t-e)/n;for(let b=0;b<=a;b++){const P=[],I=b/a,O=I*(t-e)+e;for(let k=0;k<=i;k++){const Z=k/i,R=Z*l+o,U=Math.sin(R),F=Math.cos(R);E.x=O*U,E.y=-I*n+m,E.z=O*F,u.push(E.x,E.y,E.z),_.set(U,y,F).normalize(),h.push(_.x,_.y,_.z),f.push(Z,1-I),P.push(g++)}v.push(P)}for(let b=0;b<i;b++)for(let P=0;P<a;P++){const I=v[P][b],O=v[P+1][b],k=v[P+1][b+1],Z=v[P][b+1];(e>0||P!==0)&&(d.push(I,O,Z),T+=3),(t>0||P!==a-1)&&(d.push(O,k,Z),T+=3)}c.addGroup(p,T,0),p+=T}function M(_){const E=g,T=new $e,y=new L;let b=0;const P=_===!0?e:t,I=_===!0?1:-1;for(let k=1;k<=i;k++)u.push(0,m*I,0),h.push(0,I,0),f.push(.5,.5),g++;const O=g;for(let k=0;k<=i;k++){const R=k/i*l+o,U=Math.cos(R),F=Math.sin(R);y.x=P*F,y.y=m*I,y.z=P*U,u.push(y.x,y.y,y.z),h.push(0,I,0),T.x=U*.5+.5,T.y=F*.5*I+.5,f.push(T.x,T.y),g++}for(let k=0;k<i;k++){const Z=E+k,R=O+k;_===!0?d.push(R,R+1,Z):d.push(R+1,R,Z),b+=3}c.addGroup(p,b,_===!0?1:2),p+=b}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new ht(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Ct extends ht{constructor(e=1,t=1,n=32,i=1,a=!1,r=0,o=Math.PI*2){super(0,e,t,n,i,a,r,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:a,thetaStart:r,thetaLength:o}}static fromJSON(e){return new Ct(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Gs extends _t{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const a=[],r=[];o(i),c(n),d(),this.setAttribute("position",new ft(a,3)),this.setAttribute("normal",new ft(a.slice(),3)),this.setAttribute("uv",new ft(r,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(x){const M=new L,_=new L,E=new L;for(let T=0;T<t.length;T+=3)f(t[T+0],M),f(t[T+1],_),f(t[T+2],E),l(M,_,E,x)}function l(x,M,_,E){const T=E+1,y=[];for(let b=0;b<=T;b++){y[b]=[];const P=x.clone().lerp(_,b/T),I=M.clone().lerp(_,b/T),O=T-b;for(let k=0;k<=O;k++)k===0&&b===T?y[b][k]=P:y[b][k]=P.clone().lerp(I,k/O)}for(let b=0;b<T;b++)for(let P=0;P<2*(T-b)-1;P++){const I=Math.floor(P/2);P%2===0?(h(y[b][I+1]),h(y[b+1][I]),h(y[b][I])):(h(y[b][I+1]),h(y[b+1][I+1]),h(y[b+1][I]))}}function c(x){const M=new L;for(let _=0;_<a.length;_+=3)M.x=a[_+0],M.y=a[_+1],M.z=a[_+2],M.normalize().multiplyScalar(x),a[_+0]=M.x,a[_+1]=M.y,a[_+2]=M.z}function d(){const x=new L;for(let M=0;M<a.length;M+=3){x.x=a[M+0],x.y=a[M+1],x.z=a[M+2];const _=m(x)/2/Math.PI+.5,E=p(x)/Math.PI+.5;r.push(_,1-E)}g(),u()}function u(){for(let x=0;x<r.length;x+=6){const M=r[x+0],_=r[x+2],E=r[x+4],T=Math.max(M,_,E),y=Math.min(M,_,E);T>.9&&y<.1&&(M<.2&&(r[x+0]+=1),_<.2&&(r[x+2]+=1),E<.2&&(r[x+4]+=1))}}function h(x){a.push(x.x,x.y,x.z)}function f(x,M){const _=x*3;M.x=e[_+0],M.y=e[_+1],M.z=e[_+2]}function g(){const x=new L,M=new L,_=new L,E=new L,T=new $e,y=new $e,b=new $e;for(let P=0,I=0;P<a.length;P+=9,I+=6){x.set(a[P+0],a[P+1],a[P+2]),M.set(a[P+3],a[P+4],a[P+5]),_.set(a[P+6],a[P+7],a[P+8]),T.set(r[I+0],r[I+1]),y.set(r[I+2],r[I+3]),b.set(r[I+4],r[I+5]),E.copy(x).add(M).add(_).divideScalar(3);const O=m(E);v(T,I+0,x,O),v(y,I+2,M,O),v(b,I+4,_,O)}}function v(x,M,_,E){E<0&&x.x===1&&(r[M]=x.x-1),_.x===0&&_.z===0&&(r[M]=E/2/Math.PI+.5)}function m(x){return Math.atan2(x.z,-x.x)}function p(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Gs(e.vertices,e.indices,e.radius,e.detail)}}class En extends Gs{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,a=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],r=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(a,r,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new En(e.radius,e.detail)}}class nu{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ve("Curve: .getPoint() not implemented.")}getPointAt(e,t){const n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){const t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){const e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const t=[];let n,i=this.getPoint(0),a=0;t.push(0);for(let r=1;r<=e;r++)n=this.getPoint(r/e),a+=n.distanceTo(i),t.push(a),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){const n=this.getLengths();let i=0;const a=n.length;let r;t?r=t:r=e*n[a-1];let o=0,l=a-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-r,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===r)return i/(a-1);const d=n[i],h=n[i+1]-d,f=(r-d)/h;return(i+f)/(a-1)}getTangent(e,t){let i=e-1e-4,a=e+1e-4;i<0&&(i=0),a>1&&(a=1);const r=this.getPoint(i),o=this.getPoint(a),l=t||(r.isVector2?new $e:new L);return l.copy(o).sub(r).normalize(),l}getTangentAt(e,t){const n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t=!1){const n=new L,i=[],a=[],r=[],o=new L,l=new ut;for(let f=0;f<=e;f++){const g=f/e;i[f]=this.getTangentAt(g,new L)}a[0]=new L,r[0]=new L;let c=Number.MAX_VALUE;const d=Math.abs(i[0].x),u=Math.abs(i[0].y),h=Math.abs(i[0].z);d<=c&&(c=d,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),h<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),a[0].crossVectors(i[0],o),r[0].crossVectors(i[0],a[0]);for(let f=1;f<=e;f++){if(a[f]=a[f-1].clone(),r[f]=r[f-1].clone(),o.crossVectors(i[f-1],i[f]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(tt(i[f-1].dot(i[f]),-1,1));a[f].applyMatrix4(l.makeRotationAxis(o,g))}r[f].crossVectors(i[f],a[f])}if(t===!0){let f=Math.acos(tt(a[0].dot(a[e]),-1,1));f/=e,i[0].dot(o.crossVectors(a[0],a[e]))>0&&(f=-f);for(let g=1;g<=e;g++)a[g].applyMatrix4(l.makeRotationAxis(i[g],f*g)),r[g].crossVectors(i[g],a[g])}return{tangents:i,normals:a,binormals:r}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){const e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this.cacheArcLengths=null,this}}function jo(){let s=0,e=0,t=0,n=0;function i(a,r,o,l){s=a,e=o,t=-3*a+3*r-2*o-l,n=2*a-2*r+o+l}return{initCatmullRom:function(a,r,o,l,c){i(r,o,c*(o-a),c*(l-r))},initNonuniformCatmullRom:function(a,r,o,l,c,d,u){let h=(r-a)/c-(o-a)/(c+d)+(o-r)/d,f=(o-r)/d-(l-r)/(d+u)+(l-o)/u;h*=d,f*=d,i(r,o,h,f)},calc:function(a){const r=a*a,o=r*a;return s+e*a+t*r+n*o}}}const Zl=new L,Jl=new L,Nr=new jo,Ur=new jo,Fr=new jo;class fd extends nu{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new L){const n=t,i=this.points,a=i.length,r=(a-(this.closed?0:1))*e;let o=Math.floor(r),l=r-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/a)+1)*a:l===0&&o===a-1&&(o=a-2,l=1);let c,d;this.closed||o>0?c=i[(o-1)%a]:(Jl.subVectors(i[0],i[1]).add(i[0]),c=Jl);const u=i[o%a],h=i[(o+1)%a];if(this.closed||o+2<a?d=i[(o+2)%a]:(Zl.subVectors(i[a-1],i[a-2]).add(i[a-1]),d=Zl),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(h),f),m=Math.pow(h.distanceToSquared(d),f);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),Nr.initNonuniformCatmullRom(c.x,u.x,h.x,d.x,g,v,m),Ur.initNonuniformCatmullRom(c.y,u.y,h.y,d.y,g,v,m),Fr.initNonuniformCatmullRom(c.z,u.z,h.z,d.z,g,v,m)}else this.curveType==="catmullrom"&&(Nr.initCatmullRom(c.x,u.x,h.x,d.x,this.tension),Ur.initCatmullRom(c.y,u.y,h.y,d.y,this.tension),Fr.initCatmullRom(c.z,u.z,h.z,d.z,this.tension));return n.set(Nr.calc(l),Ur.calc(l),Fr.calc(l)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){const e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){const i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){const i=e.points[t];this.points.push(new L().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}}class Gi extends Gs{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],a=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,a,e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Gi(e.radius,e.detail)}}class Tn extends Gs{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Tn(e.radius,e.detail)}}class Ot extends _t{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const a=e/2,r=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,d=l+1,u=e/o,h=t/l,f=[],g=[],v=[],m=[];for(let p=0;p<d;p++){const x=p*h-r;for(let M=0;M<c;M++){const _=M*u-a;g.push(_,-x,0),v.push(0,0,1),m.push(M/o),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let x=0;x<o;x++){const M=x+c*p,_=x+c*(p+1),E=x+1+c*(p+1),T=x+1+c*p;f.push(M,_,T),f.push(_,E,T)}this.setIndex(f),this.setAttribute("position",new ft(g,3)),this.setAttribute("normal",new ft(v,3)),this.setAttribute("uv",new ft(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ot(e.width,e.height,e.widthSegments,e.heightSegments)}}class Yn extends _t{constructor(e=.5,t=1,n=32,i=1,a=0,r=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:a,thetaLength:r},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],d=[];let u=e;const h=(t-e)/i,f=new L,g=new $e;for(let v=0;v<=i;v++){for(let m=0;m<=n;m++){const p=a+m/n*r;f.x=u*Math.cos(p),f.y=u*Math.sin(p),l.push(f.x,f.y,f.z),c.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,d.push(g.x,g.y)}u+=h}for(let v=0;v<i;v++){const m=v*(n+1);for(let p=0;p<n;p++){const x=p+m,M=x,_=x+n+1,E=x+n+2,T=x+1;o.push(M,_,T),o.push(_,E,T)}}this.setIndex(o),this.setAttribute("position",new ft(l,3)),this.setAttribute("normal",new ft(c,3)),this.setAttribute("uv",new ft(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Yn(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Mt extends _t{constructor(e=1,t=32,n=16,i=0,a=Math.PI*2,r=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:a,thetaStart:r,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(r+o,Math.PI);let c=0;const d=[],u=new L,h=new L,f=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const x=[],M=p/n,_=r+M*o,E=e*Math.cos(_),T=Math.sqrt(e*e-E*E);let y=0;p===0&&r===0?y=.5/t:p===n&&l===Math.PI&&(y=-.5/t);for(let b=0;b<=t;b++){const P=b/t,I=i+P*a;u.x=-T*Math.cos(I),u.y=E,u.z=T*Math.sin(I),g.push(u.x,u.y,u.z),h.copy(u).normalize(),v.push(h.x,h.y,h.z),m.push(P+y,1-M),x.push(c++)}d.push(x)}for(let p=0;p<n;p++)for(let x=0;x<t;x++){const M=d[p][x+1],_=d[p][x],E=d[p+1][x],T=d[p+1][x+1];(p!==0||r>0)&&f.push(M,_,T),(p!==n-1||l<Math.PI)&&f.push(_,E,T)}this.setIndex(f),this.setAttribute("position",new ft(g,3)),this.setAttribute("normal",new ft(v,3)),this.setAttribute("uv",new ft(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mt(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class kn extends _t{constructor(e=1,t=.4,n=12,i=48,a=Math.PI*2,r=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:a,thetaStart:r,thetaLength:o},n=Math.floor(n),i=Math.floor(i);const l=[],c=[],d=[],u=[],h=new L,f=new L,g=new L;for(let v=0;v<=n;v++){const m=r+v/n*o;for(let p=0;p<=i;p++){const x=p/i*a;f.x=(e+t*Math.cos(m))*Math.cos(x),f.y=(e+t*Math.cos(m))*Math.sin(x),f.z=t*Math.sin(m),c.push(f.x,f.y,f.z),h.x=e*Math.cos(x),h.y=e*Math.sin(x),g.subVectors(f,h).normalize(),d.push(g.x,g.y,g.z),u.push(p/i),u.push(v/n)}}for(let v=1;v<=n;v++)for(let m=1;m<=i;m++){const p=(i+1)*v+m-1,x=(i+1)*(v-1)+m-1,M=(i+1)*(v-1)+m,_=(i+1)*v+m;l.push(p,x,_),l.push(x,M,_)}this.setIndex(l),this.setAttribute("position",new ft(c,3)),this.setAttribute("normal",new ft(d,3)),this.setAttribute("uv",new ft(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kn(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}}function ps(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];if(Ql(i))i.isRenderTargetTexture?(Ve("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(Ql(i[0])){const a=[];for(let r=0,o=i.length;r<o;r++)a[r]=i[r].clone();e[t][n]=a}else e[t][n]=i.slice();else e[t][n]=i}}return e}function on(s){const e={};for(let t=0;t<s.length;t++){const n=ps(s[t]);for(const i in n)e[i]=n[i]}return e}function Ql(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function iu(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function pd(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:at.workingColorSpace}const su={clone:ps,merge:on};var au=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ru=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class dn extends wi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=au,this.fragmentShader=ru,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ps(e.uniforms),this.uniformsGroups=iu(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const r=this.uniforms[i].value;r&&r.isTexture?t.uniforms[i]={type:"t",value:r.toJSON(e).uuid}:r&&r.isColor?t.uniforms[i]={type:"c",value:r.getHex()}:r&&r.isVector2?t.uniforms[i]={type:"v2",value:r.toArray()}:r&&r.isVector3?t.uniforms[i]={type:"v3",value:r.toArray()}:r&&r.isVector4?t.uniforms[i]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?t.uniforms[i]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?t.uniforms[i]={type:"m4",value:r.toArray()}:t.uniforms[i]={value:r}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new Oe().setHex(i.value);break;case"v2":this.uniforms[n].value=new $e().fromArray(i.value);break;case"v3":this.uniforms[n].value=new L().fromArray(i.value);break;case"v4":this.uniforms[n].value=new Rt().fromArray(i.value);break;case"m3":this.uniforms[n].value=new Xe().fromArray(i.value);break;case"m4":this.uniforms[n].value=new ut().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class ou extends dn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ke extends wi{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Oe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Oe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Po,this.normalScale=new $e(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Mi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class md extends ke{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new $e(1,1),this.clearcoatNormalMap=null,this.diffuseRoughnessMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return tt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessMinimum=100,this.iridescenceThicknessMaximum=400,this.iridescenceThicknessMap=null,this.sheenColor=new Oe(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Oe(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Oe(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._diffuseRoughness=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get diffuseRoughness(){return this._diffuseRoughness}set diffuseRoughness(e){this._diffuseRoughness>0!=e>0&&this.version++,this._diffuseRoughness=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}get iridescenceThicknessRange(){return cs('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),[this.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum]}set iridescenceThicknessRange(e){cs('MeshPhysicalMaterial: The "iridescenceThicknessRange" property has been replaced by "iridescenceThicknessMinimum" and "iridescenceThicknessMaximum".'),this.iridescenceThicknessMinimum=e[0],this.iridescenceThicknessMaximum=e[1]}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.diffuseRoughness=e.diffuseRoughness,this.diffuseRoughnessMap=e.diffuseRoughnessMap,this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum,this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum,this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class lu extends wi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=xh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class cu extends wi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Vs extends wt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Oe(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class gd extends Vs{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Oe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const Or=new ut,jl=new L,ec=new L;class el{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new $e(512,512),this.mapType=xn,this.map=null,this.mapPass=null,this.matrix=new ut,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ks,this._frameExtents=new $e(1,1),this._viewportCount=1,this._viewports=[new Rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;jl.setFromMatrixPosition(e.matrixWorld),t.position.copy(jl),ec.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ec),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,i){Or.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(Or,e.coordinateSystem,e.reversedDepth);const a=this._frameExtents,r=i?i.z/a.x:1,o=i?i.w/a.y:1,l=i?i.x/a.x:0,c=i?i.y/a.y:0;e.coordinateSystem===Os||e.reversedDepth?t.set(.5*r,0,0,.5*r+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*r,0,0,.5*r+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Or)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const _a=new L,Ma=new ms,Bn=new L;class vd extends wt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ut,this.projectionMatrix=new ut,this.projectionMatrixInverse=new ut,this.coordinateSystem=Nn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(_a,Ma,Bn),Bn.x===1&&Bn.y===1&&Bn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(_a,Ma,Bn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(_a,Ma,Bn),Bn.x===1&&Bn.y===1&&Bn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(_a,Ma,Bn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const mi=new L,tc=new $e,nc=new $e;class vn extends vd{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Va*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(dr*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Va*2*Math.atan(Math.tan(dr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){mi.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(mi.x,mi.y).multiplyScalar(-e/mi.z),mi.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(mi.x,mi.y).multiplyScalar(-e/mi.z)}getViewSize(e,t){return this.getViewBounds(e,tc,nc),t.subVectors(nc,tc)}setViewOffset(e,t,n,i,a,r){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(dr*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,a=-.5*i;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;a+=r.offsetX*i/l,t-=r.offsetY*n/c,i*=r.width/l,n*=r.height/c}const o=this.filmOffset;o!==0&&(a+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(a,a+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class du extends el{constructor(){super(new vn(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Va*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,a=e.distance||t.far;(n!==t.fov||i!==t.aspect||a!==t.far)&&(t.fov=n,t.aspect=i,t.far=a,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){const e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}}class hu extends Vs{constructor(e,t,n=0,i=Math.PI/3,a=0,r=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.target=new wt,this.distance=n,this.angle=i,this.penumbra=a,this.decay=r,this.map=null,this.shadow=new du}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class uu extends el{constructor(){super(new vn(90,1,.5,500)),this.isPointLightShadow=!0}}class xd extends Vs{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new uu}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class yd extends vd{constructor(e=-1,t=1,n=1,i=-1,a=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=a,this.far=r,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,a,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=a,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let a=n-e,r=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;a+=c*this.view.offsetX,r=a+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(a,r,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class fu extends el{constructor(){super(new yd(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Io extends Vs{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(wt.DEFAULT_UP),this.updateMatrix(),this.target=new wt,this.shadow=new fu}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class _d extends Vs{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}const ss=-90,as=1;class Do extends wt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new vn(ss,as,e,t);i.layers=this.layers,this.add(i);const a=new vn(ss,as,e,t);a.layers=this.layers,this.add(a);const r=new vn(ss,as,e,t);r.layers=this.layers,this.add(r);const o=new vn(ss,as,e,t);o.layers=this.layers,this.add(o);const l=new vn(ss,as,e,t);l.layers=this.layers,this.add(l);const c=new vn(ss,as,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,a,r,o,l]=t;for(const c of t)this.remove(c);if(e===Nn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),a.up.set(0,0,-1),a.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Os)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),a.up.set(0,0,1),a.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[a,r,o,l,c,d]=this.children,u=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,1,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,2,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=v,e.setRenderTarget(n,5,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(u,h,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class pu extends vn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}}function ic(s,e,t,n){const i=mu(n);switch(t){case qc:return s*e;case Wo:return s*e/i.components*i.byteLength;case $o:return s*e/i.components*i.byteLength;case Fi:return s*e*2/i.components*i.byteLength;case qo:return s*e*2/i.components*i.byteLength;case Xc:return s*e*3/i.components*i.byteLength;case Vn:return s*e*4/i.components*i.byteLength;case Xo:return s*e*4/i.components*i.byteLength;case La:case Ia:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Da:case Na:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case eo:case no:return Math.max(s,16)*Math.max(e,8)/4;case jr:case to:return Math.max(s,8)*Math.max(e,8)/2;case io:case so:case ro:case oo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case ao:case Oa:case lo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case co:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case ho:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case uo:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case fo:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case po:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case mo:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case go:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case vo:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case xo:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case yo:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case _o:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Mo:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case bo:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case wo:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case So:case Eo:case To:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Ao:case Ro:return Math.ceil(s/4)*Math.ceil(e/4)*8;case ka:case Co:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function mu(s){switch(s){case xn:case Gc:return{byteLength:1,components:1};case Fs:case Vc:case Xn:return{byteLength:2,components:1};case Go:case Vo:return{byteLength:2,components:4};case qn:case Ho:case Dn:return{byteLength:4,components:1};case Wc:case $c:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:zo}}));typeof window<"u"&&(window.__THREE__?Ve("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=zo);function Md(){let s=null,e=!1,t=null,n=null;function i(a,r){n=s.requestAnimationFrame(i),t(a,r)}return{start:function(){e!==!0&&t!==null&&s!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(a){t=a},setContext:function(a){s=a}}}function gu(s){const e=new WeakMap;function t(o,l){const c=o.array,d=o.usage,u=c.byteLength,h=s.createBuffer();s.bindBuffer(l,h),s.bufferData(l,c,d),o.onUploadCallback();let f;if(c instanceof Float32Array)f=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=s.SHORT;else if(c instanceof Uint32Array)f=s.UNSIGNED_INT;else if(c instanceof Int32Array)f=s.INT;else if(c instanceof Int8Array)f=s.BYTE;else if(c instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:u}}function n(o,l,c){const d=l.array,u=l.updateRanges;if(s.bindBuffer(c,o),u.length===0)s.bufferSubData(c,0,d);else{u.sort((f,g)=>f.start-g.start);let h=0;for(let f=1;f<u.length;f++){const g=u[h],v=u[f];v.start<=g.start+g.count+1?g.count=Math.max(g.count,v.start+v.count-g.start):(++h,u[h]=v)}u.length=h+1;for(let f=0,g=u.length;f<g;f++){const v=u[f];s.bufferSubData(c,v.start*d.BYTES_PER_ELEMENT,d,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function a(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(s.deleteBuffer(l.buffer),e.delete(o))}function r(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:a,update:r}}var vu=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,xu=`#ifdef USE_ALPHAHASH
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
#endif`,yu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,_u=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Mu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,bu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,wu=`#ifdef USE_AOMAP
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
#endif`,Su=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Eu=`#ifdef USE_BATCHING
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
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Tu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Au=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Ru=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Cu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Pu=`#ifdef USE_IRIDESCENCE
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
#endif`,Lu=`#ifdef USE_BUMPMAP
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
#endif`,Iu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Du=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Nu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Uu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Fu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Ou=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,ku=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,zu=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,Bu=`#define PI 3.141592653589793
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
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
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
} // validated`,Hu=`vec3 transformedNormal = objectNormal;
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
#endif`,Gu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Vu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Wu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,$u=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,qu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Xu=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Yu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,Ku=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,Zu=`#ifdef USE_ENVMAP
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
#endif`,Ju=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Qu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,ju=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ef=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,tf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,nf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,sf=`#ifdef USE_GRADIENTMAP
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
}`,af=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,rf=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,of=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lf=`uniform bool receiveShadow;
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
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
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
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
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
#endif
#include <lightprobes_pars_fragment>`,cf=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,df=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,hf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,uf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ff=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,pf=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
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
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
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
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
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
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
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
#endif`,mf=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
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
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
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
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
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
		return 0.5 / max( gv + gl, EPSILON );
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
		float roughness = max( material.clearcoatRoughness, 0.045 );
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
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
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
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
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
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
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
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
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
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
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
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,gf=`
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
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
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
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,vf=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,xf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,yf=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,_f=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Mf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,bf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,wf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Sf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ef=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Tf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Af=`#if defined( USE_POINTS_UV )
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
#endif`,Rf=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Cf=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Pf=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Lf=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,If=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Df=`#ifdef USE_MORPHTARGETS
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
#endif`,Nf=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Uf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#ifdef DOUBLE_SIDED
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
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Ff=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Of=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,kf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,zf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Bf=`#ifdef USE_NORMALMAP
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
#endif`,Hf=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Gf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Vf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Wf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,$f=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,qf=`vec3 packNormalToRGB( const in vec3 normal ) {
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,Xf=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Yf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Kf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Zf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Jf=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Qf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,jf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
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
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
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
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,ep=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
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
#endif`,tp=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
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
#endif`,np=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
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
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
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
}`,ip=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,sp=`#ifdef USE_SKINNING
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
#endif`,ap=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,rp=`#ifdef USE_SKINNING
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
#endif`,op=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,lp=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,cp=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,dp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,hp=`#ifdef USE_TRANSMISSION
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
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,up=`#ifdef USE_TRANSMISSION
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
#endif`,fp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
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
#endif`,pp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
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
#endif`,mp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
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
#endif`,gp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const vp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,xp=`uniform sampler2D t2D;
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
}`,yp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,_p=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Mp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,bp=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,wp=`#include <common>
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
}`,Sp=`#if DEPTH_PACKING == 3200
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
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Ep=`#define DISTANCE
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
}`,Tp=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Ap=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Rp=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Cp=`uniform float scale;
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
}`,Pp=`uniform vec3 diffuse;
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
}`,Lp=`#include <common>
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
}`,Ip=`uniform vec3 diffuse;
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
}`,Dp=`#define LAMBERT
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
}`,Np=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,Up=`#define MATCAP
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
}`,Fp=`#define MATCAP
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
}`,Op=`#define NORMAL
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
}`,kp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
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
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,zp=`#define PHONG
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
}`,Bp=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
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
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
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
}`,Hp=`#define STANDARD
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
}`,Gp=`#define STANDARD
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
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
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
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
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
}`,Vp=`#define TOON
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
}`,Wp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
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
}`,$p=`uniform float size;
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
}`,qp=`uniform vec3 diffuse;
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
}`,Xp=`#include <common>
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
}`,Yp=`uniform vec3 color;
uniform float opacity;
#include <common>
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
	#include <premultiplied_alpha_fragment>
}`,Kp=`uniform float rotation;
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
}`,Zp=`uniform vec3 diffuse;
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
}`,Qe={alphahash_fragment:vu,alphahash_pars_fragment:xu,alphamap_fragment:yu,alphamap_pars_fragment:_u,alphatest_fragment:Mu,alphatest_pars_fragment:bu,aomap_fragment:wu,aomap_pars_fragment:Su,batching_pars_vertex:Eu,batching_vertex:Tu,begin_vertex:Au,beginnormal_vertex:Ru,bsdfs:Cu,iridescence_fragment:Pu,bumpmap_pars_fragment:Lu,clipping_planes_fragment:Iu,clipping_planes_pars_fragment:Du,clipping_planes_pars_vertex:Nu,clipping_planes_vertex:Uu,color_fragment:Fu,color_pars_fragment:Ou,color_pars_vertex:ku,color_vertex:zu,common:Bu,defaultnormal_vertex:Hu,displacementmap_pars_vertex:Gu,displacementmap_vertex:Vu,emissivemap_fragment:Wu,emissivemap_pars_fragment:$u,colorspace_fragment:qu,colorspace_pars_fragment:Xu,envmap_fragment:Yu,envmap_common_pars_fragment:Ku,envmap_pars_fragment:Zu,envmap_pars_vertex:Ju,envmap_physical_pars_fragment:cf,envmap_vertex:Qu,fog_vertex:ju,fog_pars_vertex:ef,fog_fragment:tf,fog_pars_fragment:nf,gradientmap_pars_fragment:sf,lightmap_pars_fragment:af,lights_lambert_fragment:rf,lights_lambert_pars_fragment:of,lights_pars_begin:lf,lights_toon_fragment:df,lights_toon_pars_fragment:hf,lights_phong_fragment:uf,lights_phong_pars_fragment:ff,lights_physical_fragment:pf,lights_physical_pars_fragment:mf,lights_fragment_begin:gf,lights_fragment_maps:vf,lights_fragment_end:xf,lightprobes_pars_fragment:yf,logdepthbuf_fragment:_f,logdepthbuf_pars_fragment:Mf,logdepthbuf_pars_vertex:bf,logdepthbuf_vertex:wf,map_fragment:Sf,map_pars_fragment:Ef,map_particle_fragment:Tf,map_particle_pars_fragment:Af,metalnessmap_fragment:Rf,metalnessmap_pars_fragment:Cf,morphinstance_vertex:Pf,morphcolor_vertex:Lf,morphnormal_vertex:If,morphtarget_pars_vertex:Df,morphtarget_vertex:Nf,normal_fragment_begin:Uf,normal_fragment_maps:Ff,normal_pars_fragment:Of,normal_pars_vertex:kf,normal_vertex:zf,normalmap_pars_fragment:Bf,clearcoat_normal_fragment_begin:Hf,clearcoat_normal_fragment_maps:Gf,clearcoat_pars_fragment:Vf,iridescence_pars_fragment:Wf,opaque_fragment:$f,packing:qf,premultiplied_alpha_fragment:Xf,project_vertex:Yf,dithering_fragment:Kf,dithering_pars_fragment:Zf,roughnessmap_fragment:Jf,roughnessmap_pars_fragment:Qf,shadowmap_pars_fragment:jf,shadowmap_pars_vertex:ep,shadowmap_vertex:tp,shadowmask_pars_fragment:np,skinbase_vertex:ip,skinning_pars_vertex:sp,skinning_vertex:ap,skinnormal_vertex:rp,specularmap_fragment:op,specularmap_pars_fragment:lp,tonemapping_fragment:cp,tonemapping_pars_fragment:dp,transmission_fragment:hp,transmission_pars_fragment:up,uv_pars_fragment:fp,uv_pars_vertex:pp,uv_vertex:mp,worldpos_vertex:gp,background_vert:vp,background_frag:xp,backgroundCube_vert:yp,backgroundCube_frag:_p,cube_vert:Mp,cube_frag:bp,depth_vert:wp,depth_frag:Sp,distance_vert:Ep,distance_frag:Tp,equirect_vert:Ap,equirect_frag:Rp,linedashed_vert:Cp,linedashed_frag:Pp,meshbasic_vert:Lp,meshbasic_frag:Ip,meshlambert_vert:Dp,meshlambert_frag:Np,meshmatcap_vert:Up,meshmatcap_frag:Fp,meshnormal_vert:Op,meshnormal_frag:kp,meshphong_vert:zp,meshphong_frag:Bp,meshphysical_vert:Hp,meshphysical_frag:Gp,meshtoon_vert:Vp,meshtoon_frag:Wp,points_vert:$p,points_frag:qp,shadow_vert:Xp,shadow_frag:Yp,sprite_vert:Kp,sprite_frag:Zp},_e={common:{diffuse:{value:new Oe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Xe}},envmap:{envMap:{value:null},envMapRotation:{value:new Xe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Xe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Xe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Xe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Xe},normalScale:{value:new $e(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Xe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Xe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Xe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Xe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Oe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Oe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0},uvTransform:{value:new Xe}},sprite:{diffuse:{value:new Oe(16777215)},opacity:{value:1},center:{value:new $e(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Xe},alphaMap:{value:null},alphaMapTransform:{value:new Xe},alphaTest:{value:0}}},Gn={basic:{uniforms:on([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.fog]),vertexShader:Qe.meshbasic_vert,fragmentShader:Qe.meshbasic_frag},lambert:{uniforms:on([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Oe(0)},envMapIntensity:{value:1}}]),vertexShader:Qe.meshlambert_vert,fragmentShader:Qe.meshlambert_frag},phong:{uniforms:on([_e.common,_e.specularmap,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,_e.lights,{emissive:{value:new Oe(0)},specular:{value:new Oe(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphong_vert,fragmentShader:Qe.meshphong_frag},standard:{uniforms:on([_e.common,_e.envmap,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.roughnessmap,_e.metalnessmap,_e.fog,_e.lights,{emissive:{value:new Oe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag},toon:{uniforms:on([_e.common,_e.aomap,_e.lightmap,_e.emissivemap,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.gradientmap,_e.fog,_e.lights,{emissive:{value:new Oe(0)}}]),vertexShader:Qe.meshtoon_vert,fragmentShader:Qe.meshtoon_frag},matcap:{uniforms:on([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,_e.fog,{matcap:{value:null}}]),vertexShader:Qe.meshmatcap_vert,fragmentShader:Qe.meshmatcap_frag},points:{uniforms:on([_e.points,_e.fog]),vertexShader:Qe.points_vert,fragmentShader:Qe.points_frag},dashed:{uniforms:on([_e.common,_e.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Qe.linedashed_vert,fragmentShader:Qe.linedashed_frag},depth:{uniforms:on([_e.common,_e.displacementmap]),vertexShader:Qe.depth_vert,fragmentShader:Qe.depth_frag},normal:{uniforms:on([_e.common,_e.bumpmap,_e.normalmap,_e.displacementmap,{opacity:{value:1}}]),vertexShader:Qe.meshnormal_vert,fragmentShader:Qe.meshnormal_frag},sprite:{uniforms:on([_e.sprite,_e.fog]),vertexShader:Qe.sprite_vert,fragmentShader:Qe.sprite_frag},background:{uniforms:{uvTransform:{value:new Xe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Qe.background_vert,fragmentShader:Qe.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Xe}},vertexShader:Qe.backgroundCube_vert,fragmentShader:Qe.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Qe.cube_vert,fragmentShader:Qe.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Qe.equirect_vert,fragmentShader:Qe.equirect_frag},distance:{uniforms:on([_e.common,_e.displacementmap,{referencePosition:{value:new L},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Qe.distance_vert,fragmentShader:Qe.distance_frag},shadow:{uniforms:on([_e.lights,_e.fog,{color:{value:new Oe(0)},opacity:{value:1}}]),vertexShader:Qe.shadow_vert,fragmentShader:Qe.shadow_frag}};Gn.physical={uniforms:on([Gn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Xe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Xe},clearcoatNormalScale:{value:new $e(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Xe},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Xe},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Xe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Xe},sheen:{value:0},sheenColor:{value:new Oe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Xe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Xe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Xe},transmissionSamplerSize:{value:new $e},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Xe},attenuationDistance:{value:0},attenuationColor:{value:new Oe(0)},specularColor:{value:new Oe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Xe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Xe},anisotropyVector:{value:new $e},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Xe}}]),vertexShader:Qe.meshphysical_vert,fragmentShader:Qe.meshphysical_frag};const ba={r:0,b:0,g:0},Jp=new ut,bd=new Xe;bd.set(-1,0,0,0,1,0,0,0,1);function Qp(s,e,t,n,i,a){const r=new Oe(0);let o=i===!0?0:1,l,c,d=null,u=0,h=null;function f(x){let M=x.isScene===!0?x.background:null;if(M&&M.isTexture){const _=x.backgroundBlurriness>0;M=e.get(M,_)}return M}function g(x){let M=!1;const _=f(x);_===null?m(r,o):_&&_.isColor&&(m(_,1),M=!0);const E=s.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,a):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,a),(s.autoClear||M)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function v(x,M){const _=f(M);_&&_.isCubeTexture?(c===void 0&&(c=new Y(new Si(1,1,1),new dn({name:"BackgroundCubeMaterial",uniforms:ps(Gn.backgroundCube.uniforms),vertexShader:Gn.backgroundCube.vertexShader,fragmentShader:Gn.backgroundCube.fragmentShader,side:tn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(E,T,y){this.matrixWorld.copyPosition(y.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=_,c.material.uniforms.backgroundBlurriness.value=M.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Jp.makeRotationFromEuler(M.backgroundRotation)).transpose(),_.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(bd),c.material.toneMapped=at.getTransfer(_.colorSpace)!==mt,(d!==_||u!==_.version||h!==s.toneMapping)&&(c.material.needsUpdate=!0,d=_,u=_.version,h=s.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new Y(new Ot(2,2),new dn({name:"BackgroundMaterial",uniforms:ps(Gn.background.uniforms),vertexShader:Gn.background.vertexShader,fragmentShader:Gn.background.fragmentShader,side:Ui,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=M.backgroundIntensity,l.material.toneMapped=at.getTransfer(_.colorSpace)!==mt,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),(d!==_||u!==_.version||h!==s.toneMapping)&&(l.material.needsUpdate=!0,d=_,u=_.version,h=s.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function m(x,M){x.getRGB(ba,pd(s)),t.buffers.color.setClear(ba.r,ba.g,ba.b,M,a)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return r},setClearColor:function(x,M=1){r.set(x),o=M,m(r,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,m(r,o)},render:g,addToRenderList:v,dispose:p}}function jp(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=h(null);let a=i,r=!1;function o(O,k,Z,R,U){let F=!1;const z=u(O,R,Z,k);a!==z&&(a=z,c(a.object)),F=f(O,R,Z,U),F&&g(O,R,Z,U),U!==null&&e.update(U,s.ELEMENT_ARRAY_BUFFER),(F||r)&&(r=!1,_(O,k,Z,R),U!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(U).buffer))}function l(){return s.createVertexArray()}function c(O){return s.bindVertexArray(O)}function d(O){return s.deleteVertexArray(O)}function u(O,k,Z,R){const U=R.wireframe===!0;let F=n[k.id];F===void 0&&(F={},n[k.id]=F);const z=O.isInstancedMesh===!0?O.id:0;let j=F[z];j===void 0&&(j={},F[z]=j);let W=j[Z.id];W===void 0&&(W={},j[Z.id]=W);let te=W[U];return te===void 0&&(te=h(l()),W[U]=te),te}function h(O){const k=[],Z=[],R=[];for(let U=0;U<t;U++)k[U]=0,Z[U]=0,R[U]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:Z,attributeDivisors:R,object:O,attributes:{},index:null}}function f(O,k,Z,R){const U=a.attributes,F=k.attributes;let z=0;const j=Z.getAttributes();for(const W in j)if(j[W].location>=0){const se=U[W];let Me=F[W];if(Me===void 0&&(W==="instanceMatrix"&&O.instanceMatrix&&(Me=O.instanceMatrix),W==="instanceColor"&&O.instanceColor&&(Me=O.instanceColor)),se===void 0||se.attribute!==Me||Me&&se.data!==Me.data)return!0;z++}return a.attributesNum!==z||a.index!==R}function g(O,k,Z,R){const U={},F=k.attributes;let z=0;const j=Z.getAttributes();for(const W in j)if(j[W].location>=0){let se=F[W];se===void 0&&(W==="instanceMatrix"&&O.instanceMatrix&&(se=O.instanceMatrix),W==="instanceColor"&&O.instanceColor&&(se=O.instanceColor));const Me={};Me.attribute=se,se&&se.data&&(Me.data=se.data),U[W]=Me,z++}a.attributes=U,a.attributesNum=z,a.index=R}function v(){const O=a.newAttributes;for(let k=0,Z=O.length;k<Z;k++)O[k]=0}function m(O){p(O,0)}function p(O,k){const Z=a.newAttributes,R=a.enabledAttributes,U=a.attributeDivisors;Z[O]=1,R[O]===0&&(s.enableVertexAttribArray(O),R[O]=1),U[O]!==k&&(s.vertexAttribDivisor(O,k),U[O]=k)}function x(){const O=a.newAttributes,k=a.enabledAttributes;for(let Z=0,R=k.length;Z<R;Z++)k[Z]!==O[Z]&&(s.disableVertexAttribArray(Z),k[Z]=0)}function M(O,k,Z,R,U,F,z){z===!0?s.vertexAttribIPointer(O,k,Z,U,F):s.vertexAttribPointer(O,k,Z,R,U,F)}function _(O,k,Z,R){v();const U=R.attributes,F=Z.getAttributes(),z=k.defaultAttributeValues;for(const j in F){const W=F[j];if(W.location>=0){let te=U[j];if(te===void 0&&(j==="instanceMatrix"&&O.instanceMatrix&&(te=O.instanceMatrix),j==="instanceColor"&&O.instanceColor&&(te=O.instanceColor)),te!==void 0){const se=te.normalized,Me=te.itemSize,Ue=e.get(te);if(Ue===void 0)continue;const ne=Ue.buffer,ce=Ue.type,we=Ue.bytesPerElement,Ae=ce===s.INT||ce===s.UNSIGNED_INT||te.gpuType===Ho;if(te.isInterleavedBufferAttribute){const ve=te.data,me=ve.isInterleavedBuffer===!0?ve.stride:ve.itemSize,ze=te.offset;if(ve.isInstancedInterleavedBuffer||ve.isInstancedBufferAttribute){for(let xe=0;xe<W.locationSize;xe++)p(W.location+xe,ve.meshPerAttribute);O.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=ve.meshPerAttribute*ve.count)}else for(let xe=0;xe<W.locationSize;xe++)m(W.location+xe);s.bindBuffer(s.ARRAY_BUFFER,ne);for(let xe=0;xe<W.locationSize;xe++)M(W.location+xe,Me/W.locationSize,ce,se,me*we,(ze+Me/W.locationSize*xe)*we,Ae)}else{if(te.isInstancedBufferAttribute){for(let ve=0;ve<W.locationSize;ve++)p(W.location+ve,te.meshPerAttribute);O.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=te.meshPerAttribute*te.count)}else for(let ve=0;ve<W.locationSize;ve++)m(W.location+ve);s.bindBuffer(s.ARRAY_BUFFER,ne);for(let ve=0;ve<W.locationSize;ve++)M(W.location+ve,Me/W.locationSize,ce,se,Me*we,Me/W.locationSize*ve*we,Ae)}}else if(z!==void 0){const se=z[j];if(se!==void 0)switch(se.length){case 2:s.vertexAttrib2fv(W.location,se);break;case 3:s.vertexAttrib3fv(W.location,se);break;case 4:s.vertexAttrib4fv(W.location,se);break;default:s.vertexAttrib1fv(W.location,se)}}}}x()}function E(){P();for(const O in n){const k=n[O];for(const Z in k){const R=k[Z];for(const U in R){const F=R[U];for(const z in F)d(F[z].object),delete F[z];delete R[U]}}delete n[O]}}function T(O){if(n[O.id]===void 0)return;const k=n[O.id];for(const Z in k){const R=k[Z];for(const U in R){const F=R[U];for(const z in F)d(F[z].object),delete F[z];delete R[U]}}delete n[O.id]}function y(O){for(const k in n){const Z=n[k];for(const R in Z){const U=Z[R];if(U[O.id]===void 0)continue;const F=U[O.id];for(const z in F)d(F[z].object),delete F[z];delete U[O.id]}}}function b(O){for(const k in n){const Z=n[k],R=O.isInstancedMesh===!0?O.id:0,U=Z[R];if(U!==void 0){for(const F in U){const z=U[F];for(const j in z)d(z[j].object),delete z[j];delete U[F]}delete Z[R],Object.keys(Z).length===0&&delete n[k]}}}function P(){I(),r=!0,a!==i&&(a=i,c(a.object))}function I(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:P,resetDefaultState:I,dispose:E,releaseStatesOfGeometry:T,releaseStatesOfObject:b,releaseStatesOfProgram:y,initAttributes:v,enableAttribute:m,disableUnusedAttributes:x}}function em(s,e,t){let n;function i(l){n=l}function a(l,c){s.drawArrays(n,l,c),t.update(c,n,1)}function r(l,c,d){d!==0&&(s.drawArraysInstanced(n,l,c,d),t.update(c,n,d))}function o(l,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,d);let h=0;for(let f=0;f<d;f++)h+=c[f];t.update(h,n,1)}this.setMode=i,this.render=a,this.renderInstances=r,this.renderMultiDraw=o}function tm(s,e,t,n){let i;function a(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const y=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(y.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(y){return!(y!==Vn&&n.convert(y)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(y){const b=y===Xn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(y!==xn&&y!==Dn&&!b&&n.convert(y)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(y){if(y==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";y="mediump"}return y==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const d=l(c);d!==c&&(Ve("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);const u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),h=t.logarithmicDepthBuffer===!0&&u===!1;t.reversedDepthBuffer===!0&&u===!1&&Ve("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&u===!0&&Ve("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const f=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),m=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),x=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),M=s.getParameter(s.MAX_VARYING_VECTORS),_=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),E=s.getParameter(s.MAX_SAMPLES),T=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:a,getMaxPrecision:l,textureFormatReadable:r,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:v,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:x,maxVaryings:M,maxFragmentUniforms:_,maxSamples:E,samples:T}}function nm(s){const e=this;let t=null,n=0,i=!1,a=!1;const r=new gi,o=new Xe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,h){const f=u.length!==0||h||n!==0||i;return i=h,n=u.length,f},this.beginShadows=function(){a=!0,d(null)},this.endShadows=function(){a=!1},this.setGlobalState=function(u,h){t=d(u,h,0)},this.setState=function(u,h,f){const g=u.clippingPlanes,v=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||a&&!m)a?d(null):c();else{const x=a?0:n,M=x*4;let _=p.clippingState||null;l.value=_,_=d(g,h,M,f);for(let E=0;E!==M;++E)_[E]=t[E];p.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function d(u,h,f,g){const v=u!==null?u.length:0;let m=null;if(v!==0){if(m=l.value,g!==!0||m===null){const p=f+v*4,x=h.matrixWorldInverse;o.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let M=0,_=f;M!==v;++M,_+=4)r.copy(u[M]).applyMatrix4(x,o),r.normal.toArray(m,_),m[_+3]=r.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,m}}class tl extends Wn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new dd(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Si(5,5,5),a=new dn({name:"CubemapFromEquirect",uniforms:ps(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:tn,blending:ls});a.uniforms.tEquirect.value=t;const r=new Y(i,a),o=t.minFilter;return t.minFilter===xi&&(t.minFilter=fn),new Do(1,10,this).update(e,r),t.minFilter=o,r.geometry.dispose(),r.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const a=e.getRenderTarget();for(let r=0;r<6;r++)e.setRenderTarget(this,r),e.clear(t,n,i);e.setRenderTarget(a)}}const sc=256,im=3,sm=20,wd=256,Sd=16,am=3,rm=new L,om=new Oe;class Xa{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Do(1,10,null),this._boxMesh=new Y(new Si(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,i=100,a={}){const{size:r=256,position:o=rm}=a,l=this._renderer;this._setSize(r);const c=this._allocateTarget(),d=this._getSourceTarget(!0);t>0&&(d.texture.mipmapsAutoUpdate=!1);const u=l.autoClear,h=l.autoClearColor,f=l.autoClearDepth,g=l.autoClearStencil,v=e.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,v===null&&(e.background=l.getClearColor(om));const m=new Do(n,i,d);return m.position.copy(o),m.update(l,e),l.autoClear=u,l.autoClearColor=h,l.autoClearDepth=f,l.autoClearStencil=g,e.background=v,t>0&&(d.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=oc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=rc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(sc,Lh(e))}_fromTexture(e,t){e.mapping===hs||e.mapping===Us?this._setSize(e.image.length===0?sc:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);const n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){const e=this._cubeSize,t=ac(e,!1,!1),n=Math.log2(e)-im;for(let i=0;i<=n;i++)t.texture.mipmaps.push({width:e>>i,height:e>>i});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){const t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=ac(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){const i=this._boxMesh,a=this._cubeCamera;i.material=n,a.renderTarget=e,a.activeMipmapLevel=t;const r=e.width>>t;e.viewport.set(0,0,r,r),a.update(this._renderer,i),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===hs||e.mapping===Us?(this._cubemapMaterial===null&&(this._cubemapMaterial=oc()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=rc()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=lm(),this._integrationMaterial=cm());const t=this._cubeSize,n=e.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;const a=this._integrationMaterial.uniforms;a.envMap.value=this._sourceTarget.texture,a.sourceLod.value=Math.log2(t/Sd);for(let r=0;r<=n;r++){const o=Xa.lodToRoughness(r,n);if(r>n-am)a.roughness.value=o,this._renderCube(e,r,this._integrationMaterial);else{const l=o>0?Math.log2(t)+.5*Math.log2(6/(wd*Math.pow(o,4)))+.5:0;i.roughness.value=o,i.lodBias.value=l,this._renderCube(e,r,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=dm());const n=this._blurMaterial,i=n.uniforms,a=this._sourceTarget;i.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,i.envMap.value=a.texture,this._renderCube(e,0,n),i.envMap.value=e.texture,this._renderCube(a,0,n)}}function ac(s,e,t){return new tl(s,{minFilter:xi,generateMipmaps:e,type:Xn,colorSpace:za,depthBuffer:t})}function Ws(s,e,t){return new dn({name:s,uniforms:e,vertexShader:Qe.cube_vert,fragmentShader:t,side:tn,blending:ls,depthTest:!1,depthWrite:!1})}function lm(){return Ws("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${wd}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function cm(){return Ws("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Sd}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function dm(){return Ws("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${sm}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function rc(){return Ws("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function oc(){return Ws("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function hm(s){let e=new WeakMap,t=new WeakMap,n=null;function i(h,f=!1){return h==null?null:f?r(h):a(h)}function a(h){if(h&&h.isTexture){const f=h.mapping;if(f===rr||f===or)if(e.has(h)){const g=e.get(h).texture;return o(g,h.mapping)}else{const g=h.image;if(g&&g.height>0){const v=new tl(g.height);return v.fromEquirectangularTexture(s,h),e.set(h,v),h.addEventListener("dispose",c),o(v.texture,h.mapping)}else return null}}return h}function r(h){if(h&&h.isTexture&&h.isPMREMTexture!==!0){const f=h.mapping,g=f===rr||f===or,v=f===hs||f===Us;if(g||v){let m=t.get(h);const p=m!==void 0?m.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==p)return n===null&&(n=new Xa(s)),m=g?n.fromEquirectangular(h,m):n.fromCubemap(h,m),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),m.texture;if(m!==void 0)return m.texture;{const x=h.image;return g&&x&&x.height>0||v&&x&&l(x)?(n===null&&(n=new Xa(s)),m=g?n.fromEquirectangular(h):n.fromCubemap(h),m.texture.pmremVersion=h.pmremVersion,t.set(h,m),h.addEventListener("dispose",d),m.texture):null}}}return h}function o(h,f){return f===rr?h.mapping=hs:f===or&&(h.mapping=Us),h}function l(h){let f=0;const g=6;for(let v=0;v<g;v++)h[v]!==void 0&&f++;return f===g}function c(h){const f=h.target;f.removeEventListener("dispose",c);const g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function d(h){const f=h.target;f.removeEventListener("dispose",d);const g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function u(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:u}}function um(s){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=s.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&cs("WebGLRenderer: "+n+" extension not supported."),i}}}function fm(s,e,t,n){const i={},a=new WeakMap,r=new FinalizationRegistry(g=>delete i[g]);function o(g){l(g.target)}function l(g){g.index!==null&&e.remove(g.index);for(const m in g.attributes)e.remove(g.attributes[m]);g.removeEventListener("dispose",o),delete i[g.id],r.unregister(g);const v=a.get(g);v&&(e.remove(v),a.delete(g)),n.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,t.memory.geometries--}function c(g,v){return i[v.id]!==void 0||(v.addEventListener("dispose",o),i[v.id]=new WeakRef(v),r.register(v,v.id,v),t.memory.geometries++),v}function d(g){const v=g.attributes;for(const m in v)e.update(v[m],s.ARRAY_BUFFER)}function u(g){const v=g.index,m=g.attributes.position;let p=0;if(m===void 0)return;const x=v!==null?v.array.length:m.array.length/3-1,M=m.count>=65535?rd:ad,_=new M(Math.ceil(x/3)*6,1),E=_.array;if(v!==null){const y=v.array;p=v.version;for(let b=0,P=0;b<x;b+=3){const I=y[b+0],O=y[b+1],k=y[b+2];E[P++]=I,E[P++]=O,E[P++]=O,E[P++]=k,E[P++]=k,E[P++]=I}}else{p=m.version;for(let y=0,b=0;y<x;y+=3){const P=y+0,I=y+1,O=y+2;E[b++]=P,E[b++]=I,E[b++]=I,E[b++]=O,E[b++]=O,E[b++]=P}}_.version=p;const T=a.get(g);T&&e.remove(T),a.set(g,_)}function h(g){const v=a.get(g);if(v){const m=g.index;m!==null&&v.version<m.version&&u(g)}else u(g);return a.get(g)}function f(){for(const g in i){const v=i[g].deref();v!==void 0&&l(v)}}return{get:c,update:d,getWireframeAttribute:h,dispose:f}}function pm(s,e,t){let n;function i(u){n=u}let a,r;function o(u){a=u.type,r=u.bytesPerElement}function l(u,h){s.drawElements(n,h,a,u*r),t.update(h,n,1)}function c(u,h,f){f!==0&&(s.drawElementsInstanced(n,h,a,u*r,f),t.update(h,n,f))}function d(u,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,h,0,a,u,0,f);let v=0;for(let m=0;m<f;m++)v+=h[m];t.update(v,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function mm(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(a,r,o){switch(t.calls++,r){case s.TRIANGLES:t.triangles+=o*(a/3);break;case s.LINES:t.lines+=o*(a/2);break;case s.LINE_STRIP:t.lines+=o*(a-1);break;case s.LINE_LOOP:t.lines+=o*a;break;case s.POINTS:t.points+=o*a;break;default:ct("WebGLInfo: Unknown draw mode:",r);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function gm(s,e,t){const n=new WeakMap,i=new Rt;function a(r,o,l){const c=r.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,u=d!==void 0?d.length:0;let h=n.get(o);if(h===void 0||h.count!==u){let I=function(){b.dispose(),n.delete(o),o.removeEventListener("dispose",I)};var f=I;h!==void 0&&h.texture.dispose();const g=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],M=o.morphAttributes.color||[];let _=0;g===!0&&(_=1),v===!0&&(_=2),m===!0&&(_=3);let E=o.attributes.position.count*_,T=1;E>e.maxTextureSize&&(T=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const y=new Float32Array(E*T*4*u),b=new td(y,E,T,u);b.type=Dn,b.needsUpdate=!0;const P=_*4;for(let O=0;O<u;O++){const k=p[O],Z=x[O],R=M[O],U=E*T*4*O;for(let F=0;F<k.count;F++){const z=F*P;g===!0&&(i.fromBufferAttribute(k,F),y[U+z+0]=i.x,y[U+z+1]=i.y,y[U+z+2]=i.z,y[U+z+3]=0),v===!0&&(i.fromBufferAttribute(Z,F),y[U+z+4]=i.x,y[U+z+5]=i.y,y[U+z+6]=i.z,y[U+z+7]=0),m===!0&&(i.fromBufferAttribute(R,F),y[U+z+8]=i.x,y[U+z+9]=i.y,y[U+z+10]=i.z,y[U+z+11]=R.itemSize===4?i.w:1)}}h={count:u,texture:b,size:new $e(E,T)},n.set(o,h),o.addEventListener("dispose",I)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",r.morphTexture,t);else{let g=0;for(let m=0;m<c.length;m++)g+=c[m];const v=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(s,"morphTargetBaseInfluence",v),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",h.size)}return{update:a}}function vm(s,e,t,n,i){let a=new WeakMap;function r(c){const d=i.render.frame,u=c.geometry,h=e.get(c,u);if(a.get(h)!==d&&(e.update(h),a.set(h,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),a.get(c)!==d&&(t.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,s.ARRAY_BUFFER),a.set(c,d))),c.isSkinnedMesh){const f=c.skeleton;a.get(f)!==d&&(f.update(),a.set(f,d))}return h}function o(){a=new WeakMap}function l(c){const d=c.target;d.removeEventListener("dispose",l),n.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:r,dispose:o}}const xm={[Uc]:"LINEAR_TONE_MAPPING",[Fc]:"REINHARD_TONE_MAPPING",[Oc]:"CINEON_TONE_MAPPING",[Bo]:"ACES_FILMIC_TONE_MAPPING",[zc]:"AGX_TONE_MAPPING",[Bc]:"NEUTRAL_TONE_MAPPING",[kc]:"CUSTOM_TONE_MAPPING"};function ym(s,e,t,n,i,a){const r=new Wn(e,t,{type:s,depthBuffer:i,stencilBuffer:a,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null,c=null;const d=new _t;d.setAttribute("position",new ft([-1,3,0,-1,-1,0,3,-1,0],3)),d.setAttribute("uv",new ft([0,2,0,0,2,0],2));const u=new ou({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),h=new Y(d,u),f=new yd(-1,1,1,-1,0,1);let g=null,v=null,m=!1,p,x=null,M=[],_=!1;this.setSize=function(E,T){r.setSize(E,T),o!==null&&o.setSize(E,T),l!==null&&l.setSize(E,T);for(let y=0;y<M.length;y++){const b=M[y];b.setSize&&b.setSize(E,T)}},this.setEffects=function(E){M=E,_=M.length>0&&M[0].isRenderPass===!0;const T=r.width,y=r.height;M.length>0&&o===null&&(o=new Wn(T,y,{type:Xn,depthBuffer:!1,stencilBuffer:!1}),l=new Wn(T,y,{type:Xn,depthBuffer:!1,stencilBuffer:!1}));const b=i===!0&&M.some(P=>P.needsDepthTexture===!0);b!==(r.depthTexture!==null)&&(b===!0&&c===null&&(c=new fs(T,y),a===!0&&(c.format=yi,c.type=us)),r.dispose(),r.depthTexture=b?c:null,r.resolveDepthBuffer=b,r.storeMultisampledDepthBuffer=b);for(let P=0;P<M.length;P++){const I=M[P];I.setSize&&I.setSize(T,y),b&&I.needsDepthTexture===!0&&I.setDepthTexture&&I.setDepthTexture(c)}},this.begin=function(E,T){if(m||E.toneMapping===ai&&M.length===0)return!1;if(x=T,T!==null){const y=T.width,b=T.height;(r.width!==y||r.height!==b)&&this.setSize(y,b)}return _===!1&&E.setRenderTarget(r),p=E.toneMapping,E.toneMapping=ai,!0},this.hasRenderPass=function(){return _},this.end=function(E,T){E.toneMapping=p,m=!0;let y=r,b=o;for(let P=0;P<M.length;P++){const I=M[P];I.enabled!==!1&&(I.render(E,b,y,T),I.needsSwap!==!1&&(y=b,b=b===o?l:o))}if(g!==E.outputColorSpace||v!==E.toneMapping){g=E.outputColorSpace,v=E.toneMapping,u.defines={},at.getTransfer(g)===mt&&(u.defines.SRGB_TRANSFER="");const P=xm[v];P&&(u.defines[P]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=y.texture,E.setRenderTarget(x),E.render(h,f),x=null,m=!1},this.isCompositing=function(){return m},this.dispose=function(){r.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),d.dispose(),u.dispose()}}const Ed=new nn,Td=new fs(1,1),Ad=new hd(1),Rd=new td,Cd=new Oh,Pd=new dd,lc=[],cc=[],dc=new Float32Array(16),hc=new Float32Array(9),uc=new Float32Array(4);function gs(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let a=lc[i];if(a===void 0&&(a=new Float32Array(i),lc[i]=a),e!==0){n.toArray(a,0);for(let r=1,o=0;r!==e;++r)o+=t,s[r].toArray(a,o)}return a}function kt(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function zt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function er(s,e){let t=cc[e];t===void 0&&(t=new Int32Array(e),cc[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function _m(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function Mm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;s.uniform2fv(this.addr,e),zt(t,e)}}function bm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(kt(t,e))return;s.uniform3fv(this.addr,e),zt(t,e)}}function wm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;s.uniform4fv(this.addr,e),zt(t,e)}}function Sm(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),zt(t,e)}else{if(kt(t,n))return;uc.set(n),s.uniformMatrix2fv(this.addr,!1,uc),zt(t,n)}}function Em(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),zt(t,e)}else{if(kt(t,n))return;hc.set(n),s.uniformMatrix3fv(this.addr,!1,hc),zt(t,n)}}function Tm(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(kt(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),zt(t,e)}else{if(kt(t,n))return;dc.set(n),s.uniformMatrix4fv(this.addr,!1,dc),zt(t,n)}}function Am(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function Rm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;s.uniform2iv(this.addr,e),zt(t,e)}}function Cm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;s.uniform3iv(this.addr,e),zt(t,e)}}function Pm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;s.uniform4iv(this.addr,e),zt(t,e)}}function Lm(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function Im(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(kt(t,e))return;s.uniform2uiv(this.addr,e),zt(t,e)}}function Dm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(kt(t,e))return;s.uniform3uiv(this.addr,e),zt(t,e)}}function Nm(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(kt(t,e))return;s.uniform4uiv(this.addr,e),zt(t,e)}}function tr(s){return s.version===0&&(s.compareFunction=Zc,s.needsUpdate=!0),s}function Um(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let a;this.type===s.SAMPLER_2D_SHADOW?a=tr(Td):a=Ed,t.setTexture2D(e||a,i)}function Fm(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Cd,i)}function Om(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let a;this.type===s.SAMPLER_CUBE_SHADOW?a=tr(Ad):a=Pd,t.setTextureCube(e||a,i)}function km(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Rd,i)}function zm(s){switch(s){case 5126:return _m;case 35664:return Mm;case 35665:return bm;case 35666:return wm;case 35674:return Sm;case 35675:return Em;case 35676:return Tm;case 5124:case 35670:return Am;case 35667:case 35671:return Rm;case 35668:case 35672:return Cm;case 35669:case 35673:return Pm;case 5125:return Lm;case 36294:return Im;case 36295:return Dm;case 36296:return Nm;case 35678:case 36198:case 36298:case 36306:case 35682:return Um;case 35679:case 36299:case 36307:return Fm;case 35680:case 36300:case 36308:case 36293:return Om;case 36289:case 36303:case 36311:case 36292:return km}}function Bm(s,e){s.uniform1fv(this.addr,e)}function Hm(s,e){const t=gs(e,this.size,2);s.uniform2fv(this.addr,t)}function Gm(s,e){const t=gs(e,this.size,3);s.uniform3fv(this.addr,t)}function Vm(s,e){const t=gs(e,this.size,4);s.uniform4fv(this.addr,t)}function Wm(s,e){const t=gs(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function $m(s,e){const t=gs(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function qm(s,e){const t=gs(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function Xm(s,e){s.uniform1iv(this.addr,e)}function Ym(s,e){s.uniform2iv(this.addr,e)}function Km(s,e){s.uniform3iv(this.addr,e)}function Zm(s,e){s.uniform4iv(this.addr,e)}function Jm(s,e){s.uniform1uiv(this.addr,e)}function Qm(s,e){s.uniform2uiv(this.addr,e)}function jm(s,e){s.uniform3uiv(this.addr,e)}function e0(s,e){s.uniform4uiv(this.addr,e)}function t0(s,e,t){const n=this.cache,i=e.length,a=er(t,i);kt(n,a)||(s.uniform1iv(this.addr,a),zt(n,a));let r;this.type===s.SAMPLER_2D_SHADOW?r=tr(Td):r=Ed;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||r,a[o])}function n0(s,e,t){const n=this.cache,i=e.length,a=er(t,i);kt(n,a)||(s.uniform1iv(this.addr,a),zt(n,a));for(let r=0;r!==i;++r)t.setTexture3D(e[r]||Cd,a[r])}function i0(s,e,t){const n=this.cache,i=e.length,a=er(t,i);kt(n,a)||(s.uniform1iv(this.addr,a),zt(n,a));let r;this.type===s.SAMPLER_CUBE_SHADOW?r=tr(Ad):r=Pd;for(let o=0;o!==i;++o)t.setTextureCube(e[o]||r,a[o])}function s0(s,e,t){const n=this.cache,i=e.length,a=er(t,i);kt(n,a)||(s.uniform1iv(this.addr,a),zt(n,a));for(let r=0;r!==i;++r)t.setTexture2DArray(e[r]||Rd,a[r])}function a0(s){switch(s){case 5126:return Bm;case 35664:return Hm;case 35665:return Gm;case 35666:return Vm;case 35674:return Wm;case 35675:return $m;case 35676:return qm;case 5124:case 35670:return Xm;case 35667:case 35671:return Ym;case 35668:case 35672:return Km;case 35669:case 35673:return Zm;case 5125:return Jm;case 36294:return Qm;case 36295:return jm;case 36296:return e0;case 35678:case 36198:case 36298:case 36306:case 35682:return t0;case 35679:case 36299:case 36307:return n0;case 35680:case 36300:case 36308:case 36293:return i0;case 36289:case 36303:case 36311:case 36292:return s0}}class r0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=zm(t.type)}}class o0{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=a0(t.type)}}class l0{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let a=0,r=i.length;a!==r;++a){const o=i[a];o.setValue(e,t[o.id],n)}}}const kr=/(\w+)(\])?(\[|\.)?/g;function fc(s,e){s.seq.push(e),s.map[e.id]=e}function c0(s,e,t){const n=s.name,i=n.length;for(kr.lastIndex=0;;){const a=kr.exec(n),r=kr.lastIndex;let o=a[1];const l=a[2]==="]",c=a[3];if(l&&(o=o|0),c===void 0||c==="["&&r+2===i){fc(t,c===void 0?new r0(o,s,e):new o0(o,s,e));break}else{let u=t.map[o];u===void 0&&(u=new l0(o),fc(t,u)),t=u}}}class Ua{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<n;++r){const o=e.getActiveUniform(t,r),l=e.getUniformLocation(t,o.name);c0(o,l,this)}const i=[],a=[];for(const r of this.seq)r.type===e.SAMPLER_2D_SHADOW||r.type===e.SAMPLER_CUBE_SHADOW||r.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(r):a.push(r);i.length>0&&(this.seq=i.concat(a))}setValue(e,t,n,i){const a=this.map[t];a!==void 0&&a.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let a=0,r=t.length;a!==r;++a){const o=t[a],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,a=e.length;i!==a;++i){const r=e[i];r.id in t&&n.push(r)}return n}}function pc(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const d0=37297;let h0=0;function u0(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),a=Math.min(e+6,t.length);for(let r=i;r<a;r++){const o=r+1;n.push(`${o===e?">":" "} ${o}: ${t[r]}`)}return n.join(`
`)}const mc=new Xe;function f0(s){at._getMatrix(mc,at.workingColorSpace,s);const e=`mat3( ${mc.elements.map(t=>t.toFixed(4))} )`;switch(at.getTransfer(s)){case Ba:return[e,"LinearTransferOETF"];case mt:return[e,"sRGBTransferOETF"];default:return Ve("WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function gc(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),a=(s.getShaderInfoLog(e)||"").trim();if(n&&a==="")return"";const r=/ERROR: 0:(\d+)/.exec(a);if(r){const o=parseInt(r[1]);return t.toUpperCase()+`

`+a+`

`+u0(s.getShaderSource(e),o)}else return a}function p0(s,e){const t=f0(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const m0={[Uc]:"Linear",[Fc]:"Reinhard",[Oc]:"Cineon",[Bo]:"ACESFilmic",[zc]:"AgX",[Bc]:"Neutral",[kc]:"Custom"};function g0(s,e){const t=m0[e];return t===void 0?(Ve("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const wa=new L;function v0(){at.getLuminanceCoefficients(wa);const s=wa.x.toFixed(4),e=wa.y.toFixed(4),t=wa.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function x0(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Is).join(`
`)}function y0(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function _0(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const a=s.getActiveAttrib(e,i),r=a.name;let o=1;a.type===s.FLOAT_MAT2&&(o=2),a.type===s.FLOAT_MAT3&&(o=3),a.type===s.FLOAT_MAT4&&(o=4),t[r]={type:a.type,location:s.getAttribLocation(e,r),locationSize:o}}return t}function Is(s){return s!==""}function vc(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function xc(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const M0=/^[ \t]*#include +<([\w\d./]+)>/gm;function No(s){return s.replace(M0,b0)}function b0(s,e){const t=Qe[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return No(t)}const w0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function yc(s){return s.replace(w0,S0)}function S0(s,e,t,n){let i="";for(let a=parseInt(e);a<parseInt(t);a++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+a+" ]").replace(/UNROLLED_LOOP_INDEX/g,a);return i}function _c(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const E0={[Pa]:"SHADOWMAP_TYPE_PCF",[Ls]:"SHADOWMAP_TYPE_VSM"};function T0(s){return E0[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const A0={[Us]:"ENVMAP_MODE_REFRACTION"};function R0(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":A0[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const C0={[Nc]:"ENVMAP_BLENDING_MULTIPLY",[mh]:"ENVMAP_BLENDING_MIX",[gh]:"ENVMAP_BLENDING_ADD"};function P0(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":C0[s.combine]||"ENVMAP_BLENDING_NONE"}function L0(s,e,t,n){const i=s.getContext(),a=t.defines;let r=t.vertexShader,o=t.fragmentShader;const l=T0(t),c=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",d=R0(t),u=P0(t),h=x0(t),f=y0(a),g=i.createProgram();let v,m,p=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(Is).join(`
`),v.length>0&&(v+=`
`),m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(Is).join(`
`),m.length>0&&(m+=`
`)):(v=[_c(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Is).join(`
`),m=[_c(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+u:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==ai?"#define TONE_MAPPING":"",t.toneMapping!==ai?Qe.tonemapping_pars_fragment:"",t.toneMapping!==ai?g0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Qe.colorspace_pars_fragment,p0("linearToOutputTexel",t.outputColorSpace),v0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Is).join(`
`)),r=No(r),r=vc(r,t),r=xc(r,t),o=No(o),o=vc(o,t),o=xc(o,t),r=yc(r),o=yc(o),t.isRawShaderMaterial!==!0&&(p=`#version 300 es
`,v=[h,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,m=["#define varying in",t.glslVersion===Ml?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ml?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+m);const x=p+v+r,M=p+m+o,_=pc(i,i.VERTEX_SHADER,x),E=pc(i,i.FRAGMENT_SHADER,M);i.attachShader(g,_),i.attachShader(g,E),t.index0AttributeName!==void 0?i.bindAttribLocation(g,0,t.index0AttributeName):t.hasPositionAttribute===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function T(I){if(s.debug.checkShaderErrors){const O=i.getProgramInfoLog(g)||"",k=i.getShaderInfoLog(_)||"",Z=i.getShaderInfoLog(E)||"",R=O.trim(),U=k.trim(),F=Z.trim();let z=!0,j=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(z=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,g,_,E);else{const W=gc(i,_,"vertex"),te=gc(i,E,"fragment");ct("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+R+`
`+W+`
`+te)}else R!==""?Ve("WebGLProgram: Program Info Log:",R):(U===""||F==="")&&(j=!1);j&&(I.diagnostics={runnable:z,programLog:R,vertexShader:{log:U,prefix:v},fragmentShader:{log:F,prefix:m}})}i.deleteShader(_),i.deleteShader(E),y=new Ua(i,g),b=_0(i,g)}let y;this.getUniforms=function(){return y===void 0&&T(this),y};let b;this.getAttributes=function(){return b===void 0&&T(this),b};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=i.getProgramParameter(g,d0)),P},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=h0++,this.cacheKey=e,this.usedTimes=1,this.program=g,this.vertexShader=_,this.fragmentShader=E,this}let I0=0;class D0{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const i=this._getShaderCacheForMaterial(e);return i.has(t)===!1&&(i.add(t),t.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new N0(e),t.set(e,n)),n}}class N0{constructor(e){this.id=I0++,this.code=e,this.usedTimes=0}}function U0(s){return s===Fi||s===Oa||s===ka}function F0(s,e,t,n,i,a){const r=new nd,o=new D0,l=new Set,c=[],d=new Map,u=n.logarithmicDepthBuffer,h={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function f(y){return l.add(y),y===0?"uv":`uv${y}`}function g(y,b,P,I,O,k){const Z=I.fog,R=O.geometry,U=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?I.environment:null,F=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,z=e.get(y.envMap||U,F),j=h[y.type];let W=n.precision;y.precision!==null&&(W=n.getMaxPrecision(y.precision),W!==y.precision&&Ve("WebGLProgram.getParameters:",y.precision,"not supported, using",W,"instead."));const te=R.morphAttributes.position||R.morphAttributes.normal||R.morphAttributes.color,se=te!==void 0?te.length:0;let Me=0;R.morphAttributes.position!==void 0&&(Me=1),R.morphAttributes.normal!==void 0&&(Me=2),R.morphAttributes.color!==void 0&&(Me=3);let Ue,ne,ce,we;if(j){const ye=Gn[j];Ue=ye.vertexShader,ne=ye.fragmentShader}else{Ue=y.vertexShader,ne=y.fragmentShader;const ye=o.getVertexShaderStage(y),pt=o.getFragmentShaderStage(y);o.update(y,ye,pt),ce=ye.id,we=pt.id}const Ae=s.getRenderTarget(),ve=s.state.buffers.depth.getReversed(),me=O.isInstancedMesh===!0,ze=O.isBatchedMesh===!0,xe=!!y.map,qe=!!y.matcap,lt=!!z,Ge=lt&&z.isPMREMTexture===!0,St=!!y.aoMap,Lt=!!y.lightMap,It=!!y.bumpMap&&y.wireframe===!1,gt=!!y.normalMap,yn=!!y.displacementMap,Pt=!!y.emissiveMap,hn=!!y.metalnessMap,Kt=!!y.roughnessMap,Wt=y.anisotropy>0,G=y.clearcoat>0,sn=y.diffuseRoughness>0,vt=y.dispersion>0,xt=y.retroreflectivity>0,fe=y.iridescence>0,Et=y.sheen>0,Ie=y.transmission>0,Be=Wt&&!!y.anisotropyMap,C=G&&!!y.clearcoatMap,w=G&&!!y.clearcoatNormalMap,$=G&&!!y.clearcoatRoughnessMap,A=sn&&!!y.diffuseRoughnessMap,H=fe&&!!y.iridescenceMap,J=fe&&!!y.iridescenceThicknessMap,K=Et&&!!y.sheenColorMap,D=Et&&!!y.sheenRoughnessMap,V=!!y.specularMap,ae=!!y.specularColorMap,N=!!y.specularIntensityMap,ie=Ie&&!!y.transmissionMap,ee=Ie&&!!y.thicknessMap,he=!!y.gradientMap,le=!!y.alphaMap,de=y.alphaTest>0,De=!!y.alphaHash,Je=!!y.extensions;let re=ai;y.toneMapped&&(Ae===null||Ae.isXRRenderTarget===!0)&&(re=s.toneMapping);const Fe=Ge?z.isCompressedCubeTexture?z.image[0].mipmaps:z.mipmaps:null,Ze={shaderID:j,shaderType:y.type,shaderName:y.name,vertexShader:Ue,fragmentShader:ne,defines:y.defines,customVertexShaderID:ce,customFragmentShaderID:we,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:W,batching:ze,batchingColor:ze&&O._colorsTexture!==null,instancing:me,instancingColor:me&&O.instanceColor!==null,instancingMorph:me&&O.morphTexture!==null,outputColorSpace:Ae===null?s.outputColorSpace:Ae.isXRRenderTarget===!0?Ae.texture.colorSpace:at.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:xe,matcap:qe,envMap:lt,envMapMode:lt&&z.mapping,envMapPMREM:Ge,envMapMaxLod:Ge?Fe.length-1:null,envMapSize:Ge?Fe[0].width:null,aoMap:St,lightMap:Lt,bumpMap:It,normalMap:gt,displacementMap:yn,emissiveMap:Pt,normalMapObjectSpace:gt&&y.normalMapType===yh,normalMapTangentSpace:gt&&y.normalMapType===Po,packedNormalMap:gt&&y.normalMapType===Po&&U0(y.normalMap.format),metalnessMap:hn,roughnessMap:Kt,anisotropy:Wt,anisotropyMap:Be,clearcoat:G,clearcoatMap:C,clearcoatNormalMap:w,clearcoatRoughnessMap:$,diffuseRoughness:sn,diffuseRoughnessMap:A,dispersion:vt,retroreflection:xt,iridescence:fe,iridescenceMap:H,iridescenceThicknessMap:J,sheen:Et,sheenColorMap:K,sheenRoughnessMap:D,specularMap:V,specularColorMap:ae,specularIntensityMap:N,transmission:Ie,transmissionMap:ie,thicknessMap:ee,gradientMap:he,opaque:y.transparent===!1&&y.blending===Ds&&y.alphaToCoverage===!1,alphaMap:le,alphaTest:de,alphaHash:De,combine:y.combine,mapUv:xe&&f(y.map.channel),aoMapUv:St&&f(y.aoMap.channel),lightMapUv:Lt&&f(y.lightMap.channel),bumpMapUv:It&&f(y.bumpMap.channel),normalMapUv:gt&&f(y.normalMap.channel),displacementMapUv:yn&&f(y.displacementMap.channel),emissiveMapUv:Pt&&f(y.emissiveMap.channel),metalnessMapUv:hn&&f(y.metalnessMap.channel),roughnessMapUv:Kt&&f(y.roughnessMap.channel),anisotropyMapUv:Be&&f(y.anisotropyMap.channel),clearcoatMapUv:C&&f(y.clearcoatMap.channel),clearcoatNormalMapUv:w&&f(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:$&&f(y.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:A&&f(y.diffuseRoughnessMap.channel),iridescenceMapUv:H&&f(y.iridescenceMap.channel),iridescenceThicknessMapUv:J&&f(y.iridescenceThicknessMap.channel),sheenColorMapUv:K&&f(y.sheenColorMap.channel),sheenRoughnessMapUv:D&&f(y.sheenRoughnessMap.channel),specularMapUv:V&&f(y.specularMap.channel),specularColorMapUv:ae&&f(y.specularColorMap.channel),specularIntensityMapUv:N&&f(y.specularIntensityMap.channel),transmissionMapUv:ie&&f(y.transmissionMap.channel),thicknessMapUv:ee&&f(y.thicknessMap.channel),alphaMapUv:le&&f(y.alphaMap.channel),vertexTangents:!!R.attributes.tangent&&(gt||Wt),vertexNormals:!!R.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!R.attributes.color&&R.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!R.attributes.uv&&(xe||le),fog:!!Z,useFog:y.fog===!0,fogExp2:!!Z&&Z.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||R.attributes.normal===void 0&&gt===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:ve,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:R.attributes.position!==void 0,morphTargets:R.morphAttributes.position!==void 0,morphNormals:R.morphAttributes.normal!==void 0,morphColors:R.morphAttributes.color!==void 0,morphTargetsCount:se,morphTextureStride:Me,numSunLights:b.sun.length,numDirLights:b.directional.length,numPointLights:b.point.length,numSpotLights:b.spot.length,numSpotLightMaps:b.spotLightMap.length,numRectAreaLights:b.rectArea.length,numHemiLights:b.hemi.length,numSunLightShadows:b.sunShadowMap.length,numDirLightShadows:b.directionalShadowMap.length,numPointLightShadows:b.pointShadowMap.length,numSpotLightShadows:b.spotShadowMap.length,numSpotLightShadowsWithMaps:b.numSpotLightShadowsWithMaps,numLightProbes:b.numLightProbes,numLightProbeGrids:k.filter(ye=>ye.texture!==null).length,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:y.dithering,shadowMapEnabled:s.shadowMap.enabled&&P.length>0,shadowMapType:s.shadowMap.type,toneMapping:re,decodeVideoTexture:xe&&y.map.isVideoTexture===!0&&at.getTransfer(y.map.colorSpace)===mt,decodeVideoTextureEmissive:Pt&&y.emissiveMap.isVideoTexture===!0&&at.getTransfer(y.emissiveMap.colorSpace)===mt,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===rt,flipSided:y.side===tn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:Je&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Je&&y.extensions.multiDraw===!0||ze)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return Ze.vertexUv1s=l.has(1),Ze.vertexUv2s=l.has(2),Ze.vertexUv3s=l.has(3),l.clear(),Ze}function v(y){const b=[];if(y.shaderID?b.push(y.shaderID):(b.push(y.customVertexShaderID),b.push(y.customFragmentShaderID)),y.defines!==void 0)for(const P in y.defines)b.push(P),b.push(y.defines[P]);return y.isRawShaderMaterial===!1&&(m(b,y),p(b,y),b.push(s.outputColorSpace)),b.push(y.customProgramCacheKey),b.join()}function m(y,b){y.push(b.precision),y.push(b.outputColorSpace),y.push(b.envMapMode),y.push(b.envMapPMREM),y.push(b.envMapMaxLod),y.push(b.envMapSize),y.push(b.mapUv),y.push(b.alphaMapUv),y.push(b.lightMapUv),y.push(b.aoMapUv),y.push(b.bumpMapUv),y.push(b.normalMapUv),y.push(b.displacementMapUv),y.push(b.emissiveMapUv),y.push(b.metalnessMapUv),y.push(b.roughnessMapUv),y.push(b.anisotropyMapUv),y.push(b.clearcoatMapUv),y.push(b.clearcoatNormalMapUv),y.push(b.clearcoatRoughnessMapUv),y.push(b.diffuseRoughnessMapUv),y.push(b.iridescenceMapUv),y.push(b.iridescenceThicknessMapUv),y.push(b.sheenColorMapUv),y.push(b.sheenRoughnessMapUv),y.push(b.specularMapUv),y.push(b.specularColorMapUv),y.push(b.specularIntensityMapUv),y.push(b.transmissionMapUv),y.push(b.thicknessMapUv),y.push(b.combine),y.push(b.fogExp2),y.push(b.sizeAttenuation),y.push(b.morphTargetsCount),y.push(b.numSunLights),y.push(b.numDirLights),y.push(b.numPointLights),y.push(b.numSpotLights),y.push(b.numSpotLightMaps),y.push(b.numHemiLights),y.push(b.numRectAreaLights),y.push(b.numSunLightShadows),y.push(b.numDirLightShadows),y.push(b.numPointLightShadows),y.push(b.numSpotLightShadows),y.push(b.numSpotLightShadowsWithMaps),y.push(b.numLightProbes),y.push(b.numLightProbeGrids),y.push(b.shadowMapType),y.push(b.toneMapping),y.push(b.numClippingPlanes),y.push(b.numClipIntersection),y.push(b.depthPacking)}function p(y,b){r.disableAll(),b.instancing&&r.enable(0),b.instancingColor&&r.enable(1),b.instancingMorph&&r.enable(2),b.matcap&&r.enable(3),b.envMap&&r.enable(4),b.normalMapObjectSpace&&r.enable(5),b.normalMapTangentSpace&&r.enable(6),b.clearcoat&&r.enable(7),b.iridescence&&r.enable(8),b.alphaTest&&r.enable(9),b.vertexColors&&r.enable(10),b.vertexAlphas&&r.enable(11),b.vertexUv1s&&r.enable(12),b.vertexUv2s&&r.enable(13),b.vertexUv3s&&r.enable(14),b.vertexTangents&&r.enable(15),b.anisotropy&&r.enable(16),b.alphaHash&&r.enable(17),b.batching&&r.enable(18),b.dispersion&&r.enable(19),b.retroreflection&&r.enable(24),b.diffuseRoughness&&r.enable(25),b.batchingColor&&r.enable(20),b.gradientMap&&r.enable(21),b.packedNormalMap&&r.enable(22),b.vertexNormals&&r.enable(23),y.push(r.mask),r.disableAll(),b.fog&&r.enable(0),b.useFog&&r.enable(1),b.flatShading&&r.enable(2),b.logarithmicDepthBuffer&&r.enable(3),b.reversedDepthBuffer&&r.enable(4),b.skinning&&r.enable(5),b.morphTargets&&r.enable(6),b.morphNormals&&r.enable(7),b.morphColors&&r.enable(8),b.premultipliedAlpha&&r.enable(9),b.shadowMapEnabled&&r.enable(10),b.doubleSided&&r.enable(11),b.flipSided&&r.enable(12),b.useDepthPacking&&r.enable(13),b.dithering&&r.enable(14),b.transmission&&r.enable(15),b.sheen&&r.enable(16),b.opaque&&r.enable(17),b.pointsUvs&&r.enable(18),b.decodeVideoTexture&&r.enable(19),b.decodeVideoTextureEmissive&&r.enable(20),b.alphaToCoverage&&r.enable(21),b.numLightProbeGrids>0&&r.enable(22),b.hasPositionAttribute&&r.enable(23),y.push(r.mask)}function x(y){const b=h[y.type];let P;if(b){const I=Gn[b];P=su.clone(I.uniforms)}else P=y.uniforms;return P}function M(y,b){let P=d.get(b);return P!==void 0?++P.usedTimes:(P=new L0(s,b,y,i),c.push(P),d.set(b,P)),P}function _(y){if(--y.usedTimes===0){const b=c.indexOf(y);c[b]=c[c.length-1],c.pop(),d.delete(y.cacheKey),y.destroy()}}function E(y){o.remove(y)}function T(){o.dispose()}return{getParameters:g,getProgramCacheKey:v,getUniforms:x,acquireProgram:M,releaseProgram:_,releaseShaderCache:E,programs:c,dispose:T}}function O0(){let s=new WeakMap;function e(r){return s.has(r)}function t(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function n(r){s.delete(r)}function i(r,o,l){s.get(r)[o]=l}function a(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:a}}function k0(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.materialVariant!==e.materialVariant?s.materialVariant-e.materialVariant:s.z!==e.z?s.z-e.z:s.id-e.id}function Mc(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function bc(){const s=[];let e=0;const t=[],n=[],i=[];function a(){e=0,t.length=0,n.length=0,i.length=0}function r(h){let f=0;return h.isInstancedMesh&&(f+=2),h.isSkinnedMesh&&(f+=1),f}function o(h,f,g,v,m,p){let x=s[e];return x===void 0?(x={id:h.id,object:h,geometry:f,material:g,materialVariant:r(h),groupOrder:v,renderOrder:h.renderOrder,z:m,group:p},s[e]=x):(x.id=h.id,x.object=h,x.geometry=f,x.material=g,x.materialVariant=r(h),x.groupOrder=v,x.renderOrder=h.renderOrder,x.z=m,x.group=p),e++,x}function l(h,f,g,v,m,p,x){x.reversedDepth===!0&&(m=-m);const M=o(h,f,g,v,m,p);g.transmission>0?n.push(M):g.transparent===!0?i.push(M):t.push(M)}function c(h,f,g,v,m,p){const x=o(h,f,g,v,m,p);g.transmission>0?n.unshift(x):g.transparent===!0?i.unshift(x):t.unshift(x)}function d(h,f){t.length>1&&t.sort(h||k0),n.length>1&&n.sort(f||Mc),i.length>1&&i.sort(f||Mc)}function u(){for(let h=e,f=s.length;h<f;h++){const g=s[h];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:i,init:a,push:l,unshift:c,finish:u,sort:d}}function z0(){let s=new WeakMap;function e(n,i){const a=s.get(n);let r;return a===void 0?(r=new bc,s.set(n,[r])):i>=a.length?(r=new bc,a.push(r)):r=a[i],r}function t(){s=new WeakMap}return{get:e,dispose:t}}function B0(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new L,color:new Oe};break;case"SpotLight":t={position:new L,direction:new L,color:new Oe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new L,color:new Oe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new L,skyColor:new Oe,groundColor:new Oe};break;case"RectAreaLight":t={color:new Oe,position:new L,halfWidth:new L,halfHeight:new L};break}return s[e.id]=t,t}}}function H0(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new $e,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let G0=0;function V0(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function W0(s){const e=new B0,t=H0(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new L);const i=new L,a=new ut,r=new ut;function o(c){let d=0,u=0,h=0;for(let k=0;k<9;k++)n.probe[k].set(0,0,0);let f=0,g=0,v=0,m=0,p=0,x=0,M=0,_=0,E=0,T=0,y=0,b=0,P=0,I=0;c.sort(V0);for(let k=0,Z=c.length;k<Z;k++){const R=c[k],U=R.color,F=R.intensity,z=R.distance;let j=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===Fi?j=R.shadow.map.texture:j=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)d+=U.r*F,u+=U.g*F,h+=U.b*F;else if(R.isLightProbe){for(let W=0;W<9;W++)n.probe[W].addScaledVector(R.sh.coefficients[W],F);I++}else if(R.isSunLight){const W=e.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const te=R.shadow,se=t.get(R);se.shadowIntensity=te.intensity,se.shadowBias=te.bias,se.shadowNormalBias=te.normalBias,se.shadowRadius=te.radius,se.shadowMapSize.copy(te.mapSize).multiply(te.getFrameExtents()),n.sunShadow[g]=se,n.sunShadowMap[g]=j;const Me=te.getViewportCount();for(let Ue=0;Ue<Me;Ue++)n.sunShadowMatrix[v+Ue]=te.getMatrix(Ue),n.sunShadowCascade[v+Ue]=te._cascadeData[Ue];v+=Me,g++}n.sun[f]=W,f++}else if(R.isDirectionalLight){const W=e.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const te=R.shadow,se=t.get(R);se.shadowIntensity=te.intensity,se.shadowBias=te.bias,se.shadowNormalBias=te.normalBias,se.shadowRadius=te.radius,se.shadowMapSize=te.mapSize,n.directionalShadow[m]=se,n.directionalShadowMap[m]=j,n.directionalShadowMatrix[m]=R.shadow.matrix,E++}n.directional[m]=W,m++}else if(R.isSpotLight){const W=e.get(R);W.position.setFromMatrixPosition(R.matrixWorld),W.color.copy(U).multiplyScalar(F),W.distance=z,W.coneCos=Math.cos(R.angle),W.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),W.decay=R.decay,n.spot[x]=W;const te=R.shadow;if(R.map&&(n.spotLightMap[b]=R.map,b++,te.updateMatrices(R),R.castShadow&&P++),n.spotLightMatrix[x]=te.matrix,R.castShadow){const se=t.get(R);se.shadowIntensity=te.intensity,se.shadowBias=te.bias,se.shadowNormalBias=te.normalBias,se.shadowRadius=te.radius,se.shadowMapSize=te.mapSize,n.spotShadow[x]=se,n.spotShadowMap[x]=j,y++}x++}else if(R.isRectAreaLight){const W=e.get(R);W.color.copy(U).multiplyScalar(F),W.halfWidth.set(R.width*.5,0,0),W.halfHeight.set(0,R.height*.5,0),n.rectArea[M]=W,M++}else if(R.isPointLight){const W=e.get(R);if(W.color.copy(R.color).multiplyScalar(R.intensity),W.distance=R.distance,W.decay=R.decay,R.castShadow){const te=R.shadow,se=t.get(R);se.shadowIntensity=te.intensity,se.shadowBias=te.bias,se.shadowNormalBias=te.normalBias,se.shadowRadius=te.radius,se.shadowMapSize=te.mapSize,se.shadowCameraNear=te.camera.near,se.shadowCameraFar=te.camera.far,n.pointShadow[p]=se,n.pointShadowMap[p]=j,n.pointShadowMatrix[p]=R.shadow.matrix,T++}n.point[p]=W,p++}else if(R.isHemisphereLight){const W=e.get(R);W.skyColor.copy(R.color).multiplyScalar(F),W.groundColor.copy(R.groundColor).multiplyScalar(F),n.hemi[_]=W,_++}}M>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=_e.LTC_FLOAT_1,n.rectAreaLTC2=_e.LTC_FLOAT_2):(n.rectAreaLTC1=_e.LTC_HALF_1,n.rectAreaLTC2=_e.LTC_HALF_2)),n.ambient[0]=d,n.ambient[1]=u,n.ambient[2]=h;const O=n.hash;(O.sunLength!==f||O.directionalLength!==m||O.pointLength!==p||O.spotLength!==x||O.rectAreaLength!==M||O.hemiLength!==_||O.numSunShadows!==g||O.numDirectionalShadows!==E||O.numPointShadows!==T||O.numSpotShadows!==y||O.numSpotMaps!==b||O.numLightProbes!==I)&&(n.sun.length=f,n.directional.length=m,n.spot.length=x,n.rectArea.length=M,n.point.length=p,n.hemi.length=_,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=v,n.sunShadowCascade.length=v,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.directionalShadowMatrix.length=E,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=y,n.spotShadowMap.length=y,n.spotLightMatrix.length=y+b-P,n.spotLightMap.length=b,n.numSpotLightShadowsWithMaps=P,n.numLightProbes=I,O.sunLength=f,O.directionalLength=m,O.pointLength=p,O.spotLength=x,O.rectAreaLength=M,O.hemiLength=_,O.numSunShadows=g,O.numDirectionalShadows=E,O.numPointShadows=T,O.numSpotShadows=y,O.numSpotMaps=b,O.numLightProbes=I,n.version=G0++)}function l(c,d){let u=0,h=0,f=0,g=0,v=0,m=0;const p=d.matrixWorldInverse;for(let x=0,M=c.length;x<M;x++){const _=c[x];if(_.isSunLight){const E=n.sun[u];E.direction.setFromMatrixPosition(_.matrixWorld),E.direction.transformDirection(p),u++}else if(_.isDirectionalLight){const E=n.directional[h];E.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),E.direction.sub(i),E.direction.transformDirection(p),h++}else if(_.isSpotLight){const E=n.spot[g];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(p),E.direction.setFromMatrixPosition(_.matrixWorld),i.setFromMatrixPosition(_.target.matrixWorld),E.direction.sub(i),E.direction.transformDirection(p),g++}else if(_.isRectAreaLight){const E=n.rectArea[v];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(p),r.identity(),a.copy(_.matrixWorld),a.premultiply(p),r.extractRotation(a),E.halfWidth.set(_.width*.5,0,0),E.halfHeight.set(0,_.height*.5,0),E.halfWidth.applyMatrix4(r),E.halfHeight.applyMatrix4(r),v++}else if(_.isPointLight){const E=n.point[f];E.position.setFromMatrixPosition(_.matrixWorld),E.position.applyMatrix4(p),f++}else if(_.isHemisphereLight){const E=n.hemi[m];E.direction.setFromMatrixPosition(_.matrixWorld),E.direction.transformDirection(p),m++}}}return{setup:o,setupView:l,state:n}}function wc(s){const e=new W0(s),t=[],n=[],i=[];function a(u){d.camera=u,t.length=0,n.length=0,i.length=0}function r(u){u.isLightProbeGrid?i.push(u):t.push(u)}function o(u){n.push(u)}function l(){e.setup(t),i.sort((u,h)=>u.priority-h.priority||u.id-h.id)}function c(u){e.setupView(t,u)}const d={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:a,state:d,setupLights:l,setupLightsView:c,pushLight:r,pushShadow:o}}function $0(s){let e=new WeakMap;function t(i,a=0){const r=e.get(i);let o;return r===void 0?(o=new wc(s),e.set(i,[o])):a>=r.length?(o=new wc(s),r.push(o)):o=r[a],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const q0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,X0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Y0=[new L(1,0,0),new L(-1,0,0),new L(0,1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1)],K0=[new L(0,-1,0),new L(0,-1,0),new L(0,0,1),new L(0,0,-1),new L(0,-1,0),new L(0,-1,0)],Sc=new ut,Cs=new L,zr=new L;function Z0(s,e,t){let n=new ks;const i=new $e,a=new $e,r=new Rt,o=new lu,l=new cu,c={},d=t.maxTextureSize,u={[Ui]:tn,[tn]:Ui,[rt]:rt},h=new dn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new $e},radius:{value:4}},vertexShader:q0,fragmentShader:X0}),f=h.clone();f.defines.HORIZONTAL_PASS=1;const g=new _t;g.setAttribute("position",new Ft(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Y(g,h),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Pa;let p=this.type;this.render=function(T,y,b){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||T.length===0)return;this.type===Lc&&(Ve("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Pa);const P=s.getRenderTarget(),I=s.getActiveCubeFace(),O=s.getActiveMipmapLevel(),k=s.state;k.setBlending(ls),k.buffers.depth.getReversed()===!0?k.buffers.color.setClear(0,0,0,0):k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const Z=p!==this.type;Z&&y.traverse(function(R){R.material&&(Array.isArray(R.material)?R.material.forEach(U=>U.needsUpdate=!0):R.material.needsUpdate=!0)});for(let R=0,U=T.length;R<U;R++){const F=T[R],z=F.shadow;if(z===void 0){Ve("WebGLShadowMap:",F,"has no shadow.");continue}if(z.autoUpdate===!1&&z.needsUpdate===!1)continue;i.copy(z.mapSize);const j=z.getFrameExtents();i.multiply(j),a.copy(z.mapSize),(i.x>d||i.y>d)&&(i.x>d&&(a.x=Math.floor(d/j.x),i.x=a.x*j.x,z.mapSize.x=a.x),i.y>d&&(a.y=Math.floor(d/j.y),i.y=a.y*j.y,z.mapSize.y=a.y));const W=s.state.buffers.depth.getReversed();if(z.camera._reversedDepth=W,z.map===null||Z===!0){if(z.map!==null&&(z.map.depthTexture!==null&&(z.map.depthTexture.dispose(),z.map.depthTexture=null),z.map.dispose()),this.type===Ls){if(F.isPointLight){Ve("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}z.map=new Wn(i.x,i.y,{format:Fi,type:Xn,minFilter:fn,magFilter:fn,generateMipmaps:!1}),z.map.texture.name=F.name+".shadowMap",z.map.depthTexture=new fs(i.x,i.y,Dn),z.map.depthTexture.name=F.name+".shadowMapDepth",z.map.depthTexture.format=_i,z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Xt,z.map.depthTexture.magFilter=Xt}else F.isPointLight?(z.map=new tl(i.x),z.map.depthTexture=new hd(i.x,qn)):(z.map=new Wn(i.x,i.y),z.map.depthTexture=new fs(i.x,i.y,qn)),z.map.depthTexture.name=F.name+".shadowMap",z.map.depthTexture.format=_i,this.type===Pa?(z.map.depthTexture.compareFunction=W?Kc:Yc,z.map.depthTexture.minFilter=fn,z.map.depthTexture.magFilter=fn):(z.map.depthTexture.compareFunction=null,z.map.depthTexture.minFilter=Xt,z.map.depthTexture.magFilter=Xt);z.camera.updateProjectionMatrix()}z.map.isWebGLCubeRenderTarget!==!0&&(z.map.width!==i.x||z.map.height!==i.y)&&z.map.setSize(i.x,i.y);const te=z.map.isWebGLCubeRenderTarget?6:z.getViewportCount();F.isPointLight!==!0&&z.updateMatrices(F,b);const se=(z.camera.layers.mask&4294967294)!==0?z.camera.layers:b.layers;for(let Me=0;Me<te;Me++){const Ue=z.getCamera(Me);if(F.isPointLight){const ne=z.camera,ce=z.matrix,we=F.distance||ne.far;we!==ne.far&&(ne.far=we,ne.updateProjectionMatrix()),Cs.setFromMatrixPosition(F.matrixWorld),ne.position.copy(Cs),zr.copy(ne.position),zr.add(Y0[Me]),ne.up.copy(K0[Me]),ne.lookAt(zr),ne.updateMatrixWorld(),ce.makeTranslation(-Cs.x,-Cs.y,-Cs.z),Sc.multiplyMatrices(ne.projectionMatrix,ne.matrixWorldInverse),z._frustum.setFromProjectionMatrix(Sc,ne.coordinateSystem,ne.reversedDepth)}if(z.map.isWebGLCubeRenderTarget)s.setRenderTarget(z.map,Me),s.clear();else{Me===0&&(s.setRenderTarget(z.map),s.clear());const ne=z.getViewport(Me);r.set(a.x*ne.x,a.y*ne.y,a.x*ne.z,a.y*ne.w),k.viewport(r)}n=z.getFrustum(Me),_(y,b,Ue,F,se,this.type)}z.isPointLightShadow!==!0&&this.type===Ls&&x(z,b),z.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(P,I,O)};function x(T,y){const b=e.update(v);h.defines.VSM_SAMPLES!==T.blurSamples&&(h.defines.VSM_SAMPLES=T.blurSamples,f.defines.VSM_SAMPLES=T.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),T.mapPass===null?T.mapPass=new Wn(i.x,i.y,{format:Fi,type:Xn}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),h.uniforms.shadow_pass.value=T.map.depthTexture,h.uniforms.resolution.value.set(T.map.width,T.map.height),h.uniforms.radius.value=T.radius,s.setRenderTarget(T.mapPass),s.clear(),s.renderBufferDirect(y,null,b,h,v,null),f.uniforms.shadow_pass.value=T.mapPass.texture,f.uniforms.resolution.value.set(T.map.width,T.map.height),f.uniforms.radius.value=T.radius,s.setRenderTarget(T.map),s.clear(),s.renderBufferDirect(y,null,b,f,v,null)}function M(T,y,b,P){let I=null;const O=b.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(O!==void 0)I=O;else if(I=b.isPointLight===!0?l:o,s.localClippingEnabled&&y.clipShadows===!0&&Array.isArray(y.clippingPlanes)&&y.clippingPlanes.length!==0||y.displacementMap&&y.displacementScale!==0||y.alphaMap&&y.alphaTest>0||y.map&&y.alphaTest>0||y.alphaToCoverage===!0){const k=I.uuid,Z=y.uuid;let R=c[k];R===void 0&&(R={},c[k]=R);let U=R[Z];U===void 0&&(U=I.clone(),R[Z]=U,y.addEventListener("dispose",E)),I=U}if(I.visible=y.visible,I.wireframe=y.wireframe,P===Ls?I.side=y.shadowSide!==null?y.shadowSide:y.side:I.side=y.shadowSide!==null?y.shadowSide:u[y.side],I.alphaMap=y.alphaMap,I.alphaTest=y.alphaToCoverage===!0?.5:y.alphaTest,I.map=y.map,I.clipShadows=y.clipShadows,I.clippingPlanes=y.clippingPlanes,I.clipIntersection=y.clipIntersection,I.displacementMap=y.displacementMap,I.displacementScale=y.displacementScale,I.displacementBias=y.displacementBias,I.wireframeLinewidth=y.wireframeLinewidth,I.linewidth=y.linewidth,b.isPointLight===!0&&I.isMeshDistanceMaterial===!0){const k=s.properties.get(I);k.light=b}return I}function _(T,y,b,P,I,O){if(T.visible===!1)return;if(T.layers.test(I)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&O===Ls)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(b.matrixWorldInverse,T.matrixWorld);const R=e.update(T),U=T.material;if(Array.isArray(U)){const F=R.groups;for(let z=0,j=F.length;z<j;z++){const W=F[z],te=U[W.materialIndex];if(te&&te.visible){const se=M(T,te,P,O);T.onBeforeShadow(s,T,y,b,R,se,W),s.renderBufferDirect(b,null,R,se,T,W),T.onAfterShadow(s,T,y,b,R,se,W)}}}else if(U.visible){const F=M(T,U,P,O);T.onBeforeShadow(s,T,y,b,R,F,null),s.renderBufferDirect(b,null,R,F,T,null),T.onAfterShadow(s,T,y,b,R,F,null)}}const Z=T.children;for(let R=0,U=Z.length;R<U;R++)_(Z[R],y,b,P,I,O)}function E(T){T.target.removeEventListener("dispose",E);for(const b in c){const P=c[b],I=T.target.uuid;I in P&&(P[I].dispose(),delete P[I])}}}function J0(s,e){function t(){let N=!1;const ie=new Rt;let ee=null;const he=new Rt(0,0,0,0);return{setMask:function(le){ee!==le&&!N&&(s.colorMask(le,le,le,le),ee=le)},setLocked:function(le){N=le},setClear:function(le,de,De,Je,re){re===!0&&(le*=Je,de*=Je,De*=Je),ie.set(le,de,De,Je),he.equals(ie)===!1&&(s.clearColor(le,de,De,Je),he.copy(ie))},reset:function(){N=!1,ee=null,he.set(-1,0,0,0)}}}function n(){let N=!1,ie=!1,ee=null,he=null,le=null;return{setReversed:function(de){if(ie!==de){const De=e.get("EXT_clip_control");de?De.clipControlEXT(De.LOWER_LEFT_EXT,De.ZERO_TO_ONE_EXT):De.clipControlEXT(De.LOWER_LEFT_EXT,De.NEGATIVE_ONE_TO_ONE_EXT),ie=de;const Je=le;le=null,this.setClear(Je)}},getReversed:function(){return ie},setTest:function(de){de?ve(s.DEPTH_TEST):me(s.DEPTH_TEST)},setMask:function(de){ee!==de&&!N&&(s.depthMask(de),ee=de)},setFunc:function(de){if(ie&&(de=Ch[de]),he!==de){switch(de){case $r:s.depthFunc(s.NEVER);break;case qr:s.depthFunc(s.ALWAYS);break;case Xr:s.depthFunc(s.LESS);break;case Ns:s.depthFunc(s.LEQUAL);break;case Yr:s.depthFunc(s.EQUAL);break;case Kr:s.depthFunc(s.GEQUAL);break;case Zr:s.depthFunc(s.GREATER);break;case Jr:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}he=de}},setLocked:function(de){N=de},setClear:function(de){le!==de&&(le=de,ie&&(de=1-de),s.clearDepth(de))},reset:function(){N=!1,ee=null,he=null,le=null,ie=!1}}}function i(){let N=!1,ie=null,ee=null,he=null,le=null,de=null,De=null,Je=null,re=null;return{setTest:function(Fe){N||(Fe?ve(s.STENCIL_TEST):me(s.STENCIL_TEST))},setMask:function(Fe){ie!==Fe&&!N&&(s.stencilMask(Fe),ie=Fe)},setFunc:function(Fe,Ze,ye){(ee!==Fe||he!==Ze||le!==ye)&&(s.stencilFunc(Fe,Ze,ye),ee=Fe,he=Ze,le=ye)},setOp:function(Fe,Ze,ye){(de!==Fe||De!==Ze||Je!==ye)&&(s.stencilOp(Fe,Ze,ye),de=Fe,De=Ze,Je=ye)},setLocked:function(Fe){N=Fe},setClear:function(Fe){re!==Fe&&(s.clearStencil(Fe),re=Fe)},reset:function(){N=!1,ie=null,ee=null,he=null,le=null,de=null,De=null,Je=null,re=null}}}const a=new t,r=new n,o=new i;let l={};const c=new WeakMap;let d={},u={},h={},f=new WeakMap,g=[],v=null,m=!1,p=null,x=null,M=null,_=null,E=null,T=null,y=null,b=new Oe(0,0,0),P=0,I=!1,O=null,k=null,Z=null,R=null,U=null;const F=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,j=0;const W=s.getParameter(s.VERSION);W.indexOf("WebGL")!==-1?(j=parseFloat(/^WebGL (\d)/.exec(W)[1]),z=j>=1):W.indexOf("OpenGL ES")!==-1&&(j=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),z=j>=2);let te=null,se={};const Me=s.getParameter(s.SCISSOR_BOX),Ue=s.getParameter(s.VIEWPORT),ne=new Rt().fromArray(Me),ce=new Rt().fromArray(Ue);function we(N,ie,ee,he){const le=new Uint8Array(4),de=s.createTexture();s.bindTexture(N,de),s.texParameteri(N,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(N,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let De=0;De<ee;De++)N===s.TEXTURE_3D||N===s.TEXTURE_2D_ARRAY?s.texImage3D(ie,0,s.RGBA,1,1,he,0,s.RGBA,s.UNSIGNED_BYTE,le):s.texImage2D(ie+De,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,le);return de}const Ae={};Ae[s.TEXTURE_2D]=we(s.TEXTURE_2D,s.TEXTURE_2D,1),Ae[s.TEXTURE_CUBE_MAP]=we(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),Ae[s.TEXTURE_2D_ARRAY]=we(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),Ae[s.TEXTURE_3D]=we(s.TEXTURE_3D,s.TEXTURE_3D,1,1),a.setClear(0,0,0,1),r.setClear(1),o.setClear(0),ve(s.DEPTH_TEST),r.setFunc(Ns),It(!1),gt(xl),ve(s.CULL_FACE),St(ls);function ve(N){d[N]!==!0&&(s.enable(N),d[N]=!0)}function me(N){d[N]!==!1&&(s.disable(N),d[N]=!1)}function ze(N,ie){return h[N]!==ie?(s.bindFramebuffer(N,ie),h[N]=ie,N===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=ie),N===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=ie),!0):!1}function xe(N,ie){let ee=g,he=!1;if(N){ee=f.get(ie),ee===void 0&&(ee=[],f.set(ie,ee));const le=N.textures;if(ee.length!==le.length||ee[0]!==s.COLOR_ATTACHMENT0){for(let de=0,De=le.length;de<De;de++)ee[de]=s.COLOR_ATTACHMENT0+de;ee.length=le.length,he=!0}}else ee[0]!==s.BACK&&(ee[0]=s.BACK,he=!0);he&&s.drawBuffers(ee)}function qe(N){return v!==N?(s.useProgram(N),v=N,!0):!1}const lt={[rs]:s.FUNC_ADD,[Qd]:s.FUNC_SUBTRACT,[jd]:s.FUNC_REVERSE_SUBTRACT};lt[eh]=s.MIN,lt[th]=s.MAX;const Ge={[nh]:s.ZERO,[ih]:s.ONE,[sh]:s.SRC_COLOR,[Ic]:s.SRC_ALPHA,[dh]:s.SRC_ALPHA_SATURATE,[lh]:s.DST_COLOR,[rh]:s.DST_ALPHA,[ah]:s.ONE_MINUS_SRC_COLOR,[Dc]:s.ONE_MINUS_SRC_ALPHA,[ch]:s.ONE_MINUS_DST_COLOR,[oh]:s.ONE_MINUS_DST_ALPHA,[hh]:s.CONSTANT_COLOR,[uh]:s.ONE_MINUS_CONSTANT_COLOR,[fh]:s.CONSTANT_ALPHA,[ph]:s.ONE_MINUS_CONSTANT_ALPHA};function St(N,ie,ee,he,le,de,De,Je,re,Fe){if(N===ls){m===!0&&(me(s.BLEND),m=!1);return}if(m===!1&&(ve(s.BLEND),m=!0),N!==Jd){if(N!==p||Fe!==I){if((x!==rs||E!==rs)&&(s.blendEquation(s.FUNC_ADD),x=rs,E=rs),Fe)switch(N){case Ds:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case je:s.blendFunc(s.ONE,s.ONE);break;case yl:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case _l:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:ct("WebGLState: Invalid blending: ",N);break}else switch(N){case Ds:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case je:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case yl:ct("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case _l:ct("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ct("WebGLState: Invalid blending: ",N);break}M=null,_=null,T=null,y=null,b.set(0,0,0),P=0,p=N,I=Fe}return}le=le||ie,de=de||ee,De=De||he,(ie!==x||le!==E)&&(s.blendEquationSeparate(lt[ie],lt[le]),x=ie,E=le),(ee!==M||he!==_||de!==T||De!==y)&&(s.blendFuncSeparate(Ge[ee],Ge[he],Ge[de],Ge[De]),M=ee,_=he,T=de,y=De),(Je.equals(b)===!1||re!==P)&&(s.blendColor(Je.r,Je.g,Je.b,re),b.copy(Je),P=re),p=N,I=!1}function Lt(N,ie){N.side===rt?me(s.CULL_FACE):ve(s.CULL_FACE);let ee=N.side===tn;ie&&(ee=!ee),It(ee),N.blending===Ds&&N.transparent===!1?St(ls):St(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),r.setFunc(N.depthFunc),r.setTest(N.depthTest),r.setMask(N.depthWrite),a.setMask(N.colorWrite);const he=N.stencilWrite;o.setTest(he),he&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Pt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?ve(s.SAMPLE_ALPHA_TO_COVERAGE):me(s.SAMPLE_ALPHA_TO_COVERAGE)}function It(N){O!==N&&(N?s.frontFace(s.CW):s.frontFace(s.CCW),O=N)}function gt(N){N!==Kd?(ve(s.CULL_FACE),N!==k&&(N===xl?s.cullFace(s.BACK):N===Zd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):me(s.CULL_FACE),k=N}function yn(N){N!==Z&&(z&&s.lineWidth(N),Z=N)}function Pt(N,ie,ee){N?(ve(s.POLYGON_OFFSET_FILL),(R!==ie||U!==ee)&&(R=ie,U=ee,r.getReversed()&&(ie=-ie,ee=-ee),s.polygonOffset(ie,ee))):me(s.POLYGON_OFFSET_FILL)}function hn(N){N?ve(s.SCISSOR_TEST):me(s.SCISSOR_TEST)}function Kt(N){N===void 0&&(N=s.TEXTURE0+F-1),te!==N&&(s.activeTexture(N),te=N)}function Wt(N,ie,ee){ee===void 0&&(te===null?ee=s.TEXTURE0+F-1:ee=te);let he=se[ee];he===void 0&&(he={type:void 0,texture:void 0},se[ee]=he),(he.type!==N||he.texture!==ie)&&(te!==ee&&(s.activeTexture(ee),te=ee),s.bindTexture(N,ie||Ae[N]),he.type=N,he.texture=ie)}function G(){const N=se[te];N!==void 0&&N.type!==void 0&&(s.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function sn(){try{s.compressedTexImage2D(...arguments)}catch(N){ct("WebGLState:",N)}}function vt(){try{s.compressedTexImage3D(...arguments)}catch(N){ct("WebGLState:",N)}}function xt(){try{s.texSubImage2D(...arguments)}catch(N){ct("WebGLState:",N)}}function fe(){try{s.texSubImage3D(...arguments)}catch(N){ct("WebGLState:",N)}}function Et(){try{s.compressedTexSubImage2D(...arguments)}catch(N){ct("WebGLState:",N)}}function Ie(){try{s.compressedTexSubImage3D(...arguments)}catch(N){ct("WebGLState:",N)}}function Be(){try{s.texStorage2D(...arguments)}catch(N){ct("WebGLState:",N)}}function C(){try{s.texStorage3D(...arguments)}catch(N){ct("WebGLState:",N)}}function w(){try{s.texImage2D(...arguments)}catch(N){ct("WebGLState:",N)}}function $(){try{s.texImage3D(...arguments)}catch(N){ct("WebGLState:",N)}}function A(N){return u[N]!==void 0?u[N]:s.getParameter(N)}function H(N,ie){u[N]!==ie&&(s.pixelStorei(N,ie),u[N]=ie)}function J(N){ne.equals(N)===!1&&(s.scissor(N.x,N.y,N.z,N.w),ne.copy(N))}function K(N){ce.equals(N)===!1&&(s.viewport(N.x,N.y,N.z,N.w),ce.copy(N))}function D(N,ie){let ee=c.get(ie);ee===void 0&&(ee=new WeakMap,c.set(ie,ee));let he=ee.get(N);he===void 0&&(he=s.getUniformBlockIndex(ie,N.name),s.uniformBlockBinding(ie,he,he),ee.set(N,he))}function V(N,ie,ee){const le=c.get(ie).get(N);l[le]!==ee&&(s.bindBufferBase(s.UNIFORM_BUFFER,le,ee),l[le]=ee)}function ae(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),r.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),d={},u={},te=null,se={},h={},l={},f=new WeakMap,g=[],v=null,m=!1,p=null,x=null,M=null,_=null,E=null,T=null,y=null,b=new Oe(0,0,0),P=0,I=!1,O=null,k=null,Z=null,R=null,U=null,ne.set(0,0,s.canvas.width,s.canvas.height),ce.set(0,0,s.canvas.width,s.canvas.height),a.reset(),r.reset(),o.reset()}return{buffers:{color:a,depth:r,stencil:o},enable:ve,disable:me,bindFramebuffer:ze,drawBuffers:xe,useProgram:qe,setBlending:St,setMaterial:Lt,setFlipSided:It,setCullFace:gt,setLineWidth:yn,setPolygonOffset:Pt,setScissorTest:hn,activeTexture:Kt,bindTexture:Wt,unbindTexture:G,compressedTexImage2D:sn,compressedTexImage3D:vt,texImage2D:w,texImage3D:$,pixelStorei:H,getParameter:A,updateUBOMapping:D,uniformBlockBinding:V,texStorage2D:Be,texStorage3D:C,texSubImage2D:xt,texSubImage3D:fe,compressedTexSubImage2D:Et,compressedTexSubImage3D:Ie,scissor:J,viewport:K,reset:ae}}function Q0(s,e,t,n,i,a,r){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new $e,d=new WeakMap,u=new Set;let h;const f=new WeakMap,g=new Set,v=new FinalizationRegistry(C=>g.delete(C));let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(C,w){return m?new OffscreenCanvas(C,w):Ha("canvas")}function x(C,w,$){let A=1;const H=Be(C);if((H.width>$||H.height>$)&&(A=$/Math.max(H.width,H.height)),A<1)if(typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&C instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&C instanceof ImageBitmap||typeof VideoFrame<"u"&&C instanceof VideoFrame){const J=Math.floor(A*H.width),K=Math.floor(A*H.height);h===void 0&&(h=p(J,K));const D=w?p(J,K):h;return D.width=J,D.height=K,D.getContext("2d").drawImage(C,0,0,J,K),Ve("WebGLRenderer: Texture has been resized from ("+H.width+"x"+H.height+") to ("+J+"x"+K+")."),D}else return"data"in C&&Ve("WebGLRenderer: Image in DataTexture is too big ("+H.width+"x"+H.height+")."),C;return C}function M(C){return C.generateMipmaps}function _(C){s.generateMipmap(C)}function E(C){return C.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:C.isWebGL3DRenderTarget?s.TEXTURE_3D:C.isWebGLArrayRenderTarget||C.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function T(C,w,$,A,H,J=!1){if(C!==null){if(s[C]!==void 0)return s[C];Ve("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+C+"'")}let K;A&&(K=e.get("EXT_texture_norm16"),K||Ve("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let D=w;if(w===s.RED&&($===s.FLOAT&&(D=s.R32F),$===s.HALF_FLOAT&&(D=s.R16F),$===s.UNSIGNED_BYTE&&(D=s.R8),$===s.UNSIGNED_SHORT&&K&&(D=K.R16_EXT),$===s.SHORT&&K&&(D=K.R16_SNORM_EXT)),w===s.RED_INTEGER&&($===s.UNSIGNED_BYTE&&(D=s.R8UI),$===s.UNSIGNED_SHORT&&(D=s.R16UI),$===s.UNSIGNED_INT&&(D=s.R32UI),$===s.BYTE&&(D=s.R8I),$===s.SHORT&&(D=s.R16I),$===s.INT&&(D=s.R32I)),w===s.RG&&($===s.FLOAT&&(D=s.RG32F),$===s.HALF_FLOAT&&(D=s.RG16F),$===s.UNSIGNED_BYTE&&(D=s.RG8),$===s.UNSIGNED_SHORT&&K&&(D=K.RG16_EXT),$===s.SHORT&&K&&(D=K.RG16_SNORM_EXT)),w===s.RG_INTEGER&&($===s.UNSIGNED_BYTE&&(D=s.RG8UI),$===s.UNSIGNED_SHORT&&(D=s.RG16UI),$===s.UNSIGNED_INT&&(D=s.RG32UI),$===s.BYTE&&(D=s.RG8I),$===s.SHORT&&(D=s.RG16I),$===s.INT&&(D=s.RG32I)),w===s.RGB_INTEGER&&($===s.UNSIGNED_BYTE&&(D=s.RGB8UI),$===s.UNSIGNED_SHORT&&(D=s.RGB16UI),$===s.UNSIGNED_INT&&(D=s.RGB32UI),$===s.BYTE&&(D=s.RGB8I),$===s.SHORT&&(D=s.RGB16I),$===s.INT&&(D=s.RGB32I)),w===s.RGBA_INTEGER&&($===s.UNSIGNED_BYTE&&(D=s.RGBA8UI),$===s.UNSIGNED_SHORT&&(D=s.RGBA16UI),$===s.UNSIGNED_INT&&(D=s.RGBA32UI),$===s.BYTE&&(D=s.RGBA8I),$===s.SHORT&&(D=s.RGBA16I),$===s.INT&&(D=s.RGBA32I)),w===s.RGB&&($===s.UNSIGNED_SHORT&&K&&(D=K.RGB16_EXT),$===s.SHORT&&K&&(D=K.RGB16_SNORM_EXT),$===s.UNSIGNED_INT_5_9_9_9_REV&&(D=s.RGB9_E5),$===s.UNSIGNED_INT_10F_11F_11F_REV&&(D=s.R11F_G11F_B10F)),w===s.RGBA){const V=J?Ba:at.getTransfer(H);$===s.FLOAT&&(D=s.RGBA32F),$===s.HALF_FLOAT&&(D=s.RGBA16F),$===s.UNSIGNED_BYTE&&(D=V===mt?s.SRGB8_ALPHA8:s.RGBA8),$===s.UNSIGNED_SHORT&&K&&(D=K.RGBA16_EXT),$===s.SHORT&&K&&(D=K.RGBA16_SNORM_EXT),$===s.UNSIGNED_SHORT_4_4_4_4&&(D=s.RGBA4),$===s.UNSIGNED_SHORT_5_5_5_1&&(D=s.RGB5_A1)}return(D===s.R16F||D===s.R32F||D===s.RG16F||D===s.RG32F||D===s.RGBA16F||D===s.RGBA32F)&&e.get("EXT_color_buffer_float"),D}function y(C,w){let $;return C?w===null||w===qn||w===us?$=s.DEPTH24_STENCIL8:w===Dn?$=s.DEPTH32F_STENCIL8:w===Fs&&($=s.DEPTH24_STENCIL8,Ve("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):w===null||w===qn||w===us?$=s.DEPTH_COMPONENT24:w===Dn?$=s.DEPTH_COMPONENT32F:w===Fs&&($=s.DEPTH_COMPONENT16),$}function b(C,w){return M(C)===!0||C.isFramebufferTexture&&C.minFilter!==Xt&&C.minFilter!==fn?Math.log2(Math.max(w.width,w.height))+1:C.mipmaps.length>0?C.mipmaps.length:C.isCompressedTexture&&Array.isArray(C.image)?w.mipmaps.length:1}function P(C){const w=new WeakRef(C);n.get(C).__ref=w,g.add(w),v.register(C,w,w)}function I(C){const w=n.get(C).__ref;w!==void 0&&(g.delete(w),v.unregister(w))}function O(C){Z(C.target)}function k(C){R(C.target)}function Z(C){C.removeEventListener("dispose",O),I(C),F(C),C.isVideoTexture&&d.delete(C),C.isHTMLTexture&&u.delete(C)}function R(C){C.removeEventListener("dispose",k),I(C),j(C)}function U(){for(const C of g){const w=C.deref();w!==void 0&&(w.isRenderTarget===!0?R(w):Z(w))}g.clear(),u.clear()}function F(C){const w=n.get(C);if(w.__webglInit===void 0)return;const $=C.source,A=f.get($);if(A){const H=A[w.__cacheKey];H.usedTimes--,H.usedTimes===0&&z(C),Object.keys(A).length===0&&f.delete($)}n.remove(C)}function z(C){const w=n.get(C);s.deleteTexture(w.__webglTexture);const $=C.source,A=f.get($);delete A[w.__cacheKey],r.memory.textures--}function j(C){const w=n.get(C);w.__depthDisposeCallback&&w.__depthDisposeCallback();const $=C.depthTexture;if($&&$.renderTarget===C&&Z($),C.isWebGLCubeRenderTarget)for(let H=0;H<6;H++){if(Array.isArray(w.__webglFramebuffer[H]))for(let J=0;J<w.__webglFramebuffer[H].length;J++)s.deleteFramebuffer(w.__webglFramebuffer[H][J]);else s.deleteFramebuffer(w.__webglFramebuffer[H]);w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer[H])}else{if(Array.isArray(w.__webglFramebuffer))for(let H=0;H<w.__webglFramebuffer.length;H++)s.deleteFramebuffer(w.__webglFramebuffer[H]);else s.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&s.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let H=0;H<w.__webglColorRenderbuffer.length;H++)w.__webglColorRenderbuffer[H]&&s.deleteRenderbuffer(w.__webglColorRenderbuffer[H]);w.__webglDepthRenderbuffer&&s.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const A=C.textures;for(let H=0,J=A.length;H<J;H++){const K=n.get(A[H]);K.__webglTexture&&(s.deleteTexture(K.__webglTexture),r.memory.textures--),n.remove(A[H])}n.remove(C)}let W=0;function te(){W=0}function se(){return W}function Me(C){W=C}function Ue(){const C=W;return C>=i.maxTextures&&Ve("WebGLTextures: Trying to use "+(C+1)+" texture units while this GPU supports only "+i.maxTextures),W+=1,C}function ne(C){const w=[];return w.push(C.wrapS),w.push(C.wrapT),w.push(C.wrapR||0),w.push(C.magFilter),w.push(C.minFilter),w.push(C.anisotropy),w.push(C.internalFormat),w.push(C.format),w.push(C.type),w.push(C.generateMipmaps),w.push(C.mipmapsAutoUpdate),w.push(C.premultiplyAlpha),w.push(C.flipY),w.push(C.unpackAlignment),w.push(C.colorSpace),w.join()}function ce(C,w){const $=n.get(C);if(C.isVideoTexture&&Et(C),C.isRenderTargetTexture===!1&&C.isExternalTexture!==!0&&C.version>0&&$.__version!==C.version){const A=C.image;if(A===null)Ve("WebGLRenderer: Texture marked for update but no image data found.");else if(A.complete===!1)Ve("WebGLRenderer: Texture marked for update but image is incomplete");else{Lt($,C,w);return}}else C.isExternalTexture&&($.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,$.__webglTexture,s.TEXTURE0+w)}function we(C,w){const $=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&$.__version!==C.version){Lt($,C,w);return}else C.isExternalTexture&&($.__webglTexture=C.sourceTexture?C.sourceTexture:null);t.bindTexture(s.TEXTURE_2D_ARRAY,$.__webglTexture,s.TEXTURE0+w)}function Ae(C,w){const $=n.get(C);if(C.isRenderTargetTexture===!1&&C.version>0&&$.__version!==C.version){Lt($,C,w);return}t.bindTexture(s.TEXTURE_3D,$.__webglTexture,s.TEXTURE0+w)}function ve(C,w){const $=n.get(C);if(C.version>0&&$.__version!==C.version){It($,C,w);return}t.bindTexture(s.TEXTURE_CUBE_MAP,$.__webglTexture,s.TEXTURE0+w)}const me={[Fa]:s.REPEAT,[ii]:s.CLAMP_TO_EDGE,[Qr]:s.MIRRORED_REPEAT},ze={[Xt]:s.NEAREST,[vh]:s.NEAREST_MIPMAP_NEAREST,[Ys]:s.NEAREST_MIPMAP_LINEAR,[fn]:s.LINEAR,[lr]:s.LINEAR_MIPMAP_NEAREST,[xi]:s.LINEAR_MIPMAP_LINEAR},xe={[Mh]:s.NEVER,[Zc]:s.ALWAYS,[bh]:s.LESS,[Yc]:s.LEQUAL,[wh]:s.EQUAL,[Kc]:s.GEQUAL,[Sh]:s.GREATER,[Eh]:s.NOTEQUAL};function qe(C,w){if(w.type===Dn&&e.has("OES_texture_float_linear")===!1&&(w.magFilter===fn||w.magFilter===lr||w.magFilter===Ys||w.magFilter===xi||w.minFilter===fn||w.minFilter===lr||w.minFilter===Ys||w.minFilter===xi)&&Ve("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(C,s.TEXTURE_WRAP_S,me[w.wrapS]),s.texParameteri(C,s.TEXTURE_WRAP_T,me[w.wrapT]),(C===s.TEXTURE_3D||C===s.TEXTURE_2D_ARRAY)&&s.texParameteri(C,s.TEXTURE_WRAP_R,me[w.wrapR]),s.texParameteri(C,s.TEXTURE_MAG_FILTER,ze[w.magFilter]),s.texParameteri(C,s.TEXTURE_MIN_FILTER,ze[w.minFilter]),w.compareFunction&&(s.texParameteri(C,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(C,s.TEXTURE_COMPARE_FUNC,xe[w.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Xt||w.minFilter!==Ys&&w.minFilter!==xi||w.type===Dn&&e.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const $=e.get("EXT_texture_filter_anisotropic");s.texParameterf(C,$.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function lt(C,w){let $=!1;C.__webglInit===void 0&&(C.__webglInit=!0,w.addEventListener("dispose",O),P(w));const A=w.source;let H=f.get(A);H===void 0&&(H={},f.set(A,H));const J=ne(w);if(J!==C.__cacheKey){H[J]===void 0&&(H[J]={texture:s.createTexture(),usedTimes:0},r.memory.textures++,$=!0),H[J].usedTimes++;const K=H[C.__cacheKey];K!==void 0&&(H[C.__cacheKey].usedTimes--,K.usedTimes===0&&z(w)),C.__cacheKey=J,C.__webglTexture=H[J].texture}return $}function Ge(C,w,$){return Math.floor(Math.floor(C/$)/w)}function St(C,w,$,A){const J=C.updateRanges;if(J.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,w.width,w.height,$,A,w.data);else{J.sort((N,ie)=>N.start-ie.start);let K=0;for(let N=1;N<J.length;N++){const ie=J[K],ee=J[N],he=ie.start+ie.count,le=Ge(ee.start,w.width,4),de=Ge(ie.start,w.width,4);ee.start<=he+1&&le===de&&Ge(ee.start+ee.count-1,w.width,4)===le?ie.count=Math.max(ie.count,ee.start+ee.count-ie.start):(++K,J[K]=ee)}J.length=K+1;const D=t.getParameter(s.UNPACK_ROW_LENGTH),V=t.getParameter(s.UNPACK_SKIP_PIXELS),ae=t.getParameter(s.UNPACK_SKIP_ROWS);t.pixelStorei(s.UNPACK_ROW_LENGTH,w.width);for(let N=0,ie=J.length;N<ie;N++){const ee=J[N],he=Math.floor(ee.start/4),le=Math.ceil(ee.count/4),de=he%w.width,De=Math.floor(he/w.width),Je=le,re=1;t.pixelStorei(s.UNPACK_SKIP_PIXELS,de),t.pixelStorei(s.UNPACK_SKIP_ROWS,De),t.texSubImage2D(s.TEXTURE_2D,0,de,De,Je,re,$,A,w.data)}C.clearUpdateRanges(),t.pixelStorei(s.UNPACK_ROW_LENGTH,D),t.pixelStorei(s.UNPACK_SKIP_PIXELS,V),t.pixelStorei(s.UNPACK_SKIP_ROWS,ae)}}function Lt(C,w,$){let A=s.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(A=s.TEXTURE_2D_ARRAY),w.isData3DTexture&&(A=s.TEXTURE_3D);const H=lt(C,w),J=w.source;t.bindTexture(A,C.__webglTexture,s.TEXTURE0+$);const K=n.get(J);if(J.version!==K.__version||H===!0){if(t.activeTexture(s.TEXTURE0+$),(typeof ImageBitmap<"u"&&w.image instanceof ImageBitmap)===!1){const re=at.getPrimaries(at.workingColorSpace),Fe=w.colorSpace===vi?null:at.getPrimaries(w.colorSpace),Ze=w.colorSpace===vi||re===Fe?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ze)}t.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment);let V=x(w.image,!1,i.maxTextureSize);V=Ie(w,V);const ae=a.convert(w.format,w.colorSpace),N=a.convert(w.type);let ie=T(w.internalFormat,ae,N,w.normalized,w.colorSpace,w.isVideoTexture);qe(A,w);let ee;const he=w.mipmaps,le=w.isVideoTexture!==!0,de=K.__version===void 0||H===!0,De=J.dataReady,Je=b(w,V);if(w.isDepthTexture)ie=y(w.format===yi,w.type),de&&(le?t.texStorage2D(s.TEXTURE_2D,1,ie,V.width,V.height):t.texImage2D(s.TEXTURE_2D,0,ie,V.width,V.height,0,ae,N,null));else if(w.isDataTexture)if(he.length>0){le&&de&&t.texStorage2D(s.TEXTURE_2D,Je,ie,he[0].width,he[0].height);for(let re=0,Fe=he.length;re<Fe;re++)ee=he[re],le?De&&t.texSubImage2D(s.TEXTURE_2D,re,0,0,ee.width,ee.height,ae,N,ee.data):t.texImage2D(s.TEXTURE_2D,re,ie,ee.width,ee.height,0,ae,N,ee.data);w.generateMipmaps=!1}else le?(de&&t.texStorage2D(s.TEXTURE_2D,Je,ie,V.width,V.height),De&&St(w,V,ae,N)):t.texImage2D(s.TEXTURE_2D,0,ie,V.width,V.height,0,ae,N,V.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){le&&de&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Je,ie,he[0].width,he[0].height,V.depth);for(let re=0,Fe=he.length;re<Fe;re++)if(ee=he[re],w.format!==Vn)if(ae!==null)if(le){if(De)if(w.layerUpdates.size>0){const Ze=ic(ee.width,ee.height,w.format,w.type);for(const ye of w.layerUpdates){const pt=ee.data.subarray(ye*Ze/ee.data.BYTES_PER_ELEMENT,(ye+1)*Ze/ee.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,re,0,0,ye,ee.width,ee.height,1,ae,pt)}}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,re,0,0,0,ee.width,ee.height,V.depth,ae,ee.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,re,ie,ee.width,ee.height,V.depth,0,ee.data,0,0);else Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else le?De&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,re,0,0,0,ee.width,ee.height,V.depth,ae,N,ee.data):t.texImage3D(s.TEXTURE_2D_ARRAY,re,ie,ee.width,ee.height,V.depth,0,ae,N,ee.data);w.layerUpdates.size>0&&w.clearLayerUpdates()}else{le&&de&&t.texStorage2D(s.TEXTURE_2D,Je,ie,he[0].width,he[0].height);for(let re=0,Fe=he.length;re<Fe;re++)ee=he[re],w.format!==Vn?ae!==null?le?De&&t.compressedTexSubImage2D(s.TEXTURE_2D,re,0,0,ee.width,ee.height,ae,ee.data):t.compressedTexImage2D(s.TEXTURE_2D,re,ie,ee.width,ee.height,0,ee.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):le?De&&t.texSubImage2D(s.TEXTURE_2D,re,0,0,ee.width,ee.height,ae,N,ee.data):t.texImage2D(s.TEXTURE_2D,re,ie,ee.width,ee.height,0,ae,N,ee.data)}else if(w.isDataArrayTexture)if(le){if(de&&t.texStorage3D(s.TEXTURE_2D_ARRAY,Je,ie,V.width,V.height,V.depth),De)if(w.layerUpdates.size>0){const re=ic(V.width,V.height,w.format,w.type);for(const Fe of w.layerUpdates){const Ze=V.data.subarray(Fe*re/V.data.BYTES_PER_ELEMENT,(Fe+1)*re/V.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Fe,V.width,V.height,1,ae,N,Ze)}w.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,V.width,V.height,V.depth,ae,N,V.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,ie,V.width,V.height,V.depth,0,ae,N,V.data);else if(w.isData3DTexture)le?(de&&t.texStorage3D(s.TEXTURE_3D,Je,ie,V.width,V.height,V.depth),De&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,V.width,V.height,V.depth,ae,N,V.data)):t.texImage3D(s.TEXTURE_3D,0,ie,V.width,V.height,V.depth,0,ae,N,V.data);else if(w.isFramebufferTexture){if(de)if(le)t.texStorage2D(s.TEXTURE_2D,Je,ie,V.width,V.height);else{let re=V.width,Fe=V.height;for(let Ze=0;Ze<Je;Ze++)t.texImage2D(s.TEXTURE_2D,Ze,ie,re,Fe,0,ae,N,null),re>>=1,Fe>>=1}}else if(w.isHTMLTexture){if("texElementImage2D"in s){const re=s.canvas;if(re.hasAttribute("layoutsubtree")||re.setAttribute("layoutsubtree","true"),V.parentNode!==re){re.appendChild(V),u.add(w),re.onpaint=Fe=>{const Ze=Fe.changedElements;for(const ye of u)Ze.includes(ye.image)&&(ye.needsUpdate=!0)},re.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,V);else{const Ze=s.RGBA,ye=s.RGBA,pt=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,Ze,ye,pt,V)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(he.length>0){if(le&&de){const re=Be(he[0]);t.texStorage2D(s.TEXTURE_2D,Je,ie,re.width,re.height)}for(let re=0,Fe=he.length;re<Fe;re++)ee=he[re],le?De&&t.texSubImage2D(s.TEXTURE_2D,re,0,0,ae,N,ee):t.texImage2D(s.TEXTURE_2D,re,ie,ae,N,ee);w.generateMipmaps=!1}else if(le){if(de){const re=Be(V);t.texStorage2D(s.TEXTURE_2D,Je,ie,re.width,re.height)}De&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ae,N,V)}else t.texImage2D(s.TEXTURE_2D,0,ie,ae,N,V);M(w)&&w.mipmapsAutoUpdate===!0&&_(A),K.__version=J.version,w.onUpdate&&w.onUpdate(w)}C.__version=w.version}function It(C,w,$){if(w.image.length!==6)return;const A=lt(C,w),H=w.source;t.bindTexture(s.TEXTURE_CUBE_MAP,C.__webglTexture,s.TEXTURE0+$);const J=n.get(H);if(H.version!==J.__version||A===!0){t.activeTexture(s.TEXTURE0+$);const K=at.getPrimaries(at.workingColorSpace),D=w.colorSpace===vi?null:at.getPrimaries(w.colorSpace),V=w.colorSpace===vi||K===D?s.NONE:s.BROWSER_DEFAULT_WEBGL;t.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),t.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),t.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),t.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,V);const ae=w.isCompressedTexture||w.image[0].isCompressedTexture,N=w.image[0]&&w.image[0].isDataTexture,ie=[];for(let ye=0;ye<6;ye++)!ae&&!N?ie[ye]=x(w.image[ye],!0,i.maxCubemapSize):ie[ye]=N?w.image[ye].image:w.image[ye],ie[ye]=Ie(w,ie[ye]);const ee=ie[0],he=a.convert(w.format,w.colorSpace),le=a.convert(w.type);let de=T(w.internalFormat,he,le,w.normalized,w.colorSpace);const De=w.isVideoTexture!==!0,Je=J.__version===void 0||A===!0,re=H.dataReady;let Fe=b(w,ee);qe(s.TEXTURE_CUBE_MAP,w);let Ze;if(w.isDepthTexture){if(de=y(w.format===yi,w.type),Je)if(De)t.texStorage2D(s.TEXTURE_CUBE_MAP,1,de,ee.width,ee.height);else for(let ye=0;ye<6;ye++)t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,de,ee.width,ee.height,0,he,le,null)}else if(ae){De&&Je&&t.texStorage2D(s.TEXTURE_CUBE_MAP,Fe,de,ee.width,ee.height);for(let ye=0;ye<6;ye++){Ze=ie[ye].mipmaps;for(let pt=0;pt<Ze.length;pt++){const Bt=Ze[pt];w.format!==Vn?he!==null?De?re&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,pt,0,0,Bt.width,Bt.height,he,Bt.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,pt,de,Bt.width,Bt.height,0,Bt.data):Ve("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):De?re&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,pt,0,0,Bt.width,Bt.height,he,le,Bt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,pt,de,Bt.width,Bt.height,0,he,le,Bt.data)}}}else{if(Ze=w.mipmaps,De&&Je){Ze.length>0&&Fe++;const ye=Be(ie[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,Fe,de,ye.width,ye.height)}for(let ye=0;ye<6;ye++)if(N){De?re&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,0,0,ie[ye].width,ie[ye].height,he,le,ie[ye].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,de,ie[ye].width,ie[ye].height,0,he,le,ie[ye].data);for(let pt=0;pt<Ze.length;pt++){const ci=Ze[pt].image[ye].image;De?re&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,pt+1,0,0,ci.width,ci.height,he,le,ci.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,pt+1,de,ci.width,ci.height,0,he,le,ci.data)}}else{De?re&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,0,0,he,le,ie[ye]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,de,he,le,ie[ye]);for(let pt=0;pt<Ze.length;pt++){const Bt=Ze[pt];De?re&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,pt+1,0,0,he,le,Bt.image[ye]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+ye,pt+1,de,he,le,Bt.image[ye])}}}M(w)&&w.mipmapsAutoUpdate===!0&&_(s.TEXTURE_CUBE_MAP),J.__version=H.version,w.onUpdate&&w.onUpdate(w)}C.__version=w.version}function gt(C,w,$,A,H,J){const K=a.convert($.format,$.colorSpace),D=a.convert($.type),V=T($.internalFormat,K,D,$.normalized,$.colorSpace),ae=n.get(w),N=n.get($);if(N.__renderTarget=w,!ae.__hasExternalTextures){const ie=Math.max(1,w.width>>J),ee=Math.max(1,w.height>>J);H===s.TEXTURE_3D||H===s.TEXTURE_2D_ARRAY?t.texImage3D(H,J,V,ie,ee,w.depth,0,K,D,null):t.texImage2D(H,J,V,ie,ee,0,K,D,null)}t.bindFramebuffer(s.FRAMEBUFFER,C),fe(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,A,H,N.__webglTexture,0,xt(w)):(H===s.TEXTURE_2D||H>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&H<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,A,H,N.__webglTexture,J),t.bindFramebuffer(s.FRAMEBUFFER,null)}function yn(C,w,$){if(s.bindRenderbuffer(s.RENDERBUFFER,C),w.depthBuffer){const A=w.depthTexture,H=A&&A.isDepthTexture?A.type:null,J=y(w.stencilBuffer,H),K=w.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;fe(w)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,xt(w),J,w.width,w.height):$?s.renderbufferStorageMultisample(s.RENDERBUFFER,xt(w),J,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,J,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,K,s.RENDERBUFFER,C)}else{const A=w.textures;for(let H=0;H<A.length;H++){const J=A[H],K=a.convert(J.format,J.colorSpace),D=a.convert(J.type),V=T(J.internalFormat,K,D,J.normalized,J.colorSpace);fe(w)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,xt(w),V,w.width,w.height):$?s.renderbufferStorageMultisample(s.RENDERBUFFER,xt(w),V,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,V,w.width,w.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Pt(C,w,$){const A=w.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(s.FRAMEBUFFER,C),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const H=n.get(w.depthTexture);H.__renderTarget=w;const J=A?w.depthTexture.image[0]:w.depthTexture.image;(!H.__webglTexture||J.width!==w.width||J.height!==w.height)&&(J.width=w.width,J.height=w.height,w.depthTexture.needsUpdate=!0),A?ve(w.depthTexture,0):ce(w.depthTexture,0);const K=H.__webglTexture,D=xt(w),V=A?s.TEXTURE_CUBE_MAP_POSITIVE_X+$:s.TEXTURE_2D,ae=w.depthTexture.format===yi?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(w.depthTexture.format===_i)fe(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ae,V,K,0,D):s.framebufferTexture2D(s.FRAMEBUFFER,ae,V,K,0);else if(w.depthTexture.format===yi)fe(w)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ae,V,K,0,D):s.framebufferTexture2D(s.FRAMEBUFFER,ae,V,K,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function hn(C){const w=n.get(C),$=C.isWebGLCubeRenderTarget===!0;if(w.__boundDepthTexture!==C.depthTexture){const A=C.depthTexture;if(w.__depthDisposeCallback&&w.__depthDisposeCallback(),A){const H=()=>{delete w.__boundDepthTexture,delete w.__depthDisposeCallback,A.removeEventListener("dispose",H)};A.addEventListener("dispose",H),w.__depthDisposeCallback=H}w.__boundDepthTexture=A}if(C.depthTexture&&!w.__autoAllocateDepthBuffer)if($)for(let A=0;A<6;A++)Pt(w.__webglFramebuffer[A],C,A);else C.texture.mipmaps.length>0?Pt(w.__webglFramebuffer[0],C,0):Pt(w.__webglFramebuffer,C,0);else if($){w.__webglDepthbuffer=[];for(let A=0;A<6;A++)if(t.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[A]),w.__webglDepthbuffer[A]===void 0)w.__webglDepthbuffer[A]=s.createRenderbuffer(),yn(w.__webglDepthbuffer[A],C,!1);else{const H=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,J=w.__webglDepthbuffer[A];s.bindRenderbuffer(s.RENDERBUFFER,J),s.framebufferRenderbuffer(s.FRAMEBUFFER,H,s.RENDERBUFFER,J)}}else if(C.texture.mipmaps.length>0?t.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer===void 0)w.__webglDepthbuffer=s.createRenderbuffer(),yn(w.__webglDepthbuffer,C,!1);else{const H=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,J=w.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,J),s.framebufferRenderbuffer(s.FRAMEBUFFER,H,s.RENDERBUFFER,J)}t.bindFramebuffer(s.FRAMEBUFFER,null)}function Kt(C,w,$){const A=n.get(C);w!==void 0&&gt(A.__webglFramebuffer,C,C.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),$!==void 0&&hn(C)}function Wt(C){const w=C.texture,$=n.get(C),A=n.get(w);C.addEventListener("dispose",k),P(C);const H=C.textures,J=C.isWebGLCubeRenderTarget===!0,K=H.length>1;if(K||(A.__webglTexture===void 0&&(A.__webglTexture=s.createTexture()),A.__version=w.version,r.memory.textures++),J){$.__webglFramebuffer=[];for(let D=0;D<6;D++)if(w.mipmaps.length>0){$.__webglFramebuffer[D]=[];for(let V=0;V<w.mipmaps.length;V++)$.__webglFramebuffer[D][V]=s.createFramebuffer()}else $.__webglFramebuffer[D]=s.createFramebuffer()}else{if(w.mipmaps.length>0){$.__webglFramebuffer=[];for(let D=0;D<w.mipmaps.length;D++)$.__webglFramebuffer[D]=s.createFramebuffer()}else $.__webglFramebuffer=s.createFramebuffer();if(K)for(let D=0,V=H.length;D<V;D++){const ae=n.get(H[D]);ae.__webglTexture===void 0&&(ae.__webglTexture=s.createTexture(),r.memory.textures++)}if(C.samples>0&&fe(C)===!1){$.__webglMultisampledFramebuffer=s.createFramebuffer(),$.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,$.__webglMultisampledFramebuffer);for(let D=0;D<H.length;D++){const V=H[D];$.__webglColorRenderbuffer[D]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,$.__webglColorRenderbuffer[D]);const ae=a.convert(V.format,V.colorSpace),N=a.convert(V.type),ie=T(V.internalFormat,ae,N,V.normalized,V.colorSpace,C.isXRRenderTarget===!0),ee=xt(C);s.renderbufferStorageMultisample(s.RENDERBUFFER,ee,ie,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+D,s.RENDERBUFFER,$.__webglColorRenderbuffer[D])}s.bindRenderbuffer(s.RENDERBUFFER,null),C.depthBuffer&&($.__webglDepthRenderbuffer=s.createRenderbuffer(),yn($.__webglDepthRenderbuffer,C,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(J){t.bindTexture(s.TEXTURE_CUBE_MAP,A.__webglTexture),qe(s.TEXTURE_CUBE_MAP,w);for(let D=0;D<6;D++)if(w.mipmaps.length>0)for(let V=0;V<w.mipmaps.length;V++)gt($.__webglFramebuffer[D][V],C,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+D,V);else gt($.__webglFramebuffer[D],C,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+D,0);M(w)?_(s.TEXTURE_CUBE_MAP):w.mipmaps.length>0&&s.texParameteri(s.TEXTURE_CUBE_MAP,s.TEXTURE_MAX_LEVEL,w.mipmaps.length-1),t.unbindTexture()}else if(K){for(let D=0,V=H.length;D<V;D++){const ae=H[D],N=n.get(ae);let ie=s.TEXTURE_2D;(C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(ie=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ie,N.__webglTexture),qe(ie,ae),gt($.__webglFramebuffer,C,ae,s.COLOR_ATTACHMENT0+D,ie,0),M(ae)&&_(ie)}t.unbindTexture()}else{let D=s.TEXTURE_2D;if((C.isWebGL3DRenderTarget||C.isWebGLArrayRenderTarget)&&(D=C.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(D,A.__webglTexture),qe(D,w),w.mipmaps.length>0)for(let V=0;V<w.mipmaps.length;V++)gt($.__webglFramebuffer[V],C,w,s.COLOR_ATTACHMENT0,D,V);else gt($.__webglFramebuffer,C,w,s.COLOR_ATTACHMENT0,D,0);M(w)?_(D):w.mipmaps.length>0&&s.texParameteri(D,s.TEXTURE_MAX_LEVEL,w.mipmaps.length-1),t.unbindTexture()}C.depthBuffer&&hn(C)}function G(C){const w=C.textures;for(let $=0,A=w.length;$<A;$++){const H=w[$];if(M(H)&&H.mipmapsAutoUpdate===!0){const J=E(C),K=n.get(H).__webglTexture;t.bindTexture(J,K),_(J),t.unbindTexture()}}}const sn=[];function vt(C){if(C.samples>0){if(fe(C)===!1){const w=C.textures,$=C.width,A=C.height;let H=s.COLOR_BUFFER_BIT;const J=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,K=n.get(C),D=w.length>1;if(D)for(let ae=0;ae<w.length;ae++)t.bindFramebuffer(s.FRAMEBUFFER,K.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ae,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,K.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ae,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,K.__webglMultisampledFramebuffer),C.texture.mipmaps.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,K.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,K.__webglFramebuffer);for(let ae=0;ae<w.length;ae++){if(C.resolveDepthBuffer&&(C.depthBuffer&&(H|=s.DEPTH_BUFFER_BIT),C.stencilBuffer&&C.resolveStencilBuffer&&(H|=s.STENCIL_BUFFER_BIT)),D){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,K.__webglColorRenderbuffer[ae]);const N=n.get(w[ae]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,N,0)}s.blitFramebuffer(0,0,$,A,0,0,$,A,H,s.NEAREST),l===!0&&(sn.length=0,sn.push(s.COLOR_ATTACHMENT0+ae),C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&sn.push(J),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,sn))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),D)for(let ae=0;ae<w.length;ae++){t.bindFramebuffer(s.FRAMEBUFFER,K.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ae,s.RENDERBUFFER,K.__webglColorRenderbuffer[ae]);const N=n.get(w[ae]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,K.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ae,s.TEXTURE_2D,N,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,K.__webglMultisampledFramebuffer)}else if(C.depthBuffer&&C.storeMultisampledDepthBuffer===!1&&l){const w=C.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[w])}}}function xt(C){return Math.min(i.maxSamples,C.samples)}function fe(C){const w=n.get(C);return C.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Et(C){const w=r.render.frame;d.get(C)!==w&&(d.set(C,w),C.update())}function Ie(C,w){const $=C.colorSpace,A=C.format,H=C.type;return C.isCompressedTexture===!0||C.isVideoTexture===!0||$!==za&&$!==vi&&(at.getTransfer($)===mt?(A!==Vn||H!==xn)&&Ve("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ct("WebGLTextures: Unsupported texture color space:",$)),w}function Be(C){return typeof HTMLImageElement<"u"&&C instanceof HTMLImageElement?(c.width=C.naturalWidth||C.width,c.height=C.naturalHeight||C.height):typeof VideoFrame<"u"&&C instanceof VideoFrame?(c.width=C.displayWidth,c.height=C.displayHeight):(c.width=C.width,c.height=C.height),c}this.allocateTextureUnit=Ue,this.resetTextureUnits=te,this.getTextureUnits=se,this.setTextureUnits=Me,this.setTexture2D=ce,this.setTexture2DArray=we,this.setTexture3D=Ae,this.setTextureCube=ve,this.rebindTextures=Kt,this.setupRenderTarget=Wt,this.updateRenderTargetMipmap=G,this.updateMultisampleRenderTarget=vt,this.setupDepthRenderbuffer=hn,this.setupFrameBufferTexture=gt,this.useMultisampledRTT=fe,this.dispose=U}function j0(s,e){function t(n,i=vi){let a;const r=at.getTransfer(i);if(n===xn)return s.UNSIGNED_BYTE;if(n===Go)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Vo)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Wc)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===$c)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===Gc)return s.BYTE;if(n===Vc)return s.SHORT;if(n===Fs)return s.UNSIGNED_SHORT;if(n===Ho)return s.INT;if(n===qn)return s.UNSIGNED_INT;if(n===Dn)return s.FLOAT;if(n===Xn)return s.HALF_FLOAT;if(n===qc)return s.ALPHA;if(n===Xc)return s.RGB;if(n===Vn)return s.RGBA;if(n===_i)return s.DEPTH_COMPONENT;if(n===yi)return s.DEPTH_STENCIL;if(n===Wo)return s.RED;if(n===$o)return s.RED_INTEGER;if(n===Fi)return s.RG;if(n===qo)return s.RG_INTEGER;if(n===Xo)return s.RGBA_INTEGER;if(n===La||n===Ia||n===Da||n===Na)if(r===mt)if(a=e.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(n===La)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===Ia)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Da)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Na)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=e.get("WEBGL_compressed_texture_s3tc"),a!==null){if(n===La)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===Ia)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Da)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Na)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===jr||n===eo||n===to||n===no)if(a=e.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(n===jr)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===eo)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===to)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===no)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===io||n===so||n===ao||n===ro||n===oo||n===Oa||n===lo)if(a=e.get("WEBGL_compressed_texture_etc"),a!==null){if(n===io||n===so)return r===mt?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(n===ao)return r===mt?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC;if(n===ro)return a.COMPRESSED_R11_EAC;if(n===oo)return a.COMPRESSED_SIGNED_R11_EAC;if(n===Oa)return a.COMPRESSED_RG11_EAC;if(n===lo)return a.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===co||n===ho||n===uo||n===fo||n===po||n===mo||n===go||n===vo||n===xo||n===yo||n===_o||n===Mo||n===bo||n===wo)if(a=e.get("WEBGL_compressed_texture_astc"),a!==null){if(n===co)return r===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===ho)return r===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===uo)return r===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===fo)return r===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===po)return r===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===mo)return r===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===go)return r===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===vo)return r===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===xo)return r===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===yo)return r===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===_o)return r===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Mo)return r===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===bo)return r===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===wo)return r===mt?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===So||n===Eo||n===To)if(a=e.get("EXT_texture_compression_bptc"),a!==null){if(n===So)return r===mt?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Eo)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===To)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Ao||n===Ro||n===ka||n===Co)if(a=e.get("EXT_texture_compression_rgtc"),a!==null){if(n===Ao)return a.COMPRESSED_RED_RGTC1_EXT;if(n===Ro)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ka)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Co)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===us?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}const eg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,tg=`
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

}`;class ng{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new ud(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new dn({vertexShader:eg,fragmentShader:tg,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Y(new Ot(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class ig extends ki{constructor(e,t){super();const n=this;let i=null,a=1,r=null,o="local-floor",l=1,c=null,d=null,u=null,h=null,f=null,g=null;const v=typeof XRWebGLBinding<"u",m=new ng,p={},x=t.getContextAttributes();let M=null,_=null;const E=[],T=[],y=new $e;let b=null,P=null;const I=new vn;I.viewport=new Rt;const O=new vn;O.viewport=new Rt;const k=[I,O],Z=new pu;let R=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ne){let ce=E[ne];return ce===void 0&&(ce=new vr,E[ne]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(ne){let ce=E[ne];return ce===void 0&&(ce=new vr,E[ne]=ce),ce.getGripSpace()},this.getHand=function(ne){let ce=E[ne];return ce===void 0&&(ce=new vr,E[ne]=ce),ce.getHandSpace()};function F(ne){const ce=T.indexOf(ne.inputSource);if(ce===-1)return;const we=E[ce];we!==void 0&&(we.update(ne.inputSource,ne.frame,c||r),we.dispatchEvent({type:ne.type,data:ne.inputSource}))}function z(){i.removeEventListener("select",F),i.removeEventListener("selectstart",F),i.removeEventListener("selectend",F),i.removeEventListener("squeeze",F),i.removeEventListener("squeezestart",F),i.removeEventListener("squeezeend",F),i.removeEventListener("end",z),i.removeEventListener("inputsourceschange",j);for(let ne=0;ne<E.length;ne++){const ce=T[ne];ce!==null&&(T[ne]=null,E[ne].disconnect(ce))}R=null,U=null,m.reset();for(const ne in p)delete p[ne];if(e.setRenderTarget(M),f=null,h=null,u=null,i=null,_=null,Ue.stop(),n.isPresenting=!1,e.setPixelRatio(b),e.setSize(y.width,y.height,!1),P!==null){const ne=P.camera;ne.fov=P.fov,ne.zoom=P.zoom,ne.updateProjectionMatrix(),P=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ne){a=ne,n.isPresenting===!0&&Ve("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ne){o=ne,n.isPresenting===!0&&Ve("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(ne){c=ne},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return u===null&&v&&(u=new XRWebGLBinding(i,t)),u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(ne){if(i=ne,i!==null){if(M=e.getRenderTarget(),i.addEventListener("select",F),i.addEventListener("selectstart",F),i.addEventListener("selectend",F),i.addEventListener("squeeze",F),i.addEventListener("squeezestart",F),i.addEventListener("squeezeend",F),i.addEventListener("end",z),i.addEventListener("inputsourceschange",j),x.xrCompatible!==!0&&await t.makeXRCompatible(),b=e.getPixelRatio(),e.getSize(y),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let we=null,Ae=null,ve=null;x.depth&&(ve=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,we=x.stencil?yi:_i,Ae=x.stencil?us:qn);const me={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:a};u=this.getBinding(),h=u.createProjectionLayer(me),i.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),_=new Wn(h.textureWidth,h.textureHeight,{format:Vn,type:xn,depthTexture:new fs(h.textureWidth,h.textureHeight,Ae,void 0,void 0,void 0,void 0,void 0,void 0,we),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{const we={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:a};f=new XRWebGLLayer(i,t,we),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new Wn(f.framebufferWidth,f.framebufferHeight,{format:Vn,type:xn,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await i.requestReferenceSpace(o),Ue.setContext(i),Ue.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function j(ne){for(let ce=0;ce<ne.removed.length;ce++){const we=ne.removed[ce],Ae=T.indexOf(we);Ae>=0&&(T[Ae]=null,E[Ae].disconnect(we))}for(let ce=0;ce<ne.added.length;ce++){const we=ne.added[ce];let Ae=T.indexOf(we);if(Ae===-1){for(let me=0;me<E.length;me++)if(me>=T.length){T.push(we),Ae=me;break}else if(T[me]===null){T[me]=we,Ae=me;break}if(Ae===-1)break}const ve=E[Ae];ve&&ve.connect(we)}}function W(ne,ce){ce===null?ne.matrixWorld.copy(ne.matrix):ne.matrixWorld.multiplyMatrices(ce.matrixWorld,ne.matrix),ne.matrixWorldInverse.copy(ne.matrixWorld).invert()}this.updateCamera=function(ne){if(i===null)return;let ce=ne.near,we=ne.far;m.texture!==null&&(m.depthNear>0&&(ce=m.depthNear),m.depthFar>0&&(we=m.depthFar)),Z.near=O.near=I.near=ce,Z.far=O.far=I.far=we,(R!==Z.near||U!==Z.far)&&(i.updateRenderState({depthNear:Z.near,depthFar:Z.far}),R=Z.near,U=Z.far),Z.layers.mask=ne.layers.mask|6,I.layers.mask=Z.layers.mask&-5,O.layers.mask=Z.layers.mask&-3;const Ae=ne.parent,ve=Z.cameras;W(Z,Ae);for(let me=0;me<ve.length;me++)W(ve[me],Ae);Z.projectionMatrix.copy(I.projectionMatrix),Z.projectionMatrixInverse.copy(I.projectionMatrixInverse),P===null&&ne.isPerspectiveCamera&&(P={camera:ne,fov:ne.fov,zoom:ne.zoom}),te(ne,Z,Ae)};function te(ne,ce,we){we===null?ne.matrix.copy(ce.matrixWorld):(ne.matrix.copy(we.matrixWorld),ne.matrix.invert(),ne.matrix.multiply(ce.matrixWorld)),ne.matrix.decompose(ne.position,ne.quaternion,ne.scale),ne.updateMatrixWorld(!0),ne.projectionMatrix.copy(ce.projectionMatrix),ne.projectionMatrixInverse.copy(ce.projectionMatrixInverse),ne.isPerspectiveCamera&&(ne.fov=Va*2*Math.atan(1/ne.projectionMatrix.elements[5]),ne.zoom=1)}this.getCamera=function(){return Z},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(ne){l=ne,h!==null&&(h.fixedFoveation=ne),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=ne)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(Z)},this.getCameraTexture=function(ne){return p[ne]};let se=null;function Me(ne,ce){if(d=ce.getViewerPose(c||r),g=ce,d!==null){const we=d.views;f!==null&&(e.setRenderTargetFramebuffer(_,f.framebuffer),e.setRenderTarget(_));let Ae=!1;we.length!==Z.cameras.length&&(Z.cameras.length=0,Ae=!0);for(let xe=0;xe<we.length;xe++){const qe=we[xe];let lt=null;if(f!==null)lt=f.getViewport(qe);else{const St=u.getViewSubImage(h,qe);lt=St.viewport,xe===0&&(e.setRenderTargetTextures(_,St.colorTexture,St.depthStencilTexture),e.setRenderTarget(_))}let Ge=k[xe];Ge===void 0&&(Ge=new vn,Ge.layers.enable(xe),Ge.viewport=new Rt,k[xe]=Ge),Ge.matrix.fromArray(qe.transform.matrix),Ge.matrix.decompose(Ge.position,Ge.quaternion,Ge.scale),Ge.projectionMatrix.fromArray(qe.projectionMatrix),Ge.projectionMatrixInverse.copy(Ge.projectionMatrix).invert(),Ge.viewport.set(lt.x,lt.y,lt.width,lt.height),xe===0&&(Z.matrix.copy(Ge.matrix),Z.matrix.decompose(Z.position,Z.quaternion,Z.scale)),Ae===!0&&Z.cameras.push(Ge)}const ve=i.enabledFeatures;if(ve&&ve.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&v){u=n.getBinding();const xe=u.getDepthInformation(we[0]);xe&&xe.isValid&&xe.texture&&m.init(xe,i.renderState)}if(ve&&ve.includes("camera-access")&&v){e.state.unbindTexture(),u=n.getBinding();for(let xe=0;xe<we.length;xe++){const qe=we[xe].camera;if(qe){let lt=p[qe];lt||(lt=new ud,p[qe]=lt);const Ge=u.getCameraImage(qe);lt.sourceTexture=Ge}}}}for(let we=0;we<E.length;we++){const Ae=T[we],ve=E[we];Ae!==null&&ve!==void 0&&ve.update(Ae,ce,c||r)}se&&se(ne,ce),ce.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ce}),g=null}const Ue=new Md;Ue.setAnimationLoop(Me),this.setAnimationLoop=function(ne){se=ne},this.dispose=function(){}}}const sg=new ut,Ld=new Xe;Ld.set(-1,0,0,0,1,0,0,0,1);function ag(s,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,pd(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,x,M,_){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?a(m,p):p.isMeshLambertMaterial?(a(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(a(m,p),u(m,p)):p.isMeshPhongMaterial?(a(m,p),d(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(a(m,p),h(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(a(m,p),g(m,p)):p.isMeshDepthMaterial?a(m,p):p.isMeshDistanceMaterial?(a(m,p),v(m,p)):p.isMeshNormalMaterial?a(m,p):p.isLineBasicMaterial?(r(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?l(m,p,x,M):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function a(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===tn&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===tn&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=e.get(p),M=x.envMap,_=x.envMapRotation;M&&(m.envMap.value=M,m.envMapRotation.value.setFromMatrix4(sg.makeRotationFromEuler(_)).transpose(),M.isCubeTexture&&M.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(Ld),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function r(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,x,M){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=M*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function d(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function h(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,x){m.ior.value=p.ior,p.diffuseRoughness>0&&(m.diffuseRoughness.value=p.diffuseRoughness,p.diffuseRoughnessMap&&(m.diffuseRoughnessMap.value=p.diffuseRoughnessMap,t(p.diffuseRoughnessMap,m.diffuseRoughnessMapTransform))),p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===tn&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessMinimum,m.iridescenceThicknessMaximum.value=p.iridescenceThicknessMaximum,p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const x=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function rg(s,e,t,n){let i={},a={};function r(x,M){const _=M.program;n.uniformBlockBinding(x,_,i[x.id])}function o(x,M){let _=i[x.id];_===void 0&&(g(x),_=l(x),i[x.id]=_,x.addEventListener("dispose",m));const E=M.program;n.updateUBOMapping(x,E);const T=e.render.frame;a[x.id]!==T&&(c(x),a[x.id]=T)}function l(x){const M=s.createBuffer(),_=x.__size,E=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,M),s.bufferData(s.UNIFORM_BUFFER,_,E),s.bindBuffer(s.UNIFORM_BUFFER,null),M}function c(x){const M=i[x.id],_=x.uniforms,E=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,M);for(let T=0,y=_.length;T<y;T++){const b=_[T];if(Array.isArray(b))for(let P=0,I=b.length;P<I;P++)d(b[P],T,P,E);else d(b,T,0,E)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function d(x,M,_,E){if(h(x,M,_,E)===!0){const T=x.__offset,y=x.value;if(Array.isArray(y)){let b=0;for(let P=0;P<y.length;P++){const I=y[P],O=v(I,!0);u(I,x.__data,b),b+=O.storage/Float32Array.BYTES_PER_ELEMENT}}else u(y,x.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,T,x.__data)}}function u(x,M,_){typeof x=="number"||typeof x=="boolean"?M[_]=x:x.isMatrix3?(M[_]=x.elements[0],M[_+1]=x.elements[1],M[_+2]=x.elements[2],M[_+3]=0,M[_+4]=x.elements[3],M[_+5]=x.elements[4],M[_+6]=x.elements[5],M[_+7]=0,M[_+8]=x.elements[6],M[_+9]=x.elements[7],M[_+10]=x.elements[8],M[_+11]=0):ArrayBuffer.isView(x)?M.set(x.subarray(0,M.length-_),_):x.toArray(M,_)}function h(x,M,_,E){const T=x.value,y=M+"_"+_;if(Array.isArray(T)){E[y]===void 0&&(E[y]=[]);const b=E[y];let P=!1;for(let I=0;I<T.length;I++)f(T[I],b,I)===!0&&(P=!0);return P}return f(T,E,y)}function f(x,M,_){if(M[_]===void 0)return typeof x=="number"||typeof x=="boolean"?M[_]=x:ArrayBuffer.isView(x)?M[_]=x.slice():M[_]=x.clone(),!0;{const E=M[_];if(typeof x=="number"||typeof x=="boolean"){if(E!==x)return M[_]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(E.equals(x)===!1)return E.copy(x),!0}}return!1}function g(x){const M=x.uniforms;let _=0;const E=16;for(let y=0,b=M.length;y<b;y++){const P=Array.isArray(M[y])?M[y]:[M[y]];for(let I=0,O=P.length;I<O;I++){const k=P[I],Z=Array.isArray(k.value)?k.value:[k.value],R=Array.isArray(M[y])||Array.isArray(k.value);let U=_;for(let z=0,j=Z.length;z<j;z++){const W=Z[z],te=v(W,R),se=_%E,Me=se%te.boundary,Ue=se+Me;_+=Me,Ue!==0&&E-Ue<te.storage&&(_+=E-Ue),z===0&&(U=_),_+=te.storage}const F=k.type==="int"?Int32Array:k.type==="uint"?Uint32Array:Float32Array;k.__data=new F((_-U)/Float32Array.BYTES_PER_ELEMENT),k.__offset=U}}const T=_%E;return T>0&&(_+=E-T),x.__size=_,x.__cache={},this}function v(x,M){const _={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(_.boundary=4,_.storage=4):x.isVector2?(_.boundary=8,_.storage=8):x.isVector3||x.isColor?(_.boundary=16,_.storage=12):x.isVector4?(_.boundary=16,_.storage=16):x.isMatrix3?(_.boundary=16,_.storage=48):x.isMatrix4?(_.boundary=16,_.storage=64):x.isTexture?Ve("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(_.boundary=16,_.storage=x.byteLength):Ve("WebGLRenderer: Unsupported uniform value type.",x),M===!0&&(_.boundary=16,_.storage=Math.ceil(_.storage/16)*16),_}function m(x){const M=x.target;M.removeEventListener("dispose",m),s.deleteBuffer(i[M.id]),delete i[M.id],delete a[M.id]}function p(){for(const x in i)s.deleteBuffer(i[x]);i={},a={}}return{bind:r,update:o,dispose:p}}const og=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Hn=null;function lg(){return Hn===null&&(Hn=new ld(og,16,16,Fi,Xn),Hn.name="DFG_LUT",Hn.minFilter=fn,Hn.magFilter=fn,Hn.wrapS=ii,Hn.wrapT=ii,Hn.generateMipmaps=!1,Hn.needsUpdate=!0),Hn}class cg{constructor(e={}){const{canvas:t=Ah(),context:n=null,depth:i=!0,stencil:a=!1,alpha:r=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:h=!1,outputBufferType:f=xn}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=r;const v=f,m=new Set([Xo,qo,$o]),p=new Set([xn,qn,Fs,us,Go,Vo]),x=new Uint32Array(4),M=new Int32Array(4),_={textures:[],min:[],max:[],resolution:[]};let E=null,T=null;const y=[],b=[];let P=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=ai,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const I=this;let O=!1,k=null,Z=null,R=null,U=null;this._outputColorSpace=ln;let F=0,z=0,j=null,W=-1,te=null;const se=new Rt,Me=new Rt;let Ue=null;const ne=new Oe(0);let ce=0,we=t.width,Ae=t.height,ve=1,me=null,ze=null;const xe=new Rt(0,0,we,Ae),qe=new Rt(0,0,we,Ae);let lt=!1;const Ge=new ks,St=new Zo;let Lt=!1,It=!1;const gt=new ut,yn=new L,Pt=new Rt,hn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Kt=!1;function Wt(){return j===null?ve:1}let G=n;function sn(S,B){return t.getContext(S,B)}let vt,xt,fe,Et,Ie,Be,C,w,$,A,H,J,K,D,V,ae,N,ie,ee,he,le,de,De;try{const S={alpha:!0,depth:i,stencil:a,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${zo}`),t.addEventListener("webglcontextlost",Fe,!1),t.addEventListener("webglcontextrestored",Ze,!1),t.addEventListener("webglcontextcreationerror",ye,!1),G===null){const B="webgl2";if(G=sn(B,S),G===null)throw sn(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Je()}catch(S){throw t.removeEventListener("webglcontextlost",Fe,!1),t.removeEventListener("webglcontextrestored",Ze,!1),t.removeEventListener("webglcontextcreationerror",ye,!1),ct("WebGLRenderer: "+S.message),S}function Je(){vt=new um(G),vt.init(),le=new j0(G,vt),xt=new tm(G,vt,e,le),fe=new J0(G,vt),xt.reversedDepthBuffer&&h&&fe.buffers.depth.setReversed(!0),Z=G.createFramebuffer(),R=G.createFramebuffer(),U=G.createFramebuffer(),Et=new mm(G),Ie=new O0,Be=new Q0(G,vt,fe,Ie,xt,le,Et),C=new hm(I),w=new gu(G),de=new jp(G,w),$=new fm(G,w,Et,de),A=new vm(G,$,w,de,Et),ie=new gm(G,xt,Be),V=new nm(Ie),H=new F0(I,C,vt,xt,de,V),J=new ag(I,Ie),K=new z0,D=new $0(vt),N=new Qp(I,C,fe,A,g,l),ae=new Z0(I,A,xt),De=new rg(G,Et,xt,fe),ee=new em(G,vt,Et),he=new pm(G,vt,Et),Et.programs=H.programs,I.capabilities=xt,I.extensions=vt,I.properties=Ie,I.renderLists=K,I.shadowMap=ae,I.state=fe,I.info=Et}v!==xn&&(P=new ym(v,t.width,t.height,o,i,a));const re=new ig(I,G);this.xr=re,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){const S=vt.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=vt.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return ve},this.setPixelRatio=function(S){S!==void 0&&(ve=S,this.setSize(we,Ae,!1))},this.getSize=function(S){return S.set(we,Ae)},this.setSize=function(S,B,Q=!0){if(re.isPresenting){Ve("WebGLRenderer: Can't change size while VR device is presenting.");return}we=S,Ae=B,t.width=Math.floor(S*ve),t.height=Math.floor(B*ve),Q===!0&&(t.style.width=S+"px",t.style.height=B+"px"),P!==null&&P.setSize(t.width,t.height),this.setViewport(0,0,S,B)},this.getDrawingBufferSize=function(S){return S.set(we*ve,Ae*ve).floor()},this.setDrawingBufferSize=function(S,B,Q){we=S,Ae=B,ve=Q,t.width=Math.floor(S*Q),t.height=Math.floor(B*Q),this.setViewport(0,0,S,B)},this.setEffects=function(S){if(v===xn){ct("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let B=0;B<S.length;B++)if(S[B].isOutputPass===!0){Ve("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}P.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(se)},this.getViewport=function(S){return S.copy(xe)},this.setViewport=function(S,B,Q,q){S.isVector4?xe.set(S.x,S.y,S.z,S.w):xe.set(S,B,Q,q),fe.viewport(se.copy(xe).multiplyScalar(Wt()).round())},this.getScissor=function(S){return S.copy(qe)},this.setScissor=function(S,B,Q,q){S.isVector4?qe.set(S.x,S.y,S.z,S.w):qe.set(S,B,Q,q),fe.scissor(Me.copy(qe).multiplyScalar(Wt()).round())},this.getScissorTest=function(){return lt},this.setScissorTest=function(S){fe.setScissorTest(lt=S)},this.setOpaqueSort=function(S){me=S},this.setTransparentSort=function(S){ze=S},this.getClearColor=function(S){return S.copy(N.getClearColor())},this.setClearColor=function(){N.setClearColor(...arguments)},this.getClearAlpha=function(){return N.getClearAlpha()},this.setClearAlpha=function(){N.setClearAlpha(...arguments)},this.clear=function(S=!0,B=!0,Q=!0){let q=0;if(S){let X=!1;if(j!==null){const pe=j.texture.format;X=m.has(pe)}if(X){const pe=j.texture.type,Te=p.has(pe),ue=N.getClearColor(),be=N.getClearAlpha(),Pe=ue.r,Ye=ue.g,it=ue.b;Te?(x[0]=Pe,x[1]=Ye,x[2]=it,x[3]=be,G.clearBufferuiv(G.COLOR,0,x)):(M[0]=Pe,M[1]=Ye,M[2]=it,M[3]=be,G.clearBufferiv(G.COLOR,0,M))}else q|=G.COLOR_BUFFER_BIT}B&&(q|=G.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),Q&&(q|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q!==0&&G.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),k=S},this.dispose=function(){t.removeEventListener("webglcontextlost",Fe,!1),t.removeEventListener("webglcontextrestored",Ze,!1),t.removeEventListener("webglcontextcreationerror",ye,!1),N.dispose(),K.dispose(),D.dispose(),Be.dispose(),Ie.dispose(),C.dispose(),A.dispose(),$.dispose(),de.dispose(),De.dispose(),H.dispose(),re.dispose(),re.removeEventListener("sessionstart",ll),re.removeEventListener("sessionend",cl),Ei.stop()};function Fe(S){S.preventDefault(),Ga("WebGLRenderer: Context Lost."),O=!0}function Ze(){Ga("WebGLRenderer: Context Restored."),O=!1;const S=Et.autoReset,B=ae.enabled,Q=ae.autoUpdate,q=ae.needsUpdate,X=ae.type;Je(),Et.autoReset=S,ae.enabled=B,ae.autoUpdate=Q,ae.needsUpdate=q,ae.type=X}function ye(S){ct("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function pt(S){const B=S.target;B.removeEventListener("dispose",pt),Bt(B)}function Bt(S){ci(S),Ie.remove(S)}function ci(S){const B=Ie.get(S).programs;B!==void 0&&(B.forEach(function(Q){H.releaseProgram(Q)}),S.isShaderMaterial&&H.releaseShaderCache(S))}this.renderBufferDirect=function(S,B,Q,q,X,pe){B===null&&(B=hn);const Te=X.isMesh&&X.matrixWorld.determinantAffine()<0,ue=qd(S,B,Q,q,X);fe.setMaterial(q,Te);let be=Q.index,Pe=1;if(q.wireframe===!0){if(be=$.getWireframeAttribute(Q),be===void 0)return;Pe=2}const Ye=Q.drawRange,it=Q.attributes.position;let Re=Ye.start*Pe,st=(Ye.start+Ye.count)*Pe;pe!==null&&(Re=Math.max(Re,pe.start*Pe),st=Math.min(st,(pe.start+pe.count)*Pe)),be!==null?(Re=Math.max(Re,0),st=Math.min(st,be.count)):it!=null&&(Re=Math.max(Re,0),st=Math.min(st,it.count));const Dt=st-Re;if(Dt<0||Dt===1/0)return;de.setup(X,q,ue,Q,be);let bt,yt=ee;if(be!==null&&(bt=w.get(be),yt=he,yt.setIndex(bt)),X.isMesh)q.wireframe===!0?(fe.setLineWidth(q.wireframeLinewidth*Wt()),yt.setMode(G.LINES)):yt.setMode(G.TRIANGLES);else if(X.isLine){let Zt=q.linewidth;Zt===void 0&&(Zt=1),fe.setLineWidth(Zt*Wt()),X.isLineSegments?yt.setMode(G.LINES):X.isLineLoop?yt.setMode(G.LINE_LOOP):yt.setMode(G.LINE_STRIP)}else X.isPoints?yt.setMode(G.POINTS):X.isSprite&&yt.setMode(G.TRIANGLES);if(X.isBatchedMesh)if(vt.get("WEBGL_multi_draw"))yt.renderMultiDraw(X._multiDrawStarts,X._multiDrawCounts,X._multiDrawCount);else{const Zt=X._multiDrawStarts,Ce=X._multiDrawCounts,an=X._multiDrawCount,dt=be?w.get(be).bytesPerElement:1,Ti=Ie.get(q).currentProgram.getUniforms();for(let Jt=0;Jt<an;Jt++)Ti.setValue(G,"_gl_DrawID",Jt),yt.render(Zt[Jt]/dt,Ce[Jt])}else if(X.isInstancedMesh)yt.renderInstances(Re,Dt,X.count);else if(Q.isInstancedBufferGeometry){const Zt=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,Ce=Math.min(Q.instanceCount,Zt);yt.renderInstances(Re,Dt,Ce)}else yt.render(Re,Dt)};function ol(S,B,Q,q){k!==null&&S.isNodeMaterial&&k.setObject(q,S),Lt===!0&&V.setState(S,Q,!1),S.transparent===!0&&S.side===rt&&S.forceSinglePass===!1?(S.side=tn,S.needsUpdate=!0,vs(S,B,q),S.side=Ui,S.needsUpdate=!0,vs(S,B,q),S.side=rt):vs(S,B,q)}this.compile=function(S,B,Q=null){Q===null&&(Q=S),k!==null&&k.renderStart(S,B,Q),T=D.get(Q),T.init(B),b.push(T),Q.traverseVisible(function(X){X.isLight&&X.layers.test(B.layers)&&(T.pushLight(X),X.castShadow&&T.pushShadow(X))}),S!==Q&&S.traverseVisible(function(X){X.isLight&&X.layers.test(B.layers)&&(T.pushLight(X),X.castShadow&&T.pushShadow(X))}),T.setupLights(),k!==null&&k.updateLights(T.state.lightsArray),It=this.localClippingEnabled,Lt=V.init(this.clippingPlanes,It),Lt===!0&&V.setGlobalState(this.clippingPlanes,B),k!==null&&ae.render(T.state.shadowsArray,Q,B);const q=new Set;return S.traverse(function(X){if(!(X.isMesh||X.isPoints||X.isLine||X.isSprite))return;const pe=X.material;if(pe)if(Array.isArray(pe))for(let Te=0;Te<pe.length;Te++){const ue=pe[Te];ol(ue,Q,B,X),q.add(ue)}else ol(pe,Q,B,X),q.add(pe)}),T=b.pop(),k!==null&&k.renderEnd(),q},this.compileAsync=function(S,B,Q=null){const q=this.compile(S,B,Q);return new Promise(X=>{function pe(){if(q.forEach(function(Te){const be=Ie.get(Te).currentProgram;(be===void 0||be.isReady())&&q.delete(Te)}),q.size===0){X(S);return}setTimeout(pe,10)}vt.get("KHR_parallel_shader_compile")!==null?pe():setTimeout(pe,10)})};let sr=null;function Wd(S){sr&&sr(S)}function ll(){Ei.stop()}function cl(){Ei.start()}const Ei=new Md;Ei.setAnimationLoop(Wd),typeof self<"u"&&Ei.setContext(self),this.setAnimationLoop=function(S){sr=S,re.setAnimationLoop(S),S===null?Ei.stop():Ei.start()},re.addEventListener("sessionstart",ll),re.addEventListener("sessionend",cl),this.render=function(S,B){if(B!==void 0&&B.isCamera!==!0){ct("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(O===!0)return;k!==null&&k.renderStart(S,B);const Q=re.enabled===!0&&re.isPresenting===!0,q=P!==null&&(j===null||Q)&&P.begin(I,j);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),re.enabled===!0&&re.isPresenting===!0&&(P===null||P.isCompositing()===!1)&&(re.cameraAutoUpdate===!0&&re.updateCamera(B),B=re.getCamera()),S.isScene===!0&&S.onBeforeRender(I,S,B,j),T=D.get(S,b.length),T.init(B),T.state.textureUnits=Be.getTextureUnits(),b.push(T),gt.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),B.isArrayCamera?St.setFromArrayCamera(B):Ge.setFromProjectionMatrix(gt,Nn,B.reversedDepth),It=this.localClippingEnabled,Lt=V.init(this.clippingPlanes,It),E=K.get(S,y.length),E.init(),y.push(E),this.info.render.frame++,re.enabled===!0&&re.isPresenting===!0){const Te=I.xr.getDepthSensingMesh();Te!==null&&ar(Te,B,-1/0,I.sortObjects)}ar(S,B,0,I.sortObjects),E.finish(),k!==null&&k.updateLights(T.state.lightsArray),I.sortObjects===!0&&E.sort(me,ze),Kt=re.enabled===!1||re.isPresenting===!1||re.hasDepthSensing()===!1,Kt&&N.addToRenderList(E,S),this.info.autoReset===!0&&this.info.reset(),Lt===!0&&V.beginShadows();const X=T.state.shadowsArray;if(ae.render(X,S,B),Lt===!0&&V.endShadows(),(q&&P.hasRenderPass())===!1){const Te=E.opaque,ue=E.transmissive;if(T.setupLights(),B.isArrayCamera){const be=B.cameras;if(ue.length>0)for(let Pe=0,Ye=be.length;Pe<Ye;Pe++){const it=be[Pe];hl(Te,ue,S,it)}Kt&&N.render(S);for(let Pe=0,Ye=be.length;Pe<Ye;Pe++){const it=be[Pe];dl(E,S,it,it.viewport)}}else ue.length>0&&hl(Te,ue,S,B),Kt&&N.render(S),dl(E,S,B)}j!==null&&z===0&&(Be.updateMultisampleRenderTarget(j),Be.updateRenderTargetMipmap(j)),q&&P.end(I),S.isScene===!0&&S.onAfterRender(I,S,B),de.resetDefaultState(),W=-1,te=null,b.pop(),b.length>0?(T=b[b.length-1],Be.setTextureUnits(T.state.textureUnits),Lt===!0&&V.setGlobalState(I.clippingPlanes,T.state.camera)):T=null,y.pop(),y.length>0?E=y[y.length-1]:E=null,k!==null&&k.renderEnd()};function ar(S,B,Q,q){if(S.visible===!1)return;if(S.layers.test(B.layers)){if(S.isGroup)Q=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(B);else if(S.isLight)T.pushLight(S),S.castShadow&&T.pushShadow(S);else if(S.isSprite){const Te=B.isArrayCamera?St:Ge;if(!S.frustumCulled||S.intersectsFrustum(Te)){q&&Pt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(gt);const ue=A.update(S),be=S.material;be.visible&&E.push(S,ue,be,Q,Pt.z,null,B)}}else if(S.isMesh||S.isLine||S.isPoints){const Te=B.isArrayCamera?St:Ge;if(!S.frustumCulled||S.intersectsFrustum(Te)){const ue=A.update(S),be=S.material;if(q&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Pt.copy(S.boundingSphere.center)):(ue.boundingSphere===null&&ue.computeBoundingSphere(),Pt.copy(ue.boundingSphere.center)),Pt.applyMatrix4(S.matrixWorld).applyMatrix4(gt)),Array.isArray(be)){const Pe=ue.groups;for(let Ye=0,it=Pe.length;Ye<it;Ye++){const Re=Pe[Ye],st=be[Re.materialIndex];st&&st.visible&&E.push(S,ue,st,Q,Pt.z,Re,B)}}else be.visible&&E.push(S,ue,be,Q,Pt.z,null,B)}}}const pe=S.children;for(let Te=0,ue=pe.length;Te<ue;Te++)ar(pe[Te],B,Q,q)}function dl(S,B,Q,q){const{opaque:X,transmissive:pe,transparent:Te}=S;T.setupLightsView(Q),Lt===!0&&V.setGlobalState(I.clippingPlanes,Q),q&&fe.viewport(se.copy(q)),X.length>0&&qs(X,B,Q),pe.length>0&&qs(pe,B,Q),Te.length>0&&qs(Te,B,Q),fe.buffers.depth.setTest(!0),fe.buffers.depth.setMask(!0),fe.buffers.color.setMask(!0),fe.setPolygonOffset(!1)}function hl(S,B,Q,q){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[q.id]===void 0){const Re=vt.has("EXT_color_buffer_half_float")||vt.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[q.id]=new Wn(1,1,{generateMipmaps:!0,type:Re?Xn:xn,minFilter:xi,samples:Math.max(4,xt.samples),stencilBuffer:a,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:at.workingColorSpace})}const pe=T.state.transmissionRenderTarget[q.id],Te=q.viewport||se;pe.setSize(Te.z*I.transmissionResolutionScale,Te.w*I.transmissionResolutionScale);const ue=I.getRenderTarget(),be=I.getActiveCubeFace(),Pe=I.getActiveMipmapLevel();I.setRenderTarget(pe),I.getClearColor(ne),ce=I.getClearAlpha(),ce<1&&I.setClearColor(16777215,.5),I.clear(),Kt&&N.render(Q);const Ye=I.toneMapping;I.toneMapping=ai;const it=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),T.setupLightsView(q),Lt===!0&&V.setGlobalState(I.clippingPlanes,q),qs(S,Q,q),Be.updateMultisampleRenderTarget(pe),Be.updateRenderTargetMipmap(pe),vt.has("WEBGL_multisampled_render_to_texture")===!1){let Re=!1;for(let st=0,Dt=B.length;st<Dt;st++){const bt=B[st],{object:yt,geometry:Zt,material:Ce,group:an}=bt;if(Ce.side===rt&&yt.layers.test(q.layers)){const dt=Ce.side;Ce.side=tn,Ce.needsUpdate=!0,ul(yt,Q,q,Zt,Ce,an),Ce.side=dt,Ce.needsUpdate=!0,Re=!0}}Re===!0&&(Be.updateMultisampleRenderTarget(pe),Be.updateRenderTargetMipmap(pe))}I.setRenderTarget(ue,be,Pe),I.setClearColor(ne,ce),it!==void 0&&(q.viewport=it),I.toneMapping=Ye}function qs(S,B,Q){const q=B.isScene===!0?B.overrideMaterial:null;for(let X=0,pe=S.length;X<pe;X++){const Te=S[X],{object:ue,geometry:be,group:Pe}=Te;let Ye=Te.material;Ye.allowOverride===!0&&q!==null&&(Ye=q),ue.layers.test(Q.layers)&&ul(ue,B,Q,be,Ye,Pe)}}function ul(S,B,Q,q,X,pe){k!==null&&X.isNodeMaterial&&k.setObject(S,X),S.onBeforeRender(I,B,Q,q,X,pe),S.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),X.onBeforeRender(I,B,Q,q,S,pe),X.transparent===!0&&X.side===rt&&X.forceSinglePass===!1?(X.side=tn,X.needsUpdate=!0,I.renderBufferDirect(Q,B,q,X,S,pe),X.side=Ui,X.needsUpdate=!0,I.renderBufferDirect(Q,B,q,X,S,pe),X.side=rt):I.renderBufferDirect(Q,B,q,X,S,pe),S.onAfterRender(I,B,Q,q,X,pe)}function fl(S){let B=0;for(const Q of S)Q.texture!==null&&B++;return B}function vs(S,B,Q){B.isScene!==!0&&(B=hn);const q=Ie.get(S),X=T.state.lights,pe=T.state.shadowsArray,Te=X.state.version,ue=H.getParameters(S,X.state,pe,B,Q,T.state.lightProbeGridArray),be=H.getProgramCacheKey(ue);let Pe=q.programs;q.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?B.environment:null,q.fog=B.fog;const Ye=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;q.envMap=C.get(S.envMap||q.environment,Ye),q.envMapRotation=q.environment!==null&&S.envMap===null?B.environmentRotation:S.envMapRotation,Pe===void 0&&(S.addEventListener("dispose",pt),Pe=new Map,q.programs=Pe,q.programVariants=new Map);let it=Pe.get(be);if(it!==void 0){if(q.currentProgram===it&&q.lightsStateVersion===Te)return ml(S,ue),it}else ue.uniforms=H.getUniforms(S),k!==null&&S.isNodeMaterial&&k.build(S,Q,ue),S.onBeforeCompile(ue,I),it=H.acquireProgram(ue,be),Pe.set(be,it),q.uniforms=ue.uniforms;const Re=q.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Re.clippingPlanes=V.uniform),ml(S,ue),q.needsLights=Yd(S),q.lightsStateVersion=Te,q.needsLights&&(Re.ambientLightColor.value=X.state.ambient,Re.lightProbe.value=X.state.probe,Re.sunLights.value=X.state.sun,Re.sunLightShadows.value=X.state.sunShadow,Re.directionalLights.value=X.state.directional,Re.directionalLightShadows.value=X.state.directionalShadow,Re.spotLights.value=X.state.spot,Re.spotLightShadows.value=X.state.spotShadow,Re.rectAreaLights.value=X.state.rectArea,Re.ltc_1.value=X.state.rectAreaLTC1,Re.ltc_2.value=X.state.rectAreaLTC2,Re.pointLights.value=X.state.point,Re.pointLightShadows.value=X.state.pointShadow,Re.hemisphereLights.value=X.state.hemi,Re.sunShadowMatrix.value=X.state.sunShadowMatrix,Re.sunShadowCascade.value=X.state.sunShadowCascade,Re.directionalShadowMatrix.value=X.state.directionalShadowMatrix,Re.spotLightMatrix.value=X.state.spotLightMatrix,Re.spotLightMap.value=X.state.spotLightMap,Re.pointShadowMatrix.value=X.state.pointShadowMatrix),q.numLightProbeGrids=fl(T.state.lightProbeGridArray),q.currentProgram=it,q.uniformsList=null,it}function $d(S,B,Q,q,X){const pe=Ie.get(S),Te=pe.currentProgram.id+","+q+","+X;let ue=pe.programVariants.get(Te);return ue===void 0?(ue=vs(S,B,Q),pe.programVariants.set(Te,ue)):(pe.currentProgram=ue,pe.uniformsList=null,pe.outputColorSpace=q,pe.toneMapping=X),ue}function pl(S){if(S.uniformsList===null){const B=S.currentProgram.getUniforms();S.uniformsList=Ua.seqWithValue(B.seq,S.uniforms)}return S.uniformsList}function ml(S,B){const Q=Ie.get(S);Q.outputColorSpace=B.outputColorSpace,Q.batching=B.batching,Q.batchingColor=B.batchingColor,Q.instancing=B.instancing,Q.instancingColor=B.instancingColor,Q.instancingMorph=B.instancingMorph,Q.skinning=B.skinning,Q.morphTargets=B.morphTargets,Q.morphNormals=B.morphNormals,Q.morphColors=B.morphColors,Q.morphTargetsCount=B.morphTargetsCount,Q.numClippingPlanes=B.numClippingPlanes,Q.numIntersection=B.numClipIntersection,Q.vertexAlphas=B.vertexAlphas,Q.vertexTangents=B.vertexTangents,Q.toneMapping=B.toneMapping}function qd(S,B,Q,q,X){B.isScene!==!0&&(B=hn),Be.resetTextureUnits();const pe=B.fog,Te=q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial?B.environment:null,ue=j===null?I.outputColorSpace:j.isXRRenderTarget===!0?j.texture.colorSpace:at.workingColorSpace,be=q.isMeshStandardMaterial||q.isMeshLambertMaterial&&!q.envMap||q.isMeshPhongMaterial&&!q.envMap,Pe=C.get(q.envMap||Te,be),Ye=q.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,it=!!Q.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Re=!!Q.morphAttributes.position,st=!!Q.morphAttributes.normal,Dt=!!Q.morphAttributes.color;let bt=ai;q.toneMapped&&(j===null||j.isXRRenderTarget===!0)&&(bt=I.toneMapping);const yt=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,Zt=yt!==void 0?yt.length:0,Ce=Ie.get(q),an=T.state.lights;if(Lt===!0&&(It===!0||S!==te)){const At=S===te&&q.id===W;V.setState(q,S,At)}let dt=!1,Ti=!1;q.version===Ce.__version?Ce.needsLights&&Ce.lightsStateVersion!==an.state.version||X.isBatchedMesh&&Ce.batching===!1||!X.isBatchedMesh&&Ce.batching===!0||X.isBatchedMesh&&Ce.batchingColor===!0&&X._colorsTexture===null||X.isBatchedMesh&&Ce.batchingColor===!1&&X._colorsTexture!==null||X.isInstancedMesh&&Ce.instancing===!1||!X.isInstancedMesh&&Ce.instancing===!0||X.isSkinnedMesh&&Ce.skinning===!1||!X.isSkinnedMesh&&Ce.skinning===!0||X.isInstancedMesh&&Ce.instancingColor===!0&&X.instanceColor===null||X.isInstancedMesh&&Ce.instancingColor===!1&&X.instanceColor!==null||X.isInstancedMesh&&Ce.instancingMorph===!0&&X.morphTexture===null||X.isInstancedMesh&&Ce.instancingMorph===!1&&X.morphTexture!==null||Ce.envMap!==Pe||q.fog===!0&&Ce.fog!==pe||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==V.numPlanes||Ce.numIntersection!==V.numIntersection)||Ce.vertexAlphas!==Ye||Ce.vertexTangents!==it||Ce.morphTargets!==Re||Ce.morphNormals!==st||Ce.morphColors!==Dt||Ce.morphTargetsCount!==Zt||Ce.numLightProbeGrids!==fl(T.state.lightProbeGridArray)?dt=!0:(Ce.outputColorSpace!==ue||Ce.toneMapping!==bt)&&(Ti=!0):(dt=!0,Ce.__version=q.version);let Jt=Ce.currentProgram;(dt===!0||Ti===!0)&&(Jt=Ti===!0?$d(q,B,X,ue,bt):vs(q,B,X),k&&q.isNodeMaterial&&k.onUpdateProgram(q,Jt,Ce));let Xs=!1,di=!1,Ai=!1;const ot=Jt.getUniforms(),$t=Ce.uniforms;if(fe.useProgram(Jt.program)&&(Xs=!0,di=!0,Ai=!0),q.id!==W&&(W=q.id,di=!0),Xs||te!==S){fe.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),ot.setValue(G,"projectionMatrix",S.projectionMatrix),ot.setValue(G,"viewMatrix",S.matrixWorldInverse);const Ht=ot.map.cameraPosition;Ht!==void 0&&Ht.setValue(G,yn.setFromMatrixPosition(S.matrixWorld)),xt.logarithmicDepthBuffer&&ot.setValue(G,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&ot.setValue(G,"isOrthographic",S.isOrthographicCamera===!0),te!==S&&(te=S,di=!0,Ai=!0)}if(Ce.needsLights&&(an.state.sunShadowMap.length>0&&ot.setValue(G,"sunShadowMap",an.state.sunShadowMap,Be),an.state.directionalShadowMap.length>0&&ot.setValue(G,"directionalShadowMap",an.state.directionalShadowMap,Be),an.state.spotShadowMap.length>0&&ot.setValue(G,"spotShadowMap",an.state.spotShadowMap,Be),an.state.pointShadowMap.length>0&&ot.setValue(G,"pointShadowMap",an.state.pointShadowMap,Be)),X.isSkinnedMesh){ot.setOptional(G,X,"bindMatrix"),ot.setOptional(G,X,"bindMatrixInverse");const At=X.skeleton;At&&(At.boneTexture===null&&At.computeBoneTexture(),ot.setValue(G,"boneTexture",At.boneTexture,Be))}X.isBatchedMesh&&(ot.setOptional(G,X,"batchingTexture"),ot.setValue(G,"batchingTexture",X._matricesTexture,Be),ot.setOptional(G,X,"batchingIdTexture"),ot.setValue(G,"batchingIdTexture",X._indirectTexture,Be),ot.setOptional(G,X,"batchingColorTexture"),X._colorsTexture!==null&&ot.setValue(G,"batchingColorTexture",X._colorsTexture,Be));const An=Q.morphAttributes;if((An.position!==void 0||An.normal!==void 0||An.color!==void 0)&&ie.update(X,Q,Jt),(di||Ce.receiveShadow!==X.receiveShadow)&&(Ce.receiveShadow=X.receiveShadow,ot.setValue(G,"receiveShadow",X.receiveShadow)),(q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial)&&q.envMap===null&&B.environment!==null&&($t.envMapIntensity.value=B.environmentIntensity),$t.dfgLUT!==void 0&&($t.dfgLUT.value=lg()),di){if(ot.setValue(G,"toneMappingExposure",I.toneMappingExposure),Ce.needsLights&&Xd($t,Ai),pe&&q.fog===!0&&J.refreshFogUniforms($t,pe),J.refreshMaterialUniforms($t,q,ve,Ae,T.state.transmissionRenderTarget[S.id]),Ce.needsLights&&Ce.numLightProbeGrids>0){const At=_;let Ht=0;for(const Kn of T.state.lightProbeGridArray)Kn.texture!==null&&(At.textures[Ht]=Kn.texture,At.min[Ht]=Kn.boundingBox.min,At.max[Ht]=Kn.boundingBox.max,At.resolution[Ht]=Kn.resolution,Ht++);for(const Kn in At)At[Kn].length=Ht;$t.probesSH.value=At.textures,$t.probesMin.value=At.min,$t.probesMax.value=At.max,$t.probesResolution.value=At.resolution}Ua.upload(G,pl(Ce),$t,Be)}if(q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(Ua.upload(G,pl(Ce),$t,Be),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&ot.setValue(G,"center",X.center),ot.setValue(G,"modelViewMatrix",X.modelViewMatrix),ot.setValue(G,"normalMatrix",X.normalMatrix),ot.setValue(G,"modelMatrix",X.matrixWorld),q.uniformsGroups!==void 0){const At=q.uniformsGroups;for(let Ht=0,Kn=At.length;Ht<Kn;Ht++){const vl=At[Ht];De.update(vl,Jt),De.bind(vl,Jt)}}return Jt}function Xd(S,B){S.ambientLightColor.needsUpdate=B,S.lightProbe.needsUpdate=B,S.sunLights.needsUpdate=B,S.sunLightShadows.needsUpdate=B,S.directionalLights.needsUpdate=B,S.directionalLightShadows.needsUpdate=B,S.pointLights.needsUpdate=B,S.pointLightShadows.needsUpdate=B,S.spotLights.needsUpdate=B,S.spotLightShadows.needsUpdate=B,S.rectAreaLights.needsUpdate=B,S.hemisphereLights.needsUpdate=B}function Yd(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return F},this.getActiveMipmapLevel=function(){return z},this.getRenderTarget=function(){return j},this.setRenderTargetTextures=function(S,B,Q){const q=Ie.get(S);q.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),Ie.get(S.texture).__webglTexture=B,Ie.get(S.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:Q,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,B){const Q=Ie.get(S);Q.__webglFramebuffer=B,Q.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(S,B=0,Q=0){j=S,F=B,z=Q;let q=null,X=!1,pe=!1;if(S){const ue=Ie.get(S);if(ue.__useDefaultFramebuffer!==void 0){fe.bindFramebuffer(G.FRAMEBUFFER,ue.__webglFramebuffer),se.copy(S.viewport),Me.copy(S.scissor),Ue=S.scissorTest,fe.viewport(se),fe.scissor(Me),fe.setScissorTest(Ue),W=-1;return}else if(ue.__webglFramebuffer===void 0)Be.setupRenderTarget(S);else if(ue.__hasExternalTextures)Be.rebindTextures(S,Ie.get(S.texture).__webglTexture,Ie.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const Ye=S.depthTexture;if(ue.__boundDepthTexture!==Ye){if(Ye!==null&&Ie.has(Ye)&&(S.width!==Ye.image.width||S.height!==Ye.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Be.setupDepthRenderbuffer(S)}}const be=S.texture;(be.isData3DTexture||be.isDataArrayTexture||be.isCompressedArrayTexture)&&(pe=!0);const Pe=Ie.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Pe[B])?q=Pe[B][Q]:q=Pe[B],X=!0):S.samples>0&&Be.useMultisampledRTT(S)===!1?q=Ie.get(S).__webglMultisampledFramebuffer:Array.isArray(Pe)?q=Pe[Q]:q=Pe,se.copy(S.viewport),Me.copy(S.scissor),Ue=S.scissorTest}else se.copy(xe).multiplyScalar(ve).floor(),Me.copy(qe).multiplyScalar(ve).floor(),Ue=lt;if(Q!==0&&(q=Z),fe.bindFramebuffer(G.FRAMEBUFFER,q)&&fe.drawBuffers(S,q),fe.viewport(se),fe.scissor(Me),fe.setScissorTest(Ue),X){const ue=Ie.get(S.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+B,ue.__webglTexture,Q)}else if(pe){const ue=B;for(let be=0;be<S.textures.length;be++){const Pe=Ie.get(S.textures[be]);G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0+be,Pe.__webglTexture,Q,ue)}}else if(S!==null&&Q!==0){const ue=Ie.get(S.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,ue.__webglTexture,Q)}W=-1};function gl(S){const B=Ie.get(S);return(B.__readFormat!==S.format||B.__readType!==S.type)&&(B.__readFormat=S.format,B.__readType=S.type,B.__formatReadable=xt.textureFormatReadable(S.format),B.__typeReadable=xt.textureTypeReadable(S.type)),B}this.readRenderTargetPixels=function(S,B,Q,q,X,pe,Te,ue=0){if(!(S&&S.isWebGLRenderTarget)){ct("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let be=Ie.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Te!==void 0&&(be=be[Te],Array.isArray(be)&&(be=be[0])),be){fe.bindFramebuffer(G.FRAMEBUFFER,be);try{const Pe=S.textures[ue],Ye=Pe.format,it=Pe.type;S.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+ue);const Re=gl(Pe);if(Re.__formatReadable===!1){ct("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Re.__typeReadable===!1){ct("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=S.width-q&&Q>=0&&Q<=S.height-X&&G.readPixels(B,Q,q,X,le.convert(Ye),le.convert(it),pe)}finally{const Pe=j!==null?Ie.get(j).__webglFramebuffer:null;fe.bindFramebuffer(G.FRAMEBUFFER,Pe)}}},this.readRenderTargetPixelsAsync=async function(S,B,Q,q,X,pe,Te,ue=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let be=Ie.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Te!==void 0&&(be=be[Te],Array.isArray(be)&&(be=be[0])),be)if(B>=0&&B<=S.width-q&&Q>=0&&Q<=S.height-X){fe.bindFramebuffer(G.FRAMEBUFFER,be);const Pe=S.textures[ue],Ye=Pe.format,it=Pe.type;S.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+ue);const Re=gl(Pe);if(Re.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Re.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const st=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,st),G.bufferData(G.PIXEL_PACK_BUFFER,pe.byteLength,G.STREAM_READ),G.readPixels(B,Q,q,X,le.convert(Ye),le.convert(it),0),G.bindBuffer(G.PIXEL_PACK_BUFFER,null);const Dt=j!==null?Ie.get(j).__webglFramebuffer:null;fe.bindFramebuffer(G.FRAMEBUFFER,Dt);const bt=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await Rh(G,bt,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,st),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,pe),G.bindBuffer(G.PIXEL_PACK_BUFFER,null),G.deleteBuffer(st),G.deleteSync(bt),pe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,B=null,Q=0){const q=Math.pow(2,-Q),X=Math.floor(S.image.width*q),pe=Math.floor(S.image.height*q),Te=B!==null?B.x:0,ue=B!==null?B.y:0;Be.setTexture2D(S,0),G.copyTexSubImage2D(G.TEXTURE_2D,Q,0,0,Te,ue,X,pe),fe.unbindTexture()},this.copyTextureToTexture=function(S,B,Q=null,q=null,X=0,pe=0){let Te,ue,be,Pe,Ye,it,Re,st,Dt;const bt=S.isCompressedTexture?S.mipmaps[pe]:S.image;if(Q!==null)Te=Q.max.x-Q.min.x,ue=Q.max.y-Q.min.y,be=Q.isBox3?Q.max.z-Q.min.z:1,Pe=Q.min.x,Ye=Q.min.y,it=Q.isBox3?Q.min.z:0;else{const ot=Math.pow(2,-X);Te=Math.floor(bt.width*ot),ue=Math.floor(bt.height*ot),S.isDataArrayTexture?be=bt.depth:S.isData3DTexture?be=Math.floor(bt.depth*ot):be=1,Pe=0,Ye=0,it=0}q!==null?(Re=q.x,st=q.y,Dt=q.z):(Re=0,st=0,Dt=0);const yt=le.convert(B.format),Zt=le.convert(B.type);let Ce;B.isData3DTexture?(Be.setTexture3D(B,0),Ce=G.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(Be.setTexture2DArray(B,0),Ce=G.TEXTURE_2D_ARRAY):(Be.setTexture2D(B,0),Ce=G.TEXTURE_2D),fe.activeTexture(G.TEXTURE0),fe.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,B.flipY),fe.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),fe.pixelStorei(G.UNPACK_ALIGNMENT,B.unpackAlignment);const an=fe.getParameter(G.UNPACK_ROW_LENGTH),dt=fe.getParameter(G.UNPACK_IMAGE_HEIGHT),Ti=fe.getParameter(G.UNPACK_SKIP_PIXELS),Jt=fe.getParameter(G.UNPACK_SKIP_ROWS),Xs=fe.getParameter(G.UNPACK_SKIP_IMAGES);fe.pixelStorei(G.UNPACK_ROW_LENGTH,bt.width),fe.pixelStorei(G.UNPACK_IMAGE_HEIGHT,bt.height),fe.pixelStorei(G.UNPACK_SKIP_PIXELS,Pe),fe.pixelStorei(G.UNPACK_SKIP_ROWS,Ye),fe.pixelStorei(G.UNPACK_SKIP_IMAGES,it);const di=S.isDataArrayTexture||S.isData3DTexture,Ai=B.isDataArrayTexture||B.isData3DTexture;if(S.isDepthTexture){const ot=Ie.get(S),$t=Ie.get(B),An=Ie.get(ot.__renderTarget),At=Ie.get($t.__renderTarget);fe.bindFramebuffer(G.READ_FRAMEBUFFER,An.__webglFramebuffer),fe.bindFramebuffer(G.DRAW_FRAMEBUFFER,At.__webglFramebuffer);for(let Ht=0;Ht<be;Ht++)di&&(G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Ie.get(S).__webglTexture,X,it+Ht),G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Ie.get(B).__webglTexture,pe,Dt+Ht)),G.blitFramebuffer(Pe,Ye,Pe+Te,Ye+ue,Re,st,Re+Te,st+ue,G.DEPTH_BUFFER_BIT,G.NEAREST);fe.bindFramebuffer(G.READ_FRAMEBUFFER,null),fe.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else if(X!==0||S.isRenderTargetTexture||Ie.has(S)){const ot=Ie.get(S),$t=Ie.get(B);fe.bindFramebuffer(G.READ_FRAMEBUFFER,R),fe.bindFramebuffer(G.DRAW_FRAMEBUFFER,U);for(let An=0;An<be;An++)di?G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,ot.__webglTexture,X,it+An):G.framebufferTexture2D(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,ot.__webglTexture,X),Ai?G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,$t.__webglTexture,pe,Dt+An):G.framebufferTexture2D(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,$t.__webglTexture,pe),X!==0?G.blitFramebuffer(Pe,Ye,Pe+Te,Ye+ue,Re,st,Re+Te,st+ue,G.COLOR_BUFFER_BIT,G.NEAREST):Ai?G.copyTexSubImage3D(Ce,pe,Re,st,Dt+An,Pe,Ye,Te,ue):G.copyTexSubImage2D(Ce,pe,Re,st,Pe,Ye,Te,ue);fe.bindFramebuffer(G.READ_FRAMEBUFFER,null),fe.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else Ai?S.isDataTexture||S.isData3DTexture?G.texSubImage3D(Ce,pe,Re,st,Dt,Te,ue,be,yt,Zt,bt.data):B.isCompressedArrayTexture?G.compressedTexSubImage3D(Ce,pe,Re,st,Dt,Te,ue,be,yt,bt.data):G.texSubImage3D(Ce,pe,Re,st,Dt,Te,ue,be,yt,Zt,bt):S.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,pe,Re,st,Te,ue,yt,Zt,bt.data):S.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,pe,Re,st,bt.width,bt.height,yt,bt.data):G.texSubImage2D(G.TEXTURE_2D,pe,Re,st,Te,ue,yt,Zt,bt);fe.pixelStorei(G.UNPACK_ROW_LENGTH,an),fe.pixelStorei(G.UNPACK_IMAGE_HEIGHT,dt),fe.pixelStorei(G.UNPACK_SKIP_PIXELS,Ti),fe.pixelStorei(G.UNPACK_SKIP_ROWS,Jt),fe.pixelStorei(G.UNPACK_SKIP_IMAGES,Xs),pe===0&&B.generateMipmaps===!0&&B.mipmapsAutoUpdate===!0&&G.generateMipmap(Ce),fe.unbindTexture()},this.initRenderTarget=function(S){Ie.get(S).__webglFramebuffer===void 0&&Be.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?Be.setTextureCube(S,0):S.isData3DTexture?Be.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Be.setTexture2DArray(S,0):Be.setTexture2D(S,0),fe.unbindTexture()},this.resetState=function(){F=0,z=0,j=null,fe.reset(),de.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Nn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=at._getDrawingBufferColorSpace(e),t.unpackColorSpace=at._getUnpackColorSpace()}}const Ut={offense:{id:"offense",name:"Offensive",color:"#ff8a6b",rune:"⚔",desc:"Hexes that strike, stagger and overwhelm."},defense:{id:"defense",name:"Defensive",color:"#78b4ff",rune:"⛨",desc:"Wards, shields and the magic that turns a curse aside."},healing:{id:"healing",name:"Healing",color:"#8ef0b0",rune:"✚",desc:"Mending flesh, calming minds, restoring what was lost."},elemental:{id:"elemental",name:"Elemental",color:"#ffd166",rune:"❂",desc:"Fire, frost, storm and water bent to the caster's will."},transformation:{id:"transformation",name:"Transformation",color:"#c79bff",rune:"✦",desc:"Shape, suspend and summon. Magic that changes the nature of things."},forbidden:{id:"forbidden",name:"Forbidden",color:"#ff6f9f",rune:"☾",desc:"The arts they warn you about. Powerful. Hungry. Never quite free."}},Vt={common:{name:"Common",color:"#aaa69a",tier:1,value:1},uncommon:{name:"Uncommon",color:"#8fd18a",tier:2,value:1.9},rare:{name:"Rare",color:"#6fb8ff",tier:3,value:3.6},epic:{name:"Epic",color:"#c395ff",tier:4,value:7},legendary:{name:"Legendary",color:"#ffc96b",tier:5,value:14}},Fn=[{id:"oak",name:"English Oak",rarity:"common",cat:"defense",color:"#6f4b2d",light:"#a2764a",desc:"Sturdy and loyal. The wand of protectors and stubborn, decent people.",pot:8,ctrl:6,harm:8,aether:2,flex:42,mods:{defense:22,healing:8,offense:4},grain:"cross",lore:"Oak wands are said to remember every promise their owner ever made."},{id:"willow",name:"Whispering Willow",rarity:"common",cat:"healing",color:"#9b8061",light:"#cbb28e",desc:"Pale and supple, deeply attuned to grief and recovery.",pot:4,ctrl:10,harm:14,aether:4,flex:74,mods:{healing:26,transformation:8,defense:4},grain:"wave",lore:"Willow wands grow warmer when held by someone who has lost and chosen to heal."},{id:"holly",name:"Holly",rarity:"uncommon",cat:"offense",color:"#4f5b3b",light:"#8b8f5f",desc:"Prickly, precise, and famously difficult. It rewards courage.",pot:14,ctrl:8,harm:2,aether:5,flex:32,mods:{offense:24,defense:10,elemental:5},grain:"knot",lore:"Holly and phoenix feather: a pairing that legend insists is no accident."},{id:"ash",name:"Mountain Ash",rarity:"uncommon",cat:"offense",color:"#ad8d68",light:"#d7bb93",desc:"Springy and quick. A duellist's wood, partial to a bold first strike.",pot:12,ctrl:12,harm:4,aether:3,flex:56,mods:{offense:20,defense:8,elemental:6},grain:"straight",lore:"Ash wands answer hesitation with a shower of sparks."},{id:"hawthorn",name:"Hawthorn",rarity:"uncommon",cat:"elemental",color:"#65503d",light:"#9b8164",desc:"A living knot of weather. Restless, bright and a little dangerous.",pot:12,ctrl:6,harm:4,aether:10,flex:58,mods:{elemental:26,offense:8,transformation:6},grain:"twist",lore:"Hawthorn wands have a habit of conjuring weather to match their owner's mood."},{id:"ebony",name:"Black Ebony",rarity:"rare",cat:"forbidden",color:"#241b22",light:"#5c4552",desc:"Dense, dark and beautiful. It listens closely to the parts of you that whisper.",pot:18,ctrl:9,harm:0,aether:8,flex:22,mods:{forbidden:26,offense:12,transformation:6},grain:"gloss",lore:"Ebony wands are not evil. They are simply unwilling to look away."},{id:"elder",name:"Elder",rarity:"rare",cat:"transformation",color:"#7c6a53",light:"#c0ad91",desc:"Knotted and contrary. Elder chooses the wielder, never the other way around.",pot:10,ctrl:8,harm:6,aether:22,flex:82,mods:{transformation:30,forbidden:10,healing:6},grain:"gnarl",lore:"An elder wand is a promise made in the dark: things will change, and not gently."},{id:"silverlime",name:"Silver Lime",rarity:"rare",cat:"defense",color:"#b6b3a2",light:"#e2ddc8",desc:"Cool, silver-grained timber that steadies a shaking hand.",pot:6,ctrl:20,harm:8,aether:10,flex:64,mods:{defense:24,healing:10,offense:6},grain:"silk",lore:"Silver lime wands are prized by healers and by anyone who must cast while afraid."},{id:"blackthorn",name:"Blackthorn",rarity:"rare",cat:"offense",color:"#3a2f35",light:"#75616d",desc:"A warrior's wood. It has thorns even after it has been cut.",pot:22,ctrl:6,harm:2,aether:6,flex:28,mods:{offense:30,forbidden:12,defense:4},grain:"barb",lore:"Blackthorn wands are handed down through families with interesting histories."},{id:"moonwillow",name:"Moonwillow",rarity:"epic",cat:"healing",color:"#8ea9b5",light:"#d3e7ea",desc:"Driftwood from a tree that only leafs beneath a full moon. Cold, kind, luminous.",pot:10,ctrl:16,harm:24,aether:18,flex:76,mods:{healing:34,defense:12,transformation:8},grain:"moon",lore:"Its sap is the color of a sky just before dawn."},{id:"starfall",name:"Starfall Yew",rarity:"epic",cat:"elemental",color:"#5b4c78",light:"#a392c6",desc:"Yew grown on a meteor scar. It remembers the sky it fell from.",pot:18,ctrl:12,harm:4,aether:26,flex:62,mods:{elemental:30,transformation:12,forbidden:8},grain:"star",lore:"At night, faint constellations move beneath its bark."},{id:"sunwood",name:"Sunwood",rarity:"epic",cat:"offense",color:"#b77c3f",light:"#ffd89a",desc:"Golden heartwood from a tree that flowers for one hour a century.",pot:26,ctrl:8,harm:6,aether:16,flex:46,mods:{offense:26,elemental:18,healing:4},grain:"sun",lore:"A sunwood wand is warm to the touch on the coldest night of the year."},{id:"frostpine",name:"Frostpine",rarity:"epic",cat:"elemental",color:"#799397",light:"#c4e3e2",desc:"Harvested from the highest crag, where the wind is always winter.",pot:14,ctrl:16,harm:10,aether:20,flex:52,mods:{elemental:32,defense:10,control:4},grain:"frost",lore:"Frostpine wands frost over when their owner tells a lie."},{id:"voidbriar",name:"Voidbriar",rarity:"legendary",cat:"forbidden",color:"#1b1630",light:"#7c5fa8",desc:"A black vine from the garden behind the veil. It hums when it tastes magic.",pot:30,ctrl:14,harm:0,aether:28,flex:38,mods:{forbidden:42,transformation:16,offense:12},grain:"void",lore:"No one plants voidbriar. It simply arrives, the night after a wish."},{id:"emberoak",name:"Emberoak",rarity:"legendary",cat:"offense",color:"#7a3e2f",light:"#ff9c63",desc:"Petrified oak from the heart of a volcano, veined with living fire.",pot:32,ctrl:6,harm:8,aether:18,flex:34,mods:{offense:30,elemental:28,defense:6},grain:"ember",lore:"The last legendary Emberoak wand was lost at sea. The sea has been warm ever since."}],On=[{id:"unicorn",name:"Unicorn Hair",rarity:"common",cat:"healing",color:"#e8f2ff",glow:"#cfe4ff",desc:"Gentle, faithful and hard to corrupt. Produces the steadiest magic.",pot:6,ctrl:10,harm:12,aether:8,mods:{healing:26,defense:16,forbidden:-20},trait:"Pure Current",traitDesc:"Healing spells are 20% stronger and curses cost 15% more."},{id:"dragon",name:"Dragon Heartstring",rarity:"uncommon",cat:"offense",color:"#ff7a4a",glow:"#ff5a2a",desc:"The most powerful core for offensive magic. Prone to changing allegiance.",pot:18,ctrl:4,harm:0,aether:6,mods:{offense:26,elemental:10,healing:-8},trait:"Kindled Fury",traitDesc:"Offensive spells deal 15% more damage, but cost 10% more mana."},{id:"phoenix",name:"Phoenix Feather",rarity:"rare",cat:"elemental",color:"#ffbd5e",glow:"#ff9a33",desc:"Rare, independent and capable of the greatest acts of restoration.",pot:12,ctrl:10,harm:18,aether:22,mods:{elemental:20,healing:18,offense:8,forbidden:-6},trait:"Ashes to Dawn",traitDesc:"Once per duel, survive a fatal blow and rekindle with 30% health."},{id:"thunderbird",name:"Thunderbird Feather",rarity:"rare",cat:"elemental",color:"#79ddff",glow:"#42c7ff",desc:"Storm-charged and impatient. Excellent for elemental duelling.",pot:16,ctrl:8,harm:2,aether:16,mods:{elemental:28,offense:10,transformation:4},trait:"Stormstep",traitDesc:"Elemental spells chain to a nearby foe for 30% damage."},{id:"basilisk",name:"Basilisk Fang",rarity:"rare",cat:"forbidden",color:"#6effa0",glow:"#2dff7a",desc:"A sliver of ancient venom. The wand grows colder the longer you hold it.",pot:24,ctrl:4,harm:0,aether:10,mods:{forbidden:32,offense:14,healing:-16},trait:"Venom Remembered",traitDesc:"Forbidden spells apply a stacking poison."},{id:"thestral",name:"Thestral Tail Hair",rarity:"rare",cat:"transformation",color:"#b7a8ff",glow:"#8b73ff",desc:"Only visible to those who have seen death. Shifts the boundary of things.",pot:10,ctrl:14,harm:4,aether:22,mods:{transformation:30,forbidden:12,defense:-4},trait:"Between Places",traitDesc:"Dodges briefly turn you invisible and leave a decoy behind."},{id:"coral",name:"Merfolk Coral",rarity:"uncommon",cat:"healing",color:"#58e0c6",glow:"#2dd6b8",desc:"Harvested from the drowned reefs. Sings when submerged in moonlight.",pot:8,ctrl:12,harm:14,aether:12,mods:{healing:22,defense:14,elemental:8},trait:"Tidal Mercy",traitDesc:"Healing also grants a small regenerating ward."},{id:"chimaera",name:"Chimaera Scale",rarity:"uncommon",cat:"defense",color:"#ffd06e",glow:"#ffb020",desc:"A stubborn, clever core. Its wards hold under enormous pressure.",pot:10,ctrl:10,harm:4,aether:6,mods:{defense:24,offense:10,transformation:4},trait:"Threefold Guard",traitDesc:"Shields absorb 20% more damage and block spell pierces."},{id:"augurey",name:"Augurey Feather",rarity:"epic",cat:"transformation",color:"#9db7ff",glow:"#688fff",desc:"A grey-green feather that hums before rain — and before revelations.",pot:8,ctrl:20,harm:8,aether:24,mods:{transformation:24,defense:16,elemental:10},trait:"Foreknowledge",traitDesc:"The perfect-shield window is doubled and parried spells return empowered."},{id:"wraithglass",name:"Wraithglass",rarity:"legendary",cat:"forbidden",color:"#e79bff",glow:"#d65cff",desc:"A shard of crystallised grief. It contains a small, patient darkness.",pot:26,ctrl:18,harm:-6,aether:32,mods:{forbidden:40,transformation:20,aether:10},trait:"Hollow Chorus",traitDesc:"Spells cost 10% less and echo for 25% damage a moment later."},{id:"moonstoneheart",name:"Moonstone Heart",rarity:"legendary",cat:"defense",color:"#d9f3ff",glow:"#8fdcff",desc:"The crystallised heart of a fallen star. Calm beyond measure.",pot:12,ctrl:26,harm:18,aether:26,mods:{defense:26,healing:22,transformation:12},trait:"Stillwater",traitDesc:"Spell cooldowns are 15% shorter; damage taken while casting is halved."}],Oi=[{id:"moonstone",name:"Moonstone Inlay",rarity:"uncommon",color:"#bfe3ff",desc:"A cool stone set into the grip. Steadies the wand's hum.",price:90,effect:{ctrl:4,harm:6,aether:4},look:"gem"},{id:"dragonbone",name:"Dragonbone Grip",rarity:"uncommon",color:"#e8d6b8",desc:"Carved from a shed scale-bone. It drinks the recoil of big spells.",price:120,effect:{pot:7,ctrl:2},look:"grip"},{id:"phoenixash",name:"Phoenix Ash Polish",rarity:"rare",color:"#ffc98a",desc:"A warm lacquer that rekindles a wand's inner fire.",price:210,effect:{harm:9,aether:7},look:"polish"},{id:"runeetch",name:"Rune Etching",rarity:"rare",color:"#9fe7ff",desc:"Tiny sigils cut along the shaft. Speeds the casting gesture.",price:240,effect:{ctrl:9,aether:3},look:"runes"},{id:"veilthread",name:"Veilthread Wrap",rarity:"rare",color:"#c9a2ff",desc:"A grey thread that isn't quite where it appears to be.",price:280,effect:{pot:4,aether:10},look:"wrap"},{id:"stariron",name:"Stariron Ferrule",rarity:"epic",color:"#c8d8ff",desc:"A ferrule hammered from a fallen star. Focuses raw power.",price:460,effect:{pot:12,ctrl:6},look:"ferrule"},{id:"pearl",name:"Merfolk Pearl",rarity:"epic",color:"#a9fff0",desc:"It remembers the tide. Healing magic pools in its curve.",price:420,effect:{harm:14,ctrl:4},look:"gem"},{id:"emberresin",name:"Ember Resin",rarity:"rare",color:"#ff9860",desc:"Still-warm sap from an Emberoak. Fire magic loves it.",price:300,effect:{pot:6,aether:6},look:"polish"},{id:"voidsalt",name:"Void Salt",rarity:"legendary",color:"#d78aff",desc:"It tastes of the moment before a secret is told.",price:900,effect:{pot:10,ctrl:8,aether:16},look:"runes"},{id:"starlight",name:"Bottled Starlight",rarity:"legendary",color:"#fff3b0",desc:"An hour of clear night sky, stoppered. It makes a wand feel young.",price:1200,effect:{harm:12,aether:18,ctrl:6},look:"gem"}],Ya=[{wood:"holly",core:"phoenix",name:"Emberheart",rarity:"legendary",trait:"Rebirth",traitDesc:"Once per duel, rise from defeat with 30% health and unleash a ring of phoenix fire.",mods:{offense:20,elemental:20,healing:10},lore:"Holly, phoenix feather, and a hand brave enough to hold both."},{wood:"elder",core:"thestral",name:"Veilwalker",rarity:"legendary",trait:"Between Worlds",traitDesc:"Dodging leaves a spectral decoy. Forbidden spells cost 20% less.",mods:{transformation:30,forbidden:20,defense:10},lore:"Elder does not obey. Thestral does not linger. Together they go where they please."},{wood:"starfall",core:"wraithglass",name:"Astral Sovereign",rarity:"legendary",trait:"Starfall",traitDesc:"Spell cooldowns are 20% shorter; every fifth spell calls a meteor strike.",mods:{elemental:26,forbidden:22,transformation:16},lore:"A wand made of a fallen star and a swallowed scream."},{wood:"moonwillow",core:"coral",name:"Tidecaller",rarity:"legendary",trait:"Aegis Tide",traitDesc:"Healing spells also create a shield equal to 50% of the amount healed.",mods:{healing:36,defense:18,elemental:12},lore:"It smells of salt and rain. It has never once been found where it was left."},{wood:"blackthorn",core:"basilisk",name:"Serpent's Kiss",rarity:"legendary",trait:"Coiling Venom",traitDesc:"Forbidden spells poison for 4 seconds; poison stacks up to five times.",mods:{forbidden:32,offense:24,defense:-4},lore:"The thorns grow back when no one is watching."},{wood:"silverlime",core:"augurey",name:"Oracle's Sigh",rarity:"legendary",trait:"Foretold",traitDesc:"Perfect shields last twice as long and reflect 200% of the spell's power.",mods:{defense:32,transformation:18,healing:12},lore:"It is said that the wand knows what you will cast before you decide."},{wood:"sunwood",core:"dragon",name:"Sunforged",rarity:"legendary",trait:"Solar Heart",traitDesc:"Fire spells explode twice. Fire damage heals you for 15%.",mods:{offense:30,elemental:30,healing:8},lore:"The first Sunforged wand was used to light a hearth that has never gone out."},{wood:"frostpine",core:"thunderbird",name:"Stormcaller",rarity:"legendary",trait:"Ride the Storm",traitDesc:"Elemental spells chain twice; dashing leaves a trail of static that slows foes.",mods:{elemental:38,offense:12,transformation:8},lore:"Crag shepherds hang them above doorways to keep the lightning polite."},{wood:"oak",core:"unicorn",name:"Hearthward",rarity:"epic",trait:"Unbroken Promise",traitDesc:"Defensive magic is 30% stronger. While below 30% health, gain 25% damage reduction.",mods:{defense:30,healing:16},lore:"A plain wand. The sort that saves a life and never mentions it."},{wood:"willow",core:"unicorn",name:"Gentle Current",rarity:"epic",trait:"Kind Waters",traitDesc:"Healing spells cleanse debuffs and cost 25% less.",mods:{healing:32,defense:12},lore:"A healer's wand, warm as a hand held in the dark."},{wood:"hawthorn",core:"chimaera",name:"Beastbinder",rarity:"epic",trait:"Wild Allegiance",traitDesc:"Summons last 50% longer and deal 30% more damage.",mods:{transformation:24,defense:18,elemental:12},lore:"It growls, very softly, when a stranger reaches for it."},{wood:"voidbriar",core:"wraithglass",name:"Nightfall",rarity:"legendary",trait:"The Long Dark",traitDesc:"Forbidden magic costs 30% less and deals 25% more. Healing is halved.",mods:{forbidden:48,offense:18,transformation:18,healing:-20},lore:"The last page of the wandmaker's ledger simply reads: DO NOT."},{wood:"emberoak",core:"phoenix",name:"Cinder Crown",rarity:"legendary",trait:"Crowned in Cinders",traitDesc:"Fire spells leave burning crowns on foes; killing a burning foe restores mana.",mods:{offense:32,elemental:30,forbidden:6},lore:"Forged, not grown. It has been warm for four hundred years."},{wood:"moonwillow",core:"moonstoneheart",name:"Mirrormere",rarity:"legendary",trait:"Perfect Reflection",traitDesc:"25% of damage taken is reflected at the attacker. Healing echoes.",mods:{defense:30,healing:24,control:16},lore:"A wand with no shadow of its own."}],en=[{id:"hexbolt",name:"Hex Bolt",cat:"offense",rune:"✦",color:"#ffc97d",mana:5,cd:.6,dmg:11,learn:"starter",desc:"A quick, reliable dart of force. The first spell every student learns.",effect:"projectile"},{id:"stupefy",name:"Stupefy",cat:"offense",rune:"✹",color:"#ff8a6b",mana:16,cd:2.1,dmg:26,learn:"charms1",desc:"A bolt of red light that stuns the target for 1.8 seconds.",effect:"projectile",status:"stun",statusTime:1.8},{id:"expelliarmus",name:"Expelliarmus",cat:"offense",rune:"↯",color:"#ff6b5b",mana:20,cd:6,dmg:14,learn:"charms2",desc:"Disarms a foe, locking their spells away for 4 seconds.",effect:"projectile",status:"disarm",statusTime:4},{id:"depulso",name:"Depulso",cat:"offense",rune:"⇢",color:"#ffd58a",mana:15,cd:3.2,dmg:18,learn:"charms3",desc:"A concussive shove that hurls a foe backwards and interrupts casting.",effect:"projectile",knock:7},{id:"bombarda",name:"Bombarda",cat:"offense",rune:"✸",color:"#ff9d5c",mana:32,cd:7.5,dmg:34,learn:"charms4",desc:"A compressed blast that detonates on impact, striking all nearby foes.",effect:"aoe_bolt",radius:4.5},{id:"salviohexia",name:"Salvio Hexia",cat:"defense",rune:"⛨",color:"#78b4ff",mana:22,cd:11,dmg:0,learn:"dada1",desc:"A shimmering ward that reduces all damage taken by 40% for 6 seconds.",effect:"buff",buff:"ward",time:6},{id:"expectopatronum",name:"Expecto Patronum",cat:"defense",rune:"✧",color:"#b9e8ff",mana:38,cd:15,dmg:26,learn:"dada2",desc:"A silver guardian bursts forth, scattering dark creatures and striking nearby foes.",effect:"burst",radius:5,status:"fear",statusTime:2.5},{id:"protegomaxima",name:"Protego Maxima",cat:"defense",rune:"⊕",color:"#8fd0ff",mana:30,cd:13,dmg:0,learn:"dada3",desc:"A great dome of force. Your shield costs no mana for 5 seconds and reflects projectiles.",effect:"buff",buff:"aegis",time:5},{id:"episkey",name:"Episkey",cat:"healing",rune:"✚",color:"#8ef0b0",mana:22,cd:6,dmg:-30,learn:"heal1",desc:"Knits flesh and settles the mind, restoring 30 health instantly.",effect:"heal",heal:30},{id:"vulnerasanentur",name:"Vulnera Sanentur",cat:"healing",rune:"❦",color:"#9fffc4",mana:36,cd:11,dmg:-52,learn:"heal2",desc:"A slow, singing mending. Restores 52 health over four seconds and cleanses poison.",effect:"hot",heal:52,time:4},{id:"incendio",name:"Incendio",cat:"elemental",rune:"✹",color:"#ff9a3d",mana:25,cd:4.4,dmg:22,learn:"elem1",desc:"A roaring cone of flame that sets foes burning for 3 seconds.",effect:"aoe_bolt",radius:3.8,status:"burn",statusTime:3},{id:"glacius",name:"Glacius",cat:"elemental",rune:"❄",color:"#8ee6ff",mana:20,cd:4,dmg:16,learn:"elem2",desc:"A lance of blue frost that slows the target by 55% for 3 seconds.",effect:"projectile",status:"slow",statusTime:3},{id:"aguamenti",name:"Aguamenti",cat:"elemental",rune:"≋",color:"#6fd7ff",mana:12,cd:2.4,dmg:10,learn:"elem3",desc:"A high-pressure jet of water. Knocks foes back and leaves them soaked.",effect:"beam",knock:5,status:"wet",statusTime:4},{id:"fulgur",name:"Fulgur",cat:"elemental",rune:"↯",color:"#b48cff",mana:34,cd:6.5,dmg:26,learn:"elem4",desc:"A forked bolt of lightning that leaps between up to three foes.",effect:"chain",chains:3},{id:"levicorpus",name:"Levicorpus",cat:"transformation",rune:"☍",color:"#c79bff",mana:26,cd:9,dmg:8,learn:"transfig1",desc:"Hoists a foe into the air by the ankle, suspending them for 2.5 seconds.",effect:"projectile",status:"lift",statusTime:2.5},{id:"serpensortia",name:"Serpensortia",cat:"transformation",rune:"∽",color:"#9fffa8",mana:36,cd:13,dmg:0,learn:"transfig2",desc:"Summons a spectral serpent for 8 seconds that strikes nearby foes.",effect:"summon",time:8},{id:"sectumsempra",name:"Sectumsempra",cat:"forbidden",rune:"☾",color:"#ff6f9f",mana:30,cd:6,dmg:38,learn:"forbid1",desc:"An invisible blade. Deals heavy damage and makes the target bleed for 4 seconds.",effect:"projectile",status:"bleed",statusTime:4},{id:"obliviate",name:"Obliviate",cat:"forbidden",rune:"◌",color:"#e8a4ff",mana:28,cd:10,dmg:18,learn:"forbid2",desc:"Scrambles a foe's concentration, silencing their magic for 5 seconds.",effect:"projectile",status:"silence",statusTime:5},{id:"fiendfyre",name:"Fiendfyre",cat:"forbidden",rune:"⛧",color:"#ff4f8f",mana:55,cd:17,dmg:62,learn:"forbid3",desc:"Cursed flame that devours the arena. Devastating — and hard to call back.",effect:"aoe_self",radius:7.5,status:"burn",statusTime:4}],Ka=[{id:"charms",name:"Charms & Combat",cat:"offense",teacher:"Professor Cassian Reed",desc:"Precision, intent and the confident flick that turns a spell into a strike.",lessons:[{id:"charms1",name:"The Stunning Spell",spell:"stupefy",type:"rune",runes:4,time:18,xp:60,desc:"Learn the red bolt that ends a duel before it begins."},{id:"charms2",name:"Disarming Grace",spell:"expelliarmus",type:"timing",time:16,xp:90,req:{level:2},desc:"The signature spell of every decent duellist."},{id:"charms3",name:"Force & Finesse",spell:"depulso",type:"rune",runes:5,time:18,xp:110,req:{level:3},desc:"A shove with the weight of a decision behind it."},{id:"charms4",name:"The Blasting Curse",spell:"bombarda",type:"timing",time:14,xp:150,req:{level:5,rep:25},desc:"Controlled demolition, taught only after the safety lecture."}]},{id:"dada",name:"Defence Against the Dark Arts",cat:"defense",teacher:"Professor Ysolde Marrow",desc:"The art of standing your ground when the dark comes calling.",lessons:[{id:"dada1",name:"The Shimmering Ward",spell:"salviohexia",type:"timing",time:18,xp:70,desc:"A ward that turns a killing curse into a bad afternoon."},{id:"dada2",name:"A Light in the Dark",spell:"expectopatronum",type:"rune",runes:5,time:20,xp:140,req:{level:4,rep:15},desc:"Happiness, held steady enough to become a guardian."},{id:"dada3",name:"The Great Shield",spell:"protegomaxima",type:"timing",time:15,xp:190,req:{level:7,rep:45},desc:"A dome of will. Nothing enters unless you allow it."}]},{id:"healing",name:"Herbology & Healing",cat:"healing",teacher:"Matron Elowen Bright",desc:"Mercy is a discipline. Learn to mend faster than the world breaks.",lessons:[{id:"heal1",name:"The Mending Word",spell:"episkey",type:"rune",runes:4,time:19,xp:65,desc:"For cuts, bruises and the occasional duelling accident."},{id:"heal2",name:"The Singing Suture",spell:"vulnerasanentur",type:"timing",time:15,xp:130,req:{level:4,rep:15},desc:"An old song that persuades wounds to close."}]},{id:"elemental",name:"Elemental Studies",cat:"elemental",teacher:"Professor Brannoc Ash",desc:"Fire, frost, water and storm. The world's oldest language, spoken loudly.",lessons:[{id:"elem1",name:"First Flame",spell:"incendio",type:"timing",time:18,xp:70,desc:"A flame is a request. Incendio is a demand."},{id:"elem2",name:"The Quiet Frost",spell:"glacius",type:"rune",runes:4,time:18,xp:95,req:{level:2},desc:"Cold is patience made visible."},{id:"elem3",name:"Tide & Torrent",spell:"aguamenti",type:"timing",time:16,xp:110,req:{level:3},desc:"The sea does not argue. It simply arrives."},{id:"elem4",name:"Calling the Storm",spell:"fulgur",type:"rune",runes:6,time:20,xp:175,req:{level:6,rep:40},desc:"Borrow the sky's oldest temper."}]},{id:"transfiguration",name:"Transfiguration",cat:"transformation",teacher:"Professor Wren Hallow",desc:"Change the shape of a thing without changing what it is. Theoretically.",lessons:[{id:"transfig1",name:"The Hanging Charm",spell:"levicorpus",type:"rune",runes:5,time:20,xp:100,req:{level:3},desc:"Ungentle, but undeniably effective."},{id:"transfig2",name:"Of Serpents Made",spell:"serpensortia",type:"timing",time:14,xp:160,req:{level:5,rep:30},desc:"Conjure a serpent with a temper and a short lifespan."}]},{id:"forbidden",name:"The Forbidden Arts",cat:"forbidden",teacher:"The Keeper of the Black Archive",desc:"These pages are chained shut for a reason. You may still choose to read them.",lessons:[{id:"forbid1",name:"The Invisible Blade",spell:"sectumsempra",type:"timing",time:13,xp:180,req:{level:6,rep:55},desc:"A spell invented by someone who did not want to lose."},{id:"forbid2",name:"The Kind Erasure",spell:"obliviate",type:"rune",runes:6,time:18,xp:220,req:{level:8,rep:80},desc:"Mercy, or theft? The spell does not care."},{id:"forbid3",name:"The Hungry Fire",spell:"fiendfyre",type:"timing",time:12,xp:300,req:{level:10,rep:120},desc:"It will burn what you ask. Then it will keep burning."}]}],Uo=[{id:"effigy",name:"Training Effigy",title:"DUELLING CLUB",rank:"Practice",level:1,hp:65,dmg:0,speed:.6,robe:"#8a7a62",accent:"#d8c59b",behavior:"dummy",spells:[],reqRep:0,desc:"Straw, cloth and a little enchantment. It has never once complained.",rewards:{gold:18,xp:40,rep:2},drops:["oak","unicorn"],arena:"training"},{id:"cassia",name:"Cassia Thorne",title:"DUELLING CLUB",rank:"Student",level:2,hp:110,dmg:10,speed:3.1,robe:"#5d426f",accent:"#c9a2ff",behavior:"duelist",spells:["stupefy","hexbolt","protego"],reqRep:0,desc:"Sixth-year. Quick wand, quicker temper. Believes she should have been made club captain.",rewards:{gold:55,xp:90,rep:8},drops:["holly","dragon"],arena:"ring"},{id:"dorian",name:"Dorian Pike",title:"DUELLING CLUB",rank:"Champion",level:4,hp:165,dmg:14,speed:3.5,robe:"#3b4f68",accent:"#78b4ff",behavior:"duelist",spells:["expelliarmus","glacius","hexbolt","protego"],reqRep:12,desc:"Reigning Silver Circle champion. Fights like he is already accepting applause.",rewards:{gold:110,xp:160,rep:16},drops:["silverlime","chimaera"],arena:"ring"},{id:"troll",name:"Mossback Troll",title:"WHISPERWOOD",rank:"Beast",level:5,hp:260,dmg:20,speed:2.3,robe:"#4f5c39",accent:"#96c46b",behavior:"brute",spells:[],reqRep:8,desc:"It has mistaken the forest path for its living room. It is very committed to this.",rewards:{gold:140,xp:190,rep:18},drops:["hawthorn","chimaera","dragonbone"],arena:"grove"},{id:"acolyte",name:"Veiled Acolyte",title:"SUNKEN RUINS",rank:"Dark",level:7,hp:230,dmg:18,speed:3.2,robe:"#2e2840",accent:"#ff6f9f",behavior:"caster",spells:["sectumsempra","hexbolt","glacius","salviohexia"],reqRep:25,desc:"One of the Hollow's readers. They speak in a voice that is not quite their own.",rewards:{gold:180,xp:240,rep:24},drops:["ebony","basilisk"],arena:"ruins"},{id:"warden",name:"The Ruin Warden",title:"SUNKEN RUINS",rank:"Guardian",level:9,hp:360,dmg:24,speed:2.8,robe:"#3d4550",accent:"#9fe7ff",behavior:"guardian",spells:["fulgur","bombarda","protego","levicorpus"],reqRep:45,desc:"The last oath of a drowned city, still standing its watch. It has not been relieved in nine hundred years.",rewards:{gold:340,xp:420,rep:40},drops:["starfall","augurey","runeetch"],arena:"ruins",boss:!0},{id:"crowe",name:"Ignatius Crowe",title:"GRAND DUEL",rank:"Professor",level:11,hp:420,dmg:28,speed:3.4,robe:"#3c2a2a",accent:"#ffb05a",behavior:"master",spells:["bombarda","expelliarmus","incendio","salviohexia","fulgur"],reqRep:60,desc:"Retired duelling master. Came out of retirement specifically to see whether you are worth the trouble.",rewards:{gold:420,xp:560,rep:55},drops:["sunwood","phoenix","stariron"],arena:"ring",boss:!0},{id:"malachar",name:"Malachar the Hollow",title:"THE VEILED SPIRE",rank:"Dark Lord",level:14,hp:700,dmg:34,speed:3,robe:"#171126",accent:"#d65cff",behavior:"boss",spells:["fiendfyre","sectumsempra","fulgur","bombarda","obliviate","protego"],reqRep:95,desc:"He was the finest wandmaker of his age, until he decided that a wand should not have a master. Now he wears a crown of smoke and collects the wands of everyone who disagreed.",rewards:{gold:1400,xp:1800,rep:140},drops:["voidbriar","wraithglass","voidsalt","starlight"],arena:"spire",boss:!0}],Fo=[{id:"silver",name:"The Silver Circle",reqRep:20,desc:"Three rounds. One stage. Everyone watching.",rounds:["cassia","dorian","crowe"],rewards:{gold:500,xp:600,rep:45},badge:"Silver Circle Champion"},{id:"grand",name:"The Grand Invitational",reqRep:70,desc:"The finest wands in the realm, and the people rude enough to use them.",rounds:["dorian","warden","crowe"],rewards:{gold:1e3,xp:1100,rep:80},badge:"Grand Invitational Champion"}],Sa=[{id:"elspeth",name:"Elspeth Wren",initials:"EW",color:"#6b4b8a",budget:[180,380],wants:{cat:"healing",trait:"calm"},line:"I run the infirmary at the academy. I need something that will not flinch when I do."},{id:"barnaby",name:"Barnaby Quill",initials:"BQ",color:"#6f5238",budget:[140,300],wants:{cat:"defense",trait:"steady"},line:"My old wand snapped in a door. A door! I should like one that is harder to break."},{id:"seraphine",name:"Seraphine Voss",initials:"SV",color:"#7a3355",budget:[420,760],wants:{cat:"forbidden",trait:"dark"},line:"Spare me the lecture about the Restricted Section, dear. I have read it."},{id:"tobin",name:"Tobin Marsh",initials:"TM",color:"#395b4b",budget:[110,240],wants:{cat:"elemental",trait:"wild"},line:"I keep the greenhouses. The fanged geraniums are winning. I want an advantage."},{id:"lyra",name:"Lyra Bell",initials:"LB",color:"#4a5a8a",budget:[250,480],wants:{cat:"offense",trait:"bold"},line:"I am trying out for the duelling club. Make me something that ends conversations."},{id:"alder",name:"Alder Greaves",initials:"AG",color:"#5b4b3a",budget:[300,620],wants:{cat:"transformation",trait:"elegant"},line:"I am a tailor. I appreciate a thing that changes shape without losing its line."},{id:"minerva",name:"Minerva Ashby",initials:"MA",color:"#3e4c5e",budget:[600,1100],wants:{cat:"defense",trait:"royal"},line:"The Ministry sends me into rooms full of angry people. I require a wand with manners."},{id:"orie",name:"Orie Fenn",initials:"OF",color:"#6d5a2e",budget:[200,420],wants:{cat:"healing",trait:"warm"},line:"I keep bees. And occasionally, I keep my brother from falling off things."},{id:"lucien",name:"Lucien Dray",initials:"LD",color:"#2f2a3e",budget:[800,1600],wants:{cat:"offense",trait:"dark"},line:"I have a collection of wands. I am told yours are... interesting."},{id:"willa",name:"Willa Thorne",initials:"WT",color:"#6a4b3a",budget:[160,340],wants:{cat:"transformation",trait:"wild"},line:"I am a beast-handler at the reserve. I need something that can say no to a hippogriff."}],os=[{id:"firstwand",name:"The Apprentice's First Wand",giver:"Master Orin Vale",desc:"A wand of your own making is the first signature of a wandmaker. Orin has left the bench and the good wood out for you.",objective:"Craft a wand at your workbench",type:"craft",target:1,rewards:{gold:120,xp:80,rep:5},unlocked:!0},{id:"firstlesson",name:"Lessons in the Old Hall",giver:"Professor Cassian Reed",desc:"Every wand is only half a story. The other half is what you learn to do with it. Attend your first lesson at the Academy.",objective:"Complete any lesson",type:"lesson",target:1,rewards:{gold:100,xp:100,rep:8},unlocked:!0},{id:"firstduel",name:"The Duel in the Ring",giver:"Duel Captain Sable",desc:"Enough theory. The duelling ring has seen better wizards than you and will see worse ones after. Still — a first win is worth something.",objective:"Win a duel",type:"duel",target:1,rewards:{gold:150,xp:180,rep:12},unlocked:!0},{id:"gather",name:"Whispers in the Willowwood",giver:"Master Orin Vale",desc:"Moonwillow is said to grow where the forest forgets itself. Bring back three branches from Whisperwood, and I will show you why it matters.",objective:"Gather 3 Moonwillow branches",type:"collect",item:"moonwillow",target:3,rewards:{gold:180,xp:220,rep:15},unlocked:!0},{id:"customer",name:"A Wand for a Witch",giver:"The Shop Ledger",desc:"The shop has been open three days and made one sale — to Orin, for a penny. Change that.",objective:"Sell a wand to a customer",type:"sell",target:1,rewards:{gold:140,xp:160,rep:10},unlocked:!0},{id:"rudiments",name:"The Four Pillars",giver:"Master Orin Vale",desc:"Potency, control, harmony, aether. A wand is a balance of four hungers. Learn to feel them and they will tell you what they want to be.",objective:"Craft wands with 3 different woods",type:"woodvariety",target:3,rewards:{gold:300,xp:350,rep:20},unlocked:!0},{id:"warden",name:"The Last Oath",giver:"Professor Wren Hallow",desc:"Something still walks the Sunken Ruins. The Wardens of the old city were sworn to guard it even after the sea took it. Their oath has outlived them — and grown teeth.",objective:"Defeat the Ruin Warden",type:"enemy",enemy:"warden",target:1,rewards:{gold:420,xp:500,rep:30},unlocked:!0},{id:"tournament",name:"The Silver Circle",giver:"Duel Captain Sable",desc:"The tournament brackets are chalked up on the board. Cassia has already written her name in the final. Prove her wrong.",objective:"Win the Silver Circle tournament",type:"tournament",target:1,rewards:{gold:700,xp:800,rep:45},unlocked:!0},{id:"legend",name:"A Living Legend",giver:"Master Orin Vale",desc:"There are combinations the old wandmakers whisper about: holly and phoenix, elder and thestral. Craft one. Let the shop have a story worth telling.",objective:"Craft a legendary combination",type:"legendary",target:1,rewards:{gold:900,xp:1e3,rep:60},unlocked:!0},{id:"hollow",name:"The Hollow Crown",giver:"The Keeper of the Black Archive",desc:"Malachar has worn the same wand for forty years and has never once let it choose. End him, and the wands he stole will finally be free.",objective:"Defeat Malachar the Hollow",type:"enemy",enemy:"malachar",target:1,rewards:{gold:1500,xp:2e3,rep:120},unlocked:!0}],Id=[{id:"bench2",name:"Artisan's Bench",icon:"⚒",cost:600,desc:"A proper brass-latched workbench. Wands gain +4 to all stats; +1 material slot.",tier:2},{id:"bench3",name:"Master's Bench",icon:"⚒",cost:1800,desc:"Enchanted tools and a crystal lens. Wands gain +9 to all stats; +1 material slot.",tier:3},{id:"bench4",name:"Legendary Bench",icon:"⚒",cost:4800,desc:"The bench of the old masters, rebuilt. Wands gain +15 to all stats; +1 material slot.",tier:4},{id:"shelf",name:"Enchanted Display Shelf",icon:"◈",cost:900,desc:"Wandering customers arrive more often. +35 galleons after every duel.",tier:1},{id:"advert",name:"Lantern-Lit Signboard",icon:"✦",cost:1400,desc:"A reputation for quality. Customer budgets +25% and richer clients visit.",tier:1},{id:"corevault",name:"Core Vault",icon:"❖",cost:1100,desc:"Preserves rare cores. Rare cores appear more often in the wild.",tier:1},{id:"cauldron",name:"Self-Stirring Cauldron",icon:"⚗",cost:800,desc:"Brews a healing draught between duels. Start every duel at +20 health.",tier:1}],Dd=[{id:"oak",kind:"wood",price:40,qty:2},{id:"willow",kind:"wood",price:45,qty:2},{id:"holly",kind:"wood",price:75,qty:1},{id:"hawthorn",kind:"wood",price:85,qty:1},{id:"silverlime",kind:"wood",price:190,qty:1},{id:"ebony",kind:"wood",price:240,qty:1},{id:"unicorn",kind:"core",price:55,qty:1},{id:"dragon",kind:"core",price:90,qty:1},{id:"chimaera",kind:"core",price:130,qty:1},{id:"thunderbird",kind:"core",price:260,qty:1},{id:"thestral",kind:"core",price:300,qty:1},{id:"augurey",kind:"core",price:480,qty:1},{id:"moonstone",kind:"material",price:90,qty:1},{id:"dragonbone",kind:"material",price:140,qty:1},{id:"runeetch",kind:"material",price:260,qty:1},{id:"phoenixash",kind:"material",price:300,qty:1},{id:"pearl",kind:"material",price:450,qty:1},{id:"starlight",kind:"material",price:1150,qty:1}],li=[{id:"village",name:"Emberfall Village",sub:"Lantern-lit streets and the smell of cedar smoke.",rune:"⌂",color:"#ffc97d",x:0,z:46,r:34,req:0,travel:!0},{id:"academy",name:"Aurelian Academy",sub:"An old castle with newer secrets.",rune:"♜",color:"#c9a2ff",x:-64,z:-44,r:40,req:0,travel:!0},{id:"forest",name:"Whisperwood",sub:"The trees lean in when you speak.",rune:"♣",color:"#96e08a",x:52,z:-36,r:46,req:0,travel:!0},{id:"lake",name:"Mirrormere",sub:"A lake so still it makes the sky nervous.",rune:"≋",color:"#7de6d0",x:52,z:78,r:38,req:0,travel:!0},{id:"ruins",name:"The Sunken Ruins",sub:"A drowned city with its lights still on.",rune:"⚱",color:"#9fe7ff",x:-78,z:82,r:38,req:20,travel:!0},{id:"caverns",name:"Glimmer Caverns",sub:"The dark here has a color.",rune:"◆",color:"#ab8cff",x:104,z:66,r:34,req:50,travel:!0},{id:"crag",name:"Dragon's Crag",sub:"Where the wind goes to sharpen itself.",rune:"⛰",color:"#ffb05a",x:112,z:-88,r:36,req:90,travel:!0},{id:"spire",name:"The Veiled Spire",sub:"It is not on any map. It is on every map, in a place you cannot look at directly.",rune:"☾",color:"#d65cff",x:0,z:-132,r:40,req:150,travel:!0}],Nd=[{id:"firstwand",name:"First Grain",desc:"Craft your first wand",icon:"⚒"},{id:"tenwands",name:"A Proper Workshop",desc:"Craft 10 wands",icon:"❖"},{id:"legend",name:"Legend Forged",desc:"Discover a legendary combination",icon:"✦"},{id:"allcats",name:"The Six Pillars",desc:"Learn a spell of every category",icon:"◈"},{id:"duel1",name:"First Blood (Politely)",desc:"Win your first duel",icon:"⚔"},{id:"duel10",name:"Ring Veteran",desc:"Win 10 duels",icon:"⚔"},{id:"tournament",name:"Silver Circle Champion",desc:"Win a tournament",icon:"♛"},{id:"sale",name:"The Wand Chooses",desc:"Sell a wand to a customer",icon:"◉"},{id:"sales5",name:"Word of Mouth",desc:"Sell 5 wands",icon:"◉"},{id:"gather20",name:"Field Naturalist",desc:"Gather 20 ingredients",icon:"♣"},{id:"boss",name:"The Hollow Falls",desc:"Defeat Malachar",icon:"☾"},{id:"level10",name:"Archmage in the Making",desc:"Reach level 10",icon:"♜"}],Br=[{level:1,name:"Wandmaker's Apprentice"},{level:2,name:"Apprentice of the Arcane"},{level:3,name:"Journeyman Wandmaker"},{level:4,name:"Duellist of the Circle"},{level:5,name:"Wandsmith of Emberfall"},{level:6,name:"Adept of Six Schools"},{level:7,name:"Master Wandmaker"},{level:8,name:"Arcanist of the Old Hall"},{level:9,name:"Grand Duellist"},{level:10,name:"Archmage of Emberfall"},{level:12,name:"Legend of the Vale"},{level:15,name:"The Living Legacy"}],dg={orin:{name:"Master Orin Vale",initials:"OV",color:"#7a5a38",lines:{greet:"Ah, there you are. The shop is yours today — mine is the tea, and the bench is yours. Try not to set either on fire.",craft:"A wand is a conversation between four hungers. Give it a wood that suits your hand, a core that suits your nerve, and it will tell you what it is.",legendary:"Some pairings are not recipes. They are arguments the world has not settled yet. Holly and phoenix. Elder and thestral. If you make one, the shop will never be quiet again.",bye:"The kettle is on. The wand is yours to shape."}},reed:{name:"Professor Cassian Reed",initials:"CR",color:"#4b5d7a",lines:{greet:"The Hall is open. Mind the floating desks — they bite when startled.",teach:"A spell is not a word. It is a decision, made visible. Decide clearly.",bye:"Practice. Precision is just courage with better manners."}},sable:{name:"Duel Captain Sable",initials:"DS",color:"#5b3a3a",lines:{greet:"Ring is open. The wards will catch you. Usually. Sign the slate if you want a match.",duel:"Pick an opponent who frightens you a little. That is where the good spells are.",bye:"Keep your wand up and your temper down."}},keeper:{name:"The Keeper",initials:"☾",color:"#3a2c4a",lines:{greet:"The Black Archive is not a library. It is a locked room with a very long memory.",forbidden:"We do not teach these spells. We simply stop pretending they are not here.",bye:"If it whispers back, close the book."}}},Oo=["A wand is a living thing, or near enough that the difference stops mattering.","The four hungers of a wand: potency, control, harmony, aether. A wandmaker feeds all four and starves none.","Emberfall was built around a wand shop. The village insists this is a coincidence.","The Hollow was once the finest wandmaker of his age. His wands are still looking for him.","Moonwillow grows only where someone has been forgotten kindly.","Thestrals are not omens. They are simply honest.","Every legendary wand has a name. Most of them were named by the wand itself.","The forbidden arts are not forbidden because they do not work."],Ud=s=>Fn.find(e=>e.id===s),Fd=s=>On.find(e=>e.id===s),nr=s=>Oi.find(e=>e.id===s),hg=(s,e)=>Ya.find(t=>t.wood===s&&t.core===e),ug={oak:"Hearthbound",willow:"Whispering",holly:"Thorned",ash:"Quicksilver",hawthorn:"Gale-wrought",ebony:"Duskborn",elder:"Hollow",silverlime:"Silver-veined",blackthorn:"Briar",moonwillow:"Moonlit",starfall:"Starfall",sunwood:"Sunforged",frostpine:"Winterbound",voidbriar:"Void-touched",emberoak:"Cinder"},fg={unicorn:"Mercy",dragon:"Fury",phoenix:"Dawn",thunderbird:"Storm",basilisk:"Venom",thestral:"Veil",coral:"Tide",chimaera:"Guard",augurey:"Omen",wraithglass:"Echo",moonstoneheart:"Stillness"},pg={oak:["steady"],willow:["calm"],holly:["bold"],ash:["bold"],hawthorn:["wild"],ebony:["dark"],elder:["elegant"],silverlime:["royal"],blackthorn:["dark","bold"],moonwillow:["calm","elegant"],starfall:["elegant"],sunwood:["bold","warm"],frostpine:["elegant"],voidbriar:["dark"],emberoak:["bold","wild"]},mg={unicorn:["calm"],dragon:["bold"],phoenix:["warm"],thunderbird:["wild"],basilisk:["dark"],thestral:["elegant","dark"],coral:["warm","calm"],chimaera:["steady"],augurey:["elegant"],wraithglass:["dark"],moonstoneheart:["calm","royal"]},si={1:{name:"Apprentice's Bench",bonus:0,slots:1},2:{name:"Artisan's Bench",bonus:4,slots:2},3:{name:"Master's Bench",bonus:9,slots:3},4:{name:"Legendary Bench",bonus:15,slots:4}},Mn=(s,e,t)=>Math.max(e,Math.min(t,s)),ni=s=>Math.round(s);function Od(s,e,t,n=1){if(t)return"legendary";const i=Vt[s.rarity].tier*.45+Vt[e.rarity].tier*.55,a=Mn(ni(i+(n-1)*.22),1,5);return["common","common","uncommon","rare","epic","legendary"][a]}function ko(s){const e=Ud(s.woodId),t=Fd(s.coreId);if(!e||!t)return null;const n=s.bench||1,i=Mn(Number(s.length)||12,9,15),a=Mn(Number(s.flexibility)||50,0,100),r=(s.materials||[]).map(nr).filter(Boolean),o=hg(e.id,t.id),l=(12-i)*1.7,c=(12-i)*1.1,d=(i-9)*1.6,u=(i-9)*2,h=(50-a)*.085,f=(a-50)*.11,g=(a-50)*.04;let v=22+e.pot+t.pot+l+h+si[n].bonus,m=20+e.ctrl+t.ctrl+c+f+si[n].bonus,p=20+e.harm+t.harm+d+g+si[n].bonus,x=16+e.aether+t.aether+u+si[n].bonus;for(const U of r)v+=U.effect.pot||0,m+=U.effect.ctrl||0,p+=U.effect.harm||0,x+=U.effect.aether||0;const _=((e.id+t.id).split("").reduce((U,F)=>U+F.charCodeAt(0),0)*7+Math.round(i*10)+Math.round(a))%7-3;v+=_*.7,m+=_*.4,p+=_*.3,x+=_*.5,v=Mn(ni(v),8,96),m=Mn(ni(m),8,96),p=Mn(ni(p),8,96),x=Mn(ni(x),8,96);const E={};for(const U of[e.mods,t.mods,o?.mods||{}])for(const[F,z]of Object.entries(U))E[F]=(E[F]||0)+z;const T=Math.round((v+m+p+x)/4),y=Mn(ni(T*.72+gg(e,t,o,n)*8),1,100),b=Od(e,t,o,n),P=ni(70+y*4.2+Vt[b].value*70+r.reduce((U,F)=>U+F.price*.45,0)),I=[...new Set([...pg[e.id]||[],...mg[t.id]||[]])],O=o?.name||`The ${ug[e.id]} ${fg[t.id]}`,k=o?{name:o.trait,desc:o.traitDesc,key:"recipe"}:{name:t.trait,desc:t.traitDesc,key:t.id},Z=Object.entries(E).filter(([U])=>Ut[U]).sort((U,F)=>F[1]-U[1]),R=Z[0]?.[0]||e.cat;return{id:s.id||`w${Date.now().toString(36)}${Math.floor(Math.random()*999)}`,woodId:e.id,coreId:t.id,length:Number(i.toFixed(1)),flexibility:ni(a),materials:r.map(U=>U.id),bench:n,stats:{pot:v,ctrl:m,harm:p,aether:x},mods:E,affinity:Z,topCat:R,rarity:b,quality:y,value:P,name:O,tags:I,trait:k,recipe:o?{...o}:null,craftedAt:Date.now(),bond:0,upgrades:[]}}function gg(s,e,t,n){return t?5:Vt[Od(s,e,null,n)].tier}function vg(s,e){const t=1+(s.mods[e]||0)/100;return Math.max(.55,t)*(1+s.stats.pot/400)}function kd(s,e,t=0){const n=s.wants,i=Math.max(e.mods[n.cat]||0,0),a=Vt[e.rarity].tier,r=e.tags.includes(n.trait);let o=20+i*.85+a*9+e.quality*.28+(r?26:0);o+=Math.min(24,(e.stats.ctrl+e.stats.harm)*.11),o=Math.round(o);const l=Mn(o/100,.2,1.35);let c=ni(e.value*(.55+l*.75)*(1+t));c=Math.min(c,s.budget[1]);const d=c>=s.budget[0]*.55&&o>=44;return{score:o,price:c,accepted:d,tagMatch:r,primary:i,mood:o>=85?"delighted":o>=65?"pleased":o>=44?"considering":"unimpressed"}}function Ec(s,e,t){return s.accepted?s.mood==="delighted"?'Their eyes go wide the moment they take it. "Oh. Oh, this is *mine*. I can hear it." They pay without haggling.':s.mood==="pleased"?'They turn the wand once, twice, and smile. "Yes. Yes, I think this will do nicely."':'They weigh it in their hand, testing the balance. "It will serve. Barely." They count out the coins.':s.primary<10?`"It's a handsome wand," ${t.name.split(" ")[0]} says, "but it has nothing to say about ${Ut[t.wants.cat].name.toLowerCase()} magic. I'll pass."`:s.score<44?`"I'm sorry — it simply doesn't feel like mine." They hand the wand back with polite disappointment.`:`"Not quite. It's close, though. Perhaps another length, or a better core."`}let xg=0;function ir(s,{scale:e=1}={}){if(!s)return"";const t=Ud(s.woodId),n=Fd(s.coreId),i=s.materials.map(nr).filter(Boolean),a=`wg${++xg}`,r=s.length,o=(s.flexibility-50)*.34+(r-12)*3.5,l=508+(r-12)*4,c=218,d=n?.glow||"#ffe0a0",u=t?.color||"#6f4b2d",h=t?.light||"#a2764a",f=P=>i.some(I=>I.look===P),g=i.find(P=>P.look==="wrap")?"#b9a3e8":"#3d2f45",v=`M 116 100 Q 320 ${100+o} ${l} ${100+o*.35}`,m=[0,1,2,3].map(P=>{const I=-3+P*2.2;return`<path d="M 130 ${100+I} Q 320 ${100+o+I} ${l-6} ${100+o*.35+I}" fill="none" stroke="${u}" stroke-opacity="${.24+P*.04}" stroke-width="${.5+P%2*.5}"/>`}).join(""),p=`<circle cx="${l-2}" cy="${104+o*.35}" r="26" fill="url(#${a}glow)" opacity=".8"/>`,x=i.map((P,I)=>P.look==="gem"?`<g transform="translate(${150+I*12},84) rotate(45)"><rect width="7" height="7" fill="${P.color}" stroke="#ffe9b0" stroke-width=".6"/><rect width="7" height="7" fill="url(#${a}shine)" opacity=".6"/></g>`:"").join(""),M=i.some(P=>P.look==="ferrule")||s.rarity==="legendary"?`<rect x="${c-4}" y="${88+o*.16}" width="12" height="24" rx="3" fill="url(#${a}gold)" stroke="#8b6a30" stroke-width=".5"/>`:"",_=f("runes")?[0,1,2,3,4].map(P=>`<text x="${286+P*36}" y="${92+o*.6-P*1.2}" font-size="10" fill="#bdefff" opacity=".85" font-family="serif" transform="rotate(${-6+o*.08} ${286+P*36} 92)">${["ᚦ","ᛉ","ᛟ","ᚱ","ᛏ"][P]}</text>`).join(""):"",E=f("wrap")?`<path d="${v}" fill="none" stroke="#c9a2ff" stroke-width="2.2" stroke-dasharray="2 9" opacity=".8"/>`:"",T=f("polish")||s.rarity==="legendary"?[0,1,2,3].map(P=>`<circle cx="${300+P*52}" cy="${70+P%2*55}" r="${1.3+P%2*.8}" fill="#fff3c0" opacity=".7"><animate attributeName="opacity" values=".15;.9;.15" dur="${2.3+P*.7}s" repeatCount="indefinite"/></circle>`).join(""):"",y=Array.from({length:15},(P,I)=>{const O=126+I*6;return`<line x1="${O}" y1="87" x2="${O-5}" y2="113" stroke="rgba(255,255,255,.13)" stroke-width="1.5"/>`}).join(""),b=i.some(P=>P.look==="grip")?"#cbb08a":g;return`<svg class="wand-svg" viewBox="0 0 560 200" xmlns="http://www.w3.org/2000/svg" style="transform:scale(${e}) rotate(-3deg)">
  <defs>
    <linearGradient id="${a}wood" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${h}"/><stop offset=".42" stop-color="${u}"/><stop offset=".7" stop-color="${u}"/><stop offset="1" stop-color="${Hr(u,-18)}"/>
    </linearGradient>
    <linearGradient id="${a}leather" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${Hr(b,24)}"/><stop offset="1" stop-color="${Hr(b,-26)}"/>
    </linearGradient>
    <linearGradient id="${a}gold" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#ffe6a6"/><stop offset=".5" stop-color="#c79a4c"/><stop offset="1" stop-color="#7d5a24"/>
    </linearGradient>
    <radialGradient id="${a}glow"><stop offset="0" stop-color="${d}" stop-opacity=".95"/><stop offset=".45" stop-color="${d}" stop-opacity=".38"/><stop offset="1" stop-color="${d}" stop-opacity="0"/></radialGradient>
    <radialGradient id="${a}shine"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
    <filter id="${a}blur"><feGaussianBlur stdDeviation="9"/></filter>
  </defs>
  <ellipse cx="320" cy="158" rx="190" ry="13" fill="#000" opacity=".3" filter="url(#${a}blur)"/>
  ${p}
  <circle cx="112" cy="100" r="9" fill="url(#${a}gold)" stroke="#6d4f23" stroke-width=".8"/>
  <path d="${v}" fill="none" stroke="url(#${a}wood)" stroke-width="13" stroke-linecap="round"/>
  <path d="${v}" fill="none" stroke="#fff" stroke-opacity=".13" stroke-width="2.4" transform="translate(0,-4)"/>
  ${m}
  <path d="M 118 91 Q 172 ${91+o*.08} 220 ${93+o*.12} L 220 ${109+o*.12} Q 172 ${107+o*.08} 118 109 Z" fill="url(#${a}leather)" stroke="#1a1220" stroke-width=".8"/>
  ${y}
  ${x}
  ${M}
  ${E}
  ${_}
  <path d="${v}" fill="none" stroke="${d}" stroke-width="1.6" opacity=".22"/>
  ${T}
  <circle cx="${l-4}" cy="${104+o*.35}" r="8" fill="${d}" opacity=".85" filter="url(#${a}blur)"/>
  <circle cx="${l-4}" cy="${104+o*.35}" r="3" fill="#fff" opacity=".95"/>
  </svg>`}function Hr(s,e){if(!s?.startsWith("#"))return s;const t=parseInt(s.slice(1),16),n=Mn((t>>16&255)+e*2.55,0,255),i=Mn((t>>8&255)+e*2.55,0,255),a=Mn((t&255)+e*2.55,0,255);return`#${((1<<24)+(Math.round(n)<<16)+(Math.round(i)<<8)+Math.round(a)).toString(16).slice(1)}`}const Ea="wandlore.save.v1";function Gr(s){return 80+s*70}class yg{constructor(){this.listeners={},this.state=null}on(e,t){return(this.listeners[e]||=[]).push(t),()=>{this.listeners[e]=this.listeners[e].filter(n=>n!==t)}}emit(e,t){for(const n of this.listeners[e]||[])try{n(t)}catch(i){console.error(i)}}hasSave(){try{return!!localStorage.getItem(Ea)}catch{return!1}}newGame(e="Rowan Ashford"){const t=ko({woodId:"oak",coreId:"unicorn",length:11.5,flexibility:48,materials:[],bench:1,id:"starter-wand"});return t.name="Apprentice's Oak",t.starter=!0,t.trait={name:"First Hand",desc:"A plain, faithful wand. Every legend starts somewhere.",key:"starter"},this.state={version:1,name:e.trim()||"Rowan Ashford",level:1,xp:0,gold:260,rep:0,hp:100,mp:100,wands:[t],equipped:t.id,inventory:{woods:{oak:3,willow:2,holly:2,ash:1,hawthorn:1},cores:{unicorn:2,dragon:2,chimaera:1},materials:{moonstone:1,dragonbone:1}},known:{hexbolt:0},loadout:["hexbolt"],lessons:{},quests:Object.fromEntries(os.map(n=>[n.id,{progress:0,done:!1}])),achievements:[],stats:{wandsCrafted:0,wandsSold:0,duelsWon:0,duelsLost:0,ingredients:0,tournaments:0,bosses:0,totalXp:0,spellsCast:0,goldEarned:0},gathered:{},craftedWoods:[],defeated:{},discovered:{recipes:[],woods:["oak"],cores:["unicorn"],spells:["hexbolt"]},upgrades:{bench:1,shelf:!1,advert:!1,corevault:!1,cauldron:!1},customers:[],badges:[],discoveredZones:["village","academy"],settings:{sound:!0},title:Br[0].name,createdAt:Date.now(),lastSaved:Date.now(),playTime:0,flags:{introSeen:!1,tutorialCraft:!1,tutorialDuel:!1,tutorialLesson:!1}},this.refreshCustomers(),this.save(),this.emit("newgame"),this.emit("change"),this.state}load(){try{const e=localStorage.getItem(Ea);if(!e)return!1;const t=JSON.parse(e);return!t||!t.wands?!1:(this.state=t,this.state.settings||={sound:!0},this.state.discovered||={recipes:[],woods:[],cores:[],spells:[]},this.state.stats||={},this.state.flags||={},this.state.gathered||={},this.state.craftedWoods||=[],this.state.defeated||={},this.state.customers||=[],this.state.customers.length||this.refreshCustomers(),!0)}catch(e){return console.error("Load failed",e),!1}}save(){if(this.state)try{this.state.lastSaved=Date.now(),localStorage.setItem(Ea,JSON.stringify(this.state)),this.emit("saved")}catch(e){console.warn("Save failed",e)}}reset(){try{localStorage.removeItem(Ea)}catch{}this.emit("reset")}get s(){return this.state}get wand(){return this.s.wands.find(e=>e.id===this.s.equipped)||this.s.wands[0]}get bench(){return si[this.s.upgrades.bench]||si[1]}get materialSlots(){return this.bench.slots}xpToNext(){return Gr(this.s.level)}addXp(e,t=!1){if(!e)return;const n=this.s;n.xp+=e,n.stats.totalXp=(n.stats.totalXp||0)+e;let i=0;for(;n.xp>=Gr(n.level);)n.xp-=Gr(n.level),n.level++,i++;return i&&(n.hp=100+(n.level-1)*6,n.mp=100+(n.level-1)*4,n.title=[...Br].reverse().find(a=>n.level>=a.level)?.name||Br[0].name,this.checkAchievements(),this.emit("levelup",{level:n.level,title:n.title})),t||this.emit("change"),i}addGold(e,t=!1){this.s.gold=Math.max(0,this.s.gold+e),e>0&&(this.s.stats.goldEarned=(this.s.stats.goldEarned||0)+e),t||this.emit("change")}addRep(e){this.s.rep=Math.max(0,this.s.rep+e),this.emit("change")}maxHp(){return 100+(this.s.level-1)*6}maxMp(){return 100+(this.s.level-1)*4}addItem(e,t,n=1){const i=this.s;i.inventory[e]||={},i.inventory[e][t]=(i.inventory[e][t]||0)+n,e==="woods"&&(i.discovered.woods=[...new Set([...i.discovered.woods,t])]),e==="cores"&&(i.discovered.cores=[...new Set([...i.discovered.cores,t])]),e!=="materials"&&(i.gathered[t]=(i.gathered[t]||0)+n),i.stats.ingredients=(i.stats.ingredients||0)+n,this.emit("item",{kind:e,id:t,qty:n}),this.emit("change")}removeItem(e,t,n=1){const i=this.s.inventory[e];return!i||(i[t]||0)<n?!1:(i[t]-=n,i[t]<=0&&delete i[t],this.emit("change"),!0)}countItem(e,t){return this.s.inventory[e]?.[t]||0}craft(e){const t=this.s,{woodId:n,coreId:i,length:a,flexibility:r,materials:o=[]}=e;if(!this.countItem("woods",n))return{ok:!1,msg:"You have no wood of that kind."};if(!this.countItem("cores",i))return{ok:!1,msg:"You have no core of that kind."};if(o.length>this.materialSlots)return{ok:!1,msg:"Your bench cannot hold that many materials."};for(const d of o)if(!this.countItem("materials",d))return{ok:!1,msg:`No ${nr(d)?.name||"material"} left.`};const l=ko({woodId:n,coreId:i,length:a,flexibility:r,materials:o,bench:t.upgrades.bench});if(!l)return{ok:!1,msg:"The wand refuses to take shape."};this.removeItem("woods",n),this.removeItem("cores",i);for(const d of o)this.removeItem("materials",d);t.wands.push(l),t.stats.wandsCrafted++,t.craftedWoods=[...new Set([...t.craftedWoods,n])],t.discovered.woods=[...new Set([...t.discovered.woods,n])],t.discovered.cores=[...new Set([...t.discovered.cores,i])];let c=!1;return l.recipe&&(t.discovered.recipes.includes(l.recipe.name)||(t.discovered.recipes.push(l.recipe.name),c=!0)),this.progressQuest("craft",1,{wand:l}),this.progressQuest("woodvariety",1,{unique:t.craftedWoods.length}),l.recipe&&this.progressQuest("legendary",1),this.checkAchievements(),this.save(),this.emit("crafted",{wand:l,isNewRecipe:c}),this.emit("change"),{ok:!0,wand:l,isNewRecipe:c}}equip(e){this.s.wands.some(t=>t.id===e)&&(this.s.equipped=e,this.save(),this.emit("equipped",this.wand),this.emit("change"))}sell(e,t){const n=this.s,i=n.wands.findIndex(c=>c.id===e);if(i<0)return{ok:!1,msg:"That wand is not in your collection."};if(n.wands.length<=1)return{ok:!1,msg:"You cannot sell your last wand."};const a=n.customers.find(c=>c.id===t);if(!a)return{ok:!1,msg:"That customer has already left."};const r=n.wands[i];if(r.id===n.equipped)return{ok:!1,msg:"Equip another wand before selling this one."};const o=kd(a,r,n.upgrades.advert?.1:0);if(!o.accepted)return this.emit("sale",{ok:!1,wand:r,customer:a,eval:o}),{ok:!1,eval:o,msg:"The customer declined."};const l=Math.min(a.budget[1],Math.round(o.price));return n.wands.splice(i,1),this.addGold(l,!0),this.addXp(Math.round(30+o.score*.9),!0),this.addRep(4),n.stats.wandsSold++,this.progressQuest("sell",1),this.checkAchievements(),this.replaceCustomer(t),this.save(),this.emit("sale",{ok:!0,price:l,wand:r,customer:a,eval:o}),this.emit("change"),{ok:!0,price:l,eval:o}}buyMarket(e){const t=Dd.find(i=>i.id===e);if(!t)return!1;if(this.s.gold<t.price)return this.emit("toast",{title:"Not enough galleons",text:"The shopkeeper smiles apologetically."}),!1;this.addGold(-t.price,!0);const n=t.kind==="wood"?"woods":t.kind==="core"?"cores":"materials";return this.addItem(n,t.id,t.qty),this.save(),this.emit("change"),!0}buyUpgrade(e){const t=Id.find(i=>i.id===e);if(!t)return!1;const n=this.s;if(e.startsWith("bench")){if(n.upgrades.bench>=t.tier)return!1;if(n.gold<t.cost)return this.emit("toast",{title:"Not enough galleons",text:"You need a few more sales."}),!1;this.addGold(-t.cost,!0),n.upgrades.bench=t.tier,this.emit("toast",{title:"Workbench upgraded",text:t.name+" — wands gain +"+si[t.tier].bonus+" to all stats."})}else{if(n.upgrades[e])return!1;if(n.gold<t.cost)return this.emit("toast",{title:"Not enough galleons",text:"You need a few more sales."}),!1;this.addGold(-t.cost,!0),n.upgrades[e]=!0,this.emit("toast",{title:"Shop upgraded",text:t.desc})}return this.save(),this.emit("change"),!0}refreshCustomers(){const e=this.s,n=[...Sa.filter(i=>i.id==="lucien"?e.rep>=60:i.id==="minerva"?e.rep>=40:!0)].sort(()=>Math.random()-.5).slice(0,3);e.customers=n.map(i=>{const a=1+e.rep/240+(e.upgrades.advert?.25:0);return{id:i.id,budget:[Math.round(i.budget[0]*a),Math.round(i.budget[1]*a)],wants:i.wants,served:!1}})}replaceCustomer(e){const t=this.s;t.customers.find(d=>d.id===e);const n=new Set(t.customers.map(d=>d.id));if(!Sa.find(d=>d.id===e))return;const a=Sa.filter(d=>!n.has(d.id)&&(d.id!=="lucien"||t.rep>=60)&&(d.id!=="minerva"||t.rep>=40));if(!a.length)return;const r=a[Math.floor(Math.random()*a.length)],o=1+t.rep/240+(t.upgrades.advert?.25:0),l={id:r.id,budget:[Math.round(r.budget[0]*o),Math.round(r.budget[1]*o)],wants:r.wants,served:!1},c=t.customers.findIndex(d=>d.id===e);c>=0&&(t.customers[c]=l)}getCustomerInfo(e){return Sa.find(t=>t.id===e.id)}gainIngredient(e,t){this.addItem(e,t,1),this.progressQuest("collect",1,{item:t}),this.checkAchievements()}learnSpell(e){const t=this.s;if(t.known[e]!==void 0)return!1;t.known[e]=0,t.discovered.spells=[...new Set([...t.discovered.spells,e])],t.loadout.length<6&&t.loadout.push(e);const n=en.find(i=>i.id===e);return this.addXp(30,!0),this.checkAchievements(),this.save(),this.emit("spelllearned",n),this.emit("change"),!0}completeLesson(e){const t=this.s;if(t.lessons[e])return null;let n=null,i=null;for(const a of Ka){const r=a.lessons.find(o=>o.id===e);if(r){n=r,i=a;break}}return n?(t.lessons[e]=!0,this.learnSpell(n.spell),this.addXp(n.xp,!0),this.addRep(3),this.progressQuest("lesson",1),this.checkAchievements(),this.save(),this.emit("lessoncomplete",{lesson:n,track:i}),this.emit("change"),n):null}addMastery(e,t=1){const n=this.s;n.known[e]!==void 0&&(n.known[e]=Math.min(100,n.known[e]+t),n.stats.spellsCast=(n.stats.spellsCast||0)+1)}masteryRank(e){const t=this.s.known[e]??0;return t>=100?{name:"Mastered",level:4,mult:1.35}:t>=60?{name:"Adept",level:3,mult:1.22}:t>=25?{name:"Practised",level:2,mult:1.1}:{name:"Learned",level:1,mult:1}}setLoadout(e,t){const n=this.s;if(n.known[e]!==void 0){if(t){if(n.loadout.includes(e))return;if(n.loadout.length>=6){this.emit("toast",{title:"Spell bar full",text:"Unequip another spell first (six slots)."});return}n.loadout.push(e)}else n.loadout=n.loadout.filter(i=>i!==e);this.save(),this.emit("change")}}questById(e){return os.find(t=>t.id===e)}progressQuest(e,t=1,n={}){const i=this.s;let a=[];for(const r of os){const o=i.quests[r.id];if(!o||o.done||r.type!==e||r.type==="enemy"&&n.enemyId&&n.enemyId!==r.enemy||r.type==="collect"&&n.item&&n.item!==r.item)continue;let l=o.progress;r.type==="woodvariety"?l=Math.min(r.target,n.unique??o.progress):l=Math.min(r.target,o.progress+t),l!==o.progress&&(o.progress=l,o.progress>=r.target&&(o.done=!0,a.push(r),this.grantQuestRewards(r)))}return a.length&&this.emit("change"),a}grantQuestRewards(e){this.s.gold+=e.rewards.gold,this.s.stats.goldEarned=(this.s.stats.goldEarned||0)+e.rewards.gold,this.s.rep+=e.rewards.rep,this.addXp(e.rewards.xp,!0),this.emit("questcomplete",e),this.emit("change")}activeQuest(){const e=this.s;for(const t of os){const n=e.quests[t.id];if(n&&!n.done)return t}return null}questState(e){return this.s.quests[e.id]||{progress:0,done:!1}}recordDuel({enemy:e,won:t,prize:n}){const i=this.s;if(t){i.stats.duelsWon++,this.progressQuest("duel",1),e.boss&&(i.stats.bosses++,n?.boss&&(i.badges=[...new Set([...i.badges,e.name])])),this.progressQuest("enemy",1,{enemyId:e.id}),i.defeated[e.id]=(i.defeated[e.id]||0)+1;const a=i.upgrades.shelf?35:0;this.addGold((e.rewards.gold||0)+a,!0),this.addXp(e.rewards.xp||0,!0),this.addRep(e.rewards.rep||0);for(const r of e.drops||[])this.grantRandomDrop(r);this.checkAchievements()}else i.stats.duelsLost++;this.save(),this.emit("change")}grantRandomDrop(e){const t=Fn.find(a=>a.id===e),n=On.find(a=>a.id===e),i=Oi.find(a=>a.id===e);t?this.addItem("woods",e,1):n?this.addItem("cores",e,1):i&&this.addItem("materials",e,1)}recordTournament(e,t){t&&(this.s.stats.tournaments++,this.progressQuest("tournament",1),this.s.badges.includes("Silver Circle Champion")||this.s.badges.push("Silver Circle Champion"),this.checkAchievements(),this.save(),this.emit("change"))}unlockZone(e){const t=li.find(n=>n.id===e);return!t||this.s.rep<t.req?!1:(this.s.discoveredZones.includes(e)||(this.s.discoveredZones.push(e),this.emit("toast",{title:"New location",text:t.name+" is now open to you."}),this.emit("change"),this.save()),!0)}checkAchievements(){const e=this.s,t=i=>{if(e.achievements.includes(i))return;e.achievements.push(i);const a=Nd.find(r=>r.id===i);a&&this.emit("achievement",a)};e.stats.wandsCrafted>=1&&t("firstwand"),e.stats.wandsCrafted>=10&&t("tenwands"),e.discovered.recipes.length>=1&&t("legend"),new Set(Object.keys(e.known).map(i=>en.find(a=>a.id===i)?.cat).filter(Boolean)).size>=6&&t("allcats"),e.stats.duelsWon>=1&&t("duel1"),e.stats.duelsWon>=10&&t("duel10"),e.stats.tournaments>=1&&t("tournament"),e.stats.wandsSold>=1&&t("sale"),e.stats.wandsSold>=5&&t("sales5"),e.stats.ingredients>=20&&t("gather20"),e.stats.bosses>=1&&e.defeated.malachar&&t("boss"),e.level>=10&&t("level10")}displayTitle(){return this.s.defeated?.malachar?"The Hollow Breaker":this.s.badges.includes("Silver Circle Champion")&&this.s.level>=6?"Champion of the Silver Circle":this.s.title}discoveredWandStats(){const e=this.s;return{woods:Fn.filter(t=>e.discovered.woods.includes(t.id)).length,woodsTotal:Fn.length,cores:On.filter(t=>e.discovered.cores.includes(t.id)).length,coresTotal:On.length,recipes:e.discovered.recipes.length,recipesTotal:Ya.length,spells:Object.keys(e.known).length,spellsTotal:en.length}}}const Se=new yg,un={robe:new ht(.27,.56,1.16,10,1,!1),torso:new ht(.24,.32,.52,10),head:new Mt(.225,18,14),hair:new Mt(.235,14,10),hatCone:new Ct(.33,.52,14),hatBrim:new ht(.44,.44,.035,18),arm:new ht(.062,.075,.62,7),hand:new Mt(.075,8,6),foot:new Mt(.11,8,6),wand:new ht(.014,.022,.72,6),gem:new Tn(.055,0),cape:new Ot(.62,.95,5,7)};let Ta;function qt(){if(Ta)return Ta;const s=document.createElement("canvas");s.width=s.height=128;const e=s.getContext("2d"),t=e.createRadialGradient(64,64,0,64,64,64);return t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.18,"rgba(255,240,200,.9)"),t.addColorStop(.45,"rgba(200,160,255,.32)"),t.addColorStop(1,"rgba(120,80,200,0)"),e.fillStyle=t,e.fillRect(0,0,128,128),Ta=new Qo(s),Ta}function _g(s,e="",t="#e9c988"){const n=document.createElement("canvas");n.width=512,n.height=128;const i=n.getContext("2d");i.clearRect(0,0,512,128),i.textAlign="center",i.font="600 30px Cinzel, Georgia, serif",i.fillStyle="rgba(8,5,16,.55)";const a=Math.min(480,i.measureText(s).width+44);i.beginPath(),i.roundRect?i.roundRect(256-a/2,20,a,54,5):i.rect(256-a/2,20,a,54),i.fill(),i.strokeStyle="rgba(233,201,136,.38)",i.lineWidth=1.2,i.stroke(),i.fillStyle=t,i.fillText(s,256,57),e&&(i.font="italic 22px Spectral, Georgia, serif",i.fillStyle="rgba(241,228,200,.6)",i.fillText(e,256,99));const r=new Qo(n);r.colorSpace=ln;const o=new Sn({map:r,transparent:!0,depthWrite:!1,depthTest:!1}),l=new Un(o);return l.scale.set(3.4,.85,1),l.userData.isPlate=!0,l}function Za(s={}){const{robe:e="#3b2d5c",accent:t="#9b7fd4",skin:n="#e6b58d",hair:i="#2a1c22",hat:a=!0,scale:r=1,crown:o=!1,horns:l=!1,name:c="",subtitle:d="",nameColor:u="#e9c988"}=s,h=new Le,f=new Le;h.add(f);const g=new ke({color:e,roughness:.86,metalness:.03}),v=new ke({color:t,roughness:.6,metalness:.18}),m=new ke({color:n,roughness:.8}),p=new ke({color:i,roughness:.9}),x=new ke({color:"#1a1322",roughness:.8});new ke({color:"#d3aa5f",roughness:.35,metalness:.7});const M=new Y(un.robe,g);M.position.y=.68,M.castShadow=!0,f.add(M);const _=new Y(new ht(.565,.575,.06,10),v);_.position.y=.14,f.add(_);const E=new Y(un.torso,v);E.position.y=1.17,f.add(E);const T=new Y(new ht(.235,.28,.3,10),g);T.position.y=1.32,f.add(T);const y=new Y(un.head,m);y.position.y=1.61,y.castShadow=!0,f.add(y);const b=new Y(un.hair,p);b.position.set(0,1.64,-.025),b.scale.set(1.02,.72,1.02),f.add(b);const P=new Y(new Ct(.028,.07,5),m);P.position.set(0,1.59,.22),P.rotation.x=Math.PI/2,f.add(P);for(const me of[-.075,.075]){const ze=new Y(new Mt(.021,6,5),x);ze.position.set(me,1.63,.205),f.add(ze)}if(a){const me=new Y(un.hatCone,g);me.position.y=2.02,me.rotation.z=.13,me.castShadow=!0,f.add(me);const ze=new Y(un.hatBrim,g);ze.position.y=1.79,ze.rotation.z=.1,f.add(ze);const xe=new Y(new ht(.31,.33,.06,14),v);xe.position.set(.02,1.83,0),xe.rotation.z=.1,f.add(xe)}if(o)for(let me=0;me<5;me++){const ze=new Y(new Ct(.04,.17,5),new ke({color:"#2a1b38",emissive:"#a25bff",emissiveIntensity:.8,metalness:.6,roughness:.3})),xe=me/5*Math.PI*2;ze.position.set(Math.cos(xe)*.19,1.86,Math.sin(xe)*.19),f.add(ze)}if(l)for(const me of[-1,1]){const ze=new Y(new Ct(.05,.36,6),x);ze.position.set(.18*me,1.84,-.02),ze.rotation.z=me*-.5,ze.rotation.x=-.15,f.add(ze)}const I=un.cape.clone(),O=new Y(I,new ke({color:e,roughness:.9,side:rt}));O.position.set(0,1.02,-.28),O.rotation.x=-.12,f.add(O);const k=new Y(new Ot(.64,.06),new ke({color:t,side:rt,roughness:.6}));k.position.set(0,.57,.01),O.add(k);const Z=new Le;Z.position.set(-.31,1.43,0);const R=new Y(un.arm,g);R.position.y=-.28,R.rotation.z=.16,Z.add(R);const U=new Y(un.hand,m);U.position.set(-.03,-.6,.02),Z.add(U),f.add(Z);const F=new Le;F.position.set(.31,1.43,0);const z=new Y(un.arm,g);z.position.y=-.28,z.rotation.z=-.16,F.add(z);const j=new Y(un.hand,m);j.position.set(.03,-.6,.03),F.add(j),f.add(F);const W=new Le;W.position.set(.035,-.63,.06),W.rotation.set(-1.35,0,.1);const te=new ke({color:"#6f4b2d",roughness:.6}),se=new Y(un.wand,te);se.position.y=.3,W.add(se);const Me=new wt;Me.position.y=.68,W.add(Me);const Ue=new Un(new Sn({map:qt(),color:"#ffe0a8",transparent:!0,blending:je,depthWrite:!1}));Ue.scale.set(.25,.25,1),Ue.position.y=.7,W.add(Ue);const ne=new Y(new Mt(.035,8,6),new nt({color:"#ffe7b0"}));ne.position.y=.66,W.add(ne),F.add(W);for(const me of[-1,1]){const ze=new Y(un.foot,x);ze.position.set(.14*me,.055,.18),ze.scale.set(1,.55,1.6),f.add(ze)}const ce=new Y(un.gem,new ke({color:t,emissive:t,emissiveIntensity:.5,metalness:.7,roughness:.2}));ce.position.set(0,1.32,.27),ce.scale.set(.7,1,.5),f.add(ce);const we=new Y(new Yt(.52,20),new nt({color:"#06030c",transparent:!0,opacity:.42,depthWrite:!1}));we.rotation.x=-Math.PI/2,we.position.y=.02,h.add(we);let Ae=null;return c&&(Ae=_g(c,d,u),Ae.position.y=2.42,h.add(Ae)),h.scale.setScalar(r),{group:h,body:f,wandGroup:W,tip:Me,plate:Ae,cape:O,head:y,robeMat:g,trimMat:v,wandMat:te,tipGlow:Ue,coreGlow:ne,shadow:we,walkPhase:Math.random()*6.28,castPhase:0,castAnim:0,hitFlash:0,baseRobe:e,update(me,ze=!1,xe=1){this.walkPhase+=me*(ze?7.5*xe:2.1);const qe=this.walkPhase,lt=ze?.5:.05;if(Z.rotation.x=Math.sin(qe)*lt*.7,F.rotation.x=-Math.sin(qe)*lt*.7,f.position.y=ze?Math.abs(Math.sin(qe))*.035:Math.sin(qe*.5)*.008,f.rotation.z=ze?Math.sin(qe)*.02:0,O.rotation.x=-.12-(ze?.16+Math.sin(qe*2)*.04:Math.sin(qe*.5)*.02),y.rotation.y=ze?Math.sin(qe*.5)*.05:Math.sin(qe*.3)*.08,this.castAnim>0){this.castAnim=Math.max(0,this.castAnim-me);const Ge=1-this.castAnim/.45;F.rotation.x=-1.1*Math.sin(Ge*Math.PI),F.rotation.z=-.1}else F.rotation.z=-.05;Ae&&(Ae.position.y=2.42-f.position.y),this.hitFlash>0&&(this.hitFlash=Math.max(0,this.hitFlash-me*3),g.emissive.setRGB(this.hitFlash*.7,.02,.06))},cast(){this.castAnim=.45,this.walkPhase+=.4},getTipWorld(me=new L){return h.updateMatrixWorld(),Ue.getWorldPosition(me)},setWand(me){if(!me)return;const ze={oak:"#6f4b2d",willow:"#9b8061",holly:"#4f5b3b",ash:"#a98d6a",hawthorn:"#65503d",ebony:"#241b22",elder:"#7c6a53",silverlime:"#b6b3a2",blackthorn:"#3a2f35",moonwillow:"#9db9c4",starfall:"#5b4c78",sunwood:"#c08a4b",frostpine:"#8aa8ab",voidbriar:"#251b3e",emberoak:"#8a4433"};te.color.set(ze[me.woodId]||"#6f4b2d");const xe={unicorn:"#e8f2ff",dragon:"#ff7a4a",phoenix:"#ffbd5e",thunderbird:"#79ddff",basilisk:"#6effa0",thestral:"#b7a8ff",coral:"#58e0c6",chimaera:"#ffd06e",augurey:"#9db7ff",wraithglass:"#e79bff",moonstoneheart:"#d9f3ff"};Ue.material.color.set(xe[me.coreId]||"#ffe0a8"),ne.material.color.set(xe[me.coreId]||"#ffe7b0"),ce.material.color.set(xe[me.coreId]||"#c9a2ff"),ce.material.emissive.set(xe[me.coreId]||"#c9a2ff"),se.scale.y=.85+(me.length-9)*.035,Ue.scale.setScalar(.2+me.stats.aether*.0016)},flash(){this.hitFlash=1}}}function Mg(s="#9fe7ff"){const e=new Le,t=new Un(new Sn({map:qt(),color:s,transparent:!0,blending:je,depthWrite:!1,opacity:.95}));t.scale.set(.8,.8,1),e.add(t);const n=new Y(new Mt(.07,8,6),new nt({color:"#ffffff"}));e.add(n);const i=new Y(new kn(.22,.008,6,34),new nt({color:s,transparent:!0,opacity:.5,blending:je}));e.add(i);const a=new oi(new _t().setAttribute("position",new Ft(new Float32Array(42),3)),new $n({map:qt(),color:s,size:.22,transparent:!0,opacity:.5,blending:je,depthWrite:!1}));e.add(a);let r=0;const o=[];return{group:e,update(l,c){r+=l;const d=new L(c.x+Math.sin(r*.8)*1.1,c.y+1.6+Math.sin(r*1.8)*.18,c.z+Math.cos(r*.8)*1.1);e.position.lerp(d,1-Math.pow(.005,l)),i.rotation.x=r*.8,i.rotation.y=r*.5,t.material.opacity=.7+Math.sin(r*3)*.15,o.unshift(e.position.clone()),o.length>14&&o.pop();const u=a.geometry.attributes.position.array;o.forEach((h,f)=>{u[f*3]=h.x-e.position.x,u[f*3+1]=h.y-e.position.y,u[f*3+2]=h.z-e.position.z}),a.geometry.attributes.position.needsUpdate=!0},setColor(l){t.material.color.set(l),i.material.color.set(l),a.material.color.set(l)}}}const Ne=Math.PI*2,bg=(s,e,t)=>Math.max(e,Math.min(t,s)),Tc=(s,e,t)=>s+(e-s)*t,Ac=(s,e,t)=>{const n=bg((t-s)/(e-s),0,1);return n*n*(3-2*n)},Ii=(s,e,t,n)=>Math.hypot(s-t,e-n),wn=s=>s[Math.floor(Math.random()*s.length)];function cn(s){return function(){s|=0,s=s+1831565813|0;let e=Math.imul(s^s>>>15,1|s);return e=e+Math.imul(e^e>>>7,61|e)^e,((e^e>>>14)>>>0)/4294967296}}function Ke(s,e){let t=Math.sin(s*.043)*2+Math.cos(e*.041)*1.7+Math.sin((s+e)*.021)*3.2+Math.sin(s*.12+e*.08)*.55;const n=Ii(s,e,-64,-44);t+=15*Math.exp(-(n*n)/3200),t=Tc(t,10.4,Ac(34,17,n)*.9);const i=Ii(s,e,0,46);t=Tc(t,.15,Ac(34,8,i));const a=Ii(s,e,52,78);t-=8.4*Math.exp(-(a*a)/2450);const r=Ii(s,e,-78,82);t-=2.2*Math.exp(-(r*r)/1800);const o=Ii(s,e,104,66);t+=7*Math.exp(-(o*o)/1352);const l=Ii(s,e,112,-88);t+=17*Math.exp(-(l*l)/1800);const c=Ii(s,e,0,-132);return t+=6.5*Math.exp(-(c*c)/1152),t}function zn(s,e,t,{repeat:n=1,aniso:i=4}={}){const a=document.createElement("canvas");a.width=s,a.height=e;const r=a.getContext("2d");t(r,s,e);const o=new Qo(a);return o.colorSpace=ln,o.anisotropy=i,o.wrapS=o.wrapT=Fa,o.repeat.set(n,n),o}function oe(s,e={}){return new ke({color:s,roughness:.86,metalness:.05,...e})}function Ee(s,e){const t=e.mat||oe(e.color||"#6a6a7a"),n=new Y(new Si(e.w||1,e.h||1,e.d||1),t);return n.position.set(e.x||0,e.y||0,e.z||0),e.rx&&(n.rotation.x=e.rx),e.ry&&(n.rotation.y=e.ry),e.rz&&(n.rotation.z=e.rz),e.shadow!==!1&&(n.castShadow=!0),n.receiveShadow=!0,s.add(n),n}function We(s,e){const t=new Y(new ht(e.rt??e.r??1,e.rb??e.r??1,e.h||1,e.seg||10,1,e.open||!1),e.mat||oe(e.color||"#6a6a7a"));return t.position.set(e.x||0,e.y||0,e.z||0),e.rx&&(t.rotation.x=e.rx),e.ry&&(t.rotation.y=e.ry),e.rz&&(t.rotation.z=e.rz),e.shadow!==!1&&(t.castShadow=!0),t.receiveShadow=!0,s.add(t),t}function zs(s,e){const t=new Y(new Ct(e.r||1,e.h||2,e.seg||8),e.mat||oe(e.color||"#6a6a7a"));return t.position.set(e.x||0,e.y||0,e.z||0),e.rx&&(t.rotation.x=e.rx),e.ry&&(t.rotation.y=e.ry),e.rz&&(t.rotation.z=e.rz),e.shadow!==!1&&(t.castShadow=!0),s.add(t),t}function et(s,e,t=1,n=0,i=0,a=0,r=.85){const o=new Un(new Sn({map:qt(),color:e,transparent:!0,opacity:r,blending:je,depthWrite:!1}));return o.scale.set(t,t,1),o.position.set(n,i,a),s.add(o),o}function pn(s,e,t=1,n=14,i=0,a=1,r=0){const o=new xd(e,t,n,2);return o.position.set(i,a,r),s.add(o),o}function bi(s,{color:e="#e9c988",bg:t="rgba(12,8,20,.8)",border:n="rgba(233,201,136,.35)",width:i=512,height:a=128,font:r="700 44px Cinzel, Georgia, serif",letter:o=4}={}){const l=zn(i,a,(d,u,h)=>{d.clearRect(0,0,u,h),t&&(d.fillStyle=t,d.beginPath(),d.roundRect?d.roundRect(6,6,u-12,h-12,6):d.rect(6,6,u-12,h-12),d.fill(),d.strokeStyle=n,d.lineWidth=2,d.stroke()),d.fillStyle=e,d.font=r,d.textAlign="center",d.textBaseline="middle",d.letterSpacing=`${o}px`,d.fillText(s,u/2,h/2+2)}),c=new nt({map:l,transparent:!0,depthWrite:!1,side:rt});return new Y(new Ot(i/a*2,2),c)}function $s(s="#9fe7ff",{size:e=512,ring:t=!0}={}){return zn(e,e,(n,i,a)=>{n.clearRect(0,0,i,a);const r=i/2,o=a/2,l=i*.44;n.strokeStyle=s,n.globalAlpha=.6,n.lineWidth=2,n.beginPath(),n.arc(r,o,l,0,Ne),n.stroke(),n.globalAlpha=.28,n.beginPath(),n.arc(r,o,l*.78,0,Ne),n.stroke(),n.beginPath(),n.arc(r,o,l*.56,0,Ne),n.stroke(),n.globalAlpha=.75;const c=["ᚦ","ᛉ","ᛟ","ᚱ","ᛏ","ᛒ","ᛗ","ᛊ","ᛖ","ᛞ","ᛚ","ᚹ"];n.font=`${Math.round(i*.048)}px Georgia, serif`,n.textAlign="center",n.textBaseline="middle",n.fillStyle=s;for(let u=0;u<16;u++){const h=u/16*Ne;n.save(),n.translate(r+Math.cos(h)*l*.9,o+Math.sin(h)*l*.9),n.rotate(h+Math.PI/2),n.fillText(c[u%c.length],0,0),n.restore()}n.globalAlpha=.32,n.lineWidth=1.3;for(let u=0;u<2;u++){n.beginPath();for(let h=0;h<=6;h++){const f=h/6*Ne+u*Math.PI/6,g=r+Math.cos(f)*l*.72,v=o+Math.sin(f)*l*.72;h===0?n.moveTo(g,v):n.lineTo(g,v)}n.stroke()}n.globalAlpha=.16;const d=n.createRadialGradient(r,o,0,r,o,l);d.addColorStop(0,s),d.addColorStop(.7,"transparent"),d.addColorStop(1,"transparent"),n.fillStyle=d,n.beginPath(),n.arc(r,o,l,0,Ne),n.fill()})}function wg(){const t=n=>(n+150)/300*1024;return zn(1024,1024,(n,i,a)=>{const r=cn(20261115);n.fillStyle="#2c3a2a",n.fillRect(0,0,i,a);const o=[{x:0,z:46,color:"#3a4030",r:60},{x:-64,z:-44,color:"#394136",r:64},{x:52,z:-36,color:"#24361f",r:72},{x:-78,z:82,color:"#334034",r:54},{x:104,z:66,color:"#2b2a38",r:50},{x:112,z:-88,color:"#3d3a33",r:46},{x:0,z:-132,color:"#232232",r:44},{x:52,z:78,color:"#2b3b3a",r:48}];for(const v of o){const m=n.createRadialGradient(t(v.x),t(v.z),0,t(v.x),t(v.z),v.r/300*1024);m.addColorStop(0,v.color),m.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=m,n.fillRect(0,0,i,a)}for(let v=0;v<2400;v++){const m=r()*i,p=r()*a,x=3+r()*20,M=["rgba(70,86,52,.18)","rgba(42,54,39,.22)","rgba(91,102,63,.1)","rgba(45,60,44,.2)","rgba(120,110,70,.06)"];n.fillStyle=M[Math.floor(r()*M.length)],n.beginPath(),n.ellipse(m,p,x,x*(.4+r()*.6),r()*3,0,Ne),n.fill()}const l={x:t(52),y:t(78),r:46/300*1024},c=n.createRadialGradient(l.x,l.y,l.r*.55,l.x,l.y,l.r);c.addColorStop(0,"rgba(30,52,54,.6)"),c.addColorStop(.75,"rgba(122,112,82,.5)"),c.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=c,n.beginPath(),n.arc(l.x,l.y,l.r,0,Ne),n.fill();const d=[[[0,46],[-16,30],[-32,18],[-50,-8],[-64,-30]],[[0,46],[18,34],[30,20],[40,2],[50,-20],[52,-36]],[[0,46],[22,52],[34,60],[52,70]],[[0,46],[-24,56],[-46,66],[-64,74],[-78,82]],[[0,46],[30,48],[60,54],[86,60],[104,66]],[[104,66],[112,36],[112,0],[112,-50],[112,-88]],[[0,46],[4,12],[2,-30],[0,-70],[0,-112]],[[-16,30],[4,28],[20,26]]];for(const v of d)n.lineCap="round",n.lineJoin="round",n.strokeStyle="rgba(38,34,27,.4)",n.lineWidth=13,n.beginPath(),v.forEach(([m,p],x)=>{const M=t(m),_=t(p);x===0?n.moveTo(M,_):n.lineTo(M,_)}),n.stroke(),n.strokeStyle="rgba(147,131,98,.72)",n.lineWidth=7,n.stroke(),n.strokeStyle="rgba(184,166,125,.35)",n.lineWidth=2.5,n.stroke();for(let v=0;v<5e3;v++){const m=r()*i,p=r()*a;n.fillStyle=`rgba(${60+r()*50},${80+r()*60},${40+r()*30},${.1+r()*.22})`,n.fillRect(m,p,1.2+r()*2,1+r()*2)}const u={x:t(-64),y:t(-44),r:30/300*1024},h=n.createRadialGradient(u.x,u.y,0,u.x,u.y,u.r);h.addColorStop(0,"rgba(105,100,98,.55)"),h.addColorStop(.6,"rgba(92,90,84,.28)"),h.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=h,n.beginPath(),n.arc(u.x,u.y,u.r,0,Ne),n.fill();const f={x:t(0),y:t(46),r:13/300*1024},g=n.createRadialGradient(f.x,f.y,0,f.x,f.y,f.r);g.addColorStop(0,"rgba(132,124,108,.85)"),g.addColorStop(.8,"rgba(105,98,85,.6)"),g.addColorStop(1,"rgba(0,0,0,0)"),n.fillStyle=g,n.beginPath(),n.arc(f.x,f.y,f.r,0,Ne),n.fill();for(let v=0;v<300;v++){const m=r()*i,p=r()*a;n.fillStyle=["rgba(180,150,90,.18)","rgba(150,120,190,.1)","rgba(220,200,160,.12)"][Math.floor(r()*3)],n.beginPath(),n.arc(m,p,r()*1.8,0,Ne),n.fill()}},{aniso:8})}function nl(s,e,t,n,i={}){const a=new Le;a.position.set(e,0,t),s.add(a);const r=oe(i.trunk||"#4b3427"),o=i.leaf||["#2e4a2c","#3c5a33","#26402a","#455a32"],l=i.n||1;for(let c=0;c<l;c++){const d=n()*Ne,u=n()*(i.spread||3),h=Math.cos(d)*u,f=Math.sin(d)*u,g=(i.scale||1)*(.7+n()*.7),v=4+n()*3,m=new Y(new ht(.14*g,.28*g,v,6),r);m.position.set(h,v/2,f),m.castShadow=!1,m.receiveShadow=!0,a.add(m);const p=oe(wn(o));if(i.conifer)for(let x=0;x<3;x++){const M=new Y(new Ct((1.7-x*.38)*g,(2.6-x*.3)*g,7),p);M.position.set(h,v-.6+x*1.25*g,f),a.add(M)}else for(let x=0;x<3;x++){const M=new Y(new Gi((1.2+n()*.75)*g,0),p);M.position.set(h+(n()-.5)*1.6*g,v-.3+x*.8*g,f+(n()-.5)*1.6*g),M.rotation.set(n()*3,n()*3,n()*3),M.scale.y=.8,a.add(M)}}return a}const Bs=()=>new ke({color:"#ffce8a",emissive:"#ff9f45",emissiveIntensity:1.3,roughness:.4});function Sg(s){const{group:e,colliders:t,anims:n}=s,i=cn(7719),a=0,r=46,o=Ke(a,r),l=new Y(new Yt(14,54),new ke({map:zn(512,512,(v,m,p)=>{v.fillStyle="#6b6557",v.fillRect(0,0,m,p);for(let x=0;x<16;x++)for(let M=0;M<16;M++){const _=M*33+x%2*16+i()*4,E=x*33+i()*3,T=86+i()*28;v.fillStyle=`rgb(${T},${T-3},${T-10})`,v.beginPath(),v.roundRect?v.roundRect(_,E,29,28,5):v.rect(_,E,29,28),v.fill(),v.strokeStyle="rgba(34,30,24,.45)",v.lineWidth=1.2,v.stroke()}},{repeat:3}),roughness:.95}));l.rotation.x=-Math.PI/2,l.position.set(a,o+.1,r),l.receiveShadow=!0,e.add(l);const c=new Y(new Yn(13.2,14.4,64),oe("#4f4b42"));c.rotation.x=-Math.PI/2,c.position.set(a,o+.13,r),e.add(c);const d=new Le;d.position.set(a,o,r),We(d,{r:3.15,h:.55,seg:24,color:"#5e5a51",y:.3}),We(d,{rt:2.7,rb:2.7,h:.18,seg:24,color:"#747067",y:.58});const u=new Y(new Yt(2.5,32),new md({color:"#2c7d86",emissive:"#0b3a44",emissiveIntensity:.55,roughness:.08,metalness:.35,transparent:!0,opacity:.88}));u.rotation.x=-Math.PI/2,u.position.y=.7,d.add(u),We(d,{r:.55,h:2.4,seg:10,color:"#777369",y:1.6}),We(d,{rt:1.15,rb:.5,h:.35,seg:12,color:"#827d70",y:2.75}),We(d,{rt:.19,rb:.36,h:1.15,seg:8,color:"#8f8a7a",y:3.55});const h=new Y(new Mt(.2,10,8),oe("#8f8a7a"));h.position.y=4.2,d.add(h),zs(d,{r:.3,h:.7,seg:10,color:"#8f8a7a",y:4.55,rz:.2}),We(d,{r:.035,h:2.2,seg:5,color:"#6f6552",x:.38,y:3.9,rz:.15}),et(d,"#8fe7ff",1.5,.5,4.95,0),pn(d,"#86e0e8",2,18,0,3.4,0);const f=new Y(new Mt(.1,8,6),new nt({color:"#c9fbff"}));f.position.set(.5,4.95,0),d.add(f),et(d,"#bff4ff",.7,.5,4.95,0),e.add(d),t.push({x:a,z:r,r:3.6}),n.push((v,m)=>{u.rotation.z=m*.15,f.position.y=4.95+Math.sin(m*1.8)*.12});const g=[{x:-25,z:51,rot:1.2,w:4.6,d:4,h:3,wall:"#c3b596",roof:"#4e3550"},{x:-22,z:63,rot:1.6,w:5,d:4.2,h:3.4,wall:"#b5a888",roof:"#533b3a"},{x:20,z:60,rot:-1.4,w:4.2,d:4.4,h:3,wall:"#c9bc9b",roof:"#3e4658"},{x:27,z:45,rot:-1.9,w:5.2,d:4,h:3.6,wall:"#b0a386",roof:"#4f3a4b"},{x:12,z:66,rot:-2.5,w:4,d:3.8,h:2.8,wall:"#c4b795",roof:"#444f3d"},{x:-8,z:66,rot:2.7,w:4.4,d:4.2,h:3.2,wall:"#bdae8e",roof:"#4a3545"}];for(const v of g)Eg(s,v);Tg(s,{x:-14,z:30.5,rot:.75}),Rc(s,9,36,2),Rc(s,14,42,2.4);for(const[v,m]of[[-8,38],[8,50],[18,54],[-18,44]])Ag(s,v,m);Rg(e,[[-8,38,4.2],[8,50,4.2],[18,54,4],[-18,44,4.2]],o+3);for(const[v,m,p,x,M]of[[-19,36,3.4,1,.7],[20,35,3,1,-.5],[-7,54,1,3.2,.2],[6,58,1,2.6,.4]]){const _=Ke(v,m);Ee(e,{w:p,h:1,d:x,color:"#2f4a2d",x:v,y:_+.5,z:m,ry:M,mat:oe("#2e4a2c",{roughness:.95})})}for(const[v,m]of[[-7.4,35],[-9,36.4],[7.6,47.4],[21,49]]){const p=Ke(v,m);We(e,{r:.42,h:.9,seg:10,color:"#5b4130",x:v,y:p+.45,z:m,mat:oe("#5b4130")})}Cg(s,12,33,.4,[["AURELIAN ACADEMY","north-west"],["WHISPERWOOD","north-east"],["MIRRORMERE","south-east"],["THE SUNKEN RUINS","south-west"]])}function Eg(s,{x:e,z:t,rot:n=0,w:i=4.4,d:a=4,h:r=3,wall:o="#c3b596",roof:l="#4a3347"}){const{group:c,colliders:d}=s,u=Ke(e,t),h=new Le;h.position.set(e,u,t),h.rotation.y=n,c.add(h),Ee(h,{w:i,h:r,d:a,color:o,y:r/2,mat:oe(o,{roughness:.95})});const f=oe("#4a3528");Ee(h,{w:i+.1,h:.16,d:a+.1,y:r-.2,mat:f});for(const m of[-1,1])Ee(h,{w:.16,h:r,d:a+.12,x:m*(i/2-.08),y:r/2,mat:f});Ee(h,{w:i*1.06,h:.14,d:.16,y:r*.62,z:a/2+.05,mat:f});const g=new Y(new Ct(Math.max(i,a)*.78,r*.82,4),oe(l,{roughness:.82}));g.position.y=r+r*.4,g.rotation.y=Math.PI/4,g.castShadow=!0,h.add(g),Ee(h,{w:.55,h:1.5,d:.55,x:i*.24,y:r+.9,z:-a*.2,color:"#5f5a52"}),Ee(h,{w:.85,h:1.7,d:.12,y:.85,z:a/2+.02,mat:oe("#33241d")});const v=new Y(new Mt(.045,6,5),new ke({color:"#d6b06a",metalness:.8,roughness:.3}));v.position.set(.26,.9,a/2+.1),h.add(v);for(const m of[-1,1])Ee(h,{w:.7,h:.8,d:.06,x:m*(i/2-.95),y:1.65,z:a/2+.04,mat:Bs()}),Ee(h,{w:.85,h:.95,d:.03,x:m*(i/2-.95),y:1.65,z:a/2+.01,mat:oe("#2f2420")});if(Ee(h,{w:.62,h:.7,d:.06,y:r+.45,z:a/2+.02,mat:Bs()}),Math.random()>.55){const m=Ee(h,{w:1,h:.08,d:.7,y:2.35,z:a/2+.35,mat:oe(wn(["#5a3d39","#3e4658","#4a3545"]))});m.rotation.x=.18}return d.push({x:e,z:t,r:Math.max(i,a)*.53}),h}function Tg(s,{x:e,z:t,rot:n}){const{group:i,colliders:a,anims:r}=s,o=Ke(e,t),l=new Le;l.position.set(e,o,t),l.rotation.y=n,i.add(l);const c=6.2,d=5,u=4;Ee(l,{w:c,h:u,d,y:u/2,color:"#b3a484",mat:oe("#b3a484",{roughness:.94})}),Ee(l,{w:c+.2,h:.18,d:d+.2,y:u-.25,mat:oe("#4a3528")});const h=new Y(new Ct(5.3,3.3,4),oe("#3c2a45",{roughness:.8}));h.position.y=u+1.55,h.rotation.y=Math.PI/4,h.castShadow=!0,l.add(h),Ee(l,{w:1.4,h:1.1,d:1,y:u+.25,z:d*.2,mat:oe("#b3a484")}),Ee(l,{w:.9,h:.6,d:.05,y:u+.3,z:d*.2+.52,mat:Bs()}),Ee(l,{w:1.4,h:2.5,d:.16,y:1.25,z:d/2+.03,mat:oe("#2a1c18")});const f=new ke({color:"#ffdda0",emissive:"#ffae4d",emissiveIntensity:1.5,roughness:.2,metalness:.2,transparent:!0,opacity:.92});Ee(l,{w:2,h:1.5,d:.08,x:-1.7,y:1.9,z:d/2+.04,mat:f}),Ee(l,{w:2.15,h:1.65,d:.04,x:-1.7,y:1.9,z:d/2+.01,mat:oe("#2a1c18")}),Ee(l,{w:.08,h:1.55,d:.1,x:-1.7,y:1.9,z:d/2+.08,mat:oe("#3a281f")}),Ee(l,{w:2.1,h:.08,d:.1,x:-1.7,y:1.9,z:d/2+.08,mat:oe("#3a281f")});const g=bi("WANDLORE",{width:512,height:160,font:"700 62px Cinzel, Georgia, serif"});g.scale.set(3.6,1.12,1),g.position.set(0,3.55,d/2+.1),l.add(g);const v=et(l,"#ffcf8e",3.4,0,3.55,d/2+.2,.28);for(const p of[-2.55,2.55])Ee(l,{w:.05,h:.5,d:.05,x:p,y:2.9,z:d/2+.4,mat:oe("#2c2118")}),Ee(l,{w:.28,h:.36,d:.28,x:p,y:2.6,z:d/2+.4,mat:Bs(),shadow:!1}),et(l,"#ffd28a",.9,p,2.6,d/2+.4,.55);Ee(l,{w:.75,h:2,d:.75,x:2,y:u+1.1,z:-1.3,color:"#5f5a52"});const m=new wt;m.position.set(2,u+2.2,-1.3),l.add(m),s.smokeSources||=[],s.smokeSources.push(m),pn(l,"#ffb15e",1.6,12,0,3,d/2+.8),a.push({x:e,z:t,r:3.9}),r.push((p,x)=>{v.material.opacity=.2+Math.sin(x*1.3)*.05})}function Rc(s,e,t,n){const{group:i,colliders:a}=s,r=Ke(e,t),o=new Le;o.position.set(e,r,t),o.rotation.y=n,i.add(o);for(const[d,u]of[[-1.1,-.8],[1.1,-.8],[-1.1,.8],[1.1,.8]])We(o,{r:.07,h:2.2,seg:5,x:d,y:1.1,z:u,color:"#4a3528",shadow:!1});const l=zn(256,256,(d,u,h)=>{for(let f=0;f<10;f++)d.fillStyle=f%2?"#533b3a":"#bcae90",d.fillRect(f*u/10,0,u/10,h)}),c=new Y(new Si(2.7,.07,2.1),new ke({map:l,roughness:.9}));c.position.y=2.25,c.rotation.z=.06,c.castShadow=!0,o.add(c),Ee(o,{w:2.3,h:.15,d:1.5,y:.95,mat:oe("#5a4330")}),Ee(o,{w:2.3,h:.8,d:.1,y:.5,z:.7,mat:oe("#5a4330")});for(let d=0;d<5;d++){const u=wn(["#c98d5a","#9cbf6d","#c86b6b","#d8c17a","#8a6cb5"]),h=new Y(new Mt(.13+Math.random()*.07,8,6),oe(u,{roughness:.6}));h.position.set(-.9+d*.45,1.1,(Math.random()-.5)*.5),o.add(h)}a.push({x:e,z:t,r:1.8})}function Ag(s,e,t){const{group:n,anims:i}=s,a=Ke(e,t),r=new Le;r.position.set(e,a,t),n.add(r),We(r,{r:.07,h:3.6,seg:6,y:1.8,color:"#332a27",mat:oe("#332a27",{metalness:.5,roughness:.6})}),Ee(r,{w:.45,h:.5,d:.45,y:3.75,mat:Bs(),shadow:!1});const o=oe("#2c211d",{metalness:.6,roughness:.4});Ee(r,{w:.54,h:.08,d:.54,y:4.02,mat:o}),Ee(r,{w:.54,h:.08,d:.54,y:3.47,mat:o});const l=et(r,"#ffd18a",2.6,0,3.75,0,.5),c=pn(r,"#ffb56d",1.1,13,0,3.7,0);i.push((d,u)=>{const h=.85+Math.sin(u*7.3+e)*.1+Math.sin(u*13.7+t)*.05;c.intensity=1.1*h,l.material.opacity=.44*h})}function Rg(s,e,t){const n=new fd(e.map(([r,o])=>new L(r,t,o))),i=new _t().setFromPoints(n.getPoints(60)),a=new cd(i,new Jo({color:"#3b3029",transparent:!0,opacity:.65}));s.add(a);for(let r=1;r<24;r++){const o=n.getPoint(r/24),l=new Y(new Mt(.055,6,5),new nt({color:r%3?"#ffd28a":"#c9a2ff"}));l.position.copy(o),l.position.y-=.1+Math.sin(r*2.3)*.08,s.add(l),et(s,r%3?"#ffd28a":"#c9a2ff",.55,o.x,o.y-.1,o.z,.5)}}function Cg(s,e,t,n,i){const{group:a,colliders:r}=s,o=Ke(e,t),l=new Le;l.position.set(e,o,t),l.rotation.y=n,a.add(l),We(l,{r:.1,h:3.1,seg:6,y:1.55,color:"#4a3528"}),i.forEach(([c,d],u)=>{const h=bi(`${c}`,{width:512,height:128,font:"700 30px Cinzel, Georgia, serif"});h.scale.set(2.6,.65,1),h.position.set(0,2.65-u*.55,.08),h.rotation.y=u%2?.35:-.35,l.add(h)}),r.push({x:e,z:t,r:.7})}function Pg(s){const{group:e,colliders:t,anims:n}=s,i=-64,a=-44,r=Ke(i,a),o=new Le;o.position.set(i,r,a),e.add(o);const l=oe("#585568",{roughness:.9}),c=oe("#454354",{roughness:.92}),d=oe("#2f2945",{roughness:.8}),u=new ke({color:"#ffe3ac",emissive:"#ffb45f",emissiveIntensity:1.35,roughness:.35});Ee(o,{w:22,h:17,d:16,y:8.5,mat:l}),Ee(o,{w:22.6,h:.8,d:16.6,y:16.8,mat:c});for(let p=-5;p<=5;p++)Ee(o,{w:1.1,h:1.2,d:.9,x:p*2.05,y:17.8,z:8.2,mat:c}),Ee(o,{w:1.1,h:1.2,d:.9,x:p*2.05,y:17.8,z:-8.2,mat:c});const h=new Y(new Ct(15.5,8,4),d);h.position.y=21.2,h.rotation.y=Math.PI/4,h.castShadow=!0,o.add(h),We(o,{r:.09,h:7,seg:4,y:25.3,color:"#8a7752",mat:oe("#8a7752",{metalness:.5,roughness:.4})}),[[-11,8.5,24,1.15],[11,8.5,24,1.15],[-11,-8.5,20,.95],[11,-8.5,20,.95]].forEach(([p,x,M,_],E)=>{We(o,{r:3.4*_,h:M,seg:14,x:p,y:M/2,z:x,mat:l}),We(o,{rt:3.55*_,rb:3.4*_,h:.5,seg:14,x:p,y:M,z:x,mat:c});const T=new Y(new Ct(4.1*_,6.2*_,12),d);T.position.set(p,M+3.1*_,x),T.castShadow=!0,o.add(T),We(o,{r:.05,h:2.2,seg:4,x:p,y:M+7.1*_,z:x,color:"#c3a05a",mat:oe("#c3a05a",{metalness:.8,roughness:.3})});for(let y=0;y<3;y++){const b=5+y*6,P=new Y(new Ot(1.1,1.9),u);P.position.set(p+(p>0,0),b,x+3.45*_+.02),P.rotation.y=0,o.add(P)}if(E<2){const y=new Y(new Ot(1.4,4.4),new ke({map:zn(256,512,(b,P,I)=>{b.fillStyle=E===0?"#3b2b5e":"#4a2c45",b.fillRect(0,0,P,I),b.fillStyle="#d9b96e",b.font="700 200px Georgia, serif",b.textAlign="center",b.fillText("A",P/2,300),b.strokeStyle="#d9b96e",b.lineWidth=8,b.strokeRect(14,14,P-28,I-28)}),side:rt,roughness:.9}));y.position.set(p,11.5,x+3.9*_),o.add(y),n.push((b,P)=>{y.rotation.z=Math.sin(P*.8+E)*.025})}});for(const p of[-1,1]){Ee(o,{w:9,h:9,d:11,x:p*15,y:4.5,mat:l});const x=new Y(new Ct(8,5.2,4),d);x.position.set(p*15,11.5,0),x.rotation.y=Math.PI/4,x.castShadow=!0,o.add(x);for(let M=0;M<3;M++){const _=new Y(new Ot(.9,1.6),u);_.position.set(p*15-3+M*3,4.5,5.56),o.add(_)}}Ee(o,{w:10,h:10,d:3.5,y:5,z:9,mat:c}),Ee(o,{w:11,h:.7,d:4.2,y:10,z:9,mat:l});const g=new Y(new kn(2,.36,8,24,Math.PI),l);g.position.set(0,3.2,10.8),o.add(g),Ee(o,{w:4.4,h:3,d:.18,y:1.5,z:10.75,mat:oe("#221a2a")}),Ee(o,{w:2,h:5.2,d:.24,y:2.6,z:10.9,mat:new ke({color:"#3a2a20",roughness:.8})});const v=et(o,"#ffcf8a",3.4,0,3,11.1,.34);pn(o,"#ffbe74",2.2,20,0,5,11),et(o,"#ffd28a",4,0,12.5,9.2,.22);for(let p=0;p<8;p++)Ee(o,{w:9-p*.6,h:.42,d:1.2,y:.2-p*.38,z:11.3+p*1.05,mat:l,shadow:!1});for(const p of[-1,1])for(let x=0;x<5;x++)Ee(o,{w:1.2,h:1.2,d:1.6,x:p*(4+x*.9),y:.6,z:14+x*2.4,mat:oe("#2c452c",{roughness:1})});for(const p of[-1,1])We(o,{r:.09,h:3.4,seg:6,x:p*6.1,y:1.7,z:10.5,color:"#2c2620",mat:oe("#2c2620")}),Ee(o,{w:.42,h:.55,d:.42,x:p*6.1,y:3.55,z:10.5,mat:u,shadow:!1}),et(o,"#ffc985",2.1,p*6.1,3.55,10.5,.5);const m=[];for(let p=0;p<14;p++){const x=new Le,M=(Math.random()-.5)*22,_=13+Math.random()*13,E=3+Math.random()*6;x.position.set(M,E,_),o.add(x),We(x,{r:.07,h:.5,seg:6,y:0,color:"#e8dcc0",shadow:!1});const T=et(x,"#ffd38a",.6,0,.3,0,.8);et(x,"#ffbd6e",1.4,0,.3,0,.16),m.push({anchor:x,base:E,phase:Math.random()*Ne,flame:T})}return n.push((p,x)=>{for(const M of m)M.anchor.position.y=M.base+Math.sin(x*.8+M.phase)*.35,M.flame.material.opacity=.65+Math.sin(x*9+M.phase)*.2;v.material.opacity=.3+Math.sin(x*1.7)*.06}),t.push({x:i,z:a,r:14.5}),s.smokeSources||=[],o}function Lg(s){const{group:e,colliders:t,anims:n}=s,i=cn(1944),a=52,r=-36,o=Ke(a,r),l=new Le;l.position.set(a,o,r),e.add(l),We(l,{rt:1.7,rb:3,h:15,seg:12,y:7.5,color:"#3b2a2a",mat:oe("#3b2a2a",{roughness:1})});for(let p=0;p<9;p++){const x=p/9*Ne,M=We(l,{rt:.25,rb:.8,h:4.4,seg:6,x:Math.cos(x)*2.2,y:1.1,z:Math.sin(x)*2.2,color:"#3b2a2a"});M.rotation.z=Math.cos(x)*.9,M.rotation.x=Math.sin(x)*.9}for(let p=0;p<7;p++){const x=i()*Ne,M=1.2+i()*5,_=oe(wn(["#26402c","#2f5035","#3c5b38","#1f3826"]),{roughness:1}),E=new Y(new Gi(2.2+i()*2.6,1),_);E.position.set(Math.cos(x)*M,13+i()*7,Math.sin(x)*M),E.scale.y=.75,E.castShadow=!0,l.add(E)}const c=[];for(let p=0;p<12;p++){const x=i()*Ne,M=2.5+i()*6,_=new Y(new ht(.025,.02,2+i()*5,4),new nt({color:wn(["#6ed8c8","#9d7bff","#7de6d0"]),transparent:!0,opacity:.5}));_.position.set(Math.cos(x)*M,11+i()*4,Math.sin(x)*M),l.add(_),c.push(_)}et(l,"#7de6d0",9,0,15,0,.18),pn(l,"#6fdfd0",1.6,24,0,10,0),t.push({x:a,z:r,r:3.4});const d=new Le;d.position.set(44,Ke(44,-48),-48),e.add(d);for(let p=0;p<7;p++){const x=p/7*Ne,M=2.4+i()*1.8,_=Ee(d,{w:.9,h:M,d:.6,x:Math.cos(x)*6.5,y:M/2,z:Math.sin(x)*6.5,ry:-x,mat:oe("#5a5a62",{roughness:.95})});_.rotation.z=(i()-.5)*.12;const E=bi(wn(["ᚦ","ᛉ","ᛟ","ᚱ","ᛏ","ᛗ","ᛊ"]),{color:"#8fe7ff",bg:"transparent",border:"transparent",width:128,height:128,font:"80px Georgia, serif"});E.scale.set(.5,.5,1),E.position.set(Math.cos(x)*6.1,M*.62,Math.sin(x)*6.1),E.rotation.y=-x+Math.PI/2,d.add(E)}const u=et(d,"#7de6d0",10,0,.3,0,.16),h=new Y(new Yn(5.9,6.25,48),new nt({color:"#6fe5d0",transparent:!0,opacity:.24,side:rt}));h.rotation.x=-Math.PI/2,h.position.y=.1,d.add(h),n.push((p,x)=>{h.material.opacity=.16+Math.sin(x*1.4)*.07,u.material.opacity=.12+Math.sin(x*1.1)*.05,c.forEach((M,_)=>{M.rotation.z=Math.sin(x*.5+_)*.04})});const f=[oe("#4a2b56",{emissive:"#8e4fd8",emissiveIntensity:.7}),oe("#2c4a5a",{emissive:"#3fc7c7",emissiveIntensity:.6})];for(let p=0;p<16;p++){const x=a+(i()-.5)*44,M=r+(i()-.5)*44;if(Math.hypot(x-44,M+48)<8)continue;const _=Ke(x,M),E=new Le;E.position.set(x,_,M),e.add(E);const T=.5+i()*1.1;We(E,{r:.08*T,h:.7*T,seg:5,y:.35*T,color:"#d8cbb4",shadow:!1});const y=new Y(new Mt(.35*T,10,6,0,Ne,0,Math.PI/2),wn(f));y.position.y=.7*T,E.add(y),et(E,wn(["#b47dff","#6fe5d0"]),1.4*T,0,.7*T,0,.24)}const g=We(e,{rt:.8,rb:1,h:8,seg:8,x:66,y:Ke(66,-30)+.8,z:-30,color:"#4a3427"});g.rotation.z=Math.PI/2,g.rotation.y=.6;for(let p=0;p<5;p++){const x=new Y(new Mt(.25,8,5,0,Ne,0,Math.PI/2),oe("#6fe5b0",{emissive:"#2fae6a",emissiveIntensity:.4}));x.position.set(63+p*1.3,Ke(66,-30)+1.65,-31+p*.18),e.add(x)}const v=new Le;v.position.set(31,Ke(31,-20),-20),v.rotation.y=2.4,e.add(v);for(const p of[-1.8,1.8])We(v,{r:.18,h:4.2,seg:6,x:p,y:2.1,color:"#4a3528"});Ee(v,{w:4.1,h:.45,d:.3,y:4.25,mat:oe("#4a3528")});const m=bi("WHISPERWOOD",{font:"700 44px Cinzel, Georgia, serif"});m.scale.set(3.3,1,1),m.position.set(0,3.6,.2),v.add(m),et(v,"#8fe7b0",1.8,0,3.6,.2,.3),n.push((p,x)=>{l.rotation.y=Math.sin(x*.04)*.008});for(let p=0;p<12;p++){const x=i()*Ne,M=9+i()*17;nl(e,a+Math.cos(x)*M,r+Math.sin(x)*M,i,{conifer:i()>.5,scale:.9,n:2})}}function Ig(s){const{group:e,anims:t}=s,n=cn(818),i={x:52,z:78},a=new Le;a.position.set(38,.6,64),a.rotation.y=-.85,e.add(a);for(let g=0;g<8;g++){Ee(a,{w:3,h:.18,d:1.1,y:0,z:-g*1.05,mat:oe(g%2?"#5f4835":"#6b523d")});for(const v of[-1.2,1.2])We(a,{r:.1,h:2.6,seg:6,x:v,y:-1.1,z:-g*1.05+.4,color:"#3d2c22"})}for(const[g,v]of[[-1.4,.2],[1.4,.2],[-1.4,-7.8],[1.4,-7.8]])We(a,{r:.11,h:1.4,seg:6,x:g,y:.7,z:v,color:"#3d2c22"});We(a,{r:.07,h:2.2,seg:5,x:1.35,y:1.5,z:-6.6,color:"#332a27"}),Ee(a,{w:.32,h:.4,d:.32,x:1.35,y:2.7,z:-6.6,mat:new ke({color:"#ffdda0",emissive:"#ffae4d",emissiveIntensity:1.5}),shadow:!1}),et(a,"#ffcf8a",2.2,1.35,2.7,-6.6,.55),pn(a,"#ffb56d",1.4,12,1.35,2.7,-6.6);const r=new Le;r.position.set(4.8,.55,-8.5),a.add(r),Ee(r,{w:1.5,h:.45,d:3.1,y:.2,mat:oe("#5a4130")}),zs(r,{r:.75,h:1,seg:4,y:.32,z:1.6,rx:Math.PI/2,color:"#5a4130"}),zs(r,{r:.75,h:1,seg:4,y:.32,z:-1.6,rx:-Math.PI/2,color:"#5a4130"}),We(r,{r:.04,h:2,seg:4,y:1.3,color:"#3b2b20"}),t.push((g,v)=>{r.position.y=.55+Math.sin(v*1.2+1)*.05,r.rotation.z=Math.sin(v*.8)*.02});for(let g=0;g<70;g++){const v=n()*Ne,m=46+n()*9,p=i.x+Math.cos(v)*m,x=i.z+Math.sin(v)*m,M=Ke(p,x);if(!(M<-1.8))if(n()>.55){const _=new Le;_.position.set(p,M,x),e.add(_);for(let E=0;E<4;E++){const T=.8+n()*1.4,y=We(_,{r:.018,h:T,seg:3,x:(n()-.5)*.5,y:T/2,z:(n()-.5)*.5,color:"#6e7f4a",shadow:!1});y.rotation.z=(n()-.5)*.2}}else{const _=new Y(new En(.4+n()*1.1,0),oe(n()>.5?"#4a4a52":"#3d4244"));_.position.set(p,M+.2,x),_.scale.y=.7,e.add(_)}}const o=oe("#3f6b4d",{roughness:.7}),l=new ke({color:"#f2d7ff",emissive:"#b57dff",emissiveIntensity:.8}),c=[];for(let g=0;g<22;g++){const v=n()*Ne,m=8+n()*26,p=i.x+Math.cos(v)*m,x=i.z+Math.sin(v)*m;if(Math.hypot(p-45,x-70)<7)continue;const M=new Y(new Yt(.45+n()*.8,10,.4,Ne-.8),o);if(M.rotation.x=-Math.PI/2,M.position.set(p,.14,x),e.add(M),n()>.55){const _=new Y(new Ct(.16,.28,6),l);_.position.set(p,.28,x),e.add(_),et(e,"#d3a7ff",.8,p,.3,x,.4)}c.push(M)}const d=new Le;d.position.set(66,0,96),e.add(d);const u=new Y(new En(5.2,1),oe("#4a4d52"));u.scale.set(1.5,.7,1.2),u.position.y=.8,d.add(u),Ee(d,{w:4.4,h:.3,d:3.6,y:2.9,mat:oe("#6c6a63")});for(const g of[-1.4,1.4])We(d,{r:.22,h:3.2,seg:6,x:g,y:4.5,z:0,color:"#6c6a63"});Ee(d,{w:3.3,h:.3,d:.4,y:6.05,mat:oe("#6c6a63")}),et(d,"#8fe7ff",3.2,0,5.2,0,.25),nl(d,1.8,-.8,n,{scale:.55,n:1,leaf:["#2f4d3a"]});const h=new Y(new Ot(3.2,44),new nt({map:zn(128,512,(g,v,m)=>{const p=g.createLinearGradient(0,0,v,0);p.addColorStop(0,"rgba(220,235,255,0)"),p.addColorStop(.5,"rgba(220,235,255,.35)"),p.addColorStop(1,"rgba(220,235,255,0)"),g.fillStyle=p,g.fillRect(0,0,v,m);for(let x=0;x<60;x++)g.fillStyle=`rgba(255,255,240,${Math.random()*.35})`,g.fillRect(Math.random()*v,Math.random()*m,2+Math.random()*3,1)}),transparent:!0,blending:je,depthWrite:!1,opacity:.55}));h.rotation.x=-Math.PI/2,h.position.set(52,.2,92),e.add(h),t.push((g,v)=>{h.material.opacity=.35+Math.sin(v*.7)*.12,c.forEach((m,p)=>{m.rotation.z=Math.sin(v*.4+p)*.03})});const f=new Y(new En(2.2,0),oe("#454a50"));f.position.set(40,.4,80),f.scale.set(1.2,.5,1),e.add(f),et(e,"#7de6d0",1.6,40,1,80,.2)}function zd(s="#8fe7ff",e=2.4,t=.9){const n=new Le,i=new ke({color:"#2b2733",roughness:.7}),a=new Y(new kn(e+.25,.22,8,36),i);n.add(a);const r=new Y(new kn(e-.12,.07,6,36),new nt({color:s,transparent:!0,opacity:.55,blending:je}));n.add(r);const o={time:{value:0},color:{value:new Oe(s)},opacity:{value:t}},l=new dn({uniforms:o,transparent:!0,depthWrite:!1,side:rt,blending:je,vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
      varying vec2 vUv; uniform float time; uniform vec3 color; uniform float opacity;
      void main(){
        vec2 p = vUv - 0.5; float r = length(p) * 2.0; float a = atan(p.y, p.x);
        float swirl = sin(a * 6.0 + r * 15.0 - time * 2.2) * 0.5 + 0.5;
        float swirl2 = sin(a * -3.0 + r * 9.0 + time * 1.3) * 0.5 + 0.5;
        float edge = smoothstep(1.0, 0.72, r) * smoothstep(0.0, 0.12, r);
        float alpha = edge * (0.28 + 0.72 * swirl * (0.5 + swirl2 * 0.5)) * opacity;
        vec3 col = mix(color * 0.35, color * 1.5, swirl) + vec3(0.8,0.95,1.0) * pow(swirl * swirl2, 9.0) * 0.7;
        gl_FragColor = vec4(col, alpha);
      }`}),c=new Y(new Yt(e,40),l);n.add(c);const d=et(n,s,e*5,0,0,0,.35),u=pn(n,s,2.2,e*7,0,0,.4);return{group:n,uniforms:o,disc:c,glow:d,light:u,ring:a,innerRing:r}}function Dg(s,e,t,n,i="#ffb35c",a=1){const r=new Le;r.position.set(e,t,n),s.add(r),et(r,i,1.6*a,0,0,0,.7),et(r,i,3.4*a,0,.2,0,.22);const o=new Y(new Mt(.16*a,8,6),new nt({color:"#fff2cc"}));o.position.y=.1*a,r.add(o);const l=pn(r,i,1.5,12*a,0,.4,0);return{g:r,light:l}}function Ng(s){const{group:e,colliders:t,anims:n}=s,i=cn(4411),a=-78,r=82,o=Ke(a,r),l=new Le;l.position.set(a,o,r),e.add(l);const c=oe("#4b5254",{roughness:.95}),d=oe("#383e42",{roughness:.95});We(l,{rt:13.5,rb:14.5,h:1.3,seg:32,y:.15,mat:c});const u=zn(512,512,(_,E,T)=>{_.fillStyle="#3d4345",_.fillRect(0,0,E,T);for(let y=0;y<900;y++)_.fillStyle=`rgba(${40+Math.random()*40},${48+Math.random()*40},${50+Math.random()*36},.5)`,_.fillRect(Math.random()*E,Math.random()*T,3+Math.random()*10,2+Math.random()*6);_.strokeStyle="rgba(120,200,220,.25)",_.lineWidth=2;for(let y=0;y<5;y++)_.beginPath(),_.arc(256,256,40+y*42,0,Ne),_.stroke()}),h=new Y(new Yt(13.2,48),new ke({map:u,roughness:.92}));h.rotation.x=-Math.PI/2,h.position.y=.82,h.receiveShadow=!0,l.add(h);for(const[_,E,T]of[[-5,4,2.6],[6,-2,2],[2,7,1.6]]){const y=new Y(new Yt(T,24),new md({color:"#1d4b55",emissive:"#0b2e36",emissiveIntensity:.5,roughness:.05,metalness:.4,transparent:!0,opacity:.92}));y.rotation.x=-Math.PI/2,y.position.set(_,.93,E),l.add(y)}for(let _=0;_<10;_++){const E=_/10*Ne+.2,T=10.4,y=2+i()*6,b=We(l,{rt:.52,rb:.68,h:y,seg:10,x:Math.cos(E)*T,y:y/2+.8,z:Math.sin(E)*T,color:"#4d5456",mat:c});if(b.rotation.z=(i()-.5)*.13,b.rotation.x=(i()-.5)*.1,y>4&&Ee(l,{w:1.5,h:.35,d:1.5,x:Math.cos(E)*T,y:y+.9,z:Math.sin(E)*T,mat:d}),_%2===0){const P=bi(wn(["ᚦ","ᛉ","ᛟ","ᚱ","ᛏ","ᛒ"]),{color:"#8fe7ff",bg:"transparent",border:"transparent",width:128,height:128,font:"90px Georgia, serif"});P.scale.set(.7,.7,1),P.position.set(Math.cos(E)*T-Math.cos(E)*.6,2.4,Math.sin(E)*T-Math.sin(E)*.6),P.rotation.y=-E+Math.PI/2,l.add(P)}}for(const[_,E,T,y]of[[-4.5,-7,.3,6.5],[8,6,-.8,5.2],[-10,3,1.2,4.6]]){const b=new Le;b.position.set(_,.8,E),b.rotation.y=T,l.add(b);for(const P of[-1.6,1.6])We(b,{r:.4,h:y,seg:8,x:P,y:y/2,z:0,color:"#4d5456"});Ee(b,{w:3.9,h:.65,d:.9,y,mat:d}),b.rotation.z=(i()-.5)*.06}const f=new Le;f.position.set(0,1.5,0),l.add(f);const g=zd("#8fe7ff",2.3,.75);g.group.position.set(0,2.8,0),f.add(g.group);for(const _ of[-2.9,2.9])We(f,{r:.45,h:5.4,seg:8,x:_,y:2.7,z:0,color:"#434b4d"});Ee(f,{w:6.3,h:.7,d:1,y:5.5,mat:d}),Ee(f,{w:.8,h:2.6,d:.3,y:6.6,mat:d});const v=new Y(new Yn(3.7,4.2,40),new nt({map:$s("#8fe7ff"),color:"#8fe7ff",transparent:!0,opacity:.5,side:rt,depthWrite:!1}));v.rotation.x=-Math.PI/2,v.position.y=-.55,f.add(v),et(f,"#8fe7ff",11,0,.2,0,.15),pn(f,"#8fe7ff",3.2,30,0,3.4,1),t.push({x:a,z:r,r:2.2});const m=[];for(let _=0;_<8;_++){const E=i()*Ne,T=5+i()*8,y=new Y(new En(.3+i()*.7,0),c);y.position.set(Math.cos(E)*T,2+i()*5,Math.sin(E)*T),l.add(y),m.push({m:y,base:y.position.y,phase:i()*Ne,spin:(i()-.5)*.5})}for(let _=0;_<26;_++){const E=i()*Ne,T=3+i()*12,y=new Y(new En(.15+i()*.5,0),c);y.position.set(Math.cos(E)*T,.95,Math.sin(E)*T),y.rotation.set(i()*3,i()*3,i()*3),l.add(y)}const p=new Le;p.position.set(-8,.9,-4),l.add(p),Ee(p,{w:1.1,h:2.4,d:.8,y:1.2,mat:c,rz:.18});const x=new Y(new Mt(.46,10,8),c);x.position.set(.5,2.6,0),p.add(x);const M=new Y(new kn(.7,.06,6,24,Math.PI),new nt({color:"#8fe7ff",transparent:!0,opacity:.5,blending:je}));M.position.set(.5,2.8,-.2),M.rotation.z=.2,p.add(M),n.push((_,E)=>{g.uniforms.time.value=E,g.innerRing.rotation.z=E*.4,v.rotation.z=E*.06,m.forEach((T,y)=>{T.m.position.y=T.base+Math.sin(E*.7+T.phase)*.3,T.m.rotation.y+=_*T.spin})})}function Ug(s){const{group:e,colliders:t,anims:n}=s,i=cn(6311),a=104,r=66,o=Ke(a,r),l=new Le;l.position.set(a,o,r),e.add(l);const c=oe("#3b3748",{roughness:.98}),d=oe("#302d3e",{roughness:.98}),u=new Y(new En(12,1),c);u.scale.set(1.35,.9,1.1),u.position.y=3,u.rotation.y=.4,l.add(u);for(let x=0;x<8;x++){const M=i()*Ne,_=7+i()*6,E=Math.cos(M)*_,T=Math.sin(M)*_,y=3+i()*9,b=new Y(new Ct(1.4+i()*2.2,y,5),i()>.5?c:d);b.position.set(E,y/2+2,T),b.rotation.y=i()*3,b.rotation.z=(i()-.5)*.2,l.add(b)}const h=new Le;h.position.set(-7.6,4.2,-6.4),h.rotation.y=-2.36,l.add(h);const f=new Y(new Yt(2.6,26),new nt({color:"#07050f"}));f.scale.y=1.3,h.add(f);const g=new Y(new kn(2.75,.4,7,26),d);g.scale.y=1.3,h.add(g),et(h,"#8a5bff",6,0,0,-.4,.3),pn(h,"#7d55ff",2.6,22,0,.4,-.4);for(let x=0;x<5;x++)Ee(l,{w:3.6-x*.25,h:.25,d:.9,x:-8.2-x*.15,y:.1+x*.28,z:-5.8+x*.4,mat:d,shadow:!1});const v=[new ke({color:"#6b4dff",emissive:"#5b34e6",emissiveIntensity:1.1,roughness:.15,metalness:.2}),new ke({color:"#65e6ff",emissive:"#24c5e8",emissiveIntensity:1,roughness:.1,metalness:.2}),new ke({color:"#c56bff",emissive:"#9b32e0",emissiveIntensity:.9,roughness:.2})],m=[];for(let x=0;x<46;x++){const M=i()*Ne,_=3+i()*11,E=a+Math.cos(M)*_,T=r+Math.sin(M)*_;if(Math.hypot(E-(a-7),T-(r-7))<2.5)continue;const y=Ke(E,T)+.1,b=.3+i()*1.5,P=new Y(new Tn(b,0),wn(v));P.position.set(E,y+b*1.2,T),P.rotation.set((i()-.5)*.5,i()*3,(i()-.5)*.5),P.scale.y=1.4+i()*1.8,l.add(P),m.push(P),b>1.1&&et(e,"#9d7bff",b*4,E,y+b*1.6,T,.18)}for(let x=0;x<5;x++){const M=new Y(new Ct(.8+x*.15,4+x*1.2,5),v[x%3]);M.position.set(a+7+x*.9,Ke(a+7,r-2)+2+x*.6,r-2-x*.5),M.rotation.z=-.15-x*.08,l.add(M)}et(l,"#b58cff",16,8,6,-2,.16),pn(l,"#9d7bff",2.4,30,7,5,-2),pn(l,"#5fe0ff",1.6,20,-7,3,3),t.push({x:a,z:r,r:10.5});const p=bi("GLIMMER CAVERNS",{font:"700 40px Cinzel, Georgia, serif"});p.scale.set(3.4,1.05,1),p.position.set(a-11,Ke(a-11,r-10)+2.4,r-10),p.rotation.y=-.9,e.add(p),n.push((x,M)=>{m.forEach((_,E)=>{_.material.emissiveIntensity=.8+Math.sin(M*1.4+E)*.2})})}function Fg(s){const{group:e,colliders:t,anims:n}=s,i=cn(9302),a=112,r=-88,o=Ke(a,r),l=new Le;l.position.set(a,o,r),e.add(l);const c=oe("#4a4640",{roughness:.97}),d=oe("#37342f",{roughness:.97});for(let p=0;p<9;p++){const x=i()*Ne,M=3+i()*9,_=8+i()*20,E=new Y(new Ct(2+i()*3.5,_,6),i()>.5?c:d);E.position.set(Math.cos(x)*M,_/2-1,Math.sin(x)*M),E.rotation.y=i()*3,E.rotation.z=(i()-.5)*.1,l.add(E)}We(l,{rt:8,rb:9,h:.8,seg:20,y:.2,mat:oe("#5a554c")});const u=new Le;u.position.set(2,.8,1),u.rotation.y=.7,l.add(u);const h=oe("#d8cfb4",{roughness:.8});We(u,{rt:.18,rb:.28,h:13,seg:6,y:.3,z:0,color:"#d8cfb4",mat:h}).rotation.x=Math.PI/2;for(let p=0;p<8;p++){const x=new Y(new kn(1.7-p*.08,.11,5,18,Math.PI),h);x.position.set(0,1.8,5.4-p*1.1),x.rotation.z=Math.PI,x.rotation.x=.12,u.add(x)}const f=new Le;f.position.set(0,1.7,6.7),u.add(f),Ee(f,{w:1.3,h:.85,d:2,mat:h}),zs(f,{r:.55,h:2,seg:5,y:-.05,z:1.5,rx:Math.PI/2,mat:h});for(const p of[-.42,.42])et(f,"#ff9a5a",.55,p,.3,.7,.7);for(const p of[-.65,.65]){const x=zs(f,{r:.14,h:1.6,seg:5,x:p,y:.55,z:-.4,mat:h});x.rotation.x=-.8,x.rotation.z=p>0?-.3:.3}const g=new ke({color:"#ff8b45",emissive:"#ff5a1f",emissiveIntensity:1.4,roughness:.2});for(let p=0;p<18;p++){const x=i()*Ne,M=2+i()*7,_=.25+i()*.9,E=new Y(new Tn(_,0),g);E.position.set(Math.cos(x)*M,1+_,Math.sin(x)*M),E.scale.y=1.5,l.add(E),et(l,"#ff8b45",_*3,E.position.x,E.position.y,E.position.z,.2)}const v=new Y(new Ot(12,1.1),new nt({map:zn(256,64,(p,x,M)=>{const _=p.createLinearGradient(0,0,0,M);_.addColorStop(0,"rgba(255,140,60,0)"),_.addColorStop(.5,"rgba(255,150,70,.85)"),_.addColorStop(1,"rgba(255,80,20,0)"),p.fillStyle=_,p.fillRect(0,0,x,M)}),transparent:!0,blending:je,depthWrite:!1,opacity:.65}));v.rotation.x=-Math.PI/2,v.position.set(-2,.72,-3),v.rotation.z=.5,l.add(v),pn(l,"#ff7a3d",2.4,24,0,3,2),et(l,"#ff8b45",13,0,3,1,.1);const m=[];for(let p=0;p<7;p++){const x=i()*Ne,M=6+i()*8,_=new Y(new En(.5+i()*1.2,0),c);_.position.set(Math.cos(x)*M,3+i()*7,Math.sin(x)*M),_.rotation.set(i()*3,i()*3,0),l.add(_),m.push({m:_,base:_.position.y,phase:i()*Ne})}t.push({x:a,z:r,r:7.5}),n.push((p,x)=>{m.forEach(M=>{M.m.position.y=M.base+Math.sin(x*.6+M.phase)*.35,M.m.rotation.y+=p*.1}),g.emissiveIntensity=1.2+Math.sin(x*2.1)*.2})}function Og(s){const{group:e,colliders:t,anims:n}=s,i=0,a=-132,r=Ke(i,a),o=new Le;o.position.set(i,r,a),e.add(o);const l=oe("#1c1727",{roughness:.9,metalness:.15}),c=oe("#251d33",{roughness:.85});We(o,{rt:6.2,rb:8.6,h:16,seg:10,y:8,mat:l}),We(o,{rt:4.6,rb:6.2,h:18,seg:9,y:24,mat:c}),We(o,{rt:2.4,rb:4.6,h:20,seg:8,y:43,mat:l});const d=new Y(new Ct(2.8,16,8),c);d.position.y=61,o.add(d);const u=[];for(let v=0;v<7;v++){const m=7+v*8.2,p=v<2?8.4-v*.4:v<4?6.2-(v-2)*.55:4.4-(v-4)*.65,x=new Y(new kn(p,.09,4,44),new nt({color:"#b06bff",transparent:!0,opacity:.5,blending:je}));x.rotation.x=Math.PI/2,x.position.y=m,o.add(x),u.push(x),et(o,"#b06bff",8,Math.cos(v)*p*.7,m,Math.sin(v)*p*.7,.12)}for(let v=0;v<5;v++){const m=v/5*Ne,p=Ee(o,{w:1.8,h:13,d:1.4,x:Math.cos(m)*7.4,y:6.5,z:Math.sin(m)*7.4,ry:-m,mat:c});p.rotation.z=.12}We(o,{rt:14,rb:15,h:.9,seg:24,y:.2,mat:oe("#2a2335")});const h=new Y(new Yn(8,9.5,48),new nt({map:$s("#d65cff"),color:"#d65cff",transparent:!0,opacity:.4,side:rt,depthWrite:!1}));h.rotation.x=-Math.PI/2,h.position.y=.75,o.add(h);const f=zd("#d65cff",3.2,.9);f.group.position.set(0,4.6,10.2),o.add(f.group),pn(o,"#b06bff",4,40,0,6,8),et(o,"#b06bff",26,0,8,0,.12);const g=[];for(let v=0;v<10;v++){const m=Math.random()*Ne,p=10+Math.random()*12,x=new Y(new Tn(.5+Math.random()*1.4,0),c);x.position.set(Math.cos(m)*p,4+Math.random()*24,Math.sin(m)*p),x.rotation.set(Math.random()*3,Math.random()*3,0),o.add(x),g.push({m:x,base:x.position.y,phase:Math.random()*Ne,spin:(Math.random()-.5)*.3})}for(let v=0;v<5;v++){const m=Math.random()*Ne;We(o,{rt:.1,rb:.4,h:5+Math.random()*5,seg:5,x:Math.cos(m)*(18+Math.random()*6),y:2.5,z:Math.sin(m)*(18+Math.random()*6),color:"#241d2b",mat:oe("#241d2b")})}t.push({x:i,z:a,r:13}),n.push((v,m)=>{f.uniforms.time.value=m,h.rotation.z=m*.05,u.forEach((p,x)=>{p.material.opacity=.35+Math.sin(m*1.2+x)*.18,p.rotation.z=m*.03*(x%2?1:-1)}),g.forEach(p=>{p.m.position.y=p.base+Math.sin(m*.5+p.phase)*.6,p.m.rotation.y+=v*p.spin})})}function kg(s){const{group:e,anims:t}=s,n=-30,i=14,a=Ke(n,i),r=new Le;r.position.set(n,a,i),e.add(r),We(r,{rt:8.6,rb:9.6,h:.7,seg:32,y:.25,mat:oe("#5a564e")}),We(r,{rt:7.8,rb:8.1,h:.25,seg:32,y:.66,mat:oe("#656159")});const o=new Y(new Yt(7.7,48),new nt({map:$s("#9fe7ff"),transparent:!0,opacity:.5,depthWrite:!1,side:rt}));o.rotation.x=-Math.PI/2,o.position.y=.8,r.add(o);const l=et(r,"#8fe7ff",14,0,.9,0,.15),c=[];for(let h=0;h<4;h++){const f=h/4*Ne+Math.PI/4,g=Math.cos(f)*9.3,v=Math.sin(f)*9.3;We(r,{r:.55,h:3.2,seg:8,x:g,y:1.8,z:v,mat:oe("#59554d")}),Ee(r,{w:1.3,h:.35,d:1.3,x:g,y:3.4,z:v,mat:oe("#6a665d")});const m=Dg(r,g,3.8,v,"#8fe7ff",1);c.push(m),et(r,"#9fe7ff",2.6,g,3.9,v,.3)}for(let h=0;h<8;h++){const f=h/8*Ne;Ee(r,{w:3.1,h:.45,d:.5,x:Math.cos(f)*10.2,y:.75,z:Math.sin(f)*10.2,ry:-f,mat:oe("#4d4a43")})}for(const[h,f,g]of[[-14,22,.5],[16,8,-1.2],[-13,4,1.1]]){const v=new Le;v.position.set(h,Ke(n+h,i+f),f),v.rotation.y=g,r.add(v),Ee(v,{w:3.2,h:.18,d:.7,y:.55,mat:oe("#5a4030")});for(const m of[-1.3,1.3])Ee(v,{w:.18,h:.55,d:.6,x:m,y:.27,mat:oe("#3f2c21")})}We(r,{r:.08,h:6,seg:5,x:11.5,y:3,z:-6,color:"#3b3027"});const d=new Y(new Ot(1.5,3.4),new ke({map:zn(256,512,(h,f,g)=>{h.fillStyle="#3b2b5e",h.fillRect(0,0,f,g),h.fillStyle="#e9c988",h.font="700 180px Georgia, serif",h.textAlign="center",h.fillText("⚔",f/2,280),h.strokeStyle="#e9c988",h.lineWidth=8,h.strokeRect(10,10,f-20,g-20)}),side:rt,roughness:.9}));d.position.set(11.5,4.1,-6),r.add(d);const u=bi("THE DUELLING RING",{font:"700 40px Cinzel, Georgia, serif"});u.scale.set(4,1,1),u.position.set(-13,Ke(n-13,i+10)+2.8,10),u.rotation.y=.7,e.add(u),t.push((h,f)=>{o.material.opacity=.35+Math.sin(f*1.6)*.12,l.material.opacity=.1+Math.sin(f*1.3)*.05,c.forEach((g,v)=>{g.light.intensity=1.25+Math.sin(f*7+v)*.25})})}const Bd=s=>{const e=Fn.find(i=>i.id===s);if(e)return{kind:"woods",kindLabel:"Wood",name:e.name,color:e.light,rarity:e.rarity};const t=On.find(i=>i.id===s);if(t)return{kind:"cores",kindLabel:"Core",name:t.name,color:t.glow,rarity:t.rarity};const n=Oi.find(i=>i.id===s);return n?{kind:"materials",kindLabel:"Material",name:n.name,color:n.color,rarity:n.rarity}:{kind:"materials",kindLabel:"Reagent",name:s,color:"#ffffff",rarity:"common"}},zg={common:"#aaa69a",uncommon:"#8fd18a",rare:"#6fb8ff",epic:"#c395ff",legendary:"#ffc96b"};function Bg(s,e={}){const t=new Le;s.add(t);const n={time:{value:0}},i=new dn({side:tn,depthWrite:!1,fog:!1,uniforms:n,vertexShader:"varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }",fragmentShader:`
      varying vec3 vDir; uniform float time;
      void main(){
        float h = clamp(vDir.y, -1.0, 1.0);
        vec3 bottom = vec3(0.055, 0.04, 0.10);
        vec3 horizon = vec3(0.30, 0.16, 0.30);
        vec3 mid = vec3(0.115, 0.075, 0.21);
        vec3 top = vec3(0.025, 0.02, 0.075);
        vec3 col = mix(horizon, mid, smoothstep(0.0, 0.28, h));
        col = mix(col, top, smoothstep(0.25, 0.8, h));
        col = mix(bottom, col, smoothstep(-0.35, 0.01, h));
        // warm glow low on the north-west horizon
        vec3 sunDir = normalize(vec3(-0.55, 0.08, -0.83));
        float d = max(dot(vDir, sunDir), 0.0);
        float sun = pow(d, 10.0);
        col += vec3(1.0, 0.48, 0.24) * sun * 0.42;
        col += vec3(1.0, 0.72, 0.45) * pow(d, 60.0) * 0.55;
        // soft cloud bands
        float band = sin(vDir.x * 6.0 + vDir.z * 4.0 + vDir.y * 9.0 + time * 0.015);
        col += vec3(0.15, 0.09, 0.19) * smoothstep(0.5, 1.0, band) * smoothstep(0.4, 0.8, h) * 0.15;
        gl_FragColor = vec4(col, 1.0);
      }`}),a=new Y(new Mt(420,32,24),i);t.add(a);const r=new _t,o=700,l=new Float32Array(o*3),c=new Float32Array(o*3),d=cn(12345);for(let y=0;y<o;y++){const b=d()*Ne,P=Math.acos(1-d()*.85),I=350;l[y*3]=Math.sin(P)*Math.cos(b)*I*(.5+d()*.5),l[y*3+1]=Math.cos(P)*I*.9+30,l[y*3+2]=Math.sin(P)*Math.sin(b)*I;const O=d();c[y*3]=.7+O*.3,c[y*3+1]=.72+O*.22,c[y*3+2]=1}r.setAttribute("position",new Ft(l,3)),r.setAttribute("color",new Ft(c,3));const u=new oi(r,new $n({size:1.1,vertexColors:!0,transparent:!0,opacity:.85,depthWrite:!1,fog:!1,blending:je,sizeAttenuation:!0}));u.frustumCulled=!1,t.add(u);const h=new Le;h.position.set(-118,96,-240);const f=new Y(new Mt(15,24,18),new nt({color:"#f4ecd8",fog:!1}));h.add(f);const g=new Un(new Sn({map:qt(),color:"#cfd8ff",transparent:!0,opacity:.5,blending:je,depthWrite:!1,fog:!1}));g.scale.set(90,90,1),h.add(g);const v=new Y(new Yn(17,30,40),new nt({color:"#c9d4ff",transparent:!0,opacity:.06,side:rt,depthWrite:!1,blending:je,fog:!1}));h.add(v),t.add(h);const m=new Le,p=()=>new dn({transparent:!0,depthWrite:!1,side:rt,blending:je,fog:!1,uniforms:{time:{value:0}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
      varying vec2 vUv; uniform float time;
      void main(){
        float edge = smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.55, vUv.y);
        float curtain = sin(vUv.x * 22.0 + time * 0.25) * 0.5 + 0.5;
        curtain *= sin(vUv.x * 9.0 - time * 0.16 + 1.7) * 0.35 + 0.65;
        float flow = sin(vUv.x * 4.0 + time * 0.1) * 0.5 + 0.5;
        vec3 col = mix(vec3(0.20,0.85,0.65), vec3(0.55,0.35,1.0), flow);
        col = mix(col, vec3(0.9,0.4,0.8), sin(vUv.x * 3.0 + 2.0) * 0.5 + 0.5);
        float alpha = edge * (0.10 + curtain * 0.30) * (0.5 + 0.5 * sin(vUv.y * 10.0 - time * 0.4));
        gl_FragColor = vec4(col, alpha);
      }`}),x=new Y(new Ot(260,52,1,1),p());x.position.set(-30,95,-260),x.rotation.x=-.18,m.add(x);const M=new Y(new Ot(200,38,1,1),p());M.position.set(120,110,-250),M.rotation.set(-.14,.5,.06),m.add(M),t.add(m);const _=new Le,E=cn(880),T=oe("#1b1629",{roughness:1});for(let y=0;y<34;y++){const b=y/34*Ne+E()*.12,P=185+E()*55,I=22+E()*55,O=new Y(new Ct(18+E()*22,I,5),T);O.position.set(Math.cos(b)*P,I/2-8,Math.sin(b)*P),O.rotation.y=E()*3,_.add(O)}return t.add(_),{group:t,update(y){n.time.value=y,x.material.uniforms.time.value=y,M.material.uniforms.time.value=y,h.rotation.y=Math.sin(y*.02)*.02,u.rotation.y=y*.003}}}function Hg(){const s={time:{value:0},deep:{value:new Oe("#0b2636")},shallow:{value:new Oe("#2c7a83")},moon:{value:new Oe("#cfe6ff")}},e=new dn({transparent:!0,depthWrite:!1,uniforms:s,vertexShader:"varying vec2 vUv; varying vec3 vPos; void main(){ vUv=uv; vPos=(modelMatrix*vec4(position,1.0)).xyz; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`
      varying vec2 vUv; varying vec3 vPos; uniform float time; uniform vec3 deep, shallow, moon;
      void main(){
        vec2 p = vUv - 0.5;
        float r = length(p) * 2.0;
        float wave = sin(p.x * 42.0 + time * 1.1) * sin(p.y * 36.0 - time * 0.8);
        float wave2 = sin((p.x + p.y) * 90.0 + time * 1.7) * 0.5;
        float ripple = wave * 0.5 + wave2 * 0.25;
        vec3 col = mix(deep, shallow, smoothstep(0.15, 0.95, r) * 0.55 + ripple * 0.08);
        float sparkle = pow(max(0.0, ripple), 12.0) * (1.0 - r) * 0.8;
        col += moon * sparkle;
        float shore = smoothstep(0.78, 1.0, r);
        col = mix(col, vec3(0.09,0.14,0.17), shore * 0.55);
        float alpha = 0.88 - shore * 0.15;
        gl_FragColor = vec4(col, alpha);
      }`}),t=new Y(new Yt(46,64),e);return t.rotation.x=-Math.PI/2,t.position.set(52,.05,78),t.renderOrder=2,{mesh:t,uniforms:s}}function Vr(s,e,t,n,i){const a=new Le;a.position.set(s,e,t);const r=oe("#3a3348",{roughness:1}),o=new Y(new En(5,1),r);o.scale.set(1.6,2.1,1.3),a.add(o);const l=new Y(new ht(7.4,6.2,.9,9),oe("#3c5334",{roughness:1}));l.position.y=4.6,a.add(l);const c=new Y(new ht(7.6,7.5,.3,9),oe("#5b4d38"));c.position.y=4.1,a.add(c),nl(a,0,0,i,{n:3,spread:4.5,scale:.8,conifer:!0}),et(a,"#9fe7ff",5,0,4.2,0,.2);const d=zn(64,256,(f,g,v)=>{const m=f.createLinearGradient(0,0,0,v);m.addColorStop(0,"rgba(170,235,255,.55)"),m.addColorStop(.7,"rgba(140,210,255,.2)"),m.addColorStop(1,"rgba(140,210,255,0)"),f.fillStyle=m,f.fillRect(0,0,g,v);for(let p=0;p<20;p++)f.fillStyle=`rgba(220,245,255,${.1+Math.random()*.3})`,f.fillRect(Math.random()*g,Math.random()*v,1+Math.random()*2,8+Math.random()*30)}),u=new Y(new Ot(2.6,14),new nt({map:d,transparent:!0,depthWrite:!1,blending:je,opacity:.7,side:rt}));u.position.set(2.4,-4,4.2),u.rotation.x=.1,a.add(u);const h=new Y(new Tn(1.1,0),new ke({color:"#8f7bff",emissive:"#6f4bff",emissiveIntensity:1.1,roughness:.2}));return h.position.set(-3.2,5.9,1.5),h.scale.y=2.2,a.add(h),a.scale.setScalar(n),{g:a,fall:u,baseY:e}}function Gg(s,e){const t=Bd(s),n=new Le,i=zg[t.rarity]||"#e9c988";if(e==="woods"){We(n,{rt:.38,rb:.55,h:.7,seg:7,y:.35,mat:oe("#4d3626",{roughness:1})});for(let c=0;c<3;c++){const d=c/3*Ne+.4,u=We(n,{rt:.06,rb:.12,h:1.8,seg:5,x:Math.cos(d)*.28,y:.95,z:Math.sin(d)*.28,mat:oe("#5b4130")});u.rotation.z=Math.cos(d)*.55,u.rotation.x=Math.sin(d)*.55;const h=new Y(new Gi(.28,0),oe(t.color,{emissive:t.color,emissiveIntensity:.25,roughness:.9}));h.position.set(Math.cos(d)*.85,1.6,Math.sin(d)*.85),n.add(h)}const l=new Y(new ht(.36,.36,.04,7),new ke({color:t.color,emissive:t.color,emissiveIntensity:.3}));l.position.y=.72,n.add(l)}else if(e==="cores"){const l=new Y(new kn(.55,.16,6,14),oe("#4b3b2b"));l.rotation.x=Math.PI/2,l.position.y=.2,n.add(l);for(let d=0;d<4;d++){const u=d/4*Ne,h=We(n,{r:.03,h:1.1,seg:3,x:Math.cos(u)*.5,y:.18,z:Math.sin(u)*.5,mat:oe("#5a4832")});h.rotation.z=Math.cos(u)*1.1,h.rotation.x=Math.sin(u)*1.1}const c=new Y(new Ct(.18,1,5),new ke({color:t.color,emissive:t.color,emissiveIntensity:.6,roughness:.4}));c.position.y=.85,c.rotation.z=.3,n.add(c)}else{for(let l=0;l<5;l++){const c=l/5*Ne,d=.5+Math.random()*1.2,u=new Y(new Tn(.22+Math.random()*.16,0),new ke({color:t.color,emissive:t.color,emissiveIntensity:.9,roughness:.15,metalness:.2}));u.position.set(Math.cos(c)*.3,d*.6,Math.sin(c)*.3),u.scale.y=2,n.add(u)}We(n,{rt:.25,rb:.45,h:.25,seg:6,y:.1,mat:oe("#4a4550")})}const a=new Y(new ht(.06,.16,7,6,1,!0),new nt({color:i,transparent:!0,opacity:.16,blending:je,depthWrite:!1,side:rt}));a.position.y=3.8,n.add(a);const r=et(n,t.color,2.4,0,.7,0,.32),o=new Y(new Yn(.65,1,26),new nt({color:i,transparent:!0,opacity:.25,side:rt,depthWrite:!1}));return o.rotation.x=-Math.PI/2,o.position.y=.05,n.add(o),{g:n,beam:a,halo:r,ring:o,color:t.color}}function Vg(s){const e=cn(50505),t=new Le;s.add(t);const n=[],i=[],a={group:t,colliders:n,anims:i,smokeSources:[]};s.fog=new ja("#2a2240",.0062),s.background=new Oe("#0b0716");const r=new gd("#9a8ad4","#202422",.95);s.add(r);const o=new Io("#ffd7ae",2.1);o.position.set(-70,95,40),o.castShadow=!0,o.shadow.mapSize.set(2048,2048),o.shadow.camera.near=10,o.shadow.camera.far=260,o.shadow.camera.left=-75,o.shadow.camera.right=75,o.shadow.camera.top=75,o.shadow.camera.bottom=-75,o.shadow.bias=-8e-4,o.shadow.normalBias=.03,s.add(o),s.add(o.target),o.target.position.set(0,0,20);const l=new Io("#7a6bd8",.55);l.position.set(70,40,-80),s.add(l);const c=new _d("#4a3d68",.35);s.add(c);const d=Bg(s),u=Hg();t.add(u.mesh);const h=new Ot(300,300,128,128);h.rotateX(-Math.PI/2);const f=h.attributes.position;for(let A=0;A<f.count;A++){const H=f.getX(A),J=f.getZ(A);f.setY(A,Ke(H,J))}h.computeVertexNormals();const g=new Y(h,new ke({map:wg(),roughness:.98,metalness:0}));g.receiveShadow=!0,t.add(g);const v=new Y(new Yt(45,32),new nt({color:"#12232c",transparent:!0,opacity:.75}));v.rotation.x=-Math.PI/2,v.position.set(52,-4.5,78),t.add(v);const m=new Y(new Yn(45.2,47.5,64),new nt({color:"#b9e6e8",transparent:!0,opacity:.07,side:rt,depthWrite:!1}));m.rotation.x=-Math.PI/2,m.position.set(52,.12,78),t.add(m);const p=cn(4242),x=[],M=[{x:52,z:-36,r:48,density:.95},{x:-64,z:-44,r:46,density:.35},{x:0,z:46,r:40,density:.25},{x:-78,z:82,r:42,density:.3},{x:112,z:-88,r:44,density:.35},{x:104,z:66,r:36,density:.2},{x:0,z:-132,r:40,density:.25}];for(let A=0;A<420;A++){const H=M[Math.floor(p()*M.length)],J=p()*Ne,K=Math.sqrt(p())*H.r,D=H.x+Math.cos(J)*K,V=H.z+Math.sin(J)*K;Math.hypot(D-52,V-78)<40&&p()>.25||Math.hypot(D-0,V-46)<16||Math.hypot(D+64,V+44)<18||Math.hypot(D-52,V+36)<10||p()>H.density||Ke(D,V)<-.8||x.push({x:D,z:V,s:.65+p()*.9,rot:p()*Ne,conifer:p()>.52,tint:p()})}const _=new ht(.16,.3,4.2,5),E=oe("#4a3428",{roughness:1}),T=new As(_,E,x.length),y=new Gi(1.65,0),b=new ke({color:"#ffffff",roughness:1,flatShading:!0,vertexColors:!1}),P=new As(y,b,x.length*2),I=new Ct(1.55,3.4,7),O=new As(I,b,x.length);new ut;const k=new wt,Z=["#2b4429","#33502f","#3b5a34","#263d28","#44603a","#314b33"];let R=0,U=0;x.forEach((A,H)=>{const J=Ke(A.x,A.z);k.position.set(A.x,J+2.1*A.s,A.z),k.rotation.set(0,A.rot,0),k.scale.setScalar(A.s),k.updateMatrix(),T.setMatrixAt(H,k.matrix),A.conifer&&(k.position.set(A.x,J+4.4*A.s,A.z),k.rotation.set(0,A.rot,0),k.scale.set(A.s*1,A.s*1.3,A.s),k.updateMatrix(),O.setMatrixAt(U,k.matrix),O.setColorAt(U,new Oe(Z[(H+1)%Z.length])),U++),k.position.set(A.x,J+4.6*A.s,A.z),k.rotation.set(A.rot*.2,A.rot,0),k.scale.set(A.s*(.9+A.tint*.35),A.s*(.8+A.tint*.25),A.s*(.9+A.tint*.3)),k.updateMatrix(),P.setMatrixAt(R,k.matrix),P.setColorAt(R,new Oe(wn(Z))),R++,k.position.set(A.x+.8*A.s,J+3.8*A.s,A.z-.5*A.s),k.scale.set(A.s*.62,A.s*.55,A.s*.62),k.updateMatrix(),P.setMatrixAt(R,k.matrix),P.setColorAt(R,new Oe(wn(Z))),R++}),P.count=R,O.count=U,T.castShadow=!1,P.castShadow=!1,O.castShadow=!1,T.receiveShadow=!0,t.add(T,P,O);const F=new En(1,0),z=new As(F,oe("#4b4b54",{roughness:1}),60);for(let A=0;A<60;A++){const H=e()*Ne,J=15+e()*120,K=Math.cos(H)*J,D=Math.sin(H)*J,V=Ke(K,D);k.position.set(K,V+.2,D),k.rotation.set(e()*3,e()*3,e()*3),k.scale.set(.4+e()*1.5,.3+e()*.9,.4+e()*1.4),k.updateMatrix(),z.setMatrixAt(A,k.matrix)}z.castShadow=!1,z.receiveShadow=!0,t.add(z),Sg(a),Pg(a),Lg(a),Ig(a),Ng(a),Ug(a),Fg(a),Og(a),kg(a);const j=[[[0,42],[-16,30],[-34,18],[-53,-6],[-62,-26]],[[0,42],[18,34],[32,18],[42,-2],[50,-22],[52,-32]],[[0,42],[22,50],[36,60],[46,68]],[[0,42],[-22,54],[-44,64],[-62,74],[-74,80]],[[0,42],[30,46],[58,52],[86,60],[100,65]],[[100,65],[108,40],[110,5],[110,-40],[112,-80]],[[0,42],[4,12],[2,-25],[0,-65],[0,-108]],[[-16,30],[2,27],[18,25]]],W=new ht(1.1,1.25,.1,7),te=oe("#67635a",{roughness:.95}),se=[];for(const A of j){const H=new fd(A.map(([J,K])=>new L(J,0,K)));for(let J=0;J<60;J++){const K=H.getPoint(J/60);Ke(K.x,K.z)<.2||Math.hypot(K.x,K.z-46)<13||Math.hypot(K.x+64,K.z+44)<17||se.push({x:K.x+(e()-.5)*.7,z:K.z+(e()-.5)*.7,r:e()*Ne,s:.5+e()*.5})}}const Me=new As(W,te,se.length);se.forEach((A,H)=>{k.position.set(A.x,Ke(A.x,A.z)+.06,A.z),k.rotation.set(0,A.r,0),k.scale.set(A.s,1,A.s*(.8+e()*.5)),k.updateMatrix(),Me.setMatrixAt(H,k.matrix)}),Me.receiveShadow=!0,t.add(Me);const Ue=[Vr(-120,48,-110,1.25,cn(17)),Vr(135,38,-120,1,cn(33)),Vr(120,58,20,.8,cn(51))];for(const A of Ue)t.add(A.g);const ne=[{x:-9,z:55,item:"oak"},{x:6,z:38,item:"oak"},{x:-21,z:39,item:"willow"},{x:18,z:55,item:"unicorn"},{x:-17,z:64,item:"willow"},{x:7,z:62,item:"moonstone"},{x:42,z:-20,item:"holly"},{x:35,z:-44,item:"moonwillow"},{x:66,z:-26,item:"moonwillow"},{x:58,z:-52,item:"thestral"},{x:28,z:-30,item:"unicorn"},{x:70,z:-14,item:"hawthorn"},{x:45,z:-60,item:"coral"},{x:75,z:-40,item:"augurey"},{x:39,z:-55,item:"thunderbird"},{x:38,z:66,item:"coral"},{x:64,z:70,item:"pearl"},{x:48,z:58,item:"willow"},{x:-46,z:-22,item:"silverlime"},{x:-72,z:-20,item:"phoenix"},{x:-86,z:-32,item:"runeetch"},{x:-54,z:68,item:"ebony"},{x:-84,z:74,item:"thestral"},{x:-70,z:96,item:"basilisk"},{x:-92,z:88,item:"runeetch"},{x:-66,z:90,item:"augurey"},{x:94,z:56,item:"starfall"},{x:112,z:52,item:"frostpine"},{x:118,z:74,item:"starlight"},{x:96,z:78,item:"thunderbird"},{x:108,z:82,item:"voidsalt"},{x:102,z:-70,item:"sunwood"},{x:120,z:-78,item:"dragon"},{x:88,z:-82,item:"emberresin"},{x:108,z:-104,item:"phoenix"},{x:124,z:-96,item:"stariron"},{x:98,z:-96,item:"chimaera"},{x:132,z:-70,item:"emberoak"},{x:10,z:-116,item:"voidbriar"},{x:-12,z:-120,item:"wraithglass"},{x:14,z:-140,item:"starlight"},{x:-8,z:-148,item:"voidsalt"},{x:2,z:-104,item:"frostpine"}],ce=[],we=new Le;t.add(we),ne.forEach((A,H)=>{const J=Bd(A.item),K=Ke(A.x,A.z);if(K<-1.5)return;const D=Gg(A.item,J.kind);D.g.position.set(A.x,K+.05,A.z),D.g.rotation.y=e()*Ne,we.add(D.g);const V={id:`node-${H}`,x:A.x,z:A.z,y:K+.05,item:A.item,kind:J.kind,label:`Gather ${J.name}`,info:J,mesh:D.g,beam:D.beam,halo:D.halo,ring:D.ring,active:!0,respawnAt:0,phase:e()*Ne,radius:3};ce.push(V)});const Ae=[],ve=[{id:"orin",name:"Master Orin Vale",sub:"Wandmaker of Emberfall",x:-4,z:33.5,robe:"#5b4430",accent:"#c9a25f",hair:"#cfc4b0",face:.2,hat:!0},{id:"mira",name:"Mira Fen",sub:"Village Elder",x:6,z:43.5,robe:"#3d4d5f",accent:"#7fb3c9",hair:"#9a8b7a",face:-1.2,hat:!1},{id:"reed",name:"Professor Cassian Reed",sub:"Charms & Combat",x:-56,z:-25,robe:"#34405e",accent:"#c9b37d",hair:"#2a2020",face:1.9,hat:!0},{id:"sable",name:"Duel Captain Sable",sub:"Master of the Ring",x:-21,z:17.5,robe:"#4a2f38",accent:"#c98d7a",hair:"#1e1818",face:-2.3,hat:!1},{id:"keeper",name:"The Keeper",sub:"Black Archive",x:-79,z:-31,robe:"#241d33",accent:"#a06bff",hair:"#d8d2c8",face:.7,hat:!0}];for(const A of ve){const H=Ke(A.x,A.z),J=Za({robe:A.robe,accent:A.accent,hair:A.hair,name:A.name,subtitle:A.sub,hat:A.hat,scale:1});J.group.position.set(A.x,H,A.z),J.group.rotation.y=A.face,t.add(J.group);const K=new Le,D=new Y(new Tn(.15,0),new nt({color:"#ffd27a"}));K.add(D);const V=et(K,"#ffd27a",.9,0,0,0,.5);K.position.set(A.x,H+2.85,A.z),t.add(K),Ae.push({...A,y:H,wiz:J,marker:K,phase:e()*Ne,markerGlow:V})}const me=[];let ze=0;function xe(A){const H=A.y??Ke(A.x,A.z),J={id:`int-${ze++}`,y:H,radius:3.2,marker:null,...A};if(!A.noMarker){const K=new Le;K.position.set(J.x,H+(A.markerHeight||2),J.z);const D=new Y(new Tn(.16,0),new nt({color:A.markerColor||"#e9c988"}));K.add(D),et(K,A.markerColor||"#e9c988",1.1,0,0,0,.5),t.add(K),J.marker=K}return me.push(J),J}const qe={x:-7.8,z:35.2},lt=Ke(qe.x,qe.z),Ge=new Le;Ge.position.set(qe.x,lt,qe.z),Ge.rotation.y=.7,t.add(Ge),Ee(Ge,{w:2.5,h:.14,d:1.2,y:.95,mat:oe("#5b4030")});for(const[A,H]of[[-1.1,-.45],[1.1,-.45],[-1.1,.45],[1.1,.45]])Ee(Ge,{w:.15,h:.95,d:.15,x:A,y:.5,z:H,mat:oe("#3e2b20")});for(let A=0;A<5;A++){const H=We(Ge,{r:.025,h:.9,seg:4,x:-.9+A*.22,y:1.18,z:-.3,color:"#7a5536"});H.rotation.z=.2+A*.05,et(Ge,["#ffd27a","#9fe7ff","#c9a2ff"][A%3],.4,-.9+A*.22,1.62,-.3,.4)}We(Ge,{r:.16,h:.3,seg:8,x:.75,y:1.18,z:-.15,mat:oe("#3c3550")}),et(Ge,"#9fe7ff",1,.75,1.4,-.15,.5),Ee(Ge,{w:.6,h:.03,d:.45,x:.3,y:1.03,z:.25,mat:oe("#d7c9a5")}),xe({type:"craft",label:"Use the wandmaker's bench",x:qe.x,z:qe.z,markerColor:"#ffc97d",markerHeight:2.1,icon:"⚒"}),xe({type:"shop",label:"Enter the wand shop",x:-11.4,z:32.6,markerColor:"#ffd27a",markerHeight:2.4,icon:"◉"}),xe({type:"lessons",label:"Enter Aurelian Academy",x:-64,z:-25,markerColor:"#c9a2ff",markerHeight:3.3,icon:"✦"}),xe({type:"duel",label:"Step into the duelling circle",x:-30,z:14,markerColor:"#ff8c9a",markerHeight:2.2,icon:"⚔"});const St={x:-1,z:52},Lt=Ke(St.x,St.z),It=new Le;It.position.set(St.x,Lt,St.z),It.rotation.y=.2,t.add(It);for(const A of[-1,1])Ee(It,{w:.13,h:2.2,d:.13,x:A,y:1.1,mat:oe("#4a3528")});Ee(It,{w:2.5,h:1.6,d:.15,y:1.9,mat:oe("#4a3528")});for(let A=0;A<4;A++)Ee(It,{w:.5,h:.62,d:.03,x:-.85+A*.55,y:1.9+A%2*.15,z:.1,mat:oe(A%2?"#d7c9a5":"#b9ab8d"),rz:(A%2-.5)*.08});xe({type:"quests",label:"Read the quest board",x:St.x,z:St.z,markerColor:"#e9c988",markerHeight:3.1,icon:"❖"}),xe({type:"lake",label:"Gaze into Mirrormere",x:39,z:69,markerColor:"#7de6d0",markerHeight:1.6,icon:"≋"}),xe({type:"duel",label:"Touch the Warden's seal",x:-78,z:82,markerColor:"#8fe7ff",markerHeight:3.2,icon:"⚔",data:{enemy:"warden"}}),xe({type:"cache",label:"Harvest the crystal bloom",x:94,z:58,markerColor:"#b58cff",markerHeight:1.8,icon:"◆"}),xe({type:"lore",label:"Study the dragon remains",x:110,z:-84,markerColor:"#ffb05a",markerHeight:2.2,icon:"☾"}),xe({type:"duel",label:"Enter the Veiled Spire",x:0,z:-120,markerColor:"#d65cff",markerHeight:3.2,icon:"☾",data:{enemy:"malachar"}});for(const A of Ae)xe({type:"npc",label:`Speak with ${A.name}`,x:A.x,z:A.z,markerColor:"#ffd27a",markerHeight:2.2,icon:"◉",data:{npc:A.id}});const gt=[],yn=[{zone:"ruins",x:-58,z:62,ry:.8},{zone:"caverns",x:88,z:58,ry:-1},{zone:"crag",x:106,z:-64,ry:.2},{zone:"spire",x:0,z:-102,ry:0}];for(const A of yn){const H=li.find(N=>N.id===A.zone),J=Ke(A.x,A.z),K=new Le;K.position.set(A.x,J,A.z),K.rotation.y=A.ry,t.add(K);const D=new dn({transparent:!0,depthWrite:!1,side:rt,uniforms:{time:{value:0},color:{value:new Oe(H.color)}},vertexShader:"varying vec2 vUv; void main(){ vUv=uv; gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`varying vec2 vUv; uniform float time; uniform vec3 color;
        void main(){ float grid = smoothstep(0.0,0.05,abs(sin(vUv.x*30.0)))+smoothstep(0.0,0.05,abs(sin(vUv.y*14.0+time)));
          float a = (0.10 + grid*0.08) * smoothstep(0.0,0.1,vUv.x)*smoothstep(1.0,0.9,vUv.x)*smoothstep(0.0,0.15,vUv.y);
          gl_FragColor = vec4(color, a); }`}),V=new Y(new Ot(11,5.5),D);V.position.y=2.9,K.add(V);for(const N of[-5.4,5.4])We(K,{r:.35,h:5.2,seg:6,x:N,y:2.6,color:"#3c3542"});Ee(K,{w:11.6,h:.4,d:.6,y:5.3,mat:oe("#3c3542")});const ae=bi(`${H.name.toUpperCase()}`,{font:"700 34px Cinzel, Georgia, serif",border:"rgba(233,201,136,.25)"});ae.scale.set(4.2,1.05,1),ae.position.set(0,4.5,.25),K.add(ae),gt.push({zone:H,group:K,wall:V,mat:D}),xe({type:"gate",label:`${H.name} — requires ${H.req} reputation`,x:A.x,z:A.z,markerColor:H.color,markerHeight:6,icon:"◈",data:{zone:H.id},noMarker:!1})}const Pt=[],hn=qt();for(const A of a.smokeSources||[])for(let H=0;H<6;H++){const J=new Sn({map:hn,color:"#8f8398",transparent:!0,opacity:0,depthWrite:!1}),K=new Un(J);K.scale.setScalar(.7+Math.random()*.6),A.getWorldPosition(K.position),t.add(K),Pt.push({s:K,origin:A,t:Math.random()*4,speed:.5+Math.random()*.4,offset:Math.random()*Ne})}const Kt=420,Wt=new Float32Array(Kt*3),G=new Float32Array(Kt);for(let A=0;A<Kt;A++){const H=e()*Ne,J=6+e()*95;Wt[A*3]=Math.cos(H)*J,Wt[A*3+1]=e()*9+.4,Wt[A*3+2]=46+Math.sin(H)*J,G[A]=e()*Ne}const sn=new _t;sn.setAttribute("position",new Ft(Wt,3));const vt=new oi(sn,new $n({map:qt(),color:"#ffe6b0",size:.28,transparent:!0,opacity:.6,depthWrite:!1,blending:je}));vt.frustumCulled=!1,t.add(vt);const xt=140,fe=[],Et=new Float32Array(xt*3),Ie=cn(999);for(let A=0;A<xt;A++){const H=A<90?{x:52,z:-36,r:44}:{x:45,z:72,r:32},J=Ie()*Ne,K=Ie()*H.r,D=H.x+Math.cos(J)*K,V=H.z+Math.sin(J)*K,ae=Ke(D,V)+.8+Ie()*4;fe.push({x:D,z:V,y:ae,phase:Ie()*Ne,amp:.4+Ie()*1.4,speed:.4+Ie()*.8}),Et[A*3]=D,Et[A*3+1]=ae,Et[A*3+2]=V}const Be=new _t;Be.setAttribute("position",new Ft(Et,3));const C=new oi(Be,new $n({map:qt(),color:"#b8ffd9",size:.34,transparent:!0,opacity:.85,depthWrite:!1,blending:je}));C.frustumCulled=!1,t.add(C);const w=new Le;for(let A=0;A<5;A++){const H=new Y(new Ot(2+Math.random()*3,36),new nt({color:"#ffd9a0",transparent:!0,opacity:.035,blending:je,depthWrite:!1,side:rt}));H.position.set(-90+Math.random()*30,22,-80+A*35),H.rotation.set(-.2,.6,.5),w.add(H)}t.add(w);const $={group:t,scene:s,colliders:n,nodes:ce,npcs:Ae,interactables:me,gates:gt,zones:li,spawn:new L(2.5,Ke(2.5,39)+.03,39),heightAt:Ke,sky:d,water:u,smokeSprites:Pt,getZone(A,H){let J=null,K=1/0;for(const D of li){const V=Math.hypot(A-D.x,H-D.z);V<D.r&&V<K&&(J=D,K=V)}return J||{id:"wilds",name:"The Wilds",color:"#e9c988",req:0}},nearestNode(A,H=3.2){let J=null,K=H;for(const D of ce){if(!D.active)continue;const V=Math.hypot(A.x-D.x,A.z-D.z);V<K&&(J=D,K=V)}return J},nearestInteract(A,H=3.4){let J=null,K=H;for(const D of me){const V=Math.hypot(A.x-D.x,A.z-D.z);V<K&&(J=D,K=V)}return J},gather(A){return A.active?(A.active=!1,A.mesh.visible=!1,A.respawnAt=performance.now()+45e3+Math.random()*25e3,{kind:A.info.kind,id:A.item,info:A.info}):null},setReputation(A){for(const H of gt)H.group.visible=A<H.zone.req},collide(A,H=.42){for(const K of n){const D=A.x-K.x,V=A.z-K.z,ae=Math.hypot(D,V),N=K.r+H;ae<N&&ae>1e-4&&(A.x=K.x+D/ae*N,A.z=K.z+V/ae*N)}if(Ke(A.x,A.z)<-1.6){const K=Math.hypot(A.x,A.z)||1;A.x-=A.x/K*.16,A.z-=A.z/K*.16}const J=Math.hypot(A.x,A.z);J>138&&(A.x*=138/J,A.z*=138/J),A.y=Ke(A.x,A.z)+.03},update(A,H,J){d.update(H),u.uniforms.time.value=H;for(const D of i)D(A,H);for(const D of Ue)D.g.position.y=D.baseY+Math.sin(H*.14+D.g.position.x)*1.6,D.fall.material.map.offset.y-=A*.4;for(const D of ce){if(!D.active){performance.now()>D.respawnAt&&(D.active=!0,D.mesh.visible=!0);continue}Math.hypot(J.x-D.x,J.z-D.z)<40&&(D.mesh.rotation.y+=A*.25,D.beam.material.opacity=.12+Math.sin(H*1.7+D.phase)*.05,D.halo.material.opacity=.22+Math.sin(H*2.1+D.phase)*.09,D.ring.rotation.z+=A*.4)}for(const D of Ae)D.wiz.update(A,!1),D.wiz.group.rotation.y=D.face+Math.sin(H*.4+D.phase)*.12,D.marker.position.y=D.y+2.85+Math.sin(H*1.8+D.phase)*.08,D.marker.rotation.y=H*.8,D.markerGlow.material.opacity=.35+Math.sin(H*2+D.phase)*.15;for(const D of me)D.marker&&(D.marker.position.y=D.y+(D.markerHeight||2)+Math.sin(H*1.6+D.x)*.09,D.marker.rotation.y=H*.7);const K=Be.attributes.position.array;for(let D=0;D<xt;D++){const V=fe[D];K[D*3]=V.x+Math.sin(H*V.speed+V.phase)*V.amp,K[D*3+1]=V.y+Math.sin(H*V.speed*1.4+V.phase*2)*.5,K[D*3+2]=V.z+Math.cos(H*V.speed*.8+V.phase)*V.amp}Be.attributes.position.needsUpdate=!0,vt.rotation.y=Math.sin(H*.01)*.02;for(const D of Pt){D.t+=A*D.speed,D.t>4&&(D.t=0);const V=D.t/4;D.s.position.set(D.origin.position.x+Math.sin(H+D.offset)*(.2+V),D.origin.position.y+V*5,D.origin.position.z+Math.cos(H*.7+D.offset)*(.2+V)),D.s.material.opacity=Math.sin(V*Math.PI)*.14,D.s.scale.setScalar(.6+V*1.8)}for(const D of gt)D.mat.uniforms.time.value=H;m.material.opacity=.055+Math.sin(H*.9)*.02,w.rotation.y=Math.sin(H*.03)*.02}};return $.setReputation(0),$}const Ln=(s,e)=>s+Math.random()*(e-s);class Wg{constructor(e){this.scene=e,this.items=[],this.orbs=[],this.shakeAmt=0}setScene(e){this.clear(),this.scene=e,this.shakeAmt=0}clear(){for(const e of[...this.items,...this.orbs])e.group?.parent?e.group.parent.remove(e.group):e.mesh?.parent&&e.mesh.parent.remove(e.mesh);this.items=[],this.orbs=[]}addObject(e,t,n=1/0){this.scene.add(e);const i={group:e,update:t,ttl:n,age:0};return this.items.push(i),i}shake(e){this.shakeAmt=Math.min(1.4,this.shakeAmt+e)}update(e){this.shakeAmt=Math.max(0,this.shakeAmt-e*2.6);for(let t=this.items.length-1;t>=0;t--){const n=this.items[t];n.age+=e,n.update?.(e,n.age),n.age>=n.ttl&&(n.group.parent?.remove(n.group),this.items.splice(t,1))}for(let t=this.orbs.length-1;t>=0;t--){const n=this.orbs[t];n.age+=e,n.trailTimer-=e,n.trailTimer<=0&&(n.trailTimer=.018,n.history.unshift(n.group.position.clone()),n.history.length>16&&n.history.pop());const i=n.trail.geometry.attributes.position.array;n.history.forEach((a,r)=>{i[r*3]=a.x,i[r*3+1]=a.y,i[r*3+2]=a.z});for(let a=n.history.length;a<16;a++){const r=n.history[n.history.length-1]||n.group.position;i[a*3]=r.x,i[a*3+1]=r.y,i[a*3+2]=r.z}n.trail.geometry.attributes.position.needsUpdate=!0,n.halo.material.opacity=.6+Math.sin(n.age*22)*.18,n.group.rotation.z+=e*5}}createOrb(e="#ffe0a0",t=.16){const n=new Le,i=new Y(new Mt(t,10,8),new nt({color:"#fff8ea"}));n.add(i);const a=new Y(new Mt(t*1.5,10,8),new nt({color:e,transparent:!0,opacity:.4,blending:je,depthWrite:!1}));n.add(a);const r=new Un(new Sn({map:qt(),color:e,transparent:!0,opacity:.8,blending:je,depthWrite:!1}));r.scale.setScalar(t*14),n.add(r);const o=new oi(new _t().setAttribute("position",new Ft(new Float32Array(48),3)),new $n({map:qt(),color:e,size:t*5,transparent:!0,opacity:.5,blending:je,depthWrite:!1}));o.frustumCulled=!1,this.scene.add(o),this.scene.add(n);const l={group:n,core:i,shell:a,halo:r,trail:o,history:[],trailTimer:0,age:0,color:e,size:t};return this.orbs.push(l),l}removeOrb(e){e.group.parent?.remove(e.group),e.trail.parent?.remove(e.trail),this.orbs=this.orbs.filter(t=>t!==e)}burst(e,t="#ffd28a",n=22,i={}){const a=n,r=new _t,o=new Float32Array(a*3),l=[];for(let f=0;f<a;f++){o[f*3]=e.x,o[f*3+1]=e.y,o[f*3+2]=e.z;const g=Math.random()*Math.PI*2,v=Ln(-.4,1.1),m=Ln(1.4,i.speed||6.5);l.push(new L(Math.cos(g)*Math.cos(v)*m,Math.sin(v)*m,Math.sin(g)*Math.cos(v)*m))}r.setAttribute("position",new Ft(o,3));const c=new $n({map:qt(),color:t,size:i.size||.55,transparent:!0,opacity:1,depthWrite:!1,blending:je}),d=new oi(r,c);d.frustumCulled=!1,this.scene.add(d);const u={group:d,age:0,ttl:i.ttl||.9,update(f){const g=r.attributes.position.array;for(let v=0;v<a;v++){const m=l[v];m.y-=(i.gravity??5.5)*f,m.multiplyScalar(1-f*1.6),g[v*3]+=m.x*f,g[v*3+1]+=m.y*f,g[v*3+2]+=m.z*f}r.attributes.position.needsUpdate=!0,c.opacity=Math.max(0,1-this.age/this.ttl)}};this.items.push(u);const h=new Un(new Sn({map:qt(),color:t,transparent:!0,opacity:.85,blending:je,depthWrite:!1}));return h.position.copy(e),h.scale.setScalar(i.flash||4),this.scene.add(h),this.items.push({group:h,age:0,ttl:.28,update(f){h.material.opacity=Math.max(0,.85*(1-this.age/.28)),h.scale.setScalar((i.flash||4)*(1+this.age*4))}}),u}ring(e,t="#8fe7ff",n=4,i=.6,a={}){const r=new Yn(.15,1,48),o=new nt({color:t,transparent:!0,opacity:a.opacity??.8,side:rt,depthWrite:!1,blending:je}),l=new Y(r,o);l.rotation.x=-Math.PI/2,l.position.copy(e),l.position.y+=.06,this.scene.add(l);const c={group:l,age:0,ttl:i,update(d){const u=this.age/i;l.scale.setScalar(n*(.2+u)),o.opacity=Math.max(0,(a.opacity??.8)*(1-u))}};return this.items.push(c),c}runeCircle(e,t="#ff8a6b",n=3,i=1.1){const a=$s(t),r=new nt({map:a,color:t,transparent:!0,opacity:.7,side:rt,depthWrite:!1,blending:je}),o=new Y(new Yt(n,40),r);o.rotation.x=-Math.PI/2,o.position.copy(e),o.position.y+=.08,this.scene.add(o);const l={group:o,age:0,ttl:i,update(c){o.rotation.z+=c*.8,r.opacity=.65*(1-this.age/i)*(.6+Math.sin(this.age*20)*.15)}};return this.items.push(l),l}beam(e,t,n="#6fd7ff",i=.12,a=.35){const r=new L().subVectors(t,e),o=r.length(),l=new ht(i,i*.7,o,6,1,!0),c=new nt({color:n,transparent:!0,opacity:.85,blending:je,depthWrite:!1}),d=new Y(l,c);d.position.copy(e).add(r.multiplyScalar(.5)),d.quaternion.setFromUnitVectors(new L(0,1,0),r.normalize()),this.scene.add(d);const u=new Un(new Sn({map:qt(),color:n,transparent:!0,opacity:.6,blending:je,depthWrite:!1}));u.position.copy(t),u.scale.setScalar(2.2),this.scene.add(u);const h={group:d,age:0,ttl:a,update(f){c.opacity=Math.max(0,.9*(1-this.age/a)),d.scale.x=d.scale.z=1+Math.sin(this.age*40)*.3,u.material.opacity=Math.max(0,.6*(1-this.age/a))}};return this.items.push(h),this.items.push({group:u,age:0,ttl:a,update(){}}),h}lightning(e,t="#b48cff",n=.4){const i=[];for(let c=0;c<e.length-1;c++){const d=e[c],u=e[c+1],h=7;for(let f=0;f<h;f++){const g=f/h,v=new L().lerpVectors(d,u,g);f>0&&(v.x+=Ln(-.3,.3),v.y+=Ln(-.3,.3),v.z+=Ln(-.3,.3)),i.push(v.x,v.y,v.z)}}const a=new _t().setAttribute("position",new ft(i,3)),r=new Jo({color:t,transparent:!0,opacity:1,blending:je,depthWrite:!1}),o=new tu(a,r);this.scene.add(o);const l={group:o,age:0,ttl:n,update(c){r.opacity=Math.max(0,1-this.age/n)}};this.items.push(l);for(const c of e)this.burst(c,t,8,{speed:3,size:.4,ttl:.5});return l}ward(e,t="#78b4ff",n=1){const i=new dn({transparent:!0,depthWrite:!1,side:rt,blending:je,uniforms:{time:{value:0},color:{value:new Oe(t)},opacity:{value:.7}},vertexShader:"varying vec3 vN; varying vec3 vV; void main(){ vec4 wp=modelMatrix*vec4(position,1.0); vN=normalize(mat3(modelMatrix)*normal); vV=normalize(cameraPosition-wp.xyz); gl_Position=projectionMatrix*viewMatrix*wp; }",fragmentShader:`varying vec3 vN; varying vec3 vV; uniform float time; uniform vec3 color; uniform float opacity;
        void main(){ float f = pow(1.0 - abs(dot(vN,vV)), 2.2); float bands = 0.7 + 0.3*sin(vN.y*30.0 + time*2.0);
          gl_FragColor = vec4(color, f * opacity * bands); }`}),a=new Y(new Mt(1.35*n,24,16),i);a.position.y=1,e.add(a);const r={group:a,age:0,ttl:1e9,update(o){i.uniforms.time.value+=o}};return this.items.push(r),{mesh:a,mat:i,item:r,remove(){e.remove(a),r.ttl=0}}}heal(e,t="#8ef0b0"){const i=new _t,a=new Float32Array(60),r=[];for(let c=0;c<20;c++)a[c*3]=e.x+Ln(-.8,.8),a[c*3+1]=e.y+Ln(0,.4),a[c*3+2]=e.z+Ln(-.8,.8),r.push(Ln(0,1));i.setAttribute("position",new Ft(a,3));const o=new $n({map:qt(),color:t,size:.5,transparent:!0,opacity:.9,depthWrite:!1,blending:je}),l=new oi(i,o);l.frustumCulled=!1,this.scene.add(l),this.items.push({group:l,age:0,ttl:1.2,update(c){const d=i.attributes.position.array;for(let u=0;u<20;u++)d[u*3+1]+=c*(.8+r[u]*1.2),d[u*3]+=Math.sin(this.age*4+r[u]*8)*c*.3;i.attributes.position.needsUpdate=!0,o.opacity=Math.max(0,.9*(1-this.age/1.2))}}),this.ring(e,t,1.6,.8,{opacity:.5})}aegisPulse(e,t="#8fd0ff",n=3.5){this.ring(e,t,n,.7,{opacity:.65}),this.burst(new L(e.x,e.y+.8,e.z),t,26,{speed:5,size:.4})}meteor(e,t="#ff7a3d",n){const i=new L(e.x+Ln(-6,6),e.y+22,e.z+Ln(-6,6)),a=this.createOrb(t,.55);a.group.position.copy(i);const r=new L().subVectors(e,i),o=.65;let l=!1;const c=this,d={group:a.group,age:0,ttl:o,update(u){const h=Math.min(1,this.age/o);a.group.position.copy(i).addScaledVector(r,h),h>=1&&!l&&(l=!0,this.ttl=0,c.removeOrb(a),c.burst(e,t,34,{speed:9,size:.8,flash:7}),c.ring(e,t,7,.7,{opacity:.8}),c.shake(.8),n?.())}};return this.items.push(d),d}serpent(e,t="#9fffa8",n=8){const i=new Le;i.position.copy(e);const a=new nt({color:t,transparent:!0,opacity:.8,blending:je,depthWrite:!1}),r=[];for(let c=0;c<8;c++){const d=new Y(new Mt(.24-c*.018,8,6),a);i.add(d),r.push(d)}const o=new Y(new Ct(.3,.7,6),a);i.add(o),this.scene.add(i);const l={group:i,age:0,ttl:n,update(c){const d=this.age;r.forEach((h,f)=>{const g=d*2.2-f*.5;h.position.set(Math.cos(g)*(.8+f*.05),.4+f*.22+Math.sin(d*3-f*.4)*.15,Math.sin(g)*(.8+f*.05)),h.scale.setScalar(1-f*.03)});const u=r[r.length-1];o.position.copy(u.position).add(new L(0,.25,0)),o.rotation.z=.5,a.opacity=.8*Math.min(1,(n-d)*1.5)}};return this.items.push(l),l}summon(e,t="#c9a2ff"){return this.runeCircle(e,t,2.2,1),this.burst(new L(e.x,e.y+.5,e.z),t,26,{speed:4,size:.5}),this.serpent(new L(e.x,e.y,e.z),"#a8ffb6",8)}castSpark(e,t="#ffd28a"){this.burst(e,t,9,{speed:2.5,size:.3,gravity:-1,ttl:.5,flash:1.4})}}function $g(s,e="ring"){const t=new Le;s.add(t);const n=(()=>{let R=1234;return()=>(R=R*16807%2147483647)/2147483647})();s.background=new Oe("#080512"),s.fog=new ja(e==="spire"?"#160d22":"#101022",.012);const i=new gd("#9a8ad4","#141018",1);s.add(i);const a=new hu("#ffe0b8",900,120,.8,.6,1.5);a.position.set(0,38,12),a.target.position.set(0,0,-4),s.add(a,a.target);const r=new Io("#7d6bff",1.6);r.position.set(-20,18,-30),s.add(r);const o=new _d("#3a2c5e",.5);s.add(o);const l=new dn({side:tn,depthWrite:!1,fog:!1,vertexShader:"varying vec3 vDir; void main(){ vDir=normalize(position); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }",fragmentShader:`varying vec3 vDir;
      void main(){ float h=vDir.y; vec3 col=mix(vec3(0.06,0.045,0.12), vec3(0.015,0.012,0.05), smoothstep(-0.3,0.7,h));
        float neb = sin(vDir.x*3.0+vDir.y*2.0)*sin(vDir.z*4.0-vDir.x*2.0);
        col += vec3(0.20,0.10,0.30)*smoothstep(0.2,1.0,neb)*0.25;
        gl_FragColor=vec4(col,1.0); }`}),c=new Y(new Mt(220,24,18),l);t.add(c);const d=new _t,u=new Float32Array(500*3);for(let R=0;R<500;R++){const U=n()*Math.PI*2,F=Math.acos(1-n()*1.2);u[R*3]=Math.sin(F)*Math.cos(U)*190,u[R*3+1]=Math.cos(F)*190+20,u[R*3+2]=Math.sin(F)*Math.sin(U)*190}d.setAttribute("position",new Ft(u,3)),t.add(new oi(d,new $n({color:"#dfe6ff",size:.9,transparent:!0,opacity:.8,fog:!1,depthWrite:!1})));for(let R=0;R<3;R++){const U=32+R*7,F=new Y(new ht(U,U,1.2,64,1,!0),new ke({color:"#1e1826",roughness:.95,side:rt,transparent:!0,opacity:.55}));F.position.y=6-R*2.5,t.add(F)}const h=new _t,f=new Float32Array(380*3);for(let R=0;R<380;R++){const U=n()*Math.PI*2,F=30+n()*18;f[R*3]=Math.cos(U)*F,f[R*3+1]=4+n()*5+(F-30)*.12,f[R*3+2]=Math.sin(U)*F}h.setAttribute("position",new Ft(f,3));const g=new oi(h,new $n({map:qt(),color:"#c8b6ff",size:.4,transparent:!0,opacity:.28,depthWrite:!1,blending:je}));t.add(g);const v=new ke({color:"#484654",roughness:.85,metalness:.1}),m=new Y(new ht(21,23.5,2.2,64),v);m.position.y=-1.2,m.receiveShadow=!0,t.add(m);const p=new ke({color:"#5a5866",roughness:.8,metalness:.12}),x=new Y(new ht(20.8,20.8,.25,64),p);x.position.y=.02,x.receiveShadow=!0,t.add(x);const M=$s(e==="spire"?"#d65cff":"#9fe7ff"),_=new Y(new Yt(20.4,64),new nt({map:M,transparent:!0,opacity:.45,depthWrite:!1,side:rt}));_.rotation.x=-Math.PI/2,_.position.y=.15,t.add(_);const E=new Y(new Yt(20,64),new nt({color:e==="spire"?"#7c3bb8":"#2b5f88",transparent:!0,opacity:.09,depthWrite:!1,side:rt,blending:je}));E.rotation.x=-Math.PI/2,E.position.y=.18,t.add(E);const T=new ke({color:"#3e3b4a",roughness:.9}),y=e==="spire"?["#d65cff","#9b4dff"]:e==="ruins"?["#8fe7ff","#5fd8c8"]:e==="grove"?["#9fe7a0","#7de6d0"]:["#9fe7ff","#c9a2ff"],b=[];for(let R=0;R<8;R++){const U=R/8*Math.PI*2,F=Math.cos(U)*20,z=Math.sin(U)*20,j=6.5+R%2*1.5,W=new Y(new ht(.75,1,j,8),T);W.position.set(F,j/2,z),W.rotation.y=-U,W.castShadow=!0,t.add(W);const te=new Y(new Si(2.2,.5,2.2),T);te.position.set(F,j+.25,z),te.rotation.y=-U,t.add(te);const se=new Y(new Tn(.55,0),new ke({color:y[R%2],emissive:y[R%2],emissiveIntensity:1.6,roughness:.1}));se.position.set(F,j+1.2,z),se.scale.y=1.8,t.add(se);const Me=new Un(new Sn({map:qt(),color:y[R%2],transparent:!0,opacity:.5,blending:je,depthWrite:!1}));Me.scale.setScalar(4.5),Me.position.set(F,j+1.2,z),t.add(Me),b.push({crystal:se,glow:Me,a:U})}const P=[];for(const R of[-1,1]){const U=R*13,F=12,z=new Y(new ht(1.1,.6,.8,10),new ke({color:"#2d2833",metalness:.6,roughness:.4}));z.position.set(U,2.2,F),t.add(z);const j=new Y(new ht(.2,.4,2.2,8),T);j.position.set(U,1.1,F),t.add(j);const W=new Un(new Sn({map:qt(),color:"#ffb05a",transparent:!0,opacity:.8,blending:je,depthWrite:!1}));W.scale.set(3.2,3.8,1),W.position.set(U,3.3,F),t.add(W);const te=new xd("#ff9a4d",3,24,2);te.position.set(U,3.4,F),t.add(te),P.push({flame:W,fl:te,phase:Math.random()*6})}const I=new dn({transparent:!0,depthWrite:!1,side:rt,blending:je,uniforms:{time:{value:0},color:{value:new Oe(e==="spire"?"#c46bff":"#8fd8ff")},opacity:{value:.24}},vertexShader:"varying vec3 vN; varying vec3 vV; varying vec2 vUv; void main(){ vec4 wp=modelMatrix*vec4(position,1.0); vN=normalize(mat3(modelMatrix)*normal); vV=normalize(cameraPosition-wp.xyz); vUv=uv; gl_Position=projectionMatrix*viewMatrix*wp; }",fragmentShader:`varying vec3 vN; varying vec3 vV; varying vec2 vUv; uniform float time; uniform vec3 color; uniform float opacity;
      void main(){ float f=pow(1.0-abs(dot(vN,vV)),2.5); float hex=sin(vUv.x*90.0)*sin(vUv.y*60.0+time); float a=f*opacity + smoothstep(0.965,0.98,abs(sin(vUv.x*80.0)))*0.02;
        gl_FragColor=vec4(color + vec3(0.1)*hex, a); }`}),O=new Y(new Mt(29,40,20,0,Math.PI*2,0,Math.PI/2),I);if(t.add(O),e==="grove")for(let R=0;R<18;R++){const U=n()*Math.PI*2,F=26+n()*12,z=new Le;z.position.set(Math.cos(U)*F,0,Math.sin(U)*F);const j=new Y(new ht(.4,.7,6+n()*6,5),new ke({color:"#332b28"}));j.position.y=3.5,z.add(j);for(let W=0;W<3;W++){const te=new Y(new Gi(2+n()*2,0),new ke({color:"#24402c",roughness:1}));te.position.set((n()-.5)*3,7+W*1.5,(n()-.5)*3),z.add(te)}t.add(z)}if(e==="ruins"){for(let R=0;R<10;R++){const U=R/10*Math.PI*2,F=26+n()*4,z=3+n()*9,j=new Y(new ht(.7,.9,z,8),new ke({color:"#3f4a4d",roughness:.95}));j.position.set(Math.cos(U)*F,z/2-2,Math.sin(U)*F),j.rotation.z=(n()-.5)*.15,t.add(j)}for(let R=0;R<3;R++){const U=new Y(new Yt(3,18),new ke({color:"#1d5560",metalness:.6,roughness:.1,transparent:!0,opacity:.55}));U.rotation.x=-Math.PI/2,U.position.set((n()-.5)*20,.2,24+n()*6),t.add(U)}}if(e==="spire"){for(let R=0;R<7;R++){const U=R/7*Math.PI*2+.4,F=24+n()*30,z=new Y(new Ct(2.5+n()*2.5,F,5),new ke({color:"#1c1428",roughness:.9}));z.position.set(Math.cos(U)*(38+n()*10),F/2-6,Math.sin(U)*(38+n()*10)),t.add(z)}for(let R=0;R<12;R++){const U=n()*Math.PI*2,F=24+n()*12,z=new Y(new Tn(.7+n()*1.5,0),new ke({color:"#2a1f3d",emissive:"#5b2e88",emissiveIntensity:.4,roughness:.5}));z.position.set(Math.cos(U)*F,5+n()*14,Math.sin(U)*F),t.add(z)}}if(e==="training")for(let R=0;R<5;R++){const U=R/5*Math.PI*2,F=new Le;F.position.set(Math.cos(U)*26,0,Math.sin(U)*26);const z=new Y(new ht(.15,.2,3,6),new ke({color:"#4a3528"}));z.position.y=1.5,F.add(z);const j=new Y(new ht(.6,.75,1.6,8),new ke({color:"#8a7a62"}));j.position.y=2.2,F.add(j);const W=new Y(new Mt(.45,10,8),new ke({color:"#b6a687"}));W.position.y=3.4,F.add(W),t.add(F)}const k=[];for(let R=0;R<16;R++){const U=n()*Math.PI*2,F=26+n()*16,z=new Y(new En(.3+n()*1.3,0),T);z.position.set(Math.cos(U)*F,2+n()*22,Math.sin(U)*F),t.add(z),k.push({m:z,base:z.position.y,phase:n()*6.28,spin:(n()-.5)*.4})}return{group:t,scene:s,variant:e,playerSpawn:new L(0,0,11),enemySpawn:new L(0,0,-11),bounds:19.3,center:new L(0,0,0),update(R,U){I.uniforms.time.value=U,_.rotation.z=U*.035,b.forEach((F,z)=>{F.crystal.rotation.y+=R*.4,F.glow.material.opacity=.35+Math.sin(U*1.3+z)*.12,F.crystal.position.y=8.2+Math.sin(U*1.1+z)*.18+z%2*1.5,F.glow.position.y=F.crystal.position.y}),P.forEach((F,z)=>{F.flame.scale.set(2.8+Math.sin(U*9+z)*.4,3.6+Math.sin(U*12+z)*.5,1),F.fl.material,F.fl.intensity=2.6+Math.sin(U*8+z)*.5}),g.rotation.y=Math.sin(U*.04)*.02,k.forEach(F=>{F.m.position.y=F.base+Math.sin(U*.5+F.phase)*.5,F.m.rotation.y+=R*F.spin}),I.uniforms.opacity.value=(e==="spire"?.2:.22)+Math.sin(U*(e==="spire"?1.4:.9))*.045},clamp(R,U=.5){const F=Math.hypot(R.x,R.z);F>19.3&&(R.x*=19.3/F,R.z*=19.3/F),R.y=0},dispose(){s.remove(t),s.remove(i),s.remove(a),s.remove(a.target),s.remove(r),s.remove(o)}}}const Ps=[{id:"craft",kicker:"THE WANDMAKER'S BENCH",title:"Wandcrafting",rune:"⚒",label:"Craft"},{id:"spells",kicker:"THE GRIMOIRE",title:"Spells & Lessons",rune:"✦",label:"Spells"},{id:"shop",kicker:"THE SHOP LEDGER",title:"The Wand Shop",rune:"◉",label:"Shop"},{id:"journal",kicker:"THE JOURNAL",title:"Journal",rune:"❖",label:"Journal"},{id:"map",kicker:"THE ATLAS",title:"The Atlas",rune:"◈",label:"Atlas"},{id:"character",kicker:"THE WIZARD",title:"Character",rune:"☾",label:"Character"},{id:"duel",kicker:"THE DUELLING RING",title:"Duels & Tournaments",rune:"⚔",label:"Duel"}],Cc=s=>Math.round(s),He=(s="")=>String(s).replace(/[&<>"]/g,e=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[e]),Hd=s=>`<span class="rar-tag" style="--rar:${Vt[s]?.color}">${Vt[s]?.name||s}</span>`,Hs=s=>s>=1e4?`${(s/1e3).toFixed(1)}k`:s>=1e3?`${(s/1e3).toFixed(2)}k`:String(s);function Aa(s,e,t){return`<div class="stat"><span>${s}</span><div class="stat-bar"><div style="width:${Math.min(100,e)}%;--sc:${t}"></div></div><b>${e}</b></div>`}function Gd(s){const e=s.game.s,t=s.craft;return!t.woodId||!t.coreId?null:ko({woodId:t.woodId,coreId:t.coreId,length:t.length,flexibility:t.flexibility,materials:t.materials,bench:e.upgrades.bench})}function Vd(s){if(!s)return'<div class="wand-placeholder"><span>✦</span>Select a wood and a core to see what wants to be made.</div>';const e=Fn.find(n=>n.id===s.woodId),t=On.find(n=>n.id===s.coreId);return`
    <div class="wand-readout">
      <span class="wand-name">${He(s.name)}</span>
      <span class="wand-sub">${He(e?.name||"")} · ${He(t?.name||"")} · ${s.length}″ · ${s.flexibility}% flex</span>
    </div>
    <div class="affinity-row">
      ${s.affinity.slice(0,3).map(([n,i])=>`<span class="affinity-chip">${Ut[n].rune} ${Ut[n].name} +${Cc(i)}</span>`).join("")}
      ${s.affinity.filter(([,n])=>n<0).slice(0,1).map(([n,i])=>`<span class="affinity-chip neg">${Ut[n].name} ${Cc(i)}</span>`).join("")}
    </div>
    <div class="stat-grid">
      ${Aa("Potency",s.stats.pot,"#ff9d6b")}
      ${Aa("Control",s.stats.ctrl,"#78b4ff")}
      ${Aa("Harmony",s.stats.harm,"#8ef0b0")}
      ${Aa("Aether",s.stats.aether,"#c79bff")}
    </div>
    <div class="wand-trait"><b>${He(s.trait.name)}</b>${He(s.trait.desc)}</div>
    <div class="affinity-row">
      <span class="affinity-chip" style="--gold">${Hd(s.rarity)}</span>
      <span class="affinity-chip">Quality ${s.quality}</span>
      <span class="affinity-chip">Value ◉ ${Hs(s.value)}</span>
      ${s.recipe?'<span class="affinity-chip" style="border-color:#ffc96b">✦ Legendary combination</span>':""}
    </div>`}function qg(s){const e=s.game.s,t=s.craft,n=e.inventory,i=Gd(s),a=t.tab,r=a==="woods"?Fn:a==="cores"?On:Oi,o=a==="woods"?n.woods:a==="cores"?n.cores:n.materials,l=si[e.upgrades.bench],c=r.map(h=>{const f=o?.[h.id]||0,g=a==="woods"?t.woodId===h.id:a==="cores"?t.coreId===h.id:t.materials.includes(h.id),v=a==="woods"?"select-wood":a==="cores"?"select-core":"toggle-mat";return`<button class="ing-card ${g?"selected":""} ${f?"":"empty"} rar-${h.rarity}" data-act="${v}" data-id="${h.id}" ${f?"":"disabled"}>
      <span class="ing-orb ${a==="woods"?"wood":a==="cores"?"core":"mat"}" style="--swatch:${h.light||h.glow||h.color}"></span>
      <span class="ing-info">
        <span class="ing-name">${He(h.name)}</span>
        <span class="ing-meta">${a==="materials"?He(h.desc.slice(0,30))+"…":He(h.desc.slice(0,34))+"…"}</span>
        ${Hd(h.rarity)}
      </span>
      <span class="ing-qty">×${f}</span>
    </button>`}).join(""),d=Array.from({length:l.slots}).map((h,f)=>{const g=t.materials[f];if(g){const v=nr(g);return`<button class="mat-slot filled" data-act="remove-mat" data-id="${g}">${He(v?.name||g)}<br><span style="opacity:.5">remove</span></button>`}return'<div class="mat-slot">Empty slot</div>'}).join(""),u=e.upgrades.bench<4?'<div class="mat-slot locked">Bench II+</div>':"";return`
  <div class="craft-layout">
    <div class="craft-left">
      <div class="ing-section-head">
        <h3>Materials</h3>
        <small>${Fn.length+On.length+Oi.length} known to the trade</small>
      </div>
      <div class="ing-tabs">
        <button class="ing-tab ${a==="woods"?"active":""}" data-act="ing-tab" data-id="woods">Woods</button>
        <button class="ing-tab ${a==="cores"?"active":""}" data-act="ing-tab" data-id="cores">Cores</button>
        <button class="ing-tab ${a==="materials"?"active":""}" data-act="ing-tab" data-id="materials">Extra materials</button>
      </div>
      <div class="ing-grid">${c||'<div class="empty-state">Nothing here yet.</div>'}</div>

      <div class="discovery-strip">
        <div class="ing-section-head">
          <h3>Legendary combinations</h3>
          <small>${e.discovered.recipes.length} / ${Ya.length} discovered</small>
        </div>
        <div class="discovery-grid">
          ${Ya.slice(0,8).map(h=>{const f=e.discovered.recipes.includes(h.name);return`<div class="disc ${f?"found":""}"><span>${f?"✦":"?"}</span><small>${f?He(h.name):"Undiscovered"}</small></div>`}).join("")}
        </div>
      </div>
    </div>

    <div class="craft-right">
      <div class="wand-stage ${i?"wand-idle":""}">
        <span class="stage-tag">The bench · ${He(l.name)}</span>
        ${i?`<span class="stage-rarity" style="--rar:${Vt[i.rarity].color}">${Vt[i.rarity].name}</span>`:""}
        ${i?ir(i):'<div class="wand-placeholder"><span>⚒</span>Nothing on the bench yet.</div>'}
      </div>

      ${Vd(i)}

      <div class="slider-row">
        <div class="slider-head"><span>Length</span><b>${t.length}″</b></div>
        <input type="range" id="craft-length" min="9" max="15" step="0.5" value="${t.length}" />
      </div>
      <div class="slider-row">
        <div class="slider-head"><span>Flexibility</span><b>${t.flexibility}%</b></div>
        <input type="range" id="craft-flex" min="0" max="100" step="1" value="${t.flexibility}" />
      </div>

      <div class="ing-section-head" style="margin-top:12px"><h3>Finishings</h3><small>${t.materials.length}/${l.slots} slots</small></div>
      <div class="mat-slots">${d}${u}</div>

      <div class="craft-actions">
        <button class="btn-gold" data-act="craft" ${i?"":"disabled"}>Shape the wand</button>
        <button class="btn-line" data-act="craft-clear">Clear bench</button>
        <div class="craft-hint">Consumes 1 wood, 1 core${t.materials.length?", "+t.materials.length+" finishing(s)":""}.</div>
      </div>
    </div>
  </div>`}function Pc(s){const e=Gd(s),t=document.querySelector(".wand-stage");t&&(t.classList.toggle("wand-idle",!!e),t.querySelector("svg")?.remove(),t.querySelector(".wand-placeholder")?.remove(),t.querySelector(".stage-rarity")?.remove(),e?t.insertAdjacentHTML("beforeend",`<span class="stage-rarity" style="--rar:${Vt[e.rarity].color}">${Vt[e.rarity].name}</span>`+ir(e)):t.insertAdjacentHTML("beforeend",'<div class="wand-placeholder"><span>⚒</span>Nothing on the bench yet.</div>'));const n=document.querySelector(".craft-right");if(n){const a=n.querySelector(".wand-readout");if(a||n.querySelector(".wand-placeholder")){const o=document.createElement("div");o.innerHTML=Vd(e),a&&a.replaceWith(...o.childNodes)}}const i=document.querySelector('[data-act="craft"]');i&&(i.disabled=!e)}function Xg(s){const e=s.game.s,t=s.spellCat,n=e.known,a=en.filter(l=>t==="all"||l.cat===t).map(l=>{const c=n[l.id]!==void 0,d=n[l.id]||0,u=s.game.masteryRank(l.id),h=e.loadout.includes(l.id);return`<button class="spell-card ${c?"":"locked"}" data-act="${c?"toggle-loadout":"spell-info"}" data-id="${l.id}" style="--sc:${Ut[l.cat].color}">
      <span class="sc-icon">${l.rune}</span>
      <span class="sc-body">
        <span class="sc-name">${He(l.name)} ${h?'<span style="color:var(--teal);font-size:7px">◆</span>':""}</span>
        <span class="sc-cat">${Ut[l.cat].name} · ${c?u.name:"Unknown"}</span>
        <span class="sc-desc">${He(l.desc)}</span>
        ${c?`<span class="sc-mastery"><div style="width:${d}%"></div></span>`:""}
      </span>
      ${c?"":'<span class="lock-tag">LOCKED</span>'}
    </button>`}).join(""),r=`<button class="cat-chip ${t==="all"?"active":""}" data-act="spell-cat" data-id="all"><span class="dot" style="--cc:#e9c988"></span>All</button>`+Object.values(Ut).map(l=>`<button class="cat-chip ${t===l.id?"active":""}" data-act="spell-cat" data-id="${l.id}"><span class="dot" style="--cc:${l.color}"></span>${l.name}</button>`).join(""),o=Ka.map(l=>{const c=l.lessons.map(u=>{const h=!!e.lessons[u.id],f=!h&&u.req&&(u.req.level&&e.level<u.req.level||u.req.rep&&e.rep<u.req.rep),g=u.req?[u.req.level?`Lv ${u.req.level}`:"",u.req.rep?`Rep ${u.req.rep}`:""].filter(Boolean).join(" · "):"";return`<div class="lesson-item ${h?"done":""}">
        <span class="lesson-num">${h?"✓":""}</span>
        <span class="li-body">
          <span class="li-name">${He(u.name)}</span>
          <span class="li-sub">${h?"Mastered":f?"Requires "+g:He(u.desc)}</span>
        </span>
        <button data-act="attend-lesson" data-id="${u.id}" ${h||f?"disabled":""}>${h?"Done":"Attend"}</button>
      </div>`}).join(""),d=l.lessons.filter(u=>e.lessons[u.id]).length;return`<div style="margin-bottom:16px">
      <div class="ing-section-head"><h3>${He(l.name)}</h3><small>${d}/${l.lessons.length}</small></div>
      <p style="font-size:11px;font-style:italic;color:rgba(205,189,158,.5);margin:0 0 4px;line-height:1.4">${He(l.teacher)} — ${He(l.desc)}</p>
      ${c}
    </div>`}).join("");return`
  <div class="spell-layout">
    <div>
      <div class="ing-section-head"><h3>Your grimoire</h3><small>${Object.keys(n).length} of ${en.length} spells · click a known spell to ready it</small></div>
      <div class="spell-cats">${r}</div>
      <div class="spell-grid">${a}</div>
    </div>
    <aside class="lesson-side">
      <h3>Lessons at the Academy</h3>
      <p>Attend a lesson to learn its spell. The old teachers do not hand these out for free — but they do hand them out.</p>
      ${o}
    </aside>
  </div>`}function Yg(s){const e=s.game.s,t=s.shopTab,n=e.customers.map(u=>{const h=s.game.getCustomerInfo(u);return h?`<button class="npc-card ${s.shopCustomer===u.id?"active":""}" data-act="select-customer" data-id="${u.id}">
      <span class="npc-face" style="--npc:${h.color}">${h.initials}</span>
      <span class="npc-info">
        <span class="npc-name">${He(h.name)}</span>
        <span class="npc-desc">${He(h.line)}</span>
        <span class="npc-wants">
          <span class="want-chip" style="color:${Ut[u.wants.cat].color}">${Ut[u.wants.cat].rune} ${Ut[u.wants.cat].name}</span>
          <span class="want-chip">${He(u.wants.trait)}</span>
        </span>
      </span>
      <span class="npc-budget">◉ ${u.budget[0]}–${u.budget[1]}</span>
    </button>`:""}).join(""),i=e.customers.find(u=>u.id===s.shopCustomer)||e.customers[0],a=i?s.game.getCustomerInfo(i):null,r=e.wands.map(u=>{const h=i?kd(i,u,e.upgrades.advert?.1:0):null,f=u.id===e.equipped;return`<button class="offer-wand ${f?"equipped":""} rar-${u.rarity}" data-act="sell-wand" data-id="${u.id}" ${f?"disabled":""}>
      <span class="ow-icon" style="--rar:${Vt[u.rarity].color}">⌁</span>
      <span class="ow-info">
        <span class="ow-name">${He(u.name)} ${f?'<span style="color:var(--teal);font-size:7px">EQUIPPED</span>':""}</span>
        <span class="ow-sub">${Vt[u.rarity].name} · Q${u.quality} · ${h?h.mood:""}${h?.tagMatch?" · perfect match":""}</span>
      </span>
      <span class="ow-val">◉ ${h?h.price:u.value}</span>
    </button>`}).join(""),o=Id.map(u=>{const h=u.id.startsWith("bench")?e.upgrades.bench>=u.tier:!!e.upgrades[u.id],f=u.id.startsWith("bench")?e.upgrades.bench+1===u.tier:!0;return`<div class="upgrade-card ${h?"owned":""}">
      <span class="upg-icon">${u.icon}</span>
      <span class="upg-info"><b>${He(u.name)}</b><small>${He(u.desc)}</small></span>
      <button class="buy-btn" data-act="buy-upgrade" data-id="${u.id}" ${h||!f?"disabled":""}>${h?"Owned":"◉ "+Hs(u.cost)}</button>
    </div>`}).join(""),l=Dd.map(u=>{const h=u.kind==="wood"?Fn.find(f=>f.id===u.id):u.kind==="core"?On.find(f=>f.id===u.id):Oi.find(f=>f.id===u.id);return h?`<div class="market-item">
      <span class="ing-orb ${u.kind==="wood"?"wood":u.kind==="core"?"core":"mat"}" style="--swatch:${h.light||h.glow||h.color}"></span>
      <b>${He(h.name)} <span style="opacity:.5">×${u.qty}</span></b>
      <button class="buy-btn" data-act="buy-market" data-id="${u.id}" ${e.gold<u.price?"disabled":""}>◉ ${Hs(u.price)}</button>
    </div>`:""}).join(""),c=`<div class="panel-tabs">
    <button class="panel-tab ${t==="customers"?"active":""}" data-act="shop-tab" data-id="customers">Customers & offers</button>
    <button class="panel-tab ${t==="upgrades"?"active":""}" data-act="shop-tab" data-id="upgrades">Workbench & shop</button>
    <button class="panel-tab ${t==="market"?"active":""}" data-act="shop-tab" data-id="market">Reagents market</button>
  </div>`;let d="";return t==="customers"?d=`<div class="ing-section-head"><h3>Wands on the shelf</h3><small>${a?"Offering to "+He(a.name):"No customer selected"}</small></div>
      <div class="offer-list">${r||'<div class="empty-state">No wands to sell.</div>'}</div>
      <p style="font-size:11px;font-style:italic;color:rgba(205,189,158,.45);margin-top:12px;line-height:1.5">
        ${a?He(a.line):""}<br><span style="opacity:.7">A wand whose magic matches their need will fetch a far better price — and a better mood.</span>
      </p>`:t==="upgrades"?d=`<div class="ing-section-head"><h3>The workshop</h3><small>Invest in better work</small></div>${o}`:d=`<div class="ing-section-head"><h3>The market</h3><small>Rare stock, bought honestly (mostly)</small></div>
      <div class="market-grid">${l}</div>`,`<div class="shop-layout">
    <div>
      <div class="ing-section-head"><h3>In the shop today</h3><small>${e.customers.length} customers</small></div>
      ${n}
      <div style="margin-top:14px;padding:12px;border:1px solid var(--line-soft);background:rgba(233,201,136,.03)">
        <div class="ing-section-head"><h3>Sales ledger</h3><small>${e.stats.wandsSold} wands sold</small></div>
        <div style="font-size:11.5px;font-style:italic;color:rgba(205,189,158,.6);line-height:1.6">
          Reputation ${e.rep} · ${e.upgrades.advert?"Lantern sign lit (+25% budgets)":"No signboard yet"}<br>
          ${e.upgrades.shelf?"Display shelf draws wanderers (+35 ◉ per duel)":"A bare shelf draws no one"}
        </div>
      </div>
    </div>
    <div>${c}${d}</div>
  </div>`}function Kg(s){const e=s.game.s,t=os.map(r=>{const o=e.quests[r.id]||{progress:0,done:!1},l=s.game.activeQuest()?.id===r.id,c=Math.min(100,o.progress/r.target*100);return`<div class="quest-card ${l?"active":""} ${o.done?"done":""}">
      <span class="quest-rune">${o.done?"✓":r.type==="duel"||r.type==="enemy"?"⚔":"❖"}</span>
      <div class="quest-body">
        <div class="quest-name">${He(r.name)}</div>
        <div class="quest-desc">${He(r.desc)}</div>
        <div class="quest-obj ${o.done?"done":""}">${He(r.objective)} ${o.done?"":`(${o.progress}/${r.target})`}
          <span class="quest-reward">◉ ${r.rewards.gold} · ✧ ${r.rewards.rep} · ✦ ${r.rewards.xp}</span>
        </div>
        <div class="quest-progress"><div style="width:${c}%"></div></div>
      </div>
    </div>`}).join(""),n=Nd.map(r=>`<div class="achv ${e.achievements.includes(r.id)?"unlocked":""}">
    <span>${r.icon}</span><div><b>${He(r.name)}</b><small>${He(r.desc)}</small></div>
  </div>`).join(""),i=e.stats,a=Oo[Math.floor(Date.now()/2e4)%Oo.length];return`
  <div class="quest-list" style="margin-bottom:18px">${t}</div>
  <div class="ing-section-head"><h3>Field notes</h3><small>Collected along the way</small></div>
  <div class="achievement-grid" style="margin-bottom:16px">${n}</div>
  <div class="ing-section-head"><h3>The ledger</h3><small>Everything the shop remembers</small></div>
  <div class="char-stats" style="grid-template-columns:repeat(4,1fr);margin-bottom:16px">
    <div class="char-stat"><span>Wands crafted</span><b>${i.wandsCrafted}</b></div>
    <div class="char-stat"><span>Wands sold</span><b>${i.wandsSold}</b></div>
    <div class="char-stat"><span>Duels won</span><b>${i.duelsWon}</b></div>
    <div class="char-stat"><span>Duels lost</span><b>${i.duelsLost}</b></div>
    <div class="char-stat"><span>Tournaments</span><b>${i.tournaments}</b></div>
    <div class="char-stat"><span>Ingredients</span><b>${i.ingredients}</b></div>
    <div class="char-stat"><span>Spells cast</span><b>${i.spellsCast||0}</b></div>
    <div class="char-stat"><span>Galleons earned</span><b>${Hs(i.goldEarned||0)}</b></div>
  </div>
  <div class="wand-trait"><b>A page from the shop diary</b>${He(a)}</div>
  <div class="affinity-row">${e.badges.map(r=>`<span class="affinity-chip">♛ ${He(r)}</span>`).join("")}</div>`}function Zg(s){const e=s.game.s,t=(l,c)=>({px:260+l*1.55,py:210-c*1.35}),n=s.playerZone||"village",a=`<svg viewBox="0 0 520 420" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="atlasGlow"><stop offset="0" stop-color="#2a3350"/><stop offset="1" stop-color="#0a0a16"/></radialGradient>
      <pattern id="atlasGrid" width="26" height="26" patternUnits="userSpaceOnUse"><path d="M 26 0 L 0 0 0 26" fill="none" stroke="rgba(233,201,136,.06)" stroke-width="1"/></pattern>
    </defs>
    <rect width="520" height="420" fill="url(#atlasGlow)"/>
    <rect width="520" height="420" fill="url(#atlasGrid)"/>
    <ellipse cx="300" cy="320" rx="120" ry="92" fill="rgba(30,80,90,.18)"/>
    ${[[[0,42],[-34,18],[-62,-26]],[[0,42],[30,18],[50,-22]],[[0,42],[36,60],[46,68]],[[0,42],[-44,64],[-62,74]],[[0,42],[58,52],[100,65]],[[100,65],[110,5],[112,-80]],[[0,42],[0,-108]]].map(l=>`<path d="M ${l.map(([c,d])=>{const{px:u,py:h}=t(c,d);return`${u} ${h}`}).join(" L ")}" fill="none" stroke="rgba(233,201,136,.22)" stroke-width="2" stroke-dasharray="3 5"/>`).join("")}
    ${li.map(l=>{const{px:c,py:d}=t(l.x,l.z),u=e.discoveredZones.includes(l.id),h=e.rep<l.req,f=n===l.id;return`<g opacity="${u?h?.55:1:.3}">
        <circle cx="${c}" cy="${d}" r="${f?15:11}" fill="${h?"#1b1826":l.color}" opacity=".13"/>
        <circle cx="${c}" cy="${d}" r="${f?7:4.5}" fill="${h?"#3a3547":l.color}"/>
        ${f?`<circle cx="${c}" cy="${d}" r="15" fill="none" stroke="${l.color}" stroke-width="1" stroke-dasharray="2 4"/>`:""}
        <text x="${c}" y="${d-14}" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="${l.color}">${l.rune}</text>
        <text x="${c}" y="${d+24}" text-anchor="middle" font-family="Georgia, serif" font-size="10" letter-spacing="1.2" fill="${u?"rgba(241,228,200,.78)":"rgba(241,228,200,.3)"}">${l.name.toUpperCase()}</text>
      </g>`}).join("")}
    <text x="260" y="402" text-anchor="middle" font-family="Georgia, serif" font-size="9" letter-spacing="3" fill="rgba(233,201,136,.32)">THE VALE OF EMBERFALL · ${e.rep} REPUTATION</text>
  </svg>`,r=li.map(l=>{const c=e.rep<l.req,d=e.discoveredZones.includes(l.id);return`<div class="zone-card ${c?"locked":""} ${n===l.id?"here":""}">
      <span class="zone-rune" style="color:${l.color}">${l.rune}</span>
      <span class="zone-info">
        <span class="zone-name">${He(l.name)}</span>
        <span class="zone-sub">${He(l.sub)}${c?` · needs ${l.req} reputation`:""}</span>
      </span>
      <button class="zone-travel" data-act="travel" data-id="${l.id}" ${c||n===l.id||!d?"disabled":""}>${n===l.id?"Here":c?"Sealed":"Travel"}</button>
    </div>`}).join(""),o=s.game.discoveredWandStats();return`<div class="atlas-layout">
    <div class="atlas-map">${a}</div>
    <div class="atlas-side">
      ${r}
      <div class="ing-section-head" style="margin-top:10px"><h3>Field discoveries</h3></div>
      <div class="char-stats" style="grid-template-columns:1fr 1fr">
        <div class="char-stat"><span>Woods</span><b>${o.woods}/${o.woodsTotal}</b></div>
        <div class="char-stat"><span>Cores</span><b>${o.cores}/${o.coresTotal}</b></div>
        <div class="char-stat"><span>Combinations</span><b>${o.recipes}/${o.recipesTotal}</b></div>
        <div class="char-stat"><span>Spells</span><b>${o.spells}/${o.spellsTotal}</b></div>
      </div>
    </div>
  </div>`}function Jg(s){const e=s.game.s,t=s.game.wand,n=Fn.find(o=>o.id===t.woodId),i=On.find(o=>o.id===t.coreId),a=s.game.xpToNext();return`<div class="char-layout">
    <div class="char-hero">
      <div class="char-sigil">${e.name.split(" ").map(o=>o[0]).slice(0,2).join("").toUpperCase()}</div>
      <h3>${He(e.name)}</h3>
      <div class="char-title">${He(s.game.displayTitle())} · Level ${e.level}</div>
      <div class="char-levelbar"><div style="width:${e.xp/a*100}%"></div></div>
      <div style="font-family:var(--display);font-size:7px;letter-spacing:.14em;color:rgba(233,201,136,.55)">${e.xp} / ${a} XP</div>
      <div class="char-stats">
        <div class="char-stat"><span>Health</span><b>${s.game.maxHp()}</b></div>
        <div class="char-stat"><span>Mana</span><b>${s.game.maxMp()}</b></div>
        <div class="char-stat"><span>Reputation</span><b>${e.rep}</b></div>
        <div class="char-stat"><span>Galleons</span><b>${Hs(e.gold)}</b></div>
      </div>
      <div style="margin-top:14px" class="affinity-row">${e.badges.map(o=>`<span class="affinity-chip">♛ ${He(o)}</span>`).join("")||'<span class="affinity-chip" style="opacity:.5">No titles yet</span>'}</div>
    </div>
    <div>
      <div class="ing-section-head"><h3>Equipped wand</h3><small>${Qg(e)} wands in the collection</small></div>
      <div class="equipped-wand">
        <span class="ew-art">${ir(t,{scale:.7})}</span>
        <div>
          <h4>${He(t.name)}</h4>
          <p>${He(n?.name||"")} · ${He(i?.name||"")} · ${t.length}″ · ${Vt[t.rarity].name}</p>
          <div class="affinity-row" style="margin:6px 0 0">
            <span class="affinity-chip">P ${t.stats.pot}</span>
            <span class="affinity-chip">C ${t.stats.ctrl}</span>
            <span class="affinity-chip">H ${t.stats.harm}</span>
            <span class="affinity-chip">A ${t.stats.aether}</span>
          </div>
        </div>
      </div>
      <div class="wand-trait"><b>${He(t.trait.name)}</b>${He(t.trait.desc)}</div>
      <div class="ing-section-head"><h3>Collection</h3><small>Click to equip</small></div>
      <div class="offer-list" style="max-height:270px">
        ${e.wands.map(o=>`<button class="offer-wand ${o.id===e.equipped?"equipped":""}" data-act="equip-wand" data-id="${o.id}">
          <span class="ow-icon" style="--rar:${Vt[o.rarity].color}">⌁</span>
          <span class="ow-info"><span class="ow-name">${He(o.name)}</span><span class="ow-sub">${Vt[o.rarity].name} · Q${o.quality} · ${He(o.trait.name)}</span></span>
          <span class="ow-val">${o.id===e.equipped?"WIELDING":"Equip"}</span>
        </button>`).join("")}
      </div>
    </div>
  </div>`}const Qg=s=>s.wands.length;function jg(s){const e=s.game.s,t=Uo.map(i=>{const a=e.rep<i.reqRep,r=e.defeated[i.id]||0;return`<div class="quest-card ${a?"done":""}">
      <span class="quest-rune" style="color:${i.accent}">${i.boss?"☾":"⚔"}</span>
      <div class="quest-body">
        <div class="quest-name">${He(i.name)} <span style="color:var(--gold-dim);font-size:8px">· ${i.title}</span> ${r?`<span style="color:var(--teal);font-size:8px">×${r}</span>`:""}</div>
        <div class="quest-desc">${He(i.desc)}</div>
        <div class="quest-obj">Level ${i.level} · ${i.hp} HP · ${i.dmg?i.dmg+" ATK":"harmless"}
          <span class="quest-reward">◉ ${i.rewards.gold} · ✧ ${i.rewards.rep} · ✦ ${i.rewards.xp}</span>
        </div>
      </div>
      <button class="buy-btn" data-act="start-duel" data-id="${i.id}" ${a?"disabled":""}>${a?"◈ "+i.reqRep+" rep":i.boss?"Challenge":"Duel"}</button>
    </div>`}).join(""),n=Fo.map(i=>{const a=e.rep<i.reqRep;return`<div class="upgrade-card ${a?"owned":""}">
      <span class="upg-icon">♛</span>
      <span class="upg-info"><b>${He(i.name)}</b><small>${He(i.desc)} · ${i.rounds.length} rounds · ${i.reqRep} reputation required</small></span>
      <button class="buy-btn" data-act="start-tournament" data-id="${i.id}" ${a?"disabled":""}>${a?"Sealed":"Enter"}</button>
    </div>`}).join("");return`<div style="display:grid;grid-template-columns:1fr 320px;gap:22px">
    <div>
      <div class="ing-section-head"><h3>The duelling slate</h3><small>${e.stats.duelsWon} wins · ${e.stats.duelsLost} losses</small></div>
      <div class="quest-list">${t}</div>
    </div>
    <aside>
      <div class="ing-section-head"><h3>Tournaments</h3><small>Rankings & rewards</small></div>
      ${n}
      <div class="wand-trait" style="margin-top:14px"><b>Duel Captain Sable</b>“Shield early, dodge late, and never cast the same spell twice in a row. They will notice.”</div>
      <div style="font-size:11px;font-style:italic;color:rgba(205,189,158,.5);line-height:1.7;margin-top:10px">
        Controls in the ring:<br>
        <b style="color:var(--gold-dim)">WASD</b> move · <b style="color:var(--gold-dim)">Space</b> dodge<br>
        <b style="color:var(--gold-dim)">1–6</b> cast · <b style="color:var(--gold-dim)">Right mouse</b> shield<br>
        <b style="color:var(--gold-dim)">Left mouse</b> current spell
      </div>
    </aside>
  </div>`}function ev(s,e){switch(e){case"craft":return qg(s);case"spells":return Xg(s);case"shop":return Yg(s);case"journal":return Kg(s);case"map":return Zg(s);case"character":return Jg(s);case"duel":return jg(s);default:return'<div class="empty-state">Nothing here.</div>'}}const ge=s=>document.getElementById(s),Ra=(s,e,t)=>{const n=document.createElement(s);return e&&(n.className=e),t!==void 0&&(n.innerHTML=t),n},Di=(s,e,t)=>Math.max(e,Math.min(t,s)),tv=["ᚦ","ᛉ","ᛟ","ᚱ","ᛏ","ᛒ","ᛗ","ᛊ","ᛖ","ᛞ"],nv=s=>s.map(e=>[Math.random(),e]).sort((e,t)=>e[0]-t[0]).map(e=>e[1]);class iv{constructor(e,t){this.game=e,this.audio=t,this.actions={},this.panel=null,this.panelTab="craft",this.craft={tab:"woods",woodId:null,coreId:null,materials:[],length:12,flexibility:50},this.spellCat="all",this.shopTab="customers",this.shopCustomer=null,this.modalOpen=!1,this.dialogueOpen=!1,this.challengeCleanup=null,this.locationName="Emberfall Village",this.playerZone="village",this.playerPos={x:0,z:0},this.cameraYaw=0,this.spellSlots=[],this.cds={},this.combo=0,this.cache(),this.bind(),this.buildNav()}cache(){this.dom={loading:ge("loading"),title:ge("title-screen"),hud:ge("hud"),overlay:ge("overlay"),nav:ge("grimoire-nav"),body:ge("panel-body"),kicker:ge("panel-kicker"),title2:ge("panel-title"),modal:ge("modal"),modalCard:ge("modal-card"),dialogue:ge("dialogue"),dlgPortrait:ge("dlg-portrait"),dlgName:ge("dlg-name"),dlgText:ge("dlg-text"),dlgChoices:ge("dlg-choices"),toasts:ge("toasts"),objective:ge("objective-toast"),spellbar:ge("spellbar"),castOrb:ge("cast-orb"),interact:ge("interact-prompt"),interactText:ge("interact-text"),combat:ge("combat-ui"),enemyName:ge("enemy-name"),enemyRank:ge("enemy-rank"),enemyHp:ge("enemy-hp-fill"),enemyHpText:ge("enemy-hp-text"),enemyCast:ge("enemy-cast"),duelRound:ge("duel-round"),comboEl:ge("combo"),combatLog:ge("combat-log"),crosshair:ge("crosshair"),minimap:ge("minimap"),minimapLabel:ge("minimap-label"),questTitle:ge("qt-title"),questObjective:ge("qt-objective"),questBar:ge("qt-bar"),questCount:ge("quest-count"),location:ge("location-name"),clock:ge("clock"),hpFill:ge("hp-fill"),hpText:ge("hp-text"),mpFill:ge("mp-fill"),mpText:ge("mp-text"),xpFill:ge("xp-fill"),xpLabel:ge("xp-label"),playerName:ge("player-name"),playerTitle:ge("player-title"),playerLevel:ge("player-level"),initials:ge("player-initials"),gold:ge("res-gold"),rep:ge("res-rep"),rank:ge("res-rank"),wands:ge("res-wands"),panelGold:ge("panel-gold"),panelRep:ge("panel-rep"),damage:ge("damage-layer"),spellBanner:ge("spell-banner"),bannerName:ge("spell-banner-name"),bannerRune:ge("spell-banner-rune"),levelFlash:ge("level-flash"),lfLevel:ge("lf-level"),lfTitle:ge("lf-title"),fade:ge("fade"),autosave:ge("autosave"),compass:ge("compass-track"),sound:ge("btn-sound"),panelGoldEl:ge("panel-gold")},this.minimapCtx=this.dom.minimap?.getContext("2d")}bind(){this.dom.nav.addEventListener("click",e=>{const t=e.target.closest("[data-panel]");t&&(this.actions.sfx?.("ui"),this.openPanel(t.dataset.panel))}),this.dom.body.addEventListener("click",e=>{const t=e.target.closest("[data-act]");!t||t.disabled||this.onAction(t.dataset.act,t.dataset.id,t)}),this.dom.body.addEventListener("input",e=>{e.target.id==="craft-length"&&(this.craft.length=Number(e.target.value),e.target.closest(".slider-row").querySelector("b").textContent=`${this.craft.length}″`,Pc(this)),e.target.id==="craft-flex"&&(this.craft.flexibility=Number(e.target.value),e.target.closest(".slider-row").querySelector("b").textContent=`${this.craft.flexibility}%`,Pc(this))}),ge("btn-close-panel").addEventListener("click",()=>this.closePanel()),this.dom.overlay.querySelector(".overlay-backdrop").addEventListener("click",()=>this.closePanel()),ge("btn-map").addEventListener("click",()=>this.openPanel("map")),ge("player-card").addEventListener("click",()=>this.openPanel("character")),this.dom.modal.querySelector(".modal-backdrop").addEventListener("click",()=>{this.modalLocked||this.closeModal()}),this.dom.dialogue.addEventListener("click",e=>{e.target.closest(".dlg-close")&&this.closeDialogue();const t=e.target.closest("[data-choice]");if(t){const n=Number(t.dataset.choice),i=this.dialogueChoices?.[n]?.action;this.audio.ui(),i?.()}})}buildNav(){this.dom.nav.innerHTML='<div class="nav-brand">WANDLORE<b>THE GRIMOIRE</b></div>'+Ps.map(e=>`<button class="nav-btn" data-panel="${e.id}"><span>${e.rune}</span>${e.label}</button>`).join("")+`<div class="nav-foot"><b>${this.game.s.name}</b><br>${this.game.displayTitle()}<br><br>Emberfall · The Vale</div>`}refresh(){const e=this.game,t=e.s;if(!t)return;const n=t.name.split(" ").map(o=>o[0]).slice(0,2).join("").toUpperCase();this.dom.initials.textContent=n,this.dom.playerName.textContent=t.name,this.dom.playerTitle.textContent=e.displayTitle(),this.dom.playerLevel.textContent=t.level,this.dom.gold.textContent=t.gold.toLocaleString(),this.dom.rep.textContent=t.rep,this.dom.wands.textContent=t.wands.length,this.dom.rank.textContent=t.badges.includes("Silver Circle Champion")?"Silver Circle":t.stats.duelsWon>=3?"Contender":"Unranked",this.dom.panelGold.textContent=t.gold.toLocaleString(),this.dom.panelRep.textContent=t.rep;const i=e.xpToNext();this.dom.xpFill.style.width=`${Di(t.xp/i*100,0,100)}%`,this.dom.xpLabel.textContent=`${t.xp} / ${i} XP`,this.dom.minimapLabel.textContent=this.locationName.split(" ").slice(0,2).join(" ");const a=e.activeQuest(),r=os.filter(o=>{const l=e.s.quests[o.id];return l&&!l.done}).length;if(this.dom.questCount.textContent=r,a){const o=e.questState(a);this.dom.questTitle.textContent=a.name,this.dom.questObjective.textContent=`${a.objective}${a.target>1?` · ${o.progress}/${a.target}`:""}`,this.dom.questBar.style.width=`${Di(o.progress/a.target*100,0,100)}%`}else this.dom.questTitle.textContent="All quests complete",this.dom.questObjective.textContent="The Vale is quieter. For now.",this.dom.questBar.style.width="100%";this.dom.location.textContent=this.locationName,this.dom.clock.textContent=this.clockLabel(),this.updateSpellbar(),this.updateMeters(),this.panel&&this.renderPanel(),this.buildNavName()}buildNavName(){const e=this.dom.nav.querySelector(".nav-foot");e&&(e.innerHTML=`<b>${this.game.s.name}</b><br>${this.game.displayTitle()}<br><br>Emberfall · The Vale`)}clockLabel(){const e=(this.game.s.playTime||0)%720;return e<180?"Dusk":e<360?"Night":e<540?"Deep Night":"Before Dawn"}setLocation(e,t){this.locationName=e,t&&(this.playerZone=t),this.dom.location.textContent=e,this.dom.minimapLabel.textContent=e.split(" ").slice(0,2).join(" ")}updateMeters(){const e=this.game.s,t=this.combatHp??e.hp??this.game.maxHp(),n=this.combatMp??e.mp??this.game.maxMp(),i=this.game.maxHp(),a=this.game.maxMp();this.dom.hpFill.style.width=`${Di(t/i*100,0,100)}%`,this.dom.hpText.textContent=Math.max(0,Math.round(t)),this.dom.mpFill.style.width=`${Di(n/a*100,0,100)}%`,this.dom.mpText.textContent=Math.max(0,Math.round(n))}updateSpellbar(){const e=this.game.s;if(!this.dom.spellbar)return;const t=e.loadout.map(i=>en.find(a=>a.id===i)).filter(Boolean);(!this.spellSlots.length||this._barKey!==e.loadout.join(","))&&(this._barKey=e.loadout.join(","),this.dom.spellbar.innerHTML="",this.spellSlots=Array.from({length:6}).map((i,a)=>{const r=t[a],o=Ra("button","spell-slot"+(r?"":" locked"));return o.dataset.index=a,r?(o.style.setProperty("--sc",Ut[r.cat].color),o.innerHTML=`<span class="slot-key">${a+1}</span><span class="slot-rune">${r.rune}</span><span class="slot-name">${r.name}</span><span class="slot-cost">${r.mana}</span><span class="slot-cd"></span>`,o.title=`${r.name} — ${r.mana} MP · ${Ut[r.cat].name}`,o.addEventListener("click",()=>this.actions.cast?.(a))):o.innerHTML=`<span class="slot-key">${a+1}</span><span class="slot-rune" style="opacity:.25">·</span><span class="slot-name">Empty</span>`,this.dom.spellbar.appendChild(o),{btn:o,cd:o.querySelector(".slot-cd")}})),this.spellSlots.forEach((i,a)=>{const r=t[a];if(!r)return;const o=this.cds[r.id]||0;i.cd&&(i.cd.style.transform=`scaleY(${Di(o,0,1)})`),i.btn.classList.toggle("active",this.activeSpell===r.id)});const n=en.find(i=>i.id===e.loadout[this.activeIndex||0]);n&&(ge("cast-orb-icon").textContent=n.rune,ge("cast-orb-icon").style.color=Ut[n.cat].color)}setCds(e){this.cds=e}toast(e,t,n="#e9c988",i="✦"){const a=Ra("div","toast");for(a.style.setProperty("--tone",n),a.innerHTML=`<span class="t-ico">${i}</span><span class="t-body"><b>${e}</b><span>${t}</span></span>`,this.dom.toasts.appendChild(a),setTimeout(()=>{a.classList.add("out"),setTimeout(()=>a.remove(),320)},3800);this.dom.toasts.children.length>4;)this.dom.toasts.firstChild.remove()}objective(e){const t=this.dom.objective;t.innerHTML=`<b>OBJECTIVE UPDATED</b><span>${e}</span>`,t.classList.remove("hidden"),clearTimeout(this._objT),this._objT=setTimeout(()=>t.classList.add("hidden"),3600)}spellBanner(e){if(!e)return;const t=this.dom.spellBanner;this.dom.bannerName.textContent=e.name,this.dom.bannerRune.textContent=e.rune,this.dom.bannerRune.style.color=Ut[e.cat].color,t.classList.remove("hidden","hide"),clearTimeout(this._bannerT),this._bannerT=setTimeout(()=>{t.classList.add("hide"),setTimeout(()=>t.classList.add("hidden"),500)},3e3)}levelFlash(e,t){this.dom.lfLevel.textContent=e,this.dom.lfTitle.textContent=t;const n=this.dom.levelFlash;n.classList.remove("hidden");const i=n.querySelector(".lf-ring");i.style.animation="none",i.offsetWidth,i.style.animation="",clearTimeout(this._lfT),this._lfT=setTimeout(()=>n.classList.add("hidden"),2400)}floatText(e,t,n,i=""){const a=Ra("div",`dmg-num ${i}`,n);a.style.left=`${e}px`,a.style.top=`${t}px`,this.dom.damage.appendChild(a),setTimeout(()=>a.remove(),950)}combatLog(e,t=""){const n=Ra("div",`log-line ${t}`,e);for(this.dom.combatLog.prepend(n);this.dom.combatLog.children.length>5;)this.dom.combatLog.lastChild.remove();setTimeout(()=>{n.style.opacity="0",n.style.transition="opacity .6s"},3600)}setCombat(e){this.dom.combat.classList.toggle("hidden",!e),document.body.classList.toggle("combat-on",e),this.dom.crosshair.style.display=e?"":"none",e||(this.combatHp=null,this.combatMp=null,this.combo=0,this.dom.comboEl.classList.remove("on"))}updateCombat({hp:e,mp:t,enemyName:n,enemyRank:i,enemyHp:a,enemyMax:r,round:o,casting:l,castColor:c,combo:d}){this.combatHp=e,this.combatMp=t,n!==void 0&&(this.dom.enemyName.textContent=n,this.dom.enemyRank.textContent=i||"DUEL"),a!==void 0&&(this.dom.enemyHp.style.width=`${Di(a/r*100,0,100)}%`,this.dom.enemyHpText.textContent=`${Math.max(0,Math.ceil(a))} / ${r}`),o&&(this.dom.duelRound.textContent=`ROUND ${["I","II","III","IV","V","VI","VII","VIII","IX"][o-1]||o}`),this.dom.enemyCast.classList.toggle("on",!!l),l&&this.dom.enemyCast.style.setProperty("--cast-col",c||"var(--rose)"),d!==void 0&&(this.combo=d,this.dom.comboEl.textContent=`×${d}`,this.dom.comboEl.classList.toggle("on",d>1)),this.updateMeters()}setInteract(e,t="E"){if(!e){this.dom.interact.classList.add("hidden");return}this.dom.interact.classList.remove("hidden"),this.dom.interactText.textContent=e,this.dom.interact.querySelector("kbd").textContent=t}playInteract(){this.dom.interact.classList.add("hidden")}openPanel(e){if(!e)return;this.panel=e,this.panelTab=e,this.dom.overlay.classList.remove("hidden"),this.dom.modal.classList.add("hidden");const t=Ps.find(n=>n.id===e)||Ps[0];this.dom.kicker.textContent=t.kicker,this.dom.title2.textContent=t.title,this.dom.nav.querySelectorAll(".nav-btn").forEach(n=>n.classList.toggle("active",n.dataset.panel===e)),this.renderPanel(),this.actions.onPanelOpen?.(e)}renderPanel(){if(!this.panel)return;const e=Ps.find(t=>t.id===this.panel)||Ps[0];this.dom.kicker.textContent=e.kicker,this.dom.title2.textContent=e.title,this.dom.body.innerHTML=ev(this,this.panel),this.dom.panelGold.textContent=this.game.s.gold.toLocaleString(),this.dom.panelRep.textContent=this.game.s.rep}closePanel(){this.panel=null,this.dom.overlay.classList.add("hidden"),this.actions.onPanelClose?.()}onAction(e,t,n){switch(this.audio.ui(),e){case"ing-tab":this.craft.tab=t,this.renderPanel();break;case"select-wood":this.craft.woodId=this.craft.woodId===t?null:t,this.renderPanel();break;case"select-core":this.craft.coreId=this.craft.coreId===t?null:t,this.renderPanel();break;case"toggle-mat":{const i=si[this.game.s.upgrades.bench].slots;if(this.craft.materials.includes(t))this.craft.materials=this.craft.materials.filter(a=>a!==t);else if(this.craft.materials.length>=i){this.toast("Bench is full","Upgrade your workbench for more finishing slots.","#ff8c9a","⚒"),this.audio.error();return}else this.craft.materials.push(t);this.renderPanel();break}case"remove-mat":this.craft.materials=this.craft.materials.filter(i=>i!==t),this.renderPanel();break;case"craft":this.doPlayerCraft();break;case"craft-clear":this.craft={...this.craft,woodId:null,coreId:null,materials:[]},this.renderPanel();break;case"spell-cat":this.spellCat=t,this.renderPanel();break;case"toggle-loadout":this.toggleLoadout(t);break;case"spell-info":{const i=en.find(o=>o.id===t),a=Ka.find(o=>o.lessons.some(l=>l.spell===t)),r=a?.lessons.find(o=>o.spell===t);this.toast(i.name,`Learn it in ${a?a.name:"the Academy"}${r?.req?.level?` (requires level ${r.req.level})`:""}.`,Ut[i.cat].color,i.rune);break}case"attend-lesson":this.startLesson(t);break;case"shop-tab":this.shopTab=t,this.renderPanel();break;case"select-customer":this.shopCustomer=t,this.renderPanel();break;case"sell-wand":this.doSell(t);break;case"buy-market":{this.game.buyMarket(t)?(this.toast("Purchased","Added to your stores.","#e9c988","◉"),this.audio.gather()):this.audio.error(),this.refresh(),this.renderPanel();break}case"buy-upgrade":{this.game.buyUpgrade(t)?this.audio.levelup():this.audio.error(),this.refresh(),this.renderPanel();break}case"equip-wand":this.game.equip(t),this.refresh(),this.renderPanel();break;case"travel":this.actions.travel?.(t);break;case"spell-detail":break;case"start-duel":this.actions.startDuel?.(t);break;case"start-tournament":this.actions.startTournament?.(t);break}}doPlayerCraft(){const e=this.craft;if(!e.woodId||!e.coreId)return;const t=this.game.craft({...e});if(!t.ok){this.toast("The wand resists",t.msg,"#ff8c9a","⚒"),this.audio.error();return}this.audio.gather(),this.craft.materials=[],this.game.countItem("woods",e.woodId)||(this.craft.woodId=null),this.game.countItem("cores",e.coreId)||(this.craft.coreId=null),this.refresh(),this.renderPanel(),this.toast(t.wand.name,`${Vt[t.wand.rarity].name} · quality ${t.wand.quality}`,Vt[t.wand.rarity].color,"⌁"),t.isNewRecipe&&(this.showModal(`<div class="modal-kicker">A COMBINATION THE SHOP WILL REMEMBER</div>
        <div class="modal-title">${t.wand.name}</div>
        <div class="modal-sub">${t.wand.recipe?.lore||""}</div>
        <div class="modal-sep"></div>
        <div style="display:grid;place-items:center">${ir(t.wand,{scale:.9})}</div>
        <div class="wand-trait" style="margin-top:10px"><b>${t.wand.recipe?.trait||t.wand.trait.name}</b>${t.wand.recipe?.traitDesc||t.wand.trait.desc}</div>
        <div class="modal-actions"><button class="btn-gold" onclick="document.getElementById('modal').classList.add('hidden')">A wand for the ledger</button></div>`),this.audio.victory())}toggleLoadout(e){if(!(this.game.s.known[e]!==void 0))return;const n=!this.game.s.loadout.includes(e);this.game.setLoadout(e,n),this.updateSpellbar(),this.refresh(),this.renderPanel()}doSell(e){const t=this.game.s.customers.find(r=>r.id===(this.shopCustomer||this.game.s.customers[0]?.id));if(!t)return;const n=this.game.sell(e,t.id),i=this.game.getCustomerInfo(t),a=this.game.s.wands.find(r=>r.id===e)||{};n.ok?(this.audio.victory(),this.showModal(`<div class="modal-kicker">A WAND FINDING ITS WIZARD</div>
        <div class="modal-title">◉ ${n.price.toLocaleString()}</div>
        <div class="modal-sub">${Ni(Ec(n.eval,a,i))}</div>
        <div class="reward-row">
          <div class="reward"><span>◉</span>${n.price} galleons</div>
          <div class="reward rep"><span>✧</span>+4 reputation</div>
          <div class="reward xp"><span>✦</span>+${Math.round(30+n.eval.score*.9)} XP</div>
        </div>
        <div class="modal-actions"><button class="btn-gold" data-close>Lovely.</button></div>`),this.shopCustomer&&(this.game.s.customers.find(o=>o.id===this.shopCustomer)||(this.shopCustomer=this.game.s.customers[0]?.id||null))):(this.audio.error(),this.showModal(`<div class="modal-kicker">NOT QUITE THE ONE</div>
        <div class="modal-title">${Ni(i?.name||"The customer")} declines</div>
        <div class="modal-sub">${Ni(Ec(n.eval,a,i))}</div>
        <div class="modal-actions"><button class="btn-line" data-close>Try another wand</button></div>`)),this.refresh(),this.panel&&this.renderPanel()}startLesson(e){let t,n;for(const a of Ka){const r=a.lessons.find(o=>o.id===e);if(r){t=r,n=a;break}}if(!t)return;const i=en.find(a=>a.id===t.spell);this.challenge(t,n,i,()=>{this.game.completeLesson(e)&&(this.audio.levelup(),this.spellBanner(i),this.refresh(),this.panel&&this.renderPanel(),this.showModal(`<div class="modal-kicker">LESSON COMPLETE</div>
          <div class="modal-title">${i.name}</div>
          <div class="modal-sub">${Ni(i.desc)}</div>
          <div class="reward-row">
            <div class="reward xp"><span>✦</span>+${t.xp} XP</div>
            <div class="reward rep"><span>✧</span>+3 reputation</div>
            <div class="reward"><span>${i.rune}</span>${Ut[i.cat].name} spell learned</div>
          </div>
          <div class="modal-actions"><button class="btn-gold" data-close>Add to the grimoire</button></div>`))})}challenge(e,t,n,i){this.challengeCleanup&&this.challengeCleanup();const a=e.type,r=Ut[t.cat].color;this.modalLocked=!0;const o=nv(tv).slice(0,a==="rune"?e.runes||4:6);let l=a==="rune"?3:6,c=0,d=e.time,u="watch",h=[],f=8,g=1,v=34,m=!1;const p=e.time,x=20,M=`<div class="challenge" id="ch-root">
      <div class="challenge-head"><span>${Ni(e.name)}</span><span id="ch-timer-label">${Math.ceil(d)}s</span><span>${Ni(t.teacher)}</span></div>
      <div class="challenge-timer"><div id="ch-timer" style="width:100%"></div></div>
      <div class="modal-sub" style="margin-bottom:6px">${a==="rune"?"Watch the rune sequence, then repeat it with your wand. A mistake costs a heart.":"Cast when the needle passes through the bright band. Three clean casts will carry the lesson."}</div>
      ${a==="rune"?`<div class="rune-row" id="ch-runes">${o.map((F,z)=>`<button class="rune-btn" data-rune="${F}" style="--rn:${r}">${F}</button>`).join("")}</div>
        <div class="lesson-steps" id="ch-steps">${o.map((F,z)=>'<div class="lesson-step"></div>').join("")}</div>`:`<div class="timing-track" id="ch-track" style="--z:${v}"><div class="zone" style="left:${v-x/2}%;width:${x}%"></div><div class="zone best" style="left:${v-3}%;width:6%"></div><div class="needle" id="ch-needle" style="left:8%"></div></div>
        <div class="lesson-steps" id="ch-steps"><div class="lesson-step"></div><div class="lesson-step"></div><div class="lesson-step"></div></div>
        <button class="btn-gold" id="ch-cast" style="margin-top:16px">Cast</button>`}
      <div class="challenge-status" id="ch-status">${a==="rune"?"Watching the wand…":"Ready — wait for the needle."}</div>
      <div class="modal-actions"><button class="btn-line" id="ch-leave">Leave the lesson</button></div>
      <div style="margin-top:10px;display:flex;justify-content:center;gap:8px" id="ch-hearts">${"❤".repeat(l)}</div>
    </div>`;this.showModal(M,{wide:!0,locked:!0});const _=ge("ch-root"),E=ge("ch-status"),T=ge("ch-timer"),y=ge("ch-timer-label"),b=ge("ch-hearts"),P=[...document.querySelectorAll("#ch-steps .lesson-step")],I=[...document.querySelectorAll(".rune-btn")],O=()=>{b.textContent="❤".repeat(Math.max(0,l))+"·".repeat(Math.max(0,(a==="rune"?3:6)-l))},k=()=>{m||(m=!0,R(),this.modalLocked=!1,this.audio.error(),this.showModal(`<div class="modal-kicker">THE LESSON RESISTS</div>
        <div class="modal-title">Not this time</div>
        <div class="modal-sub">${Ni(t.teacher)} taps the desk. “Again. The wand doesn't care that you were close.”</div>
        <div class="modal-actions"><button class="btn-gold" id="ch-retry">Try again</button><button class="btn-line" data-close>Leave</button></div>`),ge("ch-retry").addEventListener("click",()=>this.challenge(e,t,n,i)))},Z=()=>{m||(m=!0,R(),this.modalLocked=!1,i())},R=()=>{clearInterval(U),document.querySelectorAll(".rune-btn").forEach(F=>F.classList.remove("flash")),this.challengeCleanup=null,this.modalLocked=!1};if(this.challengeCleanup=R,_.querySelector("#ch-leave").addEventListener("click",()=>{R(),this.closeModal()}),a==="rune"){let F=0;const z=()=>{if(m)return;if(F>=o.length){u="play",E.textContent="Your turn. Repeat the sequence.";return}const j=o[F],W=I.find(te=>te.dataset.rune===j);W?.classList.add("flash"),this.audio.tone({freq:420+F*60,type:"sine",dur:.18,vol:.09}),setTimeout(()=>W?.classList.remove("flash"),340),F++,setTimeout(z,520)};setTimeout(z,650),I.forEach(j=>j.addEventListener("click",()=>{if(m||u!=="play")return;const W=o[h.length];j.dataset.rune===W?(j.classList.add("flash"),setTimeout(()=>j.classList.remove("flash"),250),this.audio.tone({freq:520+h.length*70,type:"triangle",dur:.2,vol:.1}),h.push(j.dataset.rune),P[h.length-1]?.classList.add("done"),h.length>=o.length&&Z()):(j.classList.add("wrong"),setTimeout(()=>j.classList.remove("wrong"),320),l--,O(),this.audio.error(),h=[],P.forEach(te=>te.classList.remove("done")),E.textContent=l>0?"The runes scatter. Start the sequence again.":"The lesson slips away.",l<=0&&k())}))}else{const F=_.querySelector("#ch-cast");_.querySelector("#ch-needle");const z=()=>{if(m)return;const j=Math.abs(f-v)<=2.5;Math.abs(f-v)<=x/2?(c++,P[c-1]?.classList.add("done"),this.audio.tone({freq:560+c*90,type:"triangle",dur:.25,vol:.1}),E.textContent=j?"Perfect. The spell holds.":"Clean enough. Again.",c>=3&&Z()):(l--,O(),this.audio.error(),E.textContent=l>0?"The gesture slips. Steady your hand.":"The spell fizzles out.",l<=0&&k())};F.addEventListener("click",z),_.addEventListener("keydown",j=>{(j.key===" "||j.key==="Enter")&&(j.preventDefault(),z())}),setTimeout(()=>{u="play",E.textContent="Now — cast in the bright band."},700)}const U=setInterval(()=>{if(!m){if(d-=.06,T.style.width=`${Di(d/p*100,0,100)}%`,y.textContent=`${Math.max(0,Math.ceil(d))}s`,d<=0){k();return}if(a==="timing"){f+=g*1.7,f>=96&&(f=96,g=-1),f<=4&&(f=4,g=1);const F=document.getElementById("ch-needle");F&&(F.style.left=f-1+"%")}}},60)}talk(e){const t=dg[e];if(!t)return;const n=t.lines,i=n.greet,a=[];e==="orin"?(a.push({label:"Show me the bench",action:()=>{this.closeDialogue(),this.openPanel("craft")}}),a.push({label:"Tell me about wands",action:()=>this.setDialogueText(n.craft)}),a.push({label:"Any legendary pairings?",action:()=>this.setDialogueText(n.legendary)}),a.push({label:"Farewell",action:()=>this.closeDialogue()})):e==="reed"?(a.push({label:"Attend a lesson",action:()=>{this.closeDialogue(),this.openPanel("spells")}}),a.push({label:"How does spellcraft work?",action:()=>this.setDialogueText(n.teach)}),a.push({label:"Farewell",action:()=>this.closeDialogue()})):e==="sable"?(a.push({label:"Enter the ring",action:()=>{this.closeDialogue(),this.openPanel("duel")}}),a.push({label:"Advice?",action:()=>this.setDialogueText(n.duel)}),a.push({label:"Farewell",action:()=>this.closeDialogue()})):e==="keeper"?(a.push({label:"The Forbidden Arts",action:()=>{this.closeDialogue(),this.openPanel("spells")}}),a.push({label:"Why keep them?",action:()=>this.setDialogueText(n.forbidden)}),a.push({label:"Farewell",action:()=>this.closeDialogue()})):a.push({label:"Farewell",action:()=>this.closeDialogue()}),this.dom.dialogue.classList.remove("hidden"),this.dialogueOpen=!0,this.dom.dlgPortrait.textContent=t.initials,this.dom.dlgPortrait.style.color=t.color,this.dom.dlgName.textContent=t.name,this.dom.dlgText.textContent=i,this.dialogueChoices=a,this.dom.dlgChoices.innerHTML=a.map((r,o)=>`<button class="dlg-choice" data-choice="${o}">${r.label}</button>`).join("")+'<button class="dlg-close" aria-label="Close">✕</button>',this.actions.onDialogue?.(!0)}setDialogueText(e){this.dom.dlgText.style.opacity="0",setTimeout(()=>{this.dom.dlgText.textContent=e,this.dom.dlgText.style.opacity="1"},120)}closeDialogue(){this.dom.dialogue.classList.add("hidden"),this.dialogueOpen=!1,this.actions.onDialogue?.(!1)}showModal(e,{wide:t=!1,locked:n=!1}={}){this.modalOpen=!0,this.modalLocked=n,this.dom.modal.classList.remove("hidden"),this.dom.modalCard.classList.toggle("wide",t),this.dom.modalCard.innerHTML=e,this.dom.modalCard.querySelectorAll("[data-close]").forEach(i=>i.addEventListener("click",()=>this.closeModal())),this.actions.onModal?.(!0)}closeModal(){this.modalOpen=!1,this.modalLocked=!1,this.dom.modal.classList.add("hidden"),this.dom.modalCard.innerHTML="",this.challengeCleanup&&(this.challengeCleanup(),this.challengeCleanup=null),this.actions.onModal?.(!1)}drawMinimap(e,t,n=0){const i=this.minimapCtx;if(!i||!e)return;const a=320,r=320,o=a/2,l=r/2,d=(a/2-8)/92;i.clearRect(0,0,a,r),i.save(),i.beginPath(),i.arc(o,l,a/2-2,0,Math.PI*2),i.clip();const u=i.createRadialGradient(o,l,0,o,l,a/2);u.addColorStop(0,"#1a2033"),u.addColorStop(.7,"#11131f"),u.addColorStop(1,"#08080f"),i.fillStyle=u,i.fillRect(0,0,a,r);const h=(g,v)=>({x:o+(g-t.x)*d,y:l+(v-t.z)*d});for(const g of li){const v=h(g.x,g.z),m=g.r*d,p=i.createRadialGradient(v.x,v.y,0,v.x,v.y,Math.max(6,m));p.addColorStop(0,g.color+"33"),p.addColorStop(1,g.color+"00"),i.fillStyle=p,i.beginPath(),i.arc(v.x,v.y,Math.max(6,m),0,Math.PI*2),i.fill()}for(const g of e.nodes){if(!g.active)continue;const v=h(g.x,g.z);v.x<-10||v.x>a+10||v.y<-10||v.y>r+10||(i.fillStyle=g.info.color,i.globalAlpha=.8,i.beginPath(),i.arc(v.x,v.y,2.4,0,Math.PI*2),i.fill())}i.globalAlpha=1;for(const g of e.interactables){const v=h(g.x,g.z);v.x<0||v.x>a||v.y<0||v.y>r||(i.fillStyle=g.markerColor||"#e9c988",i.globalAlpha=.75,i.beginPath(),i.arc(v.x,v.y,3,0,Math.PI*2),i.fill())}i.globalAlpha=1;for(const g of e.npcs){const v=h(g.x,g.z);i.fillStyle="#ffd27a",i.beginPath(),i.arc(v.x,v.y,3.4,0,Math.PI*2),i.fill(),i.strokeStyle="rgba(255,210,122,.4)",i.lineWidth=1,i.beginPath(),i.arc(v.x,v.y,5.5,0,Math.PI*2),i.stroke()}i.save(),i.translate(o,l);const f=n;i.rotate(-f+Math.PI),i.fillStyle="#ffe6b0",i.shadowColor="#e9c988",i.shadowBlur=10,i.beginPath(),i.moveTo(0,-9),i.lineTo(6.5,6),i.lineTo(0,2.5),i.lineTo(-6.5,6),i.closePath(),i.fill(),i.restore(),i.strokeStyle="rgba(233,201,136,.12)",i.lineWidth=1;for(const g of[40,80,120])i.beginPath(),i.arc(o,l,g,0,Math.PI*2),i.stroke();i.restore()}zoneFor(e,t){let n=null,i=1/0;for(const a of li){const r=Math.hypot(e-a.x,t-a.z);r<a.r&&r<i&&(n=a,i=r)}return n}compass(e){const t=this.dom.compass;if(!t)return;const n=(-e*180/Math.PI%360+360)%360;t.style.transform=`translateX(${-(n/360)*100}%)`}}function Ni(s=""){return String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;")}class sv{constructor(){this.ctx=null,this.master=null,this.enabled=!0,this.ambient=null,this.ambientGain=null}init(){if(this.ctx){this.ctx.state==="suspended"&&this.ctx.resume();return}const e=window.AudioContext||window.webkitAudioContext;e&&(this.ctx=new e,this.master=this.ctx.createGain(),this.master.gain.value=this.enabled?.5:0,this.master.connect(this.ctx.destination),this.startAmbient())}setEnabled(e){this.enabled=e,this.master&&this.master.gain.setTargetAtTime(e?.5:0,this.ctx.currentTime,.1)}startAmbient(){if(!this.ctx||this.ambient)return;const e=this.ctx,t=e.createGain();t.gain.value=0,t.connect(this.master);const n=e.createBiquadFilter();n.type="lowpass",n.frequency.value=520,n.Q.value=.7,n.connect(t);const a=[110,164.81,220,261.63,329.63].map((g,v)=>{const m=e.createOscillator();m.type=v%2?"sine":"triangle",m.frequency.value=g;const p=e.createGain();return p.gain.value=.02+(v===0?.02:0),m.connect(p),p.connect(n),m.start(),{osc:m,g:p,base:g}}),r=e.sampleRate*4,o=e.createBuffer(1,r,e.sampleRate),l=o.getChannelData(0);for(let g=0;g<r;g++)l[g]=(Math.random()*2-1)*.35;const c=e.createBufferSource();c.buffer=o,c.loop=!0;const d=e.createGain();d.gain.value=.012;const u=e.createBiquadFilter();u.type="bandpass",u.frequency.value=900,u.Q.value=.6,c.connect(u),u.connect(d),d.connect(t),c.start(),t.gain.setTargetAtTime(.5,e.currentTime,4),this.ambient={oscs:a,noise:c,gain:t},this.ambientGain=t;const h=e.createOscillator();h.frequency.value=.055;const f=e.createGain();f.gain.value=140,h.connect(f),f.connect(n.frequency),h.start()}tone({freq:e=440,type:t="sine",dur:n=.3,vol:i=.2,slide:a=0,delay:r=0,filter:o=0,q:l=1,pan:c=0}){if(!this.ctx||!this.enabled)return;const d=this.ctx,u=d.currentTime+r,h=d.createOscillator();h.type=t,h.frequency.setValueAtTime(e,u),a&&h.frequency.exponentialRampToValueAtTime(Math.max(20,e+a),u+n);const f=d.createGain();f.gain.setValueAtTime(0,u),f.gain.linearRampToValueAtTime(i,u+Math.min(.04,n*.2)),f.gain.exponentialRampToValueAtTime(1e-4,u+n);let g=h;if(o){const v=d.createBiquadFilter();v.type="lowpass",v.frequency.value=o,v.Q.value=l,g.connect(v),g=v}if(c&&d.createStereoPanner){const v=d.createStereoPanner();v.pan.value=c,g.connect(v),v.connect(f)}else g.connect(f);f.connect(this.master),h.start(u),h.stop(u+n+.05)}noise({dur:e=.3,vol:t=.2,freq:n=1200,delay:i=0,type:a="bandpass",q:r=.8,slide:o=0}){if(!this.ctx||!this.enabled)return;const l=this.ctx,c=l.currentTime+i,d=Math.floor(l.sampleRate*e),u=l.createBuffer(1,d,l.sampleRate),h=u.getChannelData(0);for(let m=0;m<d;m++)h[m]=(Math.random()*2-1)*(1-m/d);const f=l.createBufferSource();f.buffer=u;const g=l.createBiquadFilter();g.type=a,g.frequency.setValueAtTime(n,c),g.Q.value=r,o&&g.frequency.exponentialRampToValueAtTime(Math.max(60,n+o),c+e);const v=l.createGain();v.gain.value=t,f.connect(g),g.connect(v),v.connect(this.master),f.start(c),f.stop(c+e)}cast(e="offense"){const t={offense:{f:620,t:"triangle",s:-260,d:.32,v:.16,n:2400},defense:{f:320,t:"sine",s:180,d:.6,v:.13,n:900},healing:{f:520,t:"sine",s:240,d:.7,v:.11,n:1600},elemental:{f:480,t:"sawtooth",s:-180,d:.42,v:.1,n:2800},transformation:{f:380,t:"triangle",s:320,d:.5,v:.13,n:1800},forbidden:{f:180,t:"sawtooth",s:-90,d:.7,v:.14,n:700}},n=t[e]||t.offense;this.tone({freq:n.f,type:n.t,dur:n.d,vol:n.v,slide:n.s}),this.noise({dur:n.d*.7,vol:n.v*.4,freq:n.n,slide:-n.n*.4})}hit(){this.noise({dur:.18,vol:.24,freq:280,type:"lowpass",q:1.4,slide:-180}),this.tone({freq:140,type:"square",dur:.12,vol:.1,slide:-70})}shield(){this.tone({freq:280,type:"sine",dur:.6,vol:.14,slide:140}),this.tone({freq:560,type:"sine",dur:.5,vol:.07,slide:210,delay:.04})}heal(){[523,659,784].forEach((e,t)=>this.tone({freq:e,type:"sine",dur:.5,vol:.08,delay:t*.08}))}gather(){[660,990].forEach((e,t)=>this.tone({freq:e,type:"triangle",dur:.25,vol:.09,delay:t*.07}))}ui(){this.tone({freq:880,type:"sine",dur:.07,vol:.05})}error(){this.tone({freq:190,type:"square",dur:.16,vol:.08,slide:-50})}levelup(){[392,523,659,784,1046].forEach((e,t)=>this.tone({freq:e,type:"triangle",dur:.5,vol:.1,delay:t*.09})),this.tone({freq:130,type:"sine",dur:1.4,vol:.1,delay:.1})}victory(){[523,659,784,1046].forEach((e,t)=>this.tone({freq:e,type:"triangle",dur:.7,vol:.11,delay:t*.12}))}defeat(){[392,330,262,196].forEach((e,t)=>this.tone({freq:e,type:"sine",dur:.8,vol:.1,delay:t*.16}))}duelStart(){for(let e=0;e<3;e++)this.tone({freq:300-e*40,type:"sine",dur:.2,vol:.16,delay:e*.45});this.tone({freq:440,type:"triangle",dur:.8,vol:.14,delay:1.35}),this.noise({dur:.7,vol:.12,freq:1600,delay:1.35})}step(){this.noise({dur:.06,vol:.03,freq:380,type:"lowpass"})}}const av=(s,e,t)=>Math.max(e,Math.min(t,s)),In=(s,e)=>s+Math.random()*(e-s),Ca=(s,e)=>Math.hypot(s.x-e.x,s.z-e.z);class rv{constructor(e,t,n,i={}){this.game=e,this.effects=t,this.audio=n,this.cb=i,this.scene=null,this.arena=null,this.active=!1,this.projectiles=[],this.enemyProjectiles=[],this.summons=[],this.cds={},this.combo=0,this.comboTimer=0,this.resultSent=!1,this.shieldHeld=!1,this.spellCount=0}dispose(){this.active=!1,this.resultSent=!0;for(const e of[...this.projectiles,...this.enemyProjectiles])this.destroyProjectile(e);this.projectiles=[],this.enemyProjectiles=[],this.summons=[],this.scene&&this.effects.setScene(null),this.scene=null,this.arena=null}start(e,t={}){this.dispose(),this.resultSent=!1,this.active=!0,this.def=e,this.scene=new sd,this.arena=$g(this.scene,e.arena||"ring"),this.effects.setScene(this.scene),this.cds={},this.projectiles=[],this.enemyProjectiles=[],this.summons=[],this.combo=0,this.comboTimer=0,this.spellCount=0,this.phase="intro",this.introTime=2,this.round=1,this.shieldHeld=!1,this.shieldVisual=null,this.wardTime=0,this.aegisTime=0,this.dodgeTime=0,this.dodgeCd=0,this.shieldHeldTime=0,this.revived=!1,this.enemyDots=[],this.enemyStatus={stun:0,slow:0,silence:0,fear:0,wet:0,lift:0},this.bossPhase=1,this.castQueue=[],this.enemyCast=null,this.enemyCastCd=In(1.2,2.2);const n=this.game;this.maxHp=n.maxHp()+(n.s.upgrades.cauldron?20:0),this.hp=this.maxHp,this.maxMp=n.maxMp(),this.mp=this.maxMp,this.wand=n.wand,this.player=Za({robe:"#2f3560",accent:"#d9b268",hair:"#2b1e1a",hat:!0,scale:1.02,name:t.name||n.s.name,subtitle:n.displayTitle(),nameColor:"#f0d79e"});const i=this.arena.playerSpawn;this.player.group.position.copy(i),this.player.group.rotation.y=Math.PI,this.player.setWand(this.wand),this.scene.add(this.player.group);const a=e;this.enemy=Za({robe:a.robe,accent:a.accent,hair:"#1c1518",hat:a.behavior!=="brute",crown:a.behavior==="boss",horns:a.behavior==="guardian",scale:a.behavior==="brute"?1.5:a.behavior==="boss"?1.3:1.04,name:a.name,subtitle:a.title,nameColor:a.accent});const r=this.arena.enemySpawn;return this.enemy.group.position.copy(r),this.enemy.group.rotation.y=0,this.enemy.setWand({woodId:a.behavior==="boss"?"voidbriar":"blackthorn",coreId:a.behavior==="boss"?"wraithglass":"dragon",length:12,stats:{aether:40}}),this.scene.add(this.enemy.group),this.enemyHp=a.hp,this.enemyMaxHp=a.hp,this.playerPos=this.player.group.position,this.enemyPos=this.enemy.group.position,this.arena.update(0,0),this.effects.runeCircle(new L(i.x,.05,i.z),"#e9c988",3,1.6),this.effects.runeCircle(new L(r.x,.05,r.z),a.accent,3,1.6),this.effects.ring(new L(0,.06,0),"#e9c988",16,1.1),this.audio.duelStart?.(),this.cb.onHud?.({enemyName:a.name,enemyRank:a.boss?"BOSS DUEL":a.rank.toUpperCase(),round:1,hp:this.hp,mp:this.mp,enemyHp:this.enemyHp,enemyMax:this.enemyMaxHp,casting:!1}),this.cb.onLog?.(`<b>${a.name}</b> steps into the circle.`,"spell"),this.cb.onStart?.(this),this}trait(e){return this.wand?.trait?.key==="recipe"&&this.wand.recipe?.name===e}get cdMultiplier(){let e=1;return this.trait("Astral Sovereign")&&(e*=.8),this.wand?.coreId==="moonstoneheart"&&(e*=.85),this.wand?.coreId==="augurey"&&this.trait("Oracle’s Sigh")&&(e*=.85),e}manaCost(e){let t=e.mana;const n=this.wand?.coreId;return n==="dragon"&&e.cat==="offense"&&(t*=1.1),n==="unicorn"&&e.cat==="forbidden"&&(t*=1.15),n==="wraithglass"&&(t*=.9),this.trait("Nightfall")&&e.cat==="forbidden"&&(t*=.7),Math.round(t)}cast(e){if(!this.active||this.phase!=="fight")return;const t=this.game.s.loadout[e];if(!t)return;const n=en.find(h=>h.id===t);if(!n||(this.cds[n.id]||0)>0)return;const i=this.manaCost(n);if(this.mp<i){this.cb.onToast?.("Not enough mana","The wand sputters. Let it breathe.","#78b4ff","✦");return}this.mp-=i,this.cds[n.id]=n.cd*this.cdMultiplier,this.game.addMastery(n.id,n.cat==="forbidden"?.5:.7),this.spellCount++;const a=this.game.masteryRank(n.id).mult,r=vg(this.wand,n.cat);let o=Math.max(1,n.dmg)*r*a*In(.92,1.08);this.wand?.coreId==="dragon"&&n.cat==="offense"&&(o*=1.15),this.wand?.coreId==="unicorn"&&n.cat==="healing"&&(o*=1.2),this.trait("Nightfall")&&n.cat==="forbidden"&&(o*=1.25),this.trait("Nightfall")&&n.cat==="healing"&&(o*=.5);const l=.07+(this.wand?.stats.ctrl||0)/520,c=Math.random()<l;c&&(o*=1.55),this.player.cast(),this.effects.castSpark(this.player.getTipWorld(),n.color),this.audio.cast?.(n.cat),this.cb.onLog?.(`You cast <b>${n.name}</b>${c?" — a perfect gesture!":""}`,"spell");const d=this.player.getTipWorld(),u=new L(this.enemyPos.x,1.15,this.enemyPos.z);switch(n.effect){case"projectile":{this.spawnPlayerProjectile(d,u,n,o,c,{status:n.status,statusTime:n.statusTime,knock:n.knock});break}case"aoe_bolt":{this.spawnPlayerProjectile(d,u,n,o,c,{status:n.status,statusTime:n.statusTime,radius:n.radius||3.5});break}case"beam":{this.effects.beam(d,u,n.color,.16,.4),this.effects.burst(u,n.color,16,{speed:4,size:.4}),this.hitEnemy(o,c,n,{knock:n.knock});break}case"chain":{const h=[d,new L(this.enemyPos.x+In(-.4,.4),1.4,this.enemyPos.z+In(-.4,.4))];this.effects.lightning(h,n.color,.45),this.hitEnemy(o,c,n),(this.trait("Stormcaller")||this.wand?.coreId==="thunderbird")&&setTimeout(()=>{this.active&&this.hitEnemy(o*.3,!1,n)},220);break}case"burst":{this.effects.ring(new L(this.playerPos.x,.06,this.playerPos.z),n.color,n.radius||5,.7),this.effects.burst(new L(this.playerPos.x,1.2,this.playerPos.z),n.color,32,{speed:8,size:.55}),Ca(this.playerPos,this.enemyPos)<=(n.radius||5)&&this.hitEnemy(o,c,n,{status:n.status,statusTime:n.statusTime}),this.effects.shake(.3);break}case"aoe_self":{this.effects.ring(new L(this.playerPos.x,.06,this.playerPos.z),n.color,n.radius||7,.9),this.effects.burst(new L(this.playerPos.x,1.4,this.playerPos.z),n.color,40,{speed:9,size:.7,flash:6}),this.effects.shake(.6),Ca(this.playerPos,this.enemyPos)<=(n.radius||7)&&this.hitEnemy(o,c,n,{status:"burn",statusTime:4});break}case"buff":{n.buff==="ward"?(this.wardTime=n.time,this.effects.runeCircle(new L(this.playerPos.x,.05,this.playerPos.z),n.color,2.4,.8),this.cb.onLog?.("A ward settles over you.","good")):(this.aegisTime=n.time,this.effects.aegisPulse(new L(this.playerPos.x,.05,this.playerPos.z),n.color,3.6),this.cb.onLog?.("Aegis raised — projectiles will break on it.","good"));break}case"heal":case"hot":{const h=(n.effect==="heal",o);n.effect==="heal"?this.healPlayer(h):(this.healPlayer(h*.35),this.hotTime=n.time,this.hotRate=h*.65/n.time),this.effects.heal(new L(this.playerPos.x,.1,this.playerPos.z),n.color),this.audio.heal?.(),(this.trait("Tidecaller")||this.wand?.coreId==="coral")&&(this.wardTime=Math.max(this.wardTime,3),this.effects.ring(new L(this.playerPos.x,.06,this.playerPos.z),"#8ef0b0",2.2,.7));break}case"summon":{this.effects.summon(new L(this.playerPos.x+1.2,.05,this.playerPos.z),n.color),this.summons.push({time:n.time,tick:0,dmg:7*r*a,color:n.color}),this.cb.onLog?.("A spectral serpent coils at your feet.","good");break}}this.trait("Astral Sovereign")&&this.spellCount%5===0&&(this.effects.meteor(u.clone(),"#b48cff",()=>{this.active&&this.enemyHp>0&&this.hitEnemy(40*r,!0,n,{status:"burn",statusTime:3})}),this.cb.onLog?.("The wand remembers the sky. A meteor answers.","spell")),this.cb.onHud?.({hp:this.hp,mp:this.mp})}spawnPlayerProjectile(e,t,n,i,a,r={}){const o=this.effects.createOrb(n.color,.17);o.group.position.copy(e);const l=new L().subVectors(t,e).normalize(),c=n.effect==="aoe_bolt"?20:26,d=l.multiplyScalar(c);this.projectiles.push({orb:o,vel:d,dmg:i,crit:a,spell:n,opts:r,life:2.2,radius:r.radius})}spawnEnemyProjectile(e,t,n,i,a={}){const r=a.color||n?.color||"#ff6b7a",o=this.effects.createOrb(r,a.size||.16);o.group.position.copy(e);const l=new L().subVectors(t,e).normalize();l.x+=In(-.03,.03),l.z+=In(-.03,.03),this.enemyProjectiles.push({orb:o,vel:l.multiplyScalar(a.speed||15),dmg:i,life:4,color:r})}destroyProjectile(e){this.effects.removeOrb(e.orb)}hitEnemy(e,t,n,i={}){if(this.enemyHp<=0)return;let a=e;this.def.behavior==="boss"&&this.bossPhase>1&&(a*=.92),this.enemyHp=Math.max(0,this.enemyHp-a),this.combo++,this.comboTimer=3,this.enemy.flash(),this.audio.hit?.(),this.effects.shake(t?.34:.14),this.cb.onDamage?.(new L(this.enemyPos.x,1.6,this.enemyPos.z),Math.round(a),t?"crit":""),this.cb.onHud?.({enemyHp:this.enemyHp,combo:this.combo}),i.status&&this.applyStatus(i.status,i.statusTime||3),this.wand?.coreId==="basilisk"&&n?.cat==="forbidden"&&this.applyStatus("poison",4),this.trait("Serpent's Kiss")&&n?.cat==="forbidden"&&this.applyStatus("poison",5),this.trait("Sunforged")&&n?.cat==="elemental"&&this.healPlayer(a*.15,!0),this.enemyHp<=0&&this.finishVictory()}applyStatus(e,t){const n=this.enemyStatus;(e==="stun"||e==="lift")&&(n.stun=Math.max(n.stun,t),this.cb.onLog?.(`${this.def.name} is ${e==="lift"?"hoisted into the air":"stunned"}.`,"good")),e==="slow"&&(n.slow=Math.max(n.slow,t),this.cb.onLog?.(`${this.def.name} slows.`,"good")),(e==="silence"||e==="disarm")&&(n.silence=Math.max(n.silence,t),this.cb.onLog?.(`${this.def.name} cannot cast.`,"good")),e==="fear"&&(n.fear=Math.max(n.fear,t),this.cb.onLog?.(`${this.def.name} recoils from the silver light.`,"good")),e==="wet"&&(n.wet=Math.max(n.wet,t)),e==="burn"&&this.enemyDots.push({type:"burn",time:t,dps:5+this.wand.stats.aether*.06}),e==="bleed"&&this.enemyDots.push({type:"bleed",time:t,dps:7}),e==="poison"&&this.enemyDots.push({type:"poison",time:t,dps:6})}healPlayer(e,t=!1){const n=this.hp;this.hp=Math.min(this.maxHp,this.hp+e),t||this.cb.onDamage?.(new L(this.playerPos.x,2.2,this.playerPos.z),Math.round(this.hp-n),"heal"),this.cb.onHud?.({hp:this.hp})}takeDamage(e,t,n={}){if(!this.active||this.phase!=="fight"||this.resultSent)return;if(this.dodgeTime>0){this.cb.onLog?.("You slip aside — the spell finds only air.","good");return}let i=e;if(this.shieldHeld&&this.mp>0&&(i*=this.wand?.coreId==="chimaera"?.36:.45),this.wardTime>0&&(i*=.6),this.aegisTime>0&&(i*=.7),this.trait("Hearthward")&&this.hp<this.maxHp*.3&&(i*=.75),this.trait("Mirrormere")&&t){const a=i*.25;setTimeout(()=>{this.active&&this.enemyHp>0&&this.hitEnemy(a,!1,null)},120)}this.hp=Math.max(0,this.hp-i),this.combo=0,this.cb.onHud?.({hp:this.hp,mp:this.mp,combo:0}),this.cb.onDamage?.(new L(this.playerPos.x,2.1,this.playerPos.z),Math.round(i),"enemy"),this.player.flash(),this.effects.shake(.42),this.effects.burst(new L(this.playerPos.x,1.1,this.playerPos.z),"#ff8a9a",14,{speed:3.5,size:.4}),this.audio.hit?.(),this.cb.onLog?.(`<b>${this.def.name}</b> strikes you for ${Math.round(i)}.`,"dmg"),this.cb.onHudFlash?.(),this.hp<=0&&this.checkDefeat()}checkDefeat(){if(this.trait("Emberheart")&&!this.revived){this.revive("Emberheart");return}if(this.wand?.coreId==="phoenix"&&!this.revived){this.revive("phoenix");return}if(this.trait("Mirrormere")&&!this.revived&&Math.random()<.35){this.revive("mirror");return}this.phase="lost",this.audio.defeat?.(),this.cb.onLog?.("Your wand falls from your hand.","dmg"),this.player.group.rotation.z=.9,setTimeout(()=>this.finishDefeat(),1400)}revive(e){this.revived=!0,this.hp=Math.round(this.maxHp*.3),this.wardTime=2,this.cb.onHud?.({hp:this.hp}),this.cb.onLog?.("The wand refuses. You rise again.","good"),this.cb.onToast?.("Ashes to dawn","Your wand pulls you back from the dark.","#ffbd5e","✦"),this.effects.ring(new L(this.playerPos.x,.06,this.playerPos.z),"#ffbd5e",6,.9),this.effects.burst(new L(this.playerPos.x,1.2,this.playerPos.z),"#ffbd5e",40,{speed:8,size:.7,flash:6}),this.audio.levelup?.(),e==="Emberheart"&&setTimeout(()=>{this.active&&this.enemyHp>0&&this.hitEnemy(28,!0,null)},300)}finishVictory(){this.resultSent||(this.resultSent=!0,this.phase="won",this.enemy.group.rotation.z=-.9,this.enemy.group.position.y=.2,this.effects.ring(new L(this.enemyPos.x,.06,this.enemyPos.z),"#e9c988",5,1),this.effects.burst(new L(this.enemyPos.x,1.3,this.enemyPos.z),this.def.accent,50,{speed:8,size:.7,flash:7}),this.audio.victory?.(),this.cb.onLog?.(`<b>${this.def.name}</b> yields. The circle is yours.`,"good"),this.cb.onHud?.({enemyHp:0}),setTimeout(()=>{this.active&&this.cb.onEnd?.({won:!0,enemy:this.def,rounds:this.round,hpLeft:this.hp})},1500))}finishDefeat(){this.resultSent||(this.resultSent=!0,this.cb.onEnd?.({won:!1,enemy:this.def,hpLeft:0}))}dodge(){!this.active||this.phase!=="fight"||this.dodgeCd>0||(this.dodgeCd=1.15,this.dodgeTime=.32,this.invuln=.42,this.audio.noise?.({dur:.2,vol:.08,freq:700,slide:700}),this.effects.castSpark(new L(this.playerPos.x,.5,this.playerPos.z),"#c9d8ff"),this.cb.onLog?.("You dodge.","good"))}enemyCastSpell(){if(!this.def.spells?.length)return;const e=this.def.spells[Math.floor(Math.random()*this.def.spells.length)],t=en.find(r=>r.id===e)||en[0],n=this.enemy.getTipWorld();new L(this.playerPos.x,1,this.playerPos.z);const i=(this.def.dmg||10)*(t.dmg?av(t.dmg/26,.7,1.6):1)*(this.bossPhase>1?1.15:1);this.enemy.cast(),this.effects.castSpark(n,t.color),this.audio.cast?.(t.cat),this.cb.onLog?.(`<b>${this.def.name}</b> casts ${t.name}.`,"dmg");const a=this.def.behavior==="boss"&&this.bossPhase>1?2:1;for(let r=0;r<a;r++)setTimeout(()=>{if(!this.active||this.phase!=="fight")return;const o=this.enemy.getTipWorld();this.spawnEnemyProjectile(o,new L(this.playerPos.x+In(-1.2,1.2),1,this.playerPos.z+In(-1.2,1.2)),t,i)},r*180);if(this.def.behavior==="brute"){const r=this.playerPos.clone();this.effects.ring(new L(r.x,.06,r.z),"#96c46b",4,.6),Ca(this.playerPos,this.enemyPos)<6&&setTimeout(()=>this.takeDamage(i*1.3,this.enemyPos),700)}}update(e,t={}){if(!this.active)return;const n=performance.now()/1e3;this.arena.update(e,n),this.effects.update(e);for(const d of Object.keys(this.cds))this.cds[d]=Math.max(0,this.cds[d]-e);this.comboTimer=Math.max(0,this.comboTimer-e),this.comboTimer===0&&this.combo&&(this.combo=0,this.cb.onHud?.({combo:0})),this.dodgeCd=Math.max(0,this.dodgeCd-e),this.dodgeTime=Math.max(0,this.dodgeTime-e),this.wardTime=Math.max(0,this.wardTime-e),this.aegisTime=Math.max(0,this.aegisTime-e),this.hotTime>0&&(this.hotTime-=e,this.healPlayer(this.hotRate*e,!0),this.cb.onHud?.({hp:this.hp}));const i=t.shield&&this.mp>0;if(this.shieldHeld=i,i&&(this.mp=Math.max(0,this.mp-9*e),this.cb.onHud?.({mp:this.mp})),this.updateShieldVisual(i),this.phase==="intro"){this.introTime-=e,this.player.update(e,!1),this.enemy.update(e,!1),this.introTime<=.7&&!this._saidFight&&(this._saidFight=!0,this.cb.onLog?.("Wands up.","spell")),this.introTime<=0&&(this.phase="fight",this.cb.onLog?.("The duel begins.","spell"),this.cb.onIntroEnd?.()),this.cb.onHud?.({hp:this.hp,mp:this.mp,enemyHp:this.enemyHp,combo:this.combo});return}if(this.phase!=="fight"){this.player.update(e,!1),this.enemy.update(e,!1);return}const a=this.dodgeTime>0?11.5:5.6;let r=t.moveX||0,o=t.moveZ||0;const l=Math.hypot(r,o);l>.001&&(r=r/l,o=o/l),this.playerPos.x+=r*a*e,this.playerPos.z+=o*a*e,this.arena.clamp(this.playerPos),this.playerPos.y=0;const c=new L(this.enemyPos.x-this.playerPos.x,0,this.enemyPos.z-this.playerPos.z);l>.001?this.player.group.rotation.y=Math.atan2(r,o):this.player.group.rotation.y=Math.atan2(c.x,c.z),this.player.update(e,l>.01,this.dodgeTime>0?1.7:1),this.dodgeTime>0&&this.effects.castSpark(new L(this.playerPos.x,.35,this.playerPos.z),"#8ea8ff"),this.updateEnemy(e,c),this.updateProjectiles(e);for(const d of this.summons)d.time-=e,d.tick-=e,d.tick<=0&&(d.tick=.85,d.visual?.update?.(0),this.enemyHp>0&&(this.hitEnemy(d.dmg,!1,null),this.effects.burst(new L(this.enemyPos.x,.9,this.enemyPos.z),d.color,7,{speed:2.5,size:.3,ttl:.4})));this.summons=this.summons.filter(d=>d.time>0),this.enemyStatus.stun=Math.max(0,this.enemyStatus.stun-e),this.enemyStatus.slow=Math.max(0,this.enemyStatus.slow-e),this.enemyStatus.silence=Math.max(0,this.enemyStatus.silence-e),this.enemyStatus.fear=Math.max(0,this.enemyStatus.fear-e);for(const d of this.enemyDots)d.time-=e,d.tick===void 0&&(d.tick=0),d.tick-=e,d.tick<=0&&(d.tick=.5,this.enemyHp=Math.max(0,this.enemyHp-d.dps*.5),this.cb.onHud?.({enemyHp:this.enemyHp}),this.effects.burst(new L(this.enemyPos.x+In(-.3,.3),1.2,this.enemyPos.z+In(-.3,.3)),d.type==="burn"?"#ff9a3d":d.type==="poison"?"#6effa0":"#ff6f9f",3,{speed:1.5,size:.25,ttl:.4}),this.enemyHp<=0&&this.finishVictory());this.enemyDots=this.enemyDots.filter(d=>d.time>0),this.def.behavior==="boss"&&this.bossPhase===1&&this.enemyHp<this.enemyMaxHp*.55&&(this.bossPhase=2,this.cb.onLog?.("The air turns to smoke. <b>Something older</b> looks out from behind his eyes.","dmg"),this.cb.onToast?.("Phase two","The Hollow stops pretending.","#d65cff","☾"),this.effects.shake(.9),this.effects.ring(new L(this.enemyPos.x,.06,this.enemyPos.z),"#d65cff",12,1.2)),this.cb.onHud?.({hp:this.hp,mp:this.mp,enemyHp:this.enemyHp,casting:!!this.enemyCast,castColor:this.enemyCast?.color,combo:this.combo})}updateShieldVisual(e){if(e&&!this.shieldVisual){const t=this.effects.ward(this.player.group,"#8fd0ff",1.05);this.shieldVisual=t,this.audio.shield?.()}else!e&&this.shieldVisual&&(this.shieldVisual.remove(),this.shieldVisual=null);this.shieldVisual&&(this.shieldVisual.mat.uniforms.opacity.value=.55+Math.sin(performance.now()/120)*.12)}updateEnemy(e,t){const n=this.def,i=t.length(),a=n.behavior,r=this.enemyStatus.slow>0?.45:1,o=this.enemyStatus.stun>0||this.enemyStatus.fear>0,l=this.enemyStatus.silence>0,c=(n.speed||2.5)*r;let d=7;a==="brute"&&(d=2.5),a==="caster"&&(d=12),a==="guardian"&&(d=8),a==="boss"&&(d=9),a==="dummy"&&(d=99);let u=0,h=0;if(!o&&a!=="dummy"){const g=t.x/(i||1),v=t.z/(i||1);i>d+1?(u=g,h=v):i<d-1&&(u=-g,h=-v);const m=Math.sin(performance.now()/1300+(n.id.charCodeAt(0)||0))*(a==="duelist"||a==="master"?1:.35);u+=-v*m,h+=g*m;const p=Math.hypot(u,h)||1;if(this.enemyPos.x+=u/p*c*e,this.enemyPos.z+=h/p*c*e,this.arena.clamp(this.enemyPos),Ca(this.enemyPos,this.playerPos)<1.8){const x=Math.atan2(this.enemyPos.z-this.playerPos.z,this.enemyPos.x-this.playerPos.x);this.enemyPos.x=this.playerPos.x+Math.cos(x)*1.8,this.enemyPos.z=this.playerPos.z+Math.sin(x)*1.8}}const f=Math.atan2(this.playerPos.x-this.enemyPos.x,this.playerPos.z-this.enemyPos.z);if(this.enemy.group.rotation.y=f+(this.enemyStatus.fear>0?Math.sin(performance.now()/90)*.3:0),this.enemy.update(e,Math.hypot(u,h)>.1,a==="master"?1.3:1),this.enemyCast){this.enemyCast.time-=e,this.enemyCast.time<=0&&(this.enemyCast=null,!l&&this.enemyHp>0&&this.enemyCastSpell());return}if(o||l||a==="dummy"||a==="brute"){a==="brute"&&!o&&i<3.2&&Math.random()<e*1.2&&(this.enemy.cast(),this.effects.ring(new L(this.playerPos.x,.06,this.playerPos.z),"#96c46b",3.4,.5),this.takeDamage((n.dmg||12)*1.2,this.enemyPos),this.cb.onLog?.(`<b>${n.name}</b> slams the ground.`,"dmg"));return}if(this.enemyCastCd-=e*(this.bossPhase>1?1.45:1),this.enemyCastCd<=0&&i<26){const g=n.spells[Math.floor(Math.random()*n.spells.length)],v=en.find(m=>m.id===g);this.enemyCast={time:a==="boss"?.62:a==="master"?.7:.9,color:v?.color},this.enemyCastCd=In(1.6,2.9)+(a==="master"?-.4:0)+(this.bossPhase>1?-.5:0),this.cb.onHud?.({casting:!0,castColor:v?.color}),this.cb.onLog?.(`<b>${n.name}</b> raises a wand…`,"dmg")}}updateProjectiles(e){const t=new L(this.enemyPos.x,1.1,this.enemyPos.z),n=new L(this.playerPos.x,1,this.playerPos.z);for(let i=this.projectiles.length-1;i>=0;i--){const a=this.projectiles[i];a.life-=e,a.orb.group.position.addScaledVector(a.vel,e);const r=a.orb.group.position.distanceTo(t);if(r<1.15||a.life<=0){if(r<1.6&&(this.effects.burst(a.orb.group.position.clone(),a.spell.color,a.opts.radius?26:14,{speed:a.opts.radius?6:3.4,size:a.opts.radius?.55:.4}),a.opts.radius&&(this.effects.ring(new L(this.enemyPos.x,.06,this.enemyPos.z),a.spell.color,a.opts.radius,.6),this.effects.shake(.3)),this.hitEnemy(a.dmg,a.crit,a.spell,{status:a.opts.status,statusTime:a.opts.statusTime}),a.opts.knock)){const o=Math.atan2(this.enemyPos.z-this.playerPos.z,this.enemyPos.x-this.playerPos.x);this.enemyPos.x+=Math.cos(o)*.6,this.enemyPos.z+=Math.sin(o)*.6}this.destroyProjectile(a),this.projectiles.splice(i,1)}}for(let i=this.enemyProjectiles.length-1;i>=0;i--){const a=this.enemyProjectiles[i];a.life-=e,a.orb.group.position.addScaledVector(a.vel,e);const r=a.orb.group.position.distanceTo(n);if(r<1||a.life<=0){if(r<1.5)if(this.shieldHeld&&this.mp>0){this.effects.burst(a.orb.group.position.clone(),"#8fd0ff",14,{speed:4,size:.4}),this.audio.shield?.();const o=this.player.getTipWorld();this.spawnPlayerProjectile(o,new L(this.enemyPos.x,1.1,this.enemyPos.z),{color:"#8fd0ff",effect:"projectile"},a.dmg*.5,!1,{}),this.mp=Math.max(0,this.mp-4)}else this.takeDamage(a.dmg,a.orb.group.position.clone()),this.effects.burst(a.orb.group.position.clone(),a.color,14,{speed:3.5,size:.4});this.destroyProjectile(a),this.enemyProjectiles.splice(i,1)}}}get state(){return{hp:this.hp,mp:this.mp,maxHp:this.maxHp,maxMp:this.maxMp,enemyHp:this.enemyHp,cds:this.cds}}}const Tt=s=>document.getElementById(s),Wr=(s,e,t)=>Math.max(e,Math.min(t,s)),ti=(s,e,t,n)=>s+(e-s)*(1-Math.exp(-t*n)),ov={village:{x:0,z:43},academy:{x:-57,z:-28},forest:{x:47,z:-27},lake:{x:43,z:71},ruins:{x:-72,z:76},caverns:{x:99,z:62},crag:{x:108,z:-80},spire:{x:0,z:-110}};class lv{constructor(){this.started=!1,this.loaded=!1,this.pendingFloats=[],this.keys=new Set,this.mouse={down:!1,moved:0,lastX:0,lastY:0},this.yaw=Math.PI*.9,this.pitch=.18,this.camDist=8.6,this.camPos=new L,this.lookAt=new L,this.playerPos=new L,this.activeSpellIndex=0,this.worldCds={},this.worldBolts=[],this.tournament=null,this.duel=null,this.lastZone=null,this.minimapClock=0,this.refreshClock=0,this.refreshPending=!1,this.clock=0,this.setupRenderer(),this.setupWorld(),this.setupGame(),this.setupInput(),this.setupFrame()}setupRenderer(){this.renderer=new cg({canvas:Tt("scene"),antialias:!0,alpha:!1,powerPreference:"high-performance"}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.75)),this.renderer.setSize(window.innerWidth,window.innerHeight),this.renderer.outputColorSpace=ln,this.renderer.toneMapping=Bo,this.renderer.toneMappingExposure=1.04,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=Lc,this.camera=new vn(54,window.innerWidth/window.innerHeight,.1,620),this.scene=new sd,window.addEventListener("resize",()=>{this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)})}setupWorld(){this.world=Vg(this.scene),this.effects=new Wg(this.scene),this.wisp=Mg("#9fe7ff"),this.wisp.group.visible=!1,this.scene.add(this.wisp.group),this.titleCamT=0}setupGame(){this.audio=new sv,this.ui=new iv(Se,this.audio),this.duel=new rv(Se,this.effects,this.audio,this.duelCallbacks()),this.ui.actions={sfx:e=>{e==="ui"&&this.audio.ui()},cast:e=>this.selectAndCast(e),travel:e=>this.travelTo(e),startDuel:e=>this.startDuel(e),startTournament:e=>this.startTournament(e),onPanelOpen:()=>this.onOverlay(!0),onPanelClose:()=>this.onOverlay(!1),onModal:e=>this.onOverlay(e),onDialogue:e=>this.onOverlay(e)},this.bindGameEvents(),this.bindTitle(),this.refreshClock=0,this.timer=setInterval(()=>this.autosave(),3e4),document.addEventListener("visibilitychange",()=>{document.hidden&&this.started&&this.autosave()}),window.addEventListener("beforeunload",()=>{this.started&&this.autosave()})}bindGameEvents(){Se.on("change",()=>{this.refreshPending=!0}),Se.on("levelup",({level:e,title:t})=>{this.audio.levelup(),this.ui.levelFlash(e,t),this.ui.toast("Level "+e,t,"#e9c988","✦"),this.refreshPending=!0}),Se.on("spelllearned",e=>{e&&(this.ui.spellBanner(e),this.ui.toast(e.name,`${Ut[e.cat].name} magic added to your grimoire.`,Ut[e.cat].color,e.rune))}),Se.on("questcomplete",e=>{this.audio.victory(),this.ui.objective(e.objective),this.ui.toast("Quest complete",`${e.name} — ◉ ${e.rewards.gold} · ✧ ${e.rewards.rep} reputation`,"#e9c988","❖")}),Se.on("achievement",e=>{this.ui.toast("Field note",`${e.icon} ${e.name} — ${e.desc}`,"#c79bff",e.icon)}),Se.on("toast",e=>{e?.title&&this.ui.toast(e.title,e.text||"","#e9c988","✦")}),Se.on("saved",()=>{const e=this.ui.dom.autosave;e&&(e.classList.add("on"),clearTimeout(this._saveT),this._saveT=setTimeout(()=>e.classList.remove("on"),1600))}),Se.on("equipped",e=>{this.player&&this.player.setWand(e),this.wisp&&this.wisp.setColor(this.coreColor(e)),this.refreshPending=!0})}coreColor(e){return{unicorn:"#e8f2ff",dragon:"#ff7a4a",phoenix:"#ffbd5e",thunderbird:"#79ddff",basilisk:"#6effa0",thestral:"#b7a8ff",coral:"#58e0c6",chimaera:"#ffd06e",augurey:"#9db7ff",wraithglass:"#e79bff",moonstoneheart:"#d9f3ff"}[e?.coreId]||"#9fe7ff"}bindTitle(){const e=Tt("btn-start"),t=Tt("btn-continue"),n=Tt("name-input"),i=Se.hasSave();if(t.classList.toggle("hidden",!i),i)try{const a=JSON.parse(localStorage.getItem("wandlore.save.v1"));a?.name&&(n.value=a.name)}catch{}e.addEventListener("click",()=>{this.audio.init(),this.audio.setEnabled(!0),Se.newGame(n.value),this.begin(!1)}),t.addEventListener("click",()=>{this.audio.init(),Se.load()?(this.audio.setEnabled(Se.s.settings.sound!==!1),this.begin(!0)):(Se.newGame(n.value),this.begin(!1))}),Tt("btn-sound").addEventListener("click",()=>{const a=!this.audio.enabled;this.audio.init(),this.audio.setEnabled(a),Se.s&&(Se.s.settings.sound=a,Se.save()),Tt("btn-sound").textContent="♪",Tt("btn-sound").style.opacity=a?"1":".4",this.ui.toast(a?"Sound on":"Sound off",a?"The vale finds its voice.":"Silence, for now.","#e9c988","♪")})}begin(e){Se.s||Se.newGame(),this.started=!0,this.loaded=!0;const t=Se.s;Tt("loading").classList.add("done"),setTimeout(()=>Tt("loading").classList.add("hidden"),900),Tt("title-screen").classList.add("hidden"),Tt("hud").classList.remove("hidden"),Tt("fade").classList.add("on"),setTimeout(()=>Tt("fade").classList.remove("on"),60),this.player&&this.scene.remove(this.player.group),this.player=Za({robe:"#2f3560",accent:"#d9b268",hair:"#2b1e1a",hat:!0,scale:1.02,name:t.name,subtitle:Se.displayTitle(),nameColor:"#f0d79e"}),this.player.setWand(Se.wand),this.player.group.position.copy(this.world.spawn),this.scene.add(this.player.group),this.playerPos.copy(this.world.spawn),this.wisp.group.visible=!0,this.wisp.setColor(this.coreColor(Se.wand)),this.wisp.update(.016,this.playerPos),this.yaw=Math.PI*.9,this.pitch=.18,this.lastZone=null,this.ui.setLocation("Emberfall Village","village"),this.ui.refresh(),this.ui.updateSpellbar(),this.audio.setEnabled(t.settings?.sound!==!1),this.onOverlay(!1),e?this.ui.toast("Welcome back","The vale kept your ledger exactly where you left it.","#e9c988","✦"):this.ui.showModal(`<div class="modal-kicker">A SHOP AT THE EDGE OF THE VALE</div>
        <div class="modal-title">Welcome to Emberfall</div>
        <div class="modal-sub">The bench is yours, ${this.escape(t.name.split(" ")[0])}. Shape a wand, sell it honestly, learn a spell that frightens you a little, and sign your name in the duelling ring.</div>
        <div class="modal-sep"></div>
        <div class="reward-row">
          <div class="reward"><span>⚒</span>WASD to walk</div>
          <div class="reward rep"><span>✦</span>Drag to look</div>
          <div class="reward xp"><span>◉</span>E to interact</div>
        </div>
        <div class="modal-actions"><button class="btn-gold" data-close>Open the shop</button></div>`),Se.save()}setupInput(){window.addEventListener("keydown",i=>{if(i.target.tagName==="INPUT"||i.target.tagName==="TEXTAREA")return;const a=i.key.toLowerCase();if(a==="escape"){i.preventDefault(),this.ui.dialogueOpen?this.ui.closeDialogue():this.ui.modalOpen&&!this.ui.modalLocked?this.ui.closeModal():this.ui.panel&&this.ui.closePanel();return}if(this.started){if(this.duel.active){a===" "&&(i.preventDefault(),this.duel.dodge()),/^[1-6]$/.test(a)&&(i.preventDefault(),this.selectAndCast(Number(a)-1)),this.keys.add(a);return}if(!(this.ui.panel||this.ui.modalOpen||this.ui.dialogueOpen)){if(a==="e"){i.preventDefault(),this.interact();return}a==="c"?this.ui.openPanel("craft"):a==="b"?this.ui.openPanel("spells"):a==="k"?this.ui.openPanel("shop"):a==="j"?this.ui.openPanel("journal"):a==="m"?this.ui.openPanel("map"):a==="f"?this.ui.openPanel("duel"):a==="q"?this.ui.openPanel("character"):/^[1-6]$/.test(a)&&this.selectAndCast(Number(a)-1),this.keys.add(a)}}}),window.addEventListener("keyup",i=>this.keys.delete(i.key.toLowerCase())),window.addEventListener("blur",()=>this.keys.clear());const e=Tt("scene");e.addEventListener("pointerdown",i=>{!this.started||this.ui.panel||this.ui.modalOpen||this.ui.dialogueOpen||(this.mouse.down=!0,this.mouse.moved=0,this.mouse.lastX=i.clientX,this.mouse.lastY=i.clientY,e.setPointerCapture?.(i.pointerId),i.button===2&&this.duel.active&&i.preventDefault())}),window.addEventListener("pointermove",i=>{if(!this.mouse.down)return;const a=i.clientX-this.mouse.lastX,r=i.clientY-this.mouse.lastY;this.mouse.lastX=i.clientX,this.mouse.lastY=i.clientY,this.mouse.moved+=Math.abs(a)+Math.abs(r),!this.duel.active&&(this.yaw-=a*.0042,this.pitch=Wr(this.pitch+r*.0024,-.12,.85))}),window.addEventListener("pointerup",i=>{const a=this.mouse.down;this.mouse.down=!1,i.button!==2&&a&&this.mouse.moved<6&&this.started&&!this.ui.panel&&!this.ui.modalOpen&&!this.ui.dialogueOpen&&this.castActive()}),e.addEventListener("contextmenu",i=>{i.preventDefault(),this.duel.active&&(this.duel.shieldHeld=!0)}),e.addEventListener("wheel",i=>{this.started&&(this.camDist=Wr(this.camDist+i.deltaY*.006,5.2,12))},{passive:!0}),e.addEventListener("pointerdown",i=>{i.button===2&&(this.rightHeld=!0)}),window.addEventListener("pointerup",i=>{i.button===2&&(this.rightHeld=!1)}),e.addEventListener("pointerleave",()=>{this.rightHeld=!1});let t=null,n=null;e.addEventListener("touchstart",i=>{i.touches[0]&&(t=i.touches[0].clientX,n=i.touches[0].clientY)},{passive:!0}),e.addEventListener("touchmove",i=>{if(!i.touches[0]||t===null)return;const a=i.touches[0].clientX-t,r=i.touches[0].clientY-n;t=i.touches[0].clientX,n=i.touches[0].clientY,this.yaw-=a*.005,this.pitch=Wr(this.pitch+r*.003,-.12,.85)},{passive:!0})}onOverlay(e){e&&(this.keys.clear(),this.mouse.down=!1),!e&&this.started&&this.ui.setInteract(null),this.refreshPending=!0}selectAndCast(e){const t=Se.s;if(!t)return;const n=t.loadout[e];if(!n){this.ui.toast("Empty slot","Ready another spell from the grimoire.","#ff8c9a","✦"),this.audio.error();return}this.activeSpellIndex=e,this.ui.activeIndex=e,this.ui.updateSpellbar(),this.duel.active?this.duel.cast(e):this.worldCast(en.find(i=>i.id===n))}castActive(){this.selectAndCast(this.activeSpellIndex||0)}worldCast(e){if(!e||!this.started)return;const t=Se.s,n=performance.now();if((this.worldCds[e.id]||0)>n)return;const i=e.mana;if(t.mp=t.mp??Se.maxMp(),t.mp<i){this.ui.toast("Not enough mana","Let the wand breathe.","#78b4ff","✦"),this.audio.error();return}t.mp-=i,this.worldCds[e.id]=n+e.cd*1e3,this.player.cast();const a=this.player.getTipWorld(),r=new L(-Math.sin(this.yaw),0,-Math.cos(this.yaw)),o=new L(this.playerPos.x+r.x*9,this.playerPos.y+1.2,this.playerPos.z+r.z*9);if(this.effects.castSpark(a,e.color),this.audio.cast(e.cat),e.effect==="heal"||e.effect==="hot"||e.cat==="healing")this.effects.heal(new L(this.playerPos.x,this.playerPos.y+.08,this.playerPos.z),e.color),t.hp=Math.min(Se.maxHp(),(t.hp??Se.maxHp())+(e.heal||18)),this.audio.heal();else if(e.effect==="buff")this.effects.runeCircle(new L(this.playerPos.x,this.playerPos.y+.05,this.playerPos.z),e.color,2.4,.9),this.audio.shield();else if(e.effect==="aoe_self"||e.effect==="burst")this.effects.ring(new L(this.playerPos.x,this.playerPos.y+.05,this.playerPos.z),e.color,e.radius||5,.75),this.effects.burst(new L(this.playerPos.x,this.playerPos.y+1.2,this.playerPos.z),e.color,28,{speed:7,size:.5,flash:3});else if(e.effect==="summon")this.effects.summon(new L(this.playerPos.x+r.x*1.5,this.playerPos.y,this.playerPos.z+r.z*1.5),e.color);else if(e.effect==="beam"||e.effect==="chain")this.effects.beam(a,o,e.color,.18,.45),this.effects.burst(o,e.color,12,{speed:3,size:.35});else{const l=this.effects.createOrb(e.color,.18);l.group.position.copy(a),this.worldBolts.push({orb:l,vel:r.clone().multiplyScalar(22),life:.6,color:e.color})}this.ui.setCds(this.worldCdsForUi()),this.refreshPending=!0}worldCdsForUi(){const e=performance.now(),t=Se.s,n={};for(const i of t.loadout){const a=en.find(o=>o.id===i);if(!a)continue;const r=Math.max(0,(this.worldCds[i]||0)-e)/1e3;n[i]=r/a.cd}return n}updateWorldBolts(e){for(let t=this.worldBolts.length-1;t>=0;t--){const n=this.worldBolts[t];n.life-=e,n.orb.group.position.addScaledVector(n.vel,e),n.life<=0&&(this.effects.burst(n.orb.group.position.clone(),n.color,14,{speed:3,size:.4}),this.effects.removeOrb(n.orb),this.worldBolts.splice(t,1))}}duelCallbacks(){return{onStart:()=>{this.ui.setCombat(!0),this.ui.combatLog("Wands up. The circle is sealed.","spell")},onIntroEnd:()=>{this.ui.toast("Duel","Move, shield, dodge — then make your answer.","#ff8c9a","⚔")},onHud:e=>this.ui.updateCombat(e),onLog:(e,t)=>this.ui.combatLog(e,t),onToast:(e,t,n,i)=>this.ui.toast(e,t,n,i),onDamage:(e,t,n)=>{this.pendingFloats.push({pos:e.clone(),text:n==="heal"?`+${t}`:String(t),cls:n==="heal"?"heal":n==="enemy"?"enemy":n})},onHudFlash:()=>{const e=Tt("hud");e.classList.remove("hit-flash"),e.offsetWidth,e.classList.add("hit-flash"),clearTimeout(this._hitT),this._hitT=setTimeout(()=>e.classList.remove("hit-flash"),260)},onEnd:e=>this.finishDuel(e)}}startDuel(e,t={}){if(!this.started)return;const n=Uo.find(i=>i.id===e);if(n){if(Se.s.rep<n.reqRep){this.ui.toast("Not yet",`${n.name} requires ${n.reqRep} reputation.`,"#ff8c9a","⚔"),this.audio.error();return}this.duel.active&&this.duel.dispose(),this.ui.closePanel(),this.ui.closeModal(),this.ui.setInteract(null),Tt("fade").classList.add("on"),setTimeout(()=>{this.worldBolts=[],this.duel.start(n),this.activeSpellIndex=0,this.ui.activeIndex=0,this.ui.setCds({}),this.ui.updateSpellbar(),this.camPos.set(0,6,22),this.lookAt.set(0,1.4,0),Tt("fade").classList.remove("on")},430)}}exitDuelToWorld(){this.duel.dispose(),this.effects.setScene(this.scene),this.ui.setCombat(!1),this.ui.setCds(this.worldCdsForUi()),this.camPos.copy(this.camera.position),this.refreshPending=!0,this.player&&(this.player.group.visible=!0)}finishDuel(e){const t=e.enemy,n=e.won;if(Se.recordDuel({enemy:t,won:n,prize:{}}),this.exitDuelToWorld(),this.audio.setEnabled(Se.s.settings?.sound!==!1),n)if(this.tournament){const i=Fo.find(a=>a.id===this.tournament.id);if(this.tournament.index++,this.tournament.index>=i.rounds.length)Se.recordTournament(i.id,!0),Se.addGold(i.rewards.gold,!0),Se.addXp(i.rewards.xp,!0),Se.addRep(i.rewards.rep),Se.s.badges.includes(i.badge)||Se.s.badges.push(i.badge),Se.save(),this.tournament,this.tournament=null,this.audio.victory(),this.ui.showModal(`<div class="modal-kicker">THE BRACKET IS YOURS</div>
            <div class="modal-title">${this.escape(i.name)} Champion</div>
            <div class="modal-sub">The chalk board will remember this longer than the applause. Somewhere, Cassia is already demanding a rematch.</div>
            <div class="reward-row">
              <div class="reward"><span>◉</span>${i.rewards.gold} galleons</div>
              <div class="reward xp"><span>✦</span>${i.rewards.xp} XP</div>
              <div class="reward rep"><span>✧</span>+${i.rewards.rep} reputation</div>
            </div>
            <div class="modal-actions"><button class="btn-gold" data-close>Accept the laurel</button></div>`);else{const a=i.rounds[this.tournament.index],r=Uo.find(o=>o.id===a);this.ui.showModal(`<div class="modal-kicker">ROUND WON</div>
            <div class="modal-title">${this.escape(t.name)} yields</div>
            <div class="modal-sub">The circle resets. ${r?r.name+" steps out of the crowd.":""}</div>
            <div class="reward-row">
              <div class="reward"><span>◉</span>${t.rewards.gold} galleons</div>
              <div class="reward xp"><span>✦</span>${t.rewards.xp} XP</div>
              <div class="reward rep"><span>✧</span>+${t.rewards.rep} reputation</div>
            </div>
            <div class="modal-actions"><button class="btn-gold" id="duel-next-round">Next round</button><button class="btn-line" data-close>Withdraw</button></div>`),Tt("duel-next-round")?.addEventListener("click",()=>{this.ui.closeModal(),this.startDuel(a,{tournament:!0})})}}else this.ui.showModal(`<div class="modal-kicker">THE CIRCLE IS YOURS</div>
          <div class="modal-title">${this.escape(t.name)} yields</div>
          <div class="modal-sub">${t.boss?"The wards fall quiet. Somewhere in the vale, a bell rings once and remembers.":"A clean finish. The audience pretends it expected that."}</div>
          <div class="reward-row">
            <div class="reward"><span>◉</span>${t.rewards.gold} galleons</div>
            <div class="reward xp"><span>✦</span>${t.rewards.xp} XP</div>
            <div class="reward rep"><span>✧</span>+${t.rewards.rep} reputation</div>
          </div>
          ${t.drops?.length?`<div class="wand-trait"><b>Recovered from the ring</b>${t.drops.map(i=>this.itemName(i)).filter(Boolean).join(" · ")}</div>`:""}
          <div class="modal-actions"><button class="btn-gold" data-close>Return to the vale</button></div>`),this.audio.victory();else this.tournament=null,this.audio.defeat(),this.ui.showModal(`<div class="modal-kicker">THE WAND FALLS</div>
        <div class="modal-title">${this.escape(t.name)} wins this one</div>
        <div class="modal-sub">You wake on the bench with a headache and your wand still warm. It has opinions about what happened.</div>
        <div class="modal-actions"><button class="btn-gold" id="duel-retry">Ask for a rematch</button><button class="btn-line" data-close>Lick your wounds</button></div>`),Tt("duel-retry")?.addEventListener("click",()=>{this.ui.closeModal(),this.startDuel(t.id)});this.refreshPending=!0}startTournament(e){const t=Fo.find(n=>n.id===e);if(t){if(Se.s.rep<t.reqRep){this.ui.toast("The bracket is sealed",`Requires ${t.reqRep} reputation.`,"#ff8c9a","♛"),this.audio.error();return}this.tournament={id:e,index:0},this.ui.closePanel(),this.startDuel(t.rounds[0],{tournament:!0})}}itemName(e){const t=Oi.find(n=>n.id===e);return t?t.name:Fn.find(n=>n.id===e)?.name||On.find(n=>n.id===e)?.name||e}interact(){if(!this.started||this.duel.active)return;const e=this.world.nearestNode(this.playerPos,3.4),t=this.world.nearestInteract(this.playerPos,3.8);if(e&&(!t||Math.hypot(e.x-this.playerPos.x,e.z-this.playerPos.z)<=Math.hypot(t.x-this.playerPos.x,t.z-this.playerPos.z))){this.gather(e);return}if(!t)return;this.audio.ui();const n=t.data||{};switch(t.type){case"craft":this.ui.openPanel("craft");break;case"shop":this.ui.openPanel("shop");break;case"lessons":this.ui.openPanel("spells");break;case"duel":n.enemy?this.startDuel(n.enemy):this.ui.openPanel("duel");break;case"quests":this.ui.openPanel("journal");break;case"npc":this.ui.talk(n.npc);break;case"gate":this.travelTo(n.zone);break;case"lake":this.lakeVision();break;case"cache":this.crystalCache();break;case"lore":this.dragonLore();break;default:this.ui.toast(t.label||"Nothing happens","The vale keeps its secrets.","#e9c988","◈")}}gather(e){const t=this.world.gather(e);if(!t)return;Se.gainIngredient(t.kind,t.id),this.audio.gather();const n=new L(e.x,e.y+.9,e.z);this.effects.burst(n,t.info.color||"#e9c988",18,{speed:3,size:.4,ttl:.9}),this.effects.ring(new L(e.x,e.y+.06,e.z),t.info.color||"#e9c988",1.6,.7);const i=t.info.rarity||"common";this.ui.toast(t.info.name,`${t.kind==="woods"?"Wood":t.kind==="cores"?"Core":"Reagent"} gathered · ${i}`,t.info.color||"#e9c988","✧"),this.pendingFloats.push({pos:new L(e.x,e.y+1.8,e.z),text:`+1 ${t.info.name}`,cls:"heal"}),this.refreshPending=!0}travelTo(e){const t=li.find(n=>n.id===e);if(t){if(Se.s.rep<t.req){this.ui.toast("The way is sealed",`${t.name} requires ${t.req} reputation.`,"#ff8c9a","◈"),this.audio.error();return}Se.s.discoveredZones.includes(e)||Se.unlockZone(e),this.ui.closePanel(),this.ui.closeModal(),Tt("fade").classList.add("on"),setTimeout(()=>{const n=ov[e]||{x:t.x,z:t.z};this.playerPos.set(n.x,0,n.z),this.world.collide(this.playerPos,.5),this.player.group.position.copy(this.playerPos),this.ui.setLocation(t.name,e),this.lastZone=e,this.ui.toast(t.name,t.sub,t.color,t.rune),Tt("fade").classList.remove("on"),this.refreshPending=!0},460)}}lakeVision(){const e=Se.s;if(e.flags.lakeSeen){this.ui.showModal(`<div class="modal-kicker">MIRRORMERE</div>
        <div class="modal-title">The water remembers</div>
        <div class="modal-sub">Your reflection is still holding the wand a half-second behind you. It looks patient.</div>
        <div class="modal-actions"><button class="btn-gold" data-close>Step back</button></div>`);return}e.flags.lakeSeen=!0,e.mp=Se.maxMp(),e.hp=Se.maxHp(),Se.addXp(40),Se.save(),this.effects.ring(new L(43,.15,71),"#7de6d0",7,1.1),this.audio.heal(),this.ui.showModal(`<div class="modal-kicker">A PAGE FROM THE MIRRORMERE</div>
      <div class="modal-title">Still Water, Loud Memory</div>
      <div class="modal-sub">${this.escape(Oo[0])} The lake gives back your breath, your mana, and a memory that is not quite yours.</div>
      <div class="reward-row"><div class="reward xp"><span>✦</span>+40 XP</div><div class="reward rep"><span>≋</span>Health and mana restored</div></div>
      <div class="modal-actions"><button class="btn-gold" data-close>Keep walking</button></div>`)}crystalCache(){const e=Se.s;if(e.flags.crystalCache){this.ui.showModal(`<div class="modal-kicker">GLIMMER CAVERNS</div>
        <div class="modal-title">The bloom has closed</div>
        <div class="modal-sub">It will open again when it has decided you are worth another crystal. Give it a day.</div>
        <div class="modal-actions"><button class="btn-gold" data-close>Leave it be</button></div>`);return}e.flags.crystalCache=!0,Se.addItem("materials","starlight",1),Se.addRep(3),Se.addXp(60),this.audio.gather(),this.effects.burst(new L(94,2,58),"#b58cff",40,{speed:5,size:.6,flash:4}),this.ui.showModal(`<div class="modal-kicker">A FIND IN THE DARK</div>
      <div class="modal-title">Starlight Bloom</div>
      <div class="modal-sub">The petals are cold enough to ache. Worth it.</div>
      <div class="reward-row"><div class="reward"><span>✦</span>Starlight ×1</div><div class="reward rep"><span>✧</span>+3 reputation</div><div class="reward xp"><span>✦</span>+60 XP</div></div>
      <div class="modal-actions"><button class="btn-gold" data-close>Pocket it</button></div>`)}dragonLore(){const e=Se.s;if(e.flags.dragonLore){this.ui.showModal(`<div class="modal-kicker">DRAGON'S CRAG</div>
        <div class="modal-title">The bones are patient</div>
        <div class="modal-sub">Wind moves through the ribs like a hand through a harp. Nothing new answers.</div>
        <div class="modal-actions"><button class="btn-gold" data-close>Climb down</button></div>`);return}e.flags.dragonLore=!0,Se.addXp(90),Se.addRep(2),this.ui.showModal(`<div class="modal-kicker">THE CRAG REMEMBERS</div>
      <div class="modal-title">A Dragon's Last Argument</div>
      <div class="modal-sub">The remains are older than the school. A wandmaker's mark is burned into the largest rib — not a signature, a warning: <i>a core is not a cage</i>.</div>
      <div class="reward-row"><div class="reward xp"><span>✦</span>+90 XP</div><div class="reward rep"><span>✧</span>+2 reputation</div></div>
      <div class="modal-actions"><button class="btn-gold" data-close>Remember it</button></div>`)}setupFrame(){let e=performance.now();const t=n=>{const i=Math.min(.05,(n-e)/1e3);e=n,this.clock+=i,this.started?this.duel.active?this.updateDuelFrame(i):this.updateWorldFrame(i):this.updateTitleFrame(i),this.flushFloats(),requestAnimationFrame(t)};requestAnimationFrame(t),setTimeout(()=>{Tt("loading").classList.add("done"),setTimeout(()=>{Tt("loading").classList.add("hidden"),Tt("title-screen").classList.remove("hidden")},650)},900)}updateTitleFrame(e){this.titleCamT+=e;const t=this.titleCamT;this.world.update(e,t,this.world.spawn);const n=39+Math.sin(t*.08)*4;this.camera.position.set(Math.sin(t*.05+2.2)*n,13+Math.sin(t*.13)*1.6,44+Math.cos(t*.05+2.2)*n),this.camera.lookAt(0,2.3,38),this.renderer.render(this.scene,this.camera)}updateWorldFrame(e){const t=Se.s,n=!!(this.ui.panel||this.ui.modalOpen||this.ui.dialogueOpen),i=this.clock,a=n?e*.1:e;t.hp<Se.maxHp()&&(t.hp=Math.min(Se.maxHp(),(t.hp??Se.maxHp())+a*1.8)),t.mp<Se.maxMp()&&(t.mp=Math.min(Se.maxMp(),(t.mp??Se.maxMp())+a*4.2)),t.playTime=(t.playTime||0)+e;let r=0,o=0;n||((this.keys.has("w")||this.keys.has("arrowup"))&&(o+=1),(this.keys.has("s")||this.keys.has("arrowdown"))&&(o-=1),(this.keys.has("a")||this.keys.has("arrowleft"))&&(r-=1),(this.keys.has("d")||this.keys.has("arrowright"))&&(r+=1));const l=this.keys.has("shift"),c=r||o;let d=l?10:6.4;if(c){const p=Math.hypot(r,o);r/=p,o/=p;const x=-Math.sin(this.yaw),M=-Math.cos(this.yaw),_=Math.cos(this.yaw),E=-Math.sin(this.yaw),T=x*o+_*r,y=M*o+E*r;this.playerPos.x+=T*d*e,this.playerPos.z+=y*d*e,this.world.collide(this.playerPos,.45);const b=Math.atan2(T,y);this.player.group.rotation.y=this.lerpAngle(this.player.group.rotation.y,b,1-Math.exp(-12*e))}if(this.player.group.position.copy(this.playerPos),this.player.update(e,!!c,l?1.6:1),this.wisp.group.visible=!0,this.wisp.update(e,new L(this.playerPos.x,this.playerPos.y+.2,this.playerPos.z)),this.world.update(e,i,this.playerPos),this.effects.update(e),this.updateWorldBolts(e),n)this.ui.setInteract(null);else{const p=this.world.nearestNode(this.playerPos,3.4),x=this.world.nearestInteract(this.playerPos,3.8);let M=null;p&&(!x||Math.hypot(p.x-this.playerPos.x,p.z-this.playerPos.z)<=Math.hypot(x.x-this.playerPos.x,x.z-this.playerPos.z))?M=`Gather ${p.info.name}`:x&&(M=x.label),this.ui.setInteract(M,"E")}const u=this.world.getZone(this.playerPos.x,this.playerPos.z);u&&u.id!==this.lastZone&&(this.lastZone=u.id,this.ui.setLocation(u.name,u.id),u.id!=="wilds"&&(t.discoveredZones.includes(u.id)?this.ui.setLocation(u.name,u.id):(Se.unlockZone(u.id),this.ui.toast("New location",u.name,u.color,u.rune),this.ui.objective(`Discovered ${u.name}`))));const h=Math.cos(this.pitch),f=Math.sin(this.pitch),g=new L(this.playerPos.x+Math.sin(this.yaw)*this.camDist*h,this.playerPos.y+2.3+this.camDist*(.22+f*.72),this.playerPos.z+Math.cos(this.yaw)*this.camDist*h),v=this.world.heightAt(g.x,g.z)+1.1;g.y<v&&(g.y=v),this.camPos.x=ti(this.camPos.x,g.x,9,e),this.camPos.y=ti(this.camPos.y,g.y,9,e),this.camPos.z=ti(this.camPos.z,g.z,9,e),this.camera.position.copy(this.camPos);const m=this.effects.shakeAmt*.22;m>.001&&this.camera.position.add(new L((Math.random()-.5)*m,(Math.random()-.5)*m,(Math.random()-.5)*m)),this.lookAt.set(this.playerPos.x,this.playerPos.y+1.7,this.playerPos.z),this.camera.lookAt(this.lookAt),this.ui.compass(this.yaw),this.minimapClock+=e,this.minimapClock>.08&&(this.minimapClock=0,this.ui.drawMinimap(this.world,this.playerPos,this.yaw)),this.ui.setCds(this.worldCdsForUi()),this.ui.updateMeters(),this.refreshClock+=e,this.refreshPending&&this.refreshClock>.28&&(this.refreshClock=0,this.refreshPending=!1,this.refreshClock=0,this.ui.refresh()),this.renderer.render(this.scene,this.camera)}updateDuelFrame(e){const t=this.duel,n={moveX:(this.keys.has("d")?1:0)-(this.keys.has("a")?1:0),moveZ:(this.keys.has("w")?1:0)-(this.keys.has("s")?1:0),shield:!!this.rightHeld&&this.mouse.down};n.shield=!!this.rightHeld,t.active&&(t.mp=Math.min(t.maxMp,t.mp+e*2.4),t.update(e,n));const i=t.playerPos,a=t.enemyPos;if(i&&a){const l=new L(a.x-i.x,0,a.z-i.z);l.lengthSq()<.001&&l.set(0,0,-1),l.normalize();const c=new L(i.x-l.x*8.5,5.4,i.z-l.z*8.5),d=new L(i.x+l.x*3.2,1.25,i.z+l.z*3.2);this.camPos.x=ti(this.camPos.x,c.x,5,e),this.camPos.y=ti(this.camPos.y,c.y,5,e),this.camPos.z=ti(this.camPos.z,c.z,5,e),this.lookAt.x=ti(this.lookAt.x,d.x,6,e),this.lookAt.y=ti(this.lookAt.y,d.y,6,e),this.lookAt.z=ti(this.lookAt.z,d.z,6,e),this.camera.position.copy(this.camPos);const u=this.effects.shakeAmt*.3;u>.001&&this.camera.position.add(new L((Math.random()-.5)*u,(Math.random()-.5)*u,(Math.random()-.5)*u)),this.camera.lookAt(this.lookAt)}const r=Se.s,o={};for(const l of r.loadout){const c=en.find(d=>d.id===l);c&&(o[l]=(t.cds[l]||0)/Math.max(.001,c.cd))}this.ui.setCds(o),this.ui.updateSpellbar(),this.ui.updateCombat({hp:t.hp,mp:t.mp,enemyHp:t.enemyHp}),this.renderer.render(t.scene,this.camera)}flushFloats(){if(!this.pendingFloats.length)return;const e=window.innerWidth,t=window.innerHeight;for(const n of this.pendingFloats){const i=n.pos.clone().project(this.camera);if(i.z>1||i.z<-1)continue;const a=(i.x*.5+.5)*e,r=(-i.y*.5+.5)*t;this.ui.floatText(a,r,n.text,n.cls||"")}this.pendingFloats=[]}lerpAngle(e,t,n){let i=(t-e+Math.PI)%(Math.PI*2)-Math.PI;return i<-Math.PI&&(i+=Math.PI*2),e+i*n}autosave(){!this.started||!Se.s||this.tournament||Se.save()}escape(e=""){return String(e).replace(/[&<>"]/g,t=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"})[t])}}const cv=new lv;window.wandlore=cv;
