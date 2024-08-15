import{j as l}from"./jsx-runtime-Cw0GR0a5.js";import{P as s}from"./colors-BgDiWhW9.js";import"./dates-wsUZxpzE.js";import{d as m}from"./dayjs.min-0BeM2qWp.js";import{i as B,a as W}from"./isoWeek-3FZMy8l4.js";import{B as M}from"./Box-CTyk2Ho2.js";import{H as U}from"./Label-C40nX08t.js";import{o as $,c as F}from"./useId-BGzI-o9Y.js";import{r as H,R as A}from"./index-CTjT7uj6.js";import{g as w,a as K,B as q,P as V,S as z}from"./BasePrimitive-BIOAorSf.js";import"./useMergeRefs-Bb4JH14W.js";var J=function(e,o){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&o.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)o.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(t[r[n]]=e[r[n]]);return t};const j=H.forwardRef((e,o)=>{var{children:t,className:r,as:n="div",columns:a,gap:c,style:d,align:y,asChild:_}=e,D=J(e,["children","className","as","columns","gap","style","align","asChild"]);const g=Object.assign(Object.assign(Object.assign(Object.assign({},d),{"--__ac-hgrid-align":y}),w("hgrid","gap","spacing",c)),K("hgrid","columns",Q(a))),u=_?z:n;return A.createElement(q,Object.assign({},D),A.createElement(u,Object.assign({},$(D,V),{ref:o,className:F("navds-hgrid",r,{"navds-hgrid-gap":c,"navds-hgrid-align":y}),style:g}),t))});function Q(e){return e?typeof e=="string"||typeof e=="number"?N(e):Object.fromEntries(Object.entries(e).map(([o,t])=>[o,N(t)])):{}}const N=e=>typeof e=="number"?`repeat(${e}, minmax(0, 1fr))`:e,X="_days_i42kl_1",Z="_blueDay_i42kl_15",ee="_lightblueDay_i42kl_20",re="_firstDay_i42kl_27",te="_lastDay_i42kl_31",ne="_firstAndLastDay_i42kl_35",oe="_lightgreenDay_i42kl_40",se="_greenDay_i42kl_60",ae="_greenStripedDay_i42kl_65",ie="_blueStripedDay_i42kl_100",le="_grayDay_i42kl_135",me="_blackDay_i42kl_140",ce="_blueOutlineDay_i42kl_146",de="_greenOutlineDay_i42kl_165",ye="_lightgreenBlueDay_i42kl_184",ue="_lightblueGreenDay_i42kl_211",ge="_none_i42kl_237",fe="_pinkDay_i42kl_242",i={days:X,blueDay:Z,lightblueDay:ee,firstDay:re,lastDay:te,firstAndLastDay:ne,lightgreenDay:oe,greenDay:se,greenStripedDay:ae,blueStripedDay:ie,grayDay:le,blackDay:me,blueOutlineDay:ce,greenOutlineDay:de,lightgreenBlueDay:ye,lightblueGreenDay:ue,none:ge,pinkDay:fe};var f=(e=>(e.FIRST_DAY="FIRST_DAY",e.LAST_DAY="LAST_DAY",e.FIRST_AND_LAST_DAY="FIRST_AND_LAST_DAY",e.BETWEEN_DAY="BETWEEN_DAY",e))(f||{});const _e={[s.NONE]:i.none,[s.BLUE]:i.blueDay,[s.LIGHTGREEN]:i.lightgreenDay,[s.GRAY]:i.grayDay,[s.PINK]:i.pinkDay,[s.BLACK]:i.blackDay,[s.BLUEOUTLINE]:i.blueOutlineDay,[s.GREENOUTLINE]:i.greenOutlineDay,[s.LIGHTBLUE]:i.lightblueDay,[s.GREEN]:i.greenDay,[s.LIGHTBLUEGREEN]:i.lightblueGreenDay,[s.LIGHTGREENBLUE]:i.lightgreenBlueDay,[s.GREENSTRIPED]:i.greenStripedDay,[s.BLUESTRIPED]:i.blueStripedDay},v=({day:e,periodeColor:o,dayType:t})=>{const r=t==="FIRST_DAY",n=t==="LAST_DAY",a=t==="FIRST_AND_LAST_DAY";return l.jsx("div",{"data-testid":`day:${e};dayColor:${o};dayType:${t}`,className:`${i.days} ${_e[o]} ${r&&i.firstDay} ${n&&i.lastDay} ${a&&i.firstAndLastDay}`,children:e})};v.__docgenInfo={description:"",methods:[],displayName:"Day"};const De="_box_14xqs_1",he={box:De};m.extend(B);const k=(e,o="MMMM")=>{const t=e.format(o);return t.charAt(0).toUpperCase()+t.slice(1)},Y=({year:e,month:o,showYear:t,children:r,headerLevel:n})=>{const a=m().year(e).month(o).startOf("month"),c=a.isoWeekday(),d=a.endOf("month").isoWeekday(),y=a.daysInMonth()+(c-1)+(7-d),_=[...Array(y/7).keys()];let D=0;return l.jsxs(M,{className:he.box,"data-testid":`year:${e};month:${o}`,"aria-hidden":!0,children:[l.jsx(U,{size:"small",level:n,children:t?`${k(a,"MMM")} (${e})`:k(a)}),_.map(g=>l.jsx(j,{columns:7,children:[...Array(7).keys()].map(u=>g===0&&u<c-1?l.jsx("div",{},u):g+1===_.length&&u>=d?l.jsx("div",{},u):r[D++])},g))]})};Y.__docgenInfo={description:"",methods:[],displayName:"Month"};const pe="_gridColumnsWide_1hgbu_1",Ee="_gridColumnsSmall_1hgbu_5",be="_srOnly_1hgbu_27",b={gridColumnsWide:pe,gridColumnsSmall:Ee,srOnly:be};m.extend(B);m.extend(W);const Se=(e,o,t,r)=>{const n=m().year(e).month(o).date(t),a=r[0].fom,c=r[r.length-1].tom;if(n.isBefore(a,"day")||n.isAfter(c,"day"))return s.NONE;const d=r.find(y=>n.isBetween(y.fom,y.tom,"day","[]"));return(d==null?void 0:d.color)===s.PINK?s.PINK:n.isoWeekday()===6||n.isoWeekday()===7?s.GRAY:(d==null?void 0:d.color)||s.NONE},Ae=(e,o,t)=>{const r=t.find(n=>n.color===s.PINK);return e.isoWeekday()===6||e.isoWeekday()===1||o===1||t.some(n=>e.isSame(n.fom,"day"))||r&&m(r.fom).isSame(e.subtract(1,"day"),"day")},Ne=(e,o,t)=>{const r=t.find(n=>n.color===s.PINK);return e.isoWeekday()===7||e.isoWeekday()===5||o===e.daysInMonth()||t.some(n=>e.isSame(n.tom,"day"))||r&&m(r.fom).isSame(e.add(1,"day"),"day")},ke=(e,o,t,r)=>{const n=m().year(e).month(o).date(t),a=Ae(n,t,r),c=Ne(n,t,r);return a&&c?f.FIRST_AND_LAST_DAY:a?f.FIRST_DAY:c?f.LAST_DAY:f.BETWEEN_DAY},Oe=(e,o)=>{let t;return t=(o.getFullYear()-e.getFullYear())*12,t-=e.getMonth(),t+=o.getMonth(),t<=0?0:t},Le=(e,o)=>{const t=m(e).month()%3,r=3-m(o).month()%3,n=m(e).subtract(t,"month"),a=m(o).add(r,"month"),c=Oe(n.toDate(),a.toDate());return[...new Array(c)].map((d,y)=>({month:n.add(y,"month").month(),year:n.add(y,"month").year()}))},S=({periods:e,useSmallerWidth:o=!1})=>{const t=Le(e[0].fom,e[e.length-1].tom);return l.jsxs(l.Fragment,{children:[e.some(r=>r.srText)&&l.jsx("div",{className:b.srOnly,children:e.filter(r=>r.srText).map(r=>r.srText).toString()}),l.jsx(j,{gap:{xs:"2",sm:"4",md:"8"},className:o?b.gridColumnsSmall:b.gridColumnsWide,children:t.map((r,n)=>l.jsx(Y,{year:r.year,month:r.month,showYear:n>0&&t[n-1].year!==r.year,headerLevel:o?"5":"4",children:[...Array(m().year(r.year).month(r.month).daysInMonth()).keys()].map(a=>l.jsx(v,{day:a+1,periodeColor:Se(r.year,r.month,a+1,e),dayType:ke(r.year,r.month,a+1,e)},r.year+r.month+a))},r.year+"-"+r.month))})]})};S.__docgenInfo={description:"",methods:[],displayName:"Calendar",props:{periods:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    color: PeriodeColor;
    srText?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"color",value:{name:"PeriodeColor",required:!0}},{key:"srText",value:{name:"string",required:!1}}]}}],raw:"Period[]"},description:""},useSmallerWidth:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const We={title:"Calendar",component:S,render:e=>l.jsx("div",{style:{maxWidth:"704px"},children:l.jsx(S,{...e})})},h={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:s.BLUE},{fom:"2024-02-21",tom:"2024-02-21",color:s.PINK},{fom:"2024-02-22",tom:"2024-05-05",color:s.BLUE},{fom:"2024-05-06",tom:"2024-08-30",color:s.LIGHTGREEN}]}},p={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:s.BLUE},{fom:"2024-05-06",tom:"2024-08-30",color:s.LIGHTGREEN}]}},E={args:{periods:[{fom:"2024-02-01",tom:"2024-02-20",color:s.BLUE},{fom:"2025-05-06",tom:"2025-07-30",color:s.LIGHTGREEN}]}};var O,L,T;h.parameters={...h.parameters,docs:{...(O=h.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(T=(L=h.parameters)==null?void 0:L.docs)==null?void 0:T.source}}};var I,P,x;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`{
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
}`,...(x=(P=p.parameters)==null?void 0:P.docs)==null?void 0:x.source}}};var C,G,R;E.parameters={...E.parameters,docs:{...(C=E.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(R=(G=E.parameters)==null?void 0:G.docs)==null?void 0:R.source}}};const Me=["Default","PeriodsWithGap","PeriodsThatSpanOverAYear"];export{h as Default,E as PeriodsThatSpanOverAYear,p as PeriodsWithGap,Me as __namedExportsOrder,We as default};
