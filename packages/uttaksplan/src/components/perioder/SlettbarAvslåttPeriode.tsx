import { ActionLink, InfoPeriode, bemUtils, getSlettPeriodeTekst } from '@navikt/fp-common';
import { FunctionComponent } from 'react';
import { FormattedMessage } from 'react-intl';
import './slettbarAvslåttPeriode.less';

interface Props {
    periode: InfoPeriode;
    handleDeletePeriode: (periodeId: string) => void;
}

const SlettbarAvslåttPeriode: FunctionComponent<Props> = ({ periode, handleDeletePeriode }) => {
    const bem = bemUtils('slettbarAvslåttPeriode');
    const onSlettPeriode = () => {
        handleDeletePeriode(periode.id);
    };
    return (
        <div className={bem.element('wrapper')}>
            <ActionLink onClick={onSlettPeriode}>
                <FormattedMessage id={getSlettPeriodeTekst(periode.type)} />
            </ActionLink>
        </div>
    );
};

export default SlettbarAvslåttPeriode;
