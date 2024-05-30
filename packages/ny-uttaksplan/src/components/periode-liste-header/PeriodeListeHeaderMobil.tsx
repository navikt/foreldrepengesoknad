import classNames from 'classnames';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { BodyShort, Heading } from '@navikt/ds-react';

import { Forelder, Tidsperioden, bemUtils, formatDateShortMonth, getVarighetString } from '@navikt/fp-common';
import { ISOStringToDate } from '@navikt/fp-formik';

import Permisjonsperiode from '../../types/Permisjonsperiode';
import { getFarge, getIkon, getTekst } from './PeriodeListeHeaderUtils';
import './periode-liste-header-mobil.css';

interface Props {
    permisjonsperiode: Permisjonsperiode;
    familiehendelsedato: string;
    erFamiliehendelse?: boolean;
}

const PeriodeListeHeaderMobil: FunctionComponent<Props> = ({
    permisjonsperiode,
    familiehendelsedato,
    erFamiliehendelse,
}) => {
    const intl = useIntl();
    const bem = bemUtils('periode-liste-header-mobil');

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
    const erSamtidigUttak = permisjonsperiode.forelder === undefined && !!permisjonsperiode.samtidigUttak;

    return (
        <div className={bem.block}>
            <div className={bem.element('dato')}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Heading size="xsmall" as="p">
                        {formatDateShortMonth(permisjonsperiode.tidsperiode.fom)} -{' '}
                        {formatDateShortMonth(permisjonsperiode.tidsperiode.tom)}
                    </Heading>
                    {erFamiliehendelse !== true ? (
                        <div style={{ marginLeft: '1rem' }}>
                            <BodyShort>{getVarighetString(antallDager, intl)}</BodyShort>
                        </div>
                    ) : null}
                </div>
                <BodyShort>
                    {getTekst({ erPeriodeUtenUttak, erSamtidigUttak, erHull, erUtsettelse, erFamiliehendelse })}
                </BodyShort>
            </div>
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

export default PeriodeListeHeaderMobil;
