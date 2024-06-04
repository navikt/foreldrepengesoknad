import classNames from 'classnames';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { IntlShape, useIntl } from 'react-intl';

import { BodyShort, Heading, Hide, Show } from '@navikt/ds-react';

import { Forelder, Tidsperioden, bemUtils, formatDateShortMonth, getVarighetString } from '@navikt/fp-common';
import { ISOStringToDate } from '@navikt/fp-formik';

import Permisjonsperiode from '../../types/Permisjonsperiode';
import { getFarge, getIkon, getTekst } from './PeriodeListeHeaderUtils';
import './periode-liste-header.css';

interface Props {
    permisjonsperiode: Permisjonsperiode;
    familiehendelsedato: string;
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

const PeriodeListeHeader: FunctionComponent<Props> = ({
    permisjonsperiode,
    familiehendelsedato,
    erFamiliehendelse,
}) => {
    const intl = useIntl();
    const bem = bemUtils('periode-liste-header');

    const periodeFørTermindato = dayjs(familiehendelsedato).isAfter(permisjonsperiode.tidsperiode.tom);
    const erMor = permisjonsperiode.forelder === Forelder.mor;
    const { tidsperiode, erUtsettelse, erHull } = permisjonsperiode;
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
                        {getTekst({ erPeriodeUtenUttak, erSamtidigUttak, erHull, erUtsettelse, erFamiliehendelse })}
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
                            {getTekst({ erPeriodeUtenUttak, erSamtidigUttak, erHull, erUtsettelse, erFamiliehendelse })}
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
