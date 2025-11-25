import{r as u,c as ve,R as T,m as he,a as ie,S as Le,b as le,d as be,e as p,j as E}from"./iframe-COryr5Ej.js";import{f as Ne,i as de,a as De}from"./UttaksdagenString-Cgo2Zie1.js";import{I as Te}from"./dates-cw6odJEe.js";import{R as Ie,u as Re,a as Oe,b as Pe,o as Ue,f as Ge,s as Ce,c as _e,d as Se}from"./Date.Input-D7FHkIDn.js";import"./useId-BxVcB4r2.js";import{u as ee}from"./ChevronDown-DrfGtJlf.js";import{B as Be}from"./Box-Cv5phsNo.js";import{V as te}from"./VStack-GNT7s3IA.js";import{H as xe,B as we,D as ke}from"./Label-D7OWORgs.js";import{H as J}from"./HGrid-Cm7-b-Pn.js";import{B as Ae}from"./Button-BYrJSyEH.js";import{M as je}from"./message-DEd5oCq5.js";import"./preload-helper-D9Z9MdNV.js";import"./index-7y_MDbzj.js";import"./i18n.hooks-BT8ngMfP.js";import"./useId-CX1QIgL8.js";import"./Calendar-B3KGs8B2.js";import"./BasePrimitive-Cvu0SEZH.js";const $=globalThis?.document?u.useLayoutEffect:()=>{};function ne(t){return t.sort((e,r)=>{const n=e.compareDocumentPosition(r);if(n&Node.DOCUMENT_POSITION_FOLLOWING||n&Node.DOCUMENT_POSITION_CONTAINED_BY)return-1;if(n&Node.DOCUMENT_POSITION_PRECEDING||n&Node.DOCUMENT_POSITION_CONTAINS)return 1;if(n&Node.DOCUMENT_POSITION_DISCONNECTED||n&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC)throw Error("Cannot sort the given nodes.");return 0})}const Me=t=>typeof t=="object"&&"nodeType"in t&&t.nodeType===Node.ELEMENT_NODE;function re(t,e,r){let n=t+1;return r&&n>=e&&(n=0),n}function ae(t,e,r){let n=t-1;return r&&n<0&&(n=e),n}const Z=t=>t;class He{constructor(){this.descendants=new Map,this.register=e=>{if(e!=null)return Me(e)?this.registerNode(e):r=>{this.registerNode(r,e)}},this.unregister=e=>{this.descendants.delete(e);const r=ne(Array.from(this.descendants.keys()));this.assignIndex(r)},this.destroy=()=>{this.descendants.clear()},this.assignIndex=e=>{this.descendants.forEach(r=>{const n=e.indexOf(r.node);r.index=n,r.node.dataset.index=r.index.toString()})},this.count=()=>this.descendants.size,this.enabledCount=()=>this.enabledValues().length,this.values=()=>Array.from(this.descendants.values()).sort((r,n)=>r.index-n.index),this.enabledValues=()=>this.values().filter(e=>!e.disabled),this.item=e=>{if(this.count()!==0)return this.values()[e]},this.enabledItem=e=>{if(this.enabledCount()!==0)return this.enabledValues()[e]},this.first=()=>this.item(0),this.firstEnabled=()=>this.enabledItem(0),this.last=()=>this.item(this.descendants.size-1),this.lastEnabled=()=>{const e=this.enabledValues().length-1;return this.enabledItem(e)},this.indexOf=e=>{var r,n;return e&&(n=(r=this.descendants.get(e))===null||r===void 0?void 0:r.index)!==null&&n!==void 0?n:-1},this.enabledIndexOf=e=>e==null?-1:this.enabledValues().findIndex(r=>r.node.isSameNode(e)),this.next=(e,r=!0)=>{const n=re(e,this.count(),r);return this.item(n)},this.nextEnabled=(e,r=!0)=>{const n=this.item(e);if(!n)return;const a=this.enabledIndexOf(n.node),s=re(a,this.enabledCount(),r);return this.enabledItem(s)},this.prev=(e,r=!0)=>{const n=ae(e,this.count()-1,r);return this.item(n)},this.prevEnabled=(e,r=!0)=>{const n=this.item(e);if(!n)return;const a=this.enabledIndexOf(n.node),s=ae(a,this.enabledCount()-1,r);return this.enabledItem(s)},this.registerNode=(e,r)=>{if(!e)return;const n=this.descendants.get(e);if(n){this.descendants.set(e,Object.assign({index:n.index,node:e},r));return}const a=Array.from(this.descendants.keys()).concat(e),s=ne(a);r?.disabled&&(r.disabled=!!r.disabled);const o=Object.assign({node:e,index:-1},r);this.descendants.set(e,o),this.assignIndex(s)}}}function Ke(){const[t,e]=ve({name:"DescendantsProvider",errorMessage:"useDescendantsContext must be used within DescendantsProvider"}),r=Z(s=>T.createElement(t,Object.assign({},s.value),s.children));function n(s){const o=e(),[d,c]=u.useState(-1),m=u.useRef(null);$(()=>()=>{m.current&&o.unregister(m.current)},[]),$(()=>{if(!m.current)return;const N=Number(m.current.dataset.index);d!==N&&!Number.isNaN(N)&&c(N)});const i=Z(s?o.register(s):o.register);return{descendants:o,index:d,enabledIndex:o.enabledIndexOf(m.current),register:he([i,m])}}function a(){return u.useRef(new He).current}return[r,e,a,n]}function qe(t,e=globalThis?.document){const r=ee(t);u.useEffect(()=>{const n=a=>{a.key==="Escape"&&r(a)};return e.addEventListener("keydown",n,!0),()=>e.removeEventListener("keydown",n,!0)},[r,e])}const ue={FOCUS_OUTSIDE:"AKSEL_FOCUS_OUTSIDE",POINTER_DOWN_OUTSIDE:"AKSEL_POINTER_DOWN_OUTSIDE"};function ce(t,e,r,{discrete:n}={discrete:!1}){if(!e)return;const a=r.originalEvent.target,s=new CustomEvent(t,{bubbles:!1,cancelable:!0,detail:r});a.addEventListener(t,e,{once:!0}),n&&a?Ie.flushSync(()=>a.dispatchEvent(s)):a.dispatchEvent(s)}function Ve(t,e=globalThis?.document){const r=ee(t),n=u.useRef(!1);return u.useEffect(()=>{const a=s=>{if(s.target&&!n.current){const o={originalEvent:s};ce(ue.FOCUS_OUTSIDE,r,o)}};return e.addEventListener("focusin",a),()=>e.removeEventListener("focusin",a)},[e,r]),{onFocusCapture:()=>{n.current=!0},onBlurCapture:()=>{n.current=!1}}}function Ye(t,e=globalThis?.document){const r=ee(t),n=u.useRef(!1),a=u.useRef(()=>{});return u.useEffect(()=>{const s=d=>{function c(){ce(ue.POINTER_DOWN_OUTSIDE,r,{originalEvent:d},{discrete:!0})}d.target&&!n.current?d.pointerType==="touch"?(e.removeEventListener("click",a.current),a.current=c,e.addEventListener("click",a.current,{once:!0})):c():e.removeEventListener("click",a.current),n.current=!1},o=window.setTimeout(()=>{e.addEventListener("pointerdown",s)},0);return()=>{window.clearTimeout(o),e.removeEventListener("pointerdown",s),e.removeEventListener("click",a.current)}},[e,r]),{onPointerDownCapture:()=>{n.current=!0}}}var Fe=function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(t);a<n.length;a++)e.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(t,n[a])&&(r[n[a]]=t[n[a]]);return r};const[$e,We,ze,Ze]=Ke();let x=0,se;const Xe=u.forwardRef((t,e)=>We(!1)?T.createElement(oe,Object.assign({ref:e},t)):T.createElement(Je,null,T.createElement(oe,Object.assign({ref:e},t)))),Je=({children:t})=>{const e=ze();return T.createElement($e,{value:e},t)},oe=u.forwardRef((t,e)=>{var r,{children:n,asChild:a,onEscapeKeyDown:s,onPointerDownOutside:o,onFocusOutside:d,onInteractOutside:c,onDismiss:m,safeZone:i,disableOutsidePointerEvents:N=!1,enabled:v=!0}=t,D=Fe(t,["children","asChild","onEscapeKeyDown","onPointerDownOutside","onFocusOutside","onInteractOutside","onDismiss","safeZone","disableOutsidePointerEvents","enabled"]);const[,P]=u.useState({}),{register:U,index:l,descendants:g}=Ze({disableOutsidePointerEvents:N,disabled:!v,forceUpdate:()=>P({})}),[y,h]=u.useState(null),I=ie(h,U,e),L=(r=y?.ownerDocument)!==null&&r!==void 0?r:globalThis?.document,O=u.useRef(!1),G=u.useRef(!1),_=(()=>{let f=-1;return g.enabledValues().forEach((j,S)=>{j.disableOutsidePointerEvents&&(f=S)}),{isPointerEventsEnabled:l>=f,isBodyPointerEventsDisabled:x>0,pointerStyle:l>=f&&x>0?"auto":void 0}})();function R(f){var A,j;if(!i?.anchor&&!i?.dismissable||!v)return;f.defaultPrevented||(O.current=!0,f.detail.originalEvent.type==="pointerdown"&&(G.current=!0));const S=f.target;f.detail.originalEvent.type==="pointerdown"?(!((A=i?.anchor)===null||A===void 0)&&A.contains(S)||S===i?.anchor)&&f.preventDefault():!(S instanceof HTMLElement&&![i?.anchor,i?.dismissable].some(z=>z?.contains(S))&&!S.contains((j=i?.dismissable)!==null&&j!==void 0?j:null))&&f.preventDefault(),f.detail.originalEvent.type==="focusin"&&G.current&&f.preventDefault(),G.current=!1,O.current=!1}const B=Ye(f=>{!_.isPointerEventsEnabled||!v||(o?.(f),c?.(f),i&&R(f),!f.defaultPrevented&&m&&m())},L),w=Ve(f=>{v&&(d?.(f),c?.(f),i&&R(f),!f.defaultPrevented&&m&&m())},L);qe(f=>{!v||!(l===g.enabledCount()-1)||(s?.(f),!f.defaultPrevented&&m&&(f.preventDefault(),m()))},L),u.useEffect(()=>{if(!(!y||!v||!N))return x===0&&(se=L.body.style.pointerEvents,L.body.style.pointerEvents="none"),x++,()=>{x===1&&(L.body.style.pointerEvents=se),x--}},[y,L,N,g,v]),u.useEffect(()=>()=>g.values().forEach(f=>f.forceUpdate()),[g,y]);const k=a?Le:"div";return T.createElement(k,Object.assign({ref:I},D,{onFocusCapture:w.onFocusCapture,onBlurCapture:w.onBlurCapture,onPointerDownCapture:B.onPointerDownCapture,style:Object.assign({pointerEvents:_.pointerStyle},D.style)}),n)});var Qe=function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(t);a<n.length;a++)e.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(t,n[a])&&(r[n[a]]=t[n[a]]);return r};const et=u.forwardRef((t,e)=>{var{className:r}=t,n=Qe(t,["className"]);const{cn:a}=le();return T.createElement("div",Object.assign({},n,{ref:e,className:a("navds-popover__content",r)}))});var tt=function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(t);a<n.length;a++)e.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(t,n[a])&&(r[n[a]]=t[n[a]]);return r};const Q=u.forwardRef((t,e)=>{var{className:r,children:n,anchorEl:a,arrow:s=!0,open:o,onClose:d,placement:c="top",offset:m,strategy:i,flip:N=!0}=t,v=tt(t,["className","children","anchorEl","arrow","open","onClose","placement","offset","strategy","flip"]);const{cn:D}=le(),P=u.useRef(null),U=Re(!1)!==void 0,l=Oe(!1),g=i??(U?"fixed":"absolute"),y=l?!1:N,h=be(!1),{update:I,refs:L,placement:O,middlewareData:{arrow:{x:G,y:_}={}},floatingStyles:R}=Pe({strategy:g,placement:c,open:o,middleware:[Ue(m??(h?.isDarkside?8:s?16:4)),y&&Ge({padding:5,fallbackPlacements:["bottom","top"]}),Ce({padding:12}),_e({element:P,padding:8})]});$(()=>{L.setReference(a)},[a]);const B=ie(L.setFloating,e);$(()=>{if(!L.reference.current||!L.floating.current||!o)return;const k=Se(L.reference.current,L.floating.current,I);return()=>k()},[L.floating,L.reference,I,o,a]);const w={top:"bottom",right:"left",bottom:"top",left:"right"}[O.split("-")[0]];return T.createElement(Xe,{asChild:!0,safeZone:{anchor:a,dismissable:L.floating.current},onDismiss:()=>o&&d?.(),enabled:o},T.createElement("div",Object.assign({ref:B},v,{className:D("navds-popover",r,{"navds-popover--hidden":!o||!a}),style:Object.assign(Object.assign({},v.style),R),"data-placement":O,"aria-hidden":!o||!a}),n,s&&!h?.isDarkside&&T.createElement("div",{ref:k=>{P.current=k},style:Object.assign(Object.assign(Object.assign({},G!=null?{left:G}:{}),_!=null?{top:_}:{}),w?{[w]:"-0.5rem"}:{}),className:D("navds-popover__arrow")})))});Q.Content=et;const nt=t=>t.charAt(0).toUpperCase()+t.slice(1),rt="_days_11aro_1",at="_cursorAndHoover_11aro_30",st="_srOnly_11aro_38",ot="_blueDay_11aro_50",it="_darkblueDay_11aro_55",lt="_lightblueDay_11aro_61",dt="_lightgreenDay_11aro_80",ut="_greenDay_11aro_99",ct="_greenStripedDay_11aro_104",mt="_blueStripedDay_11aro_138",ft="_grayDay_11aro_172",Et="_blackDay_11aro_178",pt="_blackOutlineDay_11aro_184",gt="_blueOutlineDay_11aro_189",yt="_greenOutlineDay_11aro_207",vt="_lightgreenBlueDay_11aro_225",ht="_lightblueGreenDay_11aro_251",Lt="_none_11aro_276",bt="_pinkDay_11aro_281",Nt="_purpleDay_11aro_287",b={days:rt,cursorAndHoover:at,srOnly:st,blueDay:ot,darkblueDay:it,lightblueDay:lt,lightgreenDay:dt,greenDay:ut,greenStripedDay:ct,blueStripedDay:mt,grayDay:ft,blackDay:Et,blackOutlineDay:pt,blueOutlineDay:gt,greenOutlineDay:yt,lightgreenBlueDay:vt,lightblueGreenDay:ht,none:Lt,pinkDay:bt,purpleDay:Nt};var Dt={};const Tt={NONE:b.none,BLUE:b.blueDay,DARKBLUE:b.darkblueDay,LIGHTGREEN:b.lightgreenDay,GRAY:b.grayDay,PINK:b.pinkDay,PURPLE:b.purpleDay,BLACK:b.blackDay,BLACKOUTLINE:b.blackOutlineDay,BLUEOUTLINE:b.blueOutlineDay,GREENOUTLINE:b.greenOutlineDay,LIGHTBLUE:b.lightblueDay,GREEN:b.greenDay,LIGHTBLUEGREEN:b.lightblueGreenDay,LIGHTGREENBLUE:b.lightgreenBlueDay,GREENSTRIPED:b.greenStripedDay,BLUESTRIPED:b.blueStripedDay},me=T.memo(({isoDate:t,periodeColor:e,isFocused:r,srText:n,dateTooltipCallback:a,dateClickCallback:s,setFocusedDate:o})=>{const d=p(t),c=d.date();fe(`Rendering Day: ${c}, Color: ${e}`);const m=u.useRef(null),[i,N]=u.useState(!1);u.useEffect(()=>{r&&m.current?.focus()},[r]);const v=!!s&&!W(d);return E.jsxs("button",{ref:m,type:"button","data-testid":`day:${c};dayColor:${e}`,tabIndex:r?0:-1,className:`${b.days} ${Tt[e]} ${v&&b.cursorAndHoover}`,onFocus:v?()=>o(d):void 0,onMouseOver:a?()=>N(!0):void 0,onMouseLeave:a?()=>N(!1):void 0,onClick:v?()=>s(t):void 0,onKeyDown:s?D=>Rt(D,d,s,o):void 0,children:[c,n&&E.jsx("span",{className:b.srOnly,children:n}),a&&It(e)&&E.jsx(Q,{open:i,onClose:()=>N(!1),anchorEl:m.current,children:E.jsx(Q.Content,{children:a(t)})})]})}),It=t=>t!=="NONE"&&t!=="GRAY",W=t=>t.isoWeekday()===6||t.isoWeekday()===7,fe=t=>{const e=typeof process<"u"&&Dt.VITEST==="true";globalThis.location.hostname==="localhost"&&!e&&console.log(t)},Rt=(t,e,r,n)=>{if(t.key==="Tab")return;t.preventDefault();const a=!!r&&!W(e);switch(t.key){case"ArrowLeft":n(e.subtract(1,"day"));break;case"ArrowRight":n(e.add(1,"day"));break;case"ArrowUp":n(e.subtract(7,"day"));break;case"ArrowDown":n(e.add(7,"day"));break;case"Enter":case" ":a&&r(e.format(Te))}};me.__docgenInfo={description:"",methods:[],displayName:"Day",props:{isoDate:{required:!0,tsType:{name:"string"},description:""},periodeColor:{required:!0,tsType:{name:"union",raw:`| 'NONE'
| 'PINK'
| 'PURPLE'
| 'LIGHTBLUE'
| 'BLUE'
| 'DARKBLUE'
| 'GREEN'
| 'LIGHTGREEN'
| 'GRAY'
| 'BLACK'
| 'BLACKOUTLINE'
| 'LIGHTBLUEGREEN'
| 'LIGHTGREENBLUE'
| 'GREENSTRIPED'
| 'BLUESTRIPED'
| 'GREENOUTLINE'
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}]},description:""},isFocused:{required:!0,tsType:{name:"boolean"},description:""},srText:{required:!1,tsType:{name:"string"},description:""},dateTooltipCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => React.ReactNode | string",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"union",raw:"React.ReactNode | string",elements:[{name:"ReactReactNode",raw:"React.ReactNode"},{name:"string"}]}}},description:""},dateClickCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => void",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"void"}}},description:""},setFocusedDate:{required:!0,tsType:{name:"signature",type:"function",raw:"(date: Dayjs) => void",signature:{arguments:[{type:{name:"Dayjs"},name:"date"}],return:{name:"void"}}},description:""}}};const Ot="_weeknr_6j43u_1",Pt="_weekday_6j43u_12",X={weeknr:Ot,weekday:Pt};p.extend(de);const Ee=T.memo(({year:t,month:e,isFirstMonth:r,showWeekNumbers:n,periods:a,focusedDate:s,dateTooltipCallback:o,dateClickCallback:d,setFocusedDate:c})=>{fe(`Rendering Month: ${e}-${t}`);const m=u.useMemo(()=>Gt(a),[a]),i=p().year(t).month(e).startOf("month"),N=i.daysInMonth(),v=i.isoWeekday(),D=i.endOf("month").isoWeekday(),P=i.isoWeek(),U=Math.ceil((N+(v-1)+(7-D))/7),l=n?8:7,g=Array.from({length:7},(y,h)=>i.isoWeekday(h+1).format("dd"));return E.jsx(Be.New,{borderWidth:"1",maxWidth:"400px",padding:"3",borderRadius:"4",borderColor:"neutral-subtle","data-testid":`year:${t};month:${e}`,children:E.jsxs(te,{gap:"space-12",children:[E.jsx(xe,{size:"small",level:"4",align:"center",children:`${nt(i.format("MMMM"))} ${t}`}),E.jsxs("div",{children:[E.jsxs(J,{columns:l,children:[n&&E.jsx("div",{className:X.weeknr}),g.map(y=>E.jsx("div",{className:X.weekday,children:y},y))]}),Array.from({length:U}).map((y,h)=>E.jsxs(J,{columns:l,children:[n&&E.jsx("div",{className:X.weeknr,children:P+h},`weeknr-${h}`),Array.from({length:7}).map((I,L)=>{const O=h*7+L,G=h===0&&L<v-1,_=h===U-1&&L>=D;if(G||_)return E.jsx("div",{},`empty-${O}`);const R=i.add(O-(v-1),"day"),B=m.get(R.format("YYYY-MM-DD"));return E.jsx(me,{isoDate:Ne(R),periodeColor:Ut(R,B),srText:B?.srText,dateTooltipCallback:o,dateClickCallback:d,isFocused:s?.isSame(R,"day")??(r&&O===v-1)??!1,setFocusedDate:c},`${t}-${e}-${R.date()}`)})]},`week-${h}`))]})]})})},(t,e)=>{const r=Object.keys(t);for(const n of r)if(n!=="periods"&&t[n]!==e[n])return!1;if(t.periods.length!==e.periods.length)return!1;for(let n=0;n<t.periods.length;n++){const a=t.periods[n],s=e.periods[n],o=Object.keys(a);for(const d of o)if(a[d]!==s[d])return!1}return!0}),Ut=(t,e)=>e?e.color==="PINK"?"PINK":e.color==="PURPLE"?"PURPLE":W(t)?"GRAY":e.color:W(t)?"GRAY":"NONE",Gt=t=>{const e=new Map;for(const r of t){let n=p(r.fom);const a=p(r.tom);for(;!n.isAfter(a,"day");){const s=n.format("YYYY-MM-DD");(!e.has(s)||r.isSelected)&&e.set(s,r),n=n.add(1,"day")}}return e};Ee.__docgenInfo={description:"",methods:[],displayName:"Month",props:{year:{required:!0,tsType:{name:"number"},description:""},month:{required:!0,tsType:{name:"number"},description:""},isFirstMonth:{required:!0,tsType:{name:"boolean"},description:""},showWeekNumbers:{required:!0,tsType:{name:"boolean"},description:""},periods:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    color: CalendarPeriodColor;
    srText?: string;
    isSelected?: boolean;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"color",value:{name:"union",raw:`| 'NONE'
| 'PINK'
| 'PURPLE'
| 'LIGHTBLUE'
| 'BLUE'
| 'DARKBLUE'
| 'GREEN'
| 'LIGHTGREEN'
| 'GRAY'
| 'BLACK'
| 'BLACKOUTLINE'
| 'LIGHTBLUEGREEN'
| 'LIGHTGREENBLUE'
| 'GREENSTRIPED'
| 'BLUESTRIPED'
| 'GREENOUTLINE'
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}],required:!0}},{key:"srText",value:{name:"string",required:!1}},{key:"isSelected",value:{name:"boolean",required:!1}}]}}],raw:"CalendarPeriod[]"},description:""},focusedDate:{required:!0,tsType:{name:"union",raw:"Dayjs | undefined",elements:[{name:"Dayjs"},{name:"undefined"}]},description:""},dateTooltipCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => React.ReactElement | string",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"union",raw:"React.ReactElement | string",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"string"}]}}},description:""},dateClickCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => void",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"void"}}},description:""},setFocusedDate:{required:!0,tsType:{name:"signature",type:"function",raw:"(date: Dayjs) => void",signature:{arguments:[{type:{name:"Dayjs"},name:"date"}],return:{name:"void"}}},description:""}}};p.extend(de);p.extend(De);const M=({periods:t,showWeekNumbers:e=!0,dateTooltipCallback:r,setSelectedPeriods:n,isRangeSelection:a=!1,getSrTextForSelectedPeriod:s,firstDateInCalendar:o,lastDateInCalendar:d})=>{const[c,m]=u.useState(0),i=u.useMemo(()=>Ct(c,o,d),[t,o,d,c]),N=u.useMemo(()=>_t(i,t),[i,t]),[v,D]=u.useState(),P=u.useMemo(()=>{const l=p(o),g=d?p(d):l.add(6,"month"),y=l.add(3,"year");return pe(g.toDate(),y.toDate())},[o,d]),U=u.useCallback(l=>{!n||!s||n(a?g=>{const y=g.length===0?l:St(g[0],l),h=g.length===0?l:Bt(g[0],l);return g.some(I=>I.fom===l||I.tom===l)?[]:[{color:"DARKBLUE",fom:y,tom:h,isSelected:!0,srText:s({fom:y,tom:h})}]}:g=>g.some(y=>y.fom===l)?g.filter(y=>y.fom!==l):[...g,{color:"DARKBLUE",fom:l,tom:l,isSelected:!0,srText:s({fom:l,tom:l})}].sort(xt))},[a,s,n]);return E.jsxs(te,{gap:"space-16",children:[!n&&t.some(l=>l.srText)&&E.jsx("div",{className:"sr-only",children:t.filter(l=>l.srText).map(l=>l.srText).toString()}),E.jsx(J,{gap:"space-12",columns:{sm:1,md:n?1:2},children:i.map(({month:l,year:g},y)=>{const h=N.get(ge(g,l))??[],I=v?.year()===g&&v?.month()===l;return E.jsx(Ee,{isFirstMonth:y===0,year:g,month:l,periods:h,showWeekNumbers:e,dateTooltipCallback:r,dateClickCallback:n?U:void 0,focusedDate:I?v:void 0,setFocusedDate:D},`${g}-${l}`)})}),c<=P&&E.jsx(Ae,{onClick:()=>m(l=>l+3),type:"button",variant:"secondary",size:"small",className:"mt-4 w-full",children:E.jsx(je,{id:"Calendar.LeggTilMåneder"})})]})},Ct=(t,e,r)=>{const n=p(e),s=(r?p(r):p(e).add(6,"month")).add(t,"month"),o=pe(n.toDate(),s.toDate());return Array.from({length:o+1},(d,c)=>{const m=n.add(c,"month");return{month:m.month(),year:m.year()}})},pe=(t,e)=>{let r=(e.getFullYear()-t.getFullYear())*12;return r+=e.getMonth()-t.getMonth(),Math.max(r,0)},ge=(t,e)=>`${t}-${e}`,_t=(t,e)=>{const r=new Map;for(const{year:n,month:a}of t){const s=p().year(n).month(a).startOf("month"),o=s.endOf("month"),d=e.filter(c=>p(c.tom).isSameOrAfter(s,"day")&&p(c.fom).isSameOrBefore(o,"day"));r.set(ge(n,a),d)}return r},St=(t,e)=>p(t.fom).isBefore(p(e))?t.fom:e,Bt=(t,e)=>{const r=p(e);return p(t.tom).isAfter(r)&&p(t.fom).isBefore(r)||p(t.tom).isBefore(r)?e:t.tom},xt=(t,e)=>p(t.fom).diff(p(e.fom));M.__docgenInfo={description:"",methods:[],displayName:"Calendar",props:{periods:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    color: CalendarPeriodColor;
    srText?: string;
    isSelected?: boolean;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"color",value:{name:"union",raw:`| 'NONE'
| 'PINK'
| 'PURPLE'
| 'LIGHTBLUE'
| 'BLUE'
| 'DARKBLUE'
| 'GREEN'
| 'LIGHTGREEN'
| 'GRAY'
| 'BLACK'
| 'BLACKOUTLINE'
| 'LIGHTBLUEGREEN'
| 'LIGHTGREENBLUE'
| 'GREENSTRIPED'
| 'BLUESTRIPED'
| 'GREENOUTLINE'
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}],required:!0}},{key:"srText",value:{name:"string",required:!1}},{key:"isSelected",value:{name:"boolean",required:!1}}]}}],raw:"CalendarPeriod[]"},description:""},showWeekNumbers:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},dateTooltipCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => React.ReactElement | string",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"union",raw:"React.ReactElement | string",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"string"}]}}},description:""},setSelectedPeriods:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: React.SetStateAction<CalendarPeriod[]>) => void",signature:{arguments:[{type:{name:"ReactSetStateAction",raw:"React.SetStateAction<CalendarPeriod[]>",elements:[{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    color: CalendarPeriodColor;
    srText?: string;
    isSelected?: boolean;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"color",value:{name:"union",raw:`| 'NONE'
| 'PINK'
| 'PURPLE'
| 'LIGHTBLUE'
| 'BLUE'
| 'DARKBLUE'
| 'GREEN'
| 'LIGHTGREEN'
| 'GRAY'
| 'BLACK'
| 'BLACKOUTLINE'
| 'LIGHTBLUEGREEN'
| 'LIGHTGREENBLUE'
| 'GREENSTRIPED'
| 'BLUESTRIPED'
| 'GREENOUTLINE'
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}],required:!0}},{key:"srText",value:{name:"string",required:!1}},{key:"isSelected",value:{name:"boolean",required:!1}}]}}],raw:"CalendarPeriod[]"}]},name:"value"}],return:{name:"void"}}},description:""},isRangeSelection:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},getSrTextForSelectedPeriod:{required:!1,tsType:{name:"signature",type:"function",raw:"(period: { fom: string; tom: string }) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{ fom: string; tom: string }",signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}}]}},name:"period"}],return:{name:"string"}}},description:""},firstDateInCalendar:{required:!0,tsType:{name:"string"},description:""},lastDateInCalendar:{required:!1,tsType:{name:"string"},description:""}}};const en={title:"Calendar",component:M,render:t=>E.jsx("div",{style:{maxWidth:"704px"},children:E.jsx(M,{...t})})},C={args:{firstDateInCalendar:"2024-01-31",lastDateInCalendar:"2024-08-30",periods:[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE"},{fom:"2024-02-21",tom:"2024-02-21",color:"PINK"},{fom:"2024-02-22",tom:"2024-05-05",color:"BLUE"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN"}]}},H={args:{...C.args,showWeekNumbers:!1}},K={args:{...C.args,dateTooltipCallback:t=>E.jsxs(te,{gap:"space-4",children:[E.jsx(we,{children:"Dette er en tooltip"}),E.jsx(ke,{children:t})]})}},q={args:C.args,render:()=>{const t=[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN"}],e=(s,o)=>p(s.fom).diff(p(o.fom)),[r,n]=u.useState(t),a=s=>{n(o=>(typeof s=="function"?s(o):s).sort(e))};return E.jsx(M,{periods:r,isRangeSelection:!1,setSelectedPeriods:a,firstDateInCalendar:t[0].fom,lastDateInCalendar:t[1].tom})}},V={args:C.args,render:()=>{const t=[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN"}],e=(s,o)=>p(s.fom).diff(p(o.fom)),[r,n]=u.useState(t),a=s=>{n(o=>(typeof s=="function"?s(o):s).sort(e))};return E.jsx(M,{periods:r,isRangeSelection:!0,setSelectedPeriods:a,firstDateInCalendar:t[0].fom,lastDateInCalendar:t[1].tom})}},Y={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN"}],firstDateInCalendar:"2024-01-31",lastDateInCalendar:"2024-08-30"}},F={args:{periods:[{fom:"2024-02-01",tom:"2024-02-20",color:"BLUE"},{fom:"2025-05-06",tom:"2025-07-30",color:"LIGHTGREEN"}],firstDateInCalendar:"2024-02-01",lastDateInCalendar:"2025-07-30"}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    firstDateInCalendar: '2024-01-31',
    lastDateInCalendar: '2024-08-30',
    periods: [{
      fom: '2024-01-31',
      tom: '2024-02-20',
      color: 'BLUE'
    }, {
      fom: '2024-02-21',
      tom: '2024-02-21',
      color: 'PINK'
    }, {
      fom: '2024-02-22',
      tom: '2024-05-05',
      color: 'BLUE'
    }, {
      fom: '2024-05-06',
      tom: '2024-08-30',
      color: 'LIGHTGREEN'
    }]
  }
}`,...C.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    showWeekNumbers: false
  }
}`,...H.parameters?.docs?.source}}};K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    dateTooltipCallback: (date: string) => <VStack gap="space-4">
                <BodyShort>Dette er en tooltip</BodyShort>
                <Detail>{date}</Detail>
            </VStack>
  }
}`,...K.parameters?.docs?.source}}};q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: Default.args,
  render: () => {
    const allePerioder = [{
      fom: '2024-01-31',
      tom: '2024-02-20',
      color: 'BLUE'
    }, {
      fom: '2024-05-06',
      tom: '2024-08-30',
      color: 'LIGHTGREEN'
    }] satisfies CalendarPeriod[];
    const sortPeriods = (a: CalendarPeriod, b: CalendarPeriod) => dayjs(a.fom).diff(dayjs(b.fom));
    const [perioder, setPerioder] = useState<CalendarPeriod[]>(allePerioder);
    const setSelectedPeriods = (value: React.SetStateAction<CalendarPeriod[]>) => {
      setPerioder(old => {
        const newValue = typeof value === 'function' ? value(old) : value;
        return newValue.sort(sortPeriods);
      });
    };
    return <Calendar periods={perioder} isRangeSelection={false} setSelectedPeriods={setSelectedPeriods} firstDateInCalendar={allePerioder[0]!.fom} lastDateInCalendar={allePerioder[1]!.tom} />;
  }
}`,...q.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: Default.args,
  render: () => {
    const allePerioder = [{
      fom: '2024-01-31',
      tom: '2024-02-20',
      color: 'BLUE'
    }, {
      fom: '2024-05-06',
      tom: '2024-08-30',
      color: 'LIGHTGREEN'
    }] satisfies CalendarPeriod[];
    const sortPeriods = (a: CalendarPeriod, b: CalendarPeriod) => dayjs(a.fom).diff(dayjs(b.fom));
    const [perioder, setPerioder] = useState<CalendarPeriod[]>(allePerioder);
    const setSelectedPeriods = (value: React.SetStateAction<CalendarPeriod[]>) => {
      setPerioder(old => {
        const newValue = typeof value === 'function' ? value(old) : value;
        return newValue.sort(sortPeriods);
      });
    };
    return <Calendar periods={perioder} isRangeSelection setSelectedPeriods={setSelectedPeriods} firstDateInCalendar={allePerioder[0]!.fom} lastDateInCalendar={allePerioder[1]!.tom} />;
  }
}`,...V.parameters?.docs?.source}}};Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
  args: {
    periods: [{
      fom: '2024-01-31',
      tom: '2024-02-20',
      color: 'BLUE'
    }, {
      fom: '2024-05-06',
      tom: '2024-08-30',
      color: 'LIGHTGREEN'
    }],
    firstDateInCalendar: '2024-01-31',
    lastDateInCalendar: '2024-08-30'
  }
}`,...Y.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    periods: [{
      fom: '2024-02-01',
      tom: '2024-02-20',
      color: 'BLUE'
    }, {
      fom: '2025-05-06',
      tom: '2025-07-30',
      color: 'LIGHTGREEN'
    }],
    firstDateInCalendar: '2024-02-01',
    lastDateInCalendar: '2025-07-30'
  }
}`,...F.parameters?.docs?.source}}};const tn=["Default","IkkeVisUkenr","MedTooltip","VisKalenderMedValgAvEnkeltdager","VisKalenderMedValgAvPerioder","PeriodsWithGap","PeriodsThatSpanOverAYear"];export{C as Default,H as IkkeVisUkenr,K as MedTooltip,F as PeriodsThatSpanOverAYear,Y as PeriodsWithGap,q as VisKalenderMedValgAvEnkeltdager,V as VisKalenderMedValgAvPerioder,tn as __namedExportsOrder,en as default};
