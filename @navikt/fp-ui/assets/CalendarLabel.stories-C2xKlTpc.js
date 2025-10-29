import{r as N,R as v,j as r}from"./iframe-DwyiaYYW.js";import{P as e}from"./colors-DoU1ogH6.js";import"./dates-CXYg3sJu.js";import{H as _}from"./VStack-mjILHuv9.js";import{u as R}from"./useId-e8qw_mGp.js";import{S as B}from"./ExclamationmarkTriangleFill-D1MtaTzN.js";import"./preload-helper-D9Z9MdNV.js";import"./useId-4xv-Eph9.js";import"./BasePrimitive-iUSbmr8L.js";var y=function(a,i){var s={};for(var l in a)Object.prototype.hasOwnProperty.call(a,l)&&i.indexOf(l)<0&&(s[l]=a[l]);if(a!=null&&typeof Object.getOwnPropertySymbols=="function")for(var c=0,l=Object.getOwnPropertySymbols(a);c<l.length;c++)i.indexOf(l[c])<0&&Object.prototype.propertyIsEnumerable.call(a,l[c])&&(s[l[c]]=a[l[c]]);return s};const x=N.forwardRef((a,i)=>{var{title:s,titleId:l}=a,c=y(a,["title","titleId"]);let t=R();return t=s?l||"title-"+t:void 0,v.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:i,"aria-labelledby":t},c),s?v.createElement("title",{id:t},s):null,v.createElement("path",{fill:"currentColor",d:"M12 4.969c1.399-1.242 2.776-1.844 4.125-1.844 1.519 0 2.823.763 3.905 1.845 2.373 2.372 2.206 6.354-1 9.56l-6.5 6.5a.75.75 0 0 1-1.06 0l-6.5-6.5c-3.207-3.206-3.373-7.188-1-9.56C5.05 3.888 6.355 3.125 7.874 3.125c1.349 0 2.726.602 4.125 1.844"}))}),I="_bluePanel_1mhap_1",j="_greenPanel_1mhap_14",O="_greenOutlinePanel_1mhap_27",S="_blueOutlinePanel_1mhap_39",U="_pinkPanel_1mhap_51",f="_grayPanel_1mhap_64",k="_margin_1mhap_77",H="_greenStripedCircle_1mhap_81",w="_blueStripedCircle_1mhap_104",A="_lightblueGreenCircle_1mhap_127",K="_lightgreenBlueCircle_1mhap_143",D="_blueOutlineCircle_1mhap_159",Y="_greenOutlineCircle_1mhap_168",q="_blackCircle_1mhap_177",F="_greenCircle_1mhap_186",M="_blueCircle_1mhap_195",$="_grayCircle_1mhap_204",n={bluePanel:I,greenPanel:j,greenOutlinePanel:O,blueOutlinePanel:S,pinkPanel:U,grayPanel:f,margin:k,greenStripedCircle:H,blueStripedCircle:w,lightblueGreenCircle:A,lightgreenBlueCircle:K,blueOutlineCircle:D,greenOutlineCircle:Y,blackCircle:q,greenCircle:F,blueCircle:M,grayCircle:$},G=a=>{switch(a){case e.BLUE:return r.jsx("div",{className:n.blueCircle});case e.GREEN:return r.jsx("div",{className:n.greenCircle});case e.LIGHTBLUE:case e.BLUEOUTLINE:return r.jsx("div",{className:n.blueOutlineCircle});case e.GREENOUTLINE:case e.LIGHTGREEN:return r.jsx("div",{className:n.greenOutlineCircle});case e.BLACK:return r.jsx("div",{className:n.blackCircle});case e.LIGHTBLUEGREEN:return r.jsx("div",{className:n.lightblueGreenCircle});case e.LIGHTGREENBLUE:return r.jsx("div",{className:n.lightgreenBlueCircle});case e.BLUESTRIPED:return r.jsx("div",{className:n.blueStripedCircle});case e.GREENSTRIPED:return r.jsx("div",{className:n.greenStripedCircle});case e.GRAY:return r.jsx("div",{className:n.grayCircle});case e.PURPLE:return r.jsx("div",{className:n.purpleCircle});default:return null}},z={[e.NONE]:n.none,[e.BLUE]:n.bluePanel,[e.LIGHTBLUE]:n.bluePanel,[e.BLUESTRIPED]:n.bluePanel,[e.LIGHTGREENBLUE]:n.bluePanel,[e.LIGHTBLUEGREEN]:n.greenPanel,[e.GREEN]:n.greenPanel,[e.LIGHTGREEN]:n.greenPanel,[e.GREENSTRIPED]:n.greenPanel,[e.GRAY]:n.grayPanel,[e.PINK]:n.pinkPanel,[e.PURPLE]:n.purlpePanel,[e.BLACK]:n.grayPanel,[e.GREENOUTLINE]:n.greenOutlinePanel,[e.BLUEOUTLINE]:n.blueOutlinePanel},T=({children:a,iconType:i})=>i===e.PINK?r.jsx("div",{className:n.pinkPanel,children:r.jsxs(_,{gap:"space-8",align:"center",children:[a,r.jsx(x,{color:"var(--ax-danger-500)","aria-hidden":!0})]})}):i===e.BLACK?r.jsx("div",{className:n.grayPanel,children:r.jsxs(_,{gap:"space-8",align:"center",children:[r.jsx(B,{style:{color:"var(--ax-bg-warning-strong)"}}),a,r.jsx("div",{className:n.margin,children:G(i)})]})}):r.jsx("div",{className:`${z[i]}`,children:r.jsxs(_,{gap:"space-8",align:"end",wrap:!1,children:[a,r.jsx("div",{className:n.margin,children:G(i)})]})});T.__docgenInfo={description:"",methods:[],displayName:"CalendarLabel",props:{children:{required:!0,tsType:{name:"union",raw:"React.ReactElement | React.ReactElement[]",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"Array",elements:[{name:"ReactReactElement",raw:"React.ReactElement"}],raw:"React.ReactElement[]"}]},description:""},iconType:{required:!0,tsType:{name:"PeriodeColor"},description:""}}};const ae={title:"CalendarLabel",component:T},o={args:{iconType:e.GREEN,children:r.jsx("div",{children:"green"})}},d={args:{iconType:e.BLUE,children:r.jsx("div",{children:"blue"})}},u={args:{iconType:e.PINK,children:r.jsx("div",{children:"pink"})}},p={args:{iconType:e.BLUEOUTLINE,children:r.jsx("div",{children:"blue outline"})}},g={args:{iconType:e.BLUESTRIPED,children:r.jsx("div",{children:"blue striped"})}},m={args:{iconType:e.GREENOUTLINE,children:r.jsx("div",{children:"green outline"})}},E={args:{iconType:e.GREENSTRIPED,children:r.jsx("div",{children:"green striped"})}},h={args:{iconType:e.LIGHTBLUE,children:r.jsx("div",{children:"light blue"})}},L={args:{iconType:e.LIGHTGREEN,children:r.jsx("div",{children:"light green"})}},b={args:{iconType:e.LIGHTGREENBLUE,children:r.jsx("div",{children:"light green blue"})}},P={args:{iconType:e.LIGHTBLUEGREEN,children:r.jsx("div",{children:"light blue green"})}},C={args:{iconType:e.BLACK,children:r.jsx("div",{children:"black"})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.GREEN,
    children: <div>green</div>
  }
}`,...o.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.BLUE,
    children: <div>blue</div>
  }
}`,...d.parameters?.docs?.source}}};u.parameters={...u.parameters,docs:{...u.parameters?.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.PINK,
    children: <div>pink</div>
  }
}`,...u.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.BLUEOUTLINE,
    children: <div>blue outline</div>
  }
}`,...p.parameters?.docs?.source}}};g.parameters={...g.parameters,docs:{...g.parameters?.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.BLUESTRIPED,
    children: <div>blue striped</div>
  }
}`,...g.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.GREENOUTLINE,
    children: <div>green outline</div>
  }
}`,...m.parameters?.docs?.source}}};E.parameters={...E.parameters,docs:{...E.parameters?.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.GREENSTRIPED,
    children: <div>green striped</div>
  }
}`,...E.parameters?.docs?.source}}};h.parameters={...h.parameters,docs:{...h.parameters?.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.LIGHTBLUE,
    children: <div>light blue</div>
  }
}`,...h.parameters?.docs?.source}}};L.parameters={...L.parameters,docs:{...L.parameters?.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.LIGHTGREEN,
    children: <div>light green</div>
  }
}`,...L.parameters?.docs?.source}}};b.parameters={...b.parameters,docs:{...b.parameters?.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.LIGHTGREENBLUE,
    children: <div>light green blue</div>
  }
}`,...b.parameters?.docs?.source}}};P.parameters={...P.parameters,docs:{...P.parameters?.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.LIGHTBLUEGREEN,
    children: <div>light blue green</div>
  }
}`,...P.parameters?.docs?.source}}};C.parameters={...C.parameters,docs:{...C.parameters?.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.BLACK,
    children: <div>black</div>
  }
}`,...C.parameters?.docs?.source}}};const le=["GreenLabel","BlueLabel","PinkLabel","BlueOutlineLabel","BlueStripedLabel","GreenOutlineLabel","GreenStripedLabel","LightBlueLabel","LightGreenLabel","LightGreenBlueLabel","LightBlueGreenLabel","BlackLabel"];export{C as BlackLabel,d as BlueLabel,p as BlueOutlineLabel,g as BlueStripedLabel,o as GreenLabel,m as GreenOutlineLabel,E as GreenStripedLabel,P as LightBlueGreenLabel,h as LightBlueLabel,b as LightGreenBlueLabel,L as LightGreenLabel,u as PinkLabel,le as __namedExportsOrder,ae as default};
