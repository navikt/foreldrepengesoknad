import * as React from 'react';
import { SakForEndring, Saksperiode } from '../../types/søknad/SakForEndring';

import './periodelisteSakForEndring.less';
import BEMHelper from 'common/util/bem';
import { FormattedMessage } from 'react-intl';
import { sortTidsperiodeFom } from '../../util/uttaksplan/Tidsperiodene';
import { EkspanderbartpanelBase } from 'nav-frontend-ekspanderbartpanel';
import { formaterDatoKompakt } from 'common/util/datoUtils';

interface Props {
    sak: SakForEndring;
}

export const LabelValueBlock: React.StatelessComponent<{
    label: string;
    children: any;
    wide?: boolean;
    narrow?: boolean;
}> = ({ label, children, wide, narrow }) => {
    return (
        <div className={`labelValue${wide ? ' labelValue--wide' : ''}${narrow ? ' labelValue--narrow' : ''}`}>
            <div className="labelValue__label">{label}</div>
            <div className="labelValue__value">{children}</div>
        </div>
    );
};

const sorterPeriodePåStartdato = (p1: Saksperiode, p2: Saksperiode): number => {
    return sortTidsperiodeFom(p1.tidsperiode, p2.tidsperiode);
};

const PeriodelisteSakForEndring: React.StatelessComponent<Props> = ({ sak }) => {
    const { perioder } = sak;
    const bem = BEMHelper('periodelisteSakForEndring');
    return (
        <div className={bem.className}>
            {perioder.sort(sorterPeriodePåStartdato).map((periode, idx) => (
                <div key={idx} className={bem.element('periode')}>
                    <EkspanderbartpanelBase
                        ariaTittel="Whoa"
                        heading={
                            <div className={bem.element('parts')}>
                                <LabelValueBlock label="Stønadskonto" wide={true}>
                                    <FormattedMessage id={`stønadskontotype.${periode.stønadskontotype}`} />
                                </LabelValueBlock>
                                <LabelValueBlock label="Fom" wide={true}>
                                    {formaterDatoKompakt(periode.tidsperiode.fom)}
                                </LabelValueBlock>
                                <LabelValueBlock label="Tom" wide={true}>
                                    {formaterDatoKompakt(periode.tidsperiode.tom)}
                                </LabelValueBlock>
                                <LabelValueBlock label="A. part">
                                    {periode.gjelderAnnenPart ? 'Ja' : 'Nei'}
                                </LabelValueBlock>
                                <LabelValueBlock label="Samt.">{periode.samtidigUttak ? 'Ja' : 'Nei'}</LabelValueBlock>
                                <LabelValueBlock label="Arb%" narrow={true}>
                                    {periode.arbeidstidprosent ? `${periode.arbeidstidprosent}%` : '-'}
                                </LabelValueBlock>
                                <LabelValueBlock label="Utb%" narrow={true}>
                                    {periode.utbetalingprosent ? `${periode.utbetalingprosent}%` : '-'}
                                </LabelValueBlock>
                                <LabelValueBlock label="Status" narrow={true}>
                                    {periode.periodeResultatType.substr(0, 2)}
                                </LabelValueBlock>
                            </div>
                        }
                        border={true}>
                        <pre className={bem.element('details')}>{JSON.stringify(periode, null, 2)}</pre>
                    </EkspanderbartpanelBase>
                </div>
            ))}
        </div>
    );
};

export default PeriodelisteSakForEndring;
