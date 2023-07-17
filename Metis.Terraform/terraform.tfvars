# Naming Convention
application_name                 = "metis"
location_code                    = "euw"
environment_code                 = "dev"

# Azure 
resource_group_location          = "West Europe"
storage_account_tier             = "Standard"
storage_account_replication_type = "LRS"

storage_account_table_names = [
  "Users",
  "Lessons",
  "Words"
]
cosmosdb_mongo_collections = {
  "Users" = {
    name                 = "Users"
    default_ttl_seconds  = "777"
    shard_key            = null
    throughput           = 400
    index = [
      {
        name  = "_id"
        unique = true
      }
    ]
  },
  "Roles" = {
    name                 = "Roles"
    default_ttl_seconds  = "777"
    shard_key            = null
    throughput           = 400
    index = [
      {
        name  = "_id"
        unique = true
      }
    ]
  }
}