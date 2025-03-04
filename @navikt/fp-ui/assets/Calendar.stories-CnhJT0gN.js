import{j as l}from"./jsx-runtime-CLpGMVip.js";import{P as o}from"./colors-jfTJ4KPK.js";import"./dates-l9FtPD11.js";import{d as y}from"./dayjs.min-Cu1bdzaI.js";import{i as G,a as C}from"./isoWeek-DRwwro2u.js";import{B as U}from"./Box-B5PHMoRA.js";import{H as M}from"./Label-qgu6Xy-0.js";import{H as B}from"./HGrid-DlI1JvL9.js";import"./index-CZMpeKRu.js";import"./useId-Dd4CLFiT.js";import"./BasePrimitive-CCNoOCf8.js";import"./create-context-Cu5JotWs.js";const W="_days_1pfb2_1",v="_blueDay_1pfb2_15",j="_yellowDay_1pfb2_20",q="_lightblueDay_1pfb2_25",H="_firstDay_1pfb2_32",$="_lastDay_1pfb2_36",w="_firstAndLastDay_1pfb2_40",F="_lightgreenDay_1pfb2_45",K="_greenDay_1pfb2_65",z="_greenStripedDay_1pfb2_70",V="_blueStripedDay_1pfb2_105",J="_grayDay_1pfb2_140",Q="_blackDay_1pfb2_145",X="_blueOutlineDay_1pfb2_151",Z="_greenOutlineDay_1pfb2_170",ee="_lightgreenBlueDay_1pfb2_189",re="_lightblueGreenDay_1pfb2_216",oe="_none_1pfb2_242",te="_pinkDay_1pfb2_247",ne="_purpleDay_1pfb2_262",s={days:W,blueDay:v,yellowDay:j,lightblueDay:q,firstDay:H,lastDay:$,firstAndLastDay:w,lightgreenDay:F,greenDay:K,greenStripedDay:z,blueStripedDay:V,grayDay:J,blackDay:Q,blueOutlineDay:X,greenOutlineDay:Z,lightgreenBlueDay:ee,lightblueGreenDay:re,none:oe,pinkDay:te,purpleDay:ne};var u=(e=>(e.FIRST_DAY="FIRST_DAY",e.LAST_DAY="LAST_DAY",e.FIRST_AND_LAST_DAY="FIRST_AND_LAST_DAY",e.BETWEEN_DAY="BETWEEN_DAY",e))(u||{});const ae={[o.NONE]:s.none,[o.BLUE]:s.blueDay,[o.LIGHTGREEN]:s.lightgreenDay,[o.GRAY]:s.grayDay,[o.PINK]:s.pinkDay,[o.PURPLE]:s.purpleDay,[o.BLACK]:s.blackDay,[o.BLUEOUTLINE]:s.blueOutlineDay,[o.GREENOUTLINE]:s.greenOutlineDay,[o.LIGHTBLUE]:s.lightblueDay,[o.GREEN]:s.greenDay,[o.LIGHTBLUEGREEN]:s.lightblueGreenDay,[o.LIGHTGREENBLUE]:s.lightgreenBlueDay,[o.GREENSTRIPED]:s.greenStripedDay,[o.BLUESTRIPED]:s.blueStripedDay,[o.LIGHTYELLOW]:s.yellowDay},k=({day:e,periodeColor:a,dayType:t})=>{const r=t==="FIRST_DAY",n=t==="LAST_DAY",i=t==="FIRST_AND_LAST_DAY";return l.jsx("div",{"data-testid":`day:${e};dayColor:${a};dayType:${t}`,className:`${s.days} ${ae[a]} ${r&&s.firstDay} ${n&&s.lastDay} ${i&&s.firstAndLastDay}`,children:e})};k.__docgenInfo={description:"",methods:[],displayName:"Day",props:{day:{required:!0,tsType:{name:"number"},description:""},periodeColor:{required:!0,tsType:{name:"PeriodeColor"},description:""},dayType:{required:!0,tsType:{name:"DayType"},description:""}}};const se="_box_14xqs_1",ie={box:se};y.extend(G);const b=(e,a="MMMM")=>{const t=e.format(a);return t.charAt(0).toUpperCase()+t.slice(1)},O=({year:e,month:a,showYear:t,children:r,headerLevel:n})=>{const i=y().year(e).month(a).startOf("month"),c=i.isoWeekday(),m=i.endOf("month").isoWeekday(),d=i.daysInMonth()+(c-1)+(7-m),E=[...Array(d/7).keys()];let Y=0;return l.jsxs(U,{className:ie.box,"data-testid":`year:${e};month:${a}`,"aria-hidden":!0,children:[l.jsx(M,{size:"small",level:n,children:t?`${b(i,"MMM")} (${e})`:b(i)}),E.map(g=>l.jsx(B,{columns:7,children:[...Array(7).keys()].map(p=>g===0&&p<c-1?l.jsx("div",{},p):g+1===E.length&&p>=m?l.jsx("div",{},p):r[Y++])},g))]})};O.__docgenInfo={description:"",methods:[],displayName:"Month",props:{year:{required:!0,tsType:{name:"number"},description:""},month:{required:!0,tsType:{name:"number"},description:""},showYear:{required:!0,tsType:{name:"boolean"},description:""},children:{required:!0,tsType:{name:"Array",elements:[{name:"ReactReactNode",raw:"React.ReactNode"}],raw:"React.ReactNode[]"},description:""},headerLevel:{required:!0,tsType:{name:"union",raw:"'4' | '5'",elements:[{name:"literal",value:"'4'"},{name:"literal",value:"'5'"}]},description:""}}};const le="_srOnly_19lbm_1",me={srOnly:le};y.extend(G);y.extend(C);const ye=(e,a,t,r)=>{const n=y().year(e).month(a).date(t),i=r[0].fom,c=r[r.length-1].tom;if(n.isBefore(i,"day")||n.isAfter(c,"day"))return o.NONE;const m=r.find(d=>n.isBetween(d.fom,d.tom,"day","[]"));return(m==null?void 0:m.color)===o.PINK?o.PINK:(m==null?void 0:m.color)===o.PURPLE?o.PURPLE:n.isoWeekday()===6||n.isoWeekday()===7?o.GRAY:(m==null?void 0:m.color)||o.NONE},ce=(e,a,t)=>{const r=t.find(n=>n.color===o.PINK);return e.isoWeekday()===6||e.isoWeekday()===1||a===1||t.some(n=>e.isSame(n.fom,"day"))||r&&y(r.fom).isSame(e.subtract(1,"day"),"day")},de=(e,a,t)=>{const r=t.find(n=>n.color===o.PINK);return e.isoWeekday()===7||e.isoWeekday()===5||a===e.daysInMonth()||t.some(n=>e.isSame(n.tom,"day"))||r&&y(r.fom).isSame(e.add(1,"day"),"day")},ue=(e,a,t,r)=>{const n=y().year(e).month(a).date(t),i=ce(n,t,r),c=de(n,t,r);return i&&c?u.FIRST_AND_LAST_DAY:i?u.FIRST_DAY:c?u.LAST_DAY:u.BETWEEN_DAY},pe=(e,a)=>{let t;return t=(a.getFullYear()-e.getFullYear())*12,t-=e.getMonth(),t+=a.getMonth(),t<=0?0:t},fe=(e,a)=>{const t=y(e).month()%3,r=3-y(a).month()%3,n=y(e).subtract(t,"month"),i=y(a).add(r,"month"),c=pe(n.toDate(),i.toDate());return[...new Array(c)].map((m,d)=>({month:n.add(d,"month").month(),year:n.add(d,"month").year()}))},h=({periods:e,useSmallerWidth:a=!1})=>{const t=fe(e[0].fom,e[e.length-1].tom);return l.jsxs(l.Fragment,{children:[e.some(r=>r.srText)&&l.jsx("div",{className:me.srOnly,children:e.filter(r=>r.srText).map(r=>r.srText).toString()}),l.jsx(B,{gap:{xs:"2",sm:"4",md:"8"},columns:a?{xs:"repeat(1, 1fr)",sm:"repeat(3, 1fr)"}:{xs:"repeat(2, 1fr)",sm:"repeat(3, 1fr)"},children:t.map((r,n)=>l.jsx(O,{year:r.year,month:r.month,showYear:n>0&&t[n-1].year!==r.year,headerLevel:a?"5":"4",children:[...Array(y().year(r.year).month(r.month).daysInMonth()).keys()].map(i=>l.jsx(k,{day:i+1,periodeColor:ye(r.year,r.month,i+1,e),dayType:ue(r.year,r.month,i+1,e)},r.year+r.month+i))},r.year+"-"+r.month))})]})};h.__docgenInfo={description:"",methods:[],displayName:"Calendar",props:{periods:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom: string;
    color: PeriodeColor;
    srText?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!0}},{key:"color",value:{name:"PeriodeColor",required:!0}},{key:"srText",value:{name:"string",required:!1}}]}}],raw:"Period[]"},description:""},useSmallerWidth:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const Pe={title:"Calendar",component:h,render:e=>l.jsx("div",{style:{maxWidth:"704px"},children:l.jsx(h,{...e})})},f={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:o.BLUE},{fom:"2024-02-21",tom:"2024-02-21",color:o.PINK},{fom:"2024-02-22",tom:"2024-05-05",color:o.BLUE},{fom:"2024-05-06",tom:"2024-08-30",color:o.LIGHTGREEN}]}},_={args:{periods:[{fom:"2024-01-31",tom:"2024-02-20",color:o.BLUE},{fom:"2024-05-06",tom:"2024-08-30",color:o.LIGHTGREEN}]}},D={args:{periods:[{fom:"2024-02-01",tom:"2024-02-20",color:o.BLUE},{fom:"2025-05-06",tom:"2025-07-30",color:o.LIGHTGREEN}]}};var T,L,A;f.parameters={...f.parameters,docs:{...(T=f.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(A=(L=f.parameters)==null?void 0:L.docs)==null?void 0:A.source}}};var N,S,I;_.parameters={..._.parameters,docs:{...(N=_.parameters)==null?void 0:N.docs,source:{originalSource:`{
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
}`,...(I=(S=_.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};var P,x,R;D.parameters={...D.parameters,docs:{...(P=D.parameters)==null?void 0:P.docs,source:{originalSource:`{
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
}`,...(R=(x=D.parameters)==null?void 0:x.docs)==null?void 0:R.source}}};const xe=["Default","PeriodsWithGap","PeriodsThatSpanOverAYear"];export{f as Default,D as PeriodsThatSpanOverAYear,_ as PeriodsWithGap,xe as __namedExportsOrder,Pe as default};
