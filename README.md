# Deploy to SAP BTP with Cloud Transport Management Service (CTMS)

This GitHub Action allows you to automate the deployment of application archives ([MTAR files](https://help.sap.com/docs/btp/sap-business-technology-platform/multitarget-applications-in-cloud-foundry-environment)) to your SAP BTP subaccounts by leveraging the [SAP Cloud Transport Management Service (CTMS)](https://discovery-center.cloud.sap/serviceCatalog/cloud-transport-management?region=all). It uploads your artifact to `CTMS` and triggers an import into a specified target node.

## Overview

Integrating SAP BTP deployments into your CI/CD pipelines can be complex. This action simplifies the process by interacting directly with the `SAP Cloud Transport Management Service` API. Instead of manually deploying to a Cloud Foundry or Kyma environment, it initiates a transport request within `CTMS`, ensuring your deployment follows established transport routes and governance procedures.

**Key Features:**

- Uploads application archives (e.g., `.mtar` files) to `CTMS`.
- Initiates the import process for a specified transport node in `CTMS`.
- Uses `CTMS` service keys for secure authentication.
- Integrates seamlessly into GitHub Actions workflows.
- Automate end-to-end deployment processes in SAP BTP
- Ideal for multi-environment SAP application lifecycles

## Prerequisites

1.  **SAP BTP Account:** You need an active SAP BTP account.
2.  **SAP Cloud Transport Management Service:** The `CTMS` service must be activated and configured in your BTP subaccount.
    - You need a **Service Key** created for an instance of the Transport Management service. This key contains the necessary credentials and API endpoints. Ensure the service instance has the required permissions (e.g., `TransportOperator`, `UploadOperator`).
    - Your TMS landscape must be configured with transport nodes representing your target deployment environments (e.g., Development, QA, Production subaccounts/spaces).
3.  **Application Archive:** Your GitHub workflow must produce a deployable artifact (commonly an `.mtar` file) accessible to this action (e.g., built in a previous step or checked into the repository).
4.  **GitHub Secrets:** Store sensitive information like the `CTMS` Service Key securely using GitHub Encrypted Secrets. **Do not hardcode credentials in your workflow file.**

## Inputs

The following inputs are required to configure the deployment:

| Input                    | Description                                                                                                            | Required |
| ------------------------ | ---------------------------------------------------------------------------------------------------------------------- | -------- |
| `CTMS_TOKEN_SERVICE_URL` | Value of `url` (within the `uaa` section) from the service key of your `CTMS` instance.                                | `true`   |
| `CTMS_CLIENT_ID`         | Value of `clientid` from the service key of your `CTMS` instance.                                                      | `true`   |
| `CTMS_CLIENT_SECRET`     | Value of `clientsecret` (within the `uaa` section) from the service key.                                               | `true`   |
| `CTMS_API_URL`           | Value of `uri` from the service key of your `CTMS` instance.                                                           | `true`   |
| `CTMS_NODE_NAME`         | The name of the target Transport Node in `CTMS` where the archive should be imported.                                  | `true`   |
| `CTMS_FILE_PATH`         | Path within the runner's workspace to the application archive file (e.g., `app.mtar`, `my-app.zip`).                   | `true`   |
| `CTMS_TR_DESCRIPTION`    | Description for the transport request created in `CTMS`.                                                               | `true`   |
| `CTMS_TR_CONTENT_TYPE`   | Content type of the archive. Must be one of: `MTA`, `XSCDU`, `APP`.                                                    | `true`   |
| `CTMS_TR_STORAGE_TYPE`   | Storage type for the transport request. Must be one of: `FILE`, `REFERENCE`. Typically `FILE` for direct uploads.      | `true`   |
| `CTMS_TR_USER_NAME`      | Optional user name displayed in the `Cloud Transport Management UI`. If omitted, the authentication user may be shown. | `false`  |

## Secrets

It's recommended to store sensitive information from your `CTMS` instance as GitHub Secrets for improving security. For example:

- `CTMS_CLIENT_ID` = `${{ secrets.CTMS_CLIENT_ID_DEV }}`
- `CTMS_CLIENT_SECRET` = `${{ secrets.CTMS_CLIENT_SECRET_DEV }}`
- `CTMS_TR_USER_NAME` = `${{ secrets.CTMS_TR_USER_NAME_DEV }}`

It is strongly recommended to use separate secrets (and potentially separate service keys) for different deployment environments (e.g., `CTMS_CLIENT_SECRET_DEV`, `CTMS_CLIENT_SECRET_QA`).

## Outputs

This action provides the following outputs after a successful deployment:

| Name             | Description                                           |
| ---------------- | ----------------------------------------------------- |
| `CTMS_NODE_ID`   | ID of the Transport Node where the content was put.   |
| `CTMS_NODE_NAME` | Name of the Transport Node where the content was put. |
| `CTMS_QUEUE_ID`  | ID of the Import Queue of the Transport Node.         |

## Deployment Status

If the deployment is completed and successful, the action returns `exit status` = `0` and `run status` = `success`.

When deployment fails, the action returns `exit status` = `1` and `run status` = `failure`.

## Usage Example

```yaml
name: SAP BTP deployment with CTMS
on:
  push:
    branches: [main]
jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
      - name: Deploy to SAP BTP DEV via CTMS
        uses: mauriciolauffer/deploy-to-sap-btp-with-ctms@main
        with: # The following parameters are just examples, you should change them as needed
          CTMS_TOKEN_SERVICE_URL: https://xxx.authentication.ap10.hana.ondemand.com/oauth/token
          CTMS_CLIENT_ID: ${{ secrets.CTMS_CLIENT_ID }}
          CTMS_CLIENT_SECRET: ${{ secrets.CTMS_CLIENT_SECRET }}
          CTMS_API_URL: https://transport-service-app-backend.ts.cfapps.ap10.hana.ondemand.com/v2
          CTMS_NODE_NAME: dev
          CTMS_FILE_PATH: gen/archive.mtar
          CTMS_TR_DESCRIPTION: Automated deployment from GitHub Actions
          CTMS_TR_CONTENT_TYPE: MTA
          CTMS_TR_STORAGE_TYPE: FILE
          CTMS_TR_USER_NAME: ${{ secrets.CTMS_TR_USER_NAME }}
```
