import * as React from 'react';
import UtsettelseFerieInfo from '../../../utsettelse-ferie-info/UtsettelseFerieInfo';
import { getPermisjonsregler } from '../../../../util/uttaksplan/permisjonsregler';
import { Periode, Periodetype, UtsettelseÅrsakType } from '../../../../types/uttaksplan/periodetyper';
import { Forelder } from 'common/types';
import TidsperiodeBolk from '../../../../bolker/tidsperiode-bolk/TidsperiodeBolk';
import { Tidsperiode } from 'nav-datovelger/src/datovelger/types';
import { RecursivePartial } from '../../../../types/Partial';
import { getValidTidsperiode, Tidsperioden } from '../../../../util/uttaksplan/Tidsperioden';
import Block from 'common/components/block/Block';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { FormattedMessage } from 'react-intl';

export interface Props {
    periode: RecursivePartial<Periode>;
    forelder: Forelder;
    aktivtArbeidsforhold: boolean;
    onChange: (periode: RecursivePartial<Periode>) => void;
}

class UtsettelsePgaFerieForm extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        props.onChange({ type: Periodetype.Utsettelse, forelder: props.forelder, årsak: UtsettelseÅrsakType.Ferie });
    }
    render() {
        const { periode, aktivtArbeidsforhold, onChange } = this.props;
        const { tidsperiode = { fom: undefined, tom: undefined } } = periode;
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
                <Block>
                    <TidsperiodeBolk
                        onChange={(t: Partial<Tidsperiode>) => onChange({ tidsperiode: t })}
                        tidsperiode={tidsperiode as Partial<Tidsperiode>}
                        datoAvgrensninger={{
                            fra: {
                                maksDato: tidsperiode ? (tidsperiode.tom as Date) : undefined
                            },
                            til: {
                                minDato: tidsperiode ? (tidsperiode.fom as Date) : undefined
                            }
                        }}
                        visVarighet={true}
                    />
                </Block>
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
