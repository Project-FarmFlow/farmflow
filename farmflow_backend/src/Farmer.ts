import { IDL } from "azle";
import GreenHouse from "./GreenHouse";
import Notifications from "./Notifications";

class Farmer {
  id: string;
  username: string;
  password: string;
  email: string;
  phone: string;
  location: string;
  subscription: string;
  greenhouses: GreenHouse[];
  notifications: Notifications[];

  constructor(
    id: string,
    username: string,
    password: string,
    email: string,
    phone: string,
    location: string,
    subscription: string,
    greenhouses: GreenHouse[],
    notifications: Notifications[]
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
    this.phone = phone;
    this.location = location;
    this.subscription = subscription;
    this.greenhouses = greenhouses;
    this.notifications = notifications;
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
    notifications: IDL.Vec(Notifications.idlFactory),
  });
}

export default Farmer;
