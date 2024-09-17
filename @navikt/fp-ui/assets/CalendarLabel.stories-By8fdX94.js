import{j as r}from"./jsx-runtime-Cw0GR0a5.js";import{P as e}from"./colors-BgDiWhW9.js";import"./dates-wsUZxpzE.js";import{H as v}from"./VStack-zuVnKrSn.js";import{r as o}from"./index-CTjT7uj6.js";import{u as se}from"./useId-BFxX0aRd.js";import{S as te}from"./ExclamationmarkTriangleFill-wzQeSKqj.js";import"./dayjs.min-0BeM2qWp.js";import"./useId-BGzI-o9Y.js";import"./BasePrimitive-BIOAorSf.js";import"./useMergeRefs-Bb4JH14W.js";var oe=function(l,i){var s={};for(var a in l)Object.prototype.hasOwnProperty.call(l,a)&&i.indexOf(a)<0&&(s[a]=l[a]);if(l!=null&&typeof Object.getOwnPropertySymbols=="function")for(var c=0,a=Object.getOwnPropertySymbols(l);c<a.length;c++)i.indexOf(a[c])<0&&Object.prototype.propertyIsEnumerable.call(l,a[c])&&(s[a[c]]=l[a[c]]);return s};const de=o.forwardRef((l,i)=>{var{title:s,titleId:a}=l,c=oe(l,["title","titleId"]);let t=se();return t=s?a||"title-"+t:void 0,o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:i,"aria-labelledby":t},c),s?o.createElement("title",{id:t},s):null,o.createElement("path",{fill:"currentColor",d:"M12 4.969c1.399-1.242 2.776-1.844 4.125-1.844 1.519 0 2.823.763 3.905 1.845 2.373 2.372 2.206 6.354-1 9.56l-6.5 6.5a.75.75 0 0 1-1.06 0l-6.5-6.5c-3.207-3.206-3.373-7.188-1-9.56C5.05 3.888 6.355 3.125 7.874 3.125c1.349 0 2.726.602 4.125 1.844"}))}),ue="_bluePanel_jc25d_1",ge="_greenPanel_jc25d_14",pe="_greenOutlinePanel_jc25d_27",me="_blueOutlinePanel_jc25d_39",Ee="_pinkPanel_jc25d_51",Le="_grayPanel_jc25d_64",be="_margin_jc25d_77",he="_greenStripedCircle_jc25d_81",Pe="_blueStripedCircle_jc25d_104",Ce="_lightblueGreenCircle_jc25d_127",_e="_lightgreenBlueCircle_jc25d_143",ve="_blueOutlineCircle_jc25d_159",Ge="_greenOutlineCircle_jc25d_168",Te="_blackCircle_jc25d_177",je="_greenCircle_jc25d_186",Ne="_blueCircle_jc25d_195",Re="_grayCircle_jc25d_204",n={bluePanel:ue,greenPanel:ge,greenOutlinePanel:pe,blueOutlinePanel:me,pinkPanel:Ee,grayPanel:Le,margin:be,greenStripedCircle:he,blueStripedCircle:Pe,lightblueGreenCircle:Ce,lightgreenBlueCircle:_e,blueOutlineCircle:ve,greenOutlineCircle:Ge,blackCircle:Te,greenCircle:je,blueCircle:Ne,grayCircle:Re},G=l=>{switch(l){case e.BLUE:return r.jsx("div",{className:n.blueCircle});case e.GREEN:return r.jsx("div",{className:n.greenCircle});case e.LIGHTBLUE:case e.BLUEOUTLINE:return r.jsx("div",{className:n.blueOutlineCircle});case e.GREENOUTLINE:case e.LIGHTGREEN:return r.jsx("div",{className:n.greenOutlineCircle});case e.BLACK:return r.jsx("div",{className:n.blackCircle});case e.LIGHTBLUEGREEN:return r.jsx("div",{className:n.lightblueGreenCircle});case e.LIGHTGREENBLUE:return r.jsx("div",{className:n.lightgreenBlueCircle});case e.BLUESTRIPED:return r.jsx("div",{className:n.blueStripedCircle});case e.GREENSTRIPED:return r.jsx("div",{className:n.greenStripedCircle});case e.GRAY:return r.jsx("div",{className:n.grayCircle});default:return null}},ye={[e.NONE]:n.none,[e.BLUE]:n.bluePanel,[e.LIGHTBLUE]:n.bluePanel,[e.BLUESTRIPED]:n.bluePanel,[e.LIGHTGREENBLUE]:n.bluePanel,[e.LIGHTBLUEGREEN]:n.greenPanel,[e.GREEN]:n.greenPanel,[e.LIGHTGREEN]:n.greenPanel,[e.GREENSTRIPED]:n.greenPanel,[e.GRAY]:n.grayPanel,[e.PINK]:n.pinkPanel,[e.BLACK]:n.grayPanel,[e.GREENOUTLINE]:n.greenOutlinePanel,[e.BLUEOUTLINE]:n.blueOutlinePanel},ce=({children:l,iconType:i})=>i===e.PINK?r.jsx("div",{className:n.pinkPanel,children:r.jsxs(v,{gap:"2",align:"center",children:[l,r.jsx(de,{color:"#F68282","aria-hidden":!0})]})}):i===e.BLACK?r.jsx("div",{className:n.grayPanel,children:r.jsxs(v,{gap:"2",align:"center",children:[r.jsx(te,{style:{color:"#FF9100"}}),l,r.jsx("div",{className:n.margin,children:G(i)})]})}):r.jsx("div",{className:`${ye[i]}`,children:r.jsxs(v,{gap:"2",align:"end",wrap:!1,children:[l,r.jsx("div",{className:n.margin,children:G(i)})]})});G.__docgenInfo={description:"",methods:[],displayName:"getSirkel"};ce.__docgenInfo={description:"",methods:[],displayName:"CalendarLabel",props:{children:{required:!0,tsType:{name:"union",raw:"React.ReactElement | React.ReactElement[]",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"Array",elements:[{name:"ReactReactElement",raw:"React.ReactElement"}],raw:"React.ReactElement[]"}]},description:""},iconType:{required:!0,tsType:{name:"PeriodeColor"},description:""}}};const Ke={title:"CalendarLabel",component:ce},d={args:{iconType:e.GREEN,children:r.jsx("div",{children:"green"})}},u={args:{iconType:e.BLUE,children:r.jsx("div",{children:"blue"})}},g={args:{iconType:e.PINK,children:r.jsx("div",{children:"pink"})}},p={args:{iconType:e.BLUEOUTLINE,children:r.jsx("div",{children:"blue outline"})}},m={args:{iconType:e.BLUESTRIPED,children:r.jsx("div",{children:"blue striped"})}},E={args:{iconType:e.GREENOUTLINE,children:r.jsx("div",{children:"green outline"})}},L={args:{iconType:e.GREENSTRIPED,children:r.jsx("div",{children:"green striped"})}},b={args:{iconType:e.LIGHTBLUE,children:r.jsx("div",{children:"light blue"})}},h={args:{iconType:e.LIGHTGREEN,children:r.jsx("div",{children:"light green"})}},P={args:{iconType:e.LIGHTGREENBLUE,children:r.jsx("div",{children:"light green blue"})}},C={args:{iconType:e.LIGHTBLUEGREEN,children:r.jsx("div",{children:"light blue green"})}},_={args:{iconType:e.BLACK,children:r.jsx("div",{children:"black"})}};var T,j,N;d.parameters={...d.parameters,docs:{...(T=d.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.GREEN,
    children: <div>green</div>
  }
}`,...(N=(j=d.parameters)==null?void 0:j.docs)==null?void 0:N.source}}};var R,y,B;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.BLUE,
    children: <div>blue</div>
  }
}`,...(B=(y=u.parameters)==null?void 0:y.docs)==null?void 0:B.source}}};var I,x,S;g.parameters={...g.parameters,docs:{...(I=g.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.PINK,
    children: <div>pink</div>
  }
}`,...(S=(x=g.parameters)==null?void 0:x.docs)==null?void 0:S.source}}};var O,f,U;p.parameters={...p.parameters,docs:{...(O=p.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.BLUEOUTLINE,
    children: <div>blue outline</div>
  }
}`,...(U=(f=p.parameters)==null?void 0:f.docs)==null?void 0:U.source}}};var k,H,w;m.parameters={...m.parameters,docs:{...(k=m.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.BLUESTRIPED,
    children: <div>blue striped</div>
  }
}`,...(w=(H=m.parameters)==null?void 0:H.docs)==null?void 0:w.source}}};var A,K,D;E.parameters={...E.parameters,docs:{...(A=E.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.GREENOUTLINE,
    children: <div>green outline</div>
  }
}`,...(D=(K=E.parameters)==null?void 0:K.docs)==null?void 0:D.source}}};var F,Y,q;L.parameters={...L.parameters,docs:{...(F=L.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.GREENSTRIPED,
    children: <div>green striped</div>
  }
}`,...(q=(Y=L.parameters)==null?void 0:Y.docs)==null?void 0:q.source}}};var M,$,z;b.parameters={...b.parameters,docs:{...(M=b.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.LIGHTBLUE,
    children: <div>light blue</div>
  }
}`,...(z=($=b.parameters)==null?void 0:$.docs)==null?void 0:z.source}}};var J,Q,V;h.parameters={...h.parameters,docs:{...(J=h.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.LIGHTGREEN,
    children: <div>light green</div>
  }
}`,...(V=(Q=h.parameters)==null?void 0:Q.docs)==null?void 0:V.source}}};var W,X,Z;P.parameters={...P.parameters,docs:{...(W=P.parameters)==null?void 0:W.docs,source:{originalSource:`{
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
}`,...(ie=(ae=_.parameters)==null?void 0:ae.docs)==null?void 0:ie.source}}};const De=["GreenLabel","BlueLabel","PinkLabel","BlueOutlineLabel","BlueStripedLabel","GreenOutlineLabel","GreenStripedLabel","LightBlueLabel","LightGreenLabel","LightGreenBlueLabel","LightBlueGreenLabel","BlackLabel"];export{_ as BlackLabel,u as BlueLabel,p as BlueOutlineLabel,m as BlueStripedLabel,d as GreenLabel,E as GreenOutlineLabel,L as GreenStripedLabel,C as LightBlueGreenLabel,b as LightBlueLabel,P as LightGreenBlueLabel,h as LightGreenLabel,g as PinkLabel,De as __namedExportsOrder,Ke as default};
