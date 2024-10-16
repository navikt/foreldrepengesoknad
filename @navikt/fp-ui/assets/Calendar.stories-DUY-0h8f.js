import{j as c}from"./jsx-runtime-Cw0GR0a5.js";import{P as o}from"./colors-DoU1ogH6.js";import"./dates-wsUZxpzE.js";import{d as m}from"./dayjs.min-0BeM2qWp.js";import{i as j,a as W}from"./isoWeek-3FZMy8l4.js";import{B as M}from"./Box-CX9D1vBH.js";import{H as U}from"./Label-oPV7DuXz.js";import{o as $,c as F}from"./useId-BGzI-o9Y.js";import{r as H,R as A}from"./index-CTjT7uj6.js";import{g as w,a as K,B as q,P as V,S as z}from"./BasePrimitive-BIOAorSf.js";import"./useMergeRefs-Bb4JH14W.js";var J=function(e,s){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&s.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)s.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(t[r[n]]=e[r[n]]);return t};const k=H.forwardRef((e,s)=>{var{children:t,className:r,as:n="div",columns:a,gap:y,style:l,align:d,asChild:f}=e,D=J(e,["children","className","as","columns","gap","style","align","asChild"]);const g=Object.assign(Object.assign(Object.assign(Object.assign({},l),{"--__ac-hgrid-align":d}),w("hgrid","gap","spacing",y)),K("hgrid","columns",Q(a))),u=f?z:n;return A.createElement(q,Object.assign({},D),A.createElement(u,Object.assign({},$(D,V),{ref:s,className:F("navds-hgrid",r,{"navds-hgrid-gap":y,"navds-hgrid-align":d}),style:g}),t))});function Q(e){return e?typeof e=="string"||typeof e=="number"?L(e):Object.fromEntries(Object.entries(e).map(([s,t])=>[s,L(t)])):{}}const L=e=>typeof e=="number"?`repeat(${e}, minmax(0, 1fr))`:e,X="_days_17ye4_1",Z="_blueDay_17ye4_15",ee="_lightblueDay_17ye4_20",re="_firstDay_17ye4_27",te="_lastDay_17ye4_31",ne="_firstAndLastDay_17ye4_35",oe="_lightgreenDay_17ye4_40",se="_greenDay_17ye4_60",ae="_greenStripedDay_17ye4_65",ie="_blueStripedDay_17ye4_100",le="_grayDay_17ye4_135",ce="_blackDay_17ye4_140",me="_blueOutlineDay_17ye4_146",ye="_greenOutlineDay_17ye4_165",de="_lightgreenBlueDay_17ye4_184",ue="_lightblueGreenDay_17ye4_211",ge="_none_17ye4_237",_e="_pinkDay_17ye4_242",fe="_purpleDay_17ye4_257",i={days:X,blueDay:Z,lightblueDay:ee,firstDay:re,lastDay:te,firstAndLastDay:ne,lightgreenDay:oe,greenDay:se,greenStripedDay:ae,blueStripedDay:ie,grayDay:le,blackDay:ce,blueOutlineDay:me,greenOutlineDay:ye,lightgreenBlueDay:de,lightblueGreenDay:ue,none:ge,pinkDay:_e,purpleDay:fe};var _=(e=>(e.FIRST_DAY="FIRST_DAY",e.LAST_DAY="LAST_DAY",e.FIRST_AND_LAST_DAY="FIRST_AND_LAST_DAY",e.BETWEEN_DAY="BETWEEN_DAY",e))(_||{});const De={[o.NONE]:i.none,[o.BLUE]:i.blueDay,[o.LIGHTGREEN]:i.lightgreenDay,[o.GRAY]:i.grayDay,[o.PINK]:i.pinkDay,[o.PURPLE]:i.purpleDay,[o.BLACK]:i.blackDay,[o.BLUEOUTLINE]:i.blueOutlineDay,[o.GREENOUTLINE]:i.greenOutlineDay,[o.LIGHTBLUE]:i.lightblueDay,[o.GREEN]:i.greenDay,[o.LIGHTBLUEGREEN]:i.lightblueGreenDay,[o.LIGHTGREENBLUE]:i.lightgreenBlueDay,[o.GREENSTRIPED]:i.greenStripedDay,[o.BLUESTRIPED]:i.blueStripedDay},v=({day:e,periodeColor:s,dayType:t})=>{const r=t==="FIRST_DAY",n=t==="LAST_DAY",a=t==="FIRST_AND_LAST_DAY";return c.jsx("div",{"data-testid":`day:${e};dayColor:${s};dayType:${t}`,className:`${i.days} ${De[s]} ${r&&i.firstDay} ${n&&i.lastDay} ${a&&i.firstAndLastDay}`,children:e})};v.__docgenInfo={description:"",methods:[],displayName:"Day"};const he="_box_14xqs_1",pe={box:he};m.extend(j);const N=(e,s="MMMM")=>{const t=e.format(s);return t.charAt(0).toUpperCase()+t.slice(1)},Y=({year:e,month:s,showYear:t,children:r,headerLevel:n})=>{const a=m().year(e).month(s).startOf("month"),y=a.isoWeekday(),l=a.endOf("month").isoWeekday(),d=a.daysInMonth()+(y-1)+(7-l),f=[...Array(d/7).keys()];let D=0;return c.jsxs(M,{className:pe.box,"data-testid":`year:${e};month:${s}`,"aria-hidden":!0,children:[c.jsx(U,{size:"small",level:n,children:t?`${N(a,"MMM")} (${e})`:N(a)}),f.map(g=>c.jsx(k,{columns:7,children:[...Array(7).keys()].map(u=>g===0&&u<y-1?c.jsx("div",{},u):g+1===f.length&&u>=l?c.jsx("div",{},u):r[D++])},g))]})};Y.__docgenInfo={description:"",methods:[],displayName:"Month"};const Ee="_gridColumnsWide_1hgbu_1",be="_gridColumnsSmall_1hgbu_5",Se="_srOnly_1hgbu_27",b={gridColumnsWide:Ee,gridColumnsSmall:be,srOnly:Se};m.extend(j);m.extend(W);const Ae=(e,s,t,r)=>{const n=m().year(e).month(s).date(t),a=r[0].fom,y=r[r.length-1].tom;if(n.isBefore(a,"day")||n.isAfter(y,"day"))return o.NONE;const l=r.find(d=>n.isBetween(d.fom,d.tom,"day","[]"));return(l==null?void 0:l.color)===o.PINK?o.PINK:(l==null?void 0:l.color)===o.PURPLE?o.PURPLE:n.isoWeekday()===6||n.isoWeekday()===7?o.GRAY:(l==null?void 0:l.color)||o.NONE},Le=(e,s,t)=>{const r=t.find(n=>n.color===o.PINK);return e.isoWeekday()===6||e.isoWeekday()===1||s===1||t.some(n=>e.isSame(n.fom,"day"))||r&&m(r.fom).isSame(e.subtract(1,"day"),"day")},Ne=(e,s,t)=>{const r=t.find(n=>n.color===o.PINK);return e.isoWeekday()===7||e.isoWeekday()===5||s===e.daysInMonth()||t.some(n=>e.isSame(n.tom,"day"))||r&&m(r.fom).isSame(e.add(1,"day"),"day")},Pe=(e,s,t,r)=>{const n=m().year(e).month(s).date(t),a=Le(n,t,r),y=Ne(n,t,r);return a&&y?_.FIRST_AND_LAST_DAY:a?_.FIRST_DAY:y?_.LAST_DAY:_.BETWEEN_DAY},Oe=(e,s)=>{let t;return t=(s.getFullYear()-e.getFullYear())*12,t-=e.getMonth(),t+=s.getMonth(),t<=0?0:t},Te=(e,s)=>{const t=m(e).month()%3,r=3-m(s).month()%3,n=m(e).subtract(t,"month"),a=m(s).add(r,"month"),y=Oe(n.toDate(),a.toDate());return[...new Array(y)].map((l,d)=>({month:n.add(d,"month").month(),year:n.add(d,"month").year()}))},S=({periods:e,useSmallerWidth:s=!1})=>{const t=Te(e[0].fom,e[e.length-1].tom);return c.jsxs(c.Fragment,{children:[e.some(r=>r.srText)&&c.jsx("div",{className:b.srOnly,children:e.filter(r=>r.srText).map(r=>r.srText).toString()}),c.jsx(k,{gap:{xs:"2",sm:"4",md:"8"},className:s?b.gridColumnsSmall:b.gridColumnsWide,children:t.map((r,n)=>c.jsx(Y,{year:r.year,month:r.month,showYear:n>0&&t[n-1].year!==r.year,headerLevel:s?"5":"4",children:[...Array(m().year(r.year).month(r.month).daysInMonth()).keys()].map(a=>c.jsx(v,{day:a+1,periodeColor:Ae(r.year,r.month,a+1,e),dayType:Pe(r.year,r.month,a+1,e)},r.year+r.month+a))},r.year+"-"+r.month))})]})};S.__docgenInfo={description:"",methods:[],displayName:"Calendar",props:{periods:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    color: PeriodeColor;
    srText?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"color",value:{name:"PeriodeColor",required:!0}},{key:"srText",value:{name:"string",required:!1}}]}}],raw:"Period[]"},description:""},useSmallerWidth:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const Me={title:"Calendar",component:S,render:e=>c.jsx("div",{style:{maxWidth:"704px"},children:c.jsx(S,{...e})})},h={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:o.BLUE},{fom:"2024-02-21",tom:"2024-02-21",color:o.PINK},{fom:"2024-02-22",tom:"2024-05-05",color:o.BLUE},{fom:"2024-05-06",tom:"2024-08-30",color:o.LIGHTGREEN}]}},p={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:o.BLUE},{fom:"2024-05-06",tom:"2024-08-30",color:o.LIGHTGREEN}]}},E={args:{periods:[{fom:"2024-02-01",tom:"2024-02-20",color:o.BLUE},{fom:"2025-05-06",tom:"2025-07-30",color:o.LIGHTGREEN}]}};var P,O,T;h.parameters={...h.parameters,docs:{...(P=h.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(T=(O=h.parameters)==null?void 0:O.docs)==null?void 0:T.source}}};var I,x,R;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
}`,...(R=(x=p.parameters)==null?void 0:x.docs)==null?void 0:R.source}}};var C,G,B;E.parameters={...E.parameters,docs:{...(C=E.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(B=(G=E.parameters)==null?void 0:G.docs)==null?void 0:B.source}}};const Ue=["Default","PeriodsWithGap","PeriodsThatSpanOverAYear"];export{h as Default,E as PeriodsThatSpanOverAYear,p as PeriodsWithGap,Ue as __namedExportsOrder,Me as default};
