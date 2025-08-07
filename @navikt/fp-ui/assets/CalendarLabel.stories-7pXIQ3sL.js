import{r as o,j as r}from"./iframe-DNfLYLHv.js";import{P as e}from"./colors-DoU1ogH6.js";import"./dates-BZNSxROy.js";import{H as _}from"./VStack-Dewg8uBr.js";import"./useId-DVDLCGeS.js";import{u as T}from"./useId-RMYSL8TW.js";import{S as N}from"./ExclamationmarkTriangleFill-C4WGtYfH.js";import"./BasePrimitive-BoNAoiuR.js";var R=function(l,i){var s={};for(var a in l)Object.prototype.hasOwnProperty.call(l,a)&&i.indexOf(a)<0&&(s[a]=l[a]);if(l!=null&&typeof Object.getOwnPropertySymbols=="function")for(var c=0,a=Object.getOwnPropertySymbols(l);c<a.length;c++)i.indexOf(a[c])<0&&Object.prototype.propertyIsEnumerable.call(l,a[c])&&(s[a[c]]=l[a[c]]);return s};const B=o.forwardRef((l,i)=>{var{title:s,titleId:a}=l,c=R(l,["title","titleId"]);let t=T();return t=s?a||"title-"+t:void 0,o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:i,"aria-labelledby":t},c),s?o.createElement("title",{id:t},s):null,o.createElement("path",{fill:"currentColor",d:"M12 4.969c1.399-1.242 2.776-1.844 4.125-1.844 1.519 0 2.823.763 3.905 1.845 2.373 2.372 2.206 6.354-1 9.56l-6.5 6.5a.75.75 0 0 1-1.06 0l-6.5-6.5c-3.207-3.206-3.373-7.188-1-9.56C5.05 3.888 6.355 3.125 7.874 3.125c1.349 0 2.726.602 4.125 1.844"}))}),y="_bluePanel_jc25d_1",x="_greenPanel_jc25d_14",I="_greenOutlinePanel_jc25d_27",O="_blueOutlinePanel_jc25d_39",S="_pinkPanel_jc25d_51",U="_grayPanel_jc25d_64",f="_margin_jc25d_77",k="_greenStripedCircle_jc25d_81",H="_blueStripedCircle_jc25d_104",w="_lightblueGreenCircle_jc25d_127",A="_lightgreenBlueCircle_jc25d_143",K="_blueOutlineCircle_jc25d_159",D="_greenOutlineCircle_jc25d_168",F="_blackCircle_jc25d_177",Y="_greenCircle_jc25d_186",q="_blueCircle_jc25d_195",M="_grayCircle_jc25d_204",n={bluePanel:y,greenPanel:x,greenOutlinePanel:I,blueOutlinePanel:O,pinkPanel:S,grayPanel:U,margin:f,greenStripedCircle:k,blueStripedCircle:H,lightblueGreenCircle:w,lightgreenBlueCircle:A,blueOutlineCircle:K,greenOutlineCircle:D,blackCircle:F,greenCircle:Y,blueCircle:q,grayCircle:M},G=l=>{switch(l){case e.BLUE:return r.jsx("div",{className:n.blueCircle});case e.GREEN:return r.jsx("div",{className:n.greenCircle});case e.LIGHTBLUE:case e.BLUEOUTLINE:return r.jsx("div",{className:n.blueOutlineCircle});case e.GREENOUTLINE:case e.LIGHTGREEN:return r.jsx("div",{className:n.greenOutlineCircle});case e.BLACK:return r.jsx("div",{className:n.blackCircle});case e.LIGHTBLUEGREEN:return r.jsx("div",{className:n.lightblueGreenCircle});case e.LIGHTGREENBLUE:return r.jsx("div",{className:n.lightgreenBlueCircle});case e.BLUESTRIPED:return r.jsx("div",{className:n.blueStripedCircle});case e.GREENSTRIPED:return r.jsx("div",{className:n.greenStripedCircle});case e.GRAY:return r.jsx("div",{className:n.grayCircle});case e.PURPLE:return r.jsx("div",{className:n.purpleCircle});default:return null}},$={[e.NONE]:n.none,[e.BLUE]:n.bluePanel,[e.LIGHTBLUE]:n.bluePanel,[e.BLUESTRIPED]:n.bluePanel,[e.LIGHTGREENBLUE]:n.bluePanel,[e.LIGHTBLUEGREEN]:n.greenPanel,[e.GREEN]:n.greenPanel,[e.LIGHTGREEN]:n.greenPanel,[e.GREENSTRIPED]:n.greenPanel,[e.GRAY]:n.grayPanel,[e.PINK]:n.pinkPanel,[e.PURPLE]:n.purlpePanel,[e.BLACK]:n.grayPanel,[e.GREENOUTLINE]:n.greenOutlinePanel,[e.BLUEOUTLINE]:n.blueOutlinePanel},j=({children:l,iconType:i})=>i===e.PINK?r.jsx("div",{className:n.pinkPanel,children:r.jsxs(_,{gap:"2",align:"center",children:[l,r.jsx(B,{color:"#F68282","aria-hidden":!0})]})}):i===e.BLACK?r.jsx("div",{className:n.grayPanel,children:r.jsxs(_,{gap:"2",align:"center",children:[r.jsx(N,{style:{color:"#FF9100"}}),l,r.jsx("div",{className:n.margin,children:G(i)})]})}):r.jsx("div",{className:`${$[i]}`,children:r.jsxs(_,{gap:"2",align:"end",wrap:!1,children:[l,r.jsx("div",{className:n.margin,children:G(i)})]})});j.__docgenInfo={description:"",methods:[],displayName:"CalendarLabel",props:{children:{required:!0,tsType:{name:"union",raw:"React.ReactElement | React.ReactElement[]",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"Array",elements:[{name:"ReactReactElement",raw:"React.ReactElement"}],raw:"React.ReactElement[]"}]},description:""},iconType:{required:!0,tsType:{name:"PeriodeColor"},description:""}}};const re={title:"CalendarLabel",component:j},d={args:{iconType:e.GREEN,children:r.jsx("div",{children:"green"})}},u={args:{iconType:e.BLUE,children:r.jsx("div",{children:"blue"})}},g={args:{iconType:e.PINK,children:r.jsx("div",{children:"pink"})}},p={args:{iconType:e.BLUEOUTLINE,children:r.jsx("div",{children:"blue outline"})}},m={args:{iconType:e.BLUESTRIPED,children:r.jsx("div",{children:"blue striped"})}},E={args:{iconType:e.GREENOUTLINE,children:r.jsx("div",{children:"green outline"})}},L={args:{iconType:e.GREENSTRIPED,children:r.jsx("div",{children:"green striped"})}},b={args:{iconType:e.LIGHTBLUE,children:r.jsx("div",{children:"light blue"})}},h={args:{iconType:e.LIGHTGREEN,children:r.jsx("div",{children:"light green"})}},P={args:{iconType:e.LIGHTGREENBLUE,children:r.jsx("div",{children:"light green blue"})}},C={args:{iconType:e.LIGHTBLUEGREEN,children:r.jsx("div",{children:"light blue green"})}},v={args:{iconType:e.BLACK,children:r.jsx("div",{children:"black"})}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.GREEN,
    children: <div>green</div>
  }
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.BLUE,
    children: <div>blue</div>
  }
}`,...u.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.PINK,
    children: <div>pink</div>
  }
}`,...g.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.BLUEOUTLINE,
    children: <div>blue outline</div>
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.BLUESTRIPED,
    children: <div>blue striped</div>
  }
}`,...m.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.GREENOUTLINE,
    children: <div>green outline</div>
  }
}`,...E.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.GREENSTRIPED,
    children: <div>green striped</div>
  }
}`,...L.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.LIGHTBLUE,
    children: <div>light blue</div>
  }
}`,...b.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.LIGHTGREEN,
    children: <div>light green</div>
  }
}`,...h.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.LIGHTGREENBLUE,
    children: <div>light green blue</div>
  }
}`,...P.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.LIGHTBLUEGREEN,
    children: <div>light blue green</div>
  }
}`,...C.parameters?.docs?.source}}};v.parameters={...v.parameters,docs:{...v.parameters?.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.BLACK,
    children: <div>black</div>
  }
}`,...v.parameters?.docs?.source}}};const ne=["GreenLabel","BlueLabel","PinkLabel","BlueOutlineLabel","BlueStripedLabel","GreenOutlineLabel","GreenStripedLabel","LightBlueLabel","LightGreenLabel","LightGreenBlueLabel","LightBlueGreenLabel","BlackLabel"];export{v as BlackLabel,u as BlueLabel,p as BlueOutlineLabel,m as BlueStripedLabel,d as GreenLabel,E as GreenOutlineLabel,L as GreenStripedLabel,C as LightBlueGreenLabel,b as LightBlueLabel,P as LightGreenBlueLabel,h as LightGreenLabel,g as PinkLabel,ne as __namedExportsOrder,re as default};
