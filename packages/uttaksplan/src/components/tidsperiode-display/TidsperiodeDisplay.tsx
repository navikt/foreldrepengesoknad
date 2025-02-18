import { IntlShape, useIntl } from 'react-intl';

import { BodyShort, Label, Link } from '@navikt/ds-react';

import { TidsperiodeDate } from '@navikt/fp-common';
import { loggAmplitudeEvent } from '@navikt/fp-metrics';
import { formatDate } from '@navikt/fp-utils';

import Block from '../../common/block/Block';
import planBemUtils from '../../utils/planBemUtils';
import './tidsperiodeDisplay.less';

interface Props {
    tidsperiode: Partial<TidsperiodeDate> | undefined;
    toggleVisTidsperiode: () => void;
}

const bem = planBemUtils('tidsperiodeDisplay');

const formaterTidsperiodeDato = (dato: Date | undefined) => {
    if (dato) {
        return formatDate(dato);
    }

    return 'Ingen valgt dato';
};

const renderTidsperiode = (tidsperiode: Partial<TidsperiodeDate> | undefined, intl: IntlShape) => {
    if (tidsperiode) {
        return (
            <div className={bem.element('dato-container')}>
                <div className={bem.element('dato')}>
                    <Label>{`${intl.formatMessage({ id: 'fraogmed' })}:`}</Label>
                    <BodyShort>{formaterTidsperiodeDato(tidsperiode.fom)}</BodyShort>
                </div>
                <div className={bem.element('dato')}>
                    <Label>{`${intl.formatMessage({ id: 'tilogmed' })}:`}</Label>
                    <BodyShort>{formaterTidsperiodeDato(tidsperiode.tom)}</BodyShort>
                </div>
            </div>
        );
    }

    return 'Ingen valgt tidsperiode';
};
// eslint-disable-next-line @typescript-eslint/no-restricted-types
const TidsperiodeDisplay: React.FunctionComponent<Props> = ({ tidsperiode, toggleVisTidsperiode }) => {
    const intl = useIntl();

    return (
        <Block padBottom="l">
            <Label>Tidsrom</Label>
            <div className={bem.block}>
                {renderTidsperiode(tidsperiode, intl)}
                <Link
                    href="#"
                    onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                        e.preventDefault();
                        e.stopPropagation();
                        loggAmplitudeEvent({
                            origin: 'foreldrepengesoknad',
                            eventName: 'button klikk',
                            eventData: { tittel: 'endrePeriodeTidsromLinkKlikk' },
                        });
                        toggleVisTidsperiode();
                    }}
                >
                    <BodyShort>Endre tidsrom</BodyShort>
                </Link>
            </div>
        </Block>
    );
};
// eslint-disable-next-line import/no-default-export
export default TidsperiodeDisplay;
