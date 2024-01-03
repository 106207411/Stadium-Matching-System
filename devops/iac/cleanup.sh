#!/bin/bash
# az login --use-device-code

location=eastus
resourceGroupName=rg-tfmgmt-dev
subscriptionName=$(az account show --query name --output tsv)
aksResourceGroup=rg-stadium-app2-dev

# Delete resource group
echo "Deleting [$resourceGroupName] resource group..."
az group delete --name $resourceGroupName --yes
echo "Deleting [$aksResourceGroup] resource group..."
az group delete --name $aksResourceGroup --yes
echo "Deleting the rest of the resources in the [$subscriptionName]..."
az group delete --name NetworkWatcherRG --yes
az group delete --name MC_rg-stadium-app2-dev_aks-stadium-dev_eastus --yes

# run init.sh
./init.sh