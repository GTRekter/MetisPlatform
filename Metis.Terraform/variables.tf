variable "application_name" {
  description = "The name of the application"
  type        = string
  default     = "metis"
}

variable "location_code" {
  description = "The location code of the deployment"
  type        = string
  default     = "euw"
}

variable "environment_code" {
  description = "The environment code (e.g., dev, test, prod)"
  type        = string
  default     = "dev"
}

variable "resource_group_location" {
  description = "The location of the resource group"
  type        = string
  default     = "West Europe"
}

variable "storage_account_tier" {
  description = "The performance tier of the storage account"
  type        = string
  default     = "Standard"
}

variable "storage_account_replication_type" {
  description = "The replication type of the storage account"
  type        = string
  default     = "LRS"
}

variable "storage_account_table_names" {
  description = "The names of the storage tables"
  type        = list(string)
  default     = []
}

variable "cosmosdb_mongo_collections" {
  description = "Configuration for Cosmos DB MongoDB collections"
  type        = map(object({
    name                 = string
    default_ttl_seconds  = string
    shard_key            = string
    throughput           = number
    index                = list(object({
      name  = string
      unique = bool
    }))
  }))
  default     = {}
}