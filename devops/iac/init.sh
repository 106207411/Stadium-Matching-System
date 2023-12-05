# #!/bin/bash
# # az login --use-device-code

# location=eastus
# resourceGroupName=rg-tfmgmt-dev
# storageAccountSku=Standard_LRS
# storageAccountName=tfmgmtstatesdev
# containerName=terraformstates
# subscriptionName=$(az account show --query name --output tsv)
# clusterName=aks-stadium-dev
# aksResourceGroup=rg-stadium-app2-dev

# # Create resource group
# echo "Creating resource group for Terraform remote state..."
# az group show --name $resourceGroupName &>/dev/null

# if [[ $? != 0 ]]; then
#     echo "No [$resourceGroupName] resource group actually exists in the [$subscriptionName] subscription"
#     echo "Creating [$resourceGroupName] resource group in the [$subscriptionName] subscription..."

#     # Create the resource group
#     az group create \
#         --name $resourceGroupName \
#         --location $location 1>/dev/null

#     if [[ $? == 0 ]]; then
#         echo "[$resourceGroupName] resource group successfully created in the [$subscriptionName] subscription"
#     else
#         echo "Failed to create [$resourceGroupName] resource group in the [$subscriptionName] subscription"
#         exit
#     fi
# else
#     echo "[$resourceGroupName] resource group already exists in the [$subscriptionName] subscription"
# fi

# # Create storage account for Terraform remote state
# az storage account show --name $storageAccountName &>/dev/null

# if [[ $? != 0 ]]; then
#     echo "No [$storageAccountName] storage account actually exists in the [$subscriptionName] subscription"
#     echo "Creating [$storageAccountName] storage account in the [$subscriptionName] subscription..."

#     az storage account create \
#         --resource-group $resourceGroupName \
#         --name $storageAccountName \
#         --sku $storageAccountSku \
#         --encryption-services blob 1>/dev/null

#     # Create the storage account
#     if  [[ $? == 0 ]]; then
#         echo "[$storageAccountName] storage account successfully created in the [$subscriptionName] subscription"
#     else
#         echo "Failed to create [$storageAccountName] storage account in the [$subscriptionName] subscription"
#         exit
#     fi
# else
#     echo "[$storageAccountName] storage account already exists in the [$subscriptionName] subscription"
# fi

# # Get storage account key
# storageAccountKey=$(az storage account keys list --resource-group $resourceGroupName --account-name $storageAccountName --query [0].value -o tsv)

# if [[ -n $storageAccountKey ]]; then
#     echo "Primary key of the [$storageAccountName] storage account successfully retrieved"
# else
#     echo "Failed to retrieve the primary key of the [$storageAccountName] storage account"
#     exit
# fi

# # Create blob container
# az storage container show \
#     --name $containerName \
#     --account-name $storageAccountName \
#     --account-key $storageAccountKey &>/dev/null

# if [[ $? != 0 ]]; then
#     echo "No [$containerName] container actually exists in the [$storageAccountName] storage account"
#     echo "Creating [$containerName] container in the [$storageAccountName] storage account..."

#     # Create the container
#     az storage container create \
#         --name $containerName \
#         --account-name $storageAccountName \
#         --account-key $storageAccountKey 1>/dev/null

#     if  [[ $? == 0 ]]; then
#         echo "[$containerName] container successfully created in the [$storageAccountName] storage account"
#     else
#         echo "Failed to create [$containerName] container in the [$storageAccountName] storage account"
#         exit
#     fi
# else
#     echo "[$containerName] container already exists in the [$storageAccountName] storage account"
# fi

# # Print data
# echo "storageAccountName: $storageAccountName"
# echo "containerName: $containerName"

# Initialize Terraform
echo "----------------------------------------------------------------------------------------------"
echo "Building Azure infrastructure with Terraform..."
cd ./terraform
terraform init -upgrade
terraform workspace new dev
terraform workspace select dev
terraform plan -out=dev-plan -var-file="./env/dev-variables.tfvars"
terraform apply dev-plan

# connect to AKS
echo "----------------------------------------------------------------------------------------------"
echo "Connecting to AKS..."
az aks get-credentials --name $clusterName --resource-group $aksResourceGroup

# From here, add the following resources to Kubernetes:
# or update the dev-variables.tfvars file and run terraform apply again
# - helm provider
# - Kubernetes provider
# - Kubectl provider
# - Ingress controller
# - ArgoCD


# # deploy app
# echo "----------------------------------------------------------------------------------------------"
# echo "Deploying app..."
# kubectl apply -f ./k8s/stadium-app.yaml -n stadiumapp


# Helm
# helm create stadium-chart
# helm lint stadium-chart
# helm template "stadium-chart" "./stadium-chart/" --namespace "stadiumapp" > stadiumapp-manifests.yaml
# helm install "stadium-release" "./stadium-chart/" --namespace "stadiumapp"
# helm upgrade "stadium-release" "./stadium-chart/" --namespace "stadiumapp"
# helm ls -n stadiumapp
# helm uninstall "stadium-release" --namespace "stadiumapp"