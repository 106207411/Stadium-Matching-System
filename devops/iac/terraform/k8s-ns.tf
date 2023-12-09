# Create a separate namespace for nginx-ingress
resource "kubernetes_namespace" "ingress" {  
  metadata {
    name = "ingress"
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

resource "kubernetes_namespace" "monitor" {
  metadata {
    name = "monitor"
  }
}

# Install ingress helm chart using terraform
resource "helm_release" "ingress" {
  name       = "ingress"
  repository = "https://kubernetes.github.io/ingress-nginx"
  chart      = "ingress-nginx"
  version    = "4.5.2"
  namespace  = kubernetes_namespace.ingress.metadata.0.name
  depends_on = [
    kubernetes_namespace.ingress
  ]
}

# Install argocd helm chart using terraform
resource "helm_release" "argocd" {
  name       = "argocd"
  repository = "https://argoproj.github.io/argo-helm"
  chart      = "argo-cd"
  version    = "5.24.1"
  namespace  = kubernetes_namespace.argocd.metadata.0.name
  depends_on = [
    kubernetes_namespace.argocd
  ]
}

# Install prometheus helm chart using terraform
resource "helm_release" "prometheus" {
  name       = "prometheus"
  repository = "https://prometheus-community.github.io/helm-charts"
  chart      = "kube-prometheus-stack"
  version    = "36.2.0"
  namespace  = kubernetes_namespace.monitor.metadata.0.name
  depends_on = [
    kubernetes_namespace.monitor
  ]
}
#TODO: Add grafana helm chart