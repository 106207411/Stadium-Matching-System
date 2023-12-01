terraform {
  required_providers {
    azapi = {
      source  = "azure/azapi"
      version = "~>1.5"
    }
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.0"
    }
    random = {
      source  = "hashicorp/random"
      version = "~>3.0"
    }
    time = {
      source  = "hashicorp/time"
      version = "0.9.1"
    }
  }
  backend "azurerm" {
    resource_group_name  = "rg-tfmgmt-dev"
    storage_account_name = "tfmgmtstatesdev"
    container_name       = "terraformstates"
    key                  = "stadiumapp-state-"
  }
}

# Configure the Microsoft Azure Provider
provider "azurerm" {
  features {}
}