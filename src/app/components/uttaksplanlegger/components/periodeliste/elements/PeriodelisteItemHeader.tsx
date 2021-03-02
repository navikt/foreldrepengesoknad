import * as React from 'react';
import classnames from 'classnames';
import BEMHelper from 'common/util/bem';
import { Element, Normaltekst } from 'nav-frontend-typografi';
import { Tidsperiode, Forelder } from 'common/types';
import { måned3bokstaver, måned, år } from 'common/util/datoUtils';
import moment from 'moment';
import { getIkonForVeilederMelding } from 'app/util/validation/getAdvarselForPeriode';
import { VeilederMessage } from 'app/components/veilederInfo/types';
import UttaksplanIkon from 'app/components/ikoner/uttaksplanIkon/UttaksplanIkon';

import './periodeheader.less';
import { Periode, isUttakAnnenPart } from 'app/types/uttaksplan/periodetyper';
import { FormattedMessage } from 'react-intl';

interface Props {
    isOpen?: boolean;
    tittel: string;
    ikon: React.ReactNode | undefined;
    beskrivelse?: React.ReactNode;
    beskrivelseSamtidigUttak?: React.ReactNode;
    melding?: VeilederMessage;
    tidsperiode?: Tidsperiode;
    annenForelderSamtidigUttakPeriode?: Periode;
    type: 'periode' | 'info';
}

const BEM = BEMHelper('periodelisteItemHeader');

const renderDagMnd = (dato: Date, visÅr = true): JSX.Element => {
    const d = moment.utc(dato);
    return dato ? (
        <div className={BEM.element('dagmnd')}>
            <span className={BEM.element('dagmnd__dato')}>
                {d.get('date')}. {måned3bokstaver(d)}.
            </span>
            {visÅr && (
                <Normaltekst tag="span" className={BEM.element('dagmnd__mnd')}>
                    <abbr title={`${måned(d)} ${år(d)}`}>{år(d)}</abbr>
                </Normaltekst>
            )}
        </div>
    ) : (
        <div className={BEM.element('dagmnd')}>-</div>
    );
};

const PeriodelisteItemHeader: React.FunctionComponent<Props> = ({
    type,
    isOpen,
    ikon,
    tittel,
    beskrivelse,
    melding,
    tidsperiode,
    annenForelderSamtidigUttakPeriode,
    beskrivelseSamtidigUttak,
}) => {
    let annenForelderIsMor;
    if (annenForelderSamtidigUttakPeriode && isUttakAnnenPart(annenForelderSamtidigUttakPeriode)) {
        annenForelderIsMor = annenForelderSamtidigUttakPeriode.forelder === Forelder.mor;
    }

    return (
        <div className={BEM.modifier(type)}>
            <div
                className={classnames(BEM.block, 'typo-normal', {
                    [BEM.modifier('apnet')]: isOpen,
                })}
            >
                <div className={BEM.element('ikon')} role="presentation" aria-hidden={true}>
                    {ikon}
                </div>
                <div className={BEM.element('beskrivelse')}>
                    <div className={BEM.element('beskrivelse__tekst')}>
                        <Element tag="h2">{tittel}</Element>
                        {beskrivelse && <Normaltekst>{beskrivelse}</Normaltekst>}
                    </div>
                </div>
                {melding && (
                    <div className={BEM.element('advarsel')}>
                        <span role="presentation">
                            <UttaksplanIkon ikon={getIkonForVeilederMelding(melding)} title={melding.contentIntlKey} />
                        </span>
                    </div>
                )}
                {tidsperiode && (
                    <div className={BEM.element('tidsrom')}>
                        {renderDagMnd(tidsperiode.fom)}
                        {renderDagMnd(tidsperiode.tom)}
                    </div>
                )}
            </div>
            {annenForelderSamtidigUttakPeriode && (
                <div
                    className={classnames(BEM.element('samtidig-uttak'), {
                        [BEM.element('samtidig-uttak-mor')]: annenForelderIsMor,
                        [BEM.element('samtidig-uttak-far')]: !annenForelderIsMor,
                    })}
                >
                    <div>
                        <Element>
                            <FormattedMessage id="morsAktivitet.SamtidigUttak" />
                        </Element>
                    </div>
                    <div className={BEM.element('beskrivelse')}>
                        <div className={BEM.element('beskrivelse__tekst')}>
                            {beskrivelseSamtidigUttak && <Normaltekst>{beskrivelseSamtidigUttak}</Normaltekst>}
                        </div>
                    </div>
                    {annenForelderSamtidigUttakPeriode.tidsperiode && (
                        <div className={BEM.element('tidsrom')}>
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
