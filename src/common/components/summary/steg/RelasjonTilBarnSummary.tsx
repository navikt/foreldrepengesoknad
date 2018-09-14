import * as React from 'react';
import getMessage from 'common/util/i18nUtils';
import EtikettBase, { EtikettBaseProps } from 'nav-frontend-etiketter';

import DisplayTextWithLabel from 'common/components/display-text-with-label/DisplayTextWithLabel';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { formatDate } from '../../../../app/util/dates/dates';
import Barn, { Adopsjonsbarn, ForeldreansvarBarn, FødtBarn, UfødtBarn } from '../../../../app/types/søknad/Barn';
import { Søkersituasjon } from '../../../../app/types/søknad/Søknad';
import DisplayContentWithLabel from 'common/components/display-content-with-label/DisplayContentWithLabel';
import AnnenForelder from '../../../../app/types/søknad/AnnenForelder';
import { createListOfAttachmentPreviewLinks } from 'common/components/summary/util';

interface RelasjonTilBarnOppsummeringProps {
    barn: Barn;
    annenForelder: AnnenForelder;
    situasjon: Søkersituasjon;
    skalLasteOppTerminbekreftelse: boolean;
}

type Props = RelasjonTilBarnOppsummeringProps & InjectedIntlProps;
class RelasjonTilBarnSummary extends React.Component<Props> {
    getAntallBarnSummaryText(antallBarn: number): string {
        const { intl } = this.props;
        if (antallBarn === 1) {
            return getMessage(intl, 'oppsummering.ettBarn');
        } else if (antallBarn === 2) {
            return getMessage(intl, 'oppsummering.tvillinger');
        } else {
            return getMessage(intl, 'oppsummering.antallBarn.flere', {
                antall: antallBarn
            });
        }
    }

    missingAttachmentEtikettProps(): EtikettBaseProps {
        return {
            type: 'fokus',
            children: getMessage(this.props.intl, 'dokumentasjon.mangler')
        };
    }

    renderOppsummeringForeldreansvar() {
        const { barn, intl } = this.props;
        const { antallBarn, fødselsdatoer, foreldreansvarsdato, adopsjonsvedtak } = barn as ForeldreansvarBarn;

        return (
            <React.Fragment>
                {foreldreansvarsdato && (
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'Dato for foreldreansvar')}
                        text={formatDate(foreldreansvarsdato) || ''}
                    />
                )}
                {antallBarn && (
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'Antall barn')}
                        text={this.getAntallBarnSummaryText(antallBarn)}
                    />
                )}
                {fødselsdatoer && (
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'Gjelder søknaden adopsjon av ektefellesbarn/stebarnsadopsjon?')}
                        text={formatDate(fødselsdatoer[0]) || ''}
                    />
                )}
                {adopsjonsvedtak && adopsjonsvedtak.length > 0 ? (
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'oppsummering.adopsjonsvedtak')}
                        text={adopsjonsvedtak.map((vedlegg) => vedlegg.filename)}
                    />
                ) : (
                    <DisplayContentWithLabel label={getMessage(intl, 'oppsummering.adopsjonsvedtak')}>
                        <EtikettBase {...this.missingAttachmentEtikettProps()} />
                    </DisplayContentWithLabel>
                )}
            </React.Fragment>
        );
    }

    renderOppsummeringAdopsjon() {
        const { barn, intl } = this.props;
        const {
            antallBarn,
            fødselsdatoer,
            adopsjonsdato,
            ankomstdato,
            adopsjonAvEktefellesBarn,
            adoptertIUtlandet,
            omsorgsovertakelse
        } = barn as Adopsjonsbarn;

        return (
            <React.Fragment>
                <DisplayTextWithLabel
                    label={getMessage(intl, 'Gjelder søknaden adopsjon av ektefellesbarn/stebarnsadopsjon?')}
                    text={formatDate(fødselsdatoer[0]) || ''}
                />
                <DisplayTextWithLabel
                    label={getMessage(intl, 'Når er er dato for omsorgsovertakelse?')}
                    text={adopsjonAvEktefellesBarn ? 'adopsjonAvEktefellesBarn' : 'ikkeAdopsjonAvEktefellesBarn'}
                />
                {antallBarn && (
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'Antall barn')}
                        text={this.getAntallBarnSummaryText(antallBarn)}
                    />
                )}
                {adopsjonsdato && (
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'adopsjonsdato')}
                        text={formatDate(adopsjonsdato) || ''}
                    />
                )}
                <DisplayTextWithLabel
                    label={getMessage(intl, 'Når er er dato for omsorgsovertakelse?')}
                    text={adoptertIUtlandet ? 'adoptertIUtlandet' : 'ikkeAdoptertIUtlandet'}
                />
                {ankomstdato && (
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'ankomstdato')}
                        text={formatDate(ankomstdato) || ''}
                    />
                )}
                {omsorgsovertakelse && omsorgsovertakelse.length > 0 ? (
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'oppsummering.terminbekreftelse')}
                        text={omsorgsovertakelse.map((vedlegg) => vedlegg.filename)}
                    />
                ) : (
                    <DisplayContentWithLabel label={getMessage(intl, 'vedlegg omsorgsovertakelse')}>
                        <EtikettBase {...this.missingAttachmentEtikettProps()} />
                    </DisplayContentWithLabel>
                )}
            </React.Fragment>
        );
    }

    renderOppsummeringFødsel() {
        const { barn, intl } = this.props;
        const { antallBarn } = barn;
        return (
            <React.Fragment>
                {antallBarn && (
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'oppsummering.antallBarn.label')}
                        text={this.getAntallBarnSummaryText(antallBarn)}
                    />
                )}
                {this.props.barn.erBarnetFødt ? this.renderOppsummeringFødtBarn() : this.renderOppsummeringUfødtBarn()}
            </React.Fragment>
        );
    }

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
                        label={getMessage(intl, 'oppsummering.fødselsattest')}
                        text={fødselsattest.map((vedlegg) => vedlegg.filename)}
                    />
                )}
                {fødselsattest === undefined && (
                    <DisplayContentWithLabel label={getMessage(intl, 'oppsummering.fødselsattest')}>
                        <EtikettBase {...this.missingAttachmentEtikettProps()} />
                    </DisplayContentWithLabel>
                )}
            </React.Fragment>
        );
    }

    renderOppsummeringUfødtBarn() {
        const { barn, skalLasteOppTerminbekreftelse, annenForelder, intl } = this.props;
        const { terminbekreftelseDato, termindato, terminbekreftelse } = barn as UfødtBarn;

        return (
            <React.Fragment>
                {annenForelder.erForSyk !== undefined && (
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'annenForelder.erForSyk')}
                        text={annenForelder.erForSyk ? 'ja' : 'nei'}
                    />
                )}
                <DisplayTextWithLabel
                    label={getMessage(intl, 'oppsummering.termindato')}
                    text={formatDate(termindato) || ''}
                />
                {terminbekreftelse &&
                    terminbekreftelse.length > 0 && (
                        <DisplayContentWithLabel label={getMessage(intl, 'oppsummering.terminbekreftelse')}>
                            {createListOfAttachmentPreviewLinks(terminbekreftelse)}
                        </DisplayContentWithLabel>
                    )}
                {terminbekreftelse === undefined &&
                    skalLasteOppTerminbekreftelse && (
                        <DisplayContentWithLabel label={getMessage(intl, 'oppsummering.terminbekreftelse')}>
                            <EtikettBase {...this.missingAttachmentEtikettProps()} />
                        </DisplayContentWithLabel>
                    )}
                {terminbekreftelseDato && (
                    <DisplayTextWithLabel
                        label={getMessage(intl, 'oppsummering.terminbekreftelseDato')}
                        text={formatDate(terminbekreftelseDato) || ''}
                    />
                )}
            </React.Fragment>
        );
    }

    renderPartial() {
        switch (this.props.situasjon) {
            case Søkersituasjon.FØDSEL:
                return this.renderOppsummeringFødsel();
            case Søkersituasjon.ADOPSJON:
                return this.renderOppsummeringAdopsjon();
            case Søkersituasjon.FORELDREANSVAR:
                return this.renderOppsummeringForeldreansvar();
            default:
                return null;
        }
    }

    render() {
        return <div className="summary">{this.renderPartial()}</div>;
    }
}
export default injectIntl(RelasjonTilBarnSummary);
