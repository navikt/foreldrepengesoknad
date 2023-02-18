import { IntlShape } from 'react-intl';
import { bemUtils, Block } from '@navikt/fp-common';
import AnnenForelder from 'app/context/types/AnnenForelder';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import { Situasjon } from 'app/types/Situasjon';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import classNames from 'classnames';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import React, { Dispatch, FunctionComponent, SetStateAction } from 'react';
import {
    isAvslåttPeriode,
    isForeldrepengerFørFødselUttaksperiode,
    isInfoPeriode,
    Periode,
    Periodetype,
    Utsettelsesperiode,
} from 'uttaksplan/types/Periode';
import { VeilederMessage } from 'uttaksplan/validering/veilederInfo/types';
import VeilederMeldinger from 'uttaksplan/validering/veilederInfo/VeilederMeldinger';
import PeriodelisteItemHeader from '../periodeliste-item-header/PeriodelisteItemHeader';
import PeriodeHull from '../perioder/PeriodeHull';
import PeriodeInfo from '../perioder/PeriodeInfo';
import PeriodeUtenUttak from '../perioder/PeriodeUtenUttak';
import PeriodeFørFødselForm from '../uttaks-forms/periode-før-fødsel-form/PeriodeFørFødselForm';
import PeriodeUtsettelseForm from '../uttaks-forms/periode-utsettelse-form/PeriodeUtsettelseForm';
import PeriodeUttakForm from '../uttaks-forms/periode-uttak-form/PeriodeUttakForm';

import './periodelisteItem.less';

interface Props {
    egenPeriode: boolean;
    periode: Periode;
    isOpen: boolean;
    toggleIsOpen: (id: string) => void;
    familiehendelsesdato: Date;
    handleUpdatePeriode: (periode: Periode, familiehendelsedato: Date) => void;
    stønadskontoer: TilgjengeligStønadskonto[];
    navnPåForeldre: NavnPåForeldre;
    annenForelder: AnnenForelder;
    arbeidsforhold: Arbeidsforhold[];
    handleDeletePeriode: (periodeId: string) => void;
    erFarEllerMedmor: boolean;
    erFlerbarnssøknad: boolean;
    erAleneOmOmsorg: boolean;
    erDeltUttak: boolean;
    situasjon: Situasjon;
    meldinger?: VeilederMessage[];
    erMorUfør: boolean;
    annenForelderSamtidigUttakPeriode: Periode | undefined;
    søkerErFarEllerMedmorOgKunDeHarRett: boolean;
    setPeriodeErGyldig: Dispatch<SetStateAction<boolean>>;
    erEndringssøknad: boolean;
    termindato: Date | undefined;
    antallBarn: number;
    utsettelserIPlan: Utsettelsesperiode[];
    intl: IntlShape;
}

const renderPeriodeListeInnhold = (
    periode: Periode,
    familiehendelsesdato: Date,
    handleUpdatePeriode: (periode: Periode, familiehendelsedato: Date) => void,
    stønadskontoer: TilgjengeligStønadskonto[],
    navnPåForeldre: NavnPåForeldre,
    annenForelder: AnnenForelder,
    toggleIsOpen: (id: string) => void,
    arbeidsforhold: Arbeidsforhold[],
    handleDeletePeriode: (periodeId: string) => void,
    erFarEllerMedmor: boolean,
    erFlerbarnssøknad: boolean,
    erAleneOmOmsorg: boolean,
    erDeltUttak: boolean,
    situasjon: Situasjon,
    erMorUfør: boolean,
    søkerErFarEllerMedmorOgKunDeHarRett: boolean,
    setPeriodeErGyldig: Dispatch<SetStateAction<boolean>>,
    erEndringssøknad: boolean,
    termindato: Date | undefined,
    antallBarn: number,
    utsettelserIPlan: Utsettelsesperiode[],
    intl: IntlShape
) => {
    switch (periode.type) {
        case Periodetype.Uttak:
        case Periodetype.Overføring:
        case Periodetype.Opphold:
            if (isForeldrepengerFørFødselUttaksperiode(periode)) {
                return (
                    <PeriodeFørFødselForm
                        periode={periode}
                        familiehendelsesdato={familiehendelsesdato}
                        handleUpdatePeriode={handleUpdatePeriode}
                        erFarEllerMedmor={erFarEllerMedmor}
                        morHarRett={!søkerErFarEllerMedmorOgKunDeHarRett}
                        situasjon={situasjon}
                        utsettelserIPlan={utsettelserIPlan}
                    />
                );
            }

            return (
                <PeriodeUttakForm
                    periode={periode}
                    familiehendelsesdato={familiehendelsesdato}
                    handleUpdatePeriode={handleUpdatePeriode}
                    stønadskontoer={stønadskontoer}
                    navnPåForeldre={navnPåForeldre}
                    annenForelder={annenForelder}
                    toggleIsOpen={toggleIsOpen}
                    arbeidsforhold={arbeidsforhold}
                    handleDeletePeriode={handleDeletePeriode}
                    erFarEllerMedmor={erFarEllerMedmor}
                    erFlerbarnssøknad={erFlerbarnssøknad}
                    erAleneOmOmsorg={erAleneOmOmsorg}
                    erDeltUttak={erDeltUttak}
                    situasjon={situasjon}
                    erMorUfør={erMorUfør}
                    erEndringssøknad={erEndringssøknad}
                    setPeriodeErGyldig={setPeriodeErGyldig}
                    termindato={termindato}
                    morHarRett={!søkerErFarEllerMedmorOgKunDeHarRett}
                    antallBarn={antallBarn}
                    utsettelserIPlan={utsettelserIPlan}
                    intl={intl}
                />
            );
        case Periodetype.Utsettelse:
            return (
                <PeriodeUtsettelseForm
                    periode={periode}
                    familiehendelsesdato={familiehendelsesdato}
                    handleUpdatePeriode={handleUpdatePeriode}
                    erFarEllerMedmor={erFarEllerMedmor}
                    erAleneOmOmsorg={erAleneOmOmsorg}
                    handleDeletePeriode={handleDeletePeriode}
                    toggleIsOpen={toggleIsOpen}
                    navnPåForeldre={navnPåForeldre}
                    erMorUfør={erMorUfør}
                    søkerErFarEllerMedmorOgKunDeHarRett={søkerErFarEllerMedmorOgKunDeHarRett}
                    arbeidsforhold={arbeidsforhold}
                    situasjon={situasjon}
                    utsettelserIPlan={utsettelserIPlan}
                />
            );
        case Periodetype.Hull:
            return (
                <PeriodeHull
                    erAleneOmOmsorg={erAleneOmOmsorg}
                    erDeltUttak={erDeltUttak}
                    erFarEllerMedmor={erFarEllerMedmor}
                    periode={periode}
                    familiehendelsesdato={familiehendelsesdato}
                    navnAnnenForelder={erFarEllerMedmor ? navnPåForeldre.mor : navnPåForeldre.farMedmor}
                    handleUpdatePeriode={handleUpdatePeriode}
                />
            );
        case Periodetype.PeriodeUtenUttak:
            return (
                <PeriodeUtenUttak
                    periode={periode}
                    handleUpdatePeriode={handleUpdatePeriode}
                    familiehendelsesdato={familiehendelsesdato}
                />
            );
        case Periodetype.Info:
            return (
                periode.visPeriodeIPlan &&
                !isAvslåttPeriode(periode) && <PeriodeInfo periode={periode} navnPåForeldre={navnPåForeldre} />
            );
        default:
            return <div>Ingen visning</div>;
    }
};

const PeriodelisteItem: FunctionComponent<Props> = ({
    egenPeriode,
    periode,
    isOpen,
    toggleIsOpen,
    familiehendelsesdato,
    handleUpdatePeriode,
    stønadskontoer,
    navnPåForeldre,
    annenForelder,
    arbeidsforhold,
    handleDeletePeriode,
    erFarEllerMedmor,
    erFlerbarnssøknad,
    erAleneOmOmsorg,
    erDeltUttak,
    situasjon,
    meldinger = [],
    erMorUfør,
    annenForelderSamtidigUttakPeriode,
    søkerErFarEllerMedmorOgKunDeHarRett,
    erEndringssøknad,
    setPeriodeErGyldig,
    termindato,
    antallBarn,
    utsettelserIPlan,
    intl,
}) => {
    const bem = bemUtils('periodelisteItem');
    const melding = meldinger.length > 0 ? meldinger[0] : undefined;

    if (isInfoPeriode(periode) && !periode.visPeriodeIPlan) {
        return null;
    }

    const toggleFocusAndOpen = () => {
        const headerButton = window.document.getElementById(periode.id);

        if (headerButton) {
            setTimeout(() => {
                headerButton.focus();
            }, 150);
        }

        toggleIsOpen(periode.id);
    };

    return (
        <article className={bem.block}>
            <EkspanderbartpanelBase
                className={classNames(bem.element('header'), egenPeriode ? undefined : bem.modifier('transparent'))}
                id={periode.id}
                tittel={
                    <PeriodelisteItemHeader
                        egenPeriode={egenPeriode}
                        periode={periode}
                        navnPåForeldre={navnPåForeldre}
                        melding={melding}
                        annenForelderSamtidigUttakPeriode={annenForelderSamtidigUttakPeriode}
                        familiehendelsesdato={familiehendelsesdato}
                        termindato={termindato}
                        situasjon={situasjon}
                        erFarEllerMedmor={erFarEllerMedmor}
                        erAleneOmOmsorg={erAleneOmOmsorg}
                    />
                }
                apen={isOpen}
                onClick={() => toggleIsOpen(periode.id)}
            >
                <Block visible={meldinger.length > 0}>
                    <VeilederMeldinger meldinger={meldinger.filter((m) => m.avvikType !== 'skjema')} />
                </Block>
                {renderPeriodeListeInnhold(
                    periode,
                    familiehendelsesdato,
                    handleUpdatePeriode,
                    stønadskontoer,
                    navnPåForeldre,
                    annenForelder,
                    toggleFocusAndOpen,
                    arbeidsforhold,
                    handleDeletePeriode,
                    erFarEllerMedmor,
                    erFlerbarnssøknad,
                    erAleneOmOmsorg,
                    erDeltUttak,
                    situasjon,
                    erMorUfør,
                    søkerErFarEllerMedmorOgKunDeHarRett,
                    setPeriodeErGyldig,
                    erEndringssøknad,
                    termindato,
                    antallBarn,
                    utsettelserIPlan,
                    intl
                )}
            </EkspanderbartpanelBase>
        </article>
    );
};

export default PeriodelisteItem;
