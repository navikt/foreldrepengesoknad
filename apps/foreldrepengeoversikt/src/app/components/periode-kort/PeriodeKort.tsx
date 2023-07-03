import { BodyShort } from '@navikt/ds-react';

import './periodeKort.css';

interface Props {
    children: React.ReactNode;
}

const PeriodeKort: React.FunctionComponent<Props> = ({ children }: Props) => {
    return (
        <div className="periodeKort">
            <BodyShort size="small">{children}</BodyShort>
        </div>
    );
};
export default PeriodeKort;
