import { bemUtils, InfoBlock, intlUtils, Block, ActionLink } from '@navikt/fp-common';
import AnnenForelder, { isAnnenForelderOppgitt } from 'app/context/types/AnnenForelder';
import { Periodene } from 'app/steps/uttaksplan-info/utils/Periodene';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import { Situasjon } from 'app/types/Situasjon';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import { Knapp } from 'nav-frontend-knapper';
import { Systemtittel } from 'nav-frontend-typografi';
import React, { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Periode } from 'uttaksplan/types/Periode';
import { VeiledermeldingerPerPeriode } from 'uttaksplan/validering/veilederInfo/types';
import FamiliehendelsedatoDisplay from '../familiehendelsedato-display/FamiliehendelsedatoDisplay';
import NyPeriode from '../uttaks-forms/ny-periode/NyPeriode';
import Periodeliste from './../periodeliste/Periodeliste';

import './planlegger.less';

interface Props {
    uttaksplan: Periode[];
    familiehendelsesdato: Date;
    handleUpdatePeriode: (periode: Periode) => void;
    stønadskontoer: TilgjengeligStønadskonto[];
    navnPåForeldre: NavnPåForeldre;
    annenForelder: AnnenForelder;
    arbeidsforhold: Arbeidsforhold[];
    handleDeletePeriode: (periodeId: string) => void;
    handleAddPeriode: (nyPeriode: Periode) => void;
    erFarEllerMedmor: boolean;
    erFlerbarnssøknad: boolean;
    erAleneOmOmsorg: boolean;
    erDeltUttak: boolean;
    situasjon: Situasjon;
    meldingerPerPeriode: VeiledermeldingerPerPeriode;
    erMorUfør: boolean;
    setPeriodeErGyldig: Dispatch<SetStateAction<boolean>>;
    erEndringssøknad: boolean;
    setSlettUttaksplanModalOpen: (isOpen: boolean) => void;
}

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
    setPeriodeErGyldig,
    erEndringssøknad,
    setSlettUttaksplanModalOpen,
}) => {
    const intl = useIntl();
    const bem = bemUtils('planlegger');
    const [nyPeriodeFormIsVisible, setNyPeriodeFormIsVisible] = useState(false);
    const [isUtsettelse, setIsUtsettelse] = useState(false);
    const nesteLedigeUttaksdato = Periodene(uttaksplan).getFørsteUttaksdagEtterSistePeriode();
    const annenForelderErOppgitMenHarIkkeRett =
        isAnnenForelderOppgitt(annenForelder) && !annenForelder.harRettPåForeldrepenger;
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
                                    <Systemtittel>{intlUtils(intl, 'uttaksplan.dinPlan')}</Systemtittel>
                                    <ActionLink
                                        onClick={() => setSlettUttaksplanModalOpen(true)}
                                        className={bem.element('slettPlan')}
                                    >
                                        <FormattedMessage id="uttaksplan.slettPlan.tittel" />
                                    </ActionLink>
                                </div>
                                <FamiliehendelsedatoDisplay
                                    familiehendelsedato={familiehendelsesdato}
                                    erAdopsjon={situasjon === 'adopsjon'}
                                />
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
                                setPeriodeErGyldig={setPeriodeErGyldig}
                                erEndringssøknad={erEndringssøknad}
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
                                setPeriodeErGyldig={setPeriodeErGyldig}
                                nesteLedigeUttaksdato={nesteLedigeUttaksdato}
                                søkerErFarEllerMedmorOgKunDeHarRett={søkerErFarEllerMedmorOgKunDeHarRett}
                                erEndringssøknad={erEndringssøknad}
                            />
                        </div>
                    )}
                </InfoBlock>
            </Block>
            {!nyPeriodeFormIsVisible && (
                <Block padBottom="l">
                    <div className={bem.element('knapperad')}>
                        <Knapp
                            onClick={() => {
                                setNyPeriodeFormIsVisible(true);
                                setIsUtsettelse(false);
                            }}
                        >
                            Legg til ny periode
                        </Knapp>
                        <Knapp
                            onClick={() => {
                                setNyPeriodeFormIsVisible(true);
                                setIsUtsettelse(true);
                            }}
                        >
                            Legg til utsettelse
                        </Knapp>
                    </div>
                </Block>
            )}
        </>
    );
};

export default Planlegger;
