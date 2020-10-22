import * as React from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import { ISOStringToDate } from '@navikt/sif-common-formik';
import moment from 'moment';
import Block from 'common/components/block/Block';
import Labeltekst from 'common/components/labeltekst/Labeltekst';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import { Validator } from 'common/lib/validation/types';
import { Avgrensninger } from 'common/types';
import getMessage from 'common/util/i18nUtils';
import { getTermindatoRegler, termindatoAvgrensningerFodsel } from 'app/util/validation/termindato';
import { dateMoreThan10WeeksAgo } from 'app/util/validation/values';
import { fødselsdatoAvgrensninger, getFødselsdatoRegler } from '../util/validation/fødselsdato';

export interface FødselsdatoerSpørsmålProps {
    fødselsdatoer: string[];
    termindato?: string;
    antallBarn: number | undefined;
    onChangeFødselsdato: (fødselsdatoer: string[]) => void;
    onChangeTermindato?: (termindato: string) => void;
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

    onFødselsdatoChange(dato: string, idx: number) {
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
        const fødselsdato = fødselsdatoer.length > 0 ? ISOStringToDate(fødselsdatoer[0]) : undefined;
        return [
            ...(datovalidatorer || []),
            ...getFødselsdatoRegler(fødselsdato, this.props.gjelderAdopsjon === true, intl),
        ];
    }

    getTermindatoValidatorer(): Validator[] {
        const { datovalidatorer, intl } = this.props;
        const termindato = ISOStringToDate(this.props.termindato);
        const forLangtFremITidRegel: Validator = {
            test: () => {
                return moment().add(9, 'months').isSameOrAfter(moment(termindato), 'day');
            },
            failText: getMessage(intl, 'valideringsfeil.termindato.forLangtFremITid'),
        };

        return [...(datovalidatorer || []), getTermindatoRegler(termindato, intl)[0], forLangtFremITidRegel];
    }

    visTermindato(
        fødselsdatoer: string[],
        erFarMedmor: boolean | undefined,
        gjelderAdopsjon: boolean | undefined
    ): boolean {
        if (gjelderAdopsjon) {
            return false;
        }
        const fødselsdato = fødselsdatoer.length > 0 ? ISOStringToDate(fødselsdatoer[0]) : undefined;
        if (fødselsdato) {
            if (erFarMedmor) {
                return moment(fødselsdato).isSameOrAfter(dateMoreThan10WeeksAgo);
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

        const { onChangeTermindato } = this.props;

        return (
            <>
                <Block>
                    <DatoInput
                        id="fødselsdato"
                        name="fødsesdato"
                        dato={fødselsdatoer[0]}
                        onChange={(d) => this.onFødselsdatoChange(d, 0)}
                        label={<Labeltekst intlId={intlIdFødsel} />}
                        datoAvgrensinger={this.getFødselsdatoAvgrensninger()}
                        validators={this.getValidatorer()}
                    />
                </Block>
                {onChangeTermindato && (
                    <Block visible={this.visTermindato(fødselsdatoer, erFarMedmor, gjelderAdopsjon)}>
                        <DatoInput
                            id="termindato"
                            name="termindato"
                            dato={termindato}
                            onChange={(d) => onChangeTermindato(d)}
                            label={<Labeltekst intlId={intlIdTermin} />}
                            datoAvgrensinger={this.getTermindatoAvgrensninger()}
                            validators={this.getTermindatoValidatorer()}
                        />
                    </Block>
                )}
            </>
        );
    }

    renderExpandedFødselsdatoSpørsmål() {
        const { fødselsdatoer } = this.props;
        return (
            <React.Fragment>
                {fødselsdatoer.map((dato, idx) => (
                    <div className="blokk-m" key={getKey(idx)}>
                        <DatoInput
                            id={getKey(idx)}
                            name={getKey(idx)}
                            dato={dato}
                            onChange={(d) => this.onFødselsdatoChange(d, idx)}
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
