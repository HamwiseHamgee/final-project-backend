import { ObjectId } from "mongodb";

export default interface Recipe {
_id?: ObjectId;
name: string;
picture: string;
ingredients: string[];
instructions: string;
favorite: boolean;
rating: number;
ranking: number;
}