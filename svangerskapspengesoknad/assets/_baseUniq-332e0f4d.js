import{_ as v,a as d,b as o,c as b}from"./_baseIteratee-c0f324be.js";function x(n,e,r,s){for(var t=n.length,i=r+(s?1:-1);s?i--:++i<t;)if(e(n[i],i,n))return i;return-1}var g=x;function $(n){return n!==n}var w=$;function N(n,e,r){for(var s=r-1,t=n.length;++s<t;)if(n[s]===e)return s;return-1}var S=N,A=g,O=w,F=S;function T(n,e,r){return e===e?F(n,e,r):A(n,O,r)}var C=T,W=C;function p(n,e){var r=n==null?0:n.length;return!!r&&W(n,e,0)>-1}var q=p;function E(n,e,r){for(var s=-1,t=n==null?0:n.length;++s<t;)if(r(e,n[s]))return!0;return!1}var H=E;function R(){}var U=R,c=v,Y=U,G=d,L=1/0,Z=c&&1/G(new c([,-0]))[1]==L?function(n){return new c(n)}:Y,j=Z,k=o,z=q,B=H,D=b,J=j,K=d,M=200;function P(n,e,r){var s=-1,t=z,i=n.length,u=!0,l=[],a=l;if(r)u=!1,t=B;else if(i>=M){var I=e?null:J(n);if(I)return K(I);u=!1,t=D,a=new k}else a=e?[]:l;n:for(;++s<i;){var f=n[s],h=e?e(f):f;if(f=r||f!==0?f:0,u&&h===h){for(var _=a.length;_--;)if(a[_]===h)continue n;e&&a.push(h),l.push(f)}else t(a,h,r)||(a!==l&&a.push(h),l.push(f))}return l}var V=P;export{V as _};
