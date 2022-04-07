import { bemUtils, intlUtils } from '@navikt/fp-common';
import { NavnPåForeldre } from 'app/types/NavnPåForeldre';
import { getUkerOgDagerFromDager, måned, måned3bokstaver, år } from 'app/utils/dateUtils';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import {
    isForeldrepengerFørFødselUttaksperiode,
    isUtsettelseAnnenPart,
    isUttakAnnenPart,
    Periode,
    Periodetype,
} from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import StønadskontoIkon from '../stønadskonto-ikon/StønadskontoIkon';
import UtsettelseIkon from '../utsettelse-ikon/UtsettelseIkon';
import { getForelderNavn, getPeriodeTittel } from 'uttaksplan/utils/periodeUtils';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { getValidTidsperiode, Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';

import './periodelisteItemHeader.less';
import UttaksplanIkon from '../uttaksplan-ikon/UttaksplanIkon';
import { getIkonForVeilederMelding } from 'uttaksplan/validering/veilederInfo/components/VeilederMelding';
import { VeilederMessage } from 'uttaksplan/validering/veilederInfo/types';
import UttaksplanAdvarselIkon from 'uttaksplan/assets/UttaksplanAdvarselIkon';
import { Forelder } from 'app/types/Forelder';

interface Props {
    egenPeriode: boolean;
    periode: Periode;
    navnPåForeldre: NavnPåForeldre;
    melding: VeilederMessage | undefined;
    annenForelderSamtidigUttakPeriode?: Periode;
}

const bem = bemUtils('periodelisteItemHeader');

export const getPeriodeIkon = (
    periode: Periode,
    navnPåForeldre: NavnPåForeldre,
    harMidlertidigOmsorg?: boolean
): React.ReactNode | undefined => {
    switch (periode.type) {
        case Periodetype.Uttak:
            return (
                <StønadskontoIkon
                    konto={periode.konto}
                    forelder={periode.forelder}
                    gradert={periode.gradert}
                    navnPåForeldre={navnPåForeldre}
                    harMidlertidigOmsorg={harMidlertidigOmsorg}
                />
            );
        case Periodetype.Overføring:
            return (
                <StønadskontoIkon konto={periode.konto} forelder={periode.forelder} navnPåForeldre={navnPåForeldre} />
            );
        case Periodetype.Utsettelse:
            return <UtsettelseIkon årsak={periode.årsak} />;
        case Periodetype.Opphold:
            return (
                <StønadskontoIkon
                    konto={StønadskontoType.Foreldrepenger}
                    forelder={periode.forelder}
                    navnPåForeldre={navnPåForeldre}
                />
            );
        case Periodetype.Info:
            if (isUtsettelseAnnenPart(periode)) {
                return <UtsettelseIkon årsak={periode.årsak} />;
            } else {
                return (
                    <StønadskontoIkon
                        konto={StønadskontoType.Foreldrepenger}
                        forelder={periode.forelder}
                        navnPåForeldre={navnPåForeldre}
                    />
                );
            }
        case Periodetype.Hull:
            return <UttaksplanAdvarselIkon />;
    }
    return undefined;
};

type VarighetFormat = 'full' | 'normal';

export const getVarighetString = (antallDager: number, intl: IntlShape, format: VarighetFormat = 'full'): string => {
    const { uker, dager } = getUkerOgDagerFromDager(Math.abs(antallDager));
    const dagerStr = intl.formatMessage(
        { id: 'common.varighet.dager' },
        {
            dager,
        }
    );
    if (uker === 0) {
        return dagerStr;
    }
    const ukerStr = intl.formatMessage({ id: 'common.varighet.uker' }, { uker });
    if (dager > 0) {
        return `${ukerStr}${intl.formatMessage({
            id: `common.varighet.separator--${format}`,
        })}${dagerStr}`;
    }
    return ukerStr;
};

const renderDagMnd = (dato: Date, visÅr = true): JSX.Element => {
    const d = dayjs(dato);

    return (
        <div className={bem.element('dagmnd')}>
            <span className={bem.element('dagmnd__dato')}>
                <Normaltekst>
                    {d.get('date')}. {måned3bokstaver(d)}.
                </Normaltekst>
            </span>
            {visÅr && (
                <Normaltekst tag="span" className={bem.element('dagmnd__mnd')}>
                    <abbr title={`${måned(d)} ${år(d)}`}>{år(d)}</abbr>
                </Normaltekst>
            )}
        </div>
    );
};

const PeriodelisteItemHeader: FunctionComponent<Props> = ({
    egenPeriode,
    periode,
    navnPåForeldre,
    melding,
    annenForelderSamtidigUttakPeriode,
}) => {
    const intl = useIntl();

    let varighetString;
    const erFpFørTerminUtenUttak =
        isForeldrepengerFørFødselUttaksperiode(periode) && periode.skalIkkeHaUttakFørTermin === true;
    if (erFpFørTerminUtenUttak) {
        varighetString = intlUtils(intl, 'uttaksplan.periodeliste.header.skalIkkeHaUttakFørTermin');
    } else {
        varighetString = getVarighetString(Tidsperioden(periode.tidsperiode).getAntallUttaksdager(), intl);
    }

    let annenForelderIsMor;
    let annenForelderNavn;
    let beskrivelseSamtidigUttak;
    if (annenForelderSamtidigUttakPeriode && isUttakAnnenPart(annenForelderSamtidigUttakPeriode)) {
        annenForelderIsMor = annenForelderSamtidigUttakPeriode.forelder === Forelder.mor;
        annenForelderNavn = getForelderNavn(annenForelderSamtidigUttakPeriode.forelder, navnPåForeldre);
        beskrivelseSamtidigUttak = getVarighetString(
            getValidTidsperiode(annenForelderSamtidigUttakPeriode.tidsperiode)
                ? Tidsperioden(annenForelderSamtidigUttakPeriode.tidsperiode).getAntallUttaksdager()
                : 0,
            intl
        );
    }

    return (
        <div>
            <div className={bem.block}>
                <div
                    className={classNames(
                        bem.element('content'),
                        egenPeriode ? bem.modifier('egenPeriode') : bem.modifier('annenPart')
                    )}
                >
                    <div className={bem.element('ikon')}>{getPeriodeIkon(periode, navnPåForeldre)}</div>
                    <div className={bem.element('tittel')}>
                        <Element tag="h2">{getPeriodeTittel(intl, periode, navnPåForeldre)}</Element>
                        <Normaltekst>{varighetString}</Normaltekst>
                    </div>
                    <div className={bem.element('advarsel')}>
                        {melding && (
                            <span role="presentation">
                                <UttaksplanIkon
                                    ikon={getIkonForVeilederMelding(melding)}
                                    title={melding.contentIntlKey}
                                />
                            </span>
                        )}
                    </div>
                    {!erFpFørTerminUtenUttak && (
                        <div className={bem.element('dato-container')}>
                            {renderDagMnd(periode.tidsperiode.fom)}
                            {renderDagMnd(periode.tidsperiode.tom)}
                        </div>
                    )}
                </div>
            </div>

            {annenForelderSamtidigUttakPeriode && (
                <div
                    className={classNames(bem.element('samtidig-uttak'), {
                        [bem.element('samtidig-uttak-mor')]: annenForelderIsMor,
                        [bem.element('samtidig-uttak-far')]: !annenForelderIsMor,
                    })}
                >
                    <div>
                        <Element>
                            <FormattedMessage id="oppsummering.morsAktivitet.SamtidigUttak" />
                        </Element>
                    </div>
                    <div className={bem.element('beskrivelse')}>
                        <em className={bem.element('beskrivelse__tekst')}>
                            {beskrivelseSamtidigUttak}
                            <em className={bem.element('hvem')}> - {annenForelderNavn}</em>
                        </em>
                    </div>
                    {annenForelderSamtidigUttakPeriode.tidsperiode && (
                        <div className={bem.element('tidsrom')}>
                            {renderDagMnd(annenForelderSamtidigUttakPeriode.tidsperiode.fom, false)}
                            {renderDagMnd(annenForelderSamtidigUttakPeriode.tidsperiode.tom, false)}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PeriodelisteItemHeader;
