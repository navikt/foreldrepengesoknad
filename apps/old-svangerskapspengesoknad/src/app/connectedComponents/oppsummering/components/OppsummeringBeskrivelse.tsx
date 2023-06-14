import { FunctionComponent } from 'react';
import BEMHelper from 'common/util/bem';

import './oppsummeringBeskrivelse.less';

interface Props {
    label: string;
    innhold: string;
}

const cls = BEMHelper('oppsummeringBeskrivelse');

const OppsummeringBeskrivelse: FunctionComponent<Props> = ({ label, innhold }) => {
    return (
        <div className={cls.block}>
            {label}
            <div className={cls.element('beskrivelseAvEndring')}>
                <em>{innhold}</em>
            </div>
        </div>
    );
};

export default OppsummeringBeskrivelse;
