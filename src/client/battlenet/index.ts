
export class Character {
    public id: number = new Date().getTime()
    public name: string;
    public realm: string;
    public class: string;
    public userInterfaceUrl: string;
    public primarySpecialization: string;
    public secondarySpecialization: string;
}

export class Specialization {
    public name: string;
    public role: string;
    public backgroundImage: string;
    public icon: string;
    public description: string;
    public order: number;
}

export class CharacterClass {
    public id: number;
    public mask: number;
    public powerType: string;
    public name: string;
    public specs: Specialization[] = [];
}
