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
import { TextareaChangeEvent } from '../types/dom/Events';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import { getTidsperiodeAvgrensningerSiste4år } from '../util/validation/andreInntekter';
import { hasValueRule } from '../util/validation/common';
import Input from 'common/components/skjema/wrappers/Input';
import Textarea from 'common/components/skjema/wrappers/Textarea';
import { getFritekstfeltRules } from '../util/validation/fritekstfelt';
import { trimNumberFromInput } from 'common/util/numberUtils';

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
                            name="næring-datoForEndring"
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
                            name={'inntektEtterEndring'}
                            label={getMessage(intl, 'varigEndringAvNæringsinntekt.inntektEtterEndring.label')}
                            value={
                                info && info.næringsinntektEtterEndring !== undefined
                                    ? info.næringsinntektEtterEndring
                                    : ''
                            }
                            onChange={(v: string) => {
                                this.updateEndringAvNæringsinntektInformasjon({
                                    næringsinntektEtterEndring: trimNumberFromInput(v)
                                });
                            }}
                            validators={[
                                hasValueRule(
                                    (info && isNaN(info.næringsinntektEtterEndring) === false) || '',
                                    getMessage(intl, 'påkrevd')
                                )
                            ]}
                        />
                    </Block>
                    <Block>
                        <Textarea
                            name={'forklaring'}
                            value={(info && info.forklaring) || ''}
                            label={getMessage(intl, 'varigEndringAvNæringsinntekt.forklaring.label')}
                            onChange={(e: TextareaChangeEvent) => {
                                this.updateEndringAvNæringsinntektInformasjon({
                                    forklaring: e.target.value
                                });
                            }}
                            validators={getFritekstfeltRules({ maxLength: 100 }, intl, info && info.forklaring)}
                            maxLength={100}
                        />
                    </Block>
                </Block>
            </React.Fragment>
        );
    }
}

export default injectIntl(VarigEndringAvNæringsinntektBolk);
