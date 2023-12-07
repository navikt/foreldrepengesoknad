import { useIntl, IntlShape, FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { BodyShort, ReadMore } from '@navikt/ds-react';
import { notEmpty } from '@navikt/fp-validation';
import SituasjonSirkel from '@navikt/fp-common/src/common/components/situasjon-sirkel/SituasjonSirkel';
import UkerSirkel from '@navikt/fp-common/src/common/components/uker-sirkel/UkerSirkel';
import {
    bemUtils,
    Block,
    EksisterendeSak,
    Forelder,
    formatDate,
    formaterDato,
    getFarMedmorErAleneOmOmsorg,
    getForeldreparSituasjon,
    getKjønnFromFnr,
    getMorErAleneOmOmsorg,
    getNavnGenitivEierform,
    getNavnPåForeldre,
    getToTetteReglerGjelder,
    getVarighetString,
    hasValue,
    InfoPeriode,
    intlUtils,
    isAnnenForelderOppgitt,
    isFarEllerMedmor,
    isInfoPeriode,
    ISOStringToDate,
    links,
    Periodene,
    Periodetype,
    TilgjengeligStønadskonto,
    Uttaksdagen,
} from '@navikt/fp-common';
import InnholdMedIllustrasjon from '@navikt/fp-common/src/common/components/innhold-med-illustrasjon/InnholdMedIllustrasjon';
import { getAntallUker } from 'app/steps/uttaksplan-info/utils/stønadskontoer';
import InfoEksisterendePerioder from './InfoEksisterendePerioder';
import { getFamiliehendelsedato, getTermindato } from 'app/utils/barnUtils';
import { ContextDataType, useContextGetData } from 'app/context/FpDataContext';

import './infoOmSøknaden.less';
import Person from '@navikt/fp-common/src/common/types/Person';

const getHvem = (
    intl: IntlShape,
    erDeltUttak: boolean,
    navnAnnenForelder: string | undefined,
    erAnnenPartsEksisterendeSak?: boolean,
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

export interface Props {
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    eksisterendeSak: EksisterendeSak | undefined;
    erIUttaksplanenSteg: boolean;
    minsterettUkerToTette?: number;
    person: Person;
}

const InfoOmSøknaden: React.FunctionComponent<Props> = ({
    tilgjengeligeStønadskontoer,
    eksisterendeSak,
    erIUttaksplanenSteg,
    minsterettUkerToTette,
    person,
}) => {
    const bem = bemUtils('infoOmSøknaden');
    const intl = useIntl();

    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const søker = notEmpty(useContextGetData(ContextDataType.SØKER));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const uttaksplanMetadata = useContextGetData(ContextDataType.UTTAKSPLAN_METADATA);
    const barnFraNesteSak = useContextGetData(ContextDataType.BARN_FRA_NESTE_SAK);

    const uker = getAntallUker(tilgjengeligeStønadskontoer);
    const annenForelderKjønn = getKjønnFromFnr(annenForelder);
    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const annenForelderNavn = isAnnenForelderOppgitt(annenForelder) ? annenForelder.fornavn : '';
    const erDeltUttak = isAnnenForelderOppgitt(annenForelder)
        ? !!annenForelder.harRettPåForeldrepengerINorge || !!annenForelder.harRettPåForeldrepengerIEØS
        : false;
    const erDeltUttakINorge = isAnnenForelderOppgitt(annenForelder) && !!annenForelder.harRettPåForeldrepengerINorge;
    const erAleneOmOmsorg = søker.erAleneOmOmsorg;
    const morErAleneOmOmsorg = getMorErAleneOmOmsorg(!erFarEllerMedmor, erAleneOmOmsorg, annenForelder);
    const farMedmorErAleneOmOmsorg = getFarMedmorErAleneOmOmsorg(erFarEllerMedmor, erAleneOmOmsorg, annenForelder);
    const { rolle } = søkersituasjon;
    const dekningsgradGrunnlag = eksisterendeSak ? eksisterendeSak.grunnlag.dekningsgrad : undefined;
    const situasjon = getForeldreparSituasjon(
        person.kjønn,
        annenForelderKjønn,
        erDeltUttak,
        morErAleneOmOmsorg,
        farMedmorErAleneOmOmsorg,
        rolle,
    );
    const skalViseInfoOmMorsSak = hasValue(annenForelderNavn) && erFarEllerMedmor && erDeltUttak;

    const forelderVedAleneomsorg = erDeltUttak ? undefined : erFarEllerMedmor ? Forelder.farMedmor : Forelder.mor;

    const hvem = getHvem(
        intl,
        erDeltUttakINorge,
        annenForelderNavn,
        eksisterendeSak ? eksisterendeSak.erAnnenPartsSak : false,
    );
    const navnPåForeldre = getNavnPåForeldre(person, annenForelder, erFarEllerMedmor, intl);
    const familiehendelsedatoNesteBarn =
        barnFraNesteSak !== undefined ? barnFraNesteSak.familiehendelsesdato : undefined;
    const familiehendelsesdato = ISOStringToDate(getFamiliehendelsedato(barn));
    const erToTette = getToTetteReglerGjelder(familiehendelsesdato, familiehendelsedatoNesteBarn);
    const minsterettToTetteAntallUkerTekst = [minsterettUkerToTette, intlUtils(intl, 'uker')].join(' ');
    const startStønadsperiodeNyttBarn =
        barnFraNesteSak !== undefined ? barnFraNesteSak.startdatoFørsteStønadsperiode : undefined;
    const sisteUttaksdagDetteBarnet =
        startStønadsperiodeNyttBarn !== undefined ? Uttaksdagen(startStønadsperiodeNyttBarn).forrige() : undefined;
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
        <Block padBottom="xl" className={classNames(`${bem.block}`)}>
            <InnholdMedIllustrasjon
                tittel={intlUtils(intl, `eksisterendeSak.tittel.${erDeltUttakINorge ? 'deltUttak' : 'aleneomsorg'}`)}
                illustrasjoner={[
                    <SituasjonSirkel key="situasjon" situasjon={situasjon} valgtForelder={forelderVedAleneomsorg} />,
                    <UkerSirkel key="uker" uker={uker} />,
                ]}
            >
                <Block padBottom="xl">
                    <BodyShort className={bem.element('infoTekst')}>
                        <FormattedMessage
                            id="eksisterendeSak.tekst.html"
                            values={{
                                uker: <strong>{getVarighetString(uker * 5, intl)}</strong>,
                                dekningsgrad: (
                                    <strong>{uttaksplanMetadata?.dekningsgrad ?? dekningsgradGrunnlag}</strong>
                                ),
                                navn: hvem,
                            }}
                        />
                    </BodyShort>
                </Block>
                {skalViseInfoOmMorsSak && hasValue(annenForelderNavn) && nesteMuligeUttaksdagEtterAnnenPart && (
                    <BodyShort className={bem.element('infoTekst')}>
                        <FormattedMessage
                            id="eksisterendeSak.tekst.nesteMuligeUttaksdato"
                            values={{
                                dato: formaterDato(nesteMuligeUttaksdagEtterAnnenPart, 'DD. MMM YYYY'),
                                navn: annenForelderNavn,
                                b: (msg: any) => <b>{msg}</b>,
                            }}
                        />
                    </BodyShort>
                )}

                {skalViseInfoOmMorsSak &&
                    hasValue(annenForelderNavn) &&
                    infoperioder !== undefined &&
                    infoperioder.length > 0 && (
                        <Block padBottom="l">
                            <ReadMore
                                header={intlUtils(intl, visPlanTekst, {
                                    navn: navnGenitivEierform,
                                })}
                            >
                                <InfoEksisterendePerioder
                                    oppgittePerioder={infoperioder}
                                    navnForOverskrift={annenForelderNavn}
                                    navnPåForeldre={navnPåForeldre}
                                    familiehendelsesdato={familiehendelsesdato!}
                                    termindato={termindato}
                                    situasjon={søkersituasjon.situasjon}
                                />
                            </ReadMore>
                        </Block>
                    )}
            </InnholdMedIllustrasjon>
            {skalViseInfoOmMorsSak && søkersPerioder !== undefined && søkersPerioder.length > 0 && (
                <InnholdMedIllustrasjon
                    tittel={intlUtils(intl, 'eksisterendeSak.tittel.dineDagerMedForeldrepenger')}
                    illustrasjoner={[]}
                    infoboks={
                        erIUttaksplanenSteg === false ? (
                            <>
                                <ReadMore header="Se perioder oppgitt av annen forelder">
                                    Periodene med foreldrepenger oppgitt av annen forelder
                                    <InfoEksisterendePerioder
                                        oppgittePerioder={søkersPerioder}
                                        navnPåForeldre={navnPåForeldre}
                                        familiehendelsesdato={familiehendelsesdato!}
                                        termindato={termindato}
                                        situasjon={søkersituasjon.situasjon}
                                    />
                                </ReadMore>
                            </>
                        ) : undefined
                    }
                ></InnholdMedIllustrasjon>
            )}
            {erToTette && startStønadsperiodeNyttBarn !== undefined && (
                <Block padBottom="xl">
                    <BodyShort>
                        <strong>
                            <FormattedMessage
                                id="infoOmSøknaden.toTette.finnesBarnMedNesteSak.tittel"
                                values={{ antallUkerToTette: minsterettUkerToTette }}
                            ></FormattedMessage>
                        </strong>
                    </BodyShort>
                    <BodyShort>
                        <FormattedMessage
                            id="infoOmSøknaden.toTette.finnesBarnMedNesteSak"
                            values={{
                                startStønadsperiodeNyttBarn: formatDate(startStønadsperiodeNyttBarn),
                                minsterettAntallUker: <strong>{minsterettToTetteAntallUkerTekst}</strong>,
                            }}
                        />
                    </BodyShort>
                </Block>
            )}
            {!erToTette && startStønadsperiodeNyttBarn !== undefined && (
                <Block padBottom="xl">
                    <BodyShort>
                        <strong>
                            <FormattedMessage
                                id="infoOmSøknaden.ikkeToTette.finnesBarnMedNesteSak.tittel"
                                values={{ sisteUttaksdagDetteBarnet: formaterDato(sisteUttaksdagDetteBarnet) }}
                            ></FormattedMessage>
                        </strong>
                    </BodyShort>
                    <BodyShort>
                        <FormattedMessage
                            id="infoOmSøknaden.ikkeToTette.finnesBarnMedNesteSak"
                            values={{
                                startStønadsperiodeNyttBarn: formatDate(startStønadsperiodeNyttBarn),
                                sisteUttaksdagDetteBarnet: formaterDato(sisteUttaksdagDetteBarnet),
                            }}
                        />
                    </BodyShort>
                </Block>
            )}
            <BodyShort>
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
            </BodyShort>
        </Block>
    );
};

export default InfoOmSøknaden;
