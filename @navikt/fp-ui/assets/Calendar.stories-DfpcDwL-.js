import{j as c}from"./jsx-runtime-D_zvdyIk.js";import{P as o}from"./colors-DoU1ogH6.js";import"./dates-W-weBhe0.js";import{d as m}from"./dayjs.min-BHKlbyDy.js";import{i as v,a as W}from"./isoWeek-Ch7ulmpg.js";import{B as $}from"./Box-DoRsLCLy.js";import{H as q}from"./Label-DOp5vt4D.js";import{r as w,R as T}from"./index-D4lIrffr.js";import{a as F,u as H,S as K}from"./Theme-utlH9hC9.js";import{o as V}from"./useId-91EFhMty.js";import{g as z,a as J,B as Q,P as X}from"./BasePrimitive-WZxBxuUc.js";var Z=function(e,a){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&a.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)a.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(t[r[n]]=e[r[n]]);return t};const B=w.forwardRef((e,a)=>{var{children:t,className:r,as:n="div",columns:s,gap:d,style:l,align:y,asChild:p}=e,_=Z(e,["children","className","as","columns","gap","style","align","asChild"]);const u=F(!1)?"ax":"a",{cn:Y}=H(),M=Object.assign(Object.assign(Object.assign(Object.assign({},l),{[`--__${u}c-hgrid-align`]:y}),z(u,"hgrid","gap","spacing",d)),J(u,"hgrid","columns",ee(s))),U=p?K:n;return T.createElement(Q,Object.assign({},_),T.createElement(U,Object.assign({},V(_,X),{ref:a,className:Y("navds-hgrid",r,{"navds-hgrid-gap":d,"navds-hgrid-align":y}),style:M}),t))});function ee(e){return e?typeof e=="string"||typeof e=="number"?A(e):Object.fromEntries(Object.entries(e).map(([a,t])=>[a,A(t)])):{}}const A=e=>typeof e=="number"?`repeat(${e}, minmax(0, 1fr))`:e,re="_days_18f94_1",te="_blueDay_18f94_15",ne="_lightblueDay_18f94_20",oe="_firstDay_18f94_27",ae="_lastDay_18f94_31",se="_firstAndLastDay_18f94_35",ie="_lightgreenDay_18f94_40",le="_greenDay_18f94_60",ce="_greenStripedDay_18f94_65",me="_blueStripedDay_18f94_100",de="_grayDay_18f94_135",ye="_blackDay_18f94_140",ue="_blueOutlineDay_18f94_146",fe="_greenOutlineDay_18f94_165",pe="_lightgreenBlueDay_18f94_184",_e="_lightblueGreenDay_18f94_211",ge="_none_18f94_237",De="_pinkDay_18f94_242",he="_purpleDay_18f94_257",i={days:re,blueDay:te,lightblueDay:ne,firstDay:oe,lastDay:ae,firstAndLastDay:se,lightgreenDay:ie,greenDay:le,greenStripedDay:ce,blueStripedDay:me,grayDay:de,blackDay:ye,blueOutlineDay:ue,greenOutlineDay:fe,lightgreenBlueDay:pe,lightblueGreenDay:_e,none:ge,pinkDay:De,purpleDay:he};var f=(e=>(e.FIRST_DAY="FIRST_DAY",e.LAST_DAY="LAST_DAY",e.FIRST_AND_LAST_DAY="FIRST_AND_LAST_DAY",e.BETWEEN_DAY="BETWEEN_DAY",e))(f||{});const Ee={[o.NONE]:i.none,[o.BLUE]:i.blueDay,[o.LIGHTGREEN]:i.lightgreenDay,[o.GRAY]:i.grayDay,[o.PINK]:i.pinkDay,[o.PURPLE]:i.purpleDay,[o.BLACK]:i.blackDay,[o.BLUEOUTLINE]:i.blueOutlineDay,[o.GREENOUTLINE]:i.greenOutlineDay,[o.LIGHTBLUE]:i.lightblueDay,[o.GREEN]:i.greenDay,[o.LIGHTBLUEGREEN]:i.lightblueGreenDay,[o.LIGHTGREENBLUE]:i.lightgreenBlueDay,[o.GREENSTRIPED]:i.greenStripedDay,[o.BLUESTRIPED]:i.blueStripedDay},j=({day:e,periodeColor:a,dayType:t})=>{const r=t==="FIRST_DAY",n=t==="LAST_DAY",s=t==="FIRST_AND_LAST_DAY";return c.jsx("div",{"data-testid":`day:${e};dayColor:${a};dayType:${t}`,className:`${i.days} ${Ee[a]} ${r&&i.firstDay} ${n&&i.lastDay} ${s&&i.firstAndLastDay}`,children:e})};j.__docgenInfo={description:"",methods:[],displayName:"Day",props:{day:{required:!0,tsType:{name:"number"},description:""},periodeColor:{required:!0,tsType:{name:"PeriodeColor"},description:""},dayType:{required:!0,tsType:{name:"DayType"},description:""}}};const be="_box_14xqs_1",Te={box:be};m.extend(v);const N=(e,a="MMMM")=>{const t=e.format(a);return t.charAt(0).toUpperCase()+t.slice(1)},k=({year:e,month:a,showYear:t,children:r,headerLevel:n})=>{const s=m().year(e).month(a).startOf("month"),d=s.isoWeekday(),l=s.endOf("month").isoWeekday(),y=s.daysInMonth()+(d-1)+(7-l),p=[...Array(y/7).keys()];let _=0;return c.jsxs($,{className:Te.box,"data-testid":`year:${e};month:${a}`,"aria-hidden":!0,children:[c.jsx(q,{size:"small",level:n,children:t?`${N(s,"MMM")} (${e})`:N(s)}),p.map(g=>c.jsx(B,{columns:7,children:[...Array(7).keys()].map(u=>g===0&&u<d-1?c.jsx("div",{},u):g+1===p.length&&u>=l?c.jsx("div",{},u):r[_++])},g))]})};k.__docgenInfo={description:"",methods:[],displayName:"Month",props:{year:{required:!0,tsType:{name:"number"},description:""},month:{required:!0,tsType:{name:"number"},description:""},showYear:{required:!0,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"Array",elements:[{name:"ReactReactNode",raw:"React.ReactNode"}],raw:"React.ReactNode[]"},description:""},headerLevel:{required:!0,tsType:{name:"union",raw:"'4' | '5'",elements:[{name:"literal",value:"'4'"},{name:"literal",value:"'5'"}]},description:""}}};const Ae="_srOnly_19lbm_1",Ne={srOnly:Ae};m.extend(v);m.extend(W);const Le=(e,a,t,r)=>{const n=m().year(e).month(a).date(t),s=r[0].fom,d=r[r.length-1].tom;if(n.isBefore(s,"day")||n.isAfter(d,"day"))return o.NONE;const l=r.find(y=>n.isBetween(y.fom,y.tom,"day","[]"));return(l==null?void 0:l.color)===o.PINK?o.PINK:(l==null?void 0:l.color)===o.PURPLE?o.PURPLE:n.isoWeekday()===6||n.isoWeekday()===7?o.GRAY:(l==null?void 0:l.color)??o.NONE},Se=(e,a,t)=>{const r=t.find(n=>n.color===o.PINK);return e.isoWeekday()===6||e.isoWeekday()===1||a===1||t.some(n=>e.isSame(n.fom,"day"))||r&&m(r.fom).isSame(e.subtract(1,"day"),"day")},Pe=(e,a,t)=>{const r=t.find(n=>n.color===o.PINK);return e.isoWeekday()===7||e.isoWeekday()===5||a===e.daysInMonth()||t.some(n=>e.isSame(n.tom,"day"))||r&&m(r.fom).isSame(e.add(1,"day"),"day")},Oe=(e,a,t,r)=>{const n=m().year(e).month(a).date(t),s=Se(n,t,r),d=Pe(n,t,r);return s&&d?f.FIRST_AND_LAST_DAY:s?f.FIRST_DAY:d?f.LAST_DAY:f.BETWEEN_DAY},xe=(e,a)=>{let t;return t=(a.getFullYear()-e.getFullYear())*12,t-=e.getMonth(),t+=a.getMonth(),t<=0?0:t},Ie=(e,a)=>{const t=m(e).month()%3,r=3-m(a).month()%3,n=m(e).subtract(t,"month"),s=m(a).add(r,"month"),d=xe(n.toDate(),s.toDate());return[...new Array(d)].map((l,y)=>({month:n.add(y,"month").month(),year:n.add(y,"month").year()}))},b=({periods:e,useSmallerWidth:a=!1})=>{const t=Ie(e[0].fom,e[e.length-1].tom);return c.jsxs(c.Fragment,{children:[e.some(r=>r.srText)&&c.jsx("div",{className:Ne.srOnly,children:e.filter(r=>r.srText).map(r=>r.srText).toString()}),c.jsx(B,{gap:{xs:"2",sm:"4",md:"8"},columns:a?{xs:"repeat(1, 1fr)",sm:"repeat(3, 1fr)"}:{xs:"repeat(2, 1fr)",sm:"repeat(3, 1fr)"},children:t.map((r,n)=>c.jsx(k,{year:r.year,month:r.month,showYear:n>0&&t[n-1].year!==r.year,headerLevel:a?"5":"4",children:[...Array(m().year(r.year).month(r.month).daysInMonth()).keys()].map(s=>c.jsx(j,{day:s+1,periodeColor:Le(r.year,r.month,s+1,e),dayType:Oe(r.year,r.month,s+1,e)},r.year+r.month+s))},r.year+"-"+r.month))})]})};b.__docgenInfo={description:"",methods:[],displayName:"Calendar",props:{periods:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    color: PeriodeColor;
    srText?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"color",value:{name:"PeriodeColor",required:!0}},{key:"srText",value:{name:"string",required:!1}}]}}],raw:"Period[]"},description:""},useSmallerWidth:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const $e={title:"Calendar",component:b,render:e=>c.jsx("div",{style:{maxWidth:"704px"},children:c.jsx(b,{...e})})},D={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:o.BLUE},{fom:"2024-02-21",tom:"2024-02-21",color:o.PINK},{fom:"2024-02-22",tom:"2024-05-05",color:o.BLUE},{fom:"2024-05-06",tom:"2024-08-30",color:o.LIGHTGREEN}]}},h={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:o.BLUE},{fom:"2024-05-06",tom:"2024-08-30",color:o.LIGHTGREEN}]}},E={args:{periods:[{fom:"2024-02-01",tom:"2024-02-20",color:o.BLUE},{fom:"2025-05-06",tom:"2025-07-30",color:o.LIGHTGREEN}]}};var L,S,P;D.parameters={...D.parameters,docs:{...(L=D.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
}`,...(P=(S=D.parameters)==null?void 0:S.docs)==null?void 0:P.source}}};var O,x,I;h.parameters={...h.parameters,docs:{...(O=h.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(I=(x=h.parameters)==null?void 0:x.docs)==null?void 0:I.source}}};var R,G,C;E.parameters={...E.parameters,docs:{...(R=E.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(C=(G=E.parameters)==null?void 0:G.docs)==null?void 0:C.source}}};const qe=["Default","PeriodsWithGap","PeriodsThatSpanOverAYear"];export{D as Default,E as PeriodsThatSpanOverAYear,h as PeriodsWithGap,qe as __namedExportsOrder,$e as default};
