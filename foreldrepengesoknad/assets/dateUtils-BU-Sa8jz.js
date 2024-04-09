import{d as l,h as j,Q as A,W as H,z as W,E as G,P as I}from"./Tidsperioden-uYz_lIz2.js";import{c as U,g as F}from"./index-Cu9bd8lq.js";import"./jsx-runtime-DoxjgJx5.js";import"./index-C-6Uy6j4.js";import{T,Y as y,Z as B,_ as Q,$ as R}from"./index-KchjYVEa.js";import"./_baseToString-yTMKM5a7.js";import"./_createSet-BNfKGSGn.js";var L={exports:{}};(function(t,o){(function(u,n){t.exports=n()})(U,function(){var u={year:0,month:1,day:2,hour:3,minute:4,second:5},n={};return function(x,m,i){var e,z=function(r,h,d){d===void 0&&(d={});var a=new Date(r),g=function($,v){v===void 0&&(v={});var D=v.timeZoneName||"short",w=$+"|"+D,p=n[w];return p||(p=new Intl.DateTimeFormat("en-US",{hour12:!1,timeZone:$,year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",second:"2-digit",timeZoneName:D}),n[w]=p),p}(h,d);return g.formatToParts(a)},s=function(r,h){for(var d=z(r,h),a=[],g=0;g<d.length;g+=1){var $=d[g],v=$.type,D=$.value,w=u[v];w>=0&&(a[w]=parseInt(D,10))}var p=a[3],k=p===24?0:p,S=a[0]+"-"+a[1]+"-"+a[2]+" "+k+":"+a[4]+":"+a[5]+":000",E=+r;return(i.utc(S).valueOf()-(E-=E%1e3))/6e4},c=m.prototype;c.tz=function(r,h){r===void 0&&(r=e);var d=this.utcOffset(),a=this.toDate(),g=a.toLocaleString("en-US",{timeZone:r}),$=Math.round((a-new Date(g))/1e3/60),v=i(g,{locale:this.$L}).$set("millisecond",this.$ms).utcOffset(15*-Math.round(a.getTimezoneOffset()/15)-$,!0);if(h){var D=v.utcOffset();v=v.add(d-D,"minute")}return v.$x.$timezone=r,v},c.offsetName=function(r){var h=this.$x.$timezone||i.tz.guess(),d=z(this.valueOf(),h,{timeZoneName:r}).find(function(a){return a.type.toLowerCase()==="timezonename"});return d&&d.value};var f=c.startOf;c.startOf=function(r,h){if(!this.$x||!this.$x.$timezone)return f.call(this,r,h);var d=i(this.format("YYYY-MM-DD HH:mm:ss:SSS"),{locale:this.$L});return f.call(d,r,h).tz(this.$x.$timezone,!0)},i.tz=function(r,h,d){var a=d&&h,g=d||h||e,$=s(+i(),g);if(typeof r!="string")return i(r).tz(g);var v=function(k,S,E){var M=k-60*S*1e3,O=s(M,E);if(S===O)return[M,S];var Y=s(M-=60*(O-S)*1e3,E);return O===Y?[M,O]:[k-60*Math.min(O,Y)*1e3,Math.max(O,Y)]}(i.utc(r,a).valueOf(),$,g),D=v[0],w=v[1],p=i(D).utcOffset(w);return p.$x.$timezone=g,p},i.tz.guess=function(){return Intl.DateTimeFormat().resolvedOptions().timeZone},i.tz.setDefault=function(r){e=r}}})})(L);var C=L.exports;const N=F(C);var Z={exports:{}};(function(t,o){(function(u,n){t.exports=n()})(U,function(){return function(u,n){var x=n.prototype,m=x.format;x.format=function(i){var e=this,z=this.$locale();if(!this.isValid())return m.bind(this)(i);var s=this.$utils(),c=(i||"YYYY-MM-DDTHH:mm:ssZ").replace(/\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,function(f){switch(f){case"Q":return Math.ceil((e.$M+1)/3);case"Do":return z.ordinal(e.$D);case"gggg":return e.weekYear();case"GGGG":return e.isoWeekYear();case"wo":return z.ordinal(e.week(),"W");case"w":case"ww":return s.s(e.week(),f==="w"?1:2,"0");case"W":case"WW":return s.s(e.isoWeek(),f==="W"?1:2,"0");case"k":case"kk":return s.s(String(e.$H===0?24:e.$H),f==="k"?1:2,"0");case"X":return Math.floor(e.$d.getTime()/1e3);case"x":return e.$d.getTime();case"z":return"["+e.offsetName()+"]";case"zzz":return"["+e.offsetName("long")+"]";default:return f}});return m.bind(this)(c)}}})})(Z);var V=Z.exports;const X=F(V);l.extend(j);l.extend(A);l.extend(H);l.extend(N);l.extend(X);const oe=l().subtract(4,"year").startOf("day").toDate(),b=(t,o)=>!W(t)||!W(o)||!G(t)||!G(o)?!1:!!l(t).isBefore(o,"day"),ie=t=>[...t].sort((o,u)=>b(o.fødselsdato,u.fødselsdato)?1:-1)[t.length-1],se=t=>[...t].map(u=>I(u)).sort((u,n)=>b(u,n)?-1:1),ae=(t,o,u)=>{if(u!==void 0)return u;if(o!==void 0)return o;if(t!==void 0)return t;throw new Error("Mangler fødselsdato/termindato/adopsjonsdato for barnet.")},ne=t=>{const o=new Date("2021-10-01");return l(t).isSameOrAfter(o,"day")&&l(new Date).isSameOrAfter(o,"day")},fe=(t,o,u)=>{if(!u)return;const n=t===void 0?void 0:t.filter(e=>!T(e)),x=o.filter(e=>!T(e));let m,i;if(n)x.forEach((e,z)=>{if(m)return;const{fom:s}=e.tidsperiode,c=n.find(f=>l(f.tidsperiode.fom).isSame(s,"day"));if(c!==void 0){const f=y(e).erLik(c,!1,!0);(!f||f&&y(e).slutterEtter(c.tidsperiode.tom))&&(m=s)}if(c===void 0&&(m=s),c!==void 0&&x.length-1===z&&(y(e).erLik(c,!0,!0)||(m=s)),m&&B(e)&&l(m).isAfter(n[n.length-1].tidsperiode.tom)){const f=x.find(r=>(Q(r)||R(r))&&l(r.tidsperiode.fom).isAfter(m));m=f!==void 0?f.tidsperiode.fom:m}}),n.forEach(e=>{if(i)return;const{fom:z}=e.tidsperiode,s=x.find(c=>l(c.tidsperiode.fom).isSame(z,"day"));s!==void 0&&!y(e).erLik(s,!1,!0)&&(i=s.tidsperiode.fom),s===void 0&&(i=z)});else if(x.length>0)return x[0].tidsperiode.fom;return _(m,i)},_=(t,o)=>{if(!(t===void 0&&o===void 0))return t!==void 0&&o===void 0?t:t===void 0&&o!==void 0?o:l(t).isSameOrBefore(l(o))?t:o};export{ie as a,fe as b,oe as d,ne as f,ae as g,b as i,se as s,N as t};
