#!/bin/bash
for chart in {"book","customer"} ; do
    helm create "$chart"

    # Remove all file except _helpers.tpl
    find ./"$chart"/templates/* ! -name '_helpers.tpl' -exec rm -rf {} +

    # Overwrite values.yaml file
    values_template=$(cat values.template.yaml)
    values_file=${values_template//\{\{service\}\}/$chart}
    echo "$values_file" > ./"$chart"/values.yaml

    # Overwrite Chart.yaml file
    chart_template=$(cat Chart.template.yaml)
    chart_file=${chart_template//\{\{service\}\}/$chart}
    echo "$chart_file" > ./"$chart"/Chart.yaml
done