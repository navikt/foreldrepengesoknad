import * as React from 'react';
import Knapperad from 'common/components/knapperad/Knapperad';
import { Knapp, Hovedknapp } from 'nav-frontend-knapper';
import { FormattedMessage, useIntl } from 'react-intl';
import { UnansweredQuestionsInfo } from '@navikt/sif-common-formik/lib';
import getMessage from 'common/util/i18nUtils';

export interface Props {
    periodeKanLeggesTil: boolean;
    ariaLabelLeggTil: string;
    ariaLabelAvbryt: string;
    onCancel?: () => void;
}

const NyPeriodeKnapperad: React.FunctionComponent<Props> = ({
    onCancel,
    periodeKanLeggesTil,
    ariaLabelAvbryt,
    ariaLabelLeggTil,
}) => {
    const intl = useIntl();
    return (
        <Knapperad>
            {!periodeKanLeggesTil && (
                <div style={{ marginBottom: '1rem' }}>
                    <UnansweredQuestionsInfo>
                        {getMessage(intl, 'steg.footer.spørsmålMåBesvares')}
                    </UnansweredQuestionsInfo>
                </div>
            )}
            {onCancel && (
                <Knapp htmlType="button" onClick={onCancel} aria-label={ariaLabelAvbryt}>
                    <FormattedMessage id="avbryt" />
                </Knapp>
            )}
            {periodeKanLeggesTil && (
                <Hovedknapp data-name="leggTilPeriode" htmlType="submit" aria-label={ariaLabelLeggTil}>
                    <FormattedMessage id="leggtil" />
                </Hovedknapp>
            )}
        </Knapperad>
    );
};

export default NyPeriodeKnapperad;
