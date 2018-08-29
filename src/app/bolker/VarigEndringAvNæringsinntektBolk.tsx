import * as React from 'react';
import {
    EndringAvNæringsinntektInformasjon,
    EndringAvNæringsinntektInformasjonPartial,
    Næring,
    NæringPartial
} from '../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import VarigEndringAvNæringsinntektSpørsmål from '../spørsmål/VarigEndringAvNæringsinntektSpørsmål';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import Textarea from 'nav-frontend-skjema/lib/textarea';
import Input from 'nav-frontend-skjema/lib/input';
import { InputChangeEvent, TextareaChangeEvent } from '../types/dom/Events';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import { getTidsperiodeAvgrensningerSiste4år } from '../util/validation/fields/andreInntekter';

interface VarigEndringAvNæringsinntektBolkProps {
    næring: Næring;
    onChange: (v: NæringPartial) => void;
}

type Props = VarigEndringAvNæringsinntektBolkProps & InjectedIntlProps;

class VarigEndringAvNæringsinntektBolk extends React.Component<Props> {
    updateEndringAvNæringsinntektInformasjon(changedProps: EndringAvNæringsinntektInformasjonPartial) {
        const { næring, onChange } = this.props;
        const updatedInfo = {
            ...næring.endringAvNæringsinntektInformasjon,
            ...changedProps
        };
        onChange({
            endringAvNæringsinntektInformasjon: updatedInfo as EndringAvNæringsinntektInformasjon
        });
    }

    render() {
        const { næring, onChange, intl } = this.props;
        const { hattVarigEndringAvNæringsinntektSiste4Kalenderår } = næring;
        const info = næring.endringAvNæringsinntektInformasjon;

        return (
            <React.Fragment>
                <Block>
                    <VarigEndringAvNæringsinntektSpørsmål
                        varigEndringAvNæringsinntekt={hattVarigEndringAvNæringsinntektSiste4Kalenderår}
                        onChange={(v: boolean) =>
                            onChange({
                                hattVarigEndringAvNæringsinntektSiste4Kalenderår: v
                            })
                        }
                    />
                </Block>

                <Block
                    margin="none"
                    animated={false}
                    visible={hattVarigEndringAvNæringsinntektSiste4Kalenderår === true}>
                    <Block>
                        <DatoInput
                            id="datoForEndring"
                            label={getMessage(intl, 'varigEndringAvNæringsinntekt.dato.label')}
                            onChange={(dato: Date) => {
                                this.updateEndringAvNæringsinntektInformasjon({
                                    dato
                                });
                            }}
                            dato={info && info.dato}
                            avgrensninger={getTidsperiodeAvgrensningerSiste4år()}
                        />
                    </Block>
                    <Block>
                        <Input
                            label={getMessage(intl, 'varigEndringAvNæringsinntekt.inntektEtterEndring.label')}
                            value={(info && info.næringsinntektEtterEndring) || ''}
                            onChange={(e: InputChangeEvent) =>
                                this.updateEndringAvNæringsinntektInformasjon({
                                    næringsinntektEtterEndring: e.target.value
                                })
                            }
                        />
                    </Block>
                    <Block>
                        <Textarea
                            label={getMessage(intl, 'varigEndringAvNæringsinntekt.forklaring.label')}
                            value={(info && info.forklaring) || ''}
                            onChange={(e: TextareaChangeEvent) => {
                                this.updateEndringAvNæringsinntektInformasjon({
                                    forklaring: e.target.value
                                });
                            }}
                        />
                    </Block>
                </Block>
            </React.Fragment>
        );
    }
}

export default injectIntl(VarigEndringAvNæringsinntektBolk);
