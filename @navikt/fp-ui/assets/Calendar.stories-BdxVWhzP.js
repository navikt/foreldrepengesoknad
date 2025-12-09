import{r as m,R as N,a as se,S as pe,b as ie,c as ye,d as E,j as f}from"./iframe-C-Z36gym.js";import{f as ge,i as le,a as ve}from"./UttaksdagenString-c_Eais56.js";import{I as Le}from"./dates-CHCdB9WC.js";import{R as he,o as De,u as Re,a as Te,b as Oe,c as Ne,f as Ie,s as Pe,d as be,e as Ue}from"./Date.Input-BWlF6IV6.js";import{c as z}from"./composeEventHandlers-krbYd5LM.js";import"./useId-DN3OCqdn.js";import{u as ee}from"./ChevronDown-BV75v9VP.js";import{u as Ge,a as re}from"./useClientLayoutEffect-DZjObYvH.js";import{B as Ce}from"./Box-B90L3eWv.js";import{V as ne}from"./VStack-w8QHgrjn.js";import{H as we,B as Be,D as Se}from"./Label-DzAo03_s.js";import{H as X}from"./HGrid-CloZppQ1.js";import"./preload-helper-PPVm8Dsz.js";import"./index-fpc1he99.js";import"./Provider-CdMW__Di.js";import"./useId-fqMe8tRD.js";import"./Calendar-CDxfHDNS.js";import"./BasePrimitive-Ch_XPgfS.js";function _e(e,t){const a=[],n=new Set,r=new Map;t.forEach((s,i)=>{s.forEach(d=>{d!==i&&r.set(d,i)})});const o=s=>{if(n.has(s))return;const i=r.get(s);if(i&&!n.has(i)&&(o(i),n.has(s)))return;n.add(s),a.push(s);const d=t.get(s);d&&d.forEach(o)};return e.forEach(o),a}function ke(e,t=globalThis?.document,a=!0){const n=ee(e);m.useEffect(()=>{if(!a)return;const r=o=>{o.key==="Escape"&&n(o)};return t.addEventListener("keydown",r,!0),()=>{t.removeEventListener("keydown",r,!0)}},[n,t,a])}const ue={FOCUS_OUTSIDE:"AKSEL_FOCUS_OUTSIDE",POINTER_DOWN_OUTSIDE:"AKSEL_POINTER_DOWN_OUTSIDE"};function de(e,t,a,{discrete:n}={discrete:!1}){if(!t)return;const r=a.originalEvent.target,o=new CustomEvent(e,{bubbles:!1,cancelable:!0,detail:a});r.addEventListener(e,t,{once:!0}),n&&r?he.flushSync(()=>r.dispatchEvent(o)):r.dispatchEvent(o)}function Ae(e,t=globalThis?.document,a=!0){const n=ee(e),r=m.useRef(!1);return m.useEffect(()=>{if(!a)return;const o=s=>{if(s.target&&!r.current){const i={originalEvent:s};de(ue.FOCUS_OUTSIDE,n,i)}};return t.addEventListener("focusin",o),()=>{t.removeEventListener("focusin",o)}},[t,n,a]),{onFocusCapture:()=>{r.current=!0},onBlurCapture:()=>{r.current=!1}}}function xe(e,t=globalThis?.document,a=!0){const n=ee(e),r=m.useRef(!1),o=m.useRef(()=>{}),s=Ge();return m.useEffect(()=>{if(!a)return;const i=d=>{function p(){de(ue.POINTER_DOWN_OUTSIDE,n,{originalEvent:d},{discrete:!0})}d.target&&!r.current?d.pointerType==="touch"?(t.removeEventListener("click",o.current),o.current=p,t.addEventListener("click",o.current,{once:!0})):p():t.removeEventListener("click",o.current),r.current=!1};return s.start(0,()=>{t.addEventListener("pointerdown",i)}),()=>{t.removeEventListener("pointerdown",i),t.removeEventListener("click",o.current)}},[t,n,s,a]),{onPointerDownCapture:()=>{r.current=!0}}}var je=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(a[n[r]]=e[n[r]]);return a};const ae=N.createContext(null),J="dismissableLayer.update";let oe;const Ke=N.createContext({layers:new Set,branchedLayers:new Map,layersWithOutsidePointerEventsDisabled:new Set}),He=m.forwardRef((e,t)=>{var{children:a,disableOutsidePointerEvents:n,onDismiss:r,onInteractOutside:o,onEscapeKeyDown:s,onFocusOutside:i,onPointerDownOutside:d,safeZone:p,asChild:D,enabled:y=!0}=e,v=je(e,["children","disableOutsidePointerEvents","onDismiss","onInteractOutside","onEscapeKeyDown","onFocusOutside","onPointerDownOutside","safeZone","asChild","enabled"]);const l=m.useContext(Ke),[,L]=m.useState({}),[u,b]=N.useState(null),G=se(t,b),R=De(u),h=_e(l.layers,l.branchedLayers),S=Me(h,l.layersWithOutsidePointerEventsDisabled),T=u?h.indexOf(u):-1,U=l.layersWithOutsidePointerEventsDisabled.size>0,C=S===-1||T>=S;function w(c){if(!p?.anchor)return;let F=!1;c.defaultPrevented||c.detail.originalEvent.type==="pointerdown"&&(F=!0);const te=c.target;(p.anchor.contains(te)||te===p.anchor)&&c.preventDefault(),c.detail.originalEvent.type==="focusin"&&F&&c.preventDefault()}const P=xe(c=>{C&&(d?.(c),o?.(c),p&&w(c),!c.defaultPrevented&&r&&r())},R,y),B=Ae(c=>{i?.(c),o?.(c),p&&w(c),!c.defaultPrevented&&r&&r()},R,y);ke(c=>{T===l.layers.size-1&&(s?.(c),!c.defaultPrevented&&r&&(c.preventDefault(),r()))},R,y),m.useEffect(()=>{if(!(!u||!y))return n&&(l.layersWithOutsidePointerEventsDisabled.size===0&&(oe=R.body.style.pointerEvents,R.body.style.pointerEvents="none"),l.layersWithOutsidePointerEventsDisabled.add(u)),l.layers.add(u),A(),()=>{n&&l.layersWithOutsidePointerEventsDisabled.size===1&&(R.body.style.pointerEvents=oe)}},[u,y,n,l,R]),m.useEffect(()=>()=>{u&&(l.layers.has(u)||l.layersWithOutsidePointerEventsDisabled.has(u))&&(l.layers.delete(u),l.layersWithOutsidePointerEventsDisabled.delete(u),A())},[u,l,y]);const I=m.useContext(ae);m.useEffect(()=>{if(!u||!y||!I||u===I)return;l.branchedLayers.has(I)||l.branchedLayers.set(I,new Set);const c=l.branchedLayers.get(I);return c.add(u),A(),()=>{c.delete(u),c.size===0&&l.branchedLayers.delete(I),A()}},[u,y,I,l]),m.useEffect(()=>{const c=()=>L({});return document.addEventListener(J,c),()=>document.removeEventListener(J,c)},[]);const _=D?pe:"div";return N.createElement(ae.Provider,{value:u},N.createElement(_,Object.assign({},v,{ref:G,style:Object.assign({pointerEvents:U?C?"auto":"none":void 0},v.style),onFocusCapture:z(v.onFocusCapture,B.onFocusCapture),onBlurCapture:z(v.onBlurCapture,B.onBlurCapture),onPointerDownCapture:z(v.onPointerDownCapture,P.onPointerDownCapture)}),a))});function A(){const e=new CustomEvent(J);document.dispatchEvent(e)}function Me(e,t){for(let a=e.length-1;a>=0;a-=1)if(t.has(e[a]))return a;return-1}var qe=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(a[n[r]]=e[n[r]]);return a};const We=m.forwardRef((e,t)=>{var{className:a}=e,n=qe(e,["className"]);const{cn:r}=ie();return N.createElement("div",Object.assign({},n,{ref:t,className:r("navds-popover__content",a)}))});var Ve=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&Object.prototype.propertyIsEnumerable.call(e,n[r])&&(a[n[r]]=e[n[r]]);return a};const Q=m.forwardRef((e,t)=>{var{className:a,children:n,anchorEl:r,arrow:o=!0,open:s,onClose:i,placement:d="top",offset:p,strategy:D,flip:y=!0}=e,v=Ve(e,["className","children","anchorEl","arrow","open","onClose","placement","offset","strategy","flip"]);const{cn:l}=ie(),L=m.useRef(null),u=Re(!1)!==void 0,b=Te(!1),G=D??(u?"fixed":"absolute"),R=b?!1:y,h=ye(!1),{update:S,refs:T,placement:U,middlewareData:{arrow:{x:C,y:w}={}},floatingStyles:P}=Oe({strategy:G,placement:d,open:s,middleware:[Ne(p??(h?.isDarkside?8:o?16:4)),R&&Ie({padding:5,fallbackPlacements:["bottom","top"]}),Pe({padding:12}),be({element:L,padding:8})]});re(()=>{T.setReference(r)},[r,T]);const B=se(T.setFloating,t);re(()=>{if(!T.reference.current||!T.floating.current||!s)return;const _=Ue(T.reference.current,T.floating.current,S);return()=>_()},[T.floating,T.reference,S,s,r]);const I={top:"bottom",right:"left",bottom:"top",left:"right"}[U.split("-")[0]];return N.createElement(He,{asChild:!0,safeZone:{anchor:r},onDismiss:()=>s&&i?.(),enabled:s},N.createElement("div",Object.assign({ref:B},v,{className:l("navds-popover",a,{"navds-popover--hidden":!s||!r}),style:Object.assign(Object.assign({},v.style),P),"data-placement":U,"aria-hidden":!s||!r}),n,o&&!h?.isDarkside&&N.createElement("div",{ref:_=>{L.current=_},style:Object.assign(Object.assign(Object.assign({},C!=null?{left:C}:{}),w!=null?{top:w}:{}),I?{[I]:"-0.5rem"}:{}),className:l("navds-popover__arrow")})))});Q.Content=We;const $e=e=>e.charAt(0).toUpperCase()+e.slice(1),Ye="_days_f0mw9_1",Fe="_cursorAndHoover_f0mw9_30",ze="_srOnly_f0mw9_38",Ze="_blueDay_f0mw9_50",Xe="_darkblueDay_f0mw9_55",Je="_lightblueDay_f0mw9_61",Qe="_lightgreenDay_f0mw9_80",en="_greenDay_f0mw9_99",nn="_greenStripedDay_f0mw9_104",tn="_blueStripedDay_f0mw9_138",rn="_grayDay_f0mw9_172",an="_blackDay_f0mw9_178",on="_blackOutlineDay_f0mw9_184",sn="_blueOutlineDay_f0mw9_189",ln="_greenOutlineDay_f0mw9_207",un="_lightgreenBlueDay_f0mw9_225",dn="_lightblueGreenDay_f0mw9_251",cn="_none_f0mw9_276",mn="_pinkDay_f0mw9_281",fn="_purpleDay_f0mw9_287",g={days:Ye,cursorAndHoover:Fe,srOnly:ze,blueDay:Ze,darkblueDay:Xe,lightblueDay:Je,lightgreenDay:Qe,greenDay:en,greenStripedDay:nn,blueStripedDay:tn,grayDay:rn,blackDay:an,blackOutlineDay:on,blueOutlineDay:sn,greenOutlineDay:ln,lightgreenBlueDay:un,lightblueGreenDay:dn,none:cn,pinkDay:mn,purpleDay:fn};var En={};const pn={NONE:g.none,BLUE:g.blueDay,DARKBLUE:g.darkblueDay,LIGHTGREEN:g.lightgreenDay,GRAY:g.grayDay,PINK:g.pinkDay,PURPLE:g.purpleDay,BLACK:g.blackDay,BLACKOUTLINE:g.blackOutlineDay,BLUEOUTLINE:g.blueOutlineDay,GREENOUTLINE:g.greenOutlineDay,LIGHTBLUE:g.lightblueDay,GREEN:g.greenDay,LIGHTBLUEGREEN:g.lightblueGreenDay,LIGHTGREENBLUE:g.lightgreenBlueDay,GREENSTRIPED:g.greenStripedDay,BLUESTRIPED:g.blueStripedDay},ce=N.memo(({isoDate:e,periodeColor:t,isFocused:a,srText:n,dateTooltipCallback:r,dateClickCallback:o,setFocusedDate:s})=>{const i=E(e),d=i.date();me(`Rendering Day: ${d}, Color: ${t}`);const p=m.useRef(null),[D,y]=m.useState(!1);m.useEffect(()=>{a&&p.current?.focus()},[a]);const v=!!o&&!Y(i);return f.jsxs("button",{ref:p,type:"button","data-testid":`day:${d};dayColor:${t}`,tabIndex:a?0:-1,className:`${g.days} ${pn[t]} ${v&&g.cursorAndHoover}`,onFocus:v?()=>s(i):void 0,onMouseOver:r?()=>y(!0):void 0,onMouseLeave:r?()=>y(!1):void 0,onClick:v?()=>o(e):void 0,onKeyDown:o?l=>gn(l,i,o,s):void 0,children:[d,n&&f.jsx("span",{className:g.srOnly,children:n}),r&&yn(t)&&f.jsx(Q,{open:D,onClose:()=>y(!1),anchorEl:p.current,children:f.jsx(Q.Content,{children:r(e)})})]})}),yn=e=>e!=="NONE"&&e!=="GRAY",Y=e=>e.isoWeekday()===6||e.isoWeekday()===7,me=e=>{const t=typeof process<"u"&&En.VITEST==="true";globalThis.location.hostname==="localhost"&&!t&&console.log(e)},gn=(e,t,a,n)=>{if(e.key==="Tab")return;e.preventDefault();const r=!!a&&!Y(t);switch(e.key){case"ArrowLeft":n(t.subtract(1,"day"));break;case"ArrowRight":n(t.add(1,"day"));break;case"ArrowUp":n(t.subtract(7,"day"));break;case"ArrowDown":n(t.add(7,"day"));break;case"Enter":case" ":r&&a(t.format(Le))}};ce.__docgenInfo={description:"",methods:[],displayName:"Day",props:{isoDate:{required:!0,tsType:{name:"string"},description:""},periodeColor:{required:!0,tsType:{name:"union",raw:`| 'NONE'
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
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}]},description:""},isFocused:{required:!0,tsType:{name:"boolean"},description:""},srText:{required:!1,tsType:{name:"string"},description:""},dateTooltipCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => React.ReactNode | string",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"union",raw:"React.ReactNode | string",elements:[{name:"ReactReactNode",raw:"React.ReactNode"},{name:"string"}]}}},description:""},dateClickCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => void",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"void"}}},description:""},setFocusedDate:{required:!0,tsType:{name:"signature",type:"function",raw:"(date: Dayjs) => void",signature:{arguments:[{type:{name:"Dayjs"},name:"date"}],return:{name:"void"}}},description:""}}};const vn="_weeknr_6j43u_1",Ln="_weekday_6j43u_12",Z={weeknr:vn,weekday:Ln};E.extend(le);const fe=N.memo(({year:e,month:t,isFirstMonth:a,showWeekNumbers:n,periods:r,focusedDate:o,dateTooltipCallback:s,dateClickCallback:i,setFocusedDate:d})=>{me(`Rendering Month: ${t}-${e}`);const p=m.useMemo(()=>Dn(r),[r]),D=E().year(e).month(t).startOf("month"),y=D.daysInMonth(),v=D.isoWeekday(),l=D.endOf("month").isoWeekday(),L=D.isoWeek(),u=Math.ceil((y+(v-1)+(7-l))/7),b=n?8:7,G=Array.from({length:7},(R,h)=>D.isoWeekday(h+1).format("dd"));return f.jsx(Ce.New,{borderWidth:"1",maxWidth:"400px",padding:"3",borderRadius:"4",borderColor:"neutral-subtle","data-testid":`year:${e};month:${t}`,children:f.jsxs(ne,{gap:"space-12",children:[f.jsx(we,{size:"small",level:"4",align:"center",children:`${$e(D.format("MMMM"))} ${e}`}),f.jsxs("div",{children:[f.jsxs(X,{columns:b,children:[n&&f.jsx("div",{className:Z.weeknr}),G.map(R=>f.jsx("div",{className:Z.weekday,children:R},R))]}),Array.from({length:u}).map((R,h)=>f.jsxs(X,{columns:b,children:[n&&f.jsx("div",{className:Z.weeknr,children:L+h},`weeknr-${h}`),Array.from({length:7}).map((S,T)=>{const U=h*7+T,C=h===0&&T<v-1,w=h===u-1&&T>=l;if(C||w)return f.jsx("div",{},`empty-${U}`);const P=D.add(U-(v-1),"day"),B=p.get(P.format("YYYY-MM-DD"));return f.jsx(ce,{isoDate:ge(P),periodeColor:hn(P,B),srText:B?.srText,dateTooltipCallback:s,dateClickCallback:i,isFocused:o?.isSame(P,"day")??(a&&U===v-1)??!1,setFocusedDate:d},`${e}-${t}-${P.date()}`)})]},`week-${h}`))]})]})})},(e,t)=>{const a=Object.keys(e);for(const n of a)if(n!=="periods"&&e[n]!==t[n])return!1;if(e.periods.length!==t.periods.length)return!1;for(let n=0;n<e.periods.length;n++){const r=e.periods[n],o=t.periods[n],s=Object.keys(r);for(const i of s)if(r[i]!==o[i])return!1}return!0}),hn=(e,t)=>t?t.color==="PINK"?"PINK":t.color==="PURPLE"?"PURPLE":Y(e)?"GRAY":t.color:Y(e)?"GRAY":"NONE",Dn=e=>{const t=new Map;for(const a of e){let n=E(a.fom);const r=E(a.tom);for(;!n.isAfter(r,"day");){const o=n.format("YYYY-MM-DD");(!t.has(o)||a.isSelected)&&t.set(o,a),n=n.add(1,"day")}}return t};fe.__docgenInfo={description:"",methods:[],displayName:"Month",props:{year:{required:!0,tsType:{name:"number"},description:""},month:{required:!0,tsType:{name:"number"},description:""},isFirstMonth:{required:!0,tsType:{name:"boolean"},description:""},showWeekNumbers:{required:!0,tsType:{name:"boolean"},description:""},periods:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}],required:!0}},{key:"srText",value:{name:"string",required:!1}},{key:"isSelected",value:{name:"boolean",required:!1}}]}}],raw:"CalendarPeriod[]"},description:""},focusedDate:{required:!0,tsType:{name:"union",raw:"Dayjs | undefined",elements:[{name:"Dayjs"},{name:"undefined"}]},description:""},dateTooltipCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => React.ReactElement | string",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"union",raw:"React.ReactElement | string",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"string"}]}}},description:""},dateClickCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => void",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"void"}}},description:""},setFocusedDate:{required:!0,tsType:{name:"signature",type:"function",raw:"(date: Dayjs) => void",signature:{arguments:[{type:{name:"Dayjs"},name:"date"}],return:{name:"void"}}},description:""}}};E.extend(le);E.extend(ve);const k=({periods:e,showWeekNumbers:t=!0,nrOfColumns:a=2,isRangeSelection:n=!1,firstDateInCalendar:r,lastDateInCalendar:o,dateTooltipCallback:s,setSelectedPeriods:i,getSrTextForSelectedPeriod:d})=>{const[p,D]=m.useState(),y=m.useMemo(()=>Rn(r,o),[e,r,o]),v=m.useMemo(()=>On(y,e),[y,e]),l=m.useCallback(L=>bn(n,d,i)(L),[n,d,i]);return f.jsxs(ne,{gap:"space-16",children:[!i&&e.some(L=>L.srText)&&f.jsx("div",{className:"sr-only",children:e.filter(L=>L.srText).map(L=>L.srText).toString()}),f.jsx(X,{gap:"space-12",columns:{sm:1,md:a},children:y.map(({month:L,year:u},b)=>{const G=v.get(Ee(u,L))??[],R=p?.year()===u&&p?.month()===L;return f.jsx(fe,{isFirstMonth:b===0,year:u,month:L,periods:G,showWeekNumbers:t,dateTooltipCallback:s,dateClickCallback:i?l:void 0,focusedDate:R?p:void 0,setFocusedDate:D},`${u}-${L}`)})})]})},Rn=(e,t)=>{const a=E(e),n=t?E(t):E(e).add(6,"month"),r=Tn(a,n);return Array.from({length:r+1},(o,s)=>{const i=a.add(s,"month");return{month:i.month(),year:i.year()}})},Tn=(e,t)=>{let a=(t.year()-e.year())*12;return a+=t.month()-e.month(),Math.max(a,0)},Ee=(e,t)=>`${e}-${t}`,On=(e,t)=>{const a=new Map;for(const{year:n,month:r}of e){const o=E().year(n).month(r).startOf("month"),s=o.endOf("month"),i=t.filter(d=>E(d.tom).isSameOrAfter(o,"day")&&E(d.fom).isSameOrBefore(s,"day"));a.set(Ee(n,r),i)}return a},Nn=(e,t)=>E(t.fom).isBefore(E(e))?t.fom:e,In=(e,t)=>{const a=E(e);return E(t.tom).isAfter(a)&&E(t.fom).isBefore(a)||E(t.tom).isBefore(a)?e:t.tom},Pn=(e,t)=>E(e.fom).diff(E(t.fom)),bn=(e,t,a)=>n=>{!a||!t||a(e?r=>{const o=r.length===0?n:Nn(n,r[0]),s=r.length===0?n:In(n,r[0]);return r.some(i=>i.fom===n||i.tom===n)?[]:[{color:"DARKBLUE",fom:o,tom:s,isSelected:!0,srText:t({fom:o,tom:s})}]}:r=>r.some(o=>o.fom===n)?r.filter(o=>o.fom!==n):[...r,{color:"DARKBLUE",fom:n,tom:n,isSelected:!0,srText:t({fom:n,tom:n})}].sort(Pn))};k.__docgenInfo={description:"",methods:[],displayName:"Calendar",props:{periods:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}],required:!0}},{key:"srText",value:{name:"string",required:!1}},{key:"isSelected",value:{name:"boolean",required:!1}}]}}],raw:"CalendarPeriod[]"},description:""},showWeekNumbers:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},nrOfColumns:{required:!1,tsType:{name:"union",raw:"1 | 2 | 3",elements:[{name:"literal",value:"1"},{name:"literal",value:"2"},{name:"literal",value:"3"}]},description:"",defaultValue:{value:"2",computed:!1}},isRangeSelection:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},firstDateInCalendar:{required:!0,tsType:{name:"string"},description:""},lastDateInCalendar:{required:!1,tsType:{name:"string"},description:""},dateTooltipCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => React.ReactElement | string",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"union",raw:"React.ReactElement | string",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"string"}]}}},description:""},setSelectedPeriods:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: React.SetStateAction<CalendarPeriod[]>) => void",signature:{arguments:[{type:{name:"ReactSetStateAction",raw:"React.SetStateAction<CalendarPeriod[]>",elements:[{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}],required:!0}},{key:"srText",value:{name:"string",required:!1}},{key:"isSelected",value:{name:"boolean",required:!1}}]}}],raw:"CalendarPeriod[]"}]},name:"value"}],return:{name:"void"}}},description:""},getSrTextForSelectedPeriod:{required:!1,tsType:{name:"signature",type:"function",raw:"(period: { fom: string; tom: string }) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{ fom: string; tom: string }",signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}}]}},name:"period"}],return:{name:"string"}}},description:""}}};const Fn={title:"Calendar",component:k,render:e=>f.jsx("div",{children:f.jsx(k,{...e})})},O={args:{firstDateInCalendar:"2024-01-31",lastDateInCalendar:"2024-08-30",periods:[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE"},{fom:"2024-02-21",tom:"2024-02-21",color:"PINK"},{fom:"2024-02-22",tom:"2024-05-05",color:"BLUE"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN"}]}},x={args:{...O.args,showWeekNumbers:!1}},j={args:{...O.args,dateTooltipCallback:e=>f.jsxs(ne,{gap:"space-4",children:[f.jsx(Be,{children:"Dette er en tooltip"}),f.jsx(Se,{children:e})]})}},K={args:O.args,render:()=>{const e=[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN"}],t=(o,s)=>E(o.fom).diff(E(s.fom)),[a,n]=m.useState(e),r=o=>{n(s=>(typeof o=="function"?o(s):o).sort(t))};return f.jsx(k,{periods:a,isRangeSelection:!1,setSelectedPeriods:r,firstDateInCalendar:e[0].fom,lastDateInCalendar:e[1].tom})}},H={args:O.args,render:()=>{const e=[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN"}],t=(o,s)=>E(o.fom).diff(E(s.fom)),[a,n]=m.useState(e),r=o=>{n(s=>(typeof o=="function"?o(s):o).sort(t))};return f.jsx(k,{periods:a,isRangeSelection:!0,setSelectedPeriods:r,firstDateInCalendar:e[0].fom,lastDateInCalendar:e[1].tom})}},M={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN"}],firstDateInCalendar:"2024-01-31",lastDateInCalendar:"2024-08-30"}},q={args:{periods:[{fom:"2024-02-01",tom:"2024-02-20",color:"BLUE"},{fom:"2025-05-06",tom:"2025-07-30",color:"LIGHTGREEN"}],firstDateInCalendar:"2024-02-01",lastDateInCalendar:"2025-07-30"}},W={args:{...O.args,nrOfColumns:1}},V={args:{...O.args,nrOfColumns:2}},$={args:{...O.args,nrOfColumns:3}};O.parameters={...O.parameters,docs:{...O.parameters?.docs,source:{originalSource:`{
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
}`,...O.parameters?.docs?.source}}};x.parameters={...x.parameters,docs:{...x.parameters?.docs,source:{originalSource:`{
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
}`,...j.parameters?.docs?.source}}};K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
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
}`,...K.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
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
}`,...H.parameters?.docs?.source}}};M.parameters={...M.parameters,docs:{...M.parameters?.docs,source:{originalSource:`{
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
}`,...q.parameters?.docs?.source}}};W.parameters={...W.parameters,docs:{...W.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    nrOfColumns: 1
  }
}`,...W.parameters?.docs?.source}}};V.parameters={...V.parameters,docs:{...V.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    nrOfColumns: 2
  }
}`,...V.parameters?.docs?.source}}};$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    nrOfColumns: 3
  }
}`,...$.parameters?.docs?.source}}};const zn=["Default","IkkeVisUkenr","MedTooltip","VisKalenderMedValgAvEnkeltdager","VisKalenderMedValgAvPerioder","PeriodsWithGap","PeriodsThatSpanOverAYear","MedEnKolonne","MedToKolonner","MedTreKolonner"];export{O as Default,x as IkkeVisUkenr,W as MedEnKolonne,V as MedToKolonner,j as MedTooltip,$ as MedTreKolonner,q as PeriodsThatSpanOverAYear,M as PeriodsWithGap,K as VisKalenderMedValgAvEnkeltdager,H as VisKalenderMedValgAvPerioder,zn as __namedExportsOrder,Fn as default};
