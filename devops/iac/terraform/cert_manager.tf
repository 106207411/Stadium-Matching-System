locals {
  clusterissuer = "cert-manager-clusterissuer/clusterissuer.yaml"
}

# Create clusterissuer for nginx YAML file
data "kubectl_file_documents" "clusterissuer" {
  content = file(local.clusterissuer)
}

# Apply clusterissuer for nginx YAML file
resource "kubectl_manifest" "clusterissuer" {
  for_each  = data.kubectl_file_documents.clusterissuer.manifests
  yaml_body = each.value
  depends_on = [
    data.kubectl_file_documents.clusterissuer
  ]
}