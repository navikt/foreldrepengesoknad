import{r as u,c as ve,R as N,m as ye,a as oe,S as he,b as ie,d as Le,e as g,j as E}from"./iframe-l1p71tsk.js";import{f as be,i as le,a as Ne}from"./UttaksdagenString-4Q1T_Dwn.js";import{I as Te}from"./dates-CbIIXg4s.js";import{R as Re,u as Ie,a as De,b as Oe,o as Pe,f as Ue,s as Ge,c as Se,d as _e}from"./Date.Input-DLWBAyms.js";import"./useId-DqCiY0Tm.js";import{u as ee}from"./ChevronDown-DiO-t8o6.js";import{B as Be}from"./Box-NthLQTIi.js";import{V as de}from"./VStack-BeFrP97k.js";import{H as Ce,B as xe,D as we}from"./Label-Ccrjq82g.js";import{H as J}from"./HGrid-B2YOmLiq.js";import"./preload-helper-D9Z9MdNV.js";import"./index-r_p0Iqyq.js";import"./Provider-B9GyGy9d.js";import"./useId-BixWSJ2b.js";import"./composeEventHandlers-krbYd5LM.js";import"./Calendar-BMWWYB7B.js";import"./BasePrimitive-Dumn8i8S.js";const $=globalThis?.document?u.useLayoutEffect:()=>{};function te(t){return t.sort((e,r)=>{const n=e.compareDocumentPosition(r);if(n&Node.DOCUMENT_POSITION_FOLLOWING||n&Node.DOCUMENT_POSITION_CONTAINED_BY)return-1;if(n&Node.DOCUMENT_POSITION_PRECEDING||n&Node.DOCUMENT_POSITION_CONTAINS)return 1;if(n&Node.DOCUMENT_POSITION_DISCONNECTED||n&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC)throw Error("Cannot sort the given nodes.");return 0})}const ke=t=>typeof t=="object"&&"nodeType"in t&&t.nodeType===Node.ELEMENT_NODE;function ne(t,e,r){let n=t+1;return r&&n>=e&&(n=0),n}function re(t,e,r){let n=t-1;return r&&n<0&&(n=e),n}const Z=t=>t;class je{constructor(){this.descendants=new Map,this.register=e=>{if(e!=null)return ke(e)?this.registerNode(e):r=>{this.registerNode(r,e)}},this.unregister=e=>{this.descendants.delete(e);const r=te(Array.from(this.descendants.keys()));this.assignIndex(r)},this.destroy=()=>{this.descendants.clear()},this.assignIndex=e=>{this.descendants.forEach(r=>{const n=e.indexOf(r.node);r.index=n,r.node.dataset.index=r.index.toString()})},this.count=()=>this.descendants.size,this.enabledCount=()=>this.enabledValues().length,this.values=()=>Array.from(this.descendants.values()).sort((r,n)=>r.index-n.index),this.enabledValues=()=>this.values().filter(e=>!e.disabled),this.item=e=>{if(this.count()!==0)return this.values()[e]},this.enabledItem=e=>{if(this.enabledCount()!==0)return this.enabledValues()[e]},this.first=()=>this.item(0),this.firstEnabled=()=>this.enabledItem(0),this.last=()=>this.item(this.descendants.size-1),this.lastEnabled=()=>{const e=this.enabledValues().length-1;return this.enabledItem(e)},this.indexOf=e=>{var r,n;return e&&(n=(r=this.descendants.get(e))===null||r===void 0?void 0:r.index)!==null&&n!==void 0?n:-1},this.enabledIndexOf=e=>e==null?-1:this.enabledValues().findIndex(r=>r.node.isSameNode(e)),this.next=(e,r=!0)=>{const n=ne(e,this.count(),r);return this.item(n)},this.nextEnabled=(e,r=!0)=>{const n=this.item(e);if(!n)return;const a=this.enabledIndexOf(n.node),s=ne(a,this.enabledCount(),r);return this.enabledItem(s)},this.prev=(e,r=!0)=>{const n=re(e,this.count()-1,r);return this.item(n)},this.prevEnabled=(e,r=!0)=>{const n=this.item(e);if(!n)return;const a=this.enabledIndexOf(n.node),s=re(a,this.enabledCount()-1,r);return this.enabledItem(s)},this.registerNode=(e,r)=>{if(!e)return;const n=this.descendants.get(e);if(n){this.descendants.set(e,Object.assign({index:n.index,node:e},r));return}const a=Array.from(this.descendants.keys()).concat(e),s=te(a);r?.disabled&&(r.disabled=!!r.disabled);const o=Object.assign({node:e,index:-1},r);this.descendants.set(e,o),this.assignIndex(s)}}}function Ae(){const[t,e]=ve({name:"DescendantsProvider",errorMessage:"useDescendantsContext must be used within DescendantsProvider"}),r=Z(s=>N.createElement(t,Object.assign({},s.value),s.children));function n(s){const o=e(),[d,m]=u.useState(-1),p=u.useRef(null);$(()=>()=>{p.current&&o.unregister(p.current)},[]),$(()=>{if(!p.current)return;const i=Number(p.current.dataset.index);d!==i&&!Number.isNaN(i)&&m(i)});const l=Z(s?o.register(s):o.register);return{descendants:o,index:d,enabledIndex:o.enabledIndexOf(p.current),register:ye([l,p])}}function a(){return u.useRef(new je).current}return[r,e,a,n]}function Me(t,e=globalThis?.document){const r=ee(t);u.useEffect(()=>{const n=a=>{a.key==="Escape"&&r(a)};return e.addEventListener("keydown",n,!0),()=>e.removeEventListener("keydown",n,!0)},[r,e])}const ue={FOCUS_OUTSIDE:"AKSEL_FOCUS_OUTSIDE",POINTER_DOWN_OUTSIDE:"AKSEL_POINTER_DOWN_OUTSIDE"};function ce(t,e,r,{discrete:n}={discrete:!1}){if(!e)return;const a=r.originalEvent.target,s=new CustomEvent(t,{bubbles:!1,cancelable:!0,detail:r});a.addEventListener(t,e,{once:!0}),n&&a?Re.flushSync(()=>a.dispatchEvent(s)):a.dispatchEvent(s)}function He(t,e=globalThis?.document){const r=ee(t),n=u.useRef(!1);return u.useEffect(()=>{const a=s=>{if(s.target&&!n.current){const o={originalEvent:s};ce(ue.FOCUS_OUTSIDE,r,o)}};return e.addEventListener("focusin",a),()=>e.removeEventListener("focusin",a)},[e,r]),{onFocusCapture:()=>{n.current=!0},onBlurCapture:()=>{n.current=!1}}}function Ke(t,e=globalThis?.document){const r=ee(t),n=u.useRef(!1),a=u.useRef(()=>{});return u.useEffect(()=>{const s=d=>{function m(){ce(ue.POINTER_DOWN_OUTSIDE,r,{originalEvent:d},{discrete:!0})}d.target&&!n.current?d.pointerType==="touch"?(e.removeEventListener("click",a.current),a.current=m,e.addEventListener("click",a.current,{once:!0})):m():e.removeEventListener("click",a.current),n.current=!1},o=window.setTimeout(()=>{e.addEventListener("pointerdown",s)},0);return()=>{window.clearTimeout(o),e.removeEventListener("pointerdown",s),e.removeEventListener("click",a.current)}},[e,r]),{onPointerDownCapture:()=>{n.current=!0}}}var qe=function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(t);a<n.length;a++)e.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(t,n[a])&&(r[n[a]]=t[n[a]]);return r};const[Ve,Fe,Ye,$e]=Ae();let x=0,ae;const We=u.forwardRef((t,e)=>Fe(!1)?N.createElement(se,Object.assign({ref:e},t)):N.createElement(ze,null,N.createElement(se,Object.assign({ref:e},t)))),ze=({children:t})=>{const e=Ye();return N.createElement(Ve,{value:e},t)},se=u.forwardRef((t,e)=>{var r,{children:n,asChild:a,onEscapeKeyDown:s,onPointerDownOutside:o,onFocusOutside:d,onInteractOutside:m,onDismiss:p,safeZone:l,disableOutsidePointerEvents:i=!1,enabled:c=!0}=t,v=qe(t,["children","asChild","onEscapeKeyDown","onPointerDownOutside","onFocusOutside","onInteractOutside","onDismiss","safeZone","disableOutsidePointerEvents","enabled"]);const[,D]=u.useState({}),{register:S,index:P,descendants:T}=$e({disableOutsidePointerEvents:i,disabled:!c,forceUpdate:()=>D({})}),[R,L]=u.useState(null),b=oe(L,S,e),h=(r=R?.ownerDocument)!==null&&r!==void 0?r:globalThis?.document,O=u.useRef(!1),I=u.useRef(!1),_=(()=>{let f=-1;return T.enabledValues().forEach((A,B)=>{A.disableOutsidePointerEvents&&(f=B)}),{isPointerEventsEnabled:P>=f,isBodyPointerEventsDisabled:x>0,pointerStyle:P>=f&&x>0?"auto":void 0}})();function C(f){var j,A;if(!l?.anchor&&!l?.dismissable||!c)return;f.defaultPrevented||(O.current=!0,f.detail.originalEvent.type==="pointerdown"&&(I.current=!0));const B=f.target;f.detail.originalEvent.type==="pointerdown"?(!((j=l?.anchor)===null||j===void 0)&&j.contains(B)||B===l?.anchor)&&f.preventDefault():!(B instanceof HTMLElement&&![l?.anchor,l?.dismissable].some(z=>z?.contains(B))&&!B.contains((A=l?.dismissable)!==null&&A!==void 0?A:null))&&f.preventDefault(),f.detail.originalEvent.type==="focusin"&&I.current&&f.preventDefault(),I.current=!1,O.current=!1}const U=Ke(f=>{!_.isPointerEventsEnabled||!c||(o?.(f),m?.(f),l&&C(f),!f.defaultPrevented&&p&&p())},h),w=He(f=>{c&&(d?.(f),m?.(f),l&&C(f),!f.defaultPrevented&&p&&p())},h);Me(f=>{!c||!(P===T.enabledCount()-1)||(s?.(f),!f.defaultPrevented&&p&&(f.preventDefault(),p()))},h),u.useEffect(()=>{if(!(!R||!c||!i))return x===0&&(ae=h.body.style.pointerEvents,h.body.style.pointerEvents="none"),x++,()=>{x===1&&(h.body.style.pointerEvents=ae),x--}},[R,h,i,T,c]),u.useEffect(()=>()=>T.values().forEach(f=>f.forceUpdate()),[T,R]);const k=a?he:"div";return N.createElement(k,Object.assign({ref:b},v,{onFocusCapture:w.onFocusCapture,onBlurCapture:w.onBlurCapture,onPointerDownCapture:U.onPointerDownCapture,style:Object.assign({pointerEvents:_.pointerStyle},v.style)}),n)});var Ze=function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(t);a<n.length;a++)e.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(t,n[a])&&(r[n[a]]=t[n[a]]);return r};const Xe=u.forwardRef((t,e)=>{var{className:r}=t,n=Ze(t,["className"]);const{cn:a}=ie();return N.createElement("div",Object.assign({},n,{ref:e,className:a("navds-popover__content",r)}))});var Je=function(t,e){var r={};for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&e.indexOf(n)<0&&(r[n]=t[n]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var a=0,n=Object.getOwnPropertySymbols(t);a<n.length;a++)e.indexOf(n[a])<0&&Object.prototype.propertyIsEnumerable.call(t,n[a])&&(r[n[a]]=t[n[a]]);return r};const Q=u.forwardRef((t,e)=>{var{className:r,children:n,anchorEl:a,arrow:s=!0,open:o,onClose:d,placement:m="top",offset:p,strategy:l,flip:i=!0}=t,c=Je(t,["className","children","anchorEl","arrow","open","onClose","placement","offset","strategy","flip"]);const{cn:v}=ie(),D=u.useRef(null),S=Ie(!1)!==void 0,P=De(!1),T=l??(S?"fixed":"absolute"),R=P?!1:i,L=Le(!1),{update:b,refs:h,placement:O,middlewareData:{arrow:{x:I,y:_}={}},floatingStyles:C}=Oe({strategy:T,placement:m,open:o,middleware:[Pe(p??(L?.isDarkside?8:s?16:4)),R&&Ue({padding:5,fallbackPlacements:["bottom","top"]}),Ge({padding:12}),Se({element:D,padding:8})]});$(()=>{h.setReference(a)},[a]);const U=oe(h.setFloating,e);$(()=>{if(!h.reference.current||!h.floating.current||!o)return;const k=_e(h.reference.current,h.floating.current,b);return()=>k()},[h.floating,h.reference,b,o,a]);const w={top:"bottom",right:"left",bottom:"top",left:"right"}[O.split("-")[0]];return N.createElement(We,{asChild:!0,safeZone:{anchor:a,dismissable:h.floating.current},onDismiss:()=>o&&d?.(),enabled:o},N.createElement("div",Object.assign({ref:U},c,{className:v("navds-popover",r,{"navds-popover--hidden":!o||!a}),style:Object.assign(Object.assign({},c.style),C),"data-placement":O,"aria-hidden":!o||!a}),n,s&&!L?.isDarkside&&N.createElement("div",{ref:k=>{D.current=k},style:Object.assign(Object.assign(Object.assign({},I!=null?{left:I}:{}),_!=null?{top:_}:{}),w?{[w]:"-0.5rem"}:{}),className:v("navds-popover__arrow")})))});Q.Content=Xe;const Qe=t=>t.charAt(0).toUpperCase()+t.slice(1),et="_days_1v8jh_1",tt="_cursorAndHoover_1v8jh_30",nt="_blueDay_1v8jh_38",rt="_darkblueDay_1v8jh_43",at="_lightblueDay_1v8jh_49",st="_lightgreenDay_1v8jh_68",ot="_greenDay_1v8jh_87",it="_greenStripedDay_1v8jh_92",lt="_blueStripedDay_1v8jh_126",dt="_grayDay_1v8jh_160",ut="_blackDay_1v8jh_166",ct="_blackOutlineDay_1v8jh_172",mt="_blueOutlineDay_1v8jh_177",ft="_greenOutlineDay_1v8jh_195",Et="_lightgreenBlueDay_1v8jh_213",pt="_lightblueGreenDay_1v8jh_239",gt="_none_1v8jh_264",vt="_pinkDay_1v8jh_269",yt="_purpleDay_1v8jh_275",y={days:et,cursorAndHoover:tt,blueDay:nt,darkblueDay:rt,lightblueDay:at,lightgreenDay:st,greenDay:ot,greenStripedDay:it,blueStripedDay:lt,grayDay:dt,blackDay:ut,blackOutlineDay:ct,blueOutlineDay:mt,greenOutlineDay:ft,lightgreenBlueDay:Et,lightblueGreenDay:pt,none:gt,pinkDay:vt,purpleDay:yt};var ht={};const Lt={NONE:y.none,BLUE:y.blueDay,DARKBLUE:y.darkblueDay,LIGHTGREEN:y.lightgreenDay,GRAY:y.grayDay,PINK:y.pinkDay,PURPLE:y.purpleDay,BLACK:y.blackDay,BLACKOUTLINE:y.blackOutlineDay,BLUEOUTLINE:y.blueOutlineDay,GREENOUTLINE:y.greenOutlineDay,LIGHTBLUE:y.lightblueDay,GREEN:y.greenDay,LIGHTBLUEGREEN:y.lightblueGreenDay,LIGHTGREENBLUE:y.lightgreenBlueDay,GREENSTRIPED:y.greenStripedDay,BLUESTRIPED:y.blueStripedDay},me=N.memo(({isoDate:t,periodeColor:e,isFocused:r,dateTooltipCallback:n,dateClickCallback:a,setFocusedDate:s})=>{const o=g(t),d=o.date();fe(`Rendering Day: ${d}, Color: ${e}`);const m=u.useRef(null),[p,l]=u.useState(!1);u.useEffect(()=>{r&&m.current?.focus()},[r]);const i=!!a&&!W(o);return E.jsxs("button",{ref:m,type:"button","data-testid":`day:${d};dayColor:${e}`,tabIndex:r?0:-1,className:`${y.days} ${Lt[e]} ${i&&y.cursorAndHoover}`,onFocus:i?()=>s(o):void 0,onMouseOver:n?()=>l(!0):void 0,onMouseLeave:n?()=>l(!1):void 0,onClick:i?()=>a(t):void 0,onKeyDown:a?c=>Nt(c,o,a,s):void 0,children:[d,n&&bt(e)&&E.jsx(Q,{open:p,onClose:()=>l(!1),anchorEl:m.current,children:E.jsx(Q.Content,{children:n(t)})})]})}),bt=t=>t!=="NONE"&&t!=="GRAY",W=t=>t.isoWeekday()===6||t.isoWeekday()===7,fe=t=>{const e=typeof process<"u"&&ht.VITEST==="true";globalThis.location.hostname==="localhost"&&!e&&console.log(t)},Nt=(t,e,r,n)=>{t.preventDefault();const a=!!r&&!W(e);switch(t.key){case"ArrowLeft":n(e.subtract(1,"day"));break;case"ArrowRight":n(e.add(1,"day"));break;case"ArrowUp":n(e.subtract(7,"day"));break;case"ArrowDown":n(e.add(7,"day"));break;case"Enter":case" ":a&&r(e.format(Te))}};me.__docgenInfo={description:"",methods:[],displayName:"Day",props:{isoDate:{required:!0,tsType:{name:"string"},description:""},periodeColor:{required:!0,tsType:{name:"union",raw:`| 'NONE'
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
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}]},description:""},isFocused:{required:!0,tsType:{name:"boolean"},description:""},dateTooltipCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => React.ReactNode | string",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"union",raw:"React.ReactNode | string",elements:[{name:"ReactReactNode",raw:"React.ReactNode"},{name:"string"}]}}},description:""},dateClickCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => void",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"void"}}},description:""},setFocusedDate:{required:!0,tsType:{name:"signature",type:"function",raw:"(date: Dayjs) => void",signature:{arguments:[{type:{name:"Dayjs"},name:"date"}],return:{name:"void"}}},description:""}}};const Tt="_weeknr_6j43u_1",Rt="_weekday_6j43u_12",X={weeknr:Tt,weekday:Rt};g.extend(le);const Ee=N.memo(({year:t,month:e,isFirstMonth:r,headerLevel:n,showWeekNumbers:a,periods:s,focusedDate:o,dateTooltipCallback:d,dateClickCallback:m,setFocusedDate:p})=>{fe(`Rendering Month: ${e}-${t}`);const l=u.useMemo(()=>Dt(s),[s]),i=g().year(t).month(e).startOf("month"),c=i.daysInMonth(),v=i.isoWeekday(),D=i.endOf("month").isoWeekday(),S=i.isoWeek(),P=Math.ceil((c+(v-1)+(7-D))/7),T=a?8:7,R=Array.from({length:7},(L,b)=>i.isoWeekday(b+1).format("dd"));return E.jsx(Be.New,{borderWidth:"1",maxWidth:"400px",padding:"3",borderRadius:"4",borderColor:"neutral-subtle","data-testid":`year:${t};month:${e}`,children:E.jsxs(de,{gap:"space-12",children:[E.jsx(Ce,{size:"small",level:n,align:"center",children:`${Qe(i.format("MMMM"))} ${t}`}),E.jsxs("div",{children:[E.jsxs(J,{columns:T,children:[a&&E.jsx("div",{className:X.weeknr}),R.map(L=>E.jsx("div",{className:X.weekday,children:L},L))]}),Array.from({length:P}).map((L,b)=>E.jsxs(J,{columns:T,children:[a&&E.jsx("div",{className:X.weeknr,children:S+b},`weeknr-${b}`),Array.from({length:7}).map((h,O)=>{const I=b*7+O,_=b===0&&O<v-1,C=b===P-1&&O>=D;if(_||C)return E.jsx("div",{},`empty-${I}`);const U=i.add(I-(v-1),"day");return E.jsx(me,{isoDate:be(U),periodeColor:It(U,l),dateTooltipCallback:d,dateClickCallback:m,isFocused:o?.isSame(U,"day")??(r&&I===v-1)??!1,setFocusedDate:p},`${t}-${e}-${U.date()}`)})]},`week-${b}`))]})]})})},(t,e)=>{const r=Object.keys(t);for(const n of r)if(n!=="periods"&&t[n]!==e[n])return!1;if(t.periods.length!==e.periods.length)return!1;for(let n=0;n<t.periods.length;n++){const a=t.periods[n],s=e.periods[n],o=Object.keys(a);for(const d of o)if(a[d]!==s[d])return!1}return!0}),It=(t,e)=>{const r=t.format("YYYY-MM-DD"),n=e.get(r);return n?n.color==="PINK"?"PINK":n.color==="PURPLE"?"PURPLE":W(t)?"GRAY":n.color:W(t)?"GRAY":"NONE"},Dt=t=>{const e=new Map;for(const r of t){let n=g(r.fom);const a=g(r.tom);for(;!n.isAfter(a,"day");){const s=n.format("YYYY-MM-DD");(!e.has(s)||r.isSelected)&&e.set(s,r),n=n.add(1,"day")}}return e};Ee.__docgenInfo={description:"",methods:[],displayName:"Month",props:{year:{required:!0,tsType:{name:"number"},description:""},month:{required:!0,tsType:{name:"number"},description:""},isFirstMonth:{required:!0,tsType:{name:"boolean"},description:""},headerLevel:{required:!0,tsType:{name:"union",raw:"'4' | '5'",elements:[{name:"literal",value:"'4'"},{name:"literal",value:"'5'"}]},description:""},showWeekNumbers:{required:!0,tsType:{name:"boolean"},description:""},periods:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}],required:!0}},{key:"srText",value:{name:"string",required:!1}},{key:"isSelected",value:{name:"boolean",required:!1}}]}}],raw:"CalendarPeriod[]"},description:""},focusedDate:{required:!0,tsType:{name:"union",raw:"Dayjs | undefined",elements:[{name:"Dayjs"},{name:"undefined"}]},description:""},dateTooltipCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => React.ReactElement | string",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"union",raw:"React.ReactElement | string",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"string"}]}}},description:""},dateClickCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => void",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"void"}}},description:""},setFocusedDate:{required:!0,tsType:{name:"signature",type:"function",raw:"(date: Dayjs) => void",signature:{arguments:[{type:{name:"Dayjs"},name:"date"}],return:{name:"void"}}},description:""}}};g.extend(le);g.extend(Ne);const M=({periods:t,useSmallerWidth:e=!1,showWeekNumbers:r=!0,dateTooltipCallback:n,setSelectedPeriods:a,isRangeSelection:s=!1})=>{const o=u.useMemo(()=>Pt(t[0].fom,Ot(t)),[t]),d=u.useMemo(()=>Gt(o,t),[o,t]),[m,p]=u.useState(),l=u.useCallback(i=>{a&&a(s?c=>c.some(v=>v.fom===i||v.tom===i)?[]:[{color:"DARKBLUE",fom:c.length===0?i:St(c[0].fom,i),tom:c.length===0?i:_t(c[0].fom,i),isSelected:!0,srText:""}]:c=>c.some(v=>v.fom===i)?c.filter(v=>v.fom!==i):[...c,{color:"DARKBLUE",fom:i,tom:i,isSelected:!0,srText:""}].sort(Bt))},[s,a]);return E.jsxs(E.Fragment,{children:[t.some(i=>i.srText)&&E.jsx("div",{className:"sr-only",children:t.filter(i=>i.srText).map(i=>i.srText).toString()}),E.jsx(J,{gap:"space-12",columns:{sm:1,md:a?1:2},children:o.map(({month:i,year:c},v)=>{const D=d.get(pe(c,i))??[],S=m?.year()===c&&m?.month()===i;return E.jsx(Ee,{isFirstMonth:v===0,year:c,month:i,periods:D,headerLevel:e?"5":"4",showWeekNumbers:r,dateTooltipCallback:n,dateClickCallback:a?l:void 0,focusedDate:S?m:void 0,setFocusedDate:p},`${c}-${i}`)})})]})},Ot=t=>t.reduce((e,r)=>g(r.tom).isAfter(g(e))?r.tom:e,t[0].tom),Pt=(t,e)=>{const r=g(t),n=g(e),a=r.month()%3,s=3-n.month()%3,o=r.subtract(a,"month"),d=n.add(s,"month"),m=Ut(o.toDate(),d.toDate());return Array.from({length:m},(p,l)=>{const i=o.add(l,"month");return{month:i.month(),year:i.year()}})},Ut=(t,e)=>{let r=(e.getFullYear()-t.getFullYear())*12;return r+=e.getMonth()-t.getMonth(),Math.max(r,0)},pe=(t,e)=>`${t}-${e}`,Gt=(t,e)=>{const r=new Map;for(const{year:n,month:a}of t){const s=g().year(n).month(a).startOf("month"),o=s.endOf("month"),d=e.filter(m=>g(m.tom).isSameOrAfter(s,"day")&&g(m.fom).isSameOrBefore(o,"day"));r.set(pe(n,a),d)}return r},St=(t,e)=>g(t).isBefore(g(e))?t:e,_t=(t,e)=>g(t).isBefore(g(e))?e:t,Bt=(t,e)=>g(t.fom).diff(g(e.fom));M.__docgenInfo={description:"",methods:[],displayName:"Calendar",props:{periods:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}],required:!0}},{key:"srText",value:{name:"string",required:!1}},{key:"isSelected",value:{name:"boolean",required:!1}}]}}],raw:"CalendarPeriod[]"},description:""},useSmallerWidth:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}},showWeekNumbers:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"true",computed:!1}},dateTooltipCallback:{required:!1,tsType:{name:"signature",type:"function",raw:"(date: string) => React.ReactElement | string",signature:{arguments:[{type:{name:"string"},name:"date"}],return:{name:"union",raw:"React.ReactElement | string",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"string"}]}}},description:""},setSelectedPeriods:{required:!1,tsType:{name:"signature",type:"function",raw:"(value: React.SetStateAction<CalendarPeriod[]>) => void",signature:{arguments:[{type:{name:"ReactSetStateAction",raw:"React.SetStateAction<CalendarPeriod[]>",elements:[{name:"Array",elements:[{name:"signature",type:"object",raw:`{
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
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}],required:!0}},{key:"srText",value:{name:"string",required:!1}},{key:"isSelected",value:{name:"boolean",required:!1}}]}}],raw:"CalendarPeriod[]"}]},name:"value"}],return:{name:"void"}}},description:""},isRangeSelection:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const Xt={title:"Calendar",component:M,render:t=>E.jsx("div",{style:{maxWidth:"704px"},children:E.jsx(M,{...t})})},G={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE"},{fom:"2024-02-21",tom:"2024-02-21",color:"PINK"},{fom:"2024-02-22",tom:"2024-05-05",color:"BLUE"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN"}]}},H={args:{...G.args,showWeekNumbers:!1}},K={args:{...G.args,dateTooltipCallback:t=>E.jsxs(de,{gap:"space-4",children:[E.jsx(xe,{children:"Dette er en tooltip"}),E.jsx(we,{children:t})]})}},q={args:G.args,render:()=>{const t=[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN"}],e=(s,o)=>g(s.fom).diff(g(o.fom)),[r,n]=u.useState(t),a=s=>{n(o=>(typeof s=="function"?s(o):s).sort(e))};return E.jsx(M,{periods:r,isRangeSelection:!1,setSelectedPeriods:a})}},V={args:G.args,render:()=>{const t=[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN"}],e=(s,o)=>g(s.fom).diff(g(o.fom)),[r,n]=u.useState(t),a=s=>{n(o=>(typeof s=="function"?s(o):s).sort(e))};return E.jsx(M,{periods:r,isRangeSelection:!0,setSelectedPeriods:a})}},F={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:"BLUE"},{fom:"2024-05-06",tom:"2024-08-30",color:"LIGHTGREEN"}]}},Y={args:{periods:[{fom:"2024-02-01",tom:"2024-02-20",color:"BLUE"},{fom:"2025-05-06",tom:"2025-07-30",color:"LIGHTGREEN"}]}};G.parameters={...G.parameters,docs:{...G.parameters?.docs,source:{originalSource:`{
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
    }]
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
    }]
  }
}`,...Y.parameters?.docs?.source}}};const Jt=["Default","IkkeVisUkenr","MedTooltip","VisKalenderMedValgAvEnkeltdager","VisKalenderMedValgAvPerioder","PeriodsWithGap","PeriodsThatSpanOverAYear"];export{G as Default,H as IkkeVisUkenr,K as MedTooltip,Y as PeriodsThatSpanOverAYear,F as PeriodsWithGap,q as VisKalenderMedValgAvEnkeltdager,V as VisKalenderMedValgAvPerioder,Jt as __namedExportsOrder,Xt as default};
