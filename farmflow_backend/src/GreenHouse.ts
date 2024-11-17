import { IDL } from "azle";
import Sensor from "./Sensor";

export default class GreenHouse {
  id: number;
  name: string;
  location: string;
  farmerId: string;
  sensors: Sensor[];
  moistureLevel: number;

  constructor(
    id: number,
    name: string,
    location: string,
    farmerId: string,
    sensors: Sensor[],
    moistureLevel: number
  ) {
    this.id = id;
    this.name = name;
    this.location = location;
    this.farmerId = farmerId;
    this.sensors = sensors;
    this.moistureLevel = moistureLevel;
  }

  static idlFactory: IDL.RecordClass = IDL.Record({
    id: IDL.Nat,
    name: IDL.Text,
    location: IDL.Text,
    farmerId: IDL.Text,
    sensors: IDL.Vec(Sensor.idlFactory),
    moistureLevel: IDL.Float64,
  });
}