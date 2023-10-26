import{j as e}from"./jsx-runtime-69eee039.js";import{B as q,L as Y,g as Te,u as h,i as t,t as J,T as Ue,f as b,z as nr,x as j,bg as H,h as z,bh as Ne,bi as Fe,Z as tr,bj as qe,b as $,aG as sr,_ as ir,aa as ar,k as Ae,bk as lr}from"./validationUtils-3e3f35a1.js";import{y as or,q as ve,x as dr,P as B,S as ne,M as E,U as be,J as pr,o as mr,K as ur,L as gr,A as cr,N as kr,u as fr,t as hr}from"./Periodene-52ff0d39.js";import{r as A}from"./index-7c191284.js";import"./_baseToString-4b695375.js";import"./_createSet-32a27317.js";import{i as Pe,p as _e,o as Me,b as De,m as jr,g as ye,a as P,u as vr,c as _r,L as yr}from"./useSøknad-67949f34.js";import{u as Be}from"./useSøkerinfo-7098b049.js";import{a as xr,u as Nr,b as Fr,s as Ar,g as br,c as Or}from"./useSaveLoadedRoute-ccd0af0e.js";import{c as Er}from"./index-e13aeee6.js";import{B as d,L as Le}from"./Link-b834ea2b.js";import{f as Ir}from"./dateUtils-5eafd83c.js";import{g as Sr}from"./arbeidsforholdUtils-ee247546.js";import{A as C,H as Vr,a as Tr}from"./Næring-34689996.js";import{u as Ur,S as Oe,a as Ee}from"./mapSøkerinfoDTO-c2e267b6.js";import{A as qr,r as Pr}from"./api-02a26928.js";import{A as Mr,b as Dr,s as Ie,F as Br,d as Lr,U as Rr,e as Kr}from"./submitUtils-3190d349.js";import{D as Gr}from"./leggTilPeriode-6be5dfc1.js";import{d as Hr,s as te}from"./Uttaksplan-063eebcd.js";import{A as Se}from"./AttachmentType-f6ad37cf.js";const o=({title:r,visible:n,children:s})=>e.jsxs(q,{padBottom:"l",visible:n,children:[e.jsx(Y,{children:r}),s]});try{o.displayName="OppsummeringsPunkt",o.__docgenInfo={description:"",displayName:"OppsummeringsPunkt",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},visible:{defaultValue:null,description:"",name:"visible",required:!1,type:{name:"boolean"}}}}}catch{}const Cr=r=>Array.isArray(r),w=({ledetekst:r,children:n,className:s})=>e.jsxs("div",{className:s,children:[e.jsx(Y,{children:r}),!Array.isArray(n)&&Cr(n.props.children)?n.props.children.map(i=>e.jsx(d,{className:"feltoppsummering__verdi",children:i},Te())):n]});try{w.displayName="InnholdMedLedetekst",w.__docgenInfo={description:"",displayName:"InnholdMedLedetekst",props:{ledetekst:{defaultValue:null,description:"",name:"ledetekst",required:!0,type:{name:"string"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const se=({ledetekst:r,children:n,className:s})=>e.jsx(w,{className:`feltoppsummering ${s}`,ledetekst:r,children:n});try{se.displayName="KompleksFeltoppsummering",se.__docgenInfo={description:"",displayName:"KompleksFeltoppsummering",props:{className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}},ledetekst:{defaultValue:null,description:"",name:"ledetekst",required:!0,type:{name:"string"}}}}}catch{}const M=r=>{const{ledetekst:n,vedlegg:s}=r,i=h(),l=()=>s.filter(a=>!J(a)).map(({url:a,id:p,filename:u})=>e.jsx(Le,{href:a,target:"_blank",children:u},p));return e.jsx(se,{className:"oppsummeringAvDokumentasjon",ledetekst:n||t(i,"vedlagtdokumentasjon"),children:s&&s.filter(a=>!J(a)).length>0?e.jsx("div",{children:l()}):e.jsx("div",{children:e.jsx(Ue,{variant:"warning",children:t(i,"oppsummering.andreInntekter.dokumentasjon.mangler")})})})};try{M.displayName="OppsummeringAvDokumentasjon",M.__docgenInfo={description:"",displayName:"OppsummeringAvDokumentasjon",props:{ledetekst:{defaultValue:null,description:"",name:"ledetekst",required:!1,type:{name:"string"}},vedlegg:{defaultValue:null,description:"",name:"vedlegg",required:!0,type:{name:"Attachment[]"}}}}}catch{}const ie=({annenForelder:r,søker:n,søkerrolle:s,barn:i,farMedmorErAleneOmOmsorg:l})=>{const a=h(),p=Pe(s),{dokumentasjonAvAleneomsorg:u}=i;return e.jsxs(e.Fragment,{children:[or(r)&&e.jsx(o,{title:t(a,"oppsummering.annenForelder.ikkeOppgitt")}),ve(r)&&e.jsxs(e.Fragment,{children:[e.jsx(o,{title:t(a,"oppsummering.annenForelder.navn"),children:e.jsx(d,{children:`${r.fornavn} ${r.etternavn}`})}),e.jsx(o,{title:t(a,"oppsummering.annenForelder.fnr"),children:e.jsx(d,{children:r.fnr})}),e.jsx(o,{title:n.erAleneOmOmsorg?t(a,"oppsummering.annenForelder.aleneOmOmsorg.tittel"):t(a,"oppsummering.annenForelder.fellesOmsorg.tittel"),children:e.jsx(d,{children:e.jsx(b,{id:n.erAleneOmOmsorg?"oppsummering.annenForelder.aleneOmOmsorg.tekst":"oppsummering.annenForelder.fellesOmsorg.tekst"})})}),!n.erAleneOmOmsorg&&e.jsx(o,{title:t(a,"oppsummering.annenForelder.rettPåForeldrepengerINorge",{navn:r.fornavn}),children:e.jsx(d,{children:e.jsx(b,{id:r.harRettPåForeldrepengerINorge?"ja":"nei"})})}),!n.erAleneOmOmsorg&&!r.harRettPåForeldrepengerINorge&&e.jsx(o,{title:t(a,"oppsummering.annenForelder.harOppholdtSegIEØS",{navn:r.fornavn}),children:e.jsx(d,{children:e.jsx(b,{id:r.harOppholdtSegIEØS?"ja":"nei"})})}),!n.erAleneOmOmsorg&&r.harOppholdtSegIEØS===!0&&e.jsx(o,{title:t(a,"oppsummering.annenForelder.rettPåForeldrepengerIEØS",{navn:r.fornavn}),children:e.jsx(d,{children:e.jsx(b,{id:r.harRettPåForeldrepengerIEØS?"ja":"nei"})})}),p&&!n.erAleneOmOmsorg&&!r.harRettPåForeldrepengerINorge&&!r.harRettPåForeldrepengerIEØS&&e.jsx(o,{title:t(a,"annenForelder.erMorUfør",{navn:r.fornavn}),children:e.jsx(d,{children:e.jsx(b,{id:r.erUfør?"ja":"nei"})})})]}),l&&p&&e.jsx(M,{vedlegg:u||[],ledetekst:t(a,"oppsummering.annenForelder.dokumentasjonAvAleneomsorg")})]})};try{ie.displayName="AnnenForelderOppsummering",ie.__docgenInfo={description:"",displayName:"AnnenForelderOppsummering",props:{annenForelder:{defaultValue:null,description:"",name:"annenForelder",required:!0,type:{name:"AnnenForelder"}},søker:{defaultValue:null,description:"",name:"søker",required:!0,type:{name:"Søker"}},søkerrolle:{defaultValue:null,description:"",name:"søkerrolle",required:!0,type:{name:"enum",value:[{value:'"far"'},{value:'"medmor"'},{value:'"mor"'}]}},barn:{defaultValue:null,description:"",name:"barn",required:!0,type:{name:"Barn"}},farMedmorErAleneOmOmsorg:{defaultValue:null,description:"",name:"farMedmorErAleneOmOmsorg",required:!0,type:{name:"boolean"}}}}}catch{}const ae=({barn:r,familiehendelsesdato:n})=>{const s=h();return _e(r)||Ir(n)?null:e.jsxs(e.Fragment,{children:[e.jsx(o,{title:t(s,"oppsummering.barn.adoptertIUtlandet"),children:e.jsx(d,{children:e.jsx(b,{id:r.adoptertIUtlandet?"ja":"nei"})})}),e.jsx(o,{title:t(s,"oppsummering.barn.ankomstdato"),visible:nr(r.ankomstdato),children:e.jsx(d,{children:j(r.ankomstdato)})})]})};try{ae.displayName="BarnAdoptertIUtlandetDetaljer",ae.__docgenInfo={description:"",displayName:"BarnAdoptertIUtlandetDetaljer",props:{barn:{defaultValue:null,description:"",name:"barn",required:!0,type:{name:"AdoptertStebarn | AdoptertAnnetBarn"}},familiehendelsesdato:{defaultValue:null,description:"",name:"familiehendelsesdato",required:!0,type:{name:"Date"}}}}}catch{}const Jr=(r,n)=>r===1?t(n,"oppsummering.barn.antallBarn.ettBarn"):r===2?t(n,"oppsummering.barn.antallBarn.toBarn"):t(n,"oppsummering.barn.antallBarn.flere",{antallBarn:r}),$r=r=>r===De.UFØDT?"Termin":"Fødselsdato",wr=r=>jr(r)?j(r.termindato):j(r.fødselsdatoer[0]),le=({barn:r,familiehendelsesdato:n})=>{const s=h();return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:t(s,"oppsummering.barn.søknadenGjelder"),children:e.jsx(d,{children:Jr(r.antallBarn,s)})}),e.jsx(o,{title:$r(r.type),children:e.jsx(d,{children:wr(r)})}),(Me(r)||_e(r))&&e.jsxs(e.Fragment,{children:[e.jsx(o,{title:t(s,"oppsummering.barn.gjelderSøknadenStebarnsadopsjon"),children:e.jsx(d,{children:e.jsx(b,{id:r.type===De.ADOPTERT_STEBARN?"ja":"nei"})})}),e.jsx(o,{title:t(s,"oppsummering.barn.adopsjonsdato"),children:e.jsx(d,{children:j(r.adopsjonsdato)})}),e.jsx(ae,{barn:r,familiehendelsesdato:n})]})]})};try{le.displayName="BarnOppsummering",le.__docgenInfo={description:"",displayName:"BarnOppsummering",props:{barn:{defaultValue:null,description:"",name:"barn",required:!0,type:{name:"Barn"}},familiehendelsesdato:{defaultValue:null,description:"",name:"familiehendelsesdato",required:!0,type:{name:"Date"}}}}}catch{}const S=({title:r,children:n})=>{const s=z("oppsummeringsPanel");return e.jsx(H,{children:e.jsxs(H.Item,{className:s.element("specificity"),children:[e.jsx(H.Header,{className:s.element("header"),children:r}),e.jsx(H.Content,{children:n})]})})};try{S.displayName="OppsummeringsPanel",S.__docgenInfo={description:"",displayName:"OppsummeringsPanel",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}}}}}catch{}const oe=({søkerinfo:r})=>e.jsx(o,{title:`${r.person.fornavn} ${r.person.etternavn}`,children:e.jsx(d,{children:r.person.fnr})});try{oe.displayName="Personalia",oe.__docgenInfo={description:"",displayName:"Personalia",props:{søkerinfo:{defaultValue:null,description:"",name:"søkerinfo",required:!0,type:{name:"Søkerinfo"}}}}}catch{}const W=({utenlandsopphold:r,tidligereOpphold:n})=>{const s=h(),i=z("utenlandsoppholdOppsummeringListe");return e.jsx("ul",{className:i.block,children:r.map(l=>e.jsxs("li",{className:i.element("listElement"),children:[e.jsx(d,{children:n?t(s,"oppsummering.utenlandsopphold.harBoddINorge.utenlands",{land:Ne.getName(l.land,"nb")}):t(s,"oppsummering.utenlandsopphold.skalBoINorge.utenlands",{land:Ne.getName(l.land,"nb")})}),e.jsxs(d,{children:[j(l.tidsperiode.fom)," - ",j(l.tidsperiode.tom)]})]},`${l.land}${l.tidsperiode.fom}${l.tidsperiode.tom}`))})};try{W.displayName="UtenlandsoppholdOppsummeringListe",W.__docgenInfo={description:"",displayName:"UtenlandsoppholdOppsummeringListe",props:{utenlandsopphold:{defaultValue:null,description:"",name:"utenlandsopphold",required:!0,type:{name:"Utenlandsopphold[]"}},tidligereOpphold:{defaultValue:null,description:"",name:"tidligereOpphold",required:!0,type:{name:"boolean"}}}}}catch{}const Wr=(r,n,s)=>{let i=!0;return n.forEach(l=>{Fe(l.tidsperiode,r)&&(i=!1)}),s.forEach(l=>{Fe(l.tidsperiode,r)&&(i=!1)}),i},Yr=r=>Me(r)||_e(r),de=({informasjonOmUtenlandsopphold:r,barn:n})=>{const s=h(),{senereOpphold:i,tidligereOpphold:l}=r,a=ye(n),p=Wr(a,l,i);return e.jsxs(e.Fragment,{children:[e.jsxs(o,{title:t(s,"oppsummering.utenlandsopphold.harBoddINorge"),children:[r.iNorgeSiste12Mnd?e.jsx(d,{children:t(s,"oppsummering.utenlandsopphold.harBoddINorge.norge")}):null,e.jsx(W,{utenlandsopphold:r.tidligereOpphold,tidligereOpphold:!0})]}),e.jsxs(o,{title:t(s,"oppsummering.utenlandsopphold.skalBoINorge"),children:[r.iNorgeNeste12Mnd?e.jsx(d,{children:t(s,"oppsummering.utenlandsopphold.skalBoINorge.norge")}):null,e.jsx(W,{utenlandsopphold:r.senereOpphold,tidligereOpphold:!1})]}),e.jsx(o,{title:Yr(n)?t(s,"oppsummering.utenlandsopphold.erINorgeOmsorgsovertakelsesdato"):t(s,"oppsummering.utenlandsopphold.erINorgePåFødselstidspunkt"),children:e.jsx(d,{children:e.jsx(b,{id:p?"ja":"nei"})})})]})};try{de.displayName="UtenlandsoppholdOppsummering",de.__docgenInfo={description:"",displayName:"UtenlandsoppholdOppsummering",props:{informasjonOmUtenlandsopphold:{defaultValue:null,description:"",name:"informasjonOmUtenlandsopphold",required:!0,type:{name:"InformasjonOmUtenlandsopphold"}},barn:{defaultValue:null,description:"",name:"barn",required:!0,type:{name:"Barn"}}}}}catch{}var Re=(r=>(r.harGodkjentOppsummering="harGodkjentOppsummering",r))(Re||{});const zr={harGodkjentOppsummering:!1},Xr=()=>zr,re=tr(),Zr=r=>n=>{if(n!==!0)return t(r,"valideringsfeil.oppsummering.harGodkjentOppsummering.påkrevd")},pe=({annenInntekt:r})=>{const n=h(),{type:s,vedlegg:i}=r;if(s===C.JOBB_I_UTLANDET){const l=r;return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:t(n,"oppsummering.andreInntekter.arbeidsgiverNavn"),children:e.jsx(d,{children:l.arbeidsgiverNavn})}),e.jsx(o,{title:t(n,"oppsummering.andreInntekter.arbeidsgiverLand"),children:e.jsx(d,{children:qe.getName(l.land,"nb")})})]})}if(s===C.VENTELØNN||s===C.SLUTTPAKKE||s===C.MILITÆRTJENESTE){const l=()=>i.filter(a=>!J(a)).map(({url:a,id:p,filename:u})=>e.jsx(Le,{href:a,target:"_blank",children:u},p));return e.jsx(o,{title:t(n,"oppsummering.andreInntekter.vedlagtdokumentasjon"),children:(i||[]).filter(a=>!J(a)).length>0?l():e.jsx(Ue,{variant:"warning",children:t(n,"oppsummering.andreInntekter.dokumentasjon.mangler")})})}return null};try{pe.displayName="AnnenInntektDetaljer",pe.__docgenInfo={description:"",displayName:"AnnenInntektDetaljer",props:{annenInntekt:{defaultValue:null,description:"",name:"annenInntekt",required:!0,type:{name:"AnnenInntekt"}}}}}catch{}const L=({list:r})=>e.jsx("ul",{className:"oppsummeringsliste",children:r.map(n=>e.jsxs("li",{className:"oppsummeringsliste__element",children:[e.jsxs("div",{className:"oppsummeringsliste__element__heading",children:[e.jsx(Y,{children:n.headerVenstre}),e.jsx("div",{className:"høyrestiltTekst",children:e.jsx(d,{children:n.headerHøyre})})]}),n.content&&e.jsx("div",{className:"oppsummeringsliste__element__content",children:n.content})]},n.key))});try{L.displayName="InntekterTabell",L.__docgenInfo={description:"",displayName:"InntekterTabell",props:{list:{defaultValue:null,description:"",name:"list",required:!0,type:{name:"{ key: string; headerVenstre: string; headerHøyre: string; content?: ReactElement<any, string | JSXElementConstructor<any>> | undefined; }[]"}}}}}catch{}const me=()=>{const r=h(),{søker:{harHattAnnenInntektSiste10Mnd:n,andreInntekterSiste10Mnd:s}}=P();return!n||!s?e.jsx(o,{title:t(r,"oppsummering.andreInntekter.tittel"),children:e.jsx(d,{children:t(r,"oppsummering.andreInntekter.ikkeHattAndreInntekter")})}):e.jsx(o,{title:t(r,"oppsummering.andreInntekter.tittel"),children:e.jsx(L,{list:s.map(i=>({key:i.type+i.tidsperiode,headerVenstre:t(r,`inntektstype.${i.type.toLowerCase()}`),headerHøyre:t(r,"tidsintervall",{fom:j($(i.tidsperiode.fom)),tom:i.pågående?"pågående":j($(i.tidsperiode.tom))}),content:e.jsx(pe,{annenInntekt:i})}))})})};try{me.displayName="AndreInntekterOppsummering",me.__docgenInfo={description:"",displayName:"AndreInntekterOppsummering",props:{}}}catch{}const ue=()=>{const r=h(),{søker:{frilansInformasjon:n,harJobbetSomFrilansSiste10Mnd:s}}=P();if(!n||!s)return e.jsx(o,{title:t(r,"oppsummering.frilans.tittel"),children:e.jsx(d,{children:t(r,"oppsummering.frilans.ikkeFrilans")})});const{oppstart:i,jobberFremdelesSomFrilans:l,driverFosterhjem:a,harJobbetForNærVennEllerFamilieSiste10Mnd:p,oppdragForNæreVennerEllerFamilieSiste10Mnd:u}=n;return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:t(r,"oppsummering.frilans.tittel")}),e.jsx(o,{title:t(r,"oppsummering.frilans.oppstartsdato"),children:e.jsx(d,{children:j(i)})}),e.jsx(o,{title:t(r,"oppsummering.frilans.fremdelesFrilans"),children:e.jsx(d,{children:l?t(r,"ja"):t(r,"nei")})}),e.jsx(o,{title:t(r,"oppsummering.frilans.driverFosterhjem"),children:e.jsx(d,{children:a?t(r,"ja"):t(r,"nei")})}),e.jsxs(o,{title:t(r,"oppsummering.frilans.frilansArbeidForNæreVennerEllerFamilieSiste10Mnd"),children:[e.jsx(q,{visible:!p,margin:"none",children:e.jsx(d,{children:t(r,"oppsummering.frilans.harIkkeUtførtFrilansArbeidForNæreVennerEllerFamilieSiste10Mnd")})}),e.jsx(q,{visible:p,margin:"none",children:e.jsx(L,{list:u.map(({navnPåArbeidsgiver:c,tidsperiode:f,pågående:v})=>({key:c+f,headerVenstre:c,headerHøyre:t(r,"tidsintervall",{fom:j(f.fom),tom:v?"pågående":j(f.tom)})}))})})]})]})};try{ue.displayName="FrilansOppsummering",ue.__docgenInfo={description:"",displayName:"FrilansOppsummering",props:{}}}catch{}const Qr=({næring:r})=>{const n=h(),{næringstyper:s,organisasjonsnummer:i,næringsinntekt:l,registrertINorge:a,registrertILand:p,harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene:u,hattVarigEndringAvNæringsinntektSiste4Kalenderår:c,endringAvNæringsinntektInformasjon:f,harRegnskapsfører:v,regnskapsfører:_}=r;return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:t(n,"oppsummering.selvstendigNæringsdrivende.næringstype"),children:e.jsx(d,{children:t(n,`næringstype.${s[0].toLowerCase()}`)})}),i&&e.jsx(o,{title:t(n,"oppsummering.selvstendigNæringsdrivende.orgnr"),children:e.jsx(d,{children:i})}),l&&e.jsx(o,{title:t(n,"oppsummering.selvstendigNæringsdrivende.næringsinntekt"),children:e.jsx(d,{children:l})}),a||p&&e.jsx(o,{title:t(n,"oppsummering.selvstendigNæringsdrivende.registrertLand"),children:e.jsx(d,{children:a?"Norge":qe.getName(p,"nb")})}),u&&e.jsx(o,{title:t(n,"oppsummering.selvstendigNæringsdrivende.blittYrkesaktivSiste3År"),children:e.jsx(d,{children:u?t(n,"ja"):t(n,"nei")})}),c===!0&&e.jsxs(e.Fragment,{children:[e.jsx(o,{title:t(n,"oppsummering.selvstendigNæringsdrivende.datoForEndringAvNæringsinntekt"),children:e.jsx(d,{children:j(f.dato)})}),e.jsx(o,{title:t(n,"oppsummering.selvstendigNæringsdrivende.næringsinntektEtterEndring"),children:e.jsx(d,{children:f.næringsinntektEtterEndring})}),e.jsx(o,{title:t(n,"oppsummering.selvstendigNæringsdrivende.forklaring"),children:e.jsx(d,{children:f.forklaring})})]}),v===!0&&_&&e.jsxs(e.Fragment,{children:[e.jsx(o,{title:t(n,"oppsummering.selvstendigNæringsdrivende.regnskapsførerNavn"),children:e.jsx(d,{children:_.navn})}),e.jsx(o,{title:t(n,"oppsummering.selvstendigNæringsdrivende.regnskapsførerTlf"),children:e.jsx(d,{children:_.telefonnummer})}),e.jsx(o,{title:t(n,"oppsummering.selvstendigNæringsdrivende.regnskapsførerNærVennEllerFamilie"),children:e.jsx(d,{children:_.erNærVennEllerFamilie?t(n,"ja"):t(n,"nei")})})]}),v===!1&&e.jsx(o,{title:t(n,"oppsummering.selvstendigNæringsdrivende.regnskapsfører"),children:e.jsx(d,{children:t(n,"oppsummering.selvstendigNæringsdrivende.harIkkeRegnskapsfører")})})]})};try{Nringsdetaljer.displayName="Nringsdetaljer",Nringsdetaljer.__docgenInfo={description:"",displayName:"Nringsdetaljer",props:{næring:{defaultValue:null,description:"",name:"næring",required:!0,type:{name:"Næring"}}}}}catch{}const en=()=>{const r=h(),{søker:{selvstendigNæringsdrivendeInformasjon:n,harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd:s}}=P();return!n||!s?e.jsx(o,{title:t(r,"oppsummering.selvstendigNæringsdrivende.tittel"),children:e.jsx(d,{children:t(r,"oppsummering.selvstendigNæringsdrivende.ikkeSelvstendigNæringsdrivende")})}):e.jsx(o,{title:t(r,"oppsummering.selvstendigNæringsdrivende.tittel"),children:e.jsx(L,{list:n.map(i=>({key:i.navnPåNæringen+i.tidsperiode,headerVenstre:i.navnPåNæringen,headerHøyre:t(r,"tidsintervall",{fom:j(i.tidsperiode.fom),tom:i.pågående?"pågående":j(i.tidsperiode.tom)}),content:e.jsx(Qr,{næring:i})}))})})};try{SelvstendigNringsdrivendeOppsummering.displayName="SelvstendigNringsdrivendeOppsummering",SelvstendigNringsdrivendeOppsummering.__docgenInfo={description:"",displayName:"SelvstendigNringsdrivendeOppsummering",props:{}}}catch{}const ge=()=>{const r=h(),{arbeidsforhold:n}=Be(),{barn:s,søkersituasjon:i}=P(),l=i.situasjon==="adopsjon",a=Pe(i.rolle),p=ye(s),u=Sr(n,l,a,$(p)),c=u!==void 0&&u.length>0;return e.jsxs(e.Fragment,{children:[e.jsxs(o,{title:t(r,"oppsummering.inntekt.registrerteArbeidsforhold"),children:[e.jsx(Vr,{harArbeidsforhold:c}),e.jsx(Tr,{harArbeidsforhold:c,arbeidsforhold:u})]}),e.jsx(ue,{}),e.jsx(en,{}),e.jsx(me,{})]})};try{ge.displayName="ArbeidsforholdOgAndreInntekterOppsummering",ge.__docgenInfo={description:"",displayName:"ArbeidsforholdOgAndreInntekterOppsummering",props:{}}}catch{}const Ve={"tilleggsopplysning.begrunnelseForSenEndring":"Begrunnelse for å søke om utsettelse","tilleggsopplysning.begrunnelseForSenEndring.SYKDOM":"på grunn av sykdom tilbake i tid","tilleggsopplysning.begrunnelseForSenEndring.UTTAK":"på grunn av uttak mer enn tre måneder tilbake i tid","tilleggsopplysning.begrunnelseForSenEndring.SYKDOM_OG_UTTAK":"på grunn av sykdom tilbake i tid og uttak mer enn tre måneder tilbake i tid"},Ke=r=>{const{tekst:n,ekstraInformasjon:s}=r,l=Ve["tilleggsopplysning.begrunnelseForSenEndring"],a=`tilleggsopplysning.begrunnelseForSenEndring.${s}`,p=Ve[a];return{beskrivelse:l,ekstraInformasjon:p,tekst:n}},Un=r=>r.begrunnelseForSenEndring?{...r,begrunnelseForSenEndring:{...r.begrunnelseForSenEndring,tekst:dr(r.begrunnelseForSenEndring.tekst)}}:r;const x=({feltnavn:r,verdi:n})=>e.jsx(w,{className:"feltoppsummering",ledetekst:r,children:e.jsx("div",{className:"feltoppsummering__verdi",children:n})});try{x.displayName="Feltoppsummering",x.__docgenInfo={description:"",displayName:"Feltoppsummering",props:{feltnavn:{defaultValue:null,description:"",name:"feltnavn",required:!0,type:{name:"string"}},verdi:{defaultValue:null,description:"",name:"verdi",required:!0,type:{name:"string | string[]"}}}}}catch{}const rn=z("list"),ce=r=>{const{data:n,renderElement:s,className:i}=r;return e.jsx("ul",{className:`${rn.block} ${i}`,children:n.map((l,a)=>s(l,a))})};try{ce.displayName="List",ce.__docgenInfo={description:"",displayName:"List",props:{data:{defaultValue:null,description:"",name:"data",required:!0,type:{name:"any[]"}},renderElement:{defaultValue:null,description:"",name:"renderElement",required:!0,type:{name:"(data: any, index: number) => Element"}},className:{defaultValue:null,description:"",name:"className",required:!1,type:{name:"string"}}}}}catch{}const ke=r=>{const{data:n,kompakt:s}=r;return e.jsx(ce,{className:"oppsummeringsliste",data:n,renderElement:i=>A.createElement(nn,{...i,kompakt:s,key:Te()})})},nn=({venstrestiltTekst:r,høyrestiltTekst:n,content:s,kompakt:i})=>e.jsxs("li",{className:Er("oppsummeringsliste__element",{"oppsummeringsliste__element--kompakt":i===!0}),children:[e.jsxs("div",{className:"oppsummeringsliste__element__heading",children:[e.jsx(Y,{as:"h4",children:r}),e.jsx("div",{className:"høyrestiltTekst",children:e.jsx(d,{children:n})})]}),s&&e.jsx("div",{className:"oppsummeringsliste__element__content",children:s})]});try{ke.displayName="Oppsummeringsliste",ke.__docgenInfo={description:"",displayName:"Oppsummeringsliste",props:{data:{defaultValue:null,description:"",name:"data",required:!0,type:{name:"OppsummeringslisteelementProps[]"}},kompakt:{defaultValue:null,description:"",name:"kompakt",required:!1,type:{name:"boolean"}}}}}catch{}const tn=(r,n)=>{if(n){const s=r.find(({arbeidsgiverId:i,arbeidsgiverIdType:l})=>l==="orgnr"&&i===n);if(s)return s.arbeidsgiverNavn}return""},sn=(r,n,s,i)=>{let l=[],a=[];return s!==void 0&&s.length>0&&i&&i.length>0&&(l=s.map(p=>{const u=tn(i,p);return t(r,"oppsummering.uttak.arbeidstaker",{orgnr:p,arbeidsgiverNavn:u})})),n!==void 0&&n.length>0&&(a=n.filter(p=>p!==Mr.arbeidstaker).map(p=>t(r,`oppsummering.uttak.${p.toLowerCase()}`))),l.concat(a)},Ge=(r,{type:n,årsak:s},i)=>{const l=n===B.Utsettelse?"utsettelsesårsak.":"overføringsårsaktype.";return t(r,`uttaksplan.${l+s}`,i)},an=(r,n,s)=>n===ne.Fedrekvote?r.farMedmor:n===ne.Mødrekvote?r.mor:t(s,"annen.forelder"),ln=({periode:r,navnPåForeldre:n,erFarEllerMedmor:s,periodeErNyEllerEndret:i})=>{const{vedlegg:l}=r,a=h(),p=an(n,r.konto,a);return e.jsxs(e.Fragment,{children:[e.jsx(x,{feltnavn:t(a,"oppsummering.uttak.årsak"),verdi:Ge(a,r,{navnAnnenForelder:p})}),Hr(s,r)&&i&&e.jsx(M,{vedlegg:l||[]})]})};try{Overfringsperiodedetaljer.displayName="Overfringsperiodedetaljer",Overfringsperiodedetaljer.__docgenInfo={description:"",displayName:"Overfringsperiodedetaljer",props:{periode:{defaultValue:null,description:"",name:"periode",required:!0,type:{name:"Overføringsperiode"}},navnPåForeldre:{defaultValue:null,description:"",name:"navnPåForeldre",required:!0,type:{name:"NavnPåForeldre"}},erFarEllerMedmor:{defaultValue:null,description:"",name:"erFarEllerMedmor",required:!0,type:{name:"boolean"}},periodeErNyEllerEndret:{defaultValue:null,description:"",name:"periodeErNyEllerEndret",required:!0,type:{name:"boolean"}}}}}catch{}const on=(r,n)=>{switch(n){case E.Arbeid:return t(r,"oppsummering.morsAktivitet.Arbeid");case E.ArbeidOgUtdanning:return t(r,"oppsummering.morsAktivitet.ArbeidOgUtdanning");case E.Innlagt:return t(r,"oppsummering.morsAktivitet.Innlagt");case E.Introduksjonsprogrammet:return t(r,"oppsummering.morsAktivitet.Introduksjonsprogrammet");case E.Kvalifiseringsprogrammet:return t(r,"oppsummering.morsAktivitet.Kvalifiseringsprogrammet");case E.TrengerHjelp:return t(r,"oppsummering.morsAktivitet.TrengerHjelp");case E.Uføre:return t(r,"oppsummering.morsAktivitet.Uføre");case E.Utdanning:return t(r,"oppsummering.morsAktivitet.Utdanning");case E.IkkeOppgitt:return t(r,"oppsummering.morsAktivitet.UtenAktivitetsKrav");default:return sr(n,"Mor har ingen aktivitet")}},He=({morsAktivitet:r,dokumentasjonAvMorsAktivitet:n,visOppsummeringAvDokumentasjon:s})=>{const i=h();return e.jsxs(e.Fragment,{children:[e.jsx(x,{feltnavn:t(i,"oppsummering.morsAktivitet"),verdi:on(i,r)}),s&&e.jsx(M,{ledetekst:t(i,"oppsummering.morsAktivitet.dokumentasjon"),vedlegg:n})]})};try{MorsaktiviteterDetaljer.displayName="MorsaktiviteterDetaljer",MorsaktiviteterDetaljer.__docgenInfo={description:"",displayName:"MorsaktiviteterDetaljer",props:{morsAktivitet:{defaultValue:null,description:"",name:"morsAktivitet",required:!0,type:{name:"enum",value:[{value:'"ARBEID"'},{value:'"UTDANNING"'},{value:'"KVALPROG"'},{value:'"INTROPROG"'},{value:'"TRENGER_HJELP"'},{value:'"INNLAGT"'},{value:'"ARBEID_OG_UTDANNING"'},{value:'"UFØRE"'},{value:'"IKKE_OPPGITT"'}]}},dokumentasjonAvMorsAktivitet:{defaultValue:null,description:"",name:"dokumentasjonAvMorsAktivitet",required:!0,type:{name:"Attachment[]"}},visOppsummeringAvDokumentasjon:{defaultValue:null,description:"",name:"visOppsummeringAvDokumentasjon",required:!0,type:{name:"boolean"}}}}}catch{}const fe=({periode:r,registrerteArbeidsforhold:n,periodeErNyEllerEndret:s,søkerErFarEllerMedmor:i,annenForelder:l})=>{const{konto:a,morsAktivitetIPerioden:p,ønskerSamtidigUttak:u,gradert:c,stillingsprosent:f,orgnumre:v,arbeidsformer:_,vedlegg:N,ønskerFlerbarnsdager:O}=r,k=h();let F="";_&&(F=sn(k,_,v,n).join(`\r
`));const T=ve(l)&&l.harRettPåForeldrepengerINorge;return e.jsxs(e.Fragment,{children:[O!==void 0&&T&&e.jsx(x,{feltnavn:t(k,"oppsummering.uttak.ønskerFlerbarnsdager"),verdi:O?t(k,"ja"):t(k,"nei")}),u!==void 0&&T&&e.jsx(x,{feltnavn:t(k,"oppsummering.uttak.samtidigUttak"),verdi:u?t(k,"ja"):t(k,"nei")}),a!==ne.ForeldrepengerFørFødsel&&u!==!0&&e.jsx(x,{feltnavn:t(k,"oppsummering.uttak.kombineresMedarbeid"),verdi:c?t(k,"ja"):t(k,"nei")}),c===!0&&f&&e.jsx(x,{feltnavn:t(k,"oppsummering.uttak.stillingsprosent"),verdi:f}),_&&e.jsx(x,{feltnavn:t(k,"oppsummering.uttak.arbeidstaker.label"),verdi:F}),te(r,i,l)&&p&&e.jsx(He,{morsAktivitet:p,dokumentasjonAvMorsAktivitet:N||[],visOppsummeringAvDokumentasjon:s})]})};try{fe.displayName="Uttaksperiodedetaljer",fe.__docgenInfo={description:"",displayName:"Uttaksperiodedetaljer",props:{periode:{defaultValue:null,description:"",name:"periode",required:!0,type:{name:"UttaksperiodeBase"}},registrerteArbeidsforhold:{defaultValue:null,description:"",name:"registrerteArbeidsforhold",required:!0,type:{name:"Arbeidsforhold[] | undefined"}},periodeErNyEllerEndret:{defaultValue:null,description:"",name:"periodeErNyEllerEndret",required:!0,type:{name:"boolean"}},søkerErFarEllerMedmor:{defaultValue:null,description:"",name:"søkerErFarEllerMedmor",required:!0,type:{name:"boolean"}},annenForelder:{defaultValue:null,description:"",name:"annenForelder",required:!0,type:{name:"AnnenForelder"}}}}}catch{}const dn=({periode:r,søkerErFarEllerMedmor:n,annenForelder:s,periodeErNyEllerEndret:i})=>{const{årsak:l,morsAktivitetIPerioden:a,vedlegg:p,bekrefterArbeidIPerioden:u}=r,c=h(),f=u===!0?t(c,"ja"):t(c,"nei");return e.jsxs(e.Fragment,{children:[e.jsx(x,{feltnavn:t(c,"oppsummering.uttak.årsak"),verdi:Ge(c,r)}),te(r,n,s)&&i&&r.årsak!==be.Fri&&e.jsx(M,{vedlegg:(p||[]).filter(v=>v.type!==Se.MORS_AKTIVITET_DOKUMENTASJON)}),l===be.Arbeid&&e.jsx(x,{feltnavn:t(c,"oppsummering.uttak.bekreft100ProsentIArbeid.label"),verdi:f}),te(r,n,s)&&a&&e.jsx(He,{morsAktivitet:a,dokumentasjonAvMorsAktivitet:(p||[]).filter(v=>v.type===Se.MORS_AKTIVITET_DOKUMENTASJON),visOppsummeringAvDokumentasjon:i})]})};try{Uttsettelsesperiodedetaljer.displayName="Uttsettelsesperiodedetaljer",Uttsettelsesperiodedetaljer.__docgenInfo={description:"",displayName:"Uttsettelsesperiodedetaljer",props:{periode:{defaultValue:null,description:"",name:"periode",required:!0,type:{name:"Utsettelsesperiode | PeriodeUtenUttakUtsettelse"}},registrerteArbeidsforhold:{defaultValue:null,description:"",name:"registrerteArbeidsforhold",required:!0,type:{name:"Arbeidsforhold[]"}},søkerErFarEllerMedmor:{defaultValue:null,description:"",name:"søkerErFarEllerMedmor",required:!0,type:{name:"boolean"}},annenForelder:{defaultValue:null,description:"",name:"annenForelder",required:!0,type:{name:"AnnenForelder"}},periodeErNyEllerEndret:{defaultValue:null,description:"",name:"periodeErNyEllerEndret",required:!0,type:{name:"boolean"}}}}}catch{}const he=({perioder:r,navnPåForeldre:n,erFarEllerMedmor:s,registrerteArbeidsforhold:i,annenForelder:l,begrunnelseForSenEndring:a,eksisterendeUttaksplan:p,familiehendelsesdato:u,termindato:c,situasjon:f,erAleneOmOmsorg:v,ønskerJustertUttakVedFødsel:_})=>{const N=h(),O=m=>ur(N,m,n,s,v),k=m=>{const g=O(m.konto);return gr(N,g,m,f,u,c)},F=m=>{const g=t(N,"tidsintervall",{fom:j(m.fom),tom:j(m.tom)});return cr(_,c,m.fom)?t(N,"oppsummering.uttak.periodenBlirAutomatiskJustert").concat(g):g},T=(m,g=!0)=>({venstrestiltTekst:k(m),høyrestiltTekst:F(m.tidsperiode),content:e.jsx(fe,{periode:m,registrerteArbeidsforhold:i,periodeErNyEllerEndret:g,søkerErFarEllerMedmor:s,annenForelder:l})}),D=m=>({venstrestiltTekst:mr(N,m,n,u,c,f),høyrestiltTekst:F(m.tidsperiode)}),X=(m,g)=>({venstrestiltTekst:t(N,"oppsummering.utsettelse.pga"),høyrestiltTekst:F(m.tidsperiode),content:e.jsx(dn,{periode:m,registrerteArbeidsforhold:i,søkerErFarEllerMedmor:s,annenForelder:l,periodeErNyEllerEndret:g})}),Z=(m,g)=>{const U=O(m.konto);return{venstrestiltTekst:t(N,"oppsummering.overtakelse.pga",{konto:U}),høyrestiltTekst:F(m.tidsperiode),content:e.jsx(ln,{periode:m,navnPåForeldre:n,erFarEllerMedmor:s,periodeErNyEllerEndret:g})}},R=m=>({venstrestiltTekst:m.beskrivelse,høyrestiltTekst:"",content:e.jsx(e.Fragment,{children:e.jsx(x,{feltnavn:m.ekstraInformasjon||"",verdi:m.tekst})})}),I=m=>{const g=p?pr(m,p)===!1:!0;switch(m.type){case B.Uttak:return T(m,g);case B.Utsettelse:return X(m,g);case B.Overføring:return Z(m,g);case B.Opphold:return D(m);default:return null}},Q=()=>{const m=r.map(g=>I(g)).filter(g=>g!==null);if(a){const g=Ke(a),U=R(g);return m.concat(U)}return m};return e.jsx(ke,{data:Q()})};try{he.displayName="UttaksplanOppsummeringsliste",he.__docgenInfo={description:"",displayName:"UttaksplanOppsummeringsliste",props:{perioder:{defaultValue:null,description:"",name:"perioder",required:!0,type:{name:"Periode[]"}},navnPåForeldre:{defaultValue:null,description:"",name:"navnPåForeldre",required:!0,type:{name:"NavnPåForeldre"}},erFarEllerMedmor:{defaultValue:null,description:"",name:"erFarEllerMedmor",required:!0,type:{name:"boolean"}},registrerteArbeidsforhold:{defaultValue:null,description:"",name:"registrerteArbeidsforhold",required:!0,type:{name:"Arbeidsforhold[]"}},annenForelder:{defaultValue:null,description:"",name:"annenForelder",required:!0,type:{name:"AnnenForelder"}},begrunnelseForSenEndring:{defaultValue:null,description:"",name:"begrunnelseForSenEndring",required:!1,type:{name:"Tilleggsopplysning"}},eksisterendeUttaksplan:{defaultValue:null,description:"",name:"eksisterendeUttaksplan",required:!1,type:{name:"Periode[]"}},familiehendelsesdato:{defaultValue:null,description:"",name:"familiehendelsesdato",required:!0,type:{name:"Date"}},termindato:{defaultValue:null,description:"",name:"termindato",required:!0,type:{name:"Date | undefined"}},situasjon:{defaultValue:null,description:"",name:"situasjon",required:!0,type:{name:"enum",value:[{value:'"fødsel"'},{value:'"adopsjon"'},{value:'"omsorgsovertakelse"'}]}},erAleneOmOmsorg:{defaultValue:null,description:"",name:"erAleneOmOmsorg",required:!0,type:{name:"boolean"}},ønskerJustertUttakVedFødsel:{defaultValue:null,description:"",name:"ønskerJustertUttakVedFødsel",required:!0,type:{name:"boolean | undefined"}}}}}catch{}const je=({dekningsgrad:r,antallUkerUttaksplan:n,ønskerJustertUttakVedFødsel:s,antallBarn:i,...l})=>{const a=h(),p=r===Gr.HUNDRE_PROSENT?t(a,"oppsummering.uttak.dekningsgrad.verdi100",{antallUker:n}):t(a,"oppsummering.uttak.dekningsgrad.verdi80",{antallUker:n});return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:t(a,"oppsummering.uttak.dekningsgrad.label"),children:e.jsx(d,{children:p})}),e.jsx(he,{ønskerJustertUttakVedFødsel:s,...l}),s!==void 0&&e.jsx(o,{title:t(a,"oppsummering.uttak.ønskerAutomatiskJustering.label",{antallBarn:i}),children:e.jsx(d,{children:e.jsx(b,{id:s?"ja":"nei"})})})]})};try{je.displayName="UttaksplanOppsummering",je.__docgenInfo={description:"",displayName:"UttaksplanOppsummering",props:{perioder:{defaultValue:null,description:"",name:"perioder",required:!0,type:{name:"Periode[]"}},navnPåForeldre:{defaultValue:null,description:"",name:"navnPåForeldre",required:!0,type:{name:"NavnPåForeldre"}},erFarEllerMedmor:{defaultValue:null,description:"",name:"erFarEllerMedmor",required:!0,type:{name:"boolean"}},registrerteArbeidsforhold:{defaultValue:null,description:"",name:"registrerteArbeidsforhold",required:!0,type:{name:"Arbeidsforhold[]"}},dekningsgrad:{defaultValue:null,description:"",name:"dekningsgrad",required:!0,type:{name:"enum",value:[{value:'"80"'},{value:'"100"'}]}},antallUkerUttaksplan:{defaultValue:null,description:"",name:"antallUkerUttaksplan",required:!0,type:{name:"number"}},annenForelder:{defaultValue:null,description:"",name:"annenForelder",required:!0,type:{name:"AnnenForelder"}},familiehendelsesdato:{defaultValue:null,description:"",name:"familiehendelsesdato",required:!0,type:{name:"Date"}},termindato:{defaultValue:null,description:"",name:"termindato",required:!0,type:{name:"Date | undefined"}},situasjon:{defaultValue:null,description:"",name:"situasjon",required:!0,type:{name:"enum",value:[{value:'"fødsel"'},{value:'"adopsjon"'},{value:'"omsorgsovertakelse"'}]}},erAleneOmOmsorg:{defaultValue:null,description:"",name:"erAleneOmOmsorg",required:!0,type:{name:"boolean"}},antallBarn:{defaultValue:null,description:"",name:"antallBarn",required:!0,type:{name:"number"}},ønskerJustertUttakVedFødsel:{defaultValue:null,description:"",name:"ønskerJustertUttakVedFødsel",required:!0,type:{name:"boolean | undefined"}},begrunnelseForSenEndring:{defaultValue:null,description:"",name:"begrunnelseForSenEndring",required:!1,type:{name:"Tilleggsopplysning"}},eksisterendeUttaksplan:{defaultValue:null,description:"",name:"eksisterendeUttaksplan",required:!1,type:{name:"Periode[]"}}}}}catch{}const pn=()=>{const r=A.useRef(new AbortController);return A.useEffect(()=>()=>{r.current.abort()},[]),r.current.signal};const mn=()=>{const r=h(),{dispatch:n,state:s}=Ur(),i=vr(),{kvittering:l,eksisterendeSak:a}=s,p=z("oppsummering"),[u,c]=A.useState(void 0),[f,v]=A.useState(!1),[_,N]=A.useState(!1),{barn:O,annenForelder:k,søker:F,informasjonOmUtenlandsopphold:T,søkersituasjon:D,dekningsgrad:X,uttaksplan:Z,tilleggsopplysninger:R,erEndringssøknad:I}=P(),Q=pn(),m=xr(),g=Be(),{person:U,arbeidsforhold:Ce}=g,{erAleneOmOmsorg:xe}=F,V=P(),Je=Nr(),ee=kr(D.rolle),$e=fr(U,k,ee,r),we=s.antallUkerIUttaksplan,We=R.begrunnelseForSenEndring?Ke(R.begrunnelseForSenEndring):void 0,Ye=hr(ee,xe,k),K=$(ye(V.barn)),ze=_r(V.barn),Xe=I&&ve(k)&&k.harRettPåForeldrepengerINorge?t(r,"oppsummering.harGodkjentOppsummering.endringssøknadMedAnnenForelder",{navnAnnenForelder:k.fornavn}):"",Ze=t(r,"oppsummering.harGodkjentOppsummering").concat(Xe),G=A.useMemo(()=>Dr(V,s.perioderSomSkalSendesInn,K,s.endringstidspunkt),[V,s.perioderSomSkalSendesInn,K,s.endringstidspunkt]);Fr(Oe.OPPSUMMERING,s.kvittering),A.useEffect(()=>{if(f&&!_){if(N(!0),G.uttaksplan.length===0&&G.erEndringssøknad)throw new Error("Søknaden din inneholder ingen nye perioder.");qr.sendSøknad(G,g.person.fnr,Q).then(y=>{n(Ee.setKvittering(y.data))}).catch(y=>{y.response&&(y.response.status===401||y.response.status===403)?Pr():c(y)})}},[n,g.person.fnr,f,G,_]),A.useEffect(()=>{l!==void 0&&(v(!1),i(Oe.SØKNAD_SENDT))},[l,i]),A.useEffect(()=>{if(u!==void 0){if(Ie(u),u.response&&u.response.status===400&&u.response.data&&u.response.data.messages&&u.response.data.messages.includes("Vedleggslisten kan ikke inneholde flere enn 40 opplastede vedlegg"))throw new Error(Br);Ie(u);const y=Lr(u),rr=y!==Rr?y.slice(0,8):y;throw new Error(Kr+rr)}},[u]);const Qe=y=>{n(Ee.setGodkjentOppsummering(y.harGodkjentOppsummering)),v(!0)},er=f?t(r,"oppsummering.senderInnSøknad"):t(r,"oppsummering.sendInnSøknad");return e.jsx(re.FormikWrapper,{initialValues:Xr(),onSubmit:Qe,renderForm:()=>e.jsx(re.Form,{includeButtons:!1,children:e.jsxs(ir,{bannerTitle:t(r,"søknad.pageheading"),activeStepId:"oppsummering",pageTitle:t(r,"søknad.oppsummering"),onCancel:Je,onContinueLater:m,steps:Ar(r,I),children:[e.jsx(q,{padBottom:"l",children:e.jsxs("div",{className:p.block,children:[e.jsx(S,{title:"Deg",children:e.jsx(oe,{søkerinfo:g})}),!I&&e.jsx(S,{title:"Barnet",children:e.jsx(le,{barn:O,familiehendelsesdato:K})}),!I&&e.jsx(S,{title:"Den andre forelderen",children:e.jsx(ie,{annenForelder:k,søker:F,søkerrolle:D.rolle,barn:O,farMedmorErAleneOmOmsorg:Ye})}),!I&&e.jsx(S,{title:"Utenlandsopphold",children:e.jsx(de,{informasjonOmUtenlandsopphold:T,barn:O})}),!I&&e.jsx(S,{title:"Arbeidsforhold og andre inntektskilder",children:e.jsx(ge,{})}),e.jsx(S,{title:t(r,"oppsummering.uttak"),children:e.jsx(je,{perioder:Z,navnPåForeldre:$e,annenForelder:k,erFarEllerMedmor:ee,registrerteArbeidsforhold:Ce,dekningsgrad:X,antallUkerUttaksplan:we,begrunnelseForSenEndring:We,eksisterendeUttaksplan:a?a.uttaksplan:void 0,familiehendelsesdato:K,termindato:ze,situasjon:D.situasjon,erAleneOmOmsorg:xe,antallBarn:V.barn.antallBarn,ønskerJustertUttakVedFødsel:V.ønskerJustertUttakVedFødsel})})]})}),e.jsx(q,{padBottom:"l",children:e.jsx(re.ConfirmationCheckbox,{name:Re.harGodkjentOppsummering,label:Ze,validate:Zr(r)})}),e.jsx(q,{margin:"l",padBottom:"l",children:e.jsxs(ar,{lastStep:!0,children:[e.jsx(Ae,{variant:"secondary",as:yr,to:V.erEndringssøknad?br("oppsummering"):Or("oppsummering"),children:e.jsx(b,{id:"backlink.label"})}),e.jsx(Ae,{icon:e.jsx(lr,{}),iconPosition:"right",type:"submit",disabled:f,loading:f,children:er})]})})]})})})},qn=mn;export{qn as O,Un as c};
//# sourceMappingURL=Oppsummering-dfbb56f4.js.map