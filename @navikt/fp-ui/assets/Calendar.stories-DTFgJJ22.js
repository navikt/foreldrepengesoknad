import{j as y}from"./jsx-runtime-Du8NFWEI.js";import{d as u}from"./dayjs.min-a42Le6oL.js";import{i as F}from"./isBetween-C2-0pUJ0.js";import{c as U,g as w,r as K,R as q}from"./index-Dl6G-zuu.js";import{B as H}from"./Box-DoqHmnCA.js";import{H as V}from"./Label-Bw7U9jgY.js";import{c as z}from"./clsx-B-dksMZM.js";import{g as J,a as Q}from"./css-CqApuV4H.js";var I={exports:{}};(function(e,o){(function(r,t){e.exports=t()})(U,function(){var r="day";return function(t,n,s){var c=function(i){return i.add(4-i.isoWeekday(),r)},a=n.prototype;a.isoWeekYear=function(){return c(this).year()},a.isoWeek=function(i){if(!this.$utils().u(i))return this.add(7*(i-this.isoWeek()),r);var h,f,l,A,M=c(this),P=(h=this.isoWeekYear(),f=this.$u,l=(f?s.utc:s)().year(h).startOf("year"),A=4-l.isoWeekday(),l.isoWeekday()>4&&(A+=7),l.add(A,r));return M.diff(P,"week")+1},a.isoWeekday=function(i){return this.$utils().u(i)?this.day()||7:this.day(this.day()%7?i:i-7)};var d=a.startOf;a.startOf=function(i,h){var f=this.$utils(),l=!!f.u(h)||h;return f.p(i)==="isoweek"?l?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):d.bind(this)(i,h)}}})})(I);var X=I.exports;const T=w(X);var Z=function(e,o){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(r[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)o.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(r[t[n]]=e[t[n]]);return r};const ee=K.forwardRef((e,o)=>{var{className:r,columns:t,gap:n,style:s,align:c}=e,a=Z(e,["className","columns","gap","style","align"]);const d=Object.assign(Object.assign(Object.assign(Object.assign({},s),{"--__ac-hgrid-align":c}),J("hgrid","gap","spacing",n)),Q("hgrid","columns",te(t)));return q.createElement("div",Object.assign({},a,{ref:o,className:z("navds-hgrid",r),style:d}))});function te(e){return e?typeof e=="string"||typeof e=="number"?N(e):Object.fromEntries(Object.entries(e).map(([o,r])=>[o,N(r)])):{}}const N=e=>typeof e=="number"?`repeat(${e}, minmax(0, 1fr))`:e,$=ee,re="_days_3xln0_1",oe="_blueDay_3xln0_31",ne="_greenDay_3xln0_35",se="_firstDay_3xln0_41",ae="_lastDay_3xln0_45",ie="_firstAndLastDay_3xln0_49",ce="_grayDay_3xln0_54",me="_none_3xln0_58",de="_pinkDay_3xln0_63",_={days:re,blueDay:oe,greenDay:ne,firstDay:se,lastDay:ae,firstAndLastDay:ie,grayDay:ce,none:me,pinkDay:de};var m=(e=>(e.NONE="NONE",e.PINK="PINK",e.BLUE="BLUE",e.GREEN="GREEN",e.GRAY="GRAY",e))(m||{}),g=(e=>(e.FIRST_DAY="FIRST_DAY",e.LAST_DAY="LAST_DAY",e.FIRST_AND_LAST_DAY="FIRST_AND_LAST_DAY",e.BETWEEN_DAY="BETWEEN_DAY",e))(g||{});const le={NONE:_.none,BLUE:_.blueDay,GREEN:_.greenDay,GRAY:_.grayDay,PINK:_.pinkDay},B=({day:e,dayColor:o,dayType:r})=>{const t=r==="FIRST_DAY",n=r==="LAST_DAY",s=r==="FIRST_AND_LAST_DAY";return y.jsx("div",{"data-testid":`day:${e};dayColor:${o};dayType:${r}`,className:`${_.days} ${le[o]} ${t&&_.firstDay} ${n&&_.lastDay} ${s&&_.firstAndLastDay}`,children:e})};B.__docgenInfo={description:"",methods:[],displayName:"Day"};const ye="_box_10rpd_1",ue={box:ye};u.extend(T);const O=(e,o="MMMM")=>{const r=e.format(o);return r.charAt(0).toUpperCase()+r.slice(1)},G=({year:e,month:o,showYear:r,children:t,headerLevel:n})=>{const s=u().year(e).month(o).startOf("month"),c=s.isoWeekday(),a=s.endOf("month").isoWeekday(),d=s.daysInMonth()+(c-1)+(7-a),i=[...Array(d/7).keys()];let h=0;return y.jsxs(H,{className:ue.box,"data-testid":`year:${e};month:${o}`,"aria-hidden":!0,children:[y.jsx(V,{size:"small",level:n,children:r?`${O(s,"MMM")} (${e})`:O(s)}),i.map(f=>y.jsx($,{columns:7,children:[...Array(7).keys()].map(l=>f===0&&l<c-1?y.jsx("div",{},l):f+1===i.length&&l>=a?y.jsx("div",{},l):t[h++])},f))]})};G.__docgenInfo={description:"",methods:[],displayName:"Month"};const fe="_gridColumnsWide_1boeg_1",_e="_gridColumnsSmall_1boeg_5",b={gridColumnsWide:fe,gridColumnsSmall:_e};u.extend(T);u.extend(F);const he=(e,o,r,t)=>{const n=u().year(e).month(o).date(r),s=t[0].fom,c=t[t.length-1].tom;if(n.isBefore(s,"day")||n.isAfter(c,"day"))return m.NONE;const a=t.find(d=>n.isBetween(d.fom,d.tom,"day","[]"));return(a==null?void 0:a.color)===m.PINK?m.PINK:n.isoWeekday()===6||n.isoWeekday()===7?m.GRAY:(a==null?void 0:a.color)||m.NONE},ge=(e,o,r)=>e.isoWeekday()===6||e.isoWeekday()===1||o===1||r.some(t=>e.isSame(t.fom,"day")),pe=(e,o,r)=>e.isoWeekday()===7||e.isoWeekday()===5||o===e.daysInMonth()||r.some(t=>e.isSame(t.tom,"day")),De=(e,o,r,t)=>{const n=u().year(e).month(o).date(r),s=ge(n,r,t),c=pe(n,r,t);return s&&c?g.FIRST_AND_LAST_DAY:s?g.FIRST_DAY:c?g.LAST_DAY:g.BETWEEN_DAY},Ee=(e,o)=>{let r;return r=(o.getFullYear()-e.getFullYear())*12,r-=e.getMonth(),r+=o.getMonth(),r<=0?0:r},Ae=(e,o)=>{const r=u(e).month()%3,t=3-u(o).month()%3,n=u(e).subtract(r,"month"),s=u(o).add(t,"month"),c=Ee(n.toDate(),s.toDate());return[...new Array(c)].map((a,d)=>({month:n.add(d,"month").month(),year:n.add(d,"month").year()}))},x=({periods:e,useSmallerWidth:o=!1})=>{const r=Ae(e[0].fom,e[e.length-1].tom);return y.jsx($,{gap:{xs:"1",sm:"4",md:"8"},className:o?b.gridColumnsSmall:b.gridColumnsWide,children:r.map((t,n)=>y.jsx(G,{year:t.year,month:t.month,showYear:n>0&&r[n-1].year!==t.year,headerLevel:o?"5":"4",children:[...Array(u().year(t.year).month(t.month).daysInMonth()).keys()].map(s=>y.jsx(B,{day:s+1,dayColor:he(t.year,t.month,s+1,e),dayType:De(t.year,t.month,s+1,e)},t.year+t.month+s))},t.year+"-"+t.month))})};x.__docgenInfo={description:"",methods:[],displayName:"Calendar",props:{periods:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    color: DayColor;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"color",value:{name:"DayColor",required:!0}}]}}],raw:"Period[]"},description:""},useSmallerWidth:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const je={title:"Calendar",component:x,render:e=>y.jsx("div",{style:{maxWidth:"704px"},children:y.jsx(x,{...e})})},p={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:m.BLUE},{fom:"2024-02-21",tom:"2024-02-21",color:m.PINK},{fom:"2024-02-22",tom:"2024-05-05",color:m.BLUE},{fom:"2024-05-06",tom:"2024-08-30",color:m.GREEN}]}},D={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:m.BLUE},{fom:"2024-05-06",tom:"2024-08-30",color:m.GREEN}]}},E={args:{periods:[{fom:"2024-02-01",tom:"2024-02-20",color:m.BLUE},{fom:"2025-05-06",tom:"2025-07-30",color:m.GREEN}]}};var k,W,S;p.parameters={...p.parameters,docs:{...(k=p.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    periods: [{
      fom: '2024-01-31',
      tom: '2024-02-20',
      color: DayColor.BLUE
    }, {
      fom: '2024-02-21',
      tom: '2024-02-21',
      color: DayColor.PINK
    }, {
      fom: '2024-02-22',
      tom: '2024-05-05',
      color: DayColor.BLUE
    }, {
      fom: '2024-05-06',
      tom: '2024-08-30',
      color: DayColor.GREEN
    }]
  }
}`,...(S=(W=p.parameters)==null?void 0:W.docs)==null?void 0:S.source}}};var v,j,Y;D.parameters={...D.parameters,docs:{...(v=D.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    periods: [{
      fom: '2024-01-31',
      tom: '2024-02-20',
      color: DayColor.BLUE
    }, {
      fom: '2024-05-06',
      tom: '2024-08-30',
      color: DayColor.GREEN
    }]
  }
}`,...(Y=(j=D.parameters)==null?void 0:j.docs)==null?void 0:Y.source}}};var L,R,C;E.parameters={...E.parameters,docs:{...(L=E.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    periods: [{
      fom: '2024-02-01',
      tom: '2024-02-20',
      color: DayColor.BLUE
    }, {
      fom: '2025-05-06',
      tom: '2025-07-30',
      color: DayColor.GREEN
    }]
  }
}`,...(C=(R=E.parameters)==null?void 0:R.docs)==null?void 0:C.source}}};const Ye=["Default","PeriodsWithGap","PeriodsThatSpanOverAYear"];export{p as Default,E as PeriodsThatSpanOverAYear,D as PeriodsWithGap,Ye as __namedExportsOrder,je as default};
