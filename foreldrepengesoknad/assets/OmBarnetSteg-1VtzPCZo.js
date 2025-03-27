import{j as e}from"./jsx-runtime-CLpGMVip.js";import{u as w,C as q,a as me}from"./FpDataContext-DWIUkGg8.js";import{i as j,g as R,u as ue,a as fe}from"./useFpNavigator-Cn91hHQ7.js";import{d as l,h as ge}from"./dates-AkG-ZPn6.js";import{r as G}from"./index-DI2V0i71.js";import{a as k,h as A,i as pe,b as F,d as K,u as ce,R as Be,E as ve,S as je}from"./ErrorSummaryHookForm-CdpRkcam.js";import{u as T,c as ke,M as u,B as he,a as I,H as ye}from"./Link-BKbcfhYA.js";import{s as Te,d as O,x as xe,y as U,z as Ee,A as Me,B as be,C as Fe,D as C,E as Ae,g as Se,e as qe,F as Ie}from"./barnUtils-B445qoAB.js";import{a1 as H,a2 as D,i as g,c as h,a3 as L,d as J,u as Re,R as p,k as De,K as Ne,a4 as Pe,q as z,a5 as _e,a6 as we,A as Oe,a7 as $,a8 as N,a9 as Ue,N as Le,B,n as Ve,b as Ge}from"./Uttaksplan-BbE21Umt.js";import{R as V}from"./RegistrertePersonalia-cPf_rYvN.js";import{V as v,H as Ke}from"./VStack-0uPSX4Ae.js";l.extend(H);l.extend(D);const W=({valgteRegistrerteBarn:a,skalInkludereTermindato:t})=>{const r=T(),n=a.every(i=>!i.dødsdato),d=[...a].sort(Te),o=d.map(i=>i.fødselsdato),s=d[0].fødselsdato;return e.jsxs(e.Fragment,{children:[e.jsxs(v,{gap:"2",children:[e.jsx(ke,{children:e.jsx(u,{id:"omBarnet.valgteBarn.tittel",values:{antallBarn:d.length}})}),n?d.map(i=>e.jsx(V,{person:i,fødselsdatoForVisning:O([i.fødselsdato]),visEtternavn:!1},i.fnr)):e.jsx(V,{person:d[0],fødselsdatoForVisning:O(o),altTekstHvisUkjentNavn:xe(void 0,o,d.length,r),visEtternavn:!1})]}),t&&e.jsx(k,{name:"termindato",label:r.formatMessage({id:"omBarnet.termindato.født"}),defaultMonth:s,minDate:l(s).subtract(1,"months").toDate(),maxDate:l(s).add(6,"months").toDate(),validate:[g(r.formatMessage({id:"valideringsfeil.omBarnet.termindato.duMåOppgi"})),h(r.formatMessage({id:"valideringsfeil.omBarnet.termindato.ugyldigDatoFormat"})),i=>{if(!l(i).subtract(6,"months").isSameOrBefore(l(s),"day"))return r.formatMessage({id:"valideringsfeil.omBarnet.termindato.forLangtFremITid"});if(!l(i).add(1,"months").isSameOrAfter(l(s),"day"))return r.formatMessage({id:"valideringsfeil.omBarnet.termindato.forLangtTilbakeITid"})}]})]})};W.__docgenInfo={description:"",methods:[],displayName:"ValgteRegistrerteBarn",props:{valgteRegistrerteBarn:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    kjønn: string;
    fødselsdato: string;
    dødsdato?: string;
    annenForelder?: AnnenForelderFrontend;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"kjønn",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"dødsdato",value:{name:"string",required:!1}},{key:"annenForelder",value:{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    fødselsdato?: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!1}}]},required:!1}}]}}],raw:"BarnFrontend[]"},description:""},skalInkludereTermindato:{required:!0,tsType:{name:"boolean"},description:""}}};const Ce=(a,t)=>r=>{if(!t)return;const n=l(r).startOf("day").add(15,"year");return l(t).isBetween(r,n,null,"[]")?void 0:a},He=a=>{switch(a){case 1:return e.jsx(u,{id:"omBarnet.fødselsdato.adopsjon.1"});case 2:return e.jsx(u,{id:"omBarnet.fødselsdato.adopsjon.2"});case 3:return e.jsx(u,{id:"omBarnet.fødselsdato.adopsjon.3"});case 4:return e.jsx(u,{id:"omBarnet.fødselsdato.adopsjon.4"});case 5:return e.jsx(u,{id:"omBarnet.fødselsdato.adopsjon.5"});case 6:return e.jsx(u,{id:"omBarnet.fødselsdato.adopsjon.6"});case 7:return e.jsx(u,{id:"omBarnet.fødselsdato.adopsjon.7"});case 8:return e.jsx(u,{id:"omBarnet.fødselsdato.adopsjon.8"});case 9:return e.jsx(u,{id:"omBarnet.fødselsdato.adopsjon.9"});default:throw new Error("Antall barn ikke supportert: "+a)}},X=({adopsjonsdato:a,antallBarn:t,antallBarnDropDown:r})=>{const n=T(),{control:d}=A(),{fields:o,remove:s,append:i}=pe({control:d,name:"fødselsdatoer"});return G.useEffect(()=>{if(!t||t===3&&!r)return;const m=t<3||!r?t:Number.parseInt(r,10),f=o.length-m;f>0&&[...new Array(f)].forEach((c,y)=>{s(o.length-y-1)}),f<0&&[...new Array(m-o.length)].forEach(()=>{i({dato:void 0})})},[t,r,i,o.length,s]),e.jsx(v,{gap:"10",children:o.map((m,f)=>e.jsx(k,{name:`fødselsdatoer.${f}.dato`,minDate:l(a).subtract(15,"years").toDate(),maxDate:a&&L(a)?l(a).toDate():l(),defaultMonth:a&&L(a)?a:l(),label:o.length===1?n.formatMessage({id:"omBarnet.fødselsdato"}):He(f+1),validate:[g(n.formatMessage({id:"valideringsfeil.omBarnet.fødselsdato.duMåOppgi"})),h(n.formatMessage({id:"valideringsfeil.omBarnet.fødselsdato.ugyldigDatoFormat"})),J(n.formatMessage({id:"valideringsfeil.omBarnet.fødselsdato.måVæreIdagEllerTidligere"})),Re(n.formatMessage({id:"valideringsfeil.omBarnet.fødselsdato.måVæreFørAdopsjonsdato"}),a),Ce(n.formatMessage({id:"valideringsfeil.omBarnet.fødselsdato.ikkeMerEnn15År3MndTilbake"}),a)]},m.id))})};X.__docgenInfo={description:"",methods:[],displayName:"FødselsdatoerFieldArray",props:{antallBarn:{required:!1,tsType:{name:"number"},description:""},antallBarnDropDown:{required:!1,tsType:{name:"string"},description:""},adopsjonsdato:{required:!1,tsType:{name:"string"},description:""}}};l.extend(D);const Q=({søknadGjelderEtNyttBarn:a})=>{const t=T(),r=A(),n=r.watch("adopsjonAvEktefellesBarn"),d=r.watch("antallBarn"),o=r.watch("antallBarnSelect"),s=r.watch("adopsjonsdato"),i=r.watch("adoptertIUtlandet"),m=r.watch("fødselsdatoer");return e.jsxs(e.Fragment,{children:[e.jsxs(F,{name:"adopsjonAvEktefellesBarn",label:t.formatMessage({id:"omBarnet.adopsjonGjelder"}),validate:[g(t.formatMessage({id:"valideringsfeil.omBarnet.adopsjonGjelder.duMåOppgi"}))],children:[e.jsx(p,{value:!0,children:"Ja"}),e.jsx(p,{value:!1,children:"Nei"})]}),e.jsxs(v,{gap:"4",children:[e.jsx(k,{name:"adopsjonsdato",label:n?t.formatMessage({id:"omBarnet.adopsjonsdato.stebarn"}):t.formatMessage({id:"omBarnet.adopsjonsdato.annetBarn"}),validate:[g(t.formatMessage({id:"valideringsfeil.omBarnet.adopsjonsdato.duMåOppgi"})),h(t.formatMessage({id:"valideringsfeil.omBarnet.adopsjonsdato.ugyldigDatoFormat"}))]}),e.jsx(De,{padding:"4",background:"surface-alt-3-subtle",borderRadius:"medium",children:e.jsxs(Ke,{gap:"2",children:[e.jsx(Ne,{height:24,width:24,color:"#005B82"}),e.jsx(v,{gap:"2",style:{width:"85%"},children:e.jsx(he,{children:e.jsx(u,{id:"omBarnet.opplaste.bekreftelse"})})})]})})]}),a&&e.jsxs(e.Fragment,{children:[e.jsxs(F,{name:"antallBarn",label:t.formatMessage({id:"omBarnet.antallBarn.adopsjon.født"}),validate:[g(t.formatMessage({id:"valideringsfeil.omBarnet.adopsjon.født.duMåOppgi"}))],children:[e.jsx(p,{value:1,children:e.jsx(u,{id:"omBarnet.radiobutton.ettBarn"})}),e.jsx(p,{value:2,children:e.jsx(u,{id:"omBarnet.radiobutton.toBarn"})}),e.jsx(p,{value:3,children:e.jsx(u,{id:"omBarnet.radiobutton.flere"})})]}),d===3&&e.jsxs(K,{name:"antallBarnSelect",label:"Antall barn",children:[e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"}),e.jsx("option",{value:"6",children:"6"}),e.jsx("option",{value:"7",children:"7"}),e.jsx("option",{value:"8",children:"8"}),e.jsx("option",{value:"9",children:"9"})]}),e.jsx(X,{adopsjonsdato:s,antallBarn:d,antallBarnDropDown:o})]}),n===!1&&!Pe(s)&&e.jsxs(e.Fragment,{children:[e.jsxs(F,{name:"adoptertIUtlandet",label:t.formatMessage({id:"omBarnet.adopteresFraUtlandet"}),validate:[g(t.formatMessage({id:"valideringsfeil.omBarnet.adopteresFraUtlandet.duMåOppgi"}))],children:[e.jsx(p,{value:!0,children:"Ja"}),e.jsx(p,{value:!1,children:"Nei"})]}),i===!0&&e.jsx(k,{name:"ankomstdato",minDate:m?l(m[0].dato).toDate():void 0,maxDate:l().add(6,"months").toDate(),label:t.formatMessage({id:"omBarnet.ankomstDato"}),validate:[g(t.formatMessage({id:"valideringsfeil.omBarnet.adopsjonsdato.duMåOppgi"})),h(t.formatMessage({id:"valideringsfeil.omBarnet.adopsjonsdato.ugyldigDatoFormat"})),f=>{var c;return((c=m[0])==null?void 0:c.dato)!==void 0&&!l(m[0].dato).isSameOrBefore(f,"day")?t.formatMessage({id:"valideringsfeil.omBarnet.ankomstDato.førFødselsdato"}):void 0}]})]})]})};Q.__docgenInfo={description:"",methods:[],displayName:"AdopsjonPanel",props:{søknadGjelderEtNyttBarn:{required:!0,tsType:{name:"boolean"},description:""}}};l.extend(H);l.extend(D);const Y=()=>{const a=T(),t=A(),{antallBarn:r,erBarnetFødt:n,fødselsdatoer:d}=t.watch(),o=r>1?"omBarnet.fødselsdato.flereBarn":"omBarnet.fødselsdato",s=d?d[0].dato:void 0;return e.jsxs(e.Fragment,{children:[e.jsx(k,{name:"termindato",minDate:s?l(s).subtract(1,"months").toDate():void 0,maxDate:s?l(s).add(6,"months").toDate():void 0,label:a.formatMessage({id:"omBarnet.termindato.født"}),useStrategyAbsolute:!0,validate:[g(a.formatMessage({id:"valideringsfeil.omBarnet.termindato.duMåOppgi"})),h(a.formatMessage({id:"valideringsfeil.omBarnet.termindato.ugyldigDatoFormat"})),i=>{if(s){if(!l(i).subtract(6,"months").isSameOrBefore(l(s),"day"))return a.formatMessage({id:"valideringsfeil.omBarnet.termindato.forLangtFremITid"});if(!l(i).add(1,"months").isSameOrAfter(l(s),"day"))return a.formatMessage({id:"valideringsfeil.omBarnet.termindato.forLangtTilbakeITid"})}}]}),n&&e.jsx(k,{name:"fødselsdatoer.0.dato",label:a.formatMessage({id:o}),minDate:l().subtract(3,"years").toDate(),maxDate:l().toDate(),useStrategyAbsolute:!0,validate:[g(a.formatMessage({id:"valideringsfeil.omBarnet.fødselsdato.duMåOppgi"})),h(a.formatMessage({id:"valideringsfeil.omBarnet.fødselsdato.ugyldigDatoFormat"})),J(a.formatMessage({id:"valideringsfeil.omBarnet.fødselsdato.måVæreIdagEllerTidligere"})),i=>l(i).isBefore(l().subtract(3,"years").subtract(4,"months"),"day")?a.formatMessage({id:"valideringsfeil.omBarnet.fødselsdato.ikkeMerEnn3År3MndTilbake"}):void 0]})]})};Y.__docgenInfo={description:"",methods:[],displayName:"ErFødtPanel"};const Je=(a,t)=>j(a)?t?C(t):!1:!0,Z=({søkersituasjon:a,arbeidsforhold:t,søknadGjelderEtNyttBarn:r})=>{const n=T(),o=A().watch("termindato"),s=o?!U(o):!1,i=j(a.rolle),m=i&&o,f=Je(a.rolle,o),c=o&&ge.test(o)?R(t,a.situasjon==="adopsjon",j(a.rolle),o):t;return e.jsxs(e.Fragment,{children:[r&&e.jsxs(v,{gap:"2",children:[e.jsx(k,{name:"termindato",label:n.formatMessage({id:"omBarnet.termindato.termin"}),minDate:Ee,maxDate:Me,useStrategyAbsolute:!0,validate:[g(n.formatMessage({id:"valideringsfeil.omBarnet.termindato.duMåOppgi"})),h(n.formatMessage({id:"valideringsfeil.omBarnet.termindato.ugyldigDatoFormat"})),y=>{if(!be(y))return n.formatMessage({id:"valideringsfeil.omBarnet.termindato.forTidlig"});if(!U(y))return n.formatMessage({id:"valideringsfeil.omBarnet.termindato.duMåVæreIUke22"})}]}),!i&&e.jsx(z,{header:n.formatMessage({id:"omBarnet.termindato.åpneLabel"}),children:e.jsxs(v,{gap:"2",children:[e.jsx(I,{children:e.jsx(u,{id:"omBarnet.termindato.innhold.del1"})}),e.jsx(I,{children:e.jsx(u,{id:"omBarnet.termindato.innhold.del2"})})]})})]}),r&&c.length===0&&f&&e.jsx(k,{name:"terminbekreftelsedato",label:n.formatMessage({id:"omBarnet.terminbekreftelseDato"}),maxDate:Fe,minDate:l(o).subtract(18,"week").subtract(3,"day").startOf("day").toDate(),useStrategyAbsolute:!0,validate:[g(n.formatMessage({id:"valideringsfeil.omBarnet.terminbekreftelseDato.duMåOppgi"})),h(n.formatMessage({id:"valideringsfeil.omBarnet.terminbekreftelseDato.ugyldigDatoFormat"})),_e(n.formatMessage({id:"valideringsfeil.omBarnet.terminbekreftelseDato.kanIkkeVæreFremITid"})),we(n.formatMessage({id:"valideringsfeil.omBarnet.terminbekreftelseDato.terminbekreftelsedatoMåVæreUtstedetEtter22Svangerskapsuke"}),o)]}),(s||m&&!f)&&e.jsx(Oe,{variant:"warning",children:e.jsxs(v,{gap:"4",children:[e.jsx(ye,{level:"3",size:"small",children:e.jsx(u,{id:"omBarnet.termindato.erForTidligTilÅSøkePåTermin.heading"})}),e.jsx(I,{children:e.jsx(u,{id:"omBarnet.termindato.erForTidligTilÅSøkePåTermin.innhold"})})]})})]})};Z.__docgenInfo={description:"",methods:[],displayName:"TerminPanel",props:{søkersituasjon:{required:!0,tsType:{name:"Søkersituasjon"},description:""},arbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    stillingsprosent: number;
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"Arbeidsforhold[]"},description:""},søknadGjelderEtNyttBarn:{required:!1,tsType:{name:"boolean"},description:""}}};const ze=(a,t,r)=>r===!0?a.formatMessage({id:"omBarnet.antallBarn.født"}):t?a.formatMessage({id:"omBarnet.antallBarn.termin.far"}):a.formatMessage({id:"omBarnet.antallBarn.termin"}),$e=(a,t,r)=>r!==!1?a.formatMessage({id:"valideringsfeil.omBarnet.antallFått.duMåOppgi"}):t?a.formatMessage({id:"valideringsfeil.omBarnet.antallVenter.duMåOppgi"}):a.formatMessage({id:"valideringsfeil.omBarnet.antallVenterDu.duMåOppgi"}),ee=({søkersituasjon:a,erFarEllerMedmor:t,søknadGjelderEtNyttBarn:r,arbeidsforhold:n})=>{const d=T(),o=A(),s=o.watch("erBarnetFødt"),i=o.watch("antallBarn"),m=j(a.rolle);return e.jsxs(e.Fragment,{children:[r&&e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:[e.jsxs(F,{name:"erBarnetFødt",label:d.formatMessage({id:"omBarnet.erBarnetFødt"}),validate:[g(d.formatMessage({id:"valideringsfeil.omBarnet.erBarnetFødt.duMåOppgi"}))],children:[e.jsx(p,{value:!0,children:"Ja"}),e.jsx(p,{value:!1,children:"Nei"})]}),!t&&e.jsx(z,{header:d.formatMessage({id:"omBarnet.erBarnetFødt.readMore.header"}),children:e.jsxs(v,{gap:"4",children:[e.jsx("div",{children:e.jsx(u,{id:"omBarnet.erBarnetFødt.readMore.innhold.del1"})}),e.jsx(u,{id:"omBarnet.erBarnetFødt.readMore.innhold.del2"})]})})]}),e.jsxs(F,{name:"antallBarn",label:ze(d,m,s),validate:[g($e(d,m,s))],children:[e.jsx(p,{value:1,children:e.jsx(u,{id:"omBarnet.radiobutton.ettBarn"})}),e.jsx(p,{value:2,children:e.jsx(u,{id:"omBarnet.radiobutton.tvillinger"})}),e.jsx(p,{value:3,children:e.jsx(u,{id:"omBarnet.radiobutton.flere"})})]}),i!==void 0&&i===3&&e.jsxs(K,{name:"antallBarnSelect",label:"Antall barn",children:[e.jsx("option",{value:"3",children:"3"}),e.jsx("option",{value:"4",children:"4"}),e.jsx("option",{value:"5",children:"5"}),e.jsx("option",{value:"6",children:"6"}),e.jsx("option",{value:"7",children:"7"}),e.jsx("option",{value:"8",children:"8"}),e.jsx("option",{value:"9",children:"9"})]})]}),s!==!0&&e.jsx(Z,{søkersituasjon:a,arbeidsforhold:n,søknadGjelderEtNyttBarn:r}),s===!0&&r&&e.jsx(Y,{})]})};ee.__docgenInfo={description:"",methods:[],displayName:"FødselPanel",props:{søkersituasjon:{required:!0,tsType:{name:"Søkersituasjon"},description:""},erFarEllerMedmor:{required:!0,tsType:{name:"boolean"},description:""},søknadGjelderEtNyttBarn:{required:!0,tsType:{name:"boolean"},description:""},arbeidsforhold:{required:!0,tsType:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    stillingsprosent: number;
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"Arbeidsforhold[]"},description:""}}};const We=a=>a.erBarnetFødt,Xe=a=>a.erBarnetFødt===!1,ae=a=>a.adopsjonAvEktefellesBarn,re=a=>a.adopsjonAvEktefellesBarn===!1,Qe=(a,t,r,n)=>{if(a!==void 0&&t==="fødsel")return{...a,type:n?B.UFØDT:B.FØDT,termindato:r.termindato,fødselsdatoer:a.fødselsdatoer,antallBarn:a.antallBarn};if(ae(r))return{...a,type:B.ADOPTERT_STEBARN,adopsjonsdato:r.adopsjonsdato};if(re(r))return{...a,type:B.ADOPTERT_ANNET_BARN,adopsjonsdato:r.adopsjonsdato,adoptertIUtlandet:r.adoptertIUtlandet,ankomstdato:r.adoptertIUtlandet===!0?r.ankomstdato:void 0};throw new Error("Unreachable code")},Ye=(a,t,r,n,d,o)=>{if(n!==void 0)return Qe(n,d,a,o);if(We(a))return{type:B.FØDT,fødselsdatoer:a.fødselsdatoer.map(s=>s.dato),antallBarn:a.antallBarn<3?a.antallBarn:parseInt(a.antallBarnSelect,10),termindato:Ae(a.termindato)?a.termindato:void 0};if(Xe(a))return R(t,r.situasjon==="adopsjon",j(r.rolle),a.termindato).length===0?{type:B.UFØDT,terminbekreftelsedato:a.terminbekreftelsedato,antallBarn:a.antallBarn<3?a.antallBarn:parseInt(a.antallBarnSelect,10),termindato:a.termindato}:{type:B.UFØDT,antallBarn:a.antallBarn<3?a.antallBarn:parseInt(a.antallBarnSelect,10),termindato:a.termindato};if(ae(a))return{type:B.ADOPTERT_STEBARN,adopsjonsdato:a.adopsjonsdato,antallBarn:a.antallBarn<3?a.antallBarn:parseInt(a.antallBarnSelect,10),fødselsdatoer:a.fødselsdatoer.map(s=>s.dato)};if(re(a))return{type:B.ADOPTERT_ANNET_BARN,fødselsdatoer:a.fødselsdatoer.map(s=>s.dato),adopsjonsdato:a.adopsjonsdato,antallBarn:a.antallBarn<3?a.antallBarn:parseInt(a.antallBarnSelect,10),adoptertIUtlandet:a.adoptertIUtlandet,ankomstdato:a.adoptertIUtlandet===!0?a.ankomstdato:void 0};throw new Error("Unreachable code")},M=(a,t)=>a?3:t.antallBarn,b=(a,t)=>a?t.antallBarn.toString():void 0,Ze=(a,t,r)=>{if(!r)return{fødselsdatoer:[{dato:void 0}]};const n=r.antallBarn>2;return $(r)?{erBarnetFødt:!0,antallBarn:M(n,r),antallBarnSelect:b(n,r),fødselsdatoer:r.fødselsdatoer.map(d=>({dato:d})),termindato:r.termindato}:N(r)?R(a,t.situasjon==="adopsjon",j(t.rolle),r.termindato).length===0?{erBarnetFødt:!1,antallBarn:M(n,r),antallBarnSelect:b(n,r),terminbekreftelsedato:r.terminbekreftelsedato,termindato:r.termindato}:{erBarnetFødt:!1,antallBarn:M(n,r),antallBarnSelect:b(n,r),termindato:r.termindato}:Ue(r)?{adopsjonAvEktefellesBarn:!1,adopsjonsdato:r.adopsjonsdato,antallBarn:M(n,r),antallBarnSelect:b(n,r),fødselsdatoer:r.fødselsdatoer.map(d=>({dato:d})),adoptertIUtlandet:r.adoptertIUtlandet,ankomstdato:r.ankomstdato}:Le(r)?{adopsjonAvEktefellesBarn:!0,adopsjonsdato:r.adopsjonsdato,antallBarn:M(n,r),antallBarnSelect:b(n,r),fødselsdatoer:r.fødselsdatoer.map(d=>({dato:d}))}:{fødselsdatoer:[{dato:void 0}]}},ea=a=>{const t=l(a).add(12,"weeks");return l(t).isAfter(new Date,"day")},aa=(a,t)=>t&&!N(t)&&t.fnr!==void 0&&t.fnr.length>0?t.fnr.includes(a.fnr):!1,ra=(a,t,r,n)=>{if(n==="adopsjon")return!1;let d;if(r!==void 0&&r.length>0&&(d=Ie(r).fødselsdato),!t&&!d)return!1;const o=d||t;return j(a)?C(o)?!0:ea(o):!0},ta=({søkerInfo:a,søknadGjelderNyttBarn:t,mellomlagreSøknadOgNaviger:r,avbrytSøknad:n})=>{const d=T(),o=ue(a.arbeidsforhold),s=fe(a.arbeidsforhold,r),i=Ve(w(q.SØKERSITUASJON)),m=w(q.OM_BARNET),f=me(q.OM_BARNET),{arbeidsforhold:c,søker:y}=a,te=j(i.rolle),ne=m?Se(m):void 0,se=m&&$(m)?y.barn.filter(E=>E.fnr===void 0&&qe(E.fødselsdato,ne)):[],x=!t&&m&&!N(m)?y.barn.filter(E=>aa(E,m)).concat(se):void 0,S=!t&&(x===void 0||x.length===0),de=E=>{const le=Ye(E,c,i,!t&&!S?m:void 0,i.situasjon,S);return f(le),s.goToNextDefaultStep()},ie=G.useMemo(()=>Ze(c,i,m),[c,m]),P=ce({shouldUnregister:!0,defaultValues:ie}),_=P.watch("fødselsdatoer"),oe=ra(i.rolle,_?_[0].dato:void 0,x,i.situasjon);return e.jsx(Ge,{bannerTitle:d.formatMessage({id:"søknad.pageheading"}),onCancel:n,onContinueLater:s.fortsettSøknadSenere,steps:o,children:e.jsx(Be,{formMethods:P,onSubmit:de,children:e.jsxs(v,{gap:"10",children:[e.jsx(ve,{}),x&&x.length>0&&e.jsx(W,{valgteRegistrerteBarn:x,skalInkludereTermindato:oe}),i.situasjon==="fødsel"&&e.jsx(ee,{erFarEllerMedmor:te,søknadGjelderEtNyttBarn:S||t,søkersituasjon:i,arbeidsforhold:c}),i.situasjon==="adopsjon"&&e.jsx(Q,{søknadGjelderEtNyttBarn:S||t}),e.jsx(je,{goToPreviousStep:s.goToPreviousDefaultStep})]})})})};ta.__docgenInfo={description:"",methods:[],displayName:"OmBarnetSteg",props:{søkerInfo:{required:!0,tsType:{name:"signature",type:"object",raw:`{
    søker: PersonFrontend;
    arbeidsforhold: Arbeidsforhold[];
}`,signature:{properties:[{key:"søker",value:{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    kjønn: 'M' | 'K';
    fødselsdato: string;
    bankkonto?: Bankkonto;
    barn: BarnFrontend[];
    sivilstand?: Sivilstand;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"kjønn",value:{name:"union",raw:"'M' | 'K'",elements:[{name:"literal",value:"'M'"},{name:"literal",value:"'K'"}],required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"bankkonto",value:{name:"signature",type:"object",raw:`{
    kontonummer?: string;
    banknavn?: string;
}`,signature:{properties:[{key:"kontonummer",value:{name:"string",required:!1}},{key:"banknavn",value:{name:"string",required:!1}}]},required:!1}},{key:"barn",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    kjønn: string;
    fødselsdato: string;
    dødsdato?: string;
    annenForelder?: AnnenForelderFrontend;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"kjønn",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"dødsdato",value:{name:"string",required:!1}},{key:"annenForelder",value:{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
    fødselsdato?: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}},{key:"fødselsdato",value:{name:"string",required:!1}}]},required:!1}}]}}],raw:"BarnFrontend[]",required:!0}},{key:"sivilstand",value:{name:"signature",type:"object",raw:`{
    type?:
        | 'UOPPGITT'
        | 'UGIFT'
        | 'GIFT'
        | 'ENKE_ELLER_ENKEMANN'
        | 'SKILT'
        | 'SEPARERT'
        | 'REGISTRERT_PARTNER'
        | 'SEPARERT_PARTNER'
        | 'SKILT_PARTNER'
        | 'GJENLEVENDE_PARTNER';
}`,signature:{properties:[{key:"type",value:{name:"union",raw:`| 'UOPPGITT'
| 'UGIFT'
| 'GIFT'
| 'ENKE_ELLER_ENKEMANN'
| 'SKILT'
| 'SEPARERT'
| 'REGISTRERT_PARTNER'
| 'SEPARERT_PARTNER'
| 'SKILT_PARTNER'
| 'GJENLEVENDE_PARTNER'`,elements:[{name:"literal",value:"'UOPPGITT'"},{name:"literal",value:"'UGIFT'"},{name:"literal",value:"'GIFT'"},{name:"literal",value:"'ENKE_ELLER_ENKEMANN'"},{name:"literal",value:"'SKILT'"},{name:"literal",value:"'SEPARERT'"},{name:"literal",value:"'REGISTRERT_PARTNER'"},{name:"literal",value:"'SEPARERT_PARTNER'"},{name:"literal",value:"'SKILT_PARTNER'"},{name:"literal",value:"'GJENLEVENDE_PARTNER'"}],required:!1}}]},required:!1}}]},required:!0}},{key:"arbeidsforhold",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    arbeidsgiverId: string;
    arbeidsgiverIdType: string;
    arbeidsgiverNavn: string;
    stillingsprosent: number;
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"arbeidsgiverId",value:{name:"string",required:!0}},{key:"arbeidsgiverIdType",value:{name:"string",required:!0}},{key:"arbeidsgiverNavn",value:{name:"string",required:!0}},{key:"stillingsprosent",value:{name:"number",required:!0}},{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"Arbeidsforhold[]",required:!0}}]}},description:""},søknadGjelderNyttBarn:{required:!0,tsType:{name:"boolean"},description:""},mellomlagreSøknadOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},avbrytSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};export{ta as O};
