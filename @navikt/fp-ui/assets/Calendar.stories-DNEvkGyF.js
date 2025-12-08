import{r as m,R as I,a as re,S as me,b as ae,c as fe,d as E,j as f}from"./iframe-18mGUU4W.js";import{f as Ee,i as oe,a as pe}from"./UttaksdagenString-NqIgMotC.js";import{I as ye}from"./dates-T-uO3bW4.js";import{R as ge,o as ve,u as Le,a as he,b as De,c as Re,f as Te,s as Ne,d as Ie,e as Oe}from"./Date.Input-PtjaOR1n.js";import{c as $}from"./composeEventHandlers-krbYd5LM.js";import"./useId-BOjODd33.js";import{u as X}from"./ChevronDown-irBp6krh.js";import{u as Pe,a as ee}from"./useClientLayoutEffect-b9JIIYpu.js";import{B as be}from"./Box-Cd-y28e8.js";import{V as J}from"./VStack-BJTcXSSd.js";import{H as Ue,B as Ge,D as we}from"./Label-CQ0yRTdZ.js";import{H as F}from"./HGrid-m_zCVICB.js";import"./preload-helper-PPVm8Dsz.js";import"./index-Biqgspli.js";import"./Provider-GXIfWzau.js";import"./useId-DEFicLok.js";import"./Calendar-D575GwZu.js";import"./BasePrimitive-jWcdMXpC.js";function Be(e,n){const a=[],t=new Set,r=new Map;n.forEach((i,l)=>{i.forEach(u=>{u!==l&&r.set(u,l)})});const o=i=>{if(t.has(i))return;const l=r.get(i);if(l&&!t.has(l)&&(o(l),t.has(i)))return;t.add(i),a.push(i);const u=n.get(i);u&&u.forEach(o)};return e.forEach(o),a}function Ce(e,n=globalThis?.document,a=!0){const t=X(e);m.useEffect(()=>{if(!a)return;const r=o=>{o.key==="Escape"&&t(o)};return n.addEventListener("keydown",r,!0),()=>{n.removeEventListener("keydown",r,!0)}},[t,n,a])}const se={FOCUS_OUTSIDE:"AKSEL_FOCUS_OUTSIDE",POINTER_DOWN_OUTSIDE:"AKSEL_POINTER_DOWN_OUTSIDE"};function ie(e,n,a,{discrete:t}={discrete:!1}){if(!n)return;const r=a.originalEvent.target,o=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:a});r.addEventListener(e,n,{once:!0}),t&&r?ge.flushSync(()=>r.dispatchEvent(o)):r.dispatchEvent(o)}function Se(e,n=globalThis?.document,a=!0){const t=X(e),r=m.useRef(!1);return m.useEffect(()=>{if(!a)return;const o=i=>{if(i.target&&!r.current){const l={originalEvent:i};ie(se.FOCUS_OUTSIDE,t,l)}};return n.addEventListener("focusin",o),()=>{n.removeEventListener("focusin",o)}},[n,t,a]),{onFocusCapture:()=>{r.current=!0},onBlurCapture:()=>{r.current=!1}}}function _e(e,n=globalThis?.document,a=!0){const t=X(e),r=m.useRef(!1),o=m.useRef(()=>{}),i=Pe();return m.useEffect(()=>{if(!a)return;const l=u=>{function p(){ie(se.POINTER_DOWN_OUTSIDE,t,{originalEvent:u},{discrete:!0})}u.target&&!r.current?u.pointerType==="touch"?(n.removeEventListener("click",o.current),o.current=p,n.addEventListener("click",o.current,{once:!0})):p():n.removeEventListener("click",o.current),r.current=!1};return i.start(0,()=>{n.addEventListener("pointerdown",l)}),()=>{n.removeEventListener("pointerdown",l),n.removeEventListener("click",o.current)}},[n,t,i,a]),{onPointerDownCapture:()=>{r.current=!0}}}var ke=function(e,n){var a={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.indexOf(t)<0&&(a[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)n.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(a[t[r]]=e[t[r]]);return a};const te=I.createContext(null),z="dismissableLayer.update";let ne;const Ae=I.createContext({layers:new Set,branchedLayers:new Map,layersWithOutsidePointerEventsDisabled:new Set}),xe=m.forwardRef((e,n)=>{var{children:a,disableOutsidePointerEvents:t,onDismiss:r,onInteractOutside:o,onEscapeKeyDown:i,onFocusOutside:l,onPointerDownOutside:u,safeZone:p,asChild:v,enabled:h=!0}=e,L=ke(e,["children","disableOutsidePointerEvents","onDismiss","onInteractOutside","onEscapeKeyDown","onFocusOutside","onPointerDownOutside","safeZone","asChild","enabled"]);const s=m.useContext(Ae),[,y]=m.useState({}),[d,N]=I.useState(null),O=re(n,N),T=ve(d),D=Be(s.layers,s.branchedLayers),S=je(D,s.layersWithOutsidePointerEventsDisabled),R=d?D.indexOf(d):-1,U=s.layersWithOutsidePointerEventsDisabled.size>0,w=S===-1||R>=S;function B(c){if(!p?.anchor)return;let V=!1;c.defaultPrevented||c.detail.originalEvent.type==="pointerdown"&&(V=!0);const Q=c.target;(p.anchor.contains(Q)||Q===p.anchor)&&c.preventDefault(),c.detail.originalEvent.type==="focusin"&&V&&c.preventDefault()}const b=_e(c=>{w&&(u?.(c),o?.(c),p&&B(c),!c.defaultPrevented&&r&&r())},T,h),C=Se(c=>{l?.(c),o?.(c),p&&B(c),!c.defaultPrevented&&r&&r()},T,h);Ce(c=>{R===s.layers.size-1&&(i?.(c),!c.defaultPrevented&&r&&(c.preventDefault(),r()))},T,h),m.useEffect(()=>{if(!(!d||!h))return t&&(s.layersWithOutsidePointerEventsDisabled.size===0&&(ne=T.body.style.pointerEvents,T.body.style.pointerEvents="none"),s.layersWithOutsidePointerEventsDisabled.add(d)),s.layers.add(d),A(),()=>{t&&s.layersWithOutsidePointerEventsDisabled.size===1&&(T.body.style.pointerEvents=ne)}},[d,h,t,s,T]),m.useEffect(()=>()=>{d&&(s.layers.has(d)||s.layersWithOutsidePointerEventsDisabled.has(d))&&(s.layers.delete(d),s.layersWithOutsidePointerEventsDisabled.delete(d),A())},[d,s,h]);const P=m.useContext(te);m.useEffect(()=>{if(!d||!h||!P||d===P)return;s.branchedLayers.has(P)||s.branchedLayers.set(P,new Set);const c=s.branchedLayers.get(P);return c.add(d),A(),()=>{c.delete(d),c.size===0&&s.branchedLayers.delete(P),A()}},[d,h,P,s]),m.useEffect(()=>{const c=()=>y({});return document.addEventListener(z,c),()=>document.removeEventListener(z,c)},[]);const _=v?me:"div";return I.createElement(te.Provider,{value:d},I.createElement(_,Object.assign({},L,{ref:O,style:Object.assign({pointerEvents:U?w?"auto":"none":void 0},L.style),onFocusCapture:$(L.onFocusCapture,C.onFocusCapture),onBlurCapture:$(L.onBlurCapture,C.onBlurCapture),onPointerDownCapture:$(L.onPointerDownCapture,b.onPointerDownCapture)}),a))});function A(){const e=new CustomEvent(z);document.dispatchEvent(e)}function je(e,n){for(let a=e.length-1;a>=0;a-=1)if(n.has(e[a]))return a;return-1}var He=function(e,n){var a={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.indexOf(t)<0&&(a[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)n.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(a[t[r]]=e[t[r]]);return a};const Ke=m.forwardRef((e,n)=>{var{className:a}=e,t=He(e,["className"]);const{cn:r}=ae();return I.createElement("div",Object.assign({},t,{ref:n,className:r("navds-popover__content",a)}))});var Me=function(e,n){var a={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.indexOf(t)<0&&(a[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)n.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(a[t[r]]=e[t[r]]);return a};const Z=m.forwardRef((e,n)=>{var{className:a,children:t,anchorEl:r,arrow:o=!0,open:i,onClose:l,placement:u="top",offset:p,strategy:v,flip:h=!0}=e,L=Me(e,["className","children","anchorEl","arrow","open","onClose","placement","offset","strategy","flip"]);const{cn:s}=ae(),y=m.useRef(null),d=Le(!1)!==void 0,N=he(!1),O=v??(d?"fixed":"absolute"),T=N?!1:h,D=fe(!1),{update:S,refs:R,placement:U,middlewareData:{arrow:{x:w,y:B}={}},floatingStyles:b}=De({strategy:O,placement:u,open:i,middleware:[Re(p??(D?.isDarkside?8:o?16:4)),T&&Te({padding:5,fallbackPlacements:["bottom","top"]}),Ne({padding:12}),Ie({element:y,padding:8})]});ee(()=>{R.setReference(r)},[r,R]);const C=re(R.setFloating,n);ee(()=>{if(!R.reference.current||!R.floating.current||!i)return;const _=Oe(R.reference.current,R.floating.current,S);return()=>_()},[R.floating,R.reference,S,i,r]);const P={top:"bottom",right:"left",bottom:"top",left:"right"}[U.split("-")[0]];return I.createElement(xe,{asChild:!0,safeZone:{anchor:r},onDismiss:()=>i&&l?.(),enabled:i},I.createElement("div",Object.assign({ref:C},L,{className:s("navds-popover",a,{"navds-popover--hidden":!i||!r}),style:Object.assign(Object.assign({},L.style),b),"data-placement":U,"aria-hidden":!i||!r}),t,o&&!D?.isDarkside&&I.createElement("div",{ref:_=>{y.current=_},style:Object.assign(Object.assign(Object.assign({},w!=null?{left:w}:{}),B!=null?{top:B}:{}),P?{[P]:"-0.5rem"}:{}),className:s("navds-popover__arrow")})))});Z.Content=Ke;const qe=e=>e.charAt(0).toUpperCase()+e.slice(1),We="_days_f0mw9_1",Ve="_cursorAndHoover_f0mw9_30",$e="_srOnly_f0mw9_38",Ye="_blueDay_f0mw9_50",Fe="_darkblueDay_f0mw9_55",ze="_lightblueDay_f0mw9_61",Ze="_lightgreenDay_f0mw9_80",Xe="_greenDay_f0mw9_99",Je="_greenStripedDay_f0mw9_104",Qe="_blueStripedDay_f0mw9_138",et="_grayDay_f0mw9_172",tt="_blackDay_f0mw9_178",nt="_blackOutlineDay_f0mw9_184",rt="_blueOutlineDay_f0mw9_189",at="_greenOutlineDay_f0mw9_207",ot="_lightgreenBlueDay_f0mw9_225",st="_lightblueGreenDay_f0mw9_251",it="_none_f0mw9_276",lt="_pinkDay_f0mw9_281",dt="_purpleDay_f0mw9_287",g={days:We,cursorAndHoover:Ve,srOnly:$e,blueDay:Ye,darkblueDay:Fe,lightblueDay:ze,lightgreenDay:Ze,greenDay:Xe,greenStripedDay:Je,blueStripedDay:Qe,grayDay:et,blackDay:tt,blackOutlineDay:nt,blueOutlineDay:rt,greenOutlineDay:at,lightgreenBlueDay:ot,lightblueGreenDay:st,none:it,pinkDay:lt,purpleDay:dt};var ut={};const ct={NONE:g.none,BLUE:g.blueDay,DARKBLUE:g.darkblueDay,LIGHTGREEN:g.lightgreenDay,GRAY:g.grayDay,PINK:g.pinkDay,PURPLE:g.purpleDay,BLACK:g.blackDay,BLACKOUTLINE:g.blackOutlineDay,BLUEOUTLINE:g.blueOutlineDay,GREENOUTLINE:g.greenOutlineDay,LIGHTBLUE:g.lightblueDay,GREEN:g.greenDay,LIGHTBLUEGREEN:g.lightblueGreenDay,LIGHTGREENBLUE:g.lightgreenBlueDay,GREENSTRIPED:g.greenStripedDay,BLUESTRIPED:g.blueStripedDay},le=I.memo(({isoDate:e,periodeColor:n,isFocused:a,srText:t,dateTooltipCallback:r,dateClickCallback:o,setFocusedDate:i})=>{const l=E(e),u=l.date();de(`Rendering Day: ${u}, Color: ${n}`);const p=m.useRef(null),[v,h]=m.useState(!1);m.useEffect(()=>{a&&p.current?.focus()},[a]);const L=!!o&&!W(l);return f.jsxs("button",{ref:p,type:"button","data-testid":`day:${u};dayColor:${n}`,tabIndex:a?0:-1,className:`${g.days} ${ct[n]} ${L&&g.cursorAndHoover}`,onFocus:L?()=>i(l):void 0,onMouseOver:r?()=>h(!0):void 0,onMouseLeave:r?()=>h(!1):void 0,onClick:L?()=>o(e):void 0,onKeyDown:o?s=>ft(s,l,o,i):void 0,children:[u,t&&f.jsx("span",{className:g.srOnly,children:t}),r&&mt(n)&&f.jsx(Z,{open:v,onClose:()=>h(!1),anchorEl:p.current,children:f.jsx(Z.Content,{children:r(e)})})]})}),mt=e=>e!=="NONE"&&e!=="GRAY",W=e=>e.isoWeekday()===6||e.isoWeekday()===7,de=e=>{const n=typeof process<"u"&&ut.VITEST==="true";globalThis.location.hostname==="localhost"&&!n&&console.log(e)},ft=(e,n,a,t)=>{if(e.key==="Tab")return;e.preventDefault();const r=!!a&&!W(n);switch(e.key){case"ArrowLeft":t(n.subtract(1,"day"));break;case"ArrowRight":t(n.add(1,"day"));break;case"ArrowUp":t(n.subtract(7,"day"));break;case"ArrowDown":t(n.add(7,"day"));break;case"Enter":case" ":r&&a(n.format(ye))}};le.__docgenInfo={description:"",methods:[],displayName:"Day",props:{isoDate:{required:!0,tsType:{name:"string"},description:""},periodeColor:{required:!0,tsType:{name:"union",raw:`| 'NONE'
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
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}]},description:""},isFocused:{required:!0,tsType:{name:"boolean"},description:""},srText:{required:!1,tsType:{name:"string"},description:""},dateTooltipCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => React.ReactNode | string",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"union",raw:"React.ReactNode | string",elements:[{name:"ReactReactNode",raw:"React.ReactNode"},{name:"string"}]}}},description:""},dateClickCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => void",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"void"}}},description:""},setFocusedDate:{required:!0,tsType:{name:"signature",type:"function",raw:"(date: Dayjs) => void",signature:{arguments:[{type:{name:"Dayjs"},name:"date"}],return:{name:"void"}}},description:""}}};const Et="_weeknr_6j43u_1",pt="_weekday_6j43u_12",Y={weeknr:Et,weekday:pt};E.extend(oe);const ue=I.memo(({year:e,month:n,isFirstMonth:a,showWeekNumbers:t,periods:r,focusedDate:o,dateTooltipCallback:i,dateClickCallback:l,setFocusedDate:u})=>{de(`Rendering Month: ${n}-${e}`);const p=m.useMemo(()=>gt(r),[r]),v=E().year(e).month(n).startOf("month"),h=v.daysInMonth(),L=v.isoWeekday(),s=v.endOf("month").isoWeekday(),y=v.isoWeek(),d=Math.ceil((h+(L-1)+(7-s))/7),N=t?8:7,O=Array.from({length:7},(T,D)=>v.isoWeekday(D+1).format("dd"));return f.jsx(be.New,{borderWidth:"1",maxWidth:"400px",padding:"3",borderRadius:"4",borderColor:"neutral-subtle","data-testid":`year:${e};month:${n}`,children:f.jsxs(J,{gap:"space-12",children:[f.jsx(Ue,{size:"small",level:"4",align:"center",children:`${qe(v.format("MMMM"))} ${e}`}),f.jsxs("div",{children:[f.jsxs(F,{columns:N,children:[t&&f.jsx("div",{className:Y.weeknr}),O.map(T=>f.jsx("div",{className:Y.weekday,children:T},T))]}),Array.from({length:d}).map((T,D)=>f.jsxs(F,{columns:N,children:[t&&f.jsx("div",{className:Y.weeknr,children:y+D},`weeknr-${D}`),Array.from({length:7}).map((S,R)=>{const U=D*7+R,w=D===0&&R<L-1,B=D===d-1&&R>=s;if(w||B)return f.jsx("div",{},`empty-${U}`);const b=v.add(U-(L-1),"day"),C=p.get(b.format("YYYY-MM-DD"));return f.jsx(le,{isoDate:Ee(b),periodeColor:yt(b,C),srText:C?.srText,dateTooltipCallback:i,dateClickCallback:l,isFocused:o?.isSame(b,"day")??(a&&U===L-1)??!1,setFocusedDate:u},`${e}-${n}-${b.date()}`)})]},`week-${D}`))]})]})})},(e,n)=>{const a=Object.keys(e);for(const t of a)if(t!=="periods"&&e[t]!==n[t])return!1;if(e.periods.length!==n.periods.length)return!1;for(let t=0;t<e.periods.length;t++){const r=e.periods[t],o=n.periods[t],i=Object.keys(r);for(const l of i)if(r[l]!==o[l])return!1}return!0}),yt=(e,n)=>n?n.color==="PINK"?"PINK":n.color==="PURPLE"?"PURPLE":W(e)?"GRAY":n.color:W(e)?"GRAY":"NONE",gt=e=>{const n=new Map;for(const a of e){let t=E(a.fom);const r=E(a.tom);for(;!t.isAfter(r,"day");){const o=t.format("YYYY-MM-DD");(!n.has(o)||a.isSelected)&&n.set(o,a),t=t.add(1,"day")}}return n};ue.__docgenInfo={description:"",methods:[],displayName:"Month",props:{year:{required:!0,tsType:{name:"number"},description:""},month:{required:!0,tsType:{name:"number"},description:""},isFirstMonth:{required:!0,tsType:{name:"boolean"},description:""},showWeekNumbers:{required:!0,tsType:{name:"boolean"},description:""},periods:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}],required:!0}},{key:"srText",value:{name:"string",required:!1}},{key:"isSelected",value:{name:"boolean",required:!1}}]}}],raw:"CalendarPeriod[]"},description:""},focusedDate:{required:!0,tsType:{name:"union",raw:"Dayjs | undefined",elements:[{name:"Dayjs"},{name:"undefined"}]},description:""},dateTooltipCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => React.ReactElement | string",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"union",raw:"React.ReactElement | string",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"string"}]}}},description:""},dateClickCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => void",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"void"}}},description:""},setFocusedDate:{required:!0,tsType:{name:"signature",type:"function",raw:"(date: Dayjs) => void",signature:{arguments:[{type:{name:"Dayjs"},name:"date"}],return:{name:"void"}}},description:""}}};E.extend(oe);E.extend(pe);const k=({periods:e,showWeekNumbers:n=!0,dateTooltipCallback:a,setSelectedPeriods:t,isRangeSelection:r=!1,getSrTextForSelectedPeriod:o,firstDateInCalendar:i,lastDateInCalendar:l})=>{const u=m.useMemo(()=>vt(i,l),[e,i,l]),p=m.useMemo(()=>ht(u,e),[u,e]),[v,h]=m.useState(),L=m.useCallback(s=>{!t||!o||t(r?y=>{const d=y.length===0?s:Dt(y[0],s),N=y.length===0?s:Rt(y[0],s);return y.some(O=>O.fom===s||O.tom===s)?[]:[{color:"DARKBLUE",fom:d,tom:N,isSelected:!0,srText:o({fom:d,tom:N})}]}:y=>y.some(d=>d.fom===s)?y.filter(d=>d.fom!==s):[...y,{color:"DARKBLUE",fom:s,tom:s,isSelected:!0,srText:o({fom:s,tom:s})}].sort(Tt))},[r,o,t]);return f.jsxs(J,{gap:"space-16",children:[!t&&e.some(s=>s.srText)&&f.jsx("div",{className:"sr-only",children:e.filter(s=>s.srText).map(s=>s.srText).toString()}),f.jsx(F,{gap:"space-12",columns:{sm:1,md:t?1:2},children:u.map(({month:s,year:y},d)=>{const N=p.get(ce(y,s))??[],O=v?.year()===y&&v?.month()===s;return f.jsx(ue,{isFirstMonth:d===0,year:y,month:s,periods:N,showWeekNumbers:n,dateTooltipCallback:a,dateClickCallback:t?L:void 0,focusedDate:O?v:void 0,setFocusedDate:h},`${y}-${s}`)})})]})},vt=(e,n)=>{const a=E(e),t=n?E(n):E(e).add(6,"month"),r=Lt(a.toDate(),t.toDate());return Array.from({length:r+1},(o,i)=>{const l=a.add(i,"month");return{month:l.month(),year:l.year()}})},Lt=(e,n)=>{let a=(n.getFullYear()-e.getFullYear())*12;return a+=n.getMonth()-e.getMonth(),Math.max(a,0)},ce=(e,n)=>`${e}-${n}`,ht=(e,n)=>{const a=new Map;for(const{year:t,month:r}of e){const o=E().year(t).month(r).startOf("month"),i=o.endOf("month"),l=n.filter(u=>E(u.tom).isSameOrAfter(o,"day")&&E(u.fom).isSameOrBefore(i,"day"));a.set(ce(t,r),l)}return a},Dt=(e,n)=>E(e.fom).isBefore(E(n))?e.fom:n,Rt=(e,n)=>{const a=E(n);return E(e.tom).isAfter(a)&&E(e.fom).isBefore(a)||E(e.tom).isBefore(a)?n:e.tom},Tt=(e,n)=>E(e.fom).diff(E(n.fom));k.__docgenInfo={description:"",methods:[],displayName:"Calendar",props:{periods:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}],required:!0}},{key:"srText",value:{name:"string",required:!1}},{key:"isSelected",value:{name:"boolean",required:!1}}]}}],raw:"CalendarPeriod[]"}]},name:"value"}],return:{name:"void"}}},description:""},isRangeSelection:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},getSrTextForSelectedPeriod:{required:!1,tsType:{name:"signature",type:"function",raw:"(period: { fom: string; tom: string }) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{ fom: string; tom: string }",signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}}]}},name:"period"}],return:{name:"string"}}},description:""},firstDateInCalendar:{required:!0,tsType:{name:"string"},description:""},lastDateInCalendar:{required:!1,tsType:{name:"string"},description:""}}};const qt={title:"Calendar",component:k,render:e=>f.jsx("div",{style:{maxWidth:"704px"},children:f.jsx(k,{...e})})},G={args:{firstDateInCalendar:"2024-01-31",lastDateInCalendar:"2024-08-30",periods:[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE"},{fom:"2024-02-21",tom:"2024-02-21",color:"PINK"},{fom:"2024-02-22",tom:"2024-05-05",color:"BLUE"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN"}]}},x={args:{...G.args,showWeekNumbers:!1}},j={args:{...G.args,dateTooltipCallback:e=>f.jsxs(J,{gap:"space-4",children:[f.jsx(Ge,{children:"Dette er en tooltip"}),f.jsx(we,{children:e})]})}},H={args:G.args,render:()=>{const e=[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN"}],n=(o,i)=>E(o.fom).diff(E(i.fom)),[a,t]=m.useState(e),r=o=>{t(i=>(typeof o=="function"?o(i):o).sort(n))};return f.jsx(k,{periods:a,isRangeSelection:!1,setSelectedPeriods:r,firstDateInCalendar:e[0].fom,lastDateInCalendar:e[1].tom})}},K={args:G.args,render:()=>{const e=[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN"}],n=(o,i)=>E(o.fom).diff(E(i.fom)),[a,t]=m.useState(e),r=o=>{t(i=>(typeof o=="function"?o(i):o).sort(n))};return f.jsx(k,{periods:a,isRangeSelection:!0,setSelectedPeriods:r,firstDateInCalendar:e[0].fom,lastDateInCalendar:e[1].tom})}},M={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN"}],firstDateInCalendar:"2024-01-31",lastDateInCalendar:"2024-08-30"}},q={args:{periods:[{fom:"2024-02-01",tom:"2024-02-20",color:"BLUE"},{fom:"2025-05-06",tom:"2025-07-30",color:"LIGHTGREEN"}],firstDateInCalendar:"2024-02-01",lastDateInCalendar:"2025-07-30"}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
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
}`,...G.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    showWeekNumbers: false
  }
}`,...x.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    dateTooltipCallback: (date: string) => <VStack gap="space-4">
                <BodyShort>Dette er en tooltip</BodyShort>
                <Detail>{date}</Detail>
            </VStack>
  }
}`,...j.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
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
}`,...H.parameters?.docs?.source}}};K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
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
}`,...K.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
}`,...M.parameters?.docs?.source}}};q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
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
}`,...q.parameters?.docs?.source}}};const Wt=["Default","IkkeVisUkenr","MedTooltip","VisKalenderMedValgAvEnkeltdager","VisKalenderMedValgAvPerioder","PeriodsWithGap","PeriodsThatSpanOverAYear"];export{G as Default,x as IkkeVisUkenr,j as MedTooltip,q as PeriodsThatSpanOverAYear,M as PeriodsWithGap,H as VisKalenderMedValgAvEnkeltdager,K as VisKalenderMedValgAvPerioder,Wt as __namedExportsOrder,qt as default};
