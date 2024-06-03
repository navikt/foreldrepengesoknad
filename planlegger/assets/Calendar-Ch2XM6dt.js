import{j as l}from"./jsx-runtime-Du8NFWEI.js";import{d as i}from"./dayjs.min-a42Le6oL.js";import{i as N}from"./isoWeek-tto3dG8J.js";import{B as S}from"./Box-DoqHmnCA.js";import{H as O}from"./Label-DKKZxAV5.js";import{c as I}from"./clsx-B-dksMZM.js";import{r as Y,R as x}from"./index-Dl6G-zuu.js";import{g as k,a as R}from"./css-CqApuV4H.js";var T=function(e,r){var n={};for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&r.indexOf(t)<0&&(n[t]=e[t]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var s=0,t=Object.getOwnPropertySymbols(e);s<t.length;s++)r.indexOf(t[s])<0&&Object.prototype.propertyIsEnumerable.call(e,t[s])&&(n[t[s]]=e[t[s]]);return n};const v=Y.forwardRef((e,r)=>{var{className:n,columns:t,gap:s,style:o,align:m}=e,a=T(e,["className","columns","gap","style","align"]);const c=Object.assign(Object.assign(Object.assign(Object.assign({},o),{"--__ac-hgrid-align":m}),k("hgrid","gap","spacing",s)),R("hgrid","columns",L(t)));return x.createElement("div",Object.assign({},a,{ref:r,className:I("navds-hgrid",n),style:c}))});function L(e){return e?typeof e=="string"||typeof e=="number"?h(e):Object.fromEntries(Object.entries(e).map(([r,n])=>[r,h(n)])):{}}const h=e=>typeof e=="number"?`repeat(${e}, minmax(0, 1fr))`:e,j=v,M="_days_16ojg_1",W="_blueDay_16ojg_31",C="_greenDay_16ojg_35",$="_firstDay_16ojg_41",P="_lastDay_16ojg_45",F="_firstAndLastDay_16ojg_49",B="_grayDay_16ojg_54",G="_none_16ojg_58",w="_pinkDay_16ojg_63",y={days:M,blueDay:W,greenDay:C,firstDay:$,lastDay:P,firstAndLastDay:F,grayDay:B,none:G,pinkDay:w};var d=(e=>(e.NONE="NONE",e.PINK="PINK",e.BLUE="BLUE",e.GREEN="GREEN",e.GRAY="GRAY",e))(d||{}),f=(e=>(e.FIRST_DAY="FIRST_DAY",e.LAST_DAY="LAST_DAY",e.FIRST_AND_LAST_DAY="FIRST_AND_LAST_DAY",e.BETWEEN_DAY="BETWEEN_DAY",e))(f||{});const K={NONE:y.none,BLUE:y.blueDay,GREEN:y.greenDay,GRAY:y.grayDay,PINK:y.pinkDay},p=({day:e,dayColor:r,dayType:n})=>{const t=n==="FIRST_DAY",s=n==="LAST_DAY",o=n==="FIRST_AND_LAST_DAY";return l.jsx("div",{"data-testid":`day:${e};dayColor:${r};dayType:${n}`,className:`${y.days} ${K[r]} ${t&&y.firstDay} ${s&&y.lastDay} ${o&&y.firstAndLastDay}`,children:e})};p.__docgenInfo={description:"",methods:[],displayName:"Day"};const q="_box_pj78t_1",H={box:q};i.extend(N);const D=(e,r="MMMM")=>{const n=e.format(r);return n.charAt(0).toUpperCase()+n.slice(1)},E=({year:e,month:r,showYear:n,children:t,headerLevel:s})=>{const o=i().year(e).month(r).startOf("month"),m=o.isoWeekday(),a=o.endOf("month").isoWeekday(),c=o.daysInMonth()+(m-1)+(7-a),g=[...Array(c/7).keys()];let b=0;return l.jsxs(S,{className:H.box,"data-testid":`year:${e};month:${r}`,"aria-hidden":!0,children:[l.jsx(O,{size:"small",level:s,children:n?`${D(o,"MMM")} (${e})`:D(o)}),g.map(_=>l.jsx(j,{columns:7,children:[...Array(7).keys()].map(u=>_===0&&u<m-1?l.jsx("div",{},u):_+1===g.length&&u>=a?l.jsx("div",{},u):t[b++])},_))]})};E.__docgenInfo={description:"",methods:[],displayName:"Month"};const U="_gridColumnsWide_jsg38_1",V="_gridColumnsSmall_jsg38_5",A={gridColumnsWide:U,gridColumnsSmall:V};i.extend(N);const z=(e,r,n,t)=>{const s=i().year(e).month(r).date(n),o=t[0].fom,m=t[t.length-1].tom;if(s.isBefore(o,"day")||s.isAfter(m,"day"))return d.NONE;const a=t.find(c=>s.isBetween(c.fom,c.tom,"day","[]"));return(a==null?void 0:a.color)===d.PINK?d.PINK:s.isoWeekday()===6||s.isoWeekday()===7?d.GRAY:(a==null?void 0:a.color)||d.NONE},J=(e,r,n)=>{const t=n.find(s=>s.color===d.PINK);return e.isoWeekday()===6||e.isoWeekday()===1||r===1||n.some(s=>e.isSame(s.fom,"day"))||t&&i(t.fom).isSame(e.subtract(1,"day"),"day")},Q=(e,r,n)=>{const t=n.find(s=>s.color===d.PINK);return e.isoWeekday()===7||e.isoWeekday()===5||r===e.daysInMonth()||n.some(s=>e.isSame(s.tom,"day"))||t&&i(t.fom).isSame(e.add(1,"day"),"day")},X=(e,r,n,t)=>{const s=i().year(e).month(r).date(n),o=J(s,n,t),m=Q(s,n,t);return o&&m?f.FIRST_AND_LAST_DAY:o?f.FIRST_DAY:m?f.LAST_DAY:f.BETWEEN_DAY},Z=(e,r)=>{let n;return n=(r.getFullYear()-e.getFullYear())*12,n-=e.getMonth(),n+=r.getMonth(),n<=0?0:n},ee=(e,r)=>{const n=i(e).month()%3,t=3-i(r).month()%3,s=i(e).subtract(n,"month"),o=i(r).add(t,"month"),m=Z(s.toDate(),o.toDate());return[...new Array(m)].map((a,c)=>({month:s.add(c,"month").month(),year:s.add(c,"month").year()}))},te=({periods:e,useSmallerWidth:r=!1})=>{const n=ee(e[0].fom,e[e.length-1].tom);return l.jsx(j,{gap:{xs:"2",sm:"4",md:"8"},className:r?A.gridColumnsSmall:A.gridColumnsWide,children:n.map((t,s)=>l.jsx(E,{year:t.year,month:t.month,showYear:s>0&&n[s-1].year!==t.year,headerLevel:r?"5":"4",children:[...Array(i().year(t.year).month(t.month).daysInMonth()).keys()].map(o=>l.jsx(p,{day:o+1,dayColor:z(t.year,t.month,o+1,e),dayType:X(t.year,t.month,o+1,e)},t.year+t.month+o))},t.year+"-"+t.month))})};te.__docgenInfo={description:"",methods:[],displayName:"Calendar",props:{periods:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    color: DayColor;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"color",value:{name:"DayColor",required:!0}}]}}],raw:"Period[]"},description:""},useSmallerWidth:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};export{te as C,d as D};
