import { IntlShape } from 'react-intl';
import { bemUtils, Block } from '@navikt/fp-common';
import AnnenForelder from 'app/context/types/AnnenForelder';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import { Situasjon } from 'app/types/Situasjon';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import classNames from 'classnames';
import { FunctionComponent } from 'react';
import {
    isAvslåttPeriode,
    isForeldrepengerFørFødselUttaksperiode,
    isInfoPeriode,
    isSlettbarAvslåttPeriode,
    Periode,
    Periodetype,
    Utsettelsesperiode,
} from 'types/Periode';
import { VeilederMessage } from 'validering/veilederInfo/types';
import VeilederMeldinger from 'validering/veilederInfo/VeilederMeldinger';
import PeriodelisteItemHeader from '../periodeliste-item-header/PeriodelisteItemHeader';
import PeriodeHull from '../perioder/PeriodeHull';
import PeriodeInfo from '../perioder/PeriodeInfo';
import PeriodeUtenUttak from '../perioder/PeriodeUtenUttak';
import PeriodeFørFødselForm from '../uttaks-forms/periode-før-fødsel-form/PeriodeFørFødselForm';
import PeriodeUtsettelseForm from '../uttaks-forms/periode-utsettelse-form/PeriodeUtsettelseForm';
import PeriodeUttakForm from '../uttaks-forms/periode-uttak-form/PeriodeUttakForm';

import './periodelisteItem.less';
import { Accordion } from '@navikt/ds-react';
import { PeriodeValidState } from 'Uttaksplan';
import SlettbarAvslåttPeriode from '../perioder/SlettbarAvslåttPeriode';

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
    setPerioderErGyldige: React.Dispatch<React.SetStateAction<PeriodeValidState[]>>;
    erEndringssøknad: boolean;
    termindato: Date | undefined;
    antallBarn: number;
    utsettelserIPlan: Utsettelsesperiode[];
    intl: IntlShape;
    periodeErGyldig: boolean;
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
    setPerioderErGyldige: React.Dispatch<React.SetStateAction<PeriodeValidState[]>>,
    erEndringssøknad: boolean,
    termindato: Date | undefined,
    antallBarn: number,
    utsettelserIPlan: Utsettelsesperiode[],
    intl: IntlShape,
    isOpen: boolean,
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
                    setPerioderErGyldige={setPerioderErGyldige}
                    termindato={termindato}
                    morHarRett={!søkerErFarEllerMedmorOgKunDeHarRett}
                    antallBarn={antallBarn}
                    utsettelserIPlan={utsettelserIPlan}
                    intl={intl}
                    isOpen={isOpen}
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
                    setPerioderErGyldige={setPerioderErGyldige}
                    isOpen={isOpen}
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
                <>
                    {periode.visPeriodeIPlan && !isAvslåttPeriode(periode) && (
                        <PeriodeInfo periode={periode} navnPåForeldre={navnPåForeldre} />
                    )}
                    {isSlettbarAvslåttPeriode(periode) && (
                        <SlettbarAvslåttPeriode periode={periode} handleDeletePeriode={handleDeletePeriode} />
                    )}
                </>
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
    setPerioderErGyldige,
    termindato,
    antallBarn,
    utsettelserIPlan,
    intl,
    periodeErGyldig,
}) => {
    const bem = bemUtils('periodelisteItem');
    let melding = meldinger.length > 0 ? meldinger[0] : undefined;

    if (!periodeErGyldig) {
        melding = {
            type: 'feil',
            contentIntlKey: 'uttaksplan.validering.feil.erAllePeriodeSkjemaspørsmålBesvart',
        };
    }

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
        <article
            className={classNames(bem.block, egenPeriode ? bem.modifier('egenPeriode') : bem.modifier('transparent'))}
        >
            <Accordion>
                <Accordion.Item open={isOpen}>
                    <Accordion.Header onClick={() => toggleIsOpen(periode.id)} className={bem.element('header')}>
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
                    </Accordion.Header>
                    <Accordion.Content>
                        <Block visible={meldinger.length > 0}>
                            <VeilederMeldinger
                                stil="default"
                                meldinger={meldinger.filter((m) => m.avvikType !== 'skjema')}
                            />
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
                            setPerioderErGyldige,
                            erEndringssøknad,
                            termindato,
                            antallBarn,
                            utsettelserIPlan,
                            intl,
                            isOpen,
                        )}
                    </Accordion.Content>
                </Accordion.Item>
            </Accordion>
        </article>
    );
};

export default PeriodelisteItem;
