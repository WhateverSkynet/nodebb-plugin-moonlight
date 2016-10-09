
export type CharacterClass = {
    id: number;
    mask: number;
    powerType: string;
    name: string;
    specs: Specialization[];
}

export type Specialization = {
    name: string;
    role: string;
    backgroundImage: string;
    icon: string;
    description: string;
    order: number;
}

export type RosterCharacter = {
    name: string;
    lastModified: number;
    realm: string;
    class: number;
    race: number;
    level: number;
    thumbnail: string;
    rank: number;
    averageItemLevelEquipped: number;
    totalArtifactPower: number;
    audit: CharacterAudit;
}

export type CharacterAudit = {
    socket: {
        count: number;
    };
    set: {
        parts: number[]
    };
    artifact: {
        traitCount: number;
        itemLevel: number;
    }
}

