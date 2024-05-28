import{u as h,j as e,V as M,c as d,B as r,F as s,f as m,g as D,A as O,n as v,C as E,H as w}from"./dateFormValidation-DCL9nYFn.js";import{u as A,a as F,b as u,C as g}from"./useEsNavigator-Coec-Teu.js";import{e as x,a as S,b as B}from"./OmBarnet-BV6De4cI.js";import{O as y,S as N,B as L,H as f}from"./SøkerOppsummeringspunkt-B01YMOW5.js";import"./index-DVXBtNgz.js";const _=n=>!!n.terminbekreftelsedato,q=({omBarnet:n,dokumentasjon:i})=>{const t=h(),o=x(n),p=S(n),l=B(n);let a;return n.antallBarn===1?a=t.formatMessage({id:"OmBarnetOppsummering.EttBarn"}):n.antallBarn===2&&!o?a=t.formatMessage({id:"OmBarnetOppsummering.Tvillinger"}):n.antallBarn===2&&o?a=t.formatMessage({id:"OmBarnetOppsummering.ToBarn"}):a=t.formatMessage({id:"OmBarnetOppsummering.FlereBarn"},{antall:n.antallBarn}),e.jsxs(M,{gap:"4",children:[e.jsxs(d,{gap:"2",children:[e.jsx(r,{children:e.jsx(s,{id:"OmBarnetOppsummering.SoknadenGjelder"})}),e.jsx(r,{children:a})]}),o&&e.jsxs(e.Fragment,{children:[e.jsxs(d,{gap:"2",children:[e.jsx(r,{children:e.jsx(s,{id:"OmBarnetOppsummering.MedAdopsjonsdato"})}),e.jsx(r,{children:m(n.adopsjonsdato)})]}),e.jsxs(d,{gap:"2",children:[e.jsx(r,{children:n.fødselsdatoer.length>1?t.formatMessage({id:"OmBarnetOppsummering.MedFødselsdatoer"}):t.formatMessage({id:"OmBarnetOppsummering.MedFødselsdato"})}),e.jsx(D,{children:n.fødselsdatoer.map((j,c)=>m(n.fødselsdatoer[c].dato)).join(", ")})]}),e.jsx(r,{style:{fontWeight:"bold"},children:e.jsx(s,{id:"OmBarnetOppsummering.VedlagtOmsorgsovertakelseBekreftelse"})}),e.jsx(O,{attachments:v(i).vedlegg})]}),l&&e.jsxs(d,{gap:"2",children:[e.jsx(r,{children:e.jsx(s,{id:"OmBarnetOppsummering.MedFødselsdato"})}),e.jsx(r,{children:m(n.fødselsdato)})]}),p&&i&&_(i)&&e.jsxs(e.Fragment,{children:[e.jsxs(d,{gap:"2",children:[e.jsx(r,{children:e.jsx(s,{id:"OmBarnetOppsummering.MedTermindato"})}),e.jsx(r,{children:m(n.termindato)})]}),e.jsxs(d,{gap:"2",children:[e.jsx(r,{children:e.jsx(s,{id:"OmBarnetOppsummering.SomErDatert"})}),e.jsx(r,{children:m(i.terminbekreftelsedato)})]}),e.jsx(r,{style:{fontWeight:"bold"},children:e.jsx(s,{id:"OmBarnetOppsummering.VedlagtTerminbekreftelse"})}),e.jsx(O,{attachments:i.vedlegg})]})]})};q.__docgenInfo={description:"",methods:[],displayName:"OmBarnetOppsummering"};const H=n=>{if(B(n))return[n.fødselsdato,f.FØDSEL];if(x(n))return[n.adopsjonsdato,f.ADOPSJON];if(S(n))return[n.termindato,f.TERMIN];throw new Error("Informasjon om barn er feil!")},T=({søker:n,sendSøknad:i,mellomlagreOgNaviger:t})=>{const o=h(),p=A(),l=F(t),a=v(u(g.OM_BARNET)),j=v(u(g.UTENLANDSOPPHOLD)),c=u(g.DOKUMENTASJON),b=u(g.UTENLANDSOPPHOLD_TIDLIGERE),P=u(g.UTENLANDSOPPHOLD_SENERE),k=H(a);return e.jsxs(E,{children:[e.jsx(w,{size:"large",children:e.jsx(s,{id:"Søknad.Pageheading"})}),e.jsxs(y,{appName:"Engangsstønad",stepConfig:p,sendSøknad:i,cancelApplication:l.avbrytSøknad,goToPreviousStep:l.goToPreviousDefaultStep,onContinueLater:l.fortsettSøknadSenere,children:[e.jsx(N,{søker:n}),e.jsx(y.Punkt,{tittel:o.formatMessage({id:"OppsummeringSteg.OmBarnet"}),children:e.jsx(q,{omBarnet:a,dokumentasjon:c})}),e.jsx(L,{familiehendelseDato:k[0],hendelseType:k[1],utenlandsopphold:j,tidligereUtenlandsopphold:b,senereUtenlandsopphold:P})]})]})},V=T;T.__docgenInfo={description:"",methods:[],displayName:"OppsummeringSteg",props:{søker:{required:!0,tsType:{name:"intersection",raw:`{
    fødselsdato: string;
    kjønn: Kjønn;
    bankkonto?: Bankkonto;
    sivilstand?: Sivilstand;
    barn: SøkerBarn[];
} & PersonBase`,elements:[{name:"signature",type:"object",raw:`{
    fødselsdato: string;
    kjønn: Kjønn;
    bankkonto?: Bankkonto;
    sivilstand?: Sivilstand;
    barn: SøkerBarn[];
}`,signature:{properties:[{key:"fødselsdato",value:{name:"string",required:!0}},{key:"kjønn",value:{name:"union",raw:"'M' | 'K'",elements:[{name:"literal",value:"'M'"},{name:"literal",value:"'K'"}],required:!0}},{key:"bankkonto",value:{name:"Bankkonto",required:!1}},{key:"sivilstand",value:{name:"Sivilstand",required:!1}},{key:"barn",value:{name:"Array",elements:[{name:"intersection",raw:`{
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
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]}}]}],raw:"SøkerBarn[]",required:!0}}]}},{name:"signature",type:"object",raw:`{
    fnr: string;
    fornavn: string;
    mellomnavn?: string;
    etternavn: string;
}`,signature:{properties:[{key:"fnr",value:{name:"string",required:!0}},{key:"fornavn",value:{name:"string",required:!0}},{key:"mellomnavn",value:{name:"string",required:!1}},{key:"etternavn",value:{name:"string",required:!0}}]}}]},description:""},sendSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"(abortSignal: AbortSignal) => Promise<void>",signature:{arguments:[{type:{name:"AbortSignal"},name:"abortSignal"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},mellomlagreOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""}}};export{V as O,_ as e};
