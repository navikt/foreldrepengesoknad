import { BabyWrappedFillIcon, PersonPregnantFillIcon } from '@navikt/aksel-icons';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { BodyShort, Heading } from '@navikt/ds-react';

import {
    Forelder,
    Periode,
    Tidsperioden,
    bemUtils,
    formatDateShortMonth,
    getVarighetString,
    isPeriodeUtenUttak,
    isUttaksperiode,
} from '@navikt/fp-common';

import './periode-liste-header.css';

interface Props {
    periode: Periode;
    termindato: string;
}

const PeriodeListeHeader: FunctionComponent<Props> = ({ periode, termindato }) => {
    const intl = useIntl();
    const bem = bemUtils('periode-liste-header');

    const periodeFørTermindato = dayjs(termindato).isAfter(periode.tidsperiode.tom);
    const erMor = isUttaksperiode(periode) && periode.forelder === Forelder.mor;
    const antallDager = Tidsperioden(periode.tidsperiode).getAntallUttaksdager();
    const erPeriodeUtenUttak = isPeriodeUtenUttak(periode);

    const getFarge = () => {
        if (erPeriodeUtenUttak) {
            return bem.modifier('farge-bg-gul');
        }

        if (erMor) {
            return bem.modifier('farge-bg-lysblaa');
        }

        return bem.modifier('farge-bg-gronn');
    };

    const getIkonFarge = () => {
        if (erMor) {
            return bem.modifier('farge-blaa');
        }

        return bem.modifier('farge-gronn');
    };

    const getIkon = () => {
        if (periodeFørTermindato) {
            return <PersonPregnantFillIcon className={getIkonFarge()} width={24} height={24} />;
        }

        return <BabyWrappedFillIcon className={getIkonFarge()} width={24} height={24} />;
    };

    return (
        <div className={bem.block}>
            <div className={bem.element('dato')}>
                <Heading size="xsmall" as="p">
                    {formatDateShortMonth(periode.tidsperiode.fom)} - {formatDateShortMonth(periode.tidsperiode.tom)}
                </Heading>
            </div>
            <div className={bem.element('uker')}>
                <BodyShort>{getVarighetString(antallDager, intl)}</BodyShort>
            </div>
            <div className={classNames(bem.element('hendelse'), getFarge())}>
                <BodyShort className={classNames(bem.element('hendelse-wrapper'))}>
                    <div>{erPeriodeUtenUttak ? 'Ikke uttak' : 'Du i permisjon'}</div>
                    {erPeriodeUtenUttak ? null : getIkon()}
                </BodyShort>
            </div>
        </div>
    );
};

export default PeriodeListeHeader;
