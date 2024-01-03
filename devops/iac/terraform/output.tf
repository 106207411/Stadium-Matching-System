// ========================== Azure Resource Group ==========================
output "resource_group_name" {
  value = azurerm_resource_group.rg.name
}

// ========================== Azure Container Registry (ACR) ==========================

output "acr_name" {
  description = "Specifies the name of the container registry."
  value       = azurerm_container_registry.acr.name
}

output "acr_id" {
  description = "Specifies the resource id of the container registry."
  value       = azurerm_container_registry.acr.id
}

output "acr_resource_group_name" {
  description = "Specifies the name of the resource group."
  value       = azurerm_container_registry.acr.resource_group_name
}

output "acr_login_server" {
  description = "Specifies the login server of the container registry."
  value       = azurerm_container_registry.acr.login_server
}

output "acr_login_server_url" {
  description = "Specifies the login server url of the container registry."
  value       = "https://${azurerm_container_registry.acr.login_server}"
}

output "acr_admin_username" {
  description = "Specifies the admin username of the container registry."
  value       = azurerm_container_registry.acr.admin_username
}

// ========================== Azure Kubernetes services (AKS) ==========================
output "aks_name" {
  value       = azurerm_kubernetes_cluster.aks.name
  description = "Specifies the name of the AKS cluster."
}

output "aks_id" {
  value       = azurerm_kubernetes_cluster.aks.id
  description = "Specifies the resource id of the AKS cluster."
}

output "kubelet_identity_object_id" {
  value       = azurerm_kubernetes_cluster.aks.kubelet_identity.0.object_id
  description = "Specifies the object id of the kubelet identity of the AKS cluster."
}

output "kube_config_raw" {
  value       = azurerm_kubernetes_cluster.aks.kube_config_raw
  sensitive   = true
  description = "Contains the Kubernetes config to be used by kubectl and other compatible tools."
}

output "aks_private_fqdn" {
  value       = azurerm_kubernetes_cluster.aks.private_fqdn
  description = "The FQDN for the Kubernetes Cluster when private link has been enabled, which is only resolvable inside the Virtual Network used by the Kubernetes Cluster."
}

output "aks_node_resource_group" {
  value       = azurerm_kubernetes_cluster.aks.node_resource_group
  description = "Specifies the resource id of the auto-generated Resource Group which contains the resources for this Managed Kubernetes Cluster."
}