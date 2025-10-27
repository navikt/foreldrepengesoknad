import{j as e,ae as r,M as t,af as s,V as y,f as b,S as T,ag as A,ah as q}from"./iframe-CZR-dqgz.js";import{P as o,d as w,h as x,e as v,i as E,j as O,n as S,k as u,C as l}from"./useEsNavigator-kzB1D1Lx.js";const g=n=>"terminbekreftelsedato"in n;function D({dokumentasjon:n}){return e.jsxs(e.Fragment,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"DokumentasjonOppsummering.Terminbekreftelse"})}),e.jsx(r.Answer,{children:s(n.terminbekreftelsedato)})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"DokumentasjonOppsummering.TerminbekreftelseDokument"})}),e.jsx(r.Answer,{children:e.jsx(y,{gap:"space-8",children:n.vedlegg.map(a=>a.filename)})})]})]})}function N({dokumentasjon:n}){return e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"DokumentasjonOppsummering.adopsjonsdokumenter"})}),e.jsx(r.Answer,{children:e.jsx(y,{gap:"space-8",children:n.vedlegg.map(a=>a.filename)})})]})}function k({dokumentasjon:n,onVilEndreSvar:a}){return!n||n.vedlegg.length===0?null:e.jsxs(r,{children:[e.jsx(r.Header,{children:e.jsx(r.Heading,{level:"2",children:e.jsx(t,{id:"DokumentasjonOppsummering.tittel"})})}),e.jsx(r.Answers,{children:g(n)?e.jsx(D,{dokumentasjon:n}):e.jsx(N,{dokumentasjon:n})}),e.jsx(r.Footer,{children:e.jsx(r.EditLink,{onClick:()=>a(g(n)?o.TERMINBEKREFTELSE:o.ADOPSJONSBEKREFTELSE),children:e.jsx(t,{id:"Oppsummering.EndreSvar"})})})]})}k.__docgenInfo={description:"",methods:[],displayName:"DokumentasjonOppsummering",props:{dokumentasjon:{required:!1,tsType:{name:"union",raw:"TerminDokumentasjon | Vedlegg",elements:[{name:"intersection",raw:`{
    terminbekreftelsedato: string;
} & Vedlegg`,elements:[{name:"signature",type:"object",raw:`{
    terminbekreftelsedato: string;
}`,signature:{properties:[{key:"terminbekreftelsedato",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    vedlegg: Attachment[];
}`,signature:{properties:[{key:"vedlegg",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]",required:!0}}]}}]},{name:"signature",type:"object",raw:`{
    vedlegg: Attachment[];
}`,signature:{properties:[{key:"vedlegg",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dokumenterer?: Dokumenterer;
    id: string;
    filename: string;
    filesize: number;
    file: File;
    uuid?: string;
    pending: boolean;
    uploaded: boolean;
    type: AttachmentType;
    skjemanummer: Skjemanummer;
    innsendingsType: VedleggInnsendingType;
    error?: any;
    beskrivelse?: string;
}`,signature:{properties:[{key:"dokumenterer",value:{name:"signature",type:"object",raw:`{
    type: DokumentererType;
    arbeidsforhold?: FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto;
    perioder?: ÅpenPeriodeDto[];
}`,signature:{properties:[{key:"type",value:{name:"union",raw:"'BARN' | 'OPPTJENING' | 'UTTAK' | 'TILRETTELEGGING'",elements:[{name:"literal",value:"'BARN'"},{name:"literal",value:"'OPPTJENING'"},{name:"literal",value:"'UTTAK'"},{name:"literal",value:"'TILRETTELEGGING'"}],required:!0}},{key:"arbeidsforhold",value:{name:"union",raw:"FrilanserDto | PrivatArbeidsgiverDto | SelvstendigNæringsdrivendeDto | VirksomhetDto",elements:[{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'frilanser';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'frilanser';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'frilanser'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'privat';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'privat';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'privat'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'selvstendig';
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'selvstendig';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'selvstendig'",required:!0}}]}}]},{name:"intersection",raw:`ArbeidsforholdDto & {
    type: 'virksomhet';
} & {
    id: string;
}`,elements:[{name:"signature",type:"object",raw:`{
    type: string;
}`,signature:{properties:[{key:"type",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    type: 'virksomhet';
}`,signature:{properties:[{key:"type",value:{name:"literal",value:"'virksomhet'",required:!0}}]}},{name:"signature",type:"object",raw:`{
    id: string;
}`,signature:{properties:[{key:"id",value:{name:"string",required:!0}}]}}]}],required:!1}},{key:"perioder",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    fom: string;
    tom?: string;
}`,signature:{properties:[{key:"fom",value:{name:"string",required:!0}},{key:"tom",value:{name:"string",required:!1}}]}}],raw:"ÅpenPeriodeDto[]",required:!1}}]},required:!1}},{key:"id",value:{name:"string",required:!0}},{key:"filename",value:{name:"string",required:!0}},{key:"filesize",value:{name:"number",required:!0}},{key:"file",value:{name:"File",required:!0}},{key:"uuid",value:{name:"string",required:!1}},{key:"pending",value:{name:"boolean",required:!0}},{key:"uploaded",value:{name:"boolean",required:!0}},{key:"type",value:{name:"AttachmentType",required:!0}},{key:"skjemanummer",value:{name:"Skjemanummer",required:!0}},{key:"innsendingsType",value:{name:"union",raw:"'LASTET_OPP' | 'SEND_SENERE' | 'AUTOMATISK'",elements:[{name:"literal",value:"'LASTET_OPP'"},{name:"literal",value:"'SEND_SENERE'"},{name:"literal",value:"'AUTOMATISK'"}],required:!0}},{key:"error",value:{name:"any",required:!1}},{key:"beskrivelse",value:{name:"string",required:!1}}]}}],raw:"Attachment[]",required:!0}}]}}]},description:""},onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"(path: Path) => Promise<void>",signature:{arguments:[{type:{name:"Path"},name:"path"}],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""}}};function P({omBarnet:n}){const a=v(n);return n.antallBarn===1?e.jsx(t,{id:"OmBarnetOppsummering.EttBarn"}):n.antallBarn===2&&!a?e.jsx(t,{id:"OmBarnetOppsummering.Tvillinger"}):n.antallBarn===2&&a?e.jsx(t,{id:"OmBarnetOppsummering.ToBarn"}):e.jsx(t,{id:"OmBarnetOppsummering.FlereBarn"})}const c=({omBarnet:n,onVilEndreSvar:a})=>{const d=v(n),i=x(n),m=w(n);return e.jsxs(r,{children:[e.jsx(r.Header,{children:e.jsx(r.Heading,{level:"2",children:e.jsx(t,{id:"OmBarnetOppsummering.tittel"})})}),e.jsxs(r.Answers,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"OmBarnetOppsummering.SoknadenGjelder"})}),e.jsx(r.Value,{children:e.jsx(P,{omBarnet:n})})]}),m&&e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"OmBarnetOppsummering.MedFødselsdato",values:{antall:1}})}),e.jsx(r.Value,{children:s(n.fødselsdato)})]}),i&&e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"OmBarnetOppsummering.MedTermindato"})}),e.jsx(r.Value,{children:s(n.termindato)})]}),d&&e.jsxs(e.Fragment,{children:[e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"OmBarnetOppsummering.MedAdopsjonsdato"})}),e.jsx(r.Value,{children:s(n.adopsjonsdato)})]}),e.jsxs(r.Answer,{children:[e.jsx(r.Label,{children:e.jsx(t,{id:"OmBarnetOppsummering.MedFødselsdato",values:{antall:n.fødselsdatoer.length}})}),e.jsx(r.Value,{children:n.fødselsdatoer.map(({dato:p})=>s(p)).join(", ")})]})]})]}),e.jsx(r.Footer,{children:e.jsx(r.EditLink,{onClick:a,children:e.jsx(t,{id:"Oppsummering.EndreSvar"})})})]})};c.__docgenInfo={description:"",methods:[],displayName:"OmBarnetOppsummering",props:{omBarnet:{required:!0,tsType:{name:"union",raw:"Fødsel | Adopsjon",elements:[{name:"union",raw:"BarnetErFødt | BarnetErIkkeFødt",elements:[{name:"signature",type:"object",raw:`{
    erBarnetFødt: true;
    antallBarn: number;
    fødselsdato: string;
    termindato: string;
}`,signature:{properties:[{key:"erBarnetFødt",value:{name:"literal",value:"true",required:!0}},{key:"antallBarn",value:{name:"number",required:!0}},{key:"fødselsdato",value:{name:"string",required:!0}},{key:"termindato",value:{name:"string",required:!0}}]}},{name:"signature",type:"object",raw:`{
    erBarnetFødt: false;
    antallBarn: number;
    termindato: string;
}`,signature:{properties:[{key:"erBarnetFødt",value:{name:"literal",value:"false",required:!0}},{key:"antallBarn",value:{name:"number",required:!0}},{key:"termindato",value:{name:"string",required:!0}}]}}]},{name:"signature",type:"object",raw:`{
    adopsjonAvEktefellesBarn: boolean;
    adopsjonsdato: string;
    antallBarn: number;
    søkerAdopsjonAlene?: boolean;
    fødselsdatoer: Array<{
        dato: string;
    }>;
}`,signature:{properties:[{key:"adopsjonAvEktefellesBarn",value:{name:"boolean",required:!0}},{key:"adopsjonsdato",value:{name:"string",required:!0}},{key:"antallBarn",value:{name:"number",required:!0}},{key:"søkerAdopsjonAlene",value:{name:"boolean",required:!1}},{key:"fødselsdatoer",value:{name:"Array",elements:[{name:"signature",type:"object",raw:`{
    dato: string;
}`,signature:{properties:[{key:"dato",value:{name:"string",required:!0}}]}}],raw:`Array<{
    dato: string;
}>`,required:!0}}]}}]},description:""},onVilEndreSvar:{required:!0,tsType:{name:"signature",type:"function",raw:"() => void",signature:{arguments:[],return:{name:"void"}}},description:""}}};const B=({sendSøknad:n,mellomlagreOgNaviger:a})=>{const d=E(),i=O(a),m=b(),p=S(u(l.OM_BARNET)),j=u(l.DOKUMENTASJON),f=u(l.UTENLANDSOPPHOLD_TIDLIGERE),h=u(l.UTENLANDSOPPHOLD_SENERE);return e.jsx(T,{pageTitle:m.formatMessage({id:"Søknad.Pageheading"}),children:e.jsxs(A,{appName:"Engangsstønad",stepConfig:d,sendSøknad:n,onAvsluttOgSlett:i.avbrytSøknad,goToPreviousStep:i.goToPreviousDefaultStep,onFortsettSenere:i.fortsettSøknadSenere,onStepChange:i.goToNextStep,children:[e.jsx(c,{omBarnet:p,onVilEndreSvar:()=>i.goToNextStep(o.OM_BARNET)}),e.jsx(q,{onVilEndreSvar:()=>i.goToNextStep(o.UTENLANDSOPPHOLD),tidligereUtenlandsopphold:f??[],senereUtenlandsopphold:h??[]}),e.jsx(k,{dokumentasjon:j,onVilEndreSvar:i.goToNextStep})]})})};B.__docgenInfo={description:"",methods:[],displayName:"OppsummeringSteg",props:{sendSøknad:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""},mellomlagreOgNaviger:{required:!0,tsType:{name:"signature",type:"function",raw:"() => Promise<void>",signature:{arguments:[],return:{name:"Promise",elements:[{name:"void"}],raw:"Promise<void>"}}},description:""}}};export{B as O,g as e};
