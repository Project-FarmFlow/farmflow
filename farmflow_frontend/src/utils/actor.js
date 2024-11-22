import { Actor, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";

const canisterId = Principal.fromText("a3shf-5eaaa-aaaaa-qaafa-cai");

const agent = new HttpAgent({ host: "http://127.0.0.1:4943" });

if (process.env.NODE_ENV === "development") {
  agent.fetchRootKey();
}

const DataIDLFactory = (IDL) => {
  return IDL.Record({
    data: IDL.Nat,
    timestamp: IDL.Text,
  });
};

const NotificationsIDLFactory = (IDL) => {
  return IDL.Record({
    id: IDL.Nat,
    title: IDL.Text,
    message: IDL.Text,
    timestamp: IDL.Text,
  });
};

const SensorIDLFactory = (IDL) => {
  return IDL.Record({
    id: IDL.Nat,
    name: IDL.Text,
    typeOfSensor: IDL.Text,
    greenhouseId: IDL.Text,
    condition: IDL.Text,
    data: IDL.Vec(DataIDLFactory(IDL)),
  });
};

const GreenHouseIDLFactory = (IDL) => {
  return IDL.Record({
    id: IDL.Nat,
    name: IDL.Text,
    location: IDL.Text,
    farmerId: IDL.Text,
    sensors: IDL.Vec(SensorIDLFactory(IDL)),
    moistureLevel: IDL.Float64,
  });
};

const FarmerIDLFactory = (IDL) => {
  return IDL.Record({
    id: IDL.Text,
    username: IDL.Text,
    password: IDL.Text,
    email: IDL.Text,
    phone: IDL.Text,
    location: IDL.Text,
    subscription: IDL.Text,
    greenhouses: IDL.Vec(GreenHouseIDLFactory(IDL)),
    notifications: IDL.Vec(NotificationsIDLFactory(IDL)),
  });
};

const actor = Actor.createActor(
  ({ IDL }) => {
    return IDL.Service({
      createFarmer: IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Vec(GreenHouseIDLFactory(IDL)),
          IDL.Vec(NotificationsIDLFactory(IDL)),
        ],
        [],
        []
      ),
      createGreenHouse: IDL.Func(
        [
          IDL.Nat,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Vec(SensorIDLFactory(IDL)),
          IDL.Float64,
        ],
        [],
        []
      ),
      createSensor: IDL.Func(
        [
          IDL.Text,
          IDL.Nat,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Vec(DataIDLFactory(IDL)),
        ],
        [],
        []
      ),
      getFarmerById: IDL.Func([IDL.Text], [FarmerIDLFactory(IDL)], []),
      getGreenHouseById: IDL.Func([IDL.Nat], [GreenHouseIDLFactory(IDL)], []),
      checkIfFarmerIsRegistered: IDL.Func([IDL.Text], [IDL.Bool], []),
      getHistoricalData: IDL.Func(
        [IDL.Text, IDL.Nat],
        [IDL.Vec(DataIDLFactory(IDL))],
        []
      ),
      getSensorReadings: IDL.Func(
        [IDL.Text, IDL.Nat],
        [DataIDLFactory(IDL)],
        []
      ),
      checkIfSensorTypeExists: IDL.Func([IDL.Text, IDL.Nat], [IDL.Bool], []),
    });
  },
  { agent, canisterId }
);

export default actor;
