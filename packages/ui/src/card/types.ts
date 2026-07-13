/**
 * Storleik på kortet, jf. card-anatomien: kvar storleik svarar til éin visningskontekst.
 * - `micro`  – kalender-celle (t.d. Manedsvisning)
 * - `small`  – ukesvisning (t.d. Ukevisning)
 * - `medium` – listevisning
 * - `xl`     – dagsvisning/detaljvising
 */
export type CardSize = 'micro' | 'small' | 'medium' | 'xl';

/**
 * Fargekanal 1 i card-anatomien: kva kortet «er». Tonen eig bakgrunnen. Dette er generiske
 * Aksel-tonar – kva ein gjeven tone betyr i domenet (t.d. at «accent» tyder «mors periode») er
 * opp til den som brukar `Card`, ikkje kortet sjølv. Er `tone` utelaten, får kortet ei nøytral,
 * ufylt framtoning (t.d. ein dag som endå ikkje har fått noko innhald).
 */
export type CardTone = 'accent' | 'success' | 'brand-beige' | 'warning' | 'danger';

/**
 * Fargekanal 2 i card-anatomien: kortets tilstand. Uttrykt som ein border lagt oppå
 * bakgrunnen – bytter aldri ut tonen. Kombiner med `CardBadge` for å forklare kva staten
 * betyr (kva slags state, aldri kven kortet tilhøyrer).
 */
export type CardStateTone = 'warning' | 'danger';
