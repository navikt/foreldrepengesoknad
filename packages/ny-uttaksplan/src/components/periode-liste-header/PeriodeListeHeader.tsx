import classNames from 'classnames';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { IntlShape, useIntl } from 'react-intl';

import { BodyShort, Heading, Hide, Show } from '@navikt/ds-react';

import { Forelder } from '@navikt/fp-common';
import { Tidsperioden, bemUtils, formatDateShortMonth } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { UttaksplanContextDataType, useContextGetData } from '../../context/UttaksplanDataContext';
import Permisjonsperiode from '../../types/Permisjonsperiode';
import { ISOStringToDate, getVarighetString } from '../../utils/dateUtils';
import { getFarge, getIkon, getTekst } from './PeriodeListeHeaderUtils';
import './periode-liste-header.css';

interface Props {
    permisjonsperiode: Permisjonsperiode;
    erFamiliehendelse?: boolean;
}

const renderPeriode = (permisjonsperiode: Permisjonsperiode, erFamiliehendelse: boolean | undefined) => {
    if (erFamiliehendelse) {
        return (
            <div>
                <Heading size="xsmall" as="p">
                    {formatDateShortMonth(permisjonsperiode.tidsperiode.fom)}
                </Heading>
            </div>
        );
    }

    return (
        <div>
            <Heading size="xsmall" as="p">
                {formatDateShortMonth(permisjonsperiode.tidsperiode.fom)} -{' '}
                {formatDateShortMonth(permisjonsperiode.tidsperiode.tom)}
            </Heading>
        </div>
    );
};

const renderVarighet = (erFamiliehendelse: boolean | undefined, antallDager: number, intl: IntlShape) => {
    if (erFamiliehendelse) {
        return null;
    }

    return <BodyShort>{getVarighetString(antallDager, intl)}</BodyShort>;
};

const PeriodeListeHeader: FunctionComponent<Props> = ({ permisjonsperiode, erFamiliehendelse }) => {
    const intl = useIntl();
    const bem = bemUtils('periode-liste-header');

    const navnPåForeldre = notEmpty(useContextGetData(UttaksplanContextDataType.NAVN_PÅ_FORELDRE));
    const erFarEllerMedmor = notEmpty(useContextGetData(UttaksplanContextDataType.ER_FAR_ELLER_MEDMOR));
    const familiehendelsedato = notEmpty(useContextGetData(UttaksplanContextDataType.FAMILIEHENDELSEDATO));

    const periodeFørTermindato = dayjs(familiehendelsedato).isAfter(permisjonsperiode.tidsperiode.tom);
    const { tidsperiode, erUtsettelse, erHull, forelder } = permisjonsperiode;
    const erMor = forelder === Forelder.mor;
    const antallDager = Tidsperioden({
        fom: ISOStringToDate(tidsperiode.fom)!,
        tom: ISOStringToDate(tidsperiode.tom)!,
    }).getAntallUttaksdager();
    const erPeriodeUtenUttak =
        permisjonsperiode.forelder === undefined &&
        !!permisjonsperiode.samtidigUttak === false &&
        !!permisjonsperiode.erUtsettelse === false;
    const erSamtidigUttak = !!permisjonsperiode.samtidigUttak;

    return (
        <div className={bem.block}>
            <div className={bem.element('dato')}>
                {renderPeriode(permisjonsperiode, erFamiliehendelse)}
                <Hide above="md">
                    <BodyShort>
                        {getTekst({
                            erPeriodeUtenUttak,
                            erSamtidigUttak,
                            erHull,
                            erUtsettelse,
                            erFamiliehendelse,
                            erFarEllerMedmor,
                            navnPåForeldre,
                            forelder,
                        })}
                    </BodyShort>
                </Hide>
            </div>
            {renderVarighet(erFamiliehendelse, antallDager, intl)}
            <div
                className={classNames(
                    bem.element('hendelse'),
                    getFarge({
                        bem,
                        erMor,
                        erPeriodeUtenUttak,
                        erSamtidigUttak,
                        erUtsettelse,
                        erHull,
                        erFamiliehendelse,
                    }),
                )}
            >
                <BodyShort className={classNames(bem.element('hendelse-wrapper'))}>
                    <Show above="md">
                        <BodyShort>
                            {getTekst({
                                erPeriodeUtenUttak,
                                erSamtidigUttak,
                                erHull,
                                erUtsettelse,
                                erFamiliehendelse,
                                erFarEllerMedmor,
                                navnPåForeldre,
                                forelder,
                            })}
                        </BodyShort>
                    </Show>
                    {getIkon({
                        bem,
                        erMor,
                        erPeriodeUtenUttak,
                        periodeFørTermindato,
                        erUtsettelse,
                        erHull,
                        erFamiliehendelse,
                    })}
                </BodyShort>
            </div>
        </div>
    );
};

export default PeriodeListeHeader;
