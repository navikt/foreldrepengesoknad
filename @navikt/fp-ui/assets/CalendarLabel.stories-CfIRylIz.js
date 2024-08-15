import{j as r}from"./jsx-runtime-Cw0GR0a5.js";import{P as e}from"./colors-BgDiWhW9.js";import"./dates-wsUZxpzE.js";import{H as C}from"./VStack-Bbo7VGXh.js";import{r as o}from"./index-CTjT7uj6.js";import{u as te}from"./useId-BFxX0aRd.js";import"./dayjs.min-0BeM2qWp.js";import"./useId-BGzI-o9Y.js";import"./BasePrimitive-P3OGu8QL.js";import"./useMergeRefs-Bb4JH14W.js";var se=function(l,t){var c={};for(var a in l)Object.prototype.hasOwnProperty.call(l,a)&&t.indexOf(a)<0&&(c[a]=l[a]);if(l!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,a=Object.getOwnPropertySymbols(l);i<a.length;i++)t.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(l,a[i])&&(c[a[i]]=l[a[i]]);return c};const oe=o.forwardRef((l,t)=>{var{title:c,titleId:a}=l,i=se(l,["title","titleId"]);let s=te();return s=c?a||"title-"+s:void 0,o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:t,"aria-labelledby":s},i),c?o.createElement("title",{id:s},c):null,o.createElement("path",{fill:"currentColor",fillRule:"evenodd",d:"M12 2.25a.75.75 0 0 1 .656.387l9.527 17.25A.75.75 0 0 1 21.526 21H2.474a.75.75 0 0 1-.657-1.113l9.526-17.25A.75.75 0 0 1 12 2.25M12 8.75a.75.75 0 0 1 .75.75v4a.75.75 0 0 1-1.5 0v-4a.75.75 0 0 1 .75-.75m-1 7.75a1 1 0 1 1 2 0 1 1 0 0 1-2 0",clipRule:"evenodd"}))});var de=function(l,t){var c={};for(var a in l)Object.prototype.hasOwnProperty.call(l,a)&&t.indexOf(a)<0&&(c[a]=l[a]);if(l!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,a=Object.getOwnPropertySymbols(l);i<a.length;i++)t.indexOf(a[i])<0&&Object.prototype.propertyIsEnumerable.call(l,a[i])&&(c[a[i]]=l[a[i]]);return c};const ue=o.forwardRef((l,t)=>{var{title:c,titleId:a}=l,i=de(l,["title","titleId"]);let s=te();return s=c?a||"title-"+s:void 0,o.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",width:"1em",height:"1em",fill:"none",viewBox:"0 0 24 24",focusable:!1,role:"img",ref:t,"aria-labelledby":s},i),c?o.createElement("title",{id:s},c):null,o.createElement("path",{fill:"currentColor",d:"M12 4.969c1.399-1.242 2.776-1.844 4.125-1.844 1.519 0 2.823.763 3.905 1.845 2.373 2.372 2.206 6.354-1 9.56l-6.5 6.5a.75.75 0 0 1-1.06 0l-6.5-6.5c-3.207-3.206-3.373-7.188-1-9.56C5.05 3.888 6.355 3.125 7.874 3.125c1.349 0 2.726.602 4.125 1.844"}))}),pe="_bluePanel_jc25d_1",ge="_greenPanel_jc25d_14",me="_greenOutlinePanel_jc25d_27",Ee="_blueOutlinePanel_jc25d_39",be="_pinkPanel_jc25d_51",Le="_grayPanel_jc25d_64",he="_margin_jc25d_77",ve="_greenStripedCircle_jc25d_81",Pe="_blueStripedCircle_jc25d_104",_e="_lightblueGreenCircle_jc25d_127",Ce="_lightgreenBlueCircle_jc25d_143",je="_blueOutlineCircle_jc25d_159",ye="_greenOutlineCircle_jc25d_168",Ge="_blackCircle_jc25d_177",Te="_greenCircle_jc25d_186",Ne="_blueCircle_jc25d_195",fe="_grayCircle_jc25d_204",n={bluePanel:pe,greenPanel:ge,greenOutlinePanel:me,blueOutlinePanel:Ee,pinkPanel:be,grayPanel:Le,margin:he,greenStripedCircle:ve,blueStripedCircle:Pe,lightblueGreenCircle:_e,lightgreenBlueCircle:Ce,blueOutlineCircle:je,greenOutlineCircle:ye,blackCircle:Ge,greenCircle:Te,blueCircle:Ne,grayCircle:fe},j=l=>{switch(l){case e.BLUE:return r.jsx("div",{className:n.blueCircle});case e.GREEN:return r.jsx("div",{className:n.greenCircle});case e.LIGHTBLUE:case e.BLUEOUTLINE:return r.jsx("div",{className:n.blueOutlineCircle});case e.GREENOUTLINE:case e.LIGHTGREEN:return r.jsx("div",{className:n.greenOutlineCircle});case e.BLACK:return r.jsx("div",{className:n.blackCircle});case e.LIGHTBLUEGREEN:return r.jsx("div",{className:n.lightblueGreenCircle});case e.LIGHTGREENBLUE:return r.jsx("div",{className:n.lightgreenBlueCircle});case e.BLUESTRIPED:return r.jsx("div",{className:n.blueStripedCircle});case e.GREENSTRIPED:return r.jsx("div",{className:n.greenStripedCircle});case e.GRAY:return r.jsx("div",{className:n.grayCircle});default:return null}},Re={[e.NONE]:n.none,[e.BLUE]:n.bluePanel,[e.LIGHTBLUE]:n.bluePanel,[e.BLUESTRIPED]:n.bluePanel,[e.LIGHTGREENBLUE]:n.bluePanel,[e.LIGHTBLUEGREEN]:n.greenPanel,[e.GREEN]:n.greenPanel,[e.LIGHTGREEN]:n.greenPanel,[e.GREENSTRIPED]:n.greenPanel,[e.GRAY]:n.grayPanel,[e.PINK]:n.pinkPanel,[e.BLACK]:n.grayPanel,[e.GREENOUTLINE]:n.greenOutlinePanel,[e.BLUEOUTLINE]:n.blueOutlinePanel},ce=({children:l,iconType:t})=>t===e.PINK?r.jsx("div",{className:n.pinkPanel,children:r.jsxs(C,{gap:"2",align:"center",children:[l,r.jsx(ue,{color:"#F68282","aria-hidden":!0})]})}):t===e.BLACK?r.jsx("div",{className:n.grayPanel,children:r.jsxs(C,{gap:"2",align:"center",children:[r.jsx(oe,{style:{color:"#FF9100"}}),l,r.jsx("div",{className:n.margin,children:j(t)})]})}):r.jsx("div",{className:`${Re[t]}`,children:r.jsxs(C,{gap:"2",align:"end",wrap:!1,children:[l,r.jsx("div",{className:n.margin,children:j(t)})]})});j.__docgenInfo={description:"",methods:[],displayName:"getSirkel"};ce.__docgenInfo={description:"",methods:[],displayName:"CalendarLabel",props:{children:{required:!0,tsType:{name:"union",raw:"React.ReactElement | React.ReactElement[]",elements:[{name:"ReactReactElement",raw:"React.ReactElement"},{name:"Array",elements:[{name:"ReactReactElement",raw:"React.ReactElement"}],raw:"React.ReactElement[]"}]},description:""},iconType:{required:!0,tsType:{name:"PeriodeColor"},description:""}}};const Ke={title:"CalendarLabel",component:ce},d={args:{iconType:e.GREEN,children:r.jsx("div",{children:"green"})}},u={args:{iconType:e.BLUE,children:r.jsx("div",{children:"blue"})}},p={args:{iconType:e.PINK,children:r.jsx("div",{children:"pink"})}},g={args:{iconType:e.BLUEOUTLINE,children:r.jsx("div",{children:"blue outline"})}},m={args:{iconType:e.BLUESTRIPED,children:r.jsx("div",{children:"blue striped"})}},E={args:{iconType:e.GREENOUTLINE,children:r.jsx("div",{children:"green outline"})}},b={args:{iconType:e.GREENSTRIPED,children:r.jsx("div",{children:"green striped"})}},L={args:{iconType:e.LIGHTBLUE,children:r.jsx("div",{children:"light blue"})}},h={args:{iconType:e.LIGHTGREEN,children:r.jsx("div",{children:"light green"})}},v={args:{iconType:e.LIGHTGREENBLUE,children:r.jsx("div",{children:"light green blue"})}},P={args:{iconType:e.LIGHTBLUEGREEN,children:r.jsx("div",{children:"light blue green"})}},_={args:{iconType:e.BLACK,children:r.jsx("div",{children:"black"})}};var y,G,T;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.GREEN,
    children: <div>green</div>
  }
}`,...(T=(G=d.parameters)==null?void 0:G.docs)==null?void 0:T.source}}};var N,f,R;u.parameters={...u.parameters,docs:{...(N=u.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.BLUE,
    children: <div>blue</div>
  }
}`,...(R=(f=u.parameters)==null?void 0:f.docs)==null?void 0:R.source}}};var O,B,I;p.parameters={...p.parameters,docs:{...(O=p.parameters)==null?void 0:O.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.PINK,
    children: <div>pink</div>
  }
}`,...(I=(B=p.parameters)==null?void 0:B.docs)==null?void 0:I.source}}};var x,S,U;g.parameters={...g.parameters,docs:{...(x=g.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.BLUEOUTLINE,
    children: <div>blue outline</div>
  }
}`,...(U=(S=g.parameters)==null?void 0:S.docs)==null?void 0:U.source}}};var w,k,H;m.parameters={...m.parameters,docs:{...(w=m.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.BLUESTRIPED,
    children: <div>blue striped</div>
  }
}`,...(H=(k=m.parameters)==null?void 0:k.docs)==null?void 0:H.source}}};var A,K,D;E.parameters={...E.parameters,docs:{...(A=E.parameters)==null?void 0:A.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.GREENOUTLINE,
    children: <div>green outline</div>
  }
}`,...(D=(K=E.parameters)==null?void 0:K.docs)==null?void 0:D.source}}};var F,M,Y;b.parameters={...b.parameters,docs:{...(F=b.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.GREENSTRIPED,
    children: <div>green striped</div>
  }
}`,...(Y=(M=b.parameters)==null?void 0:M.docs)==null?void 0:Y.source}}};var q,$,z;L.parameters={...L.parameters,docs:{...(q=L.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.LIGHTBLUE,
    children: <div>light blue</div>
  }
}`,...(z=($=L.parameters)==null?void 0:$.docs)==null?void 0:z.source}}};var J,Q,V;h.parameters={...h.parameters,docs:{...(J=h.parameters)==null?void 0:J.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.LIGHTGREEN,
    children: <div>light green</div>
  }
}`,...(V=(Q=h.parameters)==null?void 0:Q.docs)==null?void 0:V.source}}};var W,X,Z;v.parameters={...v.parameters,docs:{...(W=v.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.LIGHTGREENBLUE,
    children: <div>light green blue</div>
  }
}`,...(Z=(X=v.parameters)==null?void 0:X.docs)==null?void 0:Z.source}}};var ee,re,ne;P.parameters={...P.parameters,docs:{...(ee=P.parameters)==null?void 0:ee.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.LIGHTBLUEGREEN,
    children: <div>light blue green</div>
  }
}`,...(ne=(re=P.parameters)==null?void 0:re.docs)==null?void 0:ne.source}}};var le,ae,ie;_.parameters={..._.parameters,docs:{...(le=_.parameters)==null?void 0:le.docs,source:{originalSource:`{
  args: {
    iconType: PeriodeColor.BLACK,
    children: <div>black</div>
  }
}`,...(ie=(ae=_.parameters)==null?void 0:ae.docs)==null?void 0:ie.source}}};const De=["GreenLabel","BlueLabel","PinkLabel","BlueOutlineLabel","BlueStripedLabel","GreenOutlineLabel","GreenStripedLabel","LightBlueLabel","LightGreenLabel","LightGreenBlueLabel","LightBlueGreenLabel","BlackLabel"];export{_ as BlackLabel,u as BlueLabel,g as BlueOutlineLabel,m as BlueStripedLabel,d as GreenLabel,E as GreenOutlineLabel,b as GreenStripedLabel,P as LightBlueGreenLabel,L as LightBlueLabel,v as LightGreenBlueLabel,h as LightGreenLabel,p as PinkLabel,De as __namedExportsOrder,Ke as default};
