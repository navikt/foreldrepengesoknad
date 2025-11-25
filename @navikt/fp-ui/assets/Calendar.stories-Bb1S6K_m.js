import{r as c,R as b,a as re,S as fe,b as ae,c as Ee,d as E,j as m}from"./iframe-DphAAE1k.js";import{f as pe,i as oe,a as ye}from"./UttaksdagenString-BVo4rMwR.js";import{I as ge}from"./dates-DLYtH5CK.js";import{R as ve,o as Le,u as he,a as De,b as Re,c as Te,f as Ne,s as Oe,d as be,e as Ie}from"./Date.Input-DRv-4oOA.js";import{c as V,B as Pe}from"./Button-_dJZTUfR.js";import"./useId-BQt7dN_X.js";import{u as X}from"./ChevronDown-DO7gTTKl.js";import{u as Ue,a as ee}from"./useClientLayoutEffect-B8V-a1bu.js";import{B as Ge}from"./Box-9EMVeiEP.js";import{V as J}from"./VStack-cxPoyHuB.js";import{H as Be,B as Ce,D as Se}from"./Label-BCLm4whr.js";import{H as F}from"./HGrid-B2ggRr-y.js";import{M as _e}from"./message-BNfmL04H.js";import"./preload-helper-D9Z9MdNV.js";import"./index-D9ul5TZZ.js";import"./i18n.hooks-05BgMCju.js";import"./useId-DfqUdEVa.js";import"./Calendar-NZnL7TNL.js";import"./BasePrimitive-zigma4vB.js";function we(e,n){const a=[],t=new Set,r=new Map;n.forEach((s,i)=>{s.forEach(d=>{d!==i&&r.set(d,i)})});const o=s=>{if(t.has(s))return;const i=r.get(s);if(i&&!t.has(i)&&(o(i),t.has(s)))return;t.add(s),a.push(s);const d=n.get(s);d&&d.forEach(o)};return e.forEach(o),a}function ke(e,n=globalThis?.document,a=!0){const t=X(e);c.useEffect(()=>{if(!a)return;const r=o=>{o.key==="Escape"&&t(o)};return n.addEventListener("keydown",r,!0),()=>{n.removeEventListener("keydown",r,!0)}},[t,n,a])}const se={FOCUS_OUTSIDE:"AKSEL_FOCUS_OUTSIDE",POINTER_DOWN_OUTSIDE:"AKSEL_POINTER_DOWN_OUTSIDE"};function ie(e,n,a,{discrete:t}={discrete:!1}){if(!n)return;const r=a.originalEvent.target,o=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:a});r.addEventListener(e,n,{once:!0}),t&&r?ve.flushSync(()=>r.dispatchEvent(o)):r.dispatchEvent(o)}function Ae(e,n=globalThis?.document,a=!0){const t=X(e),r=c.useRef(!1);return c.useEffect(()=>{if(!a)return;const o=s=>{if(s.target&&!r.current){const i={originalEvent:s};ie(se.FOCUS_OUTSIDE,t,i)}};return n.addEventListener("focusin",o),()=>{n.removeEventListener("focusin",o)}},[n,t,a]),{onFocusCapture:()=>{r.current=!0},onBlurCapture:()=>{r.current=!1}}}function xe(e,n=globalThis?.document,a=!0){const t=X(e),r=c.useRef(!1),o=c.useRef(()=>{}),s=Ue();return c.useEffect(()=>{if(!a)return;const i=d=>{function y(){ie(se.POINTER_DOWN_OUTSIDE,t,{originalEvent:d},{discrete:!0})}d.target&&!r.current?d.pointerType==="touch"?(n.removeEventListener("click",o.current),o.current=y,n.addEventListener("click",o.current,{once:!0})):y():n.removeEventListener("click",o.current),r.current=!1};return s.start(0,()=>{n.addEventListener("pointerdown",i)}),()=>{n.removeEventListener("pointerdown",i),n.removeEventListener("click",o.current)}},[n,t,s,a]),{onPointerDownCapture:()=>{r.current=!0}}}var je=function(e,n){var a={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.indexOf(t)<0&&(a[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)n.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(a[t[r]]=e[t[r]]);return a};const te=b.createContext(null),z="dismissableLayer.update";let ne;const Me=b.createContext({layers:new Set,branchedLayers:new Map,layersWithOutsidePointerEventsDisabled:new Set}),He=c.forwardRef((e,n)=>{var{children:a,disableOutsidePointerEvents:t,onDismiss:r,onInteractOutside:o,onEscapeKeyDown:s,onFocusOutside:i,onPointerDownOutside:d,safeZone:y,asChild:R,enabled:T=!0}=e,h=je(e,["children","disableOutsidePointerEvents","onDismiss","onInteractOutside","onEscapeKeyDown","onFocusOutside","onPointerDownOutside","safeZone","asChild","enabled"]);const u=c.useContext(Me),[,U]=c.useState({}),[p,l]=b.useState(null),L=re(n,l),g=Le(p),v=we(u.layers,u.branchedLayers),O=Ke(v,u.layersWithOutsidePointerEventsDisabled),N=p?v.indexOf(p):-1,G=u.layersWithOutsidePointerEventsDisabled.size>0,C=O===-1||N>=O;function S(f){if(!y?.anchor)return;let Y=!1;f.defaultPrevented||f.detail.originalEvent.type==="pointerdown"&&(Y=!0);const Q=f.target;(y.anchor.contains(Q)||Q===y.anchor)&&f.preventDefault(),f.detail.originalEvent.type==="focusin"&&Y&&f.preventDefault()}const P=xe(f=>{C&&(d?.(f),o?.(f),y&&S(f),!f.defaultPrevented&&r&&r())},g,T),_=Ae(f=>{i?.(f),o?.(f),y&&S(f),!f.defaultPrevented&&r&&r()},g,T);ke(f=>{N===u.layers.size-1&&(s?.(f),!f.defaultPrevented&&r&&(f.preventDefault(),r()))},g,T),c.useEffect(()=>{if(!(!p||!T))return t&&(u.layersWithOutsidePointerEventsDisabled.size===0&&(ne=g.body.style.pointerEvents,g.body.style.pointerEvents="none"),u.layersWithOutsidePointerEventsDisabled.add(p)),u.layers.add(p),A(),()=>{t&&u.layersWithOutsidePointerEventsDisabled.size===1&&(g.body.style.pointerEvents=ne)}},[p,T,t,u,g]),c.useEffect(()=>()=>{p&&(u.layers.has(p)||u.layersWithOutsidePointerEventsDisabled.has(p))&&(u.layers.delete(p),u.layersWithOutsidePointerEventsDisabled.delete(p),A())},[p,u,T]);const I=c.useContext(te);c.useEffect(()=>{if(!p||!T||!I||p===I)return;u.branchedLayers.has(I)||u.branchedLayers.set(I,new Set);const f=u.branchedLayers.get(I);return f.add(p),A(),()=>{f.delete(p),f.size===0&&u.branchedLayers.delete(I),A()}},[p,T,I,u]),c.useEffect(()=>{const f=()=>U({});return document.addEventListener(z,f),()=>document.removeEventListener(z,f)},[]);const w=R?fe:"div";return b.createElement(te.Provider,{value:p},b.createElement(w,Object.assign({},h,{ref:L,style:Object.assign({pointerEvents:G?C?"auto":"none":void 0},h.style),onFocusCapture:V(h.onFocusCapture,_.onFocusCapture),onBlurCapture:V(h.onBlurCapture,_.onBlurCapture),onPointerDownCapture:V(h.onPointerDownCapture,P.onPointerDownCapture)}),a))});function A(){const e=new CustomEvent(z);document.dispatchEvent(e)}function Ke(e,n){for(let a=e.length-1;a>=0;a-=1)if(n.has(e[a]))return a;return-1}var qe=function(e,n){var a={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.indexOf(t)<0&&(a[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)n.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(a[t[r]]=e[t[r]]);return a};const We=c.forwardRef((e,n)=>{var{className:a}=e,t=qe(e,["className"]);const{cn:r}=ae();return b.createElement("div",Object.assign({},t,{ref:n,className:r("navds-popover__content",a)}))});var Ye=function(e,n){var a={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&n.indexOf(t)<0&&(a[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,t=Object.getOwnPropertySymbols(e);r<t.length;r++)n.indexOf(t[r])<0&&Object.prototype.propertyIsEnumerable.call(e,t[r])&&(a[t[r]]=e[t[r]]);return a};const Z=c.forwardRef((e,n)=>{var{className:a,children:t,anchorEl:r,arrow:o=!0,open:s,onClose:i,placement:d="top",offset:y,strategy:R,flip:T=!0}=e,h=Ye(e,["className","children","anchorEl","arrow","open","onClose","placement","offset","strategy","flip"]);const{cn:u}=ae(),U=c.useRef(null),p=he(!1)!==void 0,l=De(!1),L=R??(p?"fixed":"absolute"),g=l?!1:T,v=Ee(!1),{update:O,refs:N,placement:G,middlewareData:{arrow:{x:C,y:S}={}},floatingStyles:P}=Re({strategy:L,placement:d,open:s,middleware:[Te(y??(v?.isDarkside?8:o?16:4)),g&&Ne({padding:5,fallbackPlacements:["bottom","top"]}),Oe({padding:12}),be({element:U,padding:8})]});ee(()=>{N.setReference(r)},[r,N]);const _=re(N.setFloating,n);ee(()=>{if(!N.reference.current||!N.floating.current||!s)return;const w=Ie(N.reference.current,N.floating.current,O);return()=>w()},[N.floating,N.reference,O,s,r]);const I={top:"bottom",right:"left",bottom:"top",left:"right"}[G.split("-")[0]];return b.createElement(He,{asChild:!0,safeZone:{anchor:r},onDismiss:()=>s&&i?.(),enabled:s},b.createElement("div",Object.assign({ref:_},h,{className:u("navds-popover",a,{"navds-popover--hidden":!s||!r}),style:Object.assign(Object.assign({},h.style),P),"data-placement":G,"aria-hidden":!s||!r}),t,o&&!v?.isDarkside&&b.createElement("div",{ref:w=>{U.current=w},style:Object.assign(Object.assign(Object.assign({},C!=null?{left:C}:{}),S!=null?{top:S}:{}),I?{[I]:"-0.5rem"}:{}),className:u("navds-popover__arrow")})))});Z.Content=We;const Ve=e=>e.charAt(0).toUpperCase()+e.slice(1),$e="_days_11aro_1",Fe="_cursorAndHoover_11aro_30",ze="_srOnly_11aro_38",Ze="_blueDay_11aro_50",Xe="_darkblueDay_11aro_55",Je="_lightblueDay_11aro_61",Qe="_lightgreenDay_11aro_80",et="_greenDay_11aro_99",tt="_greenStripedDay_11aro_104",nt="_blueStripedDay_11aro_138",rt="_grayDay_11aro_172",at="_blackDay_11aro_178",ot="_blackOutlineDay_11aro_184",st="_blueOutlineDay_11aro_189",it="_greenOutlineDay_11aro_207",lt="_lightgreenBlueDay_11aro_225",dt="_lightblueGreenDay_11aro_251",ut="_none_11aro_276",ct="_pinkDay_11aro_281",mt="_purpleDay_11aro_287",D={days:$e,cursorAndHoover:Fe,srOnly:ze,blueDay:Ze,darkblueDay:Xe,lightblueDay:Je,lightgreenDay:Qe,greenDay:et,greenStripedDay:tt,blueStripedDay:nt,grayDay:rt,blackDay:at,blackOutlineDay:ot,blueOutlineDay:st,greenOutlineDay:it,lightgreenBlueDay:lt,lightblueGreenDay:dt,none:ut,pinkDay:ct,purpleDay:mt};var ft={};const Et={NONE:D.none,BLUE:D.blueDay,DARKBLUE:D.darkblueDay,LIGHTGREEN:D.lightgreenDay,GRAY:D.grayDay,PINK:D.pinkDay,PURPLE:D.purpleDay,BLACK:D.blackDay,BLACKOUTLINE:D.blackOutlineDay,BLUEOUTLINE:D.blueOutlineDay,GREENOUTLINE:D.greenOutlineDay,LIGHTBLUE:D.lightblueDay,GREEN:D.greenDay,LIGHTBLUEGREEN:D.lightblueGreenDay,LIGHTGREENBLUE:D.lightgreenBlueDay,GREENSTRIPED:D.greenStripedDay,BLUESTRIPED:D.blueStripedDay},le=b.memo(({isoDate:e,periodeColor:n,isFocused:a,srText:t,dateTooltipCallback:r,dateClickCallback:o,setFocusedDate:s})=>{const i=E(e),d=i.date();de(`Rendering Day: ${d}, Color: ${n}`);const y=c.useRef(null),[R,T]=c.useState(!1);c.useEffect(()=>{a&&y.current?.focus()},[a]);const h=!!o&&!W(i);return m.jsxs("button",{ref:y,type:"button","data-testid":`day:${d};dayColor:${n}`,tabIndex:a?0:-1,className:`${D.days} ${Et[n]} ${h&&D.cursorAndHoover}`,onFocus:h?()=>s(i):void 0,onMouseOver:r?()=>T(!0):void 0,onMouseLeave:r?()=>T(!1):void 0,onClick:h?()=>o(e):void 0,onKeyDown:o?u=>yt(u,i,o,s):void 0,children:[d,t&&m.jsx("span",{className:D.srOnly,children:t}),r&&pt(n)&&m.jsx(Z,{open:R,onClose:()=>T(!1),anchorEl:y.current,children:m.jsx(Z.Content,{children:r(e)})})]})}),pt=e=>e!=="NONE"&&e!=="GRAY",W=e=>e.isoWeekday()===6||e.isoWeekday()===7,de=e=>{const n=typeof process<"u"&&ft.VITEST==="true";globalThis.location.hostname==="localhost"&&!n&&console.log(e)},yt=(e,n,a,t)=>{if(e.key==="Tab")return;e.preventDefault();const r=!!a&&!W(n);switch(e.key){case"ArrowLeft":t(n.subtract(1,"day"));break;case"ArrowRight":t(n.add(1,"day"));break;case"ArrowUp":t(n.subtract(7,"day"));break;case"ArrowDown":t(n.add(7,"day"));break;case"Enter":case" ":r&&a(n.format(ge))}};le.__docgenInfo={description:"",methods:[],displayName:"Day",props:{isoDate:{required:!0,tsType:{name:"string"},description:""},periodeColor:{required:!0,tsType:{name:"union",raw:`| 'NONE'
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
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}]},description:""},isFocused:{required:!0,tsType:{name:"boolean"},description:""},srText:{required:!1,tsType:{name:"string"},description:""},dateTooltipCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => React.ReactNode | string",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"union",raw:"React.ReactNode | string",elements:[{name:"ReactReactNode",raw:"React.ReactNode"},{name:"string"}]}}},description:""},dateClickCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => void",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"void"}}},description:""},setFocusedDate:{required:!0,tsType:{name:"signature",type:"function",raw:"(date: Dayjs) => void",signature:{arguments:[{type:{name:"Dayjs"},name:"date"}],return:{name:"void"}}},description:""}}};const gt="_weeknr_6j43u_1",vt="_weekday_6j43u_12",$={weeknr:gt,weekday:vt};E.extend(oe);const ue=b.memo(({year:e,month:n,isFirstMonth:a,showWeekNumbers:t,periods:r,focusedDate:o,dateTooltipCallback:s,dateClickCallback:i,setFocusedDate:d})=>{de(`Rendering Month: ${n}-${e}`);const y=c.useMemo(()=>ht(r),[r]),R=E().year(e).month(n).startOf("month"),T=R.daysInMonth(),h=R.isoWeekday(),u=R.endOf("month").isoWeekday(),U=R.isoWeek(),p=Math.ceil((T+(h-1)+(7-u))/7),l=t?8:7,L=Array.from({length:7},(g,v)=>R.isoWeekday(v+1).format("dd"));return m.jsx(Ge.New,{borderWidth:"1",maxWidth:"400px",padding:"3",borderRadius:"4",borderColor:"neutral-subtle","data-testid":`year:${e};month:${n}`,children:m.jsxs(J,{gap:"space-12",children:[m.jsx(Be,{size:"small",level:"4",align:"center",children:`${Ve(R.format("MMMM"))} ${e}`}),m.jsxs("div",{children:[m.jsxs(F,{columns:l,children:[t&&m.jsx("div",{className:$.weeknr}),L.map(g=>m.jsx("div",{className:$.weekday,children:g},g))]}),Array.from({length:p}).map((g,v)=>m.jsxs(F,{columns:l,children:[t&&m.jsx("div",{className:$.weeknr,children:U+v},`weeknr-${v}`),Array.from({length:7}).map((O,N)=>{const G=v*7+N,C=v===0&&N<h-1,S=v===p-1&&N>=u;if(C||S)return m.jsx("div",{},`empty-${G}`);const P=R.add(G-(h-1),"day"),_=y.get(P.format("YYYY-MM-DD"));return m.jsx(le,{isoDate:pe(P),periodeColor:Lt(P,_),srText:_?.srText,dateTooltipCallback:s,dateClickCallback:i,isFocused:o?.isSame(P,"day")??(a&&G===h-1)??!1,setFocusedDate:d},`${e}-${n}-${P.date()}`)})]},`week-${v}`))]})]})})},(e,n)=>{const a=Object.keys(e);for(const t of a)if(t!=="periods"&&e[t]!==n[t])return!1;if(e.periods.length!==n.periods.length)return!1;for(let t=0;t<e.periods.length;t++){const r=e.periods[t],o=n.periods[t],s=Object.keys(r);for(const i of s)if(r[i]!==o[i])return!1}return!0}),Lt=(e,n)=>n?n.color==="PINK"?"PINK":n.color==="PURPLE"?"PURPLE":W(e)?"GRAY":n.color:W(e)?"GRAY":"NONE",ht=e=>{const n=new Map;for(const a of e){let t=E(a.fom);const r=E(a.tom);for(;!t.isAfter(r,"day");){const o=t.format("YYYY-MM-DD");(!n.has(o)||a.isSelected)&&n.set(o,a),t=t.add(1,"day")}}return n};ue.__docgenInfo={description:"",methods:[],displayName:"Month",props:{year:{required:!0,tsType:{name:"number"},description:""},month:{required:!0,tsType:{name:"number"},description:""},isFirstMonth:{required:!0,tsType:{name:"boolean"},description:""},showWeekNumbers:{required:!0,tsType:{name:"boolean"},description:""},periods:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}],required:!0}},{key:"srText",value:{name:"string",required:!1}},{key:"isSelected",value:{name:"boolean",required:!1}}]}}],raw:"CalendarPeriod[]"},description:""},focusedDate:{required:!0,tsType:{name:"union",raw:"Dayjs | undefined",elements:[{name:"Dayjs"},{name:"undefined"}]},description:""},dateTooltipCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => React.ReactElement | string",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"union",raw:"React.ReactElement | string",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"string"}]}}},description:""},dateClickCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => void",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"void"}}},description:""},setFocusedDate:{required:!0,tsType:{name:"signature",type:"function",raw:"(date: Dayjs) => void",signature:{arguments:[{type:{name:"Dayjs"},name:"date"}],return:{name:"void"}}},description:""}}};E.extend(oe);E.extend(ye);const k=({periods:e,showWeekNumbers:n=!0,dateTooltipCallback:a,setSelectedPeriods:t,isRangeSelection:r=!1,getSrTextForSelectedPeriod:o,firstDateInCalendar:s,lastDateInCalendar:i})=>{const[d,y]=c.useState(0),R=c.useMemo(()=>Dt(d,s,i),[e,s,i,d]),T=c.useMemo(()=>Rt(R,e),[R,e]),[h,u]=c.useState(),U=c.useMemo(()=>{const l=E(s),L=i?E(i):l.add(6,"month"),g=l.add(3,"year");return ce(L.toDate(),g.toDate())},[s,i]),p=c.useCallback(l=>{!t||!o||t(r?L=>{const g=L.length===0?l:Tt(L[0],l),v=L.length===0?l:Nt(L[0],l);return L.some(O=>O.fom===l||O.tom===l)?[]:[{color:"DARKBLUE",fom:g,tom:v,isSelected:!0,srText:o({fom:g,tom:v})}]}:L=>L.some(g=>g.fom===l)?L.filter(g=>g.fom!==l):[...L,{color:"DARKBLUE",fom:l,tom:l,isSelected:!0,srText:o({fom:l,tom:l})}].sort(Ot))},[r,o,t]);return m.jsxs(J,{gap:"space-16",children:[!t&&e.some(l=>l.srText)&&m.jsx("div",{className:"sr-only",children:e.filter(l=>l.srText).map(l=>l.srText).toString()}),m.jsx(F,{gap:"space-12",columns:{sm:1,md:t?1:2},children:R.map(({month:l,year:L},g)=>{const v=T.get(me(L,l))??[],O=h?.year()===L&&h?.month()===l;return m.jsx(ue,{isFirstMonth:g===0,year:L,month:l,periods:v,showWeekNumbers:n,dateTooltipCallback:a,dateClickCallback:t?p:void 0,focusedDate:O?h:void 0,setFocusedDate:u},`${L}-${l}`)})}),d<=U&&m.jsx(Pe,{onClick:()=>y(l=>l+3),type:"button",variant:"secondary",size:"small",className:"mt-4 w-full",children:m.jsx(_e,{id:"Calendar.LeggTilMåneder"})})]})},Dt=(e,n,a)=>{const t=E(n),o=(a?E(a):E(n).add(6,"month")).add(e,"month"),s=ce(t.toDate(),o.toDate());return Array.from({length:s+1},(i,d)=>{const y=t.add(d,"month");return{month:y.month(),year:y.year()}})},ce=(e,n)=>{let a=(n.getFullYear()-e.getFullYear())*12;return a+=n.getMonth()-e.getMonth(),Math.max(a,0)},me=(e,n)=>`${e}-${n}`,Rt=(e,n)=>{const a=new Map;for(const{year:t,month:r}of e){const o=E().year(t).month(r).startOf("month"),s=o.endOf("month"),i=n.filter(d=>E(d.tom).isSameOrAfter(o,"day")&&E(d.fom).isSameOrBefore(s,"day"));a.set(me(t,r),i)}return a},Tt=(e,n)=>E(e.fom).isBefore(E(n))?e.fom:n,Nt=(e,n)=>{const a=E(n);return E(e.tom).isAfter(a)&&E(e.fom).isBefore(a)||E(e.tom).isBefore(a)?n:e.tom},Ot=(e,n)=>E(e.fom).diff(E(n.fom));k.__docgenInfo={description:"",methods:[],displayName:"Calendar",props:{periods:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}],required:!0}},{key:"srText",value:{name:"string",required:!1}},{key:"isSelected",value:{name:"boolean",required:!1}}]}}],raw:"CalendarPeriod[]"}]},name:"value"}],return:{name:"void"}}},description:""},isRangeSelection:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},getSrTextForSelectedPeriod:{required:!1,tsType:{name:"signature",type:"function",raw:"(period: { fom: string; tom: string }) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{ fom: string; tom: string }",signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}}]}},name:"period"}],return:{name:"string"}}},description:""},firstDateInCalendar:{required:!0,tsType:{name:"string"},description:""},lastDateInCalendar:{required:!1,tsType:{name:"string"},description:""}}};const Vt={title:"Calendar",component:k,render:e=>m.jsx("div",{style:{maxWidth:"704px"},children:m.jsx(k,{...e})})},B={args:{firstDateInCalendar:"2024-01-31",lastDateInCalendar:"2024-08-30",periods:[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE"},{fom:"2024-02-21",tom:"2024-02-21",color:"PINK"},{fom:"2024-02-22",tom:"2024-05-05",color:"BLUE"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN"}]}},x={args:{...B.args,showWeekNumbers:!1}},j={args:{...B.args,dateTooltipCallback:e=>m.jsxs(J,{gap:"space-4",children:[m.jsx(Ce,{children:"Dette er en tooltip"}),m.jsx(Se,{children:e})]})}},M={args:B.args,render:()=>{const e=[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN"}],n=(o,s)=>E(o.fom).diff(E(s.fom)),[a,t]=c.useState(e),r=o=>{t(s=>(typeof o=="function"?o(s):o).sort(n))};return m.jsx(k,{periods:a,isRangeSelection:!1,setSelectedPeriods:r,firstDateInCalendar:e[0].fom,lastDateInCalendar:e[1].tom})}},H={args:B.args,render:()=>{const e=[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN"}],n=(o,s)=>E(o.fom).diff(E(s.fom)),[a,t]=c.useState(e),r=o=>{t(s=>(typeof o=="function"?o(s):o).sort(n))};return m.jsx(k,{periods:a,isRangeSelection:!0,setSelectedPeriods:r,firstDateInCalendar:e[0].fom,lastDateInCalendar:e[1].tom})}},K={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN"}],firstDateInCalendar:"2024-01-31",lastDateInCalendar:"2024-08-30"}},q={args:{periods:[{fom:"2024-02-01",tom:"2024-02-20",color:"BLUE"},{fom:"2025-05-06",tom:"2025-07-30",color:"LIGHTGREEN"}],firstDateInCalendar:"2024-02-01",lastDateInCalendar:"2025-07-30"}};B.parameters={...B.parameters,docs:{...B.parameters?.docs,source:{originalSource:`{
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
}`,...B.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...j.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
}`,...M.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
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
}`,...H.parameters?.docs?.source}}};K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
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
}`,...K.parameters?.docs?.source}}};q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
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
}`,...q.parameters?.docs?.source}}};const $t=["Default","IkkeVisUkenr","MedTooltip","VisKalenderMedValgAvEnkeltdager","VisKalenderMedValgAvPerioder","PeriodsWithGap","PeriodsThatSpanOverAYear"];export{B as Default,x as IkkeVisUkenr,j as MedTooltip,q as PeriodsThatSpanOverAYear,K as PeriodsWithGap,M as VisKalenderMedValgAvEnkeltdager,H as VisKalenderMedValgAvPerioder,$t as __namedExportsOrder,Vt as default};
