import * as React from 'react';
import Knapperad from 'common/components/knapperad/Knapperad';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import { FormattedMessage } from 'react-intl';

export interface Props {
    periodeKanLeggesTil: boolean;
    onCancel?: () => void;
}

const NyPeriodeKnapperad: React.StatelessComponent<Props> = ({ onCancel, periodeKanLeggesTil }) => (
    <Knapperad>
        {onCancel && (
            <Knapp htmlType="button" onClick={onCancel}>
                <FormattedMessage id="avbryt" />
            </Knapp>
        )}
        {periodeKanLeggesTil && (
            <Hovedknapp htmlType="submit">
                <FormattedMessage id="leggtil" />
            </Hovedknapp>
        )}
    </Knapperad>
);

export default NyPeriodeKnapperad;
