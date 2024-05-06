import{j as c}from"./jsx-runtime-Du8NFWEI.js";import{d as l}from"./dayjs.min-a42Le6oL.js";import{i as N}from"./isoWeek-tto3dG8J.js";import{B as S}from"./Box-DoqHmnCA.js";import{H as O}from"./Label-DKKZxAV5.js";import{c as j}from"./clsx-B-dksMZM.js";import{r as Y,R as I}from"./index-Dl6G-zuu.js";import{g as R,a as T}from"./css-CqApuV4H.js";var k=function(e,r){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,t=Object.getOwnPropertySymbols(e);s<t.length;s++)r.indexOf(t[s])<0&&Object.prototype.propertyIsEnumerable.call(e,t[s])&&(n[t[s]]=e[t[s]]);return n};const v=Y.forwardRef((e,r)=>{var{className:n,columns:t,gap:s,style:a,align:i}=e,o=k(e,["className","columns","gap","style","align"]);const m=Object.assign(Object.assign(Object.assign(Object.assign({},a),{"--__ac-hgrid-align":i}),R("hgrid","gap","spacing",s)),T("hgrid","columns",L(t)));return I.createElement("div",Object.assign({},o,{ref:r,className:j("navds-hgrid",n),style:m}))});function L(e){return e?typeof e=="string"||typeof e=="number"?h(e):Object.fromEntries(Object.entries(e).map(([r,n])=>[r,h(n)])):{}}const h=e=>typeof e=="number"?`repeat(${e}, minmax(0, 1fr))`:e,p=v,M="_days_3xln0_1",W="_blueDay_3xln0_31",C="_greenDay_3xln0_35",$="_firstDay_3xln0_41",F="_lastDay_3xln0_45",P="_firstAndLastDay_3xln0_49",B="_grayDay_3xln0_54",G="_none_3xln0_58",w="_pinkDay_3xln0_63",d={days:M,blueDay:W,greenDay:C,firstDay:$,lastDay:F,firstAndLastDay:P,grayDay:B,none:G,pinkDay:w};var y=(e=>(e.NONE="NONE",e.PINK="PINK",e.BLUE="BLUE",e.GREEN="GREEN",e.GRAY="GRAY",e))(y||{}),u=(e=>(e.FIRST_DAY="FIRST_DAY",e.LAST_DAY="LAST_DAY",e.FIRST_AND_LAST_DAY="FIRST_AND_LAST_DAY",e.BETWEEN_DAY="BETWEEN_DAY",e))(u||{});const q={NONE:d.none,BLUE:d.blueDay,GREEN:d.greenDay,GRAY:d.grayDay,PINK:d.pinkDay},b=({day:e,dayColor:r,dayType:n})=>{const t=n==="FIRST_DAY",s=n==="LAST_DAY",a=n==="FIRST_AND_LAST_DAY";return c.jsx("div",{"data-testid":`day:${e};dayColor:${r};dayType:${n}`,className:`${d.days} ${q[r]} ${t&&d.firstDay} ${s&&d.lastDay} ${a&&d.firstAndLastDay}`,children:e})};b.__docgenInfo={description:"",methods:[],displayName:"Day"};const K="_box_10rpd_1",H={box:K};l.extend(N);const A=(e,r="MMMM")=>{const n=e.format(r);return n.charAt(0).toUpperCase()+n.slice(1)},x=({year:e,month:r,showYear:n,children:t,headerLevel:s})=>{const a=l().year(e).month(r).startOf("month"),i=a.isoWeekday(),o=a.endOf("month").isoWeekday(),m=a.daysInMonth()+(i-1)+(7-o),g=[...Array(m/7).keys()];let E=0;return c.jsxs(S,{className:H.box,"data-testid":`year:${e};month:${r}`,"aria-hidden":!0,children:[c.jsx(O,{size:"small",level:s,children:n?`${A(a,"MMM")} (${e})`:A(a)}),g.map(_=>c.jsx(p,{columns:7,children:[...Array(7).keys()].map(f=>_===0&&f<i-1?c.jsx("div",{},f):_+1===g.length&&f>=o?c.jsx("div",{},f):t[E++])},_))]})};x.__docgenInfo={description:"",methods:[],displayName:"Month"};const U="_gridColumnsWide_1boeg_1",V="_gridColumnsSmall_1boeg_5",D={gridColumnsWide:U,gridColumnsSmall:V};l.extend(N);const z=(e,r,n,t)=>{const s=l().year(e).month(r).date(n),a=t[0].fom,i=t[t.length-1].tom;if(s.isBefore(a,"day")||s.isAfter(i,"day"))return y.NONE;const o=t.find(m=>s.isBetween(m.fom,m.tom,"day","[]"));return(o==null?void 0:o.color)===y.PINK?y.PINK:s.isoWeekday()===6||s.isoWeekday()===7?y.GRAY:(o==null?void 0:o.color)||y.NONE},J=(e,r,n)=>e.isoWeekday()===6||e.isoWeekday()===1||r===1||n.some(t=>e.isSame(t.fom,"day")),Q=(e,r,n)=>e.isoWeekday()===7||e.isoWeekday()===5||r===e.daysInMonth()||n.some(t=>e.isSame(t.tom,"day")),X=(e,r,n,t)=>{const s=l().year(e).month(r).date(n),a=J(s,n,t),i=Q(s,n,t);return a&&i?u.FIRST_AND_LAST_DAY:a?u.FIRST_DAY:i?u.LAST_DAY:u.BETWEEN_DAY},Z=(e,r)=>{let n;return n=(r.getFullYear()-e.getFullYear())*12,n-=e.getMonth(),n+=r.getMonth(),n<=0?0:n},ee=(e,r)=>{const n=l(e).month()%3,t=3-l(r).month()%3,s=l(e).subtract(n,"month"),a=l(r).add(t,"month"),i=Z(s.toDate(),a.toDate());return[...new Array(i)].map((o,m)=>({month:s.add(m,"month").month(),year:s.add(m,"month").year()}))},te=({periods:e,useSmallerWidth:r=!1})=>{const n=ee(e[0].fom,e[e.length-1].tom);return c.jsx(p,{gap:{xs:"1",sm:"4",md:"8"},className:r?D.gridColumnsSmall:D.gridColumnsWide,children:n.map((t,s)=>c.jsx(x,{year:t.year,month:t.month,showYear:s>0&&n[s-1].year!==t.year,headerLevel:r?"5":"4",children:[...Array(l().year(t.year).month(t.month).daysInMonth()).keys()].map(a=>c.jsx(b,{day:a+1,dayColor:z(t.year,t.month,a+1,e),dayType:X(t.year,t.month,a+1,e)},t.year+t.month+a))},t.year+"-"+t.month))})};te.__docgenInfo={description:"",methods:[],displayName:"Calendar",props:{periods:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    color: DayColor;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"color",value:{name:"DayColor",required:!0}}]}}],raw:"Period[]"},description:""},useSmallerWidth:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};export{te as C,y as D};
