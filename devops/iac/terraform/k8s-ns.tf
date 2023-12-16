# Create a separate namespace for nginx-ingress
resource "kubernetes_namespace" "ingress" {  
  metadata {
    name = "ingress-nginx"
  }
}

resource "kubernetes_namespace" "argocd" {
  metadata {
    name = "argocd"
  }
}

resource "kubernetes_namespace" "stadiumapp" {
  metadata {
    name = "stadiumapp"
  }
}

# # resource "kubernetes_namespace" "monitor" {
# #   metadata {
# #     name = "monitoring"
# #   }
# # }

resource "kubernetes_namespace" "cert_manager" {
  metadata {
    labels = {
      "name" = "cert-manager"
    }
    name = "cert-manager"
  }
}

# Install ingress helm chart using terraform
resource "helm_release" "ingress" {
  name       = "ingress"
  repository = "https://kubernetes.github.io/ingress-nginx"
  chart      = "ingress-nginx"
  version    = "4.8.4"
  namespace  = kubernetes_namespace.ingress.metadata.0.name
  set {
    name  = "controller.service.externalTrafficPolicy"
    value = "Local"
  }
  depends_on = [
    kubernetes_namespace.ingress
  ]
}

# Install argocd helm chart using terraform
resource "helm_release" "argocd" {
  name       = "argocd"
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-cd"
  version    = "5.51.5"
  namespace  = kubernetes_namespace.argocd.metadata.0.name
  depends_on = [
    kubernetes_namespace.argocd
  ]
}

# # Install prometheus helm chart using terraform
# resource "helm_release" "prometheus" {
#   name       = "prometheus"
#   repository = "https://prometheus-community.github.io/helm-charts"
#   chart      = "kube-prometheus-stack"
#   version    = "54.0.0"
#   namespace  = kubernetes_namespace.monitor.metadata.0.name
#   depends_on = [
#     kubernetes_namespace.monitor
#   ]
# }

# Install cert-manager helm chart using terraform
resource "helm_release" "cert_manager" {
  name       = "cert-manager"
  repository = "https://charts.jetstack.io"
  chart      = "cert-manager"
  version    = "v1.13.3"
  namespace  = kubernetes_namespace.cert_manager.metadata.0.name

  set {
    name  = "installCRDs"
    value = "true"
  }
  depends_on = [
    kubernetes_namespace.cert_manager    
  ]
}