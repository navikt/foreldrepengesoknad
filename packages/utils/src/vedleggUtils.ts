// Backenden konverterer alle opplasta vedlegg (png/jpg) til PDF ved opplasting, så
// nedlastinga frå mellomlagringa er alltid ei PDF-fil. Vi byter difor ut filendinga
// med .pdf slik at nedlasta fil får rett innhaldstype og kan opnast.
export const vedleggNedlastingsnavn = (filnavn: string): string => `${filnavn.replace(/\.[^./\\]+$/, '')}.pdf`;
