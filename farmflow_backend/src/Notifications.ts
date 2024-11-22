import { IDL } from "azle";

export default class Notifications {
  id: number;
  title: string;
  message: string;
  timestamp: string;

  constructor(id: number, title: string, message: string, timestamp: string) {
    this.id = id;
    this.title = title;
    this.message = message;
    this.timestamp = timestamp;
  }
  static idlFactory: IDL.RecordClass = IDL.Record({
    id: IDL.Nat,
    title: IDL.Text,
    message: IDL.Text,
    timestamp: IDL.Text,
  });
}
