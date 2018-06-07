import * as React from 'react';
import CheckboksPanelGruppeResponsive from 'common/components/checkbox-panel-gruppe-responsive/CheckboksPanelGruppeResponsive';
import { InjectedIntlProps } from 'react-intl';
import { AnnenInntektType } from '../types/søknad/AnnenInntekt';

export interface OwnProps {
    andreInntekter: AnnenInntektType[];
    onChange: (value?: string) => void;
}

type Props = OwnProps & InjectedIntlProps;

export default class AnnenInntektSiste10MndSpørsmål extends React.Component<
    Props
> {
    render() {
        const { andreInntekter, onChange } = this.props;

        return (
            <CheckboksPanelGruppeResponsive
                legend="Har du hatt inntekt gjennom noen av disse de siste 10 månedene?"
                checkboxes={[
                    {
                        checked: andreInntekter.indexOf('sluttvederlag') >= 0,
                        label: 'Sluttvederlag, sluttpakke eller etterlønn',
                        value: 'sluttvederlag'
                    },
                    {
                        checked: andreInntekter.indexOf('ventelønn') >= 0,
                        label: 'Ventelønn',
                        value: 'ventelønn'
                    },
                    {
                        checked: andreInntekter.indexOf('militæret') >= 0,
                        label:
                            'Militæret, siviltjeneste eller sivilforsvarstjeneste',
                        value: 'militæret'
                    },
                    {
                        checked: andreInntekter.indexOf('videreutdanning') >= 0,
                        label: 'Videreutdanning eller etterutdanning',
                        value: 'videreutdanning'
                    }
                ]}
                onChange={(
                    event: React.SyntheticEvent<EventTarget>,
                    value: string
                ) => onChange(value)}
            />
        );
    }
}
