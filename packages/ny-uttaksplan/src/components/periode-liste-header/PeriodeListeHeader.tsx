import classNames from 'classnames';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { BodyShort, Heading } from '@navikt/ds-react';

import { Forelder, Tidsperioden, bemUtils, formatDateShortMonth, getVarighetString } from '@navikt/fp-common';
import { ISOStringToDate } from '@navikt/fp-formik';

import Permisjonsperiode from '../../types/Permisjonsperiode';
import { getFarge, getIkon, getTekst } from './PeriodeListeHeaderUtils';
import './periode-liste-header.css';

interface Props {
    permisjonsperiode: Permisjonsperiode;
    familiehendelsedato: string;
}

const PeriodeListeHeader: FunctionComponent<Props> = ({ permisjonsperiode, familiehendelsedato }) => {
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
                <Heading size="xsmall" as="p">
                    {formatDateShortMonth(permisjonsperiode.tidsperiode.fom)} -{' '}
                    {formatDateShortMonth(permisjonsperiode.tidsperiode.tom)}
                </Heading>
            </div>
            <div className={bem.element('uker')}>
                <BodyShort>{getVarighetString(antallDager, intl)}</BodyShort>
            </div>
            <div
                className={classNames(
                    bem.element('hendelse'),
                    getFarge({ bem, erMor, erPeriodeUtenUttak, erSamtidigUttak, erUtsettelse, erHull }),
                )}
            >
                <BodyShort className={classNames(bem.element('hendelse-wrapper'))}>
                    <div>{getTekst({ erPeriodeUtenUttak, erSamtidigUttak, erHull, erUtsettelse })}</div>
                    {getIkon({ bem, erMor, erPeriodeUtenUttak, periodeFørTermindato, erUtsettelse, erHull })}
                </BodyShort>
            </div>
        </div>
    );
};

export default PeriodeListeHeader;
