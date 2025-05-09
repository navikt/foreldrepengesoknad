import classNames from 'classnames';
import dayjs from 'dayjs';
import { IntlShape, useIntl } from 'react-intl';

import { BodyShort, Heading, Hide, Show } from '@navikt/ds-react';

import { Forelder } from '@navikt/fp-constants';
import { Tidsperioden, formatDateShortMonth } from '@navikt/fp-utils';
import { notEmpty } from '@navikt/fp-validation';

import { UttaksplanContextDataType, useContextGetData } from '../../context/UttaksplanDataContext';
import { planBemUtils } from '../../planBemUtils';
import { Permisjonsperiode } from '../../types/Permisjonsperiode';
import { ISOStringToDate, getVarighetString } from '../../utils/dateUtils';
import { getFarge, getIkon, getTekst } from './PeriodeListeHeaderUtils';
import './periode-liste-header.css';

interface Props {
    permisjonsperiode: Permisjonsperiode;
    erFamiliehendelse?: boolean;
}

const renderPeriode = (
    permisjonsperiode: Permisjonsperiode,
    erFamiliehendelse: boolean | undefined,
    familiehendelsedato: string,
) => {
    if (erFamiliehendelse) {
        return (
            <div>
                <Heading size="xsmall" as="p">
                    {formatDateShortMonth(familiehendelsedato)}
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

export const PeriodeListeHeader = ({ permisjonsperiode, erFamiliehendelse }: Props) => {
    const intl = useIntl();
    const bem = planBemUtils('periode-liste-header');

    const navnPåForeldre = notEmpty(useContextGetData(UttaksplanContextDataType.NAVN_PÅ_FORELDRE));
    const erFarEllerMedmor = notEmpty(useContextGetData(UttaksplanContextDataType.ER_FAR_ELLER_MEDMOR));
    const familiehendelsedato = notEmpty(useContextGetData(UttaksplanContextDataType.FAMILIEHENDELSEDATO));
    const familiesituasjon = notEmpty(useContextGetData(UttaksplanContextDataType.FAMILIESITUASJON));

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
    const utsettelseÅrsak = erUtsettelse ? permisjonsperiode.perioder[0].utsettelseÅrsak : undefined;
    const erPermisjonsperiodeTilbakeITid = dayjs(
        erFamiliehendelse ? permisjonsperiode.tidsperiode.fom : permisjonsperiode.tidsperiode.tom,
    ).isBefore(new Date());

    return (
        <div className={bem.block} style={{ opacity: erPermisjonsperiodeTilbakeITid ? '75%' : undefined }}>
            <div className={bem.element('dato')}>
                {renderPeriode(permisjonsperiode, erFamiliehendelse, familiehendelsedato)}
                <Hide above="md">
                    <BodyShort>
                        {getTekst({
                            erPeriodeUtenUttak,
                            erSamtidigUttak,
                            erHull,
                            utsettelseÅrsak,
                            erFamiliehendelse,
                            erFarEllerMedmor,
                            navnPåForeldre,
                            forelder,
                            familiesituasjon,
                            intl,
                        })}
                    </BodyShort>
                </Hide>
            </div>
            <div className={bem.element('uker')}>{renderVarighet(erFamiliehendelse, antallDager, intl)}</div>
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
                <div className={classNames(bem.element('hendelse-wrapper'))}>
                    <Show above="md">
                        <BodyShort>
                            {getTekst({
                                erPeriodeUtenUttak,
                                erSamtidigUttak,
                                erHull,
                                utsettelseÅrsak,
                                erFamiliehendelse,
                                erFarEllerMedmor,
                                navnPåForeldre,
                                forelder,
                                familiesituasjon,
                                intl,
                            })}
                        </BodyShort>
                    </Show>
                    {getIkon({
                        bem,
                        erMor,
                        erPeriodeUtenUttak,
                        periodeFørTermindato,
                        utsettelseÅrsak,
                        erHull,
                        erFamiliehendelse,
                    })}
                </div>
            </div>
        </div>
    );
};
