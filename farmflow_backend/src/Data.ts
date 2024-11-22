import { IDL } from "azle";

export default class Data {
  data: number;
  timestamp: string;

  constructor(data: number, timestamp: string) {
    this.data = data;
    this.timestamp = timestamp;
  }

  static idlFactory: IDL.RecordClass = IDL.Record({
    data: IDL.Nat,
    timestamp: IDL.Text,
  });
}
