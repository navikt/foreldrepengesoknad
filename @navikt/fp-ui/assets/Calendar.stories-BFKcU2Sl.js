import{r as m,R as N,a as oe,S as pe,b as se,c as ye,d as f,j as p}from"./iframe-BLRlZYK5.js";import{f as ge,a as ve,i as ie,b as Le}from"./UttaksdagenString-zEkM5-gs.js";import{I as Te}from"./dates-T5mldXbt.js";import{R as he,o as De,u as Re,a as Ie,b as Ne,c as Oe,f as be,s as Pe,d as Ue,e as Ge}from"./Date.Input-BGHLOSOJ.js";import{c as z}from"./composeEventHandlers-krbYd5LM.js";import"./useId-CJKwBrOG.js";import{u as ee}from"./ChevronDown-BgXVKIwh.js";import{u as Ce,a as ne}from"./useClientLayoutEffect-BQy4F_xf.js";import{B as we}from"./Box-6ygVWgjo.js";import{V as le}from"./VStack-BvKGhQHv.js";import{H as Be,B as Se,D as _e}from"./Label-QQTFPF0j.js";import{H as X}from"./HGrid-BCPb9hNe.js";import"./preload-helper-PPVm8Dsz.js";import"./index-DJfzcHJA.js";import"./Provider-W-U5_YH-.js";import"./useId-hJWgPQIe.js";import"./Calendar-H3leUZ6e.js";import"./BasePrimitive-DArzAK1w.js";function ke(e,n){const a=[],t=new Set,r=new Map;n.forEach((s,i)=>{s.forEach(u=>{u!==i&&r.set(u,i)})});const o=s=>{if(t.has(s))return;const i=r.get(s);if(i&&!t.has(i)&&(o(i),t.has(s)))return;t.add(s),a.push(s);const u=n.get(s);u&&u.forEach(o)};return e.forEach(o),a}function xe(e,n=globalThis?.document,a=!0){const t=ee(e);m.useEffect(()=>{if(!a)return;const r=o=>{o.key==="Escape"&&t(o)};return n.addEventListener("keydown",r,!0),()=>{n.removeEventListener("keydown",r,!0)}},[t,n,a])}const de={FOCUS_OUTSIDE:"AKSEL_FOCUS_OUTSIDE",POINTER_DOWN_OUTSIDE:"AKSEL_POINTER_DOWN_OUTSIDE"};function ue(e,n,a,{discrete:t}={discrete:!1}){if(!n)return;const r=a.originalEvent.target,o=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:a});r.addEventListener(e,n,{once:!0}),t&&r?he.flushSync(()=>r.dispatchEvent(o)):r.dispatchEvent(o)}function Ae(e,n=globalThis?.document,a=!0){const t=ee(e),r=m.useRef(!1);return m.useEffect(()=>{if(!a)return;const o=s=>{if(s.target&&!r.current){const i={originalEvent:s};ue(de.FOCUS_OUTSIDE,t,i)}};return n.addEventListener("focusin",o),()=>{n.removeEventListener("focusin",o)}},[n,t,a]),{onFocusCapture:()=>{r.current=!0},onBlurCapture:()=>{r.current=!1}}}function Me(e,n=globalThis?.document,a=!0){const t=ee(e),r=m.useRef(!1),o=m.useRef(()=>{}),s=Ce();return m.useEffect(()=>{if(!a)return;const i=u=>{function E(){ue(de.POINTER_DOWN_OUTSIDE,t,{originalEvent:u},{discrete:!0})}u.target&&!r.current?u.pointerType==="touch"?(n.removeEventListener("click",o.current),o.current=E,n.addEventListener("click",o.current,{once:!0})):E():n.removeEventListener("click",o.current),r.current=!1};return s.start(0,()=>{n.addEventListener("pointerdown",i)}),()=>{n.removeEventListener("pointerdown",i),n.removeEventListener("click",o.current)}},[n,t,s,a]),{onPointerDownCapture:()=>{r.current=!0}}}var je=function(e,n){var a={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.indexOf(t)<0&&(a[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)n.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(a[t[r]]=e[t[r]]);return a};const re=N.createContext(null),J="dismissableLayer.update";let ae;const Ke=N.createContext({layers:new Set,branchedLayers:new Map,layersWithOutsidePointerEventsDisabled:new Set}),He=m.forwardRef((e,n)=>{var{children:a,disableOutsidePointerEvents:t,onDismiss:r,onInteractOutside:o,onEscapeKeyDown:s,onFocusOutside:i,onPointerDownOutside:u,safeZone:E,asChild:T,enabled:y=!0}=e,g=je(e,["children","disableOutsidePointerEvents","onDismiss","onInteractOutside","onEscapeKeyDown","onFocusOutside","onPointerDownOutside","safeZone","asChild","enabled"]);const l=m.useContext(Ke),[,R]=m.useState({}),[d,P]=N.useState(null),G=oe(n,P),h=De(d),L=ke(l.layers,l.branchedLayers),S=qe(L,l.layersWithOutsidePointerEventsDisabled),D=d?L.indexOf(d):-1,U=l.layersWithOutsidePointerEventsDisabled.size>0,C=S===-1||D>=S;function w(c){if(!E?.anchor)return;let Y=!1;c.defaultPrevented||c.detail.originalEvent.type==="pointerdown"&&(Y=!0);const te=c.target;(E.anchor.contains(te)||te===E.anchor)&&c.preventDefault(),c.detail.originalEvent.type==="focusin"&&Y&&c.preventDefault()}const b=Me(c=>{C&&(u?.(c),o?.(c),E&&w(c),!c.defaultPrevented&&r&&r())},h,y),B=Ae(c=>{i?.(c),o?.(c),E&&w(c),!c.defaultPrevented&&r&&r()},h,y);xe(c=>{D===l.layers.size-1&&(s?.(c),!c.defaultPrevented&&r&&(c.preventDefault(),r()))},h,y),m.useEffect(()=>{if(!(!d||!y))return t&&(l.layersWithOutsidePointerEventsDisabled.size===0&&(ae=h.body.style.pointerEvents,h.body.style.pointerEvents="none"),l.layersWithOutsidePointerEventsDisabled.add(d)),l.layers.add(d),x(),()=>{t&&l.layersWithOutsidePointerEventsDisabled.size===1&&(h.body.style.pointerEvents=ae)}},[d,y,t,l,h]),m.useEffect(()=>()=>{d&&(l.layers.has(d)||l.layersWithOutsidePointerEventsDisabled.has(d))&&(l.layers.delete(d),l.layersWithOutsidePointerEventsDisabled.delete(d),x())},[d,l,y]);const O=m.useContext(re);m.useEffect(()=>{if(!d||!y||!O||d===O)return;l.branchedLayers.has(O)||l.branchedLayers.set(O,new Set);const c=l.branchedLayers.get(O);return c.add(d),x(),()=>{c.delete(d),c.size===0&&l.branchedLayers.delete(O),x()}},[d,y,O,l]),m.useEffect(()=>{const c=()=>R({});return document.addEventListener(J,c),()=>document.removeEventListener(J,c)},[]);const _=T?pe:"div";return N.createElement(re.Provider,{value:d},N.createElement(_,Object.assign({},g,{ref:G,style:Object.assign({pointerEvents:U?C?"auto":"none":void 0},g.style),onFocusCapture:z(g.onFocusCapture,B.onFocusCapture),onBlurCapture:z(g.onBlurCapture,B.onBlurCapture),onPointerDownCapture:z(g.onPointerDownCapture,b.onPointerDownCapture)}),a))});function x(){const e=new CustomEvent(J);document.dispatchEvent(e)}function qe(e,n){for(let a=e.length-1;a>=0;a-=1)if(n.has(e[a]))return a;return-1}var Fe=function(e,n){var a={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.indexOf(t)<0&&(a[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)n.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(a[t[r]]=e[t[r]]);return a};const We=m.forwardRef((e,n)=>{var{className:a}=e,t=Fe(e,["className"]);const{cn:r}=se();return N.createElement("div",Object.assign({},t,{ref:n,className:r("navds-popover__content",a)}))});var Ve=function(e,n){var a={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.indexOf(t)<0&&(a[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)n.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(a[t[r]]=e[t[r]]);return a};const Q=m.forwardRef((e,n)=>{var{className:a,children:t,anchorEl:r,arrow:o=!0,open:s,onClose:i,placement:u="top",offset:E,strategy:T,flip:y=!0}=e,g=Ve(e,["className","children","anchorEl","arrow","open","onClose","placement","offset","strategy","flip"]);const{cn:l}=se(),R=m.useRef(null),d=Re(!1)!==void 0,P=Ie(!1),G=T??(d?"fixed":"absolute"),h=P?!1:y,L=ye(!1),{update:S,refs:D,placement:U,middlewareData:{arrow:{x:C,y:w}={}},floatingStyles:b}=Ne({strategy:G,placement:u,open:s,middleware:[Oe(E??(L?.isDarkside?8:o?16:4)),h&&be({padding:5,fallbackPlacements:["bottom","top"]}),Pe({padding:12}),Ue({element:R,padding:8})]});ne(()=>{D.setReference(r)},[r,D]);const B=oe(D.setFloating,n);ne(()=>{if(!D.reference.current||!D.floating.current||!s)return;const _=Ge(D.reference.current,D.floating.current,S);return()=>_()},[D.floating,D.reference,S,s,r]);const O={top:"bottom",right:"left",bottom:"top",left:"right"}[U.split("-")[0]];return N.createElement(He,{asChild:!0,safeZone:{anchor:r},onDismiss:()=>s&&i?.(),enabled:s},N.createElement("div",Object.assign({ref:B},g,{className:l("navds-popover",a,{"navds-popover--hidden":!s||!r}),style:Object.assign(Object.assign({},g.style),b),"data-placement":U,"aria-hidden":!s||!r}),t,o&&!L?.isDarkside&&N.createElement("div",{ref:_=>{R.current=_},style:Object.assign(Object.assign(Object.assign({},C!=null?{left:C}:{}),w!=null?{top:w}:{}),O?{[O]:"-0.5rem"}:{}),className:l("navds-popover__arrow")})))});Q.Content=We;const $e=e=>e.charAt(0).toUpperCase()+e.slice(1),Ye="_days_f0mw9_1",ze="_cursorAndHoover_f0mw9_30",Ze="_blueDay_f0mw9_50",Xe="_darkblueDay_f0mw9_55",Je="_lightblueDay_f0mw9_61",Qe="_lightgreenDay_f0mw9_80",et="_greenDay_f0mw9_99",tt="_greenStripedDay_f0mw9_104",nt="_blueStripedDay_f0mw9_138",rt="_grayDay_f0mw9_172",at="_blackDay_f0mw9_178",ot="_blackOutlineDay_f0mw9_184",st="_blueOutlineDay_f0mw9_189",it="_greenOutlineDay_f0mw9_207",lt="_lightgreenBlueDay_f0mw9_225",dt="_lightblueGreenDay_f0mw9_251",ut="_none_f0mw9_276",ct="_pinkDay_f0mw9_281",mt="_purpleDay_f0mw9_287",v={days:Ye,cursorAndHoover:ze,blueDay:Ze,darkblueDay:Xe,lightblueDay:Je,lightgreenDay:Qe,greenDay:et,greenStripedDay:tt,blueStripedDay:nt,grayDay:rt,blackDay:at,blackOutlineDay:ot,blueOutlineDay:st,greenOutlineDay:it,lightgreenBlueDay:lt,lightblueGreenDay:dt,none:ut,pinkDay:ct,purpleDay:mt};var ft={};const Et={NONE:v.none,BLUE:v.blueDay,DARKBLUE:v.darkblueDay,LIGHTGREEN:v.lightgreenDay,GRAY:v.grayDay,PINK:v.pinkDay,PURPLE:v.purpleDay,BLACK:v.blackDay,BLACKOUTLINE:v.blackOutlineDay,BLUEOUTLINE:v.blueOutlineDay,GREENOUTLINE:v.greenOutlineDay,LIGHTBLUE:v.lightblueDay,GREEN:v.greenDay,LIGHTBLUEGREEN:v.lightblueGreenDay,LIGHTGREENBLUE:v.lightgreenBlueDay,GREENSTRIPED:v.greenStripedDay,BLUESTRIPED:v.blueStripedDay},ce=N.memo(({isoDate:e,periodeColor:n,isFocused:a,srText:t,dateTooltipCallback:r,dateClickCallback:o,setFocusedDate:s})=>{const i=f(e),u=i.date();me(`Rendering Day: ${u}, Color: ${n}`);const E=m.useRef(null),[T,y]=m.useState(!1);m.useEffect(()=>{a&&E.current?.focus()},[a]);const g=!!o&&!$(i);return p.jsxs("button",{ref:E,type:"button","data-testid":`day:${u};dayColor:${n}`,tabIndex:a?0:-1,className:`${v.days} ${Et[n]} ${g&&v.cursorAndHoover}`,onFocus:g?()=>s(i):void 0,onMouseOver:r?()=>y(!0):void 0,onMouseLeave:r?()=>y(!1):void 0,onClick:g?()=>o(e):void 0,onKeyDown:o?l=>yt(l,i,o,s):void 0,"aria-label":ge(i)+(t?`, ${t}`:""),children:[u,r&&pt(n)&&p.jsx(Q,{open:T,onClose:()=>y(!1),anchorEl:E.current,children:p.jsx(Q.Content,{children:r(e)})})]})}),pt=e=>e!=="NONE"&&e!=="GRAY",$=e=>e.isoWeekday()===6||e.isoWeekday()===7,me=e=>{const n=typeof process<"u"&&ft.VITEST==="true";globalThis.location.hostname==="localhost"&&!n&&console.log(e)},yt=(e,n,a,t)=>{if(e.key==="Tab")return;e.preventDefault();const r=!!a&&!$(n);switch(e.key){case"ArrowLeft":t(n.subtract(1,"day"));break;case"ArrowRight":t(n.add(1,"day"));break;case"ArrowUp":t(n.subtract(7,"day"));break;case"ArrowDown":t(n.add(7,"day"));break;case"Enter":case" ":r&&a(n.format(Te))}};ce.__docgenInfo={description:"",methods:[],displayName:"Day",props:{isoDate:{required:!0,tsType:{name:"string"},description:""},periodeColor:{required:!0,tsType:{name:"union",raw:`| 'NONE'
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
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}]},description:""},isFocused:{required:!0,tsType:{name:"boolean"},description:""},srText:{required:!1,tsType:{name:"string"},description:""},dateTooltipCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => React.ReactNode | string",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"union",raw:"React.ReactNode | string",elements:[{name:"ReactReactNode",raw:"React.ReactNode"},{name:"string"}]}}},description:""},dateClickCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => void",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"void"}}},description:""},setFocusedDate:{required:!0,tsType:{name:"signature",type:"function",raw:"(date: Dayjs) => void",signature:{arguments:[{type:{name:"Dayjs"},name:"date"}],return:{name:"void"}}},description:""}}};const gt="_weeknr_6j43u_1",vt="_weekday_6j43u_12",Z={weeknr:gt,weekday:vt};f.extend(ie);const fe=N.memo(({year:e,month:n,isFirstMonth:a,showWeekNumbers:t,periods:r,focusedDate:o,dateTooltipCallback:s,dateClickCallback:i,setFocusedDate:u})=>{me(`Rendering Month: ${n}-${e}`);const E=m.useMemo(()=>Tt(r),[r]),T=f().year(e).month(n).startOf("month"),y=T.daysInMonth(),g=T.isoWeekday(),l=T.endOf("month").isoWeekday(),R=T.isoWeek(),d=Math.ceil((y+(g-1)+(7-l))/7),P=t?8:7,G=Array.from({length:7},(h,L)=>T.isoWeekday(L+1).format("dd"));return p.jsx(we.New,{borderWidth:"1",maxWidth:"400px",padding:"3",borderRadius:"4",borderColor:"neutral-subtle","data-testid":`year:${e};month:${n}`,children:p.jsxs(le,{gap:"space-12",children:[p.jsx(Be,{size:"small",level:"4",align:"center",children:`${$e(T.format("MMMM"))} ${e}`}),p.jsxs("div",{children:[p.jsxs(X,{columns:P,children:[t&&p.jsx("div",{className:Z.weeknr}),G.map(h=>p.jsx("div",{className:Z.weekday,children:h},h))]}),Array.from({length:d}).map((h,L)=>p.jsxs(X,{columns:P,children:[t&&p.jsx("div",{className:Z.weeknr,children:R+L},`weeknr-${L}`),Array.from({length:7}).map((S,D)=>{const U=L*7+D,C=L===0&&D<g-1,w=L===d-1&&D>=l;if(C||w)return p.jsx("div",{},`empty-${U}`);const b=T.add(U-(g-1),"day"),B=E.get(b.format("YYYY-MM-DD"));return p.jsx(ce,{isoDate:ve(b),periodeColor:Lt(b,B),srText:B?.srText,dateTooltipCallback:s,dateClickCallback:i,isFocused:o?.isSame(b,"day")??(a&&U===g-1)??!1,setFocusedDate:u},`${e}-${n}-${b.date()}`)})]},`week-${L}`))]})]})})},(e,n)=>{const a=Object.keys(e);for(const t of a)if(t!=="periods"&&e[t]!==n[t])return!1;if(e.periods.length!==n.periods.length)return!1;for(let t=0;t<e.periods.length;t++){const r=e.periods[t],o=n.periods[t],s=Object.keys(r);for(const i of s)if(r[i]!==o[i])return!1}return!0}),Lt=(e,n)=>n?n.color==="PINK"?"PINK":n.color==="PURPLE"?"PURPLE":$(e)?"GRAY":n.color:$(e)?"GRAY":"NONE",Tt=e=>{const n=new Map;for(const a of e){let t=f(a.fom);const r=f(a.tom);for(;!t.isAfter(r,"day");){const o=t.format("YYYY-MM-DD");(!n.has(o)||a.isSelected)&&n.set(o,a),t=t.add(1,"day")}}return n};fe.__docgenInfo={description:"",methods:[],displayName:"Month",props:{year:{required:!0,tsType:{name:"number"},description:""},month:{required:!0,tsType:{name:"number"},description:""},isFirstMonth:{required:!0,tsType:{name:"boolean"},description:""},showWeekNumbers:{required:!0,tsType:{name:"boolean"},description:""},periods:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    color: CalendarPeriodColor;
    srText: string;
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
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}],required:!0}},{key:"srText",value:{name:"string",required:!0}},{key:"isSelected",value:{name:"boolean",required:!1}}]}}],raw:"CalendarPeriod[]"},description:""},focusedDate:{required:!0,tsType:{name:"union",raw:"Dayjs | undefined",elements:[{name:"Dayjs"},{name:"undefined"}]},description:""},dateTooltipCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => React.ReactElement | string",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"union",raw:"React.ReactElement | string",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"string"}]}}},description:""},dateClickCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => void",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"void"}}},description:""},setFocusedDate:{required:!0,tsType:{name:"signature",type:"function",raw:"(date: Dayjs) => void",signature:{arguments:[{type:{name:"Dayjs"},name:"date"}],return:{name:"void"}}},description:""}}};f.extend(ie);f.extend(Le);const k=({periods:e,showWeekNumbers:n=!0,nrOfColumns:a=2,isRangeSelection:t=!1,firstDateInCalendar:r,lastDateInCalendar:o,dateTooltipCallback:s,setSelectedPeriods:i,getSrTextForSelectedPeriod:u})=>{const[E,T]=m.useState(),y=m.useMemo(()=>ht(r,o),[e,r,o]),g=m.useMemo(()=>Rt(y,e),[y,e]),l=m.useCallback(R=>bt(t,u,i)(R),[t,u,i]);return p.jsx(X,{gap:"space-12",columns:{sm:1,md:a},children:y.map(({month:R,year:d},P)=>{const G=g.get(Ee(d,R))??[],h=E?.year()===d&&E?.month()===R;return p.jsx(fe,{isFirstMonth:P===0,year:d,month:R,periods:G,showWeekNumbers:n,dateTooltipCallback:s,dateClickCallback:i?l:void 0,focusedDate:h?E:void 0,setFocusedDate:T},`${d}-${R}`)})})},ht=(e,n)=>{const a=f(e),t=n?f(n):f(e).add(6,"month"),r=Dt(a,t);return Array.from({length:r+1},(o,s)=>{const i=a.add(s,"month");return{month:i.month(),year:i.year()}})},Dt=(e,n)=>{let a=(n.year()-e.year())*12;return a+=n.month()-e.month(),Math.max(a,0)},Ee=(e,n)=>`${e}-${n}`,Rt=(e,n)=>{const a=new Map;for(const{year:t,month:r}of e){const o=f().year(t).month(r).startOf("month"),s=o.endOf("month"),i=n.filter(u=>f(u.tom).isSameOrAfter(o,"day")&&f(u.fom).isSameOrBefore(s,"day"));a.set(Ee(t,r),i)}return a},It=(e,n)=>f(n.fom).isBefore(f(e))?n.fom:e,Nt=(e,n)=>{const a=f(e);return f(n.tom).isAfter(a)&&f(n.fom).isBefore(a)||f(n.tom).isBefore(a)?e:n.tom},Ot=(e,n)=>f(e.fom).diff(f(n.fom)),bt=(e,n,a)=>t=>{!a||!n||a(e?r=>{const o=r.length===0?t:It(t,r[0]),s=r.length===0?t:Nt(t,r[0]);return r.some(i=>i.fom===t||i.tom===t)?[]:[{color:"DARKBLUE",fom:o,tom:s,isSelected:!0,srText:n({fom:o,tom:s})}]}:r=>r.some(o=>o.fom===t)?r.filter(o=>o.fom!==t):[...r,{color:"DARKBLUE",fom:t,tom:t,isSelected:!0,srText:n({fom:t,tom:t})}].sort(Ot))};k.__docgenInfo={description:"",methods:[],displayName:"Calendar",props:{periods:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    color: CalendarPeriodColor;
    srText: string;
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
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}],required:!0}},{key:"srText",value:{name:"string",required:!0}},{key:"isSelected",value:{name:"boolean",required:!1}}]}}],raw:"CalendarPeriod[]"},description:""},showWeekNumbers:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},nrOfColumns:{required:!1,tsType:{name:"union",raw:"1 | 2 | 3",elements:[{name:"literal",value:"1"},{name:"literal",value:"2"},{name:"literal",value:"3"}]},description:"",defaultValue:{value:"2",computed:!1}},isRangeSelection:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},firstDateInCalendar:{required:!0,tsType:{name:"string"},description:""},lastDateInCalendar:{required:!1,tsType:{name:"string"},description:""},dateTooltipCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => React.ReactElement | string",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"union",raw:"React.ReactElement | string",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"string"}]}}},description:""},setSelectedPeriods:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: React.SetStateAction<CalendarPeriod[]>) => void",signature:{arguments:[{type:{name:"ReactSetStateAction",raw:"React.SetStateAction<CalendarPeriod[]>",elements:[{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    color: CalendarPeriodColor;
    srText: string;
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
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}],required:!0}},{key:"srText",value:{name:"string",required:!0}},{key:"isSelected",value:{name:"boolean",required:!1}}]}}],raw:"CalendarPeriod[]"}]},name:"value"}],return:{name:"void"}}},description:""},getSrTextForSelectedPeriod:{required:!1,tsType:{name:"signature",type:"function",raw:"(period: { fom: string; tom: string }) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{ fom: string; tom: string }",signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}}]}},name:"period"}],return:{name:"string"}}},description:""}}};const $t={title:"Calendar",component:k,render:e=>p.jsx("div",{children:p.jsx(k,{...e})})},I={args:{firstDateInCalendar:"2024-01-31",lastDateInCalendar:"2024-08-30",periods:[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE",srText:"Mors periode"},{fom:"2024-02-21",tom:"2024-02-21",color:"PINK",srText:"Termindato"},{fom:"2024-02-22",tom:"2024-05-05",color:"BLUE",srText:"Mors periode"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN",srText:"Fars periode"}]}},A={args:{...I.args,showWeekNumbers:!1}},M={args:{...I.args,dateTooltipCallback:e=>p.jsxs(le,{gap:"space-4",children:[p.jsx(Se,{children:"Dette er en tooltip"}),p.jsx(_e,{children:e})]})}},j={args:I.args,render:()=>{const e=[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE",srText:"Mors periode"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN",srText:"Fars periode"}],n=(o,s)=>f(o.fom).diff(f(s.fom)),[a,t]=m.useState(e),r=o=>{t(s=>(typeof o=="function"?o(s):o).sort(n))};return p.jsx(k,{periods:a,isRangeSelection:!1,setSelectedPeriods:r,firstDateInCalendar:e[0].fom,lastDateInCalendar:e[1].tom})}},K={args:I.args,render:()=>{const e=[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE",srText:"Mors periode"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN",srText:"Fars periode"}],n=(o,s)=>f(o.fom).diff(f(s.fom)),[a,t]=m.useState(e),r=o=>{t(s=>(typeof o=="function"?o(s):o).sort(n))};return p.jsx(k,{periods:a,isRangeSelection:!0,setSelectedPeriods:r,firstDateInCalendar:e[0].fom,lastDateInCalendar:e[1].tom})}},H={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE",srText:"Mors periode"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN",srText:"Fars periode"}],firstDateInCalendar:"2024-01-31",lastDateInCalendar:"2024-08-30"}},q={args:{periods:[{fom:"2024-02-01",tom:"2024-02-20",color:"BLUE",srText:"Mors periode"},{fom:"2025-05-06",tom:"2025-07-30",color:"LIGHTGREEN",srText:"Fars periode"}],firstDateInCalendar:"2024-02-01",lastDateInCalendar:"2025-07-30"}},F={args:{...I.args,nrOfColumns:1}},W={args:{...I.args,nrOfColumns:2}},V={args:{...I.args,nrOfColumns:3}};I.parameters={...I.parameters,docs:{...I.parameters?.docs,source:{originalSource:`{
  args: {
    firstDateInCalendar: '2024-01-31',
    lastDateInCalendar: '2024-08-30',
    periods: [{
      fom: '2024-01-31',
      tom: '2024-02-20',
      color: 'BLUE',
      srText: 'Mors periode'
    }, {
      fom: '2024-02-21',
      tom: '2024-02-21',
      color: 'PINK',
      srText: 'Termindato'
    }, {
      fom: '2024-02-22',
      tom: '2024-05-05',
      color: 'BLUE',
      srText: 'Mors periode'
    }, {
      fom: '2024-05-06',
      tom: '2024-08-30',
      color: 'LIGHTGREEN',
      srText: 'Fars periode'
    }]
  }
}`,...I.parameters?.docs?.source}}};A.parameters={...A.parameters,docs:{...A.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    showWeekNumbers: false
  }
}`,...A.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    dateTooltipCallback: (date: string) => <VStack gap="space-4">
                <BodyShort>Dette er en tooltip</BodyShort>
                <Detail>{date}</Detail>
            </VStack>
  }
}`,...M.parameters?.docs?.source}}};j.parameters={...j.parameters,docs:{...j.parameters?.docs,source:{originalSource:`{
  args: Default.args,
  render: () => {
    const allePerioder = [{
      fom: '2024-01-31',
      tom: '2024-02-20',
      color: 'BLUE',
      srText: 'Mors periode'
    }, {
      fom: '2024-05-06',
      tom: '2024-08-30',
      color: 'LIGHTGREEN',
      srText: 'Fars periode'
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
}`,...j.parameters?.docs?.source}}};K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: Default.args,
  render: () => {
    const allePerioder = [{
      fom: '2024-01-31',
      tom: '2024-02-20',
      color: 'BLUE',
      srText: 'Mors periode'
    }, {
      fom: '2024-05-06',
      tom: '2024-08-30',
      color: 'LIGHTGREEN',
      srText: 'Fars periode'
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
}`,...K.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    periods: [{
      fom: '2024-01-31',
      tom: '2024-02-20',
      color: 'BLUE',
      srText: 'Mors periode'
    }, {
      fom: '2024-05-06',
      tom: '2024-08-30',
      color: 'LIGHTGREEN',
      srText: 'Fars periode'
    }],
    firstDateInCalendar: '2024-01-31',
    lastDateInCalendar: '2024-08-30'
  }
}`,...H.parameters?.docs?.source}}};q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
  args: {
    periods: [{
      fom: '2024-02-01',
      tom: '2024-02-20',
      color: 'BLUE',
      srText: 'Mors periode'
    }, {
      fom: '2025-05-06',
      tom: '2025-07-30',
      color: 'LIGHTGREEN',
      srText: 'Fars periode'
    }],
    firstDateInCalendar: '2024-02-01',
    lastDateInCalendar: '2025-07-30'
  }
}`,...q.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    nrOfColumns: 1
  }
}`,...F.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    nrOfColumns: 2
  }
}`,...W.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    nrOfColumns: 3
  }
}`,...V.parameters?.docs?.source}}};const Yt=["Default","IkkeVisUkenr","MedTooltip","VisKalenderMedValgAvEnkeltdager","VisKalenderMedValgAvPerioder","PeriodsWithGap","PeriodsThatSpanOverAYear","MedEnKolonne","MedToKolonner","MedTreKolonner"];export{I as Default,A as IkkeVisUkenr,F as MedEnKolonne,W as MedToKolonner,M as MedTooltip,V as MedTreKolonner,q as PeriodsThatSpanOverAYear,H as PeriodsWithGap,j as VisKalenderMedValgAvEnkeltdager,K as VisKalenderMedValgAvPerioder,Yt as __namedExportsOrder,$t as default};
