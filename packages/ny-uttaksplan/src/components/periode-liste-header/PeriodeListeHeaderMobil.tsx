import { BabyWrappedFillIcon, CloudFillIcon, PersonPregnantFillIcon } from '@navikt/aksel-icons';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { BodyShort, Heading } from '@navikt/ds-react';

import { Forelder, Tidsperioden, bemUtils, formatDateShortMonth, getVarighetString } from '@navikt/fp-common';
import { ISOStringToDate } from '@navikt/fp-formik';

import Permisjonsperiode from '../../types/Permisjonsperiode';
import './periode-liste-header-mobil.css';

interface Props {
    permisjonsperiode: Permisjonsperiode;
    termindato: string;
}

const PeriodeListeHeaderMobil: FunctionComponent<Props> = ({ permisjonsperiode, termindato }) => {
    const intl = useIntl();
    const bem = bemUtils('periode-liste-header-mobil');

    const periodeFørTermindato = dayjs(termindato).isAfter(permisjonsperiode.tidsperiode.tom);
    const erMor = permisjonsperiode.forelder === Forelder.mor;
    const { tidsperiode } = permisjonsperiode;
    const antallDager = Tidsperioden({
        fom: ISOStringToDate(tidsperiode.fom)!,
        tom: ISOStringToDate(tidsperiode.tom)!,
    }).getAntallUttaksdager();
    const erPeriodeUtenUttak = permisjonsperiode.forelder === undefined && !!permisjonsperiode.samtidigUttak === false;
    const erSamtidigUttak = permisjonsperiode.forelder === undefined && !!permisjonsperiode.samtidigUttak;

    const getFarge = () => {
        if (erPeriodeUtenUttak) {
            return bem.modifier('farge-bg-gul');
        }

        if (erSamtidigUttak) {
            return bem.modifier('farge-bg-lysblaa-gronn');
        }

        if (erMor) {
            return bem.modifier('farge-bg-lysblaa');
        }

        return bem.modifier('farge-bg-gronn');
    };

    const getIkonFarge = () => {
        if (erPeriodeUtenUttak) {
            return bem.modifier('farge-gul');
        }

        if (erMor) {
            return bem.modifier('farge-blaa');
        }

        return bem.modifier('farge-gronn');
    };

    const getTekst = () => {
        if (erPeriodeUtenUttak) {
            return 'Uten foreldrepenger';
        }

        if (erSamtidigUttak) {
            return 'Du og Petter i permisjon';
        }

        return 'Du i permisjon';
    };

    const getIkon = () => {
        if (periodeFørTermindato) {
            return <PersonPregnantFillIcon className={getIkonFarge()} width={24} height={24} />;
        }

        if (erPeriodeUtenUttak) {
            return <CloudFillIcon className={getIkonFarge()} width={24} height={24} />;
        }

        return <BabyWrappedFillIcon className={getIkonFarge()} width={24} height={24} />;
    };

    return (
        <div className={bem.block}>
            <div className={bem.element('dato')}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Heading size="xsmall" as="p">
                        {formatDateShortMonth(permisjonsperiode.tidsperiode.fom)} -{' '}
                        {formatDateShortMonth(permisjonsperiode.tidsperiode.tom)}
                    </Heading>
                    <div style={{ marginLeft: '1rem' }}>
                        <BodyShort>{getVarighetString(antallDager, intl)}</BodyShort>
                    </div>
                </div>
                <BodyShort>{getTekst()}</BodyShort>
            </div>
            <div className={classNames(bem.element('hendelse'), getFarge())}>
                <BodyShort className={classNames(bem.element('hendelse-wrapper'))}>{getIkon()}</BodyShort>
            </div>
        </div>
    );
};

export default PeriodeListeHeaderMobil;
