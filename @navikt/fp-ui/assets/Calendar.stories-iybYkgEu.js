import{j as c}from"./jsx-runtime-Cw0GR0a5.js";import{P as o}from"./colors-DoU1ogH6.js";import"./dates-wsUZxpzE.js";import{d as m}from"./dayjs.min-0BeM2qWp.js";import{i as j,a as Y}from"./isoWeek-3FZMy8l4.js";import{B as M}from"./Box-NsBh_7cn.js";import{H as U}from"./Label-oPV7DuXz.js";import{o as W,c as $}from"./useId-BGzI-o9Y.js";import{r as F,R as A}from"./index-CTjT7uj6.js";import{g as H,a as w,B as K,P as q,S as V}from"./BasePrimitive-D4NMUMeT.js";import"./useMergeRefs-Bb4JH14W.js";var z=function(e,a){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&a.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)a.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(t[r[n]]=e[r[n]]);return t};const k=F.forwardRef((e,a)=>{var{children:t,className:r,as:n="div",columns:s,gap:y,style:l,align:d,asChild:g}=e,D=z(e,["children","className","as","columns","gap","style","align","asChild"]);const u=Object.assign(Object.assign(Object.assign(Object.assign({},l),{"--__ac-hgrid-align":d}),H("hgrid","gap","spacing",y)),w("hgrid","columns",J(s))),f=g?V:n;return A.createElement(K,Object.assign({},D),A.createElement(f,Object.assign({},W(D,q),{ref:a,className:$("navds-hgrid",r,{"navds-hgrid-gap":y,"navds-hgrid-align":d}),style:u}),t))});function J(e){return e?typeof e=="string"||typeof e=="number"?L(e):Object.fromEntries(Object.entries(e).map(([a,t])=>[a,L(t)])):{}}const L=e=>typeof e=="number"?`repeat(${e}, minmax(0, 1fr))`:e,Q="_days_18f94_1",X="_blueDay_18f94_15",Z="_lightblueDay_18f94_20",ee="_firstDay_18f94_27",re="_lastDay_18f94_31",te="_firstAndLastDay_18f94_35",ne="_lightgreenDay_18f94_40",oe="_greenDay_18f94_60",ae="_greenStripedDay_18f94_65",se="_blueStripedDay_18f94_100",ie="_grayDay_18f94_135",le="_blackDay_18f94_140",ce="_blueOutlineDay_18f94_146",me="_greenOutlineDay_18f94_165",ye="_lightgreenBlueDay_18f94_184",de="_lightblueGreenDay_18f94_211",fe="_none_18f94_237",ue="_pinkDay_18f94_242",_e="_purpleDay_18f94_257",i={days:Q,blueDay:X,lightblueDay:Z,firstDay:ee,lastDay:re,firstAndLastDay:te,lightgreenDay:ne,greenDay:oe,greenStripedDay:ae,blueStripedDay:se,grayDay:ie,blackDay:le,blueOutlineDay:ce,greenOutlineDay:me,lightgreenBlueDay:ye,lightblueGreenDay:de,none:fe,pinkDay:ue,purpleDay:_e};var _=(e=>(e.FIRST_DAY="FIRST_DAY",e.LAST_DAY="LAST_DAY",e.FIRST_AND_LAST_DAY="FIRST_AND_LAST_DAY",e.BETWEEN_DAY="BETWEEN_DAY",e))(_||{});const ge={[o.NONE]:i.none,[o.BLUE]:i.blueDay,[o.LIGHTGREEN]:i.lightgreenDay,[o.GRAY]:i.grayDay,[o.PINK]:i.pinkDay,[o.PURPLE]:i.purpleDay,[o.BLACK]:i.blackDay,[o.BLUEOUTLINE]:i.blueOutlineDay,[o.GREENOUTLINE]:i.greenOutlineDay,[o.LIGHTBLUE]:i.lightblueDay,[o.GREEN]:i.greenDay,[o.LIGHTBLUEGREEN]:i.lightblueGreenDay,[o.LIGHTGREENBLUE]:i.lightgreenBlueDay,[o.GREENSTRIPED]:i.greenStripedDay,[o.BLUESTRIPED]:i.blueStripedDay},v=({day:e,periodeColor:a,dayType:t})=>{const r=t==="FIRST_DAY",n=t==="LAST_DAY",s=t==="FIRST_AND_LAST_DAY";return c.jsx("div",{"data-testid":`day:${e};dayColor:${a};dayType:${t}`,className:`${i.days} ${ge[a]} ${r&&i.firstDay} ${n&&i.lastDay} ${s&&i.firstAndLastDay}`,children:e})};v.__docgenInfo={description:"",methods:[],displayName:"Day"};const De="_box_14xqs_1",pe={box:De};m.extend(j);const N=(e,a="MMMM")=>{const t=e.format(a);return t.charAt(0).toUpperCase()+t.slice(1)},C=({year:e,month:a,showYear:t,children:r,headerLevel:n})=>{const s=m().year(e).month(a).startOf("month"),y=s.isoWeekday(),l=s.endOf("month").isoWeekday(),d=s.daysInMonth()+(y-1)+(7-l),g=[...Array(d/7).keys()];let D=0;return c.jsxs(M,{className:pe.box,"data-testid":`year:${e};month:${a}`,"aria-hidden":!0,children:[c.jsx(U,{size:"small",level:n,children:t?`${N(s,"MMM")} (${e})`:N(s)}),g.map(u=>c.jsx(k,{columns:7,children:[...Array(7).keys()].map(f=>u===0&&f<y-1?c.jsx("div",{},f):u+1===g.length&&f>=l?c.jsx("div",{},f):r[D++])},u))]})};C.__docgenInfo={description:"",methods:[],displayName:"Month"};const he="_srOnly_19lbm_1",Ee={srOnly:he};m.extend(j);m.extend(Y);const be=(e,a,t,r)=>{const n=m().year(e).month(a).date(t),s=r[0].fom,y=r[r.length-1].tom;if(n.isBefore(s,"day")||n.isAfter(y,"day"))return o.NONE;const l=r.find(d=>n.isBetween(d.fom,d.tom,"day","[]"));return(l==null?void 0:l.color)===o.PINK?o.PINK:(l==null?void 0:l.color)===o.PURPLE?o.PURPLE:n.isoWeekday()===6||n.isoWeekday()===7?o.GRAY:(l==null?void 0:l.color)||o.NONE},Ae=(e,a,t)=>{const r=t.find(n=>n.color===o.PINK);return e.isoWeekday()===6||e.isoWeekday()===1||a===1||t.some(n=>e.isSame(n.fom,"day"))||r&&m(r.fom).isSame(e.subtract(1,"day"),"day")},Le=(e,a,t)=>{const r=t.find(n=>n.color===o.PINK);return e.isoWeekday()===7||e.isoWeekday()===5||a===e.daysInMonth()||t.some(n=>e.isSame(n.tom,"day"))||r&&m(r.fom).isSame(e.add(1,"day"),"day")},Ne=(e,a,t,r)=>{const n=m().year(e).month(a).date(t),s=Ae(n,t,r),y=Le(n,t,r);return s&&y?_.FIRST_AND_LAST_DAY:s?_.FIRST_DAY:y?_.LAST_DAY:_.BETWEEN_DAY},Pe=(e,a)=>{let t;return t=(a.getFullYear()-e.getFullYear())*12,t-=e.getMonth(),t+=a.getMonth(),t<=0?0:t},Se=(e,a)=>{const t=m(e).month()%3,r=3-m(a).month()%3,n=m(e).subtract(t,"month"),s=m(a).add(r,"month"),y=Pe(n.toDate(),s.toDate());return[...new Array(y)].map((l,d)=>({month:n.add(d,"month").month(),year:n.add(d,"month").year()}))},b=({periods:e,useSmallerWidth:a=!1})=>{const t=Se(e[0].fom,e[e.length-1].tom);return c.jsxs(c.Fragment,{children:[e.some(r=>r.srText)&&c.jsx("div",{className:Ee.srOnly,children:e.filter(r=>r.srText).map(r=>r.srText).toString()}),c.jsx(k,{gap:{xs:"2",sm:"4",md:"8"},columns:a?{xs:"repeat(1, 1fr)",sm:"repeat(3, 1fr)"}:{xs:"repeat(2, 1fr)",sm:"repeat(3, 1fr)"},children:t.map((r,n)=>c.jsx(C,{year:r.year,month:r.month,showYear:n>0&&t[n-1].year!==r.year,headerLevel:a?"5":"4",children:[...Array(m().year(r.year).month(r.month).daysInMonth()).keys()].map(s=>c.jsx(v,{day:s+1,periodeColor:be(r.year,r.month,s+1,e),dayType:Ne(r.year,r.month,s+1,e)},r.year+r.month+s))},r.year+"-"+r.month))})]})};b.__docgenInfo={description:"",methods:[],displayName:"Calendar",props:{periods:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    color: PeriodeColor;
    srText?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"color",value:{name:"PeriodeColor",required:!0}},{key:"srText",value:{name:"string",required:!1}}]}}],raw:"Period[]"},description:""},useSmallerWidth:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const Ye={title:"Calendar",component:b,render:e=>c.jsx("div",{style:{maxWidth:"704px"},children:c.jsx(b,{...e})})},p={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:o.BLUE},{fom:"2024-02-21",tom:"2024-02-21",color:o.PINK},{fom:"2024-02-22",tom:"2024-05-05",color:o.BLUE},{fom:"2024-05-06",tom:"2024-08-30",color:o.LIGHTGREEN}]}},h={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:o.BLUE},{fom:"2024-05-06",tom:"2024-08-30",color:o.LIGHTGREEN}]}},E={args:{periods:[{fom:"2024-02-01",tom:"2024-02-20",color:o.BLUE},{fom:"2025-05-06",tom:"2025-07-30",color:o.LIGHTGREEN}]}};var P,S,O;p.parameters={...p.parameters,docs:{...(P=p.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    periods: [{
      fom: '2024-01-31',
      tom: '2024-02-20',
      color: PeriodeColor.BLUE
    }, {
      fom: '2024-02-21',
      tom: '2024-02-21',
      color: PeriodeColor.PINK
    }, {
      fom: '2024-02-22',
      tom: '2024-05-05',
      color: PeriodeColor.BLUE
    }, {
      fom: '2024-05-06',
      tom: '2024-08-30',
      color: PeriodeColor.LIGHTGREEN
    }]
  }
}`,...(O=(S=p.parameters)==null?void 0:S.docs)==null?void 0:O.source}}};var T,I,x;h.parameters={...h.parameters,docs:{...(T=h.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    periods: [{
      fom: '2024-01-31',
      tom: '2024-02-20',
      color: PeriodeColor.BLUE
    }, {
      fom: '2024-05-06',
      tom: '2024-08-30',
      color: PeriodeColor.LIGHTGREEN
    }]
  }
}`,...(x=(I=h.parameters)==null?void 0:I.docs)==null?void 0:x.source}}};var R,G,B;E.parameters={...E.parameters,docs:{...(R=E.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    periods: [{
      fom: '2024-02-01',
      tom: '2024-02-20',
      color: PeriodeColor.BLUE
    }, {
      fom: '2025-05-06',
      tom: '2025-07-30',
      color: PeriodeColor.LIGHTGREEN
    }]
  }
}`,...(B=(G=E.parameters)==null?void 0:G.docs)==null?void 0:B.source}}};const Me=["Default","PeriodsWithGap","PeriodsThatSpanOverAYear"];export{p as Default,E as PeriodsThatSpanOverAYear,h as PeriodsWithGap,Me as __namedExportsOrder,Ye as default};
