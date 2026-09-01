import { AdopsjonDto, BarnDto, FødselDto, OmsorgsovertakelseDto, TerminDto } from './fpsoknadDtoGenerert';

// Backend sin OpenAPI-spec har eit korrekt discriminator.mapping for BarnDto (adopsjon/fødsel/
// omsorgsovertakelse/termin), men openapi-ts genererer `type: string` i staden for literal-typar per
// variant (varianttypane har ikkje eit eige `type`-felt i spec-en). Difor snevrar ikkje
// `barn.type === 'fødsel'` osv. automatisk inn til rett variant. Desse type guardane gjer det manuelt.
export const isAdopsjonDto = (barn: BarnDto): barn is BarnDto & AdopsjonDto => barn.type === 'adopsjon';

export const isFødselDto = (barn: BarnDto): barn is BarnDto & FødselDto => barn.type === 'fødsel';

export const isOmsorgsovertakelseDto = (barn: BarnDto): barn is BarnDto & OmsorgsovertakelseDto =>
    barn.type === 'omsorgsovertakelse';

export const isTerminDto = (barn: BarnDto): barn is BarnDto & TerminDto => barn.type === 'termin';
