import{r as T,R as Y}from"./index-CTjT7uj6.js";var g={BASE_URL:"./",DEV:!1,MODE:"production",PROD:!0,SSR:!1,STORYBOOK:"true"};let G=0;function ft(t,c){const s=`atom${++G}`,f={toString(){return(g?"production":void 0)!=="production"&&this.debugLabel?s+":"+this.debugLabel:s}};return typeof t=="function"?f.read=t:(f.init=t,f.read=q,f.write=x),f}function q(t){return t(this)}function x(t,c,s){return c(this,typeof s=="function"?s(t(this)):s)}const z=(t,c)=>t.unstable_is?t.unstable_is(c):c===t,F=t=>"init"in t,U=t=>!!t.write,C=Symbol((g?"production":void 0)!=="production"?"CONTINUE_PROMISE":""),N="pending",H="fulfilled",Q="rejected",X=t=>typeof t=="object"&&t!==null&&C in t,V=new WeakMap,Z=(t,c,s)=>{if(!V.has(t)){let f;const w=new Promise((p,D)=>{let S=t;const O=h=>A=>{S===h&&(w.status=H,w.value=A,p(A),s())},E=h=>A=>{S===h&&(w.status=Q,w.reason=A,D(A),s())};t.then(O(t),E(t)),f=(h,A)=>{h&&(V.set(h,w),S=h,h.then(O(h),E(h)),c(),c=A)}});w.status=N,w[C]=f,V.set(t,w)}return V.get(t)},tt=t=>typeof(t==null?void 0:t.then)=="function",J=t=>"v"in t||"e"in t,I=t=>{if("e"in t)throw t.e;if((g?"production":void 0)!=="production"&&!("v"in t))throw new Error("[Bug] atom state is not initialized");return t.v},L=t=>{const c=t.v;return X(c)&&c.status===N?c:null},W=(t,c,s)=>{s.p.has(t)||(s.p.add(t),c.then(()=>{s.p.delete(t)},()=>{s.p.delete(t)}))},M=()=>[new Map,new Map,new Set],m=(t,c,s)=>{t[0].has(c)||t[0].set(c,new Set),t[1].set(c,s)},et=(t,c,s)=>{const f=t[0].get(c);f&&f.add(s)},nt=(t,c)=>t[0].get(c),$=(t,c)=>{t[2].add(c)},P=t=>{for(;t[1].size||t[2].size;){t[0].clear();const c=new Set(t[1].values());t[1].clear();const s=new Set(t[2]);t[2].clear(),c.forEach(f=>{var w;return(w=f.m)==null?void 0:w.l.forEach(p=>p())}),s.forEach(f=>f())}},ot=()=>{const t=new WeakMap;let c;(g?"production":void 0)!=="production"&&(c=new Set);const s=r=>{let e=t.get(r);return e||(e={d:new Map,p:new Set,n:0},t.set(r,e)),e},f=(r,e,o,n=()=>{},u=()=>{})=>{const l="v"in e,d=e.v,_=L(e);if(tt(o))if(_)_!==o&&(_[C](o,n),++e.n);else{const a=Z(o,n,u);if(a.status===N)for(const i of e.d.keys()){const v=s(i);W(r,a,v)}e.v=a,delete e.e}else _&&_[C](Promise.resolve(o),n),e.v=o,delete e.e;(!l||!Object.is(d,e.v))&&++e.n},w=(r,e,o,n)=>{var u;if((g?"production":void 0)!=="production"&&o===e)throw new Error("[Bug] atom cannot depend on itself");const l=s(e);l.d.set(o,n.n);const d=L(l);d&&W(e,d,n),(u=n.m)==null||u.t.add(e),r&&et(r,o,e)},p=(r,e,o)=>{const n=s(e);if(!(o!=null&&o(e))&&J(n)&&(n.m||Array.from(n.d).every(([i,v])=>p(r,i,o).n===v)))return n;n.d.clear();let u=!0;const l=i=>{if(z(e,i)){const b=s(i);if(!J(b))if(F(i))f(i,b,i.init);else throw new Error("no atom init");return I(b)}const v=p(r,i,o);if(u)w(r,e,i,v);else{const b=M();w(b,e,i,v),h(b,e,n),P(b)}return I(v)};let d,_;const a={get signal(){return d||(d=new AbortController),d.signal},get setSelf(){return(g?"production":void 0)!=="production"&&!U(e)&&console.warn("setSelf function cannot be used with read-only atom"),!_&&U(e)&&(_=(...i)=>{if((g?"production":void 0)!=="production"&&u&&console.warn("setSelf function cannot be called in sync"),!u)return E(e,...i)}),_}};try{const i=e.read(l,a);return f(e,n,i,()=>d==null?void 0:d.abort(),()=>{if(n.m){const v=M();h(v,e,n),P(v)}}),n}catch(i){return delete n.v,n.e=i,++n.n,n}finally{u=!1}},D=r=>I(p(void 0,r)),S=(r,e)=>{const o=a=>{var i,v;const b=s(a),y=new Set((i=b.m)==null?void 0:i.t);for(const R of b.p)y.add(R);return(v=nt(r,a))==null||v.forEach(R=>{y.add(R)}),y},n=[],u=new Set,l=a=>{if(!u.has(a)){u.add(a);for(const i of o(a))a!==i&&l(i);n.push(a)}};l(e);const d=new Set([e]),_=a=>u.has(a);for(let a=n.length-1;a>=0;--a){const i=n[a],v=s(i),b=v.n;let y=!1;for(const R of v.d.keys())if(R!==i&&d.has(R)){y=!0;break}y&&(p(r,i,_),h(r,i,v),b!==v.n&&(m(r,i,v),d.add(i))),u.delete(i)}},O=(r,e,...o)=>{const n=d=>I(p(r,d)),u=(d,..._)=>{let a;if(z(e,d)){if(!F(d))throw new Error("atom not writable");const i=s(d),v="v"in i,b=i.v,y=_[0];f(d,i,y),h(r,d,i),(!v||!Object.is(b,i.v))&&(m(r,d,i),S(r,d))}else a=O(r,d,..._);return P(r),a};return e.write(n,u,...o)},E=(r,...e)=>{const o=M(),n=O(o,r,...e);return P(o),n},h=(r,e,o)=>{if(o.m&&!L(o)){for(const n of o.d.keys())o.m.d.has(n)||(A(r,n).t.add(e),o.m.d.add(n));for(const n of o.m.d||[])if(!o.d.has(n)){o.m.d.delete(n);const u=j(r,n);u==null||u.t.delete(e)}}},A=(r,e)=>{const o=s(e);if(!o.m){p(r,e);for(const n of o.d.keys())A(r,n).t.add(e);if(o.m={l:new Set,d:new Set(o.d.keys()),t:new Set},(g?"production":void 0)!=="production"&&c.add(e),U(e)&&e.onMount){const n=o.m,{onMount:u}=e;$(r,()=>{const l=u((...d)=>O(r,e,...d));l&&(n.u=l)})}}return o.m},j=(r,e)=>{const o=s(e);if(o.m&&!o.m.l.size&&!Array.from(o.m.t).some(n=>{var u;return(u=s(n).m)==null?void 0:u.d.has(e)})){const n=o.m.u;n&&$(r,n),delete o.m,(g?"production":void 0)!=="production"&&c.delete(e);for(const l of o.d.keys()){const d=j(r,l);d==null||d.t.delete(e)}const u=L(o);u&&u[C](void 0,()=>{});return}return o.m},B={get:D,set:E,sub:(r,e)=>{const o=M(),n=A(o,r);P(o);const u=n.l;return u.add(e),()=>{u.delete(e);const l=M();j(l,r),P(l)}}};return(g?"production":void 0)!=="production"&&Object.assign(B,{dev4_get_internal_weak_map:()=>t,dev4_get_mounted_atoms:()=>c,dev4_restore_atoms:e=>{const o=M();for(const[n,u]of e)if(F(n)){const l=s(n),d="v"in l,_=l.v;f(n,l,u),h(o,n,l),(!d||!Object.is(_,l.v))&&(m(o,n,l),S(o,n))}P(o)}}),B};let k;const st=()=>(k||(k=ot(),(g?"production":void 0)!=="production"&&(globalThis.__JOTAI_DEFAULT_STORE__||(globalThis.__JOTAI_DEFAULT_STORE__=k),globalThis.__JOTAI_DEFAULT_STORE__!==k&&console.warn("Detected multiple Jotai instances. It may cause unexpected behavior with the default store. https://github.com/pmndrs/jotai/discussions/2044"))),k);var rt={BASE_URL:"./",DEV:!1,MODE:"production",PROD:!0,SSR:!1,STORYBOOK:"true"};const it=T.createContext(void 0),K=t=>T.useContext(it)||st(),ct=t=>typeof(t==null?void 0:t.then)=="function",ut=Y.use||(t=>{if(t.status==="pending")throw t;if(t.status==="fulfilled")return t.value;throw t.status==="rejected"?t.reason:(t.status="pending",t.then(c=>{t.status="fulfilled",t.value=c},c=>{t.status="rejected",t.reason=c}),t)});function at(t,c){const s=K(),[[f,w,p],D]=T.useReducer(E=>{const h=s.get(t);return Object.is(E[0],h)&&E[1]===s&&E[2]===t?E:[h,s,t]},void 0,()=>[s.get(t),s,t]);let S=f;return(w!==s||p!==t)&&(D(),S=s.get(t)),T.useEffect(()=>{const E=s.sub(t,()=>{D()});return D(),E},[s,t,void 0]),T.useDebugValue(S),ct(S)?ut(S):S}function vt(t,c){const s=K();return T.useCallback((...w)=>{if((rt?"production":void 0)!=="production"&&!("write"in t))throw new Error("not writable atom");return s.set(t,...w)},[s,t])}export{ft as a,at as b,vt as u};
