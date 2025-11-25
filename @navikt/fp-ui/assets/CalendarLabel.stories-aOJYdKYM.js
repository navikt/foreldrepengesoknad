import{j as e}from"./iframe-DphAAE1k.js";import{H as G}from"./VStack-cxPoyHuB.js";import"./preload-helper-D9Z9MdNV.js";import"./useId-BQt7dN_X.js";import"./BasePrimitive-zigma4vB.js";const N="_greenStripedRect_1h5s3_1",v="_blueStripedRect_1h5s3_23",B="_lightblueGreenRect_1h5s3_45",_="_lightgreenBlueRect_1h5s3_60",I="_blueOutlineRect_1h5s3_75",U="_blackOutlineRect_1h5s3_83",T="_greenOutlineRect_1h5s3_91",S="_blackRect_1h5s3_99",O="_greenRect_1h5s3_107",x="_blueRect_1h5s3_116",j="_grayRect_1h5s3_125",P="_pinkRect_1h5s3_134",k="_purpleRect_1h5s3_143",H="_calendarLabel_1h5s3_152",f="_selectableCalendarLabel_1h5s3_156",C="_blueOutlineSelected_1h5s3_160",K="_blackSelected_1h5s3_167",A="_greenSelected_1h5s3_174",D="_blueSelected_1h5s3_181",r={greenStripedRect:N,blueStripedRect:v,lightblueGreenRect:B,lightgreenBlueRect:_,blueOutlineRect:I,blackOutlineRect:U,greenOutlineRect:T,blackRect:S,greenRect:O,blueRect:x,grayRect:j,pinkRect:P,purpleRect:k,calendarLabel:H,selectableCalendarLabel:f,blueOutlineSelected:C,blackSelected:K,greenSelected:A,blueSelected:D},p=({children:g,color:a,onClick:m,selected:b=!1})=>{const h=()=>b?a==="GREEN"||a==="GREENSTRIPED"||a==="LIGHTGREEN"||a==="LIGHTGREENBLUE"?r.greenSelected:a==="BLUE"||a==="BLUESTRIPED"||a==="LIGHTBLUE"||a==="LIGHTBLUEGREEN"?r.blueSelected:a==="BLUEOUTLINE"?r.blueOutlineSelected:a==="BLACK"?r.blackSelected:r.calendarLabelSelected:a!=="PINK"&&a!=="PURPLE"&&a!=="BLACKOUTLINE"&&a!=="GRAY"?[r.calendarLabel,r.selectableCalendarLabel].join(" "):r.calendarLabel;return a!=="DARKBLUE"?e.jsxs(G,{className:h(),gap:"space-8",align:"center",onClick:m,children:[y(a),g]}):null},y=g=>{switch(g){case"BLUE":case"LIGHTBLUE":return e.jsx("div",{className:r.blueRect});case"GREEN":case"LIGHTGREEN":return e.jsx("div",{className:r.greenRect});case"BLUEOUTLINE":return e.jsx("div",{className:r.blueOutlineRect});case"BLACKOUTLINE":return e.jsx("div",{className:r.blackOutlineRect});case"GREENOUTLINE":return e.jsx("div",{className:r.greenOutlineRect});case"BLACK":return e.jsx("div",{className:r.blackRect});case"LIGHTBLUEGREEN":return e.jsx("div",{className:r.lightblueGreenRect});case"LIGHTGREENBLUE":return e.jsx("div",{className:r.lightgreenBlueRect});case"BLUESTRIPED":return e.jsx("div",{className:r.blueStripedRect});case"GREENSTRIPED":return e.jsx("div",{className:r.greenStripedRect});case"GRAY":return e.jsx("div",{className:r.grayRect});case"PURPLE":return e.jsx("div",{className:r.purpleRect});case"PINK":return e.jsx("div",{className:r.pinkRect});default:return null}};p.__docgenInfo={description:"",methods:[],displayName:"CalendarLabel",props:{children:{required:!0,tsType:{name:"ReactReactNode",raw:"React.ReactNode"},description:""},color:{required:!0,tsType:{name:"union",raw:`| 'NONE'
| 'PINK'
| 'PURPLE'
| 'LIGHTBLUE'
| 'BLUE'
| 'DARKBLUE'
| 'GREEN'
| 'LIGHTGREEN'
| 'GRAY'
| 'BLACK'
| 'BLACKOUTLINE'
| 'LIGHTBLUEGREEN'
| 'LIGHTGREENBLUE'
| 'GREENSTRIPED'
| 'BLUESTRIPED'
| 'GREENOUTLINE'
| 'BLUEOUTLINE'`,elements:[{name:"literal",value:"'NONE'"},{name:"literal",value:"'PINK'"},{name:"literal",value:"'PURPLE'"},{name:"literal",value:"'LIGHTBLUE'"},{name:"literal",value:"'BLUE'"},{name:"literal",value:"'DARKBLUE'"},{name:"literal",value:"'GREEN'"},{name:"literal",value:"'LIGHTGREEN'"},{name:"literal",value:"'GRAY'"},{name:"literal",value:"'BLACK'"},{name:"literal",value:"'BLACKOUTLINE'"},{name:"literal",value:"'LIGHTBLUEGREEN'"},{name:"literal",value:"'LIGHTGREENBLUE'"},{name:"literal",value:"'GREENSTRIPED'"},{name:"literal",value:"'BLUESTRIPED'"},{name:"literal",value:"'GREENOUTLINE'"},{name:"literal",value:"'BLUEOUTLINE'"}]},description:""},onClick:{required:!1,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""},selected:{required:!1,tsType:{name:"boolean"},description:"",defaultValue:{value:"false",computed:!1}}}};const F={title:"CalendarLabel",component:p},l={args:{color:"GREEN",children:e.jsx("div",{children:"green"})}},n={args:{color:"BLUE",children:e.jsx("div",{children:"blue"})}},t={args:{color:"PINK",children:e.jsx("div",{children:"pink"})}},c={args:{color:"BLUEOUTLINE",children:e.jsx("div",{children:"blue outline"})}},s={args:{color:"BLUESTRIPED",children:e.jsx("div",{children:"blue striped"})}},i={args:{color:"GREENOUTLINE",children:e.jsx("div",{children:"green outline"})}},d={args:{color:"GREENSTRIPED",children:e.jsx("div",{children:"green striped"})}},o={args:{color:"LIGHTBLUE",children:e.jsx("div",{children:"light blue"})}},u={args:{color:"LIGHTGREEN",children:e.jsx("div",{children:"light green"})}},E={args:{color:"LIGHTGREENBLUE",children:e.jsx("div",{children:"light green blue"})}},L={args:{color:"LIGHTBLUEGREEN",children:e.jsx("div",{children:"light blue green"})}},R={args:{color:"BLACK",children:e.jsx("div",{children:"black"})}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'GREEN',
    children: <div>green</div>
  }
}`,...l.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'BLUE',
    children: <div>blue</div>
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'PINK',
    children: <div>pink</div>
  }
}`,...t.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'BLUEOUTLINE',
    children: <div>blue outline</div>
  }
}`,...c.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'BLUESTRIPED',
    children: <div>blue striped</div>
  }
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'GREENOUTLINE',
    children: <div>green outline</div>
  }
}`,...i.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'GREENSTRIPED',
    children: <div>green striped</div>
  }
}`,...d.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'LIGHTBLUE',
    children: <div>light blue</div>
  }
}`,...o.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'LIGHTGREEN',
    children: <div>light green</div>
  }
}`,...u.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'LIGHTGREENBLUE',
    children: <div>light green blue</div>
  }
}`,...E.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'LIGHTBLUEGREEN',
    children: <div>light blue green</div>
  }
}`,...L.parameters?.docs?.source}}};R.parameters={...R.parameters,docs:{...R.parameters?.docs,source:{originalSource:`{
  args: {
    color: 'BLACK',
    children: <div>black</div>
  }
}`,...R.parameters?.docs?.source}}};const J=["GreenLabel","BlueLabel","PinkLabel","BlueOutlineLabel","BlueStripedLabel","GreenOutlineLabel","GreenStripedLabel","LightBlueLabel","LightGreenLabel","LightGreenBlueLabel","LightBlueGreenLabel","BlackLabel"];export{R as BlackLabel,n as BlueLabel,c as BlueOutlineLabel,s as BlueStripedLabel,l as GreenLabel,i as GreenOutlineLabel,d as GreenStripedLabel,L as LightBlueGreenLabel,o as LightBlueLabel,E as LightGreenBlueLabel,u as LightGreenLabel,t as PinkLabel,J as __namedExportsOrder,F as default};
