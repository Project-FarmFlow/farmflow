import { Actor, HttpAgent } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";

const canisterId = Principal.fromText("a3shf-5eaaa-aaaaa-qaafa-cai");

const agent = new HttpAgent({ host: "http://127.0.0.1:4943" });

if (process.env.NODE_ENV === "development") {
  agent.fetchRootKey();
}

const SensorIDLFactory = (IDL) => {
  return IDL.Record({
    id: IDL.Nat,
    name: IDL.Text,
    typeOfSensor: IDL.Text,
    greenhouseId: IDL.Text,
    condition: IDL.Text,
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
        ],
        [],
        []
      ),
      createGreenHouse: IDL.Func(
        [IDL.Nat, IDL.Text, IDL.Text, IDL.Vec(SensorIDLFactory(IDL)), IDL.Nat],
        [],
        []
      ),
    });
  },
  { agent, canisterId }
);

export default actor;
