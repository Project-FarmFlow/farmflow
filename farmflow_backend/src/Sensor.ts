import { IDL } from "azle";
import Data from "./Data";

export default class Sensor {
  id: number;
  name: string;
  typeOfSensor: string;
  greenhouseId: string;
  condition: string;
  data: Data[];

  constructor(
    id: number,
    name: string,
    typeOfSensor: string,
    greenhouseId: string,
    condition: string,
    data: Data[]
  ) {
    this.id = id;
    this.name = name;
    this.typeOfSensor = typeOfSensor;
    this.greenhouseId = greenhouseId;
    this.condition = condition;
    this.data = data;
  }

  static idlFactory: IDL.RecordClass = IDL.Record({
    id: IDL.Nat,
    name: IDL.Text,
    typeOfSensor: IDL.Text,
    greenhouseId: IDL.Text,
    condition: IDL.Text,
    data: IDL.Vec(Data.idlFactory),
  });
}
