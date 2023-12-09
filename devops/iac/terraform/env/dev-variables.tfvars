# resource group name
rg_name                             = "stadium-app"
location                            = "East US"
# container registry
acr_name                            = "stadiumacr"
acr_admin_enabled                   = true
# storage account
sa_name                             = "stadium"
sa_postfix                          = "afab3efe"  # use your subscription id
# Azure Kubernetes Service (AKS) 
cluster_name                        = "stadium"
dns_prefix                          = "stadium-dns"
default_node_pool_node_count        = 2