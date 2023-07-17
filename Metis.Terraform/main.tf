provider "azurerm" {
  features {}
}

resource "azurerm_resource_group" "resource_group" {
  name     = "rg-${var.application_name}-${var.environment_code}-${var.location_code}-01"
  location = var.resource_group_location
}

resource "azurerm_cosmosdb_account" "cosmosdb_account" {
  name                = "cosmos-db-${var.application_name}-${var.environment_code}-${var.location_code}-01"
  resource_group_name = azurerm_resource_group.resource_group.name
  location            = azurerm_resource_group.resource_group.location
  offer_type          = "Standard"
  kind                = "MongoDB"
  capabilities {
    name = "mongoEnableDocLevelTTL"
  }
  capabilities {
    name = "MongoDBv3.4"
  }
  capabilities {
    name = "EnableMongo"
  }
  consistency_policy {
    consistency_level = "Strong"
  }
  geo_location {
    location          = "westus"
    failover_priority = 0
  }
}

resource "azurerm_cosmosdb_mongo_database" "cosmosdb_mongo_database" {
  name                = "metis"
  resource_group_name = azurerm_cosmosdb_account.cosmosdb_account.resource_group_name
  account_name        = azurerm_cosmosdb_account.cosmosdb_account.name
}

resource "azurerm_cosmosdb_mongo_collection" "cosmosdb_mongo_collection" {
  for_each            = var.cosmosdb_mongo_collections
  name                = each.key
  resource_group_name = azurerm_cosmosdb_account.cosmosdb_account.resource_group_name
  account_name        = azurerm_cosmosdb_account.cosmosdb_account.name
  database_name       = azurerm_cosmosdb_mongo_database.cosmosdb_mongo_database.name

  default_ttl_seconds = each.value.default_ttl_seconds
  shard_key           = each.value.shard_key
  throughput          = each.value.throughput

  dynamic "index" {
    for_each = each.value.index
    content {
      keys   = [index.value.name]
      unique = index.value.unique
    }
  }
}

# There are some issues managing the users by using the storage account resource
# resource "azurerm_storage_account" "storage_account" {
#   name                     = "sa${var.application_name}${var.environment_code}${var.location_code}01"
#   resource_group_name      = azurerm_resource_group.resource_group.name
#   location                 = azurerm_resource_group.resource_group.location
#   account_tier             = var.storage_account_tier
#   account_replication_type = var.storage_account_replication_type
# }

# resource "azurerm_storage_table" "storage_table" {
#   for_each              = toset(var.storage_account_table_names)
#   name                  = "${each.key}"
#   storage_account_name  = azurerm_storage_account.storage_account.name
# }
