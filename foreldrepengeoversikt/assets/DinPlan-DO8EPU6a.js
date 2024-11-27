import{j as g}from"./jsx-runtime-Cw0GR0a5.js";import{r as u,R as v}from"./index-CTjT7uj6.js";import"./index-BXq8hJNt.js";import"./UttaksdagenString-DBxOpWvb.js";import"./dates-JCHAmx_r.js";import{a as U,U as z,b as H}from"./UttaksplanKalender-DJXi4mb1.js";import"./_getTag-BJIhF6Yf.js";import{u as $}from"./useSelectedSak-BInGIrc1.js";import{Y}from"./Ytelse-7td-ciMh.js";import{d as q,c as Q,u as W}from"./sakerUtils-D4fsp9GY.js";import{V as R,H as J}from"./VStack-Cmqt2b2v.js";import{a as G,B as X}from"./Button-Cz42euBq.js";import{M as k}from"./message-DyNkxP6Y.js";import{c as N,B as Z,L as ee}from"./Label-BeJqMiuK.js";import{u as te,m as K,a as ne}from"./useMergeRefs-DE1yqPfQ.js";import{a as B}from"./dateFormValidation-BBxfzUfL.js";import{c as C}from"./composeEventHandlers-DeH74NdU.js";import{u as se}from"./ChevronDown-CyMHwesb.js";var re=function(s,t){var n={};for(var e in s)Object.prototype.hasOwnProperty.call(s,e)&&t.indexOf(e)<0&&(n[e]=s[e]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(s);r<e.length;r++)t.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(s,e[r])&&(n[e[r]]=s[e[r]]);return n};const oe=u.forwardRef((s,t)=>{var{title:n,titleId:e}=s,r=re(s,["title","titleId"]);let o=te();return o=n?e||"title-"+o:void 0,u.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:t,"aria-labelledby":o},r),n?u.createElement("title",{id:o},n):null,u.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M4 5.75a.25.25 0 1 0 0 .5.25.25 0 0 0 0-.5M2.25 6a1.75 1.75 0 1 1 3.5 0 1.75 1.75 0 0 1-3.5 0m1.5 6a.25.25 0 1 1 .5 0 .25.25 0 0 1-.5 0M4 10.25a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5M3.75 18a.25.25 0 1 1 .5 0 .25.25 0 0 1-.5 0M4 16.25a1.75 1.75 0 1 0 0 3.5 1.75 1.75 0 0 0 0-3.5m5 1a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5zM8.25 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5H9a.75.75 0 0 1-.75-.75M9 5.25a.75.75 0 0 0 0 1.5h12a.75.75 0 0 0 0-1.5z",clipRule:"evenodd"}))});function F(s){return s.sort((t,n)=>{const e=t.compareDocumentPosition(n);if(e&Node.DOCUMENT_POSITION_FOLLOWING||e&Node.DOCUMENT_POSITION_CONTAINED_BY)return-1;if(e&Node.DOCUMENT_POSITION_PRECEDING||e&Node.DOCUMENT_POSITION_CONTAINS)return 1;if(e&Node.DOCUMENT_POSITION_DISCONNECTED||e&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC)throw Error("Cannot sort the given nodes.");return 0})}const ae=s=>typeof s=="object"&&"nodeType"in s&&s.nodeType===Node.ELEMENT_NODE;function A(s,t,n){let e=s+1;return n&&e>=t&&(e=0),e}function V(s,t,n){let e=s-1;return n&&e<0&&(e=t),e}const D=s=>s;class ie{constructor(){this.descendants=new Map,this.register=t=>{if(t!=null)return ae(t)?this.registerNode(t):n=>{this.registerNode(n,t)}},this.unregister=t=>{this.descendants.delete(t);const n=F(Array.from(this.descendants.keys()));this.assignIndex(n)},this.destroy=()=>{this.descendants.clear()},this.assignIndex=t=>{this.descendants.forEach(n=>{const e=t.indexOf(n.node);n.index=e,n.node.dataset.index=n.index.toString()})},this.count=()=>this.descendants.size,this.enabledCount=()=>this.enabledValues().length,this.values=()=>Array.from(this.descendants.values()).sort((n,e)=>n.index-e.index),this.enabledValues=()=>this.values().filter(t=>!t.disabled),this.item=t=>{if(this.count()!==0)return this.values()[t]},this.enabledItem=t=>{if(this.enabledCount()!==0)return this.enabledValues()[t]},this.first=()=>this.item(0),this.firstEnabled=()=>this.enabledItem(0),this.last=()=>this.item(this.descendants.size-1),this.lastEnabled=()=>{const t=this.enabledValues().length-1;return this.enabledItem(t)},this.indexOf=t=>{var n,e;return t&&(e=(n=this.descendants.get(t))===null||n===void 0?void 0:n.index)!==null&&e!==void 0?e:-1},this.enabledIndexOf=t=>t==null?-1:this.enabledValues().findIndex(n=>n.node.isSameNode(t)),this.next=(t,n=!0)=>{const e=A(t,this.count(),n);return this.item(e)},this.nextEnabled=(t,n=!0)=>{const e=this.item(t);if(!e)return;const r=this.enabledIndexOf(e.node),o=A(r,this.enabledCount(),n);return this.enabledItem(o)},this.prev=(t,n=!0)=>{const e=V(t,this.count()-1,n);return this.item(e)},this.prevEnabled=(t,n=!0)=>{const e=this.item(t);if(!e)return;const r=this.enabledIndexOf(e.node),o=V(r,this.enabledCount()-1,n);return this.enabledItem(o)},this.registerNode=(t,n)=>{if(!t)return;const e=this.descendants.get(t);if(e){this.descendants.set(t,Object.assign({index:e.index,node:t},n));return}const r=Array.from(this.descendants.keys()).concat(t),o=F(r);n!=null&&n.disabled&&(n.disabled=!!n.disabled);const i=Object.assign({node:t,index:-1},n);this.descendants.set(t,i),this.assignIndex(o)}}}function le(){const[s,t]=B({name:"DescendantsProvider",errorMessage:"useDescendantsContext must be used within DescendantsProvider"}),n=D(o=>v.createElement(s,Object.assign({},o.value),o.children));function e(o){const i=t(),[m,c]=u.useState(-1),d=u.useRef(null);G(()=>()=>{d.current&&i.unregister(d.current)},[]),G(()=>{if(!d.current)return;const a=Number(d.current.dataset.index);m!==a&&!Number.isNaN(a)&&c(a)});const p=D(o?i.register(o):i.register);return{descendants:i,index:m,enabledIndex:i.enabledIndexOf(d.current),register:K([p,d])}}function r(){return u.useRef(new ie).current}return[n,t,r,e]}u.createContext(null);const[de,Ve,ce,ue]=le(),[fe,L]=B({name:"ToggleGroupContext",hookName:"useToggleGroupContext",providerName:"ToggleGroupProvider",errorMessage:"<ToggleGroup.Item> needs to be wrapped within <ToggleGroup>"});function me({value:s,disabled:t=!1,onFocus:n,onClick:e,onKeyDown:r},o){const{setSelectedValue:i,setFocusedValue:m,selectedValue:c,focusedValue:d}=L(),{register:p,descendants:a}=ue({disabled:t,value:s}),b=s===c,E=()=>m(s),O=u.useCallback(h=>{const x=a.values().findIndex(l=>l.value===d),j={ArrowLeft:()=>{var l;const f=a.prevEnabled(x,!1);(l=f==null?void 0:f.node)===null||l===void 0||l.focus()},ArrowRight:()=>{var l;const f=a.nextEnabled(x,!1);(l=f==null?void 0:f.node)===null||l===void 0||l.focus()},Home:()=>{var l;const f=a.firstEnabled();(l=f==null?void 0:f.node)===null||l===void 0||l.focus()},End:()=>{var l;const f=a.lastEnabled();(l=f==null?void 0:f.node)===null||l===void 0||l.focus()}},I=h.shiftKey||h.ctrlKey||h.altKey||h.metaKey,T=j[h.key];T&&!I?(h.preventDefault(),T(h)):h.key==="Tab"&&c&&setTimeout(()=>m(c))},[a,d,c,m]);return{ref:K([p,o]),isSelected:b,isFocused:d===s,onClick:C(e,()=>c!==s&&i(s)),onFocus:t?void 0:C(n,E),onKeyDown:C(r,O)}}var ge=function(s,t){var n={};for(var e in s)Object.prototype.hasOwnProperty.call(s,e)&&t.indexOf(e)<0&&(n[e]=s[e]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(s);r<e.length;r++)t.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(s,e[r])&&(n[e[r]]=s[e[r]]);return n};const he=u.forwardRef((s,t)=>{var{className:n,children:e,icon:r,label:o,value:i,onClick:m,onFocus:c,onKeyDown:d}=s,p=ge(s,["className","children","icon","label","value","onClick","onFocus","onKeyDown"]);const a=me({value:i,onClick:m,onFocus:c,disabled:!1,onKeyDown:d},t),b=L();return v.createElement("button",Object.assign({},p,{ref:a.ref,className:N("navds-toggle-group__button",n),type:"button",role:"radio","aria-checked":a.isSelected,tabIndex:a.isFocused?0:-1,onClick:a.onClick,onFocus:a.onFocus,onKeyDown:a.onKeyDown}),v.createElement(Z,{as:"span",className:"navds-toggle-group__button-inner",size:b==null?void 0:b.size},e??v.createElement(v.Fragment,null,r,o)))});function pe({onChange:s,value:t,defaultValue:n=""}){const[e,r]=u.useState(n),[o,i]=se({defaultValue:n,value:t,onChange:s});return u.useEffect(()=>{t!=null&&r(t)},[t]),{selectedValue:o,setSelectedValue:i,focusedValue:e,setFocusedValue:r}}var be=function(s,t){var n={};for(var e in s)Object.prototype.hasOwnProperty.call(s,e)&&t.indexOf(e)<0&&(n[e]=s[e]);if(s!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,e=Object.getOwnPropertySymbols(s);r<e.length;r++)t.indexOf(e[r])<0&&Object.prototype.propertyIsEnumerable.call(s,e[r])&&(n[e[r]]=s[e[r]]);return n};const _=u.forwardRef((s,t)=>{var{className:n,children:e,onChange:r,size:o="medium",label:i,value:m,defaultValue:c,"aria-describedby":d,variant:p="action",fill:a=!1}=s,b=be(s,["className","children","onChange","size","label","value","defaultValue","aria-describedby","variant","fill"]);const E=ce(),O=pe({defaultValue:c,value:m,onChange:r}),h=Object.assign(Object.assign({},O),{size:o}),x=ne();return!m&&!c&&console.error("ToggleGroup without value or defaultvalue is not allowed"),!m&&!c&&console.error("ToggleGroup needs either a value or defaultValue"),v.createElement(de,{value:E},v.createElement(fe,Object.assign({},h),v.createElement("div",{className:N("navds-toggle-group__wrapper",n,{"navds-toggle-group__wrapper--fill":a})},i&&v.createElement(ee,{size:o,className:"navds-toggle-group__label",id:x},i),v.createElement("div",Object.assign({},b,{ref:t,className:N("navds-toggle-group",`navds-toggle-group--${o}`,`navds-toggle-group--${p}`),"aria-describedby":N(d,!!i&&x)||void 0,role:"radiogroup"}),e))))});_.Item=he;const ve=typeof window<"u"&&window.matchMedia===void 0,Ee=(s,t)=>{const[n,e]=u.useState(t);return u.useEffect(()=>{if(ve)return;const r=window.matchMedia(s);e(r.matches);const o=i=>{e(i.matches)};return r.addEventListener("change",o),()=>{r.removeEventListener("change",o)}},[s]),n};var y=(s=>(s.BARE_SØKER_RETT="BARE_SØKER_RETT",s.ALENEOMSORG="ALENEOMSORG",s.BEGGE_RETT="BEGGE_RETT",s))(y||{});const xe=({annenPartsPerioder:s,navnPåForeldre:t})=>{var I,T;const n=$(),e=Ee("screen and (min-width: 768px)"),[r,o]=u.useState(!1);if(!n||n.ytelse!==Y.FORELDREPENGER)return null;const i=(I=n.gjeldendeVedtak)==null?void 0:I.perioder,m=(T=n.åpenBehandling)==null?void 0:T.søknadsperioder,c=n.familiehendelse,d=n.sakTilhørerMor,p=n.gjelderAdopsjon,a=n.rettighetType,b=()=>i??m,E=!d,O=a===y.BARE_SØKER_RETT&&!d,h=a===y.BEGGE_RETT,x=d&&(y.BEGGE_RETT||y.BARE_SØKER_RETT),M=a===y.ALENEOMSORG,w=!h&&!x&&!M,P=Q(c),S=q(c,p),j=W(c,p);return g.jsxs(R,{gap:"10",children:[g.jsx(J,{children:g.jsx(X,{className:"mt-4",size:e?"small":"medium",variant:"secondary",onClick:()=>window.location.href="https://www.nav.no/foreldrepenger/soknad",children:g.jsx(k,{id:"DinPlan.EndrePlan"})})}),g.jsxs(R,{gap:"10",children:[g.jsxs(_,{defaultValue:r?"kalender":"plan",onChange:l=>o(l==="kalender"),fill:!0,children:[g.jsx(_.Item,{value:"plan",icon:g.jsx(oe,{"aria-hidden":!0}),label:g.jsx(k,{id:"DinPlan.Liste"})}),g.jsx(_.Item,{value:"kalender",icon:g.jsx(U,{"aria-hidden":!0}),label:g.jsx(k,{id:"DinPlan.Kalender"})})]}),!r&&g.jsx(z,{barn:S,erFarEllerMedmor:E,familiehendelsedato:P,navnPåForeldre:t,annenPartsPerioder:s,søkersPerioder:b()||[],gjelderAdopsjon:p,bareFarHarRett:O,familiesituasjon:j,førsteUttaksdagNesteBarnsSak:void 0,harAktivitetskravIPeriodeUtenUttak:w}),r&&g.jsx(H,{bareFarHarRett:O,barn:S,erFarEllerMedmor:E,harAktivitetskravIPeriodeUtenUttak:w,søkersPerioder:b()||[],annenPartsPerioder:s,navnAnnenPart:E?t.mor:t.farMedmor})]})]})};xe.__docgenInfo={description:"",methods:[],displayName:"DinPlan",props:{annenPartsPerioder:{required:!1,tsType:{name:"Array",elements:[{name:"SaksperiodeNy"}],raw:"SaksperiodeNy[]"},description:""},navnPåForeldre:{required:!0,tsType:{name:"NavnPåForeldre"},description:""}}};export{xe as D};
