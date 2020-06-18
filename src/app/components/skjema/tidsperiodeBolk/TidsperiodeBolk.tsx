import * as React from 'react';
import { useIntl } from 'react-intl';
import moment from 'moment';
import { guid } from 'nav-frontend-js-utils';
import { Checkbox, SkjemaGruppe } from 'nav-frontend-skjema';
import { KalenderPlassering } from 'nav-datovelger';
import { Normaltekst, Element } from 'nav-frontend-typografi';

import getMessage from 'common/util/i18nUtils';
import { Avgrensninger, Tidsperiode, TidsperiodeMedValgfriSluttdato, Feil } from 'common/types';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import BEMHelper from 'common/util/bem';
import { Tidsperioden, getTidsperiode } from '../../../util/uttaksplan/Tidsperioden';
import { DateValue } from '../../../types/common';
import { InputChangeEvent } from '../../../../common/types/Events';
import { Validator } from 'common/lib/validation/types';
import { getTidsperiodeRegler } from '../../../util/validation/tidsperiode';
import Block from 'common/components/block/Block';
import ValiderbarUkerDagerTeller from 'common/lib/validation/elements/ValiderbarUkerDagerTeller';
import { getUkerOgDagerFromDager } from 'common/util/datoUtils';
import { getVarighetString } from 'common/util/intlUtils';

import './tidsperiodeBolk.less';

export interface DatoAvgrensninger {
    helgedagerIkkeTillatt?: boolean;
    fra?: Avgrensninger;
    til?: Avgrensninger;
}

export interface DatoValidatorer {
    fra?: Validator[];
    til?: Validator[];
}

interface TidsperiodeBolkProps {
    tidsperiode: Partial<TidsperiodeMedValgfriSluttdato | Tidsperiode>;
    pågående?: boolean;
    startdatoDisabled?: boolean;
    datoAvgrensninger?: DatoAvgrensninger;
    datoValidatorer?: DatoValidatorer;
    feil?: Feil;
    visVarighet?: boolean;
    varighetRenderer?: (varighetIDager: number) => React.ReactNode;
    onChange: (tidsperiode: Partial<Tidsperiode>) => void;
    datoInputLabelProps?: {
        fom: string;
        tom: string;
    };
    defaultMånedFom?: Date;
    defaultMånedTom?: Date;
    kalenderplassering?: KalenderPlassering;
    kanVelgeUgyldigDato?: boolean;
    visPågåendePeriodeCheckbox?: boolean;
    ukerOgDagerVelgerEnabled?: boolean;
}

type Props = TidsperiodeBolkProps;

const TidsperiodeBolk: React.FunctionComponent<Props> = (props) => {
    const {
        tidsperiode,
        pågående,
        datoAvgrensninger,
        feil,
        datoValidatorer,
        startdatoDisabled,
        defaultMånedFom,
        defaultMånedTom,
        datoInputLabelProps,
        kanVelgeUgyldigDato,
        kalenderplassering,
        onChange,
        visVarighet,
        varighetRenderer,
        visPågåendePeriodeCheckbox = false,
        ukerOgDagerVelgerEnabled = false,
    } = props;

    const intl = useIntl();

    const handleOnChange = (value: Partial<TidsperiodeMedValgfriSluttdato>) => {
        onChange(value);
    };

    const getValidators = () => {
        const tidsperiodeValidators = getTidsperiodeRegler(tidsperiode, intl, visPågåendePeriodeCheckbox, pågående);
        if (datoValidatorer) {
            if (datoValidatorer.fra && tidsperiodeValidators.fra) {
                tidsperiodeValidators.fra.push(...datoValidatorer.fra);
            }
            if (datoValidatorer.til && tidsperiodeValidators.til) {
                tidsperiodeValidators.til.push(...datoValidatorer.til);
            }
        }
        return tidsperiodeValidators;
    };

    const bem = BEMHelper('tidsperiodeBolk');

    const varighetIDager =
        tidsperiode &&
        tidsperiode.fom &&
        tidsperiode.tom &&
        moment(tidsperiode.fom).isSameOrBefore(tidsperiode.tom, 'day')
            ? Tidsperioden({ fom: tidsperiode.fom, tom: tidsperiode.tom }).getAntallUttaksdager()
            : undefined;

    let tilAvgrensninger: Avgrensninger = {};
    if (datoAvgrensninger && datoAvgrensninger.til) {
        tilAvgrensninger = datoAvgrensninger.til;
    } else if (tidsperiode.fom) {
        tilAvgrensninger = { minDato: tidsperiode.fom };
    }

    const { uker, dager } = varighetIDager ? getUkerOgDagerFromDager(Math.abs(varighetIDager)) : { uker: 0, dager: 0 };

    const validators = getValidators();

    return (
        <SkjemaGruppe feil={feil !== undefined ? feil.feilmelding : undefined}>
            <div className={bem.block}>
                <div className={bem.element('fra')}>
                    <Block margin="none">
                        <DatoInput
                            name="fraDatoInput"
                            id={guid()}
                            label={datoInputLabelProps ? datoInputLabelProps.fom : getMessage(intl, 'fraogmed')}
                            onChange={(fom: Date) => {
                                handleOnChange({
                                    ...tidsperiode,
                                    fom,
                                });
                            }}
                            kanVelgeUgyldigDato={kanVelgeUgyldigDato}
                            disabled={startdatoDisabled}
                            dato={tidsperiode.fom}
                            datoAvgrensinger={datoAvgrensninger && datoAvgrensninger.fra}
                            validators={validators.fra}
                            dayPickerProps={{ initialMonth: defaultMånedFom }}
                            kalender={{ plassering: kalenderplassering }}
                        />
                    </Block>
                </div>

                <div className={bem.element('til')}>
                    <Block margin="none">
                        <DatoInput
                            name="tilDatoInput"
                            id={guid()}
                            label={datoInputLabelProps ? datoInputLabelProps.tom : getMessage(intl, 'tilogmed')}
                            onChange={(tom: DateValue) => {
                                handleOnChange({
                                    ...tidsperiode,
                                    tom,
                                });
                            }}
                            kanVelgeUgyldigDato={kanVelgeUgyldigDato}
                            dato={tidsperiode.tom}
                            disabled={pågående || false}
                            datoAvgrensinger={tilAvgrensninger}
                            validators={validators.til}
                            dayPickerProps={{
                                initialMonth: defaultMånedTom || tidsperiode.fom,
                            }}
                            kalender={{ plassering: kalenderplassering }}
                        />
                    </Block>
                </div>

                {ukerOgDagerVelgerEnabled && (
                    <Block margin="none">
                        <Block margin="xs">
                            <Element>{getMessage(intl, 'tidsperiodeBolk.velgLengde')}</Element>
                        </Block>
                        <ValiderbarUkerDagerTeller
                            name="periodeUkerOgDager"
                            ukeLegend={getMessage(intl, 'spørsmål.farFellesperiode.uker.label')}
                            dagLegend={getMessage(intl, 'spørsmål.farFellesperiode.dager.label')}
                            stepperProps={[
                                {
                                    value: uker !== undefined ? uker : 0,
                                    min: 0,
                                    max: 100,
                                    onChange: (nyUker: number) =>
                                        handleOnChange({
                                            ...tidsperiode,
                                            tom: getTidsperiode(tidsperiode.fom!, nyUker * 5 + dager).tom,
                                        }),
                                    ariaLabel: 'Antall uker',
                                },
                                {
                                    value: dager !== undefined && dager !== 5 ? dager : 0,
                                    min: 0,
                                    max: 5,
                                    onChange: (nyDager: number) =>
                                        handleOnChange({
                                            ...tidsperiode,
                                            tom: getTidsperiode(tidsperiode.fom!, uker * 5 + nyDager).tom,
                                        }),
                                    ariaLabel: 'Antall dager',
                                },
                            ]}
                        />
                    </Block>
                )}

                {visVarighet && varighetIDager !== undefined && (
                    <Normaltekst className={bem.element('varighet')}>
                        {varighetRenderer ? varighetRenderer(varighetIDager) : getVarighetString(varighetIDager, intl)}
                    </Normaltekst>
                )}
            </div>

            <div className={bem.element('pågående-checkbox')}>
                <Block visible={visPågåendePeriodeCheckbox}>
                    <Checkbox
                        name="pågående"
                        checked={pågående || false}
                        label={getMessage(intl, 'pågående')}
                        onChange={(e: InputChangeEvent) => {
                            handleOnChange({
                                ...tidsperiode,
                                tom: undefined,
                                pågående: e.target.checked,
                            });
                        }}
                    />
                </Block>
            </div>
        </SkjemaGruppe>
    );
};

export default TidsperiodeBolk;
