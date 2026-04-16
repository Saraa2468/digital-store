pipeline {
    agent any

    environment {
        
        DOCKER_IMAGE = "sarasalah24/digital-store"
        DOCKER_CRED_ID = 'dockerhub-cred'
        K8S_CONFIG_ID = 'k8s-config'
    }

    stages {
        stage('Welcome') {
            steps {
                echo '🚀 Starting Digital-Store Pro CI/CD Pipeline...'
            }
        }

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    
                
                    sh "docker build -t ${DOCKER_IMAGE}:latest ."
                }
            }
        }

        //stage('Image Scan (Trivy)') {
           // steps {
                
              //  sh "trivy image --severity HIGH,CRITICAL ${DOCKER_IMAGE}:latest"
           // }
       // }

        stage('Push to Docker Hub') {
            steps {
                script {
                    
                    withCredentials([usernamePassword(credentialsId: "${DOCKER_CRED_ID}", passwordVariable: 'DOCKER_PASS', usernameVariable: 'DOCKER_USER')]) {
                        sh "echo \$DOCKER_PASS | docker login -u \$DOCKER_USER --password-stdin"
                        sh "docker push ${DOCKER_IMAGE}:latest"
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    
                    withCredentials([file(credentialsId: 'k8s-config', variable: 'KUBECONFIG')]) {
                
                def k8sServer = "https://host.docker.internal:6443" 
                
                sh """
                    kubectl --kubeconfig=\$KUBECONFIG --server=${k8sServer} \
                    --insecure-skip-tls-verify --validate=false \
                    apply -f deployment.yaml
                    
                    kubectl --kubeconfig=\$KUBECONFIG --server=${k8sServer} \
                    --insecure-skip-tls-verify --validate=false \
                    apply -f service.yaml
                }
            }
        }
    }

    post {
        success {
            echo '🎉 Pipeline finished successfully! Your app is live.'
        }
        failure {
            echo '❌ Pipeline failed. Check the logs to fix the issue.'
        }
    }
}