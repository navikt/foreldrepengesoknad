import React from 'react';
import { useIntl, IntlShape, FormattedMessage } from 'react-intl';
import SituasjonSirkel from './illustrasjoner/situasjon-sirkel/SituasjonSirkel';
import UkerSirkel from './illustrasjoner/uker-sirkel/UkerSirkel';
import { Normaltekst } from 'nav-frontend-typografi';
import { EksisterendeSak } from 'app/types/EksisterendeSak';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { bemUtils, Block, hasValue, intlUtils, UtvidetInformasjon } from '@navikt/fp-common';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import { Forelder } from 'app/types/Forelder';
import { Uttaksdagen } from 'app/steps/uttaksplan-info/utils/Uttaksdagen';
import {
    getFarMedmorErAleneOmOmsorg,
    getKjønnFromFnr,
    getMorErAleneOmOmsorg,
    getNavnGenitivEierform,
    getNavnPåForeldre,
} from 'app/utils/personUtils';
import { InfoPeriode, isInfoPeriode, Periodetype } from 'uttaksplan/types/Periode';
import InnholdMedIllustrasjon from '../innhold-med-illustrasjon/InnholdMedIllustrasjon';
import { formaterDato, getVarighetString, ISOStringToDate } from 'app/utils/dateUtils';
import links from 'app/links/links';
import { getForeldreparSituasjon } from 'app/utils/foreldreparSituasjonUtils';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import useSøknad from 'app/utils/hooks/useSøknad';
import isFarEllerMedmor from 'app/utils/isFarEllerMedmor';
import { Periodene } from 'app/steps/uttaksplan-info/utils/Periodene';
import { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import InfoEksisterendePerioder from './InfoEksisterendePerioder';

import './infoOmSøknaden.less';
import { getFamiliehendelsedato, getTermindato } from 'app/utils/barnUtils';

interface Props {
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    eksisterendeSak: EksisterendeSak | undefined;
    erIUttaksplanenSteg: boolean;
}

const getHvem = (
    intl: IntlShape,
    erDeltUttak: boolean,
    navnAnnenForelder: string | undefined,
    erAnnenPartsEksisterendeSak?: boolean
): string => {
    if (erDeltUttak && navnAnnenForelder !== undefined) {
        return erAnnenPartsEksisterendeSak
            ? intlUtils(intl, 'eksisterendeSak.tekst.benevning.førstegangssøknaMedEkisterndeSakAnnenPart', {
                  navn: navnAnnenForelder,
              })
            : intlUtils(intl, 'eksisterendeSak.tekst.benevning.deltOmsorg', { navn: navnAnnenForelder });
    }

    return intlUtils(intl, 'eksisterendeSak.tekst.benevning.aleneomsorg');
};

const InfoOmSøknaden: React.FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer,
    eksisterendeSak,
    erIUttaksplanenSteg,
}) => {
    const bem = bemUtils('infoOmSøknaden');
    const intl = useIntl();
    const søkerinfo = useSøkerinfo();
    const søknad = useSøknad();

    const { annenForelder, søker, barn } = søknad;
    const { person } = søkerinfo;
    const uker = getAntallUker(tilgjengeligeStønadskontoer);
    const annenForelderKjønn = getKjønnFromFnr(annenForelder);
    const erFarEllerMedmor = isFarEllerMedmor(søknad.søkersituasjon.rolle);
    const annenForelderNavn = isAnnenForelderOppgitt(annenForelder) ? annenForelder.fornavn : '';
    const erDeltUttak = isAnnenForelderOppgitt(annenForelder) ? !!annenForelder.harRettPåForeldrepenger : false;
    const erAleneOmOmsorg = søker.erAleneOmOmsorg;
    const morErAleneOmOmsorg = getMorErAleneOmOmsorg(!erFarEllerMedmor, erAleneOmOmsorg, annenForelder);
    const farMedmorErAleneOmOmsorg = getFarMedmorErAleneOmOmsorg(erFarEllerMedmor, erAleneOmOmsorg, annenForelder);
    const { dekningsgrad } = søknad;
    const dekningsgradGrunnlag = eksisterendeSak ? eksisterendeSak.grunnlag.dekningsgrad : undefined;
    const situasjon = getForeldreparSituasjon(
        person.kjønn,
        annenForelderKjønn,
        erDeltUttak,
        morErAleneOmOmsorg,
        farMedmorErAleneOmOmsorg
    );
    const skalViseInfoOmMorsSak = hasValue(annenForelderNavn) && erFarEllerMedmor && erDeltUttak;

    const forelderVedAleneomsorg = erDeltUttak ? undefined : erFarEllerMedmor ? Forelder.farMedmor : Forelder.mor;

    const hvem = getHvem(
        intl,
        erDeltUttak,
        annenForelderNavn,
        eksisterendeSak ? eksisterendeSak.erAnnenPartsSak : false
    );
    const navnPåForeldre = getNavnPåForeldre(person, annenForelder, erFarEllerMedmor);
    const familiehendelsesdato = ISOStringToDate(getFamiliehendelsedato(barn));
    const termindato = getTermindato(barn);
    let sisteInfoPeriode;
    if (eksisterendeSak) {
        sisteInfoPeriode = eksisterendeSak.uttaksplan
            ? Periodene(eksisterendeSak.uttaksplan).finnSisteInfoperiode()
            : undefined;
    }
    const nesteMuligeUttaksdagEtterAnnenPart =
        eksisterendeSak && eksisterendeSak.uttaksplan && sisteInfoPeriode
            ? Uttaksdagen(sisteInfoPeriode.tidsperiode.tom).neste()
            : undefined;

    const navnGenitivEierform = getNavnGenitivEierform(annenForelderNavn, intl.locale);

    const infoperioder: InfoPeriode[] =
        eksisterendeSak !== undefined ? eksisterendeSak.uttaksplan.filter(isInfoPeriode) : [];

    const visPlanTekst: string = erIUttaksplanenSteg
        ? 'eksisterendeSak.label.seAnnenPartsPlanIPlanen'
        : 'eksisterendeSak.label.seAnnenPartsPlan';

    const søkersPerioder =
        eksisterendeSak &&
        eksisterendeSak.uttaksplan &&
        eksisterendeSak.uttaksplan.filter((p) => p.type !== Periodetype.Info);

    return (
        <Block padBottom="l" className={bem.block}>
            <InnholdMedIllustrasjon
                tittel={intlUtils(intl, `eksisterendeSak.tittel.${erDeltUttak ? 'deltUttak' : 'aleneomsorg'}`)}
                illustrasjoner={[
                    <SituasjonSirkel key="situasjon" situasjon={situasjon} valgtForelder={forelderVedAleneomsorg} />,
                    <UkerSirkel key="uker" uker={uker} />,
                ]}
            >
                <Block padBottom="l">
                    <Normaltekst>
                        <FormattedMessage
                            id="eksisterendeSak.tekst.html"
                            values={{
                                uker: <strong>{getVarighetString(uker * 5, intl)}</strong>,
                                dekningsgrad: <strong>{dekningsgrad ?? dekningsgradGrunnlag}</strong>,
                                navn: hvem,
                            }}
                        />
                    </Normaltekst>
                </Block>
                {skalViseInfoOmMorsSak && hasValue(annenForelderNavn) && nesteMuligeUttaksdagEtterAnnenPart && (
                    <Normaltekst>
                        <FormattedMessage
                            id="eksisterendeSak.tekst.nesteMuligeUttaksdato"
                            values={{
                                dato: formaterDato(nesteMuligeUttaksdagEtterAnnenPart, 'DD. MMM YYYY'),
                                navn: annenForelderNavn,
                                b: (msg: any) => <b>{msg}</b>,
                            }}
                        />
                    </Normaltekst>
                )}

                {skalViseInfoOmMorsSak &&
                    hasValue(annenForelderNavn) &&
                    infoperioder !== undefined &&
                    infoperioder.length > 0 && (
                        <UtvidetInformasjon
                            apneLabel={intlUtils(intl, visPlanTekst, {
                                navn: navnGenitivEierform,
                            })}
                        >
                            <InfoEksisterendePerioder
                                oppgittePerioder={infoperioder}
                                navnForOverskrift={annenForelderNavn}
                                navnPåForeldre={navnPåForeldre}
                                familiehendelsesdato={familiehendelsesdato!}
                                termindato={termindato}
                                situasjon={søknad.søkersituasjon.situasjon}
                            />
                        </UtvidetInformasjon>
                    )}
            </InnholdMedIllustrasjon>
            {skalViseInfoOmMorsSak && søkersPerioder !== undefined && søkersPerioder.length > 0 && (
                <InnholdMedIllustrasjon
                    tittel={intlUtils(intl, 'eksisterendeSak.tittel.dineDagerMedForeldrepenger')}
                    illustrasjoner={[]}
                    infoboks={
                        erIUttaksplanenSteg === false ? (
                            <>
                                <UtvidetInformasjon apneLabel="Se perioder oppgitt av annen forelder">
                                    Periodene med foreldrepenger oppgitt av annen forelder
                                    <InfoEksisterendePerioder
                                        oppgittePerioder={søkersPerioder}
                                        navnPåForeldre={navnPåForeldre}
                                        familiehendelsesdato={familiehendelsesdato!}
                                        termindato={termindato}
                                        situasjon={søknad.søkersituasjon.situasjon}
                                    />
                                </UtvidetInformasjon>
                            </>
                        ) : undefined
                    }
                ></InnholdMedIllustrasjon>
            )}
            <Normaltekst>
                <FormattedMessage
                    id="uttaksplan.informasjon.lesMer"
                    values={{
                        a: (msg: any) => (
                            <a href={links.viktigeFrister} className="lenke" rel="noreferrer" target="_blank">
                                {msg}
                            </a>
                        ),
                    }}
                />
            </Normaltekst>
        </Block>
    );
};

export default InfoOmSøknaden;
