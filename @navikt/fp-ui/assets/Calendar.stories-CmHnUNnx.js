import{j as d}from"./jsx-runtime-_e34SzbC.js";import{P as a}from"./colors-D9WBkQHa.js";import"./dates-BHHa_QPf.js";import{d as l}from"./dayjs.min-htn-L6JM.js";import{i as x,a as v}from"./isoWeek-D9jlLv__.js";import{B as W}from"./Box-DGewKQma.js";import{H as M}from"./Label-Cf_oUe96.js";import{c as U}from"./clsx-B-dksMZM.js";import{r as $,R as H}from"./index-DVXBtNgz.js";import{g as F,a as w}from"./css-CqApuV4H.js";var K=function(e,n){var o={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&n.indexOf(r)<0&&(o[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var t=0,r=Object.getOwnPropertySymbols(e);t<r.length;t++)n.indexOf(r[t])<0&&Object.prototype.propertyIsEnumerable.call(e,r[t])&&(o[r[t]]=e[r[t]]);return o};const C=$.forwardRef((e,n)=>{var{className:o,columns:r,gap:t,style:s,align:m}=e,c=K(e,["className","columns","gap","style","align"]);const y=Object.assign(Object.assign(Object.assign(Object.assign({},s),{"--__ac-hgrid-align":m}),F("hgrid","gap","spacing",t)),w("hgrid","columns",q(r)));return H.createElement("div",Object.assign({},c,{ref:n,className:U("navds-hgrid",o),style:y}))});function q(e){return e?typeof e=="string"||typeof e=="number"?b(e):Object.fromEntries(Object.entries(e).map(([n,o])=>[n,b(o)])):{}}const b=e=>typeof e=="number"?`repeat(${e}, minmax(0, 1fr))`:e,V="_days_i42kl_1",z="_blueDay_i42kl_15",J="_lightblueDay_i42kl_20",Q="_firstDay_i42kl_27",X="_lastDay_i42kl_31",Z="_firstAndLastDay_i42kl_35",ee="_lightgreenDay_i42kl_40",re="_greenDay_i42kl_60",oe="_greenStripedDay_i42kl_65",te="_blueStripedDay_i42kl_100",ne="_grayDay_i42kl_135",ae="_blackDay_i42kl_140",se="_blueOutlineDay_i42kl_146",ie="_greenOutlineDay_i42kl_165",le="_lightgreenBlueDay_i42kl_184",ce="_lightblueGreenDay_i42kl_211",me="_none_i42kl_237",de="_pinkDay_i42kl_242",i={days:V,blueDay:z,lightblueDay:J,firstDay:Q,lastDay:X,firstAndLastDay:Z,lightgreenDay:ee,greenDay:re,greenStripedDay:oe,blueStripedDay:te,grayDay:ne,blackDay:ae,blueOutlineDay:se,greenOutlineDay:ie,lightgreenBlueDay:le,lightblueGreenDay:ce,none:me,pinkDay:de};var u=(e=>(e.FIRST_DAY="FIRST_DAY",e.LAST_DAY="LAST_DAY",e.FIRST_AND_LAST_DAY="FIRST_AND_LAST_DAY",e.BETWEEN_DAY="BETWEEN_DAY",e))(u||{});const ye={[a.NONE]:i.none,[a.BLUE]:i.blueDay,[a.LIGHTGREEN]:i.lightgreenDay,[a.GRAY]:i.grayDay,[a.PINK]:i.pinkDay,[a.ORANGE]:i.blackDay,[a.BLUEOUTLINE]:i.blueOutlineDay,[a.GREENOUTLINE]:i.greenOutlineDay,[a.LIGHTBLUE]:i.lightblueDay,[a.GREEN]:i.greenDay,[a.LIGHTBLUEGREEN]:i.lightblueGreenDay,[a.LIGHTGREENBLUE]:i.lightgreenBlueDay,[a.GREENSTRIPED]:i.greenStripedDay,[a.BLUESTRIPED]:i.blueStripedDay},B=({day:e,periodeColor:n,dayType:o})=>{const r=o==="FIRST_DAY",t=o==="LAST_DAY",s=o==="FIRST_AND_LAST_DAY";return d.jsx("div",{"data-testid":`day:${e};dayColor:${n};dayType:${o}`,className:`${i.days} ${ye[n]} ${r&&i.firstDay} ${t&&i.lastDay} ${s&&i.firstAndLastDay}`,children:e})};B.__docgenInfo={description:"",methods:[],displayName:"Day"};const ue="_box_zsd0g_1",fe={box:ue};l.extend(x);const A=(e,n="MMMM")=>{const o=e.format(n);return o.charAt(0).toUpperCase()+o.slice(1)},j=({year:e,month:n,showYear:o,children:r,headerLevel:t})=>{const s=l().year(e).month(n).startOf("month"),m=s.isoWeekday(),c=s.endOf("month").isoWeekday(),y=s.daysInMonth()+(m-1)+(7-c),E=[...Array(y/7).keys()];let Y=0;return d.jsxs(W,{className:fe.box,"data-testid":`year:${e};month:${n}`,"aria-hidden":!0,children:[d.jsx(M,{size:"small",level:t,children:o?`${A(s,"MMM")} (${e})`:A(s)}),E.map(h=>d.jsx(C,{columns:7,children:[...Array(7).keys()].map(f=>h===0&&f<m-1?d.jsx("div",{},f):h+1===E.length&&f>=c?d.jsx("div",{},f):r[Y++])},h))]})};j.__docgenInfo={description:"",methods:[],displayName:"Month"};const ge="_gridColumnsWide_1boeg_1",_e="_gridColumnsSmall_1boeg_5",N={gridColumnsWide:ge,gridColumnsSmall:_e};l.extend(x);l.extend(v);const De=(e,n,o,r)=>{const t=l().year(e).month(n).date(o),s=r[0].fom,m=r[r.length-1].tom;if(t.isBefore(s,"day")||t.isAfter(m,"day"))return a.NONE;const c=r.find(y=>t.isBetween(y.fom,y.tom,"day","[]"));return(c==null?void 0:c.color)===a.PINK?a.PINK:t.isoWeekday()===6||t.isoWeekday()===7?a.GRAY:(c==null?void 0:c.color)||a.NONE},he=(e,n,o)=>{const r=o.find(t=>t.color===a.PINK);return e.isoWeekday()===6||e.isoWeekday()===1||n===1||o.some(t=>e.isSame(t.fom,"day"))||r&&l(r.fom).isSame(e.subtract(1,"day"),"day")},pe=(e,n,o)=>{const r=o.find(t=>t.color===a.PINK);return e.isoWeekday()===7||e.isoWeekday()===5||n===e.daysInMonth()||o.some(t=>e.isSame(t.tom,"day"))||r&&l(r.fom).isSame(e.add(1,"day"),"day")},Ee=(e,n,o,r)=>{const t=l().year(e).month(n).date(o),s=he(t,o,r),m=pe(t,o,r);return s&&m?u.FIRST_AND_LAST_DAY:s?u.FIRST_DAY:m?u.LAST_DAY:u.BETWEEN_DAY},be=(e,n)=>{let o;return o=(n.getFullYear()-e.getFullYear())*12,o-=e.getMonth(),o+=n.getMonth(),o<=0?0:o},Ae=(e,n)=>{const o=l(e).month()%3,r=3-l(n).month()%3,t=l(e).subtract(o,"month"),s=l(n).add(r,"month"),m=be(t.toDate(),s.toDate());return[...new Array(m)].map((c,y)=>({month:t.add(y,"month").month(),year:t.add(y,"month").year()}))},p=({periods:e,useSmallerWidth:n=!1})=>{const o=Ae(e[0].fom,e[e.length-1].tom);return d.jsx(C,{gap:{xs:"1",sm:"4",md:"8"},className:n?N.gridColumnsSmall:N.gridColumnsWide,children:o.map((r,t)=>d.jsx(j,{year:r.year,month:r.month,showYear:t>0&&o[t-1].year!==r.year,headerLevel:n?"5":"4",children:[...Array(l().year(r.year).month(r.month).daysInMonth()).keys()].map(s=>d.jsx(B,{day:s+1,periodeColor:De(r.year,r.month,s+1,e),dayType:Ee(r.year,r.month,s+1,e)},r.year+r.month+s))},r.year+"-"+r.month))})};p.__docgenInfo={description:"",methods:[],displayName:"Calendar",props:{periods:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    color: PeriodeColor;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"color",value:{name:"PeriodeColor",required:!0}}]}}],raw:"Period[]"},description:""},useSmallerWidth:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const xe={title:"Calendar",component:p,render:e=>d.jsx("div",{style:{maxWidth:"704px"},children:d.jsx(p,{...e})})},g={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:a.BLUE},{fom:"2024-02-21",tom:"2024-02-21",color:a.PINK},{fom:"2024-02-22",tom:"2024-05-05",color:a.BLUE},{fom:"2024-05-06",tom:"2024-08-30",color:a.LIGHTGREEN}]}},_={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:a.BLUE},{fom:"2024-05-06",tom:"2024-08-30",color:a.LIGHTGREEN}]}},D={args:{periods:[{fom:"2024-02-01",tom:"2024-02-20",color:a.BLUE},{fom:"2025-05-06",tom:"2025-07-30",color:a.LIGHTGREEN}]}};var S,k,L;g.parameters={...g.parameters,docs:{...(S=g.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(L=(k=g.parameters)==null?void 0:k.docs)==null?void 0:L.source}}};var O,I,T;_.parameters={..._.parameters,docs:{...(O=_.parameters)==null?void 0:O.docs,source:{originalSource:`{
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
}`,...(T=(I=_.parameters)==null?void 0:I.docs)==null?void 0:T.source}}};var P,G,R;D.parameters={...D.parameters,docs:{...(P=D.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(R=(G=D.parameters)==null?void 0:G.docs)==null?void 0:R.source}}};const Ce=["Default","PeriodsWithGap","PeriodsThatSpanOverAYear"];export{g as Default,D as PeriodsThatSpanOverAYear,_ as PeriodsWithGap,Ce as __namedExportsOrder,xe as default};
