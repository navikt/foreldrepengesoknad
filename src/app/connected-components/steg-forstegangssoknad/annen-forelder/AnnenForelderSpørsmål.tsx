import * as React from 'react';
import Block from 'common/components/block/Block';
import { Checkbox } from 'nav-frontend-skjema';
import FødselsnummerBolk from '../../../bolker/FødselsnummerBolk';
import NavnPåAnnenForelderSpørsmål from '../../../spørsmål/NavnPåAnnenForelderSpørsmål';
import Søknad, { Søkersituasjon, Skjemanummer } from '../../../types/søknad/Søknad';
import { InjectedIntlProps, FormattedMessage, injectIntl } from 'react-intl';
import ErMorUførSpørsmål from '../../../spørsmål/ErMorUførSpørsmål';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import ErAnnenForelderInformertSpørsmål from '../../../spørsmål/ErAnnenForelderInformertSpørsmål';
import DatoInput from 'common/components/skjema/wrappers/DatoInput';
import AttachmentsUploaderPure from 'common/storage/attachment/components/AttachmentUploaderPure';
import AnnenForelder from '../../../types/søknad/AnnenForelder';
import getMessage from 'common/util/i18nUtils';
import AleneOmOmsorgSpørsmål from '../../../spørsmål/AleneOmOmsorgSpørsmål';
import { Søker } from '../../../types/søknad/Søker';
import RettPåForeldrepengerSpørsmål from '../../../spørsmål/RettPåForeldrepengerSpørsmål';
import { Barn } from '../../../types/søknad/Barn';
import { AttachmentType } from 'common/storage/attachment/types/AttachmentType';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { AnnenForelderSpørsmålKeys, AnnenForelderStegVisibility } from './visibility/annenForelderStegVisibility';

export interface OwnProps {
    annenForelder: AnnenForelder;
    søkerFnr: string;
    søker: Søker;
    søknad: Partial<Søknad>;
    situasjon: Søkersituasjon;
    visibility: AnnenForelderStegVisibility;
    barn: Barn;
    onBarnChange: (barn: Partial<Barn>) => void;
    onAnnenForelderChange: (barn: Partial<AnnenForelder>) => void;
    onSøkerChange: (søker: Partial<Søker>) => void;
    onFilesSelect: (attachments: Attachment[]) => void;
    onFileDelete: (attachment: Attachment) => void;
}

type Props = OwnProps & InjectedIntlProps;

class AnnenForelderSpørsmål extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
        this.annenForelderKanIkkeOppgis = this.annenForelderKanIkkeOppgis.bind(this);
    }
    annenForelderKanIkkeOppgis() {
        this.props.onAnnenForelderChange({
            kanIkkeOppgis: !this.props.annenForelder.kanIkkeOppgis,
            fornavn: undefined,
            etternavn: undefined,
            fnr: undefined,
            utenlandskFnr: undefined,
            harRettPåForeldrepenger: undefined
        });
    }
    render() {
        const {
            søkerFnr,
            søker,
            annenForelder,
            barn,
            situasjon,
            visibility,
            onAnnenForelderChange,
            onBarnChange,
            onSøkerChange,
            onFileDelete,
            onFilesSelect,
            intl
        } = this.props;

        const { kanIkkeOppgis, fornavn, etternavn } = annenForelder!;

        return (
            <>
                <Block margin="xs" visible={visibility.isVisible(AnnenForelderSpørsmålKeys.navnPåAnnenForelder)}>
                    <NavnPåAnnenForelderSpørsmål
                        fornavn={fornavn}
                        etternavn={etternavn}
                        kanIkkeOppgis={kanIkkeOppgis}
                        onChange={onAnnenForelderChange}
                    />
                </Block>

                <Block visible={visibility.isVisible(AnnenForelderSpørsmålKeys.kanIkkeOppgis)}>
                    <Checkbox
                        checked={kanIkkeOppgis || false}
                        label={
                            situasjon === Søkersituasjon.ADOPSJON
                                ? getMessage(intl, 'annenForelder.spørsmål.adoptererAlene')
                                : getMessage(intl, 'annenForelder.spørsmål.kanOppgis')
                        }
                        onChange={this.annenForelderKanIkkeOppgis}
                    />
                </Block>

                <Block visible={visibility.isVisible(AnnenForelderSpørsmålKeys.fødselsnummer)} hasChildBlocks={true}>
                    <FødselsnummerBolk
                        kanIkkeOppgis={kanIkkeOppgis}
                        søkersFødselsnummer={søkerFnr}
                        navn={fornavn}
                        fnr={annenForelder.fnr}
                        utenlandskFnr={annenForelder.utenlandskFnr}
                        bostedsland={annenForelder.bostedsland}
                        onChange={onAnnenForelderChange}
                    />
                </Block>

                <Block visible={visibility.isVisible(AnnenForelderSpørsmålKeys.deltOmsorg)}>
                    <AleneOmOmsorgSpørsmål
                        aleneOmOmsorg={søker.erAleneOmOmsorg}
                        onChange={(deltOmsorg) => onSøkerChange({ erAleneOmOmsorg: !deltOmsorg })}
                    />
                </Block>

                <Block visible={visibility.isVisible(AnnenForelderSpørsmålKeys.harRettPåForeldrepenger)}>
                    <RettPåForeldrepengerSpørsmål
                        navnAnnenForelder={annenForelder.fornavn}
                        harAnnenForelderRettPåForeldrepenger={annenForelder.harRettPåForeldrepenger}
                        onChange={(harRettPåForeldrepenger) => onAnnenForelderChange({ harRettPåForeldrepenger })}
                    />
                </Block>

                <Block visible={visibility.isVisible(AnnenForelderSpørsmålKeys.erMorUfør)}>
                    <ErMorUførSpørsmål
                        navn={annenForelder.fornavn}
                        erUfør={annenForelder.erUfør}
                        onChange={(erUfør) => onAnnenForelderChange({ erUfør })}
                    />
                </Block>

                <Block
                    visible={
                        visibility.isVisible(AnnenForelderSpørsmålKeys.harRettPåForeldrepenger) &&
                        annenForelder.harRettPåForeldrepenger === true
                    }>
                    <Veilederinfo>
                        {getMessage(intl, 'annenForelder.veileder.rettigheterOgDelingAvUttaksplan', {
                            navn: annenForelder.fornavn
                        })}
                    </Veilederinfo>
                </Block>

                <Block visible={visibility.isVisible(AnnenForelderSpørsmålKeys.erAnnenForelderInformert)}>
                    <ErAnnenForelderInformertSpørsmål
                        navn={annenForelder.fornavn}
                        erAnnenForelderInformert={annenForelder.erInformertOmSøknaden}
                        onChange={(erInformertOmSøknaden) => onAnnenForelderChange({ erInformertOmSøknaden })}
                    />
                </Block>
                <Block visible={visibility.isVisible(AnnenForelderSpørsmålKeys.datoForAleneomsorg)}>
                    <DatoInput
                        name="datoForAleneomsorg"
                        id="datoForAleneomsorg"
                        label={getMessage(intl, 'datoForAleneomsorg.spørsmål')}
                        onChange={(datoForAleneomsorg: Date | undefined) => onBarnChange({ datoForAleneomsorg })}
                        dato={barn.datoForAleneomsorg}
                    />
                </Block>
                <Block
                    visible={
                        visibility.isVisible(AnnenForelderSpørsmålKeys.datoForAleneomsorg) &&
                        barn.datoForAleneomsorg !== undefined
                    }>
                    <Block margin="xs">
                        <Veilederinfo>
                            <FormattedMessage id="far.dokumantasjonAvAleneomsorg.vedlegg.veileder" />
                        </Veilederinfo>
                    </Block>

                    <AttachmentsUploaderPure
                        attachments={barn.dokumentasjonAvAleneomsorg || []}
                        attachmentType={AttachmentType.ALENEOMSORG}
                        onFilesSelect={onFilesSelect}
                        onFileDelete={onFileDelete}
                        skjemanummer={Skjemanummer.ANNET}
                    />
                </Block>
            </>
        );
    }
}

export default injectIntl(AnnenForelderSpørsmål);
