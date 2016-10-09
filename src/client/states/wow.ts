import { CharacterClass } from '../../models/wow';
export interface WoWState {
  realms?: string[];
  classes?: CharacterClass[];
}