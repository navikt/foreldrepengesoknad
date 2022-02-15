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
    Periode,
    Periodetype,
} from 'uttaksplan/types/Periode';
import { StønadskontoType } from 'uttaksplan/types/StønadskontoType';
import StønadskontoIkon from '../stønadskonto-ikon/StønadskontoIkon';
import UtsettelseIkon from '../utsettelse-ikon/UtsettelseIkon';
import { getPeriodeTittel } from 'uttaksplan/utils/periodeUtils';
import { IntlShape, useIntl } from 'react-intl';
import { Tidsperioden } from 'app/steps/uttaksplan-info/utils/Tidsperioden';

import './periodelisteItemHeader.less';

interface Props {
    egenPeriode: boolean;
    periode: Periode;
    navnPåForeldre: NavnPåForeldre;
}

const bem = bemUtils('periodelisteItemHeader2');

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

const PeriodelisteItemHeader: FunctionComponent<Props> = ({ egenPeriode, periode, navnPåForeldre }) => {
    const intl = useIntl();

    let varighetString;
    const erFpFørTerminUtenUttak =
        isForeldrepengerFørFødselUttaksperiode(periode) && periode.skalIkkeHaUttakFørTermin === true;
    if (erFpFørTerminUtenUttak) {
        varighetString = intlUtils(intl, 'uttaksplan.periodeliste.header.skalIkkeHaUttakFørTermin');
    } else {
        varighetString = getVarighetString(Tidsperioden(periode.tidsperiode).getAntallUttaksdager(), intl);
    }

    return (
        <div className={classNames(bem.block, egenPeriode ? undefined : bem.modifier('transparent'))}>
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
                <div className={bem.element('dato-container')}>
                    {renderDagMnd(periode.tidsperiode.fom)}
                    {renderDagMnd(periode.tidsperiode.tom)}
                </div>
            </div>
        </div>
    );
};

export default PeriodelisteItemHeader;
