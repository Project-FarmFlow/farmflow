import { IDL, query, update } from "azle";
import Farmer from "./Farmer";
import GreenHouse from "./GreenHouse";
import Sensor from "./Sensor";

export default class {
  // ** STORAGE & IDENTIFIERS ** //
  farmers: Farmer[] = [];
  greenHouses: GreenHouse[] = [];
  sensors: Sensor[] = [];

  // ** FARMER FUNCTIONS ** //
  // ** create farmers ** //
  @update([
    IDL.Text,
    IDL.Text,
    IDL.Text,
    IDL.Text,
    IDL.Text,
    IDL.Text,
    IDL.Text,
    IDL.Vec(GreenHouse.idlFactory),
  ])
  createFarmer(
    id: string,
    username: string,
    password: string,
    email: string,
    phone: string,
    location: string,
    subscription: string,
    greenhouses: GreenHouse[]
  ): void {
    this.farmers.push(
      new Farmer(
        id,
        username,
        password,
        email,
        phone,
        location,
        subscription,
        greenhouses
      )
    );
  }
  // ** get all farmers ** //
  @query([], IDL.Vec(Farmer.idlFactory))
  getAllFarmers(): Farmer[] {
    return this.farmers;
  }

  // ** GREENHOUSE FUNCTIONS ** //
  // ** get greenhouse by name ** //
  @query([IDL.Text], IDL.Bool)
  getGreenHouseByName(name: string): boolean {
    if (this.greenHouses.find((greenHouse) => greenHouse.name === name)) {
      return true;
    } else {
      return false;
    }
  }
  // ** create greenhouse ** //
  @update([
    IDL.Nat,
    IDL.Text,
    IDL.Text,
    IDL.Text,
    IDL.Vec(Sensor.idlFactory),
    IDL.Float64,
  ])
  createGreenHouse(
    id: number,
    name: string,
    location: string,
    farmerId: string,
    sensors: Sensor[],
    moistureLevel: number
  ): void {
    const isAvailable = this.getGreenHouseByName(name);
    if (isAvailable) {
      throw new Error("Greenhouse already exists");
    } else {
      this.greenHouses.push(
        new GreenHouse(id, name, location, farmerId, sensors, moistureLevel)
      );
    }
  }
  // ** get all greenhouse ** //
  @query([], IDL.Vec(GreenHouse.idlFactory))
  getAllGreenHouses(): GreenHouse[] {
    return this.greenHouses;
  }
}
