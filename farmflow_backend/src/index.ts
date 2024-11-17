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
  farmerIdToSensors: Record<string, Sensor[]> = {};
  greenHouseIdToSensors: Record<number, Sensor[]> = {};

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
  // ** create farmer ** //
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
  // ** get farmer by ID ** //
  @query([IDL.Text], Farmer.idlFactory)
  getFarmerById(id: string): Farmer {
    if (this.farmerIdToFarmer[id]) {
      return this.farmerIdToFarmer[id];
    } else {
      throw new Error("Farmer not found");
    }
  }
  // ** update farmer ** //
  @update([IDL.Text, IDL.Text, IDL.Text], Farmer.idlFactory)
  updateFarmerDetails(
    id: string,
    newValue: string,
    fieldToUpdate: string
  ): Farmer {
    if (
      fieldToUpdate !== "username" &&
      fieldToUpdate !== "password" &&
      fieldToUpdate !== "email" &&
      fieldToUpdate !== "phone" &&
      fieldToUpdate !== "location" &&
      fieldToUpdate !== "subscription"
    ) {
      throw new Error("Invalid field to update");
    }
    let farmerToUpdate;
    switch (fieldToUpdate) {
      case "username":
        //update mapping
        this.farmerIdToFarmer[id].username = newValue;
        //update farmers array
        farmerToUpdate = this.getFarmerById(id);
        farmerToUpdate.username = newValue;
        //remove old farmer and push new
        this.farmers = this.farmers.filter((farmer) => farmer.id !== id);
        this.farmers.push(farmerToUpdate);
        break;
      case "password":
        //update mapping
        this.farmerIdToFarmer[id].password = newValue;
        //update farmers array
        farmerToUpdate = this.getFarmerById(id);
        farmerToUpdate.password = newValue;
        //remove old farmer and push new
        this.farmers = this.farmers.filter((farmer) => farmer.id !== id);
        this.farmers.push(farmerToUpdate);
        break;
      case "email":
        //update mapping
        this.farmerIdToFarmer[id].email = newValue;
        //update farmers array
        farmerToUpdate = this.getFarmerById(id);
        farmerToUpdate.email = newValue;
        //remove old farmer and push new
        this.farmers = this.farmers.filter((farmer) => farmer.id !== id);
        this.farmers.push(farmerToUpdate);
        break;
      case "phone":
        //update mapping
        this.farmerIdToFarmer[id].phone = newValue;
        //update farmers array
        farmerToUpdate = this.getFarmerById(id);
        farmerToUpdate.phone = newValue;
        //remove old farmer and push new
        this.farmers = this.farmers.filter((farmer) => farmer.id !== id);
        this.farmers.push(farmerToUpdate);
        break;
      case "location":
        //update mapping
        this.farmerIdToFarmer[id].location = newValue;
        //update farmers array
        farmerToUpdate = this.getFarmerById(id);
        farmerToUpdate.location = newValue;
        //remove old farmer and push new
        this.farmers = this.farmers.filter((farmer) => farmer.id !== id);
        this.farmers.push(farmerToUpdate);
        break;
      case "subscription":
        //update mapping
        this.farmerIdToFarmer[id].subscription = newValue;
        //update farmers array
        farmerToUpdate = this.getFarmerById(id);
        farmerToUpdate.subscription = newValue;
        //remove old farmer and push new
        this.farmers = this.farmers.filter((farmer) => farmer.id !== id);
        this.farmers.push(farmerToUpdate);
        break;
    }
    return farmerToUpdate;
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
  @query([IDL.Nat], GreenHouse.idlFactory)
  getGreenHouseById(id: number): GreenHouse {
    if (this.farmerIdToGreenHouse[id]) {
      return this.farmerIdToGreenHouse[id];
    } else {
      throw new Error("Greenhouse not found");
    }
  }
  // ** update greenhouse ** //
  @update([IDL.Nat, IDL.Text, IDL.Text], GreenHouse.idlFactory)
  updateGreenHouseDetails(
    farmerId: string,
    greenHouseId: number,
    newValue: string,
    fieldToUpdate: string
  ): GreenHouse {
    if (
      fieldToUpdate !== "name" &&
      fieldToUpdate !== "location" &&
      fieldToUpdate !== "moistureLevel"
    ) {
      throw new Error("Invalid field to update");
    }
    let greenhouseToUpdate;
    switch (fieldToUpdate) {
      case "name":
        //update mapping
        this.farmerIdToGreenHouse[farmerId].name = newValue;
        //update greenhouses array
        greenhouseToUpdate = this.getGreenHouseById(greenHouseId);
        greenhouseToUpdate.name = newValue;
        //remove old greenhouse and push new
        this.greenHouses = this.greenHouses.filter(
          (greenhouse) => greenhouse.id !== greenHouseId
        );
        this.greenHouses.push(greenhouseToUpdate);
        break;
      case "location":
        //update mapping
        this.farmerIdToGreenHouse[farmerId].location = newValue;
        //update greenhouses array
        greenhouseToUpdate = this.getGreenHouseById(greenHouseId);
        greenhouseToUpdate.location = newValue;
        //remove old greenhouse and push new
        this.greenHouses = this.greenHouses.filter(
          (greenhouse) => greenhouse.id !== greenHouseId
        );
        this.greenHouses.push(greenhouseToUpdate);
        break;
      case "moistureLevel":
        //update mapping
        this.farmerIdToGreenHouse[farmerId].moistureLevel =
          parseFloat(newValue);
        //update greenhouses array
        greenhouseToUpdate = this.getGreenHouseById(greenHouseId);
        greenhouseToUpdate.moistureLevel = parseFloat(newValue);
        //remove old greenhouse and push new
        this.greenHouses = this.greenHouses.filter(
          (greenhouse) => greenhouse.id !== greenHouseId
        );
        this.greenHouses.push(greenhouseToUpdate);
        break;
    }
    return greenhouseToUpdate;
  }
  // ** add sensor to greenhouse ** //
  @update([IDL.Nat, IDL.Nat, IDL.Text, IDL.Text, IDL.Text], Sensor.idlFactory)
  addSensor(
    greenHouseId: number,
    sensorId: number,
    sensorName: string,
    typeOfSensor: string,
    conditionOfSensor: string
  ): Sensor {
    if (!this.getGreenHouseById(greenHouseId)) {
      throw new Error("Greenhouse not found");
    }
    if (
      this.greenHouseIdToSensors[greenHouseId].find(
        (sensor) => sensor.name === sensorName
      )
    ) {
      throw new Error("Sensor already exists");
    }
    let createdSensor;
    createdSensor = new Sensor(
      sensorId,
      sensorName,
      typeOfSensor,
      greenHouseId.toString(),
      conditionOfSensor
    );
    this.greenHouseIdToSensors[greenHouseId].push(createdSensor);
    this.sensors.push(createdSensor);
    return createdSensor;
  }

  // ** SENSOR FUNCTIONS ** //
  // ** create sensor ** //
  @update([IDL.Text, IDL.Nat, IDL.Text, IDL.Text, IDL.Text, IDL.Text])
  createSensor(
    farmerID: string,
    id: number,
    name: string,
    typeOfSensor: string,
    greenhouseId: string,
    condition: string
  ): void {
    if (this.getFarmerById(farmerID)) {
      //check if the farmer has created this sensor before form the farmerIdToSensors mapping
      if (this.farmerIdToSensors[farmerID]) {
        if (
          this.farmerIdToSensors[farmerID].find(
            (sensor) => sensor.name === name
          )
        ) {
          throw new Error("Sensor already exists");
        } else {
          this.farmerIdToSensors[farmerID].push(
            new Sensor(id, name, typeOfSensor, greenhouseId, condition)
          );
          this.sensors.push(
            new Sensor(id, name, typeOfSensor, greenhouseId, condition)
          );
        }
      }
    }
  }
  // ** update sensor condition ** //
  @update([IDL.Text, IDL.Nat, IDL.Text], Sensor.idlFactory)
  updateSensorCondition(
    farmerId: string,
    sensorId: number,
    condition: string
  ): Sensor {
    if (condition !== "good" && condition !== "bad") {
      throw new Error("Invalid condition");
    }
    let sensorToUpdate;
    //update mapping
    this.farmerIdToSensors[farmerId].find((sensor) => {
      if (sensor.id === sensorId) {
        sensor.condition = condition;
        sensorToUpdate = sensor;
      }
    });
    //update sensors array
    if (sensorToUpdate) {
      this.sensors = this.sensors.filter((sensor) => sensor.id !== sensorId);
      this.sensors.push(sensorToUpdate);
    } else {
      throw new Error("Sensor not found");
    }
    return sensorToUpdate;
  }
}
