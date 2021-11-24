export interface Heroes {
    id: number;
    name: string;
    images: {
        sm: string;
        lg: string;
    }
    powerstats: {
        intelligence: number;
        strength: number;
        speed: number;
        durability: number;
        power: number;
        combat: number;
    }
}