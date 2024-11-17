import { IDL, query, update } from "azle";
import Farmer from "./Farmer";
import GreenHouse from "./GreenHouse";
import Sensor from "./Sensor";

export default class {
  // ** STORAGE & IDENTIFIERS ** //
  farmers: Farmer[] = [];
  greenHouses: GreenHouse[] = [];
  sensors: Sensor[] = [];

  // ** MAPPINGS ** //
  farmerIdToGreenHouse: Record<string, GreenHouse> = {};
  farmerIdToFarmer: Record<string, Farmer> = {};

  // ** FARMER FUNCTIONS ** //
  // ** get farmer by name ** //
  @query([IDL.Text], IDL.Bool)
  getFarmerByName(name: string): boolean {
    if (this.farmers.find((farmer) => farmer.username === name)) {
      return true;
    } else {
      return false;
    }
  }
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
    const isAvailable = this.getFarmerByName(username);
    if (isAvailable) {
      throw new Error("Farmer already exists");
    } else {
      this.farmerIdToFarmer[id] = new Farmer(
        id,
        username,
        password,
        email,
        phone,
        location,
        subscription,
        greenhouses
      );
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
      this.farmerIdToGreenHouse[farmerId] = new GreenHouse(
        id,
        name,
        location,
        farmerId,
        sensors,
        moistureLevel
      );
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

  // ** SENSOR FUNCTIONS ** //
  // ** create sensor ** //
  @update([IDL.Nat, IDL.Text, IDL.Text, IDL.Text, IDL.Text])
  createSensor(
    id: number,
    name: string,
    typeOfSensor: string,
    greenhouseId: string,
    condition: string
  ): void {
    this.sensors.push(
      new Sensor(id, name, typeOfSensor, greenhouseId, condition)
    );
  }
}
