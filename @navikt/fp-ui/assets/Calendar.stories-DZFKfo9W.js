import{j as l}from"./jsx-runtime-_e34SzbC.js";import{P as s}from"./colors-D9WBkQHa.js";import"./dates-BztWV_n-.js";import{d as m}from"./dayjs.min-Dkhc0ShP.js";import{i as R,a as Y}from"./isoWeek-D9jlLv__.js";import{B as W}from"./Box-DGewKQma.js";import{H as M}from"./Label-Cf_oUe96.js";import{c as U}from"./clsx-B-dksMZM.js";import{r as $,R as F}from"./index-DVXBtNgz.js";import{g as H,a as w}from"./css-CqApuV4H.js";var K=function(e,o){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&o.indexOf(r)<0&&(t[r]=e[r]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,r=Object.getOwnPropertySymbols(e);n<r.length;n++)o.indexOf(r[n])<0&&Object.prototype.propertyIsEnumerable.call(e,r[n])&&(t[r[n]]=e[r[n]]);return t};const C=$.forwardRef((e,o)=>{var{className:t,columns:r,gap:n,style:a,align:d}=e,c=K(e,["className","columns","gap","style","align"]);const y=Object.assign(Object.assign(Object.assign(Object.assign({},a),{"--__ac-hgrid-align":d}),H("hgrid","gap","spacing",n)),w("hgrid","columns",q(r)));return F.createElement("div",Object.assign({},c,{ref:o,className:U("navds-hgrid",t),style:y}))});function q(e){return e?typeof e=="string"||typeof e=="number"?A(e):Object.fromEntries(Object.entries(e).map(([o,t])=>[o,A(t)])):{}}const A=e=>typeof e=="number"?`repeat(${e}, minmax(0, 1fr))`:e,V="_days_i42kl_1",z="_blueDay_i42kl_15",J="_lightblueDay_i42kl_20",Q="_firstDay_i42kl_27",X="_lastDay_i42kl_31",Z="_firstAndLastDay_i42kl_35",ee="_lightgreenDay_i42kl_40",re="_greenDay_i42kl_60",te="_greenStripedDay_i42kl_65",ne="_blueStripedDay_i42kl_100",oe="_grayDay_i42kl_135",se="_blackDay_i42kl_140",ae="_blueOutlineDay_i42kl_146",ie="_greenOutlineDay_i42kl_165",le="_lightgreenBlueDay_i42kl_184",me="_lightblueGreenDay_i42kl_211",ce="_none_i42kl_237",de="_pinkDay_i42kl_242",i={days:V,blueDay:z,lightblueDay:J,firstDay:Q,lastDay:X,firstAndLastDay:Z,lightgreenDay:ee,greenDay:re,greenStripedDay:te,blueStripedDay:ne,grayDay:oe,blackDay:se,blueOutlineDay:ae,greenOutlineDay:ie,lightgreenBlueDay:le,lightblueGreenDay:me,none:ce,pinkDay:de};var u=(e=>(e.FIRST_DAY="FIRST_DAY",e.LAST_DAY="LAST_DAY",e.FIRST_AND_LAST_DAY="FIRST_AND_LAST_DAY",e.BETWEEN_DAY="BETWEEN_DAY",e))(u||{});const ye={[s.NONE]:i.none,[s.BLUE]:i.blueDay,[s.LIGHTGREEN]:i.lightgreenDay,[s.GRAY]:i.grayDay,[s.PINK]:i.pinkDay,[s.ORANGE]:i.blackDay,[s.BLUEOUTLINE]:i.blueOutlineDay,[s.GREENOUTLINE]:i.greenOutlineDay,[s.LIGHTBLUE]:i.lightblueDay,[s.GREEN]:i.greenDay,[s.LIGHTBLUEGREEN]:i.lightblueGreenDay,[s.LIGHTGREENBLUE]:i.lightgreenBlueDay,[s.GREENSTRIPED]:i.greenStripedDay,[s.BLUESTRIPED]:i.blueStripedDay},j=({day:e,periodeColor:o,dayType:t})=>{const r=t==="FIRST_DAY",n=t==="LAST_DAY",a=t==="FIRST_AND_LAST_DAY";return l.jsx("div",{"data-testid":`day:${e};dayColor:${o};dayType:${t}`,className:`${i.days} ${ye[o]} ${r&&i.firstDay} ${n&&i.lastDay} ${a&&i.firstAndLastDay}`,children:e})};j.__docgenInfo={description:"",methods:[],displayName:"Day"};const ue="_box_zsd0g_1",fe={box:ue};m.extend(R);const N=(e,o="MMMM")=>{const t=e.format(o);return t.charAt(0).toUpperCase()+t.slice(1)},B=({year:e,month:o,showYear:t,children:r,headerLevel:n})=>{const a=m().year(e).month(o).startOf("month"),d=a.isoWeekday(),c=a.endOf("month").isoWeekday(),y=a.daysInMonth()+(d-1)+(7-c),b=[...Array(y/7).keys()];let v=0;return l.jsxs(W,{className:fe.box,"data-testid":`year:${e};month:${o}`,"aria-hidden":!0,children:[l.jsx(M,{size:"small",level:n,children:t?`${N(a,"MMM")} (${e})`:N(a)}),b.map(h=>l.jsx(C,{columns:7,children:[...Array(7).keys()].map(f=>h===0&&f<d-1?l.jsx("div",{},f):h+1===b.length&&f>=c?l.jsx("div",{},f):r[v++])},h))]})};B.__docgenInfo={description:"",methods:[],displayName:"Month"};const ge="_gridColumnsWide_18ei8_1",_e="_gridColumnsSmall_18ei8_5",De="_srOnly_18ei8_27",p={gridColumnsWide:ge,gridColumnsSmall:_e,srOnly:De};m.extend(R);m.extend(Y);const he=(e,o,t,r)=>{const n=m().year(e).month(o).date(t),a=r[0].fom,d=r[r.length-1].tom;if(n.isBefore(a,"day")||n.isAfter(d,"day"))return s.NONE;const c=r.find(y=>n.isBetween(y.fom,y.tom,"day","[]"));return(c==null?void 0:c.color)===s.PINK?s.PINK:n.isoWeekday()===6||n.isoWeekday()===7?s.GRAY:(c==null?void 0:c.color)||s.NONE},pe=(e,o,t)=>{const r=t.find(n=>n.color===s.PINK);return e.isoWeekday()===6||e.isoWeekday()===1||o===1||t.some(n=>e.isSame(n.fom,"day"))||r&&m(r.fom).isSame(e.subtract(1,"day"),"day")},Ee=(e,o,t)=>{const r=t.find(n=>n.color===s.PINK);return e.isoWeekday()===7||e.isoWeekday()===5||o===e.daysInMonth()||t.some(n=>e.isSame(n.tom,"day"))||r&&m(r.fom).isSame(e.add(1,"day"),"day")},be=(e,o,t,r)=>{const n=m().year(e).month(o).date(t),a=pe(n,t,r),d=Ee(n,t,r);return a&&d?u.FIRST_AND_LAST_DAY:a?u.FIRST_DAY:d?u.LAST_DAY:u.BETWEEN_DAY},Ae=(e,o)=>{let t;return t=(o.getFullYear()-e.getFullYear())*12,t-=e.getMonth(),t+=o.getMonth(),t<=0?0:t},Ne=(e,o)=>{const t=m(e).month()%3,r=3-m(o).month()%3,n=m(e).subtract(t,"month"),a=m(o).add(r,"month"),d=Ae(n.toDate(),a.toDate());return[...new Array(d)].map((c,y)=>({month:n.add(y,"month").month(),year:n.add(y,"month").year()}))},E=({periods:e,useSmallerWidth:o=!1})=>{const t=Ne(e[0].fom,e[e.length-1].tom);return l.jsxs(l.Fragment,{children:[e.some(r=>r.srText)&&l.jsx("div",{className:p.srOnly,children:e.filter(r=>r.srText).map(r=>r.srText)}),l.jsx(C,{gap:{xs:"1",sm:"4",md:"8"},className:o?p.gridColumnsSmall:p.gridColumnsWide,children:t.map((r,n)=>l.jsx(B,{year:r.year,month:r.month,showYear:n>0&&t[n-1].year!==r.year,headerLevel:o?"5":"4",children:[...Array(m().year(r.year).month(r.month).daysInMonth()).keys()].map(a=>l.jsx(j,{day:a+1,periodeColor:he(r.year,r.month,a+1,e),dayType:be(r.year,r.month,a+1,e)},r.year+r.month+a))},r.year+"-"+r.month))})]})};E.__docgenInfo={description:"",methods:[],displayName:"Calendar",props:{periods:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    color: PeriodeColor;
    srText?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"color",value:{name:"PeriodeColor",required:!0}},{key:"srText",value:{name:"string",required:!1}}]}}],raw:"Period[]"},description:""},useSmallerWidth:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const Ce={title:"Calendar",component:E,render:e=>l.jsx("div",{style:{maxWidth:"704px"},children:l.jsx(E,{...e})})},g={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:s.BLUE},{fom:"2024-02-21",tom:"2024-02-21",color:s.PINK},{fom:"2024-02-22",tom:"2024-05-05",color:s.BLUE},{fom:"2024-05-06",tom:"2024-08-30",color:s.LIGHTGREEN}]}},_={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:s.BLUE},{fom:"2024-05-06",tom:"2024-08-30",color:s.LIGHTGREEN}]}},D={args:{periods:[{fom:"2024-02-01",tom:"2024-02-20",color:s.BLUE},{fom:"2025-05-06",tom:"2025-07-30",color:s.LIGHTGREEN}]}};var k,S,O;g.parameters={...g.parameters,docs:{...(k=g.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(O=(S=g.parameters)==null?void 0:S.docs)==null?void 0:O.source}}};var L,T,I;_.parameters={..._.parameters,docs:{...(L=_.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
}`,...(I=(T=_.parameters)==null?void 0:T.docs)==null?void 0:I.source}}};var x,P,G;D.parameters={...D.parameters,docs:{...(x=D.parameters)==null?void 0:x.docs,source:{originalSource:`{
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
}`,...(G=(P=D.parameters)==null?void 0:P.docs)==null?void 0:G.source}}};const je=["Default","PeriodsWithGap","PeriodsThatSpanOverAYear"];export{g as Default,D as PeriodsThatSpanOverAYear,_ as PeriodsWithGap,je as __namedExportsOrder,Ce as default};
