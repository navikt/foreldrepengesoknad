import * as React from 'react';
import UtsettelseFerieInfo from '../../../utsettelse-ferie-info/UtsettelseFerieInfo';
import { getPermisjonsregler } from '../../../../util/uttaksplan/permisjonsregler';
import { Forelder } from 'common/types';
import { Tidsperiode } from 'nav-datovelger/src/datovelger/types';
import { getValidTidsperiode, Tidsperioden } from '../../../../util/uttaksplan/Tidsperioden';
import Block from 'common/components/block/Block';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { FormattedMessage } from 'react-intl';

export interface Props {
    tidsperiode?: Partial<Tidsperiode>;
    forelder: Forelder;
    aktivtArbeidsforhold: boolean;
}

class UtsettelsePgaFerieForm extends React.Component<Props, {}> {
    render() {
        const { tidsperiode, aktivtArbeidsforhold } = this.props;
        const validTidsperiode = getValidTidsperiode(tidsperiode);
        const antallDager = validTidsperiode ? Tidsperioden(validTidsperiode).getAntallUttaksdager() : undefined;

        if (!aktivtArbeidsforhold) {
            return (
                <Veilederinfo>
                    <FormattedMessage id="utsettelseskjema.ferie.utenArbeidsforhold" />
                </Veilederinfo>
            );
        }

        return (
            <>
                {antallDager && (
                    <Block>
                        <UtsettelseFerieInfo
                            forelderNavn="Frode"
                            feriedager={antallDager}
                            permisjonsregler={getPermisjonsregler()}
                        />
                    </Block>
                )}
            </>
        );
    }
}
export default UtsettelsePgaFerieForm;
