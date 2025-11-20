import{r as c,c as ye,R as N,m as ve,a as oe,S as he,b as ie,d as be,e as g,j as E}from"./iframe-D7qEvF2q.js";import{f as Le,i as le,a as Ne}from"./UttaksdagenString-a-COV5ev.js";import{I as Te}from"./dates-C3skuUil.js";import{R as Re,u as Ie,a as De,b as Oe,o as Pe,f as Ue,s as Ge,c as _e,d as Se}from"./Date.Input-CyX-sJtf.js";import"./useId-PtGkl7EV.js";import{u as ee}from"./ChevronDown-Bk6SSHuS.js";import{B as Be}from"./Box-D7YL_DUG.js";import{V as de}from"./VStack-DmzuCvRw.js";import{H as Ce,B as xe,D as we}from"./Label-DAM5JRpd.js";import{H as J}from"./HGrid-DkTgrfv8.js";import"./preload-helper-D9Z9MdNV.js";import"./index-BEz07jCO.js";import"./Provider-ogFSxdpt.js";import"./useId-BEnIzx8P.js";import"./composeEventHandlers-krbYd5LM.js";import"./Calendar-UHOemj7m.js";import"./BasePrimitive-SeQSUEmR.js";const F=globalThis?.document?c.useLayoutEffect:()=>{};function te(t){return t.sort((e,r)=>{const n=e.compareDocumentPosition(r);if(n&Node.DOCUMENT_POSITION_FOLLOWING||n&Node.DOCUMENT_POSITION_CONTAINED_BY)return-1;if(n&Node.DOCUMENT_POSITION_PRECEDING||n&Node.DOCUMENT_POSITION_CONTAINS)return 1;if(n&Node.DOCUMENT_POSITION_DISCONNECTED||n&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC)throw Error("Cannot sort the given nodes.");return 0})}const ke=t=>typeof t=="object"&&"nodeType"in t&&t.nodeType===Node.ELEMENT_NODE;function ne(t,e,r){let n=t+1;return r&&n>=e&&(n=0),n}function re(t,e,r){let n=t-1;return r&&n<0&&(n=e),n}const Z=t=>t;class Ae{constructor(){this.descendants=new Map,this.register=e=>{if(e!=null)return ke(e)?this.registerNode(e):r=>{this.registerNode(r,e)}},this.unregister=e=>{this.descendants.delete(e);const r=te(Array.from(this.descendants.keys()));this.assignIndex(r)},this.destroy=()=>{this.descendants.clear()},this.assignIndex=e=>{this.descendants.forEach(r=>{const n=e.indexOf(r.node);r.index=n,r.node.dataset.index=r.index.toString()})},this.count=()=>this.descendants.size,this.enabledCount=()=>this.enabledValues().length,this.values=()=>Array.from(this.descendants.values()).sort((r,n)=>r.index-n.index),this.enabledValues=()=>this.values().filter(e=>!e.disabled),this.item=e=>{if(this.count()!==0)return this.values()[e]},this.enabledItem=e=>{if(this.enabledCount()!==0)return this.enabledValues()[e]},this.first=()=>this.item(0),this.firstEnabled=()=>this.enabledItem(0),this.last=()=>this.item(this.descendants.size-1),this.lastEnabled=()=>{const e=this.enabledValues().length-1;return this.enabledItem(e)},this.indexOf=e=>{var r,n;return e&&(n=(r=this.descendants.get(e))===null||r===void 0?void 0:r.index)!==null&&n!==void 0?n:-1},this.enabledIndexOf=e=>e==null?-1:this.enabledValues().findIndex(r=>r.node.isSameNode(e)),this.next=(e,r=!0)=>{const n=ne(e,this.count(),r);return this.item(n)},this.nextEnabled=(e,r=!0)=>{const n=this.item(e);if(!n)return;const a=this.enabledIndexOf(n.node),s=ne(a,this.enabledCount(),r);return this.enabledItem(s)},this.prev=(e,r=!0)=>{const n=re(e,this.count()-1,r);return this.item(n)},this.prevEnabled=(e,r=!0)=>{const n=this.item(e);if(!n)return;const a=this.enabledIndexOf(n.node),s=re(a,this.enabledCount()-1,r);return this.enabledItem(s)},this.registerNode=(e,r)=>{if(!e)return;const n=this.descendants.get(e);if(n){this.descendants.set(e,Object.assign({index:n.index,node:e},r));return}const a=Array.from(this.descendants.keys()).concat(e),s=te(a);r?.disabled&&(r.disabled=!!r.disabled);const o=Object.assign({node:e,index:-1},r);this.descendants.set(e,o),this.assignIndex(s)}}}function je(){const[t,e]=ye({name:"DescendantsProvider",errorMessage:"useDescendantsContext must be used within DescendantsProvider"}),r=Z(s=>N.createElement(t,Object.assign({},s.value),s.children));function n(s){const o=e(),[u,m]=c.useState(-1),p=c.useRef(null);F(()=>()=>{p.current&&o.unregister(p.current)},[]),F(()=>{if(!p.current)return;const l=Number(p.current.dataset.index);u!==l&&!Number.isNaN(l)&&m(l)});const i=Z(s?o.register(s):o.register);return{descendants:o,index:u,enabledIndex:o.enabledIndexOf(p.current),register:ve([i,p])}}function a(){return c.useRef(new Ae).current}return[r,e,a,n]}function Me(t,e=globalThis?.document){const r=ee(t);c.useEffect(()=>{const n=a=>{a.key==="Escape"&&r(a)};return e.addEventListener("keydown",n,!0),()=>e.removeEventListener("keydown",n,!0)},[r,e])}const ue={FOCUS_OUTSIDE:"AKSEL_FOCUS_OUTSIDE",POINTER_DOWN_OUTSIDE:"AKSEL_POINTER_DOWN_OUTSIDE"};function ce(t,e,r,{discrete:n}={discrete:!1}){if(!e)return;const a=r.originalEvent.target,s=new CustomEvent(t,{bubbles:!1,cancelable:!0,detail:r});a.addEventListener(t,e,{once:!0}),n&&a?Re.flushSync(()=>a.dispatchEvent(s)):a.dispatchEvent(s)}function He(t,e=globalThis?.document){const r=ee(t),n=c.useRef(!1);return c.useEffect(()=>{const a=s=>{if(s.target&&!n.current){const o={originalEvent:s};ce(ue.FOCUS_OUTSIDE,r,o)}};return e.addEventListener("focusin",a),()=>e.removeEventListener("focusin",a)},[e,r]),{onFocusCapture:()=>{n.current=!0},onBlurCapture:()=>{n.current=!1}}}function Ke(t,e=globalThis?.document){const r=ee(t),n=c.useRef(!1),a=c.useRef(()=>{});return c.useEffect(()=>{const s=u=>{function m(){ce(ue.POINTER_DOWN_OUTSIDE,r,{originalEvent:u},{discrete:!0})}u.target&&!n.current?u.pointerType==="touch"?(e.removeEventListener("click",a.current),a.current=m,e.addEventListener("click",a.current,{once:!0})):m():e.removeEventListener("click",a.current),n.current=!1},o=window.setTimeout(()=>{e.addEventListener("pointerdown",s)},0);return()=>{window.clearTimeout(o),e.removeEventListener("pointerdown",s),e.removeEventListener("click",a.current)}},[e,r]),{onPointerDownCapture:()=>{n.current=!0}}}var qe=function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(t);a<n.length;a++)e.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(t,n[a])&&(r[n[a]]=t[n[a]]);return r};const[Ve,Ye,$e,Fe]=je();let C=0,ae;const We=c.forwardRef((t,e)=>Ye(!1)?N.createElement(se,Object.assign({ref:e},t)):N.createElement(ze,null,N.createElement(se,Object.assign({ref:e},t)))),ze=({children:t})=>{const e=$e();return N.createElement(Ve,{value:e},t)},se=c.forwardRef((t,e)=>{var r,{children:n,asChild:a,onEscapeKeyDown:s,onPointerDownOutside:o,onFocusOutside:u,onInteractOutside:m,onDismiss:p,safeZone:i,disableOutsidePointerEvents:l=!1,enabled:d=!0}=t,h=qe(t,["children","asChild","onEscapeKeyDown","onPointerDownOutside","onFocusOutside","onInteractOutside","onDismiss","safeZone","disableOutsidePointerEvents","enabled"]);const[,T]=c.useState({}),{register:R,index:P,descendants:D}=Fe({disableOutsidePointerEvents:l,disabled:!d,forceUpdate:()=>T({})}),[L,b]=c.useState(null),x=oe(b,R,e),y=(r=L?.ownerDocument)!==null&&r!==void 0?r:globalThis?.document,O=c.useRef(!1),U=c.useRef(!1),_=(()=>{let f=-1;return D.enabledValues().forEach((j,S)=>{j.disableOutsidePointerEvents&&(f=S)}),{isPointerEventsEnabled:P>=f,isBodyPointerEventsDisabled:C>0,pointerStyle:P>=f&&C>0?"auto":void 0}})();function I(f){var A,j;if(!i?.anchor&&!i?.dismissable||!d)return;f.defaultPrevented||(O.current=!0,f.detail.originalEvent.type==="pointerdown"&&(U.current=!0));const S=f.target;f.detail.originalEvent.type==="pointerdown"?(!((A=i?.anchor)===null||A===void 0)&&A.contains(S)||S===i?.anchor)&&f.preventDefault():!(S instanceof HTMLElement&&![i?.anchor,i?.dismissable].some(z=>z?.contains(S))&&!S.contains((j=i?.dismissable)!==null&&j!==void 0?j:null))&&f.preventDefault(),f.detail.originalEvent.type==="focusin"&&U.current&&f.preventDefault(),U.current=!1,O.current=!1}const B=Ke(f=>{!_.isPointerEventsEnabled||!d||(o?.(f),m?.(f),i&&I(f),!f.defaultPrevented&&p&&p())},y),w=He(f=>{d&&(u?.(f),m?.(f),i&&I(f),!f.defaultPrevented&&p&&p())},y);Me(f=>{!d||!(P===D.enabledCount()-1)||(s?.(f),!f.defaultPrevented&&p&&(f.preventDefault(),p()))},y),c.useEffect(()=>{if(!(!L||!d||!l))return C===0&&(ae=y.body.style.pointerEvents,y.body.style.pointerEvents="none"),C++,()=>{C===1&&(y.body.style.pointerEvents=ae),C--}},[L,y,l,D,d]),c.useEffect(()=>()=>D.values().forEach(f=>f.forceUpdate()),[D,L]);const k=a?he:"div";return N.createElement(k,Object.assign({ref:x},h,{onFocusCapture:w.onFocusCapture,onBlurCapture:w.onBlurCapture,onPointerDownCapture:B.onPointerDownCapture,style:Object.assign({pointerEvents:_.pointerStyle},h.style)}),n)});var Ze=function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(t);a<n.length;a++)e.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(t,n[a])&&(r[n[a]]=t[n[a]]);return r};const Xe=c.forwardRef((t,e)=>{var{className:r}=t,n=Ze(t,["className"]);const{cn:a}=ie();return N.createElement("div",Object.assign({},n,{ref:e,className:a("navds-popover__content",r)}))});var Je=function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(t);a<n.length;a++)e.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(t,n[a])&&(r[n[a]]=t[n[a]]);return r};const Q=c.forwardRef((t,e)=>{var{className:r,children:n,anchorEl:a,arrow:s=!0,open:o,onClose:u,placement:m="top",offset:p,strategy:i,flip:l=!0}=t,d=Je(t,["className","children","anchorEl","arrow","open","onClose","placement","offset","strategy","flip"]);const{cn:h}=ie(),T=c.useRef(null),R=Ie(!1)!==void 0,P=De(!1),D=i??(R?"fixed":"absolute"),L=P?!1:l,b=be(!1),{update:x,refs:y,placement:O,middlewareData:{arrow:{x:U,y:_}={}},floatingStyles:I}=Oe({strategy:D,placement:m,open:o,middleware:[Pe(p??(b?.isDarkside?8:s?16:4)),L&&Ue({padding:5,fallbackPlacements:["bottom","top"]}),Ge({padding:12}),_e({element:T,padding:8})]});F(()=>{y.setReference(a)},[a]);const B=oe(y.setFloating,e);F(()=>{if(!y.reference.current||!y.floating.current||!o)return;const k=Se(y.reference.current,y.floating.current,x);return()=>k()},[y.floating,y.reference,x,o,a]);const w={top:"bottom",right:"left",bottom:"top",left:"right"}[O.split("-")[0]];return N.createElement(We,{asChild:!0,safeZone:{anchor:a,dismissable:y.floating.current},onDismiss:()=>o&&u?.(),enabled:o},N.createElement("div",Object.assign({ref:B},d,{className:h("navds-popover",r,{"navds-popover--hidden":!o||!a}),style:Object.assign(Object.assign({},d.style),I),"data-placement":O,"aria-hidden":!o||!a}),n,s&&!b?.isDarkside&&N.createElement("div",{ref:k=>{T.current=k},style:Object.assign(Object.assign(Object.assign({},U!=null?{left:U}:{}),_!=null?{top:_}:{}),w?{[w]:"-0.5rem"}:{}),className:h("navds-popover__arrow")})))});Q.Content=Xe;const Qe=t=>t.charAt(0).toUpperCase()+t.slice(1),et="_days_11aro_1",tt="_cursorAndHoover_11aro_30",nt="_srOnly_11aro_38",rt="_blueDay_11aro_50",at="_darkblueDay_11aro_55",st="_lightblueDay_11aro_61",ot="_lightgreenDay_11aro_80",it="_greenDay_11aro_99",lt="_greenStripedDay_11aro_104",dt="_blueStripedDay_11aro_138",ut="_grayDay_11aro_172",ct="_blackDay_11aro_178",mt="_blackOutlineDay_11aro_184",ft="_blueOutlineDay_11aro_189",Et="_greenOutlineDay_11aro_207",pt="_lightgreenBlueDay_11aro_225",gt="_lightblueGreenDay_11aro_251",yt="_none_11aro_276",vt="_pinkDay_11aro_281",ht="_purpleDay_11aro_287",v={days:et,cursorAndHoover:tt,srOnly:nt,blueDay:rt,darkblueDay:at,lightblueDay:st,lightgreenDay:ot,greenDay:it,greenStripedDay:lt,blueStripedDay:dt,grayDay:ut,blackDay:ct,blackOutlineDay:mt,blueOutlineDay:ft,greenOutlineDay:Et,lightgreenBlueDay:pt,lightblueGreenDay:gt,none:yt,pinkDay:vt,purpleDay:ht};var bt={};const Lt={NONE:v.none,BLUE:v.blueDay,DARKBLUE:v.darkblueDay,LIGHTGREEN:v.lightgreenDay,GRAY:v.grayDay,PINK:v.pinkDay,PURPLE:v.purpleDay,BLACK:v.blackDay,BLACKOUTLINE:v.blackOutlineDay,BLUEOUTLINE:v.blueOutlineDay,GREENOUTLINE:v.greenOutlineDay,LIGHTBLUE:v.lightblueDay,GREEN:v.greenDay,LIGHTBLUEGREEN:v.lightblueGreenDay,LIGHTGREENBLUE:v.lightgreenBlueDay,GREENSTRIPED:v.greenStripedDay,BLUESTRIPED:v.blueStripedDay},me=N.memo(({isoDate:t,periodeColor:e,isFocused:r,srText:n,dateTooltipCallback:a,dateClickCallback:s,setFocusedDate:o})=>{const u=g(t),m=u.date();fe(`Rendering Day: ${m}, Color: ${e}`);const p=c.useRef(null),[i,l]=c.useState(!1);c.useEffect(()=>{r&&p.current?.focus()},[r]);const d=!!s&&!W(u);return E.jsxs("button",{ref:p,type:"button","data-testid":`day:${m};dayColor:${e}`,tabIndex:r?0:-1,className:`${v.days} ${Lt[e]} ${d&&v.cursorAndHoover}`,onFocus:d?()=>o(u):void 0,onMouseOver:a?()=>l(!0):void 0,onMouseLeave:a?()=>l(!1):void 0,onClick:d?()=>s(t):void 0,onKeyDown:s?h=>Tt(h,u,s,o):void 0,children:[m,n&&E.jsx("span",{className:v.srOnly,children:n}),a&&Nt(e)&&E.jsx(Q,{open:i,onClose:()=>l(!1),anchorEl:p.current,children:E.jsx(Q.Content,{children:a(t)})})]})}),Nt=t=>t!=="NONE"&&t!=="GRAY",W=t=>t.isoWeekday()===6||t.isoWeekday()===7,fe=t=>{const e=typeof process<"u"&&bt.VITEST==="true";globalThis.location.hostname==="localhost"&&!e&&console.log(t)},Tt=(t,e,r,n)=>{t.preventDefault();const a=!!r&&!W(e);switch(t.key){case"ArrowLeft":n(e.subtract(1,"day"));break;case"ArrowRight":n(e.add(1,"day"));break;case"ArrowUp":n(e.subtract(7,"day"));break;case"ArrowDown":n(e.add(7,"day"));break;case"Enter":case" ":a&&r(e.format(Te))}};me.__docgenInfo={description:"",methods:[],displayName:"Day",props:{isoDate:{required:!0,tsType:{name:"string"},description:""},periodeColor:{required:!0,tsType:{name:"union",raw:`| 'NONE'
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
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}]},description:""},isFocused:{required:!0,tsType:{name:"boolean"},description:""},srText:{required:!1,tsType:{name:"string"},description:""},dateTooltipCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => React.ReactNode | string",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"union",raw:"React.ReactNode | string",elements:[{name:"ReactReactNode",raw:"React.ReactNode"},{name:"string"}]}}},description:""},dateClickCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => void",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"void"}}},description:""},setFocusedDate:{required:!0,tsType:{name:"signature",type:"function",raw:"(date: Dayjs) => void",signature:{arguments:[{type:{name:"Dayjs"},name:"date"}],return:{name:"void"}}},description:""}}};const Rt="_weeknr_6j43u_1",It="_weekday_6j43u_12",X={weeknr:Rt,weekday:It};g.extend(le);const Ee=N.memo(({year:t,month:e,isFirstMonth:r,showWeekNumbers:n,periods:a,focusedDate:s,dateTooltipCallback:o,dateClickCallback:u,setFocusedDate:m})=>{fe(`Rendering Month: ${e}-${t}`);const p=c.useMemo(()=>Ot(a),[a]),i=g().year(t).month(e).startOf("month"),l=i.daysInMonth(),d=i.isoWeekday(),h=i.endOf("month").isoWeekday(),T=i.isoWeek(),R=Math.ceil((l+(d-1)+(7-h))/7),P=n?8:7,D=Array.from({length:7},(L,b)=>i.isoWeekday(b+1).format("dd"));return E.jsx(Be.New,{borderWidth:"1",maxWidth:"400px",padding:"3",borderRadius:"4",borderColor:"neutral-subtle","data-testid":`year:${t};month:${e}`,children:E.jsxs(de,{gap:"space-12",children:[E.jsx(Ce,{size:"small",level:"4",align:"center",children:`${Qe(i.format("MMMM"))} ${t}`}),E.jsxs("div",{children:[E.jsxs(J,{columns:P,children:[n&&E.jsx("div",{className:X.weeknr}),D.map(L=>E.jsx("div",{className:X.weekday,children:L},L))]}),Array.from({length:R}).map((L,b)=>E.jsxs(J,{columns:P,children:[n&&E.jsx("div",{className:X.weeknr,children:T+b},`weeknr-${b}`),Array.from({length:7}).map((x,y)=>{const O=b*7+y,U=b===0&&y<d-1,_=b===R-1&&y>=h;if(U||_)return E.jsx("div",{},`empty-${O}`);const I=i.add(O-(d-1),"day"),B=p.get(I.format("YYYY-MM-DD"));return E.jsx(me,{isoDate:Le(I),periodeColor:Dt(I,B),srText:B?.srText,dateTooltipCallback:o,dateClickCallback:u,isFocused:s?.isSame(I,"day")??(r&&O===d-1)??!1,setFocusedDate:m},`${t}-${e}-${I.date()}`)})]},`week-${b}`))]})]})})},(t,e)=>{const r=Object.keys(t);for(const n of r)if(n!=="periods"&&t[n]!==e[n])return!1;if(t.periods.length!==e.periods.length)return!1;for(let n=0;n<t.periods.length;n++){const a=t.periods[n],s=e.periods[n],o=Object.keys(a);for(const u of o)if(a[u]!==s[u])return!1}return!0}),Dt=(t,e)=>e?e.color==="PINK"?"PINK":e.color==="PURPLE"?"PURPLE":W(t)?"GRAY":e.color:W(t)?"GRAY":"NONE",Ot=t=>{const e=new Map;for(const r of t){let n=g(r.fom);const a=g(r.tom);for(;!n.isAfter(a,"day");){const s=n.format("YYYY-MM-DD");(!e.has(s)||r.isSelected)&&e.set(s,r),n=n.add(1,"day")}}return e};Ee.__docgenInfo={description:"",methods:[],displayName:"Month",props:{year:{required:!0,tsType:{name:"number"},description:""},month:{required:!0,tsType:{name:"number"},description:""},isFirstMonth:{required:!0,tsType:{name:"boolean"},description:""},showWeekNumbers:{required:!0,tsType:{name:"boolean"},description:""},periods:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}],required:!0}},{key:"srText",value:{name:"string",required:!1}},{key:"isSelected",value:{name:"boolean",required:!1}}]}}],raw:"CalendarPeriod[]"},description:""},focusedDate:{required:!0,tsType:{name:"union",raw:"Dayjs | undefined",elements:[{name:"Dayjs"},{name:"undefined"}]},description:""},dateTooltipCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => React.ReactElement | string",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"union",raw:"React.ReactElement | string",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"string"}]}}},description:""},dateClickCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => void",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"void"}}},description:""},setFocusedDate:{required:!0,tsType:{name:"signature",type:"function",raw:"(date: Dayjs) => void",signature:{arguments:[{type:{name:"Dayjs"},name:"date"}],return:{name:"void"}}},description:""}}};g.extend(le);g.extend(Ne);const M=({periods:t,showWeekNumbers:e=!0,dateTooltipCallback:r,setSelectedPeriods:n,isRangeSelection:a=!1,getSrTextForSelectedPeriod:s})=>{const o=c.useMemo(()=>Ut(t[0].fom,Pt(t)),[t]),u=c.useMemo(()=>_t(o,t),[o,t]),[m,p]=c.useState(),i=c.useCallback(l=>{!n||!s||n(a?d=>{const h=d.length===0?l:St(d[0],l),T=d.length===0?l:Bt(d[0],l);return d.some(R=>R.fom===l||R.tom===l)?[]:[{color:"DARKBLUE",fom:h,tom:T,isSelected:!0,srText:s({fom:h,tom:T})}]}:d=>d.some(h=>h.fom===l)?d.filter(h=>h.fom!==l):[...d,{color:"DARKBLUE",fom:l,tom:l,isSelected:!0,srText:s({fom:l,tom:l})}].sort(Ct))},[a,s,n]);return E.jsxs(E.Fragment,{children:[!n&&t.some(l=>l.srText)&&E.jsx("div",{className:"sr-only",children:t.filter(l=>l.srText).map(l=>l.srText).toString()}),E.jsx(J,{gap:"space-12",columns:{sm:1,md:n?1:2},children:o.map(({month:l,year:d},h)=>{const T=u.get(pe(d,l))??[],R=m?.year()===d&&m?.month()===l;return E.jsx(Ee,{isFirstMonth:h===0,year:d,month:l,periods:T,showWeekNumbers:e,dateTooltipCallback:r,dateClickCallback:n?i:void 0,focusedDate:R?m:void 0,setFocusedDate:p},`${d}-${l}`)})})]})},Pt=t=>t.reduce((e,r)=>g(r.tom).isAfter(g(e))?r.tom:e,t[0].tom),Ut=(t,e)=>{const r=g(t),n=g(e),a=r.month()%3,s=3-n.month()%3,o=r.subtract(a,"month"),u=n.add(s,"month"),m=Gt(o.toDate(),u.toDate());return Array.from({length:m},(p,i)=>{const l=o.add(i,"month");return{month:l.month(),year:l.year()}})},Gt=(t,e)=>{let r=(e.getFullYear()-t.getFullYear())*12;return r+=e.getMonth()-t.getMonth(),Math.max(r,0)},pe=(t,e)=>`${t}-${e}`,_t=(t,e)=>{const r=new Map;for(const{year:n,month:a}of t){const s=g().year(n).month(a).startOf("month"),o=s.endOf("month"),u=e.filter(m=>g(m.tom).isSameOrAfter(s,"day")&&g(m.fom).isSameOrBefore(o,"day"));r.set(pe(n,a),u)}return r},St=(t,e)=>g(t.fom).isBefore(g(e))?t.fom:e,Bt=(t,e)=>{const r=g(e);return g(t.tom).isAfter(r)&&g(t.fom).isBefore(r)||g(t.tom).isBefore(r)?e:t.tom},Ct=(t,e)=>g(t.fom).diff(g(e.fom));M.__docgenInfo={description:"",methods:[],displayName:"Calendar",props:{periods:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}],required:!0}},{key:"srText",value:{name:"string",required:!1}},{key:"isSelected",value:{name:"boolean",required:!1}}]}}],raw:"CalendarPeriod[]"}]},name:"value"}],return:{name:"void"}}},description:""},isRangeSelection:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},getSrTextForSelectedPeriod:{required:!1,tsType:{name:"signature",type:"function",raw:"(period: { fom: string; tom: string }) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{ fom: string; tom: string }",signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}}]}},name:"period"}],return:{name:"string"}}},description:""}}};const Jt={title:"Calendar",component:M,render:t=>E.jsx("div",{style:{maxWidth:"704px"},children:E.jsx(M,{...t})})},G={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE"},{fom:"2024-02-21",tom:"2024-02-21",color:"PINK"},{fom:"2024-02-22",tom:"2024-05-05",color:"BLUE"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN"}]}},H={args:{...G.args,showWeekNumbers:!1}},K={args:{...G.args,dateTooltipCallback:t=>E.jsxs(de,{gap:"space-4",children:[E.jsx(xe,{children:"Dette er en tooltip"}),E.jsx(we,{children:t})]})}},q={args:G.args,render:()=>{const t=[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN"}],e=(s,o)=>g(s.fom).diff(g(o.fom)),[r,n]=c.useState(t),a=s=>{n(o=>(typeof s=="function"?s(o):s).sort(e))};return E.jsx(M,{periods:r,isRangeSelection:!1,setSelectedPeriods:a})}},V={args:G.args,render:()=>{const t=[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN"}],e=(s,o)=>g(s.fom).diff(g(o.fom)),[r,n]=c.useState(t),a=s=>{n(o=>(typeof s=="function"?s(o):s).sort(e))};return E.jsx(M,{periods:r,isRangeSelection:!0,setSelectedPeriods:a})}},Y={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN"}]}},$={args:{periods:[{fom:"2024-02-01",tom:"2024-02-20",color:"BLUE"},{fom:"2025-05-06",tom:"2025-07-30",color:"LIGHTGREEN"}]}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
  args: {
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
}`,...G.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
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
    return <Calendar periods={perioder} isRangeSelection={false} setSelectedPeriods={setSelectedPeriods} />;
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
    return <Calendar periods={perioder} isRangeSelection setSelectedPeriods={setSelectedPeriods} />;
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
    }]
  }
}`,...Y.parameters?.docs?.source}}};$.parameters={...$.parameters,docs:{...$.parameters?.docs,source:{originalSource:`{
  args: {
    periods: [{
      fom: '2024-02-01',
      tom: '2024-02-20',
      color: 'BLUE'
    }, {
      fom: '2025-05-06',
      tom: '2025-07-30',
      color: 'LIGHTGREEN'
    }]
  }
}`,...$.parameters?.docs?.source}}};const Qt=["Default","IkkeVisUkenr","MedTooltip","VisKalenderMedValgAvEnkeltdager","VisKalenderMedValgAvPerioder","PeriodsWithGap","PeriodsThatSpanOverAYear"];export{G as Default,H as IkkeVisUkenr,K as MedTooltip,$ as PeriodsThatSpanOverAYear,Y as PeriodsWithGap,q as VisKalenderMedValgAvEnkeltdager,V as VisKalenderMedValgAvPerioder,Qt as __namedExportsOrder,Jt as default};
