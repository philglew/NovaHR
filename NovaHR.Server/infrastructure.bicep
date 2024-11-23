resource rg 'Microsoft.Resources/resourceGroups@2021-04-01' = {
  name: 'rg-novahr'
  location: 'UK South'
}

resource appServicePlan 'Microsoft.Web/serverfarms@2021-02-01' = {
  name: 'novahr-appserviceplan'
  location: rg.location
  sku: {
    name: 'B1'
    tier: 'Basic'
  }
}

resource appService 'Microsoft.Web/sites@2021-02-01' = {
  name: 'novahr-webapp'
  location: rg.location
  serverFarmId: appServicePlan.id
  identity: {
    type: 'SystemAssigned'
  }
}
