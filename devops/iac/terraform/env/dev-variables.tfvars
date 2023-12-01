# resource group name
rg_name                             = "stadium-app2"
location                            = "East US"
# container registry
acr_name                            = "acrstadium"
acr_admin_enabled                   = true
# Azure Kubernetes Service (AKS) 
cluster_name                        = "stadium"
dns_prefix                          = "stadium-dns"
default_node_pool_node_count        = 2