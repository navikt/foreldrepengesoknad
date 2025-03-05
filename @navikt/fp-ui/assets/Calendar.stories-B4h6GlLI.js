import{j as c}from"./jsx-runtime-CLpGMVip.js";import{P as o}from"./colors-jfTJ4KPK.js";import"./dates-l9FtPD11.js";import{d as m}from"./dayjs.min-Cu1bdzaI.js";import{i as v,a as W}from"./isoWeek-DRwwro2u.js";import{B as w}from"./Box-oHOuy_fb.js";import{H as $}from"./Label-QI4r3q9e.js";import{r as q,R as T}from"./index-CZMpeKRu.js";import{a as H,u as F,o as K,S as V}from"./useId-U89bW7jp.js";import{g as z,a as J,B as Q,P as X}from"./BasePrimitive-CMWW3eNW.js";var Z=function(e,a){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&a.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)a.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(t[r[n]]=e[r[n]]);return t};const B=q.forwardRef((e,a)=>{var{children:t,className:r,as:n="div",columns:s,gap:y,style:l,align:d,asChild:p}=e,_=Z(e,["children","className","as","columns","gap","style","align","asChild"]);const u=H(!1)?"ax":"a",{cn:Y}=F(),M=Object.assign(Object.assign(Object.assign(Object.assign({},l),{[`--__${u}c-hgrid-align`]:d}),z(u,"hgrid","gap","spacing",y)),J(u,"hgrid","columns",ee(s))),U=p?V:n;return T.createElement(Q,Object.assign({},_),T.createElement(U,Object.assign({},K(_,X),{ref:a,className:Y("navds-hgrid",r,{"navds-hgrid-gap":y,"navds-hgrid-align":d}),style:M}),t))});function ee(e){return e?typeof e=="string"||typeof e=="number"?L(e):Object.fromEntries(Object.entries(e).map(([a,t])=>[a,L(t)])):{}}const L=e=>typeof e=="number"?`repeat(${e}, minmax(0, 1fr))`:e,re="_days_1pfb2_1",te="_blueDay_1pfb2_15",ne="_yellowDay_1pfb2_20",oe="_lightblueDay_1pfb2_25",ae="_firstDay_1pfb2_32",se="_lastDay_1pfb2_36",ie="_firstAndLastDay_1pfb2_40",le="_lightgreenDay_1pfb2_45",ce="_greenDay_1pfb2_65",me="_greenStripedDay_1pfb2_70",ye="_blueStripedDay_1pfb2_105",de="_grayDay_1pfb2_140",ue="_blackDay_1pfb2_145",fe="_blueOutlineDay_1pfb2_151",pe="_greenOutlineDay_1pfb2_170",_e="_lightgreenBlueDay_1pfb2_189",ge="_lightblueGreenDay_1pfb2_216",De="_none_1pfb2_242",he="_pinkDay_1pfb2_247",be="_purpleDay_1pfb2_262",i={days:re,blueDay:te,yellowDay:ne,lightblueDay:oe,firstDay:ae,lastDay:se,firstAndLastDay:ie,lightgreenDay:le,greenDay:ce,greenStripedDay:me,blueStripedDay:ye,grayDay:de,blackDay:ue,blueOutlineDay:fe,greenOutlineDay:pe,lightgreenBlueDay:_e,lightblueGreenDay:ge,none:De,pinkDay:he,purpleDay:be};var f=(e=>(e.FIRST_DAY="FIRST_DAY",e.LAST_DAY="LAST_DAY",e.FIRST_AND_LAST_DAY="FIRST_AND_LAST_DAY",e.BETWEEN_DAY="BETWEEN_DAY",e))(f||{});const Ee={[o.NONE]:i.none,[o.BLUE]:i.blueDay,[o.LIGHTGREEN]:i.lightgreenDay,[o.GRAY]:i.grayDay,[o.PINK]:i.pinkDay,[o.PURPLE]:i.purpleDay,[o.BLACK]:i.blackDay,[o.BLUEOUTLINE]:i.blueOutlineDay,[o.GREENOUTLINE]:i.greenOutlineDay,[o.LIGHTBLUE]:i.lightblueDay,[o.GREEN]:i.greenDay,[o.LIGHTBLUEGREEN]:i.lightblueGreenDay,[o.LIGHTGREENBLUE]:i.lightgreenBlueDay,[o.GREENSTRIPED]:i.greenStripedDay,[o.BLUESTRIPED]:i.blueStripedDay,[o.LIGHTYELLOW]:i.yellowDay},j=({day:e,periodeColor:a,dayType:t})=>{const r=t==="FIRST_DAY",n=t==="LAST_DAY",s=t==="FIRST_AND_LAST_DAY";return c.jsx("div",{"data-testid":`day:${e};dayColor:${a};dayType:${t}`,className:`${i.days} ${Ee[a]} ${r&&i.firstDay} ${n&&i.lastDay} ${s&&i.firstAndLastDay}`,children:e})};j.__docgenInfo={description:"",methods:[],displayName:"Day",props:{day:{required:!0,tsType:{name:"number"},description:""},periodeColor:{required:!0,tsType:{name:"PeriodeColor"},description:""},dayType:{required:!0,tsType:{name:"DayType"},description:""}}};const Te="_box_14xqs_1",Le={box:Te};m.extend(v);const A=(e,a="MMMM")=>{const t=e.format(a);return t.charAt(0).toUpperCase()+t.slice(1)},k=({year:e,month:a,showYear:t,children:r,headerLevel:n})=>{const s=m().year(e).month(a).startOf("month"),y=s.isoWeekday(),l=s.endOf("month").isoWeekday(),d=s.daysInMonth()+(y-1)+(7-l),p=[...Array(d/7).keys()];let _=0;return c.jsxs(w,{className:Le.box,"data-testid":`year:${e};month:${a}`,"aria-hidden":!0,children:[c.jsx($,{size:"small",level:n,children:t?`${A(s,"MMM")} (${e})`:A(s)}),p.map(g=>c.jsx(B,{columns:7,children:[...Array(7).keys()].map(u=>g===0&&u<y-1?c.jsx("div",{},u):g+1===p.length&&u>=l?c.jsx("div",{},u):r[_++])},g))]})};k.__docgenInfo={description:"",methods:[],displayName:"Month",props:{year:{required:!0,tsType:{name:"number"},description:""},month:{required:!0,tsType:{name:"number"},description:""},showYear:{required:!0,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"Array",elements:[{name:"ReactReactNode",raw:"React.ReactNode"}],raw:"React.ReactNode[]"},description:""},headerLevel:{required:!0,tsType:{name:"union",raw:"'4' | '5'",elements:[{name:"literal",value:"'4'"},{name:"literal",value:"'5'"}]},description:""}}};const Ae="_srOnly_19lbm_1",Ne={srOnly:Ae};m.extend(v);m.extend(W);const Se=(e,a,t,r)=>{const n=m().year(e).month(a).date(t),s=r[0].fom,y=r[r.length-1].tom;if(n.isBefore(s,"day")||n.isAfter(y,"day"))return o.NONE;const l=r.find(d=>n.isBetween(d.fom,d.tom,"day","[]"));return(l==null?void 0:l.color)===o.PINK?o.PINK:(l==null?void 0:l.color)===o.PURPLE?o.PURPLE:n.isoWeekday()===6||n.isoWeekday()===7?o.GRAY:(l==null?void 0:l.color)||o.NONE},Pe=(e,a,t)=>{const r=t.find(n=>n.color===o.PINK);return e.isoWeekday()===6||e.isoWeekday()===1||a===1||t.some(n=>e.isSame(n.fom,"day"))||r&&m(r.fom).isSame(e.subtract(1,"day"),"day")},Oe=(e,a,t)=>{const r=t.find(n=>n.color===o.PINK);return e.isoWeekday()===7||e.isoWeekday()===5||a===e.daysInMonth()||t.some(n=>e.isSame(n.tom,"day"))||r&&m(r.fom).isSame(e.add(1,"day"),"day")},Ie=(e,a,t,r)=>{const n=m().year(e).month(a).date(t),s=Pe(n,t,r),y=Oe(n,t,r);return s&&y?f.FIRST_AND_LAST_DAY:s?f.FIRST_DAY:y?f.LAST_DAY:f.BETWEEN_DAY},xe=(e,a)=>{let t;return t=(a.getFullYear()-e.getFullYear())*12,t-=e.getMonth(),t+=a.getMonth(),t<=0?0:t},Re=(e,a)=>{const t=m(e).month()%3,r=3-m(a).month()%3,n=m(e).subtract(t,"month"),s=m(a).add(r,"month"),y=xe(n.toDate(),s.toDate());return[...new Array(y)].map((l,d)=>({month:n.add(d,"month").month(),year:n.add(d,"month").year()}))},E=({periods:e,useSmallerWidth:a=!1})=>{const t=Re(e[0].fom,e[e.length-1].tom);return c.jsxs(c.Fragment,{children:[e.some(r=>r.srText)&&c.jsx("div",{className:Ne.srOnly,children:e.filter(r=>r.srText).map(r=>r.srText).toString()}),c.jsx(B,{gap:{xs:"2",sm:"4",md:"8"},columns:a?{xs:"repeat(1, 1fr)",sm:"repeat(3, 1fr)"}:{xs:"repeat(2, 1fr)",sm:"repeat(3, 1fr)"},children:t.map((r,n)=>c.jsx(k,{year:r.year,month:r.month,showYear:n>0&&t[n-1].year!==r.year,headerLevel:a?"5":"4",children:[...Array(m().year(r.year).month(r.month).daysInMonth()).keys()].map(s=>c.jsx(j,{day:s+1,periodeColor:Se(r.year,r.month,s+1,e),dayType:Ie(r.year,r.month,s+1,e)},r.year+r.month+s))},r.year+"-"+r.month))})]})};E.__docgenInfo={description:"",methods:[],displayName:"Calendar",props:{periods:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    color: PeriodeColor;
    srText?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"color",value:{name:"PeriodeColor",required:!0}},{key:"srText",value:{name:"string",required:!1}}]}}],raw:"Period[]"},description:""},useSmallerWidth:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const we={title:"Calendar",component:E,render:e=>c.jsx("div",{style:{maxWidth:"704px"},children:c.jsx(E,{...e})})},D={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:o.BLUE},{fom:"2024-02-21",tom:"2024-02-21",color:o.PINK},{fom:"2024-02-22",tom:"2024-05-05",color:o.BLUE},{fom:"2024-05-06",tom:"2024-08-30",color:o.LIGHTGREEN}]}},h={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:o.BLUE},{fom:"2024-05-06",tom:"2024-08-30",color:o.LIGHTGREEN}]}},b={args:{periods:[{fom:"2024-02-01",tom:"2024-02-20",color:o.BLUE},{fom:"2025-05-06",tom:"2025-07-30",color:o.LIGHTGREEN}]}};var N,S,P;D.parameters={...D.parameters,docs:{...(N=D.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(P=(S=D.parameters)==null?void 0:S.docs)==null?void 0:P.source}}};var O,I,x;h.parameters={...h.parameters,docs:{...(O=h.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(x=(I=h.parameters)==null?void 0:I.docs)==null?void 0:x.source}}};var R,G,C;b.parameters={...b.parameters,docs:{...(R=b.parameters)==null?void 0:R.docs,source:{originalSource:`{
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
}`,...(C=(G=b.parameters)==null?void 0:G.docs)==null?void 0:C.source}}};const $e=["Default","PeriodsWithGap","PeriodsThatSpanOverAYear"];export{D as Default,b as PeriodsThatSpanOverAYear,h as PeriodsWithGap,$e as __namedExportsOrder,we as default};
