import { IDL } from "azle";

export default class Sensor {
  id: number;
  name: string;
  typeOfSensor: string;
  greenhouseId: string;
  condition: string;

  constructor(
    id: number,
    name: string,
    typeOfSensor: string,
    greenhouseId: string,
    condition: string
  ) {
    this.id = id;
    this.name = name;
    this.typeOfSensor = typeOfSensor;
    this.greenhouseId = greenhouseId;
    this.condition = condition;
  }

  static idlFactory: IDL.RecordClass = IDL.Record({
    id: IDL.Nat,
    name: IDL.Text,
    typeOfSensor: IDL.Text,
    greenhouseId: IDL.Text,
    condition: IDL.Text,
  });
}
