import { RosterCharacter } from '../../models/wow';

export interface RosterState {
  characters: RosterCharacter[];
  filters: {
    rank: {[key:string]:boolean};
  };
}