import{j as r}from"./jsx-runtime-CLpGMVip.js";import{P as e}from"./colors-jfTJ4KPK.js";import"./dates-l9FtPD11.js";import{H as v}from"./VStack-YChUZxvS.js";import{r as o}from"./index-CZMpeKRu.js";import{u as se}from"./useId-BOzDck44.js";import{S as te}from"./ExclamationmarkTriangleFill-DvtTyrsm.js";import"./dayjs.min-Cu1bdzaI.js";import"./useId-Dd4CLFiT.js";import"./BasePrimitive-CCNoOCf8.js";import"./create-context-Cu5JotWs.js";var oe=function(l,i){var s={};for(var a in l)Object.prototype.hasOwnProperty.call(l,a)&&i.indexOf(a)<0&&(s[a]=l[a]);if(l!=null&&typeof Object.getOwnPropertySymbols=="function")for(var c=0,a=Object.getOwnPropertySymbols(l);c<a.length;c++)i.indexOf(a[c])<0&&Object.prototype.propertyIsEnumerable.call(l,a[c])&&(s[a[c]]=l[a[c]]);return s};const de=o.forwardRef((l,i)=>{var{title:s,titleId:a}=l,c=oe(l,["title","titleId"]);let t=se();return t=s?a||"title-"+t:void 0,o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:i,"aria-labelledby":t},c),s?o.createElement("title",{id:t},s):null,o.createElement("path",{fill:"currentColor",d:"M12 4.969c1.399-1.242 2.776-1.844 4.125-1.844 1.519 0 2.823.763 3.905 1.845 2.373 2.372 2.206 6.354-1 9.56l-6.5 6.5a.75.75 0 0 1-1.06 0l-6.5-6.5c-3.207-3.206-3.373-7.188-1-9.56C5.05 3.888 6.355 3.125 7.874 3.125c1.349 0 2.726.602 4.125 1.844"}))}),ue="_bluePanel_hk624_1",pe="_greenPanel_hk624_14",ge="_greenOutlinePanel_hk624_27",me="_blueOutlinePanel_hk624_39",Ee="_pinkPanel_hk624_51",Le="_grayPanel_hk624_64",he="_yellowPanel_hk624_77",be="_margin_hk624_90",Pe="_greenStripedCircle_hk624_94",Ce="_blueStripedCircle_hk624_117",_e="_lightblueGreenCircle_hk624_140",ve="_lightgreenBlueCircle_hk624_156",Ge="_blueOutlineCircle_hk624_172",Te="_greenOutlineCircle_hk624_181",Ne="_blackCircle_hk624_190",ye="_greenCircle_hk624_199",Re="_blueCircle_hk624_208",Be="_grayCircle_hk624_217",n={bluePanel:ue,greenPanel:pe,greenOutlinePanel:ge,blueOutlinePanel:me,pinkPanel:Ee,grayPanel:Le,yellowPanel:he,margin:be,greenStripedCircle:Pe,blueStripedCircle:Ce,lightblueGreenCircle:_e,lightgreenBlueCircle:ve,blueOutlineCircle:Ge,greenOutlineCircle:Te,blackCircle:Ne,greenCircle:ye,blueCircle:Re,grayCircle:Be},G=l=>{switch(l){case e.BLUE:return r.jsx("div",{className:n.blueCircle});case e.GREEN:return r.jsx("div",{className:n.greenCircle});case e.LIGHTBLUE:case e.BLUEOUTLINE:return r.jsx("div",{className:n.blueOutlineCircle});case e.GREENOUTLINE:case e.LIGHTGREEN:return r.jsx("div",{className:n.greenOutlineCircle});case e.BLACK:return r.jsx("div",{className:n.blackCircle});case e.LIGHTBLUEGREEN:return r.jsx("div",{className:n.lightblueGreenCircle});case e.LIGHTGREENBLUE:return r.jsx("div",{className:n.lightgreenBlueCircle});case e.BLUESTRIPED:return r.jsx("div",{className:n.blueStripedCircle});case e.GREENSTRIPED:return r.jsx("div",{className:n.greenStripedCircle});case e.GRAY:return r.jsx("div",{className:n.grayCircle});case e.PURPLE:return r.jsx("div",{className:n.purpleCircle});case e.LIGHTYELLOW:return r.jsx("div",{className:n.lightYellow});default:return null}},Ie={[e.NONE]:n.none,[e.BLUE]:n.bluePanel,[e.LIGHTBLUE]:n.bluePanel,[e.BLUESTRIPED]:n.bluePanel,[e.LIGHTGREENBLUE]:n.bluePanel,[e.LIGHTBLUEGREEN]:n.greenPanel,[e.GREEN]:n.greenPanel,[e.LIGHTGREEN]:n.greenPanel,[e.GREENSTRIPED]:n.greenPanel,[e.GRAY]:n.grayPanel,[e.PINK]:n.pinkPanel,[e.PURPLE]:n.purlpePanel,[e.BLACK]:n.grayPanel,[e.GREENOUTLINE]:n.greenOutlinePanel,[e.BLUEOUTLINE]:n.blueOutlinePanel,[e.LIGHTYELLOW]:n.yellowOutlinePanel},ce=({children:l,iconType:i})=>i===e.PINK?r.jsx("div",{className:n.pinkPanel,children:r.jsxs(v,{gap:"2",align:"center",children:[l,r.jsx(de,{color:"#F68282","aria-hidden":!0})]})}):i===e.BLACK?r.jsx("div",{className:n.grayPanel,children:r.jsxs(v,{gap:"2",align:"center",children:[r.jsx(te,{style:{color:"#FF9100"}}),l,r.jsx("div",{className:n.margin,children:G(i)})]})}):r.jsx("div",{className:`${Ie[i]}`,children:r.jsxs(v,{gap:"2",align:"end",wrap:!1,children:[l,r.jsx("div",{className:n.margin,children:G(i)})]})});G.__docgenInfo={description:"",methods:[],displayName:"getSirkel"};ce.__docgenInfo={description:"",methods:[],displayName:"CalendarLabel",props:{children:{required:!0,tsType:{name:"union",raw:"React.ReactElement | React.ReactElement[]",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"Array",elements:[{name:"ReactReactElement",raw:"React.ReactElement"}],raw:"React.ReactElement[]"}]},description:""},iconType:{required:!0,tsType:{name:"PeriodeColor"},description:""}}};const De={title:"CalendarLabel",component:ce},d={args:{iconType:e.GREEN,children:r.jsx("div",{children:"green"})}},u={args:{iconType:e.BLUE,children:r.jsx("div",{children:"blue"})}},p={args:{iconType:e.PINK,children:r.jsx("div",{children:"pink"})}},g={args:{iconType:e.BLUEOUTLINE,children:r.jsx("div",{children:"blue outline"})}},m={args:{iconType:e.BLUESTRIPED,children:r.jsx("div",{children:"blue striped"})}},E={args:{iconType:e.GREENOUTLINE,children:r.jsx("div",{children:"green outline"})}},L={args:{iconType:e.GREENSTRIPED,children:r.jsx("div",{children:"green striped"})}},h={args:{iconType:e.LIGHTBLUE,children:r.jsx("div",{children:"light blue"})}},b={args:{iconType:e.LIGHTGREEN,children:r.jsx("div",{children:"light green"})}},P={args:{iconType:e.LIGHTGREENBLUE,children:r.jsx("div",{children:"light green blue"})}},C={args:{iconType:e.LIGHTBLUEGREEN,children:r.jsx("div",{children:"light blue green"})}},_={args:{iconType:e.BLACK,children:r.jsx("div",{children:"black"})}};var T,N,y;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.GREEN,
    children: <div>green</div>
  }
}`,...(y=(N=d.parameters)==null?void 0:N.docs)==null?void 0:y.source}}};var R,B,I;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.BLUE,
    children: <div>blue</div>
  }
}`,...(I=(B=u.parameters)==null?void 0:B.docs)==null?void 0:I.source}}};var x,O,j;p.parameters={...p.parameters,docs:{...(x=p.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.PINK,
    children: <div>pink</div>
  }
}`,...(j=(O=p.parameters)==null?void 0:O.docs)==null?void 0:j.source}}};var S,k,U;g.parameters={...g.parameters,docs:{...(S=g.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.BLUEOUTLINE,
    children: <div>blue outline</div>
  }
}`,...(U=(k=g.parameters)==null?void 0:k.docs)==null?void 0:U.source}}};var f,w,H;m.parameters={...m.parameters,docs:{...(f=m.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.BLUESTRIPED,
    children: <div>blue striped</div>
  }
}`,...(H=(w=m.parameters)==null?void 0:w.docs)==null?void 0:H.source}}};var A,K,D;E.parameters={...E.parameters,docs:{...(A=E.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.GREENOUTLINE,
    children: <div>green outline</div>
  }
}`,...(D=(K=E.parameters)==null?void 0:K.docs)==null?void 0:D.source}}};var Y,F,q;L.parameters={...L.parameters,docs:{...(Y=L.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.GREENSTRIPED,
    children: <div>green striped</div>
  }
}`,...(q=(F=L.parameters)==null?void 0:F.docs)==null?void 0:q.source}}};var W,M,$;h.parameters={...h.parameters,docs:{...(W=h.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.LIGHTBLUE,
    children: <div>light blue</div>
  }
}`,...($=(M=h.parameters)==null?void 0:M.docs)==null?void 0:$.source}}};var z,J,Q;b.parameters={...b.parameters,docs:{...(z=b.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.LIGHTGREEN,
    children: <div>light green</div>
  }
}`,...(Q=(J=b.parameters)==null?void 0:J.docs)==null?void 0:Q.source}}};var V,X,Z;P.parameters={...P.parameters,docs:{...(V=P.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.LIGHTGREENBLUE,
    children: <div>light green blue</div>
  }
}`,...(Z=(X=P.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var ee,re,ne;C.parameters={...C.parameters,docs:{...(ee=C.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.LIGHTBLUEGREEN,
    children: <div>light blue green</div>
  }
}`,...(ne=(re=C.parameters)==null?void 0:re.docs)==null?void 0:ne.source}}};var le,ae,ie;_.parameters={..._.parameters,docs:{...(le=_.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.BLACK,
    children: <div>black</div>
  }
}`,...(ie=(ae=_.parameters)==null?void 0:ae.docs)==null?void 0:ie.source}}};const Ye=["GreenLabel","BlueLabel","PinkLabel","BlueOutlineLabel","BlueStripedLabel","GreenOutlineLabel","GreenStripedLabel","LightBlueLabel","LightGreenLabel","LightGreenBlueLabel","LightBlueGreenLabel","BlackLabel"];export{_ as BlackLabel,u as BlueLabel,g as BlueOutlineLabel,m as BlueStripedLabel,d as GreenLabel,E as GreenOutlineLabel,L as GreenStripedLabel,C as LightBlueGreenLabel,h as LightBlueLabel,P as LightGreenBlueLabel,b as LightGreenLabel,p as PinkLabel,Ye as __namedExportsOrder,De as default};
