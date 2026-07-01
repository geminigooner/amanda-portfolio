# VΛLEN Kubernetes Deployment Guide

This document explains the optional infrastructure layer for containerizing and deploying VΛLEN (and the portfolio) to a Kubernetes cluster.

## Architecture Overview

* **Stateless Service**: The Node.js (Express + Vite) backend runs as a stateless container.
* **Persistent Memory**: Visitor state and memory are preserved using Firebase/Firestore. No persistent state is stored in the container, meaning any pod can safely restart without memory loss.
* **Scale**: The deployment is configured for 3 replicas out of the box to ensure high availability.
* **Health Checks**: Liveness and readiness probes hit `/api/health` to guarantee zero-downtime rolling updates and crash recovery.

---

## 1. Containerizing VΛLEN

### Build the Docker Image
To package the app into a container:

```bash
# Build the image locally
docker build -t valen-backend:latest .
```

### Run Locally (Docker)
You can test the containerized version locally before putting it in Kubernetes:

```bash
docker run -p 3000:3000 --env-file .env valen-backend:latest
```
*(Ensure you have your `.env` file populated with your `GEMINI_API_KEY`!)*

---

## 2. Kubernetes Manifests

All configuration files live in the `/k8s` directory:

1. **`k8s/deployment.yaml`**: Deploys 3 replicas of the `valen-backend` container. It binds the config maps, secrets, and sets up health probes.
2. **`k8s/service.yaml`**: Exposes the pods to the outside world. Set to `LoadBalancer` by default (suitable for Cloud K8s). Change to `NodePort` if running on local clusters (like Minikube/Kind).
3. **`k8s/configmap.yaml`**: Non-sensitive environment variables (e.g., `PORT: 3000`, `NODE_ENV: production`).
4. **`k8s/secret.yaml`**: A **template** for your sensitive keys. Do not commit actual secrets to version control!

---

## 3. Deployment Instructions

### Apply the Configuration

1. **Set your secrets**: Update `k8s/secret.yaml` with your actual `GEMINI_API_KEY` (or use a secure pipeline to inject it).
2. **Apply the manifests**:
   ```bash
   kubectl apply -f k8s/configmap.yaml
   kubectl apply -f k8s/secret.yaml
   kubectl apply -f k8s/deployment.yaml
   kubectl apply -f k8s/service.yaml
   ```

### Verification

Check if your 3 replicas are running:
```bash
kubectl get pods -l app=valen
```
*You should see 3 pods with the status `Running`.*

Check the service to get your Load Balancer IP:
```bash
kubectl get svc valen-service
```

Check the logs of a specific pod:
```bash
kubectl logs <pod-name>
```

---

## 4. Testing Restart Recovery (Resilience)

To verify that VΛLEN can survive pod deaths without losing your visitors' context:

1. Interact with the chat in your browser.
2. Kill one of the pods manually:
   ```bash
   kubectl delete pod <pod-name>
   ```
3. Kubernetes will instantly spin up a new replica.
4. Continue chatting. Because VΛLEN uses Firebase for persistence, the new pod will simply pull state and continue serving the conversation perfectly.

---

## ⚠️ Safety & Costs

**These manifests are prepared as an optional layer. No cloud resources have been automatically provisioned.**

* Do not apply these manifests to GKE / EKS / AKS unless you are ready to incur cloud load balancer and compute costs.
* To avoid accidental billing, test entirely locally using [Minikube](https://minikube.sigs.k8s.io/) or [Docker Desktop Kubernetes](https://docs.docker.com/desktop/kubernetes/) first.
