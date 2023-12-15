import './annenForelderVeileder.less';
import { Block, intlUtils } from '@navikt/fp-common';
import { BodyShort } from '@navikt/ds-react';
import { useIntl } from 'react-intl';

const FarDokumentasjonAleneomsorgVeileder: React.FunctionComponent = () => {
    const intl = useIntl();

    return (
        <div className="annenForelderVeileder">
            <Block>
                <BodyShort> {intlUtils(intl, 'annenForelder.farMedmor.dokumentasjonAvAleneomsorg.veileder')}</BodyShort>
            </Block>
        </div>
    );
};

export default FarDokumentasjonAleneomsorgVeileder;
