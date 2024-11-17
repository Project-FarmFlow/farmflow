export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'createFarmer' : IDL.Func(
        [
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Nat,
              'moistureLevel' : IDL.Float64,
              'farmerId' : IDL.Text,
              'name' : IDL.Text,
              'sensors' : IDL.Vec(
                IDL.Record({
                  'id' : IDL.Nat,
                  'name' : IDL.Text,
                  'greenhouseId' : IDL.Text,
                  'typeOfSensor' : IDL.Text,
                  'condition' : IDL.Text,
                })
              ),
              'location' : IDL.Text,
            })
          ),
        ],
        [],
        [],
      ),
    'createGreenHouse' : IDL.Func(
        [
          IDL.Nat,
          IDL.Text,
          IDL.Text,
          IDL.Text,
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Nat,
              'name' : IDL.Text,
              'greenhouseId' : IDL.Text,
              'typeOfSensor' : IDL.Text,
              'condition' : IDL.Text,
            })
          ),
          IDL.Float64,
        ],
        [],
        [],
      ),
    'createSensor' : IDL.Func(
        [IDL.Nat, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [],
        [],
      ),
    'getAllFarmers' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Text,
              'username' : IDL.Text,
              'subscription' : IDL.Text,
              'password' : IDL.Text,
              'email' : IDL.Text,
              'phone' : IDL.Text,
              'location' : IDL.Text,
              'greenhouses' : IDL.Vec(
                IDL.Record({
                  'id' : IDL.Nat,
                  'moistureLevel' : IDL.Float64,
                  'farmerId' : IDL.Text,
                  'name' : IDL.Text,
                  'sensors' : IDL.Vec(
                    IDL.Record({
                      'id' : IDL.Nat,
                      'name' : IDL.Text,
                      'greenhouseId' : IDL.Text,
                      'typeOfSensor' : IDL.Text,
                      'condition' : IDL.Text,
                    })
                  ),
                  'location' : IDL.Text,
                })
              ),
            })
          ),
        ],
        ['query'],
      ),
    'getAllGreenHouses' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Record({
              'id' : IDL.Nat,
              'moistureLevel' : IDL.Float64,
              'farmerId' : IDL.Text,
              'name' : IDL.Text,
              'sensors' : IDL.Vec(
                IDL.Record({
                  'id' : IDL.Nat,
                  'name' : IDL.Text,
                  'greenhouseId' : IDL.Text,
                  'typeOfSensor' : IDL.Text,
                  'condition' : IDL.Text,
                })
              ),
              'location' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
    'getFarmerByName' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'getGreenHouseByName' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
