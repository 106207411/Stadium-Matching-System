# Create the resource group
resource "azurerm_resource_group" "rg" {
  name     = lower("${var.rg_prefix}-${var.rg_name}-${local.environment}")
  location = var.location
  tags = merge(local.default_tags,
    {
      "CreatedBy" = "Andy.Lee"
  })
  lifecycle {
    ignore_changes = [
      tags
    ]
  }
}

# Create the Container Registry
resource "azurerm_container_registry" "acr" {
  name                = var.acr_name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = var.acr_sku
  admin_enabled       = var.acr_admin_enabled
  # identity {
  #   type = "UserAssigned"
  #   identity_ids = [
  #     azurerm_user_assigned_identity.acr_identity.id
  #   ]
  # }
  tags = merge(local.default_tags, var.acr_tags)
  lifecycle {
    ignore_changes = [
      tags
    ]
  }
  depends_on = [
    azurerm_resource_group.rg
  ]
}

# Create a new Azure Kubernetes Service (Cluster)
resource "azurerm_kubernetes_cluster" "aks" {
  name                = lower("${var.aks_prefix}-${var.cluster_name}-${local.environment}")
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  dns_prefix          = var.dns_prefix
  sku_tier            = var.aks_sku_tier

  default_node_pool {
    name                = var.default_node_pool_name
    node_count          = var.default_node_pool_node_count
    vm_size             = var.default_node_pool_vm_size
    enable_auto_scaling = var.default_node_pool_enable_auto_scaling
    max_count           = var.default_node_pool_max_count
    max_pods            = var.default_node_pool_max_pods
    min_count           = var.default_node_pool_min_count
  }

  identity {
    type = "SystemAssigned"
  }

  linux_profile {
    admin_username = var.username

    ssh_key {
      key_data = jsondecode(azapi_resource_action.ssh_public_key_gen.output).publicKey
    }
  }

  tags = merge(local.default_tags, var.aks_tags)
  lifecycle {
    ignore_changes = [
      tags,
      linux_profile,
    ]
  }

  # https://docs.microsoft.com/en-us/azure/aks/use-network-policies
  network_profile {
    load_balancer_sku = "standard"
    network_plugin    = var.network_plugin
  }
}

# Allow AKS Cluster access to Azure Container Registry
resource "azurerm_role_assignment" "role_acrpull" {
  principal_id                     = azurerm_kubernetes_cluster.aks.kubelet_identity[0].object_id
  role_definition_name             = "AcrPull"
  scope                            = azurerm_container_registry.acr.id
  skip_service_principal_aad_check = true
  depends_on = [
    azurerm_container_registry.acr,
    azurerm_kubernetes_cluster.aks
  ]
}


# resource "azurerm_kubernetes_cluster_node_pool" "aks-np" {
#   enable_auto_scaling   = true
#   kubernetes_cluster_id = "/subscriptions/ec456d6c-019c-47f1-8d27-c922648c41d4/resourceGroups/stadium-app/providers/Microsoft.ContainerService/managedClusters/k8s-dev"
#   max_count             = 5
#   min_count             = 2
#   mode                  = "System"
#   name                  = "agentpool"
#   vm_size               = "Standard_DS2_v2"
#   depends_on = [
#     azurerm_kubernetes_cluster.aks,
#   ]
# }
# resource "azurerm_monitor_action_group" "acr-ag" {
#   name                = "RecommendedAlertRules-AG-1"
#   resource_group_name = azurerm_resource_group.rg-1.name
#   short_name          = "recalert1"
#   email_receiver {
#     email_address           = "cdxvy30@gmail.com"
#     name                    = "Email_-EmailAction-"
#     use_common_alert_schema = true
#   }
# }
# resource "azurerm_monitor_metric_alert" "acr1" {
#   auto_mitigate       = false
#   frequency           = "PT5M"
#   name                = "CPU Usage Percentage - k8s-dev"
#   resource_group_name = azurerm_resource_group.rg-1.name
#   scopes              = ["/subscriptions/ec456d6c-019c-47f1-8d27-c922648c41d4/resourcegroups/stadium-app/providers/Microsoft.ContainerService/managedClusters/k8s-dev"]
#   action {
#     action_group_id = "/subscriptions/ec456d6c-019c-47f1-8d27-c922648c41d4/resourceGroups/stadium-app/providers/Microsoft.Insights/ActionGroups/RecommendedAlertRules-AG-1"
#   }
#   criteria {
#     aggregation      = "Average"
#     metric_name      = "node_cpu_usage_percentage"
#     metric_namespace = "Microsoft.ContainerService/managedClusters"
#     operator         = "GreaterThan"
#     threshold        = 95
#   }
# }
# resource "azurerm_monitor_metric_alert" "acr2" {
#   auto_mitigate       = false
#   frequency           = "PT5M"
#   name                = "Memory Working Set Percentage - k8s-dev"
#   resource_group_name = azurerm_resource_group.rg-1.name
#   scopes              = ["/subscriptions/ec456d6c-019c-47f1-8d27-c922648c41d4/resourcegroups/stadium-app/providers/Microsoft.ContainerService/managedClusters/k8s-dev"]
#   action {
#     action_group_id = "/subscriptions/ec456d6c-019c-47f1-8d27-c922648c41d4/resourceGroups/stadium-app/providers/Microsoft.Insights/ActionGroups/RecommendedAlertRules-AG-1"
#   }
#   criteria {
#     aggregation      = "Average"
#     metric_name      = "node_memory_working_set_percentage"
#     metric_namespace = "Microsoft.ContainerService/managedClusters"
#     operator         = "GreaterThan"
#     threshold        = 100
#   }
# }
