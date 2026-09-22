/**
 * The five homepage sections, in page order. One list feeding both Hero's
 * inline nav and MethodLine's persistent rail, so their labels can't drift
 * apart the way they had (Hero said "What I'm building", the rail said
 * "Building", for the same anchor).
 */
export const SECTIONS = [
  { id: 'building', label: "What I'm building" },
  { id: 'work', label: 'Selected work' },
  { id: 'writing', label: 'Writing' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
] as const
