import { IDL } from "azle";
import GreenHouse from "./GreenHouse";

class Farmer {
  id: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  location: string;
  subscription: string;
  greenhouses: GreenHouse[];

  constructor(
    id: string,
    username: string,
    password: string,
    email: string,
    phone: string,
    location: string,
    subscription: string,
    greenhouses: GreenHouse[]
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.location = location;
    this.subscription = subscription;
    this.greenhouses = greenhouses;
  }

  static idlFactory: IDL.RecordClass = IDL.Record({
    id: IDL.Text,
    username: IDL.Text,
    password: IDL.Text,
    email: IDL.Text,
    phone: IDL.Text,
    location: IDL.Text,
    subscription: IDL.Text,
    greenhouses: IDL.Vec(GreenHouse.idlFactory),
  });
}

export default Farmer;
