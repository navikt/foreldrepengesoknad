import { FormattedMessage } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { bemUtils, formaterDato } from '@navikt/fp-common';

import './infoOmFørsteUttaksdagEtterMor.css';

export interface Props {
    annenForelderNavn: string;
    nesteMuligeUttaksdagEtterMor: Date;
}

const InfoOmFørsteUttaksdagEtterMor: React.FunctionComponent<Props> = ({
    annenForelderNavn,
    nesteMuligeUttaksdagEtterMor,
}) => {
    const bem = bemUtils('infoOmFørsteUttaksdagEtterMor');
    return (
        <div className={bem.block}>
            <BodyShort>
                <FormattedMessage
                    id="eksisterendeSak.tekst.nesteMuligeUttaksdato"
                    values={{
                        dato: formaterDato(nesteMuligeUttaksdagEtterMor, 'DD. MMM YYYY'),
                        navn: annenForelderNavn,
                        b: (msg: any) => <b>{msg}</b>,
                    }}
                />
            </BodyShort>
        </div>
    );
};

export default InfoOmFørsteUttaksdagEtterMor;
