import{r as u,c as ye,R as T,m as ve,a as oe,S as he,b as ie,d as Le,e as p,j as c}from"./iframe-DPaEgbQd.js";import{f as Ne,i as le,a as Ie}from"./UttaksdagenString-DS3Q9tDz.js";import{I as be}from"./dates-BAe2wS65.js";import{R as De,u as Te,a as Re,b as Oe,o as Pe,f as Ue,s as Ce,c as _e,d as Ge}from"./Date.Input-BfEoJmwo.js";import"./useId-B7-nZWcC.js";import{u as ee}from"./ChevronDown-DHoV9uq0.js";import{B as Se}from"./Box-CTOoMAsJ.js";import{V as de}from"./VStack-iymPSTZb.js";import{H as Be,B as xe,D as we}from"./Label-WkxgEZfB.js";import{H as J}from"./HGrid-DDf356t2.js";import{B as ke}from"./Button-D6tkyZ3Q.js";import{M as Ae}from"./message-DaV5mS96.js";import"./preload-helper-D9Z9MdNV.js";import"./index-Dkjp54PP.js";import"./i18n.hooks-DGLenOwA.js";import"./useId-NeWmF6y6.js";import"./Calendar-B1YqrEpZ.js";import"./BasePrimitive-CFrUMjB8.js";const $=globalThis?.document?u.useLayoutEffect:()=>{};function te(t){return t.sort((e,r)=>{const n=e.compareDocumentPosition(r);if(n&Node.DOCUMENT_POSITION_FOLLOWING||n&Node.DOCUMENT_POSITION_CONTAINED_BY)return-1;if(n&Node.DOCUMENT_POSITION_PRECEDING||n&Node.DOCUMENT_POSITION_CONTAINS)return 1;if(n&Node.DOCUMENT_POSITION_DISCONNECTED||n&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC)throw Error("Cannot sort the given nodes.");return 0})}const je=t=>typeof t=="object"&&"nodeType"in t&&t.nodeType===Node.ELEMENT_NODE;function ne(t,e,r){let n=t+1;return r&&n>=e&&(n=0),n}function re(t,e,r){let n=t-1;return r&&n<0&&(n=e),n}const Z=t=>t;class Me{constructor(){this.descendants=new Map,this.register=e=>{if(e!=null)return je(e)?this.registerNode(e):r=>{this.registerNode(r,e)}},this.unregister=e=>{this.descendants.delete(e);const r=te(Array.from(this.descendants.keys()));this.assignIndex(r)},this.destroy=()=>{this.descendants.clear()},this.assignIndex=e=>{this.descendants.forEach(r=>{const n=e.indexOf(r.node);r.index=n,r.node.dataset.index=r.index.toString()})},this.count=()=>this.descendants.size,this.enabledCount=()=>this.enabledValues().length,this.values=()=>Array.from(this.descendants.values()).sort((r,n)=>r.index-n.index),this.enabledValues=()=>this.values().filter(e=>!e.disabled),this.item=e=>{if(this.count()!==0)return this.values()[e]},this.enabledItem=e=>{if(this.enabledCount()!==0)return this.enabledValues()[e]},this.first=()=>this.item(0),this.firstEnabled=()=>this.enabledItem(0),this.last=()=>this.item(this.descendants.size-1),this.lastEnabled=()=>{const e=this.enabledValues().length-1;return this.enabledItem(e)},this.indexOf=e=>{var r,n;return e&&(n=(r=this.descendants.get(e))===null||r===void 0?void 0:r.index)!==null&&n!==void 0?n:-1},this.enabledIndexOf=e=>e==null?-1:this.enabledValues().findIndex(r=>r.node.isSameNode(e)),this.next=(e,r=!0)=>{const n=ne(e,this.count(),r);return this.item(n)},this.nextEnabled=(e,r=!0)=>{const n=this.item(e);if(!n)return;const a=this.enabledIndexOf(n.node),s=ne(a,this.enabledCount(),r);return this.enabledItem(s)},this.prev=(e,r=!0)=>{const n=re(e,this.count()-1,r);return this.item(n)},this.prevEnabled=(e,r=!0)=>{const n=this.item(e);if(!n)return;const a=this.enabledIndexOf(n.node),s=re(a,this.enabledCount()-1,r);return this.enabledItem(s)},this.registerNode=(e,r)=>{if(!e)return;const n=this.descendants.get(e);if(n){this.descendants.set(e,Object.assign({index:n.index,node:e},r));return}const a=Array.from(this.descendants.keys()).concat(e),s=te(a);r?.disabled&&(r.disabled=!!r.disabled);const o=Object.assign({node:e,index:-1},r);this.descendants.set(e,o),this.assignIndex(s)}}}function Ke(){const[t,e]=ye({name:"DescendantsProvider",errorMessage:"useDescendantsContext must be used within DescendantsProvider"}),r=Z(s=>T.createElement(t,Object.assign({},s.value),s.children));function n(s){const o=e(),[l,m]=u.useState(-1),f=u.useRef(null);$(()=>()=>{f.current&&o.unregister(f.current)},[]),$(()=>{if(!f.current)return;const b=Number(f.current.dataset.index);l!==b&&!Number.isNaN(b)&&m(b)});const i=Z(s?o.register(s):o.register);return{descendants:o,index:l,enabledIndex:o.enabledIndexOf(f.current),register:ve([i,f])}}function a(){return u.useRef(new Me).current}return[r,e,a,n]}function He(t,e=globalThis?.document){const r=ee(t);u.useEffect(()=>{const n=a=>{a.key==="Escape"&&r(a)};return e.addEventListener("keydown",n,!0),()=>e.removeEventListener("keydown",n,!0)},[r,e])}const ue={FOCUS_OUTSIDE:"AKSEL_FOCUS_OUTSIDE",POINTER_DOWN_OUTSIDE:"AKSEL_POINTER_DOWN_OUTSIDE"};function ce(t,e,r,{discrete:n}={discrete:!1}){if(!e)return;const a=r.originalEvent.target,s=new CustomEvent(t,{bubbles:!1,cancelable:!0,detail:r});a.addEventListener(t,e,{once:!0}),n&&a?De.flushSync(()=>a.dispatchEvent(s)):a.dispatchEvent(s)}function qe(t,e=globalThis?.document){const r=ee(t),n=u.useRef(!1);return u.useEffect(()=>{const a=s=>{if(s.target&&!n.current){const o={originalEvent:s};ce(ue.FOCUS_OUTSIDE,r,o)}};return e.addEventListener("focusin",a),()=>e.removeEventListener("focusin",a)},[e,r]),{onFocusCapture:()=>{n.current=!0},onBlurCapture:()=>{n.current=!1}}}function Ve(t,e=globalThis?.document){const r=ee(t),n=u.useRef(!1),a=u.useRef(()=>{});return u.useEffect(()=>{const s=l=>{function m(){ce(ue.POINTER_DOWN_OUTSIDE,r,{originalEvent:l},{discrete:!0})}l.target&&!n.current?l.pointerType==="touch"?(e.removeEventListener("click",a.current),a.current=m,e.addEventListener("click",a.current,{once:!0})):m():e.removeEventListener("click",a.current),n.current=!1},o=window.setTimeout(()=>{e.addEventListener("pointerdown",s)},0);return()=>{window.clearTimeout(o),e.removeEventListener("pointerdown",s),e.removeEventListener("click",a.current)}},[e,r]),{onPointerDownCapture:()=>{n.current=!0}}}var Fe=function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(t);a<n.length;a++)e.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(t,n[a])&&(r[n[a]]=t[n[a]]);return r};const[Ye,$e,We,ze]=Ke();let B=0,ae;const Ze=u.forwardRef((t,e)=>$e(!1)?T.createElement(se,Object.assign({ref:e},t)):T.createElement(Xe,null,T.createElement(se,Object.assign({ref:e},t)))),Xe=({children:t})=>{const e=We();return T.createElement(Ye,{value:e},t)},se=u.forwardRef((t,e)=>{var r,{children:n,asChild:a,onEscapeKeyDown:s,onPointerDownOutside:o,onFocusOutside:l,onInteractOutside:m,onDismiss:f,safeZone:i,disableOutsidePointerEvents:b=!1,enabled:g=!0}=t,D=Fe(t,["children","asChild","onEscapeKeyDown","onPointerDownOutside","onFocusOutside","onInteractOutside","onDismiss","safeZone","disableOutsidePointerEvents","enabled"]);const[,P]=u.useState({}),{register:d,index:y,descendants:N}=ze({disableOutsidePointerEvents:b,disabled:!g,forceUpdate:()=>P({})}),[I,v]=u.useState(null),x=oe(v,d,e),h=(r=I?.ownerDocument)!==null&&r!==void 0?r:globalThis?.document,O=u.useRef(!1),U=u.useRef(!1),_=(()=>{let E=-1;return N.enabledValues().forEach((j,G)=>{j.disableOutsidePointerEvents&&(E=G)}),{isPointerEventsEnabled:y>=E,isBodyPointerEventsDisabled:B>0,pointerStyle:y>=E&&B>0?"auto":void 0}})();function R(E){var A,j;if(!i?.anchor&&!i?.dismissable||!g)return;E.defaultPrevented||(O.current=!0,E.detail.originalEvent.type==="pointerdown"&&(U.current=!0));const G=E.target;E.detail.originalEvent.type==="pointerdown"?(!((A=i?.anchor)===null||A===void 0)&&A.contains(G)||G===i?.anchor)&&E.preventDefault():!(G instanceof HTMLElement&&![i?.anchor,i?.dismissable].some(z=>z?.contains(G))&&!G.contains((j=i?.dismissable)!==null&&j!==void 0?j:null))&&E.preventDefault(),E.detail.originalEvent.type==="focusin"&&U.current&&E.preventDefault(),U.current=!1,O.current=!1}const S=Ve(E=>{!_.isPointerEventsEnabled||!g||(o?.(E),m?.(E),i&&R(E),!E.defaultPrevented&&f&&f())},h),w=qe(E=>{g&&(l?.(E),m?.(E),i&&R(E),!E.defaultPrevented&&f&&f())},h);He(E=>{!g||!(y===N.enabledCount()-1)||(s?.(E),!E.defaultPrevented&&f&&(E.preventDefault(),f()))},h),u.useEffect(()=>{if(!(!I||!g||!b))return B===0&&(ae=h.body.style.pointerEvents,h.body.style.pointerEvents="none"),B++,()=>{B===1&&(h.body.style.pointerEvents=ae),B--}},[I,h,b,N,g]),u.useEffect(()=>()=>N.values().forEach(E=>E.forceUpdate()),[N,I]);const k=a?he:"div";return T.createElement(k,Object.assign({ref:x},D,{onFocusCapture:w.onFocusCapture,onBlurCapture:w.onBlurCapture,onPointerDownCapture:S.onPointerDownCapture,style:Object.assign({pointerEvents:_.pointerStyle},D.style)}),n)});var Je=function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(t);a<n.length;a++)e.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(t,n[a])&&(r[n[a]]=t[n[a]]);return r};const Qe=u.forwardRef((t,e)=>{var{className:r}=t,n=Je(t,["className"]);const{cn:a}=ie();return T.createElement("div",Object.assign({},n,{ref:e,className:a("navds-popover__content",r)}))});var et=function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(t);a<n.length;a++)e.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(t,n[a])&&(r[n[a]]=t[n[a]]);return r};const Q=u.forwardRef((t,e)=>{var{className:r,children:n,anchorEl:a,arrow:s=!0,open:o,onClose:l,placement:m="top",offset:f,strategy:i,flip:b=!0}=t,g=et(t,["className","children","anchorEl","arrow","open","onClose","placement","offset","strategy","flip"]);const{cn:D}=ie(),P=u.useRef(null),d=Te(!1)!==void 0,y=Re(!1),N=i??(d?"fixed":"absolute"),I=y?!1:b,v=Le(!1),{update:x,refs:h,placement:O,middlewareData:{arrow:{x:U,y:_}={}},floatingStyles:R}=Oe({strategy:N,placement:m,open:o,middleware:[Pe(f??(v?.isDarkside?8:s?16:4)),I&&Ue({padding:5,fallbackPlacements:["bottom","top"]}),Ce({padding:12}),_e({element:P,padding:8})]});$(()=>{h.setReference(a)},[a]);const S=oe(h.setFloating,e);$(()=>{if(!h.reference.current||!h.floating.current||!o)return;const k=Ge(h.reference.current,h.floating.current,x);return()=>k()},[h.floating,h.reference,x,o,a]);const w={top:"bottom",right:"left",bottom:"top",left:"right"}[O.split("-")[0]];return T.createElement(Ze,{asChild:!0,safeZone:{anchor:a,dismissable:h.floating.current},onDismiss:()=>o&&l?.(),enabled:o},T.createElement("div",Object.assign({ref:S},g,{className:D("navds-popover",r,{"navds-popover--hidden":!o||!a}),style:Object.assign(Object.assign({},g.style),R),"data-placement":O,"aria-hidden":!o||!a}),n,s&&!v?.isDarkside&&T.createElement("div",{ref:k=>{P.current=k},style:Object.assign(Object.assign(Object.assign({},U!=null?{left:U}:{}),_!=null?{top:_}:{}),w?{[w]:"-0.5rem"}:{}),className:D("navds-popover__arrow")})))});Q.Content=Qe;const tt=t=>t.charAt(0).toUpperCase()+t.slice(1),nt="_days_11aro_1",rt="_cursorAndHoover_11aro_30",at="_srOnly_11aro_38",st="_blueDay_11aro_50",ot="_darkblueDay_11aro_55",it="_lightblueDay_11aro_61",lt="_lightgreenDay_11aro_80",dt="_greenDay_11aro_99",ut="_greenStripedDay_11aro_104",ct="_blueStripedDay_11aro_138",mt="_grayDay_11aro_172",ft="_blackDay_11aro_178",Et="_blackOutlineDay_11aro_184",pt="_blueOutlineDay_11aro_189",gt="_greenOutlineDay_11aro_207",yt="_lightgreenBlueDay_11aro_225",vt="_lightblueGreenDay_11aro_251",ht="_none_11aro_276",Lt="_pinkDay_11aro_281",Nt="_purpleDay_11aro_287",L={days:nt,cursorAndHoover:rt,srOnly:at,blueDay:st,darkblueDay:ot,lightblueDay:it,lightgreenDay:lt,greenDay:dt,greenStripedDay:ut,blueStripedDay:ct,grayDay:mt,blackDay:ft,blackOutlineDay:Et,blueOutlineDay:pt,greenOutlineDay:gt,lightgreenBlueDay:yt,lightblueGreenDay:vt,none:ht,pinkDay:Lt,purpleDay:Nt};var It={};const bt={NONE:L.none,BLUE:L.blueDay,DARKBLUE:L.darkblueDay,LIGHTGREEN:L.lightgreenDay,GRAY:L.grayDay,PINK:L.pinkDay,PURPLE:L.purpleDay,BLACK:L.blackDay,BLACKOUTLINE:L.blackOutlineDay,BLUEOUTLINE:L.blueOutlineDay,GREENOUTLINE:L.greenOutlineDay,LIGHTBLUE:L.lightblueDay,GREEN:L.greenDay,LIGHTBLUEGREEN:L.lightblueGreenDay,LIGHTGREENBLUE:L.lightgreenBlueDay,GREENSTRIPED:L.greenStripedDay,BLUESTRIPED:L.blueStripedDay},me=T.memo(({isoDate:t,periodeColor:e,isFocused:r,srText:n,dateTooltipCallback:a,dateClickCallback:s,setFocusedDate:o})=>{const l=p(t),m=l.date();fe(`Rendering Day: ${m}, Color: ${e}`);const f=u.useRef(null),[i,b]=u.useState(!1);u.useEffect(()=>{r&&f.current?.focus()},[r]);const g=!!s&&!W(l);return c.jsxs("button",{ref:f,type:"button","data-testid":`day:${m};dayColor:${e}`,tabIndex:r?0:-1,className:`${L.days} ${bt[e]} ${g&&L.cursorAndHoover}`,onFocus:g?()=>o(l):void 0,onMouseOver:a?()=>b(!0):void 0,onMouseLeave:a?()=>b(!1):void 0,onClick:g?()=>s(t):void 0,onKeyDown:s?D=>Tt(D,l,s,o):void 0,children:[m,n&&c.jsx("span",{className:L.srOnly,children:n}),a&&Dt(e)&&c.jsx(Q,{open:i,onClose:()=>b(!1),anchorEl:f.current,children:c.jsx(Q.Content,{children:a(t)})})]})}),Dt=t=>t!=="NONE"&&t!=="GRAY",W=t=>t.isoWeekday()===6||t.isoWeekday()===7,fe=t=>{const e=typeof process<"u"&&It.VITEST==="true";globalThis.location.hostname==="localhost"&&!e&&console.log(t)},Tt=(t,e,r,n)=>{t.preventDefault();const a=!!r&&!W(e);switch(t.key){case"ArrowLeft":n(e.subtract(1,"day"));break;case"ArrowRight":n(e.add(1,"day"));break;case"ArrowUp":n(e.subtract(7,"day"));break;case"ArrowDown":n(e.add(7,"day"));break;case"Enter":case" ":a&&r(e.format(be))}};me.__docgenInfo={description:"",methods:[],displayName:"Day",props:{isoDate:{required:!0,tsType:{name:"string"},description:""},periodeColor:{required:!0,tsType:{name:"union",raw:`| 'NONE'
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
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}]},description:""},isFocused:{required:!0,tsType:{name:"boolean"},description:""},srText:{required:!1,tsType:{name:"string"},description:""},dateTooltipCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => React.ReactNode | string",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"union",raw:"React.ReactNode | string",elements:[{name:"ReactReactNode",raw:"React.ReactNode"},{name:"string"}]}}},description:""},dateClickCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => void",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"void"}}},description:""},setFocusedDate:{required:!0,tsType:{name:"signature",type:"function",raw:"(date: Dayjs) => void",signature:{arguments:[{type:{name:"Dayjs"},name:"date"}],return:{name:"void"}}},description:""}}};const Rt="_weeknr_6j43u_1",Ot="_weekday_6j43u_12",X={weeknr:Rt,weekday:Ot};p.extend(le);const Ee=T.memo(({year:t,month:e,isFirstMonth:r,showWeekNumbers:n,periods:a,focusedDate:s,dateTooltipCallback:o,dateClickCallback:l,setFocusedDate:m})=>{fe(`Rendering Month: ${e}-${t}`);const f=u.useMemo(()=>Ut(a),[a]),i=p().year(t).month(e).startOf("month"),b=i.daysInMonth(),g=i.isoWeekday(),D=i.endOf("month").isoWeekday(),P=i.isoWeek(),d=Math.ceil((b+(g-1)+(7-D))/7),y=n?8:7,N=Array.from({length:7},(I,v)=>i.isoWeekday(v+1).format("dd"));return c.jsx(Se.New,{borderWidth:"1",maxWidth:"400px",padding:"3",borderRadius:"4",borderColor:"neutral-subtle","data-testid":`year:${t};month:${e}`,children:c.jsxs(de,{gap:"space-12",children:[c.jsx(Be,{size:"small",level:"4",align:"center",children:`${tt(i.format("MMMM"))} ${t}`}),c.jsxs("div",{children:[c.jsxs(J,{columns:y,children:[n&&c.jsx("div",{className:X.weeknr}),N.map(I=>c.jsx("div",{className:X.weekday,children:I},I))]}),Array.from({length:d}).map((I,v)=>c.jsxs(J,{columns:y,children:[n&&c.jsx("div",{className:X.weeknr,children:P+v},`weeknr-${v}`),Array.from({length:7}).map((x,h)=>{const O=v*7+h,U=v===0&&h<g-1,_=v===d-1&&h>=D;if(U||_)return c.jsx("div",{},`empty-${O}`);const R=i.add(O-(g-1),"day"),S=f.get(R.format("YYYY-MM-DD"));return c.jsx(me,{isoDate:Ne(R),periodeColor:Pt(R,S),srText:S?.srText,dateTooltipCallback:o,dateClickCallback:l,isFocused:s?.isSame(R,"day")??(r&&O===g-1)??!1,setFocusedDate:m},`${t}-${e}-${R.date()}`)})]},`week-${v}`))]})]})})},(t,e)=>{const r=Object.keys(t);for(const n of r)if(n!=="periods"&&t[n]!==e[n])return!1;if(t.periods.length!==e.periods.length)return!1;for(let n=0;n<t.periods.length;n++){const a=t.periods[n],s=e.periods[n],o=Object.keys(a);for(const l of o)if(a[l]!==s[l])return!1}return!0}),Pt=(t,e)=>e?e.color==="PINK"?"PINK":e.color==="PURPLE"?"PURPLE":W(t)?"GRAY":e.color:W(t)?"GRAY":"NONE",Ut=t=>{const e=new Map;for(const r of t){let n=p(r.fom);const a=p(r.tom);for(;!n.isAfter(a,"day");){const s=n.format("YYYY-MM-DD");(!e.has(s)||r.isSelected)&&e.set(s,r),n=n.add(1,"day")}}return e};Ee.__docgenInfo={description:"",methods:[],displayName:"Month",props:{year:{required:!0,tsType:{name:"number"},description:""},month:{required:!0,tsType:{name:"number"},description:""},isFirstMonth:{required:!0,tsType:{name:"boolean"},description:""},showWeekNumbers:{required:!0,tsType:{name:"boolean"},description:""},periods:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}],required:!0}},{key:"srText",value:{name:"string",required:!1}},{key:"isSelected",value:{name:"boolean",required:!1}}]}}],raw:"CalendarPeriod[]"},description:""},focusedDate:{required:!0,tsType:{name:"union",raw:"Dayjs | undefined",elements:[{name:"Dayjs"},{name:"undefined"}]},description:""},dateTooltipCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => React.ReactElement | string",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"union",raw:"React.ReactElement | string",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"string"}]}}},description:""},dateClickCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => void",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"void"}}},description:""},setFocusedDate:{required:!0,tsType:{name:"signature",type:"function",raw:"(date: Dayjs) => void",signature:{arguments:[{type:{name:"Dayjs"},name:"date"}],return:{name:"void"}}},description:""}}};p.extend(le);p.extend(Ie);const Ct=36,M=({periods:t,showWeekNumbers:e=!0,dateTooltipCallback:r,setSelectedPeriods:n,isRangeSelection:a=!1,getSrTextForSelectedPeriod:s,firstDateInCalendar:o,lastDateInCalendar:l})=>{const[m,f]=u.useState(0),i=u.useMemo(()=>_t(m,o,l),[t,o,l,m]),b=u.useMemo(()=>St(i,t),[i,t]),[g,D]=u.useState(),P=u.useCallback(d=>{!n||!s||n(a?y=>{const N=y.length===0?d:Bt(y[0],d),I=y.length===0?d:xt(y[0],d);return y.some(v=>v.fom===d||v.tom===d)?[]:[{color:"DARKBLUE",fom:N,tom:I,isSelected:!0,srText:s({fom:N,tom:I})}]}:y=>y.some(N=>N.fom===d)?y.filter(N=>N.fom!==d):[...y,{color:"DARKBLUE",fom:d,tom:d,isSelected:!0,srText:s({fom:d,tom:d})}].sort(wt))},[a,s,n]);return c.jsxs(c.Fragment,{children:[!n&&t.some(d=>d.srText)&&c.jsx("div",{className:"sr-only",children:t.filter(d=>d.srText).map(d=>d.srText).toString()}),c.jsx(J,{gap:"space-12",columns:{sm:1,md:n?1:2},children:i.map(({month:d,year:y},N)=>{const I=b.get(pe(y,d))??[],v=g?.year()===y&&g?.month()===d;return c.jsx(Ee,{isFirstMonth:N===0,year:y,month:d,periods:I,showWeekNumbers:e,dateTooltipCallback:r,dateClickCallback:n?P:void 0,focusedDate:v?g:void 0,setFocusedDate:D},`${y}-${d}`)})}),m<=Ct&&c.jsx(ke,{onClick:()=>f(d=>d+3),type:"button",variant:"secondary",size:"small",className:"mt-4 w-full",children:c.jsx(Ae,{id:"Calendar.LeggTilMåneder"})})]})},_t=(t,e,r)=>{const n=p(e),s=(r?p(r):p(e).add(6,"month")).add(t,"month"),o=Gt(n.toDate(),s.toDate());return Array.from({length:o+1},(l,m)=>{const f=n.add(m,"month");return{month:f.month(),year:f.year()}})},Gt=(t,e)=>{let r=(e.getFullYear()-t.getFullYear())*12;return r+=e.getMonth()-t.getMonth(),Math.max(r,0)},pe=(t,e)=>`${t}-${e}`,St=(t,e)=>{const r=new Map;for(const{year:n,month:a}of t){const s=p().year(n).month(a).startOf("month"),o=s.endOf("month"),l=e.filter(m=>p(m.tom).isSameOrAfter(s,"day")&&p(m.fom).isSameOrBefore(o,"day"));r.set(pe(n,a),l)}return r},Bt=(t,e)=>p(t.fom).isBefore(p(e))?t.fom:e,xt=(t,e)=>{const r=p(e);return p(t.tom).isAfter(r)&&p(t.fom).isBefore(r)||p(t.tom).isBefore(r)?e:t.tom},wt=(t,e)=>p(t.fom).diff(p(e.fom));M.__docgenInfo={description:"",methods:[],displayName:"Calendar",props:{periods:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}],required:!0}},{key:"srText",value:{name:"string",required:!1}},{key:"isSelected",value:{name:"boolean",required:!1}}]}}],raw:"CalendarPeriod[]"}]},name:"value"}],return:{name:"void"}}},description:""},isRangeSelection:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},getSrTextForSelectedPeriod:{required:!1,tsType:{name:"signature",type:"function",raw:"(period: { fom: string; tom: string }) => string",signature:{arguments:[{type:{name:"signature",type:"object",raw:"{ fom: string; tom: string }",signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}}]}},name:"period"}],return:{name:"string"}}},description:""},firstDateInCalendar:{required:!0,tsType:{name:"string"},description:""},lastDateInCalendar:{required:!1,tsType:{name:"string"},description:""}}};const tn={title:"Calendar",component:M,render:t=>c.jsx("div",{style:{maxWidth:"704px"},children:c.jsx(M,{...t})})},C={args:{firstDateInCalendar:"2024-01-31",lastDateInCalendar:"2024-08-30",periods:[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE"},{fom:"2024-02-21",tom:"2024-02-21",color:"PINK"},{fom:"2024-02-22",tom:"2024-05-05",color:"BLUE"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN"}]}},K={args:{...C.args,showWeekNumbers:!1}},H={args:{...C.args,dateTooltipCallback:t=>c.jsxs(de,{gap:"space-4",children:[c.jsx(xe,{children:"Dette er en tooltip"}),c.jsx(we,{children:t})]})}},q={args:C.args,render:()=>{const t=[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN"}],e=(s,o)=>p(s.fom).diff(p(o.fom)),[r,n]=u.useState(t),a=s=>{n(o=>(typeof s=="function"?s(o):s).sort(e))};return c.jsx(M,{periods:r,isRangeSelection:!1,setSelectedPeriods:a,firstDateInCalendar:t[0].fom,lastDateInCalendar:t[1].tom})}},V={args:C.args,render:()=>{const t=[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN"}],e=(s,o)=>p(s.fom).diff(p(o.fom)),[r,n]=u.useState(t),a=s=>{n(o=>(typeof s=="function"?s(o):s).sort(e))};return c.jsx(M,{periods:r,isRangeSelection:!0,setSelectedPeriods:a,firstDateInCalendar:t[0].fom,lastDateInCalendar:t[1].tom})}},F={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN"}],firstDateInCalendar:"2024-01-31",lastDateInCalendar:"2024-08-30"}},Y={args:{periods:[{fom:"2024-02-01",tom:"2024-02-20",color:"BLUE"},{fom:"2025-05-06",tom:"2025-07-30",color:"LIGHTGREEN"}],firstDateInCalendar:"2024-02-01",lastDateInCalendar:"2025-07-30"}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
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
}`,...C.parameters?.docs?.source}}};K.parameters={...K.parameters,docs:{...K.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    showWeekNumbers: false
  }
}`,...K.parameters?.docs?.source}}};H.parameters={...H.parameters,docs:{...H.parameters?.docs,source:{originalSource:`{
  args: {
    ...Default.args,
    dateTooltipCallback: (date: string) => <VStack gap="space-4">
                <BodyShort>Dette er en tooltip</BodyShort>
                <Detail>{date}</Detail>
            </VStack>
  }
}`,...H.parameters?.docs?.source}}};q.parameters={...q.parameters,docs:{...q.parameters?.docs,source:{originalSource:`{
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
}`,...V.parameters?.docs?.source}}};F.parameters={...F.parameters,docs:{...F.parameters?.docs,source:{originalSource:`{
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
}`,...F.parameters?.docs?.source}}};Y.parameters={...Y.parameters,docs:{...Y.parameters?.docs,source:{originalSource:`{
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
}`,...Y.parameters?.docs?.source}}};const nn=["Default","IkkeVisUkenr","MedTooltip","VisKalenderMedValgAvEnkeltdager","VisKalenderMedValgAvPerioder","PeriodsWithGap","PeriodsThatSpanOverAYear"];export{C as Default,K as IkkeVisUkenr,H as MedTooltip,Y as PeriodsThatSpanOverAYear,F as PeriodsWithGap,q as VisKalenderMedValgAvEnkeltdager,V as VisKalenderMedValgAvPerioder,nn as __namedExportsOrder,tn as default};
