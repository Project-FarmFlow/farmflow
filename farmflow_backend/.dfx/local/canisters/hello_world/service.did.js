export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'checkIfFarmerIsRegistered' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'checkIfSensorTypeExists' : IDL.Func(
        [IDL.Text, IDL.Nat],
        [IDL.Bool],
        ['query'],
      ),
    'checkSoilMoistureLevel' : IDL.Func([IDL.Nat, IDL.Text], [IDL.Text], []),
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
                  'data' : IDL.Vec(
                    IDL.Record({ 'data' : IDL.Nat, 'timestamp' : IDL.Text })
                  ),
                  'name' : IDL.Text,
                  'greenhouseId' : IDL.Text,
                  'typeOfSensor' : IDL.Text,
                  'condition' : IDL.Text,
                })
              ),
              'isPumpOn' : IDL.Bool,
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
              'data' : IDL.Vec(
                IDL.Record({ 'data' : IDL.Nat, 'timestamp' : IDL.Text })
              ),
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
        [IDL.Text, IDL.Nat, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
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
              'notifications' : IDL.Vec(
                IDL.Record({
                  'id' : IDL.Nat,
                  'title' : IDL.Text,
                  'message' : IDL.Text,
                  'timestamp' : IDL.Text,
                })
              ),
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
                      'data' : IDL.Vec(
                        IDL.Record({ 'data' : IDL.Nat, 'timestamp' : IDL.Text })
                      ),
                      'name' : IDL.Text,
                      'greenhouseId' : IDL.Text,
                      'typeOfSensor' : IDL.Text,
                      'condition' : IDL.Text,
                    })
                  ),
                  'isPumpOn' : IDL.Bool,
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
                  'data' : IDL.Vec(
                    IDL.Record({ 'data' : IDL.Nat, 'timestamp' : IDL.Text })
                  ),
                  'name' : IDL.Text,
                  'greenhouseId' : IDL.Text,
                  'typeOfSensor' : IDL.Text,
                  'condition' : IDL.Text,
                })
              ),
              'isPumpOn' : IDL.Bool,
              'location' : IDL.Text,
            })
          ),
        ],
        ['query'],
      ),
    'getFarmerById' : IDL.Func(
        [IDL.Text],
        [
          IDL.Record({
            'id' : IDL.Text,
            'username' : IDL.Text,
            'notifications' : IDL.Vec(
              IDL.Record({
                'id' : IDL.Nat,
                'title' : IDL.Text,
                'message' : IDL.Text,
                'timestamp' : IDL.Text,
              })
            ),
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
                    'data' : IDL.Vec(
                      IDL.Record({ 'data' : IDL.Nat, 'timestamp' : IDL.Text })
                    ),
                    'name' : IDL.Text,
                    'greenhouseId' : IDL.Text,
                    'typeOfSensor' : IDL.Text,
                    'condition' : IDL.Text,
                  })
                ),
                'isPumpOn' : IDL.Bool,
                'location' : IDL.Text,
              })
            ),
          }),
        ],
        ['query'],
      ),
    'getFarmerByName' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'getGreenHouseById' : IDL.Func(
        [IDL.Nat],
        [
          IDL.Record({
            'id' : IDL.Nat,
            'moistureLevel' : IDL.Float64,
            'farmerId' : IDL.Text,
            'name' : IDL.Text,
            'sensors' : IDL.Vec(
              IDL.Record({
                'id' : IDL.Nat,
                'data' : IDL.Vec(
                  IDL.Record({ 'data' : IDL.Nat, 'timestamp' : IDL.Text })
                ),
                'name' : IDL.Text,
                'greenhouseId' : IDL.Text,
                'typeOfSensor' : IDL.Text,
                'condition' : IDL.Text,
              })
            ),
            'isPumpOn' : IDL.Bool,
            'location' : IDL.Text,
          }),
        ],
        ['query'],
      ),
    'getGreenHouseByName' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'getHistoricalData' : IDL.Func(
        [IDL.Text, IDL.Nat],
        [IDL.Vec(IDL.Record({ 'data' : IDL.Nat, 'timestamp' : IDL.Text }))],
        ['query'],
      ),
    'getIsPumpOn' : IDL.Func([IDL.Nat], [IDL.Bool], ['query']),
    'getSensorReadings' : IDL.Func(
        [IDL.Text, IDL.Nat],
        [IDL.Record({ 'data' : IDL.Nat, 'timestamp' : IDL.Text })],
        ['query'],
      ),
    'pushNotification' : IDL.Func(
        [
          IDL.Text,
          IDL.Record({
            'id' : IDL.Nat,
            'title' : IDL.Text,
            'message' : IDL.Text,
            'timestamp' : IDL.Text,
          }),
        ],
        [IDL.Text],
        [],
      ),
    'updateFarmerDetails' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Text],
        [
          IDL.Record({
            'id' : IDL.Text,
            'username' : IDL.Text,
            'notifications' : IDL.Vec(
              IDL.Record({
                'id' : IDL.Nat,
                'title' : IDL.Text,
                'message' : IDL.Text,
                'timestamp' : IDL.Text,
              })
            ),
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
                    'data' : IDL.Vec(
                      IDL.Record({ 'data' : IDL.Nat, 'timestamp' : IDL.Text })
                    ),
                    'name' : IDL.Text,
                    'greenhouseId' : IDL.Text,
                    'typeOfSensor' : IDL.Text,
                    'condition' : IDL.Text,
                  })
                ),
                'isPumpOn' : IDL.Bool,
                'location' : IDL.Text,
              })
            ),
          }),
        ],
        [],
      ),
    'updateGreenHouseDetails' : IDL.Func(
        [IDL.Nat, IDL.Text, IDL.Text],
        [
          IDL.Record({
            'id' : IDL.Nat,
            'moistureLevel' : IDL.Float64,
            'farmerId' : IDL.Text,
            'name' : IDL.Text,
            'sensors' : IDL.Vec(
              IDL.Record({
                'id' : IDL.Nat,
                'data' : IDL.Vec(
                  IDL.Record({ 'data' : IDL.Nat, 'timestamp' : IDL.Text })
                ),
                'name' : IDL.Text,
                'greenhouseId' : IDL.Text,
                'typeOfSensor' : IDL.Text,
                'condition' : IDL.Text,
              })
            ),
            'isPumpOn' : IDL.Bool,
            'location' : IDL.Text,
          }),
        ],
        [],
      ),
    'updatePumpStatus' : IDL.Func(
        [IDL.Nat, IDL.Bool],
        [
          IDL.Record({
            'id' : IDL.Nat,
            'moistureLevel' : IDL.Float64,
            'farmerId' : IDL.Text,
            'name' : IDL.Text,
            'sensors' : IDL.Vec(
              IDL.Record({
                'id' : IDL.Nat,
                'data' : IDL.Vec(
                  IDL.Record({ 'data' : IDL.Nat, 'timestamp' : IDL.Text })
                ),
                'name' : IDL.Text,
                'greenhouseId' : IDL.Text,
                'typeOfSensor' : IDL.Text,
                'condition' : IDL.Text,
              })
            ),
            'isPumpOn' : IDL.Bool,
            'location' : IDL.Text,
          }),
        ],
        [],
      ),
    'updateSensorCondition' : IDL.Func(
        [IDL.Text, IDL.Nat, IDL.Text],
        [
          IDL.Record({
            'id' : IDL.Nat,
            'data' : IDL.Vec(
              IDL.Record({ 'data' : IDL.Nat, 'timestamp' : IDL.Text })
            ),
            'name' : IDL.Text,
            'greenhouseId' : IDL.Text,
            'typeOfSensor' : IDL.Text,
            'condition' : IDL.Text,
          }),
        ],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
