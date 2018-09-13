import * as React from 'react';
import UtsettelseFerieInfo from '../../../utsettelse-ferie-info/UtsettelseFerieInfo';
import { getPermisjonsregler } from '../../../../util/uttaksplan/permisjonsregler';
import { Periode, Periodetype, UtsettelseÅrsakType } from '../../../../types/uttaksplan/periodetyper';
import { Forelder } from 'common/types';

export interface Props {
    antallDager: number;
    forelder: Forelder;
    onChange: (periode: Partial<Periode>) => void;
}

class UtsettelsePgaFerieForm extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        props.onChange({ type: Periodetype.Utsettelse, forelder: props.forelder, årsak: UtsettelseÅrsakType.Ferie });
    }
    render() {
        const { antallDager } = this.props;
        return (
            <>
                <UtsettelseFerieInfo
                    forelderNavn="Frode"
                    feriedager={antallDager}
                    permisjonsregler={getPermisjonsregler()}
                />
            </>
        );
    }
}
export default UtsettelsePgaFerieForm;
