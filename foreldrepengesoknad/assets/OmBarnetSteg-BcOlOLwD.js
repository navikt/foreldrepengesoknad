import{j as e}from"./jsx-runtime-DoxjgJx5.js";import{d as i,a0 as _,a1 as A,u as x,R as p,a2 as oe,a3 as q,a4 as de,a5 as ie,a6 as le,b as me,a7 as fe,N as P,y as ge,S as ue}from"./Tidsperioden-C8HcA-rk.js";import{r as R}from"./index-Cu9bd8lq.js";import{D as j,a as F,d as pe,R as M,S as V,u as ce,F as Be,E as je,c as ve}from"./ErrorSummaryHookForm-DaBY2tD2.js";import"./index-C-6Uy6j4.js";import{i as u,Z as v,a7 as L,a8 as he,J as T,V as C,a9 as xe,f as H,h as I,X as ke,Y as ye,B,n as Me}from"./dateFormValidation-A9ng-RC0.js";import"./_baseToString-yTMKM5a7.js";import"./_createSet-BNfKGSGn.js";import{u as Fe,a as Te}from"./useFpNavigator-CnrN-bhH.js";import{u as w,C as D,a as Se}from"./FpDataContext-CjNulmBK.js";import{b as be,c as De}from"./velkommenUtils-OwMlSU50.js";import{d as N,k as Ae,e as Ie}from"./barnUtils-DSjWg_x2.js";import{a as Ee}from"./dateUtils-BR3fTdjz.js";import{R as U}from"./RegistrertePersonalia-BT_B-j_x.js";import{V as h,B as Oe,H as qe,A as we}from"./Step-DMjU3ety.js";import{b as Ne,a as Ue,H as _e,B as Pe}from"./Link-BqZ6CohM.js";import{F as f}from"./message-BTv7u0RP.js";import{F as Re}from"./File-BTi-FAPa.js";i.extend(_);i.extend(A);const K=({valgteRegistrerteBarn:a,skalInkludereTermindato:t})=>{const r=x(),n=a.every(s=>!s.dødsdato),l=[...a].sort(be),o=l.map(s=>s.fødselsdato),d=l[0].fødselsdato;return e.jsxs(e.Fragment,{children:[e.jsxs(h,{gap:"2",children:[e.jsx(Ne,{children:e.jsx(f,{id:"omBarnet.valgteBarn.tittel",values:{antallBarn:l.length}})}),n?l.map(s=>e.jsx(U,{person:s,fødselsdatoForVisning:N([s.fødselsdato]),visEtternavn:!1},s.fnr)):e.jsx(U,{person:l[0],fødselsdatoForVisning:N(o),altTekstHvisUkjentNavn:Ae(void 0,o,l.length,r),visEtternavn:!1})]}),t&&e.jsx(j,{name:"termindato",label:r.formatMessage({id:"omBarnet.termindato.født"}),defaultMonth:d,minDate:i(d).subtract(1,"months").toDate(),maxDate:i(d).add(6,"months").toDate(),validate:[u(r.formatMessage({id:"valideringsfeil.omBarnet.termindato.duMåOppgi"})),v(r.formatMessage({id:"valideringsfeil.omBarnet.termindato.ugyldigDatoFormat"})),s=>{if(!i(s).subtract(6,"months").isSameOrBefore(i(d),"day"))return r.formatMessage({id:"valideringsfeil.omBarnet.termindato.forLangtFremITid"});if(!i(s).add(1,"months").isSameOrAfter(i(d),"day"))return r.formatMessage({id:"valideringsfeil.omBarnet.termindato.forLangtTilbakeITid"})}]})]})};K.__docgenInfo={description:"",methods:[],displayName:"ValgteRegistrerteBarn",props:{valgteRegistrerteBarn:{required:!0,tsType:{name:"Array",elements:[{name:"intersection",raw:`{
    kjønn: Kjønn;
    fødselsdato: string;
    dødsdato?: string;
    annenForelder?: SøkerAnnenForelder;
} & PersonBase`,elements:[{name:"signature",type:"object",raw:`{
    kjønn: Kjønn;
    fødselsdato: string;
    dødsdato?: string;
    annenForelder?: SøkerAnnenForelder;
}`,signature:{properties:[{key:"kjønn",value:{name:"union",raw:"'M' | 'K'",elements:[{name:"literal",value:"'M'"},{name:"literal",value:"'K'"}],required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"dødsdato",value:{name:"string",required:!1}},{key:"annenForelder",value:{name:"intersection",raw:`{
    fødselsdato?: string;
} & PersonBase`,elements:[{name:"signature",type:"object",raw:`{
    fødselsdato?: string;
}`,signature:{properties:[{key:"fødselsdato",value:{name:"string",required:!1}}]}},{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]}}],required:!1}}]}},{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]}}]}],raw:"SøkerBarn[]"},description:""},skalInkludereTermindato:{required:!0,tsType:{name:"boolean"},description:""}}};const Ve=(a,t)=>r=>{if(!t)return;const n=i(r).startOf("day").add(15,"year");return i(t).isBetween(r,n,null,"[]")?void 0:a},J=({adopsjonsdato:a,antallBarn:t,antallBarnDropDown:r})=>{const n=x(),{control:l}=F(),{fields:o,remove:d,append:s}=pe({control:l,name:"fødselsdatoer"});return R.useEffect(()=>{if(!t||t===3&&!r)return;const m=t<3||!r?t:Number.parseInt(r,10),g=o.length-m;g>0&&[...new Array(g)].forEach((c,S)=>{d(o.length-S-1)}),g<0&&[...new Array(m-o.length)].forEach(()=>{s({dato:void 0})})},[t,r,s,o.length,d]),e.jsx(h,{gap:"10",children:o.map((m,g)=>e.jsx(j,{name:`fødselsdatoer.${g}.dato`,minDate:i(a).subtract(15,"years").toDate(),maxDate:i(a).toDate(),label:o.length===1?n.formatMessage({id:"omBarnet.fødselsdato"}):n.formatMessage({id:`omBarnet.fødselsdato.adopsjon.${g+1}`}),validate:[u(n.formatMessage({id:"valideringsfeil.omBarnet.fødselsdato.duMåOppgi"})),v(n.formatMessage({id:"valideringsfeil.omBarnet.fødselsdato.ugyldigDatoFormat"})),L(n.formatMessage({id:"valideringsfeil.omBarnet.fødselsdato.måVæreIdagEllerTidligere"})),he(n.formatMessage({id:"valideringsfeil.omBarnet.fødselsdato.måVæreFørAdopsjonsdato"}),a),Ve(n.formatMessage({id:"valideringsfeil.omBarnet.fødselsdato.ikkeMerEnn15År3MndTilbake"}),a)]},m.id))})};J.__docgenInfo={description:"",methods:[],displayName:"FødselsdatoerFieldArray"};i.extend(A);const G=({søknadGjelderEtNyttBarn:a})=>{const t=x(),r=F(),n=r.watch("adopsjonAvEktefellesBarn"),l=r.watch("antallBarn"),o=r.watch("antallBarnSelect"),d=r.watch("adopsjonsdato"),s=r.watch("adoptertIUtlandet"),m=r.watch("fødselsdatoer");return e.jsxs(e.Fragment,{children:[e.jsxs(M,{name:"adopsjonAvEktefellesBarn",label:t.formatMessage({id:"omBarnet.adopsjonGjelder"}),validate:[u(t.formatMessage({id:"valideringsfeil.omBarnet.adopsjonGjelder.duMåOppgi"}))],children:[e.jsx(p,{value:!0,children:"Ja"}),e.jsx(p,{value:!1,children:"Nei"})]}),e.jsxs(h,{gap:"4",children:[e.jsx(j,{name:"adopsjonsdato",label:n?t.formatMessage({id:"omBarnet.adopsjonsdato.stebarn"}):t.formatMessage({id:"omBarnet.adopsjonsdato.annetBarn"}),validate:[u(t.formatMessage({id:"valideringsfeil.omBarnet.adopsjonsdato.duMåOppgi"})),v(t.formatMessage({id:"valideringsfeil.omBarnet.adopsjonsdato.ugyldigDatoFormat"}))]}),e.jsx(Oe,{padding:"4",background:"surface-alt-3-subtle",borderRadius:"medium",children:e.jsxs(qe,{gap:"2",children:[e.jsx(Re,{height:24,width:24,color:"#005B82"}),e.jsx(h,{gap:"2",style:{width:"85%"},children:e.jsx(Ue,{children:e.jsx(f,{id:"omBarnet.opplaste.bekreftelse"})})})]})})]}),a&&e.jsxs(e.Fragment,{children:[e.jsxs(M,{name:"antallBarn",label:t.formatMessage({id:"omBarnet.antallBarn.adopsjon.født"}),validate:[u(t.formatMessage({id:"valideringsfeil.omBarnet.adopsjon.født.duMåOppgi"}))],children:[e.jsx(p,{value:1,children:e.jsx(f,{id:"omBarnet.radiobutton.ettBarn"})}),e.jsx(p,{value:2,children:e.jsx(f,{id:"omBarnet.radiobutton.toBarn"})}),e.jsx(p,{value:3,children:e.jsx(f,{id:"omBarnet.radiobutton.flere"})})]}),l===3&&e.jsxs(V,{name:"antallBarnSelect",label:"Antall barn",children:[e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"}),e.jsx("option",{value:"6",children:"6"}),e.jsx("option",{value:"7",children:"7"}),e.jsx("option",{value:"8",children:"8"}),e.jsx("option",{value:"9",children:"9"})]}),e.jsx(J,{adopsjonsdato:d,antallBarn:l,antallBarnDropDown:o})]}),n===!1&&!oe(d)&&e.jsxs(e.Fragment,{children:[e.jsxs(M,{name:"adoptertIUtlandet",label:t.formatMessage({id:"omBarnet.adopteresFraUtlandet"}),validate:[u(t.formatMessage({id:"valideringsfeil.omBarnet.adopteresFraUtlandet.duMåOppgi"}))],children:[e.jsx(p,{value:!0,children:"Ja"}),e.jsx(p,{value:!1,children:"Nei"})]}),s===!0&&e.jsx(j,{name:"ankomstdato",minDate:m?i(m[0].dato).toDate():void 0,maxDate:i().add(6,"months").toDate(),label:t.formatMessage({id:"omBarnet.ankomstDato"}),validate:[u(t.formatMessage({id:"valideringsfeil.omBarnet.adopsjonsdato.duMåOppgi"})),v(t.formatMessage({id:"valideringsfeil.omBarnet.adopsjonsdato.ugyldigDatoFormat"})),g=>{var c;return((c=m[0])==null?void 0:c.dato)!==void 0&&!i(m[0].dato).isSameOrBefore(g,"day")?t.formatMessage({id:"valideringsfeil.omBarnet.ankomstDato.førFødselsdato"}):void 0}]})]})]})};G.__docgenInfo={description:"",methods:[],displayName:"AdopsjonPanel",props:{søknadGjelderEtNyttBarn:{required:!0,tsType:{name:"boolean"},description:""}}};i.extend(_);i.extend(A);const $=()=>{const a=x(),t=F(),{antallBarn:r,erBarnetFødt:n,fødselsdatoer:l}=t.watch(),o=r>1?"omBarnet.fødselsdato.flereBarn":"omBarnet.fødselsdato",d=l?l[0].dato:void 0;return e.jsxs(e.Fragment,{children:[e.jsx(j,{name:"termindato",minDate:d?i(d).subtract(1,"months").toDate():void 0,maxDate:d?i(d).add(6,"months").toDate():void 0,label:a.formatMessage({id:"omBarnet.termindato.født"}),validate:[u(a.formatMessage({id:"valideringsfeil.omBarnet.termindato.duMåOppgi"})),v(a.formatMessage({id:"valideringsfeil.omBarnet.termindato.ugyldigDatoFormat"})),s=>{if(d){if(!i(s).subtract(6,"months").isSameOrBefore(i(d),"day"))return a.formatMessage({id:"valideringsfeil.omBarnet.termindato.forLangtFremITid"});if(!i(s).add(1,"months").isSameOrAfter(i(d),"day"))return a.formatMessage({id:"valideringsfeil.omBarnet.termindato.forLangtTilbakeITid"})}}]}),n&&e.jsx(j,{name:"fødselsdatoer.0.dato",label:a.formatMessage({id:o}),minDate:i().subtract(3,"years").toDate(),maxDate:i().toDate(),validate:[u(a.formatMessage({id:"valideringsfeil.omBarnet.fødselsdato.duMåOppgi"})),v(a.formatMessage({id:"valideringsfeil.omBarnet.fødselsdato.ugyldigDatoFormat"})),L(a.formatMessage({id:"valideringsfeil.omBarnet.fødselsdato.måVæreIdagEllerTidligere"})),s=>i(s).isBefore(i().subtract(3,"years").subtract(4,"months"),"day")?a.formatMessage({id:"valideringsfeil.omBarnet.fødselsdato.ikkeMerEnn3År3MndTilbake"}):void 0]})]})};$.__docgenInfo={description:"",methods:[],displayName:"ErFødtPanel"};const Le=(a,t)=>T(a)?t?P(t):!1:!0,z=({søkersituasjon:a,arbeidsforhold:t,søknadGjelderEtNyttBarn:r})=>{const n=x(),o=F().watch("termindato"),d=o?!q(o):!1,s=T(a.rolle),m=s&&o,g=Le(a.rolle,o);return e.jsxs(e.Fragment,{children:[r&&e.jsx(e.Fragment,{children:e.jsxs(h,{gap:"2",children:[e.jsx(j,{name:"termindato",label:n.formatMessage({id:"omBarnet.termindato.termin"}),minDate:de,maxDate:ie,validate:[u(n.formatMessage({id:"valideringsfeil.omBarnet.termindato.duMåOppgi"})),v(n.formatMessage({id:"valideringsfeil.omBarnet.termindato.ugyldigDatoFormat"})),c=>{if(!le(c))return n.formatMessage({id:"valideringsfeil.omBarnet.termindato.forTidlig"});if(!q(c))return n.formatMessage({id:"valideringsfeil.omBarnet.termindato.duMåVæreIUke22"})}]}),!s&&e.jsxs(C,{header:n.formatMessage({id:"omBarnet.termindato.åpneLabel"}),children:[e.jsx(me,{padBottom:"m",children:e.jsx(f,{id:"omBarnet.termindato.innhold.del1"})}),e.jsx(f,{id:"omBarnet.termindato.innhold.del2"})]})]})}),r&&t.length===0&&g&&e.jsx(j,{name:"terminbekreftelsedato",label:n.formatMessage({id:"omBarnet.terminbekreftelseDato"}),maxDate:fe,validate:[u(n.formatMessage({id:"valideringsfeil.omBarnet.terminbekreftelseDato.duMåOppgi"})),v(n.formatMessage({id:"valideringsfeil.omBarnet.terminbekreftelseDato.ugyldigDatoFormat"})),xe(n.formatMessage({id:"valideringsfeil.omBarnet.terminbekreftelseDato.kanIkkeVæreFremITid"}))]}),(d||m&&!g)&&e.jsx(we,{variant:"warning",children:e.jsxs(h,{gap:"4",children:[e.jsx(_e,{level:"3",size:"small",children:e.jsx(f,{id:"omBarnet.termindato.erForTidligTilÅSøkePåTermin.heading"})}),e.jsx(Pe,{children:e.jsx(f,{id:"omBarnet.termindato.erForTidligTilÅSøkePåTermin.innhold"})})]})})]})};z.__docgenInfo={description:"",methods:[],displayName:"TerminPanel",props:{søkersituasjon:{required:!0,tsType:{name:"Søkersituasjon"},description:""},arbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverNavn: string;
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    fom: string;
    tom?: string;
    stillingsprosent: number;
}`,signature:{properties:[{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}},{key:"stillingsprosent",value:{name:"number",required:!0}}]}}],raw:"Arbeidsforhold[]"},description:""},søknadGjelderEtNyttBarn:{required:!1,tsType:{name:"boolean"},description:""}}};const Ce=(a,t,r)=>r===!0?a.formatMessage({id:"omBarnet.antallBarn.født"}):t?a.formatMessage({id:"omBarnet.antallBarn.termin.far"}):a.formatMessage({id:"omBarnet.antallBarn.termin"}),He=(a,t,r)=>r!==!1?a.formatMessage({id:"valideringsfeil.omBarnet.antallFått.duMåOppgi"}):t?a.formatMessage({id:"valideringsfeil.omBarnet.antallVenter.duMåOppgi"}):a.formatMessage({id:"valideringsfeil.omBarnet.antallVenterDu.duMåOppgi"}),W=({søkersituasjon:a,erFarEllerMedmor:t,søknadGjelderEtNyttBarn:r,arbeidsforhold:n})=>{const l=x(),o=F(),d=o.watch("erBarnetFødt"),s=o.watch("antallBarn"),m=T(a.rolle);return e.jsxs(e.Fragment,{children:[r&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:[e.jsxs(M,{name:"erBarnetFødt",label:l.formatMessage({id:"omBarnet.erBarnetFødt"}),validate:[u(l.formatMessage({id:"valideringsfeil.omBarnet.erBarnetFødt.duMåOppgi"}))],children:[e.jsx(p,{value:!0,children:"Ja"}),e.jsx(p,{value:!1,children:"Nei"})]}),!t&&e.jsx(C,{header:l.formatMessage({id:"omBarnet.erBarnetFødt.readMore.header"}),children:e.jsxs(h,{gap:"4",children:[e.jsx("div",{children:e.jsx(f,{id:"omBarnet.erBarnetFødt.readMore.innhold.del1"})}),e.jsx(f,{id:"omBarnet.erBarnetFødt.readMore.innhold.del2"})]})})]}),e.jsxs(M,{name:"antallBarn",label:Ce(l,m,d),validate:[u(He(l,m,d))],children:[e.jsx(p,{value:1,children:e.jsx(f,{id:"omBarnet.radiobutton.ettBarn"})}),e.jsx(p,{value:2,children:e.jsx(f,{id:"omBarnet.radiobutton.tvillinger"})}),e.jsx(p,{value:3,children:e.jsx(f,{id:"omBarnet.radiobutton.flere"})})]}),s!==void 0&&s===3&&e.jsxs(V,{name:"antallBarnSelect",label:"Antall barn",children:[e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"}),e.jsx("option",{value:"6",children:"6"}),e.jsx("option",{value:"7",children:"7"}),e.jsx("option",{value:"8",children:"8"}),e.jsx("option",{value:"9",children:"9"})]})]}),d!==!0&&e.jsx(z,{søkersituasjon:a,arbeidsforhold:n,søknadGjelderEtNyttBarn:r}),d===!0&&r&&e.jsx($,{})]})};W.__docgenInfo={description:"",methods:[],displayName:"FødselPanel",props:{søkersituasjon:{required:!0,tsType:{name:"Søkersituasjon"},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""},søknadGjelderEtNyttBarn:{required:!0,tsType:{name:"boolean"},description:""},arbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverNavn: string;
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    fom: string;
    tom?: string;
    stillingsprosent: number;
}`,signature:{properties:[{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}},{key:"stillingsprosent",value:{name:"number",required:!0}}]}}],raw:"Arbeidsforhold[]"},description:""}}};const Ke=a=>a.erBarnetFødt,Je=a=>a.erBarnetFødt===!1,X=a=>a.adopsjonAvEktefellesBarn,Y=a=>a.adopsjonAvEktefellesBarn===!1,Ge=(a,t,r,n)=>{if(a!==void 0&&t==="fødsel")return{...a,type:n?B.UFØDT:B.FØDT,termindato:r.termindato,fødselsdatoer:a.fødselsdatoer,antallBarn:a.antallBarn};if(X(r))return{...a,type:B.ADOPTERT_STEBARN,adopsjonsdato:r.adopsjonsdato};if(Y(r))return{...a,type:B.ADOPTERT_ANNET_BARN,adopsjonsdato:r.adopsjonsdato,adoptertIUtlandet:r.adoptertIUtlandet,ankomstdato:r.adoptertIUtlandet===!0?r.ankomstdato:void 0};throw new Error("Unreachable code")},$e=(a,t,r,n,l)=>{if(r!==void 0)return Ge(r,n,a,l);if(Ke(a))return{type:B.FØDT,fødselsdatoer:a.fødselsdatoer.map(o=>o.dato),antallBarn:a.antallBarn<3?a.antallBarn:parseInt(a.antallBarnSelect,10),termindato:ge(a.termindato)?a.termindato:void 0};if(Je(a))return t.length===0?{type:B.UFØDT,terminbekreftelsedato:a.terminbekreftelsedato,antallBarn:a.antallBarn<3?a.antallBarn:parseInt(a.antallBarnSelect,10),termindato:a.termindato}:{type:B.UFØDT,antallBarn:a.antallBarn<3?a.antallBarn:parseInt(a.antallBarnSelect,10),termindato:a.termindato};if(X(a))return{type:B.ADOPTERT_STEBARN,adopsjonsdato:a.adopsjonsdato,antallBarn:a.antallBarn<3?a.antallBarn:parseInt(a.antallBarnSelect,10),fødselsdatoer:a.fødselsdatoer.map(o=>o.dato)};if(Y(a))return{type:B.ADOPTERT_ANNET_BARN,fødselsdatoer:a.fødselsdatoer.map(o=>o.dato),adopsjonsdato:a.adopsjonsdato,antallBarn:a.antallBarn<3?a.antallBarn:parseInt(a.antallBarnSelect,10),adoptertIUtlandet:a.adoptertIUtlandet,ankomstdato:a.adoptertIUtlandet===!0?a.ankomstdato:void 0};throw new Error("Unreachable code")},ze=(a,t)=>{if(!t)return{fødselsdatoer:[{dato:void 0}]};const r=t.antallBarn>2;return H(t)?{erBarnetFødt:!0,antallBarn:r?3:t.antallBarn,antallBarnSelect:r?t.antallBarn.toString():void 0,fødselsdatoer:t.fødselsdatoer.map(n=>({dato:n})),termindato:t.termindato}:I(t)?a.length===0?{erBarnetFødt:!1,antallBarn:r?3:t.antallBarn,antallBarnSelect:r?t.antallBarn.toString():void 0,terminbekreftelsedato:t.terminbekreftelsedato,termindato:t.termindato}:{erBarnetFødt:!1,antallBarn:r?3:t.antallBarn,antallBarnSelect:r?t.antallBarn.toString():void 0,termindato:t.termindato}:ke(t)?{adopsjonAvEktefellesBarn:!1,adopsjonsdato:t.adopsjonsdato,antallBarn:r?3:t.antallBarn,antallBarnSelect:r?t.antallBarn.toString():void 0,fødselsdatoer:t.fødselsdatoer.map(n=>({dato:n})),adoptertIUtlandet:t.adoptertIUtlandet,ankomstdato:t.ankomstdato}:ye(t)?{adopsjonAvEktefellesBarn:!0,adopsjonsdato:t.adopsjonsdato,antallBarn:r?3:t.antallBarn,antallBarnSelect:r?t.antallBarn.toString():void 0,fødselsdatoer:t.fødselsdatoer.map(n=>({dato:n}))}:{fødselsdatoer:[{dato:void 0}]}},We=a=>{const t=i(a).add(12,"weeks");return i(t).isAfter(new Date,"day")},Xe=(a,t)=>t&&!I(t)&&t.fnr!==void 0&&t.fnr.length>0?t.fnr.includes(a.fnr):!1,Ye=(a,t,r,n)=>{if(n==="adopsjon")return!1;let l;if(r!==void 0&&r.length>0&&(l=Ee(r).fødselsdato),!t&&!l)return!1;const o=l||t;return T(a)?P(o)?!0:We(o):!0},Z=({søkerInfo:a,søknadGjelderNyttBarn:t,mellomlagreSøknadOgNaviger:r,avbrytSøknad:n})=>{const l=x(),o=Fe(a.arbeidsforhold),d=Te(a.arbeidsforhold,r),s=Me(w(D.SØKERSITUASJON)),m=w(D.OM_BARNET),g=Se(D.OM_BARNET),{arbeidsforhold:c,søker:S}=a,Q=T(s.rolle),ee=m?Ie(m):void 0,ae=m&&H(m)?S.barn.filter(y=>y.fnr===void 0&&De(y.fødselsdato,ee)):[],k=!t&&m&&!I(m)?S.barn.filter(y=>Xe(y,m)).concat(ae):void 0,b=!t&&(k===void 0||k.length===0),te=y=>{const se=$e(y,c,!t&&!b?m:void 0,s.situasjon,b);return g(se),d.goToNextDefaultStep()},re=R.useMemo(()=>ze(c,m),[c,m]),E=ce({shouldUnregister:!0,defaultValues:re}),O=E.watch("fødselsdatoer"),ne=Ye(s.rolle,O?O[0].dato:void 0,k,s.situasjon);return e.jsx(ue,{bannerTitle:l.formatMessage({id:"søknad.pageheading"}),onCancel:n,onContinueLater:d.fortsettSøknadSenere,steps:o,children:e.jsx(Be,{formMethods:E,onSubmit:te,children:e.jsxs(h,{gap:"10",children:[e.jsx(je,{}),k&&k.length>0&&e.jsx(K,{valgteRegistrerteBarn:k,skalInkludereTermindato:ne}),s.situasjon==="fødsel"&&e.jsx(W,{erFarEllerMedmor:Q,søknadGjelderEtNyttBarn:b||t,søkersituasjon:s,arbeidsforhold:c}),s.situasjon==="adopsjon"&&e.jsx(G,{søknadGjelderEtNyttBarn:b||t}),e.jsx(ve,{goToPreviousStep:d.goToPreviousDefaultStep})]})})})},ja=Z;Z.__docgenInfo={description:"",methods:[],displayName:"OmBarnetSteg"};export{ja as O};
