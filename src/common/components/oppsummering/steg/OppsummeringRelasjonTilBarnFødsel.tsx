import * as React from 'react';
import getMessage from 'common/util/i18nUtils';
import DisplayTextWithLabel from 'common/components/display-text-with-label/DisplayTextWithLabel';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { formatDate } from '../../../../app/util/dates/dates';
import { FødtBarn, BarnPartial, UfødtBarn } from '../../../../app/types/søknad/Barn';

interface OppsummeringRelasjonTilBarnFødselProps {
    barn: BarnPartial;
}

type Props = OppsummeringRelasjonTilBarnFødselProps & InjectedIntlProps;
class OppsummeringRelasjonTilBarFødsel extends React.Component<Props> {
    renderOppsummeringFødtBarn() {
        const { barn, intl } = this.props;
        const { fødselsdatoer, fødselsattest } = barn as FødtBarn;

        return (
            <React.Fragment>
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.fødselsdato')}
                    text={formatDate(fødselsdatoer[0]) || ''}
                />
                {fødselsattest && (
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'oppsummering.terminbekreftelse')}
                        text={fødselsattest.map((vedlegg) => vedlegg.filename)}
                    />
                )}
            </React.Fragment>
        );
    }

    renderOppsummeringUfødtBarn() {
        const { barn, intl } = this.props;
        const { terminbekreftelseDato, termindato, terminbekreftelse } = barn as UfødtBarn;

        if (termindato === undefined || terminbekreftelseDato === undefined) {
            return;
        }

        return (
            <React.Fragment>
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.termindato')}
                    text={formatDate(termindato) || ''}
                />
                {terminbekreftelse && (
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'oppsummering.terminbekreftelse')}
                        text={terminbekreftelse.map((vedlegg) => vedlegg.filename)}
                    />
                )}
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.terminbekreftelseDato')}
                    text={formatDate(terminbekreftelseDato) || ''}
                />
            </React.Fragment>
        );
    }

    render() {
        const { barn, intl } = this.props;
        const { erBarnetFødt, antallBarn } = barn;

        let antallBarnSummaryText;
        if (antallBarn === 1) {
            antallBarnSummaryText = getMessage(intl, 'oppsummering.ettBarn');
        } else if (antallBarn === 2) {
            antallBarnSummaryText = getMessage(intl, 'oppsummering.tvillinger');
        } else {
            antallBarnSummaryText = getMessage(intl, 'oppsummering.antallBarn.flere', {
                antall: antallBarn
            });
        }

        return (
            <React.Fragment>
                {antallBarn && (
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'oppsummering.antallBarn.label')}
                        text={antallBarnSummaryText}
                    />
                )}
                {erBarnetFødt ? this.renderOppsummeringFødtBarn() : this.renderOppsummeringUfødtBarn()}
            </React.Fragment>
        );
    }
}
export default injectIntl(OppsummeringRelasjonTilBarFødsel);
