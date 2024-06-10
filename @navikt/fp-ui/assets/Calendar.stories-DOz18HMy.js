import{j as y}from"./jsx-runtime-_e34SzbC.js";import{d as u}from"./dayjs.min-Dkhc0ShP.js";import{i as F}from"./isBetween-BL4b7U7Z.js";import{r as U,R as w,c as K,g as q}from"./index-DVXBtNgz.js";import{B as H}from"./Box-DGewKQma.js";import{H as V}from"./Label-Cf_oUe96.js";import{c as z}from"./clsx-B-dksMZM.js";import{g as J,a as Q}from"./css-CqApuV4H.js";var X=function(e,o){var r={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&o.indexOf(t)<0&&(r[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var n=0,t=Object.getOwnPropertySymbols(e);n<t.length;n++)o.indexOf(t[n])<0&&Object.prototype.propertyIsEnumerable.call(e,t[n])&&(r[t[n]]=e[t[n]]);return r};const I=U.forwardRef((e,o)=>{var{className:r,columns:t,gap:n,style:s,align:m}=e,a=X(e,["className","columns","gap","style","align"]);const d=Object.assign(Object.assign(Object.assign(Object.assign({},s),{"--__ac-hgrid-align":m}),J("hgrid","gap","spacing",n)),Q("hgrid","columns",Z(t)));return w.createElement("div",Object.assign({},a,{ref:o,className:z("navds-hgrid",r),style:d}))});function Z(e){return e?typeof e=="string"||typeof e=="number"?N(e):Object.fromEntries(Object.entries(e).map(([o,r])=>[o,N(r)])):{}}const N=e=>typeof e=="number"?`repeat(${e}, minmax(0, 1fr))`:e;var T={exports:{}};(function(e,o){(function(r,t){e.exports=t()})(K,function(){var r="day";return function(t,n,s){var m=function(i){return i.add(4-i.isoWeekday(),r)},a=n.prototype;a.isoWeekYear=function(){return m(this).year()},a.isoWeek=function(i){if(!this.$utils().u(i))return this.add(7*(i-this.isoWeek()),r);var h,f,l,A,G=m(this),P=(h=this.isoWeekYear(),f=this.$u,l=(f?s.utc:s)().year(h).startOf("year"),A=4-l.isoWeekday(),l.isoWeekday()>4&&(A+=7),l.add(A,r));return G.diff(P,"week")+1},a.isoWeekday=function(i){return this.$utils().u(i)?this.day()||7:this.day(this.day()%7?i:i-7)};var d=a.startOf;a.startOf=function(i,h){var f=this.$utils(),l=!!f.u(h)||h;return f.p(i)==="isoweek"?l?this.date(this.date()-(this.isoWeekday()-1)).startOf("day"):this.date(this.date()-1-(this.isoWeekday()-1)+7).endOf("day"):d.bind(this)(i,h)}}})})(T);var ee=T.exports;const B=q(ee),te="_days_3xln0_1",re="_blueDay_3xln0_31",oe="_greenDay_3xln0_35",ne="_firstDay_3xln0_41",se="_lastDay_3xln0_45",ae="_firstAndLastDay_3xln0_49",ie="_grayDay_3xln0_54",me="_none_3xln0_58",ce="_pinkDay_3xln0_63",_={days:te,blueDay:re,greenDay:oe,firstDay:ne,lastDay:se,firstAndLastDay:ae,grayDay:ie,none:me,pinkDay:ce};var c=(e=>(e.NONE="NONE",e.PINK="PINK",e.BLUE="BLUE",e.GREEN="GREEN",e.GRAY="GRAY",e))(c||{}),g=(e=>(e.FIRST_DAY="FIRST_DAY",e.LAST_DAY="LAST_DAY",e.FIRST_AND_LAST_DAY="FIRST_AND_LAST_DAY",e.BETWEEN_DAY="BETWEEN_DAY",e))(g||{});const de={NONE:_.none,BLUE:_.blueDay,GREEN:_.greenDay,GRAY:_.grayDay,PINK:_.pinkDay},$=({day:e,dayColor:o,dayType:r})=>{const t=r==="FIRST_DAY",n=r==="LAST_DAY",s=r==="FIRST_AND_LAST_DAY";return y.jsx("div",{"data-testid":`day:${e};dayColor:${o};dayType:${r}`,className:`${_.days} ${de[o]} ${t&&_.firstDay} ${n&&_.lastDay} ${s&&_.firstAndLastDay}`,children:e})};$.__docgenInfo={description:"",methods:[],displayName:"Day"};const le="_box_10rpd_1",ye={box:le};u.extend(B);const O=(e,o="MMMM")=>{const r=e.format(o);return r.charAt(0).toUpperCase()+r.slice(1)},M=({year:e,month:o,showYear:r,children:t,headerLevel:n})=>{const s=u().year(e).month(o).startOf("month"),m=s.isoWeekday(),a=s.endOf("month").isoWeekday(),d=s.daysInMonth()+(m-1)+(7-a),i=[...Array(d/7).keys()];let h=0;return y.jsxs(H,{className:ye.box,"data-testid":`year:${e};month:${o}`,"aria-hidden":!0,children:[y.jsx(V,{size:"small",level:n,children:r?`${O(s,"MMM")} (${e})`:O(s)}),i.map(f=>y.jsx(I,{columns:7,children:[...Array(7).keys()].map(l=>f===0&&l<m-1?y.jsx("div",{},l):f+1===i.length&&l>=a?y.jsx("div",{},l):t[h++])},f))]})};M.__docgenInfo={description:"",methods:[],displayName:"Month"};const ue="_gridColumnsWide_1boeg_1",fe="_gridColumnsSmall_1boeg_5",b={gridColumnsWide:ue,gridColumnsSmall:fe};u.extend(B);u.extend(F);const _e=(e,o,r,t)=>{const n=u().year(e).month(o).date(r),s=t[0].fom,m=t[t.length-1].tom;if(n.isBefore(s,"day")||n.isAfter(m,"day"))return c.NONE;const a=t.find(d=>n.isBetween(d.fom,d.tom,"day","[]"));return(a==null?void 0:a.color)===c.PINK?c.PINK:n.isoWeekday()===6||n.isoWeekday()===7?c.GRAY:(a==null?void 0:a.color)||c.NONE},he=(e,o,r)=>e.isoWeekday()===6||e.isoWeekday()===1||o===1||r.some(t=>e.isSame(t.fom,"day")),ge=(e,o,r)=>e.isoWeekday()===7||e.isoWeekday()===5||o===e.daysInMonth()||r.some(t=>e.isSame(t.tom,"day")),pe=(e,o,r,t)=>{const n=u().year(e).month(o).date(r),s=he(n,r,t),m=ge(n,r,t);return s&&m?g.FIRST_AND_LAST_DAY:s?g.FIRST_DAY:m?g.LAST_DAY:g.BETWEEN_DAY},De=(e,o)=>{let r;return r=(o.getFullYear()-e.getFullYear())*12,r-=e.getMonth(),r+=o.getMonth(),r<=0?0:r},Ee=(e,o)=>{const r=u(e).month()%3,t=3-u(o).month()%3,n=u(e).subtract(r,"month"),s=u(o).add(t,"month"),m=De(n.toDate(),s.toDate());return[...new Array(m)].map((a,d)=>({month:n.add(d,"month").month(),year:n.add(d,"month").year()}))},x=({periods:e,useSmallerWidth:o=!1})=>{const r=Ee(e[0].fom,e[e.length-1].tom);return y.jsx(I,{gap:{xs:"1",sm:"4",md:"8"},className:o?b.gridColumnsSmall:b.gridColumnsWide,children:r.map((t,n)=>y.jsx(M,{year:t.year,month:t.month,showYear:n>0&&r[n-1].year!==t.year,headerLevel:o?"5":"4",children:[...Array(u().year(t.year).month(t.month).daysInMonth()).keys()].map(s=>y.jsx($,{day:s+1,dayColor:_e(t.year,t.month,s+1,e),dayType:pe(t.year,t.month,s+1,e)},t.year+t.month+s))},t.year+"-"+t.month))})};x.__docgenInfo={description:"",methods:[],displayName:"Calendar",props:{periods:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    color: DayColor;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"color",value:{name:"DayColor",required:!0}}]}}],raw:"Period[]"},description:""},useSmallerWidth:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const ve={title:"Calendar",component:x,render:e=>y.jsx("div",{style:{maxWidth:"704px"},children:y.jsx(x,{...e})})},p={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:c.BLUE},{fom:"2024-02-21",tom:"2024-02-21",color:c.PINK},{fom:"2024-02-22",tom:"2024-05-05",color:c.BLUE},{fom:"2024-05-06",tom:"2024-08-30",color:c.GREEN}]}},D={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:c.BLUE},{fom:"2024-05-06",tom:"2024-08-30",color:c.GREEN}]}},E={args:{periods:[{fom:"2024-02-01",tom:"2024-02-20",color:c.BLUE},{fom:"2025-05-06",tom:"2025-07-30",color:c.GREEN}]}};var k,W,S;p.parameters={...p.parameters,docs:{...(k=p.parameters)==null?void 0:k.docs,source:{originalSource:`{
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
}`,...(C=(R=E.parameters)==null?void 0:R.docs)==null?void 0:C.source}}};const je=["Default","PeriodsWithGap","PeriodsThatSpanOverAYear"];export{p as Default,E as PeriodsThatSpanOverAYear,D as PeriodsWithGap,je as __namedExportsOrder,ve as default};
