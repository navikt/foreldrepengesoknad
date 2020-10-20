import * as React from 'react';
import moment from 'moment';
import Labeltekst from 'common/components/labeltekst/Labeltekst';
import { DateValue } from '../types/common';
import { fødselsdatoAvgrensninger, getFødselsdatoRegler } from '../util/validation/fødselsdato';
import { injectIntl, IntlShape } from 'react-intl';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import { Validator } from 'common/lib/validation/types';
import { Avgrensninger } from 'common/types';
import Block from 'common/components/block/Block';
import { termindatoAvgrensningerFodsel, getTermindatoRegler } from 'app/util/validation/termindato';
import { dateMoreThan10WeeksAgo } from 'app/util/validation/values';
import getMessage from 'common/util/i18nUtils';

export interface FødselsdatoerSpørsmålProps {
    fødselsdatoer: DateValue[];
    termindato?: Date;
    antallBarn: number | undefined;
    onChangeFødselsdato: (fødselsdatoer: DateValue[]) => void;
    onChangeTermindato?: (termindato: Date) => void;
    collapsed?: boolean;
    datoavgrensninger?: Avgrensninger;
    datovalidatorer?: Validator[];
    gjelderAdopsjon?: boolean;
    erFarMedmor?: boolean;
    intl: IntlShape;
}

type Props = FødselsdatoerSpørsmålProps;

const getKey = (idx: number) => `fødselsdatoer.flere.${idx}`;

class FødselsdatoerSpørsmål extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.onFødselsdatoChange = this.onFødselsdatoChange.bind(this);
        this.renderCollapsedFødselsdatoSpørsmål = this.renderCollapsedFødselsdatoSpørsmål.bind(this);
        this.renderExpandedFødselsdatoSpørsmål = this.renderExpandedFødselsdatoSpørsmål.bind(this);
        this.getFødselsdatoAvgrensninger = this.getFødselsdatoAvgrensninger.bind(this);
        this.getValidatorer = this.getValidatorer.bind(this);
        this.getTermindatoAvgrensninger = this.getTermindatoAvgrensninger.bind(this);
    }

    onFødselsdatoChange(dato: DateValue, idx: number) {
        const datoer = [...this.props.fødselsdatoer];
        datoer[idx] = dato;
        this.props.onChangeFødselsdato(datoer);
    }

    getFødselsdatoAvgrensninger() {
        return {
            ...fødselsdatoAvgrensninger,
            ...this.props.datoavgrensninger,
        };
    }

    getTermindatoAvgrensninger() {
        return {
            ...termindatoAvgrensningerFodsel,
        };
    }

    getValidatorer(): Validator[] {
        const { fødselsdatoer, datovalidatorer, intl } = this.props;
        return [
            ...(datovalidatorer || []),
            ...getFødselsdatoRegler(fødselsdatoer[0], this.props.gjelderAdopsjon === true, intl),
        ];
    }

    getTermindatoValidatorer(): Validator[] {
        const { termindato, datovalidatorer, intl } = this.props;

        const forLangtFremITidRegel: Validator = {
            test: () => {
                const wrappedTermindato = moment(termindato);
                return moment().add(9, 'months').isSameOrAfter(wrappedTermindato, 'day');
            },
            failText: getMessage(intl, 'valideringsfeil.termindato.forLangtFremITid'),
        };

        return [...(datovalidatorer || []), getTermindatoRegler(termindato, intl)[0], forLangtFremITidRegel];
    }

    visTermindato(
        fødselsdatoer: DateValue[],
        erFarMedmor: boolean | undefined,
        gjelderAdopsjon: boolean | undefined
    ): boolean {
        if (gjelderAdopsjon) {
            return false;
        }

        if (fødselsdatoer.length > 0) {
            if (erFarMedmor) {
                return moment(fødselsdatoer[0]).isSameOrAfter(dateMoreThan10WeeksAgo);
            }

            return true;
        }

        return false;
    }

    renderCollapsedFødselsdatoSpørsmål() {
        const { fødselsdatoer, antallBarn, termindato, erFarMedmor, gjelderAdopsjon } = this.props;

        let intlIdFødsel = 'fødselsdatoer.fødsel';
        let intlIdTermin = 'fødselsdatoer.termin';

        if (antallBarn !== undefined && antallBarn > 1) {
            intlIdFødsel = 'fødselsdatoer.fødsel.flereBarn';
            intlIdTermin = 'fødselsdatoer.termin.flereBarn';
        }

        return (
            <>
                <Block>
                    <DatoInput
                        inputId="fødselsdato"
                        name="fødsesdato"
                        dato={fødselsdatoer[0]}
                        onChange={(d: Date) => this.onFødselsdatoChange(d, 0)}
                        label={<Labeltekst intlId={intlIdFødsel} />}
                        datoAvgrensinger={this.getFødselsdatoAvgrensninger()}
                        validators={this.getValidatorer()}
                    />
                </Block>
                <Block visible={this.visTermindato(fødselsdatoer, erFarMedmor, gjelderAdopsjon)}>
                    <DatoInput
                        inputId="termindato"
                        name="termindato"
                        dato={termindato}
                        onChange={(d: Date) => this.props.onChangeTermindato!(d)}
                        label={<Labeltekst intlId={intlIdTermin} />}
                        datoAvgrensinger={this.getTermindatoAvgrensninger()}
                        validators={this.getTermindatoValidatorer()}
                    />
                </Block>
            </>
        );
    }

    renderExpandedFødselsdatoSpørsmål() {
        const { fødselsdatoer } = this.props;
        return (
            <React.Fragment>
                {fødselsdatoer.map((dato: DateValue, idx: number) => (
                    <div className="blokk-m" key={getKey(idx)}>
                        <DatoInput
                            inputId={getKey(idx)}
                            name={getKey(idx)}
                            dato={dato}
                            onChange={(d: Date) => this.onFødselsdatoChange(d, idx)}
                            label={<Labeltekst intlId={`fødselsdatoer.flere.${idx + 1}`} />}
                            datoAvgrensinger={this.getFødselsdatoAvgrensninger()}
                            validators={this.getValidatorer()}
                        />
                    </div>
                ))}
            </React.Fragment>
        );
    }

    render() {
        const { collapsed } = this.props;
        return collapsed ? this.renderCollapsedFødselsdatoSpørsmål() : this.renderExpandedFødselsdatoSpørsmål();
    }
}

export default injectIntl(FødselsdatoerSpørsmål);
