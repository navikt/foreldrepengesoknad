import { bemUtils, Block } from '@navikt/fp-common';
import AnnenForelder from 'app/context/types/AnnenForelder';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import { Situasjon } from 'app/types/Situasjon';
import { TilgjengeligStønadskonto } from 'app/types/TilgjengeligStønadskonto';
import classNames from 'classnames';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import React, { FunctionComponent } from 'react';
import { isForeldrepengerFørFødselUttaksperiode, Periode, Periodetype } from 'uttaksplan/types/Periode';
import { VeilederMessage } from 'uttaksplan/validering/veilederInfo/types';
import VeilederMeldinger from 'uttaksplan/validering/veilederInfo/VeilederMeldinger';
import PeriodelisteItemHeader from '../periodeliste-item-header/PeriodelisteItemHeader';
import PeriodeHull from '../perioder/PeriodeHull';
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
    handleUpdatePeriode: (periode: Periode) => void;
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
}

const renderPeriodeListeInnhold = (
    periode: Periode,
    familiehendelsesdato: Date,
    handleUpdatePeriode: (periode: Periode) => void,
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
    situasjon: Situasjon
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
                />
            );
        case Periodetype.Utsettelse:
            return (
                <PeriodeUtsettelseForm
                    periode={periode}
                    familiehendelsesdato={familiehendelsesdato}
                    handleUpdatePeriode={handleUpdatePeriode}
                    erFarEllerMedmor={erFarEllerMedmor}
                    handleDeletePeriode={handleDeletePeriode}
                    toggleIsOpen={toggleIsOpen}
                />
            );
        case Periodetype.Hull:
            return <PeriodeHull periode={periode} handleUpdatePeriode={handleUpdatePeriode} />;
        case Periodetype.PeriodeUtenUttak:
            return <PeriodeUtenUttak periode={periode} handleUpdatePeriode={handleUpdatePeriode} />;
        default:
            return <div>Whatever</div>;
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
}) => {
    const bem = bemUtils('periodelisteItem');
    const melding = meldinger.length > 0 ? meldinger[0] : undefined;
    return (
        <article className={bem.block}>
            <EkspanderbartpanelBase
                className={classNames(bem.element('header'), egenPeriode ? undefined : bem.modifier('transparent'))}
                tittel={
                    <PeriodelisteItemHeader
                        egenPeriode={egenPeriode}
                        periode={periode}
                        navnPåForeldre={navnPåForeldre}
                        melding={melding}
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
                    toggleIsOpen,
                    arbeidsforhold,
                    handleDeletePeriode,
                    erFarEllerMedmor,
                    erFlerbarnssøknad,
                    erAleneOmOmsorg,
                    erDeltUttak,
                    situasjon
                )}
            </EkspanderbartpanelBase>
        </article>
    );
};

export default PeriodelisteItem;
