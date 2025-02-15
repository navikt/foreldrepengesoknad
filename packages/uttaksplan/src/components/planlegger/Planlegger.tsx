import { FunctionComponent, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { Button, Heading } from '@navikt/ds-react';

import {
    AnnenForelder,
    Arbeidsforhold,
    Barn,
    BarnFraNesteSak,
    NavnPåForeldre,
    Periode,
    PeriodeValidState,
    Situasjon,
    Utsettelsesperiode,
    isAnnenForelderOppgitt,
} from '@navikt/fp-common';
import { loggAmplitudeEvent } from '@navikt/fp-metrics';
import { TilgjengeligeStønadskontoerForDekningsgrad } from '@navikt/fp-types';

import ActionLink from '../../common/action-link/ActionLink';
import Block from '../../common/block/Block';
import InfoBlock from '../../common/info-block/InfoBlock';
import { Periodene } from '../../utils/Periodene';
import planBemUtils from '../../utils/planBemUtils';
import { VeiledermeldingerPerPeriode } from '../../validering/veilederInfo/types';
import NyPeriode from '../uttaks-forms/ny-periode/NyPeriode';
import Periodeliste from './../periodeliste/Periodeliste';
import './planlegger.less';

interface Props {
    uttaksplan: Periode[];
    familiehendelsesdato: Date;
    handleUpdatePeriode: (periode: Periode, familiehendelsedato: Date) => void;
    stønadskontoer: TilgjengeligeStønadskontoerForDekningsgrad;
    navnPåForeldre: NavnPåForeldre;
    annenForelder: AnnenForelder;
    arbeidsforhold: Arbeidsforhold[];
    handleDeletePeriode: (periodeId: string) => void;
    handleAddPeriode: (nyPeriode: Periode, familiehendelsedato: Date) => void;
    erFarEllerMedmor: boolean;
    erFlerbarnssøknad: boolean;
    erAleneOmOmsorg: boolean;
    erDeltUttak: boolean;
    situasjon: Situasjon;
    meldingerPerPeriode: VeiledermeldingerPerPeriode;
    erMorUfør: boolean;
    setPerioderErGyldige: React.Dispatch<React.SetStateAction<PeriodeValidState[]>>;
    erEndringssøknad: boolean;
    setSlettUttaksplanModalOpen: (isOpen: boolean) => void;
    setResetUttaksplanModalOpen: (isOpen: boolean) => void;
    termindato: Date | undefined;
    barn: Barn;
    utsettelserIPlan: Utsettelsesperiode[];
    barnFraNesteSak: BarnFraNesteSak | undefined;
    perioderErGyldige: PeriodeValidState[];
}

// eslint-disable-next-line @typescript-eslint/no-restricted-types
const Planlegger: FunctionComponent<Props> = ({
    uttaksplan,
    familiehendelsesdato,
    handleUpdatePeriode,
    stønadskontoer,
    navnPåForeldre,
    annenForelder,
    arbeidsforhold,
    handleDeletePeriode,
    handleAddPeriode,
    erFarEllerMedmor,
    erFlerbarnssøknad,
    erAleneOmOmsorg,
    erDeltUttak,
    situasjon,
    meldingerPerPeriode,
    erMorUfør,
    setPerioderErGyldige,
    erEndringssøknad,
    setSlettUttaksplanModalOpen,
    setResetUttaksplanModalOpen,
    termindato,
    barn,
    utsettelserIPlan,
    barnFraNesteSak,
    perioderErGyldige,
}) => {
    const intl = useIntl();
    const bem = planBemUtils('planlegger');
    const [nyPeriodeFormIsVisible, setNyPeriodeFormIsVisible] = useState(false);
    const [isUtsettelse, setIsUtsettelse] = useState(false);
    const nesteLedigeUttaksdato = Periodene(uttaksplan).getFørsteUttaksdagEtterSistePeriode();
    const annenForelderErOppgitMenHarIkkeRett =
        isAnnenForelderOppgitt(annenForelder) &&
        !annenForelder.harRettPåForeldrepengerINorge &&
        !annenForelder.harRettPåForeldrepengerIEØS;
    const søkerErFarEllerMedmorOgKunDeHarRett =
        erFarEllerMedmor && !erAleneOmOmsorg && annenForelderErOppgitMenHarIkkeRett;

    return (
        <>
            <Block padBottom="l">
                <InfoBlock>
                    <Block padBottom="xl">
                        <section>
                            <div className={bem.element('tittel')}>
                                <div className={bem.element('tittelLinkWrapper')}>
                                    <Heading size="medium" level="3">
                                        {intl.formatMessage({ id: 'uttaksplan.dinPlan' })}
                                    </Heading>
                                    {erEndringssøknad && (
                                        <ActionLink
                                            onClick={() => setResetUttaksplanModalOpen(true)}
                                            className={bem.element('resetPlan')}
                                        >
                                            <FormattedMessage id="uttaksplan.resetPlan.tittel" />
                                        </ActionLink>
                                    )}
                                    <ActionLink
                                        onClick={() => setSlettUttaksplanModalOpen(true)}
                                        className={bem.element('slettPlan')}
                                    >
                                        <FormattedMessage id="uttaksplan.slettPlan.tittel" />
                                    </ActionLink>
                                </div>
                            </div>

                            <Periodeliste
                                uttaksplan={uttaksplan}
                                familiehendelsesdato={familiehendelsesdato}
                                handleUpdatePeriode={handleUpdatePeriode}
                                stønadskontoer={stønadskontoer}
                                navnPåForeldre={navnPåForeldre}
                                annenForelder={annenForelder}
                                arbeidsforhold={arbeidsforhold}
                                handleDeletePeriode={handleDeletePeriode}
                                erFarEllerMedmor={erFarEllerMedmor}
                                erFlerbarnssøknad={erFlerbarnssøknad}
                                erAleneOmOmsorg={erAleneOmOmsorg}
                                erDeltUttak={erDeltUttak}
                                situasjon={situasjon}
                                meldingerPerPeriode={meldingerPerPeriode}
                                erMorUfør={erMorUfør}
                                søkerErFarEllerMedmorOgKunDeHarRett={søkerErFarEllerMedmorOgKunDeHarRett}
                                setPerioderErGyldige={setPerioderErGyldige}
                                erEndringssøknad={erEndringssøknad}
                                termindato={termindato}
                                antallBarn={barn.antallBarn}
                                utsettelserIPlan={utsettelserIPlan}
                                barn={barn}
                                barnFraNesteSak={barnFraNesteSak}
                                intl={intl}
                                perioderErGyldige={perioderErGyldige}
                            />
                        </section>
                    </Block>
                    {nyPeriodeFormIsVisible && (
                        <div style={{ backgroundColor: 'white', padding: '1rem' }}>
                            <NyPeriode
                                setNyPeriodeFormIsVisible={setNyPeriodeFormIsVisible}
                                annenForelder={annenForelder}
                                arbeidsforhold={arbeidsforhold}
                                familiehendelsesdato={familiehendelsesdato}
                                isUtsettelse={isUtsettelse}
                                navnPåForeldre={navnPåForeldre}
                                stønadskontoer={stønadskontoer}
                                handleAddPeriode={handleAddPeriode}
                                erFarEllerMedmor={erFarEllerMedmor}
                                erFlerbarnssøknad={erFlerbarnssøknad}
                                erAleneOmOmsorg={erAleneOmOmsorg}
                                erDeltUttak={erDeltUttak}
                                situasjon={situasjon}
                                erMorUfør={erMorUfør}
                                setPerioderErGyldige={setPerioderErGyldige}
                                nesteLedigeUttaksdato={nesteLedigeUttaksdato}
                                søkerErFarEllerMedmorOgKunDeHarRett={søkerErFarEllerMedmorOgKunDeHarRett}
                                erEndringssøknad={erEndringssøknad}
                                termindato={termindato}
                                antallBarn={barn.antallBarn}
                                utsettelserIPlan={utsettelserIPlan}
                                intl={intl}
                            />
                        </div>
                    )}
                </InfoBlock>
            </Block>
            {!nyPeriodeFormIsVisible && (
                <Block padBottom="l">
                    <div className={bem.element('knapperad')}>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => {
                                loggAmplitudeEvent({
                                    origin: 'foreldrepengesoknad',
                                    eventName: 'button klikk',
                                    eventData: { tittel: 'leggTilPeriodeKlikk' },
                                });
                                setNyPeriodeFormIsVisible(true);
                                setIsUtsettelse(false);
                            }}
                        >
                            Legg til ny periode
                        </Button>
                        <Button
                            type="button"
                            variant="secondary"
                            onClick={() => {
                                loggAmplitudeEvent({
                                    origin: 'foreldrepengesoknad',
                                    eventName: 'button klikk',
                                    eventData: { tittel: 'leggTilUtsettelseKlikk' },
                                });
                                setNyPeriodeFormIsVisible(true);
                                setIsUtsettelse(true);
                            }}
                        >
                            Legg til utsettelse
                        </Button>
                    </div>
                </Block>
            )}
        </>
    );
};
// eslint-disable-next-line import/no-default-export
export default Planlegger;
