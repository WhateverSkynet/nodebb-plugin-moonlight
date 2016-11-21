

export interface Character {
  guid: string;
  name: string;
  lastModified: number;
  realm: string;
  class: number;
  race: number;
  level: number;
  thumbnail: string;
  rank: number;
  specialization?: string;
  averageItemLevelEquipped: number;
  totalArtifactPower: number;
  audit: CharacterAudit;
}

export interface CharacterAudit {
  socket: {
    count: number;
  };
  set: {
    parts: number[]
  };
  artifact: {
    traitCount: number;
    itemLevel: number;
  };
}

